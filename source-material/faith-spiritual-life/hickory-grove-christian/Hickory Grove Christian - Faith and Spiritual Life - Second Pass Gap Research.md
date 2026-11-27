# Hickory Grove Christian School — Faith & Spiritual Life — Second Pass (Gap Research)

**Provenance.** Collected 2026-11-26 by Claude (Claude Code), as a second, targeted pass after
`Hickory Grove Christian - Faith and Spiritual Life - Official Site Research.md` in this folder. It
tried to close that file's "Not found", "Could not read" and `INFERENCE:` items from PUBLIC official
pages only: hgchristian.org (ParentSquare SmartSites), the documents it hosts under
`https://files.smartsites.parentsquare.com/14485/`, forms and videos its pages link as their own,
and its public calendar feed. Pages were fetched with `curl` and stripped to text; PDFs with
`pdftotext -layout`. New this pass: the site's `sitemap.xml` (83 URLs, five not in the first pass),
the site's own search endpoint (`/includes/actions/search.php`, the call the search box makes; 47
terms), the myHGCS parent page and its linked PDFs, every hosted PDF the first pass had not opened,
the two Early Education Center interest forms (Google Forms; field labels and required flags read
from the form's public page data), the FACTS "Request Information" form, and the school's
"Rewatch Chapel" Vimeo showcase (video titles only). School confirmed by name and address on every
page footer: "7200 E W T Harris Blvd Charlotte, NC 28215-7200". No church or denomination site was
read.

**Re-check.** 37 quotes in this file were re-checked against the raw downloads (whitespace-normalized
substring match, zero-width spaces removed) before finishing. All 37 matched. They include these
twelve key ones: the myHGCS Student Handbook sentence; the five Mallard Creek EEC interest-form faith
questions (church membership, church involvement, faith in daily routines, "walk with the Lord",
support for the mission) and its quoted mission sentence; the aquaponics "each year our senior class
has the opportunity" sentence; the HS catalog "department heads … Bible- Fernando Rogante" line; the
catalog "first priority is to spiritually equip" sentence; the catalog "Transfer Credits" line; the
Student Authorization "I have read the Admissions Policies" line; the HS attendance "An absence is
defined" line; the /missions-and-service "Our seniors serve together annually" and "While the
seniors are away" sentences; and the Vimeo titles "11/20/26 Thanksgiving Chapel" and
"8/27/26 | Middle/High School Chapel".

**Names.** No student is named in this file. Sources that name a student or a graduate for what they
did at school are marked "names a student: withheld" below (the Fall/Winter/Spring Sports record
lists, the Alumni Spotlight, an Alumni Relations Board bio). Nothing was copied from them except one
class-level sentence from the alumni bio, with the name withheld. Adults in adult roles are named as
the school publishes them, with published school emails only.

**Kept out on purpose.** Trip prices and exact travel dates (season and year only). Lunch prices,
fee amounts and personal details on forms. No staff email was built from a name pattern.

**LEADS.** Anything dated before the current year, superseded, found only through a web search, on a
page the site no longer links, or read by eye from an image is marked `LEAD:` and supports no
parent-facing fact on its own.

Base for every relative URL: `https://hgchristian.org`. A `files…/14485/<file>` path is
`https://files.smartsites.parentsquare.com/14485/<file>`.

## Source URLs (new in this pass), and what failed

**Pages**

| URL | Holds |
|---|---|
| /sitemap.xml | 83 URLs; new to this research: /connect, /279715_3, /alumni-spotlight, /international-student-alumni-home, /harris-campus-eec-virtual-tour |
| /myhgcs | "The 2026–27 Student Handbook is available to current families in ParentSquare and the FACTS Family Portal."; attendance rules; links the three attendance overviews, the AUP and the Student Authorization form |
| /connect (sitemap only; filed under "Unlisted Pages") | "November Chapel / Thanks for Joining Us!" page for chapel visitors: "Pre-Register for Next Chapel", "Chapel at Home", "Rewatch Chapel" (Vimeo showcase 10856617) |
| /athletic-camps | Camps "open to the public"; "character that honors Christ on and off the field"; academic camps for HGCS students and HGBC members |
| /fall-sports, /winter-sports, /spring-sports | Coaches and record lists (names students: withheld). No FCA, team chaplain or team devotion found |
| /box-office | 2026–27 performance venues: "Harris Campus Worship Center", "Mallard Creek Worship Center", "Harris Campus Event Center" |
| /employment (re-read) | Current posting; "As a ministry, we are dedicated to partnering with parents to nurture each student’s identity in Christ …"; same SoF and church lines as the first pass |
| /aquaponics | **Orphan page**: live, but in no menu, not in sitemap.xml, linked from no page read, and returned by site search only for "aquaponics" as /high-school-home. Found through a web search pointer. See LEADS |
| /alumni-spotlight | An international graduate's faith story (names a graduate: withheld; nothing copied) |
| /279715_3, /international-student-alumni-home, /harris-campus-eec-virtual-tour, /accessibility, /absence-form, /hgcs-early-dismissal-form | No faith content |
| Re-fetched 2026-11-26 and compared: /chapel, /469460_2, /missions-and-service, /lions-connect, /here-i-stand-2, /admissions-home, /high-school-home, /middle-school-home, /elementary-school-home, /our-beliefs, /athletics-home, /coaches-and-teams | No change to the wording the first pass quoted |

**Documents and forms**

| Link on the school site → file | Document | Date on it |
|---|---|---|
| /myhgcs → `files…/14485/elementray_school_attendance_policy_overview.pdf`, `middle_school_attendance_policy_overview.pdf`, `high_school_attendnace_policy_overview.pdf` | Attendance and tardy policy letters, one per division, each with a parent signature line | undated (2026–27 page) |
| /myhgcs → `files…/14485/student-authorization.pdf` | Student Authorization (emergency treatment, field trip, enrollment agreement, ministry/mission-work release) | "Revised 12/14/20" |
| /myhgcs → `files…/14485/aup.pdf` | Technology Acceptable Use Policy | undated |
| /myhgcs → `files…/14485/studentwithdrawalform.pdf` | Withdrawal form | no faith content |
| /tuition-and-fees → `files…/14485/tuitionrates26-27.pdf`, `edsupportservicesfees26-27.pdf` | 2026–27 tuition and support-service fees | "Revised 1/5/26" (tuition) |
| /harris-campus → `files…/14485/calendar2026-27eecharris.pdf`; /mallard-creek-campus → `files…/14485/2026-2027mallardcreekeeccalendar.pdf` | Early Education Center calendars | "Revised 4/29/26" |
| /harris-campus → `files…/14485/aisbrochurefinal.pdf` | "Adventures in Spanish" Pre-4K brochure | undated |
| /athletics pages → `files…/14485/hgathletics-mediapolicy.pdf` | Athletics media policy | "Updated: August 20, 2026" |
| /aaa-booster-club → `boosterclubmembershipform262.pdf`, `boosterclubpartnerform26.pdf` | Booster forms | 2026–27 |
| /mallard-creek-campus → `https://docs.google.com/forms/d/e/1FAIpQLSfxe9C5inD83aaRlATsKQNHRMPWnPuBBaYZxmks4QE_a7Pz5Q/viewform` | "Mallard Creek EEC Interest List" (14 questions, all marked required) | undated |
| /harris-campus → `https://docs.google.com/forms/d/e/1FAIpQLSfjfovuVvxFpqsWZf52lltPuD7-e4RG27VIY0sASQm9HfVHmg/viewform` | "Harris EEC Interest List" (7 questions, no faith question) | undated |
| /admissions-home → `https://hg-nc.client.factsmgt.com/oa/inquiry.cfm?memberId=496&districtCode=hg-nc` | FACTS "Request Information" form | for "2027-2028" |
| /connect, /chapel → `https://vimeo.com/showcase/10856617` | "Rewatch Chapel" showcase "HGCS" (on a Vimeo account named "Hickory Grove Baptist Church"); titles read, videos not watched | 2026 |

**LEADS only (not used as facts)**
- `/aquaponics` — orphan page (see above), undated. Holds the "each year our senior class has the opportunity to participate in mission trips—both domestic and international" sentence (Gap 5).
- Web search (2026-11-26) returned an old-platform result titled "Form Test Page" at `https://www.hgchristian.org/academics/form-test-page`, whose search snippet described a parent form affirming the Statement of Faith and asking "Are you a member of a church?". That URL now redirects to /academics-home, no page on the live site carries that text, and the Wayback Machine availability API holds no snapshot of it. **Search snippet only, not read.**
- The same search returned old Finalsite URLs `/life-as-a-lion/worship` and `/fs/resource-manager/view/bbc20bdc-f1d9-4c7a-9255-58e5c2292100`: both 404 on the live site.
- Student Authorization form: still linked live from /myhgcs, but printed "Revised 12/14/20".
- Harris EEC calendar items read by eye from a page image: "Operation Christmas Child" and "Turkey Trot for Missions" in November 2026.
- An Alumni Relations Board bio (an adult graduate; names a student-era graduate: withheld): "The highlight of my time there was our Dominican Republic Senior mission trip!" — testimony, not policy.

**Tried and failed**
- Guessed paths, all **404**: /news-home, /newsletter, /publications, /magazine, /annual-report, /faq, /faqs, /handbook, /student-handbook, /parent-handbook, /re-enrollment, /reenrollment, /enrollment, /graduation-requirements, /service-hours, /nhs, /fca, /senior-mission-trip, /mission-week, /bible, /chapel-archive, /retreat, /sitemap_index.xml, /form-test-page, /life-as-a-lion, /life-as-a-lion/worship.
- /announcements and /unlisted: **406**, redirect to the ParentSquare sign-in. Behind a login; not attempted further.
- /spirit-store: **403** (third-party store).
- FACTS online application (`sis.factsmgt.com/admissions-parent/…`): **200** but a script-only shell with no text before login. The Student Questionnaire and pastor's Personal Recommendation form remain unseen.
- Site search endpoint: **0 results** for retreat, retreats, FCA, chaplain, baccalaureate, NHS, transfer, questionnaire, doctrinal, believer, born again. 9 queries hit **429** (rate limit) on the first run and were re-run successfully with pauses. The endpoint indexes pages only, not PDFs.
- Wayback availability API for `/academics/form-test-page`: no snapshot.
- Two site-restricted web searches (service hours / mission week / retreat; pastor recommendation / questionnaire / Christian home): no hgchristian.org page beyond those already held, plus church and other-school sites (not read).
- Vimeo livestream event page 3673221: no video titles in the static page.

## Findings (new in this pass)

**Gap 1 — must parents be Christians, attend church, or agree to the Statement of Faith?**
- **K–12 (TK–12): still NOT STATED on any public page.** Every admissions page, both checklists, the tuition pages, the international pages and the FACTS inquiry form were checked. The inquiry form's only faith items are a "How Did You Hear About Us?" choice "Pastor/Church announcement" and a student-interest choice "Church Activities". The checklists still ask for a pastor's "Personal Recommendation form" and say the Family Interview is "an opportunity to share the Mission, Vision, and Statement of Faith".
- **Preschool (Mallard Creek Early Education Center): the interest form asks about parent faith.** The "Mallard Creek EEC Interest List" form linked from /mallard-creek-campus ("Interest Form / Mallard Creek Interest Form") marks every question required, including:
  - "Are you and your family an active member of a church?" (Yes / No)
  - "If so, what church?"
  - "Can you describe your family's involvement with your current church?"
  - "How do you incorporate your Christian faith into your family's daily routines and decision making process?"
  - "Briefly discuss your walk with the Lord (description of the parent's faith)."
  - "Can you support all aspects of the school's mission?" followed by: "As a school, our mission is "To equip students to serve God in the 21st century by providing an excellent academic program founded upon a biblical worldview."" Choices: "Yes, I support all aspects of the school's mission." / "No, I do not support all aspects of the school's mission."
  - Form intro: "Once submitted, your family will be added to our interest list. A member of our staff will reach out to your family in regards to next steps in the application/enrollment process."
  - The Harris Campus EEC interest form asks none of these (child, parents, contact, date care is needed, how heard).
  - INFERENCE: the form asks about parent faith and church membership but states no rule that a family must answer "Yes" to be admitted.
- **What every parent signs (LEAD, dated).** Student Authorization, item 5: "I have read the Admissions Policies, Financial Policies, and School Policies & Procedures of HGCS, as stated on our website at www.HGChristian.org. I understand the obligations and responsibilities which are required of parents and students, and I accept and agree to abide by the provisions set for therein." ("set for" [sic]) — `student-authorization.pdf`, "Revised 12/14/20". It does not name the Statement of Faith.
- Each division's attendance letter has a parent signature line ("I have read and understand the HGCS Elementary Attendance and Tardy Policy described above." in the elementary version). No faith clause.

**Gap 2 — chapel attendance rule and how often chapel meets**
- **Attendance rule: still not stated.** The three attendance letters say the policy is "as outlined in the Parent-Student Handbook" and never mention chapel. HS: "An absence is defined as any part of a school day when a student is not present in class or on a designated class field trip — this includes early dismissals and tardies of more than 30 minutes to any class period." INFERENCE: chapel is held in school hours (8:00 AM and 9:30 AM), so the ordinary school-day attendance rules would apply; no page says chapel attendance is required or excusable.
- **Month by month, calendar feed (`/api/calendars/153239/events`, `site_timezone` "America/New_York"; times stored as UTC and converted) against the calendar PDF ("Revised 11/11/2026"):**

| Month | Feed entries | PDF label | Day | Format |
|---|---|---|---|---|
| Aug 2026 | "Elementary Chapel"; "Middle, High School Chapel, Honor Code Ceremony" | "Chapel/Honor Code Ceremony" | Thu | split |
| Sep 2026 | "Elementary Chapel"; "Middle, High School Chapel" | "Chapel" | Thu | split |
| Oct 2026 | same pair | "Chapel" | Thu | split |
| Nov 2026 | "Thanksgiving Chapel" (one entry, 9:30 AM) | "Thanksgiving Chapel (School-Wide) & Elementary Banquet, Early Dismissal" | **Fri** | school-wide |
| Dec 2026 | "Christmas Chapel (School-wide)" (9:30 AM) | "Christmas Chapel (School-Wide)" | Thu | school-wide |
| Jan 2027 | split pair | "Chapel" | Thu | split |
| Feb 2027 | split pair | "Chapel" | Thu | split |
| Mar 2027 | split pair (early March) | "Chapel" | Thu | split |
| Mar 2027 | split pair (late March), **no "Easter" in the feed title** | "Easter Chapel" | Thu | split |
| Apr 2027 | split pair, **no "End of Year" in the feed title** | "End Of Year Chapel" | Thu | split |
| Apr 2027 | "Lifer Breakfast" 8:00 AM, then "Senior Recognition Chapel" 9:30 AM | "Senior Recognition Chapel/ Prom" | **Fri** | seniors' event |
| May 2027 | none | none | — | — |

  - INFERENCE (closes the "10 Chapels" count): 8 split chapel days + 2 school-wide chapels (Thanksgiving, Christmas) = **10**, the number /469460_2 prints ("10 Chapels / each school year, with messages for elementary and for middle and high school."). The Senior Recognition Chapel is an 11th, seniors' event outside that count. "Once a month" holds August–February; March has two, April has two counting Senior Recognition, May has none.
  - The Vimeo "Rewatch Chapel" showcase confirms the pattern so far: "8/27/26 | Elementary Chapel", "8/27/26 | Middle/High School Chapel", "9/17/26 | Elementary School Chapel", "9/17/26 | Middle/High School Chapel", "10/22/26 | Elementary Chapel", "10/22/26 | Middle & High School Chapel", then a single "11/20/26 Thanksgiving Chapel". (The showcase also holds 2026 graduation and moving-on videos.)
  - The livestream link (/hgcs-live-stream-w-chapel → vimeo.com/event/3673221) carries no schedule.
- Preschool: the EEC calendar PDFs carry "Chapel" in their text layer, but the word does not show in the rendered page image, so no preschool chapel day is recorded.

**Gap 3 — retreats, spiritual emphasis week, faith trips by division**
- **Still none.** Site search returns 0 for retreat, retreats, FCA, chaplain and baccalaureate; "spiritual emphasis" returns only generic pages. The calendar feed (110 events) and PDF hold no retreat, spiritual emphasis week or revival. The Here I Stand journal, both catalogs and the sports pages hold none.
- The two class trips stay undescribed: the PDF lists "Senior Trip" (September 2026) and "8th Grade Trip" (October 2026). The feed lists "8th Grade Trip" but **has no "Senior Trip" entry at all**.
- Preschool service (LEAD, read by eye): Harris EEC calendar, November 2026: "Operation Christmas Child"; "Turkey Trot for Missions".

**Gap 4 — service-hour rule**
- **Still none published.** Not in the HS catalog's graduation requirements, the school profile ("Graduation Requirements / Classes 2016 and beyond": Bible 4 units … "27 units"), the attendance letters or any page. Site search: "NHS" 0 results; "community service" returns only generic pages; no National Honor Society page exists (/nhs 404).

**Gap 5 — senior mission trip: do all seniors go, is it in tuition**
- /missions-and-service (re-read): "Our seniors serve together annually on a mission trip to the Dominican Republic." and "While the seniors are away, the rest of the high school serves the local community through Mission Week."
- Calendar: PDF "Senior DR Trip", feed "Senior Mission Trip", one school week in January 2027.
- INFERENCE: High School Mission Week runs the same January 2027 week ("While the seniors are away"); the calendar does not list Mission Week.
- Cost and tuition: **not stated.** The tuition page and "TUITION RATES AND YEARLY FEES" PDF list tuition, Spanish Immersion, bus and after-school charges only. The international page lists what international fees include ("Local College visits", "Class field trips") and says "No refunds are given for planned school trips or missed lunches." Neither names the senior trip.
- Whether every senior goes: no page says so in words. LEAD (orphan /aquaponics): "In addition, each year our senior class has the opportunity to participate in mission trips—both domestic and international—where aquaponics knowledge can be used to meet physical needs and open doors for spiritual conversations." See new conflict A.
- Student Authorization (LEAD, dated) carries a ministry release: "I also agree to hold harmless the organizations, ministries, and site where HGCS will be taking my child to do ministry (or mission work)."

**Gap 6 — Bible credits for juniors and seniors who transfer in**
- No rule in words. HS catalog: "Minimum total credits: 1 per year" (Bible Department page); "Transfer Credits: Students may earn and transfer credits from other accredited institutions."; "Homeschool Credit: Credits earned through state-accredited homeschools will be honored at HGCS."; "Unless transferring into HGCS during high school, students are required to take all coursework at HGCS in order to earn graduation credits." Site search "transfer": 0 results.
- INFERENCE (unchanged, now with the transfer-credit line beside it): a transfer owes one Bible credit per year at HGCS; whether a Bible credit from another school counts toward the 4 is not stated.

**Gap 7 — handbook, Honor Code source, Student Questionnaire, pastor form**
- **Closed as not public.** /myhgcs: "The 2026–27 Student Handbook is available to current families in ParentSquare and the FACTS Family Portal." The attendance letters name it the "Parent-Student Handbook". The Honor Code ("Appendix C") and dress codes ("Appendix A") are excerpts of it.
- HS attendance letter names the in-school suspension "(Pathway to Restoration)".
- No public copy of the Student Questionnaire or the pastor's Personal Recommendation form: not in any page link, any hosted PDF, the sitemap, or site search ("questionnaire" 0, "recommendation" 1: the international admissions page).

**Gap 8 — a doctrinal statement of faith; Baptist Faith and Message; date**
- **Still not found.** No page or hosted document carries a general doctrinal statement. The Baptist Faith and Message (2000) is named only inside the employment-linked Statement of Faith; no page links it. The only Statement of Faith link on the site is still the one in the employment application. The document's text carries no date; "(updated Spring, 2022)" is in the PDF's title metadata only (`pdfinfo` Title: "Statement of Faith - Marriage, Gender and Human Sexuality (updated Spring, 2022)"), so it stays a LEAD.

**Gap 9 — school staff with a faith title**
- HS catalog: "If you have any questions, please feel free to contact the department heads or Tracey Bennett, the Director of Counseling. English- Sarah Beam sarahbeam@hgchristian.org Bible- Fernando Rogante fernandorogante@hgchristian.org …" So Fernando Rogante is published as the **Bible department head** (high school), email fernandorogante@hgchristian.org.
- MS catalog names grade-level chairs only, no Bible lead.
- Staff directory (116 entries) carries departments only; no "Bible", "Spiritual Life" or chaplain department. None of the HGBC pastors who lead chapel and Lions Connect appears in it, and no school email is published for them.
- Site search "chaplain": 0. No spiritual life coordinator or missions director is named anywhere.

**Gap 10 — first-pass conflicts, third sources**
- Conflict 1 (chapel frequency): settled by the count above (8 split + 2 school-wide = 10), backed by the Vimeo archive.
- Conflict 3 (mission wording): a **third** wording found, on the Mallard Creek EEC form (new conflict B).
- Conflict 4 (D-groups): the HS bell schedule shows "Flex (Club) 12:45-1:25" on Tuesday and Thursday only, consistent with "most Thursdays"; no third source on "several times a month".
- Conflicts 2, 5, 6, 7, 8, 9: no third official page found.

**Other faith lines found in passing**
- HS catalog (AP section): "Our school’s first priority is to spiritually equip our students, but please note that academic success is vitally important as well."
- AUP: "As a Christian school, HGCS expects students and staff to use technology in a manner that honors God, reflects biblical values, and supports the mission of Hickory Grove Christian School."
- Athletics media policy: "Media personnel must conduct themselves in a manner that reflects the mission of Hickory Grove Christian School Athletics: to know Christ and to make Him known."
- Athletic camps: "while encouraging teamwork, sportsmanship, and character that honors Christ on and off the field." and "Looking for academic and enrichment camps? Those are open to HGCS students and Hickory Grove Baptist Church members."
- Booster Club form: "A critical function of the HGCS Boosters is to promote high principles of character and a Christ-like approach in all areas of student life."
- "Adventures in Spanish" (Pre-4K): "an immersive Spanish Pre-4K program grounded in a biblical worldview, nurturing young hearts with Christian values and a love for Christ." It uses "The Gospel Project and The Creative Curriculum".
- Employment: "As a ministry, we are dedicated to partnering with parents to nurture each student’s identity in Christ while preparing them for life through a biblical worldview."
- Aquaponics (LEAD, orphan page): "the majority of each harvest donated to Hickory Grove Baptist Church’s food pantry" and "This pantry supports over 250 families each month".

## Method: gap verdicts

| # | Gap | Verdict |
|---|---|---|
| 1 | Parent faith / church / Statement of Faith | **PARTLY.** For TK–12, still NOT STATED: only the pastor's recommendation and the interview "share" of the Statement of Faith. For Mallard Creek preschool, the interest form requires answers on church membership, the parent's faith and support for the mission, but states no admission rule. |
| 2 | Chapel attendance and frequency | **PARTLY.** Frequency closed: 10 chapels (8 split, 2 school-wide) plus a Senior Recognition Chapel, Thursdays except two Fridays, two in March. The attendance rule is in the login-only handbook. |
| 3 | Retreats, faith trips | **STILL NOT FOUND ON PUBLIC PAGES.** Confirmed absent by site search, calendar feed and PDF; the Senior Trip and 8th Grade Trip have no description. |
| 4 | Service-hour rule | **STILL NOT FOUND ON PUBLIC PAGES.** Confirmed absent from catalog, profile and site search. |
| 5 | Senior mission trip: all go, in tuition | **PARTLY.** January 2027, Dominican Republic, with Mission Week for the rest of the high school. Cost/tuition not stated; "all seniors" not stated in words, and an orphan page calls it an "opportunity". |
| 6 | Bible credits for late transfers | **PARTLY.** "1 per year" and a general transfer-credit rule; no Bible-specific transfer rule. |
| 7 | Handbook, questionnaire, pastor form | **CLOSED (not public).** The school says the handbook is for current families in ParentSquare and FACTS; the forms sit inside the FACTS login. |
| 8 | General doctrinal statement, BF&M, date | **STILL NOT FOUND ON PUBLIC PAGES.** The date stays a metadata LEAD. |
| 9 | Staff with a faith title | **PARTLY.** Fernando Rogante is the published Bible department head with a school email; no chaplain or spiritual life post; no pastor email. |
| 10 | Conflicts | **PARTLY.** Conflict 1 settled; conflict 3 gains a third wording; the others are unchanged. |

## Corrections to the first-pass file

1. "Could not read — The family / student handbook … The full handbook is not linked publicly." → Now stated by the school: "The 2026–27 Student Handbook is available to current families in ParentSquare and the FACTS Family Portal." (/myhgcs). Its title on the attendance letters is the "Parent-Student Handbook".
2. "Not found — Whether a parent must be a Christian, a church member …" → Still not stated for TK–12, but the Mallard Creek EEC interest form requires parents to answer "Are you and your family an active member of a church?", describe church involvement, describe "your walk with the Lord (description of the parent's faith)", and say whether they "support all aspects of the school's mission". Card 6 should say this applies to the preschool interest form only.
3. INFERENCE "that is ten chapel days plus a Senior Recognition Chapel" → confirmed and refined: the 10 are 8 split chapel days plus the two school-wide chapels (Thanksgiving, Christmas), matching "10 Chapels / each school year, with messages for elementary and for middle and high school." Vimeo archive titles confirm the August–November pattern.
4. "Calendar trips with no stated faith content: "Senior Trip" (September 2026) …" → The Senior Trip appears on the calendar PDF only; the calendar feed has no Senior Trip entry.
5. First-pass chapel table: the PDF's "Easter Chapel" and "End Of Year Chapel" are plain "Elementary Chapel" / "Middle, High School Chapel" entries in the feed. The days agree; only the names differ.
6. "Fernando Rogante | Bible department contact in the HS catalog" → the catalog calls this list "the department heads", so his published role is Bible department head (high school).
7. "Senior Mission Trip … Cost and whether it is in tuition: not stated." → Still not stated; the tuition PDF and page list no trip charge. Add: Mission Week is INFERENCE-dated to the same January 2027 week.
8. "Any service-hour requirement … (none in the catalog's graduation requirements)." → Also absent from the profile, site search and every hosted PDF; no NHS page.
9. Bible transfer rule → add the catalog's general line "Transfer Credits: Students may earn and transfer credits from other accredited institutions." The Bible-specific rule is still unstated.
10. **New conflict A — senior mission trips.** /missions-and-service: "Our seniors serve together annually on a mission trip to the Dominican Republic." /aquaponics (LEAD, orphan page): "each year our senior class has the opportunity to participate in mission trips—both domestic and international". The first reads as one class trip to one country; the second as optional, with domestic and international trips. The orphan page is unlinked and undated, so the nav-linked page should be printed.
11. **New conflict B — a third mission wording.** Mallard Creek EEC interest form: "As a school, our mission is "To equip students to serve God in the 21st century by providing an excellent academic program founded upon a biblical worldview."" This differs from both mission wordings in first-pass conflict 3. INFERENCE: an older mission statement left on the preschool form.
12. **New minor conflict C — graduation credits.** HS catalog: "Personal Finance 1" and "Electives 3" (27 credits). School profile: "Electives 4 units", no Personal Finance line (27 units). Bible is 4 in both, so the faith requirement is unaffected.
13. **Minor:** the 2026-2027 HS catalog's intro still says "carefully review the course descriptions outlined in the Course Selection Catalog for the 2025-2026 school year."
14. **Spellings the school uses two ways:** "Quiet Time Cafe" (/middle-school-home) and "Quiet Time Café" (/469460_2); the Vimeo archive titles the same chapel "Elementary Chapel" and "Elementary School Chapel", and "Middle/High School Chapel" and "Middle & High School Chapel". The tuition page says "6th-12th Grade After School Childcare" where its PDF says "6th-12th grade After School Study Hall" (not faith).
15. "Statement of Faith date: … LEAD" → unchanged; confirmed by `pdfinfo` that the date is in the Title metadata only, and the text has no date.
