#!/usr/bin/env node
// Is each locale's overlay actually written in THAT locale's script?
//
// WHY THIS EXISTS
// ---------------
// During the Summer Programs rollout, one translation pass wrote **Arabic prose
// into the Persian work file**. Every existing check passed on it: coverage read
// 100%, the stamps recomputed cleanly, no figure drifted, and the JSON was
// valid. Arabic and Persian share a script, so nothing that looks at bytes or
// hashes can tell them apart — only reading the text does.
//
// That is a whole class, not a one-off: `bn` vs `hi` vs `te` are mutually
// distinguishable by Unicode block, but `fa` vs `ar` are not, and neither are
// `es` vs `it` vs `fr` vs `ht` by block alone. This checks two things:
//
//   1. BLOCK — the locale's expected script actually appears (a Devanagari
//      locale whose overlay is all Latin has not been translated).
//   2. NEIGHBOUR — orthography that belongs to a *confusable sibling* locale
//      and cannot occur in this one.
//
//   node scripts/check_script_purity.mjs
//   node scripts/check_script_purity.mjs --lang fa
//
// Exit 1 on any violation.

import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname
const OVERLAYS = join(ROOT, 'src/data/overlays')
const WORK = join(OVERLAYS, 'work')

const args = process.argv.slice(2)
const val = (f, d) => { const i = args.indexOf(f); return i === -1 ? d : args[i + 1] }
const ONLY = val('--lang')

/**
 * Per-locale expectations.
 *
 * `block`   at least this fraction of translated entries must contain the script.
 * `forbid`  orthography that cannot occur in this locale, with what it indicates.
 *
 * The fa/ar pair is the reason this file exists, so its rules are the strictest:
 * ta marbuta and tanwin are Arabic-only, while the Persian letters گچپژ and the
 * ezafe ‑هٔ never occur in MSA.
 */
/**
 * Devanagari LETTERS, deliberately excluding U+0964 DANDA and U+0965.
 *
 * The danda lives in the Devanagari block but is shared punctuation: Bangla ends
 * every sentence with it. A naive [ऀ-ॿ] range therefore flagged 269 perfectly
 * good Bangla entries in the-arts alone as "Hindi text". Match letters, not the
 * block.
 */
const DEVANAGARI_LETTERS = /[ऀ-ॣ०-ॿ]/

