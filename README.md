# BD7D Solutions — site institucional

Next.js (App Router) publicado na Vercel.

```bash
npm install
npm run dev   # http://localhost:3000
```

## Estrutura

- `app/[lang]/page.tsx` — página única: seções, pilares, processo, cases e CTA.
- `lib/i18n/` — textos em português (`pt.ts`, servido em `/`), inglês (`en.ts`, `/en`) e espanhol (`es.ts`, `/es`).
  Normas citadas seguem cada região: Brasil (ABNT/NR), EUA e Europa (NFPA/IEC/EN), Espanha e América Latina (UNE/IEC/NOM).
- `components/scroll-hero.tsx` — hero com o vídeo controlado pelo scroll (canvas + frames WebP).
- `components/site-nav.tsx` — menu e seletor de idioma.
- `lib/contact.ts` — WhatsApp, e-mail e LinkedIn.
- `app/globals.css` — estilos e paleta (variáveis `--accent-*` e `--petrol-*` no `:root`).
- `public/hero-frames/` — 192 frames do hero.

## Regerar os frames do hero

A partir dos vídeos `1.mp4` e `2.mp4` (o recorte remove a marca "Veo" do canto):

```bash
ffmpeg -i 1.mp4 -i 2.mp4 -filter_complex \
  "[0:v][1:v]concat=n=2:v=1[c];[c]select='not(mod(n\,2))',crop=1760:990:40:22,scale=1600:900:flags=lanczos" \
  -vsync vfr -q:v 2 frames/frame-%04d.jpg
for f in frames/*.jpg; do cwebp -q 76 "$f" -o "public/hero-frames/$(basename "${f%.jpg}").webp"; done
```

Se o número de frames mudar, ajuste `CONFIG.frameCount` em `components/scroll-hero.tsx`.
