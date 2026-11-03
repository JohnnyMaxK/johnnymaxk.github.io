// Renders the OpenGraph images with the bundled Chromium (system fonts only):
//   public/og-default.png            from tools/og/og.html (the site)
//   public/og/<lang>-<name>.png      from tools/og/og-note.html, one per note or article in src/content/idees/
// Run: npm run og   (needs Playwright: npm i --no-save playwright && npx playwright install chromium)
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import { readdirSync, readFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
const here = fileURLToPath(new URL('.', import.meta.url));
const root = join(here, '..', '..');
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });

await page.goto('file://' + join(here, 'og.html'), { waitUntil: 'load' });
await page.screenshot({ path: join(root, 'public', 'og-default.png'), type: 'png' });
console.log('public/og-default.png');

mkdirSync(join(root, 'public', 'og'), { recursive: true });
const front = (md) => Object.fromEntries([...md.split('\n---')[0].matchAll(/^(\w+):\s*"?(.*?)"?\s*$/gm)].map((m) => [m[1], m[2]]));
await page.goto('file://' + join(here, 'og-note.html'), { waitUntil: 'load' });
for (const lang of readdirSync(join(root, 'src', 'content', 'idees'))) {
  for (const file of readdirSync(join(root, 'src', 'content', 'idees', lang)).filter((f) => f.endsWith('.md'))) {
    const fm = front(readFileSync(join(root, 'src', 'content', 'idees', lang, file), 'utf8'));
    if (fm.draft === 'true') continue;
    await page.evaluate(({ tag, title }) => { document.getElementById('tag').textContent = tag; document.getElementById('title').textContent = title; }, { tag: fm.tag ?? '', title: fm.title ?? '' });
    const out = join(root, 'public', 'og', `${lang}-${file.replace(/\.md$/, '')}.png`);
    await page.screenshot({ path: out, type: 'png' });
    console.log(out.slice(root.length + 1));
  }
}
await browser.close();
