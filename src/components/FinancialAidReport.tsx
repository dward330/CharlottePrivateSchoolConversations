// The structured Financial Aid & Tuition deep-dive, replacing the generic prose
// card for this one topic. Recreates the "Financial Aid & Tuition.dc.html"
// design reference using the app's own tokens (src/index.css).
//
// Every figure block is optional — a school renders only what its source report
// actually supports (see src/data/financialAidReports.ts for why).

import { useTranslation } from 'react-i18next'
import { SourceRowRaw } from './SourceRow.tsx'
import { money, localizeMoneyText } from '../lib/format.ts'
import { reportSources } from '../lib/labels.ts'
import type {
  CostComponent,
  FinancialAidReport as Report,
  InfoBox,
  ReportSection,
  TuitionBand,
} from '../data/financialAidReports.ts'

/* Source text carries **bold** spans. Rendering them as real <strong> keeps the
   emphasis the reports rely on without pulling in a markdown dependency.

   Every segment also goes through localizeMoneyText. This is the topic where it
   matters most — the financial-aid report is almost entirely dollar figures, and
   without it a French or Spanish reader sees "3 250 000 $US" in a stat tile and
   "$3.25M" in the sentence explaining it. Same figure, one page, two shapes. */
function RichText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g)
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1
          ? <strong key={i}>{localizeMoneyText(part)}</strong>
          : localizeMoneyText(part),
      )}
    </>
  )
}

function Icon({ name, size = 15 }: { name: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    info: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </>
    ),
    book: (
      <>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </>
    ),
    check: <path d="M20 6L9 17l-5-5" />,
    x: <path d="M18 6L6 18M6 6l12 12" />,
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={name === 'check' || name === 'x' ? 2 : 1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  )
}



/* ------------------------------------------------------------ figure blocks */

/** Paired horizontal bars: ghost = prior year (only where published), fill = current. */
function TuitionChart({
  bands,
  caption,
  note,
  note2,
}: {
  bands: TuitionBand[]
  caption?: string
  note?: string
  note2?: string
}) {
  const { t } = useTranslation()
  const max = Math.max(...bands.map((b) => Math.max(b.amount, b.prior ?? 0)))
  const anyPrior = bands.some((b) => b.prior != null)
  return (
    <figure className="fa-figure">
      {caption && (
        <figcaption className="fa-figcaption">
          <span className="fa-figure-title">{localizeMoneyText(caption)}</span>
          {anyPrior && (
            <span className="fa-legend">
              <span className="fa-legend-ghost" />
              {t('finAid.priorYear')}
              <span className="fa-legend-fill" />
              {t('finAid.current')}
            </span>
          )}
        </figcaption>
      )}
      {note2 && <p className="fa-note fa-note-top">{localizeMoneyText(note2)}</p>}
      <div className="fa-bars">
        {bands.map((b) => (
          <div key={b.label} className="fa-bar-row">
            <span className="fa-bar-label">{b.label}</span>
            <span className="fa-bar-track">
              {b.prior != null && (
                <span
                  className="fa-bar-ghost"
                  style={{ width: `${(b.prior / max) * 100}%` }}
                />
              )}
              <span
                className="fa-bar-fill"
                style={{ width: `${(b.amount / max) * 100}%` }}
              />
            </span>
            <span className="fa-bar-value">
              {money(b.amount)}
              {b.delta && <span className="fa-bar-delta">{b.delta}</span>}
            </span>
          </div>
        ))}
      </div>
      {note && <p className="fa-note">{localizeMoneyText(note)}</p>}
    </figure>
  )
}

