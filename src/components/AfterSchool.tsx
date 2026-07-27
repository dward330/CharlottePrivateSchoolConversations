// The "After School" research area — the expanded bodies of the four redesigned
// cards on the school detail page (see data/afterSchool.ts for the data and the
// card contract).
//
// Recreates the design's "After School Section Redesign" using the app's own
// tokens (src/index.css). Each exported *Body component is the inside of one
// card; SchoolDetail owns the <details> shell, so these render only content.
//
// Two of the four cards are interactive, which is the point of the redesign:
//
//  - The Cost Planner is a pricing matrix you *use*. Click a grade × pickup-slot
//    row and a days-per-week column and the panel answers the actual question —
//    what this costs per month, across the school year, and per afternoon.
//  - The Enrichment catalog filters by day and grade and searches name +
//    description, highlighting the matched characters in place.
//
// Every card ends in a SOURCE row built by <SourceRow>, which linkifies any
// citation carrying a URL — the project's citation standard.
//
// Every sub-block is individually optional. A school that publishes no daily
// schedule simply has an empty `rhythm` array and the strip is not drawn; a
// school with no data for a whole card is absent from its program entry and the
// card never renders. Nothing here fills a gap with placeholder content — where
// a figure is modeled rather than published it carries an EST. tag, and where a
// school publishes nothing at all the card says so in a PUBLICATION GAP flag.

import { useMemo, useState } from 'react'
import type {
  AfterSchoolProgram,
  AsFlag,
  AsFlagKind,
  AsSource,
  Cost,
  Coverage,
  DayInside,
  EnrichmentClass,
  Verdict,
} from '../data/afterSchool.ts'

/* ------------------------------------------------------------ primitives -- */

/** The SOURCE row every card ends with. Citations with a URL become links. */
function SourceRow({ sources }: { sources: AsSource[] }) {
  if (sources.length === 0) return null
  return (
    <div className="as-src srcrow">
      <span className="tag-outline">SOURCE</span>
      {sources.map((s) =>
        s.url ? (
          <a key={s.label} href={s.url} target="_blank" rel="noreferrer noopener">
            {s.label} ↗
          </a>
        ) : (
          <span key={s.label} className="text-muted">
            {s.label}
          </span>
        ),
      )}
    </div>
  )
}

/** Default chip wording per flag kind; `label` overrides it per flag. */
const FLAG_LABEL: Record<AsFlagKind, string> = {
  verify: 'TO VERIFY',
  estimate: 'EST.',
  gap: 'PUBLICATION GAP',
  stale: 'STALE',
}

/**
 * Evidence qualifiers: TO VERIFY / EST. / PUBLICATION GAP / STALE.
 *
 * All of these render, as in College Support — in this area the qualifier IS the
 * parent-facing content. "This school does not publish its after-school rates"
 * is one of the most decision-relevant facts on the page, and two of the six
 * schools here are in exactly that position.
 */
function Flags({ flags }: { flags: AsFlag[] }) {
  if (flags.length === 0) return null
  return (
    <>
      {flags.map((f) => (
        <p key={f.text} className="as-flag text-muted">
          <span className="as-flag-tag tag-neutral">
            {f.label ?? FLAG_LABEL[f.kind]}
          </span>
          <span>
            <RichText text={f.text} />
          </span>
        </p>
      ))}
    </>
  )
}

function Lead({ headline, subhead }: { headline: string; subhead?: string }) {
  return (
    <p className="as-lead">
      <strong>{headline}</strong>
      {subhead && <span className="text-muted"> {subhead}</span>}
    </p>
  )
}

/** A section heading inside a card body, with an optional muted qualifier. */
function Heading({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <div className="as-h">
      {children}
      {hint && <span className="as-h-hint text-muted"> {hint}</span>}
    </div>
  )
}

/**
 * Render `**bold**` spans inside otherwise plain data strings.
 *
 * Same contract as the College Support area: the design leads several list rows
 * with an emphasized figure, and carrying that as markdown keeps the per-school
 * data files readable and diffable against the research notes they are
 * transcribed from. Split on the delimiter rather than injecting HTML.
 */
function RichText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/gs)
  return (
    <>
      {parts.map((part, i) =>
        // Odd indices are the captured groups — i.e. what was inside the **…**.
        i % 2 === 1 ? <strong key={i}>{part}</strong> : part,
      )}
    </>
  )
}

/* -------------------------------------------------- 1a · the coverage map -- */

