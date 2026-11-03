// THE switch for the English version. Change this one line and rebuild.
//   false: French only. No /en/ page, language switch, hreflang, English sitemap entry or feed, no English
//          in llms.txt, no en-*.png share image in dist. All English sources stay in the repository:
//          src/reserve/en/ (routes), src/content/*/en/ (texts), public/og/en-*.png (share images).
//   true:  the whole English version is built and exposed again, nothing else to change.
export const ENGLISH_ENABLED = false;
