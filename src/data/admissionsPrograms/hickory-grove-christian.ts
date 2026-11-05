// Hickory Grove Christian School — Admissions.
//
// Transcribed from the committed research file
// source-material/admissions/hickory-grove-christian/Hickory Grove Christian -
// Admissions - Grade-by-Grade Application Plans.md, which carries the
// provenance header, the sixteen official source URLs and the record-level
// detail behind every figure below. A ministry of Hickory Grove Baptist Church,
// on two campuses.
//
// CYCLE: 2027–28, AND THE SCHOOL'S OWN PAGES DISAGREE WITH EACH OTHER ABOUT IT.
// The Admissions Process page publishes "November 2, 2026" (priority) and
// "November 16, 2026" (public) — the open 2027–28 cycle, rendered live. The
// Apply page is headed "APPLY HERE FOR THE 2026-2027 SCHOOL YEAR", which is the
// PRIOR cycle's label sitting on a live page. The Process page carries the
// dated, specific content and is the better source; the Apply page's label is
// recorded here and NOT on the card, because arguing a school's own header at a
// parent is maintainer-facing (see the Country Day precedent, PR #252).
//
// TWO OTHER DATE SOURCES ARE STALE ECHOES, NOT A CONFLICT TO RECONCILE. The
// FACTS portal narrative carries the prior cycle (Dec 15, 2025 / Jan 5, 2026),
// and a prior Admissions Process capture read Nov 17, 2025 / Dec 1, 2025.
// `/admissions/registration-info` — which a prior pass cited for Dec 16, 2024 /
// Jan 6, 2025 — now RETURNS HTTP 404. Never restore a date from any of the
// three, from a cache, or from an archived copy. That is the cycle rule.
//
// THE APPLICATION FEE IS STATED AS A FACT — THE OLD INCONSISTENCY IS GONE
// (refreshed 2026-10-04, plan hickorygroverefresh). On 2026-09-01 the fee
// window on the Admissions Process page still read "$250.00 (November, 17 2025
// - May 31, 2026)" / "$500 (June 1, 2026 and later)" — a prior-cycle window
// sitting below the November 2026 dates — so the card shipped both figures and
// told parents to confirm. On or before 2026-10-04 the school rolled the window
// forward: "$250.00 (November, 2 2026 - May 31, 2027)" and "$500 (June 1, 2027
// and later)", non-refundable and not applied toward tuition. The hedge was
// removed everywhere. Do not restore it from the 2026-09-01 research file.
// ON 2026-11-04 THE FEE ROSE, same windows: the rebuilt Admissions Home page
// reads "STANDARD ENROLLMENT $300 … November 2, 2026 – May 31, 2027" and "LATE
// ENROLLMENT $550 … June 1, 2027 or later" (Live-Site Refresh 2026-11-04.md).
//
// THE SITE WAS REBUILT ON 2026-11-04. Every old /admissions/… and /academics/…
// URL now redirects to a hub page, and the /fs/resource-manager/ checklist links
// return 404. The checklists moved to files.smartsites.parentsquare.com with the
// same "Revised 11/17/25" text. Every citation below points at the new URLs.
// The application fee is still NOT a stat tile: adding one is a UX change that
// needs the user's approval, and it was out of scope for the refresh.
//
// BOTH ADMISSION-CHECKLIST PDFs ARE RETRIEVABLE, AND A PRIOR PASS RECORDED THEM
// AS BLOCKED. (Superseded 2026-11-04: the resource-manager links below now 404;
// the same PDFs are on files.smartsites.parentsquare.com, cited in `sources`.) `/fs/resource-manager/view/<guid>` 302-redirects to
// resources.finalsite.net — the same pattern already used for Country Day,
// Charlotte Christian and Charlotte Latin. Both return HTTP 200 and extract
// with `pdftotext -layout`; both footers read "Revised 11/17/25". They are the
// source for the $500 deposit, the per-grade recommendation forms, the
// after-all-forms testing sequence, the high-school-only shadow day and the
// automatic-denial rule. A later pass that finds the prior "NOT RETRIEVED" note
// should ignore it and re-fetch.
//
// THE WEBSITE'S THREE STEPS ARE NOT THE PROCESS. The Admissions Process page
// shows INQUIRE → VISIT → APPLY, which only gets a family TO the application.
// The checklists publish four more steps beginning where those end —
// APPLICATION → TESTING (and SHADOW, high school only) → INTERVIEW →
// ACCEPTANCE. Both are official, so the card's spine is the combined sequence.
// Do not "simplify" it back to the website's three.
//
// FIVE BANDS, AND THE FIFTH IS NOT A GRADE BAND. International (F-1) ships as a
// real band rather than a watch-out on a grade band (user's call, 2026-09-01),
// which deliberately REVERSES how Country Day and the planned Cannon card treat
// international applicants. There, international is an overlay on a grade band
// because the process is the same one with extra documents. Here it is a
// separate process: its own director, a video interview INSTEAD OF a campus
// visit, English-proficiency thresholds, transcripts translated through a named
// evaluator, an I-20 the school issues itself, homestay, health insurance and
// full payment by August 1. It shares almost no steps with the domestic
// path, so an overlay would have misdescribed it.
//
// THE MIDDLE / HIGH SPLIT IS REAL BUT NARROW. Grades 6–12 share ONE checklist,
// so the forms are identical and both bands list the same four recommendations.
// Exactly two things differ: the shadow day is HIGH SCHOOL ONLY ("High school
// required only- shadow an HG student"), and the entrance test for grade
// placement is published for 9–12 only. The school's 2026–27 High School Profile
// adds the bar that test sets: applicants "must score at or above their grade
// level and be in good standing with their current school to be admitted". Both bands still ship because a parent
// needs to know which applies to them. ⚠️ DO NOT extend the shadow day to
// grades 6–12 — the checklist is explicit that it is not.
//
// THERE IS NO PUBLISHED PROFESSING-CHRISTIAN REQUIREMENT, AND THIS IS THE
// SHARPEST CONTRAST WITH COVENANT DAY. What IS published is a "Personal
// Recommendation form (from family's pastor)" required at every grade TK–12,
// and a Family Interview that is "an opportunity to share the Mission, Vision,
// and Statement of Faith, and to assess whether HGCS is the right fit for your
// family". Covenant Day states a professing-Christian requirement outright;
// Hickory Grove does not, and its card must not imply one by borrowing that
// language. Report the required form and the fit interview, nothing more. The
// statement of faith's own text is not transcribed into the app.
//
// NO DECISION DATE AND NO CONTRACT DATE, IN ANY BAND. Admission is rolling and
// capacity-dependent — the site says availability is limited and asks families
// to call about a specific grade — and no fixed notification date is published
// anywhere. The same shape as Charlotte Latin. A decision or contract tile is
// NOT invented, and `unpublished: true` is NOT used: that flag marks a known
// constant standing in for a missing date (Providence Day's 4:00 p.m.), and
// there is no constant here to stand in. The deadline strips are therefore
// three tiles in the grade bands and three in the international band, which
// `.adm-deadlines` handles natively — it is `repeat(auto-fit, minmax(150px,
// 1fr))`, so an uneven tile count across bands is a first-class layout.
//
// THE STAT STRIP CARRIES NO BAND-COUNT TILE, BY DECISION (user, 2026-08-31,
// PR #259). A leading "5 / entry bands" tile counts the card's own structure
// rather than telling a parent anything about the school, and it was removed
// from every card in this area then. It came back on three cards afterwards
// (Charlotte Latin #262, Covenant Day #264, and this one) by mirroring a card
// that had already regressed — so if a future card is built from a neighbour,
// check this rule against Providence Day or Country Day, which never lost it.
//
// RULES ARE ONE SHORT SENTENCE EACH (user, 2026-09-02). The reviewed cards sit
// at 45-48 words across both rules combined; this card first shipped at 144 and
// was cut back. The rules frame the process — the detail belongs in the steps
// below, which is where a parent reads it.
//
// THE AID STRIP DOES NOT NAME THE ABSENT AID-APPLICANT DEPOSIT DISCOUNT (user,
// 2026-09-02). It is a NOT-PUBLISHED disclosure rather than a fact a parent can
// act on, and the register in this header and the research file keeps the
// record. Do not read its absence as a research gap and backfill it.
//
// THE NCSEAA DATE IS "February 1", WITH NO YEAR (2026-10-04). The live
// Scholarships page now says only "Applications open February 1st." — no year,
// no closing date, no renewal date. The card says "February 1" and never adds a
// year. The Feb 2 – Mar 2, 2026 window and April 15, 2026 renewal in the
// 2026-09-01 research file belong to a closed cycle; never restore them. The
// 5% early-pay discount is likewise "by May 31", with no year.
//
// THE ACCEPTANCE-BEFORE-AID PRECONDITION WAS DROPPED BY THE SCHOOL (2026-10-04).
// The 2026-09-01 file recorded "new families must be accepted for enrollment
// before applying for aid". The live page no longer says so; it says "Apply
// immediately … email finance@hgchristian.org". Do not restore the
// precondition from the older file. A DIFFERENT precondition appeared on
// 2026-11-04: "Financial Aid Applications can only be submitted upon completion
// of your HGCS Application" (Scholarships & Financial Aid Home). That is the
// completed application, not acceptance, and it ships.
//
// MALLARD CREEK'S "applications submitted before February 18 will be considered
// first" IS NOT CARRIED (user, 2026-10-04). The page gives no year and its
// "This fall … exploring" framing reads as the prior cycle's text, so a bare
// "February 18" would read as a 2027 date the school has not published. Only
// the "expected limited availability" ships; the date stays in the research
// file. The campus is "exploring" the classical TK/K, so the card says it
// "plans to open" one, not that it "is launching".
//
// THE INTERNATIONAL FEE TIMING IS NOW SETTLED BY THE SCHOOL (2026-11-04). On
// 2026-10-04 the enrollment-process page gave two timings, and the card shipped
// both (user's call). The rebuilt page puts "Pay the non-refundable application
// fee" in Step 1 and says it "is due at the time of application", so the card
// now states that one timing. The amount remains not published.
//
// NOTE FOR EDITORS: `rules[].text` is rendered RAW — `<strong>{title}</strong>
// {text}` in AdmissionsProgram.tsx — so it is the one prose field on this card
// with NO markdown support. A `**bold**` span here ships as literal asterisks.
// `Emphasized` covers steps[].detail, watchOuts[].text and aid.text, but not
// this, and not deadlines[].value/label.
//
// WATCH-OUTS ARE `[]` IN ALL FIVE BANDS, BY DECISION (2026-09-01), following
// the endpoint the three most recently reviewed cards reached — Charlotte
// Christian, Charlotte Latin and Covenant Day all ship empty arrays after the
// user asked for them gone. They are EMPTY BY DECISION, not by a gap in the
// research. Do NOT read them as unresearched and backfill them. Every fact they
// would have carried is already in `steps[].detail` and each band's
// `checklistCallout`: the priority-window split, the after-all-forms testing
// sequence, the automatic-denial rule, the high-school-only shadow day, the
// fee and the rolling decision. The research file keeps the full
// record regardless of what this card presents.
//
// NO URL-LESS TRAILING NOTE IN `sources` (2026-09-01), following PR #258 —
// prose paragraphs in a row of citation links read as broken links. The
// NOT-PUBLISHED register (tuition by grade, the international application fee
// and tuition, any separate international deadline, whether aid reaches
// international students, host-family vetting, the waitlist procedure, legacy /
// faculty-children / re-application / mid-year transfer policies, a fixed
// notification date, any reduced deposit for aid applicants, the specific
// assessment instruments, whether Mallard Creek's classical TK/K runs different
// steps) lives in this header and in the research file. The international fee
// amount and Mallard Creek's limited availability are also named where a parent
// acts on them, in the international application step and the TK/K5 apply step.
//
// NEVER NARRATE THE CHECKLIST DOCUMENTS — standing editorial rule (user, PR
// #261). This card's best material comes from two PDFs, which makes the
// temptation strongest here of any school in the topic. We speak as the party
// holding the information: "send the Academic Referral form from your child's
// current teacher", never "the Elementary checklist lists an Academic Referral
// form". A sentence that tells a parent about a document instead of telling
// them the fact is the defect.
//
// TUITION IS NOT PUBLISHED ANYWHERE ON THE PUBLIC SITE, and a prior pass got
// this wrong. It read the two PDFs linked from the Tuition & Fees page as
// tuition schedules whose table failed to render. Both were retrieved: they are
// EDUCATIONAL SUPPORT SERVICES fee schedules — learning-support pricing from
// $300 to $4,455 a year — not tuition. Those figures are not admissions facts
// and are deliberately absent from this card. Tuition belongs to the Financial
// Aid & Tuition area either way.
//
// CONTACTS: the rebuilt Admissions Home page (2026-11-04) names a four-person
// Admissions & Enrollment Team, but publishes contact details only for Sheila
// M. Chaney, who runs both admissions and the international program. The grid
// lists her and the office rows; the other three are named in the address
// line, without contact details the school does not give. Both the academic address (7200 E. WT Harris Blvd.) and the
// mailing address (6050 Hickory Grove Road) are published and are reproduced
// rather than silently reconciled. ⚠️ 704-531-3589 appears on an old admissions
// page and is NOT shipped; the current published admissions number is
// 704-531-4008. Its hours are the contact page's MAIN OFFICE figure, "7:30
// AM–3:30 PM" (re-checked 2026-10-04; it read 3:00 p.m. on 2026-09-01), so
// `contacts.address` calls that line the main office. The Mallard Creek EEC
// email (mallardcreekeec@hgchristian.org) was added the same day.

