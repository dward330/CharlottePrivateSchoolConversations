// The "College Support" research area — the six redesigned sub-section cards
// per school (see components/CollegeSupport.tsx).
//
// Recreates the design's "College Support Section Redesign" using the app's own
// tokens (src/index.css). The design's premise: the eight original topics split
// the parent's real questions across cards. The counselling *people* lived in
// one card and the application *work* they do in another; the student's *spike*
// in one and the school's *name recognition* in another. Merging by parent
// question — 8 topics → 6 — makes each card a single argument backed by data:
//
//   1a The Transcript Colleges See — AP scope strip, National Merit ledger,
//                                    post-AP depth, grade-trust band
//   1b The Counseling Engine       — ratio strip, roster, 9→12 timeline,
//                                    application mechanics, reach & tools
//   1c Where Graduates Go          — outcomes strip, selectivity buckets,
//                                    searchable acceptance list, scholarships
//   1d The Applicant's Edge        — two levers: the spike, and the school's
//                                    institutional leverage
//   1e Whole Class Analytics       — SAT/ACT percentiles, GPA quintiles,
//                                    learning differences, the middle of class
//   1f Verdict & Visit Checklist   — the researcher's verdict, and tickable
//                                    questions to ask on the tour
//
// The design reference is built for Providence Day; the letter/number ids (1a…1f)
// exist in that file only for review and are deliberately NOT rendered on the
// real cards — the card shows its topic name alone.
//
// Every figure here is transcribed from that school's OWN published pages, its
// profile PDFs, or named news coverage — see the committed research files under
// source-material/college-support/<school>/ for the hard data, source URLs, and
// per-school gap notes. Nothing is inferred, averaged, or carried across schools.
//
// Cards AND their sub-blocks are optional by design. A school that publishes no
// quintile table omits that block; one that publishes neither test percentiles
// nor a quintile table nor learning-difference detail omits the whole 1e card.
// Rendering a thin card would imply the research found nothing when the truth is
// that the school publishes nothing. Card order stays fixed across schools for
// the cards that do render.

/* ---------------------------------------------------------------- shared -- */

/** A citation shown in a card's SOURCE row. `url` makes it a clickable link. */
export type CsSource = {
  /** Human-readable label, e.g. "providenceday.org — Academic Profile PDF". */
  label: string
  /** Deep link to the specific page the fact came from. */
  url?: string
}

/**
 * A qualifier on the evidence, rendered as a chip plus a sentence:
 *
 *  - 'verify'      TO VERIFY — school-reported, modeled, or not yet confirmable.
 *  - 'discrepancy' DISCREPANCY — the school's own sources disagree on a figure.
 *                  Both figures are shown; the flag explains the conflict.
 *  - 'gap'         PUBLICATION GAP — the school does not publish this at all.
 *
 * These appear ONLY where the research actually surfaced the problem. Never
 * synthesize one to fill the slot.
 */
export type CsFlagKind = 'verify' | 'discrepancy' | 'gap'

export type CsFlag = {
  kind: CsFlagKind
  /** Chip wording. Defaults per kind if omitted. */
  label?: string
  /** The explanation sentence beside the chip. */
  text: string
}

/** One tile of a card's stat strip — the big number and its caption. */
export type CsStat = {
  /** The figure itself, e.g. "1,213", "94%", "No rank". */
  value: string
  /** Caption beneath it, e.g. "AP exams taken, May 2025 (461 students)". */
  label: string
}

/** A label/text row — the design's recurring two-column detail line. */
export type CsRow = {
  label: string
  text: string
}

/* ------------------------------- nc public-university admissions ---------- */

/**
 * One university's row in the six-university ledger.
 *
 * Mirrors the design's mock row — { rank, name, note, applied, accepted, rate,
 * avg5, avgNote } — with the figures carried as display STRINGS rather than
 * bare numbers. Two reasons: a published figure is copied char-for-char and
 * never re-typed or recomputed at render, and a rate suppressed for a small
 * base has to be genuinely absent rather than zero.
 *
 * The counts come from the UNC system's Insight dashboard via the
 * `nc-admissions-data` skill — a government-published figure per (high school ×
 * campus) pair, not the school's own marketing number.
 */
