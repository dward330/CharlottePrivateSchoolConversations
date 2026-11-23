---
name: implreview
title: Every /implement run gets an adversarial review, and the developer picks which findings to fix
status: implemented
phases: 1
created: 2026-11-22
amended: 2026-11-22
branch: feat/implreview
prs: [525]
---

# An adversarial review for every plan, with the developer choosing the fixes

## Goal

Today `/implement` runs an adversarial agent review only for consistency rounds, and the
implementer decides for itself which findings to fix. After this change, **every plan** gets
one fresh, independent reviewer whose job is to prove the work wrong, run before the work
comes back to the developer. The implementer verifies each finding and drops the false
positives with a reason. It then **shows the developer the confirmed findings and asks which
to fix**, fixes only those, and records the whole tally. Done means: a fresh `/implement` on
any plan reaches the review step, a finding list is presented through a multi-select
question, a second pass checks the fixes (capped at two passes in all), and the plan's
Implementation notes show found / confirmed / fixed / declined / rejected for each pass.

**All of this is Phase 1 only.** Phase 2 (translation) gets no adversarial review.

**Amended 2026-11-22 (user approved):** the first draft missed #515 (`58434f0b`), which had
added the second pass. Its rewrite of step 5b would have deleted it. The second pass stays,
extends to every plan, and asks the developer exactly as the first does.

## Context

### What exists

- **`.claude/skills/implement/SKILL.md`** (323 lines). Steps 1–10. The review is **step 5b,
  "Adversarial review — closing-loop plans only"** (~L144–178). It applies when front matter
  has `closing_loop: consistency-self-scan` (or the name is `consistency<N>`). Its sub-steps:
  1. Build the branch, then dump pages with
     `python3 -I .claude/skills/consistency-self-scan/dump_pages.py dist/school <scratchpad>/pages-after`.
  2. Fill `.claude/skills/consistency-self-scan/review.md` into the scratchpad and spawn **one
     fresh `general-purpose` agent** on it, giving it paths only, never the implementer's
     summary.
  3. "Verify every finding yourself against the dump and the diff. **Fix the real ones** on
     the branch and re-run the affected checks. Reject the rest with a one-line reason." This
     is the part that changes: there is no developer choice today.
  4. **Second pass on the fixes, from #515**, whenever sub-step 3 changed anything: commit the
     fixes, rebuild, re-dump, spawn one more fresh agent on the brief's *Second-pass mode*.
     **Capped at two passes**, then "fix what is real and stop". Skipped when the first pass
     found nothing real or every fix was a pure deletion. **This stays.** Only its scope
     (every plan) and who picks the fixes (the developer) change.
  5. Record found / fixed / rejected, per pass, in `## Implementation notes` and the Phase 1
     hand-back.

  Step 6 (~L180) is the English STOP. **A single-phase plan skips from 6 to step 8** (commit
  and PR), so a single-phase plan has no review point today at all. Step 10 (~L313) is the
  closing-loop rescan, which stays consistency-only.

  **Nothing is committed when 5b starts.** Phase 1 is committed in step 6 (two-phase) or
  step 8 (single-phase), so `git diff main...<branch>` would show the reviewer nothing.
