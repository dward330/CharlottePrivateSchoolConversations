# Batch 2 fixes — comparisons with other schools (Charlotte Christian, Charlotte Catholic)

Applied under the user ruling at the Batch 1 review (2026-11-11, plan "Style rulings"): a school page says what **this** school publishes, does or has won, never how it compares with other schools. A comparison is not fact-checked and kept; it is rewritten as a hedged statement about the school that names no school and no site set, or deleted when even the hedge would overreach (plan `nocompare` "How to remove"). These replace the plan's two planned Catholic fact fixes, which would have kept a corrected comparison.

| at | Comparison removed | Treatment | Why |
|---|---|---|---|
| `charlotte-catholic:national.scheduleNote` | "every other school in this app plays NCISAA, the independent-school association"; "cross-comparison with the rest of this roster" | **Rewrite:** "CCHS does not play in the NCISAA, the independent-school association many private schools join"; "cross-comparison with NCISAA results" | The parent point (CCHS is outside the independent-school association, so its results are set against public schools) stays, about CCHS alone. "many" is hedged: the NCISAA has about a hundred member schools, so "most" would overreach. The old claim was also false (Trinity Episcopal and Charlotte Prep play in the Queen City Conference). |
| `charlotte-catholic:offered.footnote` | ", unlike every PK/K–12 school on this roster" | **Delete** | No parent point beyond the contrast ("CCHS has no middle school … so no team carries an MS level" already says it). Also false as written (Gaston Day's card shows no MS chip). Guard (b) fires on "12" and (p) on "PK"/"K" by design. |
| `charlotte-catholic:facilities.subhead` (off-worklist, `worklist-extra-batch2.json`) | "— a different structure from the independent schools on this roster" | **Delete** | A hedged form ("a structure few schools use") would overreach: other schools on the site also work with hospital partners. The subhead still says what CCHS does. |
| `charlotte-christian:pipeline.funnelNote` | "the highest of any school in this comparison" | **Rewrite:** "At 73%, the Division I share of commitments is unusually high." | Keeps "At 73%, the Division I share …" (plan). A 73% Division I share is high by any measure (about a third of NCAA athletes compete in Division I), so the hedge is supported without the ranking. |
| `charlotte-christian:facilities.careNote` | "sits between Providence Day’s fully in-house staff and Cannon’s fully outsourced Novant arrangement" | **Rewrite:** "…plus an Atrium-provided third, a mix of in-house and hospital-provided care." | The point (a hybrid model, worth asking about) stays, said about Christian alone. T9 is dropped (ruling). Guard (p) fires on the other schools' names and Novant by design. |

Re-measured on the day (Step 2a): Christian 35/48 = 72.9%, Catholic 39/54 = 72.2% Division I. The ranking is no longer stated, so the thin margin no longer matters.

Bookkeeping sweep (Step 2a): every hit is in the census table or its known false positives. In this batch: Christian `pipeline.rosterNote` ("researcher", T2) and Catholic `pipeline.rosterNote` ("double-counted"), both fixed in the wording pass. Comparison scan: Christian `facilities.broadcast` "every other contest is free" (within-school), Catholic `pipeline.realityCheck` "the deepest pipeline here" (within-school: CCHS's own sports) and Catholic `pipeline.rosterNote` "(also in this app)" (a cross-reference explaining why Ridinger is not on CCD's card, not a comparison; becomes "(also on this site)" per the plan) are kept. Opponent results naming other schools (Christian `record.*`) are kept.

---

# Plain-language review — src/data/sportsPrograms

Base `main` → working tree. Generated 2026-11-11 by `scripts/plain_review.mjs`. Grades are Flesch–Kincaid over units of ≥30 words (— below that). "hook" is what the PostToolUse hook would still report.

| School | Changed units |
|---|--:|
| charlotte-christian | 2 |
| charlotte-catholic | 3 |
| **Total** | **5** |

Guards: **7 FAILED**.

- (p) charlotte-christian:facilities.careNote: name gone "Providence"
- (p) charlotte-christian:facilities.careNote: name gone "Day"
- (p) charlotte-christian:facilities.careNote: name gone "Cannon"
- (p) charlotte-christian:facilities.careNote: name gone "Novant"
- (b) charlotte-catholic:offered.footnote: digit tokens differ -12
- (p) charlotte-catholic:offered.footnote: name gone "PK"
- (p) charlotte-catholic:offered.footnote: name gone "K"

| # | school | path | before | after | words b→a | grade b→a | hook | notes |
|--:|---|---|---|---|---|---|---|---|
| 1 | charlotte-christian | `pipeline.funnelNote` | The classes of 2024 and 2025 come from the school’s published "Knights in College" roster; the Class of 2026, which that list does not yet include, is confirmed on the colleges’ own rosters and in the school’s announcements. At 73%, the Division I share of commitments is the highest of any school in this comparison. | The classes of 2024 and 2025 come from the school’s published "Knights in College" roster; the Class of 2026, which that list does not yet include, is confirmed on the colleges’ own rosters and in the school’s announcements. At 73%, the Division I share of commitments is unusually high. | 49→43 | 9.6→8.7 | sentence of 33 words (max 30): "The classes of 2024 and 2025 come from the school’s published Q…" |  |
| 2 | charlotte-christian | `facilities.careNote` | The hybrid model is the thing to probe on a tour: two employed trainers plus an Atrium-provided third sits between Providence Day’s fully in-house staff and Cannon’s fully outsourced Novant arrangement. Seating capacities are not published for any Charlotte Christian venue. | The hybrid model is the thing to probe on a tour: two employed trainers plus an Atrium-provided third, a mix of in-house and hospital-provided care. Seating capacities are not published for any Charlotte Christian venue. | 41→35 | 11.4→9.4 | pass | caps gone: Providence, Day’s, Cannon’s, Novant |
| 3 | charlotte-catholic | `offered.footnote` | The 20 sports and their names are exactly as the school lists them on its All Sports page — it publishes no gender split for Soccer, Golf, Tennis, Basketball or Lacrosse even though it fields both boys’ and girls’ teams in each, and it groups nothing by season. The season grouping above follows the standard NCHSAA calendar; the school itself publishes the list flat. Level splits are indicative for the same reason: the individual sport pages are navigation boilerplate carrying no rosters or schedules. CCHS has no middle school — it is a 9–12 school — so no team carries an MS level, unlike every PK/K–12 school on this roster. | The 20 sports and their names are exactly as the school lists them on its All Sports page — it publishes no gender split for Soccer, Golf, Tennis, Basketball or Lacrosse even though it fields both boys’ and girls’ teams in each, and it groups nothing by season. The season grouping above follows the standard NCHSAA calendar; the school itself publishes the list flat. Level splits are indicative for the same reason: the individual sport pages are navigation boilerplate carrying no rosters or schedules. CCHS has no middle school — it is a 9–12 school — so no team carries an MS level. | 105→98 | 11.4→10.6 | sentence of 46 words (max 30): "The 20 sports and their names are exactly as the school lists…" | caps gone: PK; grade 10.6 > 10 |
| 4 | charlotte-catholic | `facilities.subhead` | The care model is outsourced to a hospital system rather than run in house — a different structure from the independent schools on this roster. | The care model is outsourced to a hospital system rather than run in house. | 24→14 | —→— | pass |  |
| 5 | charlotte-catholic | `national.scheduleNote` | This is the real differentiator for a recruiting family: every other school in this app plays NCISAA, the independent-school association. A CCHS athlete’s record, rankings and championships are set against North Carolina’s public schools, which is a larger and differently-shaped competitive field — and it makes cross-comparison with the rest of this roster imprecise in both directions. | This is the real differentiator for a recruiting family: CCHS does not play in the NCISAA, the independent-school association many private schools join. A CCHS athlete’s record, rankings and championships are set against North Carolina’s public schools, which is a larger and differently-shaped competitive field — and it makes cross-comparison with NCISAA results imprecise in both directions. | 56→56 | 16.4→16.4 | sentence of 33 words (max 30): "A CCHS athlete’s record, rankings and championships are set against North Carolina’s…"; reading grade 16.4 (max 12; target 10) over 56 words | grade 16.4 > 10 |
