## Objetivo

Trocar a UX do card de afiliados (`AffiliateNotice`) para usar o efeito de revelação de texto com gradiente animado (`DiaTextReveal`) fornecido.

## Implementação

1. **Criar `src/components/ui/dia-text-reveal.tsx`** com o código fornecido, com um único ajuste de compatibilidade:
   - Trocar o import `from "motion/react"` por `from "framer-motion"` (o projeto já usa `framer-motion@12`, que expõe a mesma API `animate`, `motion`, `useInView`, `useMotionValue`, `useTransform`). Sem instalar novas dependências.
   - Manter `cn` de `@/lib/utils` (já existe).

2. **Atualizar `src/components/AffiliateNotice.tsx`** para aplicar o efeito:
   - Usar `DiaText` no **título** ("Já faz parte do programa de afiliados") com `triggerOnView` e `once`.
   - Manter o parágrafo de texto normal (o efeito de sweep de gradiente fica melhor no título/headline). O texto do corpo permanece em `text-muted-foreground`.
   - Preservar a estrutura do card (glassmorphism, `rounded-[40px]`, `max-w-7xl`).

## Detalhes técnicos

- `DiaTextReveal` faz o texto revelar com uma faixa de gradiente colorida varrendo da esquerda pra direita, terminando na cor final do texto.
- Passo o `textColor` como a cor do título (`hsl(var(--foreground))`) para o texto assentar na cor correta após a animação.
- Apenas apresentação/animação — nenhuma mudança de lógica ou backend.
