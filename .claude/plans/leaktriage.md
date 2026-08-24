---
name: leaktriage
title: Triage the cross-locale English leaks — 147 leak-shaped strings, and a durable KEEPS ledger
status: implemented
phases: 2
created: 2026-08-23
branch: i18n/leak-triage
prs: []
---

# Triage the cross-locale English leaks

## Goal

`npm run i18n:leaks` reports **2,625 review items across the nine prose locales**. Nobody
has ever triaged them, and the tool's own docstring says the KEEP decisions must be
"recorded somewhere durable" — there is no such record, so every future rollout re-triages
the same strings from scratch.

This plan triages the **183 leak-shaped strings**, fixes the genuine leaks, and writes the
KEEPS ledger that stops the work being repeated.

We will know it worked when every one of the 183 is either **translated** or **recorded as
a deliberate keep with a reason**, and a re-run of `i18n:leaks` for each locale shows no
untriaged leak-shaped item.

## Context

### This is the last known quality gap in the prose layer

As of 2026-08-23 all nine prose locales have signed-off native-speaker reviews
(PRs #187, #189). Those reviews close *register and naturalness*. They do **not** close
**stranded English** — a reviewer reading a page in their language does not necessarily
flag a short English label as wrong, and several of these sit in table cells and chips
where a code would be legitimate. That is why the mechanical cross-locale diff still finds
things after nine human reviews.

### The measurement, taken 2026-08-23

Per-locale review items from `npm run i18n:leaks -- --lang <l>`:

| es | bn | ht | te | fr | fa | it | hi | ar | total |
|---|---|---|---|---|---|---|---|---|---|
| 233 | 235 | 204 | 481 | 320 | 202 | 358 | 365 | 227 | **2,625** |

That total badly overstates the work, because the same English string recurs across
locales. Deduplicated by `(topic, path)` and then by English text:

- **857** distinct `(topic, path)` review items
- **847** distinct English strings

**The banding is what makes this tractable.** For each distinct English string, count how
many of the nine locales kept it in English:

| Kept by | Distinct strings | Reading |
|---|---|---|
| **1 locale** | **266** | strongest leak signal — 8 locales translated it |
| **2 locales** | **74** | strong leak signal |
| 3 locales | 81 | ambiguous middle |
| 4 locales | 93 | ambiguous middle |
| 5 locales | 136 | leaning keep |
| 6 locales | 76 | leaning keep |
| **7+ locales** | **121** | consensus KEEP |

Length profile of the distinct strings: **median 15 chars, p90 46, max 1530.**

### The scope this plan takes: 183 strings

**Leak-shaped = kept by ≤2 locales AND ≥15 characters.** That is **183 distinct strings**.
The length floor matters: short strings in the ≤2 band are dominated by grade/time labels
(`Gr 1–5 · 3:00–4:30`) whose treatment is a separate convention question, while ≥15 chars
with 7+ locales disagreeing is nearly always real prose.

Topic spread of the 183:

```
 43  college-support        18  course-offerings      13  sports
 37  financial-aid-report   15  student-clubs         12  summer-programs
 20  the-arts               14  metric-values          8  after-school
                                                       3  financial-aid-tuition.content
```

### Two verified samples — the signal is real

Checked directly against the work files:

```
"supervised free time"            fa KEPT-EN, 8 locales translated
                                  (es "tiempo libre supervisado", fr "temps libre encadré", …)
"Director of Counseling Services" bn KEPT-EN, 8 locales translated
                                  (es "Directora de servicios de orientación", …)
```

Both are unambiguous leaks. Sampling the other end confirms the banding's top too — the
7+ band is course titles and proper nouns (`World Myths and Legends`,
`Johnson Scholarship, Washington & Lee (2026)`, `NC A&T`, `Science Lab`), which are correct
keeps.

### The tooling already exists — do not rebuild it

`scripts/find_english_leaks.mjs` (`npm run i18n:leaks`) is the tool, written during the
Italian rollout and rerun for Hindi. It accepts `--lang`, `--refs a,b,c` and `--min N`.
Its docstring carries the operating rule this plan is built on:

> IT IS A REVIEW QUEUE, NOT A DEFECT LIST. Plenty of hits are correct… Triage each one;
> **record the KEEPS somewhere durable** so the decision is documented rather than merely
> implied by absence.

**No such durable record exists.** That is half of what this plan delivers.

### Why this must not become a build gate

`npm run check:runtime -- --report-identical` already reports ~1,900 identical strings and
**ships as a report with exit 0 on purpose**. CLAUDE.md is explicit: enforcing it would park
the build at ~2,000 findings and make it the repo's third permanently-red checker after
`check:sepdrift` and `check:live`-at-4,646. This plan does not change that, and the ledger
must not become a gate either.

## Decisions

- **Scope to the 183 leak-shaped strings, not all 847** — the 7+ band is 121 consensus
  keeps needing only a ledger line, and the 3–6 middle (386 strings) is a convention
  question about grade/time labels that deserves its own decision, not a rushed call inside
  a translation pass.
- **The ledger lives in `src/data/overlays/NOTES.md`** — that file is already the durable
  home for per-locale translation decisions and soft-spot lists, it is documentation-only
  (referenced from comments, absent from the bundle, verified), and rollout docs already
  point at it.
- **Record keeps by English text, not by hash** — a hash breaks the moment its English is
  edited, the same reason `check_runtime_resolution.mjs` has no hash allowlist.
- **Two phases.** This changes user-facing research prose in nine locales. Phase 1 is
  triage + the ledger + English-side fixes; Phase 2 is the translations. See below.
- **Do not fix the mid-band or add a checker** — both are out of scope, recorded as
  follow-ups.

## Approvals needed

**None.** No new card, section, stat tile, Compare row, metric key or topic. This corrects
existing translated values and adds a documentation ledger.

## Out of scope

- **The 3–6 band (386 strings)** — mostly grade/time labels (`TK · 1:00–3:00 pm`,
  `Gr 1–5 · 2:55–4:30`, `$1.00 / min`). Whether those should be translated at all is a
  convention question. Follow-up 1.
- **The 7+ consensus band (121 strings)** — correct keeps; they get ledger lines in Phase 1
  but no translation work.
- **Turning any of this into a build gate.** See above.
- **`--report-identical`'s ~1,900 findings.** A superset measured differently; this plan
  uses the cross-locale diff, which carries far better signal.
- **Deploying.** `npm run deploy` stays the user's call.

## Steps

**Two phases — this changes user-facing research prose.** Phase 1 settles *which* strings
are leaks and what the English should be; Phase 2 translates. The split matters more than
usual here: a mis-triaged string translated into nine locales is nine wrong values, and
triage is exactly the judgment that benefits from review before it multiplies.

### Phase 1 — Triage and the ledger

1. **Regenerate the working set.** Run `npm run i18n:leaks -- --lang <l>` for all nine
   locales. Aggregate to distinct English strings with their kept/translated locale sets,
   and select **kept ≤2 AND length ≥15** — expect ~183. Write the working list to the
   scratchpad, not the repo.

2. **Triage each of the 183 into LEAK or KEEP.** A string is a KEEP when it is a course
   code or catalog title a family matches against the school's published page, a proper
   noun, a named award, a unit, or a figure label. It is a LEAK when it is prose — a
   sentence, a role title, a descriptive label. Use the other locales' translations as
   evidence: if 8 locales rendered it as running prose, it is prose.

3. **Write the KEEPS ledger** into `src/data/overlays/NOTES.md` as a new top-level section
   — every KEEP with its English text, the locales that kept it, and a one-line reason.
   This is the deliverable that stops the next rollout re-triaging the same strings.

4. **Fix any English-side defects triage exposes.** Expect a few of the "sentence wearing
   an identifier's clothes" class this repo has hit repeatedly — a hedge sitting in a
   proper-noun field. Where the fix is to move prose into an adjacent extracted field
   (as `seasonDetail[].program` was fixed on 2026-08-19), do it here in Phase 1, since it
   changes the English and therefore the hashes.

5. **Record the LEAK list** for Phase 2: English text, target locales, and the topic/path.
   Keep it in the scratchpad — it is a work artifact, not a repo file.

6. **Verify Phase 1 is inert for readers.** `npm run build` green, and confirm no rendered
   value changed except where step 4 deliberately edited English.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing below
runs until they confirm the triage calls and the ledger. Translating a mis-triaged string
multiplies the error by nine.

### Phase 2 — Translate the confirmed leaks

Scope is the **overlay layer** (`PROSE_TRANSLATED` in `src/lib/i18n.ts`), not the chrome
catalogs — these are research prose in `src/data/**`. Read
`.claude/docs/prose-translation-architecture.md` for the mechanism rather than re-deriving
it; do not re-read a rollout doc for a *register* rule, per CLAUDE.md.

1. **Translate each confirmed leak in its target locales**, editing the work files under
   `src/data/overlays/work/` and rebuilding the shipped overlays with `npm run i18n:build`.
   Most strings need only the 1–2 locales that kept them, not all nine.

2. **Honour the standing locale traps.** Figures are copied char-for-char and never
   re-typed; `hi`/`te` store the English 3-3-3 figure because the render layer regroups;
   `fa`/`ar` need LRI…PDI isolates around bidi-neutral figures. These are recorded in
   CLAUDE.md and the rollout docs.

3. **Re-run `i18n:leaks` for all nine** and confirm every triaged leak is gone and no new
   item appeared.

4. **Update the ledger** with anything Phase 2 reclassified — a string that turned out to
   be a keep once a translator looked at it moves to the KEEPS section with its reason.

## Files touched

| File | Change |
|---|---|
| `src/data/overlays/work/*.{es,bn,ht,te,fr,fa,it,hi,ar}.json` | edit — translate confirmed leaks (Phase 2) |
| `src/data/overlays/*.json` | regenerated by `npm run i18n:build` (Phase 2) |
| `src/data/overlays/NOTES.md` | **new section** — the KEEPS ledger (Phase 1) |
| `src/data/**` | possible edit — English-side fixes from step 4 (Phase 1) |
| `.claude/plans/leaktriage.md` | edit — implementation notes |

## Verification

### Phase 1 — Triage and ledger

- [ ] All 183 leak-shaped strings classified LEAK or KEEP, none left undecided
- [ ] `src/data/overlays/NOTES.md` carries every KEEP with a reason
- [ ] `npx tsc --noEmit` — clean
- [ ] `npm run build` — succeeds; all eight chained checks pass
- [ ] `npm run check:live` and `npm run check:runtime` — green (step 4 edits English, which
      re-stamps hashes; this is the check that catches a botched re-extract)
- [ ] No rendered value changed except where step 4 deliberately edited English

### Phase 2 — Locales

- [ ] `npm run check:runtime` — every overlay stamp resolves, value gates pass
- [ ] `npm run check:live` — live English matches every shipped stamp
- [ ] `npm run check:sepdrift -- --lang <l>` for all nine — no separator re-typing
- [ ] `npm run check:script` — every overlay still in its own script
- [ ] `npm run check:sources -- --lang <l>` for all nine — no English original altered
- [ ] `npm run i18n:leaks -- --lang <l>` for all nine — every triaged leak gone
- [ ] **Browser check** on two schools in two locales — at least one RTL (`fa`/`ar`) and one
      lakh/crore (`hi`/`te`). Grep the rendered page for English sentences in **table cells,
      chips and source lines**: CLAUDE.md records that as where every leak of this class has
      lived.

## Risks

| Risk | Mitigation |
|---|---|
| **A KEEP is mis-triaged as a LEAK** and a course code a family matches against the school's catalog gets translated. | Phase 1's stop gate exists for exactly this; the ledger records reasons so a wrong call is visible rather than implied. Evidence rule: 8 locales rendering it as prose is what makes it prose. |
| **Editing English in step 4 orphans overlay stamps in all nine locales** — a recorded failure mode (a `metricValues.ts` string edit did exactly this). | Step 4 is deliberately in Phase 1, before translation; `check:live` + `check:runtime` are in the Phase 1 verification for this reason. |
| **The 183 turns out to contain far more keeps than leaks**, making the pass low-yield. | The two verified samples and the 1-locale band's size (266 strings) argue otherwise, but if triage finds mostly keeps, that is still a useful result — the ledger is the deliverable either way. Report the ratio honestly. |
| **Scope creep into the 3–6 band.** | Explicitly out of scope; recorded as follow-up 1. |

## Open questions

- **Should the 3–6 band's grade/time labels be translated at all?** (`Gr 1–5 · 2:55–4:30`,
  `TK · 1:00–3:00 pm`.) Four locales translate them, five don't. — **default:** out of scope
  here; settle it as follow-up 1 and apply one convention across all nine.