import type { AdmissionsProgram } from '../admissionsPrograms.ts'

export const hickoryGroveChristian: AdmissionsProgram = {
  guide: {
    headline:
      "Pick your child's entry point and the guide personalizes: the full application sequence in order, the 2027–28 application windows, and the forms and testing for that band — plus a printable checklist to take with you. One spine for every domestic applicant, but the priority window opens two weeks early for church members, Early Education Center families and current-student siblings, and the F-1 international process is a separate one end to end.",
    cycle: '2027–28 entry cycle',

    stats: [
      // The 'grade bands' count tile was removed by request (2026-08-31) — not a data gap.
      {
        value: 'Nov 2, 2026',
        label: 'priority window opens — church members, EEC students, siblings',
      },
      { value: 'Nov 16, 2026', label: 'applications open to the public' },
      { value: '$500', label: 'enrollment deposit on acceptance — applied toward tuition' },
    ],

    rules: [
      {
        title: 'One portal, two campuses.',
        text: 'Everything runs through FACTS: inquire, apply, and track which supplemental forms have arrived. Harris and Mallard Creek use separate portals, so apply through the one for your campus.',
      },
      {
        title: 'Two windows, then rolling admission.',
        text: 'Church members, Early Education Center students and current-student siblings apply from Nov 2, 2026; everyone else from Nov 16. That is an earlier place in the queue, not a discount — after those dates, admission is rolling.',
      },
    ],

    spineNote:
      'One shared spine in every domestic band — submit the inquiry form → register for the Open House → apply in FACTS and pay the application fee → send the forms your band requires → sit the entrance testing, which is scheduled only once every form has arrived → attend the family interview → receive the decision in writing → pay the $500 enrollment deposit. What changes between bands is which forms you send, whether there is a shadow day, and whether a placement test applies. The international F-1 process replaces most of this and is set out in its own band.',

    bands: [
      {
        key: 'tkk5',
        label: 'TK / K5',
        sublabel: 'Readiness screening · age cutoffs',
        title: 'Transitional Kindergarten & Kindergarten',
        deadlines: [
          { value: 'Nov 2, 2026', label: 'priority window opens — members, EEC, siblings' },
          { value: 'Nov 16, 2026', label: 'applications open to the public' },
          { value: '$500', label: 'enrollment deposit on acceptance' },
        ],
        steps: [
          {
            title: 'Send the inquiry form, then arrange a visit',
            tag: 'Fall 2026',
            tagKind: 'outline',
            detail:
              'The first two steps are linked from the admissions page — an inquiry form, then the visit, which now means registering for the **Admissions Open House on Tuesday, November 10, 2026** (sessions at 12, 4 and 6 p.m., with separate elementary, middle and high school tours). This is also the point to decide which campus you are applying to: **Harris** runs Transitional Kindergarten and Kindergarten alongside the rest of TK–12, while **Mallard Creek** plans to open a **classical Christian TK and Kindergarten** that would grow one grade a year, with students moving to Harris at middle school.',
          },
          {
            title: 'Check which grade your child is eligible for',
            tag: 'before applying',
            tagKind: 'outline',
            detail:
              'The two youngest grades are split by birthday. A child turning five **by October 16** of the school year applied for is eligible for **Kindergarten (K5)**; a child turning five **on or before April 16** is eligible for **Transitional Kindergarten (TK)**, which the school describes as a bridge between preschool and kindergarten, giving a child time to develop the fundamental skills kindergarten expects. The birthday is not the whole decision — see the readiness screening below. TK is the earliest K–12 entry point; younger children are enrolled through the **Early Education Center** office rather than this process.',
          },
          {
            title: 'Apply in FACTS and pay the application fee',
            tag: 'from Nov 2 or Nov 16',
            tagKind: 'accent',
            detail:
              'Apply through the FACTS portal for your campus — **Harris and Mallard Creek use different portals**. The school expects **limited availability at Mallard Creek**, so confirm its dates and steps with the admissions office if you are applying there. Send your child\'s **birth certificate** and **Immunization Registry Record** with the application. On the fee: the school publishes a **non-refundable $300 application fee** for applications from **November 2, 2026 through May 31, 2027**, rising to a **$550 late enrollment application fee from June 1, 2027**. The application fee is **not applied toward tuition**.',
          },
          {
            title: 'Send the three forms this band requires',
            tag: 'after applying',
            tagKind: 'accent',
            detail:
              'Three forms complete a TK or K5 file: an **Information form**; a **Readiness Checklist**, completed by your child\'s preschool or daycare teacher; and a **Personal Recommendation form from your family\'s pastor**, which is required at every grade from TK through 12. Send all three promptly — nothing is scheduled until the admissions office has every one of them.',
          },
          {
            title: 'Sit the readiness screening',
            tag: 'after all forms arrive',
            tagKind: 'accent',
            detail:
              'Your child takes a **developmentally appropriate skills assessment** during the admissions process, and qualifying for the program depends on passing it — this is what settles TK-versus-K5 placement alongside the birthday cutoffs. Testing is arranged through the **Student Services office**, and it is scheduled **only after the admissions office has received all of the required forms**, so a single outstanding form holds up the whole timeline. The school does not publish which instrument it uses.',
          },
          {
            title: 'Attend the family interview',
            tag: 'after testing',
            tagKind: 'outline',
            detail:
              'The family interview is scheduled once the earlier steps are complete and have gone well. The school describes it as an opportunity to share its **mission, vision and statement of faith**, and to assess whether Hickory Grove is the right fit for your family. **There is no published requirement that a parent be a professing Christian** — what is required is the pastor\'s recommendation form and this conversation.',
          },
          {
            title: 'Decision, then the $500 deposit',
            tag: 'rolling',
            tagKind: 'outline',
            detail:
              'The final decision is **communicated in writing**, and it weighs satisfactory grades, the letters of recommendation, the interview, behavior reports, entrance testing and any IEP, 504 or psychoeducational evaluation on file. **No fixed notification date is published** — admission is rolling and depends on space in the grade. On acceptance a **nonrefundable $500 deposit** is due, and it applies toward tuition.',
          },
        ],
        watchOuts: [],
        checklistCallout: {
          lead: 'Testing is not scheduled until every form is in.',
          text: 'The readiness screening that settles TK-versus-K5 placement is arranged through Student Services only after the admissions office has received the Information form, the Readiness Checklist from your child\'s preschool or daycare teacher, and the pastor\'s Personal Recommendation form. Applications open November 2 for church members, Early Education Center students and current-student siblings, and November 16 for everyone else; after that admission is rolling and capacity-dependent, with no fixed notification date. Note that any suspensions, expulsions or failed courses on record are an automatic denial of admission.',
        },
        checklistRows: [
          {
            action: 'Submit the inquiry form and register for the Open House',
            detail: 'Both are forms linked from the admissions page; the Open House is Tuesday, November 10, 2026. Decide Harris or Mallard Creek here.',
            due: 'Fall 2026',
          },
          {
            action: 'Confirm whether your child is eligible for TK or K5',
            detail: 'Five by Oct 16 for K5; five on or before Apr 16 for TK. The screening also weighs readiness.',
            due: 'Before applying',
          },
          {
            action: 'Apply in the FACTS portal for your campus and pay the application fee',
            detail: 'Harris and Mallard Creek use different portals. Non-refundable and not applied toward tuition: $300 through May 31, 2027, then $550.',
            due: 'Nov 2 or Nov 16, 2026',
          },
          {
            action: 'Send the birth certificate and Immunization Registry Record',
            detail: 'Both go with the application itself.',
            due: 'With the application',
          },
          {
            action: 'Complete the Information form',
            detail: 'One of the three forms required for a TK or K5 file.',
            due: 'After applying',
          },
          {
            action: 'Ask your preschool or daycare teacher for the Readiness Checklist',
            detail: 'Completed by the teacher, not by you.',
            due: 'After applying',
          },
          {
            action: "Ask your family's pastor for the Personal Recommendation form",
            detail: 'Required at every grade from TK through 12.',
            due: 'After applying',
          },
          {
            action: 'Sit the developmentally appropriate readiness screening',
            detail: 'Arranged by Student Services only after every form has arrived. Qualifying depends on passing it.',
            due: 'After all forms arrive',
          },
          {
            action: 'Attend the family interview',
            detail: 'Covers the mission, vision and statement of faith, and whether the school fits your family.',
            due: 'After testing',
          },
          {
            action: 'Watch for the written decision, then pay the $500 deposit',
            detail: 'Nonrefundable, applied toward tuition. No fixed notification date — admission is rolling.',
            due: 'Rolling',
          },
        ],
      },
      {
        key: 'es',
        label: 'Elementary · Grades 1–5',
        sublabel: 'Academic Referral · report cards',
        title: 'Elementary — Grades 1–5',
        deadlines: [
          { value: 'Nov 2, 2026', label: 'priority window opens — members, EEC, siblings' },
          { value: 'Nov 16, 2026', label: 'applications open to the public' },
          { value: '$500', label: 'enrollment deposit on acceptance' },
        ],
        steps: [
          {
            title: 'Send the inquiry form, then arrange a visit',
            tag: 'Fall 2026',
            tagKind: 'outline',
            detail:
              'The first two steps are linked from the admissions page — an inquiry form, then the visit, which now means registering for the **Admissions Open House on Tuesday, November 10, 2026** (sessions at 12, 4 and 6 p.m., with separate elementary, middle and high school tours). Grades 1 through 5 are taught at the **Harris campus**, 7200 E. WT Harris Blvd.',
          },
          {
            title: 'Apply in FACTS and pay the application fee',
            tag: 'from Nov 2 or Nov 16',
            tagKind: 'accent',
            detail:
              'Apply through the **FACTS portal**, and send your child\'s **birth certificate** and **Immunization Registry Record** with the application. On the fee: the school publishes a **non-refundable $300 application fee** for applications from **November 2, 2026 through May 31, 2027**, rising to a **$550 late enrollment application fee from June 1, 2027**. The application fee is **not applied toward tuition**.',
          },
          {
            title: 'Send the forms and records this band requires',
            tag: 'after applying',
            tagKind: 'accent',
            detail:
              'An elementary file needs more than the youngest band: an **Academic Referral form from your child\'s current teacher**; **report cards covering at least two years**; a **Personal Recommendation form from your family\'s pastor**, required at every grade TK–12; and, **for fourth and fifth graders only, a Student Questionnaire**. If your child has had **educational or diagnostic testing**, or has a current **IEP or 504 plan**, send those results too. Nothing is scheduled until all of it has arrived.',
          },
          {
            title: 'Sit the entrance testing',
            tag: 'after all forms arrive',
            tagKind: 'accent',
            detail:
              'Testing is arranged through the **Student Services office**, and it is scheduled **only after the admissions office has received all of the required forms** — a single outstanding report card or recommendation holds up the whole timeline. The school does not publish which instrument it uses. **There is no shadow day at this band**; shadowing is required for high school applicants only.',
          },
          {
            title: 'Attend the family interview',
            tag: 'after testing',
            tagKind: 'outline',
            detail:
              'The family interview is scheduled once the earlier steps are complete and have gone well. The school describes it as an opportunity to share its **mission, vision and statement of faith**, and to assess whether Hickory Grove is the right fit for your family. **There is no published requirement that a parent be a professing Christian** — what is required is the pastor\'s recommendation form and this conversation.',
          },
          {
            title: 'Decision, then the $500 deposit',
            tag: 'rolling',
            tagKind: 'outline',
            detail:
              'The final decision is **communicated in writing**, and it weighs satisfactory grades, the letters of recommendation, the interview, behavior reports, entrance testing and any IEP, 504 or psychoeducational evaluation on file. **No fixed notification date is published** — admission is rolling and depends on space in the grade. On acceptance a **nonrefundable $500 deposit** is due, and it applies toward tuition.',
          },
        ],
        watchOuts: [],
        checklistCallout: {
          lead: 'Two years of report cards, and a referral from the teacher your child has now.',
          text: 'An elementary file needs the Academic Referral form from your child\'s current teacher, report cards covering at least two years, the pastor\'s Personal Recommendation form, and — for fourth and fifth graders only — a Student Questionnaire. Testing is arranged through Student Services only after all of it has arrived, so start with the forms other people have to complete. Applications open November 2 for church members, Early Education Center students and current-student siblings, and November 16 for everyone else; after that admission is rolling, with no fixed notification date. Note that any suspensions, expulsions or failed courses on record are an automatic denial of admission.',
        },
        checklistRows: [
          {
            action: 'Submit the inquiry form and register for the Open House',
            detail: 'Both are forms linked from the admissions page; the Open House is Tuesday, November 10, 2026.',
            due: 'Fall 2026',
          },
          {
            action: 'Apply in the FACTS portal and pay the application fee',
            detail: 'Non-refundable and not applied toward tuition: $300 through May 31, 2027, then $550.',
            due: 'Nov 2 or Nov 16, 2026',
          },
          {
            action: 'Send the birth certificate and Immunization Registry Record',
            detail: 'Both go with the application itself.',
            due: 'With the application',
          },
          {
            action: "Ask your child's current teacher for the Academic Referral form",
            detail: 'Completed by the teacher your child has now.',
            due: 'After applying',
          },
          {
            action: 'Send report cards covering at least two years',
            detail: 'Two full years is the published minimum.',
            due: 'After applying',
          },
          {
            action: 'Fourth and fifth graders only — complete the Student Questionnaire',
            detail: 'Not required below fourth grade.',
            due: 'After applying',
          },
          {
            action: "Ask your family's pastor for the Personal Recommendation form",
            detail: 'Required at every grade from TK through 12.',
            due: 'After applying',
          },
          {
            action: 'Send any educational or diagnostic testing, and a current IEP or 504',
            detail: 'Only if applicable — they are reviewed as part of the final decision.',
            due: 'After applying',
          },
          {
            action: 'Sit the entrance testing',
            detail: 'Arranged by Student Services only after every form has arrived. No shadow day at this band.',
            due: 'After all forms arrive',
          },
          {
            action: 'Attend the family interview',
            detail: 'Covers the mission, vision and statement of faith, and whether the school fits your family.',
            due: 'After testing',
          },
          {
            action: 'Watch for the written decision, then pay the $500 deposit',
            detail: 'Nonrefundable, applied toward tuition. No fixed notification date — admission is rolling.',
            due: 'Rolling',
          },
        ],
      },
      {
        key: 'ms',
        label: 'Middle · Grades 6–8',
        sublabel: 'Three teacher recommendations',
        title: 'Middle School — Grades 6–8',
        deadlines: [
          { value: 'Nov 2, 2026', label: 'priority window opens — members, EEC, siblings' },
          { value: 'Nov 16, 2026', label: 'applications open to the public' },
          { value: '$500', label: 'enrollment deposit on acceptance' },
        ],
        steps: [
          {
            title: 'Send the inquiry form, then arrange a visit',
            tag: 'Fall 2026',
            tagKind: 'outline',
            detail:
              'The first two steps are linked from the admissions page — an inquiry form, then the visit, which now means registering for the **Admissions Open House on Tuesday, November 10, 2026** (sessions at 12, 4 and 6 p.m., with separate elementary, middle and high school tours). Middle school is taught at the **Harris campus**, 7200 E. WT Harris Blvd.',
          },
          {
            title: 'Apply in FACTS and pay the application fee',
            tag: 'from Nov 2 or Nov 16',
            tagKind: 'accent',
            detail:
              'Apply through the **FACTS portal**, and send your child\'s **birth certificate** and **Immunization Registry record** with the application. On the fee: the school publishes a **non-refundable $300 application fee** for applications from **November 2, 2026 through May 31, 2027**, rising to a **$550 late enrollment application fee from June 1, 2027**. The application fee is **not applied toward tuition**.',
          },
          {
            title: 'Send four recommendations and the full record',
            tag: 'after applying',
            tagKind: 'accent',
            detail:
              'This is the band where the paperwork jumps. **Four recommendation forms** are required — a **Math Teacher Recommendation**, an **English Teacher Recommendation**, a **Principal or Guidance Counselor Recommendation**, and the **Personal Recommendation form from your family\'s pastor** that every grade needs. Alongside them: **report cards from the most recent two years**, the **transcript**, **standardized testing results**, a **Student Questionnaire** completed by your child, and any **educational or diagnostic testing results or a current IEP, 504 or accommodations plan**. Three of the four recommendations depend on other people\'s time, so request them first.',
          },
          {
            title: 'Sit the entrance testing',
            tag: 'after all forms arrive',
            tagKind: 'accent',
            detail:
              'Testing is arranged through the **Student Services office**, and it is scheduled **only after the admissions office has received all of the required forms**. With four recommendations in the file, that condition is the one most likely to hold up a middle school application. **A shadow day is not required at this band** — that requirement applies to high school applicants only, even though grades 6 through 12 otherwise share the same form list.',
          },
          {
            title: 'Attend the family interview',
            tag: 'after testing',
            tagKind: 'outline',
            detail:
              'The family interview is scheduled once the earlier steps are complete and have gone well. The school describes it as an opportunity to share its **mission, vision and statement of faith**, and to assess whether Hickory Grove is the right fit for your family. **There is no published requirement that a parent be a professing Christian** — what is required is the pastor\'s recommendation form and this conversation.',
          },
          {
            title: 'Decision, then the $500 deposit',
            tag: 'rolling',
            tagKind: 'outline',
            detail:
              'The final decision is **communicated in writing**, and it weighs satisfactory grades, the letters of recommendation, the interview, behavior reports, entrance testing and any IEP, 504 or psychoeducational evaluation on file. **No fixed notification date is published** — admission is rolling and depends on space in the grade. On acceptance a **nonrefundable $500 deposit** is due, and it applies toward tuition.',
          },
        ],
        watchOuts: [],
        checklistCallout: {
          lead: 'Four recommendations — and no shadow day, unlike high school.',
          text: 'Grades 6 through 12 share one form list: math teacher, English teacher, principal or guidance counselor, and your family\'s pastor, plus the transcript, two years of report cards, standardized scores and a Student Questionnaire. What middle school does not have is the shadow day, which is required of high school applicants only. Testing is arranged through Student Services only after every one of those forms has arrived, so request the three school recommendations first. Applications open November 2 for church members, Early Education Center students and current-student siblings, and November 16 for everyone else; after that admission is rolling and capacity-dependent, with no fixed notification date. Note that any suspensions, expulsions or failed courses on record are an automatic denial of admission.',
        },
        checklistRows: [
          {
            action: 'Submit the inquiry form and register for the Open House',
            detail: 'Both are forms linked from the admissions page; the Open House is Tuesday, November 10, 2026.',
            due: 'Fall 2026',
          },
          {
            action: 'Apply in the FACTS portal and pay the application fee',
            detail: 'Non-refundable and not applied toward tuition: $300 through May 31, 2027, then $550.',
            due: 'Nov 2 or Nov 16, 2026',
          },
          {
            action: 'Send the birth certificate and Immunization Registry record',
            detail: 'Both go with the application itself.',
            due: 'With the application',
          },
          {
            action: 'Request the Math Teacher Recommendation form',
            detail: 'One of three school recommendations — request early.',
            due: 'After applying',
          },
          {
            action: 'Request the English Teacher Recommendation form',
            detail: 'One of three school recommendations — request early.',
            due: 'After applying',
          },
          {
            action: 'Request the Principal or Guidance Counselor Recommendation form',
            detail: 'One of three school recommendations — request early.',
            due: 'After applying',
          },
          {
            action: "Ask your family's pastor for the Personal Recommendation form",
            detail: 'Required at every grade from TK through 12.',
            due: 'After applying',
          },
          {
            action: 'Send the transcript and the most recent two years of report cards',
            detail: 'Both are required from grade 6 upward.',
            due: 'After applying',
          },
          {
            action: 'Send standardized testing results',
            detail: 'Required from grade 6 upward.',
            due: 'After applying',
          },
          {
            action: 'Have your child complete the Student Questionnaire',
            detail: 'Required at every grade from 6 through 12.',
            due: 'After applying',
          },
          {
            action: 'Send any diagnostic testing, IEP, 504 or accommodations plan',
            detail: 'Only if applicable — reviewed as part of the final decision.',
            due: 'After applying',
          },
          {
            action: 'Sit the entrance testing',
            detail: 'Arranged by Student Services only after every form has arrived. No shadow day at this band.',
            due: 'After all forms arrive',
          },
          {
            action: 'Attend the family interview',
            detail: 'Covers the mission, vision and statement of faith, and whether the school fits your family.',
            due: 'After testing',
          },
          {
            action: 'Watch for the written decision, then pay the $500 deposit',
            detail: 'Nonrefundable, applied toward tuition. No fixed notification date — admission is rolling.',
            due: 'Rolling',
          },
        ],
      },
      {
        key: 'hs',
        label: 'High · Grades 9–12',
        sublabel: 'Shadow day + placement test',
        title: 'High School — Grades 9–12',
        deadlines: [
          { value: 'Nov 2, 2026', label: 'priority window opens — members, EEC, siblings' },
          { value: 'Nov 16, 2026', label: 'applications open to the public' },
          { value: '$500', label: 'enrollment deposit on acceptance' },
        ],
        steps: [
          {
            title: 'Send the inquiry form, then arrange a visit',
            tag: 'Fall 2026',
            tagKind: 'outline',
            detail:
              'The first two steps are linked from the admissions page — an inquiry form, then the visit, which now means registering for the **Admissions Open House on Tuesday, November 10, 2026** (sessions at 12, 4 and 6 p.m., with separate elementary, middle and high school tours). High school is taught at the **Harris campus**, 7200 E. WT Harris Blvd.',
          },
          {
            title: 'Apply in FACTS and pay the application fee',
            tag: 'from Nov 2 or Nov 16',
            tagKind: 'accent',
            detail:
              'Apply through the **FACTS portal**, and send your child\'s **birth certificate** and **Immunization Registry record** with the application. On the fee: the school publishes a **non-refundable $300 application fee** for applications from **November 2, 2026 through May 31, 2027**, rising to a **$550 late enrollment application fee from June 1, 2027**. The application fee is **not applied toward tuition**.',
          },
          {
            title: 'Send four recommendations and the full record',
            tag: 'after applying',
            tagKind: 'accent',
            detail:
              'High school shares its form list with middle school. **Four recommendation forms** are required — a **Math Teacher Recommendation**, an **English Teacher Recommendation**, a **Principal or Guidance Counselor Recommendation**, and the **Personal Recommendation form from your family\'s pastor** that every grade needs. Alongside them: the **high school transcript**, **report cards from the most recent two years**, **standardized testing results**, a **Student Questionnaire** completed by your child, and any **educational or diagnostic testing results or a current IEP, 504 or accommodations plan**. Request the three school recommendations first — they depend on other people\'s time.',
          },
          {
            title: 'Shadow a Hickory Grove student',
            tag: 'high school only',
            tagKind: 'accent',
            detail:
              '**This step exists only at this band.** High school applicants are **required** to shadow a current Hickory Grove student for a day, arranged by completing a shadow request form. Grades 6 through 8 have no equivalent requirement even though their paperwork is identical, so it is the clearest difference between applying to middle school and applying to high school here.',
          },
          {
            title: 'Sit the entrance testing, including the placement test',
            tag: 'after all forms arrive',
            tagKind: 'accent',
            detail:
              'Testing is arranged through the **Student Services office**, and it is scheduled **only after the admissions office has received all of the required forms**. High school applicants also sit a **mandatory entrance test used to determine grade placement** — a step the school publishes for grades 9 through 12 only — and, per the school\'s 2026–27 High School Profile, they **must score at or above their grade level and be in good standing with their current school** to be admitted. The specific instruments are not published.',
          },
          {
            title: 'Attend the family interview',
            tag: 'after testing',
            tagKind: 'outline',
            detail:
              'The family interview is scheduled once the earlier steps are complete and have gone well. The school describes it as an opportunity to share its **mission, vision and statement of faith**, and to assess whether Hickory Grove is the right fit for your family. **There is no published requirement that a parent be a professing Christian** — what is required is the pastor\'s recommendation form and this conversation.',
          },
          {
            title: 'Decision, then the $500 deposit',
            tag: 'rolling',
            tagKind: 'outline',
            detail:
              'The final decision is **communicated in writing**, and it weighs satisfactory grades, the letters of recommendation, the interview, behavior reports, entrance testing and any IEP, 504 or psychoeducational evaluation on file. **Any suspensions, expulsions or failed courses on record are an automatic denial of admission** — a rule that matters most at this band, because a high school transcript carries the longest record. **No fixed notification date is published** — admission is rolling and depends on space in the grade. On acceptance a **nonrefundable $500 deposit** is due, and it applies toward tuition.',
          },
        ],
        watchOuts: [],
        checklistCallout: {
          lead: 'Two steps that exist only here — the shadow day and a placement test.',
          text: 'High school applicants are required to shadow a current Hickory Grove student for a day, and to sit a mandatory entrance test that determines grade placement — and, per the school\'s 2026–27 High School Profile, applicants must score at or above their grade level and be in good standing with their current school to be admitted. Neither the shadow day nor the test applies to grades 6 through 8, even though the four recommendation forms and the records list are identical. Testing is arranged through Student Services only after every form has arrived. Applications open November 2 for church members, Early Education Center students and current-student siblings, and November 16 for everyone else; after that admission is rolling and capacity-dependent, with no fixed notification date. Note that any suspensions, expulsions or failed courses on record are an automatic denial of admission — the rule bites hardest here, because a high school transcript carries the longest record.',
        },
        checklistRows: [
          {
            action: 'Submit the inquiry form and register for the Open House',
            detail: 'Both are forms linked from the admissions page; the Open House is Tuesday, November 10, 2026.',
            due: 'Fall 2026',
          },
          {
            action: 'Apply in the FACTS portal and pay the application fee',
            detail: 'Non-refundable and not applied toward tuition: $300 through May 31, 2027, then $550.',
            due: 'Nov 2 or Nov 16, 2026',
          },
          {
            action: 'Send the birth certificate and Immunization Registry record',
            detail: 'Both go with the application itself.',
            due: 'With the application',
          },
          {
            action: 'Request the Math Teacher Recommendation form',
            detail: 'One of three school recommendations — request early.',
            due: 'After applying',
          },
          {
            action: 'Request the English Teacher Recommendation form',
            detail: 'One of three school recommendations — request early.',
            due: 'After applying',
          },
          {
            action: 'Request the Principal or Guidance Counselor Recommendation form',
            detail: 'One of three school recommendations — request early.',
            due: 'After applying',
          },
          {
            action: "Ask your family's pastor for the Personal Recommendation form",
            detail: 'Required at every grade from TK through 12.',
            due: 'After applying',
          },
          {
            action: 'Send the high school transcript and two years of report cards',
            detail: 'Both are required from grade 6 upward.',
            due: 'After applying',
          },
          {
            action: 'Send standardized testing results',
            detail: 'Required from grade 6 upward.',
            due: 'After applying',
          },
          {
            action: 'Have your child complete the Student Questionnaire',
            detail: 'Required at every grade from 6 through 12.',
            due: 'After applying',
          },
          {
            action: 'Send any diagnostic testing, IEP, 504 or accommodations plan',
            detail: 'Only if applicable — reviewed as part of the final decision.',
            due: 'After applying',
          },
          {
            action: 'Complete the shadow request form and shadow a student',
            detail: 'Required of high school applicants only. Not asked of grades 6 through 8.',
            due: 'High school only',
          },
          {
            action: 'Sit the entrance testing and the grade placement test',
            detail: 'Arranged by Student Services after every form has arrived. The placement test is published for 9–12 only.',
            due: 'After all forms arrive',
          },
          {
            action: 'Attend the family interview',
            detail: 'Covers the mission, vision and statement of faith, and whether the school fits your family.',
            due: 'After testing',
          },
          {
            action: 'Watch for the written decision, then pay the $500 deposit',
            detail: 'Nonrefundable, applied toward tuition. No fixed notification date — admission is rolling.',
            due: 'Rolling',
          },
        ],
      },
      {
        key: 'intl',
        label: 'International (F-1)',
        sublabel: 'Separate process · I-20 issued by HGCS',
        title: 'International Students — F-1 Visa',
        deadlines: [
          { value: 'TOEFL 80', label: 'English proficiency — or Duolingo 115' },
          { value: 'Aug 1', label: 'full payment due before enrollment' },
          { value: '$500', label: 'enrollment deposit on acceptance' },
        ],
        steps: [
          {
            title: 'Interview online with the program director and the principal',
            tag: 'part of the review',
            tagKind: 'accent',
            detail:
              'Admission rests on four things the school lists together: an **online interview with the Director of the International Student Program and the Principal**, the completed online application, prior academic and behavioral performance, and the English-test scores. The interview is held online, so it **replaces the campus visit** that opens every domestic band — a family applying from abroad is not expected to travel first. Hickory Grove has run its international program since **2013**, and it issues its own I-20 rather than routing families through a third party.',
          },
          {
            title: 'Complete the online admission application',
            tag: 'after the interview',
            tagKind: 'accent',
            detail:
              'The same online admission application as domestic applicants, submitted to the **International Admissions Office**. The application file needs a **copy of the passport and birth certificate**, the **immunization record**, a **math and an English teacher recommendation**, the English-test score sheet, the **high school transcript and the previous two years of report cards, both translated into English**, and any accommodations plan, educational evaluation or medical diagnosis that applies. The application fee is **non-refundable** and **due at the time of application**, but its **amount is not published** — ask the international office.',
          },
          {
            title: 'Meet the English-proficiency thresholds',
            tag: 'with the application',
            tagKind: 'accent',
            detail:
              'The published thresholds are **TOEFL 80** and **Duolingo 115**, and the score sheet is submitted with the application. The school states it is **willing to discuss other testing options**, so a student holding a different recognized English assessment should ask rather than assume it will not be accepted.',
          },
          {
            title: 'Send transcripts translated into English',
            tag: 'with the application',
            tagKind: 'accent',
            detail:
              '**The high school transcript and the previous two years of report cards must be translated into English**, and the school directs families to **International Education Evaluations (IEE)** — info@foreigntranscripts.com — for help. Prior **academic and behavioral performance** and standardized test scores are then reviewed together, so the translated record is what the decision is made on.',
          },
          {
            title: 'Acceptance, then the I-20',
            tag: 'on acceptance',
            tagKind: 'accent',
            detail:
              'An accepted student is **notified by email**, and a school official then **mails the I-20 to the parent or guardian**. With the I-20 in hand, the student **arranges an interview with the U.S. Embassy in their own country to obtain the F-1 visa** — that appointment is the family\'s to book, and embassy waiting times are outside the school\'s control, so start it as soon as the I-20 arrives.',
          },
          {
            title: 'Arrange homestay, health insurance and immunizations',
            tag: 'before arrival',
            tagKind: 'outline',
            detail:
              'Where homestay is required, the **HGCS Student Coordinator** contacts the student or agent with the arrangements; host families are **Hickory Grove Baptist Church members and families with students at HGCS**, and the school handles the arrangement internally. **Host-family vetting and background-check specifics are not published** — ask the coordinator directly. Health insurance runs through **American Benefit Services (Short Term Medical)**, on **843-214-2447** or wesley.abs@gmail.com, and the school also requires an **international-student immunizations form** and a **current physical**.',
          },
          {
            title: 'Pay in full by August 1',
            tag: 'by Aug 1',
            tagKind: 'accent',
            detail:
              '**Full payment must be received by August 1** before the student can be enrolled, and a balance still unpaid on the first day of school puts the application on **financial hold**. This is the sharpest difference from the domestic bands, which take a $500 deposit at acceptance and bill the balance over the year. The **international tuition figure is not published**; nor is whether financial aid reaches international students. **Withdrawing early costs $500 plus 50% of the international tuition.**',
          },
          {
            title: 'What the program includes once you arrive',
            tag: 'through the year',
            tagKind: 'outline',
            detail:
              'The program covers an **orientation before school starts**, **PSAT and ACT testing**, **weekly meetings with the International Student Director**, regular reports back to families and agencies, **airport transportation** at the start and end of the year, **I-20 maintenance**, daily lunch, athletic and technology fees, local college visits, class field trips and required class reading books. One thing to plan for: **re-enrollment is not automatic** — it is applied for each year rather than carried forward.',
          },
        ],
        watchOuts: [],
        checklistCallout: {
          lead: 'A different process, not the domestic one with extra paperwork.',
          text: 'It runs on an online interview with the program director and the principal instead of a campus visit, on English-proficiency thresholds, on a transcript and report cards translated into English, and on two teacher recommendations, and it ends with an I-20 that Hickory Grove issues itself and an embassy appointment you book. The financial shape differs too: full payment is due by August 1, not a deposit and a billing plan. No separate international deadline is published, and neither is the international application fee or tuition — Sheila M. Chaney directs both admissions and the international program and is the person to ask.',
        },
        checklistRows: [
          {
            action: 'Arrange the online interview with the program director and the principal',
            detail: 'Part of the admission review, and it replaces the campus visit the domestic bands begin with.',
            due: 'Before the decision',
          },
          {
            action: 'Complete the online admission application and pay the fee',
            detail: 'With the passport and birth certificate copies, immunization record, math and English teacher recommendations and any accommodations plan. The fee is non-refundable and due with the application; its amount is not published.',
            due: 'With the application',
          },
          {
            action: 'Sit TOEFL or Duolingo and send the score sheet',
            detail: 'TOEFL 80 or Duolingo 115. The school will discuss other testing options.',
            due: 'With the application',
          },
          {
            action: 'Have the transcript and two years of report cards translated into English',
            detail: 'International Education Evaluations (IEE) can help — info@foreigntranscripts.com.',
            due: 'With the application',
          },
          {
            action: 'Watch for the acceptance email',
            detail: 'Acceptance is sent by email; the I-20 follows by mail.',
            due: 'On acceptance',
          },
          {
            action: 'Receive the I-20 and book the U.S. Embassy interview',
            detail: 'HGCS mails the I-20 to the parent or guardian; the embassy appointment for the F-1 visa is yours to arrange.',
            due: 'On acceptance',
          },
          {
            action: 'Arrange homestay with the HGCS Student Coordinator',
            detail: 'The coordinator makes contact where homestay is required. Vetting specifics are not published.',
            due: 'Before arrival',
          },
          {
            action: 'Arrange health insurance and send the immunizations form and physical',
            detail: 'American Benefit Services (Short Term Medical) — 843-214-2447.',
            due: 'Before arrival',
          },
          {
            action: 'Pay the $500 enrollment deposit, then the balance in full',
            detail: 'Full payment by August 1; a balance unpaid on the first day of school puts the application on financial hold.',
            due: 'By Aug 1',
          },
          {
            action: 'Plan to re-apply each year',
            detail: 'Re-enrollment is not automatic. Early withdrawal costs $500 plus 50% of international tuition.',
            due: 'Each year',
          },
        ],
      },
    ],

    aid: {
      title: 'Running in parallel: the financial-aid clock',
      text: 'Aid runs through **FACTS Grant & Aid Assessment**, and **FACTS charges $40** to process the application; request the aid information from the **finance office** at finance@hgchristian.org. The order of operations: apply for, accept or renew the **NC Opportunity Scholarship** through the state education assistance authority — **anyone can apply**, with no income cap on applying, and applications open **February 1** — and if you are still waiting on it, or it will not meet your need, apply to Hickory Grove for aid, awarded "until all available funds have been allocated". **ESA+** is available for children with disabilities attending an eligible non-public school. Hickory Grove\'s own aid application can be submitted **only once your HGCS application is complete**. A new federal **Education Freedom Tax Credit** funds K–12 scholarships from January 1, 2027 through an approved Scholarship Granting Organization; families apply to that organization, not the school, and Hickory Grove has not yet named its partner. Hickory Grove offers **no automatic discounts** such as multi-child or pastor discounts, but families earn a **5% discount for paying the whole school year\'s tuition by May 31**.',
      button: 'Financial Aid & Tuition',
    },

    comparison: {
      kicker: 'CROSS-BAND',
      title: 'Exactly what changes between bands',
      rows: [
        {
          label: 'Application window',
          cells: {
            tkk5: 'Nov 2, 2026 priority · Nov 16, 2026 public',
            es: 'Nov 2, 2026 priority · Nov 16, 2026 public',
            ms: 'Nov 2, 2026 priority · Nov 16, 2026 public',
            hs: 'Nov 2, 2026 priority · Nov 16, 2026 public',
            intl: 'No separate international deadline is published',
          },
        },
        {
          label: 'Recommendation forms',
          cells: {
            tkk5: 'Readiness Checklist from a preschool or daycare teacher + pastor',
            es: 'Academic Referral from the current teacher + pastor',
            ms: 'Math + English + principal/counselor + pastor',
            hs: 'Math + English + principal/counselor + pastor',
            intl: 'Math teacher + English teacher',
          },
        },
        {
          label: 'Records required',
          cells: {
            tkk5: 'Birth certificate · immunization record · Information form',
            es: 'Report cards, at least two years · any IEP or 504',
            ms: 'Transcript · two years of report cards · standardized scores · Student Questionnaire',
            hs: 'Transcript · two years of report cards · standardized scores · Student Questionnaire',
            intl: 'Transcript and two years of report cards, translated into English · passport and birth certificate copies',
          },
        },
        {
          label: 'Assessment',
          cells: {
            tkk5: 'Developmentally appropriate readiness screening — qualifying depends on it',
            es: 'Entrance testing through Student Services',
            ms: 'Entrance testing through Student Services',
            hs: 'Entrance testing plus a mandatory placement test',
            intl: 'TOEFL 80 or Duolingo 115',
          },
        },
        {
          label: 'Shadow day',
          cells: {
            tkk5: 'No',
            es: 'No',
            ms: 'No — the requirement starts at grade 9',
            hs: 'Yes — required, by shadow request form',
            intl: 'Not applicable',
          },
        },
        {
          label: 'First contact with the school',
          cells: {
            tkk5: 'Admissions Open House, November 10, 2026 — by registration form',
            es: 'Admissions Open House, November 10, 2026 — by registration form',
            ms: 'Admissions Open House, November 10, 2026 — by registration form',
            hs: 'Admissions Open House, November 10, 2026 — by registration form',
            intl: 'Online interview with the program director and the principal instead of a visit',
          },
        },
        {
          label: 'Family interview',
          cells: {
            tkk5: 'Yes — mission, vision and statement of faith, and fit',
            es: 'Yes — mission, vision and statement of faith, and fit',
            ms: 'Yes — mission, vision and statement of faith, and fit',
            hs: 'Yes — mission, vision and statement of faith, and fit',
            intl: 'The opening video interview serves this purpose',
          },
        },
        {
          label: 'Paying for the year',
          cells: {
            tkk5: '$500 deposit on acceptance, applied toward tuition',
            es: '$500 deposit on acceptance, applied toward tuition',
            ms: '$500 deposit on acceptance, applied toward tuition',
            hs: '$500 deposit on acceptance, applied toward tuition',
            intl: 'Full payment by August 1, or the place goes on financial hold',
          },
        },
        {
          label: 'Constant in every band',
          cells: {
            all: 'A Personal Recommendation form from the family’s pastor, required at every grade from TK through 12 · the FACTS online application, with a non-refundable $300 application fee through May 31, 2027 ($550 from June 1, 2027), not applied toward tuition · testing scheduled only after every required form has arrived · a written decision with no fixed notification date, because admission is rolling and capacity-dependent · a $500 nonrefundable enrollment deposit that applies toward tuition · and a published rule that any suspensions, expulsions or failed courses are an automatic denial of admission',
          },
        },
      ],
    },

    contacts: {
      kicker: 'CONTACTS',
      title: 'The admissions office',
      address:
        '7200 E. WT Harris Blvd., Charlotte, NC 28215 · main office 704-531-4008 · admissions@hgchristian.org · Mon–Fri 7:30 a.m.–3:30 p.m. Mail is addressed separately, to 6050 Hickory Grove Road, Charlotte, NC 28215 — the church and school complex. The school names a four-person Admissions & Enrollment Team — Sheila Chaney (Director of Admissions & International Student Program), Shelly Rivenbark (Registrar), Amanda Wright (School Finance) and Jared Daulton (Communications Coordinator) — but publishes contact details only for the director; the office lines below cover the rest.',
      people: [
        {
          name: 'Sheila M. Chaney',
          detail:
            'Director of Admissions & International Student Program · 704-531-4008 · admissions@hgchristian.org',
        },
        {
          name: 'Admissions office',
          detail: '704-531-4008 · Mon–Fri 7:30 a.m.–3:30 p.m. · admissions@hgchristian.org',
        },
        {
          name: 'Early Education Center — Harris',
          detail: 'Full-day preschool, below TK · 704-531-4059 · harriseec@hgchristian.org',
        },
        {
          name: 'Early Education Center — Mallard Creek',
          detail: 'Half-day preschool and the classical TK/K campus · 704-531-5345 · mallardcreekeec@hgchristian.org',
        },
        {
          name: 'Mrs. Lori Cheuvront',
          detail: 'Elementary Principal · 704-531-4195 · loricheuvront@hgchristian.org',
        },
      ],
    },

    checklist: {
      portalNote:
        'Portal: FACTS · hg-nc.client.factsmgt.com — memberId 496 for Harris, 15083 for Mallard Creek',
      aidPanel: {
        kicker: 'In parallel — the financial aid clock',
        items: [
          'Aid runs through FACTS Grant & Aid Assessment, and FACTS charges $40 to process the application. Request it from the finance office — finance@hgchristian.org.',
          'Apply for, accept or renew the NC Opportunity Scholarship first — anyone can apply, and applications open February 1.',
          'If you are still waiting on the state scholarship, or it will not meet your need, apply to Hickory Grove for aid — awarded until all available funds have been allocated, and open only once your HGCS application is complete.',
          'ESA+ is available for children with disabilities attending an eligible non-public school.',
          'No automatic discounts (multi-child, pastor), but a 5% discount for paying the full year\'s tuition by May 31.',
        ],
      },
      contactPanel: {
        kicker: 'Questions — admissions office',
        lines: [
          'Admissions — 704-531-4008 · admissions@hgchristian.org · Mon–Fri 7:30 a.m.–3:30 p.m.',
          '7200 E. WT Harris Blvd., Charlotte, NC 28215 · mail to 6050 Hickory Grove Road, Charlotte, NC 28215',
          'International applicants — Sheila M. Chaney, Director of Admissions & International Student Program · 704-531-4008',
          'Early Education Center — Harris 704-531-4059 · Mallard Creek 704-531-5345',
        ],
      },
      disclaimer:
        'Dates are the 2027–28 entry cycle as published on hgchristian.org, re-checked against the live site on November 4, 2026, together with both new-family admission checklists revised 11/17/25. The application fee is $300 from November 2, 2026 through May 31, 2027, and $550 from June 1, 2027. Cycle dates shift year to year — verify against the live site before acting. Compiled by Charlotte School Compare; not affiliated with Hickory Grove Christian School.',
    },

    sources: [
      {
        label:
          'hgchristian.org — Admissions Home: the Nov 2 and Nov 16, 2026 application windows, who qualifies for the priority window, the three website steps, the $300 application fee through May 31, 2027 and the $550 late fee from June 1, 2027, the Admissions & Enrollment Team and the non-discrimination statement',
        url: 'https://hgchristian.org/admissions-home',
      },
      {
        label:
          'hgchristian.org — Admissions Open House registration (the website\'s "Visit" step): Tuesday, November 10, 2026, at 12, 4 and 6 p.m., with elementary, middle and high school tours',
        url: 'https://hgchristian.org/visit',
      },
      {
        label:
          'hgchristian.org — new elementary families admissions checklist, revised 11/17/25: the four-step sequence, the TK/K5 and grades 1–5 form lists, testing scheduled only after all forms arrive, the automatic-denial rule and the $500 enrollment deposit',
        url: 'https://files.smartsites.parentsquare.com/14485/newfamilyadmissionschecklistesnodate.pdf',
      },
      {
        label:
          'hgchristian.org — new middle and high school families admissions checklist, revised 11/17/25: the four recommendation forms, the transcript and standardized-score requirements, and the shadow day required of high school applicants only',
        url: 'https://files.smartsites.parentsquare.com/14485/newfamilyadmissionschecklistmhsnodate.pdf',
      },
      {
        label:
          'hgchristian.org — 2026–27 High School Profile (grades 9–12 admission requirement): the entrance test is for grade placement, and applicants must score at or above grade level and be in good standing with their current school',
        url: 'https://resources.finalsite.net/images/v1790771210/hgchristianorg/l6paia83bjrvwh9kpm20/2026-2027SchoolProfile.pdf',
      },
      {
        label:
          'hgchristian.org — What is TK and K5?: the October 16 and April 16 birthday cutoffs, what Transitional Kindergarten is for, and the developmentally appropriate skills assessment a child must pass to qualify',
        url: 'https://hgchristian.org/tk-and-k5',
      },
      {
        label:
          'hgchristian.org — NC State Scholarships: FACTS Grant & Aid, the $40 FACTS charge, the apply-immediately instruction, the NC Opportunity Scholarship order of operations and February 1, 2027 opening, ESA+, and the 5% pay-by-May-31 discount',
        url: 'https://hgchristian.org/scholarships',
      },
      {
        label:
          'hgchristian.org — Scholarships & Financial Aid: FACTS Grant & Aid, and aid applications only after the HGCS application is complete',
        url: 'https://hgchristian.org/scholarships-financial-aid',
      },
      {
        label:
          'hgchristian.org — Federal Education Tax Credit: the Education Freedom Tax Credit from January 1, 2027, scholarships through an approved SGO, and the school\'s partner not yet named',
        url: 'https://hgchristian.org/taxcredit',
      },
      {
        label:
          'hgchristian.org — International Student Program Admissions: the online interview with the director and principal, the application file and teacher recommendations, the TOEFL 80 and Duolingo 115 thresholds, translated records through IEE, the fee due at application, the I-20 and embassy appointment, health insurance, and full payment by August 1',
        url: 'https://hgchristian.org/international-student-enrollment-pr',
      },
      {
        label:
          'hgchristian.org — International Student Program Home: the program established in 2013',
        url: 'https://hgchristian.org/international-program-home',
      },
      {
        label:
          'hgchristian.org — International Student Host Family Program: host families drawn from Hickory Grove Baptist Church members and HGCS families',
        url: 'https://hgchristian.org/host-families',
      },
      {
        label:
          'hgchristian.org — Tuition and Fees: the financial policies and the withdrawal notice requirement',
        url: 'https://hgchristian.org/tuition-and-fees',
      },
      {
        label:
          'hgchristian.org — Early Education Center: the preschool below Transitional Kindergarten, its Harris and Mallard Creek offices, and the full-day versus half-day split',
        url: 'https://hgchristian.org/early-education-center-home',
      },
      {
        label:
          'hgchristian.org — Mallard Creek campus: the classical Christian Transitional Kindergarten and Kindergarten, growing one grade a year, with students moving to Harris at middle school',
        url: 'https://hgchristian.org/academics/hgcs-mallard-creek-campus',
      },
      {
        label:
          'FACTS — the Harris campus application portal, memberId 496 (login-gated)',
        url: 'https://hg-nc.client.factsmgt.com/oa/index.cfm?memberid=496',
      },
      {
        label:
          'FACTS — the Mallard Creek campus application portal, memberId 15083 (login-gated)',
        url: 'https://hg-nc.client.factsmgt.com/oa/index.cfm?memberid=15083',
      },
      {
        label:
          'hickorygrove.org — the sponsoring church’s page about the school, used for the main school line and program facts',
        url: 'https://hickorygrove.org/ministries/other-ministries/christian-school/',
      },
    ],
  },
}
