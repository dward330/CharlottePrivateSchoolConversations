#!/usr/bin/env node
// check:matrices — guards the four computed "offered" groups on Compare: The
// Arts, Course Offerings, Student Clubs and Summer Programs (plan `comparerows`,
// 2026-11-07; src/lib/{arts,course,clubs,summer}Matrix.ts).
//
// Each group is computed at render from a school's own structured data through
// an explicit alias table, or (arts) from a typed claims table whose values
// cite the school's arts module verbatim. A raw string the table does not know
// is NOT rendered, so a new school's spelling would make its column silently
// thin. This check is what makes that loud.
//
//   exit 1  a club category label, summer filter label or course department
//           name on a comparable school that its alias table lacks
//   exit 1  an arts claim whose cite is not a substring of that school's
//           src/data/artsPrograms/<slug>.ts, or whose `{ course }` is not an
//           exact course title in that division of courseOfferings.ts, or whose
//           `{ source, quote }` is not a verbatim quote in that file under
//           source-material/the-arts/<slug>/ (named by slug, key and division)
//   exit 1  a summer or club override naming a camp or club that is not in the
//           school's catalog
//   exit 1  a row key, group key or division with no compare.* label in
//           src/locales/en.json
//   exit 1  a bundle course title matching two languages
//   exit 0  (reported) bundle course titles no TITLE_ALIASES entry covers,
//           alias entries no school uses, and every language match, so a human
//           can read the list
//
// It imports the per-school src/data/artsPrograms/*.ts and src/data/summer/*.ts
// files directly, never the registries (import.meta.glob cannot load under
// plain Node); clubCatalog.ts and courseOfferings.ts import fine.
//
// Negative tests: ARTS_DIR, SUMMER_DIR, CLUB_CATALOG and ARTS_TABLE point the
// check at a scratch copy of the data.

