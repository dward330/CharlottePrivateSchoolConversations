import { schools, topics, topicsForSchool, docCount, projectStats, generated, brandOf } from '../lib/manifest.ts'
import { SchoolBadge } from '../components/SchoolBadge.tsx'
import { TopicGlyph } from '../components/TopicGlyph.tsx'
import { BlueprintCorners } from '../components/BlueprintCorners.tsx'
import { toSchool, toCompare, useNavigate } from '../lib/router.ts'

function ArrowIcon() {
  return (
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
      focusable="false"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

export function Home() {
  const navigate = useNavigate()
  const stats = projectStats()
  const allSlugs = schools.map((s) => s.slug)
  const compareAll = toCompare(topics[0]?.slug ?? null, allSlugs)

  return (
    <div className="page home">
      <header className="hero">
        <p className="eyebrow">Charlotte private schools · parent research</p>
        <h1>Compare Charlotte's private schools, side by side.</h1>
        <p className="lede">
          Independent research on {stats.schools} Charlotte-area private (K–12) schools
          across {stats.topics} areas that matter to families — distilled from{' '}
          {stats.documents} source documents.
        </p>
        <div className="hero-actions">
          <span className="cta-frame">
            <BlueprintCorners />
            <a
              className="btn primary"
              href={compareAll}
              onClick={(e) => { e.preventDefault(); navigate(compareAll) }}
            >
              Compare schools <ArrowIcon />
            </a>
          </span>
          <a
            className="btn ghost"
            href="#schools"
            onClick={(e) => {
              // The hash router owns location.hash — scroll in place instead.
              e.preventDefault()
              document.getElementById('schools')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
          >
            Browse a school
          </a>
          <span className="freshness">Research current as of {generated}.</span>
        </div>
        <div className="stat-strip hero-stats">
          <div className="stat-tile">
            <div className="stat-tile-val">{stats.schools}</div>
            <div className="stat-tile-label">schools researched</div>
          </div>
          <div className="stat-tile">
            <div className="stat-tile-val">{stats.topics}</div>
            <div className="stat-tile-label">research areas</div>
          </div>
          <div className="stat-tile">
            <div className="stat-tile-val">{stats.documents}</div>
            <div className="stat-tile-label">source documents distilled</div>
          </div>
        </div>
      </header>

      <section aria-labelledby="topics-h" className="block">
        <h2 id="topics-h">What you can explore</h2>
        <div className="topic-grid">
          {topics.map((t) => (
            <a
              key={t.slug}
              className="topic-cell"
              href={toCompare(t.slug, allSlugs)}
              onClick={(e) => {
                e.preventDefault()
                navigate(toCompare(t.slug, allSlugs))
              }}
            >
              <span className="topic-cell-icon"><TopicGlyph slug={t.slug} size={20} /></span>
              <span className="topic-name">{t.name}</span>
              <span className="topic-cta">Compare all →</span>
            </a>
          ))}
        </div>
      </section>

      <section aria-labelledby="schools-h" className="block" id="schools">
        <h2 id="schools-h">The schools</h2>
        <div className="school-grid">
          {schools.map((s) => {
            const covered = topicsForSchool(s.slug)
            const docs = topics.reduce((sum, t) => sum + docCount(t.slug, s.slug), 0)
            return (
              <a
                key={s.slug}
                className="school-card"
                href={toSchool(s.slug)}
                onClick={(e) => {
                  e.preventDefault()
                  navigate(toSchool(s.slug))
                }}
                style={{ ['--brand' as string]: brandOf(s.slug).color }}
              >
                <BlueprintCorners />
                <div className="school-card-head">
                  <SchoolBadge slug={s.slug} name={s.name} size={44} />
                  <div className="school-card-body">
                    <span className="school-card-name">{s.name}</span>
                    <span className="school-card-meta">
                      {covered.length} topics · {docs} documents
                    </span>
                  </div>
                </div>
                <div className="school-card-topics">
                  {covered.map((t) => (
                    <span key={t.slug} className="mini-chip">
                      <TopicGlyph slug={t.slug} size={11} /> {t.name}
                    </span>
                  ))}
                </div>
              </a>
            )
          })}
        </div>
      </section>
    </div>
  )
}
