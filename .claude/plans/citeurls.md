---
name: citeurls
title: Backfill the last four citation URLs, and correct three stale housekeeping claims
status: implemented
phases: 2
created: 2026-08-24
branch: chore/cite-urls
prs: []
---

# Backfill the last citation URLs

## Goal

Three items have been carried on the outstanding list as housekeeping: a citation-URL
backfill, un-ingested source material, and favicon wiring. **Measured 2026-08-24, two are
already done and the third is four entries, not a backlog.**

This plan fixes the four real ones and — more importantly — **corrects the stale records**
that kept three phantom items on the list across many sessions.

We will know it worked when every citation in `src/data/**` either carries a URL or is a
methodology note, and the memory/records no longer assert work that is finished.

## Context

### What was actually measured

Parsing every `sources: [ … ]` block across all of `src/data/**` and counting source
objects with and without a `url` field:

| | Count |
|---|---|
| Source objects **with** a URL | **763** |
| Source objects **without** a URL | 37 |
| — of those, **methodology notes** (correctly URL-less) | **33** |
| — **genuine citations missing a URL** | **4** |

The 33 are not defects. They are provenance statements like
`'Verdict synthesised by the researcher from the sources cited'`,
`'Aggregator score ranges consulted and deliberately NOT used'`,
`'Buckets scored against source-material/college-support/_shared/…'`. A URL would be
meaningless on them; they document *how a judgment was reached*, which is exactly what the
data-provenance standard asks for.

### The four genuine ones

```
collegeSupportPrograms/carmel-christian   carmelchristian.org — 2022–23 High School Profile
                                          (weighting, rank policy)
collegeSupportPrograms/carmel-christian   carmelchristian.org — 2022–23 High School Profile
                                          (SAT/ACT/GPA ranges)
collegeSupportPrograms/providence-day     Staff backgrounds partly from aggregated
                                          professional profiles — self-reported
afterSchoolPrograms/providence-day        providenceday.org — Fall 2026 Enrichment Class
                                          Descriptions (school page)
```

Two name a specific document at a named domain and should be resolvable. **Two are hedges
that may have no URL by nature** — "aggregated professional profiles — self-reported" is a
methodology note wearing a citation's clothes, and is a known shape in this repo: CLAUDE.md
records `Staff backgrounds partly from…` as one of the recurring "sentence wearing an
identifier's clothes" cases.

### Three stale claims this plan corrects

Each was carried as outstanding and each is **already resolved**:

1. **"Favicon wiring still open."** `index.html:5-6` already carries
   `<link rel="icon" type="image/png" href="/icon.png">` and an `apple-touch-icon`;
   `public/icon.png` exists (202 KB) and the built `dist/index.html` carries the tag.
   **Done.**

2. **"Un-ingested rank-labels file."** `check:metrics` reports 12 files "on disk but not
   ingested" — but 8 are under `source-material/branding/`, and **`branding` is not a
   research topic** (the manifest's topics are `after-school`, `college-support`,
   `course-offerings`, `financial-aid-tuition`, `sports`, `student-clubs`,
   `summer-programs`, `the-arts`). The other 4 are `college-support/_shared/` lookup tables
   — HBCU membership, Power Four membership, US News rank labels — which are **already the
   single source** consumed by `npm run check:ranks`, a build gate that passes. The
   advisory is benign by design. **Not work.**

3. **"Sports and Student Clubs citations need URL backfill."** Zero source objects in
   either directory lack a URL. **Done.** The four that remain are in `collegeSupport` and
   `afterSchool`.

Leaving these on the list has a real cost: they crowd out genuine items and make the
outstanding list less trustworthy each time it is rebuilt.

## Decisions

- **Fix the two resolvable citations; do not invent URLs for the two hedges.** If a source
  genuinely has no public URL, the honest outcome is to leave it as a labelled note — or
  reword it so it reads as methodology rather than as an unresolvable citation.
- **Do not add a checker.** 4 findings out of 800 does not justify a gate, and CLAUDE.md
  records this repo's history of permanently-red checkers. If a gate is ever wanted, it
  would need to distinguish methodology notes from citations, which is a judgment call.
- **Correct the records in the same pass** — that is the larger share of the value here.
- **Single-phase — adds no user-facing text.** Citation labels already render; adding a
  `url` makes an existing label a link.

## Approvals needed

**None.** No new card, section, stat tile, Compare row, metric key or topic.

