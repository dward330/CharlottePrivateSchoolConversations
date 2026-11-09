# Covenant Day School — Sports — Varsity Roster Cross-Reference (2026)

> **Provenance:** Research record written by Claude Code on 2026-11-09 during
> `/athlete-commits covenant-day`. It documents *how* the College Pipeline roster was
> re-checked and *what was searched and found empty*, so a later pass does not redo the
> work. The athlete-level results live in `Covenant Day School - Sports - College
> Commitments 2024-2026.md`; this file is the method and the nulls. It is provenance for
> the pipeline card, not a card of its own (`src/lib/metrics.ts` folds it onto the research
> dossier via `/roster cross-reference/i`).
>
> **Names policy:** only athletes with a documented college commitment, and the leads ruled
> out, are named here. Current students without a commitment are recorded as counts.

## Result in one line

33 → **35** committed, 9 → **10** Division I, Power 4 unchanged at **1**. Two new athletes
(Elijah Green ’24, William Peace; Jakota Hase ’25, Wisconsin Lutheran), two rows changed to
the college actually enrolled at (Grant Gardner ’25 Davidson → App State; Chris Rivens ’25
Guilford basketball → Charlotte football, D3 → D1), two HighSchoolOT leads ruled out
(Molly Carlson, Chloe Hylton). The Class of 2024 turned out to be **complete** as the school
published it — the old "4 of 6 recoverable" caveat misread the spring 2024 article.

## Scope

Every varsity sport the school fields. The 2026–27 High School Profile lists baseball,
basketball, cheerleading, cross country, field hockey, football, golf, soccer, tennis,
softball, swimming, track & field and volleyball; boys volleyball is a club sport and
lacrosse is a combined program with other schools (see `Covenant Day School - Sports -
Sports Offered.md`).

Depth by tier:
- **Full per-name cross-reference** (rosters + commitment database + college roster):
  football, boys and girls basketball, baseball, boys and girls soccer, volleyball, softball,
  field hockey, boys and girls tennis, boys volleyball.
- **School alumni list + grouped searches + college roster check:** cross country, track &
  field, swimming, golf.
- **Unchecked beyond the school's own signing posts:** lacrosse (combined program — no
  MaxPreps roster, LaxNumbers team page not found), cheerleading (no team page, no list).

## Step 1 — the school's own pages (read 2026-11-09)

**Lions News** (`https://www.covenantday.org/athletics/lionsnews`) — server-rendered
Finalsite board; curl works. Six signing posts cover 2024–26 (listed in the commitments
file). No Class of 2027 signing post is up: the NCAA early signing period opens 2026-11-11.

