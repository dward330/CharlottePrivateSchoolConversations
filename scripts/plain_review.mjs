#!/usr/bin/env node
/**
 * Plain-language review generator — the before/after file and mechanical
 * guards for a per-area plain-language rewrite (CLAUDE.md "Plain-language
 * standard"; first used by .claude/plans/plaincollege.md).
 *
 * It compares every parent-facing prose unit in one data directory between a
 * git base (default `main`) and the working tree, PER PATH. It never
 * de-duplicates by text the way check_plain_language.mjs's loadUnits does: a
 * shared template rewritten in eleven files is eleven rows here, so a site
 * that was missed or diverged shows up.
 *
 * Modes (combinable):
 *   --worklist <file.json>  Write the units still needing work in the WORKING
 *                           tree: hook-flagged, or >= gradeMinWords words at a
 *                           grade above targetGrade. Run it before rewriting.
 *   --out <file.md>         Write the before/after review table for every unit
 *                           whose text changed since --base.
 *   --check                 Exit 1 if any guard fails (see GUARDS below).
 *
 * Options:
 *   --base <ref>      git base for "before" (default main)
 *   --dir <dir>       data directory (default src/data/collegeSupportPrograms)
 *   --topic <topic>   ACCESSOR mode, instead of --dir: one module holding every
 *                     school behind a function (ACCESSORS in i18n_topics.mjs, e.g.
 *                     financial-aid-report → financialAidReport(slug)). Units are
 *                     labeled `slug:path`, as check_plain_language.mjs labels them.
 *                     Guards (a), (f), (j) and (k) run over EVERY school in the
 *                     module, not only --slugs, and (j) groups repeats ACROSS
 *                     schools; rows and the per-unit guards cover --slugs only.
 *   --slugs a,b,c     limit to these schools (default: every .ts in --dir)
 *   --match <regex>   worklist only: also include units from schools OUTSIDE
 *                     --slugs whose text matches (shared templates)
 *   --paths <regex>   limit the worklist, review rows and per-unit guards to
 *                     prose paths matching it (two batches in one file).
 *                     Guards (a), (f), (j) and (k) still run over the whole file.
 *   --allow a.json,…  worklist files; enables guard (k)
 *   --md-paths <re>   prose paths whose field renders `**bold**`; enables (l)
 *   --aid-markers     add the financial-aid marker classes to guard (h)
 *   --arts-markers    add The Arts marker classes to guard (h) (plan plainarts) and
 *                     enable guard (n)
 *   --no-md           the area's fields render no markdown at all; enables (o)
 *   --layers          --dir mode only: also review the topic's EXTRA_LAYERS (i18n_topics.mjs;
 *                     Student Clubs: clubClusters.ts, clubCatalog.ts), one shared module
 *                     per layer holding every school behind an accessor. Layer units are
 *                     labeled `slug:<prefix>.<path>` (the work files' `at` and the hook's
 *                     label) and classified on that prefixed path. Guards (a), (f), (j)
 *                     and (k) visit every school in each layer module, and (j) groups
 *                     repeats ACROSS schools within it (plan plainclubs).
 *   --skip-flag-kinds a,b  worklist only: leave out `….flags[i].text` units whose flag
 *                     has one of these `kind`s, IN ADDITION to the topic's
 *                     HIDDEN_FLAG_KINDS (src/lib/flagVisibility.ts), which the worklist
 *                     always leaves out (plan plainsmall; Student Clubs' GAP/COUNT flags
 *                     never render). Rows and guards still see them, so an edit fails (k).
 *   --clubs-markers   add the Student Clubs marker classes to guard (h) (plan plainclubs):
 *                     the arts classes, THIRDPARTY, ESTIMATE, BOUND and NOTACLUB,
 *                     ELECTED, APPLICATION, RESULT, ADVANCED, ONLY, FIRST (and minimums
 *                     counted as BOUND); enables guard (n)
 *
 * GUARDS (fail --check), compared per school across base and working tree:
 *   (a) the set of prose paths differs            — a structural change
 *   (b) the multiset of digit tokens differs      — a figure re-typed
 *   (c) the set of URLs or email addresses differs
 *   (d) the list of quoted spans (“…”, "…") differs
 *   (e) a collegesTitle year span differs
 *   (f) any NON-prose string leaf changed         — figure/name fields untouched
 *   (g) the multiset of date/time tokens differs  — month names (+ day, year,
 *       or a LEADING day: `1 Dec 2026`), weekday names, a.m./p.m./noon/midnight,
 *       season + year; `Jan 2` → `January 2` and `1 Dec` → `Dec 1` fail.
 *       Case-sensitive; `May` only before a digit.
 *   (h) an obligation/publication marker class is present before and absent
 *       after, or the reverse: REQUIRED, OPTIONAL, UNPUBLISHED, NONREFUNDABLE,
 *       REFUNDABLE; with --aid-markers also the financial-aid classes NEED,
 *       MERIT, DISCOUNT, REMISSION, LOAN, NOTCOVERED, COVERED, ESTIMATE, BOUND,
 *       DERIVED, THIRDPARTY, AVERAGE, MEDIAN, TYPICAL (see MARKERS; plan plainaid);
 *       with --arts-markers WIN, NOMINEE, FINALIST, OPEN, AUDITION, CLAIM, VERIFIED,
 *       NOTFOUND, THEATRE, THEATER, plus ESTIMATE and BOUND (plan plainarts);
 *       with --clubs-markers the arts classes, THIRDPARTY, ESTIMATE, BOUND and the
 *       clubs classes NOTACLUB, ELECTED, APPLICATION, RESULT, ADVANCED, ONLY, FIRST,
 *       with a published minimum counted as BOUND (plan plainclubs).
 *       Synonyms within a class are free; a count change inside a class is a note.
 *   (j) units that held the SAME text at base (within one file) now differ
 *   (k) with --allow: a changed leaf (prose or not) is on none of the worklists
 *   (l) with --md-paths: a changed unit OUTSIDE those paths changed its `**`
 *       count (it would ship literal asterisks)
 *   (m) the multiset of money, percent and year tokens differs, char-for-char
 *       (`$3.25M` → `$3.25 million`, `~4.5%` → `4.5%`, `2026-27` → `2026–27`
 *       all pass (b) and fail here). See MONEY_RE / PCT_RE / YEARTOK_RE.
 *   (n) with --arts-markers or --clubs-markers: the multiset of count words ("five", "twice",
 *       "eighth") and "N+" figures (`3,500+`) differs. See COUNTWORD_RE / PLUS_RE.
 *   (o) with --no-md: a changed unit's after-text holds a `*` (it would ship a literal
 *       asterisk). Pair it with `--md-paths '^$'` so (l) fails any `**` change too.
 * Reported in the row's notes, never failing: capitalized words of the
 * before-text missing from the after-text (proper-noun drift), a change in the
 * number of `**` (inside --md-paths, or when --md-paths is absent), a change in
 * the number of `→` (check the chain's order), a marker-class count change,
 * and an after-grade still above targetGrade.
 *
 * The base snapshot is `git archive <base> src/data src/lib scripts` unpacked
 * into a temp dir, so the old modules' relative imports resolve unchanged
 * (financialAidReports.ts imports ../lib/localizeData.ts).
 * Not chained into the build: `npm run plain:review -- …`.
 */
