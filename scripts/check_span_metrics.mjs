#!/usr/bin/env node
/**
 * Guard for `compareAs: 'span'` rows in src/data/metricValues.ts.
 *
 * A span row ranks on the DURATION of a clock range ("7:00 AM–6:00 PM"), which
 * only works while every non-null value in the row actually parses as one. A
 * value the parser rejects does not fail visibly — it drops out of the ranking,
 * and the row keeps tinting a leader chosen from whatever is left. That is the
 * quiet version of the bug this row already had once, when the default numeric
 * reading turned "8:00 AM–5:00 PM" into 800500 and tinted the NARROWEST span as
 * the winner.
 *
 * So: every value parses, and the school the tint lands on is the one with the
 * widest span. Run via `npm run check:spans`.
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const src = readFileSync(resolve(root, 'src/data/metricValues.ts'), 'utf8')

/* Mirrors of Compare.tsx's parsers. Kept as copies deliberately: this check
   exists to catch a value the app cannot rank, so importing the app's parser
   would make a broken parser agree with itself. */
function minutesOf(clock) {
  const m = /^\s*(\d{1,2})(?::(\d{2}))?\s*(AM|PM)\s*$/i.exec(clock)
  if (!m) return null
  const h = Number(m[1])
  const min = m[2] ? Number(m[2]) : 0
  if (h < 1 || h > 12 || min > 59) return null
  const pm = m[3].toUpperCase() === 'PM'
  const h24 = h === 12 ? (pm ? 12 : 0) : pm ? h + 12 : h
  return h24 * 60 + min
}

function spanMinutesOf(v) {
  if (v == null) return null
  const parts = v.split(/[–—-]/)
  if (parts.length !== 2) return null
  const a = minutesOf(parts[0])
  const b = minutesOf(parts[1])
  if (a == null || b == null) return null
  const len = b - a
  return len > 0 ? len : null
}

/* Pull each `compareAs: 'span'` row's key and its values block out of the
   source. A regex rather than a TS import so the check runs with plain node,
   like every other check_*.mjs here. */
const rows = []
const rowRe = /\{\s*topic:\s*'([^']+)',\s*key:\s*'([^']+)',[\s\S]*?\n  \},/g
for (const m of src.matchAll(rowRe)) {
  const body = m[0]
  if (!/compareAs:\s*'span'/.test(body)) continue
  const valuesBlock = /values:\s*\{([\s\S]*?)\n    \},/.exec(body)
  if (!valuesBlock) continue
  const values = {}
  for (const v of valuesBlock[1].matchAll(/'?([a-z-]+)'?:\s*(?:'([^']*)'|null)/g)) {
    values[v[1]] = v[2] === undefined ? null : v[2]
  }
  rows.push({ key: m[2], values })
}

if (rows.length === 0) {
  console.error('✗ no compareAs:\'span\' rows found — the row regex has drifted from the file')
  process.exit(1)
}

let failed = false
for (const row of rows) {
  const parsed = []
  for (const [slug, raw] of Object.entries(row.values)) {
    if (raw == null) continue
    const mins = spanMinutesOf(raw)
    if (mins == null) {
      console.error(`✗ ${row.key} / ${slug}: "${raw}" does not parse as a clock span`)
      console.error('  It would drop out of the ranking silently, leaving the tint to the rest.')
      failed = true
      continue
    }
    parsed.push({ slug, raw, mins })
  }
  if (parsed.length < 2) {
    console.error(`✗ ${row.key}: fewer than two parseable values — nothing to rank`)
    failed = true
    continue
  }
  parsed.sort((a, b) => b.mins - a.mins)
  const [top, next] = parsed
  if (top.mins === next.mins) {
    console.log(`• ${row.key}: widest span is a tie at ${(top.mins / 60).toFixed(1)}h — both tint`)
  } else {
    console.log(
      `✓ ${row.key}: widest is ${top.slug} (${top.raw}, ${(top.mins / 60).toFixed(1)}h), ` +
        `ahead of ${next.slug} (${(next.mins / 60).toFixed(1)}h)`,
    )
  }
  for (const p of parsed) console.log(`    ${p.slug.padEnd(24)} ${p.raw.padEnd(18)} ${(p.mins / 60).toFixed(1)}h`)
}

if (failed) process.exit(1)
console.log('✓ every compareAs:\'span\' value parses and the widest span ranks first')
