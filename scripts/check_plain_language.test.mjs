/**
 * Tests for scripts/check_plain_language.mjs — run with `npm run test:plain`.
 * Unit cases import the pure functions; end-to-end cases spawn the script as
 * the PostToolUse hook against a throwaway fixture root (PLAIN_LANGUAGE_ROOT).
 */
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  loadConfig, checkText, sentences, fleschKincaid, normalize, wordsOf, scopeOf, filterAllowed,
  findBritish, toAmerican, isSpellingOnly, proseUnits,
} from './check_plain_language.mjs'

const SCRIPT = join(dirname(fileURLToPath(import.meta.url)), 'check_plain_language.mjs')
const cfg = loadConfig()
const rules = (text, c = cfg) => checkText(text, c).map((i) => i.rule)
const terms = (text) => checkText(text, cfg).filter((i) => i.rule === 'jargon').map((i) => i.term)

/* ---------------------------------------------------------- fixtures -- */

function fixtureRoot() {
  const root = mkdtempSync(join(tmpdir(), 'plainlang-test-'))
  mkdirSync(join(root, 'src/data/sportsPrograms'), { recursive: true })
  mkdirSync(join(root, 'src/locales'), { recursive: true })
  mkdirSync(join(root, 'src/components'), { recursive: true })
  return root
}

const tsModule = (fields) => `export const cannon = {\n${fields}\n}\n`
const CANNON = 'src/data/sportsPrograms/cannon.ts'

/** Write `post` to disk, then run the hook with an Edit payload old → new. */
function runEdit(root, relPath, post, oldString, newString, extra = {}) {
  writeFileSync(join(root, relPath), post)
  return runHook(root, {
    tool_name: 'Edit',
    tool_input: { file_path: join(root, relPath), old_string: oldString, new_string: newString, replace_all: false },
    tool_response: {},
    cwd: root,
    ...extra,
  })
}

function runHook(root, payload) {
  const t0 = performance.now()
  const r = spawnSync(process.execPath, [SCRIPT, '--hook'], {
    input: JSON.stringify(payload),
    env: { ...process.env, PLAIN_LANGUAGE_ROOT: root, CLAUDE_PLAIN_LANGUAGE: '' },
    encoding: 'utf8',
  })
  return { code: r.status, stderr: r.stderr, ms: performance.now() - t0 }
}

const MID = 'The school reviews each application with care. Families send transcripts, teacher letters, '
  + 'and an interview record before the January deadline. Decisions weigh academic preparation, '
  + 'character, and service, and families usually hear back by early March.'
const DENSE = 'Comprehensive institutional evaluation considers extracurricular participation, academic '
  + 'preparation, standardized examination performance, and recommendation quality. Administrative '
  + 'committees deliberate collaboratively regarding individual applicants, prioritizing intellectual '
  + 'curiosity, demonstrated leadership, and community contribution throughout the evaluation.'

/* ------------------------------------------------------------- units -- */

test('1. jargon caught', () => {
  assert.deepEqual(terms('Most graduates matriculate at UNC campuses.'), ['matriculation'])
})

test('2. explained jargon passes', () => {
  assert.deepEqual(checkText('Students learn about matriculation (where a student enrolls) in the fall.', cfg), [])
  assert.deepEqual(checkText('Most seniors enrolled (matriculated) at in-state schools.', cfg), [])
})

test('3. long sentence caught at 31+, not at 30', () => {
  const sentence = (n) => Array.from({ length: n }, (_, i) => (i ? 'word' : 'Word')).join(' ') + '.'
  assert.ok(rules(sentence(35)).includes('long'))
  assert.ok(!rules(sentence(30)).includes('long'))
})

