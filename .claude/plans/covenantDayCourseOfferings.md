---
name: covenantDayCourseOfferings
title: Add Covenant Day's Lower and Middle School course offerings, and reconcile the High School list to the school's own academics pages
status: english-done
phases: 2
created: 2026-08-17
branch: feat/covenant-day-course-offerings
prs: []
---

# Add Covenant Day's Lower and Middle School course offerings, and reconcile the High School list

## Goal

Covenant Day is currently the only JK–12 school in the app whose Course Offerings section
shows a **single division card** (High School). The Lower School (JK–5) and Middle School
(6–8) cards are missing — not because the school publishes nothing, but because an earlier
research pass could not retrieve what it publishes and recorded that retrieval failure as a
confirmed absence.

This plan adds both missing division cards from the school's own academics pages, and — in
the same pass — reconciles the existing High School card against those same pages, which
turned out to disagree with the shipped data in eleven courses, one whole department, and
about eight course names.

We will know it worked when the Covenant Day page's Course Offerings header reads
**3 divisions** instead of 1, the Lower and Middle cards render with per-grade department
tabs, and every High School course title matches the school's published wording.

## Context

### What is shipped today

`src/data/courseOfferings.ts:5135` — `const COVENANT_DAY` has exactly one entry in
`divisions[]`: `'High School Courses'`. A block comment at
[`courseOfferings.ts:5126-5134`](../../src/data/courseOfferings.ts#L5126-L5134) states the
omission is deliberate ("HIGH SCHOOL ONLY by design"), and a trailing comment at
[`courseOfferings.ts:5280-5283`](../../src/data/courseOfferings.ts#L5280-L5283) repeats it.
Both cite the no-empty-cards rule. **Both rest on a false premise and must be rewritten**,
not merely added to — a future pass that reads them will otherwise re-conclude the same
thing.

The claim traces to
`source-material/course-offerings/covenant-day/Covenant Day School - Course Offerings - Curriculum Guide.md`,
whose provenance header said the JK–8 pages "describe competencies, not named course lists
… (confirmed absence)". That header has been corrected during planning (see **Source
material** below).

### Why the earlier pass missed it — the mechanism that matters

The Covenant Day academics pages are Finalsite. The curriculum tiles ("6th Grade",
"Fifth Grade", "Math", …) are **posts whose body is not in the page HTML**. Clicking a tile
fires `showElementPopupDialog` and fetches the body separately. A plain `curl` of
`/academics/middle-school` returns the tile *titles* and zero course text — which reads
exactly like a school that publishes no curriculum.

The retrieval that does work, confirmed during planning for all 21 tiles:

```
curl -sL "https://www.covenantday.org/fs/elements/<ELEMENT_ID>?is_popup=true&post_id=<POST_ID>&show_post=true"
```

| Division | Page | `ELEMENT_ID` | Tiles (`post_id`) |
|---|---|---|---|
| Lower | `/academics/lower-school` | `40062` | 666–673 (JK, K, 1st–5th, Specials) |
| Middle | `/academics/middle-school` | `40346` | 675–678 (6th, 7th, 8th, Electives) |
| High | `/academics/high-school` | `40349` | 679–687 (9 departments) |

**All 21 payloads are already captured verbatim in `source-material/` — `/implement` does
not need to re-fetch anything.** The commands are recorded only so the data is refreshable
later.

### The grain of what each division publishes

- **Lower (JK–5)** — per-grade **subject areas with competency prose** (Language Arts,
  Math, Bible, Science, Social Studies, Art), not named courses. Plus a **Specials** tile
  with six genuinely named courses: Art, Music, CREATE Junior, Spanish, Physical Education,
  Library.
- **Middle (6–8)** — per-grade subject areas *plus* genuinely named honors tracks:
  `ENGLISH HONORS` (7th, 8th), `MATH HONORS (Pre-Algebra)` (7th), `MATH HONORS (Algebra)`
  (8th). World Languages names Latin IA (7th) and Latin IB (8th). The Electives tile names
  CREATE, art, band, Spanish, drama, choir, broadcast journalism.
- **High (9–12)** — nine departments of fully named, level-qualified courses.

The subject-area grain in Lower/Middle is the `notPublished` case the type already
documents at [`courseOfferings.ts:64-77`](../../src/data/courseOfferings.ts#L64-L77). The
nearest precedent is **Cannon's Lower School division**
([`courseOfferings.ts:3181-3200`](../../src/data/courseOfferings.ts#L3181-L3200)): subject
names as `title`, grade band as `tag`, competency prose condensed into `description`, and a
`notPublished` note stating the grain is the school's choice. Follow it.

### Two constraints the implementer would otherwise trip over

**1. Division order is load-bearing — APPEND, never prepend.** Locale overlays key on
**index paths** like `covenant-day:divisions[0].departments[2].courses[5].title`
(`src/data/overlays/course-offerings.*.json`, 179 Covenant-Day entries per locale × 9
locales). `SchoolDetail.tsx:758` renders `offerings.divisions.map(...)` in array order with
no sort. Inserting Lower/Middle at index 0 would shift every existing High School path by
two and silently orphan all 179 entries in all 9 locales — the runtime falls back to English
with **no error and no coverage change**
([`localizeData.ts:15-20`](../../src/lib/localizeData.ts#L15-L20)).

Keep `divisions[0]` as High School and append Middle at `[1]`, Lower at `[2]`. **Carmel
Christian already ships in exactly this order** (High → Middle → Lower,
[`courseOfferings.ts:5989`](../../src/data/courseOfferings.ts#L5989),
[`:6141`](../../src/data/courseOfferings.ts#L6141),
[`:6243`](../../src/data/courseOfferings.ts#L6243)), so this is the established pattern, not
a workaround.

**2. The High School reconcile still breaks stamps — deliberately.** Renaming a course
title or editing a description changes the English, so its FNV-1a stamp stops matching and
those specific entries go stale. That is correct behaviour (staleness degrades to English,
never to wrong), and Phase 2 re-extracts them. It is called out so the implementer does not
mistake `check:translations` drift for a bug.

### The High School drift, itemised

Verified during planning by diffing the nine academics-page department tiles against the
shipped `COVENANT_DAY` block. The academics pages are the school's **current
self-published catalog**; the shipped data came from the older 2026-27 Profile PDF.

**Missing (11 courses, one whole department):**

| Department | Missing |
|---|---|
| Math | `Liberal Arts Math` (CP), `AP Calculus BC` |
| Bible | `Old Testament Survey (9th Grade)`, `New Testament Survey (10th Grade)`, `Christian Doctrine (11th Grade)`, `Engaging the Culture - An Introduction to Apologetics and Worldviews (12th Grade)` — replacing the placeholder row `Bible (each year)` |
| World Languages | `AP French` |
| Restoration & Sustainability | `ContainIt` |
| **Other** (new dept) | `Individual Research Project`, `Strength & Fitness Training`, `Student Assistant` |

**Renames (shipped → published):**

`Anatomy Honors` → `Anatomy & Physiology Honors` · `US History` → `U.S. History` (both CP
and Honors) · `AP US History` → `AP U.S. History` · `AP Government & Politics: US` →
`AP U.S. Government & Politics` · `AP Latin` → `AP Latin: Caesar and Vergil` · `AP Spanish`
→ `AP Spanish Language` · `Introduction to Engineering` → `Intro to Engineering` ·
`Government & Economics` → `Government and Economics`.

**Department change:** the shipped `PE` department does not exist on the academics page —
its single course is published as `Strength & Fitness Training` under **Other**. Remove the
`PE` department and fold the course into `Other`.

**Two footnote markers to preserve** (the school's own, on the academics page):
`*` = "Course offering may be impacted by student enrollment" (AP Calculus BC, AP French);
`**` = "available for dual enrollment with Covenant College" (Honors Calculus, Honors
Statistics, Honors Literature & Philosophy). The shipped descriptions already encode dual
enrollment in prose — keep that convention rather than shipping raw asterisks.

### Compare metrics

Three course metrics live in `src/data/metricValues.ts` and are all **Upper-School-scoped**,
so Lower/Middle add nothing to them:

- `us-courses` (line 113) — `'covenant-day': '80'`
- `advanced-courses` (line ~169) — `'covenant-day': '15 AP'`
- `us-departments` (line ~212) — `'covenant-day': '9'`

All three must be **recounted from the corrected High School list** and their inline
provenance comments repointed at the academics page. No new metric keys, no new rows.

## Decisions

- **Lower School uses per-grade departments** (JK, K, 1st–5th, Specials as 8 tabs), each
  grade's subject areas as course rows — *chosen by the user over a subject-first
  transpose*. It matches how the school itself organises the page.
- **High School is fully reconciled to the academics page**, including renames and the
  `PE` → `Other` department change — *user's call*. The academics page is current
  self-publication; the Profile PDF is older.
- **Metrics: recount the three Upper-School figures only** — *user's call*. No Lower/Middle
  metric is added, so no UX-design-gate approval is needed.
- **Divisions are appended (High → Middle → Lower), not reordered** — protects 179×9
  existing overlay entries, and mirrors Carmel.
- **`guideYear` stays `'2026-27'`** — the High School Profile year still describes the
  catalog year; the academics pages carry no year of their own.
- **The Curriculum Guide source file is kept, not deleted** — it holds Profile-only material
  (graduation units, GPA weighting, AP gating, edition drift) the academics pages do not
  carry. It is marked superseded for course lists.
- **The two "HIGH SCHOOL ONLY by design" code comments are rewritten, not just amended** —
  they are the reason this gap persisted, and a stale comment reproduces the bug.

## Approvals needed

**None.** This plan adds no new card, section, stat tile, Compare row, metric key, or topic,
and changes no component, layout, or styling. It adds two `Division` entries to existing
data and corrects a third — the "adding, correcting, and extending the data behind cards and
sections the app already has" case that the UX-design standard explicitly allows. The
`notPublished` note and the division-count header both render through existing code paths
(`CourseOfferings.tsx:173`, `SchoolDetail.tsx:704`).

## Source material

**Already written during planning, uncommitted.** `/implement` runs the
`ingest-source-material` skill over these before touching app code.

| File | Contents |
|---|---|
| `source-material/course-offerings/covenant-day/Covenant Day School - Course Offerings - Lower School Curriculum.md` | All 8 Lower tiles verbatim (JK, K, 1st–5th, Specials) |
| `source-material/course-offerings/covenant-day/Covenant Day School - Course Offerings - Middle School Curriculum.md` | All 4 Middle tiles verbatim (6th, 7th, 8th, Electives) |
| `source-material/course-offerings/covenant-day/Covenant Day School - Course Offerings - High School Course and Elective Offerings.md` | All 9 High department tiles verbatim |

Each carries a provenance header, the division page URL, the popup `ELEMENT_ID`, the
per-tile `post_id` index, and the reproducible `curl`. Sources:

- https://www.covenantday.org/academics/lower-school
- https://www.covenantday.org/academics/middle-school
- https://www.covenantday.org/academics/high-school

**Also edited during planning:** the provenance header of
`… - Course Offerings - Curriculum Guide.md` now carries a `⚠️ CORRECTION (2026-08-17)`
block retracting the "confirmed absence" and pointing at the three new files.

## Out of scope

- **Other schools.** Only `covenant-day` changes in `courseOfferings.ts` and
  `metricValues.ts`.
- **Other Covenant Day research areas** — sports, arts, clubs, college support, etc. are
  untouched.
- **Component, layout, or styling changes.** Everything renders through existing code.
- **New Compare rows or metric keys**, including any Lower/Middle course metric.
- **The 7 known English-leak strings** recorded in `CLAUDE.md` — unrelated, still open.
- **Deploying.** Merging is not publishing; `npm run deploy` remains the user's call.

## Steps

### Phase 1 — English

1. **Ingest the staged research.** Run the `ingest-source-material` skill so the three new
   `source-material/course-offerings/covenant-day/*.md` files land in the distilled notes
   and `src/data/schools.json`. Confirm `npm run check:metrics` reports no new
   "file on disk but not ingested" line for them. *(11 pre-existing advisories are baseline
   — 10 unrelated `branding`/`_shared` files and the `summer-programs`/`davidson-day` gap.
   Do not try to fix those here.)*

2. **Reconcile the High School division** in `src/data/courseOfferings.ts` (`COVENANT_DAY`,
   `divisions[0]`, currently lines ~5139–5279), against
   `… - High School Course and Elective Offerings.md`:
   - Add the 11 missing courses listed in **Context → The High School drift**.
   - Replace the single `Bible (each year)` placeholder row with the four named Bible
     courses, tagging each with its grade (`9th Grade` … `12th Grade`).
   - Apply the 8 renames so every `title` matches the school's published wording verbatim.
   - Delete the `PE` department; move its course into a new `Other` department as
     `Strength & Fitness Training`, alongside `Individual Research Project` and
     `Student Assistant`. Keep the "PE credit is also earnable via two school sport seasons"
     fact in that course's `description`.
   - Write descriptions in the existing house style — level/sequence facts condensed from
     the school's own catalog language, never invented prose.
   - Update the division `teaser` (its counts must match the new data) and repoint `source`
     / `sourceUrl` at `https://www.covenantday.org/academics/high-school`.

3. **Append the Middle School division** as `divisions[1]`, from
   `… - Middle School Curriculum.md`. Departments = `6th Grade`, `7th Grade`, `8th Grade`,
   `Electives`. Within each grade, one course row per published subject area (Language Arts,
   Math, Bible, Science, Social Studies, World Languages, Physical Education), **plus the
   genuinely named honors tracks as their own rows** — `English Honors` (7th, 8th),
   `Math Honors (Pre-Algebra)` (7th), `Math Honors (Algebra)` (8th) — each tagged `Honors`.
   Name Latin IA (7th) and Latin IB (8th) under World Languages. Set:
   - `title: 'Middle School Courses'`, `grades: 'GRADES 6 – 8'`
   - `notPublished` — that Covenant Day publishes per-grade subject areas and competencies
     for 6–8 alongside its named honors tracks, rather than a full course catalog.
   - `source: 'Covenant Day Middle School Curriculum (academics page)'`,
     `sourceUrl: 'https://www.covenantday.org/academics/middle-school'`

4. **Append the Lower School division** as `divisions[2]`, from
   `… - Lower School Curriculum.md`. Departments = the 8 tiles: `Junior Kindergarten`,
   `Kindergarten`, `First Grade`, `Second Grade`, `Third Grade`, `Fourth Grade`,
   `Fifth Grade`, `Specials`. Within each grade, one row per subject area, `tag` = the grade
   band, `description` condensed from that grade's competency prose. `Specials` carries the
   six genuinely named courses (Art, Music, CREATE Junior, Spanish, Physical Education,
   Library) with their full published descriptions. Set:
   - `title: 'Lower School Courses'`, `grades: 'JUNIOR KINDERGARTEN – GRADE 5'`
   - `notPublished` — that Covenant Day publishes per-grade subject areas and competencies
     for JK–5 rather than a named-course catalog. Follow Cannon's wording
     ([`courseOfferings.ts:3187`](../../src/data/courseOfferings.ts#L3187)) for register.
   - `source: 'Covenant Day Lower School Curriculum (academics page)'`,
     `sourceUrl: 'https://www.covenantday.org/academics/lower-school'`

5. **Rewrite the two stale comments.** The block comment above `const COVENANT_DAY`
   (~line 5126) and the trailing `/* NO Lower/Middle School division card: … */` comment
   (~line 5280). Replace both with the real finding: the JK–8 curriculum **is** published,
   behind JS-loaded Finalsite popups invisible to a plain page fetch, and the divisions are
   ordered High → Middle → Lower to preserve existing overlay index paths. Delete the
   trailing comment entirely — it now describes something false.

6. **Recount the three Compare metrics** in `src/data/metricValues.ts` from the corrected
   High School list: `us-courses` (line 113), `advanced-courses` (~line 169),
   `us-departments` (~line 212). Derive each by counting the data written in step 2 — do not
   carry a number forward from this plan. Update each inline `//` provenance comment to cite
   the academics page rather than the Profile matrix. Check the `quals` scope text for each
   (lines ~132, ~188) and update any wording that names the Profile PDF as the source.

7. **Regenerate the schema doc.** `npm run schema`, then `npm run check:schema`. The
   Covenant Day row in `.claude/docs/DATA-SCHEMA.md` should move from 1 division to 3.

8. **Per the standing review-bug rule, check whether `DATA-SCHEMA.md` needs a new rule.**
   The candidate is worth adding: *a division absent because research could not retrieve it
   is not the same as a division the school does not publish; JS-loaded tiles must be
   fetched, not inferred from page HTML.* If it belongs, edit
   `scripts/gen_data_schema.mjs` (never the generated doc), then re-run `npm run schema` +
   `npm run check:schema`. **If no update is needed, say so explicitly** rather than
   skipping silently.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until they confirm the English wording is what they want. Report the three recounted
metric figures in the hand-off so they can be sanity-checked before nine locales inherit
them.

### Phase 2 — Every other locale

Research prose in `src/data/**`, so this is the **overlay layer** (`PROSE_TRANSLATED`), not
the `src/locales/*.json` chrome catalogs. No new UI chrome string is introduced — the
division count renders through the existing `school.divisions` key, already translated.

Mechanism: `.claude/docs/prose-translation-architecture.md`. For per-locale register and
traps, read the rollout doc for each language rather than re-deriving
(`prose-translation-bn.md` is the non-Latin worked example, `-ht.md` the Latin one,
`-fr.md` the most recent). Scope is the 9 locales in `PROSE_TRANSLATED`
(`src/lib/i18n.ts`): `es`, `bn`, `ht`, `te`, `fr`, `fa`, `it`, `hi`, `ar`.

1. **Re-extract the topic** into the work files
   (`src/data/overlays/work/course-offerings.<lang>.json`) for all 9 locales. This picks up
   the new Lower/Middle strings *and* re-stamps the High School entries whose English
   changed in step 2 — those went stale by design and are currently rendering English.

2. **Translate every new and re-stamped entry**, per locale, following that locale's
   rollout doc.
   - **Course titles that are searchable identifiers stay in English** — `AP Calculus BC`,
     `Latin IA`, `CREATE Junior`, `Algebra`. Descriptions translate. This is exactly the
     French leak shape `scripts/check_fr_identifiers.mjs` guards
     (`npm run check:fr`).
   - **The `notPublished` note and the division `teaser` are prose and MUST translate** —
     they are short strings sitting beside identifier-like fields, which is the documented
     "sentence wearing an identifier's clothes" leak. Verify both explicitly in every
     locale rather than trusting the sweep.
   - **Figures are copied char-for-char, never re-typed** (`10,000,000` in the Fifth Grade
     math description, grade numerals). Applies with extra force to `hi`/`te`, which regroup
     lakh/crore at render — a re-typed `1,00,00,000` in the data would be regrouped twice.

3. **Build the shipped overlays** from the work files
   (`src/data/overlays/course-offerings.<lang>.json`) via the architecture doc's build step.

4. **Run the locale check suite** — see Verification below.

## Files touched

| File | Change |
|---|---|
| `source-material/course-offerings/covenant-day/… - Lower School Curriculum.md` | new — written during planning, uncommitted |
| `source-material/course-offerings/covenant-day/… - Middle School Curriculum.md` | new — written during planning, uncommitted |
| `source-material/course-offerings/covenant-day/… - High School Course and Elective Offerings.md` | new — written during planning, uncommitted |
| `source-material/course-offerings/covenant-day/… - Curriculum Guide.md` | edit — provenance header retracts the "confirmed absence" (done during planning) |
| `src/data/schools.json` | regenerated by `ingest-source-material` |
| `.claude/docs/` distilled notes | regenerated by `ingest-source-material` |
| `src/data/courseOfferings.ts` | edit — reconcile `divisions[0]`, append Middle `[1]` and Lower `[2]`, rewrite two stale comments |
| `src/data/metricValues.ts` | edit — recount `us-courses`, `advanced-courses`, `us-departments` for `covenant-day` + provenance comments and quals |
| `scripts/gen_data_schema.mjs` | edit — only if step 8 finds a rule to add |
| `.claude/docs/DATA-SCHEMA.md` | regenerated by `npm run schema` |
| `src/data/overlays/work/course-offerings.<lang>.json` × 9 | Phase 2 — re-extracted and translated |
| `src/data/overlays/course-offerings.<lang>.json` × 9 | Phase 2 — rebuilt |

## Verification

### Phase 1 — English

- [ ] `npx tsc --noEmit` — clean.
- [ ] `npm run check:schema` — passes (run `npm run schema` first); Covenant Day shows
      3 divisions.
- [ ] `npm run check:metrics` — no NEW advisories beyond the 11 pre-existing ones.
- [ ] `npm run build` — succeeds (chains `check:schema` and `check:seo`).
- [ ] **Browser check on the Covenant Day page** — this is the step that actually proves it,
      since every division renders through data the automated checks do not read for sense:
  - Course Offerings header reads **3 divisions**.
  - All three cards render, in the order High → Middle → Lower.
  - Department tabs switch correctly on each card; no card is empty.
  - The `notPublished` note appears on Lower and Middle, above a real course list.
  - Spot-check three titles against the live academics pages — e.g. `AP Calculus BC`,
    `Math Honors (Algebra)`, `CREATE Junior`.
- [ ] **Confirm no existing overlay broke.** `npm run check:runtime` and
      `npm run check:live`. Then load the Covenant Day page in **Spanish** and confirm the
      High School card still renders Spanish: it proves the append-don't-prepend ordering
      held. Renamed courses correctly show English until Phase 2 — that is expected, not a
      regression.

### Phase 2 — Locales

- [ ] `npm run check:translations` — no unexpected drift.
- [ ] `npm run check:runtime` and `npm run check:live` — every overlay stamp resolves
      against live `src/data/**`. **`check:runtime` validates against the WORK file, so
      `check:live` is the one that catches a stale shipped overlay.**
- [ ] `npm run check:hashes` — stamp parity between Node and the browser.
- [ ] `npm run check:fr` — the 977 French identifier strings, plus any new ones.
- [ ] `npm run check:sepdrift -- --lang <code>` for each locale — catches a figure whose
      separators were swapped (the sweep normalises those and cannot see them).
- [ ] `npm run check:sources`, `npm run check:script`, `npm run check:currency`,
      `npm run check:money`, `npm run check:bidi`, `npm run check:fa`, `npm run check:hi` —
      as applicable.
- [ ] `python3 scripts/check_figures.py --topic course-offerings` — figures unchanged from
      English.
- [ ] **Browser check, at minimum `fa` (RTL) and `hi` (lakh/crore), with panels expanded.**
      Confirm the Lower/Middle `notPublished` notes and division teasers render translated,
      not English — they are the leak shape this repo has been bitten by repeatedly. A
      collapsed-panel print reads clean while showing none of the part that breaks.

## Risks

| Risk | Mitigation |
|---|---|
| Inserting Lower/Middle at `divisions[0]`/`[1]` silently orphans 179 × 9 overlay entries — no error, no coverage change, page just renders English | Append only (High → Middle → Lower), as Carmel does. Verified by loading the Spanish page in Phase 1 verification. |
| A Lower/Middle card ships as an empty shell, breaking the no-empty-cards rule | Both divisions have real content (8 and 4 tiles). If any department would end with zero courses, omit that department rather than shipping it empty. |
| Recounted metrics disagree with the rendered course list | Derive the counts by counting the data written in step 2, not from any figure quoted in this plan. Report all three in the Phase 1 hand-off for review. |
| Condensing competency prose slides into invented catalog language | Every `description` condenses that grade's own published text. The verbatim source is in `source-material/`; when in doubt, quote closer. |
| Phase 2 translates a searchable course identifier (`AP Calculus BC`, `Latin IA`) | `npm run check:fr` guards the French case; apply the same rule to all 9 and spot-check in the browser. |
| The Finalsite popup endpoint changes and the data becomes unrefreshable | All 21 payloads are already captured verbatim in `source-material/`, with the element/post ids recorded. |

## Open questions

- **Should the Middle School Electives tile become its own department, or a note?** The tile
  names seven electives (CREATE, art, band, Spanish, drama, choir, broadcast journalism) but
  gives no per-elective descriptions. — **default:** ship it as an `Electives` department
  with the seven named courses, each carrying a short description derived from the tile's
  own sentence ("students choose two electives each year"), and note the limited grain in
  the division's `notPublished`. Omit only if it would otherwise be zero-item.
- **Does `DATA-SCHEMA.md` need the JS-loaded-tiles rule (step 8)?** — **default:** add it.
  The failure it prevents cost this project a whole missing division on a shipped school,
  and `/add-school` reads that doc first.
