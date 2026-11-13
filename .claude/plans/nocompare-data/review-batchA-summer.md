# Plain-language review — src/data/summer

Base `main` → working tree. Generated 2026-11-13 by `scripts/plain_review.mjs`. Grades are Flesch–Kincaid over units of ≥30 words (— below that). "hook" is what the PostToolUse hook would still report.

| School | Changed units |
|---|--:|
| cannon | 1 |
| carmel-christian | 0 |
| charlotte-catholic | 0 |
| charlotte-christian | 0 |
| charlotte-country-day | 3 |
| charlotte-latin | 0 |
| charlotte-prep | 0 |
| covenant-day | 1 |
| gaston-day | 0 |
| hickory-grove-christian | 0 |
| providence-day | 2 |
| trinity-episcopal | 0 |
| **Total** | **7** |

Guards: **5 FAILED**.

- (h) cannon:costPlanner.headline: ONLY marker lost (1→0)
- (h) charlotte-country-day:catalog.headline: ONLY marker lost (1→0)
- (n) charlotte-country-day:catalog.camps[0].desc: count words differ -five
- (h) charlotte-country-day:costPlanner.tiers[6].detail: ONLY marker lost (1→0)
- (n) providence-day:catalog.headline: count words differ -six

| # | school | path | before | after | words b→a | grade b→a | hook | notes |
|--:|---|---|---|---|---|---|---|---|
| 1 | cannon | `costPlanner.headline` | Camp Cannon is the only one of these programs that takes a deposit — 50% at registration, the balance due May 15. | Camp Cannon takes a deposit: 50% at registration, the balance due May 15. | 19→11 | —→— | pass |  |
| 2 | charlotte-country-day | `catalog.headline` | 132 priced camps across eight weeks, including a dedicated farm campus tier no other school here offers. | 132 priced camps across eight weeks, including a dedicated farm campus tier, which is rare. | 16→14 | —→— | pass |  |
| 3 | charlotte-country-day | `catalog.camps[0].desc` | On the school’s own farm — the tier that sets Country Day apart from the other five schools here. | On the school’s own farm, a rare setting for a summer camp. | 18→12 | —→— | pass | caps gone: Country, Day |
| 4 | charlotte-country-day | `costPlanner.tiers[6].detail` | The farm campus premium — a tier no other school here has. | The farm campus premium — a rare tier. | 11→7 | —→— | pass |  |
| 5 | covenant-day | `catalog.camps[19].desc` | A high-school week run against the guidance office’s calendar — the rare HS academic camp in this set. | A high-school week run against the guidance office’s calendar — a rare high-school academic camp. | 17→14 | —→— | pass | caps gone: HS |
| 6 | providence-day | `catalog.headline` | The largest published slate of the six schools — 170 priced camps across nine sessions, from a $255 four-day half-day to a $1,275 three-week musical production. | An unusually large published slate: 170 priced camps across nine sessions, from a $255 four-day half-day to a $1,275 three-week musical production. | 22→19 | —→— | pass |  |
| 7 | providence-day | `catalog.camps[1].desc` | The same camp on extended hours — the longest published camp day at any of these schools. | The same camp on extended hours — an unusually long published camp day. | 16→12 | —→— | pass |  |

## Guard failures by design

| at | guard line | removed span |
|---|---|---|
| `cannon:costPlanner.headline` | (h) ONLY marker lost (1→0) | "is **the only one** of these programs that takes a deposit" (row 30: delete) |
| `charlotte-country-day:catalog.headline` | (h) ONLY marker lost (1→0) | "tier **no other** school here offers" |
| `charlotte-country-day:catalog.camps[0].desc` | (n) count words differ -five | "apart from the other **five** schools here" (plan guard (n) note) |
| `charlotte-country-day:costPlanner.tiers[6].detail` | (h) ONLY marker lost (1→0) | "a tier **no other** school here has" |
| `providence-day:catalog.headline` | (n) count words differ -six | "The largest published slate of the **six** schools" |
