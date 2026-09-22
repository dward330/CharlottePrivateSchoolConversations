# US News 2027 — National Universities, harvested from the user's PDF print-out

> **Provenance:** The user printed the live 2027 National Universities ranking
> page to PDF on **2026-09-22, 06:10–06:30 AM** (the page footer carries that
> timestamp on every page) and supplied it during planning. Parsed by Claude Code
> the same day. Two identical copies were supplied; either is fine.
>
> Source page: <https://www.usnews.com/best-colleges/rankings/national-universities>
> Local file: `~/Downloads/2027 Best National Universities Rankings _ US News College Rankings.pdf`
> (130 pages, ~80 MB, **not committed** — bulky binaries stay gitignored per the
> data-provenance standard). The parsed rows are committed as the markdown table
> at the bottom of **this file** — `.gitignore` exempts only `*.md` under
> `source-material/`, so a sidecar `.json` beside it would be silently dropped.

## Edition confirmed

The running header on every page reads **"2027 Best National Universities
Rankings"**, and per-school blurbs carry the verbatim sentence *"In the 2027
edition of Best Colleges, X is ranked No. N in National Universities."* This is
the 2027 edition, not 2026.

## What the PDF contains

- **295 school blocks, all 295 with a rank** — zero missing.
- Ranks span **#1 (MIT) → #308**.
- Ties are marked in the source (`(tie)`) and preserved as plain equal ranks —
  e.g. nine schools share **#299**.

**⚠️ The tail is INCOMPLETE, despite reaching #308.** Only 12 rows sit at ≥#290,
and several schools that rank inside the covered range are absent entirely —
**Iowa State, Louisiana State, UT Dallas**. Treat the harvest as authoritative
for **roughly #1–#299** and as *partial* beyond that. Do not infer "unranked"
from absence.

## How it was parsed, and why the naive read fails

**The rank does NOT sit next to the school name in the text layer.** A block
reads: name → city/state → "N reviews" → blurb → tuition → enrollment → then
`inNational Universities#27`. A regex that grabs the nearest `#N` picks up the
*previous* school's rank.

Two further traps:

1. **Only 9 `inNational Universities#N` markers match before cleanup.** Page
   furniture (the `9/22/26, 6:10 AM …` header and the `…/130` footer) splits
   blocks across page boundaries. Strip that furniture first — the count then
   rises to **310 markers**.
2. **A greedy sentence regex spans page breaks** and swallows tuition figures and
   URLs into the captured school name.

The method that worked: strip page furniture, locate each school block by the
`Name \n City, ST \n N reviews` header, then take the **first rank marker inside
that block's own span** — the same "parse inside the card's own block" discipline
[`boardingranks.md`](../../../.claude/plans/boardingranks.md) records for Niche.

## Cross-validation

The block pairing was checked against an **independent** signal — the verbatim
*"In the 2027 edition … ranked No. N"* sentences, which are a different text run
from the `inNational Universities#N` marker.

**106 overlapping rows compared: 106 agree, 0 disagree.**

Spot-anchors: **MIT #1**, **Princeton #2**, **Harvard #3**, **Yale #4**,
**Caltech #5**, **Georgia Tech #29**, **Duke #8** (independently confirmed live
in a headed browser during planning).

## Coverage against our master table

Against the 326 National rows in `src/data/collegeRankings.ts`:

| | Count |
|---|---|
| Resolved from this PDF (incl. campus/parenthetical aliasing) | **234** |
| Still needing a fetch | **92** |

Of the 234 resolved, **203 changed and only 16 held** — a **93% churn rate**,
consistent with a methodology-change year.

**Many of the 92 are alias artifacts, not genuine gaps.** U.S. News writes campus
names with a `--` suffix or a different formal style, which normalizes away from
our canonical keys:

