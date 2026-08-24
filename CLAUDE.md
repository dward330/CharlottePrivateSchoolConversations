# CharlottePrivateSchoolConversations

A React + TypeScript app (built with Vite) for organizing research on Charlotte-area
private (K–12) schools.

_Placeholder description — more detail to be added as the project develops._

## Working folders

- `.claude/docs/` — reference material and notes (e.g. markdown converted from source files),
  including the generated [`DATA-SCHEMA.md`](.claude/docs/DATA-SCHEMA.md) catalog of every
  level of school data the app presents (see the data-schema standard below)
- `.claude/skills/` — reusable skills
- `.claude/commands/` — slash commands
- `.claude/plans/` — implementation plans (one `.md` per feature) plus `INDEX.md`
- `source-material/` — raw reference files. Bulky/original files (PDFs, spreadsheets) are
  read locally and stay **gitignored**; text-based data files (`.md`) ARE committed (see
  the data-provenance standard below).

## Planning workflow — `/plan` and `/implement`

Non-trivial features and changes are planned before they are built, in two separate
context windows.

**`/plan`** researches the change and writes `.claude/plans/<name>.md`, then registers it
in `.claude/plans/INDEX.md` as *Not implemented*. It asks what to plan and whether you
want a single-word name — that name is the filename and the `/implement` argument, and
declining is a normal choice that defaults to the branch name. It closes by giving you the
exact `/implement <name>` command to run in a new window. **`/plan` never edits app
code**; its only outputs are the plan document and the index row.

**`/implement`** executes a plan. Given a name it reads that plan; given none it lists the
unimplemented ones from the index and asks. It branches, builds the steps, runs the plan's
verification, opens a PR, and flips the index row to *Implemented* with the PR link.

The split is the point: the implementing window has **no memory of the planning
conversation**, so anything decided while planning and not written into the document is
lost. That is the bar a plan is written to.

**Every plan that touches user-facing text is built English-first, in two phases.**
`/implement` builds the feature in English, commits it to the branch, and **stops** — then
translates to every other locale only once the user has reviewed the English and confirmed
the wording. Both phases land in one PR; between them the plan sits at `English shipped`.

This is standing behaviour, not something the user asks for per plan, and `/plan` is
required to write the phase split into the document rather than leave it implied. The
reason is that wording settles only once it is seen rendered, and propagating it to eight
locales beforehand multiplies every revision by eight — into languages nobody here reads.
Plans adding no user-facing text (refactors, build config, data corrections re-using
existing strings) are single-phase and say so.

Get the layer right in Phase 2: UI chrome means the `src/locales/*.json` catalogs in
`TRANSLATED`; research prose means the overlay layer in `PROSE_TRANSLATED`. They are
different lists and different mechanisms — see the i18n standard below.

**Data these commands download is captured like any other research.** If `/plan` or
`/implement` fetches school data while working, it goes into
`source-material/<topic>/<school>/*.md` with its sources and through the
`ingest-source-material` skill — the existing pipeline, unchanged. `/plan` saves what it
fetched and leaves it uningested for `/implement` to run on a branch.

Two more rules that outlive any single plan:

- **Plans are kept after implementation**, updated with the PR and an
  `## Implementation notes` section when the build deviated from the plan. They are the
  record of what shipped and why. Dropped plans are marked `abandoned`, not deleted.
- **The standing gates still apply inside a plan.** A plan that adds a card or section
  needs the UX approval below *before* `/implement` runs, not as a step within it — and
  `/plan` is required to surface that at planning time rather than leave a fresh window to
  discover it at step 1.

See [`.claude/plans/README.md`](.claude/plans/README.md).

### Adding a school — `/add-school`

`/add-school` is the front door to the planning workflow when the change is **a new
school**, rather than a new feature. It asks which school and what city/state, reads the
generated [`DATA-SCHEMA.md`](.claude/docs/DATA-SCHEMA.md), runs a scoped web sweep, and
reports **what percentage of each research area, structured card and Compare row we could
actually populate** — before anyone commits to the work. If the user proceeds, it walks
the thin research areas one at a time to decide include-or-omit, then invokes `/plan` with
that brief, which carries on into its normal `/implement` handoff.

The point is that a school with a thin public footprint yields a page of empty sections,
which is worse than no page — and that is cheap to discover up front and expensive to
discover at ingest time.

**The bar is calibrated to the thinnest school already shipped, and it is computed, not
transcribed.** `npm run coverage:floor` (`scripts/coverage_floor.mjs`) prints every
school's Compare fill rate and research-area count and derives the floor from the weakest.
As of 2026-08-15 that is Davidson Day — 17/30 Compare rows (**56%**), 7 of 8 areas, and no
Summer Programs material at all. The gate is **≥17 of 30 Compare rows and ≥6 of 8 areas**,
compared inclusively: exactly 17/30 passes, 16/30 does not. Counted in **rows, not rounded
percentages** — each row moves the figure ~3.3 points. **Each research area also gets its
own coverage percentage**, pooled across its core prose cards, structured-card field sets
and Compare rows, and judged against the card keys **5–6 of 6** existing schools hold,
never against every key that exists — `the-arts :: courses` sits at 1/6, so its absence is
not a gap.

**The per-area line is ~50%, deliberately NOT the school-wide 56%**, and it is a trigger
for a conversation rather than a pass/fail gate. Three reasons, each of which bit a draft:
the 56% is a rate over 30 Compare rows while an area's denominator is 4–23, so they are
not the same kind of measurement; **Davidson Day — the school the bar is calibrated to —
has no Summer Programs material at all (0%)**, so a 56% per-area gate would reject an area
the project already ships without; and Course Offerings quantizes to 0/25/50/75/100, where
"56%" is unreachable and would silently behave as 75%. **Always print counts beside an
area percentage** — one item swings Sports 4 points and Course Offerings 25.

