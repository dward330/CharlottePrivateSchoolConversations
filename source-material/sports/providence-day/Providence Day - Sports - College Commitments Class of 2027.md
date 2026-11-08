# Providence Day — Sports — College Commitments, Class of 2027 (current seniors)

> **Provenance:** Seeded by Claude Code on 2026-11-08 while planning `seniorsrow` (the
> *Current seniors committed* Compare row). This is the **per-class retention file** the
> `/athlete-commits` skill keeps for the current senior class: every public commitment, verbal
> or signed, any level, with sources. It is the value of the `seniors-committed` Compare row
> and the data promoted into the 2024–26 window file when the window rolls after graduation
> (from 1 June 2027). **Never delete it.**
>
> **Status (2026-11-08, `/implement seniorsrow`): 10 confirmed, 2 leads.** Football from
> the NC Football News tracker and 247Sports (Abanquah confirmed by Prism News); swimming
> from the Charlotte Observer preview and SwimSwam. The school's own fall signing post and
> its "Alumni at the Next Level" roster were not yet updated for this class; LaxNumbers,
> PrepVolleyball, Team 91 / Ultimate Lacrosse, Prep Baseball Report and the Observer girls
> basketball preview list no Providence Day 2027 commitment. Re-run after 2026-11-11.
>
> **Update (2026-11-08, `/athlete-commits` graduate refresh, before the mid-November
> signing wave): still 10 confirmed, now 3 leads.** The refresh read LaxNumbers (both PD
> team pages, 2024-2027 classes), RealGM, every HighSchoolOT tracker and the NC Football
> News 2027 tracker again. One new lead: **Charlie Thompson -> Christopher Newport** (see
> Lacrosse below). No other 2027 commitment surfaced. The value stays `'10'`; re-run after
> 2026-11-11 and again in February.
>
> Verbal commitments are listed, never counted in `p4-commits-2426` / `d1-commits-2426`.

## Sources
- NC Football News — 2027 North Carolina commitment tracker (last updated 2026-11-03):
  https://ncfootballnews.com/2027-north-carolina-high-school-football-college-commits/
- 247Sports — 2027 North Carolina football rankings (68 players, single page; eight
  Providence Day players, each with the committed college shown):
  https://247sports.com/season/2027-football/recruitrankings/?InstitutionGroup=HighSchool&State=NC
- The card's existing recruiting prose cites NC Football News' 2027 consensus rankings:
  https://ncfootballnews.com/north-carolina-2027-football-recruiting-consensus-rankings-may-2026-update/

## Football — 9 public verbals (6 Power 4, 3 other Division I)
| Athlete | Pos | College | Conf. | Level | Verbal date | Confirmed by |
|---|---|---|---|---|---|---|
| Robert Geathers III | SAF | Florida | SEC | **P4** | 6/18/2026 | NCFN tracker; 247 (rating 88, NC No. 24) |
| Griff Galloway | DL | Kentucky | SEC | **P4** | 5/22/2026 | NCFN; 247 (88, NC No. 19) |
| Brennan Drummond | SAF | Nebraska | Big Ten | **P4** | 6/21/2026 | NCFN; 247 (87, NC No. 30) |
| Caleb Cooper | SAF / ATH | Penn State | Big Ten | **P4** | 6/8/2026 | NCFN; 247 (87, NC No. 31) |
| Moses Poku-Kankam | SAF | Rutgers | Big Ten | **P4** | 4/28/2026 | NCFN; 247 (86, NC No. 47) |
| Steele Fletcher | WR | Wake Forest | ACC | **P4** | 2/12/2026 | NCFN; 247 (85, NC No. 50) |
| Ethan Dempsey | WR | Charlotte | American | D1 | 6/26/2026 | NCFN; 247 (86, NC No. 49) |
| Cooper Hodson | IOL | Delaware | CAA | D1 | 6/22/2026 | NCFN; 247 (83, NC No. 58) |
| Justin Abanquah | ILB | Elon | Southern | D1 | 6/23/2026 | NCFN; Prism News "Elon adds Charlotte-area standouts to 2027 recruiting class" https://www.prismnews.com/sports/fcs-football/elon-adds-charlotte-area-standouts-to-2027-recruiting-class |

`rank247` for the card: read each player's 247 page in a browser before typing a Composite
rank; the figures above are the 247Sports-only state ranks from the rankings table.

## Swimming — 1 confirmed, 2 leads
| Athlete | College | Conf. | Level | Confirmed by |
|---|---|---|---|---|
| Maddy Boland (Sr., 50/100 free) | North Carolina | ACC | **P4** | Charlotte Observer swimming preview 2026-11-03 ("UNC commit"); SwimSwam "UNC Adds Summer Juniors Qualifier and NAG Record Holder Maddy Boland For 2027" https://swimswam.com/unc-adds-summer-juniors-qualifier-and-nag-record-holder-maddy-boland-for-2027/ |

Leads: **Georgia Howard** → Dartmouth (Ivy, D1) — SwimSwam only ("rising senior at
Providence Day", https://swimswam.com/?p=1024710); **Dean Hamid** (Sr., 50/100 free) → Davidson
(Atlantic 10, D1) — Observer preview only. Zona Smith (Florida) and Annie Shall (UNC) are
juniors (Class of 2028).

## Lacrosse — 0 confirmed, 1 lead
| Athlete | College | Conf. | Level | Status |
|---|---|---|---|---|
| Charlie Thompson (Sr.) | Christopher Newport | C2C | D3 | **Lead** — LaxNumbers girls team page only (`laxnumbers.com/team_info.php?y=2027&t=22584&s=2`, read in Chrome 2026-11-08). Class year confirmed: MaxPreps lists her as a 2026-27 senior on PD's field hockey roster (`maxpreps.com/nc/charlotte/providence-day-chargers/field-hockey/26-27/roster/`). LaxNumbers files her as a lacrosse commit; CNU fields both women's lacrosse and field hockey, so the sport is also unconfirmed. Needs a club post, a school signing post or CNU's 2027-28 roster. |

LaxNumbers' boys page also lists one Class-of-2028 verbal (a junior; not a 2027 row, not
named here).

## Other sports — none found
Basketball (247's 2027 NC page lists no Providence Day player; RealGM team 10851 read in
Chrome 2026-11-08: no 2027 player with a college), baseball (Prep Baseball Report: Chase
Biermann uncommitted), soccer (TopDrawerSoccer), volleyball (PrepVolleyball has no Providence
Day page), field hockey (MAX Field Hockey 2027 list: no PD), every HighSchoolOT per-sport
tracker: no Providence Day 2027 commitment found.

## Totals for the `seniors-committed` row (as of 2026-11-08)
**10 confirmed** (value `'10'`): 7 Power 4, 3 other Division I. Three leads pending
(Howard, Hamid, Thompson).
