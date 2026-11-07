// The shared shape of a Compare "offered" matrix: The Arts, Course Offerings,
// Student Clubs and Summer Programs (plan `comparerows`, 2026-11-07). The
// Sports matrix (sportsMatrix.ts / CompareSportsRows.tsx) predates it and keeps
// its own shape; the four builders here (artsMatrix.ts, courseMatrix.ts,
// clubsMatrix.ts, summerMatrix.ts) each return a topic-specific row set that
// the thin components in CompareMatrixRows.tsx turn into these DISPLAY rows.
//
// WHY COMPUTED, NOT TYPED INTO VALUE_METRICS: every cell is a function of data
// a school page already holds (or, for the arts, of a typed claim that cites
// that data verbatim). Consequences, as for sports: no overlay entries, no
// school-page tiles, no effect on `coverage:floor`.
//
// THE NEGATIVE CELL READS "NOT LISTED", NEVER "NO". Each source is a curated
// list or a school's own taxonomy, not a complete roster, so an absent item is
// "not named on the school's pages", not "not offered". Sports keeps "No",
// because a sports list is a roster.
//
// This module holds TYPES and constants only, so it loads under plain Node for
// the checker and the schema generator.

export type Division = 'LS' | 'MS' | 'US'
export const DIVISIONS: Division[] = ['LS', 'MS', 'US']

/** One rendered cell. Strings are final (already localized by the caller). */
export type MatrixCell =
  | { state: 'na'; tip: string[] }
  | { state: 'yes'; divs?: Division[]; sub?: string; tip: string[] }
  | { state: 'notListed'; tip: string[] }

export type MatrixDisplayRow = {
  key: string
  label: string
  cells: Record<string, MatrixCell>
}

export type MatrixDisplayGroup = {
  key: string
  label: string
  rows: MatrixDisplayRow[]
}

/** Builders share this per-cell result before the chrome strings are composed. */
export type BuiltCell =
  | { state: 'na' }
  | { state: 'notListed' }
  | { state: 'yes'; divs?: Division[] }

/** Sort rows by their localized label, as the Sports group does. */
export function sortRowsByLabel<T extends { label: string }>(rows: T[], lang: string): T[] {
  const collator = new Intl.Collator(lang)
  return [...rows].sort((a, b) => collator.compare(a.label, b.label))
}
