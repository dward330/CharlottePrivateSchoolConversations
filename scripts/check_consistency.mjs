#!/usr/bin/env node
/**
 * check:consistency — a school page must not contradict itself.
 *
 * THE SHAPE OF THE DEFECT. Almost every count on a school page is typed by
 * hand: stat tiles, teasers ("122 courses across 13 departments"), camp intros
 * ("60 of the 251 …"), season headers ("9 varsity") and every Compare cell.
 * Only the list beneath each one is real data. The typed figure was right when
 * it was written and the list grew, so the two drift apart silently. A planning
 * sweep on 2026-11-20 (plan `consistency`) found 101 such findings across the
 * 13 school pages, and no existing check compared a headline with its list.
 *
 * RULES (R1–R7 and R9–R11 gate the build; R8 is a report):
 *   R1  College Pipeline funnel: a typed stage count, and every number in the
 *       headline directly before "commit…", "Division I" or "Power 4/Four"
 *       (at most two words between), equals the count derived from the 2024–26
 *       roster. The subhead is a per-sport breakdown and is not read
 *       (src/lib/pipeline.ts). Class of 2027 rows are excluded.
 *   R1b Compare: p4-commits-2426, d1-commits-2426 and seniors-committed equal
 *       the derived counts (leading integer, as check:cup reads its rows).
 *   R2  "D1 commits by sport" bars: every D1 row lands in exactly one bar, and
 *       no bar names a sport the roster never uses. (Typed bar counts, the old
 *       shape, must sum to the D1 count.)
 *   R3  Camp catalog: a sampled catalog's "N of the M … are listed" equals the
 *       listed rows (or the distinct camp names, when it says "titles"); on a
 *       complete slate, every "N camps" in the intro or headline equals the
 *       rows or the distinct names.
 *   R4  Course Offerings, Upper/High School: the teaser's leading count equals
 *       the Compare `us-courses` cell; where it differs from the rendered row
 *       count, the teaser says "shown here as N entries" with N = rows.
 *   R4b The teaser's AP count equals the Compare `advanced-courses` cell, unless
 *       that cell's qual names the teaser's number too (an attributed split).
 *   R5  Ratio notation is "~N:1"; a stat value or Compare cell reading "1:N",
 *       or prose saying "roughly 1:N", fails.
 *   R6  A Where Graduates Go bucket "n / total" whose note says "absent …" names
 *       exactly total − n institutions. An Ivy Plus note may leave the Ivy
 *       absences to the Ivy row; a note qualified "at the very top" is partial
 *       by its own words and skipped.
 *   R7  Sports Offered: every "N varsity" season header counts on ONE basis per
 *       school — rows, or boys' and girls' teams separately (a "B & G" row
 *       counts 2) — and any "N varsity" figure elsewhere on the card equals the
 *       sum of the headers.
 *   R8  REPORT ONLY. Per school, every "<number> <noun>" pair across all of its
 *       data (AP courses, seniors, counselors, camps, clubs, teams …) grouped by
 *       noun; a group holding more than one number is printed. Strings carrying
 *       a 4-digit year or "Class of" are skipped. Exit 0 always — a noun
 *       collision is a question, often a legitimate difference of basis, and a
 *       checker parked at a permanent non-zero count stops being read. The noun
 *       is letters, spaces and hyphens only: with `\w` it swallowed digits, so
 *       "9 varsity sports across roughly 28 teams" hid "28 teams" (fixed in plan
 *       `consistency2`).
 *   R9  Sports Offered: an "N sports" figure in the headline, or on a tile whose
 *       caption is the sport count, equals the distinct sports the seasons list
 *       ("Basketball (Girls)" and "Basketball (Boys)" are one sport). It also
 *       passes when N equals the row count (one row per boys' or girls' program,
 *       the Covenant Day and Gaston Day basis), when the footnote states the
 *       list's own count (an attributed split, like R4b's qual escape), or when
 *       one footnote sentence names N and says what it counts "separately". A
 *       range ("12–14 sports") is already marked approximate and is skipped.
 *   R10 Camp catalog: a row whose desc says "offered in N (of the M) weeks" (N in
 *       digits or words; "both" is 2) lists N entries in its `weeks` — dated
 *       sessions separated by ';', or "Weeks 1, 2, 5" / "Weeks 1-6".
 *   R11 Financial Aid Beyond Tuition grid: the title's leading count and any
 *       "N confirmed" in the note equal the components listed; every "N
 *       unpriced" equals the `unpriced` rows, or `unpriced` + `range` rows
 *       (Latin counts a year-behind figure as unpriced); "N priced" likewise;
 *       and every "N% unpriced" is that count over the total, rounded, on the
 *       basis the stated count used.
 *
 * Usage:
 *   node scripts/check_consistency.mjs            gate R1–R7, R9–R11; exit 1 on any finding
 *   node scripts/check_consistency.mjs --report   print R1–R11, always exit 0
 *
 * Imports the per-school data files under plain Node (24+ type stripping),
 * never the *Program.ts registries (their import.meta.glob throws in Node).
 * Exit codes: 0 = clean, 1 = findings, 2 = setup error.
 */

