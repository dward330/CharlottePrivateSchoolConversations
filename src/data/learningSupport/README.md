# Learning Support & Student Services — per-school data

One file per school, `<slug>.ts`, exporting a `LearningSupportProgram` (types and the
card registry are in [`../learningSupport.ts`](../learningSupport.ts)). Hickory Grove
Christian was the first school; Cannon followed (2026-10-24), then Davidson Day
(2026-10-25) and Charlotte Country Day (2026-10-25), then Charlotte Catholic
(2026-10-26).

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
- **Staff `email` only where the school's own directory publishes it.** Finalsite
  directories encode the address in `FS.util.insertEmail(el, "<domain reversed>",
  "<local reversed>")`, so reversing it is reading the published address. Never build
  one from a name pattern. A profile with no email gets no `email`, and the person
  still renders. Each address and its directory id is recorded in the school's research
  file. The link's subject is "<School name> Inquiry" (`schoolInquiryMailto`), in
  English in every locale.
- **Testing & Evaluation is about how a learning need is identified, not admission**
  (user rule, 2026-10-25). Its entries cover screening, psychoeducational evaluation
  (in-house, referral or family-supplied), documentation asked for at admission (an
  existing IEP, 504 or evaluation), the intake that decides what support a child gets,
  and testing accommodations for a student with a plan (College Board / ACT). Entrance tests (ISEE, Gesell, readiness visits) belong in the Services
  "Entrance testing" row, never as Testing entries. When the school publishes nothing on
  identification, the card says so with NOT STATED entries rather than filling up with
  admission tests.
- **A person named on the Therapy card goes in `therapy.people`, never only in prose**
  (user rule, 2026-10-25). It renders the same name / role / mailto row as Who You'll
  Work With, under the same `email` rule above, so look up each therapist's or
  pathologist's published address exactly as for the staff list. Don't name them in
  `therapy.note` as well. Davidson Day's speech-language pathologist is the first case.
  `role` is skipped by default, so `therapy.people[].role` is promoted in
  `PATH_OVERRIDES` (`scripts/i18n_fields.mjs`) beside `staff.people[].role`. A new
  people-bearing field needs the same, or its role ships English in every locale.
- **Long staff lists scroll.** Above 20 people the Who You'll Work With list becomes a
  keyboard-focusable scroll region with a count caption; it prints in full. The Therapy
  card's people never scroll.

Build new schools through `/learning-support` → `/plan` → `/implement`.
