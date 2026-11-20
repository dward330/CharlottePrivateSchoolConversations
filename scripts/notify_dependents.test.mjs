/**
 * Tests for scripts/notify_dependents.mjs — run with
 * `node --test scripts/notify_dependents.test.mjs`. End-to-end cases spawn the
 * script as the PostToolUse hook against the real repo, with a throwaway
 * marker directory so "once per session" is testable.
 */
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { globToRegExp, courseSchoolAt, schoolsFor, loadRegistry, matches } from './notify_dependents.mjs'

const SCRIPT = join(dirname(fileURLToPath(import.meta.url)), 'notify_dependents.mjs')
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const COURSES = join(ROOT, 'src/data/courseOfferings.ts')

function runHook(payload, stateDir) {
  return spawnSync('node', [SCRIPT, '--hook'], {
    input: JSON.stringify(payload),
    encoding: 'utf8',
    env: { ...process.env, NOTIFY_DEPENDENTS_STATE_DIR: stateDir, CLAUDE_NOTIFY_DEPENDENTS: '' },
  })
}

/** A line of text that sits inside the PROVIDENCE_DAY block. */
function providenceDayText() {
  const src = readFileSync(COURSES, 'utf8')
  const i = src.indexOf('const PROVIDENCE_DAY: CourseOfferings')
  const m = src.slice(i).match(/title: 'AP German',/)
  assert.ok(m, 'fixture text inside PROVIDENCE_DAY')
  return m[0]
}

test('glob: ** spans directories, * stays in one segment', () => {
  assert.ok(globToRegExp('source-material/course-offerings/**').test('source-material/course-offerings/cannon/x.md'))
  assert.ok(!globToRegExp('src/data/*.ts').test('src/data/sportsPrograms/cannon.ts'))
  assert.ok(globToRegExp('src/data/*.ts').test('src/data/courseOfferings.ts'))
})

test('the registry fills course-offerings and matches its triggers', () => {
  const e = loadRegistry().find((x) => x.id === 'course-offerings')
  assert.ok(e && e.review.length && e.auto.length && e.commands.length)
  assert.ok(matches(e, 'src/data/courseOfferings.ts'))
  assert.ok(matches(e, 'source-material/course-offerings/providence-day/a.md'))
  assert.ok(!matches(e, 'src/data/metricValues.ts'))
})

test('the registry fills honor-societies: Clubs triggers, Arts review rows', () => {
  const e = loadRegistry().find((x) => x.id === 'honor-societies')
  assert.ok(e && e.review.length && e.commands.length)
  assert.ok(matches(e, 'src/data/clubsPrograms/cannon.ts'))
  assert.ok(matches(e, 'source-material/student-clubs/cannon/Cannon - Clubs - Honor Societies Web Check 2026.md'))
  assert.ok(!matches(e, 'src/data/artsPrograms/cannon.ts'))
  assert.ok(e.review.some((r) => r.file === 'src/data/artsPrograms/<slug>.ts'))
  assert.deepEqual(schoolsFor('src/data/clubsPrograms/charlotte-country-day.ts'), ['charlotte-country-day'])
  assert.deepEqual(schoolsFor('src/data/clubsPrograms/cannon.es.ts'), [])
})

test('hook: a Clubs edit names that school\'s Arts card', () => {
  const dir = mkdtempSync(join(tmpdir(), 'notify-dependents-test-'))
  try {
    const r = runHook(
      { session_id: 'h', tool_name: 'Edit', tool_input: { file_path: join(ROOT, 'src/data/clubsPrograms/cannon.ts'), old_string: 'a', new_string: 'b' } },
      dir,
    )
    assert.equal(r.status, 2, r.stderr)
    assert.match(r.stderr, /src\/data\/artsPrograms\/cannon\.ts/)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('school detection: nearest CourseOfferings const, and source-material paths', () => {
  const src = readFileSync(COURSES, 'utf8')
  assert.equal(courseSchoolAt(src, src.indexOf(providenceDayText())), 'providence-day')
  assert.equal(courseSchoolAt(src, src.indexOf('const CANNON: CourseOfferings') + 50), 'cannon')
  assert.deepEqual(schoolsFor('source-material/course-offerings/charlotte-latin/x.md'), ['charlotte-latin'])
  assert.deepEqual(schoolsFor('src/data/courseOfferings.ts', { text: providenceDayText() }), ['providence-day'])
})

test('hook: a course edit prints the school-specific list once per session, exit 2 then 0', () => {
  const dir = mkdtempSync(join(tmpdir(), 'notify-dependents-test-'))
  try {
    const payload = {
      session_id: 't',
      tool_name: 'Edit',
      tool_input: { file_path: COURSES, old_string: '…', new_string: providenceDayText() },
    }
    const first = runHook(payload, dir)
    assert.equal(first.status, 2, first.stderr)
    assert.match(first.stderr, /providence-day/)
    assert.match(first.stderr, /src\/data\/artsPrograms\/providence-day\.ts/)
    assert.match(first.stderr, /src\/data\/collegeSupportPrograms\/providence-day\.ts/)
    assert.match(first.stderr, /npm run check:consistency/)
    const second = runHook(payload, dir)
    assert.equal(second.status, 0)
    assert.equal(second.stderr, '')
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('hook: an unrelated file is silent', () => {
  const dir = mkdtempSync(join(tmpdir(), 'notify-dependents-test-'))
  try {
    const r = runHook(
      { session_id: 'u', tool_name: 'Edit', tool_input: { file_path: join(ROOT, 'src/data/metricValues.ts'), old_string: 'a', new_string: 'b' } },
      dir,
    )
    assert.equal(r.status, 0)
    assert.equal(r.stderr, '')
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('hook: CLAUDE_NOTIFY_DEPENDENTS=off disables it', () => {
  const dir = mkdtempSync(join(tmpdir(), 'notify-dependents-test-'))
  try {
    const r = spawnSync('node', [SCRIPT, '--hook'], {
      input: JSON.stringify({ session_id: 'v', tool_name: 'Edit', tool_input: { file_path: COURSES, new_string: providenceDayText() } }),
      encoding: 'utf8',
      env: { ...process.env, NOTIFY_DEPENDENTS_STATE_DIR: dir, CLAUDE_NOTIFY_DEPENDENTS: 'off' },
    })
    assert.equal(r.status, 0)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})
