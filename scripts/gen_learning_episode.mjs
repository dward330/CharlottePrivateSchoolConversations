#!/usr/bin/env node
/**
 * Render one school's Learning Support & Student Services area into a
 * NotebookLM source PDF, plus the prompt that turns it into an episode of
 * *Charlotte Private School Conversations*.
 *
 *   node scripts/gen_learning_episode.mjs --school charlotte-country-day \
 *     --overrides <file.json> [--notes <file.txt>] [--skeleton <file.json>]
 *   npm run report:learning -- --school charlotte-country-day ...
 *
 * Writes two files to reports/learning-support/ (gitignored):
 *
 *   <School> - Learning Support - NotebookLM Source.pdf
 *   <School> - Learning Support - NotebookLM Prompt.txt
 *
 * Driven by .claude/skills/learning-support-episode/SKILL.md.
 *
 * ⛔ THE EPISODE ORDER IS NOT THE CARD ORDER. The six cards are built for a
 * reader who scans; a listener cannot skip, so the PDF follows a parent's
 * questions: big picture → can they serve my child → how a need gets noticed
 * → day-to-day support → therapy → wellness & health → the team → what the
 * school's pages do not say. Testing comes BEFORE services (a need is
 * identified before it is supported), and the services card's Wellness &
 * health group is split out into its own segment. User decision 2026-10-25.
 *
 * ⛔ WHAT THE HOSTS MUST NOT SAY IS KEPT OUT OF THE PDF, not just banned in the
 * prompt. User decisions 2026-10-25: no person is named (staff, therapists or
 * students), no fee amount is spoken (only whether a service costs extra), and
 * the Ask the School questions are dropped. A prompt rule loses to source
 * text pulling the other way, the lesson of every episode so far, so:
 *   - `staff.people` and `therapy.people` render as ROLES, counted, never names
 *   - the `ask` card never renders
 *   - every other string carrying a dollar figure, an email address or a
 *     staffer's name must be REWRITTEN for audio in the overrides file before
 *     anything is written. The script fails closed (exit 3) and lists them;
 *     `--skeleton` writes a starter overrides file to edit.
 *   - the finished HTML is scanned again for all three before rendering
 * Provider COMPANIES (TerrificTalkers) are not people and may be named.
 *
 * ⛔ ENTRANCE TESTING NEVER RENDERS. Segment 3 is about how a learning need is
 * identified, never admission (user rule, 2026-10-25), and an ISEE row in the
 * PDF is exactly the source text that would pull the hosts off-topic.
 *
 * ⛔ THE PROMPT IS NEVER IN THE PDF, and every segment in it is decided HERE
 * from which cards exist. A conditional in the prompt ("if the school has a
 * therapy card") is the part NotebookLM drops; see
 * memory notebooklm-prompt-conditionals-get-dropped.
 *
 * The per-school modules import cleanly under Node (type-only imports); the
 * registry src/data/learningSupport.ts does NOT (import.meta.glob), so the
 * school files are read directly, as gen_admissions_report.mjs does.
 *
 * Exit codes: 0 = both files written · 2 = bad arguments / no such school ·
 * 3 = strings need an audio rewrite (nothing written).
 */
