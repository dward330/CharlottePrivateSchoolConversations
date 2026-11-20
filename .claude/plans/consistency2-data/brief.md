# Consistency sweep — common brief (read fully before starting)

You are one of four parallel researchers. They're sweeping the Charlotte School Insights app
(repo: /Users/Derrick/Desktop/CharlottePrivateSchoolConversations, live: https://charlotteschoolinsights.com)
for **internal data inconsistencies** on the school pages you are assigned. The result feeds a
plan document (`.claude/plans/consistency.md`) written by the parent. **This is research only.**

## Definition
An inconsistency is either of these:
- two places on the site that state different values for what reads as the same fact, or
- a headline or stat figure that does not match the data shown beneath it.

## Hard rules
- **Never edit anything under `src/`, `scripts/`, `.claude/` or any generated file.** Never run `npm run build`,
  `npm run deploy`, `git add`, `git commit`, `git checkout` or `git stash`. The working tree is shared with
  another live session.
- You MAY write:
  (a) your findings file in the scratchpad (path given in your prompt), and
  (b) when you fetch a school's live page or PDF and record values from it, append a section
      `## Re-verification 2026-11-20 (plan \`consistency\`)` to the most relevant EXISTING
      `source-material/<topic>/<school>/*.md` file. Give each fetched URL and the verbatim values or quotes you
      relied on. Do not create new files unless no relevant `.md` exists. Never touch PDFs.
- Never guess, never average, never pick the value that "looks right". If a source is unreachable
  (403, paywall, removed), the finding is category D.
- Use the `web-fetch` agent type or WebFetch/curl to read live pages. For Finalsite click-to-open tiles or
  JS-rendered pages, curl may show nothing. Say so, and mark the finding D rather than inferring.

## Where things are
- **Rendered page text (what parents see, all cards expanded):**
  `/private/tmp/claude-501/-Users-Derrick-Desktop-CharlottePrivateSchoolConversations/38f607de-02e4-416e-9ce7-f6c09a70d95a/scratchpad/pages/<slug>.txt`
  These were extracted from `dist/school/<slug>/index.html` built from `main` (ff5ab214). That build is byte-identical
  to the live site. Use them to FIND claims, then trace each one to its data file.
- **Structured card data (hand-typed):** `src/data/<area>Programs/<slug>.ts` (admissions, afterSchool, arts, clubs,
  collegeSupport, sports, highSchoolPlacement), `src/data/summer/<slug>.ts`, `src/data/internationalTravel/<slug>.ts`,
  `src/data/learningSupport/<slug>.ts`, plus the single-file modules `src/data/courseOfferings.ts`,
  `src/data/financialAidReports.ts`, `src/data/metricValues.ts` (Compare page cells, with `quals` tooltips) and
  `src/data/wellsFargoCup.ts`.
- **Research prose cards:** `src/content/<topic>/<slug>.json`, GENERATED from `source-material/<topic>/<slug>/*` by
  the ingest pipeline. A fix to these goes in the source-material `.md`, never the JSON.
- **Source records with URLs:** `source-material/<topic>/<slug>/*.md`. Each structured file's header comment names its record.
- Node 24 can import the `.ts` data modules directly (`node -e "const m = await import('./src/data/…ts')"`),
  except the `src/data/*Program.ts` registries (import.meta.glob). Import the per-school files instead.
- `kind: 'verify'` flags and `toVerify` cells are DEV-ONLY (never shown to parents). A school-side conflict is shown
  to parents as attributed prose ("the X page says A; the Y page says B"), often with an "ask the school" question.
  Example: Charlotte Latin's dismissal times, `src/data/afterSchoolPrograms/charlotte-latin.ts` ~L94 and ~L352.

## What to sweep, for each assigned school
1. Headline or stat-card numbers against counts of the items listed beneath them: rosters, course lists, club lists,
   camp lists, trip lists, acceptance lists, staff lists.
2. Category subtotals against stated totals: filter-chip counts, conference splits, tier tables, funnel stages.
3. The same fact stated in more than one section of the page: AP counts, enrollment, class size, tuition,
   counselor counts or ratios, deadlines, staff names or titles, division grade spans (e.g. "Lower School TK–5"
   in one area and "TK–4" in another), dismissal times, founding year, campus size.
4. Arithmetic: ratios, percentages, pooled rates, multi-year totals, per-day/per-week/per-semester pricing tables
   (check rows that should scale linearly), "≈ per afternoon" figures.
5. "X of Y" and "absent: [list]" statements, where the list length must equal Y − X.
6. Year labels: two figures for one metric from different school years must each carry their own year.
7. Notation: ratio direction (the site's stat tiles use "~N:1 seniors per counselor"), currency, date formats.
8. The Compare cells in `metricValues.ts` for your schools against the school page.

Skip what existing build checks already guarantee: Power Four/HBCU bucket counts against the acceptance list
(`check:memberships`), Compare tuition rows (`check:tuition`), the NC admit-rate rows (`check:ncrows`) and the
Wells Fargo Cup ledger (`check:cup`). Do check prose that restates those numbers.

## Classify every finding into exactly one category
- **A. Pipeline or derivation error.** Our extraction, counting, arithmetic or copy is wrong, and the source is clear.
  → Propose the exact data fix (file + field/approx line + new value) and cite the source.
- **B. The source itself is inconsistent.** The school's own pages disagree. → Do not pick a winner. Propose showing
  both values, each attributed to its source, plus a dev-only verify flag, and an ask-the-school question where the card has one.
- **C. Legitimately different.** Different year, counting basis, scope or definition. → No value change. Propose
  the short clarifying label or wording that stops the two figures reading as a contradiction.
- **D. Cannot determine.** → No change. Say exactly what the user would need to decide or supply.

For every A, B or C, **re-open the cited source** (the live page or PDF; a committed source-material record that
transcribes a PDF is acceptable for a PDF you cannot re-fetch, but say which you used). Record the value the source
gives today. If the live source now says something different from our record, say so; that is often the real finding.
Internal derivations (a headline against our own roster or list) are verified by recounting the data, and need
no web fetch unless the roster itself is in question.

Do not report pure wording/style issues, plain-language issues or translation issues. Report only value conflicts.
Do not report the same root cause twice. Group one cause that shows up in several places into one finding.

## Output
Write your findings to your findings file as a markdown table with these columns:
`# | school | section(s) | value A (where: file:line) | value B (where: file:line) | category | evidence (URL + what it says today) | proposed change`
Below the table, add a short "Checked and consistent" list naming what you swept and found clean, so the parent can
show the coverage. Then return a concise summary to the parent with the table inline. Keep it factual. Do not
pad it, and do not report a finding you did not verify.
