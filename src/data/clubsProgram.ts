// The "Student Clubs" research area — the three redesigned sub-section cards per
// school (see components/ClubsProgram.tsx).
//
// Recreates the design's "Clubs Section Redesign" using the app's own tokens
// (src/index.css). The design's premise: these three notes used to be the same
// 6–8-paragraph prose dump, but their underlying evidence has very different
// shapes — an enumerated roster (affinity), three big programs (service), and a
// short list of societies (honor societies). So each card takes the layout its
// evidence deserves, and gaps and count discrepancies become first-class flags
// instead of sentences buried in prose.
//
//   1a Affinity & Identity Groups  — ecosystem map: umbrella band, roster grid,
//                                    division/parent strips, leadership arm
//   1b Service & Civic Engagement  — three signature programs as scale-led
//                                    columns, each with its own source
//   1c Honor Societies             — recognition ledger table, framed as
//                                    recognition rather than enrollment
//
// The other two Student Clubs cards — Academic & Competitive Clubs
// (data/clubClusters.ts) and Club Catalog & Overview (data/clubCatalog.ts) —
// ship unchanged and are NOT part of this layer.
//
// Every figure here is transcribed from that school's OWN published pages, its
// profile PDFs, or named news coverage — see the committed research files under
// source-material/student-clubs/<school>/ for the hard data, source URLs, and
// per-school gap notes. Nothing is inferred, averaged, or carried across schools.
//
// Cards are OPTIONAL by design, and two schools genuinely lose cards:
// Davidson Day publishes no affinity roster (only "Belonging" councils) and no
// honor-society record of any kind, so it renders 1b alone. Rendering a thin
// card would imply the research found nothing when the truth is the school
// publishes nothing — see the `ClubsProgram` fields, all of which may be
// undefined. Card order and numbering stay fixed across schools for the cards
// that do render.

/* ---------------------------------------------------------------- shared -- */

/** A citation shown in a card's SOURCE row. `url` makes it a clickable link. */
export type ClubsSource = {
  /** Human-readable label, e.g. "charlottecountryday.org — DEIB program". */
  label: string
  /** Deep link to the specific page the fact came from. */
  url?: string
}

/**
 * An honesty flag. The design gives these a tag chip plus a sentence, and they
 * appear ONLY where the research actually surfaced the problem:
 *
 *  - 'count'      COUNT FLAG — sources disagree on how many groups exist.
 *  - 'gap'        GAP — the thing exists but the school publishes no detail.
 *  - 'not-a-club' INDIVIDUAL — NOT A CLUB — real activity that is not a club.
 *
 * A school whose sources agree gets no count flag; one that publishes full
 * criteria gets no gap flag. Never synthesize one to fill the slot.
 */
export type FlagKind = 'count' | 'gap' | 'not-a-club'

export type ClubsFlag = {
  kind: FlagKind
  /** Chip wording, e.g. "COUNT FLAG". Defaults per kind if omitted. */
  label?: string
  /** The explanation sentence beside the chip. */
  text: string
}

/* ------------------------------------------------------ 1a affinity map -- */

/** The umbrella band across the top of the ecosystem map. */
export type Umbrella = {
  /** The org's display name, e.g. "DIVERSITY AWARENESS FORUM (DAF)". */
  name: string
  /** The muted qualifier beside it — what it coordinates, when it began. */
  detail?: string
}

/** One cell of the enumerated group roster. */
export type AffinityGroup = {
  /** Group name exactly as the school publishes it. */
  name: string
  /** Short descriptor, e.g. "Latine / Hispanic affinity". */
  detail?: string
}

/** One strip beneath the roster — a division, or the parent groups. */
export type GroupStrip = {
  /** e.g. "Middle School", "Lower School", "Parents". */
  title: string
  /** Muted qualifier beside the title, e.g. "· 5 groups", "· grades 1–4". */
  hint?: string
  /** The strip's content, rendered as one flowing line. */
  text: string
}

