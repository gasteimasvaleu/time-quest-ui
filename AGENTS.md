# Project rules

- App runs on TanStack Start (SSR); pages live in `src/routes/`, page bodies in `src/pages/`. Why: crawlers must get real HTML per page.
- Every public route sets its own head via `seo()` from `src/lib/seo.ts` (title, description, self-referencing canonical/og:url); private routes use `noindexHead()`. Why: duplicate canonicals made Google treat all pages as the home page.
- Sitewide tags (GTM, Google tag, Meta Pixel, rating=adult, Organization JSON-LD) live in `src/routes/__root.tsx` head. Why: there is no index.html anymore.
- Sitemap is the server route `src/routes/sitemap[.]xml.ts`; add new public routes to its list, blog posts are included automatically. Why: keeps posts in sync without a build step.
- AI/chat/search backends are server routes under `src/routes/api/*` calling handlers in `src/server/*.server.ts`. Why: same deploy as the site, no separate functions runtime.
- Navigation imports go through `@/lib/router-compat` (react-router-style API over TanStack Router). Why: keeps existing components unchanged.
