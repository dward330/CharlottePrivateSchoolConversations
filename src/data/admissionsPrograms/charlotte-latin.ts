// Charlotte Latin School — Admissions.
//
// Transcribed from the committed research file
// source-material/admissions/charlotte-latin/Charlotte Latin - Admissions -
// Grade-by-Grade Application Plans.md, which carries the provenance header, the
// eight official source URLs and the record-level detail behind every figure
// below. Official charlottelatin.org pages ONLY, at the user's explicit
// instruction; every structural claim was re-verified tab by tab against the
// live site on 2026-08-31. The CAIS consortium detail this card leans on is the
// same brochure documented for Country Day, in that school's "… - CAIS Testing
// Consortium.md" — Charlotte Latin is a listed member school.
//
// CYCLE: fall 2027 entry, labelled "2027–28 entry cycle" — the site labels every
// school by the school year the child ENTERS (user decision 2026-11-10; this card
// said "2026–27", the year families apply, before). The "2026–27" / "2025–26"
// names below are the older apply-year labels. PRIOR-CYCLE DATES ARE CLOSED. Cached and earlier
// versions of the SAME Application Process URL served the 2025–26 cycle —
// a December 31, 2025 TK/Kindergarten deadline, January 15, 2026 for Grades
// 1–12, testing "completed and submitted by February 28, 2026" and "February
// 27, 2026 – All File Material due". None of those is carried forward here.
// The live page now shows the January 2027 / February 26, 2027 dates this card
// ships. No dates for the following cycle (fall 2028 entry) are published yet. Because the same URLs have served
// different cycles over time, every figure here is anchored to the live pages
// as retrieved on the dates in the research file.
//
// ⚠️ NOTIFICATION DAYS PUBLISHED; NO CONTRACT DATE (updated 2026-11-10, plan
// latinnotify). The Application Process page's "Important Admissions and
// Financial Aid Dates" block reads "February 26: TK and K notification day; TK
// and K financial award decisions communicated" and "April 9: Grades 1-11
// notification day; Grades 1-11 financial aid award decisions communicated".
// The block states NO YEAR. Every other date on the page is 2027 (its "January
// 2: TK and K applications due" is the page's "January 2, 2027 - Application
// due"), and both days match the other CAIS schools' 2027 notification dates,
// so the card ships them as Feb 26, 2027 and Apr 9, 2027. GRADE 12 IS NOT NAMED
// — the Upper School band says so. NO ENROLLMENT CONTRACT DATE is published.
//
// HISTORY: on 2026-08-31 the absence of any decision date was "the defining
// structural fact" of this card, and it carried a rule — "do not add a
// decision or contract step, tile or comparison cell". The school then
// published the two notification days, and the user retired that rule on
// 2026-11-10: every band now ends with a `Decision` deadline tile, a final
// `Decision` step and a "Watch for your notification day" checklist row, like
// Providence Day, Country Day and Charlotte Christian. The step is titled
// `Decision`, not "Decision → contract", because no contract date exists.
// Every new tile and step was APPENDED, never inserted mid-array, so earlier
// overlay paths stay valid.
//
// THE $2,500 DEPOSIT stays where it was. It is published on the Tuition page as
// an enrollment CONDITION, not as a dated milestone, so it ships in the `aid`
// strip and the checklist aid panel, and the Decision steps mention it, rather
// than as a deadline tile — a tile would imply a date the school does not
// publish.
//
// FOUR DEADLINE TILES IN TK/K, THREE IN LOWER SCHOOL, FIVE IN MIDDLE AND UPPER.
// TK/Kindergarten and Lower School publish no all-file-material deadline, so
// they carry fewer tiles than Middle and Upper. `.adm-deadlines` is
// `repeat(auto-fit, minmax(150px, 1fr))`, so a 3-, 4- or 5-tile strip is a
// first-class layout. Do NOT pad with an invented tile, and do NOT reach for
// `unpublished: true` — that flag marks a KNOWN CONSTANT standing in for a
// missing date (Providence Day's `4:00 p.m.`). Latin publishes no such
// constant, so no tile on this card carries the flag.
//
// ROLLING ADMISSIONS IS NOT SHIPPED AS CURRENT POLICY. A prior-cycle
// admissions-director blog post states the school "enters rolling admissions"
// after January 15. That is NOT restated on the current Application Process
// page, and the school now publishes fixed notification days instead (see
// above), so it is historical guidance rather than current policy and appears
// nowhere on the card.
//
// THE NEST IS A SEPARATE SCHOOL FOR THIS PURPOSE. Latin's licensed preschool,
// "The Nest", publishes an age cutoff and an employee/alumnus and younger-
// sibling preference. Those govern the PRESCHOOL, not TK–12 admission, and must
// never be extended to this card. No sibling, legacy/alumni or faculty-children
// preference is published for TK–12. SEPARATELY, the Application Process
// page's events calendar listed "K-12 Sibling Admissions Applications Due" on
// Oct 15, 2026 — an earlier DEADLINE for siblings, not a published admission
// preference. Each band's application step names it (user decision
// 2026-11-10), as a past date. It says K-12, so the TK/K band does not claim
// it covers TK.
//
// TK/K AGE ELIGIBILITY IS NOT PUBLISHED, and North Carolina's statutory
// public-school kindergarten cutoff is deliberately NOT attributed to the
// school. The site describes TK only qualitatively — children who are "newly
// five and ready for Kindergarten" — and the Lower School academics page
// carries no cutoff date, age requirement or readiness criteria (re-verified
// 2026-08-31).
//
// GRADES 6–8 AND 9–11 ARE TWO SEPARATE ISEE STATEMENTS, not a 6–11 range. The
// Middle School tab reads "Grades 6-8 applicants take the ISEE"; the Upper
// School tab reads "Grades 9-11 applicants take the ISEE". No entrance
// assessment is published for GRADE 12, and the Upper School band says so
// rather than papering over the gap.
//
// NO BAND SUBLABELS, BY DECISION (user's call, 2026-08-31). The other three
// schools give each selector button a one-line sublabel naming what
// distinguishes the band ("WPPSI-IV · earliest deadline"). Latin ships none:
// the button carries the grades and nothing else, and what changes between
// bands — the assessment, who schedules the Visit Day, whether there is an
// interview — is stated in `spineNote`, in each band's steps and in the
// cross-band table, which is where a parent reads it in full rather than in a
// truncated chip. `sublabel` is optional on the shared type for exactly this
// reason; do not backfill these as missing.
//
// NOTE FOR EDITORS: `rules[].text` is rendered RAW — `<strong>{title}</strong>
// {text}` in AdmissionsProgram.tsx — so it is the one prose field on this card
// with NO markdown support. A `**bold**` span here ships as literal asterisks.
// `Emphasized` covers steps[].detail, watchOuts[].text and aid.text, but not
// this, and not deadlines[].value/label.
//
// `watchOuts: []` IN ALL FOUR BANDS, BY DECISION (2026-08-31) — authored at the
// endpoint the two shipped cards were trimmed to, not walked there through
// another review cycle. Country Day shipped 2/2/2 and was cut to 1/1/2 (PR
// #261); Charlotte Christian shipped 2/2/2/2 and was cut to [] in every band
// (PR #258). Do NOT read these as unresearched and backfill them. Every fact a
// watch-out would have carried is carried instead by `steps[].detail` and by
// each band's `checklistCallout` — the earlier TK/K deadline, who schedules the
// Visit Day, the unpublished TK/K age cutoff, the twice-changing Lower School
// assessment and its two booking routes, the missing all-file deadline in the
// lower bands, the Feb 26 back-planning constraint, the Middle and Upper Visit
// Day characters, the unpublished Grade 12 assessment, the notification days
// and the absent contract date. That is exactly why both prior trims were safe.
//
// NO URL-LESS TRAILING NOTE IN `sources` (2026-08-31). Charlotte Christian's
// two "Retrieved Aug 2026" prose notes were cut at review as prose paragraphs
// in a row of citation links. Every entry below carries a URL. The NOT-PUBLISHED
// register — the enrollment contract date (decision days ARE published since
// 2026-11-10, except Grade 12's), the application fee, the TK/K age
// cutoff, recommendation forms, writing samples, parent interviews, waitlist
// procedures, sibling/legacy/faculty preference, re-application, transfer and
// mid-year entry, international I-20/visa and English-proficiency testing, the
// Grade 12 assessment, any current-cycle aid application fee, and named open
// house dates beyond the TK/K Fly By — lives in this header and in full in the
// research file. Do not restore it as "missing provenance".
//
// THE AID APPLICATION FEE: a prior-cycle financial-aid presentation referenced
// a $60 nonrefundable fee tied to the former SSS/NAIS platform. The school has
// since moved to Clarity and the current page states no fee. The $60 is NOT
// shipped.
//
// TUITION FIGURES ARE NOT CITED HERE. The 2026–27 figures (TK and Kindergarten
// $27,600; Grades 1–5 $32,600; Grades 6–8 $35,200; Grades 9–12 $36,500) belong
// to the Financial Aid & Tuition area and are recorded in the research file for
// provenance only.
//
// CONTACTS: all nine admissions staff, re-verified 2026-08-31 against the
// official Meet Our Team page, each with the title exactly as published. NO
// individual phone numbers or email addresses are published for any of them —
// only the office line and the two shared mailboxes. Do not synthesize them.
// (Mary Yorke Oates' title was cited to a third-party site in an earlier draft
// of the research, in violation of the official-sources-only constraint; the
// official page independently gives "Director of Enrollment Management", so the
// finding stands with the citation corrected.)
//
// NOT RETRIEVED: the main events calendar is JavaScript-rendered and could not
// be read server-side, so admissions events beyond the TK/K Fly By Open House
// may exist behind it. The card names only the one dated event the school
// publishes in readable HTML.

