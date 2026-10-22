import { useEffect, useRef, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate, slugify, type Post } from "@/lib/blog";

type Draft = Omit<Post, "id" | "created_at" | "updated_at" | "published_at"> & { id?: string };

const emptyDraft = (): Draft => ({
  title: "", slug: "", excerpt: "", content: "", cover_url: "",
  meta_title: "", meta_description: "", keywords: [], status: "draft",
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) toast.error("E-mail ou senha inválidos");
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-3xl border border-border bg-card p-8 shadow-lg">
        <h1 className="text-2xl font-semibold">Área administrativa</h1>
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <Button type="submit" className="w-full rounded-full" disabled={loading}>
          {loading ? "Entrando…" : "Entrar"}
        </Button>
      </form>
    </div>
  );
};

const PostEditor = ({ draft, onSaved, onCancel }: { draft: Draft; onSaved: () => void; onCancel: () => void }) => {
  const [d, setD] = useState<Draft>(draft);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  useEffect(() => setD(draft), [draft]);
  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setD((p) => ({ ...p, [k]: v }));

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) { toast.error("Use JPG, PNG ou WEBP"); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error("Imagem maior que 5 MB"); return; }
    setUploading(true);
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("blog-covers").upload(path, file, { contentType: file.type });
    if (error) { setUploading(false); { toast.error("Falha ao enviar imagem"); return; } }
    const { data: signed, error: sErr } = await supabase.storage.from("blog-covers").createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
    setUploading(false);
    if (sErr || !signed) { toast.error("Falha ao gerar link da imagem"); return; }
    set("cover_url", signed.signedUrl);
    toast.success("Imagem enviada");
  };

  const save = async (status: Draft["status"]) => {
    if (!d.title.trim()) { toast.error("Informe o título"); return; }
    setSaving(true);
    const row = { ...d, status, slug: slugify(d.slug || d.title), cover_url: d.cover_url || null };
    const { id, ...rest } = row;
    const { error } = id
      ? await supabase.from("posts").update(rest).eq("id", id)
      : await supabase.from("posts").insert(rest);
    setSaving(false);
    if (error) { toast.error(error.message.includes("duplicate") ? "Já existe um artigo com esse endereço" : error.message); return; }
    toast.success(status === "published" ? "Artigo publicado" : "Rascunho salvo");
    onSaved();
  };

  return (
    <div className="space-y-4 rounded-3xl border border-border bg-card p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2"><Label>Título</Label><Input value={d.title} onChange={(e) => set("title", e.target.value)} /></div>
        <div className="space-y-2"><Label>Endereço (slug)</Label><Input value={d.slug} placeholder={slugify(d.title)} onChange={(e) => set("slug", e.target.value)} /></div>
        <div className="space-y-2"><Label>Título para o Google</Label><Input value={d.meta_title} onChange={(e) => set("meta_title", e.target.value)} /></div>
        <div className="space-y-2">
          <Label>Imagem de capa</Label>
          <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={upload} />
          {d.cover_url ? (
            <div className="flex items-center gap-3">
              <img src={d.cover_url} alt="Capa" className="h-16 w-28 rounded-lg object-cover" />
              <Button type="button" size="sm" variant="outline" className="rounded-full" disabled={uploading} onClick={() => fileRef.current?.click()}>{uploading ? "Enviando…" : "Trocar"}</Button>
              <Button type="button" size="sm" variant="ghost" className="rounded-full" onClick={() => set("cover_url", "")}>Remover</Button>
            </div>
          ) : (
            <Button type="button" variant="outline" className="w-full rounded-full" disabled={uploading} onClick={() => fileRef.current?.click()}>{uploading ? "Enviando…" : "Enviar imagem"}</Button>
          )}
        </div>
      </div>
      <div className="space-y-2"><Label>Descrição para o Google</Label><Textarea rows={2} value={d.meta_description} onChange={(e) => set("meta_description", e.target.value)} /></div>
      <div className="space-y-2"><Label>Palavras-chave (separadas por vírgula)</Label><Input value={d.keywords.join(", ")} onChange={(e) => set("keywords", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} /></div>
      <div className="space-y-2"><Label>Resumo</Label><Textarea rows={2} value={d.excerpt} onChange={(e) => set("excerpt", e.target.value)} /></div>
      <div className="space-y-2"><Label>Conteúdo (Markdown)</Label><Textarea rows={16} value={d.content} onChange={(e) => set("content", e.target.value)} /></div>
      <div className="flex flex-wrap gap-2">
        <Button className="rounded-full" disabled={saving} onClick={() => save("published")}>Publicar</Button>
        <Button variant="outline" className="rounded-full" disabled={saving} onClick={() => save("draft")}>Salvar rascunho</Button>
        <Button variant="ghost" className="rounded-full" onClick={onCancel}>Cancelar</Button>
      </div>
    </div>
  );
};

