// Charlotte Christian School — Admissions.
//
// Transcribed from the committed research file
// source-material/admissions/charlotte-christian/Charlotte Christian -
// Admissions - Grade-by-Grade Application Plans.md, which carries the
// provenance header, the source URLs and the record-level detail behind every
// figure below. The CAIS consortium detail it leans on is the same brochure
// documented for Country Day, in that school's "… - CAIS Testing Consortium.md".
//
// CYCLE: 2026–27, and THE SCHOOL'S OWN LABELS ARE CORRECT. This is the exact
// opposite of Charlotte Country Day, whose section headers say "2026-27" over
// 2027–28 content. Charlotte Christian labels its documents "2026-27" and means
// it: the label names the school year being applied for, and every deadline
// inside falls in the 2026–27 admission season, i.e. calendar 2027. Do NOT port
// Country Day's mislabel reasoning onto this card, and do NOT "correct" these
// headers — see the cycle audit in the research file.
//
// THREE SOURCES DISAGREE, AND ONLY ONE IS CURRENT:
//   1. The downloadable PDFs (refreshed 2026-08-26) — AUTHORITATIVE, and what
//      this card ships.
//   2. The live /admissions/apply page — STALE. Its inline HTML still describes
//      the prior, closed cycle (a Dec 31, 2025 JK/K deadline, Jan 15 2026 for
//      grades 1–12, decisions Feb 27 2026 / Apr 2 2026). It is useful only for
//      its PDF links, portal links and TOEFL/ISEE pointers.
//   3. The financial-aid PDF — ALSO STALE, and the trap here. It is named
//      "2026-27financialaid.pdf" and it gives Feb 2 / Mar 2 due dates, so it
//      reads as current. It is not: its Finalsite version stamp (v1769003003)
//      dates it 2026-01-21, while the calendar, all three checklists and the
//      tuition chart carry v17878006xx/v1787800765/v1787800806 stamps dating
//      them 2026-08-26. Its notification dates (Feb 27 2026 / Apr 2 2026) match
//      the STALE apply page, not the current calendar (Feb 26 2027 / Apr 9
//      2027). The school refreshed everything except this one sheet.
//
//      THEREFORE the current-cycle aid deadline is NOT PUBLISHED, and this card
//      ships the aid STRUCTURE with the date named as unpublished. Never carry
//      Feb 2 / Mar 2 forward as if they were current — that is the cycle rule.
//
// A TYPO IN THE SCHOOL'S OWN CALENDAR: it prints "Sunday, Feb. 1, 2026 — JK-K
// File Materials Due / CAIS Testing Due - JK/K". The weekday is internally
// consistent (Feb 1 2026 was a Sunday), which is what makes it convincing, but
// the date is out of sequence with every line around it (Jan 2 2027 → Feb 1
// 2026 → Feb 26 2027) and the JK–Grade 1 checklist gives the year outright:
// "CAIS testing is due by February 1, 2027." This card ships 2027.
//
// FOUR BANDS FROM THREE DOCUMENTS — the structural finding, and the one thing
// most likely to be "simplified" back into a bug. The school publishes three
// application-process PDFs (JK–Grade 1, Grades 2–4, Grades 5–12), but they do
// not map 1:1 onto entry bands, because TWO BOUNDARIES SIT IN DIFFERENT PLACES:
//   - the DEADLINE boundary is K → Grade 1 (JK/K apply Jan 2; grades 1–12 apply
//     Jan 15, and decide on the later Apr 9 track), and
//   - the ASSESSMENT boundary is Grade 1 → Grade 2 (WPPSI-IV through Grade 1;
//     WISC-V from Grade 2).
// The JK–Grade 1 PDF therefore SPANS a deadline boundary — it carries both
// dates in one sentence — and Grade 1 shares its assessment with JK/K while
// sharing its calendar with grades 2–12. Shipping three bands would force one
// of those two facts to be stated wrongly, whichever three you picked.
//
// Every date this card ships is published, so no tile carries `unpublished`.
//
// TWO FIGURES THAT LOOK LIKE TYPOS AND ARE NOT:
//   - The JK/K teacher recommendation is due Jan 15, 2027 — two weeks AFTER
//     that band's own Jan 2 application deadline. Verbatim from the checklist.
//   - That same recommendation cannot be requested until AFTER November 1, so
//     the request window is bounded on both ends.
//
// NOTE FOR EDITORS: `rules[].text` is rendered RAW — `<strong>{title}</strong>
// {text}` in AdmissionsProgram.tsx — so it is the one prose field on this card
// with NO markdown support. A `**bold**` span here ships as literal asterisks.
// `Emphasized` covers steps[].detail, watchOuts[].text and aid.text, but not
// this, and not deadlines[].value/label.
//
// STATEMENT OF FAITH — FINDING ONLY (user's call, 2026-08-31). Charlotte
// Christian publishes a doctrinal Statement of Faith, but it governs the
// INSTITUTION, and nothing in the published admissions process requires an
// applicant family to affirm it: no pastoral or clergy reference, no
// church-membership requirement, no faith affirmation, and no faith question on
// the applicant questionnaire. That absence is the admissions-relevant fact and
// it ships as a watch-out. The doctrinal text itself is deliberately NOT
// transcribed into the app.
//
// The nondiscrimination statement quoted in the research file is NARROWER than
// Country Day's (race, color, national and ethnic origin only). Each school's
// own text is reported as published; they are never harmonized.
//
// CONTACTS: the roster was re-verified 2026-08-31 against
// /admissions/meet-the-team (note the spelling — /meet-the-admissions-team is a
// 404, and Country Day's /meet-our-team spelling does not work here). Five
// named staff, each with a title and a direct email; NO individual phone
// numbers or extensions are published for any of them, unlike Country Day. Do
// not synthesize extensions. A sixth name on that page, Ethan Walker ('27),
// "Admissions Prefect", is a STUDENT leadership position published with no
// contact details and is deliberately excluded from a staff-contact grid.
//
// The seven regional ISEE dates are in the research file. The card names
// Charlotte Christian's own hosted date and says the other CAIS schools' dates
// are interchangeable, rather than listing all seven — a list of seven dates in
// a step aimed at this school's applicants is more noise than signal.

