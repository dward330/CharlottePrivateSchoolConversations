// The Compare page's "Sports offered" group: one row per sport, one cell per
// school, computed from each school's Sports Offered card (`offered`).
//
// WHY COMPUTED, NOT TYPED INTO VALUE_METRICS. Every cell is a pure function of
// data the school pages already show. Typing the rows into metricValues.ts
// would make a second copy that a check then has to chase (the Wells Fargo Cup
// rows pay that cost because their cells come from a different source than the
// card; these do not). Consequences: no overlay entries, no school-page stat
// tiles, and no effect on `coverage:floor`, which reads only VALUE_METRICS.
//
// SPORT LABELS ARE THE SHARED `sports.cup.sport_<key>` VOCABULARY in the locale
// catalogs, the same keys the Wells Fargo Cup card uses, so each sport is
// translated once. A SportKey without that key fails `check:sportsmatrix`.
//
// NORMALIZATION IS AN EXPLICIT TABLE, NOT A REGEX. A new school's new spelling
// lands in `unmapped`, is not rendered, and fails `check:sportsmatrix` (chained
// into the build), instead of silently becoming a row of its own.
//
// B / G ONLY WHERE THE SCHOOL STATES IT. An entry the school lists without a
// gender (`Football`, every Charlotte Catholic entry) gets no letter, and the
// cell's tooltip says so. Gender is never inferred by convention.
//
// This module imports ONLY TYPES, so it loads under plain Node for the check
// and the schema generator.

import type { Level, SportsOffered } from '../data/sportsProgram.ts'

export type SportKey =
  | 'baseball'
  | 'basketball'
  | 'cheerleading'
  | 'crossCountry'
  | 'dance'
  | 'fieldHockey'
  | 'football'
  | 'golf'
  | 'hockey'
  | 'indoorTrack'
  | 'lacrosse'
  | 'mountainBiking'
  | 'rowing'
  | 'rugby'
  | 'soccer'
  | 'softball'
  | 'swimming'
  | 'tennis'
  | 'trackField'
  | 'volleyball'
  | 'wrestling'

export const SPORT_KEYS: SportKey[] = [
  'baseball', 'basketball', 'cheerleading', 'crossCountry', 'dance', 'fieldHockey', 'football',
  'golf', 'hockey', 'indoorTrack', 'lacrosse', 'mountainBiking', 'rowing', 'rugby', 'soccer',
  'softball', 'swimming', 'tennis', 'trackField', 'volleyball', 'wrestling',
]

export type GenderMark = 'B' | 'G' | 'CO'
/** One level of one school's sport: the genders the school states, and whether any entry stated none. */
export type LevelCell = { marks: GenderMark[]; unstated: boolean }
export type SportCell = Partial<Record<Level, LevelCell>>
export type SeasonKey = 'fall' | 'winter' | 'spring'

type Alias = { key: SportKey; gender: 'B' | 'G' | 'BG' | 'CO' | null }

/** Every raw `offered…sports[].name` on a comparable school, mapped to its row and stated gender. */
export const SPORT_ALIASES: Record<string, Alias> = {
  'Baseball': { key: 'baseball', gender: null },
  'Baseball (Boys)': { key: 'baseball', gender: 'B' },
  'Basketball': { key: 'basketball', gender: null },
  'Basketball (Boys)': { key: 'basketball', gender: 'B' },
  'Basketball (Girls)': { key: 'basketball', gender: 'G' },
  'Cheerleading': { key: 'cheerleading', gender: null },
  'Cheerleading (Winter)': { key: 'cheerleading', gender: null },
  'Cheering': { key: 'cheerleading', gender: null },
  'Cross Country': { key: 'crossCountry', gender: null },
  'Cross Country (B & G)': { key: 'crossCountry', gender: 'BG' },
  'Cross Country (Boys)': { key: 'crossCountry', gender: 'B' },
  'Cross Country (Girls)': { key: 'crossCountry', gender: 'G' },
  'Dance': { key: 'dance', gender: null },
  'Dance Team': { key: 'dance', gender: null },
  'Field Hockey': { key: 'fieldHockey', gender: null },
  'Field Hockey (Girls)': { key: 'fieldHockey', gender: 'G' },
  'Football': { key: 'football', gender: null },
  'Golf': { key: 'golf', gender: null },
  'Golf (Boys)': { key: 'golf', gender: 'B' },
  'Golf (Girls)': { key: 'golf', gender: 'G' },
  'Golf (Co-ed)': { key: 'golf', gender: 'CO' },
  'Hockey': { key: 'hockey', gender: null },
  'Indoor Track': { key: 'indoorTrack', gender: null },
  'Indoor Track & Field': { key: 'indoorTrack', gender: null },
  'Indoor Track (B & G)': { key: 'indoorTrack', gender: 'BG' },
  'Lacrosse': { key: 'lacrosse', gender: null },
  'Lacrosse (Boys)': { key: 'lacrosse', gender: 'B' },
  'Lacrosse (Girls)': { key: 'lacrosse', gender: 'G' },
  'Mountain Biking': { key: 'mountainBiking', gender: null },
  'Rowing (Co-ed)': { key: 'rowing', gender: 'CO' },
  'Rugby': { key: 'rugby', gender: null },
  'Soccer': { key: 'soccer', gender: null },
  'Soccer (Boys)': { key: 'soccer', gender: 'B' },
  'Soccer (Girls)': { key: 'soccer', gender: 'G' },
  'Softball': { key: 'softball', gender: null },
  'Softball (Girls)': { key: 'softball', gender: 'G' },
  'Swimming': { key: 'swimming', gender: null },
  'Swimming and Diving': { key: 'swimming', gender: null },
  'Swimming (B & G)': { key: 'swimming', gender: 'BG' },
  'Swimming (Boys)': { key: 'swimming', gender: 'B' },
  'Swimming (Girls)': { key: 'swimming', gender: 'G' },
  'Tennis': { key: 'tennis', gender: null },
  'Tennis (Boys)': { key: 'tennis', gender: 'B' },
  'Tennis (Girls)': { key: 'tennis', gender: 'G' },
  'Track & Field': { key: 'trackField', gender: null },
  'Track & Field (B & G)': { key: 'trackField', gender: 'BG' },
  'Volleyball': { key: 'volleyball', gender: null },
  'Volleyball (Girls)': { key: 'volleyball', gender: 'G' },
  'Wrestling': { key: 'wrestling', gender: null },
  'Wrestling (Boys)': { key: 'wrestling', gender: 'B' },
}

