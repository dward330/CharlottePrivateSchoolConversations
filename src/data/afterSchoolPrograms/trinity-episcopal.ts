// Trinity Episcopal School — After School ("Trinity Extended Day", TED).
//
// Transcribed from source-material/after-school/trinity-episcopal/ — principally
// "Trinity Episcopal School - After School - Trinity Extended Day.md", which
// carries the source URLs. Every dollar figure comes from the school's own
// "Cost of Attendance for 2026-27" Google Doc; the TED page itself carries no
// dollar figures at all.
//
// Three things make this entry structurally different from its peers.
//
// FIRST — and this is the reason the Cost Planner card is ABSENT — Trinity
// prices TED by HOUSEHOLD INCOME, not by days per week. The planner's matrix is
// grade × days-per-week, an axis Trinity does not publish and on which its rates
// do not vary. Four income bands cannot be laid on a days-per-week grid without
// inventing a dimension, so the rate card lives in the coverage card's facts and
// flags instead, where it can be stated as published.
//
// SECOND, no annual figure appears anywhere below, deliberately. An earlier
// research pass recorded a "18.5 days/month × 10 months" billing basis, a 1.5%
// late fee and a three-occasions removal rule; a full re-check found ZERO hits
// for any of them across the TED page and the cost document. With no published
// billing basis — and with the school labelling its own monthly figure
// "Estimated" in its own column header — an annual cost is not derivable and is
// not published here. It would be the single easiest number to invent in this
// whole entry.
//
// THIRD, Trinity uses the word "enrichments" for two unrelated things: TED's
// PAID after-school add-ons (chess club, music lessons, karate, cheer club) and
// the Lower/Middle School's FREE curricular enrichment subjects under Academics.
// Only the first belongs here.
//
// Trinity is K–8, so there is no Upper School row to mark uncovered — the
// uncovered row here is the MORNING, which is a confirmed null rather than a
// division.

import type { AfterSchoolProgram } from '../afterSchool.ts'

/* TED's window runs from the earliest published start (8:00 a.m., which applies
   only on full days when school itself is closed) to the 6:00 p.m. close — a
   10-hour span, so each hour is 0.1 of the window. */
const frac = (hour: number, minute = 0) => (hour + minute / 60 - 8) / 10

