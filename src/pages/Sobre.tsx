import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Heart, Shield, Users, MapPin, MessageCircle, Sparkles } from "lucide-react";
import HyperTextParagraph from "@/components/HyperTextParagraph";
import { ContainerScroll, CardSticky } from "@/components/ui/sticky-scroll-cards";

const values = [
  {
    icon: Users,
    title: "Comunidade Real",
    description: "Conectamos casais, solteiros e solteiras que compartilham o mesmo estilo de vida liberal. Perfis verificados e ambiente sem julgamentos."
  },
  {
    icon: Shield,
    title: "Privacidade Total",
    description: "Seus dados e fotos são protegidos. Você controla o que mostra e para quem. Discrição é nossa prioridade desde o primeiro acesso."
  },
  {
    icon: MapPin,
    title: "Brasil Inteiro",
    description: "De São Paulo a Fortaleza, nossa comunidade cresce em todas as regiões. Encontre pessoas e eventos perto de onde você mora ou viaja."
  },
  {
    icon: MessageCircle,
    title: "Conversas Sem Limites",
    description: "Chat direto, sem burocracia. Conheça novas pessoas, marque encontros e construa conexões genuínas no seu ritmo."
  },
  {
    icon: Sparkles,
    title: "Experiência Premium",
    description: "Desbloqueie mensagens ilimitadas, veja quem te visitou e tenha destaque na busca. Tudo para acelerar suas conexões."
  },
  {
    icon: Heart,
    title: "Feito com Cuidado",
    description: "A Sexando nasceu da vontade de criar um espaço seguro, moderno e brasileiro para o universo liberal. Cada detalhe foi pensado para você."
  }
];

const Sobre = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-white" />
          <div className="max-w-7xl mx-auto px-4 py-10 md:py-16 relative">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-6">
                A rede social brasileira do{" "}
                <span className="text-[hsl(330_100%_50%)]">estilo de vida liberal</span>
              </h1>
              <HyperTextParagraph
                text="Sexando é a plataforma que conecta casais, solteiros e solteiras em um ambiente seguro, verificado e sem tabus. Explore, conecte e viva suas experiências com total liberdade e privacidade."
                highlightWords={["conecta", "seguro", "verificado", "liberdade", "privacidade"]}
                className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
              />
            </div>
          </div>
        </section>

        {/* Separator */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        {/* Mission */}
        <section className="max-w-7xl mx-auto px-4 py-12 md:py-20">
          <div className="max-w-3xl mx-auto space-y-6 text-center">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">
              Nossa missão é <span className="text-[hsl(330_100%_50%)]">conectar</span> pessoas reais
            </h2>
            <HyperTextParagraph
              text="Acreditamos que todos merecem um espaço seguro para explorar suas conexões. A Sexando foi criada para remover o tabu e oferecer uma experiência moderna, discreta e 100% brasileira para quem vive ou quer conhecer o universo liberal."
              highlightWords={["seguro", "conexões", "Sexando", "brasileira", "liberal"]}
            />
            <HyperTextParagraph
              text="Com perfis verificados, privacidade garantida e uma comunidade ativa em todo o Brasil, facilitamos encontros entre pessoas com os mesmos interesses — seja para uma noite, uma amizade ou algo mais."
              highlightWords={["verificados", "privacidade", "comunidade", "encontros"]}
            />
          </div>
        </section>

        {/* Separator */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        {/* Values */}
        <section className="bg-secondary/30 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              {/* Texto à esquerda */}
              <div className="text-center lg:text-left lg:sticky lg:top-24">
                <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4">
                  O que nos <span className="text-[hsl(330_100%_50%)]">move</span>
                </h2>
                {/* Texto curto no mobile */}
                <p className="text-muted-foreground max-w-2xl mx-auto lg:hidden">
                  Princípios que guiam cada decisão da Sexando para oferecer a melhor experiência possível.
                </p>

                {/* Texto expandido no desktop */}
                <div className="hidden lg:block space-y-4 max-w-xl mb-6">
                  <HyperTextParagraph
                    text="Cada decisão que tomamos na Sexando parte de um propósito claro: criar o espaço mais seguro, moderno e acolhedor para quem vive ou deseja explorar o estilo de vida liberal no Brasil."
                    highlightWords={["seguro", "moderno", "acolhedor", "liberal", "Brasil"]}
                  />
                  <HyperTextParagraph
                    text="Acreditamos que liberdade e respeito andam juntos. Por isso construímos uma comunidade onde perfis verificados, privacidade real e ausência de julgamentos são a base de tudo — do primeiro acesso ao seu próximo encontro."
                    highlightWords={["liberdade", "respeito", "comunidade", "verificados", "privacidade"]}
                  />
                  <HyperTextParagraph
                    text="São esses princípios que guiam nosso trabalho diário e que tornam a Sexando diferente: tecnologia brasileira, discrição absoluta e uma experiência pensada nos mínimos detalhes para conectar pessoas reais com total confiança."
                    highlightWords={["princípios", "brasileira", "discrição", "conectar", "confiança"]}
                  />
                </div>
              </div>

              {/* Cards à direita */}
              <ContainerScroll className="space-y-6">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <CardSticky
                      key={value.title}
                      index={index}
                      incrementY={24}
                      className="top-24 rounded-2xl border border-border bg-white/70 backdrop-blur-xl shadow-lg p-8"
                    >
                      <div className="w-12 h-12 rounded-full bg-[hsl(330_100%_50%)]/10 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-[hsl(330_100%_50%)]" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                    </CardSticky>
                  );
                })}
              </ContainerScroll>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Sobre;
