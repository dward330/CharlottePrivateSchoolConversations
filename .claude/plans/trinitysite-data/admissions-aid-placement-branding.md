# Trinity live-site recheck 2026-11-14 — Admissions, Financial Aid & Tuition, High School Placement, Branding

Evidence worklist for `.claude/plans/trinitysite.md`; the verbatim live text is in the "### Live-site recheck, 2026-11-14" subsections of the source-material files.

## Trinity live-site recheck: admissions, financial aid and tuition, high school placement, branding (2026-11-14)

I edited no app code. I ran no git commands that change state. The only changes are new `### Live-site recheck, 2026-11-14` subsections in 10 source-material files (section E).

**How the evidence was gathered:**
- **Two live requests to tescharlotte.org**, spaced out:
  - `/admissions/applying-to-trinity`: the crawl's page text left out its collapsed accordion panels (Testing, Recommendations, Visit, Follow-Up, Financial Support, Decisions). The facts below come from that raw HTML.
  - The homepage: to read the brand CSS and the logo files.
- **Other sources:** the Wayback CDX API, the Finalsite CDN logo files, and the Cost of Attendance Google Doc. That doc still opens but is no longer linked from the new site.
- **Wayback went "Temporarily Offline"** near the end. One lookup (an archived copy of the 2023 counselor article under a different address) could not be finished.

**The 30 vs 31 "lifers" question.** The school's site gives both numbers:
- The live Class of 2026 post body says "one of 30 Trinity "lifers"".
- The news board teaser for that same post (`/about-us/news`) says "The 51 students in the Class of 2026 — including 31 "lifer" students".
- Our 30 matches the article body. 31 of 51 would be 61%, not 59%.
- That post also moved: it is live at the new news URL (below), dated "Posted Jun 1 2026", not June 06.

**A gap in `cited_locations.txt`:** it does not list `src/data/highSchoolPlacementPrograms/trinity-episcopal.ts` lines 39–41, which hold three tescharlotte URLs.

