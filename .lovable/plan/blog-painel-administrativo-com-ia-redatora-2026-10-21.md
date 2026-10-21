# Blog + painel administrativo com IA redatora

## O que vai existir
1. **Página /blog (pública)**: lista dos artigos publicados (capa, título, resumo, data), no visual do site. Cada artigo abre em **/blog/:slug** com título, texto formatado, data e tags de SEO (título, descrição, imagem de compartilhamento).
2. **Página /adm (protegida)**: tela de login com e-mail e senha, sem opção de cadastro. Só a conta informada (caiorobbb@gmail.com) entra. Depois do login aparecem duas abas:
   - **Artigos**: lista de todos os artigos (rascunhos e publicados), com criar, editar, publicar/despublicar e excluir. Campos: título, endereço (slug), resumo, imagem de capa (URL), conteúdo, título e descrição para o Google, palavras-chave.
   - **IA Redatora**: você informa tema, palavra-chave principal, público e tamanho. A IA escreve o artigo otimizado para SEO (título, resumo, título/descrição para o Google, palavras-chave, slug e texto com subtítulos). Você revisa o resultado e clica em **"Enviar para Artigos"**: ele vira um rascunho pronto na aba Artigos, onde é só publicar.
3. Link "Blog" no menu (computador e celular) e no rodapé; artigos publicados entram no sitemap.

## Segurança
- A senha não fica escrita no código: a conta é criada uma vez direto no sistema de login, e o cadastro público fica desligado.
- Só quem tem papel de administrador consegue criar, editar ou ver rascunhos; o público só lê artigos publicados.
- A IA roda no servidor, só para o administrador logado.

## Detalhes técnicos
- Backend: Lovable Cloud (projeto já tem cliente e funções).
- Migração: tabela `posts` (id, title, slug único, excerpt, content markdown, cover_url, meta_title, meta_description, keywords text[], status draft/published, published_at, timestamps) com GRANTs, RLS: anon/authenticated `select` onde `status='published'`; admin (via `has_role`) tudo. Tabela `user_roles` + enum `app_role` + função `has_role` seguindo o padrão.
- Conta admin: criada via Admin API (script único com service role), email confirmado; inserir role `admin`. Desligar signups públicos.
- Edge function `blog-writer`: valida JWT + `has_role(admin)`; chama Lovable AI Gateway `/v1/responses` com `openai/gpt-6-astra` (streaming, saída JSON estrita com os campos do artigo, reasoning `medium`). Erros 402/429 exibidos em toast.
- Frontend: `src/pages/Blog.tsx`, `src/pages/BlogPost.tsx` (react-markdown, meta tags dinâmicas), `src/pages/Admin.tsx` (login `signInWithPassword`, guarda por sessão + checagem de role, Tabs shadcn "Artigos" / "IA Redatora"); rotas em `App.tsx`; links em `Navbar.tsx` e `Footer.tsx`; `scripts/generate-sitemap.ts` inclui `/blog`.
- Verificação: login no /adm, gerar um artigo, enviar para Artigos, publicar e ver em /blog.
