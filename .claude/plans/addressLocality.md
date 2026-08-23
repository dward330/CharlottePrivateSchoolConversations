---
name: addressLocality
title: Publish each school's real city in the JSON-LD as a PostalAddress, now that brands.ts holds a truthful city
status: in-progress
phases: 1
created: 2026-08-23
branch: feat/jsonld-address-locality
prs: []
---

# Publish each school's city in the JSON-LD

## Goal

Every school page's `EducationalOrganization` JSON-LD currently carries `name`, `url`,
`description` and (for 6 of 11) `logo` — and **no address at all**. A search engine reading
`/school/gaston-day/` cannot tell that the school is in Gastonia, even though the app now
renders exactly that in the page's own kicker.

After this change each school's structured data carries a `PostalAddress` with
`addressLocality` (the school's real city), `addressRegion: 'NC'` and
`addressCountry: 'US'`. We will know it worked when all eleven pre-rendered pages in
`dist/` contain the correct locality — Gastonia for `gaston-day`, Concord for `cannon`,
Matthews for both `carmel-christian` and `covenant-day`, Davidson for `davidson-day`, and
Charlotte for the other six — and `npm run check:seo` fails if any one of them loses it.

## Context

**This unblocks a follow-up whose blocker has factually expired.** The `seo` plan put JSON-LD
address data out of scope with a reason, not a preference
([`.claude/plans/seo.md:142-146`](.claude/plans/seo.md)):

> **JSON-LD requiring data the repo does not have.** Confirmed during planning: there is
> **no structured address, geo, phone, or founding data** in `src/data/`. `BRANDS` holds
> only `color`, `initials`, `logo`, `welcomeVideoUrl`. […] **Do not invent addresses or EINs
> to fill the schema.**

That premise is now false. [`bugFixSchoolLocation`](bugFixSchoolLocation.md) (PR #180,
merged 2026-08-23) added a **required** `city: string` to the `Brand` type, verified against
each school's own website and cross-checked against committed research. The `Brand` type is
now:

```ts
export type Brand = {
  color: string
  initials: string
  city: string          // ← added by PR #180, required
  logo?: string
  welcomeVideoUrl?: string
}
```

So this plan does not *override* the earlier exclusion — it satisfies the condition the
exclusion was written against. The "do not invent" instruction still stands and is still
respected: every locality shipped here traces to
`source-material/branding/_shared/All Schools - Branding - Campus City and Address.md`.

**The render site already has the data in hand.**
[`src/lib/head.ts:106`](src/lib/head.ts) already imports `BRANDS` and reads it:

```ts
const logo = BRANDS[school.slug]?.logo
```

so `city` needs **no new import and no new lookup pattern** — it is the same accessor one
line over. The JSON-LD object it feeds is at `head.ts:108-119`, and the comment to replace
is the three-line "Only fields the repo can populate truthfully" note directly above the
`logo` spread.

**`head.ts` is the only writer, and pre-render is why it matters.** The module's header
comment records that `scripts/prerender.mjs` captures `document.documentElement.outerHTML`
*after* the app mounts, so whatever `setPageMeta()` sets becomes the static head of the file
a crawler downloads. Confirmed by grep: `setPageMeta` has exactly one caller
([`src/App.tsx:33`](src/App.tsx#L33)), and nothing else in `src/` writes `ld+json`. So
editing `metaForRoute()` is sufficient — there is no second code path to keep in sync.

**`check:seo` asserts the JSON-LD exists but nothing about its contents.**
[`scripts/check_seo.mjs:130`](scripts/check_seo.mjs#L130) is the whole of it:

```js
if (!/"@type":\s*"EducationalOrganization"/.test(html)) {
  fail(`${route.path} — no EducationalOrganization JSON-LD`)
}
```

An `address` added today could therefore be dropped tomorrow — or ship with the wrong city —
and every check would stay green. That is the same silent-regression shape this repo has
been bitten by repeatedly, so **adding the assertion is a step of this plan, not a nicety.**

**Why `addressRegion` is a constant and not per-school data.** All eleven schools are in NC.
`bugFixSchoolLocation` already settled this exact question for the kicker and recorded the
reasoning: the state is not per-school data. Adding a `state` field to `Brand` would create a
second required field that is identical for every school, and a future out-of-state school is
a bigger change than one field anyway. Same call, same reason, kept consistent.

**Scope of the address, decided with the user.** The source-material record holds verified
**street, city, state and ZIP** for all eleven — so a full `PostalAddress` was possible. The
user chose **city + state only** (2026-08-23). It ships the data that already exists in
`brands.ts`, adds no new required per-school field, and a partial `PostalAddress` is valid
schema.org — `streetAddress` is not a required property. Full street + ZIP remains available
in the committed record if a later plan wants it.

**This is not the dossier kicker.** The kicker is rendered UI text and went through the
two-phase locale process. JSON-LD is machine-readable metadata in an English-only
pre-rendered page (`head.ts` header comment: *"Titles and descriptions here are `<head>`
metadata, not rendered UI chrome, so they deliberately do NOT go through
`src/locales/*.json`"*). Nothing here is read by a human in any locale.

## Decisions

- **Single-phase — adds no user-facing text.** JSON-LD is structured metadata consumed by
  crawlers, deliberately outside the `src/locales/*.json` layer per `head.ts`'s own header
  comment. No string a parent reads changes, so the standing English-first/locale-second
  split does not apply. Decided, not forgotten.
- **`addressLocality` comes from `BRANDS[slug].city`** — the field PR #180 made required and
  verified. No new data, no new file, no invented values.
- **`addressRegion: 'NC'` and `addressCountry: 'US'` are literals in `head.ts`**, not per-school
  fields — consistent with how `bugFixSchoolLocation` handled the state in the kicker.
- **`addressCountry` uses the ISO code `'US'`**, which is schema.org's recommended form for
  that property, rather than the spelled-out country name.
- **The address is emitted unconditionally for every school**, not spread conditionally like
  `logo`. `city` is required on the type, so unlike `logo` there is no absent case to guard —
  a conditional spread would imply an optionality that does not exist and would hide a
  regression rather than surface it.
- **The unknown-slug path is untouched.** `metaForRoute()` returns early with
  `jsonLd: null` for a slug not in the manifest (`head.ts:96-98`), so `brandFor()`'s
  `city: 'Charlotte'` fallback is never reached from here. Do not add an address to that
  branch.
- **`check:seo` gains a per-school locality assertion** rather than a mere "address exists"
  check — the failure mode worth catching is the *wrong* city, which an existence check
  cannot see.
- **The `seo.md` out-of-scope bullet is updated, not deleted** — it documents a real
  constraint that held at the time. It gains a line recording that PR #180 changed the
  premise and this plan acted on it.

## Approvals needed

**None.** No new card, section, sub-section, stat tile, Compare row, metric key or topic;
no reordering; no component, layout or styling change. This edits structured metadata in the
document head — nothing rendered changes, and the UX-design gate does not apply.

## Source material

**None fetched — none needed.** Every locality this plan publishes already exists in the
repo, committed by PR #180:

- `source-material/branding/_shared/All Schools - Branding - Campus City and Address.md` —
  verified street, city, state and ZIP for all eleven schools with eleven source URLs.
- `src/data/brands.ts` — the `city` field derived from it.

No ingest run is required and no new external data is fetched.

## Out of scope

- **`streetAddress` and `postalCode`.** Decided with the user; the data exists in the
  committed record if a later plan wants it.
- **`geo` / latitude / longitude, `telephone`, `foundingDate`, EIN, tuition or enrollment
  figures in the JSON-LD.** None is in `src/data/`, and `seo.md`'s "do not invent" rule stands
  for everything this plan does not explicitly supply.
- **Adding an address to the `WebSite` JSON-LD on the home page or to `/compare/`.** Neither
  describes a single physical organization.
- **Rendering an address anywhere in the UI** — no street, ZIP, phone or map. The kicker's
  city is the only address the interface shows, and it is unchanged.
- **Locale-prefixed pre-rendered pages.** Still English-only by decision (`seo.md`).
- **Running `npm run deploy`.** User's call, every time.

## Steps

Single phase — this adds no user-facing text.

1. **Emit the address in the school JSON-LD** — in
   [`src/lib/head.ts`](src/lib/head.ts), inside the `route.name === 'school'` branch of
   `metaForRoute()`. Read the city next to the existing logo lookup (~line 106):

   ```ts
   const logo = BRANDS[school.slug]?.logo
   const city = BRANDS[school.slug]?.city
   ```

   Then add the `address` property to the returned `jsonLd` object, replacing the
   three-line "Only fields the repo can populate truthfully…" comment with one recording the
   new premise. The result should read:

   ```ts
   jsonLd: {
     '@context': 'https://schema.org',
     '@type': 'EducationalOrganization',
     name: school.name,
     url: SITE_ORIGIN + path,
     description,
     // Only fields the repo can populate truthfully — no geo, phone, founding
     // date or EIN, none of which exist in src/data/ (see "Out of scope" in
     // .claude/plans/seo.md). `city` is the exception that plan anticipated:
     // it is verified per-school data added in PR #180, traceable to
     // source-material/branding/_shared/. State is a constant because all
     // eleven schools are in NC — the same call the dossier kicker made.
     ...(city ? { address: { '@type': 'PostalAddress', addressLocality: city, addressRegion: 'NC', addressCountry: 'US' } } : {}),
     ...(logo ? { logo: SITE_ORIGIN + logo } : {}),
   },
   ```

   Note the `city ?` guard exists only because `BRANDS[slug]` may be `undefined` for a slug
   absent from `BRANDS` — it is a lookup guard, not an optional-field guard. Format the
   `address` object across multiple lines per Prettier; the single line above is for
   readability here.

2. **Assert the locality in `check:seo`** — in
   [`scripts/check_seo.mjs`](scripts/check_seo.mjs), extend the existing `if (route.school)`
   block (~line 129) that currently only checks the `@type`. Add an assertion that the
   pre-rendered HTML contains an `addressLocality` matching that school's `city` from
   `BRANDS`. The script already has `route.school` in scope; import `BRANDS` from
   `../src/data/brands.ts` if it is not already imported — **verify whether that import
   works under plain Node first**: `brands.ts` is a plain module with no `import.meta.glob`
   (unlike the six `*Program.ts` registries), so it should import cleanly, but confirm rather
   than assume. If it cannot be imported, parse the expected city out of the file the way
   `gen_data_schema.mjs` parses the card registries.

   Follow the file's existing `fail(...)` style and message voice — say what is wrong and why
   it matters, e.g.:

   ```js
   fail(`${route.path} — JSON-LD addressLocality is "${found}", expected "${expected}"`)
   ```

   A missing `address` entirely and a *wrong* city should both fail; the wrong-city case is
   the one this assertion exists for.

3. **Record the premise change in `seo.md`** — in
   [`.claude/plans/seo.md`](.claude/plans/seo.md), amend the "JSON-LD requiring data the repo
   does not have" bullet in *Out of scope* (line ~142). Do **not** delete it. Add a short
   parenthetical noting that PR #180 added a verified per-school `city` to `BRANDS`, that
   `addressLocality` + `addressRegion` shipped in this plan as a result, and that the rest of
   the bullet (geo, phone, founding data, EIN) still stands. The point is that a later reader
   finds a live record rather than a stale prohibition.

4. **Update the implementation notes in `bugFixSchoolLocation.md`** — its
   *"Second open question — still open"* section names this exact follow-up. Change it to
   record that it was planned and where, so the two documents do not disagree about whether it
   is outstanding.

## Files touched

| File | Change |
|---|---|
| `src/lib/head.ts` | edit — read `city` from `BRANDS`, emit `address` in the school JSON-LD, replace the stale comment |
| `scripts/check_seo.mjs` | edit — assert each school page's `addressLocality` equals its `BRANDS` city |
| `.claude/plans/seo.md` | edit — amend (do not delete) the out-of-scope bullet whose premise changed |
| `.claude/plans/bugFixSchoolLocation.md` | edit — mark the follow-up as planned |

No `src/data/` change: `city` already exists on all eleven `BRANDS` entries.

## Verification

- [ ] `npx tsc --noEmit` — clean.
- [ ] `npm run build` — succeeds. This chains `prerender`, `seo:files` and `check:seo`, so it
      exercises the new assertion against real pre-rendered output rather than a fixture.
- [ ] `npm run check:seo` — passes for all eleven school routes.
- [ ] **Confirm the assertion actually bites.** Temporarily change one school's `city` in
      `src/data/brands.ts` (or the expected value in the checker), re-run `npm run build`, and
      confirm `check:seo` **fails** naming that route — then revert. A new check that cannot
      fail is worse than no check, and this repo has a documented history of checkers parked
      at a permanent state nobody reads. Do not skip this step.
- [ ] **Read the generated JSON-LD out of `dist/` for all eleven schools** and confirm each
      locality. Expect Gastonia (`gaston-day`), Concord (`cannon`), Matthews
      (`carmel-christian` **and** `covenant-day` — check both; they are the shared-ZIP pair
      that makes fixing one and missing the other the easy error), Davidson (`davidson-day`),
      and Charlotte for the other six. For example:

      ```
      for d in dist/school/*/; do
        echo "$(basename $d): $(grep -o '"addressLocality": "[^"]*"' $d/index.html)"
      done
      ```

- [ ] **Validate the structured data shape**, not just its presence — paste one school's
      emitted JSON-LD into Google's Rich Results Test or the schema.org validator and confirm
      `PostalAddress` parses with no warnings. A syntactically valid JSON object can still be
      a malformed `PostalAddress`, and no local check can see that.
- [ ] `npm run check:schema` — passes. The `Brand` **type** is catalogued in `DATA-SCHEMA.md`,
      so this plan should *not* move it (no field is added). If this fails, something changed
      that this plan did not intend.
- [ ] **No browser check needed, unusually.** Nothing rendered changes — this is head
      metadata. The `dist/` inspection above is the equivalent verification, since the
      pre-rendered file is exactly what a crawler receives.

## Risks

| Risk | Mitigation |
|---|---|
| The address ships once, then silently disappears or goes stale in a later refactor | Step 2's `check:seo` assertion, verified to actually fail in the Verification section |
| `check_seo.mjs` cannot import `brands.ts` under plain Node | Step 2 says to confirm before relying on it, with the `gen_data_schema.mjs` source-parsing fallback named. `brands.ts` has no `import.meta.glob`, so this is unlikely |
| A future out-of-state school inherits `addressRegion: 'NC'` | Real but out of scope, and the same shape the kicker already has. A school outside NC is a deliberate change to both surfaces; noted here so it is found |
| Emitting an address invites scope creep into geo/phone/EIN | `seo.md`'s "do not invent" rule is preserved rather than deleted (step 3), and Out of scope names each field explicitly |

## Open questions

None. The one real decision — how much of the address to publish — was settled with the user
during planning: **city + state only** (2026-08-23), with full street + ZIP left available in
the committed source-material record for a later plan.
