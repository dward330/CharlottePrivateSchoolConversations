/**
 * The College Pipeline's numbers, derived from its roster.
 *
 * The funnel counts and the "D1 commits by sport" bars used to be typed by hand
 * beside the roster they summarize. At six schools the bars drifted from it:
 * they counted EVERY commitment under a heading that says Division I. Deriving
 * them makes that drift impossible; `check:consistency` then verifies the
 * typed prose headline and the Compare commit rows against these same numbers.
 *
 * THE WINDOW. The funnel and the bars cover the Classes of 2024–2026. Class of
 * 2027 rows are current seniors' commitments (mostly verbal), listed on the
 * roster and counted by the Compare `seniors-committed` row, never here.
 *
 * Plain functions with type-only imports, so the build-time checker can run
 * this under Node.
 */
import type { CollegePipeline, Commit } from '../data/sportsProgram.ts'

/** The class excluded from the 2024–26 funnel and bars. */
export const CURRENT_SENIOR_CLASS = "'27"

const isD1 = (r: Commit) => r.level === 'D1' || r.level === 'P4'
const isP4 = (r: Commit) => r.level === 'P4'

export type DerivedBar = {
  sport: string
  /** Division I commits (Power 4 included) in this bar's sports. */
  count: number
  /** The Power 4 subset. */
  p4: number
  /** Bar width 0–1, relative to the largest bar. */
  width: number
  /** Power 4 width 0–1, on the same scale; omitted when there are none. */
  p4Width?: number
}

export type PipelineCounts = {
  /** Every documented commitment, 2024–26: roster rows plus `offRosterCommits`. */
  all: number
  /** Division I, Power 4 included. */
  d1: number
  p4: number
  /** Class of 2027 rows (the Compare `seniors-committed` row). */
  seniors: number
  /** Bars with at least one D1 commit, largest first (ties keep data order; "Other" last). */
  bars: DerivedBar[]
}

/** The 2024–26 rows the funnel and bars count. */
export function windowRows(p: CollegePipeline): Commit[] {
  return p.roster.filter((r) => r.cls !== CURRENT_SENIOR_CLASS)
}

export function pipelineCounts(p: CollegePipeline): PipelineCounts {
  const rows = windowRows(p)
  const d1Rows = rows.filter(isD1)
  const named = new Set(
    p.sportBars.flatMap((b) => (Array.isArray(b.match) ? b.match : [])),
  )
  const raw = p.sportBars.map((b, i) => {
    const inBar = d1Rows.filter((r) =>
      b.match === 'other' ? !named.has(r.sport) : b.match.includes(r.sport),
    )
    return { sport: b.sport, count: inBar.length, p4: inBar.filter(isP4).length, i, other: b.match === 'other' }
  })
  const shown = raw
    .filter((b) => b.count > 0)
    .sort((a, b) => Number(a.other) - Number(b.other) || b.count - a.count || a.i - b.i)
  const max = Math.max(1, ...shown.map((b) => b.count))
  return {
    all: rows.length + (p.offRosterCommits ?? 0),
    d1: d1Rows.length,
    p4: rows.filter(isP4).length,
    seniors: p.roster.length - rows.length,
    bars: shown.map(({ sport, count, p4 }) => ({
      sport,
      count,
      p4,
      width: count / max,
      ...(p4 > 0 ? { p4Width: p4 / max } : {}),
    })),
  }
}

/** The figure a derived funnel stage shows. */
export function derivedStageCount(
  counts: PipelineCounts,
  derive: 'all' | 'd1' | 'p4',
): number {
  return counts[derive]
}
