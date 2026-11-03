// llms.txt: a concise, linkable overview for AI crawlers and answer engines, generated from the content
// so it never drifts. The full text of every page is at /llms-full.txt.
import type { APIContext } from 'astro';
import { ENGLISH_ENABLED } from '../languages.config.mjs';
import { pageSummary, postPath, posts } from '../lib';
import { contact, site } from '../site.config';

const PAGES = ['parcours', 'idees', 'lectures', 'maintenant', 'contact'] as const;

export async function GET(_context: APIContext) {
  const home = await pageSummary('fr', 'accueil');
  const homeEn = await pageSummary('en', 'accueil');
  const fr = await Promise.all(PAGES.map(async (id) => ({ id, ...(await pageSummary('fr', id))! })));
  const en = await Promise.all(PAGES.map(async (id) => ({ id, ...(await pageSummary('en', id))! })));
  const notesFr = (await posts('fr')).filter((p) => p.data.kind === 'note');
  const notesEn = (await posts('en')).filter((p) => p.data.kind === 'note');
  const lines = [
    `# ${site.person}`,
    '',
    `> ${home!.description}`,
    '',
    `${site.person} est CTO/CPO de startups depuis plus de 20 ans, toujours au comité de direction : des logiciels pour des compagnies aériennes (26 compagnies), puis un SaaS B2B d’intégration e-commerce (BeezUP, 1 000 clients reliés à des centaines de marketplaces). Il vit à Tours (France). Ce site personnel expose son parcours, ses cinq idées contre « l’usine à fonctionnalités » (#NoBacklog, discovery continue, #mob, petites équipes cross-fonctionnelles, agents IA sous garde-fous), ses lectures et ce qu’il fait en ce moment.`,
    '',
    `Signature : « L’IA pour les corvées, l’Humain pour le vrai. »`,
    '',
    ENGLISH_ENABLED ? '## Pages (français, version de référence)' : '## Pages',
    '',
    `- [Accueil](${site.url}/) : ${home!.description}`,
    ...fr.map((p) => `- [${p.title}](${site.url}/${p.id}/) : ${p.description}`),
    `- [Mentions légales](${site.url}/mentions-legales/)`,
    '',
    '## Les cinq notes (une page chacune)',
    '',
    ...notesFr.map((p) => `- [${p.data.title}](${site.url}${postPath(p)}) (${p.data.tag}) : ${p.data.description}`),
    '',
    ...(ENGLISH_ENABLED ? [
      '## Pages (English translation; the French prevails)',
      '',
      `- [Home](${site.url}/en/) : ${homeEn!.description}`,
      ...en.map((p) => `- [${p.title}](${site.url}/en/${p.id}/) : ${p.description}`),
      ...notesEn.map((p) => `- [${p.data.title}](${site.url}${postPath(p)}) (${p.data.tag}) : ${p.data.description}`),
      '',
    ] : []),
    '## Texte intégral',
    '',
    `- [llms-full.txt](${site.url}/llms-full.txt) : toutes les pages en texte brut (français).`,
    `- [Flux RSS des écrits](${site.url}/rss.xml)${ENGLISH_ENABLED ? ` · [English feed](${site.url}/en/rss.xml)` : ''}`,
    '',
    '## Contact',
    '',
    `- E-mail : ${contact.email}`,
    `- LinkedIn : ${contact.linkedin}`,
    `- GitHub : ${contact.github}`,
    '',
    'Pas de traceur, pas de cookie, pas de formulaire. Site statique, code source sur GitHub (JohnnyMaxK/johnnymaxk.github.io).',
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
