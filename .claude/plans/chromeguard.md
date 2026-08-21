---
name: chromeguard
title: Translate 'Half day', tighten the chrome-key checker, and make FOREIGN_TOPICS a verified claim
status: english-done
phases: 2
created: 2026-08-20
branch: fix/chrome-and-topic-guards
supersedes: [halfday, topicguard]
prs: []
---

# Translate `'Half day'`, tighten the chrome-key checker, and verify `FOREIGN_TOPICS`

## How to read this plan

This is a **merge of two plans**, `halfday` and `topicguard`, both written 2026-08-20 as
follow-ups to PR #167 (`checklive`). They are combined at the user's request into one branch
and one PR. Both originals stay in `.claude/plans/` as `superseded` and are the fuller record
of the reasoning behind each half; nothing in them was dropped in the merge, and where this
document compresses, it links back.

**The two halves are independent.** They share no source file except `CLAUDE.md`, and neither
depends on the other's outcome. That is what makes merging safe. It also means either half
can be abandoned mid-build without touching the other — if one turns out to be wrong, finish
the other and say so.

**Why the phase split is what it is.** `halfday` adds a user-facing string, so CLAUDE.md's
standing English-first rule applies: Phase 1 ships English and stops for the user's review,
Phase 2 translates to the nine locales. `topicguard` is scripts-only and single-phase.
**The merge puts ALL of `topicguard` in Phase 1**, where it ships alongside the English key
and the checker work. Phase 2 is then purely the nine locale catalogs plus the final build
wiring. The user reviews exactly once, in the middle, and reviews only wording.

The consequence, stated because it is a real cost the user accepted: `topicguard`'s script
work is *ready* at the Phase-1 stop but does not merge until Phase 2 completes, because both
phases land in one PR.

## Goal

Two defects, both surfaced by PR #167, both of the same family — **a promise nothing
verifies**.

**A. `'Half day'` renders English in all nine locales.** It is a value in `days` and
`dayFilters` in
[`src/data/summer/charlotte-catholic.ts`](../../src/data/summer/charlotte-catholic.ts). Those
fields are deliberately **skipped** by the prose extractor on the written promise that UI
chrome renders them from a locale key. No such key exists for this value, so `dayLabel()`'s
`defaultValue` returns the raw English on Charlotte Catholic's Summer Programs filter chip.

**B. `FOREIGN_TOPICS` is a silencing switch nothing checks.** PR #167's new guard tells a
maintainer facing a red build to add a topic to a one-line allowlist, and nothing verifies the
edit was honest. Adding `sports` to it turns a build-blocking guard green while silently
removing 995 shipped French entries from the check.

**And one tightening that outlives both**, discovered while planning A:
`check_chrome_keys.mjs` reads **only `src/locales/en.json`**. It is one of just two scripts
under `scripts/` that read `src/locales/` at all — so **no check in this repo verifies a
chrome key exists in the other nine catalogs.** That is a strictly larger hole than defect A,
and A's own Phase 2 is the exact failure mode it would miss.

Done when `node scripts/check_chrome_keys.mjs` exits **0** across all ten catalogs, the chip
renders in the reader's language in a real browser, `FOREIGN_TOPICS` entries are positively
verified against the content extractor, and both negative tests below fail the checks they
are meant to fail.

## Context — A: the `'Half day'` chrome key
### The defect, verified 2026-08-20

Five occurrences, all in `src/data/summer/charlotte-catholic.ts`:

| Line | Field |
|---|---|
| 51 | `dayFilters: ['Half day']` |
| 65 | `days: ['Half day']` (Cougar Basketball Camp) |
| 77 | `days: ['Half day']` (Eddie Hull Baseball Camp) |
| 89 | `days: ['Half day']` (Cougar Football Camp) |
| 102 | `days: ['Half day']` (Just4Kicks Soccer) |

`node scripts/check_chrome_keys.mjs` currently prints and exits **1** (confirmed by
`node scripts/check_chrome_keys.mjs >/dev/null; echo $?` → `1`):

```
✗ days → afterSchool.day_*
     "Half day" · "Mon" · "Tue" · "Wed" · "Thu" · "Fri"
     ^ NO LOCALE KEY for "Half day"
✗ dayFilters → afterSchool.day_*
     "All" · "Mon" · "Tue" · "Wed" · "Thu" · "Fri" · "Half day"
     ^ NO LOCALE KEY for "Half day"
```

**This is not a package.json script.** There is no `check:chrome` in `package.json` — run it
as `node scripts/check_chrome_keys.mjs`. It only became able to see this at all with PR #167
(the `checklive` plan), which replaced its five-topic map with the shared
`scripts/i18n_topics.mjs` and thereby gave it its first-ever read of the `summer-programs`
topic. The defect is pre-existing on `main`, not introduced by that PR.

### The render path

Both areas share one helper — identical code in two files:

- [`src/components/SummerPrograms.tsx:79-81`](../../src/components/SummerPrograms.tsx#L79)
- [`src/components/AfterSchool.tsx:77-79`](../../src/components/AfterSchool.tsx#L77)

```ts
function dayLabel(t: TFunction, day: string): string {
  return t(`afterSchool.day_${day}`, { defaultValue: day })
}
```

The key is **interpolated from the raw value**, so `'Half day'` looks for
`afterSchool.day_Half day` — a key that does not exist — and `defaultValue` silently returns
the English. That silence is the whole defect class: no error, no coverage change, nothing an
extractor or a stamp check can see.

**Where `'Half day'` actually reaches the page — one place, not five.**

- **`dayFilters`** → rendered, at
  [`SummerPrograms.tsx:298`](../../src/components/SummerPrograms.tsx#L298):
  `{d === 'All' ? t('summerPrograms.dayFilterAll') : dayLabel(t, d)}`. This is the filter
  chip. **This is the visible defect.**
- **`days`** → **not rendered**. In the summer catalog it is a filter-match token array only
  ([`SummerPrograms.tsx:228`](../../src/components/SummerPrograms.tsx#L228):
  `const dayOk = day === 'All' || c.days.includes(day)`). The "when" column at
  [line 349](../../src/components/SummerPrograms.tsx#L349) renders `c.dayLabel`, a *different*
  field holding `'June 8–11'`, `'July'` etc.

  (In After School the sibling scalar `c.day` **is** rendered, at
  [`AfterSchool.tsx:649`](../../src/components/AfterSchool.tsx#L649). No After School data
  file carries `'Half day'`, so nothing there is affected today.)

So `days` and `dayFilters` must **match each other by value** for the filter to work, and one
of the two is displayed. That coupling is what rules out design option (c) below.

### The vocabulary today, measured app-wide

The complete set of distinct values across `day`, `days` and `dayFilters` in all of
`src/data/**`:

```
"All"  "Mon"  "Tue"  "Wed"  "Thu"  "Fri"  "—"  "Half day"
```

`'Half day'` is the **only** non-weekday member — and it is a **duration**, not a weekday. It
is a different kind of thing living in a weekday-vocabulary field: exactly CLAUDE.md's
recurring *"a sentence wearing an identifier's clothes"* shape, one notch milder (a phrase
rather than a sentence).

`'—'` and `'All'` are deliberately exempt — see the `exempt` lists in
[`scripts/check_chrome_keys.mjs:54-57`](../../scripts/check_chrome_keys.mjs#L54); `'All'` is a
filter sentinel compared against rather than displayed, and has its own keys
(`summerPrograms.dayFilterAll` / `afterSchool.dayFilterAll`).

Charlotte Catholic is also the **only** school with a non-empty summer `dayFilters` — every
other `src/data/summer/*.ts` has `dayFilters: []`. So this one chip is the entire user-visible
blast radius.

### Why the value is what it is

The source record supports it as a real, deliberate fact rather than sloppy data —
`source-material/summer-programs/charlotte-catholic/Charlotte Catholic - Summer Programs -
2026 Camp Catalog.md:83`:

> every CCHS camp is a **half-day block** (3–4 hours). There is no wrap-around or full-day
> care.

CCHS publishes no weekday pattern for any camp, so the day axis carries the one thing it does
publish. The data is right; the chrome is missing.

### The existing key set

`src/locales/en.json` (`afterSchool` block, lines 209–214) holds `day_Mon`, `day_Tue`,
`day_Wed`, `day_Thu`, `day_Fri` and `dayFilterAll`. All nine other catalogs carry the same
five, correctly translated — e.g. `es` `Lun/Mar/Mié/Jue/Vie`, `fr` `lun./mar./mer./jeu./ven.`,
`ar` `الاثنين…`, `hi` `सोम…`. So the pattern to follow is established and complete; this plan
adds a **sixth** member to it.

### Two verified facts that unblock the design choice

1. **An i18next key containing a space resolves.** Tested against the repo's own i18next:
   `t('afterSchool.day_Half day')` returned the value from a nested `afterSchool` object with
   the literal key `'day_Half day'`. The default `keySeparator` is `.`, so a space is not a
   separator and nothing needs escaping. Both the space form and an underscore-slug form work.
2. **Locale-catalog key parity is currently perfect** — all nine locales have zero missing
   keys against `en.json`. (`ar.json` has 68 *extra* keys; every one is an Arabic plural form
   `_zero/_two/_few/_many`, verified by suffix, so it is not drift.) A new key must therefore
   land in all ten files or it becomes the first parity gap.

### Nothing else guards this

`check_chrome_keys.mjs` reads **only `src/locales/en.json`**. It is the only script under
`scripts/` besides `i18n_fields.mjs` that reads `src/locales/` at all — so *no check in this
repo verifies that a chrome key exists in the other nine catalogs*. A Phase-2 miss would be
invisible to every automated check, which is why Phase 2's verification below reads the
catalogs directly.

## Context — B: the `FOREIGN_TOPICS` allowlist
### The escape hatch, as it stands

[`check_live_resolution.mjs:59`](../../scripts/check_live_resolution.mjs#L59) is the whole
mechanism:

```js
const FOREIGN_TOPICS = new Set(['financial-aid-tuition.content'])
```

Consumed once, at [line 178](../../scripts/check_live_resolution.mjs#L178):

```js
const topic = file.slice(0, file.length - `.${LANG}.json`.length)
if (FOREIGN_TOPICS.has(topic)) continue
```

A `continue` before anything is read. The entry's docstring
([lines 48–58](../../scripts/check_live_resolution.mjs#L48)) is careful and correct about
*why* the one current entry belongs — it names `i18n_extract_content.mjs` and `src/content/**`
— but a docstring is a comment, and the next entry added need not resemble it.

The plan #167 was working from asserted that this file "holds 0 strings today, so it
contributes nothing either way." **That is not what is on disk** — see the correction below,
which changes what this check can verify.

### Two failure modes, not one

The existing guard and the proposed one are opposites, and only the first is covered:

| Move | Today |
|---|---|
| A topic **in `TOPICS`** yields zero live English | **Caught** — the guard at [lines 184–193](../../scripts/check_live_resolution.mjs#L184) fires, one line, exit 1 |
| An overlay topic in **neither** `TOPICS` nor `FOREIGN_TOPICS` | Caught *by accident* — `byTopic.get(topic)` returns `undefined`, so the same guard fires. The message blames `i18n_topics.mjs` wiring, which is right, but nothing states the completeness invariant |
| A **genuine `src/data` topic added to `FOREIGN_TOPICS`** to silence the above | **Not caught at all.** `continue` at line 178, no diagnostic, no exit code, coverage silently shrinks |
| A `FOREIGN_TOPICS` entry for a topic that no extractor produces (typo, stale entry) | **Not caught.** A misspelled entry simply never matches, so it is dead weight that reads as protection |

The third row is the one that matters. It converts a loud failure into a permanent blind
spot, and it does so through the exact remediation the error message recommends.

### Correction to an inherited assumption — the content overlay is NOT empty

The `checklive` plan and the `FOREIGN_TOPICS` docstring both state the content overlay
"holds 0 strings today." Verified on disk during this planning pass, that is **wrong**, in a
way that makes verification easier rather than harder:

```
src/data/overlays/financial-aid-tuition.content.fr.json
  keys: ['topic', 'lang', 'blocks']     blocks: 70     strings: —
src/data/overlays/sports.fr.json
  keys: ['topic', 'lang', 'strings']    blocks: —      strings: 995
```

The content overlay holds **70 fully translated blocks** in each of the nine locales. The
"0 strings" reading came from asking for `.strings` — which the content overlay does not have.
It carries a `blocks` **object** keyed by hash, written by a different builder than
[`i18n_build_overlay.mjs`](../../scripts/i18n_build_overlay.mjs#L56) (which emits
`{topic, lang, strings: []}`).

Two consequences:

- **There is a second, independent reason the file is skipped today.** Even without
  `FOREIGN_TOPICS`, [line 196](../../scripts/check_live_resolution.mjs#L196)
  (`if (!Array.isArray(shipped.strings)) continue`) would skip it. The allowlist and the
  shape check are two belts on the same trousers — which is *why* nobody has noticed the
  allowlist is unverified.
- **The entry is verifiable against real content**, because there are 70 real hashes to
  reproduce. Had it truly held 0 strings, the strongest available check would have been
  structural. It does not, so a much stronger one is available.

### Can a `FOREIGN_TOPICS` entry be positively verified? — Yes. Measured, not assumed.

This is the heart of the plan, so it was tested during planning rather than reasoned about.

**Gate 1 — the extractor's own `LIVE` map rejects every `src/data` topic.**
[`i18n_extract_content.mjs:43`](../../scripts/i18n_extract_content.mjs#L43) declares the only
topics it will process, and
[lines 169–173](../../scripts/i18n_extract_content.mjs#L169) exit 2 on anything else. Run
against each `src/data` topic:

```
sports            -> --topic must be one of: financial-aid-tuition, student-clubs
college-support   -> --topic must be one of: financial-aid-tuition, student-clubs
metric-values     -> --topic must be one of: financial-aid-tuition, student-clubs
course-offerings  -> --topic must be one of: financial-aid-tuition, student-clubs
```

So the falsification move the goal describes — pasting a genuine `src/data` topic into the
allowlist — is refused by the content extractor itself, on its own authority. No list needs
to be mirrored into the new check for this to hold.

**Gate 2 — the shipped hashes reproduce from a fresh extract.** The extractor was run for
real into a throwaway locale (`--lang __probe`, which touches no shipped file), and its
output compared to the shipped French overlay:

```
probe sections: 70
shipped hashes reproduced by a FRESH extract: 70 / 70
```

Every hash in `financial-aid-tuition.content.fr.json` is reproducible from `src/content/**`
today. That is a **positive** demonstration — not "no source was found in `src/data`", but
"this source was found in `src/content`, and it is the one these blocks were made from."

**The extractor cannot be imported — it must be driven as a subprocess.**
[`i18n_extract_content.mjs:254`](../../scripts/i18n_extract_content.mjs#L254) calls `main()`
at module scope, so `await import()` of it exits the *calling* process with code 2. Confirmed:

```
$ node -e "await import('./scripts/i18n_extract_content.mjs')"
--topic must be one of: financial-aid-tuition, student-clubs
```

This is precisely the hazard that forced `i18n_topics.mjs` to be split out of
`i18n_extract.mjs` rather than imported from it (`checklive` Decisions), recurring one module
over. It constrains *how* to call the extractor, not *whether* it can be verified.

### The topic-name parse has a dot in it, and that is load-bearing

`financial-aid-tuition.content.fr.json` parses to the topic `financial-aid-tuition.content`
— topic name and extractor discriminator fused into one string by
[line 177](../../scripts/check_live_resolution.mjs#L177). The extractor takes only
`financial-aid-tuition` as `--topic`. Any verification must split the `.content` suffix back
off before invoking it; hardcoding the full string as a `--topic` argument fails at gate 1
against the check's own legitimate entry.

### The precedent this repo already trusts

CLAUDE.md records the shape twice. `LOCALES` in `seo_routes.mjs` is a hand-kept mirror that
"stays honest only because `check:seo` re-parses `TRANSLATED` and fails on drift." And
`i18n_audit_skips.mjs` is on record as having "missed a defect once because its sample size
doubled as its coverage." `FOREIGN_TOPICS` is the same shape with neither guard: a
hand-maintained list, consulted by a gate, verified by nothing.
## Decisions — A: the `'Half day'` chrome key

### The design choice — recommendation, with reasoning

Three options were considered. **Take (a).**

**(a) — RECOMMENDED. Add a locale key for the value, keeping it in the day vocabulary, and
give `dayLabel()` a value→key-slug mapping.**

Add `afterSchool.day_HalfDay` (or the space form; see below) to all ten catalogs, and slug
the interpolated value in `dayLabel()` so a value with a space produces a well-formed key.

Why this and not the others:

- **It is the smallest change that makes the promise true.** The field's skip description
  already claims chrome ownership; the fix is to supply the chrome, which is precisely what
  `check_chrome_keys.mjs` was written to demand. Nothing about the classification was wrong —
  `'Half day'` *is* a closed-vocabulary token, identical for every school that would ever use
  it, and it does not belong in the per-school prose overlay.
- **It preserves the filter coupling.** `days` and `dayFilters` are compared by value
  ([`SummerPrograms.tsx:228`](../../src/components/SummerPrograms.tsx#L228) and
  [`:294`](../../src/components/SummerPrograms.tsx#L294)); the English token stays the state
  value and only the *label* is translated, which is exactly how `'All'` is already handled
  and is documented as such in the `AfterSchool.tsx` comment at line 592.
- **It scales to the next value.** A slug mapping plus a tightened checker (step 5) turns
  "someone adds `'Full day'` or `'Evening'`" from a silent English leak into a loud failure.

**(b) — Rejected: treat it as a separate field/concept.** Introduce e.g. a `duration` axis and
move `'Half day'` out of the day vocabulary. This is arguably the *conceptually* cleanest —
the value genuinely is a duration — but it is a **UX change**: a new filter axis (or the
removal of Charlotte Catholic's only day chip) alters the rendered card and therefore trips
CLAUDE.md's UX-design gate, needing the user's prior approval. It also costs a type change to
`Camp`/`CampCatalog` in [`src/data/summerPrograms.ts:86-115`](../../src/data/summerPrograms.ts#L86),
edits to both components, and a data migration — all to fix one string in one school's card.
The cost/benefit is plainly wrong for a defect this size, and the coupling argument above
means the day axis would then be *empty* for Charlotte Catholic, so the chip disappears
entirely — a product decision nobody asked for.

**(c) — Rejected: drop `'Half day'` from `dayFilters` and leave it only in `days`.** The chip
vanishes, the checker still fails on the `days` leaf, and Charlotte Catholic loses its only
day filter. This trades a visible defect for a data deletion and does not even clear the
check. Not viable.

**Note the recommendation is (a) *with* a slug mapping, not (a) bare.** Adding a literal
`"day_Half day"` key would work — verified above — but it makes the key set inconsistent
(five keys are code-shaped, one has a space), it is fragile against a future value with
punctuation, and it reads as an accident in a translator's file. Slugging is one line.

### Other decisions

- **Key name: `afterSchool.day_HalfDay`.** Keeps the existing `afterSchool.day_*` namespace,
  which both components already share deliberately ("the words are the same words" —
  `SummerPrograms.tsx:70-77`). PascalCase after the prefix so the slug rule is trivially
  `value.replace(/[^A-Za-z0-9]/g, '')`-shaped and reversible by eye.
- **Slug in `dayLabel()`, not at the call sites.** Both copies of the helper change
  identically; the call sites keep passing raw values, and the state/filter comparisons stay
  on the English token.
- **English wording: `Half day`** — unchanged from the data value, so the English page is
  byte-identical after Phase 1. That is deliberate: it makes Phase 1's browser check a pure
  regression check (nothing should *look* different in English), and it means the only thing
  the user reviews is the string that goes to the translators.
- **Tighten the checker's contract (step 5), in the same PR.** Recommendation: make
  `check_chrome_keys.mjs` a **build gate**. See *Open questions* for the alternative.
- **Two phases.** A new `src/locales/*.json` key is user-facing text by CLAUDE.md's i18n
  standard, so Phase 1 ships English and stops.

## Decisions — B: the `FOREIGN_TOPICS` allowlist

- **The check lives inside `check_live_resolution.mjs`, not in a new script.** Three reasons.
  It inherits build-gate status for free — `check:live` is already in `build` via
  [`check_live_all.mjs`](../../scripts/check_live_all.mjs), and a separate script would need
  its own `package.json` wiring and its own argument for becoming a gate. It needs the file
  listing and topic parse the script already performs at
  [lines 170–177](../../scripts/check_live_resolution.mjs#L170). And it guards a constant
  declared in this file and read nowhere else — moving the assertion away from the
  declaration is how the two drift.
- **Run the completeness assertion once per invocation, before the per-file loop** — over the
  distinct topics of `readdirSync(OVERLAYS)` for the current `--lang`. Not inside the loop:
  the finding is about the topic set, and per-file it would print nine times.
- **Verify `FOREIGN_TOPICS` entries by re-running the content extractor as a subprocess and
  matching hashes**, per the measured result above. `execFileSync` with `--lang` set to a
  throwaway code, then compare the produced work file's `of` values against the shipped
  overlay's `blocks` keys. This is the strongest available evidence and it was proven to
  work at 70/70.
- **Require every shipped block hash to be reproduced — a strict superset check, one
  direction only.** Assert `shipped ⊆ freshly-extracted`. Not equality: the extractor
  legitimately yields blocks nobody has translated yet, and those are dropped from the
  shipped overlay by design ("drops any entry left untranslated",
  [`i18n_build_overlay.mjs:13`](../../scripts/i18n_build_overlay.mjs#L13)). Demanding
  equality would fail on normal, correct partial translation.
- **A `FOREIGN_TOPICS` entry with zero shipped blocks passes on gate 1 alone.** The
  `financial-aid-tuition.content` file is populated today, but `student-clubs` extracts to
  **0 blocks** ("nothing translatable — every section is card-replaced"), so a legitimately
  empty foreign overlay is a real state. When a foreign overlay ships no blocks, the check
  requires only that the extractor **accepts the topic and exits 0** — which still refuses
  every `src/data` topic. This is the direct answer to "must not simply assert the file is
  non-empty."
- **A `FOREIGN_TOPICS` entry matching no overlay file at all is a failure, not a no-op.** A
  typo'd or stale entry reads as protection while protecting nothing. Fail with its own
  message.
- **Do not remove the `Array.isArray(shipped.strings)` shape check at
  [line 196](../../scripts/check_live_resolution.mjs#L196).** It is a second independent
  reason the content overlay is skipped, and this plan's job is to add verification, not to
  remove a working belt. Note it in a comment so the redundancy is deliberate rather than
  accidental.
- **Cache the extractor subprocess per topic.** `check_live_all.mjs` runs the script nine
  times, once per locale; the extraction is locale-independent for hash purposes. Within a
  single invocation, run it once per distinct foreign topic.

## Approvals needed

**None, for either half.** Stated rather than skipped, because one *rejected* option would
have needed approval.

**A.** Adding a locale key for a string the app **already renders** is not a new card,
section, sub-section, stat tile, Compare row, metric key or topic, and it reorders and
restyles nothing. The chip at `SummerPrograms.tsx:298` exists today and occupies the same
place with the same English wording after Phase 1 — only its non-English rendering changes.
Under CLAUDE.md's UX-design gate this is enrichment of an existing surface, explicitly
allowed. The rejected option (b) — a separate duration axis — **would** have tripped the
gate, and that is part of why it was rejected.

**B.** Scripts only: one file edited plus a `CLAUDE.md` note. Nothing reaches the interface
at all.

## Out of scope

**Shared:**

- **`CLAUDE.md` is the only file both halves touch.** Each adds its own entry under the i18n
  standard; they do not conflict.

**From A:**

- **Any change to `src/data/summer/charlotte-catholic.ts`.** The data is correct and
  source-backed; this is a chrome fix.
- **The overlay layer (`src/data/overlays/**`).** `days`/`dayFilters` stay in `SKIP_KEYS` —
  the classification was right. Nothing in `PROSE_TRANSLATED` changes. **This is a
  `src/locales/*.json` chrome fix, not a prose overlay fix** — the standing layer trap.
- **Introducing a duration/`'Full day'` axis** (option b). Considered and rejected, not
  deferred.
- **The advisory findings from `i18n_audit_skips.mjs`** that PR #167 newly surfaced, and
  wiring that script into `package.json`. Only `check_chrome_keys.mjs` is in question here.

**From B:**

- **Changing `FOREIGN_TOPICS`'s one current entry, or adding another.** The entry is verified
  correct (70/70 hashes reproduce); this plan builds the check that proves it.
- **Wiring `financial-aid-tuition.content` into `check:live`'s real resolution path.** See the
  corrected coverage note below — a finding to report, not to fix here.
- **The `blocks` vs `strings` overlay-shape divergence.** Two builders emit two shapes. Worth
  knowing; not this plan's to unify.

### Correction carried into this merge — the 70 blocks are NOT uncovered

`topicguard`'s Out of scope stated those 70 blocks "are checked by neither `check:live` nor
`check:runtime` today." **That is wrong, and the correction narrows the finding usefully.**
[`check_runtime_resolution.mjs:70-72`](../../scripts/check_runtime_resolution.mjs#L70) reads
`Object.keys(shipped.blocks ?? shipped.sections ?? {})`, so it **does** handle the `blocks`
form. Measured: `check:runtime` reports **11,411 entries across 10 overlay files** per locale
while `check:live` reports **11,341 across 9** — a difference of exactly the 70 blocks.

So the real finding is not "covered by neither" but **"covered only by the weaker of the
two."** `check:runtime` validates against the *work file*, which is precisely the blind spot
`check:live` exists to close — so those 70 blocks have no live-source guard. Still a genuine
gap, still out of scope here, but a smaller and more precisely stated one.

## Steps

**Two phases**, because half A adds a user-facing string (`afterSchool.day_HalfDay`) to the
locale catalogs. Phase 1 is English plus **all** script work — including the whole of the
`topicguard` half — and `/implement` stops there for the user's review. Phase 2 is the nine
locale catalogs and the final build wiring.

### Phase 1 — English, and every script change

**Branch** `fix/chrome-and-topic-guards` off current `main`. Set the plan `status:
in-progress` before starting.

#### 1–6 · Half A — the `'Half day'` chrome key and the checker tightening

1. **Record the baseline.** Run and save the output of:
   ```bash
   node scripts/check_chrome_keys.mjs; echo "exit=$?"
   ```
   Expect `exit=1` with the two `✗` blocks quoted in Context. This is the before-state the
   fix is measured against.

2. **Add the key to `src/locales/en.json`** — inside the existing `afterSchool` block, beside
   `day_Fri`/`day_Mon`/… (lines 209–214). The block is alphabetically sorted, so
   `"day_HalfDay": "Half day"` sorts between `"day_Fri"` and `"day_Mon"`. Match the file's
   existing 2-space indentation and quoting exactly; do not reformat the file.

3. **Slug the value in `dayLabel()` — both copies.** In
   [`src/components/SummerPrograms.tsx:79`](../../src/components/SummerPrograms.tsx#L79) and
   [`src/components/AfterSchool.tsx:77`](../../src/components/AfterSchool.tsx#L77), which are
   currently byte-identical and must stay so:

   ```ts
   function dayLabel(t: TFunction, day: string): string {
     return t(`afterSchool.day_${day.replace(/[^A-Za-z0-9]/g, '')}`, { defaultValue: day })
   }
   ```

   The five weekday codes are unaffected (already alphanumeric); `'—'` slugs to the empty
   string, which finds no key and falls through to `defaultValue: day` — the same `'—'` it
   renders today. Verify that em-dash behaviour explicitly; it is the one value the slug
   changes the lookup for.

   **Extend the existing doc comment above each helper** (`SummerPrograms.tsx:70-78`,
   `AfterSchool.tsx:68-76`). Today it says the vocabulary is "a closed five-value vocabulary
   (Mon…Fri)". That is now false. Say instead that the vocabulary is closed but no longer
   weekdays-only, that `'Half day'` is a duration Charlotte Catholic uses because it publishes
   no weekday pattern, that the raw value is slugged into the key so a value with a space
   still resolves, and that **`check_chrome_keys.mjs` is what stops the next such value
   shipping as English.**

4. **Tighten the checker's contract so the next value fails loudly.** In
   [`scripts/check_chrome_keys.mjs`](../../scripts/check_chrome_keys.mjs):

   a. **Teach `CLAIMS` the slug**, so the checker computes the same key the component does.
      The `CLAIMS` rows already support an optional `map` (used by the `basis` row at line 59
      and applied at line 183). Add it to the three day rows:
      ```js
      const daySlug = (v) => v.replace(/[^A-Za-z0-9]/g, '')
      { leaf: 'day',        prefix: 'afterSchool.day_', exempt: ['—'], map: daySlug },
      { leaf: 'days',       prefix: 'afterSchool.day_', exempt: ['—'], map: daySlug },
      { leaf: 'dayFilters', prefix: 'afterSchool.day_', exempt: ['All', '—'], map: daySlug },
      ```
      Keep the `map` definition adjacent to the component's, with a comment naming both
      `dayLabel()` sites, so the two cannot drift apart unnoticed.

   b. **Add the tightening that matters — check every locale, not just English.** Today
      `hasKey()` reads only `src/locales/en.json` (line 65), so a key present in `en` and
      missing from the other nine passes clean. That is exactly the Phase-2 failure mode this
      plan can produce, and nothing else in `scripts/` would catch it (no other script reads
      `src/locales/` except `i18n_fields.mjs`). Load every catalog named by `TRANSLATED` in
      `src/lib/i18n.ts` — **parsed from that file, not hardcoded**, the same
      drift-resistance rule `check_seo.mjs` already applies to `LOCALES` — and report a
      missing key per locale.

      Because Phase 1 deliberately ships `en` alone, this **will** report nine missing keys
      at the end of Phase 1. That is correct and expected: it is the check announcing that
      Phase 2 has not run yet. Give the per-locale finding its own distinct message and a
      **separate exit-code path** so it can be read as "translation pending" rather than
      "broken promise" — see Verification for the exact expected states.

   c. **Make an unlisted value a hard failure with an actionable message.** The existing
      message already says the raw English reaches the page; add the missing half — that a
      new member of a chrome vocabulary needs a key in every catalog *and* a `CLAIMS`/`map`
      review, and name `src/locales/en.json` and this file as the two places to edit.

5. **Wire it into the build.** Add `"check:chrome": "node scripts/check_chrome_keys.mjs"` to
   `package.json` scripts, and append `&& npm run check:chrome` to the `build` script (which
   today ends `… && npm run check:ncsuper && npm run check:live`).

   **Gate this on the check being green.** During Phase 1 it will not be — step 4b makes it
   report nine pending locales. So: add the `check:chrome` script entry in Phase 1, but do
   **not** add it to `build` until Phase 2 (step 16). If the per-locale finding is given a
   non-blocking exit path in 5b, chaining it in Phase 1 is acceptable; the implementer picks
   one and says which in the PR body. Never leave `build` red at the Phase-1 stop.

6. **Phase-1 browser check** — see Verification. English must be **visually unchanged**.

#### 7–13 · Half B — verify `FOREIGN_TOPICS`

Independent of steps 1–6; nothing here touches `src/locales/**` or either component. If half
A stalls, this half still ships, and vice versa — say which in the PR body if it happens.

7. **Add a `contentExtractorTopics()` helper** to `scripts/check_live_resolution.mjs` —
   parse the `LIVE` map keys out of `scripts/i18n_extract_content.mjs` source, the same
   re-parse-the-authority technique `check_live_all.mjs` uses for `PROSE_TRANSLATED`
   ([lines 23–29](../../scripts/check_live_all.mjs#L23)) and `check_seo.mjs` uses for
   `TRANSLATED`. Do **not** `import()` it — that runs `main()` and exits the process
   (verified; see Context). This gives a cheap structural pre-filter before paying for a
   subprocess.

8. **Add the completeness assertion**, after the file list is built at
   [line 170](../../scripts/check_live_resolution.mjs#L170) and before the per-file loop.
   Derive the distinct topic set from the filenames using the same
   `file.slice(0, file.length - `.${LANG}.json`.length)` parse. For each topic assert it is
   accounted for by **exactly one** of `TOPICS` (accessor topics included — they are `TOPICS`
   keys with a `null` value, so test `topic in TOPICS`, never truthiness of `TOPICS[topic]`)
   or `FOREIGN_TOPICS`. Report two distinct findings:
   - **Unaccounted for** — in neither. Message names both remedies, mirroring the existing
     guard's wording at [line 226](../../scripts/check_live_resolution.mjs#L226).
   - **In both** — a topic wired into `TOPICS` *and* allowlisted. Contradictory: the
     allowlist would suppress a topic that has a real English source. Fail.

9. **Add `verifyForeignTopic(topic)`** — the positive verification, the point of the plan.
   For each entry in `FOREIGN_TOPICS`:
   - Split the extractor discriminator off the parsed topic name: `financial-aid-tuition.content`
     → base `financial-aid-tuition`, suffix `content`. **Required** — the extractor rejects
     the fused string (see Context).
   - **Gate 1.** Assert the base topic is a key of the extractor's `LIVE` map (step 6). If
     not, fail: the topic is not something `i18n_extract_content.mjs` can produce. This alone
     refuses every `src/data` topic, since `LIVE` holds exactly
     `financial-aid-tuition` and `student-clubs`.
   - **Gate 2.** Run the extractor as a subprocess —
     `execFileSync('node', ['scripts/i18n_extract_content.mjs', '--topic', base, '--lang', '__verify'])`
     — and read the work file it writes. Use a throwaway `--lang` code that is in no locale
     list, so no shipped or real work file is ever overwritten (the extractor's
     carry-over-existing-translations branch at
     [lines 236–247](../../scripts/i18n_extract_content.mjs#L236) makes clobbering a real
     work file the one genuinely destructive move available here). **Delete the temp work
     file in a `finally`**, so a mid-run failure cannot leave `src/data/overlays/work/`
     dirty.
   - Compare: every key of the shipped overlay's `blocks` object must appear among the
     extracted sections' `of` values. Superset, one direction (see Decisions). Report any
     unmatched hash.
   - If the shipped overlay has **no** blocks, gate 1 plus a clean exit is the whole
     assertion — an empty foreign overlay is legitimate (`student-clubs` extracts to 0).
   - If **no overlay file matches the entry at all** for this locale, fail as a stale or
     misspelled entry.
   - Cache per base topic so nine locale runs do not spawn nine identical subprocesses.

10. **Wire both into the exit path.** Follow the file's established shape: accumulate counts,
   print each finding as it is found, and add a summary block beside the existing `unsourced`
   one at [lines 224–231](../../scripts/check_live_resolution.mjs#L224) that exits 1. Keep
   the distinct-message discipline the existing guard has — the value of that guard is that
   it names its own cause, and "FOREIGN_TOPICS entry could not be verified against the
   content extractor" must not be confusable with "stale translation."

11. **Update the `FOREIGN_TOPICS` docstring**
   ([lines 48–58](../../scripts/check_live_resolution.mjs#L48)) — it currently asserts the
   overlay "holds 0 strings today," which is **false** (70 translated blocks per locale; see
   Context). Correct it, state that entries are now *verified* rather than trusted, and record
   that the `blocks`-vs-`strings` shape divergence at
   [line 196](../../scripts/check_live_resolution.mjs#L196) is a deliberate second reason the
   file is skipped, not an accident.

12. **Run the verification suite**, including both negative tests below. The negative test in
   the FOREIGN_TOPICS negative test in Verification is the one that decides whether this plan delivered anything.

13. **Record it in `CLAUDE.md`** — a short addition to the paragraph `checklive` added under
   the i18n standard: that `FOREIGN_TOPICS` in `check_live_resolution.mjs` is verified against
   the content extractor rather than trusted, that every overlay topic must be accounted for
   by exactly one of `TOPICS`/`FOREIGN_TOPICS`, and the one-line reason — a build gate whose
   error message recommends editing an unverified allowlist is a gate with a documented
   bypass. Correct the "0 strings" claim wherever it appears.

**A note on the two `CLAUDE.md` entries (steps 6 and 13).** Both halves add a short entry
under the i18n standard. Write them as **one edit pass** at the end of Phase 1 so the section
reads coherently rather than as two bolted-on paragraphs — half A's is about the chrome
vocabulary and its new gate, half B's about the verified allowlist. Step 13 also corrects the
"0 strings" claim, which appears in the `FOREIGN_TOPICS` docstring and in `checklive.md`.

**→ STOP. `/implement` ends its turn here and waits for the user's review.** Nothing in Phase 2
runs until the user confirms the English wording (`Half day`) is what they want. If they want
different wording — `Half-day`, `Half day only`, `Half-day camps` — that changes the `en`
value in step 3 and, if they want the *data* to match, is a separate decision to raise before
Phase 2, since the data value is source-backed and out of scope here.


### Phase 2 — Every other locale

Only after that confirmation.

**Layer: the UI-chrome catalogs.** `src/locales/<lang>.json` for the nine locales in
`TRANSLATED` (`src/lib/i18n.ts:108`, minus `en`):

```
es  bn  ht  te  fr  fa  it  hi  ar
```

**Not** the overlay layer, and **not** `PROSE_TRANSLATED` — no `src/data/overlays/**` file is
touched by this plan.

14. **Add `afterSchool.day_HalfDay` to each of the nine catalogs.** Insert into the existing
   `afterSchool` block in alphabetical position beside that file's existing `day_*` keys.

   **Translate to the sense "a half-day session/block", not a literal calendar phrase.** The
   value labels a filter chip meaning *these camps run a half-day block of 3–4 hours*. Match
   each locale's established register in the same file — the five weekday keys are the direct
   precedent, and the neighbouring `afterSchool.daysUntilPickup_*` strings show each locale's
   wording for day-length concepts.

   Locale-specific care, per the rollout docs in `.claude/docs/`:
   - **`ar` and `fa` are RTL.** The string is pure prose with no figures or Latin
     identifiers, so no LRI/PDI isolate is required — but confirm in the browser rather than
     assuming (`prose-translation-fa.md`).
   - **`hi`/`te`/`bn`** carry no digits here, so no lakh/crore or numeral concern applies.
   - **No figure appears in this string**, so `check:figures` / `check:sepdrift` have nothing
     to say about it — do not expect them to move.

15. **Do not add plural variants.** The string is not counted; `ar`'s 68 extra `_zero/_two/
   _few/_many` keys all belong to genuinely pluralised strings (`colDays`,
   `daysUntilPickup`). Adding a bare `day_HalfDay` to `ar` keeps parity at
   *0 missing / 68 extra*, unchanged.

16. **Chain `check:chrome` into `build`** (deferred from step 5) once the check is fully
    green across all ten catalogs.

17. **Record half A's rule in `CLAUDE.md`** — deferred from step 6 only if the wording
    changed at the review; otherwise it already landed in Phase 1's single edit pass
    (step 13's note). Either way, by the end of Phase 2 the i18n standard must say: that
    `day`/`days`/`dayFilters` are a **closed chrome vocabulary that is no longer
    weekdays-only**, that every member needs a key in **all ten** catalogs, that the value is
    slugged into the key so spaces and punctuation are safe, and that `npm run check:chrome`
    is the gate. One or two sentences, beside the existing note about skipped fields that
    ship English.

## Files touched

| File | Half | Change |
|---|---|---|
| `src/locales/en.json` | A | edit — add `afterSchool.day_HalfDay: "Half day"` (Phase 1) |
| `src/locales/{es,bn,ht,te,fr,fa,it,hi,ar}.json` | A | edit — add the translated key, 9 files (Phase 2) |
| `src/components/SummerPrograms.tsx` | A | edit — slug the value in `dayLabel()` (~line 79); update the doc comment above it |
| `src/components/AfterSchool.tsx` | A | edit — identical change (~line 77) |
| `scripts/check_chrome_keys.mjs` | A | edit — `map: daySlug` on the three day `CLAIMS` rows; check all `TRANSLATED` catalogs, not just `en`; sharper failure message |
| `scripts/check_live_resolution.mjs` | B | edit — completeness assertion, `verifyForeignTopic()`, `contentExtractorTopics()`, corrected docstring, new exit path |
| `package.json` | A | edit — add `check:chrome`; chain into `build` (Phase 2) |
| `CLAUDE.md` | A+B | edit — the chrome-vocabulary rule and new gate; the verified-allowlist rule and the "0 strings" correction |

**Not touched:** `src/data/summer/charlotte-catholic.ts`, `scripts/i18n_fields.mjs`
(`SKIP_KEYS` classification is correct and stays), any `src/data/overlays/**` file,
`scripts/i18n_topics.mjs`, `scripts/i18n_extract_content.mjs`.

**No file is edited by both halves except `CLAUDE.md`** — which is what makes the merge a
sequencing decision rather than an integration one.

## Verification

### Phase 1 — English and scripts

**Half A:**

- [ ] `npx tsc -b` — clean
- [ ] `node scripts/check_chrome_keys.mjs` — the two `✗` blocks for `days` / `dayFilters` are
      **gone**. English resolution for `'Half day'` succeeds. Per step 4b the run will also
      report the nine locales as pending; confirm that message names the locales explicitly
      and is distinguishable from a genuine broken promise.
- [ ] `npm run build` — succeeds (do not chain `check:chrome` into `build` if it would fail
      the Phase-1 stop; see step 6)
- [ ] `npm run check:seo` — pre-render/`<head>` surface unaffected
- [ ] **Em-dash regression, explicitly.** The slug turns `'—'` into `''`. Confirm every
      After School row whose `day` is `'—'` still renders `—` and not an empty cell or a key
      string. `src/data/afterSchoolPrograms/charlotte-latin.ts:263-265` is the ready example
      (`Atomz Lab`, `Book Adventures`, `Cheer` all carry `day: '—'`) — load
      `/school/charlotte-latin/` After School and read that column.
- [ ] **Browser check — English must be visually UNCHANGED.** `npm run preview`, then
      `/school/charlotte-catholic/` → Summer Programs. The day filter chip still reads
      **"Half day"**, still filters all four camps, and the "when" column still shows
      `June 8–11` / `June 2–5 · June 9–12 · July 21–24` / `July` / `Not published`. Also load
      a school with real weekday chips — `/school/providence-day/` and `/school/cannon/`
      After School — and confirm `Mon`…`Fri` are unchanged.

**Half B** — all of it runs in Phase 1, since half B is scripts-only:

Single-phase, so one pass.

- [ ] `node scripts/check_live_resolution.mjs --lang fr` — still **0 unresolvable**, and the
      new assertions pass silently on a clean tree
- [ ] `npm run check:live` — all nine `PROSE_TRANSLATED` locales pass
      (`es bn ht te fr fa it hi ar`)
- [ ] `git status --porcelain src/data/overlays` — **clean** after a run. Proves the
      temp-`--lang` work file is removed and no real work file was clobbered
- [ ] `npm run check:translations` — still `✓ no drift`
- [ ] `npm run check:runtime` — still `✓ all 9 prose locales resolve`
- [ ] `npm run i18n:report` — unchanged (this plan does not touch the extractor)
- [ ] `npx tsc -b` — clean
- [ ] `npm run build` — succeeds end to end with the extended `check:live`
- [ ] **NEGATIVE TEST 1 — the whole point of the plan. A genuine `src/data` topic added to
      `FOREIGN_TOPICS` must be REFUSED.** Temporarily change line 59 to
      `new Set(['financial-aid-tuition.content', 'sports'])`, re-run
      `node scripts/check_live_resolution.mjs --lang fr`, and confirm it **exits non-zero**
      with a message naming `sports` as unverifiable against the content extractor — *not*
      a pass, and *not* a silent drop of 995 shipped entries. Restore. **If this test does
      not fail the check, the plan has delivered nothing and must not be merged.**
- [ ] **NEGATIVE TEST 2 — an unaccounted-for topic still fails.** Temporarily remove
      `'metric-values'` from `TOPICS` in `scripts/i18n_topics.mjs`, re-run, and confirm the
      completeness assertion names it. Restore. (`checklive`'s equivalent test proved the
      unsourced guard; this proves the completeness invariant is stated rather than relying
      on `byTopic.get()` returning `undefined` by luck.)
- [ ] **NEGATIVE TEST 3 — a stale entry is not a silent no-op.** Temporarily add a
      nonexistent topic (`'no-such-topic.content'`) to `FOREIGN_TOPICS`, re-run, confirm it
      fails as stale rather than passing unnoticed. Restore.
- [ ] **POSITIVE TEST — the legitimate entry verifies for the right reason.** With the tree
      clean, confirm the run reports `financial-aid-tuition.content` verified with **70/70**
      shipped block hashes reproduced from `src/content/**` (add a `--verbose` line or read it
      from the failure path by temporarily corrupting one hash). Proves the check passes
      because it found real evidence, not because it found nothing to object to.

No browser check: this plan changes no rendering path and no user-facing string.

### Phase 2 — Locales

- [ ] **`node scripts/check_chrome_keys.mjs` exits 0.** This is the success criterion for the
      whole plan. Confirm with `node scripts/check_chrome_keys.mjs >/dev/null; echo $?` → `0`
      (the exit code is set via `process.exitCode`, so a bare pipe through `tail` will show
      `0` misleadingly — check it unpiped).
- [ ] **Locale parity, measured directly** — every catalog has zero keys missing against
      `en.json`, and `ar` still has exactly its 68 plural extras:
      ```bash
      python3 - <<'PY'
      import json
      def flat(d,p=''):
          out=set()
          for k,v in d.items():
              n=f'{p}.{k}' if p else k
              out |= flat(v,n) if isinstance(v,dict) else {n}
          return out
      e=flat(json.load(open('src/locales/en.json')))
      for l in ['es','bn','ht','te','fr','fa','it','hi','ar']:
          o=flat(json.load(open(f'src/locales/{l}.json')))
          print(l,'missing',len(e-o),'extra',len(o-e))
      PY
      ```
      Expect `missing 0` for all nine, `extra 0` for eight and `extra 68` for `ar`.
- [ ] `npm run check:runtime` — unchanged; no overlay stamp is touched by this plan, so any
      movement here means something out of scope was edited
- [ ] `npm run check:translations` — unchanged
- [ ] `npm run check:live` — unchanged (0 in all nine, per PR #167)
- [ ] `npm run check:bidi` and `npm run check:fa` — pass, for the two RTL catalogs
- [ ] `npm run build` — succeeds with `check:chrome` chained in
- [ ] **BROWSER CHECK — the step this plan exists for, and the one no script can do.**
      CLAUDE.md's standing lesson is that every defect found after the data read 100% has
      been render-layer. With `npm run preview`, load

      ```
      /school/charlotte-catholic/?lang=<code>
      ```

      for **all nine** locales, scroll to **Summer Programs**, and for each confirm:
      1. the day filter chip reads in that locale's script — **not** the English "Half day";
      2. clicking it still filters to all four camps (the English token is the state value,
         so a broken translation would break filtering — check, don't assume);
      3. the chip does not wrap or overflow its row. The Bangla, Telugu, Hindi and Arabic
         renderings are typically wider than Latin, and this chip sits in a `.as-filters`
         row beside the category and grade chips;
      4. for `ar` and `fa`, the chip reads right-to-left and sits correctly in the RTL row.

      Do this in a **real browser**, not headless — the repo has a recorded case of a
      headless render passing while a real print-out found a currency bug.
- [ ] **Spot-check one weekday locale page for regression** —
      `/school/providence-day/?lang=fr` After School: `lun.`…`ven.` still render.
## Risks

### Half A — the chrome key

| Risk | Mitigation |
|---|---|
| The slug changes lookup for `'—'` and blanks a cell | Explicit em-dash check in Phase-1 verification; `''` finds no key and falls to `defaultValue: day`, which is the current behaviour — but confirm it in the browser rather than reasoning about it |
| A translated label breaks the filter, which compares English tokens | Only the *label* is translated; state and `includes()` stay on the raw value, exactly as `'All'` already works (`AfterSchool.tsx:592` comment). Phase-2 browser check clicks the chip |
| The key lands in `en` and is forgotten in one locale | Step 5b makes the checker read all `TRANSLATED` catalogs — today nothing does. The parity script in Phase-2 verification is the second guard |
| The two `dayLabel()` copies drift apart | They are byte-identical today and step 3 changes both; the `CLAIMS` comment in step 4a names both sites |
| Chaining `check:chrome` into `build` turns the Phase-1 stop red | Step 6 defers the `build` wiring to Phase 2, or requires a non-blocking exit path for the pending-locale finding |
| Someone later adds `'Full day'` or `'Evening'` and it ships English again | That is what step 5 exists for — the checker fails on any unlisted value, and step 6 makes it a build gate. **This is the durable half of the plan; the key itself is the one-line half** |

### Half B — the allowlist

| Risk | Assessment |
|---|---|
| **This check is NOT fully airtight, and cannot be.** Gate 1 delegates the "is this a real foreign topic" judgment to the `LIVE` map in `i18n_extract_content.mjs`. A maintainer determined to silence a red build can add a topic to `LIVE` *and* to `FOREIGN_TOPICS` | Stated plainly rather than papered over. What the check buys is that the bypass is **no longer one word in one list**: it now requires editing a second file, in a way that makes a `src/data` topic claim to be a `src/content` topic, and gate 2 will still fail it because the extractor will find no `src/content/<topic>/` directory to extract from. Two-file, self-contradicting, and it still fails — that is a real raising of the bar, not proof against a determined maintainer. **Residual judgment that cannot be automated: whether a newly-added extractor genuinely warrants a new `FOREIGN_TOPICS` entry.** No check can decide that; a human must |
| The verification subprocess clobbers a real work file | The throwaway `--lang __verify` code is in no locale list, so the path it writes cannot collide with a real work file. Deleted in a `finally`. Covered by the `git status --porcelain` verification item, which is there specifically for this |
| Spawning the extractor nine times (once per locale, via `check_live_all.mjs`) slows the build | Cached per base topic within an invocation. Across invocations, it is one extra `node` process per locale over `src/content/financial-aid-tuition/` — 11 small JSON files, 2,353 words. Measured at report time in well under a second. If it ever matters, the cache can be hoisted into `check_live_all.mjs` |
| The extractor's exit-2-on-import behaviour bites again | Explicitly designed around: the helper re-parses `LIVE` from source and drives the extractor as a **subprocess**, never `import()`. Verified during planning that the import path exits the calling process |
| Requiring shipped ⊆ extracted fails on legitimately partial translation | It cannot: untranslated entries are *dropped* from the shipped overlay by `i18n_build_overlay.mjs`, so shipped is always a subset. The check asserts the direction that holds and never the reverse |
| A future foreign overlay adopts the `strings` shape instead of `blocks` | The verification reads `blocks` today. Write it to handle either — `Object.keys(o.blocks ?? {})` unioned with `(o.strings ?? []).map(s => s.of)` — so a shape change degrades to a weaker check rather than a crash or a false pass |
| Fixing the allowlist distracts from the real gap: those 70 blocks are checked by nothing | Explicitly Out of scope and explicitly a **reported finding**. This plan makes the allowlist honest; it does not make the content layer covered. Worth its own plan |

### The merge itself

| Risk | Mitigation |
|---|---|
| Half B is ready at the Phase-1 stop but cannot merge until Phase 2 finishes | Accepted by the user when choosing the merged two-phase shape. If the wording review stalls, half B can be cherry-picked to its own PR from the branch — the halves share no file but `CLAUDE.md` |
| One half fails and blocks the other | They are independent. Finish the working half in full, say plainly which was left out and why, and set the plan `In progress` rather than `Implemented` |
| Two `CLAUDE.md` entries land as disjoint bolted-on paragraphs | Step 13's note: write both as one edit pass at the end of Phase 1 |

## Open questions

### Half A

- **Will other schools gain non-weekday day values?** Plausible, and the plan assumes yes.
  `'Half day'` arrived because CCHS publishes a duration and no weekday pattern — a common
  shape for community sports camps, and eight of the ten schools currently have an empty
  summer `dayFilters`, so the axis is mostly unpopulated rather than settled. `'Full day'`,
  `'Morning'`, `'Afternoon'`, `'Weekends'` are all realistic next members. **Default:** build
  for it — take option (a) with the slug and the tightened checker (steps 3–5) rather than
  hardcoding one key, so the *next* value costs one catalog line per locale and fails loudly
  until it gets them.
- **Should `check:chrome` be a blocking build gate, or advisory?** The `checklive` plan
  deliberately left this script unwired, and `check_translations.mjs` documents an explicit
  "advisory, not CI-blocking" posture for a layer that drifts by design. But this vocabulary
  does **not** drift by design — it is closed, it changes only when someone deliberately adds
  a value, and the whole failure mode is that nobody notices. **Default: make it a blocking
  gate** (step 5/16). If the user prefers advisory, add the `check:chrome` script entry, skip
  the `build` chaining, and say so in the PR body.
- **Should the English wording be `Half day` or `Half-day`?** The data value and the source
  record both say half-day/half day. **Default:** keep `Half day`, byte-identical to the data
  value, so Phase 1 is a pure no-visible-change commit. Raise it at the Phase-1 review — it is
  precisely the kind of wording call the English-first stop exists for.

### Half B

- **Should `financial-aid-tuition.content`'s 70 blocks per locale get a real resolution check?**
  — **default:** not here. It needs a hash-keyed path against `src/content/**`, a different
  mechanism from this script's stamp-against-`src/data`. Report it as a finding; let the user
  decide whether it becomes its own plan.
- **Should the completeness assertion also run over `src/data/overlays/work/`?** — **default:**
  no. Work files are inputs, not shipped artifacts, and `check:sources` already covers that
  layer. Mentioned because the same drift is possible there.
