# US News 2026 — Rank Labels (shared table)

> **Provenance:** Compiled by Claude Code on 2026-08-16. This is the project's
> canonical `rankLabel` table for the "Where Graduates Go" acceptance lists in
> `src/data/collegeSupportPrograms/*.ts`. It was harvested from the rank labels
> the six original schools' shipped lists already carry (which were researched
> against the 2026 U.S. News tables during the selectivity-rows work, PR #93) —
> zero conflicts existed across the six files — plus three additions researched
> for Covenant Day's list on 2026-08-16, each from a first-party source:
>
> - George Washington University — National Rank #59 (2026 edition):
>   https://gwtoday.gwu.edu/gw-climbs-highest-us-news-world-report-best-colleges-ranking-eight-years
> - Rensselaer Polytechnic Institute — National Rank #64 (2026 edition):
>   https://www.usnews.com/best-colleges/rpi-2803/overall-rankings
> - University of California, Santa Barbara — National Rank #40 (2026 edition):
>   https://www.usnews.com/best-colleges/university-of-california-santa-barbara-1320
>
> **The hard rule this table serves** (user-set, 2026-08-16): every college on a
> school's acceptance list that is tagged into a ranked bucket (`ivy`,
> `ivyplus`, `nu75`, `lac75`) MUST carry its `rankLabel` — the rank shown on the
> right-hand side of the card. `scripts/check_rank_labels.mjs`
> (`npm run check:ranks`, chained into `npm run build`) enforces it, so a future
> school cannot ship the card with rankings missing. When adding a school, take
> labels from this table for consistency; deep-research any college the table
> lacks against the same 2026 U.S. News edition and ADD it here with its source.
>
> Known limitation, deliberately kept: sixteen Power-4 tail universities (LSU,
> SMU, WVU, Mississippi State, Oklahoma State, Kansas State, Iowa State, Texas
> Tech, BYU, Houston, Missouri, Oregon, Utah, ASU, UCF, Cincinnati) appear on
> the six original lists tagged `p4` with no rank label — their ranks were never
> part of the project's table, and current-year searches return conflicting
> figures. They are exempt from the check (p4-only entries), consistently
> unlabeled across all seven schools, rather than half-fixed from noisy sources.

### The table