import { readdirSync } from 'node:fs'

const REPORT = process.argv.includes('--report')
const ROOT = new URL('../src/data/', import.meta.url)
const LOCALE_RE = /\.(es|bn|ht|te|fr|fa|it|hi|ar)\.ts$/

const findings = [] // { rule, school, msg }
const add = (rule, school, msg) => findings.push({ rule, school, msg })

let pipelineCounts, VALUE_METRICS, courseOfferings, financialAidReport, clubCatalog, clubClusters
try {
  ;({ pipelineCounts } = await import('../src/lib/pipeline.ts'))
  ;({ VALUE_METRICS } = await import('../src/data/metricValues.ts'))
  ;({ courseOfferings } = await import('../src/data/courseOfferings.ts'))
  ;({ financialAidReport } = await import('../src/data/financialAidReports.ts'))
  ;({ clubCatalog } = await import('../src/data/clubCatalog.ts'))
  ;({ clubClusters } = await import('../src/data/clubClusters.ts'))
} catch (e) {
  console.error(`check:consistency: setup error — ${e.message}`)
  process.exit(2)
}

/** Every per-school module in a data directory: slug → first exported object. */
async function loadDir(dir) {
  const out = {}
  const url = new URL(`${dir}/`, ROOT)
  for (const f of readdirSync(url).filter((f) => f.endsWith('.ts') && !LOCALE_RE.test(f))) {
    const mod = await import(new URL(f, url))
    const obj = Object.values(mod).find((v) => v && typeof v === 'object' && !Array.isArray(v))
    if (obj) out[f.replace(/\.ts$/, '')] = obj
  }
  return out
}

const DIRS = [
  'sportsPrograms',
  'summer',
  'collegeSupportPrograms',
  'artsPrograms',
  'clubsPrograms',
  'afterSchoolPrograms',
  'admissionsPrograms',
  'internationalTravel',
  'learningSupport',
  'highSchoolPlacementPrograms',
]
const data = {}
try {
  for (const d of DIRS) data[d] = await loadDir(d)
} catch (e) {
  console.error(`check:consistency: setup error loading data — ${e.message}`)
  process.exit(2)
}

const metric = (key) => VALUE_METRICS.find((m) => m.key === key)
const cell = (key, slug) => metric(key)?.values?.[slug] ?? null
const qualText = (key, slug) => metric(key)?.quals?.[slug]?.text ?? ''
const leadInt = (s) => {
  const m = String(s ?? '').match(/\d[\d,]*/)
  return m ? Number(m[0].replace(/,/g, '')) : null
}

/* ---------------------------------------------------------- number words -- */

const UNITS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
const TENS = { twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90 }
function wordNumber(w) {
  const s = w.toLowerCase().replace(/[‐–]/g, '-')
  if (/^\d[\d,]*$/.test(s)) return Number(s.replace(/,/g, ''))
  if (s === 'hundred' || s === 'a hundred' || s === 'one hundred') return 100
  const u = UNITS.indexOf(s)
  if (u >= 0) return u
  const [t, o] = s.split('-')
  if (t in TENS) return TENS[t] + (o ? UNITS.indexOf(o) : 0)
  return null
}
const NUM_RE = String.raw`(\d[\d,]*|(?:twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)(?:-(?:one|two|three|four|five|six|seven|eight|nine))?|zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|hundred)`

/* ------------------------------------------------------------ R1 / R1b / R2 */

