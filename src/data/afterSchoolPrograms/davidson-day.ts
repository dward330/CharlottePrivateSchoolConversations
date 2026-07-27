// Davidson Day School — After School (Extended Care).
//
// Transcribed from source-material/after-school/davidson-day/ — principally
// "Davidson Day - After School - Redesign Research 2026.md", which carries the
// source URLs.
//
// This entry deliberately has NO `cost` card. Davidson Day publishes no rate of
// any kind — not a registration fee, not a daily or hourly rate, not a
// late-pickup fee — and that was confirmed across the live site map, all 17
// back-to-school PDFs, the tuition page, and four Wayback captures. Even the
// 2020 archive of the Extended Care page carried no pricing, so this is a
// long-standing policy rather than a recent page break. Rendering an empty Cost
// Planner would imply the research failed; omitting it and stating the gap on
// the other three cards is the honest rendering.
//
// The dismissal times ARE live and current. Almost everything about the program
// itself comes from a May 2020 archive of pages that have since been removed
// from the site entirely — every one of those facts carries a stale flag, and
// the archived 2:45–6:00 window is explicitly noted as inconsistent with the
// current bell schedule rather than presented as current.

import type { AfterSchoolProgram } from '../afterSchool.ts'

/* The timeline spans 2 pm → 6 pm — Davidson Day's earliest dismissal is 2:45 —
   so each hour is 0.25 of the window. */
const frac = (hour: number, minute = 0) => (hour + minute / 60 - 14) / 4

