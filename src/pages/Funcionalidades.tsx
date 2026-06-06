import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";
import {
  LayoutGrid,
  Radio,
  Flame,
  Search,
  Users,
  Bell,
  ShieldCheck,
  Settings,
  Gem,
} from "lucide-react";

const features = [
  {
    name: "Feed social",
    designation: "🏠 Comunidade",
    quote:
      "Feeds de Seguindo e Explorar, publicações com fotos e carrosséis, curtidas, comentários, stories com reações e filtros por gênero e estado.",
    src: "https://jkdtqihgliygacjtakor.supabase.co/storage/v1/object/public/criativos/021780739527001e1f2c28e220bf76d8a56e2a46eaa08e96346c1_0.jpeg",
  },
  {
    name: "Perfis ricos",
    designation: "👤 Sua vitrine",
    quote:
      "Perfil com fotos, vídeos, bio e localização, abas de publicações e estatísticas, selo de certificação, selo Premium e visitantes do perfil.",
    src: "https://jkdtqihgliygacjtakor.supabase.co/storage/v1/object/public/criativos/021780739375305e1f2c28e220bf76d8a56e2a46eaa08e9dce98f_0.jpeg",
  },
  {
    name: "Mensagens e chat",
    designation: "💬 Conexões em tempo real",
    quote:
      "Mensagens privadas 1:1, reações flutuantes, envio de mídias, alerta de segurança anti-golpe e Avatar IA para esquentar o clima.",
    src: "https://jkdtqihgliygacjtakor.supabase.co/storage/v1/object/public/criativos/0217807395727564498c7002523dcce63b4e4e02dd9ae9c76d04d_0.jpeg",
  },
  {
    name: "Chamadas de áudio e vídeo",
    designation: "📞 Ao vivo e privado",
    quote:
      "Ligações de áudio e vídeo privadas entre membros direto pelo app, com modal de chamada recebida e total discrição.",
    src: "https://jkdtqihgliygacjtakor.supabase.co/storage/v1/object/public/criativos/021780739766892fd3ae808d5ba084b55a7f9e1600032cdf60c97_0.jpeg",
  },
  {
    name: "Livecam",
    designation: "🔴 Transmissões ao vivo",
    quote:
      "Transmissões ao vivo da comunidade com chat em tempo real durante a live e lives recentes destacadas no Explorar.",
    icon: <Radio />,
  },
  {
    name: "Hot or Not",
    designation: "🔥 Recurso Premium",
    quote:
      "Poste sua foto, dê notas e veja quem está bombando no ranking da comunidade. Pura adrenalina, liberado no Premium.",
    icon: <Flame />,
  },
  {
    name: "Busca e descoberta",
    designation: "🔎 Encontre quem importa",
    quote:
      "Busca avançada por gênero, cidade, estado, idade e online agora, Top Sexando, perto de você e sugestões de amizade personalizadas.",
    icon: <Search />,
  },
  {
    name: "Amigos e seguidores",
    designation: "👥 Prova social",
    quote:
      "Sistema de seguir, amizades e favoritos, com recomendações públicas escritas por outros membros que reforçam sua reputação.",
    icon: <Users />,
  },
  {
    name: "Notificações",
    designation: "🔔 Nada passa batido",
    quote:
      "Push notifications no navegador e mobile para curtidas, comentários, novos seguidores, mensagens e lives, com central de notificações.",
    icon: <Bell />,
  },
  {
    name: "Privacidade e segurança",
    designation: "🔒 No controle",
    quote:
      "Modo incógnito, bloqueio bidirecional, controle de quem vê suas fotos e perfil, denúncias, verificação +18 e certificação de foto.",
    icon: <ShieldCheck />,
  },
  {
    name: "Minha conta",
    designation: "⚙️ Tudo no seu jeito",
    quote:
      "Edição de perfil, e-mail e senha, preferências de notificação, gestão da assinatura Premium e histórico de login e pagamentos.",
    icon: <Settings />,
  },
  {
    name: "Premium",
    designation: "💎 Experiência completa",
    quote:
      "Pagamentos via Mercado Pago (Pix e cartão) que desbloqueiam Hot or Not, Avatar IA, busca avançada, selo Premium e muito mais.",
    icon: <Gem />,
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
