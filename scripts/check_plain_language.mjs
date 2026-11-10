#!/usr/bin/env node
/**
 * Plain-language check for parent-facing English prose.
 *
 * See CLAUDE.md "Plain-language standard" and .claude/plans/plainlanguage.md.
 * The jargon list and thresholds live in scripts/plain_language.json — never
 * copy them here.
 *
 * "Parent-facing prose" is defined by the i18n extractor, not re-invented:
 * every src/data string field that classifyField() (scripts/i18n_fields.mjs)
 * calls `prose`, in the modules scripts/i18n_topics.mjs lays out, plus every
 * value in src/locales/en.json. `kind: 'verify'` flag objects are dev-only and
 * skipped — the one place this walk deliberately differs from the extractor's.
 *
 * Modes:
 *   --hook (default)   PostToolUse hook. Reads the Claude Code payload on stdin,
 *                      checks ONLY the prose units the edit added or changed,
 *                      and exits 2 with the lines to rewrite. Silent exit 0
 *                      otherwise. Internal errors exit 1 (non-blocking): the
 *                      hook enforces writing quality, it never blocks an edit
 *                      on its own bug.
 *   --report [--json]  Whole-corpus audit, per file and per area. Always exit 0.
 *                      Never chain it into the build.
 *   --file <path>      Check every unit in one file. Exit 0.
 *
 * Env: CLAUDE_PLAIN_LANGUAGE=off disables the hook. PLAIN_LANGUAGE_ROOT
 * overrides the repo root (tests use a fixture root; field classification and
 * the topic layout still come from this script's own scripts/ directory).
 */
import { readFileSync, existsSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { join, relative, resolve, dirname, basename, sep } from 'node:path'
import { pathToFileURL, fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))

/* ------------------------------------------------------------ config -- */

export function loadConfig() {
  return JSON.parse(readFileSync(join(HERE, 'plain_language.json'), 'utf8'))
}

let compiled = null
function termRegexes(cfg) {
  if (compiled?.cfg === cfg) return compiled.list
  const list = cfg.terms.map((t) => ({ ...t, re: new RegExp(`\\b(?:${t.match})\\b`, 'gi') }))
  compiled = { cfg, list }
  return list
}

/* ------------------------------------------------------------- scope -- */

const toPosix = (p) => p.split(sep).join('/')
let layout = null

/** Load the topic layout + field classifier lazily, after the fast path. */
async function getLayout() {
  if (layout) return layout
  const topics = await import(pathToFileURL(join(HERE, 'i18n_topics.mjs')).href)
  const fields = await import(pathToFileURL(join(HERE, 'i18n_fields.mjs')).href)
  const repoRel = (spec) => toPosix(relative(resolve(HERE, '..'), resolve(HERE, spec)))
  // repo-relative module path -> [{ topic, fn, prefix }]
  const accessors = new Map()
  const add = (file, spec) => {
    if (!accessors.has(file)) accessors.set(file, [])
    accessors.get(file).push(spec)
  }
  for (const [topic, [mod, fn]] of Object.entries(topics.ACCESSORS)) add(repoRel(mod), { topic, fn, prefix: '' })
  for (const [topic, specs] of Object.entries(topics.EXTRA_LAYERS)) {
    for (const [prefix, mod, fn] of specs) add(repoRel(mod), { topic, fn, prefix })
  }
  layout = { ...topics, classifyField: fields.classifyField, accessors }
  return layout
}

/** Cheap pre-check: can this repo-relative path possibly be in scope? */
export function maybeInScope(relPath) {
  return relPath === 'src/locales/en.json' || relPath.startsWith('src/data/')
}

/**
 * Which kind of prose file is this?
 * @returns {{kind:'module',topic:string,slug:string}|{kind:'accessor',specs:object[]}|{kind:'chrome'}|null}
 */
export async function scopeOf(relPath) {
  relPath = toPosix(relPath)
  if (relPath === 'src/locales/en.json') return { kind: 'chrome' }
  if (!relPath.startsWith('src/data/')) return null
  const L = await getLayout()
  if (L.accessors.has(relPath)) return { kind: 'accessor', specs: L.accessors.get(relPath) }
  const m = relPath.match(/^src\/data\/([^/]+)\/([^/.]+)\.ts$/)
  if (!m) return null
  const [, dir, slug] = m
  if (!L.SLUGS.includes(slug)) return null
  const topic = Object.keys(L.TOPICS).find((t) => L.TOPICS[t] === dir)
  return topic ? { kind: 'module', topic, slug } : null
}