- **`.claude/skills/consistency-self-scan/review.md`** (96 lines). It is the reviewer brief
  for consistency rounds, with placeholders `{{PLAN}}`, `{{WORKLIST}}`, `{{BRANCH}}`,
  `{{PAGES_AFTER}}`, `{{PAGES_BEFORE}}` and `{{OUTPUT}}`. Its sections:
  - **Hard rules:** edit only the output file; never build, `git checkout`, `git stash`,
    `git add` or `git commit`; read-only commands only.
  - **What to try to break**, seven items: (1) every worklist ID landed; (2) the second card
    still showing the old value; (3) a fix that broke something, such as a recount or the
    arithmetic; (4) collateral damage; (5) house rules from CLAUDE.md; (6) evidence;
    (7) UX matching the Claude Design file.
  - What not to report.
  - **Second-pass mode** (~L69–88, from #515): placeholders `{{FIX_DIFF}}` and
    `{{FIRST_FINDINGS}}`. It checks only that each fix is right and created no second-place
    conflict. It knows two outcomes, "fixed or rejected", and has no "declined".
  - **Output** as a table, with **no severity column**.

  It is worklist-specific (IDs, `settled.md`). Its checklist stays as it is.
- **`.claude/skills/consistency-self-scan/dump_pages.py`** renders every
  `dist/school/<slug>/index.html` to text. Card bodies are in the HTML whether open or
  closed, so the dump holds every card. It is reusable as is, with two limits: the output
  folder must already exist (`mkdir -p`), and it does **not** dump the Compare pages.
- **`.claude/skills/consistency-self-scan/SKILL.md`** ~L256–266, *The closing loop*, part A,
  describes the review and says "The implementer verifies every finding …, fixes the real
  ones on the branch". That sentence must match the new ask-first behavior.
- **`.claude/skills/plan/SKILL.md`** ~L125–128, the standing-rules bullet "Consistency rounds
  close their own loop", says a consistency plan "gets … an adversarial-review step at the
  end of Phase 1". `plan-template.md` has no review mention.
- **`.claude/SKILLS.md`**: the `implement` section ~L142–185 (header line ~L148 "updated
  2026-11-21 (…)", steps table row `5 | Verify Phase 1 · 5b adversarial review (closing-loop
  plans)`), the `plan` section ~L113–140 and the `consistency-self-scan` section ~L652+.
- **`CLAUDE.md`**: the Planning workflow section (~L26 onward) does not mention a review.
  The Testing conventions bullet on `check:consistency` (~L1298) says "`/implement` runs an
  adversarial review before the English review and a rescan after the merge".
- **`AskUserQuestion`** takes 1–4 questions, each with 2–4 options and `multiSelect`.
  "Other" (free text) is always added automatically. So one call can offer at most 16
  findings as individual options.
- `scripts/check_plain_language.mjs --file <path>` checks one file (exit 0), and
  `node scripts/check_consistency.mjs --report` prints R8. Both are read-only, so the
  reviewer may run them.

### Why now

The user asked on 2026-11-22, while reviewing plan `allcommits`, whether every `/implement`
gets such a review. It does not: `allcommits` (a Compare row, four new roster rows, three new
level tags, about 20 reworded strings) would ship to the English review unreviewed.

## Decisions

- **Every plan, Phase 1 only.** For two-phase plans, the review runs after step 5 passes,
  before the step 6 English STOP. For single-phase plans, it runs after step 5, before step
  8's PR. Phase 2 gets no review of its own: translation has its own checks
  (`check:runtime`, `check:digits`, `i18n:leaks` …), and the reviewer brief excludes
  translation.
- **At most two passes, both in Phase 1** (keeps #515, for every plan):
  - Pass 1 reviews the whole Phase 1 change.
  - Pass 2 is one more fresh agent that checks **only the fixes** from pass 1. It runs when
    pass 1 led to a fix. It is skipped when nothing was fixed (none confirmed or all
    declined), when every fix was a pure deletion, or when the developer says to skip it.
  - Pass 2's confirmed findings go to the developer with the same question as pass 1. Only
    the picked ones are fixed.
  - **There is never a third pass.** Fixes made after pass 2 are listed as "fixed, not
    re-reviewed", and anything declined as "open", in the hand-back (two-phase) or the final
    report and PR body (single-phase).
- **Commit before each pass.** The reviewer reads committed diffs, so Phase 1 is committed
  (explicit paths) before pass 1 and the fixes before pass 2.
- **The developer chooses which findings to fix, for every plan, consistency rounds
  included.** The user's request was for all `/implement` runs. The closing-loop text in
  `consistency-self-scan/SKILL.md` and the plan skill change to match.
- **The implementer still filters first.** The developer sees only *confirmed* findings.
  False positives are rejected with a one-line reason and listed (not asked about), so the
  question is not padded with noise.
- **Two briefs, one step.** A closing-loop plan uses
  `consistency-self-scan/review.md` (same checklist) and every other plan uses a **new
  `.claude/skills/implement/review.md`**. The general brief belongs to the skill that runs
  it. Both have a second-pass mode. Step 10's rescan stays closing-loop only.
- **Both briefs carry the Student-name standard** (`CLAUDE.md`, #518), which binds every
  subagent. A findings file is quoted into a committed plan and a PR body, so it never
  repeats a student's name: give the file and line and write `[name withheld]`.
- **Reuse `dump_pages.py` from where it lives.** Moving it would break the consistency
  skill's references for no gain. Dumps are made only when the diff touches `src/`,
  `public/` or `index.html`. Otherwise `{{PAGES_AFTER}}` is "none" (a skill- or script-only
  plan). No "before" dump for general plans: the reviewer reads `git diff` and `git show
  main:<path>`, which is cheaper than a second build.
- **Severity, set by the reviewer and checked by the implementer** (set by the implementer
  for the consistency brief, which has no severity column): `must-fix` (wrong or broken:
  a wrong figure, a plan step that did not land, a page contradiction, a build or rule
  breach), `should-fix` (a house-rule or clarity problem that is not wrong), `minor`. Order
  the question by severity.
- **How the question is asked**, in both passes (AskUserQuestion limits):
  - 0 confirmed: no question. Say "the review found nothing to fix" with the rejected count.
  - 1–16 confirmed: print the full table first (number, severity, one-line problem, where,
    suggested fix). Then **sort by severity and cut into chunks of 4**, one multi-select
    question per chunk, all in one `AskUserQuestion` call. Do not make a question per
    severity group: 5 + 5 + 5 findings would need six questions and the limit is four. A
    question needs two options, so a last chunk of one gets a second option, "Don't fix".
    Option label: `#<n> <≤4-word gist>`; description: severity, problem and suggested fix.
    Header (12 characters at most): "Fix 1–4", "Fix 5–8" and so on.
  - More than 16: print the table, then ask a single-select question with "Fix all
    must-fix", "Fix all confirmed", "Fix none" and Other ("type the numbers").
  - If `AskUserQuestion` is unavailable (a non-interactive run), print the table, fix
    nothing, and end the turn asking for the numbers in text.
- **Fix only what was picked.** Re-run the checks the fixes touch, then step 5's
  verification for the affected area. Declined findings are recorded, not fixed. A fix that
  would go beyond the plan's scope is flagged to the developer in its option description
  ("outside the plan's scope"), since the plan is the scope (step 4's rule).
- **Record everything:** `## Implementation notes` → `### Adversarial review <date>` with
  counts (found, confirmed, rejected, fixed, declined), then one line per finding with its
  outcome and, for rejected ones, the reason. The same counts go in the Phase 1 hand-back
  (or the single-phase report) and in the PR body.
- **The developer can skip it** by saying so at that moment ("skip the review"). Record
  "skipped by developer". It is never skipped on the implementer's own judgment, including
  for small plans.
- **Plans do not write a review step.** `/implement` runs it for every plan, so a plan that
  also lists it would run it twice. `/plan`'s standing-rules bullet says so. Closing-loop plans
  keep `closing_loop:` in front matter, which now only selects the brief and the rescan.
- **Single-phase**: adds no user-facing text (skill files, a brief, `CLAUDE.md`, `SKILLS.md`).

## Approvals needed

None. The user requested the change on 2026-11-22. It touches no UI, so it needs neither
the UX gate nor Claude Design.

## Out of scope

- Changing `consistency-self-scan/review.md`'s checklist (step 1b's small edits aside), or
  the rescan (step 10).
- A review of Phase 2 translations.
- A third pass.
- A fresh review of English wording the developer changes at the step 6 stop. The review has
  already run by then.
- Moving `dump_pages.py`, or adding a browser to the reviewer (it must not build or run a
  server in the shared tree; browser checks stay with the implementer per step 5).
- Retrofitting already-implemented plans.

## Steps

Single-phase — adds no user-facing text.

0. **Branch and commit the plan.** From an up-to-date `main`, `git checkout -b
   feat/implreview`. Stage `.claude/plans/implreview.md` and this plan's INDEX row by
   explicit path (never `git add -A`, never `git stash`). If `INDEX.md` carries other
   sessions' rows (e.g. `allcommits`), stage only this row: write a copy with just this
   change, `git hash-object -w`, `git update-index --cacheinfo`. Commit: "implreview: plan".

1. **Write `.claude/skills/implement/review.md`**, the general brief. Model it on
   `consistency-self-scan/review.md`: same comment header explaining the no-summary rule,
   same **Hard rules**, plus the student-name rule from Decisions. Placeholders: `{{PLAN}}`,
   `{{BRANCH}}`, `{{PAGES_AFTER}}` (or "none"), `{{OUTPUT}}`, and for the second pass
   `{{FIX_DIFF}}` and `{{FIRST_FINDINGS}}`. State that the dumps hold school pages only, so a
   Compare change is checked in `src/data/metricValues.ts`. **What to try to break:**
   1. **Every step landed as decided.** For each numbered step and each Decision, find it in
      `git diff main...{{BRANCH}}`. Report one that is missing, partial, done differently
      with no Implementation note, or applied to the wrong file, school or card. Report
      anything in *Out of scope* that the diff did anyway.
   2. **The second place.** For every value, label or sentence the diff changed, grep the
      old and new text across `src/`, `src/locales/en.json`, the after-dumps and (for skill
      or doc changes) `.claude/` and `CLAUDE.md`. Any place still stating the old value, or
      the same fact differently, is a finding.
   3. **A change that broke something.** Recount every list a changed headline, count or tile
      describes. Check the arithmetic of every new figure. Run `node
      scripts/check_consistency.mjs --report` and report new R8 pairs the diff caused.
   4. **Collateral damage.** Changes to anything the plan did not ask for. Also an emptied
      card, a dangling reference, a shared label changed under another row, or an overlay
      path shift with no re-splice planned.
   5. **House rules** (CLAUDE.md), applied to new or changed parent-facing English:
      - a student named against the Student-name standard (never repeat the name);
      - research bookkeeping in prose instead of a `kind: 'verify'` flag;
      - a citation with no URL;
      - a non-whole percentage;
      - British spelling;
      - a re-typed figure;
      - a hard-coded JSX string;
      - a card kicker;
      - a new card or section shipped empty;
      - jargon or sentences over the plain-language limits. Run `node
        scripts/check_plain_language.mjs --file <path>` on each changed data file.
   6. **Evidence.** A value typed from `source-material/` or a cited URL matches its source
      file. Re-fetch only if the two disagree.
   7. **UX.** If the plan has an approved UX change, does the built element (in the
      after-dump and the diff) match the Claude Design file the plan names? Report mismatch,
      never taste.
   8. **Render residue in the dumps:** raw markdown (`**`, `](`), `undefined`, `NaN`,
      `{{`, a bare locale key (`cardLabels.…`, `sections.…`), a doubled or empty heading.
   9. **Skill and doc changes.** If the diff touches `.claude/skills/**`, `.claude/docs/**`
      or `CLAUDE.md`: `.claude/SKILLS.md` updated in the same diff when a skill changed;
      cross-references (step numbers, file paths, `L` line refs) still point at real things;
      no two documents now contradict each other.

   *Do not report:* wording or style preferences, translation, or what *Out of scope*
   excludes (unless the diff made it worse). **Output:** a table
   `# | severity (must-fix / should-fix / minor) | what is wrong | where (file:line, dump L) |
   evidence (quoted verbatim, names withheld) | suggested fix`, then a short list of what was checked and
   found sound. "Could not determine" is a valid line; a guess is not.

   **Second-pass mode** (a section of the same brief, before *Output*): used when the brief
   names a fix diff and a first-pass findings file. The fix diff is the only change in
   scope. Check two things: (1) each fix resolves its finding and states nothing wrong;
   (2) no second place now conflicts with it (grep as in item 2). Do not re-review the rest,
   and do not re-raise a finding marked rejected or declined unless the fix made it worse.
   "No findings" is the expected result of a good fix. It is the last pass.

1b. **Edit `.claude/skills/consistency-self-scan/review.md`**, three small changes and no
    checklist change:
    - *Second-pass mode*: "each marked fixed or rejected" → "each marked fixed, declined by
      the developer, or rejected".
    - Same section: "do not re-raise a first-pass finding marked rejected" → "… marked
      rejected or declined".
    - *Hard rules*: add the student-name rule from Decisions.

2. **Rewrite step 5b of `.claude/skills/implement/SKILL.md`** as **"5b. Adversarial review —
   every plan"**:
   Keep the existing numbered shape, including #515's second pass and its reasons.

   - **When:** Phase 1 only, after step 5 passes. For a two-phase plan, before step 6. For a
     single-phase plan, before step 8. Never skipped on the implementer's judgment; the
     developer may say "skip the review" at that moment, and that is recorded.
   - **Brief:** closing-loop plans (front matter `closing_loop: consistency-self-scan`, or a
     name `consistency<N>`) use `../consistency-self-scan/review.md` plus its worklist.
     Every other plan uses `review.md` in this skill.

   **Pass 1**
   1. **Commit** the Phase 1 work (explicit paths) and note the SHA as *the commit reviewed*.
      Without this, `git diff main...<branch>` is empty.
   2. **Dumps:** if `git diff --name-only main...HEAD` touches `src/`, `public/` or
      `index.html`, run `npm run build`, `mkdir -p <scratchpad>/pages-after`, then
      `python3 -I .claude/skills/consistency-self-scan/dump_pages.py dist/school <scratchpad>/pages-after`.
      Otherwise pass "none".
   3. **Spawn** one fresh `general-purpose` agent on the filled brief, giving it paths only,
      never the implementer's summary (keep the existing reason).
   4. **Verify** each finding against the diff and dumps, and set or correct its severity.
      Reject false positives with a one-line reason.
   5. **Ask:** the rules in this plan's Decisions ("How the question is asked"), written out
      in full: the table first, the chunks of 4 in severity order, the one-finding chunk, the
      >16 fallback, the 0-finding case, the non-interactive fallback, and flagging
      out-of-scope fixes.
   6. **Fix** only the picked findings on the branch; re-run the affected checks.

   **Pass 2, on the fixes** (the existing sub-step 4, extended to every plan)

   7. **Skip** it only for the reasons in Decisions, and record which. Otherwise:
      - mark every pass 1 finding fixed, declined or rejected in the findings file;
      - commit the fixes;
      - rebuild and re-dump into a new folder, `pages-after-2`, if sub-step 2 made dumps;
      - spawn **one more fresh agent** on the same brief in *second-pass* mode, giving it
        `git diff <commit reviewed>..HEAD`, the findings file and the new dump;
      - **verify, ask and fix exactly as in sub-steps 4–6.** This replaces "fix what is real
        and stop": the developer picks here too.
   8. **Stop at two passes.** Keep #515's reason for the cap. List "fixed, not re-reviewed"
      and "open" items as in Decisions. For closing-loop plans the step 10 rescan is still
      the backstop. Other plans have none, which is why those two lists must be reported.

   **After the passes**

   9. **Record** under `## Implementation notes` → `### Adversarial review <date>`: counts
      per pass and one line per finding (fixed / declined by developer / rejected: reason),
      with no student names. Commit it. The counts go in the hand-back and the PR body.
   - Keep the closing sentence: a defect caught in English is one fix; after translation,
     ten.
   Then adjust the cross-references:
   - Step 6's opening "**Single-phase plan?** Skip to step 8" → "Skip to step 8 (after step
     5b)".
   - Step 6's hand-back template: add a "Review: <found> found, <confirmed> confirmed, <fixed>
     fixed, <declined> declined" line per pass, plus the "fixed, not re-reviewed" and "open"
     lists when either has items.
   - Step 8's PR body: "lists the verification results, the review tally per pass and any open items".
   - Step 10 "**Applies when** step 5b applied" → "Applies to closing-loop plans only (front
     matter `closing_loop: consistency-self-scan`)", since 5b now applies to every plan.

