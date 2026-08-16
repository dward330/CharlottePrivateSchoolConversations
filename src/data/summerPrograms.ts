// The "Summer Programs" research area — the two cards per school (see
// components/SummerPrograms.tsx).
//
// Recreates the design's Summer Programs section using the app's own tokens
// (src/index.css) rather than porting its markup, exactly as the After School
// module does. The design's premise: a summer slate is published as a catalog —
// dozens of camps scattered across categories, grade bands and weeks — and a
// parent has two questions that a catalog alone never answers.
//
//   catalog      The Camp Catalog        — which camps fit MY child? Filter the
//                                          whole slate by category, day and
//                                          grade band, and search it by name.
//   costPlanner  The Summer Cost Planner — what does a whole summer actually
//                                          cost? Pick a camp tier, the number of
//                                          weeks, and the add-ons a working
//                                          family needs, and total it.
//
// Every figure here is transcribed from that school's OWN published summer
// pages, rate sheets or camp PDFs — see the committed research files under
// source-material/summer-programs/<school>/ for the hard data, source URLs and
// per-school gap notes. Nothing is inferred, averaged, or carried across
// schools. Where a school publishes nothing, the data says so rather than
// guessing: `estimated` marks any value that is modeled rather than published,
// and a flag names the gap in the parent's own terms.
//
// BOTH cards are optional, and a school missing both simply has no entry — the
// section then does not render at all, which is the honest outcome for a school
// that runs no summer program. A school that publishes a camp list but no rates
// keeps its Camp Catalog and drops the Cost Planner rather than showing a
// planner that cannot total anything.

/* ---------------------------------------------------------------- shared -- */

/** A citation shown in a card's SOURCE row. `url` makes it a clickable link. */
export type SuSource = {
  /** Human-readable label, e.g. "summer.providenceday.org — camp rates". */
  label: string
  /** Deep link to the specific page the fact came from. */
  url?: string
}

/**
 * A qualifier on the evidence, rendered as a chip plus a sentence. Same four
 * kinds as After School, and for the same reason: in this area whether a school
 * publishes its summer rates at all is itself a finding.
 *
 *  - 'verify'    TO VERIFY — school-reported or not yet confirmable.
 *  - 'estimate'  EST. — the figure is modeled from published data, not published.
 *  - 'gap'       PUBLICATION GAP — the school does not publish this at all.
 *  - 'stale'     STALE — the most recent published figure is from an older year.
 */
export type SuFlagKind = 'verify' | 'estimate' | 'gap' | 'stale'

export type SuFlag = {
  kind: SuFlagKind
  /** Chip wording. Defaults per kind if omitted. */
  label?: string
  /** The explanation sentence beside the chip. */
  text: string
}

/* ------------------------------------------------------- the camp catalog -- */

/**
 * One camp in the catalog.
 *
 * `category` and `grades` are FILTER TOKENS, matched against the card's own
 * `categoryFilters` / `gradeFilters` chips; `categoryLabel` and `gradeLabel` are
 * what a reader sees. Keeping the two apart is what lets a school label a band
 * "Rising K–2" while still filtering on a stable `k2` token.
 */
export type Camp = {
  name: string
  /** One-line description; searched alongside the name. */
  desc: string
  /** Filter token for the category chips, e.g. "sports", "stem". */
  category: string
  /** Display label for the category, e.g. "Sports", "STEM & Robotics". */
  categoryLabel: string
  /** Grade tokens this camp matches, e.g. ["k", "1", "2"]. */
  grades: string[]
  /** Display label for the grade range, e.g. "Rising K–2". */
  gradeLabel: string
  /**
   * Days this camp matches for filtering, e.g. ["Mon","Tue","Wed","Thu","Fri"].
   * Empty when the school does not publish which days a camp meets.
   */
  days: string[]
  /** Display label for the days, e.g. "Mon–Fri". "—" when not published. */
  dayLabel: string
  /** Price exactly as published, e.g. "$450/week". "—" when not published. */
  price: string
  /** Daily hours as published, e.g. "9 a.m.–3 p.m.". "—" when not published. */
  hours: string
  /** Which weeks it runs, as published, e.g. "Weeks 1–4". Omit when unknown. */
  weeks?: string
  /** Set when the price is modeled rather than published — renders EST. */
  estimated?: boolean
}