## Out of scope

- **The 33 methodology notes.** Correctly URL-less by design.
- **The `check:metrics` "not ingested" advisory.** Benign; see above. Do **not** run
  `build_docs.py` to silence it — ingesting `branding/` would create a topic the app does
  not have.
- **The two `check:metrics` coverage advisories** (Charlotte Catholic has no after-school,
  Davidson Day no summer programs). Both are confirmed deliberate absences.
- **Deploying.** `npm run deploy` stays the user's call.

## Steps

**Single-phase — adds no user-facing text.**

1. **Re-measure before editing.** Parse every `sources: [ … ]` block in `src/data/**` and
   confirm the split: ~763 with a URL, ~37 without, ~4 of those genuine citations. If the
   numbers differ materially, re-derive the worklist rather than trusting this document.

2. **Resolve the two Carmel Christian citations.** Both name
   *carmelchristian.org — 2022–23 High School Profile*. Find the actual document URL. If
   the profile is a PDF, cite the PDF's deep link, per the standing rule that a citation
   carries the deep-link URL rather than the site root.

3. **Resolve the Providence Day enrichment citation** —
   *providenceday.org — Fall 2026 Enrichment Class Descriptions (school page)*. Note that
   Providence Day runs Finalsite: CLAUDE.md records that curriculum behind JS click-tiles is
   invisible to `curl`, and that the fetch path is `/fs/elements?show_post=true`. Use it
   rather than concluding the page does not exist.

4. **Decide the Providence Day staff-backgrounds hedge.** "Staff backgrounds partly from
   aggregated professional profiles — self-reported" is a methodology statement, not a
   citation. **Do not invent a URL.** Either leave it as-is or reword it to read
   unambiguously as a note; say which and why.

5. **Persist anything fetched.** Any document pulled in step 2 or 3 goes to
   `source-material/<topic>/<school>/*.md` with its provenance header and source URL, per
   the data-provenance standard, and is ingested with the `ingest-source-material` skill.

6. **Correct the stale records.** Update the memory notes asserting favicon wiring is open
   and that Sports/Student Clubs citations need backfill. If any of those claims also live
   in `CLAUDE.md` or a plan document, correct them there too.

## Files touched

| File | Change |
|---|---|
| `src/data/collegeSupportPrograms/carmel-christian.ts` | edit — add `url` to two sources |
| `src/data/afterSchoolPrograms/providence-day.ts` | edit — add `url` to one source |
| `src/data/collegeSupportPrograms/providence-day.ts` | possible edit — reword the hedge (step 4) |
| `source-material/**/*.md` | possible new — anything fetched in steps 2–3 |
| `.claude/plans/citeurls.md` | edit — implementation notes |

## Verification

- [ ] Re-measure: genuine citations missing a URL is **0** (or documented if a URL truly
      does not exist)
- [ ] `npx tsc --noEmit` — clean
- [ ] `npm run build` — succeeds; all eight chained checks pass
- [ ] `npm run check:metrics` — no *new* advisories (the 12 "not ingested" and the two
      coverage lines are expected and unchanged)
- [ ] Any fetched document saved under `source-material/` with its URL, and ingested
- [ ] **Browser check**: the edited citations render as links on the relevant school pages
      (Carmel Christian → College Support, Providence Day → After School)
- [ ] Stale claims corrected in memory and anywhere else they appear

## Risks

| Risk | Mitigation |
|---|---|
| **A URL is invented or guessed** to close an entry, producing a citation that does not resolve — worse than no URL. | Step 4 says explicitly not to. Every added URL must be one that was actually fetched and returns the cited document. |
| **The Carmel Christian 2022–23 profile is no longer published.** Schools rotate profiles yearly. | If it is gone, cite an archived copy and say so, or leave the label as a note. Record which was done — a confirmed "no longer published" is a useful result. |
| **`curl` reports a Providence Day page missing** when it is behind Finalsite click-tiles. | Step 3 names the `/fs/elements?show_post=true` path from CLAUDE.md. |
| **The pass looks trivial and gets skipped**, leaving the stale claims in place. | The record correction is the larger half of the value; step 6 is not optional. |

## Open questions

- **Should the two hedges be reclassified out of `sources` entirely** into a separate
  `method` or `note` field? That would make "every `sources` entry has a URL" a checkable
  invariant. — **default:** out of scope; it is a schema change and would need the
  UX-approval gate if it renders differently. Note it as a follow-up if step 4 finds more
  than these two.


