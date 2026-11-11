# Batch 5 fixes — comparisons with other schools (Gaston Day)

Applied under the user ruling at the Batch 1 review (2026-11-11, plan "Style rulings"): a school page says what **this** school publishes, does or has won, never how it compares with other schools. A comparison is rewritten as a statement about the school, or deleted when the school's own fact already carries the point (plan `nocompare` "How to remove").

| at | Comparison removed | Treatment | Why |
|---|---|---|---|
| `gaston-day:facilities.careNote` (off-worklist, `worklist-extra-batch5.json`) | "Every peer school on this roster publishes a venue list; Gaston Day does not" | **Rewrite as a fact about Gaston Day:** "Gaston Day publishes no venue list" | The parent point is that Gaston Day publishes no venue list, which the card's own `subhead` already states ("the school publishes no facility inventory"). The peer claim was also not true as written: Carmel, Davidson Day, Hickory Grove, Charlotte Prep and Trinity have no Facilities card. Guard (h) fires on UNPUBLISHED (0→1) by design: the before-text elided the verb ("does not"), the after-text names it ("publishes no"); same class of claim. |

The rest of the unit ("This card is deliberately short", "is not reachable") is rewritten in the Batch 5 wording pass, which runs against this commit.

Bookkeeping sweep (Step 2a): every hit is in the census table. In this batch: Carmel `pipeline.subhead` and `pipeline.rosterNote` ("researcher", T2), Carmel `honors.honors[1].text` ("unconfirmed", off-worklist), Carmel `coaching.worthKnowing` ("fetched", "deeper pass"), Gaston `offered.footnote` ("fetch"), Gaston `facilities.careNote` ("not reachable"), Trinity `coaching.featured[0].detail` ("should be carried"). Comparison scan: Gaston `offered.footnote` "every other sport shows V alone" and Gaston `record.didNotWin` "every other program" are within the school and stay.

Cross-school claims re-measured on the day: none in this batch besides the kept own-result ranking (Carmel `national.nil[0].text` "described as among the first Charlotte high-school graduates").

---

# Plain-language review — src/data/sportsPrograms

Base `main` → working tree. Generated 2026-11-11 by `scripts/plain_review.mjs`. Grades are Flesch–Kincaid over units of ≥30 words (— below that). "hook" is what the PostToolUse hook would still report.

| School | Changed units |
|---|--:|
| carmel-christian | 0 |
| gaston-day | 1 |
| hickory-grove-christian | 0 |
| trinity-episcopal | 0 |
| **Total** | **1** |

Guards: **1 FAILED**.

- (h) gaston-day:facilities.careNote: UNPUBLISHED marker added (0→1)

| # | school | path | before | after | words b→a | grade b→a | hook | notes |
|--:|---|---|---|---|---|---|---|---|
| 1 | gaston-day | `facilities.careNote` | This card is deliberately short. Every peer school on this roster publishes a venue list; Gaston Day does not, and the one document that would carry it (the Athletic Handbook) is not reachable. That is a publication gap, not an absence of facilities — a campus fielding 19 sports plainly has them. | This card is deliberately short. Gaston Day publishes no venue list, and the one document that would carry it (the Athletic Handbook) is not reachable. That is a publication gap, not an absence of facilities — a campus fielding 19 sports plainly has them. | 50→42 | 9.3→8.7 | pass |  |
