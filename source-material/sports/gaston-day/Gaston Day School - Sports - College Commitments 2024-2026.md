# Gaston Day School — Sports — College Commitments (2024–2026)

> **Provenance:** Compiled by Claude Code on 2026-11-09 during `/athlete-commits gaston-day`.
> Every Gaston Day varsity roster on MaxPreps for 2023-24 through 2026-27 was read against
> the 18 HighSchoolOT per-sport recruiting trackers, RealGM's Gaston Day School page (read
> in Chrome), FieldLevel's Gaston Day baseball alumni page (Chrome) and each college's own
> roster. The method, the nulls and the unchecked sports are in `Gaston Day School - Sports -
> Varsity Roster Cross-Reference 2026.md`. This is the designated provenance file for the
> *Power 4 commits* and *Division I commits* Compare rows (`src/data/metricValues.ts`) and
> for a College Pipeline card in `src/data/sportsPrograms/gaston-day.ts`, **which does not
> exist yet**. Adding it is a new card under the UX-design gate.
>
> **Level classification is by hand:** Power 4 = SEC / Big Ten / ACC / Big 12 only. Counts
> are distinct athletes, and they are a documented minimum. Gaston Day publishes no
> all-sport signing list. Neither gastonday.org nor the athletics site
> (gastondayathletics.com, 7 news articles as of 2026-11-09) carries a signing-day post.
>
> **Standard applied (same as Cannon, Davidson Day, Covenant Day, Carmel Christian and
> Hickory Grove):** the card counts documented commitments to college athletics at any
> level. D2, D3, NAIA, junior college and other non-NCAA levels count. "Scholarship" is
> never claimed.
>
> **Graduate test:** an athlete counts for Gaston Day only if they finished high school
> there. Evidence is the athlete's senior season on the Gaston Day MaxPreps roster and the
> college roster's "High School" line. Every row below passes both.

## Sources
- MaxPreps Gaston Day rosters, 2023-24 → 2026-27 (21 sport pages × 4 seasons):
  https://www.maxpreps.com/nc/gastonia/gaston-day-spartans/
  - Volleyball 2023-24 (Sr.: Brown): https://www.maxpreps.com/nc/gastonia/gaston-day-spartans/volleyball/23-24/roster/
  - Volleyball 2024-25 (Sr.: Allen, Bing, Fabbri): https://www.maxpreps.com/nc/gastonia/gaston-day-spartans/volleyball/24-25/roster/
  - Boys basketball 2025-26 (Sr.: Fields, Kimrey, Simpson, Todd): https://www.maxpreps.com/nc/gastonia/gaston-day-spartans/basketball/25-26/roster/
- HighSchoolOT NC volleyball recruiting tracker (Megan Brown → Wofford, Class of 2024,
  Division I; Anne Bradley Bing → South Carolina, Class of 2025, Division I):
  https://www.highschoolot.com/story/north-carolina-high-school-volleyball-recruiting-tracker/21031942/
- Wofford volleyball, "Volleyball inks five signees" (2023-12-14; "Megan Brown DS Charlotte,
  N.C. / Gaston Day School"): https://woffordterriers.com/news/2023/12/14/volleyball-inks-five-signees.aspx
- Wofford volleyball, Megan Brown bio (Defensive Specialist, Junior, High School Gaston Day
  School, Hometown Charlotte, N.C.): https://woffordterriers.com/sports/womens-volleyball/roster/megan-brown/8731
- Wofford volleyball roster (6 Megan Brown, Jr., Charlotte, N.C., Gaston Day School):
  https://woffordterriers.com/sports/womens-volleyball/roster
- South Carolina volleyball, Anne Bradley Bing bio (#8, L, 5-8, Sophomore, Hometown
  Gastonia, N.C., High school Gaston Day School; "2025 (FRESHMAN)" season notes):
  https://gamecocksonline.com/sports/wvball/roster/player/anne-bradley-bing/
- The Daily Gamecock, 2025 South Carolina volleyball season preview (Bing in the freshman
  class): https://www.dailygamecock.com/article/2025/08/season-preview-south-carolina-volleyball-looks-for-growth-and-success-under-new-staff-sports-navare
- RealGM, Gaston Day School (NC) players, read in Chrome 2026-11-09 (Braylen Todd, HS Grad
  2026, College Johnson & Wales (NC)):
  https://basketball.realgm.com/highschool/teams/1873/Gaston-Day-School-NC
- Johnson & Wales University–Charlotte, 2026-27 men's basketball roster (21 Braylen Todd,
  Fr., Mount Holly, NC, Gaston Day): https://charlotte.jwuathletics.com/sports/mens-basketball/roster

