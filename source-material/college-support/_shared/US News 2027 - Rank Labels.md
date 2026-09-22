# US News 2027 — Rank Labels (shared table)

> **Provenance:** Compiled by Claude Code on 2026-09-22, the day U.S. News released
> the **2027 edition** of Best Colleges. This is the **human-readable companion**
> to the code source of truth, `src/data/collegeRankings.ts`
> (`COLLEGE_RANKINGS`) — the app resolves every acceptance-list rank label from
> that TS master via `rankLabelFor(name)`, and the per-school lists store no
> labels. The two are kept in lockstep by `npm run check:ranks`, which fails on
> any master/doc disagreement. Edit both together when a rank changes.
>
> This file **replaces** `US News 2026 - Rank Labels.md`, which was deleted in
> the same commit (git history retains it). A file named for one edition holding
> another edition's figures is a trap, so the filename states the edition and
> `scripts/check_rank_labels.mjs` points at this name.

## The 2027 edition is a methodology-change year

U.S. News added an **"Earnings by Major"** metric (College Scorecard earnings
four years post-graduation) and expanded eligibility to a record ~1,700 schools.
**MIT took #1**, displacing Princeton, which had held it since the 2012 edition.

**Measured churn across this table: see the counts below.** Nearly every row
moved. That is the expected shape of a methodology change, and it is also why a
careless name join is dangerous here — almost every row *should* change, so a
wrong-but-plausible number does not stand out. Every figure below was joined by
**name** (`normName()`), never by row position.

## Sourcing channels, and what each covers

| Channel | Rows |
|---|---|
| User's 2026-09-22 PDF print-out | 228 |
| Route B — Liberal Arts list page | 109 |
| Route A — profile page, verbatim "In the 2027 edition…" | 37 |
| User's 2026-09-22 PDF print-out (via alias) | 24 |
| Route B — National list page (via alias) | 21 |
| Route B — Liberal Arts list page (via alias) | 5 |

**Every non-browser channel is blocked** — `curl` with a browser UA returns
`http=000` (TLS completes, no body), the JSON API paths 404, and `WebFetch`
times out at 60s. **The 2026 Yahoo-search fallback is DEAD** (HTTP 500). Headed
Playwright Chrome is the only channel that works. The full recipe and its traps
are in [`US News 2027 - Fetch Method.md`](US%20News%202027%20-%20Fetch%20Method.md);
the National table parsed from the user's print-out is in
[`US News 2027 - National PDF Harvest.md`](US%20News%202027%20-%20National%20PDF%20Harvest.md).

**Three further HTTP-200 traps found during this pass**, beyond the two the
method file already recorded:

1. `/search?q=` **rate-limits to empty** after ~25 queries — it keeps returning
   200 with no results, which reads exactly like "this school has no profile".
2. `/best-colleges/search?q=` **ignores the query entirely** and returns the
   default #1-ranked list.
3. Every guessed JSON search endpoint returns **404** inside an HTML error page.

Profile IDs were therefore resolved via DuckDuckGo, and **every Route A row was
verified against the profile's own school name** — that check caught
`Mississippi College` resolving to *University of Mississippi*'s profile, a
wrong answer that no rank-level check could have seen.

## Bands and ties

Ties are real and common. **The 2027 band shape is `#382-422`** (2026's was
`#395-434`) — a band is a published value, taken verbatim, never flattened to a
single number.

## Confirmed absences — rows REMOVED from the master

Each was checked on its own profile page and holds no National/LAC rank in the
2027 edition, so `rankLabelFor` returns undefined and no label renders. A stale
2026 figure is never carried forward.

| Institution | 2026 label | 2027 finding |
|---|---|---|
| Middle Tennessee State University | National Rank #257 | no National/LAC rank — Regional Universities South (tie) |
| SUNY College of Environmental Science and Forestry | National Rank #158 | no National/LAC rank — Regional Universities North |
| University of Charleston | National Rank #395-434 | no National/LAC rank — Regional Universities South (tie) |
| University of Maryland Eastern Shore | National Rank #395-434 | no National/LAC rank — Regional Universities North (tie) |
| Valparaiso University | National Rank #198 | no National/LAC rank — Regional Universities Midwest (tie) |
| Western Carolina University | National Rank #257 | no National/LAC rank — Regional Universities South (tie) |
| Western Kentucky University | National Rank #363 | no National/LAC rank — Regional Universities South |
| Wingate University | National Rank #373 | no National/LAC rank — Regional Universities South (tie) |
| Winston-Salem State University | National Rank #232 | no National/LAC rank — Regional Universities South (tie) |
| Ave Maria University | Liberal Rank #175 | no National/LAC rank — Regional Colleges South (tie) |
| Hollins University | Liberal Rank #135 | no National/LAC rank — Regional Universities South |
| Johnson C. Smith University | Liberal Rank #173 | no National/LAC rank — Regional Colleges South (tie) |
| Maryville College | Liberal Rank #170 | no National/LAC rank — Regional Colleges South (tie) |
| Wartburg College | Liberal Rank #156 | no National/LAC rank — Regional Colleges Midwest |
| Brenau University | National Rank #395-434 | no National/LAC rank — Regional Universities South (tie) |
| Carson-Newman University | National Rank #358 | no National/LAC rank — Regional Universities South (tie) |
| Eastern Michigan University | National Rank #373 | no National/LAC rank — Regional Universities Midwest (tie) |
| Florida Gulf Coast University | National Rank #318 | no National/LAC rank — Regional Universities South (tie) |
| Hampton University | National Rank #273 | no National/LAC rank — Regional Universities South (tie) |
| Long Island University | National Rank #373 | no National/LAC rank — Regional Universities North (tie) |
| Louisiana Tech University | National Rank #318 | no National/LAC rank — Regional Universities South (tie) |
| Loyola University New Orleans | National Rank #222 | no National/LAC rank — Regional Universities South (tie) |
| Mary Baldwin University | National Rank #384 | no National/LAC rank — Regional Universities South (tie) |
| Sam Houston State University | National Rank #257 | no National/LAC rank — Regional Universities West (tie) |
| Hampshire College | Liberal Rank #156 | profile 404s; absent from the 203-row 2027 Liberal Arts list |

