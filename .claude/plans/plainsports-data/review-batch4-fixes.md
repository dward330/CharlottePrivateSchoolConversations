# Batch 4 fixes — comparisons with other schools (Davidson Day)

Applied under the user ruling at the Batch 1 review (2026-11-11, plan "Style rulings"): a school page says what **this** school publishes, does or has won, never how it compares with other schools. A comparison is rewritten as a hedged statement about the school, or deleted when the school's own fact already carries the point or a hedge would overreach (plan `nocompare` "How to remove"). These replace the plan's planned DD fact fix, which would have kept a corrected comparison ("a higher share than at Cannon, Charlotte Country Day, Charlotte Latin or Providence Day").

| at | Comparison removed | Treatment | Why |
|---|---|---|---|
| `davidson-day:pipeline.realityCheck` | ", where larger peer schools convert closer to a third" | **Delete** | "The unusual thing here is still the ratio: thirteen of twenty-one documented commitments are Division I" carries the point (a 62% Division I share) about DD alone. The deleted clause was also false: of the schools on this site only Latin (35%) is near a third, and Christian (73%) and Catholic (72%) are higher than DD. Guard (n) fires on "third" by design. |
| `davidson-day:offered.subhead` (off-worklist, `worklist-extra-batch4.json`) | " — earlier than any other school in this comparison —" | **Delete** | "Athletics start in grade 5 here" is the parent point. A hedge ("earlier than at many schools") would rank DD against schools nobody counted. |

Re-measured on the day (Step 2a), from each `pipeline.funnel`: DD 13/21 = 62% Division I; the plan's table is unchanged.

Bookkeeping sweep (Step 2a): every hit is in the census table or its known false positives. In this batch: DD `offered.footnote` ("treated as authoritative"), DD `pipeline.rosterNote` (T2, off-worklist), Covenant `pipeline.rosterNote` ("researcher", T2 Covenant form), and Covenant `record.seasonDetail[0].text` "captured" (a sports verb, known false positive). Comparison scan: DD `pipeline.funnelNote` "every other row here" (within the card) and DD `record.seasonDetail[0].text` "the most of any 2A school in the NCISAA" (an own-result ranking, kept per the user) stay; opponent results (Oak Hill, Greensboro Day, Cannon, Christ School) stay.

---

# Plain-language review — src/data/sportsPrograms

Base `main` → working tree. Generated 2026-11-11 by `scripts/plain_review.mjs`. Grades are Flesch–Kincaid over units of ≥30 words (— below that). "hook" is what the PostToolUse hook would still report.

| School | Changed units |
|---|--:|
| davidson-day | 2 |
| covenant-day | 0 |
| **Total** | **2** |

Guards: **1 FAILED**.

- (n) davidson-day:pipeline.realityCheck: count words differ -third

| # | school | path | before | after | words b→a | grade b→a | hook | notes |
|--:|---|---|---|---|---|---|---|---|
| 1 | davidson-day | `offered.subhead` | Athletics start in grade 5 here — earlier than any other school in this comparison — and the school fields rowing on Lake Davidson. The school counts more than 200 Middle and Upper School athletes. | Athletics start in grade 5 here, and the school fields rowing on Lake Davidson. The school counts more than 200 Middle and Upper School athletes. | 31→23 | 6.8→— | pass |  |
| 2 | davidson-day | `pipeline.realityCheck` | The unusual thing here is still the ratio: thirteen of twenty-one documented commitments are Division I, where larger peer schools convert closer to a third. Basketball remains the engine, with seven college signees in three classes, but soccer is close behind with six, including a Big East defender at Villanova and an ACC signee at NC State. The Class of 2026 added two lacrosse players bound for Division II and two track athletes bound for Division III, so the experience for an athlete outside basketball now has examples of its own. | The unusual thing here is still the ratio: thirteen of twenty-one documented commitments are Division I. Basketball remains the engine, with seven college signees in three classes, but soccer is close behind with six, including a Big East defender at Villanova and an ACC signee at NC State. The Class of 2026 added two lacrosse players bound for Division II and two track athletes bound for Division III, so the experience for an athlete outside basketball now has examples of its own. | 90→81 | 13.3→17.4 | sentence of 48 words (max 30): "The unusual thing here is still the ratio: thirteen of twenty-one documented…"; sentence of 33 words (max 30): "The Class of 2026 added two lacrosse players bound for Division II…"; reading grade 17.4 (max 12; target 10) over 81 words | grade 17.4 > 10 |
