---
name: plainlanguage
title: Plain-language standard in CLAUDE.md + a PostToolUse hook that enforces its mechanical floor
status: in-progress
phases: 1
created: 2026-11-09
branch: feat/plainlanguage
prs: []
---

# Plain-language standard + enforcing hook

## Goal

This site's reader is an average parent, not an educator, a researcher or someone who
works in admissions. Nothing in `CLAUDE.md` says how parent-facing prose should read. The
English is also the source for nine translations, so an unclear English sentence becomes
nine unclear ones. This plan adds:

1. A short **`## Plain-language standard (required)`** section to `CLAUDE.md`.
2. **One data file** holding the jargon list and the thresholds. The standard links to it
   and the hook reads it, so the list exists in one place.
3. A **PostToolUse hook** on Edit/Write/MultiEdit, committed in `.claude/settings.json`.
   It runs `scripts/check_plain_language.mjs`, which checks only the parent-facing English
   that the edit **added or changed**. It exits 2 with the offending lines, so Claude
   rewrites them.
4. A **report-only corpus audit** (`npm run check:plain`), run once. Its per-file counts
   are recorded in this plan to size a follow-up rewrite plan. **No existing prose gets
   fixed in this plan.**

It worked when: the unit tests pass; an in-scope edit that adds jargon or a 40-word
sentence is blocked with a specific message; an out-of-scope edit is silent and takes
under 100 ms; and the baseline table at the bottom of this file is filled in from the real
script.

**Single-phase. It adds no user-facing text.** The `CLAUDE.md` section, the JSON data file
and the hook's messages are developer-facing. Nothing reaches `src/locales/*.json` or the
overlay layer.

## Context

### Where parent-facing English prose actually lives (researched 2026-11-09)

The repo already has one exact definition of "parent-facing prose": **what the i18n
extractors pull out for translation.** The i18n standard requires every string a parent
reads to be extracted, so anything the extractors skip is a figure, a proper noun, a code
or a URL. The hook reuses that definition rather than inventing a second one.

| Layer | Parent-facing? | Hooked? | Why |
|---|---|---|---|
| `src/data/<dir>/<slug>.ts` for every `TOPICS` dir in `scripts/i18n_topics.mjs` (`admissionsPrograms`, `sportsPrograms`, `artsPrograms`, `clubsPrograms`, `collegeSupportPrograms`, `afterSchoolPrograms`, `highSchoolPlacementPrograms`, `summer`, `internationalTravel`, `learningSupport`), slug ∈ `SLUGS` | Yes, but **only the fields `classify()` calls `prose`** (`PROSE_KEYS` / `SKIP_KEYS` / `PATH_OVERRIDES` in `scripts/i18n_fields.mjs`) | **Yes** | This is the main body of research prose. ~11,700 prose units. |
| The `ACCESSORS` modules: `src/data/courseOfferings.ts`, `src/data/financialAidReports.ts`, `src/data/metricValues.ts` | Yes, same field classification | **Yes** | Course descriptions are *condensed* by us (header of `courseOfferings.ts` lines 10–11), not verbatim, so they are our prose. `metricValues.ts` holds the Compare quals and captions. |
| The `EXTRA_LAYERS` modules: `src/data/clubClusters.ts`, `src/data/clubCatalog.ts` | Yes | **Yes** | They render two of the five Student Clubs cards. |
| `kind: 'verify'` flag objects anywhere in the above | **No.** `visibleFlags()` in `src/lib/toVerify.ts` drops them in prod | Excluded (the walk skips any object with `kind === 'verify'`) | They are dev-only bookkeeping. The extractor still extracts them for translation, so this is the one place the hook's walk deliberately differs from the extractor's. |
| `toVerify` (Sports) | No | n/a | It is a **boolean** (`src/data/sportsProgram.ts:138`, `:222`, `:318`) that renders a chip. It carries no text, so nothing needs excluding. |
| `src/locales/en.json` | Yes (UI chrome) | **Yes** | 885 lines, ~800 string values. Mostly short labels, so the grade check rarely applies, but jargon in a heading (`metrics.matriculation` = "D1 / Top-College Matriculation") is exactly what the standard targets. |
| `src/content/**/*.json` | **Only a small slice.** `SchoolDetail.tsx` replaces the prose loop with structured cards for every topic except `financial-aid-tuition` (and Student Clubs for schools without structured entries). `LIVE` + `CARD_REPLACED` in `scripts/i18n_extract_content.mjs` define the reachable set. Today that is **44 distinct blocks**, mostly tuition-history headings and paragraphs | **No** (audited only) | The ingest pipeline **generates** this layer (`scripts/build_site_content.py`). Claude never Edits or Writes it, so a hook on it would never fire. The audit reads the live set from `src/data/overlays/work/financial-aid-tuition.content.es.json` (its English `text` fields). |
| `source-material/**/*.md` | The research record. Its sections become `src/content` cards, but almost all are card-replaced or dead. It is full of verbatim school quotes and `## Method` apparatus | **No** | See Decisions and Open questions. |
| `src/data/overlays/**`, `src/locales/<non-en>.json` | Non-English | **No** | Out of scope by the request. |
| Podcast titles (`src/data/podcastEpisodes.ts`), school and college names (`brands.ts`, `highSchools.ts`, `collegeUrls.ts`), the Cup ledger | Identifiers and figures, never extracted | **No** | `podcastEpisodes.ts` header: titles are identifiers matched against Spotify/Apple. |
| Components / JSX | The i18n standard forbids hardcoded user-facing strings | **No** | Chrome text lives in `en.json`. |

### Existing machinery to reuse

- `scripts/i18n_topics.mjs`: data only, imports cleanly. It exports `SLUGS`, `TOPICS`,
  `ACCESSORS`, `EXPORTS`, `EXTRA_LAYERS`. `CLAUDE.md` says **never re-declare these
  locally.** The hook derives its file scope from them at runtime.
- `scripts/i18n_fields.mjs` exports `PROSE_KEYS`, `SKIP_KEYS`, `pathOverride(path)`. The
  four-line `classify(path, leaf)` that combines them is a **local** function in
  `scripts/i18n_extract.mjs:158`. Separate copies also exist in `check_translations.mjs`,
  `check_live_resolution.mjs`, `i18n_audit_skips.mjs` and `check_chrome_keys.mjs`. Step 2
  promotes it to an export so the hook and the extractor share one copy.
- `i18n_extract.mjs`'s `walk()` (line ~163) and `entryFor()` / `extraFor()` (lines ~45–100)
  show how to load each topic's entries under plain Node. **`i18n_extract.mjs` cannot be
  imported**, because it runs `main()` at module scope. Copy the loading pattern; don't
  import the script.
- The per-school modules and the accessor modules **import under plain Node 24** (type
  stripping). Measured: importing `src/data/sportsPrograms/cannon.ts` takes 39 ms, and a
  prototype that walked **every** in-scope module plus `en.json` ran in 0.43 s total. One
  file is far under budget.
- `.claude/settings.json` **does not exist yet.** `.claude/settings.local.json` is
  gitignored (`.gitignore:39`) and already has a PostToolUse `Edit|Write` hook that runs
  `check:quals` after `metricValues.ts` edits. Claude Code merges hooks from both files, so
  both will run. Leave the local one alone.
