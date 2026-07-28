// Localized names for the two label sets that are generated rather than authored:
// the seven research areas (from src/data/schools.json) and the metric/sub-section
// labels (from the RULES table in metrics.ts).
//
// Both are CHROME by CLAUDE.md's uniform test — byte-identical for every school,
// drawn from a fixed lookup rather than per-school research — so they belong in
// src/locales/*.json, not in the prose overlay layer. They were missed by the
// original i18n pass because neither lives in a component: a Spanish reader saw
// translated chrome wrapped around an English table of contents.
//
// Keyed by SLUG, so the pipeline stays free to add topics. A topic or metric with
// no locale key falls back to the English name the manifest already carries, which
// is exactly what happens today for anything not in this catalogue.
//
// These deliberately do NOT read useTranslation() themselves — SchoolDetail maps
// its topic list with `t` as the loop variable, which shadows the i18next `t`.
// Taking the translator as an argument keeps both usable in the same scope.

import type { TFunction } from 'i18next'

/**
 * The verdict cards' attribution line, which is a SOURCE LABEL that is not a
 * citation.
 *
 * `sources[].label` is deliberately excluded from the prose overlay by
 * PATH_OVERRIDES — a citation names a document, and translating "After School
 * Options" would make the source impossible to find. This one string breaks
 * that assumption: it is an editorial sentence occupying a citation slot, and
 * it is byte-identical across all six schools, so by the uniform test it is
 * chrome.
 *
 * Two wordings exist (After School says "the cards above"; The Arts names
 * "cards 1a–1d"). Anything else is a real citation and passes through unchanged.
 */
export function sourceLabel(t: TFunction, label: string): string {
  if (label.startsWith('Verdict synthesized by the researcher')) {
    return label.includes('1a–1d')
      ? t('cardLabels.verdictSynthesized_1a1d', { defaultValue: label })
      : t('cardLabels.verdictSynthesized', { defaultValue: label })
  }
  return label
}

/** Display name for a research area, e.g. 'sports' -> 'Deportes'. */
export function topicLabel(t: TFunction, slug: string, fallback: string): string {
  return t(`topics.${slug}`, { defaultValue: fallback })
}

/** Display name for a metric / sub-section, e.g. 'win-loss' -> 'Récords…'. */
export function metricLabel(t: TFunction, key: string, fallback: string): string {
  return t(`metrics.${key}`, { defaultValue: fallback })
}

/**
 * Title of a redesigned research card, e.g. `sports.pipeline` -> 'La cantera
 * universitaria'.
 *
 * These live in `*_CARDS` constants in the topic loaders rather than in either
 * per-school data or a component, which is how they escaped the first two i18n
 * passes. By CLAUDE.md's uniform test they are chrome — byte-identical for every
 * school — so they belong here.
 *
 * `fallback` is the topic loader's own `xCardTitle(slug, card)`, which applies
 * that topic's per-school TITLE_OVERRIDES.
 *
 * **Overridden titles are looked up under a school-scoped key** —
 * `cards.the-arts.ladder@davidson-day` — rather than the shared one, because an
 * override varies per school and is a research finding, not chrome. They live in
 * the locale files anyway rather than in a prose overlay: they are defined in
 * the topic loader's module constants, which the prose extractor never walks
 * (it reads per-school entry objects), so an overlay could not reach them. A
 * school without a Spanish override falls back to its own English wording, never
 * to another school's title.
 */
export function cardTitle(
  t: TFunction,
  topic: string,
  key: string,
  fallback: string,
  overrideSlug?: string,
): string {
  if (overrideSlug) {
    return t(`cards.${topic}.${key}@${overrideSlug}`, { defaultValue: fallback })
  }
  return t(`cards.${topic}.${key}`, { defaultValue: fallback })
}
