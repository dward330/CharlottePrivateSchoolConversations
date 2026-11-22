# Charlotte Country Day — Financial Aid and Tuition — Tuition History

## Provenance

- **Retrieved by:** Claude (Claude Code agent), on behalf of Derrick.
- **Retrieval date:** 2026-07-23
- **Method:** Internet Archive Wayback Machine. The school's live Tuition and Financial
  Aid page is overwritten each year, so prior-year rates were recovered from archived
  snapshots of that same URL. Snapshots were fetched with the `id_` (raw, un-rewritten)
  Wayback modifier and the tuition table was read directly out of the archived HTML.
- **Live page (current):** https://www.charlottecountryday.org/admissions/tuition-financial-aid
- **CDX query used to enumerate snapshots:**
  `https://web.archive.org/cdx/search/cdx?url=charlottecountryday.org/admissions/tuition-financial-aid&output=json&from=2023&to=2026&collapse=digest`

**Important:** every dollar figure below was read verbatim from a retrieved archived
document. None are derived, interpolated, or back-computed from a percentage increase.

Each snapshot renders the rates in a plain HTML table under an explicit heading of the
form `<YEAR> Tuition Rates`, with a `Grades` column and a `Cost` column. The band labels
below ("Junior Kindergarten", "Kindergarten", "Grades 1–4", "Grades 5–8", "Grades 9–12")
are the school's own row labels, quoted as they appear.

## Source snapshots

| School year | Wayback timestamp | Snapshot URL | Heading text on page |
| --- | --- | --- | --- |
| 2023–24 | 20230607192006 | https://web.archive.org/web/20230607192006/https://www.charlottecountryday.org/admissions/tuition-financial-aid | "2023-24 Tuition Rates" |
| 2023–24 (confirm) | 20240224130337 | https://web.archive.org/web/20240224130337/https://www.charlottecountryday.org/admissions/tuition-financial-aid | "2023-24 Tuition Rates" |
| 2024–25 | 20240621075711 | https://web.archive.org/web/20240621075711/https://www.charlottecountryday.org/admissions/tuition-financial-aid | "2024-25 Tuition Rates" |
| 2024–25 (confirm) | 20250127154701 | https://web.archive.org/web/20250127154701/https://www.charlottecountryday.org/admissions/tuition-financial-aid | "2024-25 Tuition Rates" |
| 2025–26 | 20250419212556 | https://web.archive.org/web/20250419212556/https://www.charlottecountryday.org/admissions/tuition-financial-aid | "2025-26 Tuition Rates" |
| 2025–26 (confirm) | 20251110135437 | https://web.archive.org/web/20251110135437/https://www.charlottecountryday.org/admissions/tuition-financial-aid | "2025-26 Tuition Rates" |
| 2025–26 (confirm) | 20260127094544 | https://web.archive.org/web/20260127094544/https://www.charlottecountryday.org/admissions/tuition-financial-aid | "2025-26 Tuition Rates" |

Additional snapshots checked that carried the same figures (redundant confirmations):
`20241013110721` (2024–25), `20250213060926` (2024–25), `20250713082444` (2025–26).

## Tuition by band and school year

| Band | 2023–24 | 2024–25 | 2025–26 | 2026–27 |
| --- | --- | --- | --- | --- |
| Junior Kindergarten | $21,185 | $22,190 | $23,350 | $24,515 |
| Kindergarten | $22,220 | $23,275 | $24,500 | $25,725 |
| Grades 1–4 | $26,280 | $27,530 | $28,930 | $30,375 |
| Grades 5–8 | $28,295 | $29,640 | $31,145 | $32,700 |
| Grades 9–12 | $29,480 | $30,880 | $32,450 | $34,075 |

Per-column sourcing:

- **2023–24** — Wayback `20230607192006` and `20240224130337`, both of the live tuition
  page. Verbatim: "2023-24 Tuition Rates Grades Cost Junior Kindergarten $21,185
  Kindergarten $22,220 Grades 1–4 $26,280 Grades 5–8 $28,295 Grades 9–12 $29,480".
- **2024–25** — Wayback `20240621075711`, `20241013110721`, `20250127154701`,
  `20250213060926`. Verbatim: "2024-25 Tuition Rates Grades Cost Junior Kindergarten
  $22,190 Kindergarten $23,275 Grades 1–4 $27,530 Grades 5–8 $29,640 Grades 9–12 $30,880".
- **2025–26** — Wayback `20250419212556`, `20250713082444`, `20251110135437`,
  `20260127094544`. Verbatim: "2025-26 Tuition Rates Grades Cost Junior Kindergarten
  $23,350 Kindergarten $24,500 Grades 1–4 $28,930 Grades 5–8 $31,145 Grades 9–12 $32,450".
- **2026–27** — carried over from the existing Charlotte Country Day financial-aid
  deep-dive report already in this folder; included here only to complete the series.
  Not newly retrieved in this pass.

## Note on the published 5.0% increase

The school states that every band rose 5.0% from 2025–26 to 2026–27. The archived
2025–26 figures are close to, but **not identical to**, what a naive 2026–27 ÷ 1.05
calculation would produce — the school rounds each band to a clean figure. Examples:

| Band | 2026–27 ÷ 1.05 (derived) | Actual published 2025–26 | Actual increase |
| --- | --- | --- | --- |
| Junior Kindergarten | $23,347.62 | **$23,350** | 4.99% |
| Kindergarten | $24,500.00 | **$24,500** | 5.00% |
| Grades 1–4 | $28,928.57 | **$28,930** | 4.99% |
| Grades 5–8 | $31,142.86 | **$31,145** | 4.99% |
| Grades 9–12 | $32,452.38 | **$32,450** | 5.01% |

