// Davidson Day School — Learning Support & Student Services.
//
// Every fact is from the school's own pages, the request form and the PDF they
// link, fetched 2026-10-25. The full verbatim record, the transcription of the
// 2026 Summer LEC letter, the staff table with each published email and the
// corrections this forced on the deep-research dossier are in
// source-material/learning-support/davidson-day/
//   Davidson Day School - Learning Support - Official Site Research.md
//
// Learning Enrichment Center services are coded IH_FEE: the school's own
// request form promises to "share important LEC information, including our
// 2026-27 rates," OT is "an additional service," and the summer letter bills
// to the Patriot Account. Only the summer 2026 rates are published, so those
// are the only figures rendered, each labelled as summer. The school's pages
// never use the terms 504 or IEP, so no glossary marker appears here; that
// absence is itself the finding.
// GO/NO-GO test 2 (eligibility) failed and was overridden by the user on
// 2026-10-25; the plan and scope cells are explicit not-stated findings.

import type { Source } from '../../components/SourceRow.tsx'
import type { LearningSupportProgram } from '../learningSupport.ts'

const LEC: Source = {
  label: 'davidsonday.org — Learning Enrichment Center',
  url: 'https://www.davidsonday.org/academics/learning-enrichment-center',
}
const FORM: Source = {
  label: 'davidsonday.org — Learning Enrichment Center request form, 2026-2027',
  url: 'https://docs.google.com/forms/d/e/1FAIpQLSc6dwQOOWqVJ2hcJei7et2WNZd9a20OzwaDG-viumjj_BYR1w/viewform',
}
const SUMMER: Source = {
  label: 'davidsonday.org — 2026 Summer Learning Enrichment Center letter (PDF)',
  url: 'https://www.davidsonday.org/fs/resource-manager/view/5dbaf607-d45e-4c8c-b469-9e3c4c9e0123',
}
const ADMISSION: Source = {
  label: 'davidsonday.org — Admission Process',
  url: 'https://www.davidsonday.org/admission/admission-process',
}
const TUITION: Source = {
  label: 'davidsonday.org — Tuition and Affordability',
  url: 'https://www.davidsonday.org/admission/tuition-and-affordability',
}
const MIDDLE: Source = {
  label: 'davidsonday.org — Middle School',
  url: 'https://www.davidsonday.org/academics/middle-school',
}
const CULTURE: Source = {
  label: 'davidsonday.org — Community and Culture',
  url: 'https://www.davidsonday.org/student-life/community-and-culture',
}
const DIRECTORY: Source = {
  label: 'davidsonday.org — Faculty & Staff Directory',
  url: 'https://www.davidsonday.org/directory',
}
const LEADERSHIP: Source = {
  label: 'davidsonday.org — Our Leadership',
  url: 'https://www.davidsonday.org/about/leadership',
}

