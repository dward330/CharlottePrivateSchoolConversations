#!/usr/bin/env node
/**
 * Render one Wells Fargo Cup division (NCISAA 4A, 3A, 2A or NCHSAA 6A) into a
 * NotebookLM source PDF, plus the prompt that turns it into an episode of
 * *Charlotte Private School Conversations*.
 *
 *   node scripts/gen_cup_episode.mjs                      # lists the divisions, exits 2
 *   node scripts/gen_cup_episode.mjs --division ncisaa-4a \
 *     [--live <file.json>] [--extras <file.json>] [--overrides <file.json>] \
 *     [--skeleton <file.json>] [--notes <file.txt>]
 *   npm run report:cup -- --division ncisaa-4a ...
 *
 * Writes three files to reports/wells-fargo-cup/ (gitignored):
 *
 *   Wells Fargo Cup - <DIV> - NotebookLM Source.pdf
 *   Wells Fargo Cup - <DIV> - NotebookLM Prompt.txt
 *   <division>-cup.html
 *
 * Driven by .claude/skills/cup-episode/SKILL.md. Plan: .claude/plans/cupepisode.md.
 *
 * ⛔ EVERY FIGURE COMES FROM THE LEDGER AT RUN TIME. Places, points, splits,
 * margins and streaks are computed from src/data/wellsFargoCup.ts through
 * src/lib/wellsFargoCup.ts, the same rules the Cup card uses. Nothing here is
 * typed. The only typed figures are the in-progress table in --live and the
 * researched --extras, and each of those carries its source URL. This script
 * never changes the ledger; a stale ledger is fixed through /wells-fargo-cup.
 *
 * ⛔ STREAKS ARE WRITTEN INTO THE PDF AS SENTENCES. "Four straight" is computed
 * here from consecutive seasons in the same class, never left for the hosts to
 * work out: a hype-voiced host who has to count will round up.
 *
 * ⛔ COACHES MAY BE NAMED; STUDENTS MAY NOT (user decision 2026-11-06). The
 * `honors` card (student and pro names), `pipeline.roster` (named commits),
 * `record.bars` and `record.seasonDetail` (the likeliest fields to name a
 * player) never render. Every other string is scanned against every roster and
 * pro name in the sports data; a hit fails closed (exit 3) until the overrides
 * file rewrites or drops it. `--skeleton` writes a starter overrides file. The
 * gate only knows the names in the data, so the skill still reads the PDF, and
 * an overrides key `source:<url>` (null) drops a Sources entry it finds there.
 *
 * ⛔ THE PROMPT IS NEVER IN THE PDF, and every segment in it is decided HERE
 * from what exists: one numbered segment per roster school, the live segment
 * only with live rows, the NCHSAA wording only for the NCHSAA. A conditional in
 * the prompt is the part NotebookLM drops; see memory
 * notebooklm-prompt-conditionals-get-dropped.
 *
 * The ledger, the lib and each src/data/sportsPrograms/<slug>.ts import under
 * plain Node, as check_cup_ledger.mjs does; the registry
 * src/data/sportsProgram.ts does NOT (import.meta.glob).
 *
 * Exit codes: 0 = files written · 2 = bad arguments / no such division / a
 * final season passed as live · 3 = strings name a student (nothing written).
 */
