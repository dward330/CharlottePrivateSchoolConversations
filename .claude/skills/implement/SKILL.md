---
name: implement
description: >
  Execute an implementation plan written by /plan — read .claude/plans/<name>.md, build it
  step by step, verify, open a PR, and update .claude/plans/INDEX.md with the result. Use
  when the user types /implement, or asks to "implement the plan", "build the <name>
  plan", "ship that plan". If no plan name is given, list the unimplemented plans from the
  index and ask which one.
---

# /implement — execute a documented plan

Takes a plan document from `.claude/plans/` and builds it. The plan is the spec; this
skill's job is to execute it faithfully, verify it honestly, and leave the index telling
the truth about what shipped.

## Steps

### 1. Pick the plan

If the user named one (`/implement <name>`), resolve `.claude/plans/<name>.md`. On a miss,
try a case-insensitive and partial match before giving up.

If they didn't, read `.claude/plans/INDEX.md` and show the plans whose status is **Not
implemented**, **In progress**, or **English shipped** — name, title, created date, status
— and ask which. Call out the *English shipped* ones as awaiting their review before
translation; those are the closest to done and the easiest to forget. If the index is
missing or stale, fall back to listing `.claude/plans/*.md` and reading each front matter
`status`. If nothing is outstanding, say so and stop; don't invent work.

Read the plan in full before touching anything, including any file it references. A plan
skimmed is a plan re-derived.

**If the plan is already `english-done`,** the English phase is built and reviewed-pending.
Confirm the user is happy with the English before doing anything else, then resume at
step 7 — don't rebuild Phase 1.

### 2. Gate before building

These checks, in order:

- **Approvals** — if the plan's *Approvals needed* section is non-empty and the user
  hasn't given that approval in this conversation, stop and ask. The UX-design gate in
  `CLAUDE.md` is the common case and it is a hard gate, not a formality.
- **Claude Design** — if the plan has an approved UX change, call the Claude Design MCP's
  `list_projects` now. If it fails or its tools are missing, **stop and ask the user to
  reconnect Claude Design** (`/design-login`), and do not build that change until it works.
  Never substitute an Artifact canvas. Data-only steps may go ahead meanwhile. The change is
  designed in the project before it is built, and the changed design files are re-captured
  from the built app afterward (`design:capture` → write → `design:verify`), so the project
  matches what ships. This is a hard rule in `CLAUDE.md` (2026-11-21); run it even if an older
  plan has no design step.
- **Open questions** — apply each stated default and tell the user which defaults you're
  proceeding under. Only block if a question has no default and proceeding either way
  would be unsafe or make the work useless if wrong.
- **Staleness** — the plan was written against a snapshot. Spot-check that the files in
  *Files touched* still look the way *Context* describes. If the code has moved under the
  plan, say what drifted and how you're adapting, then continue — a stale detail is a
  correction to make, not a reason to stop.
- **Staged research** — `/plan` may have left fetched data in `source-material/**/*.md`,
  uncommitted. If it's there, commit it on the branch and ingest it as your first build
  step.
