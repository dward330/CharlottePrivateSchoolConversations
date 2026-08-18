// Structured Financial Aid & Tuition deep-dive reports.
//
// These power the expanded card on the school detail page (see
// components/FinancialAidReport.tsx), replacing the generic prose renderer for
// this one topic. Every figure here is transcribed from the school's own
// deep-dive report in source-material/ (the same text that ships as
// src/content/financial-aid-tuition/<school>.json) — nothing is inferred,
// averaged, or carried across schools.
//
// The schools' reports do NOT share a structure, because the schools
// themselves publish different things. Charlotte Country Day publishes two
// consecutive years of rates and an endowed-scholarship gift ladder; Cannon and
// Davidson Day explicitly state their tuition history could not be retrieved;
// Providence Day's aid detail lives in its Report on Philanthropy, not on the
// tuition page. So every block below is optional and a school renders only the
// blocks its source actually supports. Adding an empty block to "fill out" a
// school would invent data — don't.
//
// Schools with no entry here fall back to the standard prose card.

/** A tuition band. `prior` is only set where the school publishes last year's rate. */
import {
  localized,
  indexOverlay,
  setOverlayIndex,
  overlayIndex,
  hasOverlay,
  type OverlayFile,
} from '../lib/localizeData.ts'

export type TuitionBand = {
  label: string
  /** Current-year tuition in dollars. */
  amount: number
  /** Prior-year tuition, where published. Drives the ghost comparison bar. */
  prior?: number
  /** Year-over-year change, pre-computed as published (e.g. '+5.0%'). */
  delta?: string
}

/** A published min–max range on a common scale (beyond-tuition estimates). */
export type RangeRow = {
  label: string
  min: number
  max: number
}

/** Pricing status of one confirmed cost component. */
export type ComponentStatus = 'priced' | 'range' | 'unpriced'

export type CostComponent = {
  label: string
  status: ComponentStatus
}

export type TimelineNode = {
  /** Short date or label, e.g. '1 Nov' or 'Every year'. */
  when: string
  detail: string
  /** Solid (rather than outlined) node — the decision point. */
  emphasis?: boolean
}

/** A gift level on the endowed-scholarship ladder. */
export type ScholarshipRung = {
  gift: string
  /** Share of tuition the gift is designed to cover, 0–100. */
  share: number
  detail: string
}

export type PaymentPlan = {
  /** Big condensed figure, e.g. '10%', '1×', '10×'. */
  figure: string
  label: string
  detail: string
  /** Renders in the accent-filled emphasis style. */
  emphasis?: boolean
}

export type InfoBox = {
  title?: string
  /** Outline tag rendered above the body, e.g. 'NOT PUBLISHED'. */
  tag?: string
  body: string
}

export type StatCell = {
  value: string
  label: string
}

/** One numbered section of the report. Every figure block is optional. */
export type ReportSection = {
  id: string
  /** Display title, e.g. 'The Tuition Table — Price by Band'. */
  title: string
  /** Short title for the contents nav. */
  navTitle: string
  /** Disclosure completeness, 0–100. Shown as the nav meter. */
  confidence: number
  /** Optional note beside the section heading. */
  note?: string
  /** Optional accent tag beside the heading, e.g. 'ALL AID IS NEED-BASED'. */
  tag?: string
  /** Figure caption for whichever chart this section renders. */
  figureCaption?: string
  /** Small print under the figure. */
  figureNote?: string
  /** Second note under the figure, where the source needs two. */
  figureNote2?: string

  // --- figure blocks (all optional; render only what exists) ---
  bands?: TuitionBand[]
  ranges?: RangeRow[]
  /** Upper bound of the range scale, e.g. 700 for a $0–700 axis. */
  rangeMax?: number
  components?: CostComponent[]
  /** Header line for the component grid, e.g. the all-in-estimate verdict. */
  componentsTitle?: string
  componentsNote?: string
  componentsAside?: string
  timeline?: TimelineNode[]
  ladder?: ScholarshipRung[]
  plans?: PaymentPlan[]
  stats?: StatCell[]
  questions?: string[]
  questionsTitle?: string
  questionsNote?: string

  /** Side/below callout boxes. */
  boxes?: InfoBox[]
  /** Bulleted list rendered in the first box, where the source gives one. */
  bullets?: string[]
  /** Per-section citation (hidden when 'show sources' is off). */
  source?: string
}

export type FinancialAidReport = {
  title: string
  /** e.g. '2026–27 school year · figures as of 23 Jul 2026'. */
  meta: string
  /** The three framing rules at the top of the card. */
  framing: { icon: 'info' | 'clock' | 'book'; title: string; body: string }[]
  sections: ReportSection[]
  /** Run-on citation list in the card footer. */
  sources: string
}

const COUNTRY_DAY: FinancialAidReport = {
  title: 'Tuition & Financial Aid — Deep Dive Report',
  meta: '2026–27 school year · figures as of 23 Jul 2026',
  framing: [
    {
      icon: 'info',
      title: 'Unpublished ≠ deficient.',
      body: '"Not published" flags a transparency gap — never a judgement that the aid programme is small or unwelcoming.',
    },
    {
      icon: 'clock',
      title: 'Published ≠ current.',
      body: 'Every dollar figure carries the school year it applies to. Undated school figures are flagged, not guessed.',
    },
    {
      icon: 'book',
      title: 'K–12 aid only.',
      body: 'The $13M in college scholarships from the School Profile is university money — excluded throughout. Not financial advice.',
    },
  ],
  sections: [
    {
      id: 'fa-tuition',
      navTitle: 'The Tuition Table',
      title: 'The Tuition Table — Price by Band',
      confidence: 95,
      figureCaption: 'Published tuition by band',
      // 2025–26 rates are the school's own published figures, recovered from
      // Wayback snapshots of the tuition page (see "… - Tuition History.md" in
      // source-material). They are deliberately NOT 2026–27 ÷ 1.05: the school
      // rounds each band, so the derived figures would be off by a few dollars
      // in three of five bands.
      bands: [
        { label: 'Junior K', amount: 24515, prior: 23350, delta: '+5.0%' },
        { label: 'Kindergarten', amount: 25725, prior: 24500, delta: '+5.0%' },
        { label: 'Grades 1–4', amount: 30375, prior: 28930, delta: '+5.0%' },
        { label: 'Grades 5–8', amount: 32700, prior: 31145, delta: '+5.0%' },
        { label: 'Grades 9–12', amount: 34075, prior: 32450, delta: '+5.0%' },
      ],
      figureNote:
        'Five bands cover all 14 grades — the school has never priced individual grades. Tuition covers "the core educational experience including technology," per the school\'s wording. 2025–26 rates are the school\'s own published figures, recovered from archived copies of the tuition page.',
      boxes: [
        { tag: 'NOT PUBLISHED', title: 'Four tuition-table specifics', body: '' },
      ],
      bullets: [
        'New-student vs returning-student rates',
        'Half-day or part-week Junior K variants',
        'Whether lunch is included (billing list suggests it is billed separately)',
        'An international-student rate — 14% of students are international',
      ],
      source:
        'charlottecountryday.org — Tuition & Financial Aid, retrieved 23 Jul 2026',
    },
    {
      id: 'fa-beyond',
      navTitle: 'Beyond Tuition',
      title: 'Beyond Tuition — The Real Cost of Attendance',
      confidence: 64,
      figureCaption: 'Estimated additional expenses, 2026–27',
      ranges: [
        { label: 'Lower School', min: 100, max: 200 },
        { label: 'Middle School', min: 200, max: 400 },
        { label: 'Upper School', min: 200, max: 700 },
      ],
      rangeMax: 700,
      figureNote:
        'Scale $0–700. A bounded estimate per division, not an itemised fee schedule — covers textbooks & supplies (gr. 5–12), activity fees, and athletic fees. Enrolment deposit: 10% of tuition, credited toward tuition due.',
      componentsTitle: 'Ten confirmed cost components — 6 unpriced',
      componentsAside: 'All-in estimate not built: 60% unpriced > 33% threshold',
      components: [
        { label: 'Tuition — five bands, priced', status: 'priced' },
        { label: 'Textbooks & supplies · in range only', status: 'range' },
        { label: 'Activity fee · in range only', status: 'range' },
        { label: 'Athletic / sports fee · in range only', status: 'range' },
        { label: 'Extended Day · no rate', status: 'unpriced' },
        { label: 'Enrichment classes · no rate', status: 'unpriced' },
        { label: 'Bus transportation · no rate', status: 'unpriced' },
        { label: 'Tutoring · no rate', status: 'unpriced' },
        { label: 'Dining hall · no rate', status: 'unpriced' },
        { label: 'MS PE uniforms · no rate', status: 'unpriced' },
      ],
      componentsNote:
        "All six unpriced items appear on the school's own billing list — real costs, billed monthly, rates visible only on a family's statement. These are the highest-value questions for the business office.",
    },
    {
      id: 'fa-engine',
      navTitle: 'The Aid Engine',
      title: 'The Aid Engine — Process, Forms & Timeline',
      confidence: 90,
      note: 'the best-documented part of the picture',
      timeline: [
        {
          when: '1 Nov',
          detail: 'Deadline for **current families** — application + documents via Clarity',
        },
        { when: '15 Jan', detail: 'Deadline for **prospective families**' },
        {
          when: 'With contracts',
          detail:
            'Award decisions released with enrolment contracts — admission is decided separately',
          emphasis: true,
        },
        {
          when: 'Every year',
          detail:
            'Awards run one year; families re-apply annually. Similar level normally continues absent income change',
        },
      ],
      boxes: [
        {
          title: 'Platform & cost to apply',
          body: '**Clarity** · $65 fee at submission · under an hour, mobile-friendly, fully translated into Spanish. Docs: 1040, W2s, recent pay stub — tax records pull in automatically.',
        },
        {
          title: 'Divorced or separated parents',
          body: 'Both custodial and non-custodial parents must file through Clarity regardless of legal settlements; missing information from either parent may prevent an award.',
        },
        {
          tag: 'NOT PUBLISHED',
          body: 'No appeals process · no mid-year change-of-circumstance policy. **Hazard:** a stale portal page still names the old SSS platform — the live admissions page (Clarity) is the one to trust.',
        },
      ],
      source:
        'charlottecountryday.org — Tuition & Financial Aid; Admissions FAQs, retrieved 23 Jul 2026',
    },
    {
      id: 'fa-merit',
      navTitle: 'Merit & Scholarships',
      title: 'Merit, Discounts & Special Programmes',
      confidence: 82,
      tag: 'ALL AID IS NEED-BASED',
      figureCaption: 'What an endowed scholarship is designed to cover',
      figureNote2:
        'Published donor gift levels and their projected annual distributions — design targets, not awards actually granted.',
      ladder: [
        { gift: '$220K', share: 25, detail: 'of tuition · $9,900/yr' },
        { gift: '$440K', share: 50, detail: 'of tuition · $19,800/yr' },
        { gift: '$660K', share: 75, detail: 'of tuition · $29,700/yr' },
        { gift: '$880K', share: 100, detail: 'of tuition · $39,600/yr' },
      ],
      figureNote:
        "Donor gift level → intended share of a student's tuition. Roughly $6,000/yr more can be attached for ancillaries — the same categories Section 02 flags as unpriced. Awarded on demonstrated need via Clarity.",
      boxes: [
        {
          title: 'No merit track',
          body: 'A family cannot apply for an academic, arts or athletic scholarship — the school does not offer one. Individual endowed funds carry published criteria (e.g. full tuition + ancillaries for an entire career; four years for a scholar-athlete; K–4 full tuition).',
        },
        {
          tag: 'NOT PUBLISHED',
          body: 'Sibling discounts · employee tuition remission · clergy/military/first-responder discounts · indexed or sliding-scale tuition · how many named scholarships are granted each year, and at what size.',
        },
      ],
      source:
        'charlottecountryday.org — Endowment & Capital Giving, retrieved 23 Jul 2026',
    },
    {
      id: 'fa-paying',
      navTitle: 'Paying the Balance',
      title: 'Paying the Balance — Plans & Contract Terms',
      confidence: 66,
      plans: [
        {
          figure: '10%',
          label: 'Enrolment deposit',
          detail:
            "Credited toward tuition — a timing obligation, not an extra charge. Aid applicants pay a **reduced, refundable** deposit if the award isn't enough to attend (amount not published).",
          emphasis: true,
        },
        {
          figure: '1×',
          label: 'Paid in full',
          detail: 'Due by 15 July. No prepayment discount published.',
        },
        {
          figure: '2×',
          label: 'Two instalments',
          detail: 'Equal payments in July and January. No fee published.',
        },
        {
          figure: '10×',
          label: 'Ten-month plan',
          detail:
            'Automatic bank draft. Whether it carries a fee or interest is not stated — absence of a published fee is not a statement that none is charged.',
        },
      ],
      boxes: [
        {
          tag: 'NOT PUBLISHED — CONTRACT TERMS',
          body: 'Late-payment policy · mid-year withdrawal obligation · plan fees or interest · third-party lenders · tuition refund insurance — these live in the enrolment contract, which is not public.',
        },
      ],
    },
    {
      id: 'fa-trend',
      navTitle: 'Trend & Questions',
      title: 'Trend, Reach & the Questions to Ask',
      confidence: 52,
      stats: [
        {
          value: '$438,840',
          label:
            "full JK–12 run at today's published rates — our arithmetic, explicitly not a projection",
        },
        { value: '$136,300', label: 'a Grades 9–12 run at 2026–27 rates' },
      ],
      boxes: [
        {
          title: 'Two years of documented rates',
          body: 'Every band moved **+5.0%** from 2025–26 to 2026–27 — a uniform increase across the table (see the Section 01 chart). Two data points don\'t make a pattern. **Aid vs tuition growth can\'t be assessed:** tuition is year-tagged, the aid figures are not.',
        },
        {
          tag: 'THE MIDDLE-INCOME QUESTION',
          body: 'Nothing is published for families above the typical aid threshold but below comfortable full payment — no sliding scale, no indexed tuition. A gap shared by most independent schools, not a finding about this one.',
        },
      ],
      questionsNote:
        'Each is unanswerable from published sources and materially affects what a family pays or receives.',
      questions: [
        'Which school year does each published aid figure describe — and is the share 20% or 21%, against which enrolment?',
        'What are this year\'s average and median awards, the range — and does any award cover full tuition?',
        'What are the dollar rates for Extended Day, enrichment, bus, tutoring, dining hall and MS PE uniforms?',
        'Does the ten-month plan carry a fee or interest, and is there a discount for paying in full?',
        'What is the withdrawal obligation mid-year, the late-payment policy, and is refund insurance offered?',
        'Is there a sibling discount or employee remission — and what is the reduced deposit for aid applicants?',
      ],
    },
  ],
  sources:
    'charlottecountryday.org — Tuition & Financial Aid, Admissions, FAQs, Endowment & Capital Giving, Parent Quick Reference (all 23 Jul 2026) · School Profiles 2024–25 & 2025–26 · IRS Form 990, EIN 56-0623935 · Axios Charlotte, 20 Mar 2024. Third-party tuition aggregators checked and excluded — none matched the school\'s own table. The school did not commission, review or approve this report.',
}