test('4. clean passage passes', () => {
  const clean = 'The school day starts at 8 a.m. and ends at 3 p.m. Kids eat lunch in the big hall. '
    + 'Most teams practice after school. Buses run to four parts of town. Parents can pick up kids '
    + 'at the front gate. There is a snack at two. Homework is light in the early grades. Teachers '
    + 'send notes home each week.'
  assert.ok(wordsOf(normalize(clean)).length >= 55)
  assert.deepEqual(checkText(clean, cfg), [])
})

test('5. grade limit sits at maxGrade (12), not targetGrade (10)', () => {
  assert.ok(rules(DENSE).includes('grade'))
  const fk = fleschKincaid(normalize(MID))
  assert.ok(wordsOf(normalize(MID)).length >= 30)
  assert.ok(fk > 10 && fk <= 12, `MID scores ${fk}`)
  assert.deepEqual(rules(MID), [])
  const shortDense = 'Comprehensive institutional evaluation considers extracurricular participation, '
    + 'academic preparation, and standardized examination performance.'
  assert.ok(wordsOf(normalize(shortDense)).length < 30)
  assert.ok(!rules(shortDense).includes('grade'))
})

test('6. URLs and citations ignored; a link label is not', () => {
  assert.deepEqual(terms('See https://www.example.edu/rigor-pedagogy-yield for details.'), [])
  assert.deepEqual(terms('Tuition rose 4% (Source: Holistic Review Handbook, https://x.org/a).'), [])
  assert.deepEqual(terms('Read [the rigor page](https://x.org) first.'), ['rigor'])
})

test('7. quotes ignored', () => {
  assert.deepEqual(checkText('The school calls it “a rigorous, holistic pedagogy.”', cfg), [])
  assert.deepEqual(checkText('The school calls it "a rigorous, holistic pedagogy."', cfg), [])
})

test('8. sentence splitting', () => {
  assert.equal(sentences('Doors open at 7:30 a.m. on weekdays. Aftercare runs to 6 p.m.').length, 2)
  assert.equal(sentences('The GPA scale tops out at 4.33 for AP courses.').length, 1)
  assert.equal(sentences('Dr. Smith and St. Mary’s, e.g. the U.S. teams, joined.').length, 1)
})

test('9. out-of-scope files ignored', async () => {
  for (const p of [
    'src/components/Compare.tsx', 'src/data/overlays/admissions.es.json', 'src/locales/es.json',
    'src/content/sports/cannon.json', '.claude/plans/x.md', '.claude/docs/DATA-SCHEMA.md',
    'scripts/foo.mjs', 'src/data/sportsProgram.ts', 'source-material/sports/cannon/x.md',
  ]) assert.equal(await scopeOf(p), null, p)
  assert.equal((await scopeOf(CANNON)).kind, 'module')
  assert.equal((await scopeOf('src/data/courseOfferings.ts')).kind, 'accessor')
  assert.equal((await scopeOf('src/data/clubCatalog.ts')).kind, 'accessor')
  assert.equal((await scopeOf('src/locales/en.json')).kind, 'chrome')

  const root = fixtureRoot()
  try {
    const file = join(root, 'src/components/X.tsx')
    writeFileSync(file, 'export const X = () => "rigorous pedagogy"\n')
    const r = runHook(root, { tool_name: 'Write', tool_input: { file_path: file, content: '' }, tool_response: {}, cwd: root })
    assert.equal(r.code, 0)
    assert.equal(r.stderr, '')
    assert.ok(r.ms < 150, `took ${r.ms.toFixed(0)} ms`)
  } finally { rmSync(root, { recursive: true, force: true }) }
})

/* ------------------------------------------------------- end-to-end -- */

