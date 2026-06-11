Vou aplicar as melhorias de SEO da home e do site como um todo.

## O que será feito

1. **`index.html`**
   - Corrigir `lang="en"` → `lang="pt-BR"`.
   - Adicionar `<link rel="canonical" href="https://sexando.com/" />`.
   - Adicionar `<meta property="og:url" content="https://sexando.com/" />`.
   - Adicionar JSON-LD do tipo `Organization` (nome, url, logo).

2. **`public/sitemap.xml`** (novo, via gerador)
   - Criar `scripts/generate-sitemap.ts` com `BASE_URL = https://sexando.com` listando as rotas públicas indexáveis (`/`, `/inicio`, `/mobileapp` e demais rotas reais do `src/App.tsx`, exceto 404/internas).
   - Adicionar scripts `predev`/`prebuild` no `package.json` para gerar o sitemap automaticamente.

3. **`public/robots.txt`**
   - Adicionar a diretiva `Sitemap: https://sexando.com/sitemap.xml` (mantendo os blocos existentes).

## Observação sobre SEO por página

O `index.html` é estático e compartilhado por todas as rotas, então hoje todas usam o mesmo title/description. Se quiser title/description únicos por página (`/inicio`, `/mobileapp` etc.), posso instalar `react-helmet-async` num segundo passo. Por enquanto este plano foca nas correções sitewide acima — me avise se quer incluir o por-página também.