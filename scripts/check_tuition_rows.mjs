#!/usr/bin/env node
/**
 * check:tuition — the six tuition rows on Compare › Financial Aid & Tuition
 * must agree with the Financial Aid report bands they summarise.
 *
 * WHY THIS EXISTS. Compare carries three per-division tuition rows
 * (`tuition-lower`, `tuition-middle`, `tuition-upper`) and three cumulative
 * runs (`run-prek12`, `run-ms12`, `run-912`), plan `comparerows` (2026-11-07).
 * Every cell is typed into src/data/metricValues.ts, and every one is a pure
 * function of the `bands` in src/data/financialAidReports.ts. A rate update
 * that touches the report and not the rows would leave Compare stale with no
 * other reader of both. This check re-derives every cell on every build.
 *
 * RULES (identical to the rows' notes):
 *   - a per-division row shows the band that prices the division's LAST grade
 *     (Lower = the grade before Middle School starts, Middle = grade 8,
 *     Upper = grade 12);
 *   - a run adds one year per grade at the band pricing that grade, at current
 *     rates, tuition only: pre-K–12 = one pre-K year + K + grades 1–12 (14
 *     years; Carmel Christian has no pre-K, so 13), MS–12 = grades
 *     msStart..12, 9–12 = four years at the 9–12 band;
 *   - the report's own "full run" stat, where it has one, must equal the
 *     pre-K–12 cell (Davidson Day's stat is a K–12 run and is checked as such).
 *
 * GRADE_BANDS maps each grade token to the band LABEL in that school's report,
 * so a relabelled or re-priced band fails here rather than drifting.
 *
 * Asserts:
 *   - the six keys open the financial-aid-tuition rows, contiguous, in order,
 *     and `top-tuition` is gone;
 *   - `noLead` on all six; `compareOnly` on all but tuition-upper;
 *   - every non-null value equals the derived figure, formatted `$1,234`;
 *   - every non-null cell has a sub-line containing the report `meta` year;
 *   - run sub-lines name the span's year count (`14 years` / `13 years`);
 *   - a school with no band for a grade is null on the rows that need it
 *     (Charlotte Catholic: null on four rows, a value on tuition-upper and
 *     run-912).
 *
 * Run: npm run check:tuition  (chained into `npm run build`).
 * REPORTS_FILE=<path> points it at a copy of financialAidReports.ts, for
 * negative tests.
 */
import path from 'node:path'

const REPORTS_FILE = process.env.REPORTS_FILE || 'src/data/financialAidReports.ts'
const { VALUE_METRICS } = await import(path.resolve('src/data/metricValues.ts'))
const { financialAidReport } = await import(path.resolve(REPORTS_FILE))

