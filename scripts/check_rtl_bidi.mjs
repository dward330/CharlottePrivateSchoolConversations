#!/usr/bin/env node
/**
 * Do figures survive an RTL paragraph with their characters in the right order?
 *
 * WHY THIS EXISTS
 * ---------------
 * `fa` is the first locale whose research prose renders right-to-left. Adding it
 * to PROSE_TRANSLATED retires this rule in src/index.css:
 *
 *     :root[dir='rtl'][data-prose='en'] main { direction: ltr; unicode-bidi: isolate; }
 *
 * Until then every RTL page was LTR-pinned, so nobody had seen the real thing.
 * On the other side of that pin, the Unicode Bidi Algorithm reorders any run of
 * DIRECTIONALLY NEUTRAL characters sitting between RTL text. Measured in
 * Chromium against real corpus sentences (2026-07-30):
 *
 *     "$3,683,971"  rendered with the "$" on the RIGHT   -> "3,683,971$"
 *     "2025–26"     rendered as                             "26–2025"   <-- WRONG YEARS
 *     "82%"         rendered as                             "%82"
 *
 * All three because "$", "–" and "%" are bidi-neutral. Latin identifiers
 * ("Upper School", "AP Calculus BC") were FINE — 27/27 intact — because strong-L
 * letters carry their own direction. Neutrality is the whole problem.
 *
 * The fix is bidi ISOLATES (U+2066 LRI … U+2069 PDI) emitted by format.ts. Note
 * an LRM alone is NOT sufficient — tested side by side in Chromium, the LRM form
 * still rendered the symbol on the wrong side. Intl emits an LRM for `fa` and it
 * is harmless, but it is not the fix.
 *
 * WHAT THIS CHECKS
 * ----------------
 * The logic in format.ts, not a browser: given an RTL context, every figure
 * shape that reorders must come out wrapped in an isolate, and LTR locales must
 * be left byte-identical. That last assertion is the important one — this fix
 * touches the shared money path that all six shipped locales use.
 *
 * A browser print-out is still required; this only proves the strings leave
 * format.ts correctly, not that they land on screen correctly.
 *
 *   node scripts/check_rtl_bidi.mjs
 */

const LRI = '⁦'
const PDI = '⁩'

// Mirrors src/lib/format.ts. Kept in sync deliberately: figureLocale.ts is
// importable under plain Node but format.ts is not (it pulls in i18n.ts, which
// carries Vite-only import.meta.glob).
//
// `ar` is deliberately ABSENT here — it is the second RTL locale, but unlike fa
// its Intl digits are already Western 3-3-3, so it is NOT in FIGURE_SAFE_NUMBERS
// (see figureLocale.ts and the ar rollout doc §0a). It still needs the bidi
// ISOLATES, exactly like fa, because "$"/"–"/"%" are bidi-neutral regardless of
// which digits sit around them — so ar is tested for isolation below, but it
// must NOT be added to this list.
const FIGURE_SAFE = ['bn', 'fa']
const numberLocale = (l) => (FIGURE_SAFE.includes(l.slice(0, 2)) ? 'en-US' : l)

function makeFormatter(lang, rtl) {
  const number = (n) =>
    new Intl.NumberFormat(numberLocale(lang), { useGrouping: 'always' }).format(n)
  const isolate = (s) => (rtl ? `${LRI}${s}${PDI}` : s)

  const leads = () => {
    const parts = new Intl.NumberFormat(lang, { style: 'currency', currency: 'USD' })
      .formatToParts(1)
    const cur = parts.findIndex((p) => p.type === 'currency')
    const num = parts.findIndex((p) => p.type === 'integer')
    return cur !== -1 && num !== -1 && cur < num
  }
  const symbol = () =>
    new Intl.NumberFormat(lang, { style: 'currency', currency: 'USD' })
      .formatToParts(1)
      .find((p) => p.type === 'currency')?.value ?? '$'

  const money = (n) => {
    const parts = new Intl.NumberFormat(lang, {
      style: 'currency', currency: 'USD', maximumFractionDigits: 0, useGrouping: 'always',
    }).formatToParts(n)
    let done = false
    const out = parts
      .map((p) => {
        if (!['integer', 'group', 'decimal', 'fraction'].includes(p.type)) return p.value
        if (done) return ''
        done = true
        return number(n)
      })
      .join('')
    return isolate(out)
  }

  const isolateNeutral = (t) =>
    rtl ? t.replace(/\d{4}[–-]\d{2,4}|\d+(?:\.\d+)?%/g, (m) => `${LRI}${m}${PDI}`) : t

  const localizeMoneyText = (text) => {
    if (!text.includes('$')) return isolateNeutral(text)
    const withMoney = text.replace(
      /\$(\d[\d,]*(?:\.\d+)?)([KM])?/g,
      (whole, digits, suffix) => {
        const n = Number(digits.replace(/,/g, ''))
        if (!Number.isFinite(n)) return whole
        if (suffix) {
          const sym = symbol()
          return isolate(leads() ? `${sym}${number(n)}${suffix}` : `${number(n)} ${suffix} ${sym}`)
        }
        return money(n)
      },
    )
    return isolateNeutral(withMoney)
  }

  return { localizeMoneyText }
}

