// Providence Day School — Admissions.
//
// Transcribed from the committed research file
// source-material/admissions/providence-day/Providence Day - Admissions -
// Grade-by-Grade Application Plans.md, which carries the provenance header, the
// source URLs and the record-level detail behind every figure below.
//
// REFRESHED 2026-09-08 against the school's own live admissions pages. See
// source-material/admissions/providence-day/Providence Day - Admissions - Live
// Process Page Refresh.md for the verbatim quotes behind every field below.
//
// That refresh resolved six fields this file previously carried as NOT
// PUBLISHED. They were never unpublished — the original research could not
// reach providenceday.org/admissions/admissions-process and fell back to a
// 2025–26 mirror page. The live page publishes all six: the Grades 1–5 and
// 6–12 decision date (Apr 9, 2027, 4:00 p.m.), the Grades 1–5 assessment
// instruments (WPPSI-IV / WISC-V / ISEE, split by grade) and material list,
// the Grades 6–12 recommendation forms (English + Math), and the required test
// (ISEE, named outright). Grades 2–5 also have a required Day Visit, and
// Grades 6–12 have student and parent interviews.
//
// CYCLE: 2026–27 only, and no date changed in the refresh. NOTE the school's
// own two pages disagree on the LABEL while agreeing exactly on the dates — the
// calendar page says "2026-2027", the process page's apply buttons say
// "2027-2028". We follow the calendar page. A date is never guessed and a prior
// cycle's date is never carried forward.
//
// The school's own "NOT PUBLISHED" markers that REMAIN are load-bearing and are
// rendered as "confirm with admissions" rather than dropped or asserted: the
// application-fee amount, the ISEE level for Grades 6–12, and the TK/K age
// cutoff beyond "at least 4 at the time of assessment".

import type { AdmissionsProgram } from '../admissionsPrograms.ts'