| Institution | Rank label |
|---|---|
| Agnes Scott College | Liberal Rank #62 |
| Allegheny College | Liberal Rank #72 |
| Amherst College | Liberal Rank #2 |
| Auburn University | National Rank #105 |
| Barnard College | Liberal Rank #22 |
| Bates College | Liberal Rank #21 |
| Baylor University | National Rank #93 |
| Boston College | National Rank #37 |
| Boston University | National Rank #41 |
| Bowdoin College | Liberal Rank #5 |
| Brown University | National Rank #13 |
| Bryn Mawr College | Liberal Rank #29 |
| Bucknell University | Liberal Rank #33 |
| California Institute of Technology | National Rank #11 |
| Carleton College | Liberal Rank #22 |
| Carnegie Mellon University | National Rank #21 |
| Case Western Reserve University | National Rank #51 |
| Centre College | Liberal Rank #55 |
| Claremont McKenna College | Liberal Rank #9 |
| Clemson University | National Rank #57 |
| Colby College | Liberal Rank #18 |
| Colgate University | Liberal Rank #17 |
| College of the Holy Cross | Liberal Rank #33 |
| Colorado College | Liberal Rank #32 |
| Columbia University | National Rank #13 |
| Connecticut College | Liberal Rank #51 |
| Cornell University | National Rank #12 |
| Dartmouth College | National Rank #13 |
| Davidson College | Liberal Rank #13 |
| DePauw University | Liberal Rank #47 |
| Denison University | Liberal Rank #44 |
| Dickinson College | Liberal Rank #42 |
| Duke University | National Rank #7 |
| Emory University | National Rank #24 |
| Florida State University | National Rank #51 |
| Franklin & Marshall College | Liberal Rank #48 |
| Furman University | Liberal Rank #41 |
| Georgetown University | National Rank #24 |
| Georgia Institute of Technology | National Rank #33 |
| Georgia Tech | National Rank #33 |
| Gettysburg College | Liberal Rank #53 |
| Hamilton College | Liberal Rank #15 |
| Harvard University | National Rank #3 |
| Harvey Mudd College | Liberal Rank #25 |
| Haverford College | Liberal Rank #18 |
| Howard University | National Rank #88 |
| Indiana University Bloomington | National Rank #73 |
| Johns Hopkins University | National Rank #6 |
| Kenyon College | Liberal Rank #28 |
| Lafayette College | Liberal Rank #35 |
| Lehigh University | National Rank #51 |
| Macalester College | Liberal Rank #27 |
| Massachusetts Institute of Technology | National Rank #2 |
| Michigan State University | National Rank #63 |
| Middlebury College | Liberal Rank #11 |
| Morehouse College | Liberal Rank #96 |
| Mount Holyoke College | Liberal Rank #30 |
| New York University | National Rank #30 |
| North Carolina State University | National Rank #59 |
| Northeastern University | National Rank #47 |
| Northwestern University | National Rank #6 |
| Oberlin College | Liberal Rank #30 |
| Occidental College | Liberal Rank #48 |
| Pennsylvania State University | National Rank #63 |
| Pomona College | Liberal Rank #4 |
| Princeton University | National Rank #1 |
| Purdue University | National Rank #43 |
| Rhodes College | Liberal Rank #51 |
| Rice University | National Rank #18 |
| Rutgers University | National Rank #63 |
| Scripps College | Liberal Rank #30 |
| Sewanee: The University of the South | Liberal Rank #46 |
| Skidmore College | Liberal Rank #38 |
| Smith College | Liberal Rank #13 |
| Spelman College | Liberal Rank #39 |
| St. Olaf College | Liberal Rank #57 |
| Stanford University | National Rank #4 |
| Swarthmore College | Liberal Rank #4 |
| Syracuse University | National Rank #75 |
| Texas A&M University | National Rank #47 |
| Texas Christian University | National Rank #105 |
| The Ohio State University | National Rank #43 |
| The University of Alabama | National Rank #105 |
| Trinity College | Liberal Rank #37 |
| Tufts University | National Rank #37 |
| Tulane University | National Rank #69 |
| Union College | Liberal Rank #38 |
| United States Air Force Academy | Liberal Rank #5 |
| United States Military Academy | Liberal Rank #13 |
| United States Military Academy at West Point | Liberal Rank #13 |
| United States Naval Academy | Liberal Rank #3 |
| University of Alabama | National Rank #105 |
| University of Arizona | National Rank #75 |
| University of Arkansas | National Rank #147 |
| University of Chicago | National Rank #6 |
| University of Colorado Boulder | National Rank #75 |
| University of Connecticut | National Rank #75 |
| University of Delaware | National Rank #75 |
| University of Florida | National Rank #28 |
| University of Georgia | National Rank #46 |
| University of Illinois at Urbana-Champaign | National Rank #69 |
| University of Iowa | National Rank #92 |
| University of Kansas | National Rank #124 |
| University of Kentucky | National Rank #124 |
| University of Louisville | National Rank #147 |
| University of Maryland | National Rank #46 |
| University of Massachusetts Amherst | National Rank #69 |
| University of Miami | National Rank #59 |
| University of Michigan | National Rank #21 |
| University of Michigan-Ann Arbor | National Rank #21 |
| University of Minnesota | National Rank #69 |
| University of Mississippi | National Rank #147 |
| University of North Carolina at Chapel Hill | National Rank #22 |
| University of Notre Dame | National Rank #18 |
| University of Oklahoma | National Rank #124 |
| University of Pennsylvania | National Rank #7 |
| University of Pittsburgh | National Rank #67 |
| University of Richmond | Liberal Rank #18 |
| University of Rochester | National Rank #51 |
| University of South Carolina | National Rank #121 |
| University of Southern California | National Rank #27 |
| University of Tennessee | National Rank #57 |
| University of Virginia | National Rank #24 |
| University of Washington | National Rank #63 |
| University of Wisconsin-Madison | National Rank #39 |
| Vanderbilt University | National Rank #15 |
| Vassar College | Liberal Rank #12 |
| Villanova University | National Rank #57 |
| Virginia Polytechnic Institute and State University | National Rank #47 |
| Virginia Tech | National Rank #47 |
| Wake Forest University | National Rank #47 |
| Washington University in St. Louis | National Rank #21 |
| Washington and Lee University | Liberal Rank #11 |
| Wellesley College | Liberal Rank #7 |
| Wesleyan University | Liberal Rank #25 |
| William & Mary | National Rank #51 |
| Williams College | Liberal Rank #1 |
| Wofford College | Liberal Rank #57 |
| Yale University | National Rank #4 |
| George Washington University | National Rank #59 | *added 2026-08-16* |
| Rensselaer Polytechnic Institute | National Rank #64 | *added 2026-08-16* |
| University of California (Santa Barbara) | National Rank #40 | *added 2026-08-16* |

