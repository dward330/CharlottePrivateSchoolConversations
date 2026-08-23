---
name: dd-lower-school-course-offerings-bug
title: Davidson Day Lower School — drop the "Student-to-faculty ratio" pseudo-course, fold 8:1 into the scope note
status: implemented
phases: 2
created: 2026-08-23
branch: fix/dd-lower-school-course-offerings-bug
prs: [186]
---

# Davidson Day Lower School — drop the "Student-to-faculty ratio" pseudo-course

## Goal

Davidson Day's **Lower School Courses** card lists three entries, and the third —
*"Student-to-faculty ratio — The Lower School runs an 8:1 student-to-faculty ratio."* —
is a statistic, not a course. It renders in the course list with a `K–Gr 4` tag and is
counted by the card header ("3 courses"), so a parent reads a school-vitals figure as a
piece of curriculum.

Remove that entry. Preserve the 8:1 fact by appending it to the division's existing
`notPublished` scope note, which is where division-wide context already lives on this
card. Done right, the card header reads **"2 courses"** with no code change (the count is
computed at render), and all nine prose locales continue to resolve rather than silently
falling back to English.

## Context

### Where the data lives

Course Offerings is **one large file keyed by school slug**, not a per-school directory —
unlike `sportsPrograms/`, `artsPrograms/` etc., which do have `davidson-day.ts` files.
There is no `src/data/courseOfferings/` directory; do not go looking for one.

- [`src/data/courseOfferings.ts`](../../src/data/courseOfferings.ts) — the `DAVIDSON_DAY`
  const begins around **line 5791**, registered into `OFFERINGS` at **line 8372**.
- The Lower School division is `DAVIDSON_DAY.divisions[0]`, titled `'Lower School Courses'`,
  `grades: 'Age 2 – Grade 4'`, with a single department named `'What is published'` holding
  three courses. The offending entry is **`courses[2]`**.

The three current courses are `Early Childhood Program` (`Age 2 – JK`), `Specials`
(`K–Gr 4`), and `Student-to-faculty ratio` (`K–Gr 4`).

### The count is computed, not stored

[`src/components/CourseOfferings.tsx`](../../src/components/CourseOfferings.tsx) derives the
header count at render — `const total = base.length` then
`t('courses.countCourses', { count: total })` (~lines 160–166). **Nothing hardcodes "3".**
Deleting the entry flips the header to "2 courses" automatically, in every locale.

