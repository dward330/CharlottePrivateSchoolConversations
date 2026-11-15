// Trinity Episcopal School — After School ("Trinity Extended Day", TED).
//
// Transcribed from source-material/after-school/trinity-episcopal/ — principally
// "Trinity Episcopal School - After School - Trinity Extended Day.md", which
// carries the source URLs. Re-sourced 2026-11-14 (trinitysite) to the school's
// redesigned site: every TED rate now comes from the "Other Fees" section of
// the live Tuition & Financial Support page. The 2026-27 "Cost of Attendance"
// Google Doc that used to carry them (with income bands and an "Estimated"
// column) still opens but is no longer linked, so the live page wins.
//
// Three things make this entry structurally different from its peers.
//
// FIRST — and this is the reason the Cost Planner card is ABSENT — Trinity
// prices TED as ONE monthly rate ($380, $355 for each additional sibling), not
// by days per week. The planner's matrix is grade × days-per-week, an axis
// Trinity does not publish and on which its rate does not vary, so the rate
// card lives in the coverage card's facts instead, where it can be stated as
// published.
//
// SECOND, no annual figure appears anywhere below, deliberately. The school
// publishes no billing basis (how many months the monthly rate is charged), so
// an annual cost is not derivable and is not published here. It would be the
// single easiest number to invent in this whole entry.
//
// THIRD, Trinity uses the word "enrichments" for two unrelated things: TED's
// PAID seasonal add-ons (chess club, boys and girls run clubs, music lessons)
// and the Lower/Middle School's curricular enrichment subjects under
// Academics. Only the first belongs here.
//
// Trinity is K–8, so there is no Upper School row to mark uncovered — the
// uncovered row here is the MORNING, which is a confirmed null rather than a
// division.
//
// The live TED page also says "Registration for monthly and drop-in care is
// currently closed." No field here holds registration status, so it is left
// out (it is time-varying); it is recorded in source-material.

import type { AfterSchoolProgram } from '../afterSchool.ts'

/* The timeline runs from 8:00 a.m. to TED's 6:00 p.m. close — a 10-hour span,
   so each hour is 0.1 of the window. It starts at 8:00 so the morning gap (no
   before-school care) shows as its own row. The full-day "conference" rate is
   carried in the facts only: the live site gives no hours for it. */
const frac = (hour: number, minute = 0) => (hour + minute / 60 - 8) / 10

const TED = 'https://www.tescharlotte.org/community/trinity-extended-day'
const TUITION = 'https://www.tescharlotte.org/admissions/tuition-financial-support'
const CAMP = 'https://www.tescharlotte.org/community/wildcat-summer-camp'
const PROFILE_2627 =
  'https://resources.finalsite.net/images/v1790266877/tescharlotteorg/jraele9yxiqjc8nohifm/26-27SchoolProfile.pdf'