### A. URL map
| Old URL | New URL or GONE | Cited at | Note |
|---|---|---|---|
| /admission/admission-process.cfm | https://www.tescharlotte.org/admissions/applying-to-trinity | admissionsPrograms/trinity-episcopal.ts:123; content admissions json:1; content financial-aid json:1; SM Admissions "Application Process and Testing" :13; SM "Financial Support" :15 | Wayback https://web.archive.org/web/20260714070617/https://www.tescharlotte.org/admission/admission-process.cfm |
| /admission/admission-events-and-tours.cfm | https://www.tescharlotte.org/admissions/admission-events-tours | admissions ts:124; admissions json:1; SM App Process:14 | never archived |
| /admission/ | https://www.tescharlotte.org/admissions | admissions ts:125; admissions json:1; HSP json:1; SM App Process:15; SM "The Placement Program":24 | Wayback 20260911064036 |
| /editoruploads/files/CAIS2024-25final.pdf | Replaced by a newer edition: https://resources.finalsite.net/images/v1790272603/tescharlotteorg/iwsznwbihbhflkundb91/CAIS2027-2028Upload1.pdf (2027-28) | admissions ts:126; admissions json:1; SM CAIS:13 | Wayback https://web.archive.org/web/20240802163340/https://www.tescharlotte.org/editoruploads/files/CAIS2024-25final.pdf |
| /admission/tuition-affordability.cfm | https://www.tescharlotte.org/admissions/tuition-financial-support | aid json:1; SM Financial Support:14, :17 (Wayback TimeMap) | Wayback https://web.archive.org/web/20260714073615/https://www.tescharlotte.org/admission/tuition-affordability.cfm |
| /editoruploads/files/26-27SchoolProfile.pdf | https://resources.finalsite.net/images/v1790266877/tescharlotteorg/jraele9yxiqjc8nohifm/26-27SchoolProfile.pdf, linked from /about-us/trinity-at-a-glance | HSP ts:39; HSP json:1; aid json:1; SM Placement Outcomes:30; SM Where They Land:17; SM Financial Support:16; SM School Profile:13 | Same file: 841,498 bytes, text identical to our verbatim copy (diff clean). Never archived |
| /editoruploads/files/25-26SchoolProfile.pdf | GONE | HSP json:1; aid json:1; SM Placement Outcomes:31; SM School Profile:15 | Wayback https://web.archive.org/web/20251001032830/https://www.tescharlotte.org/editoruploads/files/25-26SchoolProfile.pdf |
| blog.cfm?threadid=48 (Class of 2026) | https://www.tescharlotte.org/about-us/news/news-landing-page/~board/news/post/tes-class-of-2026-commencement | HSP json:1; SM Placement Outcomes:32 | Old address archived at https://web.archive.org/web/20260714073636/https://www.tescharlotte.org/tes-class-of-2026-celebrated-at-commencement/ |
| blog.cfm?threadid=29 (Class of 2025) | GONE | SM Placement Outcomes:33 | Matched by title: https://web.archive.org/web/20250614205056/https://www.tescharlotte.org/congratulations-to-the-class-of-2025/ |
| blog.cfm?threadid=16 (Class of 2024) | GONE | SM Placement Outcomes:34 | Matched by title: https://web.archive.org/web/20240618052851/https://www.tescharlotte.org/congratulations-to-the-trinity-class-of-2024/ |
| blog.cfm?threadid=3 (Class of 2023) | GONE | SM Placement Outcomes:35 | No archived copy found |
| /admission/k-8-advantage.cfm | https://www.tescharlotte.org/admissions/the-k-8-advantage (text now in pop-up tiles) | HSP ts:40; HSP json:1; SM Placement Outcomes:36; SM Placement Program:25 | Every quote we use is still there verbatim. Wayback 20260714062335 |
| blog.cfm?threadid=6 (2023 counselor article) | GONE, not moved to the new site | HSP ts:41; HSP json:1; SM Placement Program:21 | No archived copy. The archived `/trinity-featured-in-qcitymetro/` page (20230923052909) is the QCityMetro post, with no counselor text |
| /about/faculty-staff-directory.cfm | https://www.tescharlotte.org/about-us/staculty | HSP json:1; SM Placement Program:23 | Wayback 20260608111055 |
| blog.cfm?threadid=15 (8th Grade DC trip) | GONE | HSP json:1; SM Placement Program:26 | Probable match by content: https://web.archive.org/web/20240618063141/https://www.tescharlotte.org/8th-grade-visits-dc-to-advocate-for-community-needs/ (May 23, 2024) |
| blog.cfm?threadid=40 (advocacy panel) | Probably …/post/panel-encourages-8th-grade-to-advocate-for-charlotte (Jan 8 2026) | HSP json:1; SM Placement Program:27 | Matched by content |
| https://www.tescharlotte.org/ | Same address, returns 200 | brands.ts:234; SM Branding:25; _shared "Campus City and Address":101 | Unchanged |
| /implementation_colors.css, /css.css | GONE; the colors are now set inline on each page | SM Branding:26–27 | Wayback 20260320130347 and 20260320130336 (`?v=07032023090705`) |
| /editoruploads/images/Logos/logo.png, footer_logo.png | GONE; new white logos on the Finalsite CDN (`…/mszgeapwzln7lesz3qgi/secondary-logo.png`, `…/h3po2air3whcdr2xl9nw/primary-logo.png`) | SM Branding:28–29 | Wayback 20260924003400 for both |
| "Cost of Attendance for 2026-27" Google Doc (cited by name, no URL) | Still opens, but no page links it | financialAidReports.ts:2845, 2852, 2901, 2999; SM Tuition and Fees:5 | Its per-grade table now appears on the tuition page itself |

### B. Differences
"Prose?" = yes when the text renders to parents and so needs re-translating in 9 locales.

**Admissions (`src/data/admissionsPrograms/trinity-episcopal.ts`)**