import { readFileSync, writeFileSync, readdirSync, mkdtempSync, rmSync, existsSync, mkdirSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { join, resolve, dirname, relative } from 'node:path'
import { pathToFileURL, fileURLToPath } from 'node:url'
import { proseUnits, analyze, filterAllowed, locateLine, loadConfig } from './check_plain_language.mjs'
import { classifyField } from './i18n_fields.mjs'
import { EXPORTS, ACCESSORS, SLUGS, TOPICS, EXTRA_LAYERS } from './i18n_topics.mjs'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const TOKEN = /\d+(?:[.,:/]\d+)*/g // = TOKEN in scripts/check_digit_tokens.mjs
const URL_RE = /https?:\/\/[^\s)\]'"”]+|www\.[^\s)\]'"”]+/g
const QUOTE_RE = /“[^”]*”|"[^"]*"/g
const YEAR_SPAN = /\d{4}(?:\s*[–+-]\s*\d{4})*/ // = check_selectivity_buckets.mjs
const EMAIL_RE = /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g
/* Guard (m): money, percent and year tokens, compared char-for-char. */
// Digits are grouped strictly (`\d+(?:,\d{3})*`), so a comma AFTER a figure is never part of it.
const MONEY_RE = /[~≈+−-]?\$\d+(?:,\d{3})*(?:\.\d+)?(?:\s?(?:[KMB]\b|million\b|billion\b|thousand\b))?/g
const PCT_RE = /[~≈]?\d+(?:\.\d+)?%/g
const YEARTOK_RE = /\b\d{4}\s*[–-]\s*\d{2,4}\b|\bFY\s?\d{4}\b/g
const moneyTokens = (s) => {
  const t = s.replace(/\*\*/g, '')
  return [...(t.match(MONEY_RE) ?? []), ...(t.match(PCT_RE) ?? []), ...(t.match(YEARTOK_RE) ?? [])].map((m) => m.replace(/\s+/g, ' ').trim())
}
const MONTH = '(?:January|February|March|April|June|July|August|September|October|November|December|Sept|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\\b\\.?|May(?=\\s+\\d)'
const DAYNUM = '(?:\\s+\\d{1,2}(?:st|nd|rd|th)?\\b)?(?:,?\\s+\\d{4}\\b)?'
const WEEKDAY = '(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Tues|Thurs|Thur|Mon|Tue|Wed|Thu|Fri|Sat|Sun)\\b\\.?'
const LEADDAY = '(?:\\b\\d{1,2}(?:st|nd|rd|th)?\\s+)?'
const DATE_RE = new RegExp(
  `${LEADDAY}\\b(?:${MONTH})${DAYNUM}|\\b${WEEKDAY}|(?<![\\w.])[ap]\\.m\\.?|\\bnoon\\b|\\bmidnight\\b|\\b(?:[Ss]pring|[Ss]ummer|[Ff]all|[Aa]utumn|[Ww]inter)\\s+\\d{4}\\b`, 'g')