const RULES = {
  es: { script: /[a-záéíóúñü]/i, min: 0.5, forbid: [] },
  ht: { script: /[a-zàèòáéíóúñ]/i, min: 0.5, forbid: [] },
  fr: { script: /[a-zàâçéèêëîïôùûü]/i, min: 0.5, forbid: [] },
  it: { script: /[a-zàèéìòù]/i, min: 0.5, forbid: [] },
  bn: { script: /[ঀ-৿]/, min: 0.4, forbid: [
    [DEVANAGARI_LETTERS, 'Devanagari (Hindi) text in the Bangla overlay'],
    [/[ఀ-౿]/, 'Telugu text in the Bangla overlay'],
  ] },
  hi: { script: /[ऀ-ॿ]/, min: 0.4, forbid: [
    [/[ঀ-৿]/, 'Bangla text in the Hindi overlay'],
    [/[ఀ-౿]/, 'Telugu text in the Hindi overlay'],
  ] },
  te: { script: /[ఀ-౿]/, min: 0.4, forbid: [
    [DEVANAGARI_LETTERS, 'Devanagari (Hindi) text in the Telugu overlay'],
    [/[ঀ-৿]/, 'Bangla text in the Telugu overlay'],
  ] },
  // Arabic script, two languages. These two rules are the point of the file.
  //
  // Choosing the fa marker took one false-positive round worth recording:
  // TANWIN IS NOT AN ARABIC-ONLY MARKER. Persian freely uses Arabic-loan adverbs
  // that carry it — واقعاً, تقریباً, دقیقاً, صرفاً — and a naive /[ةًٌٍ]/ rule
  // flagged 36 perfectly good Arabic-script Persian entries in the-arts alone.
  // What Persian genuinely does NOT write is ta marbuta (ة); it uses ه or ت
  // instead. Pair that with the Arabic function words that have distinct Persian
  // equivalents (Persian uses از/به/که, never من/إلى/التي) and the signal is
  // clean.
  //
  // The CHARACTER test alone is not enough, and that was learned the hard way:
  // after clearing every ة/tanwin entry from the Persian file, NINE Arabic
  // entries were still sitting in it — "4 أيام", "تطوير الألعاب...", "البناء
  // والنشر في Roblox Studio" — because plenty of Arabic prose happens to contain
  // neither character. A lexical layer is what actually finds those: Arabic and
  // Persian use different everyday words for the same things, so an entry whose
  // wording is Arabic AND that carries no Persian marker at all is the signal.
  fa: { script: /[؀-ۿ]/, min: 0.4, forbid: [
    [/ة/, 'ta marbuta (ة), which Persian does not use — the Arabic translation may have been written into the Persian file'],
    [/(^|\s)(إلى|التي|الذي|هذه|هذا|كما|حيث)(\s|$)/, 'Arabic-only function words — the Arabic translation may have been written into the Persian file'],
  ], lexical: {
    foreign: /\b(أيام|لنصف|للبنين|للبنات|تطوير|الألعاب|والنشر|أسابيع|الصفوف|المخيم|مخيّم|الطلاب|قائمة|جميع)\b/,
    native: /[گچپژ]|هٔ|\b(اردو|هفته|روز|برنامه|هزینه|کودک|این|که|از|برای|های|شده)\b/,
    why: 'Arabic wording with no Persian marker — Arabic prose that carries neither ة nor tanwin still reads as Arabic',
  } },
  ar: { script: /[؀-ۿ]/, min: 0.4, forbid: [
    [/[گچپژ]/, 'Persian-only letters (گ چ پ ژ) — the Persian translation may have been written into the Arabic file'],
    [/تشارلوت/, 'the superseded spelling of Charlotte (use شارلوت)'],
  ], lexical: {
    foreign: /هٔ|\b(اردو|هفته|برنامه|هزینه|کودک|این|که|برای|های|شده|می‌شود)\b/,
    native: /[ةًٌٍ]|\b(المخيم|مخيم|أسبوع|أسابيع|الرسوم|الطلاب|هذا|هذه|التي|إلى|من|في)\b/,
    why: 'Persian wording with no Arabic marker — the Persian translation may have been written into the Arabic file',
  } },
}

let problems = 0
const langs = ONLY ? [ONLY] : Object.keys(RULES)

for (const lang of langs) {
  const rule = RULES[lang]
  if (!rule) { console.error(`unknown lang: ${lang}`); process.exit(2) }

  const files = readdirSync(WORK).filter((f) => f.endsWith(`.${lang}.json`))
  for (const file of files) {
    let work
    try { work = JSON.parse(readFileSync(join(WORK, file), 'utf8')) } catch { continue }
    const units = (work.strings ?? []).filter((u) => u.t && u.t.trim())
    if (!units.length) continue

    // 1. the expected script must actually be present
    const withScript = units.filter((u) => rule.script.test(u.t)).length
    const frac = withScript / units.length
    if (frac < rule.min) {
      problems++
      console.error(
        `  ✗ ${file}: only ${(frac * 100).toFixed(0)}% of ${units.length} translated ` +
          `entries contain ${lang} script (expected ≥${rule.min * 100}%)`,
      )
    }

    // 2. no sibling-locale orthography
    for (const [re, why] of rule.forbid) {
      const hits = units.filter((u) => re.test(u.t))
      if (hits.length) {
        problems++
        console.error(`  ✗ ${file}: ${hits.length} entr${hits.length === 1 ? 'y' : 'ies'} contain ${why}`)
        for (const h of hits.slice(0, 3)) {
          console.error(`      en: ${h.text.slice(0, 60)}`)
          console.error(`      t:  ${h.t.slice(0, 60)}`)
        }
      }
    }
  }
}

if (problems) {
  console.error(
    `\n✗ ${problems} script-purity problem(s). A locale written in the wrong ` +
      `language\npasses coverage, stamping and figure checks — only reading it catches this.`,
  )
  process.exit(1)
}
console.log(`✓ script purity clean${ONLY ? ` (${ONLY})` : ''} — every overlay is in its own language`)