3. **`.claude/skills/consistency-self-scan/SKILL.md`**, *The closing loop* part A (~L256–266):
   replace "verifies every finding against the dump and the diff, fixes the real ones on the
   branch, and reports the count (found, fixed, rejected with the reason)" with "verifies every
   finding against the dump and the diff, rejects false positives with a reason, asks the
   developer which confirmed findings to fix (`/implement` step 5b), fixes those, and reports
   the count per pass (found, confirmed, fixed, declined, rejected). When anything was fixed,
   a second pass checks only the fixes and asks the same way, capped at two passes". Keep
   everything else.

4. **`.claude/skills/plan/SKILL.md`** step 3, standing rules:
   - Add a bullet: "**Every plan gets an adversarial review from `/implement`** (step 5b)
     at the end of Phase 1, plus a second pass on any fixes, and the user picks which
     findings to fix in both. Phase 2 is not reviewed. Do not
     write a review step into the plan: it would run twice."
   - Reword the consistency bullet (~L125–128): such a plan "gets `closing_loop:
     consistency-self-scan` in its front matter, which selects the consistency review brief
     and adds a rescan step after the merge (`/implement` steps 5b and 10)".

5. **`.claude/SKILLS.md`:**
   - `implement` section: the header line becomes `updated 2026-11-xx (adversarial review for
     every plan, developer picks the fixes; 2026-11-21: …)`, keeping the older entries.
   - Steps table row 5 becomes `Verify Phase 1 · **5b** adversarial review (every plan; you
     pick which findings to fix), plus one second pass on the fixes (you pick again), capped
     at two`.
   - Add a callout beside the others: "> **🔍 Every plan gets an adversarial review.** A
     fresh agent tries to prove the work wrong before it comes back to you. You see the
     confirmed findings and choose which to fix; the rest are recorded as declined. One second
     pass then checks the fixes and asks you again, and there is never a third. Phase 2
     (translation) is not reviewed."
   - Row 10 keeps "closing-loop plans".
   - `plan` section: one line on the new rule. `consistency-self-scan` section: its
     closing-loop line, if it says the implementer fixes the findings, gets the ask-first
     wording. Its *Loop* row (~L684) keeps the second pass and the cap, and adds that the
     developer picks the fixes in both passes. Bump both `updated` dates.

6. **`CLAUDE.md`:**
   - Planning workflow (after the paragraph describing `/implement`, ~L37): add "**Every
     implementation gets an adversarial review at the end of Phase 1.** `/implement`
     spawns a fresh agent that tries to prove the work wrong, verifies its findings, and asks
     you which to fix. One second pass checks those fixes and asks again (never a third).
     Phase 2 is not reviewed. A plan never needs to list this step."
   - The `check:consistency` bullet (~L1298): "`/implement` runs an adversarial review
     before the English review" → keep, adding "(as it does for every plan)".

7. **Dogfood check.** This plan is single-phase and changes the very step that reviews it.
   So after step 6, run the **new** step 5b by hand on this branch, starting with its commit:
   no dumps (the diff touches no `src/`), the general brief, one agent, then the second pass
   if anything is fixed. Present its confirmed findings with the new
   AskUserQuestion flow, and fix the picked ones. This is the end-to-end test of the change.
   Record it under `### Adversarial review` in this plan.