export type MatrixRow = {
  key: SportKey
  /** Seasons any school plays it in, fall → winter → spring. */
  seasons: SeasonKey[]
  /** Schools whose list includes it. */
  count: number
  /** Per school slug: the levels (Yes), `null` (No), or `'na'` (no `offered` data). */
  cells: Record<string, SportCell | null | 'na'>
}

export type SportsMatrix = {
  rows: MatrixRow[]
  unmapped: { slug: string; name: string }[]
  /** A level mixing gendered and ungendered entries; rendered with the known genders, reported by the check. */
  mixed: { slug: string; key: SportKey; level: Level }[]
}

const LEVELS: Level[] = ['V', 'JV', 'MS']
const SEASONS: SeasonKey[] = ['fall', 'winter', 'spring']
const MARK_ORDER: GenderMark[] = ['B', 'G', 'CO']

export function buildSportsMatrix(offered: Record<string, SportsOffered | undefined>): SportsMatrix {
  const slugs = Object.keys(offered)
  const unmapped: SportsMatrix['unmapped'] = []
  const mixed: SportsMatrix['mixed'] = []
  // key → slug → level → accumulating cell
  const acc = new Map<SportKey, { seasons: Set<SeasonKey>; cells: Map<string, SportCell> }>()

  for (const slug of slugs) {
    const o = offered[slug]
    if (!o) continue
    for (const season of o.seasons) {
      const sk = season.name.toLowerCase() as SeasonKey
      for (const entry of season.sports) {
        const alias = SPORT_ALIASES[entry.name]
        if (!alias) {
          unmapped.push({ slug, name: entry.name })
          continue
        }
        let row = acc.get(alias.key)
        if (!row) acc.set(alias.key, (row = { seasons: new Set(), cells: new Map() }))
        if (SEASONS.includes(sk)) row.seasons.add(sk)
        let cell = row.cells.get(slug)
        if (!cell) row.cells.set(slug, (cell = {}))
        for (const level of entry.levels) {
          const lc = (cell[level] ??= { marks: [], unstated: false })
          const add: GenderMark[] =
            alias.gender === 'BG' ? ['B', 'G'] : alias.gender === null ? [] : [alias.gender]
          if (alias.gender === null) lc.unstated = true
          for (const m of add) if (!lc.marks.includes(m)) lc.marks.push(m)
        }
      }
    }
  }

  const rows: MatrixRow[] = []
  for (const key of SPORT_KEYS) {
    const row = acc.get(key)
    if (!row) continue
    const cells: MatrixRow['cells'] = {}
    for (const slug of slugs) {
      if (!offered[slug]) {
        cells[slug] = 'na'
        continue
      }
      const cell = row.cells.get(slug)
      if (!cell) {
        cells[slug] = null
        continue
      }
      for (const level of LEVELS) {
        const lc = cell[level]
        if (!lc) continue
        lc.marks.sort((a, b) => MARK_ORDER.indexOf(a) - MARK_ORDER.indexOf(b))
        if (lc.unstated && lc.marks.length > 0) mixed.push({ slug, key, level })
      }
      cells[slug] = cell
    }
    rows.push({
      key,
      seasons: SEASONS.filter((s) => row.seasons.has(s)),
      count: row.cells.size,
      cells,
    })
  }
  return { rows, unmapped, mixed }
}
