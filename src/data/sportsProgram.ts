// The "Sports" research area — seven consolidated cards per school, replacing
// the thirteen prose sub-sections the ingest pipeline produces (see
// components/SportsProgram.tsx).
//
// Recreates the design's "Sports Section Redesign" using the app's own tokens
// (src/index.css). The design's premise: sports parents arrive with about seven
// questions, not thirteen. Championships and Win–Loss Records are the same
// question ("do they win?"); D1 Matriculation, Power 4 Offers and Top-100
// Rankings are one question ("will my athlete get recruited?"). Merging them
// makes each card deeper instead of the set wider.
//
//   1a Sports Offered          — season board with V / JV / MS depth chips
//   1b Winning Record          — state-title matrix + win% bars
//   1c The College Pipeline    — funnel, by-sport bars, searchable roster
//   1d Honors & Pro Alumni     — pro path cards + honors ledger
//   1e Coaching                — pedigree + continuity cards, tenure ledger
//   1f Facilities & Athlete Care — photo strip, venue ledger, care model
//   1g National Stage & NIL    — rankings strip, schedule ledger, NIL timeline
//
// Every figure here is transcribed from that school's OWN published athletics
// pages, NCISAA/MaxPreps records, or named news coverage — see the committed
// research files under source-material/sports/<school>/ for the hard data,
// source URLs, and per-school gap notes. Nothing is inferred, averaged, or
// carried across schools.
//
// Cards are OPTIONAL by design. A school with no verified pro alumni gets no
// 1d; a school with no NIL story gets no 1g. Rendering a thin card would imply
// the research found nothing when the truth is the school has nothing — see
// the `SportsProgram` fields, all of which may be undefined. Card order and
// numbering stay fixed across schools for the cards that do render.

/* ---------------------------------------------------------------- shared -- */

/** A citation shown in a card's SOURCE row. `url` makes it a clickable link. */
export type SportsSource = {
  /** Human-readable label, e.g. "pdschargers.com team navigation". */
  label: string
  /** Deep link to the specific page the fact came from. */
  url?: string
}

/**
 * Competition level a school fields for a sport. The design shows these as
 * depth chips: V filled accent, JV outlined accent, MS outlined neutral.
 */
export type Level = 'V' | 'JV' | 'MS'

/* ------------------------------------------------------ 1a sports offered -- */

/** One sport within a season column of the season board. */
export type SportEntry = {
  /** Sport name as the school lists it, e.g. "Cross Country (B & G)". */
  name: string
  /** Which ladders exist beneath this program. */
  levels: Level[]
}

/** One season column (Fall / Winter / Spring) of the season board. */
export type Season = {
  /** "Fall" | "Winter" | "Spring". */
  name: string
  /** Shown beside the season heading, e.g. "9 varsity". */
  note?: string
  sports: SportEntry[]
}

/** A stat tile in a card's four-up strip. */
export type StatTile = {
  /** Large figure, e.g. "26" or "#1 in NC". */
  value: string
  /** Caption beneath, e.g. "varsity sports / programs". */
  label: string
}

export type SportsOffered = {
  /** Lead sentence, bolded on the card. */
  headline: string
  /** Muted continuation of the headline. */
  subhead?: string
  /** Four-up stat strip above the board. */
  stats: StatTile[]
  seasons: Season[]
  /** Closing note beneath the board (counting caveats, conference news). */
  footnote?: string
  sources: SportsSource[]
}

/* ------------------------------------------------------ 1b winning record -- */

/** Outcome of one program's season, rendered as a chip in the title matrix. */
export type TitleResult =
  /** NCISAA state champion — filled accent chip. */
  | 'STATE'
  /** Multiple titles in one cell (e.g. boys + girls cross country). */
  | 'STATE x2'
  /** Lost in the state final — outlined accent chip. */
  | 'RUNNER-UP'
  /** Reached the semifinal — muted text, no chip. */
  | 'SEMIFINAL'
  /** Did not place — renders as an em dash. */
  | 'NONE'

