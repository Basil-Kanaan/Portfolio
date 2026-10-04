// Captures each live project with Playwright (system Chrome, real GPU):
//   1. a 1440x900 screenshot of the settled first viewport
//   2. an ~8 s scroll recording via the CDP screencast, encoded to MP4 + WebM under 2 MB,
//      plus a poster frame taken from the recording's first frame
// The screenshot and poster go to assets-src/captures (scripts/images.mjs turns the poster
// into WebP). The recordings are final encodes, so they go straight to public/media.
// Usage: node scripts/capture.mjs [slug ...]
import { chromium } from 'playwright';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITES = [
  { slug: 'mczee', url: 'https://mczee.ca/' },
  { slug: 'aonagi', url: 'https://aonagi.getqurra.com/' },
  { slug: 'cedarvell', url: 'https://cedarvell.getqurra.com/' },
  { slug: 'lorne-mercer', url: 'https://lorne-mercer.getqurra.com/' },
  // Dismiss the consent banner with the privacy-preserving choice so it stays out of frame.
  { slug: 'qurra', url: 'https://getqurra.com/', prepare: (page) => clickIfVisible(page, 'button', /^opt out$/i) },
  { slug: 'areteos', url: 'https://areteos.vercel.app/' },
];

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'assets-src', 'captures');
const MEDIA = path.join(ROOT, 'public', 'media');
const TMP = path.join(ROOT, '.capture-tmp');
const W = 1440;
const H = 900;
const SETTLE_MS = Number(process.env.SETTLE_MS || 4500);
const HOLD_TOP_MS = 700;
const SCROLL_MS = Number(process.env.SCROLL_MS || 6400);
const HOLD_END_MS = 900;
const SCROLL_VIEWPORTS = Number(process.env.SCROLL_VIEWPORTS || 3.1);
const MAX_BYTES = 2 * 1024 * 1024 - 48 * 1024; // a little headroom under 2 MB

const only = process.argv.slice(2);
const sites = only.length ? SITES.filter((s) => only.includes(s.slug)) : SITES;
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(MEDIA, { recursive: true });

