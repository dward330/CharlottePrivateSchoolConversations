# Plain-language review — src/data/afterSchoolPrograms

Base `main` → working tree. Generated 2026-11-13 by `scripts/plain_review.mjs`. Grades are Flesch–Kincaid over units of ≥30 words (— below that). "hook" is what the PostToolUse hook would still report.

| School | Changed units |
|---|--:|
| cannon | 5 |
| carmel-christian | 0 |
| charlotte-christian | 5 |
| charlotte-country-day | 3 |
| charlotte-latin | 0 |
| charlotte-prep | 0 |
| covenant-day | 5 |
| davidson-day | 1 |
| gaston-day | 5 |
| hickory-grove-christian | 0 |
| providence-day | 1 |
| trinity-episcopal | 3 |
| **Total** | **28** |

Guards: **7 FAILED**.

- (h) charlotte-christian:dayInside.headline: ONLY marker lost (1→0)
- (h) charlotte-christian:verdict.strengths[0]: ONLY marker lost (1→0)
- (h) charlotte-country-day:verdict.headline: ONLY marker lost (1→0)
- (h) covenant-day:coverage.facts[0].text: ONLY marker lost (1→0)
- (k) gaston-day:cost.headline: changed but on no --allow worklist
- (k) gaston-day:verdict.subhead: changed but on no --allow worklist
- (h) trinity-episcopal:verdict.strengths[0]: ONLY marker lost (1→0)