8. **Commit, PR, merge.** Explicit paths only (`git status --short` first): the three
   `SKILL.md` files, both `review.md` briefs, `SKILLS.md`, `CLAUDE.md`, this plan and its INDEX row.
   Message: "/implement: adversarial review for every plan; the developer picks the fixes".
   Push, verify `git rev-parse HEAD` = `git ls-remote origin feat/implreview`, `gh pr create
   --body-file`. Set the plan and its INDEX row to implemented with the PR, then commit and
   push that **on the branch**. Squash-merge, `git checkout main && git pull`. **No deploy** (nothing to deploy; it is skill text).

## Files touched

| File | Change |
|---|---|
| `.claude/skills/implement/review.md` | new general reviewer brief, with a second-pass mode |
| `.claude/skills/consistency-self-scan/review.md` | second-pass mode learns "declined"; student-name rule |
| `.claude/skills/implement/SKILL.md` | step 5b rewritten for every plan with ask-first, second pass kept; steps 6, 8, 10 cross-refs |
| `.claude/skills/consistency-self-scan/SKILL.md` | closing loop part A: ask-first wording |
| `.claude/skills/plan/SKILL.md` | new standing-rule bullet; consistency bullet reworded |
| `.claude/SKILLS.md` | implement, plan, consistency-self-scan entries |
| `CLAUDE.md` | Planning workflow sentence; `check:consistency` bullet |
| `.claude/plans/implreview.md`, `INDEX.md` | status, Implementation notes |

