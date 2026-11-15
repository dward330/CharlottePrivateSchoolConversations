# Trinity live-site recheck 2026-11-14 — Course Offerings, The Arts, Student Clubs

Evidence worklist for [`../trinitysite.md`](../trinitysite.md), condensed during planning from
the research agent's report (the agent was stopped by an API safeguard while writing this
file, so this copy was written by the planning window from the report it had delivered).
The verbatim live text for every row is in the `### Live-site recheck, 2026-11-14`
subsection of each source-material file listed at the end. The raw crawl is in
`reports/trinity-site-2026-11-14/` (gitignored, local).

**Decisions applied (user, 2026-11-14):** the live site wins; a past event whose page is
gone comes OUT even if true (Wayback copies stay in source-material only); new live
information that fits an existing card goes IN; no new cards.

**Rendering:** for Trinity, `src/content/{course-offerings,the-arts,student-clubs}/
trinity-episcopal.json` prose does not render (structured layers replace it; the clubs prose
loop is narrowed to `catalog`/`academic-clubs`, which `clubCatalog.ts`/`clubClusters.ts`
replace). Those JSONs regenerate from source-material at ingest. The parent-facing strings
are in the `.ts` files. `source` / `sources[].label` fields are not extracted for
translation; Student Clubs GAP/COUNT flags never render.

## A. URL map

| Old URL (tescharlotte.org) | New URL or GONE | Cited at |
|---|---|---|
| `/academics/lower-school-curriculum.cfm` | `https://www.tescharlotte.org/academics/lower-school` (popups) | `courseOfferings.ts` LS `sourceUrl` (~:8521) |
| `/academics/lower-school-enrichments.cfm` | same LS page (12 Tribes, PE & Wellness, Visual Arts, Performing Arts & Music, Spanish, Faith Studies popups) | `artsPrograms/trinity-episcopal.ts:64`; `clubCatalog.ts` Trinity `source` (~:936) |
| `/academics/middle-school-curriculum.cfm` | `https://www.tescharlotte.org/academics/middle-school` (popups) | `courseOfferings.ts` MS `sourceUrl` (~:8622) |
| `/academics/middle-school-enrichments.cfm` | same MS page (Electives, 6th Learning Lab, 6th Digital Learning/CS, 7th Healthful Living, 7th CS, 7th Speech & Debate, 8th Social Issues Seminar, Faith Studies, Visual Arts, Performing Arts, PE popups). **Koinonia detail passage gone.** | `artsPrograms:66`; `clubCatalog.ts` |
| `/academics/middle-school.cfm` | `/academics/middle-school` | clubs source-material only |
| `/editoruploads/files/26-27SchoolProfile.pdf` | `https://resources.finalsite.net/images/v1790266877/tescharlotteorg/jraele9yxiqjc8nohifm/26-27SchoolProfile.pdf` — same edition, every quote verbatim | `artsPrograms:68`; `clubsPrograms/trinity-episcopal.ts:72`; `clubClusters.ts` (~:494, :512) |
| `/trinity-artists-honored-in-local-exhibits/` | `https://www.tescharlotte.org/about-us/news/news-landing-page/~board/news/post/trinity-artists-honored-in-local-exhibits` | `artsPrograms:71` |
| `/jen-rankey-zona-receives-excellence-in-teaching-award/` | **GONE** | `artsPrograms:73` |
| `/fifth-grade-continues-art-exchange-with-ghana-students/` | **GONE** (0 hits for Ghana / Children Inspiring Hope) | `artsPrograms:75` |
| `/three-peat-trinity-mock-trial-team-wins-third-consecutive-championship/` | **GONE** | `clubsPrograms:67`; `clubClusters.ts` (~:486) |
| `/trinity-takes-mock-trial-championship-for-second-year/` | **GONE** | `clubsPrograms:69`; `clubClusters.ts` |
| `/celebrating-tes-staculty-achievements/` | **GONE** | `clubsPrograms:70`; `clubClusters.ts` (~:494) |
| `/spirituality/honor-code.cfm` | `https://www.tescharlotte.org/about-us/the-honor-code` (content changed) | `clubsPrograms:71`; `clubClusters.ts` (~:502); `clubCatalog.ts` |
| `/diversity/affinity-groups.cfm` | **GONE**, no replacement page | `clubsPrograms:58`; `clubCatalog.ts` |
| `/spirituality-and-diversity-working-hand-in-hand-at-trinity/` | **GONE** | `clubsPrograms:60` |
| `/spirituality/service-learning.cfm` | `https://www.tescharlotte.org/spirituality/service-learning` (Grade 4 partner changed) | `clubsPrograms:61` |
| `/about/` | **GONE as quoted**; nearest live line on `/academics/beyondclassroom` | `clubsPrograms:62` |
| `/blog.cfm?threadid=15` | **GONE**, no archive | `clubsPrograms:63` |
| `/students-collect-954-pounds-of-food-for-nourish-up/` | **GONE** | `clubsPrograms:65` |
| `/spirituality/chapel.cfm` | `https://www.tescharlotte.org/spirituality/chapel` (Greet the Week sentence gone) | clubs source-material |
| `/community/trinity-extended-day.cfm`, `/community/parents-association.cfm`, `/admission/k-8-advantage.cfm` (paths in prose) | `/community/trinity-extended-day`, `/community/parents-association`, `/admissions/the-k-8-advantage` | clubs source-material |