- **Does the ledger want a checker that fails when a ledgered KEEP later gets translated?**
  — **default:** no. This repo has a recorded history of permanently-red checkers, and a
  ledger is documentation. Revisit only if a keep is re-broken in practice.

---

## Follow-ups — deliberately not in this plan

1. **The 3–6 band, 386 distinct strings.** Dominated by grade/time labels and small figure
   labels. Needs one convention decided once and applied to all nine locales, not
   string-by-string triage.
2. **The 7+ consensus band's ledger lines.** Phase 1 records them, but no translation work
   is warranted; if the ledger proves useful, extending it to cover all 847 distinct
   strings is cheap follow-on documentation.


---

## Implementation notes — Phase 1 (2026-08-23)

### The scope is 147 strings, not 183 — the plan's arithmetic was wrong

The plan's headline figure could not be reproduced. Two independent methods agree on
**147**: an independent nine-locale aggregation over the work files, and a replay of the
tool's own stdout rows. Both return the identical topic spread.

The plan's per-locale totals (233/235/204/481/320/202/358/365/227 = 2,625) **reproduce
exactly**, so the raw measurement was sound; the error is downstream, in the distinct-string
banding. The tell is the plan's `financial-aid-report: 37` — only **2** strings from that
topic land in the ≤2 band under either method, and the plan's spread sums to exactly 183,
so 183 was derived from that inflated spread rather than measured.

