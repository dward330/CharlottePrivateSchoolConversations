# New findings from linking the Financial Aid sources (2026-11-22)

**All four were then FIXED in consistency3 at the user's direction (2026-11-22)**: Providence
Day fares added; the two Davidson Day citations removed with the claims only they supported;
Latin's two documents used; Hickory Grove re-checked against the live Scholarships page. See
the plan's "Four research findings, fixed" notes.

## Providence Day: its bus fares are now published

Found 2026-11-22 while linking the Financial Aid source lines (plan `consistency3`, scope
addition). Kept out of this round's diff; it is a candidate for the next round.

## What the report says today (`src/data/financialAidReports.ts`, PROVIDENCE_DAY)
- Framing: "The transportation page still refers to 2023–2024 while the tuition table has
  moved to 2026–27".
- Beyond Tuition: "Bus transportation · 2023–24 page, fares not retrieved" (status `range`).
- Components note: "The bus fare sits on an old page and is not counted either way. That
  leaves 56% unpriced." (six of sixteen items priced)
- Ask: "What are the bus fares for our address for the current year?"

## What the school's page says today
https://www.providenceday.org/around-campus/transportation (HTTP 200, fetched 2026-11-22).
The string "2023-2024" no longer appears. It reads "As of the 2026-27 school year, PD offers
eight* different route options", and it has a table headed "2026-2027 Bus Transportation
Schedule and Fares". Fares per student, as published:

| Service area | Round trip | One way |
|---|---|---|
| Myers Park | 1st Child: $1,830 · Siblings: $1,379 | 1st Child: $1,098 · Siblings: $827 |
| Dilworth | 1st Child: $1,830 · Siblings: $1,379 | 1st Child: $1,098 · Siblings: $827 |
| Mint Museum (morning only) | 1st Child: $1,830 · Siblings: $1,379 | 1st Child: $1,098 · Siblings: $827 |
| Ballantyne | 1st Child: $1,965 · Siblings: $1,507 | 1st Child: $1,179 · Siblings: $904 |
| Carmel | 1st Child: $1,855 · Siblings: $1,384 | 1st Child: $1,113 · Siblings: $830 |
| Blakeney | 1st Child: $1,965 · Siblings: $1,507 | 1st Child: $1,179 · Siblings: $904 |
| Stonecrest | 1st Child: $1,965 · Siblings: $1,507 | 1st Child: $1,179 · Siblings: $904 |
| South Park | 1st Child: $1,830 · Siblings: $1,379 | 1st Child: $1,098 · Siblings: $827 |
| FoxCroft | 1st Child: $1,830 · Siblings: $1,379 | 1st Child: $1,098 · Siblings: $827 |

## What a fix would touch
The framing sentence, the Beyond Tuition row (priced, $1,830–$1,965 round trip), the
components count and the "56% unpriced" figure (`check:consistency` R11 reads it), and the
ask. The fares belong in a `source-material/financial-aid-tuition/providence-day/*.md` record
first, via the ingest, under the data-provenance standard.

---

# Further findings from the same source-link research (2026-11-22, not fixed here)

## Davidson Day: two source names that do not hold up today
- **"extended care", retrieved 22 Jul 2026.** The only copies of
  davidsonday.org/community/auxiliary-programs/extended-care are Wayback captures from
  2019–2020 (last: 20200518232512). The school's own After School research already recorded it
  as 404 on 22 Jul 2026, so a 22 Jul 2026 retrieval of it cannot be right. **Left unlinked.**
- **"employee-parent enrollment instructions".** The live
  https://www.davidsonday.org/enrollment-instructions-for-employees covers the 2026–2027
  contract. It does not mention the eleven-month payment plan or the Truth in Lending
  disclosure the report cites. The older /enrollment-instructions-for-employee-parents
  (2025-2026) is 404 and was never archived. **Left unlinked.**

## Charlotte Latin: "not retrievable" may now be stale
The report (~L1648) calls the bodies of the "2025-26 Scholarships" and "2025-26 Commonly Asked
Questions about Financial Aid" documents "not retrievable". Both Google Docs, linked from the
live Policies, Procedures and Documents page, are now public and exportable. The page has
dropped the "2025-26" labels; a 14 Mar 2026 Wayback capture shows the same document IDs
labelled 2025-26.

## Hickory Grove: the Scholarships page moved and was reworded
/admissions/scholarships now redirects to Admissions Home. The live successor
/scholarships is titled "NC State Scholarships", and its discount wording has changed. The
source link uses the Wayback copy 20260722074917, the edition the report cites.
