# Plain-language review — src/data/summer

Base `HEAD` → working tree. Generated 2026-11-11 by `scripts/plain_review.mjs`. Grades are Flesch–Kincaid over units of ≥30 words (— below that). "hook" is what the PostToolUse hook would still report.

| School | Changed units |
|---|--:|
| cannon | 0 |
| carmel-christian | 0 |
| charlotte-catholic | 0 |
| charlotte-christian | 0 |
| charlotte-country-day | 0 |
| charlotte-latin | 0 |
| charlotte-prep | 1 |
| covenant-day | 0 |
| gaston-day | 0 |
| hickory-grove-christian | 0 |
| providence-day | 0 |
| trinity-episcopal | 0 |
| **Total** | **1** |

Guards: **5 FAILED**.

- (f) charlotte-prep:costPlanner.flags[0].kind: non-prose leaf added
- (f) charlotte-prep:costPlanner.flags[0].text: non-prose leaf added
- (b) charlotte-prep:costPlanner.fees[2].label: digit tokens differ -25
- (m) charlotte-prep:costPlanner.fees[2].label: money/percent/year tokens differ -$25
- (n) charlotte-prep:costPlanner.fees[2].label: count words differ -two

| # | school | path | before | after | words b→a | grade b→a | hook | notes |
|--:|---|---|---|---|---|---|---|---|
| 1 | charlotte-prep | `costPlanner.fees[2].label` | **Early bird: "$25 savings per week now through January 15, 2026."** The registration form showed several prices $25 below the brochure, consistent with that saving, but two of its cells were higher than the brochure, so the brochure is used here as the regular price list. | **Early bird: "$25 savings per week now through January 15, 2026."** The prices shown are the brochure’s regular prices. | 37→11 | 15.7→— | pass |  |

## Evidence (why this step moved)

| Unit | Treatment | Reason |
|---|---|---|
| charlotte-prep summer `costPlanner.fees[2].label` | **Move** (plan "Bookkeeping fixes", Batch 3) | The removed sentence is how this site reconciled two school documents ("so the brochure is used here as the regular price list"). It is real evidence but no use to a parent, so it moved verbatim into a dev-only `{ kind: 'verify' }` flag appended to `costPlanner.flags`, which was empty (it becomes `flags[0]`; no existing index shifts). The prose keeps the parent point: the bold early-bird quote, byte-identical, and "The prices shown are the brochure’s regular prices." |

**Guard hits, all by design:** (f) ×2, the new flag's `kind` and `text` leaves; (b) `25`,
(m) `$25` and (n) "two" leave the prose with the moved sentence. All three survive verbatim in
the verify flag.

**Off-worklist bookkeeping the re-sweep found** (not in the plan's census; added to
`worklist-bookkeeping-batch3.json` and rewritten in the wording pass, not here):
- gaston-day summer `catalog.camps[17..22].desc` (6 camps): "Registration closed at the time
  of this research." The census predates the `this research` alternative.
- charlotte-latin summer `costPlanner.flags[0].text`: "The site was searched for all four
  terms" (our search process), found by the wider first-person sweep. **Moved in a second
  fixes commit** (below), because the rewrite dropped the count word "four" and guard (n)
  fails on that in the wording pass.

## Second fixes commit — Latin search note to verify

| Unit | Treatment | Reason |
|---|---|---|
| charlotte-latin summer `costPlanner.flags[0].text` | **Move** | "The site was searched for all four terms" describes this site's search, not what the school publishes. The sentence moved verbatim into a dev-only `{ kind: 'verify' }` flag appended to `costPlanner.flags` (it becomes `flags[1]`; `flags[0]` keeps its index). The gap flag keeps the parent point: "Latin publishes **no sibling discount and no multi-week discount**, and no camp financial aid. The only thing the school’s site calls a discount is the Super Care bundle." UNPUBLISHED and ONLY stay; "four" survives in the verify flag. |
