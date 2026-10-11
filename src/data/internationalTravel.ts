// Structured data for the "International Travel" research area — seven cards in a
// fixed parent-priority order (where students go, when a child can start,
// exchanges, the school's credential, its network, signing up, and a verdict
// with questions to ask on the tour).
//
// Placed directly after Course Offerings in TOPIC_ORDER at the user's request
// (2026-10-11), and deliberately kept OFF Compare — see COMPARE_DEFERRED_TOPICS
// in src/lib/manifest.ts. The four headline numbers are therefore the topic's
// own `stats`, never VALUE_METRICS rows, which would feed Compare's Key Stats.
//
// Two rules shape every type below (see ./internationalTravel/README.md):
//
//  - Every optional block is OMIT-TO-HIDE. A card the school publishes nothing
//    for is left off its data file and does not render; a trip with no stated
//    timing simply has no `timing`. Nothing here has a field for "not stated".
//  - Gaps go to ONE place: the verdict card's `ask` list. Cards 1–6 carry only
//    what a live page states, and every card's `sources` lists those pages.

import type { Source } from '../components/SourceRow.tsx'

/* ------------------------------------------------------------------ types -- */

/** A bold lead sentence with an optional muted follow-on. */
export type TravelLead = { strong: string; muted?: string }

/** One stat tile. `note` is the small line under the label. */
export type TravelStat = { value: string; label: string; note?: string }

/**
 * A real, sourced photograph. `src` is a public/ path resolved through
 * assetUrl(). No student may be named in `alt`, `caption` or the filename.
 */
export type TravelPhoto = {
  src: string
  alt: string
  caption?: { title: string; text: string }
  credit?: string
}

/** Division code — a filter value, never rendered raw. */
export type TravelDivision = 'LS' | 'MS' | 'US'

export type Trip = {
  dest: string
  place?: string
  div: TravelDivision
  /** Group size as the source states it ("6 students"). */
  group?: string
  theme: string
  timing?: string
  /** Where the homestay was; renders as the "Homestay · {{place}}" tag. */
  homestay?: string
}

export type TripYear = { year: string; note?: string; trips: Trip[] }

export type TripsCard = {
  headline: string
  intro: TravelLead
  years: TripYear[]
  photo?: TravelPhoto
  alsoOnRecord: { lead: string; text: string }[]
  sources: Source[]
}

export type StartCard = {
  headline: string
  intro: TravelLead
  framework?: { name: string; text: string }[]
  divisions: { name: string; grades: string; theme?: string; items: string[] }[]
  languages?: { title: string; steps: { when: string; text: string }[] }
  sources: Source[]
}

export type ExchangePartner = {
  country: string
  years: string
  school: string
  out?: string
  in?: string
}

export type ExchangesCard = {
  headline: string
  intro: TravelLead
  partners: ExchangePartner[]
  photo?: TravelPhoto
  homestays: { place: string; text: string }[]
  sources: Source[]
}

export type CredentialCard = {
  headline: string
  intro: TravelLead
  stats: TravelStat[]
  required: string[]
  beyond: string[]
  quote?: { text: string; attribution: string }
  award?: { name: string; text: string }
  sources: Source[]
}

export type NetworkCard = {
  headline: string
  intro: TravelLead
  /** Per-school sub-head over the conference ledger. */
  ledgerTitle?: string
  conferences: { year: string; text: string }[]
  cells: { name: string; text: string }[]
  rows: { label: string; text: string }[]
  sources: Source[]
}

export type SignupCard = {
  headline: string
  intro: TravelLead
  groups: {
    title: string
    note?: string
    events: { when: string; name: string; detail?: string }[]
  }[]
  /** Show the "confirm on the live calendar" footnote. */
  footnote?: boolean
  sources: Source[]
}

export type VerdictCard = {
  headline: string
  standsOut: { summary: string; points: string[] }
  ask: { topic: string; question: string }[]
  sources: Source[]
}

/** One school's International Travel entry. */
export type InternationalTravelProgram = {
  lead: TravelLead
  /** ≤4 tiles; the strip renders nothing when empty. */
  stats: TravelStat[]
  trips?: TripsCard
  start?: StartCard
  exchanges?: ExchangesCard
  credential?: CredentialCard
  network?: NetworkCard
  signup?: SignupCard
  verdict?: VerdictCard
}

/**
 * The card contract — order is fixed across schools, and each `key` matches the
 * optional field on InternationalTravelProgram so SchoolDetail can filter to the
 * cards a school actually has. `credential` and `network` carry generic fallback
 * titles; a school retitles them through TITLE_OVERRIDES below.
 */
