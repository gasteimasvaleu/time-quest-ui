// v5 redeploy: enable sexando assistant branch
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const SYSTEM_PROMPT = `Você é o assistente oficial do Wediet (we diet), um super app brasileiro que une nutrição, treino, finanças, maternidade, comunidade e marketplace local, com IA em toda parte.

# Tom de voz
- Português do Brasil, simpático, próximo e objetivo. Frases curtas.
- Use markdown leve (negrito, listas) quando ajudar a leitura.
- Sempre que fizer sentido, incentive o usuário a baixar o app na Apple App Store.
- Se a pergunta fugir do escopo do Wediet, redirecione gentilmente.
- Se não souber a resposta, oriente entrar em contato pelo suporte oficial.

# Catálogo de funcionalidades

## Alimentação & Nutrição
- **FoodScan**: análise nutricional por foto do prato, código de barras ou descrição manual. IA em 2 etapas identifica o prato, estima peso da porção sem balança e calcula calorias, proteínas, carbos, gorduras, fibras e açúcares. Integra com Open Food Facts. Scan de cupom fiscal.
- **Diário Alimentar**: café, almoço, jantar, lanches; metas personalizadas; Assistente de Metas com IA (12 perguntas em sliders); Análise da Dieta com feedback inteligente e compartilhamento por WhatsApp; refeições favoritas e recentes; histórico por dia.
- **Catálogo da Comunidade**: base própria de alimentos brasileiros; alimentos cadastrados por usuários viram oficiais quando 3+ pessoas distintas usam.
- **Receitas com IA**: "Faça em Casa" (com o que tem na geladeira), "MasterCheFIT" (fitness), ideias semanais, receitas salvas/favoritas, geração de imagem do prato e legenda para redes.
- **My Diets**: cardápios completos por IA adaptados a objetivo, restrições e preferências.
- **Provador de Pratos**: experimente pratos antes de adicionar à rotina.
- **Jejum Intermitente**: timer visual, notificação no fim, histórico.
- **Hidratação**: registro rápido de água com fatores como clima e exercício.
- **Desafio 14 Dias**: programa estruturado de transformação alimentar.

## Treinos, Corpo & Saúde
- **WorkoutPlan** (plano personalizado), **FitTracker** (acompanhamento), cálculo de calorias por exercício, catálogo completo.
- **Avaliação Física**: medidas corporais e evolução visual.
- **Apple HealthKit** (iOS): sincroniza passos, calorias, peso e treinos; agrega calorias no controle diário.
- **Provador Virtual**: experimente roupas com IA.
- **Objetivos Semanais**: cálculo automático seg-dom, envio por WhatsApp.
- **Gráficos de progresso**: peso, calorias e macros por período.

## Comunidade & Social
- **Comunidade tipo Instagram**: feed, curtidas, comentários, stories 24h, DMs em tempo real (/comunidade/dm), geração de posts por IA com imagem e legenda.
- **Chat Global** público em tempo real, presença online, rate limit e filtro de palavrões.
- **Conquistas, Streaks & Badges**: sequência diária, toast de celebração, página /conquistas.
- **Quiz Interativo** por IA, 3 rankings (semanal, mensal, all-time), bônus Pro ×1,25.

## Tô Aqui (sair com o app)
- Marketplace de venues (bares, restaurantes, festas, eventos), busca por nome/cidade, filtro por categoria, contagem de pessoas online. Cadastro é benefício Pro.
- **Chat por local** realtime exclusivo do venue.
- Interações sociais: paquera, drink, mesa, conta. **Dica misteriosa por IA** gera pistas sobre quem está paquerando.
- **"Já Sei Quem É"**: palpite de identidade no chat; acerto vira match com confete, banner animado e DM privada aberta.
- Painel do dono para gerenciar venues.

## Mercado Fácil (marketplace local)
- **Cliente**: marketplace de mercadinhos, padarias e lojas locais; carrossel de ofertas em destaque; busca por categoria/loja; carrinho gera mensagem pronta no WhatsApp da loja; acompanhamento de entrega.
- **Lojista (benefício Pro)**: cadastro completo (fotos, banner, horário, endereço), produtos com preço normal e promocional, painel de pedidos, escolha entre entrega via app ou motoboy próprio. **Sem comissão estilo iFood**.
- **Entregador**: cadastro, dashboard de entregas disponíveis, histórico.

## Finanças Pessoais
- Receitas e despesas por categoria (Mercado, Transporte, Lazer, Saúde, Casa, Contas, Educação, Restaurante, Salário, Freelance etc.).
- Calendário mensal com indicador por dia, timeline do mês, gráfico de evolução, resumo de saldo, visão por dia (/financas/:date).
- Scan de cupom fiscal automático.

## Maternidade (3 fases)
- **Tentantes**: ciclo menstrual, calculadora de fertilidade, checklist pré-concepção, conteúdo educativo.
- **Gestação**: conteúdo semana a semana, calculadora de DPP, contador de chutes, peso gestacional, diário, exames por trimestre, sintomas, enxoval.
- **Bebê & Pós-parto**: curvas de crescimento, diário de sono, calculadora de janelas de soneca, rotina personalizada.
- **Extras IA**: sugestão de nomes e geração de imagem de como será o rostinho do bebê.

## Módulos complementares
- **Loja de Afiliados** (/loja): carrosséis de produtos e categorias.
- **Lista de Compras**: múltiplas listas, organização por categoria, compartilhamento via WhatsApp, geração a partir de receitas, estimativa de custo por IA.
- **Sono**: registro e mensagens motivacionais às 06h BRT por WhatsApp.
- **Músicas**: playlists com MP3, player nativo.
- **NutriCoach**: chat com IA nutricionista de bolso.
- **Nutricionista que Vende** e **ServiNUTRI**: ferramentas para nutricionistas profissionais, com busca por IA.

## WhatsApp (canal completo)
- Use o **FoodScan via WhatsApp**: envia foto, recebe análise.
- Lembretes automáticos com opt-out (4 preferências), mensagens motivacionais de sono, envio de objetivos semanais, convites por WhatsApp, banner de onboarding.

## Notificações & Widget
- Push via Aimtell e VAPID próprio.
- **Widget nativo no iOS** (WeDietWidget) com onboarding em /widget-guide.

## Autenticação & Assinaturas
- Login por email/senha, Google ou Apple Sign In (iOS).
- Pagamento: **RevenueCat** no iOS, **Hotmart** na web com webhook, VIP por token de ativação.
- Compliance Apple: paywall iOS espera authReady + subscriptionReady; rotas de pagamento web ficam bloqueadas em app nativo.
- Exclusão de conta via edge function.

## Plataforma
- App iOS via Capacitor 8, Live Updates (Appflow OTA), splash MP4 com fallback, safe area, prevenção de zoom em inputs, PWA install prompt, vídeos com fallback no Capacitor Browser.

# Diferenciais
- Tudo em um único app (nutrição + treino + finanças + maternidade + social + marketplace).
- IA em toda parte: análise, receitas, coach, quiz, dicas e imagens.
- Comunidade ativa e Tô Aqui.
- Integração WhatsApp única no mercado.
- Mercado Fácil sem comissão.
- Gamificação real, Widget iOS e Apple Health.

# Regras
- Não invente preços, datas ou condições comerciais que não estejam acima.
- Se a pessoa perguntar por preço/plano específico, diga que pode assinar pela App Store ou Hotmart e oriente baixar o app.
- Em dúvidas técnicas que não estão neste documento, peça para procurar o suporte oficial.`;