| Our key | The PDF's spelling | 2027 |
|---|---|---|
| `Georgia Tech` | Georgia Institute of Technology | #29 |
| `College of William and Mary` | William & Mary | #52 |
| `Virginia Polytechnic Institute and State University` | Virginia Tech | #52 |
| `SUNY at Binghamton` | Binghamton University--SUNY | #73 |
| `SUNY Buffalo` | University at Buffalo--SUNY | #85 |
| `Rensselaer Polytechnic Inst.` | Rensselaer Polytechnic Institute | #69 |
| `Purdue University` | Purdue University--Main Campus | #55 |
| `Rutgers University` | Rutgers University--New Brunswick | #44 |
| `Tulane University` | Tulane University of Louisiana | #59 |
| `University of NC at Chapel Hill` | University of North Carolina--Chapel Hill | #27 |
| `University of Maryland` | University of Maryland, College Park | #49 |
| `University of Illinois` | University of Illinois Urbana-Champaign | #34 |
| `University of Hawaii` | University of Hawaii at Manoa | #186 |
| `Miami University (Ohio)` | Miami University--Oxford | #133 |

**Resolve these by alias against the harvest before fetching anything** — each one
resolved is a profile fetch avoided, and the ban risk scales with fetch count.

Absent from this PDF and needing a live fetch: **Iowa State, Louisiana State, UT
Dallas**, plus the deep tail (old rank >#300) and every row whose 2026 label is a
band (`#395-434`).

> **Resolved 2026-09-22 (implementation).** All three ARE ranked in 2027 — Iowa
> State **#116** (as *Iowa State University of Science and Technology*), LSU
> **#202** (*…and Agricultural & Mechanical College*), UT Dallas **#121** (*The
> University of Texas--Dallas*). They were missing from the print-out, not from
> the ranking, which is the concrete case for the rule above: **never infer
> "unranked" from absence.** All three came from the live National list page.

## ⛔ Liberal Arts is NOT covered

This PDF is the **National Universities** table only. The master's **123 National
Liberal Arts** rows — Williams, Amherst, Davidson, Swarthmore and the rest — are
**entirely unfetched**. That is a separate ranking page and a separate print-out
or scrape.

## The harvested rows

All 295, sorted by rank. This table IS the committed data — `.gitignore` exempts
only `.md` under `source-material/`, so a sidecar `.json` would be silently dropped.
Ties appear as repeated ranks, exactly as U.S. News publishes them.

