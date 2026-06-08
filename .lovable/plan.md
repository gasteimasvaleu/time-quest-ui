# Plano: Página /contato para o Sexando

## Objetivo
Transformar a página `/contato` de marca Wediet para Sexando, mantendo o assistente de IA como centro da experiência e adicionando FAQ e canais de contato direto.

## Estrutura da página

```text
/contato
├── Navbar (existente)
├── Hero section reduzida
│   ├── Título: "Dúvidas? Fale com a Sex ✨"
│   ├── Subtítulo sobre suporte instantâneo
│   └── Avatar/logo Sexando com animação
├── SexandoChat (novo componente)
│   ├── Endpoint: supabase functions/v1/sexando-chat
│   ├── Perguntas exemplo do Sexando
│   └── Placeholder adaptado
├── FAQ section (novo)
│   └── 5 perguntas frequentes do prompt (gratuito, cancelamento,
│       certificação, incógnito, bloqueio)
├── CTA de contato humano
│   └── Email suporte@sexando.com
└── Footer (existente)
```

## O que será criado

### 1. Edge Function `sexando-chat`
- **Local**: `supabase/functions/sexando-chat/index.ts`
- System prompt com identidade "Sex", assistente virtual do Sexando, usando exatamente o prompt fornecido pelo usuário (tom de voz, regras, limites, FAQ, segurança, escalonamento)
- Mesmo padrão da `wediet-chat`: stream via Lovable AI Gateway, modelo `google/gemini-3-flash-preview`, CORS, tratamento 429/402
- Sem deploy automático — será criado o arquivo para deploy manual

### 2. Componente `SexandoChat.tsx`
- **Local**: `src/components/SexandoChat.tsx`
- Baseado no `WedietChat.tsx`, com:
  - Endpoint `sexando-chat`
  - Placeholder: "Faça uma pergunta sobre o Sexando..."
  - 5 perguntas exemplo das dúvidas frequentes (gratuito, certificação, incógnito, bloqueio, cancelamento Premium)
  - Ícone e branding Sexando no avatar do assistente

### 3. Página `Contato.tsx` atualizada
- **Local**: `src/pages/Contato.tsx`
- Remove referências Wediet (logo cubo, texto "Wediet")
- Usa `SexandoChat` no lugar de `WedietChat`
- Adiciona seção FAQ com Accordion (shadcn/ui) com as 5 perguntas do prompt
- Adiciona card de contato humano com email suporte@sexando.com
- Mantém glassmorphism, max-w-7xl, e design system existente

## O que será mantido
- Navbar, Footer, FloatingDock (já têm branding Sexando)
- Design system: white bg, hot pink accent, glassmorphism, rounded-full botões
- Animações existentes (float, ring-ripple, fade-in-up)
- Estrutura de layout flex-col min-h-screen

## O que NÃO será alterado
- `WedietChat.tsx` (mantido por compatibilidade)
- `wediet-chat` edge function (mantida)
- Outras páginas (inicio, funcionalidades, precos, etc.)

## Passos técnicos
1. Criar `supabase/functions/sexando-chat/index.ts` com system prompt completo
2. Criar `src/components/SexandoChat.tsx`
3. Reescrever `src/pages/Contato.tsx`
4. Verificar build sem erros