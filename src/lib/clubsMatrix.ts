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

/**
 * Row → a club NAME in that school's catalog, for a category the school's own
 * taxonomy does not carry but whose roster plainly holds (a Fellowship of
 * Christian Athletes chapter filed under "Interest", a yearbook under "Student
 * club"). check:matrices asserts the name exists. The cell shows the club's own
 * category label beneath, read localized by index. A `{ source, quote }` entry
 * cites a verbatim quote from a committed file under
 * source-material/student-clubs/<slug>/ (a school page fetched for the second
 * pass, with its URL in the file's provenance header); the quote shows in the
 * tooltip.
 */
export type ClubOverride = string | { source: string; quote: string }
export const CLUB_OVERRIDES: Record<string, Partial<Record<ClubRowKey, ClubOverride[]>>> = {
  cannon: {
    stem: ['Brainy Yaks Robotics'],
    honorSocieties: [{ source: 'Cannon - Clubs - Honor Societies Web Check 2026.md', quote: 'Cum Laude Society' }],
    artsPerformance: [
      { source: 'Cannon - Clubs - Honor Societies Web Check 2026.md', quote: 'The National Art Honor Society' },
      { source: 'Cannon - Clubs - Honor Societies Web Check 2026.md', quote: 'Tri-M Music Honor Society' },
      { source: 'Cannon - Clubs - Honor Societies Web Check 2026.md', quote: 'International Thespian Society' },
    ],
  },
  'carmel-christian': {
    specialInterest: [{ source: 'Carmel Christian - Clubs - Special Interest Web Check 2026.md', quote: 'The club made up of HS students gathers weekly to tend to our outdoor learning space' }],
  },
  'charlotte-catholic': {
    leadership: [{ source: 'Charlotte Catholic - Clubs - Governance Web Check 2026.md', quote: 'The executive Student Council consists of a secretary, treasurer, first vice-president, second vice-president, and president' }],
    affinity: ['Achievers Club', 'Asian American Pacific Islander Club'],
    artsPerformance: ['Art Club', 'Music Production Club', 'Photography Club'],
    faith: ['Campus Ministry Club', 'Rosary Club', 'St. Augustine Club'],
    stem: ['Robotics Club'],
  },
  'charlotte-christian': {
    service: ['Letters of Light', 'Best Buddies'],
    academicCompetition: ['DECA', 'Model UN', 'Debate'],
    artsPerformance: ['Tri-M Music Honor Society', 'International Thespian Society', 'National Art Honor Society'],
    faith: ['Athletes in Action'],
    recreationSports: ['Spikeball', 'Ultimate Frisbee'],
    stem: ['VEX Robotics Competition Team'],
  },
  'charlotte-country-day': {
    faith: ['Interfaith Club'],
    stem: ['Robotics'],
    artsPerformance: [{ source: 'CCD - Clubs - Club Catalog Web Check 2026.md', quote: 'including Honor Council, Student Government, Affinity Groups, Athletics, Theater Arts, Big Brothers Big Sisters, and more.' }],
    honorSocieties: [{ source: 'CCD - Clubs - Club Catalog Web Check 2026.md', quote: 'We offer membership to Cum Laude Society to eligible members of the graduating class in spring of their senior year.' }],
  },
  'charlotte-latin': {
    recreationSports: ['Outdoor Club'],
    artsPerformance: [
      { source: 'Charlotte Latin - Clubs - Club Catalog Web Check 2026.md', quote: 'Acapella Club' },
      { source: 'Charlotte Latin - Clubs - Club Catalog Web Check 2026.md', quote: 'Improv Club' },
      { source: 'Charlotte Latin - Clubs - Club Catalog Web Check 2026.md', quote: 'International Thespian Society' },
    ],
    honorSocieties: [{ source: 'Charlotte Latin - Clubs - Club Catalog Web Check 2026.md', quote: 'International Thespian Society' }],
    stem: [{ source: 'Charlotte Latin - Clubs - Club Catalog Web Check 2026.md', quote: 'Robotics Club' }],
  },
  'covenant-day': {
    service: ['Beta Club'],
    cultureLanguage: ['Latin (JCL) Club', 'French Club'],
    artsPerformance: ['International Thespian Society', 'Tri-M Music Honor Society', 'National Art Honor Society'],
    specialInterest: ['Book Club'],
    stem: ['Robotics (First Lego League)', 'Sustainability Engineering'],
  },
  'davidson-day': {
    recreationSports: ['Outdoor Club'],
    stem: ['Science Club', 'Math Olympiad'],
    leadership: [{ source: 'Davidson Day - Clubs - Community Engagement Web Check 2026.md', quote: 'Our Community Engagement Council demonstrates a deep commitment to service and leadership' }],
    honorSocieties: [{ source: 'Davidson Day - Clubs - Honor Societies Web Check 2026.md', quote: 'National Honor Society Members' }],
  },
  'gaston-day': { faith: ['FCA'] },
  'hickory-grove-christian': {
    publicationsMedia: ['Quill and Scroll Honor Society'],
    cultureLanguage: ['International Culture Club', 'Spanish Club'],
  },
  'providence-day': {
    service: ['Random Acts of Kindness', 'Wing Haven', 'Lower School Buddies'],
    artsPerformance: [{ source: 'Providence Day - Clubs - Middle School Clubs Web Check 2026.md', quote: 'From Model U.N. and Science Olympiad to Street Soccer and Art Club' }],
    cultureLanguage: ['Chinese Club', 'French Language Club', 'Latin Club'],
    faith: ['Fellowship of Christian Athletes (FCA)'],
    honorSocieties: ['National Honor Society', 'Computer Science Honors Society'],
    stem: ['Robotics Team', 'Science Olympiad', 'Women in STEM'],
  },
}

