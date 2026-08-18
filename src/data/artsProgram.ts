// The "The Arts" research area — five consolidated cards per school, replacing
// the six prose sub-sections the ingest pipeline produces (see
// components/ArtsProgram.tsx).
//
// Recreates the design's "Arts Section Redesign" using the app's own tokens
// (src/index.css). The design's premise: arts parents ask by DISCIPLINE — "my
// kid sings", "my kid draws", "my kid wants the stage" — but the old card set
// scattered each discipline's proof into a separate "Awards & Recognition"
// card, away from the program it validated. So each discipline card here
// absorbs its own recognition, the overview becomes a division-by-division
// ladder, and the In-Depth Report becomes what it really is: a verdict plus a
// visit checklist.
//
//   1a The TK–12 Arts Ladder      — division rungs, stat strip, enrichment layer
//   1b Theatre & the Blumeys      — season rhythm + year-by-year awards ledger
//   1c Music & the Honors Pipeline — ensemble board + numbered honors ladder
//   1d Studio to Gallery          — studio media, course path, exhibit calendar
//   1e Verdict & Visit Checklist  — why it holds up + tickable tour questions
//
// Every figure here is transcribed from that school's OWN published arts pages,
// Blumenthal Arts / Blumey nominee lists, NCTC results, or named news coverage
// — see the committed research files under source-material/the-arts/<school>/
// for the hard data, source URLs, and per-school gap notes. Nothing is
// inferred, averaged, or carried across schools.
//
// Cards are OPTIONAL by design. A school with no theatre season and no awards
// history gets no 1b; one with no documented honors pipeline may still get a
// 1c if its ensembles are real. Rendering a thin card would imply the research
// found nothing when the truth is the school publishes nothing — see the
// `ArtsProgram` fields, all of which may be undefined. Card order and numbering
// stay fixed across schools for the cards that do render.

/* ---------------------------------------------------------------- shared -- */

/** A citation shown in a card's SOURCE row. `url` makes it a clickable link. */
export type ArtsSource = {
  /** Human-readable label, e.g. "providenceday.org — US Arts". */
  label: string
  /** Deep link to the specific page the fact came from. */
  url?: string
}

/** A stat tile in a card's four-up strip. */
export type ArtsStat = {
  /** Large figure, e.g. "TK–12" or "3 AP". */
  value: string
  /** Caption beneath, e.g. "continuous arts program". */
  label: string
}

/**
 * A real photograph of this school's own arts space. The design gives cards
 * 1a / 1b / 1d a photo slot; per the handoff, a slot with no genuine photo is
 * dropped entirely rather than shipped as an empty placeholder, and the
 * adjacent column takes the full width.
 */
export type ArtsPhoto = {
  /** Path under public/, e.g. "/arts/providence-day-mcmahon.jpg". */
  src: string
  /** Venue or subject name, bolded in the caption. */
  name: string
  /** Muted caption line describing what the space holds. */
  caption?: string
  /** Where the photo came from — required for attribution. */
  credit?: string
}

/* --------------------------------------------------------- 1a arts ladder -- */

/** One division column of the ladder — a rung on the TK–12 climb. */
export type Division = {
  /** e.g. "Lower School". */
  name: string
  /** Grade range shown beside the name, e.g. "TK–5". */
  grades?: string
  /** What arts arrive at this rung, one line each. */
  items: string[]
}

/** One row of the enrichment layer beneath the ladder. */
export type EnrichmentRow = {
  /** e.g. "Spotlight on the Arts", "Visiting artists". */
  label: string
  text: string
}

export type ArtsLadder = {
  /** Lead sentence, bolded on the card. */
  headline: string
  /** Muted continuation of the headline. */
  subhead?: string
  /** Four-up stat strip above the ladder. */
  stats: ArtsStat[]
  divisions: Division[]
  /** Heading over the enrichment rows, e.g. "The enrichment layer". */
  enrichmentTitle?: string
  enrichment: EnrichmentRow[]
  /** The facility photo. Omitted when no genuine photo could be sourced. */
  photo?: ArtsPhoto
  sources: ArtsSource[]
}