/** One cell of the state-title matrix: a season's result for a program. */
export type TitleCell = {
  result: TitleResult
  /**
   * Final season record beneath the chip, e.g. "13–0" or "meet-scored" for
   * sports scored by meet rather than W–L. Omit when genuinely unknown and
   * set `toVerify` instead.
   */
  record?: string
  /** Renders a TO VERIFY tag in place of the record. */
  toVerify?: boolean
}

/** One row of the state-title matrix — a program across three seasons. */
export type TitleRow = {
  /** Program name, e.g. "Girls Soccer". */
  program: string
  /** Exactly one cell per season in `seasonLabels`, in the same order. */
  cells: TitleCell[]
  /** Right-hand context, e.g. "Three-peat — strongest single program". */
  note?: string
}

/** One win-percentage bar beneath the matrix. */
export type WinBar = {
  program: string
  /** Combined record across the window, e.g. "34–4". */
  record: string
  /** Win percentage 0–1, drives the bar width. */
  pct: number
  /** Optional qualifier tag, e.g. "'24 SEASON" when only one year is confirmed. */
  tag?: string
}

export type WinningRecord = {
  headline: string
  subhead?: string
  /** Column headers for the matrix, e.g. ["'23–24", "'24–25", "'25–26"]. */
  seasonLabels: string[]
  rows: TitleRow[]
  /**
   * The "what they didn't win" honesty note — which rivals took the titles
   * this school did not. Rendered beneath the matrix.
   */
  didNotWin?: string
  bars: WinBar[]
  /** Season-by-season prose, shown in a collapsible detail row. */
  seasonDetail?: { program: string; text: string }[]
  sources: SportsSource[]
}

/* ----------------------------------------------------- 1c college pipeline -- */

/** Recruiting level, driving both the roster filter tabs and the row tag. */
export type CommitLevel = 'P4' | 'D1' | 'D2' | 'D3' | 'NAIA'

/** One athlete's college-athletics commitment. */
export type Commit = {
  /** Graduating class, e.g. "'26". */
  cls: string
  name: string
  sport: string
  college: string
  /** Athletic conference, or "—" for D3/non-conference. */
  conf: string
  level: CommitLevel
}

/** One stage of the commitment funnel. */
export type FunnelStage = {
  label: string
  /** Muted qualifier, e.g. "(SEC · Big Ten · ACC · Big 12)". */
  hint?: string
  /** Display count, e.g. "~80" — a string so approximations read honestly. */
  count: string
  /** Bar width 0–1, relative to the widest stage. */
  width: number
  /** Fill weight: the funnel narrows from pale to full accent. */
  shade: 'pale' | 'mid' | 'full'
  toVerify?: boolean
}

/** One D1-commits-by-sport bar, with its Power 4 subset overlaid. */
export type SportBar = {
  sport: string
  /** Total D1 commits in this sport. */
  count: number
  /** Bar width 0–1 for the D1 total. */
  width: number
  /** Overlaid width 0–1 for the Power 4 share; omit when none. */
  p4Width?: number
}

export type CollegePipeline = {
  headline: string
  subhead?: string
  funnel: FunnelStage[]
  /** Caveat beneath the funnel — offers vs commitments, floor vs ceiling. */
  funnelNote?: string
  sportBars: SportBar[]
  /** The "reality check" panel — where commits actually land, honestly. */
  realityCheck?: string
  /** Ranked / blue-chip recruits in the current cycle. */
  rankedRecruits?: string
  /** Full roster behind the filter tabs and search box. */
  roster: Commit[]
  /** Footnote on how levels were classified. */
  rosterNote?: string
  sources: SportsSource[]
}

/* --------------------------------------------------- 1d honors & pro alumni -- */

/** One professional-athlete card. */
export type ProAlum = {
  /** Kicker above the name, e.g. "NFL · Class of '19". */
  kicker: string
  name: string
  /** One or two sentences on what they achieved. */
  detail: string
  /** The path line, e.g. "PD → NC State → Panthers". */
  path?: string
}

