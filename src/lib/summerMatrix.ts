// Compare › Summer Programs, "Camp categories" group: one row per canonical
// category, one cell per school, computed from each school's published camp
// taxonomy (`catalog.categoryFilters[].label` in src/data/summer/<slug>.ts).
//
// Each school's filter labels are its own, so an explicit alias table maps the
// English label to one or more rows; generic buckets ("Premium", "Enrichment",
// a time of day) map to null and are skipped. Charlotte Country Day organizes
// by TIME OF DAY (Full day / Morning / Afternoon / Farm / Swim / Premium
// academic), so its activity categories come from SUMMER_OVERRIDES — a camp
// NAME in its catalog per row, which check:matrices asserts exists. Three
// catalogs are samples and one is an archive; the catalog's `intro` already
// says so in translated prose, and every cell tooltip ends with it.
//
// Types only, so this loads under plain Node.

import type { SummerProgram } from '../data/summerPrograms.ts'
import type { BuiltCell } from './compareMatrix.ts'

export type SummerRowKey =
  | 'dayCamp' | 'sports' | 'stem' | 'visualArts' | 'performingArts' | 'culinary' | 'academic'
  | 'nature' | 'games' | 'faith'

export const SUMMER_ROW_KEYS: SummerRowKey[] = [
  'dayCamp', 'sports', 'stem', 'visualArts', 'performingArts', 'culinary', 'academic', 'nature', 'games', 'faith',
]

/** Filter tokens that are not categories (the implicit "all" chip). */
export const SUMMER_SKIP_TOKENS = new Set(['All', 'all'])

/** Every `categoryFilters[].label` on a comparable school → rows, or null for a generic bucket. */
export const SUMMER_CATEGORY_ALIASES: Record<string, SummerRowKey[] | null> = {
  // Cannon
  'STEM & Academics': ['stem', 'academic'],
  'Visual Arts': ['visualArts'],
  'Performance Arts': ['performingArts'],
  'Culinary': ['culinary'],
  'Sports & Games': ['sports', 'games'],
  // Carmel Christian
  'Athletics': ['sports'],
  'Arts & Crafts': ['visualArts'],
  'STEM & Engineering': ['stem'],
  'Cooking': ['culinary'],
  'Faith': ['faith'],
  'General enrichment': null,
  // Charlotte Catholic / shared
  'Sports': ['sports'],
  // Charlotte Christian
  'STEM': ['stem'],
  'Arts & crafts': ['visualArts'],
  'Themed': ['dayCamp'],
  'Academic': ['academic'],
  'Nature': ['nature'],
  'Games': ['games'],
  'Premium': null,
  // Charlotte Country Day (time-of-day taxonomy; see SUMMER_OVERRIDES)
  'Full day': null,
  'Farm campus': ['nature'],
  'Morning': null,
  'Afternoon': null,
  'Swim': ['sports'],
  'Premium academic': ['academic'],
  // Charlotte Latin
  'Camp Victor (day camp)': ['dayCamp'],
  'STEM premium': ['stem'],
  'Dance & theatre': ['performingArts'],
  // Covenant Day
  'Day Camps': ['dayCamp'],
  'Arts & Theater': ['visualArts', 'performingArts'],
  // Gaston Day
  'Day camp': ['dayCamp'],
  'Enrichment': null,
  'Arts & theatre': ['visualArts', 'performingArts'],
  'Dance': ['performingArts'],
  'Tutoring': ['academic'],
  // Hickory Grove (Summer 2023 archive). "Arts" holds one painting camp,
  // "Beyond the Brush", so it reads as visual arts.
  'Reading & Fluency': ['academic'],
  'Math': ['academic'],
  'Spanish Immersion': ['academic'],
  'Arts': ['visualArts'],
  'College Prep': ['academic'],
  // Providence Day
  'Traditional day camp': ['dayCamp'],
  'The Arts': ['visualArts'],
  'Music & theater': ['performingArts'],
  'Games & hobbies': ['games'],
  'Academic enrichment': ['academic'],
  'Premium specialty': null,
}

