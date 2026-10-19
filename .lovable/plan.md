# Manter só o Google Analytics G-669NPD38K8

## O que muda
- Remover a tag do Google G-VNKZMC3EXB do site (o script que carrega a tag e a linha de configuração).
- Fica só a G-669NPD38K8, que recebe as visitas e o evento `sign_up_click` do botão "Criar Conta Grátis".
- O Tag Manager (GTM-5ZS2KN3M) e o Meta Pixel continuam como estão.

## Detalhes técnicos
- `index.html`: apagar `<script async src=".../gtag/js?id=G-VNKZMC3EXB">` e `gtag('config', 'G-VNKZMC3EXB');`.
- O helper `gtagSendEvent` continua igual.
