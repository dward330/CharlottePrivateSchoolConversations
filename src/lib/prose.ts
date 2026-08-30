// Parse the flattened research text (extracted from source PDFs) back into structured
// blocks so a school page can render real headings, bulleted lists, quick-fact panels,
// and clickable sources instead of one undifferentiated wall of <pre> text.
//
// The text arrives in two rough shapes:
//   • After-school notes — a "title / subtitle / disclaimer" front matter, then
//     "Heading\nparagraph" or "Heading\n• bullets".
//   • Sports dossiers — a repeated "… RESEARCH DOSSIER" page header, an "AT A GLANCE"
//     quick-fact panel, inline "[Source: …]" citations, per-page footers, and a closing
//     "Source List" of URLs.
//
// The parser strips the repeated boilerplate and classifies what remains. It is
// deliberately conservative: anything it cannot confidently classify becomes a
// paragraph, so no content is ever dropped on the floor.

export type HeadingTone = 'default' | 'good' | 'caution' | 'glance'
export type SourceLink = { label: string; url: string }

export type ProseBlock =
  | { kind: 'heading'; text: string; tone: HeadingTone }
  | { kind: 'scope'; text: string }
  // `demoted` marks a line that read as a heading but headed nothing (see
  // demoteEmptyHeadings). It still renders as prose, but it is a stray title rather
  // than a sentence, so it makes a poor collapsed-card summary.
  | { kind: 'para'; text: string; cites: string[]; demoted?: boolean }
  | { kind: 'list'; items: string[]; cites: string[] }
  | { kind: 'facts'; lines: string[] }
  | { kind: 'table'; header: string[]; rows: string[][] }
  | { kind: 'sources'; items: SourceLink[] }

// Markdown-style pipe-table row: "| Grade | 1 day | … |"
const TABLE_ROW = /^\s*\|.*\|\s*$/
const TABLE_DIVIDER = /^\s*\|[\s:|-]+\|\s*$/