## The table

424 institution rows, alphabetical, matching the master exactly.

| Institution | Rank label | Channel |
|---|---|---|
| Abilene Christian University | National Rank #308 | User's 2026-09-22 PDF print-out |
| Agnes Scott College | Liberal Rank #62 | Route B — Liberal Arts list page |
| Allegheny College | Liberal Rank #85 | Route B — Liberal Arts list page |
| American University | National Rank #95 | User's 2026-09-22 PDF print-out |
| Amherst College | Liberal Rank #2 | Route B — Liberal Arts list page |
| Arizona State University | National Rank #121 | User's 2026-09-22 PDF print-out |
| Arizona State University (Main Campus) | National Rank #121 | User's 2026-09-22 PDF print-out |
| Arizona State University (Tempe) | National Rank #121 | User's 2026-09-22 PDF print-out |
| Auburn University | National Rank #100 | User's 2026-09-22 PDF print-out |
| Augusta University | National Rank #317 | Route A — profile page, verbatim "In the 2027 edition…" |
| Augustana College | Liberal Rank #91 | Route B — Liberal Arts list page |
| Ball State University | National Rank #227 | User's 2026-09-22 PDF print-out |
| Bard College | Liberal Rank #72 | Route B — Liberal Arts list page |
| Barnard College | Liberal Rank #19 | Route B — Liberal Arts list page |
| Barry University | National Rank #376 | Route A — profile page, verbatim "In the 2027 edition…" |
| Bates College | Liberal Rank #26 | Route B — Liberal Arts list page |
| Baylor University | National Rank #90 | User's 2026-09-22 PDF print-out |
| Belhaven University | National Rank #376 | Route A — profile page, verbatim "In the 2027 edition…" |
| Belmont University | National Rank #208 | User's 2026-09-22 PDF print-out |
| Beloit College | Liberal Rank #100 | Route B — Liberal Arts list page |
| Bennington College | Liberal Rank #132 | Route B — Liberal Arts list page |
| Binghamton University | National Rank #73 | User's 2026-09-22 PDF print-out |
| Biola University | National Rank #288 | User's 2026-09-22 PDF print-out |
| Boise State University | National Rank #299 | User's 2026-09-22 PDF print-out |
| Boston College | National Rank #31 | User's 2026-09-22 PDF print-out |
| Boston University | National Rank #34 | User's 2026-09-22 PDF print-out |
| Bowdoin College | Liberal Rank #3 | Route B — Liberal Arts list page |
| Bowling Green State University | National Rank #276 | User's 2026-09-22 PDF print-out |
| Bowling Green State University (Main Campus)* | National Rank #276 | User's 2026-09-22 PDF print-out |
| Bradley University | National Rank #169 | User's 2026-09-22 PDF print-out |
| Brandeis University | National Rank #59 | User's 2026-09-22 PDF print-out |
| Bridgewater College | Liberal Rank #165 | Route B — Liberal Arts list page |
| Brigham Young University | National Rank #116 | User's 2026-09-22 PDF print-out |
| Brown University | National Rank #16 | User's 2026-09-22 PDF print-out |
| Bryn Athyn College | Liberal Rank #158 | Route B — Liberal Arts list page (via alias) |
| Bryn Mawr College | Liberal Rank #31 | Route B — Liberal Arts list page |
| Bucknell University | Liberal Rank #29 | Route B — Liberal Arts list page |
| California Institute of Technology | National Rank #5 | User's 2026-09-22 PDF print-out |
| California State University Long Beach | National Rank #137 | User's 2026-09-22 PDF print-out |
| California State University–Fresno | National Rank #208 | User's 2026-09-22 PDF print-out |
| Campbell University | National Rank #342 | Route A — profile page, verbatim "In the 2027 edition…" |
| Carleton College | Liberal Rank #16 | Route B — Liberal Arts list page |
| Carnegie Mellon University | National Rank #14 | User's 2026-09-22 PDF print-out |
| Case Western Reserve University | National Rank #44 | User's 2026-09-22 PDF print-out |
| Catholic University of America | National Rank #148 | User's 2026-09-22 PDF print-out |
| Central Michigan University | National Rank #262 | User's 2026-09-22 PDF print-out |
| Centre College | Liberal Rank #54 | Route B — Liberal Arts list page |
| Chapman University | National Rank #100 | User's 2026-09-22 PDF print-out |
| Claremont McKenna College | Liberal Rank #3 | Route B — Liberal Arts list page |
| Clark Atlanta University | National Rank #332 | Route A — profile page, verbatim "In the 2027 edition…" |
| Clark University | National Rank #133 | User's 2026-09-22 PDF print-out |
| Clarkson University | National Rank #137 | User's 2026-09-22 PDF print-out |
| Clemson University | National Rank #80 | User's 2026-09-22 PDF print-out |
| Colby College | Liberal Rank #22 | Route B — Liberal Arts list page |
| Colgate University | Liberal Rank #22 | Route B — Liberal Arts list page |
| College of the Atlantic | Liberal Rank #132 | Route B — Liberal Arts list page |
| College of the Holy Cross | Liberal Rank #22 | Route B — Liberal Arts list page |
| College of William and Mary | National Rank #52 | User's 2026-09-22 PDF print-out (via alias) |
| Colorado College | Liberal Rank #34 | Route B — Liberal Arts list page |
| Colorado School of Mines | National Rank #80 | User's 2026-09-22 PDF print-out |
| Colorado State University | National Rank #169 | User's 2026-09-22 PDF print-out |
| Colorado State University (Fort Collins) | National Rank #169 | User's 2026-09-22 PDF print-out |
| Columbia University | National Rank #12 | User's 2026-09-22 PDF print-out |
| Connecticut College | Liberal Rank #47 | Route B — Liberal Arts list page |
| Cornell University | National Rank #14 | User's 2026-09-22 PDF print-out |
| Covenant College | Liberal Rank #142 | Route B — Liberal Arts list page |
| Creighton University | National Rank #100 | User's 2026-09-22 PDF print-out |
| Dartmouth College | National Rank #12 | User's 2026-09-22 PDF print-out |
| Davidson College | Liberal Rank #16 | Route B — Liberal Arts list page |
| Denison University | Liberal Rank #31 | Route B — Liberal Arts list page |
| DePaul University | National Rank #169 | User's 2026-09-22 PDF print-out |
| DePauw University | Liberal Rank #49 | Route B — Liberal Arts list page |
| Dickinson College | Liberal Rank #54 | Route B — Liberal Arts list page |
| Drake University | National Rank #191 | User's 2026-09-22 PDF print-out |
| Drew University | Liberal Rank #85 | Route B — Liberal Arts list page |
| Drexel University | National Rank #80 | User's 2026-09-22 PDF print-out |
| Duke University | National Rank #8 | User's 2026-09-22 PDF print-out |
| Duquesne University | National Rank #156 | User's 2026-09-22 PDF print-out |
| Earlham College | Liberal Rank #83 | Route B — Liberal Arts list page |
| East Carolina University | National Rank #202 | User's 2026-09-22 PDF print-out |
| East Tennessee State University | National Rank #328 | Route A — profile page, verbatim "In the 2027 edition…" |
| East Texas A&M University | National Rank #382-422 | Route A — profile page, verbatim "In the 2027 edition…" |
| Eckerd College | Liberal Rank #132 | Route B — Liberal Arts list page |
| Elon University | National Rank #100 | User's 2026-09-22 PDF print-out |
| Emmanuel College | Liberal Rank #125 | Route B — Liberal Arts list page |
| Emory University | National Rank #23 | User's 2026-09-22 PDF print-out |
| Fairfield University | National Rank #109 | User's 2026-09-22 PDF print-out |
| Fisk University | Liberal Rank #146 | Route B — Liberal Arts list page |
| Florida A&M University | National Rank #156 | User's 2026-09-22 PDF print-out |
| Florida Agricultural and Mechanical University | National Rank #156 | User's 2026-09-22 PDF print-out (via alias) |
| Florida Institute of Technology | National Rank #236 | User's 2026-09-22 PDF print-out |
| Florida International University | National Rank #100 | User's 2026-09-22 PDF print-out |
| Florida State University | National Rank #59 | User's 2026-09-22 PDF print-out |
| Fordham University | National Rank #85 | User's 2026-09-22 PDF print-out |
| Franklin and Marshall College | Liberal Rank #34 | Route B — Liberal Arts list page |
| Furman University | Liberal Rank #57 | Route B — Liberal Arts list page |
| Gardner-Webb University | National Rank #365 | Route A — profile page, verbatim "In the 2027 edition…" |
| George Mason University | National Rank #121 | User's 2026-09-22 PDF print-out |
| George Washington University | National Rank #59 | User's 2026-09-22 PDF print-out |
| Georgetown University | National Rank #23 | User's 2026-09-22 PDF print-out |
| Georgia Institute of Technology | National Rank #29 | User's 2026-09-22 PDF print-out |
| Georgia Southern University | National Rank #328 | Route A — profile page, verbatim "In the 2027 edition…" |
| Georgia Tech | National Rank #29 | User's 2026-09-22 PDF print-out (via alias) |
| Gettysburg College | Liberal Rank #54 | Route B — Liberal Arts list page |
| Gordon College | Liberal Rank #146 | Route B — Liberal Arts list page |
| Goucher College | Liberal Rank #125 | Route B — Liberal Arts list page |
| Grand Canyon University | National Rank #382-422 | Route A — profile page, verbatim "In the 2027 edition…" |
| Grinnell College | Liberal Rank #16 | Route B — Liberal Arts list page |
| Guilford College | Liberal Rank #172 | Route B — Liberal Arts list page |
| Hamilton College | Liberal Rank #14 | Route B — Liberal Arts list page |
| Hampden-Sydney College | Liberal Rank #111 | Route B — Liberal Arts list page |
| Harding University | National Rank #276 | User's 2026-09-22 PDF print-out |
| Harvard University | National Rank #3 | User's 2026-09-22 PDF print-out |
| Harvey Mudd College | Liberal Rank #8 | Route B — Liberal Arts list page |
| Haverford College | Liberal Rank #26 | Route B — Liberal Arts list page |
| Hillsdale College | Liberal Rank #47 | Route B — Liberal Arts list page |
| Hobart and William Smith Colleges | Liberal Rank #60 | Route B — Liberal Arts list page |
| Hofstra University | National Rank #191 | User's 2026-09-22 PDF print-out |
| Houghton University | Liberal Rank #142 | Route B — Liberal Arts list page |
| Howard University | National Rank #73 | User's 2026-09-22 PDF print-out |
| Indiana University | National Rank #73 | User's 2026-09-22 PDF print-out |
| Indiana University (Bloomington) | National Rank #73 | User's 2026-09-22 PDF print-out |
| Iowa State University | National Rank #116 | Route B — National list page (via alias) |
| James Madison University | National Rank #137 | User's 2026-09-22 PDF print-out |
| Johns Hopkins University | National Rank #9 | User's 2026-09-22 PDF print-out |
| Juniata College | Liberal Rank #91 | Route B — Liberal Arts list page |
| Kansas State University | National Rank #156 | User's 2026-09-22 PDF print-out |
| Kean University | National Rank #317 | Route A — profile page, verbatim "In the 2027 edition…" |
| Kennesaw State University | National Rank #342 | Route A — profile page, verbatim "In the 2027 edition…" |
| Kent State University | National Rank #236 | User's 2026-09-22 PDF print-out |
| Kenyon College | Liberal Rank #41 | Route B — Liberal Arts list page |
| Lafayette College | Liberal Rank #30 | Route B — Liberal Arts list page |
| Lake Forest College | Liberal Rank #62 | Route B — Liberal Arts list page |
| Lehigh University | National Rank #44 | User's 2026-09-22 PDF print-out |
| Lewis & Clark College | Liberal Rank #97 | Route B — Liberal Arts list page |
| Liberty University | National Rank #365 | Route A — profile page, verbatim "In the 2027 edition…" |
| Lincoln Memorial University | National Rank #342 | Route A — profile page, verbatim "In the 2027 edition…" |
| Lipscomb University | National Rank #250 | User's 2026-09-22 PDF print-out |
| Louisiana State University | National Rank #202 | Route B — National list page (via alias) |
| Loyola Marymount University | National Rank #109 | User's 2026-09-22 PDF print-out |
| Loyola University Chicago | National Rank #121 | User's 2026-09-22 PDF print-out |
| Macalester College | Liberal Rank #28 | Route B — Liberal Arts list page |
| Marquette University | National Rank #90 | User's 2026-09-22 PDF print-out |
| Marshall University | National Rank #317 | Route A — profile page, verbatim "In the 2027 edition…" |
| Marymount University | National Rank #276 | User's 2026-09-22 PDF print-out |
| Massachusetts Institute of Technology | National Rank #1 | User's 2026-09-22 PDF print-out |
| Mercer University | National Rank #148 | User's 2026-09-22 PDF print-out |
| Meredith College | Liberal Rank #119 | Route B — Liberal Arts list page |
| Miami University | National Rank #133 | User's 2026-09-22 PDF print-out |
| Miami University (Ohio) | National Rank #133 | User's 2026-09-22 PDF print-out |
| Miami University (Oxford) | National Rank #133 | User's 2026-09-22 PDF print-out |
| Michigan State University | National Rank #69 | User's 2026-09-22 PDF print-out |
| Michigan Technological University | National Rank #169 | User's 2026-09-22 PDF print-out |
| Middlebury College | Liberal Rank #19 | Route B — Liberal Arts list page |
| Mississippi College | National Rank #342 | Route A — profile page, verbatim "In the 2027 edition…" |
| Mississippi State University | National Rank #208 | User's 2026-09-22 PDF print-out |
| Missouri State University | National Rank #342 | Route A — profile page, verbatim "In the 2027 edition…" |
| Missouri University of Science and Technology | National Rank #191 | Route B — National list page (via alias) |
| Montana State University | National Rank #308 | User's 2026-09-22 PDF print-out |
| Montclair State University | National Rank #156 | User's 2026-09-22 PDF print-out |
| Morehouse College | Liberal Rank #83 | Route B — Liberal Arts list page |
| Morgan State University | National Rank #317 | Route A — profile page, verbatim "In the 2027 edition…" |
| Mount Holyoke College | Liberal Rank #34 | Route B — Liberal Arts list page |
| Muhlenberg College | Liberal Rank #62 | Route B — Liberal Arts list page |
| NC A&T State University | National Rank #219 | Route B — National list page (via alias) |
| New College of Florida | Liberal Rank #150 | Route B — Liberal Arts list page |
| New Jersey Institute of Technology | National Rank #85 | User's 2026-09-22 PDF print-out |
| New York University | National Rank #31 | User's 2026-09-22 PDF print-out |
| North Carolina A & T State University | National Rank #219 | Route B — National list page (via alias) |
| North Carolina A&T State University | National Rank #219 | Route B — National list page (via alias) |
| North Carolina State University | National Rank #73 | User's 2026-09-22 PDF print-out |
| Northeastern University | National Rank #42 | User's 2026-09-22 PDF print-out |
| Northern Illinois University | National Rank #308 | Route A — profile page, verbatim "In the 2027 edition…" |
| Northwestern University | National Rank #9 | User's 2026-09-22 PDF print-out |
| Nova Southeastern University | National Rank #250 | User's 2026-09-22 PDF print-out |
| Oberlin College | Liberal Rank #59 | Route B — Liberal Arts list page |
| Occidental College | Liberal Rank #38 | Route B — Liberal Arts list page |
| Oglethorpe University | Liberal Rank #146 | Route B — Liberal Arts list page |
| Ohio University | National Rank #202 | User's 2026-09-22 PDF print-out |
| Ohio Wesleyan University | Liberal Rank #116 | Route B — Liberal Arts list page |
| Oklahoma State University | National Rank #191 | User's 2026-09-22 PDF print-out |
| Old Dominion University | National Rank #328 | Route A — profile page, verbatim "In the 2027 edition…" |
| Oregon State University | National Rank #156 | User's 2026-09-22 PDF print-out |
| Pace University | National Rank #250 | User's 2026-09-22 PDF print-out |
| Palm Beach Atlantic University | National Rank #382-422 | Route A — profile page, verbatim "In the 2027 edition…" |
| Penn State University | National Rank #55 | Route B — National list page (via alias) |
| Penn State University (University Park) | National Rank #55 | Route B — National list page (via alias) |
| Pennsylvania State University | National Rank #55 | Route B — National list page (via alias) |
| Pepperdine University | National Rank #80 | User's 2026-09-22 PDF print-out |
| Point Park University | National Rank #332 | Route A — profile page, verbatim "In the 2027 edition…" |
| Pomona College | Liberal Rank #3 | Route B — Liberal Arts list page |
| Portland State University | National Rank #236 | User's 2026-09-22 PDF print-out |
| Presbyterian College | Liberal Rank #158 | Route B — Liberal Arts list page |
| Princeton University | National Rank #2 | User's 2026-09-22 PDF print-out |
| Purdue University | National Rank #55 | User's 2026-09-22 PDF print-out |
| Purdue University (Main Campus) | National Rank #55 | User's 2026-09-22 PDF print-out |
| Purdue University-Main Campus | National Rank #55 | User's 2026-09-22 PDF print-out |
| Quinnipiac University | National Rank #156 | User's 2026-09-22 PDF print-out |
| Randolph College | Liberal Rank #157 | Route B — Liberal Arts list page |
| Randolph-Macon College | Liberal Rank #85 | Route B — Liberal Arts list page |
| Rensselaer Polytechnic Inst. | National Rank #69 | User's 2026-09-22 PDF print-out (via alias) |
| Rhodes College | Liberal Rank #49 | Route B — Liberal Arts list page |
| Rice University | National Rank #16 | User's 2026-09-22 PDF print-out |
| Roanoke College | Liberal Rank #116 | Route B — Liberal Arts list page |
| Rochester Institute of Technology | National Rank #95 | User's 2026-09-22 PDF print-out |
| Roosevelt University | National Rank #382-422 | Route A — profile page, verbatim "In the 2027 edition…" |
| Rowan University | National Rank #191 | User's 2026-09-22 PDF print-out |
| Rutgers University | National Rank #44 | Route B — National list page (via alias) |
| Rutgers University (Camden) | National Rank #95 | User's 2026-09-22 PDF print-out |
| Rutgers University (New Brunswick) | National Rank #44 | User's 2026-09-22 PDF print-out |
| Saint Louis University | National Rank #100 | User's 2026-09-22 PDF print-out |
| Saint Mary's College (Indiana) | Liberal Rank #78 | Route B — Liberal Arts list page |
| Salem College | Liberal Rank #160 | Route B — Liberal Arts list page |
| Samford University | National Rank #191 | User's 2026-09-22 PDF print-out |
| San Diego State University | National Rank #137 | User's 2026-09-22 PDF print-out |
| Santa Clara University | National Rank #55 | User's 2026-09-22 PDF print-out |
| Sarah Lawrence College | Liberal Rank #125 | Route B — Liberal Arts list page |
| Scripps College | Liberal Rank #38 | Route B — Liberal Arts list page |
| Seattle University | National Rank #179 | User's 2026-09-22 PDF print-out |
| Seton Hall University | National Rank #156 | User's 2026-09-22 PDF print-out |
| Sewanee: The University of the South | Liberal Rank #49 | Route B — Liberal Arts list page (via alias) |
| Simmons University | National Rank #169 | User's 2026-09-22 PDF print-out |
| Skidmore College | Liberal Rank #41 | Route B — Liberal Arts list page |
| Smith College | Liberal Rank #22 | Route B — Liberal Arts list page |
| Soka University of America | Liberal Rank #41 | Route B — Liberal Arts list page |
| Southeastern University | National Rank #382-422 | Route A — profile page, verbatim "In the 2027 edition…" |
| Southern Methodist University | National Rank #85 | User's 2026-09-22 PDF print-out |
| Spelman College | Liberal Rank #34 | Route B — Liberal Arts list page |
| St. John's University | National Rank #137 | User's 2026-09-22 PDF print-out |
| St. John's University-New York | National Rank #137 | User's 2026-09-22 PDF print-out (via alias) |
| St. Lawrence University | Liberal Rank #49 | Route B — Liberal Arts list page |
| St. Olaf College | Liberal Rank #49 | Route B — Liberal Arts list page |
| Stanford University | National Rank #5 | User's 2026-09-22 PDF print-out |
| Stevens Institute of Technology | National Rank #59 | User's 2026-09-22 PDF print-out |
| Stony Brook University | National Rank #59 | User's 2026-09-22 PDF print-out |
| Suffolk University | National Rank #262 | User's 2026-09-22 PDF print-out |
| SUNY at Binghamton | National Rank #73 | User's 2026-09-22 PDF print-out (via alias) |
| SUNY Buffalo | National Rank #85 | User's 2026-09-22 PDF print-out (via alias) |
| SUNY University at Buffalo | National Rank #85 | User's 2026-09-22 PDF print-out (via alias) |
| Susquehanna University | Liberal Rank #85 | Route B — Liberal Arts list page |
| Swarthmore College | Liberal Rank #3 | Route B — Liberal Arts list page |
| Sweet Briar College | Liberal Rank #150 | Route B — Liberal Arts list page |
| Syracuse University | National Rank #72 | User's 2026-09-22 PDF print-out |
| Temple University | National Rank #109 | User's 2026-09-22 PDF print-out |
| Tennessee State University | National Rank #376 | Route A — profile page, verbatim "In the 2027 edition…" |
| Texas A&M University | National Rank #59 | User's 2026-09-22 PDF print-out |
| Texas Christian University | National Rank #90 | User's 2026-09-22 PDF print-out |
| Texas State University | National Rank #288 | User's 2026-09-22 PDF print-out |
| Texas Tech University | National Rank #186 | User's 2026-09-22 PDF print-out |
| The College of William and Mary | National Rank #52 | User's 2026-09-22 PDF print-out (via alias) |
| The College of Wooster | Liberal Rank #91 | Route B — Liberal Arts list page |
| The New School | National Rank #227 | Route B — National list page (via alias) |
| The Ohio State University | National Rank #44 | User's 2026-09-22 PDF print-out |
| The Ohio State University (Main Campus) | National Rank #44 | User's 2026-09-22 PDF print-out |
| The University of Alabama | National Rank #156 | User's 2026-09-22 PDF print-out |
| The University of Montana | National Rank #365 | Route A — profile page, verbatim "In the 2027 edition…" |
| The University of Texas at Dallas | National Rank #121 | Route B — National list page (via alias) |
| Thomas Jefferson University | National Rank #133 | User's 2026-09-22 PDF print-out |
| Tougaloo College | Liberal Rank #178 | Route B — Liberal Arts list page |
| Transylvania University | Liberal Rank #106 | Route B — Liberal Arts list page |
| Trinity College | Liberal Rank #31 | Route B — Liberal Arts list page |
| Trinity University | Liberal Rank #38 | Route B — Liberal Arts list page |
| Tufts University | National Rank #31 | User's 2026-09-22 PDF print-out |
| Tulane University | National Rank #59 | User's 2026-09-22 PDF print-out (via alias) |
| Tulane University of Louisiana | National Rank #59 | User's 2026-09-22 PDF print-out |
| Union College | Liberal Rank #44 | Route B — Liberal Arts list page |
| United States Air Force Academy | Liberal Rank #11 | Route B — Liberal Arts list page |
| United States Military Academy | Liberal Rank #9 | Route B — Liberal Arts list page (via alias) |
| United States Military Academy at West Point | Liberal Rank #9 | Route B — Liberal Arts list page |
| United States Naval Academy | Liberal Rank #3 | Route B — Liberal Arts list page |
| University of Akron | National Rank #342 | Route A — profile page, verbatim "In the 2027 edition…" |
| University of Alabama | National Rank #156 | User's 2026-09-22 PDF print-out |
| University of Alabama at Birmingham | National Rank #137 | User's 2026-09-22 PDF print-out |
| University of Alabama in Huntsville | National Rank #262 | Route B — National list page (via alias) |
| University of Arizona | National Rank #121 | User's 2026-09-22 PDF print-out |
| University of Arkansas | National Rank #191 | User's 2026-09-22 PDF print-out |
| University of California (Berkeley | National Rank #20 | User's 2026-09-22 PDF print-out |
| University of California (Berkeley) | National Rank #20 | User's 2026-09-22 PDF print-out |
| University of California (Davis) | National Rank #34 | User's 2026-09-22 PDF print-out |
| University of California (Irvine) | National Rank #34 | User's 2026-09-22 PDF print-out |
| University of California (Los Angeles) | National Rank #20 | User's 2026-09-22 PDF print-out |
| University of California (Merced) | National Rank #69 | User's 2026-09-22 PDF print-out |
| University of California (Riverside) | National Rank #80 | User's 2026-09-22 PDF print-out |
| University of California (San Diego) | National Rank #29 | User's 2026-09-22 PDF print-out |
| University of California (Santa Barbara) | National Rank #44 | User's 2026-09-22 PDF print-out |
| University of California (Santa Cruz) | National Rank #109 | User's 2026-09-22 PDF print-out |
| University of California (SB) | National Rank #44 | User's 2026-09-22 PDF print-out (via alias) |
| University of California, Merced | National Rank #69 | User's 2026-09-22 PDF print-out |
| University of Central Florida | National Rank #121 | User's 2026-09-22 PDF print-out |
| University of Chicago | National Rank #9 | User's 2026-09-22 PDF print-out |
| University of Cincinnati | National Rank #179 | User's 2026-09-22 PDF print-out |
| University of Colorado | National Rank #109 | User's 2026-09-22 PDF print-out (via alias) |
| University of Colorado (Boulder) | National Rank #109 | User's 2026-09-22 PDF print-out |
| University of Colorado (Colorado Springs) | National Rank #382-422 | Route A — profile page, verbatim "In the 2027 edition…" |
| University of Colorado Boulder | National Rank #109 | User's 2026-09-22 PDF print-out |
| University of Colorado Denver | National Rank #236 | Route B — National list page (via alias) |
| University of Connecticut | National Rank #73 | User's 2026-09-22 PDF print-out |
| University of Dayton | National Rank #121 | User's 2026-09-22 PDF print-out |
| University of Delaware | National Rank #85 | User's 2026-09-22 PDF print-out |
| University of Denver | National Rank #121 | User's 2026-09-22 PDF print-out |
| University of Florida | National Rank #34 | User's 2026-09-22 PDF print-out |
| University of Georgia | National Rank #52 | User's 2026-09-22 PDF print-out |
| University of Hartford | National Rank #288 | User's 2026-09-22 PDF print-out |
| University of Hawaii | National Rank #186 | User's 2026-09-22 PDF print-out (via alias) |
| University of Hawaii at Manoa | National Rank #186 | User's 2026-09-22 PDF print-out |
| University of Houston | National Rank #137 | User's 2026-09-22 PDF print-out |
| University of Illinois | National Rank #34 | User's 2026-09-22 PDF print-out (via alias) |
| University of Illinois (Urbana-Champaign) | National Rank #34 | User's 2026-09-22 PDF print-out |
| University of Illinois at Chicago | National Rank #95 | User's 2026-09-22 PDF print-out (via alias) |
| University of Illinois at Urbana-Champaign | National Rank #34 | User's 2026-09-22 PDF print-out (via alias) |
| University of Iowa | National Rank #100 | User's 2026-09-22 PDF print-out |
| University of Kansas | National Rank #148 | User's 2026-09-22 PDF print-out |
| University of Kentucky | National Rank #148 | User's 2026-09-22 PDF print-out |
| University of Louisville | National Rank #179 | User's 2026-09-22 PDF print-out |
| University of Lynchburg | National Rank #332 | Route A — profile page, verbatim "In the 2027 edition…" |
| University of Maine | National Rank #262 | User's 2026-09-22 PDF print-out |
| University of Mary Washington | Liberal Rank #128 | Route B — Liberal Arts list page |
| University of Maryland | National Rank #49 | User's 2026-09-22 PDF print-out (via alias) |
| University of Maryland (College Park) | National Rank #49 | User's 2026-09-22 PDF print-out |
| University of Massachusetts | National Rank #59 | Route B — National list page (via alias) |
| University of Massachusetts (Amherst) | National Rank #59 | User's 2026-09-22 PDF print-out |
| University of Massachusetts (Boston) | National Rank #202 | User's 2026-09-22 PDF print-out |
| University of Memphis | National Rank #288 | User's 2026-09-22 PDF print-out |
| University of Miami | National Rank #55 | User's 2026-09-22 PDF print-out |
| University of Michigan | National Rank #25 | Route B — National list page (via alias) |
| University of Michigan-Ann Arbor | National Rank #25 | User's 2026-09-22 PDF print-out |
| University of Minnesota | National Rank #59 | User's 2026-09-22 PDF print-out |
| University of Minnesota (Twin Cities) | National Rank #59 | User's 2026-09-22 PDF print-out |
| University of Mississippi | National Rank #179 | User's 2026-09-22 PDF print-out |
| University of Missouri | National Rank #95 | User's 2026-09-22 PDF print-out |
| University of Missouri (Kansas City) | National Rank #250 | User's 2026-09-22 PDF print-out |
| University of Montana | National Rank #365 | Route A — profile page, verbatim "In the 2027 edition…" |
| University of NC at Asheville | Liberal Rank #154 | Route B — Liberal Arts list page (via alias) |
| University of NC at Chapel Hill | National Rank #27 | User's 2026-09-22 PDF print-out (via alias) |
| University of NC at Charlotte | National Rank #169 | Route B — National list page (via alias) |
| University of NC at Greensboro | National Rank #208 | User's 2026-09-22 PDF print-out (via alias) |
| University of NC at Wilmington | National Rank #219 | User's 2026-09-22 PDF print-out (via alias) |
| University of Nebraska (Lincoln) | National Rank #169 | User's 2026-09-22 PDF print-out |
| University of Nevada (Las Vegas) | National Rank #219 | User's 2026-09-22 PDF print-out |
| University of Nevada, Reno | National Rank #219 | User's 2026-09-22 PDF print-out |
| University of New Hampshire | National Rank #109 | User's 2026-09-22 PDF print-out |
| University of New Hampshire (Main Campus) | National Rank #109 | User's 2026-09-22 PDF print-out |
| University of North Carolina (Asheville) | Liberal Rank #154 | Route B — Liberal Arts list page |
| University of North Carolina (Chapel Hill) | National Rank #27 | User's 2026-09-22 PDF print-out |
| University of North Carolina (Charlotte) | National Rank #169 | Route B — National list page (via alias) |
| University of North Carolina (Greensboro) | National Rank #208 | User's 2026-09-22 PDF print-out |
| University of North Carolina (Wilmington) | National Rank #219 | User's 2026-09-22 PDF print-out |
| University of North Carolina at Asheville | Liberal Rank #154 | Route B — Liberal Arts list page (via alias) |
| University of North Carolina at Chapel Hill | National Rank #27 | User's 2026-09-22 PDF print-out (via alias) |
| University of North Carolina at Charlotte | National Rank #169 | Route B — National list page (via alias) |
| University of North Carolina at Greensboro | National Rank #208 | User's 2026-09-22 PDF print-out (via alias) |
| University of North Carolina Wilmington | National Rank #219 | User's 2026-09-22 PDF print-out |
| University of North Dakota | National Rank #227 | User's 2026-09-22 PDF print-out |
| University of North Florida | National Rank #236 | User's 2026-09-22 PDF print-out |
| University of North Texas | National Rank #208 | User's 2026-09-22 PDF print-out |
| University of Northern Colorado | National Rank #342 | Route A — profile page, verbatim "In the 2027 edition…" |
| University of Notre Dame | National Rank #20 | User's 2026-09-22 PDF print-out |
| University of Oklahoma | National Rank #116 | User's 2026-09-22 PDF print-out |
| University of Oregon | National Rank #116 | User's 2026-09-22 PDF print-out |
| University of Pennsylvania | National Rank #7 | User's 2026-09-22 PDF print-out |
| University of Pittsburgh | National Rank #59 | User's 2026-09-22 PDF print-out |
| University of Pittsburgh (Main Campus) | National Rank #59 | User's 2026-09-22 PDF print-out |
| University of Pittsburgh (Pittsburgh) | National Rank #59 | User's 2026-09-22 PDF print-out |
| University of Puget Sound | Liberal Rank #100 | Route B — Liberal Arts list page |
| University of Rhode Island | National Rank #148 | User's 2026-09-22 PDF print-out |
| University of Richmond | Liberal Rank #21 | Route B — Liberal Arts list page |
| University of Rochester | National Rank #49 | User's 2026-09-22 PDF print-out |
| University of San Diego | National Rank #100 | User's 2026-09-22 PDF print-out |
| University of San Francisco | National Rank #116 | User's 2026-09-22 PDF print-out |
| University of South Alabama | National Rank #332 | Route A — profile page, verbatim "In the 2027 edition…" |
| University of South Carolina | National Rank #121 | User's 2026-09-22 PDF print-out |
| University of South Carolina-Columbia | National Rank #121 | User's 2026-09-22 PDF print-out (via alias) |
| University of South Florida | National Rank #100 | User's 2026-09-22 PDF print-out |
| University of South Florida (Main Campus) | National Rank #100 | User's 2026-09-22 PDF print-out |
| University of Southern California | National Rank #27 | User's 2026-09-22 PDF print-out |
| University of Southern Mississippi | National Rank #308 | Route A — profile page, verbatim "In the 2027 edition…" |
| University of Tennessee | National Rank #109 | User's 2026-09-22 PDF print-out |
| University of Texas | National Rank #34 | Route B — National list page (via alias) |
| University of Texas–San Antonio | National Rank #227 | User's 2026-09-22 PDF print-out |
| University of Tulsa | National Rank #148 | User's 2026-09-22 PDF print-out |
| University of Utah | National Rank #179 | User's 2026-09-22 PDF print-out |
| University of Vermont | National Rank #133 | User's 2026-09-22 PDF print-out |
| University of Virginia | National Rank #26 | User's 2026-09-22 PDF print-out |
| University of Virginia (Main Campus) | National Rank #26 | User's 2026-09-22 PDF print-out |
| University of Washington | National Rank #49 | User's 2026-09-22 PDF print-out |
| University of Washington (Seattle Campus) | National Rank #49 | User's 2026-09-22 PDF print-out |
| University of Wisconsin | National Rank #34 | Route B — National list page (via alias) |
| University of Wisconsin (Madison) | National Rank #34 | User's 2026-09-22 PDF print-out |
| University of Wyoming | National Rank #250 | User's 2026-09-22 PDF print-out |
| Utah State University | National Rank #288 | Route A — profile page, verbatim "In the 2027 edition…" |
| Vanderbilt University | National Rank #16 | User's 2026-09-22 PDF print-out |
| Vassar College | Liberal Rank #12 | Route B — Liberal Arts list page |
| Villanova University | National Rank #42 | User's 2026-09-22 PDF print-out |
| Virginia Commonwealth University | National Rank #156 | User's 2026-09-22 PDF print-out |
| Virginia Military Institute | Liberal Rank #62 | Route B — Liberal Arts list page |
| Virginia Polytechnic Institute and State University | National Rank #52 | User's 2026-09-22 PDF print-out (via alias) |
| Virginia Tech | National Rank #52 | User's 2026-09-22 PDF print-out |
| Virginia Wesleyan University | Liberal Rank #176 | Route A — profile page, verbatim "In the 2027 edition…" |
| Wake Forest University | National Rank #34 | User's 2026-09-22 PDF print-out |
| Warren Wilson College | Liberal Rank #181 | Route B — Liberal Arts list page |
| Washington & Jefferson College | Liberal Rank #91 | Route B — Liberal Arts list page |
| Washington and Lee University | Liberal Rank #12 | Route B — Liberal Arts list page |
| Washington College | Liberal Rank #97 | Route B — Liberal Arts list page |
| Washington State University | National Rank #191 | User's 2026-09-22 PDF print-out |
| Washington University in St. Louis | National Rank #16 | User's 2026-09-22 PDF print-out |
| Wellesley College | Liberal Rank #10 | Route B — Liberal Arts list page |
| Wesleyan University | Liberal Rank #14 | Route B — Liberal Arts list page |
| West Virginia University | National Rank #227 | User's 2026-09-22 PDF print-out |
| Western Michigan University | National Rank #276 | User's 2026-09-22 PDF print-out |
| Western New England University | National Rank #262 | User's 2026-09-22 PDF print-out |
| Westmont College | Liberal Rank #109 | Route B — Liberal Arts list page |
| Wheaton College | Liberal Rank #81 | Route B — Liberal Arts list page |
| Wheaton College - IL | Liberal Rank #57 | Route A — profile page, verbatim "In the 2027 edition…" |
| Wheaton College - MA | Liberal Rank #81 | Route A — profile page, verbatim "In the 2027 edition…" |
| Whitman College | Liberal Rank #78 | Route B — Liberal Arts list page |
| Whittier College | Liberal Rank #100 | Route B — Liberal Arts list page |
| Widener University | National Rank #276 | User's 2026-09-22 PDF print-out |
| William & Mary | National Rank #52 | User's 2026-09-22 PDF print-out |
| Williams College | Liberal Rank #1 | Route B — Liberal Arts list page |
| Wofford College | Liberal Rank #68 | Route B — Liberal Arts list page |
| Worcester Polytechnic Institute | National Rank #73 | User's 2026-09-22 PDF print-out |
| Xavier University | National Rank #208 | User's 2026-09-22 PDF print-out |
| Yale University | National Rank #4 | User's 2026-09-22 PDF print-out |
| Young Harris College | Liberal Rank #184-203 | Route B — Liberal Arts list page |
