import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { SITE_URL } from "@/lib/seo";

type Entry = { path: string; lastmod?: string; changefreq: string; priority: string };

const STATIC: Entry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/funcionalidades", changefreq: "monthly", priority: "0.8" },
  { path: "/precos", changefreq: "monthly", priority: "0.8" },
  { path: "/sobre", changefreq: "monthly", priority: "0.6" },
  { path: "/contato", changefreq: "monthly", priority: "0.6" },
  { path: "/mobileapp", changefreq: "monthly", priority: "0.7" },
  { path: "/search", changefreq: "monthly", priority: "0.6" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const { data } = await supabase
          .from("posts")
          .select("slug, updated_at")
          .eq("status", "published")
          .order("published_at", { ascending: false });
        const posts: Entry[] = (data ?? []).map((p) => ({
          path: `/blog/${p.slug}`,
          lastmod: p.updated_at.slice(0, 10),
          changefreq: "monthly",
          priority: "0.7",
        }));
        const urls = [...STATIC, ...posts]
          .map((e) =>
            [
              "  <url>",
              `    <loc>${SITE_URL}${e.path}</loc>`,
              e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
              `    <changefreq>${e.changefreq}</changefreq>`,
              `    <priority>${e.priority}</priority>`,
              "  </url>",
            ]
              .filter(Boolean)
              .join("\n"),
          )
          .join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
