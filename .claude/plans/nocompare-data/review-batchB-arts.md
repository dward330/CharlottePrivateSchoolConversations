# Plain-language review — src/data/artsPrograms

Base `041fa929` → working tree. Generated 2026-11-13 by `scripts/plain_review.mjs`. Grades are Flesch–Kincaid over units of ≥30 words (— below that). "hook" is what the PostToolUse hook would still report.

| School | Changed units |
|---|--:|
| cannon | 0 |
| carmel-christian | 1 |
| charlotte-catholic | 0 |
| charlotte-christian | 0 |
| charlotte-country-day | 1 |
| charlotte-latin | 0 |
| charlotte-prep | 0 |
| covenant-day | 2 |
| davidson-day | 0 |
| gaston-day | 0 |
| hickory-grove-christian | 0 |
| providence-day | 0 |
| trinity-episcopal | 0 |
| **Total** | **4** |

Guards: **1 FAILED**.

- (h) covenant-day:ladder.subhead: ONLY marker lost (1→0)

| # | school | path | before | after | words b→a | grade b→a | hook | notes |
|--:|---|---|---|---|---|---|---|---|
| 1 | carmel-christian | `verdict.headline` | A theatre program with a genuine, recently converted Blumey win, sitting on a leaner music and visual-arts footprint than its regional peers. | A theatre program with a genuine, recently converted Blumey win, sitting on a leaner music and visual-arts footprint than many schools in the region. | 22→24 | —→— | pass |  |
| 2 | charlotte-country-day | `verdict.headline` | The deepest arts facilities of any school in this set, a dual AP-and-IB ceiling, and a statewide-honored theatre director — with a Blumey record that has cooled sharply. | Unusually deep arts facilities, a dual AP-and-IB ceiling, and a statewide-honored theatre director — with a Blumey record that has cooled sharply. | 27→21 | —→— | pass |  |
| 3 | covenant-day | `ladder.subhead` | One Fine Arts credit is required to graduate, and worship bands run at both middle and high school — a rung no other school here has. | One Fine Arts credit is required to graduate, and worship bands run at both middle and high school — a rung few schools have. | 25→23 | —→— | pass |  |
| 4 | covenant-day | `verdict.holdsUp[2].label` | The worship-music spine is unique here | A worship-music spine few schools have | 6→6 | —→— | pass |  |

## Guard failures by design

| at | guard line | removed span |
|---|---|---|
| `covenant-day:ladder.subhead` (row 70) | (h) ONLY marker lost (1→0) | "a rung no other school here has" → "a rung few schools have" |
