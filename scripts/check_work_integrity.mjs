#!/usr/bin/env node
/**
 * Does each locale's work file still contain that locale's own work?
 *
 * WHY THIS EXISTS. Trinity Episcopal's Phase 2 translated nine locales in
 * parallel, one agent each. They shared one scratchpad directory and several
 * used generic helper-script names, so those scripts overwrote each other
 * mid-run and agents applied siblings' patches to the WRONG locale's files.
 * Measured afterwards: 28 Devanagari entries sitting in high-school-placement.ht
 * and 19 Telugu entries in sports.ht — Hindi and Telugu prose shipped as Kreyòl.
 *
 * Every existing checker passed on that corpus, and none of them could have
 * failed. check_sep_drift compares figures, check_translations compares stamps,
 * check_runtime_resolution compares hashes — none asks the one question that
 * matters here: IS THIS PROSE IN THE RIGHT LANGUAGE? The agents' own
 * verification passed too, which is why a central check is the only kind worth
 * having.
 *
 * Four assertions per entry, all against the git blob the branch started from:
 *
 *   1. `text`, `of`, `at` byte-identical    — these rebuild and drift-check the
 *                                             overlay; a mutation here attaches
 *                                             fluent prose to the wrong original
 *   2. no pre-existing `t` overwritten      — a sibling's patch clobbering real work
 *   3. `strings.length` and `lang` unchanged
 *   4. no foreign script in any `t`
 *
 * ── THE DANDA TRAP ──────────────────────────────────────────────────────────
 * A naive Devanagari range check reports a CLEAN Bangla corpus as thousands of
 * contaminated entries. U+0964/U+0965 (danda, double danda) live in the
 * Devanagari block but are shared punctuation that Bangla, Telugu and Hindi all
 * use normally. The first run of this check produced 5,494 false positives on bn
 * for exactly that reason. The ranges below carve those two codepoints out.
 *
 * ── WHAT THIS CANNOT SEE ────────────────────────────────────────────────────
 * Script detection only catches cross-SCRIPT contamination. It cannot tell
 * Arabic from Farsi (same script), and it cannot tell Spanish from Italian from
 * French from Kreyòl (all Latin). For those pairs a clean run proves nothing —
 * read the prose, or compare the locales against each other for byte-identical
 * translations of the same entry.
 *
 * Usage:
 *   node scripts/check_work_integrity.mjs              # all prose locales
 *   node scripts/check_work_integrity.mjs --lang ht
 *   node scripts/check_work_integrity.mjs --base main  # compare against another ref
 *
 * Exit 0 clean, 1 on any violation, 2 on script error.
 */
import { readFileSync, readdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const WORK = 'src/data/overlays/work'

const args = process.argv.slice(2)
const val = (f, d) => { const i = args.indexOf(f); return i === -1 ? d : args[i + 1] }
const ONLY = val('--lang', null)
const BASE = val('--base', 'HEAD')

/* Parsed from src/lib/i18n.ts rather than hardcoded — the same reason
   check_chrome_keys.mjs re-parses TRANSLATED instead of carrying a copy. */
const i18nSrc = readFileSync(join(ROOT, 'src/lib/i18n.ts'), 'utf8')
const m = i18nSrc.match(/PROSE_TRANSLATED:\s*readonly string\[\]\s*=\s*\[([^\]]*)\]/)
if (!m) {
  console.error('✗ could not parse PROSE_TRANSLATED from src/lib/i18n.ts')
  process.exit(2)
}
const LOCALES = m[1].split(',').map((s) => s.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean)

/* Devanagari MINUS U+0964/U+0965 — see THE DANDA TRAP above. */
const SCRIPTS = {
  deva: /[ऀ-ॣ०-ॿ]/,
  beng: /[ঀ-৿]/,
  telu: /[ఀ-౿]/,
  arab: /[؀-ۿ]/,
}

/** The script a locale's prose is expected to be written in. */
const EXPECTED = { bn: 'beng', hi: 'deva', te: 'telu', fa: 'arab', ar: 'arab' }

/** Locale pairs this check cannot separate, reported so a clean run is not oversold. */
const INDISTINGUISHABLE = [
  ['fa', 'ar', 'both Arabic script'],
  ['es', 'it', 'fr', 'ht', 'all Latin script'],
]

const gitShow = (path) =>
  JSON.parse(execFileSync('git', ['show', `${BASE}:${path}`], {
    encoding: 'utf8', maxBuffer: 1 << 30, cwd: ROOT,
  }))

let violations = 0
const locales = ONLY ? [ONLY] : LOCALES

