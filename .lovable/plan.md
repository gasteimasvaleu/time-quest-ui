# Mover o banner Monetisexy para baixo do carrossel

## O que muda
- O banner sai do topo (acima do card de afiliados) e passa a ficar logo abaixo do carrossel de imagens e acima do rodapé da página inicial.
- O link para https://monetisexy.com continua igual.

## Detalhes técnicos
- Em `src/pages/Index.tsx`, mover `<PartnerBanner />` para entre `<AnimatedMarqueeHero />` e `<Footer />`.
- Em `PartnerBanner.tsx`, ajustar espaçamento para `py-8 md:py-12` e trocar `loading="eager"` por `loading="lazy"`.