test('10. only changed text is checked', () => {
  const root = fixtureRoot()
  try {
    const headline = "  headline: 'Most graduates matriculate at UNC campuses.',"
    const pre = tsModule(`${headline}\n  subhead: 'Old subhead.',`)
    writeFileSync(join(root, CANNON), pre)
    let r = runEdit(root, CANNON, tsModule(`${headline}\n  subhead: 'Teams practice after school.',`),
      "subhead: 'Old subhead.'", "subhead: 'Teams practice after school.'")
    assert.equal(r.code, 0, r.stderr)
    r = runEdit(root, CANNON, tsModule(`${headline}\n  subhead: 'A rigorous schedule.',`),
      "subhead: 'Teams practice after school.'", "subhead: 'A rigorous schedule.'")
    assert.equal(r.code, 2)
    assert.match(r.stderr, /subhead/)
    assert.doesNotMatch(r.stderr, /headline/)
    assert.match(r.stderr, /jargon "rigor"/)
  } finally { rmSync(root, { recursive: true, force: true }) }
})

test('10b. originalFile in tool_response is used as the pre-edit source', () => {
  const root = fixtureRoot()
  try {
    const pre = tsModule("  headline: 'A rigorous schedule.',")
    const post = tsModule("  headline: 'A rigorous schedule.',\n  subhead: 'Clean text.',")
    writeFileSync(join(root, CANNON), post)
    const r = runHook(root, {
      tool_name: 'Write', tool_input: { file_path: join(root, CANNON), content: post },
      tool_response: { type: 'update', originalFile: pre }, cwd: root,
    })
    assert.equal(r.code, 0, r.stderr)
  } finally { rmSync(root, { recursive: true, force: true }) }
})

test('11. verify flags ignored; other flags are not', () => {
  const root = fixtureRoot()
  try {
    writeFileSync(join(root, CANNON), tsModule("  headline: 'Teams.',"))
    const flag = (kind) => `  flags: [{ kind: '${kind}', text: 'A rigorous pedagogy note.' }],`
    let r = runEdit(root, CANNON, tsModule(`  headline: 'Teams.',\n${flag('verify')}`),
      "  headline: 'Teams.',", `  headline: 'Teams.',\n${flag('verify')}`)
    assert.equal(r.code, 0, r.stderr)
    writeFileSync(join(root, CANNON), tsModule("  headline: 'Teams.',"))
    r = runEdit(root, CANNON, tsModule(`  headline: 'Teams.',\n${flag('gap')}`),
      "  headline: 'Teams.',", `  headline: 'Teams.',\n${flag('gap')}`)
    assert.equal(r.code, 2)
  } finally { rmSync(root, { recursive: true, force: true }) }
})

test('12. skip fields ignored', () => {
  const root = fixtureRoot()
  try {
    writeFileSync(join(root, CANNON), tsModule("  headline: 'Teams.',"))
    const r = runEdit(root, CANNON, tsModule("  headline: 'Teams.',\n  url: 'https://x.org/rigorous-pedagogy-matriculation',"),
      "  headline: 'Teams.',", "  headline: 'Teams.',\n  url: 'https://x.org/rigorous-pedagogy-matriculation',")
    assert.equal(r.code, 0, r.stderr)
  } finally { rmSync(root, { recursive: true, force: true }) }
})

test('13. allow mechanisms', () => {
  const root = fixtureRoot()
  try {
    writeFileSync(join(root, CANNON), tsModule("  headline: 'Teams.',"))
    const add = "  headline: 'Teams.',\n  // plain-ok: matriculation\n  subhead: 'Most graduates matriculate at UNC campuses.',"
    const r = runEdit(root, CANNON, tsModule(add), "  headline: 'Teams.',", add)
    assert.equal(r.code, 0, r.stderr)
  } finally { rmSync(root, { recursive: true, force: true }) }

  const issues = checkText('Matriculation outcomes', cfg)
  assert.equal(issues.length, 1)
  const allowCfg = { ...cfg, allow: [{ file: 'src/locales/en.json', key: 'metrics.matriculation', term: 'matriculation' }] }
  assert.deepEqual(filterAllowed(issues, { relPath: 'src/locales/en.json', unitPath: 'metrics.matriculation', cfg: allowCfg }), [])
  assert.equal(filterAllowed(issues, { relPath: 'src/locales/en.json', unitPath: 'metrics.other', cfg: allowCfg }).length, 1)
})

