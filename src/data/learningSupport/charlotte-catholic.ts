// Charlotte Catholic High School — Learning Support & Student Services.
//
// Every fact is from the school's own pages and the PDFs they link, fetched
// 2026-10-26. The full verbatim record, the fee-schedule transcription, the
// staff table with each published email and the corrections this forced on the
// deep-research dossier are in
// source-material/learning-support/charlotte-catholic/
//   Charlotte Catholic - Learning Support - Official Site Research.md
//
// The school runs two programs, kept distinct on every row: the Academic
// Achievement Program (formerly the Learning Support Program), for students
// with a psychologist's DSM diagnosis and recent testing, and the
// Options/Pathways Program, for students with developmental disabilities.
// Every row that describes Options says so, so no Options service reads as an
// Academic Achievement one.
// The separate-program row is coded IH_FEE on the MACS 2026-2027 Tuition & Fee
// Schedule, hosted on the school's own Finalsite store and linked from its
// Admissions page: "Options – CCHS" is a tuition rate in place of the standard
// 9th–12th rate, never a surcharge on top of it. Academic Achievement has no
// published fee.
// Only 2026-27 documents are used (the web and PDF Curriculum Guides, the
// Handbook2026-27-rev1.pdf and the live pages). The 2025-26 and 2024-25 wording
// (older course numbers, a looser diagnosis rule and named intervention
// products, all listed in the research file's corrections) and the dated
// February 2025 parent letter are deliberately unused.
// The school's pages never use the terms 504 or IEP, so no glossary marker
// appears here; that absence is itself the finding.
// Allie Kunert's address is the page's own mailto, afkunert@; a one-letter
// stray link beside it points to Stephanie Hall's address and is ignored.
// The former program director named in older pages is not named here: those
// pages are 404, the only live mention is the dated letter, and the 2026-27
// Handbook lists Dr. Alicia Reid for Academic Achievement, Options and Pathways.

import type { Source } from '../../components/SourceRow.tsx'
import type { LearningSupportProgram } from '../learningSupport.ts'

const AA: Source = {
  label: 'charlottecatholic.org — Academic Achievement',
  url: 'https://www.charlottecatholic.org/departments/academic-achievement',
}
const FORMS: Source = {
  label: 'charlottecatholic.org — Academic Achievement Forms',
  url: 'https://www.charlottecatholic.org/departments/academic-achievement/forms',
}
const ASSESS: Source = {
  label: 'charlottecatholic.org — Academic Achievement Assessments',
  url: 'https://www.charlottecatholic.org/departments/academic-achievement/assessments',
}
const AASTAFF: Source = {
  label: 'charlottecatholic.org — Meet the Academic Achievement Team',
  url: 'https://www.charlottecatholic.org/departments/academic-achievement/meet-the-staff',
}
const SPECIAL: Source = {
  label: 'charlottecatholic.org — Guide to Special Testing',
  url: 'https://www.charlottecatholic.org/departments/academic-achievement/guide-to-special-testing',
}
const TESTACC: Source = {
  label: 'charlottecatholic.org — Special Testing Accommodations',
  url: 'https://www.charlottecatholic.org/departments/academic-achievement/guide-to-special-testing/accommodations',
}
const CONSENT: Source = {
  label: 'charlottecatholic.org — Consent to End Support Services (PDF)',
  url: 'https://www.charlottecatholic.org/fs/resource-manager/view/3cc147fb-3120-422f-8d78-161870a70d25',
}
const OPTIONS: Source = {
  label: 'charlottecatholic.org — Options/Pathways Program',
  url: 'https://www.charlottecatholic.org/departments/options-pathways-program',
}
const OPTSTAFF: Source = {
  label: 'charlottecatholic.org — Meet the Options/Pathways Program Team',
  url: 'https://www.charlottecatholic.org/departments/options-pathways-program/meet-the-staff',
}
const PIG: Source = {
  label: 'charlottecatholic.org — Parent Information Guide: Academic Support',
  url: 'https://www.charlottecatholic.org/community/parents/parent-information-guide/academic-support',
}
const GUIDE: Source = {
  label: 'charlottecatholic.org — Curriculum Guide by Department',
  url: 'https://www.charlottecatholic.org/departments/counseling/curriculum-guide-by-department',
}
const GUIDEPDF: Source = {
  label: 'charlottecatholic.org — 2026-2027 Curriculum Guide (PDF)',
  url: 'https://resources.finalsite.net/images/v1771958102/charlottecatholicorg/ggbqwr7ecdypclivyab5/2026-2027CurriculumGuideedited.pdf',
}
const COURSESEL: Source = {
  label: 'charlottecatholic.org — Course Selection',
  url: 'https://www.charlottecatholic.org/departments/counseling/course-selection',
}
const HANDBOOK: Source = {
  label: 'charlottecatholic.org — Student Handbook 2026-27 (PDF)',
  url: 'https://resources.finalsite.net/images/v1792434010/charlottecatholicorg/dyhoar9lun1tsumzcefl/Handbook2026-27-rev1.pdf',
}
const COUNSEL: Source = {
  label: 'charlottecatholic.org — Meet our Counselors',
  url: 'https://www.charlottecatholic.org/departments/counseling/meet-our-counselors',
}
const CRISIS: Source = {
  label: 'charlottecatholic.org — Mental Health Crisis Resources',
  url: 'https://www.charlottecatholic.org/departments/counseling/mental-health-crisis-resources',
}
const HEALTH: Source = {
  label: 'charlottecatholic.org — Meet the Health Staff',
  url: 'https://www.charlottecatholic.org/community/health/meet-the-health-staff',
}
const ADMIN: Source = {
  label: 'charlottecatholic.org — Administration',
  url: 'https://www.charlottecatholic.org/about-us/administrators',
}
const TUITION: Source = {
  label: 'charlottecatholic.org — 2026-2027 Tuition & Fee Schedule (PDF)',
  url: 'https://resources.finalsite.net/images/v1783870190/charlottecatholicorg/noikdbslslpxnkvxqrcc/2026-2027TuitionandFeeScheduleUPDATED.pdf',
}