const CANNON: FinancialAidReport = {
  title: 'Tuition & Financial Aid — Deep Dive Report',
  meta: '2026–27 school year · figures as of 23 Jul 2026',
  framing: [
    {
      icon: 'info',
      title: 'Unpublished ≠ deficient.',
      body: '"Not published" flags a transparency gap — never a judgement that the aid programme is small or unwelcoming.',
    },
    {
      icon: 'clock',
      title: 'Published ≠ current.',
      body: 'Every dollar figure carries the school year it applies to. Undated school figures are flagged, not guessed.',
    },
    {
      icon: 'book',
      title: 'K–12 aid only.',
      body: 'Tuition assistance while enrolled — not college aid. Not financial advice. Roughly 81% of this series\' questions could be answered from published sources.',
    },
  ],
  sections: [
    {
      id: 'fa-tuition',
      navTitle: 'The Tuition Table',
      title: 'The Tuition Table — Price by Band',
      confidence: 92,
      figureCaption: 'Published tuition by band',
      // The school's own 2025–26 rates, recovered from Wayback snapshots of the
      // tuition page (see "… - Tuition History.md" in source-material). The
      // deep-dive report predates that retrieval and says the trend could not be
      // reached; it can, and five prior years are now on file.
      bands: [
        { label: 'Junior K', amount: 21450, prior: 20530, delta: '+4.5%' },
        { label: 'Kindergarten', amount: 22300, prior: 21340, delta: '+4.5%' },
        { label: 'Grades 1–4', amount: 26080, prior: 24960, delta: '+4.5%' },
        { label: 'Grades 5–8', amount: 29870, prior: 28580, delta: '+4.5%' },
        { label: 'Grades 9–12', amount: 32070, prior: 30690, delta: '+4.5%' },
      ],
      figureNote:
        'Five bands, priced by band rather than by individual grade. What tuition includes is not stated affirmatively. The live site publishes only current rates, but archived copies of the tuition page carry 2021–22 through 2025–26 — every band rose about 4.5% into 2026–27.',
      boxes: [{ tag: 'NOT PUBLISHED', title: 'Tuition-table specifics', body: '' }],
      bullets: [
        'New-student vs returning-student rates',
        'Half-day, part-week or partial-enrolment variants for JrK or K',
        'What tuition includes, stated affirmatively',
        'Rate history on the live site — recovered only from archived copies',
      ],
      source:
        'cannonschool.org — Tuition & Affordability, retrieved 23 Jul 2026',
    },
    {
      id: 'fa-beyond',
      navTitle: 'Beyond Tuition',
      title: 'Beyond Tuition — The Real Cost of Attendance',
      confidence: 84,
      // Cannon publishes a grade-by-grade fee schedule rather than per-division
      // ranges, so this section renders the component grid only.
      componentsTitle: 'Eleven confirmed components for a Grade 9 student — 4 unpriced',
      componentsAside: 'All-in estimate not built: ~36% unpriced > 33% threshold',
      components: [
        { label: 'Tuition — five bands, priced', status: 'priced' },
        { label: 'Required class trip · $400 (gr. 9)', status: 'priced' },
        { label: 'Student books · $300–500', status: 'priced' },
        { label: 'Personal device · $600–1,200', status: 'priced' },
        { label: 'Winterm course · $0–500', status: 'priced' },
        { label: 'AP exams · $98 per exam', status: 'priced' },
        { label: 'Bus service · $1,990 round-trip', status: 'priced' },
        { label: 'Annual dining figure · no rate', status: 'unpriced' },
        { label: 'Athletic team packs & equipment · no rate', status: 'unpriced' },
        { label: 'Arts supplies & instrument rental · no rate', status: 'unpriced' },
        { label: 'Tuition Refund Plan · no rate', status: 'unpriced' },
      ],
      componentsNote:
        'A narrow miss: the estimate is built only where at least two-thirds of components can be priced. For the Lower School the question does not arise — the 2026–27 fee document lists cost categories with no dollar figures at all, though the 2024–25 edition did price them.',
      boxes: [
        {
          title: 'Deposit, 2026–27',
          body: '**$2,000**, or **$650** for families applying for aid — both non-refundable, both applied toward tuition. Because both are credited against the bill, the deposit is not an additional cost; it is the first instalment.',
        },
        {
          title: 'Bus tariff, 2026–27',
          body: 'Round-trip $1,990 first child · $1,890 each sibling. One-way $1,270 · $1,200. Activity bus $290 per athletic season. Drop-in $12.00 daily one-way, plus a new $200 one-time annual registration fee.',
        },
      ],
      source:
        'cannonschool.org — Non-Tuition Fees and Expenses 2026–27 (PDF); Transportation page, retrieved 23 Jul 2026',
    },
    {
      id: 'fa-engine',
      navTitle: 'The Aid Engine',
      title: 'The Aid Engine — Process, Forms & Timeline',
      confidence: 90,
      timeline: [
        {
          when: '15 Feb 2026',
          detail: 'Single deadline for the 2026–27 year — application via **Clarity**',
        },
        {
          when: '1 Mar',
          detail:
            'First-round **admission** decisions for applications received by 15 Jan — aid decisions are decided separately',
        },
        {
          when: 'Not published',
          detail:
            'When an aid decision reaches a family, or whether it arrives before, with or after the admission decision',
          emphasis: true,
        },
        {
          when: 'Every year',
          detail:
            'Grants determined annually; families reapply each year through Clarity so awards reflect changed circumstances',
        },
      ],
      boxes: [
        {
          title: 'Platform & cost to apply',
          body: '**Clarity Tuition** · $65 per household, non-refundable, charged by the platform · waivers applied automatically for qualifying incomes. Flat regardless of how many children or schools. Decided by a committee of the director of financial aid, the director of business and finance, and an associate director of admission.',
        },
        {
          title: 'Divorced or separated parents',
          body: 'Both custodial and non-custodial parents must each complete a Clarity application. Remarriage creates a new family unit — step-parent income and assets are treated as relevant, though obligations to a new family are considered. Cannon will not allocate a grant proportionally between two households.',
        },
        {
          tag: 'NOT PUBLISHED',
          body: 'No appeals or reconsideration process · no mid-year change-of-circumstance policy · no release date for aid decisions. **Hazard:** the total awarded appears only in the Student Profile, a document written for college admissions offices — a family reading the financial aid page top to bottom would never encounter it.',
        },
      ],
      source:
        'cannonschool.org — Financial Aid; Financial Aid FAQs; Apply to Cannon, retrieved 23 Jul 2026',
    },
    {
      id: 'fa-merit',
      navTitle: 'Merit & Scholarships',
      title: 'Merit, Discounts & Special Programmes',
      confidence: 82,
      tag: 'ALL AID IS NEED-BASED',
      // No endowed-scholarship gift ladder is published; the section renders as
      // callout boxes plus the published grant ranges.
      figureCaption: 'Published grant ranges by band, 2026–27',
      ranges: [
        { label: 'JrK–Grade 4', min: 1000, max: 8000 },
        { label: 'Grades 5–8', min: 1000, max: 11000 },
        { label: 'Grades 9–12', min: 1000, max: 26000 },
      ],
      rangeMax: 26000,
      figureNote:
        'Scale $0–26,000. No grant covers full tuition. The school also states that maximum-grant families pay $3,000 per student per year — which does not reconcile with the $26,000 ceiling against $32,070 Grades 9–12 tuition, a difference of $6,070 rather than $3,000.',
      boxes: [
        {
          title: 'No merit track',
          body: 'On two separate pages Cannon states plainly that it offers no merit scholarships, and specifically no academic, arts or athletics scholarships. All grants are strictly need-based, and a grant is not a loan — it is not owed back to the school.',
        },
        {
          tag: 'NOT PUBLISHED',
          body: 'No sibling tuition discount · no employee remission · no clergy, military or first-responder discount · no indexed or variable tuition. The pages are silent rather than negative — silence is not a stated "no". A sibling rate *is* published for bus service ($1,890 vs $1,990 round-trip).',
        },
        {
          title: 'State programme ending',
          body: 'North Carolina Opportunity Scholarship participation concludes after 2025–26. Recipients ran 11 ($45,000) in 2020–21 to 149 ($654,168) in 2024–25; the 2025–26 figure is not published in a retrieved source.',
        },
      ],
      source:
        'cannonschool.org — Financial Aid; Admission FAQs, retrieved 23 Jul 2026',
    },
    {
      id: 'fa-paying',
      navTitle: 'Paying the Balance',
      title: 'Paying the Balance — Plans & Contract Terms',
      confidence: 79,
      plans: [
        {
          figure: '1×',
          label: 'Annual',
          detail: 'Tuition minus deposit, due 1 June. No fee published.',
        },
        {
          figure: '2×',
          label: 'Bi-annual',
          detail: 'Two equal payments due 1 June and 1 November. No fee published.',
        },
        {
          figure: '10×',
          label: 'Ten-month bank draft',
          detail:
            'Ten equal monthly payments drafted on the 5th or the 15th, June through March. **No administrative fee.**',
          emphasis: true,
        },
        {
          figure: '10×',
          label: 'Ten-month by check',
          detail:
            'Ten equal monthly payments due on the 1st, June through March. **$200** administrative fee for 2026–27, due 1 June.',
        },
      ],
      boxes: [
        {
          title: 'Card payments',
          body: 'Accepted for any plan except the ten-month bank draft. American Express, Discover, MasterCard and VISA — VISA credit cards only, no VISA debit. **3.5% convenience fee** on all card transactions.',
        },
        {
          tag: 'NOT PUBLISHED — CONTRACT TERMS',
          body: 'What a family owes on withdrawal before the year begins · what is owed on mid-year departure · whether any tuition is refundable and on what schedule · late-payment consequences · arrears and enrolment. No prepayment discount and no third-party lender is named. The Tuition Refund Plan\'s cost, and whether it is required, sit in a document that is not publicly readable.',
        },
      ],
      source: 'cannonschool.org — Tuition & Affordability, retrieved 23 Jul 2026',
    },
    {
      id: 'fa-trend',
      navTitle: 'Trend & Questions',
      title: 'Trend, Reach & the Questions to Ask',
      confidence: 68,
      stats: [
        {
          value: '$395,830',
          label:
            'full JrK–12 run at 2026–27 rates — our arithmetic, tuition only, not a projection',
        },
        { value: '$128,280', label: 'a Grades 9–12 run at 2026–27 rates' },
      ],
      boxes: [
        {
          title: 'Aid trend — two years',
          body: 'Awarded aid moved **$2,700,000 to 23% of students (2024–25)** to **$3,000,000 to 24% (2025–26)**. Tuition over the same span rose about 4.5%, so aid grew roughly in step with price.',
        },
        {
          tag: 'SIX YEARS OF RATES, FROM THE ARCHIVE',
          body: 'The live site publishes only the current year, but archived copies carry 2021–22 onward. Most bands track 2–4.5% a year, with one exception: **Grades 5–8 jumped 8.5% in 2023–24 and 7.5% in 2024–25**, well outside the pattern elsewhere in the table — worth asking about if your child is entering middle school.',
        },
        {
          tag: 'FEE TREND, 2024–25 → 2026–27',
          body: 'Senior trip $2,000 → $2,300 · sophomore trip $1,000 → $1,300 · Washington D.C. trip $1,100 → $1,200 · Grade 9 trip $500 → **$400 (down)** · AP exam, marine science trip, Chromebook fee and Grade 5 trip all unchanged.',
        },
      ],
      questionsNote:
        'Each is unanswerable from published sources and materially affects what a family pays or receives.',
      questions: [
        'Which figure governs the largest grants — the published $26,000 Grades 9–12 ceiling, or the statement that maximum-grant families pay $3,000 per student per year?',
        'What is the average grant, and the median? How many students or families receive aid?',
        'When is a financial aid decision released relative to the admission decision?',
        'Is there a process for appealing an award, and what happens if our circumstances change mid-year?',
        'What does the Tuition Refund Plan cost, and is it required?',
        'What should we budget for dining, athletic team packs, and arts supplies or instrument rental?',
        'What do Lower School activities cost? The current fee document names them without pricing them.',
        'What were the published tuition rates for each band in the last three years?',
      ],
    },
  ],
  sources:
    'cannonschool.org — Tuition & Affordability, Financial Aid, Financial Aid FAQs, Admission FAQs, Apply to Cannon, Transportation (all 23 Jul 2026) · Non-Tuition Fees and Expenses 2026–27 and 2024–25 editions (PDF) · Student Profiles 2024–25 & 2025–26 · Gratitude Report 2024–25 · IRS Form 990, EIN 56-0935064, via ProPublica · NC State Education Assistance Authority reports · Clarity Tuition help documentation. Third-party aggregators (figures from ~$10,900 to ~$30,700) checked and excluded. The school did not commission, review or approve this report.',
}

const CHARLOTTE_CHRISTIAN: FinancialAidReport = {
  title: 'Tuition & Financial Aid — Deep Dive Report',
  meta: '2026–27 school year · figures as of 23 Jul 2026',
  framing: [
    {
      icon: 'info',
      title: 'Unpublished ≠ deficient.',
      body: '"Not published" flags a transparency gap — never a judgement that the aid programme is small or unwelcoming.',
    },
    {
      icon: 'clock',
      title: 'Published ≠ current.',
      body: 'Every dollar figure carries the school year it applies to. Contract terms below are tagged 2023–24 — three years behind the tuition table.',
    },
    {
      icon: 'book',
      title: 'K–12 aid only.',
      body: 'Scholarships won by graduating seniors are college money — excluded entirely. Not financial advice.',
    },
  ],
  sections: [
    {
      id: 'fa-tuition',
      navTitle: 'Tuition by Band',
      title: 'Tuition by Price Band',
      confidence: 97,
      figureCaption: 'Published tuition by division',
      // Four consecutive years are published; the ghost bar shows 2025–26 and the
      // delta is the flat dollar increase, which lands as a different percentage
      // on each band.
      bands: [
        { label: 'Early Ed (JK–K)', amount: 21300, prior: 20350, delta: '+$950' },
        { label: 'Lower (1–4)', amount: 23295, prior: 22345, delta: '+$950' },
        { label: 'Middle (5–8)', amount: 24575, prior: 23625, delta: '+$950' },
        { label: 'Upper (9–12)', amount: 27055, prior: 26105, delta: '+$950' },
      ],
      figureNote:
        'Every band rose by the same flat $950 into 2026–27 — a dollar increase, not a percentage, so the same rise lands harder on the lowest band. Over three transitions ($850, $1,500, $950) every band rose exactly $3,300: 18.33% at Early Education against 13.89% at Upper School.',
      figureNote2:
        'Caveat: in 2023–24 the school grouped grades 1–5 and 6–8; from 2024–25 it groups 1–4 and 5–8. Grade five moved bands, so those two rows are not strictly like-for-like across that boundary.',
      boxes: [
        {
          title: 'What tuition includes — stated affirmatively',
          body: 'Unusually, the school says: daily lunch by a contracted food service · textbooks and language arts novels · instructional technology support and an assigned device (iPad gr. 5–8, MacBook Air for Upper School) · the middle and upper school two-day spiritual life retreat and field trips · caps and gowns for seniors.',
        },
      ],
      source:
        'charlottechristian.com — 2026–27 Tuition & Fees chart (PDF), retrieved 23 Jul 2026',
    },
    {
      id: 'fa-beyond',
      navTitle: 'Fees & Added Costs',
      title: 'Fees and Additional Costs',
      confidence: 93,
      // The only school of the four whose all-in estimate could be built: 14 of
      // 15 confirmed components carry a published price.
      componentsTitle: 'Fifteen confirmed components — 14 priced',
      componentsAside: 'All-in estimate built: well inside the 33% threshold',
      components: [
        { label: 'Tuition — four bands, priced', status: 'priced' },
        { label: 'Enrollment fee · $1,500 per student', status: 'priced' },
        { label: 'New family fee · $1,250 per family', status: 'priced' },
        { label: 'International student fee · $2,000/yr', status: 'priced' },
        { label: 'Tuition Protection Program · $250/yr', status: 'priced' },
        { label: 'Installment fee · $300/yr', status: 'priced' },
        { label: 'Application fee · $100 per child', status: 'priced' },
        { label: 'Extended day, 5 days · $325/mo', status: 'priced' },
        { label: 'Extended day, 3 days · $245/mo', status: 'priced' },
        { label: 'Extended day, 1 day · $125/mo', status: 'priced' },
        { label: 'Bridge care JK–K · $125/mo', status: 'priced' },
        { label: 'Daily drop-in · $50 per day', status: 'priced' },
        { label: 'Half-day early dismissal · $25 per day', status: 'priced' },
        { label: 'Late pickup · $25 per quarter hour', status: 'priced' },
        { label: 'Middle school extended day · no rate', status: 'unpriced' },
      ],
      componentsNote:
        'The enrolment fee of $1,500 per student is non-refundable but applied to the tuition balance. The $300 installment fee includes the required $250 Tuition Protection Program — a $50 difference. The school does not publish an athletics participation fee or a fine arts schedule, which is not the same as confirming no such costs exist.',
      stats: [
        { value: '$21,600', label: 'Early Education all-in, common case (JK–K)' },
        { value: '$27,355', label: 'Upper School all-in, common case (gr. 9–12)' },
      ],
      source:
        'charlottechristian.com — 2026–27 Tuition & Fees chart (PDF); Apply page, retrieved 23 Jul 2026',
    },
    {
      id: 'fa-engine',
      navTitle: 'Applying for Aid',
      title: 'Applying for Assistance — Process & Timeline',
      confidence: 96,
      timeline: [
        {
          when: '2 Feb 2026',
          detail:
            'Priority deadline for **current families** and for new **JK/K** applicants — via SSS by NAIS, school code 2318',
        },
        {
          when: '27 Feb 2026',
          detail: 'New JK and kindergarten applicants notified of awards by this date',
        },
        {
          when: '2 Mar 2026',
          detail: 'Priority deadline for new applicants, **grades 1–12**',
          emphasis: true,
        },
        {
          when: '2 Apr 2026',
          detail:
            'New grades 1–12 applicants notified by this date. Later applications still accepted, but awards are limited to funds available at each grade level',
        },
      ],
      boxes: [
        {
          title: 'A requirement unique in this series',
          body: 'Every applicant family must **also apply to the North Carolina Opportunity Scholarship Program**, a state programme whose applications open 2 February. Across the schools examined here, this is the only instance of a school conditioning its own assistance application on a parallel state application.',
        },
        {
          tag: 'DOCUMENTATION HAZARD',
          body: 'The 2026–27 instruction sheet states the documentation requirement **twice, and the two statements do not match** — one asks for the 2024 return plus the 2025 return when available and a 2025 W-2; the other asks for the 2025 return, or the 2024 return with 2025 W-2s. We decline to choose a reading; confirm with the school.',
        },
        {
          title: 'Renewal & conditions',
          body: 'Families reapply each year, and awards may be larger or smaller than the previous year as circumstances and the pool change. Awards are granted only after a student is accepted. As a member of the state independent schools athletic association, no student may receive assistance of any form in exchange for athletic participation.',
        },
      ],
      source:
        'charlottechristian.com — 2026–27 Financial Assistance How to Apply / Due Dates (PDF), retrieved 23 Jul 2026',
    },
    {
      id: 'fa-merit',
      navTitle: 'Discounts & Ceiling',
      title: 'Discounts, Remissions & the Award Ceiling',
      confidence: 80,
      tag: 'AID CAPPED AT 50% OF TUITION',
      figureCaption: 'The published 50% ceiling, by band',
      figureNote2:
        "The school states grants will not exceed 50% of tuition, to extend assistance to as many families as possible. The figures below are our arithmetic against that cap — emphatically not a typical award.",
      ladder: [
        { gift: 'Early Ed', share: 50, detail: 'ceiling · $10,650/yr' },
        { gift: 'Lower', share: 50, detail: 'ceiling · $11,647.50/yr' },
        { gift: 'Middle', share: 50, detail: 'ceiling · $12,287.50/yr' },
        { gift: 'Upper', share: 50, detail: 'ceiling · $13,527.50/yr' },
      ],
      figureNote:
        'Parents remain responsible for the balance of tuition and for all fees. No average or median award, and no reach data, is published — the ceiling is the only award figure on the public record.',
      boxes: [
        {
          title: 'Family Fellowship — a published discount',
          body: 'A **$1,500 tuition credit** for the third, fourth or fifth student enrolled from the same household. Extended day carries a separate 25% sibling rate, applied to the third student against that family\'s lowest rate.',
        },
        {
          tag: 'WITHDRAWN',
          body: 'The 2024–25 chart carried a **$200 payment-in-full credit** for new students paying within two weeks of acceptance. It does not appear on the 2026–27 chart, and no school statement explains the change.',
        },
        {
          tag: 'NOT PUBLISHED',
          body: 'Clergy, faculty and partner-school support are named in fundraising materials but not documented as programmes a family can apply to — whether they are distinct remissions or designated funding inside the general need-based programme is not published. No academic or general merit scholarship exists; athletic awards are explicitly excluded.',
        },
      ],
      source:
        'charlottechristian.com — Tuition & Financial Assistance page; 2026–27 Financial Assistance instruction sheet (PDF), retrieved 23 Jul 2026',
    },
    {
      id: 'fa-paying',
      navTitle: 'Paying & Contract',
      title: 'Paying, and the Contract',
      confidence: 92,
      plans: [
        {
          figure: '$1,500',
          label: 'Enrollment deposit',
          detail:
            'Per student, due at initial enrollment or re-enrollment. **Non-refundable**, and applied to the tuition balance.',
          emphasis: true,
        },
        {
          figure: '1×',
          label: 'Paid in full',
          detail:
            'Encouraged by the school. No prepayment discount for 2026–27 — the prior $200 credit was withdrawn.',
        },
        {
          figure: '10×',
          label: 'Ten-month plan',
          detail:
            'Payments begin in June. **$300** per student per year installment fee, which includes the required Tuition Protection Program. No interest rate is stated.',
        },
        {
          figure: '$250',
          label: 'Tuition Protection',
          detail:
            'Per student per year, recommended for families paying in full. It governs refund eligibility — and per the 2023–24 terms it is the only route to any refund at all.',
        },
      ],
      boxes: [
        {
          tag: 'CURRENCY WARNING — CONTRACT TERMS TAGGED 2023–24',
          body: 'These terms come from the 2023–24 enrollment packet, three years behind the tuition table above, and we could not confirm they are still current. As published then: **no tuition refund for any reason** without the Tuition Protection Program; with it, 90% of unused tuition refunded on withdrawal before 1 May, and **no refund after 30 April**. Withdrawal begins with written notice to the division principal.',
        },
        {
          tag: 'ARREARS, PER THE SAME 2023–24 PACKET',
          body: 'A missed payment constitutes default, and at the school\'s option all tuition and fees become immediately due. An account more than sixty days past due may result in enrollment being revoked and referral to a collection agency, with court and legal costs assumed by the responsible party.',
        },
      ],
      source:
        'charlottechristian.com — 2023–24 enrollment packet [research tier]; 2026–27 Tuition & Fees chart (PDF)',
    },
    {
      id: 'fa-trend',
      navTitle: 'Trend & Questions',
      title: 'Trend, Reach & the Questions to Ask',
      confidence: 88,
      stats: [
        {
          value: '$342,300',
          label:
            'full JK–12 run at 2026–27 rates — our arithmetic, tuition only, not a projection',
        },
        { value: '$108,220', label: 'a Grades 9–12 run at 2026–27 rates' },
      ],
      boxes: [
        {
          title: 'Four consecutive years recovered',
          body: 'The strongest tuition history of the four schools in this series. Every band rose **$850** into 2024–25, **$1,500** into 2025–26 and **$950** into 2026–27 — a flat dollar increment each time, totalling **+$3,300** per band, or 18.33% at the lowest band against 13.89% at the highest.',
        },
        {
          tag: 'THE REACH GAP',
          body: 'Section 4 is the weak point at 62%: the 50% ceiling is published, but no total awarded, no share of students, no average and no median. Gifts *received into* the assistance fund are published ($48,422 in 2020–21 falling to $23,798 in 2024–25) — but money received is not money awarded, and the two should not be read as each other.',
        },
      ],
      questionsNote:
        'Ordered by how much the answer would change a family\'s picture.',
      questions: [
        'What was the total tuition assistance awarded last year, and to how many families?',
        'What share of students receives assistance — and measured against which enrollment figure?',
        'What is the average award, and what is the median? Which of the two is the school quoting?',
        'Where does the assistance range realistically begin and end for a family in the middle?',
        'Are the 2023–24 contract terms still current, particularly the rule that the Tuition Protection Program is the only route to a refund?',
        'Are there athletics or fine arts participation costs, and what are the amounts?',
        'Is the middle school extended day rate the same as the published lower school rate?',
      ],
    },
  ],
  sources:
    'charlottechristian.com — 2026–27 and 2024–25 Tuition & Fees charts (PDF), Tuition & Financial Assistance, 2026–27 Financial Assistance How to Apply / Due Dates (PDF), Apply page, Endowment & Planned Giving, Admissions FAQ (all 23 Jul 2026) · 2023–24 enrollment packet, 2025–26 fees chart, annual reports 2022–23 & 2024–25, lower school extended day packet, IRS Forms 990 via ProPublica, MinistryWatch entry [all research tier]. Aggregators (figures ~$17,200 to $26,105) checked and excluded. The school did not commission, review or approve this report.',
}