/**
 * The dismissal-to-6:00 timeline.
 *
 * Each division's band is positioned by fractions of the timeline window rather
 * than by pixel offsets, so a school dismissing at 1:00 and one dismissing at
 * 3:10 stay honestly proportional to the same clock. An uncovered division still
 * gets a row — drawn as a dashed outline — because the gap is the finding.
 */
export function CoverageBody({ data }: { data: Coverage }) {
  return (
    <div className="as-body">
      <Lead headline={data.headline} subhead={data.subhead} />

      <div className="as-timeline">
        <div className="as-tl-row as-tl-head">
          <span />
          <div className="as-tl-hours text-muted">
            {data.hours.map((h) => (
              <span key={h}>{h}</span>
            ))}
          </div>
        </div>

        {data.rows.map((r) => (
          <div key={r.division} className="as-tl-row">
            <div className="as-tl-label">
              <strong>{r.division}</strong>
              <br />
              <span className="text-muted">{r.dismissal}</span>
            </div>
            <div className="as-tl-track">
              <div
                className={r.uncovered ? 'as-tl-band is-uncovered' : 'as-tl-band'}
                style={{
                  left: `${r.startFrac * 100}%`,
                  width: `${(r.endFrac - r.startFrac) * 100}%`,
                }}
              >
                {r.tiers.length === 0 ? (
                  <span className="as-tl-tier is-flat">{r.flatLabel}</span>
                ) : (
                  r.tiers.map((t, i) => {
                    /* Tier widths are the gaps between successive tier ends,
                       expressed as a share of the band — so the bar reads as a
                       real clock even though each tier is drawn relatively. */
                    const prevEnd = i === 0 ? r.startFrac : r.tiers[i - 1].endFrac
                    const span = (t.endFrac - prevEnd) / (r.endFrac - r.startFrac)
                    return (
                      <span
                        key={t.until}
                        className={i === r.tiers.length - 1 ? 'as-tl-tier is-last' : 'as-tl-tier'}
                        style={{ width: `${span * 100}%` }}
                      >
                        to {t.until}
                        {t.price && ` · ${t.price}`}
                        {t.estimated && <span className="as-inline-tag tag-neutral">EST.</span>}
                      </span>
                    )
                  })
                )}
              </div>
            </div>
          </div>
        ))}

        {data.summer && (
          <div className="as-tl-row">
            <span />
            <div className="as-summer">
              <span className="as-summer-chip tag-accent">{data.summer.season}</span>
              <span>
                <RichText text={data.summer.text} />
              </span>
            </div>
          </div>
        )}
      </div>

      {data.facts.length > 0 && (
        <div className="as-facts">
          {data.facts.map((f) => (
            <span key={f.label}>
              <strong>{f.label}:</strong> <RichText text={f.text} />
            </span>
          ))}
        </div>
      )}

      <Flags flags={data.flags} />
      <SourceRow sources={data.sources} />
    </div>
  )
}

/* --------------------------------------------------- 1b · the cost planner -- */

/**
 * The interactive pricing matrix.
 *
 * The whole point of promoting this card out of the In-Depth Report is that a
 * published rate table doesn't answer a parent's question on its own — "$135" is
 * meaningless until you know it is per month, for three afternoons a week, and
 * therefore $1,215 across the year. Selecting a row and a column and doing that
 * arithmetic in the panel is the card.
 *
 * Cells the school does not publish are `null` and render "—". They are never
 * interpolated from neighbours, and selecting one shows "not published" rather
 * than a number, so the planner can't invent a total.
 */
