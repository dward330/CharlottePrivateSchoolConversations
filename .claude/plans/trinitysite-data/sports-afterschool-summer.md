# Trinity live-site recheck 2026-11-14 — Sports, After School, Summer Programs

This is the evidence worklist for `.claude/plans/trinitysite.md`. The verbatim live text is in the "### Live-site recheck, 2026-11-14" subsections of the source-material files.

I checked Trinity's sports, after-school and summer data against the 2026-11-14 crawl. The biggest problems:
- **After-school prices:** the household-income bands ($105 / $135 / $195) are no longer on the school's site, and several cards rest on them.
- **Summer:** the camp page no longer gives the 2026 dates, camps or prices; it now says "Check back in January 2027 for Camp Registration!".
- **Sports:** the conference is now called the Queen City Athletic Association (QCAA), and a new fall-2026 championships post exists. Both old result posts are gone, with no Wayback copy.

I edited five source-material files and nothing under src/. I made four live requests: 1 to tescharlotte.org (the summer page HTML, because the crawl had not captured the collapsed FAQ answers) and 3 to Google (the old Cost of Attendance doc, the camp grid CSV and the camp fees doc). I also ran Wayback CDX queries.

## A. URL map

| Old URL | New URL or GONE | Cited at | Note |
|---|---|---|---|
| tescharlotte.org/community/athletics.cfm | https://www.tescharlotte.org/community/athletics | sportsPrograms/trinity-episcopal.ts:56 (used :115, :211); src/content/sports/trinity-episcopal.json:1 (×2); SM Sports Offered.md:26 | Same sport list. Wayback 20260509204439 |
| tescharlotte.org/editoruploads/files/26-27SchoolProfile.pdf | https://resources.finalsite.net/images/v1790266877/tescharlotteorg/jraele9yxiqjc8nohifm/26-27SchoolProfile.pdf (linked as https://www.tescharlotte.org/fs/resource-manager/view/580132e3-7a1d-4fe7-b44e-a086ea994817) | sports ts:58 (used :116); afterSchool ts:139; sports json:1 (×2); SM Sports Offered.md:28 | Same document: flag football still listed, "7 Extended Day & Support Staff" still there. Old URL has no Wayback snapshot |
| tescharlotte.org/editoruploads/files/25-26SchoolProfile.pdf | GONE (superseded) | sports ts:60 (used :117); sports json:1; SM Sports Offered.md:29 | https://web.archive.org/web/20251001032830/https://www.tescharlotte.org/editoruploads/files/25-26SchoolProfile.pdf |
| tescharlotte.org/blog.cfm?threadid=10 | GONE | sports ts:61 (used :122); sports json:1 (×2); SM Selected Results.md:22 | No Wayback snapshot (CDX and the availability API are both empty) |
| tescharlotte.org/blog.cfm?threadid=12 | GONE | sports ts:62 (used :127, :209); sports json:1 (×2); SM Selected Results.md:23 | No Wayback snapshot |
| tescharlotte.org/community/trinity-extended-day.cfm | https://www.tescharlotte.org/community/trinity-extended-day | afterSchool ts:127, :212, :260; after-school json:1 (×2); SM TED.md:14 | Page rewritten. Wayback 20260714063744 |
| tescharlotte.org/community/wildcat-summer-camp.cfm | https://www.tescharlotte.org/community/wildcat-summer-camp | summer ts:524, :650; afterSchool ts:135; summer json:1 (×3); SM Costs.md:16; SM Catalog.md:14 | Page cut down sharply. Wayback 20260608120638 |
| tescharlotte.org/academics/lower-school-enrichments.cfm | "Lower School Enrichments" section of https://www.tescharlotte.org/academics/lower-school | afterSchool ts:216 | Wayback 20260714061907 |
| tescharlotte.org/academics/middle-school-enrichments.cfm | "Middle School Enrichments" section of https://www.tescharlotte.org/academics/middle-school | afterSchool ts:220 | Wayback 20251027202511 |

These are not tescharlotte.org links, but they matter:
- **Cost of Attendance Google Doc** (afterSchool ts:131, :264): still returns HTTP 200 with unchanged 2026-27 content, but no page on the new site links it. The TED rates now sit on https://www.tescharlotte.org/admissions/tuition-financial-support under "Other Fees", without the income bands.
- **Summer CSV grid and docs** (summer ts:528, :532, :536, :638, :642, :646): none is linked from the new site.
  - The CSV still holds the 2026 grid, and all 85 rows match source-material.
  - The fees doc is unchanged.
  - I did not re-fetch the camp descriptions, logistics or FAQ docs.
  - The CampBrain portal is no longer linked either.

