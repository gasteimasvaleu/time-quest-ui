import { createFileRoute } from "@tanstack/react-router";
import Funcionalidades from "@/pages/Funcionalidades";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/funcionalidades")({
  head: () =>
    seo({
      title: "Funcionalidades do Sexando | Perfis, lives e comunidade",
      description: "Conheça os recursos do Sexando: perfis verificados, busca por cidade, mensagens, lives, Hot or Not e uma comunidade liberal com total privacidade.",
      path: "/funcionalidades",
    }),
  component: Funcionalidades,
});