/** One row of the honors ledger. */
export type HonorRow = {
  /** Award family, e.g. "Gatorade Players of the Year". */
  label: string
  /** The detail — who won it, when, and why it is hard to win. */
  text: string
  /** Right-hand scope tag, e.g. "Statewide, 1 per sport". */
  tag?: string
  /** Accent tag for national/statewide honors; outline for league/in-house. */
  tagStyle?: 'accent' | 'outline'
}

export type HonorsAndPros = {
  headline: string
  subhead?: string
  /** Pro-alumni path cards. Omit the card entirely if a school has none. */
  pros: ProAlum[]
  honors: HonorRow[]
  sources: SportsSource[]
}

/* -------------------------------------------------------------- 1e coaching -- */

/** A headline stat on a featured-coach card. */
export type CoachStat = {
  /** e.g. "147–26", "8", "#1". */
  value: string
  /** e.g. "career record, 15 seasons". */
  label: string
}

/** A featured coach — either the pedigree hire or the continuity anchor. */
export type FeaturedCoach = {
  /** Kicker, e.g. "The pedigree hire · Football, since 2020". */
  kicker: string
  name: string
  stats: CoachStat[]
  /** The paragraph explaining why this coach matters. */
  detail: string
}

/** One row of the tenure ledger. */
export type TenureRow = {
  name: string
  /** Sport / role, e.g. "Football · Asst. AD Facilities". */
  role: string
  /** Bar width 0–1, longest tenure = 1. */
  width: number
  /** Right-hand label, e.g. "since 2002". */
  since: string
  toVerify?: boolean
}

export type Coaching = {
  headline: string
  subhead?: string
  /** One or two featured coaches, side by side. */
  featured: FeaturedCoach[]
  tenure: TenureRow[]
  /** The "worth knowing" line — a notable assistant, a surprise name. */
  worthKnowing?: string
  sources: SportsSource[]
}

/* ------------------------------------------ 1f facilities & athlete care -- */

/** One photo in the facilities strip. */
export type FacilityPhoto = {
  /** Path under public/, e.g. "/facilities/providence-day-overcash.jpg". */
  src: string
  /** Venue name, bolded in the caption. */
  name: string
  /** Caption qualifier, e.g. "built 2012–13". */
  meta?: string
  /** Muted caption line describing what the venue holds. */
  caption?: string
  /** Where the photo came from — required for attribution. */
  credit?: string
}

/** One row of the venue ledger. */
export type VenueRow = {
  name: string
  /** Muted right-hand detail, e.g. "with on-campus batting cages". */
  detail: string
}

/** One row of the in-house care model panel. */
export type CareRow = {
  /** e.g. "Athletic trainers", "Team physician", "Concussions". */
  label: string
  text: string
}

export type Facilities = {
  headline: string
  subhead?: string
  /**
   * Real photographs of this school's own venues. Omitted entirely when no
   * genuine photo could be sourced — the design's placeholder slots are not
   * shipped empty.
   */
  photos?: FacilityPhoto[]
  venues: VenueRow[]
  /** Broadcast / game-day line beneath the venue ledger. */
  broadcast?: string
  care: CareRow[]
  /** Context note comparing this school's care model to local peers. */
  careNote?: string
  sources: SportsSource[]
}

/* ------------------------------------------------- 1g national stage & NIL -- */

/** One opponent on the national-caliber schedule ledger. */
export type ScheduleRow = {
  /** Opponent, e.g. "Rabun Gap (GA)". */
  opponent: string
  /** Why they matter, e.g. "National-power boarding school". */
  detail: string
}

/** One event on the NIL timeline. */
export type NilEvent = {
  /** e.g. "May 2023", "July 1, 2025". */
  date: string
  text: string
  /** Fills the timeline marker — use for the milestone that favors this school. */
  highlight?: boolean
  /** Chip appended to the entry, e.g. "PD'S WINDOW". */
  tag?: string
}

export type NationalStage = {
  headline: string
  subhead?: string
  stats: StatTile[]
  /** Section heading for the schedule ledger, e.g. "The deliberately national schedule — 2025". */
  scheduleTitle?: string
  schedule: ScheduleRow[]
  /** Note beneath the schedule — what scheduling up signals for your athlete. */
  scheduleNote?: string
  nilTitle?: string
  nil: NilEvent[]
  sources: SportsSource[]
}

