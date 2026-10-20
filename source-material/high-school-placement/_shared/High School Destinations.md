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

- **The 2026 Niche lists skipped #14 in BOTH rankings** — a Niche quirk, not a parse error. **The 2027 lists do not** (refreshed 2026-10-19; see below).
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
  High is a 7-9 junior high. (Charlotte Lab had only elementary and middle ranks on 2026-09-17; it now carries a high-school rank — see the 2026-10-19 refresh.)
- **Two names cannot be resolved at all** from Trinity own data: Central High School
  and Westwood High School carry no state and neither exists in the Charlotte metro.
- **Two district URLs moved:** Lake Norman High is now on issnc.org (directories
  still publish the stale iss.k12.nc.us path); East/North Lincoln answer on both
  lcsnc.org and lincoln.k12.nc.us, and the canonical tag points at the latter.

## Charlotte-area independent (16)

| School | City | State | Homepage | Rank | Note |
|---|---|---|---|---|---|
| Cannon School | Concord | NC | — | Charlotte Private K-12 Niche Rank #5 |  |
| Carmel Christian | Matthews | NC | — | Charlotte Private K-12 Niche Rank #12 |  |
| Charlotte Catholic | Charlotte | NC | — | Charlotte Private HS Niche Rank #21 |  |
| Charlotte Christian School | Charlotte | NC | — | Charlotte Private K-12 Niche Rank #3 |  |
| Charlotte Country Day School | Charlotte | NC | — | Charlotte Private K-12 Niche Rank #4 |  |
| Charlotte Latin School | Charlotte | NC | — | Charlotte Private K-12 Niche Rank #6 |  |
| Covenant Day School | Matthews | NC | — | Charlotte Private K-12 Niche Rank #13 |  |
| Davidson Day School | Davidson | NC | — | Charlotte Private K-12 Niche Rank #7 |  |
| Hickory Grove Christian Academy | Charlotte | NC | — | Charlotte Private K-12 Niche Rank #11 |  |
| Providence Day School | Charlotte | NC | — | Charlotte Private K-12 Niche Rank #1 |  |
| Grace Academy | Matthews | NC | https://graceacademync.com | Charlotte Private K-12 Niche Rank #34 | University-model K-12 Christian school, 3645 Pleasant Plains Rd |
| Southlake Christian Academy | Huntersville | NC | https://www.southlakechristian.org | Charlotte Private K-12 Niche Rank #16 | Styles itself SouthLake; JK-12, 13820 Hagers Ferry Rd |
| The Fletcher School | Charlotte | NC | https://www.thefletcherschool.org | — | K-12 for students with learning differences, 8500 Sardis Rd |
| Christ the King Catholic High School | Huntersville | NC | https://www.ctkchs.org | Charlotte Private HS Niche Rank #14 | Confirmed via the Diocese of Charlotte listing — the name collides widely |
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
| Charlotte Lab School | Charlotte | NC | https://www.charlottelabschool.org | US News National HS Rank #6,763 | Public charter, not independent — its own site says so |
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


## Added for Charlotte Preparatory School (2026-10-19) (39)

Ranks for these rows were added in the 2026-10-19 refresh below.

Every URL fetched live on 2026-10-19. Names are as Charlotte Prep writes them (its website list, its placement guide, or its 2023–2026 class lists). No rank labels yet: Niche's Charlotte K-12 list returned 403 and US News needs a headed browser, so these rows render unranked rather than with a guessed figure. Full verification notes are in source-material/high-school-placement/charlotte-prep/ (Where They Land, Method).