const BULLET = /^\s*[•‣▪·]\s+|^\s*[-–]\s+/
const URL_RE = /https?:\/\/\S+/
const CITE_LINE = /^\s*\[Sources?:/i

// ── Research-gap suppression ───────────────────────────────────────────────────
// The source dossiers are internal research documents, and they say so out loud:
// they carry "Notes & Gaps", "Honest Gaps", "Flagged gaps (honest disclosure)",
// "What could not be confirmed", "Claims excluded from this dossier" and inline
// "TRANSPARENCY GAP — …" blocks. That self-auditing is the right instinct for
// research and the wrong voice for a public-facing school guide: a visiting
// family wants what a school offers, not a running account of which searches came
// up empty.
//
// So the notes keep it and the app hides it — the filter runs here, at parse
// time, rather than in source-material/, so the dossiers stay complete and
// re-ingest can never reintroduce the language into the UI (see the
// data-provenance standard in CLAUDE.md).
//
// DELIBERATELY NOT SUPPRESSED: the financial-aid "PUBLICATION GAP — …" blocks.
// Those read as consumer advice rather than internal hedging ("the school does
// not publish when aid decisions reach families — ask"), so they earn their place
// in front of a family and are exempted below.

/** A heading that opens a research-gap / methodology section. Matched against a
 *  whole heading line, so a mid-sentence "gap" never trips it. */
const GAP_HEADING =
  /^(?:the\s+)?(?:(?:honest|publication|transparency|research|disclosure|tooling|sourcing|coverage|data)\s+gaps?\b|(?:notes?|caveats?)\s*(?:&|and)\s*gaps?\b|gaps?\b|caveats?\b|flagged\s+gaps?\b|honest\s+(?:framing|assessment|disclosure|questions?|limits?|scope|two-sided)\b|(?:claims?\s+)?(?:deliberately\s+)?excluded\b|out\s+of\s+scope\b|what\s+(?:the\s+school\s+does\s+not\s+publish|could\s+not\s+be|we\s+did\s+and\s+did\s+not)\b|where\s+the\s+public\s+record\s+runs\s+out\b|research\s+note\s*\/\s*gap\s+flag\b|core\s+disclosure\s+gap\b|reading\s+the\s+pathways\s+honestly\b|national\s+context\s*(?:&|and)\s*caveats?\b)/i

/** An inline gap callout that opens a block mid-note ("TRANSPARENCY GAP — …",
 *  "GAP - 2026-27 TRANSPORT RATES ARE NOT YET POSTED"). */
const GAP_CALLOUT = /^\s*(?:transparency|publication|disclosure|research|coverage)?\s*gaps?\s*[-–—:]/i

/** The financial-aid exemption — consumer-relevant "what the school doesn't
 *  publish, so ask" guidance, which stays visible. Scoped to the financial-aid
 *  topic: the same wording in the college-support dossiers is internal research
 *  voice about what the researcher could not source, not advice to a family. */
const KEEPS_GAP_CALLOUT = /^\s*(?:transparency|publication)\s+gaps?\s*[-–—:]/i
const KEEPS_GAP_TOPIC = /^financial-aid/i

/** True if this heading/callout line should take its section off the page. */
function isGapHeading(line: string, topic?: string): boolean {
  const t = line.trim().replace(/\s+/g, ' ').replace(/[:.]$/, '')
  if (!t) return false
  if (topic && KEEPS_GAP_TOPIC.test(topic) && KEEPS_GAP_CALLOUT.test(t)) return false
  // "Merit awards: an answer, not a gap" resolves a gap rather than flagging one.
  if (/\bnot a gap\b/i.test(t)) return false
  // A heading that turns mid-line into research self-commentary ("Staff stability
  // — an honest two-sided picture", "… — what we could not verify").
  if (/[—–-]\s*(?:an?\s+honest\b|what\s+(?:we|could)\b)/i.test(t)) return true
  // "Reconciliation & honest gaps", "The honest publication gaps" — "honest" or
  // "unconfirmed/not confirmed" anywhere in a heading is research voice.
  if (/\bhonest\b/i.test(t)) return true
  if (/\b(?:un(?:confirmed|verified)|not\s+confirmed)\b/i.test(t)) {
    // …except the financial-aid price rows, which are consumer-relevant.
    if (!(topic && KEEPS_GAP_TOPIC.test(topic))) return true
  }
  return GAP_HEADING.test(t) || GAP_CALLOUT.test(t)
}

// ── Provenance suppression (financial-aid Tuition History cards) ───────────────
// The tuition-history dossiers carry their retrieval chain inline: a "Per-column
// sourcing:" lead-in over a list of Wayback timestamps and verbatim archived
// quotes, plus whole sub-sections of snapshot detail. That apparatus is what
// makes the figures auditable and it stays in source-material/ for exactly that
// reason — but a family reading the card came for the price tables, not for the
// evidence trail behind them, and the bullets sit BETWEEN the tables they came
// for.
//
// So, as with the research-gap filter above: the notes keep it and the app hides
// it. The filter runs here at parse time rather than in source-material/, so the
// dossiers stay complete and re-ingest can never put the bullets back on the
// page (see the data-provenance standard in CLAUDE.md).
//
// Matched on SHAPE, not on a school allowlist, so a fifth school with a Tuition
// History card is covered without a code change. Scoped to financial-aid via the
// topic parameter, like KEEPS_GAP_TOPIC — a "Source snapshots" heading in another
// topic is left alone.

/** The lead-in paragraph that introduces a run of provenance bullets
 *  ("Per-column sourcing:", "Per-column sourcing (verbatim quotes …):"). It and
 *  the list that follows it are dropped together. */
const PROVENANCE_LEADIN = /^per-column sourcing\b/i

/** A sub-section heading that is nothing but retrieval detail. Two shapes:
 *  "Source snapshots" (Covenant Day) and "<X> captured in the same snapshots"
 *  (Cannon's "Related detail …", Davidson Day's "Financial aid detail …").
 *  They are NOT treated alike — see stripProvenance for why. */
const PROVENANCE_SNAPSHOT_HEADING = /^source\s+snapshots?$/i
/** "The year-pinning decision" (Covenant Day) — a sub-section explaining which
 *  school year the APP chose to quote and why. That is a note about this
 *  project's own editorial method, not about the school, so it reads to a family
 *  as the same internal voice as the snapshot lists above it. Removed on the
 *  user's instruction, 2026-08-29 (annotated screenshot). Dropped whole, like a
 *  "Source snapshots" section — its body is an ordinary paragraph, so a
 *  block-shape guard would not reach it. */
const PROVENANCE_YEAR_PINNING = /^(?:the\s+)?year-pinning\s+decision$/i
const PROVENANCE_CAPTURED_HEADING = /captured\s+in\s+the\s+same\s+snapshots$/i

/** A fragment the `sources` parse mode leaves behind mid-section: the wrapped
 *  tail of a hard-wrapped source line, which the heading classifier then reads as
 *  a heading of its own ("(captured 2026-08-15)"). Never a real section heading. */
const SOURCE_MODE_DEBRIS = /^\(|^https?:\/\//i

/** One keeper-shaped sentence the user asked to remove on 2026-08-29 (annotated
 *  screenshot): a table footer under Covenant Day's "Tuition by band and year".
 *  It is not provenance and no structural rule reaches it, so it is matched
 *  directly rather than by stretching one of the patterns above. */
const PROVENANCE_USER_DROP = /^a flat-dollar \(not percentage\) increase across bands\.?$/i

function normHeading(text: string): string {
  return text.trim().replace(/\s+/g, ' ').replace(/[:.]$/, '')
}

/** Drop the provenance apparatus from a financial-aid note. Three shapes, kept
 *  as separate rules because they fail differently:
 *
 *  1. A "Per-column sourcing:" paragraph plus the list block that follows it.
 *  2. A "… captured in the same snapshots" section — dropped ONLY when every
 *     block under it is a list. Davidson Day's "Fees captured in the same
 *     snapshots" matches the same heading but holds a TABLE, and must survive.
 *  3. A "Source snapshots" or "The year-pinning decision" section — dropped
 *     unconditionally, whatever its block kinds. The parser flips into `sources` mode on any heading matching
 *     /source/i (see the ATX branch below), so Covenant Day's section arrives as
 *     a source CHIP plus a stray "(captured …)" paragraph plus one list item.
 *     A list-shaped guard would leave the chip and the stray line on the page,
 *     which is why rule 3 is not folded into rule 2.
 *
 *  A heading whose blocks all go is dropped with them: ProseContent renders a
 *  section heading whether or not anything is under it, and an empty shell is
 *  what the no-empty-cards rule forbids. */
function stripProvenance(blocks: ProseBlock[], topic?: string, subtopic?: string): ProseBlock[] {
  if (!(topic && KEEPS_GAP_TOPIC.test(topic))) return blocks

  /* Rule 2 also has to see the note's SUBTOPIC. Cannon's "Related detail captured
     in the same snapshots" and Davidson Day's "Financial aid detail …" are whole
     SUBTOPICS, not sub-headings — that heading is rendered by the card layer, so
     no heading block reaches this function and the section state would never
     open. Covenant Day's equivalents are `###` sub-headings inside one subtopic.
     Seeding from the subtopic covers both layouts with one rule.

     Note this is NOT the `title` parameter: that is the METRIC label
     ("Tuition History & Sources"), shared by every subtopic on the card. */
  const sub = subtopic ? normHeading(subtopic) : ''
  const seed: 'none' | 'captured' | 'snapshots' = PROVENANCE_SNAPSHOT_HEADING.test(sub)
    ? 'snapshots'
    : PROVENANCE_CAPTURED_HEADING.test(sub)
      ? 'captured'
      : 'none'

  // Pass 1 — drop lead-in paragraphs, their following lists, and the one
  // user-flagged sentence. Headings are kept for now; pass 2 prunes any that
  // emptied out.
  const kept: ProseBlock[] = []
  /* The heading blocks this filter took content away from — the only ones pass 2
     is allowed to consider dropping. */
  const emptied = new Set<ProseBlock>()
  let openHeading: ProseBlock | null = null
  let dropNextList = false
  let sectionDrop: 'none' | 'captured' | 'snapshots' = seed
  for (const b of blocks) {
    if (b.kind === 'heading') {
      const h = normHeading(b.text)
      /* A "Source snapshots" section is parsed in `sources` mode (see the ATX
         branch below), which shreds a hard-wrapped source line into a chip, a
         stray HEADING holding the wrapped tail ("(captured 2026-08-15)") and a
         list. That debris must not be read as the start of a new section, or the
         bullet after it survives. A parenthetical or URL-ish fragment is never a
         real heading, so it keeps the skip open. */
      if (sectionDrop === 'snapshots' && SOURCE_MODE_DEBRIS.test(h)) continue
      sectionDrop =
        PROVENANCE_SNAPSHOT_HEADING.test(h) || PROVENANCE_YEAR_PINNING.test(h)
          ? 'snapshots'
          : PROVENANCE_CAPTURED_HEADING.test(h)
            ? 'captured'
            : 'none'
      dropNextList = false
      // Rule 3: a "Source snapshots" section goes whole, heading included.
      if (sectionDrop === 'snapshots') {
        openHeading = null
        continue
      }
      openHeading = b
      kept.push(b)
      continue
    }
    // Rule 3 continued — everything under a "Source snapshots" heading, whatever
    // its kind (sources chips, orphaned paragraph tails, lists).
    if (sectionDrop === 'snapshots') continue
    if (b.kind === 'para') {
      const t = normHeading(b.text)
      // Rule 1: the lead-in itself, and the list it introduces.
      if (PROVENANCE_LEADIN.test(t)) {
        dropNextList = true
        if (openHeading) emptied.add(openHeading)
        continue
      }
      if (PROVENANCE_USER_DROP.test(t)) {
        if (openHeading) emptied.add(openHeading)
        continue
      }
      dropNextList = false
      kept.push(b)
      continue
    }
    if (b.kind === 'list') {
      if (dropNextList) {
        dropNextList = false
        if (openHeading) emptied.add(openHeading)
        continue
      }
      // Rule 2: a "… captured in the same snapshots" section that is only lists.
      if (sectionDrop === 'captured') {
        if (openHeading) emptied.add(openHeading)
        continue
      }
      kept.push(b)
      continue
    }
    dropNextList = false
    kept.push(b)
  }

  /* Pass 2 — a heading THIS FILTER emptied heads no section, so it goes too
     (ProseContent renders a heading whether or not anything sits under it, and an
     empty shell is what the no-empty-cards rule forbids).

     Scoped deliberately to headings pass 1 actually stripped content from, via
     `emptied`. A blanket "drop any heading followed by another heading" rule
     over-reaches badly: heading-over-heading is a normal shape elsewhere in these
     notes (Cannon's deep-dive report has "How Completely Each Section Could Be
     Answered" directly above a flattened table header), and demoteEmptyHeadings
     already owns that case earlier in the pipeline. */
  if (!emptied.size) return kept
  const out: ProseBlock[] = []
  for (let i = 0; i < kept.length; i++) {
    const b = kept[i]
    if (b.kind === 'heading' && emptied.has(b)) {
      const next = kept[i + 1]
      if (!next || next.kind === 'heading') continue
    }
    out.push(b)
  }
  return out
}

/** Drop the provenance apparatus from a note's RAW markdown, block by block, on
 *  the same blank-line split `localizeBody` uses.
 *
 *  This is the layer the filtering has to happen at for non-English readers. The
 *  content overlay replaces each English block with its translation BEFORE the
 *  text ever reaches parseProse, so an English-text pattern applied after that
 *  swap matches nothing and every locale but English keeps the bullets — which is
 *  exactly what a browser check on the Spanish page found. Filtering the raw
 *  English here means one pass decides for all ten locales.
 *
 *  parseProse still runs stripProvenance afterwards: this pass cannot see the
 *  `sources` chips and heading debris the parser synthesises, and the two are
 *  cheap and idempotent together. */
export function stripProvenanceRaw(raw: string, topic?: string, subtopic?: string): string {
  if (!(topic && KEEPS_GAP_TOPIC.test(topic))) return raw

  const sub = subtopic ? normHeading(subtopic) : ''
  // A whole subtopic that IS a provenance section (Cannon's "Related detail
  // captured in the same snapshots", Davidson Day's "Financial aid detail …") —
  // but only when every block under it is a bullet list. Davidson Day's "Fees
  // captured in the same snapshots" matches the same heading and holds a TABLE.
  if (PROVENANCE_CAPTURED_HEADING.test(sub)) {
    /* "every line is a bullet" is the wrong test: these lists are hard-wrapped, so
       a bullet's continuation lines are indented prose. Test that every BLOCK
       opens with a bullet instead — that is what distinguishes a bullets-only
       section from Davidson Day's "Fees captured in the same snapshots", which
       matches the same heading but holds a table. */
    const bodies = raw.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean)
    if (bodies.length && bodies.every((b) => BULLET.test(b))) return ''
  }

  const parts = raw.split(/(\n\s*\n)/)
  const out: string[] = []
  let dropNextBlock = false
  let inSnapshots = false
  for (const part of parts) {
    if (/^\s*$/.test(part)) {
      out.push(part)
      continue
    }
    const t = normHeading(stripAtx(part.split('\n')[0] ?? ''))

    // A `### Source snapshots` sub-heading takes everything under it, whatever
    // its shape, until the next sub-heading (Covenant Day).
    if (inSnapshots) {
      if (isAtxHeading(part)) inSnapshots = isWholeSectionDrop(t)
      else continue
      if (inSnapshots) continue
    } else if (isAtxHeading(part) && isWholeSectionDrop(t)) {
      inSnapshots = true
      continue
    }

    if (dropNextBlock) {
      dropNextBlock = false
      // The block a "Per-column sourcing:" lead-in introduces is its bullet list.
      if (part.split('\n').every((l) => !l.trim() || BULLET.test(l) || /^\s/.test(l))) continue
    }
    if (PROVENANCE_LEADIN.test(t)) {
      dropNextBlock = true
      continue
    }
    if (PROVENANCE_USER_DROP.test(normHeading(part))) continue
    out.push(part)
  }
  // Collapse the blank-line runs the removals left behind.
  return out.join('').replace(/\n{3,}/g, '\n\n').trim()
}

/** A sub-heading whose whole section goes, whatever its blocks contain. */
function isWholeSectionDrop(heading: string): boolean {
  return PROVENANCE_SNAPSHOT_HEADING.test(heading) || PROVENANCE_YEAR_PINNING.test(heading)
}

function isAtxHeading(block: string): boolean {
  return /^\s{0,3}#{1,6}\s+/.test(block)
}

function stripAtx(line: string): string {
  return line.replace(/^\s{0,3}#{1,6}\s+/, '').replace(/\s*#*\s*$/, '')
}

/** True when a note renders nothing after parsing — used by the card layer to
 *  suppress a subtopic <h3> whose whole body was filtered away. */
export function proseIsEmpty(
  raw: string,
  title?: string,
  topic?: string,
  subtopic?: string,
): boolean {
  return parseProse(raw, title, topic, subtopic).length === 0
}

// Research voice also appears INLINE, mid-note, rather than in its own section:
// a sentence about the research process ("A note on how to read this dossier."),
// or a parenthetical hedge appended to a real fact ("(Full surnames not confirmed
// in this pass.)"). Section stripping cannot reach these without discarding the
// surrounding facts, so they are removed sentence-by-sentence instead.

/** "in this pass", "in this research pass", "in this dossier", … — the phrase
 *  that marks a statement as being about the research rather than the school. */
const SELF_REF = /\bth(?:is|e)\s+(?:\w+\s+){0,2}(?:pass|dossier|series|file|report|research)\b/i

/** A whole sentence that talks about the research artifact itself ("This dossier
 *  covers…", "…so this dossier reports named minimums…"). Sentences that merely
 *  CONTAIN a hedge are left to the narrower clause/trailing strippers below, so a
 *  fact welded to a hedge keeps its fact. */
const ASIDE_SENTENCE = new RegExp(
  '(?:^|(?<=[.!?]\\s))[^.!?]*?(?:' +
    SELF_REF.source +
    '|\\bsee Notes\\s*(?:&|and)\\s*Gaps\\b' +
    '|\\b(?:legend nuance|discrepancy) flagged\\b' +
    ')[^.!?]*(?:[.!?]|$)\\s*',
  'gi',
)

/** A parenthetical hedge — "(Full surnames not confirmed in this pass — see Notes & Gaps.)" */
const ASIDE_PAREN = new RegExp(
  '\\s*[([][^)\\]]*\\b(?:not (?:confirmed|verified|consolidated|retrievable|individually named)' +
    '|unconfirmed|could not be (?:confirmed|verified|located)' +
    '|see Notes\\s*(?:&|and)\\s*Gaps)\\b[^)\\]]*[)\\]]',
  'gi',
)

/** Inline hedges that trail a fact: "…, though unconfirmed in this pass";
 *  "… — both surnames unconfirmed"; "…; the current head coach's name was not
 *  confirmed in this pass"; "…; a Middle School student council could not be
 *  confirmed". The fact before the separator is kept. */
const ASIDE_CLAUSE =
  /\s*[—–,;]\s*(?:though|although|but|and)?\s*[^.;)]*?\b(?:not\s+(?:independently\s+|individually\s+)?(?:confirmed|verified|retrievable)|could not be (?:confirmed|verified|located)|unconfirmed)\b[^.;)]*/gi