/* ------------------------------------------------------------- 1b theatre -- */

/** One half of the season board — the fall slot or the spring slot. */
export type SeasonSlot = {
  /** "Fall" | "Spring", or the school's own framing. */
  season: string
  /** What kind of show fills it, e.g. "Play / One-Act", "Musical". */
  kind: string
  /** Current and recent productions, as prose. */
  detail: string
}

/**
 * One year of the awards ledger. The design renders these as a scrollable
 * list with a sticky header; `win` fills the WIN chip.
 */
export type AwardRow = {
  /** e.g. "2025". */
  year: string
  /** The show that was judged, e.g. "Peter Pan". */
  show: string
  /** What it won or was nominated for. */
  result: string
  /** Renders the filled WIN chip ahead of the result. */
  win?: boolean
}

export type Theatre = {
  headline: string
  subhead?: string
  /** Heading over the season board. */
  seasonTitle?: string
  /** Fall and spring slots. Omit the card if a school has no season at all. */
  season: SeasonSlot[]
  /** Who runs it — director, technical director, the tech-theater track. */
  whoRunsIt?: string
  /** Closing note on venue, ticketing, festival participation. */
  venueNote?: string
  /**
   * Heading over the ledger, e.g. "The Blumey ledger". Adapted per school:
   * a school outside the Blumey footprint gets its own framing.
   */
  ledgerTitle?: string
  /**
   * Year-by-year external judging. Omitted entirely when a school has no
   * awards history — the card still renders on its season data alone.
   */
  ledger?: AwardRow[]
  /** The "honest context" note — where this school sits in the field. */
  honestContext?: string
  /** The theatre photo. Omitted when no genuine photo could be sourced. */
  photo?: ArtsPhoto
  sources: ArtsSource[]
}

/* --------------------------------------------------------------- 1c music -- */

/**
 * One track of the ensemble board. The design splits ensembles by how a
 * student gets in, because that is the question a parent is actually asking.
 */
export type EnsembleTrack = {
  /** e.g. "Curricular — join by enrolling", "Auditioned — earn a seat". */
  label: string
  /** Ensemble names in this track. */
  ensembles: string[]
}

/** One numbered rung of the honors ladder. */
export type HonorsRung = {
  /** Bolded lead, e.g. "Join an ensemble". */
  label: string
  text: string
}

export type Music = {
  headline: string
  subhead?: string
  boardTitle?: string
  tracks: EnsembleTrack[]
  /** Note beneath the board — who chairs it, affiliations. */
  boardNote?: string
  ladderTitle?: string
  /** The join → audition up → external honors → honor society climb. */
  ladder: HonorsRung[]
  /** Note beneath the ladder — usually what could not be confirmed. */
  ladderNote?: string
  sources: ArtsSource[]
}

/* -------------------------------------------------------- 1d visual arts -- */

/** One tile of the studio-media grid. */
export type Medium = {
  /** e.g. "Film photography". */
  name: string
  /** Muted qualifier, e.g. "shot, developed & printed in-house". */
  detail?: string
}

/** One step of the course path chevron, e.g. Art I → Art II → AP Studio Art. */
export type CourseStep = {
  name: string
  /** The terminal course, rendered as a filled accent chip. */
  terminal?: boolean
}

/** One column of the "where the work goes public" exhibition calendar. */
export type Exhibit = {
  /** Cadence kicker, e.g. "Spring", "Annual", "Monthly". */
  when: string
  name: string
  detail?: string
}

