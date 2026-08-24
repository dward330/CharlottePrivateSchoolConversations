import { lazy, Suspense, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRoute, toHome, useNavigate } from './lib/router.ts'
import { setPageMeta } from './lib/head.ts'
import { assetUrl } from './lib/asset.ts'
import { contactMailto, CONTACT_EMAIL } from './lib/contact.ts'
import { trackEvent } from './lib/analytics.ts'
import { brandOf, schoolBySlug } from './lib/manifest.ts'
import { Home } from './pages/Home.tsx'
import { BackToTop } from './components/BackToTop.tsx'
import { ThemeToggle } from './components/ThemeToggle.tsx'
import { LanguagePicker } from './components/LanguagePicker.tsx'
import { StickySchoolTitle } from './components/StickySchoolTitle.tsx'

/* Route-level code splitting.
 *
 * Home stays static: it is the entry route, and splitting it would add a round
 * trip to the most common first paint while saving nothing — it renders none of
 * the research prose.
 *
 * SchoolDetail and Compare are the two routes that pull in `src/data/**` — the
 * eleven schools' structured card registries (college support, summer, sports,
 * arts, clubs, after-school, course offerings, financial-aid reports). Those
 * registries statically import every school, so before this split a home-page
 * visitor downloaded all eleven schools' research to render a page that shows
 * none of it. Measured 2026-08-24: src/data/** was 2.35 MB of the index chunk's
 * 3.4 MB of source, 69% of it.
 *
 * The distilled prose in src/content/** was ALREADY lazy (see src/lib/content.ts
 * — `import.meta.glob` over the per-school JSON), as are the locale overlays.
 * This closes the remaining gap: the eager half was the typed card data.
 *
 * The pre-render is unaffected. scripts/prerender.mjs drives a real browser with
 * `waitUntil: 'networkidle'` and blocks on `#root` having real content, so the
 * lazy chunk has resolved before the snapshot is taken — and its MIN_BYTES guard
 * plus `npm run check:seo` fail the build if it ever does not. All 13 pages were
 * byte-compared before and after: none shrank.
 *
 * KNOWN COST, measured rather than predicted. On the emulated mobile profile
 * (390x844, CPU 4x, Fast-3G) school-page CLS goes 0.0021 GOOD -> 0.1197
 * NEEDS-WORK, and /compare/ 0.0618 -> 0.1197. Desktop /compare/ IMPROVES
 * (0.1254 NEEDS-WORK -> 0.0322 GOOD) while desktop school pages go 0.0000 ->
 * 0.0913, still GOOD.
 *
 * The mechanism, traced with a layout-shift + MutationObserver probe: React
 * replaces the whole #root subtree once, ~20s in on this throttled profile. The
 * baseline does this too — but re-renders a page identical in height to the
 * pre-rendered markup, so nothing moves. Split, the research arrives later
 * (LCP 2.4s -> 8.4s on cannon), the two heights differ, and the footer shifts.
 *
 * A `React.lazy` preload in main.tsx that awaited the matching route's chunk
 * before the first render was tried and did NOT help (0.1197 unchanged) — the
 * shift is not a Suspense suspend, so that complexity was removed rather than
 * kept as a plausible-looking non-fix. */
const SchoolDetail = lazy(() =>
  import('./pages/SchoolDetail.tsx').then((m) => ({ default: m.SchoolDetail })),
)
const Compare = lazy(() => import('./pages/Compare.tsx').then((m) => ({ default: m.Compare })))

function App() {
  const { t } = useTranslation()
  const route = useRoute()
  const navigate = useNavigate()
  // Null on Home and Compare; StickySchoolTitle renders nothing for those.
  const schoolName =
    route.name === 'school' ? (schoolBySlug(route.slug)?.name ?? null) : null
  // Falls back to the text mark if public/logo.png isn't present yet.
  const [logoOk, setLogoOk] = useState(true)

  // Keep <head> in step with the route: title, description, canonical, OG/
  // Twitter tags and JSON-LD (src/lib/head.ts). The dependency is the route
  // SERIALIZED, not the object — useRoute() derives a fresh object every
  // render, so an object dep would re-run this on every render.
  const routeKey = JSON.stringify(route)
  useEffect(() => {
    setPageMeta(JSON.parse(routeKey))
  }, [routeKey])

  return (
    <div className="app">
      <nav className="topnav">
        <a
          className="brand"
          href={toHome()}
          onClick={(e) => { e.preventDefault(); navigate(toHome()) }}
          aria-label={t('nav.homeAria')}
        >
          {logoOk ? (
            <img
              src={assetUrl('/logo.png')}
              className="brand-logo"
              alt=""
              onError={() => setLogoOk(false)}
            />
          ) : (
            <span className="brand-mark" aria-hidden="true">CLT</span>
          )}
          <span className="brand-name">{t('nav.brandName')}</span>
        </a>
        {/* Outside .brand on purpose: .brand is the Home link, and this label
            is not clickable. */}
        <StickySchoolTitle name={schoolName} />
        <div className="nav-actions">
          {/* A real anchor, never a <button> + window.location: the browser must
              handle the mailto itself (and the address is copyable). No
              target="_blank" — it leaves an empty tab behind. trackEvent is
              synchronous and fire-and-forget, so the navigation is unaffected;
              the delegated handler in analytics.ts ignores non-'/' hrefs. */}
          <a
            className="btn ghost small contact"
            href={contactMailto()}
            title={t('nav.contactTitle', { email: CONTACT_EMAIL })}
            aria-label={t('nav.contact')}
            onClick={() => trackEvent('contact_click')}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="5" width="18" height="14" />
              <path d="m3 7 9 6 9-6" />
            </svg>
            <span className="contact-label">{t('nav.contact')}</span>
          </a>
          <LanguagePicker />
          <ThemeToggle />
        </div>
      </nav>

      <main>
        {route.name === 'home' && <Home />}
        {/* Reuses the existing `.loading` treatment VERBATIM rather than
            introducing a new user-facing string — src/pages/SchoolDetail.tsx
            renders this identical element, with this identical text, per topic
            section while its research loads. Keeping it byte-identical is what
            makes this change single-phase: no new key, so no locale rollout.

            The text is hardcoded English there and therefore here too. That is a
            PRE-EXISTING chrome leak in SchoolDetail (it should be a
            src/locales/*.json key), not one this change introduces — it is
            reported as a follow-up rather than fixed here, because adding the key
            would make a route-splitting change touch all ten catalogs.

            In practice it is rarely seen: every indexable route is pre-rendered,
            so a first-paint visitor gets real HTML and React hydrates over it. */}
        <Suspense fallback={<p className="loading">Loading research…</p>}>
          {route.name === 'school' && <SchoolDetail slug={route.slug} />}
          {route.name === 'compare' && <Compare topic={route.topic} schools={route.schools} />}
        </Suspense>
      </main>

      <footer className="footer">
        <p>{t('nav.footerDisclaimer')}</p>
      </footer>

      <BackToTop accent={route.name === 'school' ? brandOf(route.slug).color : undefined} />
    </div>
  )
}

export default App