test('14. chrome: en.json edits', () => {
  const root = fixtureRoot()
  const EN = 'src/locales/en.json'
  try {
    const pre = JSON.stringify({ metrics: { a: 'Outcomes' } }, null, 2)
    writeFileSync(join(root, EN), pre)
    const post = pre.replace('"Outcomes"', '"Matriculation outcomes"')
    let r = runEdit(root, EN, post, '"Outcomes"', '"Matriculation outcomes"')
    assert.equal(r.code, 2)
    assert.match(r.stderr, /metrics\.a/)

    const post2 = JSON.stringify({ metrics: { a: 'Matriculation outcomes', b: 'Hello' } }, null, 2)
    r = runEdit(root, EN, post2, '"Matriculation outcomes"', '"Matriculation outcomes",\n    "b": "Hello"')
    assert.equal(r.code, 0, r.stderr)
  } finally { rmSync(root, { recursive: true, force: true }) }
})

test('15. fail open on a broken module', () => {
  const root = fixtureRoot()
  try {
    writeFileSync(join(root, CANNON), tsModule("  headline: 'Teams.',"))
    const r = runEdit(root, CANNON, "export const cannon = {\n  headline: 'Teams.\n", "'Teams.',", "'Teams.\n")
    assert.equal(r.code, 1, r.stderr)
  } finally { rmSync(root, { recursive: true, force: true }) }
})

test('16. ordinary English is not jargon', () => {
  assert.deepEqual(terms('The team directory yields roughly 65 players.'), [])
  assert.deepEqual(terms('She spent her formative years in Charlotte.'), [])
  assert.deepEqual(terms('The yield rate was 40%.'), ['yield rate'])
  assert.deepEqual(terms('Teachers use formative assessments weekly.'), ['formative assessment'])
})

/* ---------------------------------------------------------- spelling -- */

const brit = (text) => findBritish(text, cfg).map((h) => `${h.form}→${h.american}`)

test('17. findBritish: forms, case kept, hyphen boundary', () => {
  assert.deepEqual(brit('A summer programme.'), ['programme→program'])
  assert.deepEqual(brit('Programme fees'), ['Programme→Program'])
  assert.deepEqual(brit('PROGRAMME FEES'), ['PROGRAMME→PROGRAM'])
  assert.deepEqual(brit('Offers dual-enrolment courses.'), ['enrolment→enrollment'])
})

test('18. findBritish: American forms and lookalikes are not hits', () => {
  for (const w of ['enrolled', 'enrolling', 'theatre', 'theater', 'towards', 'dialogue', 'analyses', 'programmatic', 'program', 'enrollment']) {
    assert.deepEqual(brit(`The ${w} here.`), [], w)
  }
})

test('19. findBritish: quotes, URLs, link targets, citations and keep phrases are exempt', () => {
  assert.deepEqual(brit('The school calls it “a gap-year programme.”'), [])
  assert.deepEqual(brit('The school calls it "a gap-year programme."'), [])
  assert.deepEqual(brit('See https://x.org/programme-centre for more.'), [])
  assert.deepEqual(brit('Read [the programme page](https://x.org/programme) first.'), ['programme→program'])
  assert.deepEqual(brit('Fees rose (Source: school programme page).'), [])
  assert.deepEqual(brit('It offers the IB Diploma Programme.'), [])
  assert.deepEqual(brit('Taught by Stephanie Mould.'), [])
  assert.deepEqual(brit('The IB Diploma Programme is one programme of many.'), ['programme→program'])
})

