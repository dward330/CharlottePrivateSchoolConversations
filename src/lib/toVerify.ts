import { renderedFlags } from './flagVisibility.ts'

/**
 * TO VERIFY markers are research bookkeeping — a claim the research could not
 * yet confirm — so they render on the dev server and are hidden on the
 * production site, for every school (user, 2026-10-27). That covers both the
 * flag statements (`kind: 'verify'` on College Support, High School Placement,
 * After School and Summer) and the bare TO VERIFY chips (Sports, the College
 * Support National Merit `unconfirmed` marker).
 *
 * Which OTHER flag kinds render is decided per topic in `lib/flagVisibility.ts`
 * (Student Clubs hides GAP and COUNT everywhere); the plain-language checker
 * reads the same file, and `npm run check:flags` keeps every component on it.
 *
 * `import.meta.env.DEV` is true only under the `vite` dev server; the build and
 * the pre-rendered pages are production.
 */
export const SHOW_TO_VERIFY = import.meta.env.DEV

/**
 * The flags a topic's card renders: every kind `flagVisibility.ts` does not
 * hide for `topic`, plus the dev-only kinds on the dev server. `topic` is the
 * topic slug as a string literal (`'after-school'`) — `check:flags` asserts it.
 */
export function visibleFlags<F extends { kind: string }>(topic: string, flags: F[]): F[] {
  return renderedFlags(topic, flags, SHOW_TO_VERIFY)
}