import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { resolve, join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const PROGRAMS_DIR = join(REPO_ROOT, 'src/data/sportsPrograms')
const OUT_DIR = join(REPO_ROOT, 'reports/wells-fargo-cup')

/** NotebookLM's Customize box truncates silently at ~4,909. Never raise it. */
const PROMPT_CHAR_BUDGET = 4900

const args = process.argv.slice(2)
const value = (flag) => {
  const i = args.indexOf(flag)
  return i >= 0 ? args[i + 1] : undefined
}
const say = (s) => process.stdout.write(s + '\n')
function die(msg, code = 2) {
  process.stderr.write(msg + '\n')
  process.exit(code)
}
function readJson(flag) {
  const path = value(flag)
  if (!path) return undefined
  const p = resolve(REPO_ROOT, path)
  if (!existsSync(p)) die(`${flag} file not found: ${p}`)
  try {
    return JSON.parse(readFileSync(p, 'utf8'))
  } catch (err) {
    die(`${flag} is not valid JSON: ${err.message}`)
  }
}

const {
  CUP_DIVISION_LEADERS,
  CUP_FIELD_SIZES,
  CUP_POINTS,
  CUP_RECORDS,
  CUP_SEASONS,
  CUP_SHORT_NAMES,
  CUP_SPORTS,
} = await import('../src/data/wellsFargoCup.ts')
const cup = await import('../src/lib/wellsFargoCup.ts')
const manifest = JSON.parse(readFileSync(join(REPO_ROOT, 'src/data/schools.json'), 'utf8'))
const en = JSON.parse(readFileSync(join(REPO_ROOT, 'src/locales/en.json'), 'utf8'))
const T = en.sports.cup

/**
 * The NCISAA's own description of the Cup, from its History and Scoring page
 * (https://www.ncisaa.org/recognition/wells-fargo-cup/history/), transcribed in
 * source-material/sports/providence-day/Providence Day - Sports - Wells Fargo Cup
 * History and Scoring.md. Only what that page says; a longer history (all-time
 * Cup counts) is a researched extra, fetched and saved first.
 */
const HISTORY =
  'The NCISAA describes the Cup this way. Presented and sponsored by Wells Fargo Bank, it recognizes overall excellence in high school athletics among NCISAA member schools. Since 1985 it has been presented to the schools in each classification with the best overall interscholastic athletic programs, and it is awarded to the school with the most combined points in each classification. The winning schools receive an engraved silver cup as permanent recognition of that year’s athletic excellence.'
const TOP_EIGHT =
  'Each school that finishes in the top eight of a state championship earns Cup points. That applies to sports that compete by division as well as by classification.'

/* ------------------------------------------------------------ the roster -- */

const all = [] // every sports program: the gate's name list reads them all
const roster = [] // the ones with a Cup card
for (const file of readdirSync(PROGRAMS_DIR).sort()) {
  if (!file.endsWith('.ts')) continue
  const slug = file.slice(0, -3)
  const mod = await import(new URL(`file://${join(PROGRAMS_DIR, file)}`).href)
  for (const program of Object.values(mod)) {
    if (!program || typeof program !== 'object' || !('offered' in program)) continue
    all.push({ slug, program })
    if (!program.cup) continue
    const stats = cup.headlineStats(slug)
    if (!stats) die(`${slug} has a cup card but no ledger rows. Run npm run check:cup.`)
    roster.push({ slug, program, stats })
  }
}

const divKey = (r) => `${r.association}-${r.classification}`.toLowerCase()
const divisions = new Map()
for (const s of roster) {
  const key = divKey(s.stats.latest)
  if (!divisions.has(key)) divisions.set(key, { key, association: s.stats.latest.association, classification: s.stats.latest.classification, schools: [] })
  divisions.get(key).schools.push(s)
}
const nameOf = (slug) => manifest.schools.find((s) => s.slug === slug)?.name ?? CUP_SHORT_NAMES[slug] ?? slug
const shortOf = (slug) => CUP_SHORT_NAMES[slug] ?? nameOf(slug)

function listDivisions(out) {
  for (const d of divisions.values()) {
    const field = CUP_FIELD_SIZES[`${d.association}|${d.classification}`]
    out(
      `  ${d.key.padEnd(11)} ${d.association} ${d.classification} · ${d.schools.length} roster school(s)` +
        `${field ? `, field ${field}` : ', published top only'}: ${d.schools.map((s) => shortOf(s.slug)).join(', ')}`,
    )
  }
}

const DIVISION = value('--division')
if (!DIVISION) {
  say('Wells Fargo Cup divisions with at least one roster school:')
  listDivisions(say)
  say('\nRun with --division <slug>.')
  process.exit(2)
}
const div = divisions.get(DIVISION)
if (!div) {
  process.stderr.write(`No division "${DIVISION}". Valid divisions:\n`)
  listDivisions((s) => process.stderr.write(s + '\n'))
  process.exit(2)
}
const ASSOC = div.association
const CLS = div.classification
const DIV = `${ASSOC} ${CLS}`
const NCHSAA = ASSOC === 'NCHSAA'
const L = CUP_SEASONS.at(-1)

/* --------------------------------------------------------------- wording -- */

const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
const word = (n) => WORDS[n] ?? String(n)
const ordinal = (n) => {
  const s = n % 100 >= 11 && n % 100 <= 13 ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' }[n % 10] ?? 'th')
  return `${n}${s}`
}
const placeText = (r) => `${r.tied ? 'tied for ' : ''}${ordinal(r.place)}`
const pts = (n) => String(n)
const and = (xs) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs.at(-1)}`)
const runWord = (n) => (n === 2 ? 'back-to-back' : `${word(n)} straight`)
const sportLabel = (sport, gender) => {
  const name = T[`sport_${sport}`] ?? sport
  return gender === 'both' ? name : T[`genderSport_${gender}`].replace('{{sport}}', name)
}
/** `'23–24` → `2023–24`; `2022–2023 →` → `2022–2023`. */
const seasonLabel = (s) => s.replace(/\s*→\s*$/, '').replace(/^'(\d\d)–(\d\d)$/, '20$1–$2')
const RESULT = {
  STATE: 'state champion',
  'STATE x2': 'two state titles',
  'RUNNER-UP': 'runner-up',
  SEMIFINAL: 'semifinalist',
}
// NONE renders as a bare dash on the card, which claims nothing, so it is left
// out here rather than spoken as "did not reach the semifinals" (false for a
// meet-scored sport).

/** Runs of consecutive seasons at `place` in one class, longest first. */
function seasonRuns(records, place) {
  const runs = []
  let run = []
  for (const r of records) {
    const prev = run.at(-1)
    const adjacent =
      prev &&
      CUP_SEASONS.indexOf(r.season) === CUP_SEASONS.indexOf(prev.season) + 1 &&
      r.association === prev.association &&
      r.classification === prev.classification
    if (r.place === place && (adjacent || !prev)) run.push(r)
    else {
      if (run.length) runs.push(run)
      run = r.place === place ? [r] : []
    }
  }
  if (run.length) runs.push(run)
  return runs
}

/** Runs of consecutive calendar years, ≥ 2 long. */
function yearRuns(years) {
  const sorted = [...years].sort((a, b) => a - b)
  const runs = []
  for (const y of sorted) {
    const last = runs.at(-1)
    if (last && y === last.at(-1) + 1) last.push(y)
    else runs.push([y])
  }
  return runs.filter((r) => r.length >= 2)
}

function streakSentences(slug, records) {
  const out = []
  const name = shortOf(slug)
  const latest = records.at(-1)
  const label = (r) => `${r.association} ${r.classification}`
  const wins = seasonRuns(records, 1)
  const longest = wins.reduce((best, r) => (r.length > (best?.length ?? 0) ? r : best), null)
  if (longest && longest.length >= 2) {
    out.push(
      `${name} has won ${runWord(longest.length)} ${label(longest[0])} Wells Fargo Cups: ${and(longest.map((r) => r.season))}.`,
    )
  }
  const current = wins.find((run) => run.at(-1) === latest)
  if (current && current !== longest && current.length >= 2) {
    out.push(`Its current run is ${word(current.length)} straight ${label(current[0])} Cups: ${and(current.map((r) => r.season))}.`)
  }
  for (const run of seasonRuns(records, 2).filter((r) => r.length >= 2)) {
    out.push(
      `${name} finished runner-up in ${label(run[0])} in ${word(run.length)} straight seasons: ${and(run.map((r) => r.season))}.`,
    )
  }
  return out
}

/* ------------------------------------------- per-school content (scanned) -- */

// Only the fields that render. Override paths address this object:
// <slug>.<card>.<field path>, or extras.<division|slug>.<i>.text.
const content = {}
for (const { slug, program } of div.schools) {
  const c = {}
  if (program.record) {
    const r = program.record
    c.record = {
      headline: r.headline,
      // `at` is the row's index in the card, so an override can rename or drop a row.
      rows: r.rows.map((row, at) => ({ program: row.program, at, ...(row.note ? { note: row.note } : {}) })),
      ...(r.didNotWin ? { didNotWin: r.didNotWin } : {}),
    }
  }
  if (program.coaching) {
    const k = program.coaching
    c.coaching = {
      featured: (k.featured ?? []).map((f) => ({
        kicker: f.kicker,
        name: f.name,
        stats: f.stats.map((s) => ({ value: s.value, label: s.label })),
        detail: f.detail,
      })),
      tenure: (k.tenure ?? []).map((t) => ({
        name: t.name,
        role: t.role,
        // Placeholder tenures ("tenure", "not published") and unverified ones never render.
        ...(!t.toVerify && /\d|long/.test(t.since) ? { since: t.since } : {}),
      })),
      ...(k.worthKnowing ? { worthKnowing: k.worthKnowing } : {}),
    }
  }
  if (program.pipeline) {
    const p = program.pipeline
    c.pipeline = {
      funnel: (p.funnel ?? []).map((f) => ({ label: f.label, ...(f.hint ? { hint: f.hint } : {}), count: f.count })),
      sportBars: (p.sportBars ?? []).map((b) => ({ sport: b.sport, count: b.count })),
    }
  }
  content[slug] = c
}

const extras = readJson('--extras') ?? {}
content.extras = { [DIVISION]: extras.division ?? [] }
for (const [slug, list] of Object.entries(extras.schools ?? {})) {
  if (!div.schools.some((s) => s.slug === slug)) die(`--extras names ${slug}, which is not a roster school in ${DIV}.`)
  content.extras[slug] = list
}
for (const list of Object.values(content.extras)) {
  for (const x of list) if (!x?.text || !x?.source) die(`Every --extras entry needs "text" and "source": ${JSON.stringify(x)}`)
}

const DELETE = Symbol('delete')
const overrides = readJson('--overrides')
// `source:<url>` (value null) drops one Sources entry: a citation whose URL slug
// names a student the gate does not hold (a news post titled with two surnames).
const DROPPED_URLS = new Set()
if (overrides) {
  for (const [path, raw] of Object.entries(overrides)) {
    if (path.startsWith('source:')) {
      if (raw !== null) die(`${path}: a source override can only be null (drop it).`)
      DROPPED_URLS.add(path.slice('source:'.length))
      continue
    }
    setPath(content, path, raw === null ? DELETE : raw)
  }
  prune(content)
}

function setPath(obj, path, val) {
  const keys = path.split('.')
  let node = obj
  for (const k of keys.slice(0, -1)) {
    if (node?.[k] === undefined) die(`Override path not found: ${path}`)
    node = node[k]
  }
  const last = keys.at(-1)
  if (!(last in node)) die(`Override path not found: ${path}`)
  node[last] = val
}

/** Remove every DELETE marker: array items are spliced out, object keys deleted. */
function prune(node) {
  if (Array.isArray(node)) {
    for (let i = node.length - 1; i >= 0; i--) {
      if (node[i] === DELETE) node.splice(i, 1)
      else prune(node[i])
    }
  } else if (node && typeof node === 'object') {
    for (const k of Object.keys(node)) {
      if (node[k] === DELETE) delete node[k]
      else prune(node[k])
    }
  }
}

/* ------------------------------------------------------- the student gate -- */

// Names come from EVERY sports program, not only this division's: a student
// from one school can appear in another school's record note.
const SUFFIX = /\s+(Jr\.?|Sr\.?|II|III|IV)$/
const coachSurnames = new Set()
for (const { program } of all) {
  for (const c of [...(program.coaching?.featured ?? []), ...(program.coaching?.tenure ?? [])]) {
    coachSurnames.add(c.name.replace(SUFFIX, '').trim().split(/\s+/).at(-1))
  }
}
const schoolWords = new Set(
  [...Object.values(CUP_SHORT_NAMES), ...manifest.schools.map((s) => s.name)].flatMap((n) => n.split(/\s+/)),
)
// Surnames that are also everyday words in sports copy ("Hall of Fame").
const COMMON_WORDS = new Set(['Hall', 'Field', 'Park', 'Green', 'Young', 'King', 'Little', 'Rose', 'Love', 'Price', 'Strong'])
const nameTokens = new Set()
for (const { program } of all) {
  for (const { name } of [...(program.pipeline?.roster ?? []), ...(program.honors?.pros ?? [])]) {
    if (!name) continue
    const bare = name.replace(SUFFIX, '').trim()
    nameTokens.add(bare)
    // A bare surname too, unless a coach or a school shares it (Grier, Day).
    const surname = bare.split(/\s+/).at(-1)
    if (surname.length >= 4 && !coachSurnames.has(surname) && !schoolWords.has(surname) && !COMMON_WORDS.has(surname)) nameTokens.add(surname)
  }
}
const NAME_RE = nameTokens.size
  ? new RegExp(`\\b(${[...nameTokens].map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`)
  : null
const EMAIL_RE = /[\w.+-]+@[\w-]+\.[\w.]+/
const PHONE_RE = /\(?\b\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}\b/

const loose = (t) => t.toLowerCase().replace(/[-_/.%20+]+/g, ' ')
const LOOSE_NAMES = [...nameTokens].filter((t) => t.includes(' ')).map(loose)
/** Case- and hyphen-blind full-name match, for URLs and the final sweep. */
const namesIn = (text) => {
  const hay = ` ${loose(text)} `
  return LOOSE_NAMES.find((t) => hay.includes(` ${t} `))
}

function problemsIn(text) {
  const out = []
  if (EMAIL_RE.test(text)) out.push('email address')
  if (PHONE_RE.test(text)) out.push('phone number')
  const m = NAME_RE && text.match(NAME_RE)
  if (m) out.push(`student name "${m[1]}"`)
  return out
}

function scan(node, path, found) {
  if (typeof node === 'string') {
    const why = problemsIn(node)
    if (why.length) found.push({ path, text: node, why })
  } else if (Array.isArray(node)) {
    node.forEach((v, i) => scan(v, `${path}.${i}`, found))
  } else if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) {
      if (k === 'source') continue
      scan(v, path ? `${path}.${k}` : k, found)
    }
  }
  return found
}

