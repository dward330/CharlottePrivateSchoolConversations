---
name: learningsupport
title: Add a Learning Support & Student Services research area — six structured cards, Hickory Grove Christian populated from its own site; plus the /learning-support workflow
status: english-shipped
phases: 2
created: 2026-10-20
branch: feat/learningsupport
prs: []
---

# Learning Support & Student Services research area

**Built directly at the user's request (2026-10-20), not through `/plan`.** This document
is the record of what shipped and why, written after the build, as the plans README asks.

## Request

Through a Claude Design handoff (project `5da24575-40bf-4787-8934-0fadfc56059f`, file
`Learning Support Section Redesign.dc.html`, etag `1792544338475945`;
`learning-support-handoff-instructions.md`, etag `1792544444220100`). The user asked to:

- build the new area on Hickory Grove Christian with six cards (1a–1f);
- use only Hickory Grove's own data: no comparisons, no state-funding content, and no
  EXCLUDED rows in 1b;
- show unpublished items as a dashed NOT STATED chip, never a blank;
- use the school's navy `#1b2a4a` and Vegas gold `#c5b358` as the section colours;
- **do fresh deep research using only the official school websites**;
- **leave out the Compare tool and button for now**;
- build a `/learning-support` workflow: prompt → go/no-go → `/plan` → `/implement`.

The handoff is the UX approval (CLAUDE.md UX standard).

## Decisions

- **Slug `learning-support`**, data `src/data/learningSupport.ts` +
  `learningSupport/<slug>.ts`, component `src/components/LearningSupport.tsx`, CSS
  prefix `ls-`. Card keys in order: `eligibility`, `services`, `therapy`, `testing`,
  `staff`, `ask`. `eligibility`, `services` and `ask` span the full row even when closed.
- **Placement:** after `international-travel` in `TOPIC_ORDER`, with the academic areas.
  The handoff set no position. Hickory Grove has no Global Exposure, so on its page the
  area follows Course Offerings.
- **No kickers** (`1a ·` badges): CLAUDE.md forbids them, and the design itself hides
  them in its embedded (real-page) mode.
- **Off Compare:** added to `COMPARE_DEFERRED_TOPICS`, which removes the section-head
  button, the Compare pill, the home grid cell and the Compare meta-description mention.
- **Colours from data**, not CSS constants: `colors.brand` / `colors.gold` are set inline
  as `--brand` / `--ls-gold` on the section. On the dark theme the ink swaps to a
  gold-on-dark tint, because navy text vanishes on `#161819`.
- **Delivery codes are chrome** (`learning.code.*`), and need ids map to
  `learning.need.*`. Both are skipped by the extractor.
- **Glossary:** `[[504|…]]`, `[[iep|…]]` and `[[idea|…]]` markers in prose render as
  `<abbr>` with definitions from `learning.glossary.*`.
