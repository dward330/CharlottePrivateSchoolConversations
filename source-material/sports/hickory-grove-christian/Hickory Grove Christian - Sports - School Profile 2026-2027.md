# Hickory Grove Christian School — Sports (High School Profile 2026–2027)

## Method

- **Compiled by:** Claude Code, during `/plan hgprofile`, 2026-11-04.
- **How:** the athletics block on page 2 of the school's 2026–27 High School Profile,
  extracted with `pdftotext -layout` and a column crop (`-x 400 -W 200`). Transcribed
  verbatim. The full profile transcription, with the PDF's SHA-1, is in
  `source-material/college-support/hickory-grove-christian/Hickory Grove Christian - College Support - School Profile 2026-2027.md`.
- **This is the school's own claim list.** Before any of it reaches the page, check it
  against the NCISAA results archive: a school's title list can over-claim (Davidson Day's
  did, twice).

## Source URLs

- https://resources.finalsite.net/images/v1790771210/hgchristianorg/l6paia83bjrvwh9kpm20/2026-2027SchoolProfile.pdf
  (2026–2027 High School Profile, page 2, "Athletics")
- NCISAA results archive, for verification:
  https://www.ncisaa.org/ (track and field results by year; the app's existing `ARCHIVE`
  constant in `src/data/sportsPrograms/hickory-grove-christian.ts`, sport id 22)

## Athletics block (verbatim)

"Athletics: Total Varsity Teams: **15**"

"NCISAA Team Championships"

- 2025— Division II Men's Track Team
- 2025— Men's 4x200 Relay
- 2025— Men's 4x800 Relay
- 2025, 2024— Men's 4x400 Relay
- 2023— Varsity Baseball, Men's 4x100 Relay
- 2021— Varsity Baseball, Men's 400 Meter
- 2019, 2017, 2006-2010— Varsity Softball (3A)
- 2009—Varsity Women's Basketball (3A)

## Against the app (planning-time comparison)

Team titles in `sportsPrograms/hickory-grove-christian.ts` (12 total: softball 7, baseball
3, girls basketball 1, boys track 1):

| Profile claim | App | Status |
|---|---|---|
| 2025 D2 men's track team | Boys Track & Field 2025 (D2) | matches |
| Baseball 2021, 2023 | 2021, 2023 (and 2A 2005, which the profile omits) | matches |
| Softball 2019, 2017, 2006–2010 | seven 3A titles 2006–2019 | matches |
| Women's basketball 2009 (3A) | Girls Basketball 2009 (3A) | matches |
| 2025 4x200, 4x800, 4x400 relays | "backed by three relay wins" (2025 text) | consistent; events not named |
| **2024 men's 4x400 relay** | not on the page | **new; verify** |
| **2023 men's 4x100 relay** | not on the page | **new; verify** |
| **2021 men's 400 meter** | not on the page | **new; verify** |
| **15 varsity teams** | "~30 teams across V · JV · MS"; "30 teams participating in 12 different sports" | **new figure**; consistent (30 counts all levels) |

The relay and 400 m entries are **event** titles, not team championships, despite the
profile's heading. They never count toward the app's team-title total of 12.

## NCISAA verification of the event titles (`/implement hgprofile`, 2026-11-04)

Each profile event claim was checked against the NCISAA's own published meet results. The
results PDFs were downloaded and read with `pdftotext -layout`. Athletes are not named here
or on the page.

| Claim | NCISAA source | Result |
|---|---|---|
| 2025 men's 4x200 relay | 2025 D2 meet report, event #19 — https://admin.ncisaa.org/uploads/Docs/NCISAA%20D2%20FInal%20Results.pdf | **confirmed**: 1st, Hickory Grove Christian (A), 1:32.36, 10 pts |
| 2025 men's 4x800 relay | same PDF, event #23 | **confirmed**: 1st, 8:05.86, 10 pts |
| 2025 men's 4x400 relay | same PDF, event #21 | **confirmed**: 1st, 3:27.28, 10 pts (Asheville School 2nd, 3:29.25) |
| 2025 D2 men's team title | same PDF, Boys Scores | **confirmed** (already on the page): 1st, 130 pts; Asheville School 93 |
| 2021 men's 400 m | 2021 D2 meet report (Forsyth Country Day, May 15, 2021), event #5 — https://admin.ncisaa.org/uploads/NCISAA%20D2%20Results.pdf, linked from https://archives.ncisaa.org/index.php?sport=22&years=2020-2021 | **confirmed**: 1st, Hickory Grove Christ[ian], 50.35, 10 pts |
| 2024 men's 4x400 relay | https://archives.ncisaa.org/index.php?sport=22&years=2023-2024 | **not found**: the page links no results, only an apparel store (nwd.ink, now 404). No 2024 track results upload appears in the Wayback CDX for `admin.ncisaa.org/uploads/`, and the 2024-09-11 capture of `ncisaa.org/playoff-brackets/?sport=22` links none either |
| 2023 men's 4x100 relay | https://archives.ncisaa.org/index.php?sport=22&years=2022-2023 | **not found**: the page links only a meet program (flipsnack) and the same apparel store; the May and June 2023 captures of the live bracket page link no results; the one 2022–23 track upload in the CDX is the sport-information rules sheet |

Note: the 2021 Division 3 PDF also mentions "Hickory Christian Academy". That is a different
school and was not counted.

**Outcome for the page:** the Boys Track & Field record row names the 2025 4x200, 4x800 and
4x400 relays and the 2021 400 m. The 2024 4x400 and 2023 4x100 are left off, because the
NCISAA has no published result to check them against. They remain the school's own claim,
recorded above. The team-title count stays 12.
