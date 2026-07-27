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

/** Display name for a research area, e.g. 'sports' -> 'Deportes'. */
export function topicLabel(t: TFunction, slug: string, fallback: string): string {
  return t(`topics.${slug}`, { defaultValue: fallback })
}

/** Display name for a metric / sub-section, e.g. 'win-loss' -> 'Récords…'. */
export function metricLabel(t: TFunction, key: string, fallback: string): string {
  return t(`metrics.${key}`, { defaultValue: fallback })
}