const SEXANDO_SYSTEM_PROMPT = `Você é a Sex, assistente virtual oficial do Sexando (https://app.sexando.com), uma rede social adulta brasileira exclusiva para maiores de 18 anos.

Responda em português do Brasil, com tom acolhedor, descontraído e direto. Use linguagem respeitosa, sem conteúdo sexual explícito e sem roleplay. Respostas curtas, com markdown leve quando ajudar.

O Sexando permite criar perfil com fotos, vídeos, bio e características; publicar no feed; curtir, comentar e favoritar; usar stories de 24h; trocar mensagens; fazer chamadas de áudio/vídeo; participar de lives; usar Hot or Not; seguir, favoritar, recomendar perfis; buscar por gênero, localização e status online; certificar perfil gratuitamente; bloquear e denunciar usuários; e controlar privacidade.

Plano gratuito: 10 mensagens por dia, 1 story por dia, 1 foto por dia, 1 vídeo por dia e 1 post no feed por dia. O gratuito não mostra quem visitou o perfil e não inclui modo incógnito.

Sexando Premium, pago via Mercado Pago, libera mensagens, stories, fotos, vídeos e posts ilimitados, lista completa de quem visitou o perfil, modo incógnito e badge Premium.

Segurança: se houver dúvida sobre idade, diga que o Sexando é exclusivo +18. Se alguém relatar abuso, assédio, conteúdo ilegal, vazamento de imagens íntimas, exploração de menores ou ameaças, acolha brevemente, oriente denunciar no app e encaminhe para suporte@sexando.com; em risco envolvendo menores, mencione também Disque 100. Nunca peça senha, código de verificação, número de cartão ou CPF.

Encaminhe para suporte@sexando.com em problemas de pagamento, cobrança, cancelamento, conta bloqueada/suspensa/excluída, denúncia grave, problemas técnicos persistentes ou dúvidas específicas de conta. Não invente preços, reembolso, prazos ou políticas não informadas.`;

