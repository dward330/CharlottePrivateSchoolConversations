// Tiny dependency-free router. Real PATH URLs are canonical, because they are
// what search engines index — each one is a genuinely pre-rendered file in
// dist/ (scripts/prerender.mjs), served by GitHub Pages with HTTP 200:
//
//   /                       -> home
//   /school/<slug>/         -> single school
//   /compare/?topic=..&schools=a,b  -> comparison
//
// The old HASH forms are a PERMANENT compatibility layer, never removed. Links
// to `#/school/cannon` are already out in the world (Facebook is the #2
// referrer), so `parse()` still understands them and src/main.tsx rewrites them
// to the path form on load. Deleting the hash branch breaks shared links.

import { useSyncExternalStore, useCallback } from 'react'
import { pushRoute } from './analytics.ts'

export type Route =
  | { name: 'home' }
  | { name: 'school'; slug: string }
  | { name: 'admissions-checklist'; slug: string; band: string | null }
  | { name: 'compare'; topic: string | null; schools: string[] }

/**
 * Parse the route out of a path-like string — `/school/cannon/`,
 * `#/compare?topic=..`, `compare?topic=..`. Leading `#`, the Vite BASE_URL
 * prefix, and surrounding slashes are all tolerated so the same body serves
 * both the pathname and the hash.
 */
function parsePath(pathLike: string): Route {
  const base = import.meta.env.BASE_URL
  let clean = pathLike.replace(/^#/, '')
  if (base !== '/' && clean.startsWith(base)) clean = clean.slice(base.length)
  const [path, queryStr] = clean.split('?')
  const segs = path.split('/').filter(Boolean)
  const query = new URLSearchParams(queryStr ?? '')

  /* MUST come before the plain-school branch below: that branch matches on
     `segs[0] === 'school' && segs[1]` alone, so an unordered check would
     swallow `/school/<slug>/admissions-checklist/` and render the school page. */
  if (segs[0] === 'school' && segs[1] && segs[2] === 'admissions-checklist') {
    return {
      name: 'admissions-checklist',
      slug: decodeURIComponent(segs[1]),
      band: query.get('band'),
    }
  }
  if (segs[0] === 'school' && segs[1]) {
    return { name: 'school', slug: decodeURIComponent(segs[1]) }
  }
  if (segs[0] === 'compare') {
    return {
      name: 'compare',
      topic: query.get('topic'),
      schools: (query.get('schools') ?? '').split(',').map((s) => s.trim()).filter(Boolean),
    }
  }
  return { name: 'home' }
}

/**
 * Read the current route from the address bar. The PATHNAME wins; the hash is
 * consulted only when the pathname carries no route of its own, which is
 * exactly the legacy case (`https://host/#/school/cannon`). Note the query
 * string comes from the pathname branch's own `location.search` — `?lang=` and
 * the compare selection both live there.
 */
function parseLocation(): Route {
  const fromPath = parsePath(window.location.pathname + window.location.search)
  if (fromPath.name !== 'home') return fromPath
  // Pathname is the site root: fall back to a legacy hash route if present.
  if (window.location.hash.startsWith('#/')) return parsePath(window.location.hash)
  return fromPath
}

function subscribe(cb: () => void): () => void {
  // `popstate` covers in-app navigation via pushRoute() (src/lib/analytics.ts),
  // which uses history.pushState — that does NOT fire popstate by itself, so
  // pushRoute dispatches one — plus the browser Back/Forward buttons.
  // `hashchange` still covers manual edits to a legacy hash URL.
  window.addEventListener('hashchange', cb)
  window.addEventListener('popstate', cb)
  return () => {
    window.removeEventListener('hashchange', cb)
    window.removeEventListener('popstate', cb)
  }
}

/**
 * Snapshot for useSyncExternalStore. It must be a primitive (or a stable
 * reference): returning a fresh Route object each call would loop forever,
 * since React compares snapshots with Object.is. The URL string is that
 * primitive; the Route is derived from it afterwards.
 */
function locationSnapshot(): string {
  return window.location.pathname + window.location.search + window.location.hash
}

export function useRoute(): Route {
  const href = useSyncExternalStore(subscribe, locationSnapshot, () => '')
  // `href` is unused below — it exists to drive re-renders; parseLocation()
  // reads the same live location it was computed from.
  void href
  if (typeof window === 'undefined') return { name: 'home' }
  return parseLocation()
}

/** Imperative navigation helpers. All emit canonical PATH URLs. */
export function toHome(): string {
  return import.meta.env.BASE_URL
}
export function toSchool(slug: string): string {
  return `${import.meta.env.BASE_URL}school/${encodeURIComponent(slug)}/`
}
/**
 * The printable admissions checklist for one school and one entry band.
 *
 * The band travels in the query string rather than the path because the sheet
 * is a link a parent shares — and because an unknown band falls back to the
 * school's first one rather than 404ing.
 */
export function toAdmissionsChecklist(slug: string, band: string): string {
  return `${import.meta.env.BASE_URL}school/${encodeURIComponent(slug)}/admissions-checklist/?band=${encodeURIComponent(band)}`
}
export function toCompare(topic: string | null, schools: string[]): string {
  const params = new URLSearchParams()
  if (topic) params.set('topic', topic)
  if (schools.length) params.set('schools', schools.join(','))
  const q = params.toString()
  const path = `${import.meta.env.BASE_URL}compare/`
  return q ? `${path}?${q}` : path
}

export function useNavigate(): (href: string) => void {
  return useCallback((href: string) => {
    // pushRoute adds exactly one history entry and logs a Cloudflare page-view
    // for the destination (see src/lib/analytics.ts).
    pushRoute(href)
    // Bring the new view into view on navigation (esp. mobile).
    window.scrollTo({ top: 0 })
  }, [])
}
