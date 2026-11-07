// Compare › Course Offerings, two groups: "Subjects by division" (one row per
// subject area) and "World languages" (one row per language), one cell per
// school, with LS / MS / US chips where that division's published course list
// names it. Computed from src/data/courseOfferings.ts.
//
// SUBJECT CHIPS COME FROM DEPARTMENT NAMES through DEPARTMENT_ALIASES (name →
// rows, or null for a BUNDLE such as `Core Academics`, `Specials` or a
// per-grade department). COURSE TITLES are then matched against TITLE_ALIASES,
// an explicit title → rows table, in EVERY department: a bundle's titles are
// its only evidence, and a mapped department can still hold a title that names
// another subject (Yearbook inside Fine Arts, Broadcast Journalism inside
// Design & Entrepreneurship). A descriptive title no entry covers stays
// unmatched; inside a bundle it is reported by check:matrices, never guessed.
//
// LANGUAGE CHIPS COME FROM COURSE TITLES, but only inside a department mapped
// to worldLanguages or a bundle, so "Latin American History" in a History
// department can never match. Inside a language department a title may list
// several languages ("Spanish I / French I / Mandarin I"), so each language is
// matched as a whole word anywhere; inside a bundle the title must START with
// the language (after an optional AP / Honors / Intro to prefix) and the name
// must be followed by a level or the end, so "Honors Latin American Influence"
// in an interdisciplinary bundle does not match. The check prints every match.
//
// A DIVISION IS "UNKNOWN" when every department maps to null and no title
// matched (Davidson Day's Lower School publishes a programme description, not
// subjects). A division carrying `notPublished` adds a line to every cell
// tooltip, so an absent chip reads as "not named", not "not taught".
//
// Types only, so this loads under plain Node.

import type { CourseOfferings } from '../data/courseOfferings.ts'
import type { Division, BuiltCell } from './compareMatrix.ts'

export type SubjectKey =
  | 'english' | 'mathematics' | 'science' | 'socialStudies' | 'worldLanguages' | 'computerScience'
  | 'innovationDesign' | 'visualArts' | 'performingArts' | 'physicalEducation' | 'bible' | 'journalismMedia'
export type LanguageKey = 'spanish' | 'french' | 'latin' | 'mandarin' | 'german' | 'greek' | 'asl'

export const SUBJECT_KEYS: SubjectKey[] = [
  'english', 'mathematics', 'science', 'socialStudies', 'worldLanguages', 'computerScience', 'innovationDesign',
  'visualArts', 'performingArts', 'physicalEducation', 'bible', 'journalismMedia',
]
export const LANGUAGE_KEYS: LanguageKey[] = ['spanish', 'french', 'latin', 'mandarin', 'german', 'greek', 'asl']

const ARTS: SubjectKey[] = ['visualArts', 'performingArts']

