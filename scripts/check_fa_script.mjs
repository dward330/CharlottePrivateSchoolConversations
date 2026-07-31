#!/usr/bin/env node
/**
 * Farsi work files: Western digits only, and ZWNJ where Persian requires it.
 *
 * TWO SEPARATE RULES, both fa-specific, both invisible in a diff.
 *
 * 1. NO EASTERN ARABIC / PERSIAN DIGITS (۰۱۲۳۴۵۶۷۸۹, U+06F0–U+06F9, and the
 *    Arabic-Indic U+0660–U+0669).
 *
 *    Settled 2026-07-30, same reasoning as Bangla: every number in this corpus
 *    is either a checkable citation a family matches against the school's own
 *    English page — tuition tables, Wayback timestamps, SAT scores, "2026–27" —
 *    or a figure localizeMoneyText() formats and which expects Western digits.
 *    `fa` is in FIGURE_SAFE_NUMBERS for exactly this reason, so a Persian-digit
 *    string in an overlay would sit beside a Western-digit rendered figure on
 *    the same line.
 *
 *    This is a CONSISTENCY rule for a citation-heavy corpus, not a claim about
 *    the language: Persian normally writes ۱۴۰۳ and a reader would not find it
 *    wrong in isolation. See .claude/docs/prose-translation-fa.md §0a.
 *
 * 2. ZWNJ INTEGRITY (U+200C ZERO WIDTH NON-JOINER).
 *
 *    Persian needs it in extremely common constructions — the continuous verb
 *    prefix (می‌شود), plurals of compounds (برنامه‌ها), and compound nouns
 *    (دانش‌آموز). Without it the cursive letters wrongly JOIN and the word is
 *    misspelled, not merely informal. Verified in Chromium that Noto Naskh
 *    Arabic honours it (307px vs 276px for the same string), so this is a real
 *    rendered difference a reader sees.
 *
 *    It is zero-width, so a dropped ZWNJ is invisible in review and in every
 *    other checker. This flags the highest-frequency shapes where it is
 *    mandatory and absent.
 *
 * Exits 1 on any hit, so it can gate the build.
 *
 *   node scripts/check_fa_script.mjs
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const WORK = join(ROOT, 'src/data/overlays/work')

/** Persian (U+06Fx) and Arabic-Indic (U+066x) digits. */
const EASTERN_DIGITS = /[۰-۹٠-٩]/
const ZWNJ = '‌'

/**
 * Constructions where Persian orthography requires a ZWNJ, written here WITHOUT
 * one. A match means the non-joiner was dropped.
 *
 * Deliberately a short, high-confidence list rather than a general rule: Persian
 * ZWNJ placement has genuine optional cases, and a checker that flags those
 * would train the reader to ignore it.
 */
const MISSING_ZWNJ = [
  [/می(?=‌?[ب-ی])(?!‌)‌?(?=\S)(?:شود|رود|کند|شد|باشد|گیرد|دهد|آید)/g,
    'continuous prefix می + verb needs ZWNJ (می‌شود)'],
  [/دانش(?!‌)آموز/g, 'دانش‌آموز needs ZWNJ'],
  [/برنامه(?!‌)ها/g, 'برنامه‌ها needs ZWNJ'],
  [/هزینه(?!‌)ها/g, 'هزینه‌ها needs ZWNJ'],
  [/کمک(?!‌)هزینه/g, 'کمک‌هزینه needs ZWNJ'],
]

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
  ? readdirSync(WORK).filter((f) => f.includes('.fa.') && f.endsWith('.json'))
  : []

if (!files.length) {
  console.log('no Farsi work files yet — nothing to check')
  process.exit(0)
}

let digitHits = 0
let zwnjHits = 0
let scanned = 0

for (const f of files) {
  const data = JSON.parse(readFileSync(join(WORK, f), 'utf8'))
  for (const [path, value] of strings(data)) {
    // Only the translation field matters; English source is not ours to police.
    if (!/(^|\.)t$/.test(path)) continue
    scanned++

    if (EASTERN_DIGITS.test(value)) {
      digitHits++
      console.error(`✗ EASTERN DIGITS  ${f} · ${path}`)
      console.error(`    ${value.slice(0, 110)}`)
    }
    for (const [re, why] of MISSING_ZWNJ) {
      re.lastIndex = 0
      if (re.test(value)) {
        zwnjHits++
        console.error(`✗ MISSING ZWNJ    ${f} · ${path}  — ${why}`)
        console.error(`    ${value.slice(0, 110)}`)
        break
      }
    }
  }
}

if (digitHits || zwnjHits) {
  console.error(
    `\n✗ ${digitHits} Eastern-digit and ${zwnjHits} missing-ZWNJ string(s) across ${files.length} file(s).\n` +
    'Digits: figures are citations and stay Western (fa is in FIGURE_SAFE_NUMBERS).\n' +
    'ZWNJ:   a dropped non-joiner is a misspelling, and it is invisible in review.',
  )
  process.exit(1)
}

console.log(`✓ no Eastern-Arabic digits across ${files.length} Farsi work file(s) (${scanned} strings)`)
console.log('✓ ZWNJ present in the constructions that require it')
