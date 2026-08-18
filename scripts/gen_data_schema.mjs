#!/usr/bin/env node
/**
 * Generate `.claude/docs/DATA-SCHEMA.md` — the standing catalog of every level and
 * category of school data the app presents.
 *
 * WHY THIS IS GENERATED, NOT WRITTEN
 *
 * A hand-written schema doc is stale the first time someone adds a metric, and
 * nothing tells you it went stale — the doc keeps reading as authoritative while
 * describing an app that no longer exists. So this reads the same modules the app
 * imports at runtime and derives the doc from them. Every number, key, and label
 * below is observed from live code; none is transcribed.
 *
 * The five layers it reads, in the order the doc presents them:
 *
 *   1. Manifest      src/data/schools.json — schools x topics x documents
 *   2. Prose metrics src/lib/metrics.ts    — the subtopic -> card key rules
 *   3. Structured    src/data/<topic>Program.ts — the typed cards per topic
 *   4. Compare       src/data/metricValues.ts   — the quantitative rows
 *   5. Standalone    course offerings, financial-aid reports, catalogs, podcast
 *
 * WHAT IT CANNOT SEE
 *
 * TypeScript field shapes are read as text (a regex over `export type` blocks),
 * not through the compiler. That is deliberate — it keeps this script dependency
 * -free and fast — but it means a type expressed unusually may render oddly. The
 * field lists are documentation, not a validator; `tsc -b` remains the authority
 * on shape.
 *
 * Usage:
 *   node scripts/gen_data_schema.mjs           # write the doc
 *   node scripts/gen_data_schema.mjs --check   # exit 1 if the doc is out of date
 *
 * Exit codes: 0 = written / up to date, 1 = drift (--check only), 2 = setup error.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const CHECK = process.argv.includes('--check')
const url = (p) => new URL(p, import.meta.url)
const path = (p) => fileURLToPath(url(p))
const read = (p) => readFileSync(url(p), 'utf8')

const OUT = '../.claude/docs/DATA-SCHEMA.md'

/* ------------------------------------------------------------------ helpers -- */

/**
 * Pull the field names out of an `export type Name = { … }` block.
 *
 * Brace-counted rather than regex-terminated so nested object literals inside a
 * field (`aside?: { title: string }`) do not end the block early. Only
 * depth-1 fields are collected — those are the ones worth documenting.
 */
function typeFields(src, name) {
  const decl = `export type ${name} =`
  const start = src.indexOf(decl)
  if (start === -1) return null
  const open = src.indexOf('{', start)
  if (open === -1) return null
  // A union or alias (`export type Level = 'V' | 'JV'`) has no object body of its
  // own, so the next `{` belongs to a LATER declaration and would report that
  // type's fields under this name. Anything but whitespace between the `=` and
  // the brace means this is not an object type.
  const between = src.slice(start + decl.length, open)
  if (between.trim() !== '') return null
  let depth = 0
  let end = open
  for (let i = open; i < src.length; i++) {
    if (src[i] === '{') depth++
    else if (src[i] === '}') {
      depth--
      if (depth === 0) {
        end = i
        break
      }
    }
  }
  const body = src.slice(open + 1, end)
  const fields = []
  let d = 0
  for (const raw of body.split('\n')) {
    const line = raw.trim()
    // Track nesting so we only read the top level of the type.
    const before = d
    d += (line.match(/\{/g) ?? []).length - (line.match(/\}/g) ?? []).length
    if (before !== 0) continue
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)(\??):\s*(.+?),?$/)
    if (m) fields.push({ name: m[1], optional: m[2] === '?', type: m[3].replace(/,$/, '') })
  }
  return fields
}

/**
 * Read a string-literal union (`export type CommitLevel = 'P4' | 'D1' | …`).
 *
 * These are schema worth documenting — they are the closed vocabularies (flag
 * kinds, division levels, confidence states) a value is allowed to take.
 * Returns null for anything that is not a pure union of quoted literals.
 */
