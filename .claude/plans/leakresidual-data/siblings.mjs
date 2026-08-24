// Show how ONE locale treats the siblings of a given path prefix.
import { readFileSync, existsSync } from 'node:fs'
const [, , topic, lang, prefix] = process.argv
const p = `src/data/overlays/work/${topic}.${lang}.json`
if (!existsSync(p)) { console.error('no file', p); process.exit(2) }
const d = JSON.parse(readFileSync(p, 'utf8'))
const arr = d.strings ?? d.sections ?? []
for (const s of arr) {
  const at = s.at?.[0] ?? ''
  if (!at.includes(prefix)) continue
  const en = s.text ?? '', t = s.t ?? ''
  const mark = !t ? 'EMPTY ' : t === en ? 'KEPT  ' : 'TRANS '
  console.log(`${mark} ${at}`)
  console.log(`        en: ${JSON.stringify(en.slice(0, 110))}`)
  if (t && t !== en) console.log(`        ${lang}: ${JSON.stringify(t.slice(0, 110))}`)
}