| # | school | path | before | after | words b→a | grade b→a | hook | notes |
|--:|---|---|---|---|---|---|---|---|
| 1 | cannon | `cost.aside.text` | Drop-in is **$11.50 an hour** with no commitment. A family needing two afternoons a month pays roughly **$100 a year** instead of $1,904 — the most forgiving occasional-use option in this set. | Drop-in is **$11.50 an hour** with no commitment. A family needing two afternoons a month pays roughly **$100 a year** instead of $1,904 — an unusually forgiving option for occasional use. | 28→27 | —→— | pass |  |
| 2 | cannon | `verdict.headline` | The most flexible program here for occasional users, with the deepest published enrichment catalog — wrapped in pricing that is technically public but practically invisible. | An unusually flexible program for occasional users, with a deep published enrichment catalog — wrapped in pricing that is technically public but practically invisible. | 24→23 | —→— | pass |  |
| 3 | cannon | `verdict.strengths[1]` | **Early-dismissal days are covered**, 11:45 a.m.–4:00 p.m., which several peers here do not do at all. | **Early-dismissal days are covered**, 11:45 a.m.–4:00 p.m., which many schools do not do at all. | 15→14 | —→— | pass |  |
| 4 | cannon | `verdict.strengths[2]` | **True drop-in at $11.50 an hour with no contract.** A family needing two afternoons a month pays around $100 a year rather than committing to $1,904 — the most forgiving occasional-use model in this set. | **True drop-in at $11.50 an hour with no contract.** A family needing two afternoons a month pays around $100 a year rather than committing to $1,904. For occasional use, that is unusually forgiving. | 31→30 | 9.1→7.6 | pass |  |
| 5 | cannon | `verdict.strengths[4]` | **The largest fully priced enrichment catalog on this site** — 22 distinct classes in a single session, from robotics, ballet and chess to pottery, golf and photography. Each has a named provider and a real fee. | **A large, fully priced enrichment catalog** — 22 distinct classes in a single session, from robotics, ballet and chess to pottery, golf and photography. Each has a named provider and a real fee. | 34→31 | 9.4→9.1 | pass |  |
| 6 | charlotte-christian | `coverage.headline` | Lower School is covered to 6:00 p.m. and Middle School only to 5:00 p.m. — a full hour earlier, and one of the sharpest split deadlines in this set. | Lower School is covered to 6:00 p.m. and Middle School only to 5:00 p.m. — a full hour earlier, an unusually sharp split. | 26→20 | —→— | pass |  |
| 7 | charlotte-christian | `dayInside.headline` | Charlotte Christian is the only school here that publishes an actual timed daily schedule — and it protects a 45-minute homework block in both divisions. | Charlotte Christian publishes an actual timed daily schedule, which few schools do, and it protects a 45-minute homework block in both divisions. | 24→22 | —→— | pass |  |
| 8 | charlotte-christian | `verdict.headline` | The most operationally transparent program here — a published schedule, a protected homework block, and a genuinely clever Bridge Care tier — wrapped around rates that have risen very fast. | An unusually transparent program — a published schedule, a protected homework block, and a genuinely clever Bridge Care tier — wrapped around rates that have risen very fast. | 28→26 | —→— | pass |  |
| 9 | charlotte-christian | `verdict.strengths[0]` | **A published, structured daily rhythm** for both divisions, with a protected 45-minute homework and reading block. No other school in this set publishes its schedule at all. | **A published, structured daily rhythm** for both divisions, with a protected 45-minute homework and reading block. Few schools publish their after-school schedule at all. | 27→24 | —→— | pass |  |
| 10 | charlotte-christian | `verdict.watchouts[4]` | **Snack is not provided** in either program, unlike most peers here. | **Snack is not provided** in either program, though many schools provide one. | 11→12 | —→— | pass |  |
| 11 | charlotte-country-day | `coverage.headline` | Extended Day covers JK through grade 8 to 6:00 p.m., with five separate pickup tiers — the finest-grained coverage ladder of any school here. | Extended Day covers JK through grade 8 to 6:00 p.m., with five separate pickup tiers — an unusually fine-grained coverage ladder. | 21→18 | —→— | pass |  |
| 12 | charlotte-country-day | `verdict.headline` | The most flexible and most transparently priced after-school program in this set — and the one whose enrichment offering you cannot actually see before you enroll. | An unusually flexible, transparently priced after-school program, but its enrichment offering cannot be seen before you enroll. | 25→17 | —→— | pass |  |
| 13 | charlotte-country-day | `verdict.strengths[0]` | **The most granular pricing ladder here** — 13 rows across five pickup times and five day-counts. A JK family needing 2:00 p.m. coverage twice a week pays $115/month, not a flat care fee. | **An unusually granular pricing ladder** — 13 rows across five pickup times and five day-counts. A JK family needing 2:00 p.m. coverage twice a week pays $115/month, not a flat care fee. | 30→29 | 6.8→— | pass |  |
| 14 | covenant-day | `coverage.facts[0].text` | from **7:30 a.m.** until the start of school, at no charge, school-wide — the only free morning care in this comparison | from **7:30 a.m.** until the start of school, at no charge, school-wide — free morning care, which few schools offer | 19→18 | —→— | pass |  |
| 15 | covenant-day | `verdict.headline` | The most parent-friendly entry price in this set — free morning care, $20 drop-ins — with a session system that quietly triples for the youngest families. | An unusually parent-friendly entry price — free morning care, $20 drop-ins — with a session system that quietly triples for the youngest families. | 23→20 | —→— | pass |  |
| 16 | covenant-day | `verdict.subhead` | Coverage matches the 6:00 p.m. peer standard; the catalog opacity is the one real gap. | Coverage runs to the common 6:00 p.m. close; the catalog opacity is the one real gap. | 14→15 | —→— | pass |  |
| 17 | covenant-day | `verdict.strengths[0]` | **Free before-school care from 7:30 a.m., school-wide** — every peer here charges for morning care. The Wednesday 8:50 late start is absorbed free too. | **Free before-school care from 7:30 a.m., school-wide** — most schools charge for morning care. The Wednesday 8:50 late start is absorbed free too. | 21→20 | —→— | pass |  |
| 18 | covenant-day | `verdict.strengths[2]` | **Coverage to 6:00 p.m. for JK–8** matches the best pickup time in this comparison. | **Coverage to 6:00 p.m. for JK–8** matches the latest pickup most schools offer. | 13→12 | —→— | pass |  |
| 19 | davidson-day | `verdict.strengths[0]` | **Coverage runs to 6:00 p.m.**, competitive with peers, and spans **Traditional Toddler through grade 8** — including a toddler tier most schools here do not cover at all. | **Coverage runs to 6:00 p.m.**, competitive with peers, and spans **Traditional Toddler through grade 8** — including a toddler tier many schools do not cover at all. | 25→24 | —→— | pass |  |
| 20 | gaston-day | `coverage.facts[5].text` | The program covers **Pre-K through 8th grade only**. No after-school care is published for grades 9–12, which is normal on this roster but worth stating. | The program covers **Pre-K through 8th grade only**. No after-school care is published for grades 9–12, which is common but worth stating. | 24→21 | —→— | pass |  |
| 21 | gaston-day | `cost.headline` | At $95 a week for the Lower School and $55 for the Middle School, this is among the least expensive aftercare on the roster. | Aftercare costs $95 a week for the Lower School and $55 for the Middle School. | 22→13 | —→— | pass |  |
| 22 | gaston-day | `dayInside.subhead` | Unusually for this roster, Gaston Day prints the actual clock rather than describing the program in general terms. | Unusually, Gaston Day prints the actual clock rather than describing the program in general terms. | 18→15 | —→— | pass |  |
| 23 | gaston-day | `verdict.subhead` | For a family that needs care to 6:00 pm, this is the least expensive option on the roster; confirm the window before relying on it. | For a family that needs care to 6:00 pm, the price is low; confirm the window before relying on it. | 24→19 | —→— | pass |  |
| 24 | gaston-day | `verdict.strengths[0]` | **The price is the lowest here.** $95/week for Lower School and $55/week for Middle School, with drop-in at $30 and $15 — no registration fee published. | **The price is low.** $95/week for Lower School and $55/week for Middle School, with drop-in at $30 and $15 — no registration fee published. | 23→21 | —→— | pass |  |
| 25 | providence-day | `verdict.headline` | A strong TK–8 story: a nationally recognized Lower School program with the most transparent pricing in this set, plus a dedicated Middle School drop-in model many peers don’t offer. | A strong TK–8 story: a nationally recognized Lower School program with unusually transparent pricing, plus a dedicated Middle School drop-in model many peers don’t offer. | 29→25 | —→— | pass |  |
| 26 | trinity-episcopal | `verdict.headline` | The most deliberately affordable after-school program on this roster — income-scaled monthly rates, a reduced rate on every drop-in tier, and free half days for monthly families. | An unusually affordable after-school program, by design — income-scaled monthly rates, a reduced rate on every drop-in tier, and free half days for monthly families. | 26→24 | —→— | pass |  |
| 27 | trinity-episcopal | `verdict.strengths[0]` | **Rates scale with household income** — $105 a month under $30,000, rising through $135 and $195 to $380 over $90,000. No other school in this set prices after-school care on ability to pay at all. | **Rates scale with household income** — $105 a month under $30,000, rising through $135 and $195 to $380 over $90,000. Few schools price after-school care on ability to pay at all. | 28→24 | —→— | pass |  |
| 28 | trinity-episcopal | `verdict.strengths[4]` | **Coverage runs to 6:00 p.m.**, the latest close on this roster, and it is one uniform program across the whole K–8 span rather than a split Lower/Middle arrangement. | **Coverage runs to 6:00 p.m.**, a late close, and it is one uniform program across the whole K–8 span rather than a split Lower/Middle arrangement. | 27→24 | —→— | pass |  |

