# Batch 1 ruling — no comparisons with other schools (Charlotte Latin)

User ruling, 2026-11-11, at the Batch 1 review: "school pages should be focused on the school and not trying to mention what others dont do." Both units are Charlotte Latin; the before-text is the Batch 1 English commit `82639cc3`.

Guard (p) fails here **by design**: the only removed tokens are the other schools, their care partners and "CISAA" (10 lines, listed below). No other guard fires: digits, dates, quotes, counts and every marker class are unchanged, so UNPUBLISHED ("Not published", "publishes no") and THIRDPARTY (SwimMAC) stay.

---

# Plain-language review — src/data/sportsPrograms

Base `82639cc3` → working tree. Generated 2026-11-11 by `scripts/plain_review.mjs`. Grades are Flesch–Kincaid over units of ≥30 words (— below that). "hook" is what the PostToolUse hook would still report.

| School | Changed units |
|---|--:|
| providence-day | 0 |
| charlotte-latin | 2 |
| **Total** | **2** |

Guards: **10 FAILED**.

- (p) charlotte-latin:facilities.care[4].text: name gone "CISAA"
- (p) charlotte-latin:facilities.careNote: name gone "Charlotte"
- (p) charlotte-latin:facilities.careNote: name gone "Country"
- (p) charlotte-latin:facilities.careNote: name gone "Day"
- (p) charlotte-latin:facilities.careNote: name gone "OrthoCarolina"
- (p) charlotte-latin:facilities.careNote: name gone "Cannon"
- (p) charlotte-latin:facilities.careNote: name gone "Novant"
- (p) charlotte-latin:facilities.careNote: name gone "Christian"
- (p) charlotte-latin:facilities.careNote: name gone "Atrium"
- (p) charlotte-latin:facilities.careNote: name gone "Providence"

| # | school | path | before | after | words b→a | grade b→a | hook | notes |
|--:|---|---|---|---|---|---|---|---|
| 1 | charlotte-latin | `facilities.care[4].text` | Not published as a policy document — a genuine gap, unlike its CISAA peers who publish theirs | Not published as a policy document — a genuine gap | 16→9 | —→— | pass | caps gone: CISAA |
| 2 | charlotte-latin | `facilities.careNote` | Worth asking about on a tour: Latin publishes no team doctor, hospital partner or concussion protocol. By contrast, Charlotte Country Day names OrthoCarolina, Cannon names Novant, Charlotte Christian names Atrium and Providence Day details a full in-house model. The pool is also owned and run by SwimMAC Carolina, a third-party club, not the school. | Worth asking about on a tour: Latin publishes no team doctor, hospital partner or concussion protocol. The pool is also owned and run by SwimMAC Carolina, a third-party club, not the school. | 54→32 | 9.8→8.7 | pass | caps gone: Charlotte, Country, Day, OrthoCarolina, Cannon, Novant, Christian, Atrium, Providence |
