# US News 2026 — Rank Labels (shared table)

> **Provenance:** Compiled by Claude Code on 2026-08-16. This is the
> **human-readable companion** to the code source of truth,
> `src/data/collegeRankings.ts` (`COLLEGE_RANKINGS`) — the app resolves every
> acceptance-list rank label from that TS master via `rankLabelFor(name)`, and
> the per-school lists store no labels. The two are kept in lockstep by
> `npm run check:ranks`, which fails on any master/doc disagreement. Keep this
> file for the **source per figure** and human scanning; edit both together when
> a rank changes or a college is added. Its first edition was harvested from the
> labels the six original schools carried (researched against the 2026 U.S. News
> tables in PR #93), plus Covenant Day additions.
>
> **SOURCING CHANNEL RULE (user-set, 2026-08-18).** Try **usnews.com first** for every
> rank. If it blocks or times out **five times within one school's research pass**, stop
> retrying and use the **Yahoo-search fallback** for the remainder of that pass
> (`https://search.yahoo.com/search?p=<school>+us+news+2026+ranked`), which surfaces the
> verbatim "In the 2026 edition of Best Colleges, <school> is ranked No. #N in <category>"
> line. Record the channel per figure. In practice usnews.com has been observed
> **hard-blocking** this environment — TLS completes, no body ever returns (`curl` reports
> `http=000`; WebFetch times out) — in which case the threshold is met immediately and the
> pass runs entirely on Yahoo. Never add a row without the verbatim 2026 figure; never
> guess; never carry a prior-year number.
>
> **Gaston Day added 2026-08-18:** its 2019-2025 acceptance list (231 institutions)
> introduced **12** colleges holding a real 2026 National/LAC rank not yet in the master —
> Ave Maria (Liberal #175), Bradley (National #183), Hollins (Liberal #135), James Madison
> (National #151), Mary Baldwin (National #384), Salem College (Liberal #143), Soka
> (Liberal #37), Tougaloo (Liberal #180), Transylvania (Liberal #109), Western Michigan
> (National #293), UT Dallas (National #110) and SUNY Binghamton (National #73) — plus
> **10 spelling aliases** for institutions already ranked here, matching the Academic
> Profile's own spellings (`University of California (Berkeley` with its unclosed paren and
> `Bowling Green State University (Main Campus)*` with its asterisk are reproduced verbatim
> from the source PDF). **Babson College is a known NOT-FOUND**: its 2026 category and rank
> could not be confirmed on any channel, so it carries no label rather than a guess — note
> its prominent **#2 in the WSJ/College Pulse 2026** ranking is a DIFFERENT publisher and
> must not be mistaken for a U.S. News figure by a later pass. The rest of its unlabeled
> destinations (Appalachian State, Berry, Butler, Citadel, Coastal Carolina, Queens of
> Charlotte, NC Central, Towson, Winthrop, High Point and others) are U.S. News **Regional**
> institutions and correctly hold no National/LAC label; **St. Andrews University (NC)
> closed in May 2025** and has no 2026 ranking at all.
>
> **Hickory Grove Christian added 2026-08-17:** its 2023 + 2025 acceptance lists
> introduced three colleges holding a real 2026 National/LAC rank that were not
> yet in the master — **Fordham University (National #97)**, **Grinnell College
> (Liberal #13)** and **Grand Canyon University (National #395-434)** — each
> confirmed against the 2026 usnews.com profile via the Yahoo-search channel and
> added here. Rensselaer Polytechnic Institute (National #64), already present,
> gained a name-spelling alias; the Knoxville-tagged Tennessee flagship, Penn
> State (University Park) and Washington & Lee were resolved via aliases to their
> existing rows. Its Regional-ranked destinations (College of Charleston, Xavier
> of Louisiana, Rollins, Appalachian State, High Point) hold no National/LAC rank
> and correctly carry no label.
>
> **Expanded 2026-08-16 (this pass):** every college across all eight schools'
> acceptance lists that holds a real U.S. News 2026 rank — **National
> Universities OR National Liberal Arts Colleges, at ANY rank**, not just the
> top-75 buckets — was researched and added here, and the whole table was
> re-verified against the 2026 edition. Every figure was confirmed from the
> verbatim usnews.com profile line ("In the 2026 edition of Best Colleges,
> <school> is ranked No. #N in <category>"), reached via Yahoo search when direct
> usnews.com fetches timed out. **15 stale labels inherited from the earlier pass
> were corrected** to their true 2026 value (they had been carried from a prior
> edition): UNC Chapel Hill #22→#26, UVA #24→#26, Purdue #43→#46, U. Washington
> #63→#42, Illinois Urbana-Champaign #69→#36, Wisconsin-Madison #39→#36, UMass
> Amherst #69→#64, Penn State #63→#59, Pittsburgh #67→#69, Colorado Boulder
> #75→#97, Tennessee-Knoxville #57→#102, FAMU #92→#169, Franklin & Marshall
> #48→#35, Washington & Lee #11→#21, Sewanee #46→#45.
>
> **Full reconciliation 2026-08-16 (this pass):** every one of the master's 421
> institution rows was re-verified against **usnews.com only**, via WebSearch
> scoped to `allowed_domains: ["usnews.com"]` returning the verbatim 2026 profile
> line. **102 stale labels were corrected** to their true 2026 value; the master
> `collegeRankings.ts` and this table were updated together in lockstep. Seven of
> those 102 are flagship remaps where the old unqualified-name figure matched no
> actual campus and was mapped to the flagship campus rank (Penn State→University
> Park, Rutgers→New Brunswick, U. Alabama→Tuscaloosa, U. Colorado→Boulder,
> U. Maryland→College Park, U. Minnesota→Twin Cities, Illinois→Urbana-Champaign),
> consistent with the qualified alias rows already in the master.
>
> **The hard rule this table serves** (user-set, 2026-08-16, broadened this pass):
> every college on a school's acceptance list that holds a U.S. News National or
> National-Liberal-Arts rank MUST carry its `rankLabel` — the rank shown on the
> right of the card — **regardless of whether it falls in a `nu75`/`lac75`
> bucket**. The label is informational and independent of the `cats` buckets
> (which stay genuinely top-75 and drive only the filter chips), so a #80 or #250
> or banded (`#395-434`) school is labelled with `cats: []`. Only these carry NO
> label, being genuinely unranked in the two national lists: U.S. News **Regional**
> Universities/Colleges, community/technical colleges, specialty art/music/design
> schools, seminaries, and **foreign** universities (Best Global does not count).
>
> `scripts/check_rank_labels.mjs` (`npm run check:ranks`, chained into
> `npm run build`) enforces that every **bucketed** college has a label and that no
> institution's label conflicts across schools — but it does **not** flag a label
> missing on a `cats: []` college, so the inclusive rule is a research obligation.
> When adding a school, **reuse this table first** — copy any label verbatim, never
> re-type it — and only deep-research a college the table lacks, adding it here with
> its source so the next school reuses it.
>
> Note on the Power-4 tail: several `p4`-tagged universities that once shipped
> unlabeled (ASU #117, Oregon #110, Cincinnati #158, LSU #169, WVU #222, …) now
> carry their 2026 National rank. Any `p4` school still unlabeled is one whose 2026
> figure has not yet been confirmed to a verbatim source — add it here when it is,
> rather than from a noisy secondary figure.

### The table

| Institution | Rank label |
| Abilene Christian University | National Rank #329 |
| Agnes Scott College | Liberal Rank #67 |
| Allegheny College | Liberal Rank #76 |
| American University | National Rank #88 |
| Amherst College | Liberal Rank #2 |
| Arizona State University | National Rank #117 |
| Auburn University | National Rank #102 |
| Augusta University | National Rank #273 |
| Augustana College | Liberal Rank #96 |
| Ave Maria University | Liberal Rank #175 |
| Ball State University | National Rank #213 |
| Bard College | Liberal Rank #70 |
| Barnard College | Liberal Rank #13 |
| Barry University | National Rank #395-434 |
| Bates College | Liberal Rank #24 |
| Baylor University | National Rank #88 |
| Belhaven University | National Rank #395-434 |
| Belmont University | National Rank #213 |
| Beloit College | Liberal Rank #92 |
| Bennington College | Liberal Rank #121 |
| Binghamton University | National Rank #73 |
| Biola University | National Rank #242 |
| Boise State University | National Rank #301 |
| Boston College | National Rank #36 |
| Boston University | National Rank #42 |
| Bowdoin College | Liberal Rank #5 |
| Bowling Green State University | National Rank #293 |
| Bowling Green State University (Main Campus)* | National Rank #293 |
| Bradley University | National Rank #183 |
| Brandeis University | National Rank #69 |
| Brenau University | National Rank #395-434 |
| Bridgewater College | Liberal Rank #167 |
| Brigham Young University | National Rank #110 |
| Brown University | National Rank #13 |
| Bryn Athyn College | Liberal Rank #180 |
| Bryn Mawr College | Liberal Rank #30 |
| Bucknell University | Liberal Rank #30 |
| California Institute of Technology | National Rank #11 |
| California State University, Fresno | National Rank #183 |
| California State University, Long Beach | National Rank #127 |
| Campbell University | National Rank #343 |
| Carleton College | Liberal Rank #10 |
| Carnegie Mellon University | National Rank #20 |
| Carson-Newman University | National Rank #358 |
| Case Western Reserve University | National Rank #51 |
| Catholic University of America | National Rank #169 |
| Central Michigan University | National Rank #283 |
| Centre College | Liberal Rank #55 |
| Chapman University | National Rank #110 |
| Claremont McKenna College | Liberal Rank #7 |
| Clark Atlanta University | National Rank #329 |
| Clark University | National Rank #132 |
| Clarkson University | National Rank #143 |
| Clemson University | National Rank #75 |
| Colby College | Liberal Rank #24 |
| Colgate University | Liberal Rank #22 |
| College of the Atlantic | Liberal Rank #126 |
| College of the Holy Cross | Liberal Rank #27 |
| College of William & Mary | National Rank #51 |
| Colorado College | Liberal Rank #30 |
| Colorado School of Mines | National Rank #80 |
| Colorado State University | National Rank #151 |
| Columbia University | National Rank #15 |
| Connecticut College | Liberal Rank #50 |
| Cornell University | National Rank #12 |
| Covenant College | Liberal Rank #126 |
| Creighton University | National Rank #117 |
| Dartmouth College | National Rank #13 |
| Davidson College | Liberal Rank #13 |
| Denison University | Liberal Rank #34 |
| DePaul University | National Rank #169 |
| DePauw University | Liberal Rank #58 |
| Dickinson College | Liberal Rank #45 |
| Drake University | National Rank #183 |
| Drew University | Liberal Rank #84 |
| Drexel University | National Rank #80 |
| Duke University | National Rank #7 |
| Duquesne University | National Rank #169 |
| Earlham College | Liberal Rank #76 |
| East Carolina University | National Rank #192 |
| East Tennessee State University | National Rank #301 |
| East Texas A&M University | National Rank #384 |
| Eastern Michigan University | National Rank #373 |
| Eckerd College | Liberal Rank #135 |
| Elon University | National Rank #117 |
| Emmanuel College | Liberal Rank #135 |
| Emory University | National Rank #24 |
| Fisk University | Liberal Rank #156 |
| Florida A&M University | National Rank #169 |
| Florida Gulf Coast University | National Rank #318 |
| Florida Institute of Technology | National Rank #232 |
| Florida State University | National Rank #51 |
| Fordham University | National Rank #97 |
| Franklin & Marshall College | Liberal Rank #35 |
| Furman University | Liberal Rank #45 |
| Gardner-Webb University | National Rank #384 |
| George Washington University | National Rank #59 |
| Georgetown University | National Rank #24 |
| Georgia Institute of Technology | National Rank #32 |
| Georgia Southern University | National Rank #343 |
| Georgia Tech | National Rank #32 |
| Gettysburg College | Liberal Rank #58 |
| Gordon College | Liberal Rank #156 |
| Goucher College | Liberal Rank #126 |
| Grand Canyon University | National Rank #395-434 |
| Grinnell College | Liberal Rank #13 |
| Guilford College | Liberal Rank #172 |
| Hamilton College | Liberal Rank #13 |
| Hampden-Sydney College | Liberal Rank #107 |
| Hampshire College | Liberal Rank #156 |
| Hampton University | National Rank #273 |
| Harding University | National Rank #301 |
| Harvard University | National Rank #3 |
| Harvey Mudd College | Liberal Rank #10 |
| Haverford College | Liberal Rank #24 |
| Hillsdale College | Liberal Rank #50 |
| Hobart and William Smith Colleges | Liberal Rank #73 |
| Hofstra University | National Rank #183 |
| Hollins University | Liberal Rank #135 |
| Houghton University | Liberal Rank #146 |
| Howard University | National Rank #88 |
| Indiana University Bloomington | National Rank #73 |
| Iowa State University | National Rank #117 |
| James Madison University | National Rank #151 |
| Johns Hopkins University | National Rank #7 |
| Johnson C. Smith University | Liberal Rank #173 |
| Juniata College | Liberal Rank #92 |
| Kansas State University | National Rank #158 |
| Kean University | National Rank #318 |
| Kennesaw State University | National Rank #373 |
| Kent State University | National Rank #232 |
| Kenyon College | Liberal Rank #45 |
| Lafayette College | Liberal Rank #30 |
| Lake Forest College | Liberal Rank #75 |
| Lehigh University | National Rank #46 |
| Lewis & Clark College | Liberal Rank #96 |
| Liberty University | National Rank #395-434 |
| Lincoln Memorial University | National Rank #343 |
| Lipscomb University | National Rank #222 |
| Long Island University | National Rank #373 |
| Louisiana State University | National Rank #169 |
| Louisiana Tech University | National Rank #318 |
| Loyola Marymount University | National Rank #102 |
| Loyola University Chicago | National Rank #132 |
| Loyola University New Orleans | National Rank #222 |
| Macalester College | Liberal Rank #28 |
| Marquette University | National Rank #88 |
| Marshall University | National Rank #318 |
| Mary Baldwin University | National Rank #384 |
| Marymount University | National Rank #273 |
| Maryville College | Liberal Rank #170 |
| Massachusetts Institute of Technology | National Rank #2 |
| Mercer University | National Rank #169 |
| Meredith College | Liberal Rank #115 |
| Miami University (Ohio) | National Rank #143 |
| Michigan State University | National Rank #64 |
| Michigan Technological University | National Rank #158 |
| Middle Tennessee State University | National Rank #257 |
| Middlebury College | Liberal Rank #13 |
| Mississippi College | National Rank #358 |
| Mississippi State University | National Rank #208 |
| Missouri State University | National Rank #358 |
| Missouri University of Science and Technology | National Rank #192 |
| Montana State University | National Rank #318 |
| Montclair State University | National Rank #158 |
| Morehouse College | Liberal Rank #96 |
| Morgan State University | National Rank #329 |
| Mount Holyoke College | Liberal Rank #29 |
| Muhlenberg College | Liberal Rank #70 |
| New College of Florida | Liberal Rank #135 |
| New Jersey Institute of Technology | National Rank #80 |
| New York University | National Rank #32 |
| North Carolina A&T State University | National Rank #232 |
| North Carolina State University | National Rank #64 |
| Northeastern University | National Rank #46 |
| Northern Illinois University | National Rank #301 |
| Northwestern University | National Rank #7 |
| Nova Southeastern University | National Rank #257 |
| Oberlin College | Liberal Rank #58 |
| Occidental College | Liberal Rank #35 |
| Oglethorpe University | Liberal Rank #156 |
| Ohio University | National Rank #198 |
| Ohio Wesleyan University | Liberal Rank #121 |
| Oklahoma State University | National Rank #198 |
| Old Dominion University | National Rank #293 |
| Oregon State University | National Rank #143 |
| Pace University | National Rank #273 |
| Palm Beach Atlantic University | National Rank #384 |
| Penn State University Park | National Rank #59 |
| Pennsylvania State University | National Rank #59 |
| Pepperdine University | National Rank #84 |
| Point Park University | National Rank #318 |
| Pomona College | Liberal Rank #7 |
| Portland State University | National Rank #222 |
| Presbyterian College | Liberal Rank #163 |
| Princeton University | National Rank #1 |
| Purdue University | National Rank #46 |
| Purdue University (Main Campus) | National Rank #46 |
| Quinnipiac University | National Rank #179 |
| Randolph College | Liberal Rank #156 |
| Randolph-Macon College | Liberal Rank #96 |
| Rensselaer Polytechnic Institute | National Rank #64 |
| Rhodes College | Liberal Rank #55 |
| Rice University | National Rank #17 |
| Roanoke College | Liberal Rank #126 |
| Rochester Institute of Technology | National Rank #88 |
| Roosevelt University | National Rank #395-434 |
| Rowan University | National Rank #169 |
| Rutgers University-Camden | National Rank #97 |
| Rutgers University-New Brunswick | National Rank #42 |
| Saint Louis University | National Rank #102 |
| Saint Mary's College (Indiana) | Liberal Rank #84 |
| Salem College | Liberal Rank #143 |
| Sam Houston State University | National Rank #257 |
| Samford University | National Rank #179 |
| San Diego State University | National Rank #117 |
| Santa Clara University | National Rank #59 |
| Sarah Lawrence College | Liberal Rank #109 |
| Scripps College | Liberal Rank #37 |
| Seattle University | National Rank #151 |
| Seton Hall University | National Rank #158 |
| Sewanee: The University of the South | Liberal Rank #45 |
| Simmons University | National Rank #183 |
| Skidmore College | Liberal Rank #37 |
| Smith College | Liberal Rank #13 |
| Soka University of America | Liberal Rank #37 |
| Southeastern University | National Rank #395-434 |
| Southern Methodist University | National Rank #88 |
| Spelman College | Liberal Rank #37 |
| St. John's University (NY) | National Rank #151 |
| St. Lawrence University | Liberal Rank #58 |
| St. Olaf College | Liberal Rank #50 |
| Stanford University | National Rank #4 |
| Stevens Institute of Technology | National Rank #80 |
| Stony Brook University | National Rank #59 |
| Suffolk University | National Rank #257 |
| SUNY at Binghamton | National Rank #73 |
| SUNY College of Environmental Science and Forestry | National Rank #158 |
| SUNY University at Buffalo | National Rank #75 |
| Susquehanna University | Liberal Rank #96 |
| Swarthmore College | Liberal Rank #4 |
| Sweet Briar College | Liberal Rank #164 |
| Syracuse University | National Rank #75 |
| Temple University | National Rank #102 |
| Tennessee State University | National Rank #395-434 |
| Texas A&M University | National Rank #51 |
| Texas Christian University | National Rank #97 |
| Texas State University | National Rank #257 |
| Texas Tech University | National Rank #198 |
| The College of William and Mary | National Rank #51 |
| The College of Wooster | Liberal Rank #76 |
| The New School | National Rank #213 |
| The Ohio State University | National Rank #41 |
| The Ohio State University (Main Campus) | National Rank #41 |
| The University of Montana | National Rank #363 |
| The University of Texas at Dallas | National Rank #110 |
| Thomas Jefferson University | National Rank #132 |
| Tougaloo College | Liberal Rank #180 |
| Transylvania University | Liberal Rank #109 |
| Trinity College | Liberal Rank #37 |
| Trinity University | Liberal Rank #37 |
| Tufts University | National Rank #36 |
| Tulane University | National Rank #69 |
| Union College | Liberal Rank #44 |
| United States Air Force Academy | Liberal Rank #5 |
| United States Military Academy | Liberal Rank #10 |
| United States Military Academy at West Point | Liberal Rank #10 |
| United States Naval Academy | Liberal Rank #3 |
| University of Akron | National Rank #373 |
| University of Alabama | National Rank #169 |
| University of Alabama at Birmingham | National Rank #132 |
| University of Alabama in Huntsville | National Rank #242 |
| University of Alaska Fairbanks | National Rank #395-434 |
| University of Arizona | National Rank #127 |
| University of Arkansas | National Rank #183 |
| University of California (Berkeley | National Rank #15 |
| University of California (Merced) | National Rank #57 |
| University of California (Santa Barbara) | National Rank #40 |
| University of California, Berkeley | National Rank #15 |
| University of California, Davis | National Rank #32 |
| University of California, Irvine | National Rank #32 |
| University of California, Los Angeles | National Rank #17 |
| University of California, Merced | National Rank #57 |
| University of California, Riverside | National Rank #75 |
| University of California, San Diego | National Rank #29 |
| University of California, Santa Cruz | National Rank #88 |
| University of Central Florida | National Rank #117 |
| University of Charleston | National Rank #395-434 |
| University of Chicago | National Rank #6 |
| University of Cincinnati | National Rank #158 |
| University of Colorado Boulder | National Rank #97 |
| University of Colorado Colorado Springs | National Rank #395-434 |
| University of Colorado Denver | National Rank #232 |
| University of Connecticut | National Rank #69 |
| University of Dayton | National Rank #143 |
| University of Delaware | National Rank #88 |
| University of Denver | National Rank #117 |
| University of Florida | National Rank #30 |
| University of Georgia | National Rank #46 |
| University of Hartford | National Rank #301 |
| University of Hawaii at Manoa | National Rank #169 |
| University of Houston | National Rank #132 |
| University of Illinois Chicago | National Rank #84 |
| University of Illinois Urbana-Champaign | National Rank #36 |
| University of Iowa | National Rank #102 |
| University of Kansas | National Rank #143 |
| University of Kentucky | National Rank #143 |
| University of Louisville | National Rank #158 |
| University of Lynchburg | National Rank #329 |
| University of Maine | National Rank #257 |
| University of Mary Washington | Liberal Rank #131 |
| University of Maryland | National Rank #42 |
| University of Maryland Eastern Shore | National Rank #395-434 |
| University of Maryland, College Park | National Rank #42 |
| University of Massachusetts Amherst | National Rank #64 |
| University of Massachusetts Boston | National Rank #213 |
| University of Memphis | National Rank #273 |
| University of Miami | National Rank #64 |
| University of Michigan | National Rank #20 |
| University of Michigan-Ann Arbor | National Rank #20 |
| University of Minnesota Twin Cities | National Rank #59 |
| University of Mississippi | National Rank #169 |
| University of Missouri | National Rank #102 |
| University of Missouri-Kansas City | National Rank #232 |
| University of Montana | National Rank #363 |
| University of Nebraska-Lincoln | National Rank #158 |
| University of Nevada, Las Vegas | National Rank #232 |
| University of Nevada, Reno | National Rank #192 |
| University of New Hampshire | National Rank #117 |
| University of North Carolina at Asheville | Liberal Rank #135 |
| University of North Carolina at Chapel Hill | National Rank #26 |
| University of North Carolina at Charlotte | National Rank #143 |
| University of North Carolina at Greensboro | National Rank #198 |
| University of North Carolina Wilmington | National Rank #198 |
| University of North Dakota | National Rank #242 |
| University of North Florida | National Rank #222 |
| University of North Texas | National Rank #208 |
| University of Northern Colorado | National Rank #343 |
| University of Notre Dame | National Rank #20 |
| University of Oklahoma | National Rank #110 |
| University of Oregon | National Rank #110 |
| University of Pennsylvania | National Rank #7 |
| University of Pittsburgh | National Rank #69 |
| University of Pittsburgh (Main Campus) | National Rank #69 |
| University of Puget Sound | Liberal Rank #96 |
| University of Rhode Island | National Rank #151 |
| University of Richmond | Liberal Rank #22 |
| University of Rochester | National Rank #46 |
| University of San Diego | National Rank #110 |
| University of San Francisco | National Rank #110 |
| University of South Alabama | National Rank #363 |
| University of South Carolina | National Rank #127 |
| University of South Florida | National Rank #88 |
| University of Southern California | National Rank #28 |
| University of Southern Mississippi | National Rank #318 |
| University of Tennessee at Chattanooga | National Rank #329 |
| University of Tennessee, Knoxville | National Rank #102 |
| University of Texas at Austin | National Rank #30 |
| University of Texas at San Antonio | National Rank #213 |
| University of Tulsa | National Rank #158 |
| University of Utah | National Rank #151 |
| University of Vermont | National Rank #132 |
| University of Virginia | National Rank #26 |
| University of Washington | National Rank #42 |
| University of Wisconsin-Madison | National Rank #36 |
| University of Wyoming | National Rank #222 |
| Utah State University | National Rank #242 |
| Valparaiso University | National Rank #198 |
| Vanderbilt University | National Rank #17 |
| Vassar College | Liberal Rank #13 |
| Villanova University | National Rank #57 |
| Virginia Commonwealth University | National Rank #139 |
| Virginia Military Institute | Liberal Rank #65 |
| Virginia Polytechnic Institute and State University | National Rank #51 |
| Virginia Tech | National Rank #51 |
| Virginia Wesleyan University | Liberal Rank #178 |
| Wake Forest University | National Rank #51 |
| Warren Wilson College | Liberal Rank #183-201 |
| Wartburg College | Liberal Rank #156 |
| Washington & Jefferson College | Liberal Rank #84 |
| Washington and Lee University | Liberal Rank #21 |
| Washington College | Liberal Rank #92 |
| Washington State University | National Rank #192 |
| Washington University in St. Louis | National Rank #20 |
| Wellesley College | Liberal Rank #7 |
| Wesleyan University | Liberal Rank #13 |
| West Virginia University | National Rank #222 |
| Western Carolina University | National Rank #257 |
| Western Kentucky University | National Rank #363 |
| Western Michigan University | National Rank #293 |
| Western New England University | National Rank #283 |
| Westmont College | Liberal Rank #115 |
| Wheaton College (Illinois) | Liberal Rank #50 |
| Wheaton College (Massachusetts) | Liberal Rank #76 |
| Whitman College | Liberal Rank #58 |
| Whittier College | Liberal Rank #92 |
| Widener University | National Rank #301 |
| William & Mary | National Rank #51 |
| Williams College | Liberal Rank #1 |
| Wingate University | National Rank #373 |
| Winston-Salem State University | National Rank #232 |
| Wofford College | Liberal Rank #67 |
| Worcester Polytechnic Institute | National Rank #84 |
| Xavier University | National Rank #208 |
| Yale University | National Rank #4 |
| Young Harris College | Liberal Rank #183-201 |
|---|---|