| App location | App value | Live value | Source | Prose? |
|---|---|---|---|---|
| CAIS fee:<br>• prose: k `steps[3].detail`; g18 `steps[3].detail`; both `checklistCallout.text`; both `checklistRows[4].detail`; `aid.text`; comparison row "Who administers the test" (both cells); `checklist.aidPanel.items[2]`; `sources[3].label`<br>• figures: `stats[2].value`; k and g18 `deadlines[3].value` | $275 | "Testing Fees: $300 for WPPSI-IV / $300 for WISC-V" | CAIS 2027-2028 PDF | yes (prose); no (the `value` figures) |
| k `steps[3].detail` | "canceling within 48 hours forfeits the fee" | "a nonrefundable $100 fee applies to all cancellations… cancellations within 72 hours … are not eligible for a re-fund" | CAIS 2027-28 | yes |
| k and g18 `steps[3].detail`; `sources[3].label` | results come as "percentile ranges" | No longer stated: "results will be sent to parents and designated schools… feedback meeting… billed… hourly rate" | CAIS 2027-28 | yes |
| Application fee "not published": k `steps[1].detail`; k `checklistCallout.text`; k and g18 `checklistRows[2].detail`; g18 `steps[1].detail`; comparison "Constant in both bands"; `aidPanel.items[3]` | fee amount not published | "you will receive instructions on paying the $100 application fee" | applying-to-trinity | yes |
| `aid.text`; `aidPanel.items[1]`; `checklist.disclaimer` | warns the process page prints Feb 1, **2026** | "The financial support application deadline for prospective families is February 1, 2027." | applying-to-trinity | yes |
| k and g18 `steps[0].detail`; `disclaimer` | Dec 1 start time differs between pages; labeled "Thursday" | "K-8 Open House / Tuesday, Dec. 1, 2026 / 9:30-11:00 a.m." Same on /admissions | admission-events-tours | yes |
| k `steps[0].detail`, `checklistRows[0]`; g18 `steps[0].detail`, `checklistRows[0]` | Sept 29 and Nov 5 open houses | Not listed (both dates have passed). Dec 1 is the only open house | admission-events-tours | yes |
| k and g18 `steps[4].title`; "Register for Wildcat Visit Day" rows; comparison row label; `spineNote`; `sources[0].label` | "Wildcat Visit Day", "register" | "Applicants will be invited to spend a day on campus (rising 1st-8th) or attend a morning observation session (rising Kindergarten) beginning in November." The name is not used | applying-to-trinity | yes |
| g18 `steps[1].detail` | "still accepting applications for the 2026-2027 school year in select grades" | No longer stated (0 hits in the raw HTML) | applying-to-trinity | yes |
| `contacts.people[1]`; `contactPanel.lines[3]` | Spanish-language contact quote | Gone. Fé Patriciu is listed as "Chief Enrollment Officer, fpatriciu@tescharlotte.org" | /admissions | yes |
| `contacts.people[0].detail` | "pick an admission team member on tescharlotte.org/admission … · 980-207-5898 · 980-207-5898" (phone printed twice) | Tours booked through Calendly links for Fé Patriciu and Rudy Wise on /admissions/admission-events-tours | events page | yes |
| `disclaimer`; `sources[3].label` | CAIS detail is from the 2024-25 edition and "its dates do not" carry over | 2027-28 edition. Its dates now equal Trinity's: K Jan 2 / Feb 1; Grades 1–4 Jan 15 / Feb 26, 2027 | CAIS 2027-28 | yes |
| `disclaimer` | "retrieved in September 2026" | — | — | yes |
| `PROCESS` / `EVENTS` / `ADMISSION` / `CAIS` constants | old URLs | New URLs in section A | — | no |

**Financial Aid (`src/data/financialAidReports.ts`, Trinity entry)**