/* ------------------------------------------------------------- units -- */

/** Collect prose string leaves, skipping dev-only `kind: 'verify'` flags. */
export function proseUnits(entry, prefix, classifyField) {
  const out = []
  const walk = (node, path) => {
    if (node == null) return
    if (typeof node === 'string') {
      const generic = path.replace(/\[\d+\]/g, '[]')
      const leaf = (path.split('.').pop() || '(root)').replace(/\[\d+\]$/, '').replace(/\[\]$/, '')
      if (classifyField(generic, leaf) === 'prose') out.push({ path, text: node })
      return
    }
    if (Array.isArray(node)) { node.forEach((v, i) => walk(v, `${path}[${i}]`)); return }
    if (typeof node === 'object') {
      if (node.kind === 'verify') return
      for (const [k, v] of Object.entries(node)) walk(v, path ? `${path}.${k}` : k)
    }
  }
  walk(entry, prefix)
  return out
}

const dedupe = (units) => {
  const seen = new Set()
  return units.filter((u) => (seen.has(u.text) ? false : (seen.add(u.text), true)))
}

function flattenJson(obj, prefix = '', out = []) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k
    if (typeof v === 'string') out.push({ path: key, text: v })
    else if (v && typeof v === 'object') flattenJson(v, key, out)
  }
  return out
}

/** Units from an already-imported module namespace. */
async function unitsFromModule(m, scope) {
  const L = await getLayout()
  if (scope.kind === 'module') {
    const entry = m[L.EXPORTS[scope.slug]]
    return dedupe(entry ? proseUnits(entry, '', L.classifyField) : [])
  }
  const out = []
  for (const { fn, prefix } of scope.specs) {
    const got = m[fn]
    if (got == null) continue
    if (typeof got !== 'function') { out.push(...proseUnits(got, prefix, L.classifyField)); continue }
    for (const slug of L.SLUGS) {
      const entry = got(slug)
      // Classify on the extractor's own path (prefix only); the slug is added
      // afterwards for messages and `allow` entries.
      if (entry) out.push(...proseUnits(entry, prefix, L.classifyField).map((u) => ({ ...u, path: `${slug}:${u.path}` })))
    }
  }
  return dedupe(out)
}

let bust = 0
/** Load the prose units of a file on disk (post-edit state). */
export async function loadUnits(absFile, scope) {
  if (scope.kind === 'chrome') return flattenJson(JSON.parse(readFileSync(absFile, 'utf8')))
  const m = await import(`${pathToFileURL(absFile).href}?t=${Date.now()}-${bust++}`)
  return unitsFromModule(m, scope)
}

/**
 * Load prose units from SOURCE TEXT that is not on disk (the pre-edit file).
 * TS is written to a temp dir — never beside the original, where Vite or a
 * glob could see it — with relative specifiers rewritten to absolute URLs.
 */
