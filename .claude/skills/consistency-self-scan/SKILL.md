---
name: consistency-self-scan
description: >
  Scan the whole app for places where it contradicts itself through its own data — a headline
  or stat tile that disagrees with the list beneath it, one fact stated two ways in two cards,
  a "not published" in one card that another card publishes, a Compare cell that disagrees
  with the school page, arithmetic that does not add up — then diagnose each conflict as our
  error, the school's own pages disagreeing, a legitimate difference of year or basis, or
  undeterminable, re-checking the live source. On a repeat run it first checks the previous
  round's findings for regressions. Builds the site, dumps every school page, runs the
  check:consistency report, fans out parallel sweep agents by school group, verifies and
  consolidates their findings into a worklist under .claude/plans/, and hands off to /plan.
  Optionally scoped to one school. Use when the user types /consistency-self-scan, or asks to
  "scan the app for inconsistencies", "is the site contradicting itself", "re-run the
  consistency scan", "check the pages agree with themselves". This skill writes ONLY the
  worklist, re-verification notes under source-material ## Method headings, and the plan (via
  /plan) — never app code.
---

# /consistency-self-scan — find where the app contradicts itself, and say why

The repeatable version of three rounds that were run by hand:

| Round | Plan | Found | Shipped |
|---|---|---|---|
| 1 | `consistency` | 101 findings across all 13 pages (64 A, 7 B, 23 C, 3 D, 4 split) | PR #507 |
| 2 | `consistency2` | 13 partial or regressed fixes, 30 new conflicts | PR #509 |
| 3 | `consistency3` (worklists in `consistency3-data/`) | ~25 new, a handful partial | see INDEX.md |

Each round's lesson is the reason this is a recurring skill and not a one-off. **The defect
regenerates.** Almost every count on a page is typed by hand, and only the list beneath it is
real data, so a typed figure drifts as its list grows. And a fix lands in one card while a
second card restates the old value. The `check:consistency` build gate (R1–R11) catches the
shapes it was written for; everything else needs someone to read the pages. Rules R9–R11 were
themselves written from the round-2 re-scan's findings, so a scan also feeds the gate.

The flow is **mode → preflight → build + dump → mechanical pass → parallel sweeps → verify +
consolidate → report → `/plan` → `/implement`**.

Good times to run it: after a batch of school refreshes or ingests, after a consistency plan
deploys (that is a rescan), or before a big publish.

## Hard constraints

- **This skill writes no app code.** It never edits `src/`, `scripts/` or a generated file, and
  never changes a check. Its outputs are: scratchpad files, the worklist folder
  `.claude/plans/<name>-data/`, `### Re-verification` appends under `## Method` in
  source-material records, and the plan (through `/plan`).
- **It commits nothing.** The worklist and the source-material appends stay uncommitted, as
  `/plan`'s own outputs do; `/implement` carries them on its branch. The working tree is
  shared: never `git add -A`, `git stash` or `git checkout` another branch.
- **It never deploys**, and never asks to.
- **Value conflicts only.** Wording, style, plain-language and translation problems are out of
  scope; other gates and other passes own them. The scan reads the **English** pages; locale
  drift is the job of `check:live`, `check:digits` and the rest. A fix to English prose will
  still need the plan's Phase 2 for the other nine locales.
- **Never pick a winner** when a school's own pages disagree (category B). Both values are
  shown, attributed.
- **Never re-report what a gate provably checks.** Do report a case a rule misses, naming the
  rule.
- **Never guess.** An unreachable source is category D.

## Step 0 — Which round is this?

```bash
ls -d .claude/plans/consistency*-data .claude/plans/consistency*.md
grep -n '\[consistency' .claude/plans/INDEX.md
```

The rounds are named `consistency`, `consistency2`, `consistency3`, … The **next name** is the
lowest unused number. Then pick the mode:

| What the repo shows | Mode |
|---|---|
| No previous round at all | **FIRST**: a full sweep, Parts 2 and 3 only. |
| The latest round's plan is **Implemented** | **RESCAN**: Part 1 regression check of that round's worklists, then Parts 2 and 3. |
| The latest round's plan is *Not implemented* or *English shipped* | **Stop and ask.** A scan now re-finds that plan's own open findings. Suggest `/implement <name>` first. |
| A `consistency<N>-data/` folder of worklists exists with **no** `consistency<N>.md` plan | **Stop and ask.** A scan already ran and was never planned. Offer: (a) go straight to Step 6 with those worklists (after checking what moved: `git diff --stat <its scanned SHA>..HEAD -- src/data src/content src/locales/en.json`), or (b) rescan from scratch under the same name, replacing that folder. |

**Scope.** With no argument the scan covers every school in `src/data/schools.json`. With a
school (`/consistency-self-scan charlotte-latin`), check the slug is in `schools.json` and refuse
otherwise. A one-school scan runs one sweep agent, and its worklist is named `<slug>-<name>.md`
inside the round's folder.