/** A Yes carries the indexes of the school's categories that map to the row, override club names, and/or source quotes. */
export type ClubsCell = BuiltCell & { categoryIndexes?: number[]; clubs?: string[]; quotes?: string[] }
export type ClubsMatrixRow = { key: ClubRowKey; count: number; cells: Record<string, ClubsCell> }
export type ClubsMatrix = {
  rows: ClubsMatrixRow[]
  unmapped: { slug: string; label: string }[]
  /** Override club names not found in the school's catalog. */
  missingOverrides: { slug: string; key: ClubRowKey; name: string }[]
  unusedAliases: string[]
}

export function buildClubsMatrix(catalogs: Record<string, ClubCatalog | undefined>): ClubsMatrix {
  const slugs = Object.keys(catalogs)
  const unmapped: ClubsMatrix['unmapped'] = []
  const missingOverrides: ClubsMatrix['missingOverrides'] = []
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
    const overrides = CLUB_OVERRIDES[slug] ?? {}
    const names = new Set(cat.clubs.map((c) => c.name))
    for (const r of rows) {
      const idx = hits.get(r.key)
      const wanted = overrides[r.key] ?? []
      const wantedNames = wanted.filter((w): w is string => typeof w === 'string')
      const quotes = wanted.filter((w): w is { source: string; quote: string } => typeof w !== 'string').map((w) => w.quote)
      for (const n of wantedNames) if (!names.has(n)) missingOverrides.push({ slug, key: r.key, name: n })
      const clubs = wantedNames.filter((n) => names.has(n))
      if (idx || clubs.length || quotes.length) {
        r.count++
        r.cells[slug] = {
          state: 'yes',
          ...(idx ? { categoryIndexes: idx } : {}),
          ...(clubs.length ? { clubs } : {}),
          ...(quotes.length ? { quotes } : {}),
        }
      } else r.cells[slug] = { state: 'notListed' }
    }
  }
  return { rows, unmapped, missingOverrides, unusedAliases: Object.keys(CLUB_CATEGORY_ALIASES).filter((l) => !used.has(l)) }
}
