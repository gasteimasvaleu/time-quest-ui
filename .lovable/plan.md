## Objetivo
Reorganizar a seção "O que nos move" em layout de duas colunas no desktop: **texto fixo à esquerda** e **cards sticky à direita**.

## Mudanças em `src/pages/Sobre.tsx` (seção Values, ~linha 82)
- Trocar o container de `max-w-3xl` para `max-w-7xl`.
- Criar um grid de 2 colunas em desktop (`lg:grid-cols-2`), coluna única no mobile.
- **Coluna esquerda**: o cabeçalho "O que nos move" + subtítulo, alinhado à esquerda no desktop (em vez de centralizado), usando `lg:sticky lg:top-24` para o texto acompanhar a rolagem enquanto os cards passam.
- **Coluna direita**: o `ContainerScroll` com os `CardSticky` (mesmo efeito de empilhamento atual).
- No mobile: empilha tudo verticalmente — texto centralizado em cima, cards abaixo (comportamento atual preservado).

## Detalhes técnicos
- Texto esquerdo: `text-center lg:text-left` e `max-w-2xl mx-auto lg:mx-0`.
- Cards mantêm `top-24` e `incrementY` para o stacking.
