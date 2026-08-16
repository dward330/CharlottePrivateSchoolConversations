# Covenant Day School — College Support — Redesign Research 2026

> **Provenance:** Compiled by Claude Code on 2026-08-15 as the working dossier
> behind the structured College Support cards
> (`src/data/collegeSupportPrograms/covenant-day.ts`) and the six selectivity-bucket
> Compare rows in `src/data/metricValues.ts`. Acceptance lists extracted from the
> school's own profile PDFs; bold (matriculation) markings recovered with
> `pdfplumber` by font name. Bucket rosters are the project's shared ones
> (`source-material/college-support/_shared/`) plus the 2026 U.S. News tables, the
> same basis used for the six existing schools.

### Sources

- 2026-2027 High School Profile (2023-2026 acceptances, bold = matriculated):
  https://resources.finalsite.net/images/v1758547252/covenant/x8i0qddxvctsp5jqbpmt/2025-26HSGuidanceProfile.pdf
- 2024-2025 High School Profile (2021-2024 acceptances):
  https://resources.finalsite.net/images/v1726168257/covenant/jg1wjr67fw5ewgwy5bkz/2024-2025HSGuidanceProfilefinal_1.pdf
- 2023-24 High School Profile (2018-2023 highlights):
  https://resources.finalsite.net/images/v1695399666/covenant/zogqb5jfwbqp0henpd36/HighSchoolProfileFINAL9-12.pdf
- Stable live link (302 → current profile PDF):
  https://www.covenantday.org/fs/resource-manager/view/062375ff-cd17-49d9-9334-b194210f5f5f

### PDF-edition dating — filenames and metadata both lie

| File name says | Cover text says | Distinct? |
|---|---|---|
| `2025-26HSGuidanceProfile.pdf` | **2026-2027** | current edition |
| `2024-2025HSGuidanceProfilefinal_1.pdf` | **2024-2025** | same bytes as below (md5 `33770bde…`) |
| `2023-2024HSGuidanceProfilefinal.pdf` | **2024-2025** | duplicate URL of the same edition |
| `HighSchoolProfileFINAL9-12.pdf` | (Class of 2023 data) | 2023-24 edition |

The plan expected four distinct editions; the two "2024-25-ish" URLs serve
byte-identical files, so there are **three** editions. Internal PDF metadata is a
stale reused template (`2021-2022 HS Guidance Profile markup.pdf`). **Date by cover
text only.**

### Bucket classification, worked — 2023-2026 acceptance list

**Ivy League — 2 / 8:** Dartmouth ✓(bold), Penn ✓(bold). Absent: Brown, Columbia,
Cornell, Harvard, Princeton, Yale (Brown/Princeton appear on the 2021-2024 list;
Cornell/Princeton/Brown/Dartmouth on the 2018-2023 highlights).

**"Ivy Plus" — 3 / 17:** the two Ivies + Duke ✓(bold). Absent from the 17-member
roster: Caltech, Chicago, Georgetown, Harvard, JHU, MIT, Northwestern, Stanford,
WashU (+ the six absent Ivies).

**Top-75 National Universities — 40 / 75.** Counted members (bold marked ●):

Case Western · Clemson ● · William & Mary ● · Dartmouth ● · Duke ● · Emory ● ·
Florida State · George Washington ● · Georgia Tech ● · Indiana · Michigan State ·
NYU ● · NC State ● · Ohio State · Penn State · Purdue · RPI · Syracuse ·
Texas A&M · UC Santa Barbara · Arizona · UConn ● · Florida ● · Georgia ● ·
Illinois · Maryland ● · UMass · Miami (FL) · Michigan ● · Minnesota ● ·
UNC-Chapel Hill ● · Notre Dame · Penn ● · Tennessee ● · Virginia ● · Wisconsin ·
Villanova · Virginia Tech ● · Wake Forest ● · Colorado.

*Borderline calls:* George Washington, RPI and UC Santa Barbara are not in the
project's tagged-union roster (no prior school's featured list carried them) but
sit inside the top 75 of the 2026 U.S. News National Universities table and are
counted. Arizona, Tennessee and Colorado follow the project's existing roster
tags. Fordham, SMU, TCU, Baylor, Auburn, American, RIT and Colorado School of
Mines fall outside the top 75 and are not counted.

**Top-75 Liberal Arts — 9 / 75:** Davidson ● · Furman ● · Macalester ● · Rhodes ·
Sewanee · Richmond · U.S. Air Force Academy · Wofford ● · Gettysburg.
*Borderline:* Wheaton College (IL) ● and Bard are excluded for consistency with
the project's roster (neither is tagged lac75 by any prior classification).

**Power Four — 46 / 68:**

- ACC (14): Clemson ●, Duke ●, Florida State, Georgia Tech ●, Louisville ●,
  Miami, North Carolina ●, NC State ●, Notre Dame, SMU ●, Syracuse, Virginia ●,
  Virginia Tech ●, Wake Forest ●.
- SEC (12): Alabama ●, Arkansas ●, Auburn ●, Florida ●, Georgia ●, Kentucky ●,
  LSU, Ole Miss ●, Mississippi State ●, South Carolina ●, Tennessee ●, Texas A&M.
- Big Ten (11): Illinois, Indiana, Iowa, Maryland ●, Michigan ●, Michigan State,
  Minnesota ●, Ohio State, Penn State, Purdue, Wisconsin.
- Big 12 (9): Arizona, Arizona State, Baylor ●, UCF, Cincinnati ●, Colorado,
  Kansas, TCU, Utah.

**HBCUs — 3 / 107:** Fayetteville State, Johnson C. Smith, NC A&T ●.

### Cross-validation against the 2021-2024 edition

The overlapping classes (2023, 2024) let the two lists check each other. The
2021-2024 window is *broader* at the top (Brown, Princeton, Northeastern, Rice,
Lehigh, WashU-tier absent but UCLA/UCSD/UCD/UCI/UCSB present, W&L ●, US Military/
Coast Guard/Merchant Marine academies) — consistent with two extra classes of
acceptances. No contradiction found between editions.

### Not published / confirmed absent

- **Scholarship dollar totals** — absent from all three editions, the news feed,
  and targeted searches.
- **Per-class acceptance breakdowns** — the lists are multi-year windows only.
- **GPA/score distributions** — aggregates only, consistent with the no-rank
  policy.
- **Counseling platform** (Naviance/SCOIR) — not named publicly.

### App metric values this dossier supports

`ap-performance` = 96% (2026) · `bucket-ivy` = 2/8 · `bucket-ivyplus` = 3/17 ·
`bucket-nu75` = 40/75 · `bucket-lac75` = 9/75 · `bucket-p4` = 46/68 ·
`bucket-hbcu` = 3/107 · `counselor-caseload` = 85:1.
