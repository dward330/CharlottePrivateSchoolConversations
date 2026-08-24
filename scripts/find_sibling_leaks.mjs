#!/usr/bin/env node
// Within-locale sibling leak detector — the companion to find_english_leaks.mjs.
//
// THE IDEA. find_english_leaks.mjs compares ONE string ACROSS locales: is this
// string that `hi` kept in English one that `es` and `fr` translated? That is a
// good DETECTOR and a poor ADJUDICATOR — proven the hard way on 2026-08-23,
// when triaging its ≤2 band over-reported leaks by 43% (PR #190). The evidence
// it structurally cannot see is how the SAME locale treats the string's
// SIBLINGS in the same rendered card. A locale that keeps a whole class of
// label in Latin is following a convention; a locale that keeps exactly one
// cell of twelve is leaking.
//
// This script looks at that instead. Within ONE locale, it groups entries by
// their parent path — `covenant-day:coverage.facts`, `cannon:cost.fees` — which
// is roughly the unit a reader sees rendered together, and flags a group where
// 1–2 entries are still English while >=3 siblings are translated.
//
// WHY IT REACHES WHERE THE CROSS-LOCALE TOOL CANNOT. find_english_leaks.mjs
// defaults to `--min 2`: it only reports a string if >=2 reference locales
// translated it. A string 7+ of 9 locales keep almost never clears that bar, so
// it never enters that queue at all. Of the 182 distinct strings this detector
// surfaced on its first run, 93 sat in exactly that 7+ band — invisible to the
// other tool by construction, yet a lone English cell among translated
// siblings. The two detectors are deliberately ORTHOGONAL; their union is the
// coverage.
//
// IT IS A REVIEW QUEUE, NOT A DEFECT LIST — the same caveat the sibling tool
// carries, and for the same reason. The first run surfaced obvious correct
// keeps (`Johnson Scholarship, Washington & Lee (2026)`) beside obvious leaks
// (`Relax/Choice Time`, kept while 11 siblings were translated). Triage each;
// record the KEEPs in src/data/overlays/NOTES.md so the decision is documented
// rather than merely implied by absence.
//
// REPORT ONLY — exits 0 ALWAYS, and is deliberately NOT chained into
// `npm run build`. This repo has twice parked a checker at a permanent non-zero
// and watched it stop being read (`check:sepdrift`, `check:live`-at-4,646).
// A review queue that fails a build becomes noise, then becomes ignored.
//
//   node scripts/find_sibling_leaks.mjs --lang es
//   node scripts/find_sibling_leaks.mjs --lang te --max-kept 1 --min-sibs 5 --min-len 25

import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const WORK = 'src/data/overlays/work'
const args = process.argv.slice(2)
const argOf = (n) => { const i = args.indexOf(n); return i === -1 ? null : args[i + 1] }

const LANG = argOf('--lang')
const MAX_KEPT = Number(argOf('--max-kept') ?? 2)
const MIN_SIBS = Number(argOf('--min-sibs') ?? 3)
const MIN_LEN = Number(argOf('--min-len') ?? 15)

if (!LANG) {
  console.error('usage: node scripts/find_sibling_leaks.mjs --lang <code> [--max-kept 2] [--min-sibs 3] [--min-len 15]')
  process.exit(2)
}

const load = (file) => {
  const p = join(WORK, file)
  if (!existsSync(p)) return null
  const raw = JSON.parse(readFileSync(p, 'utf8'))
  return raw.strings ?? raw.sections ?? []
}

// `providence-day:coverage.facts[2].label` -> `providence-day:coverage.facts`
// Strip a trailing [N], then a trailing .field, then a trailing [N] again — so
// both `rows[3].dismissal` and a bare `facts[0]` land on their container.
const parentOf = (path) => path
  .replace(/\[\d+\]$/, '')
  .replace(/\.[^.[\]]+$/, '')
  .replace(/\[\d+\]$/, '')

const topics = [...new Set(
  readdirSync(WORK).filter((f) => f.endsWith(`.${LANG}.json`))
    .map((f) => f.replace(new RegExp(`\\.${LANG}\\.json$`), '')),
)].sort()

if (!topics.length) {
  console.error(`no ${LANG} work files in ${WORK}`)
  process.exit(2)
}

let total = 0
let groupCount = 0
const distinct = new Set()

for (const topic of topics) {
  const mine = load(`${topic}.${LANG}.json`)
  if (!mine) continue

  // Group by (parent path). An entry with several `at` paths belongs to several
  // groups — it renders in each of them, so each card judges it on its own.
  const groups = new Map()
  for (const s of mine) {
    const en = s.text ?? ''
    const t = s.t ?? ''
    if (!en || !t) continue              // never extracted / not yet translated
    for (const path of s.at ?? []) {
      const parent = parentOf(path)
      if (!parent) continue
      if (!groups.has(parent)) groups.set(parent, [])
      groups.get(parent).push({ en, t, path })
    }
  }

  const rows = []
  for (const [parent, entries] of groups) {
    const kept = entries.filter((e) => e.t === e.en)
    const translated = entries.length - kept.length
    if (kept.length < 1 || kept.length > MAX_KEPT) continue
    if (translated < MIN_SIBS) continue

    // Dedupe by English within the group — a string repeated across sibling
    // cells is one review item, not several.
    const seen = new Set()
    const flagged = []
    for (const k of kept) {
      if (!/[a-z]/.test(k.en)) continue   // no lowercase -> an acronym or code
      if (k.en.length < MIN_LEN) continue
      if (seen.has(k.en)) continue
      seen.add(k.en)
      flagged.push(k)
    }
    if (!flagged.length) continue
    rows.push({ parent, flagged, translated, size: entries.length })
  }

  if (!rows.length) continue
  console.log(`\n── ${topic} ──`)
  for (const r of rows.sort((a, b) => a.parent.localeCompare(b.parent))) {
    console.log(`  ${r.parent}  (${r.translated}/${r.size} siblings translated)`)
    for (const f of r.flagged) {
      console.log(`      ${JSON.stringify(f.en.slice(0, 160))}`)
      distinct.add(f.en)
      total += 1
    }
    groupCount += 1
  }
}

console.log(`\n${total} candidate(s) in ${groupCount} group(s) — ${LANG} kept these in English`)
console.log(`while >=${MIN_SIBS} siblings in the same parent path were translated`)
console.log(`(thresholds: --max-kept ${MAX_KEPT} --min-sibs ${MIN_SIBS} --min-len ${MIN_LEN}).`)
console.log(`${distinct.size} distinct string(s).`)
console.log('Each is a REVIEW ITEM, not automatically a defect — a course code, named')
console.log('award, proper noun or unit is legitimately kept even among translated')
console.log('siblings. Record the KEEPs in src/data/overlays/NOTES.md.')
