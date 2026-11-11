# Batch 3 fixes — comparisons with other schools (Charlotte Country Day, Cannon)

Applied under the user ruling at the Batch 1 review (2026-11-11, plan "Style rulings"): a school page says what **this** school publishes, does or has won, never how it compares with other schools. A comparison is rewritten as a hedged statement about the school that names no school and no site set, or deleted when even the hedge would overreach (plan `nocompare` "How to remove"). T9 (the care-model lists) is dropped, as in Batch 2.

| at | Comparison removed | Treatment | Why |
|---|---|---|---|
| `charlotte-country-day:facilities.subhead` (off-worklist, `worklist-extra-batch3.json`) | ", more than any other school in this comparison" | **Rewrite:** "…across two campuses, an unusually large staff for a high school." | The point (a large sports-medicine staff) stays, about CCD alone. The hedge is supported: most high schools that have an athletic trainer have one, so five named trainers is unusual by any measure, not only against this site. |
| `charlotte-country-day:pipeline.funnelNote` | "a share matched by no other school in this comparison and" | **Delete** | "Five commitments went to Ivy League programs, consistent with Country Day’s academic profile" already carries the parent point. A hedge ("an unusually high share") would rank CCD against schools we have not counted. Guard (h) ONLY fires on "no other" by design. |
| `charlotte-country-day:facilities.careNote` | "the differentiator among Charlotte private schools — Cannon uses Novant, Charlotte Christian uses Atrium, and Providence Day keeps care fully in-house" | **Rewrite:** "The OrthoCarolina partnership, which supplies the team physician, is the thing to probe on a tour." | The point (an orthopedic-practice partnership is how CCD's care is organized, and worth asking about) stays, about CCD alone, as PD's and Christian's careNotes now read. "supplies the team physician" is CCD's own `care[1]` (Dr. James E. Fleischli of OrthoCarolina). Guard (p) fires on the other schools' names and their partners by design. |
| `cannon:pipeline.funnelNote` | "Unlike its CISAA peers, " | **Delete** | "Cannon publishes no "alumni at the next level" roster" is the parent point. Naming a peer group is a comparison (ruling: "its CISAA peers"). Guard (p) fires on "CISAA" by design. |
| `cannon:facilities.careNote` | "Cannon and Charlotte Christian outsource to Novant and Atrium respectively, Charlotte Country Day uses OrthoCarolina, and Providence Day keeps care fully in-house" | **Rewrite:** "Note the model worth probing on a tour: Cannon outsources its athletic trainers and team physicians to Novant." | Cannon's own `care[0]` (2 trainers "provided through a partnership with Novant Health") and `care[1]` (2 Novant Health orthopedic surgeons) support it. Guard (p) fires on the other schools and partners by design. |

Kept (user, 2026-11-11, rankings of the school's own result): CCD `pipeline.rankedRecruits` and `honors.honors[1].text` "more than any other school in the division" (NCISAA swimming records).

Bookkeeping sweep (Step 2a): every hit is in the census table or its known false positives. In this batch: CCD `pipeline.rankedRecruits` ("classes reviewed"), `coaching.worthKnowing` ("this research"), `pipeline.rosterNote` (T2, off-worklist) and CCD `pipeline.funnelNote` "shown here" (site mechanics, known false positive). All are handled in the wording pass.

---

# Plain-language review — src/data/sportsPrograms

Base `main` → working tree. Generated 2026-11-11 by `scripts/plain_review.mjs`. Grades are Flesch–Kincaid over units of ≥30 words (— below that). "hook" is what the PostToolUse hook would still report.

| School | Changed units |
|---|--:|
| charlotte-country-day | 3 |
| cannon | 2 |
| **Total** | **5** |

Guards: **15 FAILED**.

- (h) charlotte-country-day:pipeline.funnelNote: ONLY marker lost (1→0)
- (p) charlotte-country-day:facilities.careNote: name gone "Charlotte"
- (p) charlotte-country-day:facilities.careNote: name gone "Cannon"
- (p) charlotte-country-day:facilities.careNote: name gone "Novant"
- (p) charlotte-country-day:facilities.careNote: name gone "Christian"
- (p) charlotte-country-day:facilities.careNote: name gone "Atrium"
- (p) charlotte-country-day:facilities.careNote: name gone "Providence"
- (p) charlotte-country-day:facilities.careNote: name gone "Day"
- (p) cannon:pipeline.funnelNote: name gone "CISAA"
- (p) cannon:facilities.careNote: name gone "Christian"
- (p) cannon:facilities.careNote: name gone "Atrium"
- (p) cannon:facilities.careNote: name gone "Country"
- (p) cannon:facilities.careNote: name gone "Day"
- (p) cannon:facilities.careNote: name gone "OrthoCarolina"
- (p) cannon:facilities.careNote: name gone "Providence"

| # | school | path | before | after | words b→a | grade b→a | hook | notes |
|--:|---|---|---|---|---|---|---|---|
| 1 | charlotte-country-day | `pipeline.funnelNote` | Swimming supplies five of the nine Power 4 commits — including all three from the class of 2026, to Stanford, Florida and Purdue — while track and cross country supply the most Division I commits, nine. Five commitments went to Ivy League programs, a share matched by no other school in this comparison and consistent with Country Day’s academic profile. The school’s count of 48 includes one signee in college cheer, which sits outside the NCAA divisions shown here. | Swimming supplies five of the nine Power 4 commits — including all three from the class of 2026, to Stanford, Florida and Purdue — while track and cross country supply the most Division I commits, nine. Five commitments went to Ivy League programs, consistent with Country Day’s academic profile. The school’s count of 48 includes one signee in college cheer, which sits outside the NCAA divisions shown here. | 74→63 | 11.6→10.4 | sentence of 32 words (max 30): "Swimming supplies five of the nine Power 4 commits — including all…" | grade 10.4 > 10 |
| 2 | charlotte-country-day | `facilities.subhead` | Five named certified athletic trainers across two campuses, more than any other school in this comparison. | Five named certified athletic trainers across two campuses, an unusually large staff for a high school. | 16→16 | —→— | pass |  |
| 3 | charlotte-country-day | `facilities.careNote` | The OrthoCarolina partnership is the differentiator among Charlotte private schools — Cannon uses Novant, Charlotte Christian uses Atrium, and Providence Day keeps care fully in-house. The combined Klein and Harris project totaled 77,737 sq ft and roughly $30.5M, funded by a $10M lead gift from the Klein family, the Dowd Foundation and two anonymous donors. | The OrthoCarolina partnership, which supplies the team physician, is the thing to probe on a tour. The combined Klein and Harris project totaled 77,737 sq ft and roughly $30.5M, funded by a $10M lead gift from the Klein family, the Dowd Foundation and two anonymous donors. | 53→45 | 13.4→10.0 | pass | caps gone: Charlotte, Novant, Christian, Atrium, Providence, Day |
| 4 | cannon | `pipeline.funnelNote` | Treat every figure on this card as a floor. Unlike its CISAA peers, Cannon publishes no "alumni at the next level" roster, so these names come from college rosters and recruiting services rather than from the school. Collegiate athlete is the standard here, not scholarship athlete: Hayes Galloway joined North Carolina as an early enrollee and later Clemson as a preferred walk-on, and Division III programs award no athletic scholarships. | Treat every figure on this card as a floor. Cannon publishes no "alumni at the next level" roster, so these names come from college rosters and recruiting services rather than from the school. Collegiate athlete is the standard here, not scholarship athlete: Hayes Galloway joined North Carolina as an early enrollee and later Clemson as a preferred walk-on, and Division III programs award no athletic scholarships. | 66→62 | 11.6→11.1 | sentence of 33 words (max 30): "Collegiate athlete is the standard here, not scholarship athlete: Hayes Galloway joined…" | caps gone: CISAA; grade 11.1 > 10 |
| 5 | cannon | `facilities.careNote` | Cannon is a clinical education site for UNC Charlotte’s Master’s in Athletic Training. Note the contrast worth probing on a tour: Cannon and Charlotte Christian outsource to Novant and Atrium respectively, Charlotte Country Day uses OrthoCarolina, and Providence Day keeps care fully in-house. Seating capacities are not published for any Cannon venue. | Cannon is a clinical education site for UNC Charlotte’s Master’s in Athletic Training. Note the model worth probing on a tour: Cannon outsources its athletic trainers and team physicians to Novant. Seating capacities are not published for any Cannon venue. | 52→40 | 10.9→9.4 | pass | caps gone: Christian, Atrium, Country, Day, OrthoCarolina, Providence |
