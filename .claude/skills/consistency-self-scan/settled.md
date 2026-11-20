# Settled rulings — never report these

<!--
  Read by every /consistency-self-scan sweep agent (brief.md points here) and by the parent at
  Step 5. A ruling lands here when the user decides a reported conflict is NOT a conflict, or is
  to be left as it is for good. It stays until the user reverses it.

  Why this file exists: a rescan inherits rulings only from the previous round's plan, so a
  ruling made two rounds back drops out of view and gets re-raised. The Top-75 cap was ruled in
  PR #317, re-raised in round 3 as LAT-S1, and ruled again on 2026-11-21.

  Add an entry with: what it covers (a pattern, or exact values), what not to report, why, who
  ruled and when, and what IS still a finding. The plan that carries a ruling adds the entry in
  the same PR; a ruling written only into one round's plan is lost two rounds later.

  What does NOT belong here: a one-round D that waits on something ("no change until the user
  supplies the URL", CCD-R8), and a suggestion left open behind a UX gate (LAT-13). Those are
  still open; each rescan's Part 1 carries them forward as UNCHANGED BY DECISION.
-->

A sweep agent that sees one of these **does not report it**, in Part 1 or Part 2, and does not
propose a label for it. List it once at the end of your output under "Settled, skipped" with
the page line, so the parent can see it was looked at.

## How an entry matches

Every entry says what it **covers**:

- **A pattern.** The ruling holds for any values, now and later (S1: any Top-75 count is capped
  at 75 / 75).
- **These values.** The ruling accepts one specific conflict, **as it reads today**. It covers
  only the values it records. If the page now shows a different value at the same spot (the
  school changed its page, or our data moved), the conflict is no longer the one the user
  accepted. **Report it as a new finding**, and say "was settled as S<n>" with the old and new
  values. A stale approval must never hide a fresh problem.

Each entry's **Still a finding** line names what remains reportable even while it holds.

---

## Rulings

### S1 — Top-75 counts cap at "75 / 75"

- **Covers:** a pattern.
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

### S2 — Charlotte Latin's camp totals (was LAT-D1)

- **Covers:** these values. Summer Programs prints "232 camp offerings across seven sessions —
  169 distinct titles" (`src/data/summer/charlotte-latin.ts` ~L24) and "89 of the 232
  offerings" at the most common rate (~L979); Compare restates 232.
- **Do not report:** that the record's rates-by-tier Count column sums to 239, not 232, or that
  the committed record (a 142-title / 211-listing sample) cannot rebuild either total.
- **Why:** the full catalog sits behind a Google Sheets API URL with an embedded key, and the
  public browse page went "Private Site" after the season. No public source can settle it.
- **Ruled:** by the user, 2026-11-20 (plan `consistency`): keep as is.
- **Still a finding:** any of 232 / 169 / 89 changing, a new season's catalog going public, or
  another card restating a different total.

### S3 — Gaston Day's camp care period (was GD-24)

- **Covers:** these values. "Wrap-around care is priced separately and modestly — $25 for the
  week before camp, $35 for the week after" (`src/data/summer/gaston-day.ts` ~L436), and the
  Compare `summer-care-span` qual "Before Camp Care … at $25/week and After Camp Care … at
  $35/week" (`metricValues.ts` ~L2259).
- **Do not report:** that the live catalog prints "$25" and "$35" with no period, so "per week"
  is not confirmed.
- **Why:** the period is published nowhere public. Registration runs through a parent-account
  login (popsicle.app).
- **Ruled:** by the user, 2026-11-20 (plan `consistency`): leave as is.
- **Still a finding:** either price changing, or the school publishing a period that is not
  per week.

### S4 — Cannon's 251 camp-week offerings (was CAN-3)

- **Covers:** these values. "251 camp-week offerings across seven weeks" (tile and headline,
  `src/data/summer/cannon.ts` ~L23 and ~L27; Compare `summer-camps` '251', `metricValues.ts`
  ~L2110).
- **Do not report:** that the record's own week breakdown (38 + 34 + 40 + 39 + 39 + 40 + 35)
  sums to 265.
- **Why:** the brochure is page images on Issuu; recounting its Camp Planning Workbook was not
  pursued.
- **Ruled:** by the user, 2026-11-20 (plan `consistency`): not pursued.
- **Still a finding:** 251 changing anywhere, or a new year's brochure.

### S5 — Charlotte Christian's Knights Nations Club is not counted (was CC-R3)

- **Covers:** these values. The Club Catalog counts one global-awareness group (Global Knights)
  in "38 named organizations … (23 Upper + 7 Middle + 8 Lower)", and its scope line says
  "Knights Nations Club, named in an undated school article, is not on the Upper School clubs
  list and is not counted" (`src/data/clubCatalog.ts` ~L426). Global & Cultural Groups says
  "two global-awareness student groups" (`clubsPrograms/charlotte-christian.ts` ~L50).
- **Do not report:** the 1 vs 2 global-awareness groups, or the Compare `us-organizations` 23
  leaving Knights Nations out.
- **Why:** the club appears only in an undated article, not on the school's Upper School clubs
  list; the scope line reconciles the two cards.
- **Ruled:** by the user, 2026-11-20 (plan `consistency2`): not counted, scope line added.
- **Still a finding:** the scope line disappearing, the counts changing, or Knights Nations
  appearing on the school's Upper School clubs list.

### S6 — Carmel Christian's after-care Compare cell stays $245/mo (was CAR-R2)

- **Covers:** these values. Compare `aftercare-cost` 'carmel-christian' '$245/mo'
  (`metricValues.ts` ~L1984) and '≈$2,205/yr' beneath it (~L2001).
- **Do not report:** that a kindergartner cared for to 6:00 pays Young Cougars Club ($230/mo,
  1:15–3:00) plus After YCC ($245/mo), or that Covenant's cell on the same row stacks its
  JK/K sessions.
- **Why:** the cell reports the one flat rate for grades 1–8 after the 3:00 dismissal; the qual
  says so.
- **Ruled:** by the user, 2026-11-20 (plan `consistency2`): the cell stays; qual only.
- **Still a finding:** either rate changing, or the qual losing its grade 1–8 basis.

---

## Rule candidates already turned down

Step 5 must not re-propose these as new `check:consistency` rules.

- **A short-week camp price rule** (a shortened week must cost less). It needs a per-school
  registry of which weeks are short, which the summer data does not hold. Turned down in plan
  `consistency3`, 2026-11-21.
- **A "<Sport> leads with N commits" rule.** It would pass on the defect it was meant for
  (DD-S3: the count was right, only the named list was short). Turned down in plan
  `consistency3`, 2026-11-21.

---

## R8 groups already triaged as not a conflict

<!--
  Seeded 2026-11-21 from the round-3 re-scan's Part 3 (rescan3-*.md), with the user's approval.
  Groups tied to a still-open finding (DD teams 35/33 → DD-S1, GD seniors → GD-14,
  PD ensembles 6/4 → PD-S1) are deliberately left out until that finding ships.
-->

These **cover these values**. When a group's numbers are exactly the ones listed, skip it in
Part 3. When a group gains a number or one changes, triage **only the new or changed member**.
The parent appends newly verified "not a conflict" groups here through the round's plan.

| School | Noun | Numbers | Why it is not a conflict |
|---|---|---|---|
| Cannon | students | 300 / 195 / 40 / 3 / 9 | Athletes, AP testers, a 40-voice chorus, course-description numbers, "Grade 9 student" title |
| Cannon | seniors | 105 / 26 | 105 ÷ 4 counselors = 26 |
| Charlotte Country Day | teams | 72 / 55 | School's count vs chips; footnote names both bases |
| Charlotte Country Day | institutions | 1 / 150 | A merit detail vs reps hosted |
| Charlotte Country Day | seniors | 27 / 32 / 141 | Ratio, UNC admits, Class of 2026 |
| Charlotte Country Day | students | 12 / 15 / 10 / 20 / 17 / 1 | Trip groups, MUNCH 2026/2025, 1:1 support |
| Providence Day | teams | 66 / 56 | Footnote explains the basis |
| Providence Day | institutions | 13 / 8 / 150 / 383 / 249 | Different facts |
| Providence Day | seniors | 36 / 1 / 179 | 179 ÷ 5 = 35.8; "1" parses "~36:1" |
| Charlotte Latin | teams | 66 / 34 | School's count vs V/JV/MS chips; footnote explains |
| Charlotte Latin | camps | 232 / 169 | Offerings vs distinct titles, both labelled (totals are S2) |
| Charlotte Latin | seniors | 1 / 151 / 38 | "1" parses "~38:1"; 151 ÷ 4 = 38 |
| Charlotte Latin | students | 12 / 1500 / 20 / 22 / 5 | Trip caps, a 2025 group, arts "1,500+", a course description |
| Charlotte Latin | AP | 24 / 23 | Attributed split (LAT-1b); the Compare qual names both |
| Charlotte Catholic | AP | 22 / 2 | Subjects examined vs junior-year load |
| Charlotte Catholic | seniors | 336 / 56 | Seniors vs seniors per counselor |
| Charlotte Catholic | students | 1330 / 9 / 10 / 11 / 12 | Enrollment vs grade numbers |
| Charlotte Catholic | clubs | 76 / 15 / 23 | Category subtotals of 76 |
| Charlotte Christian | teams | 50 / 44 | School's "50+", footnoted against 44 chips |
| Charlotte Christian | AP | 22 / 21 | Attributed guide-list vs titles split (CC-5) |
| Covenant Day | camps | 29 / 20 | Marketed 29 vs 20 enumerable camps, attributed |
| Covenant Day | seniors | 1 / 85 | One dedicated counselor |
| Covenant Day | ensembles | 1 / 9 | "1" parses "sequential from grade 1" |
| Davidson Day | students | 565 / 13 / 10 / 18 / 500 / 4 / 1 | Enrollment, a dig, presenters, a session cap, program-wide, a group size, "1 course" |
| Davidson Day | institutions | 2 / 70 / 278 | Counselor tile (mis-parsed), a fair, the list |
| Gaston Day | teams | 19 / 7 / 5 / 20 | Headers 7 + 5 + 7 = 19; chips add volleyball JV |
| Gaston Day | camps | 1 / 27 | "2-4-1 Camp" parsed as "1 camp" |
| Gaston Day | institutions | 2 / 231 | A mis-parsed tile |
| Gaston Day | students | 11 / 510 | "grade-11 students" parsed as 11 |
| Gaston Day | ensembles | 2 / 3 | "drama from grade 2" parsed as 2 |
| Hickory Grove | teams | 30 / 28 / 27 | Attributed: athletics page, Wikipedia, coached-level chips |
| Hickory Grove | seniors | 1 / 34 | "≈34:1" parsed as 1 |
| Trinity Episcopal | teams | 4 / 2 / 4 / 10 | Headers sum to 10, matching the chips |
| Trinity Episcopal | camps | 21 / 38 / 8 / 13 / 3 | Price bands summing to 83, the row count |
| Trinity Episcopal | students | 5 / 419 | "K-5 students" parsed as 5; 419 is enrollment |
| Charlotte Prep | teams | 10 / 4 / 2 / 3 / 11 / 9 | 4 + 2 + 3 = 9, plus cheer = 10; Fast Facts 11 attributed on the tile |

Charlotte Christian's "students" group (15 values, Winterim trip group sizes) and Providence
Day's "students" group (497 … 1, trip and program sizes) are also not conflicts, but they are
too long to key by value. Triage only a member that is not a trip or program group size.
