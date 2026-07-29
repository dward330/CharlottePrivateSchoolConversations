# Haitian Creole (Kreyòl Ayisyen) research-prose translation — rollout

**Status:** IN PROGRESS. Started 2026-07-29. Fourth language, after English,
Spanish and Bangla.

> ## START HERE (fresh session)
>
> **Branch:** `i18n/haitian-creole-prose`.
>
> Read this doc for open work. Read
> [`prose-translation-bn.md`](./prose-translation-bn.md) for the METHOD — it is
> the worked template and it is complete. Read
> [`prose-translation-architecture.md`](./prose-translation-architecture.md)
> for the language-independent mechanism. **Do not re-derive either.**
>
> ### The loop, per topic
>
> ```
> node scripts/i18n_extract.mjs --topic <t> --lang ht      # first time only
> # translate the `t` fields in src/data/overlays/work/<topic>.ht.json
> python3 scripts/check_figures.py --topic <t> --lang ht   # AFTER EVERY TOPIC
> node scripts/i18n_build_overlay.mjs --topic <t> --lang ht
> node scripts/check_translations.mjs --lang ht            # coverage + drift
> ```
>
> Once a work file holds translations, `i18n_extract.mjs` refuses to overwrite it
> — that guard is deliberate, do not `--force` past it.
>
> ### Progress
>
> | Topic | Units | Translated | Figures | Overlay |
> |---|---|---|---|---|
> | metric-values | 126 | ✅ 126 | ✅ | ✅ |
> | student-clubs | 517 | ✅ 517 | ✅ | ✅ |
> | sports | 636 | ✅ 636 | ✅ | ✅ |
> | after-school | 654 | ✅ 654 | ✅ | ✅ |
> | the-arts | 599 | ✅ 599 | ✅ | ✅ |
> | financial-aid-report | 572 | ✅ 571 | ✅ | ✅ |
> | college-support | 926 | ✅ 926 | ✅ | ✅ |
> | course-offerings | 1,848 | ✅ 1,848 | ✅ | ✅ |
> | financial-aid-tuition (content) | 27 | ✅ 27 | ✅ | ✅ |
> | **prose total** | **5,905** | | | |
> | UI chrome `src/locales/ht.json` | 326 keys | — | | |
>
> Order is cheapest-and-lowest-stakes first, Financial Aid last — the
> architecture doc's standing rule, unchanged.

---

## 0. Phase 0 — CONFIRMED COMPLETE, do not redo

Three findings, all verified 2026-07-29:

1. **`ht` is already in `SUPPORTED`** in `src/lib/i18n.ts`
   (`{ code: 'ht', label: 'Haitian Creole', native: 'Kreyòl Ayisyen' }`) and
   **declares no `font`** — Barlow covers Kreyòl's accented Latin (à è ò ù, and
   the digraphs `ou`/`en`/`an`). No `syncFont()` work, no Google Fonts request.
2. **Not RTL.** The `[data-prose='en'] main` LTR-pin question stays untouched;
   it remains open for Arabic and Farsi only.
3. **Numbers need no guard.** Per the "for the next language" instruction at the
   end of `src/data/overlays/NOTES.md`, `ht` was run through
   `Intl.NumberFormat` at 5, 7 and 9 digits against `en-US`:

   | Sample | `en-US` | `ht` | |
   |---|---|---|---|
   | 36,325 (tuition tile) | `36,325` | `36,325` | match |
   | 472,595 | `472,595` | `472,595` | match |
   | 3,683,971 (philanthropy) | `3,683,971` | `3,683,971` | match |
   | 123,456,789 | `123,456,789` | `123,456,789` | match |
   | `$36,325` currency | `$36,325` | `$36,325` | match |

   Identical digits, identical 3-3-3 grouping, identical leading `$`. **No
   `FIGURE_SAFE_NUMBERS` entry is needed** — that list exists for locales whose
   convention would make a figure unrecognisable against its English source, and
   `ht` has no such divergence. Neither Bangla render-layer defect can recur
   here. `scripts/check_bn_numerals.mjs` has no `ht` analogue and needs none.

**Also confirmed language-independent and already correct** (as
`prose-translation-bn.md` §1 predicted): `i18n_audit_skips.mjs --suspect`
reports clean, and `check_figures.py` is already `--lang`-parameterised.

**Typography needs no spike.** Bangla's Phase 0 spike existed because Bangla is
a non-Latin script with a মাত্রা headstroke that the Latin-caps letterspacing
broke. Kreyòl is Latin script in Barlow — the same face English already uses.
The 43 uppercase+letterspacing rules are fine as-is; the `:root[lang='bn']`
overrides must NOT be extended to `ht`.

---

## 1. §0 equivalent — the register decision (SETTLED, binding)

