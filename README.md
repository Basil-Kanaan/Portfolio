# Basil Kanaan · Portfolio

Personal site, live at **https://basil-kanaan.github.io/Portfolio/**.

A static Vite + TypeScript build. Motion runs on GSAP (ScrollTrigger, SplitText, DrawSVG). Scrolling is native: nothing smooths the wheel or pins a section. The page is complete without JavaScript, and the hero intro is CSS only. The motion bundle loads after first paint. With reduced motion everything is static.

The hero draws the name the way a type designer builds it: metric guides run out across the page, each letter is traced with its points and handles, and then it fills. The drawing is an inline SVG made from the font's own outlines and kerning by `scripts/hero-name.py`, so it plays from the first frame. On a desktop the pointer is a loupe that shows the construction under the fill, and scrolling away drains the name back to its outlines.

The About section sets the statement over the owner's own photo of a white rose, toned at build time so it sits under type at AA contrast, drifting slowly with the scroll.

The Experience section is a time chart. Bar positions are computed from today's date, so ongoing roles grow over time. The HTML carries positions for October 2026 as the no-JavaScript fallback.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173/Portfolio/
npm run build      # type-check, then build to dist/
npm run preview    # serve dist/ at http://localhost:4173/Portfolio/
```

## Deploy

Pushing to `master` runs `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages.

## Layout

| Path | What it holds |
| --- | --- |
| `index.html` | All content and markup |
| `src/boot.ts` | Entry point; loads `main.ts` after first paint |
| `src/main.ts` | Wires the header, the contact form, the footer clock and the motion modules |
| `src/motion/` | Motion per section: hero (loupe, scroll-out), reveals and texture parallax, about (statement), work (recordings, posters set near view), systems (diagram, count-ups), career (the Experience time chart) |
| `src/ui/` | Header and menu, contact form, video controls, footer clock (time in Brampton) |
| `src/styles/main.css` | All styles, inlined into the page at build time |
| `public/` | Fonts, images, project recordings, resume, favicon, link preview image |
| `assets-src/` | Source files the scripts below turn into `public/` assets |

## Asset scripts

Each script needs only the repo's own dev dependencies, except where noted.

| Command | What it does |
| --- | --- |
| `npm run capture` | Captures each project site with Playwright and system Chrome: a 1440×900 screenshot and a poster frame into `assets-src/captures/`, and an ~8 s scroll recording (MP4 + WebM under 2 MB) straight into `public/media/`. Needs `ffmpeg` on the PATH. |
| `npm run images` | Builds the flower images (the toned white rose, AVIF + WebP), the poster images and the Apple touch icon in `public/` from `assets-src/` |
| `npm run hero-name` | Redraws the hero name's SVG in `index.html` from Archivo's outlines and kerning (Python with `fonttools` and `brotli`). Run again after `npm run fonts`, or after changing the name's weight, width or tracking. Also writes `public/favicon.svg` from the same B. |
| `npm run og` | Builds `public/og.jpg`, the link preview image, from the hero drawing and the petal texture |
| `npm run fonts` | Subsets the self-hosted variable fonts into `public/fonts` (Python with `fonttools` and `brotli`) |
| `npm run verify` | Screenshots the built site (run after `npm run build`) at 375, 768, 1440 and 1920 px, plus a reduced-motion pass, and reports console errors and failed requests |

## Contact form

The form posts to Web3Forms. The access key in `index.html` is public by design. Without JavaScript the form does a normal POST and Web3Forms redirects back to `#sent`.

## Previous site

The earlier React site's source is on the `legacy` branch. It is still deployed at https://basil-automates.vercel.app. `vercel.json` turns off Vercel deployments from `master`, so that deployment stays as it is.
