// Interface strings per locale. French is the default and is served without a prefix; English under /en/
// when src/languages.config.mjs enables it.
import { ENGLISH_ENABLED } from '../languages.config.mjs';

export const defaultLang = 'fr' as const;
export const languages = { fr: 'Français', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const locales: Record<Lang, string> = { fr: 'fr-FR', en: 'en-GB' };
/** The languages actually built and exposed. */
export const activeLangs: Lang[] = ENGLISH_ENABLED ? ['fr', 'en'] : ['fr'];

export const ui = {
  fr: {
    'site.name': 'Johnny KNOBLAUCH',
    'site.description': 'Johnny KNOBLAUCH, CTO/CPO depuis plus de 20 ans en startup. Depuis l’IA, seul le pourquoi compte : son parcours, ses idées, ses lectures.',
    'skip': 'Aller au contenu',
    'nav.label': 'Navigation principale',
    'nav.accueil': 'Accueil',
    'nav.parcours': 'Parcours',
    'nav.idees': 'Idées',
    'nav.lectures': 'Lectures',
    'nav.maintenant': 'Maintenant',
    'nav.contact': 'Contact',
    'theme.toggle': 'Changer de thème (clair ou sombre)',
    'lang.switch': 'Read in English',
    'lang.switch.lang': 'en',
    'ecrits.published': 'Publié le',
    'ecrits.updated': 'Mis à jour le',
    'ecrits.back': 'Toutes les idées',
    'note.nav': 'Autres notes',
    'note.prev': 'Note précédente',
    'note.next': 'Note suivante',
    'ecrits.rss': 'Flux RSS des écrits',
    'footer.legal': 'Mentions légales',
    'footer.rss': 'RSS',
    'footer.notrack': 'Pas de traceur, pas de cookie.',
    'translated.notice': '',
    'home.latest': 'Derniers écrits',
    'contact.linkedin': 'LinkedIn',
    'contact.mail': 'Mail',
    'cv.title': 'Recevoir mon CV en PDF',
    'cv.text': 'Mon CV n’est pas en ligne : écrivez-moi et je vous l’envoie par retour de mail.',
    'cv.link': 'Demander mon CV à',
    'cv.subject': 'Demande de CV',
    '404.title': 'Page introuvable',
    '404.text': 'Cette page n’existe pas ou a été déplacée.',
    '404.home': 'Retour à l’accueil',
  },
  en: {
    'site.name': 'Johnny KNOBLAUCH',
    'site.description': 'Johnny KNOBLAUCH, CTO/CPO with 20+ years in startups. Since AI, only the why matters: his journey, his ideas, his reading.',
    'skip': 'Skip to content',
    'nav.label': 'Main navigation',
    'nav.accueil': 'Home',
    'nav.parcours': 'Journey',
    'nav.idees': 'Ideas',
    'nav.lectures': 'Reading',
    'nav.maintenant': 'Now',
    'nav.contact': 'Contact',
    'theme.toggle': 'Switch theme (light or dark)',
    'lang.switch': 'Lire en français',
    'lang.switch.lang': 'fr',
    'ecrits.published': 'Published on',
    'ecrits.updated': 'Updated on',
    'ecrits.back': 'All ideas',
    'note.nav': 'Other notes',
    'note.prev': 'Previous note',
    'note.next': 'Next note',
    'ecrits.rss': 'RSS feed of the writing',
    'footer.legal': 'Legal notice',
    'footer.rss': 'RSS',
    'footer.notrack': 'No tracker, no cookie.',
    'translated.notice': 'Translated from the French original, which prevails. Spotted an error? Write to me.',
    'home.latest': 'Latest writing',
    'contact.linkedin': 'LinkedIn',
    'contact.mail': 'Email',
    'cv.title': 'Get my CV as a PDF',
    'cv.text': 'My CV is not online: write to me and I will send it back by email.',
    'cv.link': 'Ask for my CV at',
    'cv.subject': 'CV request',
    '404.title': 'Page not found',
    '404.text': 'This page does not exist or has been moved.',
    '404.home': 'Back to the home page',
  },
} as const;

export type UiKey = keyof (typeof ui)['fr'];

export function t(lang: Lang, key: UiKey): string {
  return ui[lang][key] ?? ui[defaultLang][key];
}

export const nav = [
  { key: 'nav.accueil', href: '/' },
  { key: 'nav.parcours', href: '/parcours/' },
  { key: 'nav.idees', href: '/idees/' },
  { key: 'nav.lectures', href: '/lectures/' },
  { key: 'nav.maintenant', href: '/maintenant/' },
  { key: 'nav.contact', href: '/contact/' },
] as const;

/** Same slugs in every language; only the prefix changes. '/parcours/' -> '/en/parcours/'. */
export function localePath(lang: Lang, path: string): string {
  return lang === defaultLang ? path : `/${lang}${path}`;
}

/** The language a pathname is served in. */
export function langOfPath(pathname: string): Lang {
  const first = pathname.split('/')[1];
  return (first in languages && first !== defaultLang ? first : defaultLang) as Lang;
}

/** The same page without any language prefix. '/en/parcours/' -> '/parcours/'. */
export function stripLang(pathname: string): string {
  const lang = langOfPath(pathname);
  return lang === defaultLang ? pathname : pathname.slice(lang.length + 1) || '/';
}

export function formatDate(d: Date, lang: Lang = defaultLang): string {
  return d.toLocaleDateString(locales[lang], {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Europe/Paris',
  });
}

/** Entry id is "<lang>/<slug>"; return the slug part. */
export function slugOf(id: string): string {
  return id.split('/').slice(1).join('/');
}