test('20. toAmerican and isSpellingOnly', () => {
  const old = 'Enrolment opens; the programme centre is open.'
  const neu = toAmerican(old, cfg)
  assert.equal(neu, 'Enrollment opens; the program center is open.')
  const r = isSpellingOnly(old, neu, cfg)
  assert.equal(r.ok, true)
  assert.deepEqual(r.diffs, [['Enrolment', 'Enrollment'], ['programme', 'program'], ['centre', 'center']])
  assert.equal(isSpellingOnly(old, old, cfg).ok, true)
  assert.equal(isSpellingOnly('A programme.', 'A course.', cfg).ok, false)          // other word
  assert.equal(isSpellingOnly('A programme.', 'A programme!', cfg).ok, false)       // punctuation
  assert.equal(isSpellingOnly('A programme of 12.', 'A program of 13.', cfg).ok, false) // digit
  assert.equal(isSpellingOnly('A programme.', 'A Program.', cfg).ok, false)         // case outside pattern
  assert.equal(isSpellingOnly('A program.', 'A programme.', cfg).ok, false)         // wrong direction
})

test('21. filterAllowed: plain-ok marker and allow term for spelling', () => {
  const issues = checkText('Wofford, Agnes Scott, Centre', cfg)
  assert.deepEqual(issues.map((i) => i.rule), ['spelling'])
  const lines = ["  note: 'Wofford, Agnes Scott, Centre', // plain-ok: centre"]
  assert.deepEqual(filterAllowed(issues, { relPath: CANNON, unitPath: 'note', line: 1, sourceLines: lines, cfg }), [])
  const allowCfg = { ...cfg, allow: [{ file: CANNON, path: 'note', term: 'centre' }] }
  assert.deepEqual(filterAllowed(issues, { relPath: CANNON, unitPath: 'note', cfg: allowCfg }), [])
  assert.equal(filterAllowed(issues, { relPath: CANNON, unitPath: 'note', cfg }).length, 1)
})

test('22. proseUnits skips a verify flag holding a British form', () => {
  const units = proseUnits({ headline: 'Teams.', flags: [{ kind: 'verify', text: 'Check the programme page.' }] }, '', () => 'prose')
  assert.deepEqual(units.map((u) => u.text), ['Teams.'])
})

test('23. hook blocks a British form in prose; not in a quote, non-prose field or comment', () => {
  const root = fixtureRoot()
  try {
    const base = "  headline: 'Teams.',"
    const cases = [
      ["  subhead: 'A summer programme.',", 2],
      ["  subhead: 'It calls this “a summer programme.”',", 0],
      ["  url: 'https://x.org/summer-programme',", 0],
      ['  // a programme note', 0],
    ]
    for (const [line, want] of cases) {
      writeFileSync(join(root, CANNON), tsModule(base))
      const r = runEdit(root, CANNON, tsModule(`${base}\n${line}`), base, `${base}\n${line}`)
      assert.equal(r.code, want, `${line}: ${r.stderr}`)
      if (want === 2) assert.match(r.stderr, /British spelling "programme" → "program"/)
    }
  } finally { rmSync(root, { recursive: true, force: true }) }
})

test('24. --spelling gate exits 1 on a British form, 0 when clean', () => {
  const root = fixtureRoot()
  const gate = () => spawnSync(process.execPath, [SCRIPT, '--spelling'], {
    env: { ...process.env, PLAIN_LANGUAGE_ROOT: root }, encoding: 'utf8',
  })
  try {
    writeFileSync(join(root, 'src/locales/en.json'), JSON.stringify({ a: 'Hello' }))
    writeFileSync(join(root, CANNON), tsModule("  headline: 'A summer programme.',"))
    let r = gate()
    assert.equal(r.status, 1, r.stdout + r.stderr)
    assert.match(r.stderr, /sportsPrograms\/cannon\.ts:2 headline — "programme" → "program"/)
    writeFileSync(join(root, CANNON), tsModule("  headline: 'A summer program.',"))
    r = gate()
    assert.equal(r.status, 0, r.stdout + r.stderr)
    assert.match(r.stdout, /0 British forms/)
  } finally { rmSync(root, { recursive: true, force: true }) }
})
