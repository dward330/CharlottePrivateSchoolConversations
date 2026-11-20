# Consistency RE-SCAN — addendum to brief.md (read brief.md first, then this)

The plan `consistency` has now been implemented, merged (PR #507) and deployed. `main` is at
0e8882f6. This is a **re-scan**: are the pages now consistent, or are there issues left or new ones?

## What changed from brief.md
- **Rendered page text is now in `pages2/<slug>.txt`** (same scratchpad), built from 0e8882f6 —
  the deployed site. Ignore the old `pages/` dumps except to diff before/after if useful.
- Do NOT run `npm run build`, `git checkout`, `git stash`, `git add`, `git commit`. Read-only on the repo,
  except the source-material re-verification append rule in brief.md (b), which still applies if you fetch
  a live source. Prefer internal recounts; fetch the web only to classify a genuinely NEW finding.
- A new build gate exists: `scripts/check_consistency.mjs` (rules R1–R7, all passing). Read its header to
  see what it already guarantees, and don't re-report what it provably checks — but DO report a case its
  rule misses (say which rule should have caught it, and why it didn't).
- The College Pipeline bars and funnel counts are now DERIVED from the roster (`src/lib/pipeline.ts`);
  bars with 0 D1 commits are hidden at render.

## Your two jobs, in this order
### Part 1 — regression check of the prior findings
`.claude/plans/consistency-data/findings.md` lists every finding for your schools (plus the cross-school X rows).
`.claude/plans/consistency.md` → `## Implementation notes` records where the build deliberately deviated
(e.g. LAT-2 UT Austin at all five schools; LAT-9 kept at 25 with a label; LAT-13 not applied; HG-16 Compare as
≈$260/mo). For EVERY row for your schools, check the rendered page (`pages2/`) and data file and mark:
- **RESOLVED** — the page now shows the proposed change (or the recorded deviation);
- **NOT RESOLVED** — the page still shows the old conflict (give the line);
- **PARTIAL / REGRESSED** — fixed in one place but still wrong in another, or the fix introduced a new conflict;
- **UNCHANGED BY DECISION** — D items the user ruled to leave (LAT-D1, GD-24, CAN-3) and similar.

### Part 2 — fresh sweep for anything new
Run the brief.md sweep (sections 1–8) again on `pages2/` for your schools. Pay special attention to:
- places the fix touched (a changed number restated somewhere the fix missed — prose, teasers, Compare `quals`,
  verdict/checklist lines, footnotes, source labels);
- Providence Day's Course Offerings re-source (2026–27): counts, teasers, Compare `us-courses`/`advanced-courses`,
  arts matrix, College Support restatements;
- the R8 report for your schools in `r8.txt` (scratchpad). R8 groups numbers by noun; most groups are different
  facts that share a noun (trip group sizes, etc.). Triage each of your schools' groups: real conflict or not, in one line.
Do not re-report a prior finding as new.

## Output
Write to the findings file named in your prompt:
1. **Part 1 table:** `id | status | where (pages2 line or file:line) | note`.
2. **Part 2 table:** the brief.md columns, for NEW findings only (number them with your school prefix + `-R1`, `-R2`, …).
3. **R8 triage:** one line per group for your schools.
4. A short "Checked and consistent" list.
Then return a concise summary to the parent with both tables inline. Report only value conflicts, verified.