export const INTERNATIONAL_TRAVEL_CARDS = [
  { key: 'trips', title: 'Where They Go' },
  { key: 'start', title: 'When Your Child Can Start' },
  { key: 'exchanges', title: 'Exchanges & Homestays' },
  { key: 'credential', title: 'Credential' },
  { key: 'network', title: 'Network' },
  { key: 'signup', title: 'Signing Up' },
  { key: 'verdict', title: 'Verdict & Ask the School' },
] as const satisfies readonly {
  key: 'trips' | 'start' | 'exchanges' | 'credential' | 'network' | 'signup' | 'verdict'
  title: string
}[]

export type InternationalTravelCardKey = (typeof INTERNATIONAL_TRAVEL_CARDS)[number]['key']

/** Cards that span the full grid row even when closed, as in the design. */
export const WIDE_TRAVEL_CARDS: ReadonlySet<InternationalTravelCardKey> = new Set([
  'trips',
  'verdict',
])

/**
 * Per-school card titles. The credential and the network are named things —
 * Providence Day's credential IS the Global Studies Diploma — so the generic
 * "Credential" / "Network" would read as a placeholder. A school with neither
 * omits the card entirely rather than keeping a generic title.
 *
 * Each override needs a matching `cards.international-travel.<key>@<slug>` key
 * in every locale catalog, or it renders in English everywhere.
 */
const TITLE_OVERRIDES: Record<string, Partial<Record<InternationalTravelCardKey, string>>> = {
  'providence-day': {
    credential: 'The Global Studies Diploma',
    network: 'Round Square & the Wider Network',
  },
}

/** The school slug when this school overrides the shared card title, else undefined. */
export function titleOverrideSlug(
  slug: string,
  key: InternationalTravelCardKey,
): string | undefined {
  return TITLE_OVERRIDES[slug]?.[key] != null ? slug : undefined
}

/** The card title for a school, applying any per-school override. */
export function internationalTravelCardTitleFor(
  slug: string,
  card: (typeof INTERNATIONAL_TRAVEL_CARDS)[number],
): string {
  return TITLE_OVERRIDES[slug]?.[card.key] ?? card.title
}

/* ------------------------------------------------------------ school data -- */

/**
 * Per-school entries live in ./internationalTravel/<slug>.ts. Only Providence
 * Day is researched; every other school is ABSENT rather than present-and-empty,
 * and with no source-material folder the section never renders on its page.
 */
import {
  localized,
  indexOverlay,
  setOverlayIndex,
  overlayIndex,
  hasOverlay,
  type OverlayFile,
} from '../lib/localizeData.ts'
import { providenceDay } from './internationalTravel/providence-day.ts'

const PROGRAMS: Record<string, InternationalTravelProgram> = {
  'providence-day': providenceDay,
}

/* ---------------------------------------------------------- translations -- */

/**
 * Locale overlays for this topic's prose, loaded on demand.
 *
 * MUST stand alone — `import.meta.glob` is a compile-time transform, and a
 * runtime guard around it survives into the output where `import.meta.glob` is
 * undefined, silently resolving every overlay to nothing. See afterSchool.ts.
 */
const overlayFiles = import.meta.glob<OverlayFile>('./overlays/international-travel.*.json', {
  import: 'default',
})

/** Warms the overlay for a locale; resolves once the index is ready. */
export async function loadInternationalTravelOverlay(lang: string): Promise<void> {
  if (hasOverlay('international-travel', lang)) return
  const load = overlayFiles?.[`./overlays/international-travel.${lang}.json`]
  if (!load) {
    setOverlayIndex('international-travel', lang, undefined)
    return
  }
  try {
    setOverlayIndex('international-travel', lang, indexOverlay(await load()))
  } catch {
    // A missing or malformed overlay must not break the page: English stands in.
    setOverlayIndex('international-travel', lang, undefined)
  }
}

/**
 * The structured International Travel entry for a school, or undefined.
 *
 * With no overlay for `lang` this returns the English object BY REFERENCE (see
 * the identity requirement in src/lib/localizeData.ts).
 */
export function internationalTravelProgram(
  slug: string,
  lang = 'en',
): InternationalTravelProgram | undefined {
  const en = PROGRAMS[slug]
  if (!en || lang === 'en') return en
  return localized(en, overlayIndex('international-travel', lang), slug)
}
