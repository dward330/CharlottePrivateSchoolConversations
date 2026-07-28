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