- No test framework is installed. Use Node's built-in `node:test` (Node v24.18.0 here).
  This needs no new dependency.

### Hook mechanics (Claude Code)

A PostToolUse command hook receives JSON on stdin: `tool_name`, `tool_input` (`file_path`
plus `old_string` / `new_string` / `replace_all` for Edit, `content` for Write, `edits[]`
for MultiEdit), `tool_response`, and `cwd`. **Exit 2** feeds stderr back to Claude as an
error to act on. Exit 0 stays silent. Any other code is a non-blocking error the user sees
only in the transcript. The edit has **already happened** when the hook runs, so the
current file on disk is the post-edit state. Whether `tool_response` carries
`originalFile` is **unconfirmed**. Step 1 captures a real payload to settle it.

## Decisions

- **Hook scope = the extractor's prose definition, derived at runtime from
  `i18n_topics.mjs` and `i18n_fields.mjs`.** A hand-written scope list would drift the way
  `check:live`'s six-topic copy did. A new topic or a newly classified field is picked up
  automatically.
- **`src/content/**` is audited but not hooked.** It is generated, so Edit/Write never
  touch it.
- **`source-material/**/*.md` is not hooked.** It is the research record (verbatim school
  quotes, `## Method` apparatus, retrieval notes). Its reachable slice is 44 tuition blocks
  that pass through the ingest. Hooking it would block research edits that never render.
  Recorded as an Open question with this default.
- **Two grade numbers. The hook blocks at Flesch–Kincaid > 12.0 (`maxGrade`). The written
  target stays 8th–10th grade (`targetGrade: 10`, documentation only).** The grade check
  applies only to a unit of **≥ 30 words**, because FK on a short label or one sentence is
  noise. The reason for 12: the prototype found 980 of 1,465 existing ≥30-word units (67%)
  above grade 10, and 648 (44%) above 12. At 10, an ordinary data fix inside a long
  paragraph during an ingest or a correction would turn into a full prose rewrite. The
  limit drops to 10 once the follow-up audit has rewritten the existing text. That change
  is a one-number edit in the JSON.
- **Proper-noun damping.** A capitalized word that does not start a sentence counts at most
  2 syllables. School, test and program names (WPPSI-IV, Wechsler, Morehead-Cain) are not
  the reader's problem and cannot be rewritten. In the prototype this cut grade >10 flags
  from 1,048 to 980.
- **Sentence limit: more than 30 words fails** (31+). Words are whitespace tokens that
  contain a letter, so figures like `$3,683,971` and `2024–25` don't count.
- **Quoted spans are excluded from every check.** Text inside “…” or "…" is replaced by one
  placeholder word before checking. A verbatim school quote is the school's words, and the
  citation rule forbids rewording it.
- **An explained term passes automatically.** If a jargon match is followed by a
  parenthetical (`matriculation (where a student enrolls)`) or sits inside one
  (`enrolled (matriculated)`), it does not fail. This is the standard's own "explain it
  the first time" rule, made mechanical.
- **Two allow mechanisms.** (a) Inline: `// plain-ok: <token>[, <token>…]` on the string's
  first source line or the line above it, in a `.ts` file. A token is a term's `term` name,
  or `long`, or `grade`. (b) The `allow` array in the JSON, keyed by file plus path/key.
  `en.json` can only use (b), since JSON has no comments. Markers never go inside the
  string, because the string renders.
- **Changed-text detection compares post-edit prose units against pre-edit ones by text.**
  A unit is "changed" when its post-edit value is not among the pre-edit file's prose
  values. A string that only moved is not re-flagged. The pre-edit source comes, in order
  of preference, from `tool_response.originalFile` (if Step 1 confirms it), then from
  reconstruction (Edit: swap `new_string` back to `old_string`, honouring `replace_all`;
  MultiEdit: undo `edits[]` in reverse order), then from `git show HEAD:<path>` (Write
  without `originalFile`), then from empty (untracked new file, where everything is new).
- **Pre-edit TS is imported from a temp copy** in `os.tmpdir()`. Relative import specifiers
  are rewritten to absolute `file://` URLs so they resolve. Never write the temp copy next
  to the original, where Vite's dev server or a glob could see it.
- **Fail open on internal errors.** If a module fails to import (half-finished edit, syntax
  error), print a one-line note and **exit 1**, which does not block. The hook exists to
  enforce writing quality, not to block edits; `tsc -b` catches broken TS.
- **Fast path before any import.** If the repo-relative path neither starts with
  `src/data/` nor equals `src/locales/en.json`, exit 0 immediately. Also exit 0 when
  `CLAUDE_PLAIN_LANGUAGE=off`, so the user can switch it off.
- **No new npm dependency.** The syllable counter is a ~15-line vowel-group heuristic. FK is
  `0.39·(words/sentences) + 11.8·(syllables/words) − 15.59`.
- **The corpus report is never a build gate.** `npm run check:plain` always exits 0 and is
  not chained into `npm run build`. `CLAUDE.md` records three checkers that were parked red
  and stopped being read. A 1,165-finding gate would be the fourth.
- **The data file lives at `scripts/plain_language.json`**, beside the scripts that read it.
  `CLAUDE.md` links to it and names only a few example terms, so the list is never
  duplicated.
- **Promote `classify` to `classifyField(path, leaf)` in `i18n_fields.mjs`**, and switch
  only `i18n_extract.mjs` to import it. Migrating the other four local copies is out of
  scope.

## Approvals needed

None. No card, section, Compare row, metric key or topic changes, and no UX or
user-facing text. No dependency is added. The committed `.claude/settings.json` is the
change the user asked for, and it affects every future session in this repo.

## Out of scope

- **Rewriting any existing prose.** The audit only counts. A follow-up plan does the
  rewrite, sized by the baseline table below.
- Hooking `source-material/**/*.md` or `src/content/**`.
- Translating anything, or touching non-English overlays or catalogs.
- Migrating the other four local `classify` copies (`check_translations.mjs`,
  `check_live_resolution.mjs`, `i18n_audit_skips.mjs`, `check_chrome_keys.mjs`).
- Seeding the `allow` list. It ships empty, because the hook only sees new text and the
  follow-up audit decides which existing terms to keep.
- Changing the existing `check:quals` hook in `.claude/settings.local.json`.

**Follow-up audit plan.** Rewrite the existing prose **one research area at a time**, as a
separate plan per area. Start with **College Support**, which has the most jargon hits (84
in the prototype). Every rewritten passage invalidates its overlay stamps and needs
re-translation into nine locales, so a single all-areas rewrite would be one enormous
Phase 2. Size each pass from Step 9's per-area table (grade 10 and grade 12 columns). Once
every area is done, drop `maxGrade` to 10.

## Steps

Single-phase. It adds no user-facing text.

1. **Capture a real hook payload before writing the parser.** In the implementing session,
   temporarily add a PostToolUse hook to `.claude/settings.local.json` (matcher
   `Edit|Write|MultiEdit`) that runs `cat > "$TMPDIR/plainlang-payload-$(date +%s%N).json"`.
   Do one Edit (with `replace_all` false), one Write, and one MultiEdit if that tool
   exists, all on a scratch file. Inspect the payloads and confirm the `tool_input` field
   names and whether `tool_response.originalFile` is present for each tool. **Remove the
   temporary hook**, then record the findings in `## Implementation notes`. If
   `originalFile` is present for Edit and Write, it is the primary pre-edit source;
   otherwise use the reconstruction chain in Decisions.

