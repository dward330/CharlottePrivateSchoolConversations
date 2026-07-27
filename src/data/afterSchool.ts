// The "After School" research area — the four redesigned sub-section cards per
// school (see components/AfterSchool.tsx).
//
// Recreates the design's "After School Section Redesign" using the app's own
// tokens (src/index.css). The design's premise: parents research after-school
// care with three questions in a fixed order — "does it cover my work day?",
// "what will my schedule actually cost?", and "what does my kid do until
// pickup?" — and the old three prose cards answered none of them directly. The
// best artifact in the area (the pricing matrix) was buried at the bottom of the
// In-Depth Report. The redesign promotes it to an interactive cost planner and
// gives each question its own view:
//
//   1a The Coverage Map          — dismissal-to-6:00 timeline per division,
//                                  pickup tiers with entry prices, uncovered
//                                  divisions, and a summer band
//   1b The Cost Planner          — interactive grade × slot × days/week matrix
//                                  with a live estimate panel and a fee ledger
//   1c A Day Inside + Enrichment — the afternoon rhythm, the program in the
//                                  school's own words, and a filterable
//                                  enrichment catalog
//   1d Verdict & Visit Checklist — strengths, watch-outs, tickable tour questions
//
// The design reference is built for Providence Day; the letter/number ids (1a…1d)
// exist in that file only for review and are deliberately NOT rendered on the
// real cards — the card shows its topic name alone.
//
// Every figure here is transcribed from that school's OWN published pages, its
// fee documents, or its program PDFs — see the committed research files under
// source-material/after-school/<school>/ for the hard data, source URLs, and
// per-school gap notes. Nothing is inferred, averaged, or carried across
// schools. Where a school publishes nothing, the data says so rather than
// guessing: `estimated` marks any value that is modeled rather than published,
// and it renders an EST. tag beside the number.
//
// Cards AND their sub-blocks are optional by design. A school that publishes no
// rate table omits the Cost Planner; one that publishes no enrichment catalog
// still renders 1c for its rhythm and self-description alone. Rendering a thin
// card would imply the research found nothing when the truth is that the school
// publishes nothing. Card order stays fixed across schools for the cards that do
// render.

/* ---------------------------------------------------------------- shared -- */

/** A citation shown in a card's SOURCE row. `url` makes it a clickable link. */
export type AsSource = {
  /** Human-readable label, e.g. "providenceday.org — Extended Day fees". */
  label: string
  /** Deep link to the specific page the fact came from. */
  url?: string
}

/**
 * A qualifier on the evidence, rendered as a chip plus a sentence:
 *
 *  - 'verify'    TO VERIFY — school-reported or not yet confirmable.
 *  - 'estimate'  EST. — the figure is modeled from published data, not published.
 *  - 'gap'       PUBLICATION GAP — the school does not publish this at all.
 *  - 'stale'     STALE — the most recent published figure is from an older year.
 *
 * These appear ONLY where the research actually surfaced the problem. Never
 * synthesize one to fill the slot. In this area the qualifier is parent-facing
 * content in its own right: whether a school publishes its after-school rates at
 * all is one of the sharpest differentiators between these six schools.
 */
export type AsFlagKind = 'verify' | 'estimate' | 'gap' | 'stale'

export type AsFlag = {
  kind: AsFlagKind
  /** Chip wording. Defaults per kind if omitted. */
  label?: string
  /** The explanation sentence beside the chip. */
  text: string
}

/** A label/text row — the recurring two-column detail line. */
export type AsRow = {
  label: string
  text: string
}

/* ---------------------------------------------------- 1a the coverage map -- */

/**
 * One pickup tier inside a division's coverage bar — e.g. "to 4:30 · $165".
 *
 * `endFrac` is the tier's right edge as a fraction (0–1) of the timeline window
 * (see `Coverage.windowStart`/`windowEnd`), so bars stay proportional to real
 * clock time across schools with different dismissal times.
 */
export type CoverageTier = {
  /** Clock label for the tier end, e.g. "3:00", "4:30", "6:00". */
  until: string
  /** Entry price for the tier as published, e.g. "$140/mo", "$345/sem". */
  price?: string
  /** Right edge of this tier, as a fraction of the timeline window. */
  endFrac: number
  /** Set when the price is modeled rather than published — renders EST. */
  estimated?: boolean
}

