---
name: newsboards
title: Show Davidson Day's article dates and add Covenant Day's Lions News to Latest News
status: implemented
phases: 1
created: 2026-11-01
branch: fix/newsboards
prs: []
---

# Show Davidson Day's dates and add Covenant Day's Lions News

Built directly from a user-approved audit on 2026-11-01, following [latinnews](latinnews.md).
This file is the record of what shipped. Single-phase: adds no user-facing text.

## Goal

The user asked whether Carmel Christian, Covenant Day and Davidson Day really show their
latest news. Carmel was correct. Covenant Day was missing five of its ten newest posts, and
Davidson Day showed the right posts with no dates. After this change both match the school's
own pages.

## Decisions

- **Davidson Day reads `article:published`** and is `boardIsChronological`: its article pages
  began publishing dates after the parser was written, and board order matches them exactly.
- **Davidson Day's blog stays out** (user, 2026-11-01): the section stays school announcements.
- **Covenant Day adds `/athletics/lionsnews`** as an extra board (user, 2026-11-01). Each page
  supplies only its own boards, because the same post has a different URL on each page.
- **`PER_BOARD = 6` for Covenant Day:** 18 candidates instead of 36, so a cold pass fits in 12s.
  The newest ten currently draw 2, 3 and 5 from the three boards.
- **Covenant Day keeps undated-last,** since its boards are not interleaved by date.
- **A skipped extra page is cached for 2 minutes:** without the Lions page, a fully dated list
  would otherwise sit for 30 minutes with all its athletics posts absent.

## Verification

`npx tsc -b`, `oxlint src/lib/news` and `npm run build` with every chained check pass. Chrome
against the built site and the live relay:

- [x] Covenant Day: ten rows match the true top ten of 49 posts, no duplicates, previews present
- [x] Covenant Day fully cold: 12.6s, all dated, 30-minute cache
- [x] Lions page returning 502: list renders, 2-minute cache
- [x] Davidson Day: nine rows dated Oct 22 onward, in board order; fully cold 4.8s
- [x] One Davidson Day article past the limit: row keeps its place undated, list at 2.3s,
      2-minute cache
- [x] No undated list seen on either school
- [x] Regression: Latin warm, ten dated rows
- [x] `?lang=es`: dates localized

## Implementation notes

- `worker.js` changed in comments only, so the Worker needs no redeploy.
- Charlotte Christian's article pages were re-checked (4 of 9) and still carry no
  `article:published`, so its undated section stays correct.
- **Left open:** row dates show month and day only, so Davidson Day's 2025 rows read "Oct 2"
  and "Sep 24" below "Feb 20", which looks out of order. Adding the year changes the shared
  row format, so it was not changed here.