/* ── Covenant Day ── transcribed from the school's tuition page (2026-27) and
   the 2025-2026 Tuition Payment Terms and Conditions PDF — see
   source-material/financial-aid-tuition/covenant-day/. The structural fact
   shaping the whole aid-numbers section: as a ministry of Christ Covenant
   Church (PCA), the school is IRS-exempt from filing Form 990, so no aid
   totals exist anywhere to find — a first for this roster. */
const COVENANT_DAY: FinancialAidReport = {
  title: 'Tuition & Financial Aid — Deep Dive Report',
  meta: '2026–27 school year · figures as of 15 Aug 2026',
  framing: [
    {
      icon: 'info',
      title: 'Unpublished ≠ deficient.',
      body: '"Not published" flags a transparency gap — never a judgement that the aid programme is small or unwelcoming.',
    },
    {
      icon: 'clock',
      title: 'Two years are live at once.',
      body: 'The website table shows 2026–27 while the linked payment-terms PDF shows 2025–26. Every figure here names its year; the report leads with 2026–27.',
    },
    {
      icon: 'book',
      title: 'K–12 aid only.',
      body: 'Tuition assistance while enrolled — not college aid. Not financial advice.',
    },
  ],
  sections: [
    {
      id: 'fa-tuition',
      navTitle: 'Tuition by Band',
      title: 'Tuition by Grade Level',
      confidence: 95,
      figureCaption: 'Published tuition by grade band — the lowest top rate in this comparison',
      bands: [
        { label: 'JK & K', amount: 15490, prior: 14290, delta: '+8.4%' },
        { label: 'Grades 1–5', amount: 17790, prior: 16590, delta: '+7.2%' },
        { label: 'Grades 6–8', amount: 20490, prior: 19290, delta: '+6.2%' },
        { label: 'Grades 9–12', amount: 22790, prior: 21590, delta: '+5.6%' },
      ],
      figureNote:
        'Four bands from junior kindergarten through grade 12, a $7,300 spread. The rise from 2025–26 was a flat $1,200 at every band — a dollar increase, not a percentage one, which is why the youngest band shows the steepest percent change.',
      figureNote2:
        'The school states what tuition includes — on-campus computers/iPads, technology expenses, school retreats and required field trips, science lab and elective fees, and most athletic expenses — an inclusions list several peers do not publish.',
      source:
        'covenantday.org — Tuition & Financial Aid (2026-27 table); 2025-2026 Tuition Payment Terms and Conditions PDF, retrieved 15 Aug 2026',
    },
    {
      id: 'fa-beyond',
      navTitle: 'Fees & Added Costs',
      title: 'Fees and Additional Costs',
      confidence: 85,
      componentsTitle: 'A short, mostly-priced list',
      components: [
        { label: 'Enrollment deposit · $1,000, credited to tuition', status: 'priced' },
        { label: 'FACTS monthly-plan fee · $50/yr', status: 'priced' },
        { label: 'Card-processing fee · 3.05% of payment', status: 'priced' },
        { label: 'Extended Day (JK–8) · $58–$248/mo per session', status: 'priced' },
        { label: 'Laptop, grades 9–12 · bring your own', status: 'unpriced' },
        { label: 'Tutoring / special testing beyond classroom help', status: 'unpriced' },
        { label: 'Uniform (JK–8) / HS dress code', status: 'unpriced' },
      ],
      componentsNote:
        'The inclusions list does real work here: retreats, required field trips, lab and elective fees, and most athletic expenses sit inside tuition, so the priced add-ons are genuinely few. Grades 9–12 must supply a laptop meeting the school’s specs.',
      boxes: [
        {
          title: 'The deposit is aid-aware',
          body: 'The $1,000 per-student deposit is non-refundable and credited to tuition — and families who submit a completed aid application before enrolling may ask the Business Office to **halve it** while the application is considered. Waiting for an aid decision without paying the deposit, though, means no seat is held.',
        },
      ],
      source:
        '2025-2026 Tuition Payment Terms and Conditions PDF; covenantday.org — Tuition & Financial Aid, retrieved 15 Aug 2026',
    },
    {
      id: 'fa-engine',
      navTitle: 'The Aid Engine',
      title: 'Aid Process and Timeline',
      confidence: 80,
      timeline: [
        {
          when: 'With admission',
          detail: 'Families submit the aid application **concurrently with the admissions application**, through FACTS — the same platform that runs tuition billing',
        },
        {
          when: 'Prerequisite',
          detail: 'Proof of application for the **NC Opportunity Scholarship** is mandatory before any CDS aid is considered — a hard gate no peer school here imposes',
          emphasis: true,
        },
        {
          when: 'On completion',
          detail: 'Decisions are communicated only once an application is complete, including all supporting documentation',
        },
        {
          when: 'Every year',
          detail: 'No multi-year award — families submit a new application each year',
        },
      ],
      boxes: [
        {
          title: 'Platform & scope',
          body: '**FACTS** runs the confidential need assessment. Aid is need-based only, and only the party responsible for paying tuition may apply. Contact: Christen Marshall, Student Accounts Coordinator, 704-708-6102.',
        },
        {
          tag: 'NOT PUBLISHED',
          body: 'No aid deadline date, no decision timeline, no appeals process, and no award-ceiling policy appears on the public record. The application fee for FACTS, if any, is also unstated.',
        },
      ],
      source:
        'covenantday.org — Tuition & Financial Aid; 2025-2026 Tuition Payment Terms §6, retrieved 15 Aug 2026',
    },
    {
      id: 'fa-numbers',
      navTitle: 'Aid in Numbers',
      title: 'What the Numbers Disclose',
      confidence: 25,
      stats: [
        { value: '~20%', label: 'of students on aid — third-party figure only' },
        { value: 'No 990', label: 'church ministry — IRS-exempt from filing' },
        { value: '$0', label: 'published aid totals, averages, or budgets' },
      ],
      figureNote:
        'The ~20% share comes from aggregators (PrivateSchoolReview, schooltuitions.org); the school itself publishes no percentage, no total awarded, and no average award.',
      boxes: [
        {
          tag: 'NOT PUBLISHED — AND NOT RECOVERABLE',
          body: 'Covenant Day is a ministry of Christ Covenant Church (PCA), and the IRS designates it a **religious organization not required to file Form 990** (EIN 56-1656570, exempt since 1989). ProPublica’s Nonprofit Explorer confirms no filing exists. Every other school in this project is a 990 filer whose aid totals can be checked against its return — here there is **no filing to check**, so the gap is structural rather than a page waiting to be found.',
        },
      ],
      source:
        'projects.propublica.org — Nonprofit Explorer, EIN 56-1656570; privateschoolreview.com; schooltuitions.org, retrieved 15 Aug 2026',
    },
    {
      id: 'fa-merit',
      navTitle: 'Discounts & State Aid',
      title: 'Merit, Discounts & State Scholarships',
      confidence: 88,
      tag: 'ALL SCHOOL AID IS NEED-BASED',
      plans: [
        {
          figure: '$1,500',
          label: 'Multi-child discount',
          detail: 'Off tuition for the **third and each additional student** from the same household, applied to the children in the lowest grades. Two-child families get nothing.',
        },
        {
          figure: '$400',
          label: 'Christ Covenant Church member discount',
          detail: 'Per enrolled student, for members of the sponsoring church — membership affirmed during online enrollment, with a February 1 cutoff for full-year eligibility.',
        },
        {
          figure: 'NC',
          label: 'Opportunity Scholarship + ESA+',
          detail: 'The school accepts both NCSEAA-administered programs — and applying for the Opportunity Scholarship is a **prerequisite** for CDS aid, so state aid is the designed first layer of every package.',
          emphasis: true,
        },
      ],
      boxes: [
        {
          tag: 'NOT PUBLISHED',
          body: 'No merit scholarships exist on the public record — aid is need-based only. No sibling discount before the third child, no military or clergy discount, and no employee-remission policy is published.',
        },
      ],
      source:
        '2025-2026 Tuition Payment Terms §3; covenantday.org — Tuition & Financial Aid, retrieved 15 Aug 2026',
    },
    {
      id: 'fa-paying',
      navTitle: 'Paying the Balance',
      title: 'Payment Plans & Contract Terms',
      confidence: 92,
      plans: [
        {
          figure: '1×',
          label: 'Annual plan',
          detail: 'The full balance due by **May 1** preceding the school year. No prepayment discount is published.',
        },
        {
          figure: '9×',
          label: 'Monthly plan (FACTS)',
          detail: 'Nine equal installments, **May through January**, autopaying on the 5th or 20th — plus a $50/year FACTS fee. Note the season: payments start four months before school does.',
          emphasis: true,
        },
        {
          figure: '3.05%',
          label: 'Card surcharge',
          detail: 'Debit/credit payments incur a 3.05% processor fee; bank drafts avoid it. On a $22,790 tuition that is roughly $695.',
        },
        {
          figure: '10th',
          label: 'Withdrawal cutoff',
          detail: 'Withdrawals must be official by the 10th of the month to skip that month’s installment; refunds equal installments whose due date has not passed. Monthly-plan families current on payments get no refund and owe no more.',
        },
      ],
      boxes: [
        {
          title: 'Non-current accounts',
          body: 'Accounts more than 30 days past due can suspend re-enrollment, report cards, transcript release — and class access. A standard force-majeure clause keeps tuition obligations alive through closures.',
        },
      ],
      source: '2025-2026 Tuition Payment Terms §§1–2, 7–8, retrieved 15 Aug 2026',
    },
    {
      id: 'fa-trend',
      navTitle: 'Trend & Questions',
      title: 'The Trend, and What to Ask',
      confidence: 60,
      stats: [
        { value: '+$1,200', label: 'flat increase at every band, 2025–26 → 2026–27' },
        { value: '$22,790', label: 'top band — the lowest top tuition in this comparison' },
        { value: '2 yrs', label: 'of published rates (website + terms PDF)' },
      ],
      questionsTitle: 'Questions the public record cannot answer',
      questions: [
        'What share of families receive aid, and what is the average award? (The ~20% figure is third-party.)',
        'What is the aid application deadline, and when are decisions released relative to enrollment contracts?',
        'How does the mandatory NC Opportunity Scholarship application interact with CDS aid for families above the state income cap?',
        'Is there an appeals or mid-year change-of-circumstance process?',
        'Was the flat-$1,200 increase a one-year choice or the standing pattern?',
      ],
      source: 'Synthesis of the sources cited on the sections above',
    },
  ],
  sources:
    'covenantday.org — Tuition & Financial Aid · 2025-2026 Tuition Payment Terms and Conditions (PDF) · ProPublica Nonprofit Explorer (EIN 56-1656570) · privateschoolreview.com · schooltuitions.org — retrieved 15 Aug 2026',
}

