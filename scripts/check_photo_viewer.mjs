/**
 * Assert that every photo the app renders opens in the shared click-to-enlarge
 * viewer (src/components/PhotoViewer.tsx, plan `photolightbox`), unless it is
 * on the short, reasoned exemption list below.
 *
 * WHY THIS EXISTS. The viewer is wired inside the three photo components
 * (Facilities, Arts card photos, Summer band), so new photo DATA on those
 * surfaces is covered automatically. A new photo SURFACE is not: a future card
 * component that renders its own <img> gets no lightbox unless whoever builds
 * it remembers `PhotoZoomButton`, and nothing else in the build would notice.
 * This check fails closed — any new <img> anywhere under src/ is a build error
 * until someone decides whether it opens in the viewer or is exempt.
 *
 * Three rules, each its own failure:
 *
 *  1. Every JSX <img> is lexically inside a <PhotoZoomButton>…</PhotoZoomButton>
 *     or matches exactly one EXEMPT entry.
 *  2. Every EXEMPT entry matches exactly one <img>. An entry matching none is
 *     stale (the image moved or was removed); one matching several is too loose
 *     and would silently exempt a newcomer. Either fails.
 *  3. A file that renders PhotoZoomButton also renders <PhotoViewer — a zoom
 *     button with no viewer behind it is a dead click.
 *
 * Limits, stated so the green tick is not over-read: it parses TSX as text
 * (comments stripped), so it sees JSX `<img` tags only. A photo drawn as a CSS
 * background-image, or created with document.createElement('img'), is invisible
 * to it. None exists today.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC = path.join(ROOT, 'src')

/**
 * Images that deliberately do NOT open the viewer. `match` is a substring of the
 * <img …> tag itself, so an entry survives line moves but not a rewrite of the
 * tag. Every entry needs a reason a reviewer can disagree with.
 */
const EXEMPT = [
  { file: 'src/components/PhotoViewer.tsx', match: 'className="pv-img"', reason: 'the enlarged image inside the viewer itself' },
  { file: 'src/App.tsx', match: 'className="brand-logo"', reason: 'site logo; it is the home link' },
  { file: 'src/pages/SchoolDetail.tsx', match: 'className="dossier-crest"', reason: "school crest; it links to the school's own homepage" },
  { file: 'src/components/LatestNews.tsx', match: 'src={lead.photo}', reason: "news thumbnail inside a link to the article on the school's site" },
  { file: 'src/components/LatestNews.tsx', match: 'src={item.photo}', reason: "news thumbnail inside a link to the article on the school's site" },
]

/** Blank out comments, keeping offsets (and so line numbers) intact. */
function stripComments(s) {
  const blank = (m) => m.replace(/[^\n]/g, ' ')
  return s
    .replace(/\/\*[\s\S]*?\*\//g, blank)
    .replace(/(^|[^:'"`])\/\/[^\n]*/g, (m, pre) => pre + blank(m.slice(pre.length)))
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) return walk(p)
    return /\.(tsx|jsx)$/.test(e.name) ? [p] : []
  })
}

/** The full `<img …>` tag starting at `i`, honouring `{…}` expressions. */
function tagAt(s, i) {
  let depth = 0
  for (let j = i; j < s.length; j++) {
    const c = s[j]
    if (c === '{') depth++
    else if (c === '}') depth--
    else if (c === '>' && depth === 0) return s.slice(i, j + 1)
  }
  return s.slice(i)
}

const errors = []
const exemptHits = new Map(EXEMPT.map((e) => [e, 0]))
let wrapped = 0

for (const abs of walk(SRC)) {
  const rel = path.relative(ROOT, abs).split(path.sep).join('/')
  const text = stripComments(fs.readFileSync(abs, 'utf8'))
  const lineOf = (i) => text.slice(0, i).split('\n').length

  // Spans covered by <PhotoZoomButton …> … </PhotoZoomButton>.
  const spans = []
  for (const m of text.matchAll(/<PhotoZoomButton\b/g)) {
    const end = text.indexOf('</PhotoZoomButton>', m.index)
    if (end === -1) errors.push(`${rel}:${lineOf(m.index)} — <PhotoZoomButton> with no closing tag`)
    else spans.push([m.index, end])
  }
  if (spans.length > 0 && !/<PhotoViewer\b/.test(text)) {
    errors.push(`${rel} — renders PhotoZoomButton but never <PhotoViewer>; the zoom button would open nothing`)
  }

  for (const m of text.matchAll(/<img\b/g)) {
    if (spans.some(([a, b]) => m.index > a && m.index < b)) { wrapped++; continue }
    const tag = tagAt(text, m.index)
    const hit = EXEMPT.filter((e) => e.file === rel && tag.includes(e.match))
    hit.forEach((e) => exemptHits.set(e, exemptHits.get(e) + 1))
    if (hit.length === 0) {
      errors.push(
        `${rel}:${lineOf(m.index)} — <img> outside PhotoZoomButton and not exempt.\n` +
        `      Wrap it in <PhotoZoomButton> and render a <PhotoViewer> (see FacilitiesBody in\n` +
        `      SportsProgram.tsx), or, if it must not enlarge, add an EXEMPT entry with a reason.`,
      )
    }
  }
}

for (const [e, n] of exemptHits) {
  if (n === 0) errors.push(`EXEMPT entry matched no <img> (stale): ${e.file} · ${e.match}`)
  else if (n > 1) errors.push(`EXEMPT entry matched ${n} <img> tags (too loose): ${e.file} · ${e.match}`)
}

if (errors.length) {
  console.error(`✘ check:photos — ${errors.length} problem(s):`)
  for (const e of errors) console.error(`  - ${e}`)
  process.exit(1)
}
console.log(`✓ check:photos — ${wrapped} photo render site(s) open in the viewer; ${EXEMPT.length} exempt <img> each matched once`)
