# Ajustar Google Analytics e evento do botão "Criar Conta Grátis"

## O que muda
1. **Bloco do Google Analytics (G-B63LHZS12D):** trocar pelo bloco que você enviou e, como pedido, remover as linhas com `@secret:GOOGLE_ANALYTICS_MEASUREMENT_ID`. Na prática, esse bloco do Analytics sai do site. O código `@secret:...` não funcionaria de qualquer forma, porque não é trocado pelo ID real dentro da página.
2. **Mantidos sem mudança:** Tag Manager (GTM-5ZS2KN3M), a tag do Google G-VNKZMC3EXB e o Meta Pixel.
3. **Botão "Criar Conta Grátis":** ao clicar, o site envia o evento `sign_up_click` em vez de `page_view` e depois abre `https://app.sexando.com/signup`. Se o Google demorar mais de 2s para responder, a página de cadastro abre mesmo assim.

## Observação
Depois dessa mudança, só a tag G-VNKZMC3EXB recebe o evento `sign_up_click` direto do site. Se o Analytics G-B63LHZS12D também precisar receber visitas e cliques, configure isso no Tag Manager.

## Detalhes técnicos
- `index.html`: remover o bloco `<script>` do gtag G-B63LHZS12D; no helper `gtagSendEvent`, trocar `gtag('event','page_view',{event_callback, event_timeout:2000})` por `gtag('event','sign_up_click',{event_callback: () => { window.location.href = url }, event_timeout: 2000})`.
- `Hero.tsx` continua chamando `gtagSendEvent('https://app.sexando.com/signup')`.