export const providenceDay: AdmissionsProgram = {
  guide: {
    headline:
      "Pick your child's entry point and the guide personalizes: the steps in order, the 2026–27 deadlines, and the testing for that band — plus a printable checklist to take with you. The financial-aid clock runs in parallel.",
    cycle: '2026–27 entry cycle',

    stats: [
      // The 'grade bands' count tile was removed by request (2026-08-31) — not a data gap.
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
          { value: 'Apr 9, 2027', label: 'first-round decisions release, 4:00 p.m.' },
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
            title: 'Records, recommendation & day visit',
            tag: 'by Feb 26',
            tagKind: 'outline',
            detail:
              'The list splits by grade. **Rising Grade 1** submits a Teacher Information Form, a PD Teacher Evaluation and a report card. **Rising Grades 2–5** submit a Teacher Recommendation Form, a Transcript Release Form (first semester or second quarter grades included) and a Day Visit and Teacher Evaluation. All of it runs through the portal checklist.',
          },
          {
            title: 'Required assessment',
            tag: 'by Feb 26',
            tagKind: 'outline',
            detail:
              'The instrument depends on the grade: **Rising Grade 1** takes the WPPSI-IV, the same Wechsler preschool scale as TK/K; **Grades 2–4** take the WISC-V, the Wechsler Intelligence Scale for Children; and **Grade 5** takes the ISEE, the Independent School Entrance Exam. Ask admissions how to schedule the one your child needs.',
          },
          {
            title: 'Decision → contract + deposit',
            tag: 'Apr 9, 2027',
            tagKind: 'accent',
            detail:
              'First-round decisions release at 4:00 p.m. on April 9, 2027. Then the signed contract and $2,500 deposit secure the seat.',
          },
        ],
        watchOuts: [
          {
            kicker: 'The band that splits by grade',
            text: 'Grades 1–5 shares the Grades 1–12 calendar, but the requirements split inside it. **Rising Grade 1** is treated like the youngest applicants — WPPSI-IV, a Teacher Information Form, a PD Teacher Evaluation and a report card. **Rising Grades 2–5** take the WISC-V (Grades 2–4) or the ISEE (Grade 5), and add a Transcript Release Form and a Day Visit. Your Charger Commons checklist shows exactly which items apply to your child.',
          },
          {
            kicker: 'There IS a visit step — for Grades 2–5',
            text: 'Rising Grades 2–5 include a **Day Visit and Teacher Evaluation**, so your child spends a day in a PD classroom and is observed there. Rising Grade 1 has no published day-visit step. Ask on your tour how the visit is scheduled.',
          },
        ],
        checklistCallout: {
          lead: 'Check which grade you are.',
          text: "Rising Grade 1 and Rising Grades 2–5 have different required materials and different assessments. Your Charger Commons checklist shows the exact list for your child's grade.",
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
            action: 'Submit the records, recommendation and day-visit items',
            detail:
              'Gr 1: Teacher Information Form, PD Teacher Evaluation, report card. Gr 2–5: Teacher Recommendation Form, Transcript Release Form, Day Visit and Teacher Evaluation.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Complete the required assessment',
            detail: 'Gr 1: WPPSI-IV · Gr 2–4: WISC-V · Gr 5: ISEE. Ask admissions how to schedule it.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Watch for the decision',
            detail: 'First-round decisions release at 4:00 p.m.',
            due: 'Apr 9, 2027',
          },
          {
            action: 'Return the signed contract with the $2,500 deposit',
            detail: 'The deposit is credited toward tuition.',
            due: 'After Apr 9, 2027',
          },
        ],
      },
      {
        key: 'g612',
        label: 'Grades 6–12',
        sublabel: 'ISEE + interviews',
        title: 'Grades 6–12',
        deadlines: [
          { value: 'Jan 15, 2027', label: 'application form due' },
          { value: 'Feb 26, 2027', label: 'all materials & testing due' },
          { value: 'Apr 9, 2027', label: 'first-round decisions release, 4:00 p.m.' },
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
            title: 'Transcript, recommendations & interviews',
            tag: 'by Feb 26',
            tagKind: 'outline',
            detail:
              'Two recommendation forms are required — an **English Recommendation Form** and a **Math Recommendation Form** — plus a **Transcript Release Form**, which should include first semester or second quarter grades. There are also **student and parent interviews**, and an **optional day visit**. All of it runs through the portal checklist.',
          },
          {
            title: 'Standardized testing',
            tag: 'by Feb 26',
            tagKind: 'outline',
            detail:
              'The **ISEE** — the Independent School Entrance Exam — is required for this band. Register early enough to sit the test, and receive scores, before the materials deadline.',
          },
          {
            title: 'Decision → contract + deposit',
            tag: 'Apr 9, 2027',
            tagKind: 'accent',
            detail:
              'First-round decisions release at 4:00 p.m. on April 9, 2027. Then the signed contract and $2,500 deposit secure the seat.',
          },
        ],
        watchOuts: [
          {
            kicker: 'The test is the ISEE',
            text: 'The school names the **Independent School Entrance Exam (ISEE)** as the required test for this band. The exam has grade-appropriate levels — confirm with admissions which level your child sits, and book a date early enough that scores arrive before the February 26 materials deadline.',
          },
          {
            kicker: 'International applicants',
            text: "Applicants outside China follow the grades 9–12 procedures and submit **ISEE scores plus TOEFL** (if English isn't the primary language). Applying from China and needing an I-20? The process begins with the school's partners at **TBI-New Oasis**.",
          },
        ],
        checklistCallout: {
          lead: 'Testing note.',
          text: 'The ISEE is required. Two recommendation forms — English and Math — plus a Transcript Release Form, and student and parent interviews. Confirm the ISEE level with admissions. International applicants: ISEE + TOEFL (if English is not primary); from China with an I-20, begin via TBI-New Oasis.',
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
            action: 'Submit the transcript, recommendations and interviews',
            detail:
              'English Recommendation Form, Math Recommendation Form and a Transcript Release Form — plus student and parent interviews.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Watch for the decision',
            detail: 'First-round decisions release at 4:00 p.m.',
            due: 'Apr 9, 2027',
          },
          {
            action: 'Return the signed contract with the $2,500 deposit',
            detail: 'The deposit is credited toward tuition.',
            due: 'After Apr 9, 2027',
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
            g15: 'Gr 1: WPPSI-IV · Gr 2–4: WISC-V · Gr 5: ISEE',
            g612: 'ISEE',
          },
        },
        {
          label: 'Recommendation',
          cells: {
            tkk: 'Preschool Teacher Recommendation Form',
            g15: 'Gr 1: Teacher Information Form + PD Teacher Evaluation · Gr 2–5: Teacher Recommendation Form',
            g612: 'English + Math Recommendation Forms',
          },
        },
        {
          label: 'Decision & contract',
          cells: {
            tkk: 'Feb 26 → contracts Mar 5, noon',
            g15: 'Apr 9, 2027, 4:00 p.m.',
            g612: 'Apr 9, 2027, 4:00 p.m.',
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
        { name: 'Angela Montague', detail: 'Admissions Associate' },
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
        'Dates are the 2026–27 entry cycle as published on the providenceday.org admissions calendar and admissions-process pages (verified against the live site Sep 2026); cycle dates shift year to year — verify against the live calendar before acting. Items marked "confirm" are not published on the website. Compiled by Charlotte School Compare; not affiliated with Providence Day School.',
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
