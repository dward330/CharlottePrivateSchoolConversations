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

## 2026 finalists: the app's count was wrong (CONFIRMED 2026-11-05)

Read in real Google Chrome (Playwright, `channel: 'chrome'`) on 2026-11-05, from the 2026
nominees and finalists page above. It lists **five** Davidson Day finalists for *Big Fish*,
not the three the app's ledger shows:

| Category | Davidson Day entry (verbatim) |
|---|---|
| Finalists for Best Actor | Davidson Day School - Lukas Paeper as Edward Bloom - Big Fish |
| Finalists for Best Actress | Davidson Day School - Malena Lessa as Sandra Bloom - Big Fish |
| Finalists for Best Supporting Actor | Davidson Day School - Noah Larsen as Will Bloom - Big Fish |
| Finalists for Best Supporting Actress | Davidson Day School - Katelyn Ray as Witch - Big Fish |
| Finalists for Best Featured Performer | Davidson Day School - Elizabeth Robinson as Giant - Big Fish |
| Best Featured Performer (nominee, top six) | Davidson Day School – Elizabeth Robinson as Giant – Big Fish |

The earlier research missed Best Actress and Best Supporting Actor. The page also says the
Best Actor and Best Actress *nominees* were announced separately on May 4, 2026, so a
Paeper or Lessa nomination is not established here. The app says "finalist" and nothing
more.

**No win.** The 2026 winners page
(https://www.blumenthalarts.org/news/detail/blumenthal-arts-announces-2026-blumey-award-winners)
lists Davidson Day / *Big Fish* only among the participating schools. Best Actor went to
North Lincoln and Best Actress to Carmel Christian.