| Name | City | State | Kind | Homepage | Note |
|---|---|---|---|---|---|
| Carmel Christian School | Matthews | NC | independent | dossier | Charlotte Prep's spelling of Carmel Christian; same rank |
| Charlotte Catholic High School | Charlotte | NC | independent | dossier | Charlotte Prep's spelling of Charlotte Catholic; same rank |
| Gaston Day School | Gastonia | NC | independent | dossier | Has its own dossier in the app |
| British International School of Charlotte | Charlotte | NC | independent | https://www.nordangliaeducation.com/bisc-charlotte | bischarlotte.org redirects here |
| Trinity Christian Prep | Charlotte | NC | independent | https://trinityprep.com | Own name Trinity Preparatory School; grades 7-12, neurodivergent learners |
| United Faith Christian Academy | Charlotte | NC | independent | https://ufca.org | 8617 Providence Rd |
| Central Academy of Technology and Arts | Monroe | NC | public | https://cata.ucpsnc.org | Union County magnet; IB since 2022-23 |
| Cuthbertson High School | Waxhaw | NC | public | https://chs.ucpsnc.org | |
| Independence High School | Charlotte | NC | public | https://independencehs.cmsk12.org | |
| Marvin Ridge High School | Waxhaw | NC | public | https://mrhs.ucpsnc.org | |
| Northwestern High School | Rock Hill | SC | public | https://nwhs.rock-hill.k12.sc.us | Identification ours; Prep gives no city |
| Olympic Community of Schools | Charlotte | NC | public | https://olympichs.cmsk12.org | Now Olympic High School |
| Union Academy | Monroe | NC | public | https://www.unionacademy.org | Public charter |
| Weddington High School | Matthews | NC | public | https://whs.ucpsnc.org | |
| York Prep Academy | Rock Hill | SC | public | https://www.yorkprepsc.org | York Preparatory Academy, public charter; identification ours |
| South Carolina Governor's School for the Arts | Greenville | SC | public | https://www.scgsah.org | Public residential arts high school |
| Campolindo High School | Moraga | CA | public | https://chs.acalanes.k12.ca.us | |
| Christian-von-Dohm Gymnasium | Goslar | Germany | public | https://www.cvd-gs.de | |
| Portland High School | Portland | ME | public | https://phs.portlandschools.org | Prep's brochure says South Portland High School |
| Washington-Lee High School | Arlington | VA | public | https://wl.apsva.us | Now Washington-Liberty |
| American Hebrew Academy | Greensboro | NC | boarding | — *closed* | Closed June 2019 |
| Baylor School | Chattanooga | TN | boarding | https://www.baylorschool.org | |
| Choate Rosemary Hall | Wallingford | CT | boarding | https://www.choate.edu | |
| Currey Ingram Academy | Brentwood | TN | boarding | https://www.curreyingram.org | Residential life for grades 9-12 |
| Interlochen Arts Academy | Interlochen | MI | boarding | https://www.interlochen.org/arts-boarding-school | |
| Peddie School | Hightstown | NJ | boarding | https://peddie.org | |
| Riverside Military Academy | Gainesville | GA | boarding | https://www.riversidemilitary.org | |
| Suffield Academy | Suffield | CT | boarding | https://www.suffieldacademy.org | |
| Walnut Hill School for the Arts | Natick | MA | boarding | https://www.walnuthillarts.org | |
| American School in London | London | England | day | https://www.asl.org | |
| American School of Marrakech | Marrakech | Morocco | day | https://asm.ac.ma | |
| Carlisle School | Axton | VA | day | https://www.carlisleschool.org | |
| Carolina Day School | Asheville | NC | day | https://www.carolinaday.org | |
| Georgetown Day School | Washington | DC | day | https://www.gds.org | |
| International Community School in London | London | England | day | https://www.icslondon.co.uk | Identification ours |
| Lincoln Community School | Accra | Ghana | day | https://www.lincoln.edu.gh | |
| Sidwell Friends School | Washington | DC | day | https://www.sidwell.edu | |
| The Gregory School | Tucson | AZ | day | https://www.gregoryschool.org | |
| Wesleyan School | Peachtree Corners | GA | day | https://www.wesleyanschool.org | |

## Rank refresh — 2026-10-19 (US News 2026-2027 live profiles; Niche 2027)

