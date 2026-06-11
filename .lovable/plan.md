## Plano

Adicionar as 11 novas imagens ao marquee da home (`AnimatedMarqueeHero`), editando o array `NEW_IMAGES` em `src/pages/Index.tsx`.

1. Incluir as 11 URLs fornecidas no array `NEW_IMAGES`.
2. Decisão de escopo: substituir as imagens atuais pelas novas (recomendado, já que parecem ser novos criativos) — confirme se prefere **adicionar** às existentes em vez de substituir.
3. Manter o padrão `MARQUEE_IMAGES = [...NEW_IMAGES, ...NEW_IMAGES]` para o loop contínuo.

## Detalhes técnicos

- Apenas alteração de conteúdo (URLs), sem mudança de layout ou lógica.
- As URLs contêm espaços e parênteses (`result_00 (1).png`); serão usadas codificadas (`%20`, `%28`, `%29`) para carregar corretamente.