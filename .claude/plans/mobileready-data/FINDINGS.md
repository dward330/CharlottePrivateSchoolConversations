# Mobile-readiness findings — 2026-10-09

Produced while planning [`mobileready`](../mobileready.md). Every school page was
loaded from a `vite preview` build of `main` at `f429654d`, with Playwright
(`isMobile`, touch) at 320 / 360 / 390px, after scrolling to trigger lazy
sections, **opening every `<details>`** and clicking every admissions band tab.
Script: [`mobile_audit.mjs`](mobile_audit.mjs) (`GRIDFIX=1` injects the step-2
fix). Roll-up: [`summarize.mjs`](summarize.mjs). Slimmed raw data:
`findings-*.json`.

## As shipped — every school page scrolls sideways once cards are opened

The card grid track (`.note-cards`, `grid-template-columns: 1fr` at ≤900px)
grows to its widest opened child, which widens every card in that area.
Document width at a 390px viewport, all cards open:

| School | Page width | Overflow |
|---|---|---|
| Cannon School | 756px | +366px |
| Carmel Christian School | 728px | +338px |
| Charlotte Catholic High School | 718px | +328px |
| Charlotte Christian School | 718px | +328px |
| Charlotte Country Day School | 826px | +436px |
| Charlotte Latin School | 718px | +328px |
| Covenant Day School | 718px | +328px |
| Davidson Day School | 778px | +388px |
| Gaston Day School | 2366px | +1976px |
| Hickory Grove Christian School | 718px | +328px |
| Providence Day School | 732px | +342px |
| Trinity Episcopal School | 678px | +288px |

The worst is Gaston Day, driven by the 2,306px-wide *Named scholarships* prose
table (a 246-character `nowrap` cell). Measured on Providence Day at 375px: with all
cards **closed** the page is exactly viewport width (the track is 345px); opened,
the track is 604–716px in six areas.

## With the grid fix injected — the cards at fault

Remaining document overflow with the fix: +135px at 320, +95px at 360, and
+67…+87px at 390 on 11 schools. **Trinity Episcopal is 0.** It comes from the two College
Support cards below (`.cs-split` grows to a 420px ledger) plus, on Providence Day,
the Coverage Map summer row.

### Broken — content past the screen edge or cut off (29 cards)

Measured with the step-2 grid fix injected, so each card is held to phone width and these are the cards at fault on their own. Format: card, then each failing element (overflow in px @ widths where it fails).

- **Cannon School - After School - The Coverage Map**  
  clipped: span.as-tl-tier (+230px @320/360/390); clipped-text: span.as-tl-tier (+118px @320/360/390)
- **Cannon School - College Support - Where Graduates Go**  
  page-overflow: div (+135px @320/360/390); text-overflow: button.cs-filter (+59px @320/360); text-overflow: div.cs-count (+49px @320/360); text-overflow: span.tag-neutral (+25px @320)
- **Carmel Christian School - College Support - Where Graduates Go**  
  page-overflow: div (+135px @320/360/390); text-overflow: button.cs-filter (+59px @320/360); text-overflow: div.cs-count (+107px @320/360/390); text-overflow: span.tag-neutral (+150px @320/360/390)
- **Charlotte Catholic High School - College Support - The Transcript Colleges See**  
  page-overflow: div (+135px @320/360/390); text-overflow: div.cs-h (+84px @320/360/390); text-overflow: p.cs-note (+113px @320/360/390); text-overflow: span (+135px @320/360/390)
- **Charlotte Catholic High School - College Support - Where Graduates Go**  
  page-overflow: div (+135px @320/360/390); text-overflow: div.cs-h (+17px @320); text-overflow: span.cs-h-hint (+3px @320); text-overflow: button.cs-filter (+59px @320/360); text-overflow: div.cs-count (+82px @320/360/390)
- **Charlotte Christian School - After School - The Coverage Map**  
  clipped: div.as-tl-band (+57px @320/360); clipped: span.as-tl-tier (+158px @320/360/390); clipped-text: span.as-tl-price (+18px @320); clipped-text: span.as-tl-tier (+118px @320/360/390)
- **Charlotte Christian School - College Support - The Transcript Colleges See**  
  page-overflow: div (+135px @320/360/390); text-overflow: p.cs-note (+125px @320/360/390); text-overflow: span (+135px @320/360/390); text-overflow: strong (+85px @320/360/390)