Corrected banding (nine locales, ≥1 kept): 1→218, 2→68, 3→79, 4→91, 5→134, 6→72, 7+→77;
740 distinct strings, not 847.

Nothing about the approach changed — only the size of the pile.

### Triage outcome: 133 LEAK, 13 KEEP, 1 English-side defect

The ~9:1 leak ratio vindicates the ≤2 band as a filter.

### One KEEP overturned a call the plan cited as a verified leak

The plan offered `Director of Counseling Services` (kept by `bn`) as one of two
"unambiguous" leaks. It is a **KEEP**. `bn` keeps all six bare `Director` job titles in
Latin — `Director`, `Assoc. Director`, `Sr. Assoc. Director`, `Co-Director`,
`Director of Counseling` and this one — so translating it would make it the sole translated
Director title in the locale. This is the per-locale-consistency override the repo already
applied to `Athletic Director` on 2026-08-19, and it beats the cross-locale majority.

The plan's other cited sample, `supervised free time` (`fa`), is confirmed a genuine LEAK.

Recorded in the ledger because it is precisely the failure mode the ledger exists to
prevent: a string that reads as a leak from the cross-locale view and as convention from
inside the locale.

### English-side defect found and fixed (step 4)

`clubCatalog.ts` → Charlotte Catholic → `St. Augustine Club` carried the note
`'The St — advisor Mr. Kennelly, 309'`. Ingest truncated the source sentence at the period
in *St. Augustine*. Repaired from `source-material/student-clubs/charlotte-catholic/` using
the sibling notes' `…` convention.

