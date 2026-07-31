// Locale-aware number formatting.
//
// IMPORTANT: these figures are US-dollar amounts from the source research. Only the
// *presentation* is localized (digit grouping, decimal separator) — the currency and
// the amount never change. A Spanish reader sees "$28.500", not a converted figure.

import i18n from './i18n.ts'
import { numberLocale } from './figureLocale.ts'

/** Active language, falling back to English. */
function lang(): string {
  return i18n.resolvedLanguage ?? i18n.language ?? 'en'
}

/** U+2066 LRI … U+2069 PDI — a bidi ISOLATE around a left-to-right run. */
const LRI = '⁦'
const PDI = '⁩'

/**
 * Is the page's *content* direction right-to-left?
 *
 * Read off the live <html dir>, which syncHtml() maintains, rather than from a
 * list of locale codes — the same "ask, don't hardcode" rule currencyLeads()
 * follows. During SSR/tests there is no document, so LTR is the safe default.
 */
function isRtl(): boolean {
  return typeof document !== 'undefined'
    && document.documentElement.getAttribute('dir') === 'rtl'
}

/**
 * Wrap a money run in a bidi isolate, but only when the surrounding text is RTL.
 *
 * WHY THIS IS NEEDED, and why the mark Intl already emits is not enough:
 *
 * "$" is bidi class ET (European Terminator). Beside European digits it joins
 * the number to form one run — but that run is then POSITIONED by the
 * paragraph's direction. In an RTL paragraph the cluster is laid out right-to-
 * left as a unit, so "$3,683,971" renders with the symbol on the RIGHT of its
 * digits: a parent reads "3,683,971$".
 *
 * Measured in Chromium against real corpus sentences, 2026-07-30: this hit
 * 100% of money-in-prose (15/15 tokens in the Phase 0 spike). Latin identifiers
 * — "Upper School", "AP Calculus BC" — were unaffected: 27/27 stayed intact,
 * because strong-L letters carry their own direction. Money is the whole
 * problem precisely because "$" is directionally NEUTRAL.
 *
 * Intl.NumberFormat('fa') does prepend U+200E, and it is preserved through
 * money() below. **It is not sufficient.** An LRM is a zero-width character
 * that influences the surrounding run's resolved level; it does not ISOLATE.
 * Tested side by side in Chromium: the LRM form still rendered the symbol on
 * the wrong side, while LRI…PDI and <bdi> both rendered correctly. So the
 * isolate is the fix and the LRM is left in place only because it is harmless.
 *
 * Characters, not markup, deliberately: these strings pass through
 * `localizeMoneyText()` into contexts that render them as plain text — table
 * cells, stat tiles, chips, and RichText segments — several of which would
 * escape or strip an element. LRI/PDI survive as text anywhere a string does.
 *
 * No-op in LTR locales, so English, Spanish, French, Kreyòl, Telugu and Bangla
 * render byte-identically to before.
 */
function bidiIsolate(s: string): string {
  return isRtl() ? `${LRI}${s}${PDI}` : s
}

/**
 * Figures that money handling never touches, and which REORDER in RTL prose.
 *
 * `localizeMoneyText()` only rewrites "$"-prefixed runs. Everything else in the
 * corpus rides through verbatim — and two shapes are silently corrupted by the
 * bidi algorithm when the paragraph is RTL. Measured in Chromium, 2026-07-30,
 * by sorting each token's characters by their rendered x-position:
 *
 *     logical "2025–26"  ->  visual "26–2025"     <-- a WRONG year range
 *     logical "82%"      ->  visual "%82"
 *
 * The year range is the serious one: it is not a cosmetic glitch but a
 * different claim, and it is unreadable as the thing it is. 133 corpus strings
 * carry a year range and 59 carry a percentage.
 *
 * Both fail for the same reason as money: "–" and "%" are bidi-NEUTRAL, so a
 * digit-neutral-digit sandwich gets laid out by paragraph direction rather than
 * as one left-to-right run. Tokens made only of strong-L characters are fine,
 * which is why "AP Calculus BC" and plain "20,642" measured clean (27/27 Latin
 * identifiers intact in the spike) and need no treatment.
 *
 * Deliberately narrow. It matches only the two shapes proven to break, so it
 * cannot disturb prose it was not aimed at, and it is a no-op outside RTL.
 */