Bangla's binding call was Dhaka vs Kolkata. Kreyòl's analogue is **how much
French-derived school vocabulary to keep versus translate** — and it carries a
trap Bangla did not have.

### The failure mode is drifting into French, not leaving English

Kreyòl and French share enormous lexical stock, so a translator reaching for a
"more formal" register slides into French almost invisibly. `Upper School` →
*l'École Supérieure*, `financial aid` → *l'aide financière*, `transcript` →
*le relevé de notes*. To a reader who does not speak Kreyòl this looks **more**
correct, not less — which is exactly why it is the decision to pin hardest.

It is also the politically loaded axis in Haitian language use: French is the
language of institutional gatekeeping, Kreyòl the language ~100% of Haitians
actually speak. A school-research corpus written for parents that drifts French
defeats its own purpose.

**Rule: write Kreyòl, in standard IPN orthography.** Where Kreyòl has its own
everyday word, use it — *lekòl* (school), *timoun* (children), *lajan* (money),
*kou* (course), *pwofesè* (teacher), *elèv* (student), *ane* (year). Do not
reach for a French cognate to sound more formal. Kreyòl written in its own
orthography is the target, never French, and never French spelling of a Kreyòl
word (*lekòl*, not *l'école*).

### What stays Latin / English — unchanged from Bangla

The Bangla convention holds, and the prompt's instinct that it should is
correct. These are **searchable identifiers** a parent must be able to type into
a school's website or say aloud on a tour:

- **Institution and division names:** `Charlotte Latin School`,
  `Providence Day`, `Upper School`, `Middle School`, `Lower School`, `NCISAA`.
- **Course codes and levels:** `AP`, `IB`, `Honors`, `Advanced Placement`,
  `AP English 11: Language & Composition`. (325 `AP`, 264 `Honors`, 84 `IB` in
  the corpus — this is the highest-volume decision here.)
- **Platform and program names:** `Clarity`, `Scoir`, `Naviance`, `FACTS`,
  `SSAT`, `Extended Day`, `Model United Nations`, `Mock Trial`,
  `National Merit`, `Cum Laude Society`.
- **Award, festival and venue names**, athlete and staff names, award
  categories inside citations.

The reasoning is the Bangla/Spanish reasoning verbatim: translating an
identifier destroys its function as an identifier. A parent cannot search for
*Plasman Avanse* on providenceday.org.

**Translated:** generic descriptors, analysis, and **all hedges**. The hedges
are the point of this corpus — "documented minimum", "the school's claim", "an
absence of evidence rather than a stated policy" — never smooth them. A hedge
softened in translation turns a caveat into a claim.

**Untouched:** every figure, scoreline, GPA, clock time and date. Kreyòl uses
Western digits and 3-3-3 grouping, so unlike Bangla there is no numeral
question at all.

**Verbatim quoted source strings stay English**, inside their original quotation
marks — markdown rate tables and Wayback quotes are citations, not prose.
Unchanged from both prior rollouts.

---

## 2. Verification — Phase 2, in this order

Same six checks as Bangla; they catch different classes and skipping one lets a
class through.

1. `check_translations.mjs --lang ht` — coverage and drift, all topics.
2. `check_chrome_keys.mjs` — every chrome-claiming skip resolves.
3. `check_hash_parity.mjs` — build-time and runtime stamps agree.
4. `check_figures.py --lang ht` — **run after every topic, not just here.** It
   caught a real defect in Bangla sports *after* that topic read 100%. Blind
   spot: it only sees `$`/`%`/years, so for provenance documents also check
   quoted-string and timestamp parity between `text` and `t`.
5. **Runtime resolution test** — every overlay entry carries a hash and a
   translation, and every stamp recomputed from live English matches its stored
   `of`. Coverage can read 100% while the page renders English.
6. **Full-page browser print-out** — the only check that catches render bugs.

**Flip `TRANSLATED` / `PROSE_TRANSLATED` BEFORE the print-out**, not after.
`setLanguage()` rejects any code not in `TRANSLATED`, so `ht` is unselectable
until the flip; the Bangla doc flags its own ordering here as wrong. The flip is
two lines and trivially reverted.

### Print-out schools: Providence Day AND Charlotte Latin

Two schools, deliberately. Latin carries the most flag chips and the densest
College Support hedges, so it exercises render paths Providence Day never
touches. Spanish shipped **58 blank flag chips** across all six schools once —
the `flags[].kind` bug, where an enum lookup key was classified as prose and
every chip fell to `undefined` while coverage read 100%. A second school is the
check that catches that class.

Expectation, stated up front: `ht` should need **fewer** print-out rounds than
Bangla's four, because Bangla's rounds 1 and 2 were both numeral-formatting
defects that cannot occur here. Anything found will be in the flag-chip /
hedge-density class, which is why Latin matters more than usual.
