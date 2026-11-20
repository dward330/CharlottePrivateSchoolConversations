#!/usr/bin/env node
/**
 * notify_dependents — when a data source is edited, say what else is built from
 * it or restates it, so the editor updates those too.
 *
 * WHY. Course facts live in src/data/courseOfferings.ts, but the same facts are
 * typed again in Compare cells, the Arts and College Support cards, Global
 * Exposure and older source records. Re-sourcing Providence Day's courses
 * (plan `consistency`, 2026-11-20) touched eleven of those places, and nothing
 * told the editor where they were. The list now lives in one registry,
 * scripts/data_dependents.json, and this script prints the relevant entry.
 *
 * Modes:
 *   --hook          PostToolUse hook (Edit|Write|MultiEdit). Reads the Claude Code
 *                   payload on stdin. When `tool_input.file_path` matches an
 *                   entry's `triggers`, it works out the school, prints the
 *                   entry's review / auto / commands lists to stderr and exits 2,
 *                   so Claude Code shows the message to the model. The edit is
 *                   never blocked. It prints once per session per entry and
 *                   school (a marker file in os.tmpdir(), keyed by session_id),
 *                   so a long refresh is not nagged on every edit. Unmatched
 *                   files exit 0 silently; internal errors exit 1 (non-blocking).
 *                   CLAUDE_NOTIFY_DEPENDENTS=off disables it.
 *   --since <ref>   CLI form (`npm run dependents`, default ref `main`): lists the
 *                   registered triggers changed against <ref> (committed and
 *                   uncommitted) and prints each matching entry once. Exit 0.
 *
 * The school comes from a `source-material/<topic>/<slug>/` path, or, for
 * src/data/courseOfferings.ts, from the nearest `const <NAME>: CourseOfferings`
 * above the edited text, mapped through that file's OFFERINGS table.
 *
 * Test hooks: NOTIFY_DEPENDENTS_ROOT (repo root) and NOTIFY_DEPENDENTS_STATE_DIR
 * (marker directory). Tests: node --test scripts/notify_dependents.test.mjs
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { join, relative, dirname, isAbsolute } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = process.env.NOTIFY_DEPENDENTS_ROOT ?? join(dirname(fileURLToPath(import.meta.url)), '..')
const STATE_DIR = process.env.NOTIFY_DEPENDENTS_STATE_DIR ?? tmpdir()

export function loadRegistry(root = ROOT) {
  return JSON.parse(readFileSync(join(root, 'scripts/data_dependents.json'), 'utf8')).entries
}

/** A minimal glob: `**` spans directories, `*` stays within one segment. */
export function globToRegExp(glob) {
  let re = ''
  for (let i = 0; i < glob.length; i++) {
    const c = glob[i]
    if (c === '*' && glob[i + 1] === '*') {
      re += '.*'
      i++
    } else if (c === '*') re += '[^/]*'
    else re += c.replace(/[.+?^${}()|[\]\\]/g, '\\$&')
  }
  return new RegExp(`^${re}$`)
}

export const matches = (entry, rel) => entry.triggers.some((g) => globToRegExp(g).test(rel))

/** const NAME → slug, from courseOfferings.ts's OFFERINGS table. */
function offeringsTable(src) {
  const block = src.slice(src.indexOf('const OFFERINGS'))
  const map = {}
  for (const m of block.matchAll(/^\s*'?([a-z-]+)'?:\s*([A-Z_]+),/gm)) map[m[2]] = m[1]
  return map
}

