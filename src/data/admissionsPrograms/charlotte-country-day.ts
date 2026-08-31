// Charlotte Country Day School — Admissions.
//
// Transcribed from the committed research files
// source-material/admissions/charlotte-country-day/Charlotte Country Day -
// Admissions - Grade-by-Grade Application Plans.md and its companion
// "… - CAIS Testing Consortium.md", which carry the provenance headers, the
// source URLs and the record-level detail behind every figure below.
//
// CYCLE: 2027–28 only. The school's own Admissions Process page carries section
// headers reading "2026-27 Important Dates & Deadlines" and "2026-27 Admissions
// Calendar" while the content beneath them is the 2027–28 cycle. That header is
// a MISLABEL, proven three ways in the research file — the JK age rule names
// "the 2027–28 school year", the page states "Application Deadlines for the
// 2027-28 School Year" outright, and every listed date falls in the 2026–2027
// admission season — and corroborated by the CAIS brochure, which publishes the
// same deadlines and notification dates for 2027–28.
//
// The card does NOT say any of that (user's call, 2026-08-30). An earlier draft
// carried a second framing rule, "Ignore the header, read the dates.", telling
// the reader the school's own header was wrong; it was cut as too much
// maintainer-facing argument for a parent-facing card. `rules[1]` is now the
// plain cycle caveat every school's card carries. The finding itself is not
// lost — it stays here, in the two research files, and in the checklist
// disclaimer — so do not "restore" the dates to 2026–27 on the strength of the
// school's header.
//
// NOTE FOR EDITORS: `rules[].text` is rendered RAW — `<strong>{title}</strong>
// {text}` in AdmissionsProgram.tsx — so it is the one prose field on this card
// with NO markdown support. A `**bold**` span here ships as literal asterisks
// (it did, briefly, in that cut rule). `Emphasized` covers steps[].detail,
// watchOuts[].text and aid.text, but not this.
//
// A prior enrichment check flagged stale-cache 2026–27 dates (a Dec 31, 2025
// application deadline and a Feb 7, 2026 ISEE day). Those are the PRIOR, CLOSED
// cycle and are never carried forward here.
//
// Every CCDS date on this card is published, so no tile carries `unpublished`.
//
// The school's own "NOT PUBLISHED" markers are load-bearing and ship as prose
// rather than being dropped or asserted: waitlist procedure, sibling/legacy/
// faculty-child preference, transfer and mid-year entry, whether late
// applications roll, international visa/I-20/SEVIS procedure, the Kindergarten
// birthday cutoff (only the JK one is published), a named open house for grades
// 1–4 and 5–8, and the 2028–29 dates.
//
// TWO FIGURES THAT LOOK LIKE TYPOS AND ARE NOT:
//   - JK/K teacher recommendations are due Jan 15, 2027 — two weeks AFTER that
//     band's own Jan 2 application deadline. The FAQ lists it as its own line.
//   - The CAIS instrument changes at Grade 1 → Grade 2, which cuts ACROSS this
//     school's band boundary: the Grades 1–4 band contains both instruments
//     (WPPSI-IV for Grade 1, WISC-V for rising Grades 2–4). It is never "Grades
//     1–4 take the WISC-V".
//
// The $300 CAIS testing fee is paid to the psychologist, not to the school, and
// is separate from the school's own $100 application fee — which is why it sits
// in the assessment step and the watch-out rather than in a stat tile.
//
// The CAIS brochure lists 18 designated psychologists with addresses and phone
// numbers. Those are third-party practitioner contact details and are NOT
// republished here; the card links the brochure instead.

import type { AdmissionsProgram } from '../admissionsPrograms.ts'

