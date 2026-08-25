---
name: citebackfill
title: Backfill deep-link URLs for the name-only Sports and Student Clubs citations
status: not-implemented
phases: 1
created: 2026-08-24
branch: chore/citebackfill
prs: []
---

# Backfill the name-only research citations

## Goal

The distilled research notes under `.claude/docs/sports/` and `.claude/docs/student-clubs/`
cite sources **by name only** — `[Source: Charlotte Christian Knights Accolades page]` — with
no URL. A researcher cannot re-verify a claim without re-finding the page from scratch.

We will know it worked when each of those citations carries a resolvable deep-link URL, and
when re-running the ingest pipeline does not erase the work.

**Read the Context section before step 1.** This plan is not the find-and-replace the
outstanding-items list implied, and the reason changes the approach.

## Context

### The count is 179 + 53, not 111 + 45

Measured 2026-08-24:

| Topic | Cites with a URL | Name-only |
|---|---|---|
| `sports` | 1 | **179** |
| `student-clubs` | 19 | **53** |

The `111 + 45` figure in the project memory is **wrong** — it appears to have been recorded
after a partial pass, or measured with a narrower pattern. Re-measure as step 1 rather than
trusting either number; the command is in the steps below. For contrast, `the-arts` already
has 68 cites carrying URLs, so a well-cited topic is what this should look like.

### The critical constraint: these files are GENERATED from gitignored PDFs

`.claude/docs/**` is rebuilt by `.claude/skills/ingest-source-material/build_docs.py`, which
is a **verbatim `pdfplumber` text extraction** (lines 93-98) of the raw files in
`source-material/<topic>/<school>/`. The `[Sources: …]` strings originate **inside the PDFs**.

Verified: the string `Sources: Charlotte Christian; NBA.com` appears in
`.claude/docs/sports/charlotte-christian.md` and in **no committed file** under
`source-material/` — because that school's Sports material is nine `.pdf` files and only two
`.md` files, and per `.gitignore` the PDFs are read locally and never committed.

Two consequences that drive the whole plan:

1. **Editing the generated `.md` files directly is worthless** — the next
   `build_docs.py <topic>` run silently reverts every edit. Any approach that ends with
   "add the URL to `.claude/docs/sports/cannon.md`" is wrong.
2. **The upstream is not editable either**, for the PDF-backed schools. The source of truth
   is a binary this repo deliberately does not commit.

### What this is actually worth