**Team pages** — `https://www.covenantday.org/athletics/teams/<season>-sports/<slug>`,
server-rendered, each with a **"Lions Beyond CDS"** tab: the school's own list of alumni
playing in college, by name, class and college. This is the strongest source the school
publishes and it was not used by the August 2026 pass. Slugs that answer:
`fall-sports/varsityfootball`, `varsityfieldhockey`, `varsityvolleyball`, `varsityboyssoccer`,
`varsitygirlstennis`, `varsitycrosscountry`, `varsitygirlsgolf` (empty: "The selected team
was not found"); `winter-sports/varsityboysbasketball`, `varsitygirlsbasketball`,
`varsityswimming`; `spring-sports/varsitybaseball`, `varsitysoftball`, `varsitygirlsoccer`
(no "s"), `varsityboystennis`, `varsitytrackandfield`, `varsityboysgolf` (no list). No page
for lacrosse, boys volleyball or cheer under any guessed slug. The `/athletics/teams` index
is JS-rendered and lists nothing to curl or to page text.

What the alumni lists added: **Jakota Hase ’25** (football → Wisconsin Lutheran), **Chris
Rivens ’25** under football → UNC Charlotte, **Grant Gardner ’25** under baseball →
Appalachian State. Every other 2024–26 name on them is already on the card. Swimming's
list ends at ’21; golf and cheer publish none.

## Step 2 — MaxPreps rosters by season

`https://www.maxpreps.com/nc/matthews/covenant-day-lions/<sport>/<yy-yy>/roster/` (city is
**matthews**; `/nc/charlotte/…` 404s) — HTTP 200 with a browser UA, path form, 23 sport
slugs × 4 seasons (23-24 → 26-27) = 88 pages pulled.

Rosters with data: football, boys and girls basketball, baseball, boys soccer, girls soccer
(`soccer/girls/spring`), softball, field hockey, volleyball, boys volleyball, boys and girls
tennis. **Empty in every season (unchecked on MaxPreps):** cross country (both),
track-field (both), swimming (both), golf (both), lacrosse (both). Baseball 23-24 and 24-25
carry no grade column ("-"), so baseball's Class of 2024 and 2025 seniors were taken from
the school's posts and alumni list instead. Spring 26-27 rosters are not posted yet.

Seniors found (`Sr.`) by class: **2024** — 45 across 8 sports (football 15, field hockey 8,
boys soccer 8, basketball 7, volleyball 5, boys volleyball 5, girls soccer 2, …);
**2025** — 42; **2026** — 53; **2027** (26-27 seniors + 25-26 juniors) — 47. MaxPreps
prints two players as seniors in both 23-24 and 24-25 (data-entry error; neither is a
commit).

## Step 3 — cross-reference

**HighSchoolOT trackers** — all 18 per-sport trackers plus the three "Building the Fence"
in-state football pages and three out-of-state roundups (hub:
https://www.highschoolot.com/story/recruiting-tracker-see-where-nc-s-high-school-athletes-are-committed-to-play/21296096/).
Covenant Day hits: Grant Gardner (baseball, Davidson), Michael Marcus Jr. (boys
basketball), Avery Houseton (softball) — all already on the card — and two girls soccer
leads, both ruled out (below). No Class of 2027 entry.

**RealGM** (Chrome; `https://basketball.realgm.com/highschool/teams/12805/Covenant-Day-School-NC`)
— 11 graduates. In window: Elijah Green (2024, William Peace — **new**), Michael Marcus Jr.
(2024, now George Mason), Ty White (2025, Hampden-Sydney), Luke Thompson (2026, Macalester).
Out of window: Brewer ’15, Brown ’23, Hailey ’20, King ’19, Melton ’14, Ufochukwu ’22,
Ward ’21.

**NC Football News** — 2025 general / in-state / out-of-state trackers, 2026 and 2027
trackers: no Covenant Day entry. Hase (D3, Wisconsin) and Rivens (walk-on-shaped, Charlotte)
are the kind of commit these trackers miss.

**TopDrawerSoccer** — Covenant Day girls team page lists one player (Chloe Hylton, 2025,
no commitment).

**Prep Baseball Report** (search) — Gardner (Davidson), Kincheloe (Hampden-Sydney), Dixon
(Asbury); no other Covenant commit; 2027 profiles list no commitment.

**College rosters checked** (graduate test): Louisville, App State (basketball 2024-25;
baseball 2026 and current), George Mason (release), William Peace, Queens, Gardner-Webb,
Wofford, Charlotte (football 2025, softball), Wisconsin Lutheran, Louisiana Tech, East
Carolina, Guilford (2025-26 and current — Rivens absent), Virginia women's soccer,
NC State women's soccer 2025 and 2026 (Chrome).

## Ruled out

| Lead | Source | Why |
|---|---|---|
| Molly Carlson — Virginia (Class of 2025, girls soccer) | HighSchoolOT girls soccer tracker | Virginia lists her from Charlottesville, Va., HS Liberty University Online Academy — fails the graduate test; likely a mislabel of Charlottesville's Covenant School |
| Chloe Hylton — NC State (Class of 2025, girls soccer; tracker prints "B. Hylton") | HighSchoolOT girls soccer tracker | Not on NC State's 2025 or 2026 roster; TopDrawerSoccer lists no commitment; absent from the school's posts and alumni list. Single reader-submitted source |

## Nulls (searched, nothing found)

- **Football**, Classes of 2024 (15 seniors) and 2025 (14): grouped name searches and the
  NC Football News trackers — nothing beyond Dennison, Hase and Rivens.
- **Boys basketball** 2024–26: RealGM's full list — nothing beyond the card + Green.
- **Girls basketball** 2024–26 (2 + 5 seniors): the school's alumni list ends at ’22;
  HighSchoolOT tracker — none.
- **Field hockey** 2024–26 (8 + 4 + 4 seniors): school alumni list — only Eaton in window.
- **Volleyball** 2024–26: school alumni list and PrepVolleyball search — only Shannon.
- **Boys volleyball** (club): only Macurda, from the school's Apr 2025 post.
- **Swimming** 2024–26: school alumni list (latest ’21), SwimSwam/Swimming World search —
  none.
- **Golf** 2024–26: no alumni list; Junior Golf Scoreboard / AJGA search — none.
- **Tennis** 2024–26: school alumni lists — only Huitt.
- **Softball** 2024–26: school alumni list — Allen, Houseton only.

## Unchecked (could not be retrieved)

- **Lacrosse** — combined program; no MaxPreps roster in any season; LaxNumbers team page
  not found in Chrome. DeCarlo (Berry) is on the card from the school's own post; any other
  lacrosse commit is unchecked, not null.
- **Cheerleading** — no team page or alumni list.
- **Cross country / track** rosters (MaxPreps empty) — covered instead by the school's own
  alumni lists, which match the card.

## Class of 2027 (current seniors)

47 seniors on the 26-27 and 25-26 rosters; no public commitment found in any source above,
and no signing post yet. Recorded in `Covenant Day - Sports - College Commitments Class of
2027.md`; **provisional — re-run after the 2026-11-11 early signing period**.
