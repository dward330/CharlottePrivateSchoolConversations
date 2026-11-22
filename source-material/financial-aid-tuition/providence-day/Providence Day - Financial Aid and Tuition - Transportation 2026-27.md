# Providence Day — Financial Aid and Tuition — Transportation 2026-27

The "2026-2027 Bus Transportation Schedule and Fares" table on Providence Day's Transportation
page (https://www.providenceday.org/around-campus/transportation), copied line for line on
November 22, 2026. The page says: "As of the 2026-27 school year, PD offers eight* different
route options, five days a week. Families have the ability to register for the service(s) that
best suit their needs for the school year." Fares are per student.

### Fares by service area, 2026–27

| Service area | Pick-up and drop-off | Round trip fare per student | One way fare per student |
|---|---|---|---|
| Myers Park | Pick-up at Myers Park Country Club parking lot, drop-off at Myers Park Presbyterian Church Outreach Center or Freedom Park · 7:20 a.m. · 3:30 p.m. / 3:40 p.m. | 1st Child: $1,830 · Siblings: $1,379 | 1st Child: $1,098 · Siblings: $827 |
| Dilworth | Covenant Presbyterian Church (parking lot at corner of Dilworth Road and Arosa Avenue) · 7:15 a.m. · 3:35 p.m. | 1st Child: $1,830 · Siblings: $1,379 | 1st Child: $1,098 · Siblings: $827 |
| Mint Museum (morning only) | Randolph Road; pick-up only, drop-off at Myers Park Presbyterian Church Outreach Center parking lot · 7:25 a.m. | 1st Child: $1,830 · Siblings: $1,379 | 1st Child: $1,098 · Siblings: $827 |
| Ballantyne | Ballantyne Country Club · 7:00 a.m. · 3:50 p.m. | 1st Child: $1,965 · Siblings: $1,507 | 1st Child: $1,179 · Siblings: $904 |
| Carmel | Church of Jesus Christ of Latter-day Saints, 5815 Carmel Road · 7:15 a.m. · 3:35 p.m. | 1st Child: $1,855 · Siblings: $1,384 | 1st Child: $1,113 · Siblings: $830 |
| Blakeney | 131 Main Restaurant parking lot · 7:00 a.m. · 3:50 p.m. | 1st Child: $1,965 · Siblings: $1,507 | 1st Child: $1,179 · Siblings: $904 |
| Stonecrest | Regal Cinemas · 7:10 a.m. · 3:40 p.m. | 1st Child: $1,965 · Siblings: $1,507 | 1st Child: $1,179 · Siblings: $904 |
| South Park | South Park Christian Church on Park S Dr. · 7:20 a.m. · 3:40 p.m. | 1st Child: $1,830 · Siblings: $1,379 | 1st Child: $1,098 · Siblings: $827 |
| FoxCroft | Foxcroft Swim/Racquet Club on Sedley Rd · 7:30 a.m. · 3:30 p.m. | 1st Child: $1,830 · Siblings: $1,379 | 1st Child: $1,098 · Siblings: $827 |

The page marks the South Park and Foxcroft route as new for 2026-27: "We are still working to
confirm sufficient interest from families".

## Method

Fetched 2026-11-22 with curl (HTTP 200) during plan `consistency3`. The deep-dive report
(24 Jul 2026) had recorded this page as still referring to 2023–2024, with the fare table not
rendering. Today the page carries the 2026-2027 table above and no 2023-2024 text. Range used
on the Financial Aid card: round trip, first child, $1,830–$1,965; siblings $1,379–$1,507.

### Re-verification 2026-11-22 (plan consistency4, self-scan)

- https://www.providenceday.org/around-campus/transportation (HTTP 200): "2026-2027 Bus Transportation Schedule and Fares". Round trip "1st Child: $1,830 Siblings: $1,379" up to "1st Child: $1,965 Siblings: $1,507". Unchanged.
- https://www.providenceday.org/admissions/tuition-and-financial-assistance (HTTP 200): "Approximately 21% of Providence Day School families receive some form of financial assistance." and "Additional fees apply for the 8th and 12th grade field trips, club travel, performing and musical arts competition and athletic tournament travel, P.E. uniforms, graphing calculators, tutoring services Extended Day or Clubhouse , and Transportation .".

### Re-verification 2026-11-22 (plan consistency4, implement)

- https://docs.google.com/document/d/1_5u6M_MQtSRbLpKPYFjKqSXZB2pAV3McqIaD2TFhJWE/export?format=txt (HTTP 200): "Annual Registration Fee: $80". The Beyond Tuition grid now carries it: seventeen items, eight priced, nine unpriced.
- https://www.providenceday.org/around-campus/transportation (HTTP 200): "1st Child: $1,830 Siblings: $1,379". Unchanged.
