# Gaston Day School — Sports — Varsity Roster Cross-Reference (2026)

> **Provenance:** Research record written by Claude Code on 2026-11-09 during
> `/athlete-commits gaston-day`. It documents *how* Gaston Day's college commitments were
> found and *what was searched and found empty*, so a later pass does not redo the work. The
> athlete-level results are in `Gaston Day School - Sports - College Commitments
> 2024-2026.md`; this file holds the method and the nulls. It is provenance for the College
> Pipeline data, not a card of its own (`src/lib/metrics.ts` folds it onto the research
> dossier via `/roster cross-reference/i`).
>
> **Names policy:** only athletes with a documented college commitment, and the leads that
> were ruled out, are named. Current students and graduates without a commitment are
> recorded as counts.

## Result in one line

From nothing on record to **3** committed, **2** Division I, **1** Power 4 for the Classes of
2024–2026: two volleyball players (Megan Brown ’24, Wofford; Anne Bradley Bing ’25, South
Carolina) and one boys basketball player (Braylen Todd ’26, Johnson & Wales–Charlotte,
USCAA). Gaston Day had no College Pipeline card before this pass, and the two Compare window
rows were `null`.

## Scope

Every varsity sport Gaston Day lists (`src/data/sportsPrograms/gaston-day.ts`): volleyball,
boys soccer, field hockey, boys and girls cross country, girls tennis, cheering, boys and
girls basketball, boys and girls swimming, wrestling, baseball, softball, boys lacrosse,
boys and girls golf, boys tennis and track & field. Gaston Day fields **no football**.

Depth by tier:
- **Full per-name cross-reference** (rosters + commitment database + college roster):
  volleyball, boys basketball, girls tennis.
- **Rosters + HighSchoolOT tracker + grouped name searches:** baseball, girls basketball,
  boys and girls soccer, boys tennis.
- **Tracker + grouped searches only (no roster published):** swimming, golf, cross country,
  track & field, lacrosse, wrestling, field hockey, softball. Cheering has no commitment
  database and was not searched beyond the grouped searches.

## Step 1 — the school's own pages (read 2026-11-09)

- `gastonday.org` (WordPress): the site search for "signing", "commit" and "college" returns
  navigation pages only, and the WP REST posts endpoint holds three template posts. There is
  no signing-day post.
- `gastondayathletics.com/News`: seven articles (volleyball, conference move, postseason,
  volleyball three-peat, MAC all-conference, media policy, NCISAA all-state). None names a
  college commitment.
- `gastondayschool.org` returns 403. It is not the school's domain.

The school publishes no all-sport commitment list.

## Step 2 — MaxPreps rosters by season

`https://www.maxpreps.com/nc/gastonia/gaston-day-spartans/<sport>/<yy-yy>/roster/`, path
form, browser UA. 21 sport slugs × 4 seasons (23-24 → 26-27), plus boys basketball 22-23.

- **404 in every season:** field hockey, softball, boys volleyball, football (not fielded),
  track & field.
- **Empty table in every season:** baseball 26-27 (spring not yet posted), boys and girls
  cross country, boys and girls golf, boys lacrosse, boys and girls swimming, wrestling.
  These are recorded as **unchecked by roster**, not as nulls.
- **With data:** baseball, boys basketball, girls basketball (24-25, 25-26), boys soccer,
  girls soccer, boys tennis, girls tennis, volleyball.

Seniors (`Sr.`) by graduating class (several are two-sport athletes):
- **Class of 2024 (2023-24):** boys soccer 7, baseball 5, girls soccer 4, girls tennis 3,
  boys basketball 2, volleyball 1. (The girls basketball 2023-24 roster is empty.)
- **Class of 2025 (2024-25):** girls soccer 8, boys soccer 5, volleyball 3, baseball 2,
  girls tennis 2, boys basketball 1.
- **Class of 2026 (2025-26):** boys soccer 6, boys basketball 4, girls basketball 4, girls
  soccer 4, girls tennis 4, volleyball 4, baseball 2, boys tennis 1.