import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { resolve, join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const PROGRAMS_DIR = join(REPO_ROOT, 'src/data/learningSupport')
const OUT_DIR = join(REPO_ROOT, 'reports/learning-support')

/** NotebookLM's Customize box truncates silently at ~4,909. Never raise it. */
const PROMPT_CHAR_BUDGET = 4900

const args = process.argv.slice(2)
const value = (flag) => {
  const i = args.indexOf(flag)
  return i >= 0 ? args[i + 1] : undefined
}
const say = (s) => process.stdout.write(s + '\n')
function die(msg, code = 2) {
  process.stderr.write(msg + '\n')
  process.exit(code)
}

/* ------------------------------------------------------------ the roster -- */

async function eligibleSchools() {
  const out = []
  for (const file of readdirSync(PROGRAMS_DIR).sort()) {
    if (!file.endsWith('.ts')) continue
    const slug = file.slice(0, -3)
    const mod = await import(new URL(`file://${join(PROGRAMS_DIR, file)}`).href)
    const programs = Object.values(mod).filter((v) => v && typeof v === 'object' && 'lead' in v && 'colors' in v)
    if (programs.length === 1) out.push({ slug, program: programs[0] })
  }
  return out
}

const manifest = JSON.parse(readFileSync(join(REPO_ROOT, 'src/data/schools.json'), 'utf8'))
const eligible = await eligibleSchools()
const SCHOOL = value('--school')

if (!SCHOOL) {
  say('Schools with a Learning Support area:')
  for (const { slug } of eligible) {
    const name = manifest.schools.find((s) => s.slug === slug)?.name ?? slug
    say(`  ${slug.padEnd(28)} ${name}`)
  }
  say('\nRun with --school <slug>.')
  process.exit(2)
}
const school = manifest.schools.find((s) => s.slug === SCHOOL)
const entry = eligible.find((e) => e.slug === SCHOOL)
if (!school) die(`No school "${SCHOOL}" in src/data/schools.json.`)
if (!entry) {
  die(
    `${school.name} has no Learning Support area (no src/data/learningSupport/${SCHOOL}.ts).\n` +
      `Build it first with /learning-support. Nothing was written.`,
  )
}

/** "Charlotte Country Day School" → "Charlotte Country Day", for spoken attribution. */
const SHORT = school.name.replace(/\s+School$/, '')

/* ------------------------------------------------------------- overrides -- */

const program = structuredClone(entry.program)
const DELETE = Symbol('delete')
const freshness = [] // { path, note, source } — live-site corrections, listed in the PDF

const OVERRIDES_PATH = value('--overrides')
if (OVERRIDES_PATH) {
  const p = resolve(REPO_ROOT, OVERRIDES_PATH)
  if (!existsSync(p)) die(`--overrides file not found: ${p}`)
  let overrides
  try {
    overrides = JSON.parse(readFileSync(p, 'utf8'))
  } catch (err) {
    die(`--overrides is not valid JSON: ${err.message}`)
  }
  for (const [path, raw] of Object.entries(overrides)) {
    const isObj = raw !== null && typeof raw === 'object'
    const next = isObj ? raw.value : raw
    setPath(program, path, next === null ? DELETE : next)
    if (isObj && raw.source) freshness.push({ path, note: raw.note ?? '', source: raw.source })
  }
  prune(program)
}

function setPath(obj, path, val) {
  const keys = path.split('.')
  let node = obj
  for (const k of keys.slice(0, -1)) {
    if (node?.[k] === undefined) die(`Override path not found: ${path}`)
    node = node[k]
  }
  const last = keys.at(-1)
  if (!(last in node)) die(`Override path not found: ${path}`)
  node[last] = val
}

/** Remove every DELETE marker: array items are spliced out, object keys deleted. */
function prune(node) {
  if (Array.isArray(node)) {
    for (let i = node.length - 1; i >= 0; i--) {
      if (node[i] === DELETE) node.splice(i, 1)
      else prune(node[i])
    }
  } else if (node && typeof node === 'object') {
    for (const k of Object.keys(node)) {
      if (node[k] === DELETE) delete node[k]
      else prune(node[k])
    }
  }
}

/* ----------------------------------------------- the unspeakable-string gate -- */

// Names come from the ORIGINAL data, so a rewrite cannot hide one by deleting
// the people list first.
const people = [...(entry.program.staff?.people ?? []), ...(entry.program.therapy?.people ?? [])]
const nameTokens = new Set()
for (const { name } of people) {
  const bare = name.replace(/^(Dr|Mr|Mrs|Ms|Mx)\.?\s+/, '').trim()
  nameTokens.add(bare)
  const surname = bare.split(/\s+/).at(-1)
  if (surname && surname.length >= 3) nameTokens.add(surname)
}
const NAME_RE = nameTokens.size
  ? new RegExp(`\\b(${[...nameTokens].map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`)
  : null
const MONEY_RE = /\$\s?\d|\b\d[\d,.]*\s?(dollars|USD)\b/
const EMAIL_RE = /[\w.+-]+@[\w-]+\.[\w.]+/
// A ten-digit number in any punctuation, or a text short code ("text HOME to 741741").
const PHONE_RE = /\(?\b\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}\b|\b\d{5,6}\b/

function problemsIn(text) {
  const out = []
  if (MONEY_RE.test(text)) out.push('fee amount')
  if (EMAIL_RE.test(text)) out.push('email address')
  if (PHONE_RE.test(text)) out.push('phone number')
  const m = NAME_RE && text.match(NAME_RE)
  if (m) out.push(`name "${m[1]}"`)
  return out
}

/** Every rendered string, except the fields this script renders as roles or drops. */
function scan(node, path, found) {
  if (typeof node === 'string') {
    const why = problemsIn(node)
    if (why.length) found.push({ path, text: node, why })
  } else if (Array.isArray(node)) {
    node.forEach((v, i) => scan(v, `${path}.${i}`, found))
  } else if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) {
      const p = path ? `${path}.${k}` : k
      if (['colors', 'sources', 'ask'].includes(k)) continue
      if (p === 'staff.people' || p === 'therapy.people') continue
      if (isEntranceRow(v)) continue
      scan(v, p, found)
    }
  }
  return found
}

