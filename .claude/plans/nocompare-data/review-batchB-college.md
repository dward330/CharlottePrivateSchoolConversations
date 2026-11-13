# Plain-language review — src/data/collegeSupportPrograms

Base `041fa929` → working tree. Generated 2026-11-13 by `scripts/plain_review.mjs`. Grades are Flesch–Kincaid over units of ≥30 words (— below that). "hook" is what the PostToolUse hook would still report.

| School | Changed units |
|---|--:|
| cannon | 2 |
| carmel-christian | 0 |
| charlotte-catholic | 2 |
| charlotte-christian | 3 |
| charlotte-country-day | 1 |
| charlotte-latin | 0 |
| covenant-day | 5 |
| davidson-day | 1 |
| gaston-day | 2 |
| hickory-grove-christian | 0 |
| providence-day | 0 |
| **Total** | **16** |

Guards: **4 FAILED**.

- (h) charlotte-catholic:verdict.subhead: ONLY marker lost (1→0)
- (h) covenant-day:edge.headline: ONLY marker lost (1→0)
- (h) covenant-day:edge.levers[0].items[2]: ONLY marker lost (1→0)
- (h) davidson-day:verdict.subhead: BOUND marker added (0→1)

| # | school | path | before | after | words b→a | grade b→a | hook | notes |
|--:|---|---|---|---|---|---|---|---|
| 1 | cannon | `wholeClass.support[0].text` | **Michelle Donah**, Upper School Learning Specialist, and **Jennifer Ridenhour**, Upper School Dean of Academic Support. That is substantial staffing for 421 Upper School students. It is also some of the best-documented learning support of the schools on this site. | **Michelle Donah**, Upper School Learning Specialist, and **Jennifer Ridenhour**, Upper School Dean of Academic Support. That is substantial staffing for 421 Upper School students. It is also unusually well-documented learning support. | 38→30 | 8.0→9.9 | pass |  |
| 2 | cannon | `verdict.headline` | A stable program that is honest by design. Students keep the same counselor for all four years. It also has a published course-load ceiling, real research defences and a genuine list of where graduates enrolled. But it shares less about outcomes than its larger peers. | A stable program that is honest by design. Students keep the same counselor for all four years. It also has a published course-load ceiling, real research defences and a genuine list of where graduates enrolled. But it shares less about outcomes than many larger schools do. | 45→46 | 6.1→6.3 | pass |  |
| 3 | charlotte-catholic | `transcript.flags[0].text` | No AP Scholar tier counts are published. Instead, the profile gives results by exam (94% scoring 3+ across 1,184 exams in 2026). That tells you more. But it means the Scholar/Scholar with Distinction ledger other schools show cannot be built here. | No AP Scholar tier counts are published. Instead, the profile gives results by exam (94% scoring 3+ across 1,184 exams in 2026). That tells you more. But it means the Scholar/Scholar with Distinction ledger many school profiles show cannot be shown for this school. | 37→40 | 4.6→5.1 | pass |  |
| 4 | charlotte-catholic | `verdict.subhead` | The profile answers the questions a family actually asks — and the tuition structure answers one no other school on this roster raises. | The profile answers the questions a family actually asks — and the tuition structure answers one few schools raise. | 22→18 | —→— | pass |  |
| 5 | charlotte-christian | `counseling.timeline[2].note` | The most structured junior-year requirement in this set | An unusually structured junior-year requirement | 8→5 | —→— | pass |  |
| 6 | charlotte-christian | `verdict.headline` | A demanding, open transcript: required AP exams, a full published quintile table, and published AP exam and Scholar counts. It comes with the thinnest learning-support disclosure among the schools on this site. | A demanding, open transcript: required AP exams, a full published quintile table, and published AP exam and Scholar counts. It publishes unusually little about learning support. | 32→26 | 9.8→— | pass |  |
| 7 | charlotte-christian | `verdict.points[5].label` | A distinctive network the others do not have | A distinctive network few schools have | 8→6 | —→— | pass |  |
| 8 | charlotte-country-day | `wholeClass.support[2].text` | Uniquely among the schools here, the ERP explicitly **“assists in requesting accommodations with the College Board, ACT, and IB”** — the hand-off into admissions testing is stated rather than left implicit. | Unusually, the ERP explicitly **“assists in requesting accommodations with the College Board, ACT, and IB”** — the hand-off into admissions testing is stated rather than left implicit. | 20→16 | —→— | pass |  |
| 9 | covenant-day | `counseling.headline` | One dedicated college counseling director — in her 23rd year at the school — for 85 seniors, the heaviest caseload in this comparison. | One dedicated college counseling director — in her 23rd year at the school — for 85 seniors. | 20→14 | —→— | pass |  |
| 10 | covenant-day | `edge.headline` | The differentiators are depth stories: a department no other school has, a housing build on Pine Ridge, and college credit from the PCA’s own college. | The differentiators are depth stories: a department few schools have, a housing build on Pine Ridge, and college credit from the PCA’s own college. | 25→24 | —→— | pass |  |
| 11 | covenant-day | `edge.levers[0].items[0]` | A named high-school department with its own director (Dr. Rebeca Burnett) — unique among these schools | A named high-school department with its own director (Dr. Rebeca Burnett) — an unusual structure | 15→14 | —→— | pass |  |
| 12 | covenant-day | `edge.levers[0].items[2]` | The profile gives it a stand-alone descriptive block — a transcript line no other Charlotte-area applicant carries | The profile gives it a stand-alone descriptive block — a transcript line few applicants carry | 16→14 | —→— | pass | caps gone: Charlotte-area |
| 13 | covenant-day | `verdict.points[1].label` | The heaviest caseload in this comparison | A heavy caseload | 6→3 | —→— | pass |  |
| 14 | davidson-day | `verdict.subhead` | Every verdict point below is about what the school does. A family that evaluates schools on published outcome metrics will find less here than anywhere else in this set, which puts the burden of verification on the tour. | Every verdict point below is about what the school does. A family that evaluates schools on published outcome metrics will find less here than at most schools, which puts the burden of verification on the tour. | 38→36 | 9.5→8.8 | pass |  |
| 15 | gaston-day | `counseling.timeline[0].intensity` | Earliest start on the roster | Early start | 5→2 | —→— | pass |  |
| 16 | gaston-day | `verdict.points[2].text` | Course planning begins four years before applications, and the ~18:1 senior caseload is among the lowest on this roster. | Course planning begins four years before applications, and the ~18:1 senior caseload is unusually low. | 18→14 | —→— | pass |  |