## B. Differences
Columns: app location | app value | live value (verbatim) | live source | parent-facing prose?

**Sports** (src/data/sportsPrograms/trinity-episcopal.ts)
1. `offered.subhead` | "in the Queen City Conference" | "Queen City Athletic Association championship" / "QCAA" | news post .../post/trinity-sweeps-fall-sports-championships | yes
2. `offered.stats[3]` | value 'QCC', label 'Queen City Conference · not the GCMSAA' | "QCAA" | news post | label yes; value is a figure field
3. `offered.footnote` | "Trinity has published exactly two seasons, Fall 2023 and Winter 2024, all of it Queen City Conference play…" | The live site publishes only one season: "The fall sports season concluded with Trinity Episcopal School's Middle School teams sweeping their championships." (Posted Oct 21 2026). The Fall 2023 and Winter 2024 sources are gone. | news post | yes
4. `offered.subhead` | grade bands "7th/8th, 8th, 6th/7th" | "7th and 8th Grade boys soccer" and "The 8th Grade girls team" are confirmed. "6th/7th" is no longer stated anywhere. | news post | yes
5. `offered.sources[4]` label | "…(also where the Queen City Conference is named)" | source gone | — | yes (label)
6. `coaching.subhead` | "David Martin, who is also the only athletics staff member Trinity lists anywhere. Assistant Coach Jason Martin works alongside him on the basketball staff." | The page lists three staff: "David Martin / Athletic Director", "Jason Martin / K-8 Healthful Living Teacher", "Jalen Haffaney / Assistant Athletic Director & P.E. Teacher". The live post names Jason Martin as cross country coach. | /community/athletics; /about-us/staculty | yes
7. `coaching.headline`, `featured[0]` (kicker, stats, detail) and `tenure[0].role` | "Athletic Director and head basketball coach since 2004", "20 yrs", "~250" | Live gives only "Athletic Director" (directory: "Athletics Director, Healthful Living Teacher"). "Head basketball coach" and "since 2004" are no longer stated. | /community/athletics; /about-us/staculty | yes
8. `coaching.tenure[1].role` | 'Assistant Coach, basketball — "another longtime Trinity staculty member"' | "Jason Martin / K-8 Healthful Living Teacher" | /community/athletics | yes
9. Unchanged and confirmed: the motto, the "no skill-based cuts" quote (offered.headline), the 10 season-teams (offered.seasons), and the 90% figure (stats[2]).
10. Source-material only: "Most, in fact, play all three seasons." is no longer on the live page.

**After school** (src/data/afterSchoolPrograms/trinity-episcopal.ts)
1. Income bands and the "Estimated" header, which feed:
   - `coverage.headline` ("priced on household income")
   - `coverage.subhead` ("Four income bands run $105 to $380 a month")
   - `coverage.basisNote`
   - `facts[0]` ("Monthly rates by household income…")
   - `verdict.headline` ("income-scaled monthly rates")
   - `verdict.strengths[0]` and `[3]`
   - `checklist[1]` and `[7]`

   Live: "Monthly Rate: $380 ($355 for each additional sibling)". There are no bands and no "Estimated". Source: /admissions/tuition-financial-support. All of these are parent-facing prose.