export const trinityEpiscopal: AfterSchoolProgram = {
  coverage: {
    headline:
      'One K–8 program, Trinity Extended Day, runs from dismissal to 6:00 p.m. at one monthly rate: $380, or $355 for each additional sibling.',
    subhead:
      'Every per-day rate has a reduced price for families receiving financial support, and half days are complimentary for monthly registered students. There is no morning care.',
    hours: ['8 am', '10 am', '12 pm', '2 pm', '4 pm', '6 pm'],
    basisNote:
      'The price on the bar is the **monthly rate**: **$380** a month, or **$355** for each additional sibling. Trinity does **not** price TED by days per week, so there is no days-per-week ladder to open. The per-day rates are in the facts below.',
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
        endFrac: frac(18),
        tiers: [],
        flatLabel: 'TED from early dismissal · free to monthly students, else $51/day',
      },
    ],
    summer: {
      season: 'JUN–JUL',
      text: '**Wildcat Summer Camp, 2026 season** — six weeks of full- and half-day camps for rising grades K–8, **15 June to 24 July 2026**, open to any child in the community. In 2026, before-camp care 7:45–9:00 a.m. was **$85/week**, after-camp care 4:00–5:30 p.m. **$90/week**, or **$175/week** for both. Registration for the 2027 camps opens in January 2027.',
    },
    facts: [
      {
        label: 'Monthly rate',
        text: '**$380** a month, or **$355** for each additional sibling',
      },
      {
        label: 'Drop-in',
        text: '**$31/day**, or **$25/day** for families receiving financial support — TED is open until 6 p.m. on regular school days',
      },
      {
        label: 'Full day',
        text: '**$72/day**, or **$45/day for a first sibling and $40/day for each additional sibling** with financial support — offered during conferences',
      },
      {
        label: 'Half day',
        text: '**complimentary for monthly registered students**; otherwise **$51/day**, or **$30/day** with financial support',
      },
      {
        label: 'Morning care',
        text: 'none — TED begins at dismissal and there is no before-school program of any kind during the school year',
      },
      {
        label: 'Staff',
        text: '**Jocelyn Anderson**, Director of Auxiliary Services, and **Nancy Guerra**, Assistant Director, TED; the school profile records **7 Extended Day & Support Staff**',
      },
    ],
    // No flags on the cost card (user, 2026-09-16). Notes on what TED does not
    // publish — no annual total, no late-pickup policy, no registration fee, the
    // morning-care null, no dismissal time — read as caveats about the research
    // rather than the program. Every note stays in
    // source-material/after-school/trinity-episcopal/.
    flags: [],
    sources: [
      {
        label: 'tescharlotte.org — Trinity Extended Day (hours, activities, staff)',
        url: TED,
      },
      {
        label: 'tescharlotte.org — Tuition & Financial Support ("Other Fees": every TED rate)',
        url: TUITION,
      },
      {
        label: 'tescharlotte.org — Wildcat Summer Camp',
        url: CAMP,
      },
      {
        label: '2026-27 School Profile (PDF; extended-day staff count)',
        url: PROFILE_2627,
      },
    ],
  },

  dayInside: {
    headline:
      'Dedicated time for homework and reading, outdoor play, and activities such as art, board games and Fun/Film Fridays, from dismissal until 6:00 p.m.',
    subhead:
      'Seasonal enrichments cost extra. The school names chess club, boys and girls run clubs and music lessons as examples, and prices none of them.',
    rhythm: [],
    wordsTitle: 'The program, in the school’s words',
    words: [
      'engage in learning',
      'flex their activity',
      'get their bodies moving',
      'dedicated time for homework and reading',
      'outdoor play',
      'art',
      'board games',
      'Fun/Film Fridays',
    ],
    // Rewritten 2026-11-14 from the live TED page (trinitysite). The old page's
    // "building character" tagline, group projects and the Honor Code line are
    // no longer on the site.
    wordsText:
      '"When the school day ends, there is still a space for students to engage in learning, flex their activity, and get their bodies moving before heading home." TED offers "dedicated time for homework and reading, outdoor play, and activities such as art, board games, and Fun/Film Fridays."',
    catalogTitle: 'Enrichments — named, and unpriced',
    catalogIntro:
      'In addition to TED programming, "seasonal enrichments are offered **for an additional fee**." The school names three and adds "and much more", so this is **not the full roster**. It states no fee for any of them. Note that Trinity uses "enrichments" for two different things. The ones named here are the **paid** after-school add-ons. The Lower and Middle School pages use "Enrichments" for subjects taught during the school day.',
    dayFilters: [],
    gradeFilters: [],
    classes: [
      {
        name: 'Chess club',
        desc: 'Named by the school as an example of a seasonal TED enrichment; day, grade band and fee are not published.',
        day: '—',
        grades: [],
        gradeLabel: 'K–8',
        fee: '—',
      },
      {
        name: 'Boys and girls run clubs',
        desc: 'Named by the school as an example of a seasonal TED enrichment; day, grade band and fee are not published.',
        day: '—',
        grades: [],
        gradeLabel: 'K–8',
        fee: '—',
      },
      {
        name: 'Music lessons',
        desc: 'Named by the school as an example of a seasonal TED enrichment; day, grade band and fee are not published.',
        day: '—',
        grades: [],
        gradeLabel: 'K–8',
        fee: '—',
      },
    ],
    // No flags on this card (user, 2026-09-16) — notes on what the TED page
    // does not publish: enrichment pricing, that the named enrichments are
    // examples rather than the full roster, and the absent afternoon schedule
    // and staff ratio. All stay in source-material/.
    flags: [],
    sources: [
      {
        label: 'tescharlotte.org — Trinity Extended Day',
        url: TED,
      },
      {
        label: 'tescharlotte.org — Lower School (its "Enrichments" are school-day subjects)',
        url: 'https://www.tescharlotte.org/academics/lower-school',
      },
      {
        label: 'tescharlotte.org — Middle School',
        url: 'https://www.tescharlotte.org/academics/middle-school',
      },
    ],
  },

  verdict: {
    headline:
      'One published monthly rate, a reduced price on every per-day rate for families receiving financial support, and free half days for monthly families.',
    // No subhead (user, 2026-09-16) — it listed what TED does not publish.
    strengths: [
      '**The monthly rate is published on the tuition page** — $380 a month, listed with tuition under "Other Fees", so the cost of care is easy to find.',
      '**Every per-day rate is lower with financial support.** Drop-in falls from $31 to $25 and a half day from $51 to $30. A full day falls from $72 to $45 for a first sibling, or $40 for each additional sibling.',
      '**Half days are complimentary for monthly registered students.** Early-dismissal days are where care is hardest to arrange and where several peers charge a premium.',
      '**A sibling rate is published** — $355 against $380 for each additional sibling — so the discount is stated rather than implied.',
      '**Coverage runs to 6:00 p.m.**, a late close, and it is one uniform program across the whole K–8 span rather than a split Lower/Middle arrangement.',
      '**Conference days are covered** — a full-day rate of $72/day is "offered during conferences", which several peers do not address at all.',
      '**The program has a stated purpose beyond supervision**: dedicated time for homework and reading, outdoor play, and activities such as art and board games.',
    ],
    // No watch-outs (user, 2026-09-16) — notes on what TED does not publish (no
    // before-school care, no annual total, unpriced enrichments, no late-pickup
    // policy, no daily rhythm or staff ratio). The rates and the strengths
    // above are the card. All stay in source-material/.
    watchouts: [],
    checklist: [
      'How many months a year is the TED monthly rate billed, and what does a full school year actually cost?',
      'Is the $380 monthly rate the same however many days a week my child attends?',
      'Is there a registration fee, and is a partial month prorated if we start or stop mid-year?',
      'Can we switch between the monthly contract and drop-in during the year, and how much notice is needed?',
      'What do the enrichments cost — chess club, boys and girls run clubs, music lessons — and what is the full current list?',
      'Does an enrichment cover us until 6:00 p.m., or is it charged on top of the monthly TED rate?',
      'What is the late-pickup policy after 6:00 p.m. — is there a charge, and at what point does it affect enrollment?',
      'Is there a reduced monthly rate for families receiving financial support, as there is for every per-day rate?',
      'What hours does TED run on half days and on conference days?',
      'What is the staff-to-child ratio in TED, and does it differ for a kindergartener and an 8th grader?',
      'Is there any supervised option before school, even unpaid — and if not, what do working families typically do?',
    ],
    flags: [],
    sources: [
      {
        label: 'tescharlotte.org — Trinity Extended Day',
        url: TED,
      },
      {
        label: 'tescharlotte.org — Tuition & Financial Support (TED rates)',
        url: TUITION,
      },
      {
        label: 'Verdict synthesized by the researcher from the sources cited on the cards above',
      },
    ],
  },
}
