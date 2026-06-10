## Objetivo
Transformar a seção "O que nos move" (atualmente um grid estático de 6 cards) em uma experiência de **sticky scroll cards** — onde os cards se empilham conforme o usuário rola a página, usando o componente `ContainerScroll` / `CardSticky` enviado.

## Mudanças

### 1. Novo componente `src/components/ui/sticky-scroll-cards.tsx`
- Implementar `ContainerScroll` e `CardSticky` baseados no código enviado.
- Usar `framer-motion` (já instalado, v12) no lugar de `motion/react` para garantir compatibilidade — a API é idêntica.
- `ContainerScroll`: wrapper com `position: relative` que define a área de scroll.
- `CardSticky`: card com `position: sticky`, `top` calculado por `index`, e leve incremento de `translateY`/`z-index` para o efeito de empilhamento.

### 2. Editar `src/pages/Sobre.tsx` — seção Values (linha ~82)
- Substituir o `grid` atual pelo `ContainerScroll` contendo os 6 valores mapeados como `CardSticky`.
- Manter o array `values` existente (ícone, título, descrição) sem alterações no conteúdo.
- Manter a identidade visual: fundo branco/glassmorphism (`bg-white/70 backdrop-blur-xl`), acento Hot Pink (HSL 330 100% 50%), bordas arredondadas e sombras.
- Cada card ocupa a largura central (`max-w-3xl mx-auto`) e gruda no topo com offset crescente, criando o efeito de pilha ao rolar.
- Manter o cabeçalho "O que nos move" e o subtítulo intactos.

## Detalhes técnicos
- Cards usam `sticky top-[Npx]` (offset base ~ navbar height) + incremento por índice via `style`.
- `incrementY` e `incrementZ` controlam o deslocamento vertical e a ordem de empilhamento.
- Conteúdo de cada card: ícone em círculo Hot Pink, título e descrição — reaproveitando o markup atual.
