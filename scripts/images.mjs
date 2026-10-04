// Builds the web-ready images in public/ from the sources in assets-src/.
//   - flowers: the white rose texture, AVIF + WebP at two widths
//   - project captures: WebP posters (1280 and 640 wide). scripts/capture.mjs writes the
//     recordings themselves straight to public/media.
//   - favicon PNG for Apple devices
// Usage: node scripts/images.mjs
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'assets-src');
const PUB = path.join(ROOT, 'public');
const IMG = path.join(PUB, 'img');
const MEDIA = path.join(PUB, 'media');
fs.mkdirSync(IMG, { recursive: true });
fs.mkdirSync(MEDIA, { recursive: true });

const kb = (f) => `${(fs.statSync(f).size / 1024).toFixed(0)} KB`;

// The About texture: the owner's own photo of a white rose (a 1045 x 2000 phone shot, no
// metadata), toned to a warm duotone between the page's ground and a dark warm grey, so it
// sits under type at AA contrast without a runtime filter.
const FLOWERS = path.join(SRC, 'flowers');
const LO = [16, 15, 13]; // --ground

async function duotone(file, crop, hi, gamma) {
  const { data, info } = await sharp(path.join(FLOWERS, file))
    .extract(crop)
    .grayscale()
    .normalise({ lower: 1, upper: 99 })
    .gamma(gamma, 2.2)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(info.width * info.height * 3);
  for (let i = 0; i < info.width * info.height; i++) {
    const t = data[i * info.channels] / 255;
    for (let c = 0; c < 3; c++) out[i * 3 + c] = Math.round(LO[c] + (hi[c] - LO[c]) * t);
  }
  return sharp(out, { raw: { width: info.width, height: info.height, channels: 3 } }).png().toBuffer();
}

async function variants(name, buf, srcWidth, widths, { avifQ = 52, webpQ = 76 } = {}) {
  for (const w of widths) {
    const base = sharp(buf).resize(Math.min(w, srcWidth), null, { kernel: 'lanczos3' });
    const avif = path.join(IMG, `${name}-${w}.avif`);
    const webp = path.join(IMG, `${name}-${w}.webp`);
    await base.clone().avif({ quality: avifQ, effort: 7 }).toFile(avif);
    await base.clone().webp({ quality: webpQ, effort: 6 }).toFile(webp);
    console.log(`${name} ${w}: avif ${kb(avif)}, webp ${kb(webp)}`);
  }
}

await variants('white-rose', await duotone('white-rose.webp', { left: 0, top: 200, width: 1045, height: 1500 }, [150, 142, 130], 3.0), 1045, [560, 1045]);

// Project captures.
const caps = path.join(SRC, 'captures');
for (const slug of ['mczee', 'aonagi', 'cedarvell', 'lorne-mercer', 'qurra', 'areteos']) {
  const poster = path.join(caps, `${slug}-poster.png`);
  const out = path.join(MEDIA, `${slug}-poster.webp`);
  await sharp(poster).webp({ quality: 76, effort: 6 }).toFile(out);
  const small = path.join(MEDIA, `${slug}-poster-640.webp`);
  await sharp(poster).resize(640, 400).webp({ quality: 76, effort: 6 }).toFile(small);
  console.log(`${slug}: poster ${kb(out)} / ${kb(small)}`);
}

// Apple touch icon from the SVG favicon.
const fav = path.join(PUB, 'favicon.svg');
if (fs.existsSync(fav)) {
  await sharp(fav, { density: 600 }).resize(180, 180).flatten({ background: '#100F0D' }).png().toFile(path.join(PUB, 'apple-touch-icon.png'));
  console.log('apple-touch-icon.png written');
}
