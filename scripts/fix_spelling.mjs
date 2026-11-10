#!/usr/bin/env node
/**
 * One-off fixer for the American-spelling rule (CLAUDE.md "American
 * spelling", plan .claude/plans/usspelling.md). Committed, never chained.
 *
 * A blind find-and-replace over .ts source would hit comments, citation
 * labels, `Centre College` names and dev-only verify flags. So every British
 * form found in the SOURCE TEXT is classified by its EFFECT: the source is
 * re-imported with just that one occurrence replaced, and every string leaf
 * of the module is diffed against the original. The occurrence is applied
 * only when every leaf it changes is a prose leaf outside a verify flag, and
 * each such leaf changed by exactly one unmasked findBritish() hit.
 *
 * (Deviation from the plan, recorded there: the plan said "exactly one leaf".
 * A shared template string — e.g. financialAidReports.ts's framing sentence
 * served for several schools — changes one leaf per school from ONE source
 * occurrence, so "one or more prose leaves, each changed as expected" is the
 * real test.)
 *
 *   node scripts/fix_spelling.mjs                 dry run: per-file counts
 *   node scripts/fix_spelling.mjs --write         apply accepted occurrences
 *   node scripts/fix_spelling.mjs --check [--base main]
 *        re-import every in-scope module and assert against <base>: same
 *        paths; non-prose and verify leaves byte-identical; every prose leaf
 *        a spelling-only change (isSpellingOnly) with no British form left
 *        except where an inline `// plain-ok:` marker allows it. en.json too.
 *   node scripts/fix_spelling.mjs --review <md> [--base main]
 *        write the review file (changes vs <base>, exceptions, out-of-scope).
 *
 * All exemption logic comes from scripts/check_plain_language.mjs.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import {
  loadConfig, corpus, getLayout, importFromSource, flattenJson, spellingRegex, findBritish,
  maskReason, keepCase, isSpellingOnly, checkText, filterAllowed, locateLine,
} from './check_plain_language.mjs'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const cfg = loadConfig()
const args = process.argv.slice(2)
const argOf = (f, d) => { const i = args.indexOf(f); return i === -1 ? d : args[i + 1] }
const BASE = argOf('--base', 'main')

/* ------------------------------------------------------------ leaves -- */

/** Every string leaf of a module: Map(path -> { text, cls: prose|non-prose|verify }). */
async function leavesOf(m, scope) {
  const L = await getLayout()
  const out = new Map()
  const walk = (node, path, inVerify, put) => {
    if (node == null) return
    if (typeof node === 'string') {
      const generic = path.replace(/\[\d+\]/g, '[]')
      const leaf = (path.split('.').pop() || '(root)').replace(/\[\d+\]$/, '').replace(/\[\]$/, '')
      const cls = inVerify ? 'verify' : L.classifyField(generic, leaf) === 'prose' ? 'prose' : 'non-prose'
      put(path, { text: node, cls })
      return
    }
    if (Array.isArray(node)) { node.forEach((v, i) => walk(v, `${path}[${i}]`, inVerify, put)); return }
    if (typeof node === 'object') {
      const v = inVerify || node.kind === 'verify'
      for (const [k, val] of Object.entries(node)) walk(val, path ? `${path}.${k}` : k, v, put)
    }
  }
  if (scope.kind === 'module') {
    walk(m[L.EXPORTS[scope.slug]], '', false, (p, v) => out.set(p, v))
  } else {
    for (const { fn, prefix } of scope.specs) {
      const got = m[fn]
      if (got == null) continue
      if (typeof got !== 'function') { walk(got, prefix, false, (p, v) => out.set(p, v)); continue }
      for (const slug of L.SLUGS) {
        const entry = got(slug)
        if (entry) walk(entry, prefix, false, (p, v) => out.set(`${slug}:${p}`, v))
      }
    }
  }
  return out
}

const leavesFromSource = async (source, relPath, scope) =>
  leavesOf(await importFromSource(source, join(ROOT, relPath)), scope)

function gitShow(ref, relPath) {
  return execFileSync('git', ['show', `${ref}:${relPath}`], { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 28 })
}

/* ------------------------------------------------------- occurrences -- */

const lineAt = (src, i) => src.slice(0, i).split('\n').length

function markerTokens(lines, line) {
  const toks = new Set()
  for (const n of [line, line - 1]) {
    const m = lines[n - 1]?.match(/\/\/\s*plain-ok:\s*(.+)$/)
    if (m) m[1].split(',').map((s) => s.trim()).filter(Boolean).forEach((t) => toks.add(t))
  }
  return toks
}

