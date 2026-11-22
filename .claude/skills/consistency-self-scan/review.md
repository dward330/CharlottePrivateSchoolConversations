# Consistency round: adversarial review brief

<!--
  Used by /implement on a closing-loop plan (front matter `closing_loop: consistency-self-scan`),
  at the end of Phase 1, before the English goes back to the user. The implementer fills the
  {{PLACEHOLDERS}} into a scratchpad copy and spawns ONE fresh general-purpose agent on it.

  The reviewer gets the plan, the worklist, the diff and fresh page dumps. It does NOT get the
  implementer's summary or conclusions: a reviewer handed "here is what I fixed" tends to
  confirm it. Its job is to prove the work wrong.

  A second pass ("Second-pass mode" below) also gets the first pass's findings with how each
  was resolved, because its scope is exactly those fixes. It still gets no account of why a
  fix is right.
-->

You are reviewing a finished consistency fix, and your job is to **find what is wrong with it**.
Assume the implementer missed something; every earlier round did. Read only what is listed
here, and form your own view.

- **Repo:** /Users/Derrick/Desktop/CharlottePrivateSchoolConversations (read-only for you)
- **The plan:** `{{PLAN}}` (its Decisions, Steps and `## Implementation notes`)
- **The worklist the plan was built from:** `{{WORKLIST}}`
- **The change:** `git diff main...{{BRANCH}}` (run it yourself)
- **Page text after the change, every card expanded:** `{{PAGES_AFTER}}/<slug>.txt`
- **Page text before the change:** `{{PAGES_BEFORE}}/<slug>.txt` ("none" if not kept)
- **Settled rulings:** `.claude/skills/consistency-self-scan/settled.md`
- **Your output file:** `{{OUTPUT}}`

## Hard rules

Never edit a file other than your output file. Never run `npm run build`, `git checkout`,
`git stash`, `git add` or `git commit`: the tree is shared. You may run read-only commands,
`node scripts/check_consistency.mjs --report`, and grep anything.

## What to try to break

1. **Every ID in the plan landed as decided.** For each row in the plan's Steps tables, find
   the change in the diff and the new text in the after-dump. Report an ID whose fix is
   missing, partial, worded differently from the plan without an Implementation note, or
   applied to the wrong school or card.
2. **The second card.** This is the defect every round has had. For every value the diff
   changed, grep the old value and the new value across that school's whole after-dump, the
   school's Compare cells and quals in `src/data/metricValues.ts`, and the other schools'
   dumps when the fix was cross-school. Any place still showing the old value, or restating
   the fact differently, is a finding.
3. **A fix that broke something.** Did a new sentence, footnote, scope line or count introduce
   its own error? Recount every list a changed headline or count describes (round 2 shipped
   "10 academic" where the list held 9). Check the arithmetic in every new figure.
4. **Collateral damage.** Did the diff change anything the plan did not ask for: another
   school's data, a settled entry, a shared label, an overlay path, an unrelated card? A
   deletion that left an empty card, an empty figure space or a dangling "see below"?
5. **Rules of the house** (from `CLAUDE.md`): research bookkeeping in parent-facing prose
   instead of a `kind: 'verify'` flag; a source cited by name with no URL where a URL exists; a
   percentage that is not a whole number; British spelling; a figure re-typed instead of
   copied char-for-char from its source; a new user-facing string hard-coded in JSX rather
   than a locale key.
6. **Evidence.** For any fix that types a value from a school's page, the worklist cites the
   source. Is the value in the diff the one the evidence gives? (You need not re-fetch unless
   the two disagree.)
7. **UX changes.** If the plan has an approved UX change, does the built element match the
   Claude Design file the plan names (see the plan's design step)? Report a visible
   difference; you cannot judge taste, only mismatch.

Do not report wording or style preferences, translation (Phase 2 has its own checks), or
anything `settled.md` covers. Do not re-report a worklist finding the plan deliberately left
out (its *Out of scope* section) unless the diff made it worse.

## Second-pass mode

Use this mode when the brief names a **fix diff** and a **first-pass findings file**: `/implement`
fixed the first pass's findings and wants only those fixes checked. It is the last pass;
`/implement` caps the loop at two.

- **Fix diff:** `{{FIX_DIFF}}`. Run it yourself. It is the only change in scope.
- **First pass's findings, each marked fixed or rejected:** `{{FIRST_FINDINGS}}`

Check two things only:

1. **Each fix is right.** It resolves its finding, its numbers add up, and its sentence states
   nothing the page or its evidence contradicts.
2. **No new second card.** For every value or claim the fix diff changed, grep the old and new
   wording across that school's whole after-dump and its Compare cells and quals, exactly as
   in rule 2 above.

Do **not** re-review the rest of the round, and do not re-raise a first-pass finding marked
rejected unless the fix diff made it worse. Report "no findings" when there are none: that is
the expected result of a good fix, not a failure to look.

## Output

Write your output file as a table:
`# | ID or "new" | school | what is wrong | where (file:line and after-dump L) | evidence | suggested fix`
Quote text verbatim so it can be grepped. Then a short list of what you checked and found
sound, so the coverage is visible. Return a concise summary with the table inline. Report only
what you verified; "could not determine" is a valid line, a guess is not.
