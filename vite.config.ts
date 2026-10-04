import { defineConfig, type Plugin } from 'vite';

/**
 * Inlines the single stylesheet into index.html at build time. The CSS is small, and
 * inlining removes a render-blocking request before the hero can paint.
 */
function inlineCss(): Plugin {
  return {
    name: 'portfolio:inline-css',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const html = bundle['index.html'];
      if (!html || html.type !== 'asset') return;
      let source = String(html.source);
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (chunk.type !== 'asset' || !fileName.endsWith('.css')) continue;
        const linkRe = new RegExp(`<link rel="stylesheet"[^>]*href="[^"]*${fileName.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')}"[^>]*>`);
        if (!linkRe.test(source)) continue;
        source = source.replace(linkRe, () => `<style>${String(chunk.source)}</style>`);
        delete bundle[fileName];
      }
      html.source = source;
    },
  };
}

export default defineConfig({
  base: '/Portfolio/',
  build: {
    target: 'es2020',
    assetsInlineLimit: 0,
    modulePreload: { polyfill: false },
    reportCompressedSize: true,
  },
  plugins: [inlineCss()],
});
