# Consistency RE-SCAN #2 — addendum (read brief.md, then brief2.md, then this)

Plan `consistency2` has been implemented, merged (PR #509) and deployed. `main` is at
**d19fc9da**. This is the second re-scan: are the pages now consistent?

## What changed from brief2.md
- **Rendered page text is now in `pages3/<slug>.txt`** (same scratchpad), built from d19fc9da —
  the deployed site. `pages2/` is the state BEFORE consistency2; `diff pages2/<slug>.txt pages3/<slug>.txt`
  shows exactly what consistency2 changed on each page. Use that diff.
- `scripts/check_consistency.mjs` now gates **R1–R7 and R9–R11** (all clean on main). R9 = "N sports"
  vs the Sports Offered list; R10 = camp "offered in N weeks" vs its week list; R11 = Financial Aid
  component counts/percentages. Read its header. Don't re-report what a rule provably checks; DO report
  a case a rule misses (name the rule and why it missed).
- The R8 regex was fixed, so R8 now finds more groups. The new report is **`r8b.txt`** (scratchpad).
  The old one is `r8.txt`.
- Worklists from the last re-scan: `.claude/plans/consistency2-data/rescan-<group>.md` (in the repo).
  Deliberate deviations from those worklists are recorded in `.claude/plans/consistency2.md` →
  `## Implementation notes` (e.g. CCD-R3 "three weeks here, plus the shortened July 3 week";
  TRI-R1 rung names; CCD-R5 Cannon Q8 dropped; CCD-R7 in the ensemble caveat; PD-R2 ceramics added;
  Cannon and Davidson Day "13 sports" attributed with a footnote). Treat a recorded deviation as RESOLVED
  if the page shows it.
- User rulings: CC-R3 Knights Nations not counted (scope line); CAR-R2 Carmel cell stays $245, qual only;
  CCD-R8 no change. Plus the older D rulings (LAT-D1, GD-24, CAN-3, LAT-13). These are UNCHANGED BY DECISION.

## Same hard rules as before
- Read-only on the repo. Do NOT run `npm run build`, `git checkout/stash/add/commit`, or edit any
  file under `src/`, `scripts/` or `.claude/`.
- Prefer internal recounts. Fetch the web only to classify a genuinely NEW finding.
- **If you fetch a live source and record values, append to that school's source-material `.md`
  UNDER ITS EXISTING `## Method` heading, as `### Re-verification 2026-11-20 (plan consistency2, re-scan)`.**
  Never write a top-level `## ` heading — the ingest renders every top-level section to parents.
  If the file has no `## Method`, add one `## Method` at the end and put your `###` beneath it.
  Report every file you touched.

## Your three jobs, in order
### Part 1 — regression check of consistency2's worklist
For EVERY row in your group's `rescan-<group>.md` (both its Part 1 partial/regressed table AND its
Part 2 new-findings table), check `pages3/` and the data file and mark:
RESOLVED / NOT RESOLVED / PARTIAL-REGRESSED / UNCHANGED BY DECISION, with the pages3 line.

### Part 2 — fresh sweep
Run the brief.md sweep (sections 1–8) on `pages3/` for your schools. Spend most effort on:
- **every line the pages2→pages3 diff changed**: is the new value restated anywhere else on the page,
  on Compare (`src/data/metricValues.ts` value + `qual`), in a verdict/checklist line, teaser, footnote,
  tile caption or scope line — and does each restatement now agree?
- the lesson of the last two rounds: a fix lands in one card and misses the second card that restates
  the same fact; worst case "not published" in one card while another card publishes it.
- new sentences consistency2 added (footnotes, scope lines, attributions): do their own numbers agree
  with the list they describe?
Do not re-report a prior finding (from `consistency-data/findings.md` or `consistency2-data/rescan-*.md`)
as new; if it is back, report it in Part 1 as REGRESSED.

### Part 3 — R8 triage
For each R8 group for your schools in `r8b.txt`: real conflict or not, one line each. Flag groups that are
new since `r8.txt` (the regex fix surfaces them) — those were never triaged.

## Output
Write `rescan3-<group>.md` in the scratchpad:
1. Part 1 table: `id | status | where | note`.
2. Part 2 table: brief.md columns, NEW findings only, IDs `<PREFIX>-S1`, `-S2`, … (S = second re-scan).
3. Part 3 R8 triage, one line per group.
4. A short "Checked and consistent" list, and the source-material files you touched (or "none").
Then return a concise summary to the parent with Part 1 and Part 2 inline. Report only verified value
conflicts; quote the text and give the line.
