// Computed rules behind the Wells Fargo Cup card. Everything a school's card
// says is derived here from the shared ledger (data/wellsFargoCup.ts), so a
// later school needs data, not component changes, and no headline figure is
// ever typed by hand.
//
// Every function takes the ledger as its last argument so check:cup can run the
// states no shipped school reaches yet (never won, a missing year, an estimate,
// hidden splits). The app always uses the default.

import {
  CUP_DIVISION_LEADERS,
  CUP_RECORDS,
  CUP_SEASONS,
  CUP_SHORT_NAMES,
  type CupDivisionLeader,
  type CupRecord,
} from '../data/wellsFargoCup.ts'
import type { CupProgram } from '../data/sportsProgram.ts'

export type CupLedger = {
  seasons: readonly string[]
  records: CupRecord[]
  leaders: CupDivisionLeader[]
}

export const CUP_LEDGER: CupLedger = {
  seasons: CUP_SEASONS,
  records: CUP_RECORDS,
  leaders: CUP_DIVISION_LEADERS,
}

export type CupTerm = 'fall' | 'winter' | 'spring'
export const CUP_TERMS: CupTerm[] = ['fall', 'winter', 'spring']

/** One school's records, oldest season first. */
export function recordsFor(slug: string, ledger: CupLedger = CUP_LEDGER): CupRecord[] {
  return ledger.seasons.flatMap((season) =>
    ledger.records.filter((r) => r.school === slug && r.season === season),
  )
}

function recordOf(slug: string, season: string, ledger: CupLedger): CupRecord | undefined {
  return ledger.records.find((r) => r.school === slug && r.season === season)
}

/** The school's most recent division, or undefined with no ledger rows. */
function latestRecord(slug: string, ledger: CupLedger): CupRecord | undefined {
  return recordsFor(slug, ledger).at(-1)
}

export function cupName(slug: string): string {
  return CUP_SHORT_NAMES[slug] ?? slug
}

/** The classifications a school played in, in order: '4A', or '2A / 3A'. */
export function classLabel(slug: string, ledger: CupLedger = CUP_LEDGER): string {
  return [...new Set(recordsFor(slug, ledger).map((r) => r.classification))].join(' / ')
}

/**
 * The slugs on a school's table: every school in the same association and
 * classification in at least one season, sorted by latest-season place. NCHSAA
 * rows can never enter an NCISAA table, because their scores are not comparable.
 */
export function divisionRows(slug: string, ledger: CupLedger = CUP_LEDGER): string[] {
  const own = recordsFor(slug, ledger)
  if (own.length === 0) return []
  const latestSeason = ledger.seasons.at(-1) ?? ''
  const shares = (school: string) =>
    own.some((r) => {
      const other = recordOf(school, r.season, ledger)
      return other?.association === r.association && other.classification === r.classification
    })
  const place = (school: string) => recordOf(school, latestSeason, ledger)?.place ?? Infinity
  return [...new Set(ledger.records.map((r) => r.school))]
    .filter(shares)
    .sort((a, b) => place(a) - place(b))
}

export type CupCell = { result: CupRecord } | { otherClass: string } | null

/**
 * One table cell. A school in another class that season shows "In 3A", and a
 * season with no record shows an em dash. The selected school always shows its
 * own result, since its division is what defines the column.
 */
export function cell(
  row: string,
  season: string,
  selected: string,
  ledger: CupLedger = CUP_LEDGER,
): CupCell {
  const rec = recordOf(row, season, ledger)
  if (!rec) return null
  if (row === selected) return { result: rec }
  const division = recordOf(selected, season, ledger) ?? latestRecord(selected, ledger)
  if (!division || rec.association !== division.association) return null
  return rec.classification === division.classification
    ? { result: rec }
    : { otherClass: rec.classification }
}

/**
 * Per season: the selected school's points minus the best other local school in
 * that division. Null when it did not finish 1st, or has no local rival there.
 */
export function leadRow(slug: string, ledger: CupLedger = CUP_LEDGER): (number | null)[] {
  return ledger.seasons.map((season) => {
    const own = recordOf(slug, season, ledger)
    if (!own || own.place !== 1) return null
    const others = ledger.records
      .filter(
        (r) =>
          r.season === season &&
          r.school !== slug &&
          r.association === own.association &&
          r.classification === own.classification,
      )
      .map((r) => r.points)
    return others.length > 0 ? own.points - Math.max(...others) : null
  })
}

function leaderAt(own: CupRecord, place: number, ledger: CupLedger) {
  return ledger.leaders.find(
    (l) =>
      l.association === own.association &&
      l.classification === own.classification &&
      l.season === own.season &&
      l.place === place,
  )
}

/** Per season: the winner's points minus the selected school's. Null when it won. */
export function gapBehindFirst(slug: string, ledger: CupLedger = CUP_LEDGER): (number | null)[] {
  return ledger.seasons.map((season) => {
    const own = recordOf(slug, season, ledger)
    if (!own || own.place === 1) return null
    const winner = leaderAt(own, 1, ledger)
    return winner ? winner.points - own.points : null
  })
}

