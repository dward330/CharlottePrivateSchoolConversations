import {
  schools as allSchools,
  topics,
  topicBySlug,
  brandOf,
  metricsForTopic,
  schoolHasMetric,
} from '../lib/manifest.ts'
import { SchoolBadge } from '../components/SchoolBadge.tsx'
import { TopicIcon } from '../components/TopicIcon.tsx'
import { toCompare, toSchool, toHome, useNavigate } from '../lib/router.ts'
import { valueMetricsForTopic } from '../data/metricValues.ts'

type Props = { topic: string | null; schools: string[] }

export function Compare({ topic, schools }: Props) {
  const navigate = useNavigate()
  const activeTopic = topic && topicBySlug(topic) ? topic : topics[0]?.slug ?? null

  // Keep selection to known slugs, preserving manifest order for stable columns.
  const selected = allSchools.map((s) => s.slug).filter((slug) => schools.includes(slug))

  const setTopic = (t: string) => navigate(toCompare(t, selected))
  const toggleSchool = (slug: string) => {
    const set = new Set(selected)
    if (set.has(slug)) set.delete(slug)
    else set.add(slug)
    const next = allSchools.map((s) => s.slug).filter((s) => set.has(s))
    navigate(toCompare(activeTopic, next))
  }

  const metrics = activeTopic ? metricsForTopic(activeTopic) : []
  const valueMetrics = activeTopic ? valueMetricsForTopic(activeTopic) : []
  const cols = allSchools.filter((s) => selected.includes(s.slug))

  return (
    <div className="page">
      <a className="back" href={toHome()} onClick={(e) => { e.preventDefault(); navigate(toHome()) }}>
        ← Home
      </a>
      <h1 className="compare-title">Compare schools</h1>

      <div className="controls">
        <fieldset className="control">
          <legend>Topic</legend>
          <div className="pill-row">
            {topics.map((t) => (
              <button
                key={t.slug}
                type="button"
                className={`pill ${t.slug === activeTopic ? 'on' : ''}`}
                aria-pressed={t.slug === activeTopic}
                onClick={() => setTopic(t.slug)}
              >
                <TopicIcon slug={t.slug} size={15} /> {t.name}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="control">
          <legend>Schools ({selected.length})</legend>
          <div className="pill-row">
            {allSchools.map((s) => {
              const on = selected.includes(s.slug)
              return (
                <button
                  key={s.slug}
                  type="button"
                  className={`pill school ${on ? 'on' : ''}`}
                  aria-pressed={on}
                  onClick={() => toggleSchool(s.slug)}
                  style={{ ['--brand' as string]: brandOf(s.slug).color }}
                >
                  <span className="dot" /> {s.name}
                </button>
              )
            })}
          </div>
        </fieldset>
      </div>

      {cols.length === 0 ? (
        <p className="empty">Select at least one school to compare.</p>
      ) : (
        <div className="table-wrap" role="region" aria-label="Comparison table" tabIndex={0}>
          <table className="compare">
            <thead>
              <tr>
                <th className="corner" scope="col">
                  <span className="corner-label">
                    <TopicIcon slug={activeTopic ?? ''} size={16} />{' '}
                    {topicBySlug(activeTopic ?? '')?.name}
                  </span>
                  <span className="corner-sub">Research metric</span>
                </th>
                {cols.map((s) => (
                  <th
                    key={s.slug}
                    scope="col"
                    className="col-school"
                    style={{ ['--brand' as string]: brandOf(s.slug).color }}
                  >
                    <a
                      href={toSchool(s.slug)}
                      onClick={(e) => { e.preventDefault(); navigate(toSchool(s.slug)) }}
                      className="col-school-link"
                    >
                      <SchoolBadge slug={s.slug} name={s.name} size={34} />
                      <span className="col-school-name">{s.name}</span>
                    </a>
                  </th>
                ))}
              </tr>
            </thead>
            {valueMetrics.length > 0 && (
              <tbody>
                <tr className="group-row">
                  <td className="group-label" colSpan={cols.length + 1}>Key stats</td>
                </tr>
                {valueMetrics.map((vm) => (
                  <tr key={vm.key} className="value-row">
                    <th scope="row" className="row-metric">
                      <span className="row-metric-label">{vm.label}</span>
                      {vm.note && <span className="row-metric-note">{vm.note}</span>}
                    </th>
                    {cols.map((s) => {
                      const v = vm.values[s.slug] ?? null
                      return (
                        <td key={s.slug} className={v != null ? 'cell val' : 'cell no'}>
                          {v != null ? (
                            <span className="mark-val">{v}</span>
                          ) : (
                            <span className="mark-na" title="Not available">N/A</span>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            )}
            <tbody>
              {valueMetrics.length > 0 && (
                <tr className="group-row">
                  <td className="group-label" colSpan={cols.length + 1}>Research coverage</td>
                </tr>
              )}
              {metrics.map((m) => (
                <tr key={m.metric.key}>
                  <th scope="row" className="row-metric">
                    <span className="row-metric-label">{m.metric.label}</span>
                    <span className="row-metric-cov">{m.coverage}/{allSchools.length} schools</span>
                  </th>
                  {cols.map((s) => {
                    const has = schoolHasMetric(activeTopic!, s.slug, m.metric.key)
                    return (
                      <td key={s.slug} className={has ? 'cell yes' : 'cell no'}>
                        {has ? (
                          <span className="mark-yes" title="Researched">✓</span>
                        ) : (
                          <span className="mark-na" title="Not available">N/A</span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {cols.length > 0 && (
        <p className="table-note">
          <span className="mark-yes">✓</span> researched for this school ·{' '}
          <span className="mark-na">N/A</span> not in our research yet. Tap a school to read
          the full write-up.
        </p>
      )}
    </div>
  )
}
