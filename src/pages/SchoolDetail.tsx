import { useEffect, useState } from 'react'
import {
  schoolBySlug,
  brandOf,
  topicsForSchool,
  docCount,
} from '../lib/manifest.ts'
import { loadMetricGroups, type MetricGroup } from '../lib/content.ts'
import { SchoolBadge } from '../components/SchoolBadge.tsx'
import { TopicGlyph } from '../components/TopicGlyph.tsx'
import { BlueprintCorners } from '../components/BlueprintCorners.tsx'
import { ProseContent } from '../components/ProseContent.tsx'
import { proseSummary } from '../lib/prose.ts'
import { toCompare, toHome, useNavigate } from '../lib/router.ts'
import { schools as allSchools } from '../lib/manifest.ts'
import { valueMetricsForTopic } from '../data/metricValues.ts'
import { financialAidReport } from '../data/financialAidReports.ts'
import { FinancialAidReportCard } from '../components/FinancialAidReport.tsx'
import { clubClusters } from '../data/clubClusters.ts'
import { ClubClustersBody } from '../components/ClubClusters.tsx'
import { clubCatalog } from '../data/clubCatalog.ts'
import { ClubCatalogBody } from '../components/ClubCatalog.tsx'

type Loaded = Record<string, MetricGroup[]>

/* Student-clubs metrics whose named orgs Cannon's consolidated Club Catalog card
   absorbs, so they don't render as standalone cards on the Cannon page. */
const MERGED_INTO_CANNON_CATALOG = new Set(['affinity', 'lower-middle', 'service'])

/* Cannon-only card order overrides, per topic. Keys not listed keep their
   existing order after the listed ones. Cannon-specific so no other school's
   ordering changes (the shared order lives in metrics.ts SECTION_ORDER). */
const CANNON_SECTION_ORDER: Record<string, string[]> = {
  'student-clubs': ['academic-clubs', 'honor-societies', 'catalog'],
  'the-arts': ['overview', 'visual-arts', 'music', 'theatre', 'courses', 'facilities', 'in-depth-report'],
}

function PlusIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
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

/* The hash router owns location.hash, so a raw "#topic-…" anchor would be
   parsed as an unknown route and bounce home. Scroll in place instead. */