const DAVIDSON_DAY: FinancialAidReport = {
  title: 'Tuition & Financial Aid — Deep Dive Report',
  meta: '2026–27 school year · figures as of 22 Jul 2026',
  framing: [
    {
      icon: 'info',
      title: 'Unpublished ≠ deficient.',
      body: '"Not published" flags a transparency gap — never a judgement that the aid programme is small or unwelcoming.',
    },
    {
      icon: 'clock',
      title: 'Published ≠ current.',
      body: 'The current-year table overwrites the previous one, so no rate history is recoverable. Undated figures are flagged, not guessed.',
    },
    {
      icon: 'book',
      title: 'K–12 aid only.',
      body: 'Tuition assistance while enrolled — not college aid. Not financial advice.',
    },
  ],
  sections: [
    {
      id: 'fa-tuition',
      navTitle: 'Tuition by Division',
      title: 'Tuition by Grade Level',
      confidence: 90,
      figureCaption: 'Published tuition by division',
      // 2025–26 rates recovered from Wayback (see "… - Tuition History.md" in
      // source-material). The Early Childhood prior-year figure is the FULL-TIME
      // price: through 2025–26 the band was six priced options (half-day from
      // $12,290), collapsing to a single row for 2026–27. Charting the current
      // row against the discontinued half-day price would invent an ~84% rise.
      bands: [
        { label: 'Early Childhood', amount: 22590, prior: 21620, delta: '+4.5%' },
        { label: 'Lower (K–4)', amount: 25010, prior: 23930, delta: '+4.5%' },
        { label: 'Middle (5–8)', amount: 26320, prior: 25190, delta: '+4.5%' },
        { label: 'Upper (9–12)', amount: 26910, prior: 25750, delta: '+4.5%' },
      ],
      figureNote:
        'Four division bands covering ages two through 12th grade, a $4,320 spread from lowest to highest. The school does not publish rate history, but archived copies of the tuition page carry 2022–23 onward — every division has risen about 4.5% a year since 2023–24. Half-day options, new-vs-returning rates, and what tuition includes are all unpublished.',
      figureNote2:
        'The Early Childhood bar compares full-time rates only. Through 2025–26 that band was six separately priced options (half-day from $12,290); for 2026–27 it collapsed to one row, so anything but the full-time figure would be a false comparison.',
      source:
        'davidsonday.org — Tuition and Affordability (published 9 Apr 2026), retrieved 22 Jul 2026',
    },
    {
      id: 'fa-beyond',
      navTitle: 'Fees & Added Costs',
      title: 'Fees and Additional Costs',
      confidence: 70,
      componentsTitle: 'Roughly a dozen components — only 5 priced',
      componentsAside: 'All-in estimate not built: too few parts priced',
      components: [
        { label: 'Refund Plan fee · 2.8% of tuition', status: 'priced' },
        { label: 'Yearbook · $75', status: 'priced' },
        { label: 'Technology, gr. 7–12 · $500', status: 'priced' },
        { label: 'Field Experience, gr. 4–12 · $500–1,000', status: 'range' },
        { label: 'Textbooks, gr. 7–12 · $300–1,000', status: 'range' },
        { label: 'Extended care · no rate', status: 'unpriced' },
        { label: 'Lunch · no rate on the public site', status: 'unpriced' },
        { label: 'Athletics team packs & equipment · no rate', status: 'unpriced' },
        { label: 'Arts supplies & instruments · no rate', status: 'unpriced' },
        { label: 'Summer programmes · no rate', status: 'unpriced' },
        { label: 'Admission application fee · no amount', status: 'unpriced' },
        { label: 'Current enrollment deposit · no amount', status: 'unpriced' },
      ],
      componentsNote:
        'A range built mostly from missing parts would look authoritative and mislead, so we have not built one. Extended care, athletics and arts are the notable gaps — all three are also named in the aid exclusions, so they are confirmed real costs a family pays on top of an award.',
      boxes: [
        {
          tag: 'NOT PUBLISHED — THE DEPOSIT',
          body: 'The deposit was **$2,400 per student for 2022–23**; the current amount is not published. The school states only that it appears inside each family\'s Enrollment Tuition Contract, behind the family portal, and is drafted immediately by bank transfer once the contract is signed. Refundability is not published either.',
        },
        {
          title: 'Uniforms & transportation',
          body: 'Uniforms are required (Early Preschool exempt); families buy from general retailers with the logo applied by a local vendor, so garment prices are set by vendors and not published by the school as a fee. No school-provided busing or transportation charge was found — most likely because none is offered rather than a price being withheld.',
        },
      ],
      source:
        'davidsonday.org — Tuition and Affordability; deposit, enrollment, extended care and back-to-school pages, retrieved 22 Jul 2026',
    },
    {
      id: 'fa-engine',
      navTitle: 'The Aid Engine',
      title: 'Aid Process and Timeline',
      confidence: 85,
      timeline: [
        {
          when: '15 Feb',
          detail:
            'Single deadline, recurring every year — application via **Clarity**, with a Form 4506c so tax returns pull in directly',
        },
        {
          when: 'Early Mar',
          detail:
            'A Financial Aid Committee meets, then on a rolling basis, working from qualification guidance supplied by Clarity',
        },
        {
          when: 'With contracts',
          detail:
            'The award appears inside the Enrollment Tuition Contract — families review and sign within two weeks of receipt',
          emphasis: true,
        },
        {
          when: 'Every year',
          detail:
            'There is no multi-year award; families reapply annually and the 15 February deadline recurs',
        },
      ],
      boxes: [
        {
          title: 'Platform & cost to apply',
          body: '**Clarity Financial Aid** · **$60** charged on submission (2025–26 cycle guide). Families create a new Clarity account the first time they use the system. Aid is an award, not a loan — it is not repaid. Late applications are processed if funds remain.',
        },
        {
          title: 'Divorced or separated parents',
          body: 'Each parent is expected to complete a Clarity application and supply tax returns. The only stated exception is a divorce agreement assigning sole responsibility for educational expenses to one parent.',
        },
        {
          tag: 'NOT PUBLISHED',
          body: 'No appeals or reconsideration process · no mid-year change-of-circumstance policy · no public position on whether admission is need-blind or need-aware · the committee\'s composition. **Hazard:** retired aid pages still in search results describe Acclaim as being for rising 8th-graders and Wolter for rising 9th-graders in 2025–26 — the current live page says Class of 2030 and Upper School applicants.',
        },
      ],
      source:
        'davidsonday.org — Tuition and Affordability; Clarity family application guide (2025–26), retrieved 22 Jul 2026',
    },
    {
      id: 'fa-merit',
      navTitle: 'Scholarships',
      title: 'Merit, Scholarships & Discounts',
      confidence: 78,
      tag: 'BOTH SCHOLARSHIPS REQUIRE NEED',
      // Davidson Day is the only school of the four with named scholarships
      // carrying a published share of tuition, so the ladder is repurposed to
      // show coverage rather than donor gift levels.
      figureCaption: 'What each named scholarship covers',
      figureNote2:
        'Neither is a pure merit award sitting on top of a need-based package — qualifying for need-based assistance is a precondition for each.',
      ladder: [
        {
          gift: 'Acclaim',
          share: 90,
          detail: 'of tuition through graduation · Class of 2030',
        },
        {
          gift: 'Wolter',
          share: 98,
          detail: 'all but $500 of annual tuition · Upper School',
        },
      ],
      figureNote:
        'Acclaim Scholars marks the school\'s 25th anniversary and expects a strong academic profile and exemplary character. The Wolter Family Foundation Scholarship is externally funded by a Cornelius-based family foundation and asks for strong recommendations and significant demonstrated need. Both are contingent on the student remaining in good standing.',
      boxes: [
        {
          tag: 'NOT PUBLISHED — THE AWARD CEILING\'S ARITHMETIC',
          body: 'The school states no award covers full tuition and that maximum-award families pay **$3,000 per year, per student** (2026–27). Against published tuition that implies ceilings of $19,590 (Early Childhood) to $23,910 (Upper School) — our arithmetic, not a school figure. No share of students on aid, total aid budget, average or median award is published at all.',
        },
        {
          tag: 'NOT PUBLISHED — DISCOUNTS',
          body: 'No sibling, military or clergy discount is published, and no indexed or sliding-scale tuition. The school runs a separate enrollment process and an eleven-month plan for employee parents, but whether any tuition remission accompanies employment is not on the public record. How many scholarships are granted each year, and their renewal criteria beyond "good standing," are also unpublished.',
        },
      ],
      source:
        'davidsonday.org — Tuition and Affordability (published 9 Apr 2026), retrieved 22 Jul 2026',
    },
    {
      id: 'fa-paying',
      navTitle: 'Paying the Balance',
      title: 'Payment Plans & Contract Terms',
      confidence: 55,
      plans: [
        {
          figure: '11×',
          label: 'Eleven-month plan',
          detail:
            'An eleven-month plan exists; instalment due dates are not published. Employee-facing materials carry a Truth in Lending disclosure putting the additional cost of paying monthly at **$0** — but no equivalent statement is published for general families.',
          emphasis: true,
        },
        {
          figure: '2.8%',
          label: 'Refund Plan fee',
          detail:
            'Of tuition, 2026–27 — without stating whether it is required or elective. On Upper School tuition of $26,910 that is a meaningful sum the public record does not resolve.',
        },
        {
          figure: '2 wk',
          label: 'Contract signing window',
          detail:
            'Both parents log into the family portal under their own email addresses, select a payment option, initial to authorise drafting, and sign. The deposit is drafted immediately once submitted.',
        },
        {
          figure: '—',
          label: 'Full menu not published',
          detail:
            'Whether annual, semi-annual and monthly are all offered, and on what terms, is presented inside each family\'s contract rather than published. No prepayment discount; no external tuition lender is named — billing is handled in-house.',
        },
      ],
      boxes: [
        {
          tag: 'NOT PUBLISHED — CONTRACT TERMS',
          body: 'Deposit refundability · a family\'s financial obligation on withdrawal or mid-year departure. These terms live in the Enrollment Tuition Contract, which is issued to enrolling families through the portal and is not publicly available.',
        },
      ],
      source:
        'davidsonday.org — enrollment instructions, employee-parent enrollment instructions and deposit instructions, retrieved 22 Jul 2026',
    },
    {
      id: 'fa-trend',
      navTitle: 'Trend & Questions',
      title: 'Trend, Reach & the Questions to Ask',
      confidence: 50,
      stats: [
        {
          value: '$337,970',
          label:
            'full K–12 run at 2026–27 rates — our arithmetic, tuition only, not a projection',
        },
        { value: '$107,640', label: 'a Grades 9–12 run at 2026–27 rates' },
      ],
      boxes: [
        {
          tag: 'FOUR YEARS, FROM THE ARCHIVE',
          body: 'The school publishes no rate history — the current-year table overwrites the previous one — but archived copies carry 2022–23 onward. Every division has risen a near-flat **~4.5% a year** since 2023–24, one of the steadiest patterns in this series. Early Childhood years are excluded from the run above because the number of years a child spends in that band varies.',
        },
        {
          tag: 'A COMPARISON TRAP IN THE EARLY YEARS',
          body: 'The Early Childhood band was **restructured**, not merely repriced: six separately priced options through 2025–26 (half-day from $12,290) became a single row for 2026–27. Comparing the current row against the old half-day price would suggest an ~84% increase that never happened. The Section 01 chart compares full-time rates only.',
        },
        {
          tag: 'A THIRD-PARTY FIGURE, NOT A SCHOOL ONE',
          body: 'A commercial service that digitises Form 990 filings reports **$742,270** in grants and assistance to individuals for the fiscal year ending June 2024. We could not open the filed return to verify it, it sits two years behind the 2026–27 year, and it is not a school-published aid budget. It should not be read as one.',
        },
      ],
      questionsNote:
        'Each is unanswerable from published sources and materially affects what a family pays or receives.',
      questions: [
        'What share of students receive tuition assistance, and is that share of total enrollment or of families who applied?',
        'What is the total aid budget this year, and what is the average award?',
        'Is the 2.8% Refund Plan fee required, or can we decline it?',
        'What is the current enrollment deposit, and under what conditions is it refundable?',
        'What do we owe if we withdraw mid-year?',
        'What do extended care, lunch, athletics team packs and arts materials cost per year?',
        'Are admission decisions made with or without reference to our aid application?',
        'What have tuition rates been for each of the last five years?',
      ],
    },
  ],
  sources:
    'davidsonday.org — Tuition and Affordability (published 9 Apr 2026), enrollment instructions, employee-parent enrollment instructions, deposit instructions, extended care and back-to-school pages (all 22 Jul 2026) · Clarity Financial Aid family application guide, 2025–26 cycle · ProPublica Nonprofit Explorer, EIN 11-1976223, Form 990 FY2019–FY2025 · Instrumentl Form 990 report (unverified third-party digitisation). Third-party listing sites disagree with one another on both tuition and enrollment and are not the source of any figure here. The school did not commission, review or approve this report.',
}