- **Charlotte Christian School - College Support - Where Graduates Go**  
  page-overflow: div (+135px @320/360/390); text-overflow: button.cs-filter (+59px @320/360); text-overflow: div.cs-count (+51px @320/360); text-overflow: span.tag-neutral (+56px @320/360)
- **Charlotte Country Day School - After School - The Coverage Map**  
  clipped: span.as-tl-tier (+181px @320/360/390); clipped-text: span.as-tl-tier (+141px @320/360/390)
- **Charlotte Country Day School - College Support - The Transcript Colleges See**  
  page-overflow: div (+135px @320/360/390); text-overflow: p.cs-note (+131px @320/360/390); text-overflow: span (+132px @320/360/390); text-overflow: strong (+110px @320/360/390)
- **Charlotte Country Day School - College Support - Where Graduates Go**  
  page-overflow: div (+135px @320/360/390); text-overflow: button.cs-filter (+59px @320/360); text-overflow: div.cs-count (+53px @320/360); text-overflow: span.tag-neutral (+155px @320/360/390)
- **Charlotte Latin School - After School - The Coverage Map**  
  clipped: div.as-tl-band (+4px @320); clipped: span.as-tl-tier (+199px @320/360/390); clipped-text: span.as-tl-tier (+159px @320/360/390)
- **Charlotte Latin School - College Support - The Transcript Colleges See**  
  page-overflow: div (+135px @320/360/390); text-overflow: p.cs-note (+118px @320/360/390); text-overflow: span (+132px @320/360/390); text-overflow: strong (+135px @320/360/390)
- **Charlotte Latin School - College Support - Where Graduates Go**  
  page-overflow: div (+135px @320/360/390); text-overflow: button.cs-filter (+59px @320/360); text-overflow: div.cs-count (+57px @320/360); text-overflow: span.tag-neutral (+28px @320)
- **Covenant Day School - After School - The Coverage Map**  
  clipped: div.as-tl-band (+89px @320/360/390); clipped: span.as-tl-tier (+225px @320/360/390); clipped-text: span.as-tl-price (+49px @320/360); clipped-text: span.as-tl-tier (+185px @320/360/390)
- **Covenant Day School - College Support - The Transcript Colleges See**  
  page-overflow: div (+135px @320/360/390); text-overflow: div.cs-h (+18px @320); text-overflow: p.cs-note (+132px @320/360/390); text-overflow: span (+132px @320/360/390)
- **Covenant Day School - College Support - Where Graduates Go**  
  page-overflow: div (+135px @320/360/390); text-overflow: button.cs-filter (+59px @320/360); text-overflow: div.cs-count (+38px @320); text-overflow: span.tag-accent (+140px @320/360/390); text-overflow: span.tag-neutral (+150px @320/360/390)
- **Davidson Day School - After School - The Coverage Map**  
  clipped: span.as-tl-tier (+154px @320/360/390); clipped-text: span.as-tl-tier (+115px @320/360/390)
- **Davidson Day School - College Support - Where Graduates Go**  
  page-overflow: div (+135px @320/360/390); text-overflow: button.cs-filter (+59px @320/360); text-overflow: div.cs-count (+4px @320)
- **Gaston Day School - After School - The Coverage Map**  
  clipped: span.as-tl-tier (+111px @320/360/390); clipped-text: span.as-tl-tier (+72px @320/360/390)
- **Gaston Day School - College Support - The Transcript Colleges See**  
  page-overflow: div (+135px @320/360/390); text-overflow: div.cs-h (+75px @320/360/390); text-overflow: p.cs-note (+127px @320/360/390); text-overflow: span (+134px @320/360/390); text-overflow: strong (+132px @320/360/390)
- **Gaston Day School - College Support - Where Graduates Go**  
  page-overflow: div (+135px @320/360/390); text-overflow: div.cs-h (+41px @320/360); text-overflow: button.cs-filter (+59px @320/360)
- **Hickory Grove Christian School - After School - The Coverage Map**  
  clipped: span.as-tl-tier (+68px @320/360/390); clipped-text: span.as-tl-tier (+12px @320)
- **Hickory Grove Christian School - College Support - The Transcript Colleges See**  
  page-overflow: div (+135px @320/360/390); text-overflow: div.cs-h (+58px @320/360); text-overflow: p.cs-note (+132px @320/360/390); text-overflow: strong (+73px @320/360/390); text-overflow: span (+130px @320/360/390)
