Alterar as constantes `FREE_URL` e `CHECKOUT_URL` em `src/components/ui/squishy-pricing.tsx` para apontar para `https://app.sexando.com/login`.

Mudança técnica:
- Linhas 6-7: substituir `"#"` por `"https://app.sexando.com/login"` em ambas as constantes.
- Remover o comentário `TODO` acima delas.

Isso faz com que tanto o botão "Começar grátis" (Free) quanto "Assinar Premium" (todos os períodos) redirecionem para o login do Sexando.