const CHARLOTTE_LATIN: FinancialAidReport = {
  title: 'Tuition & Financial Aid — Deep Dive Report',
  meta: '2026–27 school year · figures as of 24 Jul 2026',
  framing: [
    {
      icon: 'info',
      title: 'Unpublished ≠ deficient.',
      body: '"Not published" flags a transparency gap — never a judgement that the aid programme is small or unwelcoming.',
    },
    {
      icon: 'clock',
      title: 'Published ≠ current.',
      body: 'Every dollar figure carries the school year it applies to. The transport and aid-document pages sit a year behind the 2026–27 tuition table — different cycles, not a contradiction.',
    },
    {
      icon: 'book',
      title: 'K–12 aid only.',
      body: 'Tuition assistance toward attending this school — not the FAFSA, CSS Profile or college merit money. Not financial advice. Roughly 75% of this series\' questions could be answered from published sources.',
    },
  ],
  sections: [
    {
      id: 'fa-tuition',
      navTitle: 'The Tuition Table',
      title: 'The Tuition Table — Price by Band',
      confidence: 95,
      figureCaption: 'Published tuition by band, 2026–27',
      // No `prior` on any band: unlike Country Day, Cannon and Davidson Day,
      // no tuition-history file exists for Latin. The deep-dive states the web
      // archive could not be reached across repeated attempts, so there are no
      // school-published 2022–23 through 2025–26 rates to ghost against. Third-
      // party summaries of past tuition exist but disagree with one another and
      // are deliberately not used. See the Section 07 note.
      bands: [
        { label: 'TK & Kindergarten', amount: 27600 },
        { label: 'Grades 1–5', amount: 32600 },
        { label: 'Grades 6–8', amount: 35200 },
        { label: 'Grades 9–12', amount: 36500 },
      ],
      figureNote:
        'Four bands cover the full stated span of Transitional Kindergarten through Grade 12, so no grade is unpriced. The school labels the table "These fees are from the 2026-27 school year." Tuition includes most course and laboratory fees; textbooks are included in TK–5 but are an additional expense in grades 6–12, and that amount is not published.',
      figureNote2:
        'No prior-year bars: the school\'s live page shows only the current year and the archived copies could not be retrieved — a limit of our toolchain, not a school gap. Enrolment context: 1,555 students total, 586 in the Upper School (2025–26 Upper School Profile).',
      source:
        'charlottelatin.org — Tuition & Financial Assistance; Upper School Profile 2025–26, retrieved 24 Jul 2026',
    },
    {
      id: 'fa-beyond',
      navTitle: 'Beyond Tuition',
      title: 'Beyond Tuition — The Real Cost of Attendance',
      confidence: 72,
      componentsTitle: 'Fourteen confirmed components for a 2026–27 family — 8 unpriced or a year behind',
      componentsAside: 'All-in estimate not built: 57% unpriced > 33% threshold',
      components: [
        { label: 'Tuition — four bands, priced', status: 'priced' },
        { label: 'Enrolment deposit · $2,500, non-refundable', status: 'priced' },
        { label: 'Class trip advance · up to $710 (gr. 5–8, 12)', status: 'priced' },
        { label: 'Student accident insurance · $75, optional', status: 'priced' },
        { label: 'Tuition Refund Plan · 0.53% of tuition, optional', status: 'priced' },
        { label: "Hawks' Club extended day · priced, TK–5 only", status: 'priced' },
        { label: 'Bus service · 2025–26 rates only', status: 'range' },
        { label: 'Textbooks, grades 6–12 · no rate', status: 'unpriced' },
        { label: 'Meals · no price list', status: 'unpriced' },
        { label: 'Athletics participation · no rate', status: 'unpriced' },
        { label: 'School trips beyond the class-trip advance · no rate', status: 'unpriced' },
        { label: 'Enrichment programmes · no rate', status: 'unpriced' },
        { label: 'Talons youth sports · no rate', status: 'unpriced' },
        { label: 'Lower School uniforms · supplier purchase, no amount', status: 'unpriced' },
      ],
      componentsNote:
        'Six components are priced at 2026–27. The rest are unpriced or published only at 2025–26 rates. The school\'s own strategic plan confirms these charges are real: families "often arrive with tuition assistance but are unprepared for the additional costs … including the costs of athletics, school trips, and other activities."',
      boxes: [
        {
          title: 'Bus service — a year behind the tuition table',
          body: 'Round trip **$1,800** · one way **$900** · activity bus **$450** per season. The fee panel is headed "Bus Service Annual Fees 2025-26" while the tuition page has moved to 2026–27, so a family budgeting for next year cannot price the bus from the website.',
        },
        {
          title: "Hawks' Club — two rates break their own pattern",
          body: 'Per-semester, TK–5, 2026–27. Three of five rows scale exactly with their own one-day rate; two do not. TK/K 1:30–4:30 p.m.: $635/day implies $2,540 for four days, but the table prints **$2300**. Grades 1–5 2:55–4:30 p.m.: $295/day implies $1,180 for four days, but the table prints **$1,880**. Reproduced exactly as published rather than corrected — confirm both with the business office.',
        },
        {
          tag: 'NO PUBLISHED EVIDENCE — TREATED AS NOT CHARGED',
          body: 'General activity, technology, facilities, new-family and graduation fees · arts, instrument or production fees · testing fees · a required device purchase · a costed summer coursework requirement. Silence on a fee schedule most likely means the charge does not apply, but confirm rather than assume.',
        },
        {
          tag: 'THE SCHOOL INTENDS TO ANSWER THIS ITSELF',
          body: 'Goal 5.1 of the published strategic plan commits the school to "conduct a comprehensive audit of the full costs of a Latin education, including tuition, trips, extracurricular programs, and out of school experiences." A family asking these questions is asking for something the school has already said it wants to produce.',
        },
      ],
      source:
        'charlottelatin.org — Tuition & Financial Assistance; Transportation; Hawks\' Club; Dining; Charlotte Latin Strategic Plan, "Access and Affordability", retrieved 24 Jul 2026',
    },
    {
      id: 'fa-engine',
      navTitle: 'The Aid Engine',
      title: 'The Aid Engine — Process, Forms & Timeline',
      confidence: 86,
      note: 'platform, dates, method and decision-maker are all published',
      timeline: [
        { when: '15 Sep', detail: 'Financial aid application process **opens**' },
        {
          when: '15 Jan',
          detail:
            'Priority round deadline — stated as **15 January 2027** for the next cycle. Applications in by this date are considered for priority decisions',
          emphasis: true,
        },
        {
          when: 'Not published',
          detail:
            'When awards are released relative to the admission decision, or whether a family will know their award before an enrolment contract is due',
        },
        {
          when: 'Not retrieved',
          detail:
            'Whether aid must be reapplied for annually — very likely inside the document library below, which could not be opened',
        },
      ],
      boxes: [
        {
          title: 'Platform & how a family applies',
          body: '**Clarity.** One application covers all children in a family. Designed for a phone and stated to take **30 minutes or less**, with progress saved and resumed. Federal 1040 and W2 documents transfer automatically from the IRS after a verification step. The family application guide and platform quick-reference are published in **English and Spanish**.',
        },
        {
          title: 'How need is determined, and who decides',
          body: 'The school defines need plainly: "the difference between tuition and the family\'s ability to pay for tuition." It states it "strives to cover 100% of the identified family\'s need" — an aim, not a guarantee, and not read here as a promise of any particular award. A **Financial Aid Committee** conducts the review and decision.',
        },
        {
          title: 'Need-blind',
          body: 'The published financial aid questions-and-answers document states an applying family can expect "**a need-blind decision**" — the clearest available statement that applying for aid is described as not affecting the admission decision.',
        },
        {
          tag: 'NOT RETRIEVED — THE AID DOCUMENT LIBRARY',
          body: 'Nine financial aid documents are published — guiding principles, commonly-asked questions, scholarships, the Clarity guides in English and Spanish, and a non-custodial parent waiver form. All sit on a third-party document service our tools could not open; only each summary line was readable. **These are public and open fine in an ordinary browser.** The renewal policy, appeals process and mid-year change-of-circumstance policy are very likely inside them, and are recorded as not retrieved rather than not published.',
        },
        {
          tag: 'NOT PUBLISHED',
          body: 'What it costs a family to file (aid platforms commonly charge a fee; the pages do not say whether one applies) · when aid decisions arrive relative to admission decisions · the confidentiality policy — who inside the school sees a family\'s financial information, and how long it is retained.',
        },
        {
          tag: 'RESEARCH PASS, NOT RE-RETRIEVED',
          body: 'The 2024–25 financial aid process presentation describes the mechanism in more detail: the platform produces an Estimated Family Contribution, demonstrated need is published tuition minus that contribution, and a Financial Aid Committee decides. It names **School and Student Services** as the 2024–25 platform against **Clarity** today — a change of platform between years, not a contradiction. Surfaced through a research pass and not re-read at the source.',
        },
      ],
      source:
        'charlottelatin.org — Tuition & Financial Assistance; Policies, Procedures and Documents, retrieved 24 Jul 2026',
    },
    {
      id: 'fa-numbers',
      navTitle: 'The Aid Numbers',
      title: 'The Aid Numbers — How Much, To Whom, How Far',
      confidence: 80,
      note: 'unusually full disclosure for a public page',
      stats: [
        { value: '$3.25M', label: 'total financial aid awarded (2024–25)' },
        { value: '6%', label: 'of the total operational budget (2024–25)' },
        { value: '$17,900', label: 'average award (2024–25) — an average, not a median' },
        { value: '14%', label: 'of students receiving some funding — no year stated' },
        { value: '36', label: 'students holding awards from 17 endowed scholarships (2024–25)' },
      ],
      boxes: [
        {
          title: 'What is published, and where',
          body: 'Total awarded **$3.25M**, aid as **6%** of operational budget, average award **$17,900**, and **36 students across 17 endowed scholarships** — all 2024–25, all on the tuition page. Separately: **$3.125M** offered in 2021–22 (strategic plan) and an undated "over three million dollars" (policies page). These are not added together and are not a trend — different pages, different years, and in one case no year at all.',
        },
        {
          tag: 'THE PARTICIPATION SHARE CARRIES A DENOMINATOR BUT NO YEAR',
          body: 'The measure most families look for first **is** published — but on the strategic-plan site, a separate web property from admissions, as "14% of students receiving some funding." The denominator is clear and it is the right one: a share of **students**, not of applicants or filers, which are different and usually larger-looking numbers. The year is not. The sentence sits beside a figure tagged 2021–22, but adjacency is not a year tag and is not treated as one here.',
        },
        {
          tag: 'NOT PUBLISHED',
          body: 'The **median** award — the published $17,900 average must not be read as a typical or middle award · the award range, smallest to largest · whether any need-based award covers full tuition · how many students or families receive need-based aid overall (the count of 36 is endowed scholarships only).',
        },
        {
          tag: 'WHY THE AVERAGE AWARD IS NOT SHOWN AS A SHARE OF TUITION',
          body: 'We normally divide the average award by the same year\'s tuition to show how far a typical award reaches. The average is published for **2024–25**; the tuition table has moved to **2026–27**; and the 2024–25 published rates could not be retrieved. Dividing across those years would produce a figure describing no actual year, so it is left out rather than printed precise and meaningless.',
        },
        {
          title: 'Supplemental support',
          body: 'Beyond tuition assistance, the school states that for its **highest-need families** it also covers supplemental support for school essentials, **including lunch**. The scope beyond lunch, and the threshold at which a family qualifies, are not published.',
        },
        {
          tag: 'HOW TO READ THE 990 FIGURE',
          body: 'Charlotte Latin Schools Inc, EIN 56-0944449, FY ending June 2024: grants to domestic individuals **$3.0M**, total revenue $55.7M, total expenses $55.1M. This is aggregate institutional accounting filed with the IRS, not a school statement about its aid programme — it runs one to two years behind the current school year and its definition of a grant need not match what the school counts as tuition assistance. Context only; it does not close the gaps above.',
        },
      ],
      source:
        'charlottelatin.org — Tuition & Financial Assistance; Policies, Procedures and Documents; Charlotte Latin Strategic Plan, "Access and Affordability"; IRS Form 990 via ProPublica, retrieved 24 Jul 2026',
    },
    {
      id: 'fa-merit',
      navTitle: 'Merit & Scholarships',
      title: 'Merit, Discounts & Special Programmes',
      confidence: 78,
      tag: "NORTH CAROLINA'S ONLY MALONE SCHOLARS SCHOOL",
      boxes: [
        {
          title: 'The Malone Scholars programme',
          body: 'Charlotte Latin states it is the **only Malone Scholars School in North Carolina**, endowed by the Malone Family Foundation to provide scholarships to highly capable students. The foundation\'s published basis for selecting its fifty partner schools nationally: academic calibre, quality of staff, accommodations for gifted and talented students, strong Advanced Placement and enrichment programmes, attention to individual student needs, and an economically, culturally, ethnically and socially diverse population.',
        },
        {
          title: 'Named funds that reach beyond tuition',
          body: 'The scholarships document states that the **Malone, Sunny, Thrive, Wall and Kearney** scholarships cover additional school expenses **beyond tuition**, that they are Middle and Upper School awards, and that they are made **at the time of admission**. That is a meaningful distinction: a scholarship reaching costs beyond tuition addresses precisely the gap Section 02 describes. (Document summary only — the body could not be opened.)',
        },
        {
          tag: 'NOT PUBLISHED — SIZES, CRITERIA AND STACKING',
          body: 'For each named fund the public record does not state the award amount, how many are awarded in a year, the eligibility criteria, or whether a scholarship can be held alongside need-based aid. The one quantitative anchor is that **36 students held awards from 17 endowed scholarships in 2024–25** — a reach figure, not an award size. Ask which scholarships an applicant would be considered for, whether consideration is automatic, and whether an award reduces need-based aid.',
        },
        {
          tag: 'NOT PUBLISHED — DISCOUNTS',
          body: 'Sibling discounts · employee tuition remission · clergy, military or first-responder discounts · an indexed or variable tuition programme · whether merit awards may be held together with need-based aid. Each is recorded as not published rather than as not offered.',
        },
        {
          tag: 'RESEARCH PASS, NOT RE-RETRIEVED',
          body: 'The endowed gifts page lists a wider set of named scholarship and award funds beyond the five above, including funds supporting Lower School students, a student-athlete fund, and an alumni-established fund. Surfaced through a research pass and not re-read at the source, so **no count of funds is stated here**. Fund names are institutional proper nouns; no recipient is named anywhere in this report.',
        },
      ],
      source:
        'charlottelatin.org — "2025-26 Scholarships" document summary; Upper School Profile 2025–26; Endowed Gifts, retrieved 24 Jul 2026',
    },
    {
      id: 'fa-paying',
      navTitle: 'Paying the Balance',
      title: 'Paying the Balance — Plans & Contract Terms',
      confidence: 68,
      plans: [
        {
          figure: '$2.5K',
          label: 'Enrolment deposit',
          detail:
            'Non-refundable, **deducted from the second tuition payment**. No student can be enrolled or re-enrolled without it (2026–27).',
          emphasis: true,
        },
        {
          figure: '2×',
          label: 'Two Payment Plan',
          detail:
            'Half of tuition due **31 May**; the balance, less the $2,500 deposit, due **30 November**.',
        },
        {
          figure: '8×',
          label: 'Monthly Payment Plan',
          detail:
            'The $2,500 deposit at enrolment, then monthly payments **May through December**. The school states there is **no fee or service charge** if payments are made on time.',
        },
      ],
      boxes: [
        {
          title: 'Late payment and arrears — published directly',
          body: 'A service charge of **1.5% per month**, which the school states as **18% annual**, is added to tuition charges not received or postmarked by their due date and to any unpaid balance. All tuition must be paid before students may attend classes following the respective due dates. Miscellaneous charges must be paid before re-enrolment is offered, report cards issued, diplomas awarded or transcripts released.',
        },
        {
          title: 'Extended-day billing',
          body: "Hawks' Club fees are billed per semester rather than with tuition: the first-semester fee (August–December) on **23 September 2026**, the second (January–May) on **20 January 2027**.",
        },
        {
          tag: 'NOT PUBLISHED — THE WITHDRAWAL OBLIGATION',
          body: 'The public pages do not set out the withdrawal or mid-year departure obligation, any refund schedule, or the point at which full-year tuition becomes payable regardless of attendance. The optional Tuition Refund Plan at 0.53% of tuition implies some obligation survives a withdrawal — that is what such plans exist to cover — but the underlying terms are not on the public record. **This is the single most consequential unpublished item in this report;** read the contract carefully before signing.',
        },
        {
          tag: 'NOT PUBLISHED',
          body: 'Third-party tuition lenders or financing partners · any prepayment or single-payment discount · any prepaid multi-year or tuition-lock programme.',
        },
      ],
      source:
        "charlottelatin.org — Tuition & Financial Assistance; Hawks' Club, retrieved 24 Jul 2026",
    },
    {
      id: 'fa-trend',
      navTitle: 'Trend & Questions',
      title: 'Trend, Reach & the Questions to Ask',
      confidence: 45,
      stats: [
        {
          value: '$469,800',
          label:
            "full TK–12 run (14 years) at 2026–27 rates — our arithmetic, tuition only, not a projection",
        },
        { value: '$146,000', label: 'a Grades 9–12 run at 2026–27 rates' },
      ],
      boxes: [
        {
          tag: 'NOT RETRIEVED — OUR LIMITATION, NOT THE SCHOOL\'S',
          body: 'A tuition page shows the current year and overwrites the last, so a multi-year trend has to come from web archive captures. Our retrieval tools could not reach the archive service across repeated attempts, in the initial pass and again in a deeper research pass, so there are **no school-published rates for 2022–23 through 2025–26**. This is a toolchain limit. It is **not** a finding that the school conceals its pricing history and should not be read as one. Third-party summaries exist but disagree with one another and none is reproduced.',
        },
        {
          title: 'Aid figures across years — two points, not a trend',
          body: '**$3.125M** offered in 2021–22 and **$3.25M** awarded in 2024–25. These sit three years apart with nothing published in between, and come from different pages that may not count identically. Two points do not make a trend, and no line is drawn between them.',
        },
        {
          tag: 'READ THE TENURE FIGURES AS ARITHMETIC, NOT A FORECAST',
          body: 'The totals above apply 2026–27 bands across a full run (2 years at $27,600; 5 at $32,600; 3 at $35,200; 4 at $36,500) as if today\'s prices held every year — which they will not, since published tuition is re-set annually and has historically risen. They are tuition only, net of nothing, and exclude the deposit, trips, insurance, transport, extended day, meals, books and every unpriced item in Section 02. They exist only to give a sense of scale.',
        },
        {
          tag: 'THE MIDDLE-INCOME QUESTION',
          body: 'The school publishes an aim to meet up to 100% of demonstrated need and a share of students receiving some funding. It publishes nothing about families above the aid threshold but below comfortable full-pay — no indexed tuition, no middle-income initiative, no guidance on where the threshold falls. A publication gap rather than a statement about who the school serves.',
        },
        {
          tag: 'TWO NAVIGATION HAZARDS',
          body: '**A stale page is still circulating.** The live tuition page gives the aid deadline as 15 January 2027, but search engines still serve cached text from the same address giving 15 January 2026. Open the page directly rather than trusting the snippet. **The contact address is misspelled in one place** — the tuition page invites inquiries at an address whose domain has two letters transposed, while the correct address appears elsewhere on the same page. Mail to the misspelled version will not arrive; use the contact panel.',
        },
      ],
      questionsNote:
        'Each is unanswerable from published sources and materially affects what a family pays or receives.',
      questions: [
        'What is the withdrawal and mid-year departure obligation, and is there a refund schedule?',
        'What does a year of school meals cost, by division, and what do textbooks cost in grades 6, 9 and 12?',
        'What are the participation costs for specific sports and activities?',
        'What are the 2026–27 bus rates?',
        'What is the current share of students receiving tuition assistance, and for which year?',
        'What is the median award, what is the range from smallest to largest, and does any award reach full tuition?',
        'For each named scholarship: the amount, how many are awarded, the criteria, and whether it can be held alongside need-based aid?',
        'Must aid be reapplied for annually, do awards typically renew at a consistent level, and is there an appeals or change-of-circumstance process?',
        "Please confirm the four-day and five-day Hawks' Club rates in the two rows flagged in Section 02.",
      ],
    },
  ],
  sources:
    'charlottelatin.org — Tuition & Financial Assistance; Policies, Procedures and Documents; Transportation; Hawks\' Club; Dining; Upper School Profile 2025–26; Endowed Gifts (all 24 Jul 2026) · charlottelatinleads.org — Strategic Plan, "Access and Affordability" (24 Jul 2026) · "2025-26 Scholarships" and "2025-26 Commonly Asked Questions about Financial Aid" (document summaries only; bodies not retrievable) · 2024–2025 financial aid process presentation (research pass, not re-retrieved) · IRS Form 990, Charlotte Latin Schools Inc, EIN 56-0944449, FY ending June 2024, via ProPublica Nonprofit Explorer. Commercial school-directory sites publish tuition figures that disagree with one another and with the school\'s own page; none is the source of any figure here. The school did not commission, review or approve this report.',
}

