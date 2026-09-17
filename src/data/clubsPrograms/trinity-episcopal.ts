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
// directors, assistant heads — are named in their professional capacity, which
// is why Jennifer Bader, Ayeola Elias and Stephanie Griffin appear below and no
// student does. The school's own blog posts DO name the students; that is the
// school's call to make about its own families, not ours.
//
// Four research outcomes shaped this file:
//
//  1. THE AFFINITY CARD IS THE RICH ONE, which is unusual for a K–8 school and
//     inverts the usual shape — most schools on this roster publish a bare list
//     of group names, while Trinity publishes five student groups with grade
//     ranges AND a full purpose statement apiece, plus four parent groups. So
//     `groups` carries real `detail` on every cell rather than a name alone.
//
//  2. THE HONORS CARD IS A COMPETITION LEDGER, NOT A SOCIETY LEDGER. Trinity has
//     no NHS/NJHS-style chartered society — it has a three-peat state
//     championship and an elected Honor Council. `Society.recognizes` /
//     `feedsFrom` are general enough to carry both, so the card ships with the
//     achievements in the ledger rather than being omitted for want of a
//     chartered chapter. The card's shared title still reads "Honor Societies";
//     no TITLE_OVERRIDE is added here, because that is a UX change and needs the
//     approval gate — raised at review instead.
//
//  3. NJHS AND STUDENT COUNCIL ARE DELIBERATELY ABSENT. Both return ZERO hits
//     across all 98 sitemap pages and both profile PDFs, yet a web search
//     returns confident prose about a Trinity NJHS chapter ("grades 6–8… faculty
//     committee") and a Trinity Student Council ("Elected by their
//     classmates…"). That is the same contamination class that produced a bogus
//     "NJHS GPA 3.6" detail — almost certainly another school's page, very
//     likely Trinity Episcopal School in RICHMOND VA (trinityes.org), a grades
//     8–12 high school with a real Clubs & Organizations page. Do not add either
//     club from a search result. The gap flag on `honors` records the absence so
//     a later pass does not re-discover it as a hole.
//
//  4. NO PUBLICATIONS CARD, AND THAT IS NOT THE SAME AS "NO YEARBOOK". The
//     student newspaper and literary magazine are confirmed absent (0 hits
//     each); the yearbook EXISTS but is a Parents' Association function, its
//     single site-wide mention being on community/parents-association.cfm. So
//     the zero-items rule omits a student-publications card entirely — and
//     nothing here says the school has no yearbook, because it has one.
//
// The school's own inconsistencies are PRESERVED, not normalized: "Nourish Up"
// (grades K and 1) vs "NourishUp" (grade 6), and the grade-3 partner headed
// "Roof Above" while its body says "Urban Ministry Center". Both spellings are
// the school's; a figure or a name is quoted as its source publishes it.

import type { ClubsProgram } from '../clubsProgram.ts'

const AFFINITY = 'https://www.tescharlotte.org/diversity/affinity-groups.cfm'
const SPIRIT_DIVERSITY =
  'https://www.tescharlotte.org/spirituality-and-diversity-working-hand-in-hand-at-trinity/'
const SERVICE_LEARNING = 'https://www.tescharlotte.org/spirituality/service-learning.cfm'
const ABOUT = 'https://www.tescharlotte.org/about/'
const DC_TRIP = 'https://www.tescharlotte.org/blog.cfm?threadid=15'
const FOOD_DRIVE =
  'https://www.tescharlotte.org/students-collect-954-pounds-of-food-for-nourish-up/'
const THREE_PEAT =
  'https://www.tescharlotte.org/three-peat-trinity-mock-trial-team-wins-third-consecutive-championship/'
const SECOND_TITLE =
  'https://www.tescharlotte.org/trinity-takes-mock-trial-championship-for-second-year/'
const STACULTY = 'https://www.tescharlotte.org/celebrating-tes-staculty-achievements/'
const HONOR_CODE = 'https://www.tescharlotte.org/spirituality/honor-code.cfm'
const PROFILE = 'https://www.tescharlotte.org/editoruploads/files/26-27SchoolProfile.pdf'

