# Plain-language review — src/data/clubsPrograms + layers (src/data/clubClusters.ts, src/data/clubCatalog.ts)

Base `HEAD` → working tree. Generated 2026-11-11 by `scripts/plain_review.mjs`. Grades are Flesch–Kincaid over units of ≥30 words (— below that). "hook" is what the PostToolUse hook would still report.

| School | Changed units |
|---|--:|
| cannon | 1 |
| carmel-christian | 1 |
| charlotte-catholic | 0 |
| charlotte-christian | 0 |
| charlotte-country-day | 0 |
| charlotte-latin | 0 |
| charlotte-prep | 0 |
| covenant-day | 29 |
| davidson-day | 22 |
| gaston-day | 0 |
| hickory-grove-christian | 39 |
| providence-day | 0 |
| trinity-episcopal | 0 |
| **Total** | **92** |

Guards: **284 FAILED**.

- (a) covenant-day: prose paths differ — removed [honors.societies[5].recognizes, honors.societies[5].feedsFrom, honors.flags[0].text] added []
- (f) covenant-day:honors.societies[2].name: non-prose leaf changed
- (f) covenant-day:honors.societies[2].division: non-prose leaf changed
- (f) covenant-day:honors.societies[3].name: non-prose leaf changed
- (f) covenant-day:honors.societies[3].division: non-prose leaf changed
- (f) covenant-day:honors.societies[4].name: non-prose leaf changed
- (f) covenant-day:honors.societies[4].division: non-prose leaf changed
- (f) covenant-day:honors.societies[5].name: non-prose leaf changed
- (f) covenant-day:honors.societies[5].division: non-prose leaf changed
- (f) covenant-day:honors.flags[0].kind: non-prose leaf changed
- (f) covenant-day:honors.sources[2].label: non-prose leaf changed
- (f) covenant-day:honors.sources[2].url: non-prose leaf changed
- (f) covenant-day:honors.sources[3].label: non-prose leaf changed
- (f) covenant-day:honors.sources[3].url: non-prose leaf changed
- (f) covenant-day:honors.sources[4].label: non-prose leaf added
- (f) covenant-day:honors.sources[4].url: non-prose leaf added
- (f) covenant-day:honors.sources[5].label: non-prose leaf added
- (f) covenant-day:honors.sources[5].url: non-prose leaf added
- (n) covenant-day:honors.headline: count words differ -six -two +five +three
- (h) covenant-day:honors.headline: VERIFIED marker lost (1→0)
- (h) covenant-day:honors.headline: ONLY marker lost (1→0)
- (n) covenant-day:honors.societies[0].feedsFrom: count words differ +four
- (h) covenant-day:honors.societies[0].feedsFrom: THIRDPARTY marker lost (1→0)
- (h) covenant-day:honors.societies[0].feedsFrom: VERIFIED marker lost (1→0)
- (h) covenant-day:honors.societies[0].feedsFrom: ONLY marker lost (1→0)
- (h) covenant-day:honors.societies[1].feedsFrom: THIRDPARTY marker lost (1→0)
- (h) covenant-day:honors.societies[2].recognizes: THEATRE marker added (0→1)
- (b) covenant-day:honors.societies[2].feedsFrom: digit tokens differ -1 -4
- (h) covenant-day:honors.societies[2].feedsFrom: THIRDPARTY marker lost (1→0)
- (h) covenant-day:honors.societies[2].feedsFrom: WIN marker added (0→1)
- (h) covenant-day:honors.societies[2].feedsFrom: VERIFIED marker added (0→1)
- (h) covenant-day:honors.societies[2].feedsFrom: THEATER marker added (0→1)
- (h) covenant-day:honors.societies[3].recognizes: THEATRE marker lost (1→0)
- (n) covenant-day:honors.societies[3].feedsFrom: count words differ +nine
- (h) covenant-day:honors.societies[3].feedsFrom: WIN marker lost (1→0)
- (h) covenant-day:honors.societies[3].feedsFrom: THEATER marker lost (1→0)
- (n) covenant-day:honors.societies[4].feedsFrom: count words differ -nine
- (h) covenant-day:honors.societies[4].feedsFrom: VERIFIED marker lost (1→0)
- (a) hickory-grove-christian: prose paths differ — removed [service.flags[0].text, honors.societies[1].recognizes, honors.societies[1].feedsFrom, honors.societies[2].recognizes, honors.societies[2].feedsFrom, honors.societies[3].recognizes, honors.societies[3].feedsFrom, honors.societies[4].recognizes, honors.societies[4].feedsFrom, honors.flags[0].text] added []
- (f) hickory-grove-christian:service.programs[0].name: non-prose leaf changed
- (f) hickory-grove-christian:service.programs[0].source.label: non-prose leaf changed
- (f) hickory-grove-christian:service.programs[0].source.url: non-prose leaf changed
- (f) hickory-grove-christian:service.programs[1].name: non-prose leaf changed
- (f) hickory-grove-christian:service.programs[1].source.label: non-prose leaf changed
- (f) hickory-grove-christian:service.programs[1].source.url: non-prose leaf changed
- (f) hickory-grove-christian:service.programs[2].name: non-prose leaf changed
- (f) hickory-grove-christian:service.programs[2].source.label: non-prose leaf changed
- (f) hickory-grove-christian:service.programs[2].source.url: non-prose leaf changed
- (f) hickory-grove-christian:service.flags[0].kind: non-prose leaf changed
- (f) hickory-grove-christian:service.sources[0].label: non-prose leaf changed
- (f) hickory-grove-christian:service.sources[0].url: non-prose leaf changed
- (f) hickory-grove-christian:service.sources[1].label: non-prose leaf changed
- (f) hickory-grove-christian:service.sources[1].url: non-prose leaf changed
- (f) hickory-grove-christian:honors.societies[0].name: non-prose leaf changed
- (f) hickory-grove-christian:honors.societies[1].name: non-prose leaf changed
- (f) hickory-grove-christian:honors.societies[1].division: non-prose leaf changed
- (f) hickory-grove-christian:honors.societies[2].name: non-prose leaf changed
- (f) hickory-grove-christian:honors.societies[2].division: non-prose leaf changed
- (f) hickory-grove-christian:honors.societies[3].name: non-prose leaf changed
- (f) hickory-grove-christian:honors.societies[3].division: non-prose leaf changed
- (f) hickory-grove-christian:honors.societies[4].name: non-prose leaf changed
- (f) hickory-grove-christian:honors.societies[4].division: non-prose leaf changed
- (f) hickory-grove-christian:honors.flags[0].kind: non-prose leaf changed
- (f) hickory-grove-christian:honors.sources[0].label: non-prose leaf changed
- (f) hickory-grove-christian:honors.sources[0].url: non-prose leaf changed
- (j) hickory-grove-christian: repeat group now holds 2 texts — honors.societies[0].feedsFrom, honors.societies[1].feedsFrom
- (n) hickory-grove-christian:service.subhead: count words differ -four
- (b) hickory-grove-christian:service.programs[0].value: digit tokens differ -4
- (h) hickory-grove-christian:service.programs[0].detail: VERIFIED marker lost (1→0)
- (h) hickory-grove-christian:service.programs[1].detail: VERIFIED marker lost (1→0)
- (b) hickory-grove-christian:service.programs[2].value: digit tokens differ -2
- (n) hickory-grove-christian:service.programs[2].detail: count words differ -two
- (h) hickory-grove-christian:service.programs[2].detail: THIRDPARTY marker lost (1→0)
- (b) hickory-grove-christian:service.footnote: digit tokens differ -27 -18 -9
- (h) hickory-grove-christian:service.footnote: REQUIRED marker added (0→1)
- (d) hickory-grove-christian:service.footnote: quoted spans differ -"Clubs and Organizations" -"Arts and Music"
- (n) hickory-grove-christian:honors.headline: count words differ -five -four
- (n) hickory-grove-christian:honors.subhead: count words differ -five
- (h) hickory-grove-christian:honors.subhead: ELECTED marker lost (1→0)
- (d) hickory-grove-christian:honors.subhead: quoted spans differ -"Honor Societies"
- (h) hickory-grove-christian:honors.societies[0].recognizes: THEATRE marker added (0→1)
- (h) hickory-grove-christian:honors.societies[0].feedsFrom: THEATRE marker added (0→1)
- (f) cannon:catalog.source: non-prose leaf changed
- (f) carmel-christian:clusters.rows[1].source: non-prose leaf changed
- (h) carmel-christian:clusters.rows[1].note: THIRDPARTY marker lost (1→0)
- (f) carmel-christian:catalog.source: non-prose leaf changed
- (a) covenant-day (clusters): prose paths differ — removed [clusters.rows[2].name, clusters.rows[2].oneLiner, clusters.rows[2].evidenceLabel, clusters.rows[2].note, clusters.rows[3].name, clusters.rows[3].oneLiner, clusters.rows[3].evidenceLabel, clusters.rows[3].note] added []
- (f) covenant-day:clusters.rows[1].source: non-prose leaf changed
- (f) covenant-day:clusters.rows[2].evidence: non-prose leaf changed
- (f) covenant-day:clusters.rows[2].source: non-prose leaf changed
- (f) covenant-day:clusters.rows[3].evidence: non-prose leaf changed
- (f) covenant-day:clusters.rows[3].source: non-prose leaf changed
- (h) covenant-day:clusters.rows[1].oneLiner: FIRST marker lost (1→0)
- (h) covenant-day:clusters.rows[1].evidenceLabel: THIRDPARTY marker lost (1→0)
- (h) covenant-day:clusters.rows[1].evidenceLabel: CLAIM marker added (0→1)
- (n) covenant-day:clusters.rows[1].note: count words differ -two
- (h) covenant-day:clusters.rows[1].note: REQUIRED marker added (0→1)
- (h) covenant-day:clusters.rows[1].note: UNPUBLISHED marker lost (1→0)
- (h) covenant-day:clusters.rows[1].note: NOTACLUB marker added (0→1)
- (h) covenant-day:clusters.rows[1].note: FIRST marker lost (1→0)
- (a) covenant-day (catalog): prose paths differ — removed [catalog.clubs[10].note, catalog.clubs[11].note, catalog.clubs[12].note, catalog.clubs[13].note] added [catalog.categories[3].short, catalog.categories[3].full, catalog.categories[4].short, catalog.categories[4].full]
- (f) covenant-day:catalog.categories[2].key: non-prose leaf changed
- (f) covenant-day:catalog.clubs[1].name: non-prose leaf changed
- (f) covenant-day:catalog.clubs[1].cat: non-prose leaf changed
- (f) covenant-day:catalog.clubs[2].name: non-prose leaf changed
- (f) covenant-day:catalog.clubs[2].cat: non-prose leaf changed
- (f) covenant-day:catalog.clubs[3].name: non-prose leaf changed
- (f) covenant-day:catalog.clubs[3].cat: non-prose leaf changed
- (f) covenant-day:catalog.clubs[4].name: non-prose leaf changed
- (f) covenant-day:catalog.clubs[4].cat: non-prose leaf changed
- (f) covenant-day:catalog.clubs[5].name: non-prose leaf changed
- (f) covenant-day:catalog.clubs[5].cat: non-prose leaf changed
- (f) covenant-day:catalog.clubs[6].name: non-prose leaf changed
- (f) covenant-day:catalog.clubs[6].cat: non-prose leaf changed
- (f) covenant-day:catalog.clubs[7].name: non-prose leaf changed
- (f) covenant-day:catalog.clubs[7].cat: non-prose leaf changed
- (f) covenant-day:catalog.clubs[8].name: non-prose leaf changed
- (f) covenant-day:catalog.clubs[8].cat: non-prose leaf changed
- (f) covenant-day:catalog.clubs[9].name: non-prose leaf changed
- (f) covenant-day:catalog.clubs[9].cat: non-prose leaf changed
- (f) covenant-day:catalog.clubs[10].name: non-prose leaf changed
- (f) covenant-day:catalog.clubs[10].cat: non-prose leaf changed
- (f) covenant-day:catalog.clubs[11].name: non-prose leaf changed
- (f) covenant-day:catalog.clubs[11].cat: non-prose leaf changed
- (f) covenant-day:catalog.clubs[12].name: non-prose leaf changed
- (f) covenant-day:catalog.clubs[12].cat: non-prose leaf changed
- (f) covenant-day:catalog.clubs[13].name: non-prose leaf changed
- (f) covenant-day:catalog.clubs[13].cat: non-prose leaf changed
- (f) covenant-day:catalog.source: non-prose leaf changed
- (f) covenant-day:catalog.categories[3].key: non-prose leaf added
- (f) covenant-day:catalog.categories[4].key: non-prose leaf added
- (h) covenant-day:catalog.clubs[4].note: THEATRE marker added (0→1)
- (n) covenant-day:catalog.divisions[0].text: count words differ -fifth +twice +twenty
- (h) covenant-day:catalog.divisions[0].text: FIRST marker lost (1→0)
- (b) covenant-day:catalog.divisions[1].text: digit tokens differ -525
- (h) covenant-day:catalog.divisions[1].text: THIRDPARTY marker lost (1→0)
- (h) covenant-day:catalog.divisions[1].text: THEATER marker lost (1→0)
- (a) davidson-day (clusters): prose paths differ — removed [clusters.rows[2].name, clusters.rows[2].oneLiner, clusters.rows[2].evidenceLabel, clusters.rows[2].note] added []
- (f) davidson-day:clusters.rows[0].evidence: non-prose leaf changed
- (f) davidson-day:clusters.rows[0].source: non-prose leaf changed
- (f) davidson-day:clusters.rows[1].source: non-prose leaf changed
- (f) davidson-day:clusters.rows[2].evidence: non-prose leaf changed
- (f) davidson-day:clusters.rows[2].source: non-prose leaf changed
- (h) davidson-day:clusters.verdict: UNPUBLISHED marker added (0→1)
- (h) davidson-day:clusters.verdict: RESULT marker lost (1→0)
- (h) davidson-day:clusters.verdict: FIRST marker lost (1→0)
- (b) davidson-day:clusters.rows[0].oneLiner: digit tokens differ +28 +25
- (h) davidson-day:clusters.rows[0].oneLiner: RESULT marker lost (1→0)
- (h) davidson-day:clusters.rows[0].oneLiner: FIRST marker lost (1→0)
- (h) davidson-day:clusters.rows[0].evidenceLabel: CLAIM marker added (0→1)
- (h) davidson-day:clusters.rows[0].evidenceLabel: VERIFIED marker lost (1→0)
- (b) davidson-day:clusters.rows[0].note: digit tokens differ +28 +2025
- (h) davidson-day:clusters.rows[0].note: UNPUBLISHED marker added (0→1)
- (h) davidson-day:clusters.rows[0].note: VERIFIED marker added (0→1)
- (h) davidson-day:clusters.rows[0].note: RESULT marker lost (2→0)
- (h) davidson-day:clusters.rows[0].note: FIRST marker lost (2→0)
- (b) davidson-day:clusters.rows[1].oneLiner: digit tokens differ -28 -25
- (b) davidson-day:clusters.rows[1].note: digit tokens differ -28 -2025
- (h) davidson-day:clusters.rows[1].note: UNPUBLISHED marker lost (1→0)
- (h) davidson-day:clusters.rows[1].note: VERIFIED marker lost (1→0)
- (a) davidson-day (catalog): prose paths differ — removed [catalog.clubs[4].note, catalog.clubs[5].note, catalog.clubs[6].note, catalog.clubs[7].note, catalog.clubs[8].note] added []
- (f) davidson-day:catalog.categories[0].key: non-prose leaf changed
- (f) davidson-day:catalog.categories[1].key: non-prose leaf changed
- (f) davidson-day:catalog.categories[2].key: non-prose leaf changed
- (f) davidson-day:catalog.clubs[0].name: non-prose leaf changed
- (f) davidson-day:catalog.clubs[0].cat: non-prose leaf changed
- (f) davidson-day:catalog.clubs[1].name: non-prose leaf changed
- (f) davidson-day:catalog.clubs[1].cat: non-prose leaf changed
- (f) davidson-day:catalog.clubs[2].name: non-prose leaf changed
- (f) davidson-day:catalog.clubs[2].cat: non-prose leaf changed
- (f) davidson-day:catalog.clubs[3].name: non-prose leaf changed
- (f) davidson-day:catalog.clubs[3].cat: non-prose leaf changed
- (f) davidson-day:catalog.clubs[4].name: non-prose leaf changed
- (f) davidson-day:catalog.clubs[4].cat: non-prose leaf changed
- (f) davidson-day:catalog.clubs[5].name: non-prose leaf changed
- (f) davidson-day:catalog.clubs[5].cat: non-prose leaf changed
- (f) davidson-day:catalog.clubs[6].name: non-prose leaf changed
- (f) davidson-day:catalog.clubs[6].cat: non-prose leaf changed
- (f) davidson-day:catalog.clubs[7].name: non-prose leaf changed
- (f) davidson-day:catalog.clubs[7].cat: non-prose leaf changed
- (f) davidson-day:catalog.clubs[8].name: non-prose leaf changed
- (f) davidson-day:catalog.clubs[8].cat: non-prose leaf changed
- (f) davidson-day:catalog.source: non-prose leaf changed
- (h) davidson-day:catalog.verdict: UNPUBLISHED marker added (0→1)
- (b) davidson-day:catalog.clubs[0].note: digit tokens differ +2020
- (d) davidson-day:catalog.clubs[2].note: quoted spans differ +“demonstrates a deep commitment to service and leadership”
- (b) davidson-day:catalog.clubs[3].note: digit tokens differ +28 +2025
- (a) hickory-grove-christian (clusters): entry removed
- (a) hickory-grove-christian (catalog): prose paths differ — removed [catalog.clubs[6].note, catalog.clubs[7].note, catalog.clubs[8].note, catalog.clubs[9].note, catalog.clubs[10].note, catalog.clubs[11].note, catalog.clubs[12].note, catalog.clubs[13].note, catalog.clubs[14].note, catalog.clubs[15].note, catalog.clubs[16].note, catalog.clubs[17].note, catalog.clubs[18].note, catalog.clubs[19].note, catalog.clubs[20].note, catalog.clubs[21].note, catalog.clubs[22].note, catalog.clubs[23].note, catalog.clubs[24].note, catalog.clubs[25].note, catalog.clubs[26].note] added []
- (f) hickory-grove-christian:catalog.categories[0].key: non-prose leaf changed
- (f) hickory-grove-christian:catalog.categories[1].key: non-prose leaf changed
- (f) hickory-grove-christian:catalog.categories[2].key: non-prose leaf changed
- (f) hickory-grove-christian:catalog.categories[3].key: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[0].name: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[0].cat: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[1].name: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[1].cat: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[2].name: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[2].cat: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[3].name: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[3].cat: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[4].name: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[4].cat: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[5].name: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[5].cat: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[6].name: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[6].cat: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[7].name: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[7].cat: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[8].name: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[8].cat: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[9].name: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[9].cat: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[10].name: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[10].cat: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[11].name: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[11].cat: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[12].name: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[12].cat: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[13].name: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[13].cat: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[14].name: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[14].cat: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[15].name: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[15].cat: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[16].name: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[16].cat: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[17].name: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[17].cat: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[18].name: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[18].cat: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[19].name: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[19].cat: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[20].name: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[20].cat: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[21].name: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[21].cat: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[22].name: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[22].cat: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[23].name: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[23].cat: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[24].name: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[24].cat: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[25].name: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[25].cat: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[26].name: non-prose leaf changed
- (f) hickory-grove-christian:catalog.clubs[26].cat: non-prose leaf changed
- (f) hickory-grove-christian:catalog.source: non-prose leaf changed
- (b) hickory-grove-christian:catalog.verdict: digit tokens differ -27
- (n) hickory-grove-christian:catalog.verdict: count words differ -five +six
- (h) hickory-grove-christian:catalog.verdict: UNPUBLISHED marker added (0→1)
- (h) hickory-grove-christian:catalog.verdict: THIRDPARTY marker lost (2→0)
- (h) hickory-grove-christian:catalog.verdictHint: UNPUBLISHED marker lost (1→0)
- (h) hickory-grove-christian:catalog.verdictHint: VERIFIED marker lost (1→0)
- (h) hickory-grove-christian:catalog.clubs[2].note: AUDITION marker added (0→1)
- (b) hickory-grove-christian:catalog.clubs[3].note: digit tokens differ +7 +8
- (h) hickory-grove-christian:catalog.clubs[5].note: THIRDPARTY marker lost (1→0)
- (h) hickory-grove-christian:catalog.clubs[5].note: THEATRE marker added (0→1)
- (h) hickory-grove-christian:catalog.clubs[5].note: ELECTED marker added (0→1)
- (h) hickory-grove-christian:catalog.divisions[0].label: UNPUBLISHED marker added (0→1)
- (b) hickory-grove-christian:catalog.divisions[0].text: digit tokens differ -27
- (n) hickory-grove-christian:catalog.divisions[0].text: count words differ -second
- (h) hickory-grove-christian:catalog.divisions[0].text: THIRDPARTY marker lost (1→0)
- (h) hickory-grove-christian:catalog.divisions[0].text: VERIFIED marker lost (2→0)
- (d) hickory-grove-christian:catalog.divisions[0].text: quoted spans differ +“time during the school day for student clubs to meet,”
- (h) hickory-grove-christian:catalog.divisions[0].tag: UNPUBLISHED marker added (0→1)
- (h) hickory-grove-christian:catalog.divisions[1].text: NOTACLUB marker lost (1→0)
- (j) repeat group now holds 2 texts — cannon:clusters.rows[1].evidenceLabel, charlotte-christian:clusters.rows[0].evidenceLabel, charlotte-country-day:clusters.rows[0].evidenceLabel, davidson-day:clusters.rows[0].evidenceLabel, gaston-day:clusters.rows[0].evidenceLabel, gaston-day:clusters.rows[1].evidenceLabel, providence-day:clusters.rows[0].evidenceLabel, trinity-episcopal:clusters.rows[0].evidenceLabel, trinity-episcopal:clusters.rows[1].evidenceLabel
- (j) repeat group now holds 2 texts — cannon:clusters.rows[2].evidenceLabel, cannon:clusters.rows[3].evidenceLabel, charlotte-latin:clusters.rows[2].evidenceLabel, charlotte-latin:clusters.rows[3].evidenceLabel, charlotte-latin:clusters.rows[4].evidenceLabel, covenant-day:clusters.rows[3].evidenceLabel, davidson-day:clusters.rows[1].evidenceLabel, davidson-day:clusters.rows[2].evidenceLabel
- (j) repeat group now holds 2 texts — charlotte-catholic:clusters.rows[2].name, covenant-day:clusters.rows[1].name, providence-day:clusters.rows[2].name
- (j) repeat group now holds 2 texts — covenant-day:clusters.rows[1].evidenceLabel, covenant-day:clusters.rows[2].evidenceLabel
- (j) repeat group now holds 2 texts — cannon:catalog.countNoun, carmel-christian:catalog.countNoun, gaston-day:catalog.countNoun, hickory-grove-christian:catalog.countNoun
- (j) repeat group now holds 2 texts — cannon:catalog.categories[2].full, covenant-day:catalog.clubs[13].note
- (j) repeat group now holds 2 texts — cannon:catalog.categories[3].short, cannon:catalog.categories[3].full, carmel-christian:catalog.categories[2].short, charlotte-catholic:catalog.categories[1].short, charlotte-catholic:catalog.categories[1].full, charlotte-country-day:catalog.categories[2].short, charlotte-country-day:catalog.categories[2].full, charlotte-latin:catalog.categories[0].short, charlotte-latin:catalog.categories[0].full, davidson-day:catalog.categories[2].short
- (j) repeat group now holds 2 texts — cannon:catalog.categories[6].short, davidson-day:catalog.categories[1].short, davidson-day:catalog.categories[1].full
- (j) repeat group now holds 2 texts — carmel-christian:catalog.categories[0].short, charlotte-christian:catalog.categories[1].short, covenant-day:catalog.categories[1].full, gaston-day:catalog.categories[4].short, hickory-grove-christian:catalog.categories[0].short
- (j) repeat group now holds 2 texts — carmel-christian:catalog.categories[0].full, charlotte-christian:catalog.categories[1].full, gaston-day:catalog.categories[4].full, hickory-grove-christian:catalog.categories[0].full
- (j) repeat group now holds 2 texts — charlotte-country-day:catalog.verdictHint, covenant-day:catalog.verdictHint, davidson-day:catalog.verdictHint
- (j) repeat group now holds 2 texts — charlotte-country-day:catalog.countNoun, davidson-day:catalog.countNoun, trinity-episcopal:catalog.countNoun
- (j) repeat group now holds 2 texts — charlotte-country-day:catalog.categories[1].short, covenant-day:catalog.categories[0].short, davidson-day:catalog.categories[0].short
- (j) repeat group now holds 2 texts — charlotte-country-day:catalog.categories[1].full, covenant-day:catalog.categories[0].full, davidson-day:catalog.categories[0].full
- (j) repeat group now holds 2 texts — covenant-day:catalog.divisions[1].label, davidson-day:catalog.divisions[0].label
- (j) repeat group now holds 2 texts — davidson-day:catalog.clubs[0].note, davidson-day:catalog.clubs[1].note
- (j) repeat group now holds 2 texts — hickory-grove-christian:catalog.clubs[1].note, providence-day:catalog.divisions[0].label

