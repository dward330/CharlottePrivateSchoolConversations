// The "High School Placement" research area — the expanded bodies of the four
// cards a PreK-8 school shows in place of College Support (see
// data/highSchoolPlacement.ts for the data and the card contract).
//
// Recreates the design's "High School Placement Section Redesign" using the
// app's own tokens (src/index.css). Each exported *Body component is the inside
// of one card; SchoolDetail owns the <details> shell, so these render only
// content.
//
// A STRUCTURAL SIBLING OF CollegeSupport.tsx, deliberately. It reuses that
// component's own `VerdictBody` unchanged for the fourth card, and its `.cs-*`
// styles throughout, so the two areas read as the same system rather than as a
// new invention. The `.hsp-*` classes are only for what genuinely has no
// College Support analogue: the denominator-bearing stat tile, the per-class
// placement table, and the destination index with its cross-links.
//
// NO COMPARE AFFORDANCE ANYWHERE. PreK-8 schools are excluded from the Compare
// page entirely, so nothing here links to it or borrows its column treatment.
//
// The three things this area does that College Support does not:
//
//   1. Every percentage renders BESIDE ITS DENOMINATOR, in a slot of its own.
//      These are small cells — one student moves a 41-graduate rate by 2.4
//      points — so a bare percentage is not publishable. A figure with no
//      published denominator gets an explicit NO DENOM. chip, never a blank.
//   2. The multi-year aggregate is styled as a DIFFERENT KIND OF STATEMENT from
//      the per-class rows: dashed rather than solid, with no expandable detail,
//      because the school publishes no denominator and no series behind it. It
//      reads as the unverifiable aggregate it is, beside verifiable classes.
//   3. Destinations that have their own dossier in this app CROSS-LINK to it —
//      the app's first school-to-school link. Matched by SLUG against the
//      roster, never by name: a render-time name match would silently degrade to
//      plain text the moment a school is renamed.

import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { localizeMoneyText } from '../lib/format.ts'
import type {
  CsFlag,
  CsFlagKind,
  CsRow,
  Destination,
  DestinationCategory,
  Destinations,
  HspStat,
  Outcomes,
  Placement,
  PlacementClass,
} from '../data/highSchoolPlacement.ts'
import { schoolBySlug } from '../lib/manifest.ts'
import { highSchoolRank, highSchoolUrl } from '../data/highSchools.ts'
import { toSchool, useNavigate } from '../lib/router.ts'
import { SourceRow } from './SourceRow.tsx'

/* The fourth card reuses College Support's verdict treatment UNCHANGED — same
   type, same component, same styles. Every structured area in the app ends with
   one and this needs no adaptation beyond its content. Re-exported so
   SchoolDetail imports all four card bodies from one module. */
export { VerdictBody } from './CollegeSupport.tsx'

/* ------------------------------------------------------------ primitives -- */

/**
 * Locale key for the default chip wording per flag kind; `label` overrides it
 * per flag. Shares College Support's keys rather than duplicating three
 * identical strings into nine more catalogs — the chips mean the same thing.
 *
 * `kind` itself must never be translated: it is the lookup key, not display
 * text. See the note on the CollegeSupport copy for the 58-blank-chip defect
 * that taught this.
 */
const FLAG_LABEL_KEY: Record<CsFlagKind, string> = {
  verify: 'collegeSupport.flag_verify',
  discrepancy: 'collegeSupport.flag_discrepancy',
  gap: 'collegeSupport.flag_gap',
}

