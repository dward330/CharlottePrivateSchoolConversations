# Charlotte Christian School — International Travel — Source URLs

**Provenance.** Assembled 2026-10-16 during `/global-exposure` by fetching each page with
`curl` (browser user agent) and reading its text (`pdftotext` for PDFs), plus the Wayback
Machine CDX index and `id_` snapshots for pages and packets the live site no longer serves. It
checks the AI-generated `Charlotte Christian - International Travel - Deep Research.md`
against live pages. That deep-research file is a lead sheet; **this file is the citation
record.** A fact reaches the app only if a row here verifies it (or `/implement` adds a row
after verifying it itself).

**Verification levels**
- **fetched** — page text retrieved 2026-10-16 and the claim read in it.
- **Wayback** — gone from the live site; present in the named snapshot.
- **PDF only** — in the deep-research PDF, not yet checked against a page. **Not sufficient
  to render.** `/implement` fetches it, or drops the claim.
- **404** — the URL no longer resolves.

**Headline correction to the PDF.** The PDF said the 2027 Winterim Packet "could not be
opened" and that the 2026 packet was gone. **Both load** — the 2027 packet from the Upper
School page's own link, the 2026 packet from Wayback (Oct 2025) — and so does the 2024
packet (Wayback, Dec 2023) and the August 2022 Upper School page listing Winterim 2023. Those
four documents carry every trip's grade band, group size, partner and theme, which turns a
thin trip ledger into four school years of Winterim travel. As at Country Day ("could not
load" → the richest page in the area), a deep-research "could not open" was a reason to
retry, not a finding.

## Page keys

`CCS` = `https://www.charlottechristian.com`. `RM` = `${CCS}/fs/resource-manager/view`.
`VOICE` = `${CCS}/uploaded/Documents/AboutUs/Voice`. `KHP` =
`${CCS}/post-details/~board/knights-headlines/post`.

| Key | URL | Level |
|---|---|---|
| US | `${CCS}/academics/upper-school` | fetched |
| CURR | `${CCS}/academics/curriculum` | fetched |
| DIV | `${CCS}/about/diversity` | fetched |
| SPIR | `${CCS}/campus-life/spiritual-life` | fetched |
| APPLY | `${CCS}/admissions/apply` | fetched |
| TUI | `${CCS}/admissions/tuition` | fetched |
| HIST | `${CCS}/about/mission-history` | fetched |
| PAR | `${CCS}/campus-life/parents` | fetched |
| SS | `${CCS}/campus-life/senior-spotlight` | fetched |
| EOS | `${CCS}/campus-life/engaging-over-summer` | fetched |
| FF | `${CCS}/about/employment/faculty-fellows-program` | fetched |
| KH | `${CCS}/about/knights-headlines` | fetched (board; GLOBAL tag) |
| KH-KNC | `${KHP}/knights-nations-club-fosters-a-friendly-and-welcoming-environment-for-upper-school-students` | fetched — **the PDF said it could not be retrieved; it loads** |
| KH-CRAY | `${KHP}/how-a-box-of-crayons-shows-kindness-near-and-far` | fetched |
| **WP27** | `${RM}/ba353ab7-5279-4db7-bbf6-68f09cc3fc31` → `https://resources.finalsite.net/images/v1781738736/charlotte/d1zlf1dfdwvmt4ykkhj3/2027WinterimPacketdocx.pdf` (14 pp., "Winterim 2027 Upper School") | fetched — linked from US ("Click here for the Winterim information packet") |
| **WP26** | `https://web.archive.org/web/20251009234453/https://resources.finalsite.net/images/v1754953602/charlotte/xirlf52kj6gxx2pteclb/2026WinterimPacketdocx.pdf` | Wayback (live URL 404) |
| **WP24** | `https://web.archive.org/web/20231205160202/https://resources.finalsite.net/images/v1684517255/charlotte/it2s4inji6vynrip4ll4/2024WinterimPacket.pdf` | Wayback (live URL 404) |
| **WB-US-2022** | `https://web.archive.org/web/20220808081400/https://www.charlottechristian.com/academics/upper-school` (Winterim 2023 out-of-town trip details) | Wayback |
| USG | `${RM}/e07cd151-2d20-44e0-a7db-f0b6d50ba314` → `USCourseCurriculumGuide_2026-27.pdf` | fetched |
| MSG | `${RM}/e8e85321-72b3-4030-b64e-22dccc17cf1a` → `MSCurriculumGuide2026-27.pdf` | fetched |
| LSB | `${RM}/94f7a8dc-97a5-4798-aeeb-bb83410b4312` → `LSCurriculum_Brochure.pdf` | fetched |
| G280 | `${CCS}/cf_media/index.cfm?g=280` (media gallery index) | fetched |
| EN2922 | `${CCS}/cf_enotify/view.cfm?n=2922` (Fine Arts e-newsletter, Italy J-Term) | fetched |
| N1417 | `${CCS}/cf_news/view.cfm?newsid=1417` ("Posted 07/27/2018") | fetched |
| N894 | `${CCS}/cf_news/view.cfm?newsid=894` | fetched |
| V0708 | `${VOICE}/Voice_0708_Issue1.pdf` | fetched |
| V0910 | `${VOICE}/Voice_0910_Issue3.pdf` | fetched |
| V1011A | `${VOICE}/Voice_1011_Issue1.pdf` | fetched |
| V1011B | `${VOICE}/Voice_1011_Issue2.pdf` | fetched |
| V1112 | `${VOICE}/Voice_1112_Issue1.pdf` | fetched |
| V1213 | `${VOICE}/Voice_1213_Issue2.pdf` | fetched |
| MCF | `${CCS}/post-details/~board/ccs-news-20/post/celebrating-the-nations-at-the-multicultural-festival` | **404** (no Wayback capture) |

## Verified

| Fact group | Source | How | Notes |
|---|---|---|---|
| Diversity aim: "Through authentic and intentional learning opportunities, our students are able to strengthen their ability to have cultural empathy, global awareness and a posture of humility, while seeking unity within our differences." Office: "Director of Diversity, Belonging and Global Awareness" | DIV | fetched | The director is named on the page — **render the title only**. |
| LS: "students have the opportunity to learn about and celebrate other cultures, explore global heritages and expand their understanding of God's world through literature, guest speakers and project-based activities." MS: "world language classes celebrating heritage months, and enhanced by educational field trips to the Sudan Interior Missions (grade 6), the Butterfly Memorial dedicated to the Holocaust Museum (grade 7), and interactive activities related to Civil Rights Movement (grade 8)"; "guest speakers, … dedicated multicultural assemblies and … initiatives from our Global Knights student group." US: "Global Knights Club and the Global Awareness Prefect"; "Cross-cultural development opportunities are also presented in international travels through Winterim, service projects and community engagement throughout Charlotte." | DIV | fetched | Matches the PDF. |
| Romans 12 initiative: "a group made up of members of the CCS community that gather each month to engage in conversations around diversity, belonging, and Jesus' command to live in unity and reconciliation…"; "Romans 12 members … bring unique experiences and perspectives that strengthen our multicultural and global awareness." | DIV | fetched | The PDF called it a "parent group"; the page says **members of the CCS community**. EOS names two parents leading one group — render none. |
| Winterim (US page): "an opportunity for new educational experiences in the second semester"; "Mission/service trips, cultural/educational trips, and internship opportunities"; "takes place during the end of February and includes multiple on-campus, in-town, domestic, and international opportunities and classes for students." Prefect system: nine positions incl. "Global Awareness Prefect". Clubs incl. "Latin Club", "Model UN". Departments "Classical World Languages", "Modern World Languages". | US | fetched | "End of February" vs the 2027 packet's "Mar. 1-5, 2027" — see conflicts. |
| **Winterim 2027 packet (current):** five goals — "Love God", "Pursue Excellence", "Walk Humbly: Discover the unique heritage, beliefs and experiences of another cultural context", "Show Kindness", "Seek Truth". Registration "will open on July 24, 2026"; "Registration will close at midnight on Aug. 28, 2026"; "confirmed via email by Sept. 5, 2026"; "Financial Contracts/Liability Release Forms and passport copies (if required) will be due on Sept. 11, 2026." Selection: "Priority assignment will be given according to the highest grade level available, first-time attendees, curriculum connections, accuracy of registration information and demonstrated readiness. Time of registration is the lowest priority factor." "Winterim is scheduled Mar. 1-5, 2027"; overnight trips "departing as early as Saturday evening, February 28." Credit: ".25 credit (per year) toward the total 1.0 graduation requirement"; pass/fail, not in GPA. Passport valid six months after travel; insurance: "There are many companies that offer travel/trip insurance… Zurich, AAA, Chubb and Allianz." Students "supervised by a CCS employee". | WP27 | fetched | **Resolves the PDF's credit conflict:** 1.0 total = .25 × 4 years (also USG: "required to earn a .25 Winterim credit per year"). Registration dates are deadlines — renderable; travel dates are not. |
| Winterim 2027 international trips (7) — detail table below | WP27 | fetched | |
| Winterim 2026 international trips (8) — detail table below. Registration "will open on August 1, 2025"; "close at midnight on Aug. 29, 2025"; "confirmed via email by Sept. 5, 2025"; "Winterim is scheduled Mar. 9-13, 2026." | WP26 | Wayback | The PDF's subagent quotes are confirmed. |
| Winterim 2024 international trips (8) — detail table below. Registration by grade, seniors first: "Seniors – Aug. 21 … Freshmen – Aug. 24"; "Winterim is held during the last week of February." | WP24 | Wayback | Year of the registration dates is 2023 (packet for Winterim 2024). |
| Winterim 2023 out-of-town trips (10; 6 international) — detail table below. "Winterim 2023 will take place the week of Feb. 27 - March 3, 2023"; out-of-town registration by grade, rising seniors first, in May 2022; "All students are required to complete an application (no essays required) along with submitting a $500 deposit"; "We will also maintain waitlists for each trip." | WB-US-2022 | Wayback | Deposit is research only. |
| **J-Term began 2013–14.** "An exciting addition to the upper school curriculum next year will be the January Term (J-Term) program… Beginning with the class of 2017, every Charlotte Christian upper school student is required to earn a .25 credit per year toward a total 1.0 graduation J-Term credit." Offerings to include "Foreign mission trips to Uganda, Nicaragua or Dominican Republic", "Educational enrichment trips to France and New York"; "Several of the foreign mission trips are open only to students in certain grades" | V1213 | fetched | **PDF wrong:** it said J-Term "existed by 2012-13". The 2012-13 issue announces it for **next year** — first J-Term = January 2014, consistent with G280's first gallery "J-Term 2014". The Uganda/Nicaragua/France options are an announced menu; that they ran is not stated. |
| Galleries: "J-Term 2014" … "J-Term 2019", "J-Term Mission Trips 2017", "Dominican Republic 2011", "Dominican Republic 2012", "Salamanca, Spain Trip 2018", "2015 Mission Trip", "Middle Mission Trip", "Winterim 2023" | G280 | fetched | The PDF missed "Salamanca, Spain Trip 2018". No captions or destinations for the mission-trip galleries. |
| J-Term → Winterim rename: the Aug 2022 US page already says "Winterim 2023"; earlier snapshots (Dec 2019, Mar 2021) carry no J-Term/Winterim text | WB-US-2022 | Wayback | Rename year not published — **do not render a rename date**. |
| **Italy J-Term:** "During the recent J-Term trip to Italy, a group of 40 CCS students, staff, and parents were able to experience firsthand this broad sweep of our artistic Christian heritage"; Rome — Colosseum, the Maritime prison, Sistine Chapel | EN2922 | fetched | Undated on the page; the same newsletter announces the upper-school musical "Feb. 6-8" and a "2020 Western Region Honors Orchestra" placement → **January 2020 (our inference)**. Names a student — render none. |
| Spain, summer 2018: "CCS upper school students traveled to Spain for a language and cultural immersion trip." ("Posted 07/27/2018") | N1417 + G280 ("Salamanca, Spain Trip 2018") | fetched | Names students elsewhere in the post — render none. |
| Mission trips 1998–2000: a teacher "has had the opportunity to participate in school-sponsored mission trips with faculty and students. The trips include visits to Mexico in 1998, Costa Rica in 1999, and Austria in 2000." | V0708 | fetched | Teacher not rendered. |
| **Experiencias Interculturales** (2009-10): "an exciting exchange program that partners Charlotte Christian families with high school students visiting from Guatemala. The program was originally called Faces and began at Charlotte Christian in 2008. During the first year, four students came to study and learn more about American culture and improve their English by staying with Charlotte Christian host families and attending classes with upper school students." "the eight week program"; coordinated by "head of the department of modern and classical languages" | V0910 | fetched | **Inbound only; historical.** Names visiting students and host family — render none. No later mention found; current status unknown → a Verdict question. |
| Dominican Republic, 2009-10: "she and 30 other Charlotte Christian students will work with SCORE International", five named faculty; villages, gospel "through … sports and theatre" | V0910 | fetched | Earliest SCORE trip on record. |
| Basketball, 2009-10: four varsity players and the coach "headed to Limoges, France to represent Charlotte in a partner cities tournament" "organized by the Charlotte International Cabinet"; "The 10-day trip entailed touring Paris" | V0910 | fetched | Players named — render none. |
| Multicultural Day, 2009-10: "Charlotte Christian's Multicultural Day. The event, now in its seventh year, alternates with Lower School Science Day and is held every other year. Traditionally a Spanish Festival, this year students and teachers adopted the theme 'Lord of All Nations'"; "Each lower school class chose a Spanish speaking country and one additional country … for a total of 24 countries represented"; passports, Parade of Nations | V0910 | fetched | Do not compute a start year from "seventh year". |
| Harvard Model Congress, 2010-11: "Forty-three Charlotte Christian juniors and seniors participated in the 26th Annual Harvard Model Congress in Boston, Mass. … representing the largest delegation of students from any school in the nation. This is the eighth year that Charlotte Christian students have traveled to participate" | V1011B | fetched | **The PDF misdescribed this as "a political event".** Domestic, but a network/competition row. Senior trip to Breckenridge (domestic) — not this area. |
| "trips to Belize, India, Bolivia, Costa Rica, Mexico and the Dominican Republic – just to name a few" | V1011A | fetched | **PDF wrong to list as possibly school-run:** it is a profile of one teacher, who led these "for church youth groups, or school students". **Not school trip data — do not render.** |
| Academic WorldQuest 2011: "eight Charlotte Christian students" in "the 2011 Academic WorldQuest competition sponsored by the World Affairs Council of Charlotte (WACC)"; "Approximately 215 students from 24 teams"; event "held at the Westin Hotel on Nov. 17" | V1112 | fetched | Students and teachers named — render none. |
| Summer 2011: "42 Charlotte Christian students participated in school mission trips either to the Dominican Republic or to Sea Island, Georgia for Habitat for Humanity" | V1112 | fetched | |
| Language: "The study of modern and classical languages equips students to impact the global culture for Christ." MS: "Grade 5 — Language Survey" of "French, Latin, and Spanish"; "students are expected to commit to one language choice for grades 6-8"; Levels IA/IB "may allow them to begin at Level II as a freshman." US: Class of 2028+ "two consecutive units of the same language"; French I–IV Honors + AP French Language & Culture, Latin I–IV Honors + AP Latin, Spanish I–IV Honors + AP Spanish Language. LS: Spanish; "Students enhance their multicultural awareness through the celebration of the annual Multicultural Festival." Social studies "Beginning with families and neighborhoods and ending with global geography" | CURR, MSG, USG, LSB | fetched | The PDF missed French and Latin as Upper School sequences and the grade-5 Language Survey. AP list from the school's own guide, not FindingSchool. |
| Global courses: Survey of World Literature ("What does it mean to be an engaged global citizen?"; literature "from Central and South America, Africa, Southwest Asia, India, China, Japan and Korea"); AP World History: Modern; Honors World History; MS Modern World Civilizations ("the impact of growing global interactions"); MS electives **Global Knights** (grade 5: "a multicultural journey that celebrates the beauty and diversity of God's creation") and **Multicultural Studies 7/8** | CURR, USG, MSG | fetched | |
| Knights Nations Club: members "pursue and value the global initiatives supported by the office of diversity and belonging"; founded by two students "with the goal of learning about and interacting with local and international communities"; visiting international grocery stores; learning how Easter is celebrated across the globe; tagged GLOBAL | KH-KNC | fetched | Undated in static HTML; names students — render none. Founded "two years ago" — **no year renderable**. |
| MS crayon drive: "98,484 crayons!" for Rock of Ages Ministries, shipped to Nigeria; "This semester's middle school service project" | KH-CRAY | fetched | Undated; names staff — render none. Optional (service, not global education proper). |
| Spiritual Life: "The upper school offers various local, regional, and international mission trip opportunities throughout the year, including during Winterim." | SPIR | fetched | |
| International students: "Charlotte Christian seeks to diversify its student body by enrolling international students from all over the world"; I-20; "$2,000 per year fee"; "financial assistance is not available for students with an I-20"; "Charlotte Christian School does not provide host families"; TOEFL | APPLY | fetched | Count/countries not published. Fee is research only. |
| Aid: "Financial assistance grants will not exceed 50 percent of tuition. Parents are responsible for the remaining tuition balance and all fees." | TUI | fetched | No trip aid or travel fund found → Verdict question. |
| History: opened 1950 as Calvary Christian Day School; renamed Charlotte Christian School 1976; SAIS accredited; "In 2026, the school ushered in its 75th year … with the largest student enrollment of more than 1,300." | HIST | fetched | Not global-education milestones; context only. |
| Senior Spotlight (Class of 2026): one senior's "grade 10 Winterim trip to Peru"; the same senior lists "Academic WorldQuest Founder" and "Seal of Biliteracy" | SS | fetched | **A student profile — names the student; do not render as program facts.** Peru conflicts with WP24 (see conflicts). "Seal of Biliteracy" appears only in one student's honors list — **not** a school credential on the page. |
| EOS: NSLI-Y Korea (one named student), a family mission trip to Guatemala (named siblings), the director at an Entrust workshop | EOS | fetched | Independent / family activities and named students — **not renderable**. |
| Faculty Fellow has "an important role in our diversity and belonging initiatives on campus, specifically Romans 12 and Global Knights" | FF | fetched | Names the fellow — not rendered. |

### Trips — detail (for the ledger)

**Exact travel dates, costs and trip leaders: research only, never rendered.** "Number of
students" in WP26/WP27 is the packet's planned range; WP24 and WB-US-2022 give "Max. # of
students". Each packet lists **offerings**; WP27 states "Final trip size and offerings will be
determined according to registrations", so render the years as trips offered (see the plan
brief). Partners are named in the packet text.

