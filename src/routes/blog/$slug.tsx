import { createFileRoute, notFound } from "@tanstack/react-router";
import BlogPost from "@/pages/BlogPost";
import NotFound from "@/pages/NotFound";
import { SITE_URL, seo } from "@/lib/seo";
import { fetchPostBySlug } from "@/lib/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await fetchPostBySlug(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {};
    const post = loaderData;
    const title = `${post.meta_title || post.title} | Sexando`;
    const description = post.meta_description || post.excerpt;
    const base = seo({
      title,
      description,
      path: `/blog/${params.slug}`,
      image: post.cover_url,
      type: "article",
    });
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description,
      datePublished: post.published_at,
      dateModified: post.updated_at,
      ...(post.cover_url ? { image: post.cover_url } : {}),
      mainEntityOfPage: `${SITE_URL}/blog/${params.slug}`,
      author: { "@type": "Organization", name: "Sexando" },
      publisher: { "@type": "Organization", name: "Sexando" },
    };
    return {
      ...base,
      meta: [
        ...base.meta,
        ...(post.keywords.length ? [{ name: "keywords", content: post.keywords.join(", ") }] : []),
        ...(post.published_at ? [{ property: "article:published_time", content: post.published_at }] : []),
      ],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
    };
  },
  notFoundComponent: NotFound,
  component: BlogPostRoute,
});

function BlogPostRoute() {
  const post = Route.useLoaderData();
  return <BlogPost post={post} />;
}
