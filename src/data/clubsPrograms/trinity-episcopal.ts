// Trinity Episcopal School — Student Clubs (1a / 1b / 1c).
//
// Transcribed from the four committed research files under
// source-material/student-clubs/trinity-episcopal/, each of which carries a
// provenance header, its source URLs, and a hit-count for every "not published"
// claim. Nothing here is inferred.
//
// ⚠️ NO STUDENT NAMES. Trinity is K–8, so every competitor, honor-council member
// and award recipient is a minor. Per the project rule (user, 2026-09-16) the
// RECOGNITION and the COUNTS ship and the children do not. Adults — coaches,
// assistant heads — are named in their professional capacity, which is why
// Jennifer Bader and Ayeola Elias appear below and no student does.
//
// ⚠️ LIVE SITE ONLY (user, 2026-11-14, plan trinitysite). Trinity's fall-2026
// redesign dropped its affinity-groups page and every pre-2026 blog post. Per
// the user's decision, what the live site no longer states came OUT of these
// cards even where it was true: the Mock Trial state titles (2023–2025) and the
// "both won state championships" line, the affinity groups' purpose statements
// and grade ranges, the Pride and Sankofa chapels, the May 2024 Washington trip
// (46 eighth graders) and the 954-pound food drive. The Wayback copies stay in
// source-material/ as the record — never cite them on the page.
//
// Four research outcomes shaped this file:
//
//  1. THE AFFINITY CARD NOW RESTS ON THE PROFILE. The student group names
//     survive only in the 2026-27 School Profile's club list, so `groups`
//     carries each name with its division and nothing more. The parent groups
//     and the chapel services come from the live Belonging and Chapel pages.
//
//  2. THE HONORS CARD IS A COMPETITION-AND-LEADERSHIP CARD, NOT A SOCIETY
//     LEDGER. Trinity has no NHS/NJHS-style chartered society. It has an elected
//     Honor Council and two competitive programs — Mock Trial and Speech &
//     Debate — that the live site now presents as classes with a named coach.
//     The card carries the TITLE_OVERRIDE "Competitions & Student Leadership"
//     (clubsProgram.ts, user 2026-10-19).
//
//  3. NJHS AND STUDENT COUNCIL ARE DELIBERATELY ABSENT. Both return ZERO hits
//     across the old 98-page site, the new site and both profile PDFs, yet a web
//     search returns confident prose about a Trinity NJHS chapter ("grades 6–8…
//     faculty committee") and a Trinity Student Council ("Elected by their
//     classmates…"). That is the same contamination class that produced a bogus
//     "NJHS GPA 3.6" detail — almost certainly another school's page, very
//     likely Trinity Episcopal School in RICHMOND VA (trinityes.org), a grades
//     8–12 high school with a real Clubs & Organizations page. Do not add either
//     club from a search result. The gap flag on `honors` records the absence so
//     a later pass does not re-discover it as a hole.
//
//  4. NO PUBLICATIONS CARD, AND THAT IS NOT THE SAME AS "NO YEARBOOK". The
//     student newspaper and literary magazine are confirmed absent (0 hits
//     each); the yearbook EXISTS (the Paw Print) but is a Parents' Association
//     function. So the zero-items rule omits a student-publications card
//     entirely — and nothing here says the school has no yearbook, because it
//     has one.
//
// The school's own inconsistencies are PRESERVED, not normalized: "Nourish Up"
// (grades K and 1) vs "NourishUp" (grade 6), and the grade-3 partner headed
// "Roof Above" while its body says "Urban Ministry Center". Both spellings are
// the school's; a figure or a name is quoted as its source publishes it.

import type { ClubsProgram } from '../clubsProgram.ts'

