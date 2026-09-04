// Per-route <head> metadata: title, description, canonical, Open Graph, Twitter
// Card, and JSON-LD structured data.
//
// This is the ONLY place in src/ that writes head metadata at runtime. That
// matters because scripts/prerender.mjs captures `document.documentElement
// .outerHTML` after the app has mounted, so whatever this module sets becomes
// the STATIC head of the pre-rendered file a crawler downloads. index.html
// holds the site-wide defaults; this overrides them per route.
//
// Titles and descriptions here are <head> metadata, not rendered UI chrome, so
// they deliberately do NOT go through src/locales/*.json — see the two-layer
// i18n note in CLAUDE.md. The pre-rendered pages are English-only by decision
// (.claude/plans/seo.md); the nine other locales keep working via ?lang= and
// client rendering, and are unaffected by anything in this file.

import type { Route } from './router.ts'
import { schoolBySlug, topics } from './manifest.ts'
import { BRANDS } from '../data/brands.ts'
import { TRANSLATED } from './i18n.ts'

/**
 * The public origin. Social scrapers and search engines require ABSOLUTE URLs
 * in og:image / og:url / canonical — a relative path is silently ignored by
 * most of them, which is the whole failure mode this constant exists to avoid.
 * Matches public/CNAME.
 */
export const SITE_ORIGIN = 'https://charlotteschoolinsights.com'

const SITE_NAME = 'Charlotte School Insights'
const DEFAULT_TITLE = SITE_NAME
const DEFAULT_DESCRIPTION =
  'Compare Charlotte-area private schools across sports, the arts, student clubs, and college support.'
/**
 * Per-route social card, generated at build time by scripts/gen_og_images.mjs
 * into dist/og/<name>.png at 1200×630.
 *
 * These pages declare `twitter:card = summary_large_image`, which expects a
 * ~1200×630 landscape image. The old value here was the 256×256 site logo for
 * ALL 13 pages, so every Facebook, iMessage and Slack share rendered the same
 * cropped or letterboxed square — and Facebook is this site's #2 referrer.
 *
 * Returns an ABSOLUTE URL: social scrapers silently ignore a relative one,
 * which is the whole failure mode SITE_ORIGIN exists to avoid. check_seo.mjs
 * asserts both that these are absolute and that school pages DIFFER from each
 * other, so a regression back to one shared image fails the check.
 */
function ogImageFor(route: Route): string {
  if (route.name === 'school' && schoolBySlug(route.slug)) {
    return `${SITE_ORIGIN}/og/${encodeURIComponent(route.slug)}.png`
  }
  if (route.name === 'compare') return `${SITE_ORIGIN}/og/compare.png`
  return `${SITE_ORIGIN}/og/home.png`
}

/**
 * Search engines truncate a meta description at roughly 160 characters, so the
 * useful part has to come FIRST and the whole thing has to fit. Listing all
 * seven topic names costs ~110 characters on its own and pushed every school
 * page to 210+ — the tail, including "cited to its source", was being cut off
 * in results. So descriptions name a few concrete topics rather than the full
 * set, and the count carries the rest.
 *
 * `max` is a budget, not a hard truncation: we compose to fit instead of
 * chopping mid-word. `describe()` asserts the budget in development.
 */
const DESC_MAX = 160

/**
 * Research areas, lowercased. With `n` omitted this is the full list, joined
 * with "and" ("sports, the arts and student clubs"). With `n` given it is a
 * comma-only sample meant to be followed by "and more", so the conjunction is
 * left off — "a, b, c and more" rather than "a, b and c and more".
 */
