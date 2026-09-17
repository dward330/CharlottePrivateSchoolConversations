# Trinity Episcopal School — The Arts — Program Overview and Ensembles

## Provenance

- **Retrieved by:** Claude (Claude Code agent), on behalf of Derrick.
- **Retrieval date:** 2026-09-16
- **Method:** All **98 non-PDF URLs in the live sitemap** were fetched into a local
  corpus and grepped, rather than relying on the site's own search. Quotes are
  char-for-char from raw page source. The 2026-27 School Profile PDF was extracted with
  `pdftotext -layout`.
- **School:** Trinity Episcopal School, 750 E. 9th Street, Charlotte, NC 28202 — **K–8**.

### ⚠️ Disambiguation — production titles are the classic contamination vector

**Trinity Episcopal School, Austin TX** (`austintrinity.org`) has staged *Matilda*,
*Annie*, *Frozen* and *High School Musical*. **None of those are this school's.**
**Trinity Episcopal School, Richmond VA** (`trinityes.org`) is a grades 8–12 high school.
Zero hits for any of those titles appear in this corpus. Every production named below is
sourced to Trinity Charlotte's own Vimeo channel or its own web pages.

### ⚠️ Method trap — the site's own search cannot establish a negative

`/search.cfm?q=` is **JS-rendered and returns only nav chrome** — it yields zero results
for terms that demonstrably exist on the site. Every negative below was established by
grepping the fetched 98-page corpus, never by the site search.

Two dead URLs still surfaced by search engines with **stale** content:
`/academics/lower-school/ls-curriculum` (404, last archived 2021) and
`/academics/honor-code.cfm` (404). See the strings note below — this cost a real
contradiction.

## Source URLs

- Lower School Enrichments — https://www.tescharlotte.org/academics/lower-school-enrichments.cfm
- Middle School Enrichments — https://www.tescharlotte.org/academics/middle-school-enrichments.cfm
- 2026-27 School Profile (PDF) — https://www.tescharlotte.org/editoruploads/files/26-27SchoolProfile.pdf
- Vimeo channel API — https://vimeo.com/api/v2/tescharlotte/videos.json

> There is **no `/arts` page on this site** — it provably does not exist. The arts data
> is published, but on the two Enrichments pages, in the profile PDF, and on Vimeo.

## ⚠️ SETTLED: there is NO strings or orchestra ensemble

This resolves a documented conflict between sources, and the answer is unambiguous.

**Live Lower School Enrichments page, verbatim:**

> "The music program provides many opportunities for individual growth and fosters every
> child's innate love of music. **K-4 students participate in general music classes.
> Beginning in 5th Grade, students may choose from one of two ensembles: chorus or band.**
> Ensembles perform at chapels, commencement, and venues outside of school."

`strings`, `string ensemble` and `orchestra` return **ZERO hits across all 98 sitemap
pages and the 2026-27 School Profile PDF.**

**The contradicting source was traced and is dead.** The "fourth grade… chorus, strings
or band" wording comes from `https://www.tescharlotte.org/academics/lower-school/ls-curriculum`,
which **now returns HTTP 404** and whose last Wayback capture is **2021** (20210512,
20210922, 20211201 — nothing after). The school moved from *4th grade / three ensembles
including strings* to *5th grade / two ensembles* at some point after 2021. It survives
only in search-engine snippets.

**Confirmed absent: strings / orchestra. Do not ship it.**

## The ensemble ladder

| Grades | Offering |
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
> Copy each char-for-char per page; do not normalize them to one word.

## Grade-level productions

**Lower School Enrichments, verbatim:**
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
annual calendar.

## Named productions — from the school's own Vimeo channel

The channel page is JS-rendered and yields nothing; the catalog comes from
`https://vimeo.com/api/v2/tescharlotte/videos.json` (use `?page=N`; the
`/videos/page:N.json` path form 404s; expect HTTP 403 after ~3 rapid pages). 60 videos
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
*TES presents: Be A Light* (2021), *What the World Needs Now* (2021).

## Visual arts — a named pedagogy

The identical passage appears on both the LS and MS Enrichments pages, verbatim:

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
**Shelby Hawk**.

## ⚠️ Confirmed absent — named arts facilities

`auditorium`, `black box` and `art gallery` return **ZERO hits** across all 98 pages.

The only named campus facility is the **IDEA (STEM) Lab**, which is **not an arts space**.
Chapel and performance gatherings happen in **"our Gym"** and **Jamie's Courtyard** — both
generic spaces, neither an arts facility. Open houses are held in "Trinity's Center for
Community and the Arts", which is the only arts-adjacent name on the site and is not
described as a performance venue.

**No facilities card should be built.** This one is a genuine null.
