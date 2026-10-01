# Trocar a imagem de compartilhamento (og:image)

## Objetivo
Substituir a thumb exibida ao compartilhar o link do site no Instagram, WhatsApp e outras redes.

## Passos

1. **Receber a imagem do usuário** (enviada no chat).
2. **Preparar a imagem**: garantir proporção 1200×630 px (recortar/redimensionar se necessário) e tamanho abaixo de ~300 KB para o WhatsApp exibir o preview.
3. **Hospedar a imagem** no projeto via Lovable Assets (CDN com URL pública absoluta).
4. **Atualizar o `index.html`**:
   - `<meta property="og:image">` → nova URL
   - `<meta name="twitter:image">` → nova URL
   - `logo` no JSON-LD (aponta para a mesma imagem antiga) → nova URL
5. **Publicar**: a mudança só aparece no site ao vivo após o próximo publish.

## Observações
- WhatsApp/Instagram fazem cache da thumb: após publicar, forçar atualização no Facebook Sharing Debugger ("Scrape Again").
- A imagem antiga (Google Storage) deixa de ser referenciada, mas não é apagada.
