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
  | { kind: 'para'; text: string; cites: string[] }
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

/** Decide whether a line is a section heading; returns its tone, or null if it isn't. */
function headingTone(line: string): HeadingTone | null {
  const t = line.trim()
  if (!t) return null
  if (BULLET.test(t) || URL_RE.test(t) || CITE_LINE.test(t) || TABLE_ROW.test(t) || isStatRow(t)) return null

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

/** A clean one-line summary (first real paragraph) for collapsed card previews. */
export function proseSummary(raw: string, title?: string): string {
  for (const b of parseProse(raw, title)) {
    if (b.kind === 'para' && b.text) return b.text
    if (b.kind === 'facts' && b.lines.length) return b.lines.join(' — ')
  }
  return raw.replace(/\s+/g, ' ').trim()
}

export function parseProse(raw: string, title?: string): ProseBlock[] {
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

  return blocks
}
