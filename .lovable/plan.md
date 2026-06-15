## Objetivo
Substituir o ID incorreto do Google Analytics 4 (GA4) no `index.html` pelo ID correto confirmado pelo usuário.

## Alteração
No arquivo `index.html`:
- **Linha 14:** Alterar o `src` da tag `gtag/js` de `id=G-0CBFM2NNWN` para `id=G-B63LHZS12D`
- **Linha 19:** Alterar o `gtag('config', ...)` de `'G-0CBFM2NNWN'` para `'G-B63LHZS12D'`

O container GTM (`GTM-5ZS2KN3M`) permanece inalterado.