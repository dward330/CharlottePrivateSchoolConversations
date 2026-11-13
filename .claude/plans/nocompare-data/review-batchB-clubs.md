# Plain-language review — src/data/clubsPrograms + layers (src/data/clubClusters.ts, src/data/clubCatalog.ts)

Base `041fa929` → working tree. Generated 2026-11-13 by `scripts/plain_review.mjs`. Grades are Flesch–Kincaid over units of ≥30 words (— below that). "hook" is what the PostToolUse hook would still report.

| School | Changed units |
|---|--:|
| cannon | 1 |
| carmel-christian | 0 |
| charlotte-catholic | 2 |
| charlotte-christian | 0 |
| charlotte-country-day | 0 |
| charlotte-latin | 2 |
| charlotte-prep | 0 |
| covenant-day | 0 |
| davidson-day | 1 |
| gaston-day | 0 |
| hickory-grove-christian | 0 |
| providence-day | 1 |
| trinity-episcopal | 0 |
| **Total** | **7** |

Guards: all pass (paths, digits, URLs/emails, quotes, year spans, non-prose leaves, dates/times, money/percent/year tokens, markers, repeats across schools, worklist-only edits, markdown fields).

| # | school | path | before | after | words b→a | grade b→a | hook | notes |
|--:|---|---|---|---|---|---|---|---|
| 1 | cannon | `honors.headline` | Twelve honor societies — the widest span in this comparison, reaching social studies, mathematics, English, journalism, three arts and three world languages. | Twelve honor societies — an unusually wide span, reaching social studies, mathematics, English, journalism, three arts and three world languages. | 21→19 | —→— | pass |  |
| 2 | charlotte-catholic | `affinity.subhead` | The directory is one of the most transparent on this roster — most entries publish a written purpose, a staff advisor and where the club actually meets. | The directory is unusually transparent: most entries publish a written purpose, a staff advisor and where the club actually meets. | 26→20 | —→— | pass |  |
| 3 | charlotte-latin | `affinity.subhead` | Charlotte Latin publishes markedly less on this than its peers: no roster page, no counts, and no divisional breakout. | Charlotte Latin publishes markedly less on this than many schools: no roster page, no counts, and no divisional breakout. | 19→19 | —→— | pass |  |
| 4 | charlotte-latin | `honors.headline` | Two recognition societies plus a theatre society — and, uniquely in this comparison, published induction criteria and a published induction count. | Two recognition societies plus a theatre society — and, unusually, published induction criteria and a published induction count. | 20→17 | —→— | pass |  |
| 5 | davidson-day | `service.subhead` | The smallest school in this comparison publishes the least overall — but its civic programming is specific, externally validated and genuinely unusual. | A small school that publishes little overall — but its civic programming is specific, externally validated and genuinely unusual. | 21→18 | —→— | pass |  |
| 6 | providence-day | `affinity.subhead` | The deepest published affinity structure in this comparison set, built out steadily from 1995 onward — though the school’s own live site no longer lists it. | An unusually deep published affinity structure, built out steadily from 1995 onward — though the school’s own live site no longer lists it. | 24→21 | —→— | pass |  |
| 7 | charlotte-catholic | `clusters.rows[0].note` | Diocesan coverage records a North Carolina state runner-up finish and a Program Oral Interpretation state champion. That coverage is from 2017, older than any competitive result shipped for another school here, so no current standing can be claimed. The club meets in the CCHS Media Center under Mrs. Jennifer Taylor. | Diocesan coverage records a North Carolina state runner-up finish and a Program Oral Interpretation state champion. That coverage is from 2017, so no current standing can be claimed. The club meets in the CCHS Media Center under Mrs. Jennifer Taylor. | 49→39 | 9.6→7.9 | pass |  |