/** A short trailing fragment left where a gap sentence was cut, or a bare
 *  gap-flag tag ("Flagged as a gap."). */
const ASIDE_TAG = /\s*(?:Flagged as a gap|Flagged for follow-up|see Notes\s*(?:&|and)\s*Gaps)\.?/gi

/** A parenthetical that corrects or annotates the RESEARCH rather than the school
 *  ("(Earlier notes that … were based on incomplete public sources and are now
 *  corrected — both exist.)"). The corrected claim is already stated in the prose
 *  around it, so only the bookkeeping goes. */
const ASIDE_META_PAREN =
  /\s*[([][^)\]]*\b(?:earlier notes?|incomplete public sources|now corrected|previously (?:flagged|noted)|legend nuance)\b[^)\]]*[)\]]/gi

/** A trailing sentence of pure research bookkeeping that follows a real fact in
 *  the same run — "…state titles (2019, 2020, 2021). Full season records for
 *  those years were not independently confirmed in this pass and are intentionally
 *  omitted." Only the trailing sentence goes. */
//  A footnote marker can sit between the fact and the aside ("…(2019, 2020,
//  2021).[6] Full season records … were not confirmed"), so the lookbehind
//  allows one.
const ASIDE_TRAILING_SENTENCE =
  /(?<=[.!?](?:\[\d+\])?\s)[^.!?]*\b(?:not\s+(?:independently\s+|individually\s+)?(?:confirmed|verified|named|retrievable)|could not be (?:confirmed|verified|located)|unconfirmed)\b[^.!?]*[.!?]\s*/gi