- **Meta description:** "Learning Support & Student Services" pushed Hickory Grove's to
  180 chars. `head.ts` gains `SHORT_TOPIC_NAMES` (`learning-support` → "student
  support"), used only in descriptions; the result is 160 chars.

## Corrections the live site forced on the design

The live site wins. The full record is in
`source-material/learning-support/hickory-grove-christian/Hickory Grove Christian - Learning Support - Official Site Research.md`.

- The program is now **Educational Support Services (ESS)**, not the Student Center for
  Advancement. The SCA URL the design cites returns 404.
- **Fees ARE published** (the 2026–27 schedule): $300 to $4,455 a year, plus a $1,500 to
  $2,000 add-on. The "no amounts published" tile became "$300+ per year, beyond tuition",
  and each fee row carries its price.
- **9 named staff**, not 4. Rachel Vaughn is on the list as Director of Educational
  Support Services, so the design's "title not yet on the staff list" was dropped. The
  hiring note now says the posting's July 30, 2026 start date has passed.
- **Counseling is not NOT STATED:** the wellness team offers biblical counsel,
  mentorship and peer support groups, and the high school has a Director of Counseling.
  The row is coded IH. Emotional and behavioral intervention is a separate `EXCLUDED`
  row, so it is hidden from 1b.
- **The Charlotte Speech and Hearing Center note is dropped:** it is not an official
  school source. The "THIRD-PARTY · NOT CODED" tag therefore has no use and was not built.
- **The tour questions were updated.** The fee question became the schedule's
  "$2227/year" misprint on the HS Instructional Support Class. The SCA-page question
  became a nurse/psychologist question. Specially designed instruction gained its own
  question.
- **Excluded, recorded in research only:** the ESS page's ESA+ tab and its
  public-district IDEA evaluation route.

## Files

| File | Change |
|---|---|
| `source-material/learning-support/hickory-grove-christian/…Official Site Research.md` | new — verbatim record, fee transcription, URLs |
| `src/data/learningSupport.ts`, `learningSupport/hickory-grove-christian.ts`, `learningSupport/README.md` | new |
| `src/components/LearningSupport.tsx` | new |
| `src/pages/SchoolDetail.tsx` | loader + destructure hole, entry idiom, cardCount, section colours, head render, card grid, disjunction |
| `src/lib/manifest.ts` | `COMPARE_DEFERRED_TOPICS` += `learning-support` |
| `src/lib/head.ts` | `SHORT_TOPIC_NAMES` |
| `src/lib/metrics.ts` | `TOPIC_ORDER`, catch-all `RULES` |
| `src/components/TopicGlyph.tsx` | book-open (design's Lucide variant) |
| `src/index.css` | `ls-*` block |
| `src/locales/en.json` | `topics`, `metrics`, `cards.learning-support.*`, `learning.*` |
| `scripts/i18n_topics.mjs`, `scripts/i18n_fields.mjs`, `scripts/gen_data_schema.mjs` | topic, path classification (0 residual), STRUCTURED |
| `.claude/skills/ingest-source-material/build_docs.py` | `TOPIC_NAMES` |
| generated: `schools.json`, `src/content/learning-support/`, `.claude/docs/learning-support/`, `.claude/docs/INDEX.md`, `DATA-SCHEMA.md` | regenerated |
| `.claude/skills/learning-support/{SKILL.md,prompt-template.md}`, `.claude/SKILLS.md`, `CLAUDE.md` | the new workflow |

## Verification (Phase 1)

- `tsc -b` clean; `npm run build` green with every chained check; `check:schema` up
  to date; `i18n_extract --residual`: 0 unclassified.
- `dist/compare` and `dist/index.html`: 0 mentions; Cannon's page has none; Hickory
  Grove's has it.
- Real Chrome (Playwright, `channel: 'chrome'`), every card open:
  - 6 cards in order; no Compare button; no kickers;
  - EXCLUDED row absent; 13 NOT STATED chips;
  - "Speech & language" → its verdict, 19 rows dimmed;
  - tabs 40px tall; 3 `<abbr>` definitions;
  - page overflow 0 at 1280 light, 390 light and 1280 dark;
  - screenshots read cleanly in both themes.
- `audit:mobile` (all schools, 320/360/390): see Implementation notes.

## Phase 2 — remaining

- Chrome keys (`topics.learning-support`, `metrics.learning-support.*`,
  `cards.learning-support.*`, `learning.*`) into the nine other catalogs.
  `learning.tally` uses interpolation, not plurals.
- A `learning-support.<lang>.json` overlay for each `PROSE_TRANSLATED` locale. Splice by
  stamp. Keep the `[[504|…]]` markers. Figures char-for-char; dates translate.
- Browser checks in `es`, `fa` (RTL chips and rows) and `hi`; `audit:mobile` at 320px in
  translated locales.
- Open the PR, flip INDEX to Implemented, merge. **Do not deploy.**

## Implementation notes

**Phase 1 (English) built 2026-10-20/21 on `feat/learningsupport`.** `audit:mobile`
(every school, 320/360/390, all cards open): no broken card, no page overflow. The flag
for one school is `--only <slug>`, not `--school`.

- **Icon:** the design's Lucide book-open is near-identical to Course Offerings'
  book-open glyph. It was kept as designed and flagged to the user.
- **Group letters dropped:** the design's "A · Learning & academic support" group
  letters are not rendered, in keeping with the no-kicker rule. Group names only.
