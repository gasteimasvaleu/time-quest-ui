# Migrar para TanStack Start e corrigir o SEO

Migrar resolve de vez o problema do Google: cada página passa a chegar com texto, título, descrição e canonical próprios já no HTML, sem precisar de react-helmet ou pré-renderização separada (etapas 1 e 2 do seu documento ficam cobertas pela migração).

## Etapas

1. **Migração** — converter o projeto para TanStack Start no mesmo lugar, mantendo visual, login do /adm, chat, busca e rastreamento (GTM, GA GT-WKPX97JL, Meta Pixel) exatamente iguais.
2. **Título e descrição por página** — usar os títulos e descrições sugeridos no documento para /, /funcionalidades, /precos, /sobre, /contato, /mobileapp e /blog; canonical e og:url apontando para a própria página em https://sexando.com.
3. **Rotas e sitemap**
   - /inicio redireciona para /, e sai do sitemap.
   - Página 404 com noindex.
   - `<meta name="rating" content="adult">` no site todo.
   - /adm e /obrigado ficam com noindex.
   - Sem `<lastmod>` com a data do dia: o Google ignora datas que não refletem mudança real; só os artigos do blog levam a data de atualização deles.
4. **Blog**
   - Cada artigo gerado no servidor com título, descrição, canonical, data e imagem de compartilhamento próprios, e o texto completo.
   - O sitemap passa a listar os artigos publicados automaticamente.
   - Criar 3 artigos iniciais informativos (sem conteúdo explícito), já publicados, que você pode editar no /adm.

## Observações
- A migração consome créditos; se algo der errado, dá para desfazer pela conversa.
- O site no ar só muda depois de publicar.
- Depois de publicar, vale pedir reindexação no Google Search Console.

## Detalhes técnicos
- Seguir o skill migrate-to-tanstack (preflight, conversão, troca do pipeline de publicação).
- Head por rota via `head()` do TanStack Router; dados do blog carregados no loader do servidor.
- Sitemap gerado por rota de servidor consultando os posts publicados; remover o script estático.
