## Plano

Adicionar um novo card à página `/funcionalidades` usando o mesmo componente e padrão visual dos cards existentes.

## O que será alterado

- Inserir um novo item no array de funcionalidades em `src/pages/Funcionalidades.tsx`.
- Usar a imagem informada como `src` do card.
- Usar o título `Streaming` e a designação `📺 Sexando Flix`.
- Incluir o texto fornecido como descrição do card, mantendo o mesmo estilo dos demais.

## Detalhes técnicos

- A página já renderiza os cards via `CircularTestimonials` a partir do array `features`.
- A mudança será apenas frontend/presentacional, sem banco de dados ou backend.
- O novo card será adicionado junto aos outros cards de funcionalidades, preservando autoplay, navegação e layout atuais.