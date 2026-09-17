// Trinity Episcopal School — Admissions.
//
// Transcribed from the two committed research files under
// source-material/admissions/trinity-episcopal/ — "Application Process and
// Testing" (the school's own pages, fetched as raw HTML) and "CAIS Consortium"
// (the consortium brochure, hosted on Trinity's own domain and extracted with
// pdftotext). Both carry a provenance header, source URLs and char-for-char
// quotes behind every figure below.
//
// ⚠️⚠️ THREE NON-ALIGNED GRADE SPLITS — the thing most likely to be written
// wrongly, and the reason this card's band keys are what they are:
//
//     Deadlines and decisions   break at K → 1      bands: K / 1–8
//     Testing instrument        breaks at 1 → 2 AND at 4 → 5
//                                                   bands: K–1 / 2–4 / 5–8
//     Administering body        breaks at 4 → 5     bands: CAIS (K–4) / ISEE (5–8)
//
// ⛔ "Grades 1–8 take the ISEE" is FALSE. The ISEE is grades 5–8 ONLY. Grade 1
// takes the WPPSI-IV with Kindergarten, and grades 2–4 take the WISC-V. The
// deadline band "Grades 1-8" spans BOTH testing boundaries, which is exactly why
// the wrong sentence is so tempting to write.
//
// BAND KEYS ARE `k` AND `g18`, DELIBERATELY, AND ARE NOT INHERITED. Providence
// Day's `tkk`/`g15`/`g612` and Country Day's `jkk`/`g14`/`g512` both encode
// THEIR schools' boundaries, and neither set describes Trinity: Trinity has no
// TK and no JK (it starts at Kindergarten), it ends at 8 (there is no high
// school), and its deadline boundary is a single break at K → 1. The bands a
// card presents are the DEADLINE bands, because that is what a parent acts on
// and what the school itself uses to split its calendar — so two bands, keyed
// for the grades they actually cover. The testing boundaries do not get their
// own bands: splitting K–1 / 2–4 / 5–8 would state the instrument correctly and
// the calendar wrongly, and grade 1 would then sit in a band whose deadlines are
// not its own. Instead the instrument change is carried INSIDE the Grades 1–8
// band's testing step, its watch-out and two cross-band rows, which is the same
// resolution Covenant Day reached for an instrument that moves twice inside one
// deadline band.
//
// CYCLE: 2027–28, and the label agrees with the dates — "The deadlines to apply
// for the 2027-28 school year are:" followed by January 2027 dates. That is
// unusual enough to be worth verifying and it checks out. DO NOT "correct" the
// 2027-28 label. The page separately notes it is still accepting applications
// for 2026-2027 in select grades; that is a rolling-space note, not a second
// cycle, and no 2026-27 date is carried here.
//
// TWO DATE COLLISIONS ARE REAL, NOT ERRORS. February 26, 2027 is simultaneously
// the grades 1–8 supporting-materials deadline and the Kindergarten decision
// date; February 1, 2027 is both the K supporting-materials deadline and the
// prospective-family financial-aid deadline. Both are correct as published.
//
// THREE SCHOOL-SIDE ERRORS ARE RECORDED HERE. Only the third is flagged to the
// reader, in the bands' watch-outs (this card has no flags array). The first two
// concern the SAME low-stakes event and were judged not worth a watch-out each —
// the user removed that card 2026-09-16 as more alarming than the facts warrant.
// Both remain documented here and in source-material; do not re-add the card
// without asking, and do not "fix" the school's copy either:
//   1. The Dec 1, 2026 open house is labelled "Thursday". Dec 1 2026 is a
//      TUESDAY. Sept 29 and Nov 5 are both labelled correctly, so this is the
//      only weekday error on the page.
//   2. That same event's TIME disagrees between the school's own two pages —
//      9:00–10:30 a.m. on the admission-process page, 9:30–11:00 a.m. on the
//      admission-events-and-tours page. Neither is asserted; both open-house
//      entries tell the reader to confirm the start time with the office.
//   3. The financial-support deadline on the process page reads "Thursday,
//      February 1, 2026" — a year stale (the tuition page says Feb. 1, 2027),
//      AND Feb 1 2026 was a Sunday. The archived 2026-05-09 snapshot shows the
//      tuition page itself once read that, so the process page was simply never
//      rolled forward. Every OTHER date on the process page is correctly 2027.
//      The card carries Feb 1, 2027 as the aid date and says why.
//
// THE CAIS BROCHURE IS THE 2024-25 EDITION. Its STRUCTURE carries forward — the
// seven members, the two instruments and their grade bands, the $275 fees, the
// coaching/tutoring/re-testing invalidation rule, the common notification and
// reply structure, and the no-contract-before-the-deadline guarantee. Its DATES
// DO NOT, and none is reproduced: its own K deadline was Dec 31 2023 and grades
// 1–4 Jan 15 2024, which does not match Trinity's current calendar at all. The
// enrollment-contract deadline therefore ships as a CAIS RULE rather than a
// Trinity date, because Trinity publishes none of its own.
//
// NEVER NARRATE THE BROCHURE — the standing editorial rule from PR #261. The
// card states what a parent must DO (book with one consortium psychologist, pay
// $275, sign the Test Validity Verification Form) rather than describing what a
// document contains.
//
// GRADES 5–8 SIT OUTSIDE THE CAIS TESTING ARRANGEMENT ENTIRELY. The consortium's
// instruments, fees, invalidation rule and common notification dates apply to
// K–4 applicants only. Do not extend any of them to the ISEE grades.
//
// ⛔ CONFIRMED ABSENT, and stated as such rather than guessed:
//   · The application FEE AMOUNT. The checklist says "Submit the application and
//     application fee" and never names a figure — `grep -o '\$[0-9][0-9,.]*'`
//     over the entire raw HTML of the page returns ZERO dollar signs.
//   · The acceptance rate — not on the site, not in either profile PDF.
//   · Individual tour dates, ABSENT BY POLICY: the school directs families to an
//     admission team member's own calendar or to the Admission Office. That is a
//     published policy, not a research gap.
//
// WATCH-OUTS ARE DELIBERATELY SPARSE — one per band, and only the CAIS coaching
// rule, whose consequence (an application invalidated at all seven schools) no
// step can carry. This card originally shipped three more; the user removed them
// at review (2026-09-16), and the two removals share a reason worth keeping:
// a watch-out that RESTATES a fact already in the steps reads as an alarm out of
// proportion to the fact. That is the same judgment behind the `watchOuts: []`
// convention on the four most recent cards (user, 2026-09-01).
//   · The Dec 1 open-house errors — see the block below; both are still recorded,
//     and the open-house entries now tell the reader to confirm the start time.
//   · The three-test split — fully carried by the band intro, the testing step
//     (which states outright that "Grades 1–8 take the ISEE" is the costly
//     mistake), the checklist callout and the comparison rows.
// Before adding a watch-out, check the steps do not already say it.
//
// BENITA GRIFFIN IS NOT LISTED AS A CONTACT. The CAIS brochure names her as
// Trinity's Interim Director of Admission & Financial Support, but that is a
// 2024-25 document and she no longer appears in Trinity's staculty directory.
// A stale contact is worse than none, so the contacts block carries the office
// and the published Spanish-language contact only.
//
// TUITION FIGURES ARE DELIBERATELY ABSENT — they belong to the Financial Aid &
// Tuition area, which owns them. The aid strip carries only what an applicant
// must do and when.