export type CampCatalog = {
  /** Lead sentence, bolded on the card. */
  headline: string
  /** Muted continuation of the headline. */
  subhead?: string
  /**
   * Intro above the filters. Where the catalog is a SAMPLE rather than the
   * school's whole slate, this is where it says so ("28 of 60+ camps below") —
   * a truncated list must never read as a complete one.
   */
  intro?: string
  /** Category filter chips, e.g. ["All","Day camp","Sports",…]. */
  categoryFilters: { token: string; label: string }[]
  /** Day filter chips, e.g. ["All","Mon",…]. Empty hides the day filter. */
  dayFilters: string[]
  /** Grade-band filter chips. Empty hides the grade filter. */
  gradeFilters: { token: string; label: string }[]
  /** The camps. */
  camps: Camp[]
  flags: SuFlag[]
  sources: SuSource[]
}

/* --------------------------------------------------- the summer cost planner -- */

/**
 * One selectable camp tier in the planner — a price point the school actually
 * publishes, not an individual camp.
 *
 * A slate of 60 camps usually prices into a handful of tiers (half-day,
 * full-day traditional, sports, specialty), and those tiers are what a parent
 * plans against. Rows are the tiers; the catalog above is where individual
 * camps live.
 */
export type PlannerTier = {
  /** Stable id used for row selection, e.g. "halfday". */
  id: string
  /** Table label, e.g. "Half-day camp". */
  label: string
  /** Panel label when selected, e.g. "Half-day camp · 9 a.m.–12 p.m.". */
  panelLabel: string
  /** Published rate per week (or per session — see `sessionBased`). */
  price: number
  /** The hours/detail line beneath the label in the table. */
  detail?: string
  /** Set when the rate is modeled rather than published — renders EST. */
  estimated?: boolean
}

/** One optional extra a family can add, priced per week alongside the camp. */
export type PlannerAddon = {
  /** Stable id, e.g. "aftercare". */
  id: string
  /** Chip/toggle label, e.g. "After care to 6 p.m.". */
  label: string
  /** Price per week. */
  price: number
  /** Set when the price is modeled rather than published — renders EST. */
  estimated?: boolean
  /** On when the card first opens. */
  defaultOn?: boolean
}

/** A one-time charge that does not scale with weeks — registration, deposit. */
export type PlannerFee = {
  label: string
  /** Amount as published, e.g. "$50". Omitted for a `note` row. */
  value?: string
  /** Renders as a muted paragraph rather than a label/amount row. */
  note?: boolean
  /** Included in the whole-summer total. A note row never is. */
  amount?: number
}

export type CostPlanner = {
  headline: string
  subhead?: string
  /**
   * Relabels the weeks picker to "sessions" for a school that bills by
   * multi-week session rather than by week (the handoff's adaptive case). Only
   * the labels change; the arithmetic is identical.
   */
  sessionBased?: boolean
  /**
   * How many weeks (or sessions) the school's season actually runs — the picker
   * is sized to this rather than to a fixed 1–10, so a parent can never total a
   * summer longer than the school offers.
   */
  maxWeeks: number
  /** Weeks selected when the card first opens. */
  defaultWeeks: number
  /** The selectable tiers. */
  tiers: PlannerTier[]
  /** Id of the tier selected when the card first opens. */
  defaultTier: string
  /** Per-week extras. Empty hides the add-on toggles entirely. */
  addons: PlannerAddon[]
  /** One-time charges and fine print. */
  fees: PlannerFee[]
  /** Registration timing / policy note beside the estimate. */
  aside?: {
    title: string
    text: string
  }
  flags: SuFlag[]
  sources: SuSource[]
}

/* ---------------------------------------------------------- the photo band -- */

/**
 * One frame in the section's photo band.
 *
 * The band renders ONLY where real, sourced photographs of that school's summer
 * exist — a school without them shows no band at all rather than placeholder
 * frames, which would imply a facility tour the research never did.
 */
export type SummerPhoto = {
  /** Path under public/, e.g. "/summer/providence-day-field.jpg". */
  src: string
  /** Accurate caption of what the photo actually shows. */
  caption: string
  /** Alt text for screen readers. */
  alt: string
}

/* ------------------------------------------------------------ the program -- */

/**
 * One school's Summer Programs entry. Both cards are optional: a school
 * publishing camps but no rates has no `costPlanner`, and its card simply never
 * renders.
 */
export type SummerProgram = {
  catalog?: CampCatalog
  costPlanner?: CostPlanner
  /** Section-level photo band, rendered above the cards. Omitted = no band. */
  photos?: SummerPhoto[]
}

/**
 * The card contract — order is fixed across schools, and the `key` matches the
 * optional field on SummerProgram so SchoolDetail can filter to the cards a
 * school actually has.
 */
