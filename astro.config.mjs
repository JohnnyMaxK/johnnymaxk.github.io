// Static build only: no adapter, no server output.
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://johnny.knoblauch.fr',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  redirects: { '/ecrits/': '/idees/' },
  // i18n-ready: French is the default locale and is served without a prefix.
  // To add English later: add 'en' to locales, create src/content/*/en/ and src/pages/en/.
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/cv/') && !page.endsWith('/ecrits/'),
      i18n: { defaultLocale: 'fr', locales: { fr: 'fr-FR' } },
    }),
  ],
  // No external requests: no remote fonts, images or scripts.
  prefetch: false,
  devToolbar: { enabled: false },
});
