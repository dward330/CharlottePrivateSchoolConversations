# Charlotte Country Day — Wells Fargo Cup point-earning results, 2026–27 season (in progress)

## Method

Fetched 2026-11-06 with `curl` from the NCISAA's own 2026–27 playoff bracket pages (the `currentyear=1` view) while building the NCISAA 4A `/cup-episode` podcast. Each bracket is an HTML grid; the champion is the cell in the last bracket column and the finalists are the two cells in the column before it, with the final score in the last score column. Only results the association itself posted are recorded here. No Cup **point** figure is recorded: the association had not posted 2026–27 Cup standings, and points are never computed from brackets for the ledger.

The 2025–26 4A final Cup table (the ledger's latest season) was re-checked against https://www.ncisaa.org/recognition/wells-fargo-cup/current-champions/ the same day: all 17 rows match `src/data/wellsFargoCup.ts` cell for cell (place, total, fall, winter, spring). That page still showed 2025–26 as current on 2026-11-06.

Cross country, boys golf and girls golf 2026–27 pages linked no results on 2026-11-06, so they are not recorded.

## Fall 2026 state championship finishes

| Sport | Class | Finish | Final | Date | Source |
|---|---|---|---|---|---|
| Field hockey | Division 1 | Champion (No. 1 seed) | Charlotte Country Day 4, Cary Christian (No. 3) 2 | 2026-10-31 | https://www.ncisaa.org/playoff-brackets/?sport=9&currentyear=1 |
| Boys soccer | 4A | Runner-up (No. 2 seed) | Rabun Gap (No. 1) 4, Charlotte Country Day 0 | 2026-10-31 | https://www.ncisaa.org/playoff-brackets/?sport=8&currentyear=1 |
| Volleyball | 4A | Runner-up (No. 3 seed) | North Raleigh Christian (No. 1) 3, Charlotte Country Day 1 | 2026-10-31 | https://www.ncisaa.org/playoff-brackets/?sport=12&currentyear=1 |

## In progress

- Division I football: No. 7 seed in the eight-team bracket; quarterfinal at No. 2 Rabun Gap not yet played as of 2026-11-06. https://www.ncisaa.org/playoff-brackets/?sport=31&currentyear=1