export const trinityEpiscopal: ClubsProgram = {
  affinity: {
    headline:
      'Five named student affinity groups, each with its grade range and a published purpose statement, plus four parent groups — under a Director of Diversity, Equity, and Belonging.',
    subhead:
      'Unusually well populated for a K–8 school: the groups start in Kindergarten, and the school publishes what each one is actually for rather than only its name.',
    umbrella: {
      name: 'Diversity, Equity, and Belonging',
      detail:
        'led by Ayeola Elias, Director of Diversity, Equity, and Belonging · groups exist "to foster kinship; to provide students and adults a place to celebrate their uniqueness, gifts and important role in our school community; and to affirm, protect and nurture the identities of the group"',
    },
    groups: [
      {
        name: 'Young Children of Color (YCC)',
        detail:
          'grades K–5 · an affinity group and mentoring program for students of color; all students of color are invited, and the family decides whether to participate',
      },
      {
        name: '12 Tribes of Trinity',
        detail:
          'grades 3–5 · co-ed groups who "learn to build community, internalize and reinforce the Honor Code", each led by 2 adult staculty members',
      },
      {
        name: 'Young People of Color (YPC)',
        detail:
          'Middle School · for students who self-identify as students of color; meets weekly on cultural sensitivity, academic success and socio-political issues, and on preparation for high school',
      },
      {
        name: 'Young People for Social Justice (YPSJ)',
        detail:
          'Middle School · for students who self-identify as white, discussing unearned privilege and the actions they can take as allies — framed on Gandhi’s "Be the change you wish to see in the world"',
      },
      {
        name: 'Gender Sexuality Alliance (GSA)',
        detail:
          'Middle School · human-rights discussion and activities with a focus on gay, lesbian, bisexual, questioning and transgender issues; has organized a Pride Chapel in recent years',
      },
    ],
    strips: [
      {
        title: 'Lower School',
        hint: '· grades K–5',
        text: 'Young Children of Color runs from Kindergarten through grade 5 · 12 Tribes of Trinity groups students across grades 3–5.',
      },
      {
        title: 'Middle School',
        hint: '· 3 groups',
        text: 'Young People of Color · Young People for Social Justice · Gender Sexuality Alliance — all three are Middle School groups, and YPC meets weekly.',
      },
      {
        title: 'Parents',
        hint: '· 4 groups',
        text: 'Café con Padres for Hispanic/Latino families · KINDRED for African American/Black families · Invisible Differences for families of children with learning differences · the Diversity & Belonging Committee, open to all parents.',
      },
      {
        title: 'In chapel',
        text: 'The student GSA has organized a Pride Chapel. The school also holds a Sankofa Chapel each year during Black History Month, a Diwali chapel with song and dance, and Hispanic Heritage Month chapels led by Latino families.',
      },
    ],
    leadershipTitle: 'Who runs it',
    leadership:
      'Ayeola Elias is Director of Diversity, Equity, and Belonging. No student diversity leadership council is published, and no attendance at a national student diversity conference appears anywhere on the site — which is consistent with a K–8 school, where those conferences are pitched at high schoolers.',
    flags: [
      {
        kind: 'not-a-club',
        text: '**12 Tribes of Trinity is an edge case, filed here because the school files it here.** It appears on the affinity-groups page, but its own description is about community-building and the Honor Code rather than a shared identity, and the Lower School enrichments page describes it as co-ed groups spanning grades 3–5, each led by two adults — a house or advisory system rather than an identity group.',
      },
      {
        kind: 'count',
        text: '**Invisible Differences is a PARENT group, not a student club.** The affinity-groups page lists it among the four parent groups; the 2026-27 School Profile lists it among the student clubs. The affinity page is the more specific source and is followed here — so the student roster is five groups, not six.',
      },
    ],
    sources: [
      { label: 'tescharlotte.org — Affinity Groups', url: AFFINITY },
      {
        label: 'tescharlotte.org — Spirituality and diversity working hand in hand (Pride Chapel, Sankofa, Diwali)',
        url: SPIRIT_DIVERSITY,
      },
      { label: 'tescharlotte.org — 2026-27 School Profile (PDF)', url: PROFILE },
    ],
  },

  service: {
    headline:
      'Every grade from Kindergarten to 7 has a standing, year-long partnership with a named community organization — twelve of them — and 8th grade turns it into advocacy.',
    subhead:
      'This is curricular rather than a volunteer club: "Each grade level partners with a community organization whose mission and services are related to curricular goals… Year-long partnerships create the possibility of relationship formation that transforms charity into mutual service among neighbors."',
    programs: [
      {
        value: '12',
        valueLabel: 'named partner organizations · grades K–7',
        name: 'The grade-by-grade service ladder',
        detail:
          'Kindergarten and grade 1 partner with Nourish Up — Kindergarten delivers Meals on Wheels weekly, grade 1 visits the food pantry at First Presbyterian Church and leads the school food drive each November. Grade 2 works with InReach, whose customers visit Trinity monthly for gardening, art, music and self-advocacy. Grade 3 partners with Roof Above / the Urban Ministry Center. Grade 4 with The Epiphany School of Charlotte, grade 5 with Galilee Ministries of East Charlotte. Grade 6 — "Feeding Our Neighbors" — works with the 8th Street Friendship Garden, the Charlotte Community ToolBank and NourishUp; grade 7 — "Understanding Our Neighbors" — with Crisis Assistance Ministry, Hope Haven and the First Ward Child Development Center.',
        source: { label: 'tescharlotte.org — Service Learning', url: SERVICE_LEARNING },
      },
      {
        value: 'a mile',
        valueLabel: 'walked to the partner, monthly · grade 3',
        name: 'Roof Above / Urban Ministry Center — on foot',
        detail:
          'Third graders walk a mile to the Urban Ministry Center once a month for art, soccer, singing with the Urban Ministry Choir, and clothing drives. The walk is the point, and the school says so: "We like to say that Trinity has the longest hallways in Charlotte as our campus community extends into the heart of Uptown Charlotte. Each day you will see our students and teachers walking to and engaging with community organizations as part of our academic program and service-learning partnerships."',
        source: { label: 'tescharlotte.org — Welcome from the Head of School', url: ABOUT },
      },
      {
        value: '46',
        valueLabel: 'eighth-graders on the 2024 advocacy trip',
        name: 'Advocacy and Social Action — the 8th-grade capstone',
        detail:
          'Eighth grade maps its community, researches an issue all year in the Social Issues Seminar, then travels to Washington, DC to advocate on it. The 2024 group met Rep. Jeff Jackson at the Capitol and carried five issues: gun-violence victim resources, economic mobility, minimum wage, affordable housing and healthcare cost transparency. Assistant Head of School Stephanie Griffin: "This is a trip, at its heart and soul, that’s all about advocacy."',
        source: { label: 'tescharlotte.org — the 8th grade in Washington, DC', url: DC_TRIP },
      },
    ],
    footnoteTitle: 'One measured outcome',
    footnote:
      'The programme is described rather than counted almost everywhere, which makes the one published number worth carrying: **954 pounds of food** collected for Nourish Up in November 2024, through the food drive grade 1 leads. No service-hour requirement, total or per-student average is published anywhere on the site.',
    flags: [
      {
        kind: 'not-a-club',
        text: '**None of this is a club.** Every partnership is attached to a grade level and to that grade’s curriculum, so a Trinity student does not join it — they arrive in the grade and it is theirs for the year. The 8th-grade Washington trip is the capstone of the Social Issues Seminar, a weekly enrichment class, which makes even the advocacy trip curricular rather than extracurricular.',
      },
      {
        kind: 'gap',
        text: 'The school’s own copy spells the same partner two ways and names the grade-3 partner twice: **"Nourish Up"** in grades K and 1 but **"NourishUp"** in grade 6, and grade 3 is **headed "Roof Above"** while its body says **"Urban Ministry of Charlotte" / "Urban Ministry Center"**. Roof Above is the renamed organization. Both spellings are reproduced as published rather than normalized.',
      },
    ],
    sources: [
      { label: 'tescharlotte.org — Service Learning (the full grade-by-grade ladder)', url: SERVICE_LEARNING },
      { label: 'tescharlotte.org — "the longest hallways in Charlotte"', url: ABOUT },
      { label: 'tescharlotte.org — 954 pounds of food for Nourish Up', url: FOOD_DRIVE },
    ],
  },

  honors: {
    headline:
      'Two state championships in one year, and a three-peat: the Middle School Mock Trial team won the North Carolina Bar Foundation competition in 2023, 2024 and 2025.',
    subhead:
      'Trinity’s recognition record is competitive and civic rather than chartered — there is no honor-society chapter here, there is a courtroom, a debate circuit, and an Honor Council its own students elect.',
    societies: [
      {
        name: 'Mock Trial — NC Bar Foundation state champions, 2023 · 2024 · 2025',
        division: 'Middle School · 15 students',
        recognizes:
          'Three consecutive state championships in the North Carolina Bar Foundation’s Middle School competition, coached by Jennifer Bader. The second title was won at the Mecklenburg County Courthouse against five other middle school teams.',
        feedsFrom: 'the classroom',
      },
      {
        name: 'Speech & Debate — state champions the same year',
        division: 'Middle School · also a 7th-grade class',
        recognizes:
          '"The speech and debate and mock trial teams both won their respective state championships this year." Speech & Debate is simultaneously a weekly 7th-grade enrichment and a competitive team, so it is both a class and a club.',
        feedsFrom: 'the classroom',
      },
      {
        name: 'Honor Council',
        division: 'Middle School · elected',
        recognizes:
          'Members are "elected by their grade level peers in Middle School" and are responsible for encouraging integrity, building a community of trust, and holding fellow students to the pledge. Eighth graders "often find themselves… leading honor councils".',
        feedsFrom: 'the whole school',
      },
    ],
    adjacentTitle: 'Not a society — the Honor Code itself',
    adjacent: [
      {
        label: 'Written by students, 2002',
        text: 'The Honor Code was created by students in 2002 and carries six pledges: responsibility, doing one’s best, respecting others’ uniqueness, kindness, celebrating joy and beauty, and refraining from dishonesty or theft. The whole school recites it together at Greet the Week each Monday morning.',
      },
      {
        label: 'The Middle School Honor Pledge, adopted 2012',
        text: '"As a child of God, I pledge that I have not cheated by giving or receiving help on this work, including plagiarizing. Moreover, I am unaware of any violation of this pledge by other students."',
      },
      {
        label: 'The coach',
        text: 'Jennifer Bader is Speech and Debate and Mock Trial Team Coach, and has served as Forensics Committee Chair and a board member of the North Carolina Association for Scholastic Activities. On the team: "I think one thing that sets our team apart is how well our attorneys can argue the rules of evidence and handle objections." And on why she does it: "I just love when the light bulb comes on for kids. It’s really challenging material, but they really get into it."',
      },
    ],
    flags: [
      {
        kind: 'gap',
        text: '**There is no National Junior Honor Society and no Student Council at Trinity, despite what a web search will tell you.** "National Junior Honor Society", "Junior Honor Society", "NJHS" and "Student Council" each return **zero hits** across all 98 sitemap pages and both School Profile PDFs. A search nonetheless returns confident prose describing a Trinity NJHS chapter and a Trinity Student Council; not one word of it is corroborated on the school’s own site, and it is almost certainly another school’s page. Honor Council is the confirmed body.',
      },
      {
        kind: 'gap',
        text: 'The championships are documented only in the school’s blog — **neither appears in either School Profile PDF**, and individual student recognitions were published there but are omitted here because Trinity is a K–8 school and its competitors are minors. No membership criteria, selection process or team-size history is published for Mock Trial or Speech & Debate beyond the 15-student team figure.',
      },
    ],
    sources: [
      { label: 'tescharlotte.org — three-peat: a third consecutive Mock Trial championship', url: THREE_PEAT },
      { label: 'tescharlotte.org — Mock Trial championship for a second year', url: SECOND_TITLE },
      { label: 'tescharlotte.org — Celebrating TES Staculty Achievements', url: STACULTY },
      { label: 'tescharlotte.org — Honor Code and the Middle School Honor Pledge', url: HONOR_CODE },
    ],
  },
}