function Flags({ flags }: { flags: CsFlag[] }) {
  const { t } = useTranslation()
  if (flags.length === 0) return null
  return (
    <>
      {flags.map((f, i) => (
        <div key={i} className="cs-flag">
          <span className="tag-neutral cs-flag-tag">
            {f.label ?? t(FLAG_LABEL_KEY[f.kind])}
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

/** A trailing note beneath a block — caveats, gaps, publication limits. */
function Note({ text, children }: { text?: string; children?: React.ReactNode }) {
  return (
    <p className="cs-note text-muted">
      {text != null ? <RichText text={text} /> : children}
    </p>
  )
}

/**
 * Render `**bold**` spans inside otherwise plain data strings, localizing
 * figures on every segment. Same parser as CollegeSupport's — see the note
 * there on why the data carries markdown and why this never uses
 * dangerouslySetInnerHTML.
 */
function RichText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/gs)
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

/**
 * The stat strip — the one primitive that genuinely differs from College
 * Support's, because the denominator has its own slot.
 *
 * A tile with no published denominator renders an explicit NO DENOM. chip in
 * that slot rather than collapsing it. Two reasons, both deliberate: the layout
 * never has a hole in it, and an unverifiable figure never renders looking like
 * a verified one. The absence IS the finding, so it is shown.
 */
function Stats({ stats }: { stats: HspStat[] }) {
  const { t } = useTranslation()
  if (stats.length === 0) return null
  return (
    <div
      className="cs-stats hsp-stats"
      style={{ gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)` }}
    >
      {stats.map((s) => (
        <div key={s.caption} className="cs-stat hsp-stat">
          <div className="cs-stat-val">{localizeMoneyText(s.value)}</div>
          {s.denominator ? (
            <div className="hsp-stat-denom">{localizeMoneyText(s.denominator)}</div>
          ) : (
            <div className="hsp-stat-denom hsp-no-denom">
              {t('highSchoolPlacement.noDenominator')}
            </div>
          )}
          <div className="cs-stat-label text-muted">{s.caption}</div>
        </div>
      ))}
    </div>
  )
}

/**
 * One destination chip. Cross-links to its own dossier where the app has one.
 *
 * The affordance is a 3px brand-coloured LEFT EDGE plus a small ↗, not a filled
 * chip. Filling 12 of 56 chips with brand colour would read as "these are the
 * good ones" — the categories are the school's own groupings, not a ranking, and
 * the app must not imply one. An edge marks availability without ranking.
 *
 * `slug` is verified against the roster before it links: a data file naming a
 * school that is not in the app renders as a plain chip rather than a dead link.
 */
/**
 * A school name with every case-insensitive occurrence of `query` tinted.
 *
 * Built from segments rather than by setting innerHTML — the query is reader
 * input and the names come from research data, so neither is trusted as markup.
 */
function Marked({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>
  const needle = query.toLowerCase()
  const hay = text.toLowerCase()
  const out: React.ReactNode[] = []
  let i = 0
  for (let at = hay.indexOf(needle); at !== -1; at = hay.indexOf(needle, i)) {
    if (at > i) out.push(text.slice(i, at))
    out.push(
      <mark key={at} className="hsp-mark">
        {text.slice(at, at + query.length)}
      </mark>,
    )
    i = at + query.length
  }
  if (i < text.length) out.push(text.slice(i))
  return <>{out}</>
}

function DestinationChip({
  dest,
  note,
  query = '',
}: {
  dest: Destination
  note?: string
  query?: string
}) {
  const navigate = useNavigate()
  const inApp = dest.slug ? schoolBySlug(dest.slug) : undefined
  /* The Niche rank, resolved from the single master by name. Stored as a whole
     label rather than a number because two different scales are in play — see
     the note on `nicheRank` in data/highSchools.ts. */
  const rank = highSchoolRank(dest.name)

  if (!inApp) {
    /* No dossier here yet, so the name links OUT to the school's own homepage
       where one could be confirmed. A school with no resolvable homepage —
       closed, merged, or a name too ambiguous to pin — renders as plain text,
       which is a confirmed result rather than a gap. */
    const href = highSchoolUrl(dest.name)
    if (href) {
      return (
        <a
          className="hsp-dest hsp-dest-out"
          href={href}
          target="_blank"
          rel="noreferrer noopener"
        >
          <Marked text={dest.name} query={query} />
          <span className="hsp-dest-arrow" aria-hidden="true"> ↗</span>
          {note && <span className="hsp-dest-note text-muted"> {note}</span>}
          {rank && <span className="hsp-dest-rank text-muted">{rank}</span>}
        </a>
      )
    }
    return (
      <span className="hsp-dest">
        <Marked text={dest.name} query={query} />
        {note && <span className="hsp-dest-note text-muted"> {note}</span>}
        {rank && <span className="hsp-dest-rank text-muted">{rank}</span>}
      </span>
    )
  }

  const href = toSchool(inApp.slug)
  return (
    <a
      className="hsp-dest hsp-dest-link"
      href={href}
      onClick={(e) => { e.preventDefault(); navigate(href) }}
    >
      <Marked text={dest.name} query={query} />
      <span className="hsp-dest-arrow" aria-hidden="true"> ↗</span>
      {note && <span className="hsp-dest-note text-muted"> {note}</span>}
      {rank && <span className="hsp-dest-rank text-muted">{rank}</span>}
    </a>
  )
}

/* ----------------------------------------------- 2a where graduates go ---- */

/** One class row, expanding to that class's named destinations. */
function ClassRow({ row }: { row: PlacementClass }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const expandable = row.destinations.length > 0

  return (
    <>
      <div className="hsp-class-row">
        <span className="hsp-class-year">{row.year}</span>
        <span className="hsp-class-grads">{localizeMoneyText(row.graduates)}</span>
        <span className="hsp-class-pct">
          <strong>{localizeMoneyText(row.acceptedPct)}</strong>
          <span className="hsp-class-denom text-muted">
            {' '}{localizeMoneyText(row.acceptedCount)}
          </span>
        </span>
        <span className="hsp-class-schol text-muted">
          {row.scholarshipNote ?? '—'}
        </span>
        <span className="hsp-class-toggle">
          {expandable ? (
            <button
              type="button"
              className="hsp-expand"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open
                ? t('highSchoolPlacement.collapse')
                : t('highSchoolPlacement.expand')}
            </button>
          ) : (
            '—'
          )}
        </span>
      </div>

      {open && expandable && (
        <div className="hsp-class-dests">
          <Heading>
            {t('highSchoolPlacement.classDestinations', {
              year: row.year,
              count: row.destinations.length,
            })}
          </Heading>
          <div className="hsp-dest-row">
            {row.destinations.map((d) => (
              <DestinationChip key={d.name} dest={d} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

/**
 * The headline card: does this school actually place kids well?
 *
 * No <h3> and no blueprint corners here: SchoolDetail's <summary> already draws
 * the card title and teaser, and the <details> shell already draws the four
 * registration marks. The body starts at the takeaway sentence.
 */
export function OutcomesBody({ data }: { data: Outcomes }) {
  const { t } = useTranslation()
  return (
    <div className="cs-body">
      <Lead headline={data.headline} subhead={data.subhead} />
      <Stats stats={data.stats} />

      {data.classes.length > 0 && (
        <>
          <Heading>
            {data.classesTitle ?? t('highSchoolPlacement.classByClass')}
          </Heading>
          <div className="hsp-classes">
            <div className="hsp-class-row hsp-class-head">
              <span>{t('highSchoolPlacement.colClass')}</span>
              <span>{t('highSchoolPlacement.colGraduates')}</span>
              <span>{t('highSchoolPlacement.colAccepted')}</span>
              <span>{t('highSchoolPlacement.colScholarships')}</span>
              <span>{t('highSchoolPlacement.colDetail')}</span>
            </div>
            {data.classes.map((c) => (
              <ClassRow key={c.year} row={c} />
            ))}

            {/* The multi-year aggregate, styled as a different kind of
                statement on purpose: dashed rather than solid, a NO DENOM. chip
                where a count would sit, and no expandable detail. The school
                publishes no denominator and no year-by-year series behind it,
                so it reads as the unverifiable aggregate it is beside the
                verifiable classes above. */}
            {data.tenYear && (
              <div className="hsp-class-row hsp-class-agg">
                <span className="hsp-class-year">{data.tenYear.label}</span>
                <span className="hsp-class-grads">
                  {data.tenYear.denominator ? (
                    localizeMoneyText(data.tenYear.denominator)
                  ) : (
                    <span className="hsp-no-denom">
                      {t('highSchoolPlacement.noDenominator')}
                    </span>
                  )}
                </span>
                <span className="hsp-class-pct">
                  <strong>{localizeMoneyText(data.tenYear.pct)}</strong>
                </span>
                <span className="hsp-class-schol text-muted">—</span>
                <span className="hsp-class-toggle">—</span>
              </div>
            )}
          </div>
        </>
      )}

      {data.scholarships.length > 0 && (
        <>
          <Heading>
            {data.scholarshipsTitle ?? t('highSchoolPlacement.namedScholarships')}
          </Heading>
          <div className="hsp-schol-band">
            {data.scholarships.map((s) => (
              <div key={s.name} className="hsp-schol">
                <strong className="hsp-schol-name">{s.name}</strong>
                <span className="text-muted">{s.detail}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* The two standing caveats for this card. Chrome, not research: they are
          identical for every school because they describe what the STATISTIC is,
          not what any school published. A percentage here describes the school's
          own graduates, not any high school's selectivity. */}
      <Note>
        <strong>{t('highSchoolPlacement.notAnAdmitRate')}</strong>{' '}
        {t('highSchoolPlacement.notAnAdmitRateText')}
      </Note>
      <Note>
        <strong>{t('highSchoolPlacement.acceptanceNotMatriculation')}</strong>{' '}
        {t('highSchoolPlacement.acceptanceNotMatriculationText')}
      </Note>

      <Flags flags={data.flags} />
      <SourceRow sources={data.sources} className="cs-src" />
    </div>
  )
}

/* ------------------------------------------------ 2b the placement program -- */

/**
 * The process card — a step-ladder rather than a roster.
 *
 * A timeline because the people are unnamed: the school names a placement team
 * as a FUNCTION but publishes no members, so the process is the substance. A
 * staff-directory lookup is not a substitute, and no name is ever inferred to
 * fill the gap — `notPublished` states the absence instead.
 */
export function PlacementBody({ data }: { data: Placement }) {
  const { t } = useTranslation()
  return (
    <div className="cs-body">
      <Lead headline={data.headline} subhead={data.subhead} />
      <Stats stats={data.stats} />

      {data.steps.length > 0 && (
        <>
          <Heading>
            {data.timelineTitle ?? t('highSchoolPlacement.processInSequence')}
          </Heading>
          <div className="hsp-timeline">
            {data.steps.map((s) => (
              <div key={s.when} className="hsp-step">
                <div className="hsp-step-when">{s.when}</div>
                {s.kind && <div className="hsp-step-kind text-muted">{s.kind}</div>}
                <div className="hsp-step-text">
                  <RichText text={s.text} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="cs-split">
        {data.owns.length > 0 && (
          <div>
            <Heading>{data.ownsTitle ?? t('highSchoolPlacement.whatTheSchoolOwns')}</Heading>
            <div className="cs-lever">
              {data.owns.map((o, i) => (
                <div key={i} className="cs-lever-row">
                  <span className="cs-glyph">✓</span>
                  <span><RichText text={o} /></span>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.notPublished.length > 0 && (
          <div>
            <Heading>
              {data.notPublishedTitle ?? t('highSchoolPlacement.notPublished')}
            </Heading>
            <Rows rows={data.notPublished} />
          </div>
        )}
      </div>

      <Flags flags={data.flags} />
      <SourceRow sources={data.sources} className="cs-src" />
    </div>
  )
}

/* --------------------------------------------------- 2c where they land ---- */

/** The "All" pseudo-category key. Never a real category key in the data. */
const ALL = '__all'

/**
 * The destination index: filter chips over the school's own categories.
 *
 * RANK LABELS, added 2026-09-17. This comment previously read "NO RANK LABELS,
 * ever" — on the grounds that `rankLabelFor()` is a US News COLLEGE table with
 * no high-school analogue. That reasoning was about the absence of a SOURCE, not
 * a judgement that ranks do not belong, and the user has since supplied one:
 * Niche. Labels now resolve from `data/highSchools.ts` via `highSchoolRank()`.
 *
 * The labels stay WHOLE ("Charlotte Private #3", not "#3") because two distinct
 * scales are in play — Charlotte-metro private K-12 for the independents,
 * national boarding for the boarding schools. A bare #3 beside a bare #12 would
 * invite a comparison neither ranking supports.
 *
 * Still true, and still the rule: the categories are NOT tiers. They are kinds
 * of school, and the app invents no ranking of its own.
 */
export function DestinationsBody({ data }: { data: Destinations }) {
  const { t } = useTranslation()
  const [filter, setFilter] = useState<string>(ALL)
  const [query, setQuery] = useState('')
  const listRef = useRef<HTMLDivElement>(null)

  /* Swapping the category or editing the query replaces the list contents, so
     reset scroll — the reader should start at the top of the new result set
     rather than wherever the previous one was left. Same rule as Course
     Offerings, whose pattern this list follows. */
  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = 0
  }, [filter, query])

  /* Trimmed for matching but NOT for the empty-state message, which echoes what
     the reader typed: a stray trailing space while typing must not empty the
     list. */
  const q = query.trim()

  const total = useMemo(
    () => data.categories.reduce((n, c) => n + c.schools.length, 0),
    [data.categories],
  )
  /* How many destinations across the whole card have a dossier here — the
     number the legend advertises. Counted from the data, never hardcoded. */
  const linked = useMemo(
    () =>
      data.categories.reduce(
        (n, c) => n + c.schools.filter((s) => s.slug && schoolBySlug(s.slug)).length,
        0,
      ),
    [data.categories],
  )

  /* Category filter first, then the name search within it. A category left with
     no match drops out entirely rather than rendering an empty heading, which
     is the zero-items rule applied to a live filter. The search matches the
     school NAME only — the notes are qualifiers ("published as …"), so matching
     them would surface rows whose visible name does not contain the term. */
  const shown = useMemo(() => {
    const needle = q.toLowerCase()
    return data.categories
      .filter((c) => filter === ALL || c.key === filter)
      .map((c) =>
        needle
          ? { ...c, schools: c.schools.filter((s) => s.name.toLowerCase().includes(needle)) }
          : c,
      )
      .filter((c) => c.schools.length > 0)
  }, [data.categories, filter, q])

  const matched = useMemo(
    () => shown.reduce((n, c) => n + c.schools.length, 0),
    [shown],
  )

  return (
    <div className="cs-body">
      <Lead headline={data.headline} subhead={data.subhead} />

      <div className="hsp-filters">
        <button
          type="button"
          className={`pill ${filter === ALL ? 'on' : ''}`}
          aria-pressed={filter === ALL}
          onClick={() => setFilter(ALL)}
        >
          {t('highSchoolPlacement.filterAll')}
          <span className="hsp-filter-count"> {total}</span>
        </button>
        {data.categories.map((c) => (
          <button
            key={c.key}
            type="button"
            className={`pill ${filter === c.key ? 'on' : ''}`}
            aria-pressed={filter === c.key}
            onClick={() => setFilter(c.key)}
          >
            {c.label}
            <span className="hsp-filter-count"> {c.schools.length}</span>
          </button>
        ))}
      </div>

      {/* The cross-link legend sits WITH the filter chips, so the affordance is
          explained before it is met. Destinations with no dossier need no
          explanation — they are simply plain text. */}
      {linked > 0 && (
        <p className="hsp-legend text-muted">
          {/* A visual SAMPLE of the cross-link treatment, not a link. It gets
              its own class rather than borrowing .hsp-dest-link, so that
              selector keeps meaning "a real cross-link to a dossier" for
              anything that queries the page. */}
          <span className="hsp-dest hsp-legend-swatch" aria-hidden="true">
            <span className="hsp-dest-arrow">↗</span>
          </span>
          {t('highSchoolPlacement.crossLinkLegend', { count: linked })}
        </p>
      )}

      {/* Name search, on the Course Offerings pattern — 99 destinations is past
          the point where scanning beats typing. */}
      <div className="hsp-search">
        <span className="hsp-search-icon" aria-hidden="true">
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </span>
        <input
          type="text"
          className="input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('highSchoolPlacement.searchPlaceholder')}
          aria-label={t('highSchoolPlacement.searchAria')}
        />
        {q !== '' && (
          <span className="hsp-search-count text-muted">
            {t('highSchoolPlacement.searchCount', { count: matched, total })}
          </span>
        )}
      </div>

      {/* The scroll region: a fixed max height inside a hairline frame, so a
          98-row list does not push the sources row off the bottom of the card. */}
      <div className="hsp-destlist" ref={listRef} tabIndex={0}>
        {shown.map((cat) => (
          <CategoryBlock key={cat.key} cat={cat} query={q} />
        ))}
        {shown.length === 0 && (
          <p className="hsp-dest-empty text-muted">
            {t('highSchoolPlacement.searchEmpty', { query: q })}
          </p>
        )}
      </div>

      {/* The NO RANKINGS and ACCEPTANCE ≠ MATRICULATION notes were removed at
          review (user, 2026-09-16) — standing caveats about how to read the
          list rather than facts about the school, and they printed under every
          destinations card unconditionally. The keys stay in all ten catalogs
          (highSchoolPlacement.noRankings / .acceptanceNotMatriculation and their
          *Text siblings) so restoring them needs no translation work. Both
          distinctions remain in the research record. */}

      <Flags flags={data.flags} />
      <SourceRow sources={data.sources} className="cs-src" />
    </div>
  )
}

/** One category's heading and its chips. */
function CategoryBlock({ cat, query = '' }: { cat: DestinationCategory; query?: string }) {
  const { t } = useTranslation()
  const linked = cat.schools.filter((s) => s.slug && schoolBySlug(s.slug)).length
  return (
    <div className="hsp-cat">
      <Heading
        hint={
          linked > 0
            ? t('highSchoolPlacement.categoryLinked', {
                count: cat.schools.length,
                linked,
              })
            : t('highSchoolPlacement.categoryCount', { count: cat.schools.length })
        }
      >
        {cat.label}
      </Heading>
      <div className="hsp-dest-row">
        {cat.schools.map((s) => (
          <DestinationChip
            key={s.name}
            dest={s}
            note={cat.notes?.[s.name]}
            query={query}
          />
        ))}
      </div>
    </div>
  )
}
