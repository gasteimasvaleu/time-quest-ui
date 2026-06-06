import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CardStack, type CardStackItem } from "@/components/ui/card-stack";

const PLACEHOLDER_ITEMS: CardStackItem[] = [
  {
    id: 1,
    title: "Conheça pessoas reais na sua cidade",
    description: "Entre grátis e descubra quem está perto de você. Sem tabu, direto ao ponto.",
    imageSrc:
      "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/02177943855142835b29c922ac7ba22cc26b6e12169d213e8d949_0.jpeg",
  },
  {
    id: 2,
    title: "Encontre o par ideal",
    description: "Filtre por cidade, idade e preferências — agora. Busca avançada e match personalizado.",
    imageSrc:
      "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/021779439119743df1fe1cc6cb558c8468775817e951d5d7dedf1_0.jpeg",
  },
  {
    id: 3,
    title: "Milhares já estão conectando",
    description: "Casais e solteiros do Brasil inteiro já fazem parte. O que você está esperando?",
    imageSrc:
      "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/02177798166531335338acc098a5d522f02313a829aa5701218cc_0.jpeg",
  },
  {
    id: 4,
    title: "Vire Premium agora",
    description: "Desbloqueie mensagens ilimitadas e veja quem te visitou. Aproveite o valor imediato.",
    imageSrc:
      "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/021779439478159373615d827d98655cdf28f8c9eebc817d87666_0.jpeg",
  },
  {
    id: 5,
    title: "100% brasileiro, verificado e seguro",
    description: "Perfis verificados e total privacidade. Seu encontro começa aqui.",
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
