---
name: usspelling
title: American spelling for parent-facing English — fix the corpus, carry every translation over by re-stamp, gate it in the build
status: in-progress
phases: 1
created: 2026-11-09
branch: feat/usspelling
prs: []
---

# American spelling for parent-facing English

## Goal

The site's readers are Charlotte parents, but its English mixes British and American
spelling (`programme`, `enrolment`, `centre`, `maths`, `judgement`, …). This plan:

1. Writes the rule down and enforces it. The plain-language hook flags British forms in
   text Claude edits, and a new `check:spelling` gate in `npm run build` fails on any
   British form in scope. That catches hand edits and generated text too.
2. Fixes every existing British form in parent-facing prose, mechanically. Spelling
   changes only, with named exceptions for quotes and proper nouns.
3. Keeps every existing translation in all nine prose locales. Each affected overlay
   entry is **re-stamped** to the new English, with its translated text carried over. No
   re-translation.

Done means: `npm run check:spelling` reports 0, `npm run build` passes (including
`check:live` and `check:runtime`), and a Spanish page shows the same Spanish as before
on every edited field, with no fallback to English.

**Single-phase. It adds no new user-facing text that needs translation.** The English
edits are spelling-only, so the meaning of every translated string is unchanged and its
`t` carries over (Step 11). There is still **one review stop** (after Step 9). The user
checks the review file before the translations are re-stamped and the PR opens. That is
a check of the spelling work. It is not an English-first translation phase.

Do this **before** the remaining per-area plain-language plans, so their rewrites start
from American spelling.

## Context

### Scope: the same as the plain-language hook

`scripts/check_plain_language.mjs` defines "parent-facing prose" without re-inventing it:

- every `src/data` string leaf that `classifyField()` (`scripts/i18n_fields.mjs`) calls
  `prose`, in the modules laid out by `scripts/i18n_topics.mjs` (`TOPICS` dirs ×
  `SLUGS`, plus `ACCESSORS` and `EXTRA_LAYERS`);
- minus `kind: 'verify'` flag objects (dev-only; `proseUnits()` skips them);
- plus every value in `src/locales/en.json`.

The relevant exports: `proseUnits`, `scopeOf`, `loadUnits` (de-duplicates by text),
`unitsFromSource`, `normalize`, `analyze`, `checkText`, `filterAllowed`, `locateLine`,
`loadConfig`. The private `corpus(root)` lists every in-scope file. `normalize()` already
strips Markdown link targets, bare URLs, `*.org/.com/.edu` hosts, `(Source…)`/`(via…)`/
`(per…)` citations, `{{i18next}}` placeholders, and `“…”` / `"…"` quotes. The new rule
reuses those exemptions.

Config lives in `scripts/plain_language.json` (`terms`, `allow`, thresholds). An `allow`
entry is `{ file, path | key, term | rule }`. In TS files, a `// plain-ok: <name>` marker
on the string's line (or the line above) also allows it. `filterAllowed()` matches the
marker or the `allow.term` against `iss.term` for jargon and `iss.rule` otherwise.

The hook runs from `.claude/settings.json` (PostToolUse, `Edit|Write|MultiEdit`, command
`node "$CLAUDE_PROJECT_DIR/scripts/check_plain_language.mjs" --hook`). Tests:
`scripts/check_plain_language.test.mjs` (`npm run test:plain`, `node:test`, with a
fixture root via `PLAIN_LANGUAGE_ROOT`). `npm run check:plain` (`--report`) is a
whole-corpus report that runs in about 1.6 s and always exits 0.

`src/content/**` is **out of scope**. It is generated from `source-material/` by
`build_site_content.py`. Its rendered part, the 45 live `financial-aid-tuition` content
blocks, holds **0** British forms (checked at planning time). Cannon's non-live content
blocks hold many `programme`/`enrolment`, but they do not render.

### Planning-time inventory (re-measured by `/implement` in Step 8)

Counted per prose **path** (not de-duplicated): **276 British occurrences in 252 prose
units across 49 files**, which is 48 `src/data` files plus `src/locales/en.json`.

By form: programme 99, enrolment 36, programmes 17, maths 13, centre 10, judgement 10,
signalling 7, organisation 6, recognised 6, cancelled 5, cancelling 3, labelled 3,
recognises 3, catalogue 3, artefact 3, instalment 3, itemised 3, behaviour 2,
penalised 2, totalling 2, honoured 2, honours 2, counselling 2, defence 2, colour 2,
authorisation 2, emphasising 2, and 1 each of enrols, totalled, fibres, formalise,
fibre, practising, rigour, mould, organise, recognising, favourably, analyse, favour,
personalised, specialised, enrol, socialising, favourites, watercolour, colourful,
centres, fulfilment, calibre, instalments, authorise, digitises.

