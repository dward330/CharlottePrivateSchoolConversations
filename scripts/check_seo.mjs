#!/usr/bin/env node
/**
 * Assert the SEO surface in dist/ after a build.
 *
 * The failure this guards against is silent by construction: a route added
 * later without a pre-rendered page 404s on GitHub Pages for anyone who
 * deep-links it, while the SPA keeps working perfectly for everyone who clicks
 * in from the home page. Nobody notices until the traffic doesn't arrive.
 * Likewise a sitemap listing a URL that isn't on disk, or six pages that all
 * inherited index.html's default <title> because the head effect never ran —
 * each of those looks completely healthy from inside the app.
 *
 * Checks, all against real files in dist/:
 *   1. every expected route has an index.html, and it is bigger than a shell
 *   2. every page has a UNIQUE, non-default <title> and a <meta description>
 *   3. every page has og:title / og:description / og:image and a canonical
 *   4. og:image and canonical are ABSOLUTE (scrapers ignore relative URLs)
 *   5. school pages carry EducationalOrganization JSON-LD, whose PostalAddress
 *      names that school's real city from BRANDS
 *   6. sitemap.xml lists exactly the routes that exist on disk — no more, no less
 *   7. sitemap hreflang alternates cover every locale in TRANSLATED
 *   8. robots.txt exists and names the sitemap
 *
 * Usage: node scripts/check_seo.mjs [--quiet]
 * Exit codes: 0 = clean, 1 = problems found, 2 = script/setup error.
 */
