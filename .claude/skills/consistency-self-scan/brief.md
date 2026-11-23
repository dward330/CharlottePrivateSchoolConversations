# Consistency self-scan: brief for one sweep agent

<!--
  Template used by /consistency-self-scan. The parent copies it into its scratchpad and
  fills every {{PLACEHOLDER}} before spawning agents. An agent reads the FILLED copy.
  It is a generalization of the three briefs that ran by hand: consistency-data (round 1),
  consistency2-data/brief.md + brief2.md (round 2) and consistency3-data/brief3.md (round 3).
-->

You are one of several parallel researchers sweeping the Charlotte School Insights app
(repo: /Users/Derrick/Desktop/CharlottePrivateSchoolConversations, live:
https://charlotteschoolinsights.com) for **internal data inconsistencies** on the school pages
assigned to you. The parent writes the result into a plan worklist (`{{NAME}}`).
**This is research only.**

- **Mode:** {{MODE}} (FIRST = a full sweep; RESCAN = also check the previous round's findings)
- **Your schools:** {{SCHOOLS}}
- **Finding-ID prefixes:** {{PREFIXES}} (for example `PD-`, `CCD-`, `CAN-`). Number new findings `<PREFIX>-{{ROUND_LETTER}}1`, `-{{ROUND_LETTER}}2`, and so on.
- **Scanned commit:** `main` at {{SHA}}, scanned {{DATE}}
- **Your output file:** {{OUTPUT}}

## Definition

An inconsistency is either of these:
- two places on the site that state different values for what reads as the same fact, or
- a headline or stat figure that does not match the data shown beneath it.

## Hard rules

- **⛔ Never expose the name of a student who is not an athlete**, in anything you write: the
  output file, any source-material append, any command output you quote. Only athletes may be
  named, and only for athletics. Staff and other adults stay named. From a source that may hold
  names, report counts, never the matched text. Never print a diff of a regenerated content
  chunk. Write `[name withheld]` in a research record where a name is taken out.
- **Read-only on the repo.** Never edit anything under `src/`, `scripts/`, `.claude/` or any
  generated file. Never run `npm run build`, `npm run deploy`, `git add`, `git commit`,
  `git checkout` or `git stash`. The working tree is shared with other live sessions.
- You MAY write:
  (a) your output file, and
  (b) when you fetch a school's live page or PDF and record values from it, append to the most
      relevant EXISTING `source-material/<topic>/<school>/*.md` file, **under its existing
      `## Method` heading**, as `### Re-verification {{DATE}} (plan {{NAME}}, self-scan)`.
      Give each fetched URL and the verbatim values or quotes you relied on.
      **Never write a top-level `## ` heading.** The ingest renders every top-level section to
      parents. If the file has no `## Method`, add one `## Method` at the end and put your `###`
      beneath it. Do not create new files unless no relevant `.md` exists. Never touch PDFs.
      Report every file you touched.
- Never guess, never average, never pick the value that "looks right". If a source is
  unreachable (403, paywall, removed), the finding is category D.
- Use the `web-fetch` agent type or WebFetch/curl to read live pages. For Finalsite
  click-to-open tiles or JS-rendered pages, curl may show nothing. Say so, and mark the finding D
  rather than inferring.
- **Prefer internal recounts.** A headline against our own list is verified by recounting the
  list. Fetch the web only to classify a genuinely new finding or to settle whose value is right.

## Where things are

- **Rendered page text (what parents see, every card expanded):** `{{PAGES}}/<slug>.txt`,
  extracted from `dist/school/<slug>/index.html` built from {{SHA}}. Use it to FIND claims,
  then trace each claim to its data file. Quote page lines as `L<n>`.
- **Data changed since the last scan:** `{{SCRATCH}}/changed-since-last.txt` (a `git diff --stat`;
  absent on a first scan). Spend extra effort on these files: a changed value is the likeliest
  place for a restatement that was missed.
- **Structured card data (hand-typed):** `src/data/<area>Programs/<slug>.ts` (admissions,
  afterSchool, arts, clubs, collegeSupport, sports, highSchoolPlacement), `src/data/summer/<slug>.ts`,
  `src/data/internationalTravel/<slug>.ts`, `src/data/learningSupport/<slug>.ts`, plus the
  single-file modules `src/data/courseOfferings.ts`, `src/data/financialAidReports.ts`,
  `src/data/metricValues.ts` (Compare cells, with `quals` tooltips) and `src/data/wellsFargoCup.ts`.
- **Chrome strings** (headings and card titles that are the same for every school, plus
  `<key>@<slug>` per-school overrides): `src/locales/en.json`.
- **Research prose cards:** `src/content/<topic>/<slug>.json`, GENERATED from
  `source-material/<topic>/<slug>/*` by the ingest pipeline. A fix to these goes in the
  source-material `.md`, never the JSON.
- **Source records with URLs:** `source-material/<topic>/<slug>/*.md`. Each structured file's
  header comment names its record.
- Node 24 can import the `.ts` data modules directly
  (`node -e "const m = await import('./src/data/…ts')"`), except the `src/data/*Program.ts`
  registries (they call `import.meta.glob`). Import the per-school files instead.
- `kind: 'verify'` flags and `toVerify` cells are DEV-ONLY (never shown to parents). A
  school-side conflict is shown to parents as attributed prose ("the X page says A; the Y page
  says B"), often with an "ask the school" question. Example: Charlotte Latin's dismissal times,
  `src/data/afterSchoolPrograms/charlotte-latin.ts` (the verify flag and the matching ask).
- **The R8 noun-collision report:** `{{SCRATCH}}/r8.txt`. On a rescan, the previous round's
  report is `{{PRIOR_R8}}` (if it exists).

## What the build already guarantees (do not re-report)

Read the header of `scripts/check_consistency.mjs`. Its gated rules (R1–R7, R9–R12 at the time
this brief was written; trust the header over this line) pass on `main`. Also skip what these
gates check: Power Four / HBCU bucket counts against the acceptance list (`check:memberships`),
Compare tuition rows (`check:tuition`), the NC admit-rate rows (`check:ncrows`) and the Wells
Fargo Cup ledger (`check:cup`). **Do** check prose that restates those numbers. **Do** report a
case a rule misses, naming the rule and saying why it missed. That is how new rules get written.

## What to sweep, for each assigned school

1. Headline or stat-card numbers against counts of the items listed beneath them: rosters,
   course lists, club lists, camp lists, trip lists, acceptance lists, staff lists.
2. Category subtotals against stated totals: filter-chip counts, conference splits, tier
   tables, funnel stages.
3. The same fact stated in more than one section of the page: AP counts, enrollment, class
   size, tuition, counselor counts or ratios, deadlines, staff names or titles, division grade
   spans (e.g. "Lower School TK–5" in one area and "TK–4" in another), dismissal times, founding
   year, campus size, program names.
4. Arithmetic: ratios, percentages, pooled rates, multi-year totals, per-day/per-week/
   per-semester pricing tables (check rows that should scale linearly), "≈ per afternoon"
   figures.
5. "X of Y" and "absent: [list]" statements, where the list length must equal Y − X.
6. Year labels: two figures for one metric from different school years must each carry their
   own year. An undated "N seasons" or "N years" goes stale every year.
7. Notation: ratio direction (stat tiles use "~N:1 seniors per counselor"), currency, date
   formats.
8. The Compare cells in `metricValues.ts` (value AND `qual`) for your schools against the school
   page.
9. **"Not published" against the rest of the page.** One card says the school does not
   publish a fact, and another card on the same page publishes it. This was the biggest single
   group in round 2.
10. **Chrome labels against the data under them.** A shared card title or column header
    (from `en.json`) that is wrong for this school: a "TK–12" title on a school with no TK, or a
    "National Merit" column over college merit awards.

## Classify every finding into exactly one category

- **A. Pipeline or derivation error.** Our extraction, counting, arithmetic or copy is wrong,
  and the source is clear. → Propose the exact data fix (file + field/approx line + new value)
  and cite the source.
- **B. The source itself is inconsistent.** The school's own pages disagree. → Do not pick a
  winner. Propose showing both values, each attributed to its source, plus a dev-only verify
  flag, and an ask-the-school question where the card has one.
- **C. Legitimately different.** Different year, counting basis, scope or definition. → No value
  change. Propose the short clarifying label or wording that stops the two figures reading as a
  contradiction.
- **D. Cannot determine.** → No change. Say exactly what the user would need to decide or supply.

For every A, B or C, **re-open the cited source** (the live page or PDF; a committed
source-material record that transcribes a PDF is acceptable for a PDF you cannot re-fetch, but
say which you used). Record the value the source gives **today**. If the live source now says
something different from our record, say so; that is often the real finding.

Mark a proposed change **UX-GATE** if it would add a card, section, tile, Compare row or metric
key, reorder anything, or change a component; mark it **CHROME** if it edits `en.json` (it then
needs all ten locale catalogs, and a card-title change also needs a `cardLinkAliases.ts` entry).

**Before you sweep, read `.claude/skills/consistency-self-scan/settled.md`.** It lists
rulings the user has made for good, from any round. Never report a pattern it lists, in Part 1
or Part 2, and never propose a label for one. Note each one you saw once, under "Settled,
skipped" in your output.

**Mind what each entry covers** (its "How an entry matches" section). A *pattern* entry holds
for any values. A *these values* entry holds only while the page shows exactly the values it
records. If the page now shows something different at that spot, it is **a new finding**:
report it in Part 2 with "was settled as S<n>", giving the old and new values. Each entry's
"Still a finding" line stays reportable while the entry holds.

Do not report pure wording, style, plain-language or translation issues. Report only value
conflicts. Do not report the same root cause twice: group one cause that shows up in several
places into one finding. **If a cause also appears at schools outside your group, say so** —
the parent merges those into one cross-school row.

## RESCAN mode only — Part 1: regression check of the previous round

The previous round's worklists for your schools: {{PRIOR_WORKLISTS}}.
Its plan and its `## Implementation notes` (deliberate deviations): {{PRIOR_PLAN}}.
User rulings that leave a finding unchanged: listed in that plan's *Decisions* and
*Implementation notes*, and in the worklists' D rows.

For EVERY row for your schools (every table in those worklists), check the page dump and the
data file and mark:
- **RESOLVED**: the page shows the proposed change, or the recorded deviation;
- **NOT RESOLVED**: the page still shows the old conflict (give the line);
- **PARTIAL / REGRESSED**: fixed in one place but still wrong in another, or the fix introduced a
  new conflict;
- **UNCHANGED BY DECISION**: the user ruled to leave it.

In Part 2 below, spend most effort on **what the last fix changed**: is each new value restated
anywhere else (prose, teaser, footnote, tile caption, scope line, verdict/checklist line,
Compare value and `qual`), and does each restatement now agree? Do new sentences the last fix
added (footnotes, scope lines, attributions) agree with the lists they describe? Do not
re-report a prior finding as new; if it is back, report it in Part 1 as REGRESSED.

## Part 2 — the sweep

Run sections 1–10 above on the page dumps for your schools.

## Part 3 — R8 triage

For each R8 group for your schools in `r8.txt`: real conflict or not, one line each. Skip a
group whose numbers exactly match a row of `settled.md`'s "R8 groups already triaged" table
(list it under "Settled, skipped"); where a group has gained or changed a number, triage only
that member. On a rescan, flag groups that are new since the previous report — those were
never triaged.

## Output

Write your output file as markdown:
1. **Part 1 table** (RESCAN only): `id | status | where (page line or file:line) | note`.
2. **Part 2 table**, NEW findings only:
   `id | school | section(s) | value A (where: file:line, page L) | value B (where) | category | evidence (URL + what it says today) | proposed change (with UX-GATE / CHROME marks)`.
   Quote the page text verbatim, so the parent can grep for it.
3. **Part 3**: R8 triage, one line per group.
4. **Checked and consistent**: a short list of what you swept and found clean, so the parent
   can show coverage.
5. **Files touched**: every source-material file you appended to, or "none".
6. **Settled, skipped**: each `settled.md` entry or R8 row you saw, with its ID and page line,
   or "none". A *these values* entry whose values moved is not skipped; it is in Part 2.

Then return a concise summary to the parent with Part 1 counts and the Part 2 table inline.
Keep it factual. Do not pad it, and do not report a finding you did not verify.