## Implementation notes

**Phase 1 (English) shipped 2026-08-24 on `chore/cite-urls`. Phase 2 (prose locales) is
outstanding.**

### The plan was single-phase; the build is two-phase

The plan reasoned that adding a `url` to an existing label changes no user-facing text.
That held for three of the four entries — but the Carmel Christian pair could not be
honestly closed by adding a URL alone (below), and refreshing the figures **does** change
rendered text. Per the standing English-first rule in `CLAUDE.md`, the locale work is
therefore Phase 2. `phases:` corrected 1 → 2.

### Step 1 re-measure confirmed the plan, with two corrections

763 with URL / 37 without / 33 methodology notes / 4 genuine — exactly as documented. Two
details differed:

- The Providence Day after-school label is `(school packet)`, not `(school page)`.
- **A fifth hedge of the same shape was missing from the worklist**:
  `collegeSupportPrograms/davidson-day.ts` — *"Staff details partly from aggregated
  professional profiles"*. Identical class to the Providence Day one, so step 4's decision
  was applied to both.

### Steps 2 — the citation was a symptom of stale data

Both Carmel citations were URL-less *because* a prior pass recorded the current-year School
Profile as unrelocatable ("every filename variant 404s; Wayback was rate-limited") and fell
back to a Google cache of the **2022–23** profile, flagged `TO VERIFY`.

**That conclusion was wrong.** Listing the domain's archived URLs via the Wayback CDX API —
rather than guessing filenames — surfaced the live document immediately:
`https://carmelchristian.org/pdf/High_School_Profile_24-25.pdf` (HTTP 200, 157,525 bytes),
carrying **Class of 2024** figures. The school rotates the filename yearly and serves the
same PDF from a second path, which is why enumeration failed.

Adding a URL to a citation whose figures were three years stale would have closed the entry
cosmetically while leaving wrong numbers on the page, so **the user was asked and chose to
refresh the figures**:

| Metric | Was (Class of 2022) | Now (Class of 2024) |
|---|---|---|
| SAT middle 50% | 1030–1290 | **1060–1260** |
| ACT middle 50% | 25–33 | **22–30** |
| Weighted GPA | 3.64–4.58 | **3.67–4.50** |
| Unweighted GPA | 3.35–3.86 | **3.29–3.81** |

Knock-on edits: two `TO VERIFY` flags retired (the AP Honor Roll year flag is unrelated and
remains); the `wholeClass` headline/subhead rewritten from "the research could not locate"
to what the profile actually publishes; and the visit-checklist item *"The quantitative
profile is stale"* replaced with a real finding — from the Class of 2026 the school drops
honors/AP weighting to **+0.5/+1.0** from +1/+2, so a weighted GPA quoted today is not
computed the same way as one quoted for a current freshman. The stale file-header caveat
was rewritten as a dated historical note rather than deleted.

### Steps 3 and 4 — two entries correctly keep no URL

- **Providence Day enrichment packet.** No public document exists: the research file records
  it was *supplied by the user as a PDF*, and the public enrichment page carries only a
  historical "past and present" roster that the term packet supersedes. Both public pages
  were re-fetched (HTTP 200) to confirm. Relabelled *"Fall 2026 Enrichment Class
  Descriptions — packet distributed by the school, not published online"*, pointing at the
  committed PDF.
- **The two staff-background hedges** are methodology, not citations. Both reworded to lead
  with `Method:` and to say *"not independently verified"*. No URL invented. The renderer
  already degrades URL-less sources to muted text, so nothing renders as a broken link.

### Step 5 — source material persisted and ingested

`source-material/college-support/carmel-christian/Carmel Christian - College Support - High
School Profile 2024-25.md` records the provenance, all four candidate URLs with their
statuses, the full Class-of-2024 data, and a denominator caution (the profile's *94% of 142
exam-takers scoring 3+* is **not** the AP Honor Roll's *73% of seniors*; the existing flag
warning against conflating them remains correct). Ingested via `build_docs.py college-support`
and `npm run schema` (395 → 396 documents; no new cards or Compare rows, so no UX gate).

### Step 6 — records corrected, and one was overstated rather than phantom

- **Favicon: confirmed done.** `index.html:5-6` and the built `dist/index.html` both carry
  the tags; `public/icon.png` exists. Carried open for months without anyone grepping the
  file. The memory's secondary follow-up (title/branding mismatch) is also resolved — the
  title now reads *Charlotte School Insights*.