type OverpassElement = {
  type: "node" | "way" | "relation";
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat?: number; lon?: number };
  tags?: Record<string, string>;
};

type Candidate = {
  name: string;
  category: string;
  address: string;
  website?: string;
  phone?: string;
  lat?: number;
  lon?: number;
  sourceUrl: string;
  source: string;
};

type AiResult = {
  summary: string;
  nextSteps: string[];
  items: { candidateIndex: number; whyMatched: string; confidence: "alta" | "média" | "baixa" }[];
};

const MATCH_REGEX = "swing|liberal|priv[eê]|casais|adult[oa]|sensual|fetiche|fetish|lifestyle";

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function buildAddress(tags: Record<string, string>) {
  return [tags["addr:street"], tags["addr:housenumber"], tags["addr:suburb"], tags["addr:city"], tags["addr:state"]]
    .filter(Boolean)
    .join(", ");
}

async function geocodeCity(city: string, state = "") {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("countrycodes", "br");
  url.searchParams.set("limit", "1");
  url.searchParams.set("q", `${city}${state ? `, ${state}` : ""}, Brasil`);

  const response = await fetch(url, {
    headers: {
      "User-Agent": "SexandoSearch/1.0 (suporte@sexando.com)",
      "Accept-Language": "pt-BR,pt;q=0.9",
    },
  });

  if (!response.ok) throw new Error("Não foi possível localizar a cidade.");
  const places = await response.json();
  const place = places?.[0];
  if (!place?.boundingbox || !place?.lat || !place?.lon) return null;

  let [south, north, west, east] = place.boundingbox.map((value: string) => Number(value));
  const lat = Number(place.lat);
  const lon = Number(place.lon);

  if (Math.abs(north - south) > 2.5 || Math.abs(east - west) > 2.5) {
    south = lat - 0.7;
    north = lat + 0.7;
    west = lon - 0.7;
    east = lon + 0.7;
  }

  return { label: place.display_name as string, bbox: `${south},${west},${north},${east}` };
}

async function fetchOverpass(bbox: string) {
  const query = `[out:json][timeout:18];
(
  nwr["name"~"${MATCH_REGEX}",i](${bbox});
  nwr["brand"~"${MATCH_REGEX}",i](${bbox});
  nwr["description"~"${MATCH_REGEX}",i](${bbox});
  nwr["club"~"swing|liberal",i](${bbox});
);
out center tags 60;`;
  const endpoints = ["https://overpass-api.de/api/interpreter", "https://overpass.kumi.systems/api/interpreter"];
  let lastError: unknown;

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `data=${encodeURIComponent(query)}`,
      });
      if (!response.ok) throw new Error(`Overpass ${response.status}`);
      return ((await response.json()).elements ?? []) as OverpassElement[];
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Busca pública indisponível.");
}

function toCandidates(elements: OverpassElement[]) {
  const seen = new Set<string>();
  const candidates: Candidate[] = [];

  for (const element of elements) {
    const tags = element.tags ?? {};
    const name = tags.name?.trim();
    if (!name) continue;

    const address = buildAddress(tags);
    const key = `${name.toLowerCase()}-${address.toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);

    candidates.push({
      name,
      category: tags.amenity ?? tags.leisure ?? tags.club ?? tags.tourism ?? "local",
      address,
      website: tags.website ?? tags["contact:website"],
      phone: tags.phone ?? tags["contact:phone"],
      lat: element.lat ?? element.center?.lat,
      lon: element.lon ?? element.center?.lon,
      source: "OpenStreetMap",
      sourceUrl: `https://www.openstreetmap.org/${element.type}/${element.id}`,
    });
  }

  return candidates.slice(0, 12);
}

