# johnny.knoblauch.fr

This is the GitHub user site repository (`JohnnyMaxK/johnnymaxk.github.io`, branch `main`), deployed by `.github/workflows/deploy.yml` to GitHub Pages with the custom domain `johnny.knoblauch.fr` (`public/CNAME`). Once the domain is set, GitHub redirects every `johnnymaxk.github.io/*` URL to `johnny.knoblauch.fr/*`.

Two static pages are kept outside Astro, for the Google OAuth branding of the private msgvault tool: `public/privacy.html` (served at `/privacy.html`, URL registered in Google Cloud) and `public/msgvault/index.html` (served at `/msgvault/`, formerly the home page of this repository). Do not move or rename them.

Personal site of Johnny KNOBLAUCH. Static site built with [Astro](https://astro.build) 7, no server, no tracking, no cookies, no external fonts or CDNs.

## Build

Requires Node.js 22 or later.

```sh
npm install
npm run build      # writes the static site to dist/
npm run preview    # serves dist/ locally to check it
npm run dev        # live-reload development server
```

## Where the content goes

All text is Markdown. Placeholders are marked « À REMPLACER » (`grep -rn "À REMPLACER" src` lists what is left).

| Page | File |
|------|------|
| Accueil `/` | `src/content/pages/fr/accueil.md` |
| Parcours `/parcours/` | `src/content/pages/fr/parcours.md` |
| Idées `/idees/` | `src/content/pages/fr/idees.md` (the five position notes) |
| Écrits `/ecrits/` | intro in `src/content/pages/fr/ecrits.md`; one file per article in `src/content/idees/fr/<slug>.md`, published at `/ecrits/<slug>/` |
| Lectures `/lectures/` | `src/content/pages/fr/lectures.md` |
| Maintenant `/maintenant/` | `src/content/pages/fr/maintenant.md` |
| Contact `/contact/` | `src/content/pages/fr/contact.md` (e-mail and LinkedIn come from `src/site.config.ts`) |
| Mentions légales `/mentions-legales/` | `src/content/pages/fr/mentions-legales.md` (linked from the footer) |

Page front matter: `title`, `description`, optional `outro` (list of paragraphs shown after the generated part of the page, e.g. the contact links or the article list). Article front matter: `title`, `description`, `date` (YYYY-MM-DD), optional `updated`, `tags`, `draft` (a draft is left out of the site, the RSS feed and the sitemap). The schema is in `src/content.config.ts`; the build fails on a missing field.

Interface strings (menu, footer, dates) are in `src/i18n/ui.ts`.

## Generated files

- `/rss.xml`: RSS feed of the articles.
- `/sitemap-index.xml`: sitemap (via `@astrojs/sitemap`), declared in `robots.txt`.
- OpenGraph and Twitter tags on every page; default image `public/og-default.png` (1200×630).

## Adding English later

1. `astro.config.mjs`: add `'en'` to `i18n.locales` and to the sitemap `locales`.
2. `src/i18n/ui.ts`: add an `en` block and the language to `languages`.
3. Content in `src/content/pages/en/` and `src/content/idees/en/`.
4. Routes in `src/pages/en/` (same files as French, with `lang="en"` and the `en/` filter).

## Deployment (to choose later)

Nothing is deployed yet and no DNS record exists. Two options:

1. **Infomaniak web hosting, SFTP/rsync of `dist/`.** Create the site `johnny.knoblauch.fr` in the Infomaniak hosting manager (the domain is already at Infomaniak), enable the free Let's Encrypt certificate, then upload after each build:
   ```sh
   npm run build
   rsync -avz --delete dist/ <user>@<host>:<site-folder>/
   ```
   `public/.htaccess` (404 page, security headers, cache) is used by Apache there.
2. **Static host with a CNAME on knoblauch.fr** (Cloudflare Pages, Netlify, GitHub Pages, etc.). Build command `npm run build`, output folder `dist`, then add a DNS record `johnny CNAME <host-given-target>.` in the knoblauch.fr zone and enable HTTPS on the host. `.htaccess` is ignored there; set the equivalent headers in the host's config if needed.

## CV on request (PHP, Infomaniak web hosting only)

**Current state (GitHub Pages, static):** the form is disabled. `src/components/CvForm.astro` shows a mailto link to johnny@knoblauch.fr instead, and the legal notice states that the site collects no data. The PHP files below are kept for a possible move to Infomaniak web hosting; to restore the form there, bring back the form markup from git history (`git log -- src/components/CvForm.astro`) and the GDPR section of `mentions-legales.md`.

The CV PDF is never public: the visitor leaves an e-mail address on `/parcours/` and receives a download link valid 7 days. Requires Apache + PHP 8.1 or later (Infomaniak shared web hosting); on a static-only host the form cannot work.

| File | Role |
|------|------|
| `src/components/CvForm.astro` | The form (e-mail, consent box, hidden honeypot field), plain HTML POST to `/cv.php`, no JavaScript. |
| `public/cv.php` | Checks the origin, the honeypot, the consent and the address; rate-limits (per IP 5, per address 3, whole site 50 per 24 h); mails the visitor the link; mails a notification to johnny@knoblauch.fr. Redirects to `/cv/merci/`, `/cv/erreur/` or `/cv/limite/`. |
| `public/cv-download.php` | Serves the PDF only with a valid token (`<expiry>.<nonce>.<HMAC-SHA256>`), else redirects to `/cv/lien-expire/`. |
| `public/_cv/lib.php` | Shared code: config loading, tokens, file-based counters (HMAC-hashed keys, no clear IP or address on disk), minimal SMTP client. Folder denied by `.htaccess`. |
| `src/content/pages/fr/cv-*.md` | Text of the four result pages (not indexed, not in the sitemap). |
| `cv-config.example.php` | Config template. The filled copy never goes in git (`.gitignore`). |
| `src/content/pages/fr/mentions-legales.md` | GDPR text: purpose, consent, 12-month retention, rights, contact. |

### Server setup (once)

1. In the Infomaniak hosting manager, set PHP 8.1 or later for the site.
2. Next to the site folder (outside the web root), create `cv-private/`, so the tree is `<parent>/<site-folder>/` (receives `dist/`) and `<parent>/cv-private/`:
   ```sh
   ssh <user>@<host> 'mkdir -m 700 <parent>/cv-private'
   scp cv-config.example.php <user>@<host>:<parent>/cv-private/config.php
   ```
3. Edit `<parent>/cv-private/config.php` on the server: `secret` (`php -r 'echo bin2hex(random_bytes(32)), "\n";'`), SMTP password of the johnny@knoblauch.fr mailbox (`mail.infomaniak.com`, 465 SSL), then `chmod 600 config.php`. The secret and the password exist only there.
4. Upload the CV PDF (step left: it is not in this repo yet) to the path set in `pdf_path`, by default `<parent>/cv-private/Johnny-KNOBLAUCH-CV.pdf`.
5. If PHP cannot read outside the web root (open_basedir), put the same `config.php` and PDF in `<site-folder>/_private/` instead (denied by `public/_private/.htaccess`, tried second by `lib.php`), set `pdf_path` and `data_dir` accordingly, and protect that folder from `rsync --delete`:
   ```sh
   rsync -avz --delete --filter='P /_private/**' dist/ <user>@<host>:<site-folder>/
   ```
6. Test: submit the form with your own address, open the link, check that `/cv-download.php` without a token and `/_cv/lib.php` both refuse, and that the notification reached johnny@knoblauch.fr.

### Retention (12 months)

The only copy of a visitor's address is the notification mail in the johnny@knoblauch.fr mailbox (the SMTP client keeps no sent copy). Delete notifications older than 12 months (subject starts with « CV demandé : »); a mailbox filter into a dedicated folder makes it a one-minute monthly check. The counters in `cv-private/data/rate/` hold only hashes and are purged after 24 h.
