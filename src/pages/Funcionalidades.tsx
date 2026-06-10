import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";
import {
  LayoutGrid,
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
    src: "https://jkdtqihgliygacjtakor.supabase.co/storage/v1/object/public/criativos/0217807398092774dfea62baf69d67974043520385d8b3c177c76_0.jpeg",
  },
  {
    name: "Hot or Not",
    designation: "🔥 Recurso Premium",
    quote:
      "Poste sua foto, dê notas e veja quem está bombando no ranking da comunidade. Pura adrenalina, liberado no Premium.",
    src: "https://jkdtqihgliygacjtakor.supabase.co/storage/v1/object/public/criativos/02178073991064949d9e4e345fff0a9cbe1dfa11f8e7ca03c45d7_0.jpeg",
  },
  {
    name: "Busca e descoberta",
    designation: "🔎 Encontre quem importa",
    quote:
      "Busca avançada por gênero, cidade, estado, idade e online agora, Top Sexando, perto de você e sugestões de amizade personalizadas.",
    src: "https://jkdtqihgliygacjtakor.supabase.co/storage/v1/object/public/criativos/021780739982108d2ccc3ebdfdab12ac26ff482d60ed0ee13f980_0.jpeg",
  },
  {
    name: "Amigos e seguidores",
    designation: "👥 Prova social",
    quote:
      "Sistema de seguir, amizades e favoritos, com recomendações públicas escritas por outros membros que reforçam sua reputação.",
    src: "https://jkdtqihgliygacjtakor.supabase.co/storage/v1/object/public/criativos/0217807401063315482bcf7e80bfa8bf500513aca3a704d9c8928_0.jpeg",
  },
  {
    name: "Notificações",
    designation: "🔔 Nada passa batido",
    quote:
      "Push notifications no navegador e mobile para curtidas, comentários, novos seguidores, mensagens e lives, com central de notificações.",
    src: "https://jkdtqihgliygacjtakor.supabase.co/storage/v1/object/public/criativos/0217807401521211386b9a8ed856c57501cfa946ce34c98f7bc2d_0.jpeg",
  },
  {
    name: "Privacidade e segurança",
    designation: "🔒 No controle",
    quote:
      "Modo incógnito, bloqueio bidirecional, controle de quem vê suas fotos e perfil, denúncias, verificação +18 e certificação de foto.",
    src: "https://jkdtqihgliygacjtakor.supabase.co/storage/v1/object/public/criativos/021780740253904d4c69f90bdf814940b1abafd46c62ec67889d0_0.jpeg",
  },
  {
     name: "Minha conta",
     designation: "⚙️ Tudo no seu jeito",
     quote:
       "Edição de perfil, e-mail e senha, preferências de notificação, gestão da assinatura Premium e histórico de login e pagamentos.",
     src: "https://jkdtqihgliygacjtakor.supabase.co/storage/v1/object/public/criativos/021780740319807e142d87b6a9bdf1f5f94f64260ca2a933d66ba_0.jpeg",
   },
  {
    name: "Premium",
    designation: "💎 Experiência completa",
    quote:
      "Pagamentos via Mercado Pago (Pix e cartão) que desbloqueiam Hot or Not, Avatar IA, busca avançada, selo Premium e muito mais.",
    src: "https://jkdtqihgliygacjtakor.supabase.co/storage/v1/object/public/criativos/021780740561800b60c2cebbbed8b1cc7b57b46439bb32b547052_0.jpeg",
  },
  {
    name: "Streaming (Sexando Flix)",
    designation: "📺 Conteúdo em vídeo estilo Netflix",
    quote:
      "Home com carrosséis de continuar assistindo, novidades, top ranked e assistir mais tarde. Player completo com curtidas, comentários, download, compartilhamento e progresso salvo. Upload nativo de vídeos ou importação por URL com miniaturas desktop/mobile, título, descrição e categoria. Busca inteligente e preview ao passar o mouse. Splash screen cinemática com animação em vídeo antes do acesso.",
    src: "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/0217811289066410f20bbdfc8ca54d9bbb0533a8546905c8873c9_0.jpeg",
  },
  {
    name: "Tokens",
    designation: "🪙 Carteira, gorjetas e destaques",
    quote:
      "Sistema de tokens com saldo disponível e bloqueado, histórico completo de transações e estatísticas lifetime. Compra via Pix com QR Code e crédito instantâneo. Envie gorjetas em posts, lives e perfis. Destaque posts, fotos, vídeos e perfis para mais visibilidade com durações de 24h a 72h.",
    src: "https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/021781128920242f39d09b715cb307c823cd4ff1a5ec1ab47bf0b_0.jpeg",
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