## Power-4 tail + HBCU national/LAC ranks (added 2026-08-16)

Added during the Carmel Christian review, when the user asked that **every college
with a genuine US News National Universities or National Liberal Arts rank carry
its label** — closing the "sixteen P4-tail universities unlabeled" limitation noted
above, and labeling HBCUs that hold a National/LAC rank.

**Rule for HBCUs (user-set, 2026-08-16):** an HBCU is labeled **only if it holds a
National Universities OR National Liberal Arts rank**. HBCUs ranked only in the
US News HBCU specialty list or in Regional Universities/Colleges are left
UNLABELED (Norfolk State, NC Central, South Carolina State, Tennessee State,
Winston-Salem State, Xavier LA, Alabama A&M, Albany State, Delaware State,
Elizabeth City State, Fayetteville State, Lincoln PA, Livingstone, Virginia State).

Power-4 tail national universities:

| University | Rank label |
|---|---|
| Southern Methodist University | National Rank #88 |
| University of Missouri | National Rank #102 |
| Brigham Young University | National Rank #110 |
| University of Oregon | National Rank #110 |
| Arizona State University | National Rank #117 |
| Iowa State University | National Rank #117 |
| University of Central Florida | National Rank #117 |
| University of Houston | National Rank #132 |
| University of Utah | National Rank #151 |
| Kansas State University | National Rank #158 |
| University of Cincinnati | National Rank #158 |
| Louisiana State University | National Rank #169 |
| Oklahoma State University | National Rank #198 |
| Texas Tech University | National Rank #198 |
| Mississippi State University | National Rank #208 |
| West Virginia University | National Rank #222 |

HBCUs holding a National/LAC rank (these get labeled):

| HBCU | Rank label | Note |
|---|---|---|
| Howard University | National Rank #88 | already labeled before this pass |
| Florida A&M University | National Rank #92 | also "Florida Agricultural and Mechanical" |
| North Carolina A&T State University | National Rank #232 | all name variants |
| Hampton University | National Rank #273 | |
| Clark Atlanta University | National Rank #329 | |
| Morgan State University | National Rank #329 | |
| Fisk University | Liberal Rank #156 | National Liberal Arts |
| Johnson C. Smith University | Liberal Rank #173 | National Liberal Arts; also "Johnson C Smith" |

**Sourcing caveat:** usnews.com blocked automated profile fetches, so these 2026
numbers were corroborated from US News search snapshots + school/press releases +
two HBCU-list aggregators (agreed across sources). A few remain worth a manual
usnews.com confirm if published verbatim — Texas Tech #198 (vs the #123 *Global*
figure), and the Winston-Salem State National-vs-Regional question (treated here as
Regional → unlabeled). Tennessee State sits in the unranked National band (no
discrete number) → unlabeled.
