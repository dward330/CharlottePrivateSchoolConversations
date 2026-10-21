// Hickory Grove Christian — Learning Support & Student Services.
//
// Every fact is from the school's own pages and the PDFs they link, fetched
// 2026-10-20. The full verbatim record, the fee schedule transcription and the
// corrections this forced on the design copy are in
// source-material/learning-support/hickory-grove-christian/
//   Hickory Grove Christian - Learning Support - Official Site Research.md
//
// The design called the program the Student Center for Advancement (SCA). The
// school has since renamed it Educational Support Services (ESS) and the SCA
// page 404s, so ESS is used throughout. Excluded by the area's data rules and
// therefore absent here: the ESA+ tab and the public-district evaluation route
// on the ESS page.
//
// `[[504|…]]`, `[[iep|…]]` and `[[idea|…]]` mark a term that carries a plain-
// language definition on hover (chrome: learning.glossary.*). Keep the markers
// intact in translation; only the visible text after the bar moves.

import type { Source } from '../../components/SourceRow.tsx'
import type { LearningSupportProgram } from '../learningSupport.ts'

const HUB: Source = {
  label: 'hgchristian.org — Student Services',
  url: 'https://www.hgchristian.org/academics/student-services',
}
const ESS: Source = {
  label: 'hgchristian.org — Educational Support Services',
  url: 'https://www.hgchristian.org/academics/student-services/ess',
}
const FEES: Source = {
  label: 'hgchristian.org — 2026-2027 Educational Support Services Fees (PDF)',
  url: 'https://www.hgchristian.org/fs/resource-manager/view/7dd54753-7033-45a4-8e4b-9f62e25bc311',
}
const WELLNESS: Source = {
  label: 'hgchristian.org — Wellness',
  url: 'https://www.hgchristian.org/academics/student-services/wellness',
}
const CRISIS: Source = {
  label: 'hgchristian.org — Mental Health & Crisis Resources',
  url: 'https://www.hgchristian.org/academics/mental-health-crisis-resources',
}
const COUNSELING: Source = {
  label: 'hgchristian.org — College and Career Planning',
  url: 'https://www.hgchristian.org/academics/high-school/college-and-career-planning',
}
const CHECKLIST_ES: Source = {
  label: 'hgchristian.org — Elementary admissions checklist (PDF)',
  url: 'https://www.hgchristian.org/fs/resource-manager/view/adf10069-819d-4420-83c4-ebba8281c071',
}
const CHECKLIST_MHS: Source = {
  label: 'hgchristian.org — Middle & High admissions checklist (PDF)',
  url: 'https://www.hgchristian.org/fs/resource-manager/view/c7376a64-1d57-4a98-a5fb-6cab591a4c65',
}
const INTL: Source = {
  label: 'hgchristian.org — International Student Enrollment Process',
  url: 'https://www.hgchristian.org/admissions/international-program/international-student-enrollment-process',
}