export const SUMMER_CARDS = [
  {
    key: 'catalog',
    title: 'The Camp Catalog',
    kicker: 'Which camps fit my child, and when do they run?',
  },
  {
    key: 'costPlanner',
    title: 'The Summer Cost Planner',
    kicker: 'What does a whole summer actually cost?',
  },
] as const satisfies readonly {
  key: 'catalog' | 'costPlanner'
  title: string
  kicker: string
}[]

/** The two card keys, excluding the section-level `photos` field. */
export type SummerCardKey = (typeof SUMMER_CARDS)[number]['key']

/** Title for a card key — used by SchoolDetail's card header. */
export function summerCardTitle(key: SummerCardKey): string {
  return SUMMER_CARDS.find((c) => c.key === key)!.title
}

/* ------------------------------------------------------------ school data -- */

/**
 * Per-school entries live in ./summer/<slug>.ts so each school's research stays
 * reviewable on its own. Add a school by importing it here.
 *
 * A school with no published summer program is deliberately ABSENT rather than
 * present-and-empty: `topicsForSchool()` already drops a topic with no source
 * files, so the section never renders for it at all.
 */
import {
  localized,
  indexOverlay,
  setOverlayIndex,
  overlayIndex,
  hasOverlay,
  type OverlayFile,
} from '../lib/localizeData.ts'
import { providenceDay } from './summer/providence-day.ts'
import { charlotteLatin } from './summer/charlotte-latin.ts'
import { charlotteChristian } from './summer/charlotte-christian.ts'
import { charlotteCountryDay } from './summer/charlotte-country-day.ts'
import { cannon } from './summer/cannon.ts'
import { covenantDay } from './summer/covenant-day.ts'
import { carmelChristian } from './summer/carmel-christian.ts'

/**
 * FIVE schools, not six. **Davidson Day is deliberately absent.**
 *
 * It publishes no summer program at all: its `/summer-program` page renders a
 * heading over an empty content block, its site-map has no camp entry, and the
 * camp URL still in search results 404s. Five independent checks all came back
 * negative — see `.claude/docs/summer-programs-davidson-day-negative-finding.md`
 * for the evidence and for the two false positives that were disproved (a
 * wildcard CampBrain subdomain, and Davidson *College* rates contaminating the
 * search results).
 *
 * That absence is load-bearing rather than a gap to fill later: with no source
 * files under `source-material/summer-programs/davidson-day/`, the topic has no
 * `doc_count` for that school, so `topicsForSchool()` never yields it and the
 * Summer Programs section does not render on its page at all. Adding a stub
 * entry here would be worse than useless — it would imply a program that the
 * research established does not exist.
 */
const PROGRAMS: Record<string, SummerProgram> = {
  'providence-day': providenceDay,
  'charlotte-latin': charlotteLatin,
  'charlotte-christian': charlotteChristian,
  'charlotte-country-day': charlotteCountryDay,
  cannon: cannon,
  'covenant-day': covenantDay,
  'carmel-christian': carmelChristian,
}

/* ---------------------------------------------------------- translations -- */

/**
 * Locale overlays for this topic's prose, loaded on demand.
 *
 * MUST stand alone — `import.meta.glob` is a compile-time transform, and a
 * runtime guard around it survives into the output where `import.meta.glob` is
 * undefined, silently resolving every overlay to nothing. See afterSchool.ts.
 */
const overlayFiles = import.meta.glob<OverlayFile>('./overlays/summer-programs.*.json', {
  import: 'default',
})

/** Warms the overlay for a locale; resolves once the index is ready. */
export async function loadSummerOverlay(lang: string): Promise<void> {
  if (hasOverlay('summer-programs', lang)) return
  const load = overlayFiles?.[`./overlays/summer-programs.${lang}.json`]
  if (!load) {
    setOverlayIndex('summer-programs', lang, undefined)
    return
  }
  try {
    setOverlayIndex('summer-programs', lang, indexOverlay(await load()))
  } catch {
    // A missing or malformed overlay must not break the page: English stands in.
    setOverlayIndex('summer-programs', lang, undefined)
  }
}

/**
 * The structured Summer Programs entry for a school, or undefined if not built.
 *
 * With no overlay for `lang` this returns the English object BY REFERENCE (see
 * the identity requirement in src/lib/localizeData.ts).
 */
export function summerProgram(slug: string, lang = 'en'): SummerProgram | undefined {
  const en = PROGRAMS[slug]
  if (!en || lang === 'en') return en
  return localized(en, overlayIndex('summer-programs', lang), slug)
}