2. **Promote `classify` to a shared export.** In `scripts/i18n_fields.mjs`, add:
   ```js
   /** Full-path overrides win, then the skip list, then the prose list. */
   export function classifyField(path, leaf) {
     const override = pathOverride(path)
     if (override !== undefined) return override ? 'prose' : 'skip'
     if (SKIP_KEYS.has(leaf)) return 'skip'
     if (PROSE_KEYS.has(leaf)) return 'prose'
     return 'unclassified'
   }
   ```
   In `scripts/i18n_extract.mjs`, delete the local `classify` (line ~158), import
   `classifyField`, and replace its one call site. **Before editing**, save
   `node scripts/i18n_extract.mjs --report > $SCRATCH/extract-before.txt`. **After**, the
   same command's output must be byte-identical (`diff` empty). `--report` writes no work
   files.

3. **Create `scripts/plain_language.json`**: the single data file.
   ```json
   {
     "_doc": "Plain-language standard data. Read by scripts/check_plain_language.mjs and linked from CLAUDE.md. Add terms here, never in CLAUDE.md.",
     "maxSentenceWords": 30,
     "maxGrade": 12,
     "targetGrade": 10,
     "gradeMinWords": 30,
     "terms": [ … ],
     "allow": []
   }
   ```
   Each `terms` entry is `{ "term": "<name used in messages and plain-ok>", "match":
   "<regex source, matched case-insensitive with \\b on both ends>", "plain": "<what to
   write instead>" }`. The hook and `--report` fail or flag on `maxGrade`. `targetGrade` is
   documentation only: no check fails on it, and `--report` uses it only for its second
   grade column. The starter list:

   | term | match | plain |
   |---|---|---|
   | matriculation | `matriculat(?:e\|es\|ed\|ing\|ion\|ions)` | enroll / enrolled at / where graduates enrolled |
   | differentiated instruction | `differentiated (?:instruction\|learning)` | teaching adjusted to each student's level |
   | rigor | `rigou?r\|rigorous(?:ly)?` | demanding / hard (or say what makes it hard) |
   | pedagogy | `pedagog(?:y\|ies\|ical\|ically)` | teaching / teaching approach |
   | holistic review | `holistic(?:ally)?(?: review\| admissions?)?` | the school looks at the whole application, not just grades and scores |
   | yield rate | `yield rates?` | share of admitted students who enroll |
   | scaffolding | `scaffold(?:ing\|ed\|s)?` | step-by-step support |
   | cohort | `cohorts?` | class / group / grade |
   | formative assessment | `formative assessments?` | practice checks / quizzes that don't count toward the grade |
   | summative assessment | `summative assessments?` | final tests / graded exams |
   | executive function | `executive function(?:ing)?` | planning, organizing and focus skills |
   | social-emotional learning | `social[- ]emotional(?: learning)?\|SEL` | lessons on feelings, friendships and self-control |
   | interdisciplinary | `interdisciplinary` | across subjects / combining subjects |
   | experiential learning | `experiential(?: learning)?` | hands-on learning |
   | articulation | `articulation` | how courses connect from grade to grade |
   | demonstrated interest | `demonstrated interest` | showing a college you really want to attend |
   | need-blind | `need[- ]blind` | admission decided without looking at ability to pay |
   | mastery-based | `mastery[- ]based` | students move on once they have learned the skill |
   | learner profile | `learner profiles?` | a summary of how a student learns best |
   | synchronous / asynchronous | `a?synchronous(?:ly)?` | live / on your own time |
   | leverage | `leverag(?:e\|es\|ed\|ing)` | use |

   (In the JSON, `\|` is a plain `|`. The backslash is only escaping this markdown table.)

   `yield rate` and the two `assessment` terms are deliberately narrow, because the bare
   words are ordinary English. The data contains "the team directory yields roughly 65",
   and "formative years" is common. Never widen them back to bare `yield` / `formative` /
   `summative`.

