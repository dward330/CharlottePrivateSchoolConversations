# Davidson Day School — After School Redesign Research (2026)

Provenance header
- Compiled: July 27, 2026, for the After School research-area redesign (four cards:
  Coverage Map, Cost Planner, A Day Inside + Enrichment, Verdict & Visit Checklist).
- Method: deep web research against the live site (site map, back-to-school pages, all
  17 back-to-school PDFs, the tuition page), plus Wayback Machine captures retrieved via
  the raw `id_` endpoints and the CDX API.
- The existing `Davidson Day - After School - Pricing.md` finding — that Davidson Day
  publishes no extended-care pricing — is CONFIRMED and strengthened. The Extended Care
  and After School Programs pages have been removed from the live site entirely, not
  merely broken.
- This pass recovered materially more than the previous one: live 2026-27 dismissal times
  for all four divisions, a live after-school-care FAQ, the full archived program
  self-description, and the 2026-27 half-day calendar.

CORRECTION TO THE EXISTING PRICING FILE
That file records hours and grades from "formerly indexed content." The actual source is
an archived Extended Care page captured **May 18, 2020 — six years stale**. More
importantly, the archived "2:45–6:00 p.m. for TT-8" window no longer matches the current
bell schedule: 2:45 pm is now only the Early Preschool–JK dismissal. K–4 dismisses at
3:05 and grades 5–8 at 3:25. The old line is therefore internally inconsistent with the
2026-27 schedule and must be treated as stale rather than current.

## Card — The Coverage Map

Dismissal times, 2026-27 — VERIFIED live on the back-to-school site:

| Division | Earliest drop-off | Start | Dismissal |
| --- | --- | --- | --- |
| Early Preschool – Junior Kindergarten | 8:10 am | 8:30 am | 2:45 pm |
| Kindergarten – 4th Grade | 7:55 am | 8:15 am | 3:05 pm |
| 5th – 8th Grade | 7:40 am | 8:00 am | 3:25 pm |
| 9th – 12th Grade | 7:40 am | 8:15 am | 3:20 pm |

After-school care exists in 2026-27 — VERIFIED live, from the FAQ. Exact quote: "How do I
sign up for after-school care?" → "After-school care sign-ups will be released in
mid-July." This confirms the older file's "released mid-July" note against a live
2026-27 page.

ARCHIVED / STALE — captured May 18, 2020, treat as unverified for 2026-27:
- Program names: Before School Care and After School Care, under an "Extended Care"
  umbrella.
- Before School Care: 7:15–7:40 am, TT–8th grade, staffed by full-time Davidson Day
  teachers (additionally compensated), ratio 7:1.
- After School Care: 2:45–6:00 pm, TT–8th grade, ratio approximately 15:1.

Notes & gaps
- Upper School (grades 9–12) is excluded from both Before and After School Care —
  TT–8 only, per the 2020 archive.
- Summer program: NOT PUBLISHED on the live site. No summer camp page exists in the live
  site map. An archived 2019 page documents a Summer Camp with half-day sessions
  (9 am–12 pm / 1–4 pm), outside providers (Bricks 4 Kidz, Mad Science, Techsplorers,
  Michelle in the Middle) and "before and after camp childcare" — all seven years stale.
  A third-party aggregator lists Camp Patriots / Jr. Patriots and other programs for ages
  3–14, but this is not confirmed on any school-owned page and carries no dates or prices.
- Half-day / holiday coverage: whether extended care runs on these dates is NOT
  PUBLISHED. The 2026-27 calendar does confirm the days that would need it — half-days
  Dec 18 2026, Apr 15 2027, May 26 2027; conference no-school days Sep 14–18 2026,
  Jan 4 2027, Apr 16 2027.

## Card — The Cost Planner

NOT PUBLISHED, comprehensively. The live site map (every current URL), all 17
back-to-school PDFs, the tuition page and four Wayback captures were checked. No rate
appears anywhere.

- Registration fee — NOT PUBLISHED
- Daily / weekly / hourly rate — NOT PUBLISHED
- Drop-in rate — NOT PUBLISHED
- Late-pickup fee — NOT PUBLISHED
- Billing method — NOT PUBLISHED

Even the archived 2020 Extended Care page contains no pricing, so this is a long-standing
policy rather than a recent page break.

VERIFIED exact quote from the tuition page, confirmed verbatim in live HTML: "Financial
Aid does not cover extended care, arts/music supplies or instruments, or athletic
equipment/team packs."

Context: 2026-27 tuition $22,590 (Early Childhood) / $25,010 (Lower School) / $26,320
(Middle School) / $26,910 (Upper School). Fees listed are Refund Plan 2.8%, Yearbook $75,
Technology $500, Field Experience $500–1,000, Textbooks $300–1,000 — extended care is
absent from the fee table entirely. Also relevant: maximum financial aid still requires
families to pay $3,000/year per student.

