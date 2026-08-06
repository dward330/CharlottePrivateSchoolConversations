// In-app navigation + Cloudflare Web Analytics page-views, on the free tier and
// WITHOUT breaking the browser Back button.
//
// The app now uses real PATH URLs (src/lib/router.ts), each one a pre-rendered
// file in dist/. That is a much better fit for the Cloudflare beacon
// (index.html, `"spa": true`), which records a page-view on History API
// navigations and reports `new URL(u).pathname` — never the #hash. Under the
// old hash router every "page" shared one real path, so every visit logged as a
// single view and the per-page breakdown was lost; this module existed to push
// a SYNTHETIC path purely so the beacon had something to read, then replaceState
// back to the hash URL.
//
// With path routing that trick is gone: the URL we push IS the page. What
// remains here is (a) one pushState per navigation, so the beacon fires and the
// Back button takes exactly one press per step, (b) a dispatched `popstate` so
// the router re-reads (pushState does not fire one), and (c) a delegated click
// handler so plain <a href="/school/…"> links navigate in-app instead of making
// the browser refetch the page.
//
// NOTE: this module is deliberately kept rather than deleted along with the
// hash router. PR #104 fixed a live beacon bug here days ago, and retiring the
// workaround in the same change that alters routing would make any regression
// impossible to attribute. It retires in a follow-up, once the Cloudflare
// dashboard confirms path analytics are landing.
//
// Browser Back/Forward and manual URL edits still fire native `popstate`; those
// are NOT re-pushed here (correct — Back should not mint new page-views).
//
// Everything is best-effort and guarded: analytics/history calls are wrapped so
// they can never break navigation.

// (There is deliberately no beacon-readiness check any more. Under the old hash
// router we branched on `'__cfBeacon' in window`, because the synthetic path was
// pushed ONLY for the beacon's benefit and had to be reverted immediately after.
// The URL pushed now is the page's real, canonical address, so it is correct
// whether or not the beacon ever loads — one code path, nothing to detect.)

/**
 * Normalise an in-app destination to a RELATIVE path — no origin, leading '/'.
 *
 * PASSING A RELATIVE PATH TO pushState IS LOAD-BEARING, and getting it wrong
 * silently sends every page-view to the wrong bucket. The beacon normalises the
 * pushState URL with, effectively:
 *
 *   if (u.indexOf('/') === 0) out = origin + u            // relative: fine
 *   else { const x = new URL(u)
 *          return `${x.protocol}://${x.host}${x.pathname}` }   // absolute
 *
 * `URL.protocol` already ends in ':', so the absolute branch emits
 * `https:://host/path` — a malformed URL Cloudflare's ingestion cannot parse a
 * path out of, so it files the hit under `/`. That is a bug in beacon.min.js,
 * not here, but the relative branch sidesteps it entirely. Verified against the
 * live beacon: absolute -> "https:://…", relative -> "https://…". Re-check if
 * Cloudflare ever fixes their normaliser. See PR #104.
 */