export type VisualArts = {
  headline: string
  subhead?: string
  mediaTitle?: string
  media: Medium[]
  pathTitle?: string
  path: CourseStep[]
  /** Trailing note on the path, e.g. "AP Art History runs parallel". */
  pathNote?: string
  exhibitsTitle?: string
  exhibits: Exhibit[]
  /** Faculty roster and recognition caveats. */
  footnote?: string
  /** The studio / darkroom photo. Omitted when none could be sourced. */
  photo?: ArtsPhoto
  sources: ArtsSource[]
}

/* ------------------------------------------------------------- 1e verdict -- */

export type Verdict = {
  headline: string
  subhead?: string
  holdsUpTitle?: string
  /** The "why it holds up" checkmark rows. */
  holdsUp: { label: string; text: string }[]
  /** Tickable "ask on the tour" questions. */
  ask: string[]
  sources: ArtsSource[]
}

/* --------------------------------------------------------------- program -- */

/**
 * One school's full Arts research area. Every card is optional: a school with
 * no theatre season and no awards history omits `theatre`, one that publishes
 * no ensemble detail omits `music`. SchoolDetail renders only the cards
 * present, in this fixed order, so numbering stays consistent across schools.
 */
export type ArtsProgram = {
  ladder?: ArtsLadder
  theatre?: Theatre
  music?: Music
  visual?: VisualArts
  verdict?: Verdict
}

/**
 * Per-card metadata: the number badge, title, and kicker shown on each card.
 * `title` is the default; a school may override it via `TITLE_OVERRIDES` below
 * when a regional award does not apply to it.
 */
export const ARTS_CARDS = [
  { key: 'ladder', num: '1a', title: 'The TK–12 Arts Ladder', kicker: 'Topic 01 of 05' },
  { key: 'theatre', num: '1b', title: 'Theatre & the Blumeys', kicker: 'Topic 02 of 05' },
  { key: 'music', num: '1c', title: 'Music & the Honors Pipeline', kicker: 'Topic 03 of 05' },
  { key: 'visual', num: '1d', title: 'Studio to Gallery', kicker: 'Topic 04 of 05' },
  { key: 'verdict', num: '1e', title: 'Verdict & Visit Checklist', kicker: 'Topic 05 of 05' },
] as const satisfies readonly {
  key: keyof ArtsProgram
  num: string
  title: string
  kicker: string
}[]

/**
 * Per-school card-title overrides, driven by what the research actually found.
 *
 *  - The ladder is renamed for each school's own grade span (Cannon and Country
 *    Day start at JrK/JK, not TK; Davidson Day from early childhood).
 *  - The theatre card is renamed only where the Blumeys are not the school's
 *    story. The Blumeys are Blumenthal Performing Arts' Charlotte-region
 *    high-school musical-theater awards, so a card naming them must not appear
 *    for a school that does not compete in them.
 *
 * Worth recording, because it contradicts the obvious guess: BOTH out-of-town
 * schools do compete. Cannon (Concord, Cabarrus County) has ten verified Blumey
 * finalist placements across 2023 and 2025 and enters again in 2026, so it keeps
 * the Blumey title. Davidson Day (Davidson) has 2023 program-level nominations
 * and three 2026 finalists — but no NCTC record at all, so its card is titled
 * for the recognition it actually has rather than implying a second circuit.
 * Charlotte Christian competes in four circuits, of which the Blumeys are one,
 * so its card is titled for the wider set.
 */
const TITLE_OVERRIDES: Record<string, Partial<Record<keyof ArtsProgram, string>>> = {
  // Charlotte Catholic is a 9–12 school — the only one on this roster with no
  // lower or middle school — so there is no TK–12 ladder to describe. It DOES
  // compete in the Blumeys (five finalists in 2025, five more placements in
  // 2026), so the theatre card keeps the shared Blumey title.
  'charlotte-catholic': {
    ladder: 'The 9–12 Arts Ladder',
  },
  cannon: {
    ladder: 'The JrK–12 Arts Ladder',
  },
  'charlotte-country-day': {
    ladder: 'The JK–12 Arts Ladder',
  },
  'charlotte-christian': {
    ladder: 'The JK–12 Arts Ladder',
    theatre: 'Theatre, the Blumeys & CITA',
  },
  'davidson-day': {
    ladder: 'The Early Childhood–12 Arts Ladder',
    theatre: 'Theatre & External Recognition',
  },
}

