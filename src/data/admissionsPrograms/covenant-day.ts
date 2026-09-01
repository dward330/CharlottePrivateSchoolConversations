// Covenant Day School — Admissions.
//
// Transcribed from the committed research file
// source-material/admissions/covenant-day/Covenant Day - Admissions -
// Grade-by-Grade Application Plans.md, which carries the provenance header, the
// eleven official source URLs and the record-level detail behind every figure
// below. The CAIS consortium detail it leans on is the same brochure documented
// for Country Day, in that school's "… - CAIS Testing Consortium.md"; Covenant
// Day is a listed member school.
//
// CYCLE: 2027–28, VERIFIED OPEN, AND THE SCHOOL'S OWN LABELS AGREE WITH ITS
// CONTENT. "Applications for the 2027-2028 school year open on September 8."
// Unlike Charlotte Country Day there is no header/content mislabel to work
// around, and unlike Charlotte Christian there is no stale sheet to exclude —
// the Key Dates calendar, /admissions/process and /admissions/apply-to-cds all
// carry the same 2027–28 sequence. Do not port either school's reconciliation
// reasoning onto this card.
//
// `/admissions/admission-experience` NOW RETURNS HTTP 404. A prior research
// pass found it serving prior-cycle 2026-27 dates (a Dec 31 JK/K deadline,
// Apr 2 decisions, "March 1, 2026 … June 1, 2026" age cutoffs). The school
// removed the page, so the conflict resolved itself and there is no live source
// of stale dates. NEVER restore a date from it, from a cache, or from an
// archived copy — that is the cycle rule.
//
// THE SIX ADMISSIONS STEPS ARE JAVASCRIPT-RENDERED AND UNREADABLE BY PLAIN
// FETCH. /admissions/process is an accordion that returns NO body text to
// curl — "WPPSi", "WISC V" and "Little Lions" appear ZERO times in the served
// HTML of every admissions page. Every step detail below came from rendering
// that page with Playwright and force-opening each accordion panel. A later
// pass that re-fetches the page plainly will find nothing and may conclude the
// instruments are unpublished; they are not, and the research file records the
// method.
//
// THREE BANDS, AND TWO BOUNDARIES THAT DO NOT COINCIDE — the same structural
// shape as Charlotte Christian, resolved differently because Covenant Day's
// deadline and instrument breaks are one grade apart in the OTHER direction:
//   - the DEADLINE boundary is K → Grade 1 (JK/K apply Jan 2; grades 1–11 apply
//     Jan 15 and decide on the later Apr 9 track), and
//   - the INSTRUMENT boundary falls TWICE INSIDE the Grades 1–5 band — WPPSi
//     through Grade 1, WISC V for Grades 2–4, the ISEE from Grade 5.
// So Grade 5 shares the ISEE with the 6–11 band while keeping the 1–5 band's
// one-on-one on-campus assessment and its own calendar. Three bands state both
// facts because the deadline break is what the school itself uses to split its
// priority dates, and the instrument changes are carried inside the Grades 1–5
// screening step.
//
// GRADE 6 IS A SUB-STEP, NOT A FOURTH BAND. It takes the same ISEE and the same
// calendar as grades 7–11; what it adds is a math and English assessment on top
// of the shadow morning. A fourth band would imply a separate calendar it does
// not have.
//
// ⚠️ GRADE 12 ENTRY IS NOT PUBLISHED. Covenant Day is a JK–12 school, but every
// published deadline, decision date and testing reference addresses "JK/K" and
// "grades 1-11" only. The bands are 6–11, NEVER 6–12, and the card says so
// rather than leaving a reader to assume. Do not "correct" this to 6–12 from
// the school's JK–12 grade span.
//
// THE SCHOOL'S OWN INSTRUMENT SPELLINGS ARE REPRODUCED AS PUBLISHED. It writes
// "Weschler" (not Wechsler), "WPPSi" (not WPPSI-IV) and "WISC V" (not WISC-V).
// The CAIS consortium brochure itself uses the standard forms; the discrepancy
// is the school's, and a figure or name is quoted as its source publishes it.
// Do not normalize these.
//
// NOTE FOR EDITORS: `rules[].text` is rendered RAW — `<strong>{title}</strong>
// {text}` in AdmissionsProgram.tsx — so it is the one prose field on this card
// with NO markdown support. A `**bold**` span here ships as literal asterisks.
// `Emphasized` covers steps[].detail, watchOuts[].text and aid.text, but not
// this, and not deadlines[].value/label.
//
// WATCH-OUTS ARE `[]` IN ALL THREE BANDS, BY DECISION (2026-09-01), following
// the endpoint the two most recently reviewed cards reached — Charlotte
// Christian and Charlotte Latin both ship empty arrays after the user asked for
// them gone. They are EMPTY BY DECISION, not by a gap in the research. Do NOT
// read them as unresearched and backfill them. Every fact they would have
// carried is already in `steps[].detail` and each band's `checklistCallout`:
// the Jan 2 / Jan 15 deadline break, the twice-moving instrument, the
// non-priority consequence, the professing-Christian requirement and the
// unpublished Grade 12 entry. The research file keeps the full record
// regardless of what this card presents.
//
// NO URL-LESS TRAILING NOTE IN `sources` (2026-09-01), following PR #258 —
// prose paragraphs in a row of citation links read as broken links. The
// NOT-PUBLISHED register (Grade 12 entry, Come See Covenant times, waitlist and
// sibling/legacy preference, transfer and mid-year entry, F-1/I-20 and
// English-proficiency requirements, any reduced deposit for aid applicants, the
// FACTS aid application fee, 2027–28 tuition) lives in this header and in the
// research file. Each gap that a parent would act on is also named at the point
// it matters — the aid strip says the fee and reduced deposit are unpublished,
// and the Grades 6–11 decision step names the Grade 12 gap.
//
// NEVER NARRATE THE CAIS BROCHURE — standing editorial rule (user, PR #261).
// The school's own page says "Please refer to the CAIS brochure for all details
// and a list of psychologists", which invites a sentence describing what a
// document contains. We speak as the party holding the information: the card
// states that the parent schedules the test directly with a qualified
// psychologist, and does not tell a parent about a brochure instead of telling
// them the fact.
//
// THE PROFESSING-CHRISTIAN REQUIREMENT SHIPS AS A PUBLISHED ADMISSIONS GATE,
// and is the sharpest contrast with Charlotte Christian, where the research
// found NO faith-based application component at all. Covenant Day publishes one
// outright — "An essential component for admission is the requirement that one
// or both parents be professing Christians" — verified at the parent interview,
// with a pastor's recommendation required at every grade JK–11. The REQUIREMENT
// is reported in every band's interview step; the school's statement of faith
// itself is deliberately NOT transcribed into the app.
//
// TUITION FIGURES ARE DELIBERATELY ABSENT. They belong to the Financial Aid &
// Tuition area, which owns them; the research file carries the 2026–27 chart
// for provenance. The aid strip carries only what an applicant must DO.
//
// CONTACTS: four admissions staff, re-verified 2026-09-01 against
// /admissions/meet-the-team. A prior pass listed three and missed Baird
// Yasenchok. Individual email addresses render as "EMAIL" mailto links rather
// than visible text, so only the shared admissions@covenantday.org and
// cshortt@covenantday.org (published on the International Program page) are
// given. Do not synthesize the rest from a name pattern.

