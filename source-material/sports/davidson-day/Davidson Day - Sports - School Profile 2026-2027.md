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

## Verification (2026-11-05)

Done during `/implement ddprofile2`, against the association's official meet timing pages
and the NCISAA archive.

### Source URLs (verification)

- NCISAA Division 2 Track and Field Championships, Raleigh, 5/15–5/16/2026 (MeetPro by
  DirectAthletics, Mitchell Timing; the official results for the division Davidson Day ran in):
  http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_Division_2_Track_and_Field_Championships/index.html
  - Girls 200 Meters (event #4): http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_Division_2_Track_and_Field_Championships/results_15.html
  - Girls 100 Meters (event #2): http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_Division_2_Track_and_Field_Championships/results_14.html
  - Boys Shot Put (event #33): http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_Division_2_Track_and_Field_Championships/results_27.html
  - Boys Discus (event #35): http://results.tfmeetpro.com/Mitchell_Timing/NCISAA_Division_2_Track_and_Field_Championships/results_28.html
- NCISAA volleyball bracket, 2025–26: https://archives.ncisaa.org/index.php?sport=12&years=2025-2026
- NCISAA girls lacrosse bracket, 2025–26: https://archives.ncisaa.org/index.php?sport=19&years=2025-2026
- The NCISAA track archive page for 2025–26 (https://archives.ncisaa.org/index.php?sport=22&years=2025-2026)
  carries only logos and sponsor banners, with no results link. The timing site above was
  found through its start list in a web search.

### 200 m title: CONFIRMED

Girls 200 Meters final, Division 2: 1st, Alena Rollinson (JR), Davidson Day, 25.55 (wind
−0.3). She also had the fastest prelim (25.51). This is the **girls'** 200 meters, so the app
says that. The athlete is not named in app data (plan decision).

### 5 state runners-up: RECONCILED (2 team + 3 individual)

| # | Event | Result | Source |
|---|---|---|---|
| 1 | Volleyball (team), fall 2025 | state runner-up | Cup ledger `runnerUpYears: [… 2025]`; volleyball bracket |
| 2 | Girls lacrosse (team), spring 2026 | state runner-up | Cup ledger `runnerUpYears: [2026]`; girls lacrosse bracket |
| 3 | Girls 100 Meters, D2 final | 2nd, Alena Rollinson (JR), 12.60 | results_14 |
| 4 | Boys Shot Put, D2 final | 2nd, Parker Smith (SR), 45' 10" | results_27 |
| 5 | Boys Discus, D2 final | 2nd, Sean Hayes (SR), 146' 10" | results_28 |

That is exactly five, matching the profile. **Not checked:** individual swimming results
(the 2025–26 swim archive links only a program, not a results file) and any individual
tennis tournament. The winter Cup term total (37.5) is one basketball semifinal loss, so
Davidson Day scored no swim team points. A 2nd-place individual swim would make the count
six rather than five, so the fit is strong, though not proven to be complete.

### "37 individual state championships": not changed

The history page gives no years, so whether its 37 already includes the 2026 200 m title
cannot be determined. The app keeps the 37 and adds the 2025–26 title as a separate
sentence.

### Other Davidson Day finishes in the D2 meet (context, not used)

Girls 4×100 relay 5th (52.07); boys 1600 3rd (Haponik, 4:26.95); boys 3200 4th
(Haponik, 9:35.69); boys 800 5th (Haponik, 2:00.99); boys 300 m hurdles 8th (Carnaggio, 44.80).
