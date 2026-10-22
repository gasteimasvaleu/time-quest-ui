import { createFileRoute } from "@tanstack/react-router";
import Obrigado from "@/pages/Obrigado";
import { noindexHead } from "@/lib/seo";

export const Route = createFileRoute("/obrigado")({
  head: () => noindexHead("Obrigado | Sexando"),
  component: Obrigado,
});
