import { createFileRoute } from "@tanstack/react-router";
import MobileApp from "@/pages/MobileApp";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/mobileapp")({
  head: () =>
    seo({
      title: "App Sexando para Android e iPhone",
      description: "Baixe o app do Sexando para Android e iPhone e leve a rede social liberal brasileira no bolso, com perfis verificados e total privacidade.",
      path: "/mobileapp",
    }),
  component: MobileApp,
});