- **Source freshness** — a value the plan copies from a school's live page goes stale when
  the page changes. **If more than 7 days have passed since that value was fetched** (the
  date on its `### Re-verification <date>` note under `## Method`, or else the plan's
  date), re-open the cited source before typing the value, and record what it says today in
  a new `### Re-verification <today> (plan <name>, implement)` sub-section under that
  record's `## Method`. If it still matches, build as planned. If it moved, do **not** type
  either value on your own judgment. Tell the user the old value, the new value and the
  URL, say what it does to the finding (fixed by the school, now a different value, or now
  the school's pages disagreeing), and wait for their call on that item; build the rest
  meanwhile. Values recounted from our own lists need no fetch. Round 1 of the consistency
  work is the reason: a seed item had flipped because the school's page changed between
  sightings.

### 3. Branch

Per `CLAUDE.md`: branch and PR, never a direct commit to `main`. Use the plan's `branch`
field; if it's absent or taken, derive one from the plan name. If the current branch is
already the plan's branch with work in progress, continue on it.

Set the plan's status to `in-progress` in its front matter and in the index. This is the
one thing worth doing before the work, not after — it's what makes an interrupted run
recoverable.

### 4. Build Phase 1 — English only

Work the steps in order, keeping a todo list so progress is visible. Match the
surrounding code's conventions rather than importing new ones.

**When the plan adds a school (or backfills one into per-school card data), mirror the
FULLEST existing school for each area, not whichever school was added most recently.**
Open a data-rich reference — Providence Day, Charlotte Latin or Cannon (~96% Compare
fill) — and populate every optional field, stat tile, season/ledger/funnel/roster row and
sub-card the new school has real data for. The recent-add school is a **mechanical**
reference only (file layout, how a `PROGRAMS` import is wired); it is not the depth target,
because it may be a thin school and copying it silently caps the new school below what its
data supports. Drop a field **only** where the data is genuinely unpublished (then it is
omitted, not shipped empty). If the plan names one fixed school as its "shape reference,"
read that as *mechanical* shape — still build the content out to the richest school's
structure. (User-set, 2026-08-16.)

**Build the English version only.** Any plan that touches user-facing text ships in two
phases with the user's review in between — this holds whether or not the plan document
says so. If you're handed a text-touching plan written as a single phase, treat its
locale work as Phase 2 and say you're doing that.

**Finish the whole phase.** If a step turns out to be blocked or wrong, complete every
other step in full, then say plainly which step you left out and why. Scaling the work
down is the user's call.

**The plan is the scope.** A better idea that arrives mid-build goes in the report as a
suggestion, not into the diff. If a step is genuinely wrong — it contradicts the codebase
or would break something — say so in a sentence, implement the correct thing, and record
the deviation for step 8. Don't silently follow a plan you know to be broken, and don't
silently rewrite it either.

Standing rules apply to everything you write here, whether or not the plan restates them:
new user-facing strings are **keys in `src/locales/en.json`, never hardcoded JSX** — the
key goes in now, the other catalogs come in Phase 2; figures are copied char-for-char,
never re-typed.

**If the build downloads or fetches new school data, persist it to
`source-material/<topic>/<school>/*.md` and run the `ingest-source-material` skill** —
even when the plan doesn't mention it. The skill owns how ingestion works; just don't let
fetched data reach the app without going through it.

The same applies to *fetching*: if a plan calls for UNC-system admit rates, use the
`nc-admissions-data` skill rather than working out the dashboard yourself. It is
canvas-rendered and every simple export path is blocked while still returning HTTP 200,
so an improvised attempt tends to produce a plausible-looking wrong table.

### 5. Verify Phase 1

Run every check in the plan's *Verification* section for this phase, plus the repo
baseline (`npx tsc --noEmit`, `npm run build`, and any `check:*` script covering the
touched area).

Report results faithfully. If a check fails, show the output and fix it — a failing check
reported as a pass is worse than no check. If the change touches rendering, the plan
should have asked for a browser check; this repo's record is that render-layer defects
survive every automated check, so do it rather than reasoning that it's fine.

### 5b. Adversarial review — every plan

**When:** Phase 1 only, after step 5 passes. For a two-phase plan it runs before the step 6
English stop; for a single-phase plan, before step 8's PR. **Phase 2 is not reviewed**:
translation has its own checks (`check:runtime`, `check:digits`, `i18n:leaks` …).

It is never skipped on your own judgment, small plans included. The developer may say "skip
the review" at that moment; record "skipped by developer" in the plan's Implementation notes
and the report. A plan written before this step existed may list its own review step: run 5b
once, treat that plan step as satisfied by it, and note it.

**Brief:** a closing-loop plan (front matter `closing_loop: consistency-self-scan`, or, for a
plan written before that field existed, a name `consistency<N>`) uses
[`../consistency-self-scan/review.md`](../consistency-self-scan/review.md) with its worklist,
plus a before-dump if one was kept (otherwise "none"). Every other plan uses
[`review.md`](review.md) in this skill.

**Pass 1**

1. **Commit** the Phase 1 work, staging explicit paths, and note the SHA as *the commit
   reviewed*. The reviewer reads `git diff main...<branch>`, which shows nothing uncommitted.
2. **Dumps.** If `git diff --name-only main...HEAD` touches `src/`, `public/` or `index.html`,
   run `npm run build`, `mkdir -p <scratchpad>/pages-after`, then
   `python3 -I .claude/skills/consistency-self-scan/dump_pages.py dist/school <scratchpad>/pages-after`.
   Otherwise pass "none" (a skill-, script- or doc-only plan). The dumps hold school pages only,
   not Compare.
3. **Spawn** the filled brief (in the scratchpad: plan, branch, dump folder, an output path,
   plus the worklist and, if kept, the before-dump for the consistency brief) on **one fresh
   `general-purpose` agent**. On pass 1, fill the second-pass placeholders (`{{FIX_DIFF}}`,
   `{{FIRST_FINDINGS}}`) with `n/a (first pass)`. Give it those paths only, never your own
   summary of what you built or fixed: its job is to prove the work wrong, and a reviewer
   handed a conclusion tends to confirm it.
4. **Verify** every finding yourself against the diff and the dumps, and set or correct its
   severity: `must-fix` (wrong or broken: a wrong figure, a plan step that did not land, a
   page contradiction, a build or house-rule breach), `should-fix` (a house-rule or clarity
   problem that is not wrong) or `minor`. The consistency brief has no severity column, so you
   set it there. Reject each false positive with a one-line reason. Rejected findings are
   listed, never asked about, so the question is not padded with noise.
5. **Ask the developer which confirmed findings to fix.**
   - **0 confirmed:** no question. Say "the review found nothing to fix", with the rejected
     count.
   - **1–16 confirmed:** sort by severity (must-fix first) and **renumber in that order**, so
     a finding's `#<n>` is the same in the table and the question. Keep the reviewer's own
     number beside it (`#3 (R5)`) in the table and when you record outcomes in the findings
     file, so the developer's picks and the file still match. Print the full table first:
     number, severity, one-line problem, where, suggested fix. Then cut into **chunks of 4**,
     one `multiSelect: true` question per chunk, all in **one** `AskUserQuestion` call. Never
     make a question per severity group: 5 + 5 + 5 findings would need six questions, and the
     limit is four. Option label: `#<n> <≤4-word gist>`; description: severity, the problem and
     the suggested fix. Header (12 characters at most): "Fix 1–4", "Fix 5–8" and so on. A
     question needs at least two options, so a last chunk of one gets a second option,
     "Don't fix".
   - **More than 16:** print the table, then ask one single-select question: "Fix all
     must-fix", "Fix all confirmed", "Fix none" (Other is added automatically: "type the
     numbers").
   - **Outside the plan's scope:** a fix that would go beyond the plan says so in its option
     description ("outside the plan's scope"), since the plan is the scope (step 4).
   - **`AskUserQuestion` unavailable** (a non-interactive run): print the table, fix nothing,
     and end the turn asking for the numbers in text.
6. **Fix only the picked findings** on the branch. Re-run the checks the fixes touch, then
   step 5's verification for the affected area. Declined findings are recorded, not fixed.

**Pass 2, on the fixes** (user, 2026-11-22)

7. A fix is new text that no reviewer has read, and new text is where this project's defects
   come from: round 2 shipped "10 academic" where the list held 9. So run a second pass
   whenever pass 1 led to a fix. **Skip it** only when nothing was fixed (none confirmed, or all
   declined), when every fix was a pure deletion, or when the developer says to skip it, and
   record which. Otherwise:
   - mark every pass-1 finding fixed, declined by the developer, or rejected (with its reason)
     in the findings file;
   - commit the fixes;
   - if sub-step 2 made dumps, rebuild and re-dump into a new folder, `pages-after-2`;
   - spawn **one more fresh agent** on the same brief in its *second-pass* mode. Give it the fix
     diff (`git diff <commit reviewed>..HEAD`), the findings file and the new dump. It checks
     only that each fix is right and caused no second-place conflict, which is far cheaper
     than a full review;
   - **verify, ask and fix exactly as in sub-steps 4–6.** The developer picks here too.
8. **Stop at two passes. There is never a third.** An adversarial reviewer is told to assume
   something is wrong, so "loop until it comes back empty" can fail to converge, drifting into
   wording preferences and re-raised rejections. Fixes made after pass 2 are listed as **"fixed,
   not re-reviewed"**, and anything declined in either pass as **"open"**, in the hand-back
   (two-phase) or the final report and PR body (single-phase). For a closing-loop plan the
   step 10 rescan is the backstop for anything both passes miss. Other plans have none, which
   is why those two lists must be reported.

**After the passes**

9. **Record** under the plan's `## Implementation notes` → `### Adversarial review <date>`:
   the counts per pass (found, confirmed, rejected, fixed, declined) and one line per finding
   with its outcome (fixed / declined by developer / rejected: reason). Never write a student's
   name there; give the file and line and `[name withheld]`. Commit it. The same counts go in
   the Phase 1 hand-back (or the single-phase report) and in the PR body.

This runs before the user's review, not after Phase 2, because a defect caught in English is
one fix and the same defect caught after translation is ten.

### 6. STOP — hand the English version back for review

**Single-phase plan?** Skip to step 8 (commit and PR), after step 5b — there is no Phase 2
and no gate.

**Two-phase plan: commit Phase 1 to the branch, then end the turn.** Do not open the PR
and do not start translating. Both phases land in one PR, so the branch stays open across
the review.

Set the plan's front matter to `status: english-done` and the index row to
`English shipped`, so an interrupted run is recoverable and the index never claims a
half-translated feature is done.

Then report, and make the ask concrete:

> **Phase 1 complete — English only.**
>
> <what changed, and where to look at it — the page, the route, the command to run>
>
> Verification: <results>
>
> Review: pass 1 — <found> found, <confirmed> confirmed, <fixed> fixed, <declined> declined,
> <rejected> rejected (or "skipped by developer"); pass 2 — <same, or which skip rule applied>.
> Fixed, not re-reviewed: <list, when any>. Open: <declined findings, when any>.
>
> Nothing is translated yet. Once you're happy with the English wording, say the word and
> I'll roll it out to the other <N> locales.
>
> **Phase 2 is meant to run in a fresh window** — this session is long, and translating
> the overlays needs nothing from it beyond what the plan already records. When you're
> ready, paste this into a new window:
>
> ```
> /implement <name> — Phase 2. The English page is approved. Run only Phase 2 (translate
> the prose overlays to every locale in PROSE_TRANSLATED); do not rebuild Phase 1.
> ```

Tell them **what to look at**, not just what you did. The point of the gate is that they
see it rendered; a report they can only nod at wastes the round trip. Hand them the
paste-in `/implement` command above so Phase 2 starts clean rather than carrying this
window's tokens.

**Then end the turn.** Do not proceed on an assumption that they'd approve, and do not
ask a yes/no question and answer it yourself. The wording is what's being reviewed, and
propagating it to every locale before that review multiplies each revision by <N>.

### 7. Phase 2 — every other locale, after they confirm

Only on the user's explicit go-ahead. If they asked for wording changes, make those in
English first and re-confirm before translating.

**Phase 2 normally runs in a FRESH session** (the paste-in command from step 6), to keep
the long Phase-1 window's tokens out of the translation work. A clean window has no memory
of Phase 1, so re-orient from the durable record before touching anything:

- Read the plan document — its Phase 2 steps are the spec, and `status: english-done` on it
  is the signal Phase 1 already shipped. Confirm with the user that the English is approved
  before translating (they may have paged you here without it).
- `git checkout <plan branch>` (from the plan's front matter) — Phase 1 is committed there,
  unmerged, waiting. Do **not** start a new branch or rebuild Phase 1.
- Skim `git log`/`git diff main...<branch>` to see what English shipped, since you did not
  write it this session.

If instead the user says "keep going" in the *same* window that built Phase 1, just proceed
— the fresh-session steps above are a no-op when the branch is already checked out.

Work the plan's Phase 2 steps. Get the layer right — UI chrome means the
`src/locales/*.json` catalogs listed in `TRANSLATED`; research prose means the overlay
layer per `PROSE_TRANSLATED`. Follow the rollout docs in `.claude/docs/` for the
mechanism, and respect the locale-specific traps they record: figures copied
char-for-char, lakh/crore grouping for `hi`/`te`, RTL isolates for `fa`.

Then run the Phase 2 checks — **`npm run check:runtime` per locale is the authoritative
resolution guard** (a locale overlay that fails its stamp falls back to English
**silently**, so a passing coverage number proves nothing on its own), plus whichever of
`check:sepdrift` / `check:money` / `check:currency` / `check:bidi` / `check:fa` /
`check:hi` / `check:fr` apply.

Also run **`npm run check:digits`** before committing the translations. It compares the
numbers in every unit that is new since `main` with the numbers in its English, and it is
the only check that sees a figure re-typed rather than dropped: `11/17/25` → `17/11/25`,
`4 p.m.` → `16 h`, `13` spelled as a word. Both `check_figures.py` and `check:sepdrift`
pass all three. It is a report (exit 0): fix a re-typed figure, and leave a deliberate
rewording such as `Grade 6` → "Sexto".

Two things a fresh window gets wrong here:

- **`npm run i18n:leaks -- --lang <code>` is where genuine untranslated prose hides — run
  it for every locale.** It is a cross-locale consistency review: it flags any string one
  locale kept in English that ≥2 others translated. Most flags are *legitimate keeps*
  (win/loss status codes like `STATE`/`RUNNER-UP`, figure and grade-band labels, verbatim
  quotes, proper-noun identifiers) — but the real misses hide among them. Adding a
  data-rich school surfaced **46 genuine leaks** on the Covenant Day rollout, mostly short
  course descriptions and card labels a single locale skipped (`Honors biology.`,
  `Digital photography.`, `Learning specialists`). Triage: a string translated by ≥6
  locales but left English by 1–3 is almost always a real leak; fix it to the consensus
  rendering the others used.
- **`check:live` is KNOWN-INCOMPLETE and fails on `main` — do not chase its failures.** It
  can only walk the six per-school-directory topics, so overlay entries for
  course-offerings, metric-values, financial-aid-report and the standalone club
  catalog/cluster modules always read "unresolvable" for every school. `check:runtime` is
  the guard that actually covers them; trust it over `check:live`.

### 8. Commit and PR

Commit with a message describing the change (not "implement plan X"), referencing the plan
document. Push and open a PR with `gh pr create`, whose body summarizes what shipped,
links the plan, and lists the verification results, the review tally per pass (step 5b) and
any "fixed, not re-reviewed" or "open" items.

Standing permission covers squash-merging and deleting the branch on your own PRs, then
checking out `main` and pulling. **Never deploy** — `npm run deploy` is the user's call,
in the moment, every time.

### 9. Close the loop

Update both records:

- **The plan document** — front matter `status: implemented` and `prs: [123]`. If the
  build deviated from the plan, say what changed and why in its `## Implementation notes`
  section at the bottom (step 5b has usually created it; create it if missing). The plan is the historical record of what was
  actually done, not what was intended.
- **`.claude/plans/INDEX.md`** — status `Implemented`, PR cell holding the link.
- **[`.claude/SKILLS.md`](../../SKILLS.md)** — **only if this plan created, renamed,
  materially changed or retired a skill or slash command.** That index is living and is
  updated in the same PR as the change it describes, never as a follow-up: add a full
  section plus an At-a-glance row for a new one, bump the `updated` date for a change, and
  move a retired one to the Retired table rather than deleting it. Most plans touch no
  skill and skip this — but a skill shipped without its index row leaves the register
  lying, and a register that is only sometimes current is worse than none because it gets
  trusted.

If the work was partial, use `In progress` in both places and list the remaining steps in
the implementation notes so a later window can resume. `Implemented` on a two-phase plan
means **both** phases shipped; a feature sitting in English is `English shipped`.

Then report to the user: what shipped, verification results, the review tally per pass
(step 5b) with its "fixed, not re-reviewed" and "open" lists, the PR link, anything left out
and why, and any suggestion you deliberately kept out of the diff.

### 10. Rescan — closing-loop plans only

**Applies to closing-loop plans only** (front matter `closing_loop: consistency-self-scan`,
or a name `consistency<N>`), the ones step 5b gave the consistency brief. After the merge and
`git pull` on `main`, run the `consistency-self-scan` skill in this window. It picks RESCAN
mode by itself, because this plan is now *Implemented*, and checks every row of the round you
just shipped before sweeping for anything new. No deploy is needed: it scans the `main` build. Deploying stays the user's call.

The skill ends with a verdict. **Clean**: say the round is clean and stop. **Not clean**: it
reports what is left, says how many findings this round's own fixes caused, recommends the
next round and asks the user whether to plan it now or hold off. Either answer ends this
skill's turn: a new round goes through `/plan` and a fresh `/implement`, never on from here.