import type { AdmissionsProgram } from '../admissionsPrograms.ts'

export const charlotteLatin: AdmissionsProgram = {
  guide: {
    headline:
      "Pick your child's entry point and the guide personalizes: the steps in order, the 2027–28 deadlines, and the testing for that band — plus a printable checklist to take with you. All four tracks follow the same main steps. What changes between them is the assessment, who schedules the Visit Day, whether there is an interview, and the deadline.",
    cycle: '2027–28 entry cycle',

    stats: [
      // The 'grade bands' count tile was removed by request (2026-08-31) — not a data gap.
      {
        value: 'Jan 2, 2027',
        label: 'TK/Kindergarten application deadline — 13 days ahead of every other grade',
      },
      { value: 'Jan 15, 2027', label: 'Grades 1–12 application deadline' },
      { value: '$2,500', label: 'non-refundable enrollment deposit' },
    ],

    rules: [
      {
        title: 'One portal, start to finish.',
        text: 'Everything runs through Finalsite Enrollment at charlottelatin.fsenrollment.com. Submit an inquiry and create your family profile there. Then use the same account to RSVP for optional admissions events, submit materials, find forms and meet the deadlines.',
      },
      {
        title: 'Every date below is the 2027–28 cycle.',
        text: 'Cycle dates shift from year to year, and these pages have carried a different set in a previous season. Verify against the live admissions pages before you act on any of them.',
      },
    ],

    spineNote:
      'Every band follows the same five steps. First: apply online through the portal → attend a Visit Day → complete a standardized assessment. Then: meet the deadlines → hear back on notification day. What changes between bands is which assessment your child takes and who schedules the Visit Day: the admissions office or you. Bands also differ in whether that day includes an interview, and in which deadline you work to.',

    bands: [
      {
        key: 'tkk',
        label: 'TK / Kindergarten',
        title: 'Transitional Kindergarten & Kindergarten',
        // Four tiles: this band publishes no all-file-material deadline, so it
        // has one fewer than Middle and Upper. See the header — the strip is
        // auto-fit, so it is not padded with an invented tile.
        deadlines: [
          { value: 'Jan 2, 2027', label: 'application due' },
          { value: 'Oct 10, 2026', label: 'TK/K Fly By Open House — 9:30–11:00 a.m.' },
          { value: 'Jan 15, 2027', label: 'financial aid application due' },
          { value: 'Feb 26, 2027', label: 'notification day' },
        ],
        steps: [
          {
            title: 'Submit an inquiry, then create your family profile',
            tag: 'Fall 2026',
            tagKind: 'outline',
            detail:
              'The required first step: families "first submit an inquiry and then create a profile for your family." That account then prompts you to RSVP for optional admissions events, submit materials, locate forms and meet deadlines. Every later step in this list runs through it.',
          },
          {
            title: 'RSVP for the optional admissions events',
            tag: 'Oct 10, 2026',
            tagKind: 'outline',
            detail:
              'Optional, not required. The **TK/K Fly By Open House on October 10, 2026, 9:30–11:00 a.m.** is the one dated event published for this band. Campus tours begin in September and run throughout the school year. Open houses, tours and virtual sessions are all booked through your portal account.',
          },
          {
            title: 'Complete the application',
            tag: 'by Jan 2',
            tagKind: 'accent',
            detail:
              'Required, and due **January 2, 2027**. That is thirteen days ahead of every other grade in the school. So this band\'s deadline falls in the first week of January, not the middle of it. **No age or birthday cutoff is published** for Transitional Kindergarten or Kindergarten. The school describes TK only in general terms, as being "designed for children that are newly five and ready for Kindergarten," and states no calendar date. Ask the admissions office where your child falls. Siblings of current students had an earlier deadline. The school\'s calendar listed **K-12 sibling applications due October 15, 2026**. If you are a sibling family applying now, ask the admissions office. The listing says K-12, so it does not say whether it covers TK.',
          },
          {
            title: 'Attend a Visit Day — the office schedules it',
            tag: 'scheduled for you',
            tagKind: 'outline',
            detail:
              'Required, and **this is the one band where you do not book it**: "Attend Visit Day (our office will schedule)." Every other grade schedules its own. On the day, "your child will experience the joy of a Latin classroom for a few hours while you meet with current parents and hear from a panel of Upper School students."',
          },
          {
            title: 'Complete the WPPSI assessment',
            tag: 'required',
            tagKind: 'accent',
            detail:
              'Required. Applicants to this band take the **WPPSI**. A psychologist in the Charlotte Area Independent Schools consortium gives the test. Testing "need[s] to be scheduled in advance." You book the psychologist directly and ask that the scores be sent to Charlotte Latin. The school does not arrange the appointment.',
          },
          {
            title: 'Apply for financial aid, if you need it',
            tag: 'by Jan 15',
            tagKind: 'outline',
            detail:
              'Optional, and on its own clock: the aid application opens through **Clarity** on **September 15, 2026**. It is due **January 15, 2027** to be considered in the priority round. That is two weeks after this band\'s own application deadline. One application covers every child in the family. Award decisions come on your notification day, **February 26, 2027**.',
          },
          {
            title: 'Decision',
            tag: 'Feb 26',
            tagKind: 'accent',
            detail:
              '**February 26, 2027** is the school\'s "TK and K notification day." Financial aid award decisions are communicated the same day. **No enrollment contract date is published**, so ask the admissions office when it is due. Enrolling also requires the **$2,500 non-refundable deposit**.',
          },
        ],
        // EMPTY BY DECISION, 2026-08-31 — see the header. The earlier deadline,
        // the office-scheduled Visit Day, the unpublished age cutoff and the
        // missing all-file deadline are all carried by the steps above and the
        // callout below.
        watchOuts: [],
        checklistCallout: {
          lead: 'Your application deadline is Jan 2, 2027.',
          text: 'Transitional Kindergarten and Kindergarten apply thirteen days ahead of every other grade. The admissions office, not the family, schedules this band\'s Visit Day. No deadline for all file materials is published for this band. So treat your portal checklist as the final word on what is still outstanding. Decisions come on notification day, February 26, 2027. No enrollment contract date is published, so confirm it with the admissions office.',
        },
        checklistRows: [
          {
            action: 'Submit the online inquiry form',
            detail: 'The required first step; it lets you create your family profile in the portal.',
            due: 'Fall 2026',
          },
          {
            action: 'Create your family profile in the portal',
            detail: 'Finalsite Enrollment — where you RSVP, submit materials and track deadlines.',
            due: 'Fall 2026',
          },
          {
            action: 'RSVP for the TK/K Fly By Open House',
            detail: 'Optional. October 10, 2026, 9:30–11:00 a.m. Campus tours run from September.',
            due: 'Oct 10, 2026',
          },
          {
            action: 'Submit the application',
            detail: 'Thirteen days ahead of the Grades 1–12 deadline. No age cutoff is published.',
            due: 'Jan 2, 2027',
          },
          {
            action: 'Attend the Visit Day the office schedules for you',
            detail: 'A few hours in a Latin classroom; parents meet current parents and a student panel.',
            due: 'Scheduled for you',
          },
          {
            action: 'Book and complete the WPPSI assessment',
            detail: 'Scheduled in advance with a CAIS psychologist; ask that scores be sent to Latin.',
            due: 'Before your deadline',
          },
          {
            action: 'Submit the Clarity financial aid application',
            detail: 'Optional. Opens Sept 15, 2026; one application covers multiple children.',
            due: 'Jan 15, 2027',
          },
          {
            action: 'Watch for your notification day',
            detail: 'Admission and financial aid decisions come that day. No contract date is published; confirm it with admissions.',
            due: 'Feb 26, 2027',
          },
        ],
      },
      {
        key: 'ls',
        label: 'Lower School · Grades 1–5',
        title: 'Lower School — Grades 1–5',
        // THREE tiles (application, aid, notification day). Like TK/K this band
        // publishes no all-file-material deadline, and unlike TK/K it has no
        // dated event to name either — the Fly By Open House is TK/K only. A
        // tile reading "Not published" would be an invented tile, which is exactly
        // what the no-padding rule in the header forbids; the absence is stated
        // in the callout and in the cross-band table instead.
        deadlines: [
          { value: 'Jan 15, 2027', label: 'application due' },
          { value: 'Jan 15, 2027', label: 'financial aid application due' },
          { value: 'Apr 9, 2027', label: 'notification day' },
        ],
        steps: [
          {
            title: 'Submit an inquiry, then create your family profile',
            tag: 'Fall 2026',
            tagKind: 'outline',
            detail:
              'The required first step: families "first submit an inquiry and then create a profile for your family." That account then prompts you to RSVP for optional admissions events, submit materials, locate forms and meet deadlines.',
          },
          {
            title: 'Complete the application',
            tag: 'by Jan 15',
            tagKind: 'accent',
            detail:
              'Required, and due **January 15, 2027** — the deadline every grade from 1 through 12 works to, thirteen days later than Transitional Kindergarten and Kindergarten. Siblings of current students had an earlier deadline. The school\'s calendar listed **K-12 sibling applications due October 15, 2026**. If you are a sibling family applying now, ask the admissions office.',
          },
          {
            title: 'Schedule and attend a Visit Day',
            tag: 'you book it',
            tagKind: 'outline',
            detail:
              'Required, and **the family schedules it** from this band upward: "Schedule a Visit Day." The admissions office books only the TK and Kindergarten visits. Your child spends time in a Latin classroom while you meet the school.',
          },
          {
            title: 'Complete the standardized assessment for your child\'s grade',
            tag: 'required',
            tagKind: 'accent',
            detail:
              'Required, and **the test changes twice inside this one band**. Grade 1 applicants take the **WPPSI**, Grades 2–4 the **WISC-V**, and Grade 5 the **ISEE**. How you book changes with it. A psychologist in the Charlotte Area Independent Schools consortium gives the WPPSI and WISC-V, and you contact that psychologist directly. The ISEE is developed and given by the **Educational Records Bureau**, and Grade 5 families register through the ERB. Check which test applies to the grade your child is entering before you book anything.',
          },
          {
            title: 'Apply for financial aid, if you need it',
            tag: 'by Jan 15',
            tagKind: 'outline',
            detail:
              'Optional, and on its own clock: the aid application opens through **Clarity** on **September 15, 2026**. It is due **January 15, 2027** to be considered in the priority round. That is the same day as this band\'s application deadline. One application covers every child in the family. Award decisions come on your notification day, **April 9, 2027**.',
          },
          {
            title: 'Decision',
            tag: 'Apr 9',
            tagKind: 'accent',
            detail:
              '**April 9, 2027** is the school\'s "Grades 1-11 notification day." Financial aid award decisions are communicated the same day. **No enrollment contract date is published**, so ask the admissions office when it is due. Enrolling also requires the **$2,500 non-refundable deposit**.',
          },
        ],
        // EMPTY BY DECISION, 2026-08-31 — see the header. The twice-changing
        // assessment, its two booking routes and the missing all-file deadline
        // are carried by the steps above and the callout below.
        watchOuts: [],
        checklistCallout: {
          lead: 'The assessment changes twice inside this one band.',
          text: 'Grade 1 takes the WPPSI, Grades 2–4 the WISC-V and Grade 5 the ISEE. How you book changes with it. For the WPPSI and WISC-V, you contact a CAIS psychologist directly. For the ISEE, you register with the Educational Records Bureau. Confirm which test applies to your child\'s entry grade before booking. No deadline for all file materials is published for this band. So treat your portal checklist as the final word on what is still outstanding. Decisions come on notification day, April 9, 2027. No enrollment contract date is published, so confirm it with the admissions office.',
        },
        checklistRows: [
          {
            action: 'Submit the online inquiry form',
            detail: 'The required first step; it lets you create your family profile in the portal.',
            due: 'Fall 2026',
          },
          {
            action: 'Create your family profile in the portal',
            detail: 'Finalsite Enrollment — where you RSVP, submit materials and track deadlines.',
            due: 'Fall 2026',
          },
          {
            action: 'Submit the application',
            detail: 'The Grades 1–12 deadline, thirteen days after the TK/K one.',
            due: 'Jan 15, 2027',
          },
          {
            action: 'Schedule and attend a Visit Day',
            detail: 'From Grade 1 upward the family books it, not the admissions office.',
            due: 'Before your deadline',
          },
          {
            action: 'Book and complete the assessment for your entry grade',
            detail: 'Grade 1 WPPSI · Grades 2–4 WISC-V (both CAIS) · Grade 5 ISEE (through the ERB).',
            due: 'Before your deadline',
          },
          {
            action: 'Submit the Clarity financial aid application',
            detail: 'Optional. Opens Sept 15, 2026; one application covers multiple children.',
            due: 'Jan 15, 2027',
          },
          {
            action: 'Watch for your notification day',
            detail: 'Admission and financial aid decisions come that day. No contract date is published; confirm it with admissions.',
            due: 'Apr 9, 2027',
          },
        ],
      },
      {
        key: 'ms',
        label: 'Middle School · Grades 6–8',
        title: 'Middle School — Grades 6–8',
        deadlines: [
          { value: 'Jan 15, 2027', label: 'application due' },
          { value: 'Feb 26, 2027', label: 'testing completed and submitted' },
          { value: 'Feb 26, 2027', label: 'all file material due' },
          { value: 'Jan 15, 2027', label: 'financial aid application due' },
          { value: 'Apr 9, 2027', label: 'notification day' },
        ],
        steps: [
          {
            title: 'Submit an inquiry, then create your family profile',
            tag: 'Fall 2026',
            tagKind: 'outline',
            detail:
              'The required first step: families "first submit an inquiry and then create a profile for your family." That account then prompts you to RSVP for optional admissions events, submit materials, locate forms and meet deadlines.',
          },
          {
            title: 'Complete the application',
            tag: 'by Jan 15',
            tagKind: 'accent',
            detail:
              'Required, and due **January 15, 2027** — the deadline shared by every grade from 1 through 12. Sixth grade is one of the years the school "naturally expand[s]" in, alongside TK, Kindergarten and ninth grade. Siblings of current students had an earlier deadline. The school\'s calendar listed **K-12 sibling applications due October 15, 2026**. If you are a sibling family applying now, ask the admissions office.',
          },
          {
            title: 'Schedule and attend a Visit Day — interview included',
            tag: 'you book it',
            tagKind: 'outline',
            detail:
              'Required, and the family schedules it. This band\'s Visit Day does much more than the ones for younger grades. The school says "your prospective Middle School student will have **an interview, take an assessment, observe a class, and connect with Latin students**." Treat it as an assessment day, not a tour. The school states outright that this band\'s day includes both the interview and an on-site assessment.',
          },
          {
            title: 'Complete the ISEE',
            tag: 'by Feb 26',
            tagKind: 'accent',
            detail:
              'Required: **Grades 6–8 applicants take the ISEE**, and "all Middle School testing needs to be completed and submitted by **February 26, 2027**." The ISEE is developed and given by the **Educational Records Bureau**. You register through the ERB, not the school. Your testing plan in this band hinges on that February 26 date, so **plan your registration backward from it**. A test seat has to be booked, taken and scored before the deadline, not on it.',
          },
          {
            title: 'Complete your file',
            tag: 'by Feb 26',
            tagKind: 'accent',
            detail:
              'All file material is due **February 26, 2027**, the same day as the testing deadline. Your portal account is where the outstanding items are listed and where they are submitted.',
          },
          {
            title: 'Apply for financial aid, if you need it',
            tag: 'by Jan 15',
            tagKind: 'outline',
            detail:
              'Optional, and on its own clock: the aid application opens through **Clarity** on **September 15, 2026**. It is due **January 15, 2027** to be considered in the priority round. That is six weeks before the file-material deadline. One application covers every child in the family. Award decisions come on your notification day, **April 9, 2027**.',
          },
          {
            title: 'Decision',
            tag: 'Apr 9',
            tagKind: 'accent',
            detail:
              '**April 9, 2027** is the school\'s "Grades 1-11 notification day." Financial aid award decisions are communicated the same day. **No enrollment contract date is published**, so ask the admissions office when it is due. Enrolling also requires the **$2,500 non-refundable deposit**.',
          },
        ],
        // EMPTY BY DECISION, 2026-08-31 — see the header. The Feb 26
        // back-planning constraint and the Visit Day's assessment character are
        // carried by the steps above and the callout below.
        watchOuts: [],
        checklistCallout: {
          lead: 'February 26, 2027 is the date that binds this band.',
          text: 'Both the ISEE and every remaining file item are due that day. So plan your ERB registration backward from that date, rather than aiming at it. A test seat has to be booked, taken and scored before the deadline. The Visit Day is an assessment day, not a tour: it includes an interview, an on-site assessment and a class observation. Decisions come on notification day, April 9, 2027. No enrollment contract date is published, so confirm it with the admissions office.',
        },
        checklistRows: [
          {
            action: 'Submit the online inquiry form',
            detail: 'The required first step; it lets you create your family profile in the portal.',
            due: 'Fall 2026',
          },
          {
            action: 'Create your family profile in the portal',
            detail: 'Finalsite Enrollment — where you RSVP, submit materials and track deadlines.',
            due: 'Fall 2026',
          },
          {
            action: 'Submit the application',
            detail: 'The Grades 1–12 deadline. Grade 6 is a natural expansion year.',
            due: 'Jan 15, 2027',
          },
          {
            action: 'Schedule and attend the Visit Day',
            detail: 'Includes an interview, an on-site assessment and a class observation.',
            due: 'Before Feb 26, 2027',
          },
          {
            action: 'Register for and sit the ISEE',
            detail: 'Booked through the Educational Records Bureau; book early enough to be scored.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Submit every remaining file item',
            detail: 'Your portal checklist lists what is still outstanding.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Submit the Clarity financial aid application',
            detail: 'Optional. Opens Sept 15, 2026; one application covers multiple children.',
            due: 'Jan 15, 2027',
          },
          {
            action: 'Watch for your notification day',
            detail: 'Admission and financial aid decisions come that day. No contract date is published; confirm it with admissions.',
            due: 'Apr 9, 2027',
          },
        ],
      },
      {
        key: 'us',
        label: 'Upper School · Grades 9–12',
        title: 'Upper School — Grades 9–12',
        deadlines: [
          { value: 'Jan 15, 2027', label: 'application due' },
          { value: 'Feb 26, 2027', label: 'testing completed and submitted' },
          { value: 'Feb 26, 2027', label: 'all file material due' },
          { value: 'Jan 15, 2027', label: 'financial aid application due' },
          { value: 'Apr 9, 2027', label: 'notification day — Grades 9–11' },
        ],
        steps: [
          {
            title: 'Submit an inquiry, then create your family profile',
            tag: 'Fall 2026',
            tagKind: 'outline',
            detail:
              'The required first step: families "first submit an inquiry and then create a profile for your family." That account then prompts you to RSVP for optional admissions events, submit materials, locate forms and meet deadlines.',
          },
          {
            title: 'Complete the application',
            tag: 'by Jan 15',
            tagKind: 'accent',
            detail:
              'Required, and due **January 15, 2027** — the deadline shared by every grade from 1 through 12. Ninth grade is one of the years the school "naturally expand[s]" in, alongside TK, Kindergarten and sixth grade. Siblings of current students had an earlier deadline. The school\'s calendar listed **K-12 sibling applications due October 15, 2026**. If you are a sibling family applying now, ask the admissions office.',
          },
          {
            title: 'Schedule and attend a Visit Day — interview and a shadow day',
            tag: 'you book it',
            tagKind: 'outline',
            detail:
              'Required, and the family schedules it. This band pairs a formal interview with a shadow experience: "your prospective Upper School student will have **an interview, connect with a Latin Student Ambassador, and experience the day in the life of a Latin student**." Your child spends the day alongside a current student rather than touring the campus with you.',
          },
          {
            title: 'Complete the ISEE',
            tag: 'by Feb 26',
            tagKind: 'accent',
            detail:
              'Required for **Grades 9–11 applicants**, who "take the ISEE", and "all Upper School testing needs to be completed and submitted by **February 26, 2027**." You register through the **Educational Records Bureau**, not the school. Your testing plan in this band hinges on February 26, so **plan your registration backward from it**. A test seat has to be booked, taken and scored before the deadline. **No entrance assessment is published for Grade 12 applicants**. The published requirement covers Grades 9 through 11 only, so a Grade 12 family should ask the admissions office what applies.',
          },
          {
            title: 'Complete your file',
            tag: 'by Feb 26',
            tagKind: 'accent',
            detail:
              'All file material is due **February 26, 2027**, the same day as the testing deadline. Your portal account is where the outstanding items are listed and where they are submitted.',
          },
          {
            title: 'Apply for financial aid, if you need it',
            tag: 'by Jan 15',
            tagKind: 'outline',
            detail:
              'Optional, and on its own clock: the aid application opens through **Clarity** on **September 15, 2026**. It is due **January 15, 2027** to be considered in the priority round. That is six weeks before the file-material deadline. One application covers every child in the family. For Grades 9–11, award decisions come on the notification day, **April 9, 2027**.',
          },
          {
            title: 'Decision',
            tag: 'Apr 9',
            tagKind: 'accent',
            detail:
              '**April 9, 2027** is the school\'s "Grades 1-11 notification day." Financial aid award decisions are communicated the same day. **No enrollment contract date is published**, so ask the admissions office when it is due. Enrolling also requires the **$2,500 non-refundable deposit**. That notification day covers Grades 9–11. **No notification date is published for Grade 12**, so a Grade 12 family should ask the admissions office.',
          },
        ],
        // EMPTY BY DECISION, 2026-08-31 — see the header. The Feb 26
        // back-planning constraint, the shadow-day Visit Day and the
        // unpublished Grade 12 assessment are carried by the steps above and
        // the callout below.
        watchOuts: [],
        checklistCallout: {
          lead: 'February 26, 2027 is the date that binds this band.',
          text: 'Both the ISEE and every remaining file item are due that day. So plan your ERB registration backward from that date, rather than aiming at it. The Visit Day pairs an interview with a Student Ambassador shadow day, so your child spends the day as a Latin student would. The published assessment requirement covers Grades 9 through 11. Nothing is published for Grade 12 applicants, so ask the admissions office what applies. Decisions for Grades 9–11 come on notification day, April 9, 2027. No enrollment contract date is published, so confirm it with the office.',
        },
        checklistRows: [
          {
            action: 'Submit the online inquiry form',
            detail: 'The required first step; it lets you create your family profile in the portal.',
            due: 'Fall 2026',
          },
          {
            action: 'Create your family profile in the portal',
            detail: 'Finalsite Enrollment — where you RSVP, submit materials and track deadlines.',
            due: 'Fall 2026',
          },
          {
            action: 'Submit the application',
            detail: 'The Grades 1–12 deadline. Grade 9 is a natural expansion year.',
            due: 'Jan 15, 2027',
          },
          {
            action: 'Schedule and attend the Visit Day',
            detail: 'An interview plus a shadow day alongside a Latin Student Ambassador.',
            due: 'Before Feb 26, 2027',
          },
          {
            action: 'Register for and sit the ISEE (Grades 9–11)',
            detail: 'Through the Educational Records Bureau. Nothing is published for Grade 12.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Submit every remaining file item',
            detail: 'Your portal checklist lists what is still outstanding.',
            due: 'Feb 26, 2027',
          },
          {
            action: 'Submit the Clarity financial aid application',
            detail: 'Optional. Opens Sept 15, 2026; one application covers multiple children.',
            due: 'Jan 15, 2027',
          },
          {
            action: 'Watch for your notification day',
            detail: 'Grades 9–11. Admission and financial aid decisions come that day. Nothing is published for Grade 12 or for the contract; ask admissions.',
            due: 'Apr 9, 2027',
          },
        ],
      },
    ],

    aid: {
      title: 'Running in parallel: the financial-aid clock',
      text: 'Aid runs through **Clarity**. It opens **September 15, 2026** and is due **January 15, 2027** to be considered in the priority round. Award decisions come on notification day: **February 26, 2027** for TK and Kindergarten, and **April 9, 2027** for Grades 1–11. One application covers every child in the family and "typically takes 30 minutes or less to complete." Separately, a **$2,500 non-refundable deposit** is "required at the time of initial enrollment or reenrollment" and is "deducted from the second tuition payment". No student can be enrolled or reenrolled without it. **No aid application fee is published** for this cycle.',
      button: 'Financial Aid & Tuition',
    },

    comparison: {
      kicker: 'CROSS-BAND',
      title: 'Exactly what changes between bands',
      rows: [
        {
          label: 'Application due',
          cells: {
            tkk: 'Jan 2, 2027',
            ls: 'Jan 15, 2027',
            ms: 'Jan 15, 2027',
            us: 'Jan 15, 2027',
          },
        },
        {
          label: 'Who schedules the Visit Day',
          cells: {
            tkk: 'The admissions office',
            ls: 'The family',
            ms: 'The family',
            us: 'The family',
          },
        },
        {
          label: 'Standardized assessment',
          cells: {
            tkk: 'WPPSI',
            ls: 'WPPSI (Gr 1) · WISC-V (Gr 2–4) · ISEE (Gr 5)',
            ms: 'ISEE',
            us: 'ISEE (Gr 9–11) · nothing published for Gr 12',
          },
        },
        {
          label: 'Interview at the Visit Day',
          cells: {
            tkk: 'Not described',
            ls: 'Not described',
            ms: 'Yes',
            us: 'Yes',
          },
        },
        {
          label: 'What the Visit Day is',
          cells: {
            tkk: 'Hours in a Latin classroom; parents meet current parents and an Upper School student panel',
            ls: 'A classroom visit',
            ms: 'Interview, on-site assessment and a class observation',
            us: 'Interview, a Student Ambassador and a day in the life of a Latin student',
          },
        },
        {
          label: 'Testing and file material due',
          cells: {
            tkk: 'None published',
            ls: 'None published',
            ms: 'Feb 26, 2027',
            us: 'Feb 26, 2027',
          },
        },
        {
          label: 'Decision and contract',
          cells: {
            tkk: 'Feb 26, 2027 · no contract date published',
            ls: 'Apr 9, 2027 · no contract date published',
            ms: 'Apr 9, 2027 · no contract date published',
            us: 'Apr 9, 2027 (Gr 9–11) · nothing published for Gr 12 · no contract date published',
          },
        },
        {
          label: 'Constant in every band',
          cells: {
            all: 'The Finalsite Enrollment portal, from the first inquiry through every submission · financial aid through Clarity, open Sept 15, 2026 and due Jan 15, 2027 · a $2,500 non-refundable enrollment deposit, deducted from the second tuition payment',
          },
        },
      ],
    },

    contacts: {
      kicker: 'CONTACTS',
      title: 'The admissions office',
      address:
        '9502 Providence Road, Charlotte, NC 28277 · admissions 704-846-7207 · admissions@charlottelatin.org · financial aid financialaid@charlottelatin.org. Each applicant is assigned an admission counselor to guide the family through the process; no individual phone numbers or email addresses are published for the team below.',
      people: [
        { name: "Mary Yorke Oates '83", detail: 'Director of Enrollment Management' },
        {
          name: 'Lisa Seaton',
          detail: 'Associate Director of Admissions · Admissions Counselor',
        },
        { name: 'Sintayehu Taye', detail: 'Admissions Counselor' },
        { name: 'Kelley Ripp', detail: 'Admissions Counselor · Class of 1998' },
        { name: 'Janis Mishoe', detail: 'Applications Coordinator · Class of 1996' },
        { name: 'Patterson Miller', detail: 'Admissions Office Manager · Class of 2007' },
        { name: 'Nadege Head', detail: 'Admissions and Financial Aid Facilitator' },
        { name: 'Tanya Powell', detail: 'Admissions Support Staff' },
        { name: 'Ruffin Tanner', detail: 'Tour Guide · Admissions Support Staff' },
      ],
    },

    checklist: {
      portalNote: 'Portal: Finalsite Enrollment · charlottelatin.fsenrollment.com',
      aidPanel: {
        kicker: 'In parallel — the financial aid clock',
        items: [
          'Apply through Clarity at app.clarityapp.com. If you are applying for multiple children you need only one application, and it typically takes 30 minutes or less to complete.',
          'The application opens on September 15, 2026.',
          'Submit by January 15, 2027 to be considered for priority-round decisions. Award decisions come on notification day: February 26, 2027 for TK and Kindergarten, and April 9, 2027 for Grades 1–11.',
          'A $2,500 non-refundable deposit is required when a student first enrolls or reenrolls. It is deducted from the second tuition payment. No student can be enrolled or reenrolled without it.',
          'No financial aid application fee is published for this cycle.',
        ],
      },
      contactPanel: {
        kicker: 'Questions — admissions office',
        lines: [
          'Admissions — 704-846-7207 · admissions@charlottelatin.org',
          'Financial aid — financialaid@charlottelatin.org',
          '9502 Providence Road, Charlotte, NC 28277',
        ],
      },
      disclaimer:
        'Dates are for the 2027–28 entry cycle, as published on charlottelatin.org (retrieved Aug 2026; dates rechecked Nov 2026). They come from the application process, tuition and financial assistance, and admissions pages. Some items, such as the enrollment contract date, are shown only inside the application portal or are not published at all. Cycle dates change from year to year, and these pages have shown a different set in a past season. So check the live pages before acting. Compiled by Charlotte School Compare; not affiliated with Charlotte Latin School.',
    },

    sources: [
      {
        label:
          'charlottelatin.org — application process: the four grade-band tabs, every application deadline, each band\'s Visit Day description and who schedules it, the assessment by grade, the Feb 26, 2027 testing and file-material dates, the notification days and the K-12 sibling deadline',
        url: 'https://www.charlottelatin.org/admissions/application-process',
      },
      {
        label:
          'charlottelatin.org — tuition and financial assistance: Clarity, the Sept 15 opening and Jan 15, 2027 priority deadline, and the $2,500 non-refundable enrollment deposit and its terms',
        url: 'https://www.charlottelatin.org/admissions/tuition-financial-assistance',
      },
      {
        label:
          'charlottelatin.org — admissions: the grades the school naturally expands in, campus tours from September, and the TK/K Fly By Open House on Oct 10, 2026',
        url: 'https://www.charlottelatin.org/admissions',
      },
      {
        label:
          'charlottelatin.org — meet our team: the nine named admissions staff, their titles, and the assigned admission counselor',
        url: 'https://www.charlottelatin.org/admissions/meet-our-team',
      },
      {
        label: 'charlottelatin.org — inquire: the required first step in the process',
        url: 'https://www.charlottelatin.org/admissions/inquire',
      },
      {
        label:
          'charlottelatin.org — lower school: checked for a Transitional Kindergarten or Kindergarten age cutoff, which is not published',
        url: 'https://www.charlottelatin.org/academics/lower-school',
      },
      {
        label: 'Finalsite Enrollment — the inquiry, application and materials portal',
        url: 'https://charlottelatin.fsenrollment.com',
      },
      {
        label: 'Clarity — the financial-aid platform',
        url: 'https://app.clarityapp.com/sign-up',
      },
    ],
  },
}
