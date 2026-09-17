// The "High School Placement" research area — the four cards a PreK-8 school
// shows in place of College Support (see components/HighSchoolPlacement.tsx).
//
// Recreates the design's "High School Placement Section Redesign" using the
// app's own tokens (src/index.css), as a structural sibling of College Support:
// same blueprint frames, same stat strips, same SOURCE rows, same verdict close.
//
// WHY THIS AREA EXISTS. A school that ends at 8th grade has no College Support
// area at all — its graduates go to high school, not college. But the parent
// question survives intact, one stage earlier: "where does my kid go next, and
// how well is this school set up to get them there?" It is arguably sharper
// here, because choosing a PreK-8 school means signing up for a second
// admissions process four to nine years later.
//
//   outcomes     Where Graduates Go       — denominator-bearing stat strip,
//                                           per-class rows expanding to their
//                                           destinations, the 10-year figure
//                                           held separately, scholarship band
//   placement    The Placement Program    — the process as a timeline, because
//                                           the people are not named
//   destinations Where They Land          — category filter chips over a named
//                                           destination index, with in-app
//                                           cross-links to other dossiers
//   verdict      Verdict & Visit Checklist — reuses College Support's Verdict
//                                           treatment unchanged
//
// FOUR CARDS, NOT SEVEN. College Support's `transcript` and `wholeClass` have no
// analogue (there is no GPA/AP/rank apparatus at PreK-8), `edge` has none (no
// spike-building at 13), and `ncAdmissions` is structurally N/A rather than
// merely unpopulated — that dashboard is keyed to HIGH SCHOOLS, so a PreK-8
// school is not in it and never will be.
//
// THIS AREA RENDERS ONLY FOR SCHOOLS WITH NO HIGH SCHOOL, and no conditional in
// any component enforces that. It follows the standing absence-not-emptiness
// rule: a topic with no source-material/ folder has no manifest documents, so
// `topicsForSchool()` (lib/manifest.ts) never yields it. A K-12 school cannot
// accidentally render this area, and a PreK-8 school gets it by having the
// research, not by carrying a flag.
//
// NO COMPARE AFFORDANCE ANYWHERE IN THIS AREA. PreK-8 schools are excluded from
// the Compare page entirely (user decision, 2026-09-15), so this area shows no
// "Compare on this topic" button and no Compare-style column treatment. It is a
// dossier-only surface. Its stat tiles therefore read the topic's OWN data
// rather than VALUE_METRICS — a PreK-8 school has no metricValues.ts entries at
// all — following the AdmissionsStatBand precedent.
//
// Every figure belongs to the school that published it: transcribed from its own
// pages and named news coverage, with the hard data and source URLs committed
// under source-material/high-school-placement/<school>/. Nothing is inferred,
// averaged, or carried across schools.
//
// Cards AND their sub-blocks are optional. A school that publishes no scholarship
// awards omits that band; one that publishes no destination list at all omits the
// whole `destinations` card. A card that would render zero items is omitted
// entirely rather than shipped as an empty shell.

import {
  localized,
  indexOverlay,
  setOverlayIndex,
  overlayIndex,
  hasOverlay,
  type OverlayFile,
} from '../lib/localizeData.ts'
import type { CsFlag, CsRow, CsSource, Verdict } from './collegeSupport.ts'

/* ---------------------------------------------------------------- shared -- */

/* The citation, flag, row and verdict primitives are shared with College
   Support rather than duplicated: they carry the same meaning here, and a
   second copy would drift. Re-exported so a consumer of this module needs only
   one import. */
export type { CsFlag, CsFlagKind, CsRow, CsSource, Verdict } from './collegeSupport.ts'

/**
 * One tile of a card's stat strip.
 *
 * Deliberately NOT College Support's `CsStat`, which is `{ value, label }`. Here
 * the denominator is a FIELD WITH ITS OWN SLOT, not prose folded into a caption,
 * and that is the point of the type: these are small cells — one student moves a
 * 41-graduate rate by 2.4 points — so a bare percentage off a small base is not
 * publishable (standing project rule).
 *
 * A tile whose figure genuinely has no published denominator sets `denominator`
 * to undefined and the component renders a "NO DENOM." chip in that slot. The
 * layout never has a hole in it, and an unverifiable aggregate never renders
 * looking like a verified one.
 */
export type HspStat = {
  /** The figure itself, e.g. "41", "97%", "40+". */
  value: string
  /**
   * What the figure is out of, e.g. "40 of 41", "of 41 · 37%", "Grade 7 → Grade 8".
   * Undefined ONLY where the school publishes no denominator — that renders as
   * an explicit NO DENOM. chip, never as a blank.
   */
  denominator?: string
  /** The caption beneath, e.g. "accepted to one or both top-two choices". */
  caption: string
}

/* ------------------------------------------------ 2a where graduates go -- */

