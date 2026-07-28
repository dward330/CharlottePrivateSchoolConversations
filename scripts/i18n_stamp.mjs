/**
 * The overlay's `of` stamp: a stable short hash of an English source string.
 *
 * Its own module so importing it has no side effects — the checker needs it
 * without running the extractor's main().
 *
 * FNV-1a 32-bit rather than sha256 because the runtime resolver
 * (src/lib/localizeData.ts) must compute the identical value in the browser,
 * where node:crypto is unavailable. The two implementations are asserted
 * identical by scripts/check_hash_parity.mjs — if they ever diverge, every
 * overlay entry reads as stale and the whole locale silently renders English.
 */
export function stamp(s) {
  let h = 0x811c9dc5
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 0x01000193) >>> 0
  }
  return h.toString(16).padStart(8, '0')
}