The finding-ID letter: round 1 used bare numbers (`LAT-13`), round 2 used `R` (`LAT-R2`), round 3
used `S` (`PD-S1`). Each later round takes the next letter (`T`, `U`, …).

Tell the user in one line what will run: the mode, the name, the school groups, and that the
sweep fans out up to four agents and takes a while. Then go. Typing the command is the
go-ahead; do not ask for further confirmation unless the table above says to stop.

## Step 1 — Preflight

```bash
git fetch origin && git rev-parse --short HEAD origin/main && git status --short -- src scripts
```

- The scan reads the tree as it is. If `HEAD` is not `origin/main`, or `src/` has uncommitted
  changes, say so and ask whether to scan anyway. **Never switch branches yourself.**
- Record **SCANNED_SHA** (`git rev-parse --short HEAD`). It goes in the worklist header, and
  the next rescan diffs from it.
- Set `SCRATCH` to this session's scratchpad and make `"$SCRATCH/pages"`.
- On a RESCAN, find the previous round's base SHA: its `findings.md` header, or else the merge
  commit of its PR (from INDEX.md, `gh pr view <n> --json mergeCommit`). Round 3's scan was at
  `d19fc9da`. Write `git diff --stat <prev>..HEAD -- src/data src/content src/locales/en.json
  source-material` to `"$SCRATCH/changed-since-last.txt"`.

## Step 2 — Build and dump every page

```bash
npm run build
python3 -I .claude/skills/consistency-self-scan/dump_pages.py dist/school "$SCRATCH/pages"
```

- **Only the parent builds.** Sweep agents never run the build (shared tree).
- Prerender writes `dist/school/<slug>/index.html`, and card bodies render whether the card is
  open or closed, so the dump holds every card. Expect one `.txt` per school in
  `schools.json`. A missing slug is a gap to report, never to skip silently.
- If a check *after* prerender fails, `dist/school` is still written. Report the red check
  (it is a finding in itself if it is `check:consistency`), confirm the `dist/school` mtimes are
  from this run, and carry on.
- The scan is of `main`, not the live site. If the user wants to know whether the live site
  matches, compare one page's bytes (round 1 found Latin byte-identical, 556,251 bytes).

## Step 3 — Mechanical pass

```bash
node scripts/check_consistency.mjs --report > "$SCRATCH/r8.txt"
```

- The gated rules must be clean, because the build just ran them. The R8 groups in `r8.txt`
  are for the agents to triage.
- On a RESCAN, the previous round's report is `.claude/plans/<prev>-data/r8.txt` if it was
  kept. Rounds 1–3 kept theirs only in a scratchpad. Groups that are new since then need
  triage, because a report's blind spot is invisible: R8's old `\w` regex hid "28 teams" for a
  whole round.
- Where a pattern recurs that no rule covers, a short scratch Node script that imports the
  per-school `.ts` files and recounts is fair game. Round 1 did this for roster vs funnel, camp
  rows vs intro, course rows vs teaser, ratio notation, and every Compare value vs its page.
  Scratch scripts live in `$SCRATCH`, never in `scripts/`.

## Step 4 — Parallel sweeps

