---
description: >
  Make a NotebookLM podcast episode about how to apply to one school — asks which school,
  checks the app's admissions data against that school's OWN live admissions site, builds
  the report from the live values, and hands back the PDF, the prompt and the upload
  steps. Use when the user types /admissions-episode, or asks to "make an admissions
  episode", "generate the admissions report for <school>", "turn <school>'s admissions
  into a podcast". Run it once per school, every time — the freshness check is the point.
---

# /admissions-episode — one school's admissions process, as a podcast episode

Produces two files and the instructions to turn them into an episode of *Charlotte Private
School Conversations* that walks a parent through **how to actually apply** to one school.

**Run this per school, as often as you like.** It is the only command the user types; the
generator underneath (`npm run report:admissions`) is plumbing they are not expected to
invoke. Built by [`.claude/plans/admissionsreport.md`](../plans/admissionsreport.md).

The user may pass a school (`/admissions-episode providence-day`). Validate it anyway.

## Step 1 — which school

List every school that HAS admissions data, with its band count and entry cycle, then name
the ones that do not. **Compute both lists at run time** — never hardcode either, and never
state a count from memory:

```bash
node scripts/gen_admissions_report.mjs        # prints the eligible roster and exits 2
```

The schools without the area come from subtracting that roster from
`src/data/schools.json`. Accept a slug or a school name.

## Step 2 — the no-data gate

If the school has no Admissions research area, **stop**. Do not degrade into a thin report
and do not write any file. The generator already prints the right message — run it and
relay that, then say plainly that no files were written.

The gate is about the **research area**, not the school. A school can sit in the app for
months with seven research areas and no Admissions one; five do today. Adding the area is a
separate research pass (`source-material/admissions/<slug>/`, then
`src/data/admissionsPrograms/<slug>.ts`), and once it exists this command works with no
change to anything here.

## Step 3 — the freshness check (REQUIRED — never skip it)

**Before any report is written**, check the app's data against the school's **own live
admissions website**. The episode tells parents to act on dates; a stale date spoken aloud
is the one failure here that can cost a family a place.

Tell the user this is running — it is the slowest step, and silence looks like a hang.

1. **Fetch the school's own admissions pages.** Start from `guide.sources` (every entry
   carries a real URL, and the first is the school's admissions page by convention). Follow
   the pages that carry dates: the admissions calendar, the per-band process pages, and the
   tuition/financial-aid page for the aid deadline.
2. **Compare field by field**, for the things an episode states as fact and a parent acts
   on:
   - the entry `cycle` itself — has the school moved to the next one?
   - every `deadlines[].value` on every band
   - every `steps[].tag` date chip
   - every `comparison.rows[].cells` date
   - assessment names (WPPSI-IV, WISC-V, ISEE, CAIS …) and which band sits which
   - fees and deposits (application fee, enrollment deposit, aid-platform fee, testing fee)
   - the financial-aid deadline in `aid.text`
   - admissions-office names, roles and phone numbers in `contacts.people`
   - anything the app marks "not published" that the school has SINCE published — a real
     find, not a non-event
3. **Classify each difference** as `CHANGED` (app has X, site now says Y), `NEW` (the site
   publishes something the app marks not-published), or `GONE` (the app has something the
   site no longer shows).

**The school's own website wins, always** — it is exactly what the episode tells parents.

### If the site cannot be reached

Do **not** fail the command, and do **not** silently proceed as if it were verified. Build
from the app's data and pass a stamp for the PDF's disclaimer:

```bash
npm run report:admissions -- --school <slug> --unverified-note \
  "Live-site verification could not be completed on <date>; figures are as researched <retrieval date>. Verify against <SCHOOL_SITE> before acting."
```

Then tell the user plainly which pages could not be fetched, and that the report is
unverified. An unverifiable report is still useful; an unverified report presented as
verified is not.

## Step 4 — build the report from the LIVE values

Write the differences to a JSON overrides file, keyed by a dot path into the guide — the
band segment accepts either the band **key** or its index:

```json
{
  "bands.tkk.deadlines.1.value": {
    "value": "Feb 5, 2027",
    "note": "updated from the school's live calendar, checked 2026-09-06",
    "source": "https://www.providenceday.org/admissions"
  }
}
```

```bash
npm run report:admissions -- --school <slug> --overrides <file.json>
```

Each corrected value prints in the PDF with its provenance note inline, so the correction
is visible in the artifact rather than lost. With no differences, run it with no
`--overrides` at all.

**Do NOT edit `src/data/admissionsPrograms/**` or write `source-material/**` here.** Editing
shipped research data is a separate, reviewable change through the ingest pipeline and the
data-provenance standard. A report command must not rewrite the website's content as a side
effect.

## Step 5 — hand over the files and the NotebookLM steps

Report both output paths, then:

1. Open [notebooklm.google.com](https://notebooklm.google.com) and create a notebook named
   `Charlotte Private School Conversations — <School> Admissions`
2. Upload **the PDF as the only source**
3. Open **Audio Overview → Customize** and paste the prompt from the `.txt`
   (everything below its `#` header lines)
4. Generate, then download the audio

The PDF is source material only — it carries no instructions to NotebookLM, which is why
the prompt is a separate file. Do not paste the PDF's text into the customize box.

## Step 6 — print the freshness summary and ASK about updating the app

Required, every run. One bullet per difference, each carrying the app value, the site value,
**why it matters** in plain language, and the source URL:

```
FRESHNESS CHECK — Providence Day School, against providenceday.org, 2026-09-06

  3 differences found. The report was built from the LIVE site values.

  • CHANGED — TK/K materials deadline
      app:  Feb 1, 2027
      site: Feb 5, 2027
      why it matters: spoken as a hard deadline in the TK/K segment; a parent
      acting on the app's date would be four days early, which is harmless —
      but the reverse case is not, and the app is now wrong either way.
      source: https://www.providenceday.org/admissions
```

- The **"why it matters"** is the point — a bare diff does not tell the user whether to
  care.
- **Say explicitly that the report is already correct either way**, so they know the episode
  is safe to make regardless.
- **When nothing changed, say so**: `FRESHNESS CHECK — no differences found; the app's data
  matches the school's live site as of <date>.` Silence is indistinguishable from the check
  not having run.
- **Never auto-apply.** Ask. If the user says yes, that is a **separate branch and PR**
  following the data-provenance standard: new `source-material/admissions/<school>/*.md`
  with source URLs, then the data edit.

If the generator reported **jargon with no glossary entry**, surface that too — a term the
school uses that
`source-material/admissions/_shared/Admissions - Shared - Terminology Glossary.md` does not
define will go unexplained in the episode. Adding an entry needs a real source, researched
the same way as the rest of that file.

## Step 7 — remind the user to listen before publishing

Specifically checking that:

- every date and the entry cycle were spoken correctly, **with the "dates shift year to
  year — verify against the school's own calendar" caveat**, which the prompt lands three
  times by design
- both website mentions landed: the insights site at the open and the close as *a helpful
  resource*, the school's own site as *the authority*, and never one without the other
- no raw URL or document GUID was read aloud — the only spoken address is the school's bare
  domain
- no score, cutoff, difficulty claim or preparation advice attached to any assessment

Once an episode is published, adding it to `src/data/podcastEpisodes.ts` — so it appears
under the school's Admissions header — is a separate one-line change.