const problems = scan(content, '', [])
if (problems.length) {
  const SKELETON = value('--skeleton')
  if (SKELETON) {
    const stub = Object.fromEntries(problems.map((p) => [p.path, p.text]))
    writeFileSync(resolve(REPO_ROOT, SKELETON), JSON.stringify(stub, null, 2) + '\n', 'utf8')
  }
  process.stderr.write(
    `${problems.length} string(s) carry something the hosts must not say. Rewrite each to the team,\n` +
      `position or class in the --overrides file (a string replaces it, null drops it). Nothing was written.\n\n`,
  )
  for (const p of problems) process.stderr.write(`  ${p.path}  [${p.why.join(', ')}]\n    ${p.text}\n`)
  if (SKELETON) process.stderr.write(`\nStarter overrides written to ${SKELETON}; every value still needs rewriting.\n`)
  process.exit(3)
}

/* -------------------------------------------------------------- the live -- */

const live = readJson('--live')
if (live) {
  if (CUP_SEASONS.includes(live.season)) {
    die(
      `--live season ${live.season} is already a final season in the ledger. A final table belongs in\n` +
        `src/data/wellsFargoCup.ts (through /wells-fargo-cup), never in --live. Nothing was written.`,
    )
  }
  for (const k of ['season', 'asOf', 'throughTerm', 'source']) if (!live[k]) die(`--live needs "${k}".`)
}
const liveRows = live?.rows ?? []