export const charlotteCountryDay: AdmissionsProgram = {
  guide: {
    headline:
      "Pick your child's entry point and the guide personalizes: the steps in order, the 2027–28 deadlines, and the testing for that band — plus a printable checklist to take with you. One shared six-step process, but it breaks twice — at Kindergarten→1 and again at Grade 4→5.",
    cycle: '2027–28 entry cycle',

    stats: [
      { value: '3', label: 'grade bands, each with its own calendar' },
      {
        value: 'Jan 2, 2027',
        label: 'JK/K application deadline — two weeks ahead of everyone else',
      },
      { value: 'Jan 15, 2027', label: 'Grades 1–12 application deadline' },
      { value: '10%', label: 'enrollment deposit — of tuition, credited toward it' },
    ],

    rules: [
      {
        title: 'One portal.',
        text: 'Everything runs through Veracross: the inquiry form starts the file, your admissions portal account is where you apply, and the portal then generates a checklist personalized to your child\'s grade level that tracks every remaining step.',
      },
      {
        title: 'Dates are cycle-specific.',
        text: 'Every date below is the 2027–28 entry cycle, as published by the school and corroborated by the CAIS consortium brochure. Cycle dates shift year to year — verify against the live calendar before acting.',
      },
    ],

    spineNote:
      'Six published steps in every band — start your journey → submit an application → complete an entrance test → meet with a faculty member → provide supporting materials → follow your progress. What changes is step 3 (which test), the application deadline, and which decision track you land on.',

    bands: [
      {
        key: 'jkk',
        label: 'JK / Kindergarten',
        sublabel: 'CAIS screening · earlier calendar',
        title: 'Junior Kindergarten & Kindergarten',
        deadlines: [
          { value: 'Jan 2, 2027', label: 'application form + $100 fee due' },
          { value: 'Feb 1, 2027', label: 'CAIS testing & classroom visit due' },
          { value: 'Feb 26, 2027', label: 'decisions released' },
          { value: 'Mar 5, 2027', label: 'family response due' },
        ],
        steps: [
          {
            title: 'Submit the Inquiry Form',
            tag: 'Fall 2026',
            tagKind: 'outline',
            detail:
              'The Veracross inquiry form opens your file and is where inquiry, event RSVP and application all live in one place.',
          },
          {
            title: 'Create your Admissions Portal account',
            tag: 'Fall 2026',
            tagKind: 'outline',
            detail:
              'The portal generates a checklist personalized to your grade level and is where you book a campus visit.',
          },
          {
            title: 'Attend the JK/K Open House',
            tag: 'Oct 14, 2026',
            tagKind: 'outline',
            detail:
              '9:30 a.m. on the Cannon Campus — the one open house the school names for this band. Recommended, not marked required.',
          },
          {
            title: 'Submit the application + $100 fee',
            tag: 'by Jan 2',
            tagKind: 'accent',
            detail:
              'Two weeks earlier than every other grade. "A $100 fee is required as part of your child\'s application."',
          },
          {
            title: 'Teacher recommendation(s)',
            tag: 'by Jan 15',
            tagKind: 'outline',
            detail:
              'Listed as its own line on the school\'s timeline — and it falls **after** the Jan 2 application deadline, not before it. Not a typo: apply first, then the recommendation follows.',
          },
          {
            title: 'CAIS screening + classroom visit',
            tag: 'by Feb 1',
            tagKind: 'outline',
            detail:
              'Both due on the same date. The screening is the WPPSI-IV, booked and paid for directly with a CAIS-designated psychologist ($300, separate from the school\'s $100 fee) — appointments open the day after Labor Day. The classroom visit is your child\'s, on campus.',
          },
          {
            title: 'Meet with a faculty member',
            tag: 'by Feb 1',
            tagKind: 'outline',
            detail:
              'Step 4 of the shared process — "each applicant meets with a grade-appropriate member of our faculty."',
          },
          {
            title: 'Decision → contract + deposit',
            tag: 'Feb 26 → Mar 5',
            tagKind: 'accent',
            detail:
              'Decisions release Feb 26 and your response is due Mar 5. The enrollment contract carries a deposit of 10% of tuition, credited toward the total; families with an aid application in play pay a reduced deposit that is refundable if the award falls short.',
          },
        ],
        watchOuts: [
          {
            kicker: 'Why JK/K is its own band',
            text: 'This band runs on an **entirely earlier calendar** — application Jan 2 rather than Jan 15, decisions Feb 26 rather than April 9. It also carries two requirements the older bands do not: a **separately deadlined teacher recommendation** and a **classroom visit** for your child. Miss the Jan 2 date and you are not on the Grades 1–12 track as a fallback; you are late for this one.',
          },
          {
            kicker: 'One test serves seven schools',
            text: 'The CAIS screening is a consortium assessment: "your child will be evaluated only one time by a licensed psychologist designated by CAIS," and that single evaluation is accepted by **all seven member schools** — so applying to several Charlotte independents does not mean testing several times. Two rules bind, though: you must **apply to a school before it will consider your evaluation**, testing may happen **only once in a twelve-month period**, and any sign of coaching, tutoring or re-testing "will invalidate your application to any CAIS school."',
          },
        ],
        checklistCallout: {
          lead: 'Your deadline is Jan 2, not Jan 15.',
          text: "Junior Kindergarten and Kindergarten apply two weeks ahead of every other grade, and hear back six weeks earlier. The teacher recommendation is due Jan 15 — after the application, which is correct and not a misprint.",
        },
        checklistRows: [
          {
            action: 'Submit the Veracross Inquiry Form',
            detail: 'Opens your file; inquiry, event RSVP and application all run through it.',
            due: 'Fall 2026',
          },
          {
            action: 'Create your Admissions Portal account',
            detail: 'Generates the grade-level checklist and books your campus visit.',
            due: 'Fall 2026',
          },
          {
            action: 'Attend the JK/K Admissions Open House',
            detail: '9:30 a.m., Cannon Campus. Recommended, not required.',
            due: 'Oct 14, 2026',
          },
          {
            action: 'Submit the application and pay the $100 fee',
            detail: 'Two weeks earlier than the Grades 1–12 deadline.',
            due: 'Jan 2, 2027',
          },
          {
            action: 'Have the teacher recommendation(s) sent',
            detail: 'Falls after the application deadline — apply first, recommendation follows.',
            due: 'Jan 15, 2027',
          },
          {
            action: 'Book and complete the CAIS screening (WPPSI-IV)',
            detail:
              'Scheduled directly with a CAIS-designated psychologist; $300, paid to the psychologist.',
            due: 'Feb 1, 2027',
          },
          {
            action: "Complete your child's classroom visit",
            detail: 'Shares the same deadline as the CAIS screening.',
            due: 'Feb 1, 2027',
          },
          {
            action: 'Meet with a grade-appropriate faculty member',
            detail: 'Step 4 of the shared six-step process.',
            due: 'Feb 1, 2027',
          },
          {
            action: 'Watch for the decision',
            detail: 'Six weeks ahead of the Grades 1–12 track.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Return your response and the enrollment contract',
            detail: 'Deposit is 10% of tuition, credited toward the total.',
            due: 'Mar 5, 2027',
          },
        ],
      },
      {
        key: 'g14',
        label: 'Grades 1–4',
        sublabel: 'CAIS screening · later calendar',
        title: 'Grades 1–4',
        deadlines: [
          { value: 'Jan 15, 2027', label: 'application form + $100 fee due' },
          { value: 'Feb 26, 2027', label: 'all materials & assessments due' },
          { value: 'Apr 9, 2027', label: 'decisions released' },
          { value: 'Apr 16, 2027', label: 'family response due' },
        ],
        steps: [
          {
            title: 'Submit the Inquiry Form',
            tag: 'Fall 2026',
            tagKind: 'outline',
            detail:
              'The Veracross inquiry form opens your file and is where inquiry, event RSVP and application all live in one place.',
          },
          {
            title: 'Create your Admissions Portal account',
            tag: 'Fall 2026',
            tagKind: 'outline',
            detail:
              'The portal generates a checklist personalized to your grade level and is where you book a campus visit.',
          },
          {
            title: 'Visit campus',
            tag: 'Fall 2026',
            tagKind: 'outline',
            detail:
              'No open house is named for grades 1–4 in the published calendar — the school names only a JK/K event and a grades 9–12 one. Book an individual visit through the portal instead.',
          },
          {
            title: 'Submit the application + $100 fee',
            tag: 'by Jan 15',
            tagKind: 'accent',
            detail:
              'The Grades 1–12 deadline. "A $100 fee is required as part of your child\'s application."',
          },
          {
            title: 'CAIS screening',
            tag: 'by Feb 26',
            tagKind: 'outline',
            detail:
              'Which instrument depends on the grade, and the split does not follow this band: **WPPSI-IV for Grade 1, WISC-V for rising Grades 2–4**. Either is $300, booked and paid directly with a CAIS-designated psychologist — appointments open the day after Labor Day, and you book with one psychologist only.',
          },
          {
            title: 'Meet with a faculty member',
            tag: 'by Feb 26',
            tagKind: 'outline',
            detail:
              'Step 4 of the shared process — "each applicant meets with a grade-appropriate member of our faculty."',
          },
          {
            title: 'Provide supporting materials',
            tag: 'by Feb 26',
            tagKind: 'outline',
            detail:
              'Teacher recommendations and academic records, as itemized by your portal checklist "based on your child\'s grade level". Unlike JK/K there is no separately published recommendation deadline — the portal is the list.',
          },
          {
            title: 'Decision → contract + deposit',
            tag: 'Apr 9 → Apr 16',
            tagKind: 'accent',
            detail:
              'Decisions release Apr 9 and your response is due Apr 16. The enrollment contract carries a deposit of 10% of tuition, credited toward the total; families with an aid application in play pay a reduced deposit that is refundable if the award falls short.',
          },
        ],
        watchOuts: [
          {
            kicker: 'Same test as JK/K, different clock',
            text: 'Grades 1–4 sit inside the **same CAIS screening population** as JK/K — the consortium brochure covers Pre-K through Grade 4 — but on the **later Grades 1–12 calendar**. So the assessment is the JK/K one while every date is the older bands\'. The instrument itself splits at **Grade 1 vs Grade 2**, not at the band boundary: a Grade 1 applicant takes the WPPSI-IV, a rising Grade 2–4 applicant the WISC-V.',
          },
          {
            kicker: 'Budget the testing fee separately',
            text: 'The **$300** CAIS fee is paid **to the psychologist, not to the school**, and is on top of the school\'s own **$100** application fee. Payment is due within 24 hours of confirming the appointment, is non-refundable for appointments made after Jan 1, 2027, and a **$100 cancellation fee** applies once paid — with no refund at all inside 72 hours of the appointment.',
          },
        ],
        checklistCallout: {
          lead: 'The portal is your material list.',
          text: 'Unlike JK/K, grades 1–4 have no separately published recommendation deadline: your Veracross checklist itemizes exactly which recommendations and records are needed for your child\'s grade, and everything is due Feb 26.',
        },
        checklistRows: [
          {
            action: 'Submit the Veracross Inquiry Form',
            detail: 'Opens your file; inquiry, event RSVP and application all run through it.',
            due: 'Fall 2026',
          },
          {
            action: 'Create your Admissions Portal account',
            detail: 'Generates the grade-level checklist and books your campus visit.',
            due: 'Fall 2026',
          },
          {
            action: 'Book an individual campus visit',
            detail: 'No open house is named for grades 1–4 — arrange a visit through the portal.',
            due: 'Fall 2026',
          },
          {
            action: 'Submit the application and pay the $100 fee',
            detail: 'The Grades 1–12 deadline.',
            due: 'Jan 15, 2027',
          },
          {
            action: 'Book and complete the CAIS screening',
            detail:
              'WPPSI-IV for Grade 1, WISC-V for rising Grades 2–4. $300, paid to the psychologist.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Meet with a grade-appropriate faculty member',
            detail: 'Step 4 of the shared six-step process.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Submit teacher recommendations and academic records',
            detail: 'Exactly as itemized by your portal checklist for your grade level.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Watch for the decision',
            detail: 'The Grades 1–12 notification date.',
            due: 'Apr 9, 2027',
          },
          {
            action: 'Return your response and the enrollment contract',
            detail: 'Deposit is 10% of tuition, credited toward the total.',
            due: 'Apr 16, 2027',
          },
        ],
      },
      {
        key: 'g512',
        label: 'Grades 5–12',
        sublabel: 'ISEE · two campuses',
        title: 'Grades 5–12',
        deadlines: [
          { value: 'Jan 15, 2027', label: 'application form + $100 fee due' },
          { value: 'Feb 26, 2027', label: 'all materials & testing due' },
          { value: 'Apr 9, 2027', label: 'decisions released' },
          { value: 'Apr 16, 2027', label: 'family response due' },
        ],
        steps: [
          {
            title: 'Submit the Inquiry Form',
            tag: 'Fall 2026',
            tagKind: 'outline',
            detail:
              'The Veracross inquiry form opens your file and is where inquiry, event RSVP and application all live in one place.',
          },
          {
            title: 'Create your Admissions Portal account',
            tag: 'Fall 2026',
            tagKind: 'outline',
            detail:
              'The portal generates a checklist personalized to your grade level and is where you book a campus visit.',
          },
          {
            title: 'Visit the right campus',
            tag: 'Fall 2026',
            tagKind: 'outline',
            detail:
              'Grades 5–8 are at **Bissell**; grades 9–12 at **Cannon**. The published calendar names a grades 9–12 open house on **Nov 5, 2026, 1:30 p.m. at Cannon** — no grades 5–8 event is listed, so arrange that visit through the portal.',
          },
          {
            title: 'Submit the application + $100 fee',
            tag: 'by Jan 15',
            tagKind: 'accent',
            detail:
              'The Grades 1–12 deadline. "A $100 fee is required as part of your child\'s application."',
          },
          {
            title: 'Sit the ISEE',
            tag: 'by Feb 26',
            tagKind: 'outline',
            detail:
              'The break from the younger bands: no psychologist, no CAIS. The school hosts its own testing day — **Feb 6, 2027** — and you may instead sit any other ISEE date booked through the ISEE website. It "measures verbal and quantitative ability, mathematics skills, reading comprehension, and writing skills"; book early enough that scores arrive before the Feb 26 deadline.',
          },
          {
            title: 'Meet with a faculty member',
            tag: 'by Feb 26',
            tagKind: 'outline',
            detail:
              'Step 4 of the shared process — "each applicant meets with a grade-appropriate member of our faculty."',
          },
          {
            title: 'Provide supporting materials',
            tag: 'by Feb 26',
            tagKind: 'outline',
            detail:
              'Teacher recommendations plus academic records and transcripts, as itemized by your portal checklist for your child\'s grade level.',
          },
          {
            title: 'Decision → contract + deposit',
            tag: 'Apr 9 → Apr 16',
            tagKind: 'accent',
            detail:
              'Decisions release Apr 9 and your response is due Apr 16. The enrollment contract carries a deposit of 10% of tuition, credited toward the total; families with an aid application in play pay a reduced deposit that is refundable if the award falls short.',
          },
        ],
        watchOuts: [
          {
            kicker: 'Which campus you are applying to',
            text: 'This band spans two addresses. **Grades 5–8 apply for and attend Bissell**; **grades 9–12 apply for and attend Cannon**. The admissions office itself is on Cannon, in the Levine Center, whichever campus your child is headed for. Note too that the only named open house here is the **grades 9–12** one — a middle-school visit is arranged individually rather than at a published event.',
          },
          {
            kicker: 'International applicants',
            text: 'The TOEFL is an **addition to this band\'s process, not a replacement for it**: "international applicants are asked to take the TOEFL test to measure the ability to use and understand the English language," on top of the ISEE and the same deadlines. The Duolingo English Test is not mentioned. Visa, I-20 and SEVIS procedures — and whether the application fee differs — are **not published**; ask admissions directly before you start.',
          },
        ],
        checklistCallout: {
          lead: 'Book the ISEE early.',
          text: 'The school hosts one testing day (Feb 6, 2027) and otherwise you book your own date through the ISEE website — either way scores must reach the school by Feb 26. International applicants add the TOEFL to this list rather than substituting it.',
        },
        checklistRows: [
          {
            action: 'Submit the Veracross Inquiry Form',
            detail: 'Opens your file; inquiry, event RSVP and application all run through it.',
            due: 'Fall 2026',
          },
          {
            action: 'Create your Admissions Portal account',
            detail: 'Generates the grade-level checklist and books your campus visit.',
            due: 'Fall 2026',
          },
          {
            action: 'Visit the campus your child would attend',
            detail:
              'Grades 5–8 Bissell, grades 9–12 Cannon. The named open house is Nov 5, 2026, 1:30 p.m. at Cannon, grades 9–12.',
            due: 'Fall 2026',
          },
          {
            action: 'Submit the application and pay the $100 fee',
            detail: 'The Grades 1–12 deadline.',
            due: 'Jan 15, 2027',
          },
          {
            action: 'Register for and sit the ISEE',
            detail:
              "The school's own testing day is Feb 6, 2027; other dates book through the ISEE website.",
            due: 'Feb 26, 2027',
          },
          {
            action: 'Meet with a grade-appropriate faculty member',
            detail: 'Step 4 of the shared six-step process.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Submit recommendations, records and transcripts',
            detail: 'Exactly as itemized by your portal checklist for your grade level.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'International applicants: sit the TOEFL',
            detail: 'In addition to the ISEE, not instead of it.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Watch for the decision',
            detail: 'The Grades 1–12 notification date.',
            due: 'Apr 9, 2027',
          },
          {
            action: 'Return your response and the enrollment contract',
            detail: 'Deposit is 10% of tuition, credited toward the total.',
            due: 'Apr 16, 2027',
          },
        ],
      },
    ],

    aid: {
      title: 'Running in parallel: the financial-aid clock',
      text: 'Clarity application ($65 fee) due **Jan 15** if you are a prospective family — the Nov 1 date the school also publishes is for families already enrolled, so it is not yours. Awards are **need-based only** (there are no merit scholarships), both custodial and non-custodial parents submit, "admission decisions are made separately from financial aid decisions," and any award arrives with the enrollment contract.',
      button: 'Financial Aid & Tuition',
    },

    comparison: {
      kicker: 'CROSS-BAND',
      title: 'Exactly what changes between bands',
      rows: [
        {
          label: 'Application due',
          cells: { jkk: 'Jan 2, 2027', g14: 'Jan 15, 2027', g512: 'Jan 15, 2027' },
        },
        {
          label: 'Entrance test',
          cells: {
            jkk: 'CAIS screening — WPPSI-IV',
            g14: 'CAIS screening — WPPSI-IV (Gr 1), WISC-V (rising Gr 2–4)',
            g512: 'ISEE — school testing day Feb 6, 2027',
          },
        },
        {
          label: 'Teacher recommendation',
          cells: {
            jkk: 'Own deadline — Jan 15, 2027',
            g14: 'Via portal checklist — no separate deadline',
            g512: 'Via portal checklist — no separate deadline',
          },
        },
        {
          label: "Child's visit",
          cells: {
            jkk: 'Classroom visit, due Feb 1, 2027',
            g14: 'Meeting with a faculty member',
            g512: 'Meeting with a faculty member',
          },
        },
        {
          label: 'All materials due',
          cells: { jkk: 'Feb 1, 2027', g14: 'Feb 26, 2027', g512: 'Feb 26, 2027' },
        },
        {
          label: 'Decision & response',
          cells: {
            jkk: 'Feb 26 → response Mar 5',
            g14: 'Apr 9 → response Apr 16',
            g512: 'Apr 9 → response Apr 16',
          },
        },
        {
          label: 'Campus',
          cells: {
            jkk: 'Cannon',
            g14: 'Cannon',
            g512: 'Bissell (5–8) · Cannon (9–12)',
          },
        },
        {
          label: 'Named open house',
          cells: {
            jkk: 'Oct 14, 2026, 9:30 a.m.',
            g14: 'None published — book a visit',
            g512: 'Nov 5, 2026, 1:30 p.m. (grades 9–12)',
          },
        },
        {
          label: 'Constant in every band',
          cells: {
            all: '$100 application fee · the Veracross portal and its personalized checklist · a meeting with a grade-appropriate faculty member · a 10% enrollment deposit credited toward tuition',
          },
        },
      ],
    },

    contacts: {
      kicker: 'CONTACTS',
      title: 'The admissions office',
      address: '1440 Carmel Road, Charlotte, NC 28226 · main 704-943-4530',
      people: [
        { name: 'Robin Riggins', detail: 'Associate Director of Admissions · 704-943-4532' },
        { name: 'Molly Philips', detail: 'Assistant Director of Admissions · 704-943-4534' },
        { name: 'Tianna Butler', detail: 'Assistant Director of Admissions · 704-943-4533' },
        { name: 'Cheryl Miller', detail: 'Administrative Assistant · 704-943-4530' },
        { name: 'McKenzie Irwin', detail: 'Admissions Assistant · 704-943-4595' },
      ],
    },

    checklist: {
      portalNote: 'Portal: Veracross · charlottecountryday.org',
      aidPanel: {
        kicker: 'In parallel — the financial aid clock',
        items: [
          'Complete the Clarity financial-aid application ($65 fee) by Jan 15 — the Nov 1 deadline the school publishes alongside it applies to families already enrolled, not to prospective ones.',
          'Both custodial and non-custodial parents submit through Clarity. Awards are need-based only; there are no merit scholarships.',
          'Admission decisions are made separately from financial aid decisions, and any award is communicated with the enrollment contract. Families applying for aid pay a reduced deposit, refundable if the award is insufficient.',
        ],
      },
      contactPanel: {
        kicker: 'Questions — admissions office',
        lines: [
          'Admissions main — 704-943-4530 · admissions@charlottecountryday.org',
          '1440 Carmel Road, Charlotte, NC 28226 — Levine Center, first floor, Cannon Campus',
          'Bissell Campus (grades 5–8) — 5936 Green Rea Road, Charlotte, NC 28226 · 704-943-4800',
        ],
      },
      disclaimer:
        'Dates are the 2027–28 entry cycle as published on the charlottecountryday.org admissions pages (retrieved Aug 2026) and corroborated by the 2027–28 CAIS consortium brochure. Cycle dates shift year to year — verify against the live calendar before acting. Compiled by Charlotte School Compare; not affiliated with Charlotte Country Day School.',
    },

    sources: [
      {
        label:
          'charlottecountryday.org — admissions process: the six steps, entrance tests by band, the 2027–28 dates and calendar, the JK age cutoff and the $100 fee',
        url: 'https://www.charlottecountryday.org/admissions/admissions-process',
      },
      {
        label:
          'charlottecountryday.org — admissions FAQ: dates and deadlines including the JK/K teacher-recommendation and CAIS testing / classroom-visit lines, and the financial-aid answers',
        url: 'https://www.charlottecountryday.org/admissions/frequently-asked-questions',
      },
      {
        label:
          'charlottecountryday.org — tuition and financial aid: Clarity, the $65 fee, the Nov 1 / Jan 15 deadlines and the 10% enrollment deposit',
        url: 'https://www.charlottecountryday.org/admissions/tuition-financial-aid',
      },
      {
        label: 'charlottecountryday.org — meet our team: admissions staff, titles and direct lines',
        url: 'https://www.charlottecountryday.org/admissions/meet-our-team',
      },
      {
        label:
          'charlottecountryday.org — our campuses: Cannon houses JK–4 and 9–12, Bissell houses 5–8',
        url: 'https://www.charlottecountryday.org/admissions/our-campuses',
      },
      {
        label: 'Veracross — the inquiry and application portal',
        url: 'https://portals.veracross.com/charlottecountryday/form/inquiry-17/inquiry/account-lookup',
      },
      {
        label: 'Clarity — the financial-aid platform the school links',
        url: 'https://app.clarityapp.com/sign-up',
      },
      {
        label:
          '2027–28 CAIS brochure — the per-grade instrument (WPPSI-IV for Pre-K/K/Grade 1, WISC-V for rising Grades 2–4), the $300 fee, the age, retest and coaching rules, and the consortium-wide notification dates',
        url: 'https://www.charlottecountryday.org/fs/resource-manager/view/26c38483-1a56-4c11-aaa0-a4e7f465eb27',
      },
      {
        label:
          "Retrieved Aug 2026. Waitlist procedure, sibling/legacy/faculty-child preference, transfer and mid-year entry, whether late applications are considered on a rolling basis, international visa/I-20/SEVIS procedure, the Kindergarten birthday cutoff (only the JK one is published) and the 2028–29 dates aren't published on the pages reviewed — confirm directly with admissions.",
      },
    ],
  },
}