import type { AdmissionsProgram } from '../admissionsPrograms.ts'

const PROCESS = 'https://www.tescharlotte.org/admission/admission-process.cfm'
const EVENTS = 'https://www.tescharlotte.org/admission/admission-events-and-tours.cfm'
const ADMISSION = 'https://www.tescharlotte.org/admission/'
const CAIS = 'https://www.tescharlotte.org/editoruploads/files/CAIS2024-25final.pdf'

export const trinityEpiscopal: AdmissionsProgram = {
  guide: {
    headline:
      "Pick your child's entry point and the guide personalizes: the steps in order, the 2027–28 deadlines, and the testing for that band — plus a printable checklist to take with you. The calendar breaks once, at Kindergarten→1; the test changes twice more inside the Grades 1–8 band.",
    cycle: '2027–28 entry cycle',

    stats: [
      {
        value: 'Jan 2, 2027',
        label: 'Kindergarten application deadline — two weeks ahead of every other grade',
      },
      { value: 'Jan 15, 2027', label: 'Grades 1–8 application deadline' },
      { value: '$275', label: 'CAIS testing fee, K–4 — paid to the psychologist, not the school' },
    ],

    rules: [
      {
        title: 'One portal.',
        text: 'Everything runs through FACTS: set up your FACTS admission account, then submit the application and the application fee from it. There is no Ravenna at Trinity — if you hold a Ravenna account for another Charlotte school, it does not reach this one.',
      },
      {
        title: 'Three different grade splits, and they do not line up.',
        text: 'The deadlines break once, at Kindergarten to Grade 1. The test changes twice more — WPPSI-IV in K and Grade 1, the WISC-V in Grades 2 to 4, the ISEE in Grades 5 to 8. And the CAIS consortium administers the testing for K to 4 only; Grades 5 to 8 sit outside it entirely. Check all three against your child’s grade rather than assuming one split covers them.',
      },
    ],

    spineNote:
      'Same spine in both bands — visit → apply through FACTS with the fee → recommendations and transcripts → testing → Wildcat Visit Day → decision. What changes is the calendar, which test your child sits, and who administers it. Every family who completes the process is invited to a Follow-Up Conference with the admission team, whatever the outcome.',

    bands: [
      {
        // KEY `k`: Kindergarten is its own band because the school gives it its
        // own deadlines and its own decision date — two weeks earlier to apply
        // and six weeks earlier to hear back. It shares the WPPSI-IV with Grade
        // 1, which is why the testing step names both.
        key: 'k',
        label: 'Kindergarten',
        sublabel: 'Earlier calendar · WPPSI-IV through CAIS',
        title: 'Kindergarten',
        deadlines: [
          { value: 'Jan 2, 2027', label: 'application + fee due through FACTS' },
          { value: 'Feb 1, 2027', label: 'supporting materials due' },
          { value: 'Fri Feb 26, 2027', label: 'decisions emailed' },
          { value: '$275', label: 'WPPSI-IV testing fee, paid to the psychologist' },
        ],
        steps: [
          {
            title: 'Visit — an open house, or your own tour',
            tag: 'Fall 2026',
            tagKind: 'outline',
            detail:
              'Two open houses cover Kindergarten, both in **Trinity’s Center for Community and the Arts**: **Tuesday, Sept. 29, 2026** and **Nov. 5, 2026**, each 9:30–11:00 a.m. A third runs **Dec. 1, 2026** — confirm its start time, which the school’s two pages give differently. Individual tours are not published by policy: book from an admission team member’s own calendar, or ask the Admission Office.',
          },
          {
            title: 'Submit the application + fee through FACTS',
            tag: 'by Jan 2',
            tagKind: 'accent',
            detail:
              'Set up your **FACTS admission account**, then submit the application and the application fee from it. **The fee amount is not published anywhere** — there is not a single dollar figure on the admission process page — so confirm it with the Admission Office before you budget. Kindergarten applies **two weeks ahead of every other grade**, and hears back six weeks earlier.',
          },
          {
            title: 'Teacher recommendation',
            tag: 'by Feb 1',
            tagKind: 'outline',
            detail:
              '**Teacher recommendations are required for all K-8 applicants.** The two-recommendation rule — an English teacher and a math teacher — applies to **rising 6–8 applicants only**, so a Kindergarten applicant is not covered by it. The school does not state how many are required at this age; ask when you apply. Transcripts are required for 1st–8th grade applicants, which does not reach Kindergarten.',
          },
          {
            title: 'Book the WPPSI-IV — with one psychologist, and one only',
            tag: 'by Feb 1',
            tagKind: 'accent',
            detail:
              'Kindergarten and Grade 1 applicants take the **WPPSI-IV** through the **CAIS consortium** — seven schools, one shared testing arrangement. **Book with one psychologist only**, at **$275**, paid to them rather than to Trinity. Your child must be **four or older at testing**, which may be done **only once in twelve months**; cancelling **within 48 hours forfeits the fee**. CAIS also requires an **interview with each child**, usually **November–February**. Results reach you and the schools you designate as **percentile ranges**, not raw scores.',
          },
          {
            title: 'Wildcat Visit Day',
            tag: 'from November',
            tagKind: 'outline',
            detail:
              'Applicants are invited to register from **November**. A rising Kindergartner attends a **morning observation session** rather than a full day — the full day on campus is for rising 1st–8th graders.',
          },
          {
            title: 'Decision → the Follow-Up Conference',
            tag: 'Fri Feb 26, 2027',
            tagKind: 'accent',
            detail:
              'Decisions are emailed on **Friday, February 26, 2027**. Trinity invites **every family** who completes the application process — not only admitted ones — to sit down with the admission team "to share what we have learned about their child through the process and help the family discern how Trinity Episcopal School can best partner with the family in support of their child."',
          },
        ],
        watchOuts: [
          {
            kicker: 'Coaching or re-testing invalidates the application at EVERY CAIS school',
            text: '**"Psychologists will report to the schools any indication that a child has been coached, tutored, or re-tested. Any indication of the aforementioned will invalidate your application to any CAIS school."** Not just Trinity — **all seven**: Charlotte Christian, Charlotte Country Day, Charlotte Latin, Charlotte Preparatory, Covenant Day, Providence Day and Trinity Episcopal. You sign a **Test Validity Verification Form** at the psychologist’s office.',
          },
        ],
        checklistCallout: {
          lead: 'Your deadline is Jan 2 — two weeks ahead of every other grade.',
          text: 'Kindergarten applies by January 2, submits supporting materials by February 1, and hears back on Friday, February 26 — six weeks before Grades 1–8. The WPPSI-IV is booked by you with a single CAIS psychologist at $275, and coaching, tutoring or re-testing invalidates your application at all seven CAIS schools. The application fee amount is not published; confirm it with the office.',
        },
        checklistRows: [
          {
            action: 'Attend an open house or book a tour',
            detail:
              'Kindergarten Open House Sept 29, 2026; K–8 Nov 5 and Dec 1, 2026. Tour dates are not published — book through an admission team member’s calendar.',
            due: 'Fall 2026',
          },
          {
            action: 'Set up your FACTS admission account',
            detail: 'The portal is FACTS. There is no Ravenna account at Trinity.',
            due: 'Fall 2026',
          },
          {
            action: 'Submit the application and the application fee',
            detail: 'The fee amount is not published — confirm it with the Admission Office.',
            due: 'Jan 2, 2027',
          },
          {
            action: 'Request the teacher recommendation',
            detail: 'Recommendations are required for all K–8 applicants.',
            due: 'Feb 1, 2027',
          },
          {
            action: 'Book and complete the WPPSI-IV with a CAIS psychologist',
            detail:
              '$275, paid to the psychologist. One psychologist only. At least four years old at testing; once per twelve months.',
            due: 'Feb 1, 2027',
          },
          {
            action: 'Sign the Test Validity Verification Form',
            detail:
              'Confirms no prior testing or coaching. Coaching, tutoring or re-testing invalidates the application at all seven CAIS schools.',
            due: 'At the psychologist’s office',
          },
          {
            action: 'Register for the Wildcat Visit Day observation session',
            detail: 'Rising Kindergartners attend a morning observation rather than a full day.',
            due: 'From November 2026',
          },
          {
            action: 'Watch for the decision email',
            detail: 'Emailed Friday, February 26, 2027.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Book the Follow-Up Conference',
            detail: 'Offered to every family who completes the process, whatever the decision.',
            due: 'After the decision',
          },
        ],
      },
      {
        // KEY `g18`: one deadline band covering grades 1 through 8, because the
        // school publishes exactly one calendar for all of them. The instrument
        // moves twice INSIDE it (WPPSI-IV at Grade 1, WISC-V at 2–4, ISEE at
        // 5–8) and the administering body changes once (CAIS through Grade 4,
        // not CAIS from Grade 5) — both carried in the testing step and in the
        // cross-band rows rather than split into bands the calendar does not
        // have.
        key: 'g18',
        label: 'Grades 1–8',
        sublabel: 'One calendar · three different tests inside it',
        title: 'Grades 1–8',
        deadlines: [
          { value: 'Jan 15, 2027', label: 'application + fee due through FACTS' },
          { value: 'Feb 26, 2027', label: 'supporting materials due' },
          { value: 'Fri Apr 9, 2027', label: 'decisions emailed' },
          { value: '$275', label: 'CAIS testing fee — Grades 1–4 only; no CAIS fee at 5–8' },
        ],
        steps: [
          {
            title: 'Visit — an open house, or your own tour',
            tag: 'Fall 2026',
            tagKind: 'outline',
            detail:
              'Two K–8 open houses cover this band, both in **Trinity’s Center for Community and the Arts**: **Thursday, Nov. 5, 2026**, 9:30–11:00 a.m., and **Dec. 1, 2026** — confirm that one’s start time, which the school’s two pages give differently. Individual tours are not published by policy: book from an admission team member’s own calendar, or contact admissions@tescharlotte.org or 980-207-5898.',
          },
          {
            title: 'Submit the application + fee through FACTS',
            tag: 'by Jan 15',
            tagKind: 'accent',
            detail:
              'Set up your **FACTS admission account**, then submit the application and the application fee from it. **The fee amount is not published anywhere** on the admission pages — confirm it with the Admission Office. The school also notes it is **still accepting applications for the 2026-2027 school year in select grades**, so a family looking to move mid-cycle should ask rather than wait a year.',
          },
          {
            title: 'Recommendations and transcripts',
            tag: 'by Feb 26',
            tagKind: 'outline',
            detail:
              '**Teacher recommendations are required for all K-8 applicants**, and **transcripts are required for all 1st–8th grade applicants**. **Rising 6–8 applicants are required to submit TWO teacher recommendations — an English teacher and a math teacher recommendation.** The school does not state a number for rising grades 1–5; it states that recommendations are required. Ask the office how many your child’s grade needs.',
          },
          {
            title: 'Testing — and the instrument changes twice inside this band',
            tag: 'by Feb 26',
            tagKind: 'accent',
            detail:
              '**Check your child’s grade against all three.** **Grade 1** takes the **WPPSI-IV** with the Kindergarten applicants; **Grades 2–4** take the **WISC-V**. Both run through the **CAIS consortium**: **one psychologist only**, **$275** paid to them, an **interview with each child** around **November–February**, and results as **percentile ranges**. **Grades 5–8 take the ISEE** instead — outside CAIS entirely, so no consortium fee, no consortium psychologist, and you register yourself. **"Grades 1–8 take the ISEE" is the costly mistake: it starts at Grade 5.**',
          },
          {
            title: 'Wildcat Visit Day',
            tag: 'from November',
            tagKind: 'outline',
            detail:
              'Applicants are invited to register from **November** to **spend the day on campus** — the full day applies to rising 1st–8th graders.',
          },
          {
            title: 'Decision → the Follow-Up Conference',
            tag: 'Fri Apr 9, 2027',
            tagKind: 'accent',
            detail:
              'Decisions are emailed on **Friday, April 9, 2027**, six weeks after the Kindergarten band. Trinity invites **every family** who completes the application process — not only admitted ones — to sit down with the admission team to share what they learned about the child and "help the family discern how Trinity Episcopal School can best partner with the family in support of their child."',
          },
        ],
        watchOuts: [
          {
            kicker: 'Coaching or re-testing invalidates the application at EVERY CAIS school',
            text: 'Grades 1–4 only, whose testing runs through the consortium: **"Psychologists will report to the schools any indication that a child has been coached, tutored, or re-tested. Any indication of the aforementioned will invalidate your application to any CAIS school."** That reaches **all seven** CAIS schools, not just Trinity, and you sign a **Test Validity Verification Form** at the psychologist’s office. Grades 5–8 sit outside CAIS, so it does not apply.',
          },
        ],
        checklistCallout: {
          lead: 'Check which test your grade sits — it changes twice inside this band.',
          text: 'Grade 1 takes the WPPSI-IV with the Kindergarten applicants, Grades 2–4 take the WISC-V, and Grades 5–8 take the ISEE. Grades 1–4 book through a CAIS psychologist at $275 with the consortium’s coaching and re-testing rules attached; Grades 5–8 register for the ISEE themselves, outside CAIS entirely. Applications are due January 15 and decisions email on Friday, April 9. Rising 6–8 applicants need two recommendations — English and math.',
        },
        checklistRows: [
          {
            action: 'Attend an open house or book a tour',
            detail:
              'K–8 open houses Nov 5 and Dec 1, 2026. Tour dates are not published — book through an admission team member’s calendar or call 980-207-5898.',
            due: 'Fall 2026',
          },
          {
            action: 'Set up your FACTS admission account',
            detail: 'The portal is FACTS. There is no Ravenna account at Trinity.',
            due: 'Fall 2026',
          },
          {
            action: 'Submit the application and the application fee',
            detail: 'The fee amount is not published — confirm it with the Admission Office.',
            due: 'Jan 15, 2027',
          },
          {
            action: 'Request the teacher recommendations and the transcript',
            detail:
              'Recommendations required for all K–8; transcripts for all 1st–8th. Rising 6–8 need two — English and math.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Complete the test your grade sits',
            detail:
              'Gr 1: WPPSI-IV · Gr 2–4: WISC-V, both through a CAIS psychologist at $275 · Gr 5–8: the ISEE, registered by you, outside CAIS.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Grades 1–4: sign the Test Validity Verification Form',
            detail:
              'Coaching, tutoring or re-testing invalidates the application at all seven CAIS schools. Does not apply to Grades 5–8.',
            due: 'At the psychologist’s office',
          },
          {
            action: 'Register for Wildcat Visit Day',
            detail: 'Rising 1st–8th graders spend the day on campus.',
            due: 'From November 2026',
          },
          {
            action: 'Watch for the decision email',
            detail: 'Emailed Friday, April 9, 2027.',
            due: 'Apr 9, 2027',
          },
          {
            action: 'Book the Follow-Up Conference',
            detail: 'Offered to every family who completes the process, whatever the decision.',
            due: 'After the decision',
          },
        ],
      },
    ],

    aid: {
      title: 'Running in parallel: the financial-aid clock',
      text: 'Prospective families apply for financial support by **February 1, 2027** — the same day Kindergarten supporting materials are due. ⚠️ The school’s admission-process page still prints the 2026 date; its tuition page says 2027. **Confirm it with the office.** Note too that the **$275 CAIS testing fee goes to the psychologist, not to Trinity**, so it falls due before any aid decision.',
      button: 'Financial Aid & Tuition',
    },

    comparison: {
      kicker: 'CROSS-BAND',
      title: 'Exactly what changes between bands',
      rows: [
        {
          label: 'Application due',
          cells: { k: 'Jan 2, 2027', g18: 'Jan 15, 2027' },
        },
        {
          label: 'Supporting materials due',
          cells: { k: 'Feb 1, 2027', g18: 'Feb 26, 2027' },
        },
        {
          label: 'Decisions emailed',
          cells: { k: 'Friday, Feb 26, 2027', g18: 'Friday, Apr 9, 2027' },
        },
        {
          label: 'Testing instrument',
          cells: {
            k: 'WPPSI-IV',
            g18: 'Gr 1: WPPSI-IV · Gr 2–4: WISC-V · Gr 5–8: ISEE',
          },
        },
        {
          label: 'Who administers the test',
          cells: {
            k: 'A CAIS consortium psychologist — $275, booked by you',
            g18: 'Gr 1–4: a CAIS psychologist, $275 · Gr 5–8: the ISEE, outside CAIS, registered by you',
          },
        },
        {
          label: 'Recommendations',
          cells: {
            k: 'Required — the school does not state a number',
            g18: 'Required at every grade; rising 6–8 submit two, English and math. Transcripts required 1–8',
          },
        },
        {
          label: 'Wildcat Visit Day',
          cells: {
            k: 'A morning observation session',
            g18: 'A full day on campus',
          },
        },
        {
          label: 'The CAIS invalidation rule',
          cells: {
            k: 'Applies — coaching, tutoring or re-testing invalidates the application at all seven CAIS schools',
            g18: 'Applies to Grades 1–4 only. Grades 5–8 sit outside CAIS entirely',
          },
        },
        {
          label: 'Constant in both bands',
          cells: {
            all: 'The FACTS portal · an application fee whose amount is not published anywhere on the site · teacher recommendations · the Follow-Up Conference, offered to every family who completes the process whatever the decision · and the CAIS guarantee that no member school requires a contract before the consortium’s common reply deadline',
          },
        },
      ],
    },

    contacts: {
      kicker: 'CONTACTS',
      title: 'The admission office',
      address:
        '750 East 9th Street, Charlotte, NC 28202 · admissions 980-207-5898 · admissions@tescharlotte.org',
      people: [
        {
          name: 'The Admission Office',
          detail:
            'Individual tour dates are not published — pick an admission team member on tescharlotte.org/admission and book from their own calendar, or call 980-207-5898 · 980-207-5898',
        },
        {
          name: 'En español: Fé Patriciu',
          detail:
            '"Si su idioma principal es el español y prefiere comunicarse en español, póngase en contacto con Fé Patriciu."',
        },
      ],
    },

    checklist: {
      portalNote: 'Portal: FACTS · tescharlotte.org — there is no Ravenna account at Trinity',
      aidPanel: {
        kicker: 'In parallel — the financial aid clock',
        items: [
          'The financial support deadline for prospective families is February 1, 2027 — the same day Kindergarten supporting materials are due.',
          'The school’s admission-process page prints this as "Thursday, February 1, 2026" — a year stale, and Feb 1 2026 was a Sunday. Its tuition page says Feb. 1, 2027. Confirm with the office before relying on either.',
          'The CAIS testing fee of $275 is paid to the psychologist, not to Trinity, and falls due before any aid decision — budget for it separately.',
          'The application fee amount is not published anywhere on the admission pages. Confirm it with the Admission Office.',
        ],
      },
      contactPanel: {
        kicker: 'Questions — admission office',
        lines: [
          'Admission — 980-207-5898 · admissions@tescharlotte.org',
          '750 East 9th Street, Charlotte, NC 28202',
          'Individual tour dates are not published; book from an admission team member’s own calendar.',
          'En español: Fé Patriciu.',
        ],
      },
      disclaimer:
        'Dates are the 2027–28 entry cycle as published on tescharlotte.org and retrieved in September 2026. Errors in the school’s own copy are reproduced rather than corrected: the financial-support deadline on the process page reads February 1, 2026 where the tuition page says February 1, 2027, and it is flagged where it appears. The Dec 1, 2026 open house is labelled "Thursday" when it falls on a Tuesday, and its start time differs between the school’s two admission pages. The CAIS consortium detail is from the 2024-25 brochure, whose structure carries forward but whose dates do not and are not reproduced. Cycle dates shift year to year — verify against the live pages before acting. Compiled by Charlotte School Compare; not affiliated with Trinity Episcopal School.',
    },

    sources: [
      {
        label:
          'tescharlotte.org — admission process: the 2027-28 deadline table for Kindergarten and Grades 1–8, the three testing instruments by grade band, the FACTS portal, Wildcat Visit Day, the recommendation and transcript requirements, and the Follow-Up Conference',
        url: PROCESS,
      },
      {
        label:
          'tescharlotte.org — admission events and tours: the three open houses with the times that differ from the process page for Dec 1, and the by-policy absence of individual tour dates',
        url: EVENTS,
      },
      {
        label:
          'tescharlotte.org — admission team: the office contact details and the published Spanish-language contact',
        url: ADMISSION,
      },
      {
        label:
          'CAIS consortium brochure (hosted on tescharlotte.org) — the seven member schools, the WPPSI-IV and WISC-V grade bands, the $275 testing fees, the coaching/tutoring/re-testing invalidation rule and the Test Validity Verification Form, the one-psychologist and twelve-month rules, the child interview window, percentile-range reporting, and the guarantee that no member school requires a contract before the common reply deadline. 2024-25 edition: its structure carries forward, its dates do not and are not reproduced here',
        url: CAIS,
      },
    ],
  },
}
