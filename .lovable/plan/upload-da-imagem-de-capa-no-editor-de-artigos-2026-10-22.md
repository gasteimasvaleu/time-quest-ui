# Upload da imagem de capa no editor de artigos

## O que muda
- No editor da aba **Artigos** (/adm), o campo "Imagem de capa (URL)" vira um botão **"Enviar imagem"** que abre o seletor de arquivos do computador/celular.
- Depois do envio aparece uma miniatura da capa, com os botões **"Trocar"** e **"Remover"**.
- Aceita JPG, PNG e WEBP de até 5 MB. Enquanto envia, o botão mostra "Enviando…". Se der erro, aparece um aviso.
- Artigos que já têm capa continuam mostrando a mesma imagem.

## Detalhes técnicos
- Criar o bucket público `blog-covers` (5MB) com `supabase--storage_create_bucket`.
- Migração com políticas em `storage.objects`: leitura pública do bucket; insert/update/delete só para `has_role(auth.uid(),'admin')`.
- `Admin.tsx` (PostEditor): trocar o Input por um `<input type="file" accept="image/*" hidden>` + Button; upload em `blog-covers/{uuid}.{ext}`, `getPublicUrl` e grava em `cover_url`. Preview `<img>` + Remover (limpa `cover_url`).
- Sem mudança na tabela `posts` nem nas páginas públicas do blog.