export type NcUniversity = {
  /** Stable key — 'unc-chapel-hill', 'nc-state', … Never displayed. */
  key: string
  /** Display name, EXACTLY as the dashboard spells it. Not translated. */
  name: string
  /** US News National Universities rank position within NC publics, 1–6. */
  rank: number
  /** Short descriptive note beside the name ("Hometown campus") — prose. */
  note?: string
  /** Most recent class: applications from this school. */
  applied: string
  /** Most recent class: acceptances. */
  accepted: string
  /**
   * Admit rate for the most recent class, e.g. '39%'. Omitted where the
   * denominator is missing — never estimated. See `flags` for the gap.
   */
  rate?: string
  /** 0–1, drives the proportional bar width. Omitted with `rate`. */
  ratePct?: number
  /** Five-year pooled rate, e.g. '39%' (the design's `avg5`). */
  fiveYearRate?: string
  /**
   * Pooled five-year applications and acceptances, as separate display
   * figures (the design's `avgNote`, which was one string: '341 applied · 133 in').
   *
   * Split deliberately. As one string the field carried the English words
   * "applied" and "in" wrapped around two numerals, inside a table cell —
   * the repo's recurring "sentence wearing an identifier's clothes" leak.
   * Classifying it prose would have sent 66 figure-bearing strings through
   * translation and invited the very re-typing check:sepdrift exists to catch;
   * skipping it would have shipped English into nine locales. Splitting the
   * figures out lets the words live in the `tables.ncFiveYearCounts` chrome
   * key and interpolate, so the numerals are never re-typed and the sentence
   * still translates.
   */
  fiveYearApplied?: string
  fiveYearAccepted?: string
}

/**
 * The "Admissions Rate for Top NC Public Universities" card — the area's FIRST
 * card, ahead of the transcript.
 *
 * This is not a matriculation list and must never be described as one: the UNC
 * Insight dashboard covers the 16 public UNC campuses and nothing else, so it
 * says nothing about private or out-of-state outcomes. And the rate is a joint
 * property of the (school, university) pair — the rate at which that university
 * admitted that high school's applicants — not either institution's own admit
 * rate. `methodNote` carries that caveat on every school's card.
 */
export type NcAdmissions = {
  headline: string
  subhead?: string
  /** The 4-cell stat strip. */
  stats: CsStat[]
  /** Heading over the ledger. */
  ledgerTitle?: string
  /**
   * The six universities, in US News rank order. Ships exactly six where the
   * dashboard has data for all six; a campus with no data is still listed
   * with counts and a gap flag rather than dropped.
   */
  universities: NcUniversity[]
  /** The method note beneath the ledger. */
  methodNote?: string
  flags: CsFlag[]
  sources: CsSource[]
}

/* -------------------------------------------- 1a the transcript ----------- */

/** One year of the National Merit / College Board recognition ledger. */
export type MeritYear = {
  /** e.g. "2024", "10-yr". */
  year: string
  /** The recognition line for that class. */
  detail: string
  /** Set when this row is unconfirmed — renders a TO VERIFY chip inline. */
  unconfirmed?: boolean
}

export type Transcript = {
  /** Lead sentence, bolded on the card. */
  headline: string
  /** Muted continuation of the headline. */
  subhead?: string
  /** The AP-scope stat strip. */
  stats: CsStat[]
  /** Heading over the merit ledger; omit the ledger by leaving `merit` empty. */
  meritTitle?: string
  /** Year-by-year National Merit ledger. Empty where a school publishes none. */
  merit: MeritYear[]
  /** A note beneath the ledger — usually a counting-window discrepancy. */
  meritNote?: string
  /** Heading over the post-AP depth list. */
  depthTitle?: string
  /** Post-AP course depth by area (Mathematics, Computer science, …). */
  depth: CsRow[]
  /** Heading over the grade-trust band. */
  trustTitle?: string
  /** How the grade is engineered to be trusted — weighting, rank, load norms. */
  trust: CsRow[]
  flags: CsFlag[]
  sources: CsSource[]
}

/* -------------------------------------------- 1b the counseling engine ---- */

/** One counselor in the "who's in the room" roster. */
export type Counselor = {
  /** e.g. "Director", "Assoc. Director" — the muted kicker above the name. */
  role: string
  name: string
  /** Tenure, credentials, prior admissions-side experience. */
  detail?: string
}

/** One grade column of the four-year timeline. */
export type TimelineYear = {
  /** "9", "10", "11", "12". */
  grade: string
  /** The intensity kicker, e.g. "Light touch", "Intensive". */
  intensity: string
  /** The bullets for that year. */
  items: string[]
  /** A closing muted line, e.g. "Focus: be a strong Upper School student". */
  note?: string
}

