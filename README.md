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
3. Ao final, mostra `quinta.png`, o convite com 3 botões:
   - **Confirme presença** → abre o WhatsApp (`https://wa.link/s0k04b`)
   - **Localização** → abre o Google Maps (`https://maps.app.goo.gl/5YjJJaMbu4Z6rreD7?g_st=ic`)
   - **Sugestões de presente** → passa para `sexta.png`
4. Todas as trocas de tela são em **crossfade** (uma imagem/vídeo desaparece enquanto o outro aparece — nunca fica tela preta).
5. A cada toque na tela aparecem pequenas **flores rosa** delicadas, subindo e desaparecendo.
6. A música de fundo (`audio.mp3`) toca em loop desde o primeiro toque, e o volume abaixa automaticamente durante os vídeos com a voz gravada, para não competir com ela.
7. Existe um pequeno botão de alto-falante no canto para quem quiser silenciar tudo.

## Publicar no GitHub Pages

1. Crie um repositório novo no GitHub (ex.: `convite-alice`).
2. Envie todos os arquivos desta pasta mantendo a mesma estrutura (não altere os nomes dos arquivos dentro de `assets/`).
3. No repositório, vá em **Settings → Pages**.
4. Em **Source**, selecione a branch `main` (ou `master`) e a pasta `/ (root)`.
5. Salve. Em alguns minutos o link ficará disponível em algo como:
   `https://seu-usuario.github.io/convite-alice/`

## Observações técnicas

- Os vídeos e a imagem interativa têm proporção **9:16** (retrato), ideal para celular.
- Os botões da tela do convite (`quinta.png`) são áreas invisíveis posicionadas por porcentagem sobre os círculos já desenhados na própria imagem — não é preciso editar nada se a imagem não mudar de layout.
- Caso algum navegador bloqueie o autoplay do vídeo/áudio (acontece raramente em alguns navegadores em modo economia de dados), aparece uma dica sutil "Toque para continuar".