/** A published min–max band drawn on a shared $0–max scale. */
function RangeChart({
  ranges,
  max,
  caption,
  note,
}: {
  ranges: { label: string; min: number; max: number }[]
  max: number
  caption?: string
  note?: string
}) {
  return (
    <figure className="fa-figure">
      {caption && (
        <figcaption className="fa-figcaption">
          <span className="fa-figure-title">{localizeMoneyText(caption)}</span>
        </figcaption>
      )}
      <div className="fa-ranges">
        {ranges.map((r) => {
          const left = (r.min / max) * 100
          const width = ((r.max - r.min) / max) * 100
          // Past ~62% the label would overflow the track, so flip it inside.
          const flip = left + width > 62
          return (
            <div key={r.label} className="fa-range-row">
              <span className="fa-bar-label">{r.label}</span>
              <span className="fa-range-track">
                <span
                  className="fa-range-seg"
                  style={{ left: `${left}%`, width: `${width}%` }}
                />
                <span
                  className={`fa-range-label${flip ? ' flip' : ''}`}
                  style={flip ? { right: '6px' } : { left: `${left + width + 2}%` }}
                >
                  {money(r.min)}–{money(r.max)}
                </span>
              </span>
            </div>
          )
        })}
      </div>
      {note && <p className="fa-note">{localizeMoneyText(note)}</p>}
    </figure>
  )
}

/** Gift level / coverage ladder — a proportional fill per rung. */
function Ladder({
  rungs,
  caption,
  note,
  note2,
}: {
  rungs: { gift: string; share: number; detail: string }[]
  caption?: string
  note?: string
  note2?: string
}) {
  return (
    <figure className="fa-figure">
      {caption && (
        <figcaption className="fa-figcaption">
          <span className="fa-figure-title">{localizeMoneyText(caption)}</span>
        </figcaption>
      )}
      {note2 && <p className="fa-note fa-note-top">{localizeMoneyText(note2)}</p>}
      <div className="fa-ladder">
        {rungs.map((r) => (
          <div key={r.gift} className="fa-ladder-row">
            <span className="fa-ladder-gift">{localizeMoneyText(r.gift)}</span>
            <span className="fa-ladder-track">
              <span className="fa-ladder-fill" style={{ width: `${r.share}%` }} />
            </span>
            <span className="fa-ladder-detail">
              <strong>{r.share}%</strong> {r.detail}
            </span>
          </div>
        ))}
      </div>
      {note && <p className="fa-note">{localizeMoneyText(note)}</p>}
    </figure>
  )
}

