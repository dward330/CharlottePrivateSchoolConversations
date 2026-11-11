#!/usr/bin/env node
/**
 * check:flags — every component filters evidence flags through ONE rule, so the
 * plain-language checker skips exactly what never renders (plan plainsmall).
 *
 * WHY THIS EXISTS. scripts/check_plain_language.mjs skips prose no parent sees:
 * `verify` flags (dev-only) and, per topic, the flag kinds a card hides
 * (Student Clubs' GAP and COUNT). That skip list and the components' filters
 * used to be two copies — ClubsProgram.tsx hard-coded
 * `flags.filter((f) => f.kind === 'not-a-club')` while the checker counted every
 * kind. Now both read src/lib/flagVisibility.ts. This check makes that the only
 * way: if a component could filter flags on its own, it could start rendering a
 * kind the checker skips, and the checker would go blind to it silently.
 *
 * Asserts:
 *   1. ONE FILTER. Every src/components/*.tsx that imports a flag type from
 *      src/data (`AsFlag`, `CsFlag`, `SuFlag`, `ClubsFlag`, … — `\w*Flag` in an
 *      `import type { … } from '../data/…'`) calls `visibleFlags(`.
 *   2. KNOWN TOPIC. Every `visibleFlags(` call in src/components has a
 *      string-literal first argument that is a TOPICS key (scripts/i18n_topics.mjs).
 *   3. NO LITERAL KIND COMPARE. Those flag-importing files never compare `.kind`
 *      to a string literal, or test `[…].includes(x.kind)` — such a filter
 *      belongs in flagVisibility.ts, where the checker reads it.
 *   4. THE HIDDEN LIST IS LIVE. Every HIDDEN_FLAG_KINDS key is a topic some
 *      component passes to visibleFlags, and every kind it lists is a member of
 *      that topic's flag-kind union (UNION_TYPES below), so a renamed or deleted
 *      kind cannot leave a dead entry.
 *   5. ONE COPY. No file under src/ or scripts/ other than
 *      src/lib/flagVisibility.ts declares HIDDEN_FLAG_KINDS or DEV_ONLY_FLAG_KINDS.
 *
 * Exit 1 names each file:line and what to do; exit 0 prints one summary line.
 * FLAG_VIS_ROOT overrides the repo root (the node:test fixtures use it); TOPICS
 * always comes from this script's own scripts/ directory.
 *
 * Run via `npm run check:flags` (chained into `npm run build`).
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { TOPICS } from './i18n_topics.mjs'

const HERE = dirname(fileURLToPath(import.meta.url))
const ROOT = process.env.FLAG_VIS_ROOT || join(HERE, '..')
const RULE_FILE = 'src/lib/flagVisibility.ts'

/** topic -> [registry file, flag-kind union type]. Needed only for HIDDEN_FLAG_KINDS keys. */
const UNION_TYPES = {
  'student-clubs': ['src/data/clubsProgram.ts', 'FlagKind'],
  'after-school': ['src/data/afterSchool.ts', 'AsFlagKind'],
  'summer-programs': ['src/data/summerPrograms.ts', 'SuFlagKind'],
  'college-support': ['src/data/collegeSupport.ts', 'CsFlagKind'],
  'high-school-placement': ['src/data/collegeSupport.ts', 'CsFlagKind'],
}

const FIX = `filter flags through visibleFlags('<topic>', flags) (src/lib/toVerify.ts), and put any kind rule in ${RULE_FILE} so check_plain_language.mjs sees the same rule`
const failures = []
const fail = (file, line, msg) => failures.push(`${file}${line ? `:${line}` : ''} — ${msg}`)
const lineOf = (src, index) => src.slice(0, index).split('\n').length

const compDir = join(ROOT, 'src/components')
const components = existsSync(compDir) ? readdirSync(compDir).filter((f) => f.endsWith('.tsx')).sort() : []

