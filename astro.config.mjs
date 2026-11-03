// Static build only: no adapter, no server output.
import { readdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { ENGLISH_ENABLED } from './src/languages.config.mjs';

// The English version in reserve: routes in src/reserve/en/ are served under /en/ only when the switch is on,
// and the English share images in public/og/ are dropped from dist when it is off.
const english = {
  name: 'english-in-reserve',
  hooks: {
    'astro:config:setup': ({ injectRoute }) => {
      if (!ENGLISH_ENABLED) return;
      const files = readdirSync('src/reserve/en', { recursive: true, withFileTypes: true }).filter((f) => f.isFile());
      for (const f of files) {
        const file = `${f.parentPath}/${f.name}`.replace(/\\/g, '/');
        const route = file.replace('src/reserve/en/', '').replace(/\.(astro|ts)$/, '').replace(/(^|\/)index$/, '');
        injectRoute({ pattern: `/en/${route}`, entrypoint: `./${file}` });
      }
    },
    'astro:build:done': ({ dir }) => {
      if (ENGLISH_ENABLED) return;
      const og = fileURLToPath(new URL('og/', dir));
      for (const name of readdirSync(og)) if (name.startsWith('en-')) rmSync(og + name);
    },
  },
};

export default defineConfig({
  site: 'https://johnny.knoblauch.fr',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  redirects: { '/ecrits/': '/idees/', ...(ENGLISH_ENABLED ? { '/en/ecrits/': '/en/idees/' } : {}) },
  // French is the default locale and is served without a prefix; English lives under /en/ when enabled.
  i18n: {
    defaultLocale: 'fr',
    locales: ENGLISH_ENABLED ? ['fr', 'en'] : ['fr'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    english,
    sitemap({
      filter: (page) => !page.includes('/404') && !page.endsWith('/ecrits/'),
      ...(ENGLISH_ENABLED ? { i18n: { defaultLocale: 'fr', locales: { fr: 'fr-FR', en: 'en-GB' } } } : {}),
    }),
  ],
  // No external requests: no remote fonts, images or scripts.
  prefetch: false,
  devToolbar: { enabled: false },
});