export const davidsonDay: AfterSchoolProgram = {
  coverage: {
    headline:
      'After-school care exists for Traditional Toddler through grade 8 — but the pages describing it have been removed from the school’s site, and no rate has ever been published.',
    subhead:
      'The dismissal times below are current and live. The program hours are recovered from a 2020 archive of a page that no longer exists, and they no longer line up with the current bell schedule.',
    hours: ['2 pm', '3 pm', '4 pm', '5 pm', '6 pm'],
    rows: [
      {
        division: 'Early Preschool–JK',
        dismissal: 'dismissal 2:45',
        startFrac: frac(14, 45),
        endFrac: frac(18),
        tiers: [],
        flatLabel: 'After School Care · to 6:00 · rate not published',
      },
      {
        division: 'Kindergarten–Gr 4',
        dismissal: 'dismissal 3:05',
        startFrac: frac(15, 5),
        endFrac: frac(18),
        tiers: [],
        flatLabel: 'After School Care · to 6:00 · rate not published',
      },
      {
        division: 'Grades 5–8',
        dismissal: 'dismissal 3:25',
        startFrac: frac(15, 25),
        endFrac: frac(18),
        tiers: [],
        flatLabel: 'After School Care · to 6:00 · rate not published',
      },
      {
        division: 'Grades 9–12',
        dismissal: 'dismissal 3:20',
        startFrac: frac(15, 20),
        endFrac: frac(18),
        tiers: [],
        uncovered: true,
        flatLabel: 'No coverage — Extended Care is TT–8 only',
      },
    ],
    facts: [
      {
        label: 'Sign-ups',
        text: 'the live FAQ says only that "after-school care sign-ups will be released in **mid-July**" — late for families planning childcare',
      },
      {
        label: 'Before School Care',
        text: '7:15–7:40 a.m., staffed by full-time Davidson Day teachers at a **7:1** ratio — from the 2020 archive, unconfirmed for 2026-27',
      },
      {
        label: 'Staggered dismissal',
        text: 'a **40-minute spread** across 2:45, 3:05, 3:20 and 3:25 for multi-child families',
      },
    ],
    flags: [
      {
        kind: 'stale',
        text: 'The archived After School Care window of **2:45–6:00 p.m. for TT–8** comes from a capture dated **18 May 2020 — six years old**. It no longer matches the current schedule: 2:45 p.m. is now only the Early Preschool–JK dismissal, while K–4 dismisses at 3:05 and grades 5–8 at 3:25. Whether older students are covered from their own dismissal is unknown.',
      },
      {
        kind: 'gap',
        text: 'The **Extended Care and After School Programs pages have been removed from the live site entirely** — both re-verified as 404 in July 2026, and neither appears in the current site map. A 2026-27 family has no published description of the program at all.',
      },
      {
        kind: 'gap',
        text: 'No summer program is published on the live site, and no summer page exists in the site map. An archived 2019 camp page and a third-party aggregator listing exist but neither is confirmed on any school-owned page.',
      },
      {
        kind: 'gap',
        text: 'Whether care runs on half-days or conference days is not published. The 2026-27 calendar does confirm the dates that would need it — half-days 18 Dec 2026, 15 Apr and 26 May 2027, and conference closures 14–18 Sep 2026, 4 Jan and 16 Apr 2027.',
      },
    ],
    sources: [
      {
        label: 'davidsonday.org — Back-to-School site (2026-27 dismissal times, care FAQ)',
        url: 'https://www.davidsonday.org/back-to-school-site',
      },
      {
        label: 'davidsonday.org — Site map (confirms no extended-care page exists)',
        url: 'https://www.davidsonday.org/site-map',
      },
      {
        label: 'davidsonday.org — 2026-27 academic calendar (PDF)',
        url: 'https://www.davidsonday.org/fs/resource-manager/view/83b9bf74-9d12-482d-a574-b6e7d38fdb04',
      },
      {
        label: 'Internet Archive — Extended Care as captured 18 May 2020 (STALE)',
        url: 'https://web.archive.org/web/20200518232512/https://www.davidsonday.org/community/auxiliary-programs/extended-care',
      },
    ],
  },

  /* No `cost` card: Davidson Day publishes no rate of any kind. See the file
     header — this omission is the finding, not a hole in the research. */

  dayInside: {
    headline:
      'The program describes itself as "a safe, engaging, and nurturing environment for supervised play and homework completion" — in words captured from a page that no longer exists.',
    subhead:
      'No daily schedule, no current program description, and no enrichment catalog is published anywhere on the live site.',
    rhythm: [],
    wordsTitle: 'The program, in its own (archived) words',
    words: ['safe', 'engaging', 'nurturing', 'supervised play', 'homework completion'],
    wordsText:
      'Students are "subdivided into age- and attendance-appropriate groups as determined by Extended Care staff" and "must be signed out… by a parent or other authorized persons as listed on the Extended Care Application." Notably candid, and unusual to see in writing: the school itself described the roughly **15:1** after-school ratio as "significantly higher than comparable Davidson Day classroom student-to-staff ratios," while noting it "complies with State of North Carolina standards." All of this is from the 2020 capture.',
    dayFilters: [],
    gradeFilters: [],
    classes: [],
    flags: [
      {
        kind: 'stale',
        text: 'Every quotation above comes from an archived capture dated **May 2020**. The live site carries no program description at all, so none of it is confirmed for 2026-27 — including the 15:1 ratio.',
      },
      {
        kind: 'gap',
        text: 'No enrichment catalog is recoverable. The archived page said the school "contracts with both internal and external providers… Programs are offered daily between 2:45-6 p.m., and fees vary by program. Sample offerings include:" — and the sample offerings resolve to three photo blocks with **empty captions**. No class name, day, grade range or fee survives, so none is listed here.',
      },
      {
        kind: 'verify',
        text: 'The **Learning Enrichment Center** is the only adjacent program with a live page, but it is tutoring, occupational therapy and speech — scheduled "during the school day, often during a study hall period" precisely so students can still do after-school activities. It is not after-school care.',
      },
    ],
    sources: [
      {
        label: 'Internet Archive — Extended Care as captured 18 May 2020 (STALE)',
        url: 'https://web.archive.org/web/20200518232512/https://www.davidsonday.org/community/auxiliary-programs/extended-care',
      },
      {
        label: 'Internet Archive — After School Programs as captured 17 May 2020 (STALE)',
        url: 'https://web.archive.org/web/20200517235914/https://www.davidsonday.org/community/auxiliary-programs/after-school-programs',
      },
      {
        label: 'davidsonday.org — Learning Enrichment Center',
        url: 'https://www.davidsonday.org/academics/learning-enrichment-center',
      },
    ],
  },

  verdict: {
    headline:
      'A program that almost certainly works fine — and that a prospective family has no way to evaluate, price, or even read about before enrolling.',
    subhead:
      'Extended care is explicitly excluded from financial aid, which makes the missing price tag a real decision problem rather than a documentation quibble.',
    strengths: [
      '**Coverage runs to 6:00 p.m.**, competitive with peers, and spans **Traditional Toddler through grade 8** — including a toddler tier most schools here do not cover at all.',
      '**Before School Care was teacher-staffed at 7:1** — genuinely strong for before-care, and staffed by full-time Davidson Day teachers rather than outside hires, if it still holds.',
      '**The school is straightforwardly honest that aid does not reach extended care**, stating it plainly on the tuition page rather than burying it in a fee schedule.',
      '**A long-running program with a real operating history** — the archived material describes an established operation with sign-out procedures and age-appropriate grouping.',
    ],
    watchouts: [
      '**Total pricing opacity.** No registration fee, no daily or hourly rate, no late-pickup fee, no billing method — nothing, anywhere, including in the 2020 archive. This is long-standing policy, not a broken page.',
      '**The program pages have been deleted from the live site.** Both the Extended Care and After School Programs URLs return 404 and neither appears in the site map, so there is no current published description to read.',
      '**Extended care is excluded from financial aid** — "Financial Aid does not cover extended care" — making it a pure out-of-pocket add-on on top of $22,590–$26,910 tuition. Maximum aid still requires families to pay $3,000 a year per student.',
      '**The school itself flagged the ratio.** A roughly 15:1 after-school ratio was described in its own words as "significantly higher than comparable Davidson Day classroom student-to-staff ratios."',
      '**Sign-ups are not released until mid-July**, which is late for families arranging childcare around a work schedule.',
      '**No Upper School coverage**, and a 40-minute spread of staggered dismissals for families with children in more than one division.',
      '**No enrichment catalog survives at all** — not a single class name, day or fee is recoverable from any source.',
    ],
    checklist: [
      'What are the actual 2026-27 rates and structure — an annual contract, or drop-in? This is the first question, because nothing is published.',
      'Does the 2:45–6:00 p.m. window still hold now that K–4 dismisses at 3:05 and grades 5–8 at 3:25 — and are older students covered from their own dismissal?',
      'Is there a late-pickup fee, and what is it?',
      'Does care run on half-days (18 Dec, 15 Apr, 26 May) and on conference no-school days?',
      'Is Before School Care still offered at 7:15 a.m., and is it still teacher-staffed at 7:1?',
      'What is the current after-school staff-to-child ratio? Is it still around 15:1?',
      'What enrichment classes actually run this year, on what days, and at what fee?',
      'Does the summer camp still exist as a school-run program?',
      'Why were the Extended Care pages removed, and where can I read the current program description?',
    ],
    flags: [],
    sources: [
      {
        label: 'davidsonday.org — Tuition and Affordability (the financial-aid exclusion)',
        url: 'https://www.davidsonday.org/admission/tuition-and-affordability',
      },
      {
        label: 'Verdict synthesized by the researcher from the sources cited on the cards above',
      },
    ],
  },
}
