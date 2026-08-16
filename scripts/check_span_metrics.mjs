#!/usr/bin/env node
/**
 * Guard for every `compareAs` row in src/data/metricValues.ts.
 *
 * These rows opt out of the default numeric reading because that reading ranked
 * them WRONG — it strips punctuation and parses whatever digits remain, so
 * "8:00 AM-5:00 PM" became 800500 and outranked an eleven-hour span, "23 AP +
 * 18 IB" became 2318 and outranked every plain count, and "~45-50" became 4550
 * and outranked 77.
 *
 * Two failure modes are checked:
 *
 *   1. A value the row's parser REJECTS. It does not fail visibly — it drops
 *      out of the ranking and the row keeps tinting a leader chosen from what
 *      is left, which looks authoritative and is not.
 *   2. A ranking that disagrees with EXPECTED below. Those are the winners a
 *      human confirmed by reading the values; if a data edit moves one, that
 *      should be a deliberate update here rather than a silent change on the
 *      page.
 *
 * Run via `npm run check:spans`.
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const src = readFileSync(resolve(root, 'src/data/metricValues.ts'), 'utf8')

/* The leader each row should tint, confirmed by reading the values. A row whose
   correct answer is "nobody" carries noLead in the data and is not listed. */
const EXPECTED = {
  'summer-care-span': ['providence-day'],
  'us-organizations': ['providence-day'],
  'advanced-courses': ['charlotte-country-day'],
  'summer-ages': ['charlotte-latin'],
  'program-span': ['davidson-day'],
  'bucket-ivy': ['providence-day'],
  'bucket-ivyplus': ['providence-day'],
  'bucket-nu75': ['providence-day'],
  'bucket-lac75': ['providence-day'],
  'bucket-p4': ['providence-day'],
  'bucket-hbcu': ['charlotte-country-day'],
}

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
  return b - a > 0 ? b - a : null
}
function sumOf(v) {
  if (v == null) return null
  const nums = v.match(/\d+(?:\.\d+)?/g)
  return nums ? nums.reduce((a, n) => a + Number(n), 0) : null
}
function fractionOf(v) {
  if (v == null) return null
  const m = /(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)/.exec(v)
  if (!m) return null
  const den = Number(m[2])
  return den > 0 ? Number(m[1]) / den : null
}
function agePointOf(part) {
  const t = part.trim()
  if (/^(age\s*)?2$/i.test(t)) return 2
  if (/\b(tk|jrk|jk|pre-?k)\b/i.test(t)) return 4
  if (/\bk(indergarten)?\b/i.test(t) && !/grade/i.test(t)) return 5
  const g = /\b(?:gr(?:ade)?\.?\s*)(\d{1,2})\b/i.exec(t)
  if (g) return Number(g[1]) + 5
  const plain = /(\d{1,2}(?:\.\d)?)/.exec(t)
  return plain ? Number(plain[1]) : null
}
function rangeEndsOf(v) {
  if (v == null) return null
  const parts = v.split(/[–—]|(?<=\d)\s*-\s*(?=\d)/)
  if (parts.length !== 2) return null
  const a = agePointOf(parts[0])
  const b = agePointOf(parts[1])
  if (a == null || b == null) return null
  return [a, b]
}
function numericOf(v) {
  if (v == null) return null
  const n = parseFloat(String(v).replace(/[^0-9.-]/g, ''))
  return Number.isFinite(n) ? n : null
}
function rankValueOf(kind, raw) {
  switch (kind) {
    case 'span':
      return spanMinutesOf(raw)
    case 'sum':
      return sumOf(raw)
    case 'fraction':
      return fractionOf(raw)
    case 'range-width': {
      const e = rangeEndsOf(raw)
      return e ? e[1] - e[0] : null
    }
    case 'range-start': {
      const e = rangeEndsOf(raw)
      return e ? -e[0] : null
    }
    case 'range-mid': {
      const e = rangeEndsOf(raw)
      return e ? (e[0] + e[1]) / 2 : numericOf(raw)
    }
    default:
      return null
  }
}

/* Pull each compareAs row's key, kind and values out of the source. A regex
   rather than a TS import so the check runs with plain node, like every other
   check_*.mjs here. */
const rows = []
const rowRe = /\n  \{\n(?:.*\n)*?  \},/g
for (const m of src.matchAll(rowRe)) {
  const body = m[0]
  const kind = /\n    compareAs:\s*'([^']+)'/.exec(body)?.[1]
  if (!kind) continue
  const key = /\n    key:\s*'([^']+)'/.exec(body)?.[1]
  const vb = /\n    values:\s*\{\n((?:.*\n)*?)    \},/.exec(body)
  if (!key || !vb) continue
  const values = {}
  for (const v of vb[1].matchAll(/^\s*'?([a-z0-9-]+)'?:\s*(?:'((?:[^'\\]|\\.)*)'|null)/gm)) {
    values[v[1]] = v[2] === undefined ? null : v[2]
  }
  rows.push({ key, kind, values })
}

if (rows.length === 0) {
  console.error("✗ no compareAs rows found — the row regex has drifted from the file")
  process.exit(1)
}

let failed = false
for (const row of rows) {
  const parsed = []
  for (const [slug, raw] of Object.entries(row.values)) {
    if (raw == null) continue
    const n = rankValueOf(row.kind, raw)
    if (n == null) {
      console.error(`✗ ${row.key} / ${slug}: "${raw}" does not parse as ${row.kind}`)
      console.error('  It would drop out of the ranking silently, leaving the tint to the rest.')
      failed = true
      continue
    }
    parsed.push({ slug, raw, n })
  }
  if (parsed.length < 2) {
    console.error(`✗ ${row.key}: fewer than two parseable values — nothing to rank`)
    failed = true
    continue
  }
  parsed.sort((a, b) => b.n - a.n)
  const top = parsed[0].n
  const winners = parsed.filter((p) => p.n === top).map((p) => p.slug)
  const want = EXPECTED[row.key]
  const ok = want && winners.length === want.length && want.every((w) => winners.includes(w))

  if (!want) {
    console.error(`✗ ${row.key}: compareAs:'${row.kind}' but no EXPECTED entry — add its confirmed winner`)
    failed = true
  } else if (!ok) {
    console.error(`✗ ${row.key}: tints ${winners.join(', ')} — expected ${want.join(', ')}`)
    failed = true
  } else {
    console.log(`✓ ${row.key} (${row.kind}): ${winners.join(', ')}`)
  }
  for (const p of parsed) {
    const mark = winners.includes(p.slug) ? '★' : ' '
    console.log(`   ${mark} ${p.slug.padEnd(24)} ${p.raw.padEnd(22)} -> ${Number(p.n.toFixed(3))}`)
  }
}

if (failed) process.exit(1)
console.log(`\n✓ all ${rows.length} compareAs rows parse and tint their confirmed leader`)