const STAGE_OF = (label) =>
  /committed|documented commits/i.test(label) ? 'all'
    : /division i\b/i.test(label) ? 'd1'
      : /power (4|four)/i.test(label) ? 'p4'
        : null

for (const [slug, prog] of Object.entries(data.sportsPrograms)) {
  const p = prog.pipeline
  if (!p) continue
  const legacyBars = p.sportBars.some((b) => typeof b.count === 'number')
  // Derive totals from the roster alone, so the rule also runs on the old bar shape.
  const counts = legacyBars
    ? pipelineCounts({ ...p, sportBars: [] })
    : pipelineCounts(p)

  // R1 — funnel stages.
  for (const st of p.funnel) {
    const kind = st.derive ?? STAGE_OF(st.label)
    if (!kind) continue
    if (st.derive) continue // rendered from the roster; nothing typed to drift
    const typed = leadInt(st.count)
    if (typed !== counts[kind])
      add('R1', slug, `funnel "${st.label}" types ${st.count}; the roster gives ${counts[kind]}`)
  }
  // R1 — headline numbers. The subhead is a per-sport breakdown at every school
  // ("Swimming alone produced eight Division I commits"), so it is not checked.
  for (const field of ['headline']) {
    const text = p[field]
    if (!text) continue
    const re = new RegExp(String.raw`\b${NUM_RE}\s+(?:(?:[\w’'-]+)\s+){0,2}?(commit|division i\b|d1\b|power (?:4|four)\b)`, 'gi')
    for (const m of text.matchAll(re)) {
      const n = wordNumber(m[1])
      const kind = /^commit/i.test(m[2]) ? 'all' : /power/i.test(m[2]) ? 'p4' : 'd1'
      // "Division I commitments" names the D1 count, not every commitment.
      const between = m[0].slice(m[1].length, m[0].length - m[2].length)
      const k = kind === 'all' && /division i|d1/i.test(between) ? 'd1' : kind
      if (n != null && n !== counts[k])
        add('R1', slug, `${field}: "${m[0]}" says ${n}; the roster gives ${counts[k]} (${k})`)
    }
  }
  // R1b — Compare rows.
  for (const [key, k] of [['p4-commits-2426', 'p4'], ['d1-commits-2426', 'd1'], ['seniors-committed', 'seniors']]) {
    const v = cell(key, slug)
    if (v == null) continue
    if (leadInt(v) !== counts[k]) add('R1b', slug, `Compare ${key} = ${v}; the roster gives ${counts[k]}`)
  }
  // R2 — bars.
  if (legacyBars) {
    const sum = p.sportBars.reduce((a, b) => a + b.count, 0)
    if (sum !== counts.d1)
      add('R2', slug, `"D1 commits by sport" bars sum to ${sum}; the roster has ${counts.d1} D1 commits`)
  } else {
    const rows = p.roster.filter((r) => r.cls !== "'27" && (r.level === 'D1' || r.level === 'P4'))
    const sports = new Set(p.roster.map((r) => r.sport))
    const hasOther = p.sportBars.some((b) => b.match === 'other')
    for (const b of p.sportBars) {
      if (!Array.isArray(b.match)) continue
      for (const s of b.match)
        if (!sports.has(s)) add('R2', slug, `bar "${b.sport}" matches "${s}", which no roster row uses`)
    }
    for (const r of rows) {
      const hits = p.sportBars.filter((b) => Array.isArray(b.match) && b.match.includes(r.sport)).length
      if (hits > 1) add('R2', slug, `D1 row ${r.name} (${r.sport}) lands in ${hits} bars`)
      if (hits === 0 && !hasOther) add('R2', slug, `D1 row ${r.name} (${r.sport}) lands in no bar and there is no "Other" bar`)
    }
    const barSum = counts.bars.reduce((a, b) => a + b.count, 0)
    if (barSum !== counts.d1) add('R2', slug, `bars sum to ${barSum}; D1 is ${counts.d1}`)
  }
}

/* -------------------------------------------------------------------- R3 -- */