> **Provenance:** Claude Code, 2026-10-19, for the Charlotte Preparatory School placement card.
> **US News:** every rank read off the school's LIVE profile page in Playwright headed Chrome
> (channel chrome, --disable-blink-features=AutomationControlled, --disable-http2), never a
> search snippet. Each page heads its rank block "<School> 2026-2027 Rankings" and states
> "out of 17,945 nationally ranked schools" — the same edition as every existing US News label.
> Profile ids were resolved through DuckDuckGo's HTML endpoint and each profile was accepted only
> after its own H1 and street address matched the school we mean. One browser, sequential,
> ~5-6s apart.
> **Niche:** curl with a full desktop Chrome User-Agent returned real HTML (HTTP 200) for all
> list pages. Every page carries the "2027 Best Private K-12 Schools" / "2027 Best Private High
> Schools" headings, so this is the **2027 edition**. Ranks read from each school's own card
> badge text ("#N Best Private K-12 Schools in Charlotte Area. ... Private School, CITY, ST,
> grades"), never from list position. A later profile fetch returned 403, so fetching stopped.

### What changed in Niche's 2027 edition

- **The #14 skip is GONE in both lists.** The 2027 K-12 list runs #1-#34 with no gap (57
  schools, 23 unbadged); the high-school list runs #1-#39 with no gap (69 schools, 30
  unbadged). The header note in src/data/highSchools.ts describing the skip is now stale.
