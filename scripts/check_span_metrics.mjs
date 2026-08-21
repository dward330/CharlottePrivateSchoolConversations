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
 *   2. A ranking that disagrees with EXPECTED below. Each entry records the
 *      winner(s) a human confirmed by reading the values AND the ranked value
 *      that winner scored when confirmed (`min`). Asserting the VALUE rather
 *      than only the slug is what stops this table rotting: adding a school
 *      that legitimately takes a leader position is a routine event, and it
 *      used to report a correct page as broken.
 *
 * Which gives two exit paths, deliberately split:
 *
 *   - EXIT 1 — a real defect. A value that does not parse; a row with fewer
 *     than two parseable values; a row with no EXPECTED entry at all; or a
 *     winner whose value has fallen BELOW `min`. That last one is the load-
 *     bearing assertion: a leader getting worse is a data regression, and it
 *     is caught whether or not the leader changed.
 *   - EXIT 0 with a labelled NOTICE — a new leader on a plausible number: the
 *     winner is not in `slugs` but its value clears `min`. That is the
 *     added-a-school case, not a bug, so it must not fail the build; the
 *     notice names the old and new leader and asks for a deliberate update
 *     here. Same two-exit-path technique as check_chrome_keys.mjs, for the
 *     same reason: a checker parked at a permanent non-zero stops being read,
 *     which is exactly how `bucket-hbcu` sat red from PR #143 to PR #173 while
 *     two genuine parse failures printed beneath it and went unaddressed.
 *
 * DO NOT "simplify" EXPECTED by deriving the leader from the data. That makes
 * failure mode 2 vacuous — the check would agree with itself unconditionally,
 * the identical trap this file already documents below about not importing the
 * app's parser. The hardening above removes the part that ROTS (the slug)
 * while keeping a human-confirmed assertion (the value).
 *
 * Run via `npm run check:spans`.
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const src = readFileSync(resolve(root, 'src/data/metricValues.ts'), 'utf8')

/* The leader each row should tint, confirmed by reading the values, plus the
   ranked value that leader scored at confirmation. A row whose correct answer
   is "nobody" carries noLead in the data and is not listed.

   `min` is taken from this checker's own printed ranking, not re-derived by
   hand, and it is the EXACT confirmed value rather than a loosened floor:
   these are computed quantities with no measurement noise, so an exact floor
   trips cleanly the moment a leader regresses.

   Slugs go stale (a new school overtakes one — a notice, exit 0); values going
   backwards do not (a regression — exit 1). See the docstring above. */
const EXPECTED = {
  'summer-care-span': { slugs: ['providence-day'], min: 660 },
  'us-organizations': { slugs: ['providence-day'], min: 77 },
  'advanced-courses': { slugs: ['charlotte-country-day'], min: 41 },
  'summer-ages': { slugs: ['charlotte-latin'], min: 14.5 },
  /* range-start returns -start so the earliest opener wins; min is therefore
     NEGATIVE and the >= comparison still reads correctly. Do not "fix" the sign. */
  'program-span': { slugs: ['davidson-day'], min: -2 },
  /* At ceiling (8/8, 17/17) — these can be tied but not overtaken. */
  'bucket-ivy': { slugs: ['providence-day'], min: 1 },
  'bucket-ivyplus': { slugs: ['providence-day'], min: 1 },
  'bucket-nu75': { slugs: ['providence-day'], min: 58 / 75 },
  'bucket-lac75': { slugs: ['providence-day'], min: 43 / 75 },
  'bucket-p4': { slugs: ['providence-day'], min: 57 / 68 },
  /* Was charlotte-country-day (18/107) when written in PR #127; hickory-grove-christian
     arrived in PR #143 with 20/107 and overtook it. The checker reported that correct
     tint as a failure until PR #173 — the staleness this table's `min` now prevents. */
  'bucket-hbcu': { slugs: ['hickory-grove-christian'], min: 20 / 107 },
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
const notices = []
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
  const sameWinners =
    want && winners.length === want.slugs.length && want.slugs.every((w) => winners.includes(w))
  const clearsMin = want && top >= want.min

  if (!want) {
    console.error(`✗ ${row.key}: compareAs:'${row.kind}' but no EXPECTED entry — add its confirmed winner and its value`)
    failed = true
  } else if (!clearsMin) {
    /* The load-bearing assertion. The top value has fallen below what a human
       confirmed — a data regression, whoever holds the lead. */
    console.error(
      `✗ ${row.key}: top value ${Number(top.toFixed(4))} is below the confirmed ${Number(want.min.toFixed(4))} — a leader got WORSE`,
    )
    console.error(`  Leader is ${winners.join(', ')}; confirmed leader was ${want.slugs.join(', ')}.`)
    console.error('  Check the data edit that lowered it before updating min in this file.')
    failed = true
  } else if (!sameWinners) {
    /* A new leader on a plausible number — the added-a-school case. Not a
       failure: exit 0, but say so loudly enough to get the table updated. */
    notices.push(row.key)
    console.log(
      `▲ NOTICE ${row.key}: new leader ${winners.join(', ')} (${Number(top.toFixed(4))}) — was ${want.slugs.join(', ')} (${Number(want.min.toFixed(4))})`,
    )
    console.log(`  The value clears the confirmed minimum, so this reads as a legitimate overtake, not a mis-tint.`)
    console.log(`  Confirm it by reading the values, then update EXPECTED['${row.key}'] in scripts/check_span_metrics.mjs.`)
  } else {
    console.log(`✓ ${row.key} (${row.kind}): ${winners.join(', ')}`)
  }
  for (const p of parsed) {
    const mark = winners.includes(p.slug) ? '★' : ' '
    console.log(`   ${mark} ${p.slug.padEnd(24)} ${p.raw.padEnd(22)} -> ${Number(p.n.toFixed(3))}`)
  }
}

if (failed) process.exit(1)
if (notices.length > 0) {
  console.log(
    `\n▲ ${rows.length} compareAs rows parse and no leader regressed, but ${notices.length} changed leader: ${notices.join(', ')}`,
  )
  console.log('  Not a failure — update EXPECTED so the next real mis-tint is not lost in this notice.')
  process.exit(0)
}
console.log(`\n✓ all ${rows.length} compareAs rows parse and tint their confirmed leader`)
