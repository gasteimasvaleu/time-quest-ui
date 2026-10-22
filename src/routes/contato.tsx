import { createFileRoute } from "@tanstack/react-router";
import Contato from "@/pages/Contato";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contato")({
  head: () =>
    seo({
      title: "Contato | Sexando",
      description: "Fale com a equipe do Sexando: tire dúvidas sobre conta, planos e privacidade com nosso assistente ou pelo e-mail suporte@sexando.com.",
      path: "/contato",
    }),
  component: Contato,
});
