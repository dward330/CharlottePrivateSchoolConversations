// Charlotte Christian School — Student Clubs (1a / 1b / 1c).
//
// Transcribed from source-material/student-clubs/charlotte-christian/
// "Charlotte Christian - Student Clubs - Clubs Redesign Deep Research.md", which
// carries a source URL and a VERIFIED / SNIPPET-ONLY / NOT FOUND marker on every
// fact. The Winterim and school-profile figures were extracted locally with
// pdfplumber — both PDFs return unparseable binary through ordinary fetching.
//
// Three research outcomes shaped this file:
//
//  1. Card 1a is RETITLED, not omitted. Charlotte Christian publishes no
//     identity-based affinity groups at all — nothing by race, ethnicity,
//     gender, religion or orientation. What it does publish is a Diversity &
//     Belonging office, two global/cultural student groups, a parent group and a
//     Global Awareness Prefect. That is a real structure with thin cells, not an
//     empty card, so it renders under the school's OWN framing as "Global &
//     Cultural Groups" (see TITLE_OVERRIDES in ../clubsProgram.ts). Titling it
//     "Affinity & Identity Groups" would imply a roster the school does not have.
//
//  2. The count flag here is a NAMING conflict rather than a numeric one: the
//     school runs two overlapping global/cultural groups and never reconciles
//     them, so the count reads as 0, 1 or 2 depending which page you open.
//
//  3. Winterim is the strongest service evidence in the set — a 1.0-credit
//     GRADUATION REQUIREMENT — and it carries a verbatim carve-out proving a
//     separate service-hours expectation exists while no number for it is ever
//     published. Both halves of that are stated.
//
// The Multicultural Festival article is SNIPPET-ONLY (the live page 404s), so
// nothing from it is rendered as fact.

import type { ClubsProgram } from '../clubsProgram.ts'

const DIVERSITY = 'https://www.charlottechristian.com/about/diversity'
const KNIGHTS_NATIONS =
  'https://www.charlottechristian.com/post-details/~board/knights-headlines/post/knights-nations-club-fosters-a-friendly-and-welcoming-environment-for-upper-school-students'
const UPPER_SCHOOL = 'https://www.charlottechristian.com/academics/upper-school'
const KNIGHTS_SERVE = 'https://www.charlottechristian.com/campus-life/knights-serve'
const SPIRITUAL_LIFE = 'https://www.charlottechristian.com/campus-life/spiritual-life'
const MIDDLE_SCHOOL = 'https://www.charlottechristian.com/academics/middle-school'
const WINTERIM_PACKET =
  'https://resources.finalsite.net/images/v1754953602/charlotte/xirlf52kj6gxx2pteclb/2026WinterimPacketdocx.pdf'
const SCHOOL_PROFILE =
  'https://resources.finalsite.net/images/v1725038322/charlotte/b12msqpqbmeqjqgszan1/2024_USprofile_admiss.pdf'
const NEWS_2014 = 'https://www.charlottechristian.com/cf_news/view.cfm?newsid=615'

