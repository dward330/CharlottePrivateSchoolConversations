#!/usr/bin/env node
/**
 * check:cardlink — the card deep-link naming rule and its rename gate.
 *
 * A card link is `#<area name>/<card name>`, built from the English names the
 * page shows by `linkName()` in src/lib/cardLink.ts (a HARD rule set by the user
 * on 2026-11-13). Because the name IS the link, renaming a card or an area
 * changes its link, and links already shared must keep working. So:
 *
 *   1. Every example in the plan's naming-rule table must convert exactly.
 *   2. Every English name source is snapshotted in scripts/card_link_names.json.
 *      A source whose link name changed FAILS unless src/lib/cardLinkAliases.ts
 *      records the old name. The failure prints the exact line to paste.
 *   3. An alias shadowed by a current name in its topic fails (almost always a
 *      paste into the wrong entry), and so does any alias deleted since `main`.
 *   4. Every `*_CARDS` registry entry and every per-school TITLE_OVERRIDES entry
 *      must have its `cards.*` key in en.json — that is what makes the en.json
 *      snapshot a complete census of the card names on the page.
 *
 * Name sources: `topics.*`, `cards.*` (incl. `@<school>` variants), the prose
 * card names (each manifest document's metric, named as `metricLabel()` names
 * it), and each school's Course Offerings division titles.
 *
 *   npm run check:cardlink               # check (in the build)
 *   npm run check:cardlink -- --update   # rewrite the snapshot after a rename
 *                                        # (still refuses a rename with no alias)
 */

import { readFileSync, writeFileSync, existsSync, mkdtempSync, rmSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const url = (p) => new URL(p, import.meta.url)
const read = (p) => readFileSync(url(p), 'utf8')
const UPDATE = process.argv.includes('--update')
const SNAPSHOT = fileURLToPath(url('./card_link_names.json'))

const { linkName, cardLinkId } = await import('../src/lib/cardLink.ts')
const { AREA_ALIASES, CARD_ALIASES } = await import('../src/lib/cardLinkAliases.ts')
const { resolveMetric } = await import('../src/lib/metrics.ts')
const { courseOfferings } = await import('../src/data/courseOfferings.ts')

const errors = []

/* ------------------------------------------------- 1. the naming rule -- */

const EXAMPLES = [
  ['Sports', 'The College Pipeline', 'sports/the-college-pipeline'],
  ['Sports', 'Coaching: Pedigree & Continuity', 'sports/coaching-pedigree-and-continuity'],
  ['College Support', 'Where Graduates Go', 'college-support/where-graduates-go'],
  ['College Support', "The Applicant's Edge", 'college-support/the-applicants-edge'],
  ['College Support', 'The Applicant’s Edge', 'college-support/the-applicants-edge'],
  ['Global Exposure', 'Verdict & Visit Checklist', 'global-exposure/verdict-and-visit-checklist'],
  ['Financial Aid & Tuition', 'In-Depth Report', 'financial-aid-and-tuition/in-depth-report'],
  ['The Arts', 'The TK–12 Arts Ladder', 'the-arts/the-tk-12-arts-ladder'],
  ['The Arts', 'The JrK–12 Arts Ladder', 'the-arts/the-jrk-12-arts-ladder'],
  [
    'Admissions',
    'Grade-by-Grade Application Guide — TK/K · 1–5 · 6–12',
    'admissions/grade-by-grade-application-guide-tk-k-1-5-6-12',
  ],
  ['Course Offerings', 'Upper School Courses', 'course-offerings/upper-school-courses'],
]
for (const [area, card, want] of EXAMPLES) {
  const got = cardLinkId(area, card)
  if (got !== want) errors.push(`naming rule: "${area}" / "${card}" → "${got}", expected "${want}"`)
}
for (const [name, want] of [
  ['Sports', 'sports'],
  ['Global Exposure', 'global-exposure'],
  ['Learning Support & Student Services', 'learning-support-and-student-services'],
  ['Café (Crème)', 'cafe-creme'],
  ['  —Leading / trailing+  ', 'leading-trailing'],
]) {
  if (linkName(name) !== want) errors.push(`naming rule: "${name}" → "${linkName(name)}", expected "${want}"`)
}

/* ---------------------------------- 4. every card title has an en.json key -- */

const en = JSON.parse(read('../src/locales/en.json'))
const cardKeys = en.cards ?? {}

/* Registry file → the topic its cards render under (SchoolDetail's cardTitle). */
const REGISTRIES = [
  ['../src/data/sportsProgram.ts', 'SPORTS_CARDS', 'sports'],
  ['../src/data/artsProgram.ts', 'ARTS_CARDS', 'the-arts'],
  ['../src/data/collegeSupport.ts', 'COLLEGE_SUPPORT_CARDS', 'college-support'],
  ['../src/data/highSchoolPlacement.ts', 'HIGH_SCHOOL_PLACEMENT_CARDS', 'high-school-placement'],
  ['../src/data/afterSchool.ts', 'AFTER_SCHOOL_CARDS', 'after-school'],
  ['../src/data/summerPrograms.ts', 'SUMMER_CARDS', 'summer-programs'],
  ['../src/data/admissionsPrograms.ts', 'ADMISSIONS_CARDS', 'admissions'],
  ['../src/data/internationalTravel.ts', 'INTERNATIONAL_TRAVEL_CARDS', 'international-travel'],
  ['../src/data/learningSupport.ts', 'LEARNING_SUPPORT_CARDS', 'learning-support'],
  ['../src/data/clubsProgram.ts', 'CLUBS_CARDS', 'student-clubs'],
]

/** The `[ … ]` / `{ … }` body after `marker`, by bracket depth. */
function bodyAfter(src, marker, open, close) {
  const start = src.indexOf(marker)
  if (start === -1) return null
  const i0 = src.indexOf(open, start + marker.length - 1)
  let depth = 0
  for (let i = i0; i < src.length; i++) {
    if (src[i] === open) depth++
    else if (src[i] === close && --depth === 0) return src.slice(i0 + 1, i)
  }
  return null
}
const stripComments = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '')
/** A quoted string literal whose quote is capture group `n` (content is n+1). */
const STR = (n = 1) => `(['"\x60])((?:\\\\.|(?!\\${n}).)*)\\${n}`

