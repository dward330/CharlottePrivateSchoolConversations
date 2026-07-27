import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
  const navigate = useNavigate()
  const stats = projectStats()
  const allSlugs = schools.map((s) => s.slug)
  const compareAll = toCompare(topics[0]?.slug ?? null, allSlugs)

  return (
    <div className="page home">
      <header className="hero">
        <p className="eyebrow">{t('home.eyebrow')}</p>
        <h1>{t('home.title')}</h1>
        <p className="lede">
          {t('home.lede', {
            schools: stats.schools,
            topics: stats.topics,
            documents: stats.documents,
          })}
        </p>
        <div className="hero-actions">
          <span className="cta-frame">
            <BlueprintCorners />
            <a
              className="btn primary"
              href={compareAll}
              onClick={(e) => { e.preventDefault(); navigate(compareAll) }}
            >
              {t('home.ctaCompare')} <ArrowIcon />
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
            {t('home.ctaBrowse')}
          </a>
          <span className="freshness">{t('home.freshness', { date: generated })}</span>
        </div>
        <div className="stat-strip hero-stats">
          <div className="stat-tile">
            <div className="stat-tile-val">{stats.schools}</div>
            <div className="stat-tile-label">
              {t('home.stats.schools', { count: stats.schools })}
            </div>
          </div>
          <div className="stat-tile">
            <div className="stat-tile-val">{stats.topics}</div>
            <div className="stat-tile-label">
              {t('home.stats.topics', { count: stats.topics })}
            </div>
          </div>
          <div className="stat-tile">
            <div className="stat-tile-val">{stats.documents}</div>
            <div className="stat-tile-label">
              {t('home.stats.documents', { count: stats.documents })}
            </div>
          </div>
        </div>
      </header>

      <section aria-labelledby="topics-h" className="block">
        <h2 id="topics-h">{t('home.topicsHeading')}</h2>
        <div className="topic-grid">
          {topics.map((topic) => (
            <a
              key={topic.slug}
              className="topic-cell"
              href={toCompare(topic.slug, allSlugs)}
              onClick={(e) => {
                e.preventDefault()
                navigate(toCompare(topic.slug, allSlugs))
              }}
            >
              <span className="topic-cell-icon"><TopicGlyph slug={topic.slug} size={20} /></span>
              <span className="topic-name">{topic.name}</span>
              <span className="topic-cta">{t('home.compareAll')}</span>
            </a>
          ))}
        </div>
      </section>

      <section aria-labelledby="schools-h" className="block" id="schools">
        <h2 id="schools-h">{t('home.schoolsHeading')}</h2>
        <div className="school-grid">
          {schools.map((s) => {
            const covered = topicsForSchool(s.slug)
            const docs = topics.reduce((sum, topic) => sum + docCount(topic.slug, s.slug), 0)
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
                      {t('home.schoolCardMeta', { topics: covered.length, documents: docs })}
                    </span>
                  </div>
                </div>
                <div className="school-card-topics">
                  {covered.map((topic) => (
                    <span key={topic.slug} className="mini-chip">
                      <TopicGlyph slug={topic.slug} size={11} /> {topic.name}
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
