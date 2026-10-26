// Charlotte Latin School — Learning Support & Student Services.
//
// Every fact is from the school's own pages, the PDFs it hosts and Wayback
// Machine copies of its own removed pages, fetched 2026-10-26. The verbatim
// record, the fee and staff tables, the NOT FOUND list and the twelve
// corrections this forced on the deep-research dossier are in
// source-material/learning-support/charlotte-latin/
//   Charlotte Latin - Learning Support - Official Site Research.md
//
// The live site keeps only the Student Support and Wellness hub, whose three
// popup panels (Learning Resources, Counselors, Nurses) hold one paragraph each
// and name no one. The detailed policy is from Latin's November 2023 online
// Family Handbook, since removed and read from Wayback; the Learning Resources
// program page (Wayback, May 2025) and a 2022 guidelines page add to it. The
// lead and the Ask card say so, so the 2023 policy is never presented as
// current. The 2018-19 handbook PDF is still hosted but superseded: 2023 wins
// wherever both speak, and the PDF is cited only for the Upper School tutoring
// rule the 2023 pages do not repeat.
// Sessions are IH_FEE: "billed per session each month by the Business Office",
// with no amount published anywhere, so there is no fee tile. No Learning
// Resources staff member is named on any current official page and the school
// publishes no staff emails or directory, so the staff card names the Director
// of Student Support & Wellness and the three division heads (whom the handbook
// gives a role in placement and tutoring approval), with no email, and a note
// that the program's director is unnamed. Former and third-party names in the
// research file are deliberately not rendered.

import type { Source } from '../../components/SourceRow.tsx'
import type { LearningSupportProgram } from '../learningSupport.ts'

const HUB: Source = {
  label: 'charlottelatin.org — Student Support and Wellness',
  url: 'https://www.charlottelatin.org/leading-programs/student-support-and-wellness',
}
const HB_ALL: Source = {
  label: 'charlottelatin.org — Family Handbook, All School (Wayback, November 2023)',
  url: 'http://web.archive.org/web/20231120125942/https://www.charlottelatin.org/familyhandbook/all-school-policies',
}
const HB_LS: Source = {
  label: 'charlottelatin.org — Family Handbook, Lower School (Wayback, November 2023)',
  url: 'http://web.archive.org/web/20231120124734/https://www.charlottelatin.org/familyhandbook/lower-schools-policies',
}
const HB_MS: Source = {
  label: 'charlottelatin.org — Family Handbook, Middle School (Wayback, November 2023)',
  url: 'http://web.archive.org/web/20231120141714/https://www.charlottelatin.org/familyhandbook/middle-school-policies',
}
const HB_US: Source = {
  label: 'charlottelatin.org — Family Handbook, Upper School (Wayback, November 2023)',
  url: 'http://web.archive.org/web/20231120124247/https://www.charlottelatin.org/familyhandbook/upper-schools-policies',
}
const LRPAGE: Source = {
  label: 'charlottelatin.org — Learning Resources (Wayback, May 2025)',
  url: 'http://web.archive.org/web/20250523012049/https://www.charlottelatin.org/academics/learningresources',
}
const GUIDE: Source = {
  label: 'charlottelatin.org — Learning Resources Program Guidelines (Wayback, July 2022)',
  url: 'http://web.archive.org/web/20220708072524/https://www.charlottelatin.org/learning-resources-guidelines',
}
const HB1819: Source = {
  label: 'charlottelatin.org — 2018-19 Family Handbook (PDF)',
  url: 'https://www.charlottelatin.org/uploaded/COMPOSER/PortalUploads/All_School/CLSfamilyhandbook1819.pdf',
}
const ENDOW: Source = {
  label: 'charlottelatin.org — Endowed Gifts',
  url: 'https://www.charlottelatin.org/support/endowed-gifts',
}
const ADMIT: Source = {
  label: 'charlottelatin.org — Application Process',
  url: 'https://www.charlottelatin.org/admissions/application-process',
}
const CAIS: Source = {
  label: 'charlottelatin.org — CAIS 2025-2026 testing brochure (PDF)',
  url: 'https://www.charlottelatin.org/uploaded/COMPOSER/AdmissionsTab/CAIS2025-26.pdf',
}
const LEADERS: Source = {
  label: 'charlottelatin.org — School Leadership',
  url: 'https://www.charlottelatin.org/about/school-leadership',
}