/** A line that is ENTIRELY a research aside, with no fact wrapped around it —
 *  "Full surname not confirmed in this research pass", "(The three earlier POY
 *  winners … were not individually named in this pass.)", "current-season record
 *  not confirmed." A single sentence whose whole point is what the research did
 *  or did not establish. */
function isAsideLine(text: string): boolean {
  const t = text.trim()
  if (!t || t.length > 300) return false
  // More than one sentence means it carries other content — handled by the
  // sentence-level strippers instead.
  if ((t.match(/[.!?](?:\s|$)/g) || []).length > 1) return false
  const NEGATIVE =
    /\b(?:not\s+(?:independently\s+|individually\s+|newly\s+)?(?:confirmed|verified|named|retrieved|retrievable|consolidated|located)|could not be (?:confirmed|verified|located|retrieved)|unconfirmed|no\s+(?:named|current)\b[^.]*\bconfirmed)\b/i
  if (!NEGATIVE.test(t)) return false
  // A short fragment that is nothing but the hedge ("current-season record not
  // confirmed.", "all-School club fair is not confirmed.") — a flattened
  // quick-fact row whose whole content is the missing confirmation.
  if (t.split(/\s+/).length <= 10) return true
  // The line must be ABOUT the missing confirmation, not a fact that happens to
  // carry a hedge. If everything before the hedge is substantive ("Boys
  // Basketball — a CISAA-contending program (state titles 2006/2020/2021); the
  // coach's name was not confirmed"), the clause/sentence strippers trim the
  // hedge and keep the fact instead of dropping the whole line.
  // A line wholly inside brackets is an aside no matter how much it says.
  const bracketed = /^[([].*[)\]][.\s]*$/.test(t)
  if (!bracketed) {
    const head = t
      .slice(0, t.search(NEGATIVE))
      // Parenthetical detail is not the load-bearing fact, so it doesn't count.
      .replace(/[([][^)\]]*[)\]]/g, ' ')
      .replace(/[\s—–;,.[\]\d/]+$/, '')
    if (head && head.split(/\s+/).filter(Boolean).length >= 5) return false
  }
  // Self-referential ("in this pass") or opening with a gap label is decisive.
  return SELF_REF.test(t) || /^(?:honest gap|research gap|gap)\b/i.test(t) || /\bcould not be confirmed\b/i.test(t)
}

