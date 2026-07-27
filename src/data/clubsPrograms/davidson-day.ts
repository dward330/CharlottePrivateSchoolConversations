// Davidson Day School — Student Clubs (1b only).
//
// Transcribed from source-material/student-clubs/davidson-day/
// "Davidson Day - Student Clubs - Clubs Redesign Deep Research.md", which
// carries a source URL and a VERIFIED / NOT PUBLISHED / UNCONFIRMED marker on
// every fact.
//
// THIS SCHOOL RENDERS ONE CARD. Both 1a and 1c are omitted, and that is the
// research finding rather than a hole in it:
//
//  1a — Davidson Day publishes no affinity/identity groups. What exists is a
//       "Belonging" framing: a Student Belonging Council, an Upper School
//       Belonging Council and an adult Belonging Committee. Those are councils
//       and committees, not affinity groups, and the five recurring forum topics
//       (the African-American Student Experience, the LGBTQ+ Experience,
//       Disability Awareness, the Immigrant Experience, Mental Health) are event
//       themes, not standing groups. Card 1a is an ecosystem map built from a
//       named roster; with no roster there are no cells to draw, so it is
//       omitted rather than shipped thin.
//
//  1c — No honor-society record exists at all. Every academics, student-life,
//       college-counseling, news and blog page was checked; the only induction
//       coverage on the whole site is the Patriot Athletic Hall of Fame. An
//       independent off-site search returned nothing for this school either, so
//       the absence is corroborated rather than a fetching artifact. The
//       privateschoolreview.com listing that mentions an "Honor Council" is a
//       disciplinary body, not an honor society, is uncorroborated by the school,
//       and is deliberately not ingested.
//
// The Issuu-hosted course catalogs and school profile — the documents most
// likely to name societies — have no accessible text layer (403 on the text
// APIs), and no profile PDF is served from davidsonday.org itself. Re-confirmed
// 2026-07-26. That limit is recorded in the research file as the highest-value
// follow-up.
//
// 1b, by contrast, is genuinely strong, and it renders on its own merits.

import type { ClubsProgram } from '../clubsProgram.ts'

const DIPLOMA_DISTINCTIONS = 'https://www.davidsonday.org/academics/diploma-distinctions'
const BUSINESS_CIVIC =
  'https://www.davidsonday.org/academics/diploma-distinctions/business-civic-engagement'
const DELIBERATIVE_BLOG =
  'https://www.davidsonday.org/p/~board/all-blogs/post/learning-to-disagree-better'
const MIDDLE_SCHOOL = 'https://www.davidsonday.org/academics/middle-school'
const COMMUNITY_CULTURE = 'https://www.davidsonday.org/student-life/community-and-culture'
const LONGEVITY_BLOG =
  'https://www.davidsonday.org/p/~board/all-blogs/post/making-a-difference-one-conversation-at-a-time'
const AFAR_BLOG =
  'https://www.davidsonday.org/p/~board/all-blogs/post/making-history-uncovering-history-davidson-day-afar-and-the-adam-spach-rock-house'

export const davidsonDay: ClubsProgram = {
  service: {
    headline:
      'A 100-hour immersive practicum behind every diploma distinction, and the first high school ever to partner with Davidson College’s Deliberative Citizenship Initiative.',
    subhead:
      'The smallest school in this comparison publishes the least overall — but its civic programming is specific, externally validated and genuinely unusual.',
    programs: [
      {
        value: '100',
        valueLabel: 'minimum hours · per diploma distinction',
        name: 'Diploma Distinctions Practicum',
        detail:
          'Every Diploma Distinction requires an immersive practicum of at least 100 hours — an internship, civic engagement, nonprofit leadership, medical shadowing or pre-collegiate program — plus quarterly Ethics Labs and a capstone at the Davidson Day Scholars Research Conference. Students apply at the end of sophomore year.',
        source: { label: 'Diploma Distinctions', url: DIPLOMA_DISTINCTIONS },
      },
      {
        value: '13',
        valueLabel: 'students · a national first',
        name: 'Davidson College Deliberative Citizenship Initiative',
        detail:
          'Davidson Day is the first high school ever to collaborate with the program. Thirteen Upper Schoolers completed two deliberation modules on social safety nets and constitutional rights, attending expert panels and two-hour small-group deliberations built around civil discourse rather than debate-to-win.',
        source: { label: 'School blog', url: DELIBERATIVE_BLOG },
      },
      {
        value: '100%',
        valueLabel: 'of Middle School students',
        name: 'Middle School Service Learning',
        detail:
          '"Every Middle School student takes part in our hands-on service-learning program, partnering with local organizations," and every student participates in dedicated Service Days across the year.',
        source: { label: 'Middle School', url: MIDDLE_SCHOOL },
      },
    ],
    footnoteTitle: 'The partner network',
    footnote:
      'Eight community partners are named: Champions House of Care, The Kindness Closet, Food for Days, Beds for Kids, American Foreign Academic Research (AFAR), the Davidson Public Library and the Davidson College Deliberative Citizenship Initiative. An Upper School Community Engagement Council is also described, though no roster or founding year is published for it.',
    flags: [
      {
        kind: 'not-a-club',
        text: 'Two of the school’s most striking service stories are explicitly not clubs. Longevity LKN is a student-founded 501(c)(3) nonprofit — not a school club — that has screened over 100 community members for blood pressure across Lake Norman. The AFAR archaeology work, in which 13 students excavated the Adam Spach Rock House alongside professional archaeologists as the first high schoolers to work with the North Carolina State Historic Preservation Office, is never defined as a club on the school’s own page. The Deliberative Citizenship partnership is a structured program, and Patriot Pals is a peer-mentorship tradition.',
      },
      {
        kind: 'gap',
        text: 'The 100-hour practicum belongs to an opt-in diploma track, not a school-wide graduation requirement — and no school-wide service-hours requirement is published anywhere. No hour totals, partner counts or founding years accompany the Middle School program. Five of the six Community and Culture cards, including the Community Engagement Council, have no detail page behind them.',
      },
    ],
    sources: [
      { label: 'davidsonday.org — Diploma Distinctions', url: DIPLOMA_DISTINCTIONS },
      { label: 'Business & Civic Engagement diploma', url: BUSINESS_CIVIC },
      { label: 'Community and Culture (partners, councils)', url: COMMUNITY_CULTURE },
      { label: 'School blog — Longevity LKN', url: LONGEVITY_BLOG },
      { label: 'School blog — AFAR & the Adam Spach Rock House', url: AFAR_BLOG },
    ],
  },
}