export const charlotteLatin: LearningSupportProgram = {
  // Latin navy and gold, from charlottelatin.org's theme CSS (main.css).
  colors: { brand: '#003764', gold: '#F5A92A' },
  lead: {
    strong:
      'Latin’s Learning Resources program serves “students with diagnosed learning disabilities and/or attention issues,” with remediation in the Lower School, small-group classes in the Middle School and executive-function coaching in the Upper School.',
    muted:
      'Sessions are billed per session, outside tuition, and no rate is published. The detailed policy here is from Latin’s November 2023 online Family Handbook, which is no longer on its website.',
  },
  stats: [
    { value: '1985', label: 'the year Learning Resources began', note: 'it serves students in the Lower, Middle and Upper Schools' },
    { value: '3 years', label: 'how recent an evaluation must be', note: 'a psychoeducational evaluation by a licensed psychologist' },
    { value: '50%', label: 'extra time, the typical extended-time accommodation', note: '“time and one/half or 50% more”' },
    { value: '3', label: 'full-time registered nurses', note: 'the 2023 handbook also lists three full-time counselors for Grades TK–12' },
  ],

  eligibility: {
    headline:
      'Latin serves students with a diagnosed learning disability or attention issue, confirmed by a psychologist’s evaluation less than three years old.',
    eligible:
      'The program “serves students with diagnosed learning disabilities and/or attention issues that impact academic achievement.” Admission is “based on parent or teacher request, screening by Learning Resources staff, and a comprehensive psychoeducational evaluation conducted by a licensed psychologist,” and the evaluation must be current, “within three years.”',
    plan:
      'Latin writes its own plan. In the Middle and Upper Schools, a [[504|504 Educational Plan]] is “developed by parents, teachers, and the student (when appropriate)” and renewed each school year. Families are asked to share evaluations with the Director of Learning Resources before enrollment. The school’s pages do not say how a 504 plan or IEP from another school is treated.',
    scope:
      'Latin states two limits and names no service it does not offer. Upper School sessions “are not intended to provide tutoring in specific subjects,” and the Middle School rules out off-campus tutoring during the day: “No student will be allowed to leave campus during the school day to see an off-campus tutor.”',
    note: 'In the Lower School, accommodations are “consistently available” to students who meet the criteria, and “may be informally offered” to others “who are demonstrating difficulty with assignments or tests.”',
    sources: [HUB, HB_ALL, HB_LS, HB_MS, HB_US, GUIDE],
  },

  services: {
    headline:
      'Every service the school’s pages describe, grouped and coded by who delivers it. Learning Resources sessions are billed per session, outside tuition, with no published rate; most of the detail comes from the November 2023 Family Handbook. Pick your child’s need to see what applies.',
    verdicts: {
      read: {
        head: 'One-to-one or small-group remediation in the Lower School, billed per session. No method is named.',
        body: 'Lower School staff work “individually or in small groups (when appropriate) to teach reading, writing, and math.” Middle School sessions may also cover reading comprehension and written expression.',
      },
      attn: {
        head: 'Executive-function coaching in the Upper School, and organization and study skills in the Middle School.',
        body: 'Upper School staff work “individually with students on executive functioning skills” and “support students using classroom assignments.” Middle School classes build organization, time management, note taking and test-taking.',
      },
      math: {
        head: 'Math remediation in the Lower School, and math within Middle School sessions.',
        body: 'Middle School sessions “may also focus on reading comprehension, written expression, and math computation or problem-solving.”',
      },
      speech: {
        head: 'No speech-language therapy is described.',
        body: 'The school’s pages list no speech-language service. Ask whether an outside therapist can work with your child on campus.',
      },
      motor: {
        head: 'No occupational or physical therapy is described.',
        body: 'The school’s pages list neither therapy. Ask whether an outside therapist can work with your child on campus.',
      },
      social: {
        head: 'Short-term counseling with referrals, and three full-time nurses.',
        body: 'Counseling is short-term, but “consultation and referrals can be provided for students and families who need more intensive, longer-duration services.” The Lower School Counselor also teaches classroom lessons at each grade level.',
      },
      gifted: {
        head: 'No gifted or advanced-learner program is described.',
        body: 'The school’s learning-support pages describe no gifted program. Ask what is available for advanced learners.',
      },
    },
    groups: [
      {
        name: 'Learning & academic support',
        rows: [
          {
            service: 'Specialized teachers',
            code: 'IH',
            detail: 'The department “includes a Director of Learning Resources (K–12), and Learning Resources teachers within each school division.” The program began in 1985. The school’s pages name none of its staff.',
            needs: ['read', 'attn', 'math'],
          },
          {
            service: 'Reading intervention',
            code: 'IH_FEE',
            detail: 'Lower School students “receive individualized instruction during the school day for an additional fee,” and staff “teach reading, writing, and math to help students gain basic skills and remediate weaknesses.” No intervention method is named.',
            needs: ['read'],
          },
          {
            service: 'Math intervention',
            code: 'IH_FEE',
            detail: 'Lower School staff teach math alongside reading and writing, and Middle School sessions “may also focus on reading comprehension, written expression, and math computation or problem-solving.”',
            needs: ['math'],
          },
          {
            service: '1:1 / small-group instruction',
            code: 'IH_FEE',
            detail: 'Lower School staff work “individually or in small groups (when appropriate),” and the Middle School offers “individualized and small group classes.” Sessions are “billed per session each month by the Business Office.” The Gorelick Endowment for Learning Resources “covers expenses for families receiving financial aid.”',
            needs: ['read', 'attn', 'math'],
          },
          {
            service: 'Executive-function coaching',
            code: 'IH_FEE',
            detail: 'The Upper School uses “a consultative and coaching model,” working one-on-one on “executive functioning skills (i.e. organization, time management, study strategies).” Middle School classes cover organization, time management, note taking and test-taking, and Lower School teachers add study skills in Grades 3–5.',
            needs: ['attn'],
          },
          {
            service: 'Learning-support class',
            code: 'IH_FEE',
            detail: 'Sessions run “during the school day,” and the Middle School describes “individualized and small group classes.” The school’s pages do not say which period a session replaces.',
            needs: ['read', 'attn', 'math'],
          },
          {
            service: 'Accommodations & learning plan',
            code: 'IH',
            detail: 'Typical accommodations include preferential seating, “extended time (time and one/half or 50% more),” testing in a separate setting, a computer for writing assignments and copies of notes. In the Middle and Upper Schools they are recorded each year in a [[504|504 Educational Plan]].',
            needs: ['read', 'attn', 'math', 'speech', 'motor'],
          },
          {
            service: 'Specially designed instruction',
            code: 'NS',
            detail: 'Not described.',
            needs: ['read', 'attn', 'math'],
          },
          {
            service: 'Self-contained / separate program',
            code: 'NS',
            detail: 'No separate program is described. The program page said Learning Resources lets students “learn effectively and successfully in a regular classroom.”',
            needs: [],
          },
          {
            service: 'Gifted / advanced',
            code: 'NS',
            detail: 'No gifted or advanced-learner program is described.',
            needs: ['gifted'],
          },
          {
            service: 'Eligibility documentation',
            code: 'REQUIRED',
            detail: 'A “comprehensive psychoeducational evaluation conducted by a licensed psychologist,” which must be current within three years for a student to receive services.',
            needs: ['read', 'attn', 'math', 'speech', 'motor', 'social'],
          },
          {
            service: 'Subject tutoring',
            code: 'RF',
            detail: 'On-campus tutoring during school hours, once the division agrees it is warranted, by tutors who “must be on Latin’s approved tutor list and have a recent background check.” “Families are responsible for any fees associated with Learning Resources or Tutoring.” The 2018-19 handbook adds that an Upper School student must be at a C- average or lower first.',
            needs: ['read', 'math'],
          },
        ],
      },
      {
        name: 'Therapy & related services',
        rows: [
          { service: 'Speech-language therapy', code: 'NS', detail: 'Not listed by the school.', needs: ['speech'] },
          { service: 'Occupational therapy', code: 'NS', detail: 'Not listed by the school.', needs: ['motor'] },
          { service: 'Physical therapy', code: 'NS', detail: 'Not listed by the school.', needs: ['motor'] },
        ],
      },
      {
        name: 'Assessment',
        rows: [
          {
            service: 'Screening & identification',
            code: 'IH',
            detail: 'Admission to the program includes “screening by Learning Resources staff,” and the program page listed “Screening services for students referred by teachers for observation and evaluation.”',
            needs: ['read', 'attn', 'math'],
          },
          {
            service: 'Testing accommodations',
            code: 'IH',
            detail: 'Extended time on the ERB achievement tests in Grades 3–5, and in the Middle School through the 504 plan. College Board and ACT applications (PSAT, SAT, PreACT, ACT and AP) are “submitted separately by the Director of Learning Resources” and “generally take 6-7 weeks for approval.”',
            needs: ['read', 'attn', 'math'],
          },
          {
            service: 'Entrance testing',
            code: 'REQUIRED',
            detail: 'The WPPSI for Transitional Kindergarten, Kindergarten and Grade 1, the WISC V for Grades 2–4 and the ISEE for Grades 5–11. Through the CAIS consortium the fee is “$275 for WPPSI-IV” or “$275 for WISC-V,” paid to the psychologist.',
            needs: [],
          },
          {
            service: 'Psychoeducational evaluation',
            code: 'REQUIRED',
            detail: 'Done by an outside “licensed psychologist” and arranged by the family. The school publishes no referral list and no cost.',
            needs: ['read', 'attn', 'math'],
          },
        ],
      },
      {
        name: 'Wellness & health',
        rows: [
          {
            service: 'Counseling & emotional support',
            code: 'IH',
            detail: '“Individual counseling services are short-term; however, consultation and referrals can be provided for students and families who need more intensive, longer-duration services.” The 2023 handbook lists three full-time, on-site counselors for Grades TK through 12.',
            needs: ['social'],
          },
          {
            service: 'Emotional & behavioral intervention',
            code: 'NS',
            detail: 'No program is described beyond short-term counseling and referral.',
            needs: ['social'],
          },
          {
            service: 'Crisis resources',
            code: 'NS',
            detail: 'No crisis lines are published.',
            needs: ['social'],
          },
          {
            service: 'School psychologist',
            code: 'NS',
            detail: 'None listed.',
            needs: ['social'],
          },
          {
            service: 'School nurse',
            code: 'IH',
            detail: '“Three full-time registered nurses offer health assessments, provide emergency care for illness and injury, administer medications, and identify students with special needs.”',
            needs: [],
          },
        ],
      },
      {
        name: 'Language',
        rows: [
          {
            service: 'ESL / English-language support',
            code: 'NS',
            detail: 'No English-language support is described for enrolled students.',
            needs: [],
          },
        ],
      },
    ],
    sources: [HB_ALL, HB_LS, HB_MS, HB_US, LRPAGE, GUIDE, HB1819, ENDOW, ADMIT, CAIS, HUB],
  },

  therapy: {
    headline: 'The school’s pages describe no speech, occupational or physical therapy.',
    items: [
      { name: 'Speech-language', code: 'NS' },
      { name: 'Occupational', code: 'NS' },
      { name: 'Physical', code: 'NS' },
    ],
    note: 'Counseling is the only related service described, and families who need “more intensive, longer-duration services” are referred out.',
    sources: [HUB, HB_ALL],
  },

  testing: {
    headline:
      'Learning Resources staff screen students referred by a parent or teacher, and an outside psychologist’s evaluation confirms the need. In the Middle and Upper Schools, accommodations go into a yearly 504 Educational Plan.',
    entries: [
      {
        code: 'IH',
        title: 'Screening by Learning Resources staff',
        text: 'Admission to the program starts from a “parent or teacher request” and “screening by Learning Resources staff.” The program page described “Screening services for students referred by teachers for observation and evaluation.”',
      },
      {
        code: 'REQUIRED',
        title: 'Psychoeducational evaluation',
        text: 'A “comprehensive psychoeducational evaluation conducted by a licensed psychologist,” current within three years. The family arranges it; the school’s pages name no providers and no cost.',
        muted: 'Eligibility for accommodations “is determined by a licensed clinical psychologist during a psychoeducational evaluation.”',
      },
      {
        code: 'REQUIRED',
        title: 'Evaluations shared before enrollment',
        text: 'Parents are “encouraged to share psychological/neurological evaluations and reports with the Director of Learning Resources in the spring/summer before enrollment,” so a plan can be ready when the school year starts.',
      },
      {
        code: 'IH',
        title: 'Deciding the level of support',
        text: 'After a diagnosis, “recommendations by the psychologist are carefully reviewed to determine the level of support needed from Learning Resources.”',
        muted: 'The school’s pages do not say who reviews them.',
      },
      {
        code: 'IH',
        title: '504 Educational Plan',
        text: 'In the Middle and Upper Schools, a [[504|504 Educational Plan]] is “created to document appropriate accommodations each school year,” based on the evaluation and the student’s needs.',
        muted: 'Upper School students are “expected to request these accommodations from teachers several days prior to a test or quiz.”',
      },
      {
        code: 'IH',
        title: 'Testing accommodations',
        text: 'Qualifying students get extended time on the ERB achievement tests in Grades 3–5 and, in the Middle School, through the 504 plan. Applications for College Board and ACT accommodations (PSAT, SAT, PreACT, ACT and AP) are “submitted separately by the Director of Learning Resources.”',
        muted: 'Both expect the accommodations to have been used in class “for a minimum of four months prior to application,” and approval generally takes 6-7 weeks.',
      },
    ],
    sources: [HB_ALL, HB_LS, HB_MS, HB_US, LRPAGE, GUIDE],
  },

  staff: {
    headline:
      'Four named leaders: the Director of Student Support & Wellness and the three division heads. The Learning Resources program’s own director is not named on the school’s public pages.',
    people: [
      { name: 'Michele King', role: 'Director of Student Support & Wellness' },
      { name: 'Casey Martin', role: 'Head of Lower School' },
      { name: 'Louisa Polos', role: 'Head of Middle School' },
      { name: 'Tracey Vanneste', role: 'Head of Upper School' },
    ],
    note: {
      strong: 'The Learning Resources program is led by a Director of Learning Resources (K–12), whom the school’s public pages do not name.',
      muted: 'The division heads appear because the handbook gives them a part in Lower School class placement and in approving on-campus tutoring. The school publishes no staff emails.',
    },
    sources: [HUB, LEADERS],
  },

  ask: {
    headline:
      'Fourteen questions to take on the tour, covering what the school’s site leaves unanswered: fees, how current the policy is, staff, prior plans, evaluation, therapy and advanced learners.',
    questions: [
      'What does a Learning Resources session cost in 2026-27, and is there a written rate?',
      'Is the November 2023 Family Handbook’s Learning Resources policy still current? Can we see the current handbook sections?',
      'Who is the Director of Learning Resources, and who are the Learning Resources teachers in each division?',
      'Does Learning Resources serve Transitional Kindergarten?',
      'What reading-intervention method do Learning Resources teachers use?',
      'If my child arrives with a 504 plan or IEP from another school, will you use it, or do we need a new evaluation?',
      'Do you keep a list of psychologists who do psychoeducational evaluations?',
      'Who reviews the psychologist’s recommendations and decides the level of support?',
      'Is a 504 Educational Plan written in the Lower School as well?',
      'Do accommodations alone, without Learning Resources sessions, carry a fee?',
      'Can outside speech, occupational or physical therapists work with my child on campus during the school day?',
      'Is there a school psychologist, and what crisis resources do you give families?',
      'How does a family qualify for the Gorelick Endowment for Learning Resources?',
      'What is available for advanced learners and for students still learning English?',
    ],
    asOf: 'October 26, 2026',
  },
}