/* --------------------------------------------------------------- program -- */

/**
 * One school's full Sports research area. Every card is optional: a school
 * with no verified pro alumni omits `honors`, one with no NIL posture omits
 * `national`. SchoolDetail renders only the cards present, in this fixed
 * order, so numbering stays consistent across schools.
 */
export type SportsProgram = {
  offered?: SportsOffered
  record?: WinningRecord
  pipeline?: CollegePipeline
  honors?: HonorsAndPros
  coaching?: Coaching
  facilities?: Facilities
  national?: NationalStage
}

/** Per-card metadata: the number badge, title, and kicker shown on each card. */
export const SPORTS_CARDS = [
  { key: 'offered', num: '1a', title: 'Sports Offered', kicker: 'Topic 01 of 07' },
  { key: 'record', num: '1b', title: 'Winning Record', kicker: 'Topic 02 of 07' },
  { key: 'pipeline', num: '1c', title: 'The College Pipeline', kicker: 'Topic 03 of 07' },
  { key: 'honors', num: '1d', title: 'Honors & Pro Alumni', kicker: 'Topic 04 of 07' },
  { key: 'coaching', num: '1e', title: 'Coaching: Pedigree & Continuity', kicker: 'Topic 05 of 07' },
  { key: 'facilities', num: '1f', title: 'Facilities & Athlete Care', kicker: 'Topic 06 of 07' },
  { key: 'national', num: '1g', title: 'National Stage & NIL', kicker: 'Topic 07 of 07' },
] as const satisfies readonly {
  key: keyof SportsProgram
  num: string
  title: string
  kicker: string
}[]

/* ------------------------------------------------------------ school data -- */

/**
 * Per-school entries live in ./sportsPrograms/<slug>.ts so each school's
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
import { providenceDay } from './sportsPrograms/providence-day.ts'
import { charlotteLatin } from './sportsPrograms/charlotte-latin.ts'
import { charlotteChristian } from './sportsPrograms/charlotte-christian.ts'
import { charlotteCountryDay } from './sportsPrograms/charlotte-country-day.ts'
import { cannon } from './sportsPrograms/cannon.ts'
import { davidsonDay } from './sportsPrograms/davidson-day.ts'
import { covenantDay } from './sportsPrograms/covenant-day.ts'
import { carmelChristian } from './sportsPrograms/carmel-christian.ts'
import { hickoryGroveChristian } from './sportsPrograms/hickory-grove-christian.ts'
import { gastonDay } from './sportsPrograms/gaston-day.ts'

const PROGRAMS: Record<string, SportsProgram> = {
  'providence-day': providenceDay,
  'charlotte-latin': charlotteLatin,
  'charlotte-christian': charlotteChristian,
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
const overlayFiles = import.meta.glob<OverlayFile>('./overlays/sports.*.json', {
  import: 'default',
})

/** Warms the overlay for a locale; resolves once the index is ready. */
export async function loadSportsOverlay(lang: string): Promise<void> {
  if (hasOverlay('sports', lang)) return
  const load = overlayFiles?.[`./overlays/sports.${lang}.json`]
  if (!load) {
    setOverlayIndex('sports', lang, undefined)
    return
  }
  try {
    setOverlayIndex('sports', lang, indexOverlay(await load()))
  } catch {
    // A missing or malformed overlay must not break the page: English stands in.
    setOverlayIndex('sports', lang, undefined)
  }
}

/**
 * The structured Sports program for a school, or undefined if not yet built.
 *
 * With no overlay for `lang` this returns the English object BY REFERENCE (see
 * the identity requirement in src/lib/localizeData.ts).
 */
export function sportsProgram(slug: string, lang = 'en'): SportsProgram | undefined {
  const en = PROGRAMS[slug]
  if (!en || lang === 'en') return en
  return localized(en, overlayIndex('sports', lang), slug)
}