export const charlotteCatholic: LearningSupportProgram = {
  // Cougars — the app's CCHS blue (brands.ts, deepened from the site's #75b2dd) and the school's red.
  colors: { brand: '#3a759e', gold: '#d7102a' },
  lead: {
    strong:
      'Charlotte Catholic runs two programs: the Academic Achievement Program, formerly the Learning Support Program, for students with a psychologist’s DSM diagnosis, and the Options/Pathways Program, “tailored specifically for students with developmental disabilities.”',
    muted: 'Academic Achievement has no published fee. The Options Program has its own 2026-27 tuition rate.',
  },
  stats: [
    { value: '$24,077', label: 'Options Program tuition, 2026-27', note: 'Community rate; $18,345 for Participating Catholic families, in place of the standard $21,562 and $15,041' },
    { value: '5', label: 'Academic Achievement staff', note: 'three program teachers by grade, a test coordinator and a testing proctor' },
    { value: '6', label: 'school counselors', note: 'plus a Mental Health Intervention Counselor' },
    { value: '3', label: 'years: the oldest testing reviewed for eligibility', note: 'a Psychoeducational or Neurological Assessment' },
  ],

  eligibility: {
    headline:
      'The Academic Achievement Program serves students with a diagnosis and recent testing; the Options/Pathways Program serves students with developmental disabilities.',
    eligible:
      'Students are eligible for Academic Achievement “if they have completed Psychoeducational Assessment and have received a DSM diagnosis from a psychologist,” with testing dated “within the last 3 years.” The Options/Pathways Program is “tailored specifically for students with developmental disabilities.”',
    plan:
      'The school’s pages do not mention 504 plans or IEPs. Eligibility rests on a Psychoeducational or Neurological Assessment; with another type of assessment, “more documentation may be requested and required.” Approved accommodations are recorded in a “Student Accommodation Plan.”',
    scope:
      '“Students who are disabled in any way will be accepted if the school program and educational facilities are able to effectively meet the needs of the student.” The program’s last goal is “To provide parents with information regarding other educational opportunities should we be unable to meet the needs of a student.”',
    note: 'College Board and ACT accommodations are “an external process”: “Decisions on these accommodations ARE NOT made by Charlotte Catholic High School staff.”',
    sources: [AA, FORMS, PIG, OPTIONS, HANDBOOK, CONSENT, TESTACC],
  },

  services: {
    headline:
      'Every service the school’s pages describe, grouped and coded by who delivers it. Academic Achievement support is included in tuition; the Options Program has its own tuition rate. Pick your child’s need to see what applies.',
    verdicts: {
      read: {
        head: 'Accommodations and small-group support, but no named reading method.',
        body: 'Program teachers provide “individual, small group, and/or push-in support.” No reading-intervention method is named for Academic Achievement students; Options Program students take “Specialized English and Mathematics courses.”',
      },
      attn: {
        head: 'A one-semester Academic Skills course in executive function, then Guided Academic Support.',
        body: 'Academic Skills (508, 509) teaches “executive function strategies and self-advocacy.” Guided Academic Support (511) follows in grades 10–12 for Academic Achievement students “with a GPA 2.9 or below.”',
      },
      math: {
        head: 'No math intervention for Academic Achievement students; life-skills math in the Options Program.',
        body: 'Options Program students take Math Life 1 and 2 as part of a “Life Skills Curriculum.” Academic Achievement students get accommodations and support across subjects.',
      },
      speech: {
        head: 'No speech-language therapy is listed.',
        body: 'Speech therapy is not mentioned on the school’s pages. Ask whether an outside therapist can work with your child on campus.',
      },
      motor: {
        head: 'No occupational or physical therapy is listed.',
        body: 'The Academic Achievement page defines occupational and physical therapy in its glossary but does not say either is offered.',
      },
      social: {
        head: 'Six school counselors, a Mental Health Intervention Counselor and a crisis-resources page.',
        body: 'The Mental Health Interventionist “works with students referred by the School Counselors to assess and provide in-depth short-term counseling.” The crisis page lists the 988 Suicide & Crisis Lifeline and the North Carolina Peer Warmline.',
      },
      gifted: {
        head: 'No gifted program, but an honors pathway.',
        body: 'The St. Augustine Scholars Program is a “four-year honors pathway.” No gifted identification or services are described.',
      },
    },
    groups: [
      {
        name: 'Learning & academic support',
        rows: [
          {
            service: 'Specialized teachers',
            code: 'IH',
            detail: 'Three Academic Achievement Program teachers, one each for 9th grade, 10th grade, and 11th and 12th grade, plus a test coordinator and a testing proctor. The Options/Pathways Program has its own co-directors and staff.',
            needs: ['read', 'attn', 'math'],
          },
          {
            service: 'Reading intervention',
            code: 'NS',
            detail: 'No reading-intervention method is named for Academic Achievement students.',
            needs: ['read'],
          },
          {
            service: 'Math intervention',
            code: 'NS',
            detail: 'No math intervention is described for Academic Achievement students. Options Program students take life-skills math courses.',
            needs: ['math'],
          },
          {
            service: '1:1 / small-group instruction',
            code: 'IH',
            detail: 'Program teachers provide “individual, small group, and/or push-in support” for students who need the most help.',
            needs: ['read', 'attn', 'math'],
          },
          {
            service: 'Executive-function coaching',
            code: 'IH',
            detail: 'The Academic Skills course teaches “executive function strategies and self-advocacy alongside lessons that develop independent work habits and effective time management and organizational skills.”',
            needs: ['attn'],
          },
          {
            service: 'Learning-support class',
            code: 'IH',
            detail: 'Academic Skills (508 for grades 9–10, 509 for grades 11–12) is a one-semester elective, weighted A = 4. Guided Academic Support (511) follows in grades 10–12 and is not weighted into the GPA.',
            needs: ['read', 'attn', 'math'],
          },
          {
            service: 'Accommodations & learning plan',
            code: 'IH',
            detail: 'The program’s goals include “Identify, provide, and assess accommodations and interventions,” and approved accommodations are recorded in a “Student Accommodation Plan.”',
            needs: ['read', 'attn', 'math'],
          },
          {
            service: 'Specially designed instruction',
            code: 'IH',
            detail: 'Options Program only: a “Life Skills Curriculum” of “Specialized English and Mathematics courses,” alongside classes with peers.',
            needs: ['read', 'math', 'social'],
          },
          {
            service: 'Self-contained / separate program',
            code: 'IH_FEE',
            detail: 'Options Program only, for students with developmental disabilities. 2026-27 tuition is $24,077 at the Community rate and $18,345 at the Participating Catholic rate, in place of the standard $21,562 and $15,041. Graduates receive a Certificate of Achievement, and the Pathways Program extends support two years beyond high school.',
            needs: ['social'],
          },
          {
            service: 'Gifted / advanced',
            code: 'NS',
            detail: 'No gifted program is described. The St. Augustine Scholars Program is a “four-year honors pathway.”',
            needs: ['gifted'],
          },
          {
            service: 'Eligibility documentation',
            code: 'REQUIRED',
            detail: 'A Psychoeducational or Neurological Assessment dated within the last three years, and a DSM diagnosis from a psychologist, submitted with the program application.',
            needs: ['read', 'attn', 'math'],
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
            code: 'NS',
            detail: 'No screening process is described.',
            needs: ['read', 'attn', 'math'],
          },
          {
            service: 'Testing accommodations',
            code: 'IH',
            detail: 'SAT and ACT Special Testing is “directly administered through Academic Achievement.” The school is a national test center for the SAT but not the ACT.',
            needs: ['read', 'attn'],
          },
          {
            service: 'Entrance testing',
            code: 'IH',
            detail: 'Course placement for 9th graders uses High School Placement Test results, with middle school grades and records.',
            needs: [],
          },
          {
            service: 'Psychoeducational evaluation',
            code: 'RF',
            detail: 'Done outside the school. The school lists 12 evaluators for families but does not endorse them.',
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
            detail: 'Six school counselors, assigned by last name and kept for all four years, help with “personal, emotional, or social concerns.”',
            needs: ['social'],
          },
          {
            service: 'Emotional & behavioral intervention',
            code: 'IH',
            detail: 'A Mental Health Interventionist provides “in-depth short-term counseling” to students referred by their counselors.',
            needs: ['social'],
          },
          {
            service: 'Crisis resources',
            code: 'RF',
            detail: 'The school’s crisis page lists the 988 Suicide & Crisis Lifeline and the North Carolina Peer Warmline (855-733-7762).',
            needs: ['social'],
          },
          { service: 'School psychologist', code: 'NS', detail: 'None named.', needs: ['social'] },
          {
            service: 'School nurse',
            code: 'IH',
            detail: 'A lead nurse, who directs student health services for the MACS schools, and two health staff.',
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
            detail: 'Not described on the school’s pages.',
            needs: [],
          },
        ],
      },
    ],
    sources: [AA, AASTAFF, PIG, HANDBOOK, GUIDE, GUIDEPDF, OPTIONS, TUITION, SPECIAL, COURSESEL, ASSESS, COUNSEL, CRISIS, HEALTH, CONSENT],
  },

  therapy: {
    headline:
      'The school’s pages list no speech-language, occupational or physical therapy. Occupational and physical therapy appear only as terms in the Academic Achievement glossary.',
    items: [
      { name: 'Speech-language', code: 'NS' },
      { name: 'Occupational', code: 'NS' },
      { name: 'Physical', code: 'NS' },
    ],
    note: 'When necessary, school counselors “refer students to other professionals for assistance in meeting their personal and academic needs.”',
    sources: [AA, HANDBOOK],
  },

  testing: {
    headline:
      'A family applies with recent outside testing, and the Academic Achievement team reviews it for eligibility. The school publishes no screening process of its own.',
    entries: [
      {
        code: 'IH',
        title: 'Application and eligibility review',
        text: 'Families start with the Academic Achievement Program Application. A Psychoeducational or Neurological Assessment “will be reviewed for eligibility” if it is dated within the last three years.',
        muted: 'Who makes the final decision is not stated. The Academic Skills course lists its prerequisite as “Recommendation from an Academic Achievement teacher and grade evaluation.”',
      },
      {
        code: 'RF',
        title: 'Psychoeducational evaluation',
        text: 'Done by outside providers. The Assessments page lists 12 psychoeducational evaluators, and the school states: “WE DO NOT ENDORSE, RECOMMEND, OR GUARANTEE” them.',
        muted: 'The Handbook refers families to a parent support policy for testing and evaluations; that policy is not published.',
      },
      {
        code: 'IH',
        title: 'Student Accommodation Plan',
        text: 'Approved accommodations are recorded in a “Student Accommodation Plan.” Ending support needs a signed consent form, and “reinstatement of special needs support services is not automatic.”',
      },
      {
        code: 'IH',
        title: 'SAT and ACT Special Testing',
        text: 'For students whose College Board or ACT accommodations require Special Testing, the test “will be directly administered through Academic Achievement.” A school coordinator submits SAT requests, and ACT needs the school’s consent form on file.',
        muted: 'Accommodation decisions “ARE NOT made by Charlotte Catholic High School staff.” Special Testing dates for this year are listed as TBA.',
      },
      {
        code: 'NS',
        title: 'Screening',
        text: 'No screening process is described. One program goal is “To assist the school community in identifying students needing additional educational support.”',
      },
    ],
    sources: [FORMS, AA, GUIDE, ASSESS, HANDBOOK, CONSENT, SPECIAL, TESTACC],
  },

  staff: {
    headline:
      'Twenty-one named staff: the Academic Achievement team, the Options/Pathways team, the assistant principal over both, six school counselors, the Mental Health Intervention Counselor and three health staff.',
    people: [
      { name: 'Dr. Alicia Reid', role: 'Assistant Principal; Academic Achievement, Options & Pathways', email: 'ahreid@charlottecatholic.org' },
      { name: 'Carolina Figueiras', role: 'Academic Achievement, 11th and 12th Grade', email: 'cafigueiras@charlottecatholic.org' },
      { name: 'Stephanie Hall', role: 'Academic Achievement Program Teacher, 9th Grade', email: 'slhall@charlottecatholic.org' },
      { name: 'Allie Kunert', role: 'Academic Achievement Program Teacher, 10th Grade', email: 'afkunert@charlottecatholic.org' },
      { name: 'Kelsey Black', role: 'Academic Achievement Test Coordinator', email: 'kemarchioni@charlottecatholic.org' },
      { name: 'Anne Kalbaugh', role: 'Testing Proctor, Academic Achievement', email: 'aekalbaugh@charlottecatholic.org' },
      { name: 'Shelley Floriani', role: 'Co-Director/Options Teacher', email: 'lbfloriani@charlottecatholic.org' },
      { name: 'Katherine Reynolds', role: 'Co-Director/Options Teacher', email: 'kjreynolds@charlottecatholic.org' },
      { name: 'Deborah Buchan', role: 'Options Teacher Assistant', email: 'dsbuchan@charlottecatholic.org' },
      { name: 'Megan Patterson', role: 'Options/Pathways Instructional Job Coach', email: 'mapatterson@charlottecatholic.org' },
      { name: 'AnnMarie Monroe', role: 'Options/Pathways Program', email: 'ammonroe@charlottecatholic.org' },
      { name: 'Sarah Sovchen', role: 'Director of Counseling', email: 'sesovchen@charlottecatholic.org' },
      { name: 'Heather Nobary', role: 'School Counselor', email: 'hrnobary@charlottecatholic.org' },
      { name: 'Christine Parks', role: 'School Counselor', email: 'clparks@charlottecatholic.org' },
      { name: 'Kara Fisher', role: 'School Counselor', email: 'krfisher@charlottecatholic.org' },
      { name: 'Kate McHugh', role: 'School Counselor', email: 'kmchugh@charlottecatholic.org' },
      { name: 'Melody Clementi', role: 'School Counselor', email: 'MEClementi@charlottecatholic.org' },
      { name: 'William Keese', role: 'Mental Health Intervention Counselor', email: 'wskeese@charlottecatholic.org' },
      { name: 'Sarah Smith', role: 'Director of Student Health Services (MACS) and Lead Nurse', email: 'scsmith@charlottecatholic.org' },
      { name: 'Lorraine Maslanka', role: 'Health Staff', email: 'LHMaslanka@charlottecatholic.org' },
      { name: 'Marin O’Brien', role: 'Health Staff', email: 'MAOBrien@charlottecatholic.org' },
    ],
    note: {
      strong: 'To begin, contact an Academic Achievement Specialist or complete the program application.',
      muted: 'Counselors are assigned by last name (A–De, Di–Ho, Hu–Mi, Mo–She, Shi–Z) and stay the same for all four years; the Director of Counseling counsels students new to the school in grades 10–12.',
    },
    sources: [AASTAFF, OPTSTAFF, ADMIN, HANDBOOK, COUNSEL, HEALTH],
  },

  ask: {
    headline:
      'Thirteen questions to take on the tour, covering what the school’s site leaves unanswered: fees, prior plans, who decides, therapy, intervention methods and testing dates.',
    questions: [
      'Is there a fee for the Academic Achievement Program, or is it included in tuition?',
      'Options Program tuition does not include the $1,995 family capital fee or enrollment fees. Are there other Options costs?',
      'How do you treat a 504 plan or IEP from a previous school? Is new testing always needed?',
      'Is there a deadline for the Academic Achievement application, and should we apply before or after admission?',
      'Who decides whether a student is eligible, and what support they receive?',
      'Is any structured reading or math intervention available to Academic Achievement students?',
      'Can speech-language, occupational or physical therapy take place on campus during the school day?',
      'Is there a school psychologist?',
      'Is there a screening process for a student who is struggling but has no diagnosis?',
      'What is the parent support policy for testing and evaluations that the Handbook mentions?',
      'When are this year’s SAT and ACT Special Testing dates? Both are listed as TBA.',
      'Is any English-language (ESL) support offered?',
      'Beyond Honors, AP and the St. Augustine Scholars Program, is there support for gifted learners?',
    ],
    asOf: 'October 26, 2026',
  },
}
