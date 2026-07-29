#!/usr/bin/env node
/**
 * Bangla work files must never use Bangla-script digits (০১২৩৪৫৬৭৮৯).
 *
 * Settled in .claude/docs/prose-translation-bn.md §4.1. Every number in this
 * corpus is either a checkable citation a family matches against the school's
 * own English page — tuition tables, Wayback timestamps, SAT scores, `2026–27`
 * — or a figure `localizeMoneyText()` formats and which expects Western digits.
 *
 * This is a CONSISTENCY rule for a citation-heavy corpus, not a claim about
 * the language: Bangladeshi Bangla uses both numeral systems in practice. The
 * Phase 0 spike drifted into Bangla digits twice while every dollar figure on
 * the same page stayed Western, which is precisely the failure this catches.
 *
 * Exits 1 on any hit, so it can gate the build.
 *
 *   node scripts/check_bn_numerals.mjs
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const WORK = join(ROOT, 'src/data/overlays/work')
const BN_DIGITS = /[০-৯]/

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
  ? readdirSync(WORK).filter((f) => f.includes('.bn.') && f.endsWith('.json'))
  : []

if (!files.length) {
  console.log('no Bangla work files yet — nothing to check')
  process.exit(0)
}

let hits = 0
for (const f of files) {
  const data = JSON.parse(readFileSync(join(WORK, f), 'utf8'))
  for (const [path, value] of strings(data)) {
    // Only the translation field matters; English source is not ours to police.
    if (!/(^|\.)t$/.test(path)) continue
    if (!BN_DIGITS.test(value)) continue
    hits++
    console.error(`✗ ${f} · ${path}`)
    console.error(`    ${value.slice(0, 100)}`)
  }
}

if (hits) {
  console.error(
    `\n${hits} translation(s) use Bangla-script digits.\n` +
      'Use Western digits — see prose-translation-bn.md §4.1.',
  )
  process.exit(1)
}
console.log(`✓ no Bangla-script digits across ${files.length} work file(s)`)

/* ------------------------------------------------------------------ render --
 * The data being clean is not enough: the RENDER layer can rewrite a figure the
 * data layer stores correctly. Two defects, both found by print-outs after this
 * checker had already passed, both invisible outside a browser:
 *
 *   1. `Intl.NumberFormat('bn')` emits Bangla digits    → ৩৬,৩২৫
 *   2. `bn` groups by the Indian system (lakh/crore)    → 36,83,971
 *
 * The second hides below six digits, which is why fixing only the first looked
 * complete. Both break the same rule: these are citations a family matches
 * against the school's own English document, so the figure's digits AND its
 * shape have to survive.
 *
 * Asserted against a 7-digit number, and by mirroring format.ts's actual logic
 * rather than grepping for a magic string — the previous version of this check
 * grepped for a subtag, which meant it kept passing when the subtag was still
 * present but no longer sufficient.
 */
// 3,683,971 — 7 digits, so 3-3-3 and lakh/crore grouping disagree. A 5-digit
// sample (the old one) formats identically either way and proves nothing.
const SAMPLE = 3683971
const EXPECTED = '3,683,971'

// Imports the SHIPPED rule rather than restating it, so this cannot drift from
// what the app does. figureLocale.ts is dependency-free precisely so plain Node
// can load it — format.ts pulls in i18n.ts, whose `import.meta.glob` throws
// outside Vite.
const { FIGURE_SAFE_NUMBERS, numberLocale } = await import(
  pathToFileURL(join(ROOT, 'src/lib/figureLocale.ts')).href
).catch(() => ({}))

if (numberLocale) {
  let bad = 0
  for (const loc of ['bn', ...FIGURE_SAFE_NUMBERS.filter((l) => l !== 'bn')]) {
    const rendered = new Intl.NumberFormat(numberLocale(loc), { useGrouping: 'always' })
      .format(SAMPLE)
    const naive = new Intl.NumberFormat(loc, { useGrouping: 'always' }).format(SAMPLE)

    if (BN_DIGITS.test(rendered)) {
      console.error(`\n✗ ${loc}: figures render non-Western digits — ${rendered}`)
      bad++
    } else if (rendered !== EXPECTED) {
      console.error(
        `\n✗ ${loc}: grouping is not 3-3-3 — got ${rendered}, expected ${EXPECTED}.\n` +
          '  A regrouped figure no longer matches the source document it cites.',
      )
      bad++
    } else {
      console.log(
        `✓ figures are source-shaped for ${loc} (${rendered}` +
          (naive === rendered ? ')' : `, not ${naive})`),
      )
    }
  }
  if (bad) process.exit(1)
}
