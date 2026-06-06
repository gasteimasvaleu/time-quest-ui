## Objetivo
Atualizar os 5 cards do `CardStack` na página `/inicio` para refletir os CTAs do Sexando, substituindo os textos e descrições atuais do Wediet.

## Alterações

### `src/pages/Inicio.tsx`
Substituir o array `PLACEHOLDER_ITEMS` pelos 5 novos CTAs do Sexando:

1. **Descoberta** — "Conheça pessoas reais na sua cidade. Entre grátis."
2. **Engajamento** — "Encontre o par ideal. Filtre por cidade, idade e preferências — agora."
3. **Social Proof** — "Milhares de casais e solteiros já estão conectando. O que você está esperando?"
4. **Urgência + Benefício** — "Desbloqueie mensagens ilimitadas e veja quem te visitou. Vira Premium agora."
5. **Comunidade + Confiança** — "100% brasileiro, verificado e seguro. Seu encontro começa aqui."

## Decisões pendentes
- **Imagens**: as imagens atuais são de fitness/comida (Wediet) e não fazem sentido para o Sexando. Sem novas URLs fornecidas, os cards exibirão o estado "No image" (fundo cinza com texto). Se o usuário quiser imagens específicas, pode fornecer as URLs posteriormente.
- **Links/CTA**: os cards atuais são apenas exibição (título + descrição sobre imagem). Sem links `href` fornecidos, os cards continuarão como apresentação visual.

## Escopo
- Apenas `src/pages/Inicio.tsx`.
- Nenhuma alteração no componente `CardStack` ou em outras páginas.
- Nenhuma alteração visual além da troca de conteúdo dos cards.