export type Counseling = {
  headline: string
  subhead?: string
  stats: CsStat[]
  /** Heading over the roster. */
  rosterTitle?: string
  /** The named counseling team. Empty where a school names no one. */
  roster: Counselor[]
  /** Heading over the timeline. */
  timelineTitle?: string
  /** The 9→12 timeline. Empty where a school publishes no four-year cadence. */
  timeline: TimelineYear[]
  /** Heading over the mechanics checklist. */
  mechanicsTitle?: string
  /** The application mechanics the office owns, as a checkmark grid. */
  mechanics: string[]
  /** A note beneath the mechanics grid. */
  mechanicsNote?: string
  /** Heading over the reach column. */
  reachTitle?: string
  /** Rep visits, campus visits, platform, profile — the office's reach. */
  reach: string[]
  flags: CsFlag[]
  sources: CsSource[]
}

/* -------------------------------------------- 1c where graduates go ------- */

/** One row of the selectivity-bucket table. */
export type Bucket = {
  /** e.g. "Ivy League", "Top-75 National Universities". */
  tier: string
  /** e.g. "7 / 8", "71". */
  count: string
  /** Named absences or qualifiers, e.g. "absent Princeton". */
  note?: string
}

/**
 * One college on the acceptance list. The card renders these as a searchable,
 * header-filterable list, so each carries the categories it belongs to.
 */
export type College = {
  name: string
  /**
   * Bucket keys this college belongs to — any of 'ivy' | 'ivyplus' | 'nu75' |
   * 'lac75' | 'p4' | 'hbcu'. Drives the filter chips above the list.
   *
   * The US News rank label is NOT stored here — it resolves from the master
   * `COLLEGE_RANKINGS` table (`src/data/collegeRankings.ts`) at render time via
   * `rankLabelFor(name)`, so a rank lives in exactly one place. Adding a college
   * here needs only its name and buckets; its label (if it holds a National/LAC
   * rank) comes from the master.
   */
  cats: string[]
  /** True where the school's list marks it as enrolling (bolded). */
  enrolling?: boolean
}

/** The filter chips shown above the acceptance list, in render order. */
export const COLLEGE_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'ivy', label: 'Ivy League' },
  { key: 'ivyplus', label: 'Ivy Plus' },
  { key: 'nu75', label: 'Top-75 National' },
  { key: 'lac75', label: 'Top-75 Liberal' },
  { key: 'p4', label: 'Power Four' },
  { key: 'hbcu', label: 'HBCUs' },
] as const

export type Outcomes = {
  headline: string
  subhead?: string
  stats: CsStat[]
  /** Heading over the bucket table. */
  bucketsTitle?: string
  /** Selectivity buckets. Empty where a school publishes no usable list. */
  buckets: Bucket[]
  /** A note beneath the bucket table — floors, scoring caveats. */
  bucketsNote?: string
  /** Heading over the acceptance list. */
  collegesTitle?: string
  /** Every acceptance the research captured. Empty omits the list block. */
  colleges: College[]
  /** Total accepted, where the school states a number larger than the list. */
  collegesTotal?: string
  /** Heading over the scholarship band. */
  scholarshipsTitle?: string
  /** Scholarship and named-award chips. First chip renders as the accent one. */
  scholarships: string[]
  /** A note beneath the scholarship chips — usually a discrepancy. */
  scholarshipsNote?: string
  /** The honest acceptance-vs-matriculation caveat. Always worth stating. */
  caveat?: string
  flags: CsFlag[]
  sources: CsSource[]
}

/* -------------------------------------------- 1d the applicant's edge ----- */

/** One lever column — the student's spike, or the school's leverage. */
export type Lever = {
  /** e.g. "Lever 1 — Build the spike". */
  title: string
  /** The muted qualifier beside the title. */
  hint?: string
  /** The glyph leading each item: '◆' for the spike, '▲' for leverage. */
  glyph: string
  /** The lever's items, each a sentence or two. */
  items: string[]
  /** A closing note — usually a publication gap. */
  note?: string
}

export type Edge = {
  headline: string
  subhead?: string
  /** The two levers. A school missing one renders the other alone. */
  levers: Lever[]
  flags: CsFlag[]
  sources: CsSource[]
}

