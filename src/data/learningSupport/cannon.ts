// Cannon School — Learning Support & Student Services.
//
// Every fact is from the school's own pages and the PDFs they link, fetched
// 2026-10-24. The full verbatim record, the transcription of the 2025 Learning
// Support Program Policy and Enrollment Form and the corrections this forced on
// the deep-research dossier are in
// source-material/learning-support/cannon/
//   Cannon School - Learning Support - Official Site Research.md
//
// Cannon publishes no learning-support fee anywhere, so no row carries IH_FEE
// and no fee figure is rendered. The school's pages never use the terms 504 or
// IEP, so no glossary marker appears here; that absence is itself the finding.
// Curriculum modification is coded NS, not EXCLUDED: the policy hedges ("does
// not imply that the school will assume the responsibility…") rather than
// refusing, and the scope cell quotes it in full.

import type { Source } from '../../components/SourceRow.tsx'
import type { LearningSupportProgram } from '../learningSupport.ts'

const LSP: Source = {
  label: 'cannonschool.org — Learning Support Program',
  url: 'https://www.cannonschool.org/academics/learning-support-program',
}
const POLICY: Source = {
  label: 'cannonschool.org — Learning Support Program Policy and Enrollment Form (PDF)',
  url: 'https://www.cannonschool.org/fs/resource-manager/view/7218833c-b7e7-48e5-b312-98b4016ccbae',
}
const ARC: Source = {
  label: 'cannonschool.org — Academic Resource Center',
  url: 'https://www.cannonschool.org/academics/upper-school/academic-resource-center',
}
const ACADEMICS: Source = {
  label: 'cannonschool.org — Academics',
  url: 'https://www.cannonschool.org/academics',
}
const COUNSELING: Source = {
  label: 'cannonschool.org — School Counseling',
  url: 'https://www.cannonschool.org/cannon-life/school-counseling',
}
const CRISIS: Source = {
  label: 'cannonschool.org — Mental Health and Crisis Resources',
  url: 'https://www.cannonschool.org/crisis-resources',
}
const APPLY: Source = {
  label: 'cannonschool.org — Apply to Cannon',
  url: 'https://www.cannonschool.org/admission/application-procedures',
}
const MS_HANDBOOK: Source = {
  label: 'cannonschool.org — Middle School Student-Parent Handbook 2025-2026 (PDF)',
  url: 'https://resources.finalsite.net/images/v1754505716/cannonschoolorg/hy4jngrrp0al9xilkfgh/Middle_School_Student-Parent_Handbook_2025-2026.pdf',
}
const DIRECTORY: Source = {
  label: 'cannonschool.org — Faculty & Staff Directory',
  url: 'https://www.cannonschool.org/about/faculty-staff-directory',
}
const DOVI: Source = {
  label: 'cannonschool.org — The Dovi Academic Resource Center',
  url: 'https://www.cannonschool.org/news-and-stories/in-the-news-details/~board/cannon-news-cougar-news-internal-sources/post/strengthening-confidence-through-support-the-doviacademic-resource-center',
}
const HUDSON: Source = {
  label: 'cannonschool.org — Hudson Academic Resource Center opening',
  url: 'https://www.cannonschool.org/cannon-school-news/details/~board/cannon-news-cougar-news-internal-sources/post/hudson-family-academic-resource-center-celebrates-new-chapter-in-upper-school',
}
const INTL: Source = {
  label: 'cannonschool.org — International Student Program',
  url: 'https://www.cannonschool.org/international-student-program',
}
const CATALOG: Source = {
  label: 'cannonschool.org — Upper School Course Catalog 2026-2027 (PDF)',
  url: 'https://resources.finalsite.net/images/v1769529893/cannonschoolorg/ihl0lzuqgs9loqntga7z/CannonAcademicCourseCatalog2026-2027.pdf',
}

