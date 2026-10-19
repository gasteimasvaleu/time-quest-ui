# Trocar o código do Google para GT-WKPX97JL

## O que muda
- O bloco da tag do Google passa a usar **GT-WKPX97JL** nos dois lugares (linha que carrega a tag e linha de configuração), exatamente como você enviou.
- O código atual G-669NPD38K8 sai do site.
- O botão "Criar Conta Grátis" continua enviando o evento `sign_up_click` para essa tag e depois abre a página de cadastro.
- Tag Manager (GTM-5ZS2KN3M) e Meta Pixel continuam iguais.

## Detalhes técnicos
- `index.html`: trocar `G-669NPD38K8` por `GT-WKPX97JL` no `<script src=".../gtag/js?id=...">` e em `gtag('config', ...)`.
- Atualizar `mem://integrations/tracking` com o novo código.