export const trinityEpiscopal: AfterSchoolProgram = {
  coverage: {
    headline:
      'One K–8 program, Trinity Extended Day, runs from dismissal to 6:00 p.m. — and it is priced on household income rather than on how many days a week you use it.',
    subhead:
      'Four income bands run $105 to $380 a month, every drop-in tier has a reduced rate for families receiving financial support, and half days are free to monthly attendees. There is no morning care.',
    hours: ['8 am', '10 am', '12 pm', '2 pm', '4 pm', '6 pm'],
    basisNote:
      'The price on the bar is the **monthly rate for a household over $90,000** — the top of four income bands, which start at **$105/month** under $30,000. Trinity does **not** price TED by days per week, so there is no days-per-week ladder to open; the full income table and the per-day rates are in the facts below.',
    rows: [
      {
        division: 'K – Grade 8',
        dismissal: 'begins at dismissal',
        startFrac: frac(15),
        endFrac: frac(18),
        tiers: [],
        flatLabel: 'Trinity Extended Day · dismissal–6:00 · $380/mo',
      },
      {
        division: 'Mornings',
        dismissal: 'before school',
        startFrac: 0,
        endFrac: frac(9),
        tiers: [],
        uncovered: true,
        flatLabel: 'No before-school care — TED is afternoon-only',
      },
      {
        division: 'Half days',
        dismissal: 'early dismissal',
        startFrac: frac(12),
        endFrac: frac(17, 30),
        tiers: [],
        flatLabel: 'TED runs early dismissal–5:30 · free to monthly attendees, else $51/day',
      },
      {
        division: 'Full days (school closed)',
        dismissal: 'TES closed',
        startFrac: frac(8),
        endFrac: frac(17, 30),
        tiers: [],
        flatLabel: 'TED runs 8:00–5:30 on days TES is closed · $72/day',
      },
    ],
    summer: {
      season: 'JUN–JUL',
      text: '**Wildcat Summer Camp** — six weeks of full- and half-day camps for rising grades K–8, **15 June to 24 July 2026**, open to any child in the community. Before-camp care 7:45–9:00 a.m. is **$85/week**, after-camp care 4:00–5:30 p.m. **$90/week**, or **$175/week** for both.',
    },
    facts: [
      {
        label: 'Monthly rates by household income',
        text: 'under $30,000 **$105** · $30,000–$60,000 **$135** · $60,000–$90,000 **$195** · over $90,000 **$380** ($355 for a sibling) — the school heads this column "**Estimated** TED Monthly Cost"',
      },
      {
        label: 'Drop-in',
        text: '**$31/day**, or **$25/day** for families receiving financial support — TED is open until 6 p.m. on regular school days',
      },
      {
        label: 'Full day',
        text: '**$72/day**, or **$45/day for a first child ($40 sibling)** with financial support — these are days TES is closed but TED runs 8:00 a.m.–5:30 p.m.',
      },
      {
        label: 'Half day',
        text: '**complimentary to TED monthly attendees**; otherwise **$51/day**, or **$30/day** with financial support — TED runs from early dismissal to 5:30 p.m.',
      },
      {
        label: 'Morning care',
        text: 'none — TED begins at dismissal and there is no before-school program of any kind during the school year',
      },
      {
        label: 'Staff',
        text: '**Jocelyn Purdie**, Director of Auxiliary Services, and **Nancy Guerra**, Assistant Director, TED; the school profile records **7 Extended Day & Support Staff**',
      },
    ],
    // No flags on the cost card (user, 2026-09-16). Six notes on what TED does
    // not publish — the "Estimated" hedge, no annual total, no late-pickup
    // policy, no registration fee, the morning-care null, no dismissal time —
    // read as caveats about the research rather than the programme. The rates
    // and hours themselves are unchanged, and every note stays in
    // source-material/after-school/trinity-episcopal/.
    flags: [],
    sources: [
      {
        label: 'tescharlotte.org — Trinity Extended Day (hours, activities, staff; no dollar figures)',
        url: 'https://www.tescharlotte.org/community/trinity-extended-day.cfm',
      },
      {
        label: 'Cost of Attendance for 2026-27 (the school\'s own document — every TED rate)',
        url: 'https://docs.google.com/document/d/1jh3Oc1gO1ShFo7bDR6xGEXCwvjN8Gpn_Ylg3z6Igs0M/export?format=txt',
      },
      {
        label: 'tescharlotte.org — Wildcat Summer Camp',
        url: 'https://www.tescharlotte.org/community/wildcat-summer-camp.cfm',
      },
      {
        label: 'tescharlotte.org — 2026-27 School Profile (PDF; extended-day staff count)',
        url: 'https://www.tescharlotte.org/editoruploads/files/26-27SchoolProfile.pdf',
      },
    ],
  },

  dayInside: {
    headline:
      'Dedicated homework time, art, board games and Fun Friday — with the Trinity Honor Code explicitly extended past the end of the school day.',
    subhead:
      'Paid enrichments run several days a week, led by a mix of Trinity faculty and outside contractors. The school names four examples and prices none of them.',
    rhythm: [],
    wordsTitle: 'The program, in the school’s words',
    words: [
      'building character',
      'enriching lives',
      'having fun',
      'safe, well-structured environment',
      'dedicated homework time',
      'group projects',
      'Fun Friday activities',
      'the Trinity Honor Code',
    ],
    wordsText:
      '"Building character, enriching lives, and having fun describe our Trinity Extended Day (TED) program. While providing a vital service for many families, TED offers a safe, well-structured environment for every Trinity student." The school adds that "Extended Day provides an opportunity and space for students to focus on academics through dedicated homework time and to learn how to navigate social relationships. This is accomplished through group projects and fun-focused activities, all aimed at extending the Wildcat learning experience." Day to day, "students participate in various activities such as art, board games, Fun Friday activities, etc.", and "students are expected to adhere to the Trinity Honor Code while participating in Extended Day."',
    catalogTitle: 'Enrichments — named, and unpriced',
    catalogIntro:
      'TED "also offers enrichment programs, **for an additional fee**, several days a week", led by "a combination of Trinity faculty/staff and independent contractors". The school gives these four as **examples** and adds "and more", so this is **not the full roster** — and it states no fee for any of them. Note that Trinity uses "enrichments" for two different things: these are the **paid** after-school add-ons, while the Lower and Middle School "Enrichments" pages list free curricular subjects.',
    dayFilters: [],
    gradeFilters: [],
    classes: [
      {
        name: 'Chess club',
        desc: 'Named by the school as an example of a TED enrichment; day, grade band and fee are not published.',
        day: '—',
        grades: [],
        gradeLabel: 'K–8',
        fee: '—',
      },
      {
        name: 'Music lessons',
        desc: 'Named by the school as an example of a TED enrichment; day, grade band and fee are not published.',
        day: '—',
        grades: [],
        gradeLabel: 'K–8',
        fee: '—',
      },
      {
        name: 'Karate',
        desc: 'Named by the school as an example of a TED enrichment; day, grade band and fee are not published.',
        day: '—',
        grades: [],
        gradeLabel: 'K–8',
        fee: '—',
      },
      {
        name: 'Cheer club',
        desc: 'Named by the school as an example of a TED enrichment; day, grade band and fee are not published.',
        day: '—',
        grades: [],
        gradeLabel: 'K–8',
        fee: '—',
      },
    ],
    // No flags on this card (user, 2026-09-16) — three notes on what the TED
    // page does not publish: enrichment pricing, that the four named
    // enrichments are examples rather than the full roster, and the absent
    // afternoon schedule and staff ratio. All stay in source-material/.
    flags: [],
    sources: [
      {
        label: 'tescharlotte.org — Trinity Extended Day',
        url: 'https://www.tescharlotte.org/community/trinity-extended-day.cfm',
      },
      {
        label: 'tescharlotte.org — Lower School Enrichments (the free curricular sense of the word)',
        url: 'https://www.tescharlotte.org/academics/lower-school-enrichments.cfm',
      },
      {
        label: 'tescharlotte.org — Middle School Enrichments',
        url: 'https://www.tescharlotte.org/academics/middle-school-enrichments.cfm',
      },
    ],
  },

  verdict: {
    headline:
      'The most deliberately affordable after-school program on this roster — income-scaled monthly rates, a reduced rate on every drop-in tier, and free half days for monthly families.',
    // No subhead (user, 2026-09-16) — it listed what TED does not publish.
    strengths: [
      '**Rates scale with household income** — $105 a month under $30,000, rising through $135 and $195 to $380 over $90,000. No other school in this set prices after-school care on ability to pay at all.',
      '**Every per-day tier has a reduced rate for families receiving financial support** — drop-in falls from $31 to $25, a full day from $72 to $45 (first child) and a half day from $51 to $30. The discount is not confined to the monthly contract.',
      '**Half days are complimentary to monthly attendees.** Early-dismissal days are where care is hardest to arrange and where several peers charge a premium.',
      '**A sibling rate is published** in the top income band — $355 against $380 — so the discount is stated rather than implied.',
      '**Coverage runs to 6:00 p.m.**, the latest close on this roster, and it is one uniform program across the whole K–8 span rather than a split Lower/Middle arrangement.',
      '**Days when school is closed are covered** — TED runs 8:00 a.m. to 5:30 p.m. at $72/day — which several peers do not address at all.',
      '**The program has a stated purpose beyond supervision**: dedicated homework time, group projects, and the Trinity Honor Code explicitly extended past dismissal.',
    ],
    // No watch-outs (user, 2026-09-16) — eight notes on what TED does not
    // publish (no before-school care, no annual total, the "Estimated" hedge,
    // unpriced enrichments, pricing living in a Google Doc, no late-pickup
    // policy, no daily rhythm or staff ratio, wide top income band). The rates
    // and the strengths above are the card. All stay in source-material/.
    watchouts: [],
    checklist: [
      'How many months a year is the TED monthly rate billed, and what does a full school year actually cost?',
      'The rate table says "Estimated" — what is the actual charge, and what makes it vary?',
      'Is there a registration fee, and is a partial month prorated if we start or stop mid-year?',
      'Can we switch between the monthly contract and drop-in during the year, and how much notice is needed?',
      'What do the enrichments cost — chess club, music lessons, karate, cheer club — and what is the full current list?',
      'Does an enrichment cover us until 6:00 p.m., or is it charged on top of the monthly TED rate?',
      'What is the late-pickup policy after 6:00 p.m. — is there a charge, and at what point does it affect enrolment?',
      'Which income figure is used for the band — gross household income, adjusted gross, or the Clarity assessment?',
      'What is the staff-to-child ratio in TED, and does it differ for a kindergartener and an 8th grader?',
      'Is there any supervised option before school, even unpaid — and if not, what do working families typically do?',
    ],
    flags: [],
    sources: [
      {
        label: 'tescharlotte.org — Trinity Extended Day',
        url: 'https://www.tescharlotte.org/community/trinity-extended-day.cfm',
      },
      {
        label: 'Cost of Attendance for 2026-27 (the school\'s own document)',
        url: 'https://docs.google.com/document/d/1jh3Oc1gO1ShFo7bDR6xGEXCwvjN8Gpn_Ylg3z6Igs0M/export?format=txt',
      },
      {
        label: 'Verdict synthesized by the researcher from the sources cited on the cards above',
      },
    ],
  },
}
