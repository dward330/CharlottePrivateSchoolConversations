// Structured data for the "Faith & Spiritual Life" research area — ten cards
// in a fixed order: chapel, Bible classes, retreats, small groups, what the
// school believes, what it asks of families, service, who leads it, what
// exists for parents, and the questions to ask on the tour. Every card is
// optional per school, and a card with zero items is omitted.
//
// From the Claude Design file "Faith & Spiritual Life Section" (2026-11-26,
// plan `faithlife`), built first for Charlotte Christian School. It reuses the
// Learning Support card vocabulary (`ls-*` classes) on purpose. Kept OFF
// Compare — see COMPARE_DEFERRED_TOPICS in src/lib/manifest.ts — so the stat
// strip is the topic's own `stats`, never VALUE_METRICS rows.
//
// The rules that shape every type below (see ./faithLife/README.md):
//
//  - ONLY THE SCHOOL'S OWN PAGES ARE EVIDENCE. No third-party page, no church
//    site. Every card's `sources` lists the specific pages.
//  - BELIEF STATEMENTS ARE VERBATIM AND WHOLE. A statement of faith is stored
//    one article per string, char-for-char, with no summary and no comment.
//  - A GAP IS SHOWN, NEVER BLANK. A requirement the school's public pages do
//    not state carries `status: 'notStated'` and renders a dashed NOT STATED
//    chip. That is not the same claim as "not required".
//  - NO STUDENT IS NAMED, and no personal detail of a staff member is carried.
//  - NO TRIP PRICES AND NO EXACT TRAVEL DATES: season and year only.

import type { Source } from '../components/SourceRow.tsx'

/* ------------------------------------------------------------------ types -- */

/** A bold lead sentence with an optional muted follow-on. */
export type FaithLead = {
  strong: string
  muted?: string
}

/** One stat tile. `note` is the small line under the label. */
export type FaithStat = {
  value: string
  label: string
  note?: string
}

/** A note paragraph: optional bold opener, plain text, muted follow-on. */
export type FaithNote = {
  strong?: string
  text?: string
  muted?: string
}

/** Word chips. Labels are chrome (`faith.code.<word>`). */
export type FaithWord = 'all' | 'weekly' | 'monthly' | 'yearly'

/**
 * The chip beside an entry: a grade band authored once as a figure (`JK–4`,
 * `5–8`, `9–12`) and never translated, or a word chip rendered from chrome.
 */
export type FaithChip = { band: string } | { word: FaithWord }

/** One chip + title + text row (chapel, groups, service, parents). */
export type FaithEntry = {
  chip: FaithChip
  title: string
  text: string
  muted?: string
}

/**
 * Every card carries `headline` (the teaser under the card title), `sources`
 * and an optional `verify` (research bookkeeping: dev server only). The fields
 * are written out on each card type, never shared through an intersection:
 * `gen_data_schema.mjs` reads `export type X = { … }` blocks as text.
 */
export type EntriesCard = {
  headline: string
  entries: FaithEntry[]
  note?: FaithNote
  sources: Source[]
  verify?: string[]
}

export type ClassRow = {
  label: string
  /** Grade as a figure: `JK`, `K`, `1` … `12`. */
  band: string
  /** Credits as the school prints them (`1`, `.5`); adds "· N CREDIT" to the chip. */
  credit?: string
  detail: string
}

export type ClassesCard = {
  headline: string
  intro?: FaithNote
  groups: { name: string; tally?: string; rows: ClassRow[] }[]
  note?: FaithNote
  sources: Source[]
  verify?: string[]
}

export type RetreatsCard = {
  headline: string
  cells: { title: string; text: string }[]
  note?: FaithNote
  sources: Source[]
  verify?: string[]
}

export type BeliefsCard = {
  headline: string
  /** The mission statement, quoted whole. */
  mission?: string
  /** Core values: the value and the Bible reference the school pairs it with. */
  values?: { name: string; verse: string }[]
  note?: FaithNote
  /** The statement of faith: one whole verbatim article per string, in page order. */
  articles?: string[]
  sources: Source[]
  verify?: string[]
}

export type FamilyRow = {
  label: string
  /** `notStated` = not found on the school's public pages. Never "not required". */
  status: 'published' | 'notStated'
  detail: string
}

export type FamiliesCard = {
  headline: string
  groups: { name: string; rows: FamilyRow[] }[]
  note?: FaithNote
  sources: Source[]
  verify?: string[]
}

/**
 * `email` only where the school's own directory publishes it — never built
 * from a name pattern. Rendered as a mailto link, never translated.
 */
export type FaithPerson = {
  name: string
  role: string
  email?: string
}

export type FaithStaffCard = {
  headline: string
  people: FaithPerson[]
  note?: FaithLead
  sources: Source[]
  verify?: string[]
}