| App location | App value | Live value | Source | Prose? |
|---|---|---|---|---|
| `fa-beyond.bands` Kindergarten (:2861) | 210 | "Kindergarten $26,670 $215". The Google Doc still says $210 | tuition-financial-support | no (figure) |
| `fa-beyond.figureNote`; `components[0]` | "$210 in Kindergarten"; "$210 to $1,045" | $215 | same | yes |
| `fa-tuition.figureNote2` (:2845) | "Every dollar figure … lives in a Google Doc… not on the tuition page itself" | The tuition page now prints the per-grade table, Extended Day (TED) rates and FLIK lunch plans | same | yes |
| `components` TED (:2880) | "monthly, by household income · $105–$380" | "Monthly Rate: $380 ($355 for each additional sibling)". Income tiers no longer stated | same | yes |
| `components` lunch (:2876); `boxes[0]` (:2897) | "$11.50" per meal; "FLIK is not reduced for families receiving financial support" | Not on the live site (only in the unlinked doc). Annual $1,375 / $1,520 and 20-meal $195 / $210 are confirmed | same | yes |
| `components` summer camp (:2882) | "$225–$785 per camp" | No prices; "Check back in January 2027 for Camp Registration!" | /community/wildcat-summer-camp | yes |
| `components` "Application fee" (:2886) | unpriced | $100 | applying-to-trinity | yes |
| `componentsNote` (Books dashes) | reasoning about the doc's dash columns | The doc is no longer linked; the live table has no Books column | — | yes |
| `fa-engine.timeline[0]` (:2912) | "2026-27 Clarity Family Application Guide" | "2027-28 Clarity Family Application Guide" | tuition page | yes |
| `fa-engine.timeline` "2 Jan 2027" (:2920) | "Admission applications open for families new to Trinity" | "Kindergarten applications for the 2027-28 school year are due by January 2, 2027". It is a **deadline**, not an opening | applying-to-trinity | yes |
| `fa-merit.ladder[0].detail` (:2980) | "an additional option…"; does not say how the two programs interact | "Trinity has accepted the Opportunity Scholarship since the program's beginning in 2014. Families seeking financial support to attend Trinity are required to also apply for an Opportunity Scholarship." Applications open "the first Monday of February 2027"; awards from "April 2027" | tuition page | yes |
| `fa-merit.boxes[0].body` (:2991) | "No merit scholarship, named endowed scholarship… appears anywhere on the site"; "does not say whether a family can get both" | "Mayor Vi Lyles Endowed Scholarship: … created to further Trinity's mission of allowing families from all socioeconomic backgrounds to experience a Trinity education." Opportunity Scholarship is now required for aid applicants | /give/ways-to-give; tuition page | yes |
| `meta`; source strings (:2852, 2901, 2944, 2969, 2995, 2999) | "Tuition & Affordability", "Admission Process", "Cost of Attendance… (Google Doc)", "16 Sep 2026" | Page names are now "Tuition & Financial Support" and "Applying to Trinity" | — | yes |
| Unchanged | | 31%, $2,139,114, 419, $11.09M, both aid deadlines, need-based and "no bearing on admission" quotes, tuition $26,670 / $28,690, Extended Day drop-in $31 / $25 | | |

**High School Placement (`src/data/highSchoolPlacementPrograms/trinity-episcopal.ts`)**

| App location | App value | Live value | Source | Prose? |
|---|---|---|---|---|
| `placement.sources[1]` and `COUNSELORS` (:41) | threadid=6 | GONE, no archive | — | yes (label) / no (URL) |
| `verdict.checklist[3]` | "The counselor roles began in 2023-24… who holds each role now?" | Staff directory: "Lilla Clark / Middle School ELA Teacher, High School Counselor"; "Rudy Wise / Director of Admission, Boarding School Counselor"; /admissions: "Director of Admission and Boarding School Placement" | /about-us/staculty | yes |
| `verdict.checklist[2]` | "when does the search start…" | "As Trinity Episcopal School 8th Grade students and families begin the process of picking a high school, Trinity alumni … returned to campus on Sept. 21" | news post, Oct 8 2026 | yes (optional change) |
| `PROFILE` / `K8` (:39–40) | old URLs | New URLs in section A | — | no |
| Confirmed unchanged | | "two high school counselors", K–8 thesis quote, 9 years, 31/57/12 over 1,060, all 99 destination lines, 41 asterisks | | |
| Source-material only (`classes: []`, no outcomes card) | Class of 2026: 30 lifers | Post body 30; news teaser 31 | see top note | no |