export const hickoryGroveChristian: LearningSupportProgram = {
  // Lions — navy and Vegas gold, as the handoff specifies for this section.
  colors: { brand: '#1b2a4a', gold: '#c5b358' },
  lead: {
    strong:
      'Educational Support Services (ESS) is the umbrella under which students receive individualized academic supports: academic coaching, tutoring, learning accommodations and specialized support for students with identified learning differences.',
    muted:
      'Every service is fee-based under an annual contract. The school says its specialization does not extend to emotional and behavioral interventions, and no speech, occupational or physical therapy is listed on its site.',
  },
  stats: [
    { value: 'K5–12', label: 'served by ESS', note: 'per the 2026–27 fee schedule' },
    { value: '9', label: 'named Student Services staff', note: 'including two ESS teachers and two academic coaches' },
    { value: '$300+', label: 'per year, beyond tuition', note: 'case management alone; instruction runs up to $4,455' },
  ],

  eligibility: {
    headline:
      'ESS serves students with identified learning differences, including any student who arrives with a 504, an IEP or a prior school’s accommodations plan. Emotional and behavioral intervention is outside its scope.',
    intro: {
      strong: 'ESS is open to students with documented needs.',
      muted: 'Eligibility is often the fact that decides it for a family, so it comes first.',
    },
    eligible:
      'Students with “identified learning differences.” Families are encouraged to share “any documents that describe their students’ learning needs or diagnoses” when they begin the admissions process. The school does not say what documentation it accepts or how recent it must be.',
    plan:
      '“All students who enroll with a [[504|Section 504 Plan]], an [[iep|Individual Education Plan (IEP)]], or an academic accommodations plan from a previous school may be enrolled under the umbrella of Educational Support Services.”',
    scope:
      '“Currently, our specialization does not extend to providing emotional and behavioral interventions, as our staff is best equipped to provide academic interventions.”',
    sources: [ESS, HUB],
  },

  services: {
    headline:
      'Every service the school’s pages describe, grouped and coded by who delivers it, with the published 2026–27 fee. Pick your child’s need to see what applies.',
    verdicts: {
      read: {
        head: 'Specialized teachers and paid 1:1 or small-group instruction. No reading method is named.',
        body: 'ESS teachers “have specialized training”; K5–8 pull-out or push-in instruction is billed by sessions per week. Ask which reading approach ESS teachers use.',
      },
      attn: {
        head: 'Executive-function coaching and accommodations are offered.',
        body: 'ESS names organizational skills, self-advocacy and “other executive functioning skills,” and high school Academic Coaching runs up to 3 hours a week. Behavioral intervention is outside its scope.',
      },
      math: {
        head: 'Specialized teachers and tutoring. No math-specific intervention is named.',
        body: 'Math falls under ESS’s general academic support and 1:1 or small-group instruction. The school does not describe a math program of its own.',
      },
      speech: {
        head: 'Not published. Plan on an outside provider.',
        body: 'The school’s site lists no speech-language therapy.',
      },
      motor: {
        head: 'Not published. Plan on an outside provider.',
        body: 'Neither occupational nor physical therapy appears on the school’s site.',
      },
      social: {
        head: 'Faith-based counsel and peer support, but no emotional or behavioral intervention.',
        body: 'The wellness team offers “biblical counsel through mentorship and discipleship, peer support groups,” while ESS says its staff “is best equipped to provide academic interventions.”',
      },
      gifted: {
        head: 'Gifted students are named on the Student Services page.',
        body: 'It describes support for “academically gifted students alongside students who require specialized academic support.” No program detail is published.',
      },
    },
    groups: [
      {
        name: 'Learning & academic support',
        rows: [
          {
            service: 'Specialized teachers',
            code: 'IH',
            detail: '“ESS teachers and academic coaches/tutors have specialized training.” Two ESS teachers and two teacher assistants are named.',
            needs: ['read', 'attn', 'math'],
          },
          {
            service: 'Reading intervention',
            code: 'NS',
            detail: 'No named method (e.g., Orton-Gillingham, structured literacy).',
            needs: ['read'],
          },
          {
            service: 'Math intervention',
            code: 'NS',
            detail: 'No math-specific intervention described.',
            needs: ['math'],
          },
          {
            service: '1:1 / small-group instruction (K5–8)',
            code: 'IH_FEE',
            detail: 'Pull-out or push-in, 1 to 5 sessions a week: $1,892 to $4,414 a year, including case management and testing.',
            needs: ['read', 'attn', 'math'],
          },
          {
            service: 'Academic Flex sessions (9–12)',
            code: 'IH_FEE',
            detail: '1–2 sessions, up to 60 minutes weekly: $1,806 a year, or $903 a semester.',
            needs: ['read', 'attn', 'math'],
          },
          {
            service: 'Executive-function coaching',
            code: 'IH_FEE',
            detail: 'ESS promotes “self-advocacy, organizational skills, personal responsibility, and other executive functioning skills.” High school Academic Coaching, up to 3 hours weekly: $2,227 a year, or $1,113 a semester.',
            needs: ['attn'],
          },
          {
            service: 'HS Instructional Support Class',
            code: 'IH_FEE',
            detail: '5 class periods weekly, scheduled per semester: $4,455 a year.',
            needs: ['read', 'attn', 'math'],
          },
          {
            service: 'Accommodations & case management',
            code: 'IH_FEE',
            detail: 'An HGCS Accommodations Plan built from educational testing or a prior 504/IEP, with an annual review with teachers and parents: $300 a year. Accommodations happen in the primary classroom.',
            needs: ['read', 'attn', 'math', 'speech', 'motor'],
          },
          {
            service: 'Specially designed instruction',
            code: 'IH_FEE',
            detail: '“Applied Interventions/Specially Designed Instruction,” added to a plan based on “professional diagnosis, teacher feedback, specialist observations”: $1,500 to $2,000 a year.',
            needs: ['read', 'attn', 'math'],
          },
          {
            service: 'Self-contained / separate program',
            code: 'NS',
            detail: 'No separate classroom or program described.',
            needs: [],
          },
          {
            service: 'Gifted / advanced',
            code: 'IH',
            detail: 'Named on the Student Services page; no program detail.',
            needs: ['gifted'],
          },
          {
            service: 'Eligibility documentation',
            code: 'REQUIRED',
            detail: 'Admissions checklists ask for “Educational/diagnostic testing results, current IEP/504” if applicable.',
            needs: ['read', 'attn', 'math', 'speech', 'motor', 'social'],
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
            service: 'Testing accommodations',
            code: 'IH_FEE',
            detail: 'Approved pull-out or push-in testing: $370 a year for 1 subject, $760 for 2, $1,200 for 3 or more.',
            needs: ['read', 'attn', 'math'],
          },
          {
            service: 'Entrance testing',
            code: 'IH',
            detail: 'Scheduled through the Student Services office once admissions has every required form.',
            needs: [],
          },
          {
            service: 'Psychoeducational evaluation',
            code: 'RF',
            detail: '“We assist families in connecting with educational testing providers, as needed.”',
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
            detail: 'The wellness team offers “biblical counsel through mentorship and discipleship, peer support groups.” The high school has a Director of Counseling.',
            needs: ['social'],
          },
          {
            service: 'Emotional & behavioral intervention',
            code: 'EXCLUDED',
            detail: 'Outside ESS’s specialization, per the school.',
            needs: ['social'],
          },
          {
            service: 'Crisis resources',
            code: 'RF',
            detail: 'A Mental Health & Crisis Resources page lists the 988 Suicide & Crisis Lifeline and the NC Peer Warmline.',
            needs: ['social'],
          },
          { service: 'School psychologist', code: 'NS', detail: 'None named.', needs: ['social'] },
          { service: 'School nurse', code: 'NS', detail: 'None named.', needs: [] },
        ],
      },
      {
        name: 'Language',
        rows: [
          {
            service: 'ESL / English-language support',
            code: 'NS',
            detail: 'International applicants submit TOEFL Jr. or SLEP scores; no English-language support is described.',
            needs: [],
          },
        ],
      },
    ],
    sources: [ESS, FEES, HUB, WELLNESS, CRISIS, COUNSELING, CHECKLIST_ES, CHECKLIST_MHS, INTL],
  },

  therapy: {
    headline: 'The school’s site lists no speech-language, occupational or physical therapy during the school day.',
    items: [
      { name: 'Speech-language', code: 'NS' },
      { name: 'Occupational', code: 'NS' },
      { name: 'Physical', code: 'NS' },
    ],
    note: 'The school’s Educational Support Services, Student Services and Wellness pages name no therapist on staff. Ask whether an outside therapist can see your child on campus.',
    sources: [ESS, HUB, WELLNESS],
  },

  testing: {
    headline: 'The school doesn’t run diagnostic testing in-house. It connects families with outside providers and asks for existing results at admission.',
    entries: [
      {
        code: 'RF',
        title: 'Referral to private testing',
        text: '“We assist families in connecting with educational testing providers, as needed.”',
        muted: 'The school does not name providers or say what age or type of testing it accepts.',
      },
      {
        code: 'REQUIRED',
        title: 'Results at admission',
        text: 'Both admissions checklists ask for “Educational/diagnostic testing results, current IEP/504” if applicable, and the final decision includes a “Review of IEP/504/Psychoeducational Evaluation.”',
      },
      {
        code: 'IH',
        title: 'Entrance testing',
        text: 'Testing for admission is scheduled through the Student Services office after the admissions office receives every required form.',
      },
    ],
    sources: [ESS, CHECKLIST_ES, CHECKLIST_MHS],
  },

  staff: {
    headline: 'Nine named Student Services staff, led by an Administrator for Student Services and a Director of Educational Support Services.',
    people: [
      { name: 'Dr. Mildred Similton', role: 'Administrator for Student Services' },
      { name: 'Rachel Vaughn', role: 'Director of Educational Support Services' },
      { name: 'Jacqui Williams', role: 'Student Services Administrative Assistant' },
      { name: 'Kim Williams', role: 'Educational Support Services Teacher' },
      { name: 'Lori Townsend', role: 'Educational Support Services Teacher' },
      { name: 'Beth Jeu De Vine', role: 'Educational Support Services Teacher Assistant' },
      { name: 'Carolyn Raney', role: 'Educational Support Services Teacher Assistant' },
      { name: 'Kim Staples', role: 'Academic Coaching & Tutorial Support' },
      { name: 'Belinda Jackson', role: 'Academic Coaching & Tutorial Support' },
    ],
    sources: [ESS],
  },

  ask: {
    headline: 'Six questions to take on the tour, covering what the school’s site leaves unanswered: methods, fees, documentation, therapy and health staff.',
    questions: [
      'Which reading and math methods do ESS teachers use (e.g., Orton-Gillingham, Wilson, structured literacy)?',
      'The 2026–27 fee schedule lists the HS Instructional Support Class at $4,455 a year and again at $2,227 “/year.” Is $2,227 the per-semester price?',
      'What documentation counts as an “identified learning difference,” and how recent must testing be?',
      'Can an outside speech or occupational therapist see my child on campus during the school day?',
      'Which interventions does the $1,500–$2,000 “Applied Interventions/Specially Designed Instruction” add-on cover, and who delivers them?',
      'Is there a school nurse or school psychologist on staff?',
    ],
    asOf: 'October 20, 2026',
  },
}
