import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SexandoChat from "@/components/SexandoChat";
import { Mail } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = [
  {
    q: "O Sexando é gratuito?",
    a: "Sim! Você pode usar o Sexando de graça com limites diários (10 mensagens, 1 post, 1 foto, 1 vídeo e 1 story por dia). O Premium libera tudo ilimitado e ainda mostra quem visitou seu perfil.",
  },
  {
    q: "Como cancelo o Premium?",
    a: "Em Minha Conta → Assinatura você consegue gerenciar. Se travar em algum passo, o suporte te ajuda: suporte@sexando.com.",
  },
  {
    q: "Como funciona a certificação de perfil?",
    a: "Você envia uma foto sua segurando um papel com um código que a gente gera. Nossa equipe revisa manualmente e libera o selo de perfil verificado. É gratuito.",
  },
  {
    q: "Modo incógnito funciona mesmo?",
    a: "Funciona! Quando ativado (exclusivo Premium), suas visitas a outros perfis simplesmente não são registradas — ninguém vê que você passou por lá.",
  },
  {
    q: "Posso bloquear alguém?",
    a: "Pode. O bloqueio é mútuo: remove amizade, follow e pedidos pendentes dos dois lados. É só ir no perfil da pessoa.",
  },
];

const Contato = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 px-4 py-12">
        {/* Hero */}
        <div className="max-w-3xl mx-auto text-center mb-8">
          <div className="relative mx-auto mb-4 h-28 md:h-36 w-28 md:w-36">
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[hsl(330_100%_50%)] animate-ring-ripple"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[hsl(330_100%_50%)] animate-ring-ripple"
              style={{ animationDelay: "1s" }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[hsl(330_100%_50%)] animate-ring-ripple"
              style={{ animationDelay: "2s" }}
            />
            <img
              src="https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/logonav.png"
              alt="Sexando"
              className="relative z-10 h-full w-full object-contain [animation:float_3s_ease-in-out_infinite,pink-pulse_2s_ease-in-out_infinite] transition-transform duration-300 hover:scale-110"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-light tracking-tight mb-3">
            Dúvidas? Fale com a <span className="text-accent">Sex</span> ✨
          </h1>
          <p className="text-muted-foreground">
            Converse com nossa assistente virtual e tire suas dúvidas sobre o Sexando em segundos.
          </p>
        </div>

        {/* Chat */}
        <SexandoChat />

        {/* FAQ */}
        <section className="max-w-3xl mx-auto mt-16">
          <h2 className="text-2xl md:text-3xl font-light tracking-tight text-center mb-6">
            Perguntas frequentes
          </h2>
          <div className="rounded-2xl border border-border bg-white/70 backdrop-blur-xl shadow-lg p-4 md:p-6">
            <Accordion type="single" collapsible className="w-full">
              {FAQ.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Contato humano */}
        <section className="max-w-3xl mx-auto mt-10">
          <div className="rounded-2xl border border-border bg-white/70 backdrop-blur-xl shadow-lg p-8 text-center">
            <h2 className="text-xl font-semibold mb-2">Precisa falar com a gente?</h2>
            <p className="text-muted-foreground mb-5">
              Para problemas com pagamento, conta ou denúncias, nosso time responde rapidinho.
            </p>
            <a
              href="mailto:suporte@sexando.com"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-primary-foreground font-medium transition-transform hover:scale-105"
            >
              <Mail className="h-4 w-4" />
              suporte@sexando.com
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contato;
