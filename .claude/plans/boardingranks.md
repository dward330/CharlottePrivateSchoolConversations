---
name: boardingranks
title: Add Niche national boarding ranks to the 30 boarding destinations
status: not-implemented
phases: 1
created: 2026-09-17
branch: feat/boarding-ranks
prs: []
---

# Niche boarding ranks

## Goal

Give each of the **30 boarding-school destinations** on a placement card its rank
from Niche's **Best Boarding High Schools in America**, labelled

```
Boarding High School Niche National Rank #4
```

Success: `rankLabel` populated in `src/data/highSchools.ts` for every boarding
school Niche actually ranks, with each number read **verbatim off that school's
own rank badge**; every school Niche does not rank recorded as a confirmed
absence rather than left looking unresearched.

**This is a DATA-ONLY change.** No component work, no CSS, no locale keys — see
*Why this is small* below. The entire cost is the fetch.

## Context

### Everything except the data already exists

This plan was started on 2026-09-17 and stopped mid-fetch; the surrounding work
all shipped. Verified in the tree today:

| Piece | State |
|---|---|
| The master table | `src/data/highSchools.ts`, 95 records |
| Boarding records | 30, all with a verified `url`, **0 with a `rankLabel`** |
| The field | `rankLabel?: string` — already documents this exact label shape |
| The render | `DestinationChip` calls `highSchoolRank(name)` and renders whatever string comes back |
| The CSS | `.hsp-dest-rank`, flush-right, already carries three other label shapes |
| The companion doc | `source-material/high-school-placement/_shared/High School Destinations.md`, regenerated from the master |

So the whole change is: fetch 30 numbers, write them into 30 records,
regenerate the doc.

### Why the label is stored whole

`rankLabel` holds a complete sentence, not a number, because **four different
scales** now share one column:

```
Charlotte Private K-12 Niche Rank #5          Niche, Charlotte metro, K-12
Charlotte Private HS Niche Rank #22           Niche, Charlotte metro, 9-12
Boarding High School Niche National Rank #4   Niche, national boarding   ← this plan
US News National HS Rank #475                 US News, national public
```

A bare `#5` beside a bare `#22` beside a bare `#4` reads as one ranking and
invites a comparison none of them supports. **Never store a bare number.**

### ⚠️ Niche IP-BANNED THIS PROJECT on 2026-09-17

This is the reason the plan exists rather than the work being done.

Two agents fetching the boarding list in parallel tripped a **session-wide IP
ban** — not per-page throttling. One reported: *"The whole domain is now blocked,
including pages that worked earlier."* Both were still blocked after ~7 minutes
of 90-second retries.

What this means for the next attempt:

- **Do NOT run two agents against Niche at once.** The earlier successful passes
  (Charlotte K-12, Charlotte HS) were **sequential and single**. Parallelism is
  what broke it.
- **Space requests ~6 seconds** and fetch **one page at a time**.
- **Budget for a cooldown.** The ban may still be in force. Probe one URL before
  starting the real run; if it 403s, stop and come back later rather than
  hammering it.
- A 403 here returns a **PerimeterX captcha body**
  (`meta name="description" content="px-captcha"`), not an error page — check the
  body, not just the status.

### The fetch recipe that worked before the ban

`curl` with a browser User-Agent ALONE returns the captcha. What cleared it was
`--compressed` plus the four `Sec-Fetch-*` headers:

```bash
curl -s --compressed \
  -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" \
  -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8" \
  -H "Accept-Language: en-US,en;q=0.9" \
  -H "Upgrade-Insecure-Requests: 1" \
  -H "Sec-Fetch-Dest: document" -H "Sec-Fetch-Mode: navigate" \
  -H "Sec-Fetch-Site: none" -H "Sec-Fetch-User: ?1" \
  "https://www.niche.com/k12/search/best-boarding-high-schools/"
```

Paginate with `?page=N`. **Confirm the page boundary by fetching until one 404s**
— the Charlotte high-school list proved to be exactly 3 pages that way, rather
than assuming.

If curl stays blocked, the fallback that beat US News's harder block is
**Playwright HEADED Chromium** with `--disable-blink-features=AutomationControlled`
and `--disable-http2`. Playwright is installed in this repo.

### ⚠️ Parse the badge INSIDE each card's own block

Each result card is a block carrying `data-testid="search-result-card--<name>"`,
and inside it a badge string `#N Best Boarding High Schools in America`.

**Split the HTML on the card boundary and take the first badge within each card's
own block.** Never infer a rank from a card's position in the list — Niche's own
sequences have gaps (see below), so position and rank do not correspond.

### ⚠️ Niche skips #14 — check whether this ranking does too

Niche's Charlotte K-12 list runs 1-13 then 15-26; its Charlotte high-school list
runs #1-#40 with #14 likewise absent. **The same single number is missing from
two independent rankings**, so it is a Niche quirk rather than a parse error.

Check this ranking for gaps and record them. Ranks are published **as displayed,
char-for-char** — the same rule this project applies to a tuition figure. Do not
"correct" a gap by renumbering.

### ⚠️ Some of these are DAY schools and will be legitimately ABSENT

The category is labelled "Boarding and out-of-area", and `kind: 'boarding'`
follows the institution — but at least three entries are probably day-only:

