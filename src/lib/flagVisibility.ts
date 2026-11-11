/**
 * Which evidence-flag kinds reach a reader — the ONE place this is decided.
 *
 * Read by three things that must agree (plan `plainsmall`):
 *   - the components, through `visibleFlags(topic, flags)` in `lib/toVerify.ts`;
 *   - `scripts/check_plain_language.mjs`, which skips prose no parent sees, so
 *     its report and its hook never count a flag that never renders;
 *   - `scripts/plain_review.mjs`, whose worklists hold only rendered text.
 *
 * `npm run check:flags` (`scripts/check_flag_visibility.mjs`, in the build)
 * fails any component that filters flags some other way, so a component cannot
 * start rendering a kind listed here while the checker stays blind to it. To
 * show or hide a kind, edit THIS file.
 *
 * This module must stay import-free and must not read `import.meta.env`: the
 * two scripts import it under plain Node (type stripping), where neither works.
 * The dev-server switch lives in `lib/toVerify.ts` and is passed in as `dev`.
 */

/** Research bookkeeping: rendered on the dev server only, in every topic. */
export const DEV_ONLY_FLAG_KINDS: readonly string[] = ['verify']

/**
 * Per topic: flag kinds that never render, on the dev server or in production.
 *
 * Student Clubs: GAP and COUNT describe the state of the evidence — what a
 * school does not publish, or where its own pages disagree on a number — which
 * reads as research bookkeeping rather than something a parent can act on.
 * They stay in the data (sourced in the per-school files and source-material/)
 * and can be surfaced again by removing them here. INDIVIDUAL — NOT A CLUB
 * still renders, because it corrects how a reader would otherwise miscount what
 * is on the card.
 */
export const HIDDEN_FLAG_KINDS: Readonly<Record<string, readonly string[]>> = {
  'student-clubs': ['gap', 'count'],
}

/** True when a flag of this kind can reach a parent on the production site. */
export function isParentFacingFlag(topic: string, kind: string): boolean {
  if (DEV_ONLY_FLAG_KINDS.includes(kind)) return false
  return !(HIDDEN_FLAG_KINDS[topic] ?? []).includes(kind)
}

/** The flags a topic renders. `dev` = also show the dev-only kinds. */
export function renderedFlags<F extends { kind: string }>(topic: string, flags: F[], dev: boolean): F[] {
  const hidden = HIDDEN_FLAG_KINDS[topic] ?? []
  return flags.filter((f) => !hidden.includes(f.kind) && (dev || !DEV_ONLY_FLAG_KINDS.includes(f.kind)))
}