export type CupRival = {
  name: string
  points: number
  fall?: number
  winter?: number
  spring?: number
}

/**
 * The school the selected one raced in a season: 2nd place if it won, otherwise
 * the winner. Comes from the leaders table, because a rival can be off-roster.
 */
export function seasonRival(
  slug: string,
  season: string,
  ledger: CupLedger = CUP_LEDGER,
): CupRival | null {
  const own = recordOf(slug, season, ledger)
  if (!own) return null
  const l = leaderAt(own, own.place === 1 ? 2 : 1, ledger)
  if (!l) return null
  return {
    name: l.slug ? cupName(l.slug) : l.school,
    points: l.points,
    fall: l.fall,
    winter: l.winter,
    spring: l.spring,
  }
}

/** The rival for the fall/winter/spring bars; null hides them when splits are missing. */
export function nearestRival(
  slug: string,
  season: string,
  ledger: CupLedger = CUP_LEDGER,
): CupRival | null {
  const own = recordOf(slug, season, ledger)
  const rival = seasonRival(slug, season, ledger)
  if (!own || !rival) return null
  const hasSplits = (s: { fall?: number; winter?: number; spring?: number }) =>
    CUP_TERMS.every((term) => s[term] != null)
  return hasSplits(own) && hasSplits(rival) ? rival : null
}

export type CupHeadline = {
  cupsWon: number
  seasonsTotal: number
  latest: CupRecord
  /** Most recent title, for the single-title headline. */
  lastWin: CupRecord | null
  peak: CupRecord
  /** Positive when the school won the season, negative for a gap behind 1st. */
  latestMargin: { value: number; rival: CupRival } | null
  /** Best of fall/winter/spring in the latest year; null without splits. */
  bestSeason: { term: CupTerm; points: number } | null
  /** Consecutive 1st places counting back from the latest record. */
  currentStreak: number
  /** Best place, most recent on a tie. */
  bestFinish: CupRecord
}

export function headlineStats(slug: string, ledger: CupLedger = CUP_LEDGER): CupHeadline | null {
  const own = recordsFor(slug, ledger)
  const latest = own.at(-1)
  if (!latest) return null

  const wins = own.filter((r) => r.place === 1)
  const firstNonWin = own.findLastIndex((r) => r.place !== 1)
  const rival = seasonRival(slug, latest.season, ledger)
  const splits = CUP_TERMS.flatMap((term) => {
    const points = latest[term]
    return points == null ? [] : [{ term, points }]
  })

  return {
    cupsWon: wins.length,
    seasonsTotal: own.length,
    latest,
    lastWin: wins.at(-1) ?? null,
    peak: own.reduce((best, r) => (r.points >= best.points ? r : best)),
    latestMargin: rival ? { value: latest.points - rival.points, rival } : null,
    bestSeason:
      splits.length === CUP_TERMS.length
        ? splits.reduce((best, s) => (s.points > best.points ? s : best))
        : null,
    currentStreak: own.length - 1 - firstNonWin,
    bestFinish: own.reduce((best, r) => (r.place <= best.place ? r : best)),
  }
}

/**
 * True when the school won its latest season after trailing the rival through
 * both fall and winter, which is what the comeback line says.
 */
export function isComeback(slug: string, ledger: CupLedger = CUP_LEDGER): boolean {
  const own = latestRecord(slug, ledger)
  if (!own || own.place !== 1) return false
  const rival = nearestRival(slug, own.season, ledger)
  if (!rival) return false
  const [ownFall, ownWinter, rivalFall, rivalWinter] = [own.fall, own.winter, rival.fall, rival.winter]
  if (ownFall == null || ownWinter == null || rivalFall == null || rivalWinter == null) return false
  return rivalFall > ownFall && rivalFall + rivalWinter > ownFall + ownWinter
}

/** A points figure as printed: `~` marks an estimate. */
export function pointsToken(record: CupRecord, format: (n: number) => string): string {
  return `${record.isEstimate ? '~' : ''}${format(record.points)}`
}

/** True when any row on the school's table is an estimate, which requires TO VERIFY. */
export function hasEstimate(slug: string, ledger: CupLedger = CUP_LEDGER): boolean {
  return divisionRows(slug, ledger).some((row) =>
    ledger.seasons.some((season) => {
      const c = cell(row, season, slug, ledger)
      return c != null && 'result' in c && c.result.isEstimate
    }),
  )
}

/** Whether a sport wears the outline on the "Sports that count" grid. */
export function isCupOutlined(
  cup: CupProgram,
  season: CupTerm,
  gender: 'boys' | 'girls' | 'both',
  sportKey: string,
): boolean {
  return cup.pointSources.some(
    (s) =>
      s.sport === sportKey &&
      s.season === season &&
      (gender === 'both' || s.gender === gender),
  )
}
