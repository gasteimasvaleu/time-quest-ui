## Objetivo
Expandir o parágrafo da seção "O que nos move" para ficar visualmente mais preenchido ao lado dos cards sticky no desktop, sem prejudicar a leitura no mobile.

## Mudanças em `src/pages/Sobre.tsx` (~linha 90)
- Substituir o parágrafo único por dois blocos de texto com responsividade:
  - **Mobile (`lg:hidden`)**: manter o texto curto atual.
  - **Desktop (`hidden lg:block`)**: exibir um texto mais longo e envolvente sobre os princípios da Sexando, com ~3-4 frases adicionais explicando a missão, a comunidade e o compromisso com privacidade.
- Ajustar espaçamento inferior (`mb-6` ou `mb-8`) no bloco desktop para melhor alinhamento visual com o primeiro card.

## Detalhes técnicos
- Usar classes utilitárias do Tailwind para alternância: `lg:hidden` / `hidden lg:block`.
- Manter o tom de voz e terminologia da marca (comunidade, privacidade, Brasil, lifestyle liberal).
- Nenhuma alteração na estrutura de grid ou nos cards sticky.