for (const [file, reg, topic] of REGISTRIES) {
  const src = stripComments(read(file))
  const body = bodyAfter(src, `export const ${reg} = [`, '[', ']')
  if (!body) {
    errors.push(`registry: ${reg} not found in ${file.replace('../', '')} — update REGISTRIES in this script`)
    continue
  }
  const keys = [...body.matchAll(new RegExp(String.raw`key\s*:\s*` + STR(1), 'g'))].map((m) => m[2])
  if (!keys.length) errors.push(`registry: no keys parsed from ${reg}`)
  for (const key of keys) {
    if (!(`${topic}.${key}` in cardKeys)) {
      errors.push(`en.json: no cards["${topic}.${key}"] for ${reg} card "${key}" — add it with the registry's English title`)
    }
  }
  const outer = bodyAfter(src, 'const TITLE_OVERRIDES', '{', '}')
  if (outer === null) continue
  const schoolRe = new RegExp(String.raw`(?:^|[,{\s])(?:` + STR(1) + String.raw`|([A-Za-z_][\w-]*))\s*:\s*\{([^{}]*)\}`, 'g')
  for (const m of outer.matchAll(schoolRe)) {
    const school = m[2] ?? m[3]
    for (const f of m[4].matchAll(new RegExp(String.raw`([A-Za-z_]\w*)\s*:\s*` + STR(2), 'g'))) {
      const k = `${topic}.${f[1]}@${school}`
      if (!(k in cardKeys)) {
        errors.push(`en.json: no cards["${k}"] for the TITLE_OVERRIDES entry "${f[3]}" — add it with that exact English`)
      }
    }
  }
}

/* --------------------------------------------- 2. the name snapshot -- */

const current = {}
const manifest = JSON.parse(read('../src/data/schools.json'))
for (const [slug, name] of Object.entries(en.topics ?? {})) current[`area:${slug}`] = linkName(name)
for (const [k, name] of Object.entries(cardKeys)) {
  const dot = k.indexOf('.')
  current[`card:${k.slice(0, dot)}:${k.slice(dot + 1)}`] = linkName(name)
}
const metrics = en.metrics ?? {}
for (const d of manifest.documents ?? []) {
  const r = resolveMetric(d.topic_slug, d.subtopic)
  if (r.status === 'hidden') continue
  const { key, label } = r.metric
  /* Same precedence as metricLabel(): topic-scoped key, flat key, then label. */
  const name = metrics[`${d.topic_slug}.${key}`] ?? metrics[key] ?? label
  current[`metric:${d.topic_slug}:${key}`] = linkName(name)
}
for (const s of manifest.schools ?? []) {
  const co = courseOfferings(s.slug, 'en')
  co?.divisions.forEach((div, i) => {
    current[`course:${s.slug}:${i}`] = linkName(div.title)
  })
}

/** Topic and key a source id names, for the alias it needs. */
function aliasTarget(id, newLink) {
  const [kind, a, b] = id.split(':')
  if (kind === 'area') return { area: true, topic: a }
  if (kind === 'card') return { topic: a, key: b.split('@')[0] }
  if (kind === 'metric') return { topic: a, key: b }
  if (kind === 'course') return { topic: 'course-offerings', key: newLink }
  return null
}