export function CostBody({ data }: { data: Cost }) {
  const [rowId, setRowId] = useState(data.defaultRow)
  const [days, setDays] = useState(data.defaultDays)

  const row = data.rows.find((r) => r.id === rowId) ?? data.rows[0]
  const price = row.prices[days - 1]
  /* A cell is "estimated" when its column is not verified — the per-column flag
     is how a school with a published 1-day column but modeled multi-day columns
     is represented. */
  const estimated = !data.columnsVerified[days - 1]

  const money = (n: number) => `$${n.toLocaleString()}`
  const periodTotal = price == null ? null : price * data.periods
  /* Per-afternoon divides the billing period into weeks — 4.33 weeks a month,
     ~18 a semester, or ~36 across a school year — times the days per week
     actually attended. */
  const weeksPerPeriod =
    data.basis === 'monthly' ? 4.33 : data.basis === 'semester' ? 18 : 36
  const perAfternoon =
    price == null ? null : Math.round(price / (weeksPerPeriod * days))
  /* The unit beside the headline figure, and whether a separate school-year line
     adds anything: an annual contract IS the school-year total, so repeating it
     would just print the same number twice. */
  const unitLabel =
    data.basis === 'monthly' ? '/ month' : data.basis === 'semester' ? '/ semester' : '/ year'
  const showPeriodTotal = data.basis !== 'annual'

  /* A school publishing only a row or two (Cannon has exactly one) can't fill
     the estimate rail's height, so the fee ledger drops out of the rail and
     under the table instead, and the two columns even out rather than leaving a
     tall blank gap beside a one-line matrix. */
  const isShort = data.rows.length <= 3
  const feeLedger = data.fees.length > 0 && (
    <div className="as-fees">
      <div className="as-fees-kicker text-muted">Fees &amp; fine print</div>
      <div className="as-fees-list">
        {data.fees.map((f) =>
          f.note ? (
            <p key={f.label} className="as-fee-note text-muted">
              <RichText text={f.label} />
            </p>
          ) : (
            <div key={f.label} className="as-fee">
              <span>{f.label}</span>
              <strong>{f.value}</strong>
            </div>
          ),
        )}
      </div>
    </div>
  )

  return (
    <div className="as-body">
      <Lead headline={data.headline} subhead={data.subhead} />

      <div className={`as-cost${isShort ? ' is-short' : ''}`}>
        <div className="as-cost-matrix">
          <div className="as-daysel">
            <span className="as-daysel-label text-muted">Days / week</span>
            <div className="as-filters">
              {[1, 2, 3, 4, 5].map((d) => (
                <button
                  key={d}
                  type="button"
                  className={`as-filter${days === d ? ' is-active' : ''}`}
                  onClick={() => setDays(d)}
                  aria-pressed={days === d}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="as-table-wrap">
            <table className="as-table">
              <thead>
                <tr>
                  <th className="as-th as-th-row">
                    Grade · pickup slot (
                    {data.basis === 'monthly'
                      ? 'monthly'
                      : data.basis === 'semester'
                        ? 'per semester'
                        : 'per year'}
                    )
                  </th>
                  {[1, 2, 3, 4, 5].map((d) => (
                    <th
                      key={d}
                      className={`as-th as-th-day${days === d ? ' is-active' : ''}`}
                    >
                      {d} day{d > 1 ? 's' : ''}
                      <br />
                      <span className="as-th-note text-muted">
                        {data.columnsVerified[d - 1] ? 'VERIFIED' : 'EST.'}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.rows.map((r) => (
                  <tr
                    key={r.id}
                    className={r.id === rowId ? 'is-selected' : undefined}
                    onClick={() => setRowId(r.id)}
                  >
                    <th scope="row" className="as-td as-td-row">
                      <button
                        type="button"
                        className="as-rowbtn"
                        aria-pressed={r.id === rowId}
                      >
                        {r.label}
                      </button>
                    </th>
                    {r.prices.map((p, i) => (
                      <td
                        key={i}
                        className={`as-td as-td-price${days === i + 1 ? ' is-active' : ''}`}
                      >
                        {p == null ? <span className="text-muted">—</span> : money(p)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isShort && feeLedger}
        </div>

        <div className="as-cost-side">
          <div className="as-estimate">
            <div className="as-estimate-kicker text-muted">Your estimate</div>
            <div className="as-estimate-row">{row.panelLabel}</div>
            <div className="as-estimate-days text-muted">
              {days} day{days > 1 ? 's' : ''} / week, until pickup
            </div>
            {price == null ? (
              <p className="as-estimate-gap text-muted">
                The school does not publish a rate for this combination.
              </p>
            ) : (
              <>
                <div className="as-estimate-big">
                  <span className="as-estimate-val">{money(price)}</span>
                  <span className="text-muted">{unitLabel}</span>
                </div>
                <div className="as-estimate-lines">
                  {showPeriodTotal && (
                    <div>
                      <span className="text-muted">School year ({data.periodsLabel})</span>
                      <strong>{money(periodTotal!)}</strong>
                    </div>
                  )}
                  {/* A flat-rate row has no per-afternoon figure to give: dividing
                      one published fee by a days-per-week choice the school does
                      not price against would invent a rate. */}
                  {row.flatRate ? (
                    <div>
                      <span className="text-muted">Days per week</span>
                      <strong>flat rate</strong>
                    </div>
                  ) : (
                    <div>
                      <span className="text-muted">≈ per afternoon</span>
                      <strong>{money(perAfternoon!)}</strong>
                    </div>
                  )}
                </div>
                {estimated && (
                  <p className="as-estimate-est">
                    <span className="tag-neutral">EST. — uses a modeled rate</span>
                  </p>
                )}
              </>
            )}
          </div>

          {data.aside && (
            <div className="as-aside">
              <strong>{data.aside.title}</strong> <RichText text={data.aside.text} />
            </div>
          )}

          {!isShort && feeLedger}
        </div>
      </div>

      <Flags flags={data.flags} />
      <SourceRow sources={data.sources} />
    </div>
  )
}

/* ------------------------------------------ 1c · a day inside + enrichment -- */

/**
 * Highlight every occurrence of `q` inside `text`.
 *
 * The design highlights matched characters in place rather than just filtering
 * the list, so a parent searching "cook" can see *why* a row matched when the
 * hit is in the description rather than the title. Returns nodes, not HTML.
 */
function highlight(text: string, q: string): React.ReactNode {
  if (!q) return text
  const lower = text.toLowerCase()
  const ql = q.toLowerCase()
  const parts: React.ReactNode[] = []
  let i = 0
  let idx = lower.indexOf(ql, i)
  while (idx !== -1) {
    if (idx > i) parts.push(text.slice(i, idx))
    parts.push(
      <mark key={idx} className="as-mark">
        {text.slice(idx, idx + q.length)}
      </mark>,
    )
    i = idx + q.length
    idx = lower.indexOf(ql, i)
  }
  if (parts.length === 0) return text
  if (i < text.length) parts.push(text.slice(i))
  return parts
}

/** The filterable, searchable enrichment catalog. */
function EnrichmentCatalog({ data }: { data: DayInside }) {
  const [day, setDay] = useState('All')
  const [grade, setGrade] = useState('All')
  const [query, setQuery] = useState('')

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    return data.classes.filter((c: EnrichmentClass) => {
      const dayOk = day === 'All' || (c.days ? c.days.includes(day) : c.day === day)
      const gradeOk = grade === 'All' || c.grades.includes(grade)
      const qOk =
        q === '' ||
        c.name.toLowerCase().includes(q) ||
        c.desc.toLowerCase().includes(q)
      return dayOk && gradeOk && qOk
    })
  }, [data.classes, day, grade, query])

  const q = query.trim()

  return (
    <div>
      <Heading hint={data.catalogEstimated ? '— illustrative catalog' : undefined}>
        {data.catalogTitle ?? 'Enrichment classes'}
      </Heading>

      {data.catalogIntro && (
        <p className="as-note text-muted">
          <RichText text={data.catalogIntro} />
        </p>
      )}

      {data.dayFilters.length > 0 && (
        <div className="as-filters">
          {data.dayFilters.map((d) => (
            <button
              key={d}
              type="button"
              className={`as-filter${day === d ? ' is-active' : ''}`}
              onClick={() => setDay(d)}
              aria-pressed={day === d}
            >
              {d}
            </button>
          ))}
        </div>
      )}

      {data.gradeFilters.length > 0 && (
        <div className="as-filters">
          <span className="as-filters-label text-muted">Grade</span>
          {data.gradeFilters.map((g) => (
            <button
              key={g}
              type="button"
              className={`as-filter${grade === g ? ' is-active' : ''}`}
              onClick={() => setGrade(g)}
              aria-pressed={grade === g}
            >
              {g === 'All' ? 'All' : g}
            </button>
          ))}
        </div>
      )}

      <input
        type="text"
        className="as-search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search class name or description…"
        aria-label="Search enrichment classes"
      />

      <div className="as-count text-muted">
        {shown.length} of {data.classes.length} classes
      </div>

      <div className="as-scroll">
        <table className="as-table as-catalog">
          <thead>
            <tr>
              <th className="as-th">Class</th>
              <th className="as-th">Day</th>
              <th className="as-th">Grades</th>
              <th className="as-th as-th-fee">Fee</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((c) => (
              <tr key={c.name}>
                <td className="as-td">
                  <strong className="as-class-name">{highlight(c.name, q)}</strong>
                  <br />
                  <span className="text-muted as-class-desc">
                    {highlight(c.desc, q)}
                  </span>
                </td>
                <td className="as-td">{c.day}</td>
                <td className="as-td">{c.gradeLabel}</td>
                <td className="as-td as-td-fee">{c.fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {shown.length === 0 && (
          <div className="as-empty text-muted">
            No classes match — try clearing the search or filters.
          </div>
        )}
      </div>
    </div>
  )
}

export function DayInsideBody({ data }: { data: DayInside }) {
  return (
    <div className="as-body">
      <Lead headline={data.headline} subhead={data.subhead} />

      {data.rhythm.length > 0 && (
        <>
          <Heading hint={data.rhythmEstimated ? '— typical structure, confirm on visit' : undefined}>
            {data.rhythmTitle ?? 'The afternoon rhythm'}
          </Heading>
          <div
            className="as-rhythm"
            style={{
              gridTemplateColumns: `repeat(${Math.min(data.rhythm.length, 4)}, 1fr)`,
            }}
          >
            {data.rhythm.map((b) => (
              <div key={b.time + b.name} className="as-rhythm-block">
                <div className="as-rhythm-time text-muted">{b.time}</div>
                <div className="as-rhythm-name">{b.name}</div>
                <div className="as-rhythm-detail text-muted">{b.detail}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {data.words.length > 0 && (
        <>
          <Heading>{data.wordsTitle ?? "In the school's own words"}</Heading>
          <div className="as-chips">
            {data.words.map((w) => (
              <span key={w} className="tag-accent">
                {w}
              </span>
            ))}
          </div>
        </>
      )}

      {data.wordsText && (
        <p className="as-note text-muted">
          <RichText text={data.wordsText} />
        </p>
      )}

      {data.classes.length > 0 && <EnrichmentCatalog data={data} />}

      <Flags flags={data.flags} />
      <SourceRow sources={data.sources} />
    </div>
  )
}

/* --------------------------------------------- 1d · verdict & visit checklist -- */

/**
 * The checklist is genuinely tickable — a parent can walk a tour with the page
 * open and check questions off. State is deliberately local and unpersisted:
 * it's a scratchpad for one visit, not saved research.
 */
function Checklist({ items, title }: { items: string[]; title?: string }) {
  const [checked, setChecked] = useState<Set<number>>(new Set())
  const toggle = (i: number) =>
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })

  return (
    <div>
      <Heading>{title ?? 'Ask on the tour'}</Heading>
      <div className="as-checklist">
        {items.map((q, i) => (
          <label key={q} className="as-check-item">
            <input
              type="checkbox"
              checked={checked.has(i)}
              onChange={() => toggle(i)}
            />
            <span className={checked.has(i) ? 'is-checked' : undefined}>
              <RichText text={q} />
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}

export function VerdictBody({ data }: { data: Verdict }) {
  return (
    <div className="as-body">
      <Lead headline={data.headline} subhead={data.subhead} />

      <div className="as-split">
        <div>
          {data.strengths.length > 0 && (
            <>
              <Heading>{data.strengthsTitle ?? 'Why it holds up'}</Heading>
              <div className="as-marks">
                {data.strengths.map((s) => (
                  <div key={s} className="as-mark-row">
                    <span className="as-mark-good">✓</span>
                    <span>
                      <RichText text={s} />
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          {data.watchouts.length > 0 && (
            <>
              <Heading>{data.watchoutsTitle ?? 'Watch-outs'}</Heading>
              <div className="as-marks">
                {data.watchouts.map((w) => (
                  <div key={w} className="as-mark-row">
                    <span className="as-mark-warn">!</span>
                    <span>
                      <RichText text={w} />
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {data.checklist.length > 0 && (
          <Checklist items={data.checklist} title={data.checklistTitle} />
        )}
      </div>

      <Flags flags={data.flags} />
      <SourceRow sources={data.sources} />
    </div>
  )
}

/* ------------------------------------------------------------- dispatcher -- */

/**
 * Maps an After School card key to its body renderer — the same explicit
 * dispatch the other redesigned areas use, for the same reason: each card is a
 * purpose-built layout rather than a shared prose body.
 */
export function AfterSchoolCardBody({
  program,
  cardKey,
}: {
  program: AfterSchoolProgram
  cardKey: keyof AfterSchoolProgram
}) {
  switch (cardKey) {
    case 'coverage':
      return <CoverageBody data={program.coverage!} />
    case 'cost':
      return <CostBody data={program.cost!} />
    case 'dayInside':
      return <DayInsideBody data={program.dayInside!} />
    case 'verdict':
      return <VerdictBody data={program.verdict!} />
  }
}