/** Strip inline research asides from a run of prose, keeping the real content. */
function stripAsides(text: string): string {
  if (isAsideLine(text)) return ''
  // A close-quote can end a sentence without terminal punctuation ("…one or
  // more.” This dossier carries…"), leaving the following aside unreachable to
  // the sentence strippers, which anchor on [.!?]. Cut such a trailing
  // self-referential sentence directly.
  text = text.replace(/([”"])\s+[A-Z][^.!?]*?\b(?:this|the)\s+(?:\w+\s+){0,2}(?:dossier|pass|series|file|report)\b[^.!?]*[.!?]\s*$/i, '$1')
  // Order matters: the narrow strippers run first so a hedge welded onto a real
  // fact is trimmed at the clause level. Only then does the sentence-level
  // stripper run, catching sentences that are wholly about the research.
  const cleaned = text
    .replace(ASIDE_PAREN, '')
    .replace(ASIDE_META_PAREN, '')
    .replace(ASIDE_TAG, '')
    .replace(ASIDE_CLAUSE, '')
    .replace(ASIDE_TRAILING_SENTENCE, '')
    .replace(ASIDE_SENTENCE, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+([.,;:)])/g, '$1')
    .replace(/^[\s—–,;.]+/, '')
    .trim()
  // Never let a strip gut the line — if little survives, keep the original.
  // Exception: a line that is wholly about the research artifact ("This dossier
  // covers…") has no fact to protect, so it is allowed to go to nothing.
  if (cleaned.length < 25 && text.trim().length >= 25) {
    return SELF_REF.test(text) && !cleaned ? '' : text
  }
  return cleaned
}

/** Apply stripAsides across every text-bearing block. */
function stripInlineAsides(blocks: ProseBlock[]): ProseBlock[] {
  const out: ProseBlock[] = []
  for (const b of blocks) {
    if (b.kind === 'para') {
      const cites = b.cites.map(stripAsides).filter(Boolean)
      const text = stripAsides(b.text)
      if (!text && !cites.length) continue
      out.push({ ...b, text, cites })
      continue
    }
    if (b.kind === 'list') {
      const cites = b.cites.map(stripAsides).filter(Boolean)
      const items = b.items.map(stripAsides).filter(Boolean)
      if (!items.length && !cites.length) continue
      out.push({ ...b, items, cites })
      continue
    }
    if (b.kind === 'facts') {
      // A quick-fact row labelled as a gap ("Honest gap  No named team physician
      // …") drops with its wrapped continuation lines, which the PDF flattening
      // leaves as separate rows.
      const lines: string[] = []
      let dropping = false
      for (const raw of b.lines) {
        if (/^\s*(?:honest|research|publication|transparency)\s+gaps?\b/i.test(raw)) {
          dropping = true
          continue
        }
        // A continuation line is lower-case/unlabelled; a new fact row starts
        // with its own capitalised label.
        if (dropping && !/^[A-Z0-9]/.test(raw.trim())) continue
        dropping = false
        const t = stripAsides(raw)
        if (t) lines.push(t)
      }
      if (!lines.length) continue
      out.push({ ...b, lines })
      continue
    }
    if (b.kind === 'scope') {
      // Scope lines describe the research area ("Scope, honest gaps, and the clubs
      // confirmable from public sources"); trim the gap clauses out of the list.
      const text = b.text
        .split(/\s*,\s*/)
        .filter((part) => !/\b(?:honest|gaps?|confirmable|unconfirmed|caveats?)\b/i.test(part))
        .join(', ')
        .replace(/^\s*(?:and|&)\s+/i, '')
        .replace(/\s*(?:and|&)\s*$/i, '')
        .trim()
      if (text) out.push({ ...b, text })
      continue
    }
    out.push(b)
  }
  return out
}

/** Drop every gap-flagged section: the heading itself plus the blocks beneath it,
 *  up to the next heading. Nothing else is touched — a note whose gap section is
 *  removed still renders all its substantive content. */
function stripGapSections(blocks: ProseBlock[], topic?: string): ProseBlock[] {
  const out: ProseBlock[] = []
  let skipping = false
  // A gap-styled line at the very top is the note's own title, not a gap section
  // — e.g. the college dossiers' "The Honest Questions" segment, whose body is
  // ordinary content about rank policy and learning support. Skipping from there
  // would swallow the whole card, so the first heading only ever gets dropped,
  // never used to start a skip.
  let seenContent = false
  for (const b of blocks) {
    if (b.kind === 'heading') {
      const isGap = isGapHeading(b.text, topic)
      if (isGap && !seenContent) continue // drop the title line, keep the body
      skipping = isGap
      if (skipping) continue
      seenContent = true
      out.push(b)
      continue
    }
    if (!skipping) seenContent = true
    // A demoted heading is a stray title line; if it flags a gap, drop just it.
    if (b.kind === 'para' && b.demoted && isGapHeading(b.text, topic)) continue
    // An inline callout paragraph ("TRANSPARENCY GAP — …") ends any skip and is
    // itself dropped, since the parser may not have read it as a heading.
    if (b.kind === 'para' && isGapHeading(b.text, topic)) {
      skipping = true
      continue
    }
    if (!skipping) out.push(b)
  }
  return out
}

const KNOWN_HEADING =
  /^(Executive Summary|Strengths|Weaknesses|Caveats?|Notes?(?: & | and )Gaps|Questions to Confirm[^]*|Philosophy|At a Glance|Overview|Honest (?:Framing|limit|scope)[^]*|Source List|Sources?(?: & | and )Where to Verify|Sources referenced|Sources?)\s*$/i

/** Pull inline "[Source: …]" / "[Sources: …]" citations out of a run of text. */
function extractCites(text: string): { text: string; cites: string[] } {
  const cites: string[] = []
  const cleaned = text
    .replace(/\[Sources?:\s*([^\]]*)\]/gi, (_m, inner: string) => {
      const c = inner.replace(/\s+/g, ' ').trim()
      if (c) cites.push(c)
      return ''
    })
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+([.,;:)])/g, '$1')
    .replace(/\(\s+/g, '(')
    .trim()
  return { text: cleaned, cites }
}

function toneFor(t: string): HeadingTone {
  if (/^Strengths\b/i.test(t)) return 'good'
  if (/^(Notes|Caveats?|Questions to Confirm|Honest|Weaknesses|Gaps)/i.test(t)) return 'caution'
  return 'default'
}

/** A short "Label 1470–1590 1220–1380"-style data row (a flattened stat table row). */
function isStatRow(line: string): boolean {
  const t = line.trim()
  if (t.length > 64 || /[.]$/.test(t)) return false
  const words = t.split(/\s+/)
  if (words.length < 2 || words.length > 8) return false
  const numeric = words.filter((w) => /\d/.test(w) && /^[\w.,%$–—-]+$/.test(w))
  return numeric.length >= 2
}

// Cover-page provenance ("Prepared July 2026", "Figures cover the 2026–27 school
// year"). Short and title-ish, so it reads as a heading, but it heads nothing.
const COVER_META = /^(Prepared|Retrieved|Compiled|Figures cover|Published|Last updated)\b/i