**Groups.** Balance by page size (the dumps' byte counts). The default, used in rounds 2 and 3:

| Group | Schools |
|---|---|
| `pd-ccd-cannon` | providence-day, charlotte-country-day, cannon |
| `latin` | charlotte-latin |
| `cc-cchs-cov-carmel` | charlotte-christian, charlotte-catholic, covenant-day, carmel-christian |
| `dd-gd-hg-k8` | davidson-day, gaston-day, hickory-grove-christian, trinity-episcopal, charlotte-prep |

**Check that the groups cover every slug in `schools.json`.** A school added since this table
goes to the group with the smallest total page bytes. Never leave a school out. Stay at four
agents or fewer.

**Brief.** Copy `.claude/skills/consistency-self-scan/brief.md` to `"$SCRATCH/brief.md"` and fill
every `{{PLACEHOLDER}}`: `NAME`, `MODE`, `SHA`, `DATE`, `PAGES`, `SCRATCH`, `ROUND_LETTER`,
`PRIOR_R8`, `PRIOR_WORKLISTS`, `PRIOR_PLAN` (write "none" for the last four on a FIRST scan).
`SCHOOLS`, `PREFIXES` and `OUTPUT` differ per agent, so put those in each agent's prompt.
Grep the filled copy for `{{` before spawning.

**Spawn** one `general-purpose` agent per group, **all in one message**. Each prompt names: the
filled brief to read first, its schools, its ID prefixes (reuse the prefixes in the previous
worklists: `PD`, `CCD`, `CAN`, `LAT`, `CC`, `CCHS`, `COV`, `CAR`, `DD`, `GD`, `HG`, `TRI`, `PREP`),
and its output file `"$SCRATCH/<mode-word><round>-<group>.md"` (for example `rescan4-latin.md`).
Wait for every agent to finish. Never write a pending agent's result yourself.

## Step 5 — Verify and consolidate

Agents return confident summaries, and their mistakes read the same as their findings. So:

1. **Check every quoted value.** For each Part 2 finding, grep its quoted text in the page
   dump and open the data file at the line it cites. A finding whose quote is not there, or
   whose two values turn out to be the same fact, is dropped or corrected. Say how many.
2. **Merge cross-school causes** into `X` rows. One cause at several schools is one finding, as
   the bars bug was in round 1 (six schools, one row).
3. **Check against the previous worklists.** A "new" finding that a prior round already holds
   is Part 1 material (REGRESSED), not new.
4. **Write the worklist folder** `.claude/plans/<name>-data/`:
   - each agent's file, copied as-is;
   - `r8.txt`, so the next rescan can diff it;
   - `findings.md`: header (date, mode, SCANNED_SHA, groups, the previous round it rescans),
     Part 1 status counts per group, the merged new-findings table, a tally by category and
     school, the X rows, the approvals list (every UX-GATE and CHROME mark), the decisions the
     user must make (every B that needs an ask wording and every D), the rule candidates (below),
     and every source-material file the agents touched.

**Rule candidates.** A class that recurs at three or more schools and can be checked from data
alone is a candidate rule for `check:consistency` (R12 onwards). Name it, say what it would
compare, and say what it would have caught. The plan decides whether to build it, and it must
be calibrated to zero findings on `main` before it gates.

## Step 6 — Report, then hand off

Report in the terminal:

- the mode, the name, SCANNED_SHA, and the schools covered;
- Part 1 (RESCAN): RESOLVED / NOT RESOLVED / PARTIAL / UNCHANGED counts, and every row that is
  not RESOLVED;
- the new findings: the A/B/C/D tally, then the three to five sharpest examples, each with both
  values and where they sit;
- the approvals the plan will need (UX gate, chrome), and the decisions only the user can make;
- the rule candidates;
- the files written (full absolute paths for anything in the scratchpad) and the
  source-material files appended to, all uncommitted.

**Zero findings is a valid result.** Say so plainly. Do not pad the report with style notes to
make the scan look productive.

Then ask whether to plan it now. On yes, invoke `/plan` with the name `<name>` and a brief that
gives the worklist path, the approvals and decisions to surface at planning time, and the
precedents to follow: the `## Implementation notes` of `consistency` and `consistency2` (how
B items were attributed, how chrome overrides and card-link aliases were handled). The plan is
**two-phase** whenever a fix touches English prose or chrome, as almost every round does.
`/plan` then hands off to `/implement` as usual.

## Traps, each of which has already happened

> **⚠️ A fix lands in one card and misses the second.** Round 2's biggest group was a card
> saying a course or honor-society fact is "not published" while another card on the same page
> published it. Round 3 found the same thing for an undated "22 seasons", fixed in College
> Support and left in Sports. Every changed value is grepped across the whole page and Compare.

> **⚠️ The live source moves.** Round 1's seed list came from an older deploy: two items were
> already fixed, and one had **flipped**, because the school's page now printed the $1,880 that
> Financial Aid quoted. Round 3 found a camp page already showing the next summer's prices.
> Record the value the source gives today, every time.

> **⚠️ A recorded deviation is RESOLVED.** A plan's `## Implementation notes` record where the
> build deliberately differed from the worklist (for example LAT-2, UT Austin at all five
> schools). Reporting that as NOT RESOLVED re-opens a settled ruling.

> **🚫 Research bookkeeping never reaches a parent.** A B fix is attributed prose ("the X page
> says A; the Y page says B") plus a dev-only `kind: 'verify'` flag. It is never "we could not
> confirm". The rule is in CLAUDE.md and §6 of `DATA-SCHEMA.md`.

> **🚫 Appends go under `## Method` only.** The ingest renders every top-level `## ` section of
> a source-material record to parents. A sub-heading under `## Method` stays internal.

> **⚠️ A chrome title is per-school only through an override.** A shared title such as
> "The TK–12 Arts Ladder" is wrong for a school with no TK, and the fix is a
> `the-arts.ladder@<slug>` key in **all ten** locale catalogs, plus the old name in
> `src/lib/cardLinkAliases.ts` so shared card links keep working. Round 1 handled Covenant and
> Carmel this way; round 3 found Gaston Day had been missed.

> **⚠️ A headline can be right and still read wrong.** "Two counselors … roughly 18 seniors
> each" matches the arithmetic but not the staff list (a Director and an Assistant). Those are
> category C label fixes, not dismissals.

**Deliberately cannot:** edit app code or a check, commit, deploy, pick a winner between a
school's own conflicting pages, report wording or translation issues, scan a school the app
does not cover, or plan without the user's go-ahead.
