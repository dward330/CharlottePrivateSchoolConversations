# Plain-language review — src/data/artsPrograms

Base `HEAD` → working tree. Generated 2026-11-11 by `scripts/plain_review.mjs`. Grades are Flesch–Kincaid over units of ≥30 words (— below that). "hook" is what the PostToolUse hook would still report.

| School | Changed units |
|---|--:|
| hickory-grove-christian | 43 |
| **Total** | **43** |

Guards: **63 FAILED**.

- (a) hickory-grove-christian: prose paths differ — removed [ladder.divisions[0].items[2]] added [visual.media[3].detail, visual.media[4].detail]
- (f) hickory-grove-christian:ladder.stats[2].value: non-prose leaf changed
- (f) hickory-grove-christian:ladder.stats[3].value: non-prose leaf changed
- (f) hickory-grove-christian:ladder.sources[0].label: non-prose leaf changed
- (f) hickory-grove-christian:ladder.sources[0].url: non-prose leaf changed
- (f) hickory-grove-christian:ladder.sources[1].url: non-prose leaf changed
- (f) hickory-grove-christian:ladder.sources[2].url: non-prose leaf changed
- (f) hickory-grove-christian:theatre.sources[0].label: non-prose leaf changed
- (f) hickory-grove-christian:theatre.sources[0].url: non-prose leaf changed
- (f) hickory-grove-christian:music.tracks[0].ensembles[1]: non-prose leaf changed
- (f) hickory-grove-christian:music.tracks[0].ensembles[2]: non-prose leaf changed
- (f) hickory-grove-christian:music.tracks[1].ensembles[0]: non-prose leaf changed
- (f) hickory-grove-christian:music.tracks[1].ensembles[1]: non-prose leaf changed
- (f) hickory-grove-christian:music.tracks[2].ensembles[0]: non-prose leaf changed
- (f) hickory-grove-christian:music.tracks[2].ensembles[1]: non-prose leaf changed
- (f) hickory-grove-christian:music.tracks[2].ensembles[2]: non-prose leaf changed
- (f) hickory-grove-christian:music.sources[0].label: non-prose leaf changed
- (f) hickory-grove-christian:music.sources[0].url: non-prose leaf changed
- (f) hickory-grove-christian:music.sources[1].label: non-prose leaf changed
- (f) hickory-grove-christian:music.sources[1].url: non-prose leaf changed
- (f) hickory-grove-christian:visual.media[0].name: non-prose leaf changed
- (f) hickory-grove-christian:visual.media[1].name: non-prose leaf changed
- (f) hickory-grove-christian:visual.media[2].name: non-prose leaf changed
- (f) hickory-grove-christian:visual.path[2].name: non-prose leaf changed
- (f) hickory-grove-christian:visual.sources[0].label: non-prose leaf changed
- (f) hickory-grove-christian:visual.sources[0].url: non-prose leaf changed
- (f) hickory-grove-christian:visual.sources[1].label: non-prose leaf changed
- (f) hickory-grove-christian:visual.sources[1].url: non-prose leaf changed
- (f) hickory-grove-christian:verdict.sources[0].url: non-prose leaf changed
- (f) hickory-grove-christian:ladder.sources[3].label: non-prose leaf added
- (f) hickory-grove-christian:ladder.sources[3].url: non-prose leaf added
- (f) hickory-grove-christian:music.tracks[1].ensembles[2]: non-prose leaf added
- (f) hickory-grove-christian:visual.media[3].name: non-prose leaf added
- (f) hickory-grove-christian:visual.media[4].name: non-prose leaf added
- (h) hickory-grove-christian:ladder.stats[2].label: THEATRE marker lost (1→0)
- (b) hickory-grove-christian:ladder.divisions[0].items[0]: digit tokens differ -3
- (b) hickory-grove-christian:ladder.divisions[1].items[0]: digit tokens differ +7 +8
- (h) hickory-grove-christian:ladder.divisions[1].items[0]: OPEN marker lost (1→0)
- (b) hickory-grove-christian:ladder.divisions[1].items[1]: digit tokens differ +7 +8
- (b) hickory-grove-christian:ladder.divisions[1].items[2]: digit tokens differ +6 +7 +8
- (b) hickory-grove-christian:ladder.divisions[2].items[2]: digit tokens differ +360
- (h) hickory-grove-christian:ladder.enrichment[0].text: BOUND marker added (0→1)
- (h) hickory-grove-christian:ladder.enrichment[0].text: AUDITION marker added (0→1)
- (n) hickory-grove-christian:theatre.headline: count words differ -three +two
- (n) hickory-grove-christian:theatre.season[0].kind: count words differ -three
- (n) hickory-grove-christian:theatre.season[0].detail: count words differ -three +two
- (b) hickory-grove-christian:music.boardNote: digit tokens differ -4
- (n) hickory-grove-christian:music.boardNote: count words differ +two
- (h) hickory-grove-christian:music.boardNote: REQUIRED marker added (0→1)
- (h) hickory-grove-christian:music.boardNote: AUDITION marker added (0→2)
- (b) hickory-grove-christian:music.ladder[0].text: digit tokens differ +6
- (h) hickory-grove-christian:music.ladder[1].text: BOUND marker added (0→1)
- (h) hickory-grove-christian:music.ladder[2].text: AUDITION marker added (0→1)
- (h) hickory-grove-christian:music.ladderNote: AUDITION marker added (0→1)
- (b) hickory-grove-christian:visual.subhead: digit tokens differ -3 -4 +15
- (b) hickory-grove-christian:visual.pathNote: digit tokens differ -3 -4 +2 +15
- (d) hickory-grove-christian:visual.pathNote: quoted spans differ -"consistently score 3 or 4 on the AP exam"
- (b) hickory-grove-christian:visual.footnote: digit tokens differ -5 +6 +7 +8
- (b) hickory-grove-christian:verdict.holdsUp[1].text: digit tokens differ -3 -4
- (h) hickory-grove-christian:verdict.holdsUp[2].text: BOUND marker added (0→1)
- (b) hickory-grove-christian:verdict.ask[3]: digit tokens differ -3 -4
- (h) hickory-grove-christian:verdict.ask[3]: UNPUBLISHED marker added (0→1)
- (d) hickory-grove-christian:verdict.ask[3]: quoted spans differ -"consistently 3 or 4"