const PROVIDENCE_DAY: FinancialAidReport = {
  title: 'Tuition & Financial Aid — Deep Dive Report',
  meta: '2026–27 school year · figures as of 24 Jul 2026',
  framing: [
    {
      icon: 'info',
      title: 'Unpublished ≠ deficient.',
      body: '"Not published" flags a transparency gap — never a judgement that the aid programme is small or unwelcoming. The school discloses more than its tuition page suggests — the detailed figures live in the Report on Philanthropy.',
    },
    {
      icon: 'clock',
      title: 'Published ≠ current.',
      body: 'Every dollar figure carries the school year it applies to. The transportation page still refers to 2023–2024 while the tuition table has moved to 2026–27 — different cycles, not a contradiction.',
    },
    {
      icon: 'book',
      title: 'K–12 aid only.',
      body: 'Tuition assistance while enrolled — not the FAFSA, CSS Profile or college merit money the school publishes for its graduates. Not financial advice.',
    },
  ],
  sections: [
    {
      id: 'fa-tuition',
      navTitle: 'The Tuition Table',
      title: 'The Tuition Table — Price by Band',
      confidence: 95,
      figureCaption: 'Published tuition by band, 2026–27',
      // No `prior` on any band: the deep-dive states prior-year rate cards were
      // not retrieved, so there are no school-published earlier rates to ghost
      // against. Third-party listings disagree with one another and are
      // deliberately not used — see the Section 7 navigation-hazard note.
      bands: [
        { label: 'Transitional Kindergarten', amount: 25510 },
        { label: 'Kindergarten', amount: 28010 },
        { label: 'Grades 1–5', amount: 32960 },
        { label: 'Grades 6–12', amount: 36325 },
      ],
      figureNote:
        'Four bands cover all fourteen grade levels from TK through Grade 12, with no gap and no overlap — TK and Kindergarten priced individually, Grades 1–5 sharing one rate, Grades 6–12 another. Tuition includes student iPads and all technology, all textbooks (including A.P. textbooks), A.P. exam fees, most class field trips, and all Lower School student supplies — an explicit inclusion list that is the least consistently disclosed item in this series.',
      figureNote2:
        'No prior-year bars: the school\'s live page shows only the current year and is overwritten each cycle; archived rate cards could not be retrieved — a limit of the toolchain, not a school gap. The page notes tuition is subject to change for 2027–28.',
      boxes: [{ tag: 'NOT PUBLISHED', title: 'Tuition-table specifics', body: '' }],
      bullets: [
        'A per-grade breakdown within the Grades 1–5 and Grades 6–12 bands',
        'A separate rate for new versus returning students, if one exists',
        'Half-day, part-week or other Transitional Kindergarten variants',
        'A sibling-based variation on the published rate',
      ],
      source:
        'providenceday.org — Tuition and Financial Assistance, retrieved 24 Jul 2026',
    },
    {
      id: 'fa-beyond',
      navTitle: 'Beyond Tuition',
      title: 'Beyond Tuition — The Real Cost of Attendance',
      confidence: 60,
      componentsTitle: 'Fifteen confirmed components for a 2026–27 family — 11 unpriced',
      componentsAside: 'All-in estimate not built: 73% unpriced > 33% threshold',
      components: [
        { label: 'Tuition — four bands, priced', status: 'priced' },
        { label: 'Enrollment deposit · $2,500, non-refundable', status: 'priced' },
        { label: 'Clubhouse registration · $100/student/yr (MS)', status: 'priced' },
        { label: 'Extended Day late pick-up · $1/min after 6 p.m.', status: 'priced' },
        { label: 'Extended Day programme fee · schedule not retrieved', status: 'range' },
        { label: 'Bus transportation · 2023–24 page, fares not retrieved', status: 'range' },
        { label: 'FLIK Dining participation · no rate', status: 'unpriced' },
        { label: 'Extended Day enrichment classes · no rate', status: 'unpriced' },
        { label: '8th grade field trip · no rate', status: 'unpriced' },
        { label: '12th grade field trip · no rate', status: 'unpriced' },
        { label: 'Club travel · no rate', status: 'unpriced' },
        { label: 'Arts competition travel · no rate', status: 'unpriced' },
        { label: 'Athletic tournament travel · no rate', status: 'unpriced' },
        { label: 'P.E. uniforms · no rate', status: 'unpriced' },
        { label: 'Graphing calculators · no rate', status: 'unpriced' },
        { label: 'Tutoring services · no rate', status: 'unpriced' },
      ],
      componentsNote:
        'Of fifteen confirmed components, four carry a published price and eleven do not — 73% unpriced against a one-third threshold, so the all-in estimate aborts rather than assemble a range from mostly-missing parts. The existence of two endowed funds (Section 5) dedicated to costs above and beyond tuition independently confirms these charges are real.',
      boxes: [
        {
          title: 'The deposit, 2026–27',
          body: 'A **$2,500** non-refundable deposit, with a signed agreement, secures a place for an accepted student. It is credited toward the total tuition cost — so it is a timing obligation rather than an addition to the published rate, and it is the first instalment, not an extra cost.',
        },
        {
          tag: 'TWO PUBLIC FIGURES NOT RETRIEVED',
          body: 'The Lower School page links a "2025–26 Extended Day Schedules and Fees" document, and the transportation page states fare information is available — but its live text refers to **2023–2024** and the fare table did not render. Both are documents a family can open or request in a single step; their contents were not retrieved here, not withheld by the school.',
        },
      ],
      source:
        'providenceday.org — Tuition and Financial Assistance; Extended Day (Lower School); Clubhouse (Middle School); Transportation, all retrieved 24 Jul 2026',
    },
    {
      id: 'fa-engine',
      navTitle: 'The Aid Engine',
      title: 'The Aid Engine — Process, Forms & Timeline',
      confidence: 88,
      timeline: [
        {
          when: '1 Nov 2025',
          detail:
            'Information due for **current families** re-applying — application via **Clarity**',
        },
        {
          when: '23 Jan 2026',
          detail: 'Information due for **prospective families** — same Clarity application',
        },
        {
          when: 'With the agreement',
          detail:
            'The assistance decision arrives **with the enrollment or re-enrollment agreement** — a family learns the award and the enrollment commitment at the same moment',
          emphasis: true,
        },
        {
          when: 'Every year',
          detail:
            'Assistance is granted annually; parents must reapply each year to be considered for continued assistance',
        },
      ],
      boxes: [
        {
          title: 'Platform & cost to apply',
          body: 'Providence Day partners with **Clarity** to assess need · **$65** application fee, paid by the family (2026–27). The school describes the application as taking under an hour and mobile-friendly, and runs family webinars at which Clarity walks through the application and the tax-verification process. Need is assessed on gross income, assets, liabilities, family size, and the number of children in tuition-based schools; assistance does not exceed demonstrated need and depends on the availability of school funds.',
        },
        {
          title: 'Documents & divorced or separated parents',
          body: 'A 1040 return, W-2s and the most recent pay stub — tax documents transfer automatically from the I.R.S. once verification is complete — plus business returns and 1099s for the self-employed. Documents are required from **both custodial and non-custodial parents**, whether divorced, separated or never married; the school states that missing information from either parent may affect eligibility.',
        },
        {
          title: 'Aid and admission are separate',
          body: 'The school states plainly that applying for assistance does **not** influence a candidate\'s admission selection, and that separate committees decide admission and assistance. It does not use the terms "need-blind" or "need-aware," so this report applies neither label.',
        },
        {
          tag: 'NOT PUBLISHED — FIVE PROCESS QUESTIONS',
          body: 'No appeals or reconsideration process · no mid-year change-of-circumstance policy · no statement of whether awards typically renew at a consistent level (the practical question behind annual reapplication) · no confidentiality policy naming who inside the school sees a family\'s file · no composition of the assistance committee.',
        },
      ],
      source:
        'providenceday.org — Tuition and Financial Assistance, Application Process and the five published FAQs, retrieved 24 Jul 2026',
    },
    {
      id: 'fa-numbers',
      navTitle: 'The Aid Numbers',
      title: 'The Aid Numbers — How Much, To Whom, How Far',
      confidence: 65,
      tag: 'DETAIL LIVES IN THE PHILANTHROPY REPORT',
      // The school's own historical aid figures, published in the Report on
      // Philanthropy "Enrollment at a Glance" pages rather than on the tuition
      // page. The `note` on RangeRow is not available, so the year and figures
      // are carried in the stats + boxes. No current-year detail is published;
      // the only current figure is the undated "≈21% of families".
      stats: [
        { value: '≈21%', label: 'of families receive some assistance — current page, no year and no denominator stated' },
        { value: '$3,683,971', label: 'total aid awarded, 2017–18 — the most recent detailed year published' },
        { value: '$13,695', label: 'average grant, 2017–18 (the school\'s own term; not a median)' },
        { value: '16%', label: 'of students assisted, 2017–18 — and also 2012–13' },
      ],
      boxes: [
        {
          title: 'Where the detailed figures live',
          body: 'The tuition page omits every aid figure but one; the numbers live in the annual **Report on Philanthropy**, "Enrollment at a Glance." Published editions: **2012–13** $3,105,191 awarded, avg $12,273, 16% of students · **2013–14** $3,013,928, avg $12,664 · **2017–18** $3,683,971, avg $13,695, 16%. No comparable figures were located after 2017–18. A parent reading only the tuition page would never encounter any of this — a placement finding, not a disclosure gap.',
        },
        {
          tag: 'AVERAGE IS NOT MEDIAN',
          body: 'Every award figure the school publishes is an **average grant** — reproduced unchanged and never treated here as a typical award. Aid awards carry a long upper tail, so an average usually sits above what a typical recipient receives; no median is published in any edition located, so a family cannot tell how far above.',
        },
        {
          tag: 'A UNIT CHANGE THAT BLOCKS COMPARISON',
          body: 'The historical editions count **students** receiving aid (16%); the current page counts **families** receiving assistance (≈21%). Different units, different bases — the apparent 16% → 21% movement cannot be read as growth in reach. It may be an artefact of the unit change, entirely real, or a mixture. This report declines to reconcile them.',
        },
        {
          title: 'An internal discrepancy, reported not resolved',
          body: 'The 2012–13 Report on Philanthropy states **$3,105,191** as total aid awarded on its enrollment page and **$3,092,165** as the financial-aid line in its expense breakdown a page later — a **$13,026** difference, both published by the school in the same document. Both are reproduced; the likeliest explanation is different accounting bases, but the school does not say so and inferring it would be a guess.',
        },
        {
          tag: 'HOW AID IS FUNDED',
          body: 'Assistance draws on both operating funds and endowment income. 2017–18: financial aid and discounts were **9.7%** of expenses against a stated $40.6M budget, and 5% of Annual Fund gifts were designated to Student Financial Assistance. 2012–13: a $3,092,165 aid line within a $33,320,795 expense total — a 9.3% share (our arithmetic on the school\'s two figures). Schedule I and Schedule D of the Form 990, which would carry the K–12 assistance and endowment detail, could not be retrieved.',
        },
      ],
      source:
        'providenceday.org — Tuition and Financial Assistance; Report on Philanthropy 2012–13, 2013–14 and 2017–18. I.R.S. Form 990, EIN 56-0952382, via ProPublica. Retrieved 24 Jul 2026',
    },
    {
      id: 'fa-merit',
      navTitle: 'Merit & Scholarships',
      title: 'Merit, Discounts & Special Programmes',
      confidence: 72,
      tag: 'ALL AID IS NEED-BASED',
      // The school publishes at least eleven named endowed funds. There is no
      // gift-ladder to establish a fund at graded levels (that ladder shape is
      // Country Day's), so this renders as boxes + a stats strip rather than a
      // `ladder`. Fund market values are as of 30 Jun 2018, the most recent
      // edition located, and are historical.
      stats: [
        { value: '11+', label: 'named endowed funds supporting financial aid or tuition assistance' },
        { value: '2', label: 'funds specifically for costs above and beyond tuition (Murdock, Latchwood)' },
        { value: '$100,000', label: 'minimum gift to establish a named endowment fund (raised from $50,000 in 2013)' },
      ],
      boxes: [
        {
          title: 'Need-based, no general merit track',
          body: 'Assistance is need-based; **no general academic, arts, athletic or leadership merit scholarship programme is published.** At least eleven named permanent funds support aid — e.g. the Paula C. Freeman Financial Aid Endowment ($511,383 in Jun 2018), the Rob Eck Memorial Scholarship, the Edward E. Ford Minority Scholarship, and diversity-focused funds (Brinkley, McGee Family). Fund values are as of 30 June 2018, the most recent edition located, and are historical.',
        },
        {
          title: 'Two funds for the costs outside tuition',
          body: 'The **Gilmer L. Murdock, Jr. Endowment** and **The Latchwood Endowment** exist specifically to help students with demonstrated need meet costs above and beyond tuition — the published descriptions name tutoring, review classes, calculators, class trips, sports equipment, team camps, tournaments, dining and activity fees. These are the same categories that appear unpriced in Section 2; their existence confirms those costs are real.',
        },
        {
          title: 'Children of faculty and staff',
          body: 'The **Kristina C. Brockmeier Endowment for Financial Aid** provides assistance annually to children of current faculty and staff who demonstrate need. This is a need-based endowed award, not a blanket tuition-remission benefit; whether the school separately offers a remission percentage to employees is not published.',
        },
        {
          tag: 'NOT PUBLISHED — SIX ITEMS',
          body: 'No indexed or variable tuition · no sibling, clergy, military or first-responder discount · no general merit programme · no figure for how many awards any named fund makes in a year or what a typical award is worth · no statement of whether a named-fund award stacks with or substitutes for a need-based grant. Absence of a published discount is not evidence none exists — several are commonly handled case by case.',
        },
      ],
      source:
        'providenceday.org — Endowment page and Donor Recognition; Report on Philanthropy 2017–18 and 2012–13, Endowments sections. Retrieved 24 Jul 2026',
    },
    {
      id: 'fa-paying',
      navTitle: 'Paying the Balance',
      title: 'Paying the Balance — Plans & Contract Terms',
      confidence: 55,
      plans: [
        {
          figure: '1×',
          label: 'In full',
          detail: 'Tuition paid in a single payment. Whether paying in full earns a discount is not published.',
        },
        {
          figure: '3×',
          label: 'Three installments',
          detail: 'Structure published; the terms, fee or interest attached are not.',
        },
        {
          figure: '10×',
          label: 'Ten installments',
          detail: 'Structure published; the terms, fee or interest attached are not.',
        },
        {
          figure: '12×',
          label: 'Twelve installments',
          detail: 'Structure published; the terms, fee or interest attached are not.',
        },
      ],
      boxes: [
        {
          title: 'The deposit as a contract term',
          body: 'The **$2,500** deposit is non-refundable and secures placement for an accepted student, credited to the overall tuition cost. The published language establishes it is not returned if a family withdraws after signing — but it does not describe what further obligation, if any, a family carries on withdrawal later in the year.',
        },
        {
          tag: 'ONE FIGURE AT A LOWER VERIFICATION TIER',
          body: 'An older school document tied to a previous billing provider referenced a **$45 per family** annual fee for the extended payment plan. It could not be confirmed against any current-year page and the billing arrangement has since changed — recorded only to show plan fees have existed historically, **not** a 2026–27 figure.',
        },
        {
          tag: 'NOT PUBLISHED — SEVEN CONTRACT & PAYMENT QUESTIONS',
          body: 'Whether the 3/10/12-installment plans carry a service fee or interest · whether paying in full earns a discount · which third-party lender, if any, the school partners with · whether a tuition refund or insurance plan is offered, mandatory, and what it costs · the withdrawal and mid-year departure obligation beyond the deposit · the late-payment and arrears policy · whether any prepaid multi-year or tuition-lock option exists. These sit in the enrollment contract, which is not public — a normal arrangement.',
        },
      ],
      source:
        'providenceday.org — Tuition and Financial Assistance, "Are tuition payment plans available?" Retrieved 24 Jul 2026',
    },
    {
      id: 'fa-trend',
      navTitle: 'Trend & Questions',
      title: 'Trend, Reach & the Questions to Ask',
      confidence: 60,
      stats: [
        {
          value: '$472,595',
          label:
            'a full TK–12 run at 2026–27 rates — our arithmetic, tuition only, not a projection',
        },
        { value: '$254,275', label: 'a Grades 6–12 run at 2026–27 rates ($36,325 × 7)' },
        { value: '$145,300', label: 'a Grades 9–12 run at 2026–27 rates ($36,325 × 4)' },
      ],
      boxes: [
        {
          tag: 'TUITION TREND — NOT BUILT',
          body: 'This section normally carries three to five years of published rates. For Providence Day it does not: the tuition page shows only the current year and is overwritten each cycle, and archived prior-year rate cards were not retrieved. Rather than substitute third-party figures for the school\'s own rate cards, this report reports no tuition trend — a limit of the toolchain, not a disclosure failure.',
        },
        {
          title: 'The aid trend the school does publish',
          body: 'Total aid awarded rose from **$3,105,191 (2012–13)** to **$3,683,971 (2017–18)**, with a $3,013,928 dip in 2013–14 between. The average grant rose $12,273 → $13,695; the share of students at 16% at both ends. Enrollment grew 1,552 → 1,627 students over the window. No comparable figures were located after 2017–18. Endowment market value grew $6,486,512 (Jun 2013) → $14,029,707 (Jun 2018); the school\'s strategic framework targets $55M by 2030.',
        },
        {
          tag: 'NAVIGATION HAZARD',
          body: 'Widely-circulated third-party listings carry tuition figures that agree neither with each other nor with the school — an "≈$20,500" single rate, a "$34,430" 2024 top rate, a "$20,800–$29,620" range, a "$23,040–$32,810" 2024–25 range. **None** matches the school\'s published 2026–27 bands of $25,510–$36,325. Aggregators cache prior-year figures and are frequently out of date — treat the school\'s own tuition page as the only authority, even when a search engine surfaces an aggregator above it.',
        },
      ],
      questionsNote:
        'Each corresponds to a gap in this report and is ordered by how much it is likely to move a family\'s total.',
      questions: [
        'What does Extended Day cost per day per week, and what are the bus fares for our address, for the current year?',
        'What do the 8th and 12th grade field trips cost, and when are those charges billed?',
        'What is the current cost of FLIK Dining participation, and is it charged per meal or per term?',
        'Do the 3-, 10- or 12-installment plans carry a fee or interest, and is there a discount for paying in full?',
        'What are the current-year figures for total assistance awarded, the average grant, and the number of students or families assisted?',
        'Is the ≈21% figure a share of all enrolled families, or of families who applied?',
        'What is the range of awards, and does any award cover full tuition?',
        'If we receive an award, what has typically happened to award levels on reapplication in following years?',
        'Is there an appeals process, and what happens if our circumstances change mid-year?',
        'What obligation do we carry if a student withdraws after the school year begins?',
        'Do you offer a sibling, employee, clergy, military or first-responder accommodation?',
      ],
    },
  ],
  sources:
    'providenceday.org — Tuition and Financial Assistance, Extended Day (Lower School), Clubhouse (Middle School), Transportation, Endowment and Donor Recognition, Strategic Framework (all 24 Jul 2026) · Report on Philanthropy 2012–13, 2013–14 and 2017–18, "Enrollment at a Glance" and Endowments · I.R.S. Form 990 filings for Providence Day School, Inc., EIN 56-0952382, via ProPublica Nonprofit Explorer (Schedule I and Schedule D not retrieved). Commercial tuition aggregators were reviewed only to identify discrepancies against the school\'s own page (Section 7) and are the source of no figure here. Every figure was anchored to EIN 56-0952382, the 5800 Sardis Road address, or CEEB 340687 before use. The school did not commission, review or approve this report.',
}

