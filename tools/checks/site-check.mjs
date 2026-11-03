/* johnny.knoblauch.fr — site check (CI gate). Renders EVERY built page in a real browser and fails on:
     1. a console error or an uncaught exception on any page;
     2. a page without exactly one <h1>, without a canonical (unless noindex), or with an image without alt;
     3. a horizontal overflow at phone width (390px);
     4. a broken hreflang pair, when English is built: the fr/en alternates must exist in dist and point back at each other;
     5. structured data that does not parse, or lacks the Person node;
     6. a language switch or an internal link that leads to a page that does not exist in dist;
     7. a theme toggle that does not flip the theme;
     8. an /llms.txt or /sitemap that cites a URL absent from dist;
     9. an og:image that is missing or points to a file absent from dist;
    10. a forbidden term in any text file of dist (unfinished-text markers, and private terms when the private list is present).
   Run:  npm run build && node tools/checks/site-check.mjs      (serves dist/ itself on a free port)
   Needs Playwright with Chromium: npm i --no-save playwright && npx playwright install --with-deps chromium */
import { createServer } from 'node:http';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { chromium } from 'playwright';

const dist = new URL('../../dist/', import.meta.url).pathname;
if (!existsSync(dist + 'index.html')) { console.error('dist/ is missing: run `npm run build` first.'); process.exit(2); }

const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8' };
const server = createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p.endsWith('/')) p += 'index.html';
  const f = join(dist, p);
  if (!f.startsWith(dist) || !existsSync(f) || statSync(f).isDirectory()) { res.writeHead(404); res.end('not found'); return; }
  res.writeHead(200, { 'Content-Type': types[extname(f)] || 'application/octet-stream' });
  res.end(readFileSync(f));
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const BASE = `http://127.0.0.1:${server.address().port}`;

