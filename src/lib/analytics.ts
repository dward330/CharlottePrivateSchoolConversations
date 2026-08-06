// Report this app's HASH navigations to Cloudflare Web Analytics as distinct
// page-views — on the free tier, and WITHOUT breaking the browser Back button.
//
// WHY THIS IS NON-TRIVIAL. The Cloudflare beacon (index.html, `"spa": true`)
// records a page-view on History API navigations and reports the URL PATH
// (`new URL(u).pathname`), never the #hash. This app is a hash router
// (src/lib/router.ts): every "page" (a school, the compare view) shares the one
// real path (`/CharlottePrivateSchoolConversations/`) and differs only in the
// hash, so by default every visit logs as one view of that single path and the
// per-page breakdown is lost. The free beacon exposes no custom-event API to
// name pages directly (that is a paid RUM feature), and it can only be triggered
// by `history.pushState` — which ADDS a history entry.
//
// If we simply reacted to `hashchange` (after the browser already pushed its own
// hash entry) with our own pushState, each navigation would add TWO entries and
// the Back button would need two presses per step. Proven, not assumed.
//
// THE FIX. Route ALL in-app navigation through `pushRoute()` here instead of
// letting the browser create the hash entry:
//   1. pushState to a SYNTHETIC path that encodes the page (`…/school/cannon`),
//      passed as a RELATIVE path — the beacon reads it synchronously and logs
//      the page-view. (Absolute URLs hit a normaliser bug in beacon.min.js that
//      buckets every hit under `/`; see the long note in pushRoute below.)
//   2. replaceState back to the clean canonical hash URL (`…/#/school/cannon`),
//      editing that same entry — so exactly ONE history entry is added and the
//      address bar stays tidy.
//   3. dispatch `popstate` so the hash router (which no longer gets a native
//      `hashchange`, because pushState doesn't fire one) re-renders.
// The synthetic path is never navigated to or fetched — it exists only for the
// instant the beacon reads it — so it needs no server route and cannot 404.
//
// Browser Back/Forward and manual URL edits still fire native `hashchange`/
// `popstate`; those are NOT re-pushed here (that is correct — Back should not
// mint new page-views), and the router handles them as before.
//
// Everything is best-effort and guarded: analytics/history calls are wrapped so
// they can never break navigation.

/** True once Cloudflare's beacon has initialised (it sets window.__cfBeacon). */
function beaconReady(): boolean {
  return typeof window !== 'undefined' && '__cfBeacon' in window
}

/**
 * Map a hash route (`#/school/cannon`, `#/compare?…`, `#/`) to the synthetic
 * PATH the beacon should log. These strings are what you read in the Cloudflare
 * dashboard, so they name pages the way a human scans them. Query params are
 * dropped so compare aggregates rather than exploding into a row per selection.
 */
export function pathForHash(hash: string): string {
  const base = import.meta.env.BASE_URL // e.g. "/CharlottePrivateSchoolConversations/"
  const clean = hash.replace(/^#\/?/, '')
  const segs = clean.split('?')[0].split('/').filter(Boolean)
  if (segs[0] === 'school' && segs[1]) return base + 'school/' + encodeURIComponent(segs[1])
  if (segs[0] === 'compare') return base + 'compare'
  return base // home
}

/**
 * Navigate to an in-app hash route, adding exactly one history entry and logging
 * a Cloudflare page-view for the destination page. `hash` may be given with or
 * without the leading '#'. Falls back to a plain hash assignment if the History
 * API is unavailable, so navigation always works even if analytics cannot.
 */
export function pushRoute(hash: string): void {
  const canonicalHash = hash.startsWith('#') ? hash : '#' + hash
  if (typeof window === 'undefined' || !window.history?.pushState) {
    window.location.hash = canonicalHash.slice(1)
    return
  }
  const origin = window.location.origin
  const canonicalUrl = origin + window.location.pathname + window.location.search + canonicalHash
  try {
    if (beaconReady()) {
      // (1) Beacon reads this path synchronously and logs the page-view.
      //
      // PASS A RELATIVE PATH, NOT AN ABSOLUTE URL — this is load-bearing, and
      // getting it wrong silently sends every page-view to the wrong bucket.
      // The beacon normalises the pushState URL with, effectively:
      //
      //   if (u.indexOf('/') === 0) out = origin + u            // relative: fine
      //   else { const x = new URL(u)
      //          return `${x.protocol}://${x.host}${x.pathname}` }   // absolute
      //
      // `URL.protocol` already ends in ':', so the absolute branch emits
      // `https:://host/path` — a malformed URL Cloudflare's ingestion cannot
      // parse a path out of, so it files the hit under `/`. That is a bug in
      // beacon.min.js, not here, but the relative branch sidesteps it entirely.
      // Verified against the live beacon: absolute -> "https:://…", relative ->
      // "https://…". Re-check if Cloudflare ever fixes their normaliser.
      window.history.pushState(null, '', pathForHash(canonicalHash))
      // (2) Restore the clean canonical hash URL in the same entry.
      window.history.replaceState(null, '', canonicalUrl)
    } else {
      // Beacon blocked/not loaded: still navigate with a single clean entry.
      window.history.pushState(null, '', canonicalUrl)
    }
  } catch {
    // Exotic sandbox: fall back to the plain hash assignment.
    window.location.hash = canonicalHash.slice(1)
    return
  }
  // (3) pushState doesn't fire hashchange; nudge the router to re-read the hash.
  window.dispatchEvent(new PopStateEvent('popstate'))
}

let started = false

/**
 * Wire a single delegated click handler so direct <a href="#/…"> clicks (the
 * ones not already going through useNavigate) also route through pushRoute, and
 * thus also get counted and keep the Back button correct. Respects new-tab
 * intent (modifier keys, middle-click, target=_blank) and ignores non-hash /
 * external links. Idempotent; safe no-op on the server.
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
    const href = anchor.getAttribute('href')
    // Only in-app hash routes (#/…). External links, mailto:, source citations
    // (which use target=_blank anyway) all fall through to normal handling.
    if (!href || !href.startsWith('#/')) return
    e.preventDefault()
    pushRoute(href)
    window.scrollTo({ top: 0 })
  })
}
