#!/usr/bin/env node
// Does every "coded" Compare cell that needs explaining actually carry a
// provenance tooltip (`quals` in metricValues.ts)?
//
// WHY THIS EXISTS
// ---------------
// The Compare table renders a per-cell tooltip when — and ONLY when — a `quals`
// entry was hand-authored for that school in `src/data/metricValues.ts`
// (Compare.tsx branches on `vm.quals?.[slug]`). Nothing decides tooltip-worthiness
// automatically. So when a NEW metric is added, its cells ship with NO tooltip
// unless someone remembered to write one — and a value like `3 / 8`, `~45–50`,
// `28:1`, or `FLL Worlds top 100` means nothing to a parent without the caveat
// behind it. That omission is silent: the page looks clean while explaining
// nothing.
//
// This flags value cells whose DISPLAY STRING looks coded (a fraction, ratio,
// range, floor/approx prefix, magnitude, or an achievement phrase) but have no
// `quals` entry. It is the "you added a metric and forgot the tooltips" alarm.
//
// WHAT IT CANNOT SEE (by design, and honestly)
// --------------------------------------------
// Some tooltips exist for a reason invisible in the value itself — a plain `92%`
// that is a differently-scoped year, a plain `$36,325` that spans Grades 6–12
// while its neighbours are 9–12, a bare sports integer that is a DOCUMENTED
// MINIMUM. A value-only heuristic can't detect those, and it never flags a plain
// value as needing one (zero false positives on the shipped data — see the
// calibration note below). So a clean run means "no coded cell is missing its
// tooltip", NOT "every cell that should have one does". The editorial call still
// belongs to a human; this only catches the mechanical omission.
//
//   node scripts/check_qual_coverage.mjs            # advisory: reports, exits 0
//   node scripts/check_qual_coverage.mjs --strict   # exits 1 if any cell is flagged
//
// CALIBRATION: run against the committed data, `looksCoded()` flags 0 cells that
// were deliberately left bare (21 AP, $32,070, plain counts, exact org count 25,
// the complete-roster sports totals). Keep it that way — a check that cries wolf
// on correct data gets ignored, which is worse than no check. If you add a value
// shape that is legitimately bare and this flags it, tighten the heuristic here
// rather than silencing the run.

import { VALUE_METRICS } from '../src/data/metricValues.ts'

const STRICT = process.argv.includes('--strict')

/**
 * Does a display value LOOK like it needs explaining? Returns a short reason
 * string, or null if the value stands on its own.
 *
 * Calibrated so every currently-bare cell that is CORRECTLY bare returns null.
 * A bare integer (`104`), plain money (`$32,070`), a simple `<n> <UNIT>` count
 * (`21 AP`, `26 AP`, `22 AP subjects`) or a plain percent (`89%`) reads on its
 * own and is not flagged. Everything with a qualifier glyph or prose is.
 */
export function looksCoded(v) {
  const s = String(v).trim()
  // Approximation, floor, or ceiling — the figure is not exact.
  if (/[~≥≤]/.test(s)) return 'approx / floor (~ ≥ ≤)'
  // Open-ended "and more": 40+, 31+, 14 AP + 13 AT.
  if (/\+/.test(s)) return 'open-ended / compound (+)'
  // A fraction the reader can't decode without the denominator's meaning.
  if (/\d\s*\/\s*\d/.test(s)) return 'fraction (n / m)'
  // A ratio or a clock time.
  if (/\d:\d/.test(s)) return 'ratio or time (n:n)'
  // A range across a dash between two figures/grades: JrK–12, Age 2–Gr 12.
  if (/[–—-]/.test(s) && /[A-Za-z0-9]/.test(s.split(/[–—-]/)[0])) return 'range (a–b)'
  // Magnitude abbreviation: ~10k, $3.0M.
  if (/\d\s*[kKMB]\b/.test(s)) return 'magnitude (k / M / B)'
  // Achievement / label phrase — has letters and is NOT a simple "<n> <UNIT>"
  // count (21 AP) or "<n> subjects".
  const bareCountUnit = /^\d+(\.\d+)?\s*[A-Za-z]{1,3}( subjects)?$/
  if (/[A-Za-z]/.test(s) && !bareCountUnit.test(s)) return 'phrase (words)'
  return null
}

const flagged = []
for (const m of VALUE_METRICS) {
  for (const [slug, v] of Object.entries(m.values)) {
    if (v == null) continue // N/A cells render no value
    if (m.quals && m.quals[slug]) continue // already explained
    const reason = looksCoded(v)
    if (reason) flagged.push({ key: m.key, topic: m.topic, slug, v: String(v), reason })
  }
}

if (flagged.length === 0) {
  console.log('✓ every coded Compare cell carries a provenance tooltip')
  process.exit(0)
}

// Group by metric for a readable report.
const byMetric = new Map()
for (const f of flagged) {
  if (!byMetric.has(f.key)) byMetric.set(f.key, { topic: f.topic, rows: [] })
  byMetric.get(f.key).rows.push(f)
}

console.log(
  `\n${flagged.length} coded cell(s) across ${byMetric.size} metric(s) have no tooltip:\n`,
)
for (const [key, { topic, rows }] of byMetric) {
  console.log(`  ${topic} · ${key}`)
  for (const r of rows) {
    console.log(`    ${r.slug.padEnd(22)} "${r.v}"  — ${r.reason}`)
  }
}
console.log(
  '\nEach flagged value looks coded — a fraction, range, floor, ratio, magnitude,\n' +
    'or phrase a parent cannot decode from the number alone. Add a `quals` entry\n' +
    'for it in src/data/metricValues.ts (kind + one or two sentences), or, if the\n' +
    'value truly stands on its own, tighten looksCoded() in this script.\n' +
    'NOTE: this cannot see tooltips warranted for reasons invisible in the value\n' +
    '(a differently-scoped year, a documented minimum) — those remain a human call.',
)

process.exit(STRICT ? 1 : 0)
