import { createFileRoute } from "@tanstack/react-router";
import Admin from "@/pages/Admin";
import { noindexHead } from "@/lib/seo";

export const Route = createFileRoute("/adm")({
  head: () => noindexHead("Admin | Sexando"),
  component: Admin,
});