2. `coverage.rows[3]` flatLabel, `facts[2]` and `strengths[5]` | "days TES is closed… 8:00 a.m.–5:30 p.m." | "Full-Day Rate*: $72/day, or $45/day for first sibling and $40/day for each additional sibling for families receiving financial support / *Offered during conferences". The 8:00–5:30 hours are no longer stated. | tuition page | yes
3. `coverage.rows[2]` flatLabel and `facts[3]` | "early dismissal to 5:30 p.m." | "Half-Day Rate*: $51/day ($30 for families receiving financial support) * Complimentary for monthly registered students". The 5:30 close is no longer stated. | tuition page | yes
4. `facts[1]` drop-in rate: $31 / $25 confirmed. "until 6:00 p.m." confirmed on the TED page. No change.
5. `facts[5]` | "Jocelyn Purdie, Director of Auxiliary Services" | "Jocelyn Anderson / Director of Auxiliary Services" (leadership block and directory; email is still jpurdie@). The page's contact line still says "contact Jocelyn Purdie". | /community/trinity-extended-day; /about-us/staculty | yes
6. `dayInside.headline`, `words`, `wordsText` and `strengths[6]` | "Building character, enriching lives, and having fun", "safe, well-structured environment", "group projects", "Fun Friday", "the Trinity Honor Code" | "providing students with dedicated time for homework and reading, outdoor play, and activities such as art, board games, and Fun/Film Fridays." The Honor Code, group projects and the character tagline are gone. New opener: "When the school day ends, there is still a space for students to engage in learning, flex their activity, and get their bodies moving before heading home." | TED page | yes
7. `dayInside.subhead`, `catalogIntro`, `classes` (Karate, Cheer club) and `checklist[4]` | four examples (chess club, music lessons, karate, cheer club), "several days a week", "Trinity faculty/staff and independent contractors" | "seasonal enrichments are offered for an additional fee. These include chess club, boys and girls run clubs, music lessons, and much more." Karate and cheer club are gone; run clubs are new. | TED page | yes (class `name` and `desc` too)
8. `coverage.summer.text` | "15 June to 24 July 2026… $85/week… $90/week… $175/week" | The dates are no longer stated. Care hours are confirmed: "Before-camp care is available from 7:45–9:00 a.m. After-camp care is provided from 4:00--5:30 p.m." No prices are given. | /community/wildcat-summer-camp | yes
9. Confirmed: there is still no morning care, and the profile still shows 7 Extended Day staff.
10. Source-material only: the old page said registration was "currently open"; it now reads "Registration for monthly and drop-in care is currently closed."

**Summer** (src/data/summer/trinity-episcopal.ts)
1. `catalog.subhead` | "Camps run 15 June to 24 July 2026…" | The dates are no longer stated: "Check back in January 2027 for Camp Registration!". Hours are confirmed verbatim. | camp page | yes
2. `catalog.headline` | "75 named camps… $225… $785" | Neither the count nor any price is on the live site. "six weeks", "rising grades K-8" and "open to any child in the community" are confirmed. | camp page | yes
3. `catalog.camps[*]` (all 33 sampled camps: names, prices, weeks) | 2026 slate | Not on the live site (it sits only in the unlinked CSV) | — | yes (`name`, `desc`); prices and weeks are figure fields
4. `costPlanner.fees[5]` label | 'The camp "strives to be nut-free"' | "No. For the health and safety of all students, please do not send any snacks containing nuts to camp. We will also discourage the sharing of snacks for this reason." | camp page FAQ | yes
5. `costPlanner.subhead`, `fees[5]` and `fees[2]` | bring-your-own lunch; "half-day morning camper cannot buy after-care" | Neither is stated on the live page. The FAQ mentions only snacks and water bottles. | — | yes
6. `addons` ($85 / $90), `fees` ($50, $25), `fees[2]`–`[4]` and `fees[6]` (4ORMORE, aid exclusions, $5/minute late pick-up), `aside` (May 1) | — | None of these appear on the live site; they survive only in the unlinked fees doc. The care hours in the add-on labels are confirmed. | — | labels and notes yes; prices are figure fields

## C. Gone-source facts

| Fact | App location | Type | Wayback |
|---|---|---|---|
| Winter 2024: first basketball title in school history, Feb. 8, 54–23 over Carmel Christian, undefeated | sports offered.footnote | historical | none |
| Fall 2023: girls cross country conference champion "4th year running", "ranked first among independent schools in North Carolina", 7 named all-conference; boys soccer won the title and the tournament; volleyball tied for first; boys cross country 3rd | offered.footnote | historical | none |
| David Martin head basketball coach "since 2004", "20 daggum years" quote, ~250 players | coaching.headline, featured, tenure[0] | historical as of Feb 2024; the current coaching role is unconfirmed | none |
| Jason Martin assistant basketball coach | coaching.subhead, tenure[1] | current-state, likely stale | none |
| Flag football absent in 2025-26 | offered.sources[2] label | historical | 20251001032830 (URL in table A) |
| TED income bands $105 / $135 / $195 and "Estimated" | after-school cards (B, after school, item 1) | current-state | Not gone: the Google Doc still resolves, but the site no longer links it |
| TED full-day 8:00–5:30 and half-day close 5:30 | rows[2], rows[3], facts[2], facts[3] | current-state | same Google Doc |
| Old TED page wording: Honor Code, character tagline, karate, cheer club | dayInside | current-state | 20260714063744 |
| 2026 camp slate, dates and prices | summer catalog, after-school coverage.summer | historical (a past, dated season), but stale as a "current catalog" | 20260608120638 |
| 2026 camp fees and policies ($85 / $90 / $175, $50, $25, 4ORMORE, aid, May 1, late pick-up, lunch) | costPlanner | current-state (2026 terms; a 2027 version is not out yet) | 20260608120638 for the old page; the fees doc still resolves, unlinked |