/** Diamond-node timeline; the decision point renders solid. */
function Timeline({ nodes }: { nodes: { when: string; detail: string; emphasis?: boolean }[] }) {
  return (
    <div className="fa-timeline-box">
      <div className="fa-timeline" style={{ ['--fa-nodes' as string]: nodes.length }}>
        <span className="fa-timeline-rule" aria-hidden="true" />
        {nodes.map((n) => (
          <div key={n.when} className="fa-timeline-node">
            <span className={`fa-node${n.emphasis ? ' on' : ''}`} />
            <span className="fa-node-when">{n.when}</span>
            <span className="fa-node-detail">
              <RichText text={n.detail} />
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

const COMPONENT_GLYPH: Record<CostComponent['status'], React.ReactNode> = {
  priced: <Icon name="check" size={12} />,
  range: <span className="fa-tilde">~</span>,
  unpriced: <Icon name="x" size={12} />,
}

function ComponentGrid({
  components,
  title,
  aside,
  note,
}: {
  components: CostComponent[]
  title?: string
  aside?: string
  note?: string
}) {
  return (
    <div className="fa-box">
      {(title || aside) && (
        <div className="fa-box-head">
          {title && <span className="fa-figure-title">{title}</span>}
          {aside && <span className="fa-box-aside">{aside}</span>}
        </div>
      )}
      <div className="fa-components">
        {components.map((c) => (
          <div key={c.label} className={`fa-component ${c.status}`}>
            <span className="fa-component-glyph">{COMPONENT_GLYPH[c.status]}</span>
            {c.label}
          </div>
        ))}
      </div>
      {note && <p className="fa-note">{localizeMoneyText(note)}</p>}
    </div>
  )
}

function Boxes({ boxes, bullets }: { boxes: InfoBox[]; bullets?: string[] }) {
  return (
    <>
      {boxes.map((box, i) => (
        <div key={i} className="fa-box">
          {(box.tag || box.title) && (
            <div className="fa-box-head">
              {box.tag && <span className="tag-outline">{box.tag}</span>}
              {box.title && <span className="fa-box-title">{box.title}</span>}
            </div>
          )}
          {box.body && (
            <p className="fa-box-body">
              <RichText text={box.body} />
            </p>
          )}
          {/* Bullets belong to the first box, where the source gives a list. */}
          {i === 0 && bullets && bullets.length > 0 && (
            <ul className="fa-bullets">
              {bullets.map((b) => (
                <li key={b}>
                  <span className="fa-bullet-mark" />
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </>
  )
}

/**
 * A section's source line. The optional `label` this used to take is gone with
 * the SOURCE chip it labelled — no caller ever passed one, and the toggle now
 * carries the wording.
 */
function SourceRow({ text }: { text: string }) {
  return (
    <SourceRowRaw className="fa-srcrow">
      <span className="fa-src-text">{text}</span>
    </SourceRowRaw>
  )
}

/* ----------------------------------------------------------------- section */

/** Which layout a section uses is driven by which blocks its data supplies. */
function Section({ section, index }: { section: ReportSection; index: number }) {
  const { t } = useTranslation()
  const {
    bands,
    ranges,
    rangeMax,
    ladder,
    components,
    timeline,
    plans,
    stats,
    questions,
    boxes,
    bullets,
    source,
  } = section

  const hasFigure = !!(bands || (ranges && rangeMax) || ladder)
  const hasSide = !!(boxes?.length || source)
  /** Does the question checklist have anything to sit beside? */
  const hasAside = !!(stats?.length || boxes?.length)

  const figure = bands ? (
    <TuitionChart
      bands={bands}
      caption={section.figureCaption}
      note={section.figureNote}
      note2={section.figureNote2}
    />
  ) : ranges && rangeMax ? (
    <RangeChart
      ranges={ranges}
      max={rangeMax}
      caption={section.figureCaption}
      note={section.figureNote}
    />
  ) : ladder ? (
    <Ladder
      rungs={ladder}
      caption={section.figureCaption}
      note={section.figureNote}
      note2={section.figureNote2}
    />
  ) : null

  return (
    <section id={section.id} className="fa-section">
      <div className="fa-section-head">
        <span className="fa-kicker">
          {t('finAid.section', { n: String(index + 1).padStart(2, '0') })}
        </span>
        <h4>{section.title}</h4>
        {section.note && <span className="fa-section-note">{section.note}</span>}
        {section.tag && <span className="tag-accent">{section.tag}</span>}
      </div>

      {timeline && <Timeline nodes={timeline} />}

      {/* Figure + side rail, where both exist; otherwise each spans full width. */}
      {hasFigure && (
        <div className={hasSide && !timeline ? 'fa-split' : ''}>
          {figure}
          {hasSide && !timeline && (
            <div className="fa-side">
              {boxes && <Boxes boxes={boxes} bullets={bullets} />}
              {source && <SourceRow text={source} />}
            </div>
          )}
        </div>
      )}

      {components && (
        <ComponentGrid
          components={components}
          title={section.componentsTitle}
          aside={section.componentsAside}
          note={section.componentsNote}
        />
      )}

      {plans && (
        <div className="fa-plans">
          {plans.map((p) => (
            <div key={p.label} className={`fa-plan${p.emphasis ? ' on' : ''}`}>
              <div className="fa-plan-figure">{localizeMoneyText(p.figure)}</div>
              <div className="fa-plan-label">{p.label}</div>
              <div className="fa-plan-detail">
                <RichText text={p.detail} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Section 06 pairs a stat strip + boxes against the question checklist.
          A section that carries questions but NEITHER stats nor boxes has an
          empty left column, so the checklist spans the full width instead of
          being pinned right beside dead space. */}
      {questions ? (
        <div className={hasAside ? 'fa-split fa-split-wide' : undefined}>
          {hasAside && (
            <div className="fa-side">
              {stats && (
                <div className="stat-strip fa-stats">
                  {stats.map((s) => (
                    <div key={s.label} className="stat-tile">
                      <div className="stat-tile-val">{localizeMoneyText(s.value)}</div>
                      <div className="stat-tile-label">{s.label}</div>
                    </div>
                  ))}
                </div>
              )}
              {boxes && <Boxes boxes={boxes} />}
            </div>
          )}
          <div className="fa-box">
            {section.questionsTitle && (
              <div className="fa-figure-title">{section.questionsTitle}</div>
            )}
            {section.questionsNote && (
              <p className="fa-note fa-note-top">{section.questionsNote}</p>
            )}
            <ol className="fa-questions">
              {questions.map((q, i) => (
                <li key={q}>
                  <span className="fa-q">{t('finAid.question', { n: i + 1 })}</span>
                  {q}
                </li>
              ))}
            </ol>
          </div>
        </div>
      ) : (
        <>
          {/* Stats without a question list (e.g. an all-in estimate). */}
          {stats && !hasFigure && (
            <div className="stat-strip fa-stats">
              {stats.map((s) => (
                <div key={s.label} className="stat-tile">
                  <div className="stat-tile-val">{localizeMoneyText(s.value)}</div>
                  <div className="stat-tile-label">{s.label}</div>
                </div>
              ))}
            </div>
          )}
          {/* Boxes not already placed in the figure's side rail. */}
          {(timeline || !hasFigure) && boxes && (
            <div className={`fa-boxrow${boxes.length > 1 ? ' multi' : ''}`}>
              <Boxes boxes={boxes} bullets={bullets} />
            </div>
          )}
          {(timeline || !hasFigure) && source && <SourceRow text={source} />}
        </>
      )}
    </section>
  )
}

/* -------------------------------------------------------------------- card */

export function FinancialAidReportCard({
  report,
  onCollapse,
}: {
  report: Report
  onCollapse?: () => void
}) {
  const { t } = useTranslation()
  const jump = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="fa-report">
      <header className="fa-report-head">
        <h3>{report.title}</h3>
        <span className="fa-report-meta">{report.meta}</span>
        {onCollapse && (
          <button
            type="button"
            className="fa-close"
            onClick={onCollapse}
            aria-label={t('school.collapseReport')}
          >
            <Icon name="x" size={15} />
          </button>
        )}
      </header>

      <div className="fa-framing">
        {report.framing.map((f) => (
          <div key={f.title} className="fa-framing-item">
            <span className="fa-framing-icon">
              <Icon name={f.icon} />
            </span>
            <p>
              <strong>{f.title}</strong> {f.body}
            </p>
          </div>
        ))}
      </div>

      <nav className="fa-contents" aria-label={t('tables.reportSectionsAria')}>
        {report.sections.map((s, i) => (
          <a key={s.id} href={`#${s.id}`} onClick={(e) => jump(e, s.id)}>
            <span className="fa-contents-title">
              <span className="fa-contents-num">{String(i + 1).padStart(2, '0')}</span>
              {s.navTitle}
            </span>
            <span className="fa-meter">
              <span className="fa-meter-track">
                <span className="fa-meter-fill" style={{ width: `${s.confidence}%` }} />
              </span>
              <span className="fa-meter-pct">{s.confidence}%</span>
            </span>
          </a>
        ))}
      </nav>
      <p className="fa-contents-caption">{t('finAid.metersCaption')}</p>

      {report.sections.map((s, i) => (
        <Section key={s.id} section={s} index={i} />
      ))}

      <SourceRowRaw className="fa-sources">
        <span className="fa-src-text">{reportSources(t, report.sources)}</span>
      </SourceRowRaw>
    </div>
  )
}