import { readFileSync, existsSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { ROUTES, LOCALES, SITE_ORIGIN, REPO_ROOT, urlFor } from './seo_routes.mjs'
// brands.ts is a plain module with no import.meta.glob (unlike the six
// *Program.ts registries), so it imports cleanly under plain Node — verified,
// not assumed. It is the same source src/lib/head.ts reads the city from, so
// the check compares the page against the data rather than a transcribed copy.
import { BRANDS } from '../src/data/brands.ts'

const QUIET = process.argv.includes('--quiet')
const DIST = resolve(REPO_ROOT, 'dist')

/** Same floor as scripts/prerender.mjs — an unrendered shell is ~2 KB. */
const MIN_BYTES = 20_000
/** The bare site title from index.html; a page still wearing it wasn't set. */
const DEFAULT_TITLE = 'Charlotte School Insights'

const problems = []
const notes = []
const fail = (msg) => problems.push(msg)

/** Unescape the entities an HTML serializer emits inside attribute values. */
function unescapeHtml(s) {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
}

/**
 * Pull a captured group out of `html`, unescaped. Attribute values are escaped
 * on serialization — compare's canonical URL contains '&' and comes back as
 * '&amp;' — so a raw string compare against a real URL always fails.
 */
function attr(html, re) {
  const raw = html.match(re)?.[1]?.trim()
  return raw === undefined ? undefined : unescapeHtml(raw)
}

/**
 * Parse the EducationalOrganization JSON-LD out of a pre-rendered page.
 *
 * Returns undefined when there is no such block or it does not parse — both of
 * which the caller reports, because a block that a crawler cannot parse is no
 * better than one that is absent.
 */
function jsonLdFor(html) {
  for (const m of html.matchAll(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    // NOT unescapeHtml'd: <script> is a raw-text element, so its contents come
    // back verbatim rather than entity-escaped (verified against dist/). Running
    // the attribute unescaper over it would corrupt a genuine "&amp;" inside a
    // description into "&".
    let parsed
    try {
      parsed = JSON.parse(m[1])
    } catch {
      continue
    }
    if (parsed?.['@type'] === 'EducationalOrganization') return parsed
  }
  return undefined
}

if (!existsSync(DIST)) {
  console.error('check:seo: dist/ not found — run `npm run build` first.')
  process.exit(2)
}

// --- 1-5. Per-page checks -------------------------------------------------
const titles = new Map()

for (const route of ROUTES) {
  const file = join(DIST, route.path, 'index.html')
  if (!existsSync(file)) {
    fail(`${route.path} — no pre-rendered index.html (deep links to it will 404)`)
    continue
  }
  const html = readFileSync(file, 'utf8')
  const bytes = Buffer.byteLength(html, 'utf8')
  if (bytes < MIN_BYTES) {
    fail(`${route.path} — only ${bytes} B (expected > ${MIN_BYTES}); prose likely missing`)
  }

  const title = attr(html, /<title>([\s\S]*?)<\/title>/i)
  if (!title) fail(`${route.path} — no <title>`)
  else if (title === DEFAULT_TITLE) {
    fail(`${route.path} — <title> is still the site default; setPageMeta() didn't run`)
  } else if (titles.has(title)) {
    fail(`${route.path} — <title> duplicates ${titles.get(title)}: "${title}"`)
  } else titles.set(title, route.path)

  const desc = attr(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)
  if (!desc) fail(`${route.path} — no <meta name="description">`)
  // Search engines truncate around these lengths, so anything longer is written
  // but never read. Caught here rather than by eye: descriptions are composed
  // from school and topic names, so adding a topic silently lengthens all of
  // them at once (that is exactly how they reached 210+ chars).
  else if (desc.length > 160) {
    fail(`${route.path} — description is ${desc.length} chars (truncated at ~160)`)
  } else if (desc.length < 70) {
    fail(`${route.path} — description is only ${desc.length} chars (too thin to be useful)`)
  }
  // NOTE: deliberately NOT asserting <title> length. Home (66) and Compare (61)
  // sit just over the ~60 chars Google shows, and the titles were kept as-is by
  // choice: <title> is the browser TAB text, so trimming it is a user-visible
  // change, while overflow only affects how the title appears in a search
  // result — not ranking. Uniqueness and non-defaultness are checked above,
  // which are the parts that actually matter.

  for (const prop of ['og:title', 'og:description', 'og:image']) {
    const re = new RegExp(`<meta[^>]+property=["']${prop}["'][^>]+content=["']([^"']*)["']`, 'i')
    const val = attr(html, re)
    if (!val) fail(`${route.path} — missing ${prop}`)
    else if (prop === 'og:image' && !val.startsWith('http')) {
      fail(`${route.path} — og:image is relative ("${val}"); social scrapers ignore those`)
    }
  }

  const canonical = attr(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i)
  if (!canonical) fail(`${route.path} — no <link rel="canonical">`)
  else if (!canonical.startsWith('http')) {
    fail(`${route.path} — canonical is relative ("${canonical}")`)
  } else if (canonical !== urlFor(route)) {
    // A mismatch here means src/lib/head.ts and scripts/seo_routes.mjs disagree
    // about a route's canonical URL — which would have the sitemap advertising
    // one URL while the page it points at names a different one as canonical,
    // a contradiction search engines resolve by ignoring both.
    fail(`${route.path} — canonical is "${canonical}", expected "${urlFor(route)}"`)
  }

  if (route.school) {
    if (!/"@type":\s*"EducationalOrganization"/.test(html)) {
      fail(`${route.path} — no EducationalOrganization JSON-LD`)
    }
    // Five of the eleven schools are not in Charlotte, so the locality is the
    // one part of this address that can be WRONG rather than merely missing —
    // and a wrong city is invisible to an existence check. Parse the block and
    // compare it against BRANDS, the same source head.ts emits it from.
    const expected = BRANDS[route.school.slug]?.city
    if (!expected) {
      fail(`${route.path} — no city in BRANDS for "${route.school.slug}"`)
    } else {
      const ld = jsonLdFor(html)
      if (!ld) {
        fail(`${route.path} — EducationalOrganization JSON-LD did not parse as JSON`)
      } else if (!ld.address) {
        fail(`${route.path} — JSON-LD has no address (expected a PostalAddress in ${expected})`)
      } else if (ld.address['@type'] !== 'PostalAddress') {
        fail(`${route.path} — JSON-LD address is "${ld.address['@type']}", expected "PostalAddress"`)
      } else if (ld.address.addressLocality !== expected) {
        fail(
          `${route.path} — JSON-LD addressLocality is "${ld.address.addressLocality}", ` +
            `expected "${expected}"`,
        )
      }
    }
    // The page should actually name its school somewhere in the served HTML —
    // this is the no-JS test in miniature: content present before any script runs.
    if (!html.includes(route.school.name.split(' ')[0])) {
      fail(`${route.path} — "${route.school.name}" absent from the pre-rendered HTML`)
    }
  }
}

// --- 6-7. sitemap.xml -----------------------------------------------------
const sitemapPath = join(DIST, 'sitemap.xml')
if (!existsSync(sitemapPath)) {
  fail('sitemap.xml — missing from dist/')
} else {
  const xml = readFileSync(sitemapPath, 'utf8')
  // <loc> values are XML-escaped on the way out (compare's URL contains '&'),
  // so unescape before comparing against the URLs urlFor() produces.
  const listed = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    unescapeHtml(m[1].replace(/&apos;/g, "'")),
  )
  const expected = ROUTES.map((r) => urlFor(r))

  for (const url of expected) {
    if (!listed.includes(url)) fail(`sitemap.xml — does not list ${url}`)
  }
  for (const url of listed) {
    if (!expected.includes(url)) fail(`sitemap.xml — lists ${url}, which is not a built route`)
  }

  for (const lang of LOCALES) {
    const count = (xml.match(new RegExp(`hreflang="${lang}"`, 'g')) ?? []).length
    if (count !== ROUTES.length) {
      fail(`sitemap.xml — hreflang="${lang}" on ${count} URLs, expected ${ROUTES.length}`)
    }
  }
  if (!xml.includes('hreflang="x-default"')) fail('sitemap.xml — no x-default alternate')

  // LOCALES is a literal mirror of TRANSLATED in src/lib/i18n.ts. If a locale
  // ships and this list isn't updated, the sitemap quietly under-advertises it.
  const i18n = readFileSync(resolve(REPO_ROOT, 'src/lib/i18n.ts'), 'utf8')
  const translated = i18n
    .match(/export const TRANSLATED[^=]*=\s*\[([^\]]*)\]/)?.[1]
    ?.match(/'([a-z-]+)'/g)
    ?.map((s) => s.replace(/'/g, ''))
  if (!translated) {
    notes.push('could not parse TRANSLATED from src/lib/i18n.ts — locale drift unchecked')
  } else {
    const missing = translated.filter((l) => !LOCALES.includes(l))
    const extra = LOCALES.filter((l) => !translated.includes(l))
    if (missing.length) fail(`seo_routes.mjs LOCALES is missing: ${missing.join(', ')}`)
    if (extra.length) fail(`seo_routes.mjs LOCALES lists untranslated: ${extra.join(', ')}`)
  }
}

// --- 8. robots.txt --------------------------------------------------------
const robotsPath = join(DIST, 'robots.txt')
if (!existsSync(robotsPath)) {
  fail('robots.txt — missing from dist/')
} else {
  const robots = readFileSync(robotsPath, 'utf8')
  if (!robots.includes(`Sitemap: ${SITE_ORIGIN}/sitemap.xml`)) {
    fail('robots.txt — does not declare the sitemap URL')
  }
  if (!/User-agent:\s*\*/.test(robots)) fail('robots.txt — no User-agent rule')
}

// --- Report ---------------------------------------------------------------
if (!QUIET && !problems.length) {
  console.log(`check:seo: ${ROUTES.length} pre-rendered pages, sitemap and robots.txt all OK`)
  for (const [title, path] of titles) console.log(`  ${path.padEnd(34)} ${title}`)
}
for (const n of notes) console.warn('  ! ' + n)
if (problems.length) {
  console.error(`check:seo: ${problems.length} problem(s):`)
  for (const p of problems) console.error('  ✗ ' + p)
  process.exit(1)
}