function isEntranceRow(v) {
  return v && typeof v === 'object' && typeof v.service === 'string' && /entrance/i.test(v.service)
}

const problems = scan(program, '', [])
if (problems.length) {
  const SKELETON = value('--skeleton')
  if (SKELETON) {
    const stub = Object.fromEntries(problems.map((p) => [p.path, p.text]))
    writeFileSync(resolve(REPO_ROOT, SKELETON), JSON.stringify(stub, null, 2) + '\n', 'utf8')
  }
  process.stderr.write(
    `${problems.length} string(s) carry something the hosts must not say. Rewrite each for audio\n` +
      `in the --overrides file (a string replaces it, null drops it). Nothing was written.\n\n`,
  )
  for (const p of problems) process.stderr.write(`  ${p.path}  [${p.why.join(', ')}]\n    ${p.text}\n`)
  if (SKELETON) process.stderr.write(`\nStarter overrides written to ${SKELETON}; every value still needs rewriting.\n`)
  process.exit(3)
}

/* ------------------------------------------------------------------ HTML -- */

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])

const en = JSON.parse(readFileSync(join(REPO_ROOT, 'src/locales/en.json'), 'utf8'))
const GLOSSARY = en.learning?.glossary ?? {}
const glossaryUsed = new Set()

/** `[[504|Section 504 Plan]]` → its label; the definition goes in the glossary section. */
function prose(s) {
  return esc(s).replace(/\[\[(\w+)\|([^\]]+)\]\]/g, (_, key, label) => {
    glossaryUsed.add(key)
    return label
  })
}

// Codes, spoken plainly. IH_FEE is the one place "costs extra" is said.
const CODE = {
  IH: 'Offered by the school',
  IH_FEE: 'Offered by the school, at an extra cost',
  RF: 'Through an outside provider',
  REQUIRED: 'Required',
}
const NEED = {
  read: 'Reading',
  attn: 'Attention and executive function',
  math: 'Math',
  speech: 'Speech and language',
  motor: 'Motor skills',
  social: 'Social and emotional',
  gifted: 'Advanced learners',
}

const groups = program.services?.groups ?? []
const rowsOf = (re) => groups.filter((g) => re.test(g.name)).flatMap((g) => g.rows)
const shown = (rows) => rows.filter((r) => r.code !== 'NS' && r.code !== 'EXCLUDED' && !isEntranceRow(r))
const gaps = []