export const davidsonDay: LearningSupportProgram = {
  // Patriots — navy and red, from davidsonday.org's theme variables.
  colors: { brand: '#062042', gold: '#C41A3B' },
  lead: {
    strong:
      'Davidson Day’s Learning Enrichment Center “provides personalized, one-on-one instruction that supports students ages two through grade 12,” with tutoring, academic coaching, social skills groups, and speech and occupational therapy on campus.',
    muted: 'Services are billed. The school publishes its summer rates, not its school-year rates.',
  },
  stats: [
    { value: '5', label: 'LEC services', note: 'tutoring, academic coaching, social skills groups, speech-language therapy and occupational therapy' },
    { value: '13', label: 'Learning Enrichment Center staff', note: 'nine learning specialists, a director, a coordinator, a speech-language pathologist and a literacy coach' },
    { value: '$47', label: 'a 30-minute summer tutoring session', note: 'summer 2026, billed to the family’s Patriot Account; school-year rates are not published' },
    { value: '2', label: 'school counselors', note: 'a Lower School Counselor and a Middle and Upper School Counselor, per the staff directory' },
  ],

  eligibility: {
    headline:
      'The Learning Enrichment Center is open to students at every grade, by request. The school publishes no eligibility criteria and does not mention 504 plans or IEPs.',
    eligible:
      'Each LEC service is “available to students at all grade levels,” and the center supports “students ages two through grade 12.” Families “submit our request form,” and the Director of Learning Services “will then call you to discuss the kind of academic support your child needs.” The 2026-2027 request form asks for no diagnosis, evaluation or other documentation.',
    plan:
      'The school’s pages do not mention 504 plans, IEPs or accommodations, and the LEC request form does not ask about them.',
    scope:
      'The school’s pages do not say what the LEC does not provide. The one stated limit is on coaching: “Academic Coaching is more than ‘homework help’,” and “Students will likely have homework remaining after sessions.”',
    note: 'Admission asks for “current transcripts and teacher recommendations,” and the school says it “does not discriminate on the basis of” disability, among other categories.',
    sources: [LEC, FORM, ADMISSION],
  },

  services: {
    headline:
      'Every service the school’s pages describe, grouped and coded by who delivers it. LEC services are billed; the school publishes its summer 2026 rates but not its school-year rates. Pick your child’s need to see what applies.',
    verdicts: {
      read: {
        head: 'One-on-one tutoring for reading, plus a Lower School literacy coach and reading specialist. No reading method is named.',
        body: 'LEC tutoring can “address specific academic difficulties (reading fluency and comprehension or math skills).” Ask which reading approach the specialists use.',
      },
      attn: {
        head: 'One-on-one academic coaching for executive function, at every grade.',
        body: 'Coaching helps students “develop organizational and time management skills, learning techniques, and self-advocacy,” and every Middle School student takes a study skills course each year.',
      },
      math: {
        head: 'One-on-one math tutoring, by request.',
        body: 'LEC instructors give “review or remedial instruction” in subjects including Math, and tutoring “is often done during the school day, often during a study hall period.”',
      },
      speech: {
        head: 'On campus during the school day, through a contracted provider.',
        body: '“Davidson Day School has a contract with Speech Techniques to provide speech-language services on campus during the school day,” with sessions “typically lasting 30-minutes.”',
      },
      motor: {
        head: 'Occupational therapy on campus through a contracted provider. No physical therapy is listed.',
        body: 'Integrative Wellness provides OT “on campus during the school day as an additional service,” for “handwriting, visual-motor integration, sensory processing, social skills, and other fine motor skills.”',
      },
      social: {
        head: 'Social skills groups led by an occupational therapist, and two school counselors.',
        body: 'Groups of “3-4 students, grouped by age and goal areas” meet weekly for 30 minutes. The directory lists a Lower School Counselor and a Middle and Upper School Counselor.',
      },
      gifted: {
        head: 'Upper School courses for ready Middle Schoolers, and an enrichment option in the LEC. No formal gifted program.',
        body: 'Middle Schoolers “ready to learn at the next level” can take world language and mathematics in the Upper School, and the LEC request form offers “Personalized Exploration (Enrichment) focused on student\'s passions and curiosities.”',
      },
    },
    groups: [
      {
        name: 'Learning & academic support',
        rows: [
          {
            service: 'Specialized teachers',
            code: 'IH',
            detail: 'Nine Learning Specialists, a Lower School Literacy Coach and a Director of Learning Services staff the LEC; the directory also lists a Lower School Reading Specialist.',
            needs: ['read', 'attn', 'math'],
          },
          {
            service: 'Reading intervention',
            code: 'IH_FEE',
            detail: 'One-on-one tutoring can “address specific academic difficulties (reading fluency and comprehension or math skills).” No method (e.g., Orton-Gillingham, structured literacy) is named.',
            needs: ['read'],
          },
          {
            service: 'Math intervention',
            code: 'IH_FEE',
            detail: 'One-on-one tutoring in “math skills,” as part of LEC tutoring.',
            needs: ['math'],
          },
          {
            service: '1:1 / small-group instruction',
            code: 'IH_FEE',
            detail: 'LEC instructors “meet with students in a one-on-one setting for one or more sessions per week.” The only small groups are the social skills groups, of “3-4 students.”',
            needs: ['read', 'attn', 'math'],
          },
          {
            service: 'Subject tutoring',
            code: 'IH_FEE',
            detail: 'Sessions provide “review or remedial instruction in a specific subject area (Language Arts, Math, Science, Social Studies, and/or Foreign Language),” often “during a study hall period.”',
            needs: ['read', 'math'],
          },
          {
            service: 'Executive-function coaching',
            code: 'IH_FEE',
            detail: 'Academic coaching builds “organizational and time management skills, learning techniques, and self-advocacy.” It “is more than ‘homework help’.”',
            needs: ['attn'],
          },
          {
            service: 'Learning-support class',
            code: 'IH',
            detail: 'No learning-support class is described, but “every Middle School student takes a study skills course each year.”',
            needs: ['attn'],
          },
          {
            service: 'Accommodations & learning plan',
            code: 'NS',
            detail: 'Not described. The LEC’s learning specialists “will have direct contact with the classroom teacher,” and families get a weekly email.',
            needs: ['read', 'attn', 'math', 'speech', 'motor'],
          },
          {
            service: 'Specially designed instruction',
            code: 'NS',
            detail: 'Not described. LEC lesson plans are individualized tutoring, not a modified curriculum.',
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
            code: 'IH',
            detail: 'Middle Schoolers can take Upper School world language and math; the LEC request form offers “Personalized Exploration (Enrichment).” No formal gifted program.',
            needs: ['gifted'],
          },
          {
            service: 'Eligibility documentation',
            code: 'NS',
            detail: 'None asked. The LEC request form asks for grade, services, goals and frequency; admission asks for “current transcripts and teacher recommendations.”',
            needs: ['read', 'attn', 'math', 'speech', 'motor', 'social'],
          },
          {
            service: 'Summer tutoring & therapy',
            code: 'IH_FEE',
            detail: 'June 1 to July 30, 2026: tutoring $47 for 30 minutes, $63 for 40 and $78 for 50; occupational therapy $160 for a 60-minute session; speech therapy $80 for a 30-minute session, all “billed directly to your Patriot Account.”',
            needs: ['read', 'attn', 'math', 'speech', 'motor'],
          },
        ],
      },
      {
        name: 'Therapy & related services',
        rows: [
          {
            service: 'Speech-language therapy',
            code: 'IH_FEE',
            detail: 'Through a contract with Speech Techniques, “on campus during the school day,” one-on-one, with sessions “typically lasting 30-minutes.”',
            needs: ['speech'],
          },
          {
            service: 'Occupational therapy',
            code: 'IH_FEE',
            detail: 'Through a contract with Integrative Wellness, “on campus during the school day as an additional service,” one-on-one.',
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
            code: 'NS',
            detail: 'No screening is described. The Gesell Readiness Assessment is an admission test.',
            needs: ['read', 'attn', 'math', 'speech'],
          },
          {
            service: 'Testing accommodations',
            code: 'NS',
            detail: 'Not described, for the ISEE or school exams.',
            needs: ['read', 'attn', 'math'],
          },
          {
            service: 'Entrance testing',
            code: 'IH',
            detail: 'The Gesell Readiness Assessment (Junior Kindergarten–1st Grade), a reading assessment plus the at-home ISEE (2nd–4th Grade), and the ISEE (5th–12th Grade).',
            needs: [],
          },
          {
            service: 'Psychoeducational evaluation',
            code: 'NS',
            detail: 'Not described: neither in-house testing nor a referral list.',
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
            detail: 'The directory lists a Lower School Counselor and a Middle and Upper School Counselor; “Social-emotional learning is a cornerstone of the Davidson Day Lower School experience.”',
            needs: ['social'],
          },
          {
            service: 'Social skills groups',
            code: 'IH_FEE',
            detail: 'Groups are “led and directed by an occupational therapist,” for “3-4 students, grouped by age and goal areas,” meeting weekly for 30 minutes.',
            needs: ['social'],
          },
          {
            service: 'Emotional & behavioral intervention',
            code: 'NS',
            detail: 'Not described beyond the social skills groups.',
            needs: ['social'],
          },
          { service: 'Crisis resources', code: 'NS', detail: 'No crisis resources are published.', needs: ['social'] },
          { service: 'School psychologist', code: 'NS', detail: 'None named.', needs: ['social'] },
          { service: 'School nurse', code: 'IH', detail: 'A School Nurse is listed in the staff directory.', needs: [] },
        ],
      },
      {
        name: 'Language',
        rows: [{ service: 'ESL / English-language support', code: 'NS', detail: 'Not described.', needs: [] }],
      },
    ],
    sources: [LEC, FORM, SUMMER, ADMISSION, TUITION, MIDDLE, CULTURE, DIRECTORY],
  },

  therapy: {
    headline:
      'Speech and occupational therapy are on campus during the school day through contracted providers, as billed LEC services. Physical therapy is not listed.',
    items: [
      { name: 'Speech-language', code: 'IH_FEE', detail: 'Speech Techniques, on campus; sessions typically 30 minutes. Summer 2026: $80 a session.' },
      { name: 'Occupational', code: 'IH_FEE', detail: 'Integrative Wellness, on campus, “an additional service.” Summer 2026: $160 for a 60-minute session.' },
      { name: 'Physical', code: 'NS' },
    ],
    people: [{ name: 'Rebecca Miller', role: 'Speech/Language Pathologist', email: 'rmiller@davidsonday.org' }],
    note: 'The speech-language pathologist is on the LEC staff list. School-year therapy rates are shared with families before school starts and are not published.',
    sources: [LEC, SUMMER, DIRECTORY],
  },

  testing: {
    headline:
      'Davidson Day publishes no screening or evaluation for learning differences. A family asks for LEC support with a request form, and the Director of Learning Services follows up by phone.',
    entries: [
      {
        code: 'IH',
        title: 'Request and intake call',
        text: 'Families “submit our request form,” and the Director of Learning Services “will then call you to discuss the kind of academic support your child needs and what type of tutoring services are available.”',
        muted: 'The 2026-2027 request form asks for no diagnosis, evaluation or other documentation.',
      },
      {
        code: 'NS',
        title: 'Screening for reading, math or attention',
        text: 'The school does not describe any early identification or screening.',
      },
      {
        code: 'NS',
        title: 'Psychoeducational evaluation',
        text: 'The school does not say whether it tests for learning differences, asks for an outside evaluation, or names evaluators.',
      },
    ],
    sources: [LEC, FORM],
  },

  staff: {
    headline:
      'Seventeen named staff: the 13-person Learning Enrichment Center, a Lower School reading specialist, two school counselors and the school nurse.',
    people: [
      { name: 'Jennifer Breen', role: 'Learning Specialist', email: 'jbreen@davidsonday.org' },
      { name: 'Kortney Chinn', role: 'Learning Specialist', email: 'kchinn@davidsonday.org' },
      { name: 'Lauren Denny', role: 'Learning Specialist', email: 'ldenny@davidsonday.org' },
      { name: 'Daniel Fatjo', role: 'Learning Specialist', email: 'dfatjo@davidsonday.org' },
      { name: 'Chuck LaRusso', role: 'Director of Learning Services', email: 'clarusso@davidsonday.org' },
      { name: 'Anne McGraw', role: 'Learning Enrichment Center Coordinator' },
      { name: 'Rebecca Miller', role: 'Speech/Language Pathologist', email: 'rmiller@davidsonday.org' },
      { name: 'Kelly Sapp', role: 'Learning Specialist', email: 'ksapp@davidsonday.org' },
      { name: 'Susan Schock', role: 'Learning Specialist', email: 'sschock@davidsonday.org' },
      { name: 'Caryn Shelton', role: 'Lower School Literacy Coach', email: 'cshelton@davidsonday.org' },
      { name: 'Michael Sutton', role: 'Learning Specialist', email: 'msutton@davidsonday.org' },
      { name: 'Laura Wansley', role: 'Upper School Science Teacher & Learning Specialist', email: 'lwansley@davidsonday.org' },
      { name: 'Nicole Yudin', role: 'Learning Specialist' },
      { name: 'Lynne McClellan', role: 'Lower School Reading Specialist', email: 'lmcclellan@davidsonday.org' },
      { name: 'Laura Shea', role: 'Lower School Counselor', email: 'lshea@davidsonday.org' },
      { name: 'Jessica Thompson', role: 'Middle and Upper School Counselor', email: 'jthompson@davidsonday.org' },
      { name: 'Angela Spraberry', role: 'School Nurse', email: 'aspraberry@davidsonday.org' },
    ],
    note: {
      strong: 'Requests go to Dr. Chuck LaRusso, Director of Learning Services.',
      muted: 'The school’s 2026 summer letter signs him “Director of Curriculum.”',
    },
    sources: [LEC, DIRECTORY, LEADERSHIP],
  },

  ask: {
    headline:
      'Eleven questions to take on the tour, covering what the school’s site leaves unanswered: rates, prior plans, accommodations, methods, evaluation, therapy and staff.',
    questions: [
      'What are the 2026-27 rates for tutoring, academic coaching, social skills groups, speech and occupational therapy, and does financial aid cover any of them?',
      'How is a 504 plan, IEP or prior school’s accommodations plan handled when a student enrolls?',
      'Which classroom and testing accommodations do you provide, and do they apply to the ISEE and to school exams?',
      'Which reading method do the Literacy Coach, Reading Specialist and Learning Specialists use (e.g., Orton-Gillingham, Wilson, structured literacy)?',
      'Do you ever modify the curriculum, or is LEC support always tutoring alongside it?',
      'Is there any screening for reading, math or attention, and who carries out psychoeducational evaluations? Do you keep a list of evaluators?',
      'Is there a school psychologist, and what is the crisis protocol?',
      'Is physical therapy available on campus?',
      'Is any English-language (ESL) support offered?',
      'Do Speech Techniques and Integrative Wellness bill families through the Patriot Account or directly, and can therapy be billed to insurance?',
      'Is Dr. LaRusso the Director of Learning Services or the Director of Curriculum, and who oversees the LEC?',
    ],
    asOf: 'October 25, 2026',
  },
}
