# Davidson Day School — The Arts (Blumey Verification 2026)

## Method

- **Compiled by:** Claude Code, during `/implement ddprofile2`, 2026-11-05.
- **Why:** the 2026–27 School Profile (page 3) says the school has "recent Blumey
  nominations for Best Show and Best Featured Performers". Best Featured Performer is
  already in the app's Blumey ledger (2023, 2026). Best Show was not in any ledger row, so it
  was checked against Blumenthal Arts' own nominee announcements before use.
- **How:** each Blumenthal page was read with WebFetch (a plain `curl` returns an empty
  body), looking for Davidson Day under the Best Musical tiers. The Blumeys have no category
  called "Best Show"; Best Musical, in Tier 1 and Tier 2, is its program-level equivalent.

## Source URLs

- School Profile 2026–27: https://resources.finalsite.net/images/v1790855129/davidsondayorg/nlxzlvymosnampuadraw/2526CollegeProfile.pdf
- 2026 nominees and finalists: https://www.blumenthalarts.org/news/detail/blumenthal-arts-announces-nominees-finalists-for-2026-blumey-awards
- 2025 nominees: https://www.blumenthalarts.org/news/detail/2025-blumey-awards-nominations
- 2024 nominees: https://www.blumenthalarts.org/news/detail/blumenthal-arts-announces-the-2024-blumey-awards-nominees
- An undated Davidson Day news page saying *Bonnie & Clyde* was nominated for Best Musical
  and Best Overall Direction (found by search, year not shown): https://www.davidsonday.org/news-detail?pk=931114

## Findings

| Year | Davidson Day show | In a Best Musical tier? |
|---|---|---|
| 2026 | *Big Fish* | **No.** Tier 1: East Mecklenburg, Piedmont Community Charter, Weddington. Tier 2: Cox Mill, North Lincoln, Northwest School of the Arts |
| 2025 | *Once Upon a One More Time* | **No.** Listed only among participating schools |
| 2024 | *Something Rotten!* | **No.** Listed only among participating schools |

**Result: the Best Show claim is NOT CONFIRMED for 2024–2026.** The only Best Musical
nomination found is *Bonnie & Clyde*, on an undated school page, so it is not "recent" in
any provable sense. **No page change.**

## A lead for a later pass (not acted on in ddprofile2)

The 2026 page, as WebFetch read it, lists **five** Davidson Day finalists for *Big Fish*:
Best Actor (Lukas Paeper), **Best Actress (Malena Lessa as Sandra Bloom)**, **Best
Supporting Actor (Noah Larsen as Will Bloom)**, Best Supporting Actress (Katelyn Ray) and
Best Featured Performer (Elizabeth Robinson, also a nominee). The app's 2026 ledger row
says "Three finalists". Confirm this in a browser before correcting the row, since it rests
on a model summary of the page.