/**
 * The school slug when this school overrides the shared card title, else
 * undefined.
 *
 * An override varies per school, so it is a research finding rather than chrome.
 * `cardTitle()` uses this to look the title up under a school-scoped key
 * (`cards.the-arts.ladder@davidson-day`) instead of the shared one, and falls
 * back to the school's own English wording if that key is absent.
 */
export function titleOverrideSlug(slug: string, key: keyof ArtsProgram): string | undefined {
  return TITLE_OVERRIDES[slug]?.[key] != null ? slug : undefined
}

/** The card title for a school, applying any per-school override. */
export function artsCardTitle(
  slug: string,
  card: (typeof ARTS_CARDS)[number],
): string {
  return TITLE_OVERRIDES[slug]?.[card.key] ?? card.title
}

/* ------------------------------------------------------------ school data -- */

/**
 * Per-school entries live in ./artsPrograms/<slug>.ts so each school's research
 * stays reviewable on its own. Add a school by importing it here.
 */
import {
  localized,
  indexOverlay,
  setOverlayIndex,
  overlayIndex,
  hasOverlay,
  type OverlayFile,
} from '../lib/localizeData.ts'
import { providenceDay } from './artsPrograms/providence-day.ts'
import { charlotteLatin } from './artsPrograms/charlotte-latin.ts'
import { charlotteChristian } from './artsPrograms/charlotte-christian.ts'
import { charlotteCatholic } from './artsPrograms/charlotte-catholic.ts'
import { charlotteCountryDay } from './artsPrograms/charlotte-country-day.ts'
import { cannon } from './artsPrograms/cannon.ts'
import { davidsonDay } from './artsPrograms/davidson-day.ts'
import { covenantDay } from './artsPrograms/covenant-day.ts'
import { carmelChristian } from './artsPrograms/carmel-christian.ts'
import { hickoryGroveChristian } from './artsPrograms/hickory-grove-christian.ts'
import { gastonDay } from './artsPrograms/gaston-day.ts'

const PROGRAMS: Record<string, ArtsProgram> = {
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
 * MUST stand alone — `import.meta.glob` is a compile-time transform, and
 * wrapping it in a runtime guard leaves the guard in the output where
 * `import.meta.glob` is undefined, so every overlay silently resolves to
 * nothing. See the note in src/data/clubsProgram.ts.
 */
const overlayFiles = import.meta.glob<OverlayFile>('./overlays/the-arts.*.json', {
  import: 'default',
})

/** Warms the overlay for a locale; resolves once the index is ready. */
export async function loadArtsOverlay(lang: string): Promise<void> {
  if (hasOverlay('the-arts', lang)) return
  const load = overlayFiles?.[`./overlays/the-arts.${lang}.json`]
  if (!load) {
    setOverlayIndex('the-arts', lang, undefined)
    return
  }
  try {
    setOverlayIndex('the-arts', lang, indexOverlay(await load()))
  } catch {
    // A missing or malformed overlay must not break the page: English stands in.
    setOverlayIndex('the-arts', lang, undefined)
  }
}

/**
 * The structured Arts program for a school, or undefined if not yet built.
 *
 * With no overlay for `lang` this returns the English object BY REFERENCE (see
 * the identity requirement in src/lib/localizeData.ts).
 */
export function artsProgram(slug: string, lang = 'en'): ArtsProgram | undefined {
  const en = PROGRAMS[slug]
  if (!en || lang === 'en') return en
  return localized(en, overlayIndex('the-arts', lang), slug)
}
