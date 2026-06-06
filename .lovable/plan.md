## Objetivo
Substituir as 12 imagens atuais do `AnimatedMarqueeHero` (home page) pelas 6 novas imagens fornecidas, repetidas para manter o total de 12 posições.

## Alteração
- Arquivo: `src/pages/Index.tsx`
- Array `MARQUEE_IMAGES`: trocar as 12 URLs antigas pelas 6 novas URLs, duplicadas em sequência (imagem 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6).

## Novas URLs
1. `https://jkdtqihgliygacjtakor.supabase.co/storage/v1/object/public/criativos/image_1780737102775_a4b4cc65.png`
2. `https://jkdtqihgliygacjtakor.supabase.co/storage/v1/object/public/criativos/image_1780737297788_9ae4deb1.png`
3. `https://jkdtqihgliygacjtakor.supabase.co/storage/v1/object/public/criativos/image_1780737282298_1295dcd7.png`
4. `https://jkdtqihgliygacjtakor.supabase.co/storage/v1/object/public/criativos/image_1780737305187_005ba697.png`
5. `https://jkdtqihgliygacjtakor.supabase.co/storage/v1/object/public/criativos/image_1780737403309_e1068cf9.png`
6. `https://jkdtqihgliygacjtakor.supabase.co/storage/v1/object/public/criativos/image_1780737447556_0510a572.png`

## Escopo
Apenas `src/pages/Index.tsx`. Nenhuma outra alteração de UI ou lógica.