const snapshot = existsSync(SNAPSHOT) ? JSON.parse(readFileSync(SNAPSHOT, 'utf8')) : null
const now = new Date()
const today = [now.getFullYear(), now.getMonth() + 1, now.getDate()].map((n) => String(n).padStart(2, '0')).join('-')
let renamed = 0
let removed = 0
let added = 0
if (snapshot) {
  for (const [id, oldLink] of Object.entries(snapshot)) {
    if (!(id in current)) {
      removed++
      console.log(`  removed: ${id} (${oldLink}) — its old links land on the area section`)
      continue
    }
    const newLink = current[id]
    if (newLink === oldLink) continue
    renamed++
    const t = aliasTarget(id, newLink)
    const ok = t.area
      ? AREA_ALIASES.some((a) => a.from === oldLink && a.topic === t.topic)
      : CARD_ALIASES.some(
          (a) => a.from === oldLink && a.key === t.key && (a.topic === undefined || a.topic === t.topic),
        )
    if (!ok) {
      const line = t.area
        ? `{ from: '${oldLink}', topic: '${t.topic}', since: '${today}' },`
        : `{ from: '${oldLink}', topic: '${t.topic}', key: '${t.key}', since: '${today}' },`
      errors.push(
        `rename without a former name: ${id} "${oldLink}" → "${newLink}".\n` +
          `    Links to the old name are already shared. Add this to ${t.area ? 'AREA_ALIASES' : 'CARD_ALIASES'} in src/lib/cardLinkAliases.ts:\n` +
          `      ${line}\n` +
          `    then run: npm run check:cardlink -- --update`,
      )
    } else {
      console.log(`  renamed: ${id} "${oldLink}" → "${newLink}" (former name recorded)`)
    }
  }
  for (const id of Object.keys(current)) if (!(id in snapshot)) added++
} else if (!UPDATE) {
  errors.push('no snapshot: run npm run check:cardlink -- --update and commit scripts/card_link_names.json')
}

/* ------------------------------------------------------ 3. alias hygiene -- */

const namesByTopic = new Map()
for (const [id, link] of Object.entries(current)) {
  const [kind, a] = id.split(':')
  if (kind === 'area') continue
  const topic = kind === 'course' ? 'course-offerings' : a
  if (!namesByTopic.has(topic)) namesByTopic.set(topic, new Set())
  namesByTopic.get(topic).add(link)
}
const areaLinks = new Set(Object.entries(current).filter(([id]) => id.startsWith('area:')).map(([, l]) => l))
for (const a of AREA_ALIASES) {
  if (areaLinks.has(a.from)) errors.push(`AREA_ALIASES: "${a.from}" is a current area name, so it would never be used`)
  if (a.from !== linkName(a.from)) errors.push(`AREA_ALIASES: "${a.from}" is not in linkName() form`)
}
for (const a of CARD_ALIASES) {
  const topics = a.topic ? [a.topic] : [...namesByTopic.keys()]
  for (const t of topics) {
    if (namesByTopic.get(t)?.has(a.from)) {
      errors.push(`CARD_ALIASES: "${a.from}" is a current card name in ${t}, so it shadows nothing and is almost certainly a mistake`)
    }
  }
  if (a.from !== linkName(a.from)) errors.push(`CARD_ALIASES: "${a.from}" is not in linkName() form`)
}

/* An alias on `main` that is gone here breaks a shared link. */
let mainSrc = null
try {
  mainSrc = execFileSync('git', ['show', 'main:src/lib/cardLinkAliases.ts'], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  })
} catch {
  /* No `main`, or the file is not on it yet: nothing to compare. */
}
if (mainSrc) {
  const dir = mkdtempSync(join(tmpdir(), 'cardlink-'))
  try {
    const f = join(dir, 'aliases.main.ts')
    writeFileSync(f, mainSrc)
    const main = await import(pathToFileURL(f).href)
    const key = (a) => JSON.stringify([a.from, a.topic ?? null, a.key ?? null])
    const have = new Set([...AREA_ALIASES, ...CARD_ALIASES].map(key))
    for (const a of [...(main.AREA_ALIASES ?? []), ...(main.CARD_ALIASES ?? [])]) {
      if (!have.has(key(a))) errors.push(`alias deleted since main: ${JSON.stringify(a)} — entries are never removed`)
    }
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

/* ------------------------------------------------------------- report -- */

if (errors.length) {
  console.error(`check:cardlink — ${errors.length} problem(s):`)
  for (const e of errors) console.error(`  ✗ ${e}`)
  process.exit(1)
}
const n = Object.keys(current).length
if (UPDATE) {
  const sorted = Object.fromEntries(Object.keys(current).sort().map((k) => [k, current[k]]))
  writeFileSync(SNAPSHOT, JSON.stringify(sorted, null, 2) + '\n')
  console.log(`check:cardlink — snapshot written: ${n} names (${renamed} renamed, ${added} new, ${removed} removed)`)
} else {
  if (added) {
    console.log(`  ${added} new name source(s) not in the snapshot — run npm run check:cardlink -- --update`)
  }
  console.log(`check:cardlink — ok: naming rule, ${n} names, ${AREA_ALIASES.length + CARD_ALIASES.length} former names`)
}
