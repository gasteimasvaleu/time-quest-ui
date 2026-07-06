## Objetivo

Adicionar um card de aviso sobre o programa de afiliados **acima do card do Hero** na página inicial (`/`), com a mensagem reescrita de forma neutra e compatível com as políticas.

## Mensagem (versão compliant)

> **Já faz parte do programa de afiliados**
> Se você já se cadastrou, seu acesso ao programa de afiliados começa automaticamente — sem burocracia e sem taxa de adesão. Convide amigos, compartilhe seu link e receba comissão sempre que alguém criar uma conta pelo seu convite.

## Implementação

1. Criar um novo componente `src/components/AffiliateNotice.tsx`:
   - Card com o mesmo estilo glassmorphism do projeto (`max-w-7xl mx-auto`, `rounded-2xl`/`rounded-[40px]`, `border`, `bg-white/70 backdrop-blur-xl`, `shadow-lg`).
   - Ícone (ex.: `Gift` ou `Users` do lucide-react) na cor de destaque rosa (`text-accent`).
   - Título curto + parágrafo com a mensagem compliant acima.
   - Usa tokens semânticos (`text-foreground`, `text-muted-foreground`, `text-accent`) — sem cores hardcoded.
   - Responsivo (padding menor no mobile), alinhado com o container do Hero.

2. Em `src/pages/Index.tsx`, renderizar `<AffiliateNotice />` **entre `<Navbar />` e `<Hero />`**, dentro de um wrapper com o mesmo espaçamento horizontal do Hero para manter o alinhamento visual.

## Detalhes técnicos

- Nenhuma mudança de backend ou lógica — apenas apresentação.
- Reutiliza padrões visuais já existentes (glassmorphism do Navbar/Footer, container `max-w-7xl`).
