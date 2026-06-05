## Objetivo
Adaptar a página inicial (`/`) do site atual (Wediet) para a nova marca **Sexando**, trocando apenas textos, mantendo o layout, estrutura e componentes existentes.

## Escopo
- Homepage (`src/pages/Index.tsx`) e seus componentes filhos diretos: `Navbar`, `Hero`, `AnimatedMarqueeHero`, `Footer`.
- Fora de escopo: outras rotas (`/inicio`, `/funcionalidades`, `/precos`, `/contato`, `/obrigado`, `/mobileapp`), backend, autenticação, banco de dados.

## Alterações por componente

### 1. Navbar (`src/components/Navbar.tsx`)
- Trocar logo/alt text de "Wediet" para "Sexando".
- Trocar label do botão de download de "Baixe Agora" / "Download" para "Entrar" ou "Cadastrar" (placeholder, sem função de backend).

### 2. Hero (`src/components/Hero.tsx`)
- **Headline:** novo headline sobre "A rede social do estilo de vida liberal".
- **Subheadline:** descrição curta do Sexando (rede social + comunidade + mídia + lives, desktop e mobile).
- **CTA primário:** "Criar Conta" (placeholder, sem backend).
- **CTA secundário:** "Assistir Demo" → manter ou adaptar para "Ver Como Funciona".
- **Modal:** manter estrutura do modal, trocar título/label para captura de lead ("Cadastre-se para Acesso Antecipado" ou similar).

### 3. AnimatedMarqueeHero (`src/components/AnimatedMarqueeHero.tsx`)
- Apenas verificar se há alt text ou legendas com marca "Wediet" — trocar para "Sexando" se houver.

### 4. Footer (`src/components/Footer.tsx`)
- Trocar "Wediet" para "Sexando" em todos os textos visíveis.
- Atualizar tagline: "Transforme sua alimentação..." → algo relacionado à comunidade/liberdade.
- Ocultar ou adaptar links de contato específicos do Wediet (email, WhatsApp, endereço) para placeholders genéricos do Sexando.

## Pontos de atenção
- Manter todos os tokens de design (cores, espaçamentos, tipografia, glassmorphism) do Wediet — a identidade visual nova (roxo/violeta noturno) será aplicada em etapa futura.
- O botão "Cadastrar/Login" não precisa de funcionalidade real nesta etapa; pode ser um link vazio, `alert()` ou redirecionamento para `#`.
- Preservar todos os atributos `href`, `to`, `src` de imagens e vídeos — substituir conteúdo visual é etapa futura.

## Entregável
Página `/` renderizando com textos, headlines, CTAs e marca 100% Sexando, layout e componentes intactos.