function serviceTable(rows) {
  if (!rows.length) return ''
  return (
    `<table><tr><th style="width:26%">Service</th><th style="width:22%">How it is provided</th><th>What the school says</th></tr>` +
    rows
      .map((r) => `<tr><td><strong>${prose(r.service)}</strong></td><td>${CODE[r.code] ?? r.code}</td><td>${prose(r.detail)}</td></tr>`)
      .join('') +
    `</table>`
  )
}

/** Roles counted, never names: "Learning Specialist, Lower School — 9". */
function roleList(list) {
  const counts = new Map()
  for (const { role } of list) counts.set(role, (counts.get(role) ?? 0) + 1)
  return (
    '<ul>' +
    [...counts].map(([role, n]) => `<li>${prose(role)}${n > 1 ? ` — ${n} people` : ''}</li>`).join('') +
    '</ul>'
  )
}

const sections = []
let n = 0
const section = (title, body) => body && sections.push(`<h2>${++n}. ${esc(title)}</h2>\n${body}`)

// 1 — the big picture
{
  let body = program.lead.muted ? `<p>${prose(program.lead.muted)}</p>` : ''
  if (program.stats?.length) {
    body +=
      `<table><tr><th style="width:18%">Figure</th><th>What it means</th></tr>` +
      program.stats
        .map((s) => `<tr><td><strong>${prose(s.value)}</strong></td><td>${prose(s.label)}${s.note ? ` — ${prose(s.note)}` : ''}</td></tr>`)
        .join('') +
      `</table>`
  }
  section('The program at a glance', body)
}

// 2 — can they serve my child?
if (program.eligibility) {
  const e = program.eligibility
  section(
    'Can the school serve my child?',
    `<p><strong>${prose(e.headline)}</strong></p>` +
      (e.intro ? `<p>${prose(e.intro.strong)}${e.intro.muted ? ' ' + prose(e.intro.muted) : ''}</p>` : '') +
      `<h3>Who is eligible</h3><p>${prose(e.eligible)}</p>` +
      `<h3>Arriving with a plan from another school</h3><p>${prose(e.plan)}</p>` +
      `<h3>What is outside the program's scope</h3><p>${prose(e.scope)}</p>` +
      (e.note ? `<p class="note">${prose(e.note)}</p>` : ''),
  )
}

// 3 — how a need gets noticed (identification, never admission)
{
  let body = ''
  if (program.testing) {
    const t = program.testing
    body = `<p><strong>${prose(t.headline)}</strong></p>`
    for (const x of t.entries) {
      if (x.code === 'NS') {
        gaps.push({ what: x.title, detail: x.text })
        continue
      }
      body += `<h3>${prose(x.title)}</h3><p><em>${CODE[x.code] ?? x.code}.</em> ${prose(x.text)}</p>`
      if (x.muted) body += `<p>${prose(x.muted)}</p>`
    }
  } else {
    body = serviceTable(shown(rowsOf(/assessment/i)))
  }
  section('How a learning need gets noticed', body)
}

// 4 — what support looks like, day to day
{
  const rows = [...rowsOf(/learning|academic/i), ...rowsOf(/language/i)]
  let body = program.services ? `<p><strong>${prose(program.services.headline.replace(/\s*Pick your child[’']s need[^.]*\.?$/, ''))}</strong></p>` : ''
  body += serviceTable(shown(rows))
  const verdicts = Object.entries(program.services?.verdicts ?? {})
  if (verdicts.length) {
    body +=
      `<h3>By need</h3><p>What the school's pages describe for each kind of need.</p>` +
      verdicts.map(([k, v]) => `<p><strong>${NEED[k] ?? k}.</strong> ${prose(v.head)} ${prose(v.body)}</p>`).join('')
  }
  section('What support looks like, day to day', body)
}

// 5 — therapy
if (program.therapy) {
  const t = program.therapy
  let body = `<p><strong>${prose(t.headline)}</strong></p><ul>`
  for (const item of t.items) {
    if (item.code === 'NS') {
      gaps.push({ what: `${item.name} therapy`, detail: 'Not listed by the school.' })
      continue
    }
    body += `<li><strong>${prose(item.name)}:</strong> ${CODE[item.code] ?? item.code}.${item.detail ? ' ' + prose(item.detail) : ''}</li>`
  }
  body += '</ul>'
  if (t.people?.length) body += `<p>On the school's staff for these services:</p>${roleList(t.people)}`
  if (t.note) body += `<p>${prose(t.note)}</p>`
  section('Therapy and related services', body)
} else {
  section('Therapy and related services', serviceTable(shown(rowsOf(/therapy/i))))
}

