# Providence Day — Sports — Varsity Roster Cross-Reference (2026)

> **Provenance:** Written by Claude Code on 2026-11-08 at the end of the `/athlete-commits`
> graduate refresh for Providence Day (classes of 2024–2026, every varsity sport). It records
> the method, which sources were read, what each sport's sweep found and — kept apart — what
> could not be retrieved, so the next pass does not redo it. The verified rows live in
> `Providence Day - Sports - College Commitments 2024-2026.md`; the current senior class in
> `… - College Commitments Class of 2027.md`.
>
> **Window check:** today is 2026-11-08 → current senior class 2027, most recently graduated
> class 2026, the Compare keys end in 2026 (`…-2426`) → **no roll due.**
>
> **Headline result:** the school's "Alumni at the Next Level" list is complete for this
> window. 86 names on the list, 86 rows on the card, and no commitment database, tracker,
> college roster or newspaper roundup produced a 2024–26 graduate the list lacks. The
> refresh converts "a documented minimum" into a **confirmed floor**: 39 Division I rows
> verified one by one on the colleges' own pages, with five corrections (two name spellings,
> one class year, one college, one set of card figures) and three transfers for the note.

## 1. Sources read

| Source | How | Result |
|---|---|---|
| School's "Alumni at the Next Level" list — https://www.pdschargers.com/more/honors-hall-of-fame-wells-fargo-cup/ | curl (rSchoolToday CMS, server-rendered); 486 entries parsed, 86 in 2024–26 | Source of record; card mirrors it 1:1 |
| MaxPreps season rosters — `maxpreps.com/nc/charlotte/providence-day-chargers/<sport>/<yy-yy>/roster/` (path form) | curl, 21 sport slugs × 4 seasons (23-24 … 26-27) = 84 pages | Seniors per season (below); grades missing for several sports (§4) |
| HighSchoolOT recruiting trackers — hub https://www.highschoolot.com/story/recruiting-tracker-see-where-nc-s-high-school-athletes-are-committed-to-play/21296096/ | curl; all 19 per-sport trackers + 3 "building the fence" + 3 out-of-state pages | Every PD hit already on the card except Jaida McGrew (ruled out, graduate test) |
| NC Football News commitment trackers (2026, 2027; 2025 in/out-of-state) | curl | All PD names on the card / Class of 2027 file |
| RealGM — PD team page 10851 | Claude in Chrome (403 to curl) | Every graduate with a college is on the card; Hailey '25, Myers '26, Dyer '24, Robinson '24 have no college listed |
| LaxNumbers — boys t=12776, girls t=22584, `laxnumbers.com/team_info.php?y=<yr>&t=<id>&s=2`, 2024–2027 | Claude in Chrome (**non-www host only**; `www.` is blocked in the extension) | All 2024–26 names on the card; one 2027 girls lead (Charlie Thompson → CNU); one 2028 boys verbal |
| Charlotte Observer — Nov 2024 National Signing Day roundup (via Yahoo) | curl | PD block: Neace UGA, G. Bartee UNC, Fyans WCU, T. Thompson Denver, J. Johnson Howard — all on the card |
| MAX Field Hockey commitment lists 2024s / 2025s / 2026s | curl | 2024s: Kocmond, Ziegler, Kaspar, White (on card); 2025s/2026s: no PD |
| Perfect Game / Prep Baseball Report / PrepVolleyball / TopDrawerSoccer / Prep Girls Hoops | search + curl | No PD commit beyond the list; PrepVolleyball has no PD page |
| College rosters and bios (Sidearm and similar) — 40 pages under `ver/`, `col/` | curl | 39/39 D1 rows confirmed; 1 D3 row (Ackermann) checked for the name fix |
| Grouped OR-name searches of unlisted seniors (≈25 queries) | WebSearch | Nothing useful — as the skill warns; single-name searches and college pages were the productive path |

## 2. Seniors per season (MaxPreps; counts only — no uncommitted student is named)

| Sport (MaxPreps slug) | 23-24 Sr. | 24-25 Sr. | 25-26 Sr. | 26-27 Sr. | Tier |
|---|---|---|---|---|---|
| Football | 11 | 8 | 16 | 19 | Full (NCFN trackers, 247, HSOT, college rosters) |
| Boys Basketball | 1 | 5 | 3 | 5 | Full (RealGM in Chrome, HSOT, college rosters) |
| Girls Basketball | 1 | 5 | 5 | 0* | Full (RealGM, HSOT, Prep Girls Hoops, college rosters) |
| Boys Lacrosse | 7 | — (2 names, no grades) | 6 | — | Full (LaxNumbers in Chrome, HSOT, college rosters) |
| Girls Lacrosse | 2 | — | — | — | Full (LaxNumbers, HSOT); rosters without grades after 23-24 |
| Boys Soccer | 9 | 9 | 9 | 13 | Grouped searches + HSOT + TopDrawerSoccer |
| Girls Soccer | 8 | 5 | 6 | — | Full (HSOT, TopDrawerSoccer, college rosters) |
| Baseball | 7 | 4 | 0* | — | PG / PBR + HSOT + college rosters |
| Softball | 6 | 0* | 4 | — | HSOT + grouped searches |
| Volleyball | 5 | 5 | 6 | 5 | HSOT + college roster (PrepVolleyball has no PD page) |
| Field Hockey | 7 | 7 | 7 | 6 | MAX Field Hockey lists + college rosters |
| Boys Tennis | 3 | 7 | 2 | — | HSOT + college rosters |
| Girls Tennis | 5 | 4 | 6 | 4 | HSOT + college rosters |
| Girls Swimming | 13 | 0* | 0* | — | Observer preview, SwimSwam, Swimming World + college rosters |
| Boys Cross Country | 15 | — | — | — | MileSplit + college rosters |
| Girls Cross Country | 8 | — | — | — | MileSplit + college rosters |
| Wrestling | 4 | — | — | — | HSOT wrestling tracker + grouped searches |
| Girls Golf | 1 | — | — | — | HSOT golf tracker |