/** Row → a camp NAME in that school's catalog, for a school whose filters are not activities. */
export const SUMMER_OVERRIDES: Record<string, Partial<Record<SummerRowKey, string>>> = {
  // A category the school's filters do not carry but a named camp plainly is.
  cannon: { dayCamp: 'Classic Summer Fun', nature: 'Farm Camp' },
  'charlotte-christian': { performingArts: 'Superstar Dance Camp' },
  'carmel-christian': {
    dayCamp: 'Carmel Castle',
    performingArts: 'Broadway Bound',
    academic: '2nd & 3rd Grade Bootcamp',
    nature: 'Ocean Explorers',
    games: 'Amazing Race',
  },
  'covenant-day': { culinary: 'The Great Covenant Day Bake Off' },
  'gaston-day': { culinary: 'Ice Cream and Popsicles — FULL, waitlist' },
  'providence-day': { culinary: 'Ice Cream Camp', nature: 'Ocean Critter Adventure' },
  'charlotte-latin': { games: 'Junior Master Chess Camp' },
  'charlotte-country-day': {
    dayCamp: 'Camp Buccaneer',
    sports: 'Bucs Basketball Camp',
    stem: 'CAMMP: Robotics & Coding',
    visualArts: 'Kids Adventure Art',
    performingArts: 'Musical Theatre',
    culinary: 'Cooking Around the World',
    academic: 'Fun with Phonics',
    games: 'Fun with Chess',
    nature: 'Farm Camp',
  },
}

/**
 * The one caveat a parent needs under a summer cell, keyed per school and rendered
 * from a chrome key (`compare.summer.note_<kind>`): our list is a SAMPLE of the
 * school's full catalog (so an absent category may still be offered), it is the
 * school's 2023 catalog (the last one published openly), or the slate is sports
 * camps only. Schools not listed here get the default note.
 */
export type SummerCatalogNote = 'sample' | 'archive' | 'sportsOnly'
export const SUMMER_CATALOG_NOTES: Record<string, SummerCatalogNote> = {
  cannon: 'sample',
  'charlotte-country-day': 'sample',
  'charlotte-latin': 'sample',
  'providence-day': 'sample',
  'hickory-grove-christian': 'archive',
  'charlotte-catholic': 'sportsOnly',
}

/** A Yes carries the matching filter indexes and/or the override camp names. */
export type SummerCell = BuiltCell & { filterIndexes?: number[]; camps?: string[] }
export type SummerMatrixRow = { key: SummerRowKey; count: number; cells: Record<string, SummerCell> }
export type SummerMatrix = {
  rows: SummerMatrixRow[]
  unmapped: { slug: string; label: string }[]
  /** Override camp names not found in the school's catalog. */
  missingOverrides: { slug: string; key: SummerRowKey; name: string }[]
  unusedAliases: string[]
}

export function buildSummerMatrix(programs: Record<string, SummerProgram | undefined>): SummerMatrix {
  const slugs = Object.keys(programs)
  const unmapped: SummerMatrix['unmapped'] = []
  const missingOverrides: SummerMatrix['missingOverrides'] = []
  const used = new Set<string>()
  const rows: SummerMatrixRow[] = SUMMER_ROW_KEYS.map((key) => ({ key, count: 0, cells: {} }))
  for (const slug of slugs) {
    const cat = programs[slug]?.catalog
    if (!cat) {
      for (const r of rows) r.cells[slug] = { state: 'na' }
      continue
    }
    const hits = new Map<SummerRowKey, number[]>()
    cat.categoryFilters.forEach((f, i) => {
      if (SUMMER_SKIP_TOKENS.has(f.token)) return
      if (!(f.label in SUMMER_CATEGORY_ALIASES)) {
        unmapped.push({ slug, label: f.label })
        return
      }
      used.add(f.label)
      for (const k of SUMMER_CATEGORY_ALIASES[f.label] ?? []) hits.set(k, [...(hits.get(k) ?? []), i])
    })
    const overrides = SUMMER_OVERRIDES[slug] ?? {}
    const names = new Set(cat.camps.map((c) => c.name))
    for (const r of rows) {
      const idx = hits.get(r.key)
      const camp = overrides[r.key]
      if (camp && !names.has(camp)) missingOverrides.push({ slug, key: r.key, name: camp })
      const camps = camp && names.has(camp) ? [camp] : undefined
      if (idx || camps) {
        r.count++
        r.cells[slug] = { state: 'yes', ...(idx ? { filterIndexes: idx } : {}), ...(camps ? { camps } : {}) }
      } else r.cells[slug] = { state: 'notListed' }
    }
  }
  return {
    rows,
    unmapped,
    missingOverrides,
    unusedAliases: Object.keys(SUMMER_CATEGORY_ALIASES).filter((l) => !used.has(l)),
  }
}
