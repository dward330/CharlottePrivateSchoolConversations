---
name: unc-admissions-data
description: >
  Pull per-high-school × per-UNC-institution admissions outcomes (Applied, Admitted,
  Enrolled, Admit Rate, Yield Rate, Fall 2016–2025) from the NC university system's public
  Tableau dashboard, then persist them into source-material with their provenance. Use
  whenever a task needs third-party admit rates for a school we track — "how many of
  <school>'s graduates got into UNC-Chapel Hill", "get the UNC admit rates", "scrape the
  NC Insight dashboard", "admissions data for the College Support area" — or when
  /add-school or /plan is assessing College Support coverage and wants a government-
  published figure rather than the school's own marketing number. Also use it BEFORE
  concluding that a school's college-outcome data is "not published", since this dashboard
  covers every NC high school including the private ones. The dashboard is canvas-rendered
  and blocks every simple export path, so this skill carries the one verified method that
  works plus the traps that silently produce wrong tables.
---

# /unc-admissions-data — pull UNC-system admissions outcomes for a school

The NC university system publishes a Tableau dashboard giving, for **every NC high
school × every UNC-system institution**, the number of students who Applied, were
Admitted, and Enrolled — plus Admit Rate and Yield Rate — for **Fall 2016 through
Fall 2025**.

This is a **third-party, government-published** admit rate per school. It is not the
school's own marketing figure, which makes it unusually valuable for the College Support
research area.

**Dashboard**

```
https://insight.northcarolina.edu/t/Public/views/db_freshmen/AppliedAdmittedEnrolled?:embed=y&:isGuestRedirectFromVizportal=y
```

## Read the method before touching the dashboard

**[`reference/METHOD.md`](reference/METHOD.md) is required reading**, not an appendix.
It was derived empirically on 2026-08-19 by running every approach to failure, and it
records both the one path that works and the four that do not.

Do not improvise an approach. Every simple path is blocked server-side, and — this is
the important part — **the blocked paths return HTTP 200 and look like they are
working.** You will believe you have the data when you have the wrong sheet.

## Hard constraints

This skill may read anything, drive a browser, and write `source-material/`. It may not:

- **Change the app's UX.** Surfacing this data as a new card, Compare row, or metric key
  needs the user's explicit approval first (UX-design standard in `CLAUDE.md`). Land the
  data, then propose the UI with reasoning.
- **Publish a bare percentage from a small base.** See "Interpretation" below.
- **Deploy.** Never run `npm run deploy`.

## Steps

### 1. Confirm what is actually being asked

Two parameters, and guessing either wastes the whole run:

- **Which institutions?** The dashboard has 16. "Top 6 by US News" is **ambiguous and
  must be settled with the user** — US News ranks *National Universities* (UNC-Chapel
  Hill, NC State, UNC Charlotte, East Carolina, UNC Greensboro, UNC Wilmington all
  appear there), but **Appalachian State is ranked in *Regional Universities South***, a
  different list. Ask; do not pick silently, or the result cannot be reproduced.
- **Which terms?** All 10 (Fall 2016–2025), or the recent 3–5? A full sweep is
  meaningfully slower.

### 2. Read the method

Read [`reference/METHOD.md`](reference/METHOD.md) in full. Sections §1 (what does not
work) and §2 (the working method) are the ones that save time; §3 has the verified exact
filter strings.

### 3. Run the scrape

Follow §2 of the method: headful Chrome + CDP, real mouse events, clear-then-check-one
selection, screenshot to read values.

**Two traps produce plausible-but-wrong tables that render without any error:**

1. **Clicking a school directly UNCHECKS it**, giving you *statewide-minus-that-school*.
   Clear via `(All)` until the checked count is 0, then check the one school — and drive
   that loop on the **measured** count, because `(All)` cycles.
2. **Fuzzy name matching.** The list truncates at ~30 chars and holds decoys
   (`Covenant School` vs `Covenant Day School`). Our own **Carmel Christian School is
   listed as `Carmel Christian`**. Match exact strings from §3.2.

Smoke-test against the reference tables in §4 before trusting a run. If Cannon School
reproduces, the wiring is right.

### 4. Sanity-check the numbers before recording them

- Admitted ≤ Applied, and Enrolled ≤ Admitted, every term.
- Admit Rate ≈ Admitted / Applied to within rounding.
- A term that jumps implausibly usually means a filter did not apply — re-verify the
  panel text reads the school you intended.

### 5. Persist to source-material with provenance

Required by the data-provenance standard. Write to:

```
source-material/college-support/<school>/<School> - College Support - UNC System Admissions.md
```

Include a provenance header (who/when/how — cite this skill as the method), the
**dashboard URL**, the **exact filter values used** (institution string, school string,
term range, and the Recent-High-School-Graduate setting), and the **full per-term
counts** — not just the derived rate. A rate without its denominator is not
reconstructable.

Then run the `ingest-source-material` skill on a branch.

### 6. Report honestly

Give the user the table, the denominators, and anything suppressed or missing. A cell
the dashboard does not publish is **not found / not published** — never silently zero.

## Interpretation — matters more than the scraping

- **Carry the denominator.** Per-school-per-institution counts are small (Cannon →
  UNC-Chapel Hill was 44 applied in Fall 2016). An admit rate over 8 applicants is not
  comparable to one over 300. **Never publish a bare percentage from a single-digit
  base.** Same discipline as `/add-school`'s rule about printing counts beside a
  percentage.
- **This is not either institution's admit rate.** It is the rate at which *that
  university* admitted *that high school's* applicants — a joint property of the pair.
  Label it that way.
- **Small cells may be suppressed or rounded** by UNC. Treat a missing cell as a
  confirmed `null` only if the dashboard genuinely shows nothing; otherwise it is
  not-found, and the repo treats those differently.

## When NOT to use this

- For a school outside North Carolina — the dashboard is NC high schools only.
- For non-UNC-system destinations (Duke, Wake Forest, out-of-state). It covers the 16
  public UNC campuses and nothing else.
- To replace a school's own matriculation list. This is a complement to the school
  profile, not a substitute — it says nothing about private or out-of-state outcomes.

## Relationship to other skills

- **`/add-school`** — step 3's College Support row points here. Useful there in a
  specific way: it can convert a *not-found* into a **confirmed `null`**, which is what
  a deep pass is supposed to produce.
- **`/plan`** — a plan needing this data should cite this skill rather than re-deriving
  the method, and should settle the institution-list question at planning time.
- **`ingest-source-material`** — runs after step 5 to fold the new file into the notes
  and manifest.
