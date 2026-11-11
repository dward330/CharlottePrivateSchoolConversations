# Batch 1 ruling — no comparisons with other schools (Charlotte Latin, Providence Day)

User ruling, 2026-11-11, at the Batch 1 review: "school pages should be focused on the school and not trying to mention what others dont do." The before-text is the Batch 1 English commit `72d80b8e`. Latin's two comparisons were deleted, as the user asked of the CISAA line. Providence Day's `facilities.careNote`, found by the site-wide scan for plan `nocompare`, follows that plan's later approach (user suggestion: rewrite so no school is named, delete only as the fallback): "Many schools partner with a hospital system for sports medicine."

Guard (p) fails here **by design**: the only removed tokens are other schools and districts (CMS), their care partners, "Context" and "CISAA". No other guard fires: digits, dates, quotes, counts and every marker class are unchanged.

---

# Plain-language review — src/data/sportsPrograms

Base `72d80b8e` → working tree. Generated 2026-11-11 by `scripts/plain_review.mjs`. Grades are Flesch–Kincaid over units of ≥30 words (— below that). "hook" is what the PostToolUse hook would still report.

| School | Changed units |
|---|--:|
| providence-day | 1 |
| charlotte-latin | 2 |
| **Total** | **3** |

Guards: **18 FAILED**.

- (p) providence-day:facilities.careNote: name gone "Context"
- (p) providence-day:facilities.careNote: name gone "CMS"
- (p) providence-day:facilities.careNote: name gone "Atrium"
- (p) providence-day:facilities.careNote: name gone "Health"
- (p) providence-day:facilities.careNote: name gone "Charlotte"
- (p) providence-day:facilities.careNote: name gone "Country"
- (p) providence-day:facilities.careNote: name gone "Day"
- (p) providence-day:facilities.careNote: name gone "OrthoCarolina"
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
| 1 | providence-day | `facilities.careNote` | Context: CMS public schools partner with Atrium Health and Charlotte Country Day uses OrthoCarolina. PD’s fully in-house model is the differentiator to probe on a tour. Seating capacities are not published for any PD venue. | Many schools partner with a hospital system for sports medicine. PD’s fully in-house model is the main difference to ask about on a tour. Seating capacities are not published for any PD venue. | 35→33 | 7.5→7.3 | pass | caps gone: Atrium, Health, Charlotte, Country, Day, OrthoCarolina |
| 2 | charlotte-latin | `facilities.care[4].text` | Not published as a policy document — a genuine gap, unlike its CISAA peers who publish theirs | Not published as a policy document — a genuine gap | 16→9 | —→— | pass | caps gone: CISAA |
| 3 | charlotte-latin | `facilities.careNote` | Worth asking about on a tour: Latin publishes no team doctor, hospital partner or concussion protocol. By contrast, Charlotte Country Day names OrthoCarolina, Cannon names Novant, Charlotte Christian names Atrium and Providence Day details a full in-house model. The pool is also owned and run by SwimMAC Carolina, a third-party club, not the school. | Worth asking about on a tour: Latin publishes no team doctor, hospital partner or concussion protocol. The pool is also owned and run by SwimMAC Carolina, a third-party club, not the school. | 54→32 | 9.8→8.7 | pass | caps gone: Charlotte, Country, Day, OrthoCarolina, Cannon, Novant, Christian, Atrium, Providence |
