import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const FreeVersion = () => {
  return (
    <section className="w-full bg-background px-4 py-12 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16">
          {/* Imagem */}
          <div className="overflow-hidden rounded-3xl">
            <img
              src="https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/021778188333591346b8af97ccb99950d11a02fa7c7314735aba9_0.jpeg"
              alt="Versão grátis do We Diet"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>

          {/* Texto */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent mb-5">
              <Sparkles className="h-4 w-4" />
              Novidade
            </span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-foreground mb-5">
              Chegou a versão <span className="text-accent">grátis</span> do We Diet
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-md">
              Agora você pode experimentar as principais funcionalidades do app sem pagar nada. Baixe agora e comece a transformar sua alimentação hoje mesmo.
            </p>
            <Button
              size="lg"
              asChild
              className="rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all hover:scale-105 px-8"
            >
              <a
                href="https://apps.apple.com/app/we-diet/id6761124021"
                target="_blank"
                rel="noopener noreferrer"
              >
                Baixar Grátis
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeVersion;