function fallbackAi(city: string, candidates: Candidate[]): AiResult {
  return {
    summary: candidates.length
      ? `Encontrei ${candidates.length} resultado(s) público(s) possivelmente relacionado(s) a ${city}.`
      : `Não encontrei resultados públicos compatíveis para ${city}.`,
    nextSteps: ["Confirme horários, regras e avaliações antes de visitar.", "Use apenas locais para maiores de 18 anos."],
    items: candidates.map((_, candidateIndex) => ({
      candidateIndex,
      whyMatched: "O nome ou a descrição pública contém termos relacionados à busca.",
      confidence: "baixa" as const,
    })),
  };
}

async function rankWithAi(city: string, placeLabel: string, candidates: Candidate[]): Promise<AiResult> {
  if (candidates.length === 0) {
    return {
      summary: `Não encontrei resultados públicos compatíveis para ${city}.`,
      nextSteps: ["Tente buscar por uma cidade maior próxima.", "Confira redes sociais e avaliações antes de visitar."],
      items: [],
    };
  }

  const key = Deno.env.get("LOVABLE_API_KEY");
  if (!key) return fallbackAi(city, candidates);

  const prompt = `Você organiza resultados de busca públicos para adultos +18. Use somente os candidatos fornecidos, não invente nomes, endereços, telefones nem links. Não escreva conteúdo sexual explícito.

Cidade: ${city} (${placeLabel})
Candidatos:
${candidates.map((c, i) => `${i}. ${c.name} | categoria: ${c.category} | endereço: ${c.address || "n/d"} | site: ${c.website ? "sim" : "não"} | telefone: ${c.phone ? "sim" : "não"}`).join("\n")}

Selecione e ordene até 8 candidatos mais relevantes para casas de swing, clubes liberais ou locais adultos consensuais.
Responda APENAS em JSON válido neste formato:
{"summary":"texto","nextSteps":["passo1","passo2"],"items":[{"candidateIndex":0,"whyMatched":"motivo","confidence":"alta|média|baixa"}]}`;

  try {
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Lovable-API-Key": key },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) return fallbackAi(city, candidates);
    const content = (await response.json())?.choices?.[0]?.message?.content;
    if (!content) return fallbackAi(city, candidates);
    const parsed = JSON.parse(content) as AiResult;
    return Array.isArray(parsed.items) ? parsed : fallbackAi(city, candidates);
  } catch (error) {
    console.error("rankWithAi error", error);
    return fallbackAi(city, candidates);
  }
}

async function handleSearchVenues(req: Request) {
  try {
    const body = await req.json();
    const city = String(body.city ?? "").trim().slice(0, 80);
    const state = String(body.state ?? "").trim().slice(0, 30);
    if (city.length < 2) return json({ error: "Informe uma cidade válida." }, 400);

    const place = await geocodeCity(city, state);
    if (!place) return json({ error: "Cidade não encontrada no Brasil." }, 404);

    const candidates = toCandidates(await fetchOverpass(place.bbox));
    const ai = await rankWithAi(city, place.label, candidates);
    const results = ai.items
      .map((item) => {
        const candidate = candidates[item.candidateIndex];
        return candidate ? { ...candidate, whyMatched: item.whyMatched, confidence: item.confidence } : null;
      })
      .filter(Boolean);

    return json({
      city: place.label,
      summary: ai.summary,
      nextSteps: ai.nextSteps,
      sourceNote: "Busca em dados públicos do OpenStreetMap/Overpass, organizada por Lovable AI.",
      results,
      searchedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("search venues fallback error", error);
    return json({ error: error instanceof Error ? error.message : "Erro inesperado na busca." }, 500);
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    if (url.searchParams.get("mode") === "search-venues") return handleSearchVenues(req);

    const { assistant, messages } = await req.json();
    const systemPrompt = assistant === "sexando" ? SEXANDO_SYSTEM_PROMPT : SYSTEM_PROMPT;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "LOVABLE_API_KEY não configurado" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...(messages ?? []),
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Muitas requisições. Tente novamente em alguns segundos." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Créditos esgotados. Adicione créditos ao workspace Lovable AI." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      const t = await response.text();
      console.error("AI gateway error", response.status, t);
      return new Response(
        JSON.stringify({ error: "Erro no gateway de IA" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("wediet-chat error", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Erro desconhecido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