## Verification

- [ ] `grep -n "closing-loop plans only" .claude/skills/implement/SKILL.md` matches only inside
      step 10 (its heading and its *Applies* line), not 5b
- [ ] `grep -rniE "fix(es)? the real ones|fix what is real" .claude/skills .claude/SKILLS.md`
      returns nothing (not all of `.claude/`: this plan quotes both phrases)
- [ ] **#515 survived:** step 5b, both briefs, the consistency skill's part A and
      `.claude/SKILLS.md` all state the second pass; 5b and `SKILLS.md` state the cap of two
- [ ] Both briefs' second-pass modes say "declined", and both carry the student-name rule
- [ ] Step 5b commits before each pass and says Phase 2 is not reviewed
- [ ] Every path the new `review.md` and step 5b name exists (`ls` each:
      `dump_pages.py`, `check_plain_language.mjs`, `check_consistency.mjs`,
      `consistency-self-scan/review.md`)
- [ ] Every step number cross-referenced in the edited `SKILL.md` files points at the right
      step (read each one: 5b, 6, 8, 10)
- [ ] `.claude/SKILLS.md` implement steps table and callout match the new 5b
- [ ] `npm run check:spelling` passes (CLAUDE.md is not in scope, but SKILLS.md wording
      should stay American)
- [ ] **Step 7's dogfood run completed:** the reviewer ran from the new brief with paths only;
      the AskUserQuestion multi-select appeared with the confirmed findings; only the picked
      ones were fixed; the second pass ran on those fixes and asked again (or say which skip
      rule applied); the tally is in this plan's Implementation notes and the PR body.
      (If it found nothing, the "nothing to fix" path was exercised instead. Say which.)

