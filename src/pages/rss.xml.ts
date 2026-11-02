import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { slugOf, t } from '../i18n/ui';

export async function GET(context: APIContext) {
  const posts = (await getCollection('idees', (e) => e.id.startsWith('fr/') && !e.data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  return rss({
    title: `${t('fr', 'site.name')} · Écrits`,
    description: t('fr', 'site.description'),
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      link: `/ecrits/${slugOf(p.id)}/`,
      categories: p.data.tags,
    })),
    customData: '<language>fr-FR</language>',
  });
}
