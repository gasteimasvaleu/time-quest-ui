import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CardStack, type CardStackItem } from "@/components/ui/card-stack";

const PLACEHOLDER_ITEMS: CardStackItem[] = [
  {
    id: 1,
    title: "Wediet versão Grátis",
    description: "Comece sua transformação hoje mesmo com acesso gratuito às principais ferramentas do app.",
    imageSrc:
      "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/02177943855142835b29c922ac7ba22cc26b6e12169d213e8d949_0.jpeg",
  },
  {
    id: 2,
    title: "Ganhe dinheiro enquanto evolui",
    description: "Participe dos quizzes semanais do Wediet e dispute prêmios de até R$500 toda semana.",
    imageSrc:
      "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/021779439119743df1fe1cc6cb558c8468775817e951d5d7dedf1_0.jpeg",
  },
  {
    id: 3,
    title: "Sua dieta ficou mais fácil",
    description: "Escaneie refeições, acompanhe calorias e tenha ajuda da IA do Wediet todos os dias.",
    imageSrc:
      "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/02177798166531335338acc098a5d522f02313a829aa5701218cc_0.jpeg",
  },
  {
    id: 4,
    title: "Chega de começar e desistir",
    description: "O Wediet te ajuda a manter constância com metas, desafios e acompanhamento diário.",
    imageSrc:
      "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/021779439478159373615d827d98655cdf28f8c9eebc817d87666_0.jpeg",
  },
  {
    id: 5,
    title: "Seu novo estilo de vida começa agora",
    description: "Treinos, nutrição, receitas fitness e ferramentas inteligentes para acelerar seus resultados.",
    imageSrc:
      "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/0217782284095729953a9193bc3926b190298875f636f3e884a6d_0.jpeg",
  },
];

const Inicio = () => {
  return (
    <main>
      <Navbar />
      <section className="max-w-7xl mx-auto px-4 pt-4 pb-16 md:pt-6 md:pb-24">
        <CardStack items={PLACEHOLDER_ITEMS} />
      </section>
      <Footer />
    </main>
  );
};

export default Inicio;
