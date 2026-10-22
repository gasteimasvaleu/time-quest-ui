"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ArrowUpIcon, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = "/api/sexando-chat";
const EXAMPLE_QUESTIONS = [
  "O Sexando é gratuito?",
  "O que o Premium libera?",
  "Como funciona a certificação de perfil?",
  "Como funciona o modo incógnito?",
  "Como faço para bloquear alguém?",
];

function useAutoResizeTextarea({ minHeight, maxHeight }: { minHeight: number; maxHeight?: number }) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const adjustHeight = useCallback(
    (reset?: boolean) => {
      const t = textareaRef.current;
      if (!t) return;
      if (reset) {
        t.style.height = `${minHeight}px`;
        return;
      }
      t.style.height = `${minHeight}px`;
      const newHeight = Math.max(minHeight, Math.min(t.scrollHeight, maxHeight ?? Infinity));
      t.style.height = `${newHeight}px`;
    },
    [minHeight, maxHeight],
  );
  useEffect(() => {
    if (textareaRef.current) textareaRef.current.style.height = `${minHeight}px`;
  }, [minHeight]);
  return { textareaRef, adjustHeight };
}

function getSexandoFallbackAnswer(question: string) {
  const q = question.toLowerCase();

  if (q.includes("grat") || q.includes("free")) {
    return "Sim! O **Sexando** pode ser usado de graça com limites diários: **10 mensagens**, **1 story**, **1 foto**, **1 vídeo** e **1 post no feed** por dia. O **Premium** libera tudo ilimitado e também mostra quem visitou seu perfil.";
  }

  if (q.includes("premium") || q.includes("pago") || q.includes("plano")) {
    return "O **Sexando Premium** libera mensagens, stories, fotos, vídeos e posts **ilimitados**, lista completa de quem visitou seu perfil, **modo incógnito** e badge Premium. O pagamento é feito pelo **Mercado Pago**.";
  }

  if (q.includes("certifica") || q.includes("verific")) {
    return "A certificação de perfil é **gratuita**. Você envia uma foto segurando um papel com o código gerado pelo Sexando, e a equipe revisa manualmente para liberar o selo de perfil verificado.";
  }

  if (q.includes("incógnito") || q.includes("incognito")) {
    return "O **modo incógnito** é um recurso Premium: quando ativado, suas visitas a outros perfis não aparecem na lista de visitantes da outra pessoa.";
  }

  if (q.includes("bloque") || q.includes("denunci")) {
    return "Você pode **bloquear** e **denunciar** usuários pelo perfil ou conteúdo. O bloqueio remove interações entre os perfis, e denúncias ajudam a equipe a manter a comunidade segura.";
  }

  return "O **Sexando** é uma rede social adulta brasileira exclusiva para maiores de 18 anos, com perfil, feed, stories, mensagens, chamadas, lives, Hot or Not, busca por perfis, certificação gratuita e controles de privacidade. Se for algo específico da sua conta, fale com **suporte@sexando.com**.";
}

export default function SexandoChat() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({ minHeight: 60, maxHeight: 200 });
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const text = value.trim();
    if (!text || isLoading) return;
    const userMsg: Msg = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setValue("");
    adjustHeight(true);
    setIsLoading(true);

    let acc = "";
    const upsert = (chunk: string) => {
      acc += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: acc } : m));
        }
        return [...prev, { role: "assistant", content: acc }];
      });
    };

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ assistant: "sexando", messages: next }),
      });

      if (!resp.ok || !resp.body) {
        if (resp.status === 429) toast.error("Muitas requisições. Aguarde um instante.");
        else if (resp.status === 402) toast.error("Créditos de IA esgotados.");
        upsert(getSexandoFallbackAnswer(text));
        setIsLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let done = false;
      while (!done) {
        const { done: d, value: v } = await reader.read();
        if (d) break;
        buffer += decoder.decode(v, { stream: true });
        let idx: number;
        while ((idx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line || line.startsWith(":")) continue;
          if (!line.startsWith("data: ")) continue;
          const payload = line.slice(6).trim();
          if (payload === "[DONE]") {
            done = true;
            break;
          }
          try {
            const parsed = JSON.parse(payload);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsert(content);
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (e) {
      console.error(e);
      upsert(getSexandoFallbackAnswer(text));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const handleExampleClick = (question: string) => {
    setValue(question);
    requestAnimationFrame(() => {
      adjustHeight();
      textareaRef.current?.focus();
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col min-w-0">
      {messages.length > 0 && (
        <div
          ref={scrollRef}
          className="flex-1 min-h-[300px] max-h-[55vh] overflow-y-auto rounded-2xl border border-border bg-white/70 backdrop-blur-xl p-4 mb-4 space-y-4"
        >
          {messages.map((m, i) => (
            <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap",
                  m.role === "user"
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-foreground",
                )}
              >
                {m.role === "assistant" ? (
                  <div className="prose prose-sm max-w-none prose-p:my-1 prose-headings:my-2">
                    <ReactMarkdown>{m.content || "…"}</ReactMarkdown>
                  </div>
                ) : (
                  m.content
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="rounded-2xl border border-border bg-white shadow-sm">
        <Textarea
          ref={textareaRef as never}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            adjustHeight();
          }}
          onKeyDown={handleKeyDown}
          placeholder="Faça uma pergunta sobre o Sexando..."
          className={cn(
            "w-full px-4 py-3 resize-none bg-transparent border-none text-foreground text-base md:text-sm",
            "focus:outline-hidden focus-visible:ring-0 focus-visible:ring-offset-0",
            "placeholder:text-muted-foreground placeholder:text-base md:placeholder:text-sm min-h-[60px]",
          )}
          style={{ overflow: "hidden" }}
        />
        <div className="flex items-center justify-end p-3">
          <button
            type="button"
            onClick={send}
            disabled={!value.trim() || isLoading}
            className={cn(
              "p-2 rounded-full transition-colors flex items-center justify-center",
              value.trim() && !isLoading
                ? "bg-accent text-accent-foreground hover:bg-accent/90"
                : "bg-muted text-muted-foreground cursor-not-allowed",
            )}
            aria-label="Enviar"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowUpIcon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {messages.length === 0 && (
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {EXAMPLE_QUESTIONS.map((question) => (
            <button
              key={question}
              type="button"
              onClick={() => handleExampleClick(question)}
              className="rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs text-muted-foreground shadow-sm backdrop-blur-xl transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {question}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
