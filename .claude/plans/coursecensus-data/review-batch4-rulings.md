# Plain-language review — course-offerings (src/data/courseOfferings.ts)

Base `HEAD` → working tree. Generated 2026-11-12 by `scripts/plain_review.mjs`. Grades are Flesch–Kincaid over units of ≥30 words (— below that). "hook" is what the PostToolUse hook would still report.

| School | Changed units |
|---|--:|
| charlotte-catholic | 2 |
| **Total** | **2** |

Guards: **8 FAILED**.

- (p) charlotte-catholic:divisions[0].departments[10].courses[2].description: name new "Advanced"
- (h) charlotte-catholic:divisions[0].departments[10].courses[2].description: ADVANCED marker added (0→1)
- (h) charlotte-catholic:divisions[0].departments[10].courses[2].description: PACE marker added (0→3)
- (p) charlotte-catholic:divisions[0].departments[10].courses[21].description: name new "Advanced"
- (h) charlotte-catholic:divisions[0].departments[10].courses[21].description: ADVANCED marker added (0→1)
- (h) charlotte-catholic:divisions[0].departments[10].courses[21].description: PACE marker added (0→3)
- (j) repeat group now holds 2 texts — charlotte-catholic:divisions[0].departments[10].courses[1].description, charlotte-catholic:divisions[0].departments[10].courses[2].description
- (j) repeat group now holds 2 texts — charlotte-catholic:divisions[0].departments[10].courses[20].description, charlotte-catholic:divisions[0].departments[10].courses[21].description

| # | school | path | before | after | words b→a | grade b→a | hook | notes |
|--:|---|---|---|---|---|---|---|---|
| 1 | charlotte-catholic | `divisions[0].departments[10].courses[2].description` | Builds on the foundation from French I and deepens understanding of reading, writing, listening and speaking. | Builds on the foundation from French I and deepens understanding of reading, writing, listening and speaking · at the Advanced level, the language used in class is more complex, the pace is faster and expectations are more demanding. | 16→37 | —→10.1 | pass | grade 10.1 > 10 |
| 2 | charlotte-catholic | `divisions[0].departments[10].courses[21].description` | Builds on the foundation from Spanish 1 and deepens understanding of reading, writing, listening and speaking. | Builds on the foundation from Spanish 1 and deepens understanding of reading, writing, listening and speaking · at the Advanced level, the language used in class is more complex, the pace is faster and expectations are more demanding. | 15→36 | —→10.4 | pass | grade 10.4 > 10 |

## Ruling and evidence

**User ruling at the Batch 4 review (2026-11-12): "For the one decision you have for me, lets go
with your recommendation."** The recommendation was to add the guide's Advanced-level sentence to
the two Advanced rows. It follows the Batch 2 precedent: a description that drops something a
parent would act on is treated as `NARROWS` and fixed. Without the sentence, Advanced French II and
Advanced Spanish II read exactly like French II and Spanish II.

| Path (`charlotte-catholic:divisions[0].`…) | Course | Guide quote (section E of the full-descriptions source file) |
|---|---|---|
| `departments[10].courses[2]` | Advanced French II — 426 | "In the Advanced level, the linguistic level of instruction and communication will be more complex, the curriculum will move at a faster pace, and students will be held to more rigorous expectations." |
| `departments[10].courses[21]` | Advanced Spanish II — 462 | The same sentence, word for word. |

- "the linguistic level of instruction and communication" becomes "the language used in class".
- "more rigorous expectations" becomes "more demanding" (the plaincourses "rigorous" register).
- The guide's three parts stay in order.
- The shared language-II clause is unchanged, so French II, German II and Spanish II are not
  touched.
- Guards: `--check` exits 1 on 8 hits, all by design. Each row gets (p) "Advanced", (h) ADVANCED
  and (h) PACE ×3: the guide's level and pace words, which are the point of the fix. Two (j) hits
  are each Advanced row no longer sharing its text with French II or Spanish II, also the point.
  No figure is added, and no name beyond "Advanced", which is already in the title.
- The rows come out at grade 10.1 and 10.4; both are added to the residuals.