**Branding (`src/data/brands.ts`):** no app value changes. The homepage returns 200. The new site declares `--primary-color: #002D56`, hue 208.6, and `--secondary-color: #006F51`, the same as before. The new logo uses the same crest (shield, flared cross, eTS monogram), so `public/logos/trinity-episcopal.png` still matches.

**The `src/content/*` JSON files** are the ingest pipeline's copy of the source-material files and will regenerate from them. The admissions and high school placement prose sections are not shown on the school page, because the structured cards replace them. I did not confirm how the aid content JSON renders.

### C. Facts whose only source is gone
| Fact | App location | Type | Wayback |
|---|---|---|---|
| Class of 2023 / 2024 / 2025 graduates, lifers, school counts | Source-material and content JSON only | historical | 2025 and 2024 posts in section A; 2023 none |
| Counselor structure "added in 2023-24" | HSP `placement.headline` | historical | none |
| Lilla Clark's scope (public + independent) and her quotes ("a feel for who might benefit…", "Do they want big class sizes?…") | HSP `headline`, `steps[0].text` | current-state (the scope); her quotes are 2023 statements used to describe current practice | none |
| Benita Griffin as boarding counselor (2023) | Source-material only | historical | none |
| Spanish-language contact line | admissions contacts and contact panel | current-state | /admission/ 20260911064036 |
| "still accepting 2026-2027 applications" | admissions g18 `steps[1]` | current-state | process page 20260714070617 |
| Sept 29 and Nov 5, 2026 open houses | admissions `steps[0]`, `checklistRows[0]` | historical (dates passed) | process page 20260714070617 |
| CAIS 2024-25 details: $275, 48-hour rule, percentile ranges, Griffin | admissions (see B) | Not gone: replaced by the newer 2027-28 edition | 20240802163340 |
| Aid series 26% / $2.1M (2023-24) and 29% / $2M (2025-26) | aid `fa-numbers.figureNote` | historical | tuition page 20260714073615 and earlier |
| 25-26 profile "28.9%"; tuition history 2023-24 to 2025-26 | aid `figureNote2`; `fa-tuition.figureNote` | historical | 20251001032830; tuition page |
| Extended Day income tiers $105–$380; $11.50 per lunch; "FLIK is not reduced…"; Books dashes | aid `fa-beyond` | current-state (the Google Doc still opens but is unlinked) | — |
| Summer camp $225–$785 | aid `fa-beyond.components` | current-state | summer area's own source docs |
| Opportunity Scholarship "additional option" quote | aid `fa-merit` | current-state, now contradicted | tuition page 20260714073615 |
| Checklist quote "Complete testing: CAIS (K-4) and ISEE (5-8)" | Source-material only | current-state (now worded "CAIS/ISEE testing") | process page 20260714070617 |
| DC advocacy trip post (threadid=15) | Source-material only | historical | 20240618063141 (probable match) |
| Old CSS and logo files | Source-material only | Replaced; colors and crest confirmed live | see section A |

### D. New live information that fits existing cards
- **Admissions guide:**
  - $100 application fee.
  - "If you are applying for financial support, contact the Admission Office before submitting your application…"
  - Clarity takes "about 20 minutes".
  - CAIS 2027 dates: K notification Fri Feb 26, contracts due Fri Mar 5, 2027. Grades 1–4 notification Apr 9, contracts due Apr 16, 2027. The brochure calls both April dates "Thursday"; both are Fridays.
  - CAIS booking: appointments open the day after Labor Day; payment by card or Zelle is due within 24 hours; appointments made after Jan 1, 2027 are non-refundable; $100 non-refundable cancellation fee and a 72-hour rule; an ESL nonverbal index is available.
  - Admission team: Fé Patriciu, Chief Enrollment Officer, fpatriciu@tescharlotte.org; Rudy Wise, rwise@tescharlotte.org; Marissa Hairston, Registrar.
  - Dec 1 open house is in the "CCA Auditorium". Main school phone is 704.358.8101.
