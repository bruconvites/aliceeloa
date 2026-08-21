# Convite Alice Eloá — 1 aninho 🌸

Convite digital interativo, feito para ser publicado no **GitHub Pages**.

## Estrutura

```
convite-alice/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
└── assets/
    ├── primeira.jpg   (envelope — tela inicial)
    ├── segunda.mp4
    ├── terceira.mp4
    ├── quarta.mp4
    ├── quinta.png     (convite com os 3 botões)
    ├── sexta.png       (sugestões de presente)
    └── audio.mp3       (música de fundo, em loop)
```

## Como funciona

1. Abre no **envelope** (`primeira.jpg`). A pessoa toca em qualquer lugar da tela.
2. Reproduz `segunda.mp4` → ao terminar, passa sozinho para `terceira.mp4` → depois `quarta.mp4`.
3. Durante os 3 vídeos aparece um botão dourado delicado, com texto rosa, no canto inferior direito: **"Clique aqui para avançar"** — leva direto pra tela interativa (`quinta.png`).
4. Ao final, mostra `quinta.png`, o convite com:
   - **Confirme presença** → abre o WhatsApp (`https://wa.link/s0k04b`)
   - **Localização** → abre o Google Maps (`https://maps.app.goo.gl/5YjJJaMbu4Z6rreD7?g_st=ic`)
   - **Sugestões de presente** → passa para `sexta.png`
   - Botão **"Clique aqui para voltar ao convite"** (canto superior esquerdo) → volta pro envelope inicial (`primeira.jpg`)
5. Na tela de sugestões de presente (`sexta.png`), o botão **"Clique aqui para voltar"** (canto superior esquerdo) volta pra tela interativa (`quinta.png`).
6. Todas as trocas de tela são em **crossfade** (uma imagem/vídeo desaparece enquanto o outro aparece — nunca fica tela preta).
7. A cada toque na tela aparecem pequenas **flores rosa** delicadas, subindo e desaparecendo.
8. A música de fundo (`audio.mp3`) toca em loop desde o primeiro toque, e o volume abaixa automaticamente durante os vídeos com a voz gravada, para não competir com ela.
9. Existe um pequeno botão de alto-falante no canto para quem quiser silenciar tudo.

## Publicar no GitHub Pages — passo a passo (evita a tela sem estilo)

Se o site abrir "cru" (sem cores, imagens quebradas, sem música), é porque as pastas `css/`, `js/` ou `assets/` não foram enviadas no mesmo nível do `index.html`. Para corrigir:

1. No repositório `aliceeloa` no GitHub, **apague todo o conteúdo atual** (ou crie um repositório novo do zero).
2. Extraia o zip no seu computador. Você verá uma pasta chamada `convite-alice` contendo `index.html`, `css/`, `js/`, `assets/` e `README.md`.
3. Entre **dentro** dessa pasta `convite-alice` — não envie a pasta em si, envie o **conteúdo** dela.
4. No GitHub, use **Add file → Upload files** e arraste todos os itens de dentro de `convite-alice` (o arquivo `index.html` e as pastas `css`, `js`, `assets`) direto para a raiz do repositório. O GitHub preserva a estrutura das subpastas quando você arrasta pastas inteiras.
5. Confira se, na raiz do repositório, aparecem: `index.html`, `css/style.css`, `js/app.js` e `assets/` com os 7 arquivos dentro — tudo em letras minúsculas, exatamente como está no zip.
6. Vá em **Settings → Pages**, em **Source** selecione a branch `main` e a pasta `/ (root)`, e salve.
7. Espere 1–2 minutos e recarregue o link limpando o cache (ou abra numa aba anônima) para ver a versão nova.

## Observações técnicas

- Os vídeos e a imagem interativa têm proporção **9:16** (retrato), ideal para celular.
- Os botões da tela do convite (`quinta.png`) são áreas invisíveis posicionadas por porcentagem sobre os círculos já desenhados na própria imagem — não é preciso editar nada se a imagem não mudar de layout.
- Caso algum navegador bloqueie o autoplay do vídeo/áudio (acontece raramente em alguns navegadores em modo economia de dados), aparece uma dica sutil "Toque para continuar".
