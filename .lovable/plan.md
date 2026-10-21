# Banner do parceiro Monetisexy acima do aviso de afiliados

## O que muda
- Novo banner com a imagem enviada, logo abaixo do menu e acima do card de afiliados na página inicial.
- O banner inteiro vira um link para https://monetisexy.com, abrindo em nova aba (a imagem não tem um botão separado, então o clique vale para todo o banner, incluindo o logo "monetisexy").
- Mesma largura e cantos arredondados do card de afiliados, com sombra leve.

## Detalhes técnicos
- Hospedar a imagem via lovable-assets (`src/assets/banner-monetisexy.png.asset.json`).
- Criar `src/components/PartnerBanner.tsx`: `<a href="https://monetisexy.com" target="_blank" rel="noopener sponsored">` com `<img>` (alt "Monetisexy - site parceiro", `loading="eager"`, `w-full h-auto rounded-[40px]`), container `max-w-7xl`, padding igual ao AffiliateNotice.
- Em `Index.tsx`, renderizar `<PartnerBanner />` entre `<Navbar />` e `<AffiliateNotice />`; reduzir o `pt` do AffiliateNotice não é necessário.