/* ── Carmel Christian ── transcribed from the school's own 2026-2027 Tuition
   and Enrollment Fees PDF (dated 5 Dec 2025) and its aid landing page — see
   source-material/financial-aid-tuition/carmel-christian/. Two structural
   facts shape the report: the school is a church-exempt ministry of Carmel
   Baptist Church and files NO Form 990 (like Covenant Day), so no aid totals
   exist to find; and the only participation figure (~20% on aid) is
   third-party (PrivateSchoolReview), never school-confirmed. No prior-year
   tuition was recovered, so no band carries a `prior`. */
const CARMEL_CHRISTIAN: FinancialAidReport = {
  title: 'Tuition & Financial Aid — Deep Dive Report',
  meta: '2026–27 school year · figures as of 16 Aug 2026',
  framing: [
    {
      icon: 'info',
      title: 'Unpublished ≠ deficient.',
      body: '"Not published" flags a transparency gap — never a judgement that the aid programme is small or unwelcoming.',
    },
    {
      icon: 'clock',
      title: 'Published ≠ current.',
      body: 'Every dollar figure carries the school year it applies to. The tuition table is the school\'s own 2026–27 PDF, dated 5 December 2025; undated figures are flagged, not guessed.',
    },
    {
      icon: 'book',
      title: 'K–12 aid only.',
      body: 'Tuition assistance while enrolled — not college aid. Not financial advice.',
    },
  ],
  sections: [
    {
      id: 'fa-tuition',
      navTitle: 'Tuition by Band',
      title: 'Tuition by Grade Level',
      confidence: 95,
      figureCaption: 'Published tuition by grade band, 2026–27',
      // No `prior` on any band: no prior-year rate card was recovered, so there
      // is no school-published earlier figure to ghost against.
      bands: [
        { label: 'Kindergarten', amount: 12500 },
        { label: 'Grades 1–5', amount: 14400 },
        { label: 'Grades 6–8', amount: 17100 },
        { label: 'Grades 9–12', amount: 18750 },
      ],
      figureNote:
        'Four bands from kindergarten through grade 12, a $6,250 spread from lowest to highest. Figures are the school\'s own 2026–27 Tuition and Enrollment Fees PDF, dated 5 December 2025. No rate history is published, and none was recovered from the archive, so no prior-year comparison is drawn.',
      figureNote2:
        'A separate "2026-2027 International Student Tuition" PDF is referenced on the aid page but was not retrieved; international rates are not captured here.',
      source:
        'carmelchristian.org — 2026-2027 Tuition and Enrollment Fees (PDF, dated 5 Dec 2025), retrieved 16 Aug 2026',
    },
    {
      id: 'fa-beyond',
      navTitle: 'Fees & Added Costs',
      title: 'Fees and Additional Costs',
      confidence: 80,
      componentsTitle: 'A short priced list, with grade-specific add-ons',
      components: [
        { label: 'Enrollment / re-enrollment fee · $500, non-refundable', status: 'priced' },
        { label: 'Technology (Chromebook + insurance), grade 9 only · $550', status: 'priced' },
        { label: 'Senior fee, grade 12 · $200', status: 'priced' },
        { label: 'Athletics · no rate', status: 'unpriced' },
        { label: 'Fine arts · no rate', status: 'unpriced' },
        { label: 'AP classes (grades 9–12) · no rate', status: 'unpriced' },
        { label: 'Impact Week (grades 9–12) · no rate', status: 'unpriced' },
        { label: 'Senior Trip (grade 12) · no rate', status: 'unpriced' },
      ],
      componentsNote:
        'The $500 enrollment (or re-enrollment) fee is non-refundable and, per the school, must be paid in full at the time of enrollment. The grade-9 technology fee and the $200 senior fee are the only other priced add-ons; the PDF names athletics, fine arts, AP classes, Impact Week and the Senior Trip as additional costs without stating amounts.',
      source:
        'carmelchristian.org — 2026-2027 Tuition and Enrollment Fees (PDF), retrieved 16 Aug 2026',
    },
    {
      id: 'fa-engine',
      navTitle: 'The Aid Engine',
      title: 'Aid Process and Timeline',
      confidence: 65,
      timeline: [
        {
          when: '5 Feb 2027',
          detail:
            'Financial Aid Application Deadline for the **2027–28** year, via **FACTS**',
          emphasis: true,
        },
        {
          when: 'Prerequisite',
          detail:
            'Families are also directed to the **NC Opportunity Scholarship** — income caps have been removed and the programme now includes currently-enrolled private-school students; new applicants apply in February',
        },
        {
          when: 'Every year',
          detail:
            'Aid is need-based and assessed through FACTS, the same platform that runs tuition billing',
        },
      ],
      boxes: [
        {
          title: 'Platform',
          body: '**FACTS** runs the need assessment and the monthly tuition draft. The NC Opportunity Scholarship (a state voucher) is actively referenced as a funding layer.',
        },
        {
          tag: 'NOT PUBLISHED',
          body: 'No decision timeline, no appeals process, and no award-ceiling policy appears on the public record. Any FACTS application fee, and whether aid must be reapplied for annually, are also unstated. No ESA+ or other named partnership appears in the retrieved sources.',
        },
      ],
      source:
        'carmelchristian.org — Financial Aid landing page; ncseaa.edu — NC Opportunity Scholarship, retrieved 16 Aug 2026',
    },
    {
      id: 'fa-numbers',
      navTitle: 'Aid in Numbers',
      title: 'What the Numbers Disclose',
      confidence: 20,
      stats: [
        { value: '~20%', label: 'of students on aid — third-party figure only, verify' },
        { value: 'No 990', label: 'church ministry — IRS-exempt from filing' },
        { value: '$0', label: 'published aid totals, averages, or budgets' },
      ],
      figureNote:
        'The ~20% share comes from a third-party aggregator (PrivateSchoolReview); the school itself publishes no percentage, no total awarded, and no average award. Treat the 20% as unverified.',
      boxes: [
        {
          tag: 'NOT PUBLISHED — AND NOT RECOVERABLE',
          body: 'Carmel Christian is a ministry of Carmel Baptist Church and, as a church-affiliated organisation, is **not required to file Form 990** — ProPublica returns no filing for the school itself. Every other school in this project (bar Covenant Day) is a 990 filer whose aid totals can be checked against its return; here there is **no filing to check**, so the gap is structural rather than a page waiting to be found.',
        },
        {
          tag: 'A RELATED ENTITY — NOT SCHOOL AID',
          body: 'A related nonprofit, the **Carmel Educational Foundation** (EIN 56-2107877), does file: FY2025 (year ending 31 July) total revenue **$1,068,745**, total expenses **$618,023**, net assets **$1,894,088**, with contributions ~93.6% of revenue. But the return carries **no separate scholarship or grant line**, and the Foundation-to-school link, while probable, is not explicitly stated — so it yields no school-level aid figure and is not presented as one.',
        },
      ],
      source:
        'privateschoolreview.com; projects.propublica.org — Nonprofit Explorer (school files none; Carmel Educational Foundation EIN 56-2107877), retrieved 16 Aug 2026',
    },
    {
      id: 'fa-merit',
      navTitle: 'Discounts & State Aid',
      title: 'Merit, Discounts & State Scholarships',
      confidence: 85,
      tag: 'ALL SCHOOL AID IS NEED-BASED',
      plans: [
        {
          figure: '$600',
          label: 'Carmel Baptist Church member discount',
          detail: 'Per child, for members of the sponsoring church.',
        },
        {
          figure: '$600',
          label: 'Multi-child discount',
          detail: 'Per child, applied **beginning with the 3rd child enrolled** from the same household. Two-child families get nothing.',
        },
        {
          figure: 'NC',
          label: 'Opportunity Scholarship',
          detail: 'The school references the state voucher, with income caps removed and eligibility expanded to currently-enrolled private-school students.',
          emphasis: true,
        },
      ],
      boxes: [
        {
          tag: 'NOT PUBLISHED',
          body: 'No merit scholarships appear on the public record — school aid is need-based only. No sibling discount before the third child, no military or clergy discount, and no employee-remission policy is published. No ESA+ or other named state partnership appears in the retrieved sources.',
        },
      ],
      source:
        'carmelchristian.org — 2026-2027 Tuition and Enrollment Fees (PDF); Financial Aid landing page, retrieved 16 Aug 2026',
    },
    {
      id: 'fa-paying',
      navTitle: 'Paying the Balance',
      title: 'Payment Plans & Contract Terms',
      confidence: 45,
      plans: [
        {
          figure: '$500',
          label: 'Enrollment fee',
          detail: 'Per child, **non-refundable**, and — per the school — must be paid in full at the time of enrollment.',
          emphasis: true,
        },
        {
          figure: 'FACTS',
          label: 'Monthly auto-draft',
          detail: 'Tuition is paid through **FACTS** by automatic monthly draft. The number of installments and any plan fee are set inside the FACTS portal.',
        },
      ],
      boxes: [
        {
          tag: 'NOT PUBLISHED',
          body: 'The **number of monthly installments** and any FACTS plan fee are not stated on the public pages — they live inside the family\'s FACTS portal. No annual or paid-in-full alternative, no prepayment discount, and no late-payment or withdrawal terms appear on the retrieved sources.',
        },
      ],
      source:
        'carmelchristian.org — Financial Aid landing page (FACTS), retrieved 16 Aug 2026',
    },
    {
      id: 'fa-trend',
      navTitle: 'Trend & Questions',
      title: 'The Trend, and What to Ask',
      confidence: 40,
      stats: [
        { value: '$18,750', label: 'top band (grades 9–12), 2026–27' },
        { value: '1 yr', label: 'of published rates — no history recovered' },
      ],
      questionsTitle: 'Questions the public record cannot answer',
      questions: [
        'What share of families receive aid, and what is the average award? (The ~20% figure is third-party and unverified.)',
        'How many monthly installments does the FACTS plan run, and does it carry a fee?',
        'Is there an appeals or mid-year change-of-circumstance process, and when are decisions released relative to enrollment?',
        'What do athletics, fine arts, AP classes, Impact Week and the Senior Trip actually cost?',
        'What are the 2026–27 international-student tuition rates?',
        'How does the NC Opportunity Scholarship interact with any school aid for families above the former income cap?',
      ],
      source: 'Synthesis of the sources cited on the sections above',
    },
  ],
  sources:
    'carmelchristian.org — 2026-2027 Tuition and Enrollment Fees (PDF, dated 5 Dec 2025), Financial Aid landing page · ncseaa.edu — NC Opportunity Scholarship · privateschoolreview.com (third-party ~20% on aid) · projects.propublica.org — Nonprofit Explorer (school files no Form 990; Carmel Educational Foundation, EIN 56-2107877). Retrieved 16 Aug 2026. The school did not commission, review or approve this report.',
}

/* ── Hickory Grove Christian ── the tuition bands are the school's own current
   figures, confirmed across two third-party mirrors (the school's tuition page
   renders its fee tables through an embedded FACTS/portal widget that did not
   expose the numbers to a fetch). Aid mechanisms are from the school's own
   scholarships page. Like Carmel Christian and Covenant Day, the school is a
   ministry of a church — Hickory Grove Baptist Church — that is IRS 990-exempt
   and files no Form 990, so no aid totals, rates or averages exist to find; that
   is a structural gap, not a page waiting to be located. No prior-year tuition
   was recovered (the portal-rendered page leaves no archived band figures), so
   no band carries a `prior`. The NCSEAA per-school voucher line (224 recipients /
   $1,441,873 / ≈$6,437 avg, 2023–24) is state-voucher money, NOT institutional
   aid, and is deliberately kept out of the aid-outcome sections. */
const HICKORY_GROVE_CHRISTIAN: FinancialAidReport = {
  title: 'Tuition & Financial Aid — Deep Dive Report',
  meta: '2025–26 tuition · figures as of 17 Aug 2026',
  framing: [
    {
      icon: 'info',
      title: 'Unpublished ≠ deficient.',
      body: '"Not published" flags a transparency gap — never a judgement that the aid programme is small or unwelcoming.',
    },
    {
      icon: 'clock',
      title: 'Published ≠ current.',
      body: 'The tuition bands are the school\'s own current figures, confirmed across two third-party mirrors because the school\'s tuition page renders its tables through an embedded portal widget. Undated figures are flagged, not guessed.',
    },
    {
      icon: 'book',
      title: 'K–12 aid only.',
      body: 'Tuition assistance while enrolled — not college aid. Not financial advice.',
    },
  ],
  sections: [
    {
      id: 'fa-tuition',
      navTitle: 'Tuition by Band',
      title: 'Tuition by Grade Level',
      confidence: 80,
      figureCaption: 'Published tuition by grade band',
      bands: [
        { label: 'TK–5 (Elementary)', amount: 11500 },
        { label: 'Grades 6–8 (Middle)', amount: 12500 },
        { label: 'Grades 9–12 (High)', amount: 13750 },
      ],
      figureNote:
        'Three bands from transitional kindergarten through grade 12, a $2,250 spread from lowest to highest. The school\'s own tuition-and-fees page renders its fee tables through an embedded FACTS/portal widget, so these figures are confirmed across two independent third-party mirrors (PrivateSchoolReview and a second aggregator) that match the school\'s published $11,500–$13,750 range, rather than lifted char-for-char from a school PDF.',
      figureNote2:
        'Separate "student services fees" documents (2025-26 and 2026-27) are referenced on the tuition page but render through the portal and were not captured; those fee amounts are not shown here.',
      source:
        'hgchristian.org — Tuition and Fees (portal-rendered); PrivateSchoolReview + a second aggregator mirror of the current bands, retrieved 17 Aug 2026',
    },
    {
      id: 'fa-engine',
      navTitle: 'The Aid Engine',
      title: 'Aid Process and Timeline',
      confidence: 70,
      timeline: [
        {
          when: 'Feb–Mar',
          detail:
            'The **NCSEAA Opportunity Scholarship** application window (Feb 6 – Mar 6 in the 2025 cycle; priority deadline **March 2, 2026** with April notification; late applications accepted through August)',
          emphasis: true,
        },
        {
          when: 'By May 31',
          detail:
            'A **5% discount** applies to tuition paid in full by **May 31, 2026**',
        },
        {
          when: 'Every year',
          detail:
            'The school\'s own need-based aid runs through **FACTS Grant & Aid** ($40 application fee); funds are awarded until depleted',
        },
      ],
      boxes: [
        {
          title: 'Platform',
          body: '**FACTS** runs the school\'s need assessment (Grant & Aid) and the monthly tuition draft. The **NCSEAA Opportunity Scholarship** (a state voucher) and **ESA+** (for children with disabilities) are actively referenced as funding layers.',
        },
        {
          tag: 'NOT PUBLISHED',
          body: 'No decision timeline, appeals process, or award-ceiling policy appears on the public record. The FACTS payment-plan installment count and any plan fee are set inside the portal. Automatic legacy discounts (multi-child, clergy) were **discontinued as of 2026-2027** per the school.',
        },
      ],
      source:
        'hgchristian.org — Scholarships (NCSEAA tiers, ESA+, FACTS Grant & Aid, 5% early-pay), retrieved 17 Aug 2026',
    },
    {
      id: 'fa-numbers',
      navTitle: 'Aid in Numbers',
      title: 'What the Numbers Disclose',
      confidence: 20,
      stats: [
        { value: 'No 990', label: 'church ministry — IRS-exempt from filing' },
        { value: '$0', label: 'published aid totals, averages, or rates' },
        { value: '990-exempt', label: 'no public financial disclosure to derive from' },
      ],
      figureNote:
        'The school publishes no percentage of students on aid, no total awarded, and no average award — and none can be derived, because there is no public financial disclosure to derive them from.',
      boxes: [
        {
          tag: 'NOT PUBLISHED — AND NOT RECOVERABLE',
          body: 'Hickory Grove Christian is a ministry of **Hickory Grove Baptist Church** and, as a church-affiliated organisation, is **not required to file Form 990** — ProPublica returns no filing for the church as a school operator. Every other school in this project (bar Covenant Day and Carmel Christian) is a 990 filer whose aid totals can be checked against its return; here there is **no filing to check**, so the gap is structural rather than a page waiting to be found.',
        },
        {
          tag: 'STATE VOUCHERS — NOT SCHOOL AID',
          body: 'The NC Opportunity Scholarship 2023-24 annual report lists **224 recipients / $1,441,873 / ≈$6,437 average** flowing to HGCS families. That is **state-voucher money paid to families, not institutional need-based aid** — it is recorded here only for traceability and is deliberately not presented as the school\'s aid rate, total, or average.',
        },
      ],
      source:
        'projects.propublica.org — Nonprofit Explorer (church files no Form 990); ncleg.gov — NC Opportunity Scholarship 2023-24 Annual Report (voucher line), retrieved 17 Aug 2026',
    },
    {
      id: 'fa-merit',
      navTitle: 'Discounts & State Aid',
      title: 'Merit, Discounts & State Scholarships',
      confidence: 80,
      tag: 'SCHOOL AID IS NEED-BASED',
      plans: [
        {
          figure: '5%',
          label: 'Early-payment discount',
          detail: 'Off tuition if paid entirely by **May 31, 2026**.',
          emphasis: true,
        },
        {
          figure: 'NCSEAA',
          label: 'Opportunity Scholarship',
          detail: 'Four income tiers — **$7,942 (100%)**, $7,148 (90%), $4,766 (60%), $3,574 (45%); no income cap to apply, and the award scales with household income.',
        },
        {
          figure: 'ESA+',
          label: 'Education Student Accounts Plus',
          detail: 'State accounts for qualified expenses for children with disabilities in eligible non-public settings.',
        },
      ],
      boxes: [
        {
          tag: 'NOT PUBLISHED',
          body: 'No merit scholarships appear on the public record — the school\'s own aid (FACTS Grant & Aid) is need-based only. The previously-offered automatic multi-child and clergy discounts were discontinued as of 2026-2027.',
        },
      ],
      source:
        'hgchristian.org — Scholarships (NCSEAA tiers, ESA+, 5% early-pay, discontinued legacy discounts), retrieved 17 Aug 2026',
    },
    {
      id: 'fa-paying',
      navTitle: 'Paying the Balance',
      title: 'Payment Plans & Contract Terms',
      confidence: 45,
      plans: [
        {
          figure: '$40',
          label: 'FACTS Grant & Aid application fee',
          detail: 'The fee to apply for the school\'s need-based aid through FACTS.',
        },
        {
          figure: 'FACTS',
          label: 'Annual billing, monthly draft',
          detail: 'Tuition is "billed annually and divided into equal payments based on the plan you select," drafted monthly through **FACTS**. The number of installments and any plan fee are set inside the portal.',
          emphasis: true,
        },
      ],
      boxes: [
        {
          tag: 'NOT PUBLISHED',
          body: 'The **number of monthly installments** and any FACTS plan fee are not stated on the public pages — they live inside the family\'s FACTS portal. No paid-in-full alternative beyond the 5% early-pay discount, and no late-payment or withdrawal terms, appear on the retrieved sources.',
        },
      ],
      source:
        'hgchristian.org — Tuition and Fees / Scholarships (FACTS billing, 5% early-pay), retrieved 17 Aug 2026',
    },
    {
      id: 'fa-trend',
      navTitle: 'Trend & Questions',
      title: 'The Trend, and What to Ask',
      confidence: 40,
      stats: [
        { value: '$13,750', label: 'top band (grades 9–12)' },
        { value: '1 yr', label: 'of published rates — no history recovered' },
      ],
      questionsTitle: 'Questions the public record cannot answer',
      questions: [
        'What share of families receive the school\'s own FACTS-based aid, and what is the average award? (No figure is published, and the church files no 990.)',
        'How many monthly installments does the FACTS plan run, and does it carry a fee?',
        'What are the "student services fees," and do they include the after-school program rate?',
        'How does the NCSEAA Opportunity Scholarship interact with the school\'s own FACTS Grant & Aid for a given family?',
        'Is there any appeals or mid-year change-of-circumstance process for need-based aid?',
        'Were the multi-child and clergy discounts fully discontinued for 2026-27, or replaced by anything?',
      ],
      source: 'Synthesis of the sources cited on the sections above',
    },
  ],
  sources:
    'hgchristian.org — Tuition and Fees (portal-rendered) and Scholarships (NCSEAA Opportunity Scholarship tiers, ESA+, FACTS Grant & Aid, 5% early-pay) · PrivateSchoolReview + a second aggregator (tuition-band mirror) · projects.propublica.org — Nonprofit Explorer (Hickory Grove Baptist Church files no Form 990) · ncleg.gov — NC Opportunity Scholarship 2023-24 Annual Report (state-voucher line, not institutional aid). Retrieved 17 Aug 2026. The school did not commission, review or approve this report.',
}

