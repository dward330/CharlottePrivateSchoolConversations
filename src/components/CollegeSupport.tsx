// The "College Support" research area — the expanded bodies of the six
// redesigned cards on the school detail page (see data/collegeSupport.ts for the
// data and the card contract).
//
// Recreates the design's "College Support Section Redesign" using the app's own
// tokens (src/index.css). Each exported *Body component is the inside of one
// card; SchoolDetail owns the <details> shell, so these render only content.
//
// This area is data-forward, not photo-driven: the argument is built out of stat
// strips, tables, ledgers, and timelines rather than imagery.
//
// Every card ends in a SOURCE row built by <SourceRow>, which linkifies any
// citation carrying a URL — the project's citation standard.
//
// Every sub-block is individually optional. A school that publishes no quintile
// table simply has an empty `quintiles` array and the block is not drawn; a
// school with no data for a whole card is absent from its program entry and the
// card never renders. Nothing here fills a gap with placeholder content.

import { useMemo, useState } from 'react'
import type {
  Counseling,
  CsFlag,
  CsFlagKind,
  CsRow,
  CsSource,
  CsStat,
  Edge,
  Outcomes,
  Transcript,
  Verdict,
  WholeClass,
} from '../data/collegeSupport.ts'
import { COLLEGE_FILTERS } from '../data/collegeSupport.ts'

/* ------------------------------------------------------------ primitives -- */

