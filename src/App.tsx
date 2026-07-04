import { useRoute, toHome, toCompare, useNavigate } from './lib/router.ts'
import { topics, schools } from './lib/manifest.ts'
import { Home } from './pages/Home.tsx'
import { SchoolDetail } from './pages/SchoolDetail.tsx'
import { Compare } from './pages/Compare.tsx'

function App() {
  const route = useRoute()
  const navigate = useNavigate()
  const allSlugs = schools.map((s) => s.slug)

  return (
    <div className="app">
      <nav className="topnav">
        <a
          className="brand"
          href={toHome()}
          onClick={(e) => { e.preventDefault(); navigate(toHome()) }}
        >
          <span className="brand-mark" aria-hidden="true">CLT</span>
          <span className="brand-name">Charlotte School Compare</span>
        </a>
        <a
          className={`navlink ${route.name === 'compare' ? 'on' : ''}`}
          href={toCompare(topics[0]?.slug ?? null, allSlugs)}
          onClick={(e) => { e.preventDefault(); navigate(toCompare(topics[0]?.slug ?? null, allSlugs)) }}
        >
          Compare
        </a>
      </nav>

      <main>
        {route.name === 'home' && <Home />}
        {route.name === 'school' && <SchoolDetail slug={route.slug} />}
        {route.name === 'compare' && <Compare topic={route.topic} schools={route.schools} />}
      </main>

      <footer className="footer">
        <p>
          Parent-facing research on Charlotte-area private schools. Notes are distilled,
          lightly-cleaned extracts of source documents — verify specifics with each school.
        </p>
      </footer>
    </div>
  )
}

export default App