/** Obligation / publication marker classes (guard h). Case-insensitive. */
const MARKERS = {
  // "not (a …) requirement" means optional, so it sits here and is masked before REQUIRED.
  OPTIONAL: /\boptional\b|\bnot required\b|\bnot a (?:[\w-]+ )?requirement\b|\bby invitation\b/gi,
  REQUIRED: /\b(?:require[ds]?|requirements?|mandatory|must|prerequisites?|preconditions?)\b/gi,
  // Widened beyond the plan's list after calibrating on the approved College Support
  // rewrites (plainadmissions Implementation notes): "no X is published", "no
  // published X", "not disclosed/public", "does not say", "none of … names",
  // "nothing … is published", "never been published", "no edition publishes".
  UNPUBLISHED: new RegExp([
    String.raw`\bnot published\b`, String.raw`\bisn[’']t published\b`, String.raw`\bunpublished\b`, String.raw`\bnot stated\b`,
    String.raw`\bdoes(?: not|n[’']t) (?:publish|name|state|say|disclose)\b`, String.raw`\bnever (?:says|states|publishes)\b`,
    String.raw`\b(?:publishes|states|names) (?:no|nothing)\b`, String.raw`\bconfirm(?: [\w’']+){0,3} with\b`,
    String.raw`\bno published\b`, String.raw`\bno\b(?: [\w’',/-]+){1,12} (?:(?:is|are) )?(?:published|stated)\b`,
    String.raw`\bno(?: [\w’'-]+){1,3} (?:publishes|states|names)\b`, String.raw`\bnothing\b[^.;]{0,60}\b(?:is|are) published\b`,
    String.raw`\bnever (?:been |be )?(?:published|stated)\b`,
    String.raw`\bnot (?:disclosed|public)\b`, String.raw`\bundisclosed\b`,
    String.raw`\bnone of\b[^.;]{0,60}\b(?:names|states|publishes|claimed)\b`,
  ].join('|'), 'gi'),
  NONREFUNDABLE: /\bnon-?refundable\b/gi,
  REFUNDABLE: /(?<!non-?)\brefundable\b/gi,
  // Financial-aid classes (plan plainaid): the distinctions a parent compares costs by.
  // Calibrated on the approved College Support (c761a159) and Admissions (9c0e0720 →
  // b181a8d8) rewrites; every synonym and scope below answers a recorded calibration
  // hit (plainaid Implementation notes, Batch 1).
  NEED: /\bneed-based\b|\bbased on (?:financial )?need\b|\bdemonstrated need\b|\bfinancial need\b|\bhighest-need\b/gi,
  MERIT: /\bmerit\b/gi,
  DISCOUNT: /\bdiscounts?\b/gi,
  REMISSION: /\bremissions?\b/gi,
  LOAN: /\bloans?\b/gi,
  // Masked before COVERED is counted, as OPTIONAL is masked before REQUIRED.
  // "on top of" only before a cost word ("on top of a decade of memory" is not one);
  // "leaves out" / "not counted" = "excluded".
  NOTCOVERED: /\bnot (?:cover|include)(?:d|s)?\b|\bdoes(?: not|n[’']t) (?:cover|include|count)\b|\bexclud(?:e|es|ed|ing)\b|\bleaves? out\b|\bleft out\b|\bnot counted\b|\badditional (?:expense|cost)s?\b|\bbeyond tuition\b|\babove and beyond\b|\bon top of (?:an? |the |any )?(?:award|aid|tuition|grant|fees?|price|costs?)\b|\bseparate(?:ly)? (?:billed|charged)\b/gi,
  // Broad on purpose: every include/cover wording is one class, so "including X" ↔
  // "It also includes X" is free (Admissions calibration hit 4 such splits).
  COVERED: /\b(?:includes?|included|including|inclusions?|covers?|covered|covering)\b/gi,
  // "interpolated" and "modelled" became "estimated" by approved plaincollege rulings.
  ESTIMATE: /~|≈|\broughly\b|\bapproximately\b|\bestimat\w*|\binterpolat\w*|\bmodell?ed\b|\bprobabl[ey]\b|\blikel(?:y|iest)\b/gi,
  // "ceiling" only as a money/aid limit; a course-pathway "ceiling" is a metaphor.
  // `\d\+` = an "N+" count (`3,500+`), added for The Arts (plan plainarts).
  BOUND: /\d\+(?!\d)|\bup to\b|\bat least\b|\bat most\b|\bno more than\b|\bexceed\b|\b(?:award|aid|grant|\d+%)[- ]ceiling\b|\bceiling (?:of|on) (?:aid|awards?|grants?|tuition|\$|\d)|\bcap\b|\bor higher\b|\bor more\b/gi,
  DERIVED: /\bcomput\w*|\bderiv\w*|\bcalculat\w*|\barithmetic\b|\bwork(?:s|ed|ing)? (?:it |one |them )?out\b/gi,
  THIRDPARTY: /\bthird[- ]party\b|\bsecondary sources?\b|\baggregators?\b|\bmirrors?\b|\barchived\b|\bWayback\b|\bretired\b|\boutside (?:\w+ )?(?:groups?|sources?|seals?|organizations?|listings?|websites?|sites?)\b/gi,
  // "mean" only before a score or award word; elsewhere it is almost always the verb.
  AVERAGE: /\baverage\b|\bmean (?:SAT|ACT|GPA|awards?|grants?|scores?)\b/gi,
  MEDIAN: /\bmedian\b|\bmiddle (?:student|value|figure|award)\b/gi,
  TYPICAL: /\btypical(?:ly)?\b/gi,
  // The Arts classes (plan plainarts, --arts-markers): recognition tiers, how a student
  // gets in, the school's claim vs what an outside source confirmed, what our search did
  // not find, and theatre/theater as written (usspelling decision, 2026-11-09).
  WIN: /\bwins?\b|\bwon\b|\bwinners?\b|\bwinning\b/gi,
  NOMINEE: /\bnominat\w*|\bnominees?\b|\bnoms\b|\bnods?\b/gi,
  FINALIST: /\bfinalists?\b/gi,
  // Masked before AUDITION is counted, as OPTIONAL is masked before REQUIRED.
  OPEN: /\bno audition\b|\bnon-?auditioned\b|\bopen to (?:all|any)\b|\bany level\b|\ball levels\b/gi,
  AUDITION: /\baudition\w*|\bselective\b|\bselect (?:company|ensemble|plays?)\b/gi,
  // Neutral attribution ("the school says") is left out: re-attributing a detached school
  // statement is an approved ruling (plainadmissions Batch 4), and it hit 3 approved units.
  CLAIM: /\bclaims?\b|\bclaimed\b|\bschool-reported\b|\bself-reported\b|\bin the school[’']s (?:own )?words\b|\bthe school[’']s own (?:word|framing|claim)\b/gi,
  VERIFIED: /\bverified\b|\bverifiable\b|\bconfirmed\b|\bindependently\b|\battested\b|\bcorroborated\b|\bcross-checked\b/gi,
  NOTFOUND: /\b(?:could not|couldn[’']t|cannot) be (?:found|located|confirmed|verified)\b|\bnot (?:found|located)\b|\b(?:was|were) (?:not )?found\b|\bno [^.;]{0,80}\b(?:could be|was|were) (?:found|located)\b/gi,
  THEATRE: /\btheatres?\b/gi,
  THEATER: /\btheaters?\b/gi,
  // Student Clubs classes (plan plainclubs, --clubs-markers): which items are NOT clubs,
  // how a student gets in, result tiers, and "only" / "first" claims. Every narrowing
  // below answers a hit when calibrating on the four approved areas (plainclubs notes).
  NOTACLUB: /\bnot (?:a|an) (?:student |standing )?(?:club|organization|membership|society|chapter)\b|\bnone is a club\b|\bnon-?clubs?\b|\brather than (?:as )?(?:a |standing |listed )?(?:clubs?|societ(?:y|ies)|chapters?|competitive teams?)\b|\bnot as clubs\b|\bneither is a club\b/gi,
  ELECTED: /\belect(?:ed|ion|ions|s)?\b|\binduct\w*/gi,
  // Not "applied": fee waivers, logos and course weights are "applied" too (calibration).
  APPLICATION: /\bappl(?:y|ies|ying|ication|ications)\b|\binterview\w*|\brecommendation\b/gi,
  // "placed" only before a rank: art is "placed across campus", students "placed" in colleges.
  RESULT: /\brunner-?up\b|\bchampion(?:s|ship|ships)?\b|\btitles?\b|\b(?:\d+(?:st|nd|rd|th)|first|second|third)[- ]place\b|\bplaced (?:\d|first|second|third|top|in the top)|\bplacements?\b/gi,
  // "qualif…" only before for/to: "a family qualifies" for aid is eligibility, not a result.
  ADVANCED: /\badvanc(?:e|ed|es|ing)\b|\bqualif(?:ied|ies|ying|ication) (?:for|to)\b/gi,
  // "no other" is the same claim as "the only" (Financial Aid calibration); "the one
  // before/after" is not a claim at all.
  ONLY: /\bonly\b|\bsole(?:ly)?\b|\b(?:the|that) one\b(?! (?:before|after|above|below)\b)|\bexclusive(?:ly)?\b|\bno other\b/gi,
  // A lead "First," / "First:" and an enumeration's "The first is …" are free: approved
  // splits add both (plainarts Batch 1; Admissions calibration).
  FIRST: /\bfirst\b(?!\s*[,:])(?! (?:is|are|was)\b)/gi,
}
/** --clubs-markers counts a published minimum as BOUND ("a minimum two weeks" → "at least
 *  two weeks" is one claim; College Support calibration). "floor" only after an hour figure
 *  ("the 25-hour floor"): a stage "floor" is not a bound (Arts calibration). */
const CLUBS_BOUND_EXTRA = /\bminimums?\b|\bno less than\b|\b\d+-\w+ floor\b/gi
/** The financial-aid classes run only with --aid-markers (plan plainaid): in other areas
 *  "covers", "leaves out", "average" and "worked out" describe tables and methods, not
 *  costs, so they would fail approved rewrites there (College Support calibration:
 *  25 such hits, none a slip). */
const AID_CLASSES = new Set(['NEED', 'MERIT', 'DISCOUNT', 'REMISSION', 'LOAN', 'NOTCOVERED', 'COVERED', 'ESTIMATE', 'BOUND', 'DERIVED', 'THIRDPARTY', 'AVERAGE', 'MEDIAN', 'TYPICAL'])
/** The Arts classes run only with --arts-markers (plan plainarts). ESTIMATE and BOUND
 *  are shared with the aid set and run under either flag. */
const ARTS_CLASSES = new Set(['WIN', 'NOMINEE', 'FINALIST', 'OPEN', 'AUDITION', 'CLAIM', 'VERIFIED', 'NOTFOUND', 'THEATRE', 'THEATER'])
const SHARED_CLASSES = new Set(['ESTIMATE', 'BOUND'])
/** The Student Clubs classes run only with --clubs-markers (plan plainclubs), which also
 *  turns on the arts classes, THIRDPARTY and the shared ESTIMATE / BOUND. */
const CLUBS_CLASSES = new Set(['NOTACLUB', 'ELECTED', 'APPLICATION', 'RESULT', 'ADVANCED', 'ONLY', 'FIRST'])
const markerCounts = (s) => {
  const t = s.replace(/\*\*/g, '').replace(/\s+/g, ' ')
  const out = {}
  for (const [k, re] of Object.entries(MARKERS)) {
    if (SHARED_CLASSES.has(k)) { if (!aidMarkers && !artsMarkers && !clubsMarkers) continue }
    else if (AID_CLASSES.has(k) && !aidMarkers && !(clubsMarkers && k === 'THIRDPARTY')) continue
    if (ARTS_CLASSES.has(k) && !artsMarkers && !clubsMarkers) continue
    if (CLUBS_CLASSES.has(k) && !clubsMarkers) continue
    const src = k === 'REQUIRED' ? t.replace(MARKERS.OPTIONAL, ' ') : k === 'COVERED' ? t.replace(MARKERS.NOTCOVERED, ' ') : k === 'AUDITION' ? t.replace(MARKERS.OPEN, ' ') : t
    out[k] = (src.match(re) ?? []).length
    if (k === 'BOUND' && clubsMarkers) out[k] += (t.match(CLUBS_BOUND_EXTRA) ?? []).length
  }
  return out
}
/* Guard (n), --arts-markers: counts written as words, and "N+" figures. Guard (b) sees
 * digit runs only, so "five finalists" → "four finalists" and `3,500+` → `3,500` pass it.
 * "one" and "first" are left out: a split adds them freely. "third-party" is not a count
 * (College Support calibration: Latin and Carmel "third-party validations"). */
const COUNTWORD_RE = /\b(?:two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|dozen|twice|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth|eleventh|twelfth)\b(?![- ]part)/gi
const PLUS_RE = /\d+(?:,\d{3})*\+(?!\d)/g
const countTokens = (s) => [...(s.match(COUNTWORD_RE) ?? []).map((w) => w.toLowerCase()), ...(s.match(PLUS_RE) ?? [])]
const dateTokens = (s) => (s.replace(/\*\*/g, '').match(DATE_RE) ?? []).map((m) => m.replace(/\s+/g, ' ').trim())

/* -------------------------------------------------------------- args -- */
const argv = process.argv.slice(2)
const opt = (name, dflt) => { const i = argv.indexOf(name); return i === -1 ? dflt : argv[i + 1] }
const flag = (name) => argv.includes(name)
const base = opt('--base', 'main')
const topic = opt('--topic', null)
if (topic && argv.includes('--dir')) { console.error('plain_review: --topic and --dir are mutually exclusive'); process.exit(2) }
const dir = opt('--dir', 'src/data/collegeSupportPrograms')
let accessor = null
if (topic) {
  if (!ACCESSORS[topic]) { console.error(`plain_review: no accessor topic "${topic}" in i18n_topics.mjs`); process.exit(2) }
  const [mod, fn] = ACCESSORS[topic]
  const relFile = relative(ROOT, resolve(ROOT, 'scripts', mod))
  const got = (await import(pathToFileURL(join(ROOT, relFile)).href))[fn]
  if (typeof got !== 'function') { console.error(`plain_review: ${topic}'s accessor ${fn} is not a per-school function`); process.exit(2) }
  accessor = { relFile, fn, slugs: SLUGS.filter((s) => got(s)) }
}
/* --layers (plan plainclubs): the --dir topic's EXTRA_LAYERS, each one shared module. */
const useLayers = argv.includes('--layers')
let layerSpecs = []
if (useLayers) {
  if (topic) { console.error('plain_review: --layers works in --dir mode only'); process.exit(2) }
  const t = Object.keys(TOPICS).find((k) => TOPICS[k] === dir.split('/').pop())
  if (!t || !EXTRA_LAYERS[t]) { console.error(`plain_review: --layers: ${dir} belongs to no topic with EXTRA_LAYERS`); process.exit(2) }
  layerSpecs = EXTRA_LAYERS[t].map(([prefix, mod, fn]) => ({ prefix, fn, relFile: relative(ROOT, resolve(ROOT, 'scripts', mod)) }))
}
/** The file a school's units live in (accessor mode: one file for every school). */
const relPathOf = (slug) => accessor ? accessor.relFile : `${dir}/${slug}.ts`
/** The unit label the hook uses (accessor and layer units are `slug:path`). */
const unitLabel = (slug, path, part) => (accessor || part?.prefix) ? `${slug}:${path}` : path
/** Every (school, file) part to read: the school's own module, then each layer. */
const partsOf = (slug, withLayers = true) => [
  { slug, prefix: '', relPath: relPathOf(slug) },
  ...(withLayers ? layerSpecs.map((l) => ({ slug, prefix: l.prefix, relPath: l.relFile, fn: l.fn })) : []),
]
/* The worklist leaves out flags no parent sees: the topic's HIDDEN_FLAG_KINDS from
 * src/lib/flagVisibility.ts (the components and check_plain_language.mjs read the same
 * file; plan plainsmall), plus any --skip-flag-kinds. Rows and guards still see them. */
const reviewTopic = topic ?? Object.keys(TOPICS).find((k) => TOPICS[k] === dir.split('/').pop())
const { HIDDEN_FLAG_KINDS } = await import(pathToFileURL(join(ROOT, 'src/lib/flagVisibility.ts')).href)
const skipFlagKinds = new Set([
  ...(HIDDEN_FLAG_KINDS[reviewTopic] ?? []),
  ...(opt('--skip-flag-kinds', '') ?? '').split(',').map((s) => s.trim()).filter(Boolean),
])
const clubsMarkers = argv.includes('--clubs-markers')
const outFile = opt('--out', null)
const worklistFile = opt('--worklist', null)
const matchRe = opt('--match', null) ? new RegExp(opt('--match')) : null
const aidMarkers = argv.includes('--aid-markers')
const artsMarkers = argv.includes('--arts-markers')
const noMd = argv.includes('--no-md')
const pathsRe = opt('--paths', null) ? new RegExp(opt('--paths')) : null
const mdPathsRe = opt('--md-paths', null) ? new RegExp(opt('--md-paths')) : null
const inPaths = (p) => !pathsRe || pathsRe.test(p)
const allowFiles = opt('--allow', null) ? opt('--allow').split(',').map((s) => s.trim()).filter(Boolean) : null
const allowed = allowFiles ? new Set(allowFiles.flatMap((f) => JSON.parse(readFileSync(resolve(ROOT, f), 'utf8')).units.map((u) => u.at))) : null
const allSlugs = accessor ? accessor.slugs : readdirSync(join(ROOT, dir)).filter((f) => f.endsWith('.ts')).map((f) => f.replace(/\.ts$/, '')).sort()
const slugs = opt('--slugs', null) ? opt('--slugs').split(',').map((s) => s.trim()).filter(Boolean) : allSlugs
for (const s of slugs) if (!allSlugs.includes(s)) { console.error(accessor ? `plain_review: ${topic} has no entry for ${s}` : `plain_review: no ${dir}/${s}.ts`); process.exit(2) }
if (!outFile && !worklistFile && !flag('--check')) {
  console.error('usage: plain_review.mjs [--worklist f.json] [--out f.md] [--check] [--base ref] [--dir d [--layers] | --topic t] [--slugs a,b] [--match re] [--paths re] [--allow a.json,b.json] [--md-paths re] [--aid-markers] [--arts-markers] [--clubs-markers] [--no-md] [--skip-flag-kinds a,b]')
  process.exit(2)
}
const cfg = loadConfig()

/* ------------------------------------------------------------- units -- */
let bust = 0
const modCache = new Map() // accessor mode only: one import per file per run
async function entryOf(absFile, slug, part) {
  if (accessor || part?.fn) {
    if (!modCache.has(absFile)) modCache.set(absFile, await import(`${pathToFileURL(absFile).href}?t=${Date.now()}-${bust++}`))
    return modCache.get(absFile)[part?.fn ?? accessor.fn](slug) ?? null
  }
  const m = await import(`${pathToFileURL(absFile).href}?t=${Date.now()}-${bust++}`)
  const e = m[EXPORTS[slug]]
  if (!e) throw new Error(`${absFile}: no export ${EXPORTS[slug]}`)
  return e
}
/** Every string leaf with its path and prose/non-prose class. */
function allLeaves(entry, prefix = '') {
  const out = []
  const walk = (node, path) => {
    if (node == null) return
    if (typeof node === 'string') { out.push({ path, text: node }); return }
    if (Array.isArray(node)) { node.forEach((v, i) => walk(v, `${path}[${i}]`)); return }
    if (typeof node === 'object') for (const [k, v] of Object.entries(node)) walk(v, path ? `${path}.${k}` : k)
  }
  walk(entry, prefix)
  return out
}
/** Prose units, classified on the extractor's own (prefixed) path. */
const prose = (entry, prefix = '') => new Map(proseUnits(entry, prefix, classifyField).map((u) => [u.path, u.text]))
/** --skip-flag-kinds: is this `….flags[i].text` unit a flag of a skipped kind? */
function skippedFlag(entry, prefix, path) {
  if (!skipFlagKinds.size) return false
  const m = path.match(/^(.*\.flags\[\d+\])\.text$/)
  if (!m) return false
  const rel = prefix ? m[1].slice(prefix.length + 1) : m[1]
  let node = entry
  for (const seg of rel.match(/[^.[\]]+/g)) node = node?.[/^\d+$/.test(seg) ? +seg : seg]
  return Boolean(node && skipFlagKinds.has(node.kind))
}

/* ----------------------------------------------------------- helpers -- */
const multiset = (arr) => { const m = new Map(); for (const x of arr) m.set(x, (m.get(x) ?? 0) + 1); return m }
const sameMultiset = (a, b) => { const A = multiset(a), B = multiset(b); if (A.size !== B.size) return false; for (const [k, v] of A) if (B.get(k) !== v) return false; return true }
const diffList = (a, b) => {
  const A = multiset(a), B = multiset(b), out = []
  for (const [k, v] of A) if ((B.get(k) ?? 0) < v) out.push(`-${k}`)
  for (const [k, v] of B) if ((A.get(k) ?? 0) < v) out.push(`+${k}`)
  return out.join(' ')
}
const tokens = (s, re) => s.match(re) ?? []
/** Capitalized words NOT at the start of a sentence — the likely proper nouns. */
const caps = (s) => {
  const out = new Set()
  const t = s.replace(QUOTE_RE, ' ').replace(/\*\*/g, '')
  for (const m of t.matchAll(/\b[A-Z][A-Za-z.’'&-]*[A-Za-z]\b/g)) {
    if (/(^|[.!?:;—–(]\s*)$/.test(t.slice(0, m.index))) continue
    out.add(m[0])
  }
  return out
}
const esc = (s) => String(s).replace(/\|/g, '\\|').replace(/\r?\n/g, '<br>')
const fmtGrade = (g) => (g == null ? '—' : g.toFixed(1))
const words = (s) => analyze(s, cfg).words

function hookIssues(text, relPath, path, source, slug, part) {
  const lines = source.split('\n')
  const line = locateLine(source, text)
  return filterAllowed(analyze(text, cfg).issues, { relPath, unitPath: unitLabel(slug, path, part), line, sourceLines: lines, cfg })
}

/* -------------------------------------------------------------- main -- */
async function main() {
  let snap = null
  const failures = []
  const rows = []
  const perSchool = new Map()
  const work = []
  try {
    const needBase = outFile || flag('--check')
    if (needBase) {
      snap = mkdtempSync(join(tmpdir(), 'plainreview-'))
      execSync(`git archive ${base} src/data src/lib scripts | tar -x -C "${snap}"`, { cwd: ROOT, stdio: ['ignore', 'ignore', 'inherit'] })
    }
    const worklistSlugs = matchRe ? allSlugs : slugs
    // Accessor mode visits every school: the whole-file guards must see them all.
    const visit = needBase ? (accessor ? [...allSlugs] : [...new Set([...slugs])]) : []
    // --layers: each school's own module (the --slugs schools, as in plain --dir mode),
    // plus EVERY school's entry in each shared layer module, which any edit can reach.
    const visitParts = needBase ? [
      ...visit.flatMap((s) => partsOf(s, false)),
      ...(useLayers ? allSlugs.flatMap((s) => partsOf(s).slice(1)) : []),
    ] : []
    const crossGroups = new Map() // shared file → (base text → [`slug:path`]) across schools
    const crossAfter = new Map()  // `slug:path` → after text

    for (const part of visitParts) {
      const { slug, prefix, relPath } = part
      const where = prefix ? `${slug} (${prefix})` : slug
      const inBatch = slugs.includes(slug)
      const source = readFileSync(join(ROOT, relPath), 'utf8')
      const after = await entryOf(join(ROOT, relPath), slug, part)
      const beforeFile = join(snap, relPath)
      if (!existsSync(beforeFile)) { failures.push(`(a) ${where}: file absent at ${base}`); continue }
      const before = await entryOf(beforeFile, slug, part)
      if (prefix && !before && !after) continue // this school has no entry in this layer
      if (!before) { failures.push(`(a) ${where}: no entry at ${base}`); continue }
      if (prefix && !after) { failures.push(`(a) ${where}: entry removed`); continue }
      const pb = prose(before, prefix), pa = prose(after, prefix)

      // (a) structure
      const missing = [...pb.keys()].filter((p) => !pa.has(p))
      const added = [...pa.keys()].filter((p) => !pb.has(p))
      if (missing.length || added.length) failures.push(`(a) ${where}: prose paths differ — removed [${missing.join(', ')}] added [${added.join(', ')}]`)

      // (f) non-prose leaves unchanged
      const proseSet = new Set([...pb.keys(), ...pa.keys()])
      const nb = new Map(allLeaves(before, prefix).filter((l) => !proseSet.has(l.path)).map((l) => [l.path, l.text]))
      const na = new Map(allLeaves(after, prefix).filter((l) => !proseSet.has(l.path)).map((l) => [l.path, l.text]))
      for (const [p, t] of nb) if (na.get(p) !== t) failures.push(`(f) ${slug}:${p}: non-prose leaf changed`)
      for (const p of na.keys()) if (!nb.has(p)) failures.push(`(f) ${slug}:${p}: non-prose leaf added`)

      // (k) every changed leaf, prose or not, must be on a worklist — whole file
      if (allowed) {
        const lb = new Map(allLeaves(before, prefix).map((l) => [l.path, l.text]))
        for (const l of allLeaves(after, prefix)) if (lb.has(l.path) && lb.get(l.path) !== l.text && !allowed.has(`${slug}:${l.path}`)) failures.push(`(k) ${slug}:${l.path}: changed but on no --allow worklist`)
      }

      // (j) units that shared one text at base must still share one — whole file
      // (accessor mode and --layers modules: across every school, checked after the loop)
      if (accessor || prefix) {
        if (!crossGroups.has(relPath)) crossGroups.set(relPath, new Map())
        const g = crossGroups.get(relPath)
        for (const [p, t] of pb) { if (!g.has(t)) g.set(t, []); g.get(t).push(`${slug}:${p}`) }
        for (const [p, t] of pa) crossAfter.set(`${slug}:${p}`, t)
      } else {
        const groups = new Map()
        for (const [p, t] of pb) { if (!groups.has(t)) groups.set(t, []); groups.get(t).push(p) }
        for (const paths of groups.values()) {
          if (paths.length < 2) continue
          const now = new Set(paths.map((p) => pa.get(p)))
          if (now.size > 1) failures.push(`(j) ${slug}: repeat group now holds ${now.size} texts — ${paths.join(', ')}`)
        }
      }
      if (!inBatch) continue

      let changed = 0
      for (const [path, b] of pb) {
        const a = pa.get(path)
        if (a == null || a === b || !inPaths(path)) continue
        changed++
        const at = `${slug}:${path}`
        const dt = diffList(tokens(b, TOKEN), tokens(a, TOKEN))
        if (dt) failures.push(`(b) ${at}: digit tokens differ ${dt}`)
        const du = diffList([...tokens(b, URL_RE), ...tokens(b, EMAIL_RE)], [...tokens(a, URL_RE), ...tokens(a, EMAIL_RE)])
        if (du) failures.push(`(c) ${at}: URLs/emails differ ${du}`)
        const dd = diffList(dateTokens(b), dateTokens(a))
        if (dd) failures.push(`(g) ${at}: date/time tokens differ ${dd}`)
        const dm = diffList(moneyTokens(b), moneyTokens(a))
        if (dm) failures.push(`(m) ${at}: money/percent/year tokens differ ${dm}`)
        if (artsMarkers || clubsMarkers) {
          const dn = diffList(countTokens(b), countTokens(a))
          if (dn) failures.push(`(n) ${at}: count words differ ${dn}`)
        }
        if (noMd && a.includes('*')) failures.push(`(o) ${at}: "*" in a field that renders no markdown`)
        const mb = markerCounts(b), ma = markerCounts(a)
        const markerNotes = []
        for (const k of Object.keys(mb)) {
          if (Boolean(mb[k]) !== Boolean(ma[k])) failures.push(`(h) ${at}: ${k} marker ${mb[k] ? 'lost' : 'added'} (${mb[k]}→${ma[k]})`)
          else if (mb[k] !== ma[k]) markerNotes.push(`${k} ${mb[k]}→${ma[k]}`)
        }
        const qb = tokens(b, QUOTE_RE), qa = tokens(a, QUOTE_RE)
        if (!sameMultiset(qb, qa)) failures.push(`(d) ${at}: quoted spans differ ${diffList(qb, qa)}`)
        if (/(^|\.)collegesTitle$/.test(path) && (b.match(YEAR_SPAN)?.[0] ?? '') !== (a.match(YEAR_SPAN)?.[0] ?? '')) failures.push(`(e) ${at}: year span differs`)

        const notes = []
        const lostCaps = [...caps(b)].filter((w) => !caps(a).has(w) && !a.includes(w))
        if (lostCaps.length) notes.push(`caps gone: ${lostCaps.join(', ')}`)
        const sb = (b.match(/\*\*/g) ?? []).length, sa = (a.match(/\*\*/g) ?? []).length
        if (sb !== sa) {
          if (mdPathsRe && !mdPathsRe.test(path)) failures.push(`(l) ${at}: ** ${sb}→${sa} in a field that does not render markdown`)
          else notes.push(`** ${sb}→${sa}`)
        }
        const ab = (b.match(/→/g) ?? []).length, aa = (a.match(/→/g) ?? []).length
        if (ab !== aa) notes.push(`→ ${ab}→${aa}`)
        notes.push(...markerNotes)
        const ga = analyze(a, cfg).grade, gb = analyze(b, cfg).grade
        if (ga != null && ga > cfg.targetGrade) notes.push(`grade ${ga.toFixed(1)} > ${cfg.targetGrade}`)
        const hk = hookIssues(a, relPath, path, source, slug, part)
        rows.push({ slug, path, b, a, wb: words(b), wa: words(a), gb, ga, hook: hk.length ? hk.map((i) => i.detail).join('; ') : 'pass', notes: notes.join('; ') })
      }
      perSchool.set(slug, (perSchool.get(slug) ?? 0) + changed)
      for (const path of added) if (!pb.has(path)) { /* counted under (a) */ }
    }
    for (const sites of [...crossGroups.values()].flatMap((g) => [...g.values()])) {
      if (sites.length < 2) continue
      const now = new Set(sites.map((k) => crossAfter.get(k)))
      if (now.size > 1) failures.push(`(j) repeat group now holds ${now.size} texts — ${sites.join(', ')}`)
    }

    if (worklistFile) {
      for (const slug of worklistSlugs) {
        const inBatch = slugs.includes(slug)
        for (const part of partsOf(slug, useLayers)) {
          const { prefix, relPath } = part
          const source = readFileSync(join(ROOT, relPath), 'utf8')
          const after = await entryOf(join(ROOT, relPath), slug, part)
          if (!after) continue
          for (const [path, text] of prose(after, prefix)) {
            if (!inPaths(path)) continue
            if (!inBatch && !(matchRe && matchRe.test(text))) continue
            if (skippedFlag(after, prefix, path)) continue
            const { grade, words: w } = analyze(text, cfg)
            const issues = hookIssues(text, relPath, path, source, slug, part)
            const overTarget = grade != null && grade > cfg.targetGrade
            const shared = Boolean(matchRe && matchRe.test(text))
            // In-batch: flagged or over target. Out-of-batch: only the shared templates.
            if (inBatch ? !(issues.length || overTarget) : !shared) continue
            work.push({ at: `${slug}:${path}`, slug, path, words: w, grade: grade == null ? null : +grade.toFixed(1), rules: [...new Set(issues.map((i) => i.rule === 'jargon' ? `jargon:${i.term}` : i.rule))], ...(shared ? { shared: true } : {}), text })
          }
        }
      }
      mkdirSync(dirname(resolve(ROOT, worklistFile)), { recursive: true })
      const counts = Object.fromEntries(worklistSlugs.map((s) => [s, work.filter((w) => w.slug === s).length]).filter(([, n]) => n))
      writeFileSync(resolve(ROOT, worklistFile), JSON.stringify({ generated: new Date().toISOString().slice(0, 10), ...(accessor ? { topic, file: accessor.relFile } : { dir }), ...(useLayers ? { layers: layerSpecs.map((l) => l.prefix) } : {}), ...(skipFlagKinds.size ? { skipFlagKinds: [...skipFlagKinds] } : {}), slugs, match: matchRe?.source ?? null, ...(pathsRe ? { paths: pathsRe.source } : {}), total: work.length, counts, units: work }, null, 2) + '\n')
      console.log(`worklist: ${work.length} units → ${relative(ROOT, resolve(ROOT, worklistFile))}`)
      for (const [s, n] of Object.entries(counts)) console.log(`  ${s}: ${n}`)
    }

    if (outFile) {
      const L = []
      L.push(`# Plain-language review — ${accessor ? `${topic} (${accessor.relFile})` : dir}${useLayers ? ` + layers (${layerSpecs.map((l) => l.relFile).join(', ')})` : ''}`, '')
      L.push(`Base \`${base}\` → working tree. Generated ${new Date().toISOString().slice(0, 10)} by \`scripts/plain_review.mjs\`. ` +
        `Grades are Flesch–Kincaid over units of ≥${cfg.gradeMinWords} words (— below that). "hook" is what the PostToolUse hook would still report.`, '')
      L.push('| School | Changed units |', '|---|--:|')
      for (const [s, n] of perSchool) L.push(`| ${s} | ${n} |`)
      L.push(`| **Total** | **${rows.length}** |`, '')
      L.push(`Guards: ${failures.length ? `**${failures.length} FAILED**` : `all pass (paths, digits, URLs/emails, quotes, year spans, non-prose leaves, dates/times, money/percent/year tokens, markers, repeats${accessor || useLayers ? ' across schools' : ''}${allowed ? ', worklist-only edits' : ''}${mdPathsRe ? ', markdown fields' : ''})`}.`, '')
      if (failures.length) { for (const f of failures) L.push(`- ${esc(f)}`); L.push('') }
      L.push('| # | school | path | before | after | words b→a | grade b→a | hook | notes |', '|--:|---|---|---|---|---|---|---|---|')
      rows.forEach((r, i) => L.push(`| ${i + 1} | ${r.slug} | \`${r.path}\` | ${esc(r.b)} | ${esc(r.a)} | ${r.wb}→${r.wa} | ${fmtGrade(r.gb)}→${fmtGrade(r.ga)} | ${esc(r.hook)} | ${esc(r.notes)} |`))
      // Preserve anything appended below the table (e.g. "## Independent review").
      const abs = resolve(ROOT, outFile)
      let tail = ''
      if (existsSync(abs)) { const old = readFileSync(abs, 'utf8'); const k = old.indexOf('\n## Independent review'); if (k !== -1) tail = old.slice(k) }
      mkdirSync(dirname(abs), { recursive: true })
      writeFileSync(abs, L.join('\n') + '\n' + tail)
      console.log(`review: ${rows.length} changed units → ${relative(ROOT, abs)}`)
      const notPass = rows.filter((r) => r.hook !== 'pass').length
      console.log(`  hook pass ${rows.length - notPass}/${rows.length}; after-grade >${cfg.targetGrade}: ${rows.filter((r) => r.ga != null && r.ga > cfg.targetGrade).length}`)
    }

    if (flag('--check')) {
      if (failures.length) { console.error(`plain_review --check: ${failures.length} guard failure(s)`); for (const f of failures) console.error(`  ${f}`); return 1 }
      console.log(`plain_review --check: guards pass (${slugs.length} school(s))`)
    }
    return 0
  } finally {
    if (snap) rmSync(snap, { recursive: true, force: true })
  }
}

main().then((c) => { process.exitCode = c }, (e) => { console.error(e); process.exitCode = 2 })