function topicList(n?: number): string {
  const names = topics.slice(0, n ?? topics.length).map((t) => t.name.toLowerCase())
  if (names.length < 2) return names[0] ?? 'school research'
  if (n !== undefined) return names.join(', ')
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`
}

/**
 * Guard against a description silently growing past what search engines show.
 * Dev-only: a warning in the console during development is enough, since
 * check:seo enforces the same budget against the built output.
 */
function describe(text: string): string {
  if (import.meta.env.DEV && text.length > DESC_MAX) {
    console.warn(`[head] meta description is ${text.length} chars (max ${DESC_MAX}): ${text}`)
  }
  return text
}

type PageMeta = {
  title: string
  description: string
  /** Root-relative canonical path, e.g. '/school/cannon/'. */
  path: string
  /** JSON-LD object, or null for routes that get none. */
  jsonLd: Record<string, unknown> | null
}

/**
 * Everything the head needs for a route, as plain data. Exported so
 * scripts/check_seo.mjs's expectations and the pre-render route list can be
 * reasoned about against one source, and so this is unit-testable without a DOM.
 */
export function metaForRoute(route: Route): PageMeta {
  if (route.name === 'school') {
    const school = schoolBySlug(route.slug)
    // An unknown slug still renders (the page shows its own not-found state), so
    // don't fabricate a name for it — fall back to the site defaults.
    if (!school) {
      return { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, path: '/', jsonLd: null }
    }
    const path = `/school/${encodeURIComponent(school.slug)}/`
    // Leads with the school name and what the page IS, because that is what
    // survives truncation. Three topics plus a count beats naming all seven.
    const description = describe(
      `${school.name}: independent research across ${topics.length} areas — ` +
        `${topicList(3)} and more. Every figure cited to its source.`,
    )
    const logo = BRANDS[school.slug]?.logo
    const city = BRANDS[school.slug]?.city
    return {
      title: `${school.name} — ${SITE_NAME}`,
      description,
      path,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        name: school.name,
        url: SITE_ORIGIN + path,
        description,
        // Only fields the repo can populate truthfully — still no geo, phone,
        // founding date or EIN, none of which exist in src/data/, and none of
        // which may be invented to fill out the schema (see "Out of scope" in
        // .claude/plans/seo.md). `city` is the exception that plan anticipated:
        // verified per-school data added in PR #180, traceable to
        // source-material/branding/_shared/. The state is a constant because
        // all eleven schools are in NC — the same call the dossier kicker made.
        //
        // The `city ?` guard is a LOOKUP guard, not an optional-field guard:
        // `city` is required on Brand, so it is only ever absent for a slug
        // missing from BRANDS entirely.
        ...(city
          ? {
              address: {
                '@type': 'PostalAddress',
                addressLocality: city,
                addressRegion: 'NC',
                addressCountry: 'US',
              },
            }
          : {}),
        ...(logo ? { logo: SITE_ORIGIN + logo } : {}),
      },
    }
  }

  if (route.name === 'compare') {
    // Compare's content lives in its query string — it renders exactly the
    // schools named in ?schools=, and none at all when that is absent. So the
    // canonical URL must CARRY the selection rather than point at a bare
    // /compare/ that renders an empty table. This mirrors the compare entry in
    // scripts/seo_routes.mjs, which is what pre-renders and lists that URL;
    // check:seo asserts the two agree.
    const params = new URLSearchParams()
    if (route.topic) params.set('topic', route.topic)
    if (route.schools.length) params.set('schools', route.schools.join(','))
    const q = params.toString()
    return {
      title: `Compare Charlotte private schools — ${SITE_NAME}`,
      description: describe(
        `Compare Charlotte-area private schools side by side: ` +
          `${topicList(3)} and more. Each figure traceable to its source.`,
      ),
      path: `/compare/${q ? `?${q}` : ''}`,
      jsonLd: null,
    }
  }

  return {
    title: `${SITE_NAME} — Charlotte-area private school research`,
    description: DEFAULT_DESCRIPTION,
    path: '/',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_ORIGIN + '/',
      description: DEFAULT_DESCRIPTION,
    },
  }
}

/** Set (creating if absent) a <meta> tag keyed by `name` or `property`. */
function setMeta(attr: 'name' | 'property', key: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/**
 * The per-locale URLs for one route's canonical path, as [hreflang, href].
 *
 * MUST agree byte-for-byte with `urlFor(route, lang)` in scripts/seo_routes.mjs,
 * which builds the sitemap's alternates. The head and the sitemap naming
 * different URLs for the same page is a contradiction search engines resolve by
 * ignoring BOTH annotations — so check_seo.mjs asserts equality against that
 * function rather than trusting this comment.
 *
 * The logic is duplicated rather than shared because seo_routes.mjs is a build
 * script under scripts/ and this is app code under src/; importing across that
 * boundary drags the manifest-reading script into the browser bundle. The
 * duplication is small, and the check makes the drift loud.
 *
 * Two details that are easy to get wrong, both mirroring seo_routes.mjs:
 *   - English is the DEFAULT and clears ?lang= (see syncUrl() in i18n.ts), so
 *     the English alternate is the BARE canonical URL, not `?lang=en`.
 *   - A path that already carries a query — Compare — joins with '&', not a
 *     second '?'. That is exactly where a hand-rolled version diverges.
 *
 * The set is SELF-REFERENTIAL: English lists itself, which Google requires.
 * `x-default` points at the bare English URL.
 */
export function alternateUrls(path: string): Array<[string, string]> {
  const base = SITE_ORIGIN + path
  const join = path.includes('?') ? '&' : '?'
  const out: Array<[string, string]> = TRANSLATED.map((lang) => [
    lang,
    lang === 'en' ? base : `${base}${join}lang=${lang}`,
  ])
  out.push(['x-default', base])
  return out
}

/**
 * Replace the whole <link rel="alternate" hreflang> set for a route.
 *
 * Removes every existing node before appending, rather than updating in place:
 * an in-app navigation must not leave a previous page's alternates behind, and
 * setLink() cannot help here because it keys on `rel` alone (it manages the
 * canonical) and so can only ever hold ONE link per rel value.
 */
function setAlternates(path: string): void {
  for (const el of document.head.querySelectorAll('link[rel="alternate"][hreflang]')) {
    el.remove()
  }
  for (const [lang, href] of alternateUrls(path)) {
    const el = document.createElement('link')
    el.setAttribute('rel', 'alternate')
    el.setAttribute('hreflang', lang)
    el.setAttribute('href', href)
    document.head.appendChild(el)
  }
}

/** Set (creating if absent) a <link rel="…"> tag. */
function setLink(rel: string, href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/** JSON-LD lives in one managed <script>, replaced wholesale per route. */
const LD_ID = 'ld-json-route'

function setJsonLd(data: Record<string, unknown> | null): void {
  const existing = document.getElementById(LD_ID)
  if (!data) {
    existing?.remove()
    return
  }
  const el = existing ?? document.createElement('script')
  el.id = LD_ID
  el.setAttribute('type', 'application/ld+json')
  el.textContent = JSON.stringify(data, null, 2)
  if (!existing) document.head.appendChild(el)
}

/**
 * Apply a route's metadata to the live document. Called from App.tsx in an
 * effect keyed on the route, so it re-runs on every in-app navigation — and,
 * critically, has run by the time the pre-render script snapshots the DOM.
 */
export function setPageMeta(route: Route): void {
  if (typeof document === 'undefined') return
  const meta = metaForRoute(route)
  const canonical = SITE_ORIGIN + meta.path

  const ogImage = ogImageFor(route)

  document.title = meta.title
  setMeta('name', 'description', meta.description)
  setLink('canonical', canonical)
  setAlternates(meta.path)

  setMeta('property', 'og:title', meta.title)
  setMeta('property', 'og:description', meta.description)
  setMeta('property', 'og:url', canonical)
  setMeta('property', 'og:image', ogImage)
  setMeta('property', 'og:image:width', '1200')
  setMeta('property', 'og:image:height', '630')
  setMeta('property', 'og:type', 'website')
  setMeta('property', 'og:site_name', SITE_NAME)

  setMeta('name', 'twitter:card', 'summary_large_image')
  setMeta('name', 'twitter:title', meta.title)
  setMeta('name', 'twitter:description', meta.description)
  // Kept in step with og:image deliberately — a page whose two image tags
  // disagree gets a different card on Twitter/X than everywhere else.
  setMeta('name', 'twitter:image', ogImage)

  setJsonLd(meta.jsonLd)
}