function isolateNeutralFigures(text: string): string {
  if (!isRtl()) return text
  return text.replace(
    // A year range joined by en-dash/hyphen ("2025–26", "2024–2025"), or a
    // percentage. Both anchored on digits so bare punctuation never matches.
    /\d{4}[–-]\d{2,4}|\d+(?:\.\d+)?%/g,
    (m) => `${LRI}${m}${PDI}`,
  )
}

/**
 * The locale to format NUMBERS in — as opposed to the active UI language.
 * See figureLocale.ts for why a few locales differ.
 */
function figureLocale(): string {
  return numberLocale(lang())
}

/**
 * USD figure in the active locale's convention — "$28,500" in English,
 * "28.500 US$" in Spanish.
 *
 * `useGrouping: 'always'` is deliberate. Several locales (Spanish among them)
 * drop the group separator on 4-digit numbers by default, which would render a
 * single price list as "1725 US$" next to "11.000 US$". Forcing the separator
 * keeps a column of tuition figures internally consistent.
 */
export function money(n: number): string {
  const parts = new Intl.NumberFormat(lang(), {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    useGrouping: 'always',
  }).formatToParts(n)

  // Keep the locale's own currency PLACEMENT — "$28,500" leads in English,
  // "28.500 US$" trails in Spanish and Bangla, and that is each locale's real
  // convention — while substituting a figure-safe number for the digits. Only
  // the numeric run is replaced, so the symbol, spacing and order are untouched.
  const digits = number(n)
  let replaced = false
  const out = parts
    .map((p) => {
      if (p.type !== 'integer' && p.type !== 'group' && p.type !== 'decimal'
        && p.type !== 'fraction') return p.value
      if (replaced) return ''
      replaced = true
      return digits
    })
    .join('')
  // RTL only: keep "$" on the left of its digits. See bidiIsolate().
  return bidiIsolate(out)
}

/**
 * Plain number with locale-appropriate grouping (see `money` on grouping, and
 * `numberLocale` on why a few locales borrow en-US's grouping entirely).
 */
export function number(n: number): string {
  return new Intl.NumberFormat(figureLocale(), { useGrouping: 'always' }).format(n)
}

/**
 * Win percentage. English drops the leading zero (".857") per US sports convention;
 * other locales get the full, unambiguous form ("0,857").
 */
export function winPct(n: number): string {
  const s = new Intl.NumberFormat(figureLocale(), {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  }).format(n)
  return lang().startsWith('en') ? s.replace(/^0/, '') : s
}

/**
 * Does this locale write the currency symbol BEFORE the amount?
 *
 * Asked of Intl rather than hardcoded, because "not English" is not the same as
 * "trails". English and Haitian Creole both lead ("$3.25M"); Spanish and Bangla
 * both trail ("3,25 M US$"). An earlier version tested `lang() === 'en'` and so
 * gave every non-English locale the Spanish shape — which put "3.25 M US$" on
 * the same Kreyòl page as "$36,500", since money() below already derives
 * placement correctly. Deriving it in both places keeps them consistent.
 */
function currencyLeads(): boolean {
  const parts = new Intl.NumberFormat(lang(), { style: 'currency', currency: 'USD' })
    .formatToParts(1)
  // Compare POSITIONS, not slot 0. RTL locales open the run with an invisible
  // bidi mark — Intl.NumberFormat('fa') emits a literal U+200E LRM as part[0] —
  // so testing `parts[0].type === 'currency'` reported "trails" for Farsi and
  // sent it down the Spanish branch: "3.25 M $" beside "$3,683,971" on one page.
  // That is the PR #61 defect exactly, resurrected by a character you cannot
  // see. Asking which part comes FIRST is immune to any number of such marks.
  const cur = parts.findIndex((p) => p.type === 'currency')
  const num = parts.findIndex((p) => p.type === 'integer')
  return cur !== -1 && num !== -1 && cur < num
}