function scrollToTopic(e: React.MouseEvent, slug: string) {
  e.preventDefault()
  document.getElementById(`topic-${slug}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function SchoolDetail({ slug }: { slug: string }) {
  const navigate = useNavigate()
  const school = schoolBySlug(slug)
  const [loaded, setLoaded] = useState<Loaded>({})
  const [ready, setReady] = useState(false)
  /* The last-clicked research area in the nav keeps the active (foreground)
     treatment so the reader can see which section they jumped to. */
  const [activeSlug, setActiveSlug] = useState<string | null>(null)

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
    <div className="page school-page" style={{ ['--brand' as string]: brand.color }}>
      <a className="back" href={toHome()} onClick={(e) => { e.preventDefault(); navigate(toHome()) }}>
        ← All schools
      </a>

      <header className="dossier-header">
        <BlueprintCorners />
        <SchoolBadge slug={slug} name={school.name} size={84} />
        <div className="dossier-body">
          <p className="dossier-kicker">School dossier · Charlotte, NC</p>
          <h1>{school.name}</h1>
          <p className="school-sub">
            {covered.length} research areas · {totalDocs} documents distilled
          </p>
          <div className="school-header-topics">
            {covered.map((t) => (
              <a
                key={t.slug}
                className={t.slug === activeSlug ? 'chip is-active' : 'chip'}
                href={`#topic-${t.slug}`}
                onClick={(e) => {
                  setActiveSlug(t.slug)
                  scrollToTopic(e, t.slug)
                }}
              >
                {t.name}
              </a>
            ))}
          </div>
        </div>
        {brand.logo && (
          <img
            className="dossier-crest"
            src={brand.logo}
            alt={`${school.name} athletics logo`}
            loading="lazy"
          />
        )}
      </header>

      <div className="dossier-layout">
        <aside className="dossier-nav">
          <div className="dossier-nav-label">Research areas</div>
          {covered.map((t) => (
            <a
              key={t.slug}
              className={t.slug === activeSlug ? 'is-active' : undefined}
              href={`#topic-${t.slug}`}
              onClick={(e) => {
                setActiveSlug(t.slug)
                scrollToTopic(e, t.slug)
              }}
            >
              {t.name}
              <span className="count">{String(docCount(t.slug, slug)).padStart(2, '0')}</span>
            </a>
          ))}
          <p className="dossier-nav-hint">
            Click any card to expand its full research note. Sources are cited on every fact.
          </p>
        </aside>

        <main className="dossier-main">
          {covered.map((t) => {
            const allGroups = loaded[t.slug] ?? []
            /* Cannon's Club Catalog card is a consolidated view: it absorbs the
               named orgs from the Affinity, Lower/Middle, and Service cards (see
               data/clubCatalog.ts), so those three don't also render standalone
               on the Cannon Student Clubs page. Cannon-only — every other school
               keeps all its cards. */
            /* Cannon overrides (Cannon-only): its Student Clubs card absorbs the
               merged sections, and both Student Clubs and The Arts use a
               Cannon-specific card order. Other schools use allGroups as-is. */
            let groups = allGroups
            if (slug === 'cannon') {
              if (t.slug === 'student-clubs') {
                groups = groups.filter(
                  (g) => !MERGED_INTO_CANNON_CATALOG.has(g.metric.key),
                )
              }
              const cannonOrder = CANNON_SECTION_ORDER[t.slug]
              if (cannonOrder) {
                const rank = (k: string) => {
                  const i = cannonOrder.indexOf(k)
                  return i === -1 ? cannonOrder.length : i
                }
                groups = [...groups].sort(
                  (a, b) => rank(a.metric.key) - rank(b.metric.key),
                )
              }
            }
            const stats = valueMetricsForTopic(t.slug).filter((vm) => vm.values[slug] != null)
            return (
              <section key={t.slug} id={`topic-${t.slug}`} className="topic-section">
                <div className="topic-section-head">
                  <span className="glyph"><TopicGlyph slug={t.slug} /></span>
                  <h2>{t.name}</h2>
                  <span className="topic-count">
                    {ready ? `${groups.length} topics` : '…'}
                  </span>
                  <a
                    className="btn"
                    href={toCompare(t.slug, otherSlugs)}
                    onClick={(e) => { e.preventDefault(); navigate(toCompare(t.slug, otherSlugs)) }}
                  >
                    Compare on {t.name} <ArrowIcon />
                  </a>
                </div>

                {stats.length > 0 && (
                  <div className="stat-strip">
                    {stats.map((vm) => (
                      <div key={vm.key} className="stat-tile">
                        <div className="stat-tile-val">{vm.values[slug]}</div>
                        <div className="stat-tile-label">{vm.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {!ready && <p className="loading">Loading research…</p>}
                {ready && groups.length === 0 && (
                  <p className="empty">No readable notes for this area yet.</p>
                )}

                <div className="note-cards">
                  {groups.map((g) => {
                    /* The Financial Aid deep-dive has a hand-structured report
                       behind it; it replaces the prose body and always claims
                       the full grid row rather than reflowing into columns.
                       It attaches to the deep-dive card only — the topic also
                       carries plain notes (tuition history, provenance) that
                       must keep rendering as prose. */
                    const report =
                      t.slug === 'financial-aid-tuition' &&
                      g.metric.key === 'in-depth-report'
                        ? financialAidReport(slug)
                        : undefined
                    /* The Academic & Competitive Clubs card, where the school
                       has a structured entry, swaps its prose body for the
                       layered club-cluster rows and leads with the verdict as
                       its collapsed teaser. */
                    const clusters =
                      t.slug === 'student-clubs' &&
                      g.metric.key === 'academic-clubs'
                        ? clubClusters(slug)
                        : undefined
                    /* The Club Catalog & Overview card, where the school has a
                       structured entry, swaps its prose body for the filterable
                       interest index and leads with the catalog verdict as its
                       collapsed teaser. */
                    const catalog =
                      t.slug === 'student-clubs' && g.metric.key === 'catalog'
                        ? clubCatalog(slug)
                        : undefined
                    return (
                      <details
                        key={g.metric.key}
                        className={`note-card${report || clusters || catalog ? ' note-card-report' : ''}`}
                      >
                        <BlueprintCorners />
                        <summary>
                          <span className="note-card-head">
                            <span className="topic-title">{g.metric.label}</span>
                            <span className="topic-teaser">
                              {clusters
                                ? clusters.verdict
                                : catalog
                                  ? catalog.verdict
                                  : proseSummary(g.sections[0]?.text ?? '', g.metric.label) || g.sections[0]?.preview}
                            </span>
                          </span>
                          <span className="plusmark"><PlusIcon /></span>
                        </summary>
                        <div className="note-card-body">
                          {report ? (
                            <FinancialAidReportCard report={report} />
                          ) : clusters ? (
                            <ClubClustersBody clusters={clusters} />
                          ) : catalog ? (
                            <ClubCatalogBody catalog={catalog} />
                          ) : (
                            g.sections.map((s, i) => (
                              <article key={i} className="section-text">
                                {g.sections.length > 1 &&
                                  s.subtopic !== g.metric.label &&
                                  !/deep research/i.test(s.subtopic) && (
                                    <h3 className="section-sub">{s.subtopic}</h3>
                                  )}
                                <ProseContent text={s.text} title={g.metric.label} />
                              </article>
                            ))
                          )}
                        </div>
                      </details>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </main>
      </div>
    </div>
  )
}