`0*` = the page exists but prints no grade column (not "no seniors"). `—` = no usable roster
(see §4). Boys swimming and both track & field slugs 404 in every season; their seniors are
covered through the girls swim roster (swimming), cross country (distance) and the
school's list.

## 3. Findings by category

**New athletes in the window: none.**

**Changed rows (five):** Elizabeth (not Brandon) Ackermann; Clarke (not Clark) Neace;
Bharadwaj to the Class of 2024; Makemson to Appalachian State (recommended — the one
judgment call); card figures 86 / Football 14 / ACC 9. Detail and evidence in the
2024-2026 file.

**Transfers for `rosterNote`:** Thompson Denver → West Florida; Davis Michigan → East
Tennessee State; Jackson Gardner-Webb → Claflin; Makemson (if kept at Tennessee) → App State.

**Tracker contradictions, resolved on the college's roster for the card:** McElroy
Princeton (not NC State / Purdue), Poole NC State (not Penn State), Martin Jacksonville
(not North Carolina).

**Ruled out:** McGrew → FSU (FSU lists Mountain Island Charter as her high school);
Villegas, Cardwell, Holgorsen, Allenspach, Horton (classes of 2021–2023); Bradle
(Providence High School, not PD).

**Verbals, current class (uncounted):** unchanged at 10; one new lead (Charlie Thompson →
Christopher Newport, LaxNumbers only; she is a 2026-27 senior on the field hockey roster).

## 4. Nulls and unchecked — kept apart

**Nulls (searched, found empty):**
- Every 2024–26 MaxPreps senior not on the school's list: RealGM (basketball), LaxNumbers
  (lacrosse), the HSOT tracker for the sport, and a grouped search returned no college.
  Counts (seniors with a grade on MaxPreps across 23-24 … 25-26, minus those on the
  school's list in any sport): Football 35 − 26; Boys Basketball 9 − 6; Girls Basketball
  11 − 6; Boys Lacrosse 13 − 6; Girls Lacrosse 2 − 1; Boys Soccer 27 − 5; Girls Soccer
  19 − 5; Baseball 11 − 2; Softball 10 − 1; Volleyball 16 − 3; Field Hockey 21 − 8; Boys
  Tennis 12 − 3; Girls Tennis 15 − 1; Girls Swimming 13 − 2; Boys XC 15 − 1; Girls XC
  8 − 2; Wrestling 4 − 0; Girls Golf 1 − 0. Multi-sport athletes appear under each sport.
- Hudson Clavin '26 (football): press named UChicago / MIT / Harvey Mudd *interest*; not on
  the UChicago, MIT or Claremont-Mudd-Scripps 2026 rosters → null, not a row.
- Nick Hailey '25, Leighton Myers '26 (boys basketball); Finn Dyer '24, Josiah Robinson '24:
  RealGM college column blank, single-name searches empty → null.
- PrepVolleyball: no Providence Day page. MAX Field Hockey 2025s / 2026s: no PD.
- Perfect Game and Prep Baseball Report: no PD commitment beyond Jackson (Gardner-Webb),
  Nelson (Rhodes), Daly (Denison).

**Unchecked (could not be retrieved — not nulls):**
- MaxPreps: boys swimming and both track & field slugs **404 in every season**; cross
  country 24-25 and 25-26, boys lacrosse 24-25, girls lacrosse 24-25 … 26-27, wrestling
  24-25 … 26-27, both golf slugs after 23-24, baseball 25-26 grades, girls swimming 24-25
  and 25-26 grades: page exists but **no grade column**, so seniors cannot be told apart.
  Those sports' graduates are covered only through the school's list, the per-sport database
  and the college rosters.
- Gardner-Webb (`gwusports.com`) and Tennessee (`utsports.com`) roster pages are
  client-rendered: curl returns the shell with no names, so neither Jackson's 2025 nor
  Makemson's 2024-25 presence could be read from the college's roster list (Jackson is
  confirmed at Gardner-Webb by Claflin's "Prev School" line; Makemson is confirmed at App
  State, not Tennessee).
- Colgate's old domain `gocolgateraiders.com` no longer resolves; `colgateathletics.com` does.
- D2 and D3 rows (47) were **not** individually checked on college rosters, by design — the
  Compare rows count D1 and P4 only.

## 5. Traps recorded for the next pass

- `gwusports.com` is **Gardner-Webb**, not George Washington (`gwsports.com`). The first
  verification log mislabelled it and chased a GW roster that was never the claim.
- A grep on the roster page for a surname **fails for a nickname**: Tulsa lists "Kaleigh
  Hart", the school lists "KK Hart"; Georgia lists "Clarke", the school "Clark". Search the
  college's bio URL by name before calling a row unconfirmed.
- `verify.py`-style checks that require a hometown within N characters of the surname
  **false-negative on rosters that print "Last School" far from the name** (Tennessee State,
  Army). Read the season roster (`/roster/2025`) rather than the current one for a graduate
  who has since left.
- TFRRS search results are shared across athletes with the same surname: profile 8339841
  under "Tennessee" is T'Mars McCallum, not Makemson. Open the profile and read the name.
- A **commit who never enrolled** (Makemson) is a class the skill's precedents do not cover;
  the recommendation written into the 2024-2026 file is to list the college whose page
  confirms him and carry the verbal in `rosterNote`.
