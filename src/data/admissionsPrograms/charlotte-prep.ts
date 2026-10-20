// Charlotte Preparatory School — Admissions (the Grade-by-Grade Application Guide).
//
// Transcribed from source-material/admissions/charlotte-prep/: the school's
// application-process page, its open-house and admissions pages, and the CAIS
// 2027–2028 consortium brochure the school hosts.
//
// TWO BANDS, chosen by the user (2026-10-19), mirroring the school's own two
// deadline tracks: Early School & Kindergarten (esk) and Grades 1–8 (g18).
//
// ⚠️ THE TEST SPLIT DOES NOT FALL ON THE BAND BOUNDARY. Montessori K / K AND
// Grade 1 take the WPPSI-IV; Grades 2–4 the WISC-V; Grades 5–8 the ISEE; nothing
// below Montessori K. So the Grades 1–8 band carries all three instruments.
// Never write "Grades 1–8 take the WISC-V" or anything of that shape.
//
// Two stale-source traps:
//  - The fall-2025 admissions packet still carries Dec 31 / Feb 28 / Mar 28
//    and a former contact. Ignore it; the dates below are the live page's.
//  - The CAIS brochure prints "Thursday, April 9" and "Thursday, April 16, 2027";
//    both are Fridays, so weekdays are omitted for those two dates.
//
// The school's dates page prints no year; the cycle is fixed by the CAIS
// 2027–2028 brochure and the open-house form's "Rising Grade for 2027-28".

import type { AdmissionsProgram } from '../admissionsPrograms.ts'

const PROCESS = 'https://charlotteprep.org/admissions/application-process'
const CAIS = 'https://charlotteprep.org/uploads/files/Admissions/2027-2028-Forms/cais-2027-2028-upload.pdf'
const PORTAL = 'https://sis.factsmgt.com/admissions-parent/home?districtCode=cp-nc&memberId=1133'
const ADMISSIONS = 'https://charlotteprep.org/admissions'
const TUITION = 'https://charlotteprep.org/admissions/tuition-fees'

