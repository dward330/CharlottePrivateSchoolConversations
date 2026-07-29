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
 * The data being clean is not enough. `Intl.NumberFormat('bn')` emits Bangla
 * digits BY DEFAULT, so a page whose every stored string is Western can still
 * render ৩৬,৩২৫ — which is exactly what a print-out caught after this checker
 * had passed. src/lib/format.ts pins `-u-nu-latn` to prevent it; this asserts
 * the pin is still there, because the failure is silent and only visible in a
 * browser.
 */
const FORMAT = join(ROOT, 'src/lib/format.ts')
if (existsSync(FORMAT)) {
  // Strip comments first: the explanation of WHY the subtag exists also contains
  // the subtag, so a plain includes() passes even after the code is reverted.
  const src = readFileSync(FORMAT, 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '')
  if (!src.includes('-u-nu-latn')) {
    console.error(
      '\n✗ src/lib/format.ts no longer pins the numbering system.\n' +
        '  Intl.NumberFormat("bn") defaults to Bangla digits (০১২৩), so money()\n' +
        '  and number() would render figures the data layer stores as Western.\n' +
        '  Restore the `-u-nu-latn` subtag in lang().',
    )
    process.exit(1)
  }

  // Prove it at runtime rather than trusting the grep.
  const rendered = new Intl.NumberFormat('bn-u-nu-latn', {
    style: 'currency', currency: 'USD', maximumFractionDigits: 0,
  }).format(36325)
  if (BN_DIGITS.test(rendered)) {
    console.error(`\n✗ bn currency still renders Bangla digits: ${rendered}`)
    process.exit(1)
  }
  console.log(`✓ render layer pins Western digits (bn → ${rendered})`)
}
