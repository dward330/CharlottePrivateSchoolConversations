// Path-level overlay replay: what resolved on main, and what resolves now.
// check:live cannot see a moved path (it tests stamps, not paths). This can.
//   mkdir <tmp>/main && git archive main | tar -x -C <tmp>/main
//   V=1 node .claude/plans/consistency3-data/path_replay.mjs <tmp>/main "$PWD" es
// Run per locale. Phase 2 is done when every locale prints TOTAL 0. Each topic's
// `control` must read n/n, or the replay itself is broken.
import { readFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { join } from 'node:path'
const [MAIN, HEAD, LANG = 'es'] = process.argv.slice(2)
const load = (root, rel) => import(pathToFileURL(join(root, rel)).href)
const L = await load(HEAD, 'scripts/i18n_topics.mjs')
const { stamp } = await load(HEAD, 'scripts/i18n_stamp.mjs')
const { classifyField } = await load(HEAD, 'scripts/i18n_fields.mjs')
async function english(root, topic) {
  const out = new Map()
  const walk = (node, path, school) => {
    if (typeof node === 'string') return void out.set(`${school}:${path}`, node)
    if (Array.isArray(node)) return node.forEach((v, i) => walk(v, `${path}[${i}]`, school))
    if (node && typeof node === 'object') for (const [k, v] of Object.entries(node)) walk(v, path ? `${path}.${k}` : k, school)
  }
  const a = L.ACCESSORS[topic]
  for (const [i, slug] of L.SLUGS.entries()) {
    if (a) {
      const x = (await load(root, a[0].replace('../', '')))[a[1]]
      if (typeof x === 'function') walk(x(slug), '', slug)
      else if (i === 0) walk(x, '', slug)
    } else {
      try { walk((await load(root, `src/data/${L.TOPICS[topic]}/${slug}.ts`))[L.EXPORTS[slug]], '', slug) }
      catch (e) { if (e.code !== 'ERR_MODULE_NOT_FOUND') throw e }
      for (const [prefix, rel, name] of L.EXTRA_LAYERS[topic] ?? []) walk((await load(root, rel.replace('../', '')))[name](slug), prefix, slug)
    }
  }
  return out
}
let T = { changed: 0, moved: 0 }
for (const topic of Object.keys(L.TOPICS)) {
  const index = new Map()
  const o = JSON.parse(readFileSync(join(HEAD, `src/data/overlays/${topic}.${LANG}.json`), 'utf8'))
  for (const e of o.strings) if (e.t) for (const at of e.at) index.set(at, e.of)
  const before = await english(MAIN, topic), after = await english(HEAD, topic)
  const ok = new Set([...before].filter(([p, s]) => index.get(p) === stamp(s)).map(([p]) => p))
  const known = new Set([...ok].map(p => `${p.split(':')[0]}|${before.get(p)}`))
  const changed = [], moved = []
  for (const [p, s] of after) {
    if (index.get(p) === stamp(s) || !s.trim()) continue
    if (known.has(`${p.split(':')[0]}|${s}`)) {
      if (before.get(p) === s && !ok.has(p)) continue // English on main too
      moved.push([p, s])
      continue
    }
    if (before.get(p) === s) continue // English on main too
    const [school, path] = [p.slice(0, p.indexOf(':')), p.slice(p.indexOf(':') + 1)]
    const leaf = path.replace(/(\[\d+\])+$/, '').split('.').pop()
    const c = classifyField(path.replace(/\[\d+\]/g, '[]'), leaf, s)
    const prose = c === true || c === 'prose' || c?.prose === true || c?.kind === 'prose' || c?.translate === true || c?.extract === true
    if (ok.has(p) || prose) changed.push([p, s])
  }
  T.changed += changed.length; T.moved += moved.length
  console.log(`${topic}: control ${ok.size}/${index.size} on main · changed/new ${changed.length} · moved ${moved.length}`)
  for (const [p, s] of moved) console.log('   MOVED', p, JSON.stringify(s.slice(0, 55)))
  if (process.env.V) for (const [p, s] of changed) console.log('   CHANGED', p, JSON.stringify(s.slice(0, 55)))
}
console.log('TOTAL', LANG, T, T.changed + T.moved)
