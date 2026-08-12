#!/usr/bin/env node
// Every render site that can emit a baked $ figure must go through
// localizeMoneyText().
//
// WHY THIS EXISTS
// ---------------
// The research data authors money US-style ("$36,325", "$3.68M") and
// localizeMoneyText() converts it at render time. That only works if EVERY path
// to the screen calls it. Three separate paths have been found not calling it,
// each by a print-out rather than by a checker:
//
//   fr round 1 — RichText in AfterSchool/CollegeSupport/FinancialAidReport
//                rendered card prose verbatim, so a coverage bar read
//                "1 725 $US/sem" while the callout beside it read "$1,725".
//   fr round 2 — SchoolDetail's topic-header stat tiles rendered
//                `vm.values[slug]` raw, so "$3.68M" sat above a financial-aid
//                report showing "3 683 971 $US". The most visible element on
//                every school page, and Compare.tsx had localized the SAME data
//                correctly all along.
//
// Every instance is invisible to English readers, which is why none of them
// surfaced until a non-English print-out. This grep is crude but it is the only
// check that can see a NEW render site the moment someone adds one.
//
//   node scripts/check_money_render_paths.mjs

import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname
const DIRS = ['src/components', 'src/pages']

// A JSX expression whose identifier suggests it holds a figure.
const SUSPECT =
  /\{([a-zA-Z_$][\w.$[\]'"]*(?:value|price|fee|amount|val|total|cost|figure)[\w.$[\]'"]*)\}/gi

// Already-safe: the line localizes, or formats numerically, or the expression is
// plainly not a scalar figure.
// A React `key=` is React bookkeeping, never DOM text, so a figure inside one
// cannot reach a reader unlocalized. SummerPrograms keys its catalog rows by
// `${c.name}|${c.price}|${c.hours}` — a school can list the same camp twice at
// different terms, so the price is what disambiguates them — and the visible
// cell a few lines below is `localizeMoneyText(c.price)`, which this check does
// still see. Matched structurally rather than by expression text so the next
// composite key is not a fresh false positive.
const SAFE_LINE = /localizeMoneyText|money\(|number\(|winPct|\skey=\{/
const NOT_A_FIGURE = /\.length|\.map|\.filter|Boolean|=>|COMPONENT_GLYPH/

/**
 * Fields verified by hand to never hold a `$` figure in src/data/**. Listed so a
 * genuinely new site stands out instead of hiding in known noise — the same
 * posture as REVIEWED_SKIPS in i18n_audit_skips.mjs.
 */
const REVIEWED = new Set([
  'data.stats',        // passed to StatStrip/Stats, which localize internally
  'p.valueLabel',      // "hours to be inducted · since 1997-98"
  's.feedsFrom',       // "the classroom", "social studies"
  'data.collegesTotal', // "300 institutions · bold = …"
  'c.status',          // an enum key, not a value

  // PROP HAND-OFFS, not render sites. These pass a string into TuitionChart /
  // RangeChart / Ladder, which localize it themselves — wrapping here too would
  // double-apply. The receiving components are the render sites, and they are
  // covered by this check.
  'section.figureCaption',
  'section.figureNote',
  'section.figureNote2',
])

let flagged = 0
let scanned = 0

for (const dir of DIRS) {
  for (const file of readdirSync(join(ROOT, dir)).filter((f) => f.endsWith('.tsx'))) {
    const path = join(ROOT, dir, file)
    const lines = readFileSync(path, 'utf8').split('\n')
    lines.forEach((line, i) => {
      if (SAFE_LINE.test(line)) return
      for (const m of line.matchAll(SUSPECT)) {
        const expr = m[1]
        if (NOT_A_FIGURE.test(expr) || REVIEWED.has(expr)) continue
        scanned++
        flagged++
        console.error(`\n✗ ${dir}/${file}:${i + 1}  {${expr}}`)
        console.error(`    ${line.trim().slice(0, 110)}`)
      }
    })
  }
}

if (flagged) {
  console.error(
    `\n${flagged} render site(s) may emit a baked $ figure without localizing it.\n` +
      'If the field can hold "$36,325"-style text, wrap it in localizeMoneyText().\n' +
      'If it provably cannot, add the expression to REVIEWED in this script with\n' +
      'a note on what its values actually look like.',
  )
  process.exit(1)
}

console.log('✓ every money-capable render site localizes (or is reviewed)')