/** Every department name on a comparable school → rows, or null for a bundle whose titles are matched instead. */
export const DEPARTMENT_ALIASES: Record<string, SubjectKey[] | null> = {
  // Bundles (titles matched through TITLE_ALIASES)
  'Core Academics': null,
  'Core Curriculum': null,
  'Core': null,
  'Specials': null,
  'Special Area Classes': null,
  'Special Areas (All Grades)': null,
  'Enrichment': null,
  'Electives': null,
  'Electives & LEAD': null,
  'Electives & Distinctions': null,
  'Core Content Electives': null,
  'Other': null,
  'What is published': null,
  'Other published detail': null,
  'Non-Departmental': null,
  'Teaching': null,
  'Personal Development': null,
  'Life Skills': null,
  'Philosophy': null,
  'Interdisciplinary Studies': null,
  'Options Program / Pathways Program': null,
  'Dual Enrollment': null,
  'Restoration & Sustainability': null,
  'Communications & Global Leadership': null,
  '6th Grade': null,
  '7th Grade': null,
  '8th Grade': null,
  'Junior Kindergarten': null,
  'Kindergarten': null,
  'First Grade': null,
  'Second Grade': null,
  'Third Grade': null,
  'Fourth Grade': null,
  'Fifth Grade': null,
  // Subjects
  'English': ['english'],
  'Language Arts': ['english'],
  'English & Social Studies': ['english', 'socialStudies'],
  'Mathematics': ['mathematics'],
  'Math': ['mathematics'],
  'Science': ['science'],
  'Sciences': ['science'],
  'Science & Engineering': ['science', 'innovationDesign'],
  'History': ['socialStudies'],
  'Social Studies': ['socialStudies'],
  'History & Social Studies': ['socialStudies'],
  'History & Social Sciences': ['socialStudies'],
  'Humanities & Social Sciences': ['socialStudies'],
  'World Language': ['worldLanguages'],
  'World Languages': ['worldLanguages'],
  'Modern Languages': ['worldLanguages'],
  'Modern & Classical Languages': ['worldLanguages'],
  'Foreign Language': ['worldLanguages'],
  'Spanish': ['worldLanguages'],
  'Computing & Innovation': ['computerScience', 'innovationDesign'],
  'Technology & Innovation': ['computerScience', 'innovationDesign'],
  'Technology & Makers': ['computerScience', 'innovationDesign'],
  'Technology & Computer Science': ['computerScience'],
  'Technology': ['computerScience'],
  'STEM/Tech': ['computerScience'],
  'Innovation & Design': ['innovationDesign'],
  'Innovation & Enterprise': ['innovationDesign'],
  'Design & Entrepreneurship': ['innovationDesign'],
  'IDEAS@PDS': ['innovationDesign'],
  'Visual Arts': ['visualArts'],
  'Performing Arts': ['performingArts'],
  // Hickory Grove's Middle School "Art" department holds band, choir, drama and
  // dance beside Bible Sketch and Sewing, so it names both arts rows.
  'Art': ARTS,
  'Fine Arts': ARTS,
  'Arts': ARTS,
  'Arts Electives': ARTS,
  'Participation in the Arts': ARTS,
  'Visual and Performing Arts': ARTS,
  'Arts & PE': [...ARTS, 'physicalEducation'],
  'Arts, PE & Library': [...ARTS, 'physicalEducation'],
  'Arts, PE & Design': [...ARTS, 'physicalEducation', 'innovationDesign'],
  'Fine Arts & PE': [...ARTS, 'physicalEducation'],
  'Arts & Technology': [...ARTS, 'computerScience'],
  'PE, Health & Advisory': ['physicalEducation'],
  'PE & Health': ['physicalEducation'],
  'Physical Education': ['physicalEducation'],
  'PE / Health': ['physicalEducation'],
  'Health & Fitness': ['physicalEducation'],
  'PE & Life Skills': ['physicalEducation'],
  'Physical Activity Electives': ['physicalEducation'],
  'Bible': ['bible'],
  'Biblical Studies': ['bible'],
  'Theology': ['bible'],
  'Faith & Leadership': ['bible'],
  'Journalism & Media': ['journalismMedia'],
  'Student Media': ['journalismMedia'],
}

