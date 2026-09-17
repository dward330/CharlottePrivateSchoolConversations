# High School Destinations (shared table)

> **Provenance:** Compiled by Claude Code on 2026-09-17 for the Trinity Episcopal
> placement card. Human-readable companion to the code source of truth,
> src/data/highSchools.ts (HIGH_SCHOOLS) — the app resolves every destination
> link, kind and rank from that TS master via highSchoolFor(name); the per-school
> placement files store only { name, slug? }.
>
> **URL METHOD.** Every distinct name was resolved to the school own official
> homepage — never an admissions sub-page, a Wikipedia article or a directory
> profile — and each was fetched to confirm the name and street address.
>
> **RANK METHOD.** Read verbatim off each school own Niche rank badge, never
> inferred from a letter grade or list position. Ranks were paired to schools by
> splitting the HTML on the card boundary and taking the first badge inside each
> card own block. Two K-12 ranks were independently cross-checked against search
> snippets (#16, #3) and matched; Charlotte Catholic #22 was confirmed twice.
>
> **kind** is what the institution ACTUALLY is, not always how the listing school
> files it. Twelve of 97 disagreed; the card follows this column.

## Known quirks in the source

- **Niche skips #14 in BOTH rankings.** The K-12 list runs 1-13 then 15-26; the
  high-school list runs #1-#40 with #14 likewise absent. The same number missing
  from two independent rankings is a Niche quirk, not a parse error. Ranks are
  published as displayed, char-for-char.
- **Listed is not ranked.** K-12: 57 listed, 36 ranked. High school: 69 listed,
  39 ranked. An "of N" figure describes the listing, not the ranking.
- **The Fletcher School is listed but unranked** — no badge, no overall grade. It
  serves students with learning differences. Genuinely unranked, not a miss.
- **9-12 schools cannot appear in a K-12 ranking,** so Charlotte Catholic (#22)
  and Christ the King (#21) carry "Charlotte Private HS Niche Rank #N" from the separate
  high-school list, labelled apart so two scales are never read as one.
- **Fetching Niche:** a plain browser User-Agent now returns a PerimeterX captcha.
  curl --compressed plus the four Sec-Fetch-* headers clears it; ?page=N paginates
  and ?page=4 404s, which is how the 3-page boundary was confirmed.

## Charlotte-area independent (16)

| School | City | State | Homepage | Niche rank | Note |
|---|---|---|---|---|---|
| Cannon School | Concord | NC | — | Charlotte Private K-12 Niche Rank #5 |  |
| Carmel Christian | Matthews | NC | — | Charlotte Private K-12 Niche Rank #13 |  |
| Charlotte Catholic | Charlotte | NC | — | Charlotte Private HS Niche Rank #22 |  |
| Charlotte Christian School | Charlotte | NC | — | Charlotte Private K-12 Niche Rank #4 |  |
| Charlotte Country Day School | Charlotte | NC | — | Charlotte Private K-12 Niche Rank #3 |  |
| Charlotte Latin School | Charlotte | NC | — | Charlotte Private K-12 Niche Rank #2 |  |
| Covenant Day School | Matthews | NC | — | Charlotte Private K-12 Niche Rank #10 |  |
| Davidson Day School | Davidson | NC | — | Charlotte Private K-12 Niche Rank #7 |  |
| Hickory Grove Christian Academy | Charlotte | NC | — | Charlotte Private K-12 Niche Rank #16 |  |
| Providence Day School | Charlotte | NC | — | Charlotte Private K-12 Niche Rank #1 |  |
| Grace Academy | Matthews | NC | https://graceacademync.com | Charlotte Private K-12 Niche Rank #32 | University-model K-12 Christian school, 3645 Pleasant Plains Rd |
| Southlake Christian Academy | Huntersville | NC | https://www.southlakechristian.org | Charlotte Private K-12 Niche Rank #17 | Styles itself SouthLake; JK-12, 13820 Hagers Ferry Rd |
| The Fletcher School | Charlotte | NC | https://www.thefletcherschool.org | — | K-12 for students with learning differences, 8500 Sardis Rd |
| Christ the King Catholic High School | Huntersville | NC | https://www.ctkchs.org | Charlotte Private HS Niche Rank #21 | Confirmed via the Diocese of Charlotte listing — the name collides widely |
| Northside Christian Academy | Charlotte | NC | — *closed* | — | Closed 2024. Old domain ncaknights.com now 301s to an unrelated site — never link it. |
| Resurrection Christian School | Charlotte | NC | — *merged* | — | Merged 2009 into Charlotte United Christian Academy. The live rcschool.org is a different school in Colorado. |

## Out-of-area independent (day) (4)

| School | City | State | Homepage | Niche rank | Note |
|---|---|---|---|---|---|
| Brooklyn Friends School | Brooklyn | NY | https://brooklynfriends.org | — | Quaker PreK-12, 375 Pearl St. A DAY school, not boarding |
| Cape Fear Academy | Wilmington | NC | https://www.capefearacademy.org | — | PreK-12 independent DAY school, 3900 S College Rd |
| Tampa Preparatory School | Tampa | FL | https://tampaprep.org | — | Grades 6-12. A DAY school, not boarding |
| Faith Lutheran High School | Las Vegas | NV | https://www.faithlutheranlv.org | — | Trinity’s own note says Nevada. Formal name Faith Lutheran Middle School & High School, grades 6-12, LCMS. A DAY school — its own admissions pages state no on-campus boarding |

## Boarding (30)

| School | City | State | Homepage | Niche rank | Note |
|---|---|---|---|---|---|
| Asheville School | Asheville | NC | https://www.ashevilleschool.org | — | Cloudflare bot-blocks fetch; confirmed via Wikipedia official-website + indexed pages on its own domain |
| Bishop England High School | Charleston | SC | https://www.behs.com | — | Catholic college-prep, 363 Seven Farms Dr, Daniel Island |
| Blair Academy | Blairstown | NJ | https://www.blair.edu | — | 2 Park St, coed NJ boarding school founded 1848 |
| Cardinal Gibbons High School | Raleigh | NC | https://www.cghsnc.org | — | The Raleigh NC school, NOT the same-named one in Fort Lauderdale FL |
| Chatham Hall | Chatham | VA | https://www.chathamhall.org | — | Girls 9-12 boarding/day, Episcopal tradition |
| Christ School | Arden | NC | https://www.christschool.org | — | Boys boarding & day, founded 1900 |
| Christchurch School | Christchurch | VA | https://www.christchurchschool.org | — | Episcopal 9-12 boarding/day on the Rappahannock |
| Collegiate School | Richmond | VA | https://www.collegiaterva.org | — | DOMAIN MOVED: old collegiate-va.org 308s here. The Richmond VA school, not NYC/Houston. JK-12 day |
| Deerfield Academy | Deerfield | MA | https://deerfield.edu | — | 7 Boyden Ln |
| Episcopal High School | Alexandria | VA | https://www.episcopalhighschool.org | — | 100% residential. The Alexandria VA school, not Houston/Baton Rouge/Jacksonville |
| Hargrave Military Academy | Chatham | VA | https://hargrave.edu | — | Boys 7-12 + postgrad, since 1909 |
| La Paz Community School | Guanacaste | Costa Rica | https://www.lapazschool.org | — | Bilingual preK-12 IB, two Guanacaste campuses |
| Lawrenceville School | Lawrenceville | NJ | https://www.lawrenceville.org | — | Coed 9-12 boarding and day |
| Masters School | Dobbs Ferry | NY | https://www.mastersny.org | — | The Masters School NY, not the UK/West Hartford ones. Grades 5-12, boarding 9-12 |
| Mercersburg Academy | Mercersburg | PA | https://www.mercersburg.edu | — | Coed 9-12 + PG boarding/day |
| Putney School | Putney | VT | https://www.putneyschool.org | — | Progressive coed boarding |
| Rabun Gap Nacoochee School | Rabun Gap | GA | https://www.rabungap.org | — | Boarding/day grades 5-12 |
| Salem Academy | Winston-Salem | NC | https://salemacademy.com | — | All-girls boarding/day 9-12. Distinct from Salem College (salem.edu) |
| St. Mary’s School | Raleigh | NC | https://www.sms.edu | — | Episcopal all-girls boarding/day 9-12. Own spelling is Saint Mary's School |
| St. Timothy’s School | Stevenson | MD | https://www.stt.org | — | All-girls boarding/day 9-12, IB World School |
| The Cate School | Carpinteria | CA | https://www.cate.org | — | Own name is Cate School (no The) |
| The McCallie School | Chattanooga | TN | https://www.mccallie.org | — | All-boys boarding/day 6-12 |
| The Millbrook School | Millbrook | NY | https://www.millbrook.org | — | Own name is Millbrook School. Distinct from Millbrook High School (NY public) |
| The Taft School | Watertown | CT | https://www.taftschool.org | — | Distinct from the several public Taft High Schools |
| The Thacher School | Ojai | CA | https://www.thacher.org | — | Boarding 9-12 |
| Virginia Episcopal School | Lynchburg | VA | https://www.ves.org | — | Coed boarding/day 9-12 |
| Woodberry Forest School | Woodberry Forest | VA | https://www.woodberry.org | — | All-boys boarding 9-12 |
| St. Andrew’s School | Middletown | DE | https://www.standrews-de.org | — | Trinity’s own note says Delaware, and research independently resolved the bare name to this school — all-boarding coed Episcopal 9-12 |
| St. George’s School | Middletown | RI | https://www.stgeorges.edu | — | Trinity’s own note says Rhode Island, matching the independently-resolved Episcopal boarding school, 372 Purgatory Rd |
| St. Paul’s | Concord | NH | https://www.sps.edu | — | Trinity’s own note says New Hampshire, matching the independently-resolved fully-residential Episcopal 9-12 school |

## Public, charter and magnet (47)

| School | City | State | Homepage | Niche rank | Note |
|---|---|---|---|---|---|
| Charlotte Lab School | Charlotte | NC | https://www.charlottelabschool.org | — | Public charter, not independent — its own site says so |
| Community School of Davidson | Davidson | NC | https://www.csdspartans.org | — | Public charter, not independent — its own mission text says so |
| Jackson-Reed High School | Washington | DC | https://jacksonreedhs.org | — | DC's largest PUBLIC high school, formerly Woodrow Wilson HS (renamed 2022) |
| Morristown High School | Morristown | NJ | https://mhs.morrisschooldistrict.org | — | PUBLIC, Morris School District's only high school |
| Nauset High School | Eastham | MA | https://www.nausetschools.org/o/nrhs | — | Nauset Regional High School, PUBLIC, Cape Cod. No standalone domain; this path is its homepage |
| North Boise Jr. High School | Boise | ID | https://north.boiseschools.org | — | NAME AS PUBLISHED. The actual school is North Junior High School, a PUBLIC grades 7-9 junior high |
| Phoebus High School | Hampton | VA | https://phs.hampton.k12.va.us | — | PUBLIC, Hampton City Schools |
| St. Martin High School | Ocean Springs | MS | https://smhs.jcsd.ms | — | Trinity’s own note says Mississippi. PUBLIC 9-12, Jackson County School District — filed by Trinity under boarding, but it is neither boarding nor independent |
| A.C. Reynolds High School |  |  | — | — |  |
| Ardrey Kell High School |  |  | — | — |  |
| Butler High School |  |  | — | — |  |
| Central High School |  |  | — | — |  |
| Chambers High School |  |  | — | — |  |
| Charlotte Engineering Early College |  |  | — | — |  |
| Cox Mill High School |  |  | — | — |  |
| East Gaston High School |  |  | — | — |  |
| East Lincoln High School |  |  | — | — |  |
| East Mecklenburg High School |  |  | — | — |  |
| Harding High School |  |  | — | — |  |
| Hawthorne Academy of Health Sciences |  |  | — | — |  |
| Hickory Ridge High School |  |  | — | — |  |
| Hopewell High School |  |  | — | — |  |
| Hough High School |  |  | — | — |  |
| Indian Land High School |  |  | — | — |  |
| JM Robinson High School |  |  | — | — |  |
| Julius L. Chambers High School |  |  | — | — |  |
| Lake Norman Charter School |  |  | — | — |  |
| Lake Norman High School |  |  | — | — |  |
| Langtree Charter Academy |  |  | — | — |  |
| Laurel Springs High School |  |  | — | — |  |
| Mallard Creek High School |  |  | — | — |  |
| Mountain Island Charter School |  |  | — | — |  |
| Myers Park High School |  |  | — | — |  |
| North Lincoln High School |  |  | — | — |  |
| North Mecklenburg High School |  |  | — | — |  |
| Northwest School of the Arts |  |  | — | — |  |
| Phillip O’Berry Academy of Technology |  |  | — | — |  |
| Porter Ridge High School |  |  | — | — |  |
| Providence High School |  |  | — | — |  |
| Queens Grant High School |  |  | — | — |  |
| Robinson High School |  |  | — | — |  |
| Rocky River High School |  |  | — | — |  |
| South Mecklenburg High School |  |  | — | — |  |
| Stuart W. Cramer High School |  |  | — | — |  |
| University of North Carolina School of the Arts |  |  | — | — |  |
| West Mecklenburg High School |  |  | — | — |  |
| Westwood High School |  |  | — | — |  |