const KEYS = ['tuition-lower', 'tuition-middle', 'tuition-upper', 'run-prek12', 'run-ms12', 'run-912']
const TILE_KEY = 'tuition-upper'
const GRADES = ['PK', 'K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

const span = (label, from, to) => {
  const o = {}
  for (let i = GRADES.indexOf(String(from)); i <= GRADES.indexOf(String(to)); i++) o[GRADES[i]] = label
  return o
}

/** Grade token → band label in the school's report; `msStart` = first Middle School grade. */
const GRADE_BANDS = {
  cannon: { msStart: 5, grades: { PK: 'Junior K', K: 'Kindergarten', ...span('Grades 1–4', 1, 4), ...span('Grades 5–8', 5, 8), ...span('Grades 9–12', 9, 12) } },
  'charlotte-country-day': { msStart: 5, grades: { PK: 'Junior K', K: 'Kindergarten', ...span('Grades 1–4', 1, 4), ...span('Grades 5–8', 5, 8), ...span('Grades 9–12', 9, 12) } },
  'charlotte-christian': { msStart: 5, grades: { ...span('Early Ed (JK–K)', 'PK', 'K'), ...span('Lower (1–4)', 1, 4), ...span('Middle (5–8)', 5, 8), ...span('Upper (9–12)', 9, 12) } },
  'covenant-day': { msStart: 6, grades: { ...span('JK & K', 'PK', 'K'), ...span('Grades 1–5', 1, 5), ...span('Grades 6–8', 6, 8), ...span('Grades 9–12', 9, 12) } },
  'davidson-day': { msStart: 5, grades: { PK: 'Early Childhood', ...span('Lower (K–4)', 'K', 4), ...span('Middle (5–8)', 5, 8), ...span('Upper (9–12)', 9, 12) } },
  'charlotte-latin': { msStart: 5, grades: { ...span('TK & Kindergarten', 'PK', 'K'), ...span('Grades 1–5', 1, 5), ...span('Grades 6–8', 6, 8), ...span('Grades 9–12', 9, 12) } },
  'providence-day': { msStart: 5, grades: { PK: 'Transitional Kindergarten', K: 'Kindergarten', ...span('Grades 1–5', 1, 5), ...span('Grades 6–12', 6, 12) } },
  'carmel-christian': { msStart: 6, grades: { K: 'Kindergarten', ...span('Grades 1–5', 1, 5), ...span('Grades 6–8', 6, 8), ...span('Grades 9–12', 9, 12) } },
  'hickory-grove-christian': { msStart: 6, grades: { ...span('TK–5 (Elementary)', 'PK', 5), ...span('Grades 6–8 (Middle)', 6, 8), ...span('Grades 9–12 (High)', 9, 12) } },
  // Gaston Day's bands are the school's own all-in totals (tuition + fees); the
  // pre-K year uses the full-day rate, as the cell's tooltip says.
  'gaston-day': { msStart: 5, grades: { PK: 'Preschool/Pre-K full day', ...span('Kindergarten–4th', 'K', 4), ...span('5th–8th', 5, 8), ...span('9th–12th', 9, 12) } },
  // A 9–12 school: no Lower or Middle School, so four rows are null.
  'charlotte-catholic': { msStart: null, grades: { ...span('High International', 9, 12) } },
}

/** Reports whose own "full run" stat must equal a derived run. */
const REPORT_RUN_STATS = {
  cannon: { key: 'run-prek12', value: '$395,830' },
  'charlotte-country-day': { key: 'run-prek12', value: '$438,840' },
  'charlotte-christian': { key: 'run-prek12', value: '$342,300' },
  'charlotte-latin': { key: 'run-prek12', value: '$469,800' },
  'providence-day': { key: 'run-prek12', value: '$472,595' },
  'davidson-day': { key: 'run-k12', value: '$337,970' },
}

const money = (n) => '$' + n.toLocaleString('en-US')
const findings = []

function derive(slug) {
  const cfg = GRADE_BANDS[slug]
  const report = financialAidReport(slug)
  if (!report) {
    findings.push(`${slug}: no Financial Aid report`)
    return null
  }
  const sec = report.sections.find((s) => s.bands)
  if (!sec) {
    findings.push(`${slug}: report has no bands section`)
    return null
  }
  const year = report.meta.match(/\d{4}–\d{2}/)?.[0]
  if (!year) findings.push(`${slug}: report meta "${report.meta}" names no YYYY–YY year`)
  const price = (g) => {
    const label = cfg.grades[g]
    if (label == null) return null
    const band = sec.bands.find((b) => b.label === label)
    if (!band) {
      findings.push(`${slug}: GRADE_BANDS names band "${label}" for grade ${g}, but the report has no such band`)
      return null
    }
    return band.amount
  }
  const sum = (gs) => {
    const ps = gs.map(price)
    return ps.every((p) => p != null) ? ps.reduce((a, b) => a + b, 0) : null
  }
  const ms = cfg.msStart
  const priced = GRADES.filter((g) => cfg.grades[g] != null)
  const hasFull = priced.includes('K') && priced.includes('12')
  const run = hasFull ? sum(priced) : null
  const k12 = hasFull ? sum(priced.filter((g) => g !== 'PK')) : null
  return {
    year,
    years: hasFull ? priced.length : null,
    'tuition-lower': ms ? price(String(ms - 1)) : null,
    'tuition-middle': ms ? price('8') : null,
    'tuition-upper': price('12'),
    'run-prek12': run,
    'run-ms12': ms ? sum(GRADES.slice(GRADES.indexOf(String(ms)))) : null,
    'run-912': sum(['9', '10', '11', '12']),
    'run-k12': k12,
    stats: report.sections.flatMap((s) => s.stats ?? []).map((s) => s.value),
  }
}

// Placement: the six rows open the topic, contiguous, in order; top-tuition gone.
if (VALUE_METRICS.some((r) => r.key === 'top-tuition')) findings.push('top-tuition still exists; tuition-upper replaced it')
const idx = VALUE_METRICS.map((r, i) => (r.topic === 'financial-aid-tuition' ? i : -1)).filter((i) => i >= 0)
const got = idx.slice(0, KEYS.length).map((i) => VALUE_METRICS[i].key)
if (got.join(', ') !== KEYS.join(', ')) findings.push(`the financial-aid-tuition rows must open with ${KEYS.join(', ')} (found: ${got.join(', ')})`)
if (idx.slice(0, KEYS.length).some((v, i) => v !== idx[0] + i)) findings.push('the six tuition rows are not contiguous')

const rows = KEYS.map((k) => VALUE_METRICS.find((r) => r.key === k)).filter(Boolean)
const slugs = Object.keys(GRADE_BANDS)
const derived = Object.fromEntries(slugs.map((s) => [s, derive(s)]))
let cells = 0

for (const row of rows) {
  const tag = row.key
  if (row.noLead !== true) findings.push(`${tag}: missing noLead: true (a price row)`)
  if (row.key === TILE_KEY ? row.compareOnly : !row.compareOnly) {
    findings.push(`${tag}: compareOnly must be ${row.key === TILE_KEY ? 'absent (it keeps the tile)' : 'true'}`)
  }
  for (const s of slugs) if (!(s in row.values)) findings.push(`${tag} ${s}: no key in values`)
  for (const [s, v] of Object.entries(row.values)) {
    const d = derived[s]
    if (!d) {
      findings.push(`${tag} ${s}: school is not in GRADE_BANDS`)
      continue
    }
    const want = d[row.key] == null ? null : money(d[row.key])
    const sub = row.subs?.[s] ?? null
    if (v !== want) findings.push(`${tag} ${s}: value "${v}" ≠ derived "${want}"`)
    if (v == null) {
      if (sub != null) findings.push(`${tag} ${s}: null cell has a sub-line "${sub}"`)
      if (row.quals?.[s]) findings.push(`${tag} ${s}: null cell has a quals entry`)
      continue
    }
    cells++
    if (sub == null) findings.push(`${tag} ${s}: no sub-line (every cell carries its year)`)
    else {
      if (!sub.startsWith('(') || !sub.endsWith(')')) findings.push(`${tag} ${s}: sub-line "${sub}" must be parenthesised`)
      if (d.year && !sub.includes(d.year)) findings.push(`${tag} ${s}: sub-line "${sub}" lacks the report year ${d.year}`)
      if (row.key.startsWith('run-') && !sub.includes(' rates · ')) findings.push(`${tag} ${s}: run sub-line "${sub}" must read "(<year> rates · <span>)"`)
      if (row.key === 'run-prek12' && !sub.includes(`${d.years} years`)) findings.push(`${tag} ${s}: sub-line "${sub}" must name ${d.years} years`)
    }
  }
}

for (const [s, { key, value }] of Object.entries(REPORT_RUN_STATS)) {
  const d = derived[s]
  if (!d) continue
  if (!d.stats.includes(value)) findings.push(`${s}: the report no longer carries the "${value}" run stat; update REPORT_RUN_STATS`)
  const want = d[key] == null ? null : money(d[key])
  if (want !== value) findings.push(`${s}: report stat ${value} ≠ derived ${key} ${want}`)
}

if (findings.length) {
  console.error(`check:tuition — ${findings.length} finding(s):`)
  for (const f of findings) console.error(`  ✗ ${f}`)
  process.exit(1)
}
console.log(`check:tuition — ${rows.length} rows × ${slugs.length} schools, ${cells} cells match the report bands`)
for (const s of slugs) {
  const d = derived[s]
  console.log(`  ${s.padEnd(24)} ${d.year}  ${KEYS.map((k) => (d[k] == null ? 'null' : money(d[k])).padStart(9)).join(' ')}`)
}
const stats = Object.entries(REPORT_RUN_STATS).map(([s, x]) => `${s} ${x.value}`)
console.log(`  report run stats matched: ${stats.join('; ')}`)