/** Decide whether a line is a section heading; returns its tone, or null if it isn't. */
function headingTone(line: string): HeadingTone | null {
  const t = line.trim()
  if (!t) return null
  if (BULLET.test(t) || URL_RE.test(t) || CITE_LINE.test(t) || TABLE_ROW.test(t) || isStatRow(t)) return null
  if (COVER_META.test(t)) return null

  const letters = t.replace(/[^A-Za-z]/g, '')
  const isAllCaps = letters.length >= 2 && t === t.toUpperCase()
  if (isAllCaps && t.length <= 40) {
    return t.replace(/\s+/g, ' ').toUpperCase() === 'AT A GLANCE' ? 'glance' : toneFor(t)
  }

  if (KNOWN_HEADING.test(t)) return toneFor(t)

  const words = t.split(/\s+/)
  const endsClause = /[.,;:]$/.test(t)
  const titleish = /^[A-Z(]/.test(t)
  if (titleish && !endsClause && words.length <= 7) return toneFor(t)
  return null
}

function looksLikeSubtitle(line: string): boolean {
  return (
    (/,\s*(NC|North Carolina)\b/.test(line) || /\((?:age \d|TK-|JK-|JrK|K-|grade|Christian|Lake Norman|PDS)/i.test(line)) &&
    !headingTone(line)
  )
}

/** A leftover school / section banner line (not caught by the text-level strips). */
function isBanner(line: string): boolean {
  return (
    /^Inside .+\b(Support|Clubs|Activities|Athletics|Arts|Dossier)\b/i.test(line) ||
    /\bSCHOOL\b.*\b(College Support|Clubs|Activities|Athletics|Series|Dossier)\b/.test(line) ||
    /\b(CHARGERS|COUGARS|HAWKS|KNIGHTS)\b/.test(line)
  )
}

/** The series banner that opens a report's PDF cover page. Distinct from isBanner:
 *  a dossier's banner is followed by the segment's real subtitle, whereas a cover
 *  page is followed only by more cover text. */
function isCoverBanner(line: string): boolean {
  return /^CHARLOTTE-AREA INDEPENDENT SCHOOLS\b/i.test(line)
}

function normalizeTitle(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '')
}

/** True if a section heading merely repeats the card's own title (e.g. an
 *  "Executive Summary" heading inside the "Executive Summary" card). */
export function headingEchoesTitle(heading: string, title?: string): boolean {
  if (!title) return false
  return normalizeTitle(heading) === normalizeTitle(title)
}

/** True if a leading line is just the doc title (equals or ends with the card's label). */
function isTitleDup(line: string, title?: string): boolean {
  if (!title) return false
  const l = normalizeTitle(line)
  const t = normalizeTitle(title)
  return t.length > 0 && (l === t || l.endsWith(t))
}

/** Split a source line into { label, url }, deriving a label from the host if needed. */
function parseSource(rawLabel: string, url: string): SourceLink {
  let label = rawLabel.replace(/^\s*[•‣▪·\-–]\s*/, '').replace(/[\s—–:-]+$/, '').trim()
  if (!label) {
    try {
      label = new URL(url).hostname.replace(/^www\./, '')
    } catch {
      label = url
    }
  }
  return { label, url }
}

/** True if a pre-rendered preview string carries research-gap framing, so callers
 *  know not to fall back to it (the stored previews are raw, unparsed text). */
export function previewHasGapLanguage(preview: string, topic?: string): boolean {
  return /\b(?:honest|transparency|publication|research|disclosure)\s+(?:gaps?|questions?|framing|assessment|limits?)\b|\bnotes?\s*(?:&|and)\s*gaps?\b|\bnot confirmed\b|\bunconfirmed\b|\bcould not be (?:confirmed|verified|located)\b/i.test(
    preview,
  ) && !(topic && KEEPS_GAP_TOPIC.test(topic))
}

/** A clean one-line summary (first real paragraph) for collapsed card previews. */
/**
 * Drop markdown emphasis markers. The teaser this feeds renders as PLAIN TEXT
 * (SchoolDetail's `.topic-teaser` span), so a `**bold**` span carried over from
 * the source note would show its asterisks literally — "the school's **highest
 * honor**". Bold inside the card BODY is unaffected: ProseContent renders it.
 */
function stripEmphasis(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/(?<![\w*])\*([^*\n]+)\*(?![\w*])/g, '$1')
    .replace(/\*\*/g, '')
}

/** Flatten raw note text into something safe to show in a plain-text teaser.
 *
 *  The teaser renders inside a `.topic-teaser` span, so anything markdown-shaped
 *  arrives as literal punctuation: a pipe table becomes
 *  "| Band | 2021–22 | | --- | --- |" and an ATX heading keeps its hashes. This
 *  strips the syntax rather than the content — heading markers go, table rows
 *  become " · "-joined cells, bullets lose their dashes. */
export function flattenMarkdown(raw: string): string {
  const parts: string[] = []
  for (const line of raw.split('\n')) {
    const t = line.trim()
    if (!t) continue
    if (TABLE_DIVIDER.test(t)) continue // "|---|---|" carries no words at all
    if (TABLE_ROW.test(t)) {
      const cells = t.replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim()).filter(Boolean)
      if (cells.length) parts.push(cells.join(' · '))
      continue
    }
    if (/^\s{0,3}#{1,6}\s+/.test(t)) {
      const h = stripAtx(t)
      if (h) parts.push(h)
      continue
    }
    parts.push(t.replace(BULLET, ''))
  }
  return stripEmphasis(parts.join(' — ').replace(/\s+/g, ' ').trim())
}

/** One line of plain text describing a note, for the collapsed card teaser.
 *
 *  Prefers real prose, then a "facts" run. Falls back to describing the note's
 *  STRUCTURE — its heading and a table's column names — because many of these
 *  notes are legitimately a heading plus a table and nothing else, and a teaser
 *  is still owed for them. Measured 2026-08-29: 103 of 674 card teasers were
 *  rendering raw markdown (pipe rows, `#` markers) because the last-resort branch
 *  returned the unparsed source; the tuition-history cards made it visible, but
 *  every topic and nearly every school was affected.
 *
 *  Everything returned here comes from PARSED blocks, so it inherits the gap and
 *  provenance filtering — and the strings are the overlay-translated ones, so the
 *  teaser is localized without this function needing `t()`. */
export function proseSummary(raw: string, title?: string, topic?: string, subtopic?: string): string {
  const blocks = parseProse(raw, title, topic, subtopic)
  for (const b of blocks) {
    if (b.kind === 'para' && b.text && !b.demoted) return stripEmphasis(b.text)
    if (b.kind === 'facts' && b.lines.length) return stripEmphasis(b.lines.join(' — '))
  }

  /* No prose in the note. Describe it instead: the first heading, and the first
     table's column headers — which name what the table actually holds ("Band ·
     2021–22 · 2022–23 …"), and are the closest thing to a summary such a note has.
     A demoted heading counts here: it heads nothing, but it is still a title. */
  const bits: string[] = []
  const heading = blocks.find(
    (b): b is Extract<ProseBlock, { kind: 'heading' } | { kind: 'para' }> =>
      b.kind === 'heading' || (b.kind === 'para' && !!b.demoted),
  )
  if (heading) bits.push(stripEmphasis(heading.text))
  const table = blocks.find((b): b is Extract<ProseBlock, { kind: 'table' }> => b.kind === 'table')
  if (table) {
    const cols = table.header.map((h) => stripEmphasis(h).trim()).filter(Boolean)
    if (cols.length) bits.push(cols.join(' · '))
  }
  if (bits.length) return bits.join(' — ')

  /* Last resort. Still never the raw source: it is unparsed, so it can carry both
     the gap language the parse strips AND markdown syntax the teaser would render
     literally. Flatten it, and only when the note has no gap framing at all. */
  return raw.split('\n').some((l) => isGapHeading(l, topic)) ? '' : flattenMarkdown(raw)
}

