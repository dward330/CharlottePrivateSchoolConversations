# Plain-language review — course-offerings (src/data/courseOfferings.ts)

Base `HEAD` → working tree. Generated 2026-11-12 by `scripts/plain_review.mjs`. Grades are Flesch–Kincaid over units of ≥30 words (— below that). "hook" is what the PostToolUse hook would still report.

| School | Changed units |
|---|--:|
| covenant-day | 1 |
| hickory-grove-christian | 2 |
| gaston-day | 2 |
| trinity-episcopal | 0 |
| **Total** | **5** |

Guards: **4 FAILED**.

- (p) covenant-day:divisions[0].departments[7].courses[1].description: name new "ContainIt"
- (h) hickory-grove-christian:divisions[0].departments[10].courses[3].description: ONLY marker added (0→1)
- (h) gaston-day:divisions[1].departments[1].courses[4].description: UNPUBLISHED marker lost (1→0)
- (q) trinity-episcopal:divisions[0].departments[2].courses[0].tag: course-identity leaf changed

| # | school | path | before | after | words b→a | grade b→a | hook | notes |
|--:|---|---|---|---|---|---|---|---|
| 1 | covenant-day | `divisions[0].departments[7].courses[1].description` | The department’s course in which students transform used shipping containers into livable space. | The department’s ContainIt course; the school’s ContainIt team transforms used shipping containers into livable space. | 13→15 | —→— | pass |  |
| 2 | hickory-grove-christian | `divisions[0].departments[10].courses[3].description` | Lifting during a student’s designated sport season to gain strength, size and speed. | Lifting during a student’s designated sport season to gain strength, size and speed · it may be repeated, but only one credit counts toward graduation. | 13→24 | —→— | pass |  |
| 3 | hickory-grove-christian | `divisions[1].departments[3].courses[0].description` | Reveal Math Course 1: fraction and decimal division, negative numbers, ratios and rates, expressions and equations, area and volume, and statistical reasoning. | Reveal Math Course 1: fraction and decimal division, negative numbers, ratios and rates, expressions and equations, area, surface area and volume, and statistical reasoning. | 21→23 | —→— | pass |  |
| 4 | gaston-day | `divisions[0].departments[1].courses[2].description` | Continues the drama sequence that begins in second grade in the Lower School. | Continues the drama classes that begin as early as second grade in the Lower School. | 13→15 | —→— | pass |  |
| 5 | gaston-day | `divisions[1].departments[1].courses[4].description` | An Upper School mathematics course; the school publishes no description of it. | One of the Upper School mathematics courses in the school's curriculum table. | 12→12 | —→— | pass |  |

## Evidence (independent-review fact findings, Batch 3)

Applied against the committed fixes text (`c18faa90`), before the wording commit (the plaincourses `db076885` pattern). The reviewer re-checked a random 40 of the census `OK` verdicts and overturned 2 (D1, D2); F4 is a row the census passed whose sibling the census fixed; the ContainIt fix is tightened; the Trinity tag is research bookkeeping in a tag (Batch 1 ruling: a false site claim in a tag is fixed in its batch). Guard (q) fails on that one tag by design.

| School | Path | Finding | Before | After | Source |
|---|---|---|---|---|---|
| gaston-day | `divisions[0].departments[1].courses[2]` (Drama) | D1, NARROWS: "as early as" dropped | Continues the drama sequence that begins in second grade in the Lower School. | Continues the drama classes that begin as early as second grade in the Lower School. | the-arts record l.36: "Drama classes begin as early as the second grade." |
| gaston-day | `divisions[1].departments[1].courses[4]` (Advanced Functions and Models) | F5: the fix singled out one course as undescribed, though the school publishes descriptions for none | An Upper School mathematics course; the school publishes no description of it. | One of the Upper School mathematics courses in the school's curriculum table. | record l.200 ("Not published": a course-catalog PDF with course descriptions) |
| hickory-grove-christian | `divisions[0].departments[10].courses[3]` (In-Season Weight Training) | D2, NARROWS: a graduation-credit rule dropped | Lifting during a student’s designated sport season to gain strength, size and speed. | … · it may be repeated, but only one credit counts toward graduation. | US catalog l.512: "Students may take this class multiple times, but only one credit may be applied toward graduation requirements." |
| hickory-grove-christian | `divisions[1].departments[3].courses[0]` (6th Grade Math) | F4, NARROWS: "surface area" dropped (the 7th-grade sibling's census fix) | … expressions and equations, area and volume, and statistical reasoning. | … expressions and equations, area, surface area and volume, and statistical reasoning. | MS catalog l.214: "Our fourth unit will introduce area, surface area, and volume." |
| covenant-day | `divisions[0].departments[7].courses[1]` (ContainIt) | tightened: no text says the course is the team | The department’s course in which students transform used shipping containers into livable space. | The department’s ContainIt course; the school’s ContainIt team transforms used shipping containers into livable space. | clubs record l.66: "High school students on our ContainIt team … transform used shipping containers into livable space" |
| trinity-episcopal | `divisions[0].departments[2].courses[0].tag` (K–8 Technology Program) | research bookkeeping in a tag | Profile PDF only | K–8 | the title and LS record l.68 ("K-8 Technology Program") |