## Guard failures by design

Each token lies inside the removed comparison (plan "Decisions": (h)/(n)/(b)/(p) allowed only there).

| at | guard line | removed span |
|---|---|---|
| `charlotte-christian:dayInside.headline` | (h) ONLY marker lost (1→0) | "is **the only** school here that publishes" |
| `charlotte-christian:verdict.strengths[0]` | (h) ONLY marker lost (1→0) | "**No other** school in this set publishes its schedule" |
| `charlotte-country-day:verdict.headline` | (h) ONLY marker lost (1→0) | "The most flexible … in this set — and **the one** whose enrichment offering" (the second half of the superlative; row 8's treatment) |
| `covenant-day:coverage.facts[0].text` | (h) ONLY marker lost (1→0) | "— **the only** free morning care in this comparison" |
| `trinity-episcopal:verdict.strengths[0]` | (h) ONLY marker lost (1→0) | "**No other** school in this set prices after-school care" |

## Independent review

Reviewer: independent subagent, 2026-11-13. Scope: every changed unit in `src/data/afterSchoolPrograms`, `src/data/summer` and `src/data/internationalTravel` against `main`, tested against the plan's Rulings, the Batch A census (rows 1–35, 79, 80) and the refresh's edge cases.

**Units checked: 39** — the 37 census units (26 After School, 7 Summer, 4 Global Exposure) plus the 2 missed units added by this review (Gaston Day After School, below).

### Findings

| at | problem | fix |
|---|---|---|
| `cannon:verdict.headline` | The space after the em dash was dropped: "catalog —wrapped" (and the same in 5 more units, below). The text no longer matches the house dash style. Not a meaning change. | Fixed: "catalog — wrapped". |
| `cannon:verdict.strengths[4]` | Dropped space: "catalog** —22". | Fixed: "catalog** — 22". `**` count unchanged (2). |
| `charlotte-christian:verdict.headline` | Dropped space: "program —a published". | Fixed: "program — a published". |
| `charlotte-country-day:verdict.strengths[0]` (row 79) | Dropped space: "ladder** —13". | Fixed: "ladder** — 13". |
| `covenant-day:verdict.headline` | Dropped space: "price —free". | Fixed: "price — free". |
| `trinity-episcopal:verdict.headline` | Dropped space: "by design —income-scaled". | Fixed: "by design — income-scaled". |
| `gaston-day:verdict.strengths[0]` (row 80) | Dropped space after the bold span: "low.**$95/week". | Fixed: "low.** $95/week". |
| `gaston-day:cost.headline` | **Missed REMOVE (not in the census).** "this is among the least expensive aftercare on the roster" points at the site's set (Ruling REMOVE 2). "Unusually low" would overreach, as for row 80. | Deleted the comparison: "Aftercare costs $95 a week for the Lower School and $55 for the Middle School." Both figures kept. Needs a census row and a worklist entry: guard (k) fails until then. |
| `gaston-day:verdict.subhead` | **Missed REMOVE (not in the census).** "this is the least expensive option on the roster" (Ruling REMOVE 2). | Rewrote as row 80 does: "For a family that needs care to 6:00 pm, the price is low; confirm the window before relying on it." The condition and the hedge are kept. Needs a census row and a worklist entry: guard (k) fails until then. |

Checked and kept, with no change:

- `gaston-day:verdict.watchouts` "the extras that other schools bundle into aftercare do not exist here yet": an implicit comparison, and "here" means at Gaston Day. KEEP.
- PD "many peers don’t offer" and "Uncommon among peers", DD "competitive with peers", Trinity "several peers charge a premium" / "several peers do not address": unqualified peers. KEEP.
- PD "reaches after-school here, which is uncommon": "here" means PD. KEEP.
- The Summer "widest grade span of any (sports) camp here" (PD, Christian) and "the closest thing here to a general day camp" (Christian): this school's own catalog. KEEP.
- Code comments with comparison wording (Trinity After School line 9 "its peers", Christian Summer line 10 "the only school of the five"): these never render. Out of scope.

### Per criterion

1. Comparison still present: none in the 37 census units. Two missed units were found and fixed (above).
2. KEEP case wrongly removed: **No findings.** "many peers don’t offer" (row 1) and "competitive with peers" (row 19) were both kept.
3. Meaning drift: **No findings.** Row 8 lost "actually" and row 6 lost "operationally"; both are trims with no change in meaning.
4. Dropped hedge, condition or figure: **No findings.** Every $ amount, time and count is the same before and after (checked per unit in the diff).
5. A `**` span changed: **No findings.** The `**` counts match on all 39 units.
6. A headline that now overclaims: **No findings.** "A large … catalog" is backed by the 22 classes in the same unit. "An unusually large published slate" is backed by its 170 priced camps. "Unusually full Middle School travel" is backed by its six experiences. Trinity's "unusually affordable … by design" rests on the income-scaled rates ($105–$380 a month) in the same file; that is a judgment, but a hedged one.
7. A by-design guard failure outside the removed span: **No findings.** All 11 (h)/(n) tokens across the three review files sit inside the removed comparison. The only other failures are the 2 (k) entries for this review's own fixes.
8. A rewrite that over-generalizes or uses an absolute: **No findings.** Every rewrite uses "few", "many", "most", "common", "rare" or "unusually". Rows 30 and 80 and the two new Gaston units delete the comparison instead.

Re-run: `plain_review.mjs` on `src/data/afterSchoolPrograms` gives 28 changed units, hook pass 28/28 and after-grade >10: 0. `--check` exits 1 on the 5 (h) failures that are by design and the 2 (k) entries above. Summer and Global Exposure needed no edit, so their review files were not regenerated.