| # | school | path | before | after | words b→a | grade b→a | hook | notes |
|--:|---|---|---|---|---|---|---|---|
| 1 | covenant-day | `honors.headline` | Six documented societies — but only the two arts chapters are confirmed on the school’s own pages. | Five honor societies, each named on the school’s own pages, including three arts chapters. | 16→14 | —→— | pass |  |
| 2 | covenant-day | `honors.subhead` | The school publishes no honor-society page: divisions, induction criteria and sponsors are unstated for every chapter. | The school publishes no honor-society page, so induction criteria and sponsors are unstated for most chapters. | 16→16 | —→— | pass |  |
| 3 | covenant-day | `honors.societies[0].feedsFrom` | Third-party roster only — not confirmed on a school page | School news — juniors and seniors, chosen on its four pillars | 9→10 | —→— | pass |  |
| 4 | covenant-day | `honors.societies[1].feedsFrom` | Third-party roster; the visual-arts program it would sit atop is school-documented | Named as a co-curricular on the visual-arts page | 11→8 | —→— | pass |  |
| 5 | covenant-day | `honors.societies[2].recognizes` | Spanish-language achievement | Theatre participation and achievement | 2→4 | —→— | pass |  |
| 6 | covenant-day | `honors.societies[2].feedsFrom` | Third-party roster; Spanish runs 1–4 plus AP in the course matrix | School-confirmed — named on the theater page, atop the Blumey-winning program | 10→10 | —→— | pass | caps gone: AP |
| 7 | covenant-day | `honors.societies[3].recognizes` | Theatre participation and achievement | Music achievement plus service | 4→4 | —→— | pass |  |
| 8 | covenant-day | `honors.societies[3].feedsFrom` | School-confirmed — named on the theater page, atop the Blumey-winning program | School-confirmed — named on the music page, atop the nine-ensemble program | 10→10 | —→— | pass | caps gone: Blumey-winning |
| 9 | covenant-day | `honors.societies[4].recognizes` | Music achievement plus service | Academic achievement and service (national organization) | 4→6 | —→— | pass |  |
| 10 | covenant-day | `honors.societies[4].feedsFrom` | School-confirmed — named on the music page, atop the nine-ensemble program | Named on the service page — members start school-wide service projects | 10→10 | —→— | pass |  |
| 11 | hickory-grove-christian | `service.headline` | A faith-and-service spine built on international mission trips and a working food-pantry partnership — the service programs the school's own site confirms. | A missions-and-service program: a yearly senior mission trip, a high school Mission Week and a weekly food-pantry role. | 21→18 | —→— | pass |  |
| 12 | hickory-grove-christian | `service.subhead` | Service here runs through the church ministry rather than a single logged club. Its channels are mission trips to four countries, an aquaponics program (raising fish and plants together) that feeds a church food pantry, and named leadership programs. | Service here is built into school programs rather than a single logged club. The school’s own Missions & Service page names each program. | 39→22 | 9.6→— | pass |  |
| 13 | hickory-grove-christian | `service.programs[0].value` | 4 | Yearly | 0→1 | —→— | pass |  |
| 14 | hickory-grove-christian | `service.programs[0].valueLabel` | countries · international mission trips | senior trip · Dominican Republic | 4→4 | —→— | pass |  |
| 15 | hickory-grove-christian | `service.programs[0].detail` | The school names international outreach and mission trips to the Dominican Republic, Ecuador, Haiti and Kenya — the clearest published service commitment, corroborated on the school's own Academics page. | Seniors serve together each year on a mission trip to the Dominican Republic. While they are away, the rest of the high school serves the local community through Mission Week. | 28→30 | —→7.2 | pass | caps gone: Ecuador, Haiti, Kenya, Academics |
| 16 | hickory-grove-christian | `service.programs[1].value` | HGBC | Weekly | 1→1 | —→— | pass |  |
| 17 | hickory-grove-christian | `service.programs[1].valueLabel` | food pantry · via aquaponics | HGBC food pantry | 4→3 | —→— | pass |  |
| 18 | hickory-grove-christian | `service.programs[1].detail` | HGCS runs an aquaponics program that supplies the Hickory Grove Baptist Church food pantry — a standing, school-confirmed community-service channel rather than an opt-in club. | Spanish Immersion students serve as interpreters each week at the Hickory Grove Baptist Church food pantry, as the church’s pastors share the Gospel with the community. | 24→26 | —→— | pass |  |
| 19 | hickory-grove-christian | `service.programs[2].value` | 2 | Quarterly | 0→1 | —→— | pass |  |
| 20 | hickory-grove-christian | `service.programs[2].valueLabel` | named leadership programs | missions collection | 3→2 | —→— | pass |  |
| 21 | hickory-grove-christian | `service.programs[2].detail` | The aggregator roster names a Chick-fil-A Leadership Academy chapter and a Global Ambassadors program, alongside small-group discipleship; the school site confirms discipleship but not the two named programs individually. | Each quarter, the school family gives to support a local ministry or cause. The page names XChange, Operation Christmas Child and a Baby Bottle Drive among them. | 29→27 | —→— | pass | caps gone: Chick-fil-A, Leadership, Academy, Global, Ambassadors |
| 22 | hickory-grove-christian | `service.footnoteTitle` | The broader roster | Also on the page | 3→4 | —→— | pass |  |
| 23 | hickory-grove-christian | `service.footnote` | PrivateSchoolReview lists 27 non-sports organizations. They include interest clubs (Apologetics, Public Speaking, Spanish, International Culture, Venture, Spirit) and arts clubs (Art, Guitar, Ukulele, Fiber, Pep Band, Praise Band). The full list is on the Club Catalog card, which notes that it comes from a single site. In all, PrivateSchoolReview counts 18 "Clubs and Organizations" and 9 "Arts and Music". | Discipleship groups serve together on campus. For example, high schoolers make encouragement cards for elementary students. Student on Mission is a middle school course on how students can serve Charlotte. The Global Missions & Language Certificate requires a mission trip abroad. | 52→40 | 7.4→9.0 | pass | caps gone: Public, Speaking, Spanish, International, Culture, Venture, Spirit, Guitar, Ukulele, Fiber, Pep, Band, Praise, Club, Catalog, PrivateSchoolReview |
| 24 | hickory-grove-christian | `honors.headline` | Five honor societies span academics, science, journalism and social studies — from the middle-school NJHS to four high-school chapters. | One honor society is named on the school’s own pages: the International Thespian Society. | 18→14 | —→— | pass | caps gone: NJHS |
| 25 | hickory-grove-christian | `honors.subhead` | PrivateSchoolReview lists an explicit "Honor Societies" grouping of exactly these five; no induction dates, GPA thresholds, chapter names or advisor names are published anywhere. | The school publishes no honor-society page, and its site names no academic honor society. | 23→14 | —→— | pass | caps gone: GPA; UNPUBLISHED 1→2 |
| 26 | hickory-grove-christian | `honors.societies[0].recognizes` | Scholarship, leadership, service and character (NHS) | The honor society for high school theatre students | 6→8 | —→— | pass |  |
| 27 | hickory-grove-christian | `honors.societies[0].feedsFrom` | the classroom | theatre | 2→1 | —→— | pass |  |
| 28 | cannon | `catalog.clubs[12].note` | Flagship category of Upper School club life under the DBE framework; no named roster published (Black affinity groups cited in reviews) | Flagship category of Upper School club life under the DBE framework; no named roster published | 21→15 | —→— | pass |  |
| 29 | carmel-christian | `clusters.rows[1].note` | The handbook, the live site and third-party listing sites confirmed that none of the usual academic-competition clubs runs as a standing Upper School organization. Clubs are started by students through an application. So any such club would depend on students applying to start it in a given year. Chess appears only as an Extended-Day enrichment class. | The handbook and the live site confirmed that none of the usual academic-competition clubs runs as a standing Upper School organization. Clubs are started by students through an application. So any such club would depend on students applying to start it in a given year. Chess appears only as an Extended-Day enrichment class. | 56→53 | 8.4→7.8 | pass |  |
| 30 | covenant-day | `clusters.rows[1].name` | STEM clubs → | Academic signatures | 2→2 | —→— | pass | → 1→0 |
| 31 | covenant-day | `clusters.rows[1].oneLiner` | Robotics (First Lego League), Junior FLL, Sustainability Engineering | Senior Capstone Project, McKnight Oratory | 8→5 | —→— | pass | caps gone: Lego, League, Junior, FLL, Sustainability, Engineering |
| 32 | covenant-day | `clusters.rows[1].evidenceLabel` | Third-party roster | School-reported | 2→1 | —→— | pass |  |
| 33 | covenant-day | `clusters.rows[1].note` | First Lego League robotics at two levels plus a Sustainability Engineering club — the club expression of the school’s Restoration & Sustainability department. Competition results are not published. | The required Senior Capstone Project and the McKnight Oratory speaking event are the school’s named academic signatures. Both are milestones in the school program rather than clubs. This row lists them because they are where academic competition happens at this school. | 26→41 | —→8.4 | pass | caps gone: Lego, League, Sustainability, Engineering, Restoration |
| 34 | covenant-day | `catalog.verdict` | A documented floor of Upper School clubs and honor societies — the school publishes no directory, so this is what public sources confirm. | A documented floor of Upper School clubs and honor societies — the school publishes no directory, so this is what its own pages confirm. | 22→23 | —→— | pass |  |
| 35 | covenant-day | `catalog.categories[2].short` | Spirit | Service | 1→1 | —→— | pass |  |
| 36 | covenant-day | `catalog.categories[2].full` | Spirit / leadership | Service | 2→1 | —→— | pass |  |
| 37 | covenant-day | `catalog.clubs[1].note` | FLL competition robotics | Juniors and seniors, chosen for scholarship, leadership, service and character | 3→10 | —→— | pass |  |
| 38 | covenant-day | `catalog.clubs[2].note` | The R&S department’s club arm | Members start projects that get the whole high school giving back | 5→11 | —→— | pass | caps gone: R&S |
| 39 | covenant-day | `catalog.clubs[3].note` | Junior Classical League chapter | Visual-arts honor society | 4→3 | —→— | pass | caps gone: Classical, League |
| 40 | covenant-day | `catalog.clubs[4].note` | Language club | Theatre honor society | 2→3 | —→— | pass |  |
| 41 | covenant-day | `catalog.clubs[5].note` | Reading / literary club | Music honor society | 3→3 | —→— | pass |  |
| 42 | covenant-day | `catalog.clubs[6].note` | National academic honor + service organization | High school students turn used shipping containers into housing for teens on the Pine Ridge Reservation | 5→16 | —→— | pass |  |
| 43 | covenant-day | `catalog.clubs[7].note` | Scholarship, service, leadership, character | A co-curricular singing group | 4→4 | —→— | pass |  |
| 44 | covenant-day | `catalog.clubs[8].note` | Visual-arts achievement | The student spirit section | 2→4 | —→— | pass |  |
| 45 | covenant-day | `catalog.clubs[9].note` | Spanish-language achievement | Student leadership | 2→2 | —→— | pass |  |
| 46 | covenant-day | `catalog.divisions[0].text` | Junior First Lego League, the MS Board Game Club, the CDS Children’s Choir (grades 3–5), Goodness Gorillas (the 4th-grade service program), and the Kanuga fifth-grade retreat. | The Middle School Outreach Committee · Doulos Day, a middle school service day held twice a year · Goodness Gorillas, the 4th-grade service program at nearly twenty sites · the CDS Children’s Choir (grades 3–5). | 25→31 | —→4.2 | pass | caps gone: First, Lego, League, MS, Board, Game, Club, Kanuga |
| 47 | covenant-day | `catalog.divisions[1].label` | Beyond the club roster | Not counted here | 4→3 | —→— | pass |  |
| 48 | covenant-day | `catalog.divisions[1].text` | The third-party roster also lists paid enrichment (piano/guitar/voice lessons, painting), curricular ensembles (band, choir, theater, worship team), and boys volleyball — a club sport. Those are excluded from the count above. Restore525 runs as both a service program and a credit-bearing course. | The school’s curricular ensembles (Symphonic Band, High School Choir, and the High School and Middle School Worship Bands) are not counted as clubs. | 41→23 | 9.9→— | pass |  |
| 49 | davidson-day | `clusters.verdict` | A compact slate; Battle of the Books took regional first place. | No competitive club result is published; the school’s academic distinctions are its honor society and diploma programs. | 11→17 | —→— | pass | caps gone: Books |
| 50 | davidson-day | `clusters.rows[0].name` | Battle of the Books | Honors & distinctions → | 4→2 | —→— | pass | caps gone: Books; → 0→1 |
| 51 | davidson-day | `clusters.rows[0].oneLiner` | Middle School reading-quiz team — regional first place (documented) | National Honor Society (28 in ’25), Global Studies Diploma, Acclaim Scholars | 8→9 | —→— | pass | caps gone: School |
| 52 | davidson-day | `clusters.rows[0].evidenceLabel` | Verified — event | School-reported | 2→1 | —→— | pass |  |
| 53 | davidson-day | `clusters.rows[0].note` | A reading quiz competition. Davidson Day’s Middle School team is documented taking first place in a regional competition against several area schools. That first place is the school’s clearest competitive result in this area. | Davidson Day has a confirmed National Honor Society chapter (28 members, Class of 2025). It also has a Global Studies Diploma that recognizes research and international study, and the Acclaim Scholars merit program. Chapter details are not published. | 34→36 | 9.3→9.7 | pass | caps gone: Day’s, Middle, School |
| 54 | davidson-day | `clusters.rows[1].name` | Honors & distinctions → | Research showcase | 2→2 | —→— | pass | → 1→0 |
| 55 | davidson-day | `clusters.rows[1].oneLiner` | National Honor Society (28 in ’25), Global Studies Diploma, Acclaim Scholars | Davidson Day Scholars Research Conference (Upper School capstones) | 9→8 | —→— | pass | caps gone: Honor, Society, Global, Studies, Diploma, Acclaim |
| 56 | davidson-day | `clusters.rows[1].note` | Davidson Day has a confirmed National Honor Society chapter (28 members, Class of 2025). It also has a Global Studies Diploma that recognizes research and international study, and the Acclaim Scholars merit program. Chapter details are not published. | The venue where Global Studies Diploma seniors present capstone research; some students also present at a collegiate archaeology conference. | 36→19 | 9.7→— | pass | caps gone: Day, National, Honor, Society, Class, Acclaim, Scholars |
| 57 | davidson-day | `catalog.verdict` | A compact slate of academic, interest, and service clubs, alongside student life run through programs, councils, and traditions. | A short list of student councils and an honor society, alongside student life run through programs and traditions. The school publishes no club roster. | 18→24 | —→— | pass |  |
| 58 | davidson-day | `catalog.verdictHint` | Filter by category to see the clubs in each area. | Filter by category; each group is named on davidsonday.org. | 10→8 | —→— | pass |  |
| 59 | davidson-day | `catalog.countNoun` | clubs | school-named groups | 1→2 | —→— | pass |  |
| 60 | davidson-day | `catalog.categories[0].short` | Academic | Leadership | 1→1 | —→— | pass |  |
| 61 | davidson-day | `catalog.categories[0].full` | Academic / competition | Student leadership | 2→2 | —→— | pass |  |
| 62 | davidson-day | `catalog.categories[1].short` | Interest | Service | 1→1 | —→— | pass |  |
| 63 | davidson-day | `catalog.categories[1].full` | Interest | Service | 1→1 | —→— | pass |  |
| 64 | davidson-day | `catalog.categories[2].short` | Service | Honor | 1→1 | —→— | pass |  |
| 65 | davidson-day | `catalog.categories[2].full` | Service / environmental | Honor society | 2→2 | —→— | pass |  |
| 66 | davidson-day | `catalog.clubs[0].note` | Academic / competition club | Developed by students; started hosting monthly belonging forums in 2020 | 3→9 | —→— | pass |  |
| 67 | davidson-day | `catalog.clubs[1].note` | Academic / competition club | Upper School student leaders with a faculty sponsor | 3→8 | —→— | pass |  |
| 68 | davidson-day | `catalog.clubs[2].note` | Academic-competition club | The school says it “demonstrates a deep commitment to service and leadership” | 2→5 | —→— | pass |  |
| 69 | davidson-day | `catalog.clubs[3].note` | Strategy / interest club | 28 members in the Class of 2025 | 3→5 | —→— | pass |  |
| 70 | davidson-day | `catalog.divisions[0].text` | School-run structures alongside the clubs: AFAR archaeology field research · the Community Engagement Councils and Patriot Week service framework · the Student Diversity Council · National Honor Society · the Middle School Battle of the Books team · traditions like the House System and Patriot Pals. | School-run structures alongside these groups: AFAR archaeology field research · the Patriot Week service framework and Middle School Service Days · traditions like the House System and Patriot Pals. | 41→27 | 7.5→— | pass | caps gone: Community, Engagement, Councils, Student, Diversity, Council, National, Honor, Society, Battle, Books |
| 71 | hickory-grove-christian | `catalog.verdict` | 27 non-sports organizations across interest clubs, arts clubs and five honor societies — a broad roster, but one that rides entirely on a single third-party aggregator. | Six student groups named on the school’s own pages — the school publishes no clubs page or full list. | 24→18 | —→— | pass |  |
| 72 | hickory-grove-christian | `catalog.verdictHint` | The school publishes no clubs page; this list is from PrivateSchoolReview, with a subset confirmed on the school site. | Filter by category; each group is named on hgchristian.org. | 19→8 | —→— | pass | caps gone: PrivateSchoolReview |
| 73 | hickory-grove-christian | `catalog.countNoun` | named orgs | school-named groups | 2→2 | —→— | pass |  |
| 74 | hickory-grove-christian | `catalog.categories[0].short` | Honor societies | Faith & service | 2→2 | —→— | pass |  |
| 75 | hickory-grove-christian | `catalog.categories[0].full` | Honor society | Service / discipleship | 2→2 | —→— | pass |  |
| 76 | hickory-grove-christian | `catalog.categories[1].short` | Interest & academic | Worship & arts | 2→2 | —→— | pass |  |
| 77 | hickory-grove-christian | `catalog.categories[1].full` | Interest / academic club | Arts / music club | 3→3 | —→— | pass |  |
| 78 | hickory-grove-christian | `catalog.categories[2].short` | Faith & service | Media | 2→1 | —→— | pass |  |
| 79 | hickory-grove-christian | `catalog.categories[2].full` | Faith / service / leadership | Publications & media | 3→2 | —→— | pass |  |
| 80 | hickory-grove-christian | `catalog.categories[3].short` | Arts & music | Honor society | 2→2 | —→— | pass |  |
| 81 | hickory-grove-christian | `catalog.categories[3].full` | Arts / music club | Honor society | 3→2 | —→— | pass |  |
| 82 | hickory-grove-christian | `catalog.clubs[0].note` | High School — scholarship, leadership, service and character | High School — groups that serve together on campus, such as making encouragement cards for elementary students | 7→16 | —→— | pass |  |
| 83 | hickory-grove-christian | `catalog.clubs[1].note` | Middle School | Middle School — monthly grade-level gatherings that break into small discipleship groups | 2→11 | —→— | pass |  |
| 84 | hickory-grove-christian | `catalog.clubs[2].note` | Achievement in the sciences | High School — students audition, rehearse and help the worship pastors lead student-led chapel | 4→13 | —→— | pass |  |
| 85 | hickory-grove-christian | `catalog.clubs[3].note` | International high-school journalism honor society | Grades 7–8 — for students who want to use their musical gifts to lead others in worship | 5→15 | —→— | pass |  |
| 86 | hickory-grove-christian | `catalog.clubs[4].note` | National Social Studies Honor Society (juniors/seniors) | Produced by students: the annual yearbook and a weekly broadcast | 6→10 | —→— | pass | caps gone: Social, Studies, Honor, Society |
| 87 | hickory-grove-christian | `catalog.clubs[5].note` | Aggregator-listed; apologetics is taught school-wide | High School — eligible theatre students can be inducted | 5→8 | —→— | pass |  |
| 88 | hickory-grove-christian | `catalog.divisions[0].label` | Single-source roster | No published club list | 2→4 | —→— | pass |  |
| 89 | hickory-grove-christian | `catalog.divisions[0].text` | This 27-organization list comes entirely from PrivateSchoolReview. The school's own site publishes no clubs or activities page, and no second source lists these clubs. The school site confirms some of them one by one (Discipleship, Choir, Drama, Jazz Band). The rest rely on the third-party site alone. Some are national programs (HOSA, Chick-fil-A Leadership Academy, the honor societies) whose active HGCS chapter is not independently confirmed. | The school’s site has no clubs or activities page. Its High School page sets aside “time during the school day for student clubs to meet,” but no list of those clubs is published. | 66→24 | 8.0→— | pass | caps gone: PrivateSchoolReview, Choir, Drama, Jazz, Band, Chick-fil-A, Leadership, Academy, HGCS |
| 90 | hickory-grove-christian | `catalog.divisions[0].tag` | Single-source | Not published | 1→2 | —→— | pass |  |
| 91 | hickory-grove-christian | `catalog.divisions[1].label` | Faith & service beyond the roster | Missions & service | 5→2 | —→— | pass |  |
| 92 | hickory-grove-christian | `catalog.divisions[1].text` | The school's own site confirms international mission trips to the Dominican Republic, Ecuador, Haiti and Kenya. It also confirms an aquaponics program supplying the Hickory Grove Baptist Church food pantry. These service channels run through the church ministry rather than as listed clubs. | Seniors serve together each year on a mission trip to the Dominican Republic, while the rest of the high school serves locally during Mission Week. Spanish Immersion students interpret each week at the Hickory Grove Baptist Church food pantry. | 43→39 | 8.9→9.6 | pass | caps gone: Ecuador, Haiti, Kenya |
