// Charlotte Country Day School — Learning Support & Student Services.
//
// Every fact is from the school's own pages and the PDFs, forms and directory
// they link, fetched 2026-10-25. The full verbatim record, the transcriptions
// of the evaluation policy, the preferred-provider list, the approved
// accommodations and the screening forms, the staff table with each published
// email and the corrections this forced on the deep-research dossier are in
// source-material/learning-support/charlotte-country-day/
//   Charlotte Country Day - Learning Support - Official Site Research.md
//
// The four BucsNet parent pages (Lower, Middle and Upper School ERP, Health
// Services) carry the rates, the reading method, the identification tiers and
// the current accommodations policy; the dossier could not open them, but each
// returned the page unauthenticated. Educational Resource Program sessions and
// Upper School academic coaching are coded IH_FEE on the per-session rates
// those pages publish ($82 per 45-minute Lower School session, $85 a session in
// the Middle and Upper Schools). Speech and occupational therapy come from
// independent providers who "are not employees of the school" and bill the
// family directly, so both are RF, and neither company's staff is named on the
// Therapy card. The school's pages never use the terms 504 or IEP, so no
// glossary marker appears here; that absence is itself the finding.
// The 2015–2017 policy, accommodations and referral PDFs still hosted at
// /uploaded/ are no longer linked and are deliberately unused; the current
// linked versions replace them.
// Two published emails disagree with the directory, and the directory wins:
// Janani Buford (the Health page's mailto misspells the domain) and Lauren
// Folger-Sweeting (the Upper School ERP page prints a hyphenated address).

import type { Source } from '../../components/SourceRow.tsx'
import type { LearningSupportProgram } from '../learningSupport.ts'

const ERP: Source = {
  label: 'charlottecountryday.org — Educational Resource Program',
  url: 'https://www.charlottecountryday.org/cd-education/educational-resource-program',
}
const LS: Source = {
  label: 'charlottecountryday.org — Lower School ERP (BucsNet)',
  url: 'https://www.charlottecountryday.org/bucsnet/lower-school/erp',
}
const MS: Source = {
  label: 'charlottecountryday.org — Middle School ERP (BucsNet)',
  url: 'https://www.charlottecountryday.org/bucsnet/middle-school/erp',
}
const US: Source = {
  label: 'charlottecountryday.org — Upper School Academic Coaching (BucsNet)',
  url: 'https://www.charlottecountryday.org/bucsnet/upper-school/erp',
}
const ACCOM: Source = {
  label: 'charlottecountryday.org — Academic Accommodations and Learning Support (BucsNet)',
  url: 'https://www.charlottecountryday.org/bucsnet/upper-school/erp/learning-evaluations',
}
const POLICY: Source = {
  label: 'charlottecountryday.org — Policy on Psychoeducational Evaluations (PDF)',
  url: 'https://www.charlottecountryday.org/fs/resource-manager/view/340fc0e3-7789-4165-9402-c327f27e5fc4',
}
const PROVIDERS: Source = {
  label: 'charlottecountryday.org — Preferred Providers for Psychoeducational Testing, January 2026 (PDF)',
  url: 'https://www.charlottecountryday.org/fs/resource-manager/view/3db8c6f3-71f9-4843-b5c4-e3164f16d243',
}
const APPROVED: Source = {
  label: 'charlottecountryday.org — Approved Accommodations (PDF)',
  url: 'https://www.charlottecountryday.org/fs/resource-manager/view/832f59a5-22a3-4f65-9c21-905ee33ddbd7',
}
const CONSENT: Source = {
  label: 'charlottecountryday.org — ERP Consent for Assessment (PDF)',
  url: 'https://www.charlottecountryday.org/fs/resource-manager/view/9f5f4219-2c76-4ff5-bd84-8c93beb702a9',
}
const OT: Source = {
  label: 'charlottecountryday.org — Occupational Therapy screening letter (PDF)',
  url: 'https://www.charlottecountryday.org/fs/resource-manager/view/0cd223bc-1e47-49af-874c-88b3b66e009d',
}
const SPEECH: Source = {
  label: 'charlottecountryday.org — Speech and Language screening form (PDF)',
  url: 'https://www.charlottecountryday.org/fs/resource-manager/view/5857f581-8ca5-4b33-9461-f1fb052ab883',
}
const HEALTH: Source = {
  label: 'charlottecountryday.org — Health Services (BucsNet)',
  url: 'https://www.charlottecountryday.org/bucsnet/health',
}
const CRISIS: Source = {
  label: 'charlottecountryday.org — Crisis Service Lines',
  url: 'https://www.charlottecountryday.org/fs/resource-manager/view/e5f0a9ae-520d-4426-9a41-f91f68115594',
}
const LSCURR: Source = {
  label: 'charlottecountryday.org — Lower School Curriculum',
  url: 'https://www.charlottecountryday.org/cd-education/lower-school/ls-curriculum',
}
const WELLNESS: Source = {
  label: 'charlottecountryday.org — Director of Health and Wellness announcement',
  url: 'https://www.charlottecountryday.org/bucsnet/post-details/~board/school-news/post/announcing-our-new-director-of-health-and-wellness',
}
const DIRECTORY: Source = {
  label: 'charlottecountryday.org — Faculty/Staff Directory',
  url: 'https://www.charlottecountryday.org/meet-our-faculty/facultystaff-directory',
}
const ADMISSIONS: Source = {
  label: 'charlottecountryday.org — Admissions Process',
  url: 'https://www.charlottecountryday.org/admissions/admissions-process',
}
const INTL: Source = {
  label: 'charlottecountryday.org — International Studies',
  url: 'https://www.charlottecountryday.org/cd-education/international-studies',
}

