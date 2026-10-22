import { createFileRoute } from "@tanstack/react-router";
import Sobre from "@/pages/Sobre";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/sobre")({
  head: () =>
    seo({
      title: "Sobre o Sexando | A rede social liberal brasileira",
      description: "Saiba quem somos: o Sexando é a rede social brasileira para casais liberais e solteiros(as), feita com respeito, consentimento e privacidade.",
      path: "/sobre",
    }),
  component: Sobre,
});
