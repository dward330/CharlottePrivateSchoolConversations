---
name: removetuitionhistorybullets
title: Strip the provenance bullet lists from the Tuition History cards
status: implemented
phases: 1
created: 2026-08-29
branch: feat/remove-tuition-history-bullets
prs: [242, 243]
---

# Strip the provenance bullet lists from the Tuition History cards

## Goal

The **Tuition History & Sources** card currently renders the research dossier's internal
sourcing apparatus — long bulleted lists of Wayback timestamps and verbatim archived
quotes — in between the tables a parent actually came for. Remove those bullet lists (and
any heading left with nothing under it) so the card reads as: **table → heading → footer
paragraph**, and nothing else.

Applies to all **four** schools that carry this card: `cannon`, `charlotte-country-day`,
`davidson-day`, `covenant-day`.

Done when each of the four school pages shows only tables, their headings, and their
trailing explanatory paragraphs — with no bulleted provenance, no orphaned heading over an
empty section, and `npm run build` green (which includes `check:live`, the gate that would
otherwise fail on orphaned overlay blocks).

## Context

### Where the content comes from

The card is **not** the structured `FinancialAidReport` component. It is a **prose card**,
key `tuition-history`, label `Tuition History & Sources`, produced by the rule at
[src/lib/metrics.ts:96-102](src/lib/metrics.ts#L96-L102). Its pipeline:

```
source-material/financial-aid-tuition/<school>/<School> - ... - Tuition History.md
  → .claude/skills/ingest-source-material/build_docs.py   → .claude/docs/financial-aid-tuition/
  → scripts/build_site_content.py                         → src/content/financial-aid-tuition/<school>.json
  → src/lib/prose.ts (parseProse)  +  src/components/ProseContent.tsx   → the rendered card
```

`build_site_content.py` already strips *top-level* provenance sections: `PROVENANCE_HEADING`
at [scripts/build_site_content.py:142-145](scripts/build_site_content.py#L142-L145) matches
a whole `## Provenance` / `## Source snapshots` / `## Method` subtopic and drops it. That is
why Cannon's `## Provenance` and `## Source snapshots` sections never reach the app. It does
**not** reach a `###` sub-heading nested inside a surviving section — which is exactly how
Covenant Day's `### Source snapshots` still renders.

### The architectural precedent this plan follows

[src/lib/prose.ts:40-56](src/lib/prose.ts#L40-L56) states the rule for this exact situation,
about research-gap language:

> So the notes keep it and the app hides it — the filter runs here, at parse time, rather
> than in `source-material/`, so the dossiers stay complete and re-ingest can never
> reintroduce the language into the UI (see the data-provenance standard in CLAUDE.md).

**Follow that pattern.** Filter at parse time in `src/lib/prose.ts`. Do **not** delete the
bullets from `source-material/**` — they are the provenance record the data-provenance
standard exists to protect, and a future re-ingest would silently put them back on the page.

### What renders today, per school

Verified by reading `src/content/financial-aid-tuition/<school>.json`.

**cannon** — subtopics after the Deep Dive Report:
| Subtopic | Content | Verdict |
|---|---|---|
| `Tuition History` | title line only | already sub-40-chars, dropped by the builder |
| `Tuition by band and school year` | 6-year price table, then `Per-column sourcing (verbatim quotes from the retrieved snapshots):` + **6 Wayback bullets** | keep table, **drop lead-in + bullets** |
| `Related detail captured in the same snapshots` | **2 bullets only** (tuition deposit; NC Opportunity Scholarship) | **drop the whole section incl. its heading** — zero content remains |
| `Year-over-year increases (…)` | % table + closing paragraph + `---` | keep entirely |

**charlotte-country-day**:
| Subtopic | Content | Verdict |
|---|---|---|
| `Tuition by band and school year` | 4-year price table, then `Per-column sourcing:` + **4 bullets** | keep table, **drop lead-in + bullets** |
| `Note on the published 5.0% increase` | para + rounding table + closing para — **no bullets** | keep entirely |
| `Year-over-year increases (…)` | % table + closing para | keep entirely |

**davidson-day**:
| Subtopic | Content | Verdict |
|---|---|---|
| `Tuition by division and school year (…)` | table, then `Per-column sourcing (verbatim quotes…):` + **5 bullets** | keep table, **drop lead-in + bullets** |
| `Reduced-day early-childhood options (…)` | para + table + `Source: same snapshots…` para — **no bullets** | keep entirely |
| `Fees captured in the same snapshots` | fee table only, no bullets | keep entirely |
| `Financial aid detail captured in the same snapshots` | **3 bullets only** | **drop the whole section incl. its heading** — zero content remains |
| `Year-over-year increases (…)` | % table + closing para | keep entirely |

**covenant-day** — structurally different: the entire card is ONE subtopic (`Tuition History`)
using `###` sub-headings rather than separate subtopics.
| Sub-heading | Content | Verdict |
|---|---|---|
| (lede) `# Covenant Day School — …` | title line | unchanged by this plan |
| `### Tuition by band and year` | the price table | **keep the heading and table** |
| ↳ trailing para | `A flat-dollar (not percentage) increase across bands.` | **DROP** — confirmed by the user's screenshot, 2026-08-29 |
| `### Source snapshots` | renders as a **source chip** + an orphaned `(captured 2026-08-15)` paragraph + **1 bullet** — see below | **drop the heading and all three fragments** |
| `### The year-pinning decision` | heading + one paragraph | **keep entirely** |

**⚠️ Covenant Day's `Source snapshots` is NOT a bullet list — do not filter it as one.**
[src/lib/prose.ts:607](src/lib/prose.ts#L607) flips the parser into `sources` mode on any
heading matching `/source/i`, so this section is emitted as a `kind: 'sources'` **chip block**,
not a `kind: 'list'`. The rendered result splits the first source across three separate blocks:

- the `2026-27 table:` line becomes the **`covenantday.org ↗` source chip**;
- its wrapped continuation `(captured 2026-08-15)` is orphaned into its **own paragraph**,
  which renders *above* the remaining bullet;
- only the `2025-26 table:` line survives as an actual bullet.

A filter written against "drop the list" leaves the chip and the stray `(captured …)` line on
the page. Drop the whole `Source snapshots` section — heading, chips, paragraphs and list
alike — regardless of block kind. The user's screenshot circles all three fragments.

### Why an empty heading is not acceptable

[src/components/ProseContent.tsx:194-206](src/components/ProseContent.tsx#L194-L206) renders
`<section className="prose-section">` with its `<h4>` whenever a heading exists, regardless of
whether `s.blocks` is empty. A section stripped down to nothing therefore ships as a bare
heading. That is precisely the shape the repo's **no-empty-cards** rule forbids (CLAUDE.md,
`/add-school`: *"A card or division that would list zero items is omitted entirely — never
shipped as an empty shell"*). So the filter must drop the heading along with its last block.

### The i18n consequence — this is the part that fails the build if missed

Research prose for this topic ships through the **content overlay**, not the `src/data`
overlay: `src/data/overlays/financial-aid-tuition.content.<lang>.json` for each of the nine
`PROSE_TRANSLATED` locales (`es bn ht te fr fa it hi ar`, from
[src/lib/i18n.ts:182](src/lib/i18n.ts#L182)). Those files are **keyed by FNV-1a content
hash**, not by position — see `scripts/i18n_build_content_overlay.mjs`. Two consequences:

1. **Surviving blocks need no re-translation.** Their English is untouched, so their hashes
   are unchanged and their translations keep resolving. This is why the change is *not*
   two-phase.
2. **Removed blocks become orphans, and orphans FAIL THE BUILD.**
   `scripts/check_live_resolution.mjs` gate 2 requires `shipped ⊆ fresh extract`
   ([scripts/check_live_resolution.mjs:362-373](scripts/check_live_resolution.mjs#L362-L373)),
   and `check:live` is chained into `npm run build`. The overlays MUST be rebuilt.

The blocks that go orphan, confirmed by reading the `at:` attribution in
`src/data/overlays/work/financial-aid-tuition.content.es.json`:

| Hash | English (start) | Schools attributed |
|---|---|---|
| `e3d21029` | `Per-column sourcing (verbatim quotes from the retrieved snapshots):` | **cannon AND davidson-day** |
| `92553f5e` | `- **2021–22** — Wayback \`20220127142845\`…` | cannon |
| `e5dc020e` | `Related detail captured in the same snapshots` (heading) | cannon |
| `a540e708` | `- **Tuition deposit** rose from $1,500…` | cannon |
| `7347ae01` | `Per-column sourcing:` | charlotte-country-day |
| `78e448bd` | `- **2023–24** — Wayback \`20230607192006\`…` | charlotte-country-day |
| `df673496` | `- **2022–23** — Wayback \`20220520180654\`…` | davidson-day |
| `750bf6c4` | `Financial aid detail captured in the same snapshots` (heading) | davidson-day |
| `45fe4467` | `- **Maximum award floor** — verbatim from…` | davidson-day |
| `da29949f` | `A flat-dollar (not percentage) increase across bands.` | covenant-day |
| `128944dc` | `### Source snapshots` | covenant-day |
| `1f82f9d2` | `- 2026-27 table: https://www.covenantday.org/…` (holds BOTH source lines and the `(captured …)` tail — the three-way split is a render artefact, not an overlay one) | covenant-day |

**`e3d21029` is shared by two schools** — identical English text hashes to one block. Both
schools lose it here, so it does orphan; but do not assume a 1:1 school↔block mapping when
re-deriving this list. **Re-derive it from the actual work file rather than trusting this
table** — it was read on 2026-08-29 and the `es` work file was used as the representative;
all nine locales share the same hash set.

## Decisions

- **Filter at parse time in `src/lib/prose.ts`, not by editing `source-material/**`.**
  Follows the documented precedent at prose.ts:40-56 and satisfies the data-provenance
  standard: the dossiers stay complete, and re-ingest cannot reintroduce the bullets.
- **Single-phase.** It adds no user-facing string and re-uses no new key. Every surviving
  English block is byte-identical, so its content hash and its nine translations are
  unchanged. Removing English blocks orphans translations; it never needs new ones.
- **A heading whose section empties out is dropped with it**, per the no-empty-cards rule.
- **`build_site_content.py` is NOT the place for this.** Its `PROVENANCE_HEADING` operates on
  whole subtopics; three of the four cases here are sub-sections or mid-section block runs,
  and Covenant Day's is a `###` inside a surviving subtopic. Filtering in `prose.ts` handles
  all four uniformly and keeps `src/content/` a faithful copy of the notes.
- **Match on structure, not on a school allowlist.** Target the provenance *shapes* — a
  `Per-column sourcing…` lead-in, a `Source snapshots` sub-heading, a `…captured in the same
  snapshots` heading — so the rule keeps working when a fifth school gets a Tuition History
  card. Scope the rule to the `financial-aid` topic (`parseProse` already receives `topic`;
  see the `KEEPS_GAP_TOPIC` pattern) so a `Source snapshots` heading elsewhere is untouched.
- **Covenant Day drops one non-provenance sentence by user instruction.**
  `A flat-dollar (not percentage) increase across bands.` is a table footer, not provenance;
  the user's annotated screenshot (2026-08-29) circles it for removal. Match it directly —
  no structural rule should be stretched to cover it.
- **⚠️ Covenant Day loses its card's only two URLs.** Its `### Source snapshots` block holds
  the only two links on that card (`covenantday.org/admissions/tuition-financial-aid` and the
  2025-26 terms PDF); the other three schools' cards have **zero** URLs already, so they lose
  nothing. This was accepted when the user chose "all bullets, both groups" across all four
  schools. The URLs remain in `source-material/` and in Covenant Day's In-Depth Report card.
  **Surface this to the user at the review step** — if they want them kept, the fix is to
  exempt a `Source snapshots` block whose items are bare URLs, which is a small follow-up.

## Steps

Single phase. Branch `feat/remove-tuition-history-bullets` off `main`.

1. **Re-derive the affected block list from the repo, don't trust the table above.**
   ```bash
   python3 -c "
   import json
   d=json.load(open('src/data/overlays/work/financial-aid-tuition.content.es.json'))
   for s in d['sections']:
       at=' ; '.join(s.get('at',[]))
       if any(x in at for x in ['cannon:','charlotte-country-day:','davidson-day:','covenant-day:']):
           print(s['of'],'|',at[:60],'|',repr(s['text'][:70]))
   "
   ```
   Keep the output; it is the before-picture for step 6.

2. **Add the provenance filter to [src/lib/prose.ts](src/lib/prose.ts).** Model it on the
   existing gap-filter machinery (`isGapHeading` / `GAP_HEADING` / `KEEPS_GAP_TOPIC`,
   lines 58-95) rather than inventing a parallel mechanism. It needs to handle three shapes:

   - **A lead-in paragraph followed by its bullets.** `Per-column sourcing:` and
     `Per-column sourcing (verbatim quotes from the retrieved snapshots):` each introduce a
     `list` block. Drop the lead-in paragraph **and** the list that follows it. Regex on the
     lead-in, e.g. `/^per-column sourcing\b/i`.
   - **A whole section that is only bullets.** `Related detail captured in the same
     snapshots` (cannon) and `Financial aid detail captured in the same snapshots`
     (davidson-day). Suggested rule: a `financial-aid` section whose heading matches
     `/captured in the same snapshots$/i` **and whose blocks are all lists** is dropped
     entirely, heading included. The `and whose blocks are all lists` half matters —
     davidson-day's `Fees captured in the same snapshots` matches the same heading pattern
     but holds a **table**, and it MUST survive.
   - **A whole `###` sub-section, whatever its block kinds.** Covenant Day's
     `Source snapshots`. Heading match `/^source snapshots?$/i`, scoped to `financial-aid`.
     **This one is NOT a list** — `prose.ts:607` parses it into a `sources` chip block plus a
     stray paragraph plus one list item (see the Context table). So this rule must drop the
     section **unconditionally by heading**, not via the "all blocks are lists" guard used for
     the `…captured in the same snapshots` sections. Keep the two rules separate for exactly
     this reason.
   - **One trailing paragraph, dropped by exact match.** Covenant Day's
     `A flat-dollar (not percentage) increase across bands.` sits under
     `### Tuition by band and year` and is the only *keeper-shaped* block the user asked to
     remove. It is not provenance and no structural rule reaches it — match the sentence
     directly, scoped to `financial-aid`, with a comment saying it was a user call on
     2026-08-29 rather than a pattern.

   Prefer one general rule over three special cases if it falls out cleanly: *within
   `financial-aid`, drop any section whose heading is provenance-shaped and whose remaining
   blocks are exclusively lists; and drop any `Per-column sourcing` paragraph together with
   the list that follows it.* Whatever shape it takes, add a comment in the style of the
   surrounding code saying **why** (the notes keep it, the app hides it).

3. **Do not touch `source-material/**`, `.claude/docs/**`, or `src/content/**`.** No ingest
   run is needed — the English source of every surviving block is unchanged, which is what
   keeps this single-phase.

4. **Rebuild the nine content overlays** so the orphaned hashes are dropped:
   ```bash
   for L in es bn ht te fr fa it hi ar; do
     node scripts/i18n_build_content_overlay.mjs --topic financial-aid-tuition --lang $L
   done
   ```
   Note the topic is `financial-aid-tuition` **without** the `.content` suffix — the script
   appends it. (This trap is recorded in the `content-overlay-build-traps` memory.)

   The builder writes from the **work files**, so the orphaned entries must first be gone
   from `src/data/overlays/work/financial-aid-tuition.content.<lang>.json` — remove the
   entries whose `of` hash is in the step-1 list from all nine work files (a small script
   filtering `sections` by `of` is cleaner than nine hand edits), then run the loop above.

5. **Verify no orphans remain:**
   ```bash
   npm run check:live
   npm run check:runtime
   ```
   `check:live` gate 2 is the one that fails on an orphan; gate 3 checks the surviving
   translations are still non-empty and plausibly-lengthed.

6. **Confirm the block accounting.** Re-run the step-1 command and diff against the saved
   output: exactly the hashes identified in step 1 as removed should be gone, and **nothing
   else**. A surviving block that vanished means the filter is over-matching.

## Verification

Automated:

```bash
npx tsc --noEmit
npm run build          # includes check:schema, check:live, check:chrome, check:runtime, …
npm run check:live
npm run check:runtime
npm run check:metrics  # advisory — confirm no NEW ⚠️ unmatched subtopic appeared
npm run check:schema   # the card list must be unchanged: tuition-history stays 4/11
```

`check:schema` matters as a **negative** check here: this plan removes content *within* a
card and must not remove or add a card. `tuition-history | Tuition History & Sources | 4/11`
in [.claude/docs/DATA-SCHEMA.md:166](.claude/docs/DATA-SCHEMA.md#L166) must be unchanged.

Manual — **required**, because this is a render-layer change and the repo's standing lesson
is that render-layer defects survive every automated check:

1. `npm run dev`, then open each of the four school pages, expand **Financial Aid & Tuition**
   and open the **Tuition History & Sources** card:
   - `/school/cannon`
   - `/school/charlotte-country-day`
   - `/school/davidson-day`
   - `/school/covenant-day`
2. On each, confirm: **no bulleted lists anywhere in the card**; every table still present
   with its heading; every closing paragraph still present; and **no heading standing alone
   over empty space**.
3. Specifically confirm these survived (they are the over-match tripwires):
   - davidson-day → `Fees captured in the same snapshots` **table** still renders.
   - davidson-day → `Reduced-day early-childhood options…` para + table + `Source: same
     snapshots…` closing para still render.
   - charlotte-country-day → `Note on the published 5.0% increase` section renders in full.
   - covenant-day → `### Tuition by band and year` **table** and `### The year-pinning
     decision` heading + paragraph still render — but the sentence `A flat-dollar (not
     percentage) increase across bands.` is **gone**, and so are all three `Source snapshots`
     fragments: the `covenantday.org ↗` **chip**, the stray `(captured 2026-08-15)` line, and
     the remaining bullet. Check for the chip specifically — it is the fragment a
     list-oriented filter leaves behind.
4. Check **one non-English locale** on one school (e.g. `es` on cannon) and confirm the
   surviving prose is still translated — proving the hash-keyed overlay still resolves.
   Overlays fail silently to English, so this cannot be inferred from a green checker.
5. Spot-check a **different** financial-aid school that has no Tuition History card
   (e.g. `providence-day`, `charlotte-latin`) to confirm the new filter did not reach into
   the In-Depth Report card.

## Risks

| Risk | Mitigation |
|---|---|
| Filter over-matches and eats a table-bearing section (`Fees captured in the same snapshots`) | Require "all remaining blocks are lists" before dropping a section; step 3 of the manual check targets it directly |
| Orphaned overlay hashes fail `npm run build` via `check:live` gate 2 | Step 4 rebuilds all nine overlays; step 5 verifies |
| Filter leaks into other topics that use the word "sources" | Scope to `financial-aid` via the existing `topic` parameter, as `KEEPS_GAP_TOPIC` does |
| Covenant Day's only two citation URLs disappear | Known and accepted; flagged to the user at review, with the exemption fix noted in Decisions |
| A heading survives with nothing under it | ProseContent renders headings unconditionally — the filter must drop heading+section together; manual check step 2 looks for it |

## Out of scope

- Any change to the structured `FinancialAidReport` component or `src/data/financialAidReports.ts`.
- Any edit to `source-material/**` — deliberately, per the Decisions section.
- Any new card, section, Compare row or metric key (no UX-approval gate is triggered:
  this removes content from an existing card and adds no UI).
- Re-translation of any surviving prose.


## Implementation notes

Shipped 2026-08-29 in PR #242. The plan's structure held — filter at parse time, match on
shape, scope to `financial-aid`, drop headings that empty out — but four things it
specified turned out to be wrong about the repo, each found by verification rather than by
reading.

### 1. Step 4 was unnecessary: NOTHING orphans, and no overlay was rebuilt

The plan's central i18n claim — *"Removed blocks become orphans, and orphans FAIL THE
BUILD"* — does not hold, because it assumes the content extractor sees `parseProse` output.
It does not. `scripts/i18n_extract_content.mjs` reads `src/content/<topic>/<school>.json`
raw and splits on blank lines (`blocksOf`); it never calls the parser. `check:live` gate 2
asserts `shipped ⊆ fresh extract of src/content/`, and this change edits no `src/content`,
so every one of the 12 hashes still reproduces. `npm run check:live` passes with **70
foreign-topic blocks verified** and `npm run build` exits 0 with no overlay touched.

**No work-file entries were deleted and no overlay was rebuilt.** Doing so would have been
actively harmful: the English blocks still exist in `src/content`, so deleting their
translations would strand them at English if anything ever re-surfaced them.

The plan's step-1 re-derivation command was still run, and its 12-hash table was confirmed
correct against the repo — it was the *consequence* drawn from it that was wrong.

### 2. The filter had to run at TWO layers, and the second is the one that matters

`prose.ts` alone fixes only English. `src/lib/content.ts` swaps each English block for its
translation (`localizeBody`) **before** the text reaches `parseProse`, so English-text
patterns match nothing after the swap and every non-English locale keeps the bullets. A
browser check on the Spanish Covenant Day page found exactly that — `Instantáneas de
origen`, the `(capturada el 2026-08-15)` line and the bullets all still rendering while
English was clean.

The fix is `stripProvenanceRaw()`, exported from `prose.ts` and called in `content.ts` on
the **English** text before the overlay swap, at the same blank-line granularity
`localizeBody` uses. One pass then decides for all ten locales. `stripProvenance()` still
runs inside `parseProse` afterwards, because the raw pass cannot see the `sources` chips
and heading debris the parser synthesises; the two are idempotent together.

Verified in a real browser across **en / es / hi / fa × all four schools** — 16
combinations, all showing 0 list items, 0 links, no Wayback text and no captured date, with
every table and legitimate heading intact.

### 3. The orphaned-heading problem is in SchoolDetail, not ProseContent

The plan located it at `ProseContent.tsx:194-206`. For Covenant Day that is right, but for
Cannon and Davidson Day the emptied sections are whole **subtopics**, whose `<h3>` is
rendered by `SchoolDetail.tsx` *outside* `ProseContent` — so filtering inside the parser
leaves the heading standing. Two consequences:

- `proseIsEmpty()` was added to `prose.ts` and `SchoolDetail.tsx` now filters out sections
  that parse to nothing, so the `<h3>` goes with them.
- `parseProse` gained a fourth `subtopic` parameter (threaded through `ProseContent`).
  Rule 2 has to see the subtopic, because for those two schools no heading block ever
  reaches the filter. This is deliberately **not** the existing `title` parameter, which is
  the shared metric label `Tuition History & Sources`.

### 4. Two over-matches caught by an A/B diff against `main`

A whole-corpus diff (970 sections, every topic and school, filtered vs. `main`) was run
rather than trusting the four-school inspection. It found two defects the plan's manual
checklist would not have:

- **Pass 2 over-reached.** A blanket "drop any heading followed by another heading" rule
  removed `How Completely Each Section Could Be Answered` from Cannon's **Deep Dive Report**
  card — out of scope, and heading-over-heading is a normal shape elsewhere in these notes.
  Pass 2 is now scoped to headings pass 1 actually stripped content from (an `emptied` set).
- **The "all blocks are lists" guard used the wrong test.** `every line is a bullet` fails
  on these hard-wrapped lists, whose continuation lines are indented prose. It now tests
  that every *block* opens with a bullet. This is the guard protecting Davidson Day's
  `Fees captured in the same snapshots`, which matches the same heading pattern but holds a
  table — confirmed surviving (466 chars) in all four locales.

Final diff against `main`: exactly **6 sections** changed, all in `financial-aid-tuition`,
all four target schools, removals only.

### Verification run

`npx tsc --noEmit` clean; `npm run build` exit 0 (13 chained checks); `check:live`,
`check:runtime`, `check:schema`, `check:chrome`, `check:seo` all pass individually.
`check:metrics` output is **byte-identical to `main`** (it exits 1 on `main` too — a
pre-existing advisory state, unrelated to this change). `tuition-history | 4/11` unchanged
in `DATA-SCHEMA.md`, the plan's negative check. Providence Day and Charlotte Latin's
In-Depth Report cards verified untouched (15 and 9 list items, 7 links each).

### Two things for the user

- **Covenant Day's two citation URLs are gone from this card**, as the plan flagged and the
  user accepted. They remain in `source-material/` and on Covenant Day's In-Depth Report
  card. If they should be kept, the fix is to exempt a `Source snapshots` block whose items
  are bare URLs.
- **Pre-existing, NOT caused by this change:** on `hi` and `fa`, Covenant Day's
  `Tuition by band and year` heading does not render — its overlay translation does not
  parse back as a heading. Confirmed present on `main` before this change. Worth a separate
  look.

### Follow-up: "The year-pinning decision" also removed (PR #243)

On reviewing the shipped English page the user circled Covenant Day's
`### The year-pinning decision` sub-section — heading and paragraph — and asked for it to
go too. It is a note about **this project's own editorial method** (which school year the
app quotes for `top-tuition`, and why), so it reads to a family as the same internal voice
as the snapshot lists beside it, even though it is not provenance.

Added as `PROVENANCE_YEAR_PINNING` at both layers, sharing rule 3's "drop the whole section
whatever its blocks contain" path via a new `isWholeSectionDrop()` helper — its body is an
ordinary paragraph, so the bullets-only guard used by rule 2 would not have reached it.

Whole-corpus A/B diff against `main` still shows **exactly 6 sections** changed; the only
new removal is Covenant Day's heading + paragraph. Browser-verified across en/es/hi/fa:
Covenant Day's card is now `Tuition by band and year` plus its table, and the other three
schools are unchanged. `npm run build` exit 0; `check:live`, `check:runtime`,
`check:schema`, `check:chrome`, `check:seo` all pass.
