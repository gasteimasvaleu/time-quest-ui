## Objetivo

Aplicar o efeito de revelação com gradiente (`DiaText`) também ao **parágrafo** do card de afiliados, não só ao título.

## Implementação

Atualizar `src/components/AffiliateNotice.tsx`:
- Envolver o texto do parágrafo em `<DiaText>` (modo texto único, que permite quebra de linha normal), usando `textColor="hsl(var(--muted-foreground))"` para o corpo assentar na cor certa.
- Adicionar um pequeno `delay` no parágrafo (ex.: `0.5s`) para o sweep começar logo após o do título, criando efeito em cascata.
- Manter `triggerOnView` e `once`. Título continua com `textColor="hsl(var(--foreground))"`.

## Detalhes técnicos

- No modo de texto único o `DiaTextReveal` não força `white-space: nowrap`, então o parágrafo continua quebrando linha normalmente dentro do card.
- Apenas apresentação/animação — sem mudança de conteúdo ou lógica.
