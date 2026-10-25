# Learning Support & Student Services — per-school data

One file per school, `<slug>.ts`, exporting a `LearningSupportProgram` (types and the
card registry are in [`../learningSupport.ts`](../learningSupport.ts)). Hickory Grove
Christian was the first school; Cannon followed (2026-10-24).

## Two gates

The section renders on a school's page only when **both** exist:

1. `source-material/learning-support/<slug>/*.md` — the research record (provenance,
   source URLs, verbatim text). Without it the topic never reaches the school's page.
2. This data file, registered in `PROGRAMS` in `../learningSupport.ts`.

## Rules

- **This school only.** No comparisons with other schools, no "X of N schools", no
  state-funding content (ESA+, Opportunity Scholarship), no public-district evaluation
  route, even where the school's own page links them.
- **Only the school's own pages are evidence.** A service is coded only from what an
  official school page or a PDF it links states. Third-party listings are not used.
- **A gap is shown, never blank.** An unmentioned service carries `code: 'NS'` and
  renders a dashed NOT STATED chip. A blank reads as "not offered", and that is a
  different claim, one the research cannot support.
- **`EXCLUDED` rows stay in the data but never render** in Services at a Glance. The
  exclusion is stated once, in the eligibility card's `scope` cell.
- **Every card's `sources` lists the specific pages** behind its facts — never a bare
  homepage.
- **Quotes are char-for-char** from the live page. A quoted phrase that a page no
  longer carries is reworded or dropped, never kept from an older pass.
- **Figures are authored US-style** (`$1,892`, `K5–12`) and never pre-localized.
- **Glossary markers.** `[[504|Section 504 Plan]]`, `[[iep|…]]` and `[[idea|…]]` render
  as `<abbr>` with the plain-language definition from `learning.glossary.*`. Only those
  three terms are recognised.
- **Colours.** `colors.brand` / `colors.gold` are the school's own. Gold is used for
  rules and fills only; the CSS swaps the ink to a gold tint on the dark theme.
- **Every card is optional.** Leave a key off and the card disappears, except that the
  user's design asks for the therapy card even when all three therapies are NOT STATED,
  because there the gap is itself the finding.
- **No adult staff member is omitted for privacy reasons**, but **no student is ever
  named.**

Build new schools through `/learning-support` → `/plan` → `/implement`.
