# Plain-language review — src/data/admissionsPrograms

Base `041fa929` → working tree. Generated 2026-11-13 by `scripts/plain_review.mjs`. Grades are Flesch–Kincaid over units of ≥30 words (— below that). "hook" is what the PostToolUse hook would still report.

| School | Changed units |
|---|--:|
| charlotte-christian | 1 |
| charlotte-country-day | 0 |
| charlotte-latin | 0 |
| charlotte-prep | 0 |
| covenant-day | 1 |
| hickory-grove-christian | 0 |
| providence-day | 0 |
| trinity-episcopal | 0 |
| **Total** | **2** |

Guards: all pass (paths, digits, URLs/emails, quotes, year spans, non-prose leaves, dates/times, money/percent/year tokens, markers, repeats, worklist-only edits, markdown fields).

| # | school | path | before | after | words b→a | grade b→a | hook | notes |
|--:|---|---|---|---|---|---|---|---|
| 1 | charlotte-christian | `guide.bands[0].steps[3].detail` | Uploaded to myCCS. "For families with two households, please upload a copy of your custody agreements" — a document the other Charlotte schools do not ask for up front. | Uploaded to myCCS. "For families with two households, please upload a copy of your custody agreements" — a document many schools do not ask for up front. | 16→14 | —→— | pass | caps gone: Charlotte |
| 2 | covenant-day | `guide.aid.text` | Aid is **need-based** and runs through **FACTS**, with **a new application required each year**. There is also one step you must complete first, and it is unique among the Charlotte schools. To be eligible for aid from Covenant Day, **families must first provide proof of application for the NC Opportunity Scholarship**. File the aid application **at the same time as the admissions application**, not after a decision. Enrollment carries a **$1,000 non-refundable deposit** per student, applied toward tuition. **The FACTS application fee and any reduced deposit for aid applicants are not published**. | Aid is **need-based** and runs through **FACTS**, with **a new application required each year**. There is also one unusual step you must complete first. To be eligible for aid from Covenant Day, **families must first provide proof of application for the NC Opportunity Scholarship**. File the aid application **at the same time as the admissions application**, not after a decision. Enrollment carries a **$1,000 non-refundable deposit** per student, applied toward tuition. **The FACTS application fee and any reduced deposit for aid applicants are not published**. | 91→84 | 9.5→9.4 | pass | caps gone: Charlotte; FIRST 1→2 |
