import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ready } from './lib/i18n.ts'
import { initAnalytics, pathForHash } from './lib/analytics.ts'
import App from './App.tsx'

// Wait for the saved/detected locale's catalog before the first paint, so a
// returning Spanish reader doesn't get a frame of English. `ready` never
// rejects — a bundle that fails to load leaves English in place.
await ready

// Rewrite a legacy hash URL to its canonical path form before the first render.
// Links to `#/school/cannon` are already shared in the wild (Facebook is the #2
// referrer) and must keep resolving; the path form is what search engines index
// and what every in-app link now emits, so there is exactly one canonical URL
// per page. replaceState, NOT pushState — the legacy URL should not occupy a
// history entry, or Back would land the reader right back on it.
// `location.search` is preserved by pathForHash's caller below so `?lang=`
// survives the rewrite.
if (typeof window !== 'undefined' && window.location.hash.startsWith('#/')) {
  try {
    const path = pathForHash(window.location.hash)
    const [pathOnly, hashQuery] = path.split('?')
    // Merge the two query strings: the page's own (?lang=) plus anything the
    // hash route carried (?topic=&schools= on compare).
    const merged = new URLSearchParams(window.location.search)
    for (const [k, v] of new URLSearchParams(hashQuery ?? '')) merged.set(k, v)
    const q = merged.toString()
    window.history.replaceState(null, '', pathOnly + (q ? `?${q}` : ''))
  } catch {
    // Never let a URL rewrite stop the app from booting.
  }
}

// Report navigations to Cloudflare Web Analytics as distinct page-views, and
// keep in-app <a href="/…"> clicks routing client-side. Best-effort; never
// affects routing. See src/lib/analytics.ts.
initAnalytics()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