Heaviest files: `financialAidReports.ts` 72 (mostly the shared framing template "never a
judgement that the aid programme is small…", plus `Enrolment deposit` labels and the
`Merit, Discounts & Special Programmes` section titles), `afterSchoolPrograms/gaston-day.ts`
21, `collegeSupportPrograms/cannon.ts` 18, `collegeSupportPrograms/charlotte-latin.ts` 13,
`artsPrograms/charlotte-catholic.ts` 11, `artsPrograms/gaston-day.ts` 11. The one
`en.json` hit is `highSchoolPlacement.acceptanceNotMatriculationText` ("per-school
enrolment counts").

**These are our own wording, not the schools'.** The sources use American spelling. For
example, Covenant Day's course catalog says "emphasizing life sports" and "fulfillment of
Scripture", while our data says "emphasising" and "fulfilment". Only the exceptions
below are the school's or an institution's own spelling.

### Exceptions found at planning time (re-confirmed in Step 8)

| Text | Where | Why kept | How it is allowed |
|---|---|---|---|
| `IB Diploma Programme` | `collegeSupportPrograms/charlotte-country-day.ts` `transcript.stats[2].label`, `edge.levers[0].items[0]` | Official IB program name | `spelling.keep` phrase |
| `Stephanie Mould` | `artsPrograms/charlotte-prep.ts` `visual.footnote` | A person's name | `spelling.keep` phrase |
| `Centre` (in "…Wofford, Agnes Scott, Centre") | `collegeSupportPrograms/carmel-christian.ts` `outcomes.buckets[3].note` | Centre College (Danville, KY). The same college is `Centre College` in six `outcomes.colleges[].name` fields | `// plain-ok: centre` marker on that line |
| `Centre College` | (none in prose today) | Keeps any future prose mention safe | `spelling.keep` phrase |
| `"like practising artists,"` | `artsPrograms/cannon.ts` `ladder.divisions[0].items[1]` | Inside a quotation | Automatic (quote exemption) |

Every other capitalized hit is sentence-initial or our own heading, and it changes:
`Enrolment deposit`, `Merit, Discounts & Special Programmes`,
`What the Aid Programme Actually Awards`, `Colour and painting.`, `Watercolour painting`,
`Colourful activities`, `Emphasising STEAM`, `Cancelling costs…`, `Specialised technical
schools`. `Reading or Maths section split` becomes `Math`, which is the SAT section's
actual name.

### British forms deliberately left alone (outside scope)

Found at planning time, listed in the review file, **not changed**:

- **Non-prose fields** (not extracted, out of the hook's scope). These are citation
  `sources[].label` titles (e.g. "College Guidance programme page", "labelled
  \"Sample\"", "maths note"), six `outcomes.colleges[].name` = `Centre College`
  (a proper noun), and `summer/gaston-day.ts` `catalog.camps[7].name` =
  `Zoo Camp — cancelled`. The last one is a camp-name field that renders English in
  every locale. Note it as a follow-up and do not change it here.
- **`kind: 'verify'` flags** (dev-only): 7 hits (e.g. "travelled", "programme page",
  "enrolment").
- **Code comments** in `src/data/**` (e.g. "modelled", "summarised").
- **Docs**: `src/data/overlays/NOTES.md` (glossary row "enrolment deposit"), the
  generator text behind `.claude/docs/DATA-SCHEMA.md` ("A middle-school programme…"),
  `source-material/**`.

### The overlay pipeline, and why re-stamping works

- A work file `src/data/overlays/work/<topic>.<lang>.json` holds
  `strings: [{ text, of, at[], t }]`. `of` = `stamp(text)` (FNV-1a, in
  `scripts/i18n_stamp.mjs`). `at` = `school:path` sites. Entries are de-duplicated by
  text within a topic.
- `scripts/i18n_build_overlay.mjs --topic T --lang L` compiles it to
  `src/data/overlays/<topic>.<lang>.json` as `{ t, of, at }`. It drops `text` and any
  entry with an empty `t`.
- At runtime, `src/lib/localizeData.ts` indexes entries **by `at` path** and serves `t`
  only when `hit.of === stampFor(liveEnglish)`. Otherwise the field silently falls back
  to English. So re-stamping means: give the entry the new English's `text` and `of`,
  and keep its `t`.
- `scripts/i18n_splice_work.mjs --lang L [--topic T] [--dry-run]` re-extracts fresh
  (throwaway `__splice` lang) and joins **by stamp**. It prints kept / added (`t: ''`) /
  dropped. A changed English string therefore shows up as one *dropped* old entry plus
  one *added* new one. The splice alone loses the translation. **Step 11's new script
  pairs each added entry with its predecessor by `at` path in the base (`main`) work
  file, proves the English diff is spelling-only, and copies the predecessor's `t`.**
  plaincollege (#467) paired entries the same way by hand. This plan makes the pairing
  a script with a proof.

**Dry run at planning time** (map applied to every work file's `text`, with the
exceptions above):

| per locale (all nine identical) | count |
|---|---|
| entries whose English changes | **241** |
| of those, untranslated (`t: ''`) | 0 |
| of those, `t` byte-identical to old English (keeps) | 0 |
| new English equals an *existing* entry's English (merge) | 2, both `financial-aid-report`: Latin's `Enrolment deposit · $2,500, non-refundable` and `Enrolment deposit` merge into Providence Day's existing `Enrollment …` entries. The translations are already identical, so there is no conflict |
| two changed entries collapsing to one new English | 0 |
| translations that embed the British English word as a kept loanword | 22 entries across 8 locales (none in `es` or `fr`). Examples: hi `aquatic centre`, ar/bn/hi/ht/it/te `honours`, bn `dual-enrolment`, it/te `Maths`, fa `fibre art` |

So the expected splice result per locale is **239 added / 241 dropped**, and Step 11
fills all 239. These numbers are from planning time. The implementer re-measures them,
and they must be identical across the nine locales.

Other checks after the re-stamp:

- `check:live` / `check:runtime` — pass once overlays are rebuilt (stamps match the
  live English again; `t` is non-empty and its length ratio is unchanged).
- `check:digits` — compares only stamps new since `main`. That is all ~239 × 9. Digits
  are untouched, so the expectation is 0 findings.
- `check_work_integrity.mjs` — its assertion 1 (`text`/`of`/`at` unchanged) **fails by
  design** on every re-stamped entry (memory `comparerows-shipped`: it always fails
  after a splice). Verify by stamp with Step 11's own proof instead.
- `check:fr` — its `FROZEN` list holds no British form. French `t` is never touched.
- `src/locales/*.json` other than `en` — keyed by key, not hashed. The one `en.json`
  edit needs no catalog change.

## Decisions

- **`theatre` / `theater` are left alone.** (User decision, 2026-11-09.) Neither is in
  the map, and neither is flagged by the hook or the gate. "Theatre" is an accepted
  American spelling for the art form. About 100 of its 223 prose uses are names (NC
  Theatre Conference, Educational Theatre Association, IB Theatre, "Theatre I",
  "Musical Theatre", venues). The `_doc` string in `plain_language.json` says this, so a
  later pass does not "fix" it.
- **American forms that look British stay out of the map**: `enrolled`, `enrolling`
  (American double-l), `towards`, `dialogue`, `monologue`, `archaeology`, `aesthetic(s)`,
  `analyses` (a valid plural noun), `practice` (noun). Spelling only, never word choice.
  `at university` and similar are wording, not spelling, and stay out of scope.
- **`cancelled`/`cancelling`/`labelled`/`totalled`/`signalling`/`counselling` become
  single-l.** This is Merriam-Webster's and AP's first spelling. Both forms appear in
  American text, but one standard is the point.
- **Exceptions are phrase-level by default** (`spelling.keep` in `plain_language.json`,
  masked before matching, case-sensitive). The inline `// plain-ok: centre` marker is
  for a single site where the British word stands alone. **Path-level `allow` entries
  are avoided**: paths carry array indices that shift, and `loadUnits` de-duplicates by
  text, so a second site of the same text could escape a path entry.
- **One shared implementation.** `findBritish()` / `toAmerican()` / `isSpellingOnly()`
  are exported from `check_plain_language.mjs` and used by the hook, the gate, the fixer
  and the re-stamp script. The exemption logic must not be copied anywhere else.
- **The gate is a mode of `check_plain_language.mjs`** (`--spelling`), not a new script.
  It walks the same `corpus()` the report walks. It covers `src/data` plus `en.json`
  only. It does **not** cover the `financial-aid-tuition` live content blocks that
  `--report` includes, because they are generated from `source-material/` and outside
  the user's scope (today they hold 0).
- **The English fix is done by a script that classifies each source occurrence by its
  effect.** A blind find-and-replace over `.ts` source would hit comments, citation
  labels, `Centre College` names and verify flags. The fixer only edits an occurrence
  whose replacement changes exactly one prose leaf in the expected way (Step 8).
- **Embedded British loanwords inside translations get the same spelling fix, in every
  locale except `fr`.** 22 entries were found, e.g. hi `aquatic centre` →
  `aquatic center`. Only forms that changed in that entry's own English diff are
  replaced, and only as whole Latin-script words. `fr` is excluded because `programme`,
  `centre` and `catalogue` are correct French. Every such edit is listed in the review
  file. It is a spelling change inside kept English, not a re-translation. (If the user
  rejects this at the review stop, drop Step 11's `--fix-embedded` flag; nothing else
  changes.)
- **Merges keep the existing translation.** If a new English string equals one that
  already exists, the fresh extract gives one entry with both sites. When its
  predecessors' `t` values agree (both planning-time merges do), carry that `t`. When
  they disagree, the script stops and reports. It never picks one silently.
- **The review file is committed** at `.claude/plans/usspelling-data/review.md`, matching
  `plaincollege-data/`.

## Approvals needed

- **None for UX.** No card, section, row, key or layout changes.
- **The review stop after Step 9.** The user reads `usspelling-data/review.md` (every
  change, every exception, every out-of-scope hit) and confirms before Step 10.
  Exception rulings given there are applied before the re-stamp.

## Out of scope

- `theatre`/`theater` (see Decisions).
- Non-prose fields, verify flags, code comments, docs, `source-material/`, `src/content/`.
  They are listed in the review file but not changed. `Zoo Camp — cancelled` is a
  candidate follow-up.
- Any rewording, plain-language fix, jargon fix or other correction "in passing", even
  where the hook would flag it. The jargon and grade rules are not tightened here.
- Re-translating anything, or touching `fr` translations at all.
- Deploying. Merged work waits for the user's own deploy instruction.

## Steps

Single-phase — the English edits are spelling-only and every translation is carried over
by re-stamp (no new translatable text). One review stop after Step 9.

1. **Branch and baseline.** `git checkout main && git pull && git checkout -b
   feat/usspelling`. Confirm the starting state is clean by stamp: for each of
   `es bn ht te fr fa it hi ar`, run `node scripts/i18n_splice_work.mjs --lang <l>
   --dry-run`. Each must print **0 added / 0 dropped**. If not, stop: `main`'s work
   files have drifted, and the pairing in Step 11 would mix that drift in. Also run
   `npm run check:live && npm run check:runtime` (both pass on `main`).

2. **Spelling data in `scripts/plain_language.json`.** Add a top-level `spelling` object.
   Update the top `_doc` to mention it.
   ```json
   "spelling": {
     "_doc": "British → American, parent-facing English only (CLAUDE.md 'American spelling'). Keys are lowercase whole words; matching is case-insensitive and the fix keeps the original's case (Programme → Program, PROGRAMME → PROGRAM). `keep` phrases are masked before matching (case-sensitive): official names and proper nouns. Quotes, URLs and citations are exempt as in the jargon rule. theatre/theater are deliberately NOT here — both are American usage and ~100 uses are names (user, 2026-11-09). Also deliberately absent: enrolled, enrolling, towards, dialogue, archaeology, aesthetic, analyses.",
     "map": {
       "programme": "program", "programmes": "programs",
       "enrolment": "enrollment", "enrolments": "enrollments", "enrol": "enroll", "enrols": "enrolls",
       "centre": "center", "centres": "centers", "maths": "math",
       "judgement": "judgment", "judgements": "judgments",
       "catalogue": "catalog", "catalogues": "catalogs",
       "organisation": "organization", "organisations": "organizations", "organise": "organize", "organised": "organized", "organising": "organizing",
       "recognise": "recognize", "recognised": "recognized", "recognises": "recognizes", "recognising": "recognizing",
       "defence": "defense", "licence": "license",
       "behaviour": "behavior", "behaviours": "behaviors",
       "colour": "color", "colours": "colors", "colourful": "colorful", "watercolour": "watercolor",
       "favour": "favor", "favourably": "favorably", "favourite": "favorite", "favourites": "favorites",
       "honour": "honor", "honours": "honors", "honoured": "honored", "rigour": "rigor",
       "signalling": "signaling", "cancelled": "canceled", "cancelling": "canceling", "labelled": "labeled",
       "totalling": "totaling", "totalled": "totaled", "counselling": "counseling", "counsellor": "counselor", "counsellors": "counselors",
       "modelled": "modeled", "modelling": "modeling", "travelled": "traveled", "travelling": "traveling",
       "instalment": "installment", "instalments": "installments", "fulfilment": "fulfillment",
       "artefact": "artifact", "artefacts": "artifacts",
       "itemised": "itemized", "penalised": "penalized", "authorisation": "authorization", "authorise": "authorize",
       "emphasise": "emphasize", "emphasising": "emphasizing", "formalise": "formalize", "personalised": "personalized",
       "specialised": "specialized", "socialising": "socializing", "digitises": "digitizes",
       "summarise": "summarize", "summarised": "summarized", "analyse": "analyze", "analysed": "analyzed",
       "practise": "practice", "practising": "practicing",
       "fibre": "fiber", "fibres": "fibers", "calibre": "caliber", "mould": "mold"
     },
     "keep": ["IB Diploma Programme", "Stephanie Mould", "Centre College"]
   }
   ```
   The map is every form found in the data, plus the close inflections of the same
   words and the forms the user named (modelled, travelled, summarised). Do not grow it
   into a general dictionary. `rigour` stays in both the jargon `terms` and here; they
   report separately.

3. **Shared functions in `scripts/check_plain_language.mjs`** (exported, pure):
   - `spellingRegex(cfg)`: compiled once per cfg, `\b(?:k1|k2|…)\b`, `gi`.
   - `maskedSpans(text, cfg)`: the `[start, end)` ranges exempt from spelling. These
     are Markdown link targets `](…)`, bare URLs, `www.…`, `*.org/.com/.edu/.net/.gov`
     hosts and paths, `(Source…|via…|per…)` and `[Source…]` citations, `{{…}}`,
     `“…”` and `"…"` quotes, and every `cfg.spelling.keep` phrase. Use the **same
     regexes as `normalize()`**: lift them into a shared `const` list that both
     functions read, so they cannot drift apart. Ranges are computed on the **raw**
     text, because the fixer needs real positions.
   - `findBritish(text, cfg)` → `[{ index, form, american }]` for unmasked matches.
     `american` keeps the case of `form`: all-caps → all-caps, initial capital →
     initial capital, else lowercase.
   - `toAmerican(text, cfg)` → text with every `findBritish` hit replaced.
   - `isSpellingOnly(oldText, newText, cfg)` → `{ ok, diffs }`. Split both on
     `/(\b)/`-style word/non-word boundaries (e.g. `s.split(/([A-Za-z]+)/)`). They need
     the same token count and identical non-word tokens. Every differing word pair must
     satisfy `map[old.toLowerCase()] === new.toLowerCase()` with the case pattern kept.
     `diffs` lists the `(old, new)` pairs. This is what Step 11 uses to *prove* a
     re-stamp is safe, so it must not consult `keep` or masks. It checks the diff, not
     the policy.

4. **The `spelling` rule in `analyze()`.** After the jargon loop, for each distinct
   `form` from `findBritish(text, cfg)` (raw text, since masking is built in), push
   `{ rule: 'spelling', term: form.toLowerCase(), detail: \`British spelling "${form}" →
   "${american}" (CLAUDE.md "American spelling")\` }`. Report each form once per unit.
   In `filterAllowed()`, change
   `const name = iss.rule === 'jargon' ? iss.term : iss.rule` to treat `spelling` like
   `jargon`, so `// plain-ok: centre` and `{ …, term: 'centre' }` both work. Update the
   `formatFailure()` header to name both standards. Update its last line to say that a
   British form is fixed by spelling it the American way, or kept with a `spelling.keep`
   phrase when it is a proper noun. The hook then blocks a British form in any changed
   prose unit with no other code change, because it already runs `checkText()`.

5. **`--spelling` gate mode and report column.**
   - In `main()`: `if (args.includes('--spelling')) return spellingMode()`.
     `spellingMode()` walks `corpus(root)` (src/data + `en.json`; **not** the
     live-content block the report adds). It runs `checkText` + `filterAllowed` exactly
     as `reportMode` does, keeps only `rule === 'spelling'`, and prints each finding as
     `file:line path — "programme" → "program"`. It **exits 1 on any finding**, and
     otherwise prints `check:spelling: 0 British forms in N prose units` and exits 0. A
     module that fails to load is a failure (exit 1), not a skip. A gate that skips a
     file passes by doing nothing.
   - `reportMode`: add a `spelling` count to `tally()` and a "British spelling" column
     to both tables (and the JSON).
   - `package.json`: `"check:spelling": "node scripts/check_plain_language.mjs --spelling"`.
     **Do not chain it into `build` yet** (Step 12).
   - Update the header comment's mode list.

6. **Tests in `scripts/check_plain_language.test.mjs`.** Unit cases:
   - `findBritish`: `programme`→`program`, `Programme`→`Program`, `PROGRAMME`→`PROGRAM`,
     `dual-enrolment` (the hyphen boundary).
   - No hit on `enrolled`, `enrolling`, `theatre`, `theater`, `towards`, `dialogue`,
     `analyses`, `programmatic`.
   - Exempt: inside `“…”` and `"…"`; inside a URL and a Markdown link target (the link
     *text* is still checked); inside `(Source: … programme page)`; the `keep` phrases
     `IB Diploma Programme` and `Stephanie Mould` (while a bare `programme` in the same
     string is still found).
   - `toAmerican` round-trip; `isSpellingOnly` true for a mapped change, false for any
     other word change, a punctuation change, a digit change, or a case change outside
     the pattern.
   - `filterAllowed` honoring `// plain-ok: centre` and an `allow` `term` entry.
   - `proseUnits` still skipping a `kind: 'verify'` flag that contains `programme`.

   End-to-end (fixture root):
   - The hook exits 2 when an edit adds `programme` to a prose field. It exits 0 when
     the same word is added inside a quote, in a non-prose field, or in a comment.
   - `--spelling` exits 1 on a fixture with a British form and 0 on a clean one.

   `npm run test:plain` must pass.

7. **CLAUDE.md rule.** Add one bullet to the end of `## Presentation and content
   conventions (required)`. Not in the plain-language section, which is at its limit.
   > - **American spelling.** Parent-facing English uses American spelling (`program`,
   >   `enrollment`, `center`, `math`, `judgment`). Quotes, official names and proper
   >   nouns keep their own spelling (`IB Diploma Programme`, `Centre College`); `theatre`
   >   and `theater` are both fine. The map and the kept names live in
   >   `scripts/plain_language.json`; the hook flags new British forms and
   >   `npm run check:spelling` fails the build on any.

   Keep it to that length. CLAUDE.md has no other spelling text to reconcile.

8. **Fix the English, with the review file.** First add the one inline exception: in
   `src/data/collegeSupportPrograms/carmel-christian.ts`, append `// plain-ok: centre`
   to the line holding `outcomes.buckets[3].note` (or the line above it, if the string
   is multi-line). Then write `scripts/fix_spelling.mjs` (one-off but committed; not
   chained anywhere):
   - For every in-scope `.ts` file from the same file list as `corpus()` (factor
     `corpus` into an export rather than copying it), load **all** string leaves with
     their classification. That means prose / non-prose / inside a verify flag, per
     path, **without** de-duplication. Load the original module (or `unitsFromSource`'s
     temp-dir technique for modified sources).
   - Find every `spellingRegex` match in the **source text**. For each one, write the
     source with that single occurrence replaced (case kept) to a temp dir, using
     `unitsFromSource`'s import-rewriting. Then re-import and diff all leaves. **Apply
     the occurrence only if exactly one leaf changed, that leaf is prose and not in a
     verify flag, the change equals `toAmerican(oldLeaf)` restricted to that
     occurrence, and the occurrence is not masked** (quote, keep phrase, URL, citation)
     and not on a `// plain-ok:` line for that form. Otherwise leave it and record why:
     `comment` (no leaf changed), `non-prose`, `verify flag`, `masked: <reason>`, or
     `inline marker`. As an optimisation, try all of a file's occurrences at once first,
     and fall back to one at a time only if the whole-file diff is not clean.
   - `--write` applies the accepted occurrences. `--check` re-imports every in-scope
     module and asserts, per path, against `git show main:<file>`: every non-prose and
     verify-flag leaf is byte-identical; every prose leaf equals
     `toAmerican(oldLeaf)`; the set of paths is unchanged. Exit 1 on any mismatch.
   - `--review <md>` writes `.claude/plans/usspelling-data/review.md` with:
     **(a)** a summary (occurrences, units and files changed, per-form counts);
     **(b)** every change, as a table `file | path | before → after`, with the changed
     words in bold and about 60 characters of context, grouped by file;
     **(c)** every exception kept and why (keep phrase / quote / marker);
     **(d)** every British form left outside scope (non-prose field, verify flag,
     comment), so the user sees what was deliberately not touched;
     **(e)** a placeholder section for Step 11's translation report.

   Edit the one `en.json` value by hand (`enrolment` → `enrollment` in
   `highSchoolPlacement.acceptanceNotMatriculationText`) and add it to the review file
   (the fixer can list `en.json` units directly from `flattenJson`).

   Expect about **271 occurrences changed** (276 minus IB ×2, Mould ×1, Carmel `Centre`
   ×1, and the quoted `practising` ×1). Any difference from the planning-time
   inventory above must be explained in the review file's summary, not just reported.
   With `CLAUDE_PLAIN_LANGUAGE` left on, edits made by the script do not go through the
   hook (it only fires on Claude's Edit/Write). That is fine, because Step 9's gate is
   the check.

9. **Verify the English, then STOP.**
   - `node scripts/fix_spelling.mjs --check` → exit 0.
   - `npm run check:spelling` → `0 British forms`.
   - `npm run test:plain` → pass. `npx tsc -b` → clean (memory: trust `tsc -b`, not
     `tsc --noEmit`).
   - `npm run schema && npm run check:schema`. Commit any regenerated
     `DATA-SCHEMA.md` (it quotes some data labels).
   - Commit with explicit paths: the two scripts, `plain_language.json`, the test file,
     `package.json`, `CLAUDE.md`, the edited `src/data/**` files, `src/locales/en.json`
     and the review file. Check `git status --short` first. Never `git add -A`.
     `check:live` is **expected** to fail at this point (stale stamps), which is why the
     build is not run yet.
   - **→ STOP. End the turn.** Give the user the review file path and its summary
     numbers, and ask them to confirm the changes and exceptions. Apply any ruling
     (move an item into `keep`, revert one) with the fixer or by hand. Then re-run Step
     9's checks before Step 10.

10. **Re-extract (splice) every locale.** For each of `es bn ht te fr fa it hi ar`:
    `node scripts/i18n_splice_work.mjs --lang <l>` (all topics). Record each locale's
    TOTAL row. Expect about **239 added / 241 dropped** per locale, and the **same
    numbers in all nine**. A locale that differs means a work file drifted, so stop and
    investigate before Step 11.

11. **Re-stamp: `scripts/i18n_restamp.mjs`** (new, committed). Usage:
    `node scripts/i18n_restamp.mjs --lang <l> [--topic T] [--base main] [--fix-embedded] [--dry-run] [--report <md>]`.
    - For each topic work file: load the current (spliced) file and the base file from
      `git show <base>:src/data/overlays/work/<topic>.<l>.json`. Index the base entries
      by every `at` path.
    - For each current entry with `t === ''` whose `of` is **not** in the base (i.e.
      added by the splice): collect the distinct base entries at its `at` paths. Then:
      - If there are none → **unpaired**, a failure.
      - Every predecessor must pass `isSpellingOnly(pred.text, entry.text, cfg)`.
        Identical text passes too, which is the merge case. Otherwise → **not
        spelling-only**, a failure.
      - Predecessors' `t` must all be equal and non-empty. Otherwise → **conflict**, a
        failure.
      - Set `entry.t = pred.t`. With `--fix-embedded` and `<l> !== 'fr'`: for each
        `(old, new)` in that entry's `diffs`, replace whole-word, case-insensitive
        occurrences of `old` in `t` with `new` (case kept). Record each such edit.
    - Entries whose `of` was already in the base are left untouched (the splice kept
      them).
    - Print a table per topic: `carried`, `merged`, `embedded fixes`, `failures`. Exit
      1 on any failure and write nothing for that locale (all-or-nothing per locale).
    - **Proof printed at the end** (this replaces `check_work_integrity`'s by-design
      false positive). Every entry whose stamp is in the base has `text`/`t`
      byte-identical to the base. Every new-stamp entry has `t` equal to its
      predecessor's `t`, or the logged embedded fix of it. No entry has an empty `t`
      that the base had translated.
    - `--report` appends that locale's carried / merged / embedded-fix list to section
      (e) of `.claude/plans/usspelling-data/review.md`.

    Run it with `--dry-run` for all nine first and compare the numbers to the
    planning-time dry run (241 changed, 2 merges, ~22 embedded fixes, 0 conflicts).
    Then run for real with `--fix-embedded --report …`.

12. **Rebuild overlays and chain the gate.**
    - For every topic in `TOPICS` (`scripts/i18n_topics.mjs`) × the nine locales:
      `node scripts/i18n_build_overlay.mjs --topic <t> --lang <l>`. Then
      `git status --short src/data/overlays/`. Only topics with changed entries may
      show a diff. An untouched topic that changed means the work file differs from its
      overlay on `main`, so stop and investigate.
    - `package.json` `build`: insert `&& npm run check:spelling` right after
      `npm run check:schema`.

13. **Full verification** (see Verification below). Then commit the work files, overlays,
    `i18n_restamp.mjs`, `package.json` and the updated review file (explicit paths).

14. **PR and index.** Push, confirm with `git rev-parse HEAD` vs
    `git ls-remote origin feat/usspelling`, and open the PR with `--body-file`. Give
    the summary numbers and link the review file. Squash-merge with
    `gh pr merge --squash --delete-branch`, then `git checkout main && git pull`.
    Update `.claude/plans/INDEX.md` (status `Implemented`, PR link) and this plan's
    frontmatter plus an `## Implementation notes` section. Do that **on a branch with a
    PR**: never commit to `main`, not even for the index. **Do not deploy.** End with
    "merged — ready to deploy whenever you want it."

No skill or slash command changes, so `.claude/SKILLS.md` is untouched.

## Files touched

| File | Change |
|---|---|
| `scripts/plain_language.json` | edit: `spelling` { `_doc`, `map`, `keep` } |
| `scripts/check_plain_language.mjs` | edit: shared mask list, `findBritish`/`toAmerican`/`isSpellingOnly`/`spellingRegex`, `spelling` rule, `filterAllowed` name, `--spelling` gate, report column, exported `corpus` |
| `scripts/check_plain_language.test.mjs` | edit: spelling unit and e2e tests |
| `scripts/fix_spelling.mjs` | new: per-occurrence fixer with `--write` / `--check` / `--review` |
| `scripts/i18n_restamp.mjs` | new: pair by `at`, prove spelling-only, carry `t` |
| `package.json` | edit: `check:spelling` script; chained into `build` after `check:schema` |
| `CLAUDE.md` | edit: one "American spelling" bullet in Presentation and content conventions |
| `src/data/**` (~48 files) | edit: spelling only; one `// plain-ok: centre` marker in `collegeSupportPrograms/carmel-christian.ts` |
| `src/locales/en.json` | edit: one value |
| `src/data/overlays/work/*.{es,bn,ht,te,fr,fa,it,hi,ar}.json` | edit: spliced + re-stamped |
| `src/data/overlays/*.{9 locales}.json` | rebuilt for affected topics |
| `.claude/docs/DATA-SCHEMA.md` | regenerated if it changed |
| `.claude/plans/usspelling-data/review.md` | new: the review file |
| `.claude/plans/usspelling.md`, `.claude/plans/INDEX.md` | status + implementation notes |

## Verification

Before the review stop (Step 9):

- [ ] `node scripts/fix_spelling.mjs --check` — exit 0 (non-prose and verify leaves
      byte-identical to `main`; every prose leaf equals `toAmerican(old)`)
- [ ] `npm run check:spelling` — `0 British forms`
- [ ] `npm run test:plain` — all pass
- [ ] `npx tsc -b` — clean
- [ ] `npm run check:schema` — clean (after `npm run schema`)
- [ ] Review file has sections (a)–(d), and its summary reconciles with the inventory

After the re-stamp (Step 13):

- [ ] `node scripts/i18n_restamp.mjs --lang <l> --dry-run` for all nine — 0 failures,
      identical numbers across locales
- [ ] `npm run check:live` — pass
- [ ] `npm run check:runtime` — pass
- [ ] `npm run check:translations` — no drift
- [ ] `npm run check:digits` — 0 findings (it compares the new stamps)
- [ ] `npm run check:fr` — pass
- [ ] `for l in es bn ht te fr fa it hi ar; do npm run check:sepdrift -- --lang $l; done`
      — no new findings against `main`
- [ ] `npm run check:spelling` — 0, and `npm run build` — passes end to end (now
      including `check:spelling`)
- [ ] **Browser check** (`npm run build && npx vite preview`, headed Chrome via
      Playwright, every `<details>` open). On Gaston Day's After School page in `en`,
      "program"/"enrollment" render. In `es`, `hi` and `ar`, the same cards render the
      translated text, not English. Pick 3 changed paths from the review file and
      confirm their exact `t` appears. On Providence Day's College Support page in
      `hi`, `honors` (not `honours`) appears inside the Devanagari prose, which confirms
      an embedded fix rendered. On Charlotte Latin's financial-aid report in `fr`, the
      `Enrollment deposit` labels still render in French (the merge case).
- [ ] Negative test of the gate. Temporarily add `programme` to one prose string and
      run `npm run check:spelling`: it should exit 1 naming that file and path. Revert
      and diff the file back to clean. Read which message printed.

## Risks

| Risk | Mitigation |
|---|---|
| A blind replace in `.ts` hits comments, citation labels, `Centre College` names or verify flags | The fixer applies an occurrence only when it changes exactly one prose leaf as expected; `--check` re-proves it per path against `main` |
| A re-stamp attaches a translation to a different sentence | Pairing is by `at` path, never by index, and `isSpellingOnly` proves the old and new English differ only by mapped words. Anything else fails the locale |
| Work files on `main` already drifted, so the splice mixes in unrelated changes | Step 1's dry-run baseline must show 0/0. Step 10 requires identical numbers across locales |
| Gate and hook disagree with the fixer about exemptions | One `findBritish` and one shared mask list serve all of them |
| `check_work_integrity` reports thousands of violations | Known false positive after a splice; Step 11's by-stamp proof replaces it |
| Gate parks the build red on a future ingest that adds a British word from research | That is the intent. The fix is American spelling or a `keep` phrase for a real name. Never weaken the gate to a report |
| `fr` translations damaged by the embedded fix (`programme` is French) | `fr` is excluded from `--fix-embedded` by locale code |

## Open questions

- **Should the embedded British loanwords inside translations be fixed?** These are 22
  entries (e.g. hi `aquatic centre`, it `Maths`). — **default:** yes, in every locale
  except `fr`, each listed in the review file. If the user says no at the review stop,
  run Step 11 without `--fix-embedded`.
- **`Zoo Camp — cancelled`** (a non-prose camp-name field that renders English in every
  locale). — **default:** leave it. Listed in review section (d) as a possible
  follow-up.
