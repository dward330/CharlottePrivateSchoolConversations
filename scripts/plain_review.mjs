#!/usr/bin/env node
/**
 * Plain-language review generator — the before/after file and mechanical
 * guards for a per-area plain-language rewrite (CLAUDE.md "Plain-language
 * standard"; first used by .claude/plans/plaincollege.md).
 *
 * It compares every parent-facing prose unit in one data directory between a
 * git base (default `main`) and the working tree, PER PATH. It never
 * de-duplicates by text the way check_plain_language.mjs's loadUnits does: a
 * shared template rewritten in eleven files is eleven rows here, so a site
 * that was missed or diverged shows up.
 *
 * Modes (combinable):
 *   --worklist <file.json>  Write the units still needing work in the WORKING
 *                           tree: hook-flagged, or >= gradeMinWords words at a
 *                           grade above targetGrade. Run it before rewriting.
 *   --out <file.md>         Write the before/after review table for every unit
 *                           whose text changed since --base.
 *   --check                 Exit 1 if any guard fails (see GUARDS below).
 *
 * Options:
 *   --base <ref>      git base for "before" (default main)
 *   --dir <dir>       data directory (default src/data/collegeSupportPrograms)
 *   --slugs a,b,c     limit to these schools (default: every .ts in --dir)
 *   --match <regex>   worklist only: also include units from schools OUTSIDE
 *                     --slugs whose text matches (shared templates)
 *
 * GUARDS (fail --check), compared per school across base and working tree:
 *   (a) the set of prose paths differs            — a structural change
 *   (b) the multiset of digit tokens differs      — a figure re-typed
 *   (c) the set of URLs differs
 *   (d) the list of quoted spans (“…”, "…") differs
 *   (e) a collegesTitle year span differs
 *   (f) any NON-prose string leaf changed         — figure/name fields untouched
 * Reported in the row's notes, never failing: capitalized words of the
 * before-text missing from the after-text (proper-noun drift), a change in the
 * number of `**`, and an after-grade still above targetGrade.
 *
 * The base snapshot is `git archive <base> src/data scripts` unpacked into a
 * temp dir, so the old modules' relative imports resolve unchanged.
 * Not chained into the build: `npm run plain:review -- …`.
 */
import { readFileSync, writeFileSync, readdirSync, mkdtempSync, rmSync, existsSync, mkdirSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { join, resolve, dirname, relative } from 'node:path'
import { pathToFileURL, fileURLToPath } from 'node:url'
import { proseUnits, analyze, filterAllowed, locateLine, loadConfig } from './check_plain_language.mjs'
import { classifyField } from './i18n_fields.mjs'
import { EXPORTS } from './i18n_topics.mjs'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const TOKEN = /\d+(?:[.,:/]\d+)*/g // = TOKEN in scripts/check_digit_tokens.mjs
const URL_RE = /https?:\/\/[^\s)\]'"”]+|www\.[^\s)\]'"”]+/g
const QUOTE_RE = /“[^”]*”|"[^"]*"/g
const YEAR_SPAN = /\d{4}(?:\s*[–+-]\s*\d{4})*/ // = check_selectivity_buckets.mjs

/* -------------------------------------------------------------- args -- */
const argv = process.argv.slice(2)
const opt = (name, dflt) => { const i = argv.indexOf(name); return i === -1 ? dflt : argv[i + 1] }
const flag = (name) => argv.includes(name)
const base = opt('--base', 'main')
const dir = opt('--dir', 'src/data/collegeSupportPrograms')
const outFile = opt('--out', null)
const worklistFile = opt('--worklist', null)
const matchRe = opt('--match', null) ? new RegExp(opt('--match')) : null
const allSlugs = readdirSync(join(ROOT, dir)).filter((f) => f.endsWith('.ts')).map((f) => f.replace(/\.ts$/, '')).sort()
const slugs = opt('--slugs', null) ? opt('--slugs').split(',').map((s) => s.trim()).filter(Boolean) : allSlugs
for (const s of slugs) if (!allSlugs.includes(s)) { console.error(`plain_review: no ${dir}/${s}.ts`); process.exit(2) }
if (!outFile && !worklistFile && !flag('--check')) {
  console.error('usage: plain_review.mjs [--worklist f.json] [--out f.md] [--check] [--base ref] [--dir d] [--slugs a,b] [--match re]')
  process.exit(2)
}
const cfg = loadConfig()

