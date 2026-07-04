import { useEffect, useState } from 'react'
import {
  schoolBySlug,
  brandOf,
  topicsForSchool,
  docCount,
} from '../lib/manifest.ts'
import { loadMetricGroups, type MetricGroup } from '../lib/content.ts'
import { SchoolBadge } from '../components/SchoolBadge.tsx'
import { TopicIcon } from '../components/TopicIcon.tsx'
import { toCompare, toHome, useNavigate } from '../lib/router.ts'
import { schools as allSchools } from '../lib/manifest.ts'

type Loaded = Record<string, MetricGroup[]>

export function SchoolDetail({ slug }: { slug: string }) {
  const navigate = useNavigate()
  const school = schoolBySlug(slug)
  const [loaded, setLoaded] = useState<Loaded>({})
  const [ready, setReady] = useState(false)

  const covered = school ? topicsForSchool(slug) : []

  useEffect(() => {
    let alive = true
    setReady(false)
    setLoaded({})
    Promise.all(
      covered.map(async (t) => [t.slug, await loadMetricGroups(t.slug, slug)] as const),
    ).then((entries) => {
      if (!alive) return
      setLoaded(Object.fromEntries(entries))
      setReady(true)
    })
    return () => {
      alive = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  if (!school) {
    return (
      <div className="page">
        <p className="empty">
          Unknown school. <a href={toHome()}>Back home</a>.
        </p>
      </div>
    )
  }

  const brand = brandOf(slug)
  const totalDocs = covered.reduce((sum, t) => sum + docCount(t.slug, slug), 0)
  const otherSlugs = allSchools.map((s) => s.slug)

  return (
    <div className="page" style={{ ['--brand' as string]: brand.color }}>
      <a className="back" href={toHome()} onClick={(e) => { e.preventDefault(); navigate(toHome()) }}>
        ← All schools
      </a>

      <header className="school-header">
        <SchoolBadge slug={slug} name={school.name} size={72} />
        <div>
          <h1>{school.name}</h1>
          <p className="school-sub">
            {covered.length} research areas · {totalDocs} documents distilled
          </p>
          <div className="school-header-topics">
            {covered.map((t) => (
              <a key={t.slug} className="chip" href={`#topic-${t.slug}`}>
                <TopicIcon slug={t.slug} size={14} /> {t.name}
              </a>
            ))}
          </div>
        </div>
      </header>

      {covered.map((t) => {
        const groups = loaded[t.slug] ?? []
        return (
          <section key={t.slug} id={`topic-${t.slug}`} className="topic-section">
            <div className="topic-section-head">
              <h2>
                <TopicIcon slug={t.slug} size={22} /> {t.name}
              </h2>
              <a
                className="btn small ghost"
                href={toCompare(t.slug, otherSlugs)}
                onClick={(e) => { e.preventDefault(); navigate(toCompare(t.slug, otherSlugs)) }}
              >
                Compare on {t.name} →
              </a>
            </div>

            {!ready && <p className="loading">Loading research…</p>}
            {ready && groups.length === 0 && (
              <p className="empty">No readable notes for this area yet.</p>
            )}

            <div className="metric-list">
              {groups.map((g) => (
                <details key={g.metric.key} className="metric">
                  <summary>
                    <span className="metric-label">{g.metric.label}</span>
                    <span className="metric-preview">{g.sections[0]?.preview}</span>
                  </summary>
                  <div className="metric-body">
                    {g.sections.map((s, i) => (
                      <article key={i} className="section-text">
                        {s.subtopic !== g.metric.label && (
                          <h4 className="section-sub">{s.subtopic}</h4>
                        )}
                        <pre className="prose">{s.text}</pre>
                        {s.source_file && (
                          <p className="source">Source: {s.source_file}</p>
                        )}
                      </article>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
