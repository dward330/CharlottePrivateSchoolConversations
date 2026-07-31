import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRoute, toHome, toCompare, useNavigate } from './lib/router.ts'
import { topics, schools, brandOf } from './lib/manifest.ts'
import { Home } from './pages/Home.tsx'
import { SchoolDetail } from './pages/SchoolDetail.tsx'
import { Compare } from './pages/Compare.tsx'
import { BackToTop } from './components/BackToTop.tsx'
import { ThemeToggle } from './components/ThemeToggle.tsx'
import { LanguagePicker } from './components/LanguagePicker.tsx'
// TEMPORARY — translation print-out aid, remove with the component.
import { ExpandAllToggle } from './components/ExpandAllToggle.tsx'

function App() {
  const { t } = useTranslation()
  const route = useRoute()
  const navigate = useNavigate()
  const allSlugs = schools.map((s) => s.slug)
  // Falls back to the text mark if public/logo.png isn't present yet.
  const [logoOk, setLogoOk] = useState(true)

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
              src="/logo.png"
              className="brand-logo"
              alt=""
              onError={() => setLogoOk(false)}
            />
          ) : (
            <span className="brand-mark" aria-hidden="true">CLT</span>
          )}
          <span className="brand-name">{t('nav.brandName')}</span>
        </a>
        <div className="nav-actions">
          <a
            className={`navlink ${route.name === 'compare' ? 'on' : ''}`}
            href={toCompare(topics[0]?.slug ?? null, allSlugs)}
            onClick={(e) => { e.preventDefault(); navigate(toCompare(topics[0]?.slug ?? null, allSlugs)) }}
          >
            {t('nav.compare')}
          </a>
          {/* TEMPORARY — print-out aid, only where there are cards to expand. */}
          {route.name === 'school' && <ExpandAllToggle />}
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
