// Locale-aware number formatting.
//
// IMPORTANT: these figures are US-dollar amounts from the source research. Only the
// *presentation* is localized (digit grouping, decimal separator) — the currency and
// the amount never change. A Spanish reader sees "$28.500", not a converted figure.

import i18n from './i18n.ts'

/** Active language, falling back to English. */
function lang(): string {
  return i18n.resolvedLanguage ?? i18n.language ?? 'en'
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
  return new Intl.NumberFormat(lang(), {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    useGrouping: 'always',
  }).format(n)
}

/** Plain number with locale-appropriate grouping (see `money` on grouping). */
export function number(n: number): string {
  return new Intl.NumberFormat(lang(), { useGrouping: 'always' }).format(n)
}

/**
 * Win percentage. English drops the leading zero (".857") per US sports convention;
 * other locales get the full, unambiguous form ("0,857").
 */
export function winPct(n: number): string {
  const s = new Intl.NumberFormat(lang(), {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  }).format(n)
  return lang().startsWith('en') ? s.replace(/^0/, '') : s
}

/** Per-unit suffixes riding along with the baked prices. English is the source. */
const UNIT_SUFFIX: Record<string, Record<string, string>> = {
  es: { yr: 'año', mo: 'mes', sem: 'sem.', wk: 'sem.', class: 'clase', hr: 'hora' },
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
 * clearer than spelling out 220000), so "$220K" reads "220 K US$" in Spanish.
 * Per-unit suffixes ("/class", "/mo") are localized in the same pass.
 */
export function localizeMoneyText(text: string): string {
  if (!text.includes('$')) return localizeUnits(text)
  const withMoney = text.replace(/\$(\d[\d,]*(?:\.\d+)?)([KM])?/g, (whole, digits: string, suffix?: string) => {
    const n = Number(digits.replace(/,/g, ''))
    if (!Number.isFinite(n)) return whole
    if (suffix) {
      // Keep the magnitude letter; localize only the number in front of it.
      return lang().startsWith('en')
        ? `$${number(n)}${suffix}`
        : `${number(n)} ${suffix} US$`
    }
    return money(n)
  })
  return localizeUnits(withMoney)
}
