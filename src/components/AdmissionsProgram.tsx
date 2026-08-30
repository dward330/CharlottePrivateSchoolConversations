// The "Admissions" research area — the expanded body of the one card on the
// school detail page (see data/admissionsPrograms.ts for the data and the card
// contract).
//
// Recreates the design's Admissions section using the app's own tokens
// (src/index.css) rather than porting its markup, exactly as the Summer
// Programs and After School modules do. The design's Industry tokens map onto
// the app's renamed ones: --color-accent → --accent, --color-accent-900 →
// --accent-900, and .tag-accent / .tag-outline already exist here.
//
// The card is interactive, which is the point of the section: a school does not
// run one admissions process, it runs one per grade band, and a parent only
// ever needs theirs. Picking the band personalizes the whole guide — the
// deadline strip, the ordered stepper, and both watch-outs — so the page shows
// one process rather than three interleaved ones. The cross-band table below is
// the deliberate exception: it exists precisely to show all three at once.
//
// A school running ONE uniform process has a single band, and the selector
// collapses rather than offering a choice of one.
//
// The card ends in a SOURCE row that linkifies any citation carrying a URL —
// the project's citation standard.

import { useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { localizeMoneyText } from '../lib/format.ts'
import { sourceLabel } from '../lib/labels.ts'
import { toAdmissionsChecklist } from '../lib/router.ts'
import type {
  AdBand,
  AdmissionsCardKey,
  AdmissionsGuide,
  AdmissionsProgram,
  AdSource,
} from '../data/admissionsPrograms.ts'

/* ------------------------------------------------------------ primitives -- */

/** The SOURCE row the card ends with. Citations with a URL become links. */
function SourceRow({ sources }: { sources: AdSource[] }) {
  const { t } = useTranslation()
  if (sources.length === 0) return null
  return (
    <div className="as-src srcrow">
      <span className="tag-outline">{t('cardLabels.source')}</span>
      {sources.map((s) =>
        s.url ? (
          <a key={s.label} href={s.url} target="_blank" rel="noreferrer noopener">
            {s.label} ↗
          </a>
        ) : (
          <span key={s.label} className="text-muted">
            {sourceLabel(t, s.label)}
          </span>
        ),
      )}
    </div>
  )
}

/* The design's three framing-rule icons and the aid strip's clock, at the
   Industry system's 1.5px round-capped stroke. Inline rather than in
   TopicGlyph.tsx: that module is the per-TOPIC glyph registry, and these are
   card-internal ornaments. */
function RuleIcon({ children, size = 15 }: { children: ReactNode; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  )
}

/** One icon per framing rule, in the design's order: calendar, clock, info. */
const RULE_ICONS: ReactNode[] = [
  <>
    <rect x="3" y="4" width="18" height="16" />
    <path d="M3 9h18M8 2v4M16 2v4" />
  </>,
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </>,
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" />
  </>,
]

/**
 * Renders `**bold**` spans as <strong>, which is how the design emphasizes the
 * load-bearing phrase inside a watch-out card or the aid strip ("an **earlier
 * calendar**", "due **Jan 22**"). Authoring it in the data as markdown keeps
 * the emphasis a translatable part of the string rather than a structural split
 * the overlay layer would have to reproduce.
 */
function Emphasized({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i}>{localizeMoneyText(part.slice(2, -2))}</strong>
        ) : (
          <span key={i}>{localizeMoneyText(part)}</span>
        ),
      )}
    </>
  )
}

/**
 * The 4-tile deadline strip for the selected band.
 *
 * Values run through localizeMoneyText for the same reason the topic-header
 * tiles do: they are authored US-style and one of them is a currency figure
 * ("$2,500"). A plain date passes through unchanged.
 *
 * A tile flagged `unpublished` carries a constant rather than a published date.
 * It renders identically to a dated tile, deliberately: the school publishes no
 * per-band calendar link to point at, and the tile's own caption already says
 * the date lives on the live calendar.
 */
function DeadlineStrip({ band }: { band: AdBand }) {
  return (
    <div className="ad-deadlines">
      {band.deadlines.map((d) => (
        <div key={d.label} className="ad-deadline">
          <div className="ad-deadline-val">{localizeMoneyText(d.value)}</div>
          <div className="ad-deadline-label">{d.label}</div>
        </div>
      ))}
    </div>
  )
}

