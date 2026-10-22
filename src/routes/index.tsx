import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "Sexando – Rede social para casais liberais e swing",
      description:
        "Sexando é a rede social brasileira para casais liberais, solteiros(as) e o universo swing. Perfis verificados, comunidade, lives e total privacidade.",
      path: "/",
    }),
  component: Index,
});