/* ---------------------------------------------------------- the division -- */

const inDivision = (r, season) => r.association === ASSOC && r.classification === CLS && r.season === season
const field = CUP_RECORDS.filter((r) => inDivision(r, L)).map((r) => ({ ...r, name: nameOf(r.school) }))
const fieldSize = CUP_FIELD_SIZES[`${ASSOC}|${CLS}`]
if (fieldSize && field.length < fieldSize) {
  say(`warning: the ledger holds ${field.length} of ${fieldSize} ${DIV} schools for ${L}; filling from --live finalField.`)
  for (const r of live?.finalField ?? []) {
    if (field.some((f) => f.name === r.school || f.school === r.slug)) continue
    field.push({ ...r, name: r.slug ? nameOf(r.slug) : r.school })
  }
  if (field.length < fieldSize) say(`warning: still ${field.length} of ${fieldSize} after finalField.`)
}
field.sort((a, b) => a.place - b.place)

const leaders = CUP_SEASONS.map((season) => {
  const at = (place) => CUP_DIVISION_LEADERS.find((l) => inDivision(l, season) && l.place === place)
  const first = at(1)
  const second = at(2)
  return first && second ? { season, first, second, gap: first.points - second.points } : null
}).filter(Boolean)
const leaderName = (l) => (l.slug ? nameOf(l.slug) : l.school)
const closest = leaders.reduce((best, l) => (!best || l.gap < best.gap ? l : best), null)
const latestRace = leaders.find((l) => l.season === L)

/* ------------------------------------------------------------------ HTML -- */

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])

const sections = []
let n = 0
const section = (title, body) => body && sections.push(`<h2>${++n}. ${esc(title)}</h2>\n${body}`)
const sourceList = []
const seenUrl = new Set()
/** A page about one person, whose slug names them whether or not we hold the name. */
const PERSON_PAGE = /\/(player|players|roster|athlete|profile)\/[^/]*[a-z]-[a-z]/i
let droppedSources = 0
const addSource = (label, url) => {
  if (!url || seenUrl.has(url)) return
  // Commit and recruiting citations are per-player pages: the name sits in the
  // label or the URL slug (/player/first-last/), so such a source is dropped.
  if (DROPPED_URLS.has(url) || namesIn(`${label} ${url}`) || NAME_RE?.test(label) || PERSON_PAGE.test(url)) {
    seenUrl.add(url)
    droppedSources++
    return
  }
  seenUrl.add(url)
  sourceList.push({ label, url })
}

// What the Cup is
{
  const what2 = T.what2
    .replace('{{school}} competes', 'The Charlotte-area schools in this episode compete')
    .replace('{{association}}', ASSOC)
    .replace('{{classification}}', CLS)
  let body = `<p>${esc(HISTORY)}</p><p>${esc(T.what1)}</p><p>${esc(what2)}</p>`
  for (const x of content.extras[DIVISION]) {
    body += `<p>${esc(x.text)}</p>`
    addSource('Researched for this episode', x.source)
  }
  section('What the Wells Fargo Cup is', body)
}