export const charlotteChristian: ClubsProgram = {
  affinity: {
    headline:
      'A Diversity & Belonging office coordinating two global-awareness student groups, a monthly parent group, and a dedicated student prefect — framed around global cultures rather than identity.',
    subhead:
      'Charlotte Christian publishes no identity-based affinity groups; its diversity framing is denominational and global, with families drawn from more than 130 different churches.',
    umbrella: {
      name: 'Diversity & Belonging',
      detail:
        'directed by Jozi Walker, Director of Diversity, Belonging and Global Awareness · addresses "Biblical diversity and belonging from a developmental lens in each of our divisions"',
    },
    groups: [
      {
        name: 'Global Knights',
        detail:
          'Upper School global-awareness group — celebrates cultures from around the world and organizes the annual Multicultural Festival',
      },
      {
        name: 'Knights Nations Club',
        detail:
          'student-founded and student-led, drawing members from all four Upper School grades',
      },
      {
        name: 'Romans 12 Initiative',
        detail:
          'a parent and community group meeting monthly on diversity, belonging and unity',
      },
    ],
    strips: [
      {
        title: 'Lower School',
        text: 'Multicultural awareness through literature, guest speakers and project-based lessons; each classroom is assigned a country for the Multicultural Festival. Programming rather than standing groups.',
      },
      {
        title: 'Middle School',
        text: 'Cross-cultural development through curriculum, heritage month celebrations and field trips — grade 6 to Sudan Interior Missions, grade 7 to the Holocaust Museum, grade 8 to Civil Rights activities.',
      },
      {
        title: 'Parents',
        text: 'Beyond Romans 12, the parent bodies are PTF (Parent Teacher Fellowship) and N.E.W. (Newcomers Embraced & Welcomed) — new-family assimilation rather than identity-based groups — plus the Haverim Ladies’ Bible Study.',
      },
    ],
    leadershipTitle: 'The leadership arm',
    leadership:
      'A nine-member prefect system of faculty-mentored student leaders — Head, Academic, Admissions, Athletic, Global Awareness, Fine Arts, Service, Spiritual Life and Student Life. The Global Awareness Prefect is the identity and global leadership role; the Service Prefect is the civic one.',
    flags: [
      {
        kind: 'count',
        text: 'The school runs two overlapping global/cultural student groups and never reconciles them. The Diversity & Belonging page names only Global Knights; the Knights Headlines feature names only Knights Nations Club; and the Upper School clubs list names neither, omitting both from its 13-club roster. The count of global/cultural groups therefore reads as none, one or two depending which page you open, and no page publishes a total.',
      },
      {
        kind: 'gap',
        text: 'No affinity groups by race, ethnicity, gender, religion or orientation exist anywhere on the site, and no Middle or Lower School cultural groups — those divisions get programming only. No membership counts, meeting schedules or faculty sponsors are published for any of the three groups, and Global Knights has no page of its own.',
      },
    ],
    sources: [
      { label: 'charlottechristian.com — Diversity & Belonging', url: DIVERSITY },
      { label: 'Knights Headlines — Knights Nations Club', url: KNIGHTS_NATIONS },
      { label: 'Upper School (prefects, club roster)', url: UPPER_SCHOOL },
    ],
  },

  service: {
    headline:
      'Service is a graduation requirement here — every Upper Schooler earns 1.0 Winterim credit across four years, a quarter-credit at a time.',
    subhead:
      'Knights Serve, anchored in Micah 6:8, is the umbrella; Winterim is the structural commitment that makes service unavoidable rather than optional.',
    programs: [
      {
        value: '1.0',
        valueLabel: 'credit to graduate · 0.25 each year',
        name: 'Winterim',
        detail:
          'A week-long experiential program every March mixing mission trips, cultural travel, internships and on-campus options — 19+ offerings in 2026, each embedding service. Graded pass/fail outside the GPA, and it appears on the report card every year.',
        source: { label: '2026 Winterim packet', url: WINTERIM_PACKET },
      },
      {
        value: 'Gr. 6',
        valueLabel: 'where service hours begin',
        name: 'Knights Serve hours',
        detail:
          '"Beginning in sixth grade, students are encouraged to earn service hours each year" — framed as learning "the joy of selflessly serving others in the name of Jesus Christ." Note the verb is encouraged, not required.',
        source: { label: 'Spiritual Life', url: SPIRITUAL_LIFE },
      },
      {
        value: '5',
        valueLabel: 'standing local partners',
        name: 'Local partnerships & Kingdom Impact Day',
        detail:
          'Samaritan’s Purse, The Odd Sock, Bright Blessings, Roof Above and Harvest Center, with Congregations for Kids named alongside them. Middle School Kingdom Impact Day is the division-wide service day, tied to the six-kingdom house system.',
        source: { label: 'Knights Serve · Spiritual Life', url: KNIGHTS_SERVE },
      },
    ],
    footnoteTitle: 'Named partners inside Winterim',
    footnote:
      'Individual 2026 trips carry their own partners — SCORE International in the Dominican Republic, Samaritan’s Feet at Camp Harrison, Give Kids the World and Make-A-Wish at Disney, Surfrider Foundation and Save Your Hood in Greece, Crossroads Christian Academy in Panama, and Nourish Up, Crisis Assistance and Congregations for Kids on Serve Charlotte.',
    flags: [
      {
        kind: 'not-a-club',
        text: 'Winterim trips are a graduation requirement and a travel program, Kingdom Impact Day is a division-wide service day, and the Multicultural Festival is an annual all-school event. Cross-Cultural Communications service is a class doing service; Vocational Shadowing and the Alternative Winterim Experience are individually arranged and family-brokered. None is a club.',
      },
      {
        kind: 'gap',
        text: 'The Winterim packet states that the program "does not count toward additional requirements for conservatory or service hours" — proving a separate service-hours expectation exists. Yet no numeric hours target is published anywhere on the site, along with no participation percentage, no total hours, and no founding year for Knights Serve. The Knights Serve page advertises 2025-26 service projects with no detail behind the heading.',
      },
    ],
    sources: [
      { label: 'charlottechristian.com — Knights Serve', url: KNIGHTS_SERVE },
      { label: 'Spiritual Life (service hours, partner list)', url: SPIRITUAL_LIFE },
      { label: '2026 Winterim packet (credit requirement, carve-out)', url: WINTERIM_PACKET },
      { label: 'Middle School (six kingdoms)', url: MIDDLE_SCHOOL },
    ],
  },

  honors: {
    headline:
      'Five recognition societies — one academic, three arts, one world language.',
    subhead:
      'These are outcomes of achievement elsewhere in the program — a student earns their way in; nobody signs up.',
    societies: [
      {
        name: 'National Honor Society',
        division: 'Upper School',
        recognizes: 'Scholarship, leadership, service and character',
        feedsFrom: 'classroom + service',
      },
      {
        name: 'National Art Honor Society',
        division: 'Upper School',
        recognizes: 'Achievement in visual art',
        feedsFrom: 'The Arts',
      },
      {
        name: 'Tri-M Music Honor Society',
        division: 'Upper School',
        recognizes: 'Achievement and service in music',
        feedsFrom: 'The Arts',
      },
      {
        name: 'International Thespian Society',
        division: 'Upper School',
        recognizes: 'Achievement in theatre',
        feedsFrom: 'The Arts',
      },
      {
        name: 'Spanish National Honor Society',
        division: 'Upper School',
        recognizes: 'Achievement in Spanish',
        feedsFrom: 'world languages',
      },
    ],
    adjacentTitle: 'Recognition that is not a society',
    adjacent: [
      {
        label: 'Academic Conservatory Program',
        text: 'A graduation distinction in six tracks — Math & Science, Fine Arts, Bible/Philosophy & Religion, English, Social Studies and World Languages — noted on the transcript in senior year. 14% of the Class of 2024 earned at least one.',
      },
      {
        label: 'Seal of Biliteracy',
        text: 'Implemented in 2019, testing listening, speaking, reading and writing in two languages. 4% of the Class of 2024 earned it.',
      },
    ],
    flags: [
      {
        kind: 'gap',
        text: 'The school publishes nothing beyond the five names — no induction criteria, no GPA threshold, no chapter activities, advisors, officers, meeting information or current membership counts, and no dedicated honor-societies page. The only induction counts that exist anywhere are from a single 2014 post, which recorded 60 NHS and 54 National Junior Honor Society inductees. Neither NJHS nor the French society it also named appears on the school’s pages today, so neither is reported as current.',
      },
      {
        kind: 'gap',
        text: 'No Middle School honor society is published at all today, and there is no math, science, journalism or social-studies society — the school has a Latin Club and a Model UN but no corresponding society for either.',
      },
    ],
    sources: [
      { label: 'charlottechristian.com — Upper School (the roster)', url: UPPER_SCHOOL },
      { label: '2024-25 Academic & Student Profile (arts chapters, conservatory)', url: SCHOOL_PROFILE },
      { label: 'School news, 2014 (the only published induction counts)', url: NEWS_2014 },
    ],
  },
}