This confirms the school's "5.0%" claim is accurate to rounding, and it validates using
the real published figures rather than the derived ones in any year-over-year chart.

## Year-over-year increases (computed from the published figures above, for reference only)

| Band | 2023–24 → 2024–25 | 2024–25 → 2025–26 | 2025–26 → 2026–27 |
| --- | --- | --- | --- |
| Junior Kindergarten | +4.74% | +5.23% | +4.99% |
| Kindergarten | +4.75% | +5.26% | +5.00% |
| Grades 1–4 | +4.76% | +5.09% | +4.99% |
| Grades 5–8 | +4.75% | +5.08% | +4.99% |
| Grades 9–12 | +4.75% | +5.08% | +5.01% |

These percentages are worked out from the tuition figures above, which the school publishes.

## Method

### Re-verification 2026-11-20 (plan `consistency`)

Fetched 2026-11-20: https://www.charlottecountryday.org/admissions/tuition-financial-aid —
"Approximately 20% of our student body receives financial aid"; 341 students "receive $9.4
million in financial assistance a year"; deadlines November 1 (current families) and January
15 (new families); $65 application fee. The "about 30% of K–12 students receive need-based
tuition assistance" in `after-school/charlotte-country-day/CCD - After School - Redesign
Research 2026.md` has no source URL and disagrees with this page.

### Re-verification 2026-11-22 (plan `consistency3`, implement)

CCD-R8 asked whether the Endowment & Capital Giving page, the only source of the Merit
section's donor gift-level ladder, is gone. **It is live.** Re-scan #1 (2026-11-20) tried
four guessed slugs, and all 404'd. The page sits at a slug none of them used:

- https://www.charlottecountryday.org/about/support/endowment-capital: HTTP 200, title
  "Endowment & Capital Giving". It is linked from https://www.charlottecountryday.org/about/support
  ("Learn more") and from the Tuition & Financial Aid page ("Review a full list of
  scholarship offerings", `/fs/pages/2695`, which 301-redirects here). It is not in the
  Support sub-nav. Wayback has archived it at this URL since 2022-05-19.
- Verbatim today: "Currently, Country Day has 35 endowments that support scholarships." ·
  "$220,000 (current minimum) Supports 25% of a student(s) tuition Current annual
  distribution is estimated at $9,900 $440,000 Supports 50% … $19,800 $660,000 Supports 75%
  … $29,700 $880,000 Supports 100% of a student(s) tuition Current annual distribution is
  estimated at $39,600" · "+6,000 annually Often our scholarship families inquire about
  receiving ancillary support … this is the average cost annually."
- Example funds, verbatim: Country Day Ready (2019) "full tuition plus $6,000 in ancillary
  expenses annually to a qualified student for their entire career at Charlotte Country Day
  School"; Scott Benson (2013) "four years of financial aid for an Upper School Student who
  excels in both academics and athletics"; W.R. Pitts Family (1991) "will fund the full
  tuition (100 percent) of an incoming kindergarten student … renewed annually until the
  child completes the fourth grade."
- 404 today: `/giving`, `/support-cd`, `/giving/endowment`, `/support/endowment`,
  `/giving/endowment-capital-giving`, `/support-country-day/endowment-and-capital-giving`,
  `/about/support/endowment`, `/about/support/endowment-capital-giving`,
  `/about/support/endowment-and-capital-giving`, `/about/support/capital-giving`,
  `/about/support/endowed-scholarships`.
- https://www.charlottecountryday.org/admissions/frequently-asked-questions (200): "Does
  Country Day offer any merit scholarships? No, we only have need-based awards and endowed
  scholarships, which are also based on financial need."
- https://www.charlottecountryday.org/admissions/tuition-financial-aid (200): "Full and
  Partial Endowed Scholarships Country Day has a variety of endowed scholarships awarded by
  the school to qualified applicants based on financial need as determined through the
  School and Clarity."

Because the page was found, the plan's deletion step is **on hold for the user's call**. The
ladder figures still match the live page word for word.

### Re-verification 2026-11-22 (plan consistency4, self-scan)

- https://www.charlottecountryday.org/admissions/tuition-financial-aid (HTTP 200): "Approximately 20% of our student body receives financial aid: 341 students receive $9.4 million in financial assistance a year." No 21% on the page.
- https://www.charlottecountryday.org/about/fast-facts (HTTP 200): "$10.1 million financial aid awarded to 347 students" and "1,745 Students enrolled for 2026-27 school year". No 21% on the page.
- https://www.charlottecountryday.org/bucsnet/bus (HTTP 200, linked from the Quick Reference): "2026-27 Bus Fees", Round Trip / One-Way: Myers Park/Cornwell "$1,670" / "$955", Charlotte Country Club "$1,785" / "$1005", Campus Shuttle Bus Service "$715" / "$400". "parents are billed twice: half in August and half in January".
- https://www.charlottecountryday.org/bucsnet/quick-reference (HTTP 200): "Incidental charges such as dining hall, Campus Store, Extended Day, tutoring, PE uniforms (Middle School), and bus transportation fees are billed on a monthly basis".
- https://www.charlottecountryday.org/about/support/endowment-capital (HTTP 200): "$880,000", "Current annual distribution is estimated at $39,600", "+6,000 annually". Unchanged.
