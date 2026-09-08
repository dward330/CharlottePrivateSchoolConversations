#!/usr/bin/env node
/**
 * Render one school's Admissions research area into a NotebookLM source PDF,
 * plus the plain-text prompt that turns it into a podcast episode.
 *
 *   node scripts/gen_admissions_report.mjs --school providence-day
 *   npm run report:admissions -- --school providence-day
 *
 * Writes two files to reports/admissions/ (gitignored):
 *
 *   <slug>-admissions-notebooklm.pdf   the SOURCE DOCUMENT — every page of it is
 *                                      material meant to be read
 *   <slug>-notebooklm-prompt.txt       the prompt, to paste into NotebookLM's
 *                                      Audio Overview "Customize" box
 *
 * ⛔ THE PROMPT IS NEVER IN THE PDF. Anything NotebookLM must not treat as
 * source material does not go into the file NotebookLM ingests. An earlier
 * design printed the prompt as a fenced appendix and told the model to ignore
 * it, which made correct output depend on a generative tool obeying an
 * instruction not to read part of its own source. Removing the page removes the
 * dependency — there is nothing to disobey. `assertNoPromptLeak()` enforces it.
 *
 * WHY GENERATED, NOT HAND-WRITTEN: the entry cycles roll over every year and
 * every date is a citation a parent matches against the school's own calendar.
 * A hand-written report is stale the first time a cycle turns and nothing tells
 * you it went stale — the same reasoning behind the generated DATA-SCHEMA.md.
 *
 * ⛔ DO NOT IMPORT src/data/admissionsPrograms.ts. It calls `import.meta.glob`
 * at module scope for its locale overlays, a Vite compile-time transform that
 * throws under plain Node (and the module deliberately does not guard it — a
 * runtime guard survives into the bundle and silently kills every overlay).
 * The PER-SCHOOL modules have no glob and import cleanly, so this script
 * imports those directly. The named export differs per file (`providenceDay`,
 * `charlotteLatin`, …), hence `Object.values(mod)` rather than a name derived
 * from the slug.
 *
 * TWO DELIBERATE DIVERGENCES FROM THE APP'S OWN RENDER — do not "fix" either:
 *
 *  1. `AdDeadline.unpublished` is NOT rendered in the app (the tile looks
 *     identical either way, because there is no live-calendar link to send the
 *     reader to). Here it IS surfaced, as "(time only — date on the school's
 *     live calendar)", because NotebookLM cannot infer it and would otherwise
 *     speak "4:00 p.m." as if it were a date.
 *  2. Both `steps[]` and `checklistRows[]` are rendered. They are deliberately
 *     not the same list — the paper sheet splits actions the on-screen stepper
 *     merges. The spoken episode wants the checklist sequence; the steps carry
 *     the `detail` prose explaining why. Both ship, labeled so they do not read
 *     as two different processes.
 *
 * `**bold**` IS markdown in exactly three fields — `steps[].detail`,
 * `watchOuts[].text` and `aid.text` — and is NOT supported anywhere else (the
 * data files carry a NOTE FOR EDITORS block saying so; `rules[].text` renders
 * raw in the app). This script converts those three and leaves `**` literal
 * elsewhere, then asserts no `**` survived into the HTML — raw markdown leaking
 * into generated output has shipped in this repo before.
 *
 * Exit codes: 0 = both files written, 2 = no such school / no admissions data /
 * bad arguments. On exit 2 NOTHING is written — not a stub PDF, not an empty
 * prompt.
 */
