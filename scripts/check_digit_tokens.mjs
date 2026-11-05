#!/usr/bin/env node
// Digit-token parity — the blind spot shared by check_figures.py and
// check:sepdrift.
//
// WHY THIS EXISTS. Both existing figure checks ask "is this figure present?",
// never "did any figure change?". check_figures.py normalizes before comparing
// and check:sepdrift only inspects separator-bearing tokens, so three
// re-typings in the Hickory Grove rollout (PR #423) passed both:
//   - a date reordered:      11/17/25 -> 17/11/25
//   - a clock re-typed:      4 and 6 p.m. -> 16 h et 18 h
//   - a count spelled out:   13 by title -> ثلاثة عشر (ar)
// Each was caught only by a throwaway script comparing the NUMBERS in a
// translation against the numbers in its English.
//
// THE RULE IT REPORTS: the multiset of atomic numeric tokens in a translated
// `t` should equal the multiset in its English `text`. A token is a run of
// digits with internal . , : / joining more digits (`3,683,971`, `4.33`,
// `11/17/25`, `7:30`). Ranges are split at – and - (`9:30–11:00` gives `9:30` and
// `11:00`), because "de 9:30 a 11:00" keeps every figure.
// See memory note figure-checker-tokenizer-false-positives: a greedy tokenizer
// flagged 111 of 113 sound translations.
//
// WHY A REPORT, SCOPED TO NEW WORK. Over every shipped translation this flags
// ~1,000 strings, and the large majority are deliberate and native-reviewed:
// `Grade 6` -> "Sexto", `9:30` -> fr `9h30`, `1:30 p.m.` -> it `13:30`,
// `1.5-hour` -> `90 minuti`. A gate parked at that count would stop being read,
// as CLAUDE.md records three times. So by default the check compares only
// units whose stamp is NEW relative to a git base (default `main`). Those are
// the translations a rollout just wrote, before any reviewer has seen them. It
// always exits 0; each finding is a prompt to look, and a legitimate
// rewording is simply left as it is.
//
// Usage:
//   npm run check:digits                       # units new since main, all locales
//   npm run check:digits -- --base <ref>       # e.g. the commit before a rollout
//   npm run check:digits -- --lang fa --topic admissions
//   npm run check:digits -- --all              # audit every shipped unit

import { readFileSync, readdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join } from 'node:path'

const WORK = 'src/data/overlays/work'
const args = process.argv.slice(2)
const argOf = (n) => { const i = args.indexOf(n); return i === -1 ? null : args[i + 1] }
const lang = argOf('--lang')
const topic = argOf('--topic')
const base = argOf('--base') ?? 'main'
const all = args.includes('--all')

const TOKEN = /\d+(?:[.,:/]\d+)*/g
const tokens = (s) => {
  const m = new Map()
  for (const t of s.match(TOKEN) ?? []) m.set(t, (m.get(t) ?? 0) + 1)
  return m
}
// Tokens in `a` beyond their count in `b`.
const minus = (a, b) => {
  const out = []
  for (const [t, n] of a) for (let i = (b.get(t) ?? 0); i < n; i++) out.push(t)
  return out
}

// Stamps already present at the base ref, so only new work is compared.
const baseStamps = (file) => {
  try {
    const raw = execFileSync('git', ['show', `${base}:${WORK}/${file}`],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 1 << 28 })
    return new Set(JSON.parse(raw).strings.map((s) => s.of))
  } catch {
    return new Set() // file is new at this ref: every unit is new work
  }
}

const files = readdirSync(WORK).filter((f) => {
  const m = f.match(/^(.+)\.([a-z]{2})\.json$/)
  return m && (!lang || m[2] === lang) && (!topic || m[1] === topic)
})
if (!files.length) {
  console.error(`no work files match --lang ${lang ?? '*'} --topic ${topic ?? '*'}`)
  process.exit(2)
}

let checked = 0
const findings = []
for (const f of files.sort()) {
  const strings = JSON.parse(readFileSync(join(WORK, f), 'utf8')).strings ?? []
  const old = all ? null : baseStamps(f)
  for (const s of strings) {
    if (!s.t || (old && old.has(s.of))) continue
    checked++
    const en = tokens(s.text), tr = tokens(s.t)
    const missing = minus(en, tr), extra = minus(tr, en)
    if (missing.length || extra.length) findings.push({ f, s, missing, extra })
  }
}

const scope = all ? 'every shipped unit' : `units new since ${base}`
for (const { f, s, missing, extra } of findings) {
  console.log(`⚠ ${f} · ${s.at[0]} (${s.of})`)
  if (missing.length) console.log(`    missing from t: ${missing.join('  ')}`)
  if (extra.length) console.log(`    only in t:      ${extra.join('  ')}`)
  console.log(`    en: ${s.text.slice(0, 110)}`)
  console.log(`    t:  ${s.t.slice(0, 110)}`)
}
console.log(`\ncheck:digits — ${checked} translated unit(s) compared (${scope}) · ${findings.length} to review`)
if (findings.length) {
  console.log('Report only (exit 0). A re-typed, dropped or reordered figure is a defect: copy it')
  console.log('char-for-char from the English. A deliberate rewording (Grade 6 -> "Sexto") can stay.')
}
