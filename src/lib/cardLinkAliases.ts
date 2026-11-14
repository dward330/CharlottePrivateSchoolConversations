/**
 * Former names of research areas and cards, so links that are already shared
 * keep working after a rename.
 *
 * HARD RULE (user, 2026-11-13): a card link is built from the card's English
 * name (`#<area name>/<card name>`, see `linkName()` in ./cardLink.ts), so
 * renaming a card or an area changes its link. Every rename therefore ALSO
 * records the old name here, and the old link keeps opening the same card
 * forever, exactly as the original `#topic-<slug>` section links are kept.
 *
 * - `from` is already in `linkName()` form (`the-college-pipeline`).
 * - A card alias points at the card's stable identity (`topic` + card `key`),
 *   never at its new name, so a card renamed twice needs no edit to its first
 *   alias. For Course Offerings the key is `linkName(<current division title>)`.
 * - `since` is the ISO date of the rename.
 *
 * NEVER DELETE AN ENTRY: someone's shared link depends on it. `npm run
 * check:cardlink` (in the build) fails when a name changes with no entry here,
 * and fails when an entry that is on `main` has been removed.
 */

/** Former area names → topic slug. Never delete an entry: a shared link depends on it. */
export const AREA_ALIASES: { from: string; topic: string; since: string }[] = []

/** Former card names → card key. `topic` absent = any topic. Never delete an entry. */
export const CARD_ALIASES: { from: string; topic?: string; key: string; since: string }[] = []