/** Course titles → rows, matched in every department. Exact titles; an unmatched bundle title is reported. */
export const TITLE_ALIASES: Record<string, SubjectKey[]> = {
  'Language Arts': ['english'],
  'Language Arts / Literacy': ['english'],
  'Literacy': ['english'],
  'Structured Literacy': ['english'],
  'Writing': ['english'],
  'English': ['english'],
  'English Honors': ['english'],
  'Creative Writing': ['english'],
  'Language Arts & Life Fitness': ['english', 'physicalEducation'],
  'Mathematics': ['mathematics'],
  'Math': ['mathematics'],
  'Math Honors (Pre-Algebra)': ['mathematics'],
  'Math Honors (Algebra)': ['mathematics'],
  'Science': ['science'],
  'Science Lab': ['science'],
  'Science and Social Studies': ['science', 'socialStudies'],
  'Social Studies': ['socialStudies'],
  'History / Social Studies': ['socialStudies'],
  'Psychology': ['socialStudies'],
  'Advanced Placement Psychology': ['socialStudies'],
  'Human Geography': ['socialStudies'],
  'Bible': ['bible'],
  'World Languages': ['worldLanguages'],
  'Spanish': ['worldLanguages'],
  'Latin IA': ['worldLanguages'],
  'Latin IB': ['worldLanguages'],
  'Intro to Spanish': ['worldLanguages'],
  'Intro to American Sign Language': ['worldLanguages'],
  'Physical Education': ['physicalEducation'],
  'Health Education': ['physicalEducation'],
  'Strength & Fitness Training': ['physicalEducation'],
  'Strength & Conditioning I, II, III': ['physicalEducation'],
  'Music Appreciation': ['performingArts'],
  'Art': ['visualArts'],
  'Music': ['performingArts'],
  'Band': ['performingArts'],
  'Choir': ['performingArts'],
  'Chorus': ['performingArts'],
  'Drama': ['performingArts'],
  'Theatre': ['performingArts'],
  'Band, Orchestra & Chorus': ['performingArts'],
  'Art / Band / Concert Choir / Strings': ARTS,
  'Fine Arts electives': ARTS,
  'Technology': ['computerScience'],
  'Media / Technology': ['computerScience'],
  'Tech Tank': ['computerScience'],
  'Computer Programming': ['computerScience'],
  'AP Computer Science': ['computerScience'],
  'Advanced Placement Computer Science A': ['computerScience'],
  'Advanced Placement Computer Science Principles': ['computerScience'],
  'STEM': ['innovationDesign'],
  'STEAM': ['innovationDesign'],
  'IDEAS': ['innovationDesign'],
  'Engineering': ['innovationDesign'],
  'Intro to Engineering': ['innovationDesign'],
  'Introduction to Engineering': ['innovationDesign'],
  'Introduction to STEM': ['innovationDesign'],
  'Honors Electrical and Computing Engineering': ['innovationDesign'],
  'Honors Civil and Construction Engineering': ['innovationDesign'],
  'Honors Engineering Capstone': ['innovationDesign'],
  'Advanced Placement Cybersecurity Kickstart': ['computerScience'],
  'Robotics': ['innovationDesign'],
  'Innovation electives': ['innovationDesign'],
  'Exploring Design Technology': ['innovationDesign'],
  'Yearbook': ['journalismMedia'],
  'Honors Yearbook': ['journalismMedia'],
  'Yearbook / Yearbook Honors': ['journalismMedia'],
  'Yearbook Editor, Honors': ['journalismMedia'],
  'Introduction to Yearbook': ['journalismMedia'],
  'Yearbook Honors': ['journalismMedia'],
  'Yearbook I': ['journalismMedia'],
  'Broadcast Media': ['journalismMedia'],
  'Broadcasting Honors (Knights Knews)': ['journalismMedia'],
  'Media & Journalism I': ['journalismMedia'],
  'Innovation Lab': ['innovationDesign'],
  // Covenant Day's own Lower School curriculum: "CREATE Junior integrates technology
  // and critical thinking skills … through science, technology, math, and
  // engineering. CREATE Junior is a precursor to the CDS Middle School's CREATE."
  'CREATE Junior': ['computerScience', 'innovationDesign'],
  'CREATE': ['computerScience', 'innovationDesign'],
  'Broadcast Journalism': ['journalismMedia'],
  'News and Media Production': ['journalismMedia'],
  'Communications and Twenty-First Century Journalism': ['journalismMedia'],
}

const LANG_WORDS: Record<LanguageKey, string> = {
  spanish: 'Spanish',
  french: 'French',
  latin: 'Latin',
  mandarin: 'Mandarin|Chinese',
  german: 'German',
  greek: 'Greek',
  asl: 'American Sign Language|ASL',
}
/** Inside a language department: the language as a whole word anywhere (titles list several). */
export const LANGUAGE_PATTERNS: Record<LanguageKey, RegExp> = Object.fromEntries(
  LANGUAGE_KEYS.map((k) => [k, new RegExp(`\\b(?:${LANG_WORDS[k]})\\b`)]),
) as Record<LanguageKey, RegExp>
/** Inside a bundle: the title must start with the language and the name must be followed by a level or the end. */
export const BUNDLE_LANGUAGE_PATTERNS: Record<LanguageKey, RegExp> = Object.fromEntries(
  LANGUAGE_KEYS.map((k) => [
    k,
    new RegExp(
      `^(?:AP |Honors |IB |Advanced |Intro(?:duction)? to |Foundational )?(?:${LANG_WORDS[k]})(?:\\s+(?:[IVX]+[AB]?|\\d|Immersion|Language|Exposure|\\()|$)`,
    ),
  ]),
) as Record<LanguageKey, RegExp>

export type CourseCell = BuiltCell & { unknownDivs?: Division[]; notPublishedDivs?: Division[] }
export type CourseMatrixRow<K extends string> = { key: K; count: number; cells: Record<string, CourseCell> }
export type CourseMatrix = {
  subjects: CourseMatrixRow<SubjectKey>[]
  languages: CourseMatrixRow<LanguageKey>[]
  /** Per school: divisions the school publishes (by title), and the two flags per division. */
  divisions: Record<string, { present: Division[]; unknown: Division[]; notPublished: Division[] }>
  unmappedDepartments: { slug: string; division: Division; name: string }[]
  unmatchedTitles: { slug: string; division: Division; department: string; title: string }[]
  languageMatches: { slug: string; division: Division; department: string; title: string; keys: LanguageKey[] }[]
  /** A bundle title matching two languages — a mis-match, failed by the check. */
  ambiguous: { slug: string; division: Division; title: string; keys: LanguageKey[] }[]
  unusedDepartmentAliases: string[]
  unusedTitleAliases: string[]
}

