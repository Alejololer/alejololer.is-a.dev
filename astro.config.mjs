// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://alejololer.is-a.dev',
  i18n: { defaultLocale: 'en', locales: ['en', 'es'] },
  integrations: [sitemap({ i18n: { defaultLocale: 'en', locales: { en: 'en', es: 'es' } } })],
  fonts: [
    { provider: fontProviders.fontsource(), name: 'Space Grotesk', cssVariable: '--font-sans', weights: [300, 500, 700], subsets: ['latin', 'latin-ext'], fallbacks: ['system-ui', 'sans-serif'] },
    { provider: fontProviders.fontsource(), name: 'VT323', cssVariable: '--font-mono', weights: [400], subsets: ['latin', 'latin-ext'], fallbacks: ['ui-monospace', 'monospace'] },
  ],
});
