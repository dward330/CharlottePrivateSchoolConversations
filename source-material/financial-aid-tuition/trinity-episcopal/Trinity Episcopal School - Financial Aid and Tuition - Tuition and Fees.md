# Trinity Episcopal School — Financial Aid and Tuition — Tuition and Fees

## Provenance

- **Retrieved by:** Claude (Claude Code agent), on behalf of Derrick.
- **Retrieval date:** 2026-09-16
- **Method:** Direct `curl` fetch of the live tuition page and the school's own
  "Cost of Attendance for 2026-27" Google Doc (exported as text); tuition history
  recovered from Internet Archive snapshots fetched with the raw `id_` modifier.
  **Every dollar figure below was read verbatim from a retrieved document. None are
  derived, interpolated or back-computed.**
- **School:** Trinity Episcopal School, 750 E. 9th Street, Charlotte, NC 28202 — **K–8**.
  EIN `56-2059568`.

## Source URLs

- Tuition & affordability — https://www.tescharlotte.org/admission/tuition-affordability.cfm
- **Cost of Attendance for 2026-27** — https://docs.google.com/document/d/1jh3Oc1gO1ShFo7bDR6xGEXCwvjN8Gpn_Ylg3z6Igs0M/export?format=txt
- 2026-27 School Profile (PDF) — https://www.tescharlotte.org/editoruploads/files/26-27SchoolProfile.pdf

> **All pricing lives in the Google Doc, not on the tuition page.** Cite the doc for
> every fee figure.

## ⛔ CRITICAL: the school's own 25-26 profile PDF carries a WRONG tuition figure

The **2025-26 School Profile PDF** states `Tuition ('25-'26): $25,400 (K-5); $25,771 (6-8)`.

**`$25,771` is the 2024-25 grade 6–8 figure.** The PDF carried the prior year forward.
Proven against the school's own tuition page across four archived snapshots:

| Snapshot | K-5 | 6-8 |
|---|--:|--:|
| 2024-02-29 | $23,961 | **$25,771** |
| 2025-01-16 | $23,961 | **$25,771** |
| 2025-09-09 | $25,400 | **$27,320** |
| 2026-05-09 | $26,670 | $28,690 |

**Never cite the 25-26 profile PDF for grade 6–8 tuition.** Use the tuition page.

## Tuition history — four years, first-party

| Year | K–5 | 6–8 | Source |
|---|--:|--:|---|
| 2023-24 | `$22,605*` | `$24,312*` | archived tuition page, 20230923052136 |
| 2024-25 | `$23,961` | `$25,771` | archived, 20240229225316 |
| 2025-26 | `$25,400` | `$27,320` | archived, 20250909135927 |
| **2026-27** | **`$26,670`** | **`$28,690`** | live page |

Year-over-year: **+6.0% → +6.0% → +5.0%**, identically for both bands. The two bands
have moved in lockstep; they have not diverged.

> The `*` on the 2023-24 figures is in the source; the footnote it points to was not
> captured in the text extraction.

### ⚠️ Method note — the Wayback CDX API was down; use the TimeMap endpoint

`https://web.archive.org/cdx/search/cdx?...` returned "Internet Archive: Temporarily
Offline" on every attempt, and `archive.org/wayback/available` returned **429**. The
working substitute, which yielded all 16 snapshots:

```
https://web.archive.org/web/timemap/link/<url>
```

**Worth recording as the standing CDX fallback.**

## Per-grade cost table — 2026-27

From "Cost of Attendance for 2026-27", verbatim:

| Grade | Tuition | Activity Fee | Books |
|---|--:|--:|---|
| K | `$26,670` | `$210` | `---------` |
| 1 | `$26,670` | `$225` | `----------` |
| 2 | `$26,670` | `$225` | `----------` |
| 3 | `$26,670` | `$305` | `----------` |
| 4 | `$26,670` | `$545` | `----------` |
| 5 | `$26,670` | `$735` | `----------` |
| 6 | `$28,690` | `$965` | `---------` |
| 7 | `$28,690` | `$965` | `----------` |
| 8 | `$28,690` | `$1,045` | `----------` |

The activity fee is **not smoothly monotonic** — grades 1–2 share `$225`, grades 6–7
share `$965`, and it steps sharply at grade 4 (`$545`) and again at grade 6 (`$965`).

### ⚠️ The books row means "included", not "not published"

Every grade shows a run of hyphens. The reasoning:

- The **Lunch** and **TED** columns contain **pointer text** ("Options in chart below",
  "Based on income in chart below") — i.e. the school uses **words** when it means
  "see elsewhere".
- It uses **dashes** when it means a null.
- The document is titled "**Cost** of Attendance".

So the dashes read as **no charge**. **Render as "included."**

> Honest caveat: the document never writes the word "included". This is an inference
> from the formatting, defensible but not a verbatim quote — say "no book charge is
> listed", not "the school states books are included".

## Lunch — FLIK

From the same doc, verbatim:
> "FLIK is not reduced for families receiving financial support. Your child has access to
> purchase lunch by keying in their PIN number and will be charged **$11.50**. The charges
> will be reflected on your monthly FACTS statement. Please note, it is more economical to
> purchase a 20-meal block than pay $11.50 per lunch. If you plan to have your child(ren)
> purchase lunch more than 3 times per week, a full annual plan is the most economical."

| | Lower School | Middle School |
|---|--:|--:|
| Annual Plan | `$1,375` | `$1,520` |
| 20 Meal Block | `$195` | `$210` |

> ⚠️ **"FLIK is not reduced for families receiving financial support"** is a notable
> affordability caveat and worth surfacing — aid covers tuition, not meals.

## Other costs

**Tuition refund insurance:** the school is insured by **A.W.G. Dewar, Inc.**, with a
brochure linked. **No price for the plan is published.**

## ⛔ Confirmed absent

| Item | Status |
|---|---|
| **Application fee amount** | **Confirmed absent.** The checklist says "Submit the application and application fee" and never states a number. A `grep -o '\$[0-9][0-9,.]*'` over the entire raw HTML of the admissions process page returns **zero dollar signs**. |
| **Enrollment deposit** | **Confirmed absent** — zero hits across the tuition page, process page and cost document. |
| **Average award size** | **Confirmed absent** — no source anywhere. (It is arithmetically derivable from the aid total and recipient share, but **a derived figure must not be published as a school figure**.) |

## ⛔ Do not ship these third-party figures

- **PrivateSchoolReview's `$17,752`** — **confirmed stale**. It matches no year from
  2023-24 through 2026-27.
- **A third-party "over 25% receive aid" claim** — untraceable to any live page, and
  superseded by the school's own first-party series (see the Financial Support file).
