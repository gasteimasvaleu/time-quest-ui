import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CardStack, type CardStackItem } from "@/components/ui/card-stack";

const PLACEHOLDER_ITEMS: CardStackItem[] = [
  {
    id: 1,
    title: "Conheça pessoas reais na sua cidade",
    description: "Entre grátis e descubra quem está perto de você. Sem tabu, direto ao ponto.",
    imageSrc:
      "https://jkdtqihgliygacjtakor.supabase.co/storage/v1/object/public/criativos/021780738425628e8ad6f8fac80a9b78040141fa10ae51dcb210c_0.jpeg",
  },
  {
    id: 2,
    title: "Encontre o par ideal",
    description: "Filtre por cidade, idade e preferências — agora. Busca avançada e match personalizado.",
    imageSrc:
      "https://jkdtqihgliygacjtakor.supabase.co/storage/v1/object/public/criativos/0217807385371067afbd658227445da69c5198dc2d1b7084ff2c6_0.jpeg",
  },
  {
    id: 3,
    title: "Milhares já estão conectando",
    description: "Casais e solteiros do Brasil inteiro já fazem parte. O que você está esperando?",
    imageSrc:
      "https://jkdtqihgliygacjtakor.supabase.co/storage/v1/object/public/criativos/0217807385561859953a9193bc3926b190298875f636f3ea56d4b_0.jpeg",
  },
  {
    id: 4,
    title: "Vire Premium agora",
    description: "Desbloqueie mensagens ilimitadas e veja quem te visitou. Aproveite o valor imediato.",
    imageSrc:
      "https://jkdtqihgliygacjtakor.supabase.co/storage/v1/object/public/criativos/021780738583670f147e4ba9f32c95179b8fd5b208fc9b4c10e89_0.jpeg",
  },
  {
    id: 5,
    title: "100% brasileiro, verificado e seguro",
    description: "Perfis verificados e total privacidade. Seu encontro começa aqui.",
    imageSrc:
      "https://jkdtqihgliygacjtakor.supabase.co/storage/v1/object/public/criativos/02178073871168840df8d8926005c369421892d4819382eaaaeed_0.jpeg",
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
