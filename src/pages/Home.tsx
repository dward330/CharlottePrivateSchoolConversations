import { useState } from 'react'
import { schools, topics, topicsForSchool, docCount, projectStats, generated, brandOf } from '../lib/manifest.ts'
import { SchoolBadge } from '../components/SchoolBadge.tsx'
import { TopicIcon } from '../components/TopicIcon.tsx'
import { toSchool, toCompare, useNavigate } from '../lib/router.ts'

export function Home() {
  const navigate = useNavigate()
  const stats = projectStats()
  const allSlugs = schools.map((s) => s.slug)
  const [logoOk, setLogoOk] = useState(true)

  return (
    <div className="page">
      <header className="hero">
        {logoOk && (
          <img
            src="/logo.png"
            className="hero-logo"
            alt="Charlotte Private School Conversations — Navigating Your Family's Options"
            onError={() => setLogoOk(false)}
          />
        )}
        <p className="eyebrow">Charlotte private schools · parent research</p>
        <h1>Compare Charlotte's private schools, side by side.</h1>
        <p className="lede">
          Independent research on {stats.schools} Charlotte-area private (K–12) schools
          across {stats.topics} areas that matter to families — distilled from{' '}
          {stats.documents} source documents.
        </p>
        <div className="hero-actions">
          <a className="btn primary" href={toCompare(topics[0]?.slug ?? null, allSlugs)}>
            Compare schools
          </a>
          <a className="btn ghost" href="#schools">
            Browse a school
          </a>
        </div>
        <p className="freshness">Research current as of {generated}.</p>
      </header>

      <section aria-labelledby="topics-h" className="block">
        <h2 id="topics-h">What you can explore</h2>
        <div className="topic-grid">
          {topics.map((t) => (
            <a
              key={t.slug}
              className="topic-card"
              href={toCompare(t.slug, allSlugs)}
              onClick={(e) => {
                e.preventDefault()
                navigate(toCompare(t.slug, allSlugs))
              }}
            >
              <TopicIcon slug={t.slug} size={28} />
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
                <SchoolBadge slug={s.slug} name={s.name} size={52} />
                <div className="school-card-body">
                  <span className="school-card-name">{s.name}</span>
                  <span className="school-card-meta">
                    {covered.length} topics · {docs} documents
                  </span>
                  <div className="school-card-topics">
                    {covered.map((t) => (
                      <span key={t.slug} className="mini-chip">
                        <TopicIcon slug={t.slug} size={13} /> {t.name}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </section>
    </div>
  )
}