The division `teaser` for this card does *not* cite a course count either (it reads
*"No published course or subject list — Davidson Day describes Early Childhood and Lower
School in prose only."*), so no teaser arithmetic needs updating. This is worth confirming
but not worth changing.

### The 8:1 figure exists nowhere else

Grepped `src/data/metricValues.ts` and `src/lib/metrics.ts`: there is **no**
student-to-faculty ratio metric or Compare row for any school. The only "ratio" in the
Compare layer is *college-counselor caseload*, which is a different measure entirely. So
the scope note is the sole surviving home for the 8:1 — if it is dropped from the card and
not re-homed, the fact leaves the app. That is why the note edit is mandatory, not
cosmetic.

The 8:1 is sourced from
`source-material/course-offerings/davidson-day/Davidson Day - Course Offerings - Curriculum Guide.md`
(also mirrored into `src/content/course-offerings/davidson-day.json`). **No new research
is needed** — this plan re-homes a fact already in the repo.

### The overlay layer — the real work, and the trap

Course Offerings prose is translated via content-hash overlays in
`src/data/overlays/course-offerings.<lang>.json`, nine locales
(`ar bn es fa fr hi ht it te`). Each entry is
`{"t": "<translation>", "of": "<FNV-1a hash of the English>", "at": ["<slug>:<field path>"]}`.

Confirmed in `course-offerings.es.json`, the four entries that matter:

| Key | `of` | `at` | Meaning |
|---|---|---|---|
| `2247` | `ceebe46e` | `davidson-day:divisions[0].notPublished` | the scope note — **its English changes, so its hash changes** |
| `2251` | `4d15b9a6` | `…courses[1].tag`, `…courses[2].tag` | `K–Gr 4`, **shared by two courses** |
| `2253` | `c73a6b64` | `…courses[2].title` | "Student-to-faculty ratio" — to be deleted |
| `2254` | `dab5c9ba` | `…courses[2].description` | the 8:1 sentence — to be deleted |

Three consequences the implementer must handle:

1. **Editing the scope note orphans its stamp in all nine locales.** The runtime resolves
   an overlay entry only if `of` still equals the hash of the live English at that path;
   otherwise it **falls back to English silently** — no error, no coverage change. Changing
   the `notPublished` English invalidates `ceebe46e` in all nine files at once. This is the
   exact class recorded in the memory note *"a metricValues.ts string edit orphans overlay
   stamps in all 9 locales."*

2. **`courses[2].tag` is a SHARED entry — do not delete it.** Key `2251` serves both
   `courses[1].tag` and `courses[2].tag` because both are the literal string `K–Gr 4`.
   Deleting the entry would strip the tag from **Specials** too. The correct edit is to
   remove only the `courses[2].tag` path from its `at` array, leaving the entry and its
   translation intact for `courses[1]`.

3. **Index paths shift only if you delete from the middle.** Because the ratio is the
   **last** course (`courses[2]`) in the only department, removing it shifts no sibling
   indices. `courses[0]` and `courses[1]` keep their paths. This is why the fix is safe;
   it would not be if the entry sat first.

### Checks that police this

`npm run build` chains `check:schema`, `check:ranks`, `check:ncsuper`, `check:live`,
`check:chrome`, `check:runtime`, `check:spans`. The two that matter here:

- **`check:runtime`** recomputes stamps from the **work file** — it can pass while the live
  `src/data` English has drifted.
- **`check:live`** walks the **live** modules and is the one that catches an orphaned stamp
  after a `src/data` edit. It is the real gate for this change.

`check:spans` is **already red** on 2–3 pre-existing gaston-day parse failures (per the
`spanguard` / `valuegates` memory notes). Do not treat that as caused by this change; note
its state before starting so the comparison is honest.

## Decisions

- **Drop the ratio entry only; leave `Early Childhood Program` and `Specials`** — user's
  call, 2026-08-23. They are program descriptions rather than named courses too, but they
  describe *curriculum*, which the ratio does not.
- **Re-home the 8:1 into the `notPublished` scope note**, not into the `Specials`
  description — user's call. A division-wide stat attached to one entry that isn't about it
  would be a second, subtler version of the same bug.
- **Do not rename the "courses" noun or the "What is published" department label** — that
  would be a component/locale-key change and a UX-gate matter. Explicitly declined by the
  user in favour of the smallest correct fix.
- **Do not delete the Lower School card** under the no-empty-cards rule — also declined.
  With two entries remaining it is not a zero-item card.
- **Keep the `Age 2 – Grade 4` grade band as-is** — the Early Childhood / Lower School split
  is a real editorial question but a separate one; see *Out of scope*.
- **Two phases**, because the `notPublished` English text changes — a string a parent reads.

## Approvals needed

**None.** This adds no card, section, stat tile, Compare row, metric key or topic, and
changes no component, layout or styling. It edits data and the overlay layer only. The
UX-design gate does not apply.

## Source material

No new research data. The 8:1 figure is already committed at
`source-material/course-offerings/davidson-day/Davidson Day - Course Offerings - Curriculum Guide.md`.
**No `ingest-source-material` run is required** — this plan does not add or change source
material, so re-ingesting would only risk regenerating unrelated files.

## Out of scope

- The `Age 2 – Grade 4` grade band spanning two divisions the school itself separates
  (Early Childhood vs. Lower School K–4). Splitting them would be a **new card** and needs
  UX approval.
- Whether "Early Childhood Program" and "Specials" should be called *courses* at all, and
  the `WHAT IS PUBLISHED / n courses` label wording.
- Adding a student-to-faculty ratio Compare row or metric key for any school.
- The other schools' Lower School cards — untouched.
- `check:spans`' pre-existing gaston-day failures.

## Steps

### Phase 1 — English

1. **Delete the pseudo-course.** In
   [`src/data/courseOfferings.ts`](../../src/data/courseOfferings.ts), inside
   `DAVIDSON_DAY.divisions[0].departments[0].courses`, remove the third object in full:

   ```ts
   {
     title: 'Student-to-faculty ratio',
     tag: 'K–Gr 4',
     description: 'The Lower School runs an 8:1 student-to-faculty ratio.',
   },
   ```

   Leave `Early Childhood Program` and `Specials` exactly as they are.

2. **Append the 8:1 to the scope note.** In the same division, extend `notPublished` so the
   fact survives. Current English ends *"…and the school's full Issuu publication index."*
   Append one sentence:

   > `The Lower School runs an 8:1 student-to-faculty ratio.`

   Keep the school's own phrasing and the `8:1` figure **char-for-char** — it is a published
   figure and must never be re-typed or reformatted.

3. **Record the new hash of the scope note.** After the edit, compute the FNV-1a stamp of
   the new `notPublished` English — the same function the overlay builder uses. Phase 2
   needs this value; write it into the PR description or a scratch note so it survives to
   the second half of the work.

4. **Confirm the count and teaser.** Verify the card header now computes to **2 courses**,
   and that `divisions[0].teaser` still reads correctly (it cites no count, so it should
   need no edit — confirm rather than assume).

5. **Run the Phase 1 verification below**, including the browser check. `check:live` is
   expected to report the Davidson Day `notPublished` entry as unresolvable in all nine
   locales at this point — **that is the correct intermediate state**, and it is exactly
   what Phase 2 fixes. Do not "fix" it by reverting the English or by editing
   `FOREIGN_TOPICS`.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until they confirm the English wording of the extended scope note.

### Phase 2 — Every other locale

Nine prose locales per `PROSE_TRANSLATED` in `src/lib/i18n.ts`:
`ar bn es fa fr hi ht it te`. Files: `src/data/overlays/course-offerings.<lang>.json`.
Mechanism in [`prose-translation-architecture.md`](../docs/prose-translation-architecture.md).

For **each** of the nine files, three edits:

1. **Re-translate and re-stamp the scope note.** Find the entry whose `at` contains
   `davidson-day:divisions[0].notPublished` (key `2247` / `of: ceebe46e` in `es`; the key
   number may differ per file — **match by the `at` path, never by key or index**, per the
   standing "key translation maps by text, never by index" rule). Append the translated 8:1
   sentence to its `t`, and update `of` to the new hash from Phase 1 step 3.

   The `8:1` digits are copied **char-for-char** — no locale re-types a figure. `hi`/`te`
   regroup at render, so the stored data keeps the source form; `fa`/`ar` are RTL, so if the
   figure sits against directional text, wrap per the LRI…PDI convention the rollout docs
   describe.

2. **Delete the two dead entries.** Remove the entry whose `at` is
   `…divisions[0].departments[0].courses[2].title` (key `2253` in `es`) and the one for
   `…courses[2].description` (key `2254` in `es`). Both served only the deleted course.

3. **Prune — do not delete — the shared tag entry.** The entry whose `at` array holds both
   `…courses[1].tag` and `…courses[2].tag` (key `2251`, `of: 4d15b9a6` in `es`) is shared.
   Remove **only** the `courses[2].tag` string from its `at` array. Leave the entry, its
   `t` (`K–Gr 4`) and its `of` untouched — deleting it would strip the tag from **Specials**
   in all nine locales.

4. **Run the Phase 2 verification below.** `check:live` must return to its pre-change state
   for Course Offerings across all nine locales.

## Phase 1 result — the stamp Phase 2 needs

Phase 1 shipped on branch `fix/dd-lower-school-course-offerings-bug`. The `notPublished`
scope note's FNV-1a stamp changed as predicted:

| | stamp |
|---|---|
| old English (`of` in all nine overlays today) | `ceebe46e` |
| **new English — write this into every locale's `of`** | **`33ee6ab5`** |

New English (the value Phase 2's nine translations must correspond to):

> Davidson Day publishes no course lists, subject lists, or named curriculum programs for
> Early Childhood or Lower School. Verified against the live pages, their October 2025
> Wayback captures, and the school’s full Issuu publication index. **The Lower School runs
> an 8:1 student-to-faculty ratio.**

`check:live` at end of Phase 1 flags **three** stamps per locale, not the one the plan
predicted — `ceebe46e` (the re-stamped note) plus `c73a6b64` and `dab5c9ba`, the title and
description of the deleted course. That is correct: the check flags any shipped entry whose
English no longer exists, and those two English strings were deliberately removed. All three
are resolved by Phase 2's steps 1–2. The shared tag `4d15b9a6` is confirmed **absent** from
the failures.

## Files touched

| File | Change |
|---|---|
| `src/data/courseOfferings.ts` | edit — delete `DAVIDSON_DAY.divisions[0]…courses[2]`; append the 8:1 sentence to that division's `notPublished` |
| `src/data/overlays/course-offerings.ar.json` | edit — re-stamp + extend the scope note; delete 2 entries; prune 1 shared `at` |
| `src/data/overlays/course-offerings.bn.json` | edit — same |
| `src/data/overlays/course-offerings.es.json` | edit — same (keys `2247`, `2253`, `2254`, `2251`) |
| `src/data/overlays/course-offerings.fa.json` | edit — same, RTL figure handling |
| `src/data/overlays/course-offerings.fr.json` | edit — same |
| `src/data/overlays/course-offerings.hi.json` | edit — same, lakh/crore locale |
| `src/data/overlays/course-offerings.ht.json` | edit — same |
| `src/data/overlays/course-offerings.it.json` | edit — same |
| `src/data/overlays/course-offerings.te.json` | edit — same, lakh/crore locale |

No component, locale-catalog (`src/locales/*.json`), or generated-doc changes are expected.
If `npm run check:schema` demands a `DATA-SCHEMA.md` regeneration, run `npm run schema` —
but a course count is not part of that doc's surface, so it most likely will not.

## Verification

Record `npm run check:spans`' output **before** starting — it is already red on
pre-existing gaston-day failures, and the comparison must be against that baseline.

### Phase 1 — English

- [ ] `npx tsc --noEmit` — clean
- [ ] `npm run check:schema` — passes (regenerate with `npm run schema` if it demands it)
- [ ] `npm run check:live` — **expected to flag exactly one path**,
      `davidson-day:divisions[0].notPublished`, as unresolvable in each of the nine locales.
      Any *other* newly unresolvable path means a wrong edit — most likely the shared tag.
- [ ] **Browser check** (this repo's standing rule — every post-100% defect has been
      render-layer): load Davidson Day → Course Offerings, expand **Lower School Courses**,
      and confirm: the ratio row is gone; the header reads **"2 courses"**; the scope note
      now ends with the 8:1 sentence; and **Specials still shows its `K–Gr 4` tag**.
- [ ] Confirm the department filter/search still returns both remaining entries.

### Phase 2 — Locales

- [ ] `npm run check:live` — back to baseline; **zero** unresolvable Davidson Day paths in
      all nine locales. This is the gate that proves the re-stamp worked.
- [ ] `npm run check:runtime` — passes (non-empty, length-ratio rules over all ten overlays)
- [ ] `npm run check:sepdrift -- --lang <code>` for each locale — the `8:1` must appear
      verbatim; a locale that re-typed it as `8：1` or `8,1` is a finding
- [ ] `npm run check:chrome` — passes (no new chrome keys expected; confirms none crept in)
- [ ] `npm run build` — full chain succeeds, with `check:spans` no worse than the recorded
      baseline
- [ ] **Browser check in at least two locales, one RTL** — `es` and `fa`. Expand the Lower
      School card in each: the ratio row absent, "2 courses" in the local plural form,
      `Specials`' tag present, and the 8:1 reading left-to-right inside the RTL paragraph.

## Risks

| Risk | Mitigation |
|---|---|
| Deleting the shared `K–Gr 4` tag entry strips the tag from **Specials** in all nine locales | Prune the `at` array only, never the entry. Browser check explicitly confirms Specials' tag. |
| Scope-note stamps left orphaned → nine locales silently fall back to English on that paragraph | `check:live` is the gate and must be zero at end of Phase 2; a silent fallback produces no error otherwise. |
| Re-typing `8:1` during translation | `check:sepdrift` per locale; figures are copied char-for-char. |
| Matching overlay entries by key number instead of `at` path | Key numbers differ per file. The plan states the `es` keys only as examples — always match on the `at` path. |
| The 8:1 fact lost entirely if step 2 is skipped while step 1 lands | No other home exists in the app (verified: no such metric or Compare row). Steps 1 and 2 ship in the same commit. |

## Open questions

- Should the scope note's new sentence lead or trail the existing text? — **default:** trail
  it, as the final sentence, since the note runs "what is not published" first and this is
  a positive fact about the division.
- Does `check:schema` need a regeneration? — **default:** run `npm run schema` if
  `check:schema` fails, commit the result; otherwise touch nothing generated.

## Implementation notes

Both phases shipped as planned; the plan's analysis of the overlay layer was
accurate in every particular. Four things worth recording.

**`strings` is an ARRAY, not an object.** The plan (and the initial read) referred
to overlay entries by key — `2247`, `2251`, `2253`, `2254`. Those are array
*indices*, not object keys, in both the shipped overlays and the work files. An
edit written as `delete strings[k]` leaves a hole rather than removing an entry.
The edit was done as an array filter instead. This does not change the plan's
advice — matching on the `at` path rather than the number was correct for a
second reason it did not name.

**The work files needed the same three edits.** The plan's *Files touched* table
lists only `src/data/overlays/course-offerings.<lang>.json`. Each has a sibling
under `src/data/overlays/work/` carrying the English `text` alongside `t`, and
`check:sepdrift` reads the **work** files, not the shipped ones — so a work file
left stale would have gone unnoticed by the gate the plan nominated to catch a
re-typed figure. 18 files were edited, not 9; each work entry also had its `text`
updated to the new English.

**No bidi isolate is stored for `fa`/`ar`, and none was added.** The plan
suggested wrapping the figure per LRI…PDI "if it sits against directional text."
Measured first: **zero** of the 2,934 entries in either RTL overlay contain
U+2066 or U+200E, isolates are applied at *render* by `format.ts` and only to
money runs, and both locales already shipped this exact sentence unisolated as
the course description. The browser check confirms `8:1` reads left-to-right
inside the RTL paragraph unaided. Adding an isolate would have diverged from
every neighbouring entry to fix a problem that does not occur.

**`es` needed a re-worded sentence, not the shipped one.** The other eight
locales reuse their own rendering of the deleted course description verbatim.
Spanish had spelled the ratio out — *"una proporción de 8 estudiantes por
docente"* — which carries no `8:1` token. Re-homing it unchanged would have put a
figure into the scope note in a form no parent could match against the school's
page, and `check:sepdrift` would not have caught it (the token is simply absent,
not drifted). Changed to *"una proporción estudiantes-docentes de 8:1"*.

**Two corrections to the plan's stated baselines**, both in the harmless
direction:

- `check:spans` is **green**, not "already red on 2–3 pre-existing gaston-day
  parse failures". Those were fixed at some point after the memory note the plan
  drew on was written. Baseline recorded green before starting; still green after.
- `check:live` is **not** known-incomplete for this topic any more — it passes
  cleanly over course-offerings in all nine locales. PR #167 fixed the
  incomplete topic map, so it functioned here exactly as the plan hoped: it
  flagged three stamps per locale at the end of Phase 1 and returned to zero
  after Phase 2.

**One leak removed as a side effect.** `te` had left the deleted course's title
untranslated (`"Student-to-faculty ratio"`). Deleting the entry drops it, so
`npm run i18n:leaks -- --lang te` falls 18 → 17 Davidson Day flags. `es` is
unchanged at 7. The remaining flags in both are grade-band tags in other
divisions — pre-existing and the legitimate-keep class.

No `DATA-SCHEMA.md` regeneration was needed; `check:schema` passed untouched, as
the plan's open question predicted.
