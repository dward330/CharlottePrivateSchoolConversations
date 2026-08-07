# Claude Design — sync URLs for the design pages

Ready-to-paste messages for updating the Claude Design project
("Charlotte School Compare Website Design") so its `.dc.html` pages match the
shipped app.

**Direction of this sync: design follows code.** These messages ask Claude Design
to update its mocks to reflect what the app now looks like. If you want the
reverse (code follows a new design), don't paste these — that's a design handoff,
which is pre-approved to change the UX under the UX-design standard in
`CLAUDE.md`.

Repo is **public**, so raw GitHub file URLs work without auth:
`https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/<path>`

`src/index.css` is 4,328 lines — one stylesheet for the whole app. The per-page
messages below use `#L<start>-L<end>` fragments so Claude Design reads only the
relevant block plus the shared tokens, rather than the entire file.

---

## Section A — the one message that updates ALL pages at once

Paste this as a single message into the Claude Design conversation.

```
I want to update every page in this design project to match the current live web
app. The app is a public GitHub repo, so you can read the real components and
styles rather than working from screenshots.

Repo: https://github.com/dward330/CharlottePrivateSchoolConversations

The design system itself lives in one stylesheet. Read this first — it's the
source of truth for type, color, spacing and the card primitives, and every page
below is built from it:

  Design tokens + base + shell + primitives:
  https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/index.css#L1-L520

Then here is each design page mapped to its implementation. Please update each
.dc.html to match its component's real structure and content:

1. Home.dc.html
   Component: https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/pages/Home.tsx
   Styles:    https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/index.css#L521-L632

2. Compare Schools.dc.html
   Component: https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/pages/Compare.tsx
   Styles:    https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/index.css#L1663-L1914
   Also:      https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/components/CellQual.tsx

3. Providence Day School.dc.html  (the school detail / "dossier" page)
   Component: https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/pages/SchoolDetail.tsx
   Styles:    https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/index.css#L633-L1120

4. Sports Section Redesign.dc.html
   Component: https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/components/SportsProgram.tsx
   Styles:    https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/index.css#L2232-L2705

5. Arts Section Redesign.dc.html
   Component: https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/components/ArtsProgram.tsx
   Styles:    https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/index.css#L2706-L3061

6. Clubs Section Redesign.dc.html
   Component: https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/components/ClubsProgram.tsx
   Styles:    https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/index.css#L3062-L3289

7. College Support Section Redesign.dc.html
   Component: https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/components/CollegeSupport.tsx
   Styles:    https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/index.css#L3290-L3665

8. After School Section Redesign.dc.html
   Component: https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/components/AfterSchool.tsx
   Styles:    https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/index.css#L3666-L4328

9. Financial Aid & Tuition.dc.html
   Component: https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/components/FinancialAidReport.tsx
   Styles:    https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/index.css#L1121-L1461

10. Academic Clubs Expand Options.dc.html
    Component: https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/components/ClubClusters.tsx
    Styles:    https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/index.css#L1462-L1525

11. Club Catalog Expand Options.dc.html
    Component: https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/components/ClubCatalog.tsx
    Styles:    https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/index.css#L1526-L1662

Intent: match the shipped implementation's structure and content. The styling
already came from this design system, so where the app and the mock disagree on
layout or content, the app is correct and the mock should follow it.

Constraints — these are settled decisions in the codebase, please don't reopen
them:

- The app ships in 10 languages (en, es, bn, ht, te, fr, fa, it, hi, ar), two of
  them right-to-left. Treat every visible string as a translatable key, not fixed
  copy. Adding a new label costs nine translation passes, so only add text the
  layout genuinely requires.
- No "kicker" lines above card titles — no "1a ·", no "Topic 01 of 07". The
  research-area cards deliberately have none.
- Keep the existing logo. Don't substitute a placeholder or monogram mark.
- Structured cards and prose cards must share a single `.note-cards` grid per
  topic section. Splitting them into two grids makes the rows collide.
- Per-school accent color comes from a `--brand` custom property set inline per
  element. Don't hardcode a single accent.
- Numbers and currency are localized at render time from US-authored source
  figures. Don't restyle or reformat figures in the mock.

If a page's real implementation has diverged enough that matching it would mean
substantially redrawing the mock, tell me before doing it rather than guessing.
```

---

## Section B — per-page messages

Use one of these when you only want to re-sync a single page. Paste the
constraints block (Section C) once per conversation; you don't need to repeat it
on every message.

### Home.dc.html

```
Update Home.dc.html to match the live implementation.

Component: https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/pages/Home.tsx
Styles:    https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/index.css#L521-L632
Tokens:    https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/index.css#L1-L520

Intent: match the shipped structure and content; the app is correct where it and
the mock disagree.
```

### Compare Schools.dc.html

```
Update Compare Schools.dc.html to match the live implementation.

Component: https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/pages/Compare.tsx
Cell popover: https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/components/CellQual.tsx
Styles:    https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/index.css#L1663-L1914
Tokens:    https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/index.css#L1-L520

Note: the table gained per-cell provenance tooltips and a US-organizations row
since the mock was drawn. Every table header is scoped for accessibility.

Intent: match the shipped structure and content.
```