/** One division's row in the coverage timeline. */
export type CoverageRow = {
  /** Division label, e.g. "TK", "Grades 1–5", "Middle School". */
  division: string
  /** Dismissal caption beneath it, e.g. "dismissal 3:00". */
  dismissal: string
  /** Left edge of the covered band, as a fraction of the timeline window. */
  startFrac: number
  /** Right edge of the covered band, as a fraction of the timeline window. */
  endFrac: number
  /**
   * The pickup tiers inside the band. Empty for a flat-rate or drop-in program,
   * which renders as a single solid band labelled by `flatLabel` instead.
   */
  tiers: CoverageTier[]
  /** Single-band label used when `tiers` is empty, e.g. "Clubhouse · drop-in". */
  flatLabel?: string
  /**
   * True when this division has NO published after-school coverage — renders as
   * a dashed, muted outline rather than a filled band. This is the design's way
   * of making a gap visible instead of omitting the row.
   */
  uncovered?: boolean
}

export type Coverage = {
  /** Lead sentence, bolded on the card. */
  headline: string
  /** Muted continuation of the headline. */
  subhead?: string
  /** Hour ticks across the top, e.g. ["1 pm","2 pm",…,"6 pm"]. */
  hours: string[]
  /** The per-division bars. */
  rows: CoverageRow[]
  /** The summer-programs band beneath the timeline. Omitted when none is known. */
  summer?: {
    /** Season chip, e.g. "JUN–AUG". */
    season: string
    /** The sentence beside it. */
    text: string
  }
  /** Short facts under the timeline — activity days, drop-in policy, late fees. */
  facts: AsRow[]
  flags: AsFlag[]
  sources: AsSource[]
}

/* ----------------------------------------------------- 1b the cost planner -- */

/** One selectable row of the pricing matrix — a grade band at a pickup slot. */
export type CostRow = {
  /** Stable id used for row selection, e.g. "tk-13". */
  id: string
  /** Table label, e.g. "TK · 1:00–3:00". */
  label: string
  /** Panel label when selected, e.g. "TK · 1:00–3:00 pm". */
  panelLabel: string
  /**
   * Price per days-per-week column, index 0 = 1 day … index 4 = 5 days.
   * `null` marks a cell the school does not publish — rendered as "—", never
   * interpolated. A row may therefore be partially published.
   */
  prices: (number | null)[]
  /**
   * Set when the school publishes ONE flat rate that does not vary by days per
   * week (Charlotte Christian's Bridge Care tiers). The row still fills every
   * column with that published figure — it genuinely is the price at any day
   * count — but the estimate panel suppresses its per-afternoon line, which
   * would otherwise divide a flat fee by the selected days and imply a
   * per-day rate the school never published.
   */
  flatRate?: boolean
}

export type Cost = {
  headline: string
  subhead?: string
  /**
   * How the published figure is billed, which decides every label in the
   * estimate panel: a monthly contract multiplies by `periods` billing months,
   * a per-semester charge by 2, and an annual contract by 1 (Cannon publishes a
   * single annual figure, so its "school year" line is the published number
   * itself rather than a derived total).
   */
  basis: 'monthly' | 'semester' | 'annual'
  /** Number of billing periods in a school year (9 months, 2 semesters, or 1). */
  periods: number
  /** Caption for the period total, e.g. "9 billing months", "2 semesters". */
  periodsLabel: string
  /** Column headers' verification state, index 0 = 1 day … 4 = 5 days. */
  columnsVerified: boolean[]
  /** The matrix rows. */
  rows: CostRow[]
  /** Id of the row selected when the card first opens. */
  defaultRow: string
  /** Days-per-week selected when the card first opens (1–5). */
  defaultDays: number
  /** Optional aside, e.g. the Middle School flat-rate note. */
  aside?: {
    title: string
    text: string
  }
  /** The fees & fine-print ledger. `note` rows render as a muted paragraph. */
  fees: {
    label: string
    value?: string
    note?: boolean
  }[]
  flags: AsFlag[]
  sources: AsSource[]
}

/* -------------------------------------------- 1c a day inside + enrichment -- */

/** One block of the afternoon rhythm strip. */
export type RhythmBlock = {
  /** Clock label, e.g. "3:00". */
  time: string
  /** Block name, e.g. "Arrival & snack". */
  name: string
  /** One-line description of what happens. */
  detail: string
}

/** One class in the enrichment catalog. */
export type EnrichmentClass = {
  name: string
  /** One-line description; searched alongside the name. */
  desc: string
  /** Display label for the day, e.g. "Mon", "Mon–Thu". */
  day: string
  /**
   * Days this class matches for filtering. Omit when the class runs on the
   * single day named by `day`; set it for multi-day classes.
   */
  days?: string[]
  /** Grade tokens this class matches, e.g. ["K","1","2"]. */
  grades: string[]
  /** Display label for the grade range, e.g. "K–5". */
  gradeLabel: string
  /** Fee as published, e.g. "$180 / semester". "—" when not published. */
  fee: string
}

