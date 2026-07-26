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

## UX-design standard (required)

**Ingestion and research work enrich data only — they must never change the web app's UX
design.** This applies to the `ingest-source-material` skill and to any workflow, command,
or ad-hoc pass whose job is to incorporate new source material.

**Scope — this standard governs ingestion, not design work.** Design work driven by the
Claude Design MCP (a `design_handoff_*/` import, a `.dc.html` reference, or an explicit
request to build/restyle a section) is *expected* to change the UX and needs **no** advance
approval — the handoff itself is the approval. The same is true of any direct request to add
or restyle UI. The rule below exists so that *ingesting research* never silently grows the
interface as a side effect; it is not a general freeze on UI changes.

- **Allowed:** adding, correcting, and extending the data behind cards and sections the app
  already has; backfilling a school into an existing metric; mapping a new subtopic phrasing
  onto an existing metric key.
- **Needs the user's explicit approval first:** any new card, section, sub-section, stat
  tile, Compare row, metric key, or topic; any reordering of existing ones; any change to
  components, layout, or styling.

If the material seems to warrant a new card or sub-section, **prompt the user and explain
the reasoning** — what the material contains, why no existing card fits, and what the
addition would look like — then wait for approval. Land the data enrichment meanwhile and
report the deferred suggestion; never implement the UX change pre-emptively.

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