As the plan's risk table predicted, this **orphaned the overlay stamp in all nine locales**,
and `check:live` caught it (`check:runtime` stayed green — it validates against the work
file, exactly the documented blind spot). Fixed by patching the single entry's `text` and
`of` in each of the nine work files and rebuilding.

**`i18n_extract.mjs --topic <t> --lang <l> --force` must NOT be used for this.** It blanked
all 933 translations in each file rather than carrying them over — the extractor is a spec,
not a writer. Reverted via git and patched surgically instead; the resulting diff is 3 lines
per work file.

That one note now renders English in all nine locales until Phase 2 re-translates it.

### Deviation: the Phase 2 worklist is committed, not left in the scratchpad

Step 5 said keep the LEAK list in the scratchpad. But the scratchpad is session-specific and
Phase 2 runs in a **fresh window**, which would lose it. Committed to
`.claude/plans/leaktriage-data/` instead. The durable KEEPS record remains
`src/data/overlays/NOTES.md`, as planned.

### Phase 2 workload

**133 strings / 174 (string, locale) edits** — most need only the 1–2 locales that kept
them. `fa` 43 · `te` 40 · `bn` 25 · `fr` 20 · `hi` 18 · `it` 12 · `es` 10 · `ht` 3 · `ar` 3,
plus the repaired St. Augustine note in all nine.

### Verification (Phase 1)

| Check | Result |
|---|---|
| `npx tsc --noEmit` | clean |
| `npm run build` (8 chained checks) | exit 0 |
| `npm run check:live` | ✓ all 9 locales resolve against live English |
| `npm run check:runtime` | ✓ 11,408 entries × 9 locales |
| `npm run check:sepdrift` × 9 | 0 drifted tokens |
| `npm run check:sources` × 9 | 11,409 English sources, 0 altered |
| `npm run check:chrome`, `check:script` | ✓ |
| Browser (Chrome, `en`/`es`/`ar`, panels forced open) | repaired note renders; no `The St —` fragment anywhere |
| `i18n:leaks` re-run × 9 | unchanged except `hi` 365→364 — correct, Phase 1 translates nothing |

`check:spans` passed inside the build, which supersedes the earlier note that it was red on
two gaston-day parse failures.

---

## Implementation notes — Phase 2 (2026-08-23)

### 100 translated, 74 reclassified as KEEP — the plan's 133 was over-counted by 43%

Phase 1 handed Phase 2 a worklist of **133 LEAK strings / 174 (string, locale) edits**.
Translating them revised that: **100 edits landed, 74 were reclassified as KEEPs.**

