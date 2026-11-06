# Providence Day — Wells Fargo Cup point-earning results, 2026–27 season (in progress)

## Method

Fetched 2026-11-06 with `curl` from the NCISAA's own 2026–27 playoff bracket pages (the `currentyear=1` view) while building the NCISAA 4A `/cup-episode` podcast. Each bracket is an HTML grid; the champion is the cell in the last bracket column and the finalists are the two cells in the column before it, with the final score in the last score column. Only results the association itself posted are recorded here. No Cup **point** figure is recorded: the association had not posted 2026–27 Cup standings, and points are never computed from brackets for the ledger.

The 2025–26 4A final Cup table (the ledger's latest season) was re-checked against https://www.ncisaa.org/recognition/wells-fargo-cup/current-champions/ the same day: all 17 rows match `src/data/wellsFargoCup.ts` cell for cell (place, total, fall, winter, spring). That page still showed 2025–26 as current on 2026-11-06.

Cross country, boys golf and girls golf 2026–27 pages linked no results on 2026-11-06, so they are not recorded.

## Fall 2026 state championship finishes

| Sport | Class | Finish | Final | Date | Source |
|---|---|---|---|---|---|
| Girls tennis | 4A | Runner-up (No. 2 seed) | Charlotte Latin (No. 1) 5, Providence Day 0 | 2026-10-31 | https://www.ncisaa.org/playoff-brackets/?sport=11&currentyear=1 |

## In progress

- Division I football: No. 1 seed in the eight-team bracket; quarterfinal at home against No. 8 Metrolina Christian not yet played as of 2026-11-06. https://www.ncisaa.org/playoff-brackets/?sport=31&currentyear=1

## The 2026–27 Division I football bracket (as posted 2026-11-06)

Quarterfinals, each at the higher seed: No. 1 Providence Day v No. 8 Metrolina Christian; No. 4 Christ School v No. 5 Charlotte Latin; No. 3 Cannon–Concord Academy (co-op) v No. 6 Charlotte Christian; No. 2 Rabun Gap v No. 7 Charlotte Country Day.
