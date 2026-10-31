// The "Sports" research area — the expanded bodies of the eight consolidated
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
import { number, winPct, localizeMoneyText, isolateFigures } from '../lib/format.ts'
import { SHOW_TO_VERIFY } from '../lib/toVerify.ts'
import { assetUrl } from '../lib/asset.ts'
import { useTranslation } from 'react-i18next'
import { SourceRow } from './SourceRow.tsx'
import { PhotoViewer, PhotoZoomButton, type ViewerPhoto } from './PhotoViewer.tsx'
import { usePhotoViewer } from './usePhotoViewer.ts'
import { CUP_POINTS, CUP_SEASONS, CUP_SPORTS } from '../data/wellsFargoCup.ts'
import {
  CUP_TERMS,
  classLabel,
  cell as cupCell,
  cupName,
  divisionRows,
  gapBehindFirst,
  hasEstimate,
  headlineStats,
  isComeback,
  isCupOutlined,
  leadRow,
  nearestRival,
  pointsToken,
  type CupHeadline,
  type CupTerm,
} from '../lib/wellsFargoCup.ts'
import type {
  Coaching,
  CollegePipeline,
  CommitLevel,
  CupProgram,
  Facilities,
  HonorsAndPros,
  Level,
  NationalStage,
  SportsOffered,
  StatTile,
  TitleCell,
  TitleRow,
  WinningRecord,
} from '../data/sportsProgram.ts'

/* ------------------------------------------------------------ primitives -- */


/** The lead paragraph: bold headline plus muted continuation. */
function Lead({ headline, subhead }: { headline: string; subhead?: string }) {
  return (
    <p className="sports-lead">
      <strong>{localizeMoneyText(headline)}</strong>
      {subhead && <span className="text-muted"> {localizeMoneyText(subhead)}</span>}
    </p>
  )
}