const plain = (s) => String(s ?? '').replace(/\*\*/g, '')
for (const [slug, prog] of Object.entries(data.summer)) {
  const c = prog.catalog
  if (!c?.camps) continue
  const rows = c.camps.length
  const names = new Set(c.camps.map((x) => x.name)).size
  const intro = plain(c.intro)
  // A sampled catalog says so: "60 of the 251 offerings are listed below".
  const sample = intro.match(/(\d[\d,]*) of the ([\d,]+) ([^.;:]{0,40}?)(?:are )?listed\b/)
  if (sample) {
    const n = Number(sample[1].replace(/,/g, ''))
    const byName = /titles|distinct/.test(sample[3])
    const want = byName ? names : rows
    if (n !== want)
      add('R3', slug, `intro "${sample[0].trim()}": ${n}, but the catalog lists ${want} ${byName ? 'distinct camps' : 'rows'}`)
  } else {
    // A complete slate: every "N camps" on it is the listed count. On a sampled
    // catalog the other figures describe the school's full catalog instead.
    const CAMPS = /\b(?:(?:all|full)\s+)?(\d[\d,]*)[- ](?:distinct |publicly named |half-day |named )?camps?\b(?![-‐]|\s+(?:sessions?|weeks?|rows?|offerings?|listings?|titles?)\b)/gi
    for (const [field, text] of [['intro', intro], ['headline', plain(c.headline)]]) {
      for (const m of text.matchAll(CAMPS)) {
        const n = Number(m[1].replace(/,/g, ''))
        if (n === rows || n === names) continue
        add('R3', slug, `${field} "${m[0]}": ${n}, but the catalog lists ${rows} rows (${names} distinct names)`)
      }
    }
  }
}

/* --------------------------------------------------------------- R4 / R4b -- */

const HS_SLUGS = Object.keys(metric('us-courses')?.values ?? {})
for (const slug of HS_SLUGS) {
  const co = courseOfferings(slug)
  if (!co) continue
  const div = co.divisions.find((d) => /upper|high/i.test(d.title))
  if (!div) continue
  const teaser = div.teaser
  const lead = teaser.match(/^~?([\d,]+)/)
  const rowsN = div.departments.reduce((a, d) => a + d.courses.length, 0)
  const compare = cell('us-courses', slug)
  if (!lead) {
    add('R4', slug, `Upper School teaser has no leading count: "${teaser.slice(0, 60)}…"`)
    continue
  }
  const n = Number(lead[1].replace(/,/g, ''))
  if (compare != null && n !== leadInt(compare))
    add('R4', slug, `teaser says ${n} courses; Compare us-courses says ${compare}`)
  if (n !== rowsN) {
    const shown = teaser.match(/shown here as ([\d,]+) entries/i)
    if (!shown) add('R4', slug, `teaser says ${n} courses but the list renders ${rowsN} rows, and the teaser does not say "shown here as ${rowsN} entries"`)
    else if (Number(shown[1].replace(/,/g, '')) !== rowsN)
      add('R4', slug, `teaser says "shown here as ${shown[1]} entries"; the list renders ${rowsN}`)
  }
  const ap = teaser.match(/(\d+) (?:AP|Advanced Placement)\b/)
  const adv = cell('advanced-courses', slug)
  if (ap && adv != null && Number(ap[1]) !== leadInt(adv)) {
    const qual = qualText('advanced-courses', slug)
    if (!new RegExp(String.raw`\b${ap[1]}\b`).test(qual))
      add('R4b', slug, `teaser says ${ap[1]} AP; Compare advanced-courses says ${adv}, and its qual does not name ${ap[1]}`)
  }
}

/* -------------------------------------------------------------------- R5 -- */

function* walk(o, path = '', joinTiles = false) {
  if (typeof o === 'string') yield [path, o]
  else if (Array.isArray(o)) for (let i = 0; i < o.length; i++) yield* walk(o[i], `${path}[${i}]`, joinTiles)
  else if (o && typeof o === 'object') {
    // A stat tile renders its figure and caption as one phrase ("32" + "Top-75 …").
    if (joinTiles && typeof o.value === 'string' && typeof o.label === 'string')
      yield [`${path}.value+label`, `${o.value} ${o.label}`]
    for (const [k, v] of Object.entries(o)) yield* walk(v, path ? `${path}.${k}` : k, joinTiles)
  }
}
const BAD_VALUE = /^[~≈]?\s?1:\d+/
const BAD_PROSE = /(?:[~≈]|\broughly |\babout |\bapproximately )1:\d{2,}\b/
for (const [slug, prog] of Object.entries(data.collegeSupportPrograms)) {
  for (const [path, s] of walk(prog)) {
    if (/\.value$/.test(path) && BAD_VALUE.test(s)) add('R5', slug, `${path} = "${s}" — write "~N:1"`)
    else if (BAD_PROSE.test(s)) add('R5', slug, `${path}: "${s.match(BAD_PROSE)[0]}" — write "N:1"`)
  }
}
for (const m of VALUE_METRICS) {
  for (const [slug, v] of Object.entries(m.values ?? {}))
    if (typeof v === 'string' && BAD_VALUE.test(v)) add('R5', slug, `Compare ${m.key} = "${v}" — write "~N:1"`)
}

