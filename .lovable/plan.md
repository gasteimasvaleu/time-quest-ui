Substituir a imagem do logo no Navbar para ter versões diferentes em desktop e mobile.

## Alteração
- No arquivo `src/components/Navbar.tsx`, substituir a única `<img>` do logo por duas tags:
  - **Desktop** (`md:block hidden`): `https://jkdtqihgliygacjtakor.supabase.co/storage/v1/object/public/criativos/sexando.png`
  - **Mobile** (`md:hidden`): `https://jkdtqihgliygacjtakor.supabase.co/storage/v1/object/public/criativos/logonav.png`

## Como
Usar classes utilitárias do Tailwind (`hidden md:block` e `md:hidden`) dentro do mesmo `<Link>` para alternar a imagem por breakpoint sem alterar layout ou comportamento do nav.