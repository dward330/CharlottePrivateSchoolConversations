import { localizeMoneyText } from '../lib/format.ts'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { topicLabel, metricLabel } from '../lib/labels.ts'
import {
  schools as allSchools,
  topics,
  topicBySlug,
  brandOf,
  metricsForTopic,
  schoolHasMetric,
} from '../lib/manifest.ts'
import { SchoolBadge } from '../components/SchoolBadge.tsx'
import { BlueprintCorners } from '../components/BlueprintCorners.tsx'
import { toCompare, toSchool, toHome, useNavigate } from '../lib/router.ts'
import { valueMetricsForTopic, loadMetricValuesOverlay } from '../data/metricValues.ts'

type Props = { topic: string | null; schools: string[] }

function CheckIcon() {
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
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

/* Numeric reading of a display value ("17" -> 17, "6:00 PM" -> 6, null -> null)
   used only to pick the row's standout cell. */
function numericOf(v: string | null | undefined): number | null {
  if (v == null) return null
  const n = parseFloat(v.replace(/[^0-9.-]/g, ''))
  return Number.isFinite(n) ? n : null
}

export function Compare({ topic, schools }: Props) {
  const { t, i18n } = useTranslation()
  const lang = i18n.resolvedLanguage ?? 'en'
  // Warm the stat-tile overlay; a re-render follows when it lands, and English
  // stands in until then.
  const [, setOverlayReady] = useState(0)
  useEffect(() => {
    let alive = true
    void loadMetricValuesOverlay(lang).then(() => alive && setOverlayReady((n) => n + 1))
    return () => {
      alive = false
    }
  }, [lang])
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
  const valueMetrics = activeTopic ? valueMetricsForTopic(activeTopic, lang) : []
  const cols = allSchools.filter((s) => selected.includes(s.slug))

  return (
    <div className="page">
      <a className="back" href={toHome()} onClick={(e) => { e.preventDefault(); navigate(toHome()) }}>
        {t('compare.backHome')}
      </a>
      <h1 className="compare-title">{t('compare.title')}</h1>
      <p className="compare-sub">{t('compare.sub', { count: allSchools.length })}</p>

      <div className="controls">
        <fieldset className="control">
          <legend>{t('compare.topicLegend')}</legend>
          <div className="pill-row">
            {topics.map((topic) => (
              <button
                key={topic.slug}
                type="button"
                className={`pill ${topic.slug === activeTopic ? 'on' : ''}`}
                aria-pressed={topic.slug === activeTopic}
                onClick={() => setTopic(topic.slug)}
              >
                {topicLabel(t, topic.slug, topic.name)}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="control">
          <legend>{t('compare.schoolsLegend', { selected: selected.length, total: allSchools.length })}</legend>
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
          <p className="control-hint">{t('compare.schoolsHint')}</p>
        </fieldset>
      </div>

      {cols.length === 0 ? (
        <p className="empty">{t('compare.empty')}</p>
      ) : (
        <div className="table-frame">
          <BlueprintCorners />
          <div className="table-wrap" role="region" aria-label={t('compare.tableAria')} tabIndex={0}>
            <table className="compare">
              <thead>
                <tr>
                  <th className="corner" scope="col">
                    <span className="corner-label">{topicLabel(t, activeTopic ?? '', topicBySlug(activeTopic ?? '')?.name ?? '')}</span>
                    <span className="corner-sub">{t('compare.researchMetric')}</span>
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
                        <SchoolBadge slug={s.slug} name={s.name} size={40} />
                        <span className="col-school-name">{s.name}</span>
                      </a>
                    </th>
                  ))}
                </tr>
              </thead>
              {valueMetrics.length > 0 && (
                <tbody>
                  <tr className="group-row">
                    <td className="group-label" colSpan={cols.length + 1}>{t('compare.keyStats')}</td>
                  </tr>
                  {valueMetrics.map((vm) => {
                    // Highlight the best value only when there's a real spread.
                    const nums = cols.map((s) => numericOf(vm.values[s.slug]))
                    const present = nums.filter((n): n is number => n != null)
                    const max =
                      cols.length > 1 && present.length > 1 && Math.min(...present) !== Math.max(...present)
                        ? Math.max(...present)
                        : null
                    return (
                      <tr key={vm.key} className="value-row">
                        <th scope="row" className="row-metric">
                          <span className="row-metric-label">{vm.label}</span>
                          {vm.note && <span className="row-metric-note">{vm.note}</span>}
                        </th>
                        {cols.map((s, i) => {
                          const v = vm.values[s.slug] ?? null
                          const lead = max != null && nums[i] === max
                          return (
                            <td
                              key={s.slug}
                              className={v != null ? `cell val${lead ? ' lead' : ''}` : 'cell no'}
                              style={{ ['--brand' as string]: brandOf(s.slug).color }}
                            >
                              {v != null ? (
                                <span className="mark-val">{localizeMoneyText(v)}</span>
                              ) : (
                                <span className="mark-na" title={t('compare.notAvailable')}>{t('compare.na')}</span>
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                </tbody>
              )}
              <tbody>
                {valueMetrics.length > 0 && (
                  <tr className="group-row">
                    <td className="group-label" colSpan={cols.length + 1}>{t('compare.researchCoverage')}</td>
                  </tr>
                )}
                {metrics.map((m) => (
                  <tr key={m.metric.key}>
                    <th scope="row" className="row-metric">
                      <span className="row-metric-label">{metricLabel(t, m.metric.key, m.metric.label)}</span>
                      <span className="row-metric-cov">{t('compare.coverage', { count: m.coverage, total: allSchools.length })}</span>
                    </th>
                    {cols.map((s) => {
                      const has = schoolHasMetric(activeTopic!, s.slug, m.metric.key)
                      return (
                        <td key={s.slug} className={has ? 'cell yes' : 'cell no'}>
                          {has ? (
                            <span className="mark-check" title={t('compare.researched')}><CheckIcon /></span>
                          ) : (
                            <span className="mark-na" title={t('compare.notAvailable')}>{t('compare.na')}</span>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {cols.length > 0 && (
        <p className="table-note">
          <span className="mark-check"><CheckIcon /></span> {t('compare.footnote')}{' '}
          <span className="mark-na">{t('compare.na')}</span> {t('compare.footnoteRest')}
        </p>
      )}
    </div>
  )
}