/** One named destination a class's graduates were accepted to. */
export type Destination = {
  /** The school's name as published, e.g. "Charlotte Latin School". */
  name: string
  /**
   * The slug of this destination's own dossier in THIS app, where it has one.
   *
   * Resolved against the roster at render time and rendered as a cross-link —
   * the app's first school-to-school link. MUST be a slug, never a name: a
   * render-time string match against a school's display name would silently
   * degrade to plain text the moment a school is renamed, with no error.
   */
  slug?: string
}

/**
 * One graduating class's placement record.
 *
 * `graduates` is the denominator behind `acceptedPct`, and both are required
 * together for exactly that reason. The 10-year aggregate is NOT modelled here —
 * see `tenYear`, which is a different kind of statement.
 */
export type PlacementClass = {
  /** The class year as published, e.g. "2026". */
  year: string
  /** How many graduated, e.g. "41". The denominator for this row. */
  graduates: string
  /** Share accepted to a top-two choice, e.g. "97%". */
  acceptedPct: string
  /** The count behind that share, e.g. "40/41". */
  acceptedCount: string
  /** Named scholarship awards won by this class, if any. */
  scholarshipNote?: string
  /** Where this class's graduates were accepted. Empty hides the expansion. */
  destinations: Destination[]
}

/**
 * A multi-year aggregate the school publishes WITHOUT a denominator.
 *
 * Modelled separately from `PlacementClass` on purpose. The school publishes a
 * 10-year rate with no class sizes and no year-by-year series behind it, so it
 * cannot be verified the way the per-class rows can. Giving it its own type
 * means it cannot accidentally be rendered in the same solid bar as a verifiable
 * row — the component styles it as the different kind of statement it is.
 */
export type PlacementAggregate = {
  /** The span as published, e.g. "10-year". */
  label: string
  /** The rate, e.g. "96%". */
  pct: string
  /**
   * The denominator, where one is ever published. Undefined is the EXPECTED
   * case and renders a NO DENOM. chip — that absence is the finding.
   */
  denominator?: string
}

/** A named merit scholarship a graduate won, shown in the scholarship band. */
export type Scholarship = {
  /** The award as named, e.g. "Grant D. Williams Foundation Scholarship". */
  name: string
  /** Who awards it and to how many, e.g. "Providence Day School · awarded to one graduate". */
  detail: string
}

export type Outcomes = {
  headline: string
  subhead?: string
  /** The denominator-bearing stat strip. Empty omits it. */
  stats: HspStat[]
  /** Heading over the per-class table. */
  classesTitle?: string
  /** One row per graduating class on record. Empty omits the table. */
  classes: PlacementClass[]
  /** The published multi-year aggregate, where there is one. */
  tenYear?: PlacementAggregate
  /** Heading over the scholarship band. */
  scholarshipsTitle?: string
  /** Named awards won. Empty omits the band. */
  scholarships: Scholarship[]
  flags: CsFlag[]
  sources: CsSource[]
}

/* ------------------------------------------------- 2b placement program -- */

/**
 * One stage of the placement process, in chronological order.
 *
 * A timeline rather than a roster, because the school names the placement team
 * as a FUNCTION but does not publish its members — so the process is the
 * substance and there is no person to attribute a step to. A component must
 * never infer a name from a staff directory to fill this.
 */
export type PlacementStep = {
  /** When it happens, e.g. "September, Grade 8 — the High School Fair". */
  when: string
  /** The kind of step, e.g. "Exposure · the anchor event". */
  kind?: string
  /** What actually happens, and why it matters to a parent. */
  text: string
}

export type Placement = {
  headline: string
  subhead?: string
  /** The stat strip. A tile may legitimately have no denominator — see HspStat. */
  stats: HspStat[]
  /** Heading over the timeline. */
  timelineTitle?: string
  /** The process in sequence. Empty omits the timeline. */
  steps: PlacementStep[]
  /** Heading over the "what the school owns" column. */
  ownsTitle?: string
  /** Commitments the school actually makes. Empty omits the column. */
  owns: string[]
  /** Heading over the "not published" column. */
  notPublishedTitle?: string
  /** What the school does NOT publish — stated, never inferred around. */
  notPublished: CsRow[]
  flags: CsFlag[]
  sources: CsSource[]
}

/* ---------------------------------------------------- 2c where they land -- */

/**
 * One of the school's OWN published groupings of its destinations.
 *
 * These are KINDS of school, not tiers of one, and the app must not imply
 * otherwise. There is no US News analogue for high schools and none is invented
 * here: `collegeRankings.ts` / `rankLabelFor()` is a COLLEGE table and must
 * never be reached for on this card. The categories a school publishes are the
 * only classification shown.
 */
export type DestinationCategory = {
  /** The category key, used for the filter chips, e.g. "area-independent". */
  key: string
  /** The category as the school labels it, e.g. "Charlotte-area independent". */
  label: string
  /** The destinations in it. A category with none is omitted entirely. */
  schools: Destination[]
  /** A per-school qualifier, e.g. "Washington DC" or "UK". Keyed by name. */
  notes?: Record<string, string>
}

export type Destinations = {
  headline: string
  subhead?: string
  /** The school's own categories, in its own order. Empty omits the card. */
  categories: DestinationCategory[]
  flags: CsFlag[]
  sources: CsSource[]
}

