---
name: CovenantDaySports
title: Label each Covenant Day sport with its real Varsity / JV / Middle School levels
status: english-done
phases: 2
created: 2026-08-17
branch: feat/covenant-day-sports-levels
prs: []
---

# Label each Covenant Day sport with its real Varsity / JV / Middle School levels

## Goal

Covenant Day's Sports Offered card currently shows every one of its 18 teams with only a
Varsity (`V`) depth chip, because the earlier research could confirm levels only in
aggregate. The school in fact publishes per-sport levels: each team page carries an
**"Additional Levels"** box listing its Middle School and/or JV teams. This plan replaces
Covenant Day's uniform `['V']` with the school's real per-sport `V` / `JV` / `MS` levels
(now captured in source material), so its season board shows the same depth chips the
richer schools already show — and rewords the card's footnote, which currently says the
opposite. We'll know it worked when Covenant Day's Sports Offered board renders JV and MS
chips on the right sports (8 JV, 17 MS, Girls Golf varsity-only) and the footnote no longer
claims levels aren't asserted.

## Context

- **The card that changes:** [`src/data/sportsPrograms/covenant-day.ts`](../../src/data/sportsPrograms/covenant-day.ts),
  the `offered` block. Its `seasons[].sports[]` entries each have a `levels: Level[]` array
  (`Level = 'V' | 'JV' | 'MS'`), and today **every entry is `['V']`** (lines 48–78). The
  header comment (lines 14–17) and the `footnote` (line 82) both explain that JV/MS rows
  are deliberately *not* asserted because the school stated levels only in aggregate — both
  become false once we assert them and must be updated.