- **Hickory Grove Christian School - College Support - Where Graduates Go**  
  page-overflow: div (+135px @320/360/390); text-overflow: span.cs-h-hint (+44px @320/360); text-overflow: button.cs-filter (+54px @320/360); text-overflow: div.cs-count (+95px @320/360/390); text-overflow: span.tag-neutral (+74px @320/360/390)
- **Providence Day School - After School - The Coverage Map**  
  clipped: span.as-tl-tier (+191px @320/360/390); page-overflow: div.as-summer (+63px @320/360); clipped-text: span.as-tl-tier (+152px @320/360/390); text-overflow: strong (+48px @320/360); text-overflow: span (+50px @320/360)
- **Providence Day School - College Support - The Transcript Colleges See**  
  page-overflow: div (+135px @320/360/390); text-overflow: p.cs-note (+123px @320/360/390); text-overflow: span (+120px @320/360/390); text-overflow: strong (+90px @320/360/390)
- **Providence Day School - College Support - Where Graduates Go**  
  page-overflow: div (+135px @320/360/390); text-overflow: button.cs-filter (+59px @320/360); text-overflow: div.cs-count (+55px @320/360)
- **Trinity Episcopal School - After School - The Coverage Map**  
  clipped: span.as-tl-tier (+290px @320/360/390); clipped-text: span.as-tl-tier (+243px @320/360/390)

### Degraded — usable, needs a sideways swipe (110 cards)