import type { AdmissionsProgram } from '../admissionsPrograms.ts'

export const covenantDay: AdmissionsProgram = {
  guide: {
    headline:
      "Pick your child's entry point and the guide personalizes: the six published steps in order, the 2027–28 deadlines, and the screening for that band — plus a printable checklist to take with you. One spine for every applicant, but the deadline breaks at Kindergarten→1 while the test changes twice inside Grades 1–5.",
    cycle: '2027–28 entry cycle',

    stats: [
      { value: '3', label: 'entry bands — JK/K, Grades 1–5, Grades 6–11' },
      {
        value: 'Jan 2, 2027',
        label: 'JK/K priority deadline — two weeks ahead of everyone else',
      },
      { value: 'Jan 15, 2027', label: 'Grades 1–11 priority deadline' },
      { value: '$100', label: 'application fee — non-refundable, every grade' },
    ],

    rules: [
      {
        title: 'One online application.',
        text: 'Everything runs through the school\'s FACTS/RenWeb portal: inquire, apply, pay the $100 fee, and give the email addresses that send the recommendation forms and request your child\'s transcript — all from the one form.',
      },
      {
        title: 'The dates are for priority, and admissions roll after them.',
        text: 'Covenant Day maintains rolling admissions, but Jan 2 for JK/K and Jan 15 for grades 1–11 are what secure a first-round decision. A later application is still considered if space allows — and until priority decisions are complete on April 9, the school will not conduct on-campus testing, shadow visits or parent interviews for it.',
      },
    ],

    spineNote:
      'One shared spine in every band — arrange a visit → submit the online application with the $100 fee → complete the admissions screening → have the recommendation forms sent → meet the school at the parent interview and an on-campus visit → receive the decision and return the contract. What changes is which screening instrument your child sits, what the on-campus visit looks like, whether the student is interviewed, and which calendar you are on.',

    bands: [
      {
        key: 'jkk',
        label: 'JK / Kindergarten',
        sublabel: 'WPPSi · Little Lions Assessment',
        title: 'Junior Kindergarten & Kindergarten',
        deadlines: [
          { value: 'Jan 2, 2027', label: 'application + $100 fee due' },
          { value: 'Feb 1, 2027', label: 'supporting documents + CAIS testing due' },
          { value: 'Feb 26, 2027', label: 'priority decision emailed — 4 p.m.' },
          { value: 'Mar 5, 2027', label: 'enrollment contract due — noon' },
        ],
        steps: [
          {
            title: 'Arrange a visit',
            tag: 'Fall 2026',
            tagKind: 'outline',
            detail:
              'Applications and tours open **September 8, 2026**. The school also runs two **Come See Covenant** open events — **October 29, 2026** for JK–5 and **November 12, 2026** for JK–11. Neither event\'s time is published on the Key Dates list; schedule a personal campus visit through the admissions page if the dates do not work.',
          },
          {
            title: 'Submit the application + $100 fee',
            tag: 'by Jan 2',
            tagKind: 'accent',
            detail:
              'Two weeks earlier than every other grade, and the whole JK/K calendar runs ahead with it. The fee is **non-refundable** and is charged per application. Age guidance is published: a child **should be four years old by March 1, 2027** to apply for JK, and **five years old by June 1, 2027** to apply for kindergarten. Placement between the two is the Admissions Office\'s decision, weighing the birthday alongside an individual assessment of developmental readiness — social, emotional, physical and academic.',
          },
          {
            title: 'Book the WPPSi screening',
            tag: 'by Feb 1',
            tagKind: 'accent',
            detail:
              'JK and Kindergarten applicants sit the **Weschler Preschool and Primary Scale of Intelligence (WPPSi)** — the school\'s own spelling — administered by a qualified psychologist. **You schedule this yourself, directly with the psychologist**; the school does not arrange it, and the fee is paid to the psychologist rather than to Covenant Day. Book early: it shares the **February 1, 2027** deadline with your supporting documents.',
          },
          {
            title: 'Have the recommendation forms sent',
            tag: 'by Feb 1',
            tagKind: 'outline',
            detail:
              'Two are required at this band: a **preschool teacher recommendation** and a **pastor\'s recommendation** — the pastor\'s form is required at every grade from JK through 11. Both are completed online, so the accurate email addresses you enter in the application are what trigger them. If you give a registrar\'s email to request records, note that the release is broad: it covers the complete transcript, IQ and achievement test scores, any psychological evaluations, behavior and attendance records, and health records.',
          },
          {
            title: 'The parent interview and the Little Lions Assessment',
            tag: 'after applying',
            tagKind: 'outline',
            detail:
              'The admissions office sends a link to schedule your interview with the Admissions Director. **An essential component for admission is the requirement that one or both parents be professing Christians**, evidenced by their confession of faith in Jesus Christ alone as Savior; the interview verifies that testimony and confirms agreement with the school\'s statement of faith. Your child\'s visit is the **Little Lions Assessment**, taken with a small group of other JK/K applicants — there is no student interview at this age.',
          },
          {
            title: 'Decision → contract',
            tag: 'Feb 26 → Mar 5',
            tagKind: 'accent',
            detail:
              'Priority decisions are emailed on **February 26, 2027 at 4:00 p.m.** — six weeks ahead of the Grades 1–11 track — and the signed contract is due **March 5, 2027 by noon**. Enrollment carries a **$1,000 non-refundable deposit** per student, applied toward the year\'s tuition.',
          },
        ],
        watchOuts: [],
        checklistCallout: {
          lead: 'Your deadline is Jan 2.',
          text: 'Junior Kindergarten and Kindergarten apply two weeks ahead of every other grade and hear back six weeks earlier, on February 26. Supporting documents and the WPPSi screening are both due February 1, and you book that test yourself with a qualified psychologist. Applying after January 2 means no on-campus testing, shadow visit or parent interview until priority decisions are complete on April 9.',
        },
        checklistRows: [
          {
            action: 'Arrange a campus visit or attend Come See Covenant',
            detail: 'Applications and tours open Sept 8, 2026. JK–5 event Oct 29; JK–11 event Nov 12.',
            due: 'Fall 2026',
          },
          {
            action: 'Submit the online application and pay the $100 fee',
            detail: 'Two weeks ahead of the Grades 1–11 deadline. Non-refundable, per application.',
            due: 'Jan 2, 2027',
          },
          {
            action: 'Confirm the age guidance for JK or Kindergarten',
            detail: 'Four by Mar 1, 2027 for JK; five by Jun 1, 2027 for K. Placement also weighs readiness.',
            due: 'Jan 2, 2027',
          },
          {
            action: 'Book and complete the WPPSi screening',
            detail: 'Scheduled by you, directly with a qualified psychologist.',
            due: 'Feb 1, 2027',
          },
          {
            action: 'Upload the supporting documents',
            detail: 'Due on the same date as the CAIS testing for this band.',
            due: 'Feb 1, 2027',
          },
          {
            action: 'Request the preschool teacher and pastor recommendations',
            detail: 'Sent online to the email addresses you enter in the application.',
            due: 'Feb 1, 2027',
          },
          {
            action: 'Attend the parent interview',
            detail: 'Verifies the professing-Christian requirement and agreement with the statement of faith.',
            due: 'After applying',
          },
          {
            action: 'Bring your child to the Little Lions Assessment',
            detail: 'A small-group visit with other JK/K applicants. No student interview at this age.',
            due: 'After applying',
          },
          {
            action: 'Watch for the priority decision email',
            detail: 'Emailed at 4:00 p.m., six weeks ahead of the Grades 1–11 track.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Return the enrollment contract',
            detail: '$1,000 non-refundable deposit per student, applied toward tuition; noon deadline.',
            due: 'Mar 5, 2027',
          },
        ],
      },
      {
        key: 'g15',
        label: 'Grades 1–5',
        sublabel: 'WPPSi → WISC V → ISEE by grade',
        title: 'Grades 1–5',
        deadlines: [
          { value: 'Jan 15, 2027', label: 'application + $100 fee due' },
          { value: 'Feb 26, 2027', label: 'supporting documents due' },
          { value: 'Apr 9, 2027', label: 'priority decision emailed — 4 p.m.' },
          { value: 'Apr 16, 2027', label: 'enrollment contract due — noon' },
        ],
        steps: [
          {
            title: 'Arrange a visit',
            tag: 'Fall 2026',
            tagKind: 'outline',
            detail:
              'Applications and tours open **September 8, 2026**. Both **Come See Covenant** events cover this band — **October 29, 2026** for JK–5 and **November 12, 2026** for JK–11 — and neither carries a published time. A personal campus visit can be scheduled through the admissions page instead.',
          },
          {
            title: 'Submit the application + $100 fee',
            tag: 'by Jan 15',
            tagKind: 'accent',
            detail:
              'The Grades 1–11 priority deadline, two weeks after the JK/K one, with a decision that follows six weeks later. The fee is **non-refundable** and is charged per application.',
          },
          {
            title: 'Book the screening — and check which test your grade sits',
            tag: 'by Feb 26',
            tagKind: 'accent',
            detail:
              '**The instrument changes twice inside this band.** Grade 1 applicants sit the **Weschler Preschool and Primary Scale of Intelligence (WPPSi)** with the JK/K applicants; **Grades 2–4** sit the **Weschler Intelligence Scale for Children (WISC V)**; and **Grade 5** sits the **Independent School Entrance Exam (ISEE)** alongside the middle and high school applicants. The WPPSi and WISC V are administered by a qualified psychologist and **you schedule the appointment yourself**. For Grade 5, Covenant Day administers the ISEE on campus on **December 12, 2026**, and families may also register through the ISEE\'s own site; **all Middle and High School testing must be completed and submitted by February 26, 2027**. The spellings above are the school\'s own.',
          },
          {
            title: 'Have the recommendation forms sent',
            tag: 'by Feb 26',
            tagKind: 'outline',
            detail:
              'Two are required at this band: a **lower school teacher recommendation** and a **pastor\'s recommendation**, which is required at every grade from JK through 11. Both are completed online from the email addresses you enter in the application. Entering a registrar\'s email to request records authorizes a broad release — the complete transcript, IQ and achievement test scores, any psychological evaluations, behavior and attendance records, and health records.',
          },
          {
            title: 'The parent interview and the on-campus assessment',
            tag: 'after applying',
            tagKind: 'outline',
            detail:
              'The admissions office sends a link to schedule your interview with the Admissions Director. **An essential component for admission is the requirement that one or both parents be professing Christians**, evidenced by their confession of faith in Jesus Christ alone as Savior; the interview verifies that testimony and confirms agreement with the school\'s statement of faith. Your child works **one-on-one with an academic resource therapist** to measure reading, math and writing proficiency — not a shadow day, and there is no student interview until Grade 6.',
          },
          {
            title: 'Decision → contract',
            tag: 'Apr 9 → Apr 16',
            tagKind: 'accent',
            detail:
              'Priority decisions are emailed on **April 9, 2027 at 4:00 p.m.** and the signed contract is due **April 16, 2027 by noon**. Enrollment carries a **$1,000 non-refundable deposit** per student, applied toward the year\'s tuition.',
          },
        ],
        watchOuts: [],
        checklistCallout: {
          lead: 'Check which test your grade sits — it changes twice inside this band.',
          text: 'Grade 1 takes the WPPSi with the JK/K applicants, Grades 2–4 take the WISC V, and Grade 5 takes the ISEE with the middle and high school applicants. Applications are due January 15 and decisions release April 9. Applying after January 15 means no on-campus assessment or parent interview until priority decisions are complete on April 9.',
        },
        checklistRows: [
          {
            action: 'Arrange a campus visit or attend Come See Covenant',
            detail: 'Applications and tours open Sept 8, 2026. JK–5 event Oct 29; JK–11 event Nov 12.',
            due: 'Fall 2026',
          },
          {
            action: 'Submit the online application and pay the $100 fee',
            detail: 'The Grades 1–11 deadline, two weeks after the JK/K one. Non-refundable.',
            due: 'Jan 15, 2027',
          },
          {
            action: 'Book and complete the screening for your grade',
            detail: 'Grade 1 WPPSi · Grades 2–4 WISC V · Grade 5 ISEE. You book the psychologist yourself.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Grade 5 only — sit the ISEE',
            detail: 'Covenant Day hosts it on campus Dec 12, 2026; you may also register through the ISEE site.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Upload the supporting documents',
            detail: 'Due six weeks before the decision releases.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Request the lower school teacher and pastor recommendations',
            detail: 'Sent online to the email addresses you enter in the application.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Attend the parent interview',
            detail: 'Verifies the professing-Christian requirement and agreement with the statement of faith.',
            due: 'After applying',
          },
          {
            action: 'Bring your child for the one-on-one academic assessment',
            detail: 'With an academic resource therapist: reading, math and writing proficiency.',
            due: 'After applying',
          },
          {
            action: 'Watch for the priority decision email',
            detail: 'Emailed at 4:00 p.m. on the Grades 1–11 track.',
            due: 'Apr 9, 2027',
          },
          {
            action: 'Return the enrollment contract',
            detail: '$1,000 non-refundable deposit per student, applied toward tuition; noon deadline.',
            due: 'Apr 16, 2027',
          },
        ],
      },
      {
        key: 'g611',
        label: 'Grades 6–11',
        sublabel: 'ISEE · shadow day + interview',
        title: 'Grades 6–11',
        deadlines: [
          { value: 'Jan 15, 2027', label: 'application + $100 fee due' },
          { value: 'Feb 26, 2027', label: 'supporting documents + all testing due' },
          { value: 'Apr 9, 2027', label: 'priority decision emailed — 4 p.m.' },
          { value: 'Apr 16, 2027', label: 'enrollment contract due — noon' },
        ],
        steps: [
          {
            title: 'Arrange a visit',
            tag: 'Fall 2026',
            tagKind: 'outline',
            detail:
              'Applications and tours open **September 8, 2026**. The **Come See Covenant** event covering these grades is **November 12, 2026** (JK–11); no time is published for it. A personal campus visit can be scheduled through the admissions page instead.',
          },
          {
            title: 'Submit the application + $100 fee',
            tag: 'by Jan 15',
            tagKind: 'accent',
            detail:
              'The Grades 1–11 priority deadline. The fee is **non-refundable** and is charged per application. **Grade 12 entry is not published**: every deadline, decision date and testing reference the school publishes addresses JK/K and grades 1–11, so a rising senior should contact the admissions office rather than plan around these dates.',
          },
          {
            title: 'Sit the ISEE',
            tag: 'by Feb 26',
            tagKind: 'accent',
            detail:
              'Every applicant from Grade 5 upward takes the **Independent School Entrance Exam (ISEE)**, which measures verbal and quantitative ability, mathematics, reading comprehension and writing. Covenant Day administers it on campus on **December 12, 2026**; families may also register for another sitting through the ISEE\'s own site. **All Middle and High School testing must be completed and submitted by February 26, 2027** — this is a submission deadline, not just a test date, so a late sitting risks missing it.',
          },
          {
            title: 'Have the recommendation forms sent',
            tag: 'by Feb 26',
            tagKind: 'outline',
            detail:
              'Four are required at this band — more than at any younger grade: a **math teacher**, an **English teacher**, a **principal or school counselor**, and a **pastor**, whose recommendation is required at every grade from JK through 11. All are completed online from the email addresses you enter in the application. Entering a registrar\'s email to request records authorizes a broad release — the complete transcript, IQ and achievement test scores, any psychological evaluations, behavior and attendance records, and health records.',
          },
          {
            title: 'The parent interview, the shadow day and the student interview',
            tag: 'after applying',
            tagKind: 'outline',
            detail:
              'The admissions office sends a link to schedule your interview with the Admissions Director. **An essential component for admission is the requirement that one or both parents be professing Christians**, evidenced by their confession of faith in Jesus Christ alone as Savior; the interview verifies that testimony and confirms agreement with the school\'s statement of faith. **This is the first band where the student is interviewed too.** Grades 7–11 applicants spend a morning shadowing a student in the middle or high school, have lunch with their peers, and meet an admissions staff member. **Grade 6 applicants do all of that and also take a math and English assessment** during the visit — the one extra step at the bottom of this band.',
          },
          {
            title: 'Decision → contract',
            tag: 'Apr 9 → Apr 16',
            tagKind: 'accent',
            detail:
              'Priority decisions are emailed on **April 9, 2027 at 4:00 p.m.** and the signed contract is due **April 16, 2027 by noon**. Enrollment carries a **$1,000 non-refundable deposit** per student, applied toward the year\'s tuition.',
          },
        ],
        watchOuts: [],
        checklistCallout: {
          lead: 'This is the band with a student interview — and Grade 6 has one extra step.',
          text: 'Every applicant from Grade 6 up shadows a student for a morning and meets an admissions staff member; Grade 6 also takes a math and English assessment during that visit. Four recommendation forms are required, more than at any younger grade, and all Middle and High School testing must be submitted by February 26 — not merely taken by then.',
        },
        checklistRows: [
          {
            action: 'Arrange a campus visit or attend Come See Covenant',
            detail: 'Applications and tours open Sept 8, 2026. The JK–11 event is Nov 12.',
            due: 'Fall 2026',
          },
          {
            action: 'Submit the online application and pay the $100 fee',
            detail: 'The Grades 1–11 deadline. Grade 12 is not published as an entry point.',
            due: 'Jan 15, 2027',
          },
          {
            action: 'Register for and sit the ISEE',
            detail: 'Covenant Day hosts it on campus Dec 12, 2026; you may also register through the ISEE site.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Submit the ISEE scores',
            detail: 'A submission deadline, not just a test date — a late sitting risks missing it.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Upload the supporting documents',
            detail: 'Due six weeks before the decision releases.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Request all four recommendations',
            detail: 'Math teacher, English teacher, principal or counselor, and pastor.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Attend the parent interview',
            detail: 'Verifies the professing-Christian requirement and agreement with the statement of faith.',
            due: 'After applying',
          },
          {
            action: 'Schedule your child’s shadow day',
            detail: 'A morning shadowing a student, lunch with peers, and a meeting with admissions.',
            due: 'After applying',
          },
          {
            action: 'Grade 6 only — take the math and English assessment',
            detail: 'Sat during the shadow morning, on top of the ISEE.',
            due: 'After applying',
          },
          {
            action: 'Watch for the priority decision email',
            detail: 'Emailed at 4:00 p.m. on the Grades 1–11 track.',
            due: 'Apr 9, 2027',
          },
          {
            action: 'Return the enrollment contract',
            detail: '$1,000 non-refundable deposit per student, applied toward tuition; noon deadline.',
            due: 'Apr 16, 2027',
          },
        ],
      },
    ],

    aid: {
      title: 'Running in parallel: the financial-aid clock',
      text: 'Aid is **need-based** and runs through **FACTS**, with **a new application required each year**. There is a precondition unique among the Charlotte schools: **families must first provide proof of application for the NC Opportunity Scholarship** to be eligible for aid from Covenant Day. File the aid application **concurrently with the admissions application** rather than after a decision. Enrollment carries a **$1,000 non-refundable deposit** per student, applied toward tuition; **the FACTS application fee and any reduced deposit for aid applicants are not published**.',
      button: 'Financial Aid & Tuition',
    },

    comparison: {
      kicker: 'CROSS-BAND',
      title: 'Exactly what changes between bands',
      rows: [
        {
          label: 'Application due',
          cells: {
            jkk: 'Jan 2, 2027',
            g15: 'Jan 15, 2027',
            g611: 'Jan 15, 2027',
          },
        },
        {
          label: 'Screening instrument',
          cells: {
            jkk: 'WPPSi — booked with a psychologist',
            g15: 'Grade 1 WPPSi · Grades 2–4 WISC V · Grade 5 ISEE',
            g611: 'ISEE — hosted on campus Dec 12, 2026',
          },
        },
        {
          label: 'On-campus visit',
          cells: {
            jkk: 'Little Lions Assessment, in a small group',
            g15: 'One-on-one with an academic resource therapist',
            g611: 'Shadow morning, lunch with peers, admissions meeting',
          },
        },
        {
          label: 'Student interview',
          cells: {
            jkk: 'No',
            g15: 'No',
            g611: 'Yes — the first band where the student is interviewed',
          },
        },
        {
          label: 'Recommendation forms',
          cells: {
            jkk: 'Preschool teacher + pastor',
            g15: 'Lower school teacher + pastor',
            g611: 'Math + English + principal/counselor + pastor',
          },
        },
        {
          label: 'Supporting documents due',
          cells: {
            jkk: 'Feb 1, 2027 — with the CAIS testing',
            g15: 'Feb 26, 2027',
            g611: 'Feb 26, 2027 — all testing submitted by this date',
          },
        },
        {
          label: 'Band-only requirement',
          cells: {
            jkk: 'Four by Mar 1, 2027 for JK; five by Jun 1, 2027 for K',
            g15: 'The instrument changes twice inside the band',
            g611: 'Grade 6 adds a math and English assessment to the shadow day',
          },
        },
        {
          label: 'Priority decision emailed',
          cells: {
            jkk: 'Feb 26, 2027, 4:00 p.m.',
            g15: 'Apr 9, 2027, 4:00 p.m.',
            g611: 'Apr 9, 2027, 4:00 p.m.',
          },
        },
        {
          label: 'Contract due',
          cells: {
            jkk: 'Mar 5, 2027, noon',
            g15: 'Apr 16, 2027, noon',
            g611: 'Apr 16, 2027, noon',
          },
        },
        {
          label: 'Grade 12 entry',
          cells: {
            all: 'Not published as an entry point. The school is JK–12, but every published deadline, decision date and testing reference addresses JK/K and grades 1–11 only — contact the admissions office about a rising senior.',
          },
        },
        {
          label: 'Constant in every band',
          cells: {
            all: 'A $100 non-refundable application fee · the FACTS/RenWeb online application · a parent interview with the Admissions Director, at which one or both parents must be professing Christians · a pastor’s recommendation · a $1,000 non-refundable enrollment deposit at contract · rolling admissions after the priority dates, with no on-campus testing, shadow visit or parent interview for a non-priority applicant unless space remains after April 9',
          },
        },
      ],
    },

    contacts: {
      kicker: 'CONTACTS',
      title: 'The admissions office',
      address:
        '800 Fullwood Lane, Matthews, NC 28105 · admissions 704-847-2385 · admissions@covenantday.org',
      people: [
        { name: 'Jennifer Billiard', detail: 'Admissions Director · 704-814-1074' },
        { name: 'Casey Parrish', detail: 'Admissions Associate · 704-814-1090' },
        {
          name: 'Cass Shortt',
          detail:
            'Admissions Associate and International Program Coordinator · 704-814-1077 · cshortt@covenantday.org',
        },
        { name: 'Baird Yasenchok', detail: 'Admissions Assistant · 704-708-6127' },
        {
          name: 'Christen Marshall',
          detail: 'Student Accounts Coordinator, financial aid · 704-708-6102',
        },
      ],
    },

    checklist: {
      portalNote: 'Portal: FACTS/RenWeb · admissions-parent.renweb.com — district code CDS-NC',
      aidPanel: {
        kicker: 'In parallel — the financial aid clock',
        items: [
          'Aid is need-based and runs through FACTS, and a new application is required each year — an award does not carry forward.',
          'Before you can be considered, you must provide proof of application for the NC Opportunity Scholarship. Covenant Day accepts the NC Opportunity and ESA+ Scholarships, administered by the North Carolina State Education Assistance Authority.',
          'Complete the aid application concurrently with the admissions application rather than waiting for a decision.',
          'Enrollment carries a $1,000 non-refundable deposit per student, applied toward the year’s tuition.',
          'The FACTS application fee and any reduced deposit for aid applicants are not published — confirm both with the student accounts office.',
        ],
      },
      contactPanel: {
        kicker: 'Questions — admissions office',
        lines: [
          'Admissions — 704-847-2385 · admissions@covenantday.org',
          '800 Fullwood Lane, Matthews, NC 28105',
          'Financial aid — Christen Marshall, Student Accounts Coordinator · 704-708-6102',
          'International applicants — Cass Shortt · 704-814-1077 · cshortt@covenantday.org',
        ],
      },
      disclaimer:
        'Dates are the 2027–28 entry cycle as published on covenantday.org and retrieved in September 2026 — the Key Dates calendar, the six Admissions Steps and the apply page, which agree with one another. Cycle dates shift year to year — verify against the live calendar before acting. Compiled by Charlotte School Compare; not affiliated with Covenant Day School.',
    },

    sources: [
      {
        label:
          'covenantday.org — admissions Key Dates: the full 2027–28 sequence, from applications opening Sept 8, 2026 through the Apr 16, 2027 contract deadline, including both Come See Covenant events and the Dec 12, 2026 on-campus ISEE',
        url: 'https://www.covenantday.org/admissions',
      },
      {
        label:
          'covenantday.org — the six Admissions Steps in full: the per-grade screening instruments, the recommendation forms named by grade, the interview and shadow-day detail, the rolling-admissions statement and the priority footnote',
        url: 'https://www.covenantday.org/admissions/process',
      },
      {
        label:
          'covenantday.org — apply to CDS: applications open Sept 8, the Jan 2 and Jan 15 priority deadlines, the consequence for a non-priority application, and the note that most grades are at capacity for 2026–27',
        url: 'https://www.covenantday.org/admissions/apply-to-cds',
      },
      {
        label:
          'covenantday.org — JK and Kindergarten: the age guidance of four by Mar 1, 2027 and five by Jun 1, 2027, and the developmental-readiness factors behind placement',
        url: 'https://www.covenantday.org/admissions/jk-and-kindergarten-clone',
      },
      {
        label:
          'covenantday.org — admissions FAQs: the criteria the Admissions Committee weighs, the guidance on who may complete the pastor’s recommendation, and the divisions and class sizes',
        url: 'https://www.covenantday.org/admissions/faqs',
      },
      {
        label:
          'covenantday.org — tuition and financial aid: the $1,000 enrollment deposit, need-based aid through FACTS, the NC Opportunity Scholarship precondition, and the ESA+ and NCSEAA participation',
        url: 'https://www.covenantday.org/admissions/tuition-financial-aid',
      },
      {
        label:
          'covenantday.org — meet the team: the four admissions staff with their titles and direct phone numbers',
        url: 'https://www.covenantday.org/admissions/meet-the-team',
      },
      {
        label:
          'covenantday.org — international program: the separate international application for an F-1 visa student, the host-family model, and the coordinator’s contact details',
        url: 'https://www.covenantday.org/admissions/international-program',
      },
      {
        label: 'covenantday.org — visit CDS: scheduling a personal campus visit',
        url: 'https://www.covenantday.org/admissions/visit-cds',
      },
      {
        label: 'covenantday.org — Come See Covenant: the two open events for 2026–27',
        url: 'https://www.covenantday.org/admissions/comeseecovenant',
      },
      {
        label:
          'FACTS/RenWeb — the inquiry and application portal, district code CDS-NC (login-gated)',
        url: 'https://admissions-parent.renweb.com/en-us/inquire?districtCode=CDS-NC&memberId=13271',
      },
    ],
  },
}
