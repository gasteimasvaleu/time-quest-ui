import { createFileRoute } from "@tanstack/react-router";
import Precos from "@/pages/Precos";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/precos")({
  head: () =>
    seo({
      title: "Planos e preços do Sexando | Grátis e Premium",
      description: "Comece grátis no Sexando. Com o Premium você libera mensagens ilimitadas, visitantes sem blur, modo incógnito, Livecam e muito mais.",
      path: "/precos",
    }),
  component: Precos,
});
