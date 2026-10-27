/**
 * TO VERIFY markers are research bookkeeping — a claim the research could not
 * yet confirm — so they render on the dev server and are hidden on the
 * production site, for every school (user, 2026-10-27). That covers both the
 * flag statements (`kind: 'verify'` on College Support, High School Placement,
 * After School and Summer) and the bare TO VERIFY chips (Sports, the College
 * Support National Merit `unconfirmed` marker). The other flag kinds —
 * discrepancy, publication gap, estimate, stale — are parent-facing and still
 * render everywhere.
 *
 * `import.meta.env.DEV` is true only under the `vite` dev server; the build and
 * the pre-rendered pages are production.
 */
export const SHOW_TO_VERIFY = import.meta.env.DEV

/** The flags to render: all of them in dev, everything but `verify` in prod. */
export function visibleFlags<F extends { kind: string }>(flags: F[]): F[] {
  return SHOW_TO_VERIFY ? flags : flags.filter((f) => f.kind !== 'verify')
}
