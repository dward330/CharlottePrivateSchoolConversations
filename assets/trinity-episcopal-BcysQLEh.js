var e=`trinity-episcopal`,t=`the-arts`,n=14,r=[{subtopic:`Program Overview and Ensembles`,source_file:`Trinity Episcopal School - The Arts - Program Overview and Ensembles.md`,preview:`# Trinity Episcopal School — The Arts — Program Overview and Ensembles`,text:`# Trinity Episcopal School — The Arts — Program Overview and Ensembles`},{subtopic:`Source URLs`,source_file:null,preview:`- Lower School Enrichments — https://www.tescharlotte.org/academics/lower-school-enrichments.cfm - Middle School Enrichments — https://www.tescharlotte.org/academics/middle-school-enrichments.cfm - 2026-27 School Profile (PDF) — https://www.tescharlotte.org/editoruploads/files/26-27SchoolProfile.pdf - Vimeo channel…`,text:`- Lower School Enrichments — https://www.tescharlotte.org/academics/lower-school-enrichments.cfm
- Middle School Enrichments — https://www.tescharlotte.org/academics/middle-school-enrichments.cfm
- 2026-27 School Profile (PDF) — https://www.tescharlotte.org/editoruploads/files/26-27SchoolProfile.pdf
- Vimeo channel API — https://vimeo.com/api/v2/tescharlotte/videos.json

> There is **no \`/arts\` page on this site** — it provably does not exist. The arts data
> is published, but on the two Enrichments pages, in the profile PDF, and on Vimeo.`},{subtopic:`⚠️ SETTLED: there is NO strings or orchestra ensemble`,source_file:null,preview:`This resolves a documented conflict between sources, and the answer is unambiguous. Live Lower School Enrichments page, verbatim: > "The music program provides many opportunities for individual growth and fosters every > child's innate love of music. K-4 students participate in general music classes. > Beginning in…`,text:`This resolves a documented conflict between sources, and the answer is unambiguous.

**Live Lower School Enrichments page, verbatim:**

> "The music program provides many opportunities for individual growth and fosters every
> child's innate love of music. **K-4 students participate in general music classes.
> Beginning in 5th Grade, students may choose from one of two ensembles: chorus or band.**
> Ensembles perform at chapels, commencement, and venues outside of school."

\`strings\`, \`string ensemble\` and \`orchestra\` return **ZERO hits across all 98 sitemap
pages and the 2026-27 School Profile PDF.**

**The contradicting source was traced and is dead.** The "fourth grade… chorus, strings
or band" wording comes from \`https://www.tescharlotte.org/academics/lower-school/ls-curriculum\`,
which **now returns HTTP 404** and whose last Wayback capture is **2021** (20210512,
20210922, 20211201 — nothing after). The school moved from *4th grade / three ensembles
including strings* to *5th grade / two ensembles* at some point after 2021. It survives
only in search-engine snippets.

**Confirmed absent: strings / orchestra. Do not ship it.**`},{subtopic:`The ensemble ladder`,source_file:null,preview:`| Grades | Offering | |---|---| | K–4 | General music, all students | | 5 | Choose one of two ensembles: chorus or band | | 6 | Choose one of two ensembles: choir or band | | 7–8 | Advanced Band or Advanced Choir, for those continuing | Middle School Enrichments, verbatim: > "6th Grade students choose from one of two…`,text:`| Grades | Offering |
|---|---|
| K–4 | General music, all students |
| **5** | Choose one of two ensembles: **chorus** or **band** |
| **6** | Choose one of two ensembles: **choir** or **band** |
| **7–8** | **Advanced Band** or **Advanced Choir**, for those continuing |

**Middle School Enrichments, verbatim:**
> "6th Grade students choose from one of two ensembles: choir or band. 7th and 8th Grade
> students who decide to continue in an ensemble can choose Advanced Band or Advanced
> Choir… Ensembles perform at chapels, commencement, and various venues outside of school."

> ⚠️ **Note the school's own wording shift: "chorus" in 5th grade, "choir" in 6th.**
> Copy each char-for-char per page; do not normalize them to one word.`},{subtopic:`Grade-level productions`,source_file:null,preview:`Lower School Enrichments, verbatim: > "Each grade level in Lower School features a dramatic or musical performance, such as > Fairy Tale Plays in First Grade and Shakespeare in Fifth Grade." Middle School Enrichments, verbatim: > "Middle School students may also choose to take the drama elective within their >…`,text:`**Lower School Enrichments, verbatim:**
> "Each grade level in Lower School features a dramatic or musical performance, such as
> **Fairy Tale Plays in First Grade** and **Shakespeare in Fifth Grade**."

**Middle School Enrichments, verbatim:**
> "Middle School students may also choose to take the **drama elective** within their
> schedule, or participate in the **winter play or spring musical**."

### ⚠️ The production slate CONFLICTS between the PDF and the web pages

**2026-27 School Profile PDF, verbatim:**
> "K-8 Performing Arts Program: **4th Grade Musical; 5th Grade Shakespeare Review;
> Middle School fall play, winter musical, and choir and band concerts**"

| | Profile PDF | Web pages |
|---|---|---|
| Lower School | 4th Grade Musical | 1st Grade Fairy Tale Plays, 5th Grade Shakespeare |
| Middle School | fall play, winter musical | winter play, spring musical |

The Vimeo record supports **both**: *4th Grade "Aladdin"* (2021) matches the PDF, while
*1st Grade Fairy Tale Plays* (2025) and *Shakespeare 2025* match the web pages.

**Reading:** the ensemble ladder is stable and should be cited from the web pages; the
**production slate varies by year** and should be presented as such, not as a fixed
annual calendar.`},{subtopic:`Named productions — from the school's own Vimeo channel`,source_file:null,preview:"The channel page is JS-rendered and yields nothing; the catalog comes from `https://vimeo.com/api/v2/tescharlotte/videos.json` (use `?page=N`; the `/videos/page:N.json` path form 404s; expect HTTP 403 after ~3 rapid pages). 60 videos retrieved. | Date | Title as published | URL | Length | |---|---|---|---| |…",text:`The channel page is JS-rendered and yields nothing; the catalog comes from
\`https://vimeo.com/api/v2/tescharlotte/videos.json\` (use \`?page=N\`; the
\`/videos/page:N.json\` path form 404s; expect HTTP 403 after ~3 rapid pages). 60 videos
retrieved.

| Date | Title as published | URL | Length |
|---|---|---|---|
| 2025-05-31 | **Shakespeare 2025** | https://vimeo.com/1089330054 | 45:32 |
| 2025-02-24 | **Emma - A Pop Musical** | https://vimeo.com/1059929386 | 69:43 |
| 2025-02-22 | **Durban:Holthouser 1st Grade Fairy Tale Plays** | https://vimeo.com/1059308131 | 28:37 |
| 2021-11-18 | **5th and 6th Grade Band Concert 11-16-21** | https://vimeo.com/647455856 | 21:48 |
| 2021-11-04 | **4th Grade "Aladdin" Performance** | https://vimeo.com/642493556 | 35:02 |
| 2021-10-21 | **5th-6th Grade Fall Choir Performance - Final** | https://vimeo.com/637686767 | 33:37 |
| 2020-05-21 | **Spring Arts Fest 2020: Selections from Fiddler on the Roof** | https://vimeo.com/421094281 | 10:48 |
| 2020-05-20 | Spring Arts Fest Performances | https://vimeo.com/420866235 | 13:16 |
| 2020-05-20 | Spring Arts Fest Rock Artv2 | https://vimeo.com/420867281 | 4:43 |

> ⚠️ The title is **"Emma - A Pop Musical"** — hyphen, not a colon. Copy exactly.

Smaller music pieces on the same channel: *TES Presents: Crowded Table* (2021),
*Kindergarten Students Present: For the Beauty of the Earth* (2020), *Love Train* (2020),
*TES presents: Be A Light* (2021), *What the World Needs Now* (2021).`},{subtopic:`Visual arts — a named pedagogy`,source_file:null,preview:`The identical passage appears on both the LS and MS Enrichments pages, verbatim: > "Trinity's art curriculum follows the pedagogy of Teaching Artistic Behaviors (TAB), > a methodology that is student-focused, choice-based, and teacher-facilitated. The > learning environment is designed to provide centers or mini-art…`,text:`The identical passage appears on both the LS and MS Enrichments pages, verbatim:

> "Trinity's art curriculum follows the pedagogy of **Teaching Artistic Behaviors (TAB)**,
> a methodology that is student-focused, choice-based, and teacher-facilitated. The
> learning environment is designed to provide **centers or mini-art studios** complete
> with instructional information, menus, resources, materials, and tools. Students move
> independently between centers, utilizing materials, tools and resources as needed in
> their art-making, such as **painting, clay, or printmaking**."

> "We value the process of art as children as well as students as artists… Edmund Feldman
> states, '…art is a universally human act,' so its importance is held in high regard…
> Although the product is usually fantastic the process-based learning is where the beauty
> is!"

> Minor per-page difference to preserve: LS writes "mini-art studios" / "art-making";
> MS writes "mini art studios" / "art making".

**Visual Arts Director: Jen Rankey-Zona** (a founding teacher). Art teacher:
**Shelby Hawk**.`},{subtopic:`⚠️ Confirmed absent — named arts facilities`,source_file:null,preview:'`auditorium`, `black box` and `art gallery` return ZERO hits across all 98 pages. The only named campus facility is the IDEA (STEM) Lab, which is not an arts space. Chapel and performance gatherings happen in "our Gym" and Jamie\'s Courtyard — both generic spaces, neither an arts facility. Open houses are held in…',text:`\`auditorium\`, \`black box\` and \`art gallery\` return **ZERO hits** across all 98 pages.

The only named campus facility is the **IDEA (STEM) Lab**, which is **not an arts space**.
Chapel and performance gatherings happen in **"our Gym"** and **Jamie's Courtyard** — both
generic spaces, neither an arts facility. Open houses are held in "Trinity's Center for
Community and the Arts", which is the only arts-adjacent name on the site and is not
described as a performance venue.

**No facilities card should be built.** This one is a genuine null.

---`},{subtopic:`Recognition and Exhibitions`,source_file:`Trinity Episcopal School - The Arts - Recognition and Exhibitions.md`,preview:`# Trinity Episcopal School — The Arts — Recognition and Exhibitions`,text:`# Trinity Episcopal School — The Arts — Recognition and Exhibitions`},{subtopic:`Source URLs`,source_file:null,preview:`- Trinity artists honored — https://www.tescharlotte.org/trinity-artists-honored-in-local-exhibits/ - CATO teaching award — https://www.tescharlotte.org/jen-rankey-zona-receives-excellence-in-teaching-award/ - Ghana art exchange — https://www.tescharlotte.org/fifth-grade-continues-art-exchange-with-ghana-students/`,text:`- Trinity artists honored — https://www.tescharlotte.org/trinity-artists-honored-in-local-exhibits/
- CATO teaching award — https://www.tescharlotte.org/jen-rankey-zona-receives-excellence-in-teaching-award/
- Ghana art exchange — https://www.tescharlotte.org/fifth-grade-continues-art-exchange-with-ghana-students/`},{subtopic:`Student recognition — March 2026`,source_file:null,preview:`From "Trinity Artists Honored in Local Exhibits", March 7, 2026: ### Youth Art Month exhibition — Carolina Theatre Six Lower School students were selected for the Youth Art Month exhibition at the Carolina Theatre, spanning Kindergarten through 4th grade (one student each from K, 1st, 2nd and 4th; two from 3rd). ###…`,text:`From "Trinity Artists Honored in Local Exhibits", **March 7, 2026**:

### Youth Art Month exhibition — Carolina Theatre

**Six Lower School students** were selected for the Youth Art Month exhibition at the
**Carolina Theatre**, spanning **Kindergarten through 4th grade** (one student each from
K, 1st, 2nd and 4th; two from 3rd).

### "Deeply Rooted" exhibition — VAPA Center, February 2026

**Seventeen seventh- and eighth-grade Studio Art students** exhibited work on
**Charlotte's Black history** at the **VAPA Center**.

### Two stipend awards

**Two students received stipend awards** for individual works — one 8th-grade piece
titled *"The Laureate"*, honoring North Carolina poet laureate **Jaki Shelton Green**,
and one 7th-grade piece titled *"The Boy Who Flew."*

Art teacher **Shelby Hawk**, verbatim:
> "I am truly so honored to teach these wonderful artists."`},{subtopic:`Faculty recognition — May 2025`,source_file:null,preview:`Jen Rankey-Zona, Visual Arts Director and a founding teacher of the school, received a 2025 CATO Excellence in Teaching Award from the Arts & Science Council — one of six educators recognized across the Charlotte area. Verbatim: > "I'm humbled and honored." Head of School Imana Sherrill: > "Her impact is felt deeply…`,text:`**Jen Rankey-Zona**, **Visual Arts Director** and a **founding teacher** of the school,
received a **2025 CATO Excellence in Teaching Award** from the **Arts & Science Council** —
**one of six educators** recognized across the Charlotte area.

Verbatim:
> "I'm humbled and honored."

Head of School **Imana Sherrill**:
> "Her impact is felt deeply at Trinity and far beyond."`},{subtopic:`An international art exchange — ongoing since 2023-24`,source_file:null,preview:`From "Fifth Grade Continues Art Exchange with Ghana Students", October 29, 2024. Fifth grade runs an art exchange with students in Ghana, through the nonprofit Children Inspiring Hope (CIH). At the time of writing it was in its second consecutive year, having begun in 2023-24 — CIH's first new partner school since the…`,text:`From "Fifth Grade Continues Art Exchange with Ghana Students", **October 29, 2024**.

**Fifth grade** runs an art exchange with students in **Ghana**, through the nonprofit
**Children Inspiring Hope (CIH)**. At the time of writing it was in its **second
consecutive year**, having begun in **2023-24** — CIH's **first new partner school since
the pandemic**.

Led by **Jen Rankey-Zona** with CIH founder **Amy Gaylor Nedriga**. Two exchanges are
described: one on shared humanity, generosity and kindness, and one on **water as a
global resource**.

> ⚠️ **No Ghanaian partner school is named** in the article.

A student line from the water exchange, quoted without attribution per the rule above:
> "Water lets us live Life lets us love and Love helps us be."`},{subtopic:`What this material supports, and what it does not`,source_file:null,preview:'Supports: a `visual` card ("Studio to Gallery") with genuine recognition — two external exhibition venues, a faculty teaching award, an international exchange, and student stipend awards, each with a count and a date. Does NOT support a separate awards card in the theatre sense. The roster\'s `theatre` card is titled…',text:`**Supports:** a \`visual\` card ("Studio to Gallery") with genuine recognition —
two external exhibition venues, a faculty teaching award, an international exchange,
and student stipend awards, each with a count and a date.

**Does NOT support** a separate awards card in the theatre sense. The roster's \`theatre\`
card is titled "Theatre & the Blumeys" and carries a **year-by-year awards ledger** for
the **Blumeys**, which are Blumenthal Performing Arts' **high-school** musical-theatre
awards. **A K–8 school does not compete in them**, and the card must not be titled for
them here. Trinity's recognition is **visual-arts**, not theatre, so it belongs on
\`visual\`.

**Confirmed absent, still:** no named arts facilities (\`auditorium\`, \`black box\`,
\`art gallery\` = 0 hits across all 98 pages). The only named campus facility is the
**IDEA (STEM) Lab**, which is not an arts space.

---`}],i={school_slug:e,topic_slug:t,section_count:14,sections:r};export{i as default,e as school_slug,n as section_count,r as sections,t as topic_slug};