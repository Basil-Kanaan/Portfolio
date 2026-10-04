// Builds public/og.jpg (1200×630, the link preview image) from the hero's own drawing of the
// name, the site's type and colours, and the toned white rose from the About section.
// Run after changing the name drawing or the images: node scripts/og.mjs
import { chromium } from 'playwright';
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataUri = (file, type) => `data:${type};base64,${fs.readFileSync(path.join(ROOT, file)).toString('base64')}`;
const index = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const drawing = index.match(/<!-- hero-name:start -->(.*?)<!-- hero-name:end -->/s)[1];

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  @font-face { font-family: Archivo; src: url(${dataUri('public/fonts/archivo.woff2', 'font/woff2')}) format('woff2'); font-weight: 400 700; font-stretch: 88% 100%; }
  html, body { margin: 0; width: 1200px; height: 630px; overflow: hidden; background: #100f0d; }
  body { position: relative; font-family: Archivo, sans-serif; color: #eceae5; -webkit-font-smoothing: antialiased; }
  p, h1 { margin: 0; }
  .texture { position: absolute; inset: 0 0 0 auto; width: 640px;
    background: url(${dataUri('public/img/white-rose-1045.webp', 'image/webp')}) 50% 40% / cover;
    -webkit-mask-image: linear-gradient(90deg, transparent, #000 60%); }
  .copy { position: relative; display: flex; flex-direction: column; height: 100%; box-sizing: border-box; padding: 72px 0 60px 72px; }
  .role { font-size: 27px; font-weight: 500; color: #a6a29a; }
  h1 { margin: 26px 0 0 -0.04em; font-size: 176px; line-height: 1; }
  .foot { display: flex; align-items: baseline; gap: 13px; margin-top: auto; font-size: 23px; font-weight: 500; color: #8c887f; }
  .dot { width: 8px; height: 8px; border-radius: 50%; background: #c99a6b; transform: translateY(-3px); }
  .draft { display: block; overflow: visible; color: #eceae5; }
  .draft__guides { opacity: 0.16; }
  .draft__guides path { fill: none; stroke: currentColor; stroke-width: 1px; vector-effect: non-scaling-stroke; }
  .draft__v { opacity: 0.7; }
  .draft__fill { fill: currentColor; }
  .draft__build, .draft__loupe { display: none; }
</style></head><body>
  <div class="texture"></div>
  <div class="copy">
    <p class="role">Software engineer based in Brampton, Ontario</p>
    <h1>${drawing}</h1>
    <p class="foot"><span class="dot"></span>basil-kanaan.github.io/Portfolio</p>
  </div>
</body></html>`;

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
const png = await page.screenshot({ type: 'png' });
await browser.close();

const out = path.join(ROOT, 'public/og.jpg');
await sharp(png).jpeg({ quality: 86, mozjpeg: true }).toFile(out);
console.log(`og.jpg ${(fs.statSync(out).size / 1024).toFixed(0)} KB`);
