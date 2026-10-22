import { createFileRoute } from "@tanstack/react-router";
import Search from "@/pages/Search";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/search")({
  head: () =>
    seo({
      title: "Encontre casas de swing por cidade | Sexando",
      description: "Busque casas de swing, clubes liberais e locais adultos na sua cidade, com resultados públicos organizados pelo Sexando.",
      path: "/search",
    }),
  component: Search,
});