| # | school | path | before | after | words b→a | grade b→a | hook | notes |
|--:|---|---|---|---|---|---|---|---|
| 1 | hickory-grove-christian | `ladder.headline` | A TK–12 arts ladder — visual art and general music for every young student, widening into band, choir, theatre and a leveled studio track in the upper grades. | A TK–12 arts ladder — visual art and music for every young student, widening into band, choir, theatre, dance and a leveled studio track in the upper grades. | 27→27 | —→— | pass |  |
| 2 | hickory-grove-christian | `ladder.stats[0].label` | arts program, integrated in the early grades | arts program, from the Early Education Center up | 7→8 | —→— | pass |  |
| 3 | hickory-grove-christian | `ladder.stats[2].label` | theatre productions, plus a biennial spring musical | drama productions: a fall show and a spring musical | 7→9 | —→— | pass |  |
| 4 | hickory-grove-christian | `ladder.stats[3].label` | music + Thespian (ITS) theatre honor societies | International Thespian Society, the theatre honor society | 6→7 | —→— | pass |  |
| 5 | hickory-grove-christian | `ladder.divisions[0].items[0]` | Visual art at every level — foundation skills in shape, color, texture, value and 3D | Visual art: sketching and drawing first, then painting and other media, with the elements of art and the principles of design | 14→21 | —→— | pass |  |
| 6 | hickory-grove-christian | `ladder.divisions[0].items[1]` | General music aligned to the National Standards: singing, rhythm and Orff instruments | Music class, plus an Elementary Choir with more chances to sing and perform | 12→13 | —→— | pass | caps gone: National, Standards, Orff |
| 7 | hickory-grove-christian | `ladder.divisions[1].items[0]` | Band (6th-grade beginners, 7th–8th intermediate) · Choir (open to all) | Band (6th-grade beginners, 7th–8th intermediate) · Praise Team (7th–8th) | 9→8 | —→— | pass | caps gone: Choir |
| 8 | hickory-grove-christian | `ladder.divisions[1].items[1]` | Theatre and Musical Theatre — stage presence, speech, backstage, acting/singing/dance | Theatre, Musical Theatre and Beginning Dance (7th–8th) — each quarter of Theatre ends with a one-act play | 9→16 | —→— | pass | THEATRE 2→3 |
| 9 | hickory-grove-christian | `ladder.divisions[1].items[2]` | Visual arts: original artwork, color mixing, artist studies (e.g. Picasso), mixed-media portraits | Visual arts: Bible Sketch (6th) and Sewing (7th–8th) | 12→8 | —→— | pass |  |
| 10 | hickory-grove-christian | `ladder.divisions[1].items[3]` | Christmas Chapel, Winter/Spring Performing Arts Concerts, ACSI band festivals | Every course ends with a chance to perform | 9→8 | —→— | pass | caps gone: Chapel, Winter, Spring, Performing, Arts, Concerts, ACSI |
| 11 | hickory-grove-christian | `ladder.divisions[2].items[0]` | Concert Band · Jazz Band · Choir · Musical Theatre · Theatre · Technical Theatre | Concert Band · Chapel Band · High School Choir · Theatre · Musical Theatre · Technical Theatre & Management | 10→13 | —→— | pass | caps gone: Jazz |
| 12 | hickory-grove-christian | `ladder.divisions[2].items[1]` | Visual Arts (Art I–IV), AP Studio Art 2D and Art Appreciation | Art I–IV and AP 2D Studio Art · Ceramics I–II · Fiber Crafts I–II · Art Appreciation | 11→14 | —→— | pass | caps gone: Arts |
| 13 | hickory-grove-christian | `ladder.divisions[2].items[2]` | Yearbook / Student Media — the Exodus yearbook (Yearbook I, Honors Yearbook I–III) | Digital Arts: the Exodus yearbook (Yearbook I, II and III - Honors) · Photography and Design · Digital Media (the HG360 weekly broadcast) · a Communications Internship | 11→23 | —→— | pass | caps gone: Student |
| 14 | hickory-grove-christian | `ladder.enrichment[0].text` | Band students take part in adjudicated festivals (where judges rate each group) every year. The Middle School band has earned superior ratings at ACSI band festivals. Choir performs at community events, statewide festivals and on out-of-state tours. | Band students take part in at least one adjudicated band festival (where judges rate each group) each year. Each spring the Concert Band performs at the ACSI Festival. Students can also audition for NCBA All-District, All-State and Solo & Ensemble. Choir gives performances, goes on tours and sings at community events. | 37→50 | 9.3→6.7 | pass | caps gone: Middle, School |
| 15 | hickory-grove-christian | `ladder.enrichment[1].text` | Drama students compete in fall competitions, and visual-arts students display work throughout the year and compete in public and private competitions. | The spring musical takes part in the Blumey Awards each year. Visual-arts students show their work around campus and at school events, in the Silent Auction and in competitions. | 21→29 | —→— | pass |  |
| 16 | hickory-grove-christian | `theatre.headline` | Three productions a year and a biennial spring musical — with Blumey Award recognition in back-to-back seasons: Seussical in 2025 and Disney's The Little Mermaid in 2026. | Two productions a year, a fall show and a spring musical — with Blumey Award recognition in back-to-back seasons: Seussical in 2025 and Disney's The Little Mermaid in 2026. | 24→26 | —→— | pass |  |
| 17 | hickory-grove-christian | `theatre.season[0].season` | Every year | Every fall | 2→2 | —→— | pass |  |
| 18 | hickory-grove-christian | `theatre.season[0].kind` | Three productions | Fall show | 2→2 | —→— | pass |  |
| 19 | hickory-grove-christian | `theatre.season[0].detail` | Drama students mount three productions per year and compete in fall competitions, drawing students across grade levels. | Drama students stage a fall show each year, the first of the year's two drama productions. | 17→16 | —→— | pass |  |
| 20 | hickory-grove-christian | `theatre.season[1].season` | Every other year | Every spring | 3→2 | —→— | pass |  |
| 21 | hickory-grove-christian | `theatre.season[1].kind` | Large-scale spring musical | Spring musical | 3→2 | —→— | pass |  |
| 22 | hickory-grove-christian | `theatre.season[1].detail` | A biennial spring musical is the marquee production — Seussical (2025) and Disney's The Little Mermaid (2026) are the two most recent, both Blumey-recognized. | The spring musical is the marquee production, and it takes part in the Blumey Awards each year. Seussical (2025) and Disney's The Little Mermaid (2026) are the two most recent, both Blumey-recognized. | 21→30 | —→8.0 | pass |  |
| 23 | hickory-grove-christian | `music.headline` | Band and choir across the divisions — Concert Band, Jazz Band and Choir in High School — with no orchestra published at any level. | Band, choir and worship ensembles across the divisions — Concert Band, Chapel Band and High School Choir in High School — with no orchestra published at any level. | 22→26 | —→— | pass | caps gone: Jazz |
| 24 | hickory-grove-christian | `music.subhead` | The ensemble slate is band- and choir-centered; the honors mark is the Tri-M Music Honor Society, and adjudicated festivals are a recurring fixture. | The ensemble list is band- and choir-centered, and adjudicated festivals are a yearly fixture. No music honor society is named. | 23→20 | —→— | pass | caps gone: Tri-M, Music, Honor, Society |
| 25 | hickory-grove-christian | `music.boardNote` | Middle School band is split into a 6th-grade beginner section and a 7th–8th intermediate section. In elementary school, music is a general-music class taught to the National Standards. The class uses Orff and rhythm instruments, adding recorder in Grade 4. No orchestra or strings ensemble is published at any level, and no a cappella group is named. | Middle School band is split into a 6th-grade beginner section and a 7th–8th intermediate section. Concert Band requires two years of middle school band or an audition, and Chapel Band is by audition. In elementary school, students take Music class and can join the Elementary Choir. No orchestra or strings ensemble is published at any level, and no a cappella group is named. | 56→63 | 8.6→8.3 | pass | caps gone: National, Standards, Orff, Grade |
| 26 | hickory-grove-christian | `music.ladder[0].text` | band and choir run from the elementary grades through High School, with Christmas Chapel and Winter/Spring Performing Arts Concerts on the calendar. | choir starts in the elementary grades and band in 6th grade, with chapel and end-of-semester concerts on the calendar. | 22→19 | —→— | pass | caps gone: High, School, Christmas, Chapel, Winter, Spring, Performing, Arts, Concerts |
| 27 | hickory-grove-christian | `music.ladder[1].label` | Earn a superior rating | Be adjudicated | 4→2 | —→— | pass |  |
| 28 | hickory-grove-christian | `music.ladder[1].text` | band students take part in adjudicated festivals annually, and the Middle School band has earned superior ratings at ACSI band festivals. | band students take part in at least one adjudicated band festival each year, and the Concert Band performs at the ACSI Festival each spring. | 21→24 | —→— | pass | caps gone: Middle, School |
| 29 | hickory-grove-christian | `music.ladder[2].text` | the Tri-M Music Honor Society is the published music honor at HGCS; per-year selection or superior-rating counts are not published. | students can audition for NCBA All-District, All-State and Solo & Ensemble. No music honor society is named, and selection counts are not published. | 20→22 | —→— | pass | caps gone: Tri-M, Music, Honor, Society, HGCS |
| 30 | hickory-grove-christian | `music.ladderNote` | Beyond Tri-M and the ACSI band festivals, no all-state selection, adjudication result count or festival placement is published. | Beyond the ACSI Festival and the NCBA auditions, no all-state selection, adjudication result or festival placement is published. | 18→18 | —→— | pass | caps gone: Tri-M |
| 31 | hickory-grove-christian | `visual.headline` | A leveled studio sequence — Art I through Art IV to AP Studio Art 2D — plus Art Appreciation and the Exodus yearbook publications track. | A leveled studio sequence — Art I through Art IV to AP 2D Studio Art — plus Ceramics, Fiber Crafts, Art Appreciation and a Digital Arts track. | 23→25 | —→— | pass | caps gone: Exodus |
| 32 | hickory-grove-christian | `visual.subhead` | The visual-arts page names an actual leveled path (unlike the performing-arts page), and reports AP Studio Art students consistently scoring 3 or 4. | The visual-arts page lays out a leveled path to a college-level AP portfolio, built from a 15-piece body of work. | 21→20 | —→— | pass | caps gone: Studio, Art |
| 33 | hickory-grove-christian | `visual.media[1].detail` | a High School survey course | handbuilding, sgraffito and glazing, with the wheel in Ceramics II | 5→10 | —→— | pass | caps gone: High, School |
| 34 | hickory-grove-christian | `visual.media[2].detail` | Yearbook I and Honors Yearbook I–III | crochet, cross stitch, sewing and quilting | 6→6 | —→— | pass | caps gone: Honors, Yearbook |
| 35 | hickory-grove-christian | `visual.pathNote` | This sequence is published on the visual-arts page. AP Studio Art students "consistently score 3 or 4 on the AP exam" (scores dipped during remote learning); no National Art Honor Society is published. | This sequence is published on the visual-arts page. AP 2D Studio Art is a 15-piece body of work driven by the student’s own essential question; no National Art Honor Society is published. | 25→32 | —→8.0 | pass |  |
| 36 | hickory-grove-christian | `visual.exhibits[0].detail` | visual-arts students display work throughout the year and compete in public and private competitions | student artwork is displayed across campus, featured in the Silent Auction and entered in competitions | 14→15 | —→— | pass |  |
| 37 | hickory-grove-christian | `visual.footnote` | None of these is published: a named gallery or exhibit event · a National Art Honor Society · external visual-arts recognition (Scholastic or otherwise). K–5 art covers shapes, colors and texture, and Middle School adds artist studies and mixed-media portraits. Both lead into the High School sequence. | None of these is published: a named gallery or exhibit event · a National Art Honor Society · external visual-arts recognition (Scholastic or otherwise). Elementary art builds from sketching and drawing to painting and other media. Middle School offers Bible Sketch (6th) and Sewing (7th–8th). | 45→43 | 7.8→8.3 | pass | caps gone: High |
| 38 | hickory-grove-christian | `verdict.holdsUp[1].text` | the visual-arts page publishes a leveled Art I → IV → AP Studio Art 2D sequence, with AP students consistently scoring 3 or 4. | the visual-arts page publishes a leveled Art I → IV → AP 2D Studio Art sequence, ending in a college-level AP portfolio. | 20→20 | —→— | pass |  |
| 39 | hickory-grove-christian | `verdict.holdsUp[2].text` | band students take part in adjudicated festivals annually, the Middle School band has earned superior ACSI ratings, and Tri-M recognizes the strongest musicians. | band students are judged at a festival at least once a year. The Concert Band plays at the ACSI Festival each spring, and students can try out for NCBA honor bands. | 23→31 | —→5.3 | pass | caps gone: Middle, School, Tri-M |
| 40 | hickory-grove-christian | `verdict.holdsUp[3].text` | visual art and general music reach every young student, widening into band, choir, theatre, technical theatre and the Exodus yearbook by High School. | visual art and music reach every young student, widening into band, choir, theatre, dance, ceramics, fiber crafts and a Digital Arts track by High School. | 23→25 | —→— | pass | caps gone: Exodus; THEATRE 2→1 |
| 41 | hickory-grove-christian | `verdict.ask[0]` | Where do the biennial musicals stage — what is the venue, and how many seats? No performance space is named. | Where does the spring musical stage — what is the venue, and how many seats? No performance space is named. | 19→19 | —→— | pass |  |
| 42 | hickory-grove-christian | `verdict.ask[2]` | Is there any music beyond band and choir — an orchestra, a strings program, or an a cappella group? None is published. | Is there any music beyond band, choir and the worship bands — an orchestra, a strings program, or an a cappella group? None is published. | 21→24 | —→— | pass |  |
| 43 | hickory-grove-christian | `verdict.ask[3]` | What does the AP Studio Art 2D score distribution actually look like year to year, beyond "consistently 3 or 4"? | How do AP 2D Studio Art students score on the AP exam year to year? The visual-arts page publishes no results. | 17→21 | —→— | pass |  |