export function relativePath(href: string): string {
  // A legacy hash form ('#/school/cannon') can still reach here from an old
  // link in the wild; map it onto the equivalent path.
  if (href.startsWith('#')) return pathForHash(href)
  if (href.startsWith('/')) return href
  return import.meta.env.BASE_URL + href.replace(/^\.?\//, '')
}

/**
 * Map a legacy hash route (`#/school/cannon`, `#/compare?…`, `#/`) to its
 * canonical PATH form. Used by the load-time redirect in src/main.tsx and by
 * `relativePath()` above, so a shared hash link resolves to the same URL an
 * in-app click produces. The compare query string is preserved.
 */
export function pathForHash(hash: string): string {
  const base = import.meta.env.BASE_URL
  const clean = hash.replace(/^#\/?/, '')
  const [path, queryStr] = clean.split('?')
  const segs = path.split('/').filter(Boolean)
  const query = queryStr ? `?${queryStr}` : ''
  if (segs[0] === 'school' && segs[1]) {
    return `${base}school/${encodeURIComponent(decodeURIComponent(segs[1]))}/${query}`
  }
  if (segs[0] === 'compare') return `${base}compare/${query}`
  return base + query
}

/**
 * Query params that belong to the PAGE rather than the route, and so must
 * survive navigation between routes. Currently just `?lang=`.
 *
 * This mattered less under the hash router: the locale lived in the real query
 * string, BEFORE the '#', while the route lived after it, so navigating could
 * not touch it. With path routing they share one query string — `toCompare()`
 * builds `?topic=…&schools=…` from scratch — so without this a Spanish reader
 * clicking "Comparar" would land on a URL with no `?lang=es`. The page still
 * renders Spanish (the choice is also in localStorage), but the URL is no
 * longer shareable as Spanish, and a shared link is honoured exactly as sent —
 * which is the whole contract `?lang=` exists to provide.
 *
 * Keep this in step with LANG_PARAM in src/lib/i18n.ts.
 */
const STICKY_PARAMS = ['lang']

/**
 * Carry the sticky params from the current URL onto a destination path, without
 * overriding any the destination sets for itself.
 */
export function carryOverParams(path: string): string {
  if (typeof window === 'undefined') return path
  const [base, queryStr] = path.split('?')
  const target = new URLSearchParams(queryStr ?? '')
  const current = new URLSearchParams(window.location.search)
  for (const key of STICKY_PARAMS) {
    const value = current.get(key)
    if (value !== null && !target.has(key)) target.set(key, value)
  }
  const q = target.toString()
  return q ? `${base}?${q}` : base
}

/**
 * Navigate to an in-app route, adding exactly one history entry and logging a
 * Cloudflare page-view for the destination. `href` may be a path ('/school/…')
 * or a legacy hash ('#/school/…'). Falls back to a plain location assignment if
 * the History API is unavailable, so navigation always works even if analytics
 * cannot.
 */
export function pushRoute(href: string): void {
  const path = carryOverParams(relativePath(href))
  if (typeof window === 'undefined' || !window.history?.pushState) {
    window.location.assign(path)
    return
  }
  try {
    // Relative, for the beacon-normaliser reason documented above. The beacon
    // reads it synchronously and logs the page-view; the URL is also the real,
    // canonical, pre-rendered address of the page, so nothing needs restoring.
    window.history.pushState(null, '', path)
  } catch {
    // Exotic sandbox: fall back to a plain assignment.
    window.location.assign(path)
    return
  }
  // pushState doesn't fire popstate; nudge the router to re-read the location.
  window.dispatchEvent(new PopStateEvent('popstate'))
}

let started = false

/**
 * Wire a single delegated click handler so direct in-app <a> clicks (the ones
 * not already going through useNavigate) route through pushRoute — keeping the
 * SPA instant, counted, and the Back button correct. Respects new-tab intent
 * (modifier keys, middle-click, target=_blank) and ignores external links.
 * Idempotent; safe no-op on the server.
 */
export function initAnalytics(): void {
  if (started || typeof document === 'undefined') return
  started = true

  document.addEventListener('click', (e) => {
    // Let the browser handle open-in-new-tab / non-primary clicks untouched.
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return
    }
    const anchor = (e.target as Element | null)?.closest?.('a')
    if (!anchor) return
    if (anchor.target && anchor.target !== '_self') return
    if (anchor.hasAttribute('download')) return
    const href = anchor.getAttribute('href')
    if (!href) return
    // In-app path routes ('/school/…') and legacy hash routes ('#/…'). External
    // links, mailto:, and source citations (target=_blank anyway) fall through
    // to normal browser handling. Protocol-relative '//host' is external.
    const isPath = href.startsWith('/') && !href.startsWith('//')
    const isHash = href.startsWith('#/')
    if (!isPath && !isHash) return
    e.preventDefault()
    pushRoute(href)
    window.scrollTo({ top: 0 })
  })
}
