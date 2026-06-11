import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CardStack, type CardStackItem } from "@/components/ui/card-stack";

const PLACEHOLDER_ITEMS: CardStackItem[] = [
  {
    id: 1,
    title: "Conheça pessoas reais na sua cidade",
    description: "Entre grátis e descubra quem está perto de você. Sem tabu, direto ao ponto.",
    imageSrc:
      "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/result_03%20%284%29.png",
  },
  {
    id: 2,
    title: "Encontre o par ideal",
    description: "Filtre por cidade, idade e preferências — agora. Busca avançada e match personalizado.",
    imageSrc:
      "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/result_03%20%283%29.png",
  },
  {
    id: 3,
    title: "Milhares já estão conectando",
    description: "Casais e solteiros do Brasil inteiro já fazem parte. O que você está esperando?",
    imageSrc:
      "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/result_01%20%283%29.png",
  },
  {
    id: 4,
    title: "Vire Premium agora",
    description: "Desbloqueie mensagens ilimitadas e veja quem te visitou. Aproveite o valor imediato.",
    imageSrc:
      "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/result_01%20%282%29.png",
  },
  {
    id: 5,
    title: "100% brasileiro, verificado e seguro",
    description: "Perfis verificados e total privacidade. Seu encontro começa aqui.",
    imageSrc:
      "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/result_00%20%283%29.png",
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