## B. Changes to make (app location → live value)

Line numbers are approximate (pre-edit); find each by its text. "P" = parent-facing prose
that needs Phase 2 re-translation.

### Course Offerings — `src/data/courseOfferings.ts`, Trinity block

1. LS and MS `sourceUrl` → the two new academics URLs. (not P)
2. LS Math: "highly effective Singapore Math approach" → quote as published, "highly-effective". (P)
3. LS Social Studies: "taught through Storypaths units across the Lower School grades" → live: "Many of these units, especially in the lower grades, are known as Storypaths". (P)
4. LS teaser "six weekly enrichments" / MS teaser "13 weekly enrichments" → live headline figure "16 / Enrichment courses (Lower and Middle School)" (`/about-us/trinity-at-a-glance`); re-derive both teasers from the live tiles (the web's 6 LS tiles include 12 Tribes, not IDEA Lab). (P)
5. MS Computer Science, Speech & Debate, Healthful Living: "One of the 13 weekly Middle School enrichments…" → "Each of these courses meets every other day for one trimester." (P)
6. MS Choice Electives: "does not describe what they cover" → live list, "Beginning in 7th Grade… Advanced Band / Advanced Choir / Studio Art / Mock Trial and Speech & Debate / Sports Activism / Intro to Digital Media Literacy", running "on alternating days for the entire academic year". (P)
7. Music Ensembles: re-quote "Sixth-grade students choose from one of two ensembles: Choir or Band." and "Ensembles may perform at chapels, commencement and various venues outside of school." (P)
8. Advanced Band / Advanced Choir: re-quote "Seventh and 8th grade students who choose to continue in an ensemble can choose Advanced Band or Advanced Choir."; both are now also electives. (P)
9. Drama Elective (title + description): the drama elective is no longer stated anywhere → remove the course; live theatre line is "Middle School students may also choose to participate in the after-school fall play or winter musical." (P) — removing a course row: check `check:cardlink` (a course is not a card, so no alias is expected) and that the MS group is not left empty.
10. Koinonia: the 10–12 students / one adult / daily check-in / twice-weekly detail is gone → reduce to the live text ("deeper relationships with peers and teachers in their Koinonia advisory groups"; profile "Koinonia (Gr. 6-8)"). (P)
11. K–8 Technology: keep the profile (iPads K-1, Chromebooks 2-8); the 2024 *Wired for Technology* PDF says K-2 iPads / 3rd-grade Chromebooks — older source, the profile wins. No change.
12. **Add (fits existing departments):** 6th Grade Digital Learning/Computer Science (Code.org trimester, in a 6th-grade rotation with Latin, Spanish and digital literacy); live per-course descriptions where a course row exists (MS English, the three Social Studies years, Learning Lab, Healthful Living, 7th CS, Speech & Debate, Social Issues Seminar incl. "advocacy trip to Washington, D.C., in May", Spanish, Latin); MS Faith Studies "three times a week: Greet the Week on Mondays, a division-level chapel on Wednesdays, and a community chapel every Friday morning"; MS aquaponics (7th–8th science) only if a whole-school/science row exists to hold it. (P)

### The Arts — `src/data/artsPrograms/trinity-episcopal.ts`

13. URL constants :64–75 → new URLs; delete the CATO and Ghana constants once nothing cites them. (not P)
14. `ladder.divisions[2].items[0]`, `[1]`; `music.ladder[1].text` → the re-quoted ensemble lines (item 7–8 above). (P)
15. `ladder.divisions[2].items[2]`; `theatre.headline`; `theatre.season[1].kind`/`.detail` → no drama elective; "after-school fall play or winter musical"; profile "Middle School fall play, winter musical". (P)
16. `ladder.enrichment[0].text`; `music.ladder[2].text` → "Ensembles may perform at chapels, commencement and various venues outside of school." (P)
17. `visual.pathNote`: LS tile says "Teaching Artistic Behaviors (TAB)", MS tile "Teaching for Artistic Behavior (TAB)" — quote the tile each sentence cites. (P)
18. `visual.exhibits[2]` (Youth Art Month / poet): keep the poet as **Jaki Shelton Green** (her correct name; the school's post misspells it "Greene" — do not copy the misspelling); add "first Black female poet laureate" framing and the K-5, "until March 30" detail from the live post. (P)
19. **REMOVE (source gone, past event — user decision):** the 2025 CATO Excellence in Teaching Award everywhere it appears (`visual.exhibits[3]`, `visual.subhead`, `verdict.headline`); the Ghana / Children Inspiring Hope exchange everywhere (`ladder.divisions[0].items[3]`, `ladder.enrichment[1]`, `visual.subhead`, `visual.exhibits[4]`, `verdict.ask[8]`). Rewrite `visual.subhead` and `verdict.headline` from what remains. (P)
20. `visual.footnote` → live titles: "Visual Art Director, Art Teacher" (Jen Rankey-Zona, "a founding Trinity faculty member" — 9/11 post, Sep 10 2026) and "Lower School Art Teacher, K-4" (Shelby Hawk). (P)
21. `verdict.ask[0]` ("No auditorium, black box or theatre appears anywhere on your site") is now FALSE → the site names the "CCA Auditorium" / "Trinity's Center for Community and the Arts"; rewrite or drop. (P)
22. `verdict.ask[1]` ("No music faculty member is named") is now FALSE → "David Wallace / Band Director", "Matt Moorman / Middle School Chaplain, Music Chaplain", "Leslie Cossor / Director of Middle School Theatre Arts"; move the names into the music/theatre cards (item 23) and rewrite or drop the ask. (P)
23. **Add:** music staff; the 2026 Light the Fire grant to the Band Director (Creative Musicians Retreat, Mar 10 2026 post); calendar "Grades 5-8 Choir Concert" (Nov 10) and "Grades 5-8 Band Concert" (Nov 19); LS "All students take general music, which emphasizes creativity, music appreciation, musical literacy, and performance preparation."; the Director of Middle School Theatre Arts; the 9/11 banners (2001, with the Arts & Science Council; one in a permanent memorial at St. Paul's) as a visual-arts item; LS walks to the Children's Theatre (`/academics/beyondclassroom`). (P)
24. `verdict.ask[2]` (MS fall/winter vs winter/spring conflict): resolved for MS; keep only the LS half if still open. (P)

### Student Clubs — `src/data/clubsPrograms/trinity-episcopal.ts`

25. URL constants :58–72 → new URLs; delete constants for gone sources once unused. (not P)
26. Affinity: "Director of Diversity, Equity, and Belonging" → "Assistant Head of School for Belonging and Community Engagement" (Ayeola Elias); remove the per-group purpose statements and grade ranges (gone with `/diversity/affinity-groups.cfm`); keep group names only where the live site or the live 26-27 profile names them. (P)
27. `affinity.groups[1]` (12 Tribes): drop the gone quote; live: "co-ed groups of students in grades 3-5… Each Tribe is led by 2 adult staculty members." (P)
28. `affinity.strips[2]` (Parents): keep only "Cafe Con Padres, Hispanic parent affinity group" and "KINDRED, African American/Black parent affinity group" (`/belonging/celebrating-diversity`); drop Invisible Differences as a parent group and the Diversity & Belonging Committee. (P)
29. `affinity.strips[3]` (In chapel): replace with live "services for Hispanic Heritage Month, Black History Month, the Jewish High Holy Days, and others" plus the calendar's "K-8 Chapel (Diwali)"; drop Pride Chapel, Sankofa and "led by Latino families". Check `affinity.groups[4]` (GSA) for the Pride Chapel line too. (P)
30. Service: "twelve" partners → "10" (`/about-us/trinity-at-a-glance` "10 / Service-learning partners"); `service.headline`, `programs[0].value` ('12' → '10', figure), `.valueLabel`. (P)
31. `service.programs[0].detail`: Grade 4 partner "The Epiphany School of Charlotte" → "Children of the World Learning Center" with its live theme. (P)
32. `service.subhead` → live "Each grade partners with a community organization whose mission and services are related to curricular goals. Our students address real community needs in ways that are connected to and informed by their classroom learning."; drop the "Year-long partnerships…" sentence. (P)
33. `service.programs[1].detail` → live "Trinity Episcopal School has the longest hallways of any school in Charlotte" (`/academics/beyondclassroom`). (P)
34. **REMOVE (source gone):** `service.programs[2]` — the May 2024 DC trip (46 eighth-graders, Rep. Jeff Jackson, value '46'); replace with the live 2025-26 8th-grade material if the program row is kept: "class trips to Raleigh and Washington, D.C.", the Dec. 17 Social Issues Seminar panel, the transit referendum. Drop the 954-lb Nourish Up label from `service.sources`. If the row cannot be rebuilt from live text, remove the row. (P)
35. Honors: **REMOVE the Mock Trial state-title record** (2023/2024/2025 titles, 15-student team, Courthouse Dec. 8, coach quotes) and the "speech and debate and mock trial teams both won their respective state championships" line and the coach's Forensics Chair / NCASA detail (`honors.headline`, `societies[0]`, `societies[1]`, `adjacent[2]`). Keep Mock Trial and Speech & Debate as live 7–8 electives ("meets every other day for one trimester"; elective list). Coach title → "Public Speaking Teacher, Mock Trial and Speech and Debate Coach". Rewrite `honors.headline`. (P)
36. `honors.societies[2]` (Honor Council) → live "Each fall, Middle School students elect their peers to serve on the Honor Council… holding classmates to the expectations set out in the Middle School Pledge." (P)
37. `honors.adjacent[0]`: "Written by students, 2002" → "Written by a group of Middle School students and adopted in 2003"; drop "recites it together at Greet the Week" (gone). `honors.adjacent[1]`: "The Middle School Honor Pledge, adopted 2012" → "Middle School Pledge", no date (text unchanged). (P)
38. **Add:** the full Honor Code text and "taught… starting in Kindergarten" / "The Honor Code follows you everywhere" (honors card); Walk for Peace (Jan 15 2026, grades 2-8) and the 2025-26 8th-grade civic items (service card); Freedom Fete, Latino Festival, KINDRED Festival, Jewish High Holy Days and Diwali chapels (affinity card). (P)
39. Verify the zero-items rule after removals: no honors/affinity/service sub-block may render empty; omit any that would.

### Student Clubs — `src/data/clubCatalog.ts` (Trinity rows) and `src/data/clubClusters.ts` (Trinity)

40. Catalog Chess Club note: "alongside music lessons, karate and cheer club" → live "seasonal enrichments are offered for an additional fee. These include chess club, boys and girls run clubs, music lessons, and much more." (P)
41. Catalog Girls on the Run note: the corroboration is no longer on the live site (0 hits outside the profile) → reduce to the profile listing; mention TED's "boys and girls run clubs". (P)
42. Catalog Spirituality and Chapel Music note: "Named in the 2026-27 School Profile and nowhere else" is now FALSE → "the creation of a Chapel Music Affinity Group in Middle School" (State of the School post, Feb 11 2026). (P)
43. Catalog Honor Council note; Clusters row 2 `oneLiner` + `note` → 2003; pledge undated; "Each fall, Middle School students elect their peers…". (P)
44. Catalog Speech & Debate note; Clusters row 1 `oneLiner` + `note` → every other day for one trimester; also a 7–8 elective. **Remove** any state-championship claim. (P)
45. Catalog Mock Trial note ("Named in the school's blog, not in either School Profile") → now on the MS Electives popup; **remove** the titles; Clusters verdict + row 0 lose the three-peat. (P)
46. Catalog Creative Writing note: still 0 hits outside the profile — no change.
47. Catalog `source` (~:936) and Clusters `source` (~:486/494/502) → new URL/page names. (not P)

## C. Source-material files carrying the evidence

All under `source-material/`, each with a `### Live-site recheck, 2026-11-14` subsection at
the end of `## Provenance`:

- `course-offerings/trinity-episcopal/Trinity Episcopal School - Course Offerings - Lower School and Technology.md`
- `course-offerings/trinity-episcopal/Trinity Episcopal School - Course Offerings - Middle School Curriculum.md`
- `the-arts/trinity-episcopal/Trinity Episcopal School - The Arts - Program Overview and Ensembles.md`
- `the-arts/trinity-episcopal/Trinity Episcopal School - The Arts - Recognition and Exhibitions.md`
- `student-clubs/trinity-episcopal/Trinity Episcopal School - Student Clubs - Academic and Competitive Clubs.md`
- `student-clubs/trinity-episcopal/Trinity Episcopal School - Student Clubs - Affinity and Identity Groups.md`
- `student-clubs/trinity-episcopal/Trinity Episcopal School - Student Clubs - Club Catalog and Traditions.md`
- `student-clubs/trinity-episcopal/Trinity Episcopal School - Student Clubs - Service and Civic Engagement.md`

Raw service-learning HTML (its grade panels are collapsed accordions the crawl missed):
`reports/trinity-site-2026-11-14/pages/spirituality__service-learning.raw.html`.
