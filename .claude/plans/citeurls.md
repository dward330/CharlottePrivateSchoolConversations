---
name: citeurls
title: Backfill the last four citation URLs, and correct three stale housekeeping claims
status: not-implemented
phases: 1
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