/** Classify every British form in one TS file's source. */
async function classifyFile(relPath, scope) {
  const source = readFileSync(join(ROOT, relPath), 'utf8')
  const lines = source.split('\n')
  const map = cfg.spelling.map
  const base = await leavesFromSource(source, relPath, scope)
  const re = spellingRegex(cfg)
  const occ = []
  let m
  while ((m = re.exec(source))) {
    const form = m[0]
    const o = { index: m.index, form, american: keepCase(form, map[form.toLowerCase()]), line: lineAt(source, m.index) }
    occ.push(o)
    if (markerTokens(lines, o.line).has(form.toLowerCase())) { o.verdict = 'inline marker'; continue }
    const trial = source.slice(0, o.index) + o.american + source.slice(o.index + form.length)
    let after
    try { after = await leavesFromSource(trial, relPath, scope) } catch (e) { o.verdict = `import failed: ${e.message.split('\n')[0]}`; continue }
    const changed = []
    for (const [p, v] of after) {
      const was = base.get(p)
      if (!was) { o.verdict = `path appeared: ${p}`; break }
      if (was.text !== v.text) changed.push({ path: p, old: was.text, neu: v.text, cls: was.cls })
    }
    if (o.verdict) continue
    if ([...base.keys()].some((p) => !after.has(p))) { o.verdict = 'path vanished'; continue }
    o.leaves = changed
    if (!changed.length) { o.verdict = 'comment'; continue }
    if (changed.some((c) => c.cls === 'verify')) { o.verdict = 'verify flag'; continue }
    if (changed.some((c) => c.cls === 'non-prose')) { o.verdict = 'non-prose'; continue }
    let bad = null
    for (const c of changed) {
      const ok = findBritish(c.old, cfg).some((h) =>
        c.old.slice(0, h.index) + h.american + c.old.slice(h.index + h.form.length) === c.neu)
      if (ok) continue
      let i = 0
      while (i < c.old.length && c.old[i] === c.neu[i]) i++
      const reason = maskReason(c.old, i, form.length, cfg)
      bad = reason ? `masked: ${reason}` : 'unexpected change'
      break
    }
    o.verdict = bad ?? 'apply'
  }
  return { relPath, source, occ }
}

async function tsFiles() {
  return (await corpus(ROOT)).filter((f) => f.scope.kind !== 'chrome')
}

/* -------------------------------------------------------------- modes -- */

async function dryRunOrWrite(write) {
  const totals = {}
  for (const f of await tsFiles()) {
    const r = await classifyFile(f.relPath, f.scope)
    if (!r.occ.length) continue
    const by = {}
    for (const o of r.occ) by[o.verdict] = (by[o.verdict] ?? 0) + 1
    for (const [k, v] of Object.entries(by)) totals[k] = (totals[k] ?? 0) + v
    console.log(`${r.relPath}: ${Object.entries(by).map(([k, v]) => `${k} ${v}`).join(', ')}`)
    if (write) {
      let s = r.source
      for (const o of [...r.occ].filter((x) => x.verdict === 'apply').sort((a, b) => b.index - a.index)) {
        s = s.slice(0, o.index) + o.american + s.slice(o.index + o.form.length)
      }
      if (s !== r.source) writeFileSync(join(ROOT, r.relPath), s)
    }
  }
  console.log(`\nTOTAL: ${Object.entries(totals).map(([k, v]) => `${k} ${v}`).join(', ')}${write ? ' — applied' : ' (dry run)'}`)
  return 0
}

/** Per-file comparison of <base> vs working tree. */
async function compare() {
  const files = []
  for (const f of await corpus(ROOT)) {
    const abs = join(ROOT, f.relPath)
    const cur = readFileSync(abs, 'utf8')
    const old = gitShow(BASE, f.relPath)
    let a, b
    if (f.scope.kind === 'chrome') {
      const fl = (s) => new Map(flattenJson(JSON.parse(s)).map((u) => [u.path, { text: u.text, cls: 'prose' }]))
      a = fl(old); b = fl(cur)
    } else {
      a = await leavesFromSource(old, f.relPath, f.scope)
      b = await leavesOf(await import(`${pathToFileURL(abs).href}?t=${Date.now()}`), f.scope)
    }
    files.push({ ...f, old, cur, a, b })
  }
  return files
}