/* ------------------------------------------------------------- units -- */
let bust = 0
async function entryOf(absFile, slug) {
  const m = await import(`${pathToFileURL(absFile).href}?t=${Date.now()}-${bust++}`)
  const e = m[EXPORTS[slug]]
  if (!e) throw new Error(`${absFile}: no export ${EXPORTS[slug]}`)
  return e
}
/** Every string leaf with its path and prose/non-prose class. */
function allLeaves(entry) {
  const out = []
  const walk = (node, path) => {
    if (node == null) return
    if (typeof node === 'string') { out.push({ path, text: node }); return }
    if (Array.isArray(node)) { node.forEach((v, i) => walk(v, `${path}[${i}]`)); return }
    if (typeof node === 'object') for (const [k, v] of Object.entries(node)) walk(v, path ? `${path}.${k}` : k)
  }
  walk(entry, '')
  return out
}
const prose = (entry) => new Map(proseUnits(entry, '', classifyField).map((u) => [u.path, u.text]))

/* ----------------------------------------------------------- helpers -- */
const multiset = (arr) => { const m = new Map(); for (const x of arr) m.set(x, (m.get(x) ?? 0) + 1); return m }
const sameMultiset = (a, b) => { const A = multiset(a), B = multiset(b); if (A.size !== B.size) return false; for (const [k, v] of A) if (B.get(k) !== v) return false; return true }
const diffList = (a, b) => {
  const A = multiset(a), B = multiset(b), out = []
  for (const [k, v] of A) if ((B.get(k) ?? 0) < v) out.push(`-${k}`)
  for (const [k, v] of B) if ((A.get(k) ?? 0) < v) out.push(`+${k}`)
  return out.join(' ')
}
const tokens = (s, re) => s.match(re) ?? []
/** Capitalized words NOT at the start of a sentence — the likely proper nouns. */
const caps = (s) => {
  const out = new Set()
  const t = s.replace(QUOTE_RE, ' ').replace(/\*\*/g, '')
  for (const m of t.matchAll(/\b[A-Z][A-Za-z.’'&-]*[A-Za-z]\b/g)) {
    if (/(^|[.!?:;—–(]\s*)$/.test(t.slice(0, m.index))) continue
    out.add(m[0])
  }
  return out
}
const esc = (s) => String(s).replace(/\|/g, '\\|').replace(/\r?\n/g, '<br>')
const fmtGrade = (g) => (g == null ? '—' : g.toFixed(1))
const words = (s) => analyze(s, cfg).words

function hookIssues(text, relPath, path, source) {
  const lines = source.split('\n')
  const line = locateLine(source, text)
  return filterAllowed(analyze(text, cfg).issues, { relPath, unitPath: path, line, sourceLines: lines, cfg })
}

/* -------------------------------------------------------------- main -- */
async function main() {
  let snap = null
  const failures = []
  const rows = []
  const perSchool = new Map()
  const work = []
  try {
    const needBase = outFile || flag('--check')
    if (needBase) {
      snap = mkdtempSync(join(tmpdir(), 'plainreview-'))
      execSync(`git archive ${base} src/data scripts | tar -x -C "${snap}"`, { cwd: ROOT, stdio: ['ignore', 'ignore', 'inherit'] })
    }
    const worklistSlugs = matchRe ? allSlugs : slugs
    const visit = needBase ? [...new Set([...slugs])] : []

    for (const slug of visit) {
      const relPath = `${dir}/${slug}.ts`
      const source = readFileSync(join(ROOT, relPath), 'utf8')
      const after = await entryOf(join(ROOT, relPath), slug)
      const beforeFile = join(snap, relPath)
      if (!existsSync(beforeFile)) { failures.push(`(a) ${slug}: file absent at ${base}`); continue }
      const before = await entryOf(beforeFile, slug)
      const pb = prose(before), pa = prose(after)

      // (a) structure
      const missing = [...pb.keys()].filter((p) => !pa.has(p))
      const added = [...pa.keys()].filter((p) => !pb.has(p))
      if (missing.length || added.length) failures.push(`(a) ${slug}: prose paths differ — removed [${missing.join(', ')}] added [${added.join(', ')}]`)

      // (f) non-prose leaves unchanged
      const proseSet = new Set([...pb.keys(), ...pa.keys()])
      const nb = new Map(allLeaves(before).filter((l) => !proseSet.has(l.path)).map((l) => [l.path, l.text]))
      const na = new Map(allLeaves(after).filter((l) => !proseSet.has(l.path)).map((l) => [l.path, l.text]))
      for (const [p, t] of nb) if (na.get(p) !== t) failures.push(`(f) ${slug}:${p}: non-prose leaf changed`)
      for (const p of na.keys()) if (!nb.has(p)) failures.push(`(f) ${slug}:${p}: non-prose leaf added`)

      let changed = 0
      for (const [path, b] of pb) {
        const a = pa.get(path)
        if (a == null || a === b) continue
        changed++
        const at = `${slug}:${path}`
        const dt = diffList(tokens(b, TOKEN), tokens(a, TOKEN))
        if (dt) failures.push(`(b) ${at}: digit tokens differ ${dt}`)
        const du = diffList(tokens(b, URL_RE), tokens(a, URL_RE))
        if (du) failures.push(`(c) ${at}: URLs differ ${du}`)
        const qb = tokens(b, QUOTE_RE), qa = tokens(a, QUOTE_RE)
        if (!sameMultiset(qb, qa)) failures.push(`(d) ${at}: quoted spans differ ${diffList(qb, qa)}`)
        if (/(^|\.)collegesTitle$/.test(path) && (b.match(YEAR_SPAN)?.[0] ?? '') !== (a.match(YEAR_SPAN)?.[0] ?? '')) failures.push(`(e) ${at}: year span differs`)

        const notes = []
        const lostCaps = [...caps(b)].filter((w) => !caps(a).has(w) && !a.includes(w))
        if (lostCaps.length) notes.push(`caps gone: ${lostCaps.join(', ')}`)
        const sb = (b.match(/\*\*/g) ?? []).length, sa = (a.match(/\*\*/g) ?? []).length
        if (sb !== sa) notes.push(`** ${sb}→${sa}`)
        const ga = analyze(a, cfg).grade, gb = analyze(b, cfg).grade
        if (ga != null && ga > cfg.targetGrade) notes.push(`grade ${ga.toFixed(1)} > ${cfg.targetGrade}`)
        const hk = hookIssues(a, relPath, path, source)
        rows.push({ slug, path, b, a, wb: words(b), wa: words(a), gb, ga, hook: hk.length ? hk.map((i) => i.detail).join('; ') : 'pass', notes: notes.join('; ') })
      }
      perSchool.set(slug, changed)
      for (const path of added) if (!pb.has(path)) { /* counted under (a) */ }
    }

    if (worklistFile) {
      for (const slug of worklistSlugs) {
        const inBatch = slugs.includes(slug)
        const relPath = `${dir}/${slug}.ts`
        const source = readFileSync(join(ROOT, relPath), 'utf8')
        const after = await entryOf(join(ROOT, relPath), slug)
        for (const [path, text] of prose(after)) {
          if (!inBatch && !(matchRe && matchRe.test(text))) continue
          const { grade, words: w } = analyze(text, cfg)
          const issues = hookIssues(text, relPath, path, source)
          const overTarget = grade != null && grade > cfg.targetGrade
          const shared = Boolean(matchRe && matchRe.test(text))
          // In-batch: flagged or over target. Out-of-batch: only the shared templates.
          if (inBatch ? !(issues.length || overTarget) : !shared) continue
          work.push({ at: `${slug}:${path}`, slug, path, words: w, grade: grade == null ? null : +grade.toFixed(1), rules: [...new Set(issues.map((i) => i.rule === 'jargon' ? `jargon:${i.term}` : i.rule))], ...(shared ? { shared: true } : {}), text })
        }
      }
      mkdirSync(dirname(resolve(ROOT, worklistFile)), { recursive: true })
      const counts = Object.fromEntries(worklistSlugs.map((s) => [s, work.filter((w) => w.slug === s).length]).filter(([, n]) => n))
      writeFileSync(resolve(ROOT, worklistFile), JSON.stringify({ generated: new Date().toISOString().slice(0, 10), dir, slugs, match: matchRe?.source ?? null, total: work.length, counts, units: work }, null, 2) + '\n')
      console.log(`worklist: ${work.length} units → ${relative(ROOT, resolve(ROOT, worklistFile))}`)
      for (const [s, n] of Object.entries(counts)) console.log(`  ${s}: ${n}`)
    }

    if (outFile) {
      const L = []
      L.push(`# Plain-language review — ${dir}`, '')
      L.push(`Base \`${base}\` → working tree. Generated ${new Date().toISOString().slice(0, 10)} by \`scripts/plain_review.mjs\`. ` +
        `Grades are Flesch–Kincaid over units of ≥${cfg.gradeMinWords} words (— below that). "hook" is what the PostToolUse hook would still report.`, '')
      L.push('| School | Changed units |', '|---|--:|')
      for (const [s, n] of perSchool) L.push(`| ${s} | ${n} |`)
      L.push(`| **Total** | **${rows.length}** |`, '')
      L.push(`Guards: ${failures.length ? `**${failures.length} FAILED**` : 'all pass (paths, digits, URLs, quotes, year spans, non-prose leaves)'}.`, '')
      if (failures.length) { for (const f of failures) L.push(`- ${esc(f)}`); L.push('') }
      L.push('| # | school | path | before | after | words b→a | grade b→a | hook | notes |', '|--:|---|---|---|---|---|---|---|---|')
      rows.forEach((r, i) => L.push(`| ${i + 1} | ${r.slug} | \`${r.path}\` | ${esc(r.b)} | ${esc(r.a)} | ${r.wb}→${r.wa} | ${fmtGrade(r.gb)}→${fmtGrade(r.ga)} | ${esc(r.hook)} | ${esc(r.notes)} |`))
      // Preserve anything appended below the table (e.g. "## Independent review").
      const abs = resolve(ROOT, outFile)
      let tail = ''
      if (existsSync(abs)) { const old = readFileSync(abs, 'utf8'); const k = old.indexOf('\n## Independent review'); if (k !== -1) tail = old.slice(k) }
      mkdirSync(dirname(abs), { recursive: true })
      writeFileSync(abs, L.join('\n') + '\n' + tail)
      console.log(`review: ${rows.length} changed units → ${relative(ROOT, abs)}`)
      const notPass = rows.filter((r) => r.hook !== 'pass').length
      console.log(`  hook pass ${rows.length - notPass}/${rows.length}; after-grade >${cfg.targetGrade}: ${rows.filter((r) => r.ga != null && r.ga > cfg.targetGrade).length}`)
    }

    if (flag('--check')) {
      if (failures.length) { console.error(`plain_review --check: ${failures.length} guard failure(s)`); for (const f of failures) console.error(`  ${f}`); return 1 }
      console.log(`plain_review --check: guards pass (${slugs.length} school(s))`)
    }
    return 0
  } finally {
    if (snap) rmSync(snap, { recursive: true, force: true })
  }
}

main().then((c) => { process.exitCode = c }, (e) => { console.error(e); process.exitCode = 2 })
