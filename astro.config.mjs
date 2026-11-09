// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://alejololer.is-a.dev',
  i18n: { defaultLocale: 'en', locales: ['en', 'es'] },
  integrations: [sitemap({ lastmod: new Date(), i18n: { defaultLocale: 'en', locales: { en: 'en', es: 'es' } } })],
  // no inlined scripts, so the CSP in vercel.json can stay at script-src 'self' (no hashes to keep in sync)
  vite: { build: { assetsInlineLimit: 0 } },
  fonts: [
    { provider: fontProviders.fontsource(), name: 'Space Grotesk', cssVariable: '--font-sans', weights: [300, 500, 700], subsets: ['latin', 'latin-ext'], fallbacks: ['system-ui', 'sans-serif'] },
    { provider: fontProviders.fontsource(), name: 'VT323', cssVariable: '--font-mono', weights: [400], subsets: ['latin', 'latin-ext'], fallbacks: ['ui-monospace', 'monospace'] },
  ],
});