/* -------------------------------------------------------------------- R6 -- */

const splitNames = (s) =>
  s.split(/,\s*|\s+and\s+/).map((x) => x.trim()).filter(Boolean)
for (const [slug, prog] of Object.entries(data.collegeSupportPrograms)) {
  const buckets = prog.outcomes?.buckets ?? []
  const ivy = buckets.find((b) => /^ivy league$/i.test(b.tier))
  const ivyMissing = ivy ? leadInt(ivy.count.split('/')[1]) - leadInt(ivy.count) : 0
  for (const b of buckets) {
    const note = b.note ?? ''
    const m = note.match(/\babsent\s+(.+?)(?:\s+at the very top)?\s*$/i)
    if (!m || /at the very top/i.test(note)) continue
    const [shown, total] = String(b.count).split('/').map((x) => leadInt(x))
    if (shown == null || total == null) continue
    const missing = total - shown
    const named = splitNames(m[1].replace(/[.;]$/, '')).length
    const ivyPlusOk = /ivy plus/i.test(b.tier) && named + ivyMissing === missing
    if (named !== missing && !ivyPlusOk)
      add('R6', slug, `bucket "${b.tier}" ${b.count} names ${named} absent, but ${missing} are missing: "${note}"`)
  }
}

/* -------------------------------------------------------------------- R7 -- */

const BOTH = /\(\s*B\s*&\s*G\s*\)|\bB\/G\b|\bboys(?:’|')? (?:&|and) girls(?:’|')?\b/i
for (const [slug, prog] of Object.entries(data.sportsPrograms)) {
  const o = prog.offered
  if (!o) continue
  const heads = o.seasons
    .map((s) => ({ s, n: leadInt((s.note ?? '').match(/(\d+)\s+varsity/i)?.[1]) }))
    .filter((x) => x.n != null)
  if (!heads.length) continue
  const bases = heads.map(({ s, n }) => {
    const rows = s.sports.length
    const perGender = s.sports.reduce((a, x) => a + (BOTH.test(x.name) ? 2 : 1), 0)
    return { name: s.name, n, rows, perGender, ok: [n === rows && 'rows', n === perGender && 'perGender'].filter(Boolean) }
  })
  for (const b of bases)
    if (!b.ok.length) add('R7', slug, `${b.name} header "${b.n} varsity" matches neither its ${b.rows} rows nor ${b.perGender} boys'/girls' teams`)
  const common = ['rows', 'perGender'].filter((k) => bases.every((b) => b.ok.includes(k)))
  if (bases.every((b) => b.ok.length) && !common.length)
    add('R7', slug, `season headers mix counting bases: ${bases.map((b) => `${b.name} ${b.n} (${b.ok.join('/')})`).join(', ')}`)
  const sum = heads.reduce((a, h) => a + h.n, 0)
  const texts = [
    ...o.stats.map((t) => `${t.value} ${t.label}`),
    o.headline, o.subhead ?? '', o.footnote ?? '',
  ]
  for (const t of texts)
    for (const m of t.matchAll(/\b(\d+)\s+varsity\b/gi))
      if (Number(m[1]) !== sum) add('R7', slug, `"${m[0]}" on Sports Offered, but the season headers sum to ${sum}`)
}

/* -------------------------------------------------------------------- R9 -- */