## Class of 2026 — 1

| Athlete | Sport | College | Conf | Level | Confirmed by |
|---|---|---|---|---|---|
| Braylen Todd | Boys Basketball | Johnson & Wales (NC) | USCAA | non-NCAA (see note) | Johnson & Wales 2026-27 roster; RealGM |

**Level note for the plan:** Johnson & Wales University–Charlotte competes in the **USCAA**
(United States Collegiate Athletic Association), which is neither NCAA nor NAIA, and the
card's `CommitLevel` (`'P4' | 'D1' | 'D2' | 'D3' | 'NAIA'`) has no USCAA tier. The nearest
precedent is junior college, listed at `'D3'` with `conf: 'NJCAA'` and explained in
`rosterNote` (Covenant Day, Hickory Grove). On that precedent Todd goes at `'D3'` with
`conf: 'USCAA'`, which is a new conference string and therefore one new identifier unit per
locale. He is not a Division I count either way.

## Class of 2025 — 1

| Athlete | Sport | College | Conf | Level | Confirmed by |
|---|---|---|---|---|---|
| Anne Bradley Bing | Volleyball | South Carolina | SEC | **P4** | South Carolina bio (High school Gaston Day School); HighSchoolOT volleyball tracker |

## Class of 2024 — 1

| Athlete | Sport | College | Conf | Level | Confirmed by |
|---|---|---|---|---|---|
| Megan Brown | Volleyball | Wofford | Southern | D1 | Wofford signing release (2023-12-14) and roster; HighSchoolOT volleyball tracker |

Conference string: `'Southern'` (12 existing uses), not `'SoCon'` (3).

## Totals → app metric values

| Measure | Value | Athletes |
|---|---|---|
| Committed to college athletics, 2024–26 | **3** | Brown ’24, Bing ’25, Todd ’26 |
| NCAA Division I (includes P4) | **2** | Brown (Wofford), Bing (South Carolina) |
| Power 4 | **1** | Bing (South Carolina, SEC) |

- `p4-commits-2426` → `'1'` (was `null`)
- `d1-commits-2426` → `'2'` (was `null`)
- By sport: Volleyball 2, Boys Basketball 1.

## Class of 2027 (current seniors) — verbals, not counted
Kept in `Gaston Day - Sports - College Commitments Class of 2027.md`: Bree Smith (Swimming,
Stanford, ACC, P4), confirmed by the athletic director on the record to the Charlotte
Observer. Listed on the roster as a verbal and kept out of the funnel, the sport bars and
the two window rows. She is the whole of the `seniors-committed` value (`'1'`, unchanged).

## Excluded
- **Makoi Mabor Marier** (RealGM: HS Grad 2024, Gaston Day, college Mercer). **Fails the
  graduate test.** Recruiting coverage (Phenom Hoop Report, Prep Hoops) places him at
  **Gaston Christian**, and he is on no Gaston Day MaxPreps roster in any season. RealGM's
  school label is wrong.
- **Rilpuou Makoi** (RealGM: HS Grad 2025, Gaston Day, college Newberry). **Fails the
  graduate test.** He is on no Gaston Day MaxPreps roster in any season (the 2024-25 boys
  roster's one senior is a different player), and no second source ties him to Gaston Day.
- **Alexis Ibsen** (HighSchoolOT girls tennis tracker, Class of 2024, Division III, Emerson;
  the tracker spells it "Isben"). She passes the graduate test, since she is a senior on the
  2023-24 girls tennis roster. **Unverified:** she is absent from Emerson's women's tennis
  rosters for 2024-25 and 2025-26, and no second source was found. A reader-submitted
  tracker alone is a lead, not a row (the Cannon girls-lacrosse precedent).
