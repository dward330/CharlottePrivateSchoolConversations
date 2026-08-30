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
  // Both spellings occur in the data: The Arts and After School use the American
  // "synthesized", College Support the British "synthesised". Matching only one
  // shipped the other untranslated for a whole stage.
  if (/^Verdict synthesi[sz]ed by the researcher/.test(label)) {
    return label.includes('1a–1d')
      ? t('cardLabels.verdictSynthesized_1a1d', { defaultValue: label })
      : t('cardLabels.verdictSynthesized', { defaultValue: label })
  }
  // Three more editorial sentences in citation slots, found by the Providence Day
  // Telugu print-out. The docstring above assumed anything that was not a Verdict
  // line was a real citation; these are not. They tell a family how far to trust
  // the card they sit under — a provenance hedge, not a document name — so by the
  // same uniform test they are chrome. "Staff backgrounds"/"Staff details" differ
  // only in that one noun across two topics, hence one key for both.
  if (/^Staff (backgrounds|details) partly from aggregated/.test(label)) {
    return t('cardLabels.staffFromAggregated', { defaultValue: label })
  }
  if (/^Aggregator score ranges consulted/.test(label)) {
    return t('cardLabels.aggregatorNotUsed', { defaultValue: label })
  }
  return label
}

/** Display name for a research area, e.g. 'sports' -> 'Deportes'. */
export function topicLabel(t: TFunction, slug: string, fallback: string): string {
  return t(`topics.${slug}`, { defaultValue: fallback })
}

/**
 * Display name for a metric / sub-section, e.g. 'win-loss' -> 'Récords…'.
 *
 * A metric key is unique WITHIN a topic, not across topics — five topics share
 * the key `redesign-research`, each with its own English label ("Sports
 * Research Dossier (2026)", "Summer Programs Research Dossier (2026)", …).
 * The flat `metrics.<key>` catalog cannot hold five strings under one key, so
 * every one of those topics rendered whichever label happened to be in the
 * catalog — "After School Research Dossier (2026)" — on the Compare table and
 * in the school-page card headings, in all ten locales.
 *
 * So a topic-scoped key wins when the catalog has one, exactly as `cardTitle`
 * scopes `cards.<topic>.<key>`; the flat key remains the fallback, which is
 * correct for the genuinely topic-agnostic keys that share a name across topics
 * on purpose (`awards`, `facilities`, `overview`, `in-depth-report`).
 *
 * `topic` is optional so the older call sites keep working unchanged.
 */
export function metricLabel(
  t: TFunction,
  key: string,
  fallback: string,
  topic?: string,
): string {
  if (topic) {
    /* A SENTINEL, not an empty string: i18next returns the KEY ITSELF when a
       lookup misses and `defaultValue` is empty, so `if (scoped)` was truthy
       for every miss and rendered "metrics.sports.awards" on the page. */
    const MISS = '\u0000'
    const scoped = t(`metrics.${topic}.${key}`, { defaultValue: MISS })
    if (scoped !== MISS) return scoped
  }
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

/**
 * The financial-aid report's `sources` is ONE string: a per-school citation list
 * and methodology note, closed by a sentence that is byte-identical across all
 * six schools —
 *
 *     The school did not commission, review or approve this report.
 *
 * `sources` is skipped from the prose overlay as a citation string, which is
 * right for the citation part and wrong for that closing sentence: it is the
 * most trust-relevant statement on the card, and it shipped English to every
 * non-English locale (found in the Providence Day Telugu print-out). Being
 * uniform across schools, it is chrome by the same test as the "Verdict
 * synthesised…" labels, so it gets a key rather than an overlay entry.
 *
 * Only the closing sentence is swapped. The methodology prose before it varies
 * per school and is a research finding, so it stays in the data layer and will
 * be picked up when `financial-aid-report` sources are extracted as prose. A
 * school whose string lacks the sentence is returned unchanged.
 */
const NOT_COMMISSIONED = 'The school did not commission, review or approve this report.'

export function reportSources(t: TFunction, sources: string): string {
  if (!sources.includes(NOT_COMMISSIONED)) return sources
  return sources.replace(
    NOT_COMMISSIONED,
    t('cardLabels.notCommissioned', { defaultValue: NOT_COMMISSIONED }),
  )
}