## D. New live information that fits an existing card
- **Sports offered (footnote), from the Fall 2026 post:**
  - 7th/8th grade boys soccer, undefeated, won the QCAA championship.
  - "Trinity's first-ever win in the QCAA's volleyball championship"; the 8th grade girls were runner-up in the regular season.
  - Boys and girls cross country both won the QCAA Championship Run-Off at McAlpine Creek Park, each with three runners in the top 5, and an 8th grader won the boys race. Keep the student unnamed.
  - The post is dated Oct 21 2026 but gives game dates of "Nov. 19, 2026" and "Nov. 20, 2026", which come after the post itself. Quote the season and the post date, never the game dates.
- **Coaching:**
  - Jalen Haffaney, Assistant Athletic Director & P.E. Teacher.
  - Jason Martin coaches cross country.
  - Volleyball coaches are staculty Rachel Fuller (3rd Grade Instructional Assistant) and Claire Walter (K-4 Counselor).
  - Soccer is coached by two parents and an alum (TES '23). Leave these unnamed: the alum is likely a minor.
- **TED:** the "Fun/Film Fridays", reading and outdoor-play wording; run clubs as an enrichment; seasonal enrichments; the full-day rate is "Offered during conferences".
- **Summer:**
  - Afternoon drop-off from 12:45 p.m.
  - "Check back in January 2027 for Camp Registration!"
  - The "What makes Wildcat Summer Camp stand out?" list.
  - The firmer nut rule.

Separate problem in the school's own CSV, not caused by the redesign: both Camp Independence rows continue with "9a W-Th. (overnight)" and "9-12p Fri." / "Noon pick-up". So the app's `desc` "Runs Monday and Tuesday only" (summer ts:440, :453) and `dayLabel` 'Mon–Tue' look wrong.

## E. Source-material files edited
In each file I added `### Live-site recheck, 2026-11-14` at the end of `## Provenance`. There are no new `## ` headings and no student, parent or alum names.
- source-material/sports/trinity-episcopal/Trinity Episcopal School - Sports - Selected Results and Coaching.md
- source-material/sports/trinity-episcopal/Trinity Episcopal School - Sports - Sports Offered and Participation.md
- source-material/after-school/trinity-episcopal/Trinity Episcopal School - After School - Trinity Extended Day.md
- source-material/summer-programs/trinity-episcopal/Trinity Episcopal School - Summer Programs - Summer Costs and Policies.md
- source-material/summer-programs/trinity-episcopal/Trinity Episcopal School - Summer Programs - Wildcat Summer Camp Catalog.md

## F. charlotte-country-day.json
This is not a broken citation on another school's page.
- **What it is:** a bare domain with no URL, in the section "Third-party pages the dossier saw but did not use (not evidence; not used here either)". It reads "tescharlotte.org (CAIS brochure copy)".
- **Where it comes from:** source-material/learning-support/charlotte-country-day/Charlotte Country Day - Learning Support - Deep Research.md:51, which is an AI lead sheet.
- **Why it mentions Trinity:** Trinity hosts the CAIS (the shared Charlotte independent-school admissions testing group) testing brochure, and that brochure lists Charlotte Country Day as a participating school. On the new site it is docs/CAIS2027-2028Upload1.pdf, linked as "WISC-V" / "WPPSI-IV".
- **Does it reach parents?** It is unlikely to render, because learning-support is a structured area and its prose JSON layer should be suppressed. I did not verify that on a rendered page.
- **Nothing breaks:** there is no link to go dead. At most, the wording could later change to "CAIS testing brochure hosted on tescharlotte.org".