export type DayInside = {
  headline: string
  subhead?: string
  /** Heading over the rhythm strip; omit the strip by leaving `rhythm` empty. */
  rhythmTitle?: string
  /** Set when the rhythm is modeled rather than published — renders EST. */
  rhythmEstimated?: boolean
  /** The afternoon rhythm blocks. */
  rhythm: RhythmBlock[]
  /** Heading over the school's-own-words block. */
  wordsTitle?: string
  /** Short phrases the school uses about the program, rendered as chips. */
  words: string[]
  /** The paragraph beneath the chips, in the school's framing. */
  wordsText?: string
  /** Heading over the enrichment catalog. */
  catalogTitle?: string
  /** Set when the catalog is illustrative rather than published. */
  catalogEstimated?: boolean
  /** Intro sentence above the filters. */
  catalogIntro?: string
  /** Day filter chips, e.g. ["All","Mon",…]. Empty hides the day filter. */
  dayFilters: string[]
  /** Grade filter chips, e.g. ["All","TK","K","1",…]. Empty hides it. */
  gradeFilters: string[]
  /** The classes. Empty omits the whole catalog block. */
  classes: EnrichmentClass[]
  flags: AsFlag[]
  sources: AsSource[]
}

/* ----------------------------------------------------------- 1d the verdict -- */

/** One tickable question on the visit checklist. */
export type VisitQuestion = string

export type Verdict = {
  headline: string
  subhead?: string
  /** Heading over the strengths list. */
  strengthsTitle?: string
  /** What holds up, each a sentence with a bolded lead. */
  strengths: string[]
  /** Heading over the watch-outs list. */
  watchoutsTitle?: string
  /** What to be careful about, each a sentence with a bolded lead. */
  watchouts: string[]
  /** Heading over the checklist. */
  checklistTitle?: string
  /** Questions to ask on the tour. */
  checklist: VisitQuestion[]
  flags: AsFlag[]
  sources: AsSource[]
}

/* ------------------------------------------------------------ the program -- */

/**
 * One school's After School entry. Every card is optional: a school with no
 * published rates has no `cost`, and its card simply never renders.
 */
export type AfterSchoolProgram = {
  coverage?: Coverage
  cost?: Cost
  dayInside?: DayInside
  verdict?: Verdict
}

/**
 * The card contract — order is fixed across schools, and the `key` matches the
 * optional field on AfterSchoolProgram so SchoolDetail can filter to the cards a
 * school actually has.
 *
 * The design's "1a"…"1d" badges are review markers only and are deliberately not
 * part of this contract: the card renders its title alone.
 */
export const AFTER_SCHOOL_CARDS = [
  {
    key: 'coverage',
    title: 'The Coverage Map',
    kicker: "Who's covered, until when — and where are the gaps?",
  },
  {
    key: 'cost',
    title: 'The Cost Planner',
    kicker: 'What will MY schedule cost, per month and per year?',
  },
  {
    key: 'dayInside',
    title: 'A Day Inside + Enrichment',
    kicker: 'What does my kid actually do until pickup?',
  },
  {
    key: 'verdict',
    title: 'Verdict & Visit Checklist',
    kicker: 'What do I probe on the tour?',
  },
] as const satisfies readonly {
  key: keyof AfterSchoolProgram
  title: string
  kicker: string
}[]

/** Title for a card key — used by SchoolDetail's card header. */
export function afterSchoolCardTitle(key: keyof AfterSchoolProgram): string {
  return AFTER_SCHOOL_CARDS.find((c) => c.key === key)!.title
}

/* ------------------------------------------------------------ school data -- */

/**
 * Per-school entries live in ./afterSchoolPrograms/<slug>.ts so each school's
 * research stays reviewable on its own. Add a school by importing it here.
 */
import { providenceDay } from './afterSchoolPrograms/providence-day.ts'
import { charlotteLatin } from './afterSchoolPrograms/charlotte-latin.ts'
import { charlotteChristian } from './afterSchoolPrograms/charlotte-christian.ts'
import { charlotteCountryDay } from './afterSchoolPrograms/charlotte-country-day.ts'
import { cannon } from './afterSchoolPrograms/cannon.ts'
import { davidsonDay } from './afterSchoolPrograms/davidson-day.ts'

const PROGRAMS: Record<string, AfterSchoolProgram> = {
  'providence-day': providenceDay,
  'charlotte-latin': charlotteLatin,
  'charlotte-christian': charlotteChristian,
  'charlotte-country-day': charlotteCountryDay,
  cannon: cannon,
  'davidson-day': davidsonDay,
}

/** The structured After School program for a school, or undefined. */
export function afterSchoolProgram(slug: string): AfterSchoolProgram | undefined {
  return PROGRAMS[slug]
}
