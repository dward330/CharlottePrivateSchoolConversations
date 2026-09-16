# Design brief — "High School Placement" research area (PreK–8 schools)

**For:** Claude Design, project **"Charlotte School Compare Website Design"**.
**New page:** `High School Placement Section Redesign.dc.html` — page **12** in that
project, following the convention of the existing 11 (see
[`design-sync-urls.md`](design-sync-urls.md)).

**Direction: this is a DESIGN HANDOFF — design leads, code follows.** That is the reverse
of `design-sync-urls.md`'s normal direction, and it is the pre-approved direction under the
UX-design standard in `CLAUDE.md`. **Do not paste the sync messages from that doc for this
page** — there is no component to mirror yet. This page defines new UI.

Companion: [`prek8-shape-assessment.md`](prek8-shape-assessment.md) holds the decisions and
the verified data.

---

## 1. What this area is, and why it exists

A **PreK–8 school has no College Support area** (user decision, 2026-09-15 — see the
assessment §3.1). But the same parent question still needs answering, one stage earlier:

> **"Where does my kid go next, and how well is this school set up to get them there?"**

For a K–12 school that is *college*. For a PreK–8 school it is **high school** — and it is
arguably a *sharper* question, because choosing a PreK–8 school means committing to a second
admissions process four to nine years later.

**This area renders ONLY for schools with no high school.** Mechanism: a topic with no
`source-material/` folder does not render at all (`topicsForSchool()`,
`src/lib/manifest.ts:45`). No conditional belongs in a component.

**Model it on `College Support`,** which it structurally parallels:
- Component: `src/components/CollegeSupport.tsx`
- Styles: `src/index.css#L3290-L3665`
- Existing design page: `College Support Section Redesign.dc.html`
- Root type: `src/data/collegeSupport.ts:460` (`CollegeSupportProgram`)

Reuse its visual language wholesale. This should look like a sibling of that area, not a
new invention.

---

## 2. Card structure — 4 cards

College Support has 7; four of them have no PreK–8 analogue and are **dropped**
(`transcript`, `wholeClass`, `ncAdmissions` — the NC dashboard is keyed to *high schools*
so it is structurally N/A — and `edge`).

Proposed root type, mirroring `CollegeSupportProgram`:

```ts
export type HighSchoolPlacementProgram = {
  outcomes?: Outcomes      // 2a — Where Graduates Go
  placement?: Placement    // 2b — The Placement Program
  destinations?: Destinations // 2c — Where They Land  (see §3 — may fold into 2a)
  verdict?: Verdict        // 2d — Verdict & Visit Checklist
}
```

> **Card titles carry NO kicker line** — no `2a ·`, no `Topic 01 of 04`. Settled repo-wide.

### 2a — "Where Graduates Go"
*Parent question: does this school actually place kids well?*

The headline card. Contents, all from real Charlotte Prep data:

- **Stat strip (3–4 tiles).** e.g. `41` graduates (Class of 2026) · `97%` accepted to a
  top-two choice · `62` high schools attended by alumni · `15` accepted to every school
  they applied to.
- **Per-class rows**, one per graduating class — Class of 2026 (41 grads, 97%), 2025 (30
  grads), 2024. Each expands to the named destinations for that class.
- **A 10-year figure** where published (96%), clearly distinguished from the per-class one.

> ⚠️ **Every percentage MUST render beside its denominator.** 97% is **40 of 41**. The
> 10-year 96% has **no published denominator at all** and must be labelled as such. These
> are small cells, and a bare percentage off a small base is not publishable (standing rule).
> **Design the tile so the denominator has a place** — it is not an optional caption.

> ⚠️ **This is NOT an admit rate and NOT a matriculation list.** It is an
> *acceptance-to-top-two-choice* rate — a different statistic. The card must never be
> labelled or styled in a way that reads as either.

### 2b — "The Placement Program"
*Parent question: who actually helps my kid through this, and when?*

The analogue of `The Counseling Engine`. Charlotte Prep publishes a real program:
- An on-campus **high school fair, 40+ schools**, each September
- A **High School Placement Team** (members are **not named** — design must tolerate a
  role with no person attached)
- Individual student **and** parent meetings; a spring parent coffee
- **Interview skills taught in the 8th-grade Leadership class**; mock interviews
- Electronic transcript delivery

A timeline or step-ladder treatment fits this better than a roster, precisely because the
people are unnamed and the *process* is the substance.

### 2c — "Where They Land" (destination index)
*Parent question: which specific schools do kids actually go to?*

The analogue of the `Where Graduates Go` acceptance list. **50+ named destinations in four
published categories** — and the categories are the interesting part, because they are not
a ranking:

| Category | Count | Note |
|---|--:|---|
| Charlotte-area independent | 14 | **12 of these 14 are schools already in this app** |
| Charlotte-area public | 17 | Ardrey Kell, Myers Park, Marvin Ridge, … |
| Boarding | 13 | McCallie, Asheville School, Woodberry Forest, Interlochen, … |
| Other cities / countries | 12 | Sidwell Friends, Georgetown Day, American School in London, … |

**Design implications:**
- **Filter chips by category**, mirroring `COLLEGE_FILTERS` above the acceptance list.
- **The 12 in-app destinations should link to their own school pages.** This is a genuinely
  novel affordance — a *cross-link between two schools in the app* — and it is the single
  most valuable interaction available here. It exists in no current card; please design it.
- **No rank labels.** `collegeRankings.ts` / `rankLabelFor()` is a US News *college* table
  and has no high-school analogue. **Do not invent a ranking.** The four categories are the
  only classification, and they are the school's own.

> **Open design question for you:** should 2c be its own card, or a section inside 2a? The
> parallel with College Support (where buckets + acceptance list live in ONE `outcomes`
> card) argues for folding it in. Pick whichever reads better and say which you chose.

### 2d — "Verdict & Visit Checklist"
Reuse the existing `Verdict` type and treatment **unchanged**. Every structured area in the
app ends with one, and this needs no adaptation beyond its content.

---

## 3. What the data looks like

Real, verified Charlotte Prep values — design against these, not lorem ipsum:

- **Class of 2026:** 41 graduates · 97% accepted to one or both top-two choices · 15
  accepted to every school they applied to · destinations include Charlotte Christian,
  Charlotte Latin, Providence Day, Charlotte Country Day, Charlotte Catholic, Myers Park,
  South Meck, East Meck, Marvin Ridge, Providence HS, Walnut Hill School for the Arts,
  York Prep Academy, Carolina Day School.
- **Class of 2025:** 30 graduates · Cannon, Providence Day, Charlotte Latin, Charlotte
  Country Day, Myers Park, Providence HS, McCallie, Covenant Day, East Meck, Walnut Hill ·
  two **named merit scholarships** (Grant D. Williams Foundation Scholarship at Providence
  Day; Michaels-Dickson Scholar at McCallie) — so the design needs a **scholarship chip
  band**, as College Support's `outcomes` already has.
- **10-year:** 96% accepted to a top-two choice (**no denominator published**).
- **Alumni breadth:** 62 high schools attended · 23 private · 16 boarding.

---

## 4. Constraints — settled decisions, please don't reopen

Copied from `design-sync-urls.md` §C, plus two specific to this area:

- The app ships in **10 languages** (en, es, bn, ht, te, fr, fa, it, hi, ar), **two of them
  right-to-left**. Treat every visible string as a translatable key, not fixed copy. Adding
  a label costs nine translation passes — only add text the layout genuinely requires.
- **No "kicker" lines** above card titles — no `1a ·`, no `Topic 01 of 07`.
- **Keep the existing logo.** Never substitute a placeholder or monogram mark.
- Structured and prose cards share **one `.note-cards` grid** per topic section. Splitting
  them into two grids makes the rows collide.
- Per-school accent color comes from an **inline `--brand` custom property**. Don't
  hardcode a single accent.
- Figures are **localized at render time** from US-authored sources. Don't reformat, convert
  units, or restyle numbers in the mock.
- **NEW — no Compare affordance.** PreK–8 schools are excluded from the Compare page
  entirely (user decision). This area must show **no "Compare on this topic" button** and no
  Compare-style column treatment. It is a dossier-only surface.
- **NEW — stat tiles come from the topic's own data**, never from `VALUE_METRICS`. Follow
  the existing `AdmissionsStatBand` precedent (`SchoolDetail.tsx:913`), which does exactly
  this for the same reason.

---

## 5. What to hand back

A `.dc.html` artboard for `High School Placement Section Redesign.dc.html`, consistent with
the other 11 pages in the project, showing:

1. All four cards in their collapsed (teaser) and expanded states
2. The category filter chips on the destination index
3. The cross-link treatment for in-app destination schools
4. The stat tiles **with denominators visible**
5. The scholarship chip band

Design tokens to build from:
`https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/index.css#L1-L520`
Nearest sibling to match:
`https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/index.css#L3290-L3665`
(College Support) and its component
`https://github.com/dward330/CharlottePrivateSchoolConversations/blob/main/src/components/CollegeSupport.tsx`

If matching the existing system would mean substantially redrawing something, say so before
guessing.
