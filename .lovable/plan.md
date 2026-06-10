## Objetivo
Adicionar separadores visuais entre as seções da página `/sobre` (`src/pages/Sobre.tsx`): linhas bem finas (1px) que desaparecem suavemente nas pontas (degradê transparente → cor → transparente).

## Como fazer
A página tem 3 seções dentro do `<main>`:
1. Hero
2. Mission ("Nossa missão é conectar...")
3. Values ("O que nos move" + cards)

Vou inserir um divisor entre Hero → Mission e entre Mission → Values.

### Estrutura do separador
Um elemento simples, centralizado e contido na largura `max-w-7xl`:

```text
[transparente] ———————————— linha 1px ———————————— [transparente]
```

Implementado com:
```tsx
<div className="max-w-7xl mx-auto px-4">
  <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
</div>
```

Isso cria uma linha de 1px usando a cor `--border` do design system, com degradê para transparente nas duas pontas.

## Resultado
- Dois separadores finos com fade nas pontas separando as 3 seções.
- Apenas mudança visual em `src/pages/Sobre.tsx`, sem alterar conteúdo nem lógica.