// How points are earned
{
  const ladder = CUP_POINTS.map((p, i) => `<li>${ordinal(i + 1)} place: ${p} points</li>`).join('')
  let body = `<p>${esc(NCHSAA ? T.what3Nchsaa : T.what3)}</p>`
  if (!NCHSAA) body += `<p>${esc(TOP_EIGHT)}</p>`
  body += `<p>Points at a state championship:</p><ul>${ladder}</ul><p>${esc(T.tieRule)}</p>`
  body += `<p>The year is scored across three seasons: fall, winter and spring. The sports that count in the ${esc(ASSOC)}:</p><ul>`
  for (const term of cup.CUP_TERMS) {
    body += `<li><strong>${T[`term_${term}`]}:</strong> ${esc(CUP_SPORTS[ASSOC][term].map((s) => sportLabel(s.key, s.gender)).join(', '))}</li>`
  }
  body += '</ul>'
  if (!NCHSAA) body += `<p>Football divisions each score separately.</p>`
  section('How points are earned', body)
}

// The field
{
  const title = NCHSAA ? `The ${DIV} published top finishers, ${L} final standings` : `The ${DIV} field, ${L} final standings`
  let body = NCHSAA
    ? `<p>${esc(T.tableNoteNchsaa.split(", so ")[0])}.</p>`
    : !fieldSize || field.length >= fieldSize
      ? `<p>Every school in ${esc(DIV)} in the final ${esc(L)} standings${fieldSize ? `, all ${fieldSize} of them` : ''}.</p>`
      : // The published table also lists schools with a blank place on 0 points (CUP_FIELD_SIZES).
        `<p>Every school with a place in ${esc(DIV)} in the final ${esc(L)} standings. The published table lists ${fieldSize} schools; the other ${word(fieldSize - field.length)} are listed with no place and 0 points.</p>`
  body +=
    `<table><tr><th style="width:18%">Place</th><th>School</th><th style="width:16%">Points</th></tr>` +
    field.map((r) => `<tr><td>${placeText(r)}</td><td>${esc(r.name)}</td><td>${pts(r.points)}</td></tr>`).join('') +
    `</table>`
  if (leaders.length) {
    const span = leaders.length === CUP_SEASONS.length ? 'the last six seasons' : 'each season on record'
    body +=
      `<h3>${esc(DIV)} champions, ${span}</h3>` +
      `<table><tr><th style="width:16%">Season</th><th>Champion</th><th>Runner-up</th><th style="width:12%">Margin</th></tr>` +
      leaders
        .map(
          (l) =>
            `<tr><td>${l.season}</td><td>${esc(leaderName(l.first))}, ${pts(l.first.points)}</td><td>${esc(leaderName(l.second))}, ${pts(l.second.points)}</td><td>${pts(l.gap)}</td></tr>`,
        )
        .join('') +
      `</table>`
  }
  section(title, body)
}

// Where it stands right now
if (liveRows.length) {
  const rows = [...liveRows].sort((a, b) => a.place - b.place)
  section(
    `Where it stands right now: ${live.season}, as of ${live.asOf}, after the ${live.throughTerm} season`,
    `<p><strong>The ${esc(live.season)} season is not finished.</strong> These are the association's in-progress standings as of ${esc(live.asOf)}, after the ${esc(live.throughTerm)} season. They will change, and they are not final.</p>` +
      `<table><tr><th style="width:18%">Place so far</th><th>School</th><th>Fall</th><th>Winter</th><th>Spring</th><th>Points so far</th></tr>` +
      rows
        .map(
          (r) =>
            `<tr><td>${placeText(r)}</td><td>${esc(r.slug ? nameOf(r.slug) : r.school)}</td><td>${r.fall ?? ''}</td><td>${r.winter ?? ''}</td><td>${r.spring ?? ''}</td><td>${pts(r.points)}</td></tr>`,
        )
        .join('') +
      `</table>`,
  )
  addSource(`${ASSOC} Wells Fargo Cup standings, ${live.season} (in progress)`, live.source)
}