/* -------------------------------------------- 1e whole class analytics ---- */

/** One row of a test-score percentile table. */
export type ScoreRow = {
  /** e.g. "SAT total", "ACT composite". */
  label: string
  /**
   * Percentile values in column order: 10th, 25th, 50th, 75th, 90th, mean.
   * Use '—' for a percentile the school does not publish.
   */
  values: string[]
}

/** A percentile table with its own heading and caption. */
export type ScoreTable = {
  /** e.g. "SAT score percentiles". */
  title: string
  /** Muted qualifier, e.g. "Class of 2025 · 143 testers (of 178)". */
  hint?: string
  rows: ScoreRow[]
  /** A note beneath the table — modeling caveats, superscoring, test-optional. */
  note?: string
  /**
   * Set when the school does NOT publish percentiles and the rows carry
   * self-labeled figures instead (class averages, AP Scholar tier counts).
   * Suppresses the 10th–90th/mean percentile header row, which would
   * otherwise file an average under a percentile it is not — a class-average
   * SAT rendered beneath a "10th percentile" heading reads as a (wrong) low
   * score. Standing card rule, 2026-08-16: averages-only or tier-count
   * tables always set this; the percentile header renders only over rows
   * that genuinely hold six percentile values.
   */
  noPercentiles?: boolean
}

/** One fifth of the GPA quintile table. */
export type Quintile = {
  /** e.g. "Top fifth", "Q2", "Bottom fifth". */
  label: string
  /** The mean GPA for that fifth, e.g. "4.474", "≈3.7". */
  gpa: string
  /** The muted line beneath, e.g. "1479 SAT · 33 ACT". */
  detail?: string
}

export type WholeClass = {
  headline: string
  subhead?: string
  /** SAT and/or ACT percentile tables. Empty omits the block. */
  scoreTables: ScoreTable[]
  /** Heading over the GPA quintile strip. */
  gpaTitle?: string
  /** Muted qualifier beside the GPA heading. */
  gpaHint?: string
  /** The quintile table. Empty where a school publishes no GPA distribution. */
  quintiles: Quintile[]
  /** A note beneath the quintiles — interpolation caveats, load norms. */
  gpaNote?: string
  /** Heading over the learning-difference column. */
  supportTitle?: string
  /** Learning-difference support rows. Empty omits the column. */
  support: CsRow[]
  /** A note beneath the support column — usually a publication gap. */
  supportNote?: string
  /** Heading over the middle-of-class column. */
  middleTitle?: string
  /** How the middle of the class and non-traditional paths are served. */
  middle: CsRow[]
  flags: CsFlag[]
  sources: CsSource[]
}

/* -------------------------------------------- 1f verdict & checklist ------ */

export type Verdict = {
  headline: string
  subhead?: string
  /** Heading over the verdict column. */
  verdictTitle?: string
  /** "Why it holds up" — evidence-backed checkmarks. */
  points: CsRow[]
  /** Heading over the checklist column. */
  checklistTitle?: string
  /** Tickable "ask on the tour" questions. */
  checklist: string[]
  flags: CsFlag[]
  sources: CsSource[]
}

/* --------------------------------------------------------------- program -- */

/**
 * One school's redesigned College Support cards. Every card is optional: a
 * school that publishes no test percentiles, GPA table, or learning-difference
 * detail omits `wholeClass` entirely. SchoolDetail renders only the cards
 * present, in this fixed order, so ordering stays consistent across schools.
 */
export type CollegeSupportProgram = {
  ncAdmissions?: NcAdmissions
  transcript?: Transcript
  counseling?: Counseling
  outcomes?: Outcomes
  edge?: Edge
  wholeClass?: WholeClass
  verdict?: Verdict
}

/**
 * Per-card metadata: the title and the parent question each card answers.
 *
 * Deliberately NO `num` field. The design reference labels these 1a…1f for
 * review only; the shipped cards show the topic name alone.
 */
