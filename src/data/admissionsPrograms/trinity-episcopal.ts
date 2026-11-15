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
// 2027-28 label.
//
// TWO DATE COLLISIONS ARE REAL, NOT ERRORS. February 26, 2027 is simultaneously
// the grades 1–8 supporting-materials deadline and the Kindergarten decision
// date; February 1, 2027 is both the K supporting-materials deadline and the
// prospective-family financial-aid deadline. Both are correct as published.
//
// LIVE-SITE RECHECK, 2026-11-14 (plan `trinitysite`). Trinity moved to a new
// Finalsite site and every old admission URL 404s. The new pages fixed all
// three school-side errors this card used to record: the Dec 1, 2026 open house
// is now "Tuesday … 9:30-11:00 a.m." on every page, and the financial-support
// deadline reads February 1, 2027. The Sept 29 and Nov 5 open houses have passed
// and are no longer listed, so Dec 1 is the only open house shown. The visit is
// no longer given its old event name, the Spanish-language contact line and
// the "still accepting 2026-2027 applications" note are gone, and the $100
// application fee is now published. The live site overrides the old research
// wherever they differ (user, 2026-11-14).
//
// THE CAIS BROCHURE IS THE 2027-28 EDITION, linked from the WISC-V / WPPSI-IV
// links on Applying to Trinity. Its dates now match Trinity's own calendar
// (K Jan 2 / Feb 1, Grades 1–4 Jan 15 / Feb 26, 2027), so the old "its dates do
// not carry forward" caveat is retired. It raised the fee by $25 to $300,
// replaced the 48-hour rule with a $100 nonrefundable cancellation fee and a
// 72-hour no-refund window, and no longer says results come as percentile
// ranges. Its common reply dates are Mar 5, 2027 (K) and Apr 16, 2027
// (Grades 1–4). ⚠️ The brochure labels the Grades 1–4 notification and reply
// dates "Thursday"; April 9 and April 16, 2027 are both Fridays. The card states
// the dates and never the brochure's weekday.
//
// NEVER NARRATE THE BROCHURE — the standing editorial rule from PR #261. The
// card states what a parent must DO (book with one consortium psychologist, pay
// $300, sign the Test Validity Verification Form) rather than describing what a
// document contains.
//
// GRADES 5–8 SIT OUTSIDE THE CAIS TESTING ARRANGEMENT ENTIRELY. The consortium's
// instruments, fees, invalidation rule and common notification dates apply to
// K–4 applicants only. Do not extend any of them to the ISEE grades.
//
// ⛔ CONFIRMED ABSENT, and stated as such rather than guessed:
//   · The acceptance rate — not on the site, not in either profile PDF.
//   · Individual tour dates, ABSENT BY POLICY: the school directs families to an
//     Admission Office member's own calendar or to the office. That is a
//     published policy, not a research gap.
//
// WATCH-OUTS ARE DELIBERATELY SPARSE — one per band, and only the CAIS coaching
// rule, whose consequence (an application invalidated at all seven schools) no
// step can carry. This card originally shipped three more; the user removed them
// at review (2026-09-16), and the two removals share a reason worth keeping:
// a watch-out that RESTATES a fact already in the steps reads as an alarm out of
// proportion to the fact. That is the same judgment behind the `watchOuts: []`
// convention on the four most recent cards (user, 2026-09-01).
// Before adding a watch-out, check the steps do not already say it.
//
// CONTACTS are the admission team as the live /admissions page lists them
// (Fé Patriciu, Rudy Wise, Marissa Hairston), each with their published email.
// Benita Griffin, the 2024-25 brochure's contact, is gone from both the
// brochure and the directory.
//
// TUITION FIGURES ARE DELIBERATELY ABSENT — they belong to the Financial Aid &
// Tuition area, which owns them. The aid strip carries only what an applicant
// must do and when.

import type { AdmissionsProgram } from '../admissionsPrograms.ts'

