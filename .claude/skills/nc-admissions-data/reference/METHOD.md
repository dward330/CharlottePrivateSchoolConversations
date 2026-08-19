# Method — scraping the UNC Insight Tableau dashboard

**Reference file for the `nc-admissions-data` skill.** [`../SKILL.md`](../SKILL.md) is
the entry point and holds the workflow, the provenance obligations and the
interpretation rules; this file is the mechanical how-to it defers to.

Every claim below was derived empirically on **2026-08-19** by running it — including
the things that **do not** work, which are recorded so nobody burns another hour
rediscovering them.

The mechanism is fiddly in specific ways that are invisible until you hit them, and the
blocked paths return HTTP 200 while giving you the wrong data. Read §1 and §2 before
touching the dashboard.

**Dashboard URL**

```
https://insight.northcarolina.edu/t/Public/views/db_freshmen/AppliedAdmittedEnrolled?:embed=y&:isGuestRedirectFromVizportal=y
```

**What it gives you**, per (high school × institution) combination, for **Fall 2016 –
Fall 2025** (10 terms): Applied, Admitted, Enrolled, Admit Rate (Admitted/Applied),
Yield Rate (Enrolled/Admitted).

This is genuinely valuable data for the College Support research area: it is a
*third-party, government-published* admit rate per school, not the school's own
marketing figure.

---

## 0. Verdict, in one line

**Feasible, but ONLY via headful Chrome driven over the DevTools Protocol (CDP).**
Every cheaper path is blocked server-side. Budget ~30–60s per filter combination.

---

## 1. What does NOT work — do not retry these

Each of these was attempted and failed; the failure mode is given so you can recognise
it if you see it again.

| Approach | Result |
|---|---|
| `.csv` / `.pdf` export URL suffixes | **403** for guest sessions |
| Row-level "view underlying data" | Server sends `allow_view_underlying: false` |
| Plain-curl VizQL API | `startSession` POST **works** (returns a real `sessionid`), `bootstrapSession` returns **200** — but always boots the **"Peer Comparison"** sheet, and `set-active-sheet` returns a generic **500 LogicException**. Dead end. |
| **Headless** Chrome (`--headless=new`) | **Two** separate failures: CloudFront serves `ERROR: The request could not be satisfied` to the `HeadlessChrome` UA; and even with a spoofed UA the viz **never renders a canvas** (0 canvases after 80s). |

> The curl path is seductive because `startSession` + `bootstrapSession` both return
> 200 and look like they are working. They are not — you get the wrong sheet and cannot
> navigate off it. Do not sink time here.

---

## 2. The method that works

### 2.1 Launch headful Chrome with CDP

**Headful is mandatory** — not a preference. A visible window is required.

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --remote-debugging-port=9222 --user-data-dir="$PWD/cprof" \
  --no-first-run --no-default-browser-check --window-size=1700,1000 \
  about:blank &
# poll until ready:
until curl -s http://127.0.0.1:9222/json/version >/dev/null 2>&1; do sleep 1; done
```

Note the headful UA reports plain `Chrome/151.0.0.0` (no "HeadlessChrome"), which is
what gets you past CloudFront. No UA override is needed in headful mode.

Open a tab with `PUT /json/new?<encoded-url>` — **`PUT`, not `GET`** (recent Chrome
rejects `GET` with "Using unsafe HTTP verb GET to invoke /json/new").

### 2.2 Wait for the viz to actually render

```js
// poll until canvas count > 0 (~6s), then sleep ~5s more for filter widgets
document.querySelectorAll('canvas').length > 0
```

Never assume a fixed sleep is enough; poll.

### 2.3 Find the filter panels

Filters are `.QuickFilterPanel`, identified by their `innerText`:

```js
[...document.querySelectorAll('.QuickFilterPanel')]
```

Observed panels, in DOM order:

| # | Panel |
|---|---|
| 0 | Institution |
| 1 | NC High School |
| 2 | NC High School District |
| 3 | Recent High School Graduate |
| 4 | Specific High School Type |
| 5 | General High School Type |

> **TRAP — the district filter.** Matching `/NC High School/` hits **both** panel 1 and
> panel 2. Always use the negative lookahead:
> ```js
> /NC High School(?!\s*District)/
> ```

### 2.4 Open a dropdown — real mouse events only

```js
panel.querySelector('.tabComboBoxButton')  // click this
```

> **TRAP — synthetic clicks are silently ignored.** `element.dispatchEvent(new MouseEvent('click'...))`
> does **nothing** here. You must use CDP `Input.dispatchMouseEvent`
> (`mouseMoved` → `mousePressed` → `mouseReleased`) at real viewport coordinates
> obtained from `getBoundingClientRect()`.
>
> This one cost the most time: the dropdown *visibly opened* on screen (the user
> confirmed watching it) while every DOM query returned 0 items — because the click
> that opened it came from an earlier run, and the menu items were under a class I
> was not querying.

### 2.5 Read the menu — it is NOT `.tabMenuItemName`

The open menu is a `div` with class `tile tab-ctrl-formatted-text` holding **>500
children** (1,108 entries for NC High School). Locate it structurally, not by class:

```js
const menu = [...document.querySelectorAll('div')].filter(x => x.children.length > 500)[0];
const items = [...menu.children].map(c => (c.innerText||'').trim()).filter(Boolean);
```

For the **Institution** menu the same trick works but the list is small (17 rows), so
filter on `children.length >= 5 && < 200` and match on a known value like `Chapel Hill`.

### 2.6 Selection protocol — clear, then check ONE

This is the part that must be driven by **observed state**, never by assumed polarity.

```
1. Open the menu.
2. Click "(All)" repeatedly until checked count === 0.
3. Click the single target school  ->  checked count === 1.
4. Verify: the panel's innerText ends with the school name
   e.g. "Filter | NC High School | Inclusive | Cannon School"