import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { resolve, join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const PROGRAMS_DIR = resolve(REPO_ROOT, 'src/data/admissionsPrograms')
const GLOSSARY_PATH = resolve(
  REPO_ROOT,
  'source-material/admissions/_shared/Admissions - Shared - Terminology Glossary.md',
)
const INSIGHTS_SITE = 'www.charlotteschoolinsights.com'

/* ------------------------------------------------------------------ args -- */

const argv = process.argv.slice(2)
const flag = (name) => argv.includes(name)
const value = (name, fallback) => {
  const i = argv.indexOf(name)
  return i === -1 || i === argv.length - 1 ? fallback : argv[i + 1]
}

const QUIET = flag('--quiet')
const SCHOOL = value('--school')
const OUT_DIR = resolve(REPO_ROOT, value('--out', 'reports/admissions'))
const OVERRIDES_PATH = value('--overrides')

const say = (...a) => { if (!QUIET) console.log(...a) }
const die = (msg) => { console.error(msg); process.exit(2) }

/* ------------------------------------------------- the eligible schools -- */

/**
 * Read the roster from the directory at run time — NEVER a hardcoded list.
 * Six schools qualify today and the area is still growing; a seventh built
 * after this ships must be picked up with no edit to this script.
 */
async function eligibleSchools() {
  const out = []
  for (const file of readdirSync(PROGRAMS_DIR).sort()) {
    if (!file.endsWith('.ts')) continue
    const slug = file.slice(0, -3)
    const guide = await loadGuide(slug)
    if (guide) out.push({ slug, guide })
  }
  return out
}

/** The school's `guide`, or null when the module has none. */
async function loadGuide(slug) {
  const path = join(PROGRAMS_DIR, `${slug}.ts`)
  if (!existsSync(path)) return null
  const mod = await import(pathToImportSpecifier(path))
  // The named export differs per file, so find the one exposing a guide rather
  // than deriving a name from the slug. Fail loudly on an unexpected shape
  // instead of writing a half-empty PDF.
  const programs = Object.values(mod).filter((v) => v && typeof v === 'object' && 'guide' in v)
  if (programs.length !== 1) return null
  return programs[0].guide ?? null
}

function pathToImportSpecifier(abs) {
  return new URL(`file://${abs}`).href
}

/* ------------------------------------------------------- the no-data gate -- */

function schoolsManifest() {
  return JSON.parse(readFileSync(resolve(REPO_ROOT, 'src/data/schools.json'), 'utf8'))
}

/**
 * The gate, most specific message first. A school with no Admissions research
 * area must STOP and explain — not degrade into a thin report. The area is what
 * carries the bands, steps, deadlines, assessments and contacts an episode
 * needs; without it there is nothing to say beyond generalities.
 */
function noDataGate(slug, manifest, eligible) {
  const known = manifest.schools
  const school = known.find((s) => s.slug === slug)

  if (!school) {
    console.error(`No school with slug "${slug}". Known slugs:`)
    console.error(`  ${known.map((s) => s.slug).join(', ')}`)
    process.exit(2)
  }

  if (!eligible.some((e) => e.slug === slug)) {
    console.error(
      `${school.name} has no Admissions research area, so there is not\n` +
        `enough data to build an admissions report or a podcast episode for it.\n\n` +
        `The Admissions area is what carries the entry bands, application steps, deadlines,\n` +
        `assessments and admissions-office contacts an episode needs. Without it there is\n` +
        `nothing to say beyond generalities.\n\n` +
        `Schools that DO have admissions data today:\n` +
        `  ${eligible.map((e) => e.slug).join(', ')}\n\n` +
        `To add it for this school, research the school's own admissions pages into\n` +
        `source-material/admissions/<slug>/ and build the card — see .claude/plans/admissions.md.`,
    )
    process.exit(2)
  }

  return school
}

/* --------------------------------------------------------------- overrides -- */

/**
 * The freshness check's corrections, keyed by a dot path into the guide:
 *
 *   { "bands.tkk.deadlines.0.value": {
 *       "value":  "Feb 5, 2027",
 *       "note":   "updated from the school's live calendar, checked 2026-09-06",
 *       "source": "https://www.providenceday.org/admissions" } }
 *
 * Band segments accept either the band KEY (`bands.tkk.…`) or its index
 * (`bands.0.…`), because a key is what a human writing the file by hand knows.
 *
 * The script stays fully runnable with NO overrides — offline, deterministic
 * and correct against the committed data — so it can be tested and re-run
 * without web access. The live-site fetching belongs to /admissions-episode.
 */
function applyOverrides(guide, overrides) {
  const notes = new Map() // dot path -> { note, source }
  for (const [path, spec] of Object.entries(overrides)) {
    const segments = path.split('.')
    let node = guide
    for (let i = 0; i < segments.length - 1; i++) {
      node = resolveSegment(node, segments[i], path)
    }
    const last = segments[segments.length - 1]
    if (node == null || !(last in node)) {
      die(`--overrides: "${path}" does not exist in this school's guide.`)
    }
    node[last] = spec.value
    notes.set(path, { note: spec.note, source: spec.source })
  }
  return notes
}

function resolveSegment(node, segment, path) {
  if (node == null) die(`--overrides: "${path}" walks through a missing value at "${segment}".`)
  if (Array.isArray(node)) {
    // A band may be addressed by key rather than index.
    const byKey = node.findIndex((x) => x && x.key === segment)
    if (byKey !== -1) return node[byKey]
    const idx = Number(segment)
    if (!Number.isInteger(idx) || idx < 0 || idx >= node.length) {
      die(`--overrides: "${path}" has no element "${segment}".`)
    }
    return node[idx]
  }
  if (!(segment in node)) die(`--overrides: "${path}" has no field "${segment}".`)
  return node[segment]
}

/* ------------------------------------------------------------ the glossary -- */

/**
 * The eleven terms the six schools' data names and NEVER defines. The data says
 * who administers a test and when it is due, never what it measures — Providence
 * Day names the WPPSI-IV four times without once saying what it is.
 *
 * The glossary ships INSIDE the PDF as source material, which is the only safe
 * resolution of a real tension: the prompt's central rule is "if the PDF does
 * not say it, it does not go in the episode", so simply telling NotebookLM to
 * "explain the terms" would license it to improvise from its own knowledge —
 * exactly the route by which a confident, wrong claim about a child's
 * assessment gets spoken aloud. Printed here, explaining a term is quoting the
 * source.
 *
 * MATCH ON WORD BOUNDARIES, NOT BARE SUBSTRINGS. `ERB` and `CTP` are
 * three-letter tokens that could match inside an unrelated word, and `Clarity`
 * is an ordinary English noun. A false positive is not cosmetic — it makes the
 * hosts explain a test the child will not sit.
 */
const GLOSSARY_TERMS = [
  'WPPSI',
  'WISC',
  'ISEE',
  'SSAT',
  'ERB',
  'CTP',
  'CAIS',
  'TOEFL',
  'SEVIS',
  'Clarity',
  'FACTS',
]

/**
 * Parse the committed glossary into `heading -> body markdown`, keyed by the
 * `### ` entries. Parsed rather than duplicated so the two cannot diverge: the
 * file is the researched, sourced artifact with its own provenance header.
 */
function parseGlossary() {
  if (!existsSync(GLOSSARY_PATH)) {
    die(`Glossary not found at\n  ${GLOSSARY_PATH}\nIt is the source of the PDF's §9.`)
  }
  const text = readFileSync(GLOSSARY_PATH, 'utf8')
  const entries = []
  const lines = text.split('\n')
  let current = null
  for (const line of lines) {
    const h3 = line.match(/^### (.+)$/)
    if (h3) {
      if (current) entries.push(current)
      current = { heading: h3[1].trim(), body: [] }
      continue
    }
    // A new ## section, or the `---` rule that separates them, ends the entry
    // that preceded it. Without the rule case a stray "---" renders into the
    // PDF as literal text at the end of the last entry in each section.
    if (/^## /.test(line) || /^-{3,}\s*$/.test(line)) {
      if (current) entries.push(current)
      current = null
      continue
    }
    if (current) current.body.push(line)
  }
  if (current) entries.push(current)
  return entries.map((e) => ({ heading: e.heading, body: e.body.join('\n').trim() }))
}

/**
 * Only the terms this school's data actually uses. Hickory Grove uses one
 * (FACTS), so its report carries one entry, not nine — a nine-entry appendix on
 * a school that uses one term invites the hosts to explain tests that school
 * does not use.
 */
function glossaryFor(guide) {
  const blob = JSON.stringify(guide)
  const used = GLOSSARY_TERMS.filter((t) => new RegExp(`\\b${t}\\b`).test(blob))
  const entries = parseGlossary()
  const picked = entries.filter((e) => used.some((t) => new RegExp(`\\b${t}\\b`).test(e.heading)))

  // The branded-portal entry covers Charger Commons / myCCS and similar. It has
  // no acronym to match on, so include it when the data names one of them.
  const portalEntry = entries.find((e) => /branded portals/i.test(e.heading))
  if (portalEntry && /\b(Charger Commons|myCCS)\b/.test(blob) && !picked.includes(portalEntry)) {
    picked.push(portalEntry)
  }
  return { used, entries: picked }
}

/**
 * Capitalised acronyms and platform-shaped tokens in this school's data that
 * have NO glossary entry. Reported, never fatal — the eleven terms cover what the
 * current six schools use, and a new school may use an instrument none of them
 * do (a different entrance exam, a different aid platform). Surfacing the gap
 * beats silently producing an unexplained term in the episode.
 *
 * TWO FILTERS, both there to keep the report READABLE. A checker parked at a
 * permanently non-zero count stops being read — this repo has hit that three
 * times — and this one is advisory, so noise is the whole risk.
 *
 *  1. ORDINARY WORDS SHOUTED. `kicker` fields are ALL-CAPS by convention
 *     ("CROSS-BAND", "CONTACTS"), and prose emphasises with capitals ("MUST",
 *     "NOTE"). An English word in caps is not jargon.
 *  2. KNOWN NON-JARGON. Ordinary abbreviations (IRS, IQ, PDF) and grade-band
 *     shorthand (TK, JK, PK) a listener does not need defined.
 *
 * What survives both is the real signal — measured across the six schools:
 * TOEFL, SEVIS, NCSEAA, SSS, SLEP, ESA, NAIS, EEC, IEE and TBI-New Oasis are
 * all genuinely used and genuinely undefined.
 */
const NOT_JARGON = new Set([
  ...GLOSSARY_TERMS,
  // Ordinary abbreviations and grade shorthand a parent does not need defined.
  'TK', 'JK', 'PK', 'IRS', 'IQ', 'AP', 'IB', 'NC', 'US', 'USA', 'PDF', 'FAQ', 'ID',
  'GPA', 'SAT', 'ACT', 'PSAT', 'ESL', 'IEP', 'SSN', 'EIN', 'PM', 'AM', 'ET', 'EST',
])

/** English words that appear in caps in kickers and emphasised prose. */
const SHOUTED_ENGLISH = new Set([
  'BAND', 'CROSS', 'MUST', 'NOTE', 'ALSO', 'ALL', 'AND', 'NOT', 'NEW', 'THE', 'FOR',
  'ONE', 'TWO', 'ANY', 'BUT', 'CONTACTS', 'SOURCES', 'RSVP', 'BEFORE', 'AFTER', 'ONLY',
  'EVERY', 'EARLY', 'NEVER', 'ALWAYS', 'CANNOT', 'PLEASE', 'FIRST',
])

function unknownJargon(guide) {
  const blob = JSON.stringify(guide)
  const hits = new Set()
  for (const m of blob.matchAll(/\b[A-Z]{2,7}(?:-[A-Za-z]+)?\b/g)) {
    const token = m[0].split('-')[0]
    if (NOT_JARGON.has(token) || SHOUTED_ENGLISH.has(token)) continue
    hits.add(m[0])
  }
  return [...hits].sort()
}

/* ------------------------------------------------------------------ render -- */

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * `**bold**` → `<strong>`, using the SAME split as the app's `Emphasized`
 * (src/components/AdmissionsProgram.tsx) so the two renderings cannot diverge.
 * Reimplemented rather than imported — that component is TSX and pulls in React.
 *
 * Call this ONLY on `steps[].detail`, `watchOuts[].text` and `aid.text`.
 * Everywhere else a literal `**` would be a data defect, not emphasis.
 */
function emph(text) {
  return String(text)
    .split(/(\*\*[^*]+\*\*)/g)
    .map((part) =>
      part.startsWith('**') && part.endsWith('**')
        ? `<strong>${esc(part.slice(2, -2))}</strong>`
        : esc(part),
    )
    .join('')
}

/** An override's provenance, printed inline beside the value it corrected. */
function noteFor(notes, path) {
  const n = notes.get(path)
  if (!n) return ''
  const src = n.source ? ` — ${esc(n.source)}` : ''
  return ` <span class="corr">(${esc(n.note ?? 'updated from the school’s live site')}${src})</span>`
}

function buildHtml({ school, guide, notes, glossary, generatedOn, unverified }) {
  const cycle = guide.cycle
  const startYear = entryStartYear(guide)
  // The plain-English gloss on the cycle label. The schools' own labels
  // disagree (see entryStartYear), so this is what actually answers "which
  // September would my child start?" — omitted entirely when undecidable.
  const startPhrase = startYear ? `for children starting in fall ${startYear}` : null
  const bandLabels = guide.bands.map((b) => b.label)

  const section = (n, title, body) =>
    `<section class="sec"><h2><span class="num">${n}</span>${esc(title)}</h2>${body}</section>`

  /* §1 — orientation, the figures, and how the process works */
  const stats = guide.stats
    .map((s) => `<li><b>${esc(s.value)}</b><span>${esc(s.label)}</span></li>`)
    .join('')
  const rules = guide.rules
    // rules[].text has NO markdown support — rendered raw in the app, so escaped
    // and never passed through emph() here.
    .map((r) => `<p><strong>${esc(r.title)}</strong> ${esc(r.text)}</p>`)
    .join('')
  const s1 = section(
    '1',
    'How admission to this school works',
    `<p class="lede">${esc(guide.headline)}</p>` +
      `<p class="cyclebar">All dates below are the <strong>${esc(cycle)}</strong>${
        startPhrase ? ` — <strong>${esc(startPhrase)}</strong>` : ''
      }.</p>` +
      `<h3>Key figures</h3><ul class="stats">${stats}</ul>` +
      `<h3>How this process works</h3>${rules}`,
  )

  /* §2 — the shared spine */
  const s2 = section(
    '2',
    'The shared spine, and the entry bands',
    `<p>${esc(guide.spineNote)}</p>` +
      `<p>This school runs <strong>${guide.bands.length} entry band${guide.bands.length === 1 ? '' : 's'}</strong>: ` +
      `${esc(readableList(bandLabels))}. A family follows only the band their child is entering.</p>`,
  )

  /* §3 — one sub-section per band */
  const bandBlocks = guide.bands
    .map((band, bi) => renderBand(band, bi, guide.bands.length, notes))
    .join('')
  const s3 = section('3', 'The entry bands, one at a time', bandBlocks)

  /* §4 — the aid clock */
  const s4 = section(
    '4',
    'The financial-aid clock, which runs in parallel',
    `<h3>${esc(guide.aid.title)}</h3><p>${emph(guide.aid.text)}</p>`,
  )

  /* §5 — cross-band comparison */
  const s5 = section(
    '5',
    guide.comparison.title,
    renderComparison(guide.comparison, guide.bands),
  )

  /* §6 — contacts */
  const people = guide.contacts.people
    .map((p) => `<li><b>${esc(p.name)}</b><span>${esc(p.detail)}</span></li>`)
    .join('')
  const s6 = section(
    '6',
    guide.contacts.title,
    `<p>${esc(guide.contacts.address)}</p><ul class="people">${people}</ul>`,
  )

  /* §7 — the checklist page's own panels + the disclaimer */
  const ck = guide.checklist
  const s7 = section(
    '7',
    'The printable checklist — supporting notes',
    `<p>${esc(ck.portalNote)}</p>` +
      `<h3>${esc(ck.aidPanel.kicker)}</h3><ul>${ck.aidPanel.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>` +
      `<h3>${esc(ck.contactPanel.kicker)}</h3><ul>${ck.contactPanel.lines.map((l) => `<li>${esc(l)}</li>`).join('')}</ul>` +
      `<h3>Important — please read this aloud in any summary of these dates</h3>` +
      `<p class="disclaimer">${esc(ck.disclaimer)}</p>` +
      (unverified
        ? `<p class="disclaimer">${esc(unverified)}</p>`
        : ''),
  )

  /* §8 — sources */
  const sources = guide.sources
    .map((s) => `<li>${esc(s.label)}${s.url ? `<br><span class="url">${esc(s.url)}</span>` : ''}</li>`)
    .join('')
  const s8 = section('8', 'Sources', `<ol class="sources">${sources}</ol>`)

  /* §9 — the jargon appendix, filtered to this school's terms */
  const s9 = section(
    '9',
    'What these terms mean',
    `<p>These are the tests, platforms and acronyms this school's own admissions process ` +
      `names. They are defined here because the school's pages use them without explaining ` +
      `them. Nothing here overrides a school's own published statement — where this school ` +
      `says which band sits which test, that is the fact.</p>` +
      glossary.entries.map((e) => renderGlossaryEntry(e)).join('') +
      `<h3>Using these definitions</h3>` +
      `<ul>` +
      `<li>Explain a term the first time it comes up, then use it normally.</li>` +
      `<li>Nothing here states how difficult a test is, or how to prepare for one — the ` +
      `cognitive assessments are not revisable.</li>` +
      `<li>Nothing here gives a score, a range or a cutoff. No school in this project ` +
      `publishes an admissions score threshold.</li>` +
      `<li>These terms sound clinical. They describe a normal, routine part of applying that ` +
      `the school does with every applicant.</li>` +
      `</ul>`,
  )

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>${esc(school.name)} — Admissions</title>
<style>${CSS}</style></head>
<body>
  <header class="cover">
    <p class="kicker">Charlotte School Insights — admissions research digest</p>
    <h1>${esc(school.name)}</h1>
    <p class="sub">How to apply — the published admissions process, ${esc(cycle)}${
      startPhrase ? `, ${esc(startPhrase)}` : ''
    }</p>
    <p class="meta">Compiled ${esc(generatedOn)} from ${esc(school.name)}'s own published
      admissions pages. Every page of this document is source material.</p>
  </header>
  ${s1}${s2}${s3}${s4}${s5}${s6}${s7}${s8}${s9}
</body></html>`
}

function renderBand(band, index, total, notes) {
  const p = `bands.${band.key}`
  const pi = `bands.${index}`

  const deadlines = band.deadlines
    .map((d, i) => {
      // The app does NOT render `unpublished`; this report does, deliberately —
      // NotebookLM would otherwise speak "4:00 p.m." as if it were a date.
      const marker = d.unpublished
        ? ` <span class="unpub">(time only — date on the school’s live calendar)</span>`
        : ''
      const note = noteFor(notes, `${p}.deadlines.${i}.value`) || noteFor(notes, `${pi}.deadlines.${i}.value`)
      return `<li><b>${esc(d.value)}</b>${marker}${note}<span>${esc(d.label)}</span></li>`
    })
    .join('')

  const steps = band.steps
    .map((s, i) => {
      const note = noteFor(notes, `${p}.steps.${i}.tag`) || noteFor(notes, `${pi}.steps.${i}.tag`)
      return (
        `<li><b>${esc(s.title)}</b> <span class="tag${s.tagKind === 'accent' ? ' accent' : ''}">` +
        `${esc(s.tag)}</span>${note}<p>${emph(s.detail)}</p></li>`
      )
    })
    .join('')

  // ZERO-ITEMS RULE: a band with no watch-outs emits no heading at all, rather
  // than an empty shell. Same for an absent checklist callout and sublabel.
  const watchOuts = band.watchOuts.length
    ? `<h4>Watch out for</h4><ul class="watch">${band.watchOuts
        .map((w) => `<li><b>${esc(w.kicker)}</b><p>${emph(w.text)}</p></li>`)
        .join('')}</ul>`
    : ''

  const callout = band.checklistCallout
    ? `<p class="callout"><b>${esc(band.checklistCallout.lead)}</b> ${esc(band.checklistCallout.text)}</p>`
    : ''

  const rows = band.checklistRows
    .map(
      (r) =>
        `<tr><td>${esc(r.action)}</td><td>${esc(r.detail)}</td><td class="due">${esc(r.due)}</td></tr>`,
    )
    .join('')

  return `<div class="band">
    <h3>Entry band ${index + 1} of ${total}: ${esc(band.label)}</h3>
    ${band.sublabel ? `<p class="sublabel">${esc(band.sublabel)}</p>` : ''}
    <p class="bandtitle">${esc(band.title)}</p>
    <h4>Deadlines</h4><ul class="tiles">${deadlines}</ul>
    <h4>The application steps, in order</h4><ol class="steps">${steps}</ol>
    ${watchOuts}
    <h4>The same band as a checklist to work through</h4>
    <p class="note">The same process as a tick-list. It splits some of the steps above into
      separate actions — it is the same application, not a second one.</p>
    ${callout}
    <table class="checklist"><thead><tr><th>Action</th><th>Detail</th><th>Due</th></tr></thead>
      <tbody>${rows}</tbody></table>
  </div>`
}

/**
 * A comparison row may carry per-band cells keyed by band key, OR a single
 * `{all: string}` that is identical in every band — which renders as one cell
 * spanning every column, not as a blank row. Every school has at least one.
 */
function renderComparison(comparison, bands) {
  const head = `<tr><th></th>${bands.map((b) => `<th>${esc(b.label)}</th>`).join('')}</tr>`
  const rows = comparison.rows
    .map((r) => {
      if ('all' in r.cells) {
        return `<tr><th>${esc(r.label)}</th><td class="all" colspan="${bands.length}">${esc(r.cells.all)}</td></tr>`
      }
      const cells = bands.map((b) => `<td>${esc(r.cells[b.key] ?? '—')}</td>`).join('')
      return `<tr><th>${esc(r.label)}</th>${cells}</tr>`
    })
    .join('')
  return `<table class="compare"><thead>${head}</thead><tbody>${rows}</tbody></table>`
}

/** Markdown → HTML for one glossary entry. Bold, paragraphs and list items only. */
function renderGlossaryEntry(entry) {
  const blocks = entry.body.split(/\n\s*\n/).filter((b) => b.trim())
  const body = blocks
    .map((block) => {
      const lines = block.split('\n').map((l) => l.trim())
      if (lines.every((l) => l.startsWith('- '))) {
        return `<ul>${lines.map((l) => `<li>${inline(l.slice(2))}</li>`).join('')}</ul>`
      }
      return `<p>${inline(lines.join(' '))}</p>`
    })
    .join('')
  return `<div class="gloss"><h3>${inline(entry.heading)}</h3>${body}</div>`
}

/** Inline markdown inside the glossary — `**bold**` only, everything else escaped. */
function inline(text) {
  return String(text)
    .split(/(\*\*[^*]+\*\*)/g)
    .map((part) =>
      part.startsWith('**') && part.endsWith('**')
        ? `<strong>${esc(part.slice(2, -2))}</strong>`
        : esc(part),
    )
    .join('')
}

function readableList(items) {
  if (items.length <= 1) return items.join('')
  if (items.length === 2) return `${items[0]} and ${items[1]}`
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`
}

const CSS = `
  @page { size: Letter; margin: 0.85in 0.8in 0.9in; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 10.8pt; line-height: 1.55; color: #1a1a1a; background: #fff;
  }
  h1 { font-size: 25pt; line-height: 1.15; margin: 0 0 6pt; }
  h2 {
    font-size: 15pt; margin: 26pt 0 8pt; padding-bottom: 4pt;
    border-bottom: 1.5pt solid #1a1a1a; page-break-after: avoid;
  }
  h3 { font-size: 12pt; margin: 16pt 0 5pt; page-break-after: avoid; }
  h4 { font-size: 10.5pt; margin: 13pt 0 4pt; text-transform: uppercase;
       letter-spacing: 0.06em; color: #444; page-break-after: avoid; }
  p { margin: 0 0 7pt; }
  .num { display: inline-block; min-width: 26pt; color: #666; }
  .cover { padding-bottom: 12pt; border-bottom: 3pt double #1a1a1a; }
  .kicker { text-transform: uppercase; letter-spacing: 0.1em; font-size: 8.5pt; color: #555; margin: 0 0 8pt; }
  .sub { font-size: 12pt; margin: 0 0 8pt; }
  .meta { font-size: 9pt; color: #555; margin: 0; }
  .lede { font-size: 11.5pt; }
  .cyclebar { padding: 5pt 8pt; border-left: 3pt solid #1a1a1a; background: #f4f4f2; }
  .sec { page-break-inside: auto; }
  ul, ol { margin: 0 0 8pt; padding-left: 18pt; }
  li { margin-bottom: 4pt; }
  .stats, .people, .tiles { list-style: none; padding-left: 0; }
  .stats li, .tiles li, .people li { margin-bottom: 6pt; }
  .stats b, .tiles b, .people b { display: inline; }
  .stats span, .tiles span, .people span { display: block; font-size: 9.5pt; color: #444; }
  .band { page-break-inside: auto; margin-bottom: 18pt; }
  .band h3 { border-top: 1pt solid #999; padding-top: 10pt; }
  .sublabel { font-size: 10pt; color: #444; font-style: italic; margin: 0 0 3pt; }
  .bandtitle { font-weight: bold; margin: 0 0 8pt; }
  .steps li { margin-bottom: 7pt; }
  .steps p, .watch p { margin: 2pt 0 0; }
  .tag { font-size: 8.5pt; padding: 0.5pt 4pt; border: 0.75pt solid #666; border-radius: 2pt; white-space: nowrap; }
  .tag.accent { background: #1a1a1a; color: #fff; border-color: #1a1a1a; }
  .watch { list-style: none; padding-left: 0; }
  .watch li { border-left: 2.5pt solid #999; padding-left: 8pt; margin-bottom: 7pt; }
  .unpub, .corr { font-size: 9pt; color: #444; font-style: italic; }
  .callout { padding: 5pt 8pt; background: #f4f4f2; }
  .note { font-size: 9.5pt; color: #444; }
  table { width: 100%; border-collapse: collapse; margin: 6pt 0 10pt; font-size: 9.5pt; }
  th, td { border: 0.75pt solid #999; padding: 4pt 5pt; text-align: left; vertical-align: top; }
  thead th { background: #ededea; }
  .checklist td:first-child { font-weight: bold; width: 30%; }
  .checklist .due { white-space: nowrap; width: 16%; }
  .compare th:first-child { width: 18%; }
  .compare .all { font-style: italic; }
  .sources li { margin-bottom: 6pt; }
  .url { font-family: 'Courier New', monospace; font-size: 8.5pt; word-break: break-all; color: #333; }
  .disclaimer { font-size: 9.5pt; background: #f4f4f2; padding: 6pt 8pt; }
  .gloss { margin-bottom: 12pt; page-break-inside: avoid; }
`

/* ------------------------------------------------------------- the prompt -- */

/**
 * The NotebookLM prompt. Written to the .txt and NOWHERE ELSE — it never enters
 * the PDF, so the two can never disagree about what NotebookLM is told.
 *
 * Every token is per-school. `{{BAND_COUNT}}` changes the episode's SHAPE, not
 * just its wording: segment 2 emits one band segment per band, so a Providence
 * Day episode has three and a Hickory Grove episode has five.
 */
function buildPrompt({ school, guide, generatedOn }) {
  const site = speakableSite(guide)
  const tokens = {
    SCHOOL_NAME: school.name,
    CYCLE: guide.cycle,
    START_PHRASE: (() => {
      const y = entryStartYear(guide)
      // No derivable year means the sentence is dropped from the prompt rather
      // than shipped with a hole or a guess in it.
      return y ? ` — a fall ${y} start` : ''
    })(),
    BAND_COUNT: String(guide.bands.length),
    BAND_LABELS: readableList(guide.bands.map((b) => b.label)),
    SCHOOL_SITE: site,
  }

  // The PDF is no longer self-documenting (the prompt is not in it), so the .txt
  // opens by naming the pair it belongs to.
  const header =
    `# NotebookLM prompt — ${school.name} admissions episode\n` +
    `# Entry cycle: ${guide.cycle}${
      entryStartYear(guide) ? ` (fall ${entryStartYear(guide)} start)` : ''
    }\n` +
    `# Generated: ${generatedOn}\n` +
    `# Pairs with: ${school.slug}-admissions-notebooklm.pdf\n` +
    `#\n` +
    `# Paste everything BELOW this header into NotebookLM's Audio Overview\n` +
    `# "Customize" box, with the PDF uploaded as the notebook's only source.\n\n`

  const body = PROMPT_TEMPLATE.replace(/\{\{([A-Z_]+)\}\}/g, (m, key) => {
    if (!(key in tokens)) die(`buildPrompt: unknown token ${m}`)
    return tokens[key]
  })

  // An unsubstituted placeholder would be read aloud verbatim by NotebookLM.
  if (/\{\{[A-Z_]+\}\}/.test(body)) {
    die(`buildPrompt: an unsubstituted placeholder survived: ${body.match(/\{\{[A-Z_]+\}\}/)[0]}`)
  }

  // ⛔ THE PROMPT MUST FIT NOTEBOOKLM'S "CUSTOMIZE" BOX, which truncates SILENTLY
  // and mid-word — the failure is invisible until an episode is generated from
  // half a brief. A 13.5k-char prompt shipped once and was cut at ~4,900,
  // losing every HARD RULE including the no-score and no-preparation-advice
  // safety rules, which sit at the END of the template.
  //
  // The budget is measured on the SUBSTITUTED body, because the tokens differ
  // per school: Charlotte Latin is the worst case today (longest school name
  // and 104 chars of band labels), so a template that fits it fits all six.
  // Checked here rather than in a separate checker so it cannot be skipped.
  if (body.length > PROMPT_CHAR_BUDGET) {
    die(
      `The prompt is ${body.length} characters, over the ${PROMPT_CHAR_BUDGET} budget for\n` +
        `NotebookLM's Audio Overview "Customize" box (~5,000, truncated silently).\n` +
        `Shorten PROMPT_TEMPLATE — do NOT raise the budget to make this pass, and do\n` +
        `not cut the HARD RULES, which carry the assessment safety constraints.`,
    )
  }
  return header + body
}

/**
 * Characters of prompt body NotebookLM's Audio Overview "Customize" box accepts.
 * Observed truncation at ~4,909 on a real paste; 4,900 is the practical ceiling
 * and this leaves a small margin for a future school with longer band labels.
 */
const PROMPT_CHAR_BUDGET = 4900

/**
 * The FALL a successful applicant actually starts — "fall 2027" — derived from
 * the deadlines rather than from `cycle`.
 *
 * ⛔ NEVER DERIVE THIS FROM THE CYCLE LABEL. The schools do not agree on what
 * that label means, and two of them contradict each other outright: Charlotte
 * Latin says "2026–27 entry cycle" and Charlotte Country Day says "2027–28",
 * while BOTH carry deadlines running Jan–Apr 2027 for the same fall 2027 start.
 * Each label is faithfully transcribed from that school's own site, so neither
 * is wrong — the house styles genuinely differ, and a parent hearing the raw
 * label cannot tell which September their child would begin.
 *
 * The deadlines do agree, so they are the evidence. A cycle's last application
 * or file-material deadline falls in the admissions season BEFORE the child
 * starts; a deadline in July or later already belongs to the following school
 * year (Hickory Grove's Nov 2026 dates are for fall 2027, not fall 2026).
 *
 * Returns null rather than guessing when no deadline parses — a school whose
 * every deadline is a fee, a time or a phrase ("Before day one") supports no
 * inference, and a WRONG start year in a spoken episode is worse than none.
 */
function entryStartYear(guide) {
  const MONTHS = { Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
                   Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12 }
  const dates = []
  for (const band of guide.bands) {
    for (const d of band.deadlines ?? []) {
      const m = /^([A-Z][a-z]{2}) \d{1,2}, (\d{4})$/.exec(String(d.value).trim())
      if (m) dates.push({ month: MONTHS[m[1]], year: Number(m[2]) })
    }
  }
  if (!dates.length) return null
  dates.sort((a, b) => a.year - b.year || a.month - b.month)
  const last = dates[dates.length - 1]
  // A deadline from July onward already sits in the school year it feeds.
  return last.month >= 7 ? last.year + 1 : last.year
}

/**
 * A SPEAKABLE domain, not a raw URL — the host of the FIRST source carrying a
 * URL, `www.` stripped.
 *
 * TWO REJECTED APPROACHES, so they are not retried. "Shortest URL" yields
 * k12.ncseaa.edu (the state grant agency), app.clarityapp.com (a financial-aid
 * vendor) and providenceday.myschoolapp.com (a portal subdomain) — four of six
 * wrong, each pointing a parent at a different organisation. And sources[0].url
 * verbatim is, for one school, a resource-manager address ending in a document
 * GUID: meaningless read aloud.
 *
 * Cross-checked against the source label, which is prefixed with the bare domain
 * by convention. If they disagree the source order has changed — stop rather
 * than speaking a domain that sends parents to the wrong organisation.
 */
function speakableSite(guide) {
  const first = guide.sources.find((x) => x.url)
  if (!first) die('This school has no source carrying a URL, so no site can be named aloud.')
  const host = new URL(first.url).host.replace(/^www\./, '')
  const claimed = (first.label.match(/^([a-z0-9.-]+\.[a-z]{2,})\s+—/i) || [])[1]
  if (!claimed || claimed.toLowerCase() !== host.toLowerCase()) {
    die(
      `The first source's host (${host}) disagrees with its label (${claimed ?? 'no domain prefix'}).\n` +
        `The first source is expected to be the school's own admissions page. Refusing to\n` +
        `name a domain that may send parents to the wrong organisation.\n` +
        `  label: ${first.label}\n  url:   ${first.url}`,
    )
  }
  return host
}

const PROMPT_TEMPLATE = `Produce an episode of "Charlotte Private School Conversations."

SOURCE: the attached PDF is the ONLY source — {{SCHOOL_NAME}}'s admissions process for the
{{CYCLE}}{{START_PHRASE}}. Add nothing from your own knowledge. Use every page, including
"What these terms mean", which defines the tests and platforms — that is how you explain
jargon without inventing.

PURPOSE: a practical HOW TO APPLY guide, not a review or a tour. Every segment answers a
do-this question: what to submit, by when, which test, which form, who to call. 15-20 min, two
hosts, warm and practical, for a parent anxious about missing a deadline. Open with "Welcome
back". If the PDF does not say it, it does not go in.

OPEN WITH TWO DISTINCT BEATS, in order — do not merge them or lead with the website.
  1. WELCOME (~15s): admission to {{SCHOOL_NAME}} — not in the abstract, but exactly how you
     apply: every step in order, with the deadline for each.
  2. TWO RESOURCES (~25s): www.charlotteschoolinsights.com puts this school's process in one
     place, filters to your child's entry grade and prints a checklist — a companion while you
     listen. Alongside it keep the school's own admissions pages open: the official source,
     updated when a date changes.

SEGMENTS, IN ORDER:
1. THE SHAPE OF IT (~2 min). Name the portal and say what it is — the school's own front door
   for applying, not a third-party service. Then the {{BAND_COUNT}} entry bands:
   {{BAND_LABELS}}. A parent follows only their own band — say how to identify theirs, and
   cover the shared spine.
2. EACH BAND ({{BAND_COUNT}} segments, ~2-3 min each), in the PDF's order: who it is for; the
   steps as a parent would do them; each deadline as a full spoken date; the assessment BY
   NAME AND THEN EXPLAINED — what it is and what it looks at; which forms go where and who
   sends them; any watch-outs. Name the band at the start and end so a parent can skip to
   theirs, then the cross-band table: what changes and what stays identical.
3. THE MONEY CLOCK (~1-2 min). The aid process and its own deadline as the PDF states it — a
   parallel track with a different date; where the PDF says so, applying for aid does not
   affect the decision. Name the platform and say what it is for.
4. WHO TO CONTACT (~1-2 min). The office, address, number and the people the PDF names with
   their roles; note a Spanish-speaking contact if named. Encourage calling early, then name
   the school's own site as authoritative, saying "{{SCHOOL_SITE}}" aloud.
5. WHAT IS NOT PUBLISHED (~1 min). Where the PDF says "not published" or "confirm with
   admissions", say so: the school does not publish it, so call and ask.

CLOSE (~35s): recap the two or three dates that matter most, then: if it helps to have it in
one place, www.charlotteschoolinsights.com shows just your track and prints a checklist — but
check the school's own admissions page before acting, because that is the official source and
these dates shift year to year. Then three things this week: send the inquiry form, calendar
the deadlines, call the office about anything unclear.

HARD RULES:
- Label every date as the {{CYCLE}}, and say plainly in the open and once more later that
  this cycle is{{START_PHRASE}} for the child — the label alone does not tell a parent which
  September their child begins. Three times — open, body, close, varied wording —
  say cycle dates shift year to year and parents must verify against the school's own live
  calendar before acting.
- Speak dates in full ("January the fifteenth, twenty twenty-seven"), never as digits.
- Never invent a date, fee, test, form or person, and never attribute a claim to the PDF it
  does not make. If the PDF says something is not published, say so.
- Explain each term the first time it is spoken, in one or two plain sentences from the
  PDF's appendix only.
- NEVER give an assessment's difficulty, preparation advice (these are not revisable, and
  implying otherwise pushes a parent to coach a small child), any score, cutoff or "good"
  result, or a claim one school's testing is harder than another's.
- Keep the register calm — "intelligence scale" and "screening" sound clinical and can alarm a
  parent. This is routine, every applicant does it, and for the youngest bands a conversation,
  not an exam.
- Read no URL aloud except {{SCHOOL_SITE}}.
- Do not compare or rank this school, or cover academics, sports, arts or outcomes.
- Mention www.charlotteschoolinsights.com exactly twice — opening beat and close, never in
  between. Each time say what it DOES (filters to their grade, prints a checklist), call it a
  helpful resource and NEVER the source of the facts, and name the school's own admissions site
  in the same breath as the authority.
`

/* ---------------------------------------------------------------- assertions -- */

/**
 * Raw `**` reaching generated output has shipped in this repo before (103 of
 * 674 card teasers rendered unparsed markdown). Turn a silent cosmetic leak
 * into a hard failure.
 */
function assertNoRawMarkdown(html) {
  if (html.includes('**')) {
    const at = html.indexOf('**')
    die(
      `Raw "**" survived into the rendered HTML — markdown leaked instead of\n` +
        `becoming <strong>. Context:\n  …${html.slice(Math.max(0, at - 90), at + 90)}…`,
    )
  }
}

/**
 * The PDF must carry NO instruction to NotebookLM. Asserted, not eyeballed:
 * a distinctive phrase from the prompt appearing in the document means the
 * separation rule has been broken by a later edit.
 */
function assertNoPromptLeak(html) {
  for (const phrase of ['EPISODE PURPOSE', 'HARD RULES:', 'Audio Overview', INSIGHTS_SITE]) {
    if (html.includes(phrase)) {
      die(
        `The PDF contains prompt text ("${phrase}"). The PDF is source material ONLY —\n` +
          `anything addressed to NotebookLM belongs in the .txt and nowhere else.`,
      )
    }
  }
}

/* --------------------------------------------------------------------- main -- */

if (!SCHOOL) {
  const eligible = await eligibleSchools()
  console.error('Usage: node scripts/gen_admissions_report.mjs --school <slug> [--out <dir>]')
  console.error('                                              [--overrides <file.json>] [--quiet]\n')
  console.error('Schools with an Admissions research area today:')
  for (const e of eligible) {
    console.error(`  ${e.slug.padEnd(26)} ${e.guide.bands.length} bands · ${e.guide.cycle}`)
  }
  process.exit(2)
}

const manifest = schoolsManifest()
const eligible = await eligibleSchools()
const school = noDataGate(SCHOOL, manifest, eligible)
const guide = eligible.find((e) => e.slug === SCHOOL).guide

let overrides = {}
if (OVERRIDES_PATH) {
  const p = resolve(REPO_ROOT, OVERRIDES_PATH)
  if (!existsSync(p)) die(`--overrides file not found: ${p}`)
  try {
    overrides = JSON.parse(readFileSync(p, 'utf8'))
  } catch (err) {
    die(`--overrides is not valid JSON: ${err.message}`)
  }
}
const notes = applyOverrides(guide, overrides)

const generatedOn = new Date().toISOString().slice(0, 10)
const glossary = glossaryFor(guide)
const unknown = unknownJargon(guide)

const html = buildHtml({
  school,
  guide,
  notes,
  glossary,
  generatedOn,
  unverified: value('--unverified-note'),
})
assertNoRawMarkdown(html)
assertNoPromptLeak(html)

const prompt = buildPrompt({ school, guide, generatedOn })

mkdirSync(OUT_DIR, { recursive: true })
const pdfPath = join(OUT_DIR, `${SCHOOL}-admissions-notebooklm.pdf`)
const txtPath = join(OUT_DIR, `${SCHOOL}-notebooklm-prompt.txt`)

// page.pdf() requires HEADLESS Chromium — it throws in headed mode.
const browser = await chromium.launch()
try {
  const page = await browser.newPage()
  // 'load', never 'networkidle' — a known trap in this repo. The HTML is fully
  // self-contained with no network requests, so 'load' fires immediately.
  await page.setContent(html, { waitUntil: 'load' })
  await page.pdf({
    path: pdfPath,
    format: 'Letter',
    printBackground: true,
    margin: { top: '0.85in', bottom: '0.9in', left: '0.8in', right: '0.8in' },
    displayHeaderFooter: true,
    headerTemplate: `<div style="font-family:Georgia,serif;font-size:7.5pt;color:#666;width:100%;padding:0 0.8in;display:flex;justify-content:space-between;">
      <span>${esc(school.name)} — Admissions</span><span>${esc(guide.cycle)}</span></div>`,
    footerTemplate: `<div style="font-family:Georgia,serif;font-size:7.5pt;color:#666;width:100%;padding:0 0.8in;text-align:center;">
      Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>`,
  })
} finally {
  await browser.close()
}

writeFileSync(txtPath, prompt, 'utf8')

if (!QUIET) {
  const kb = (p) => `${(readFileSync(p).length / 1024).toFixed(0)} KB`
  say(`report:admissions: ${school.name} — ${guide.bands.length} bands, ${guide.cycle}`)
  say(`  ${pdfPath}  (${kb(pdfPath)})`)
  say(`  ${txtPath}  (${kb(txtPath)})`)
  say(`  glossary §9: ${glossary.entries.length} entr${glossary.entries.length === 1 ? 'y' : 'ies'} — ${glossary.used.join(', ') || 'none'}`)
  if (notes.size) say(`  overrides applied: ${notes.size}`)
  if (unknown.length) {
    say(`  NOTE — jargon with no glossary entry: ${unknown.join(', ')}`)
    say(`         Add it to the shared glossary, or the episode explains nothing about it.`)
  }
}
