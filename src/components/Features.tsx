import { Button } from "@/components/ui/button";


const Features = () => {
  const features = [
    {
      image: "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/mulherprato.png",
      title: "Registro de Refeições",
      description: "Registre facilmente suas refeições diárias com detalhes nutricionais completos",
      iconBg: "bg-orange-100"
    },
    {
      image: "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/mulher%20olhando%20cel.png",
      title: "Análise de Nutrientes via Foto",
      description: "Tire uma foto do seu prato e receba análise nutricional instantânea com IA",
      iconBg: "bg-blue-100"
    },
    {
      image: "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/mulherdoritos.png",
      title: "Scanner de Código de Barras",
      description: "Escaneie produtos para acessar informações nutricionais automaticamente",
      iconBg: "bg-green-100"
    },
    {
      image: "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/mulhersofa.png",
      title: "Relatórios Personalizados",
      description: "Acompanhe seu progresso com relatórios detalhados e insights personalizados",
      iconBg: "bg-purple-100"
    }
  ];

  return (
    <section className="bg-background py-4 md:py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Mobile-only App Store card */}
        <div className="block md:hidden rounded-[40px] border border-gray-200 bg-secondary overflow-hidden mb-6">
          <img
            src="https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/mulhercel.png"
            alt="Mulher usando o app WeDiet"
            className="w-full object-cover"
          />
          <div className="px-6 py-6">
            <a href="https://apps.apple.com/app/we-diet/id6761124021" target="_blank" rel="noopener noreferrer" className="w-full">
              <Button className="w-full rounded-full bg-foreground text-background hover:bg-foreground/90 text-base py-6">
                Baixar na AppleStore
              </Button>
            </a>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[40px] px-6 py-12 md:px-12 md:py-16 border border-gray-200 bg-secondary text-center">
          {/* Título principal */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 text-foreground">
            Tudo o que você precisa para uma{" "}
            <span className="text-accent">alimentação saudável</span>
          </h2>

          {/* Subtítulo */}
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-12">
            Ferramentas inteligentes para monitorar e melhorar seus hábitos alimentares
          </p>

          {/* Grid de Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl pt-6 px-6 pb-6 shadow-card text-center hover:shadow-lg transition-shadow flex flex-col items-center"
              >
                {/* Imagem */}
                <img src={feature.image} alt={feature.title} className="w-[300px] h-[300px] object-contain mb-4 mx-auto" />

                {/* Título */}
                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                  {feature.title}
                </h3>

                {/* Descrição */}
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
