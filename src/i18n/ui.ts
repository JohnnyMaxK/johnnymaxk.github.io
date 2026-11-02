// Interface strings per locale. Add an `en` block when the English version starts.
export const defaultLang = 'fr' as const;
export const languages = { fr: 'Français' } as const;
export type Lang = keyof typeof languages;

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
    'ecrits.published': 'Publié le',
    'ecrits.updated': 'Mis à jour le',
    'ecrits.back': 'Tous les écrits',
    'ecrits.rss': 'Flux RSS des écrits',
    'footer.legal': 'Mentions légales',
    'footer.rss': 'RSS',
    'footer.notrack': 'Pas de traceur, pas de cookie.',
    '404.title': 'Page introuvable',
    '404.text': 'Cette page n’existe pas ou a été déplacée.',
    '404.home': 'Retour à l’accueil',
  },
} as const;

export function t(lang: Lang, key: keyof (typeof ui)['fr']): string {
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

export function formatDate(d: Date, lang: Lang = defaultLang): string {
  return d.toLocaleDateString(lang === 'fr' ? 'fr-FR' : lang, {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Europe/Paris',
  });
}

/** Entry id is "<lang>/<slug>"; return the slug part. */
export function slugOf(id: string): string {
  return id.split('/').slice(1).join('/');
}
