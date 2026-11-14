// The canonical link's hash, kept in step with the address bar at runtime.
// A module of its own, with no imports, because ./cardLink.ts uses it and
// cardLink.ts is imported under plain Node by scripts/check_card_link.mjs,
// where ./head.ts (and the schools.json it pulls in) cannot load.

/**
 * Keep the canonical link's `#…` in step with the address bar.
 *
 * The share sheet in iPhone Safari and Chrome (and Chrome on Android) shares
 * the page's <link rel="canonical"> rather than the address bar. A card link
 * (`#sports/the-college-pipeline`) shared that way lost its hash and landed on
 * the bare school page (user report, 2026-11-14). So at runtime the canonical
 * carries the current hash: set on load (setPageMeta in ./head.ts), after every
 * click that writes the URL (showLinkInUrl in ./cardLink.ts) and on a
 * hashchange (App.tsx).
 *
 * Search is unaffected. The pre-rendered HTML is snapshotted with no hash, so
 * crawlers and check:seo still see the bare canonical, and search engines drop
 * a fragment from a canonical anyway. og:url is left alone: link-preview
 * scrapers read the pre-rendered HTML, never this runtime value.
 */
export function syncCanonicalHash(): void {
  if (typeof document === 'undefined') return
  const el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  const href = el?.getAttribute('href')
  if (!el || !href) return
  const next = href.split('#')[0] + window.location.hash
  if (next !== href) el.setAttribute('href', next)
}