const ArticlesTab = ({ editing, setEditing }: { editing: Draft | null; setEditing: (d: Draft | null) => void }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const load = () =>
    supabase.from("posts").select("*").order("created_at", { ascending: false }).then(({ data }) => setPosts((data as Post[]) ?? []));
  useEffect(() => { load(); }, []);

  const toggle = async (p: Post) => {
    const { error } = await supabase.from("posts").update({ status: p.status === "published" ? "draft" : "published" }).eq("id", p.id);
    if (error) toast.error(error.message); else load();
  };
  const remove = async (p: Post) => {
    if (!confirm(`Excluir "${p.title}"?`)) return;
    const { error } = await supabase.from("posts").delete().eq("id", p.id);
    if (error) toast.error(error.message); else load();
  };

  if (editing) return <PostEditor draft={editing} onCancel={() => setEditing(null)} onSaved={() => { setEditing(null); load(); }} />;

  return (
    <div className="space-y-4">
      <Button className="rounded-full" onClick={() => setEditing(emptyDraft())}>Novo artigo</Button>
      {posts.length === 0 && <p className="text-muted-foreground">Nenhum artigo ainda.</p>}
      {posts.map((p) => (
        <div key={p.id} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold">{p.title}</p>
            <p className="text-xs text-muted-foreground">
              {p.status === "published" ? `Publicado em ${formatDate(p.published_at)}` : "Rascunho"} · /blog/{p.slug}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" className="rounded-full" onClick={() => setEditing({ ...p })}>Editar</Button>
            <Button size="sm" variant="outline" className="rounded-full" onClick={() => toggle(p)}>
              {p.status === "published" ? "Despublicar" : "Publicar"}
            </Button>
            <Button size="sm" variant="ghost" className="rounded-full text-destructive" onClick={() => remove(p)}>Excluir</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

const WriterTab = ({ onSend }: { onSend: (d: Draft) => void }) => {
  const [topic, setTopic] = useState("");
  const [keyword, setKeyword] = useState("");
  const [audience, setAudience] = useState("");
  const [words, setWords] = useState(1000);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Draft | null>(null);

  const generate = async () => {
    if (!topic.trim()) { toast.error("Informe o tema"); return; }
    setLoading(true);
    setResult(null);
    try {
      const { data: s } = await supabase.auth.getSession();
      const res = await fetch("/api/blog-writer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${s.session?.access_token}`,
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({ topic, keyword, audience, words }),
      });
      if (!res.ok || !res.body) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Erro ao gerar artigo");
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = "", text = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
          const payload = line.slice(5).trim();
          if (!payload || payload === "[DONE]") continue;
          try {
            const ev = JSON.parse(payload);
            if (ev.type === "response.output_text.delta") text += ev.delta;
            if (ev.type === "response.failed" || ev.type === "error") throw new Error(ev.error?.message || ev.response?.error?.message || "Falha na IA");
          } catch (e) { if (e instanceof Error && !(e instanceof SyntaxError)) throw e; }
        }
      }
      const a = JSON.parse(text);
      setResult({ ...emptyDraft(), ...a, slug: slugify(a.slug || a.title), cover_url: "" });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erro ao gerar artigo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4 rounded-3xl border border-border bg-card p-6">
        <div className="space-y-2"><Label>Tema do artigo</Label><Textarea rows={2} value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Ex.: Como começar no meio liberal com segurança" /></div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2"><Label>Palavra-chave principal</Label><Input value={keyword} onChange={(e) => setKeyword(e.target.value)} /></div>
          <div className="space-y-2"><Label>Público</Label><Input value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="Ex.: casais iniciantes" /></div>
          <div className="space-y-2"><Label>Tamanho (palavras)</Label><Input type="number" min={300} max={3000} value={words} onChange={(e) => setWords(Number(e.target.value))} /></div>
        </div>
        <Button className="rounded-full" onClick={generate} disabled={loading}>{loading ? "Escrevendo… (pode levar até 1 minuto)" : "Gerar artigo com IA"}</Button>
      </div>

      {result && (
        <div className="space-y-4 rounded-3xl border border-border bg-card p-6">
          <div className="text-sm text-muted-foreground space-y-1">
            <p><strong>Título Google:</strong> {result.meta_title}</p>
            <p><strong>Descrição Google:</strong> {result.meta_description}</p>
            <p><strong>Endereço:</strong> /blog/{result.slug}</p>
            <p><strong>Palavras-chave:</strong> {result.keywords.join(", ")}</p>
          </div>
          <h2 className="text-2xl font-semibold">{result.title}</h2>
          <p className="text-muted-foreground">{result.excerpt}</p>
          <div className="prose-blog max-h-[500px] overflow-auto border-t border-border pt-4"><ReactMarkdown>{result.content}</ReactMarkdown></div>
          <Button className="rounded-full" onClick={() => onSend(result)}>Enviar para Artigos</Button>
        </div>
      )}
    </div>
  );
};

const Admin = () => {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [tab, setTab] = useState("artigos");
  const [editing, setEditing] = useState<Draft | null>(null);

  useEffect(() => {
    document.title = "Admin | Sexando";
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) { setIsAdmin(null); return; }
    supabase.rpc("has_role", { _user_id: session.user.id, _role: "admin" }).then(({ data }) => setIsAdmin(!!data));
  }, [session]);

  if (session === undefined) return null;
  if (!session) return <Login />;
  if (isAdmin === null) return null;
  if (!isAdmin)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p>Sem permissão de acesso.</p>
        <Button variant="outline" className="rounded-full" onClick={() => supabase.auth.signOut()}>Sair</Button>
      </div>
    );

  return (
    <main className="min-h-screen bg-background px-4 py-8 md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Painel do Blog</h1>
          <Button variant="outline" className="rounded-full" onClick={() => supabase.auth.signOut()}>Sair</Button>
        </div>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="artigos">Artigos</TabsTrigger>
            <TabsTrigger value="ia">IA Redatora</TabsTrigger>
          </TabsList>
          <TabsContent value="artigos" className="mt-6">
            <ArticlesTab editing={editing} setEditing={setEditing} />
          </TabsContent>
          <TabsContent value="ia" className="mt-6">
            <WriterTab onSend={(d) => { setEditing(d); setTab("artigos"); toast.success("Artigo enviado para Artigos — revise e publique"); }} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default Admin;