| Year | Trip | Grades | Group | Theme / partner | Timing (render) | Cost (research) | Travel dates (research) | Leaders (research) | Src |
|---|---|---|---|---|---|---|---|---|---|
| 2026–27 | **Brazil** — São Paulo | 9–12, female athletes | 16–40 | Female athlete sports ministry tour · futsal and "society soccer", sport clinics, local churches · Missionary Athletes International | Winterim 2027 | $2,800-3,200 | Feb. 28 – Mar. 5 | A. Mendieta, T. Rice | WP27 |
| 2026–27 | **Canada** — Québec | 10–12 | 25–35 | Explore Quebec · French conversation, ice hotel, skiing; serving meals with a local church, visiting seniors · Joshua Expeditions | Winterim 2027 | $3,150-3,450 | Feb. 28 – Mar. 5 | E. McGinnis | WP27 |
| 2026–27 | **Dominican Republic** | 10–12 | 16–32 | Service learning with SCORE International · ministry days in villages | Winterim 2027 | $1,900-2,200 | Feb. 28 – Mar. 5 | O. Brilhante, J. Bennett | WP27 |
| 2026–27 | **Iceland** | 11–12 | 35–40 | Landscape and culture · glacier hike, ice cave, Reykjavik; environmental-stewardship service · Grand Classroom | Winterim 2027 | $4,956-4,966 | Feb. 28 – Mar. 5 | A. Reeves, C. Sturdevant | WP27 |
| 2026–27 | **Italy** — Sorrento, Pompeii, Rome | 9–12 | 24–32 | Art, history and faith · catacombs, Vatican City; service in Rome · Joshua Expeditions | Winterim 2027 | $4,085-4,150 | Feb. 27 – Mar. 5 | B. Gillette, K. Pleshko | WP27 |
| 2026–27 | **Mexico** — La Paz | 10–12 | 16–20 | Service and spiritual formation with Rancho El Camino | Winterim 2027 | $2,000-2,400 | Feb. 28 – Mar. 5 | P. Gyorfi | WP27 |
| 2026–27 | **Portugal** — Lisbon | 10–12 | 10–12 | Shoe distribution with Samaritan's Feet · churches, schools, refugee centers | Winterim 2027 | $3,650-4,150 | Feb. 27 – Mar. 5 | Gatlin, Simmons | WP27 |
| 2025–26 | **Greece** — Athens, Corinth, Nafplio, island cruise | 11–12 | 16–40 | In Paul's footsteps · beach clean-up with the Surfrider Foundation and Save Your Hood | Winterim 2026 | $3,600-3,900 | Mar. 8–13 | K. Pleshko, S. Jones | WP26 |
| 2025–26 | **Brazil** — Rio de Janeiro ("Beauty of Brazil") | 10–12 | 18–30 | Afro-Brazilian culture, Carnaval roots, Corcovado; a day serving with a local missions base · EF Tours | Winterim 2026 | $4,425-4,825 | Mar. 7–13 | K. Cochran | WP26 |
| 2025–26 | **Brazil** — Rio de Janeiro (female athlete sports ministry) | 9–12, female athletes | 10–25 | Sport clinics and church outreach | Winterim 2026 | $2,500-3,000 | Mar. 7–13 | T. Rice | WP26 |
| 2025–26 | **England** — Birmingham | 10–12 | 16–20 | Mission trip with a local church · food distribution, youth outreach | Winterim 2026 | $3,200-3,500 | Mar. 7–13 | J. Simmons, A. Gatlin | WP26 |
| 2025–26 | **Costa Rica** | 10–12, female | 16–30 | Wildlife biology, plate tectonics and conservation · tree-planting, a wildlife sanctuary, an orphanage | Winterim 2026 | $3,300-3,500 | Mar. 8–13 | S. Switzer | WP26 |
| 2025–26 | **Dominican Republic** | 10–12 | 16–30 | Service learning with SCORE International | Winterim 2026 | $2,100-2,250 | Mar. 8–13 | O. Brilhante | WP26 |
| 2025–26 | **Panama** | **9–10** | 16–21 | Vacation Bible School at an inner-city Christian school; a day of prayer with Crossroads Christian Academy; Panama Canal, Panamá Viejo, an Emberá village | Winterim 2026 | $1,600-1,800 | Mar. 8–13 | B. & L. Giller | WP26 |
| 2025–26 | **Scotland** — Highlands, Edinburgh, Glasgow | 10–12, female | 20–30 | History and culture; a day of service in Glasgow | Winterim 2026 | $4,650-5,045 | Mar. 7–13 | A. Reeves, C. Sturdevant | WP26 |
| 2023–24 | **Dominican Republic** | 10–12 | up to 40 | Service with SCORE International | Winterim 2024 | $2,000 | Feb. 24 – Mar. 2 | O. McCarrick | WP24 |
| 2023–24 | **Dominican Republic** — varsity baseball | 9–12, baseball team | up to 25 | Service with SCORE International + two exhibition games | Winterim 2024 | $2,000 | Feb. 23–27/28 | R. Fronk | WP24 |
| 2023–24 | **Ecuador** — Quito, Baños, Guayaquil, Isla de la Plata | 10–12 | up to 27 | Educational and adventure · Spanish practice, serving at a cocoa plantation | Winterim 2024 | $3,200 | Feb. 24 – Mar. 2 | K. Cochran | WP24 |
| 2023–24 | **Iceland** | 10–12 | up to 35 | Educational and adventure · glacier, ice cave, Reykjavik | Winterim 2024 | $3,750 | Feb. 24 – Mar. 1 | C. Sturdevant | WP24 |
| 2023–24 | **Germany & Austria** — Munich, Salzburg | 9–12 | up to 35 | History and culture · Dachau, Neuschwanstein, Hohensalzburg | Winterim 2024 | $3,850 | Feb. 24 – Mar. 2 | Reeves, Nixon | WP24 |
| 2023–24 | **Greece & Italy** — Athens, Delphi, Sorrento, Pompeii, Rome | 9–12 | up to 36 | Art, history and faith · Mars Hill; a service project in Rome | Winterim 2024 | $4,300 | Feb. 24 – Mar. 2 | K. Pleshko, B. Gillette | WP24 |
| 2023–24 | **Panama** | 9–10 | up to 20 | Mission and service (as 2025–26) | Winterim 2024 | $1,600 | Feb. 25 – Mar. 1 | B. & L. Giller | WP24 |
| 2023–24 | **Portugal** — Lisbon | 10–12 | up to 15 | Mission and service with Samaritan's Feet · churches, children's centers, refugee centers | Winterim 2024 | $3,700 | Feb. 24 – Mar. 2 | J. Simmons | WP24 |
| 2022–23 | **Dominican Republic** | 10–12 | up to 40 | Service and mission with SCORE International · sugar cane villages | Winterim 2023 | $2,500 | Feb. 26 – Mar. 4 | O. McCarrick | WB-US-2022 |
| 2022–23 | **Dominican Republic** — varsity baseball | 9–12, baseball team | up to 22 | Service with SCORE International + two exhibition games | Winterim 2023 | $2,000 | Feb. 25 – Mar. 1 | G. Simmons | WB-US-2022 |
| 2022–23 | **Italy & Greece** | 9–12 | up to 36 | Art, history and faith · Athens, Delphi, Pompeii, Rome | Winterim 2023 | $5,200 | Feb. 24 – Mar. 4 | C. Bishop, B. Gillette | WB-US-2022 |
| 2022–23 | **England & France** — London, Stratford-upon-Avon, Oxford, Paris | 9–12 | up to 30 | Literary history · the Globe, Shakespeare's birthplace | Winterim 2023 | $3,300 | Feb. 26 – Mar. 4 | K. Cochran | WB-US-2022 |
| 2022–23 | **Mexico** — La Misión, Baja California | 10–12 | up to 15 | Mission and service with Samaritan's Feet | Winterim 2023 | $3,000 | Feb. 25 – Mar. 4 | J. Simmons, R. Mina | WB-US-2022 |
| 2022–23 | **Panama** | 9–12 | up to 20 | Mission and service (Vacation Bible School; Crossroads Christian Academy) | Winterim 2023 | $1,600 | Feb. 26 – Mar. 3 | B. & L. Giller | WB-US-2022 |