- **Aid report:**
  - Extended Day half-day $51/day ($30 with support); full-day $72/day ($45 first sibling, $40 each additional, with support); monthly $380 ($355 each additional sibling).
  - Opportunity Scholarship is required for aid applicants and accepted since 2014; 2027-28 applications open the first Monday of February 2027, with awards from April 2027.
  - Clarity application fee $65 (2027-28 guide).
  - The Mayor Vi Lyles Endowed Scholarship, and the Trinity Endowment funding "financial support to families".
  - Tuition Refund Plan "used at more than 1,200 independent schools", with a 2026-27 brochure that gives no premium.
  - The Trinity At a Glance page shows "$2.1 million" in aid for 26-27.
- **Placement card:**
  - Oct 8 2026 post: the high school search starts in the fall of 8th grade; an alumni panel on Sept 21 was moderated by the high school counselor; it mentions "the in-person interview portion of the high school application".
  - Current titles of both counselors.
  - Jan 2026 post mentions 8th Grade trips to Raleigh and Washington, D.C.
- **Branding:** the new logo URLs above.

### E. Source-material files edited
Each got one `### Live-site recheck, 2026-11-14` subsection inside `## Provenance`. Tuition and Fees had no `## Provenance` section, so one was added at the end of that file.
- `/Users/Derrick/Desktop/CharlottePrivateSchoolConversations/source-material/admissions/trinity-episcopal/Trinity Episcopal School - Admissions - Application Process and Testing.md`
- `/Users/Derrick/Desktop/CharlottePrivateSchoolConversations/source-material/admissions/trinity-episcopal/Trinity Episcopal School - Admissions - CAIS Consortium.md`
- `/Users/Derrick/Desktop/CharlottePrivateSchoolConversations/source-material/financial-aid-tuition/trinity-episcopal/Trinity Episcopal School - Financial Aid and Tuition - Financial Support.md`
- `/Users/Derrick/Desktop/CharlottePrivateSchoolConversations/source-material/financial-aid-tuition/trinity-episcopal/Trinity Episcopal School - Financial Aid and Tuition - School Profile 2026-27.md`
- `/Users/Derrick/Desktop/CharlottePrivateSchoolConversations/source-material/financial-aid-tuition/trinity-episcopal/Trinity Episcopal School - Financial Aid and Tuition - Tuition and Fees.md`
- `/Users/Derrick/Desktop/CharlottePrivateSchoolConversations/source-material/high-school-placement/trinity-episcopal/Trinity Episcopal School - High School Placement - Placement Outcomes.md`
- `/Users/Derrick/Desktop/CharlottePrivateSchoolConversations/source-material/high-school-placement/trinity-episcopal/Trinity Episcopal School - High School Placement - The Placement Program.md`
- `/Users/Derrick/Desktop/CharlottePrivateSchoolConversations/source-material/high-school-placement/trinity-episcopal/Trinity Episcopal School - High School Placement - Where They Land.md`
- `/Users/Derrick/Desktop/CharlottePrivateSchoolConversations/source-material/branding/trinity-episcopal/Trinity Episcopal School - Branding - Crest and Brand Color.md`

Not edited:
- **Form 990:** it has no tescharlotte sources.
- **`branding/_shared/…Campus City and Address.md`:** shared across all schools; the homepage still returns 200.

The other modified files in `git status` belong to the parallel agents.

**Student names already in our files.** "Placement Outcomes" (findings section) already quotes a named Class of 2026 student and names the Class of 2025 commencement speaker. The new subsections name no students. The implementation should remove the existing names.
