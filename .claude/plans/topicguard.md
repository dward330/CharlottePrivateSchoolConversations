---
name: topicguard
title: Make FOREIGN_TOPICS a verified claim rather than a silencing switch
status: not-implemented
phases: 1
created: 2026-08-20
branch: fix/foreign-topics-verification
prs: []
---

# Make `FOREIGN_TOPICS` a verified claim rather than a silencing switch

## Goal

PR #167 gave `check:live` a per-topic "no English source" guard and chained the check into
`npm run build`. That guard prints a precise diagnosis and tells the maintainer what to do:

> `— or, if the topic comes from another extractor, add it to FOREIGN_TOPICS by name.`
> ([`check_live_resolution.mjs:228`](../../scripts/check_live_resolution.mjs#L228))

The check now instructs a maintainer facing a red build to edit a one-line allowlist, and
**nothing anywhere verifies that the edit was honest.** Adding `sports` to
[`FOREIGN_TOPICS`](../../scripts/check_live_resolution.mjs#L59) turns a build-blocking guard
green while silently removing 995 shipped French entries from the check — and because
`check:live` is now a build gate, the incentive to make the red go away is at its strongest
exactly when the escape hatch is least supervised.

Close it by making the allowlist a **claim the check verifies**, not a declaration it
trusts: every overlay topic must be accounted for by exactly one of `TOPICS` (including
accessor topics) or `FOREIGN_TOPICS`, and every `FOREIGN_TOPICS` entry must be positively
demonstrated to be a real output of the content extractor over `src/content/**`.

## Context

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

## Decisions

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

**None.** Scripts only — one file edited (`scripts/check_live_resolution.mjs`), plus a
CLAUDE.md note. No card, section, sub-section, stat tile, Compare row, metric key or topic is
added; no component, layout or styling changes; no `src/locales/*.json` key and no
`src/data/**` prose is touched. The UX-design gate governs ingestion growing the interface,
and nothing here reaches the interface at all.

## Out of scope

- **Changing `FOREIGN_TOPICS`'s one current entry, or adding another.** The entry is
  verified correct (70/70 hashes reproduce); this plan builds the check that proves it, and
  changes no policy about what belongs on the list.
- **Wiring `financial-aid-tuition.content` into `check:live`'s real resolution path.** Its
  70 blocks are checked by neither `check:live` nor `check:runtime` today. That is a genuine
  coverage gap and it is **a finding to report, not to fix here** — it needs a hash-keyed
  resolution path against `src/content/**`, which is a different mechanism from the
  stamp-against-`src/data` one this script implements. If the work reveals more about it,
  record it in the Implementation notes.
- **The `blocks` vs `strings` overlay-shape divergence.** Two builders emit two shapes. Worth
  knowing; not this plan's to unify.
- **Making `check_chrome_keys.mjs` or `i18n_audit_skips.mjs` build gates** — still open from
  `checklive`'s second open question, still deferred.
- **The `'Half day'` chrome-key defect** `checklive` surfaced in
  `src/data/summer/charlotte-catholic.ts`. Unrelated, real, and still open.

## Steps

**Single-phase — adds no user-facing text.** Every change is to `scripts/check_live_resolution.mjs`
and `CLAUDE.md`. No `src/locales/*.json` key, no `src/data/**` prose, no rendered string is
touched, so there is no Phase 2 and no locale work of any kind.

1. **Add a `contentExtractorTopics()` helper** to `scripts/check_live_resolution.mjs` —
   parse the `LIVE` map keys out of `scripts/i18n_extract_content.mjs` source, the same
   re-parse-the-authority technique `check_live_all.mjs` uses for `PROSE_TRANSLATED`
   ([lines 23–29](../../scripts/check_live_all.mjs#L23)) and `check_seo.mjs` uses for
   `TRANSLATED`. Do **not** `import()` it — that runs `main()` and exits the process
   (verified; see Context). This gives a cheap structural pre-filter before paying for a
   subprocess.

2. **Add the completeness assertion**, after the file list is built at
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

3. **Add `verifyForeignTopic(topic)`** — the positive verification, the point of the plan.
   For each entry in `FOREIGN_TOPICS`:
   - Split the extractor discriminator off the parsed topic name: `financial-aid-tuition.content`
     → base `financial-aid-tuition`, suffix `content`. **Required** — the extractor rejects
     the fused string (see Context).
   - **Gate 1.** Assert the base topic is a key of the extractor's `LIVE` map (step 1). If
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

4. **Wire both into the exit path.** Follow the file's established shape: accumulate counts,
   print each finding as it is found, and add a summary block beside the existing `unsourced`
   one at [lines 224–231](../../scripts/check_live_resolution.mjs#L224) that exits 1. Keep
   the distinct-message discipline the existing guard has — the value of that guard is that
   it names its own cause, and "FOREIGN_TOPICS entry could not be verified against the
   content extractor" must not be confusable with "stale translation."

5. **Update the `FOREIGN_TOPICS` docstring**
   ([lines 48–58](../../scripts/check_live_resolution.mjs#L48)) — it currently asserts the
   overlay "holds 0 strings today," which is **false** (70 translated blocks per locale; see
   Context). Correct it, state that entries are now *verified* rather than trusted, and record
   that the `blocks`-vs-`strings` shape divergence at
   [line 196](../../scripts/check_live_resolution.mjs#L196) is a deliberate second reason the
   file is skipped, not an accident.

6. **Run the verification suite**, including both negative tests below. The negative test in
   step 7 of Verification is the one that decides whether this plan delivered anything.

7. **Record it in `CLAUDE.md`** — a short addition to the paragraph `checklive` added under
   the i18n standard: that `FOREIGN_TOPICS` in `check_live_resolution.mjs` is verified against
   the content extractor rather than trusted, that every overlay topic must be accounted for
   by exactly one of `TOPICS`/`FOREIGN_TOPICS`, and the one-line reason — a build gate whose
   error message recommends editing an unverified allowlist is a gate with a documented
   bypass. Correct the "0 strings" claim wherever it appears.

## Files touched

| File | Change |
|---|---|
| `scripts/check_live_resolution.mjs` | edit — completeness assertion, `verifyForeignTopic()`, `contentExtractorTopics()`, corrected docstring, new exit path |
| `CLAUDE.md` | edit — record the verified-allowlist rule; correct the "0 strings" claim |

No new script, no `package.json` change: `check:live` is already a build gate, and the
assertion rides in on it.

## Verification

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

## Risks

| Risk | Assessment |
|---|---|
| **This check is NOT fully airtight, and cannot be.** Gate 1 delegates the "is this a real foreign topic" judgment to the `LIVE` map in `i18n_extract_content.mjs`. A maintainer determined to silence a red build can add a topic to `LIVE` *and* to `FOREIGN_TOPICS` | Stated plainly rather than papered over. What the check buys is that the bypass is **no longer one word in one list**: it now requires editing a second file, in a way that makes a `src/data` topic claim to be a `src/content` topic, and gate 2 will still fail it because the extractor will find no `src/content/<topic>/` directory to extract from. Two-file, self-contradicting, and it still fails — that is a real raising of the bar, not proof against a determined maintainer. **Residual judgment that cannot be automated: whether a newly-added extractor genuinely warrants a new `FOREIGN_TOPICS` entry.** No check can decide that; a human must |
| The verification subprocess clobbers a real work file | The throwaway `--lang __verify` code is in no locale list, so the path it writes cannot collide with a real work file. Deleted in a `finally`. Covered by the `git status --porcelain` verification item, which is there specifically for this |
| Spawning the extractor nine times (once per locale, via `check_live_all.mjs`) slows the build | Cached per base topic within an invocation. Across invocations, it is one extra `node` process per locale over `src/content/financial-aid-tuition/` — 11 small JSON files, 2,353 words. Measured at report time in well under a second. If it ever matters, the cache can be hoisted into `check_live_all.mjs` |
| The extractor's exit-2-on-import behaviour bites again | Explicitly designed around: the helper re-parses `LIVE` from source and drives the extractor as a **subprocess**, never `import()`. Verified during planning that the import path exits the calling process |
| Requiring shipped ⊆ extracted fails on legitimately partial translation | It cannot: untranslated entries are *dropped* from the shipped overlay by `i18n_build_overlay.mjs`, so shipped is always a subset. The check asserts the direction that holds and never the reverse |
| A future foreign overlay adopts the `strings` shape instead of `blocks` | The verification reads `blocks` today. Write it to handle either — `Object.keys(o.blocks ?? {})` unioned with `(o.strings ?? []).map(s => s.of)` — so a shape change degrades to a weaker check rather than a crash or a false pass |
| Fixing the allowlist distracts from the real gap: those 70 blocks are checked by nothing | Explicitly Out of scope and explicitly a **reported finding**. This plan makes the allowlist honest; it does not make the content layer covered. Worth its own plan |

## Open questions

- **Should `financial-aid-tuition.content`'s 70 blocks per locale get a real resolution check?**
  — **default:** not here. It needs a hash-keyed path against `src/content/**`, a different
  mechanism from this script's stamp-against-`src/data`. Report it as a finding; let the user
  decide whether it becomes its own plan.
- **Should the completeness assertion also run over `src/data/overlays/work/`?** — **default:**
  no. Work files are inputs, not shipped artifacts, and `check:sources` already covers that
  layer. Mentioned because the same drift is possible there.