import { readFileSync, existsSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import path from 'node:path'

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const imp = (rel) => import(pathToFileURL(path.isAbsolute(rel) ? rel : path.join(ROOT, rel)).href)
const ARTS_DIR = process.env.ARTS_DIR || 'src/data/artsPrograms'
const SUMMER_DIR = process.env.SUMMER_DIR || 'src/data/summer'
const CLUB_CATALOG = process.env.CLUB_CATALOG || 'src/data/clubCatalog.ts'
const ARTS_TABLE = process.env.ARTS_TABLE || 'src/data/artsMatrix.ts'

async function firstExport(rel) {
  try {
    const mod = await imp(rel)
    return Object.values(mod)[0]
  } catch (e) {
    if (e.code === 'ERR_MODULE_NOT_FOUND') return undefined
    throw e
  }
}

/** The four matrices, built exactly as the components build them. */
export async function loadComparableMatrices() {
  const manifest = JSON.parse(readFileSync(path.join(ROOT, 'src/data/schools.json'), 'utf8'))
  const { BRANDS } = await imp('src/data/brands.ts')
  const slugs = manifest.schools.map((s) => s.slug).filter((slug) => BRANDS[slug]?.hasHighSchool !== false)

  const { buildArtsMatrix, ART_KEYS, ART_GROUPS } = await imp('src/lib/artsMatrix.ts')
  const { ARTS_MATRIX, ARTS_UNKNOWN_DIVISIONS } = await imp(ARTS_TABLE)
  const { buildCourseMatrix, SUBJECT_KEYS, LANGUAGE_KEYS } = await imp('src/lib/courseMatrix.ts')
  const { buildClubsMatrix, CLUB_ROW_KEYS } = await imp('src/lib/clubsMatrix.ts')
  const { buildSummerMatrix, SUMMER_ROW_KEYS } = await imp('src/lib/summerMatrix.ts')
  const { courseOfferings } = await imp('src/data/courseOfferings.ts')
  const { clubCatalog } = await imp(CLUB_CATALOG)

  const artsText = {}
  const hasArts = {}
  const summer = {}
  for (const slug of slugs) {
    const a = await firstExport(path.join(ARTS_DIR, `${slug}.ts`))
    hasArts[slug] = a != null
    if (a != null) artsText[slug] = readFileSync(path.join(ROOT, ARTS_DIR, `${slug}.ts`), 'utf8')
    summer[slug] = await firstExport(path.join(SUMMER_DIR, `${slug}.ts`))
  }
  return {
    slugs,
    arts: { matrix: buildArtsMatrix(hasArts, ARTS_MATRIX, ARTS_UNKNOWN_DIVISIONS), text: artsText, keys: ART_KEYS, groups: ART_GROUPS },
    courses: { matrix: buildCourseMatrix(Object.fromEntries(slugs.map((s) => [s, courseOfferings(s)]))), subjectKeys: SUBJECT_KEYS, languageKeys: LANGUAGE_KEYS },
    clubs: { matrix: buildClubsMatrix(Object.fromEntries(slugs.map((s) => [s, clubCatalog(s)]))), keys: CLUB_ROW_KEYS },
    summer: { matrix: buildSummerMatrix(summer), keys: SUMMER_ROW_KEYS },
  }
}

function printTable(title, rows, slugs) {
  const cell = (c) => (!c || c.state === 'na' ? '?' : c.state === 'yes' ? (c.divs ? c.divs.join('·') : 'Y') : '–')
  console.log(`\n${title}`)
  console.log(`  ${''.padEnd(22)}${slugs.map((s) => s.slice(0, 8).padEnd(9)).join('')}`)
  for (const r of rows) console.log(`  ${r.key.padEnd(22)}${slugs.map((s) => cell(r.cells[s]).padEnd(9)).join('')}`)
}

async function main() {
  const { slugs, arts, courses, clubs, summer } = await loadComparableMatrices()
  const en = JSON.parse(readFileSync(path.join(ROOT, 'src/locales/en.json'), 'utf8'))
  const failures = []
  const notes = []
  const key = (p) => p.split('.').reduce((o, k) => o?.[k], en)
  const needKey = (p) => { if (typeof key(p) !== 'string') failures.push(`no ${p} in src/locales/en.json`) }

  // Shared chrome
  for (const k of ['yes', 'notListed', 'tipKindYes', 'tipKindNotListed', 'tipKindNa', 'divisions', 'legendNote', 'tipYesDivs', 'tipYes', 'tipNotListed', 'tipNa', 'tipUnknownDiv', 'cellAria']) needKey(`compare.matrix.${k}`)
  for (const d of ['LS', 'MS', 'US']) { needKey(`compare.matrix.div_${d}`); needKey(`compare.matrix.divName_${d}`) }

  // Arts: every cite verbatim (arts module) or an exact course title in that
  // division's catalog; every key labelled
  const { divisionOf } = await imp('src/lib/courseMatrix.ts')
  const { courseOfferings } = await imp('src/data/courseOfferings.ts')
  const titlesOf = (slug, div) =>
    new Set((courseOfferings(slug)?.divisions ?? []).filter((d) => divisionOf(d.title) === div).flatMap((d) => d.departments.flatMap((dep) => dep.courses.map((c) => c.title))))
  let courseCites = 0
  let sourceCites = 0
  for (const c of arts.matrix.cites) {
    const text = arts.text[c.slug]
    if (text == null) { failures.push(`arts ${c.slug} ${c.key} ${c.div}: claim for a school with no arts module`); continue }
    if (typeof c.cite === 'string') {
      if (!text.includes(c.cite)) failures.push(`arts ${c.slug} ${c.key} ${c.div}: cite "${c.cite}" is not in ${ARTS_DIR}/${c.slug}.ts`)
    } else if ('source' in c.cite) {
      sourceCites++
      const f = path.join(ROOT, 'source-material/the-arts', c.slug, c.cite.source)
      if (!existsSync(f)) failures.push(`arts ${c.slug} ${c.key} ${c.div}: source file "${c.cite.source}" does not exist`)
      else if (!readFileSync(f, 'utf8').includes(c.cite.quote)) failures.push(`arts ${c.slug} ${c.key} ${c.div}: quote "${c.cite.quote}" is not in ${c.cite.source}`)
    } else {
      courseCites++
      if (!titlesOf(c.slug, c.div).has(c.cite.course)) failures.push(`arts ${c.slug} ${c.key} ${c.div}: course "${c.cite.course}" is not a ${c.div} course title in courseOfferings.ts`)
    }
  }
  for (const k of arts.keys) needKey(`compare.arts.row_${k}`)
  for (const g of arts.groups) needKey(`compare.arts.group_${g.key}`)
  needKey('compare.arts.topic')

  // Courses
  for (const u of courses.matrix.unmappedDepartments) failures.push(`courses ${u.slug} ${u.division}: department "${u.name}" is not in DEPARTMENT_ALIASES (src/lib/courseMatrix.ts)`)
  for (const a of courses.matrix.ambiguous) failures.push(`courses ${a.slug} ${a.division}: bundle title "${a.title}" matches two languages (${a.keys.join(', ')})`)
  for (const k of courses.subjectKeys) needKey(`compare.courses.row_${k}`)
  for (const k of courses.languageKeys) needKey(`compare.courses.row_${k}`)
  for (const k of ['group_subjects', 'group_languages', 'topic', 'tipNotPublished']) needKey(`compare.courses.${k}`)
  for (const u of courses.matrix.unmatchedTitles) notes.push(`courses: ${u.slug} ${u.division} [${u.department}] "${u.title}" has no TITLE_ALIASES entry (not counted)`)
  for (const n of courses.matrix.unusedDepartmentAliases) notes.push(`courses: DEPARTMENT_ALIASES "${n}" is used by no comparable school`)
  for (const n of courses.matrix.unusedTitleAliases) notes.push(`courses: TITLE_ALIASES "${n}" is used by no comparable school`)

  // Clubs
  for (const u of clubs.matrix.unmapped) failures.push(`clubs ${u.slug}: category "${u.label}" is not in CLUB_CATEGORY_ALIASES (src/lib/clubsMatrix.ts)`)
  for (const u of clubs.matrix.missingOverrides) failures.push(`clubs ${u.slug} ${u.key}: override club "${u.name}" is not in the school's catalog`)
  const { CLUB_OVERRIDES } = await imp('src/lib/clubsMatrix.ts')
  let clubQuotes = 0
  for (const [slug, byKey] of Object.entries(CLUB_OVERRIDES)) {
    for (const [k, items] of Object.entries(byKey)) {
      for (const it of items) {
        if (typeof it === 'string') continue
        clubQuotes++
        const f = path.join(ROOT, 'source-material/student-clubs', slug, it.source)
        if (!existsSync(f)) failures.push(`clubs ${slug} ${k}: source file "${it.source}" does not exist`)
        else if (!readFileSync(f, 'utf8').includes(it.quote)) failures.push(`clubs ${slug} ${k}: quote "${it.quote}" is not in ${it.source}`)
      }
    }
  }
  for (const k of clubs.keys) needKey(`compare.clubs.row_${k}`)
  for (const k of ['group', 'topic', 'tipGroupsAs', 'tipClubs', 'tipQuoted']) needKey(`compare.clubs.${k}`)
  for (const n of clubs.matrix.unusedAliases) notes.push(`clubs: alias "${n}" is used by no comparable school`)

  // Summer
  for (const u of summer.matrix.unmapped) failures.push(`summer ${u.slug}: filter "${u.label}" is not in SUMMER_CATEGORY_ALIASES (src/lib/summerMatrix.ts)`)
  for (const u of summer.matrix.missingOverrides) failures.push(`summer ${u.slug} ${u.key}: override camp "${u.name}" is not in the school's catalog`)
  for (const k of summer.keys) needKey(`compare.summer.row_${k}`)
  for (const k of ['group', 'topic', 'tipYes', 'tipFiledUnder', 'tipExamples', 'tipNone', 'note_default', 'note_sample', 'note_archive', 'note_sportsOnly']) needKey(`compare.summer.${k}`)
  for (const n of summer.matrix.unusedAliases) notes.push(`summer: alias "${n}" is used by no comparable school`)

  if (!process.argv.includes('--quiet')) {
    printTable('Arts offered', arts.matrix.groups.flatMap((g) => g.rows), slugs)
    printTable('Subjects by division', courses.matrix.subjects, slugs)
    printTable('World languages', courses.matrix.languages, slugs)
    printTable('Club categories', clubs.matrix.rows, slugs)
    printTable('Camp categories', summer.matrix.rows, slugs)
    console.log('\nLanguage matches (every title that produced a chip):')
    for (const m of courses.matrix.languageMatches) console.log(`  ${m.slug} ${m.division} [${m.department}] ${m.title} → ${m.keys.join(', ')}`)
    console.log()
    for (const n of notes) console.log(`• ${n}`)
  }

  const na = (m) => slugs.filter((s) => m[0]?.cells[s]?.state === 'na')
  console.log(
    `\ncheck:matrices — ${slugs.length} comparable schools; arts ${arts.matrix.cites.length} cites verified (${courseCites} course titles, ${sourceCites} source-material quotes), ` +
      `courses ${courses.matrix.subjects.length}+${courses.matrix.languages.length} rows, clubs ${clubs.matrix.rows.length} rows (${clubQuotes} source-material quotes), summer ${summer.matrix.rows.length} rows` +
      `${na(summer.matrix.rows).length ? `; summer N/A: ${na(summer.matrix.rows).join(', ')}` : ''}`,
  )
  if (failures.length) {
    for (const f of failures) console.error(`✗ ${f}`)
    console.error('check:matrices FAILED')
    process.exit(1)
  }
  console.log('check:matrices OK')
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) await main()
