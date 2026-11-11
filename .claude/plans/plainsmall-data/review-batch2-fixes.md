# Plain-language review — src/data/internationalTravel

Base `main` → working tree. Generated 2026-11-11 by `scripts/plain_review.mjs`. Grades are Flesch–Kincaid over units of ≥30 words (— below that). "hook" is what the PostToolUse hook would still report.

| School | Changed units |
|---|--:|
| cannon | 1 |
| charlotte-christian | 0 |
| charlotte-country-day | 1 |
| charlotte-latin | 0 |
| davidson-day | 0 |
| providence-day | 0 |
| **Total** | **2** |

Guards: **1 FAILED**.

- (h) cannon:verdict.standsOut.summary: ONLY marker added (0→1)

| # | school | path | before | after | words b→a | grade b→a | hook | notes |
|--:|---|---|---|---|---|---|---|---|
| 1 | cannon | `verdict.standsOut.summary` | Cannon's global program is small and centred on the Upper School, but it offers something most Charlotte schools do not — a Global Studies Certificate with published requirements — and global language learning from Junior Kindergarten. | Cannon's global program is small and centered on the Upper School. But it offers a Global Studies Certificate with published requirements. Among the other schools on this site, only Providence Day and Davidson Day publish a global studies credential. Cannon also offers global language learning from Junior Kindergarten. | 34→48 | 16.4→8.5 | pass | caps gone: Charlotte |
| 2 | charlotte-country-day | `verdict.standsOut.summary` | Among Charlotte private schools, Country Day stands out for how early and how concretely travel begins — six published Middle School experiences from 6th grade — and for sister-school exchanges running since 1991. | Among the schools on this site, Country Day publishes the most Middle School travel: six experiences from 6th grade. Its sister-school exchanges have run since 1991. | 30→25 | 15.0→— | pass | caps gone: Charlotte |

## Evidence (why each claim changed)

Both are cross-school claims in a verdict summary, checked against the six
`src/data/internationalTravel/*.ts` files on 2026-11-11 (Content that must survive, item 14).
Both units were on the Batch 2 worklist. Each is written plainly here (≤30-word sentences,
hook pass), so it leaves the wording pass's worklist.

| Unit | Claim before | What the files say | Fix |
|---|---|---|---|
| cannon `verdict.standsOut.summary` | "something most Charlotte schools do not — a Global Studies Certificate with published requirements" | Of the six schools, three publish a global credential with its requirements: Cannon (certificate, `cannon.ts` ~l.230), Providence Day (Global Studies Diploma, `required` list, ~l.455), Davidson Day (Global Studies Diploma Distinction, `required` list, ~l.289). Latin and Charlotte Christian publish none (each asks whether one is planned); Country Day's credential is the IB Diploma. "Most … do not" is false on this site (3 of 6 lack one). | Names the two others: "Among the other schools on this site, only Providence Day and Davidson Day publish a global studies credential." Adds the ONLY marker (the guard (h) hit above, by design). Also "centred" → "centered". |
| charlotte-country-day `verdict.standsOut.summary` | "stands out for how early … travel begins … and for sister-school exchanges running since 1991" | **Early:** Latin's Global Studies travel also opens in 6th grade (`charlotte-latin.ts` ~l.588), and Cannon and PD list Middle School trips. **Since 1991:** Latin's sister-school network dates to 1989 (`charlotte-latin.ts` ~l.83, l.681). **What holds:** in each school's latest trip year, Country Day lists **6** Middle School trips (Canada, Peru, France, England, Costa Rica, Italy), Latin 2, Providence Day 1, Cannon 1; Davidson Day and Charlotte Christian none. | "Among the schools on this site, Country Day publishes the most Middle School travel: six experiences from 6th grade. Its sister-school exchanges have run since 1991." The "since 1991" fact stays, without the "stands out" comparison. |

**Checked and kept:** davidson-day `verdict.standsOut.summary` "unlike any other school's
here: its travel is archaeological research". No other file describes research travel;
Providence Day's one hit is a Greece trip theme ("Mythology · archaeology · philosophy").
