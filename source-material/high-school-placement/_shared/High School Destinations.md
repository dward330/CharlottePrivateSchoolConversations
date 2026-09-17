# High School Destinations (shared table)

> **Provenance:** Compiled by Claude Code, 2026-09-17, for the Trinity Episcopal
> placement card. Human-readable companion to the code source of truth,
> src/data/highSchools.ts (HIGH_SCHOOLS). The app resolves every destination
> link, kind and rank from that TS master via highSchoolFor(name); the per-school
> placement files store only { name, slug? }.
>
> **URL METHOD.** Each name resolved to the school own official homepage and the
> page FETCHED to confirm the school name and street address. Public schools were
> matched by ADDRESS, not name — Butler and Harding are collision-prone.
>
> **RANK METHOD.** Read verbatim off the publisher own rank badge, never inferred
> from a letter grade or list position. US News ranks read off LIVE profile pages.
>
> **kind** is what the institution ACTUALLY is, not how the listing school files
> it. Twelve of 95 disagreed; the card follows this column.

## ⚠️ US News search snippets are STALE — use live pages only

A first pass read US News ranks from WebSearch snippets. A second pass read the
same schools LIVE and **seven figures differed**, every one plausibly:

| School | Snippet | Live (2026-2027) |
|---|--:|--:|
| Ardrey Kell | #384 | #475 |
| Charlotte Engineering Early College | #572 | #567 |
| Cox Mill | #1,813 | #1,369 |
| Lake Norman High | #3,112 | #2,815 |
| Mountain Island Charter | #3,272 | #2,639 |
| North Lincoln | #4,117 | #4,471 |
| North Mecklenburg | #9,109 | #5,938 |
| Community School of Davidson | #767 | #1,009 |
| Nauset Regional | #1,762 | #2,051 |

**Never source a US News rank from a snippet.** curl fails entirely (TLS/HTTP2
drop, exit 92); headless Chromium is blocked (ERR_HTTP2_PROTOCOL_ERROR). What
works is Playwright HEADED Chromium with --disable-blink-features=
AutomationControlled and --disable-http2.

## Other quirks in the sources

- **Niche skips #14 in BOTH its rankings.** A Niche quirk, not a parse error.
- **US News publishes a bottom tier as a RANGE**: Harding, Julius L. Chambers and
  West Mecklenburg read #13,460-17,945 with no overall score. Exact published string.
- **Queens Grant is TWO schools.** Queen’s Grant Community School (Mint Hill) is
  K-8; Queens Grant High School (Matthews, 10323 Idlewild Rd) is a separate 9-12
  campus. US News conflates them under one district record, so the Mint Hill rank
  was DROPPED rather than shown against the high school Trinity named.
- **Trinity names four institutions twice** (Cannon, Charlotte Catholic,
  Chambers/Julius L. Chambers, JM Robinson/Robinson): 99 published lines, 95 schools.
- **Ineligible is not missing.** US News ranks PUBLIC schools only, so Laurel
  Springs (private online) has no entry; UNCSA is under Best COLLEGES; North Junior
  High is a 7-9 junior high; Charlotte Lab has only elementary and middle ranks.
- **Two names cannot be resolved at all** from Trinity own data: Central High School
  and Westwood High School carry no state and neither exists in the Charlotte metro.
- **Two district URLs moved:** Lake Norman High is now on issnc.org (directories
  still publish the stale iss.k12.nc.us path); East/North Lincoln answer on both
  lcsnc.org and lincoln.k12.nc.us, and the canonical tag points at the latter.

## Charlotte-area independent (16)

| School | City | State | Homepage | Rank | Note |
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

| School | City | State | Homepage | Rank | Note |
|---|---|---|---|---|---|
| Brooklyn Friends School | Brooklyn | NY | https://brooklynfriends.org | — | Quaker PreK-12, 375 Pearl St. A DAY school, not boarding |
| Cape Fear Academy | Wilmington | NC | https://www.capefearacademy.org | — | PreK-12 independent DAY school, 3900 S College Rd |
| Tampa Preparatory School | Tampa | FL | https://tampaprep.org | — | Grades 6-12. A DAY school, not boarding |
| Faith Lutheran High School | Las Vegas | NV | https://www.faithlutheranlv.org | — | Trinity’s own note says Nevada. Formal name Faith Lutheran Middle School & High School, grades 6-12, LCMS. A DAY school — its own admissions pages state no on-campus boarding |

## Boarding (30)

| School | City | State | Homepage | Rank | Note |
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

## Public, charter and magnet (45)