// One section per roster school, best latest place first
const ordered = [...div.schools].sort((a, b) => a.stats.latest.place - b.stats.latest.place)
const segmentFacts = {} // what each school's prompt line can point at
for (const { slug, program, stats } of ordered) {
  const name = nameOf(slug)
  const short = shortOf(slug)
  const records = cup.recordsFor(slug)
  const c = content[slug]
  const latest = stats.latest
  let body = `<p><strong>${esc(short)} finished ${placeText(latest)} in ${esc(DIV)} in ${latest.season}, with ${pts(latest.points)} points.</strong>`
  if (stats.latestMargin) {
    const m = stats.latestMargin
    body +=
      m.value > 0
        ? ` It won by ${pts(m.value)} points over ${esc(m.rival.name)}, ${pts(latest.points)} to ${pts(m.rival.points)}.`
        : ` That was ${pts(-m.value)} points behind the winner, ${esc(m.rival.name)}, which scored ${pts(m.rival.points)}.`
  }
  body += '</p>'

  const bf = stats.bestFinish
  const atBest = records.filter((r) => r.place === bf.place)
  const span = stats.seasonsTotal === CUP_SEASONS.length ? 'the six seasons' : `the ${word(stats.seasonsTotal)} seasons on record`
  body += '<ul>'
  body += `<li><strong>Wells Fargo Cups won, ${CUP_SEASONS[0]} to ${L}:</strong> ${stats.cupsWon} of ${stats.seasonsTotal}.</li>`
  body +=
    `<li><strong>Best finish of ${span}:</strong> ${placeText(bf)} in ${bf.association} ${bf.classification}, ${bf.season}` +
    (atBest.length > 1
      ? `. It finished ${ordinal(bf.place)} ${word(atBest.length)} times: ${and(atBest.map((r) => (r.association === ASSOC && r.classification === CLS ? r.season : `${r.season} (in ${r.classification})`)))}.`
      : `, the only time in ${span} it finished ${ordinal(bf.place)}.`) +
    '</li>'
  body += `<li><strong>Highest point total:</strong> ${pts(stats.peak.points)}, in ${stats.peak.season}.</li>`
  if (stats.bestSeason) {
    body += `<li><strong>Strongest season of the ${latest.season} year:</strong> ${stats.bestSeason.term}, with ${pts(stats.bestSeason.points)} points.</li>`
  }
  body += '</ul>'

  const streaks = streakSentences(slug, records)
  if (streaks.length) body += `<h3>Streaks</h3><ul>${streaks.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>`

  body +=
    `<h3>Season by season</h3><table><tr><th style="width:16%">Season</th><th style="width:16%">Class</th><th style="width:16%">Place</th><th>Points</th><th>Fall</th><th>Winter</th><th>Spring</th></tr>` +
    records
      .map(
        (r) =>
          `<tr><td>${r.season}</td><td>${r.association} ${r.classification}</td><td>${placeText(r)}</td><td>${pts(r.points)}</td><td>${r.fall ?? ''}</td><td>${r.winter ?? ''}</td><td>${r.spring ?? ''}</td></tr>`,
      )
      .join('') +
    `</table>`
  if (records.some((r) => r.association !== ASSOC || r.classification !== CLS)) {
    body += `<p>${esc(short)} played in more than one class across these seasons. A finish in another class is a result in that class, not in ${esc(DIV)}.</p>`
  }

  body += `<h3>Where ${esc(short)}'s points come from</h3><ul>`
  for (const s of program.cup.pointSources) {
    const parts = []
    if (s.titleYears.length) {
      const runs = yearRuns(s.titleYears)
      parts.push(
        `state champions ${and(s.titleYears.map(String))}` +
          (runs.length ? ` (${and(runs.map((r) => `${word(r.length)} straight state titles, ${r[0]} to ${r.at(-1)}`))})` : ''),
      )
    }
    if (s.runnerUpYears?.length) parts.push(`runner-up ${and(s.runnerUpYears.map(String))}`)
    body += `<li><strong>${esc(sportLabel(s.sport, s.gender))}</strong> (${s.season}): ${parts.join('; ')}.</li>`
  }
  body += '</ul>'
  for (const x of program.cup.sources) addSource(`${short}: ${x.label}`, x.url)

  if (c.record) {
    const r = c.record
    const labels = program.record.seasonLabels.map(seasonLabel)
    body += `<h3>Recent results by program</h3><p>${esc(r.headline)}</p><ul>`
    for (const row of r.rows) {
      const results = program.record.rows[row.at].cells
        .map((cell, j) => ({ cell, label: labels[j] ?? '' }))
        .filter(({ cell }) => cell.result !== 'NONE')
        .map(({ cell, label }) => `${label} ${RESULT[cell.result] ?? cell.result}${cell.record && /\d/.test(cell.record) ? ` (${cell.record})` : ''}`.trim())
        .join('; ')
      if (!results && !row.note) continue
      body += `<li><strong>${esc(row.program)}:</strong> ${esc(results)}${results ? '.' : ''}${row.note ? ` ${esc(row.note)}.` : ''}</li>`
    }
    body += '</ul>'
    if (r.didNotWin) body += `<p><strong>Titles that went to other schools:</strong> ${esc(r.didNotWin)}</p>`
    for (const x of program.record.sources ?? []) addSource(`${short}: ${x.label}`, x.url)
  }

  if (c.coaching && (c.coaching.featured.length || c.coaching.tenure.length)) {
    const k = c.coaching
    body += `<h3>The coaches</h3>`
    for (const f of k.featured) {
      body +=
        `<p><strong>${esc(f.name)}</strong>, ${esc(f.kicker)}.</p><ul>` +
        f.stats.map((s) => `<li>${esc(s.value)}: ${esc(s.label)}</li>`).join('') +
        `</ul><p>${esc(f.detail)}</p>`
    }
    if (k.tenure.length) {
      body += `<p>Coaches and staff:</p><ul>${k.tenure.map((t) => `<li>${esc(t.name)}, ${esc(t.role)}${t.since ? `, ${esc(t.since)}` : ''}</li>`).join('')}</ul>`
    }
    if (k.worthKnowing) body += `<p><strong>Worth knowing:</strong> ${esc(k.worthKnowing)}</p>`
    for (const x of program.coaching.sources ?? []) addSource(`${short}: ${x.label}`, x.url)
  }

  if (c.pipeline && (c.pipeline.funnel.length || c.pipeline.sportBars.length)) {
    const p = c.pipeline
    body += `<h3>Playing in college, by the numbers</h3>`
    if (p.funnel.length) body += `<ul>${p.funnel.map((f) => `<li>${esc(f.label)}${f.hint ? ` ${esc(f.hint)}` : ''}: ${esc(f.count)}</li>`).join('')}</ul>`
    if (p.sportBars.length) body += `<p>By sport: ${esc(p.sportBars.map((b) => `${b.sport} ${b.count}`).join(', '))}.</p>`
    for (const x of program.pipeline.sources ?? []) addSource(`${short}: ${x.label}`, x.url)
  }

  const mine = content.extras[slug] ?? []
  if (mine.length) {
    body += `<h3>Also this season</h3><ul>${mine.map((x) => `<li>${esc(x.text)}</li>`).join('')}</ul>`
    for (const x of mine) addSource(`${short}: researched for this episode`, x.source)
  }

  segmentFacts[slug] = { streaks: streaks.length > 0, coach: Boolean(c.coaching?.featured.length || c.coaching?.tenure.length) }
  section(name, body)
}

