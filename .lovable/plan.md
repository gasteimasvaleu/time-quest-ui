Atualizar o componente `src/components/PromoModal.tsx` para:

1. Exibir a imagem fornecida (`https://lbwjszdpjkxbihdwjaqt.supabase.co/storage/v1/object/public/criativos/image_1781534343140_bab57d59.jpg`) no topo do modal, substituindo o bloco atual com ícone e texto de header.
2. Substituir o conteúdo do body por um único botão com o texto **"Quero Conhecer"**, que ao clicar:
   - Fecha o modal
   - Marca como visto no `localStorage`
   - Redireciona para a rota `/`
3. Remover o botão secundário "Agora não, obrigado" e o texto promocional do body.
4. Ajustar estilos para acomodar a imagem no topo de forma responsiva (ex: `object-cover`, altura definida, bordas arredondadas no topo).