export const cannon: LearningSupportProgram = {
  // Cougars — maroon and gold, from cannonschool.org's theme CSS.
  colors: { brand: '#87212e', gold: '#e39e25' },
  lead: {
    strong:
      'Cannon’s Learning Support Program “helps students with diagnosed learning differences become successful learners and confident self-advocates,” with a learning specialist in each division from Junior Kindergarten through 12th grade.',
    muted: 'The school publishes no fee for learning support.',
  },
  stats: [
    { value: 'JK–12', label: 'served by the program', note: 'Junior Kindergarten through 12th grade, across the Lower, Middle and Upper Schools' },
    { value: '4', label: 'learning specialists and deans', note: 'one in the Lower School, one in the Middle School, two in the Upper School' },
    { value: '~240', label: 'Upper School students used the ARC', note: '“last year,” per the school’s story on the Hudson ARC’s Aug. 31 opening' },
    { value: '5', label: 'school counselors', note: 'Junior Kindergarten through 12th grade, on the Student Support Team' },
  ],

  eligibility: {
    headline:
      'Learning support is for enrolled Cannon students with a diagnosed learning difference, documented by a recent psychoeducational evaluation.',
    eligible:
      'The policy requires that the student “must be a current student enrolled at Cannon School,” that parents “complete a request for Learning Support Services,” a “history of academic difficulty,” and a learning difference “diagnosed and documented by a certified professional in a recent (last 3 years) formal psycho-educational evaluation” done “by a licensed clinical psychologist.”',
    plan:
      'The school’s pages do not mention 504 plans or IEPs. Accommodations need documentation: “No accommodation will be provided unless a disclosure with appropriate documentation has been made to the school,” and “No official Learning Plan will be constructed without a complete psychological-educational evaluation.” The request form asks what accommodations the student has had in the past.',
    scope:
      '“Acceptance of a student into Cannon School does not imply that the school will assume the responsibility for all of the special learning needs of the child, especially when such needs may require a modification/alteration of the school’s curriculum or when the child’s needs are beyond Cannon’s present resources.”',
    note: 'For a hearing, speech/language or vision impairment without a full evaluation, accommodations “will be considered on a case-by-case basis.”',
    sources: [LSP, POLICY, MS_HANDBOOK, APPLY],
  },

  services: {
    headline:
      'Every service the school’s pages describe, grouped and coded by who delivers it. Cannon publishes no fee for any of them. Pick your child’s need to see what applies.',
    verdicts: {
      read: {
        head: 'A Lower School reading interventionist and specialist-built learning plans. No reading method is named.',
        body: 'The Reading Interventionist “may provide small-group instruction designed to close specific skill gaps.” Ask which reading approach is used, and what reading support looks like after 4th grade.',
      },
      attn: {
        head: 'One-on-one executive-function coaching in the Middle and Upper Schools.',
        body: 'Upper School Academic Coaches work “in a relational 1:1 environment” on “planning, organization, task initiation, flexibility, attention, self-control, metacognition, and more.”',
      },
      math: {
        head: 'Peer-led Math Lab in the Upper School. No math-specific intervention is named.',
        body: 'In the Math Lab, “Tutors and teachers partner with learners to break down challenging concepts.” The school does not describe math intervention below the Upper School.',
      },
      speech: {
        head: 'By referral. Plan on an outside provider.',
        body: 'The Lower School Learning Specialist gives “guidance for families to secure external resources, such as speech therapists or tutors.”',
      },
      motor: {
        head: 'Not published. Plan on an outside provider.',
        body: 'Neither occupational nor physical therapy appears on the school’s site.',
      },
      social: {
        head: 'Five counselors offer short-term counseling and refer out for longer-term therapy.',
        body: 'Lower School counselors provide “short-term individual counseling sessions” and “community resource referrals (including longer-term therapy services).”',
      },
      gifted: {
        head: 'Reading enrichment in the Lower School and an advanced course track in the Upper School.',
        body: 'The Reading Interventionist “may offer targeted academic enrichment”; the Upper School offers Honors Accelerated, AP and AT courses and an Independent Study Program. No formal gifted program is described.',
      },
    },
    groups: [
      {
        name: 'Learning & academic support',
        rows: [
          {
            service: 'Specialized teachers',
            code: 'IH',
            detail: '“A dedicated learning specialist for each of division, Lower School, Middle School, and Upper School.” Four are named, plus a Lower School Reading Interventionist.',
            needs: ['read', 'attn', 'math'],
          },
          {
            service: 'Reading intervention',
            code: 'IH',
            detail: 'Lower School small groups with the Reading Interventionist “designed to close specific skill gaps.” No method (e.g., Orton-Gillingham, structured literacy) is named.',
            needs: ['read'],
          },
          {
            service: 'Math intervention',
            code: 'NS',
            detail: 'No math-specific intervention described; the Upper School Math Lab is peer tutoring.',
            needs: ['math'],
          },
          {
            service: '1:1 / small-group instruction',
            code: 'IH',
            detail: 'Small-group reading in the Lower School; one-on-one coaching with the Middle and Upper School learning specialists.',
            needs: ['read', 'attn', 'math'],
          },
          {
            service: 'Academic Labs (9–12)',
            code: 'IH',
            detail: '“Faculty-facilitated, peer-led tutoring in writing, math, and science,” plus a World Languages Lab, “available at consistent times and locations during the school day.” In the Middle School, help from teachers: “No fee is charged.”',
            needs: ['read', 'math'],
          },
          {
            service: 'Executive-function coaching',
            code: 'IH',
            detail: 'One-on-one academic coaching in the Middle School and, in the Upper School, Academic Coaches who build “executive functioning (EF) skills.”',
            needs: ['attn'],
          },
          {
            service: 'Learning-support class',
            code: 'NS',
            detail: 'No learning-support course appears in the 2026-2027 Upper School Course Catalog.',
            needs: ['read', 'attn', 'math'],
          },
          {
            service: 'Accommodations & learning plan',
            code: 'IH',
            detail: 'The Learning Specialist writes a Learning Plan listing classroom and testing accommodations, such as “preferential seating, note-taking assistance, extended time for tests, alternate assessment location.”',
            needs: ['read', 'attn', 'math', 'speech', 'motor'],
          },
          {
            service: 'Specially designed instruction',
            code: 'NS',
            detail: 'Not described. The policy says acceptance does not imply responsibility for needs that “may require a modification/alteration of the school’s curriculum.”',
            needs: ['read', 'attn', 'math'],
          },
          {
            service: 'Self-contained / separate program',
            code: 'NS',
            detail: 'No separate program described; the Middle School ARC brings “neurodiverse and non-neurodiverse learners” together “side by side.”',
            needs: [],
          },
          {
            service: 'Gifted / advanced',
            code: 'IH',
            detail: 'Lower School reading enrichment; Upper School Honors Accelerated, AP and AT courses and an Independent Study Program. No formal gifted program.',
            needs: ['gifted'],
          },
          {
            service: 'Eligibility documentation',
            code: 'REQUIRED',
            detail: 'A complete psychoeducational evaluation from the last 3 years, with “test results with subtest scores (standard or scaled scores)” and recommended accommodations.',
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
            detail: 'The Lower School Learning Specialist helps families “secure external resources, such as speech therapists.”',
            needs: ['speech'],
          },
          { service: 'Occupational therapy', code: 'NS', detail: 'Not listed by the school.', needs: ['motor'] },
          { service: 'Physical therapy', code: 'NS', detail: 'Not listed by the school.', needs: ['motor'] },
        ],
      },
      {
        name: 'Assessment',
        rows: [
          {
            service: 'Early identification (JK–2)',
            code: 'IH',
            detail: 'Learning support in JK–2 “focuses on early identification and classroom-based interventions”; the Learning Specialist works with teachers “to assess student needs.”',
            needs: ['read', 'attn', 'math', 'speech'],
          },
          {
            service: 'Testing accommodations',
            code: 'IH',
            detail: 'Testing accommodations are part of each Learning Plan. Once a plan has been in place “for at least four months,” the Learning Specialist may help families request College Board and ACT accommodations.',
            needs: ['read', 'attn', 'math'],
          },
          {
            service: 'Entrance testing',
            code: 'IH',
            detail: 'The admissions checklist “may include” an Entrance Evaluation and a Readiness Evaluation.',
            needs: [],
          },
          {
            service: 'Psychoeducational evaluation',
            code: 'REQUIRED',
            detail: 'Families supply it, from “a licensed clinical psychologist.” The school does not say it tests in-house or name providers.',
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
            detail: 'Five school counselors offer wellness lessons, check-ins, “short-term individual counseling sessions” and small groups, working “in collaboration with Learning Specialists.”',
            needs: ['social'],
          },
          {
            service: 'Emotional & behavioral intervention',
            code: 'RF',
            detail: 'Longer-term help is by referral: counselors provide “community resource referrals (including longer-term therapy services).”',
            needs: ['social'],
          },
          {
            service: 'Crisis resources',
            code: 'RF',
            detail: 'A Mental Health and Crisis Resources page lists the Suicide and Crisis Lifeline (“call 988 or text HOME to 741741”) and the NC Peer Warmline; Middle School counselors provide “support to students in crisis.”',
            needs: ['social'],
          },
          { service: 'School psychologist', code: 'NS', detail: 'None named.', needs: ['social'] },
          {
            service: 'School nurse',
            code: 'IH',
            detail: 'A Lead School Nurse and a School Nurse are listed in the staff directory.',
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
            detail: 'International students enroll through an approved placement agency; no English-language support is described.',
            needs: [],
          },
        ],
      },
    ],
    sources: [LSP, POLICY, ARC, ACADEMICS, MS_HANDBOOK, COUNSELING, CRISIS, APPLY, DIRECTORY, DOVI, HUDSON, INTL, CATALOG],
  },

  therapy: {
    headline: 'Speech therapy is by referral. The school’s site lists no occupational or physical therapy.',
    items: [
      { name: 'Speech-language', code: 'RF', detail: 'The Learning Specialist helps families find an outside speech therapist.' },
      { name: 'Occupational', code: 'NS' },
      { name: 'Physical', code: 'NS' },
    ],
    note: 'No therapist appears in the school’s staff directory. Ask whether an outside therapist can see your child on campus during the school day.',
    sources: [LSP, COUNSELING, DIRECTORY],
  },

  testing: {
    headline: 'Cannon doesn’t run diagnostic testing itself. Families bring a recent psychologist’s evaluation, and the school identifies early needs in the classroom.',
    entries: [
      {
        code: 'REQUIRED',
        title: 'A recent psychoeducational evaluation',
        text: 'The evaluation must be from “a recent (last 3 years)” period and done “by a licensed clinical psychologist,” with “comprehensive cognitive and academic assessment.”',
        muted: 'The school does not test in-house or name providers.',
      },
      {
        code: 'IH',
        title: 'Classroom identification, JK–2',
        text: 'The Learning Specialist “collaborates closely with teachers to assess student needs, differentiate instruction, and implement targeted strategies within the classroom.”',
      },
      {
        code: 'IH',
        title: 'College Board and ACT accommodations',
        text: 'For juniors and seniors, “additional guidance is offered to help navigate the process of requesting testing accommodations from the College Board and ACT,” once a Learning Plan has been in place for at least four months.',
      },
    ],
    sources: [POLICY, LSP],
  },

  staff: {
    headline: 'Twelve named staff: four learning specialists and deans, a reading interventionist, two ARC faculty and five school counselors.',
    people: [
      { name: 'Rhiannon Bresalier', role: 'Lower School Learning Specialist', email: 'rbresalier@cannonschool.org' },
      { name: 'Sabrina Amann', role: 'Lower School Reading Interventionist' },
      { name: 'Tracy Wade', role: 'Middle School Dean of Academic Support', email: 'twade@cannonschool.org' },
      { name: 'Michelle Donah', role: 'Upper School Learning Specialist', email: 'mdonah@cannonschool.org' },
      { name: 'Jennifer Ridenhour', role: 'Upper School Dean of Academic Support' },
      { name: 'Sarah Miller', role: 'Upper School Faculty, Academic Resource Center', email: 'smiller@cannonschool.org' },
      { name: 'Sophie Vreeburg', role: 'Upper School Faculty, Academic Resource Center' },
      { name: 'Emily Lewis', role: 'Lower School Counselor, Grades JrK - 2' },
      { name: 'Thomas Underwood', role: 'Lower & Middle School Counselor, Grades 3 - 5', email: 'tunderwood@cannonschool.org' },
      { name: 'Kimberly Stiffel', role: 'Middle School Counselor, Grades 6 - 8', email: 'kstiffel@cannonschool.org' },
      { name: 'Anna Allred-McGee', role: 'Upper School Counselor', email: 'aallredmcgee@cannonschool.org' },
      { name: 'Whitney Rice', role: 'Upper School Counselor' },
    ],
    note: {
      strong: 'No single head of learning support is named.',
      muted: 'Tracy Wade leads the Middle School’s Dovi Academic Resource Center; Jennifer Ridenhour leads the Upper School’s.',
    },
    sources: [LSP, ARC, COUNSELING, DIRECTORY, DOVI],
  },

  ask: {
    headline: 'Eight questions to take on the tour, covering what the school’s site leaves unanswered: fees, prior plans, methods, therapy, staff and timing.',
    questions: [
      'Is there a fee for Learning Support, Upper School academic coaching or Middle School coaching, and does financial aid cover it?',
      'How is a 504 plan, IEP or prior school’s accommodations plan treated before the Learning Plan is written?',
      'Which reading method does the Lower School Reading Interventionist use (e.g., Orton-Gillingham, Wilson, structured literacy), and how large are the groups?',
      'Is there math intervention below the Upper School?',
      'Can an outside speech, occupational or physical therapist see my child on campus during the school day?',
      'Is there a school psychologist, and do you keep a list of evaluators?',
      'The policy covers current students only. Can a family share an evaluation, or plan for support, before enrollment?',
      'Is any English-language (ESL) support offered?',
    ],
    asOf: 'October 24, 2026',
  },
}