/**
 * The locale's own USD symbol — "$" in English, Kreyòl and Telugu, "US$" in
 * Spanish, "$US" in French.
 *
 * Asked of Intl for the same reason placement is (see currencyLeads above).
 * The abbreviated-magnitude branch of localizeMoneyText used to hardcode "US$",
 * which is correct for exactly one locale — Spanish, the one it was written
 * against. French renders "$US", so an abbreviated figure came out "3,25 M US$"
 * while the full figure beside it came out "3 250 000 $US": the same currency,
 * the same page, two different symbols.
 *
 * This is the same shape as the bug PR #61 fixed — one locale's convention
 * generalised to every other — surviving in the symbol after being fixed in the
 * placement. Caught by the French print-out.
 */
function currencySymbol(): string {
  return (
    new Intl.NumberFormat(lang(), { style: 'currency', currency: 'USD' })
      .formatToParts(1)
      .find((p) => p.type === 'currency')?.value ?? '$'
  )
}

/** Per-unit suffixes riding along with the baked prices. English is the source. */
const UNIT_SUFFIX: Record<string, Record<string, string>> = {
  es: { yr: 'año', mo: 'mes', sem: 'sem.', wk: 'sem.', class: 'clase', hr: 'hora' },
  fr: { yr: 'an', mo: 'mois', sem: 'sem.', wk: 'sem.', class: 'cours', hr: 'h' },
}

function localizeUnits(text: string): string {
  const map = UNIT_SUFFIX[lang().slice(0, 2)]
  if (!map) return text
  return text.replace(/\/(yr|mo|sem|wk|class|hr)\b/g, (whole, unit: string) =>
    map[unit] ? `/${map[unit]}` : whole,
  )
}

/**
 * Re-formats US-style currency that is baked into the research data as display
 * strings ("$28,500", "$220K", "$3.0M") into the active locale's convention.
 *
 * The source data is authored US-style and stays that way — this only changes
 * presentation at render time, so no tuition figure is ever re-typed and the
 * amount cannot drift. Non-currency values ("10%", "1×") pass through untouched.
 *
 * Abbreviated magnitudes keep their K/M suffix (localized amounts are still
 * clearer than spelling out 220000), so "$220K" reads "220 K US$" in Spanish
 * but stays "$220K" in Haitian Creole, whose convention leads like English.
 * Placement comes from Intl via currencyLeads(), never from a language check.
 * Per-unit suffixes ("/class", "/mo") are localized in the same pass.
 *
 * In an RTL locale it ALSO isolates the figures it does not otherwise rewrite —
 * see isolateNeutralFigures(). That is why the "no $ sign" fast path below
 * still has to run: a sentence containing only "2025–26" needs the isolate even
 * though it contains no money at all.
 */
export function localizeMoneyText(text: string): string {
  if (!text.includes('$')) return isolateNeutralFigures(localizeUnits(text))
  const withMoney = text.replace(/\$(\d[\d,]*(?:\.\d+)?)([KM])?/g, (whole, digits: string, suffix?: string) => {
    const n = Number(digits.replace(/,/g, ''))
    if (!Number.isFinite(n)) return whole
    if (suffix) {
      // Keep the magnitude letter; localize only the number in front of it.
      // Both the placement AND the symbol come from Intl — see currencySymbol().
      const sym = currencySymbol()
      return bidiIsolate(
        currencyLeads()
          ? `${sym}${number(n)}${suffix}`
          : `${number(n)} ${suffix} ${sym}`,
      )
    }
    return money(n)
  })
  return isolateNeutralFigures(localizeUnits(withMoney))
}