/** The school whose `const <NAME>: CourseOfferings` block holds character `pos`. */
export function courseSchoolAt(src, pos) {
  let name = null
  for (const m of src.matchAll(/^const ([A-Z_]+): CourseOfferings = \{/gm)) {
    if (m.index <= pos) name = m[1]
    else break
  }
  return name ? (offeringsTable(src)[name] ?? null) : null
}

/** Schools an edit touched in `rel`; [] when it cannot tell (then the generic list prints). */
export function schoolsFor(rel, { text, lines } = {}, root = ROOT) {
  const sm = rel.match(/^source-material\/[^/]+\/([^/]+)\//)
  if (sm) return sm[1].startsWith('_') ? [] : [sm[1]]
  if (rel === 'src/data/courseOfferings.ts') {
    let src
    try {
      src = readFileSync(join(root, rel), 'utf8')
    } catch {
      return []
    }
    const out = new Set()
    if (text) {
      const i = src.indexOf(text)
      if (i >= 0) {
        const s = courseSchoolAt(src, i)
        if (s) out.add(s)
      }
    }
    if (lines) {
      const starts = [0]
      for (let i = 0; i < src.length; i++) if (src[i] === '\n') starts.push(i + 1)
      for (const ln of lines) {
        const s = courseSchoolAt(src, starts[Math.max(0, ln - 1)] ?? src.length)
        if (s) out.add(s)
      }
    }
    return [...out]
  }
  return []
}

export function render(entry, slugs) {
  const fill = (s, slug) => (slug ? s.replaceAll('<slug>', slug) : s)
  const out = []
  const who = slugs.length ? ` — ${slugs.join(', ')}` : ''
  out.push(`data dependents: you edited ${entry.title}${who}.`)
  // A per-school path is listed once per school; a shared file once.
  const files = (f) => (f.includes('<slug>') && slugs.length ? slugs.map((s) => fill(f, s)).join(', ') : f)
  out.push('Typed restatements to check and edit by hand:')
  for (const r of entry.review) out.push(`  • ${files(r.file)} — ${r.field}. ${r.why}.`)
  out.push('Computed from it (confirm they still look right):')
  for (const a of entry.auto) out.push(`  • ${files(a.file)} — ${a.what}`)
  out.push('Run:')
  for (const c of entry.commands) out.push(`  $ ${c}`)
  out.push('Registry: scripts/data_dependents.json (add any new derived consumer there in the same PR).')
  return out.join('\n')
}

/* ------------------------------------------------------------- hook -- */

function seen(sessionId, key) {
  const file = join(STATE_DIR, `notify-dependents-${String(sessionId).replace(/[^\w.-]/g, '_')}.json`)
  let done = []
  try {
    done = JSON.parse(readFileSync(file, 'utf8'))
  } catch {
    /* first notice this session */
  }
  if (done.includes(key)) return true
  done.push(key)
  if (!existsSync(STATE_DIR)) mkdirSync(STATE_DIR, { recursive: true })
  writeFileSync(file, JSON.stringify(done))
  return false
}

function hook(raw) {
  if (process.env.CLAUDE_NOTIFY_DEPENDENTS === 'off') return 0
  const payload = JSON.parse(raw || '{}')
  const input = payload.tool_input ?? {}
  const abs = input.file_path
  if (typeof abs !== 'string') return 0
  const rel = (isAbsolute(abs) ? relative(ROOT, abs) : abs).split('\\').join('/')
  const entries = loadRegistry().filter((e) => matches(e, rel))
  if (!entries.length) return 0
  const text =
    input.new_string ??
    (Array.isArray(input.edits) ? input.edits.map((e) => e.new_string).find(Boolean) : undefined)
  const slugs = schoolsFor(rel, { text })
  const blocks = []
  for (const e of entries) {
    const key = `${e.id}:${slugs.join(',') || '*'}`
    if (seen(payload.session_id ?? 'no-session', key)) continue
    blocks.push(render(e, slugs))
  }
  if (!blocks.length) return 0
  process.stderr.write(blocks.join('\n\n') + '\n')
  return 2
}

/* ------------------------------------------------------------ --since -- */

function since(ref) {
  const git = (args) => execFileSync('git', args, { cwd: ROOT, encoding: 'utf8' })
  const changed = git(['diff', '--name-only', ref]).split('\n').filter(Boolean)
  const untracked = git(['ls-files', '--others', '--exclude-standard']).split('\n').filter(Boolean)
  const files = [...new Set([...changed, ...untracked])]
  const entries = loadRegistry()
  let printed = 0
  for (const e of entries) {
    const hits = files.filter((f) => matches(e, f))
    if (!hits.length) continue
    const slugs = new Set()
    for (const f of hits) {
      let lines
      if (f === 'src/data/courseOfferings.ts') {
        const diff = git(['diff', '-U0', ref, '--', f])
        lines = [...diff.matchAll(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/gm)].map((m) => Number(m[1]))
      }
      for (const s of schoolsFor(f, { lines })) slugs.add(s)
    }
    console.log(`${render(e, [...slugs].sort())}\n  (changed against ${ref}: ${hits.join(', ')})\n`)
    printed++
  }
  if (!printed) console.log(`data dependents: no registered data source changed against ${ref}.`)
  return 0
}

/* ---------------------------------------------------------------- main -- */

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]
if (isMain) {
  const args = process.argv.slice(2)
  try {
    if (args.includes('--since')) {
      process.exit(since(args[args.indexOf('--since') + 1] ?? 'main'))
    } else {
      let raw = ''
      process.stdin.setEncoding('utf8')
      process.stdin.on('data', (d) => (raw += d))
      process.stdin.on('end', () => {
        try {
          process.exit(hook(raw))
        } catch (e) {
          process.stderr.write(`notify_dependents: internal error (non-blocking): ${e.message}\n`)
          process.exit(1)
        }
      })
    }
  } catch (e) {
    process.stderr.write(`notify_dependents: internal error (non-blocking): ${e.message}\n`)
    process.exit(args.includes('--since') ? 0 : 1)
  }
}