const FLAG_IMPORT = /import\s+type\s*\{([^}]*)\}\s*from\s*['"]\.\.\/data\/[^'"]+['"]/g
const LITERAL_KIND = /\.kind\s*[!=]==?\s*['"]|\[\s*['"][\w-]+['"](?:\s*,\s*['"][\w-]+['"])*\s*\]\.includes\(\s*\w+\.kind\b/g
const CALL = /\bvisibleFlags\(\s*([^,)]*)/g

const usedTopics = new Set()
let flagFiles = 0, calls = 0
for (const f of components) {
  const rel = `src/components/${f}`
  const src = readFileSync(join(compDir, f), 'utf8')
  const importsFlag = [...src.matchAll(FLAG_IMPORT)].some((m) => /\b\w*Flag\b/.test(m[1]))
  for (const m of src.matchAll(CALL)) {
    calls++
    const arg = m[1].trim()
    const lit = /^(['"])([\w-]+)\1$/.exec(arg)
    if (!lit) fail(rel, lineOf(src, m.index), `visibleFlags() first argument must be a topic slug string literal, got \`${arg || '(none)'}\` — ${FIX}`)
    else if (!(lit[2] in TOPICS)) fail(rel, lineOf(src, m.index), `visibleFlags('${lit[2]}') — "${lit[2]}" is not a topic in scripts/i18n_topics.mjs TOPICS`)
    else usedTopics.add(lit[2])
  }
  if (!importsFlag) continue
  flagFiles++
  if (!/\bvisibleFlags\(/.test(src)) fail(rel, null, `imports a flag type but never calls visibleFlags() — ${FIX}`)
  for (const m of src.matchAll(LITERAL_KIND)) fail(rel, lineOf(src, m.index), `compares a flag's .kind to a literal (\`${m[0].trim()}\`) — ${FIX}`)
}

/* 4 — the hidden list is live. */
const ruleAbs = join(ROOT, RULE_FILE)
let HIDDEN = {}
if (!existsSync(ruleAbs)) fail(RULE_FILE, null, 'missing — it is the single source of which flag kinds render')
else HIDDEN = (await import(pathToFileURL(ruleAbs).href)).HIDDEN_FLAG_KINDS ?? {}
for (const [topicKey, kinds] of Object.entries(HIDDEN)) {
  if (!(topicKey in TOPICS)) { fail(RULE_FILE, null, `HIDDEN_FLAG_KINDS key "${topicKey}" is not a topic in TOPICS`); continue }
  if (!usedTopics.has(topicKey)) fail(RULE_FILE, null, `HIDDEN_FLAG_KINDS["${topicKey}"] is used by no component — no visibleFlags('${topicKey}', …) call exists, so the hidden kinds may be rendering unfiltered`)
  const spec = UNION_TYPES[topicKey]
  if (!spec) { fail(RULE_FILE, null, `HIDDEN_FLAG_KINDS["${topicKey}"]: add the topic's flag-kind union to UNION_TYPES in scripts/check_flag_visibility.mjs`); continue }
  const [file, type] = spec
  const abs = join(ROOT, file)
  const src = existsSync(abs) ? readFileSync(abs, 'utf8') : ''
  const m = new RegExp(`export\\s+type\\s+${type}\\s*=\\s*([^\\n]+)`).exec(src)
  if (!m) { fail(file, null, `type ${type} not found (UNION_TYPES["${topicKey}"] in scripts/check_flag_visibility.mjs is stale)`); continue }
  const members = new Set([...m[1].matchAll(/['"]([\w-]+)['"]/g)].map((x) => x[1]))
  for (const k of kinds) if (!members.has(k)) fail(RULE_FILE, null, `HIDDEN_FLAG_KINDS["${topicKey}"] lists "${k}", which is not a member of ${type} in ${file} — a renamed or deleted kind leaves a dead entry`)
}

/* 5 — one copy. */
const DECL = /\b(?:const|let|var)\s+(HIDDEN_FLAG_KINDS|DEV_ONLY_FLAG_KINDS)\b/g
const walk = (dir, out = []) => {
  if (!existsSync(dir)) return out
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name.startsWith('.')) continue
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (/\.(?:ts|tsx|mjs|js)$/.test(name) && !/\.test\.mjs$/.test(name)) out.push(p)
  }
  return out
}
for (const abs of [...walk(join(ROOT, 'src')), ...walk(join(ROOT, 'scripts'))]) {
  const rel = relative(ROOT, abs).split('\\').join('/')
  if (rel === RULE_FILE || rel === 'scripts/check_flag_visibility.mjs') continue
  if (rel.startsWith('src/data/overlays/')) continue
  const src = readFileSync(abs, 'utf8')
  for (const m of src.matchAll(DECL)) fail(rel, lineOf(src, m.index), `declares its own ${m[1]} — import it from ${RULE_FILE} instead`)
}

if (failures.length) {
  for (const l of failures) console.error(l)
  console.error(`check:flags: ${failures.length} problem(s). Flag visibility must be decided only in ${RULE_FILE} (plan plainsmall).`)
  process.exit(1)
}
console.log(`check:flags: ${flagFiles} flag-rendering component(s), ${calls} visibleFlags() call(s), hidden kinds ${JSON.stringify(HIDDEN)} — all filtered through ${RULE_FILE}`)
