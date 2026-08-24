import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRoute, toHome, useNavigate } from './lib/router.ts'
import { setPageMeta } from './lib/head.ts'
import { assetUrl } from './lib/asset.ts'
import { contactMailto, CONTACT_EMAIL } from './lib/contact.ts'
import { trackEvent } from './lib/analytics.ts'
import { brandOf, schoolBySlug } from './lib/manifest.ts'
import { Home } from './pages/Home.tsx'
import { SchoolDetail } from './pages/SchoolDetail.tsx'
import { Compare } from './pages/Compare.tsx'
import { BackToTop } from './components/BackToTop.tsx'
import { ThemeToggle } from './components/ThemeToggle.tsx'
import { LanguagePicker } from './components/LanguagePicker.tsx'
import { StickySchoolTitle } from './components/StickySchoolTitle.tsx'

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
        {route.name === 'school' && <SchoolDetail slug={route.slug} />}
        {route.name === 'compare' && <Compare topic={route.topic} schools={route.schools} />}
      </main>

      <footer className="footer">
        <p>{t('nav.footerDisclaimer')}</p>
      </footer>

      <BackToTop accent={route.name === 'school' ? brandOf(route.slug).color : undefined} />
    </div>
  )
}

export default App