**Our count: 29 trips abroad offered across four Winterims** (2023: 6, 2024: 8, 2026: 8,
2027: 7). **Countries, our count: 15** — Austria, Brazil, Canada, Costa Rica, Dominican
Republic, Ecuador, France, Germany, Greece, Iceland, Italy, Mexico, Panama, Portugal and the
United Kingdom (England 2023 and 2026, Scotland 2026, counted once).

**Left out of the ledger, deliberately:** Winterim 2023 "Explore Puerto Rico" (a U.S.
territory; the school filed it with the out-of-town trips, not as international) and Winterim
2027 "Pacific Northwest" (the packet files it under **Domestic Travel**, though it crosses to
Vancouver Island, British Columbia). Domestic and local experiences are not this area's
ledger.

**2024–25 (Winterim 2025) — no packet found.** The live URL was never linked from the US
page (Wayback snapshots Nov 2024 – May 2025 still link the 2024 packet) and no 2025 packet
URL was found. The ledger skips that year; "which trips ran in 2025" is a Verdict question.

## Not verified at planning — `/implement` fetches or drops

| Claim | Where the PDF got it | Action |
|---|---|---|
| Multicultural Festival story ("each lower school classroom learns about a specific country …"; "From Kenya to Japan to Peru") | MCF | **404, no Wayback capture.** Drop the story; CURR + LSB already verify the annual Multicultural Festival. |
| "Calendar (Winterim entries)" URL (`…/home-page-posts/post/2020-scholastic-writing-winners`) and the 2026-27 calendar's "MARCH 2027 · 1-5 US Winterim" | PDF | Not needed — WP27 states the dates. Not fetched. |
| "Seal of Biliteracy" as a school program | SS (one student's list) | Not a program page. Do not render; a Verdict question only. |
| Winterim 2023 / 2024 photo captions dated by filename (`23_US-…`, `24_US-…`) | US image filenames | Filename prefixes are our inference, not a published date — captions must not state a year from them. |
| AP French/Spanish/European History via FindingSchool | Secondary | Superseded by USG (the school's own guide). Drop the directory. |
| Faculty M.Ed. "with a concentration in global studies in education" | EN4370 | Fetched but names a teacher; not needed. Drop. |
| Did each offered trip run? | — | Not published per trip. Render as offerings; Verdict asks. |

## Official-page conflicts and spellings

- **Winterim timing:** US page "takes place during the end of February"; WP27 "Mar. 1-5,
  2027" with overnight trips departing from Feb. 27–28; WP26 "Mar. 9-13, 2026"; WP24 "the
  last week of February". The current packet wins; **render "Winterim 2027", never a date
  range**, and describe Winterim as a week in late winter, at the turn of February and March.
- **Winterim credit:** CURR lists "Winterim - 1" among graduation units; USG and WP27 say .25
  per year toward 1.0. **No conflict** — render ".25 a year, 1.0 to graduate".
- **J-Term start:** the PDF's "existed by 2012-13" is wrong; V1213 announces it for the next
  year (first J-Term January 2014).
- **Peru:** a Class of 2026 senior recalls a "grade 10 Winterim trip to Peru" (2023–24), but
  WP24 lists no Peru trip (Ecuador is the nearest). Student recollection vs the school's
  packet — **the packet wins; Peru does not render.**
- **"Knights Nation Club" / "Knights Nations Club":** the article uses both; its title says
  "Knights Nations Club". Render "Knights Nations Club".
- **Romans 12:** the PDF says "parent group"; DIV says "members of the CCS community".
- **Global Knights:** a grade-5 MS elective (MSG), an MS "student group" (DIV), and an US
  "Global Knights Club" (DIV).
- **Spellings:** "Neuschwastein" (WP24, sic) → render "Neuschwanstein" only if used; "Sao
  Paulo" → "São Paulo"; "Panama Viejo" → "Panamá Viejo"; "Embera" → "Emberá"; "San
  Fransisco" (US alt text, sic).

## Photo candidates

**`/implement` must open each image and confirm no student is named in it or identifiable
by a caption, before use.** All four below were opened on 2026-10-16: outdoor group shots, no
name, sign, badge or legible caption. Filenames carry no names. Alt text is generic.

| Image | URL | Alt (school's) | Opened |
|---|---|---|---|
| **Italy — St Peter's Square (recommended)** | https://resources.finalsite.net/images/f_auto,q_auto,t_image_size_3/v1709062793/charlotte/gvhiijutollhluqihvkb/23_US-Winterim-4.png | "diverse high school students in Italy" | ~35 students, St Peter's Basilica behind; no names |
| Iceland — waterfall | https://resources.finalsite.net/images/f_auto,q_auto,t_image_size_3/v1709062793/charlotte/rkf53t0kxwa9qowpx6im/24_US-winterim-2.png | "high school students in Iceland" | 10 students at Skógafoss; no names |
| Greece — Delphi | https://resources.finalsite.net/images/f_auto,q_auto,t_image_size_3/v1709127979/charlotte/ayihmpl2zc29op3vmgx9/24-US-Winterim-3.png | "high school girls in Greece" | 8 students at the ruins; no names |
| England — Shakespeare's birthplace | https://resources.finalsite.net/images/f_auto,q_auto,t_image_size_3/v1709062792/charlotte/gomhw07clihoxmxm1jot/23_US-Winterim-5.png | "diverse high school students visiting Shakespeare's birthplace" | not inspected in detail |

Credit as "Photo: Charlotte Christian School". Caption with place + "a Winterim trip" — **no
year** (the year is only in the filename).

## Implement-time verification

Run 2026-10-16 by `/implement christianglobal` (step 2), with `curl -sL` and a browser user
agent, `pdftotext -layout` for PDFs, and the Wayback CDX index.

| Check | Source | How | Result |
|---|---|---|---|
| US page unchanged | US | fetched | Winterim text unchanged ("takes place during the end of February … on-campus, in-town, domestic, and international opportunities"). The packet link still points to `ba353ab7-…` (`2027WinterimPacketdocx.pdf`). **No 2028 packet posted.** |
| DIV unchanged | DIV | fetched | "cultural empathy, global awareness and a posture of humility"; "Director of Diversity, Belonging and Global Awareness"; Romans 12 "members of the CCS community"; "Global Knights student group"; "Global Knights Club and the Global Awareness Prefect". |
| CURR unchanged | CURR | fetched | "impact the global culture for Christ"; "Multicultural Festival". |
| APPLY unchanged | APPLY | fetched | I-20; "Charlotte Christian School does not provide host families." |
| WP27 unchanged | WP27 | fetched | Five goals, registration dates (July 24 / Aug. 28 / Sept. 5 / Sept. 11, 2026), priority rule, "Final trip size and offerings will be determined according to registrations", the seven international trips and their grade bands and ranges, all as in the trip table above. |
| **Winterim 2025 packet FOUND** | **WP25** | Wayback | The Parents' Hub (PAR) snapshots of Sep and Dec 2024 link "Winterim Information" to `https://resources.finalsite.net/images/v1692906838/charlotte/it2s4inji6vynrip4ll4/2025WinterimPacket.pdf` (live: 404). CDX holds two captures, 2024-07-19 and **2024-09-21**; the September one is cited (it revises the Montreal/Québec trip's text and cost). **This fills the 2024–25 gap the planning pass recorded.** |
| EN2922 year | EN2922 | fetched | The same newsletter lists "2019-20 donors", "2020 Scholastic Art Winners", the "2020 Western Region Honors Orchestra", "2020 North Carolina All State honor band in March" and the musical "Feb. 6-8". **Supports "J-Term, winter 2020".** |
| Photo | `23_US-Winterim-4.png` | opened | 800×533, ~35 students in St Peter's Square, St Peter's Basilica behind. No name, sign, badge or legible caption. Saved as `public/travel/charlotte-christian-italy.jpg`. |

**New page key.**

| Key | URL | Level |
|---|---|---|
| **WP25** | `https://web.archive.org/web/20240921230636/https://resources.finalsite.net/images/v1692906838/charlotte/it2s4inji6vynrip4ll4/2025WinterimPacket.pdf` (11 pp., "Winterim 2025 Upper School"), linked from `https://web.archive.org/web/20241213124541/https://www.charlottechristian.com/campus-life/parents` | Wayback (live URL 404) |

WP25 also states: registration "will open on July 26, 2024"; "close at midnight on Aug. 22,
2024"; "confirmed via email by Aug. 29, 2024"; contracts due Sept. 15, 2024; "Winterim is
scheduled Feb. 24-28, 2025"; the same five goals and the same priority rule; and
"Final trip size and offerings will be determined according to registrations". Its
Puerto Rico trip ("this Spanish-speaking US territory") is filed under **Domestic**, so it is
left out of the ledger like 2023's.

**Winterim 2025 international trips (6)** — filed under "International" in WP25.

| Year | Trip | Grades | Group | Theme / partner | Timing (render) | Cost (research) | Travel dates (research) | Leaders (research) | Src |
|---|---|---|---|---|---|---|---|---|---|
| 2024–25 | **Cuba** — Havana, Remedios | 10–12 | 15–20 | Shoe distribution with Samaritan's Feet · schools and deaf communities, with local churches | Winterim 2025 | $2,100-2,200 | Feb. 23 – Mar. 1 | J. Simmons, A. Gatlin | WP25 |
| 2024–25 | **Dominican Republic** | 10–12 | 16–45 | Service learning with SCORE International · ministry days in villages | Winterim 2025 | $1,900-2,250 | Feb. 23–28 | O. McCarrick | WP25 |
| 2024–25 | **Ireland** | 9–12 | 20–40 | "Best of Ireland" · the Cliffs of Moher, Gaelic games, the Book of Kells | Winterim 2025 | $3,625-4,000 | Feb. 23–28 | A. Reeves, R. Mina | WP25 |
| 2024–25 | **Italy** — Sorrento, Pompeii, Rome | 9–12 | 24–40 | Art, history and faith · catacombs, Vatican City; a service opportunity in Rome | Winterim 2025 | $4,050-4,400 | Feb. 23 – Mar. 1 | K. Pleshko, B. Gillette | WP25 |
| 2024–25 | **Canada** — Montréal + Québec City | 10–12 | 20–40 | Francophone Canada · serving others, the Hôtel de Glace, a sugar shack | Winterim 2025 | $2,625-3,225 | Feb. 23–28 | E. McGinnis, J. Rego | WP25 |
| 2024–25 | **Panama** | 9–10 | 16–21 | Vacation Bible School at an inner-city Christian school; a day of prayer with Crossroads Christian Academy; Panamá Viejo, an Emberá village | Winterim 2025 | $1,500-1,700 | Feb. 23–28 | B. & L. Giller | WP25 |

**Recounted with WP25: 35 trips abroad offered across five Winterims** (2023: 6, 2024: 8,
2025: 6, 2026: 8, 2027: 7). **Countries, our count: 17**: the 15 above plus **Cuba** and
**Ireland**. The Republic of Ireland is counted separately from the United Kingdom.

**Consequences for the plan.** These figures supersede the plan's 29 / 15 / four-packet
figures. The ledger gains a `2024–25` year, the SCORE ledger gains a `2024–25` row, the
Samaritan's Feet cell gains Cuba (2025), and the Verdict's "no Winterim 2025 packet"
question is dropped, since the packet is now found.
