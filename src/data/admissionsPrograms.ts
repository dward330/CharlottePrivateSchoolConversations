// The "Admissions" research area — one card per school (see
// components/AdmissionsProgram.tsx).
//
// Recreates the design's Admissions section using the app's own tokens
// (src/index.css) rather than porting its markup, exactly as the Summer
// Programs and After School modules do. The design's premise: a school does not
// run ONE admissions process, it runs one per grade band — different
// assessments, different deadlines, different forms — and a parent only ever
// needs the band their child is entering.
//
//   guide  The Grade-by-Grade Application Guide — which steps, which deadlines,
//                                                 and which test for MY child?
//                                                 Pick the entry band and the
//                                                 whole guide personalizes to
//                                                 it, then exports as a paper
//                                                 checklist.
//
// Every figure here is transcribed from that school's OWN published admissions
// pages and live entry-cycle calendar — see the committed research files under
// source-material/admissions/<school>/ for the hard data, source URLs and
// per-school gap notes. Nothing is inferred, averaged, or carried across
// schools.
//
// THE CYCLE RULE IS LOAD-BEARING. A school's research file may carry two entry
// cycles' dates (the live calendar for the current one, a mirror page for the
// prior one). Only the CURRENT cycle ships, and `cycle` labels every date on
// the page with it. Where the current cycle publishes no date, the tile carries
// the known constant and its caption names the live calendar — a prior cycle's
// date is NEVER carried forward as if it were current, and a date is never
// guessed.
//
// The card is optional, and a school with no admissions research simply has no
// entry — the section then does not render at all, which is the honest outcome
// for a school whose process was never researched. Ten of the eleven schools
// are in exactly that position today.

/* ---------------------------------------------------------------- shared -- */

/** A citation shown in the card's SOURCE row. `url` makes it a clickable link. */
export type AdSource = {
  /** Human-readable label, e.g. "providenceday.org — admissions calendar". */
  label: string
  /** Deep link to the specific page the fact came from. */
  url?: string
}

/** One milestone tile in the band's 4-tile deadline strip. */
export type AdDeadline = {
  /**
   * Display value — a dated deadline ("Feb 1, 2027") OR, where the current
   * cycle publishes none, the known constant ("4:00 p.m."). Never a guess,
   * never a prior cycle's date.
   */
  value: string
  /** Caption under the value, e.g. "all materials & assessments due". */
  label: string
  /**
   * True when `value` is a constant rather than a published date. The tile
   * renders identically either way — the design deliberately does NOT decorate
   * it, because the caption already says "date on the live calendar" and the
   * cross-band table repeats the pointer. The flag is kept because the
   * distinction is real research (published date vs known constant) and a
   * later surface may want it.
   */
  unpublished?: boolean
}

/** One numbered step in the band's ordered application stepper. */
export type AdStep = {
  title: string
  /**
   * Deadline chip. `accent` renders the filled tag (the hard deadlines),
   * `outline` renders the hairline tag (the soft ones).
   */
  tag: string
  tagKind: 'accent' | 'outline'
  detail: string
}

/** A band-specific "watch-out" card in the right column — exactly 2 per band. */
export type AdWatchOut = { kicker: string; text: string }

/** One row of the printable checklist, derived from the band's own steps. */
export type AdChecklistRow = {
  /** The action, rendered bold beside an inert empty checkbox square. */
  action: string
  /** One-line supporting detail. */
  detail: string
  /** Right-aligned deadline, e.g. "Feb 1, 2027". */
  due: string
}

/** One entry band — a distinct admissions process with its own calendar. */
export type AdBand = {
  /** URL/DOM key — 'tkk' | 'g15' | 'g612' for Providence Day. */
  key: string
  /** Selector label, e.g. "TK / Kindergarten". */
  label: string
  /** One-line sublabel naming what distinguishes the band. */
  sublabel: string
  /** Full title for the checklist page header. */
  title: string
  /** The 4-tile deadline strip. */
  deadlines: AdDeadline[]
  /** The ordered application stepper. */
  steps: AdStep[]
  /** Exactly two band-specific watch-outs. */
  watchOuts: AdWatchOut[]
  /** Band-specific callout at the top of the printable checklist. */
  checklistCallout: { lead: string; text: string }
  /**
   * The checklist sheet's own ordered rows. Deliberately NOT a blind copy of
   * `steps`: the paper sheet splits actions the section's stepper merges (for
   * Providence Day, "inquire" and "create your portal account" are two ticks on
   * paper but one step on screen), so each band carries its own list.
   */
  checklistRows: AdChecklistRow[]
}

/** One row of the cross-band comparison table. */
export type AdComparisonRow = {
  label: string
  /**
   * Per-band cells keyed by AdBand.key, OR a single `all` string for a row
   * identical in every band — which renders as one cell spanning every column.
   */
  cells: Record<string, string> | { all: string }
}

/** One named person in the admissions-office contacts grid. */
export type AdContact = { name: string; detail: string }