export function parseProse(
  raw: string,
  title?: string,
  topic?: string,
  subtopic?: string,
): ProseBlock[] {
  // 1) Strip repeated boilerplate at the text level (some spans wrap across lines).
  const text = raw
    .replace(/[ \t]*\n?[-–—]{3,}\s*$/g, '')
    // Repeated page banners / footers (some recur on every "page" of a note).
    .replace(/^.*RESEARCH DOSSIER.*$/gim, '')                       // dossier page banner
    .replace(/^.*\bCollege Support Series\b.*$/gim, '')             // "SCHOOL College Support Series — Title"
    .replace(/^Inside .+\b(College Support|Clubs?(?: & | and )Activities|Athletics|Arts|Dossier)\b.*$/gim, '') // "Inside <School> …"
    .replace(/^[A-Z][^a-z\n]{2,}Segment \d+\s*[—–-].*$/gm, '')      // "SCHOOL Segment N — Title" (no /i: [^a-z] must keep A-Z)
    .replace(/^Segment \d+:.*$/gim, '')                            // "Segment N: Title" running header
    .replace(/^[A-Z0-9][^a-z\n]{11,}$/gm, (m) =>                    // all-caps school / section banner line
      /\b(SCHOOL|SEGMENT|DOSSIER|CHARGERS|COUGARS|HAWKS|KNIGHTS|ATHLETICS|CLUBS|ACTIVITIES)\b/.test(m) ? '' : m)
    .replace(/^Compiled[^\n]*Page\s*\d+[^\n]*$/gim, '')            // dossier page footer
    .replace(/^.*\bSeries Page \d+\s*$/gim, '')                    // college "… Series Page N" footer
    .replace(/^.*\d{1,2}\/\d{1,2}\/\d{2,4},?\s+\d{1,2}:\d{2}\s*(?:AM|PM).*$/gim, '') // export-timestamp banner
    .replace(/Global rule\b[\s\S]*?filled by inference\.?/gi, '')  // repeated per-segment methodology note
    // Rejoin "[Source: …]" citations that wrap across lines (now that any page
    // header/footer that split them has been stripped).
    .replace(/\[Sources?:[\s\S]*?\]/gi, (m) => m.replace(/\s+/g, ' '))

  const lines = text
    .split('\n')
    .map((l) => l.replace(/\s+$/, ''))
    .filter((l) => l.trim() !== '')

  // 2) Drop the one-time front matter (title / subtitle / disclaimer / banner).
  const blocks: ProseBlock[] = []
  const scopeRe = /^(?:(?:Research Area|Segment \d+(?: of \d+)?)\s*[—–:]\s*|Rigor(?: & | and )Credentials\s*$)/i
  const discIdx = lines.findIndex((l) => /^Compiled research note/i.test(l))
  if (discIdx !== -1) {
    // After-school / arts notes: the title looks like a heading, so anchor on the
    // disclaimer and drop everything up to the first real content after it.
    let start = discIdx + 1
    while (start < lines.length && !BULLET.test(lines[start]) && headingTone(lines[start]) === null) start++
    lines.splice(0, start)
  } else {
    // Dossier / college notes: skip leading banner / title / subtitle lines, keeping the
    // lede paragraph; capture a scope line ("Research Area —", "Segment N of M —", …).
    let guard = 0
    while (lines.length && guard++ < 6) {
      const l = lines[0]
      if (BULLET.test(l) || URL_RE.test(l)) break
      if (scopeRe.test(l)) {
        const r = lines.shift()!
        blocks.push({ kind: 'scope', text: r.replace(scopeRe, '').trim() || r.trim() })
        continue
      }
      if (isCoverBanner(l)) {
        lines.shift()
        // A cover page stacks its title lines under the banner — report title, then
        // school name — with no body between them. They read as headings but head no
        // section, so drop the whole run as front matter. A scope line is the note's
        // real subject rather than cover text, so it stops the run.
        while (lines.length && headingTone(lines[0]) !== null && !scopeRe.test(lines[0])) {
          lines.shift()
        }
        continue
      }
      if (isBanner(l) || looksLikeSubtitle(l) || isTitleDup(l, title)) {
        lines.shift()
        continue
      }
      break
    }
  }

  // 3) Classify the body.
  type Mode = 'body' | 'facts' | 'sources'
  let mode: Mode = 'body'

  let para: string[] = []
  let listItems: string[] = []
  const listCites: string[] = []
  let facts: string[] = []
  let tableRows: string[][] = []
  let sources: SourceLink[] = []
  let pendingSourceLabel = ''

  const flushPara = () => {
    if (!para.length) return
    const { text: t, cites } = extractCites(para.join(' '))
    if (t) blocks.push({ kind: 'para', text: t, cites })
    para = []
  }
  const flushList = () => {
    if (!listItems.length && !listCites.length) return
    blocks.push({ kind: 'list', items: listItems, cites: listCites.slice() })
    listItems = []
    listCites.length = 0
  }
  const flushFacts = () => {
    if (facts.length) blocks.push({ kind: 'facts', lines: facts })
    facts = []
  }
  const flushTable = () => {
    if (tableRows.length >= 2) {
      blocks.push({ kind: 'table', header: tableRows[0], rows: tableRows.slice(1) })
    } else if (tableRows.length === 1) {
      // A lone pipe row isn't a table — keep its text rather than dropping it.
      blocks.push({ kind: 'para', text: tableRows[0].join(' · '), cites: [] })
    }
    tableRows = []
  }
  const flushSources = () => {
    if (sources.length) blocks.push({ kind: 'sources', items: sources })
    sources = []
    pendingSourceLabel = ''
  }
  const flushAll = () => {
    flushPara()
    flushList()
    flushFacts()
    flushTable()
    flushSources()
  }

  for (const line of lines) {
    /* ATX markdown headings ("# Title", "### Tuition by band and year").
       The research files are markdown, but this parser only ever INFERRED
       headings from wording — it never recognised `#` syntax — so the markers
       survived into the rendered page as literal text ("# Covenant Day School —
       … ### Tuition by band and year" ran together mid-paragraph). Recognise
       them properly and render a real heading; the tone still comes from the
       wording, so a "⚠️ …" or "At a glance" heading keeps its treatment. */
    const atx = /^\s{0,3}(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line)
    if (atx) {
      const text = atx[2].trim()
      flushAll()
      /* An H1 is the source document's own title, which is already the card's
         title — rendering it again duplicates the heading. Skip it and keep the
         body. Deeper levels are real in-note section headings. */
      if (atx[1].length > 1 && text) {
        blocks.push({ kind: 'heading', text, tone: headingTone(text) ?? 'default' })
        mode = /source/i.test(text) ? 'sources' : 'body'
      }
      continue
    }

    const tone = headingTone(line)
    if (tone) {
      flushAll()
      blocks.push({ kind: 'heading', text: line.trim().replace(/\s+/g, ' '), tone })
      mode = tone === 'glance' ? 'facts' : /source/i.test(line) ? 'sources' : 'body'
      continue
    }

    if (mode === 'facts') {
      facts.push(line.trim())
      continue
    }

    if (mode === 'sources') {
      const stripped = line.replace(/^\s*[•‣▪·\-–]\s*/, '')
      const m = stripped.match(URL_RE)
      if (m) {
        sources.push(parseSource(stripped.slice(0, m.index).trim() || pendingSourceLabel, m[0]))
        pendingSourceLabel = ''
      } else if (sources.length && /^[\w\-./%?=&#:+~]+$/.test(stripped.trim())) {
        // A hard-wrapped URL tail from the previous line — rejoin it.
        sources[sources.length - 1].url += stripped.trim()
      } else {
        pendingSourceLabel = stripped.trim()
      }
      continue
    }

    // body mode

    // Markdown pipe tables (from .md source notes, e.g. pricing matrices).
    if (TABLE_ROW.test(line)) {
      flushPara()
      flushList()
      flushFacts()
      if (!TABLE_DIVIDER.test(line)) {
        tableRows.push(
          line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim()),
        )
      }
      continue
    }
    if (tableRows.length) flushTable()

    // Consecutive flattened stat-table rows (e.g. "SAT 1470–1590 1220–1380") are
    // gathered into a quick-fact panel rather than scattered as pseudo-headings.
    if (isStatRow(line)) {
      flushPara()
      flushList()
      facts.push(line.trim())
      continue
    }
    if (facts.length) flushFacts()

    if (BULLET.test(line)) {
      flushPara()
      const itemRaw = line.replace(BULLET, '').trim()
      if (CITE_LINE.test(itemRaw)) {
        const { cites } = extractCites(itemRaw)
        listCites.push(...cites)
      } else {
        const { text: t, cites } = extractCites(itemRaw)
        if (t) listItems.push(t)
        listCites.push(...cites)
      }
      continue
    }

    if (CITE_LINE.test(line)) {
      const { cites } = extractCites(line)
      if (listItems.length) listCites.push(...cites)
      else if (para.length) para.push(line)
      else if (cites.length) blocks.push({ kind: 'para', text: '', cites })
      continue
    }

    // A plain line while a bullet list is open is a wrapped continuation of the last
    // item, not a new paragraph — sections here are either all-prose or all-bullets.
    if (listItems.length) {
      const { text: t, cites } = extractCites(line.trim())
      if (t) listItems[listItems.length - 1] += ' ' + t
      listCites.push(...cites)
      continue
    }
    para.push(line)
  }
  flushAll()

  return stripProvenance(
    stripInlineAsides(stripGapSections(promoteFlattenedTables(demoteEmptyHeadings(blocks)), topic)),
    topic,
    subtopic,
  )
}