## Guard failures by design

| at | guard line | removed span |
|---|---|---|
| `charlotte-catholic:verdict.subhead` (row 40) | (h) ONLY marker lost (1→0) | "no other school on this roster raises" → "few schools raise" |
| `covenant-day:edge.headline` (row 45) | (h) ONLY marker lost (1→0) | "a department no other school has" → "a department few schools have" |
| `covenant-day:edge.levers[0].items[2]` (row 82) | (h) ONLY marker lost (1→0) | "no other Charlotte-area applicant carries" → "few applicants carry" |
| `davidson-day:verdict.subhead` (row 48) | (h) BOUND marker added (0→1) | "than anywhere else in this set" → "than at most schools" (the added "most" is the plan's hedged replacement for the removed site-set superlative) |

## Independent review

Reviewer: independent subagent, 2026-11-13. Scope: every Batch B unit in `git diff -- src/` against `041fa929` (College Support 16, Admissions 2, Financial Aid 19, The Arts 4, Student Clubs 7, the last including `clubClusters.ts` row 78), checked against the plan's Rulings, "How to remove" and the refresh's edge cases. Batch A is not in scope. Plus a sweep of every Batch B data file for comparisons the census missed.

Units checked: 48

### Findings

| at | problem | fix |
|---|---|---|
| `charlotte-christian:sections[5].boxes[0].body` (financial-aid-report, row 84) | Meaning drift (3) and overclaim (6). The box title is "Four consecutive years recovered", so "the strongest tuition history … in this series" meant the most complete record. "A steady tuition history" made it a price-stability claim, and the uneven $850 / $1,500 / $950 steps that follow do not back that up. | **Delete** the opening sentence. The body now starts "Every band rose **$850** …". The title still makes the completeness point. Guard (n) "-four" still fails by design, because the token was inside the removed span. |
| `davidson-day:sections[5].boxes[0].body` (financial-aid-report, row 61) | Claims more than the evidence (8). "One of the steadiest … among the schools on this site" ranked the school against 13. "An unusually steady pattern" stretches that to schools at large. A near-flat ~4.5% a year is a common pattern. This is the "unusually low only because it is the lowest of 13" case in How to remove, item 2. | **Delete** the clause: "… a near-flat **~4.5% a year** since 2023–24. Early Childhood …". "Near-flat" already makes the point. |
| `providence-day:sections[0].figureNote` (financial-aid-report, row 52) | Claims more than the evidence (8) and drifts in meaning (3). The rewrite "Schools publish this kind of list less consistently than most other cost details" still ranks one item of the reports against the others, now as a claim about schools at large. | Rewritten to **"Many schools do not publish this kind of list."** This is the same hedged form as Covenant Day row 57 ("Many schools do not publish a list like this."). |

No missed comparison in rendered text, so `worklist-batchB.json` is unchanged. The three fixed units were already in it with their original English.

Checked and kept, with no change:

- `covenant-day:verdict.points[1].label` "A heavy caseload" (row 47). The adjective is backed in the same file: the unchanged verdict headline says "an unusually heavy counselor caseload", and the point's text says "a ratio a parent should ask about directly".
- `gaston-day:verdict.points[2].text` "~18:1 … is unusually low" (row 49). Even the file's stricter reading of 35:1 is low by any general standard, so the hedge holds without the roster.
- `davidson-day:service.subhead` "A small school that publishes little overall" (row 77). DD Arts calls it "a very small school", and DD College Support gives 50 seniors and 184 Upper Schoolers.
- `davidson-day:verdict.subhead` "less here than at most schools" (row 48). This is the plan's own hedge, the (h) BOUND failure listed above. It is hedged, not absolute.
- `carmel-christian:verdict.headline` (arts, row 71) "than many schools in the region". This is borderline: it is a regional set, but hedged, names no school and makes no absolute claim. The #82 ruling covers absolute Charlotte-area claims, so it is kept as the plan proposed.
- `charlotte-christian:sections[2].boxes[0].body` (aid, row 53) "Few schools make their own aid application depend on a state application." It is hedged. The old absolute was false on this site (Covenant Day row 58 has the same gate), and the new form is not.
- Gaston Day "Clarity is a widely used aid platform" (row 64). It is hedged and gives the parent the needed reassurance.
- From the sweep, all KEEP:
  - Implicit comparisons: CCD College Support "what most schools hide" and "almost any peer school"; Carmel College Support "several larger peers publish"; Christian College Support "most peer schools do not have"; Latin Arts "most peer schools"; Cannon Arts "Most schools’ arts pages are marketing"; DD Arts "more here than at a school that publishes everything".
  - Quotes: Prep Aid "the median of peer schools" (the board's own words); Trinity Clubs "the longest hallways in Charlotte".
  - Results that name award winners: Catholic Arts' list of Blumey winners.
  - Rosters inside one school: CCD's language roster, Cannon's staff and club roster, PD Arts "no longer on the roster", the Clubs source labels "(the roster)", and Club Catalog "this roster".
  - Covenant Day Clubs "the best-documented statewide result in this area" (this school's own area).
  - "this series' questions" (PD and Latin Aid).
  - PD's "no other school in the state holds", "the only member school in North Carolina" and "still the only one running it every summer" (own-result rankings with their source).
  - "The six" universities and "of the six" admit-rate labels, which count universities, not schools.
  - Code comments, such as Gaston Day Aid "which no other school here does" and "a first for this roster", which never render.
- Not acted on: Charlotte Latin Clubs `affinity.flags[0]` (kind `gap`) "so unlike its peers there are no rival numbers to reconcile". It is a REMOVE-shaped phrase, but Student Clubs `gap` flags never render (`HIDDEN_FLAG_KINDS` in `src/lib/flagVisibility.ts`), so it is outside this plan's rendered-text scope. Charlotte Catholic Clubs `count` flag "what this app reports" is also hidden. It is research bookkeeping, not a comparison.

### Per criterion

1. Comparison still present: no findings. No rewritten unit names a school, points at the site's set or names "its peers".
2. KEEP case wrongly removed: no findings. The quote in row 50 (custody agreements) and the bold quote in row 41 (ERP) are byte-identical.
3. Meaning drift: 2 findings (rows 84 and 52), both fixed.
4. Dropped hedge, condition or figure: no findings. Numeric tokens in the removed and added lines are identical as multisets. Hedge-word deltas all fall inside the removed comparisons.
5. `**` spans: no findings. There are 88 `**` markers before and after, and the bold spans are identical as a sorted set.
6. Overclaiming headline or label: 1 finding (row 84, "steady"), fixed. "Heavy", "small" and "unusually low" are backed by the files (see the kept list).
7. By-design guard failures: no findings. All 8 by-design guard failures are listed under "Guard failures by design" in the review files: College (h) ×3 and (h) BOUND ×1, Aid (h) ×2 and (n) "four" ×1, Arts (h) ×1. In each one the token sits inside the removed span, or is the plan's hedge.
8. Generalizing past the evidence, or an absolute where a hedge belongs: 1 finding (row 61), fixed. Row 52 is counted under 3. No rewrite uses "no school", "the only" or "the most".

Spacing and TS: the added lines have no doubled spaces and no em dash or `**` without a space beside it. All 19 changed files parse under esbuild. No new straight apostrophe appears inside a single-quoted string.

Re-run after the fixes (`--base 041fa929 --allow worklist-batchB.json --small-markers --check`):

- Aid (regenerated, with "Guard failures by design" re-appended and row 84's span updated): 19 units, hook pass 19/19, 3 by-design failures, exit 1.
- College: 16 units, 4 by-design failures, exit 1.
- Arts: 4 units, 1 by-design failure, exit 1.
- Admissions: 2 units, guards pass, exit 0.
- Clubs: 7 units, guards pass, exit 0.
- `check_plain_language.mjs --file src/data/financialAidReports.ts`: clean.

The College, Arts, Admissions and Clubs files are unchanged, so their review files were not regenerated. Their scratch re-runs match them apart from the guard section. No failure is new.