/**
 * The one card's body. Admissions has a SINGLE card, key `guide`, so
 * `AdmissionsProgram.guide` is what `ADMISSIONS_CARDS` points at.
 *
 * `headline` is REQUIRED and load-bearing: SchoolDetail renders
 * `entry[card.key]!.headline` as the collapsed `.topic-teaser` for every
 * structured card — a hard contract the type system does not express.
 */
export type AdmissionsGuide = {
  headline: string
  /** e.g. "2026–27 entry cycle" — labels every date on the page. */
  cycle: string
  /** The 4 stat-band tiles above the card. */
  stats: { value: string; label: string }[]
  /** The three framing rules above the band selector. */
  rules: { title: string; text: string }[]
  /** Line under the selector about the shared spine and the selection factors. */
  spineNote: string
  /**
   * The entry bands, in calendar order. A school running ONE uniform process
   * has a single band, and the selector collapses rather than showing a choice
   * of one — this is `bands.length === 1`, not a separate shape.
   */
  bands: AdBand[]
  /** The financial-aid parallel strip, which runs on its own clock. */
  aid: { title: string; text: string; button: string }
  comparison: { kicker: string; title: string; rows: AdComparisonRow[] }
  contacts: { kicker: string; title: string; address: string; people: AdContact[] }
  /** Checklist-page footer panels + disclaimer. */
  checklist: {
    portalNote: string
    aidPanel: { kicker: string; items: string[] }
    contactPanel: { kicker: string; lines: string[] }
    disclaimer: string
  }
  sources: AdSource[]
}

/**
 * The topic root. One optional card today; the shape leaves room for a second
 * without changing the accessor, exactly as SummerProgram does.
 *
 * A school with no `guide` has no entry at all and renders no section.
 */
export type AdmissionsProgram = {
  guide?: AdmissionsGuide
}

/* ------------------------------------------------------------ card registry -- */

/**
 * The card list for this topic.
 *
 * PARSED, not imported, by scripts/gen_data_schema.mjs — this module calls
 * `import.meta.glob` at module scope, which throws under plain Node. That parse
 * is a scoped text match, so the shape here is constrained: the `export const
 * ADMISSIONS_CARDS = [` spelling with `[` on the same line, flat objects (no
 * nested braces), and every field a quoted string literal.
 */
export const ADMISSIONS_CARDS = [
  {
    key: 'guide',
    title: 'Grade-by-Grade Application Guide — TK/K · 1–5 · 6–12',
    kicker: 'Which steps, which deadlines, and which test for my child?',
  },
] as const satisfies readonly {
  key: 'guide'
  title: string
  kicker: string
}[]

/** The card keys for this topic. */
export type AdmissionsCardKey = (typeof ADMISSIONS_CARDS)[number]['key']

/** Title for a card key — used by SchoolDetail's card header. */
export function admissionsCardTitle(key: AdmissionsCardKey): string {
  return ADMISSIONS_CARDS.find((c) => c.key === key)!.title
}

/* ------------------------------------------------------------ school data -- */

/**
 * Per-school entries live in ./admissionsPrograms/<slug>.ts so each school's
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
import { providenceDay } from './admissionsPrograms/providence-day.ts'

/**
 * ONE school, not eleven. **The other ten are deliberately absent.**
 *
 * Nobody has researched their admissions processes — the topic infrastructure
 * is school-agnostic, but the data ships for Providence Day only. With no
 * source files under `source-material/admissions/<school>/`, the topic has no
 * `doc_count` for those schools, so `topicsForSchool()` never yields it and the
 * Admissions section does not render on their pages at all.
 *
 * Adding a stub entry here would be actively wrong: an entry that exists but is
 * empty is still truthy, which is exactly the failure the card-list guard in
 * SchoolDetail exists to prevent. Absence is the honest representation of
 * "not researched", and it costs nothing to add a school later.
 */
const PROGRAMS: Record<string, AdmissionsProgram> = {
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
const overlayFiles = import.meta.glob<OverlayFile>('./overlays/admissions.*.json', {
  import: 'default',
})

/** Warms the overlay for a locale; resolves once the index is ready. */
export async function loadAdmissionsOverlay(lang: string): Promise<void> {
  if (hasOverlay('admissions', lang)) return
  const load = overlayFiles?.[`./overlays/admissions.${lang}.json`]
  if (!load) {
    setOverlayIndex('admissions', lang, undefined)
    return
  }
  try {
    setOverlayIndex('admissions', lang, indexOverlay(await load()))
  } catch {
    // A missing or malformed overlay must not break the page: English stands in.
    setOverlayIndex('admissions', lang, undefined)
  }
}

/**
 * The structured Admissions entry for a school, or undefined if not built.
 *
 * With no overlay for `lang` this returns the English object BY REFERENCE (see
 * the identity requirement in src/lib/localizeData.ts).
 */
export function admissionsProgram(slug: string, lang = 'en'): AdmissionsProgram | undefined {
  const en = PROGRAMS[slug]
  if (!en || lang === 'en') return en
  return localized(en, overlayIndex('admissions', lang), slug)
}
