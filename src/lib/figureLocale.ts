// Which locale a FIGURE should be formatted in — as opposed to the locale the
// surrounding UI is written in.
//
// Deliberately dependency-free (no i18n import) so scripts/check_bn_numerals.mjs
// can import it under plain Node. src/lib/i18n.ts carries `import.meta.glob`,
// a Vite-only transform that throws outside the bundler, which is why the
// build-time checkers cannot reach through format.ts to get at this rule.

/**
 * Locales whose default digits or digit GROUPING would rewrite a figure into
 * something a reader can no longer match against the source document.
 *
 * Two separate defects, both caught by Bangla print-outs, both the same rule:
 *
 *  1. DIGITS. `Intl.NumberFormat('bn')` emits Bangla numerals, so $36,325
 *     rendered as "৩৬,৩২৫ US$".
 *  2. GROUPING. `bn` uses the Indian system (lakh/crore, 2-2-3), so
 *     $3,683,971 rendered as "36,83,971" — Western digits, but no longer the
 *     figure printed in the school's Report on Philanthropy. Invisible below
 *     6 digits, which is why fixing only the digits looked complete.
 *
 * These numbers are checkable citations — tuition tables, SAT scores, Wayback
 * timestamps, endowment totals — so §4.1 of the Bangla rollout doc holds the
 * figure fixed and localises only the presentation around it. Grouping IS part
 * of the figure's shape, so these locales borrow en-US number formatting while
 * everything else about the locale is left alone (including, in money(), the
 * locale's own currency placement).
 *
 * Deliberately a list, not a blanket rule: Spanish genuinely writes 36.325 and
 * that must keep working. Add a locale here only when its convention would make
 * a figure unrecognisable against its English source.
 *
 * `fa` joined 2026-07-30, and it is on this list for DIGITS ALONE — read this
 * before citing it as precedent, because its two halves point opposite ways:
 *
 *  - GROUPING says leave it out. Farsi groups 3-3-3, exactly like English. The
 *    boundaries never move, unlike bn/te lakh-crore. Its separator differs
 *    (U+066C ARABIC THOUSANDS SEPARATOR, not a comma) — but a separator swap at
 *    identical boundaries is the Spanish and French case, and both are
 *    deliberately excluded.
 *  - DIGITS say put it in, and they win. Intl.NumberFormat('fa') emits Eastern
 *    Arabic numerals: $3,683,971 renders "$۳٬۶۸۳٬۹۷۱". Not one glyph is shared
 *    with the figure printed in the school's Report on Philanthropy. That fails
 *    the "unrecognisable against its English source" test on digits alone,
 *    whatever the grouping does.
 *
 * So `fa` is precedent for DIGITS, never for separators — the separator
 * question is moot here, since numberLocale() swaps the whole locale to en-US
 * and U+066C is never rendered. A future locale that differs only in its
 * separator should follow es/fr and stay off this list.
 *
 * Note fa-u-nu-latn would give Western digits while keeping the locale, but it
 * also inserts a space between symbol and amount ("$ 36,325"). Borrowing en-US
 * wholesale, as every other entry does, avoids that and keeps one mechanism.
 */
export const FIGURE_SAFE_NUMBERS: readonly string[] = ['bn', 'fa']

/** Locale to format numbers in, given the active UI language. */
export function numberLocale(lang: string): string {
  return FIGURE_SAFE_NUMBERS.includes(lang.slice(0, 2)) ? 'en-US' : lang
}