const PROCESS = 'https://www.tescharlotte.org/admissions/applying-to-trinity'
const EVENTS = 'https://www.tescharlotte.org/admissions/admission-events-tours'
const ADMISSION = 'https://www.tescharlotte.org/admissions'
const CAIS =
  'https://resources.finalsite.net/images/v1790272603/tescharlotteorg/iwsznwbihbhflkundb91/CAIS2027-2028Upload1.pdf'

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
      { value: '$300', label: 'CAIS testing fee, K–4 — paid to the psychologist, not the school' },
    ],

    rules: [
      {
        title: 'One portal.',
        text: 'Everything runs through FACTS. Set up your FACTS admission account, then submit the application and the application fee from it. Trinity does not use Ravenna. If you have a Ravenna account for another Charlotte school, it does not carry over to this one.',
      },
      {
        title: 'Three different grade splits, and they do not line up.',
        text: 'The deadlines break once, at Kindergarten to Grade 1. The test changes twice more — WPPSI-IV in K and Grade 1, the WISC-V in Grades 2 to 4, the ISEE in Grades 5 to 8. And the CAIS consortium administers the testing for K to 4 only; Grades 5 to 8 sit outside it entirely. Check all three against your child’s grade rather than assuming one split covers them.',
      },
    ],

    spineNote:
      'Both bands follow the same main steps: visit → apply through FACTS with the fee → recommendations and transcripts → testing → a visit day or observation session → decision. What changes is the calendar, which test your child takes, and who gives it. Every family who completes the process is invited to a Follow-Up Conference with the admission team, whatever the outcome.',

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
          { value: '$300', label: 'WPPSI-IV testing fee, paid to the psychologist' },
        ],
        steps: [
          {
            title: 'Visit — an open house, or your own tour',
            tag: 'Fall 2026',
            tagKind: 'outline',
            detail:
              'The next open house is the **K–8 Open House** on **Tuesday, Dec. 1, 2026**, 9:30–11:00 a.m., in **Trinity’s Center for Community and the Arts**. Individual tour dates are not listed by policy. To book a tour, open an Admission Office member’s calendar on the school’s events page, or contact admissions@tescharlotte.org or 980-207-5898.',
          },
          {
            title: 'Submit the application + fee through FACTS',
            tag: 'by Jan 2',
            tagKind: 'accent',
            detail:
              'Set up your **FACTS admission account**, then submit the application from it. Once you click submit, you receive instructions for paying the **$100 application fee**. If you are applying for financial support, **contact the Admission Office before you submit**. You will get a separate email with next steps. Kindergarten applies **two weeks ahead of every other grade**, and hears back six weeks earlier.',
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
              'Kindergarten and Grade 1 applicants take the **WPPSI-IV** through the **CAIS consortium** — seven schools, one shared testing arrangement. **Book with one psychologist only**, at **$300**, paid to them rather than to Trinity. Booking opens the day after Labor Day, and payment by credit card or Zelle is due within 24 hours. Your child must be **four or older at testing**, which may be done **only once in twelve months**. Every cancellation costs a **$100 nonrefundable fee**, and canceling **within 72 hours** of the appointment gets no refund. CAIS also requires an **interview with each child**, usually **November–February**. Results go to you and to the schools you choose.',
          },
          {
            title: 'A morning observation session',
            tag: 'from November',
            tagKind: 'outline',
            detail:
              'Applicants are invited **beginning in November**. A rising Kindergartner attends a **morning observation session** rather than a full day. The full day on campus is for rising 1st–8th graders.',
          },
          {
            title: 'Decision → the Follow-Up Conference',
            tag: 'Fri Feb 26, 2027',
            tagKind: 'accent',
            detail:
              'Decisions are emailed on **Friday, February 26, 2027**. Under the CAIS common reply date, no CAIS school requires a contract before **Friday, March 5, 2027**. Trinity invites **every family** who completes the application process, not only admitted ones, "to meet with the Admission team to share what we have learned about their child through the process, and help the family discern how Trinity Episcopal School can best partner with the family in support of their child."',
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
          text: 'Kindergarten applies by January 2 and submits supporting materials by February 1. Families hear back on Friday, February 26, six weeks before Grades 1–8. You book the WPPSI-IV yourself with a single CAIS psychologist, for $300. Coaching, tutoring or re-testing makes your application invalid at all seven CAIS schools. The application fee is $100.',
        },
        checklistRows: [
          {
            action: 'Attend an open house or book a tour',
            detail:
              'K–8 Open House Tuesday, Dec. 1, 2026, 9:30–11:00 a.m. Tour dates are not listed — book through an Admission Office member’s calendar.',
            due: 'Fall 2026',
          },
          {
            action: 'Set up your FACTS admission account',
            detail: 'The portal is FACTS. There is no Ravenna account at Trinity.',
            due: 'Fall 2026',
          },
          {
            action: 'Submit the application and the application fee',
            detail: 'The fee is $100. Payment instructions arrive after you click submit.',
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
              '$300, paid to the psychologist. One psychologist only. At least four years old at testing; once per twelve months. Any cancellation costs a $100 nonrefundable fee.',
            due: 'Feb 1, 2027',
          },
          {
            action: 'Sign the Test Validity Verification Form',
            detail:
              'Confirms no prior testing or coaching. Coaching, tutoring or re-testing invalidates the application at all seven CAIS schools.',
            due: 'At the psychologist’s office',
          },
          {
            action: 'Attend the morning observation session',
            detail: 'Rising Kindergartners are invited to a morning observation rather than a full day.',
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
          { value: '$300', label: 'CAIS testing fee — Grades 1–4 only; no CAIS fee at 5–8' },
        ],
        steps: [
          {
            title: 'Visit — an open house, or your own tour',
            tag: 'Fall 2026',
            tagKind: 'outline',
            detail:
              'The next open house is the **K–8 Open House** on **Tuesday, Dec. 1, 2026**, 9:30–11:00 a.m., in **Trinity’s Center for Community and the Arts**. Individual tour dates are not listed by policy. To book a tour, open an Admission Office member’s calendar on the school’s events page, or contact admissions@tescharlotte.org or 980-207-5898.',
          },
          {
            title: 'Submit the application + fee through FACTS',
            tag: 'by Jan 15',
            tagKind: 'accent',
            detail:
              'Set up your **FACTS admission account**, then submit the application from it. Once you click submit, you receive instructions for paying the **$100 application fee**. If you are applying for financial support, **contact the Admission Office before you submit**. You will get a separate email with next steps.',
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
              '**Check your child’s grade against all three.** **Grade 1** takes the **WPPSI-IV** with the Kindergarten applicants; **Grades 2–4** take the **WISC-V**. Both run through the **CAIS consortium**: **one psychologist only**, **$300** paid to them, an **interview with each child** around **November–February**, and a **$100 nonrefundable fee** on any cancellation. **Grades 5–8 take the ISEE** instead — outside CAIS entirely, so no consortium fee, no consortium psychologist, and you register yourself. **"Grades 1–8 take the ISEE" is the costly mistake: it starts at Grade 5.**',
          },
          {
            title: 'A day on campus',
            tag: 'from November',
            tagKind: 'outline',
            detail:
              'Applicants are invited **beginning in November** to **spend a day on campus**. The full day applies to rising 1st–8th graders.',
          },
          {
            title: 'Decision → the Follow-Up Conference',
            tag: 'Fri Apr 9, 2027',
            tagKind: 'accent',
            detail:
              'Decisions are emailed on **Friday, April 9, 2027**, six weeks after the Kindergarten band. For Grades 1–4, no CAIS school requires a contract before **April 16, 2027**. Trinity invites **every family** who completes the application process to meet with the admission team, not only families whose child was admitted. The meeting is to share what the team learned about the child and to "help the family discern how Trinity Episcopal School can best partner with the family in support of their child."',
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
          text: 'Grade 1 takes the WPPSI-IV with the Kindergarten applicants, Grades 2–4 take the WISC-V, and Grades 5–8 take the ISEE. Grades 1–4 book through a CAIS psychologist at $300 with the consortium’s coaching and re-testing rules attached; Grades 5–8 register for the ISEE themselves, outside CAIS entirely. Applications are due January 15 and decisions email on Friday, April 9. Rising 6–8 applicants need two recommendations — English and math.',
        },
        checklistRows: [
          {
            action: 'Attend an open house or book a tour',
            detail:
              'K–8 Open House Tuesday, Dec. 1, 2026, 9:30–11:00 a.m. Tour dates are not listed — book through an Admission Office member’s calendar or call 980-207-5898.',
            due: 'Fall 2026',
          },
          {
            action: 'Set up your FACTS admission account',
            detail: 'The portal is FACTS. There is no Ravenna account at Trinity.',
            due: 'Fall 2026',
          },
          {
            action: 'Submit the application and the application fee',
            detail: 'The fee is $100. Payment instructions arrive after you click submit.',
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
              'Gr 1: WPPSI-IV · Gr 2–4: WISC-V, both through a CAIS psychologist at $300 · Gr 5–8: the ISEE, registered by you, outside CAIS.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Grades 1–4: sign the Test Validity Verification Form',
            detail:
              'Coaching, tutoring or re-testing invalidates the application at all seven CAIS schools. Does not apply to Grades 5–8.',
            due: 'At the psychologist’s office',
          },
          {
            action: 'Attend the day on campus',
            detail: 'Rising 1st–8th graders are invited to spend a day on campus.',
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
      text: 'Prospective families apply for financial support by **February 1, 2027** — the same day Kindergarten supporting materials are due. If you plan to apply for aid, **contact the Admission Office before you submit your application**. The aid application runs online through **Clarity** and takes about 20 minutes. Note too that the **$300 CAIS testing fee goes to the psychologist, not to Trinity**, so it falls due before any aid decision.',
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
            k: 'A CAIS consortium psychologist — $300, booked by you',
            g18: 'Gr 1–4: a CAIS psychologist, $300 · Gr 5–8: the ISEE, outside CAIS, registered by you',
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
          label: 'The applicant visit',
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
            all: 'The FACTS portal · a $100 application fee · teacher recommendations · the Follow-Up Conference, offered to every family who completes the process whatever the decision · and the CAIS guarantee that no member school requires a contract before the consortium’s common reply deadline',
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
            'Individual tour dates are not listed. Pick an Admission Office member on the school’s events page and book from their own calendar, or call 980-207-5898.',
        },
        {
          name: 'Fé Patriciu',
          detail: 'Chief Enrollment Officer · fpatriciu@tescharlotte.org',
        },
        {
          name: 'Rudy Wise',
          detail: 'Director of Admission and Boarding School Placement · rwise@tescharlotte.org',
        },
        {
          name: 'Marissa Hairston',
          detail: 'Registrar · mhairston@tescharlotte.org',
        },
      ],
    },

    checklist: {
      portalNote: 'Portal: FACTS · tescharlotte.org — there is no Ravenna account at Trinity',
      aidPanel: {
        kicker: 'In parallel — the financial aid clock',
        items: [
          'The financial support deadline for prospective families is February 1, 2027 — the same day Kindergarten supporting materials are due.',
          'If you are applying for financial support, contact the Admission Office before you submit your application. The aid application runs online through Clarity and takes about 20 minutes.',
          'The CAIS testing fee of $300 is paid to the psychologist, not to Trinity, and falls due before any aid decision — budget for it separately.',
          'The application fee is $100. Payment instructions arrive after you submit the application.',
        ],
      },
      contactPanel: {
        kicker: 'Questions — admission office',
        lines: [
          'Admission — 980-207-5898 · admissions@tescharlotte.org',
          '750 East 9th Street, Charlotte, NC 28202',
          'Individual tour dates are not listed; book from an Admission Office member’s own calendar.',
          'Chief Enrollment Officer: Fé Patriciu · fpatriciu@tescharlotte.org',
        ],
      },
      disclaimer:
        'Dates are for the 2027–28 entry cycle, as published on tescharlotte.org and checked on November 14, 2026. The CAIS consortium detail is from its 2027-28 brochure, whose dates match Trinity’s own. Cycle dates change from year to year, so check the live pages before acting. Compiled by Charlotte School Compare; not affiliated with Trinity Episcopal School.',
    },

    sources: [
      {
        label:
          'tescharlotte.org — Applying to Trinity: the 2027-28 deadline table for Kindergarten and Grades 1–8, the three testing instruments by grade band, the FACTS portal and the $100 application fee, the visit day and observation session, the recommendation and transcript requirements, the financial-support steps and the Follow-Up Conference',
        url: PROCESS,
      },
      {
        label:
          'tescharlotte.org — Admission Events & Tours: the Dec. 1, 2026 K–8 Open House and the by-policy absence of individual tour dates',
        url: EVENTS,
      },
      {
        label:
          'tescharlotte.org — Admissions: the admission team, their titles and emails, and the office contact details',
        url: ADMISSION,
      },
      {
        label:
          'CAIS consortium brochure, 2027-28 edition (linked from Applying to Trinity) — the seven member schools, the WPPSI-IV and WISC-V grade bands, the $300 testing fees, the booking, payment and cancellation rules, the coaching/tutoring/re-testing invalidation rule and the Test Validity Verification Form, the one-psychologist and twelve-month rules, the child interview window, and the common notification and contract dates',
        url: CAIS,
      },
    ],
  },
}
