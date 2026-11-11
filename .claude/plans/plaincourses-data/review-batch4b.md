# Plain-language review — course-offerings (src/data/courseOfferings.ts)

Base `HEAD` → working tree. Generated 2026-11-11 by `scripts/plain_review.mjs`. Grades are Flesch–Kincaid over units of ≥30 words (— below that). "hook" is what the PostToolUse hook would still report.

| School | Changed units |
|---|--:|
| charlotte-latin | 1 |
| charlotte-catholic | 7 |
| **Total** | **8** |

Guards: **3 FAILED**.

- (p) charlotte-latin:divisions[0].departments[0].courses[3].description: name new "United"
- (p) charlotte-latin:divisions[0].departments[0].courses[3].description: name new "States"
- (p) charlotte-catholic:divisions[0].departments[1].courses[15].description: name new "STEM"

| # | school | path | before | after | words b→a | grade b→a | hook | notes |
|--:|---|---|---|---|---|---|---|---|
| 1 | charlotte-latin | `divisions[0].departments[0].courses[3].description` | Students discover the story of our country and world from varied perspectives. | Students discover the story of the United States and the world from varied perspectives. | 12→14 | —→— | pass |  |
| 2 | charlotte-catholic | `divisions[0].departments[1].courses[15].description` | Do you like building things? Do you tend to be curious how things work? | For students who like to build and wonder how things work: a hands-on rotation through STEM fields, plus research and presentations on STEM topics, including careers that suit them. | 14→29 | —→— | pass |  |
| 3 | charlotte-catholic | `divisions[0].departments[8].courses[6].description` | This course recognizes how Jesus Christ, through his great love for us, instituted the Sacraments as the ordinary means of receiving salvation and entrusted them to the Church. | Studies how Jesus Christ, out of his great love for humanity, instituted the Sacraments as the ordinary means of receiving salvation and entrusted them to the Church. | 28→27 | —→— | pass |  |
| 4 | charlotte-catholic | `divisions[0].departments[9].courses[21].description` | Join this award-winning class that will lay the groundwork for hands-on experience in the world of clothing design and application. | Lays the groundwork for hands-on experience in the world of clothing design and application, in a class the school calls award-winning. | 20→21 | —→— | pass |  |
| 5 | charlotte-catholic | `divisions[0].departments[9].courses[22].description` | The clothes look great, but why do they look great? Learn about color theory and aesthetics to perfect your skills that can launch your career in the industry. | Uses color theory and aesthetics to show why costumes look great, building skills that the school says can launch a career in the industry. | 28→24 | —→— | pass |  |
| 6 | charlotte-catholic | `divisions[0].departments[9].courses[23].description` | Interested in the craft of technical theatre? This program allows students the chance to design, build, rig, and engineer all the technical elements of our theatre performances. | For students interested in the craft of technical theatre: a chance to design, build, rig, and engineer all the technical elements of the school’s theatre performances. | 27→26 | —→— | pass |  |
| 7 | charlotte-catholic | `divisions[0].departments[9].courses[25].description` | Begin your journey to stardom as a student of the craft of acting, directing, and movie making. | A beginning course in the craft of acting, directing, and movie making, where students learn what it takes to command an audience through performance. | 17→24 | —→— | pass |  |
| 8 | charlotte-catholic | `divisions[0].departments[9].courses[26].description` | Come see how we make it look easy. The world of stage craft is vast and can lend itself to numerous other career paths. | Covers stage craft, a vast field that the school says can lend itself to numerous other career paths. | 24→18 | —→— | pass |  |

## Why these rows changed

Batch 4 amendment, at the user's request (2026-11-11): descriptions that kept a school catalog's
first- or second-person voice ("we", "us", "our", "you", "your", "Join…", "Come see…") read on this
site as the site itself speaking. A scan of every Course Offerings description found 8; each is
rewritten in a neutral voice from the course's own guide entry (Charlotte Catholic: section D of
the full-descriptions source file, added for this amendment from the same guide, SHA-256
unchanged) or the school's record (Charlotte Latin, line 282). **Left as they are, on purpose:**
quoted school lines (Latin 7 "Are you ready to travel back in time?", Charlotte Prep's quoted
math line), the curriculum unit title "Regions of Our Country" (Cannon), and "US" meaning the
country.

## Guard hits by design

- (p) "United", "States" new: Charlotte Latin's "our country" made explicit.
- (p) "STEM" new: Introduction to STEM's old text ("Do you like building things? Do you tend to be
  curious how things work?") described nothing; the new text comes from its own entry.

## Independent review

A fresh `general-purpose` reviewer checked the 7 drafted rows against section D. **5 findings, all
fixed:** STEM's "research … on STEM careers" narrowed the guide's "various topics related to STEM,
including career pathways" (now "STEM topics, including careers that suit them"); Honors Costume's
"can launch a career" was the school's claim stated as ours (now "the school says"); Theatre:
Design and Tech misparsed ("technical theatre design, build, …") and dropped "a chance to"; Behind
the Scenes' "An introduction to" added a level word and "can lead to" strengthened "can lend
itself to" (now "Covers stage craft, … that the school says can lend itself to …"). It flagged the
non-honors Costume Design and Production ("Join this award-winning class"), which was then added:
"Lays the groundwork for hands-on experience in the world of clothing design and application, in a
class the school calls award-winning." Left as drafted: The Sacraments ("his great love for
humanity" for the catalog's "us"), On The Stage ("A beginning course", supported by grade 9, no
prerequisite and a separate Acting course for students who "seriously pursue" it).
