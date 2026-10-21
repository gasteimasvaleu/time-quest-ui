## Centralizar título e subtítulo do aviso de afiliados

No card "Já faz parte do programa de afiliados" (página inicial), centralizar o título e o texto abaixo dele, no celular e no computador.

### Detalhes técnicos
- `src/components/AffiliateNotice.tsx`: trocar `items-start` por `justify-center` no card e adicionar `text-center w-full` na div interna que envolve o h2 e o p.
- O efeito de revelação do texto continua igual.