// 6 — wellness & health
section('Wellness and health', serviceTable(shown(rowsOf(/wellness|health/i))))

// 7 — the team
if (program.staff) {
  const s = program.staff
  section(
    'The team',
    `<p><strong>${prose(s.headline)}</strong></p>${roleList(s.people)}` +
      (s.note ? `<p>${prose(s.note.strong)}${s.note.muted ? ' ' + prose(s.note.muted) : ''}</p>` : '') +
      // Never charlotteschoolinsights.com here: the podcast standard forbids
      // naming the site as a source of facts, and the prompt names it twice.
      `<p>Names and contact details are in the school's own staff directory.</p>`,
  )
}

// 8 — what the school's pages do not say
for (const g of groups) {
  for (const r of g.rows) {
    if (r.code !== 'NS') continue
    // Therapy rows duplicate the therapy card's items when that card exists.
    if (program.therapy && /therapy/i.test(g.name)) continue
    gaps.push({ what: r.service, detail: r.detail })
  }
}
if (gaps.length) {
  section(
    "What the school's pages do not say",
    `<p>The school's pages do not describe the services below. That is different from saying the school does not offer them; it means the question is one to ask the school.</p><ul>` +
      gaps.map((g) => `<li><strong>${prose(g.what)}:</strong> ${prose(g.detail)}</li>`).join('') +
      `</ul>`,
  )
}

// glossary — only the terms the text used
if (glossaryUsed.size) {
  section(
    'Terms used',
    '<ul>' +
      [...glossaryUsed]
        .filter((k) => GLOSSARY[k])
        .map((k) => `<li><strong>${k === 'iep' ? 'IEP' : k === 'idea' ? 'IDEA' : 'Section 504 plan'}:</strong> ${esc(GLOSSARY[k])}</li>`)
        .join('') +
      '</ul>',
  )
}

const bodyHtml = sections.join('\n\n')

// Belt and braces: the whole body, after rendering, carries none of the three.
const leaked = problemsIn(bodyHtml.replace(/<[^>]+>/g, ' '))
if (leaked.length) die(`Rendered PDF text still carries: ${leaked.join(', ')}. This is a bug in the generator.`)

