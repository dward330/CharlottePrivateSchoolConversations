# Settled rulings — never report these

<!--
  Read by every /consistency-self-scan sweep agent (brief.md points here) and by the parent at
  Step 5. A ruling lands here when the user decides a reported conflict is NOT a conflict, or is
  to be left as it is for good. It stays until the user reverses it.

  Why this file exists: a rescan inherits rulings only from the previous round's plan, so a
  ruling made two rounds back drops out of view and gets re-raised. The Top-75 cap was ruled in
  PR #317, re-raised in round 3 as LAT-S1, and ruled again on 2026-11-21.

  Add an entry with: what not to report, why, who ruled and when, and what IS still a finding.
-->

A sweep agent that sees one of these patterns **does not report it**, in Part 1 or Part 2, and
does not propose a label for it. List it once at the end of your output under
"Settled, skipped" with the page line, so the parent can see it was looked at.

## S1 — Top-75 counts cap at "75 / 75"

- **Do not report:**
  - that more than 75 universities rank #75 or better because of ties (79 National
    Universities in the 2027 table);
  - that a school shows "75 / 75" while holding more than 75 of them (Providence Day 78,
    Charlotte Country Day 76);
  - that "N / 75" implies 75 − N absences when more are named absent elsewhere (Latin
    "73 / 75" with six named absences);
  - any proposal to change the denominator, add a tie note or rephrase the
    "N of the top 75" quals.

  This applies to both the National Universities and the Liberal Arts rows, on the school
  page and on Compare.
- **Why:** capping at 75 / 75 is the rule the user worked out in PR #317.
  `check:buckets` (`scripts/check_selectivity_buckets.mjs`) enforces it with
  `Math.min(institutions, 75)`.
- **Ruled:** PR #317, and again by the user on 2026-11-21 ("We worked this out before to
  just max it at 75/75"), closing round 3's LAT-S1.
- **Still a finding:** a printed numerator that disagrees with the clamped distinct-institution
  count, or a `cats` tag that disagrees with the rank label beside it. `check:buckets` gates
  both, so a red build there is a real defect, not this ruling.
