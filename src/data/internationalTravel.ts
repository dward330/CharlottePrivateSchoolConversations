// Structured data for the "International Travel" research area — nine cards in a
// fixed parent-priority order (where students go, exchanges, signing up, global
// learning at each school level, the school's credential, its network, its
// global community on campus, its firsts and milestones, and a verdict with
// questions to ask on the tour). Every card is optional per school.
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

export type TripYear = {
  year: string
  /** Shown under "All", and under a division filter that has no `noteByDiv` entry. */
  note?: string
  /**
   * Replaces `note` while the ledger is filtered to one division, for a year
   * whose note describes several ("Middle School in winter…; Upper School in…").
   */
  noteByDiv?: Partial<Record<TravelDivision, string>>
  trips: Trip[]
}

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
  /** Host-family stays abroad, one complete sentence per "City, Country". */
  homestays: { place: string; text: string }[]
  /** Visiting exchange students who joined the school's own classes. */
  visitors?: string[]
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
    /** `audience` is the division / grade band the event is for, as a tag. */
    events: { when: string; name: string; detail?: string; audience?: string }[]
  }[]
  /** Show the "confirm on the live calendar" footnote. */
  footnote?: boolean
  sources: Source[]
}

/** The school's international families, languages and on-campus programs. */
export type CommunityCard = {
  headline: string
  intro: TravelLead
  stats: TravelStat[]
  cells: { name: string; text: string }[]
  rows?: { label: string; text: string }[]
  sources: Source[]
}

export type MilestonesCard = {
  headline: string
  intro: TravelLead
  /** Oldest first. `year` is a figure ("1992", "2020–22"); key rows by year + title. */
  events: { year: string; title: string; text: string }[]
  sources: Source[]
}

export type VerdictCard = {
  headline: string
  standsOut: { summary: string; points: string[] }
  ask: { topic: string; question: string }[]
  sources: Source[]
}

/** One school's International Travel (displayed "Global Exposure") entry. */
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
  community?: CommunityCard
  milestones?: MilestonesCard
  verdict?: VerdictCard
}

/**
 * The card contract — order is fixed across schools, and each `key` matches the
 * optional field on InternationalTravelProgram so SchoolDetail can filter to the
 * cards a school actually has. `credential` and `network` carry generic fallback
 * titles; a school retitles them through TITLE_OVERRIDES below.
 */
export const INTERNATIONAL_TRAVEL_CARDS = [
  // Order set by the user on review (2026-10-11): exchanges and signing up move
  // ahead of the school-level overview, so the "how do we take part" cards follow
  // the trip ledger directly. `community` and `milestones` were added with
  // Charlotte Country Day (2026-10-12, user-approved) as shared, optional cards.
  // The user placed `community` fourth, after Signing Up, for every school, current
  // and future (2026-10-13, communityfourth). `milestones` stays just before the Verdict,
  // so the Verdict stays last.
  { key: 'trips', title: 'Where They Go' },
  { key: 'exchanges', title: 'Exchanges & Homestays' },
  { key: 'signup', title: 'Signing Up for Travel' },
  { key: 'community', title: 'Global Community on Campus' },
  { key: 'start', title: 'Global Learning at Each School Level' },
  { key: 'credential', title: 'Credential' },
  { key: 'network', title: 'Network' },
  { key: 'milestones', title: 'Firsts & Milestones' },
  { key: 'verdict', title: 'Verdict & Ask the School' },
] as const satisfies readonly {
  key:
    | 'trips'
    | 'start'
    | 'exchanges'
    | 'credential'
    | 'network'
    | 'signup'
    | 'community'
    | 'milestones'
    | 'verdict'
  title: string
}[]

export type InternationalTravelCardKey = (typeof INTERNATIONAL_TRAVEL_CARDS)[number]['key']

/** Cards that span the full grid row even when closed, as in the design. */
export const WIDE_TRAVEL_CARDS: ReadonlySet<InternationalTravelCardKey> = new Set([
  'trips',
  'milestones',
  'verdict',
])

/**
 * Per-school card titles. The credential and the network are named things —
 * Providence Day's credential IS the Global Studies Diploma — so the generic
 * "Credential" / "Network" would read as a placeholder. A school with neither
 * omits the card entirely rather than keeping a generic title. Providence Day
 * also keeps "& GSD" on its Signing Up title, since its card lists GSD events.
 *
 * Each override needs a matching `cards.international-travel.<key>@<slug>` key
 * in every locale catalog, or it renders in English everywhere.
 */
const TITLE_OVERRIDES: Record<string, Partial<Record<InternationalTravelCardKey, string>>> = {
  'providence-day': {
    credential: 'The Global Studies Diploma',
    network: 'Round Square & the Wider Network',
    signup: 'Signing Up for Travel & GSD',
  },
  'charlotte-country-day': {
    network: "Model UN, WorldQuest & Charlotte's Global Partners",
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
 * Per-school entries live in ./internationalTravel/<slug>.ts. Providence Day and
 * Charlotte Country Day are researched; every other school is ABSENT rather than
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
import { providenceDay } from './internationalTravel/providence-day.ts'
import { charlotteCountryDay } from './internationalTravel/charlotte-country-day.ts'

const PROGRAMS: Record<string, InternationalTravelProgram> = {
  'providence-day': providenceDay,
  'charlotte-country-day': charlotteCountryDay,
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
