## Problema

O site está enviando dados de Analytics para o ID **`G-B63LHZS12D`**, mas a propriedade que você usa (a da captura de tela) é a **`G-0CBFM2NNWN`**. Por isso o painel mostra "A coleta de dados não está ativa": os hits chegam em outra propriedade.

## Correção

No `index.html`, substituir o ID antigo pelo correto na tag gtag.js (linhas 14, 19):

```text
src="...gtag/js?id=G-B63LHZS12D"   →   id=G-0CBFM2NNWN
gtag('config', 'G-B63LHZS12D')     →   'G-0CBFM2NNWN'
```

O Google Tag Manager (`GTM-MX68QZ4F`) permanece como está, sem alterações.

## Detalhes técnicos

- Apenas o `index.html` é alterado.
- Também atualizarei a memória de Tracking IDs com o novo ID do GA4.
- Após publicar, o Google pode levar até ~24-48h para reconhecer a coleta. Você pode confirmar mais rápido usando o "Tempo real" do GA4 após acessar o site publicado.