Because no rate of any kind is published, the Cost Planner card is OMITTED for Davidson
Day in the app rather than rendered empty.

## Card — A Day Inside + Enrichment

Daily schedule / rhythm — NOT PUBLISHED.

The school's own words, from the 2020 archive (stale, flagged as such):
- After School Care offers "a safe, engaging, and nurturing environment for supervised
  play and homework completion."
- Before School Care is "a safe, engaging, and nurturing environment for supervised play."
- Students are "subdivided into age- and attendance-appropriate groups as determined by
  Extended Care staff" and "must be signed out… by a parent or other authorized persons
  as listed on the Extended Care Application."

A notably candid admission, also archived: the roughly 15:1 after-school ratio is
described by the school as "significantly higher than comparable Davidson Day classroom
student-to-staff ratios," though it "complies with State of North Carolina standards."

Enrichment — NOT PUBLISHED. The archived After School Programs page said Davidson Day
"contracts with both internal and external providers… Programs are offered daily between
2:45-6 p.m., and fees vary by program. Sample offerings include:" — and the "sample
offerings" trace in raw HTML to three photo blocks with empty captions. No class names,
days, grade ranges or fees are recoverable. Zero real enrichment offerings can be named,
and none were invented.

The only adjacent published program is the Learning Enrichment Center, but it is
fee-unstated tutoring/OT/speech and is explicitly scheduled "during the school day, often
during a study hall period" so that students can still do after-school activities. It is
not after-school care and should not be presented as such.

## Card — Verdict & Visit Checklist

Strengths
- A long-running program with a real operating history.
- Before School Care staffed by actual full-time Davidson Day teachers at a 7:1 ratio —
  unusually good for before-care, if it still holds.
- A 6:00 pm close is competitive with peers.
- Care spans Traditional Toddler through 8th grade, including the toddler end that many
  peers do not cover.
- The school is transparent that financial aid does not cover extended care, stating it
  plainly on the tuition page rather than burying it.

Watch-outs
- Total pricing opacity. A family cannot budget this program before enrolling, and
  because it is excluded from financial aid it is a pure out-of-pocket add-on on top of
  $22,590–$26,910 tuition.
- The Extended Care and After School Programs pages have been removed from the live site
  entirely, so a 2026-27 family has no published description of the program at all.
- The roughly 15:1 after-care ratio is self-acknowledged as well above classroom norms.
- Mid-July sign-up release is late for families planning childcare.
- No Upper School coverage.
- Staggered dismissals (2:45 / 3:05 / 3:20 / 3:25) give multi-child families a 40-minute
  spread.

Visit checklist
- What are the actual 2026-27 rates and structure — annual contract, or drop-in?
- Does the 2:45–6:00 window still hold now that K–4 dismisses at 3:05 and grades 5–8 at
  3:25, and are older students covered from their own dismissal?
- Is there a late-pickup fee, and what is it?
- Does care run on half-days (Dec 18, Apr 15, May 26) and on conference no-school days?
- Is Before School Care still offered at 7:15 am, and is it still teacher-staffed at 7:1?
- What is the current after-school staff-to-child ratio?
- What enrichment classes actually run this year, on what days, and at what fee?
- Does the summer camp still exist under the school, and is Camp Patriots a real
  school-run program?
- Why were the Extended Care pages removed, and where is the current program description?

## Sources & Where to Verify

Back-to-school site — LIVE, 2026-27 dismissal table + after-school-care FAQ: https://www.davidsonday.org/back-to-school-site
Tuition and affordability — LIVE, tuition/fees + the financial-aid exclusion quote: https://www.davidsonday.org/admission/tuition-and-affordability
Site map — LIVE, proves no extended-care or summer page exists: https://www.davidsonday.org/site-map
Learning Enrichment Center — LIVE, no fees published: https://www.davidsonday.org/academics/learning-enrichment-center
2026-27 academic calendar PDF (half-days, conference days) — LIVE: https://www.davidsonday.org/fs/resource-manager/view/83b9bf74-9d12-482d-a574-b6e7d38fdb04

Removed pages, re-verified 404 on July 27, 2026:
https://www.davidsonday.org/community/auxiliary-programs/extended-care
https://www.davidsonday.org/community/auxiliary-programs/after-school-programs

Archived captures — STALE, use only with the stale flag attached:
Extended Care, captured May 18, 2020: https://web.archive.org/web/20200518232512/https://www.davidsonday.org/community/auxiliary-programs/extended-care
After School Programs, captured May 17, 2020: https://web.archive.org/web/20200517235914/https://www.davidsonday.org/community/auxiliary-programs/after-school-programs
Summer Camp, captured Nov 18, 2019 — VERY stale: https://web.archive.org/web/20191118211658/https://www.davidsonday.org/community/auxiliary-programs/summer-camp

Third-party, unconfirmed against any school-owned page: https://kidvoyage.com/camps/usa/davidson-day-school
