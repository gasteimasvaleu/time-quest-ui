## Problema
No card "Sexando Premium" (`src/components/ui/squishy-pricing.tsx`):
1. **Badge "Melhor oferta" cortado** — está posicionado em `-top-3` (acima da borda), mas o card tem `overflow-hidden` (necessário p/ o SVG de fundo e cantos arredondados), então a parte de cima do badge é cortada.
2. **Botão "Assinar Premium" cortado** — o card usa altura fixa `h-[620px]` + `overflow-hidden`. O card Premium tem mais conteúdo (seletor de período + preço + cobrança + economia + 8 benefícios + botão) e em telas menores estoura os 620px, cortando o botão na base.

## Correção
Editar apenas `src/components/ui/squishy-pricing.tsx`:

1. **Badge fora do clip:** envolver cada card num wrapper `relative` e renderizar o badge como elemento irmão (fora da div com `overflow-hidden`), de modo que ele apareça acima do card sem ser cortado. Adicionar um pequeno espaçamento no topo (`pt`/`mt`) para o badge não encostar na navbar.

2. **Altura flexível:** trocar `h-[620px]` por `min-h-[620px]` (altura automática que cresce com o conteúdo) em ambos os cards, mantendo `items-stretch` no container para que os dois cards continuem com a mesma altura. Assim o botão sempre fica visível, com `mt-auto` empurrando-o para a base.

3. Ajustar os SVGs de fundo (`FreeBG`/`PremiumBG`) para `h-full` em vez de altura fixa de 620, garantindo que o fundo acompanhe a nova altura.

## Resultado
Badge "Melhor oferta" totalmente visível acima do card Premium e botões "Começar grátis" / "Assinar Premium" sempre visíveis, em mobile e desktop.