const walk = (dir, out = []) => { for (const e of readdirSync(dir)) { const f = join(dir, e); statSync(f).isDirectory() ? walk(f, out) : out.push(f); } return out; };
const pages = walk(dist).filter((f) => f.endsWith('.html')).map((f) => f.slice(dist.length - 1)).sort();
const exists = (urlPath) => {
  const p = urlPath.replace(/[?#].*$/, '');
  if (p.endsWith('/')) return existsSync(join(dist, p, 'index.html'));
  return existsSync(join(dist, p)) || existsSync(join(dist, p, 'index.html'));
};
const toPath = (href) => { try { return new URL(href, 'https://johnny.knoblauch.fr').pathname; } catch { return href; } };

const failures = [];
const fail = (page, msg) => failures.push(`${page}: ${msg}`);

// Forbidden terms. The list of private terms never lives in this file, which is published: it comes from the
// private repository's tools/checks/forbidden-terms.private.txt (one regular expression per line), or from the
// SITE_FORBIDDEN_FILE environment variable. A term matches only as a whole word. Review markers are always checked;
// they are case-sensitive because they are written in capitals, and the same words in lower case are ordinary French.
const [before, after] = ['(?<![\\p{L}\\p{N}])', '(?![\\p{L}\\p{N}])'];
const termsFile = process.env.SITE_FORBIDDEN_FILE || new URL('./forbidden-terms.private.txt', import.meta.url).pathname;
const privateTerms = existsSync(termsFile) ? readFileSync(termsFile, 'utf8').split('\n').map((l) => l.trim()).filter(Boolean) : [];
const forbidden = [
  new RegExp(`${before}(?:VALIDER|VÉRIFIER|LIEN\\s+EN\\s+ATTENTE)${after}`, 'gu'),
  ...(privateTerms.length ? [new RegExp(`${before}(?:${privateTerms.join('|')})${after}`, 'giu')] : []),
];
const textFiles = walk(dist).filter((f) => ['.html', '.xml', '.txt', '.css', '.js', '.json', '.svg'].includes(extname(f)));
for (const f of textFiles) {
  const hits = forbidden.flatMap((re) => [...readFileSync(f, 'utf8').matchAll(re)].map((m) => m[0]));
  if (hits.length) failures.push(`${f.slice(dist.length - 1)}: forbidden term(s) ${[...new Set(hits)].join(', ')}`);
}

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
for (const [label, viewport] of [['desktop', { width: 1280, height: 900 }], ['phone', { width: 390, height: 844 }]]) {
  const context = await browser.newContext({ viewport });
  await context.route(/^https?:\/\/(?!127\.0\.0\.1)/, (route) => route.abort()); // the site must not call anyone
  const page = await context.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e.message)));
  page.on('requestfailed', (r) => { if (r.url().startsWith(BASE)) errors.push(`request failed: ${r.url()}`); });

  for (const file of pages) {
    const route = file.replace(/index\.html$/, '');
    const source = readFileSync(join(dist, file), 'utf8');
    if (/http-equiv="refresh"/.test(source)) continue; // Astro redirect stub (/ecrits/ -> /idees/): nothing to render
    // Two static pages kept outside Astro for the Google OAuth branding of the private msgvault tool (see README):
    // rendered for errors and overflow, exempt from the site's own chrome and metadata rules.
    const legacy = route === '/msgvault/' || route === '/privacy.html';
    errors.length = 0;
    const resp = await page.goto(BASE + route, { waitUntil: 'load' });
    if (!resp || resp.status() !== 200) { fail(route, `HTTP ${resp && resp.status()}`); continue; }
    await page.waitForTimeout(150);
    const name = `${route} [${label}]`;
    for (const e of errors) fail(name, `console: ${e}`);

    const info = await page.evaluate(() => {
      const q = (s) => document.querySelector(s);
      const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent);
      return {
        h1: document.querySelectorAll('h1').length,
        noindex: !!q('meta[name="robots"][content*="noindex"]'),
        canonical: q('link[rel="canonical"]')?.href || null,
        lang: document.documentElement.lang,
        alternates: [...document.querySelectorAll('link[rel="alternate"][hreflang]')].map((l) => ({ lang: l.hreflang, href: l.href })),
        imgsNoAlt: [...document.images].filter((i) => !i.hasAttribute('alt')).length,
        overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
        links: [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')).filter((h) => h.startsWith('/')),
        ld,
        header: !!q('header.site nav'), footer: !!q('footer.site'), skip: !!q('.skip-link'),
        switchHref: q('.lang-switch')?.getAttribute('href') || null,
        ogImage: q('meta[property="og:image"]')?.getAttribute('content') || null,
      };
    });
    if (info.overflow) fail(name, 'horizontal overflow');
    if (legacy) continue;
    if (info.h1 !== 1) fail(name, `${info.h1} <h1>`);
    if (!info.noindex && !info.canonical) fail(name, 'no canonical');
    if (info.imgsNoAlt) fail(name, `${info.imgsNoAlt} image(s) without alt`);
    if (!info.header || !info.footer || !info.skip) fail(name, 'header, footer or skip link missing');
    if (!info.lang) fail(name, 'html[lang] missing');
    for (const href of info.links) if (!exists(href)) fail(name, `dead internal link ${href}`);
    if (info.switchHref && !exists(info.switchHref)) fail(name, `language switch leads to missing ${info.switchHref}`);
    if (!info.ogImage) fail(name, 'no og:image'); else if (!exists(toPath(info.ogImage))) fail(name, `og:image missing in dist: ${info.ogImage}`);
    if (label === 'desktop') {
      if (info.ld.length !== 1) fail(name, `${info.ld.length} JSON-LD block(s)`);
      else {
        try {
          const graph = JSON.parse(info.ld[0])['@graph'] || [];
          if (!graph.some((n) => n['@type'] === 'Person')) fail(name, 'JSON-LD has no Person');
        } catch (e) { fail(name, `JSON-LD does not parse: ${e.message}`); }
      }
      // hreflang reciprocity: every alternate exists and lists this page back.
      for (const a of info.alternates) {
        const p = toPath(a.href);
        if (!exists(p)) { fail(name, `hreflang ${a.lang} -> missing ${p}`); continue; }
        if (a.lang === 'x-default') continue;
        const other = readFileSync(join(dist, p, p.endsWith('/') ? 'index.html' : ''), 'utf8');
        if (!other.includes(`href="https://johnny.knoblauch.fr${route}"`)) fail(name, `hreflang ${a.lang} (${p}) does not point back`);
      }
      // theme toggle flips the theme
      if (await page.$('#theme-toggle')) {
        const before = await page.evaluate(() => document.documentElement.dataset.theme || 'dark');
        await page.click('#theme-toggle');
        const after = await page.evaluate(() => document.documentElement.dataset.theme);
        if (after === before) fail(name, 'theme toggle does nothing');
        await page.evaluate(() => localStorage.removeItem('theme'));
      }
    }
  }
  await context.close();
}
await browser.close();

// llms.txt and the sitemap cite only pages that exist.
for (const txt of ['llms.txt', 'sitemap-0.xml']) {
  const f = join(dist, txt);
  if (!existsSync(f)) { failures.push(`${txt} missing`); continue; }
  const urls = [...readFileSync(f, 'utf8').matchAll(/https:\/\/johnny\.knoblauch\.fr(\/[^\s)"<]*)/g)].map((m) => m[1]);
  for (const u of new Set(urls)) if (!exists(u)) failures.push(`${txt}: cites missing ${u}`);
}
server.close();

if (failures.length) {
  console.error(`\n✗ ${failures.length} problem(s) on ${pages.length} page(s):\n`);
  for (const f of failures) console.error('  - ' + f);
  process.exit(1);
}
console.log(`✓ ${pages.length} pages checked at two widths: no console error, one h1 each, canonical, alt, no overflow, hreflang pairs, JSON-LD, links, theme toggle, llms.txt and sitemap; ${textFiles.length} text files free of forbidden terms.`);
