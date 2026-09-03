# Charlotte Private School Conversations — Branding — Site Logo

## Provenance

- **Supplied by:** the site owner, 2026-09-03, for the per-school social-card
  (Open Graph) work in `.claude/plans/seogaps.md`.
- **Master file:** `Charlotte Private School Conversations Cover Art - Logo.png`
  in this folder — **gitignored**, like every non-`.md` file under
  `source-material/` (see `.gitignore:32`).
- **Source:** the project's own brand asset. Not fetched from a third party, so
  there is no source URL to cite; it is a branding file rather than research
  data and feeds no metric, so no `ingest-source-material` run applies.

## The master, as measured (not estimated)

| Property | Value |
|---|---|
| Canvas | 2048 × 2048 (square) |
| Mode | RGBA — but **fully opaque**: alpha is 255 at every pixel |
| Ground | `#f7f7ef` cream, **baked in** rather than transparent |
| Artwork ink box | (142, 320) → (1906, 1730) |
| Artwork size | 1764 × 1410, aspect 1.251 (**horizontal**) |
| Padding | 142 px left/right, 320 px top, 318 px bottom |

The ink box was measured by scanning for pixels differing from the `#f7f7ef`
corner by more than 18 per channel, not by eye.

Two consequences, both of which changed the design:

1. **The artwork is horizontal on a square canvas**, so it carries substantial
   padding. Placed untrimmed in a 1200×630 frame it renders visibly smaller
   than intended — hence the trim below.
2. **The cream ground is opaque, not alpha.** Compositing the mark over a
   brand-colored field would therefore show as a cream rectangle floating on
   color. So the OG card's ground is that *same cream*, and each school's brand
   color is used for an accent bar and the kicker instead. This is the fallback
   the plan's open question specified for exactly this finding.

## The committed derivative

`assets/brand/wordmark.png` — 701 × 560, 64-colour palette PNG, 191 KB.

Derived from the master once, at commit time: cropped to the ink box above,
downscaled, and quantized (2.2 MB → 191 KB). The card draws it 250 px tall, so
this is still ~2× for retina.

**It is committed outside `source-material/` on purpose.** `scripts/gen_og_images.mjs`
reads it at build time, and `source-material/**` is gitignored except for `*.md`
— so a generator reading the master would work on this machine and fail on a
fresh clone or in CI. Verified by hiding the master and re-running the build.

## Where it is used

- `scripts/gen_og_images.mjs` → `dist/og/<slug>.png`, one 1200×630 card per
  indexable route (11 schools + home + compare).
- **Not** `public/logo.png`, which stays the 256×256 site mark used in the nav
  and is unchanged by this work.