export const COLLEGE_SUPPORT_CARDS = [
  /* First, deliberately. This is the one card in the area whose figures are
     government-published rather than school-published, so it leads. Array
     order IS render order — SchoolDetail filters this list by which keys the
     school's program object actually has. */
  {
    key: 'ncAdmissions',
    title: 'Admissions Rate for Top NC Public Universities',
    kicker: "If we're aiming in-state, what are our odds from here?",
  },
  {
    key: 'transcript',
    title: 'The Transcript Colleges See',
    kicker: 'How strong is the record my kid graduates with?',
  },
  {
    key: 'counseling',
    title: 'The Counseling Engine',
    kicker: 'Who helps my kid — how much, with what, and when?',
  },
  {
    key: 'outcomes',
    title: 'Where Graduates Go',
    kicker: 'Does this actually get kids into top schools?',
  },
  {
    key: 'edge',
    title: "The Applicant's Edge",
    kicker: 'How does my kid stand out — and does the name help?',
  },
  {
    key: 'wholeClass',
    title: 'Whole Class Analytics',
    kicker: "What if my kid isn't at the top — or learns differently?",
  },
  {
    key: 'verdict',
    title: 'Verdict & Visit Checklist',
    kicker: 'What should I probe on the tour?',
  },
] as const satisfies readonly {
  key: keyof CollegeSupportProgram
  title: string
  kicker: string
}[]

/* ------------------------------------------------------------ school data -- */

/**
 * Per-school entries live in ./collegeSupportPrograms/<slug>.ts so each school's
 * research stays reviewable on its own. Add a school by importing it here.
 */
import {
  localized,
  indexOverlay,
  setOverlayIndex,
  overlayIndex,
  hasOverlay,
  type OverlayFile,
} from '../lib/localizeData.ts'
import { providenceDay } from './collegeSupportPrograms/providence-day.ts'
import { charlotteLatin } from './collegeSupportPrograms/charlotte-latin.ts'
import { charlotteChristian } from './collegeSupportPrograms/charlotte-christian.ts'
import { charlotteCatholic } from './collegeSupportPrograms/charlotte-catholic.ts'
import { charlotteCountryDay } from './collegeSupportPrograms/charlotte-country-day.ts'
import { cannon } from './collegeSupportPrograms/cannon.ts'
import { davidsonDay } from './collegeSupportPrograms/davidson-day.ts'
import { covenantDay } from './collegeSupportPrograms/covenant-day.ts'
import { carmelChristian } from './collegeSupportPrograms/carmel-christian.ts'
import { hickoryGroveChristian } from './collegeSupportPrograms/hickory-grove-christian.ts'
import { gastonDay } from './collegeSupportPrograms/gaston-day.ts'

const PROGRAMS: Record<string, CollegeSupportProgram> = {
  'providence-day': providenceDay,
  'charlotte-latin': charlotteLatin,
  'charlotte-christian': charlotteChristian,
  'charlotte-catholic': charlotteCatholic,
  'charlotte-country-day': charlotteCountryDay,
  cannon: cannon,
  'covenant-day': covenantDay,
  'carmel-christian': carmelChristian,
  'davidson-day': davidsonDay,
  'hickory-grove-christian': hickoryGroveChristian,
  'gaston-day': gastonDay,
}

/* ---------------------------------------------------------- translations -- */

/**
 * Locale overlays for this topic's prose, loaded on demand.
 *
 * MUST stand alone — `import.meta.glob` is a compile-time transform, and a
 * runtime guard around it survives into the output where `import.meta.glob` is
 * undefined, silently resolving every overlay to nothing. See clubsProgram.ts.
 */
const overlayFiles = import.meta.glob<OverlayFile>('./overlays/college-support.*.json', {
  import: 'default',
})

/** Warms the overlay for a locale; resolves once the index is ready. */
export async function loadCollegeSupportOverlay(lang: string): Promise<void> {
  if (hasOverlay('college-support', lang)) return
  const load = overlayFiles?.[`./overlays/college-support.${lang}.json`]
  if (!load) {
    setOverlayIndex('college-support', lang, undefined)
    return
  }
  try {
    setOverlayIndex('college-support', lang, indexOverlay(await load()))
  } catch {
    // A missing or malformed overlay must not break the page: English stands in.
    setOverlayIndex('college-support', lang, undefined)
  }
}

/**
 * The structured College Support program for a school, or undefined.
 *
 * With no overlay for `lang` this returns the English object BY REFERENCE (see
 * the identity requirement in src/lib/localizeData.ts).
 */
export function collegeSupportProgram(
  slug: string,
  lang = 'en',
): CollegeSupportProgram | undefined {
  const en = PROGRAMS[slug]
  if (!en || lang === 'en') return en
  return localized(en, overlayIndex('college-support', lang), slug)
}