### Providence Day School.dc.html (school detail page)

```
Update Providence Day School.dc.html to match the live implementation.

Component: https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/pages/SchoolDetail.tsx
Styles:    https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/index.css#L633-L1120
Tokens:    https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/index.css#L1-L520

Note: this page composes all the section components as collapsible cards, so its
mock should show the page shell, nav and card grid — the individual sections have
their own design pages.

Intent: match the shipped structure and content.
```

### Sports Section Redesign.dc.html

```
Update Sports Section Redesign.dc.html to match the live implementation.

Component: https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/components/SportsProgram.tsx
Styles:    https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/index.css#L2232-L2705
Tokens:    https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/index.css#L1-L520

Intent: match the shipped structure and content.
```

### Arts Section Redesign.dc.html

```
Update Arts Section Redesign.dc.html to match the live implementation.

Component: https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/components/ArtsProgram.tsx
Styles:    https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/index.css#L2706-L3061
Tokens:    https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/index.css#L1-L520

Intent: match the shipped structure and content.
```

### Clubs Section Redesign.dc.html

```
Update Clubs Section Redesign.dc.html to match the live implementation.

Component: https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/components/ClubsProgram.tsx
Styles:    https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/index.css#L3062-L3289
Tokens:    https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/index.css#L1-L520

Note: these cards show only NOT-A-CLUB flags; GAP and COUNT flags are filtered
out at render even though the data retains them. Don't surface them in the mock.

Intent: match the shipped structure and content.
```

### College Support Section Redesign.dc.html

```
Update College Support Section Redesign.dc.html to match the live implementation.

Component: https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/components/CollegeSupport.tsx
Styles:    https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/index.css#L3290-L3665
Tokens:    https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/index.css#L1-L520

Intent: match the shipped structure and content.
```

### After School Section Redesign.dc.html

```
Update After School Section Redesign.dc.html to match the live implementation.

Component: https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/components/AfterSchool.tsx
Styles:    https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/index.css#L3666-L4328
Tokens:    https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/index.css#L1-L520

Intent: match the shipped structure and content.
```

### Financial Aid & Tuition.dc.html

```
Update Financial Aid & Tuition.dc.html to match the live implementation.

Component: https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/components/FinancialAidReport.tsx
Styles:    https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/index.css#L1121-L1461
Tokens:    https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/index.css#L1-L520

Note: tuition and aid figures are authored US-style and re-formatted per locale
at render time. Keep figures as-is in the mock — don't reformat or convert them.

Intent: match the shipped structure and content.
```

### Academic Clubs Expand Options.dc.html

```
Update Academic Clubs Expand Options.dc.html to match the live implementation.

Component: https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/components/ClubClusters.tsx
Styles:    https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/index.css#L1462-L1525
Tokens:    https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/index.css#L1-L520

Intent: match the shipped structure and content.
```

### Club Catalog Expand Options.dc.html

```
Update Club Catalog Expand Options.dc.html to match the live implementation.

Component: https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/components/ClubCatalog.tsx
Styles:    https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/index.css#L1526-L1662
Tokens:    https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/index.css#L1-L520

Intent: match the shipped structure and content.
```

---

## Section C — the constraints block

Paste once per Claude Design conversation, alongside the first message.

```
Constraints — settled decisions in the codebase, please don't reopen them:

- The app ships in 10 languages (en, es, bn, ht, te, fr, fa, it, hi, ar), two of
  them right-to-left. Treat every visible string as a translatable key, not fixed
  copy. Adding a label costs nine translation passes.
- No "kicker" lines above card titles — no "1a ·", no "Topic 01 of 07".
- Keep the existing logo; don't substitute a placeholder or monogram.
- Structured and prose cards share one `.note-cards` grid per topic section.
- Per-school accent color comes from an inline `--brand` custom property.
- Figures are localized at render time from US-authored sources; don't reformat.
```

---

## Reference — CSS line ranges

Derived from the section banners in `src/index.css` (4,328 lines total). These
shift whenever the stylesheet is edited; re-derive with:

```
grep -n '^/\* =\|^/\* -\{3,\}' src/index.css
```

| Lines | Block |
|---|---|
| 1–520 | Design tokens, base, shell, primitives (**shared — always include**) |
| 521–632 | Home hero |
| 633–1120 | School detail ("dossier") + welcome video + structured prose |
| 1121–1461 | Financial aid deep-dive report |
| 1462–1525 | Academic & competitive clubs (layered) |
| 1526–1662 | Club catalog (interest index) |
| 1663–1914 | Compare table + per-cell provenance popover |
| 1915–2231 | Back-to-top, breakpoints, print |
| 2232–2705 | Sports |
| 2706–3061 | Arts |
| 3062–3289 | Student Clubs |
| 3290–3665 | College Support |
| 3666–4328 | After School |

Each of those section banners names the Claude Design page it was recreated from,
which is where this mapping comes from — it isn't guesswork.