- **The render path already supports this fully.** [`src/components/SportsProgram.tsx:129-136`](../../src/components/SportsProgram.tsx#L129-L136)
  maps `sport.levels` through `DepthChip`, which emits a `V` / `JV` / `MS` chip
  (`SportsProgram.tsx:93-95`). The legend labels ("Varsity / Junior varsity / Middle
  School") are already keyed and rendered (`SportsProgram.tsx:110-116`). **No component,
  type, or new string is needed** — the chips render today; Covenant Day just has none but
  `V`.
- **The pattern to mirror:** [`src/data/sportsPrograms/providence-day.ts:37-71`](../../src/data/sportsPrograms/providence-day.ts#L37-L71)
  already fields mixed `['V','JV','MS']` / `['V','MS']` / `['V']` levels per sport. Copy its
  shape exactly.
- **`levels` values are enum tokens, not prose** — `'V'`/`'JV'`/`'MS'`. Changing them adds
  **no** translatable text and does not touch the overlays. The **only** translation-relevant
  change is the footnote reword (below).
- **Why the footnote reword makes this two-phase.** The `offered.footnote` is research prose
  and is translated in **all 9 non-English overlays** (`ar bn es fa fr hi ht it te` — every
  `sports.*.json` carries a `covenant-day:offered.footnote` entry). Each overlay entry is
  stamped with an FNV-1a hash of the English it was translated from; when the English text
  changes, the stamp no longer matches and the runtime **silently falls back to English**
  for that field (see the `check:runtime` note in `CLAUDE.md`). So rewording the footnote
  desyncs those 9 entries and they must be re-translated — that is Phase 2.
- **Source data** is already captured (see *Source material*), so no fetching happens at
  implement time — but it still routes through the ingest skill per the data-provenance
  standard.

## Decisions

- **Assert per-sport levels from the "Additional Levels" box** — that box is the school's
  own per-sport statement; a sport with no MS/JV link there fields no such team. This is the
  authoritative source, resolving what the aggregate "varsity, JV, and middle school levels"
  claim left ambiguous.
- **Girls Golf stays `['V']`** — its team page has no Additional Levels box at all
  (re-verified: no "JV Girls Golf" or "Middle School Girls Golf" anywhere on the page).
- **Cheerleading is `['V','MS']` in both Fall and Winter** — each cheer team page lists only
  Middle School Cheerleading, no JV.
- **Reword the footnote rather than delete it** — it still carries the boys-volleyball
  club-sport note, the combined-lacrosse note, and the MaxPreps 21/50 caveat; only the
  "JV/MS rows are not asserted here" clause is now wrong and must flip to describe what the
  chips now show.
- **Update the `.ts` header comment (lines 14–17)** to match — it's a code comment, not
  user-facing, so no translation impact, but leaving it stating the opposite of the data is
  a landmine for the next editor.
- **Keep the `'18' / 'teams, V · JV · MS'` stat tile as-is** — still accurate and already
  translated; untouched, so its overlays stay valid.
- **Scope is Covenant Day only** (user's call). The other 7 schools are not audited here.

## Approvals needed

**None.** This is data enrichment into an existing card using an existing, already-rendered
field (`levels`) and its existing chips — explicitly the "allowed" side of the UX-design
gate (adding/correcting data behind a card the app already has). No new card, section, stat
tile, Compare row, metric key, or topic; no component/layout/style change.

## Source material

Already written during planning, **uncommitted**, to be ingested first by `/implement`:

- [`source-material/sports/covenant-day/Covenant Day School - Sports - Team Levels (V-JV-MS).md`](../../source-material/sports/covenant-day/Covenant%20Day%20School%20-%20Sports%20-%20Team%20Levels%20(V-JV-MS).md)
  — the full per-sport V/JV/MS matrix, the re-verification method (Teams index → tile →
  Learn More → team page → Additional Levels box), the page id and Additional-Levels
  contents for all 18 team pages, and the mapping to the app's `offered` entries.
  Sources: the athletics Teams index and every one of the 18 team pages.

`/implement` runs the `ingest-source-material` skill on this first (it regenerates the
distilled notes and `schools.json`; it does **not** author `sportsPrograms/*.ts`, which is a
hand-maintained layer — the `levels` edits in Step 2 are made by hand).

## Out of scope

- The other seven schools' sports level labels (a possible future pass; not audited here).
- Any change to counts, records, honors, pipeline, coaching, or facilities cards.
- Adding JV/MS **rosters, records, or coaches** — only the depth chips + footnote change.
- Any UI, component, styling, or type change.

## Steps

Two-phase because the footnote is translated prose. Phase 1 changes the `levels` data and
the English footnote/comment; Phase 2 re-translates the footnote in 9 overlays.

### Phase 1 — English (data + English footnote)

1. **Ingest the source material** — run the `ingest-source-material` skill so the new
   `Team Levels (V-JV-MS).md` is captured and the distilled notes / `schools.json` stay in
   sync. Confirm it reports no unexpected changes beyond picking up the new file.

2. **Set per-sport `levels` in [`src/data/sportsPrograms/covenant-day.ts`](../../src/data/sportsPrograms/covenant-day.ts)**
   (`offered.seasons[].sports[]`), matching the source-material matrix exactly:

   **Fall:**
   - Football → `['V','JV','MS']`
   - Soccer (Boys) → `['V','JV','MS']`
   - Field Hockey (Girls) → `['V','JV','MS']`
   - Volleyball (Girls) → `['V','JV','MS']`
   - Cross Country (B & G) → `['V','MS']`
   - Tennis (Girls) → `['V','JV','MS']`
   - Golf (Girls) → `['V']`  *(unchanged — varsity only)*
   - Cheerleading → `['V','MS']`

   **Winter:**
   - Basketball (Boys) → `['V','JV','MS']`
   - Basketball (Girls) → `['V','MS']`
   - Swimming (B & G) → `['V','MS']`
   - Cheerleading → `['V','MS']`

   **Spring:**
   - Baseball → `['V','JV','MS']`
   - Softball (Girls) → `['V','MS']`
   - Soccer (Girls) → `['V','JV','MS']`
   - Tennis (Boys) → `['V','MS']`
   - Golf (Boys) → `['V','MS']`
   - Track & Field (B & G) → `['V','MS']`

   (8 sports gain JV; 17 of 18 gain MS; only Girls Golf stays `['V']`.)

3. **Reword the `offered.footnote`** (currently line 82) so it describes what the chips now
   show instead of denying them. Replace the clause *"it states teams run 'at the varsity,
   JV, and middle school levels' without publishing a per-sport breakdown, so JV/MS rows are
   not asserted here"* with wording that the per-sport V/JV/MS levels shown are taken from
   each team's "Additional Levels" listing on the school site, that 8 sports field a JV team
   and all but Girls Golf field a middle-school team. **Keep** the existing boys-volleyball
   club-sport sentence, the combined-lacrosse sentence, and the MaxPreps 21/50 sentence
   verbatim. Any figures already present stay char-for-char.

4. **Update the header comment** (lines 14–17 of the same file) so it no longer says levels
   are asserted only in aggregate — state that per-sport levels come from each team page's
   "Additional Levels" box, per
   `source-material/sports/covenant-day/…Team Levels (V-JV-MS).md`. Comment only; no
   translation impact.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** The user should
open Covenant Day's Sports page in the browser, expand the Sports Offered card, and confirm
the chips read as intended and the reworded footnote is right. Nothing below runs until they
confirm the English wording.

### Phase 2 — Every other locale (re-translate the footnote)

Only after the user confirms the English footnote. Scope is the **research-prose overlay
layer** (`PROSE_TRANSLATED`), not the locale JSON chrome — one field, `covenant-day:offered.footnote`,
in each of the 9 sports overlays: `sports.ar/bn/es/fa/fr/hi/ht/it/te.json` under
`src/data/overlays/`.

1. **Re-translate `covenant-day:offered.footnote`** in each of the 9 `sports.*.json`
   overlays to match the reworded English, refreshing each entry's `of` stamp to the new
   English hash. Use the prose-translation mechanism and the per-locale traps from the
   rollout docs in `.claude/docs/` (`prose-translation-architecture.md` for the mechanism);
   in particular any figure in the footnote (e.g. `21`, `50`, `18`) is copied char-for-char,
   never re-typed or re-grouped — this matters for the lakh/crore locales `hi`/`te`.
2. No other overlay field changes: the `levels` edits added no prose, and the stat tile and
   headline are untouched, so their stamps stay valid.

## Files touched

| File | Change |
|---|---|
| `source-material/sports/covenant-day/Covenant Day School - Sports - Team Levels (V-JV-MS).md` | new — per-sport V/JV/MS matrix + method + sources (written during planning) |
| `src/data/sportsPrograms/covenant-day.ts` | edit — set real `levels` on 17 sports; reword `offered.footnote`; update header comment |
| `.claude/docs/*` / `src/data/schools.json` | regenerated by the ingest step (Phase 1, step 1) if the pipeline touches them |
| `src/data/overlays/sports.{ar,bn,es,fa,fr,hi,ht,it,te}.json` | edit (Phase 2) — re-translate the one `covenant-day:offered.footnote` entry + refresh its stamp |

## Verification

### Phase 1 — English

- [ ] `npx tsc --noEmit` — clean (the `levels` values are all valid `Level` tokens).
- [ ] `npm run build` — succeeds (this also runs `check:schema` and `check:seo`; neither
      should change, since no card/route/metric was added).
- [ ] `npm run check:runtime` — **expected to now report the `covenant-day:offered.footnote`
      overlay as stale in all 9 locales** (English changed, stamps not yet refreshed). This
      is the correct Phase-1 signal that Phase 2 is required; it is not a failure to fix in
      Phase 1. Every *other* covenant-day overlay field must still resolve.
- [ ] Browser check (required — render-layer is where this repo's defects hide): open
      Covenant Day → Sports → expand **Sports Offered**. Confirm JV chips appear on exactly
      the 8 JV sports and MS chips on all sports except Girls Golf; Girls Golf shows only V;
      the footnote reads correctly and no longer denies the levels. Cross-check the board
      against the source-material matrix.

### Phase 2 — Locales

- [ ] `npm run check:runtime` — now **clean** for `covenant-day:offered.footnote` in all 9
      locales (stamps refreshed, overlays resolve).
- [ ] `npm run check:figures` (per the rollout-doc per-topic command for `sports`) and
      `npm run check:sepdrift -- --lang <code>` for each locale — no figure in the footnote
      was re-typed or re-grouped.
- [ ] Browser spot-check the footnote in at least one non-English locale (e.g. `es` and one
      lakh/crore locale such as `hi`) to confirm it renders translated, not English-fallback,
      and any figures are intact.

## Risks

| Risk | Mitigation |
|---|---|
| A sport's levels are transcribed wrong from the fetch | The source-material file records each team page's exact Additional-Levels contents and page id; Step 2 copies from that table, and the browser check cross-references it. |
| Footnote reword desyncs overlays and someone ships Phase 1 alone | `check:runtime` flags the 9 stale entries loudly; the plan calls this out as the Phase-1→Phase-2 trigger, and the index sits at `English shipped` between phases. |
| Ingest step unexpectedly rewrites `sportsPrograms/*.ts` | It doesn't — that layer is hand-maintained; if ingest surfaces an unrelated diff, review it before proceeding. |

## Open questions

None. The per-sport matrix is fully verified against the live school site; Girls Golf's
varsity-only status was double-checked.
