#!/usr/bin/env node
// siblingtail2 — measure the parenthetical-modifier convention per locale.
//
// Class: course titles of the shape `<Head Noun> (<modifier>)` in course-offerings.
// A modifier that is a bare code (AP, MS, AP-BC, IB, US, HS) is excluded: those are
// searchable identifiers every locale keeps by rule, and including them dilutes the
// measurement toward "nobody translates these".
//
// The decisive column is HEAD-NOUN. A locale that translates the head noun zero times
// has a convention; a lone exception among many is a leak. Run from the repo root.
import fs from 'node:fs';

const LANGS = ['es', 'bn', 'ht', 'te', 'fr', 'fa', 'it', 'hi', 'ar'];
const CODE = /^(AP|AP-[\w]+|MS|US|HS|IB)$/;
const SHAPE = /^([A-Z][A-Za-z&/\- ]+)\(([^)]+)\)$/;

const rows = [];
for (const lang of LANGS) {
  const d = JSON.parse(fs.readFileSync(`src/data/overlays/work/course-offerings.${lang}.json`, 'utf8'));
  let head = 0, parenOnly = 0, kept = 0, total = 0;
  const heads = [];
  for (const e of d.strings) {
    const t = e.text ?? '';
    const m = SHAPE.exec(t);
    if (!m || CODE.test(m[2].trim())) continue;
    total++;
    const tr = e.t ?? '';
    if (tr === t) { kept++; continue; }
    if (tr.startsWith(m[1].trim())) parenOnly++;
    else { head++; heads.push([t, tr]); }
  }
  rows.push({ lang, total, kept, parenOnly, head, heads });
}

console.log('parenthetical-modifier course titles (bare codes excluded)\n');
console.log('  lang  total  kept  paren-only  HEAD-NOUN');
for (const r of rows) {
  console.log(`  ${r.lang.padEnd(4)}  ${String(r.total).padStart(5)}  ${String(r.kept).padStart(4)}  ${String(r.parenOnly).padStart(10)}  ${String(r.head).padStart(9)}`);
}
console.log('\nhead-noun translations, listed (these are the rows on trial):');
for (const r of rows) {
  for (const [en, tr] of r.heads) console.log(`  ${r.lang}: ${JSON.stringify(en)} -> ${JSON.stringify(tr)}`);
}
console.log('\nA locale at HEAD-NOUN=0 keeps head nouns by convention.');
console.log('Compare against `git show 569a9bd^:...` to see the pre-PR-#200 baseline.');
