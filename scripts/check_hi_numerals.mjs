#!/usr/bin/env node
/**
 * Hindi work files: Western digits only, and no lakh/crore regrouping in DATA.
 *
 * TWO RULES, both hi-specific, both invisible to every other checker.
 *
 * 1. NO DEVANAGARI DIGITS (०१२३४५६७८९, U+0966–U+096F).
 *
 *    Same reasoning as Bangla (§4.1 of its rollout doc) and Farsi: every number
 *    in this corpus is either a checkable citation a family matches against the
 *    school's own English page — tuition tables, Wayback timestamps, SAT
 *    scores, "2026–27" — or a figure localizeMoneyText() formats and which
 *    expects Western digits.
 *
 *    Hindi is LESS likely to drift here than Bangla was, because
 *    Intl.NumberFormat('hi') already emits Western digits, so the render layer
 *    never produces a Devanagari numeral to be inconsistent with. But a
 *    translator writing prose by hand can still type कक्षा ९ for "Grade 9", and
 *    that would sit beside a Western-digit rendered figure on the same line.
 *
 *    This is a CONSISTENCY rule for a citation-heavy corpus, not a claim about
 *    the language: Hindi writes both, and a reader would not find ९ wrong in
 *    isolation. See .claude/docs/prose-translation-hi.md §0.
 *
 * 2. NO LAKH/CRORE REGROUPING IN THE DATA.
 *
 *    `hi` is deliberately NOT in FIGURE_SAFE_NUMBERS, so Intl regroups figures
 *    to the Indian system at RENDER time: $3,683,971 displays as $36,83,971.
 *    That is the wanted behaviour — and it means the DATA must still carry the
 *    English 3-3-3 figure, or the regrouping is applied to an already-regrouped
 *    number.
 *
 *    A 2-2-3 shaped token (##,##,### — two digits, comma, two digits, comma,
 *    three digits) in a `t` field is therefore always a defect: either a
 *    translator pre-applied the grouping, or they re-typed the figure. Neither
 *    is allowed; figures are copied char-for-char from the English source.
 *
 *    This is the exact inverse of check_bn_numerals.mjs, which asserts that
 *    FIGURE_SAFE locales RENDER 3-3-3. Hindi renders 2-2-3 by design and must
 *    STORE 3-3-3. Keeping the two straight matters: the same shape is a bug in
 *    one place and correct in the other.
 *
 * Exits 1 on any hit, so it can gate the build.
 *
 *   node scripts/check_hi_numerals.mjs
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const WORK = join(ROOT, 'src/data/overlays/work')

const DEV_DIGITS = /[०-९]/
/** Indian 2-2-3 grouping: 36,83,971 / 12,34,56,789 — never valid in stored data. */
const LAKH_GROUPED = /\d{1,2},\d{2},\d{3}(?![\d,])/

/** Walk any nested shape and yield [path, string]. */
function* strings(node, path = '') {
  if (typeof node === 'string') yield [path, node]
  else if (Array.isArray(node)) {
    for (const [i, v] of node.entries()) yield* strings(v, `${path}[${i}]`)
  } else if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) yield* strings(v, path ? `${path}.${k}` : k)
  }
}

const files = existsSync(WORK)
  ? readdirSync(WORK).filter((f) => f.includes('.hi.') && f.endsWith('.json'))
  : []

if (!files.length) {
  console.log('no Hindi work files yet — nothing to check')
  process.exit(0)
}

let digitHits = 0
let groupHits = 0

for (const f of files) {
  const data = JSON.parse(readFileSync(join(WORK, f), 'utf8'))
  for (const [path, value] of strings(data)) {
    // Only the translation field matters; the English source is not ours to police.
    if (!/(^|\.)t$/.test(path)) continue

    if (DEV_DIGITS.test(value)) {
      digitHits++
      console.error(`✗ Devanagari digit · ${f} · ${path}`)
      console.error(`    ${value.slice(0, 120)}`)
    }
    if (LAKH_GROUPED.test(value)) {
      groupHits++
      console.error(`✗ lakh/crore grouping in DATA · ${f} · ${path}`)
      console.error(`    ${value.slice(0, 120)}`)
    }
  }
}

if (digitHits || groupHits) {
  if (digitHits) {
    console.error(`\n${digitHits} string(s) use Devanagari digits.`)
    console.error('Every figure in this corpus stays in Western digits — see the header.')
  }
  if (groupHits) {
    console.error(`\n${groupHits} string(s) carry lakh/crore grouping in the DATA.`)
    console.error('Store the English 3-3-3 figure; the render layer regroups via Intl.')
  }
  process.exit(1)
}

console.log(`✓ ${files.length} Hindi work file(s): Western digits, no pre-applied lakh/crore grouping`)
