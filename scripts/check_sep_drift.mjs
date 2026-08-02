#!/usr/bin/env node
// Separator-drift detector — the blind spot in check_figures.py.
//
// WHY THIS EXISTS. `check_figures.py` NORMALIZES 3-3-3 group separators before
// comparing, so a figure that kept its digits but swapped its separators reads
// as a match: 20,642 -> 20.642, 4.33 -> 4,33, $30,000 -> $30.000. Those are
// still forbidden re-typings — the standing rule is that a figure is copied
// char-for-char from its English source, because a parent matches it against
// the school's own published page.
//
// Found 64 such re-typings across the Italian rollout (2026-08-02) that the
// figure sweep passed clean, and 50 more in a hand-fix pass before that.
//
// THE RULE IT ENFORCES: every numeric token containing a separator (a dot or a
// comma between digits) that appears in a translated `t` field must appear
// VERBATIM somewhere in that entry's English `text`. A token that does not is
// either a re-typing or an invented figure; both are defects.
//
// LAKH/CRORE LOCALES (hi, te). The render layer regroups at DISPLAY time via
// Intl, so the DATA must still carry the English 3-3-3 figure. That makes this
// check MORE important for hi/te, not less: a translator who "helpfully" writes
// $36,83,971 into a work file has hardcoded a regrouping that the render layer
// would then apply a second time. Such a token is absent from the English text
// and is therefore flagged here.
//
// Usage: node scripts/check_sep_drift.mjs --lang hi [--topic sports]

import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const WORK = 'src/data/overlays/work'
const args = process.argv.slice(2)
const argOf = (n) => { const i = args.indexOf(n); return i === -1 ? null : args[i + 1] }
const lang = argOf('--lang')
const topic = argOf('--topic')

if (!lang) {
  console.error('usage: node scripts/check_sep_drift.mjs --lang <code> [--topic <topic>]')
  process.exit(2)
}

// A numeric token that carries an internal separator: 1,234 / 4.33 / 3,683,971
// / 92.39. Anchored on digits both sides so bare punctuation never matches.
const SEP_TOKEN = /\d{1,3}(?:[.,]\d+)+/g

const files = readdirSync(WORK)
  .filter((f) => f.endsWith(`.${lang}.json`))
  .filter((f) => !topic || f.startsWith(`${topic}.`))
  .sort()

if (!files.length) {
  console.error(`no work files for --lang ${lang}${topic ? ` --topic ${topic}` : ''}`)
  process.exit(2)
}

let totalBad = 0
let totalChecked = 0

for (const file of files) {
  const raw = JSON.parse(readFileSync(join(WORK, file), 'utf8'))
  // Both shapes: {strings:[...]} for src/data topics, {sections:[...]} for content.
  const units = raw.strings ?? raw.sections ?? []
  const bad = []

  for (const u of units) {
    const en = u.text ?? ''
    const hi = u.t ?? ''
    if (!hi) continue
    totalChecked++
    const seen = new Set()
    for (const m of hi.matchAll(SEP_TOKEN)) {
      const tok = m[0]
      if (seen.has(tok)) continue
      seen.add(tok)
      // Verbatim presence in the English source is the whole test.
      if (!en.includes(tok)) bad.push({ path: u.path ?? u.key ?? '?', tok, en, hi })
    }
  }

  const mark = bad.length ? '✗' : '✓'
  console.log(`${mark} ${file.padEnd(44)} ${bad.length} drifted`)
  for (const b of bad.slice(0, 12)) {
    console.log(`    ${b.path}`)
    console.log(`      token not in English: ${JSON.stringify(b.tok)}`)
    console.log(`      en: ${b.en.slice(0, 150)}`)
    console.log(`      ${lang}: ${b.hi.slice(0, 150)}`)
  }
  if (bad.length > 12) console.log(`    … and ${bad.length - 12} more`)
  totalBad += bad.length
}

console.log(`\n${totalChecked} translated strings checked · ${totalBad} drifted figure token(s)`)
if (totalBad) {
  console.log('\nEvery figure must be copied char-for-char from its English source.')
  console.log('Separator swaps and lakh/crore regrouping in the DATA are defects —')
  console.log('the render layer localizes presentation, the data never does.')
}
process.exit(totalBad ? 1 : 0)