/** The SOURCE row every card ends with. Citations with a URL become links. */
function SourceRow({ sources }: { sources: CsSource[] }) {
  if (sources.length === 0) return null
  return (
    <div className="cs-src srcrow">
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
const FLAG_LABEL: Record<CsFlagKind, string> = {
  verify: 'TO VERIFY',
  discrepancy: 'DISCREPANCY',
  gap: 'PUBLICATION GAP',
}

/**
 * Evidence qualifiers: TO VERIFY / DISCREPANCY / PUBLICATION GAP.
 *
 * Unlike the Student Clubs cards — where GAP and COUNT flags are filtered out at
 * render as research bookkeeping — these all render. In College Support the
 * qualifier IS the parent-facing content: whether a school publishes its
 * counseling guarantees, and whether its own sources agree on a National Merit
 * count, is exactly the kind of thing a parent is deciding on. The handoff makes
 * this explicit: show both conflicting figures and flag them rather than
 * silently picking one.
 */
function Flags({ flags }: { flags: CsFlag[] }) {
  if (flags.length === 0) return null
  return (
    <>
      {flags.map((f, i) => (
        <div key={i} className="cs-flag">
          <span className="tag-neutral cs-flag-tag">
            {f.label ?? FLAG_LABEL[f.kind]}
          </span>
          <span className="text-muted">
            <RichText text={f.text} />
          </span>
        </div>
      ))}
    </>
  )
}

/** The lead paragraph: bold headline plus muted continuation. */
function Lead({ headline, subhead }: { headline: string; subhead?: string }) {
  return (
    <p className="cs-lead">
      <strong>{headline}</strong>
      {subhead && <span className="text-muted"> {subhead}</span>}
    </p>
  )
}

/** A section heading inside a card body, with an optional muted qualifier. */
function Heading({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <div className="cs-h">
      {children}
      {hint && <span className="cs-h-hint text-muted"> {hint}</span>}
    </div>
  )
}

/** The hairline stat strip that leads most cards. */
function Stats({ stats }: { stats: CsStat[] }) {
  if (stats.length === 0) return null
  return (
    <div
      className="cs-stats"
      style={{ gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)` }}
    >
      {stats.map((s) => (
        <div key={s.label} className="cs-stat">
          <div className="cs-stat-val">{s.value}</div>
          <div className="cs-stat-label text-muted">{s.label}</div>
        </div>
      ))}
    </div>
  )
}

/** A label/text detail list — the design's recurring two-column row. */
function Rows({ rows }: { rows: CsRow[] }) {
  return (
    <div className="cs-rows">
      {rows.map((r) => (
        <div key={r.label} className="cs-row">
          <strong className="cs-row-label">{r.label}</strong>
          <span><RichText text={r.text} /></span>
        </div>
      ))}
    </div>
  )
}

/**
 * A trailing note beneath a block — modeling caveats, gaps, discrepancies.
 *
 * Takes `text` rather than children so every note gets `**bold**` handling from
 * one place; the caveat in 1c passes children instead, because it prepends its
 * own bold label.
 */
function Note({ text, children }: { text?: string; children?: React.ReactNode }) {
  return (
    <p className="cs-note text-muted">
      {text != null ? <RichText text={text} /> : children}
    </p>
  )
}

/**
 * Render `**bold**` spans inside otherwise plain data strings.
 *
 * The design leads several list rows with an emphasized figure — "**~150**
 * college reps visit campus annually", "**Global Studies Diploma** — the first
 * of its kind". Carrying that as markdown keeps the per-school data files
 * readable and diffable against the research notes they are transcribed from,
 * and this parser is the one place it turns into <strong>. Split on the
 * delimiter rather than injecting HTML: the data is ours, but nothing here
 * needs dangerouslySetInnerHTML, so it does not get it.
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

/* ------------------------------------ 1a · the transcript colleges see ---- */

export function TranscriptBody({ data }: { data: Transcript }) {
  return (
    <div className="cs-body">
      <Lead headline={data.headline} subhead={data.subhead} />
      <Stats stats={data.stats} />

      {/* The merit ledger and the post-AP depth list sit side by side. Either
          may be absent: a school publishing no National Merit record keeps the
          card and drops the ledger. */}
      <div className="cs-split">
        {data.merit.length > 0 && (
          <div>
            <Heading>{data.meritTitle ?? 'The National Merit ledger'}</Heading>
            <div className="cs-ledger-wrap">
              <table className="cs-ledger">
                <thead>
                  <tr>
                    <th className="cs-th cs-th-year">Class</th>
                    <th className="cs-th">National Merit &amp; College Board honors</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Keyed on year + detail, not year alone: a class can carry
                      more than one honor — Charlotte Christian's 2025 lists both
                      a National Merit Commended Scholar and its College Board
                      National Recognition awards — so the year is a label, not
                      an identity. */}
                  {data.merit.map((m) => (
                    <tr key={`${m.year}-${m.detail}`}>
                      <td className="cs-td cs-td-year">{m.year}</td>
                      <td className="cs-td">
                        <RichText text={m.detail} />
                        {m.unconfirmed && (
                          <span className="tag-neutral cs-inline-tag">TO VERIFY</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {data.meritNote && <Note text={data.meritNote} />}
          </div>
        )}

        {data.depth.length > 0 && (
          <div>
            <Heading>{data.depthTitle ?? 'Depth past the AP catalog'}</Heading>
            <Rows rows={data.depth} />
          </div>
        )}
      </div>

      {/* "How the grade is engineered to be trusted" — the filled band that
          carries weighting, the rank stand-in, and the course-load norms. */}
      {data.trust.length > 0 && (
        <div className="cs-band">
          <Heading>{data.trustTitle ?? 'How the grade is engineered to be trusted'}</Heading>
          <div
            className="cs-band-grid"
            style={{
              gridTemplateColumns: `repeat(${Math.min(data.trust.length, 3)}, 1fr)`,
            }}
          >
            {data.trust.map((t) => (
              <div key={t.label} className="cs-band-cell">
                <strong className="cs-band-label">{t.label}</strong>
                <span><RichText text={t.text} /></span>
              </div>
            ))}
          </div>
        </div>
      )}

      <Flags flags={data.flags} />
      <SourceRow sources={data.sources} />
    </div>
  )
}

/* ------------------------------------ 1b · the counseling engine ---------- */

export function CounselingBody({ data }: { data: Counseling }) {
  return (
    <div className="cs-body">
      <Lead headline={data.headline} subhead={data.subhead} />
      <Stats stats={data.stats} />

      {/* "Who's in the room" — the named team. A school that names no one keeps
          the card and drops this block rather than showing an empty roster. */}
      {data.roster.length > 0 && (
        <>
          <Heading>{data.rosterTitle ?? "Who's in the room"}</Heading>
          <div
            className="cs-roster"
            style={{
              gridTemplateColumns: `repeat(${Math.min(data.roster.length, 5)}, 1fr)`,
            }}
          >
            {data.roster.map((c) => (
              <div key={c.name} className="cs-counselor">
                <div className="cs-counselor-role text-muted">{c.role}</div>
                <div className="cs-counselor-name">{c.name}</div>
                {c.detail && (
                  <div className="cs-counselor-detail text-muted">{c.detail}</div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* The four-year timeline — the answer to "when does individualized
          support actually begin?", which is the question behind the ratio. */}
      {data.timeline.length > 0 && (
        <>
          <Heading>
            {data.timelineTitle ?? 'The four-year timeline — when individualized support begins'}
          </Heading>
          <div
            className="cs-timeline"
            style={{
              gridTemplateColumns: `repeat(${Math.min(data.timeline.length, 4)}, 1fr)`,
            }}
          >
            {data.timeline.map((y) => (
              <div key={y.grade} className="cs-year">
                <div className="cs-year-head">
                  <span className="cs-year-num">{y.grade}</span>
                  <span className="cs-year-intensity text-muted">{y.intensity}</span>
                </div>
                <div className="cs-year-items">
                  {y.items.map((it, i) => (
                    <span key={i}><RichText text={it} /></span>
                  ))}
                  {y.note && <span className="text-muted">{y.note}</span>}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* The mechanics the office owns, beside its reach and tooling. */}
      <div className="cs-split cs-split-wide">
        {data.mechanics.length > 0 && (
          <div>
            <Heading>{data.mechanicsTitle ?? 'The mechanics the office owns'}</Heading>
            <div className="cs-mechanics">
              {data.mechanics.map((m) => (
                <div key={m} className="cs-mechanic">
                  <span className="cs-check">✓</span>
                  <span className="cs-mechanic-name">{m}</span>
                </div>
              ))}
            </div>
            {data.mechanicsNote && <Note text={data.mechanicsNote} />}
          </div>
        )}

        {data.reach.length > 0 && (
          <div>
            <Heading>{data.reachTitle ?? 'Reach & tools'}</Heading>
            <div className="cs-reach">
              {data.reach.map((r, i) => (
                <div key={i} className="cs-reach-row">
                  <RichText text={r} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Flags flags={data.flags} />
      <SourceRow sources={data.sources} />
    </div>
  )
}

/* ------------------------------------ 1c · where graduates go ------------- */

/**
 * The acceptance list: filter chips by selectivity bucket plus a free-text
 * search. Both are local state — this is a browsing aid over data already on the
 * page, so it needs no router or persistence.
 */
function CollegeList({ data }: { data: Outcomes }) {
  const [filter, setFilter] = useState<string>('all')
  const [query, setQuery] = useState('')

  /* Only offer a chip for a bucket some college on THIS school's list actually
     belongs to, so a school with no liberal-arts acceptances doesn't show a
     filter that can only ever return nothing. */
  const available = useMemo(() => {
    const present = new Set(data.colleges.flatMap((c) => c.cats))
    return COLLEGE_FILTERS.filter((f) => f.key === 'all' || present.has(f.key))
  }, [data.colleges])

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    return data.colleges.filter(
      (c) =>
        (filter === 'all' || c.cats.includes(filter)) &&
        (q === '' || c.name.toLowerCase().includes(q)),
    )
  }, [data.colleges, filter, query])

  return (
    <div>
      <Heading hint="— filter & search">
        {data.collegesTitle ?? 'Every acceptance'}
      </Heading>

      {available.length > 1 && (
        <div className="cs-filters">
          {available.map((f) => (
            <button
              key={f.key}
              type="button"
              className={`cs-filter${filter === f.key ? ' is-active' : ''}`}
              onClick={() => setFilter(f.key)}
              aria-pressed={filter === f.key}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      <input
        type="text"
        className="cs-search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Filter by college name…"
        aria-label="Filter acceptances by college name"
      />

      <div className="cs-count text-muted">
        {shown.length} shown
        {data.collegesTotal && ` · ${data.collegesTotal}`}
      </div>

      <div className="cs-college-list">
        {shown.map((c) => (
          <div key={c.name} className="cs-college">
            <span className={c.enrolling ? 'cs-college-name is-enrolling' : 'cs-college-name'}>
              {c.name}
            </span>
            {c.rankLabel && (
              <span className="cs-college-rank text-muted">{c.rankLabel}</span>
            )}
          </div>
        ))}
        {shown.length === 0 && (
          <div className="cs-college-empty text-muted">
            No colleges match that filter.
          </div>
        )}
      </div>
    </div>
  )
}

export function OutcomesBody({ data }: { data: Outcomes }) {
  return (
    <div className="cs-body">
      <Lead headline={data.headline} subhead={data.subhead} />
      <Stats stats={data.stats} />

      <div className="cs-split">
        {data.buckets.length > 0 && (
          <div>
            <Heading>{data.bucketsTitle ?? 'The selectivity buckets'}</Heading>
            <div className="cs-ledger-wrap">
              <table className="cs-ledger">
                <thead>
                  <tr>
                    <th className="cs-th">Tier</th>
                    <th className="cs-th cs-th-count">On list</th>
                  </tr>
                </thead>
                <tbody>
                  {data.buckets.map((b) => (
                    <tr key={b.tier}>
                      <td className="cs-td">
                        {b.tier}
                        {b.note && (
                          <span className="cs-bucket-note text-muted"> {b.note}</span>
                        )}
                      </td>
                      <td className="cs-td cs-td-count">{b.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {data.bucketsNote && <Note text={data.bucketsNote} />}
          </div>
        )}

        {data.colleges.length > 0 && <CollegeList data={data} />}
      </div>

      {data.scholarships.length > 0 && (
        <div className="cs-band">
          <Heading>
            {data.scholarshipsTitle ?? 'Scholarship & named-award headline'}
          </Heading>
          <div className="cs-chips">
            {data.scholarships.map((s, i) => (
              <span key={s} className={i === 0 ? 'tag-accent' : 'tag-neutral'}>
                {s}
              </span>
            ))}
          </div>
          {data.scholarshipsNote && <Note text={data.scholarshipsNote} />}
        </div>
      )}

      {/* The acceptance-vs-matriculation caveat. An acceptance list is not a
          matriculation list, and conflating the two is the single most common
          way these numbers mislead — so it renders as emphasized body copy
          rather than a quiet footnote. */}
      {data.caveat && (
        <p className="cs-note text-muted">
          <strong className="cs-note-strong">Honest caveat:</strong>{' '}
          <RichText text={data.caveat} />
        </p>
      )}

      <Flags flags={data.flags} />
      <SourceRow sources={data.sources} />
    </div>
  )
}

/* ------------------------------------ 1d · the applicant's edge ----------- */

export function EdgeBody({ data }: { data: Edge }) {
  return (
    <div className="cs-body">
      <Lead headline={data.headline} subhead={data.subhead} />

      <div
        className="cs-split"
        style={{
          gridTemplateColumns: `repeat(${Math.min(data.levers.length, 2)}, 1fr)`,
        }}
      >
        {data.levers.map((l) => (
          <div key={l.title}>
            <Heading hint={l.hint}>{l.title}</Heading>
            <div className="cs-lever">
              {l.items.map((it, i) => (
                <div key={i} className="cs-lever-row">
                  <span className="cs-glyph">{l.glyph}</span>
                  <span><RichText text={it} /></span>
                </div>
              ))}
            </div>
            {l.note && <Note text={l.note} />}
          </div>
        ))}
      </div>

      <Flags flags={data.flags} />
      <SourceRow sources={data.sources} />
    </div>
  )
}

/* ------------------------------------ 1e · whole class analytics ---------- */

/** The percentile column headers, fixed across every score table. */
const PERCENTILE_COLS = ['10th', '25th', '50th', '75th', '90th', 'Mean']

export function WholeClassBody({ data }: { data: WholeClass }) {
  return (
    <div className="cs-body">
      <Lead headline={data.headline} subhead={data.subhead} />

      {/* SAT / ACT percentile tables. The 50th and mean columns are emphasized
          because those are the two figures a parent actually benchmarks against. */}
      {data.scoreTables.map((t) => (
        <div key={t.title} className="cs-scoreblock">
          <Heading hint={t.hint}>{t.title}</Heading>
          <div className="cs-ledger-wrap">
            <table className="cs-scores">
              <thead>
                <tr>
                  <th className="cs-th cs-th-metric">Percentile</th>
                  {PERCENTILE_COLS.map((c) => (
                    <th key={c} className="cs-th cs-th-pct">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.rows.map((r) => (
                  <tr key={r.label}>
                    <td className="cs-td cs-td-metric">{r.label}</td>
                    {r.values.map((v, i) => (
                      <td
                        key={i}
                        className={`cs-td cs-td-pct${
                          i === 2 ? ' is-median' : i === 5 ? ' is-mean' : ''
                        }`}
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {t.note && <Note text={t.note} />}
        </div>
      ))}

      {/* The GPA quintile strip — the no-rank mechanism made visible. */}
      {data.quintiles.length > 0 && (
        <>
          <Heading hint={data.gpaHint}>{data.gpaTitle ?? 'GPA percentiles'}</Heading>
          <div
            className="cs-quintiles"
            style={{
              gridTemplateColumns: `repeat(${Math.min(data.quintiles.length, 5)}, 1fr)`,
            }}
          >
            {data.quintiles.map((q) => (
              <div key={q.label} className="cs-quintile">
                <div className="cs-quintile-label text-muted">{q.label}</div>
                <div className="cs-quintile-gpa">{q.gpa}</div>
                {q.detail && (
                  <div className="cs-quintile-detail text-muted">{q.detail}</div>
                )}
              </div>
            ))}
          </div>
          {data.gpaNote && <Note text={data.gpaNote} />}
        </>
      )}

      <div className="cs-split">
        {data.support.length > 0 && (
          <div>
            <Heading>
              {data.supportTitle ?? 'Learning differences through the process'}
            </Heading>
            <Rows rows={data.support} />
            {data.supportNote && <Note text={data.supportNote} />}
          </div>
        )}

        {data.middle.length > 0 && (
          <div>
            <Heading>{data.middleTitle ?? 'The middle & the non-traditional path'}</Heading>
            <Rows rows={data.middle} />
          </div>
        )}
      </div>

      <Flags flags={data.flags} />
      <SourceRow sources={data.sources} />
    </div>
  )
}

/* ------------------------------------ 1f · verdict & visit checklist ------ */

export function VerdictBody({ data }: { data: Verdict }) {
  return (
    <div className="cs-body">
      <Lead headline={data.headline} subhead={data.subhead} />

      <div className="cs-split">
        {data.points.length > 0 && (
          <div>
            <Heading>{data.verdictTitle ?? 'Why it holds up'}</Heading>
            <div className="cs-lever">
              {data.points.map((p) => (
                <div key={p.label} className="cs-lever-row">
                  <span className="cs-glyph">✓</span>
                  <span>
                    <strong>{p.label}</strong> — <RichText text={p.text} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* The tour checklist. Real checkboxes, deliberately uncontrolled: a
            parent ticks these off on a phone during a visit, and the state is
            worth nothing after the tour ends. */}
        {data.checklist.length > 0 && (
          <div>
            <Heading hint="— tick as you go">
              {data.checklistTitle ?? 'Ask on the tour'}
            </Heading>
            <div className="cs-checklist">
              {data.checklist.map((q, i) => (
                <label key={i} className="cs-check-row">
                  <input type="checkbox" className="cs-checkbox" />
                  <span>{q}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      <Flags flags={data.flags} />
      <SourceRow sources={data.sources} />
    </div>
  )
}