export type Affinity = {
  /** Lead sentence, bolded on the card. */
  headline: string
  /** Muted continuation of the headline. */
  subhead?: string
  /** The umbrella band. Omitted where a school coordinates nothing centrally. */
  umbrella?: Umbrella
  /**
   * The enumerated roster, rendered as a grid of cells. Empty for a school that
   * confirms groups exist but never names them — the card then leans on its
   * strips and gap flag instead.
   */
  groups: AffinityGroup[]
  /** Division and parent-group strips beneath the roster. */
  strips: GroupStrip[]
  /** Heading over the leadership row, e.g. "The leadership arm". */
  leadershipTitle?: string
  /** The student leadership corps / conference attendance. */
  leadership?: string
  /** Count discrepancies and gaps, in render order. */
  flags: ClubsFlag[]
  sources: ClubsSource[]
}

/* ------------------------------------------------------- 1b service ------ */

/**
 * One signature program column. The design leads each with its scale number,
 * because scale and longevity are what distinguish a real commitment from a
 * sign-up sheet.
 */
export type ServiceProgram = {
  /** The big figure, e.g. "~50%", "100%", "175+". */
  value: string
  /** Caption beneath the figure, e.g. "of juniors & seniors · weekly". */
  valueLabel: string
  /** Program name, e.g. "Big Brothers Big Sisters". */
  name: string
  /** 1–2 sentence description. */
  detail: string
  /** This program's OWN source — the design cites each column separately. */
  source?: ClubsSource
}

export type Service = {
  headline: string
  subhead?: string
  /** The signature programs. The design shows three; fewer is allowed. */
  programs: ServiceProgram[]
  /** Heading over the footnote block, e.g. "Beyond the big three". */
  footnoteTitle?: string
  /** The prose beneath the columns — breadth that isn't a signature program. */
  footnote?: string
  /** "Not a club" labels and any service gaps. */
  flags: ClubsFlag[]
  sources: ClubsSource[]
}

/* -------------------------------------------------- 1c honor societies --- */

/** One row of the recognition ledger. */
export type Society = {
  /** Society name, with the local chapter name where the school publishes one. */
  name: string
  /** e.g. "Upper School", "Middle School". */
  division: string
  /** What the society recognizes. */
  recognizes: string
  /** Which program area it draws from, e.g. "the classroom", "The Arts". */
  feedsFrom: string
}

export type Honors = {
  headline: string
  subhead?: string
  societies: Society[]
  /**
   * Recognition that is NOT an honor society — named prizes, graduation
   * distinctions, GPA lists. Kept separate so the ledger stays honest about
   * what is and isn't a society.
   */
  adjacentTitle?: string
  adjacent?: { label: string; text: string }[]
  /** Missing induction criteria / counts, where they are in fact missing. */
  flags: ClubsFlag[]
  sources: ClubsSource[]
}

/* --------------------------------------------------------------- program -- */

/**
 * One school's redesigned Student Clubs cards. Every card is optional: a school
 * that publishes no affinity roster omits `affinity`, one with no honor-society
 * record omits `honors`. SchoolDetail renders only the cards present, in this
 * fixed order, so numbering stays consistent across schools.
 */
export type ClubsProgram = {
  affinity?: Affinity
  service?: Service
  honors?: Honors
}

/** Per-card metadata: the number badge, title, and kicker shown on each card. */
export const CLUBS_CARDS = [
  {
    key: 'affinity',
    num: '1a',
    title: 'Affinity & Identity Groups',
    kicker: 'Will my kid find their people?',
  },
  {
    key: 'service',
    num: '1b',
    title: 'Service & Civic Engagement',
    kicker: 'Is service real here, or hours-logging?',
  },
  {
    key: 'honors',
    num: '1c',
    title: 'Honor Societies',
    kicker: 'Will achievement get recognized?',
  },
] as const satisfies readonly {
  key: keyof ClubsProgram
  num: string
  title: string
  kicker: string
}[]

/**
 * Per-school card-title overrides, driven by what the research actually found.
 *
 * Charlotte Christian publishes no identity-based affinity groups at all — its
 * structure is a Diversity & Belonging office plus two global/cultural student
 * groups. Titling its card "Affinity & Identity Groups" would imply a roster the
 * school does not have, so it is titled for the framing the school itself uses.
 */