export function divisionOf(title: string): Division | null {
  if (/\bLower\b/i.test(title)) return 'LS'
  if (/\bMiddle\b/i.test(title)) return 'MS'
  if (/\b(Upper|High)\b/i.test(title)) return 'US'
  return null
}

export function buildCourseMatrix(offerings: Record<string, CourseOfferings | undefined>): CourseMatrix {
  const slugs = Object.keys(offerings)
  const out: CourseMatrix = {
    subjects: SUBJECT_KEYS.map((key) => ({ key, count: 0, cells: {} })),
    languages: LANGUAGE_KEYS.map((key) => ({ key, count: 0, cells: {} })),
    divisions: {},
    unmappedDepartments: [],
    unmatchedTitles: [],
    languageMatches: [],
    ambiguous: [],
    unusedDepartmentAliases: [],
    unusedTitleAliases: [],
  }
  const usedDept = new Set<string>()
  const usedTitle = new Set<string>()

  for (const slug of slugs) {
    const o = offerings[slug]
    if (!o) {
      for (const r of [...out.subjects, ...out.languages]) r.cells[slug] = { state: 'na' }
      continue
    }
    const subj = new Map<SubjectKey, Set<Division>>()
    const lang = new Map<LanguageKey, Set<Division>>()
    const present: Division[] = []
    const unknown: Division[] = []
    const notPublished: Division[] = []
    for (const d of o.divisions) {
      const div = divisionOf(d.title)
      if (!div) continue
      present.push(div)
      if (d.notPublished) notPublished.push(div)
      let anything = false
      const add = (k: SubjectKey) => {
        anything = true
        if (!subj.has(k)) subj.set(k, new Set())
        subj.get(k)!.add(div)
      }
      const addLang = (k: LanguageKey) => {
        anything = true
        if (!lang.has(k)) lang.set(k, new Set())
        lang.get(k)!.add(div)
      }
      for (const dept of d.departments) {
        if (!(dept.name in DEPARTMENT_ALIASES)) {
          out.unmappedDepartments.push({ slug, division: div, name: dept.name })
          continue
        }
        usedDept.add(dept.name)
        const keys = DEPARTMENT_ALIASES[dept.name]
        const isBundle = keys === null
        const isLanguageDept = keys?.includes('worldLanguages') ?? false
        if (keys) for (const k of keys) add(k)
        for (const c of dept.courses) {
          const tk = TITLE_ALIASES[c.title]
          if (tk) {
            usedTitle.add(c.title)
            for (const k of tk) add(k)
          } else if (isBundle) out.unmatchedTitles.push({ slug, division: div, department: dept.name, title: c.title })
          if (isLanguageDept || isBundle) {
            const pats = isLanguageDept ? LANGUAGE_PATTERNS : BUNDLE_LANGUAGE_PATTERNS
            const hits = LANGUAGE_KEYS.filter((k) => pats[k].test(c.title))
            if (hits.length) {
              out.languageMatches.push({ slug, division: div, department: dept.name, title: c.title, keys: hits })
              if (isBundle && hits.length > 1) out.ambiguous.push({ slug, division: div, title: c.title, keys: hits })
              for (const k of hits) addLang(k)
            }
          }
        }
      }
      if (!anything) unknown.push(div)
    }
    out.divisions[slug] = { present, unknown, notPublished }
    const flags = {
      ...(unknown.length ? { unknownDivs: unknown } : {}),
      ...(notPublished.length ? { notPublishedDivs: notPublished } : {}),
    }
    const DIVS: Division[] = ['LS', 'MS', 'US']
    for (const r of out.subjects) {
      const s = subj.get(r.key)
      if (s) {
        r.count++
        r.cells[slug] = { state: 'yes', divs: DIVS.filter((d) => s.has(d)), ...flags }
      } else r.cells[slug] = { state: 'notListed', ...flags }
    }
    for (const r of out.languages) {
      const s = lang.get(r.key)
      if (s) {
        r.count++
        r.cells[slug] = { state: 'yes', divs: DIVS.filter((d) => s.has(d)), ...flags }
      } else r.cells[slug] = { state: 'notListed', ...flags }
    }
  }
  out.unusedDepartmentAliases = Object.keys(DEPARTMENT_ALIASES).filter((n) => !usedDept.has(n))
  out.unusedTitleAliases = Object.keys(TITLE_ALIASES).filter((n) => !usedTitle.has(n))
  return out
}