const K8_ADVANTAGE = 'https://www.tescharlotte.org/admissions/the-k-8-advantage'
const LEADERSHIP = 'https://www.tescharlotte.org/about-us/school-leadership'
const CELEBRATING = 'https://www.tescharlotte.org/belonging/celebrating-diversity'
const CHAPEL = 'https://www.tescharlotte.org/spirituality/chapel'
const CALENDAR = 'https://www.tescharlotte.org/calendar'
const LOWER_SCHOOL = 'https://www.tescharlotte.org/academics/lower-school'
const MIDDLE_SCHOOL = 'https://www.tescharlotte.org/academics/middle-school'
const SERVICE_LEARNING = 'https://www.tescharlotte.org/spirituality/service-learning'
const AT_A_GLANCE = 'https://www.tescharlotte.org/about-us/trinity-at-a-glance'
const BEYOND = 'https://www.tescharlotte.org/academics/beyondclassroom'
const NEWS = 'https://www.tescharlotte.org/about-us/news/news-landing-page/~board/news/post/'
const ADVOCACY_PANEL = `${NEWS}panel-encourages-8th-grade-to-advocate-for-charlotte`
const WALK_FOR_PEACE = `${NEWS}students-witness-walk-for-peace-during-charlotte-visit`
const STACULTY = 'https://www.tescharlotte.org/about-us/staculty'
const HONOR_CODE = 'https://www.tescharlotte.org/about-us/the-honor-code'
const PROFILE =
  'https://resources.finalsite.net/images/v1790266877/tescharlotteorg/jraele9yxiqjc8nohifm/26-27SchoolProfile.pdf'