const browser = await chromium.launch({
  channel: 'chrome',
  headless: true,
  args: ['--enable-gpu', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--hide-scrollbars', '--mute-audio'],
});

for (const site of sites) {
  const t0 = Date.now();
  const dir = path.join(TMP, site.slug);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });

  const context = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  const page = await context.newPage();

  // Screenshot of the settled first viewport.
  await load(page, site.url, site.prepare);
  await page.screenshot({ path: path.join(OUT, `${site.slug}-1440x900.png`) });

  // Fresh load for the recording so its first frame matches the screenshot.
  await load(page, site.url, site.prepare);
  const docH = await page.evaluate(() => document.scrollingElement.scrollHeight);
  const distance = Math.max(0, Math.min(docH - H, Math.round(H * SCROLL_VIEWPORTS)));

  const cdp = await context.newCDPSession(page);
  const frames = [];
  cdp.on('Page.screencastFrame', ({ data, metadata, sessionId }) => {
    const file = path.join(dir, `f${String(frames.length).padStart(5, '0')}.jpg`);
    fs.writeFileSync(file, Buffer.from(data, 'base64'));
    frames.push({ file, t: metadata.timestamp });
    cdp.send('Page.screencastFrameAck', { sessionId }).catch(() => {});
  });
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 92, maxWidth: W, maxHeight: H, everyNthFrame: 1 });

  // Eased scroll driven per animation frame. Works with native scrolling and with
  // Lenis-style smoothers, which resync to the native scroll position.
  await page.evaluate(
    ({ distance, hold, dur }) =>
      new Promise((resolve) => {
        const el = document.scrollingElement;
        document.documentElement.style.scrollBehavior = 'auto';
        const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
        let start = null;
        const tick = (now) => {
          if (start === null) start = now;
          const t = now - start - hold;
          if (t >= 0) {
            const p = Math.min(1, t / dur);
            el.scrollTop = distance * ease(p);
            if (p >= 1) return resolve();
          }
          requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }),
    { distance, hold: HOLD_TOP_MS, dur: SCROLL_MS },
  );
  await page.waitForTimeout(HOLD_END_MS);
  // A static page emits no frames, so the last frame is held until the stop time.
  const stopT = Date.now() / 1000;
  await cdp.send('Page.stopScreencast');
  await page.waitForTimeout(150);
  await context.close();

  if (frames.length < 30) throw new Error(`${site.slug}: only ${frames.length} frames captured`);

  // Concat list with the real frame durations, resampled to a constant 30 fps master.
  const lines = [];
  for (let i = 0; i < frames.length; i++) {
    const next = frames[i + 1];
    const d = next ? Math.max(1 / 240, next.t - frames[i].t) : Math.min(2, Math.max(1 / 30, stopT - frames[i].t));
    lines.push(`file '${toPosix(frames[i].file)}'`, `duration ${d.toFixed(5)}`);
  }
  lines.push(`file '${toPosix(frames.at(-1).file)}'`);
  const list = path.join(dir, 'list.txt');
  fs.writeFileSync(list, lines.join('\n'));
  const master = path.join(dir, 'master.mp4');
  ff(['-f', 'concat', '-safe', '0', '-i', list, '-fps_mode', 'cfr', '-r', '30',
    '-vf', 'scale=1280:800:flags=lanczos,format=yuv420p', '-c:v', 'libx264', '-preset', 'slow', '-crf', '8', master]);

  const dur = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', master]).toString());
  const mp4 = path.join(MEDIA, `${site.slug}.mp4`);
  const webm = path.join(MEDIA, `${site.slug}.webm`);
  encodeUnder(mp4, 1750, (kbps, pass, log) => [
    '-i', master, '-an', '-c:v', 'libx264', '-preset', 'slow', '-profile:v', 'high', '-pix_fmt', 'yuv420p',
    '-b:v', `${kbps}k`, '-maxrate', `${Math.round(kbps * 1.6)}k`, '-bufsize', `${kbps * 2}k`,
    '-pass', String(pass), '-passlogfile', log, '-movflags', '+faststart',
  ]);
  encodeUnder(webm, 1500, (kbps, pass, log) => [
    '-i', master, '-an', '-c:v', 'libvpx-vp9', '-b:v', `${kbps}k`, '-row-mt', '1', '-deadline', 'good',
    '-cpu-used', pass === 1 ? '4' : '1', '-pass', String(pass), '-passlogfile', log,
  ]);
  // Poster = first frame of the recording, so pressing play never jumps.
  ff(['-i', master, '-frames:v', '1', path.join(OUT, `${site.slug}-poster.png`)]);

  const kb = (f) => Math.round(fs.statSync(f).size / 1024);
  console.log(`${site.slug}: ${frames.length} frames, ${dur.toFixed(1)} s, scrolled ${distance}px of ${docH}, mp4 ${kb(mp4)} KB, webm ${kb(webm)} KB, ${((Date.now() - t0) / 1000).toFixed(0)} s`);
}
await browser.close();

async function load(page, url, prepare) {
  await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  if (prepare) await prepare(page);
  await page.waitForTimeout(SETTLE_MS);
}

async function clickIfVisible(page, role, name) {
  const target = page.getByRole(role, { name }).first();
  try {
    await target.waitFor({ state: 'visible', timeout: 4000 });
    await target.click();
    await page.waitForTimeout(400);
  } catch {
    // Not shown (for example, the choice is already stored); nothing to dismiss.
  }
}

function toPosix(p) {
  return p.split(path.sep).join('/');
}

function ff(args) {
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...args], { stdio: 'inherit' });
}

function encodeUnder(out, startKbps, argsFor) {
  let kbps = startKbps;
  const nul = process.platform === 'win32' ? 'NUL' : '/dev/null';
  const fmt = path.extname(out) === '.webm' ? 'webm' : 'mp4';
  for (let attempt = 0; attempt < 6; attempt++) {
    const log = path.join(TMP, `pass-${path.basename(out)}`);
    ff([...argsFor(kbps, 1, log), '-f', fmt, nul]);
    ff([...argsFor(kbps, 2, log), out]);
    if (fs.statSync(out).size <= MAX_BYTES) return;
    kbps = Math.round(kbps * 0.85);
  }
  throw new Error(`${out} is still over 2 MB`);
}
