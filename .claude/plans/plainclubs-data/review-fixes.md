# Plain-language review — src/data/clubsPrograms + layers (src/data/clubClusters.ts, src/data/clubCatalog.ts)

Base `HEAD` → working tree. Generated 2026-11-10 by `scripts/plain_review.mjs`. Grades are Flesch–Kincaid over units of ≥30 words (— below that). "hook" is what the PostToolUse hook would still report.

| School | Changed units |
|---|--:|
| cannon | 2 |
| carmel-christian | 1 |
| charlotte-catholic | 1 |
| charlotte-christian | 0 |
| charlotte-country-day | 0 |
| charlotte-latin | 0 |
| charlotte-prep | 0 |
| covenant-day | 0 |
| davidson-day | 1 |
| gaston-day | 0 |
| hickory-grove-christian | 0 |
| providence-day | 0 |
| trinity-episcopal | 0 |
| **Total** | **5** |

Guards: **18 FAILED**.

- (n) cannon:service.programs[2].detail: count words differ +three +second +four
- (h) cannon:service.programs[2].detail: FIRST marker added (0→1)
- (d) cannon:service.programs[2].detail: quoted spans differ +"broken into four experiences."
- (b) charlotte-catholic:affinity.umbrella.detail: digit tokens differ +23 +76
- (f) covenant-day:honors.societies[0].division: non-prose leaf changed
- (f) covenant-day:honors.societies[1].division: non-prose leaf changed
- (f) covenant-day:honors.societies[2].division: non-prose leaf changed
- (f) covenant-day:honors.societies[5].division: non-prose leaf changed
- (k) covenant-day:honors.societies[0].division: changed but on no --allow worklist
- (k) covenant-day:honors.societies[1].division: changed but on no --allow worklist
- (k) covenant-day:honors.societies[2].division: changed but on no --allow worklist
- (k) covenant-day:honors.societies[5].division: changed but on no --allow worklist
- (n) davidson-day:service.footnote: count words differ -eight +seven
- (b) cannon:catalog.divisions[2].text: digit tokens differ -15,000 +10,000
- (h) cannon:catalog.divisions[2].text: ESTIMATE marker lost (1→0)
- (b) carmel-christian:clusters.rows[0].note: digit tokens differ +3.75 +2024
- (f) charlotte-catholic:catalog.clubs[53].name: non-prose leaf changed
- (k) charlotte-catholic:catalog.clubs[53].name: changed but on no --allow worklist

| # | school | path | before | after | words b→a | grade b→a | hook | notes |
|--:|---|---|---|---|---|---|---|---|
| 1 | cannon | `service.programs[2].detail` | A week-long hands-on program after winter break that "challenges students to think critically and practically, to serve others," in tracks for the local community, job skills, and trips and certifications. Service options include a Sea Island Habitat for Humanity trip. There is also a food-bank week on hunger in the community. | A week-long hands-on program after winter break that "challenges students to think critically and practically, to serve others," with service options such as a Sea Island Habitat for Humanity trip and a food-bank week on hunger and food waste. The page names three tracks: the First & Second Year Experience (local community), the Junior Experience (professional skills) and Trips and Certifications. The school says the week is "broken into four experiences." | 42→58 | 8.7→8.6 | pass |  |
| 2 | charlotte-catholic | `affinity.umbrella.detail` | The clubs directory sits under Campus Ministry, not student activities, and that shapes the mix. Faith-formation and service clubs are the largest blocks. The Campus Ministry Club itself runs monthly formation, fellowship and faith events. The club has altar server, sacristan and peer ministry roles. | The clubs directory sits under Campus Ministry, not student activities, and that shapes the mix. Service is the largest block, with 23 of the 76 clubs, and several clubs in other categories have a faith focus. The Campus Ministry Club itself runs monthly formation, fellowship and faith events. The club has altar server, sacristan and peer ministry roles. | 45→56 | 8.7→9.0 | pass |  |
| 3 | davidson-day | `service.footnote` | Eight community partners are named: Champions House of Care · The Kindness Closet · Food for Days · Beds for Kids · American Foreign Academic Research (AFAR) · the Davidson Public Library · the Davidson College Deliberative Citizenship Initiative. The school also describes an Upper School Community Engagement Council. No roster or founding year is published for it. | Seven community partners are named: Champions House of Care · The Kindness Closet · Food for Days · Beds for Kids · American Foreign Academic Research (AFAR) · the Davidson Public Library · the Davidson College Deliberative Citizenship Initiative. The school also describes an Upper School Community Engagement Council. No roster or founding year is published for it. | 52→52 | 5.5→5.7 | pass |  |
| 4 | cannon | `catalog.divisions[2].text` | Service runs deep: ~15,000 school-wide hours a year (not a graduation requirement), Senior Capstone charity projects, and a House Day of Service. But it runs through frameworks and traditions rather than standing clubs. Affinity work sits under the Diversity, Belongingness & Engagement (DBE) commitment. | Service runs deep: almost 10,000 Upper School service hours a year (not a graduation requirement), Senior Capstone charity projects, and a House Day of Service. But it runs through frameworks and traditions rather than standing clubs. Affinity work sits under the Diversity, Belongingness & Engagement (DBE) commitment. | 42→45 | 9.5→9.9 | pass |  |
| 5 | carmel-christian | `clusters.rows[0].note` | Academic recognition rather than competition. The High School runs the National Honor Society (application; weighted GPA 3.85), the National Beta Club (grades 10–12; GPA 3.50 with service hours) and a Spanish Honor Society. The Middle School has the National Junior Honor Society for 8th grade. These are the school’s academic distinctions in this area. | Academic recognition rather than competition. The High School runs the National Honor Society, which takes an application and a 3.85 weighted GPA (3.75 unweighted from the Class of 2024). It also runs the National Beta Club (grades 10–12; GPA 3.50 with service hours) and a Spanish Honor Society. The Middle School has the National Junior Honor Society for 8th grade. These are the school’s academic distinctions in this area. | 51→64 | 8.8→7.7 | pass |  |