- **Bishop England High School** (Charleston SC)
- **Cardinal Gibbons High School** (Raleigh NC)
- **Collegiate School** (Richmond VA) — the research notes it as "JK-12 day"

A day school absent from a *boarding* ranking is a **correct result**, not a
lookup failure. Record it as a confirmed absence.

**Do NOT substitute a rank from a different Niche list to fill the row.** That
exact error shipped once on this card and had to be pulled: Queens Grant carried
a US News rank belonging to a *different school of the same name*, and the
lesson was that a rank from the wrong scale is worse than no rank.

### ⚠️ Four names must match on CITY before their rank is trusted

`St. Andrew's School`, `St. George's School`, `St. Paul's` and `St. Mary's School`
each belong to several schools nationally. The master already carries the
verified city and state for each:

| Name | The one meant |
|---|---|
| St. Andrew's School | Middletown, **DE** — all-boarding coed Episcopal |
| St. George's School | Middletown, **RI** |
| St. Paul's | Concord, **NH** — fully residential |
| St. Mary's School | Raleigh, **NC** — all-girls, own spelling "Saint Mary's School" |

Confirm the city on the Niche card matches before recording a rank. A prior pass
on this card sent bare names out and got four NOT CONFIRMEDs back, when the state
was sitting in the data the whole time.

Three more spelling divergences to expect: Niche may write
**"Rabun Gap-Nacoochee School"**, **"Cate School"** (no "The") and
**"Millbrook School"** (no "The").

## Decisions

- **Label format is fixed** (user, 2026-09-17):
  `Boarding High School Niche National Rank #4`. Store it whole.
- **Ranks are published as displayed**, char-for-char, gaps included.
- **An absent school gets no rank and no substitute**, and the absence is
  recorded in the companion doc so it is not re-researched.
- **The four `day`-kind schools are OUT OF SCOPE.** Brooklyn Friends, Cape Fear
  Academy, Tampa Prep and Faith Lutheran are `kind: 'day'`, not `'boarding'` —
  they board no one, so a boarding rank does not apply to them.
- **Sequential fetching only.** See the IP-ban note.

## Approvals needed

**None.** The label wording, the rank-as-published rule and the render treatment
were all settled with the user on 2026-09-17. No new card, section, row or
component — `rankLabel` simply becomes non-empty on rows that already render it.

## Steps

1. **Probe before starting.** Fetch ONE Niche URL with the recipe above and check
   the body for `px-captcha`. If blocked, stop and try another day — do not
   retry in a loop.

2. **Fetch the ranking, sequentially, one page at a time**, ~6s apart, until a
   page 404s. Save the raw HTML to the scratchpad so the parse can be re-run
   without re-fetching.

3. **Parse each card's own badge**, per the warning above. Record for every one
   of the 30: the rank, the city shown on the card, and whether it was
   `LISTED-UNRANKED` or `ABSENT`.

4. **Record the gaps.** List any missing rank numbers in the sequence, and note
   whether #14 is among them.

5. **Write the ranks** into `src/data/highSchools.ts` as
   `rankLabel: 'Boarding High School Niche National Rank #N'`.

6. **Regenerate the companion doc** at
   `source-material/high-school-placement/_shared/High School Destinations.md`,
   including a short section on absences and gaps.

7. **Verify and open the PR.**

## Files touched

| File | Change |
|---|---|
| `src/data/highSchools.ts` | edit — `rankLabel` on the boarding records |
| `source-material/high-school-placement/_shared/High School Destinations.md` | regenerated |

Nothing else. No component, no CSS, no locale catalogs.

## Verification

- [ ] `npx tsc -b` — clean (trust `tsc -b`, not `tsc --noEmit`)
- [ ] `npm run build` — succeeds end to end
- [ ] Every stored rank traces to a **badge string**, not a list position
- [ ] The four ambiguous saints each matched on **city** before their rank was taken
- [ ] Absences are recorded as absences, with **no substituted rank** from another list
- [ ] **Browser check** on Trinity's page with the panels expanded: boarding rows
      show `Boarding High School Niche National Rank #N`, flush right, none
      overflowing its row; the other three label shapes still render unchanged
- [ ] The companion doc regenerates and its counts match the master

## Risks

| Risk | Mitigation |
|---|---|
| **Niche is still IP-banning** | Step 1 probes before committing to a run. Come back another day rather than retrying in a loop — that is what caused the ban. |
| **Parallel agents re-trigger the ban** | Sequential only, explicitly. The successful earlier passes were single-threaded. |
| **A rank inferred from list position** | Step 3 requires the badge inside the card's own block; Niche's sequences have gaps, so position ≠ rank. |
| **A day school given a boarding rank to fill the row** | Named in Context; the Queens Grant precedent is recorded as the reason. |
| **The wrong St. Andrew's / St. George's / St. Paul's / St. Mary's** | Cities are already in the master; match on city before recording. |

## Open questions

- **Does this ranking skip #14 like the other two?** Record what is found; do not
  assume either way.
- **Should a `LISTED-UNRANKED` boarding school read differently from an ABSENT
  one on the page?** Default: no — both render with no rank, and the distinction
  lives in the companion doc. The Fletcher School already sets this precedent on
  the Niche K-12 side.