// Shapes proven to reorder in an RTL paragraph. Each must be isolated.
const NEUTRAL_CASES = [
  ['$3,683,971', 'full money figure'],
  ['$36,325', 'tuition tile figure'],
  ['$3.25M', 'abbreviated magnitude'],
  ['2025–26', 'year range (en-dash)'],
  ['2024-25', 'year range (hyphen)'],
  ['82%', 'percentage'],
  ['4.5%', 'decimal percentage'],
]

// Shapes that are strong-L and must NOT be touched — isolating these would be
// harmless but noisy, and a rule broad enough to catch them is a rule that will
// eventually mangle prose.
const SAFE_CASES = [
  ['Upper School', 'division name'],
  ['AP Calculus BC', 'course code'],
  ['NCISAA 4A', 'association + division'],
  ['Charlotte Latin', 'school name'],
]

let bad = 0

// ── 1. RTL: every neutral figure comes out isolated ──────────────────────────
const fa = makeFormatter('fa', true)
console.log('RTL (fa) — neutral figures must be isolated')
for (const [input, what] of NEUTRAL_CASES) {
  const out = fa.localizeMoneyText(`متن ${input} متن`)
  const ok = out.includes(LRI) && out.includes(PDI)
  if (!ok) bad++
  console.log(`  ${ok ? 'ok ' : 'BAD'}  ${what.padEnd(24)} ${JSON.stringify(out)}`)
}

// ── 2. RTL: strong-L identifiers are left alone ──────────────────────────────
console.log('\nRTL (fa) — strong-L identifiers must be left alone')
for (const [input, what] of SAFE_CASES) {
  const out = fa.localizeMoneyText(`متن ${input} متن`)
  const ok = !out.includes(LRI)
  if (!ok) bad++
  console.log(`  ${ok ? 'ok ' : 'BAD'}  ${what.padEnd(24)} ${JSON.stringify(out)}`)
}

// ── 2b. RTL (ar): same isolation rules as fa, but Western digits ─────────────
// ar is the second RTL locale. It TRAILS its currency symbol (US$) where fa
// leads, and it is NOT in FIGURE_SAFE — so this exercises a combination fa never
// did. The isolate requirement is identical: every neutral figure isolated,
// every strong-L identifier left alone.
const ar = makeFormatter('ar', true)
console.log('\nRTL (ar) — neutral figures must be isolated (Western digits, trailing US$)')
for (const [input, what] of NEUTRAL_CASES) {
  const out = ar.localizeMoneyText(`نص ${input} نص`)
  const ok = out.includes(LRI) && out.includes(PDI)
  if (!ok) bad++
  console.log(`  ${ok ? 'ok ' : 'BAD'}  ${what.padEnd(24)} ${JSON.stringify(out)}`)
}
console.log('\nRTL (ar) — strong-L identifiers must be left alone')
for (const [input, what] of SAFE_CASES) {
  const out = ar.localizeMoneyText(`نص ${input} نص`)
  const ok = !out.includes(LRI)
  if (!ok) bad++
  console.log(`  ${ok ? 'ok ' : 'BAD'}  ${what.padEnd(24)} ${JSON.stringify(out)}`)
}
// ar keeps WESTERN digits — assert no Eastern-Arabic numeral leaked into a
// figure (that would mean ar got mistakenly added to FIGURE_SAFE, or numberLocale
// diverged from format.ts).
const arDigitCheck = ar.localizeMoneyText('نص $3,683,971 نص')
if (/[٠-٩۰-۹]/.test(arDigitCheck)) {
  console.error(`\n✗ ar figure carries Eastern-Arabic digits: ${JSON.stringify(arDigitCheck)}`)
  console.error('  ar must render Western 3-3-3 digits — it is NOT in FIGURE_SAFE_NUMBERS.')
  bad++
}

// ── 3. LTR locales must be BYTE-IDENTICAL to no-isolate output ───────────────
// This is the regression that matters: the fix lives in the shared money path,
// and six locales already ship through it.
console.log('\nLTR locales — must be byte-identical (no isolate characters)')
for (const lang of ['en', 'es', 'fr', 'ht', 'te', 'bn']) {
  const f = makeFormatter(lang, false)
  let dirty = 0
  for (const [input] of [...NEUTRAL_CASES, ...SAFE_CASES]) {
    const out = f.localizeMoneyText(`text ${input} text`)
    if (out.includes(LRI) || out.includes(PDI)) dirty++
  }
  if (dirty) bad++
  console.log(`  ${dirty ? 'BAD' : 'ok '}  ${lang.padEnd(4)} ${dirty} isolate(s) leaked`)
}

// ── 4. English output is exactly what it was ─────────────────────────────────
const en = makeFormatter('en', false)
const enSample = en.localizeMoneyText('Round-trip $1,990 in 2025–26 · 82% of students')
const EXPECTED = 'Round-trip $1,990 in 2025–26 · 82% of students'
if (enSample !== EXPECTED) {
  console.error(`\n✗ English drifted:\n  got      ${JSON.stringify(enSample)}\n  expected ${JSON.stringify(EXPECTED)}`)
  bad++
}

if (bad) {
  console.error(
    `\n✗ ${bad} RTL bidi failure(s).\n` +
    'A neutral-character figure ("$", "–", "%") in RTL prose reorders on screen:\n' +
    '"2025–26" renders "26–2025". Isolate it in src/lib/format.ts.',
  )
  process.exit(1)
}

console.log('\n✓ figures isolate correctly in RTL, and LTR locales are untouched')