export const charlottePrep: AdmissionsProgram = {
  guide: {
    headline:
      "Pick your child's entry point and the guide personalizes: the steps in order, the 2027–28 deadlines, and the testing for that band — plus a printable checklist to take with you. The calendar breaks once, at Kindergarten → Grade 1; the test changes twice more inside the Grades 1–8 band.",
    cycle: '2027–28 entry cycle',

    stats: [
      { value: 'Jan 2, 2027', label: 'Early School & Kindergarten priority deadline' },
      { value: 'Jan 15, 2027', label: 'Grades 1–8 priority deadline' },
      { value: '$100', label: 'non-refundable application fee' },
      { value: '$300', label: 'CAIS testing fee, WPPSI-IV or WISC-V' },
    ],

    rules: [
      {
        title: 'One portal.',
        text: 'Everything runs through FACTS: start an application in the FACTS admissions portal and pay the $100 non-refundable fee there. Entering a teacher’s and a registrar’s email in the portal sends them the recommendation and transcript forms directly.',
      },
    ],

    spineNote:
      'Same spine in both bands — visit → apply through FACTS with the fee → recommendations (and transcripts from Grade 1) → testing → an on-campus visit → decision by email at 4:00 p.m. → enrollment contract. What changes is the calendar, which test your child sits, and who administers it.',

    bands: [
      {
        key: 'esk',
        label: 'Early School & Kindergarten',
        sublabel: 'Earlier calendar · WPPSI-IV from Montessori K',
        title: 'Early School & Kindergarten',
        deadlines: [
          { value: 'Jan 2, 2027', label: 'priority application deadline' },
          { value: 'Feb 1, 2027', label: 'CAIS testing (Kindergarten) and teacher recommendations' },
          { value: 'Feb 26, 2027', label: 'decisions emailed at 4:00 p.m.' },
          { value: 'Mar 5, 2027', label: 'enrollment contract due by noon' },
        ],
        steps: [
          {
            title: 'Visit — an open house or information session',
            tag: 'Fall 2026',
            tagKind: 'outline',
            detail:
              'The **Montessori Open House** is **Wednesday, October 21** at 9:30 a.m., and a **Kindergarten Virtual Information Session** runs **Thursday, November 12** at 12:00 p.m. Ages are set **by August 1**: **2** for Pre-Primary, **3** for Primary, **4** for TK, and **5** for Montessori K or Traditional K.',
          },
          {
            title: 'Apply through FACTS and pay the $100 fee',
            tag: 'by Jan 2',
            tagKind: 'accent',
            detail:
              'Start the application in the **FACTS admissions portal**; the **$100 application fee** is non-refundable. January 2 is the **priority** deadline — two weeks ahead of Grades 1–8.',
          },
          {
            title: 'Teacher recommendations',
            tag: 'by Feb 1',
            tagKind: 'outline',
            detail:
              'Enter your child’s current teacher’s email in the portal and the recommendation form goes to them online. The school does not state how many recommendations it needs.',
          },
          {
            title: 'Kindergarten testing — the WPPSI-IV through CAIS',
            tag: 'by Feb 1',
            tagKind: 'accent',
            detail:
              '**Montessori K and Kindergarten applicants take the WPPSI-IV** through the **CAIS consortium**, at **$300**, booked with **one psychologist only**. "External testing is not required before Montessori Kindergarten," so **Pre-Primary, Primary and TK applicants sit no test**. CAIS also requires an **interview with each child**, typically **November–February**.',
          },
          {
            title: 'Meet and Greet, or Kindergarten Play Day',
            tag: 'Winter',
            tagKind: 'outline',
            detail:
              'Montessori applicants come for a **Meet and Greet** of "about 20-30 minutes". Kindergarten applicants who apply by the Round 1 deadline are invited to a **Kindergarten Play Day**.',
          },
          {
            title: 'Decision → contract',
            tag: 'Feb 26, 2027',
            tagKind: 'accent',
            detail:
              'Decisions are emailed on **February 26, 2027 at 4:00 p.m.**, and the **enrollment contract is due March 5 by noon**, with a **$2,000** down payment credited to tuition.',
          },
        ],
        watchOuts: [],
        checklistCallout: {
          lead: 'Your deadline is Jan 2 — two weeks ahead of Grades 1–8.',
          text: 'Early School and Kindergarten apply by January 2, finish testing and recommendations by February 1, and hear back on February 26 at 4:00 p.m. Only Montessori K and Kindergarten sit a test — the WPPSI-IV, through a CAIS psychologist at $300. Pre-Primary, Primary and TK applicants sit none.',
        },
        checklistRows: [
          {
            action: 'Attend an open house or information session',
            detail: 'Montessori Open House Oct 21, 9:30 a.m.; Kindergarten Virtual Information Session Nov 12, 12:00 p.m.',
            due: 'Fall 2026',
          },
          {
            action: 'Apply through the FACTS portal and pay the fee',
            detail: '$100, non-refundable.',
            due: 'Jan 2, 2027',
          },
          {
            action: 'Send the teacher recommendation request',
            detail: 'Enter the teacher’s email in the portal; the form goes to them online.',
            due: 'Feb 1, 2027',
          },
          {
            action: 'Montessori K / K: book and complete the WPPSI-IV',
            detail: '$300, with one CAIS psychologist. No test for Pre-Primary, Primary or TK.',
            due: 'Feb 1, 2027',
          },
          {
            action: 'Attend the Meet and Greet or Kindergarten Play Day',
            detail: 'Meet and Greet for Montessori, about 20–30 minutes; Play Day for Round 1 Kindergarten applicants.',
            due: 'Winter 2027',
          },
          {
            action: 'Watch for the decision email',
            detail: 'Sent at 4:00 p.m.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Return the enrollment contract',
            detail: 'By 12:00 p.m., with the $2,000 down payment.',
            due: 'Mar 5, 2027',
          },
        ],
      },
      {
        key: 'g18',
        label: 'Grades 1–8',
        sublabel: 'One calendar · three different tests inside it',
        title: 'Grades 1–8',
        deadlines: [
          { value: 'Jan 15, 2027', label: 'priority application deadline' },
          { value: 'Feb 26, 2027', label: 'recommendations, testing and transcripts due' },
          { value: 'Apr 9, 2027', label: 'decisions emailed at 4:00 p.m.' },
          { value: 'Apr 16, 2027', label: 'enrollment contract due by noon' },
        ],
        steps: [
          {
            title: 'Visit — the K–8 open house',
            tag: 'Fall 2026',
            tagKind: 'outline',
            detail:
              'The **K–8 Open House** is **Wednesday, November 4** at 9:30 a.m.',
          },
          {
            title: 'Apply through FACTS and pay the $100 fee',
            tag: 'by Jan 15',
            tagKind: 'accent',
            detail:
              'Start the application in the **FACTS admissions portal**; the **$100 application fee** is non-refundable. January 15 is the **priority** deadline.',
          },
          {
            title: 'Recommendations and transcripts',
            tag: 'by Feb 26',
            tagKind: 'outline',
            detail:
              'Enter your child’s teacher’s and school registrar’s emails in the portal, and the recommendation and transcript forms go to them online. The school does not state how many recommendations it needs.',
          },
          {
            title: 'Testing — and the instrument changes twice inside this band',
            tag: 'by Feb 26',
            tagKind: 'accent',
            detail:
              '**Check your child’s grade against all three.** **Grade 1** takes the **WPPSI-IV**, the same test as Kindergarten; **Grades 2–4** take the **WISC-V**. Both run through the **CAIS consortium** at **$300**, with **one psychologist only** and an interview with each child. **Grades 5–8 take the ISEE**, registered by you through ERB at iseeonline.erblearn.org.',
          },
          {
            title: 'An on-campus experience',
            tag: 'Winter',
            tagKind: 'outline',
            detail:
              'Applicants "may be invited to an on-campus experience", "subject to the results of academic assessments". Out-of-town applicants visit virtually.',
          },
          {
            title: 'Decision → contract',
            tag: 'Apr 9, 2027',
            tagKind: 'accent',
            detail:
              'Decisions are emailed on **April 9, 2027 at 4:00 p.m.**, six weeks after the Early School & Kindergarten band, and the **enrollment contract is due April 16 by noon**.',
          },
        ],
        watchOuts: [],
        checklistCallout: {
          lead: 'Check which test your grade sits — it changes twice inside this band.',
          text: 'Grade 1 takes the WPPSI-IV, Grades 2–4 the WISC-V — both through a CAIS psychologist at $300 — and Grades 5–8 the ISEE, registered through ERB. Applications are due January 15; recommendations, testing and transcripts by February 26; decisions arrive April 9 at 4:00 p.m.',
        },
        checklistRows: [
          {
            action: 'Attend the K–8 open house',
            detail: 'Wednesday, Nov 4, 9:30 a.m.',
            due: 'Fall 2026',
          },
          {
            action: 'Apply through the FACTS portal and pay the fee',
            detail: '$100, non-refundable.',
            due: 'Jan 15, 2027',
          },
          {
            action: 'Send the recommendation and transcript requests',
            detail: 'Enter the teacher’s and registrar’s emails in the portal.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Complete the test your grade sits',
            detail: 'Gr 1: WPPSI-IV · Gr 2–4: WISC-V, both through a CAIS psychologist at $300 · Gr 5–8: the ISEE, through ERB.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Attend the on-campus experience, if invited',
            detail: 'Invitations depend on the assessment results; out-of-town applicants visit virtually.',
            due: 'Winter 2027',
          },
          {
            action: 'Watch for the decision email',
            detail: 'Sent at 4:00 p.m.',
            due: 'Apr 9, 2027',
          },
          {
            action: 'Return the enrollment contract',
            detail: 'By 12:00 p.m., with the $2,000 down payment.',
            due: 'Apr 16, 2027',
          },
        ],
      },
    ],

    aid: {
      title: 'Running in parallel: the financial-aid clock',
      text: 'Tuition assistance is offered for **Kindergarten through 8th grade**, through **Clarity**, on "financial need, academic merit, and the student’s fit". The school’s aid page gives two deadlines — **January 2** in its body and **January 15** in its FAQ — so **confirm the date with the Director of Enrollment** before relying on either. Pre-Primary, Primary and TK are not eligible for aid.',
      button: 'Financial Aid & Tuition',
    },

    comparison: {
      kicker: 'CROSS-BAND',
      title: 'Exactly what changes between bands',
      rows: [
        { label: 'Priority application deadline', cells: { esk: 'Jan 2, 2027', g18: 'Jan 15, 2027' } },
        {
          label: 'Supporting materials due',
          cells: { esk: 'Feb 1, 2027 — testing and recommendations', g18: 'Feb 26, 2027 — recommendations, testing and transcripts' },
        },
        { label: 'Decisions emailed (4:00 p.m.)', cells: { esk: 'Feb 26, 2027', g18: 'Apr 9, 2027' } },
        { label: 'Enrollment contract due (noon)', cells: { esk: 'Mar 5, 2027', g18: 'Apr 16, 2027' } },
        {
          label: 'Testing instrument',
          cells: {
            esk: 'Montessori K / K: WPPSI-IV · none below Montessori K',
            g18: 'Gr 1: WPPSI-IV · Gr 2–4: WISC-V · Gr 5–8: ISEE',
          },
        },
        {
          label: 'Who administers the test',
          cells: {
            esk: 'A CAIS consortium psychologist — $300',
            g18: 'Gr 1–4: a CAIS psychologist, $300 · Gr 5–8: the ISEE, through ERB',
          },
        },
        {
          label: 'The visit',
          cells: {
            esk: 'Montessori Meet and Greet (about 20–30 minutes) · Kindergarten Play Day',
            g18: 'An on-campus experience, by invitation after the assessments',
          },
        },
        {
          label: 'Constant in both bands',
          cells: {
            all: 'The FACTS portal · the $100 non-refundable application fee · teacher recommendations sent from the portal · a $2,000 down payment credited to tuition · and the CAIS guarantee that no member school requires a contract before the consortium’s reply date',
          },
        },
      ],
    },

    contacts: {
      kicker: 'CONTACTS',
      title: 'The admissions office',
      address: '212 Boyce Road, Charlotte, NC 28211 · admissions@charlotteprep.org',
      people: [
        {
          name: 'Seher Khanna — Director of Enrollment',
          detail: '704-366-5994 ext. 1127 · skhanna@charlotteprep.org',
        },
        {
          name: 'Jenny Formon — Associate Director of Admissions',
          detail: 'admissions@charlotteprep.org',
        },
      ],
    },

    checklist: {
      portalNote: 'Portal: FACTS admissions · charlotteprep.org',
      aidPanel: {
        kicker: 'In parallel — the financial aid clock',
        items: [
          'Tuition assistance covers Kindergarten through 8th grade, through Clarity, on need, merit and fit.',
          'The aid page gives January 2 in its body and January 15 in its FAQ — confirm the date with the Director of Enrollment.',
          'The $300 CAIS testing fee falls due before any aid decision — budget for it separately.',
        ],
      },
      contactPanel: {
        kicker: 'Questions — admissions office',
        lines: [
          'Seher Khanna, Director of Enrollment — 704-366-5994 ext. 1127 · skhanna@charlotteprep.org',
          'admissions@charlotteprep.org',
          '212 Boyce Road, Charlotte, NC 28211',
        ],
      },
      disclaimer:
        'Dates are the 2027–28 entry cycle as published on charlotteprep.org and in the CAIS 2027–2028 brochure, retrieved in October 2026. Cycle dates shift year to year — verify against the live pages before acting.',
    },

    sources: [
      {
        label:
          'charlotteprep.org — application process: the two deadline tracks, the testing by grade, the FACTS portal, the $100 fee, recommendations and transcripts, the visits and decision dates',
        url: PROCESS,
      },
      {
        label:
          'CAIS 2027–2028 consortium brochure (hosted on charlotteprep.org) — the decision and contract dates, the $300 testing fee, the one-psychologist rule and the child interview, and the common reply-date guarantee',
        url: CAIS,
      },
      { label: 'FACTS admissions portal — Charlotte Preparatory School', url: PORTAL },
      { label: 'charlotteprep.org — Admissions (open houses and contacts)', url: ADMISSIONS },
      { label: 'charlotteprep.org — Tuition & Fees (the down payment and aid)', url: TUITION },
    ],
  },
}
