# Implementation: adversarial review brief

<!--
  Used by /implement step 5b on every plan that is NOT a closing-loop consistency round (those
  use .claude/skills/consistency-self-scan/review.md instead). It runs at the end of Phase 1:
  before the English stop on a two-phase plan, before the PR on a single-phase one. The
  implementer fills the {{PLACEHOLDERS}} into a scratchpad copy and spawns ONE fresh
  general-purpose agent on it.

  The reviewer gets the plan, the diff and (when src/ changed) fresh page dumps. It does NOT
  get the implementer's summary or conclusions: a reviewer handed "here is what I built" tends
  to confirm it. Its job is to prove the work wrong.

  A second pass ("Second-pass mode" below) also gets the first pass's findings with how each
  was resolved, because its scope is exactly those fixes. It still gets no account of why a
  fix is right.
-->

You are reviewing a finished implementation, and your job is to **find what is wrong with it**.
Assume the implementer missed something. Read only what is listed here, and form your own view.

- **Repo:** /Users/Derrick/Desktop/CharlottePrivateSchoolConversations (read-only for you)
- **The plan:** `{{PLAN}}` (its Goal, Decisions, Steps, *Out of scope* and any
  `## Implementation notes`)
- **The change:** `git diff main...{{BRANCH}}` (run it yourself). For the old version of a
  file, `git show main:<path>`.
- **School page text after the change, every card expanded:** `{{PAGES_AFTER}}/<slug>.txt`
  ("none" when the change touches no `src/`, `public/` or `index.html`). The dumps hold
  **school pages only**, not the Compare page, so check a Compare change in
  `src/data/metricValues.ts`.
- **Your output file:** `{{OUTPUT}}`

## Hard rules

Never edit a file other than your output file. Never run `npm run build`, `git checkout`,
`git stash`, `git add` or `git commit`: the tree is shared. You may run read-only commands,
`node scripts/check_consistency.mjs --report`,
`node scripts/check_plain_language.mjs --file <path>`, and grep anything.

**Never write a student's name** (the Student-name standard in `CLAUDE.md`). Your findings file
is quoted into a committed plan and a PR body. If a finding is about a name, give the file and
line and write `[name withheld]` in place of the name, in every column.

## What to try to break

1. **Every step landed as decided.** For each numbered step and each Decision, find it in the
   diff. Report one that is missing, partial, done differently with no Implementation note, or
   applied to the wrong file, school or card. Report anything in *Out of scope* that the diff
   did anyway.
2. **The second place.** For every value, label or sentence the diff changed, grep the old and
   the new text across `src/`, `src/locales/en.json`, the after-dumps and (for skill or doc
   changes) `.claude/` and `CLAUDE.md`. Any place still stating the old value, or stating the
   same fact differently, is a finding.
3. **A change that broke something.** Recount every list a changed headline, count or tile
   describes. Check the arithmetic of every new figure. Run
   `node scripts/check_consistency.mjs --report` and report new R8 pairs the diff caused.
4. **Collateral damage.** Changes to anything the plan did not ask for. Also an emptied card, a
   dangling reference, a shared label changed under another row, or an overlay path shift with
   no re-splice planned.
5. **House rules** (`CLAUDE.md`), applied to new or changed parent-facing English:
   - a student named against the Student-name standard (never repeat the name);
   - research bookkeeping in prose instead of a `kind: 'verify'` flag;
   - a citation with no URL;
   - a percentage that is not a whole number;
   - British spelling;
   - a figure re-typed instead of copied char-for-char from its source;
   - a new user-facing string hard-coded in JSX rather than a locale key;
   - a card kicker (`1a ·`, `Topic 01 of 07`);
   - a new card or section shipped empty;
   - jargon, or sentences over the plain-language limits. Run
     `node scripts/check_plain_language.mjs --file <path>` on each changed data file.
6. **Evidence.** A value typed from `source-material/` or a cited URL matches its source file.
   Re-fetch only if the two disagree.
7. **UX.** If the plan has an approved UX change, does the built element (in the after-dump and
   the diff) match the Claude Design file the plan names? Report a mismatch, never taste.
8. **Render residue in the dumps:** raw markdown (`**`, `](`), `undefined`, `NaN`, `{{`, a bare
   locale key (`cardLabels.…`, `sections.…`), a doubled or empty heading.
9. **Skill and doc changes.** If the diff touches `.claude/skills/**`, `.claude/docs/**` or
   `CLAUDE.md`: `.claude/SKILLS.md` is updated in the same diff when a skill changed;
   cross-references (step numbers, file paths, `L` line refs) still point at real things; no
   two documents now contradict each other.

Do not report wording or style preferences, translation (Phase 2 has its own checks), or
anything the plan's *Out of scope* excludes, unless the diff made it worse.

## Second-pass mode

Use this mode when the brief names a **fix diff** and a **first-pass findings file**:
`/implement` fixed the first-pass findings the developer picked and wants only those fixes
checked. It is the last pass; `/implement` caps the loop at two.

- **Fix diff:** `{{FIX_DIFF}}`. Run it yourself. It is the only change in scope.
- **First pass's findings, each marked fixed, declined by the developer, or rejected:**
  `{{FIRST_FINDINGS}}`

Check two things only:

1. **Each fix is right.** It resolves its finding, its numbers add up, and it states nothing
   the page, the plan or its evidence contradicts.
2. **No new second place.** For every value or claim the fix diff changed, grep the old and new
   wording as in item 2 above.

Do **not** re-review the rest of the change, and do not re-raise a first-pass finding marked
rejected or declined unless the fix diff made it worse. Report "no findings" when there are
none: that is the expected result of a good fix, not a failure to look.

## Output

Write your output file as a table:
`# | severity | what is wrong | where (file:line, dump L) | evidence | suggested fix`

- **severity** is one of `must-fix` (wrong or broken: a wrong figure, a plan step that did not
  land, a page contradiction, a build or house-rule breach), `should-fix` (a house-rule or
  clarity problem that is not wrong) or `minor`.
- **evidence** is quoted verbatim so it can be grepped, with any student name replaced by
  `[name withheld]`.

Then a short list of what you checked and found sound, so the coverage is visible. Return a
concise summary with the table inline. Report only what you verified; "could not determine" is
a valid line, a guess is not.
