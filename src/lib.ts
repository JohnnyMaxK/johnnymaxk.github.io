// Shared builders for the RSS feed and llms.txt, one per language.
import rss from '@astrojs/rss';
import { getCollection, getEntry } from 'astro:content';
import type { APIContext } from 'astro';
import type { CollectionEntry } from 'astro:content';
import { localePath, locales, slugOf, t, type Lang } from './i18n/ui';

export type Post = CollectionEntry<'idees'>;

/** Language of an entry, from its id "<lang>/<name>". */
export const langOfPost = (p: Post) => p.id.split('/')[0] as Lang;
/** URL slug: the front matter `permalink`, else the file name. */
export const slugOfPost = (p: Post) => p.data.permalink ?? slugOf(p.id);
/** Public path of an entry in its own language. */
export const postPath = (p: Post) => localePath(langOfPost(p), `/idees/${slugOfPost(p)}/`);

/** Published entries of one language. Notes first in their order, then articles newest first. */
export async function posts(lang: Lang): Promise<Post[]> {
  const all = await getCollection('idees', (e) => e.id.startsWith(`${lang}/`) && !e.data.draft);
  const notes = all.filter((e) => e.data.kind === 'note').sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));
  const articles = all.filter((e) => e.data.kind !== 'note').sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  return [...notes, ...articles];
}

/** The same text in the other languages (same file name), for hreflang and the language switch. */
export async function counterparts(p: Post): Promise<Partial<Record<Lang, string>>> {
  const name = slugOf(p.id);
  const all = await getCollection('idees', (e) => slugOf(e.id) === name && !e.data.draft);
  return Object.fromEntries(all.map((e) => [langOfPost(e), postPath(e)]));
}

export async function feed(context: APIContext, lang: Lang) {
  const items = (await posts(lang)).filter((p) => p.data.kind !== 'note');
  return rss({
    title: `${t(lang, 'site.name')} · ${t(lang, 'nav.idees')}`,
    description: t(lang, 'site.description'),
    site: context.site!,
    items: items.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      link: postPath(p),
      categories: p.data.tags,
    })),
    customData: `<language>${locales[lang]}</language>`,
  });
}

/** Front matter of one page, with the Markdown body stripped of its tags and reduced to plain text. */
export async function pageSummary(lang: Lang, id: string) {
  const entry = await getEntry('pages', `${lang}/${id}`);
  if (!entry) return null;
  return { title: entry.data.title, description: entry.data.description, body: plain(entry.body ?? '') };
}

function plain(md: string): string {
  return md
    .replace(/<[^>]+>/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`#>]+/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
