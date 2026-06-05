import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";

const PLACEHOLDER = "/placeholder.svg";

const features = [
  {
    name: "Identificação por Foto",
    designation: "📸 Reconhecimento com IA",
    quote:
      "Aponte a câmera para qualquer prato e receba a análise nutricional completa em segundos, com mais de 10.000 alimentos reconhecidos.",
    src: "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/0217772788137548fef509893d762bd38fa7b39384b5467e8c597_0.jpeg",
  },
  {
    name: "Scanner de Código de Barras",
    designation: "📦 +5 milhões de produtos",
    quote:
      "Leia qualquer código de barras e acesse informações nutricionais instantaneamente, com alertas de glúten, lactose e mais.",
    src: "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/image_1775720505935_fd39f837.jpg",
  },
  {
    name: "Assistente no WhatsApp",
    designation: "💬 Nutricionista 24/7",
    quote:
      "Envie a foto do seu prato pelo WhatsApp e receba uma análise nutricional completa em até 30 segundos, a qualquer hora.",
    src: "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/021779438173307085ce2a5b85bafc715e5d42a46d0455198a983_0.jpeg",
  },
  {
    name: "Diário Alimentar",
    designation: "📔 Registro automático",
    quote:
      "Suas refeições organizadas por período do dia, com gráficos de evolução e alertas inteligentes de consumo.",
    src: "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/image_1775721012730_1f87c294.png",
  },
  {
    name: "Macros em Tempo Real",
    designation: "🧮 Dashboard ao vivo",
    quote:
      "Visualize proteínas, carboidratos e gorduras com metas personalizáveis e alertas quando ultrapassar limites.",
    src: "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/021778139015739a81c77d48bc6ef475723297888da35161e5337_0.jpeg",
  },
  {
    name: "FitTracker",
    designation: "💪 +500 exercícios",
    quote:
      "Registre treinos, calcule gasto calórico personalizado e integre com seu smartwatch para acompanhar tudo num só lugar.",
    src: "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/image_1775720564158_e016052b.png",
  },
  {
    name: "Balanço Calórico",
    designation: "⚖️ Déficit ou superávit",
    quote:
      "Acompanhe seu balanço diário e semanal com sugestões automáticas de ajuste e projeção de quando atingir suas metas.",
    src: "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/0217776278370570fff30dca92d5f275a0fb147aaa6e5732acb92_0.jpeg",
  },
  {
    name: "Metas Inteligentes",
    designation: "🎯 Curto e longo prazo",
    quote:
      "Defina objetivos flexíveis que se adaptam ao seu progresso, com notificações motivacionais no momento certo.",
    src: "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/image_1775721449445_8bc55e81.png",
  },
  {
    name: "Perfil Completo",
    designation: "👤 Sua evolução visual",
    quote:
      "Galeria de antes e depois, avaliações físicas, ficha de treino e uma timeline de todas as suas conquistas.",
    src: "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/image_1779436164408_842711aa.jpg",
  },
  {
    name: "Vídeos Exclusivos",
    designation: "🎥 Treinos e receitas",
    quote:
      "Conteúdo novo toda semana com treinos para todos os níveis, receitas saudáveis e dicas de nutricionistas.",
    src: "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/image_1775721521412_b545a3b4.jpg",
  },
  {
    name: "Provador Virtual",
    designation: "👗 Veja-se com qualquer roupa",
    quote:
      "Envie sua foto e uma peça de roupa, e a IA gera o look pronto. Troque modelos, baixe e compartilhe no WhatsApp.",
    src: "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/02177798148734335338acc098a5d522f02313a829aa5701219f8_0.jpeg",
  },
  {
    name: "Lista de Compras",
    designation: "🛒 IA organiza pra você",
    quote:
      "Listas por categoria com estimativa de custo, normalização automática de itens e envio direto no WhatsApp.",
    src: "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/021777981665904bc1c88901295dc331d2b18ca32f912fe1ef818_0.jpeg",
  },
  {
    name: "Faça em Casa",
    designation: "👨‍🍳 Fast food vira receita",
    quote:
      "A IA identifica o prato da foto e entrega a versão caseira completa, com comparativo nutricional e economia.",
    src: "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/image_1776795609253_c584c5d6.png",
  },
  {
    name: "Apple Health",
    designation: "❤️ iOS sincronizado",
    quote:
      "Passos, calorias ativas, peso e treinos do Strava, Garmin e Apple Watch integrados ao seu acompanhamento.",
    src: "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/021777982155611c41b39946b92a3163d51611244fc4a0d1277e0_0.jpeg",
  },
  {
    name: "Banco de Receitas",
    designation: "📖 Saudáveis e práticas",
    quote:
      "Centenas de receitas com macros já calculados, modo de preparo passo a passo e favoritas sempre à mão.",
    src: "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/021777373611838c2670fe791a5f29d61bdea8e0ada6c5d2e7d7c_0.jpeg",
  },
  {
    name: "NutriCoach IA",
    designation: "💬 Coach pessoal",
    quote:
      "Tire dúvidas de nutrição a qualquer hora e receba orientação personalizada baseada no seu histórico.",
    src: "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/Imagem_IA_v73.png",
  },
];

const Funcionalidades = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />


      <main className="flex-1 py-8 md:py-16">
        <CircularTestimonials
          testimonials={features}
          autoplay
          colors={{
            name: "hsl(var(--foreground))",
            designation: "hsl(var(--muted-foreground))",
            testimony: "hsl(var(--foreground) / 0.8)",
            arrowBackground: "#000000",
            arrowForeground: "#ffffff",
            arrowHoverBackground: "hsl(330 100% 50%)",
          }}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Funcionalidades;