// The race at the top
if (latestRace) {
  let body =
    `<p>In ${L}, ${esc(leaderName(latestRace.first))} won ${esc(DIV)} with ${pts(latestRace.first.points)} points, ` +
    `${pts(latestRace.gap)} ahead of ${esc(leaderName(latestRace.second))} with ${pts(latestRace.second.points)}.</p>`
  if (closest && leaders.length > 1) {
    body +=
      closest === latestRace
        ? `<p>That was the closest finish at the top of ${esc(DIV)} in ${leaders.length === CUP_SEASONS.length ? 'the last six seasons' : 'the seasons on record'}.</p>`
        : `<p>The closest finish at the top in ${leaders.length === CUP_SEASONS.length ? 'the last six seasons' : 'the seasons on record'} was ${closest.season}: ${esc(leaderName(closest.first))} ${pts(closest.first.points)}, ${esc(leaderName(closest.second))} ${pts(closest.second.points)}, a gap of ${pts(closest.gap)} points.</p>`
    body +=
      `<ul>` +
      [...leaders]
        .sort((a, b) => a.gap - b.gap)
        .map((l) => `<li>${l.season}: ${esc(leaderName(l.first))} over ${esc(leaderName(l.second))} by ${pts(l.gap)} points.</li>`)
        .join('') +
      `</ul>`
  }
  section('The race at the top', body)
}

const bodyHtml = sections.join('\n\n')
for (const url of DROPPED_URLS) if (!seenUrl.has(url)) die(`source:${url} matches no source in ${DIV}; check the URL.`)