import type { AdmissionsProgram } from '../admissionsPrograms.ts'

export const charlotteChristian: AdmissionsProgram = {
  guide: {
    headline:
      "Pick your child's entry point and the guide personalizes: the steps in order, the 2026–27 deadlines, and the testing for that band — plus a printable checklist to take with you. Three published documents, but four real processes: the application deadline breaks at Kindergarten→1 while the testing breaks a grade later, at 1→2.",
    cycle: '2026–27 entry cycle',

    stats: [
      { value: '4', label: 'entry bands, each with its own calendar' },
      {
        value: 'Jan 2, 2027',
        label: 'JK/K application deadline — two weeks ahead of everyone else',
      },
      { value: 'Jan 15, 2027', label: 'Grades 1–12 application deadline' },
      { value: '$100', label: 'application fee — non-refundable, every grade' },
    ],

    rules: [
      {
        title: 'One portal.',
        text: 'Everything runs through myCCS: an online inquiry form adds you to it, you apply inside it, and it then shows a checklist personalized to your child\'s grade that tracks every remaining item — birth certificate, recommendations, records and test scores all upload there. Decisions are posted to the portal\'s decision tab rather than mailed.',
      },
      {
        title: 'The deadlines are for priority, and admissions roll after them.',
        text: 'Every date below is the 2026–27 entry cycle, and the school states that these are the dates observed by Charlotte Area Independent Schools for priority consideration — after them, "Charlotte Christian School maintains rolling admissions where grade level space permits." So a late application is not automatically a closed door; what you lose is priority for the space that remains.',
      },
    ],

    spineNote:
      'One shared spine in every band — inquire and join myCCS → apply with the $100 fee → upload the birth certificate → send recommendations and records → complete the CAIS test or the ISEE → meet the school (a playdate for the youngest, a family interview for the rest) → decision on the myCCS decision tab → return the enrollment contract. What changes is which assessment, which application deadline, and which decision track you land on.',

    bands: [
      {
        key: 'jkk',
        label: 'JK / Kindergarten',
        sublabel: 'WPPSI-IV · earliest deadline',
        title: 'Junior Kindergarten & Kindergarten',
        deadlines: [
          { value: 'Jan 2, 2027', label: 'application + $100 fee due' },
          { value: 'Feb 1, 2027', label: 'CAIS testing due' },
          { value: 'Feb 26, 2027', label: 'decision posted — 4 p.m.' },
          { value: 'Mar 5, 2027', label: 'enrollment contract due — noon' },
        ],
        steps: [
          {
            title: 'Inquire, and join myCCS',
            tag: 'Fall 2026',
            tagKind: 'outline',
            detail:
              '"By completing an online inquiry form, you will be added to myCCS." The portal is where your personalized admissions checklist lives, and every later item on this list is uploaded or tracked there.',
          },
          {
            title: 'Attend A Closer Look',
            tag: 'Oct 2026',
            tagKind: 'outline',
            detail:
              'Two JK–K sessions are published — **Oct 8, 2026 at 8:30 a.m.** and **Oct 22, 2026 at 9:30 a.m.** RSVP through the website or by emailing the admissions office. Recommended, not marked required.',
          },
          {
            title: 'Submit the application + $100 fee',
            tag: 'by Jan 2',
            tagKind: 'accent',
            detail:
              'Two weeks earlier than every other grade: "on or before **January 2, 2027** for JK/K." The fee is non-refundable and is charged per child.',
          },
          {
            title: 'Upload the birth certificate',
            tag: 'by Jan 15',
            tagKind: 'outline',
            detail:
              'Uploaded to myCCS. "For families with two households, please upload a copy of your custody agreements" — a document the other Charlotte schools do not ask for up front.',
          },
          {
            title: 'Request the teacher recommendation',
            tag: 'by Jan 15',
            tagKind: 'outline',
            detail:
              'The request window is bounded at **both** ends: "**After November 1**, please request the teacher recommendation from your child\'s current teacher through the checklist in myCCS. The recommendation should be completed before **January 15, 2027**." That completion date falls **after** the Jan 2 application deadline — not a misprint.',
          },
          {
            title: 'CAIS testing — WPPSI-IV',
            tag: 'by Feb 1',
            tagKind: 'accent',
            detail:
              '"Contact a CAIS psychologist to schedule WPPSI-IV Test (Wechsler Preschool and Primary Scale of Intelligence - Fourth Edition). Request that scores be sent to Charlotte Christian School." You book the psychologist directly from the CAIS booklet\'s provider list — the school does not arrange it, and the fee is paid to the psychologist rather than to the school.',
          },
          {
            title: 'The on-campus playdate',
            tag: 'scheduled for you',
            tagKind: 'outline',
            detail:
              'Unique to the youngest bands, and **the school schedules it, not you**: "After an application has been received the admissions office will schedule a **45-minute on-campus playdate**. Families will meet with a member of the admissions team and/or lower school administration." Nothing to book — apply, and the office reaches out.',
          },
          {
            title: 'Decision → contract',
            tag: 'Feb 26 → Mar 5',
            tagKind: 'accent',
            detail:
              'The decision is posted to the myCCS decision tab on **February 26, 2027 at 4 p.m.** — six weeks ahead of the Grades 1–12 track — and the signed enrollment contract is due **March 5, 2027 at noon**. The contract carries a **$1,500 per-student enrollment fee**, non-refundable and applied to the tuition balance, plus a **$1,250 new-family fee** the first time a family enrols.',
          },
        ],
        watchOuts: [
          {
            kicker: 'Your deadline is Jan 2 — and it is the only one that is',
            text: 'JK and Kindergarten apply **two weeks ahead of every other grade** and hear back **six weeks earlier** (Feb 26 rather than Apr 9). The published JK–Grade 1 document covers three grades and carries **both** dates in a single sentence, which is easy to misread as one deadline for all of them: it is **Jan 2 for JK/K, Jan 15 for Grade 1**. Miss Jan 2 and you do not fall back onto the Grades 1–12 track — you are simply late for this one, and into the rolling-admissions pool for whatever space is left.',
          },
          {
            kicker: 'The order of operations is genuinely unusual',
            text: 'Two items sit where you would not expect them. The **teacher recommendation is due Jan 15 — after the Jan 2 application** — and it **cannot be requested before November 1**, so the whole request window is about ten weeks wide. And the **playdate is scheduled by the admissions office** once your application is in, rather than booked by you, so there is nothing to reserve and no date to chase: apply first, and the rest of the sequence follows.',
          },
        ],
        checklistCallout: {
          lead: 'Your deadline is Jan 2, not Jan 15.',
          text: 'Junior Kindergarten and Kindergarten apply two weeks ahead of every other grade and hear back six weeks earlier. The teacher recommendation is due Jan 15 — after the application, which is correct and not a misprint — and cannot be requested before November 1. The playdate is scheduled by the admissions office once your application arrives.',
        },
        checklistRows: [
          {
            action: 'Complete the online inquiry form',
            detail: 'Adds you to myCCS, where your personalized checklist lives.',
            due: 'Fall 2026',
          },
          {
            action: 'RSVP for and attend A Closer Look',
            detail: 'JK–K sessions: Oct 8, 2026 at 8:30 a.m. and Oct 22, 2026 at 9:30 a.m.',
            due: 'Oct 2026',
          },
          {
            action: 'Submit the application and pay the $100 fee',
            detail: 'Two weeks earlier than the Grades 1–12 deadline. Non-refundable, per child.',
            due: 'Jan 2, 2027',
          },
          {
            action: 'Upload the birth certificate to myCCS',
            detail: 'Two-household families also upload a copy of the custody agreements.',
            due: 'Jan 15, 2027',
          },
          {
            action: 'Request the teacher recommendation through myCCS',
            detail: 'Cannot be requested before Nov 1; falls after the application deadline.',
            due: 'Jan 15, 2027',
          },
          {
            action: 'Book and complete CAIS testing (WPPSI-IV)',
            detail: 'Scheduled directly with a CAIS psychologist; ask that scores be sent to CCS.',
            due: 'Feb 1, 2027',
          },
          {
            action: 'Attend the 45-minute on-campus playdate',
            detail: 'Scheduled by the admissions office after your application is received.',
            due: 'After applying',
          },
          {
            action: 'Watch the myCCS decision tab',
            detail: 'Posted at 4 p.m., six weeks ahead of the Grades 1–12 track.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Return the enrollment contract',
            detail: '$1,500 enrollment fee per student, applied to tuition; noon deadline.',
            due: 'Mar 5, 2027',
          },
        ],
      },
      {
        key: 'g1',
        label: 'Grade 1',
        sublabel: 'WPPSI-IV · later calendar',
        title: 'Grade 1',
        deadlines: [
          { value: 'Jan 15, 2027', label: 'application + $100 fee due' },
          { value: 'Feb 26, 2027', label: 'file materials due' },
          { value: 'Apr 9, 2027', label: 'decision posted — 4 p.m.' },
          { value: 'Apr 16, 2027', label: 'enrollment contract due — noon' },
        ],
        steps: [
          {
            title: 'Inquire, and join myCCS',
            tag: 'Fall 2026',
            tagKind: 'outline',
            detail:
              '"By completing an online inquiry form, you will be added to myCCS." The portal is where your personalized admissions checklist lives, and every later item on this list is uploaded or tracked there.',
          },
          {
            title: 'Attend A Closer Look',
            tag: 'Oct 2026',
            tagKind: 'outline',
            detail:
              'Grade 1 is covered by the school\'s JK–K sessions in the published calendar — **Oct 8, 2026 at 8:30 a.m.** and **Oct 22, 2026 at 9:30 a.m.** No separate Grade 1 event is named; contact admissions to arrange a visit if neither date works.',
          },
          {
            title: 'Submit the application + $100 fee',
            tag: 'by Jan 15',
            tagKind: 'accent',
            detail:
              'The Grades 1–12 deadline: "**January 15, 2027** for Grade 1." Grade 1 shares this application date with every older grade even though it shares its **assessment** with JK/K — the two boundaries do not line up.',
          },
          {
            title: 'Upload the birth certificate',
            tag: 'by Feb 26',
            tagKind: 'outline',
            detail:
              'Uploaded to myCCS. "For families with two households, please upload a copy of your custody agreements."',
          },
          {
            title: 'Request the teacher recommendation',
            tag: 'by Feb 26',
            tagKind: 'outline',
            detail:
              'Requested from your child\'s current teacher through the myCCS checklist, as for JK/K, but on this band\'s later clock — file materials are due **February 26, 2027** rather than Jan 15.',
          },
          {
            title: 'CAIS testing — WPPSI-IV',
            tag: 'by Feb 26',
            tagKind: 'accent',
            detail:
              'Still the **WPPSI-IV**, not the WISC-V: the instrument changes at **Grade 1 → Grade 2**, one grade later than the deadline changes. Booked directly with a CAIS psychologist from the consortium booklet, with scores sent to Charlotte Christian School.',
          },
          {
            title: 'The on-campus playdate',
            tag: 'scheduled for you',
            tagKind: 'outline',
            detail:
              'Grade 1 sits inside the same JK–Grade 1 process as the youngest band, so it gets the **45-minute on-campus playdate** rather than the family interview the older bands attend — and the admissions office schedules it once your application is received.',
          },
          {
            title: 'Decision → contract',
            tag: 'Apr 9 → Apr 16',
            tagKind: 'accent',
            detail:
              'The decision posts to the myCCS decision tab on **April 9, 2027 at 4 p.m.** and the enrollment contract is due **April 16, 2027 at noon** — the Grades 1–12 track, six weeks behind JK/K. The contract carries the **$1,500 per-student enrollment fee** and, for a family new to the school, the **$1,250 new-family fee**.',
          },
        ],
        watchOuts: [
          {
            kicker: 'Grade 1 straddles the two boundaries',
            text: 'This is the band that catches families out, because Grade 1 sits on **one side of the deadline break and the other side of the testing break**. Its **application deadline is Jan 15**, with the older grades — but its **assessment is the WPPSI-IV**, with the younger ones, and so is its **playdate**. Reading the JK–Grade 1 document as a single process gives you the wrong deadline; reading the Grades 2–4 document because "Grade 1 is a big-kid grade" gives you the wrong test. Neither published sheet describes Grade 1 on its own.',
          },
          {
            kicker: 'Late is not closed, but it is not priority either',
            text: 'The dates on this sheet are, in the school\'s own words, "those observed by Charlotte Area Independent Schools (CAIS) for priority consideration. After these dates, Charlotte Christian School maintains **rolling admissions where grade level space permits**." Observing the deadlines "promises priority consideration for available space" — so applying after Jan 15 puts you in a rolling pool for whatever is left in a single grade, which in a small division may be nothing. Whether a waitlist operates alongside that, and how it is ordered, is **not published**.',
          },
        ],
        checklistCallout: {
          lead: 'Grade 1 is on the later deadline but the earlier test.',
          text: 'Apply by Jan 15 with the older grades, but sit the WPPSI-IV with the younger ones — the testing boundary is Grade 1 → Grade 2, one grade later than the deadline boundary. Grade 1 also gets the on-campus playdate rather than a family interview.',
        },
        checklistRows: [
          {
            action: 'Complete the online inquiry form',
            detail: 'Adds you to myCCS, where your personalized checklist lives.',
            due: 'Fall 2026',
          },
          {
            action: 'RSVP for and attend A Closer Look',
            detail: 'Covered by the JK–K sessions: Oct 8, 2026 and Oct 22, 2026.',
            due: 'Oct 2026',
          },
          {
            action: 'Submit the application and pay the $100 fee',
            detail: 'The Grades 1–12 deadline, two weeks after the JK/K one.',
            due: 'Jan 15, 2027',
          },
          {
            action: 'Upload the birth certificate to myCCS',
            detail: 'Two-household families also upload a copy of the custody agreements.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Request the teacher recommendation through myCCS',
            detail: "Requested from your child's current teacher; part of the file materials.",
            due: 'Feb 26, 2027',
          },
          {
            action: 'Book and complete CAIS testing (WPPSI-IV)',
            detail: 'Still the WPPSI-IV — the WISC-V starts at Grade 2, not Grade 1.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Attend the 45-minute on-campus playdate',
            detail: 'Scheduled by the admissions office after your application is received.',
            due: 'After applying',
          },
          {
            action: 'Watch the myCCS decision tab',
            detail: 'Posted at 4 p.m. on the Grades 1–12 track.',
            due: 'Apr 9, 2027',
          },
          {
            action: 'Return the enrollment contract',
            detail: '$1,500 enrollment fee per student, applied to tuition; noon deadline.',
            due: 'Apr 16, 2027',
          },
        ],
      },
      {
        key: 'g24',
        label: 'Grades 2–4',
        sublabel: 'WISC-V · records & interview',
        title: 'Grades 2–4',
        deadlines: [
          { value: 'Jan 15, 2027', label: 'application + $100 fee due' },
          { value: 'Feb 26, 2027', label: 'all file materials due' },
          { value: 'Apr 9, 2027', label: 'decision posted — 4 p.m.' },
          { value: 'Apr 16, 2027', label: 'enrollment contract due — noon' },
        ],
        steps: [
          {
            title: 'Inquire, and join myCCS',
            tag: 'Fall 2026',
            tagKind: 'outline',
            detail:
              '"By completing an online inquiry form, you will be added to myCCS." The portal is where your personalized admissions checklist lives, and every later item on this list is uploaded or tracked there.',
          },
          {
            title: 'Submit the application + $100 fee',
            tag: 'by Jan 15',
            tagKind: 'accent',
            detail:
              'The Grades 1–12 deadline: "on or before **January 15, 2027**." Non-refundable, and charged per child rather than per family.',
          },
          {
            title: 'Upload the birth certificate',
            tag: 'by Feb 26',
            tagKind: 'outline',
            detail:
              'Uploaded to myCCS. "For families with two households, please upload a copy of your custody agreements."',
          },
          {
            title: 'Teacher recommendation + full school records',
            tag: 'by Feb 26',
            tagKind: 'accent',
            detail:
              'This is where the older bands get heavier than JK–Grade 1. Alongside the recommendation, the school asks for a complete record: "School record should include **current year and two prior years report cards, standardized tests, and other educational assessments**." All of it is requested through the myCCS checklist and all of it is due Feb 26.',
          },
          {
            title: 'CAIS testing — WISC-V',
            tag: 'by Feb 26',
            tagKind: 'accent',
            detail:
              'The instrument changes here: "Schedule **WISC-V** (Wechsler Intelligence Scale for Children – Fifth Edition) with a Charlotte Area Independent School (CAIS) psychologist (see CAIS booklet for a list of providers). Request that scores be sent to Charlotte Christian School." The booklet\'s provider list is the starting point, and you book and pay the psychologist directly.',
          },
          {
            title: 'The family interview',
            tag: 'once your file is complete',
            tagKind: 'outline',
            detail:
              'Gated rather than scheduled up front: "**Once an applicant\'s file materials are complete, a family interview will be scheduled.**" Student visit days are separate and are **by invitation** — not something a family requests. So the interview date is a consequence of finishing your paperwork early, which is the practical argument for not running to Feb 26.',
          },
          {
            title: 'Decision → contract',
            tag: 'Apr 9 → Apr 16',
            tagKind: 'accent',
            detail:
              'The decision posts to the myCCS decision tab on **April 9, 2027 at 4 p.m.**, with the enrollment contract due **April 16, 2027 at noon** — **except** for a sibling of a JK–K applicant, who is decided on the JK–K track on **February 26, 2027** regardless of the grade applied for. The contract carries the **$1,500 per-student enrollment fee**, plus the **$1,250 new-family fee** for a family new to the school.',
          },
        ],
        watchOuts: [
          {
            kicker: 'The interview will not be scheduled until your file is complete',
            text: 'The family interview is **gated on a complete file**, not booked in advance: it is scheduled only "once an applicant\'s file materials are complete," and **student visit days are by invitation**. Every day you spend chasing the last transcript is a day the interview cannot be set. The records requirement is the long pole — **current year plus two prior years** of report cards, standardized tests and other educational assessments, which for a family moving from another school often means requesting from two registrars.',
          },
          {
            kicker: 'A JK–K sibling changes your decision date',
            text: 'If your child is applying alongside a sibling entering JK or Kindergarten, this applicant is decided on the **JK–K track — February 26, 2027 — regardless of the grade applied for**, roughly six weeks ahead of the rest of the band. The school states this on all three checklists. It moves the decision and the contract deadline together, so a family in that position should be working to the earlier calendar throughout rather than the one printed on this sheet.',
          },
        ],
        checklistCallout: {
          lead: 'Finish the file early — the interview waits on it.',
          text: 'The family interview is scheduled only once your materials are complete, and student visit days are by invitation. The records ask is the slow part: current year plus two prior years of report cards, standardized tests and other assessments. If a sibling is applying for JK or K, your decision moves to Feb 26 instead of Apr 9.',
        },
        checklistRows: [
          {
            action: 'Complete the online inquiry form',
            detail: 'Adds you to myCCS, where your personalized checklist lives.',
            due: 'Fall 2026',
          },
          {
            action: 'Submit the application and pay the $100 fee',
            detail: 'The Grades 1–12 deadline. Non-refundable, per child.',
            due: 'Jan 15, 2027',
          },
          {
            action: 'Upload the birth certificate to myCCS',
            detail: 'Two-household families also upload a copy of the custody agreements.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Request the teacher recommendation through myCCS',
            detail: "Requested from your child's current teacher via the portal checklist.",
            due: 'Feb 26, 2027',
          },
          {
            action: 'Send complete school records',
            detail:
              'Current year and two prior years: report cards, standardized tests, other assessments.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Book and complete CAIS testing (WISC-V)',
            detail: 'Booked from the CAIS booklet provider list; scores sent to CCS.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Attend the family interview',
            detail: 'Scheduled once your file is complete. Student visit days are by invitation.',
            due: 'After file complete',
          },
          {
            action: 'Watch the myCCS decision tab',
            detail: 'Apr 9 — or Feb 26 if a sibling is applying for JK or K.',
            due: 'Apr 9, 2027',
          },
          {
            action: 'Return the enrollment contract',
            detail: '$1,500 enrollment fee per student, applied to tuition; noon deadline.',
            due: 'Apr 16, 2027',
          },
        ],
      },
      {
        key: 'g512',
        label: 'Grades 5–12',
        sublabel: 'ISEE · questionnaire & interview',
        title: 'Grades 5–12',
        deadlines: [
          { value: 'Jan 15, 2027', label: 'application + $100 fee due' },
          { value: 'Feb 26, 2027', label: 'all file materials due' },
          { value: 'Apr 9, 2027', label: 'decision posted — 4 p.m.' },
          { value: 'Apr 16, 2027', label: 'enrollment contract due — noon' },
        ],
        steps: [
          {
            title: 'Inquire, and join myCCS',
            tag: 'Fall 2026',
            tagKind: 'outline',
            detail:
              '"By completing an online inquiry form, you will be added to myCCS." The portal is where your personalized admissions checklist lives, and every later item on this list is uploaded or tracked there.',
          },
          {
            title: 'Attend A Closer Look',
            tag: 'Nov 2026',
            tagKind: 'outline',
            detail:
              'Two sessions are published for this band, split by division: **Grades 5–8 on Nov 3, 2026 at 9:30 a.m.** and **Grades 9–12 on Nov 11, 2026 at 10:30 a.m.** RSVP through the website or by emailing admissions.',
          },
          {
            title: 'Submit the application + $100 fee',
            tag: 'by Jan 15',
            tagKind: 'accent',
            detail:
              'The Grades 1–12 deadline: "on or before **January 15, 2027**." Non-refundable, and charged per child.',
          },
          {
            title: 'The applicant questionnaire',
            tag: 'by Feb 26',
            tagKind: 'accent',
            detail:
              'Unique to this band, and the one item that is not a form-fill: "This form should be printed and completed **in the student\'s handwriting**. The completed form may be uploaded in myCCS on the checklist." Print it, have your child write it out, scan it back. Nothing published describes it as a faith questionnaire.',
          },
          {
            title: 'Recommendations + full school records',
            tag: 'by Feb 26',
            tagKind: 'accent',
            detail:
              'The requirement **splits inside this band**. **Grades 7–12** need English, Math **and a Principal or School Counselor** recommendation; **Grades 5–6** need English and Math only. Both add complete school records — current year and two prior years of report cards, standardized tests and other assessments. All requested through the myCCS checklist, all due Feb 26.',
          },
          {
            title: 'Sit the ISEE',
            tag: 'by Feb 26',
            tagKind: 'accent',
            detail:
              'The break from the younger bands: no psychologist and no CAIS appointment. "Register for the Independent School Entrance Exam (ISEE) at www.iseetest.org or with ISEE (1-800-989-3721). Request that scores be sent to Charlotte Christian School." Charlotte Christian hosts its own testing day on **Jan 23, 2027**, and six other CAIS schools host dates between Dec 2026 and Feb 2027 that a family may sit instead — book early enough that scores reach the school by Feb 26.',
          },
          {
            title: 'The family interview',
            tag: 'once your file is complete',
            tagKind: 'outline',
            detail:
              'As for Grades 2–4: "once an applicant\'s file materials are complete, a family interview will be scheduled," and **student visit days are by invitation** rather than on request. Finishing the paperwork early is what moves the interview earlier.',
          },
          {
            title: 'Decision → contract',
            tag: 'Apr 9 → Apr 16',
            tagKind: 'accent',
            detail:
              'The decision posts to the myCCS decision tab on **April 9, 2027 at 4 p.m.**, with the enrollment contract due **April 16, 2027 at noon** — **except** for a sibling of a JK–K applicant, decided on **February 26, 2027**. The contract carries the **$1,500 per-student enrollment fee**; a family new to the school also pays the **$1,250 new-family fee**, which does not apply to international students.',
          },
        ],
        watchOuts: [
          {
            kicker: 'Two requirements exist only in this band',
            text: 'The **applicant questionnaire is written by the student, by hand** — "printed and completed in the student\'s handwriting," then uploaded to myCCS — so it needs your child\'s time, not yours, and it cannot be left to the last evening. And the recommendation list **splits mid-band**: **Grades 7–12** must add a **Principal or School Counselor** reference on top of English and Math, while **Grades 5–6** need only the two teachers. A Grade 7 family working from a Grade 6 family\'s list will be one recommendation short at the Feb 26 deadline.',
          },
          {
            kicker: 'International applicants: the TOEFL and a $2,000 annual fee',
            text: 'International applicants are pointed to the **TOEFL** in addition to this band\'s process, not instead of it. The cost side is published and is substantial: an **International Student Fee of $2,000 per student per year**, non-refundable and due at enrollment — though the **$1,250 new-family fee explicitly does not apply** to international students. Visa, I-20 and SEVIS procedures, agency partners and any application-fee differential are **not published**; the school does name an Admissions Specialist and International Student Coordinator, so ask there before you start.',
          },
        ],
        checklistCallout: {
          lead: 'Two items here exist in no other band.',
          text: "The applicant questionnaire is printed and completed in the student's own handwriting, then uploaded — start it early. And Grades 7–12 need a Principal or School Counselor recommendation on top of English and Math, where Grades 5–6 need only the two teachers. Charlotte Christian's own ISEE day is Jan 23, 2027.",
        },
        checklistRows: [
          {
            action: 'Complete the online inquiry form',
            detail: 'Adds you to myCCS, where your personalized checklist lives.',
            due: 'Fall 2026',
          },
          {
            action: 'RSVP for and attend A Closer Look',
            detail: 'Grades 5–8: Nov 3, 2026, 9:30 a.m. Grades 9–12: Nov 11, 2026, 10:30 a.m.',
            due: 'Nov 2026',
          },
          {
            action: 'Submit the application and pay the $100 fee',
            detail: 'The Grades 1–12 deadline. Non-refundable, per child.',
            due: 'Jan 15, 2027',
          },
          {
            action: 'Upload the birth certificate to myCCS',
            detail: 'Two-household families also upload a copy of the custody agreements.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Complete the applicant questionnaire by hand',
            detail: "Printed and written in the student's own handwriting, then uploaded to myCCS.",
            due: 'Feb 26, 2027',
          },
          {
            action: 'Request recommendations through myCCS',
            detail:
              'Grades 7–12: English, Math and Principal/School Counselor. Grades 5–6: English and Math.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Send complete school records',
            detail:
              'Current year and two prior years: report cards, standardized tests, other assessments.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Register for and sit the ISEE',
            detail:
              "CCS hosts Jan 23, 2027; other CAIS schools host dates Dec 2026 – Feb 2027. iseetest.org.",
            due: 'Feb 26, 2027',
          },
          {
            action: 'International applicants: sit the TOEFL',
            detail: 'In addition to the ISEE, not instead of it.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Attend the family interview',
            detail: 'Scheduled once your file is complete. Student visit days are by invitation.',
            due: 'After file complete',
          },
          {
            action: 'Watch the myCCS decision tab',
            detail: 'Apr 9 — or Feb 26 if a sibling is applying for JK or K.',
            due: 'Apr 9, 2027',
          },
          {
            action: 'Return the enrollment contract',
            detail: '$1,500 enrollment fee per student, applied to tuition; noon deadline.',
            due: 'Apr 16, 2027',
          },
        ],
      },
    ],

    aid: {
      title: 'Running in parallel: the financial-aid clock',
      text: 'Aid runs through **SSS by NAIS** — Charlotte Christian\'s **school code is 2318** — and awards are **need-based only**, with the maximum grant **limited to 50 percent of tuition**. Two rules shape the timing: awards for new families "will not be provided until their students have been accepted," and applications "will be considered as applications are completed, but awards will be limited by the funding available at the time of completion" — so completing early matters more than the deadline suggests. Every family applying for aid **must also apply to the North Carolina Opportunity Scholarship Program**, which opens February 2. **The aid deadline for this cycle is not published** — the only dated sheet is a prior cycle\'s — so confirm it with the business office before you plan around it.',
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
            g1: 'Jan 15, 2027',
            g24: 'Jan 15, 2027',
            g512: 'Jan 15, 2027',
          },
        },
        {
          label: 'Assessment',
          cells: {
            jkk: 'CAIS — WPPSI-IV',
            g1: 'CAIS — WPPSI-IV',
            g24: 'CAIS — WISC-V',
            g512: 'ISEE — CCS hosts Jan 23, 2027',
          },
        },
        {
          label: 'File materials due',
          cells: {
            jkk: 'Jan 15, 2027 · CAIS testing Feb 1, 2027',
            g1: 'Feb 26, 2027',
            g24: 'Feb 26, 2027',
            g512: 'Feb 26, 2027',
          },
        },
        {
          label: 'Recommendations',
          cells: {
            jkk: 'Current teacher — own deadline, Jan 15, 2027',
            g1: 'Current teacher',
            g24: 'Teacher + records: current year and two prior years',
            g512: 'English + Math (Gr 5–6); add Principal/Counselor (Gr 7–12)',
          },
        },
        {
          label: 'Meeting the school',
          cells: {
            jkk: '45-minute on-campus playdate, scheduled by the office',
            g1: '45-minute on-campus playdate, scheduled by the office',
            g24: 'Family interview once the file is complete',
            g512: 'Family interview once the file is complete',
          },
        },
        {
          label: 'Band-only requirement',
          cells: {
            jkk: 'Recommendation cannot be requested before Nov 1',
            g1: '—',
            g24: 'Two prior years of records',
            g512: 'Handwritten applicant questionnaire',
          },
        },
        {
          label: 'Decision posted',
          cells: {
            jkk: 'Feb 26, 2027, 4 p.m.',
            g1: 'Apr 9, 2027, 4 p.m.',
            g24: 'Apr 9, 2027, 4 p.m.',
            g512: 'Apr 9, 2027, 4 p.m.',
          },
        },
        {
          label: 'Contract due',
          cells: {
            jkk: 'Mar 5, 2027, noon',
            g1: 'Apr 16, 2027, noon',
            g24: 'Apr 16, 2027, noon',
            g512: 'Apr 16, 2027, noon',
          },
        },
        {
          label: 'A Closer Look',
          cells: {
            jkk: 'Oct 8, 2026, 8:30 a.m. · Oct 22, 2026, 9:30 a.m.',
            g1: 'Covered by the JK–K sessions',
            g24: 'None published — contact admissions',
            g512: 'Nov 3, 2026, 9:30 a.m. (5–8) · Nov 11, 2026, 10:30 a.m. (9–12)',
          },
        },
        {
          label: 'Sibling rule',
          cells: {
            all: 'A sibling of a JK–K applicant is decided on the JK–K track — Feb 26, 2027 — regardless of the grade applied for.',
          },
        },
        {
          label: 'Constant in every band',
          cells: {
            all: '$100 non-refundable application fee · the myCCS portal and its personalized checklist · a birth certificate, plus custody agreements for two-household families · a $1,500 enrollment fee at contract · rolling admissions after the priority dates, where grade-level space permits',
          },
        },
      ],
    },

    contacts: {
      kicker: 'CONTACTS',
      title: 'The admissions office',
      address: '7301 Sardis Road, Charlotte, NC 28270 · main 704-366-5657, ext. 6502',
      people: [
        {
          name: 'Allycia Brown',
          detail:
            'Director of Early Education and Lower School Admissions · allycia.brown@charchrist.com',
        },
        {
          name: 'JoAnn Calhoun',
          detail:
            'Director of Middle and Upper School Admissions · joann.calhoun@charchrist.com',
        },
        {
          name: "Margaret Jackson ('89)",
          detail:
            'Admissions Specialist and International Student Coordinator · margaret.jackson@charchrist.com',
        },
        {
          name: "Kristen Brobst ('03)",
          detail: 'Admissions Coordinator · kristen.brobst@charchrist.com',
        },
        {
          name: 'Janet McPherson',
          detail: 'Admissions Associate · janet.mcpherson@charchrist.com',
        },
        {
          name: 'Kimberly Davenport',
          detail:
            'Business office, financial assistance · 704-366-5657 ext. 6202 · kimberly.davenport@charchrist.com',
        },
      ],
    },

    checklist: {
      portalNote: 'Portal: myCCS · charlottechristian.myschoolapp.com',
      aidPanel: {
        kicker: 'In parallel — the financial aid clock',
        items: [
          'Apply through SSS by NAIS — Charlotte Christian\'s school code is 2318. Upload the federal income tax return, W-2, and a business tax return if the family owns all or part of a business.',
          'Awards are need-based only and the maximum grant is limited to 50 percent of tuition. Awards for new families are not provided until the student has been accepted.',
          'Applications are considered as they are completed, and awards are limited by the funding available at the time of completion — so completing early matters, not just meeting a date.',
          'Every family applying for assistance must ALSO apply to the North Carolina Opportunity Scholarship Program, which opens February 2 at k12.ncseaa.edu. This is a second, mandatory application.',
          'The aid deadline for the 2026–27 cycle is not published — the only dated sheet is a prior cycle\'s. Confirm the current date with the business office before planning around it.',
        ],
      },
      contactPanel: {
        kicker: 'Questions — admissions office',
        lines: [
          'Admissions main — 704-366-5657, ext. 6502 · admissions@charchrist.com',
          '7301 Sardis Road, Charlotte, NC 28270',
          'Financial assistance — Kimberly Davenport, 704-366-5657 ext. 6202 · kimberly.davenport@charchrist.com',
        ],
      },
      disclaimer:
        'Dates are the 2026–27 entry cycle as published in the charlottechristian.com admissions PDFs (retrieved Aug 2026) — the application-process checklists and the admissions calendar, which the school refreshed on 26 Aug 2026. The Apply page\'s inline dates and the financial-aid sheet are a prior, closed cycle and are deliberately not used here. Cycle dates shift year to year — verify against the live calendar before acting. Compiled by Charlotte School Compare; not affiliated with Charlotte Christian School.',
    },

    sources: [
      {
        label:
          'charlottechristian.com — 2026-27 Admissions Calendar: every priority deadline, the A Closer Look events, the file-material and CAIS testing dates, the decision and contract dates, and the seven regional ISEE days',
        url: 'https://www.charlottechristian.com/fs/resource-manager/view/8927b24e-2e89-43ee-857d-77b3310982c2',
      },
      {
        label:
          'charlottechristian.com — JK–Grade 1 Application Process: the Jan 2 / Jan 15 split in one sentence, WPPSI-IV, the Nov 1 recommendation window, the 45-minute on-campus playdate and the Feb 1, 2027 CAIS date',
        url: 'https://www.charlottechristian.com/fs/resource-manager/view/11d1224a-c576-4d16-9da6-4334f4815322',
      },
      {
        label:
          'charlottechristian.com — Grades 2–4 Application Process: WISC-V, the current-year-plus-two-prior-years records requirement, and the family interview gated on a complete file',
        url: 'https://www.charlottechristian.com/fs/resource-manager/view/70ce69e5-39ea-4312-8f8a-cb32eda9f4b1',
      },
      {
        label:
          'charlottechristian.com — Grades 5–12 Application Process: the ISEE, the handwritten applicant questionnaire, and the Grades 5–6 vs 7–12 recommendation split',
        url: 'https://www.charlottechristian.com/fs/resource-manager/view/fc255e07-3a81-4d21-b638-3e4d12afbea5',
      },
      {
        label:
          'charlottechristian.com — tuition and financial assistance: SSS by NAIS, the 50 percent cap, the need-based rule, the NC Opportunity Scholarship requirement and the enrollment, new-family and international fees',
        url: 'https://www.charlottechristian.com/admissions/tuition',
      },
      {
        label:
          'charlottechristian.com — 2026-27 tuition and fees chart: tuition by division and the full fee schedule',
        url: 'https://www.charlottechristian.com/fs/resource-manager/view/b895e462-2799-4653-ab0b-f27eaaecca24',
      },
      {
        label:
          'charlottechristian.com — meet the admissions team: the five named admissions staff, their titles and their direct emails',
        url: 'https://www.charlottechristian.com/admissions/meet-the-team',
      },
      {
        label:
          'charlottechristian.com — apply: the portal and TOEFL/ISEE links and the downloadable process PDFs. NOTE its inline dates describe a prior, closed cycle and are not used here',
        url: 'https://www.charlottechristian.com/admissions/apply',
      },
      {
        label:
          'CAIS consortium brochure — the per-grade instrument (WPPSI-IV through Grade 1, WISC-V from Grade 2) and the designated-psychologist provider list',
        url: 'https://www.charlottechristian.com/fs/resource-manager/view/0510c368-3faa-4488-bc5a-1fd9d2b6d4f8',
      },
      {
        label: 'myCCS — the inquiry, application and decision portal',
        url: 'https://charlottechristian.myschoolapp.com/',
      },
      {
        label: 'SSS by NAIS — the financial-aid platform; Charlotte Christian school code 2318',
        url: 'https://sssandtadsfa.my.site.com/familyportal/FamilyLogin',
      },
      {
        label:
          'North Carolina Opportunity Scholarship — the second, mandatory application for every aid applicant',
        url: 'https://k12.ncseaa.edu',
      },
      {
        label:
          "Retrieved Aug 2026. No faith-based application component is published: across all three process PDFs, the admissions calendar and the apply page there is no pastoral or clergy reference, no church-membership requirement and no statement-of-faith affirmation for applicants or parents. The school's Statement of Faith governs the institution rather than applicants.",
      },
      {
        label:
          "Retrieved Aug 2026. The current-cycle financial-aid deadline, waitlist procedure, legacy/alumni and faculty-child preference, sibling preference beyond the JK–K decision track, re-application, transfer and mid-year entry, and international visa/I-20/SEVIS procedure aren't published on the pages and documents reviewed. The 2027–28 dates and tuition are not published yet. Confirm any of these directly with admissions.",
      },
    ],
  },
}
