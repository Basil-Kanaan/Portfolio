// Visual verification of the built site with Playwright (system Chrome, real GPU).
//   node scripts/verify.mjs [--query "a=b"] [--out dir] [--only motion|static] [--widths 375,1440]
// Motion pass: viewport screenshots while scrolling at 375, 768, 1440, 1920.
// Static pass: full-page screenshots with prefers-reduced-motion at 375 and 1440.
// Also reports console errors and failed requests.
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : fallback;
};
const QUERY = arg('query', '');
const OUT = path.resolve(arg('out', path.join(ROOT, '.verify')));
const ONLY = arg('only', '');
const WIDTHS = (arg('widths', '375,768,1440,1920')).split(',').map(Number);
const PORT = 4421;
fs.mkdirSync(OUT, { recursive: true });

const server = spawn(process.execPath, [path.join(ROOT, 'node_modules/vite/bin/vite.js'), 'preview', '--port', String(PORT), '--strictPort'], { cwd: ROOT, stdio: 'pipe' });
await new Promise((resolve, reject) => {
  server.stdout.on('data', (d) => String(d).includes(String(PORT)) && resolve());
  setTimeout(() => reject(new Error('vite preview did not start')), 20000);
});
const URL = `http://localhost:${PORT}/Portfolio/${QUERY ? `?${QUERY}` : ''}`;

const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--enable-gpu', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--hide-scrollbars'] });
const problems = [];

function watch(page, label) {
  page.on('console', (m) => {
    if (m.type() === 'error') problems.push(`${label} console: ${m.text()}`);
  });
  page.on('pageerror', (e) => problems.push(`${label} pageerror: ${e.message}`));
  page.on('response', (r) => r.status() >= 400 && problems.push(`${label} HTTP ${r.status()} ${r.url()}`));
}

const heights = { 375: 812, 768: 1024, 1440: 900, 1920: 1080 };

if (ONLY !== 'static') {
  for (const w of WIDTHS) {
    const h = heights[w] ?? 900;
    const mobile = w < 768;
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile });
    const page = await ctx.newPage();
    watch(page, `${w}`);
    await page.goto(URL, { waitUntil: 'load' });
    await page.waitForTimeout(450);
    await page.screenshot({ path: path.join(OUT, `m${w}-00-intro-mid.png`) });
    await page.waitForTimeout(2600);
    await page.screenshot({ path: path.join(OUT, `m${w}-01-hero.png`) });

    // Walk down the page in viewport steps so every scroll-triggered reveal fires.
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    let shot = 2;
    const stepPx = Math.round(h * 0.5);
    for (let y = stepPx; y < total; y += stepPx) {
      await page.mouse.wheel(0, stepPx);
      await page.waitForTimeout(260);
      if (y % (h * 1) < stepPx) {
        await page.waitForTimeout(900);
        await page.screenshot({ path: path.join(OUT, `m${w}-${String(shot).padStart(2, '0')}-y${y}.png`) });
        shot++;
      }
    }
    await page.waitForTimeout(1200);
    await page.screenshot({ path: path.join(OUT, `m${w}-${String(shot).padStart(2, '0')}-end.png`) });
    await ctx.close();
  }
}

if (ONLY !== 'motion') {
  for (const w of [375, 1440]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: heights[w] }, reducedMotion: 'reduce', isMobile: w < 768, hasTouch: w < 768 });
    const page = await ctx.newPage();
    watch(page, `rm${w}`);
    await page.goto(URL, { waitUntil: 'load' });
    await page.waitForTimeout(1200);
    // Lazy images below the fold: scroll through once so they load, then return to top.
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(OUT, `rm${w}-full.png`), fullPage: true });
    await ctx.close();
  }
}

await browser.close();
server.kill();
console.log(problems.length ? `PROBLEMS:\n${[...new Set(problems)].join('\n')}` : 'No console errors or failed requests.');
console.log(`Screenshots in ${OUT}`);