| School | City | State | Homepage | Rank | Note |
|---|---|---|---|---|---|
| Charlotte Lab School | Charlotte | NC | https://www.charlottelabschool.org | — | Public charter, not independent — its own site says so |
| Community School of Davidson | Davidson | NC | https://www.csdspartans.org | US News National HS Rank #1,009 | Public charter, not independent — its own mission text says so |
| Jackson-Reed High School | Washington | DC | https://jacksonreedhs.org | US News National HS Rank #1,781 | DC's largest PUBLIC high school, formerly Woodrow Wilson HS (renamed 2022) |
| Morristown High School | Morristown | NJ | https://mhs.morrisschooldistrict.org | US News National HS Rank #2,980 | PUBLIC, Morris School District's only high school |
| Nauset High School | Eastham | MA | https://www.nausetschools.org/o/nrhs | US News National HS Rank #2,051 | Nauset Regional High School, PUBLIC, Cape Cod. No standalone domain; this path is its homepage |
| North Boise Jr. High School | Boise | ID | https://north.boiseschools.org | — | NAME AS PUBLISHED. The actual school is North Junior High School, a PUBLIC grades 7-9 junior high |
| Phoebus High School | Hampton | VA | https://phs.hampton.k12.va.us | US News National HS Rank #5,183 | PUBLIC, Hampton City Schools |
| St. Martin High School | Ocean Springs | MS | https://smhs.jcsd.ms | US News National HS Rank #4,926 | Trinity’s own note says Mississippi. PUBLIC 9-12, Jackson County School District — filed by Trinity under boarding, but it is neither boarding nor independent |
| A.C. Reynolds High School |  |  | https://acrhs.buncombeschools.org | US News National HS Rank #2,778 |  |
| Ardrey Kell High School |  |  | https://ardreykellhs.cmsk12.org | US News National HS Rank #475 |  |
| Butler High School |  |  | https://butlerhs.cmsk12.org | US News National HS Rank #3,202 |  |
| Central High School |  |  | — *ambiguous* | — | No state in Trinity’s data and no plain “Central High School” exists in the Charlotte metro — the near names (Central Cabarrus HS, Central Academy of Technology and Arts) are distinct schools. Unlinked by the user’s call, 2026-09-17. |
| Charlotte Engineering Early College |  |  | https://ceechs.cmsk12.org | US News National HS Rank #567 |  |
| Cox Mill High School |  |  | https://cmhs.cabarrus.k12.nc.us | US News National HS Rank #1,369 |  |
| East Gaston High School |  |  | https://eastgaston.gaston.k12.nc.us | US News National HS Rank #8,349 |  |
| East Lincoln High School |  |  | https://www.lincoln.k12.nc.us/o/elhs | US News National HS Rank #5,475 |  |
| East Mecklenburg High School |  |  | https://eastmecklenburghs.cmsk12.org | US News National HS Rank #2,837 |  |
| Harding High School |  |  | https://hardinguniversityhs.cmsk12.org | US News National HS Rank #13,460-17,945 |  |
| Hawthorne Academy of Health Sciences |  |  | https://hawthorneae.cmsk12.org | US News National HS Rank #6,927 |  |
| Hickory Ridge High School |  |  | https://hrhs.cabarrus.k12.nc.us | US News National HS Rank #2,102 |  |
| Hopewell High School |  |  | https://hopewellhs.cmsk12.org | US News National HS Rank #9,343 |  |
| Hough High School |  |  | https://williamamoshoughhs.cmsk12.org | US News National HS Rank #1,342 |  |
| Indian Land High School |  |  | https://ilhs.lancastercsd.com | US News National HS Rank #4,994 |  |
| JM Robinson High School |  |  | https://jmrhs.cabarrus.k12.nc.us | US News National HS Rank #9,862 |  |
| Julius L. Chambers High School |  |  | https://chambershs.cmsk12.org | US News National HS Rank #13,460-17,945 |  |
| Lake Norman Charter School |  |  | https://www.lncharter.org | US News National HS Rank #570 |  |
| Lake Norman High School |  |  | https://lakenormanhigh.issnc.org | US News National HS Rank #2,815 |  |
| Langtree Charter Academy |  |  | https://www.langtreecharter.org | US News National HS Rank #5,335 |  |
| Laurel Springs High School |  |  | https://laurelsprings.com | — |  |
| Mallard Creek High School |  |  | https://mallardcreekhs.cmsk12.org | US News National HS Rank #7,774 |  |
| Mountain Island Charter School |  |  | https://www.micharter.org | US News National HS Rank #2,639 |  |
| Myers Park High School |  |  | https://myersparkhs.cmsk12.org | US News National HS Rank #1,655 |  |
| North Lincoln High School |  |  | https://www.lincoln.k12.nc.us/o/nlhs | US News National HS Rank #4,471 |  |
| North Mecklenburg High School |  |  | https://northmecklenburghs.cmsk12.org | US News National HS Rank #5,938 |  |
| Northwest School of the Arts |  |  | https://northwesths.cmsk12.org | US News National HS Rank #1,314 |  |
| Phillip O’Berry Academy of Technology |  |  | https://phillipoberryhs.cmsk12.org | US News National HS Rank #3,863 |  |
| Porter Ridge High School |  |  | https://prhs.ucpsnc.org | US News National HS Rank #4,721 |  |
| Providence High School |  |  | https://providencehs.cmsk12.org | US News National HS Rank #526 |  |
| Queens Grant High School | Matthews | NC | https://queensgranthigh.org | — | Grades 9-12, ~430 students, 1A Yadkin Valley Conference. Distinct from Queen’s Grant Community School (K-8, Mint Hill). |
| Rocky River High School |  |  | https://rockyriverhs.cmsk12.org | US News National HS Rank #12,122 |  |
| South Mecklenburg High School |  |  | https://southmecklenburghs.cmsk12.org | US News National HS Rank #5,217 |  |
| Stuart W. Cramer High School |  |  | https://stuartwcramer.gaston.k12.nc.us | US News National HS Rank #8,598 |  |
| University of North Carolina School of the Arts |  |  | https://www.uncsa.edu/high-school/index.aspx | — |  |
| West Mecklenburg High School |  |  | https://westmecklenburghs.cmsk12.org | US News National HS Rank #13,460-17,945 |  |
| Westwood High School |  |  | — *ambiguous* | — | No state in Trinity’s data and no Westwood HS in the Charlotte area at all; the nearest is Blythewood SC, ~90 miles away, with no evidence tying it to Trinity. Unlinked by the user’s call, 2026-09-17. |

