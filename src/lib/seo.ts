export const SITE_URL = "https://sexando.com";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

type SeoInput = {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  type?: "website" | "article";
  noindex?: boolean;
};

/** Per-page head tags: title, description, canonical and social previews pointing at the page itself. */
export function seo({ title, description, path, image, type = "website", noindex }: SeoInput) {
  const url = `${SITE_URL}${path}`;
  const img = image || DEFAULT_OG_IMAGE;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: type },
      { property: "og:image", content: img },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: img },
      ...(noindex ? [{ name: "robots", content: "noindex" }] : []),
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

export const noindexHead = (title: string) => ({
  meta: [{ title }, { name: "robots", content: "noindex, nofollow" }],
});
