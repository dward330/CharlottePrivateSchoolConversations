#!/usr/bin/env node
// Cross-locale English-leak diff — the highest-yield review tool in the i18n kit.
//
// THE IDEA. A string the new locale left identical to English is SUSPICIOUS
// exactly when other, already-reviewed locales DID translate it. Two
// independently-reviewed locales agreeing that a string is prose is far
// stronger evidence than any heuristic about what "looks like" an identifier —
// and it requires no judgement about the new language at all.
//
// TRACK RECORD. Written during the Italian rollout, where it found 167 leaks
// the eye had caught only 2 of. Rerun for Hindi: 163 review items across two
// passes, 62 of them genuine leaks (month abbreviations inside dates, grade-band
// ordinals, am/pm clock markers, "Gr N" grade tags, and descriptive labels like
// `enrichment` / `Specials` / `Structured Literacy`).
//
// IT IS A REVIEW QUEUE, NOT A DEFECT LIST. Plenty of hits are correct: units
// that must never be converted (sq ft), course codes a family matches against a
// published catalog, proper nouns, named awards, source domains. Triage each
// one; record the KEEPS somewhere durable so the decision is documented rather
// than merely implied by absence.
//
//   node scripts/find_english_leaks.mjs --lang hi
//   node scripts/find_english_leaks.mjs --lang hi --refs es,fr,it --min 2

import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const WORK = 'src/data/overlays/work'
const args = process.argv.slice(2)
const argOf = (n) => { const i = args.indexOf(n); return i === -1 ? null : args[i + 1] }

const LANG = argOf('--lang')
// Every other shipped prose locale is a reference by default. `hi` and `ar` were
// silently absent from this list, so their agreement never counted — which is how
// 35 `ar` findings hid twice over. Keep this in sync with PROSE_TRANSLATED.
const ALL_LOCALES = 'es,bn,ht,te,fr,fa,it,hi,ar'
const REFS = (argOf('--refs') ?? ALL_LOCALES).split(',').filter((l) => l !== LANG)
const MIN = Number(argOf('--min') ?? 2)

if (!LANG) {
  console.error('usage: node scripts/find_english_leaks.mjs --lang <code> [--refs a,b,c] [--min 2]')
  process.exit(2)
}

const load = (file) => {
  const p = join(WORK, file)
  if (!existsSync(p)) return null
  const raw = JSON.parse(readFileSync(p, 'utf8'))
  return raw.strings ?? raw.sections ?? []
}

const topics = [...new Set(
  readdirSync(WORK).filter((f) => f.endsWith(`.${LANG}.json`))
    .map((f) => f.replace(new RegExp(`\\.${LANG}\\.json$`), '')),
)].sort()

if (!topics.length) {
  console.error(`no ${LANG} work files in ${WORK}`)
  process.exit(2)
}

let total = 0
for (const topic of topics) {
  const mine = load(`${topic}.${LANG}.json`)
  if (!mine) continue

  const refMaps = {}
  for (const l of REFS) {
    const u = load(`${topic}.${l}.json`)
    if (!u) continue
    const m = new Map()
    for (const s of u) if (s.text != null) m.set(s.text, s.t ?? '')
    refMaps[l] = m
  }

  const rows = []
  for (const s of mine) {
    const en = s.text ?? ''
    const t = s.t ?? ''
    if (!en || !t || t !== en) continue   // untranslated or genuinely translated
    // NO CAPS SKIP. A `!/[a-z]/.test(en)` filter used to live here on the theory
    // that an all-caps string is an acronym or code. It is not: ALL-CAPS SECTION
    // HEADINGS are prose (`AVERAGE IS NOT MEDIAN`, `HOW AID IS FUNDED`), and the
    // skip hid 66 strong-consensus leaks from three separate triage passes. Shape
    // cannot separate `SEMIFINAL` (prose) from `JUN–AUG` (a code) — they are
    // structurally identical — so CONSENSUS is the discriminator instead: raise
    // `--min` to filter, never a shape test. See .claude/plans/capsleaks.md.

    const by = []
    for (const [l, m] of Object.entries(refMaps)) {
      const rt = m.get(en)
      if (rt && rt !== en) by.push(l)
    }
    if (by.length >= MIN) rows.push({ path: s.at?.[0] ?? s.subtopic ?? '?', en, by })
  }

  if (!rows.length) continue
  console.log(`\n── ${topic} ──`)
  for (const r of rows.sort((a, b) => a.en.localeCompare(b.en))) {
    console.log(`  [${r.by.join(',')}] ${r.path}`)
    console.log(`      ${JSON.stringify(r.en.slice(0, 160))}`)
  }
  total += rows.length
}

console.log(`\n${total} string(s) ${LANG} kept in English that >=${MIN} reference locale(s) translated.`)
console.log(`Reference locales present: ${REFS.join(', ')}`)
console.log('Each is a REVIEW ITEM, not automatically a defect — units, course')
console.log('codes, proper nouns and named awards are legitimately kept.')