const TITLE_OVERRIDES: Record<string, Partial<Record<keyof ClubsProgram, string>>> = {
  'charlotte-christian': {
    affinity: 'Global & Cultural Groups',
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
export function titleOverrideSlug(slug: string, key: keyof ClubsProgram): string | undefined {
  return TITLE_OVERRIDES[slug]?.[key] != null ? slug : undefined
}

/** The card title for a school, applying any per-school override. */
export function clubsCardTitle(
  slug: string,
  card: (typeof CLUBS_CARDS)[number],
): string {
  return TITLE_OVERRIDES[slug]?.[card.key] ?? card.title
}

/* ------------------------------------------------------------ school data -- */

/**
 * Per-school entries live in ./clubsPrograms/<slug>.ts so each school's research
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
import { providenceDay } from './clubsPrograms/providence-day.ts'
import { charlotteLatin } from './clubsPrograms/charlotte-latin.ts'
import { charlotteChristian } from './clubsPrograms/charlotte-christian.ts'
import { charlotteCountryDay } from './clubsPrograms/charlotte-country-day.ts'
import { cannon } from './clubsPrograms/cannon.ts'
import { davidsonDay } from './clubsPrograms/davidson-day.ts'

const PROGRAMS: Record<string, ClubsProgram> = {
  'providence-day': providenceDay,
  'charlotte-latin': charlotteLatin,
  'charlotte-christian': charlotteChristian,
  'charlotte-country-day': charlotteCountryDay,
  cannon: cannon,
  'davidson-day': davidsonDay,
}

/* ---------------------------------------------------------- translations -- */

/**
 * Locale overlays for this topic's prose, loaded on demand.
 *
 * English readers never fetch these — the glob keys are only resolved when a
 * non-English locale asks for them, so the Spanish bytes stay out of the
 * initial bundle. See .claude/docs/prose-translation-architecture.md.
 */
/**
 * Locale overlays, discovered at build time.
 *
 * `import.meta.glob` is a COMPILE-TIME transform: Vite replaces the whole call
 * with an object literal of dynamic imports. It must therefore stand alone —
 * guarding it with `typeof import.meta.glob === 'function'` still compiles the
 * object, but leaves the guard in the output, where `import.meta.glob` is
 * undefined at runtime and the ternary silently picks the empty branch. That
 * shipped once: every overlay resolved to nothing and the page rendered English
 * with no error anywhere. Do not wrap this.
 *
 * Plain Node (the build-time checkers import this module for its English prose)
 * cannot evaluate it, so `loadClubsOverlay` tolerates its absence instead.
 */
const overlayFiles = import.meta.glob<OverlayFile>('./overlays/student-clubs.*.json', {
  import: 'default',
})


/**
 * Warms the overlay for a locale. Resolves once the index is ready (or once we
 * know there isn't one), so a caller can await it before rendering rather than
 * painting English and flipping a frame later.
 */
export async function loadClubsOverlay(lang: string): Promise<void> {
  if (hasOverlay('student-clubs', lang)) return
  const load = overlayFiles?.[`./overlays/student-clubs.${lang}.json`]
  if (!load) {
    setOverlayIndex('student-clubs', lang, undefined)
    return
  }
  try {
    setOverlayIndex('student-clubs', lang, indexOverlay(await load()))
  } catch {
    // A missing or malformed overlay must not break the page: English stands in.
    setOverlayIndex('student-clubs', lang, undefined)
  }
}

/**
 * The loaded overlay index for a locale, so the two sibling Student Clubs layers
 * (clubClusters.ts, clubCatalog.ts) resolve against the same file — their prose
 * is extracted under the `clusters.*` / `catalog.*` prefixes of this topic.
 */
/**
 * The structured Clubs program for a school, or undefined if not yet built.
 *
 * With no overlay for `lang` — the English path, and any locale whose prose has
 * not landed — this returns the English object BY REFERENCE, unchanged. See the
 * identity requirement in src/lib/localizeData.ts.
 */
export function clubsProgram(slug: string, lang = 'en'): ClubsProgram | undefined {
  const en = PROGRAMS[slug]
  if (!en || lang === 'en') return en
  return localized(en, overlayIndex('student-clubs', lang), slug)
}
