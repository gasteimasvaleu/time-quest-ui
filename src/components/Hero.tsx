import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-background px-4 py-4 md:min-h-screen md:py-10 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Hero Container with rounded background */}
        <div className="relative overflow-hidden rounded-[40px] px-6 py-8 md:px-12 md:py-12 border border-gray-200">
          {/* Mobile background */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
            style={{
              backgroundImage:
                'url(https://jkdtqihgliygacjtakor.supabase.co/storage/v1/object/public/criativos/02178092594837833f1a7c43c44499172059af1828f594338fe75_0.jpeg)',
            }}
          />
          {/* Desktop background */}
          <div
            className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat md:block"
            style={{
              backgroundImage:
                'url(https://jkdtqihgliygacjtakor.supabase.co/storage/v1/object/public/criativos/021780925956717a2f4933af3443b601e52f5659e0d958f9b07de_0.jpeg)',
            }}
          />
          {/* Transparency overlay for text legibility */}
          <div className="absolute inset-0 bg-white/70" />

          {/* Main Hero Content */}
          <div className="relative z-10 mx-auto max-w-4xl text-center">

            {/* Headline */}
            <h1 className="mb-4 text-4xl font-light leading-tight tracking-tight md:text-6xl lg:text-7xl animate-fade-in-up">
              <span className="text-foreground">A rede social do </span>
              <span className="text-accent">estilo de vida liberal. </span>
              <span className="text-foreground">Conexões reais, sem julgamentos.</span>
            </h1>

            {/* Subheadline */}
            <p className="mb-6 text-lg text-gray-700 md:text-xl animate-fade-in-up">
              O Sexando reúne casais liberais, solteiros(as) e praticantes do estilo swing em um só lugar:
              rede social, comunidade, mídia adulta amadora e chamadas ao vivo. Perfis verificados,
              total privacidade — no desktop e no mobile.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up">
              <Button
                size="lg"
                className="bg-[hsl(330,100%,50%)] text-white hover:bg-[hsl(330,100%,45%)] hover:scale-105 transition-all shadow-lg border-2 border-[hsl(330,100%,50%)]"
                onClick={() => {
                  (window as any).gtagSendEvent('https://app.sexando.com/signup');
                }}
              >
                Criar Conta Grátis
              </Button>
              <a href="https://app.sexando.com">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background transition-all hover:scale-105"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Ver Como Funciona
                </Button>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
