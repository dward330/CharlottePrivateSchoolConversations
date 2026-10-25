// Structured data for the "Learning Support & Student Services" research area —
// six cards in a fixed parent-priority order: can the school serve my child,
// the services at a glance (with a need filter), therapy, testing, the people,
// and the questions to ask on the tour. Every card is optional per school.
//
// From the Claude Design handoff "Learning Support Section Redesign"
// (2026-10-20), built first for Hickory Grove Christian. Kept OFF Compare — see
// COMPARE_DEFERRED_TOPICS in src/lib/manifest.ts — so the stat strip is the
// topic's own `stats`, never VALUE_METRICS rows.
//
// The rules that shape every type below (see ./learningSupport/README.md):
//
//  - THIS SCHOOL ONLY. No cohort comparisons, no state-funding (ESA+ /
//    Opportunity Scholarship) content, no public-district evaluation route.
//  - A GAP IS SHOWN, NEVER BLANK. A service the school's pages do not mention
//    carries the code 'NS' and renders a dashed NOT STATED chip — a blank cell
//    reads as "not offered", which is a different (and unsupported) claim.
//  - ONLY THE SCHOOL'S OWN PAGES ARE EVIDENCE. A service is coded from what an
//    official school page or PDF states; every card's `sources` lists them.
//  - EXCLUDED rows are data, not display: a service the school says it does
//    not provide stays in the record but never renders in the matrix. The
//    exclusion is shown once, in the eligibility card's "Outside scope" cell.

import type { Source } from '../components/SourceRow.tsx'

/* ------------------------------------------------------------------ types -- */

/** A bold lead sentence with an optional muted follow-on. */
export type LearningLead = { strong: string; muted?: string }

/** One stat tile. `note` is the small line under the label. */
export type LearningStat = { value: string; label: string; note?: string }

/**
 * How a service is delivered, as the school's own pages state it.
 *  IH        in-house staff, included
 *  IH_FEE    in-house staff, billed beyond tuition
 *  RF        the school refers families elsewhere
 *  REQUIRED  something the family must supply (documentation)
 *  NS        not found on the school's pages — NOT the same as not offered
 *  EXCLUDED  the school says it does not provide this; never rendered in 1b
 */
export type LearningCode = 'IH' | 'IH_FEE' | 'RF' | 'REQUIRED' | 'NS' | 'EXCLUDED'

/** The need filter's values. Labels are chrome (`learning.need.<id>`). */
export const LEARNING_NEEDS = ['read', 'attn', 'math', 'speech', 'motor', 'social', 'gifted'] as const
export type LearningNeed = (typeof LEARNING_NEEDS)[number]

export type EligibilityCard = {
  headline: string
  /** Optional bold lead above the cells; omit it and the cells start the card. */
  intro?: LearningLead
  /** The three cells, in order: who's eligible, arriving with a plan, outside scope. */
  eligible: string
  plan: string
  scope: string
  /** Optional muted line under the cells. */
  note?: string
  sources: Source[]
}

export type ServiceRow = {
  service: string
  code: LearningCode
  detail: string
  /** The needs this row applies to; an empty list matches only "All". */
  needs: LearningNeed[]
}

export type ServicesCard = {
  headline: string
  /** One verdict per need, shown when that need is picked. Omit to show none. */
  verdicts: Partial<Record<LearningNeed, { head: string; body: string }>>
  groups: { name: string; rows: ServiceRow[] }[]
  sources: Source[]
}

export type TherapyCard = {
  headline: string
  /** Speech-language, occupational, physical — each with its own code. */
  items: { name: string; code: LearningCode; detail?: string }[]
  /** Optional closing line under the strip. */
  note?: string
  sources: Source[]
}

export type TestingCard = {
  headline: string
  entries: { code: LearningCode; title: string; text: string; muted?: string }[]
  sources: Source[]
}

export type StaffCard = {
  headline: string
  /**
   * `email` only where the school's own directory publishes it — never built
   * from a name pattern. Rendered as a mailto link, never translated.
   */
  people: { name: string; role: string; email?: string }[]
  note?: LearningLead
  sources: Source[]
}

export type AskCard = {
  headline: string
  questions: string[]
  /** "October 20, 2026" — the date the research was checked, as prose. */
  asOf: string
}