async function checkMode() {
  const problems = []
  let changedLeaves = 0
  for (const f of await compare()) {
    const lines = f.cur.split('\n')
    for (const p of f.a.keys()) if (!f.b.has(p)) problems.push(`${f.relPath} ${p}: path vanished`)
    for (const [p, v] of f.b) {
      const was = f.a.get(p)
      if (!was) { problems.push(`${f.relPath} ${p}: new path`); continue }
      if (was.cls !== 'prose') {
        if (was.text !== v.text) problems.push(`${f.relPath} ${p}: ${was.cls} leaf changed`)
        continue
      }
      if (was.text !== v.text) {
        changedLeaves++
        const r = isSpellingOnly(was.text, v.text, cfg)
        if (!r.ok) problems.push(`${f.relPath} ${p}: not spelling-only (${r.reason})`)
      }
      const left = filterAllowed(checkText(v.text, cfg).filter((i) => i.rule === 'spelling'),
        { relPath: f.relPath, line: locateLine(f.cur, v.text), sourceLines: lines, cfg })
      for (const i of left) problems.push(`${f.relPath} ${p}: British form left — ${i.detail}`)
    }
  }
  for (const l of problems) console.error(l)
  console.log(`fix_spelling --check: ${changedLeaves} prose leaves changed vs ${BASE}, ${problems.length} problem(s)`)
  return problems.length ? 1 : 0
}

/* ------------------------------------------------------------ review -- */

const esc = (s) => s.replace(/\|/g, '\\|').replace(/\n/g, ' ')
function snippet(text, ranges) {
  const lo = Math.max(0, ranges[0][0] - 60)
  const hi = Math.min(text.length, ranges[ranges.length - 1][1] + 60)
  let out = lo ? '…' : ''
  let at = lo
  for (const [s, e] of ranges) { out += esc(text.slice(at, s)) + '**' + esc(text.slice(s, e)) + '**'; at = e }
  return out + esc(text.slice(at, hi)) + (hi < text.length ? '…' : '')
}
/** Word ranges that differ between two spelling-only variants. */
function diffRanges(a, b) {
  const ta = a.split(/([A-Za-z]+)/), tb = b.split(/([A-Za-z]+)/)
  const ra = [], rb = []
  let ia = 0, ib = 0
  for (let k = 0; k < ta.length; k++) {
    if (ta[k] !== tb[k]) { ra.push([ia, ia + ta[k].length]); rb.push([ib, ib + tb[k].length]) }
    ia += ta[k].length; ib += tb[k].length
  }
  return [ra, rb]
}

