<!-- Copied 2026-10-11 from Claude Design project 5da24575-40bf-4787-8934-0fadfc56059f,
     file international-travel-handoff-instructions.md. Where this note and the user's
     /plan instruction disagree (placement), the plan's Decisions section wins. -->

# International Travel research area — new section for ALL schools

The design file "International Travel Section Redesign.dc.html" defines a new research area, **International Travel**, added to every school dossier (rail item, chip, and section, after Summer Programs / before Financial Aid, or wherever research areas are ordered). Providence Day is the reference build.

## Section structure (in this order)

1. **Section header** — plane icon, "International Travel" h2, "Compare on International Travel" button (no podcast row unless an episode exists).
2. **Lead line** — one bold sentence summarizing the program + one muted supporting quote from the school.
3. **Stat strip (4 cells)** — the headline numbers a parent sees first. PD: ~19 countries & territories (our tally), 8 exchange partners, 1st Global Studies Diploma (school claim), 280+ Round Square schools. Pick the four strongest verifiable numbers per school; label any figure that is our own count.
4. **Seven topic cards** (collapsible `details.topic`), parent-priority order:
   - **1a · Where They Go** (full width) — trip ledger grouped by school year, newest first; filter tabs All / Middle / Upper; each row: destination, place/program, theme, division + group size tag, timing tag, Homestay tag. Side column: trip photo + "Also on the record" (endowed/recurring trips, domestic trips, historical trips).
   - **1b · When Your Child Can Start** — program framework cells, division ladder (LS / MS / US with the school's own theme line), and the world-language path.
   - **1c · Exchanges & Homestays** — partner-school grid (country · years, school, outbound, inbound), exchange photo, "Living with a family" list (trip homestays + students hosted on campus).
   - **1d · Credential** (PD: The Global Studies Diploma) — 3-cell stat strip, required coursework, co-curricular requirements, one student quote, named award.
   - **1e · Network** (PD: Round Square & the Wider Network) — conference ledger by year, Postcards / Big Builds / speakers cells, faculty travel, memberships, external recognition.
   - **1f · Signing Up** — registration and info-session calendar entries for all families on the left, credential-specific dates (e.g. GSD orientation) on the right, as dated agenda rows. Travel-aid funds are not shown here; open cost/aid questions go to 1g.
   - **1g · Verdict & Ask the School** (full width) — "Where it stands out" checkmarks on the left; tickable "Ask on the tour" questions on the right.

Open cards span the full grid width; closed cards sit two-up and collapse to one column on phones.

## Data rules

- Use the school's deep-research output only. Keep the source URL for every fact; each card ends with a SOURCE row (the PD build uses generic providenceday.org links until per-fact URLs are ingested).
- **Gaps go to 1g only.** Unpublished items (starting grade, current trip list, cost, aid eligibility, selection, safety policies, scale) become "Ask on the tour" questions. Don't put "not published" tags in cards 1a–1f.
- Where official figures conflict, show the range and say the sources differ (e.g. "250–325+ graduates — school pages give different totals").
- Mark our own tallies as ours ("our count from the school's Global Map").
- Retitle 1d/1e to the school's real credential and network (e.g. "The IB Diploma", "Sister Schools & Exchanges"). If a school has no credential or network, drop that card. Never render a card with placeholder content.
- **Photos:** 1a (students on a trip) and 1c (exchange / host family). Use real photos of that school; if none, remove the figure and let the adjacent column fill the width.
- Trip rows: only include fields the source states. Leave timing / homestay tags off when not stated rather than writing "Not stated".

## Design

Industry design system (blueprint frames, Barlow Condensed / Barlow, steel accent, duotone photos) with the dossier's `--brand` color. Match the reference file's markup: `details.topic.blueprint`, divider-gap grids, `.depttab` filters, `.tag` variants, `.srcrow`. All grids use `repeat(auto-fit, minmax(min(100%, Npx), 1fr))` or wrapping flex so the section reflows to 390px; filter tabs are at least 40px tall.