// A pure money / number token — a value cell of a flattened stat-table row
// ("$21,300", "$10,650.00", "48%"). Ranges ("1470–1590") deliberately don't match:
// only rows whose trailing cells are unambiguous values get promoted to a table.
const VALUE_TOKEN = /^\$\d[\d,]*(?:\.\d+)?$|^\d[\d,]*(?:\.\d+)?%?$/

/** Split "Early Education (JK–K) $21,300 $10,650.00" into label + trailing values. */
function splitStatValues(line: string): { label: string; values: string[] } {
  const words = line.trim().split(/\s+/)
  let i = words.length
  while (i > 0 && VALUE_TOKEN.test(words[i - 1])) i--
  return { label: words.slice(0, i).join(' '), values: words.slice(i) }
}

/** Split a flattened header line ("Division (2026–27) Published tuition Ceiling on
 *  any grant") into column names, assuming each column name starts with a capital
 *  ("Division …", "Published …", "Ceiling …"). Returns null unless the capitals
 *  yield exactly the expected column count — when in doubt, no table. */
function splitHeaderCells(text: string, cols: number): string[] | null {
  if (text.length > 90) return null
  const words = text.split(/\s+/)
  const starts: number[] = []
  words.forEach((w, i) => {
    if (/^[A-Z]/.test(w)) starts.push(i)
  })
  if (starts.length !== cols || starts[0] !== 0) return null
  return starts.map((s, j) => words.slice(s, starts[j + 1] ?? words.length).join(' '))
}

/** A PDF table flattens into a header line (absorbed by the paragraph above it,
 *  since it reads as prose) followed by "label $X $Y" stat rows (gathered into a
 *  facts panel). That renders as bare unlabeled numbers — e.g. tuition next to the
 *  maximum-grant ceiling with nothing saying which is which. When every facts row
 *  splits into label + the same count of value tokens AND the preceding paragraph's
 *  last sentence splits into matching column names, rebuild the real table. */
function promoteFlattenedTables(blocks: ProseBlock[]): ProseBlock[] {
  const out: ProseBlock[] = []
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i]
    const next = blocks[i + 1]
    if (b.kind === 'para' && b.text && next?.kind === 'facts' && next.lines.length >= 2) {
      const rows = next.lines.map(splitStatValues)
      const k = rows[0].values.length
      if (k >= 1 && rows.every((r) => r.label && r.values.length === k)) {
        const cut = b.text.lastIndexOf('. ')
        const tail = (cut === -1 ? b.text : b.text.slice(cut + 2)).trim()
        const header = tail && !/[.!?]$/.test(tail) ? splitHeaderCells(tail, k + 1) : null
        if (header) {
          const lead = cut === -1 ? '' : b.text.slice(0, cut + 1)
          if (lead || b.cites.length) out.push({ kind: 'para', text: lead, cites: b.cites })
          out.push({ kind: 'table', header, rows: rows.map((r) => [r.label, ...r.values]) })
          i++
          continue
        }
      }
    }
    out.push(b)
  }
  return out
}

/** A heading with nothing under it heads no section — it's a line the classifier
 *  over-read (a flattened table row like "Financial Aid Workshop All families", a
 *  leftover cover-page date). Demote it to a paragraph: the text still shows, but
 *  the page stops rendering section bars over empty space. Same conservative
 *  principle as the rest of the parser — when unsure, it's prose. */
function demoteEmptyHeadings(blocks: ProseBlock[]): ProseBlock[] {
  return blocks.map((b, i) => {
    if (b.kind !== 'heading') return b
    const next = blocks[i + 1]
    if (next && next.kind !== 'heading') return b
    return { kind: 'para', text: b.text, cites: [], demoted: true }
  })
}