**An area under the line is not dropped — it is offered a deeper look.** The step-3 sweep is
deliberately shallow, so a low score conflates *the data is not published* with *one quick
pass did not find it*, and deciding include-or-omit on that ambiguity decides on bad
information. The per-area walk therefore offers **dig deeper / include as-is / omit**, and
a deep pass goes past the school's own site (state athletic association, NCES, Form 990,
archived pages, local press). A deep pass that finds nothing is a **useful** result: it
converts a *not-found* into a confirmed `null`, which is what `/implement` and
`check:metrics` need — and it is reported, never softened. The same option is offered
school-wide before a no-go, since a school rejected on a shallow sweep that would have
cleared the bar is the one mistake this skill can make that never gets discovered.

Three properties are deliberate: the floor is a **real school rather than a round number**;
the roster fill rates it derives from reflect **research effort already spent**, so the
test is "could plausibly reach that level with a full research pass," not "scores it on
first sweep"; and the area gate is set one notch looser than the script derives (6/8 vs
7/8), because Davidson Day lacks its one area for a substantive reason while a candidate
may simply be unresearched. The script reports both so the gap stays visible.

Two boundaries make it safe to run speculatively: it **writes no `source-material/`**
(unlike `/plan`) because a sweep sized for percentages produces indicative figures, not the
vetted record — the real deep research happens in `/implement`, and only the **URLs** carry
forward; and it edits no app code. Coverage percentages are always reported as estimates.

Omission is expressed as **absence of data, never as a conditional in a component**: a
topic with no `source-material/` folder does not render, and a structured card whose
optional field is left off its `src/data/<dir>/<slug>.ts` does not render. A card or
division that would list **zero items is omitted entirely** — never shipped as an empty
shell with only a not-published note; the scope note moves to a sibling card. Adding a school
needs no UX approval (§6 of the schema doc — it is automatic everywhere); material that
fits **no existing card** is a new card and still does.

**Every bug found and fixed at the review step triggers a schema-doc check.** When the
user's review of a newly added school surfaces a bug, and it is verified and the fix
applied, always check whether [`DATA-SCHEMA.md`](.claude/docs/DATA-SCHEMA.md) needs
updating for it — a rule discovered through a review bug protects future schools only if
it lands in the doc `/add-school` reads first. The doc is generated: the update goes in
`scripts/gen_data_schema.mjs`, then `npm run schema` + `npm run check:schema`. If no
update is needed, say so explicitly rather than silently skipping the check. (Both
Covenant Day review bugs — the zero-items card and the acceptance-list rank labels —
produced exactly such doc rules.)

See [`.claude/skills/add-school/SKILL.md`](.claude/skills/add-school/SKILL.md).

### NC university admissions data — `nc-admissions-data`

The NC university system publishes a Tableau dashboard giving **Applied / Admitted /
Enrolled per NC high school × per UNC campus**, Fall 2016–2025. That is a
*government-published* admit rate for a school we track, rather than the school's own
marketing figure, so it is unusually good evidence for the College Support area — and it
covers private schools, so **it is worth checking before concluding a school's college
outcomes are "not published."**

The dashboard is canvas-rendered and blocks every simple export path, so the method is
non-obvious and lives in the skill. **Use the skill rather than improvising**: the blocked
paths return HTTP 200 while serving the wrong sheet, and two selection traps produce
plausible-but-wrong tables that render without any error. It is UNC-system campuses only
— a complement to a matriculation list, never a replacement.

**The standing target set is the Top 6 NC public universities**, settled 2026-08-19 and
not to be re-asked or re-derived per task — as **exact dashboard strings**:

```
UNC-Chapel Hill            NC State University        UNC Charlotte
East Carolina University   UNC Wilmington             UNC Greensboro
```

Copy them verbatim. Hyphenation is inconsistent in the dashboard's own house style
(`UNC-Chapel Hill` hyphenated; `UNC Charlotte` / `UNC Wilmington` / `UNC Greensboro` not),
and it is **`East Carolina University`**, not "Eastern" — an exact-match filter fails
**silently** on either slip. The six match US News *National Universities*; the reason
that qualifier matters is that **Appalachian State is ranked *Regional Universities
South***, so "top 6 in NC" is not self-defining and a different six is not
interchangeable. The dashboard still holds all 16 campuses if a task genuinely wants them.

Two rules travel with the data. **Always carry the denominator** — these are small cells
(44 applicants at one campus in one year), so a bare percentage off a single-digit base is
not publishable, the same discipline `/add-school` applies to area percentages. And the
figure is a **joint property of school × university**, not either one's admit rate; label
it accordingly.

**This data has a home in the app: `ncAdmissions`, the FIRST card of College
Support** — *Admission Rates at the Top NC Public Universities* — added 2026-08-19. It leads
the area precisely because its figures are government-published rather than
school-published. The card shows, per school, applied / accepted / admit rate at each of
the Top 6 for the most recent class, plus a **pooled** five-year rate
(`sum(admitted)/sum(applied)`, never the mean of five annual rates). A school with no
dashboard data omits the card rather than shipping an empty shell, and the card is never
described as a matriculation list — it covers UNC-system campuses only. The full rule set
lives in [`DATA-SCHEMA.md`](.claude/docs/DATA-SCHEMA.md), which is what `/add-school`
reads first.