/* --------------------------------------------------------------- program -- */

/**
 * One school's High School Placement cards. Every card is optional: a school
 * that publishes no named destination list omits `destinations` entirely rather
 * than shipping an empty index. HighSchoolPlacement renders only the cards
 * present, in the fixed HIGH_SCHOOL_PLACEMENT_CARDS order, so the reading order
 * stays consistent across schools.
 */
export type HighSchoolPlacementProgram = {
  outcomes?: Outcomes
  placement?: Placement
  destinations?: Destinations
  verdict?: Verdict
}

/**
 * Per-card metadata: the title and the parent question each card answers.
 *
 * Deliberately NO `num` field, matching COLLEGE_SUPPORT_CARDS. Card titles carry
 * no kicker line anywhere in this app — no "2a ·", no "Topic 01 of 04".
 *
 * Array order IS render order. Titles and kickers are rendered through the
 * locale catalog rather than from these strings — see the `highSchoolPlacement.*`
 * keys in src/locales/en.json. The English text is kept here as the fallback and
 * as the readable record of what each card is.
 */
export const HIGH_SCHOOL_PLACEMENT_CARDS = [
  {
    key: 'outcomes',
    title: 'Where Graduates Go',
    kicker: 'Does this school actually place kids well?',
  },
  {
    key: 'placement',
    title: 'The Placement Program',
    kicker: 'Who helps my kid through this, and when?',
  },
  {
    key: 'destinations',
    title: 'Where They Land',
    kicker: 'Which specific high schools do kids go to?',
  },
  {
    key: 'verdict',
    // Renamed from "Verdict & Visit Checklist" (user, 2026-09-16). Trinity, the
    // only occupant, ships no verdict prose — the card IS the checklist.
    title: 'Visit Checklist',
    kicker: 'What should I probe on the tour?',
  },
] as const satisfies readonly {
  key: keyof HighSchoolPlacementProgram
  title: string
  kicker: string
}[]

/**
 * Per-school programs, keyed by slug.
 *
 * EMPTY BY DESIGN as of this plan. The shape ships with no occupant: Charlotte
 * Preparatory School is the first, and it arrives with its own research in a
 * separate plan (.claude/plans/charlotteprep.md). An empty registry means every
 * existing school page is byte-identical to before this area existed, which is
 * this plan's key verification step.
 *
 * Per-school entries live in ./highSchoolPlacementPrograms/<slug>.ts so each
 * school's research stays reviewable on its own. Add a school by importing it
 * here, exactly as collegeSupport.ts does.
 */
import { trinityEpiscopal } from './highSchoolPlacementPrograms/trinity-episcopal.ts'

const PROGRAMS: Record<string, HighSchoolPlacementProgram> = {
  'trinity-episcopal': trinityEpiscopal,
}

/* ---------------------------------------------------------- translations -- */

/**
 * Locale overlays for this topic's prose, loaded on demand.
 *
 * MUST stand alone — `import.meta.glob` is a compile-time transform, and a
 * runtime guard around it survives into the output where `import.meta.glob` is
 * undefined, silently resolving every overlay to nothing. See clubsProgram.ts.
 *
 * Occupied since Trinity Episcopal (2026-09-17): nine locale overlays exist and
 * this glob resolves them. It was wired inert in PR #308, ahead of any school,
 * so the first occupant needed no re-architecting here — which held.
 *
 * The build side was NOT wired at the same time, and that asymmetry was the
 * expensive part: `high-school-placement` was absent from TOPICS in
 * scripts/i18n_topics.mjs, so the prose extractor did not know the topic
 * existed. A topic that is never extracted produces no unresolved stamps, so
 * coverage would have read 100% while the area shipped English to all nine
 * locales, with no check able to fail. Registered there now; keep the two sides
 * in step when adding an area.
 */
const overlayFiles = import.meta.glob<OverlayFile>(
  './overlays/high-school-placement.*.json',
  { import: 'default' },
)

/** Warms the overlay for a locale; resolves once the index is ready. */
export async function loadHighSchoolPlacementOverlay(lang: string): Promise<void> {
  if (hasOverlay('high-school-placement', lang)) return
  const load = overlayFiles?.[`./overlays/high-school-placement.${lang}.json`]
  if (!load) {
    setOverlayIndex('high-school-placement', lang, undefined)
    return
  }
  try {
    setOverlayIndex('high-school-placement', lang, indexOverlay(await load()))
  } catch {
    // A missing or malformed overlay must not break the page: English stands in.
    setOverlayIndex('high-school-placement', lang, undefined)
  }
}

/**
 * The structured High School Placement program for a school, or undefined.
 *
 * With no overlay for `lang` this returns the English object BY REFERENCE (see
 * the identity requirement in src/lib/localizeData.ts).
 */
export function highSchoolPlacementProgram(
  slug: string,
  lang = 'en',
): HighSchoolPlacementProgram | undefined {
  const en = PROGRAMS[slug]
  if (!en || lang === 'en') return en
  return localized(en, overlayIndex('high-school-placement', lang), slug)
}
