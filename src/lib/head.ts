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
const OG_IMAGE = `${SITE_ORIGIN}/logo.png`

/** Human list of the research areas, for descriptions: "a, b, c and d". */
function topicList(): string {
  const names = topics.map((t) => t.name.toLowerCase())
  if (names.length < 2) return names[0] ?? 'school research'
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`
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
    const description =
      `Independent research on ${school.name} in the Charlotte area: ` +
      `${topicList()} — with every figure cited to its source.`
    const logo = BRANDS[school.slug]?.logo
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
        // Only fields the repo can populate truthfully. There is no structured
        // address, geo, phone or founding data in src/data/ — do NOT invent any
        // to fill out the schema (see "Out of scope" in .claude/plans/seo.md).
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
      description:
        `Side-by-side comparison of Charlotte-area private schools across ` +
        `${topicList()}, with each figure traceable to its source.`,
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

  document.title = meta.title
  setMeta('name', 'description', meta.description)
  setLink('canonical', canonical)

  setMeta('property', 'og:title', meta.title)
  setMeta('property', 'og:description', meta.description)
  setMeta('property', 'og:url', canonical)
  setMeta('property', 'og:image', OG_IMAGE)
  setMeta('property', 'og:type', 'website')
  setMeta('property', 'og:site_name', SITE_NAME)

  setMeta('name', 'twitter:card', 'summary_large_image')
  setMeta('name', 'twitter:title', meta.title)
  setMeta('name', 'twitter:description', meta.description)
  setMeta('name', 'twitter:image', OG_IMAGE)

  setJsonLd(meta.jsonLd)
}