- **Sports/Student Clubs citations: the plan said "Done"; that is true only of `src/data`.**
  Zero URL-less sources there, but the *distilled docs* still hold **111** Sports and **45**
  Clubs name-only cites (down from 179/53). It does not block any link from rendering on a
  school page, so it is a narrower item — the memory was corrected to say that rather than
  being deleted.
- **The `check:metrics` "not ingested" advisory** is benign exactly as the plan documented.

### Verification

`npx tsc --noEmit` clean · `npm run build` passes (tsc, vite, prerender, seo:files,
check:schema, check:ranks, check:ncsuper) · `check:metrics`, `check:seo` clean · re-measure
shows **765 with URL / 35 without, all 35 methodology notes — 0 genuine citations missing a
URL** · cited URL re-confirmed HTTP 200 · **14/14 assertions in headed Chrome** across the
Carmel, Providence Day and Davidson Day pages.

**`check:live` is red on 8 stamps × 9 locales — expected and correct.** Those are precisely
the strings rewritten above; their overlay translations are now orphaned and re-translating
them IS Phase 2.

### Phase 2 — shipped 2026-08-24

Translated into all 9 `PROSE_TRANSLATED` locales. Three corrections to the estimate above:

- **10 orphaned entries, not 8.** `check:live` prints at most 8 findings per file
  (`if (unresolvable <= 8)`) while its summary line counts all of them — so the "8 stamps"
  read off the printed list under-reported the real 10. The two it never printed were
  `verdict.points[4].label` / `.text`, the visit-checklist item Phase 1 rewrote. A
  fresh extract diffed by stamp is the reliable worklist, not the printed findings.
- **Re-extraction had to be surgical.** `i18n_extract.mjs` emits `t: ''` for every string
  and carries nothing over, so `--force` would have blanked all 1,791 translations per
  locale. The work files were instead rebuilt from a throwaway `--lang __probe` extract,
  carrying each translation across **by stamp** (never by index, per the
  `translation-maps-key-by-text` rule).
- **Net −2 strings per locale** (1,791 → 1,789): the deleted `wholeClass.flags[0]` stale-data
  flag, and the two `scoreTables[].hint` values deduping onto one entry now that both read
  `— Class of 2024`.

Each locale's rendering reuses its own established conventions rather than inventing new
ones — `ar` keeps `دفعة 2024` for "Class of 2024"; `fa` writes the signed weights as
`0.5+`/`1.0+`; `fr` keeps `première année du secondaire` for *freshman*; `ht` keeps
`pwen kalite` for *quality point*. All figures copied char-for-char, so `hi`/`te` keep the
English 3-3-3 form and regroup at render.

**Verification.** `npx tsc --noEmit` clean · `npm run build` passes all eleven chained
gates · **`check:live` green across all 9 locales** (it was red on exactly these stamps
before) · `check:runtime` 11,406 entries × 9 locales resolve · `check:sepdrift` **0 drifted
figure tokens** in all 9 · `check:money` / `check:currency` / `check:bidi` / `check:fa` /
`check:hi` / `check:fr` / `check:chrome` all pass · `i18n:leaks` per locale is
**equal or one lower** than the pre-change baseline in every locale (158/187/177/363/291/
165/341/247/173 vs 158/188/178/364/291/166/342/248/173) — one leak removed, none added.

**Browser check** (headed Chromium, all 9 locales, every `<details>` force-opened): 36/36
positive assertions — the new prose, `3.67–4.50` and `1060–1260` all render translated in
every locale — and a scoped stale-figure scan is **72/72 clean**, with no `Class of 2022`,
`3.64–4.58`, `1030–1290` or `3.35–3.86` anywhere on the page. The `TO VERIFY` strings still
visible on that page are the **Arts cards and the AP Honor Roll flag**, both unrelated and
both correctly still open.

### Follow-ups deliberately not in this diff

- The open question (reclassifying methodology notes out of `sources` into a `method` field)
  stays **out of scope** — but step 1 found **five** such notes-in-citation-clothes, not
  two, and 35 URL-less entries overall, so the invariant would be worth having.
- The AP Honor Roll year `TO VERIFY` flag is still open and unrelated.
- Backfilling the 111 + 45 name-only cites in the distilled docs.
