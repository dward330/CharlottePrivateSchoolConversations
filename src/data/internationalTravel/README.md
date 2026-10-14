# `internationalTravel/`

One `<slug>.ts` per school with International Travel research, each exporting an
`InternationalTravelProgram` (types and card registry in
[`../internationalTravel.ts`](../internationalTravel.ts)).

**The area is displayed as "Global Exposure"** (renamed 2026-10-11); its slug, data
directory and source-material folder keep the original `international-travel` name.

**Two schools:** Providence Day (`.claude/plans/intltravel.md`), added 2026-10-11 from
a Claude Design handoff, and Charlotte Country Day (`.claude/plans/ccdglobal.md`),
added 2026-10-12 from a Claude deep-research PDF verified against live pages. The area sits directly after Course Offerings
and is **deliberately off Compare** (`COMPARE_DEFERRED_TOPICS` in
`src/lib/manifest.ts`). Its stat strip is therefore the school's own `stats`, never
`metricValues.ts` rows, which would feed Compare's Key Stats.

## Two gates

Adding a school takes the file here **and** an import plus a `PROGRAMS` entry in
`../internationalTravel.ts`. The section then renders only if
`source-material/international-travel/<slug>/` also exists — the card data and the
research manifest are separate gates, and `topicsForSchool()` reads the manifest one. A
school with neither simply has no chip, rail item or section. There is no "not yet
researched" shell.

## The rules every school file follows

- **A live-page URL for every fact.** Each card's `sources` lists the specific pages
  behind that card's facts. A fact with no URL is not rendered. The per-fact map lives
  in `source-material/international-travel/<slug>/<School> - International Travel - Source URLs.md`.
  Deep-research output, including AI-generated summaries, is a lead sheet and never
  the citation.
- **Quote marks only where they mean something** (user preference, 2026-10-11): a
  name or title (a conference theme, a trip or program name, the school's motto), a
  real person's own words, an outside body's verdict we attribute rather than assert
  (SAIS), or a page heading a parent would search for. School-page wording that is
  just description is written as plain prose — the SOURCE row already cites the page.
  What IS quoted must match the live page exactly.
- **Gaps go to `verdict.ask` only.** Cards 1–6 carry no "not stated" or "not
  published" text. An unknown is omitted (a trip with no stated timing has no
  `timing`), and if a parent would want it answered it becomes an "Ask on the tour"
  question.
- **Where the school's own pages give different totals, show the most current one,
  marked `~` as an approximation** — not a range with a "pages differ" caveat (user
  preference, 2026-10-11). Providence Day's GSD tile is `~375`, from the GSD page's "to
  date" count, though older pages say 250+, 300+ and 325+. Record the other figures in
  the Source URLs file. Our own tallies say they are ours ("our count from the school's
  Global Map").
- **`credential` and `network` are retitled per school** through `TITLE_OVERRIDES` in
  `../internationalTravel.ts` (Providence Day: "The Global Studies Diploma", "Round
  Square & the Wider Network"). Each override needs a
  `cards.international-travel.<key>@<slug>` key in every locale catalog. A school with
  no credential or network **omits the card**; it never ships under the generic title.
- **Every card is optional, including the two shared cards added with Country Day**
  (user-approved 2026-10-12): `community` ("Global Community on Campus" — international
  families, languages, ESL, on-campus cultural programs) and `milestones` ("Firsts &
  Milestones" — a dated timeline, oldest first, full width). `community` is the **fourth**
  card for every school, after Signing Up for Travel (user decision, 2026-10-13), and
  `milestones` sits just before the Verdict. No school ships either
  empty or as a placeholder. Providence Day added both on 2026-10-13
  (`.claude/plans/pdcommunity.md`) from a second deep-research PDF verified against
  live pages; a milestone whose year the school's own pages dispute (Round Square:
  2015, 2016, "for over a decade") is omitted rather than shown with two years. A milestone `year` is a pure figure (`1992`, `2020–22`), and one year may hold
  two events, so rows are keyed by year + title.
- **The Credential card is omitted where no global credential exists.** Country Day
  publishes no global diploma or certificate, so it has no `credential`; its IB Diploma
  sits in the Upper School items of `start`, and "is a credential planned?" is a Verdict
  question. The generic "Signing Up for Travel" title is shared; Providence Day keeps
  "Signing Up for Travel & GSD" through `TITLE_OVERRIDES`, since its card lists GSD
  events.
- **No trip prices and no exact travel dates on the page** (user decision, pdtrips2027
  review, 2026-10-12 — "that may be private information"). No price, deposit or airfare
  renders; trip timing is a season and year ("Winter 2027", "Spring break 2027",
  "summer 2027"). Application, registration and payment deadlines may render — they are
  not travel dates. Prices and dates stay in the Source URLs file and the ingested
  research only. No financial-aid award or decision rows in Signing Up.
- **Stat values and other figure fields hold figures only.** A tile `value`, a milestone
  `year`, a ledger `year` and a partner `years` are skipped by the i18n extractor, so a
  word in one ("since 1991", "Nov 2025") renders English in every locale. Put the words
  in the label, note or adjacent text, and keep one ledger row per school year.
- **Photos are real and optional.** `trips.photo` and `exchanges.photo` are the
  school's own photographs, saved under `public/travel/` and rendered through
  `assetUrl()` + `PhotoZoomButton` (`check:photos`). **No student is named** in the
  filename, `alt` or caption, even when the school's own alt text names them; rename
  the file on download if the CDN path carries a name. With no photo the figure is
  omitted and the adjacent column fills the width. **Photos render in the school's
  own colors** — no grayscale or duotone filter, on any school (user decision,
  2026-10-12).
- **Figures are authored US-style** (`~375`, `3.75`, `B−`, `280+`) and never
  re-typed per locale.