See [`.claude/skills/nc-admissions-data/SKILL.md`](.claude/skills/nc-admissions-data/SKILL.md).

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

## Internationalization standard (required)

The app uses `react-i18next`. Translation strings live **one file per language** in
`src/locales/<lang>.json`, so a translator can be handed a single self-contained file.
To add a language: copy `en.json`, translate the values (keys stay identical), then
register it in `SUPPORTED` and `resources` in `src/lib/i18n.ts`.

**Two text layers, deliberately handled differently:**

- **UI chrome** (nav, buttons, headings, labels, stat captions) — belongs in
  `src/locales/*.json`, reached via `useTranslation()`. Any new user-facing UI string
  MUST be added as a key rather than hardcoded in JSX.
- **Research content** (`src/data/**`, ~165k words of school prose) — deliberately NOT
  in the locale files. This content is regenerated by the ingest pipeline; putting it in
  translation JSON would desync every non-English locale on each ingest pass. When
  translated content is in scope, it should be locale-keyed at the data layer instead
  (e.g. `sportsPrograms/cannon.es.ts`), with English as the fallback.

**Section headings are split by the same test.** A heading that is identical for every
school is chrome and lives in `sections.*` in the locale files, rendered as
`data.xTitle ?? t('sections.…')` with the `xTitle` deliberately absent from the school's
data file. A heading that varies per school (`'Every acceptance, 2023–2025'`) is a research
finding and stays in the data. Never re-add a lifted `xTitle` during ingest — it pins that
heading to English. See "App-layer checklist" in the `ingest-source-material` skill.

**Numbers and currency go through `src/lib/format.ts`.** Tuition figures are authored
US-style in the research data (`'$28,500'`, `'$220K'`) and re-formatted at render time by
`localizeMoneyText()`, so a Spanish reader sees `28.500 US$` / `220 K US$`. Only the
presentation is localized — **the currency stays USD and the amount never changes**; no
figure is ever re-typed, so tuition data cannot drift between languages. Never hand-convert
a number in a data file to "translate" it.

**Shipped languages.** English, Spanish, Bangla (Bangladesh / Dhaka standard),
Haitian Creole, Telugu (Andhra Pradesh), French, Farsi (Persian, formal written
standard), Italian and Hindi are all complete — every topic and the chrome
catalog translated and live. No translation work is open.

