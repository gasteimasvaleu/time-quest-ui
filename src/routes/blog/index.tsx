import { createFileRoute } from "@tanstack/react-router";
import Blog from "@/pages/Blog";
import { seo } from "@/lib/seo";
import { fetchPublishedPosts } from "@/lib/blog";

export const Route = createFileRoute("/blog/")({
  loader: () => fetchPublishedPosts(),
  head: () =>
    seo({
      title: "Blog Sexando | Dicas sobre o estilo de vida liberal",
      description:
        "Artigos sobre o estilo de vida liberal, relacionamentos abertos, swing, segurança e privacidade, escritos pela equipe do Sexando.",
      path: "/blog",
    }),
  component: BlogRoute,
});

function BlogRoute() {
  const posts = Route.useLoaderData();
  return <Blog posts={posts} />;
}