`.claude/docs/**` is **researcher-facing only**. Confirmed: nothing under `src/` reads those
files — the three `grep` hits are comments *referencing* doc filenames, not code loading
them. The app's own citations are separate and are **already done**: `src/data/**` measured
765 URLs against 35 URL-less entries, all 35 legitimate methodology notes, 0 genuine gaps
(`citeurls`, PR #206).

So no link on any school page is broken today, and none will render differently after this
plan. The benefit is re-verifiability of the research record.

### The cites are mostly resolvable

Sampled from `sports`, the most common shapes are named school pages
(`[Source: Charlotte Christian Knights Accolades page]`, `[Source: clshawks.com Staff
Directory]`, `[Source: charlottelatin.org Hall of Fame]`) and named third parties
(`Pro-Football-Reference`, `HighSchoolOT`, `On3`). These are findable. A minority
(`[Sources: On3; Lewis Brisbois sports-law analysis]`) name an analysis rather than a page
and may resolve to nothing — that is a real outcome, see the decisions below.

## Decisions

- **Write the URLs into a NEW committed sidecar per school+topic, not into `.claude/docs/`.**
  The generated notes are not a durable home. Create
  `source-material/<topic>/<school>/<School> - <Topic> - Source URLs.md` — a committed `.md`
  (the `.gitignore` exempts `source-material/**/*.md`), holding a table of
  `cited name → resolved URL → date checked → status`. This survives regeneration, sits
  beside the material it documents, and follows the existing data-provenance standard.
- **Do not modify `build_docs.py` to merge the sidecar into the generated notes.** That
  couples the generator to a new file format for a researcher-only benefit, and this repo has
  a standing lesson about generated docs drifting from hand-maintained layers. If the merge
  is ever wanted, it is its own plan.
- **A cite that cannot be resolved is recorded as `unresolved`, never guessed.** Per the
  `citeurls` risk that carried over: an invented URL is worse than no URL. A confirmed
  "no public page" is a useful result and gets written down as one.
- **Scope to `sports` and `student-clubs`.** `college-support` (0 with URLs) and
  `after-school` (0) have the same shape and are deliberately left; see Out of scope.
- **Use the Wayback CDX API to list a domain's archived URLs rather than guessing filenames.**
  This is the technique that resolved the `citeurls` profile after a prior pass wrongly
  concluded it was unpublished — see the `not-published-needs-a-cdx-listing` memory. Never
  conclude "not published" from filename guesses returning 404.

## Approvals needed

**None.** No new card, section, stat tile, Compare row, metric key or topic. Nothing under
`src/` changes and no rendered output changes.

## Source material

This plan **creates** committed source-material files: one
`<School> - <Topic> - Source URLs.md` per school+topic that has name-only cites. They are
new provenance records, not new research data, so there is nothing to ingest — but see
step 6, which confirms that claim rather than assuming it.

## Out of scope

- **`college-support` and `after-school` cites.** Same defect, deliberately not in this pass
  — do them as a follow-up once the sidecar format has proven itself on two topics.
- **Editing `.claude/docs/**` directly.** Explicitly forbidden; regeneration reverts it.
- **Changing `build_docs.py`.** See Decisions.
- **`src/data/**` citations.** Already complete (PR #206). Do not re-open them.
- **Re-verifying the underlying research claims.** This plan resolves *where a claim came
  from*, not whether it is correct.

## Steps

**Single-phase — adds no user-facing text.** Everything written here is researcher-facing
provenance under `source-material/`; nothing reaches `src/` or any rendered page.

1. **Re-measure, and do not trust this document's numbers.** Run:

   ```bash
   for t in sports student-clubs; do
     printf '%s name-only: ' "$t"
     grep -roh "\[Sources\?:[^]]*\]" .claude/docs/$t/*.md | grep -vc http
   done
   ```

   Expect ~179 and ~53. If the counts differ materially from both those and the memory's
   `111/45`, stop and report before doing the work — a third number means something else
   is going on.

2. **Build the worklist**, grouped by school and topic, with each cite's source file and
   line. Write it to the scratchpad, not the repo. De-duplicate: the sample shows
   `[Source: Cannon Athletics Hall of Fame]` recurring 5+ times, so the number of *distinct*
   sources to resolve is well below the raw cite count — resolve each distinct source once.

3. **Resolve each distinct source to a deep-link URL.** Prefer the school's own live page;
   fall back to a Wayback capture when the page has moved, using the CDX listing technique
   rather than filename guesses. Record the HTTP status actually observed. For a
   third-party cite (`Pro-Football-Reference`, `HighSchoolOT`, `On3`), link the specific
   page supporting the claim, not the site root.

4. **Write one sidecar per school+topic** at
   `source-material/<topic>/<school>/<School> - <Topic> - Source URLs.md`, each with a
   provenance header (who/when/how, per the data-provenance standard) and a table:

   | Cited as | URL | Checked | Status |
   |---|---|---|---|

   `Status` is `ok`, `wayback`, or `unresolved`. Every row is one of those three — no blanks.

5. **Report the unresolved set explicitly** in the PR body, with a count and the reason each
   failed. Do not soften it and do not pad the table with guessed URLs; a confirmed
   "no public page" is the useful half of this work.

6. **Confirm the sidecars are inert.** Run `build_docs.py` for both topics and then
   `npm run check:metrics`. Assert two things: the generated `.claude/docs/**` notes are
   **unchanged** (`git diff --stat` shows nothing under `.claude/docs/`), and the new files
   produce no new "on disk but not ingested" advisory beyond the known-benign ones. If they
   *do* trigger a new advisory, say so — that would mean the sidecar name pattern collides
   with the ingest glob and the naming needs changing.

## Verification

- [ ] Step 1's re-measure recorded, and any divergence from 179/53 reported
- [ ] Every distinct cited source appears in exactly one sidecar row
- [ ] Every row has a `Status` of `ok`, `wayback` or `unresolved` — no blank cells
- [ ] A spot-check of **10 random `ok` URLs** returns HTTP 200 and actually shows the cited
      content (a 200 on a redirect-to-homepage is not a resolution)
- [ ] `git diff --stat .claude/docs/` after re-running `build_docs.py` — **empty**
- [ ] `npm run check:metrics` — no new advisories
- [ ] `npx tsc --noEmit` and `npm run build` — clean; nothing under `src/` was touched, so
      these should be unaffected, and a change here means something went wrong
- [ ] The unresolved count stated plainly in the PR body

No browser check: nothing rendered changes.

## Risks

| Risk | Mitigation |
|---|---|
| **URLs get written into `.claude/docs/**` out of habit**, and the next ingest silently erases the whole pass. | Step 6 asserts `git diff` on that directory is empty. The Decisions section states the constraint up front, and Out of scope forbids it explicitly. |
| **A URL is guessed to close a row.** | Step 3 requires an observed HTTP status; `unresolved` is a first-class outcome. Same discipline as `citeurls`, where inventing a URL would have hidden three-year-old figures. |
| **The work is large and half-finishes**, leaving a partial sidecar that reads as complete. | Sidecars are per school+topic, so a partial pass is a *smaller set of complete files*, not one incomplete file. If stopping early, list the unwritten school+topic pairs in the PR. |
| **The 179/53 count is itself wrong**, as the memory's 111/45 was. | Step 1 re-measures first and stops on a third number rather than proceeding on a bad denominator. |
