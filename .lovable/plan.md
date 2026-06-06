## Objetivo
Remodelar a página `/precos` (Sexando) com a estrutura **Free + Premium com seletor de período** (Mensal / Trimestral / Anual), substituindo os dois cards atuais de promoção do Wediet.

## Layout proposto

```text
                  Pré-título / Typewriter (atualizado p/ Sexando)

   ┌─────────────────────┐     ┌──────────────────────────────────┐
   │  Sexando Free        │     │  Sexando Premium                 │
   │  R$ 0                │     │  [ Mensal ][ Trimestral ][ Anual ]│  <- seletor
   │  O básico, limites   │     │  R$ 39,90/mês  (muda c/ seletor)  │
   │  diários             │     │  ~economia / melhor oferta        │
   │  • Perfil completo   │     │  • Mensagens ilimitadas           │
   │  • Feed/curtidas...  │     │  • Lista de visitantes...         │
   │  [ Começar grátis ]  │     │  [ Assinar Premium ]              │
   └─────────────────────┘     └──────────────────────────────────┘

              💳 Pagamento seguro • 🔒 Criptografado • 🔄 Cancele quando quiser
```

## Conteúdo dos planos

**Sexando Free — R$ 0** (limites diários)
- Perfil completo + fotos e vídeos
- Feed, curtidas e comentários
- 10 mensagens por dia
- 1 storie / foto / vídeo / publicação por dia
- Explorar com cards opacos (preview)
- CTA: "Começar grátis"

**Sexando Premium** (card com seletor de período)
- Mensal — R$ 39,90/mês · "Cobrança mensal recorrente"
- Trimestral — R$ 89,90 a cada 3 meses · "~R$ 29,97/mês · ~25% de economia"
- Anual — R$ 239,99/ano · "~R$ 20,00/mês · ~50% de economia" · badge **Melhor oferta**

Lista de benefícios (igual para os 3 períodos):
- Mensagens ilimitadas
- Lista completa de visitantes (sem blur)
- Quem viu seus stories
- Ligações de vídeo ilimitadas
- Acesso total a Hot or Not, Livecam e AI Avatar
- Modo incógnito (visita perfis sem aparecer)
- Selo Premium e destaque no feed e busca
- Uploads ilimitados (fotos, vídeos, stories, posts)
- CTA: "Assinar Premium"

## Comportamento do seletor
- Três botões (Mensal / Trimestral / Anual) no topo do card Premium.
- Ao trocar, atualiza: preço grande, texto de período/cobrança, linha de economia/equivalência, e o badge "Melhor oferta" aparece só no Anual.
- Estado via `useState` (padrão: Anual, por ser a melhor oferta — ou Mensal, ajustável).

## Mudanças de arquivos
- **`src/components/ui/squishy-pricing.tsx`** — reescrever: card Free fixo + card Premium com `useState` do período e dados dos 3 planos. Manter a estética atual (cards arredondados, animação framer-motion, BGComponents, accent hot pink da marca).
- **`src/pages/Precos.tsx`** — atualizar textos do Typewriter e subtítulo para Sexando (remover copy de "Nutrição/dieta").

## Links dos botões (pendente)
Você escolheu **"Outro link / checkout"**. Vou deixar os CTAs apontando para uma constante `CHECKOUT_URL` (placeholder `#`) por enquanto. Assim que enviar as URLs (uma por plano ou uma única de checkout), eu ligo os botões. Pode me passar:
- URL do "Começar grátis" (Free)
- URL(s) de assinatura Premium (Mensal / Trimestral / Anual — uma só ou separadas)

## Observação
A copy atual da página ainda é do Wediet (nutrição). Vou substituí-la por copy do Sexando. Se quiser textos específicos no hero, me diga; senão uso uma versão enxuta focada em relacionamento/Premium.