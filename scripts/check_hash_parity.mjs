#!/usr/bin/env node
/**
 * Asserts the build-time and runtime `of` stamps agree.
 *
 * scripts/i18n_stamp.mjs stamps overlays at build time; src/lib/localizeData.ts
 * re-computes the same stamp in the browser to decide whether a translation is
 * still valid for the English it sits beside. If those two implementations ever
 * diverge, EVERY overlay entry reads as stale and the locale silently renders
 * English everywhere — a total, invisible loss of translation with no error.
 *
 * Cheap insurance against that: hash a spread of real-world strings with both
 * and compare. Run in CI and after touching either implementation.
 *
 * Usage: node scripts/check_hash_parity.mjs
 * Exit codes: 0 = identical, 1 = divergence, 2 = script error.
 */
import { stamp as buildStamp } from './i18n_stamp.mjs'
import { stampFor as runtimeStamp } from '../src/lib/localizeData.ts'

const CASES = [
  '',
  'a',
  'Championships',
  'Nine Upper School affinity groups with a documented founding year apiece.',
  // Non-ASCII: curly quotes and accents are everywhere in this research prose,
  // and a charCode-based hash must treat them identically on both sides.
  'the school’s own teams page',
  'Orientación universitaria — ¿cuántas áreas?',
  'Émile · Zoë · naïve — 25 % of students',
  // Long string: exercises the 32-bit overflow path.
  'x'.repeat(5000),
]

let bad = 0
for (const s of CASES) {
  const a = buildStamp(s)
  const b = runtimeStamp(s)
  const ok = a === b
  if (!ok) bad++
  console.log(
    `${ok ? '✓' : '✗'} ${a} ${ok ? '==' : '!='} ${b}  ${JSON.stringify(s).slice(0, 52)}`,
  )
}

if (bad) {
  console.error(
    `\n${bad} divergence(s). The build-time and runtime stamps MUST match, or`
    + `\nevery overlay entry is treated as stale and the locale renders English.`,
  )
  process.exit(1)
}
console.log(`\n✓ build-time and runtime stamps agree across ${CASES.length} cases`)
