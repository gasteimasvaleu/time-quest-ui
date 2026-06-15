# Atualizar container GTM do Sexando

Trocar o container GTM antigo (compartilhado com o outro site) pelo novo container exclusivo do Sexando: **GTM-5ZS2KN3M**.

## Alterações em `index.html`

1. **No `<head>` (linha 10):** trocar `GTM-MX68QZ4F` por `GTM-5ZS2KN3M` no script do GTM.
2. **No `<body>` (linha 58):** trocar `GTM-MX68QZ4F` por `GTM-5ZS2KN3M` no iframe noscript.

## O que permanece igual

- O GA4 (`G-0CBFM2NNWN`) continua inalterado.
- Eventos, conversões e tags são configurados por você dentro do painel do Google Tag Manager.

## Observação

Depois de publicar, o novo container começa a coletar dados do Sexando de forma isolada, sem misturar com o outro site.
