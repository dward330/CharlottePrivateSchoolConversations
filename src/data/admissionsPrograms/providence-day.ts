// Providence Day School — Admissions.
//
// Transcribed from the committed research file
// source-material/admissions/providence-day/Providence Day - Admissions -
// Grade-by-Grade Application Plans.md, which carries the provenance header, the
// source URLs and the record-level detail behind every figure below.
//
// CYCLE: 2026–27 only. The research file carries BOTH the 2025–26 mirror page's
// dates and the live 2026–27 calendar's, each labeled. Only the current cycle
// ships here. Where 2026–27 publishes no date — the Grades 1–5 and 6–12
// decision release — the tile carries the known constant (`4:00 p.m.`) and its
// caption names the live calendar in prose. A prior cycle's date is never
// carried forward, and a date is never guessed.
//
// The school's own "NOT PUBLISHED" markers are load-bearing and are rendered as
// "confirm with admissions" rather than dropped or asserted: the application-fee
// amount, the Grades 1–5 material list / recommendation form / assessment
// instrument, the Grades 6–12 recommendation forms, the exact domestic testing
// requirement (ISEE vs SSAT, which level), and the TK/K age cutoff.

import type { AdmissionsProgram } from '../admissionsPrograms.ts'

export const providenceDay: AdmissionsProgram = {
  guide: {
    headline:
      "Pick your child's entry point and the guide personalizes: the steps in order, the 2026–27 deadlines, and the testing for that band — plus a printable checklist to take with you. The financial-aid clock runs in parallel.",
    cycle: '2026–27 entry cycle',

    stats: [
      { value: '3', label: 'grade bands, each with its own process' },
      {
        value: 'Jan 2, 2027',
        label: 'TK/K application deadline — earlier than everyone else',
      },
      { value: 'Jan 15, 2027', label: 'Grades 1–12 application deadline' },
      { value: '$2,500', label: 'enrollment deposit, credited toward tuition' },
    ],

    rules: [
      {
        title: 'One portal.',
        text: 'Everything runs through Charger Commons: the inquiry triggers your account invitation, and the portal generates a personalized checklist that tracks every step.',
      },
      {
        title: 'Dates are cycle-specific.',
        text: 'Every date below is the 2026–27 entry cycle from the live admissions calendar. Cycle dates shift year to year — verify before acting.',
      },
      {
        title: 'Not published ≠ deficient.',
        text: "The application-fee amount and some band checklists aren't on the website. Those gaps are flagged below — confirm them with the admissions office.",
      },
    ],

    spineNote:
      'Same spine in every band — inquire → apply → materials → decision → contract. What changes is the testing and the calendar. Selection weighs "academic performance, school records, teacher recommendations, extracurricular activities, and social-emotional maturity."',

    bands: [
      {
        key: 'tkk',
        label: 'TK / Kindergarten',
        sublabel: 'Readiness model · earlier calendar',
        title: 'Transitional Kindergarten & Kindergarten',
        deadlines: [
          { value: 'Jan 2, 2027', label: 'application form due' },
          { value: 'Feb 1, 2027', label: 'all materials & assessments due' },
          { value: 'Feb 26, 2027', label: 'decisions release, 4:00 p.m.' },
          { value: 'Mar 5, 2027', label: 'contracts due at noon' },
        ],
        steps: [
          {
            title: 'Inquire & tour',
            tag: 'Fall 2026',
            tagKind: 'outline',
            detail:
              'The Inquiry form books your campus tour and triggers the invitation to create your Charger Commons account.',
          },
          {
            title: 'Submit the TK/K application + fee',
            tag: 'by Jan 2',
            tagKind: 'accent',
            detail:
              "Apply early — the Readiness Screening can't be scheduled until the application is in, and the earliest applicants get the earliest slots. Fee amount isn't published; confirm with admissions.",
          },
          {
            title: 'Preschool Teacher Recommendation Form',
            tag: 'by Feb 1',
            tagKind: 'outline',
            detail: "Sent to your child's current teacher through the portal checklist.",
          },
          {
            title: 'WPPSI-IV assessment',
            tag: 'by Feb 1',
            tagKind: 'outline',
            detail:
              'The Wechsler preschool scale. Your child "must be at least 4 years old at the time of assessment administration."',
          },
          {
            title: 'School Readiness Screening',
            tag: 'by Feb 1',
            tagKind: 'outline',
            detail:
              '"Application MUST be submitted prior to scheduling the Readiness Screening" — the sequencing quirk that makes step 2 urgent.',
          },
          {
            title: 'TK/K Classroom Visit',
            tag: 'by Feb 1',
            tagKind: 'outline',
            detail:
              'A required visit — the school observes readiness in a real classroom setting.',
          },
          {
            title: 'Decision → contract + deposit',
            tag: 'Feb 26 → Mar 5',
            tagKind: 'accent',
            detail:
              'Decisions release 4:00 p.m. Feb 26; the signed contract and $2,500 deposit (credited toward tuition) are due at noon Mar 5. Later applications go to rolling review for remaining seats.',
          },
        ],
        watchOuts: [
          {
            kicker: 'Why TK/K is different',
            text: 'The youngest band runs on an **earlier calendar** than everyone else and uses a **readiness model** — WPPSI-IV, Readiness Screening, and Classroom Visit — instead of standardized testing. Three assessment pieces means three appointments to schedule: another reason the early application matters.',
          },
          {
            kicker: 'Age eligibility',
            text: 'The school publishes one rule: applicants must be **at least 4 at the time of assessment**. A specific "turn 4/5 by September 1" cutoff isn\'t published — confirm your child\'s eligibility with admissions before applying.',
          },
        ],
        checklistCallout: {
          lead: 'Apply early.',
          text: 'The Readiness Screening cannot be scheduled until the application is submitted — the earliest applicants get the earliest assessment slots, and review turns rolling after the first round.',
        },
        checklistRows: [
          {
            action: 'Submit the Inquiry form and book a campus tour',
            detail: 'The inquiry is what triggers your Charger Commons account invitation.',
            due: 'Fall 2026',
          },
          {
            action: 'Create your Charger Commons account',
            detail: 'The portal generates the personalized checklist that tracks every step below.',
            due: 'Fall 2026',
          },
          {
            action: 'Submit the TK/K application and pay the fee',
            detail: "Fee amount isn't published — confirm with admissions.",
            due: 'Jan 2, 2027',
          },
          {
            action: 'Send the Preschool Teacher Recommendation Form',
            detail: "Sent to your child's current teacher through the portal checklist.",
            due: 'Feb 1, 2027',
          },
          {
            action: 'Complete the WPPSI-IV assessment',
            detail: 'Your child must be at least 4 years old at the time of assessment.',
            due: 'Feb 1, 2027',
          },
          {
            action: 'Complete the School Readiness Screening',
            detail: 'Cannot be scheduled until the application is submitted.',
            due: 'Feb 1, 2027',
          },
          {
            action: 'Attend the TK/K Classroom Visit',
            detail: 'A required visit — readiness is observed in a real classroom.',
            due: 'Feb 1, 2027',
          },
          {
            action: 'Watch for the decision',
            detail: 'Decisions release at 4:00 p.m.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Return the signed contract with the $2,500 deposit',
            detail: 'Due at noon; the deposit is credited toward tuition.',
            due: 'Mar 5, 2027',
          },
        ],
      },
      {
        key: 'g15',
        label: 'Grades 1–5',
        sublabel: 'School-administered assessment',
        title: 'Grades 1–5',
        deadlines: [
          { value: 'Jan 15, 2027', label: 'application form due' },
          { value: 'Feb 26, 2027', label: 'all materials & assessments due' },
          {
            value: '4:00 p.m.',
            label: 'decision release time — date on the live calendar',
            unpublished: true,
          },
          { value: '$2,500', label: 'deposit with the contract, credited to tuition' },
        ],
        steps: [
          {
            title: 'Inquire & tour',
            tag: 'Fall 2026',
            tagKind: 'outline',
            detail:
              'The Inquiry form books your campus tour and triggers the invitation to create your Charger Commons account.',
          },
          {
            title: 'Submit the Grades 1–5 application + fee',
            tag: 'by Jan 15',
            tagKind: 'accent',
            detail:
              "First-round consideration closes Jan 15; later applications roll for remaining seats. Fee amount isn't published; confirm with admissions.",
          },
          {
            title: 'Records & teacher recommendation',
            tag: 'by Feb 26',
            tagKind: 'outline',
            detail:
              "School records/transcript and the recommendation form, both handled through the portal checklist — the exact items for this band aren't published, so treat the portal as definitive.",
          },
          {
            title: 'Required assessment',
            tag: 'by Feb 26',
            tagKind: 'outline',
            detail:
              "An assessment step exists for Grades 1–5, but the specific instrument isn't published — ask admissions which assessment your child will take and how to schedule it.",
          },
          {
            title: 'Decision → contract + deposit',
            tag: 'Spring 2027',
            tagKind: 'accent',
            detail:
              'First-round decisions release at 4:00 p.m. on the published date — watch the live calendar. Then the signed contract and $2,500 deposit secure the seat.',
          },
        ],
        watchOuts: [
          {
            kicker: 'The least-published band',
            text: "Grades 1–5 shares the Grades 1–12 calendar, but its **material list, recommendation form, and assessment instrument aren't published**. Your Charger Commons checklist is the authoritative list — and if you need a definitive answer before applying, request it from admissions in writing.",
          },
          {
            kicker: 'No student-visit step published',
            text: "Unlike TK/K's required Classroom Visit, no comparable shadow day or visit is published for this band. That doesn't mean there isn't one — it simply wasn't retrievable. Ask on your tour.",
          },
        ],
        checklistCallout: {
          lead: 'Portal is definitive.',
          text: 'The exact material list and assessment for Grades 1–5 are not published on the website — your Charger Commons checklist is the authoritative list. Confirm specifics with the admissions office.',
        },
        checklistRows: [
          {
            action: 'Submit the Inquiry form and book a campus tour',
            detail: 'The inquiry is what triggers your Charger Commons account invitation.',
            due: 'Fall 2026',
          },
          {
            action: 'Create your Charger Commons account',
            detail: 'The portal generates the personalized checklist that tracks every step below.',
            due: 'Fall 2026',
          },
          {
            action: 'Submit the Grades 1–5 application and pay the fee',
            detail: "Fee amount isn't published — confirm with admissions.",
            due: 'Jan 15, 2027',
          },
          {
            action: 'Send school records and the teacher recommendation',
            detail: 'Both handled through the portal checklist, which is the definitive list.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Complete the required assessment',
            detail: "The instrument isn't published — ask admissions which one and how to book it.",
            due: 'Feb 26, 2027',
          },
          {
            action: 'Watch for the decision',
            detail: 'First-round decisions release at 4:00 p.m. — date on the live calendar.',
            due: 'Spring 2027',
          },
          {
            action: 'Return the signed contract with the $2,500 deposit',
            detail: 'The deposit is credited toward tuition.',
            due: 'Spring 2027',
          },
        ],
      },
      {
        key: 'g612',
        label: 'Grades 6–12',
        sublabel: 'Standardized testing (ISEE)',
        title: 'Grades 6–12',
        deadlines: [
          { value: 'Jan 15, 2027', label: 'application form due' },
          { value: 'Feb 26, 2027', label: 'all materials & testing due' },
          {
            value: '4:00 p.m.',
            label: 'decision release time — date on the live calendar',
            unpublished: true,
          },
          { value: '$2,500', label: 'deposit with the contract, credited to tuition' },
        ],
        steps: [
          {
            title: 'Inquire & tour',
            tag: 'Fall 2026',
            tagKind: 'outline',
            detail:
              'The Inquiry form books your campus tour and triggers the invitation to create your Charger Commons account.',
          },
          {
            title: 'Submit the Grades 6–12 application + fee',
            tag: 'by Jan 15',
            tagKind: 'accent',
            detail:
              "First-round consideration closes Jan 15; later applications roll for remaining seats. Fee amount isn't published; confirm with admissions.",
          },
          {
            title: 'Transcript & recommendations',
            tag: 'by Feb 26',
            tagKind: 'outline',
            detail:
              "Submitted through the portal checklist. The specific recommendation forms for this band aren't published — the portal shows exactly which ones your child needs.",
          },
          {
            title: 'Standardized testing',
            tag: 'by Feb 26',
            tagKind: 'outline',
            detail:
              'The ISEE is the test the school references. Register early enough to sit the test — and receive scores — before the materials deadline.',
          },
          {
            title: 'Decision → contract + deposit',
            tag: 'Spring 2027',
            tagKind: 'accent',
            detail:
              'First-round decisions release at 4:00 p.m. on the published date — watch the live calendar. Then the signed contract and $2,500 deposit secure the seat.',
          },
        ],
        watchOuts: [
          {
            kicker: 'Which test, exactly?',
            text: "Standardized testing is required, and the ISEE is the only test the school names — but the exact domestic requirement (ISEE vs. SSAT, which level) **isn't published**. Confirm with admissions before booking a test date.",
          },
          {
            kicker: 'International applicants',
            text: "Applicants outside China follow the grades 9–12 procedures and submit **ISEE scores plus TOEFL** (if English isn't the primary language). Applying from China and needing an I-20? The process begins with the school's partners at **TBI-New Oasis**.",
          },
        ],
        checklistCallout: {
          lead: 'Testing note.',
          text: 'Standardized testing is required; the ISEE is the test the school references. The exact domestic requirement is not published — confirm with admissions. International applicants: ISEE + TOEFL (if English is not primary); from China with an I-20, begin via TBI-New Oasis.',
        },
        checklistRows: [
          {
            action: 'Submit the Inquiry form and book a campus tour',
            detail: 'The inquiry is what triggers your Charger Commons account invitation.',
            due: 'Fall 2026',
          },
          {
            action: 'Create your Charger Commons account',
            detail: 'The portal generates the personalized checklist that tracks every step below.',
            due: 'Fall 2026',
          },
          {
            action: 'Submit the Grades 6–12 application and pay the fee',
            detail: "Fee amount isn't published — confirm with admissions.",
            due: 'Jan 15, 2027',
          },
          {
            action: 'Register for and sit the ISEE',
            detail: 'Book early enough that scores arrive before the materials deadline.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Submit the transcript and recommendations',
            detail: 'Through the portal checklist, which shows exactly which forms are needed.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Watch for the decision',
            detail: 'First-round decisions release at 4:00 p.m. — date on the live calendar.',
            due: 'Spring 2027',
          },
          {
            action: 'Return the signed contract with the $2,500 deposit',
            detail: 'The deposit is credited toward tuition.',
            due: 'Spring 2027',
          },
        ],
      },
    ],

    aid: {
      title: 'Running in parallel: the financial-aid clock',
      text: 'Clarity application ($65) due **Jan 22** for prospective families — complete both processes on time and the aid decision arrives inside the Enrollment Agreement. Applying for aid never influences admission; separate committees decide.',
      button: 'Financial Aid & Tuition',
    },

    comparison: {
      kicker: 'CROSS-BAND',
      title: 'Exactly what changes between bands',
      rows: [
        {
          label: 'Application due',
          cells: { tkk: 'Jan 2, 2027', g15: 'Jan 15, 2027', g612: 'Jan 15, 2027' },
        },
        {
          label: 'Materials due',
          cells: { tkk: 'Feb 1, 2027', g15: 'Feb 26, 2027', g612: 'Feb 26, 2027' },
        },
        {
          label: 'Assessment',
          cells: {
            tkk: 'WPPSI-IV + Readiness Screening + Classroom Visit',
            g15: 'Required — instrument not published',
            g612: 'Standardized testing — ISEE referenced',
          },
        },
        {
          label: 'Recommendation',
          cells: {
            tkk: 'Preschool Teacher Recommendation Form',
            g15: 'Via portal checklist — form not published',
            g612: 'Via portal checklist — forms not published',
          },
        },
        {
          label: 'Decision & contract',
          cells: {
            tkk: 'Feb 26 → contracts Mar 5, noon',
            g15: '4:00 p.m. release — see live calendar',
            g612: '4:00 p.m. release — see live calendar',
          },
        },
        {
          label: 'After first round',
          cells: {
            all: 'Rolling review for remaining seats at each grade level — identical in every band',
          },
        },
      ],
    },

    contacts: {
      kicker: 'CONTACTS',
      title: 'The admissions office',
      address: '5800 Sardis Road, Charlotte, NC 28270 · main 704-887-6000',
      people: [
        {
          name: 'Lisa Knight',
          detail: 'Asst. Head of School, Admissions & Enrollment · 704-887-6002',
        },
        { name: 'Jennifer Newcombe', detail: 'Associate Director of Admissions · 704-887-7015' },
        { name: 'James Garland', detail: 'Associate Director of Admissions · 704-887-6029' },
        {
          name: 'Carissa Goddard',
          detail: 'Asst. Director of Enrollment Management · 704-887-7057',
        },
        { name: 'Ron Johnson', detail: 'Admissions Officer · 704-887-7511' },
        { name: 'Ellen Teyssier', detail: 'Admissions Officer · 704-887-7097' },
        { name: 'Blair Roberts', detail: 'Admissions Services Manager · 704-887-7040' },
        {
          name: 'En español: Claudia Trower',
          detail: 'Dir. of Student Billing, Financial Aid & Accounting · 704-887-7023',
        },
      ],
    },

    checklist: {
      portalNote: 'Portal: Charger Commons · providenceday.org',
      aidPanel: {
        kicker: 'In parallel — the financial aid clock',
        items: [
          'Complete the Clarity financial-aid application ($65 fee) by Jan 22 — both custodial and non-custodial parents submit documentation.',
          'Complete both processes on time and any aid decision arrives inside the Enrollment Agreement. Applying for aid does not influence admission.',
        ],
      },
      contactPanel: {
        kicker: 'Questions — admissions office',
        lines: [
          'Lisa Knight, Asst. Head of School for Admissions — 704-887-6002',
          'Admissions main — 704-887-6000 · 5800 Sardis Road, Charlotte, NC 28270',
          'En español: Claudia Trower — 704-887-7023',
        ],
      },
      disclaimer:
        'Dates are the 2026–27 entry cycle as published on the providenceday.org admissions calendar (retrieved Aug 2026); cycle dates shift year to year — verify against the live calendar before acting. Items marked "confirm" are not published on the website. Compiled by Charlotte School Compare; not affiliated with Providence Day School.',
    },

    sources: [
      {
        label:
          'providenceday.org — admissions process, grade-level detail, live 2026–27 calendar and office contacts',
        url: 'https://www.providenceday.org/admissions',
      },
      {
        label: 'providenceday.org — tuition and financial assistance (Clarity, $65 fee, $2,500 deposit)',
        url: 'https://www.providenceday.org/admissions/tuition-and-financial-assistance',
      },
      {
        label: 'Charger Commons — the application portal',
        url: 'https://providenceday.myschoolapp.com',
      },
      {
        label:
          "Retrieved Aug 2026. Waitlist, sibling/legacy, transfer, and mid-year policies aren't published on the pages reviewed — confirm directly with admissions.",
      },
    ],
  },
}