| Rank | Institution (US News 2027 spelling) | Location |
|---|---|---|
| #1 | Massachusetts Institute of Technology | Cambridge, MA |
| #2 | Princeton University | Princeton, NJ |
| #3 | Harvard University | Cambridge, MA |
| #4 | Yale University | New Haven, CT |
| #5 | California Institute of Technology | Pasadena, CA |
| #5 | Stanford University | Stanford, CA |
| #7 | University of Pennsylvania | Philadelphia, PA |
| #8 | Duke University | Durham, NC |
| #9 | Johns Hopkins University | Baltimore, MD |
| #9 | Northwestern University | Evanston, IL |
| #9 | University of Chicago | Chicago, IL |
| #12 | Columbia University | New York, NY |
| #12 | Dartmouth College | Hanover, NH |
| #14 | Carnegie Mellon University | Pittsburgh, PA |
| #14 | Cornell University | Ithaca, NY |
| #16 | Brown University | Providence, RI |
| #16 | Rice University | Houston, TX |
| #16 | Vanderbilt University | Nashville, TN |
| #16 | Washington University in St. Louis | St. Louis, MO |
| #20 | University of California, Berkeley | Berkeley, CA |
| #20 | University of California, Los Angeles | Los Angeles, CA |
| #20 | University of Notre Dame | Notre Dame, IN |
| #23 | Emory University | Atlanta, GA |
| #23 | Georgetown University | Washington, DC |
| #25 | University of Michigan--Ann Arbor | Ann Arbor, MI |
| #26 | University of Virginia | Charlottesville, VA |
| #27 | University of North Carolina--Chapel Hill | Chapel Hill, NC |
| #27 | University of Southern California | Los Angeles, CA |
| #29 | Georgia Institute of Technology | Atlanta, GA |
| #29 | University of California San Diego | La Jolla, CA |
| #31 | Boston College | Chestnut Hill, MA |
| #31 | New York University | New York, NY |
| #31 | Tufts University | Medford, MA |
| #34 | Boston University | Boston, MA |
| #34 | The University of Texas--Austin | Austin, TX |
| #34 | University of California, Davis | Davis, CA |
| #34 | University of California, Irvine | Irvine, CA |
| #34 | University of Florida | Gainesville, FL |
| #34 | University of Illinois Urbana-Champaign | Champaign, IL |
| #34 | University of Wisconsin--Madison | Madison, WI |
| #34 | Wake Forest University | Winston Salem, NC |
| #42 | Northeastern University | Boston, MA |
| #42 | Villanova University | Villanova, PA |
| #44 | Case Western Reserve University | Cleveland, OH |
| #44 | Lehigh University | Bethlehem, PA |
| #44 | Rutgers University--New Brunswick | Piscataway, NJ |
| #44 | The Ohio State University | Columbus, OH |
| #44 | University of California, Santa Barbara | Santa Barbara, CA |
| #49 | University of Maryland, College Park | College Park, MD |
| #49 | University of Rochester | Rochester, NY |
| #49 | University of Washington | Seattle, WA |
| #52 | University of Georgia | Athens, GA |
| #52 | Virginia Tech | Blacksburg, VA |
| #52 | William & Mary | Williamsburg, VA |
| #55 | Purdue University--Main Campus | West Lafayette, IN |
| #55 | Santa Clara University | Santa Clara, CA |
| #55 | University Park | University Park, PA |
| #55 | University of Miami | Coral Gables, FL |
| #59 | Brandeis University | Waltham, MA |
| #59 | Florida State University | Tallahassee, FL |
| #59 | George Washington University | Washington, DC |
| #59 | Stevens Institute of Technology | Hoboken, NJ |
| #59 | Stony Brook University--SUNY | Stony Brook, NY |
| #59 | Texas A&M University | College Station, TX |
| #59 | Tulane University of Louisiana | New Orleans, LA |
| #59 | University of Massachusetts--Amherst | Amherst, MA |
| #59 | University of Minnesota--Twin Cities | Minneapolis, MN |
| #59 | University of Pittsburgh | Pittsburgh, PA |
| #69 | Michigan State University | East Lansing, MI |
| #69 | Rensselaer Polytechnic Institute | Troy, NY |
| #69 | University of California, Merced | Merced, CA |
| #72 | Syracuse University | Syracuse, NY |
| #73 | Binghamton University--SUNY | Binghamton, NY |
| #73 | Howard University | Washington, DC |
| #73 | Indiana University--Bloomington | Bloomington, IN |
| #73 | North Carolina State University | Raleigh, NC |
| #73 | Rutgers University--Newark | Newark, NJ |
| #73 | University of Connecticut | Storrs, CT |
| #73 | Worcester Polytechnic Institute | Worcester, MA |
| #80 | Clemson University | Clemson, SC |
| #80 | Colorado School of Mines | Golden, CO |
| #80 | Drexel University | Philadelphia, PA |
| #80 | Pepperdine University | Malibu, CA |
| #80 | University of California, Riverside | Riverside, CA |
| #85 | Fordham University | New York, NY |
| #85 | New Jersey Institute of Technology | Newark, NJ |
| #85 | Southern Methodist University | Dallas, TX |
| #85 | University at Buffalo--SUNY | Buffalo, NY |
| #85 | University of Delaware | Newark, DE |
| #90 | Baylor University | Waco, TX |
| #90 | Gonzaga University | Spokane, WA |
| #90 | Marquette University | Milwaukee, WI |
| #90 | Texas Christian University | Fort Worth, TX |
| #90 | Yeshiva University | New York, NY |
| #95 | American University | Washington, DC |
| #95 | Rochester Institute of Technology | Rochester, NY |
| #95 | Rutgers University--Camden | Camden, NJ |
| #95 | University of Illinois Chicago | Chicago, IL |
| #95 | University of Missouri | Columbia, MO |
| #100 | Auburn University | Auburn, AL |
| #100 | Chapman University | Orange, CA |
| #100 | Creighton University | Omaha, NE |
| #100 | Elon University | Elon, NC |
| #100 | Florida International University | Miami, FL |
| #100 | Saint Louis University | St. Louis, MO |
| #100 | University of Iowa | Iowa City, IA |
| #100 | University of San Diego | San Diego, CA |
| #100 | University of South Florida | Tampa, FL |
| #109 | Fairfield University | Fairfield, CT |
| #109 | Loyola Marymount University | Los Angeles, CA |
| #109 | Temple University | Philadelphia, PA |
| #109 | University of California, Santa Cruz | Santa Cruz, CA |
| #109 | University of Colorado Boulder | Boulder, CO |
| #109 | University of New Hampshire | Durham, NH |
| #109 | University of Tennessee--Knoxville | Knoxville, TN |
| #116 | Brigham Young University | Provo, UT |
| #116 | Technology | Ames, IA |
| #116 | The University of Oklahoma | Norman, OK |
| #116 | University of Oregon | Eugene, OR |
| #116 | University of San Francisco | San Francisco, CA |
| #121 | Arizona State University | Tempe, AZ |
| #121 | George Mason University | Fairfax, VA |
| #121 | Illinois Institute of Technology | Chicago, IL |
| #121 | Loyola University Chicago | Chicago, IL |
| #121 | University at Albany--SUNY | Albany, NY |
| #121 | University of Arizona | Tucson, AZ |
| #121 | University of Central Florida | Orlando, FL |
| #121 | University of Dayton | Dayton, OH |
| #121 | University of Denver | Denver, CO |
| #121 | University of South Carolina | Columbia, SC |
| #121 | University of the Pacific | Stockton, CA |
| #133 | Clark University | Worcester, MA |
| #133 | Miami University--Oxford | Oxford, OH |
| #133 | Thomas Jefferson University | Philadelphia, PA |
| #133 | University of Vermont | Burlington, VT |
| #137 | California State University, Long Beach | Long Beach, CA |
| #137 | Clarkson University | Potsdam, NY |
| #137 | James Madison University | Harrisonburg, VA |
| #137 | Saint Joseph's University | Philadelphia, PA |
| #137 | San Diego State University | San Diego, CA |
| #137 | San Jose State University | San Jose, CA |
| #137 | St. John's University | Queens, NY |
| #137 | University of Alabama at Birmingham | Birmingham, AL |
| #137 | University of Houston | Houston, TX |
| #137 | University of Maryland Baltimore County | Baltimore, MD |
| #137 | University of Scranton | Scranton, PA |
| #148 | California State University--Los Angeles | Los Angeles, CA |
| #148 | Mercer University | Macon, GA |
| #148 | The Catholic University of America | Washington, DC |
| #148 | University of Kansas | Lawrence, KS |
| #148 | University of Kentucky | Lexington, KY |
| #148 | University of Massachusetts--Lowell | Lowell, MA |
| #148 | University of Rhode Island | Kingston, RI |
| #148 | University of Tulsa | Tulsa, OK |
| #156 | CUNY--City College | New York, NY |
| #156 | California State University--Fullerton | Fullerton, CA |
| #156 | Duquesne University | Pittsburgh, PA |
| #156 | Florida A&M University | Tallahassee, FL |
| #156 | Kansas State University | Manhattan, KS |
| #156 | Montclair State University | Montclair, NJ |
| #156 | Oregon State University | Corvallis, OR |
| #156 | Quinnipiac University | Hamden, CT |
| #156 | Seton Hall University | South Orange, NJ |
| #156 | The University of Alabama | Tuscaloosa, AL |
| #156 | University of Portland | Portland, OR |
| #156 | University of St. Thomas | St. Paul, MN |
| #156 | Virginia Commonwealth University | Richmond, VA |
| #169 | Bradley University | Peoria, IL |
| #169 | Butler University | Indianapolis, IN |
| #169 | Charlotte | Charlotte, NC |
| #169 | Colorado State University | Fort Collins, CO |
| #169 | DePaul University | Chicago, IL |
| #169 | Michigan Technological University | Houghton, MI |
| #169 | Simmons University | Boston, MA |
| #169 | Touro University | New York, NY |
| #169 | University of Nebraska -- Lincoln | Lincoln, NE |
| #179 | CUNY--Hunter College | New York, NY |
| #179 | Gallaudet University | Washington, DC |
| #179 | Seattle University | Seattle, WA |
| #179 | University of Cincinnati | Cincinnati, OH |
| #179 | University of Louisville | Louisville, KY |
| #179 | University of Mississippi | University, MS |
| #179 | University of Utah | Salt Lake City, UT |
| #186 | California Lutheran University | Thousand Oaks, CA |
| #186 | Texas Tech University | Lubbock, TX |
| #186 | University of Detroit Mercy | Detroit, MI |
| #186 | University of Hawaii at Manoa | Honolulu, HI |
| #186 | Wayne State University | Detroit, MI |
| #191 | Adelphi University | Garden City, NY |
| #191 | Drake University | Des Moines, IA |
| #191 | Florida Atlantic University | Boca Raton, FL |
| #191 | Georgia State University | Atlanta, GA |
| #191 | Hofstra University | Hempstead, NY |
| #191 | Oklahoma State University | Stillwater, OK |
| #191 | Rowan University | Glassboro, NJ |
| #191 | Samford University | Birmingham, AL |
| #191 | Technology | Rolla, MO |
| #191 | University of Arkansas | Fayetteville, AR |
| #191 | Washington State University | Pullman, WA |
| #202 | East Carolina University | Greenville, NC |
| #202 | Mechanical College | Baton Rouge, LA |
| #202 | Ohio University | Athens, OH |
| #202 | Sacred Heart University | Fairfield, CT |
| #202 | University of Massachusetts--Boston | Boston, MA |
| #208 | Belmont University | Nashville, TN |
| #208 | California State University--Fresno | Fresno, CA |
| #208 | California State University--Sacramento | Sacramento, CA |
| #208 | Mississippi State University | Mississippi State, MS |
| #208 | University of Idaho | Moscow, ID |
| #208 | University of La Verne | La Verne, CA |
| #208 | University of North Carolina--Greensboro | Greensboro, NC |
| #208 | University of North Texas | Denton, TX |
| #208 | Willamette University | Salem, OR |
| #208 | Xavier University | Cincinnati, OH |
| #219 | Gannon University | Erie, PA |
| #219 | Illinois State University | Normal, IL |
| #219 | Indiana University Indianapolis | Indianapolis, IN |
| #219 | New York Institute of Technology | Old Westbury, NY |
| #219 | Robert Morris University | Moon Township, PA |
| #219 | State University | Greensboro, NC |
| #219 | University of Nevada--Reno | Reno, NV |
| #219 | University of North Carolina--Wilmington | Wilmington, NC |
| #227 | Ball State University | Muncie, IN |
| #227 | Russell Sage College | Troy, NY |
| #227 | San Francisco State University | San Francisco, CA |
| #227 | The University of Texas--San Antonio | San Antonio, TX |
| #227 | University of Michigan--Dearborn | Dearborn, MI |
| #227 | University of North Dakota | Grand Forks, ND |
| #227 | West Chester University of Pennsylvania | West Chester, PA |
| #227 | West Virginia University | Morgantown, WV |
| #236 | Bethel University | St. Paul, MN |
| #236 | Chatham University | Pittsburgh, PA |
| #236 | Florida Institute of Technology | Melbourne, FL |
| #236 | Kent State University | Kent, OH |
| #236 | North Dakota State University | Fargo, ND |
| #236 | Pacific University | Forest Grove, OR |
| #236 | Portland State University | Portland, OR |
| #236 | Slippery Rock University of Pennsylvania | Slippery Rock, PA |
| #236 | Stetson University | DeLand, FL |
| #236 | The University of Texas--Arlington | Arlington, TX |
| #236 | University of New Mexico | Albuquerque, NM |
| #236 | University of North Florida | Jacksonville, FL |
| #250 | La Salle University | Philadelphia, PA |
| #250 | Lipscomb University | Nashville, TN |
| #250 | New Mexico State University | Las Cruces, NM |
| #250 | Nova Southeastern University | Fort Lauderdale, FL |
| #250 | Oakland City University | Oakland City, IN |
| #250 | Pace University | New York, NY |
| #250 | South Dakota State University | Brookings, SD |
| #250 | University of Massachusetts Dartmouth | North Dartmouth, MA |
| #250 | University of Missouri--Kansas City | Kansas City, MO |
| #250 | University of Wyoming | Laramie, WY |
| #250 | Valley | Edinburg, TX |
| #262 | Andrews University | Berrien Springs, MI |
| #262 | Central Michigan University | Mt. Pleasant, MI |
| #262 | DeSales University | Center Valley, PA |
| #262 | George Fox University | Newberg, OR |
| #262 | Seattle Pacific University | Seattle, WA |
| #262 | Suffolk University | Boston, MA |
| #262 | The University of Texas--El Paso | El Paso, TX |
| #262 | University of Alabama at Huntsville | Huntsville, AL |
| #262 | University of Maine | Orono, ME |
| #262 | University of New England | Biddeford, ME |
| #262 | University of South Dakota | Vermillion, SD |
| #262 | Western New England University | Springfield, MA |
| #276 | Bowling Green State University | Bowling Green, OH |
| #276 | California Baptist University | Riverside, CA |
| #276 | Harding University | Searcy, AR |
| #276 | Marymount University | Arlington, VA |
| #276 | Northern Arizona University | Flagstaff, AZ |
| #276 | University of Missouri--St. Louis | Saint Louis, MO |
| #276 | University of New Haven | West Haven, CT |
| #276 | University of St. Francis | Joliet, IL |
| #276 | Western Michigan University | Kalamazoo, MI |
| #276 | Widener University | Chester, PA |
| #288 | Biola University | La Mirada, CA |
| #288 | Shenandoah University | Winchester, VA |
| #288 | Southern Illinois University--Carbondale | Carbondale, IL |
| #288 | Texas State University | San Marcos, TX |
| #288 | University of Hartford | West Hartford, CT |
| #288 | University of Memphis | Memphis, TN |
| #288 | University of Wisconsin--Milwaukee | Milwaukee, WI |
| #288 | Wichita State University | Wichita, KS |
| #299 | Azusa Pacific University | Azusa, CA |
| #299 | Boise State University | Boise, ID |
| #299 | Concordia University Wisconsin | Mequon, WI |
| #299 | Saint Mary's University of Minnesota | Winona, MN |
| #299 | Southern Connecticut State University | New Haven, CT |
| #299 | Tennessee Tech University | Cookeville, TN |
| #299 | The University of Toledo | Toledo, OH |
| #299 | University of Nebraska Omaha | Omaha, NE |
| #299 | Utica University | Utica, NY |
| #308 | Abilene Christian University | Abilene, TX |
| #308 | Maryville University of St. Louis | St Louis, MO |
| #308 | Montana State University | Bozeman, MT |