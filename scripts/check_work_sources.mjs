#!/usr/bin/env node
// Did anything alter the ENGLISH SOURCE inside a work file?
//
// WHY THIS EXISTS. A translation pass edits only the `t` field of each entry.
// The `text` field is the English original and the `of` field is its FNV-1a
// stamp, both written by the extractor. If a pass rewrites, reflows, re-quotes
// or reorders `text`, several bad things follow silently:
//
//   - the shipped overlay's stamp no longer matches the live English, so the
//     entry falls back to English at runtime while coverage still reads 100%
//     (this is the failure check_runtime_resolution.mjs exists to catch, but it
//     runs against the BUILT overlay — this runs against the work file, before
//     the build, where the mistake is cheap to undo)
//   - a reviewer comparing the translation against its original is comparing it
//     against a corrupted original
//   - check_figures.py and check_sep_drift.mjs both diff `t` against `text`, so
//     a corrupted `text` quietly weakens every figure guard
//
// Recomputing the stamp from `text` and comparing it to the stored `of` catches
// all of that in one pass, with no baseline file to keep in sync.
//
// Ran clean across 5,925 entries during the Hindi rollout (nine topics, several
// translated concurrently), which is exactly the evidence wanted before
// building overlays from work files a pass has just rewritten.
//
//   node scripts/check_work_sources.mjs --lang hi

import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { stamp } from './i18n_stamp.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const WORK = join(ROOT, 'src/data/overlays/work')

const args = process.argv.slice(2)
const i = args.indexOf('--lang')
const LANG = i === -1 ? null : args[i + 1]

if (!LANG) {
  console.error('usage: node scripts/check_work_sources.mjs --lang <code>')
  process.exit(2)
}

const files = existsSync(WORK)
  ? readdirSync(WORK).filter((f) => f.includes(`.${LANG}.`) && f.endsWith('.json')).sort()
  : []

if (!files.length) {
  console.error(`✗ no ${LANG} work files in ${WORK} — nothing verified, so this is not a pass`)
  process.exit(1)
}

let checked = 0
let bad = 0

for (const f of files) {
  const data = JSON.parse(readFileSync(join(WORK, f), 'utf8'))
  const units = data.strings ?? data.sections ?? []
  let fileBad = 0
  for (const u of units) {
    if (u.of == null || u.text == null) continue
    checked++
    if (stamp(u.text) === u.of) continue
    fileBad++
    bad++
    if (bad <= 10) {
      console.error(`✗ ${f} · ${u.at?.[0] ?? u.subtopic ?? '?'}`)
      console.error(`    stored ${u.of}, recomputed ${stamp(u.text)}`)
      console.error(`    text: ${String(u.text).slice(0, 110)}`)
    }
  }
  console.log(`${fileBad ? '✗' : '✓'} ${f.padEnd(44)} ${units.length} entries`)
}

console.log(`\n${checked} English source string(s) checked · ${bad} altered`)

if (bad) {
  console.error(
    '\nA work file\'s `text` is the English ORIGINAL and must never be edited —\n' +
    'only `t` changes. Re-extract the topic, or restore `text` from git, before\n' +
    'building overlays: every figure guard diffs `t` against `text`.',
  )
  process.exit(1)
}
