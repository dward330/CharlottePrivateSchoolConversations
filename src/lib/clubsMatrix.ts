// Compare › Student Clubs, "Club categories" group: one row per canonical
// category, one cell per school, computed from each school's own club taxonomy
// (`categories[].full` in src/data/clubCatalog.ts).
//
// EACH SCHOOL'S TAXONOMY IS ITS OWN. Charlotte Christian files most clubs under
// "Student club"; Charlotte Catholic uses Education / Service / Community /
// Culture / Sports / General interest. So the alias table maps a school's
// English label to one OR MORE canonical rows, and a Yes cell shows the
// school's own label(s) beneath, read localized at render by category index.
// No club counts: a label mapping to two rows cannot attribute its clubs, and
// the `us-organizations` row already carries totals. A label the table does
// not know fails check:matrices rather than silently thinning the column.
//
// Types only, so this loads under plain Node.

import type { ClubCatalog } from '../data/clubCatalog.ts'
import type { BuiltCell } from './compareMatrix.ts'

export type ClubRowKey =
  | 'service' | 'academicCompetition' | 'leadership' | 'publicationsMedia' | 'affinity'
  | 'cultureLanguage' | 'artsPerformance' | 'faith' | 'honorSocieties' | 'specialInterest'
  | 'recreationSports' | 'stem'

export const CLUB_ROW_KEYS: ClubRowKey[] = [
  'service', 'academicCompetition', 'leadership', 'publicationsMedia', 'affinity', 'cultureLanguage',
  'artsPerformance', 'faith', 'honorSocieties', 'specialInterest', 'recreationSports', 'stem',
]

/** Every `categories[].full` label on a comparable school, in English, → canonical rows. */
export const CLUB_CATEGORY_ALIASES: Record<string, ClubRowKey[]> = {
  // Charlotte Latin
  'Service': ['service'],
  'Competitive & academic': ['academicCompetition'],
  'Leadership & governance': ['leadership'],
  'Special interest & publications': ['specialInterest', 'publicationsMedia'],
  'Affinity & mentorship': ['affinity'],
  'Culture & language': ['cultureLanguage'],
  // Providence Day
  'Activity & interest': ['specialInterest'],
  'Team-oriented / competitive': ['academicCompetition'],
  'Affinity / alliance': ['affinity'],
  'Recreational sport & outdoor': ['recreationSports'],
  'Application / election-based': ['leadership'],
  'Publications / media': ['publicationsMedia'],
  // Charlotte Country Day
  'Governance / leadership': ['leadership'],
  'Academic / competition': ['academicCompetition'],
  'Affinity / special interest': ['affinity', 'specialInterest'],
  // Cannon
  'Competitive program': ['academicCompetition'],
  'Academic competition team': ['academicCompetition'],
  'Student leadership': ['leadership'],
  'Affinity / belonging': ['affinity'],
  'Student publication': ['publicationsMedia'],
  'Interest / social': ['specialInterest'],
  // Charlotte Christian
  'Student club': ['specialInterest'],
  'Honor society': ['honorSocieties'],
  'Leadership / media': ['leadership', 'publicationsMedia'],
  'Global awareness': ['cultureLanguage'],
  // Covenant Day
  'Honor societies': ['honorSocieties'],
  'Spirit / leadership': ['leadership'],
  // Davidson Day
  'Interest': ['specialInterest'],
  'Service / environmental': ['service'],
  // Carmel Christian
  'Student government': ['leadership'],
  'Service / discipleship': ['service', 'faith'],
  // Hickory Grove
  'Interest / academic club': ['specialInterest', 'academicCompetition'],
  'Faith / service / leadership': ['faith', 'service', 'leadership'],
  'Arts / music club': ['artsPerformance'],
  // Gaston Day
  'STEM / competitive': ['stem', 'academicCompetition'],
  'Publications & media': ['publicationsMedia'],
  'Leadership / service': ['leadership', 'service'],
  'Arts & performance': ['artsPerformance'],
  'Special interest': ['specialInterest'],
  // Charlotte Catholic
  'Education': ['academicCompetition'],
  'Community': ['specialInterest'],
  'Culture': ['cultureLanguage'],
  'Sports': ['recreationSports'],
  'General interest': ['specialInterest'],
}

/** A Yes carries the indexes of the school's categories that map to the row. */
export type ClubsCell = BuiltCell & { categoryIndexes?: number[] }
export type ClubsMatrixRow = { key: ClubRowKey; count: number; cells: Record<string, ClubsCell> }
export type ClubsMatrix = {
  rows: ClubsMatrixRow[]
  unmapped: { slug: string; label: string }[]
  unusedAliases: string[]
}

export function buildClubsMatrix(catalogs: Record<string, ClubCatalog | undefined>): ClubsMatrix {
  const slugs = Object.keys(catalogs)
  const unmapped: ClubsMatrix['unmapped'] = []
  const used = new Set<string>()
  const rows: ClubsMatrixRow[] = CLUB_ROW_KEYS.map((key) => ({ key, count: 0, cells: {} }))
  for (const slug of slugs) {
    const cat = catalogs[slug]
    if (!cat) {
      for (const r of rows) r.cells[slug] = { state: 'na' }
      continue
    }
    const hits = new Map<ClubRowKey, number[]>()
    cat.categories.forEach((c, i) => {
      const keys = CLUB_CATEGORY_ALIASES[c.full]
      if (!keys) {
        unmapped.push({ slug, label: c.full })
        return
      }
      used.add(c.full)
      for (const k of keys) hits.set(k, [...(hits.get(k) ?? []), i])
    })
    for (const r of rows) {
      const idx = hits.get(r.key)
      if (idx) {
        r.count++
        r.cells[slug] = { state: 'yes', categoryIndexes: idx }
      } else r.cells[slug] = { state: 'notListed' }
    }
  }
  return { rows, unmapped, unusedAliases: Object.keys(CLUB_CATEGORY_ALIASES).filter((l) => !used.has(l)) }
}