```

Checked count:

```js
[...menu.querySelectorAll('input[type=checkbox]')].filter(i => i.checked).length
```

> **TRAP — `(All)` cycles, and clicking a school directly UNCHECKS it.**
> Starting from all-checked, clicking "Cannon School" leaves **1,107 of 1,108** checked
> and gives you *statewide-minus-Cannon* — a plausible-looking table that is completely
> wrong. It renders without error, so nothing warns you.
> Observed cycle: `1106 → 1108 → 0`. Always loop on the **measured** count.
>
> The user stated this rule independently: *"first click all to uncheck everything and
> then proceed to just check the school you want."* That is exactly right.

### 2.7 Read the numbers — screenshot, not DOM

The table is **canvas-rendered**. `document.body.innerText` gives you the row labels
(`Applied`, `Admit Rate (Admitted/Applied)`, `Fall 2016`…) but **not a single value**.

Use `Page.captureScreenshot` and read the values from the image. Close the dropdown
first (click empty space) or it overlaps the table.

---

## 3. Filter domain values (verified 2026-08-19)

### 3.1 Institutions — all 16, exact strings

```
Appalachian State University          NC State University
East Carolina University              UNC Asheville
Elizabeth City State University       UNC-Chapel Hill
Fayetteville State University         UNC Charlotte
NC Agricultural and Technical State University
North Carolina Central University     UNC Greensboro
UNC Pembroke                          UNC Wilmington
UNC School of the Arts                Western Carolina University
Winston-Salem State University
```

Note the inconsistent house style — `UNC-Chapel Hill` is hyphenated, `UNC Charlotte`
is not. Copy these strings verbatim.

### 3.2 Our 11 tracked schools — all present, but match EXACTLY

All 11 schools we track exist in the 1,108-entry list. **Verified 11/11.**

| Our name (`schools.json`) | Exact string in Tableau |
|---|---|
| Cannon School | `Cannon School` |
| Carmel Christian School | **`Carmel Christian`** ← no "School" |
| Charlotte Catholic High School | `Charlotte Catholic High School` |
| Charlotte Christian School | `Charlotte Christian School` |
| Charlotte Country Day School | `Charlotte Country Day School` |
| Charlotte Latin School | `Charlotte Latin School` |
| Covenant Day School | `Covenant Day School` |
| Davidson Day School | `Davidson Day School` |
| Gaston Day School | `Gaston Day School` |
| Hickory Grove Christian School | `Hickory Grove Christian School` |
| Providence Day School | `Providence Day School` |

> **TRAP — decoys and truncation.** Names are truncated around ~30 chars
> (`Abundant Life Christian Academ`), and the list contains near-miss schools that a
> fuzzy match would silently select instead:
>
> | Want | Decoys also in the list |
> |---|---|
> | Covenant Day School | `Covenant School`, `Covenant Classical School` |
> | Providence Day School | `Providence High School`, `Providence Christian School`, `Providence Preparatory Academy` |
> | Hickory Grove Christian School | `Hickory Christian Academy`, `Hickory High`, `Hickory Ridge High` |
> | Davidson Day School | `Davidson County High School`, `Davidson Early College`, `Davidson River School` |
> | Gaston Day School | `Gaston Christian School Gastonia`, `Gaston Early College High School` |
>
> **Always match the exact string from the live list.** Never fuzzy-match, never
> assume our `schools.json` name is the Tableau name — for Carmel Christian it is not.

### 3.3 Side effects of selecting a private school

Selecting a private school changes other filters on its own:

- **NC High School District** flips to `Not Applicable`
- **General High School Type** unchecks `Public NC`

This is Tableau's relational filtering, not a bug. Don't "fix" it.

---

## 4. Verified reference data (use to smoke-test any future scraper)

**Cannon School, ALL institutions** (mechanism proof, captured 2026-08-19):

| | F16 | F17 | F18 | F19 | F20 | F21 | F22 | F23 | F24 | F25 |
|---|---|---|---|---|---|---|---|---|---|---|
| Applied | 137 | 150 | 158 | 179 | 145 | 202 | 201 | 202 | 161 | 217 |
| Admitted | 98 | 104 | 92 | 133 | 96 | 131 | 137 | 132 | 118 | 151 |
| Enrolled | 26 | 31 | 22 | 36 | 28 | 33 | 29 | 32 | 31 | 28 |
| Admit Rate | 71.5% | 69.3% | 58.2% | 74.3% | 66.2% | 64.9% | 68.2% | 65.3% | 73.3% | 69.6% |

**Cannon School × UNC-Chapel Hill** (from the user's own drill-down, confirms the
Institution filter narrows correctly): Fall 2016 = 44 applied, 26 admitted, 13 enrolled,
**59.1%** admit rate. Fall 2025 = 63 applied, 20 admitted, **31.7%**.

If a scraper reproduces those two tables, it is wired correctly.

**Statewide, all schools + all institutions** (sanity anchor): Fall 2025 = 367,775
applied / 219,772 admitted / 40,200 enrolled, 59.8% admit rate.

---

## 5. Interpretation cautions — matters more than the scraping

- **Small cells.** Per-school-per-institution counts are small (Cannon → UNC-CH was 44
  applied). An admit rate over 8 applicants is not comparable to one over 300. Always
  carry the **denominator** beside any rate, and never publish a bare percentage from a
  single-digit base. This is the same discipline as the `/add-school` rule about
  printing counts beside an area percentage.
- **Admit rate here is not the school's selectivity.** It is the rate at which *that
  university* admitted *that high school's* applicants — a joint property. Do not label
  it as either institution's admit rate.
- **"Recent High School Graduate"** defaults to both `Yes` and `No` checked. Leave it
  as-is unless a plan says otherwise, and record whichever you used.
- **UNC may suppress or round small cells.** Treat a missing cell as *not published*,
  not as zero — the same `null`-vs-not-found distinction `/add-school` already makes.

---

## 6. Data-provenance obligations

This is external school data, so the standing rule in `CLAUDE.md` applies in full:
**persist the hard data and its sources into the repo.**

- Save to `source-material/college-support/<school>/<School> - College Support - UNC System Admissions.md`
- Include the provenance header (fetched-by / date / method = "UNC Insight Tableau
  dashboard, headful-Chrome CDP scrape per the `nc-admissions-data` skill"),
  the **dashboard URL**, the exact filter values used (institution string, school
  string, term range, Recent-HS-Graduate setting), and the full per-term counts —
  **not just the derived rate**.
- Then run the `ingest-source-material` skill on a branch.

Any figure that reaches `src/data/metricValues.ts` must trace back to one of these files.

---

## 7. Scale planning

The default sweep is **11 tracked schools × the standing Top 6 institutions (§9) = 66
combinations**, each ~30–60s including re-render waits ⇒ roughly **35–65 minutes** of
wall-clock, plus screenshot reading.

**Sequence it institution-outer, school-inner**: select one institution, then iterate all
11 schools, then move to the next institution. The Institution filter is the expensive
re-render, so this does 6 of those instead of 66.

Report progress as you go rather than going quiet for an hour, and **write each
institution's results to `source-material/` as that institution completes** — a crash at
combination 60 should not cost the first 59.

A full 16-institution sweep is 176 combinations — only do that if a plan asks for it.

---

## 8. UX-approval reminder

Scraping is *data enrichment*, which is allowed. But surfacing this as a **new card,
new Compare row, or new metric key needs the user's explicit approval first**, per the
UX-design standard in `CLAUDE.md`. Land the data, then propose the UI with reasoning.

---

## 9. The target institution set — SETTLED

**Answered 2026-08-19.** The default target set is the standing Top 6, defined as exact
dashboard strings in [`../SKILL.md`](../SKILL.md) §1. Do not re-ask it; do not re-derive
it from a ranking.

```
UNC-Chapel Hill            NC State University        UNC Charlotte
East Carolina University   UNC Wilmington             UNC Greensboro
```

Copy those strings verbatim — hyphenation is inconsistent in the dashboard's own house
style (`UNC-Chapel Hill` hyphenated; `UNC Charlotte` / `UNC Wilmington` /
`UNC Greensboro` not), and it is **`East Carolina University`**, not "Eastern". An
exact-match filter fails **silently** on either slip.

Kept for the record, because it explains why the set is written down rather than derived:
the list matches US News *National Universities*, while **Appalachian State is ranked in
*Regional Universities South*** — a different list. "Top 6 in NC" is therefore not
self-defining, and a future task that wants the ranking re-derived should treat that as a
new question rather than silently substituting a different six.