export const trinityEpiscopal: ClubsProgram = {
  affinity: {
    headline:
      'Five student affinity groups, two parent affinity groups, and chapel services for the community\'s many traditions — led by an Assistant Head of School for Belonging and Community Engagement.',
    // No subhead: the headline already carries the counts and the leadership.
    umbrella: {
      name: 'Belonging and Community Engagement',
      detail:
        'led by Ayeola Elias, Assistant Head of School for Belonging and Community Engagement · "Affinity groups in Lower and Middle School are inclusive spaces for students and adults that are built around shared identities and experiences."',
    },
    groups: [
      {
        name: 'Young Children of Color (YCC)',
        detail: 'Lower School',
      },
      {
        name: 'Invisible Differences',
        detail: 'Middle School · listed in the 2026-27 School Profile; no description is published',
      },
      {
        name: 'Young People of Color (YPC)',
        detail: 'Middle School',
      },
      {
        name: 'Young People for Social Justice (YPSJ)',
        detail: 'Middle School',
      },
      {
        name: 'Gender Sexuality Alliance (GSA)',
        detail: 'Middle School',
      },
    ],
    strips: [
      {
        title: 'Lower School',
        hint: '· grades K–5',
        text: 'Young Children of Color is a Lower School group. Also in the Lower School: 12 Tribes of Trinity, co-ed groups across grades 3–5, each “led by 2 adult staculty members.”',
      },
      {
        title: 'Middle School',
        hint: '· 4 groups',
        text: 'Young People of Color · Young People for Social Justice · Gender Sexuality Alliance · Invisible Differences — all four are Middle School groups.',
      },
      {
        title: 'Parents',
        hint: '· 2 groups',
        text: 'Cafe Con Padres, the Hispanic parent affinity group, sponsors the Latino Festival · KINDRED, the African American/Black parent affinity group, sponsors the KINDRED Festival. Both work with the Parents\' Association.',
      },
      {
        title: 'In chapel',
        text: 'K-8 chapels celebrate the community\'s diversity "through services for Hispanic Heritage Month, Black History Month, the Jewish High Holy Days, and others." The 2026-27 calendar includes a K-8 Chapel for Diwali.',
      },
    ],
    leadershipTitle: 'Who runs it',
    leadership:
      'Ayeola Elias is Assistant Head of School for Belonging and Community Engagement. Each January the school holds Freedom Fete, around Martin Luther King Jr. Day, with guest speakers on diversity and social justice. No student diversity leadership council is published.',
    flags: [
      {
        kind: 'count',
        text: '**Invisible Differences is on this card, as in the club catalog** (plan consistency TRI-22, 2026-11-20). The 2026-27 School Profile lists it among the Middle School clubs and groups. The old affinity-groups page called it a parent group for families of children with learning differences, but that page is gone (fall-2026 redesign) and no live page says what it is. 12 Tribes of Trinity moved to the Lower School line, so the five named groups match the catalog.',
      },
    ],
    sources: [
      { label: 'tescharlotte.org — The K-8 Advantage (affinity groups)', url: K8_ADVANTAGE },
      { label: 'tescharlotte.org — School Leadership', url: LEADERSHIP },
      { label: 'tescharlotte.org — Celebrating Diversity (parent groups, festivals)', url: CELEBRATING },
      { label: 'tescharlotte.org — Chapel', url: CHAPEL },
      { label: 'tescharlotte.org — 2026-27 calendar (K-8 Chapel, Diwali)', url: CALENDAR },
      { label: 'tescharlotte.org — Lower School page (12 Tribes of Trinity)', url: LOWER_SCHOOL },
      { label: 'tescharlotte.org — 2026-27 School Profile (PDF)', url: PROFILE },
    ],
  },

  service: {
    headline:
      'Every grade from Kindergarten to 7 partners with a named community organization — 10 partners in all — and 8th grade turns it into advocacy.',
    subhead:
      'This is part of the curriculum, not a volunteer club: "Each grade partners with a community organization whose mission and services are related to curricular goals. Our students address real community needs in ways that are connected to and informed by their classroom learning."',
    programs: [
      {
        value: '10',
        valueLabel: 'service-learning partners · grades K–7',
        name: 'The grade-by-grade service ladder',
        detail:
          'Kindergarten and grade 1 partner with Nourish Up. Kindergarten delivers Meals on Wheels weekly, and grade 1 visits the food pantry at First Presbyterian Church and leads the school food drive each November. Grade 2 works with InReach, whose customers visit Trinity monthly for gardening, art, music and self-advocacy. Grade 3 partners with Roof Above / the Urban Ministry Center. Grade 4 partners with the Children of the World Learning Center, learning how preschoolers develop and how bilingual education works. Grade 5 partners with Galilee Ministries of East Charlotte. Grade 6 — "Feeding Our Neighbors" — works with the 8th Street Friendship Garden, the Charlotte Community ToolBank and NourishUp. Grade 7 — "Understanding Our Neighbors" — works with Crisis Assistance Ministry, Hope Haven and the First Ward Child Development Center.',
        source: { label: 'tescharlotte.org — Service Learning', url: SERVICE_LEARNING },
      },
      {
        value: 'a mile',
        valueLabel: 'walked to the partner, monthly · grade 3',
        name: 'Roof Above / Urban Ministry Center — on foot',
        detail:
          'Third graders walk a mile to the Urban Ministry Center once a month for art, soccer, singing with the Urban Ministry Choir, and clothing drives. Walking is part of the point: "Trinity Episcopal School has the longest hallways of any school in Charlotte." Lower School students also make regular walks to the ImaginOn library, Children\'s Theatre and Discovery Place. In January 2026, students in grades 2-8 walked out to witness the Walk for Peace, a pilgrimage of Buddhist monks passing near the school.',
        source: { label: 'tescharlotte.org — Beyond the Classroom', url: BEYOND },
      },
      {
        value: '2',
        valueLabel: 'advocacy trips in 2025-26 · Raleigh and Washington, D.C.',
        name: 'Advocacy and Social Action — the 8th-grade capstone',
        detail:
          'In the Social Issues Seminar, eighth graders pick a social issue, study it, and plan how to advocate for it. Then they "implement that plan during an advocacy trip to Washington, D.C., in May." In 2025-26 the class also studied a transit referendum that Charlotte voters approved. A Dec. 17 panel, with speakers from partners Roof Above and Galilee Ministries, helped students choose topics for "upcoming class trips to Raleigh and Washington, D.C."',
        source: { label: 'tescharlotte.org — "Panel Encourages 8th Grade to Advocate for Charlotte", 2026', url: ADVOCACY_PANEL },
      },
    ],
    // No footnote and no "not a club" flag (user, 2026-09-16). The
    // curricular-not-extracurricular framing reads as apparatus beside the grade
    // partnerships themselves. (The 954-pound food drive came out 2026-11-14 —
    // its post is gone; see the header.)
    flags: [
      {
        kind: 'gap',
        text: 'The school’s own copy spells the same partner two ways and names the grade-3 partner twice: **"Nourish Up"** in grades K and 1 but **"NourishUp"** in grade 6, and grade 3 is **headed "Roof Above"** while its body says **"Urban Ministry of Charlotte" / "Urban Ministry Center"**. Roof Above is the renamed organization. Both spellings are reproduced as published rather than normalized. The partner count (10) is the school\'s own figure on Trinity At a Glance and matches the 10 organizations the Service Learning page names.',
      },
    ],
    sources: [
      { label: 'tescharlotte.org — Service Learning (the full grade-by-grade ladder)', url: SERVICE_LEARNING },
      { label: 'tescharlotte.org — Trinity At a Glance ("10 Service-learning partners")', url: AT_A_GLANCE },
      { label: 'tescharlotte.org — Beyond the Classroom ("the longest hallways")', url: BEYOND },
      { label: 'tescharlotte.org — Middle School page (8th Grade Social Issues Seminar)', url: MIDDLE_SCHOOL },
      { label: 'tescharlotte.org — "Panel Encourages 8th Grade to Advocate for Charlotte", 2026', url: ADVOCACY_PANEL },
      { label: 'tescharlotte.org — "Students Witness Walk for Peace During Charlotte Visit", 2026', url: WALK_FOR_PEACE },
    ],
  },

  honors: {
    headline:
      'An Honor Council students elect each fall, an Honor Code students wrote, and Mock Trial and Speech & Debate taught as classes with their own coach.',
    subhead:
      'Trinity has no honor-society chapter. Its student leadership runs through an elected Honor Council, and its competitive programs, Mock Trial and Speech & Debate, are part of the Middle School schedule.',
    societies: [
      {
        name: 'Mock Trial',
        // Bare division name, as every other school's rows carry. The detail
        // lives in `recognizes` below, which is extracted prose — a qualifier in
        // this field is a sentence in a table cell under a "Division" header,
        // and ships English.
        division: 'Middle School',
        recognizes:
          'A 7th–8th grade elective, listed as "Mock Trial and Speech & Debate", that runs "on alternating days for the entire academic year." Jennifer Bader is the Public Speaking Teacher and the Mock Trial and Speech and Debate Coach.',
        feedsFrom: 'the classroom',
      },
      {
        name: 'Speech & Debate',
        division: 'Middle School',
        recognizes:
          'A 7th-grade course in public speaking and building and defending an argument. It "meets every other day for one trimester," and students can continue in the 7th–8th Mock Trial and Speech & Debate elective.',
        feedsFrom: 'the classroom',
      },
      {
        name: 'Honor Council',
        division: 'Middle School',
        recognizes:
          '"Each fall, Middle School students elect their peers to serve on the Honor Council." It encourages integrity, builds a community of trust, and holds classmates "to the expectations set out in the Middle School Pledge." Serving on it is one of the leadership roles Middle School students take on.',
        feedsFrom: 'the whole school',
      },
    ],
    adjacentTitle: 'The Honor Code itself',
    adjacent: [
      {
        label: 'Written by students, adopted 2003',
        text: '"Written by a group of Middle School students and adopted in 2003, the Honor Code is the only code of conduct the Trinity community has ever known and lived by." It carries six pledges: be responsible for my actions · always do my best · respect the uniqueness and gifts of others · practice kindness and consideration · celebrate the joyful, beautiful, and enduring · not lie, cheat, or steal.',
      },
      {
        label: 'Taught from Kindergarten',
        text: 'Students learn the Honor Code "starting in Kindergarten," through activities matched to their age. As the school puts it: "The Honor Code follows you everywhere."',
      },
      {
        label: 'The Middle School Pledge',
        text: '"As a child of God, I pledge that I have not cheated by giving or receiving help on this work, including plagiarizing. Moreover, I am unaware of any violation of this pledge by other students."',
      },
    ],
    flags: [
      {
        kind: 'gap',
        text: '**There is no National Junior Honor Society and no Student Council at Trinity, despite what a web search will tell you.** "National Junior Honor Society", "Junior Honor Society", "NJHS" and "Student Council" each return **zero hits** across the old 98-page site, the redesigned site and both School Profile PDFs. A search nonetheless returns confident prose describing a Trinity NJHS chapter and a Trinity Student Council; not one word of it is corroborated on the school’s own site, and it is almost certainly another school’s page. Honor Council is the confirmed body.',
      },
      {
        kind: 'gap',
        text: 'The 2023–2025 NC Bar Foundation Mock Trial titles and the Speech & Debate state title were published only in blog posts the fall-2026 redesign did not migrate. Per the live-site-only decision (user, 2026-11-14) they are off the card; the Wayback copies are in source-material/. No current competition result is published.',
      },
    ],
    sources: [
      { label: 'tescharlotte.org — Middle School page (Electives; 7th Grade Speech and Debate)', url: MIDDLE_SCHOOL },
      { label: 'tescharlotte.org — Staculty directory', url: STACULTY },
      { label: 'tescharlotte.org — The Honor Code, Middle School Pledge and Honor Council', url: HONOR_CODE },
      { label: 'tescharlotte.org — The K-8 Advantage (leadership roles)', url: K8_ADVANTAGE },
    ],
  },
}
