#!/usr/bin/env node
/**
 * check:ncrows — the six Top 6 NC admit-rate Compare rows must agree with the
 * ncAdmissions card they restate.
 *
 * WHY THIS EXISTS. Compare → College Support carries one row per Top 6 NC
 * public university (`nc-admit-<university key>`), each cell the Fall 2025
 * rate at which that university admitted the school's applicants. The figures
 * already live in each school's `ncAdmissions` card
 * (src/data/collegeSupportPrograms/<slug>.ts), but VALUE_METRICS is
 * hand-maintained, so the two copies drift the moment the dashboard is
 * refreshed and only one of them is updated. This check re-derives every cell
 * from the card's raw counts on every build.
 *
 * THE ROUNDING TRAP. A cell is Math.round(100 * accepted / applied), computed
 * from the COUNTS. It is never the card's one-decimal `rate` re-rounded: that
 * double-rounds. Covenant Day at UNC Charlotte is 17 / 19 = 89.47%; the card
 * shows 89.5%, which re-rounds to 90. The true whole number is 89.
 *
 * Asserts:
 *   - exactly six `nc-admit-*` college-support rows, contiguous, in the card's
 *     university order, immediately before `bucket-hbcu`;
 *   - each key is `nc-admit-${university.key}` and each label ends with the
 *     exact dashboard name;
 *   - every row is `compareOnly` (the school page already shows the card);
 *   - every cell and its `accepted / applied` sub-line match the counts, and
 *     no school with data is missing or extra;
 *   - every school shares one `latestTerm`, and the first row's note names
 *     `Fall <term>` — so a Fall 2026 refresh fails until the note moves too.
 */
import fs from 'node:fs'
import path from 'node:path'

const DIR = 'src/data/collegeSupportPrograms'
const num = (s) => Number(String(s).replace(/,/g, ''))

const { VALUE_METRICS } = await import(path.resolve('src/data/metricValues.ts'))

const findings = []
const programs = {}
for (const file of fs.readdirSync(DIR).sort()) {
  if (!file.endsWith('.ts')) continue
  const mod = await import(path.resolve(DIR, file))
  const nc = Object.values(mod).find((v) => v && typeof v === 'object' && v.ncAdmissions)
    ?.ncAdmissions
  if (nc) programs[file.replace(/\.ts$/, '')] = nc
}

const slugs = Object.keys(programs)
if (slugs.length === 0) {
  console.error('check:ncrows — no ncAdmissions cards found; the import is broken')
  process.exit(1)
}

// One shared term, and one shared university order.
const terms = new Set(slugs.map((s) => programs[s].latestTerm))
if (terms.size !== 1) {
  findings.push(`latestTerm differs across schools: ${[...terms].join(', ')}`)
}
const term = [...terms][0]
const order = programs[slugs[0]].universities.map((u) => u.key)
for (const s of slugs) {
  const keys = programs[s].universities.map((u) => u.key).join(',')
  if (keys !== order.join(',')) findings.push(`${s}: university order differs — ${keys}`)
}

// Placement: six contiguous rows, directly before bucket-hbcu.
const idx = VALUE_METRICS.map((r, i) => (r.key.startsWith('nc-admit-') ? i : -1)).filter(
  (i) => i >= 0,
)
const hbcu = VALUE_METRICS.findIndex((r) => r.key === 'bucket-hbcu')
if (idx.length !== order.length) {
  findings.push(`expected ${order.length} nc-admit-* rows, found ${idx.length}`)
} else if (idx.some((v, i) => v !== idx[0] + i)) {
  findings.push(`nc-admit-* rows are not contiguous (indices ${idx.join(', ')})`)
} else if (idx[idx.length - 1] + 1 !== hbcu) {
  findings.push(`nc-admit-* rows must sit immediately before bucket-hbcu (last at ${idx[idx.length - 1]}, hbcu at ${hbcu})`)
}

idx.forEach((rowIdx, i) => {
  const row = VALUE_METRICS[rowIdx]
  const uKey = order[i]
  const tag = `[${rowIdx}] ${row.key}`
  if (row.topic !== 'college-support') findings.push(`${tag}: topic is ${row.topic}`)
  if (row.key !== `nc-admit-${uKey}`) findings.push(`${tag}: expected key nc-admit-${uKey}`)
  if (row.compareOnly !== true) findings.push(`${tag}: missing compareOnly: true`)
  const name = programs[slugs[0]].universities[i].name
  if (!row.label.endsWith(name)) findings.push(`${tag}: label "${row.label}" must end with "${name}"`)
  if (i === 0 && !(row.note ?? '').includes(`Fall ${term}`)) {
    findings.push(`${tag}: note must name "Fall ${term}" (the card's latestTerm)`)
  }

  for (const s of slugs) {
    const u = programs[s].universities.find((x) => x.key === uKey)
    const accepted = num(u.accepted)
    const applied = num(u.applied)
    const want = `${Math.round((100 * accepted) / applied)}%`
    const wantSub = `${accepted} / ${applied}`
    if (row.values[s] !== want) {
      findings.push(`${tag} ${s}: value "${row.values[s]}" ≠ "${want}" (${accepted} / ${applied})`)
    }
    if (row.subs?.[s] !== wantSub) {
      findings.push(`${tag} ${s}: sub "${row.subs?.[s]}" ≠ "${wantSub}"`)
    }
  }
  for (const s of Object.keys(row.values)) {
    if (!programs[s] && row.values[s] != null) {
      findings.push(`${tag} ${s}: has a value but no ncAdmissions card`)
    }
  }
})

if (findings.length) {
  console.error(`check:ncrows — ${findings.length} finding(s):`)
  for (const f of findings) console.error(`  ✗ ${f}`)
  process.exit(1)
}
console.log(
  `check:ncrows — ${idx.length} rows × ${slugs.length} schools match the ncAdmissions cards (Fall ${term})`,
)
