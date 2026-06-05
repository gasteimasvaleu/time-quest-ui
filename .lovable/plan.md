## Objetivo
Substituir o conteúdo da página `/funcionalidades` (atualmente recursos do app de dieta) pelas 12 categorias de funcionalidades do **Sexando**, mantendo o carrossel circular existente, mas trocando as imagens por **ícones lucide-react**.

## Escopo
- `src/components/ui/circular-testimonials.tsx` — adaptar para suportar ícone no lugar de imagem.
- `src/pages/Funcionalidades.tsx` — substituir os dados pelas novas categorias.
- Fora de escopo: backend, outras páginas, identidade visual (cores ficam para etapa futura).
- **Omitir** a categoria "Painel Admin" (interna). Total: 12 categorias.

## Alterações

### 1. `circular-testimonials.tsx`
- Adicionar campo opcional `icon?: React.ReactNode` na interface `Testimonial` e tornar `src` opcional.
- No painel esquerdo (pilha 3D), quando o item tiver `icon`, renderizar um **card** (mesma `getImageStyle` para preservar a animação de empilhamento/rotação) com:
  - fundo claro/gradiente sutil, cantos arredondados (`rounded-3xl`), sombra.
  - o ícone lucide grande e centralizado, na cor de destaque (hot pink atual).
- Manter o comportamento de imagem para retrocompatibilidade (se `src` existir e não houver `icon`).

### 2. `Funcionalidades.tsx`
- Substituir o array `features` por 12 categorias, cada uma com:
  - `name`: título da categoria (ex.: "Feed social").
  - `designation`: tag curta com emoji original (ex.: "🏠 Comunidade").
  - `quote`: parágrafo descritivo combinando os sub-recursos da categoria.
  - `icon`: ícone lucide correspondente.
- Mapa de categorias → ícones lucide:
  - Feed social → `LayoutGrid`
  - Perfis ricos → `UserCircle`
  - Mensagens e chat → `MessageCircle`
  - Chamadas de áudio e vídeo → `Video`
  - Livecam → `Radio`
  - Hot or Not → `Flame`
  - Busca e descoberta → `Search`
  - Amigos e seguidores → `Users`
  - Notificações → `Bell`
  - Privacidade e segurança → `ShieldCheck`
  - Minha conta → `Settings`
  - Premium → `Gem`

### Conteúdo (quotes resumidos por categoria)
Cada `quote` será um parágrafo curto, ex.:
- Feed social: "Feeds de Seguindo e Explorar, publicações com fotos e carrosséis, curtidas, comentários, stories e filtros por gênero e estado."
- Mensagens e chat: "Mensagens privadas 1:1 em tempo real, reações flutuantes, envio de mídias, alerta de segurança anti-golpe e Avatar IA para esquentar o clima."
- (e assim por diante para as 12)

## Pontos de atenção
- Manter tokens de design atuais (hot pink de destaque, max-w-7xl, glassmorphism).
- Preservar autoplay, navegação por setas e teclado do carrossel.
- A página continua usando `Navbar` e `Footer` já adaptados ao Sexando.

## Entregável
Página `/funcionalidades` exibindo as 12 categorias do Sexando no carrossel circular, com ícones lucide e descrições, sem referências ao app de dieta.