async function reviewMode(out) {
  const files = await compare()
  const changes = []          // { file, path, old, neu, diffs }
  const formCounts = {}
  const kept = []             // masked / marker exceptions in prose
  const outside = []          // British forms outside scope, current tree
  for (const f of files) {
    for (const [p, v] of f.b) {
      const was = f.a.get(p)
      if (was && was.cls === 'prose' && was.text !== v.text) {
        const r = isSpellingOnly(was.text, v.text, cfg)
        changes.push({ file: f.relPath, path: p, old: was.text, neu: v.text, diffs: r.diffs })
        for (const [o] of r.diffs) formCounts[o.toLowerCase()] = (formCounts[o.toLowerCase()] ?? 0) + 1
      }
      // whatever British-looking words remain, and why
      const re = spellingRegex(cfg)
      let m
      while ((m = re.exec(v.text))) {
        const row = { file: f.relPath, path: p, form: m[0], text: v.text, at: [m.index, m.index + m[0].length] }
        if (v.cls === 'prose') {
          const reason = maskReason(v.text, m.index, m[0].length, cfg)
          kept.push({ ...row, why: reason ?? 'inline `// plain-ok:` marker' })
        } else outside.push({ ...row, why: v.cls === 'verify' ? 'verify flag (dev-only)' : 'non-prose field' })
      }
    }
    if (f.scope.kind !== 'chrome') {
      // comments: occurrences in the source that are in no leaf at all
      const leafHits = [...f.b.values()].reduce((n, v) => n + (v.text.match(spellingRegex(cfg)) ?? []).length, 0)
      const srcHits = [...f.cur.matchAll(spellingRegex(cfg))]
      if (srcHits.length > leafHits) {
        const lines = f.cur.split('\n')
        for (const h of srcHits) {
          const ln = lineAt(f.cur, h.index)
          const line = lines[ln - 1]
          const col = h.index - f.cur.lastIndexOf('\n', h.index - 1) - 1
          const ci = line.indexOf('//')
          if (ci !== -1 && ci < col || /^\s*(\*|\/\*)/.test(line)) {
            outside.push({ file: f.relPath, path: `line ${ln} (comment)`, form: h[0], text: line.trim(), at: null, why: 'code comment' })
          }
        }
      }
    }
  }
  const byFile = new Map()
  for (const c of changes) { if (!byFile.has(c.file)) byFile.set(c.file, []); byFile.get(c.file).push(c) }
  const words = changes.reduce((n, c) => n + c.diffs.length, 0)
  const distinct = new Set(changes.map((c) => c.old)).size

  const L = []
  L.push('# usspelling — review file', '')
  L.push(`Generated by \`node scripts/fix_spelling.mjs --review\` against \`${BASE}\`. Plan: [usspelling.md](../usspelling.md).`, '')
  L.push('## (a) Summary', '')
  L.push(`- **${words} words changed** in **${changes.length} prose leaves** (${distinct} distinct English strings) across **${byFile.size} files**.`)
  L.push(`- **${kept.length} British forms kept** in prose as named exceptions (section c).`)
  L.push(`- **${outside.length} British forms left outside scope** (section d): non-prose fields, verify flags, code comments.`)
  L.push('', 'Per form (words changed, counted per prose path):', '')
  L.push('| Form | Count |', '|---|--:|')
  for (const [k, v] of Object.entries(formCounts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))) L.push(`| ${k} → ${cfg.spelling.map[k]} | ${v} |`)
  L.push('', `**Reconciliation with the planning-time inventory** (276 British occurrences in 252 prose units, counted per path). Here: ${words} changed + ${kept.length} kept = ${words + kept.length} occurrences in ${changes.length} + ${kept.length} = ${changes.length + kept.length} units. The difference of 3 occurrences / 3 units is \`counsellor\` ×2 and \`counsellors\` ×1 (Trinity Episcopal High School Placement): those forms were added to the map in Step 2 and were not in the planning count. Every other form matches it: programme 99 = 97 changed + 2 \`IB Diploma Programme\` kept; centre 10 = 9 + the Carmel \`Centre\` marker; mould and practising are the two kept exceptions. Counted per source occurrence, the fixer applied 273 in \`src/data\`; the 274th is the one hand edit in \`src/locales/en.json\`.`, '')
  L.push('## (b) Every change', '')
  for (const [file, cs] of byFile) {
    L.push(`### \`${file}\` — ${cs.reduce((n, c) => n + c.diffs.length, 0)}`, '', '| Path | Before → after |', '|---|---|')
    for (const c of cs) {
      const [ra, rb] = diffRanges(c.old, c.neu)
      L.push(`| \`${esc(c.path)}\` | ${snippet(c.old, ra)}<br>→ ${snippet(c.neu, rb)} |`)
    }
    L.push('')
  }
  L.push('## (c) Exceptions kept', '', '| File | Path | Form | Why | Context |', '|---|---|---|---|---|')
  for (const k of kept) L.push(`| \`${k.file}\` | \`${esc(k.path)}\` | ${k.form} | ${k.why} | ${snippet(k.text, [k.at])} |`)
  L.push('', '## (d) British forms left outside scope (not changed)', '')
  L.push('Listed so it is visible what was deliberately not touched. Also outside scope and not scanned here: `src/data/overlays/NOTES.md`, the `scripts/gen_data_schema.mjs` text behind `DATA-SCHEMA.md`, `source-material/**` and `src/content/**`.', '')
  L.push('| File | Path | Form | Why | Context |', '|---|---|---|---|---|')
  for (const k of outside) L.push(`| \`${k.file}\` | \`${esc(k.path)}\` | ${k.form} | ${k.why} | ${k.at ? snippet(k.text, [k.at]) : esc(k.text.slice(0, 140))} |`)
  L.push('', '## (e) Translations carried over', '', '_Filled by `scripts/i18n_restamp.mjs --report` in Step 11._', '')
  mkdirSync(dirname(resolve(ROOT, out)), { recursive: true })
  writeFileSync(resolve(ROOT, out), L.join('\n'))
  console.log(`review: ${words} words / ${changes.length} leaves / ${byFile.size} files changed; ${kept.length} kept; ${outside.length} outside scope → ${out}`)
  return 0
}

async function main() {
  if (args.includes('--check')) return checkMode()
  if (args.includes('--review')) return reviewMode(argOf('--review'))
  return dryRunOrWrite(args.includes('--write'))
}

main().then((c) => { process.exitCode = c }, (e) => { console.error(e); process.exitCode = 1 })
