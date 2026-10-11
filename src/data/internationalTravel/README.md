# `internationalTravel/`

One `<slug>.ts` per school with International Travel research, each exporting an
`InternationalTravelProgram` (types and card registry in
[`../internationalTravel.ts`](../internationalTravel.ts)).

**Providence Day is the only occupant** (`.claude/plans/intltravel.md`), added
2026-10-11 from a Claude Design handoff. The area sits directly after Course Offerings
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
  the citation. Quoted wording must match the live page exactly.
- **Gaps go to `verdict.ask` only.** Cards 1–6 carry no "not stated" or "not
  published" text. An unknown is omitted (a trip with no stated timing has no
  `timing`), and if a parent would want it answered it becomes an "Ask on the tour"
  question.
- **Conflicts between the school's own pages are shown as ranges**, and the text says
  so ("250–375 — school pages give different totals"). Our own tallies say they are
  ours ("our count from the school's Global Map").
- **`credential` and `network` are retitled per school** through `TITLE_OVERRIDES` in
  `../internationalTravel.ts` (Providence Day: "The Global Studies Diploma", "Round
  Square & the Wider Network"). Each override needs a
  `cards.international-travel.<key>@<slug>` key in every locale catalog. A school with
  no credential or network **omits the card**; it never ships under the generic title.
- **Photos are real and optional.** `trips.photo` and `exchanges.photo` are the
  school's own photographs, saved under `public/travel/` and rendered through
  `assetUrl()` + `PhotoZoomButton` (`check:photos`). **No student is named** in the
  filename, `alt` or caption, even when the school's own alt text names them; rename
  the file on download if the CDN path carries a name. With no photo the figure is
  omitted and the adjacent column fills the width.
- **Figures are authored US-style** (`250–375`, `3.75`, `B−`, `280+`) and never
  re-typed per locale.