- **The 2027 high-school list now includes K-12 schools** (Providence Day is #1 on both lists).
  K-12 schools keep the K-12 label per the existing convention; only 9-12 / 7-12 schools take
  the HS label.
- Newly ranked K-12 schools the master holds: British International School of Charlotte #2,
  Gaston Day School #8, United Faith Christian Academy #14.
- Niche names Hickory Grove "Hickory Grove Christian School" and spells Grace Academy's city
  "MATHEWS" — its own typo; same institution (Matthews NC, K-12).

### Task B — Niche, Charlotte Area (2027 edition)

| School | old label | new label | source URL | how verified |
|---|---|---|---|---|
| Providence Day School | Charlotte Private K-12 Niche Rank #1 | Charlotte Private K-12 Niche Rank #1 | https://www.niche.com/k12/search/best-private-k12-schools/m/charlotte-metro-area/ | card: CHARLOTTE, NC, PK, K-12 |
| British International School of Charlotte | — | Charlotte Private K-12 Niche Rank #2 | https://www.niche.com/k12/search/best-private-k12-schools/m/charlotte-metro-area/ | card: CHARLOTTE, NC, PK, K-12 |
| Charlotte Christian School | Charlotte Private K-12 Niche Rank #4 | Charlotte Private K-12 Niche Rank #3 | https://www.niche.com/k12/search/best-private-k12-schools/m/charlotte-metro-area/ | card: CHARLOTTE, NC, PK, K-12 |
| Charlotte Country Day School | Charlotte Private K-12 Niche Rank #3 | Charlotte Private K-12 Niche Rank #4 | https://www.niche.com/k12/search/best-private-k12-schools/m/charlotte-metro-area/ | card: CHARLOTTE, NC, PK, K-12 |
| Cannon School | Charlotte Private K-12 Niche Rank #5 | Charlotte Private K-12 Niche Rank #5 | https://www.niche.com/k12/search/best-private-k12-schools/m/charlotte-metro-area/ | card: CONCORD, NC, PK, K-12 |
| Charlotte Latin School | Charlotte Private K-12 Niche Rank #2 | Charlotte Private K-12 Niche Rank #6 | https://www.niche.com/k12/search/best-private-k12-schools/m/charlotte-metro-area/ | card: CHARLOTTE, NC, PK, K-12 |
| Davidson Day School | Charlotte Private K-12 Niche Rank #7 | Charlotte Private K-12 Niche Rank #7 | https://www.niche.com/k12/search/best-private-k12-schools/m/charlotte-metro-area/ | card: DAVIDSON, NC, PK, K-12 |
| Gaston Day School | — | Charlotte Private K-12 Niche Rank #8 | https://www.niche.com/k12/search/best-private-k12-schools/m/charlotte-metro-area/ | card: GASTONIA, NC, PK, K-12 |
| Hickory Grove Christian Academy | Charlotte Private K-12 Niche Rank #16 | Charlotte Private K-12 Niche Rank #11 | https://www.niche.com/k12/search/best-private-k12-schools/m/charlotte-metro-area/ | card "Hickory Grove Christian School": CHARLOTTE, NC, PK, K-12 |
| Carmel Christian / Carmel Christian School | Charlotte Private K-12 Niche Rank #13 | Charlotte Private K-12 Niche Rank #12 | https://www.niche.com/k12/search/best-private-k12-schools/m/charlotte-metro-area/ | card: MATTHEWS, NC, K-12 |
| Covenant Day School | Charlotte Private K-12 Niche Rank #10 | Charlotte Private K-12 Niche Rank #13 | https://www.niche.com/k12/search/best-private-k12-schools/m/charlotte-metro-area/ | card: MATTHEWS, NC, PK, K-12 |
| United Faith Christian Academy | — | Charlotte Private K-12 Niche Rank #14 | https://www.niche.com/k12/search/best-private-k12-schools/m/charlotte-metro-area/ | card: CHARLOTTE, NC, PK, K-12 |
| Southlake Christian Academy | Charlotte Private K-12 Niche Rank #17 | Charlotte Private K-12 Niche Rank #16 | https://www.niche.com/k12/search/best-private-k12-schools/m/charlotte-metro-area/ | card "SouthLake Christian Academy": HUNTERSVILLE, NC, PK, K-12 |
| Grace Academy | Charlotte Private K-12 Niche Rank #32 | Charlotte Private K-12 Niche Rank #34 | https://www.niche.com/k12/search/best-private-k12-schools/m/charlotte-metro-area/?page=2 | card: MATHEWS (sic), NC, K-12 |
| The Fletcher School | — | — (listed, no badge) | https://www.niche.com/k12/search/best-private-k12-schools/m/charlotte-metro-area/?page=2 | card: CHARLOTTE, NC, K-12; listed among the 23 unbadged |
| Christ the King Catholic High School | Charlotte Private HS Niche Rank #21 | Charlotte Private HS Niche Rank #14 | https://www.niche.com/k12/search/best-private-high-schools/m/charlotte-metro-area/ | card: HUNTERSVILLE, NC, 9-12 |
| Charlotte Catholic / Charlotte Catholic High School | Charlotte Private HS Niche Rank #22 | Charlotte Private HS Niche Rank #21 | https://www.niche.com/k12/search/best-private-high-schools/m/charlotte-metro-area/ | card: CHARLOTTE, NC, 9-12 |
| Trinity Christian Prep | — | Charlotte Private HS Niche Rank #29 | https://www.niche.com/k12/search/best-private-high-schools/m/charlotte-metro-area/?page=2 | card "Trinity Prep School": CHARLOTTE, NC, 7-12; niche slug trinity-prep-school-charlotte-nc. On the HS list only — not on the K-12 list |
| Trinity Episcopal School (K-8, not a destination) | — | not ranked | https://www.niche.com/k12/trinity-episcopal-school-charlotte-nc/ | profile: K-8, 430 students, overall grade A; no Rankings section, absent from both lists |
| Charlotte Preparatory School (K-8, not a destination) | — | not ranked | https://www.niche.com/k12/charlotte-preparatory-school-charlotte-nc/ | profile: PK, K-8, 428 students, overall grade A; no Rankings section, absent from both lists |

A Charlotte-area private middle-school list does not exist at the parallel URL
(best-private-middle-schools/m/charlotte-metro-area returned 404).

### Task A — US News National HS Rank (2026-2027 edition, live profiles)

| School | old label | new label | source URL | how verified (address match) |
|---|---|---|---|---|
| Central Academy of Technology and Arts | — | US News National HS Rank #974 | https://www.usnews.com/education/best-high-schools/north-carolina/districts/union-county-public-schools/central-academy-of-technology-and-arts-14733 | H1 Central Academy of Technology and Arts; 600 Brewer Dr, Monroe NC 28112; Union County Public Schools |
| Charlotte Lab School | — | US News National HS Rank #6,763 | https://www.usnews.com/education/best-high-schools/north-carolina/districts/charlotte-lab-school/charlotte-lab-school-234534 | H1 Charlotte Lab School; 2045 Suttle Avenue, Charlotte NC 28208; its own one-school district. New since 2026-09-17, when it had only elementary/middle ranks — 12th-grade enrollment now 36 |
| Cuthbertson High School | — | US News National HS Rank #2,050 | https://www.usnews.com/education/best-high-schools/north-carolina/districts/union-county-public-schools/cuthbertson-high-school-14738 | H1 Cuthbertson High School; 1400 Cuthbertson Rd, Waxhaw NC 28173; Union County Public Schools |
| Independence High School | — | US News National HS Rank #5,023 | https://www.usnews.com/education/best-high-schools/north-carolina/districts/charlotte-mecklenburg-schools/independence-high-school-14569 | H1 Independence High School; 1967 Patriot Dr, Charlotte NC; Charlotte-Mecklenburg Schools |
| Marvin Ridge High School | — | US News National HS Rank #614 | https://www.usnews.com/education/best-high-schools/north-carolina/districts/union-county-public-schools/marvin-ridge-high-school-14736 | H1 Marvin Ridge High School; 2825 Crane Road, Waxhaw NC 28173; Union County Public Schools |
| Northwestern High School | — | US News National HS Rank #5,730 | https://www.usnews.com/education/best-high-schools/south-carolina/districts/york-03/northwestern-high-school-17741 | H1 Northwestern High School; 2503 West Main Street, Rock Hill SC 29732; York 03 (Rock Hill Schools) |
| Olympic Community of Schools | — | US News National HS Rank #13,127 | https://www.usnews.com/education/best-high-schools/north-carolina/districts/charlotte-mecklenburg-schools/olympic-high-school-408680 | H1 Olympic High School; 4301 Sandy Porter Rd Suite A, Charlotte NC 28273; Charlotte-Mecklenburg Schools |
| Queens Grant High School | — | unranked (no US News record) | https://www.usnews.com/education/best-high-schools/north-carolina/districts/queens-grant-community-school/queen-s-grant-community-school-14262 | The only US News record is H1 Queen's Grant Community School, 6400 Matthews Mint Hill Road, Mint Hill — the K-8 school (#13,460-17,945), "the only high school" in its district. US News HS search for "Queens Grant" (NC) matched nothing; "Queen's Grant" matched only the Mint Hill record. Same conclusion as 2026-09-17: do not carry the Mint Hill rank |
| Union Academy | — | US News National HS Rank #2,538 | https://www.usnews.com/education/best-high-schools/north-carolina/districts/union-academy-charter-school/union-academy-14255 | H1 Union Academy; 675 North ML King Jr Blvd, Monroe NC; Union Academy Charter School district |
| Weddington High School | — | US News National HS Rank #697 | https://www.usnews.com/education/best-high-schools/north-carolina/districts/union-county-public-schools/weddington-high-school-14734 | H1 Weddington High School; 4901 Monroe-Weddington Road, Matthews NC 28104; Union County Public Schools |
| York Prep Academy | — | US News National HS Rank #3,954 | https://www.usnews.com/education/best-high-schools/south-carolina/districts/sc-public-charter-school-district/york-preparatory-academy-156423 | H1 York Preparatory Academy; 1047 Golden Gate Court, Rock Hill SC 29732; SC Public Charter School District |
| University of North Carolina School of the Arts | — | unranked (no US News HS record) | https://www.usnews.com/education/best-high-schools/search?name=School%20of%20the%20Arts&state-urlname=north-carolina | US News HS search for "School of the Arts" in NC returned only Durham School of the Arts, Northwest School of the Arts and Longleaf School of the Arts; two DuckDuckGo queries found no UNCSA high-school profile. UNCSA is listed under Best Colleges, not Best High Schools |

Edition check: every profile above shows the "2026-2027 Rankings" heading and "out of
17,945 nationally ranked schools"; data years 2022-2023 through 2024-2025.