Every reclassification used **the override the Phase 1 ledger itself defines** — per-locale
internal consistency — applied to evidence Phase 1 had not gathered. Phase 1 scored each
string on the cross-locale test alone (*7–8 locales rendered this as prose, so it is
prose*). Phase 2 opened each locale's own siblings in the same card, and in 74 cases the
locale that kept the string was following a convention covering the whole class.

Examples that decided a whole group at once:

- **`ar`** keeps **11 of 12** Charlotte Catholic department names in Latin. Translating the
  three on the worklist would have made them the only Arabic entries in one rendered card.
- **`te`** keeps **all 12** bare National Merit tier strings, translating only when extra
  prose is attached. That single convention accounts for 12 of its 35 keeps.
- **`fr`** keeps **all 20+** `Sessions N, M` labels — `Session` is French.

**The methodological finding: the cross-locale diff is a good detector and a poor
adjudicator.** It cannot see how the same locale treats the string's siblings, which is the
evidence that actually decides the call. Recorded in the ledger for the next rollout.

Per-locale: translated `fa` 29 · `bn` 22 · `hi` 16 · `fr` 16 · `it` 10 · `es` 9 · `te` 5 ·
`ht` 2 · `ar` 0, plus the St. Augustine note in all nine.

### The same string is legitimately a LEAK in one locale and a KEEP in another

`Cross country / track` is a KEEP in `te` (bare sport names are roster identifiers) and a
genuine LEAK in `hi` (rendered `क्रॉस कंट्री / ट्रैक`). Both correct. The ledger is therefore
keyed by **(string, locale)**, never by string alone — a point the Phase 1 ledger's
by-English-text framing did not anticipate.

### Two defects found in the build path, neither caused by translation

1. **The wrong overlay builder silently empties the content overlay.**
   `financial-aid-tuition.content` stores a `blocks` object and keys its work units under
   `sections`. `i18n_build_overlay.mjs` looks for `strings`, so it **exits 0 and writes
   `{"strings": []}`** — a valid file holding nothing, which falls back to English for all
   70 blocks. The correct script is `i18n_build_content_overlay.mjs`, and it takes
   `--topic financial-aid-tuition` **without** the `.content` suffix.

2. **Three content blocks were translated in the shipped file but English in the work
   file** (`92553f5e`, `78e448bd`, `df673496` — Wayback tuition quotes, in `fr`/`it`/`hi`).
   The shipped overlay was ahead of its own source, so rebuilding regressed them. Restored
   into the work files from the shipped values, so a future rebuild is safe.

`check:runtime` reported green throughout both — it validates against the work file, the
documented blind spot. **`check:live` caught both.** The general lesson: a rebuild is not a
no-op; diff the shipped overlay against `HEAD` afterwards and treat any unintended block
change as a regression.

### Deviation: `--report-identical`-style verification instead of "every triaged leak gone"

The plan's verification asked that `i18n:leaks` show every triaged leak gone. That is not
achievable by design — a recorded KEEP still appears in the review queue, because the tool
reports *cross-locale difference*, not *defect*. Verified instead that each locale's count
fell by exactly its translated-edit count, which it did for all nine.

### Verification (Phase 2)

| Check | Result |
|---|---|
| `npx tsc --noEmit` | clean |
| `npm run build` (8 chained checks) | exit 0 |
| `npm run check:runtime` | ✓ 9 locales × **11,408** entries (was 11,407 — the St. Augustine note now ships) |
| `npm run check:live` | ✓ all 9 resolve against live English |
| `npm run check:sepdrift` × 9 | 0 drifted figure tokens |
| `npm run check:sources` × 9 | 11,409 English sources, 0 altered |
| `check:script` / `check:chrome` / `check:money` / `check:currency` / `check:bidi` | ✓ |
| `check:fa` / `check:hi` / `check:fr` | ✓ |
| `i18n:leaks` × 9 | es −9 · bn −22 · ht −2 · te −5 · fr −16 · fa −29 · it −10 · hi −16 · ar 0 — each exactly its edit count |
| Browser (Chrome, panels forced open) | 6 pages incl. 2 RTL (`fa`/`ar`) + lakh/crore (`te`/`hi`); 92k–163k chars rendered; 12 new translations confirmed rendering; no `The St —` fragment |

### Follow-up found but not fixed (out of scope)

`Drop-in (Before School, CCS)` is kept in English by `ht`, `bn`, `hi` and `te` while
`Drop-in (YCC & After School)` is translated by several of them — a sibling leak the ≤2
band did not surface. It belongs with the 3–6 band convention pass (follow-up 1).
