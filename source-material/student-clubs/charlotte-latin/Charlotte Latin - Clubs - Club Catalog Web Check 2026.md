# Charlotte Latin School — Clubs — Club catalog web check (2026)

**Provenance.** Fetched 2026-11-07 from the school's own Clubs page for the Compare "Club
categories" matrix second pass (plan `comparerows`). Club names verbatim.
Source: https://www.charlottelatin.org/student-life/student-clubs/clubs

## Upper School clubs named on the page

Acapella Club · Admissions Ambassadors · Blue Review · Book Club · Chess Club · CLS Math
Tutors · Club Sandwich · Creative Writing Club · Environmental Club · Forensics Club · Girl
Up · Honor Council Advisory Board · Improv Club · International Thespian Society · Math
Club · Model United Nations · Mosaic · National Junior Classical League · Outdoor Club ·
Paws for the Cause · SADD (Students Against Destructive Decisions) · SISTERS · Spanish Club
· Spirit Council · Table Française · World Quest · Yearbook Club. Listed separately:
Blessings in a Backpack, StuCo (Student Council).

## Middle School clubs named on the page ("more than 25 offerings")

Cooking Club · Just Dance Club · Robotics Club · Student Council · Sports Club

## Method

### Re-verification 2026-11-20 (plan `consistency`)

Re-fetched https://www.charlottelatin.org/student-life/student-clubs/clubs with curl (HTTP 200).
The "Upper School Clubs" list is unchanged from 2026-11-07: **27** named clubs, Acapella Club
through Yearbook Club, in the order above. Under "SPECIAL NOTES" the page lists Blessings in a
Backpack and "StuCo (Student Council)" separately, then says: "In addition to the many
opportunities listed above, there are numerous service-related activities organized by the CLS
Service Council available to students each and every week."

Against the app's 25-club catalog (`src/data/clubCatalog.ts`): the app includes 22 of the 27, plus
CLS Service Council, Blessings in a Backpack and Student Council. It omits Acapella Club, Blue
Review, Creative Writing Club, Improv Club and International Thespian Society (the last appears in
the app's Honor Societies card instead).

NSDA year check, same day: the school news post
https://www.charlottelatin.org/about/school-news/news-details/~board/news/post/charlotte-latin-places-in-top-20-debate-programs-in-usa
(page metadata dated 2025-07-25) says "This summer … over five days of competition in June in Des
Moines, IA … The team of [name withheld] ’26 and [name withheld] ’26 ranked in fifth place in the
category of Public Forum Debate". That is the **June 2025** National Tournament; "'26" is the
students' class year.

### The five arts and writing clubs (plan `consistency` LAT-9, 2026-11-20)

Verbatim from the same page, re-fetched 2026-11-20 (HTTP 200, 73,793 bytes). Not added to the app's catalog: the count leaves out arts and writing clubs, as Providence Day's does, and the card now says so (22 of the 27 listed, plus 3 groups listed separately = 25).

- **Acapella Club:** "To have fun informally exploring this style of music. No previous experience required."
- **Blue Review:** "To produce the Charlotte Latin literary journal."
- **Creative Writing Club:** "To provide students with creative writing workshops and opportunities for readings, competition, and publication."
- **Improv Club:** "To provide students with an outlet for their creativity out of the confines of the classroom and/or in addition to their participation in theater department productions."
- **International Thespian Society:** "To honor excellence in high school theater; a part of the Educational Theatre Association."
