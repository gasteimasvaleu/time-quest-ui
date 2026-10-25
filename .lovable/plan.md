## Centralizar os anéis pulsantes atrás do cubo (página Contato)

Problema: os anéis estão sendo deslocados duas vezes para cima e para a esquerda (pelo posicionamento do elemento e de novo pela animação), por isso ficam fora do centro do cubo.

Correção em `src/pages/Contato.tsx`: nos 3 anéis, trocar `left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2` por `left-1/2 top-1/2` apenas, deixando a centralização só por conta da animação `ring-ripple` (que já aplica `translate(-50%, -50%)`). Os anéis continuam atrás do cubo (o cubo tem z-10). Nada mais muda.