/** One school's Learning Support & Student Services entry. */
export type LearningSupportProgram = {
  /**
   * The section takes the school's colours: `brand` for ink and fills,
   * `gold` for rules and badges only (never text on the light ground).
   */
  colors: { brand: string; gold: string }
  lead: LearningLead
  /** ≤4 tiles; the strip renders nothing when empty. */
  stats: LearningStat[]
  eligibility?: EligibilityCard
  services?: ServicesCard
  therapy?: TherapyCard
  testing?: TestingCard
  staff?: StaffCard
  ask?: AskCard
}

/**
 * The card contract — order is fixed across schools, and each `key` matches
 * the optional field on LearningSupportProgram so SchoolDetail can filter to
 * the cards a school actually has. Titles are chrome
 * (`cards.learning-support.<key>`).
 */
export const LEARNING_SUPPORT_CARDS = [
  { key: 'eligibility', title: 'Can They Serve My Child?' },
  { key: 'services', title: 'Services at a Glance' },
  { key: 'therapy', title: 'Therapy & Related Services' },
  { key: 'testing', title: 'Testing & Evaluation' },
  { key: 'staff', title: "Who You'll Work With" },
  { key: 'ask', title: 'Ask the School' },
] as const satisfies readonly {
  key: 'eligibility' | 'services' | 'therapy' | 'testing' | 'staff' | 'ask'
  title: string
}[]

export type LearningSupportCardKey = (typeof LEARNING_SUPPORT_CARDS)[number]['key']

/** Cards that span the full grid row even when closed, as in the design. */
export const WIDE_LEARNING_CARDS: ReadonlySet<LearningSupportCardKey> = new Set([
  'eligibility',
  'services',
  'ask',
])

/* ------------------------------------------------------------ school data -- */

/**
 * Per-school entries live in ./learningSupport/<slug>.ts. Hickory Grove
 * Christian, Cannon and Davidson Day are researched; every other school is
 * ABSENT rather than present-and-empty, and with no source-material folder the
 * section never renders on its page.
 */
import {
  localized,
  indexOverlay,
  setOverlayIndex,
  overlayIndex,
  hasOverlay,
  type OverlayFile,
} from '../lib/localizeData.ts'
import { cannon } from './learningSupport/cannon.ts'
import { davidsonDay } from './learningSupport/davidson-day.ts'
import { hickoryGroveChristian } from './learningSupport/hickory-grove-christian.ts'

const PROGRAMS: Record<string, LearningSupportProgram> = {
  cannon,
  'davidson-day': davidsonDay,
  'hickory-grove-christian': hickoryGroveChristian,
}

/* ---------------------------------------------------------- translations -- */

/**
 * Locale overlays for this topic's prose, loaded on demand.
 *
 * MUST stand alone — `import.meta.glob` is a compile-time transform, and a
 * runtime guard around it survives into the output where `import.meta.glob` is
 * undefined, silently resolving every overlay to nothing. See afterSchool.ts.
 */
const overlayFiles = import.meta.glob<OverlayFile>('./overlays/learning-support.*.json', {
  import: 'default',
})

/** Warms the overlay for a locale; resolves once the index is ready. */
export async function loadLearningSupportOverlay(lang: string): Promise<void> {
  if (hasOverlay('learning-support', lang)) return
  const load = overlayFiles?.[`./overlays/learning-support.${lang}.json`]
  if (!load) {
    setOverlayIndex('learning-support', lang, undefined)
    return
  }
  try {
    setOverlayIndex('learning-support', lang, indexOverlay(await load()))
  } catch {
    // A missing or malformed overlay must not break the page: English stands in.
    setOverlayIndex('learning-support', lang, undefined)
  }
}

/**
 * The structured Learning Support entry for a school, or undefined.
 *
 * With no overlay for `lang` this returns the English object BY REFERENCE (see
 * the identity requirement in src/lib/localizeData.ts).
 */
export function learningSupportProgram(
  slug: string,
  lang = 'en',
): LearningSupportProgram | undefined {
  const en = PROGRAMS[slug]
  if (!en || lang === 'en') return en
  return localized(en, overlayIndex('learning-support', lang), slug)
}