**Hindi is the fourth non-Latin script and the second lakh/crore locale.** It
follows the **Telugu** line, not the Bangla one: `hi` is deliberately **absent**
from `FIGURE_SAFE_NUMBERS`, so `$3,683,971` renders `$36,83,971` with Western
digits and a leading `$`. The two lakh/crore locales sit on opposite sides of
that list for different reasons, and the distinction matters before citing
either as precedent — `bn` is on it for **digits AND grouping** (Intl emits
`৩৬,৮৩,৯৭১`, sharing no glyph with the school's published figure), while `hi`
faces **grouping alone**, since its digits are already Western. Hindi therefore
inherits Telugu's documented interaction: a stat tile and the prose beside it
can show one figure two ways (`$36,83,971` vs `$3,683,971`) — tiles regroup at
render, prose figures are never re-typed. Both are correct; see
`src/data/overlays/NOTES.md`. Hindi is LTR, so no bidi/isolate work applies.

**Devanagari breaks like Bangla, not like Telugu — the third distinct failure
mode for the same 43 caps-tracking rules.** Devanagari joins its letters under a
शिरोरेखा headstroke, so the Latin-caps tracking *cuts the stroke*, where Telugu's
vertically-stacked conjuncts survive it and only scatter between clusters.
Measured rather than eyeballed (rasterise `पाठशाला`, count contiguous ink runs
along the stroke row): 3 runs at tracking 0, **5 runs at 0.06em and above**, gaps
widening 3px → 12px. Line-height overlaps through 1.30 and first clears at 1.45;
Hindi ships 1.45 on headings and 1.6 at body. Scoping was verified **in a
browser across all nine locales** rather than by reading the built CSS — a
stronger check than prior rollouts used, and worth repeating.

**Hindi's register axis is how Sanskritized** — the analogue of Telugu's
grānthika/vyāvahārika and Kreyòl's French drift. It targets **मानक हिन्दी**, the
standard of a school circular, and deliberately avoids over-Sanskritized
शुद्ध हिन्दी (`कोर्स` not `अध्ययनक्रम`, `रिपोर्ट` not `प्रतिवेदन`). Domain loanwords are
written in Devanagari (स्कूल, कॉलेज, ट्यूशन) while searchable identifiers stay
Latin (`Upper School`, `GPA`, `AP`). **Hindi has a native-speaker review** — a
Hindi speaker read the rendered pages and accepted the prose (2026-08-23),
closing the Sanskritization-drift axis no automated check can reach. Hindi
therefore ships in the same reviewed position as every other locale. See
[`prose-translation-hi.md`](.claude/docs/prose-translation-hi.md).

**A stale command in every prior rollout doc, found during the Hindi pass.**
The per-topic loop the bn/te/fr/fa docs all quote includes
`check_figures.py --topic financial-aid-tuition`, which **never matched a file**
— the content extractor writes `financial-aid-tuition.content.<lang>.json`. It
failed loudly rather than passing silently, so nothing shipped unchecked, but
the documented command was broken for every locale. `check_figures.py` now falls
back to the `.content` spelling; a genuinely missing topic still exits 1.

**Farsi is the first RTL locale to translate its prose, and both print-outs
passed.** It ships in `TRANSLATED` + `PROSE_TRANSLATED` (PR #69). RTL was the
one real unknown, and the render layer holds: bidi-neutral figures
(`$3,683,971`, `2017–18`, `9.7%`) are wrapped in LRI…PDI isolates so they read
left-to-right inside a right-to-left paragraph, while strong-L Latin identifiers
(`AP Calculus BC`, `Upper School`) need no isolate. `fa` IS in
`FIGURE_SAFE_NUMBERS` — but on DIGITS alone (Eastern-Arabic numerals are
unmatchable against the school's own English figure), the opposite reason from
`bn`'s lakh/crore regrouping. Currency stays USD, amounts never re-typed. The
two Providence Day / Charlotte Latin print-outs (2026-07-31, 64pp + 60pp, fully
expanded) verified all of this. **Farsi has a native-speaker review** — a Persian
speaker read the rendered pages and accepted the prose (2026-08-01), which closes
the one failure mode no check reaches (register, naturalness, whether the prose
over-Arabizes). Farsi ships reviewed, as every locale now does. See
[`prose-translation-fa.md`](.claude/docs/prose-translation-fa.md).

**The first Farsi print-out found a print-path defect class worth remembering:
cards printed COLLAPSED.** Every research `<details>` printed as just its teaser,
so the financial-aid deep-dive and its figures never appeared — and a sticky
side-nav re-laid itself as a mangled RTL band across every page top. Neither is
language-specific; both were invisible to every checker because they are pure
print-media render bugs. Fixed in PR #71: an "Expand all" button plus
`@media print` rules that force every `.note-card > .note-card-body` to
`display:block` and hide `.dossier-nav`. **When adding the next locale, print a
school with the panels ALREADY forced open and confirm the deep-dive figures
actually appear** — a print-out of collapsed teasers reads as clean while
showing none of the part that breaks.

**French keeps its own separator but not its own grouping.** It is the first
locale to group with a narrow no-break space and trail the symbol
(`3 683 971 $US`), yet it is deliberately **absent** from `FIGURE_SAFE_NUMBERS`
— because its grouping is still 3-3-3, so the group boundaries never move and a
figure stays recognisable against its English source. That list exists for
lakh/crore *regrouping* (`bn`), not separator swaps; the precedent is Spanish,
which also diverges on separators and is likewise excluded. One knock-on:
`check_bn_numerals.mjs` only asserts the 3-3-3 shape for locales inside the
list, so it correctly stays silent about `fr`, and the per-topic
`check_figures.py` sweep is the real guard.

**Percent signs stay unspaced in every locale, French included.** French
orthography wants `80 %` and `Intl` agrees — but these percentages are citations
a parent matches against the school's own page, the sweep reads the space as a
dropped figure, and `es`/`ht`/`te` all ship unspaced despite Spanish having the
same convention. The `%` travels with the digits.

**French inverts the Telugu leak shape, and needed its own checker.** Telugu
leaked via *a sentence wearing an identifier's clothes* — catchable by the skip
audit. French leaks the other way: `French III Honors` and
`AP French Language and Culture` are searchable course codes that, in French
only, read as translatable prose, sitting in the same file as
`A five-level French sequence.` which genuinely must move. Both are correctly
classified as prose, so no existing check could see the difference.
`scripts/check_fr_identifiers.mjs` (`npm run check:fr`) guards the 977 affected
strings.

**Coverage at 100% does not mean the page renders the language.** A shipped
overlay entry resolves only if its FNV-1a stamp still equals the hash of the
live English at that field path; otherwise the runtime falls back to English
**silently** — no error, no coverage change. Two checks cover this, and they are
not interchangeable: `scripts/check_runtime_resolution.mjs` (`npm run
check:runtime`) recomputes every stamp from the **work file's** `text`, which
catches a corrupted build step but *cannot* see English prose edited in
`src/data` after extraction — the work file and the overlay then agree with each
other and disagree with the app. `scripts/check_live_resolution.mjs` (`npm run
check:live`) walks the **live** modules and is the one that catches that.
Between them they are the last checks that run without a browser.

**`check:live` is a build gate, and the topic layout is defined exactly once.**
It was previously unusable: it carried its own six-topic map against the
extractor's nine, so four of the ten shipped overlay files were compared against
English that was never loaded, and it sat at a permanent **4,646 "unresolvable"
entries — every one a false positive**. A checker parked at a non-zero number
stops being read; the same failure mode already recorded above for
`check:sepdrift`. Fixed 2026-08-20 (PR #167): `scripts/i18n_topics.mjs` is now
the single source of truth for `TOPICS` / `ACCESSORS` / `EXTRA_LAYERS` /
`EXPORTS` / `SLUGS`, imported by the extractor and all three checkers —
**never re-declare any of them locally.** `check:live` also refuses to compare a
topic that contributed zero live English, reporting one wiring-bug line instead
of thousands of phantom stale entries, and it is chained into `npm run build`.

Two things this cleared up. The accessor modules (`courseOfferings.ts`,
`financialAidReports.ts`, `metricValues.ts`, `clubClusters.ts`,
`clubCatalog.ts`) **do** import under plain Node — the `import.meta.glob`
constraint that forces `gen_data_schema.mjs` to parse the `*Program.ts`
registries does not apply to them; and `clubClusters` / `clubCatalog` are
accessor **functions taking a slug**, so walking the bare export yields nothing
and reads as "this layer is empty". Widening the same list also un-blinded
`check_chrome_keys.mjs` and `i18n_audit_skips.mjs`, which had been auditing five
of nine topics.

**`FOREIGN_TOPICS` is now a verified claim, not a trusted one.** `check:live`'s
guard tells a maintainer facing a red build to add the offending topic to a
one-line allowlist in `check_live_resolution.mjs` — and nothing asked whether
that edit was honest. Adding `sports` turned a build-blocking gate green while
**silently dropping 995 shipped entries per locale** from the check: a
documented bypass inside a build gate, which is worse than no gate. Fixed
2026-08-20: every shipped overlay topic must now be accounted for by **exactly
one** of `TOPICS` (`i18n_topics.mjs`) or `FOREIGN_TOPICS` — being in both is a
contradiction and fails — and every `FOREIGN_TOPICS` entry is **positively
verified against the content extractor**: the topic must be one
`i18n_extract_content.mjs` will accept, and every shipped block hash must
reproduce from a fresh extract of `src/content/**` (70/70 today). A stale or
misspelled entry fails as stale rather than passing as a silent no-op. Note the
evidence is positive — *"this source was found in `src/content` and these blocks
were made from it"* — not the absence a typo also produces.

Three things travel with it. The extractor **cannot be imported** — it calls
`main()` at module scope, so `await import()` exits the *calling* process with
code 2; drive it as a subprocess and re-parse its `LIVE` map from source, the
same technique `check_live_all.mjs` uses for `PROSE_TRANSLATED`. The verification
run uses a throwaway `--lang __verify` because the extractor's carry-over branch
would otherwise **rewrite a real work file**. And the check is **not airtight and
cannot be**: gate 1 delegates "is this a real foreign topic" to that `LIVE` map,
so the bypass is now two files and self-contradicting rather than impossible —
whether a genuinely new extractor warrants an entry stays a human judgment.

**Correction: the content overlay does NOT hold "0 strings".** Both the
`checklive` plan and the old `FOREIGN_TOPICS` docstring said so; it holds **70
fully translated blocks per locale**. The error came from asking for `.strings`,
which that overlay does not have — it carries a `blocks` **object** keyed by
hash, written by a different builder than `i18n_build_overlay.mjs`. That shape
divergence is a *second, independent* reason the file is skipped, which is
precisely why nobody noticed the allowlist was unverified: two belts on the same
trousers, neither of them checked.

**Second correction, measured 2026-08-20: those 70 blocks were NOT "covered by
`check:runtime` but not by `check:live`."** That line — here, in the
`FOREIGN_TOPICS` docstring and in `chromeguard.md` — read as *the resolution gap
is open*, and it was wrong. `check:live`'s **gate 2** requires
`shipped ⊆ fresh extract of src/content/**`, and a hash is a stamp of the live
English, so it already fails the build on a live `src/content` edit
(`Platform: Clarity` → `ClarityX` exits **1** here and **0** under
`check:runtime`). Gate 2 was written to prove the allowlist entry is *honest*; it
does the resolution job under another name.

What was genuinely uncovered is a **different** failure — a block whose hash is
valid but whose translated value is empty, still English, or garbage. Both
checkers exited 0 on all three. **`check:live` gate 3 now closes it** (PR #171):
per shipped block it asserts the value is non-empty, not byte-identical to its
English, and — for English ≥80 chars — within 0.4–2.5× its length, bounds
calibrated against all 9 × 70 real blocks (observed 0.758–1.438) before being
enforced. It found **14 genuinely untranslated blocks** on its first run (`fr` ×5,
`hi` ×4, `it` ×5), all fixed in the same PR. Gate-3 findings report on their **own
exit path**: the remedy is to fix the translation, never to edit `FOREIGN_TOPICS`.
One hash is allowlisted as legitimately identical (`c4e4dc86`, a `---` rule);
the five Wayback tuition-quote blocks are deliberately **not**, because each wraps
its verbatim quote in framing prose that six or seven locales correctly translate.

**The residual gap was the same wrong-but-well-formed class across the *other*
nine overlays** — 11,341 entries per locale versus 70 here. **Half-closed
2026-08-21 (PR #172), and the half that is deliberately left open is the
interesting part.** `check:runtime` now applies the same two cheap rules to all
ten overlays — non-empty, and a length ratio for English ≥80 chars — and it is
**chained into `npm run build`** for the first time. Both rules were 0-finding
across all nine locales before being enforced, and the ratio constants
(`RATIO_MIN_LEN = 80`, `RATIO_LO = 0.4`, `RATIO_HI = 2.5`) are the *same* ones
`check_live_resolution.mjs` calibrated for the content overlay, re-measured here
rather than assumed to transfer: 38,691 pairs span 0.554–1.753, comfortably
inside them.

**The third rule — byte-identical-to-English — ships as a REPORT and must not
become a gate.** `--report-identical` (exit 0 always) finds **~2,200 per locale /
19,754 total**, and the overwhelming majority are legitimate keeps: course codes,
figure labels, grade bands. Enforcing it would park the build at ~2,200 findings
and make it the repo's **third** permanently-red checker after `check:sepdrift`
and `check:live`-at-4,646 — a failure mode this file already records twice.
Collapsed by identity there are 2,756 distinct `(topic, hash)` pairs, and the
band is what separates keep from leak: **1,499 are identical in all 9 locales**
(consensus keep) while **344 sit at 1–2 locales** (leak-shaped). Triaging those
344 is a separate pass; do not flip the report to exit 1 to force it.

**Two smaller things fixed alongside, both of the pass-by-doing-nothing kind.**
`workEnglish()` read only `w.sections`, but the nine `src/data` work files key
their units under **`strings`** — so it returned an **empty Map** for all nine,
and any check built on it would have verified zero pairs while reporting success.
And `check:runtime`'s `byStamp` skipped every unit with a falsy `t`, which would
have reported the repo's one legitimately-empty pair (`financial-aid-report`
`811c9dc5`, English `""` and translation `""` in all nine locales) as *orphaned*
if the build ever shipped it. The empty rule tests **the English**, never a
hardcoded hash — a hash exemption breaks the moment its English is edited, which
is also why there is **no hash allowlist** here at all.

**The day vocabulary is chrome, is closed, and is no longer weekdays-only.**
`day` / `days` / `dayFilters` are skipped by the prose extractor on the promise
that the UI renders them from a locale key. `'Half day'` — a duration, not a
weekday, used because Charlotte Catholic publishes no weekday pattern for its
camps — had **no such key**, so `dayLabel()`'s `defaultValue` returned raw
English on that filter chip in all nine locales. The raw value is now **slugged**
into the key (`'Half day'` → `afterSchool.day_Halfday`, via
`v.replace(/[^A-Za-z0-9]/g, '')`) so a value with a space or punctuation still
resolves; the slug is defined identically in both `dayLabel()` copies
(`SummerPrograms.tsx`, `AfterSchool.tsx`) **and** in `check_chrome_keys.mjs`,
which must compute the same key the component looks up. Every member needs a key
in **all ten** `src/locales/*.json` catalogs. Only the *label* is translated —
the English token stays the state value, because `days` and `dayFilters` are
compared by value for filtering, exactly as `'All'` already works.

**`npm run check:chrome` is the gate, and it now reads all ten catalogs.** It
previously read **only `en.json`**, and it is one of just two scripts under
`scripts/` that read `src/locales/` at all — so **nothing in this repo verified
that a chrome key existed in the other nine catalogs.** A key added to `en` and
forgotten elsewhere passed every check while rendering English to every
non-English reader: the same silent-fallback class one layer up. It parses
`TRANSLATED` from `src/lib/i18n.ts` rather than hardcoding the list, and reports
two states on **separate exit paths** — a key missing everywhere (a broken
promise, exit 1) versus present in `en` and awaiting translation (named in full,
exit 0). That split is what lets an English-first Phase 1 ship green without the
gate going quiet.

**The figure sweep cannot see a separator swap — run `check:sepdrift` too.**
`check_figures.py` NORMALISES 3-3-3 group separators before comparing, so a
figure that kept its digits but swapped separators (`20,642` → `20.642`,
`4.33` → `4,33`, GPA `0.5` → `0,5`) reads as a match. Those are still forbidden
re-typings: a figure is copied **char-for-char** from its English source,
because a parent matches it against the school's own page. 64 such re-typings
shipped past the sweep during the Italian rollout, concentrated in
`college-support` GPA decimals. `scripts/check_sep_drift.mjs`
(`npm run check:sepdrift -- --lang <code>`) closes it by requiring every
separator-bearing numeric token in a `t` field to appear verbatim in that
entry's English `text`. It matters **more** for a lakh/crore locale, not less:
because `hi`/`te` regroup at render time, the data must still store the English
3-3-3 figure, so a work file containing `$36,83,971` has hardcoded a regrouping
the render layer would then apply a second time.

**166 such re-typings shipped in `es` and were fixed 2026-08-19** (PR #159) —
GPA scales (`4.33` → `4,33`), quality points (`+0.5` → `+0,5`), quintile spreads
and, worst, `1,213` AP exams rendered `1.213`, which reads as *one point two one
three*. They predated the checker and had sat at 178 for months.

**Unit conversions are NOT drift, and the checker now knows the difference.**
`es` alone renders `53,000 sq ft` as `4.924 m²` and `6-foot-10` as `2,08 m`.
Those tokens are absent from the English by construction, so they flagged as
drift for months and masked the 166 real re-typings above — a checker at a
permanent non-zero reads as broken and stops being read. `CONVERSIONS` in
`scripts/check_sep_drift.mjs` pins each accepted pair as **token + a source
figure that must appear in the same entry's English text**, so `4.924` is
forgiven only where the English actually says `53,000 sq ft`; the same token
anywhere else is still a finding. Every pair is arithmetic-verified, and both
properties are regression-tested by hand (a genuine `4.33` → `4,33` is still
caught; an allowlisted token moved to an unrelated entry is still caught).

**Open content question, deliberately not settled:** whether converted units
belong in this data *at all*. Today only `es` converts, so a French or Italian
reader — equally metric — gets square feet while a Spanish reader gets metres.
Either answer is defensible; the current one-locale state is the only option
that is not. Settle it and `CONVERSIONS` moves with it.

**French has a native-speaker review.** French speakers read the rendered pages
and accepted the prose (2026-07-30) — register, hedge strength, and the choice
to leave `Upper School` and `French III Honors` in English. French therefore
ships reviewed, as every locale now does.

**Its two print-out rounds found four defects, three of them cross-locale, and
every automated check had passed on all four.** Charlotte Latin (65pp) found a
`18 h 00` clock tile, prose money that never localized, and a hardcoded `US$`
symbol; Providence Day (80pp) found the topic-header stat tiles rendering raw.
Three separate render paths were bypassing `localizeMoneyText()` — invisible to
English readers by construction, which is why no checker saw them. Two new
checks now close that class: `npm run check:currency` and `npm run check:money`.

**Telugu keeps native lakh/crore grouping** — it is deliberately absent from
`FIGURE_SAFE_NUMBERS`, the opposite of the `bn` line, so `$3,250,000` renders
`$32,50,000`. This makes it the first locale where a stat tile and the prose
beside it show the same figure two ways (`$36,83,971` vs `$3,683,971`): tiles
are regrouped at render, prose figures are never re-typed. Both rules are
intentional and neither was changed; the interaction is written up for a
reviewer in `src/data/overlays/NOTES.md`.

**Telugu has a native-speaker review.** A Telugu speaker read the rendered pages
and accepted the prose (2026-07-29). That closes the one failure mode no check in
this repo can reach — register, naturalness, whether the wording drifts toward a
formal/Sanskritized style a parent would not use. Telugu ships reviewed, as
every locale now does.

**Every shipped locale now has a signed-off native-speaker review.** Haitian
Creole was the last one outstanding: it originally shipped **accepted without a
review** (2026-07-29), leaving its register — specifically whether the prose
drifts toward French — unchecked by a speaker. A Kreyòl speaker read the
rendered pages and **accepted the prose (2026-08-23)**, working from the
soft-spot list in `src/data/overlays/NOTES.md`, which was written for exactly
that pass.

That closes the one failure mode no automated check in this repo can reach —
register, naturalness, whether the wording drifts toward a neighbouring
language or an over-formal register. **There is no longer an "unreviewed
position"**, so do not cite Kreyòl or Hindi as precedent for shipping one; a
future locale is unreviewed only until its own review lands.

To add a language, follow the rollout docs rather than re-deriving the method:
[`prose-translation-bn.md`](.claude/docs/prose-translation-bn.md) is the worked
example for a non-Latin script and
[`prose-translation-ht.md`](.claude/docs/prose-translation-ht.md) for a Latin
one (each opens with a START HERE block), and
`prose-translation-architecture.md` holds the language-independent mechanism.
[`prose-translation-fr.md`](.claude/docs/prose-translation-fr.md) is the most
recent and the only one whose §1 register rule **inverts** an earlier doc's:
for Kreyòl, drifting toward French was the failure mode to avoid; for French
that same output is simply correct. Read a prior doc for the *method*, never
for a register rule to inherit unexamined.

**A browser print-out is a required step, not a formality.** Every defect found
after the data read 100% has been render-layer, and the last two were not even
specific to the language being added:

- Both Bangla numeral bugs (digits, then lakh/crore grouping).
- An English footer disclaimer in `src/App.tsx` — bare JSX text, shipping to
  *every* non-English locale, invisible to grep and to all five checkers.
- `localizeMoneyText()` branching on `lang().startsWith('en')`, so `3.25 M US$`
  rendered beside `$36,500` on one Kreyòl page. Placement now comes from
  `Intl.formatToParts` (PR #61).

The last two share a shape worth watching for: **code that treats "not English"
as one bucket.** It survives while every added locale matches that bucket, and
breaks on the first that does not.

Run the print-out on **two** schools — Charlotte Latin exercises flag-chip and
hedge paths Providence Day never touches — and in a **real browser**. A headless
render passed Latin clean; the 65-page browser print-out found the currency bug.

**The recurring leak shape: a sentence wearing an identifier's clothes.** Four
print-out defects, three of them this: a hedge in a proper-noun field
(`ensembles`), a hedge in a sport column (`Not published`), a caveat in a citation
slot (`Staff backgrounds partly from…`). Each field was classified correctly for
the values it held when it was classified, and each later gained one value that
was prose. When adding a locale, grep the *rendered* page for English sentences in
**table cells, chips, and source lines** — the places where a short label passes
for a code. That is where all of them lived.

**A skipped field can be right about 12 values and wrong about the 13th.**
`ensembles` is classified "proper noun — ensemble name", correctly — except for
one hedge sentence that therefore shipped as English to all four non-English
locales. `i18n_audit_skips.mjs` would have flagged it, but collection stopped at
8 values per field and it was the 9th of 55, so the audit passed clean. The cap
now applies only to display. Beware any check whose sample size doubles as its
coverage.

**Expand the collapsed panels, and check an unabbreviated 7-digit figure.** A
default school page renders ~17k characters; with every `<details>` opened it is
~152k, and the financial-aid sections holding the large figures are collapsed on
load. `$3.25M`-style tiles prove nothing about digit grouping — only figures like
`$3,683,971` do. Skipping either step makes the print-out report clean without
having looked at the part that breaks (Telugu, 2026-07-29).

**PARTLY-OPEN DEFECT — English strings in figure/identifier fields.** Surfaced
by `i18n_audit_skips.mjs` during the French rollout. Re-measured 2026-08-19; the
original table was wrong in three ways, so the corrected one is below. Two rows
are now **fixed**, four are **deliberately left**:

| Value | Field | File | Status |
|---|---|---|---|
| `The 2023–24 peak`, `The 2025–26 decline` | `seasonDetail[].program` | `sportsPrograms/davidson-day.ts` | **FIXED 2026-08-19** — framing moved into the adjacent `text`, which is extracted; `program` is now the bare season (`2023–24`) |
| `Football — Estep era`, `Football — James era` | `bars[].program` | `sportsPrograms/charlotte-christian.ts` | left — see cost below |
| `2 years`, `1 credit` | `value` | `artsPrograms/cannon.ts`, `davidson-day.ts` | left — figure field |
| `15-yr (2024–25 profile)`, `15-yr (2021–22 profile)` | `year` | `collegeSupportPrograms/charlotte-christian.ts` | left — figure field |

**Three corrections to the original entry.** It said `program` is "a genuine sport
name for 23 of 27 values"; the real counts are **2 editorial of 34** at
`seasonDetail[].program` and **2 of 42** at `bars[].program` — two separate paths,
not one field. It listed `(2021–22 profile)` where the actual value is
`15-yr (2021–22 profile)`. And it **omitted `Football — James era`**, which has the
identical defect.

**Why the remaining four are left, on purpose.** `bars[].program` is a chart bar
label whose siblings are `record`/`pct`/`tag` — there is no adjacent prose field to
move the era phrase into, so the only fix is promoting the path in `PATH_OVERRIDES`,
which would newly extract **40 sport names** into nine locales to translate 2
strings. The `value` and `year` rows are figure fields holding a unit word
(`2 years` sits beside `22`, `1 AP`, `298`, `89%`, `11,486 sq ft`); treating them as
prose means extracting every figure in the app. Both are judged not worth it —
recorded as a decision, so a later pass does not re-litigate them as bugs.

Rules of thumb: never concatenate sentence fragments — use interpolation
(`{{count}} schools`) so word order can change per language. Use i18next's `count`
option for anything pluralized rather than hand-rolling `s` suffixes.

## Search-indexability standard (required)

The site is a client-rendered SPA, but every indexable page is **pre-rendered to a real
file** at build time so crawlers and link-preview scrapers get real HTML. Live since
2026-08-06 (PRs #105–#108).

**The whole surface is generated from `src/data/schools.json` — do not hand-write any of
it.** `scripts/seo_routes.mjs` is the single route list; `prerender.mjs` writes the pages,
`gen_seo_files.mjs` writes `robots.txt` + `sitemap.xml`, and `check_seo.mjs` asserts they
agree. All three are chained into `npm run build`, so **adding a school automatically adds
its pre-rendered page, its sitemap entry and its `hreflang` alternates.** Verified by
experiment, not assumed.

**Run `npm run check:seo` after anything that touches routes, `<head>`, or the school
list.** It fails the build when a route has no pre-rendered page (the failure mode is
silent otherwise: the SPA keeps working for anyone who clicks in, while deep links 404),
and it also catches a page under the byte floor, a duplicate or still-default `<title>`,
a missing/oversized meta description, a canonical that disagrees with the sitemap, and a
`LOCALES` list that has drifted from `TRANSLATED`.

Four things that are **not** automatic:

- **A new ROUTE** (not a new school) must be added to `ROUTES` in `seo_routes.mjs`, or it
  is unreachable by deep link. `check:seo` cannot catch a route it was never told about.
- **`LOCALES` in `seo_routes.mjs` is a hand-kept mirror of `TRANSLATED`** in
  `src/lib/i18n.ts`. Shipping a locale without updating it under-advertises the language.
  `check:seo` DOES catch this — it re-parses `TRANSLATED` and fails on drift.
- **Meta descriptions are composed** in `src/lib/head.ts` from school and topic names, so
  adding a topic lengthens every one of them at once. They must stay ≤160 chars or search
  engines truncate them; `check:seo` enforces both ends of that budget.
- **`npm run deploy` is the user's call, every time.** Merging is not publishing, and
  `Published` in the deploy output is not the same as the GitHub Pages *build* finishing —
  check `gh api repos/OWNER/REPO/pages/builds --jq '.[0].status'` before believing a live
  URL 404 means something is wrong.

**Path URLs are canonical; the hash router is a permanent compatibility layer.** Shared
`#/school/…` links are already in the wild (Facebook is the #2 referrer), so `parse()`
keeps its hash branch and `src/main.tsx` rewrites legacy URLs to the path form on load.
Never remove the hash fallback.

**A crawler check is a browser check.** Two defects here shipped past every source-level
check because they were pure render-layer: pre-rendered English markup flashing to
non-English readers (fixed by hiding `<body>` pre-paint — measure `visibility`, NOT the
DOM, which transitions identically either way), and page-view URLs fragmenting Cloudflare's
dashboard. See `.claude/plans/seo.md` and the memory notes for both.

## Data-schema standard (required)

[`.claude/docs/DATA-SCHEMA.md`](.claude/docs/DATA-SCHEMA.md) is the standing catalog of
**every level and category of school data the app presents** — the schools × research-area
grid, the prose card keys within each area, the typed structured cards, the Compare rows,
and the standalone catalogs. Read it to answer "what do we hold on a school, and where does
it live?" without spelunking `src/data/`.

**It is GENERATED — never hand-edit it.** `scripts/gen_data_schema.mjs` derives every
number, key and label by reading the live modules (`schools.json`, `metrics.ts`, the six
`*Program.ts` card registries, `metricValues.ts`). A hand-written schema doc is stale the
first time someone adds a metric, and nothing tells you it went stale; generating it is
what makes "always up to date" true rather than aspirational.

- `npm run schema` — regenerate after touching any data layer.
- `npm run check:schema` — fails if the doc has drifted. **Chained into `npm run build`**,
  so a new research area, card, or Compare row cannot ship with the doc left behind.

Two things worth knowing before editing the generator:

- **The six `*Program.ts` modules cannot be imported under Node.** Each calls
  `import.meta.glob` at module scope for its locale overlays — a Vite compile-time
  transform that throws in plain Node, and one the modules deliberately do not guard
  (a runtime guard survives into the bundle and silently kills every overlay). The
  generator therefore *parses* those card registries out of source rather than importing
  them. `metricValues.ts` and `metrics.ts` import fine and are imported.
- **The doc flags ⚠️ on unmatched subtopics** — keys that no `RULES` entry produced, which
  slugified into a card by accident. That is the same finding `npm run check:metrics`
  reports, surfaced where the card list is read. As of 2026-08-15 one is outstanding:
  `college-support :: acceptances-window-2023-2026`.

The doc records what the app *presents*. It is not a substitute for the UX-approval gate —
if a new row appears in it that nobody approved, that is the gate being bypassed, not the
schema growing.

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