/* ── Gaston Day ── transcribed from the school's own SCHEDULE OF TUITION AND
   FEES 2025-2026 PDF (pdftotext -layout), the Cost & Financial Aid page and the
   Scholarships page — see source-material/financial-aid-tuition/gaston-day/.
   Two things shape this report: Gaston Day publishes tuition and fees as
   SEPARATE columns plus an explicit combined total, which no other school here
   does; and it runs THREE distinct assistance channels (need-based aid, merit
   scholarships, and the NC Opportunity Scholarship) whose overlap is almost
   certainly why the school's own 26% aid share and a third-party 45% figure
   diverge so widely. */
const GASTON_DAY: FinancialAidReport = {
  title: 'Tuition & Financial Aid — Deep Dive Report',
  meta: '2025–26 school year · figures as of 18 Aug 2026',
  framing: [
    {
      icon: 'info',
      title: 'Unpublished ≠ deficient.',
      body: '"Not published" flags a transparency gap — never a judgement that the aid programme is small or unwelcoming.',
    },
    {
      icon: 'clock',
      title: 'Tuition and fees are billed separately.',
      body: 'Gaston Day publishes a tuition column, a fees column and a combined total. The all-in total is the like-for-like figure against other schools, and is what this report leads with.',
    },
    {
      icon: 'book',
      title: 'K–12 aid only.',
      body: 'Tuition assistance while enrolled — not college aid. Not financial advice.',
    },
  ],
  sections: [
    {
      id: 'fa-tuition',
      navTitle: 'Tuition by Band',
      title: 'Tuition by Grade Level',
      confidence: 98,
      figureCaption: 'Published all-in totals by grade band, 2025-26 — tuition plus fees',
      bands: [
        { label: 'Preschool/Pre-K half-day', amount: 8775 },
        { label: 'Preschool/Pre-K full day', amount: 10890 },
        { label: 'Kindergarten–4th', amount: 19500 },
        { label: '5th–8th', amount: 21425 },
        { label: '9th–12th', amount: 22390 },
      ],
      figureNote:
        'Five bands from half-day preschool to grade 12. The amounts above are the school’s own published **totals**; the underlying split at the top band is **$20,215 tuition + $2,175 fees = $22,390**. Fees scale with the band, from $900 at half-day preschool to $2,175 in the Upper School.',
      figureNote2:
        'For **2026-27** the school publishes only a range — **$20,300 to $23,310** depending on grade — with no per-grade schedule posted at the time of this research.',
      source:
        'gastonday.org — Schedule of Tuition and Fees 2025-2026 (PDF); Cost and Financial Aid page, retrieved 18 Aug 2026',
    },
    {
      id: 'fa-beyond',
      navTitle: 'Fees & Added Costs',
      title: 'Fees and Additional Costs',
      confidence: 90,
      componentsTitle: 'What sits outside the published total',
      components: [
        { label: 'Bus — round trip · $2,500/yr', status: 'priced' },
        { label: 'Bus — one way · $1,630/yr', status: 'priced' },
        { label: 'Bus — per trip · $18', status: 'priced' },
        { label: 'After school care, Lower School · $95/week or $30/day', status: 'priced' },
        { label: 'After school care, Middle School · $55/week or $15/day', status: 'priced' },
        { label: 'Extended Day drop-in fee · $25', status: 'priced' },
        { label: 'Music lessons · $35 per lesson', status: 'priced' },
        { label: 'Summer camps · $175–$300/week, plus wrap-around care', status: 'priced' },
        { label: 'Financial aid application fee (Clarity) · $65', status: 'priced' },
        { label: 'Lunch — Sparty’s Dining Service', status: 'unpriced' },
        { label: 'Uniforms / dress code', status: 'unpriced' },
        { label: 'Athletics participation costs', status: 'unpriced' },
      ],
      componentsNote:
        'Unusually, almost every add-on Gaston Day publishes carries a price — the transport, aftercare, music-lesson and summer-camp rates are all stated in dollars on the fee schedule or the camp catalog. What the school does **not** publish is what tuition itself includes, so whether technology, lab fees, retreats and field trips sit inside the fees column is unstated.',
      componentsAside:
        'The fees column is not itemised. A family sees "$2,175 in fees" at the Upper School band without being told what those fees buy.',
      source:
        'gastonday.org — Schedule of Tuition and Fees 2025-2026 (PDF); After School Program page; 2026 Summer Camps Catalog, retrieved 18 Aug 2026',
    },
    {
      id: 'fa-engine',
      navTitle: 'The Aid Engine',
      title: 'Aid Process and Timeline',
      confidence: 85,
      timeline: [
        {
          when: 'Step 1',
          detail: 'Create an account with **Clarity** — not FACTS or SSS, the platform most of this roster uses',
        },
        {
          when: 'Step 2',
          detail: 'Add Gaston Day School to the applicant entry',
        },
        {
          when: 'Step 3',
          detail: 'Complete the application and pay the **$65 application fee**',
        },
        {
          when: 'Step 4',
          detail: 'Complete **tax verification** — by IRS transfer or through Clarity’s own option',
        },
        {
          when: 'Step 5',
          detail: 'Submit, then monitor the dashboard for document requests',
        },
        {
          when: 'Deadline',
          detail: 'The aid deadline is **rolling** — but the school warns funds "may become limited or unavailable towards the beginning of the new school year (August)"',
          emphasis: true,
        },
      ],
      boxes: [
        {
          title: 'A rolling deadline is a soft deadline',
          body: 'Rolling sounds permissive and is really the opposite: there is no date protecting a late applicant, and the school states outright that money runs out by August. Applying early is the whole strategy. Contact: **Kevin Napp**, Director of Admissions, 704.864.7744 ext. 414.',
        },
        {
          tag: 'NOT PUBLISHED',
          body: 'No decision timeline, no appeals process, no mid-year change-of-circumstance route, and no statement of whether awards renew automatically or require a fresh application each year.',
        },
      ],
      source:
        'gastonday.org — Cost and Financial Aid (Clarity five-step process), retrieved 18 Aug 2026',
    },
    {
      id: 'fa-numbers',
      navTitle: 'Aid in Numbers',
      title: 'What the Numbers Disclose',
      confidence: 45,
      stats: [
        { value: '26%', label: 'of the student body on tuition assistance — the school’s own figure' },
        { value: 'up to 80%', label: 'of tuition — the published discount ceiling, K–12' },
        { value: '$0', label: 'published aid budget, total awarded, or average award' },
      ],
      figureNote:
        'The **26%** comes from the school’s own 2025-26 Academic Profile. A third-party profile (Private School Review) reports **45%** — a wide divergence, and probably a definitional one rather than an error: the profile’s "tuition assistance" is need-based aid, while an aggregator’s "percent on financial aid" commonly folds in merit awards and NC Opportunity Scholarship recipients, which at Gaston Day are three separate channels.',
      boxes: [
        {
          title: 'The 80% ceiling is the most useful published number',
          body: 'The school states aid of **up to 80% of tuition** for Kindergarten through grade 12. That is a real ceiling a family can plan against, and few schools on this roster publish one at all.',
        },
        {
          tag: 'NOT PUBLISHED',
          body: 'No total aid budget in dollars, no average award, no count of families receiving aid, no median award, and no breakdown of aid by grade band or by channel.',
        },
        {
          tag: 'ENROLLMENT ALSO DIVERGES',
          body: 'The school reports **510** students; Private School Review says **466**; the federal NCES survey (2023-24) says **448**. The school’s own current figure is used throughout this project — but any per-student figure computed from a third-party enrollment count will differ from one computed from the school’s.',
        },
      ],
      source:
        'gastonday.org — Academic Profile 2025-2026; Cost and Financial Aid; privateschoolreview.com; nces.ed.gov PSS 2023-24, retrieved 18 Aug 2026',
    },
    {
      id: 'fa-merit',
      navTitle: 'Merit & State Aid',
      title: 'Merit Scholarships & State Programs',
      confidence: 90,
      tag: 'A FULL-TUITION MERIT AWARD EXISTS',
      ladder: [
        {
          gift: '100%',
          share: 100,
          detail: '**The W. Duke Kimbrell Scholarship** — the school’s highest honor, covering **100% of tuition**, for grades 8–11. Awarded by invitation to qualified applicants on scholarly excellence, high moral character, family involvement, leadership and demonstrated community or hobby participation.',
        },
        {
          gift: 'Merit',
          share: 40,
          detail: '**The Kimbrell Family Scholarship** — grades 5–11, for students with nationally normed test scores at the **90th percentile or higher** and/or an unweighted **GPA of 3.5 or higher**. Every admitted applicant is reviewed automatically; nominated students may add supplemental materials and interview on campus. The award amount is not published.',
        },
        {
          gift: 'State',
          share: 25,
          detail: '**NC Opportunity Scholarship** — approximately **$3,000 to $7,000**, K–12, based on household income. The state window is **February 1 to March 1**; later applicants are waitlisted.',
        },
      ],
      boxes: [
        {
          title: 'Three channels, not one',
          body: 'Gaston Day runs need-based **Financial Aid**, **Merit Scholarships** and the **NC Opportunity Scholarship** as separate routes. A family may be eligible for more than one, and the interaction between them is not published — which is worth asking about directly.',
        },
        {
          tag: 'NOT PUBLISHED',
          body: 'No amount for the Kimbrell Family Scholarship, no deadlines for either Kimbrell award, no count of recipients, no renewal terms, and no sibling, military, clergy or employee discount.',
        },
      ],
      source:
        'gastonday.org — Scholarships page; Cost and Financial Aid, retrieved 18 Aug 2026',
    },
    {
      id: 'fa-paying',
      navTitle: 'Paying the Balance',
      title: 'Payment Plans & Terms',
      confidence: 40,
      plans: [
        {
          figure: 'Several',
          label: 'Payment plans offered',
          detail: 'The fee schedule states that "Gaston Day offers a variety of payment plans in an effort to make our community more affordable and accessible" — but names none of them, gives no installment counts, dates or fees.',
          emphasis: true,
        },
        {
          figure: 'Deposit',
          label: 'Assumed by every plan',
          detail: 'All payment plans "assume tuition deposit and fees have been paid" — so the deposit and the full fees column come first, whatever plan a family picks. The deposit amount is not published.',
        },
      ],
      boxes: [
        {
          tag: 'NOT PUBLISHED',
          body: 'This is the thinnest section of Gaston Day’s public record. No plan names, no installment schedule, no plan fees, no card-processing surcharge, no deposit amount, no late-payment policy, no withdrawal or refund terms, and no tuition-insurance or refund-plan offering appear anywhere on the public site. Every peer school here publishes at least the installment count.',
        },
      ],
      source:
        'gastonday.org — Schedule of Tuition and Fees 2025-2026 (PDF), retrieved 18 Aug 2026',
    },
    {
      id: 'fa-trend',
      navTitle: 'Trend & Questions',
      title: 'The Trend, and What to Ask',
      confidence: 55,
      stats: [
        { value: '$22,390', label: 'top band all-in, 2025-26 (tuition $20,215 + fees $2,175)' },
        { value: '$20,300–$23,310', label: 'the 2026-27 range, published without a per-grade table' },
        { value: '2 yrs', label: 'of schedules retrievable (2024-25 and 2025-26 PDFs)' },
      ],
      questionsTitle: 'Questions the public record cannot answer',
      questions: [
        'What is the total aid budget, the average award, and how many families receive aid?',
        'Why does the school report 26% on tuition assistance when Private School Review reports 45% — what does each figure count?',
        'What are the payment plans, how many installments, and what do they cost?',
        'What is the enrollment deposit, and is it refundable or credited to tuition?',
        'What exactly do the fees buy — the $2,175 Upper School fees column is not itemised anywhere?',
        'Do need-based aid, the Kimbrell awards and the NC Opportunity Scholarship stack, or offset each other?',
        'What is the amount of the Kimbrell Family Scholarship, and when are both Kimbrell awards decided?',
        'Given the rolling deadline and the August funds warning, by what date should a family realistically apply?',
      ],
      source: 'Synthesis of the sources cited on the sections above',
    },
  ],
  sources:
    'gastonday.org — Schedule of Tuition and Fees 2025-2026 (PDF) · Cost and Financial Aid · Scholarships · Academic Profile 2025-2026 (PDF) · After School Program · 2026 Summer Camps Catalog · privateschoolreview.com · nces.ed.gov PSS — retrieved 18 Aug 2026',
}

const REPORTS: Record<string, FinancialAidReport> = {
  'charlotte-country-day': COUNTRY_DAY,
  cannon: CANNON,
  'charlotte-christian': CHARLOTTE_CHRISTIAN,
  'covenant-day': COVENANT_DAY,
  'davidson-day': DAVIDSON_DAY,
  'charlotte-latin': CHARLOTTE_LATIN,
  'providence-day': PROVIDENCE_DAY,
  'carmel-christian': CARMEL_CHRISTIAN,
  'hickory-grove-christian': HICKORY_GROVE_CHRISTIAN,
  'gaston-day': GASTON_DAY,
}

/* ---------------------------------------------------------- translations -- */

/*
 * DEFERRED behind a function — `import.meta.glob` cannot be parsed by plain
 * Node, and the build-time checkers import this module directly. At module
 * scope it makes check_translations.mjs report an empty topic. See
 * courseOfferings.ts for the same treatment and the reasoning.
 */
function overlayFiles() {
  return import.meta.glob<OverlayFile>('./overlays/financial-aid-report.*.json', {
    import: 'default',
  })
}

/** Warms the overlay for a locale; resolves once the index is ready. */
export async function loadFinancialAidReportOverlay(lang: string): Promise<void> {
  if (hasOverlay('financial-aid-report', lang)) return
  const load = overlayFiles()?.[`./overlays/financial-aid-report.${lang}.json`]
  if (!load) {
    setOverlayIndex('financial-aid-report', lang, undefined)
    return
  }
  try {
    setOverlayIndex('financial-aid-report', lang, indexOverlay(await load()))
  } catch {
    // A missing or malformed overlay must not break the page: English stands in.
    setOverlayIndex('financial-aid-report', lang, undefined)
  }
}

/**
 * The structured deep-dive for a school, or undefined to fall back to prose.
 *
 * With no overlay for `lang` this returns the English object BY REFERENCE (see
 * the identity requirement in src/lib/localizeData.ts).
 */
export function financialAidReport(
  schoolSlug: string,
  lang = 'en',
): FinancialAidReport | undefined {
  const en = REPORTS[schoolSlug]
  if (!en || lang === 'en') return en
  return localized(en, overlayIndex('financial-aid-report', lang), schoolSlug)
}
