# Davidson Day School — Sports (School Profile 2026–2027)

## Method

- **Compiled by:** Claude Code, during `/plan ddprofile2`, 2026-11-04.
- **How:** page 3 of the school's 2026–27 School Profile, extracted with
  `pdftotext -layout` and checked against the full transcription made during `ddprofile`:
  `source-material/college-support/davidson-day/Davidson Day - College Support - School Profile 2026-2027.md`
  (it records the PDF's SHA-1, `9057ebb865e7593f5357e1ecf0929bcea145658e`, re-confirmed
  2026-11-04).
- **This is the school's own claim list.** Before any title or count reaches the page, check
  it against the NCISAA's own published results. A Davidson Day title list has over-claimed
  before: the history page's boys soccer 2022 and boys cross country 2022, both disproved by
  the brackets and the Cup term totals.

## Source URLs

- https://resources.finalsite.net/images/v1790855129/davidsondayorg/nlxzlvymosnampuadraw/2526CollegeProfile.pdf
  (School Profile 2026–2027, page 3: the "2025-2026 PATRIOTS Review" sidebar and the
  "Varsity Athletic Teams" list)
- NCISAA results archive, for verification: https://archives.ncisaa.org/index.php?sport=22&years=2025-2026
  (track and field; the page links out to result files rather than printing results inline)
- NCISAA boys tennis bracket, 2025–26: https://archives.ncisaa.org/index.php?sport=16&years=2025-2026

## "2025-2026 PATRIOTS Review" sidebar (verbatim figures)

| Printed figure | Printed label |
|---|---|
| **1** | NCISAA STATE CHAMPIONS — "Varsity Boys Tennis"; a named student, "Varsity Track & Field – 200 Meters" |
| **16** | NCISAA all-State Selections |
| **8** | Collegiate Athletes, Class of 2026 |
| **3** | Davidson Day Records Broken |
| **5** | NCISAA State Runners-Up |
| **200+** | Student Athletes (Middle & Upper School) |

The graphic prints "1" while naming two champions: a team (boys tennis) and an individual
event (the 200 meters). The individual is named on the profile. The app does not need the
name to report the title, so it is not carried into app data.

## "Varsity Athletic Teams" list (verbatim)

Baseball (B)\*\*, Basketball (B, G), Cheerleading (G), Crew (B,G), Cross Country (B, G),
Football (B)\*\*, Golf (B, G), Lacrosse (G), Soccer (B, G), Swim (B, G), Tennis (B, G),
Track & Field (B, G), Volleyball (G).

"\*\*In partnership with SouthLake Christian Academy"

## Against the app (planning-time comparison, 2026-11-04)

File: `src/data/sportsPrograms/davidson-day.ts`.

| Profile claim | App today | Status |
|---|---|---|
| Boys tennis 2025–26 state champions | `record` card: "Boys tennis is the only title survivor of 2025–26, its fourth straight"; Cup `titleYears` include 2026 | matches |
| Individual 200 m title, 2025–26 | `honors`: "37 individual state championships", with no year breakdown | **new; verify** against the NCISAA 2025–26 track results before use |
| 16 all-state selections, 2025–26 | `honors`: "More than 150 NCISAA All-State athletes all-time. Seven Patriots earned spring 2026 all-state honors…" | **new figure**; consistent (7 spring ⊂ 16 for the year) |
| 8 collegiate athletes, Class of 2026 | `pipeline` roster names 2 for '26 (Stevens, Peck); `funnelNote` says the school published "no equivalent for 2024 or 2026" | **new figure**; the school now states a Class of 2026 count without names |
| 5 NCISAA state runners-up, 2025–26 | Cup `runnerUpYears` show 2 for 2025–26 (volleyball 2025, girls lacrosse 2026) | **does not reconcile on team sports alone**; the other 3 may be individual events. Verify before use |
| 3 school records broken | no home | no card names records; not used |
| 200+ student athletes (MS & US) | `offered`: "~90% of grades 5–12 participate" | **new figure**; consistent |
| Football and baseball "in partnership with SouthLake Christian Academy" | `offered` lists Football (V, MS) and Baseball (V, MS) with no mention | **new fact** |
| Total enrollment 565 (page 2, "School Information") | "a 550-student school" (`pipeline.headline`), "about 550 students" (`honors.subhead`), "~550-student" (file header) | **update** to the profile figure |
