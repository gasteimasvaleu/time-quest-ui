import { Dumbbell, ListChecks, ChefHat } from "lucide-react";
import { cn } from "@/lib/utils";

const Solutions = () => {
  const features = [
    {
      icon: Dumbbell,
      title: "FitTracker",
      description: "Registre seus exercícios e acompanhe o impacto nas suas metas nutricionais",
    },
    {
      icon: ListChecks,
      title: "Gestão Eficaz",
      description: "Priorize e gerencie sua alimentação de forma eficaz para focar no que realmente importa para sua saúde.",
    },
    {
      icon: ChefHat,
      title: "MasterChefit",
      description: "Crie cardápios personalizados baseados nos seus gostos e necessidades alimentares",
    }
  ];

  return (
    <section className="relative w-full bg-background px-4 py-4 md:px-8 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Título */}
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight text-center text-foreground mb-8 md:mb-16 animate-fade-in-up">
          Resolva seus maiores <span className="italic font-serif">desafios</span>
          <br />
          com a alimentação
        </h2>

        {/* Cards de Benefícios com Hover Effects */}
        <div className="grid grid-cols-1 md:grid-cols-3 relative z-10 py-4 md:py-10 mb-8 md:mb-16 animate-fade-in-up">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={cn(
                  "flex flex-col lg:border-r py-6 md:py-10 relative group/feature border-border",
                  index === 0 && "lg:border-l border-border",
                  "lg:border-b border-border"
                )}
              >
                {/* Gradient overlay on hover */}
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-muted to-transparent pointer-events-none" />
                
                {/* Icon */}
                <div className="mb-4 relative z-10 px-10 text-muted-foreground">
                  <Icon className="w-6 h-6" />
                </div>
                
                {/* Title with animated indicator */}
                <div className="text-lg font-bold mb-2 relative z-10 px-10">
                  <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-muted-foreground/30 group-hover/feature:bg-primary transition-all duration-200 origin-center" />
                  <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-foreground">
                    {feature.title}
                  </span>
                </div>
                
                {/* Description */}
                <p className="text-sm text-muted-foreground max-w-xs relative z-10 px-10">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Preview do App */}
        <div className="hidden lg:block relative animate-fade-in-up">
          <div
            className="rounded-3xl py-16 px-12 min-h-[500px] flex items-center bg-cover bg-center relative overflow-hidden border border-gray-200"
            style={{ backgroundImage: "url('https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/background3.png')" }}
          >
            
            {/* Conteúdo sobreposto */}
            <div className="relative z-10 flex flex-col justify-center space-y-6 max-w-lg">
              <h3 className="text-4xl xl:text-5xl font-light leading-tight tracking-tight text-black">
                Sua nutrição na <span className="italic font-serif">palma da mão</span>
              </h3>
              <p className="text-lg text-black/80 max-w-md">
                Acompanhe suas refeições, monitore seus nutrientes e alcance seus objetivos de saúde com facilidade.
              </p>
              <div>
                <a href="https://apps.apple.com/app/we-diet/id6761124021" target="_blank" rel="noopener noreferrer" className="bg-black text-white rounded-full px-8 py-3 text-sm font-medium hover:bg-black/90 transition-colors inline-block">
                  Baixar na Apple Store
                </a>
              </div>
            </div>
          </div>

          {/* Elementos Decorativos */}
          {/* Círculo cinza superior esquerdo */}
          <div className="hidden lg:block absolute -top-8 -left-8 w-32 h-32 bg-muted/20 rounded-full blur-xl"></div>
          
          {/* Círculo cinza inferior direito */}
          <div className="hidden lg:block absolute -bottom-8 -right-8 w-40 h-40 bg-muted/20 rounded-full blur-xl"></div>

        </div>
      </div>
    </section>
  );
};

export default Solutions;
