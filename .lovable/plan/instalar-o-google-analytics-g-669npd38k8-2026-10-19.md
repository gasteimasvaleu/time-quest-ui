# Instalar o Google Analytics G-669NPD38K8

## O que muda
- Colocar de volta o bloco do Google Analytics no site, agora com o código **G-669NPD38K8**. O código vai nos dois lugares: na linha que carrega o Analytics e na linha de configuração.
- **Ficam como estão:** o Tag Manager (GTM-5ZS2KN3M), a tag do Google G-VNKZMC3EXB, o Meta Pixel e o evento `sign_up_click` do botão "Criar Conta Grátis".
- O evento `sign_up_click` passa a chegar também no G-669NPD38K8, porque as duas tags recebem os eventos enviados pelo site.

## Detalhes técnicos
- `index.html`: adicionar `<script async src="https://www.googletagmanager.com/gtag/js?id=G-669NPD38K8"></script>` e incluir `gtag('config', 'G-669NPD38K8');` no bloco gtag que já existe. Assim a função `gtag` e o `dataLayer` não ficam duplicados.
- Atualizar `mem://integrations/tracking` com o novo código.