export async function unitsFromSource(source, absFile, scope) {
  if (source === '') return []
  if (scope.kind === 'chrome') return flattenJson(JSON.parse(source))
  const dir = mkdtempSync(join(tmpdir(), 'plainlang-'))
  try {
    const base = dirname(absFile)
    const rewritten = source.replace(
      /(\bfrom\s*|\bimport\s*\(\s*|\bimport\s+)(['"])(\.\.?\/[^'"]+)\2/g,
      (_, kw, q, spec) => `${kw}${q}${pathToFileURL(resolve(base, spec)).href}${q}`,
    )
    const tmp = join(dir, basename(absFile).replace(/\.ts$/, '') + '.mts')
    writeFileSync(tmp, rewritten)
    const m = await import(`${pathToFileURL(tmp).href}?t=${Date.now()}-${bust++}`)
    return await unitsFromModule(m, scope)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

/* ------------------------------------------------------ pre-edit text -- */

function gitHead(root, relPath) {
  try {
    return execFileSync('git', ['show', `HEAD:${relPath}`], { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })
  } catch { return null }
}

function undoEdit(post, { old_string: oldS, new_string: newS, replace_all: all }) {
  if (typeof oldS !== 'string' || typeof newS !== 'string' || newS === '' || !post.includes(newS)) return null
  if (all) return post.split(newS).join(oldS)
  const i = post.indexOf(newS)
  return post.slice(0, i) + oldS + post.slice(i + newS.length)
}

/**
 * Candidate pre-edit sources, most trustworthy first:
 * tool_response.originalFile, then reconstruction from the edit, then
 * `git show HEAD:<path>`, then empty for an untracked new file.
 */
export function preEditCandidates(payload, postSource, root, relPath) {
  const out = []
  const resp = payload.tool_response ?? {}
  if (typeof resp.originalFile === 'string') out.push(resp.originalFile)
  else if (resp.type === 'create') out.push('')
  const input = payload.tool_input ?? {}
  if (payload.tool_name === 'Edit') {
    const r = undoEdit(postSource, input)
    if (r != null) out.push(r)
  } else if (payload.tool_name === 'MultiEdit' && Array.isArray(input.edits)) {
    let s = postSource
    for (const e of [...input.edits].reverse()) { s = s == null ? null : undoEdit(s, e) }
    if (s != null) out.push(s)
  }
  const head = gitHead(root, relPath)
  if (head != null) out.push(head)
  else out.push('')
  return out
}

/** Post units whose text is not among the pre-edit texts. */
export function changedUnits(pre, post) {
  const before = new Set(pre.map((u) => u.text))
  return post.filter((u) => !before.has(u.text))
}

/* ------------------------------------------------------------- text --- */

/** The strip pipeline: what a parent reads, minus URLs, citations, quotes. */
export function normalize(text) {
  return text
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')                                   // 1 md links
    .replace(/https?:\/\/[^\s)\]]+/g, '')                                       // 2 bare URLs
    .replace(/www\.[^\s)\]]+/g, '')
    .replace(/\b[\w-]+\.(?:org|com|edu|net|gov)\b(?:\/[^\s)\]]*)?/g, '')
    .replace(/\((?:Sources?|via|per)\b[^)]*\)/gi, '')                           // 3 citations
    .replace(/\[Sources?\b[^\]]*\]/gi, '')
    .replace(/\{\{[^}]*\}\}/g, 'X')                                             // 4 i18next
    .replace(/<\/?[A-Za-z0-9][^>]*>/g, '')
    .replace(/\*\*|[_`#>|]/g, ' ')                                              // 5 markdown
    .replace(/“[^”]*”/g, 'Q')                                                   // 6 quotes
    .replace(/"[^"]*"/g, 'Q')
    .replace(/\s+/g, ' ')                                                       // 7 whitespace
    .trim()
}

const isWord = (tok) => /[A-Za-z]/.test(tok)
export const wordsOf = (s) => s.split(/\s+/).filter(isWord)

const DOT = '․' // one-dot leader stands in for a protected period
const ABBR = /\b(?:a\.m|p\.m|A\.M|P\.M|U\.S|Ph\.D|e\.g|i\.e|St|Dr|Mr|Mrs|Ms|No|vs|etc|Jr|Sr|Inc|approx)\./g

/** Split normalized text into sentences. Semicolons never split. */
export function sentences(text) {
  const protectedText = text
    .replace(ABBR, (m) => m.replace(/\./g, DOT))
    .replace(/\b([A-Z])\.(?=\s)/g, `$1${DOT}`)
  return protectedText
    .split(/(?<=[.!?]["”’)\]]*)\s+/)
    .map((s) => s.replaceAll(DOT, '.').trim())
    .filter((s) => wordsOf(s).length)
}

/** Vowel-group syllable heuristic. */
export function syllables(word) {
  let w = word.toLowerCase().replace(/[^a-z]/g, '')
  if (!w) return 0
  if (w.length <= 3) return 1
  w = w.replace(/(?:[^laeiouy]es|[^laeiouy]ed|[^laeiouy]e)$/, (m) => m[0]).replace(/^y/, '')
  const groups = w.match(/[aeiouy]{1,2}/g)
  return Math.max(1, groups ? groups.length : 1)
}

/**
 * Flesch–Kincaid grade, with proper-noun damping: a capitalized word that does
 * not start its sentence counts at most 2 syllables (WPPSI-IV, Morehead-Cain
 * are not the reader's problem and cannot be rewritten).
 */
export function fleschKincaid(text) {
  const sents = sentences(text)
  let words = 0, syl = 0
  for (const s of sents) {
    wordsOf(s).forEach((w, i) => {
      words++
      const n = syllables(w)
      syl += i > 0 && /^[^A-Za-z]*[A-Z]/.test(w) ? Math.min(n, 2) : n
    })
  }
  if (!words) return 0
  return 0.39 * (words / Math.max(1, sents.length)) + 11.8 * (syl / words) - 15.59
}

/** Is the match at [start, end) explained by, or inside, a parenthetical? */
function explained(text, start, end) {
  if (/^\s*\(/.test(text.slice(end))) return true
  const open = text.lastIndexOf('(', start)
  if (open === -1) return false
  const closeBefore = text.indexOf(')', open)
  return closeBefore === -1 || closeBefore >= end
}

/** Full analysis: issues plus the measured grade (for --report columns). */
export function analyze(text, cfg) {
  const norm = normalize(text)
  const issues = []
  const seenTerms = new Set()
  for (const t of termRegexes(cfg)) {
    t.re.lastIndex = 0
    let m
    while ((m = t.re.exec(norm))) {
      if (explained(norm, m.index, m.index + m[0].length)) continue
      if (seenTerms.has(t.term)) continue
      seenTerms.add(t.term)
      issues.push({ rule: 'jargon', term: t.term, detail: `jargon "${t.term}" (${m[0]}) → ${t.plain} — or explain it in parentheses` })
    }
  }
  for (const s of sentences(norm)) {
    const w = wordsOf(s)
    if (w.length > cfg.maxSentenceWords) {
      const head = s.split(/\s+/).slice(0, 12).join(' ')
      issues.push({ rule: 'long', detail: `sentence of ${w.length} words (max ${cfg.maxSentenceWords}): "${head}…"` })
    }
  }
  const nWords = wordsOf(norm).length
  let grade = null
  if (nWords >= cfg.gradeMinWords) {
    grade = fleschKincaid(norm)
    if (grade > cfg.maxGrade) {
      issues.push({ rule: 'grade', detail: `reading grade ${grade.toFixed(1)} (max ${cfg.maxGrade}; target ${cfg.targetGrade}) over ${nWords} words` })
    }
  }
  return { issues, grade, words: nWords }
}

export const checkText = (text, cfg) => analyze(text, cfg).issues

/* ------------------------------------------------------------- allow -- */

/** 1-based line where the unit's text starts in its source, or null. */
export function locateLine(source, text) {
  const probes = [text.slice(0, 40), text.slice(0, 40).replace(/'/g, "\\'"), text.slice(0, 40).replace(/"/g, '\\"'), text.slice(0, 20)]
  for (const p of probes) {
    if (!p) continue
    const i = source.indexOf(p)
    if (i !== -1) return source.slice(0, i).split('\n').length
  }
  return null
}

function inlineTokens(lines, line) {
  const toks = new Set()
  for (const n of [line, line - 1]) {
    const m = lines[n - 1]?.match(/\/\/\s*plain-ok:\s*(.+)$/)
    if (m) m[1].split(',').map((s) => s.trim()).filter(Boolean).forEach((t) => toks.add(t))
  }
  return toks
}

/** Drop allowed issues: `cfg.allow` entries, then `// plain-ok:` markers (TS). */
export function filterAllowed(issues, { relPath, unitPath, line, sourceLines, cfg }) {
  const toks = line && sourceLines && relPath.endsWith('.ts') ? inlineTokens(sourceLines, line) : new Set()
  return issues.filter((iss) => {
    const name = iss.rule === 'jargon' ? iss.term : iss.rule
    if (toks.has(name)) return false
    return !(cfg.allow ?? []).some((a) => a.file === relPath
      && (a.path === unitPath || a.key === unitPath)
      && (a.term === name || a.rule === iss.rule))
  })
}

function checkUnits(units, relPath, source, cfg) {
  const lines = source.split('\n')
  const out = []
  for (const u of units) {
    const line = locateLine(source, u.text)
    const issues = filterAllowed(checkText(u.text, cfg), { relPath, unitPath: u.path, line, sourceLines: lines, cfg })
    if (issues.length) out.push({ ...u, line, issues })
  }
  return out
}

export function formatFailure(relPath, findings) {
  const n = findings.reduce((a, f) => a + f.issues.length, 0)
  const lines = [`plain-language: ${n} issue(s) in ${relPath} — rewrite for a parent reader (CLAUDE.md "Plain-language standard"):`]
  for (const f of findings) {
    lines.push(`  ${f.path}${f.line ? ` (line ${f.line})` : ''}`)
    for (const i of f.issues) lines.push(`    ${i.detail}`)
  }
  lines.push('Keep a correct, explained term with `// plain-ok: <term>` on that line, or an `allow` entry in scripts/plain_language.json.')
  return lines.join('\n')
}

/* ------------------------------------------------------------- modes -- */

function repoRoot(payload) {
  return process.env.PLAIN_LANGUAGE_ROOT || process.env.CLAUDE_PROJECT_DIR || payload?.cwd || process.cwd()
}

async function readStdin() {
  const chunks = []
  for await (const c of process.stdin) chunks.push(c)
  return Buffer.concat(chunks).toString('utf8')
}

async function hookMode() {
  if (process.env.CLAUDE_PLAIN_LANGUAGE === 'off') return 0
  const payload = JSON.parse((await readStdin()) || '{}')
  const filePath = payload.tool_input?.file_path
  if (!filePath) return 0
  const root = repoRoot(payload)
  const abs = resolve(root, filePath)
  const relPath = toPosix(relative(root, abs))
  if (relPath.startsWith('..') || !maybeInScope(relPath)) return 0          // fast path

  const scope = await scopeOf(relPath)
  if (!scope || !existsSync(abs)) return 0
  const cfg = loadConfig()
  const postSource = readFileSync(abs, 'utf8')

  let post
  try { post = await loadUnits(abs, scope) } catch (e) {
    console.error(`plain-language: skipped ${relPath} — could not load it (${e.message.split('\n')[0]})`)
    return 1
  }
  let pre = null
  for (const cand of preEditCandidates(payload, postSource, root, relPath)) {
    try { pre = await unitsFromSource(cand, abs, scope); break } catch { /* next candidate */ }
  }
  if (pre == null) {
    console.error(`plain-language: skipped ${relPath} — could not reconstruct the pre-edit file`)
    return 1
  }
  const findings = checkUnits(changedUnits(pre, post), relPath, postSource, cfg)
  if (!findings.length) return 0
  console.error(formatFailure(relPath, findings))
  return 2
}

/** Every in-scope file, as { relPath, area, scope }. */
async function corpus(root) {
  const L = await getLayout()
  const files = []
  for (const [topic, dir] of Object.entries(L.TOPICS)) {
    if (!dir) continue
    for (const slug of L.SLUGS) {
      const relPath = `src/data/${dir}/${slug}.ts`
      if (existsSync(join(root, relPath))) files.push({ relPath, area: topic, scope: { kind: 'module', topic, slug } })
    }
  }
  for (const [relPath, specs] of L.accessors) {
    if (existsSync(join(root, relPath))) files.push({ relPath, area: specs[0].topic, scope: { kind: 'accessor', specs } })
  }
  files.push({ relPath: 'src/locales/en.json', area: 'chrome', scope: { kind: 'chrome' } })
  return files
}

function tally(rows, units, cfg) {
  const r = { units: 0, flagged: 0, jargon: 0, long: 0, gradeTarget: 0, gradeMax: 0 }
  for (const u of units) {
    r.units++
    const { grade } = analyze(u.text, cfg)
    const rules = new Set(u.issues.map((i) => i.rule))
    if (u.issues.length) r.flagged++
    if (rules.has('jargon')) r.jargon++
    if (rules.has('long')) r.long++
    if (grade != null && grade > cfg.targetGrade) r.gradeTarget++
    if (rules.has('grade')) r.gradeMax++
  }
  return r
}

async function reportMode(json) {
  const root = repoRoot(null)
  const cfg = loadConfig()
  const perFile = []
  const termCounts = new Map()
  const record = (relPath, area, units, source) => {
    const lines = source.split('\n')
    const checked = units.map((u) => {
      const line = locateLine(source, u.text)
      const issues = filterAllowed(checkText(u.text, cfg), { relPath, unitPath: u.path, line, sourceLines: lines, cfg })
      for (const i of issues) if (i.rule === 'jargon') termCounts.set(i.term, (termCounts.get(i.term) ?? 0) + 1)
      return { ...u, issues }
    })
    perFile.push({ file: relPath, area, ...tally(null, checked, cfg) })
  }
  for (const f of await corpus(root)) {
    const abs = join(root, f.relPath)
    try {
      record(f.relPath, f.area, await loadUnits(abs, f.scope), readFileSync(abs, 'utf8'))
    } catch (e) {
      console.error(`  ! ${f.relPath}: ${e.message.split('\n')[0]}`)
    }
  }
  const content = join(root, 'src/data/overlays/work/financial-aid-tuition.content.es.json')
  if (existsSync(content)) {
    const units = dedupe(JSON.parse(readFileSync(content, 'utf8')).sections
      .map((s, i) => ({ path: `sections[${i}]`, text: s.text })).filter((u) => typeof u.text === 'string'))
    record('src/content/financial-aid-tuition (live blocks)', 'financial-aid-tuition', units, '')
  }

  const cols = ['units', 'flagged', 'jargon', 'long', 'gradeTarget', 'gradeMax']
  const sum = (rows) => Object.fromEntries(cols.map((c) => [c, rows.reduce((a, r) => a + r[c], 0)]))
  const areas = [...new Set(perFile.map((r) => r.area))].map((area) => ({ area, ...sum(perFile.filter((r) => r.area === area)) }))
  const total = sum(perFile)
  const top = [...termCounts].sort((a, b) => b[1] - a[1]).slice(0, 10)

  if (json) {
    console.log(JSON.stringify({ config: { maxGrade: cfg.maxGrade, targetGrade: cfg.targetGrade }, perArea: areas, perFile, total, topJargon: top }, null, 2))
    return 0
  }
  const head = `| Prose units | Flagged | Jargon | Sentence >${cfg.maxSentenceWords} words | Grade >${cfg.targetGrade} | Grade >${cfg.maxGrade} |`
  const row = (name, r) => `| ${name} | ${cols.map((c) => r[c]).join(' | ')} |`
  console.log(`Plain-language audit — "Flagged" uses the hook's rule (grade >${cfg.maxGrade}); grade columns count units of ≥${cfg.gradeMinWords} words.\n`)
  console.log(`### Per area\n\n| Area ${head}\n|---|--:|--:|--:|--:|--:|--:|`)
  for (const a of areas) console.log(row(a.area, a))
  console.log(row('**Total**', total))
  console.log(`\n### Per file\n\n| File ${head}\n|---|--:|--:|--:|--:|--:|--:|`)
  for (const f of perFile) console.log(row(`\`${f.file}\``, f))
  console.log(`\nTop jargon terms: ${top.map(([t, n]) => `${t} ${n}`).join(', ') || '(none)'}`)
  return 0
}

async function fileMode(path) {
  const root = repoRoot(null)
  const abs = resolve(root, path)
  const relPath = toPosix(relative(root, abs))
  const scope = await scopeOf(relPath)
  if (!scope) { console.log(`${relPath}: not in plain-language scope`); return 0 }
  const findings = checkUnits(await loadUnits(abs, scope), relPath, readFileSync(abs, 'utf8'), loadConfig())
  console.log(findings.length ? formatFailure(relPath, findings) : `${relPath}: clean`)
  return 0
}

async function main() {
  const args = process.argv.slice(2)
  if (args.includes('--report')) return reportMode(args.includes('--json'))
  const fi = args.indexOf('--file')
  if (fi !== -1) return fileMode(args[fi + 1])
  try {
    return await hookMode()
  } catch (e) {
    console.error(`plain-language: internal error, edit not checked (${e.message.split('\n')[0]})`)
    return 1
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().then((code) => { process.exitCode = code })
}
