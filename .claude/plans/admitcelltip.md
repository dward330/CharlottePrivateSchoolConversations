---
name: admitcelltip
title: Drop the "Beneath the rate: admitted / applied." line from the Compare NC admit-rate cell tooltip
status: implemented
phases: 1
created: 2026-11-09
branch: fix/admitcelltip
prs: [465]
---

# Drop the "Beneath the rate" line from the NC admit-rate cell tooltip

## Goal

On the Compare page, hovering a Top 6 NC admit-rate cell (e.g. Cannon, UNC-Chapel Hill,
32%) opens a tooltip with four lines: a kicker, "Admitted: 20 — …", "Applied: 63 — …",
and "Beneath the rate: admitted / applied." The last line is redundant: the two lines
above it already name both numbers and say what each counts. Remove it in all ten locales.
Done when the cell tooltip shows the kicker plus the Admitted and Applied lines only.

## Context

- Rendered in `src/pages/Compare.tsx` around line 683, inside the `TopLayerTip` for an
  `ncAdmit` cell: `<span className="tip-body">{t('compare.ncAdmitCellFormat')}</span>`.
  That is the only consumer of the key (`grep -rn ncAdmitCellFormat src scripts`).
- The key `compare.ncAdmitCellFormat` exists in all ten catalogs: `src/locales/en.json`
  (line ~167) and `es`, `bn`, `ar`, `hi`, `ht`, `fr`, `fa`, `it`, `te` (line ~160; `ar`
  ~192).
- A code comment just above the Admitted span reads
  `{/* Admitted first, matching the \`admitted / applied\` line. */}` — it refers to the
  line being removed.
- History: the line was split into its own key at the last review of plan
  `ncadmitcompare` (see that plan's Implementation notes, "Last review tweak"). This plan
  reverses that one tweak.
- `scripts/check_nc_compare_rows.mjs` (line ~125) asserts on `ncAdmitLabel`,
  `ncAdmitTipKind`, `ncAdmitTip`, `ncAdmitCellKind`, `ncAdmitCellAdmitted` — not on
  `ncAdmitCellFormat` — so no checker change is needed.

## Decisions

- **Single-phase — adds no user-facing text; it only deletes one existing string.** The
  key is removed from all ten catalogs in one commit, so no locale renders a missing key.
- **Delete the key, don't leave it orphaned** — an unused key in ten catalogs is dead
  translation surface.
- **Keep the ROW-header tooltip's closing sentence** (`compare.ncAdmitTip`: "…Beneath each
  rate: admitted / applied."). That tip explains the small `20 / 63` figure printed under
  each rate in the cell itself, where the hover tip has no Admitted/Applied lines. Only the
  per-cell repetition is removed.
- **Keep Admitted before Applied** in the cell tip; just reword the code comment so it no
  longer points at the removed line (e.g. "Admitted first, matching the `admitted / applied`
  figure printed under the rate.").

## Approvals needed

None. Removing a redundant tooltip line was requested by the user; no card, row, or key is
added.

## Out of scope

- The row-header tooltip (`compare.ncAdmitTip`) and every other tooltip.
- The College Support `ncAdmissions` card.
- Any wording change to the Admitted / Applied lines.

## Steps

Single-phase — adds no user-facing text.

1. **Remove the render line** — in `src/pages/Compare.tsx`, delete
   `<span className="tip-body">{t('compare.ncAdmitCellFormat')}</span>` from the
   `ncAdmit` cell `TopLayerTip`, and reword the "Admitted first…" comment as in Decisions.
2. **Remove the key from all ten catalogs** — delete the `"ncAdmitCellFormat": …` line from
   `src/locales/{en,es,bn,ar,hi,ht,fr,fa,it,te}.json`. Edit the line textually (don't
   JSON round-trip and re-serialise the files); check the preceding `ncAdmitCellApplied`
   line still ends with a comma since `sportsMatrix` follows.
3. **Confirm no stragglers** — `grep -rn ncAdmitCellFormat src scripts` returns nothing.
4. **Branch, commit (explicit paths only), PR, squash-merge, pull `main`.** Do not deploy.

## Verification

- `npx tsc -b`
- `node scripts/check_nc_compare_rows.mjs`
- `npm run check:chrome`
- `npm run build` (runs the chained gates)
- **Browser check:** `npm run build && npx vite preview`, open `/compare?topic=college-support`
  in Chrome, hover a Top 6 admit-rate cell: the tip shows the kicker, the Admitted line and
  the Applied line, with no third body line. Repeat with `?lang=es` and `?lang=ar` to
  confirm the line is gone in a Latin and an RTL locale and nothing renders a raw key.
  Hover the row header too and confirm its tip still ends with "Beneath each rate:
  admitted / applied."
