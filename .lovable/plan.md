## Ajustar tamanho das logos na navbar

### Objetivo
Reduzir a altura das imagens de logo na navbar de 56px (`h-14`) para 44px (`h-11`), tanto na versão desktop quanto mobile.

### Alteração
- Arquivo: `src/components/Navbar.tsx`
- Linhas 32–33: substituir `h-14` por `h-11` nas duas tags `<img>` (desktop e mobile).

### Resultado esperado
Logos menores e mais equilibradas dentro do navbar glassmorphism, mantendo a proporção original das imagens.