/** The ordered application stepper — a numbered square per step, hairline-joined. */
function Stepper({ band }: { band: AdBand }) {
  return (
    <ol className="ad-steps">
      {band.steps.map((s, i) => (
        <li
          key={s.title}
          className={`ad-step${i === band.steps.length - 1 ? ' is-last' : ''}`}
        >
          <span className="ad-step-n" aria-hidden="true">
            {i + 1}
          </span>
          <div className="ad-step-body">
            <div className="ad-step-head">
              <span className="ad-step-title">{s.title}</span>
              <span className={s.tagKind === 'accent' ? 'tag-accent' : 'tag-outline'}>
                {s.tag}
              </span>
            </div>
            <p className="ad-step-detail">
              <Emphasized text={s.detail} />
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}

/**
 * The cross-band comparison table.
 *
 * A row whose `cells` is `{ all }` is identical in every band and renders as
 * one cell spanning every band column — the design's own colspan row.
 */
function ComparisonTable({ guide }: { guide: AdmissionsGuide }) {
  const bands = guide.bands
  return (
    <div className="table-wrap">
      <table className="table ad-table">
        <thead>
          <tr>
            <th scope="col" />
            {bands.map((b) => (
              <th key={b.key} scope="col">
                {b.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {guide.comparison.rows.map((r) => {
            const all = 'all' in r.cells ? r.cells.all : undefined
            return (
              <tr key={r.label}>
                <th scope="row">{r.label}</th>
                {all !== undefined ? (
                  <td colSpan={bands.length} className="ad-cell-all">
                    {localizeMoneyText(all)}
                  </td>
                ) : (
                  bands.map((b) => (
                    <td key={b.key}>
                      {localizeMoneyText((r.cells as Record<string, string>)[b.key] ?? '—')}
                    </td>
                  ))
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

/* ------------------------------------------------------------------ body -- */

/**
 * The Grade-by-Grade Application Guide.
 *
 * Band selection lives in component state rather than the URL, like every other
 * in-card selector on a school page (`activeSlug` and friends). Only the
 * printable checklist route carries the band in a query parameter, because a
 * paper sheet is something you link to and share.
 */
export function AdmissionsGuideBody({ data, slug }: { data: AdmissionsGuide; slug: string }) {
  const { t } = useTranslation()
  const [bandKey, setBandKey] = useState(data.bands[0]?.key ?? '')
  const band = data.bands.find((b) => b.key === bandKey) ?? data.bands[0]
  const single = data.bands.length === 1

  if (!band) return null

  return (
    <div className="as-body ad-body">
      {/* The framing rules — how the process works before any date. */}
      <div className="ad-rules">
        {data.rules.map((r, i) => (
          <div key={r.title} className="ad-rule">
            <span className="ad-rule-icon">
              <RuleIcon>{RULE_ICONS[i % RULE_ICONS.length]}</RuleIcon>
            </span>
            <p className="ad-rule-text">
              <strong>{r.title}</strong> {r.text}
            </p>
          </div>
        ))}
      </div>

      {/* The band selector, collapsed for a school with one uniform process.
          The buttons are JOINED (no gap, shared hairline) and share the row
          equally, which is what makes them read as one segmented control rather
          than three loose buttons. */}
      <div className="ad-pick">
        {!single && (
          <>
            <span className="ad-pick-label">{t('admissions.applyingFor')}</span>
            <div className="ad-bands" role="group" aria-label={t('admissions.applyingFor')}>
              {data.bands.map((b) => (
                <button
                  key={b.key}
                  type="button"
                  className={`ad-band${b.key === band.key ? ' is-on' : ''}`}
                  aria-pressed={b.key === band.key}
                  onClick={() => setBandKey(b.key)}
                >
                  {b.label}
                  <span className="bandsub">{b.sublabel}</span>
                </button>
              ))}
            </div>
          </>
        )}
        <a className="btn primary ad-export" href={toAdmissionsChecklist(slug, band.key)}>
          <RuleIcon>
            <>
              <path d="M12 3v12M7 10l5 5 5-5" />
              <path d="M4 21h16" />
            </>
          </RuleIcon>
          {t('admissions.exportChecklist')}
        </a>
      </div>

      <p className="as-note ad-spine">{data.spineNote}</p>

      <DeadlineStrip band={band} />

      <div className="ad-grid">
        <Stepper band={band} />
        <div className="ad-watch">
          {band.watchOuts.map((w) => (
            <div key={w.kicker} className="ad-watch-card">
              <div className="ad-watch-kicker">{w.kicker}</div>
              <p className="ad-watch-text">
                <Emphasized text={w.text} />
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* The financial-aid clock runs on its own calendar, in parallel with the
          band's — so it sits outside the band-specific block and deep-links to
          the area that owns it. */}
      <div className="ad-aid">
        <span className="ad-aid-icon">
          <RuleIcon size={20}>
            <>
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </>
          </RuleIcon>
        </span>
        <div className="ad-aid-text">
          <div className="ad-aid-title">{data.aid.title}</div>
          <p className="ad-aid-body">
            <Emphasized text={data.aid.text} />
          </p>
        </div>
        <a className="btn ad-aid-btn" href="#topic-financial-aid-tuition">
          {data.aid.button}
          <RuleIcon size={14}>
            <path d="M12 5v14M5 12l7 7 7-7" />
          </RuleIcon>
        </a>
      </div>

      <div className="ad-compare">
        <div className="ad-head">
          <span className="ad-head-kicker">{data.comparison.kicker}</span>
          <h4 className="ad-head-title">{data.comparison.title}</h4>
        </div>
        <ComparisonTable guide={data} />
      </div>

      <div className="ad-contacts">
        {/* Kicker, title and address share ONE baseline row, per the design —
            the address is inline context, not a paragraph under a heading. */}
        <div className="ad-head">
          <span className="ad-head-kicker">{data.contacts.kicker}</span>
          <h4 className="ad-head-title">{data.contacts.title}</h4>
          <span className="ad-address">{data.contacts.address}</span>
        </div>
        {/* --ad-n is the contact count; src/index.css derives the row count from
            it and the breakpoint's column count, because BOTH grid rules are
            painted by the container (a cell cannot draw a rule across the empty
            track a ragged last row leaves). */}
        <div
          className="ad-people"
          style={{ ['--ad-n' as string]: data.contacts.people.length }}
        >
          {data.contacts.people.map((p) => (
            <div key={p.name} className="ad-person">
              <div className="ad-person-name">{p.name}</div>
              <div className="ad-person-detail">{p.detail}</div>
            </div>
          ))}
        </div>
      </div>

      <SourceRow sources={data.sources} />
    </div>
  )
}

/* ------------------------------------------------------------- dispatcher -- */

/**
 * Maps an Admissions card key to its body renderer — the same explicit dispatch
 * the other redesigned areas use, for the same reason: each card is a
 * purpose-built layout rather than a shared prose body. One card today; the
 * switch is what keeps adding a second a local change.
 */
export function AdmissionsCardBody({
  program,
  cardKey,
  slug,
}: {
  program: AdmissionsProgram
  cardKey: AdmissionsCardKey
  slug: string
}) {
  switch (cardKey) {
    case 'guide':
      return <AdmissionsGuideBody data={program.guide!} slug={slug} />
  }
}

/**
 * The topic's 4-tile stat band, rendered above the card.
 *
 * Deliberately NOT from VALUE_METRICS: the school-page stat band and the
 * Compare table's Key Stats rows are the same array filtered by topic, so
 * adding rows there would ship the Compare surface the user deferred for this
 * area (2026-08-30). These four figures therefore live in the topic's own data
 * and render with the same .stat-strip / .stat-tile classes, so the band is
 * visually identical to every other topic's.
 *
 * localizeMoneyText for the same reason SchoolDetail's own strip uses it — one
 * of these tiles is "$2,500", and a figure must not render US-style beside a
 * localized one.
 */
export function AdmissionsStatBand({ program }: { program: AdmissionsProgram }) {
  const stats = program.guide?.stats ?? []
  if (stats.length === 0) return null
  return (
    <div className="stat-strip">
      {stats.map((s) => (
        <div key={s.label} className="stat-tile">
          <div className="stat-tile-val">{localizeMoneyText(s.value)}</div>
          <div className="stat-tile-label">{s.label}</div>
        </div>
      ))}
    </div>
  )
}
