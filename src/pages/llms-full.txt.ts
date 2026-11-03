// llms-full.txt: the whole site as plain text (French, the reference version), generated from the content.
import type { APIContext } from 'astro';
import { pageSummary, postPath, posts } from '../lib';
import { site } from '../site.config';

const PAGES = ['accueil', 'parcours', 'idees', 'lectures', 'maintenant', 'contact'] as const;

export async function GET(_context: APIContext) {
  const parts: string[] = [`# ${site.person} — ${site.url}`, '', 'Texte intégral du site (français). Résumé et liens : /llms.txt', ''];
  for (const id of PAGES) {
    const p = await pageSummary('fr', id);
    if (!p) continue;
    const url = id === 'accueil' ? `${site.url}/` : `${site.url}/${id}/`;
    parts.push('---', '', `## ${p.title}`, `URL : ${url}`, '', p.description, '', p.body, '');
  }
  for (const post of await posts('fr')) {
    const when = post.data.kind === 'note' ? (post.data.tag ?? 'Note') : `Publié le ${post.data.date.toISOString().slice(0, 10)}`;
    parts.push('---', '', `## ${post.data.title}`, `URL : ${site.url}${postPath(post)}`, when, '', post.data.description, '', (post.body ?? '').replace(/<[^>]+>/g, ''), '');
  }
  return new Response(parts.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