## Risks

| Risk | Mitigation |
|---|---|
| Every plan now costs up to two more agent runs and two questions | Accepted by the user's request; the developer can say "skip the review" in the moment |
| The reviewer floods the question with nits | Implementer filters first; severity ordering; the >16 fallback |
| Two briefs drift apart | Hard rules copied verbatim. The general brief is the default; the consistency one adds worklist/settled checks |
| A plan written before this change still has its own review step (e.g. `allcommits`, if any) | Run 5b once; treat a plan step that duplicates it as satisfied by 5b, and note it |

## Open questions

- **Should a single-phase, docs-only plan get the review?** **Default:** yes, with no dumps.
  The user asked for all plans, and doc and skill drift is exactly what item 9 catches.
- **Order versus `allcommits`.** If `implreview` merges first, `/implement allcommits` gets the
  review automatically. **Default:** no change to `allcommits` (it has no review step to
  remove). If `allcommits` is implemented first, it runs under the old skill with no review.

## Implementation notes

### Deviations from the plan

- **`consistency-self-scan/SKILL.md` Step 6 handoff also changed** (not in step 3). It told
  `/plan` to "end its Steps with the two closing-loop steps" (review and rescan). Under the
  Decision "Plans do not write a review step", a listed review would run twice, and a listed
  rescan would duplicate `/implement` step 10 the same way. It now says the plan carries only
  `closing_loop:`, which selects the brief and adds the rescan. (Review pass 1, #8.)
- **`.claude/plans/README.md` gained one sentence** on the review, so the `/implement`
  summary that `CLAUDE.md` points readers to still matches. Outside the plan's Files touched;
  the developer picked it at review (pass 1, #9).
- **The new `CLAUDE.md` paragraph sits after "That is the bar a plan is written to."**, not
  straight after the `/implement` paragraph, so "The split is the point" still follows the
  text it refers to (pass 1, #11).
- `.claude/SKILLS.md`'s "Last updated" line was bumped to 2026-11-23 along with the entry dates.

### Adversarial review 2026-11-23

Step 7's dogfood run of the new step 5b, using the general brief
(`.claude/skills/implement/review.md`). The diff touches no `src/`, so there were no dumps.

**Pass 1** (commit reviewed `2577728f`): 11 found, 11 confirmed, 0 rejected, 11 fixed,
0 declined. The AskUserQuestion flow ran as specified: one call, three multi-select questions
(Fix 1–4, Fix 5–8, Fix 9–11), and the developer picked all 11.

1. should-fix: `CLAUDE.md` sentence read as if the reviewer checks its own findings. Fixed.
2. should-fix: step 9's final report omitted the review tally and the two lists. Fixed.
3. minor: step 9 said "add" an Implementation notes section that 5b already creates. Fixed.
4. minor: 5b's Brief line implied a required before-dump. Fixed ("if one was kept").
5. minor: sub-step 3 did not say how to fill the second-pass placeholders on pass 1. Fixed.
6. minor: option numbers could disagree with the table after the severity sort. Fixed
   (renumber in severity order first).
7. minor: hand-back template had no "skipped by developer" slot. Fixed.
8. minor: the consistency skill's Step 6 handoff edit was unrecorded. Fixed (note above).
9. minor: `.claude/plans/README.md` did not mention the review. Fixed (outside scope, picked).
10. minor: the SKILLS.md `implement` entry did not list `review.md`. Fixed ("Ships with").
11. minor: the new `CLAUDE.md` paragraph broke "The split is the point". Fixed (moved).

**Pass 2** (fix diff `2577728f..95790946`, second-pass mode): 3 found, 3 confirmed, 0 rejected,
3 fixed, 0 declined. One question with three options; the developer picked all 3. No third
pass, so all three are **fixed, not re-reviewed**. **Open:** none.

1. minor: renumbering in severity order did not reach the reviewer's findings file, so picks
   and file numbers could drift. Fixed: keep the reviewer's number beside the new one.
2. minor: a second place for pass-1 #4, where sub-step 3 still listed the before-dump as
   always present. Fixed ("if kept").
3. minor: the reworded `CLAUDE.md` sentence could still attach "checks its findings" to the
   agent. Fixed: split into two sentences, with `/implement` as the second subject.

The dogfood verification held: the reviewer worked from the new brief with paths only, the
multi-select flow ran in both passes, only picked findings were fixed, and the second pass ran
on the fixes alone.
