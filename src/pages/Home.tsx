import { useTranslation } from 'react-i18next'
import { topicLabel } from '../lib/labels.ts'
import { schools, topics, topicsForSchool, docCount, projectStats, generated, brandOf } from '../lib/manifest.ts'
import { SchoolBadge } from '../components/SchoolBadge.tsx'
import { TopicGlyph } from '../components/TopicGlyph.tsx'
import { toSchool, toCompare, useNavigate } from '../lib/router.ts'
import { COMPARE_DEFAULT_TOPIC, COMPARE_DEFAULT_SCHOOLS } from '../lib/metrics.ts'

export function Home() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const stats = projectStats()
  /* The grid's cells open Compare on the standing default peer set rather than
     all eleven columns, matching what a bare /compare/ and a school page's
     compare link already open on (COMPARE_DEFAULT_SCHOOLS). Filtered through the
     manifest so column order stays stable and an unknown slug drops a column
     rather than crashing. */
  const compareSlugs = schools.map((s) => s.slug).filter((s) => COMPARE_DEFAULT_SCHOOLS.includes(s))
  /* Every cell in this grid links into Compare, so it leads with the same topic
     Compare itself leads with (see COMPARE_DEFAULT_TOPIC and the matching
     ordering in Compare.tsx), and drops Admissions to the end — it is the one
     topic with no Compare value rows, so it is the least useful cell to lead a
     reader into. Everything between keeps TOPIC_ORDER.

     Done HERE and not in TOPIC_ORDER: that array is the reading order of a
     school DOSSIER, where Admissions leads deliberately, and reordering it
     would move College Support to the top of all eleven school pages and push
     Admissions to the bottom of each. */
  const homeTopics = [
    ...topics.filter((x) => x.slug === COMPARE_DEFAULT_TOPIC),
    ...topics.filter((x) => x.slug !== COMPARE_DEFAULT_TOPIC && x.slug !== 'admissions'),
    ...topics.filter((x) => x.slug === 'admissions'),
  ]

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
            <a
              className="btn primary"
              href="#schools"
              onClick={(e) => {
                // The hash router owns location.hash — scroll in place instead.
                e.preventDefault()
                document.getElementById('schools')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
            >
              {t('home.ctaBrowse')}
            </a>
          </span>
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
                <div className="school-card-head">
                  <SchoolBadge slug={s.slug} name={s.name} size={44} />
                  <div className="school-card-body">
                    <span className="school-card-name">{s.name}</span>
                    <span className="school-card-meta">
                      {t('home.schoolCardMeta', { topics: covered.length, documents: docs })}
                    </span>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </section>

      <section aria-labelledby="topics-h" className="block">
        <h2 id="topics-h">{t('home.topicsHeading')}</h2>
        <div className="topic-grid hairline-grid">
          {homeTopics.map((topic) => (
            <a
              key={topic.slug}
              className="topic-cell"
              href={toCompare(topic.slug, compareSlugs)}
              onClick={(e) => {
                e.preventDefault()
                navigate(toCompare(topic.slug, compareSlugs))
              }}
            >
              <span className="topic-cell-icon"><TopicGlyph slug={topic.slug} size={20} /></span>
              <span className="topic-name">{topicLabel(t, topic.slug, topic.name)}</span>
              <span className="topic-cta">{t('home.compareAll')}</span>
            </a>
          ))}
        </div>
      </section>

    </div>
  )
}