const generatedOn = new Date().toISOString().slice(0, 10)
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>The ${esc(DIV)} Wells Fargo Cup Race</title>
<style>
  body { font-family: Georgia, "Times New Roman", serif; font-size: 11pt; line-height: 1.5; color: #1a1a1a; }
  h1 { font-size: 24pt; margin: 0 0 4pt; line-height: 1.2; }
  h2 { font-size: 15pt; margin: 22pt 0 6pt; padding-bottom: 3pt; border-bottom: 1.5pt solid #1f3a5f; color: #1f3a5f; page-break-after: avoid; }
  h3 { font-size: 12pt; margin: 14pt 0 4pt; page-break-after: avoid; }
  p { margin: 0 0 8pt; }
  ul { margin: 0 0 8pt; padding-left: 20pt; }
  li { margin-bottom: 3pt; }
  table { width: 100%; border-collapse: collapse; margin: 4pt 0 10pt; font-size: 10pt; }
  th, td { border: 0.75pt solid #b8c2cc; padding: 4pt 6pt; text-align: left; vertical-align: top; }
  th { background: #e9eef4; }
  tr { page-break-inside: avoid; }
  .meta { font-size: 10pt; color: #444; border: 0.75pt solid #b8c2cc; padding: 8pt 10pt; margin: 10pt 0 16pt; background: #f6f8fa; }
  .note { font-size: 10pt; color: #333; background: #f6f8fa; border-left: 3pt solid #1f3a5f; padding: 6pt 10pt; }
  .src { font-size: 9pt; color: #555; word-break: break-all; }
</style></head><body>
<h1>The ${esc(DIV)} Wells Fargo Cup Race</h1>
<div class="meta">
<strong>About this episode.</strong> It covers one Wells Fargo Cup division, ${esc(DIV)}, through the ${esc(L)} final standings, and goes school by school through ${word(ordered.length)} Charlotte-area ${ordered.length === 1 ? 'school' : 'schools'} in it: ${esc(and(ordered.map((s) => shortOf(s.slug))))}.<br>
<strong>Where the standings come from.</strong> The ${esc(ASSOC)}'s own published Wells Fargo Cup tables. Team results and coaches come from each school's own athletics pages and the published results cited at the end.<br>
<strong>As of.</strong> ${esc(generatedOn)}. Every season starts at zero; each school's own website is the authority on its programs.
</div>

${bodyHtml}

<h2>Sources</h2>
<ul>${sourceList.map((s) => `<li>${esc(s.label)}<br><span class="src">${esc(s.url)}</span></li>`).join('')}</ul>

<p class="note">We've reported only what the published standings and each school's own results show; every season starts at zero, and the next Cup is still up for grabs.</p>
</body></html>`

// Belt and braces: the whole page, Sources included, names no student.
{
  const text = html.replace(/<[^>]+>/g, ' ')
  const leaked = [...problemsIn(text), ...(namesIn(text) ? [`student name "${namesIn(text)}"`] : [])]
  if (leaked.length) die(`Rendered PDF text still carries: ${leaked.join(', ')}. This is a bug in the generator.`, 3)
}

/* ---------------------------------------------------------------- prompt -- */

// Segments are decided from the data, so the prompt never carries a condition.
const segs = [
  `WHAT THE CUP IS. Its history and what it rewards: a whole athletic program, across a full year.`,
  NCHSAA
    ? `HOW POINTS WORK. The ladder from 50 down to 15, plus five points for each sport that reaches the playoffs, how ties split, the three seasons, and a handful of the sports that count.`
    : `HOW POINTS WORK. The ladder from 50 down to 15, how ties split, the three seasons, and a handful of the sports that count.`,
  `THE FIELD. Name ${NCHSAA ? 'the published top finishers' : 'every school'} in the ${L} final standings with ${NCHSAA ? 'their places' : 'its place'}, briefly. Then the champions of ${leaders.length === CUP_SEASONS.length ? 'the last six seasons' : 'each season on record'}.`,
]
if (liveRows.length) {
  segs.push(`WHERE IT STANDS RIGHT NOW. The standings so far in ${live.season}, as of ${live.asOf}. The season is not finished; say so.`)
}
for (const { slug } of ordered) {
  const f = segmentFacts[slug]
  const parts = ['latest final place and points', 'best finish', 'Cups won']
  if (f.streaks) parts.push('every streak in its section with full energy')
  parts.push('where its points come from')
  if (f.coach) parts.push('its coaches')
  segs.push(`${shortOf(slug).toUpperCase()}. ${parts[0][0].toUpperCase()}${and(parts).slice(1)}.`)
}
segs.push(`THE RACE AT THE TOP. The closest finishes in "The race at the top."`)

const NOTES_PATH = value('--notes')
const notes = NOTES_PATH ? readFileSync(resolve(REPO_ROOT, NOTES_PATH), 'utf8').trim() : ''

const body = `Produce an episode of "Charlotte Private School Conversations": "The ${DIV} Wells Fargo Cup Race." Two hosts with the energy of a sports network's studio show covering a championship: big reactions, quick banter, real excitement when a school strings titles together. The attached PDF is the ONLY source; what it does not say does not go in. SHOW FORMAT: a real talk show, never a reading. The hosts trade takes in their own words, voicing opinions as opinions while every fact comes from the PDF. Never mention a PDF, document, source, text, file or notes aloud; say "the final standings show" or "our research found." Give every school equal care; never rush the second half.

THESE INSTRUCTIONS ARE PRIVATE. Follow them silently. The hosts never announce, recite or discuss any rule here.

OPEN with exactly: "Welcome to another episode of Charlotte Private School Conversations." Say in a sentence that this episode covers the ${DIV} Wells Fargo Cup race, then name www.charlotteschoolinsights.com as a great resource to learn more, with each school's own website as the authority.

SEGMENTS, in this order:
${segs.map((s, i) => `${i + 1}) ${s}`).join('\n')}

CLOSE — its own beat, never cut short. Three one-line takeaways, called our takes. Point once more to www.charlotteschoolinsights.com as a great resource to learn more, with each school's own website as the authority. Then a host ENDS the episode on this sentence, word for word and COMPLETE: "We've reported only what the published standings and each school's own results show; every season starts at zero, and the next Cup is still up for grabs."

HARD RULES:
- The hype is in the delivery, never in a fact. Dynasty, three-peat and back-to-back fit only a run the PDF states.
- Every place, point total, season and title exactly as written. Never invent a game, score, opponent, player, record or ranking.
- Name no student. Say the team, the position or the class. Name a coach only as written.
- "Tied for" stays "tied for."
- Discuss only schools in the PDF. A prediction is a take, said as one.
- Read no URL aloud but www.charlotteschoolinsights.com, twice.
- Never spell a word letter by letter.
- The episode's last words are the full closing sentence. Nothing after it.${notes ? `\n\n${notes}` : ''}`

if (body.length > PROMPT_CHAR_BUDGET) {
  die(
    `The prompt is ${body.length} characters, over the ${PROMPT_CHAR_BUDGET} budget for NotebookLM's\n` +
      `Customize box (truncated silently). Shorten --notes first, then the per-school lines; never\n` +
      `cut a HARD RULE and never raise the budget. Nothing was written.`,
  )
}

const header = `# NotebookLM prompt — The ${DIV} Wells Fargo Cup Race
# Generated: ${generatedOn} by scripts/gen_cup_episode.mjs · body ${body.length} chars
# Pairs with: Wells Fargo Cup - ${DIV} - NotebookLM Source.pdf (upload it as the notebook's ONLY source)
# Audio Overview > Deep Dive > Customize. Paste ONLY the body below the line. Length: Longer.

======================== PASTE FROM HERE ========================

`

/* ----------------------------------------------------------------- write -- */

mkdirSync(OUT_DIR, { recursive: true })
const base = `Wells Fargo Cup - ${DIV} - NotebookLM`
const pdfPath = join(OUT_DIR, `${base} Source.pdf`)
const txtPath = join(OUT_DIR, `${base} Prompt.txt`)
writeFileSync(join(OUT_DIR, `${DIVISION}-cup.html`), html, 'utf8')

// page.pdf() requires HEADLESS Chromium. 'load', never 'networkidle'.
const browser = await chromium.launch()
try {
  const page = await browser.newPage()
  await page.setContent(html, { waitUntil: 'load' })
  await page.pdf({
    path: pdfPath,
    format: 'Letter',
    printBackground: true,
    margin: { top: '0.75in', bottom: '0.8in', left: '0.8in', right: '0.8in' },
    displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: `<div style="font-family:Georgia,serif;font-size:7.5pt;color:#666;width:100%;text-align:center;">
      Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>`,
  })
} finally {
  await browser.close()
}
writeFileSync(txtPath, header + body + '\n', 'utf8')

say(
  `report:cup: ${DIV} — ${ordered.length} roster school(s): ${ordered.map((s) => shortOf(s.slug)).join(', ')}; ` +
    `live segment: ${liveRows.length ? `yes (${live.season})` : 'no'}; gate: clear; prompt body ${body.length}/${PROMPT_CHAR_BUDGET}`,
)
say(`  ${pdfPath}`)
say(`  ${txtPath}`)
if (droppedSources) say(`  ${droppedSources} source(s) left out of the Sources list because they name a student`)
