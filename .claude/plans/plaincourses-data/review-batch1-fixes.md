# Plain-language review — course-offerings (src/data/courseOfferings.ts)

Base `HEAD` → working tree. Generated 2026-11-11 by `scripts/plain_review.mjs`. Grades are Flesch–Kincaid over units of ≥30 words (— below that). "hook" is what the PostToolUse hook would still report.

| School | Changed units |
|---|--:|
| davidson-day | 1 |
| **Total** | **1** |

Guards: **3 FAILED**.

- (p) davidson-day:divisions[1].notPublished: name new "Davidson"
- (p) davidson-day:divisions[1].notPublished: name new "Day"
- (h) davidson-day:divisions[1].notPublished: UNPUBLISHED marker added (0→1)

| # | school | path | before | after | words b→a | grade b→a | hook | notes |
|--:|---|---|---|---|---|---|---|---|
| 1 | davidson-day | `divisions[1].notPublished` | No Middle School course catalog or curriculum guide exists. The math courses below come from the Upper School catalog’s progression chart; everything else on the Middle School page is marketing prose. | Davidson Day publishes no Middle School course catalog or curriculum guide. The math courses below come from the Upper School catalog’s progression chart; the rest of the Middle School page describes the program in general terms. | 31→36 | 9.5→9.8 | pass |  |

## Evidence and guard hits (fixes commit)

| Path | Problem | Fix | Evidence |
|---|---|---|---|
| `davidson-day:divisions[1].notPublished` | "No … catalog or curriculum guide **exists**" is a does-not-exist claim; "**marketing prose**" is research bookkeeping (plan: Content that must survive, item 7; bookkeeping table row 1) | "Davidson Day publishes no Middle School course catalog or curriculum guide." … "the rest of the Middle School page describes the program in general terms." | `source-material/course-offerings/davidson-day/Davidson Day - Course Offerings - Curriculum Guide.md` line 205: "**No Middle School course catalog or curriculum guide is published.**" |

**Guard hits by design** (this run is without `--check` in the plan; shown here for the record):
`(p)` name new "Davidson", "Day" (the school's own name now leads the sentence, as plainsmall's
not-published notes do); `(h)` UNPUBLISHED added (the fix *is* turning a does-not-exist claim into
a not-published one). The note stays non-empty, so `courseMatrix.ts` still adds its "not named,
not taught" line.