export type FaithAskCard = {
  headline: string
  questions: string[]
  /** "November 26, 2026" — the date the research was checked, as prose. */
  asOf: string
  verify?: string[]
}

/** One school's Faith & Spiritual Life entry. */
export type FaithLifeProgram = {
  /**
   * The section takes the school's colors: `brand` for ink and fills, `gold`
   * (the second accent) for rules and badges only.
   */
  colors: { brand: string; gold: string }
  lead: FaithLead
  /** ≤4 tiles; the strip renders nothing when empty. */
  stats: FaithStat[]
  chapel?: EntriesCard
  classes?: ClassesCard
  retreats?: RetreatsCard
  groups?: EntriesCard
  beliefs?: BeliefsCard
  families?: FamiliesCard
  service?: EntriesCard
  staff?: FaithStaffCard
  parents?: EntriesCard
  ask?: FaithAskCard
}

/**
 * The card contract — order is fixed across schools, and each `key` matches
 * the optional field on FaithLifeProgram so SchoolDetail can filter to the
 * cards a school actually has. Titles are chrome
 * (`cards.faith-spiritual-life.<key>`).
 */
export const FAITH_LIFE_CARDS = [
  { key: 'chapel', title: 'Chapel & Worship' },
  { key: 'classes', title: 'Bible & Faith Classes' },
  { key: 'retreats', title: 'Retreats' },
  { key: 'groups', title: 'Small Groups & Discipleship' },
  { key: 'beliefs', title: 'What the School Believes' },
  { key: 'families', title: 'What It Asks of Families' },
  { key: 'service', title: 'Service & Missions' },
  { key: 'staff', title: 'Who Leads Spiritual Life' },
  { key: 'parents', title: 'Faith Life for Parents' },
  { key: 'ask', title: 'Ask the School' },
] as const satisfies readonly {
  key:
    | 'chapel'
    | 'classes'
    | 'retreats'
    | 'groups'
    | 'beliefs'
    | 'families'
    | 'service'
    | 'staff'
    | 'parents'
    | 'ask'
  title: string
}[]

export type FaithLifeCardKey = (typeof FAITH_LIFE_CARDS)[number]['key']

/**
 * Cards that span the full grid row even when closed, as in the design: all
 * but Service and Staff, which sit two-up.
 */
export const WIDE_FAITH_CARDS: ReadonlySet<FaithLifeCardKey> = new Set([
  'chapel',
  'classes',
  'retreats',
  'groups',
  'beliefs',
  'families',
  'parents',
  'ask',
])

/* ------------------------------------------------------------ school data -- */

/**
 * Per-school entries live in ./faithLife/<slug>.ts. Charlotte Christian is the
 * only school researched; every other school is ABSENT rather than
 * present-and-empty, and with no source-material folder the section never
 * renders on its page.
 */
import {
  localized,
  indexOverlay,
  setOverlayIndex,
  overlayIndex,
  hasOverlay,
  type OverlayFile,
} from '../lib/localizeData.ts'
import { charlotteChristian } from './faithLife/charlotte-christian.ts'

const PROGRAMS: Record<string, FaithLifeProgram> = {
  'charlotte-christian': charlotteChristian,
}

/* ---------------------------------------------------------- translations -- */

/**
 * Locale overlays for this topic's prose, loaded on demand.
 *
 * MUST stand alone — `import.meta.glob` is a compile-time transform, and a
 * runtime guard around it survives into the output where `import.meta.glob` is
 * undefined, silently resolving every overlay to nothing. See afterSchool.ts.
 */
const overlayFiles = import.meta.glob<OverlayFile>('./overlays/faith-spiritual-life.*.json', {
  import: 'default',
})

/** Warms the overlay for a locale; resolves once the index is ready. */
export async function loadFaithLifeOverlay(lang: string): Promise<void> {
  if (hasOverlay('faith-spiritual-life', lang)) return
  const load = overlayFiles?.[`./overlays/faith-spiritual-life.${lang}.json`]
  if (!load) {
    setOverlayIndex('faith-spiritual-life', lang, undefined)
    return
  }
  try {
    setOverlayIndex('faith-spiritual-life', lang, indexOverlay(await load()))
  } catch {
    // A missing or malformed overlay must not break the page: English stands in.
    setOverlayIndex('faith-spiritual-life', lang, undefined)
  }
}

/**
 * The structured Faith & Spiritual Life entry for a school, or undefined.
 *
 * With no overlay for `lang` this returns the English object BY REFERENCE (see
 * the identity requirement in src/lib/localizeData.ts).
 */
export function faithLifeProgram(slug: string, lang = 'en'): FaithLifeProgram | undefined {
  const en = PROGRAMS[slug]
  if (!en || lang === 'en') return en
  return localized(en, overlayIndex('faith-spiritual-life', lang), slug)
}
