# Trinity Episcopal — Financial Aid & Tuition: rendering scope

**Set at review, 2026-09-16 (user): "Remove every card under the Financial Aid &
Tuition research area except the Per-grade cost table."**

The area renders **one card: the In-Depth Report**, whose Tuition Table and
"Fees & Added Costs" sections carry the per-grade tuition and activity-fee
figures in the designed treatment (banded bars, deltas, no markdown tables).

## How the reduction is implemented

Not by deleting research. All four source files stay committed and complete in
`source-material/financial-aid-tuition/trinity-episcopal/`. The change is a
single metric rule in `src/lib/metrics.ts` that folds every one of their `##`
headings onto the `in-depth-report` key.

**Why the rule is needed for this school and not the others.** Charlotte Latin
and Providence Day supply their deep-dive as a **gitignored PDF**, which the
content builder cannot slice — so it yields one section and the report renders
alone. Trinity's research is committed **markdown**, so the builder sliced it at
every heading and produced **16 cards**, including three `Source URLs`
ref-tables and two `Verbatim text` dumps. The rule reproduces the PDF schools'
shape for a school whose research is text.

## What was removed from the card itself

- The raw markdown cost table, which rendered its figures inside literal
  backticks (`` `$26,670` ``) — Trinity was the only school authoring figures as
  code spans, 28 of them on the page.
- The **Books** column, a run of hyphens at every grade (user, 2026-09-16).
- The "not smoothly monotonic" activity-fee sentence and the ⚠️ books-row
  callout explaining the hyphens.

**The books column, for the record.** The hyphens were the school's own
formatting and meant *no book charge is listed* — not "not published". The
reasoning: the Lunch and TED columns carry pointer text ("Options in chart
below"), so the school uses **words** when it means "see elsewhere" and
**dashes** when it means a null, and the document is titled "**Cost** of
Attendance". ⚠️ The document never writes "included", so that reading is an
inference from formatting. If ever surfaced in prose, say "no book charge is
listed", never "the school states books are included".

## To restore the full area

Delete the trailing Trinity rule in the `'financial-aid-tuition'` block of
`src/lib/metrics.ts` (it is marked "Keep this LAST"), then re-run
`npm run schema`. The prose cards return; nothing needs re-fetching.
