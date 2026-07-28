// The "Sports" research area — the expanded bodies of the seven consolidated
// Sports cards on the school detail page (see data/sportsProgram.ts for the
// data and the card contract).
//
// Recreates the design's "Sports Section Redesign" using the app's own tokens
// (src/index.css). Each exported *Body component is the inside of one card;
// SchoolDetail owns the <details> shell, so these render only content.
//
// Every card ends in a SOURCE row built by <SourceRow>, which linkifies any
// citation carrying a URL — the project's citation standard. Figures the
// research could not confirm wear a TO VERIFY tag rather than being dropped or
// silently guessed at.

import { useEffect, useMemo, useRef, useState } from 'react'
import { winPct, localizeMoneyText } from '../lib/format.ts'
import { useTranslation } from 'react-i18next'
import type {
  Coaching,
  CollegePipeline,
  CommitLevel,
  Facilities,
  HonorsAndPros,
  Level,
  NationalStage,
  SportsOffered,
  SportsSource,
  StatTile,
  TitleCell,
  TitleRow,
  WinningRecord,
} from '../data/sportsProgram.ts'

/* ------------------------------------------------------------ primitives -- */

/** The SOURCE row every card ends with. Citations with a URL become links. */
function SourceRow({ sources }: { sources: SportsSource[] }) {
  const { t } = useTranslation()
  if (sources.length === 0) return null
  return (
    <div className="sports-src srcrow">
      <span className="tag-outline">{t('sports.source')}</span>
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

/** The lead paragraph: bold headline plus muted continuation. */
function Lead({ headline, subhead }: { headline: string; subhead?: string }) {
  return (
    <p className="sports-lead">
      <strong>{headline}</strong>
      {subhead && <span className="text-muted"> {subhead}</span>}
    </p>
  )
}

/** The four-up stat strip used by 1a and 1g. */
function StatStrip({ stats }: { stats: StatTile[] }) {
  return (
    <div className="sports-stats">
      {stats.map((s) => (
        <div key={s.label} className="sports-stat">
          <div className="sports-stat-val">{localizeMoneyText(s.value)}</div>
          <div className="sports-stat-label text-muted">{s.label}</div>
        </div>
      ))}
    </div>
  )
}

/** A section heading inside a card body. */
function Heading({ children }: { children: React.ReactNode }) {
  return <div className="sports-h">{children}</div>
}

function ToVerify() {
  const { t } = useTranslation()
  return <span className="tag-neutral sports-verify">{t('sports.toVerify')}</span>
}

/** A depth chip (V / JV / MS) on the season board. */
function DepthChip({ level }: { level: Level }) {
  return <span className={`sports-depth sports-depth-${level.toLowerCase()}`}>{level}</span>
}

/* --------------------------------------------------- 1a · sports offered -- */

export function SportsOfferedBody({ data }: { data: SportsOffered }) {
  const { t } = useTranslation()
  return (
    <div className="sports-body">
      <Lead headline={data.headline} subhead={data.subhead} />
      <StatStrip stats={data.stats} />

      {/* Depth-chip legend, so V / JV / MS read without guessing. */}
      <div className="sports-legend">
        <span className="text-muted">{t('sports.depthChips')}</span>
        <span>
          <DepthChip level="V" /> Varsity
        </span>
        <span>
          <DepthChip level="JV" /> Junior varsity
        </span>
        <span>
          <DepthChip level="MS" /> Middle School
        </span>
      </div>

      {/* The season board — Fall / Winter / Spring columns. */}
      <div className="sports-board">
        {data.seasons.map((season) => (
          <div key={season.name} className="sports-season">
            <div className="sports-season-head">
              {season.name}
              {season.note && <span className="text-muted"> · {season.note}</span>}
            </div>
            <div className="sports-season-list">
              {season.sports.map((sport) => (
                <div key={sport.name} className="sports-sport">
                  <span>{sport.name}</span>
                  <span className="sports-depths">
                    {sport.levels.map((l) => (
                      <DepthChip key={l} level={l} />
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {data.footnote && <p className="sports-note text-muted">{data.footnote}</p>}
      <SourceRow sources={data.sources} />
    </div>
  )
}

/* --------------------------------------------------- 1b · winning record -- */

/** One matrix cell: a result chip over the season's final record. */
function ResultCell({ cell }: { cell: TitleCell }) {
  const { t } = useTranslation()
  if (cell.result === 'NONE') {
    return (
      <div className="sports-cell">
        <span className="text-muted">—</span>
      </div>
    )
  }
  const chip =
    cell.result === 'RUNNER-UP' ? (
      <span className="sports-chip-out">{t('sports.runnerUp')}</span>
    ) : cell.result === 'SEMIFINAL' ? (
      <span className="text-muted sports-chip-semi">{t('sports.semifinal')}</span>
    ) : (
      <span className="sports-chip">{cell.result}</span>
    )
  return (
    <div className="sports-cell">
      {chip}
      {cell.toVerify ? (
        <div className="sports-cell-sub">
          <ToVerify />
        </div>
      ) : (
        cell.record && <div className="sports-cell-sub text-muted">{cell.record}</div>
      )}
    </div>
  )
}

/** A matrix row rendered as bare grid children (program, cells…, note). */
function MatrixRow({ row }: { row: TitleRow }) {
  return (
    <>
      <div className="sports-prog">{row.program}</div>
      {row.cells.map((cell, i) => (
        <ResultCell key={i} cell={cell} />
      ))}
      <div className="sports-rownote text-muted">{row.note}</div>
    </>
  )
}

export function WinningRecordBody({ data }: { data: WinningRecord }) {
  const { t } = useTranslation()
  /* Column template: program name, one column per season, then the note. */
  const cols = `170px repeat(${data.seasonLabels.length}, 1fr) 240px`
  return (
    <div className="sports-body">
      <Lead headline={data.headline} subhead={data.subhead} />

      <Heading>{t('sports.stateTitleMatrix', { count: data.seasonLabels.length })}</Heading>
      <div className="sports-scroll sports-scroll-tall">
        <div className="sports-matrix" style={{ gridTemplateColumns: cols }}>
          <div className="sports-th">{t('sports.program')}</div>
          {data.seasonLabels.map((l) => (
            <div key={l} className="sports-th sports-th-c">
              {l}
            </div>
          ))}
          <div className="sports-th">{t('sports.note')}</div>
          {data.rows.map((row) => (
            <MatrixRow key={row.program} row={row} />
          ))}
        </div>
      </div>

      {data.didNotWin && (
        <p className="sports-note text-muted">
          <strong className="sports-note-strong">{t('sports.didntWin')}</strong> {data.didNotWin}
        </p>
      )}

      {data.bars.length > 0 && (
        <>
          <Heading>{t('sports.winPercentage')}</Heading>
          <div className="sports-bars">
            {/* Keyed on program + tag, not program alone: a school can chart the
                same sport over two different windows — Davidson Day shows boys
                basketball at both its '19–20 peak and its 3-year span — and the
                tag is what tells those rows apart. */}
            {data.bars.map((bar) => (
              <div key={`${bar.program}-${bar.tag ?? ''}`} className="sports-bar-row">
                <span className="sports-bar-name">
                  {bar.program}
                  {bar.tag && <span className="tag-neutral sports-verify">{bar.tag}</span>}
                </span>
                <span className="sports-bar-track">
                  <span
                    className="sports-bar-fill"
                    style={{ width: `${Math.round(bar.pct * 100)}%` }}
                  />
                </span>
                <span className="sports-bar-val">
                  <strong>{bar.record}</strong>{' '}
                  <span className="text-muted">({winPct(bar.pct)})</span>
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      {data.seasonDetail && data.seasonDetail.length > 0 && (
        <div className="sports-detail">
          <Heading>{t('sports.seasonDetail')}</Heading>
          {data.seasonDetail.map((d) => (
            <p key={d.program} className="sports-detail-p">
              <strong>{d.program}:</strong> {d.text}
            </p>
          ))}
        </div>
      )}

      <SourceRow sources={data.sources} />
    </div>
  )
}

/* -------------------------------------------------- 1c · college pipeline -- */

const LEVEL_TABS: { key: 'all' | 'd1' | 'p4'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'd1', label: 'Division I' },
  { key: 'p4', label: 'Power 4 Schools' },
]

/** Splits a field around the search hit so the match can be highlighted. */
function split(text: string, q: string) {
  if (!q) return { pre: text, hit: '', suf: '' }
  const i = text.toLowerCase().indexOf(q)
  if (i < 0) return { pre: text, hit: '', suf: '' }
  return { pre: text.slice(0, i), hit: text.slice(i, i + q.length), suf: text.slice(i + q.length) }
}

/** A roster cell with the matched characters marked. */
function Hl({ text, q }: { text: string; q: string }) {
  const { pre, hit, suf } = split(text, q)
  return (
    <>
      {pre}
      {hit && <mark className="sports-hl">{hit}</mark>}
      {suf}
    </>
  )
}

const LEVEL_TAG: Record<CommitLevel, string> = {
  P4: 'tag-accent',
  D1: 'tag-outline',
  D2: 'tag-neutral',
  D3: 'tag-neutral',
  NAIA: 'tag-neutral',
}

function RosterRow({ row, q }: { row: CollegePipeline['roster'][number]; q: string }) {
  return (
    <>
      <span className="sports-td text-muted">{row.cls}</span>
      <span className="sports-td sports-td-name">
        <Hl text={row.name} q={q} />
      </span>
      <span className="sports-td">
        <Hl text={row.sport} q={q} />
      </span>
      <span className="sports-td">
        <Hl text={row.college} q={q} />
      </span>
      <span className="sports-td">
        <Hl text={row.conf} q={q} />
      </span>
      <span className="sports-td sports-th-c">
        <span className={`${LEVEL_TAG[row.level]} sports-level`}>{row.level}</span>
      </span>
    </>
  )
}

export function CollegePipelineBody({ data }: { data: CollegePipeline }) {
  const { t } = useTranslation()
  const [filter, setFilter] = useState<'all' | 'd1' | 'p4'>('all')
  const [query, setQuery] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)

  // The card is an uncontrolled <details> owned by SchoolDetail; reset the
  // filter and search whenever it collapses so re-opening always starts from
  // "All" — matching the ClubCatalog behaviour elsewhere in the app.
  useEffect(() => {
    const details = rootRef.current?.closest('details')
    if (!details) return
    const onToggle = () => {
      if (!details.open) {
        setFilter('all')
        setQuery('')
      }
    }
    details.addEventListener('toggle', onToggle)
    return () => details.removeEventListener('toggle', onToggle)
  }, [])

  const q = query.trim().toLowerCase()
  const rows = useMemo(
    () =>
      data.roster.filter((r) => {
        if (filter === 'p4' && r.level !== 'P4') return false
        if (filter === 'd1' && r.level !== 'P4' && r.level !== 'D1') return false
        if (q && ![r.name, r.sport, r.college, r.conf].some((t) => t.toLowerCase().includes(q)))
          return false
        return true
      }),
    [data.roster, filter, q],
  )

  return (
    <div className="sports-body" ref={rootRef}>
      <Lead headline={data.headline} subhead={data.subhead} />

      <Heading>{t('sports.funnel')}</Heading>
      <div className="sports-funnel">
        {data.funnel.map((stage) => (
          <div key={stage.label} className="sports-funnel-row">
            <span className="sports-funnel-label">
              {stage.label}
              {stage.hint && <span className="text-muted"> {stage.hint}</span>}
              {stage.toVerify && <ToVerify />}
            </span>
            <span className="sports-funnel-track">
              <span
                className={`sports-funnel-fill is-${stage.shade}`}
                style={{ width: `${Math.round(stage.width * 100)}%` }}
              />
            </span>
            <strong className="sports-funnel-count">{stage.count}</strong>
          </div>
        ))}
      </div>
      {data.funnelNote && <p className="sports-note text-muted">{data.funnelNote}</p>}

      {/* By-sport bars beside the reality-check panel. */}
      <div className="sports-split">
        <div>
          <Heading>
            D1 commits by sport{' '}
            <span className="text-muted sports-h-hint">(■ = Power 4 share)</span>
          </Heading>
          <div className="sports-sportbars">
            {data.sportBars.map((b) => (
              <div key={b.sport} className="sports-sportbar">
                <span>{b.sport}</span>
                <span className="sports-bar-track sports-bar-track-sm">
                  <span
                    className="sports-bar-fill is-pale"
                    style={{ width: `${Math.round(b.width * 100)}%` }}
                  />
                  {b.p4Width != null && (
                    <span
                      className="sports-bar-fill"
                      style={{ width: `${Math.round(b.p4Width * 100)}%` }}
                    />
                  )}
                </span>
                <strong>{b.count}</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="sports-panel">
          {data.realityCheck && (
            <>
              <Heading>{t('sports.realityCheck')}</Heading>
              <p className="sports-p">{data.realityCheck}</p>
            </>
          )}
          {data.rankedRecruits && (
            <>
              <Heading>{t('sports.rankedRecruits')}</Heading>
              <p className="sports-p">{data.rankedRecruits}</p>
            </>
          )}
        </div>
      </div>

      {/* The full commitment roster: filter tabs + search over a scrolling table. */}
      <Heading>{t('sports.commitmentRoster')}</Heading>
      <div className="sports-rostertools">
        <div className="sports-tabs" role="group" aria-label={t('tables.filterCommitmentsAria')}>
          {LEVEL_TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              className={filter === t.key ? 'catalog-chip is-active' : 'catalog-chip'}
              aria-pressed={filter === t.key}
              onClick={() => setFilter(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <input
          className="sports-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('sports.searchPlaceholder')}
          aria-label={t('sports.searchAria')}
        />
        <span className="catalog-count" aria-live="polite">
          {rows.length} of {data.roster.length}
        </span>
      </div>

      <div className="sports-scroll">
        <div className="sports-roster">
          <div className="sports-th">{t('sports.classLabel')}</div>
          <div className="sports-th">{t('sports.athlete')}</div>
          <div className="sports-th">{t('sports.sport')}</div>
          <div className="sports-th">{t('sports.college')}</div>
          <div className="sports-th">{t('sports.conference')}</div>
          <div className="sports-th sports-th-c">{t('sports.level')}</div>
          {rows.map((r, i) => (
            <RosterRow key={`${r.name}-${i}`} row={r} q={q} />
          ))}
        </div>
        {rows.length === 0 && (
          <p className="sports-empty text-muted">
            No commitments match that filter — try a shorter search or switch back to All.
          </p>
        )}
      </div>

      {data.rosterNote && <p className="sports-note text-muted">{data.rosterNote}</p>}
      <SourceRow sources={data.sources} />
    </div>
  )
}

/* ------------------------------------------------ 1d · honors & pro alumni -- */

export function HonorsBody({ data }: { data: HonorsAndPros }) {
  const { t } = useTranslation()
  return (
    <div className="sports-body">
      <Lead headline={data.headline} subhead={data.subhead} />

      {data.pros.length > 0 && (
        <div className="sports-pros">
          {data.pros.map((p) => (
            <div key={p.name} className="sports-pro">
              <div className="sports-pro-kicker text-muted">{p.kicker}</div>
              <div className="sports-pro-name">{p.name}</div>
              <div className="sports-pro-detail">{p.detail}</div>
              {p.path && <div className="sports-pro-path text-muted">{p.path}</div>}
            </div>
          ))}
        </div>
      )}

      <Heading>{t('sports.honorsLedger')}</Heading>
      <div className="sports-scroll">
        <div className="sports-ledger">
          {data.honors.map((h) => (
            <div key={h.label} className="sports-honor">
              <span className="sports-honor-label">{h.label}</span>
              <span className="sports-honor-text">{h.text}</span>
              {h.tag && (
                <span className={h.tagStyle === 'outline' ? 'tag-outline' : 'tag-accent'}>
                  {h.tag}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <SourceRow sources={data.sources} />
    </div>
  )
}

/* ---------------------------------------------------------- 1e · coaching -- */

export function CoachingBody({ data }: { data: Coaching }) {
  const { t } = useTranslation()
  return (
    <div className="sports-body">
      <Lead headline={data.headline} subhead={data.subhead} />

      <div className={data.featured.length > 1 ? 'sports-coaches' : 'sports-coaches is-single'}>
        {data.featured.map((c) => (
          <div key={c.name} className="sports-coach">
            <div className="sports-pro-kicker text-muted">{c.kicker}</div>
            <div className="sports-coach-name">{c.name}</div>
            <div className="sports-coach-stats">
              {c.stats.map((s) => (
                <div key={s.label}>
                  <div className="sports-coach-stat">{localizeMoneyText(s.value)}</div>
                  <div className="text-muted sports-coach-statlabel">{s.label}</div>
                </div>
              ))}
            </div>
            <p className="sports-p">{c.detail}</p>
          </div>
        ))}
      </div>

      <Heading>{t('sports.tenureLedger')}</Heading>
      <div className="sports-scroll sports-scroll-short">
        <div className="sports-tenures">
          {data.tenure.map((t) => (
            <div key={t.name} className="sports-tenure">
              <span className="sports-tenure-name">{t.name}</span>
              <span className="text-muted sports-tenure-role">{t.role}</span>
              <span className="sports-bar-track sports-bar-track-xs">
                <span
                  className="sports-bar-fill"
                  style={{ width: `${Math.round(t.width * 100)}%` }}
                />
              </span>
              <span className="sports-tenure-since">
                {t.since}
                {t.toVerify && <ToVerify />}
              </span>
            </div>
          ))}
        </div>
      </div>

      {data.worthKnowing && (
        <p className="sports-note">
          <strong className="sports-note-strong">{t('sports.worthKnowing')}</strong> {data.worthKnowing}
        </p>
      )}
      <SourceRow sources={data.sources} />
    </div>
  )
}

/* ------------------------------------------ 1f · facilities & athlete care -- */

export function FacilitiesBody({ data }: { data: Facilities }) {
  const { t } = useTranslation()
  return (
    <div className="sports-body">
      <Lead headline={data.headline} subhead={data.subhead} />

      {/* Photo strip — rendered only when real photos were sourced. */}
      {data.photos && data.photos.length > 0 && (
        <div className="sports-photos">
          {data.photos.map((p) => (
            <figure key={p.src} className="sports-photo">
              <img src={p.src} alt={p.name} loading="lazy" />
              <figcaption>
                <strong>{p.name}</strong>
                {p.meta && <> · {p.meta}</>}
                {p.caption && <div className="text-muted">{p.caption}</div>}
                {p.credit && <div className="text-muted sports-credit">{p.credit}</div>}
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      <div className="sports-split">
        <div>
          <Heading>{t('sports.venueLedger')}</Heading>
          <div className="sports-scroll sports-scroll-short">
            <div className="sports-venues">
              {data.venues.map((v) => (
                <div key={v.name} className="sports-venue">
                  <span>{v.name}</span>
                  <span className="text-muted">{v.detail}</span>
                </div>
              ))}
            </div>
          </div>
          {data.broadcast && (
            <p className="sports-note">
              <strong className="sports-note-strong">{t('cardLabels.broadcastGameDay')}</strong>{' '}
              {data.broadcast}
            </p>
          )}
        </div>
        <div className="sports-panel">
          <Heading>{t('sports.careModel')}</Heading>
          <div className="sports-scroll sports-scroll-med">
            <div className="sports-care">
              {data.care.map((c) => (
                <div key={c.label} className="sports-care-row">
                  <span className="sports-care-label">{c.label}</span>
                  <span>{c.text}</span>
                </div>
              ))}
            </div>
          </div>
          {data.careNote && <p className="sports-note text-muted">{data.careNote}</p>}
        </div>
      </div>

      <SourceRow sources={data.sources} />
    </div>
  )
}

/* ----------------------------------------------- 1g · national stage & NIL -- */

export function NationalStageBody({ data }: { data: NationalStage }) {
  const { t } = useTranslation()
  return (
    <div className="sports-body">
      <Lead headline={data.headline} subhead={data.subhead} />
      <StatStrip stats={data.stats} />

      <div className="sports-split">
        <div>
          <Heading>{data.scheduleTitle ?? t('cardLabels.nationalSchedule')}</Heading>
          <div className="sports-scroll sports-scroll-short">
            <div className="sports-care">
              {data.schedule.map((s) => (
                <div key={s.opponent} className="sports-care-row">
                  <span className="sports-care-label">{s.opponent}</span>
                  <span className="text-muted">{s.detail}</span>
                </div>
              ))}
            </div>
          </div>
          {data.scheduleNote && <p className="sports-note text-muted">{data.scheduleNote}</p>}
        </div>

        <div className="sports-panel">
          <Heading>{data.nilTitle ?? t('cardLabels.nilTimeline')}</Heading>
          <div className="sports-timeline">
            {data.nil.map((e, i) => (
              <div key={e.date} className="sports-tl-row">
                <span className="sports-tl-rail">
                  <span className={e.highlight ? 'sports-tl-dot is-on' : 'sports-tl-dot'} />
                  {i < data.nil.length - 1 && <span className="sports-tl-line" />}
                </span>
                <span className="sports-tl-text">
                  <strong>{e.date}</strong> — {e.text}
                  {e.tag && <span className="tag-accent sports-tl-tag">{e.tag}</span>}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SourceRow sources={data.sources} />
    </div>
  )
}
