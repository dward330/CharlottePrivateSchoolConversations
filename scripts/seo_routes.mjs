#!/usr/bin/env node
/**
 * The one list of routes that get a pre-rendered, indexable page — derived from
 * the generated manifest so it cannot go stale when a school is added.
 *
 * Three consumers share it deliberately: scripts/prerender.mjs (writes the
 * files), scripts/gen_seo_files.mjs (lists them in sitemap.xml), and
 * scripts/check_seo.mjs (asserts every one exists on disk). If they each
 * derived their own list, a school could be pre-rendered but missing from the
 * sitemap — or listed in the sitemap but 404 on the site — and nothing would
 * notice.
 *
 * ENGLISH ONLY, by decision (.claude/plans/seo.md). The other nine locales keep
 * working exactly as before, via ?lang= plus client rendering; they are
 * advertised on each page with hreflang rather than given their own URLs.
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
// The app's own topic ordering, imported rather than re-derived: the manifest's
// topic array is folder order, but the UI renders TOPIC_ORDER, so the "first"
// topic differs between the two. Importing keeps the pre-rendered compare page
// showing the same default selection a reader sees.
import { orderTopicSlugs } from '../src/lib/metrics.ts'

const here = dirname(fileURLToPath(import.meta.url))
export const REPO_ROOT = resolve(here, '..')

/** Public origin — matches public/CNAME and SITE_ORIGIN in src/lib/head.ts. */
export const SITE_ORIGIN = 'https://charlotteschoolinsights.com'

const manifest = JSON.parse(
  readFileSync(resolve(REPO_ROOT, 'src/data/schools.json'), 'utf8'),
)

/**
 * Every indexable route, as root-relative paths in trailing-slash directory
 * form — the form a static host serves natively as `<path>index.html` with a
 * 200, which is the entire point of pre-rendering (see the plan: the 404.html
 * SPA trick serves a real 404 status and Google won't index it).
 *
 * `changefreq`/`priority` are advisory hints only; search engines largely
 * ignore them, but they cost nothing and make the sitemap self-documenting.
 */
export const ROUTES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  {
    path: '/compare/',
    changefreq: 'weekly',
    priority: '0.9',
    // Compare renders the schools named in ?schools=, and a BARE /compare/ has
    // NONE — the table draws zero columns, so the page pre-renders as an 8 KB
    // shell of empty controls with nothing to index. (Compare.tsx has no
    // all-schools default, and giving it one is out of scope for this plan.)
    //
    // So the indexable compare URL carries the same selection the in-app
    // "Compare" nav link uses: every school, first topic. `query` is appended
    // to `path` for the visit, for the canonical link, AND for the sitemap —
    // all three agree deliberately. Pointing canonical at the bare /compare/
    // instead would advertise a URL that renders an empty table, and a reader
    // arriving there would watch the six-school table they saw in the search
    // result blank out the moment JavaScript booted.
    // Built with URLSearchParams, exactly as toCompare() in src/lib/router.ts
    // and metaForRoute() in src/lib/head.ts build it — so the comma separating
    // the slugs is percent-encoded (%2C) in all three. Hand-writing the query
    // with a literal comma here would produce a canonical URL that differs
    // from the one the page itself declares, which check:seo rejects.
    query:
      '?' +
      new URLSearchParams({
        topic: orderTopicSlugs(manifest.topics.map((t) => t.slug))[0],
        schools: manifest.schools.map((s) => s.slug).join(','),
      }).toString(),
  },
  ...manifest.schools.map((s) => ({
    path: `/school/${s.slug}/`,
    changefreq: 'monthly',
    priority: '0.8',
    school: s,
  })),
]

/**
 * Locales the app can render, for the sitemap's hreflang alternates. Mirrors
 * TRANSLATED in src/lib/i18n.ts. Kept as a literal rather than imported because
 * these scripts run on a plain Node parse of the repo, and check_seo.mjs
 * asserts the two lists still agree — so drift fails loudly instead of quietly
 * under-advertising a shipped language.
 */
export const LOCALES = ['en', 'es', 'bn', 'ht', 'te', 'fr', 'fa', 'it', 'hi', 'ar']

/**
 * Absolute canonical URL for a route, optionally pinned to a locale via ?lang=.
 * Takes the ROUTE (not a bare path) so a route carrying its own query — compare
 * — is canonicalised WITH it, and the ?lang= param is joined with '&' rather
 * than a second '?'.
 */
export function urlFor(route, lang) {
  const query = route.query ?? ''
  const base = SITE_ORIGIN + route.path + query
  // English is the default and clears the param (see syncUrl() in i18n.ts), so
  // the English URL is the bare one — and the canonical one.
  if (!lang || lang === 'en') return base
  return `${base}${query ? '&' : '?'}lang=${lang}`
}
