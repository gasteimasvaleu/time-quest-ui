import { createClient } from "@supabase/supabase-js";
const corsHeaders: Record<string, string> = {};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

const SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["title", "slug", "excerpt", "meta_title", "meta_description", "keywords", "content"],
  properties: {
    title: { type: "string" },
    slug: { type: "string" },
    excerpt: { type: "string" },
    meta_title: { type: "string" },
    meta_description: { type: "string" },
    keywords: { type: "array", items: { type: "string" } },
    content: { type: "string" },
  },
};

export async function handle(req: Request): Promise<Response> {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const auth = req.headers.get("Authorization") ?? "";
    const supabase = createClient((process.env["SUPABASE_URL"] ?? import.meta.env.VITE_SUPABASE_URL), (process.env["SUPABASE_ANON_KEY"] ?? process.env["SUPABASE_PUBLISHABLE_KEY"] ?? import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY), {
      global: { headers: { Authorization: auth } },
    });
    const { data: userData } = await supabase.auth.getUser(auth.replace("Bearer ", ""));
    if (!userData?.user) return json({ error: "Não autenticado" }, 401);
    const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: userData.user.id, _role: "admin" });
    if (!isAdmin) return json({ error: "Acesso negado" }, 403);

    const body = await req.json().catch(() => null);
    const topic = String(body?.topic ?? "").trim().slice(0, 500);
    const keyword = String(body?.keyword ?? "").trim().slice(0, 120);
    const audience = String(body?.audience ?? "").trim().slice(0, 200);
    const words = Math.min(Math.max(Number(body?.words) || 1000, 300), 3000);
    if (!topic) return json({ error: "Informe o tema do artigo" }, 400);

    const apiKey = process.env["OPENAI_API_KEY"];
    if (!apiKey) return json({ error: "IA não configurada" }, 500);

    const prompt = `Escreva um artigo de blog em português do Brasil para o site Sexando (rede social brasileira do estilo de vida liberal, para adultos, com foco em respeito, consentimento, segurança e privacidade). Conteúdo informativo e elegante, sem linguagem explícita.
Tema: ${topic}
Palavra-chave principal: ${keyword || "(escolha a melhor)"}
Público: ${audience || "adultos interessados no estilo de vida liberal"}
Tamanho aproximado: ${words} palavras.
Regras de SEO: palavra-chave no título, no primeiro parágrafo, em ao menos um subtítulo H2 e no meta description; meta_title até 60 caracteres; meta_description entre 140 e 160 caracteres; slug curto em minúsculas com hífens, sem acentos; 5 a 8 keywords; excerpt de 1-2 frases; content em Markdown com subtítulos ## e ###, listas quando útil, parágrafos curtos, uma seção de perguntas frequentes e uma conclusão com convite para conhecer a Sexando. Não repita o título como H1 no content.`;

    const upstream = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      signal: req.signal,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: process.env["OPENAI_MODEL_BLOG"] || "gpt-6-astra",
        input: prompt,
        stream: true,
        store: false,
        reasoning: { effort: "medium", summary: "auto" },
        include: ["reasoning.encrypted_content"],
        text: { format: { type: "json_schema", name: "article", strict: true, schema: SCHEMA } },
      }),
    });

    if (!upstream.ok) {
      const t = await upstream.text();
      let msg = "Erro ao gerar artigo";
      try { msg = JSON.parse(t)?.error?.message ?? JSON.parse(t)?.message ?? msg; } catch { /* ignore */ }
      if (upstream.status === 429) msg = "Muitas solicitações. Tente novamente em instantes.";
      if (upstream.status === 402) msg = msg || "Créditos de IA insuficientes.";
      return json({ error: msg }, upstream.status);
    }

    const headers = new Headers({ ...corsHeaders, "Content-Type": "text/event-stream" });
    return new Response(upstream.body, { status: 200, headers });
  } catch (e) {
    if (req.signal.aborted) return new Response(null, { status: 499, headers: corsHeaders });
    return json({ error: e instanceof Error ? e.message : "Erro" }, 500);
  }
}
