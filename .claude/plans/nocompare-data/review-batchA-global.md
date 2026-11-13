# Plain-language review — src/data/internationalTravel

Base `main` → working tree. Generated 2026-11-13 by `scripts/plain_review.mjs`. Grades are Flesch–Kincaid over units of ≥30 words (— below that). "hook" is what the PostToolUse hook would still report.

| School | Changed units |
|---|--:|
| cannon | 1 |
| charlotte-christian | 0 |
| charlotte-country-day | 1 |
| charlotte-latin | 0 |
| davidson-day | 1 |
| providence-day | 1 |
| **Total** | **4** |

Guards: **1 FAILED**.

- (h) cannon:verdict.standsOut.summary: ONLY marker lost (1→0)

| # | school | path | before | after | words b→a | grade b→a | hook | notes |
|--:|---|---|---|---|---|---|---|---|
| 1 | cannon | `verdict.standsOut.summary` | Cannon's global program is small and centered on the Upper School. But it offers a Global Studies Certificate with published requirements. Among the other schools on this site, only Providence Day and Davidson Day publish a global studies credential. Cannon also offers global language learning from Junior Kindergarten. | Cannon's global program is small and centered on the Upper School. But it offers a Global Studies Certificate with published requirements. Few schools publish a global studies credential. Cannon also offers global language learning from Junior Kindergarten. | 48→37 | 8.5→8.1 | pass | caps gone: Providence, Day, Davidson |
| 2 | charlotte-country-day | `verdict.standsOut.summary` | Among the schools on this site, Country Day publishes the most Middle School travel: six experiences from 6th grade. Its sister-school exchanges have run since 1991. | Country Day publishes an unusually full Middle School travel program: six experiences from 6th grade. Its sister-school exchanges have run since 1991. | 25→21 | —→— | pass |  |
| 3 | davidson-day | `verdict.standsOut.summary` | Davidson Day's global program is unlike any other school's here: its travel is archaeology research, not touring. Students dig with professionals in Spain, Portugal and Belize. They present their findings at university conferences. The digs and conferences are part of a two-year Upper School research distinction. | Davidson Day's global program is unusual: its travel is archaeology research, not touring. Students dig with professionals in Spain, Portugal and Belize. They present their findings at university conferences. The digs and conferences are part of a two-year Upper School research distinction. | 46→42 | 9.4→9.9 | pass |  |
| 4 | providence-day | `verdict.standsOut.summary` | Among Charlotte private schools, Providence Day stands out for its credential (the GSD), its Round Square network and the breadth of its reciprocal exchanges. | Providence Day stands out for its credential (the GSD), its Round Square network and the breadth of its reciprocal exchanges. | 24→20 | —→— | pass | caps gone: Charlotte |

## Guard failures by design

| at | guard line | removed span |
|---|---|---|
| `cannon:verdict.standsOut.summary` | (h) ONLY marker lost (1→0) | "Among the other schools on this site, **only** Providence Day and Davidson Day publish a global studies credential." |