// A sport name without its gender split: "Basketball (Girls)", "Swimming (B & G)",
// "Volleyball – Girls" and "Cheerleading (Winter)" each name one sport.
const sportName = (s) =>
  String(s)
    .replace(/\([^)]*\)/g, '')
    .replace(/\s+[–-]\s+(?:boys|girls|co-?ed)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
const numWord = (n) => (n < UNITS.length ? UNITS[n] : null)
const numAlt = (n) => `${n}${numWord(n) ? `|${numWord(n)}` : ''}`
const SPORTS = new RegExp(String.raw`(?<![\d–-])\b${NUM_RE}\s+(?:(?:distinct|team|varsity)\s+)*sports\b`, 'gi')
for (const [slug, prog] of Object.entries(data.sportsPrograms)) {
  const o = prog.offered
  if (!o) continue
  const rows = o.seasons.flatMap((s) => s.sports)
  const listed = new Set(rows.map((x) => sportName(x.name))).size
  const foot = plain(o.footnote)
  // The footnote reconciles the figure with the list ("…its own directory lists 16").
  const footStatesList = new RegExp(String.raw`\b(?:${numAlt(listed)})\b`, 'i').test(foot)
  // The footnote states the figure's basis ("…26 sports … counts boys’ and girls’
  // programs separately"), in one sentence.
  const footBasis = (n) =>
    foot.split(/(?<=[.!?])\s+/).some((sent) => new RegExp(String.raw`\b(?:${numAlt(n)})\b`, 'i').test(sent) && /separately/i.test(sent))
  const texts = [
    ['headline', o.headline],
    // Only a tile whose caption is the sport count ("17 · sports offered"), not
    // "42 · state titles in 7 sports".
    ...o.stats.map((t, i) => [`stats[${i}]`, /^(?:(?:distinct|team|varsity)\s+)*sports\b/i.test(t.label) ? `${t.value} ${t.label}` : '']),
  ]
  for (const [where, t] of texts) {
    for (const m of plain(t).matchAll(SPORTS)) {
      const n = wordNumber(m[1])
      // One row per boys' or girls' program is a basis too (Covenant, Gaston Day).
      if (n == null || n === listed || n === rows.length || footStatesList || footBasis(n)) continue
      add('R9', slug, `${where} "${m[0]}": ${n}, but Sports Offered lists ${listed} distinct sports in ${rows.length} rows, and the footnote neither states ${listed} nor gives the ${n}'s basis`)
    }
  }
}

/* ------------------------------------------------------------------- R10 -- */

// "offered in four of the eight weeks", "offered in the first two weeks",
// "offered in all six weeks", "offered in both short weeks".
const WEEKS = new RegExp(
  String.raw`offered in (?:(all|both) |the (?:first|final|last) )?(?:${NUM_RE} )?(?:(?:consecutive|separate|short) )?(?:of the ${NUM_RE} )?(?:(?:consecutive|separate|short|five-day|four-day) )?weeks\b`,
  'i',
)
// "June 1-5; June 8-12" (dated sessions, ';'-separated) or "Weeks 1, 2, 5" /
// "Weeks 1-6" (numbered weeks).
function weekCount(w) {
  const s = String(w).trim()
  const numbered = s.match(/^Weeks?\s+(.+)$/i)
  if (!numbered) return s.split(';').map((x) => x.trim()).filter(Boolean).length
  return numbered[1].split(/,\s*|\s+and\s+/).reduce((a, part) => {
    const r = part.match(/^(\d+)\s*[-–]\s*(\d+)$/)
    return a + (r ? Number(r[2]) - Number(r[1]) + 1 : /^\d+$/.test(part.trim()) ? 1 : 0)
  }, 0)
}
for (const [slug, prog] of Object.entries(data.summer)) {
  for (const c of prog.catalog?.camps ?? []) {
    const m = String(c.desc ?? '').match(WEEKS)
    if (!m || !c.weeks) continue
    const n = m[2] ? wordNumber(m[2]) : m[1]?.toLowerCase() === 'both' ? 2 : null
    if (n == null) continue
    const listed = weekCount(c.weeks)
    if (n !== listed)
      add('R10', slug, `camp "${c.name}": desc says "${m[0]}" (${n}), but its weeks list ${listed}: "${c.weeks}"`)
  }
}

/* ------------------------------------------------------------------- R11 -- */

// Beyond Tuition component grids. A school may count a 'range' row (a figure a
// year behind, or a range) as unpriced or not — Latin's "8 unpriced or a year
// behind" does, the rest do not — but the title, note and percentage must all
// count on the same basis, and the total must be the grid's length.
for (const slug of Object.keys(data.sportsPrograms)) {
  const r = financialAidReport(slug)
  for (const sec of r?.sections ?? []) {
    const cs = sec.components
    if (!cs?.length) continue
    const len = cs.length
    const unp = cs.filter((c) => c.status === 'unpriced').length
    const rng = cs.filter((c) => c.status === 'range').length
    const pri = cs.filter((c) => c.status === 'priced').length
    const title = plain(sec.componentsTitle)
    const note = plain(sec.componentsNote)
    const aside = plain(sec.componentsAside)
    const where = `${sec.id ?? sec.navTitle}`
    // Totals: the title's leading count, and "N confirmed …" / "Of N …" in the note.
    const lead = title.match(new RegExp(String.raw`^${NUM_RE}\b`, 'i'))
    const totals = [
      ...(lead ? [['title', lead[0], wordNumber(lead[1])]] : []),
      ...[...note.matchAll(new RegExp(String.raw`\b(?:of\s+)?${NUM_RE}\s+confirmed\b`, 'gi'))].map((m) => ['note', m[0], wordNumber(m[1])]),
    ]
    for (const [f, txt, n] of totals)
      if (n != null && n !== len) add('R11', slug, `${where} ${f} "${txt}": ${n}, but the grid lists ${len} components`)
    // Unpriced counts and the basis they imply.
    const bases = new Set()
    for (const [f, t] of [['title', title], ['note', note], ['aside', aside]]) {
      for (const m of t.matchAll(new RegExp(String.raw`\b${NUM_RE}\s+unpriced\b`, 'gi'))) {
        const n = wordNumber(m[1])
        if (n === unp) bases.add('unpriced')
        if (n === unp + rng) bases.add('unpriced+range')
        if (n !== unp && n !== unp + rng)
          add('R11', slug, `${where} ${f} "${m[0]}": ${n}, but the grid has ${unp} unpriced${rng ? ` (+${rng} range)` : ''}`)
      }
      for (const m of t.matchAll(new RegExp(String.raw`\b(?:all\s+|only\s+)?${NUM_RE}\s+priced\b`, 'gi'))) {
        const n = wordNumber(m[1])
        if (n !== pri && n !== pri + rng)
          add('R11', slug, `${where} ${f} "${m[0]}": ${n}, but the grid has ${pri} priced${rng ? ` (+${rng} range)` : ''}`)
      }
      for (const m of t.matchAll(/~?(\d+)% unpriced/gi)) {
        const n = Number(m[1])
        const a = Math.round((unp / len) * 100)
        const b = Math.round(((unp + rng) / len) * 100)
        const ok = bases.size ? [...bases].some((k) => n === (k === 'unpriced' ? a : b)) : n === a || n === b
        if (!ok) add('R11', slug, `${where} ${f} "${m[0]}": ${n}%, but ${unp}${bases.has('unpriced+range') ? `+${rng}` : ''} of ${len} is ${bases.has('unpriced+range') ? b : a}%`)
      }
    }
  }
}

/* --------------------------------------------------------- R8 (report) -- */

const NOUNS = [
  ['AP', /^(?:AP|Advanced Placement)\s+(?:courses?|subjects?|classes|exams?|offerings)\b/i],
  ['seniors', /^seniors?\b/i],
  ['counselors', /^(?:(?:full-time |school |college )?counsel(?:or|ing staff)s?)\b/i],
  ['students', /^students?\b/i],
  ['institutions', /^(?:institutions?|colleges?(?: and universities)?|universities)\b/i],
  ['camps', /^camps?\b/i],
  ['clubs', /^(?:clubs?|student organizations?)\b/i],
  ['teams', /^teams?\b/i],
  ['honor societies', /^honor societ(?:y|ies)\b/i],
  ['ensembles', /^(?:named )?ensembles?\b/i],
  ['Top-75 National', /^Top-75 National\b/i],
]
// The noun is letters, spaces and hyphens only. `\w` here once let one match run
// on through a second figure — "9 varsity sports across roughly 28 teams" read as
// a single pair, so "28 teams" was never seen (plan `consistency2`).
const PAIR = /(?<![\d.,$])(~?\d[\d,]*\+?)\s+([A-Za-z][A-Za-z -]{0,40})/g
function r8For(slug) {
  const groups = new Map() // noun → Map(number → [where])
  const note = (noun, n, where) => {
    if (!groups.has(noun)) groups.set(noun, new Map())
    const g = groups.get(noun)
    if (!g.has(n)) g.set(n, [])
    g.get(n).push(where)
  }
  const sources = []
  for (const d of DIRS) if (data[d][slug]) sources.push([d, data[d][slug]])
  const extra = [
    ['courseOfferings', courseOfferings(slug)],
    ['financialAidReport', financialAidReport(slug)],
    ['clubCatalog', clubCatalog(slug)],
    ['clubClusters', clubClusters(slug)],
  ]
  for (const [d, o] of extra) if (o) sources.push([d, o])
  for (const [d, o] of sources) {
    for (const [path, s] of walk(o, '', true)) {
      if (/https?:\/\//.test(s) && !/\s/.test(s)) continue
      if (/\b(?:19|20)\d\d\b|Class of/i.test(s)) continue
      for (const m of s.matchAll(PAIR)) {
        const n = m[1].replace(/[,~+]/g, '')
        for (const [noun, re] of NOUNS) if (re.test(m[2])) note(noun, n, `${d}.${path}`)
      }
    }
  }
  for (const m of VALUE_METRICS) {
    const v = m.values?.[slug]
    if (typeof v !== 'string') continue
    for (const [noun, re] of NOUNS)
      if (re.test(m.label.replace(/^\s*/, '')) || re.test(v.replace(/^~?\d[\d,]*\+?\s*/, '')))
        note(noun, (v.match(/\d[\d,]*/)?.[0] ?? '').replace(/,/g, ''), `Compare ${m.key}`)
  }
  // Computed figures a typed number should agree with.
  const sp = data.sportsPrograms[slug]
  if (sp?.offered) note('teams', String(sp.offered.seasons.reduce((a, s) => a + s.sports.reduce((b, x) => b + x.levels.length, 0), 0)), 'computed: V/JV/MS chips on Sports Offered')
  const cs = data.collegeSupportPrograms[slug]
  for (const b of cs?.outcomes?.buckets ?? [])
    if (/top-75 national/i.test(b.tier)) note('Top-75 National', String(leadInt(b.count)), `outcomes bucket "${b.tier}"`)
  const out = []
  for (const [noun, g] of groups) {
    const keys = [...g.keys()].filter(Boolean)
    if (keys.length > 1) out.push({ noun, values: keys.map((k) => ({ n: k, where: g.get(k) })) })
  }
  return out
}

/* ---------------------------------------------------------------- output -- */

// Rules that print with --report but do not fail the build. Empty today: R9–R11
// joined the gate once the plan `consistency2` fixes brought each to zero.
const REPORT_ONLY = new Set([])
const gated = findings.filter((f) => !REPORT_ONLY.has(f.rule))
const RULES = ['R1', 'R1b', 'R2', 'R3', 'R4', 'R4b', 'R5', 'R6', 'R7', 'R9', 'R10', 'R11']
if (REPORT || gated.length) {
  for (const rule of RULES) {
    const fs = (REPORT ? findings : gated).filter((f) => f.rule === rule)
    if (!fs.length) continue
    console.log(`\n${rule} — ${fs.length}`)
    for (const f of fs) console.log(`  ${f.school}: ${f.msg}`)
  }
}
if (REPORT) {
  console.log('\nR8 (report only) — numbers that share a noun on one school page')
  const slugs = [...new Set(DIRS.flatMap((d) => Object.keys(data[d])))].sort()
  let total = 0
  for (const slug of slugs) {
    const groups = r8For(slug)
    if (!groups.length) continue
    console.log(`\n  ${slug}`)
    for (const g of groups) {
      total++
      console.log(`    ${g.noun}: ${g.values.map((v) => v.n).join(' vs ')}`)
      for (const v of g.values) console.log(`      ${v.n}: ${v.where.slice(0, 4).join(' · ')}${v.where.length > 4 ? ` (+${v.where.length - 4})` : ''}`)
    }
  }
  console.log(`\nR8: ${total} noun group(s) with more than one number.`)
}

console.log(
  gated.length
    ? `\ncheck:consistency: ${gated.length} finding(s) across R1–R7 and R9–R11.`
    : '\ncheck:consistency: R1–R7 and R9–R11 clean.',
)
process.exit(REPORT ? 0 : gated.length ? 1 : 0)