/** The four-up stat strip used by 1a and 1g. */
function StatStrip({ stats }: { stats: (Omit<StatTile, 'value'> & { value: React.ReactNode })[] }) {
  return (
    <div className="sports-stats hairline-grid">
      {stats.map((s) => (
        <div key={s.label} className="sports-stat">
          <div className="sports-stat-val">
            {typeof s.value === 'string' ? localizeMoneyText(s.value) : s.value}
          </div>
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

/** Dev-only: hidden on the production site (see `lib/toVerify.ts`). */
function ToVerify() {
  const { t } = useTranslation()
  if (!SHOW_TO_VERIFY) return null
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

      {data.footnote && <p className="sports-note text-muted">{localizeMoneyText(data.footnote)}</p>}
      <SourceRow sources={data.sources} className="sports-src" localizeLabels={false} />
    </div>
  )
}

/* ------------------------------------------------- 1b · wells fargo cup -- */

/** "+2.5" or "−170". Signed tokens stay left-to-right inside RTL prose. */
function CupSigned({ value }: { value: number }) {
  return <bdi dir="ltr">{`${value >= 0 ? '+' : '−'}${number(Math.abs(value))}`}</bdi>
}

/** The headline sentence for whichever state the school is in. */
function cupHeadlineText(stats: CupHeadline, t: ReturnType<typeof useTranslation>['t']) {
  const { latest, lastWin, bestFinish, cupsWon, seasonsTotal, currentStreak } = stats
  if (currentStreak >= 2) {
    return t('sports.cup.headlineStreak', {
      count: currentStreak,
      association: latest.association,
      classification: latest.classification,
      won: cupsWon,
      total: seasonsTotal,
    })
  }
  if (cupsWon >= 2) {
    return t('sports.cup.headlineMulti', {
      association: latest.association,
      won: cupsWon,
      total: seasonsTotal,
    })
  }
  if (lastWin) {
    return t('sports.cup.headlineSingle', {
      association: lastWin.association,
      classification: lastWin.classification,
      season: lastWin.season,
    })
  }
  const ordinal = t('sports.cup.place', { count: bestFinish.place, ordinal: true })
  return t('sports.cup.headlineNever', {
    place: bestFinish.tied ? t('sports.cup.tied', { place: ordinal }) : ordinal,
    association: bestFinish.association,
    classification: bestFinish.classification,
    season: bestFinish.season,
  })
}

/** The computed Cup headline, which also serves as the card's collapsed teaser. */
export function wellsFargoCupHeadline(slug: string, t: ReturnType<typeof useTranslation>['t']) {
  const stats = headlineStats(slug)
  return stats ? isolateFigures(cupHeadlineText(stats, t)) : ''
}

/** The "How points are earned" grid: 1st–4th beside 5th–8th. */
function CupPointsGrid() {
  const { t } = useTranslation()
  const placeLabel = (place: number) => {
    const ordinal = t('sports.cup.place', { count: place, ordinal: true })
    if (place === 1) return t('sports.cup.pointsFirst', { place: ordinal })
    if (place === 2) return t('sports.cup.pointsSecond', { place: ordinal })
    return ordinal
  }
  return (
    <div className="cup-points">
      {[0, 4, 1, 5, 2, 6, 3, 7].map((i) => (
        <div key={i} className="cup-points-row">
          <span>{placeLabel(i + 1)}</span>
          <span className="cup-points-val">{number(CUP_POINTS[i])}</span>
        </div>
      ))}
    </div>
  )
}

/** "Sports that count": one column per season, with the school's sources outlined. */
function CupSportsGrid({ association, cup }: { association: 'NCISAA' | 'NCHSAA'; cup: CupProgram }) {
  const { t } = useTranslation()
  return (
    <div className="cup-sports">
      {CUP_TERMS.map((term) => {
        const sports = CUP_SPORTS[association][term]
        return (
          <div key={term} className="cup-sports-season">
            <div className="cup-sports-head">{t(`sports.cup.term_${term}`)}</div>
            {(['boys', 'girls', 'both'] as const).map((gender) => {
              const group = sports.filter((s) => s.gender === gender)
              if (group.length === 0) return null
              return (
                <div key={gender} className="cup-sports-group">
                  {gender !== 'both' && (
                    <span className="cup-sports-gender text-muted">
                      {t(`sports.cup.gender_${gender}`)}
                    </span>
                  )}
                  <div className="cup-sports-chips">
                    {group.map((s) => (
                      <span
                        key={s.key}
                        className={`cup-sport${isCupOutlined(cup, term, gender, s.key) ? ' is-source' : ''}`}
                      >
                        {t(`sports.cup.sport_${s.key}`)}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

/** The six-year table, ending in the lead row or the gap-behind-1st row. */
function CupTable({ slug }: { slug: string }) {
  const { t } = useTranslation()
  const lead = leadRow(slug)
  const won = lead.some((v) => v != null)
  const summary = won ? lead : gapBehindFirst(slug)
  // Latest year on the left. CUP_SEASONS and the summary values run oldest first.
  const seasons = [...CUP_SEASONS].reverse()
  const summaryValues = [...summary].reverse()
  const ordinal = (place: number, tied?: boolean) => {
    const o = t('sports.cup.place', { count: place, ordinal: true })
    return tied ? t('sports.cup.tied', { place: o }) : o
  }
  return (
    <div className="sports-scroll cup-scroll">
      <div className="cup-table">
        <div className="sports-th">{t('sports.cup.school')}</div>
        {seasons.map((season) => (
          <div key={season} className="sports-th">
            {isolateFigures(season)}
          </div>
        ))}
        {divisionRows(slug).map((row) => {
          const sel = row === slug ? ' is-selected' : ''
          return (
            <div key={row} className="cup-row">
              <div className={`cup-school${sel}`}>{cupName(row)}</div>
              {seasons.map((season) => {
                const c = cupCell(row, season, slug)
                return (
                  <div key={season} className={`cup-cell${sel}`}>
                    {c == null ? (
                      <span className="text-muted">—</span>
                    ) : 'otherClass' in c ? (
                      <span className="cup-other text-muted">
                        {t('sports.cup.otherClass', { classification: c.otherClass })}
                      </span>
                    ) : (
                      <>
                        <span className="cup-place">{ordinal(c.result.place, c.result.tied)}</span>
                        <bdi dir="ltr" className={`cup-pts${sel ? '' : ' text-muted'}`}>
                          {pointsToken(c.result, number)}
                        </bdi>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          )
        })}
        <div className="cup-row">
          <div className="cup-summary-label">
            {won
              ? t('sports.cup.leadRow', { school: cupName(slug) })
              : t('sports.cup.gapRow')}
          </div>
          {summaryValues.map((value, i) => (
            <div key={seasons[i]} className="cup-summary">
              {value == null ? (
                <span className="text-muted">—</span>
              ) : (
                <CupSigned value={won ? value : -value} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/** Latest-year fall/winter/spring bars, selected school against its rival. */
function CupRace({ slug, stats }: { slug: string; stats: CupHeadline }) {
  const { t } = useTranslation()
  const { latest } = stats
  const rival = nearestRival(slug, latest.season)
  if (!rival) return null
  const won = latest.place === 1
  const max = Math.max(...CUP_TERMS.flatMap((term) => [latest[term] ?? 0, rival[term] ?? 0]))
  const margin = stats.latestMargin?.value ?? 0
  return (
    <div className="cup-panel">
      <div className="cup-panel-h">
        {isolateFigures(t(won ? 'sports.cup.raceWon' : 'sports.cup.raceResult', { season: latest.season }))}
      </div>
      <div className="cup-race">
        {CUP_TERMS.map((term: CupTerm) => (
          <div key={term} className="cup-race-term">
            <span className="cup-race-name">{t(`sports.cup.term_${term}`)}</span>
            <div className="cup-race-bars">
              <span className="cup-race-track">
                <span
                  className="cup-race-bar is-own"
                  style={{ width: `${((latest[term] ?? 0) / max) * 100}%` }}
                />
              </span>
              <span>
                {cupName(slug)} {number(latest[term] ?? 0)}
              </span>
              <span className="cup-race-track">
                <span
                  className="cup-race-bar"
                  style={{ width: `${((rival[term] ?? 0) / max) * 100}%` }}
                />
              </span>
              <span className="text-muted">
                {rival.name} {number(rival[term] ?? 0)}
              </span>
            </div>
          </div>
        ))}
      </div>
      {isComeback(slug) && (
        <p className="cup-panel-note text-muted">
          {t('sports.cup.comeback', {
            rival: rival.name,
            school: cupName(slug),
            margin: number(margin),
          })}
        </p>
      )}
    </div>
  )
}

/** "Where the points come from": the school's verified titles and finals. */
function CupPointSources({ slug, cup }: { slug: string; cup: CupProgram }) {
  const { t } = useTranslation()
  return (
    <div className="cup-panel">
      <div className="cup-panel-h">{t('sports.cup.pointsFrom', { school: cupName(slug) })}</div>
      <div className="cup-sources">
        {cup.pointSources.map((s) => (
          <div key={`${s.gender}-${s.sport}`} className="cup-source">
            <span className="cup-source-name">
              {t(`sports.cup.genderSport_${s.gender}`, { sport: t(`sports.cup.sport_${s.sport}`) })}
            </span>
            <span className="text-muted">
              {s.titleYears.length > 0 && t('sports.cup.titles', { years: s.titleYears.join(', ') })}
              {s.titleYears.length > 0 && (s.runnerUpYears?.length ?? 0) > 0 && ' · '}
              {(s.runnerUpYears?.length ?? 0) > 0 &&
                t('sports.cup.runnerUps', { years: s.runnerUpYears?.join(', ') })}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function WellsFargoCupBody({ slug, data }: { slug: string; data: CupProgram }) {
  const { t } = useTranslation()
  const stats = headlineStats(slug)
  if (!stats) return null

  const { latest, peak, latestMargin, bestSeason, cupsWon, seasonsTotal } = stats
  const school = cupName(slug)
  const classification = classLabel(slug)
  const { association } = latest
  const rival = latestMargin?.rival
  const won = latest.place === 1
  const showRace = nearestRival(slug, latest.season) != null
  const hasSources = data.pointSources.length > 0
  const estimated = hasEstimate(slug)

  const tiles: { value: React.ReactNode; label: string }[] = [
    {
      value: `${cupsWon} / ${seasonsTotal}`,
      label: t('sports.cup.tileCups', {
        classification,
        first: CUP_SEASONS[0],
        last: CUP_SEASONS[CUP_SEASONS.length - 1],
      }),
    },
    {
      value: <bdi dir="ltr">{pointsToken(peak, number)}</bdi>,
      label: t('sports.cup.tilePeak', { season: peak.season }),
    },
  ]
  if (latestMargin && rival) {
    tiles.push({
      value: <CupSigned value={latestMargin.value} />,
      label: t(won ? 'sports.cup.tileMargin' : 'sports.cup.tileGap', {
        season: latest.season,
        rival: rival.name,
      }),
    })
  }
  if (bestSeason) {
    tiles.push({
      value: number(bestSeason.points),
      label: t(`sports.cup.tileBest_${bestSeason.term}`, { season: latest.season, school }),
    })
  }
  const isolatedTiles = tiles.map((tile) => ({ ...tile, label: isolateFigures(tile.label) }))

  return (
    <div className="sports-body">
      <Lead
        headline={cupHeadlineText(stats, t)}
        subhead={
          won && latestMargin && rival
            ? t('sports.cup.subhead', {
                season: latest.season,
                margin: number(latestMargin.value),
                points: number(latest.points),
                rival: rival.name,
                rivalPoints: number(rival.points),
              })
            : undefined
        }
      />

      <div className="cup-explain">
        <div>
          <Heading>{t('sports.cup.whatTitle')}</Heading>
          <p className="sports-p">{t('sports.cup.what1')}</p>
          <p className="sports-p">
            {t('sports.cup.what2', {
              school,
              association,
              classification: latest.classification,
            })}
          </p>
          <p className="sports-p">{t('sports.cup.what3')}</p>
        </div>
        <div>
          <Heading>{t('sports.cup.pointsTitle')}</Heading>
          <div className="cup-hint text-muted">{t('sports.cup.pointsHint')}</div>
          <CupPointsGrid />
          <p className="cup-hint cup-tie-rule text-muted">{t('sports.cup.tieRule')}</p>
        </div>
      </div>

      <Heading>{t('sports.cup.sportsTitle', { association })}</Heading>
      <div className="cup-hint text-muted">
        {hasSources
          ? t('sports.cup.sportsHint', { school })
          : t('sports.cup.sportsHintPlain')}
      </div>
      <CupSportsGrid association={association} cup={data} />

      <StatStrip stats={isolatedTiles} />

      <Heading>
        {t('sports.cup.tableTitle', { count: CUP_SEASONS.length, association, classification })}
      </Heading>
      <CupTable slug={slug} />

      {(showRace || hasSources) && (
        <div className={`cup-panels${showRace && hasSources ? '' : ' is-single'}`}>
          <CupRace slug={slug} stats={stats} />
          {hasSources && <CupPointSources slug={slug} cup={data} />}
        </div>
      )}

      {estimated && (
        <p className="sports-note text-muted">
          {t('sports.cup.estimateNote')} <ToVerify />
        </p>
      )}
      <SourceRow sources={data.sources} className="sports-src" localizeLabels={false} />
    </div>
  )
}

/* --------------------------------------------------- 1c · winning record -- */

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
      // The winner chip. RUNNER-UP and SEMIFINAL were translated but this
      // branch rendered `cell.result` raw, so "STATE" — the most prominent
      // label in the table — stayed English in every non-English locale
      // (8 times on one Telugu page). Matched by prefix, not equality,
      // because the data also carries "STATE x2": the count suffix is a
      // figure and is preserved verbatim.
      <span className="sports-chip">
        {cell.result.replace(/^STATE/, t('sports.state'))}
      </span>
    )
  return (
    <div className="sports-cell">
      {chip}
      {cell.toVerify && SHOW_TO_VERIFY ? (
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
          <strong className="sports-note-strong">{t('sports.didntWin')}</strong> {localizeMoneyText(data.didNotWin)}
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

      <SourceRow sources={data.sources} className="sports-src" localizeLabels={false} />
    </div>
  )
}

/* -------------------------------------------------- 1d · college pipeline -- */

/* Filter keys only — the visible label is resolved per locale at render, since
   these are chrome rather than research findings. */
const LEVEL_TABS: { key: 'all' | 'd1' | 'p4'; labelKey: string }[] = [
  { key: 'all', labelKey: 'cardLabels.filterAll' },
  { key: 'd1', labelKey: 'cardLabels.filterD1' },
  { key: 'p4', labelKey: 'cardLabels.filterP4' },
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

/** A 247Sports rank cell: the number links to the athlete's 247 profile; a dash when unranked. */
function RankCell({ n, url }: { n?: number; url?: string }) {
  return (
    <span className="sports-td sports-th-c">
      {n != null && url ? (
        <a className="sports-rank" href={url} target="_blank" rel="noopener noreferrer">
          {n}
        </a>
      ) : (
        <span className="text-muted">—</span>
      )}
    </span>
  )
}

function RosterRow({
  row,
  q,
  hasRanks,
}: {
  row: CollegePipeline['roster'][number]
  q: string
  hasRanks: boolean
}) {
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
      {hasRanks && (
        <>
          <RankCell n={row.rank247?.national} url={row.rank247?.url} />
          <RankCell n={row.rank247?.state} url={row.rank247?.url} />
        </>
      )}
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

  const hasRanks = data.roster.some((r) => r.rank247)
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
            <strong className="sports-funnel-count">{localizeMoneyText(stage.count)}</strong>
          </div>
        ))}
      </div>
      {data.funnelNote && <p className="sports-note text-muted">{localizeMoneyText(data.funnelNote)}</p>}

      {/* By-sport bars beside the reality-check panel. */}
      <div className="sports-split">
        <div>
          <Heading>
            {t('cardLabels.d1CommitsBySport')}{' '}
            <span className="text-muted sports-h-hint">{t('cardLabels.p4ShareHint')}</span>
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
          {LEVEL_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={filter === tab.key ? 'catalog-chip is-active' : 'catalog-chip'}
              aria-pressed={filter === tab.key}
              onClick={() => setFilter(tab.key)}
            >
              {t(tab.labelKey)}
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
        <div className={hasRanks ? 'sports-roster has-ranks' : 'sports-roster'}>
          <div className="sports-th">{t('sports.classLabel')}</div>
          <div className="sports-th">{t('sports.athlete')}</div>
          <div className="sports-th">{t('sports.sport')}</div>
          <div className="sports-th">{t('sports.college')}</div>
          <div className="sports-th">{t('sports.conference')}</div>
          {hasRanks && (
            <>
              <div className="sports-th sports-th-c" title={t('sports.rank247Title')}>
                {t('sports.rankNational')}
              </div>
              <div className="sports-th sports-th-c" title={t('sports.rank247Title')}>
                {t('sports.rankState')}
              </div>
            </>
          )}
          <div className="sports-th sports-th-c">{t('sports.level')}</div>
          {rows.map((r, i) => (
            <RosterRow key={`${r.name}-${i}`} row={r} q={q} hasRanks={hasRanks} />
          ))}
        </div>
        {rows.length === 0 && (
          <p className="sports-empty text-muted">
            No commitments match that filter — try a shorter search or switch back to All.
          </p>
        )}
      </div>

      {hasRanks && <p className="sports-note text-muted">{t('sports.rank247Note')}</p>}
      {data.rosterNote && <p className="sports-note text-muted">{localizeMoneyText(data.rosterNote)}</p>}
      <SourceRow sources={data.sources} className="sports-src" localizeLabels={false} />
    </div>
  )
}

/* ------------------------------------------------ 1e · honors & pro alumni -- */

export function HonorsBody({ data }: { data: HonorsAndPros }) {
  const { t } = useTranslation()
  return (
    <div className="sports-body">
      <Lead headline={data.headline} subhead={data.subhead} />

      {data.pros.length > 0 && (
        <div className="sports-pros hairline-grid">
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

      <SourceRow sources={data.sources} className="sports-src" localizeLabels={false} />
    </div>
  )
}

/* ---------------------------------------------------------- 1f · coaching -- */

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
              {/* No tenure bar (user, 2026-10-19): its length was relative to the
                  longest tenure on THAT school's list, so the same bar meant 3
                  years on one page and 20 on another, and it said nothing the
                  "since" year beside it does not say better. */}
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
          <strong className="sports-note-strong">{t('sports.worthKnowing')}</strong> {localizeMoneyText(data.worthKnowing)}
        </p>
      )}
      <SourceRow sources={data.sources} className="sports-src" localizeLabels={false} />
    </div>
  )
}

/* ------------------------------------------ 1g · facilities & athlete care -- */

export function FacilitiesBody({ data }: { data: Facilities }) {
  const { t } = useTranslation()
  const viewer = usePhotoViewer()
  const viewerPhotos: ViewerPhoto[] = (data.photos ?? []).map((p) => ({
    src: assetUrl(p.src),
    alt: p.name,
    title: p.name,
    meta: p.meta,
    caption: p.caption,
    credit: p.credit,
  }))
  return (
    <div className="sports-body">
      <Lead headline={data.headline} subhead={data.subhead} />

      {/* Photo strip — rendered only when real photos were sourced. Each
          thumbnail opens the shared viewer, one group per school. */}
      {data.photos && data.photos.length > 0 && (
        <div className="sports-photos">
          {data.photos.map((p, i) => (
            <figure key={p.src} className="sports-photo">
              <PhotoZoomButton label={p.name} onOpen={(el) => { viewer.open(i, el) }}>
                <img src={assetUrl(p.src)} alt={p.name} loading="lazy" />
              </PhotoZoomButton>
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
      <PhotoViewer
        photos={viewerPhotos}
        index={viewer.index}
        onIndexChange={viewer.setIndex}
        onClose={viewer.close}
      />

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
              {localizeMoneyText(data.broadcast)}
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
          {data.careNote && <p className="sports-note text-muted">{localizeMoneyText(data.careNote)}</p>}
        </div>
      </div>

      <SourceRow sources={data.sources} className="sports-src" localizeLabels={false} />
    </div>
  )
}

/* ----------------------------------------------- 1h · national stage & NIL -- */

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
          {data.scheduleNote && <p className="sports-note text-muted">{localizeMoneyText(data.scheduleNote)}</p>}
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

      <SourceRow sources={data.sources} className="sports-src" localizeLabels={false} />
    </div>
  )
}
