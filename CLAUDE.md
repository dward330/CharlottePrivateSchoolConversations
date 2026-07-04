# CharlottePrivateSchoolConversations

A React + TypeScript app (built with Vite) for organizing research on Charlotte-area
private (K–12) schools.

_Placeholder description — more detail to be added as the project develops._

## Working folders

- `.claude/docs/` — reference material and notes (e.g. markdown converted from source files)
- `.claude/skills/` — reusable skills
- `.claude/commands/` — slash commands
- `source-material/` — raw reference files. Bulky/original files (PDFs, spreadsheets) are
  read locally and stay **gitignored**; text-based data files (`.md`) ARE committed (see
  the data-provenance standard below).

## Data-provenance standard (required)

**Whenever you fetch or pull in new school data from an external source (web search,
recruiting sites, school pages, etc.), you MUST persist the underlying hard data and its
sources into the repo — not just the derived number in the app.**

- Save it as a `.md` file in the correct `source-material/<topic>/<school>/` folder,
  named `<School> - <Topic> - <Subtopic>.md` so the ingest pipeline picks it up.
- Include, at minimum: a short provenance header (who/when/how), the **source URLs**, and
  the athlete/record-level detail behind any number you put in the app.
- These `.md` files are committed (the `.gitignore` exempts `source-material/**/*.md`),
  so the repo always retains the hard data even though raw PDFs are not committed.
- Any figure surfaced in `src/data/metricValues.ts` (or elsewhere in the app) must be
  traceable to one of these source files.
