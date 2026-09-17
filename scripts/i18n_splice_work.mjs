#!/usr/bin/env node
/**
 * Splice a FRESH extraction into the existing per-locale work files, keeping
 * every translation already done.
 *
 * WHY THIS EXISTS. i18n_extract.mjs has no carry-over: it emits `t: ''` for
 * every string, and guardExisting() therefore refuses to overwrite a work file
 * that holds translations (a `--force` re-extract blanks the locale, which is
 * how the Bangla rollout lost eight files). That guard is right, but it leaves
 * no supported way to add a NEW SCHOOL's strings to nine already-translated
 * work files — which is exactly what adding a school to the app requires.
 *
 * The join key is the FNV-1a stamp of the English (`of`), never the array
 * index. Indices renumber whenever a school is inserted into SLUGS, and a
 * drifted index ships fluent prose attached to the wrong original — at 100%
 * coverage, with every check passing.
 *
 * Three outcomes per entry, all reported:
 *
 *   kept     stamp present in both — the existing `t` is preserved verbatim,
 *            and `at` is refreshed from the fresh extract so occurrence lists
 *            pick up the new school's sites for a string it shares.
 *   added    stamp only in the fresh extract — a new string, `t: ''`.
 *   dropped  stamp only in the old work file — its English no longer exists.
 *            Reported per topic and NOT silently discarded from the report,
 *            because a large drop usually means a misconfigured extract rather
 *            than deleted research.
 *
 * Usage:
 *   node scripts/i18n_splice_work.mjs --lang es                 # all topics
 *   node scripts/i18n_splice_work.mjs --lang es --topic sports
 *   node scripts/i18n_splice_work.mjs --lang es --dry-run
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { TOPICS } from './i18n_topics.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const WORK = join(ROOT, 'src/data/overlays/work')

const args = process.argv.slice(2)
const has = (f) => args.includes(f)
const val = (f, d) => { const i = args.indexOf(f); return i === -1 ? d : args[i + 1] }

const LANG = val('--lang', null)
const ONLY = val('--topic', null)
const DRY = has('--dry-run')

if (!LANG) {
  console.error('--lang is required (es, bn, ht, te, fr, fa, it, hi, ar)')
  process.exit(2)
}

/* Extract fresh into a throwaway directory. A throwaway LANG as well as a
   throwaway dir: the extractor names its output `<topic>.<lang>.json`, so
   reusing the real code here would put a blank file where the real one lives
   if --out were ever dropped. */
const TMP = join(ROOT, 'node_modules/.cache/i18n-splice')
rmSync(TMP, { recursive: true, force: true })
mkdirSync(TMP, { recursive: true })

const topics = ONLY ? [ONLY] : Object.keys(TOPICS)
for (const t of topics) {
  execFileSync('node', [
    join(ROOT, 'scripts/i18n_extract.mjs'),
    '--topic', t, '--lang', '__splice', '--out', TMP,
  ], { stdio: 'pipe' })
}

let gAdded = 0, gKept = 0, gDropped = 0
console.log(`splice → ${LANG}\n`)
console.log('TOPIC'.padEnd(24), 'KEPT'.padStart(6), 'ADDED'.padStart(6), 'DROPPED'.padStart(8), 'TOTAL'.padStart(6))

for (const topic of topics) {
  const fresh = JSON.parse(readFileSync(join(TMP, `${topic}.__splice.json`), 'utf8'))
  const dest = join(WORK, `${topic}.${LANG}.json`)

  const prior = existsSync(dest)
    ? JSON.parse(readFileSync(dest, 'utf8'))
    : { topic, lang: LANG, generated: fresh.generated, note: fresh.note, strings: [] }

  const done = new Map((prior.strings ?? []).map((e) => [e.of, e.t]))

  let added = 0, kept = 0
  const strings = fresh.strings.map((e) => {
    const t = done.get(e.of)
    if (t === undefined) { added++; return { ...e, t: '' } }
    if (t) kept++
    // `at` comes from the FRESH extract, so a string a new school shares with
    // an existing one gains its occurrence site without re-translation.
    return { ...e, t }
  })

  const freshHashes = new Set(fresh.strings.map((e) => e.of))
  const dropped = (prior.strings ?? []).filter((e) => !freshHashes.has(e.of)).length

  gAdded += added; gKept += kept; gDropped += dropped
  console.log(
    topic.padEnd(24), String(kept).padStart(6), String(added).padStart(6),
    String(dropped).padStart(8), String(strings.length).padStart(6),
  )

  if (!DRY) {
    writeFileSync(dest, JSON.stringify({ ...prior, topic, lang: LANG, strings }, null, 2) + '\n', 'utf8')
  }
}

console.log(
  '\nTOTAL'.padEnd(25), String(gKept).padStart(6), String(gAdded).padStart(6), String(gDropped).padStart(8),
)
if (DRY) console.log('\n(dry run — nothing written)')
rmSync(TMP, { recursive: true, force: true })