for (const lang of locales) {
  const files = readdirSync(join(ROOT, WORK))
    .filter((f) => f.endsWith(`.${lang}.json`) && !f.includes('.content.'))
    .sort()

  let compared = 0, added = 0, bad = 0
  const foreign = []

  for (const f of files) {
    const path = `${WORK}/${f}`
    const cur = JSON.parse(readFileSync(join(ROOT, path), 'utf8'))
    let head
    try { head = gitShow(path) } catch { continue }   // new file, nothing to compare

    if (cur.lang !== lang) { console.log(`  ✗ ${f}: lang is "${cur.lang}", expected "${lang}"`); bad++ }
    if (cur.strings.length !== head.strings.length) {
      console.log(`  ✗ ${f}: ${head.strings.length} → ${cur.strings.length} strings`)
      bad++
      continue
    }

    for (let i = 0; i < cur.strings.length; i++) {
      const a = cur.strings[i], b = head.strings[i]
      compared++
      if (a.text !== b.text || a.of !== b.of || JSON.stringify(a.at) !== JSON.stringify(b.at)) {
        if (bad < 5) console.log(`  ✗ ${f}[${i}]: text/of/at mutated`)
        bad++
      }
      if (b.t && a.t !== b.t) {
        if (bad < 5) console.log(`  ✗ ${f}[${i}]: existing translation overwritten`)
        bad++
      }
      if (!b.t && a.t) added++

      if (a.t) {
        for (const [name, re] of Object.entries(SCRIPTS)) {
          if (name === EXPECTED[lang]) continue
          if (re.test(a.t)) foreign.push({ f, i, name, t: a.t })
        }
      }
    }
  }

  for (const x of foreign.slice(0, 5)) {
    console.log(`  ✗ ${x.f}[${x.i}]: ${x.name.toUpperCase()} script in a ${lang} translation`)
    console.log(`      ${JSON.stringify(x.t).slice(0, 96)}`)
  }
  if (foreign.length > 5) console.log(`  … and ${foreign.length - 5} more foreign-script entries`)

  const n = bad + foreign.length
  violations += n
  console.log(
    `${n ? '✗' : '✓'} ${lang.padEnd(4)} ${String(compared).padStart(6)} entries · ` +
    `${String(added).padStart(4)} newly translated · ${n ? `${n} VIOLATION(S)` : 'clean'}`,
  )
}

console.log()

/* fa vs ar share a script, so the scan above cannot separate them — but PERSIAN
   has four letters Arabic does not use (پ چ ژ گ) plus its own ye/kaf. Measured
   on the Trinity corpus: 378 of 466 fa entries carry one, and 0 of 627 ar
   entries do. That asymmetry is a usable signal where glyph-block detection is
   not: Farsi prose landing in an ar file would light this up, and a collapse of
   the fa rate toward zero would mean Arabic landed in fa.
   It is a HEURISTIC, not a proof — short entries that are bare proper nouns
   carry no Persian letters in either locale. Reported, never a hard failure. */
if (locales.includes('fa') && locales.includes('ar')) {
  const PERSIAN = /[پچژگیک]/
  const rate = (lang) => {
    let n = 0, t = 0
    for (const f of readdirSync(join(ROOT, WORK)).filter((x) => x.endsWith(`.${lang}.json`) && !x.includes('.content.'))) {
      for (const s of JSON.parse(readFileSync(join(ROOT, WORK, f), 'utf8')).strings) {
        if (!s.t) continue
        t++
        if (PERSIAN.test(s.t)) n++
      }
    }
    return { n, t }
  }
  const f = rate('fa'), a = rate('ar')
  const faPct = f.t ? (100 * f.n / f.t) : 0
  const arPct = a.t ? (100 * a.n / a.t) : 0
  const ok = faPct > 20 && arPct < 5
  console.log(
    `${ok ? '✓' : '⚠'} fa/ar separation — Persian-only letters in ${f.n}/${f.t} fa ` +
    `(${faPct.toFixed(1)}%) vs ${a.n}/${a.t} ar (${arPct.toFixed(1)}%)`,
  )
  if (!ok) {
    console.log('  Expected fa well above 20% and ar near 0. A collapse means one locale')
    console.log("  was written into the other's files — read the prose before trusting either.")
  }
}

for (const group of INDISTINGUISHABLE) {
  const why = group[group.length - 1]
  const codes = group.slice(0, -1).filter((c) => locales.includes(c))
  if (codes.length > 1) {
    console.log(`ℹ cannot separate ${codes.join('/')} — ${why}. A clean run above does not`)
    console.log('  rule out one of them being written into another; read the prose.')
  }
}

if (violations) {
  console.log(`\n✗ ${violations} violation(s). A work file holds another locale's prose, or`)
  console.log('  its English/stamps were mutated. Restore the affected file from the base ref')
  console.log('  and redo only the entries that were lost — do not re-extract (that blanks it).')
  process.exit(1)
}
console.log('✓ every work file holds its own locale, with English and stamps intact')