function unionValues(src, name) {
  const decl = `export type ${name} =`
  const start = src.indexOf(decl)
  if (start === -1) return null
  // Union members may wrap across lines; stop at the first line that starts a
  // new top-level declaration.
  const rest = src.slice(start + decl.length)
  const end = rest.search(/\n(?:export |const |function |\/\*)/)
  const body = (end === -1 ? rest : rest.slice(0, end)).trim()
  if (!body || body.includes('{')) return null
  const parts = body.split('|').map((p) => p.trim()).filter(Boolean)
  if (parts.length < 2) return null
  const vals = []
  for (const p of parts) {
    const m = p.match(/^(['"`])((?:\\.|(?!\1).)*)\1$/)
    if (!m) return null // not a pure literal union
    vals.push(m[2])
  }
  return vals
}

/** All `export type X =` names declared in a source file, in source order. */
function exportedTypes(src) {
  return [...src.matchAll(/^export type ([A-Za-z0-9_]+)\s*=/gm)].map((m) => m[1])
}

/**
 * Read a `export const NAME = [ … ] as const` card registry out of source text.
 *
 * These modules CANNOT be imported here: each one calls `import.meta.glob` at
 * module scope to load its locale overlays, which is a Vite compile-time
 * transform and throws under plain Node. The modules deliberately do not guard
 * it (a runtime guard survives into the bundle and silently kills every
 * overlay — see the comments in artsProgram.ts), so the guard has to live on
 * this side instead.
 *
 * The registries are flat literals of string fields, so a scoped parse is exact
 * for the shape they actually have. If a registry ever gains a computed value,
 * this returns nothing for it and the doc loses that topic's card table — loud
 * enough to notice, since the section renders empty.
 */
function parseCardRegistry(src, name) {
  const start = src.indexOf(`export const ${name} = [`)
  if (start === -1) return null
  const open = src.indexOf('[', start)
  let depth = 0
  let end = open
  for (let i = open; i < src.length; i++) {
    if (src[i] === '[') depth++
    else if (src[i] === ']') {
      depth--
      if (depth === 0) {
        end = i
        break
      }
    }
  }
  const body = src.slice(open + 1, end)
  const cards = []
  // Each card is a `{ … }` object; fields are `key: 'value'` with quoted strings.
  for (const m of body.matchAll(/\{([^{}]*)\}/g)) {
    const obj = {}
    for (const f of m[1].matchAll(/([A-Za-z_][A-Za-z0-9_]*)\s*:\s*(['"`])((?:\\.|(?!\2).)*)\2/g)) {
      obj[f[1]] = f[3].replace(/\\(['"`])/g, '$1')
    }
    if (obj.key) cards.push(obj)
  }
  return cards.length ? cards : null
}

/** Collapse a type expression to something readable in a table cell. */
function tidyType(t) {
  const s = t.replace(/\s+/g, ' ').trim()
  return s.length > 68 ? s.slice(0, 65) + '…' : s
}

const esc = (s) => String(s).replace(/\|/g, '\\|')

/* --------------------------------------------------------------- 1. manifest -- */

const manifest = JSON.parse(read('../src/data/schools.json'))
const schools = manifest.schools ?? []
const topics = manifest.topics ?? []
const documents = manifest.documents ?? []
if (!schools.length || !topics.length) {
  console.error('error: src/data/schools.json has no schools/topics — run the ingest first.')
  process.exit(2)
}

const docCount = new Map() // "topic|school" -> count
for (const c of manifest.matrix ?? []) docCount.set(`${c.topic_slug}|${c.school_slug}`, c.doc_count)

/* ------------------------------------------------------ 2. prose metric layer -- */

const { normalizeMetric, resolveMetric, orderTopicSlugs, orderMetricKeys } = await import('../src/lib/metrics.ts')

// Resolve every ingested document to its card key, exactly as the app does.
// Hidden subtopics (NotebookLM prompts, "Sources referenced") resolve to null and
// are excluded here for the same reason they are excluded on screen.
const metricsByTopic = new Map() // topic -> Map(key -> {label, schools:Set, subtopics:Set})
for (const d of documents) {
  const m = normalizeMetric(d.topic_slug, d.subtopic)
  if (!m) continue
  if (!metricsByTopic.has(d.topic_slug)) metricsByTopic.set(d.topic_slug, new Map())
  const byKey = metricsByTopic.get(d.topic_slug)
  if (!byKey.has(m.key)) byKey.set(m.key, { label: m.label, schools: new Set(), subtopics: new Set(), fellthrough: false })
  const e = byKey.get(m.key)
  e.schools.add(d.school_slug)
  e.subtopics.add(d.subtopic)
  // A key nothing in RULES matched is a card that appeared by accident — it
  // renders identically to a designed one, so the doc marks it rather than
  // presenting it as intentional. `check:metrics` reports the same thing.
  const r = resolveMetric(d.topic_slug, d.subtopic)
  if (r.status === 'fellthrough' || r.status === 'no-topic-rules') e.fellthrough = true
}

/* ----------------------------------------------- 3. structured card registries -- */

// Each entry: the module that owns a topic's typed cards, and the registry inside it.
// `cards` is read from the live module so a renamed card title updates the doc.
const STRUCTURED = [
  { topic: 'sports', file: 'sportsProgram.ts', reg: 'SPORTS_CARDS', root: 'SportsProgram', dir: 'sportsPrograms' },
  { topic: 'the-arts', file: 'artsProgram.ts', reg: 'ARTS_CARDS', root: 'ArtsProgram', dir: 'artsPrograms' },
  { topic: 'student-clubs', file: 'clubsProgram.ts', reg: 'CLUBS_CARDS', root: 'ClubsProgram', dir: 'clubsPrograms' },
  { topic: 'college-support', file: 'collegeSupport.ts', reg: 'COLLEGE_SUPPORT_CARDS', root: 'CollegeSupportProgram', dir: 'collegeSupportPrograms' },
  { topic: 'after-school', file: 'afterSchool.ts', reg: 'AFTER_SCHOOL_CARDS', root: 'AfterSchoolProgram', dir: 'afterSchoolPrograms' },
  { topic: 'summer-programs', file: 'summerPrograms.ts', reg: 'SUMMER_CARDS', root: 'SummerProgram', dir: 'summer' },
]

for (const s of STRUCTURED) {
  s.src = read(`../src/data/${s.file}`)
  s.cards = parseCardRegistry(s.src, s.reg)
  if (!s.cards) {
    console.error(`error: could not read ${s.reg} from ${s.file} — has the registry shape changed?`)
    process.exit(2)
  }
  s.types = exportedTypes(s.src)
  // Which schools actually have a file in the per-school directory.
  const dirPath = path(`../src/data/${s.dir}`)
  s.schools = existsSync(dirPath)
    ? readdirSync(dirPath).filter((f) => f.endsWith('.ts')).map((f) => f.replace(/\.ts$/, '')).sort()
    : []
}

/* --------------------------------------------------------- 4. Compare metrics -- */

const { VALUE_METRICS } = await import('../src/data/metricValues.ts')

/* ------------------------------------------------------- 5. standalone layers -- */

const STANDALONE = [
  { file: 'courseOfferings.ts', root: 'CourseOfferings', title: 'Course offerings', note: 'Per-division course catalogs, transcribed from each school’s own curriculum guide.' },
  { file: 'financialAidReports.ts', root: 'FinancialAidReport', title: 'Financial-aid deep-dive report', note: 'The structured tuition/aid card. Requires BOTH an `in-depth-report` metric key and a REPORTS entry.' },
  { file: 'clubCatalog.ts', root: 'ClubCatalog', title: 'Club catalog', note: 'The full expandable club list behind the Student Clubs cards.' },
  { file: 'clubClusters.ts', root: 'ClubClusters', title: 'Club clusters', note: 'Hand-maintained rows for the Academic & Competitive Clubs card.' },
  { file: 'podcastEpisodes.ts', root: 'PodcastEpisode', title: 'Podcast episodes', note: 'One episode per school × topic; the episode table is the single source of truth.' },
  { file: 'brands.ts', root: 'Brand', title: 'School brands', note: 'Per-school colors and marks used by the page chrome.' },
]

for (const s of STANDALONE) {
  s.src = read(`../src/data/${s.file}`)
  s.fields = typeFields(s.src, s.root)
  s.types = exportedTypes(s.src)
}

/* ------------------------------------------------------------------- render -- */

const L = []
const w = (s = '') => L.push(s)

w('<!-- GENERATED FILE — DO NOT EDIT BY HAND.')
w('     Produced by scripts/gen_data_schema.mjs from the live data modules.')
w('     Regenerate: npm run schema        Verify:  npm run check:schema -->')
w()
w('# School data schema')
w()
w('Every level and category of school data this app presents, derived from the code that')
w('defines it. This is the answer to "what do we hold on a school, and where does it live?"')
w()
w(`**${schools.length} schools × ${topics.length} research areas**, ${documents.length} ingested research documents.`)
w()
w('This file is **generated**. Adding a research area, a card, or a Compare row updates it')
w('on the next `npm run schema`; `npm run check:schema` fails the build if it has drifted,')
w('so it cannot silently fall out of date. Edit the data modules, never this file.')
w()

// ---- contents
w('## Contents')
w()
w('| Layer | What it holds | Source of truth |')
w('|---|---|---|')
w('| [1. Schools & research areas](#1-schools--research-areas) | The top-level grid | `src/data/schools.json` (generated by ingest) |')
w('| [2. Research-area sections](#2-research-area-sections-prose-layer) | Prose cards per area | `src/lib/metrics.ts` (hand-maintained rules) |')
w('| [3. Structured cards](#3-structured-cards-typed-layer) | Typed, interactive cards | `src/data/<topic>Program.ts` + per-school files |')
w('| [4. Compare rows](#4-compare-rows-quantitative-layer) | Cross-school numbers | `src/data/metricValues.ts` (hand-maintained) |')
w('| [5. Standalone layers](#5-standalone-layers) | Catalogs & reports | individual `src/data/*.ts` |')
w('| [6. Adding to the schema](#6-adding-to-the-schema) | How each layer grows | — |')
w()

// ---- 1. schools & topics
w('## 1. Schools & research areas')
w()
w('The grid every other layer hangs off. Both lists are generated by the ingest pipeline')
w('from `source-material/<topic>/<school>/`, so a new folder becomes a new row or column')
w('automatically — and automatically gains a pre-rendered SEO page.')
w()
w('### Schools')
w()
w('| Slug | Name |')
w('|---|---|')
for (const s of schools) w(`| \`${s.slug}\` | ${esc(s.name)} |`)
w()
w('### Research areas (topics)')
w()
w('Listed in the order they appear on a school page (`TOPIC_ORDER` in `src/lib/metrics.ts`);')
w('the count is ingested documents for that school × topic. A blank cell means no research')
w('exists yet and **the section does not render at all** for that school.')
w()
const orderedTopics = orderTopicSlugs(topics.map((t) => t.slug))
const topicName = new Map(topics.map((t) => [t.slug, t.name]))
w(`| Research area | Slug | ${schools.map((s) => esc(s.name.replace(/ School$/, ''))).join(' | ')} |`)
w(`|---|---|${schools.map(() => '--:').join('|')}|`)
for (const t of orderedTopics) {
  const cells = schools.map((s) => docCount.get(`${t}|${s.slug}`) ?? '—')
  w(`| ${esc(topicName.get(t) ?? t)} | \`${t}\` | ${cells.join(' | ')} |`)
}
w()

// ---- 2. prose layer
w('## 2. Research-area sections (prose layer)')
w()
w('Within a research area, each ingested document carries a **subtopic** string, which')
w('`normalizeMetric()` canonicalizes to a stable card key. This is what stops "Theater" and')
w('"Theatre" becoming two different cards. A subtopic matching no rule **silently becomes')
w('its own card** — which is a UX change, and needs approval.')
w()
w('Keys below are the ones live documents actually resolve to today, with the schools that')
w('have material for each. `redesign-research` / `in-depth-report` keys are where a whole')
w('research dossier folds in behind a structured card.')
w()
for (const t of orderedTopics) {
  const byKey = metricsByTopic.get(t)
  if (!byKey || byKey.size === 0) continue
  w(`### ${esc(topicName.get(t) ?? t)} \`${t}\``)
  w()
  w('| Card key | Label | Schools | Distinct subtopic phrasings |')
  w('|---|---|--:|--:|')
  for (const key of orderMetricKeys(t, [...byKey.keys()])) {
    const e = byKey.get(key)
    const mark = e.fellthrough ? ' ⚠️' : ''
    w(`| \`${key}\`${mark} | ${esc(e.label)} | ${e.schools.size}/${schools.length} | ${e.subtopics.size} |`)
  }
  w()
}

const fellthroughKeys = []
for (const [t, byKey] of metricsByTopic) {
  for (const [key, e] of byKey) if (e.fellthrough) fellthroughKeys.push({ topic: t, key, e })
}
if (fellthroughKeys.length) {
  w('> ⚠️ **Unmatched subtopics.** These keys were not produced by a `RULES` entry — they')
  w('> were slugified from a raw subtopic that matched no rule, so each is effectively an')
  w('> **unapproved card**. Either fold the phrasing onto an existing key in')
  w('> `src/lib/metrics.ts`, or get the new card approved. `npm run check:metrics` reports')
  w('> the same finding.')
  w('>')
  for (const f of fellthroughKeys) {
    w(`> - \`${f.topic}\` :: \`${f.key}\` — ${[...f.e.subtopics].map((s) => `"${esc(s)}"`).join(', ')}` +
      ` (${f.e.schools.size}/${schools.length} schools)`)
  }
  w()
}

// ---- 3. structured layer
w('## 3. Structured cards (typed layer)')
w()
w('Six research areas render as **typed, interactive cards** rather than ingested prose.')
w('For these, the prose above folds onto one dossier key and the card registry below is what')
w('a parent actually sees. Each card is one optional field on the topic\'s root type: a school')
w('missing that field simply does not render the card.')
w()
w('Per-school data lives one file per school so each school\'s research stays reviewable on')
w('its own, and is merged with locale overlays at render time.')
w()
for (const s of STRUCTURED) {
  w(`### ${esc(topicName.get(s.topic) ?? s.topic)} \`${s.topic}\``)
  w()
  w(`Root type \`${s.root}\` · registry \`${s.reg}\` · \`src/data/${s.file}\` · per-school \`src/data/${s.dir}/<slug>.ts\``)
  w()
  w('| Card key | Title | Parent question / kicker |')
  w('|---|---|---|')
  for (const c of s.cards) w(`| \`${c.key}\` | ${esc(c.title)} | ${esc(c.kicker ?? '—')} |`)
  w()
  if (s.topic === 'college-support') {
    // Standing rule set 2026-08-16, after Covenant Day first shipped its
    // acceptance list without rank labels: the rule lives here because this
    // doc is what /add-school and a new-school build read first.
    w('**The `outcomes.colleges` list is the school\'s FULL published acceptance list.** Each')
    w('entry carries only `{ name, cats }` (plus `enrolling: true` for bold/matriculated')
    w('names) — it does NOT store a rank label. The US News rank shown on the card resolves')
    w('at render time from the single-source master `COLLEGE_RANKINGS` table')
    w('(`src/data/collegeRankings.ts`) via `rankLabelFor(name)`, so a rank lives in exactly')
    w('one place and every school reflects a change at once. **Any** college holding a US News')
    w('National or National-Liberal-Arts rank shows its label, at any rank or band, not just')
    w('the top-75 buckets. A newly-fetched college is added as ONE row to the master (and its')
    w('source to the human-readable companion `source-material/college-support/US News 2026 -')
    w('Rank Labels.md`), then reused everywhere. The list\'s bucket tallies must equal the')
    w('school\'s six Compare bucket cells. `npm run check:ranks`')
    w('(`scripts/check_rank_labels.mjs`, chained into `npm run build`) verifies every')
    w('ranked-bucket college resolves in the master and that the master agrees with the doc.')
    w()
    w('**`wholeClass` score tables carry a percentile header only when the rows genuinely')
    w('hold percentiles.** A school that publishes averages or tier counts instead of')
    w('distributions sets `noPercentiles: true` on that `ScoreTable` — otherwise the')
    w('10th–90th/mean header files a class average under a percentile it is not, reading as')
    w('a wrong low score. Card rule set 2026-08-16; the six-value percentile shape keeps the')
    w('header, everything else suppresses it.')
    w()
  }
  if (s.topic === 'student-clubs') {
    // Standing rule set 2026-08-18, after the Gaston Day review found the whole
    // general club roster on the affinity card AND the two roster cards missing
    // entirely. The rule lives here because this doc is what /add-school and a
    // new-school build read first.
    w('**`affinity` is for IDENTITY groups only — not the general club roster.** It holds')
    w('identity-based groups (Black Student Union, gender/sexuality alliance, multiracial,')
    w('Jewish/Asian/Latine affinity, interfaith) and the DEI structure around them. Chess,')
    w('Yearbook, Science Olympiad, robotics and language/cultural-interest clubs belong on')
    w('the **Club Catalog & Overview** card (`src/data/clubCatalog.ts`) and the **Academic &')
    w('Competitive Clubs** card (`src/data/clubClusters.ts`). A school with no named identity')
    w('groups never gets a roster of interest clubs standing in for them: it either ships')
    w('`groups: []` with a gap flag (Cannon, which at least publishes a sentence confirming')
    w('affinity groups exist) or **omits the card entirely** (Gaston Day — user call,')
    w('2026-08-18). Prefer omission where the school publishes nothing at all and the card')
    w('would be only gap flags: that is the no-empty-cards rule, and a section of absences')
    w('reads worse than no section.')
    w()
    w('**Those two roster cards are PROSE-metric cards, so they render only when the ingest')
    w('produces their metric key.** `clubCatalog.ts` attaches to the `catalog` key and')
    w('`clubClusters.ts` to `academic-clubs`; a correctly-written entry in either module')
    w('renders NOTHING if no subtopic resolved to its key. Name the source-material files')
    w('to the roster convention (`… - Student Clubs - Club Catalog and Overview.md`,')
    w('`… - Academic and Competitive Clubs.md`) rather than relying on one combined file —')
    w('a single file whose name matches an earlier `RULES` pattern (e.g. `/honor societ/i`)')
    w('silently claims the whole topic and leaves the area rendering "No readable notes for')
    w('this area yet". `check:metrics` cannot catch this: every subtopic DID match a rule.')
    w()
  }
  const missing = schools.map((x) => x.slug).filter((x) => !s.schools.includes(x))
  w(`**Schools with data:** ${s.schools.length}/${schools.length}` +
    (missing.length ? ` — absent: ${missing.map((m) => `\`${m}\``).join(', ')}` : ''))
  w()
  w(`<details><summary>Types defined in <code>${s.file}</code> (${s.types.length})</summary>`)
  w()
  for (const tn of s.types) {
    const vals = unionValues(s.src, tn)
    if (vals) {
      w(`\`${tn}\` *(union)* — ${vals.map((v) => `\`${esc(v)}\``).join(' \\| ')}`)
      w()
      continue
    }
    const fields = typeFields(s.src, tn)
    if (!fields || !fields.length) continue
    w(`\`${tn}\` — ${fields.map((f) => `\`${f.name}${f.optional ? '?' : ''}\``).join(', ')}`)
    w()
  }
  w('</details>')
  w()
}

// ---- 4. compare
w('## 4. Compare rows (quantitative layer)')
w()
w('`VALUE_METRICS` powers both the Compare table and the stat tiles on a school page. It is')
w('**hand-maintained** — the ingest never writes it, so a newly ingested school renders N/A')
w('here until someone backfills it. `null` is a deliberate "not located"; a missing key is an')
w('oversight. `npm run check:metrics` tells the two apart.')
w()
w('Legend: **↓** lower value is the leader · **–** no leader tint (e.g. cost rows, where the')
w('highest number is not the best) · **Q** carries per-cell provenance tooltips.')
w()
const vmByTopic = new Map()
for (const vm of VALUE_METRICS) {
  if (!vmByTopic.has(vm.topic)) vmByTopic.set(vm.topic, [])
  vmByTopic.get(vm.topic).push(vm)
}
for (const t of orderTopicSlugs([...vmByTopic.keys()])) {
  w(`### ${esc(topicName.get(t) ?? t)} \`${t}\``)
  w()
  w('| Row key | Label | Coverage | Flags |')
  w('|---|---|--:|---|')
  for (const vm of vmByTopic.get(t)) {
    const have = schools.filter((s) => vm.values?.[s.slug] != null).length
    const flags = [
      vm.lowerIsBetter ? '↓' : '',
      vm.noLead ? '–' : '',
      vm.quals ? 'Q' : '',
      vm.subs ? 'sub' : '',
    ].filter(Boolean).join(' ')
    w(`| \`${vm.key}\` | ${esc(vm.label)} | ${have}/${schools.length} | ${flags || ''} |`)
  }
  w()
}
w(`**Total:** ${VALUE_METRICS.length} Compare rows across ${vmByTopic.size} research areas.`)
w()
w('<details><summary>ValueMetric shape</summary>')
w()
const vmSrc = read('../src/data/metricValues.ts')
for (const tn of ['ValueMetric', 'CellQual']) {
  const fields = typeFields(vmSrc, tn)
  if (!fields) continue
  w(`**\`${tn}\`**`)
  w()
  w('| Field | Type | Required |')
  w('|---|---|---|')
  for (const f of fields) w(`| \`${f.name}\` | \`${esc(tidyType(f.type))}\` | ${f.optional ? '' : 'yes'} |`)
  w()
}
w('</details>')
w()

// ---- 5. standalone
w('## 5. Standalone layers')
w()
w('Data that does not fit the topic-card pattern — catalogs, reports, and page chrome.')
w()
for (const s of STANDALONE) {
  if (!s.fields) continue
  w(`### ${esc(s.title)}`)
  w()
  w(`\`src/data/${s.file}\` · root type \`${s.root}\``)
  w()
  w(s.note)
  w()
  w('| Field | Type | Required |')
  w('|---|---|---|')
  for (const f of s.fields) w(`| \`${f.name}\` | \`${esc(tidyType(f.type))}\` | ${f.optional ? '' : 'yes'} |`)
  w()
  if (s.file === 'courseOfferings.ts') {
    // Standing rule set 2026-08-17, after Covenant Day shipped High-School-only
    // for months because a plain page fetch of its JK-8 academics pages returned
    // tile titles and zero course text. The rule lives here because this doc is
    // what /add-school and a new-school build read first.
    w('**A division absent because research could not RETRIEVE it is not the same as a')
    w('division the school does not PUBLISH — and the two are indistinguishable from a plain')
    w('page fetch.** Modern school sites (Finalsite especially) render curriculum as click-to-')
    w('open tiles whose bodies are fetched separately and are **not in the page HTML**, so')
    w('`curl` of an academics page returns tile *titles* and no course text at all. Covenant')
    w('Day shipped a High-School-only card for exactly this reason, with a code comment')
    w('asserting the absence was by design. Before writing `notPublished` — or omitting a')
    w('division — fetch the tile bodies (for Finalsite:')
    w('`/fs/elements/<element_id>?is_popup=true&post_id=<post_id>&show_post=true`) and record')
    w('the element/post ids in `source-material/` so the data is refreshable. A confirmed')
    w('absence must come from a retrieval that could have succeeded.')
    w()
    w('**Division ORDER is load-bearing and append-only for an existing school.** Locale')
    w('overlays key on index paths (`<slug>:divisions[0].departments[2].courses[5].title`) and')
    w('`SchoolDetail` renders `divisions` in array order with no sort, so inserting a division')
    w('at the front shifts every existing path and silently orphans that school\'s overlay')
    w('entries in every locale — the runtime falls back to English with no error and no')
    w('coverage change. Append new divisions at the END (Covenant Day and Carmel Christian')
    w('both ship High → Middle → Lower for this reason). Order only matters within a school;')
    w('a brand-new school is free to use grade order.')
    w()
  }
  const others = s.types.filter((t) => t !== s.root)
  if (others.length) {
    w(`Supporting types: ${others.map((t) => `\`${t}\``).join(', ')}`)
    w()
  }
  for (const tn of s.types) {
    const vals = unionValues(s.src, tn)
    if (vals) w(`Allowed \`${tn}\` values: ${vals.map((v) => `\`${esc(v)}\``).join(', ')}`)
  }
  if (s.types.some((t) => unionValues(s.src, t))) w()
}

// ---- 6. how to extend
w('## 6. Adding to the schema')
w()
w('What to touch when the data grows. The UX-approval gate in `CLAUDE.md` applies to')
w('everything in the second column that adds a card, section, row, or research area.')
w()
w('| You are adding | Touch | Approval needed |')
w('|---|---|---|')
w('| A **school** | drop files in `source-material/<topic>/<school>/`, re-ingest | no — automatic everywhere |')
w('| **Documents** for an existing school × area | `source-material/…`, re-ingest | no |')
w('| A **subtopic phrasing** onto an existing card | a `RULES` entry in `src/lib/metrics.ts` | no — this is the preferred fix |')
w('| A **new prose card** | a new `RULES` key + `SECTION_ORDER` | **yes** — it is a new card |')
w('| A **new research area** | `RULES[topic]`, `TOPIC_ORDER`, `LOCALES`/routes | **yes** — new section on every page |')
w('| A **Compare row** | `VALUE_METRICS` in `src/data/metricValues.ts` | **yes** — new row |')
w('| A **structured card** | the topic\'s root type + `*_CARDS` registry | **yes** — new card |')
w('| A **school\'s structured data** | `src/data/<dir>/<slug>.ts` | no — backfilling an existing card |')
w('| A school\'s **acceptance list** (College Support) | `outcomes.colleges` (name + cats only); ranks resolve from the master `src/data/collegeRankings.ts` | no — but every ranked college needs a row in the master (see §3, `npm run check:ranks`) |')
w()
w('After any of these, run `npm run schema` to refresh this doc (and `npm run check:metrics`,')
w('which catches unmatched subtopics and Compare gaps; `npm run check:ranks` guards the')
w('acceptance-list rank labels and is chained into the build).')
w()
w('### Keeping this doc honest')
w()
w('- `npm run schema` — regenerate.')
w('- `npm run check:schema` — fail if it drifted. Chained into `npm run build`.')
w('- The generator reads live modules, so it cannot describe a card that no longer exists.')
w()

const body = L.join('\n')

/* -------------------------------------------------------------------- write -- */

const existing = existsSync(path(OUT)) ? read(OUT) : null

if (CHECK) {
  if (existing === body) {
    console.log('check:schema — .claude/docs/DATA-SCHEMA.md is up to date.')
    process.exit(0)
  }
  console.error('check:schema — .claude/docs/DATA-SCHEMA.md is OUT OF DATE.\n')
  console.error(existing === null
    ? '  The file is missing.'
    : '  The data layers have changed since it was last generated.')
  console.error('\n  Fix: npm run schema\n')
  process.exit(1)
}

writeFileSync(path(OUT), body)
console.log(`wrote .claude/docs/DATA-SCHEMA.md — ${schools.length} schools, ${topics.length} research areas, ` +
  `${STRUCTURED.reduce((n, s) => n + s.cards.length, 0)} structured cards, ${VALUE_METRICS.length} Compare rows.`)
