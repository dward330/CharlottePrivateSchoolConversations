# Plain-language review — course-offerings (src/data/courseOfferings.ts)

Base `HEAD` → working tree. Generated 2026-11-11 by `scripts/plain_review.mjs`. Grades are Flesch–Kincaid over units of ≥30 words (— below that). "hook" is what the PostToolUse hook would still report.

| School | Changed units |
|---|--:|
| charlotte-christian | 0 |
| covenant-day | 1 |
| carmel-christian | 0 |
| hickory-grove-christian | 0 |
| gaston-day | 0 |
| trinity-episcopal | 1 |
| **Total** | **2** |

Guards: **4 FAILED**.

- (h) covenant-day:divisions[0].teaser: ONLY marker lost (1→0)
- (p) trinity-episcopal:divisions[0].notPublished: name gone "PDF"
- (h) trinity-episcopal:divisions[0].notPublished: UNPUBLISHED marker added (0→1)
- (h) trinity-episcopal:divisions[0].notPublished: ONLY marker lost (1→0)

| # | school | path | before | after | words b→a | grade b→a | hook | notes |
|--:|---|---|---|---|---|---|---|---|
| 1 | covenant-day | `divisions[0].teaser` | 90 course entries across 9 departments — 17 Advanced Placement, a named Bible course for each of the four years, and a Restoration & Sustainability department no other school here runs. | 90 course entries across 9 departments — 17 Advanced Placement, a named Bible course for each of the four years, and a Restoration & Sustainability department, which is rare. | 26→24 | —→— | pass |  |
| 2 | trinity-episcopal | `divisions[0].notPublished` | Trinity publishes Lower School work as named curricula and weekly enrichment subjects rather than as named, individually-described courses. The rows below are those subjects and curricula as the school states them. No Lower School course catalog exists — the only PDF published site-wide is a philanthropy guide. | Trinity publishes Lower School work as named curricula and weekly enrichment subjects rather than as named, individually-described courses. The rows below are those subjects and curricula as the school states them. Trinity publishes no Lower School course catalog. | 46→38 | 10.9→10.2 | pass | caps gone: PDF; grade 10.2 > 10 |

## Evidence and guard hits (fixes commit)

| Path | Problem | Fix | Evidence |
|---|---|---|---|
| `trinity-episcopal:divisions[0].notPublished` | "No Lower School course catalog **exists**" is a does-not-exist claim; "the only PDF published site-wide is a philanthropy guide" is a search result (research bookkeeping) with no use to a parent (plan: Content that must survive, item 7; bookkeeping table) | "Trinity publishes no Lower School course catalog." The philanthropy-guide clause leaves the page. | `source-material/course-offerings/trinity-episcopal/Trinity Episcopal School - Course Offerings - Middle School Curriculum.md` line 145: every mirrored page grepped for a curriculum/catalog/course/guide/handbook PDF; "The only PDF on the whole site is `GuideToPhilanthropy.pdf`." That supports *not published*, not *does not exist*. The fact stays in the research record. |
| `covenant-day:divisions[0].teaser` | "a Restoration & Sustainability department **no other school here runs**" is a cross-school comparison (user ruling 2026-11-11; plan `nocompare` row 36) | "…and a Restoration & Sustainability department, which is rare." | Plan `nocompare` row 36's own approved wording, used verbatim. `nocompare` has not landed (`git log origin/main` shows only its plan commits #482/#483), so this plan owns the unit; recorded in `nocompare.md` Implementation notes so that plan skips row 36. |

**Guard hits by design** (this run is without `--check`; shown for the record): Trinity `(p)`
name gone "PDF" and `(h)` ONLY lost (both are the removed philanthropy-guide clause, which is the
fix); `(h)` UNPUBLISHED added (the fix turns does-not-exist into not-published). Covenant `(h)`
ONLY lost ("no other school" was the comparison being removed). Trinity's note is at grade 10.2
after this commit; the wording pass (template N1) brings it under 10. Both notes stay non-empty.