- **Class of 2027 (2026-27, fall and winter posted):** boys basketball 2, boys soccer 2,
  girls tennis 2, volleyball 1.

## Step 3 — cross-reference

**HighSchoolOT trackers.** All 18 per-sport trackers, the three "Building the Fence"
in-state football pages and the three out-of-state roundups, fetched 2026-11-09 (hub:
https://www.highschoolot.com/story/recruiting-tracker-see-where-nc-s-high-school-athletes-are-committed-to-play/21296096/).
Gaston Day hits:
- Volleyball: Megan Brown (Class of 2024, Division I, Wofford); Anne Bradley Bing (Class of
  2025, Division I, South Carolina).
- Girls tennis: Alexis Ibsen, spelled "Isben" (Class of 2024, Division III, Emerson).

There are no Gaston Day hits in the baseball, basketball, soccer, softball, swimming, boys
tennis, golf, track/cross country, lacrosse or wrestling trackers.

**RealGM (Chrome; text extraction is blocked, so the table was read by screenshot, sorted by
HS Grad).** Window rows: Braylen Todd (2026, Johnson & Wales (NC)), Rilpuou Makoi (2025,
Newberry), Makoi Mabor Marier (2024, Mercer). Earlier rows (2023 and before: Fayed →
Roanoke, Montanari → Embry-Riddle, Richard → USC Aiken, Britt → Augusta) are outside the
window.

**FieldLevel baseball alumni (Chrome).** The latest commitments it lists are Class of 2023
(UNC Charlotte) and Class of 2021 (Belmont), both outside the window. There are no Class of
2024–2026 entries.

**LaxNumbers.** There is no Gaston Day team page. The only Gastonia listing is the Gaston
County Lacrosse Club, which is a separate club, so lacrosse is a null and has no source.

**Grouped name searches** (baseball, boys soccer, girls soccer and tennis seniors by name;
swimming, golf and running signings; Gaston Gazette signing roundups; PrepVolleyball;
TopDrawerSoccer; SwimSwam / Swimming World). None returned a Gaston Day commitment in the
window. NCSA has self-reported recruiting profiles (for example, a Class of 2025 boys soccer
goalkeeper) that show no commitment.

## Confirmations
- Brown: Wofford signing release (2023-12-14), her bio and the current roster print "Gaston
  Day School".
- Bing: South Carolina bio prints "High school Gaston Day School"; she was a 2025 freshman.
- Todd: Johnson & Wales–Charlotte 2026-27 roster prints "Fr., Mount Holly, NC, Gaston Day".

## Ruled out
- **Makoi Mabor Marier.** He fails the graduate test: he was at Gaston Christian, and
  RealGM's school label is wrong.
- **Rilpuou Makoi.** He fails the graduate test: he is on no Gaston Day roster, and no
  second source exists.
- **Alexis Ibsen.** She passes the graduate test but is unverified: she is not on Emerson's
  2024-25 or 2025-26 roster, and only a single reader-submitted source names her.

## Nulls and unchecked, kept apart
- **Nulls (searched, nothing in the 2024–26 window):** baseball (9 seniors), boys soccer
  (18), girls soccer (16), girls basketball (4), boys tennis (1), girls tennis besides Ibsen
  (8), boys basketball besides Todd (6), volleyball besides Brown and Bing (6). Lacrosse:
  there is no team commitment page on any tracker.
- **Unchecked by roster** (no roster published on MaxPreps, so only the trackers and
  searches cover them): swimming, golf, cross country, track & field, wrestling, field
  hockey, softball, cheering. The Class of 2027 swimmer (Bree Smith → Stanford) shows that
  swimming produces commitments here, so a future pass should look for a swimming roster
  (NCISAA meet results, SwimCloud via search) for the 2024–26 graduates.

## Window check (2026-11-09)
The current senior class is 2027 and the most recently graduated class is 2026. The window
`…-2426` ends at 2026, so **no roll is due**.
