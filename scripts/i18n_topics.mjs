#!/usr/bin/env node
/**
 * The single source of truth for the SHAPE of the translatable data layer:
 * which topics exist, which module each one's prose lives in, and which export
 * name each per-school module uses.
 *
 * WHY THIS IS ITS OWN MODULE. This list used to be re-declared in every script
 * that walked src/data/**, and the copies drifted: `check_live_resolution.mjs`
 * carried six topics against the extractor's nine, so four of the ten shipped
 * overlay files were compared against English that was never loaded and the
 * check sat at a permanent 4,646 "unresolvable" entries — every one a false
 * positive. A checker parked at a non-zero number stops being read, which is
 * the same failure mode already recorded for check:sepdrift.
 *
 * The list could not simply be imported from i18n_extract.mjs, because that
 * module RUNS extraction on import. This one is data only: no top-level work,
 * no `import.meta.glob` (a Vite-only transform plain Node cannot evaluate), so
 * it imports cleanly from any script or from Node directly.
 *
 * Consumed by i18n_extract.mjs, check_live_resolution.mjs, check_chrome_keys.mjs
 * and i18n_audit_skips.mjs. Never re-declare any of these five constants locally;
 * add here and every consumer picks it up.
 */

/** Every school in the app, in roster order. */
export const SLUGS = [
  'providence-day', 'charlotte-latin', 'charlotte-christian', 'charlotte-catholic',
  'charlotte-country-day', 'cannon', 'covenant-day', 'davidson-day',
  'carmel-christian', 'hickory-grove-christian',
  'gaston-day',
]

/**
 * Topic slug -> the per-school module directory and its export name.
 *
 * Deliberately the SCHOOL modules, not the topic loader (sportsProgram.ts etc).
 * Those loaders now carry `import.meta.glob` for their locale overlays, which is
 * a Vite-only transform that plain Node cannot evaluate. The per-school files
 * are plain TypeScript, and they are the actual source of the prose anyway.
 */
export const TOPICS = {
  sports: 'sportsPrograms',
  'the-arts': 'artsPrograms',
  'student-clubs': 'clubsPrograms',
  'college-support': 'collegeSupportPrograms',
  'after-school': 'afterSchoolPrograms',
  // Summer Programs uses `summer/` rather than `summerPrograms/`: the doubled
  // "Programs" in the folder name read badly beside the module's own name.
  'summer-programs': 'summer',
  'course-offerings': null,   // single module + accessor, see ACCESSORS
  'financial-aid-report': null,
  'metric-values': null,
}

/**
 * Topics whose per-school data lives in ONE module behind an accessor rather
 * than in `<dir>/<slug>.ts`. Course Offerings is a single 5,800-line file with
 * six school constants and a `courseOfferings(slug)` lookup.
 *
 * Paths are relative to the `scripts/` directory, so a consumer resolves them
 * with `import(path)` from inside scripts/ — the same form every consumer uses.
 */
export const ACCESSORS = {
  'course-offerings': ['../src/data/courseOfferings.ts', 'courseOfferings'],
  'financial-aid-report': ['../src/data/financialAidReports.ts', 'financialAidReport'],
  // Not per-school: one flat array of stat-tile captions keyed by TOPIC. The
  // accessor ignores the slug and returns the whole set once, under the first
  // school, so each caption is extracted exactly once.
  'metric-values': ['../src/data/metricValues.ts', 'VALUE_METRICS'],
}

/** Slug -> the export name each per-school module uses. */
export const EXPORTS = {
  'providence-day': 'providenceDay',
  'charlotte-latin': 'charlotteLatin',
  'charlotte-christian': 'charlotteChristian',
  'charlotte-catholic': 'charlotteCatholic',
  'charlotte-country-day': 'charlotteCountryDay',
  cannon: 'cannon',
  'covenant-day': 'covenantDay',
  'davidson-day': 'davidsonDay',
  'carmel-christian': 'carmelChristian',
  'hickory-grove-christian': 'hickoryGroveChristian',
  'gaston-day': 'gastonDay',
}

/**
 * Extra per-school layers a topic renders alongside its `*Programs/<slug>.ts`
 * entry. Student Clubs renders FIVE cards: three from clubsPrograms, plus
 * Academic & Competitive Clubs (clubClusters.ts) and Club Catalog & Overview
 * (clubCatalog.ts), which are separate hand-maintained modules.
 *
 * They were invisible to the first extraction pass, which only walked the
 * `*Programs` entries — so two of the five cards shipped English. Paths are
 * prefixed (`clusters.*`, `catalog.*`) so overlay keys stay unambiguous.
 *
 * Both exports are ACCESSOR FUNCTIONS taking a slug: `clubClusters('cannon')`.
 * Walking the bare function object yields no strings and reads as "this layer
 * is empty" — call it.
 */
export const EXTRA_LAYERS = {
  'student-clubs': [
    ['clusters', '../src/data/clubClusters.ts', 'clubClusters'],
    ['catalog', '../src/data/clubCatalog.ts', 'clubCatalog'],
  ],
}