const sourceList = []
const seen = new Set()
for (const card of ['eligibility', 'services', 'therapy', 'testing', 'staff']) {
  for (const s of program[card]?.sources ?? []) {
    if (seen.has(s.url)) continue
    seen.add(s.url)
    sourceList.push(s)
  }
}
const asOf = entry.program.ask?.asOf
const generatedOn = new Date().toISOString().slice(0, 10)

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>${esc(school.name)} — Learning Support &amp; Student Services</title>
<style>
  body { font-family: Georgia, "Times New Roman", serif; font-size: 11pt; line-height: 1.5; color: #1a1a1a; }
  h1 { font-size: 24pt; margin: 0 0 4pt; line-height: 1.2; }
  h2 { font-size: 15pt; margin: 22pt 0 6pt; padding-bottom: 3pt; border-bottom: 1.5pt solid #1f3a5f; color: #1f3a5f; page-break-after: avoid; }
  h3 { font-size: 12pt; margin: 14pt 0 4pt; page-break-after: avoid; }
  p { margin: 0 0 8pt; }
  ul { margin: 0 0 8pt; padding-left: 20pt; }
  li { margin-bottom: 3pt; }
  table { width: 100%; border-collapse: collapse; margin: 4pt 0 10pt; font-size: 10pt; }
  th, td { border: 0.75pt solid #b8c2cc; padding: 4pt 6pt; text-align: left; vertical-align: top; }
  th { background: #e9eef4; }
  tr { page-break-inside: avoid; }
  .sub { font-size: 12pt; color: #444; margin-bottom: 14pt; }
  .meta { font-size: 10pt; color: #444; border: 0.75pt solid #b8c2cc; padding: 8pt 10pt; margin: 10pt 0 16pt; background: #f6f8fa; }
  .note { font-size: 10pt; color: #333; background: #f6f8fa; border-left: 3pt solid #1f3a5f; padding: 6pt 10pt; }
  .src { font-size: 9pt; color: #555; word-break: break-all; }
</style></head><body>
<h1>${esc(school.name)} — Learning Support &amp; Student Services</h1>
<div class="sub">${prose(program.lead.strong)}</div>
<div class="meta">
<strong>About this research.</strong> It covers one school, ${esc(school.name)}, and one research area: how the school supports students who learn differently, and the counseling and health services around them.<br>
<strong>Where the facts come from.</strong> Only ${esc(SHORT)}'s own website and the documents it links. No third-party listing is used.<br>
<strong>As of.</strong> ${esc(asOf ?? generatedOn)}. Services, staffing and fees change; the school's own website is the authority.
</div>

${bodyHtml}

${
  freshness.length
    ? `<h2>Checked against the school's live site</h2><ul>${freshness
        .map((f) => `<li>${esc(f.note)} <span class="src">${esc(f.source)}</span></li>`)
        .join('')}</ul>`
    : ''
}

<h2>Pages consulted</h2>
<ul>${sourceList.map((s) => `<li>${esc(s.label)}<br><span class="src">${esc(s.url)}</span></li>`).join('')}</ul>

<p class="note">We've reported only what ${esc(SHORT)} publishes and what our research surfaced; where something isn't published, that's a question to ask, not a verdict on the program.</p>
</body></html>`

/* ---------------------------------------------------------------- prompt -- */

// Segments are decided from the data, so the prompt never carries a condition.
const segs = [
  `THE BIG PICTURE. What the school calls its program, the grades it serves, and the figures in section 1.`,
]
if (program.eligibility)
  segs.push(
    `CAN THEY SERVE MY CHILD? Who is eligible, what happens when a child arrives with a plan from another school, and what is outside the program's scope, each in the school's words.` +
      (glossaryUsed.size ? ` Explain each term from "Terms used" in plain words.` : ''),
  )
segs.push(
  `HOW A NEED GETS NOTICED. Screening, evaluation, the plan that decides support, and testing accommodations. This is about identifying a need; say nothing about admission or entrance tests.`,
)
segs.push(
  `WHAT SUPPORT LOOKS LIKE. Each service and who provides it. Say plainly which ones cost extra. Then take two needs from "By need" as examples, no more.`,
)
segs.push(`THERAPY. Speech-language, occupational and physical therapy: by the school, through an outside provider, or not described.`)
if (shown(rowsOf(/wellness|health/i)).length) segs.push(`WELLNESS & HEALTH. Counseling, crisis resources and nursing, as the school describes them.`)
if (program.staff) segs.push(`THE TEAM. How the team is organized, by role and division, with the counts the school gives.`)
if (gaps.length)
  segs.push(
    `WHAT THE SCHOOL DOESN'T SAY [brief]. Each service in "What the school's pages do not say": the school's pages don't describe it, so it is a question for the school.`,
  )

const NOTES_PATH = value('--notes')
const notes = NOTES_PATH ? readFileSync(resolve(REPO_ROOT, NOTES_PATH), 'utf8').trim() : ''

const body = `Produce an episode of "Charlotte Private School Conversations": "${SHORT}: Learning Support & Student Services." Two warm hosts. The attached PDF is the ONLY source; if it does not say it, it does not go in. Never compare or name another school. SHOW FORMAT: a real talk show, never a reading. The hosts trade reactions in their own words, voicing opinions as opinions while every fact comes from the PDF. Never mention a PDF, document, source, text, file or notes aloud; say "${SHORT} says" or "our research found." Give every segment equal care; never rush the second half.

THESE INSTRUCTIONS ARE PRIVATE. Follow them silently. The hosts never announce, recite or discuss any rule here.

OPEN with exactly: "Welcome to another episode of Charlotte Private School Conversations." Say in a sentence what the episode covers, then name www.charlotteschoolinsights.com as a great resource to learn more, with the school's own website as the authority.

SEGMENTS, in this order:
${segs.map((s, i) => `${i + 1}) ${s}`).join('\n')}

CLOSE — its own beat, never cut short. Pivot ("To pull this together...") to three one-line takeaways, calling them our assessment. Point once more to www.charlotteschoolinsights.com as a great resource to learn more, with the school's own website as the authority. Then a host ENDS the episode on this sentence, word for word and COMPLETE: "We've reported only what ${SHORT} publishes and what our research surfaced; where something isn't published, that's a question to ask, not a verdict on the program."

HARD RULES:
- Describe the support on offer. Promise no outcome, progress or fit for any child, and give no advice on whether a child needs an evaluation.
- KEEP QUALIFIERS: "typically," "may," "if needed," "as staffing allows."
- Never invent a service, method, number, grade or person. Never explain WHY a service is or is not offered.
- "The school says" introduces only words in the PDF.
- A service the PDF does not describe is "not described," never "not offered."
- Say whether a service costs extra. Speak no price, fee or dollar figure.
- Name no person. Say the role. A provider company may be named.
- Read no URL, email or phone number aloud but www.charlotteschoolinsights.com, twice.
- No inflated words (exceptional, world-class, best-in-class, massive). At most one analogy, and it states no fact.
- Never spell a word letter by letter.
- The episode's last words are the full disclaimer sentence. Nothing after it.${notes ? `\n\n${notes}` : ''}`

if (body.length > PROMPT_CHAR_BUDGET) {
  die(
    `The prompt is ${body.length} characters, over the ${PROMPT_CHAR_BUDGET} budget for NotebookLM's\n` +
      `Customize box (truncated silently). Shorten --notes first; never cut a HARD RULE and\n` +
      `never raise the budget. Nothing was written.`,
  )
}

const header = `# NotebookLM prompt — ${school.name}, Learning Support & Student Services
# Generated: ${generatedOn} by scripts/gen_learning_episode.mjs · body ${body.length} chars
# Pairs with: ${school.name} - Learning Support - NotebookLM Source.pdf (upload it as the notebook's ONLY source)
# Audio Overview > Deep Dive > Customize. Paste ONLY the body below the line. Length: Default.

======================== PASTE FROM HERE ========================

`

/* ----------------------------------------------------------------- write -- */

mkdirSync(OUT_DIR, { recursive: true })
const base = `${school.name} - Learning Support - NotebookLM`
const pdfPath = join(OUT_DIR, `${base} Source.pdf`)
const txtPath = join(OUT_DIR, `${base} Prompt.txt`)
writeFileSync(join(OUT_DIR, `${SCHOOL}-learning-support.html`), html, 'utf8')

// page.pdf() requires HEADLESS Chromium. 'load', never 'networkidle'.
const browser = await chromium.launch()
try {
  const page = await browser.newPage()
  await page.setContent(html, { waitUntil: 'load' })
  await page.pdf({
    path: pdfPath,
    format: 'Letter',
    printBackground: true,
    margin: { top: '0.75in', bottom: '0.8in', left: '0.8in', right: '0.8in' },
    displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: `<div style="font-family:Georgia,serif;font-size:7.5pt;color:#666;width:100%;text-align:center;">
      Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>`,
  })
} finally {
  await browser.close()
}
writeFileSync(txtPath, header + body + '\n', 'utf8')

say(`report:learning: ${school.name} — ${n} sections, ${gaps.length} not-described item(s), prompt body ${body.length}/${PROMPT_CHAR_BUDGET}`)
say(`  ${pdfPath}`)
say(`  ${txtPath}`)
if (freshness.length) say(`  live-site corrections applied: ${freshness.length}`)
