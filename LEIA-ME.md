# LP Bella | pacote para deploy na Vercel

## Estrutura
```
bella-lp/
├── index.html          página completa (HTML, CSS e JS em um arquivo)
├── img/                imagens já otimizadas em WebP
├── robots.txt
├── sitemap.xml
├── llms.txt
├── vercel.json         cache das imagens e headers de segurança
└── apps-script.gs      script para colar no Apps Script da planilha
```

## Deploy
Site estático puro, sem build.

**Pelo dashboard:** arraste a pasta `bella-lp` em vercel.com/new.

**Pelo CLI:**
```
cd bella-lp
vercel --prod
```
Framework Preset: Other. Build Command: vazio. Output Directory: `./`.

Depois de publicar, aponte o domínio bellamarmores.com.br em Settings > Domains.

## Antes de subir para o cliente

Ficha do Google conectada: Marmoraria Bella Mármores, Rio de Janeiro (-22.883739, -43.2770259). Mapa e link de avaliações já apontam para ela.

1. **Formulário.** Instalar o `apps-script.gs` na planilha e colar a URL em `var ENDPOINT = "";` dentro do index.html.
2. **Fotos dos materiais.** As nove imagens recebidas mostram cinco obras: uma cozinha em granito claro (3 ângulos), um lavabo em mármore verde (2 ângulos), um banheiro em granito com cuba esculpida (2 ângulos), uma banheira em mármore e uma cozinha com bancada clara. Nenhuma é Dekton, quartzito, lâmina ultracompacta ou quartzo, por isso a seção de materiais está em cards de texto. Assim que chegarem fotos reais desses materiais, dá para transformar os cards em blocos com imagem.
3. **Endereços.** Preencher rua, número e CEP das unidades (busque por PENDENTE no index.html) e refletir no bloco JSON-LD.
4. **Imagem de compartilhamento.** Gerar `og-bella-marmores.jpg` (1200x630) e colocar na raiz.
5. **CNPJ** no rodapé.
6. Trocar as URLs do canonical, og:url e sitemap se o domínio final for outro.

## Rastreamento
GTM `GTM-N8LST2HV` já instalado (script no head, noscript no body).

Eventos enviados ao dataLayer:
- `clique_whatsapp` com o parâmetro `origem` (header, hero-principal, material-dekton, flutuante, etc.)
- `form_start`
- `gerar_lead` com `perfil` e `material`
- `scroll_25`, `scroll_50`, `scroll_75`, `scroll_90`

Todos os botões usam a mensagem: "Olá, vi o site de vocês no google e gostaria de solicitar um orçamento, por favor!"