4. **Create `scripts/check_plain_language.mjs`.** ESM, Node built-ins only. Export the pure
   functions so the tests can import them, and **guard `main()`** behind
   `if (import.meta.url === pathToFileURL(process.argv[1]).href)`. This file must not repeat
   the extractor's run-on-import trap. Structure:

   - **`scopeOf(relPath)`** returns `{ kind: 'module', topic, slug }`,
     `{ kind: 'accessor', topics: [...] }`, `{ kind: 'chrome' }`, or `null`. Derive it from
     `i18n_topics.mjs`: `src/data/${TOPICS[t]}/${slug}.ts` for non-null `TOPICS` values and
     slug ∈ `SLUGS`; the `ACCESSORS` and `EXTRA_LAYERS` module paths (resolved from
     `scripts/` to repo-relative form); and `src/locales/en.json`. Everything else is
     `null`, including `src/data/overlays/**`, `*.es.ts`-style files, `src/content/**`,
     loaders like `src/data/sportsProgram.ts`, and every other `src/data/*.ts`.
   - **`proseUnits(entry, prefix)`** walks the object like `i18n_extract.mjs`'s `walk()`.
     It **skips any object whose `kind === 'verify'`** and keeps string leaves where
     `classifyField(genericPath, leaf) === 'prose'` (`genericPath` = path with `[n]` turned
     into `[]`). It returns `{ path, text }[]`.
   - **`loadUnits(absFile, scope)`**: dynamic-imports the module (cache-busted with
     `?t=<n>`), then:
     - per-school module: `m[EXPORTS[slug]]`
     - accessor: for each slug, call the accessor the way `entryFor` does (a non-function
       export only once, under `SLUGS[0]`), plus the `EXTRA_LAYERS` functions with their
       path prefixes
     - de-duplicate by `text`
     - for chrome: flatten the JSON to `{ key, text }`.
   - **`preEditSource(payload, postSource, relPath)`** follows the chain in Decisions. For
     TS it writes the pre-edit source to `mkdtemp(os.tmpdir()/plainlang-)/<basename>`,
     rewrites `from '(\.\.?/[^']+)'` (and the `"` form) to absolute `file://` URLs, imports
     it, then deletes the temp dir in a `finally`.
   - **`changedUnits(pre, post)`** returns the post units whose `text` is not in the set of
     pre texts.
   - **`normalize(text)`**: the strip pipeline, applied in this order:
     1. markdown links `[label](url)` → `label`
     2. bare URLs (`https?://\S+`, `www\.\S+`, and `\b[\w-]+\.(org|com|edu|net|gov)(/\S*)?`) → removed
     3. citation brackets `(Source: …)`, `[Source: …]`, `(via …)`, `(per …)` → removed
     4. i18next `{{var}}` → `X`, and `<1>…</1>` or HTML tags → removed (text kept)
     5. markdown `**`, `_`, backticks, `#`, `>`, `|` → spaces
     6. quoted spans (“…” and "…") → `Q`
     7. collapse whitespace.
   - **`sentences(text)`** splits after `.`, `!` or `?` (with optional closing quote or
     bracket), **not** after: `a.m.`, `p.m.`, `U.S.`, `St.`, `Dr.`, `Mr.`, `Mrs.`, `Ms.`,
     `No.`, `vs.`, `e.g.`, `i.e.`, `etc.`, `Jr.`, `Sr.`, `Inc.`, `approx.`, `Ph.D.`, single
     initials (`B.`), or a decimal inside a figure (`4.33`, `$3.25M`). Semicolons do not
     split.
   - **`syllables(word)`** and **`fleschKincaid(text)`**, with the proper-noun damping from
     Decisions.
   - **`checkText(text, cfg)`** returns `{ rule: 'jargon'|'long'|'grade', term?, detail }[]`.
     Jargon runs on the normalized text with the parenthetical exemption. Long runs per
     sentence. Grade runs only when the normalized text has ≥ `gradeMinWords` words.
   - **Allow handling.** Drop an issue if (a) a `cfg.allow` entry matches
     `{ file, path|key, term|rule }`, or (b) for TS, a `plain-ok:` comment on the unit's
     line or the line above lists the term name or `long` / `grade`. **`locateLine(source,
     text)`** finds the unit's line by searching for the first 40 chars of the text, then
     the same with `'` → `\'`, then the first 20 chars. If none is found, the line is
     unknown and no inline marker applies.
   - **Modes:**
     - default / `--hook`: read the stdin payload. Fast path (Decisions). Resolve
       `file_path` against `payload.cwd` or `CLAUDE_PROJECT_DIR`. Compute the changed units,
       check them, and on any issue print to **stderr** in the format below and **exit 2**.
       Otherwise exit 0 with no output.
     - `--report [--json]`: walk every in-scope file plus the live content blocks from
       `src/data/overlays/work/financial-aid-tuition.content.es.json` (`sections[].text`).
       Print a **per-file table** (prose units, flagged, jargon, long, grade >`targetGrade`,
       grade >`maxGrade`). Then print a **per-area table**, one row per research area (the
       `TOPICS` key; accessor modules go under their topic, `en.json` under "chrome", the
       content blocks under `financial-aid-tuition`), with the same columns. Finish with
       totals and the top 10 jargon terms. "Flagged" uses `maxGrade`, the hook's rule.
       Always exit 0.
     - `--file <path>`: check every unit in one file (no diff). Useful for manual spot
       checks. Exit 0.
   - **Failure message format** (stderr, exit 2):
     ```
     plain-language: 2 issue(s) in src/data/collegeSupportPrograms/cannon.ts — rewrite for a parent reader (CLAUDE.md "Plain-language standard"):
       outcomes.headline (line 212)
         jargon "matriculation" → enroll / enrolled at / where graduates enrolled — or explain it in parentheses
       edge.levers[1].items[0] (line 340)
         sentence of 41 words (max 30): "The School Profile argues with numbers again, and…"
         reading grade 13.2 (max 12; target 10) over 58 words
     Keep a correct, explained term with `// plain-ok: <term>` on that line, or an `allow` entry in scripts/plain_language.json.
     ```
     Quote at most the first 12 words of a long sentence.

5. **Create `scripts/check_plain_language.test.mjs`** with `node:test` and `node:assert`.
   Import the pure functions directly. For end-to-end cases, spawn the script with a stdin
   payload against a **fixture root**: a `mkdtemp` dir holding
   `src/data/sportsPrograms/cannon.ts` and `src/locales/en.json`. To make that work, the
   script resolves the repo root from `PLAIN_LANGUAGE_ROOT` when it is set, else from
   `payload.cwd` / `CLAUDE_PROJECT_DIR`. Field classification and topic layout still come
   from the real `scripts/`. Cases:
   1. **Jargon caught.** "Most graduates matriculate at UNC campuses." gives one `jargon`
      issue, term `matriculation`.
   2. **Explained jargon passes.** "matriculation (where a student enrolls)" and "enrolled
      (matriculated)" give no issue.
   3. **Long sentence caught.** A 35-word sentence gives a `long` issue. A 30-word one does
      not.
   4. **Clean passage passes.** A ~60-word plain paragraph with short sentences gives `[]`.
   5. **High grade caught at `maxGrade`.** A dense ≥30-word passage scoring above 12 gives a
      `grade` issue. A ≥30-word passage scoring between 10 and 12 gives **no** issue. Assert
      its computed FK falls in (10, 12], so the test proves the line sits at 12, not 10. The
      same dense idea under 30 words gives no `grade` issue.
   6. **URLs and citations ignored.** "See https://www.example.edu/rigor-pedagogy-yield for
      details." and "Tuition rose 4% (Source: Holistic Review Handbook,
      https://x.org/a)." give no jargon issue. "[the rigor page](https://x.org)" **does**
      flag `rigor`, because the label renders.
   7. **Quotes ignored.** `The school calls it “a rigorous, holistic pedagogy.”` gives no
      issue.
   8. **Sentence splitting.** "Doors open at 7:30 a.m. on weekdays. Aftercare runs to 6 p.m."
      is 2 sentences. "The GPA scale tops out at 4.33 for AP courses." is 1.
   9. **Out-of-scope files ignored.** `scopeOf` is `null` for `src/components/Compare.tsx`,
      `src/data/overlays/admissions.es.json`, `src/locales/es.json`, `src/content/sports/cannon.json`,
      `.claude/plans/x.md`, `.claude/docs/DATA-SCHEMA.md`, `scripts/foo.mjs`,
      `src/data/sportsProgram.ts`, `source-material/sports/cannon/x.md`. End-to-end: a Write
      payload for `src/components/X.tsx` exits 0 with empty stderr in **< 150 ms**.
   10. **Only changed text is checked.** In the fixture, the pre-edit file already holds a
       `headline` containing "matriculation". An Edit that changes only `subhead` to clean
       text exits 0. An Edit that changes `subhead` to jargon exits 2 and names `subhead`,
       not `headline`.
   11. **Verify flags ignored.** A fixture `flags: [{ kind: 'verify', text: '…rigorous
       pedagogy…' }]` added by Edit exits 0. The same with `kind: 'gap'` exits 2.
   12. **Skip fields ignored.** A jargon word in a `SKIP_KEYS` field (e.g. a `url`) exits 0.
   13. **Allow mechanisms.** `// plain-ok: matriculation` on the line above passes. An
       `allow` entry for an `en.json` key passes (inject `cfg` directly in the unit test).
   14. **Chrome.** Editing an `en.json` value to "Matriculation outcomes" exits 2 naming
       the key. Adding an unrelated key leaves an existing jargon key unreported.
   15. **Fail open.** A fixture TS file with a syntax error exits 1, not 2.
   16. **Ordinary English is not jargon.** "The team directory yields roughly 65 players."
       and "She spent her formative years in Charlotte." give no `jargon` issue.
       "The yield rate was 40%." and "Teachers use formative assessments weekly." each give
       one.

6. **Add npm scripts** to `package.json`:
   `"check:plain": "node scripts/check_plain_language.mjs --report"` and
   `"test:plain": "node --test scripts/check_plain_language.test.mjs"`. Do **not** chain
   either into `build`.

7. **Create `.claude/settings.json`** (committed):
   ```json
   {
     "hooks": {
       "PostToolUse": [
         {
           "matcher": "Edit|Write|MultiEdit",
           "hooks": [
             {
               "type": "command",
               "command": "node \"$CLAUDE_PROJECT_DIR/scripts/check_plain_language.mjs\" --hook",
               "timeout": 10,
               "statusMessage": "Checking plain language…"
             }
           ]
         }
       ]
     }
   }
   ```
   Leave `.claude/settings.local.json` untouched. Its `check:quals` hook keeps running
   alongside this one.

8. **Add the CLAUDE.md section.** Insert it between `## Presentation and content
   conventions (required)` and `## Testing and verification conventions (required)`. Use
   this text, which is under 40 lines. Adjust the figures only if a threshold changed in
   review:

   ```markdown
   ## Plain-language standard (required)

   **The reader is an average parent**, not an educator, a researcher or an admissions
   officer. English is the source for nine translations, so an unclear English sentence
   becomes nine unclear sentences nobody here can read to fix.

   - **Reading level: 8th–10th grade** (Flesch–Kincaid). Rewrite a passage above grade 10
     rather than defend it. Proper nouns and published figures are the only good reason
     for a long word.
   - **Short sentences.** Aim for 15–20 words and never go past 30. One idea per sentence.
     A run of more than three items becomes a list.
   - **Explain a specialized term the first time it appears, or replace it.**
     "Matriculated" → "enrolled". When the term is the right one (a school's own program
     name, a step a parent must recognize, like "Early Decision"), keep it and explain it
     in parentheses right after.
   - **Concrete numbers over vague words.** "38 of 112 seniors", not "many". "$4,200", not
     "affordable". "Since 2019", not "long-standing". Figures are still copied
     char-for-char from their source.
   - **The jargon list and the thresholds live in one file,**
     [`scripts/plain_language.json`](scripts/plain_language.json): matriculation, rigor,
     pedagogy, holistic review, yield rate and more, each with the plain word to use
     instead. Add a term there, never here.

   **Scope: parent-facing English prose only.** That means the `src/data/**` fields the i18n
   extractor classifies as prose (`classifyField` in `scripts/i18n_fields.mjs`), the live
   `src/content` blocks, and `src/locales/en.json`. It does not cover code, comments,
   dev-only text (`kind: 'verify'` flags, `toVerify` cells), plans, `.claude/docs/`,
   `source-material/` research records or non-English locales. A verbatim school quote
   stays in the school's words.

   **A hook enforces the floor.** After each Edit/Write/MultiEdit on an in-scope file,
   `.claude/settings.json` runs `scripts/check_plain_language.mjs` on **only the changed
   text**. It flags jargon, sentences over 30 words, and passages of 30+ words above
   **grade 12**, and exits 2 with the lines to rewrite. Grade 12 is temporary: most existing
   long passages sit above 10, so a small data fix must not force a rewrite. It drops to 10
   after the follow-up audit. Write to the 8–10 target regardless. To keep a correct,
   explained term, add `// plain-ok: <term>` on the string's line (TS) or an `allow` entry
   in the JSON (the only way for `en.json`). Passing is a floor, not proof of plain writing.
   `npm run check:plain` reports the whole corpus and always exits 0. It is a report, never
   a gate.
   ```

9. **Run the baseline audit and record it here.** Run `npm run check:plain` once and paste
   both of its tables into **`## Baseline audit (real script)`** at the end of this file,
   with the date and the commit it ran on:
   - the **per-area table**, with grade >10 and grade >12 counts, which sizes each
     follow-up pass
   - the **per-file table**.

   Also note any large gap from the prototype estimate below and its cause. **Fix
   nothing.**

10. **Live hook check in the implementing session** (after Step 7, once the hook is
    loaded; if Claude Code only reads settings at startup, do this in a fresh session or
    after `/hooks` reload):
    - Edit `src/data/sportsPrograms/cannon.ts`, adding the word "rigorous" to one prose
      string. Confirm the hook blocks with the expected message, then revert the edit with
      a second Edit, which must pass silently.
    - Edit `CLAUDE.md` or a plan file. It must be silent.
    - Confirm `git diff src/data` is empty afterwards.

11. **Branch, commit and PR.** On `feat/plainlanguage`, stage these paths explicitly (never
    `git add -A`): `CLAUDE.md`, `.claude/settings.json`, `scripts/plain_language.json`,
    `scripts/check_plain_language.mjs`, `scripts/check_plain_language.test.mjs`,
    `scripts/i18n_fields.mjs`, `scripts/i18n_extract.mjs`, `package.json`,
    `.claude/plans/plainlanguage.md`, `.claude/plans/INDEX.md`. Check `git status --short`
    first. PR body via `--body-file`. Squash-merge, then check out `main` and pull.
    **Do not deploy.** Nothing here changes the site, and deploying is always the user's
    call.

## Files touched

| File | Change |
|---|---|
| `CLAUDE.md` | new `## Plain-language standard (required)` section (<40 lines) |
| `.claude/settings.json` | **new**, committed: PostToolUse hook on `Edit\|Write\|MultiEdit` |
| `scripts/plain_language.json` | **new**: thresholds, jargon terms, empty `allow` |
| `scripts/check_plain_language.mjs` | **new**: hook / `--report` / `--file` modes |
| `scripts/check_plain_language.test.mjs` | **new**: `node:test` suite (16 cases) |
| `scripts/i18n_fields.mjs` | add exported `classifyField(path, leaf)` |
| `scripts/i18n_extract.mjs` | import `classifyField`; delete local `classify` |
| `package.json` | `check:plain`, `test:plain` scripts |
| `.claude/plans/plainlanguage.md`, `.claude/plans/INDEX.md` | baseline table, status |

## Verification

- [ ] `node scripts/i18n_extract.mjs --report` gives output byte-identical to the
      pre-refactor capture (Step 2)
- [ ] `npm run test:plain`: all 16 cases pass
- [ ] Timing: a hook run on an out-of-scope path takes **< 100 ms** (`time` with a piped
      payload). An Edit payload on `src/data/courseOfferings.ts` (the largest module, ~5,800
      lines) takes **< 500 ms**. Record both in Implementation notes.
- [ ] `npm run check:plain` exits 0 and prints the per-file table (Step 9)
- [ ] Live hook check (Step 10): blocked on jargon, silent on revert, silent out of scope
- [ ] `npx tsc -b` and `npm run build` pass (nothing here is in the build chain, but the
      extractor refactor touches a script `check:live` drives)
- [ ] `npm run check:live` passes (it consumes the extractor's classification indirectly)
- [ ] The new CLAUDE.md section is ≤ 40 lines (`awk` between the two headings)

No browser check: nothing renders differently.

## Risks

| Risk | Mitigation |
|---|---|
| A grade limit below the corpus's current level makes routine edits churn (at 10, 67% of existing long passages would fail) | The hook blocks at 12, not 10. The ≥30-word minimum and proper-noun damping cut noise further. `maxGrade` drops to 10 only after the follow-up audit has rewritten the existing text. |
| The hook blocks a legitimate verbatim or technical edit | Quotes are excluded. `plain-ok` and `allow` exist. `CLAUDE_PLAIN_LANGUAGE=off` disables it for a session. Internal errors fail open (exit 1). |
| Pre-edit import fails (a module with real relative imports, e.g. `metricValues.ts`, `courseOfferings.ts`) | Import specifiers are rewritten to absolute URLs. Test 10 covers the diff path, and the timing check covers `courseOfferings.ts`. If the pre-edit import fails, fall back to `git show HEAD`, and if that fails too, exit 1. |
| The hook's scope drifts from what the extractor translates | Scope and classification are imported from `i18n_topics.mjs` / `i18n_fields.mjs`, not copied. |
| Changing the extractor breaks translation | Byte-identical `--report` diff plus `check:live`. |
| The hook rewrites push English edits into already-translated units | It only flags units the edit already changed. Their stamps were invalidated by the edit itself, not by the hook. |

## Open questions

- ~~**Grade line: 10 or 12?**~~ **Resolved (user, 2026-11-09):** the hook uses 12
  (`maxGrade`), and 10 is the written target (`targetGrade`). Revisit after the follow-up
  audit and drop `maxGrade` to 10 then.
- **Should `source-material/financial-aid-tuition/**/*.md` be hooked?** Those 44 live
  tuition blocks pass through it. **Default:** no; they are covered by the corpus report.
  Revisit if the follow-up audit finds that layer matters.
- **Are course descriptions in scope?** They are condensed by us, so they are our prose.
  **Default:** yes, in scope, as built.

## Prototype estimate (planning, 2026-11-09 — NOT the real script)

A throwaway prototype in the planning scratchpad applied the rules above (jargon list from
Step 3, >30-word sentences, FK on ≥30-word units with proper-noun damping) to every
in-scope prose unit at commit `f5402fa2`. It is recorded to size the follow-up. Step 9
replaces it with the real script's per-file table.

| Layer | Prose units | Flagged (any) | Jargon | Sentence >30 words | Grade >10 | Grade >12 |
|---|--:|--:|--:|--:|--:|--:|
| `src/content/financial-aid-tuition` (live blocks) | 44 | 3 | 0 | 0 | 3 | 0 |
| `src/data/admissionsPrograms/` | 1331 | 135 | 0 | 77 | 132 | 77 |
| `src/data/afterSchoolPrograms/` | 1055 | 40 | 3 | 23 | 34 | 21 |
| `src/data/artsPrograms/` | 1248 | 131 | 5 | 89 | 121 | 82 |
| `src/data/clubCatalog.ts` | 467 | 23 | 1 | 14 | 22 | 18 |
| `src/data/clubClusters.ts` | 160 | 24 | 0 | 9 | 24 | 15 |
| `src/data/clubsPrograms/` | 478 | 88 | 5 | 45 | 80 | 59 |
| `src/data/collegeSupportPrograms/` | 1950 | 263 | 84 | 114 | 186 | 137 |
| `src/data/courseOfferings.ts` | 3170 | 107 | 42 | 46 | 68 | 58 |
| `src/data/financialAidReports.ts` | 956 | 94 | 3 | 46 | 89 | 53 |
| `src/data/highSchoolPlacementPrograms/` | 128 | 3 | 0 | 2 | 3 | 1 |
| `src/data/internationalTravel/` | 1281 | 27 | 1 | 17 | 26 | 19 |
| `src/data/learningSupport/` | 630 | 11 | 2 | 4 | 9 | 6 |
| `src/data/metricValues.ts` | 591 | 73 | 7 | 40 | 59 | 30 |
| `src/data/sportsPrograms/` | 1246 | 115 | 2 | 86 | 102 | 63 |
| `src/data/summer/` | 1484 | 22 | 0 | 13 | 21 | 9 |
| `src/locales/en.json` | 803 | 6 | 5 | 0 | 1 | 0 |
| **Total** | **17,022** | **1,165** | **160** | **625** | **980** | **648** |

Most units are short labels. Only 1,465 have ≥30 words, so the grade columns are out of
1,465, not 17,022. The prototype's "Flagged (any)" used grade >10. At the hook's grade-12
limit the total is lower; the real script reports it. The prototype also used looser
`yield` / `formative` patterns than Step 3's, so the real jargon count may come in
slightly lower (yield* matched 4). The top jargon hits were matriculat* 45, rigor* 37, leverag* 16,
cohort* 14, interdisciplinary 9, experiential 8 and executive function 8. Most jargon sits
in College Support (84) and Course Offerings (42, mostly "rigorous"). The five `en.json`
jargon hits are `metrics.institutional-leverage`, `metrics.matriculation`,
`highSchoolPlacement.acceptanceNotMatriculation`, `learning.need.attn` (executive
function) and `learning.need.social` (social-emotional).

## Implementation notes

- **Step 1 (payload capture) was not run.** Adding a temporary capture hook to
  `.claude/settings.local.json` was refused by the session's permission classifier as
  self-modification. The parser therefore takes every pre-edit source the plan lists, in
  order, and uses the first that imports: `tool_response.originalFile` when it is a string
  (`type: 'create'` counts as an empty file), then Edit/MultiEdit reconstruction, then
  `git show HEAD:<path>`, then empty. The Step 10 live check exercised the real payload
  end to end: a jargon Edit was blocked with the expected message and the revert passed
  silently, so whichever source the real payload supplied worked. Test 10b covers the
  `originalFile` branch with a synthetic payload.
- **Pre-edit temp copies use `.mts`**, so Node treats them as ESM whatever the temp
  directory's `package.json` situation is.
- **Accessor paths are classified without the school slug.** The slug (`cannon:…`) is added
  after the walk, for messages and `allow` entries only. Classifying with it would break
  `PATH_OVERRIDES` patterns that match from the start of the path.
- **17 tests, not 16.** Case 10b (the `originalFile` branch) was added.
- **Timings (Step 9 verification):** out-of-scope hook run 30 ms; an Edit payload on
  `src/data/courseOfferings.ts` 190 ms; a Write payload on `src/data/metricValues.ts`
  (pre-edit loaded from `git show HEAD` through a temp copy with rewritten imports) 140 ms.
  `--report` over the whole corpus 1.8 s.
- **The CLAUDE.md section is 40 lines** plus the blank separator before the next heading.
- `node scripts/i18n_extract.mjs --report` was byte-identical before and after the
  `classifyField` refactor. `npx tsc -b`, `npm run build` and `npm run check:live` pass.

## Baseline audit (real script)

Run 2026-11-09 by `npm run check:plain` on branch `feat/plainlanguage`, working tree based
on commit `f5402fa2` (no `src/data` or `en.json` changes on the branch).

Plain-language audit — "Flagged" uses the hook's rule (grade >12); grade columns count units of ≥30 words.

#### Per area

| Area | Prose units | Flagged | Jargon | Sentence >30 words | Grade >10 | Grade >12 |
|---|--:|--:|--:|--:|--:|--:|
| admissions | 1341 | 95 | 0 | 73 | 123 | 73 |
| sports | 1307 | 86 | 0 | 77 | 93 | 53 |
| the-arts | 1279 | 107 | 5 | 88 | 122 | 78 |
| student-clubs | 1135 | 104 | 4 | 68 | 124 | 90 |
| college-support | 2042 | 224 | 83 | 110 | 185 | 138 |
| after-school | 1097 | 29 | 3 | 21 | 33 | 19 |
| high-school-placement | 131 | 2 | 0 | 2 | 3 | 1 |
| summer-programs | 1590 | 13 | 0 | 12 | 17 | 8 |
| international-travel | 1296 | 23 | 1 | 17 | 26 | 19 |
| learning-support | 630 | 8 | 2 | 3 | 8 | 5 |
| course-offerings | 3173 | 95 | 37 | 46 | 68 | 58 |
| financial-aid-report | 978 | 68 | 2 | 46 | 88 | 54 |
| metric-values | 908 | 49 | 7 | 35 | 56 | 25 |
| chrome | 803 | 5 | 5 | 0 | 1 | 0 |
| financial-aid-tuition | 45 | 2 | 0 | 2 | 6 | 2 |
| **Total** | 17755 | 910 | 149 | 600 | 953 | 623 |

#### Per file

| File | Prose units | Flagged | Jargon | Sentence >30 words | Grade >10 | Grade >12 |
|---|--:|--:|--:|--:|--:|--:|
| `src/data/admissionsPrograms/providence-day.ts` | 151 | 4 | 0 | 2 | 5 | 2 |
| `src/data/admissionsPrograms/charlotte-latin.ts` | 159 | 19 | 0 | 12 | 22 | 13 |
| `src/data/admissionsPrograms/charlotte-christian.ts` | 197 | 13 | 0 | 11 | 14 | 12 |
| `src/data/admissionsPrograms/charlotte-country-day.ts` | 162 | 5 | 0 | 2 | 7 | 3 |
| `src/data/admissionsPrograms/covenant-day.ts` | 171 | 15 | 0 | 11 | 21 | 11 |
| `src/data/admissionsPrograms/hickory-grove-christian.ts` | 249 | 32 | 0 | 29 | 40 | 28 |
| `src/data/admissionsPrograms/trinity-episcopal.ts` | 134 | 2 | 0 | 2 | 7 | 1 |
| `src/data/admissionsPrograms/charlotte-prep.ts` | 118 | 5 | 0 | 4 | 7 | 3 |
| `src/data/sportsPrograms/providence-day.ts` | 164 | 7 | 0 | 6 | 11 | 5 |
| `src/data/sportsPrograms/charlotte-latin.ts` | 142 | 10 | 0 | 9 | 11 | 8 |
| `src/data/sportsPrograms/charlotte-christian.ts` | 141 | 9 | 0 | 8 | 10 | 6 |
| `src/data/sportsPrograms/charlotte-catholic.ts` | 135 | 8 | 0 | 7 | 8 | 5 |
| `src/data/sportsPrograms/charlotte-country-day.ts` | 136 | 7 | 0 | 5 | 10 | 6 |
| `src/data/sportsPrograms/cannon.ts` | 130 | 8 | 0 | 7 | 9 | 5 |
| `src/data/sportsPrograms/covenant-day.ts` | 112 | 11 | 0 | 10 | 11 | 8 |
| `src/data/sportsPrograms/davidson-day.ts` | 103 | 9 | 0 | 9 | 8 | 4 |
| `src/data/sportsPrograms/carmel-christian.ts` | 66 | 6 | 0 | 5 | 7 | 3 |
| `src/data/sportsPrograms/hickory-grove-christian.ts` | 59 | 4 | 0 | 4 | 2 | 2 |
| `src/data/sportsPrograms/gaston-day.ts` | 68 | 5 | 0 | 5 | 5 | 1 |
| `src/data/sportsPrograms/trinity-episcopal.ts` | 26 | 2 | 0 | 2 | 1 | 0 |
| `src/data/sportsPrograms/charlotte-prep.ts` | 25 | 0 | 0 | 0 | 0 | 0 |
| `src/data/artsPrograms/providence-day.ts` | 107 | 10 | 0 | 10 | 12 | 8 |
| `src/data/artsPrograms/charlotte-latin.ts` | 110 | 6 | 1 | 5 | 11 | 4 |
| `src/data/artsPrograms/charlotte-christian.ts` | 105 | 10 | 0 | 10 | 12 | 8 |
| `src/data/artsPrograms/charlotte-catholic.ts` | 126 | 3 | 0 | 3 | 5 | 3 |
| `src/data/artsPrograms/charlotte-country-day.ts` | 115 | 13 | 0 | 12 | 15 | 9 |
| `src/data/artsPrograms/cannon.ts` | 116 | 14 | 1 | 11 | 15 | 9 |
| `src/data/artsPrograms/covenant-day.ts` | 92 | 1 | 0 | 1 | 1 | 0 |
| `src/data/artsPrograms/davidson-day.ts` | 100 | 14 | 0 | 12 | 17 | 11 |
| `src/data/artsPrograms/carmel-christian.ts` | 81 | 7 | 0 | 5 | 8 | 6 |
| `src/data/artsPrograms/hickory-grove-christian.ts` | 77 | 6 | 0 | 2 | 7 | 6 |
| `src/data/artsPrograms/gaston-day.ts` | 98 | 10 | 1 | 7 | 9 | 7 |
| `src/data/artsPrograms/trinity-episcopal.ts` | 72 | 11 | 2 | 8 | 8 | 5 |
| `src/data/artsPrograms/charlotte-prep.ts` | 80 | 2 | 0 | 2 | 2 | 2 |
| `src/data/clubsPrograms/providence-day.ts` | 50 | 8 | 0 | 4 | 9 | 6 |
| `src/data/clubsPrograms/charlotte-latin.ts` | 36 | 4 | 0 | 2 | 7 | 4 |
| `src/data/clubsPrograms/charlotte-christian.ts` | 46 | 8 | 1 | 3 | 9 | 7 |
| `src/data/clubsPrograms/charlotte-catholic.ts` | 76 | 8 | 1 | 7 | 9 | 7 |
| `src/data/clubsPrograms/charlotte-country-day.ts` | 51 | 6 | 0 | 6 | 5 | 4 |
| `src/data/clubsPrograms/cannon.ts` | 48 | 5 | 2 | 2 | 8 | 4 |
| `src/data/clubsPrograms/covenant-day.ts` | 33 | 3 | 0 | 3 | 4 | 3 |
| `src/data/clubsPrograms/davidson-day.ts` | 15 | 5 | 0 | 4 | 5 | 5 |
| `src/data/clubsPrograms/carmel-christian.ts` | 25 | 4 | 0 | 2 | 6 | 4 |
| `src/data/clubsPrograms/hickory-grove-christian.ts` | 26 | 4 | 0 | 1 | 4 | 3 |
| `src/data/clubsPrograms/gaston-day.ts` | 34 | 5 | 0 | 3 | 6 | 5 |
| `src/data/clubsPrograms/trinity-episcopal.ts` | 49 | 6 | 0 | 5 | 6 | 4 |
| `src/data/clubsPrograms/charlotte-prep.ts` | 19 | 3 | 0 | 3 | 1 | 1 |
| `src/data/collegeSupportPrograms/providence-day.ts` | 202 | 18 | 5 | 10 | 16 | 13 |
| `src/data/collegeSupportPrograms/charlotte-latin.ts` | 190 | 24 | 10 | 11 | 19 | 14 |
| `src/data/collegeSupportPrograms/charlotte-christian.ts` | 189 | 17 | 5 | 7 | 18 | 11 |
| `src/data/collegeSupportPrograms/charlotte-catholic.ts` | 223 | 15 | 12 | 2 | 3 | 2 |
| `src/data/collegeSupportPrograms/charlotte-country-day.ts` | 195 | 27 | 8 | 16 | 31 | 19 |
| `src/data/collegeSupportPrograms/cannon.ts` | 170 | 23 | 7 | 11 | 18 | 15 |
| `src/data/collegeSupportPrograms/covenant-day.ts` | 167 | 12 | 10 | 2 | 4 | 4 |
| `src/data/collegeSupportPrograms/davidson-day.ts` | 181 | 29 | 5 | 17 | 30 | 22 |
| `src/data/collegeSupportPrograms/carmel-christian.ts` | 161 | 17 | 7 | 10 | 12 | 9 |
| `src/data/collegeSupportPrograms/hickory-grove-christian.ts` | 143 | 18 | 7 | 10 | 14 | 10 |
| `src/data/collegeSupportPrograms/gaston-day.ts` | 221 | 24 | 7 | 14 | 20 | 19 |
| `src/data/afterSchoolPrograms/providence-day.ts` | 133 | 3 | 0 | 2 | 3 | 2 |
| `src/data/afterSchoolPrograms/charlotte-latin.ts` | 135 | 2 | 0 | 1 | 2 | 1 |
| `src/data/afterSchoolPrograms/charlotte-christian.ts` | 96 | 4 | 3 | 1 | 2 | 1 |
| `src/data/afterSchoolPrograms/charlotte-country-day.ts` | 123 | 3 | 0 | 2 | 5 | 2 |
| `src/data/afterSchoolPrograms/cannon.ts` | 120 | 3 | 0 | 3 | 3 | 3 |
| `src/data/afterSchoolPrograms/covenant-day.ts` | 50 | 2 | 0 | 1 | 4 | 2 |
| `src/data/afterSchoolPrograms/davidson-day.ts` | 50 | 1 | 0 | 1 | 2 | 1 |
| `src/data/afterSchoolPrograms/carmel-christian.ts` | 97 | 2 | 0 | 2 | 2 | 2 |
| `src/data/afterSchoolPrograms/hickory-grove-christian.ts` | 54 | 3 | 0 | 3 | 3 | 2 |
| `src/data/afterSchoolPrograms/gaston-day.ts` | 101 | 4 | 0 | 3 | 4 | 3 |
| `src/data/afterSchoolPrograms/trinity-episcopal.ts` | 59 | 1 | 0 | 1 | 2 | 0 |
| `src/data/afterSchoolPrograms/charlotte-prep.ts` | 79 | 1 | 0 | 1 | 1 | 0 |
| `src/data/highSchoolPlacementPrograms/trinity-episcopal.ts` | 53 | 1 | 0 | 1 | 1 | 0 |
| `src/data/highSchoolPlacementPrograms/charlotte-prep.ts` | 78 | 1 | 0 | 1 | 2 | 1 |
| `src/data/summer/providence-day.ts` | 196 | 0 | 0 | 0 | 0 | 0 |
| `src/data/summer/charlotte-latin.ts` | 191 | 1 | 0 | 1 | 2 | 1 |
| `src/data/summer/charlotte-christian.ts` | 240 | 2 | 0 | 2 | 2 | 0 |
| `src/data/summer/charlotte-catholic.ts` | 25 | 1 | 0 | 1 | 2 | 0 |
| `src/data/summer/charlotte-country-day.ts` | 195 | 1 | 0 | 1 | 0 | 0 |
| `src/data/summer/cannon.ts` | 205 | 1 | 0 | 1 | 1 | 1 |
| `src/data/summer/covenant-day.ts` | 73 | 2 | 0 | 2 | 1 | 1 |
| `src/data/summer/carmel-christian.ts` | 90 | 0 | 0 | 0 | 0 | 0 |
| `src/data/summer/hickory-grove-christian.ts` | 53 | 1 | 0 | 1 | 2 | 1 |
| `src/data/summer/gaston-day.ts` | 112 | 1 | 0 | 1 | 2 | 1 |
| `src/data/summer/trinity-episcopal.ts` | 115 | 1 | 0 | 0 | 3 | 1 |
| `src/data/summer/charlotte-prep.ts` | 95 | 2 | 0 | 2 | 2 | 2 |
| `src/data/internationalTravel/providence-day.ts` | 289 | 5 | 1 | 2 | 6 | 3 |
| `src/data/internationalTravel/charlotte-latin.ts` | 239 | 5 | 0 | 4 | 6 | 5 |
| `src/data/internationalTravel/charlotte-christian.ts` | 252 | 3 | 0 | 3 | 3 | 1 |
| `src/data/internationalTravel/charlotte-country-day.ts` | 259 | 2 | 0 | 1 | 3 | 2 |
| `src/data/internationalTravel/cannon.ts` | 113 | 3 | 0 | 3 | 3 | 3 |
| `src/data/internationalTravel/davidson-day.ts` | 144 | 5 | 0 | 4 | 5 | 5 |
| `src/data/learningSupport/charlotte-catholic.ts` | 132 | 2 | 1 | 1 | 1 | 0 |
| `src/data/learningSupport/charlotte-country-day.ts` | 140 | 4 | 0 | 2 | 5 | 4 |
| `src/data/learningSupport/cannon.ts` | 121 | 0 | 0 | 0 | 0 | 0 |
| `src/data/learningSupport/davidson-day.ts` | 130 | 2 | 1 | 0 | 1 | 1 |
| `src/data/learningSupport/hickory-grove-christian.ts` | 107 | 0 | 0 | 0 | 1 | 0 |
| `src/data/courseOfferings.ts` | 3173 | 95 | 37 | 46 | 68 | 58 |
| `src/data/financialAidReports.ts` | 978 | 68 | 2 | 46 | 88 | 54 |
| `src/data/metricValues.ts` | 908 | 49 | 7 | 35 | 56 | 25 |
| `src/data/clubClusters.ts` | 160 | 16 | 0 | 9 | 23 | 14 |
| `src/data/clubCatalog.ts` | 467 | 19 | 0 | 14 | 22 | 19 |
| `src/locales/en.json` | 803 | 5 | 5 | 0 | 1 | 0 |
| `src/content/financial-aid-tuition (live blocks)` | 45 | 2 | 0 | 2 | 6 | 2 |

Top jargon terms: matriculation 44, rigor 37, leverage 16, cohort 14, interdisciplinary 9, experiential learning 8, executive function 8, pedagogy 3, holistic review 3, synchronous / asynchronous 2

**Gaps from the prototype, and why.**

- **Prose units 17,755 vs 17,022.** The real script's per-topic units match the
  extractor's own `--report` UNIQUE column exactly where a topic is one module
  (`metric-values` 908, `course-offerings` 3,173, `financial-aid-report` 978). The
  prototype under-counted `metric-values` at 591. Per-school topics run slightly above the
  extractor's UNIQUE count because this script de-duplicates per file, not per topic.
- **Flagged 910 vs 1,165.** The prototype's "Flagged" used grade >10; this column uses the
  hook's grade >12. Grade >10 is 953 here against 980 there.
- **Jargon 149 vs 160.** `yield` and `formative`/`summative` are the narrow Step 3
  patterns, not the prototype's looser ones. Top terms: matriculation 44, rigor 37,
  leverage 16, cohort 14, interdisciplinary 9, experiential learning 8, executive function
  8. College Support still leads (83).

