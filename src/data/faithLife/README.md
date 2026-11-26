# Faith & Spiritual Life — per-school data

One file per school, `<slug>.ts`, exporting a `FaithLifeProgram` (types and the card
registry are in [`../faithLife.ts`](../faithLife.ts)). Charlotte Christian School was the
first school (2026-11-26, plan `faithlife`). The area is for faith-based schools only. It
is off Compare (`COMPARE_DEFERRED_TOPICS`) and out of the `/add-school` area floor
(`FLOOR_EXCLUDED_AREAS`).

## Two gates

The section renders on a school's page only when **both** exist:

1. `source-material/faith-spiritual-life/<slug>/*.md` — the research record (provenance,
   source URLs, verbatim text). Without it the topic never reaches the school's page.
2. This data file, registered in `PROGRAMS` in `../faithLife.ts`.

## Ten cards, fixed order

`chapel`, `classes`, `retreats`, `groups`, `beliefs`, `families`, `service`, `staff`,
`parents`, `ask`. Every card is optional. **A card with zero items is left off entirely**,
never shipped empty.

## Rules

- **Only the school's own public pages are evidence.** No third-party page and no church
  site. Every card's `sources` lists the specific pages, never a bare homepage.
- **Belief statements are verbatim and whole.** `beliefs.articles` holds the statement of
  faith one article per string, char-for-char, in page order, with no summary and no
  comment. Nothing is softened or left out.
- **A dated governing document about employees is not a statement to families.** It stays
  in the research file (Charlotte Christian's 2014 bylaws are the first case).
- **An unpublished requirement is `status: 'notStated'`**, which renders a dashed NOT
  STATED chip. Never leave it blank and never write "not required": the legend says the
  two are different. The published / not stated tallies are computed from the rows.
- **When the school's pages disagree, print the published fact a parent can check** and
  put the question on the Ask the School card. Do not pick a winner silently.
- **No student is ever named.** A student who spoke in chapel is "an Upper School student
  leader". This area names no student at all, athlete or not.
- **No personal staff detail.** Directory pop-ups can print a personal email address and
  a staff member's children. None of it is carried, here or in the research file.
- **Staff `email` only where the school's own directory publishes it**, never built from
  a name pattern. A person with no published address still renders. The link's subject
  is "<School name> Inquiry" (`schoolInquiryMailto`).
- **No trip prices and no exact travel dates.** Season and year only ("fall 2026").
- **A LEAD is never a fact.** An old enrollment packet, an old magazine, a preview-host
  page or anything read by eye from an image supports no parent-facing statement.
- **Quotes are char-for-char** from the live page, and figures are authored US-style and
  never pre-localized.
- **Research bookkeeping goes in `verify`**, which renders on the dev server only: what
  could not be read, how a pattern was counted, where the school's pages conflict.
  Parent text says what the school publishes or does not.
- **Chips.** `chip: { band: 'JK–4' }` is a grade band, authored once and never
  translated. `chip: { word: 'all' | 'weekly' | 'monthly' | 'yearly' }` renders from
  chrome (`faith.code.*`). On Bible classes, `band` is the grade and `credit` the credits
  as the school prints them (`.5`).
- **Colors.** `colors.brand` / `colors.gold` are the school's own, as in Learning
  Support. The section reuses the `ls-*` classes, so a change to one of those rules must
  be browser-checked on both areas.