- Cannon School - After School - A Day Inside + Enrichment — inner-scroll: div.as-scroll (+39px @320)
- Cannon School - After School - The Cost Planner — inner-scroll: div.as-table-wrap (+270px @320/360/390)
- Cannon School - College Support - Admission Rates at the Top NC Public Universities — inner-scroll: div.cs-ledger-wrap (+410px @320/360/390)
- Cannon School - College Support - Whole Class Analytics — inner-scroll: div.cs-ledger-wrap (+370px @320/360/390)
- Cannon School - Financial Aid & Tuition - Tuition History & Sources — inner-scroll: div.prose-table-wrap (+447px @320/360/390)
- Cannon School - Sports - The College Pipeline — inner-scroll: div.sports-scroll (+372px @320/360/390)
- Cannon School - Sports - Winning Record — inner-scroll: div.sports-scroll (+392px @320/360/390)
- Cannon School - Student Clubs - Honor Societies — inner-scroll: div.clubs-ledger-wrap (+370px @320/360/390)
- Cannon School - Summer Programs - The Camp Catalog — inner-scroll: div.as-scroll (+312px @320/360/390)
- Cannon School - Summer Programs - The Summer Cost Planner — inner-scroll: div.as-table-wrap (+270px @320/360/390)
- Cannon School - The Arts - Theatre & the Blumeys — inner-scroll: div.arts-scroll (+312px @320/360/390)
- Carmel Christian School - After School - The Cost Planner — inner-scroll: div.as-table-wrap (+240px @320/360/390)
- Carmel Christian School - College Support - Admission Rates at the Top NC Public Universities — inner-scroll: div.cs-ledger-wrap (+410px @320/360/390)
- Carmel Christian School - College Support - Whole Class Analytics — inner-scroll: div.cs-ledger-wrap (+370px @320/360/390)
- Carmel Christian School - Sports - The College Pipeline — inner-scroll: div.sports-scroll (+372px @320/360/390)
- Carmel Christian School - Sports - Winning Record — inner-scroll: div.sports-scroll (+421px @320/360/390)
- Carmel Christian School - Student Clubs - Honor Societies — inner-scroll: div.clubs-ledger-wrap (+370px @320/360/390)
- Carmel Christian School - Summer Programs - The Camp Catalog — inner-scroll: div.as-scroll (+312px @320/360/390)
- Carmel Christian School - Summer Programs - The Summer Cost Planner — inner-scroll: div.as-table-wrap (+270px @320/360/390)
- Carmel Christian School - The Arts - Theatre & the Blumeys — inner-scroll: div.arts-scroll (+312px @320/360/390)
- Charlotte Catholic High School - College Support - Admission Rates at the Top NC Public Universities — inner-scroll: div.cs-ledger-wrap (+410px @320/360/390)
- Charlotte Catholic High School - College Support - Whole Class Analytics — inner-scroll: div.cs-ledger-wrap (+370px @320/360/390)
- Charlotte Catholic High School - Financial Aid & Tuition - Fees — inner-scroll: div.prose-table-wrap (+118px @320/360/390)
- Charlotte Catholic High School - Sports - The College Pipeline — inner-scroll: div.sports-scroll (+372px @320/360/390)
- Charlotte Catholic High School - Sports - Winning Record — inner-scroll: div.sports-scroll (+392px @320/360/390)
- Charlotte Catholic High School - Student Clubs - Honor Societies — inner-scroll: div.clubs-ledger-wrap (+370px @320/360/390)
- Charlotte Catholic High School - Summer Programs - The Camp Catalog — inner-scroll: div.as-scroll (+358px @320/360/390)
- Charlotte Catholic High School - The Arts - Theatre & the Blumeys — inner-scroll: div.arts-scroll (+312px @320/360/390)
- Charlotte Christian School - Admissions - Grade-by-Grade Application Guide — JK/K · 1 · 2–4 · 5–12 — inner-scroll: div.table-wrap (+238px @320/360/390)
- Charlotte Christian School - After School - The Cost Planner — inner-scroll: div.as-table-wrap (+270px @320/360/390)
- Charlotte Christian School - College Support - Admission Rates at the Top NC Public Universities — inner-scroll: div.cs-ledger-wrap (+410px @320/360/390)
- Charlotte Christian School - College Support - Whole Class Analytics — inner-scroll: div.cs-ledger-wrap (+370px @320/360/390)
- Charlotte Christian School - Sports - The College Pipeline — inner-scroll: div.sports-scroll (+372px @320/360/390)
- Charlotte Christian School - Sports - Winning Record — inner-scroll: div.sports-scroll (+392px @320/360/390)
- Charlotte Christian School - Student Clubs - Honor Societies — inner-scroll: div.clubs-ledger-wrap (+370px @320/360/390)
- Charlotte Christian School - Summer Programs - The Camp Catalog — inner-scroll: div.as-scroll (+312px @320/360/390)
- Charlotte Christian School - Summer Programs - The Summer Cost Planner — inner-scroll: div.as-table-wrap (+270px @320/360/390)
- Charlotte Christian School - The Arts - Theatre, the Blumeys & CITA — inner-scroll: div.arts-scroll (+312px @320/360/390)
- Charlotte Country Day School - Admissions - Grade-by-Grade Application Guide — JK/K · 1–4 · 5–12 — inner-scroll: div.table-wrap (+130px @320/360/390)
- Charlotte Country Day School - After School - The Cost Planner — inner-scroll: div.as-table-wrap (+270px @320/360/390)
- Charlotte Country Day School - College Support - Admission Rates at the Top NC Public Universities — inner-scroll: div.cs-ledger-wrap (+410px @320/360/390)
- Charlotte Country Day School - College Support - Whole Class Analytics — inner-scroll: div.cs-ledger-wrap (+370px @320/360/390)
- Charlotte Country Day School - Financial Aid & Tuition - Tuition History & Sources — inner-scroll: div.prose-table-wrap (+391px @320/360/390)
- Charlotte Country Day School - Sports - The College Pipeline — inner-scroll: div.sports-scroll (+372px @320/360/390)
- Charlotte Country Day School - Sports - Winning Record — inner-scroll: div.sports-scroll (+392px @320/360/390)
- Charlotte Country Day School - Student Clubs - Honor Societies — inner-scroll: div.clubs-ledger-wrap (+370px @320/360/390)
- Charlotte Country Day School - Summer Programs - The Camp Catalog — inner-scroll: div.as-scroll (+518px @320/360/390)
- Charlotte Country Day School - Summer Programs - The Summer Cost Planner — inner-scroll: div.as-table-wrap (+270px @320/360/390)
- Charlotte Country Day School - The Arts - Theatre & the Blumeys — inner-scroll: div.arts-scroll (+312px @320/360/390)
- Charlotte Latin School - Admissions - Grade-by-Grade Application Guide — TK/K · 1–5 · 6–12 — inner-scroll: div.table-wrap (+166px @320/360/390)
- Charlotte Latin School - After School - The Cost Planner — inner-scroll: div.as-table-wrap (+270px @320/360/390)
- Charlotte Latin School - College Support - Admission Rates at the Top NC Public Universities — inner-scroll: div.cs-ledger-wrap (+410px @320/360/390)
- Charlotte Latin School - Sports - The College Pipeline — inner-scroll: div.sports-scroll (+372px @320/360/390)
- Charlotte Latin School - Sports - Winning Record — inner-scroll: div.sports-scroll (+393px @320/360/390)
- Charlotte Latin School - Student Clubs - Club Catalog & Overview — inner-scroll: div.catalog-scroll (+16px @320)
- Charlotte Latin School - Student Clubs - Honor Societies — inner-scroll: div.clubs-ledger-wrap (+370px @320/360/390)
- Charlotte Latin School - Summer Programs - The Camp Catalog — inner-scroll: div.as-scroll (+312px @320/360/390)
- Charlotte Latin School - Summer Programs - The Summer Cost Planner — inner-scroll: div.as-table-wrap (+270px @320/360/390)
- Charlotte Latin School - The Arts - Theatre & the Blumeys — inner-scroll: div.arts-scroll (+312px @320/360/390)
- Covenant Day School - Admissions - Grade-by-Grade Application Guide — JK/K · 1–5 · 6–11 — inner-scroll: div.table-wrap (+156px @320/360/390)
- Covenant Day School - After School - The Cost Planner — inner-scroll: div.as-table-wrap (+270px @320/360/390)
- Covenant Day School - College Support - Admission Rates at the Top NC Public Universities — inner-scroll: div.cs-ledger-wrap (+410px @320/360/390)
- Covenant Day School - College Support - Whole Class Analytics — inner-scroll: div.cs-ledger-wrap (+370px @320/360/390)
- Covenant Day School - Financial Aid & Tuition - Tuition History & Sources — inner-scroll: div.prose-table-wrap (+252px @320/360/390)
- Covenant Day School - Sports - The College Pipeline — inner-scroll: div.sports-scroll (+372px @320/360/390)
- Covenant Day School - Sports - Winning Record — inner-scroll: div.sports-scroll (+392px @320/360/390)
- Covenant Day School - Student Clubs - Honor Societies — inner-scroll: div.clubs-ledger-wrap (+370px @320/360/390)
- Covenant Day School - Summer Programs - The Camp Catalog — inner-scroll: div.as-scroll (+312px @320/360/390)
- Covenant Day School - Summer Programs - The Summer Cost Planner — inner-scroll: div.as-table-wrap (+270px @320/360/390)
- Covenant Day School - The Arts - Theatre & the Blumeys — inner-scroll: div.arts-scroll (+312px @320/360/390)
- Davidson Day School - College Support - Admission Rates at the Top NC Public Universities — inner-scroll: div.cs-ledger-wrap (+410px @320/360/390)
- Davidson Day School - Financial Aid & Tuition - Tuition History & Sources — inner-scroll: div.prose-table-wrap (+470px @320/360/390)
- Davidson Day School - Sports - The College Pipeline — inner-scroll: div.sports-scroll (+372px @320/360/390)
- Davidson Day School - Sports - Winning Record — inner-scroll: div.sports-scroll (+397px @320/360/390)
- Davidson Day School - The Arts - Theatre & External Recognition — inner-scroll: div.arts-scroll (+312px @320/360/390)
- Gaston Day School - After School - The Cost Planner — inner-scroll: div.as-table-wrap (+270px @320/360/390)
- Gaston Day School - College Support - Admission Rates at the Top NC Public Universities — inner-scroll: div.cs-ledger-wrap (+410px @320/360/390)
- Gaston Day School - College Support - Whole Class Analytics — inner-scroll: div.cs-ledger-wrap (+370px @320/360/390)
- Gaston Day School - Financial Aid & Tuition - Named scholarships — inner-scroll: div.prose-table-wrap (+2058px @320/360/390)
- Gaston Day School - Sports - Winning Record — inner-scroll: div.sports-scroll (+392px @320/360/390)
- Gaston Day School - Student Clubs - Honor Societies — inner-scroll: div.clubs-ledger-wrap (+370px @320/360/390)
- Gaston Day School - Summer Programs - The Camp Catalog — inner-scroll: div.as-scroll (+389px @320/360/390)
- Gaston Day School - Summer Programs - The Summer Cost Planner — inner-scroll: div.as-table-wrap (+270px @320/360/390)
- Hickory Grove Christian School - Admissions - Grade-by-Grade Application Guide — TK/K5 · 1–5 · 6–8 · 9–12 · International — inner-scroll: div.table-wrap (+393px @320/360/390)
- Hickory Grove Christian School - College Support - Admission Rates at the Top NC Public Universities — inner-scroll: div.cs-ledger-wrap (+410px @320/360/390)
- Hickory Grove Christian School - College Support - Whole Class Analytics — inner-scroll: div.cs-ledger-wrap (+370px @320/360/390)
- Hickory Grove Christian School - Sports - The College Pipeline — inner-scroll: div.sports-scroll (+372px @320/360/390)
- Hickory Grove Christian School - Sports - Winning Record — inner-scroll: div.sports-scroll (+392px @320/360/390)
- Hickory Grove Christian School - Student Clubs - Club Catalog & Overview — inner-scroll: div.catalog-scroll (+43px @320/360)
- Hickory Grove Christian School - Student Clubs - Honor Societies — inner-scroll: div.clubs-ledger-wrap (+370px @320/360/390)
- Hickory Grove Christian School - Summer Programs - The Camp Catalog — inner-scroll: div.as-scroll (+312px @320/360/390)
- Hickory Grove Christian School - The Arts - Theatre & the Blumeys — inner-scroll: div.arts-scroll (+312px @320/360/390)
- Providence Day School - Admissions - Grade-by-Grade Application Guide — TK/K · 1–5 · 6–12 — inner-scroll: div.table-wrap (+185px @320/360/390)
- Providence Day School - After School - A Day Inside + Enrichment — inner-scroll: div.as-scroll (+66px @320/360)
- Providence Day School - After School - The Cost Planner — inner-scroll: div.as-table-wrap (+270px @320/360/390)
- Providence Day School - College Support - Admission Rates at the Top NC Public Universities — inner-scroll: div.cs-ledger-wrap (+410px @320/360/390)
- Providence Day School - College Support - Whole Class Analytics — inner-scroll: div.cs-ledger-wrap (+370px @320/360/390)
- Providence Day School - Sports - The College Pipeline — inner-scroll: div.sports-scroll (+372px @320/360/390)
- Providence Day School - Sports - Winning Record — inner-scroll: div.sports-scroll (+424px @320/360/390)
- Providence Day School - Student Clubs - Club Catalog & Overview — inner-scroll: div.catalog-scroll (+9px @320)
- Providence Day School - Student Clubs - Honor Societies — inner-scroll: div.clubs-ledger-wrap (+370px @320/360/390)
- Providence Day School - Summer Programs - The Camp Catalog — inner-scroll: div.as-scroll (+312px @320/360/390)
- Providence Day School - Summer Programs - The Summer Cost Planner — inner-scroll: div.as-table-wrap (+270px @320/360/390)
- Providence Day School - The Arts - Theatre & the Blumeys — inner-scroll: div.arts-scroll (+312px @320/360/390)
- Trinity Episcopal School - Admissions - Grade-by-Grade Application Guide — K · 1–8 — inner-scroll: div.table-wrap (+130px @320/360/390)
- Trinity Episcopal School - High School Placement - Where They Land — inner-scroll: div.hsp-destlist (+37px @320)
- Trinity Episcopal School - Student Clubs - Club Catalog & Overview — inner-scroll: div.catalog-scroll (+15px @320)
- Trinity Episcopal School - Student Clubs - Honor Societies — inner-scroll: div.clubs-ledger-wrap (+370px @320/360/390)
- Trinity Episcopal School - Summer Programs - The Camp Catalog — inner-scroll: div.as-scroll (+312px @320/360/390)
- Trinity Episcopal School - Summer Programs - The Summer Cost Planner — inner-scroll: div.as-table-wrap (+270px @320/360/390)

## French (360px) — adds two cards English does not show

- **Carmel Christian School - After School - The Cost Planner**: `.as-cost-matrix`
  / `.as-cost-side` +83px (`.as-cost` collapses to a plain `1fr`).
- **Gaston Day School - Financial Aid & Tuition - In-Depth Report**: `.tag-accent`
  chip text +92px (the chip rule's `nowrap` survives its `max-width: 100%`).

## Arabic (360px) — nothing new, but the audit needs an RTL fix

Trinity (no page overflow) shows exactly the English findings. On the other 11
schools the +95px page overflow shifts the whole RTL layout, so every element,
section headers included, reads as off-screen. That is a measurement artifact:
measure against the section's box, not the viewport, so one page-level overflow
does not cascade into every element.

## Clean at every width

Course Offerings, section stat strips, the admissions stat band, Latest News,
the podcast strip and the welcome video produced no findings.
