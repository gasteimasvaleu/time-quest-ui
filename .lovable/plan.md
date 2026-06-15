## Plano

Adicionar um modal promocional bonito na entrada do site avisando a oferta:

> Os primeiros 1.000 cadastros ganham 1 ano de assinatura Premium grátis.

## O que será feito

1. **Criar o modal de aviso**
   - Visual premium, com glassmorphism alinhado à identidade atual da Wediet.
   - Destaque forte para “1 ano grátis” e “primeiros 1.000 cadastros”.
   - Responsivo para mobile e desktop.

2. **Exibir automaticamente ao entrar no site**
   - O modal abre ao carregar a página inicial.
   - Será possível fechar sem travar a navegação.

3. **Adicionar CTA principal**
   - Botão principal: “Garantir meu Premium grátis”.
   - Ao clicar, fecha o aviso e abre o modal atual de cadastro/lead “Monte sua Dieta Grátis”.

4. **Evitar excesso de repetição**
   - O aviso será mostrado uma vez por visitante no navegador, usando armazenamento local do frontend.
   - Isso evita incomodar quem já fechou o aviso.

## Detalhes técnicos

- Usar o componente `Dialog` já existente no projeto.
- Integrar o novo modal na página inicial junto ao fluxo atual de captura de leads.
- Manter as cores via tokens do design system, sem classes de cor soltas.
- Não alterar banco de dados, pagamentos, tracking ou backend.