export const charlotteCountryDay: LearningSupportProgram = {
  // Bucs — Country Day green and gold, from charlottecountryday.org's theme CSS.
  colors: { brand: '#00664A', gold: '#FFC757' },
  lead: {
    strong:
      'Country Day’s Educational Resource Program “assists students in grades junior kindergarten through grade 12,” with one-on-one learning support in the Lower and Middle Schools, academic coaching in the Upper School, and accommodations for students with a documented disability.',
    muted: 'Sessions are billed to the student’s account: $82 for 45 minutes in the Lower School, $85 a session in the Middle and Upper Schools.',
  },
  stats: [
    { value: '$82', label: 'a 45-minute Lower School session', note: 'grades JK–4, billed through the student’s account by the Business Office' },
    { value: '$85', label: 'a Middle or Upper School session', note: 'Middle School learning support and Upper School academic coaching; the session length is not stated' },
    { value: '26', label: 'Educational Resource Program staff', note: 'three division directors, 19 learning specialists and four academic coaches' },
    { value: '6', label: 'school counselors', note: 'two in each division, alongside a Director of Health and Wellness' },
  ],

  eligibility: {
    headline:
      'Country Day gives school-based accommodations to students with a documented disability, from its own approved list. Learning-support sessions need no testing.',
    eligible:
      'Accommodations are for “students with documented disabilities,” which a licensed service provider must document “through a full psychoeducational evaluation.” Learning-support sessions are different: the Lower School says a psychoeducational evaluation “is not required for services,” and Middle School support is open to students “both with and without formal testing.”',
    plan:
      'The school’s pages do not mention 504 plans or IEPs. A full psychoeducational evaluation is the only evaluation accepted for formal accommodations: “A simple doctor’s note or medical diagnosis (e.g., ADHD or anxiety) does not provide enough information to justify accommodations.” Supports an outside provider suggests “are considered recommendations and are not mandated.”',
    scope:
      '“Students are eligible only for Country Day-approved accommodations; accommodations outside this list are not granted.” The approved list covers classroom accommodations, Country Day tests and standardized-test requests.',
    note: 'A speech-language, occupational therapy or auditory processing evaluation “may receive school approved accommodations for one year.”',
    sources: [ACCOM, LS, MS, POLICY, APPROVED],
  },

  services: {
    headline:
      'Every service the school’s pages describe, grouped and coded by who delivers it. Learning-support sessions and coaching are billed per session; speech and occupational therapy come from independent providers on campus. Pick your child’s need to see what applies.',
    verdicts: {
      read: {
        head: 'One-on-one Orton-Gillingham-based support in the Lower School, and small reading groups in K–1.',
        body: 'Lower School specialists “bring advanced training, including Orton-Gillingham,” and the Hochman Method (The Writing Revolution). “For K–1 students, the Reading Specialist provides small-group literacy instruction.”',
      },
      attn: {
        head: 'Academic coaching in the Upper School, and executive-skills support in the Middle School.',
        body: 'Each coaching session “uses a student’s current coursework as the practice ground.” Upper School coaching is scheduled “on a first-come, first-served basis” and “begins after the first day of school as staffing allows.”',
      },
      math: {
        head: 'One-on-one multi-sensory math in the Lower School, and math support in the Middle School.',
        body: 'Lower School math is taught with “hands-on manipulatives, explicit language and multi-sensory engagement.” Middle School specialists help students strengthen “writing, math, and reading comprehension within the context of their coursework.”',
      },
      speech: {
        head: 'Screening and therapy on campus, through an independent provider the family pays directly.',
        body: 'TerrificTalkers’ speech-language pathologists screen on campus for $25.00 and “operate independently of this school and are not employees of the school.” Therapy is arranged and paid for with the provider.',
      },
      motor: {
        head: 'Occupational therapy on campus through an independent provider. No physical therapy is listed.',
        body: 'Southern Piedmont Pediatric Therapy screens for $25, and “OT’s are on campus 1-2 days per week.” If you schedule therapy, “all financial arrangements will be between you and Southern Piedmont Pediatric Therapy.”',
      },
      social: {
        head: 'Six school counselors, two in each division, and published crisis lines.',
        body: 'Lower School counselors provide “short-term individual and/or family counseling if needed, and referral to outside experts when appropriate.” The Health Services page links 988, the Crisis Text Line and the NC Peer Warmline.',
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
            detail: 'Nineteen learning specialists and four Upper School academic coaches, led by a director in each division, plus a Lower School Reading Specialist and Literacy Coach. Lower School specialists “bring advanced training, including Orton-Gillingham.”',
            needs: ['read', 'attn', 'math'],
          },
          {
            service: 'Reading intervention',
            code: 'IH_FEE',
            detail: 'Lower School specialists give one-on-one support in reading and writing, “typically twice per week,” drawing on Orton-Gillingham and the Hochman Method. K–1 students may also get “small-group literacy instruction” from the Reading Specialist; the school does not say whether those groups are billed.',
            needs: ['read'],
          },
          {
            service: 'Math intervention',
            code: 'IH_FEE',
            detail: 'One-on-one “Multi-Sensory Math” in the Lower School, and math within Middle School learning support.',
            needs: ['math'],
          },
          {
            service: '1:1 / small-group instruction',
            code: 'IH_FEE',
            detail: 'One-on-one in every division: Lower School sessions are “$82 per 45-minute session,” Middle School sessions “$85 per session.” Small groups are for K–1 literacy only.',
            needs: ['read', 'attn', 'math'],
          },
          {
            service: 'Executive-function coaching',
            code: 'IH_FEE',
            detail: 'Upper School academic coaching is “billed at $85 per session”: one coach across core classes in 9th grade, then Humanities or STEM coaching in grades 10–12. Middle School support covers executive skills: “organization, planning, study routines.”',
            needs: ['attn'],
          },
          {
            service: 'Learning-support class',
            code: 'IH_FEE',
            detail: 'No learning-support class is offered, but sessions “are a permanent part of student schedules” and are “treated as class periods,” held during study halls, special-area classes or lunch.',
            needs: ['read', 'attn', 'math'],
          },
          {
            service: 'Accommodations & learning plan',
            code: 'IH',
            detail: 'Accommodations come only from the school’s approved list and are recorded in a “Confidential Academic Plan (CAP)” that every teacher can see. Middle and Upper School students with “a documented mental health diagnosis may receive temporary accommodations” while awaiting an evaluation.',
            needs: ['read', 'attn', 'math', 'speech', 'motor'],
          },
          {
            service: 'Specially designed instruction',
            code: 'NS',
            detail: 'Not described. The school says accommodations change “how a student accesses learning—not what they are expected to learn.”',
            needs: ['read', 'attn', 'math'],
          },
          {
            service: 'Self-contained / separate program',
            code: 'NS',
            detail: 'No separate program described.',
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
            detail: 'Formal accommodations need a full psychoeducational evaluation, reviewed every three years in Lower and Middle School and every four in Upper School, and submitted through the ERP’s secure online form. Learning-support sessions need none.',
            needs: ['read', 'attn', 'math', 'speech', 'motor', 'social'],
          },
        ],
      },
      {
        name: 'Therapy & related services',
        rows: [
          {
            service: 'Speech-language therapy',
            code: 'RF',
            detail: 'TerrificTalkers screens on campus for $25.00 and can provide therapy at school; the family pays the provider directly. The school calls them “contracted” therapists “who provide additional services during the school day.”',
            needs: ['speech'],
          },
          {
            service: 'Occupational therapy',
            code: 'RF',
            detail: 'Southern Piedmont Pediatric Therapy screens for $25 and is “on campus 1-2 days per week”; therapy is arranged and paid for with the provider.',
            needs: ['motor'],
          },
          { service: 'Physical therapy', code: 'NS', detail: 'Not listed by the school.', needs: ['motor'] },
        ],
      },
      {
        name: 'Assessment',
        rows: [
          {
            service: 'Early identification (JK–2)',
            code: 'IH',
            detail: 'Lower School students are identified through “benchmark assessments given at the beginning, middle, and end of the school year,” and the school offers speech-language and occupational therapy screenings.',
            needs: ['read', 'attn', 'math', 'speech'],
          },
          {
            service: 'Testing accommodations',
            code: 'IH',
            detail: 'Approved accommodations include “Extended time (50% more)” on Country Day tests. The ERP submits College Board, ACT and IB requests, but “Country Day accommodations do not automatically transfer.”',
            needs: ['read', 'attn', 'math'],
          },
          {
            service: 'Entrance testing',
            code: 'IH',
            detail: 'A psychologist’s standardized screening for younger applicants, the ISEE for grades 5–12, and the TOEFL for international applicants.',
            needs: [],
          },
          {
            service: 'Psychoeducational evaluation',
            code: 'RF',
            detail: 'Done by outside providers at the family’s cost. The school publishes a list of preferred providers, updated January 2026, some accepting insurance, and “financial aid options are available for qualifying families.”',
            needs: ['read', 'attn', 'math', 'speech', 'motor'],
          },
        ],
      },
      {
        name: 'Wellness & health',
        rows: [
          {
            service: 'Counseling & emotional support',
            code: 'IH',
            detail: 'Six school counselors, two in each division; three hold the title Director of Counseling. Lower School counselors provide “short-term individual and/or family counseling if needed, and referral to outside experts when appropriate.”',
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
            code: 'RF',
            detail: 'The Health Services page links Crisis Service Lines: the 988 Suicide & Crisis Lifeline, the Crisis Text Line (text HOME to 741741) and the NC Peer Warmline (1-855-733-7762).',
            needs: ['social'],
          },
          {
            service: 'School psychologist',
            code: 'NS',
            detail: 'None named. The Director of Health and Wellness, who started July 1, 2026, is described by the school as a licensed clinical psychologist.',
            needs: ['social'],
          },
          { service: 'School nurse', code: 'IH', detail: '“Two full-time nurses on each campus.”', needs: [] },
        ],
      },
      {
        name: 'Language',
        rows: [
          {
            service: 'ESL / English-language support',
            code: 'IH',
            detail: 'The school has “a full-time English as a Second Language program,” and the directory lists an English and ESL Teacher in the Upper School.',
            needs: [],
          },
        ],
      },
    ],
    sources: [ERP, LS, MS, US, ACCOM, APPROVED, POLICY, PROVIDERS, OT, SPEECH, HEALTH, CRISIS, LSCURR, WELLNESS, ADMISSIONS, INTL, DIRECTORY],
  },

  therapy: {
    headline:
      'Speech and occupational therapy are available on campus during the school day from independent providers, arranged and paid for directly by the family. Physical therapy is not listed.',
    items: [
      { name: 'Speech-language', code: 'RF', detail: 'TerrificTalkers, on campus. Screening $25.00; therapy fees are set by the provider.' },
      { name: 'Occupational', code: 'RF', detail: 'Southern Piedmont Pediatric Therapy, on campus 1–2 days a week. Screening $25; therapy fees are set by the provider.' },
      { name: 'Physical', code: 'NS' },
    ],
    note: 'Both providers “operate independently” of the school. Screening forms go home through the Lower School; the school does not say whether screening is offered in the Middle or Upper School.',
    sources: [LS, OT, SPEECH],
  },

  testing: {
    headline:
      'Lower School students are screened three times a year, and the Educational Resource Program tiers support from the results. Formal accommodations need a full psychoeducational evaluation from an outside provider.',
    entries: [
      {
        code: 'IH',
        title: 'Benchmark screening (K–4)',
        text: '“Students are identified for support based on benchmark assessments given at the beginning, middle, and end of the school year.”',
        muted: 'Data analysis meetings with the Literacy Leadership Team decide which of three tiers of support fits: classroom strategies, K–1 small groups, or one-on-one sessions.',
      },
      {
        code: 'IH',
        title: 'Educational screening',
        text: 'With a parent’s signed consent, the school does “an educational screening” to “identify individual educational needs in order to aid in individualizing instruction.”',
      },
      {
        code: 'RF',
        title: 'Speech-language and occupational therapy screening',
        text: 'Independent providers screen on campus for $25. OT screenings are “brief 15-20 minute clinical observations to determine if an OT evaluation is needed”; the speech screening “does not serve as a comprehensive speech/language evaluation.”',
      },
      {
        code: 'RF',
        title: 'Psychoeducational evaluation',
        text: '“A licensed service provider must document disabilities through a full psychoeducational evaluation,” at the family’s cost. The school publishes a preferred-provider list, updated January 2026.',
        muted: 'The accommodations page says evaluations are reviewed every three years in Lower and Middle School and every four in Upper School; the linked policy says three years through grade 5 and four from grade 6.',
      },
      {
        code: 'IH',
        title: 'Confidential Academic Plan',
        text: '“Teachers and Learning Support staff review each student’s psychoeducational profile and recommended accommodations,” and approved accommodations go into the student’s Confidential Academic Plan (CAP).',
        muted: 'Middle and Upper School students with a documented mental health diagnosis may get temporary accommodations through the school counselor while awaiting an evaluation.',
      },
      {
        code: 'IH',
        title: 'Testing accommodations',
        text: 'Approved accommodations apply to daily coursework and quizzes and to “Country Day-administered exams, including midterms and finals.” Standardized-test accommodations “must be approved separately by the College Board or ACT.”',
        muted: 'In grades 6–12, testing must reach the school at least seven business days before reading day to be used on exams.',
      },
    ],
    sources: [LS, CONSENT, OT, SPEECH, ACCOM, POLICY, PROVIDERS, APPROVED],
  },

  staff: {
    headline:
      'Forty named staff: the 26-person Educational Resource Program, the Lower School Reading Specialist, the Director of Health and Wellness, seven counselors, four nurses and an ESL teacher.',
    people: [
      { name: 'Sherry Harris', role: 'Director of Lower School ERP', email: 'sherry.harris@charlottecountryday.org' },
      { name: 'Leigh Bowles', role: 'Learning Specialist, Lower School', email: 'leigh.bowles@charlottecountryday.org' },
      { name: 'Stuart Deets', role: 'Learning Specialist, Lower School', email: 'stuart.deets@charlottecountryday.org' },
      { name: 'Mattie Gibson', role: 'Learning Specialist, Lower School', email: 'mattie.gibson@charlottecountryday.org' },
      { name: 'Ann Grajales', role: 'Learning Specialist, Lower School', email: 'ann.grajales@charlottecountryday.org' },
      { name: 'Karen Muller', role: 'Learning Specialist, Lower School', email: 'karen.muller@charlottecountryday.org' },
      { name: 'Jennifer Ott', role: 'Learning Specialist, Lower School', email: 'jennifer.ott@charlottecountryday.org' },
      { name: 'Catherine Upchurch', role: 'Learning Specialist, Lower School', email: 'catherine.upchurch@charlottecountryday.org' },
      { name: 'Courtney Wawak', role: 'Learning Specialist, Lower School', email: 'courtney.wawak@charlottecountryday.org' },
      { name: 'Mary Whisnant', role: 'Learning Specialist, Lower School' },
      { name: 'Jennie Roberts Creason', role: 'Reading Specialist/Literacy Coach, Lower School', email: 'jennie.roberts@charlottecountryday.org' },
      { name: 'Laura Hayes', role: 'Director of Middle School ERP', email: 'laura.hayes@charlottecountryday.org' },
      { name: 'Kim Bender', role: 'Learning Specialist, Middle School', email: 'kim.bender@charlottecountryday.org' },
      { name: 'Terri Bennett', role: 'Learning Specialist, Middle School', email: 'terri.bennett@charlottecountryday.org' },
      { name: 'Jacquelyn Coble', role: 'Learning Specialist, Middle School', email: 'jacquelyn.coble@charlottecountryday.org' },
      { name: 'Krista Groncki', role: 'Learning Specialist, Middle School', email: 'krista.groncki@charlottecountryday.org' },
      { name: 'Lisa Miller', role: 'Learning Specialist, Middle School', email: 'lisa.miller@charlottecountryday.org' },
      { name: 'Hasson Perkins', role: 'Learning Specialist, Middle School', email: 'hasson.perkins@charlottecountryday.org' },
      { name: 'Kevin Quesenberry', role: 'Learning Specialist, Middle School', email: 'kevin.quesenberry@charlottecountryday.org' },
      { name: 'Krista Roth', role: 'Learning Specialist, Middle School', email: 'krista.roth@charlottecountryday.org' },
      { name: 'Ashley Swistak', role: 'Learning Specialist, Middle School', email: 'ashley.swistak@charlottecountryday.org' },
      { name: 'Bailey Turner', role: 'Learning Specialist, Middle School', email: 'bailey.turner@charlottecountryday.org' },
      { name: 'Lauren Folger-Sweeting', role: 'Director of Upper School ERP', email: 'lauren.sweeting@charlottecountryday.org' },
      { name: 'Jennifer Achilles', role: 'Academic Coach, Upper School', email: 'jennifer.achilles@charlottecountryday.org' },
      { name: 'Chad Groncki', role: 'Academic Coach, Upper School', email: 'chad.groncki@charlottecountryday.org' },
      { name: 'Kristen Rinehart', role: 'Academic Coach, Upper School', email: 'kristen.rinehart@charlottecountryday.org' },
      { name: 'Danielle Riviere', role: 'Academic Coach, Upper School', email: 'danielle.riviere@charlottecountryday.org' },
      { name: 'Dr. Danielle Dixon Scott', role: 'Director of Health and Wellness', email: 'danielle.scott@charlottecountryday.org' },
      { name: 'J.G. Bailey', role: 'Director of Lower School Counseling', email: 'jg.bailey@charlottecountryday.org' },
      { name: 'Aleya Willis', role: 'Lower School Counselor', email: 'aleya.willis@charlottecountryday.org' },
      { name: 'Janani Buford', role: 'Director of Middle School Counseling', email: 'janani.buford@charlottecountryday.org' },
      { name: 'Jo Malveaux', role: 'Middle School Counselor', email: 'jo.malveaux@charlottecountryday.org' },
      { name: 'Samantha Bosco', role: 'Director of Upper School Counseling', email: 'samantha.bosco@charlottecountryday.org' },
      { name: 'Mallika Rajan', role: 'Upper School Counselor', email: 'mallika.rajan@charlottecountryday.org' },
      { name: 'ChaChi Sullivan', role: 'Assistant Director of Athletics, Student Health', email: 'chachi.sullivan@charlottecountryday.org' },
      { name: 'Gwen Nix', role: 'School Nurse, Cannon Campus', email: 'gwen.nix@charlottecountryday.org' },
      { name: 'Sharon Ferris', role: 'School Nurse, Cannon Campus', email: 'Sharon.Ferris@charlottecountryday.org' },
      { name: 'Wendy Barber', role: 'School Nurse, Bissell Campus', email: 'Wendy.Barber@charlottecountryday.org' },
      { name: 'Meredith Schulz', role: 'School Nurse, Bissell Campus', email: 'Meredith.Schulz@charlottecountryday.org' },
      { name: 'Hannah Wagner', role: 'English and ESL Teacher, Upper School', email: 'hannah.wagner@charlottecountryday.org' },
    ],
    note: {
      strong: 'Each division’s ERP director is the first contact for learning support and accommodations.',
      muted: 'The school also lists a shared nurses’ inbox, nurses@charlottecountryday.org.',
    },
    sources: [LS, MS, US, HEALTH, WELLNESS, LSCURR, DIRECTORY],
  },

  ask: {
    headline:
      'Thirteen questions to take on the tour, covering what the school’s site leaves unanswered or says two ways: prior plans, evaluation timing, fees, therapy, methods and staffing.',
    questions: [
      'How is a 504 plan, IEP or another school’s accommodations plan treated when a student enrolls? Is a new psychoeducational evaluation always required?',
      'Your accommodations page says evaluations are reviewed every three years in Lower and Middle School, but the evaluation policy says three years through grade 5 and four from grade 6. Which applies to grades 5–8?',
      'How long is a Middle School or Upper School session at $85?',
      'Are the K–1 small reading groups with the Reading Specialist billed, or included in tuition?',
      'Does financial aid cover Educational Resource Program sessions or academic coaching?',
      'What do TerrificTalkers and Southern Piedmont Pediatric Therapy charge for therapy, and do they accept insurance?',
      'Are speech-language and occupational therapy screenings available in the Middle and Upper Schools?',
      'Can physical therapy take place on campus during the school day?',
      'Do you ever modify the curriculum, or is support always accommodations and one-on-one sessions?',
      'What do you offer advanced or gifted learners?',
      'Is there a school psychologist, and how does the Director of Health and Wellness work with the Educational Resource Program?',
      'Upper School coaching is first-come, first-served and depends on staffing, and two academic coach positions are posted. How likely is a new student to get a coaching slot?',
      'Is English-language (ESL) support offered below the Upper School, and is there a fee?',
    ],
    asOf: 'October 25, 2026',
  },
}
