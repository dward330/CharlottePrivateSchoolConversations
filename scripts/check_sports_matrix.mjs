#!/usr/bin/env node
// check:sportsmatrix — guards the Compare page's computed "Sports offered" group
// (src/lib/sportsMatrix.ts).
//
// The group's rows are computed at render from each comparable school's Sports
// Offered card through an explicit raw-name → sport alias table. A spelling the
// table does not know is NOT rendered, so a new school's new spelling would make
// its sport silently vanish from Compare. This check is what makes that loud.
//
//   exit 1  a raw sport name on a comparable school that SPORT_ALIASES lacks
//   exit 1  a SportKey with no `sports.cup.sport_<key>` key in src/locales/en.json
//   exit 0  (reported) a level mixing gendered and ungendered entries, and alias
//           entries no school uses
//
// It imports the per-school src/data/sportsPrograms/*.ts files directly, never
// the src/data/sportsProgram.ts registry, which uses import.meta.glob and cannot
// load under plain Node.

import { readFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import path from 'node:path'

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const imp = (rel) => import(pathToFileURL(path.join(ROOT, rel)).href)

export async function loadComparableOffered() {
  const manifest = JSON.parse(readFileSync(path.join(ROOT, 'src/data/schools.json'), 'utf8'))
  const { BRANDS } = await imp('src/data/brands.ts')
  const slugs = manifest.schools.map((s) => s.slug).filter((slug) => BRANDS[slug]?.hasHighSchool !== false)
  const offered = {}
  for (const slug of slugs) {
    let mod
    try {
      mod = await imp(`src/data/sportsPrograms/${slug}.ts`)
    } catch (e) {
      if (e.code === 'ERR_MODULE_NOT_FOUND') {
        offered[slug] = undefined
        continue
      }
      throw e
    }
    const program = Object.values(mod).find((v) => v && typeof v === 'object' && 'offered' in v)
    offered[slug] = program?.offered
  }
  return { slugs, offered }
}

async function main() {
  const { buildSportsMatrix, SPORT_ALIASES, SPORT_KEYS } = await imp('src/lib/sportsMatrix.ts')
  const { slugs, offered } = await loadComparableOffered()
  const m = buildSportsMatrix(offered)
  const en = JSON.parse(readFileSync(path.join(ROOT, 'src/locales/en.json'), 'utf8'))
  let failed = false

  for (const u of m.unmapped) {
    console.error(`✗ ${u.slug}: sport name "${u.name}" is not in SPORT_ALIASES. Add it to SPORT_ALIASES in src/lib/sportsMatrix.ts.`)
    failed = true
  }
  for (const key of SPORT_KEYS) {
    if (typeof en.sports?.cup?.[`sport_${key}`] !== 'string') {
      console.error(`✗ SportKey "${key}" has no sports.cup.sport_${key} in src/locales/en.json.`)
      failed = true
    }
  }

  for (const x of m.mixed) {
    console.log(`• review: ${x.slug} ${x.key} ${x.level} mixes gendered and ungendered entries (shows the known genders only).`)
  }
  const used = new Set()
  for (const slug of slugs) for (const s of offered[slug]?.seasons ?? []) for (const e of s.sports) used.add(e.name)
  const unusedAliases = Object.keys(SPORT_ALIASES).filter((n) => !used.has(n))
  for (const n of unusedAliases) console.log(`• alias "${n}" is used by no comparable school.`)

  const na = slugs.filter((s) => !offered[s])
  console.log(`check:sportsmatrix — ${slugs.length} comparable schools, ${m.rows.length} sport rows${na.length ? `, N/A: ${na.join(', ')}` : ''}`)
  for (const r of m.rows) console.log(`  ${r.key.padEnd(15)} ${String(r.count).padStart(2)}/${slugs.length}  ${r.seasons.join(' · ')}`)

  if (failed) {
    console.error('check:sportsmatrix FAILED')
    process.exit(1)
  }
  console.log('check:sportsmatrix OK')
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) await main()
