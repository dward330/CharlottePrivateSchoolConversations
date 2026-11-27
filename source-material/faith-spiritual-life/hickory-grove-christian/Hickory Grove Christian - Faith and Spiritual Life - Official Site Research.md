# Hickory Grove Christian School — Faith & Spiritual Life — Official Site Research

**Status:** planned as `hgfaithlife` on 2026-11-26; second-pass corrections folded in, each marked (second pass).

**Provenance.** Collected 2026-11-26 by Claude (Claude Code). Hickory Grove Christian School's
**own** pages were fetched directly (`curl`, raw HTML stripped to text), along with the PDFs those
pages link (`pdftotext -layout`; the 2026-27 calendar PDF was also rendered to an image and read by
eye to place entries in the right month). The site is no longer on Finalsite: it now runs on
ParentSquare SmartSites, and its documents live under
`https://files.smartsites.parentsquare.com/14485/`. Three course and journal documents are embedded
on the school's pages as Heyzine flipbooks; their PDFs were fetched from the flipbook embeds. Two
forms are embedded as Fillout forms (employment application, chapel pre-registration); their public
field labels were read from the embed. The staff directory was read through the site's own directory
loader (`/includes/ajax/load_stack_staff_directory.php`, 116 entries); each email there is the
address the "Send Message" button carries, base64-encoded in the page, and decoding it is reading
the published address. The 2026-27 calendar was also read through the site's own calendar feed
(`/api/calendars/153239/events`, 110 events, August 2026 to May 2027).

School confirmed by name and address on every page footer: "7200 E W T Harris Blvd Charlotte, NC
28215-7200". **Official school sources only**: hgchristian.org and documents it hosts or links as its
own. No third-party page is used as evidence. Hickory Grove Baptist Church's own site
(hickorygrove.org) is linked from the school's pages but was **not** read. Quotes are char-for-char,
including the source's own typos (kept as printed and marked [sic] only where noted).

**Re-check.** Fourteen key quotes were re-checked against the raw downloads (whitespace-normalized
substring match) before this file was finished: the "As a ministry of Hickory Grove Baptist Church"
sentence; "13 Years / of Bible as a core class"; "10 Chapels / each school year"; the chapel page's
"Once a month" sentence; the middle school "One Thursday a month" sentence; the Statement of Faith
"Application:" paragraph; the Statement of Faith "Authority:" paragraph; the pastor's
"Personal Recommendation form (from student/family's pastor)" line; the Family Interview line; the
employee "Committed Christian in agreement with the school's Statement of Faith." line; "Bible  4";
the Global Missions certificate church-member requirement; the Honor Dress chapel sentence; and the
"Females must present as females" sentence. All fourteen matched. The same check was run on 32
further quotes in this file (46 in all, all matched), and each of the 17 numbered Statement of Faith
items below was matched against the PDF text: all 17 matched.

**Names.** No student is named in this file. Sources checked for student names: the 17 chapel,
Lions Connect and Wednesday-devotion handouts carry adult speakers only (no student name found in a
capitalized-word scan); the Alumni Relations Board page and the home page testimonials carry adult
graduates and parents, none copied here. The Here I Stand student journal has a blank "THIS JOURNAL
BELONGS TO / NAME" line only. Adults in adult roles (staff, pastors, board) are named as the school
publishes them.

**Kept out on purpose.** Trip prices and exact travel dates (season and year only). Personal details
printed in handouts and on the alumni board page (family members, home towns, a speaker's spouse).

Base for every relative URL below: `https://hgchristian.org` (the `www.` form serves the same site).
A `files.smartsites.parentsquare.com/14485/<file>` path is a document the school's site links.

## Source URLs

### Pages read (all 2026-11-26, base `https://hgchristian.org`)

| URL | Title | Holds |
|---|---|---|
| / (also /123979) | Homepage | "Daily Bible, chapel, and missions" line; "For 30 years" line; Here I Stand banner (testimonials: no names copied) |
| /469460_2 (nav "Spiritual Life"; /126368 redirects here) | Spiritual Life | Mission, 13 years of Bible, 10 chapels, verse a week, Bible by division, discipleship groups, Lions Connect, church partnership |
| /chapel | Chapel & Worship | Monthly chapel, Chapel Band, Praise Team, Christmas Chapel, next chapel, Chapel at Home recaps (links to 4 PDFs and 4 videos) |
| /here-i-stand (redirects to /here-i-stand-2) | Here I Stand | Year theme, Wednesday devotions (34 weeks), Grove Groups, student journal; links to 11 devotion recap PDFs |
| /here-i-stand-journal | Here I Stand - High School Journal | Heyzine flipbook embed (journal PDF read, below) |
| /missions-and-service | Missions & Service | Senior DR mission trip, Mission Week, quarterly collection and its three causes, HGBC Food Pantry, Global Missions & Language Certificate |
| /lions-connect | Lions Connect | Parent session on chapel mornings, led by HGBC pastors; recaps; book list |
| /esos | Expected Student Outcomes | Mission, three ESOs, "Our students will" lists |
| /chapel-pre-registration | Chapel Pre-Registration | Fillout form: visitor times 8:00am / 9:00am / 9:30am; registrants must be 18 |
| /hgcs-live-stream-w-chapel | (redirects to vimeo.com/event/3673221) | School's chapel livestream (not watched) |
| /our-beliefs | Our Beliefs | Beliefs list, school verse, vision, mission, ESOs; "As a ministry of Hickory Grove Baptist Church" |
| /about-us (→ /about-us-home) | About Us Home | Head of School welcome ("Since 1995") |
| /accreditation | Accreditation | Cognia and ACSI dual accreditation |
| /advisory-board | Advisory Board | Board's relation to HGBC Senior Pastor; members |
| /employment-opportunities (→ /employment) | Employment Opportunities | "Committed Christian in agreement with the school's Statement of Faith." "Active in a local bible-believing church." |
| /employment-application | Employment Application | Fillout form 9UiY6EK35fus: Statement of Faith link, church reference, testimony upload |
| /our-staff + directory loader (item 2344173) | Our Staff | 116 entries: name, department, published email (no job titles) |
| /calendar, /page/page_calendar?calID=153239, `/api/calendars/153239/events?view_source=full-calendar` | Calendar | Chapel days and times for 2026-27, Senior Mission Trip month |
| /admissions (→ /admissions-home) | Admissions Home | Founding line, mission quote, HGBC-member priority window, checklist PDFs |
| /apply | Apply Online | Links to the FACTS online application only (no readable steps) |
| /tuition-and-fees | Tuition and Fees | No faith content |
| /scholarships, /scholarships-financial-aid (→ /280423_3), /taxcredit | Scholarships pages | "like-minded pastor" discount line |
| /international-program-home | International Student Program | "know Christ and make Him known around the world"; program since 2013 |
| /international-student-enrollment-pr | International Student Program Admissions | Steps (no pastor reference listed) |
| /host-families | International Student Host Family Program | "missions in reverse"; HGBC members and HGCS families; links the host application |
| /academics-home | Academics Home | Bible mandatory, monthly chapels, small-group discipleship, vision, outreach countries |
| /early-education-center (→ /early-education-center-home), /harris-campus (→ /harris-campus-home), /mallard-creek-campus | Early Education Center | Gospel Project for Preschool; HGBC-member application window (Mallard Creek) |
| /elementary-school-home | Elementary School | 200+ verses, Lions in Prayer, Kingdom Builders, Hang Ten, ESOs |
| /tk-and-k5 | What is TK and K5? | Parents "tasked by God through scripture" line |
| /middle-school-home | Middle School | Morning devotions, monthly Thursday chapel in the sanctuary, Grove Groups, Quiet Time Cafe, Spanish Immersion Bible |
| /high-school-home | High School | Spiritual formation, Wednesday devotions, Student Honor Code, D-groups on Thursdays, "4 Years of Bible" |
| /college-and-career-planning | College & Career Planning | Counseling "through a biblical worldview lens" |
| /course-selection-guide, /ms-courses | Course Selection Guides | Heyzine flipbook embeds (PDFs read, below) |
| /spanish-immersion | Spanish Immersion | Gospel-centered purpose of the program |
| /student-services (→ /student-services-home), /educational-support-services, /wellness (→ /wellness-home), /crisis | Student Services pages | Faith framing sentences only |
| /arts-home, /performing (nav "Performing Arts"; /performing-arts serves the same page), /visual-arts, /digital-arts | Arts pages | Chapel Band, Praise Team, worship dance, Bible Sketch, Fiber Crafts, class devotions |
| /athletics-home, /279524_3 (coaches) | Athletics | "Disciple Athletes" goal |
| /afterschool-program, /summer-camps | Afterschool & Summer | Camps open to HGCS students and HGBC members |
| /hgcs-home, /ptf, /aaa-booster-club, /legacy-sponsorship, /give | Community pages | Four communities; PTF "believers united"; gifts through HGBC's giving site |
| /alumni (→ /alumni-home), /alumni-at-hg, /military-alumni, /alumni-relations-board | Alumni pages | Alumni on staff with HGBC ministry titles; alumni board bios (adult graduates; personal details not copied) |
| /safety-visitor-policy, /contact-us-location, /site_map | Other About pages | Address; "school and church events" |

### Linked documents read

| Link on the school site → file | Document | Date on it |
|---|---|---|
| Employment application (Fillout 9UiY6EK35fus on /employment-application) → `https://drive.google.com/file/d/1mDowLVWj8E9ASHkSDCAWp3QHftdd9UMy/view` | "Statement of Faith: Marriage, Gender, and Human Sexuality" (3 pp.) | No date in the text. **LEAD:** the PDF's internal title reads "(updated Spring, 2022)". Linked live as "the HGCS Statement of Faith". |
| /admissions → `newfamilyadmissionschecklistesnodate.pdf` | New Elementary Families Admissions Checklist | "Revised 11/17/25"; listed on /admissions as 2026-10-08 |
| /admissions → `newfamilyadmissionschecklistmhsnodate.pdf` | New Middle and High School Families Admissions Checklist | "Revised 11/17/25"; listed 2026-10-08 |
| /middle-school-home, /high-school-home → `hgcs_studenthonorcode.pdf` | Honor Code ("Appendix C: Honor Code", pp. 54–56 of a handbook) | undated |
| /middle-school-home → `mshsdresscode.pdf` | Middle-School & High-School Dress Code + Honor Dress Code ("Appendix A", pp. 50–51) | undated |
| /elementary-school-home → `esdresscode.pdf` | TK-5th Grade Uniform Dress Code (pp. 36–37) | undated |
| /calendar → `calendar2026-2027.pdf` | 2026-2027 Calendar | "Revised 11/11/2026" |
| /high-school-home, /college-and-career-planning → `2026-2027schoolprofile.pdf` | High School Profile 2026-2027 | 2026-2027 |
| /middle-school-home → `2026-_2027_ms_schedule.pdf`; /high-school-home → `final_hs_bell_schedule.pdf` | Bell schedules | 2026-2027 (MS); HS undated |
| /course-selection-guide → Heyzine `ab637c042c` → `cdnm.heyzine.com/files/uploaded/v3/ab637c042cee7badd9cfb618c436c69383236370-6.pdf` | 2026-2027 Course Selection Catalog (high school, 92 pp.) | 2026-2027 |
| /ms-courses → Heyzine `763ddc7baf` → `cdnm.heyzine.com/files/uploaded/763ddc7baf20351fbe2941eba4168c285c42b31e-1.pdf` | Middle School 2026-2027 Course Selection Catalog (17 pp.) | 2026-2027 |
| /here-i-stand-journal → Heyzine `6a3ff754be` → `cdnm.heyzine.com/files/uploaded/v3/6a3ff754bebac18bba25e46394806cdf07659e2a.pdf` | Here I Stand · Student Journal (129 pp.) | undated; PDF created June 2026 |
| /chapel → `20260917_-_elementary_chapel_-_abraham_-_parent_handout.pdf`, `20260917_-_ms-hs_chapel_-_abraham_-_parent_handout.pdf`, `20261022_-_elementary_chapel_-_joseph_-_parent_handout.pdf`, `20261022_-_ms-hs_chapel_-_joseph_-_parent_handout.pdf` | Chapel at Home recaps | September 17, 2026; October 22, 2026 |
| /lions-connect → `20260917_-_lions_connect_-_parent_handout.pdf`, `20261022_-_lions_connect_-_hard_providences_-_parent_handout.pdf` | Lions Connect recaps | September 17, 2026; October 22, 2026 |
| /here-i-stand → 11 PDFs, `20260819_-_martin_luther.pdf` … `20261104_-_william_tyndale.pdf` | HS Wednesday Devotion recaps, weeks 1–8, 10–12 | August 19 – November 4, 2026 |
| /host-families → `https://drive.google.com/file/d/1NcRTFcbKKVaAj1qRD6z24Xbp-xFmy7GI/view` | International Student Host Family Application + References (16 pp.) | PDF created 2026-10-23 |

### Could not read

- **The family / student handbook.** The Honor Code is "Appendix C" (pp. 54–56) and the MS/HS dress code is "Appendix A" (pp. 50–51) of a larger document, and the ES dress code is pp. 36–37 of one. The full handbook is not linked publicly. (second pass) The school now says so: "The 2026–27 Student Handbook is available to current families in ParentSquare and the FACTS Family Portal." (/myhgcs); attendance letters title it the "Parent-Student Handbook". /elementary-school-home says "myHGCS is our password-protected parent page. It has forms, the lunch menu, the dress code and other important documents." Any chapel attendance rule, discipline code or parent agreement would most likely be there.
- **The online application** (FACTS, `sis.factsmgt.com/admissions-parent/...`, linked from /admissions and /apply): login required, so the Student Questionnaire, the pastor's Personal Recommendation form and any faith questions in the parent application are unseen.
- **The Personal Recommendation (pastor) form and the Student Questionnaire** themselves: listed on both checklists, not posted as public files.
- **Baptist Faith and Message (2000).** The Statement of Faith says it elaborates on it, but the school's site does not link it. Not read (it would be a denomination source).
- **Hickory Grove Baptist Church site** (hickorygrove.org, linked from /469460_2 and /our-beliefs as "Click Here to learn about Hickory Grove Baptist Church"): a church site, deliberately not read.
- **Chapel videos** (Vimeo showcase 10856617, livestream event 3673221): not watched.
- **Visit form** (/visit → Google Form): form only.
- **/parent-teacher-fellowship**: 404 (linked from /elementary-school-home); the live page is /ptf. **/give-2**: 404; the live page is /give. **/news**: 404; the site has no public news board in its navigation.
- **Site search** (/search): renders by script; returned no static results.

### LEADS only (not used as facts)

- Statement of Faith date: "(updated Spring, 2022)" appears only in the PDF's internal title metadata, not on the page or in the text.
- Existing repo research (admissions, course-offerings) lists the same pastor-reference requirement and an earlier Judson College / SEBTS dual-enrollment note; used only to find pages, nothing taken from it.

---

## Findings

### 1. Chapel and worship

**Frequency and pattern**
- "10 Chapels / each school year, with messages for elementary and for middle and high school." — /469460_2
- "Worship is at the heart of who we are at Hickory Grove Christian School. Once a month, students, faculty and pastors from Hickory Grove Baptist Church gather to praise God together as one body. Elementary students meet first, then middle and high school students worship together, each with a message for their age." — /chapel
- "Chapel isn't a break from learning. It brings together what students hear in Bible class, pray about in morning devotions and live out every day, and it reminds all of us that we belong to something bigger than one classroom." — /chapel
- "Bible classes are mandatory at the elementary, middle, and high school levels, and monthly chapels provide dedicated times for worship and biblical teaching." — /academics-home
- Middle school: "Each morning, teachers lead a devotion time. One Thursday a month, students gather in the sanctuary for Chapel, where our pastors teach through this year’s “Here I Stand” theme while students engage with Chapel notetaking sheets." — /middle-school-home
- "Every Wednesday, students also hear a devotion from this year’s Here I Stand series. Families can watch chapel any week through Live Chapel." — /high-school-home
- "Can't be there? Every chapel is streamed live and saved to our archive." — /chapel

**2026-27 chapel days** (calendar PDF "Revised 11/11/2026" and the site's calendar feed agree on the days):
- Calendar PDF chapel lines: Aug 27 "Chapel/Honor Code Ceremony"; Sep 17 "Chapel"; Oct 22 "Chapel"; Nov 20 "Thanksgiving Chapel (School-Wide) & Elementary Banquet, Early Dismissal"; Dec 10 "Christmas Chapel (School-Wide)"; Jan 21 "Chapel"; Feb 18 "Chapel"; Mar 11 "Chapel"; Mar 25 "Easter Chapel"; Apr 22 "End Of Year Chapel"; Apr 30 "Senior Recognition Chapel/ Prom".
- CONFIRMED (second pass): the "10 Chapels" are 8 split chapel days (elementary, then middle and high school) plus the two school-wide chapels (Thanksgiving, Christmas), matching "10 Chapels / each school year, with messages for elementary and for middle and high school." The Senior Recognition Chapel (Apr 30) is an eleventh, for seniors. Nine fall on a Thursday; Nov 20 is a Friday. March has two (Mar 11 and Mar 25).
- (second pass) The calendar feed names the PDF's "Easter Chapel" and "End Of Year Chapel" as plain "Elementary Chapel" / "Middle, High School Chapel" entries. The days agree; only the names differ.
- Calendar feed times (stored in UTC; converted to Eastern by me — INFERENCE): "Elementary Chapel" 8:00–9:00 AM and "Middle, High School Chapel" 9:30–10:30 AM on each split day (Aug 27 MS/HS runs to 11:00 AM as "Middle, High School Chapel, Honor Code Ceremony"); "Thanksgiving Chapel" Nov 20, "Christmas Chapel (School-wide)" Dec 10 and "Senior Recognition Chapel" Apr 30 at 9:30–10:30 AM. The conversion is confirmed by the chapel pre-registration form: "Elementary Chapel (8:00am)", "Lions Connect (9:00am)", "MS/HS Chapel (9:30am)" — /chapel-pre-registration (Fillout dhe2yQoH7zus).
- /chapel (2026-11-26): "Next Chapel: Friday, November 20 / Moses: Stood as a Child of God / 9:30 AM / All School Chapel".

**Where**
- MS: "students gather in the sanctuary for Chapel" — /middle-school-home.
- Honor Dress Code: "Honor Dress emphasizes and calls attention to the fact that students will be in the sanctuary for a formal and/or worship affair and dress should reflect this distinction." — `mshsdresscode.pdf`
- INFERENCE: "the sanctuary" is the church's; the school sits on the church campus (calendar legend: "Church and School CLOSED/Holiday"). Not stated as such.

**Who leads**
- "HGBC pastors teach in chapel and lead Lions Connect, church and school musicians worship together" — /469460_2
- Speakers named on the Chapel at Home recaps (adults): Elementary chapel Sept 17 — "Speaker: Campbell Benfield, Family Discipleship Pastor"; MS/HS chapel Sept 17 — "Speaker: Nick Gentili, Student Discipleship Pastor"; Elementary chapel Oct 22 — "Speaker: Ben Harris, Family Discipleship Pastor"; MS/HS chapel Oct 22 — "Speaker: Jacob Prince, Student Discipleship Pastor". Each recap cites its passage "(ESV)".
- "Chapel Band Students audition, rehearse and help our worship pastors lead student-led chapel." — /performing

**Theme**
- "This year's chapel series follows men and women of the Bible who took a stand for God." — /chapel
- Here I Stand journal, Chapel Notes ("Each month we follow one biblical figure and the stand they took — in obedience, in trial, in courage, and in restoration."): August — Galatians 1:10 "Year Overview"; September — Abraham, "Stood for Obedience"; October — Joseph, "Stood on God’s Sovereignty"; November — Moses, "Stood as a Child of God"; December — Christmas, "The Word Made Flesh"; January — Rahab, "Stood for Courage"; February — Daniel, "Stood in Trials"; March — Ezra / Nehemiah, "Stood for God’s Word"; Easter — Peter, "Stood in Restoration"; April — Paul, "Stood in Perseverance".
- Chapel page recap titles: "September · Abraham: Stood for Obedience"; "October · Joseph: Stood for God's Sovereign Control".

**Students leading worship**
- "Students don’t just watch worship happen. They learn to lead it. High school students audition for Chapel Band, middle schoolers lead in Praise Team, and our performing arts students lead the annual Christmas Chapel. After chapel, middle school students look back over their chapel notes and high schoolers write in their Here I Stand journals, so the message stays with them." — /chapel
- Praise Team (MS course, grades 7-8): "Praise Team is a performance-based course designed for students who desire to use their musical talents to lead others in worship." — MS catalog p. 13 area; also /performing: "Praise Team (7th–8th) · For students who want to use their musical gifts to lead others in worship."
- "Beginning Dance (7th–8th) · Students explore the basic principles of dance, with a focus on modern dance and its emphasis on expression and worship." — /performing
- "Tech Production is designed to support the ministry of HGCS in Chapel production (handling almost all behind the scenes aspects of Chapel/ video creation)." — HS catalog, Tech Production and Photoshop
- "Throughout the year, they perform in chapel, end-of-semester concerts, band festivals, two drama productions and a spring musical." — /performing
- Elementary music: "Students sing, learn rhythm and the basics of music, and use their voices to worship." — /elementary-school-home

**Visitors**
- "Families and friends are always welcome. Register ahead to skip check-in at the front door." — /chapel
- Pre-registration form: "Invalid Date of Birth; Registrants must be 18 years old." — /chapel-pre-registration

**Dress for chapel**
- "Honor​ ​Dress​ ​is​ ​required​ ​for​ ​all​ ​chapel​ ​programs​ ​in​ ​6th-12th​ ​grades​ ​and​ ​at​ ​certain​ ​special​ ​events." — `mshsdresscode.pdf` (the PDF carries zero-width spaces between words; the words read: "Honor Dress is required for all chapel programs in 6th-12th grades and at certain special events.")
- "Outward dress should demonstrate reverence to God, submission to authority, and “profess Godliness” based upon the modest attire (1 Timothy 2:9-10)." — same (zero-width spaces removed)

**Daily and weekly devotions (not chapel)**
- Elementary: "Each day begins with Scripture, a teacher devotional and prayer, and students memorize about one Bible verse each week." — /469460_2
- MS: "Quiet Time Cafe / A calm space for daily devotion and journaling from 7:00–7:15 a.m." — /middle-school-home
- HS: "Every Wednesday this year, our high school students gather for a devotion in Here I Stand: Mentors · Missionaries · Martyrs , a series on thirty-four witnesses who stood firm for Christ across twenty centuries. Each week a teacher or pastor tells one witness’s story, and students follow along in a chapel journal with that witness’s signature quote and a question to discuss." — /here-i-stand-2
- HS bell schedule: Wednesday "Devotion/ Morning Break 9:10-9:35" — `final_hs_bell_schedule.pdf`
- Digital Arts: "Each class begins with a devotion" — /digital-arts

**Not found in this research**
- Whether chapel attendance is required, and any excused-absence rule (the handbook is not public).
- A chapel location for elementary chapel or the all-school chapels (only MS "the sanctuary" and the Honor Dress line).
- A baccalaureate service (none on the calendar; "Senior Recognition Chapel" Apr 30).
- Any school-employed chaplain who leads chapel; every named chapel speaker is an HGBC pastor or school administrator/teacher.
- A spiritual emphasis week or revival week.

### 2. Bible, theology or religion classes

**Summary lines**
- "13 Years / of Bible as a core class, from kindergarten through 12th grade" — /469460_2
- "Bible classes are mandatory at the elementary, middle, and high school levels" — /academics-home
- "4 / Years of Bible every graduate completes." — /high-school-home
- Home page: "Daily Bible, chapel, and missions equip students to love God deeply and serve others boldly." — /

**Early Education Center (preschool)**
- "The Creative Curriculum® and The Gospel Project for Preschool will be incorporated weekly in every classroom." — /early-education-center-home

**Elementary (K–5)**
- "Students study Bible every day, from kindergarten through 5th grade, using Building on the Rock , a biblical worldview and Bible survey curriculum. The goal is for children to know God's Word and see the world through it from their very first years. Each day begins with Scripture, a teacher devotional and prayer, and students memorize about one Bible verse each week." — /469460_2
- "1 Verse a Week / memorized by our elementary students." — /469460_2
- "200+ / Bible Verses memorized by the time they leave Elementary School" — /elementary-school-home
- "From Transitional Kindergarten through 5th grade, students build a strong foundation in Bible, math, reading, writing, spelling, speaking and listening, history, and science." — /elementary-school-home
- Kingdom Builders (grades 4–5 special): "Students receive Biblically based lessons about things like communication, conflict resolution, problem solving, and sportsmanship, then get to practice applying it through hands-on activities, building projects, and team challenges." — /elementary-school-home

**Middle school (6–8)**
- "Students take Bible every year using Summit Ministries' worldview curriculum, moving from Building on the Rock in 6th grade and Walking in Truth in 7th to Light Bearers in 8th. The goal is for students to understand what they believe and why, and to stand firm in their faith in a culture full of competing worldviews. Faith and Leadership enrichment courses carry those lessons into everyday life." — /469460_2
- MS catalog (2026-2027), "BIBLE COURSE OFFERINGS": 6th Grade — "Building on the Rock / The Christian Worldview / Publisher: Summit Ministries"; 7th Grade — "Walking in Truth / Competing Worldview / Publisher: Summit Ministries", "Competing Worldviews (7th grade) compares and contrasts the key tenets of Chrisitanity [sic] to Islam, naturalism, and new spirituality."; 8th Grade — "Light Bearers / A Biblical Worldview / Publisher: Summit Ministries", "Christianity in Action (Light Bearers) helps students understand how they can live out their Christian worldview in a post-Christian culture."
- "Every middle school student takes five core classes: Bible, English, Math, Science, and History." — /middle-school-home
- "Spanish Immersion students take History and Bible in Spanish and serve as interpreters for the Hickory Grove Baptist Church food pantry." — /middle-school-home
- Faith & Leadership enrichment (MS catalog): "Navigating Middle School with Character and Faith" (grade 6, "(This course will be NON Graded)"); "Becoming a Young Man of God" (7-8, "designed specifically for middle school boys. It combines fun activities, relevant discussions, and scripture to explore identity, masculinity, and self-confidence."); "Becoming a Young Woman of God" (7-8); "Students on Mission" (7-8); "Christian Leadership" ("Selected 8th Grade Students ONLY"). Art: "Bible Sketch" (grade 6), "This course invites students into the grand story of Scripture through the combined practices of Bible study and visual art."

**High school (9–12)**
- "Students take a Bible course every year, moving from Old Testament Survey in 9th grade and New Testament Survey in 10th to Apologetics in 11th and Systematic Theology in 12th. The goal is more than head knowledge: students learn to rightly interpret and apply Scripture. Honors and dual enrollment options are available." — /469460_2
- Graduation requirements (HS catalog p. 7): "Bible  4  Introduction to Bible, Old Testament Survey, Honors Old Testament Survey, New Testament Survey, Honors New Testament Survey, Apologetics, Systematic Theology, Honors Systematic Theology, Honors Introduction to Philosophy, Honors Introduction to Ethics" (of "27 Credits"). Profile: "Bible  4 units".
- Bible Department page (HS catalog p. 22): "9th Grade Bible Core Requirements: One Unit" — CP Old Testament Survey / Honors Old Testament Survey; "10th Grade" — CP New Testament Survey / Honors New Testament Survey; "11th Grade" — CP Christian Apologetics / Honors Apologetics / Honors Introduction to Philosophy; "12th Grade" — CP Systematic Theology / Honors Systematic Theology / Honors Introduction to Ethics.
- Same page: "o Students may only take 1 core class per year unless repeating a course / o Minimum total credits: 1 per year"
- **Late joiners.** "Introduction to Bible / Grade Level(s): 9-12 … It is recommended for students who have never attended a Christian school or are new to HGCS. Course enrollment will be based on administrative recommendation." — HS catalog p. 26. General transfer rule: "Unless transferring into HGCS during high school, students are required to take all coursework at HGCS in order to earn graduation credits." — HS catalog p. 7. INFERENCE: "Minimum total credits: 1 per year" reads as one Bible credit per year enrolled; the catalog does not say in words whether a late joiner owes all 4. (second pass) The catalog's general line: "Transfer Credits: Students may earn and transfer credits from other accredited institutions." A Bible-specific rule is still unstated.
- Honors placement: "Students wishing to move from non-honors courses to honors level Bible courses must meet the require- ments listed below." Regular 90+ → Honors; Honors 80+ stays Honors. — HS catalog p. 23 ("Biblical Studies Department Placement Criteria")
- Dual enrollment: "All Dual Enrollment courses are aligned with specific student learning objectives established by Judson College, which is the undergraduate college program of Southeastern Baptist Theological Seminary (SEBTS)." Courses: "Honors Old Testament, Honors New Testament, Honors Systematic Theology, Honors Introduction to Philosophy, Honors Introduction to Ethics." — HS catalog p. 4
- Apologetics content: "Students will also learn about various ethical systems and how to respond to issues such as homosexuality, abortion, stem cell research, and euthanasia from a biblical perspective." Honors adds three projects, including to "practice the discipline of apologetics with a non-Christian". — HS catalog p. 24
- Systematic Theology: "In this course, students solidify their understanding of doctrines essential to the orthodox Christian faith." — HS catalog p. 27
- Faith electives: "Arts and Theology" (9-12, Biblical Studies); "Fiber Crafts II" ("a small quilt inspired by a study of the women of the Bible … a weekly Bible study is incorporated").
- Contact: "Bible- Fernando Rogante fernandorogante@hgchristian.org" (department contacts list) — HS catalog p. 3

**Bible translation**
- INFERENCE: the ESV. Every chapel, Lions Connect and devotion recap cites its passages "(ESV)", and the Honor Code's verses match ESV wording. No page states a required student Bible or translation.

**Distinctions**
- Global Missions & Language Certificate (HS catalog p. 9; /missions-and-service) — see section 7.
- "Honors Courses are available in English, Math, Science, Social Studies, Bible, and Foreign Language." — profile

**Not found in this research**
- A named elementary Bible curriculum other than "Building on the Rock" (the same title as 6th grade; the elementary publisher is not named).
- A required student Bible or translation, or a Bible on any supply list (no supply lists found).
- A stated rule for how many Bible credits a student who enters in 10th–12th grade owes.
- Bible grades' weight in GPA beyond honors weighting.

### 3. Retreats and small groups

**Small groups / discipleship**
- "We want students to truly know others in Christ, not just belong to a group. That happens in smaller settings throughout the year." — /469460_2
- "Middle School Grove Groups: Students gather by grade level each month to learn from the lives of mentors, missionaries and martyrs, then break into small groups to talk about what they heard. Teachers lead devotions every morning, and the Quiet Time Café gives students a calm place for devotions and journaling before school." — /469460_2
- "On the first Thursday of each month, Grove Groups bring boys and girls together by grade level to learn from the lives of martyrs, missionaries, and mentors, then break into small discipleship groups to talk through what they’ve heard." — /middle-school-home
- "High School Discipleship Groups: Every high school student is placed in a small discipleship group led by a teacher. Groups meet several times a month so students can grow in their relationship with Christ, connect with teachers and classmates in a smaller setting, and serve together." — /469460_2
- "Club Flex (Tuesdays and Thursdays, 12:45–1:25): Time during the school day for student clubs to meet, so every student has a way to get involved. On most Thursdays, this time is used for D-groups." — /high-school-home
- "Discipleship groups serve together on campus, like high schoolers making encouragement cards for elementary students." — /missions-and-service
- "Student pastors: Hickory Grove Baptist Church's student discipleship pastor is on campus and available for one-on-one conversations with students." — /469460_2
- "We also offer small-group discipleship opportunities that foster personal spiritual development" — /academics-home
- Athletics: "Disciple Athletes — We will strive to have great discipleship on our teams. (1 Peter 5:2)" — /athletics-home

**Student faith leaders**
- Chapel Band (HS, audition), Praise Team (MS course) — section 1.
- "Christian Leadership" (selected 8th graders): "students will be expected to commit to serving as campus leaders throughout the entire school year" — MS catalog.

**Retreats and trips**
- No retreat found on any page or on the 2026-27 calendar.
- Calendar trips with no stated faith content: "Senior Trip" (September 2026) and "8th Grade Trip" (October 2026). (second pass) The Senior Trip appears on the calendar PDF only; the calendar feed has no Senior Trip entry. (second pass) The site's own search returns nothing for "retreat". The Senior Mission Trip is section 7.

**Not found in this research**
- Any retreat (class, grade, leadership or spiritual) in any division, its place, whether all go, or whether it is in tuition.
- Elementary small groups.
- Advisory or homeroom as a faith setting (the MS bell schedule shows "Homeroom" only).
- What the Senior Trip and 8th Grade Trip are.
- A student chaplain, spiritual life council or prefect role.

### 4. Spiritual life staff

No school chaplain, campus pastor, or spiritual life director appears on any page, in the staff directory, or in the profile. The pages assign chapel, Lions Connect and one-on-one student conversations to Hickory Grove Baptist Church pastors. The directory gives department only, no job titles.

| Name | Published title | Published email | Source |
|---|---|---|---|
| Clint Pressley | "Senior Pastor" (of Hickory Grove Baptist Church, per the profile masthead); Advisory Board member; Wednesday devotion speaker as "Pastor Clint Pressley" | none published on the school site | profile; /advisory-board; `20261104_-_william_tyndale.pdf` |
| Dr. Jimmie Quesinberry | "Head of School"; spoke Week 1 devotion | jimmiequesinberry@hgchristian.org | /about-us-home; profile; directory; `20260819_-_martin_luther.pdf` |
| Nick Gentili | "Student Discipleship Pastor" | none published | chapel and Lions Connect handouts, Sept 17, 2026 |
| Jacob Prince | "Student Discipleship Pastor" | none published | handouts Sept 2, Oct 22, Oct 28, 2026 |
| Campbell Benfield | "Family Discipleship Pastor" | none published | elementary chapel handout, Sept 17, 2026 |
| Ben Harris | "Family Discipleship Pastor" | none published | elementary chapel handout, Oct 22, 2026 |
| Pastor Olivier Hakizimana; Dr. Blake Maxwell | devotion speakers, no title printed | none published | handouts Sept 16 and Sept 23, 2026 |
| Adam Hamilton | "High School Principal"; Week 2 devotion speaker | adamhamilton@hgchristian.org | /high-school-home; `20260826_-_augustine_of_hippo.pdf` |
| Dan DeZordo | department "Administration" (no title); Weeks 4 and 8 devotion speaker | dandezordo@hgchristian.org | directory; handouts |
| Brennan Walter; Austin Reep | department "High School"; Weeks 7 and 10 devotion speakers | brennanwalter@hgchristian.org; austinreep@hgchristian.org | directory; handouts |
| Fernando Rogante | Bible department head, high school (second pass: the HS catalog calls its contact list "the department heads"; "Bible- Fernando Rogante") | fernandorogante@hgchristian.org | HS catalog p. 3; directory ("High School") |
| Austin Turner | "Middle School Bible, PE" (Alumni at HG page) | austinturner@hgchristian.org | /alumni-at-hg; directory ("Middle School") |
| Amy Weddine | MS "Principal" | amyweddine@hgchristian.org | /middle-school-home (mailto) |
| Lori Cheuvront | "Elementary School Principal" | loricheuvront@hgchristian.org | /elementary-school-home |
| Tracey Bennett | "Director of Counseling" | traceybennett@hgchristian.org | /high-school-home; /wellness |

- Alumni at HG also lists HGBC ministry roles held by alumni (adults): "Director, HGBC Sports Ministry"; "Assistant, HGBC Sports Ministry"; "Assistant, Discipleship / Harris Campus"; "Associate, Worship & Student Discipleship / Mallard Creek Campus"; "Assistant, Technical Ministry / Mallard Creek Campus". INFERENCE: these are church roles, not school spiritual-life posts.
- Lions Connect: "Pastors from Hickory Grove Baptist Church share practical, biblical help for leading your children in faith" — /lions-connect.

**Not found in this research**
- A school-employed chaplain or spiritual life director, or a director of spiritual life per division.
- A worship leader's name for Chapel Band ("our worship pastors" only).
- Published emails for the HGBC pastors who lead chapel and Lions Connect.
- Bible teachers' titles (the directory carries no titles).

### 5. What the school believes

**Sponsoring body**
- "As a ministry of Hickory Grove Baptist Church , Hickory Grove Christian School exists to fulfill our vision:" — /our-beliefs
- "HGCS is a ministry of Hickory Grove Baptist Church. HGBC pastors teach in chapel and lead Lions Connect, church and school musicians worship together, and our students serve alongside the church through ministries like the HGBC Food Pantry. Students grow in faith within four communities: their school, their home, Hickory Grove Baptist Church and the broader body of Christ." — /469460_2
- "The school is a ministry of Hickory Grove Baptist Church and was started by the church in 1995 as an educational institution for the benefit of families in the Charlotte-Metro area." — profile
- Advisory Board: "The Advisory Board of Hickory Grove Christian School (HGCS) acts as a consultative body for both the school and the Senior Pastor of Hickory Grove Baptist Church." Members: "Clint Pressley, Steve Adams, Richard Jennings, Brooke Hunter, Dr. Paul Kim, Tiffany Morrison, Kyle Scarlett, and Dr. Jimmie Quesinberry"; associate members "René Toadvine, Tommy Abernathy, Jay Manning, Craig Duet" — /advisory-board
- Denomination: the Statement of Faith's preamble names "the Baptist Faith and Message (2000)" (below). No page names a convention or denomination beyond "Baptist" in the church's name.

**Vision and mission**
- Vision: "To know Christ and to make Him known through Christian education." — /our-beliefs
- "We filter every part of education through this vision. It begins with the biblical presuppositions of our faith and is driven by the conviction that all truth is God's truth. It aims students toward a Great Commission mindset (Matthew 28:18–20) and leads to a biblical wisdom that is completed in the fear of the Lord." — /our-beliefs
- Mission: "Hickory Grove Christian School disciples students through a biblical worldview, forming them in academics, athletics, and arts to be committed to God, connected to the mission, and wise in Christ, that they may know Him and make Him known." — /our-beliefs (same on /academics-home and /469460_2)
- School verse: "God's Word, as revealed in Scripture, guides us. Our school verse is Matthew 6:33: "But seek first the kingdom of God and his righteousness, and all these things will be added to you." Matthew 6:33" — /our-beliefs
- "Christian faith is the basis for everything we do at Hickory Grove Christian School. We seek Christ first in all that we do." — /our-beliefs
- Profile: "HGCS desires to lead students to a saving faith in Christ and to help students develop strong Christian character."

**Beliefs about education** (/our-beliefs, in page order, "At Hickory Grove Christian School, we believe:")
1. All truth is God's truth, and that every subject should be taught through a biblical worldview.
2. Christian education is a shared effort among the school, the home, Hickory Grove Baptist Church, and the broader body of Christ.
3. Christian education must have an eternal perspective, focused on the salvation and discipleship of the next generation.
4. Success at HGCS is measured not only by students' leadership, excellence, and integrity, but most of all by a lifelong commitment to Jesus Christ.
5. A rigorous environment across academics, athletics, and the arts fully prepares students for the challenges ahead of them.
6. Students learn in different ways, so our teachers use a variety of instructional strategies to support each learner.
7. Each student is created in the image of God, with unique spiritual, academic, physical, mental, and emotional needs.

**Expected Student Outcomes** (/our-beliefs, /esos)
- "Committed to God: Devoted to the Lord with rightly ordered loves"
- "Connected to the Mission: Joined to the body of Christ in shared mission"
- "Wise in Christ: Discerning between the biblical wisdom of God and the wisdom of the world"
- /esos "Our students will:" under Committed to God: "Know Jesus Christ as their Lord and Savior." "Live virtuous lives as disciples of Christ, displaying the fruits of the Spirit." "Develop a growing and compelling faith." "Practice spiritual disciplines as regular habits." "Engage with culture through the lens of apologetics." "Live missionally, as Great Commission ambassadors."
- "We believe students should first gain knowledge of the Bible (notitia), be led to recognize Christ as divine (assensus), and ultimately place their trust in Him (fiducia)." — /esos
- "While we cannot guarantee the outcome we seek, a clear vision keeps our teaching, mentoring, and community life focused on that eternal goal." — /esos

**Statement of Faith (verbatim, whole, in page order)**

The public belief pages (/our-beliefs, /469460_2, /esos) carry no doctrinal statement of faith. The one document the school's site links as "the HGCS Statement of Faith" is linked from its own employment application (/employment-application, Fillout form: "Statement of Faith / Please read the HGCS Statement of Faith before answering: https://drive.google.com/file/d/1mDowLVWj8E9ASHkSDCAWp3QHftdd9UMy/view?usp=sharing"). It is a three-page statement on marriage, gender and sexuality that says it elaborates on the Baptist Faith and Message (2000). It is copied below whole. Line breaks inside paragraphs are joined; the running header repeated at the top of pages 2 and 3 is left out; the source's typos ("Identiry", "conforming to their behavior to") are kept.

Title: "Statement of Faith: Marriage, Gender, and Human Sexuality"

1. Preamble: We believe that all matters of faith and conduct must be evaluated on the basis of Holy Scripture, which is our infallible guide (2 Timothy 3:16–17). The intent of this document is to elaborate on the Baptist Faith and Message (2000) and on the nature of human beings and their sexuality. It is imperative that we correctly understand and articulate what the Bible teaches on these matters.

2. We are committed to the home and family as set forth in Holy Scripture. We believe God has ordained and created marriage to exist between one man and one woman, with absolute marital fidelity. The Bible sets forth specific home and family values, which include the distinct roles of husbands and wives, fathers and mothers, and children. It is our firm conviction that we uphold the dignity of each individual as we embrace the unchanging and long-standing principles of scriptural truth.

3. Religious Beliefs: Based on Holy Scripture and the constant moral teaching of the universal Church, we believe:

4. Marriage and Sexual Immorality (Genesis 1:26-28; 2:15-25; 3:1-20; Exodus 20:12; Deuteronomy 6:4-9; Joshua 24:15; 1 Samuel 1:26-28; Psalms 51:5; 78:1-8; 127; 128; 139:13-16; Proverbs 1:8; 5:15-20; 6:20-22; 12:4; 13:24; 14:1; 17:6; 18:22; 22:6,15; 23:13-14; 24:3; 29:15,17; 31:10-31; Ecclesiastes 4:9-12; 9:9; Malachi 2:14-16; Matthew 5:31-32; 18:2-5; 19:3-9; Mark 10:6-12; Romans 1:18-32; 1 Corinthians 7:1-16; Ephesians 5:21-33; 6:1-4; Colossians 3:18-21; 1 Timothy 5:8,14; 2 Timothy 1:3-5; Titus 2:3-5; Hebrews 13:4; 1 Peter 3:1-7.)

5. Marriage: Hickory Grove Christian School (HGCS) defines marriage as the permanent, exclusive, comprehensive, and conjugal “one flesh” union of one man and one woman, intrinsically ordered to procreation and biological family, and in furtherance of the moral, spiritual, and public good of binding father, mother, and child.

6. Sexual Immorality: HGCS believes that sexual acts outside marriage are prohibited as sinful. Consequently, HGCS students, faculty, administration, and staff must resist and refrain from any and all sexual acts outside marriage. We believe that any form of sexual immorality, including adultery, fornication, homosexual behavior, bisexual conduct, bestiality, incest, and use of pornography, is sinful and offensive to God.

7. Matters of Gender and Sexual Identiry Gen. 1:26-28; 2:15-25; 3:1-24; Ex. 20:14; 20:17; Lev. 18:22; 20:13; Dt. 5:18, 21; 22:5; Jdg. 19:22; 2 Sam.11:1-12:15; Job 31:1; Ps. 51:1-19; Prov. 5:1-23; 6:20-35; 7:1-27; Isa. 59:1; Mal. 2:14; Matt. 5:27–30;19:4-6, 8-9, 12; Acts 15:20, 29; Rom. 1:26–27; 1:32; 1 Cor. 6:9–11, 18-20; 7:1-7; 2 Cor. 5:17; Gal. 5:24; Eph. 4:15, 20–24; 5:31–32; Col. 3:5; 1 Thess. 4:3-8; 1 Tim. 1:9–10, 15; 2 Tim. 2:22; Titus 2:11-12; Heb.13:4; Jas. 1:14–15; 1 Pet. 2:11; Jude 7

8. Sexual Identity: HGCS believes that God created mankind in His image: male (man) and female (woman), sexually different but with equal personal dignity. Consequently, HGCS students, faculty, administration, and staff must affirm their biological sex and refrain from any and all attempts to change physically, alter, or disagree with their predominant biological sex — including but not limited to elective sex-reassignment, transvestite, transgender, or non-binary “genderqueer” acts or conduct. In addition, all HGCS students, faculty, administration, and staff born as a biological male shall present as a male. Any individual born as a biological female shall present as female.

9. We believe that God wonderfully and immutably creates each person as male or female. These two distinct, complementary genders together reflect the image and nature of God.

10. Rejection of one's biological sex is a rejection of the image of God within that person. We believe that the term marriage has only one meaning: uniting of one man and one woman in a single exclusive union, as delineated in Scripture.

11. Sexual Orientation: HGCS believes that God created and ordered human sexuality to the permanent, exclusive, comprehensive, and conjugal “one flesh” union of man and woman, intrinsically ordered to procreation and biological family, and in furtherance of the moral, spiritual, and public good of binding father, mother, and child. Consequently, HGCS students, faculty, administration, and staff must affirm the sexual complementarity of man and woman and resist any and all same-sex sexual attractions and refrain from any and all same-sex sexual acts or conduct which are intrinsically disordered.

12. Sexual Redemption: HGCS believes that all have sinned and fall short of the glory of God and should seek redemption through confession, repentance, and faith in Jesus Christ. Consequently, HGCS students, faculty, administration, and staff must welcome and treat with respect, compassion, and sensitivity all who experience same-sex attractions or confess sexually immoral acts but are committed to resisting sexual temptation, refraining from sexual immorality, and conforming to their behavior to HGCS Statement of Faith.

13. Celibacy: HGCS believes that Holy Scripture grants two life-enhancing options for human sexual behavior: (1) the conjugal “one flesh” marital union of one man and one woman, and (2) celibacy. Either is a gift from God, given as He wills for His glory and the good of those who receive and rejoice in His gift to them. Celibacy and faithful singleness are to be celebrated and affirmed within HGCS.

14. Application: All of our students, employees, administration, and volunteers must affirm and adhere to this Doctrinal and Religious Absolute statement on marriage and human sexuality to qualify for involvement with the Hickory Grove Christian School. This is necessary to accomplish our religious mission, goals, and purpose. Behavior or counter-witnessing that does otherwise will impede and burden our integrity and religious mission. We believe that God’s grace can wipe the slate of guilt and sin, though the consequences are still incurred.

15. Authority: The Bible is the inspired and infallible Word of God, acting as the source of authority over morality, our beliefs, Christian lifestyle, and conduct. The Senior Pastor of Hickory Grove Baptist Church is charged with the ministerial responsibility of Biblical interpretation and promulgating religious policy. The Senior Pastor of Hickory Grove Baptist Church will determine life application as well as final matters relating to institutional theology, philosophy, Christian practice, faith, divine truth, morality, and theological and doctrinal resolutions.

16. Failure to agree with the HGCS statement of faith and not being willing to comply with the organization’s standards of conduct serves as grounds for dismissal.

17. ● I believe in the HGCS Statement of Faith.
    ● I have reviewed the HGCS Statement of Faith and agree to be governed by all the provisions herein.

    PRINT NAME SIGNATURE DATE

(Item 4 is a section heading followed by its Scripture list; item 7 is the second section heading with its list, printed with no parentheses. They are numbered to keep page order.)

**Accreditation and memberships**
- "The elementary, middle, and high schools of HGCS hold dual accreditation through Cognia and the Association of Christian Schools International (ACSI)." — /accreditation
- Athletics: "We are a proud member of the North Carolina Independent School Athletic Association (NCISAA) and the Metrolina Athletic Conference (MAC) ." — /athletics-home
- "Many of our faculty have participated in the Colson Center's Academic Affiliate program, which equips teachers to immerse students in Scripture across the curriculum rather than merely add a verse to a lesson." — /469460_2

**Not found in this research**
- A general doctrinal statement (God, Scripture, salvation, the church) published by the school. The only linked "Statement of Faith" covers marriage, gender and sexuality and points to the Baptist Faith and Message (2000), which the school's site does not link.
- A date on the Statement of Faith page or document (metadata only, LEAD).
- Any membership beyond ACSI, Cognia, NCISAA and MAC.

### 6. What it asks of families and students

**Admissions (families)**
- Both 2026-27 checklists ("Revised 11/17/25") list a pastor's reference in Step 1. Elementary: "Personal Recommendation form (from family’s pastor)" under both TK–K5 and 1st–5th. Middle and high: "Personal Recommendation form (from student/family’s pastor)".
- Both checklists, Step 3: "Family Interview is an opportunity to share the Mission, Vision, and Statement of Faith, and to assess whether HGCS is the right fit for your family"
- Both: "Final decision is communicated in writing contingent upon:" satisfactory grades, letters of recommendation, interview, satisfactory behavior reports, entrance testing, review of IEP/504/Psychoeducational Evaluation.
- Student Questionnaire: elementary "(4th & 5th)"; middle and high, all applicants. Its questions are not public.
- Priority window: "FOR OUR HGCS FAMILY / November 2 / EEC students, HGBC members, and siblings of current students" then "WELCOMING NEW FAMILIES / November 16 / All new families" — /admissions-home. Mallard Creek preschool: "Hickory Grove Baptist Church Members, current EEC students and siblings: January 4, 2027 / General Public: February 1, 2027" — /mallard-creek-campus.
- "HGCS does NOT provide AUTOMATIC discounts (i.e., multi-child, like-minded pastor, etc )." — /scholarships
- International students: the published steps (/international-student-enrollment-pr) list an interview, transcripts, "Math and English teacher recommendation" and test scores, and no pastor reference.
- "Academic and enrichment camps are open to current HGCS students and Hickory Grove Baptist Church members." — /summer-camps

**What students sign or follow**
- "Every high school student signs our Student Honor Code, a covenant organized around our three Expected Student Outcomes." — /high-school-home
- Honor Code: "As a student at HGCS, I covenant to do my very best to be:" … e.g. "I will continually uphold the vision and mission of Hickory Grove Christian School by faithfully supporting the school through my prayers, attitude, and life choices." and "I agree to exercise sound judgment and to live a rightly ordered life consistent with a biblical worldview, both on and off campus." — `hgcs_studenthonorcode.pdf`
- Honor Code close: "If I fail to uphold any of the above, I understand that I can repent, self-report my actions, and seek guidance and forgiveness." — same
- Calendar: Aug 27 "Chapel/Honor Code Ceremony" (MS/HS). INFERENCE: the signing happens at this chapel; not stated.
- The Statement of Faith's "Application" article says "All of our students, employees, administration, and volunteers must affirm and adhere to this Doctrinal and Religious Absolute statement on marriage and human sexuality to qualify for involvement with the Hickory Grove Christian School." (section 5, item 14). Whether a family or student signs it at enrollment is NOT STATED.
- MS/HS dress code: "This dress code is designed to require students to dress in modest and appropriate clothing for the classroom. Our desire is to grant our students the freedom to make wise choices within the guidelines listed here, while honoring God with their bodies. Females must present as females and males must present as males. Administration reserves the right to deem any clothing as inappropriate, and to take corrective action." — `mshsdresscode.pdf`
- ES dress code: "However, as Christians, we are called to be different than the world." — `esdresscode.pdf`
- Honor Dress for chapel (section 1).
- Profile: "Prospective students must score at or above their grade level and be in good standing with their current school to be admitted."

**For staff (contrast)**
- Job posting candidate profile: "Committed Christian in agreement with the school’s Statement of Faith." "Active in a local bible-believing church." — /employment
- "We are unapologetically Christian, firmly upholding the truth of God's Word." — /employment
- Employment application (Fillout): "I have read the HGCS Statement of Faith and" with choices "I agree without objection" / "I have one or more objections"; section "Church Membership and Activity" with "Please list the church you currently attend and describe your level of involvement", "Church reference for verification: First Name", "Church reference email"; "Submit your Personal Testimony and Statement of Faith (pdf format)". Position options include "HGCS Christian Teaching Fellows".

**For host families (contrast)**
- Host Family Application, "11 Faith Commitment": "FATHER, PLEASE DESCRIBE YOUR SPIRITUAL JOURNEY." "MOTHER, PLEASE DESCRIBE YOUR SPIRITUAL JOURNEY." "WHAT CHURCH DOES YOUR FAMILY ATTEND?" "DESCRIBE YOUR INVOLVEMENT IN THE CHURCH." "HOW WILL YOU NURTURE THE SPIRITUAL GROWTH OF AN INTERNATIONAL STUDENT PLACED IN YOUR HOME?"; a "Pastoral Reference" "To be completed by someone in spiritual authority over the family." asking "PLEASE DESCRIBE THIS FAMILY'S CHRISTIAN FAITH." — host family application PDF
- The program is offered to "members of Hickory Grove Baptist Church and families with students enrolled at HGCS" — /host-families

**For the board (contrast)**
- Advisory Board relationship only (section 5). No faith requirement for members is published.

**Not found in this research**
- Whether a parent must be a Christian, a church member, or sign the Statement of Faith (NOT STATED for TK–12). The family interview "share[s]" it. (second pass) The Mallard Creek preschool (EEC) interest form asks parents "Are you and your family an active member of a church?", to describe church involvement, "your walk with the Lord (description of the parent's faith)", and whether they "support all aspects of the school's mission". It applies to that preschool form only and states no admission rule.
- Whether church attendance is asked of families (NOT STATED; only the pastor reference implies a pastor who knows the family).
- The content of the pastor's Personal Recommendation form and the Student Questionnaire (login).
- A parent covenant or enrollment contract faith clause (handbook and contract not public).
- Whether elementary and middle school students sign the Honor Code (the HS page says "Every high school student signs"; the MS page links the same code).
- Chapel attendance rule.

### 7. Service and missions

**Purpose**
- "At Hickory Grove Christian School, we want students to leave with a Great Commission mindset, ready to serve their neighbors and share the hope of the gospel wherever God sends them." — /missions-and-service
- "From the classroom to the HGBC Food Pantry to the Dominican Republic, students learn that their gifts were given to serve others." — /missions-and-service

**Programs** (/missions-and-service)
- "Senior Mission Trip / Our seniors serve together annually on a mission trip to the Dominican Republic." Calendar: "Senior DR Trip" / "Senior Mission Trip" in January 2027 (exact dates on the calendar, not copied). Cost and whether it is in tuition: not stated (second pass: the tuition page and PDF list no trip charge). (second pass) INFERENCE: Mission Week falls in the same January 2027 week.
- "High School Mission Week / While the seniors are away, the rest of the high school serves the local community through Mission Week."
- "Quarterly Missions Collec­tion / Each quarter, our school family gives to support a local ministry or cause." The page lists three: "XChange: providing resources to support the addiction ministry of Hickory Grove Baptist Church"; "Operation Christmas Child: shoeboxes filled with gifts and the gospel for children around the world"; "Baby Bottle Drive: supporting the sanctity of human life".
- "HGBC Food Pantry / Spanish Immersion students serve as interpreters each week as our pastors share the Gospel with our community."
- "Serving Our School / Discipleship groups serve together on campus, like high schoolers making encouragement cards for elementary students."
- "Student on Mission / A middle school course that studies what God is doing around the world and how students can serve Charlotte." (Catalog title: "Students on Mission", grades 7-8.)
- Aquaponics: "serve through ministry partnerships like our aquaponics lab, which grows food for the HG Food Pantry." — /high-school-home
- "Demonstrating our commitment to serving others, we have established both formal and informal partnerships, such as our work with the HGBC Food Pantry through aquaponics, and international outreach efforts in the Dominican Republic, Ecuador, Haiti, and Kenya." — /academics-home
- Visual arts: "Artwork shared with children around the world through school mission trips" — /visual-arts
- Host families as "missions in reverse": "Rather than traveling overseas to serve as missionaries, host families become missionaries in their own homes" — /host-families

**Global Missions & Language Certificate**
- /missions-and-service: "High school students can earn this certificate by completing three units of a foreign language, two honors Bible courses plus Honors Introduction to Philosophy, at least one international mission trip, and a Missions Learning Practicum or internship that takes the gospel into the local, national or world community. It equips graduates to be effective evangelists, apologists and disciple-makers."
- HS catalog p. 9 lists six requirements, including "4. Be an active church member of like-minded faith, verified through a positive letter of recommendation by a pastor, preferably the student’s Youth Pastor." and "5. Participate in at least one international mission trip." and "HGCS Administration must approve all practicums and internships."

**Not found in this research**
- Any service-hour requirement, by grade or for graduation (none in the catalog's graduation requirements; (second pass) also absent from the profile, site search and every hosted PDF; no NHS page).
- Dated figures (shoeboxes, meals, dollars collected) — no news board or recap with counts.
- The cost of the senior mission trip, and whether all seniors go.
- What Mission Week includes or which partners it serves.
- Which quarter each collection runs.

### 8. Parent spiritual life

- **Lions Connect.** "Parents are a child's first and most important disciplers. Lions Connect is our time to come alongside you in that calling. Pastors from Hickory Grove Baptist Church share practical, biblical help for leading your children in faith, often building on that month's chapel message, and send you home with ideas you can use around the dinner table that same night." — /lions-connect
- "Lions Connect meets on chapel mornings, between Elementary Chapel and Middle and High School Chapel, so you can worship with your child and stay for both. Sessions speak to parents of little ones and teenagers alike." — /lions-connect. Pre-registration form time: "Lions Connect (9:00am)".
- 2026 recaps: "September / Because I Told You So" (Speaker: Nick Gentili, Student Discipleship Pastor, Sept 17, 2026); "October / Hard Providences" (Speaker: Jacob Prince, Student Discipleship Pastor, Oct 22, 2026).
- Book list on /lions-connect: family devotionals (Nancy Guthrie; Paul David Tripp), a Bible reading plan for kids (David Murray, grades 1–6), missions and prayer titles (Daniel L. Akin; Molly Wall; Matt Smethurst), and for parents (Kevin DeYoung; Andrew Walker).
- **Chapel at Home.** "After every chapel, families receive a Chapel at Home recap that includes a summary of the message, the Scripture behind it, and a few questions to talk through with your child. There's an Elementary version and a Middle and High School version, so the questions are age-appropriate for your child." — /chapel
- **Wednesday devotion recaps.** "The one-page recaps below are for families. Each one gives the passage, a short summary of the devotion, the main points in the speaker’s own words, and the line to remember, so you can ask your student about it at dinner or in the car." — /here-i-stand-2
- **Lions in Prayer.** "Parents gather once a month to pray for our students, staff and school. Whether you come every month or just once, you’re always welcome. Meetings are at 8:00 AM on the first Monday of the month." — /elementary-school-home
- **Hang Ten.** "Hang Ten is a movement that helps families, schools and churches raise children to use technology wisely. It offers ten shared technology practices that help families enjoy the good gifts technology provides while protecting children from its harms." — /elementary-school-home
- **Parent Teacher Fellowship.** "We call ourselves a fellowship because we are believers united in furthering Kingdom Education." Also "Serving our school and community through mission-minded projects" and "Build relationships with the Christian educators pouring into your children every day". Contact: "Cynthia Sampson at cynthiasampson@hgchristian.org". — /ptf
- "Parents are a child's first disciplers, and as a ministry of Hickory Grove Baptist Church, we partner with families and the local church to point students to Christ every day." — /469460_2
- Giving: "Gifts are made through the Hickory Grove Baptist Church’s giving site. Choose HGCS Scholarship Fund ." — /give

**Not found in this research**
- A parent Bible study (moms' or dads').
- Where Lions in Prayer meets, or whether it is for all divisions (it is listed on the elementary page only).
- A weekly faith email to parents beyond the chapel and devotion recaps (ParentSquare messages are not public).
- A grandparents' prayer group.

### 9. History of the faith identity

- "Thank you for your interest in Hickory Grove Christian School. HGCS, a ministry of Hickory Grove Baptist Church, was established in 1995 as a private Christian school for Kindergarten, 1st, and 2nd grades. Since our inception, we have grown into a Christ-centered, college-preparatory school serving students from Transitional Kindergarten through Grade 12." — /admissions-home
- "Since 1995, HGCS has been a ministry of Hickory Grove Baptist Church , and our vision has not changed: to know Christ and to make Him known through Christian education." — /about-us-home (Head of School welcome, signed "Jimmie Quesinberry, Ed.D. / Head of School")
- "The school is a ministry of Hickory Grove Baptist Church and was started by the church in 1995" — profile
- "For 30 years, Hickory Grove Christian School has discipled K–12 students in Charlotte through a biblical worldview." — /
- Handouts' footer: "HICKORY GROVE CHRISTIAN SCHOOL CHARLOTTE, NC · EST. 1995".
- International program: "Established in 2013 with students from China … At the heart of our mission is the desire to know Christ and make Him known around the world, sharing the love and truth of the Gospel with the nations." — /international-program-home
- Two campuses: Harris Campus (7200 E. WT Harris Boulevard) and Mallard Creek Campus (13200 Mallard Creek Rd.) — /early-education-center-home.

**Not found in this research**
- The church's founding pastor or the founding story beyond the year and first grades.
- When the school grew to 12th grade or graduated its first class.
- Any change in sponsor or governance.

### 10. Anything else

- **Spanish Immersion's faith purpose.** "However, at Hickory Grove Christian School, the primary objective of our Spanish Immersion Program is to enhance the tools that we want our children to have to effectively communicate the Gospel to the world around them." One of its four goals: "develop a Gospel-Centered heart for the nations by immersing in the language and learning the culture" — /spanish-immersion
- **Counseling.** "We approach guidance through a biblical worldview lens, posing thoughtful questions which guide our students to think deeply about their choices, as well as their academic and spiritual goals." — /college-and-career-planning
- **Arts.** "Soli Deo Gloria: To the Glory of God Alone" — /arts-home. "We hope they come to see God as an Artist and draw closer to Him through the process of making art." — /visual-arts
- **Athletics.** "To know Christ and to make Him known. / That is the mission of Hickory Grove Christian School Athletics. We not only want our programs to be successful but eternally significant." — /athletics-home
- **Year theme.** "In 1521, Martin Luther was ordered to take back what he had written about the gospel. His answer has echoed for five centuries: "Here I stand. I can do no other. God help me."" — /here-i-stand-2. Anchor verse Galatians 1:10. The 34 weekly witnesses run from Martin Luther (Week 1) to "Jim Elliot & the Ecuador Five" (Week 34).
- **Student journal.** The 129-page Here I Stand · Student Journal has three sections: "Wednesday Devotions" ("34 weekly entries across six seasons of faith"), "Chapel Notes" and "Inductive Bible Study" ("Learn the method · worksheets · memory verses").
- **AI and media.** Digital Arts: "students learn to think critically about honesty in photo editing, AI-generated images and social media." — /digital-arts
- **Head of School on formation.** "Hickory Grove will focus on spiritual formation by teaching, correcting, and praying; transformation belongs to the Spirit of God, and we ask Him to do what only He can." — /about-us-home
- **HS principal.** "We cannot order a teenager’s loves. Only God can do that. What we can do is put Scripture, worship, honest teaching, and faithful adults in front of our students every day, and trust Him with the growth." — /high-school-home
- **Page artifact.** /esos prints two sentences twice in its first paragraph ("The call to live in a Christ-honoring way is grounded in His perfect life. In teaching worldviews and apologetics, …"). /elementary-school-home and /high-school-home print "oined to the body of Christ" (missing J).

**Not found in this research**
- A school news board (no /news page; the brief's Finalsite news-board and email-archive endpoints no longer exist on this platform).
- A published student handbook.

---

## Conflicts between the school's own pages

1. **How often chapel meets, and on which day.**
   - /chapel: "Once a month, students, faculty and pastors from Hickory Grove Baptist Church gather to praise God together as one body."
   - /middle-school-home: "One Thursday a month, students gather in the sanctuary for Chapel"
   - /469460_2: "10 Chapels / each school year"
   - The 2026-27 calendar puts two chapels in March (Mar 11 "Chapel" and Mar 25 "Easter Chapel"), one on a Friday (Nov 20 "Thanksgiving Chapel"), and adds an eleventh, "Senior Recognition Chapel" (Apr 30, a Friday). The "10" and "once a month" claims hold only if the Senior Recognition Chapel is not counted and March's two are allowed.

2. **Who leads chapel.**
   - /469460_2: "HGBC pastors teach in chapel"; /middle-school-home: "our pastors teach"
   - /performing: "Chapel Band Students audition, rehearse and help our worship pastors lead student-led chapel."
   - "Student-led chapel" versus pastor-taught chapel. They may describe worship versus message, but the pages do not say so.

3. **The mission statement, in two wordings.**
   - /our-beliefs, /academics-home, /469460_2: "Hickory Grove Christian School disciples students through a biblical worldview, forming them in academics, athletics, and arts to be committed to God, connected to the mission, and wise in Christ, that they may know Him and make Him known."
   - /admissions-home: "HGCS is a distinctively Christian school whose focus is “To disciple students in the Gospel story of creation, fall, redemption, and restoration, equipping them to be Committed to God, Connected to the Mission, and Wise in Christ.”" (/esos: "our mission is to disciple students in the Gospel story of creation, fall, redemption, and restoration, equipping them to be Committed to God, Connected to the Mission, and Wise in Christ.")

4. **How often high school discipleship groups meet.**
   - /469460_2: "Groups meet several times a month"
   - /high-school-home: "On most Thursdays, this time is used for D-groups."

5. **Global Missions certificate requirements.**
   - /missions-and-service lists four elements (three language units; two honors Bible courses plus Honors Introduction to Philosophy; an international mission trip; a practicum or internship).
   - HS catalog p. 9 lists six, adding "Meet all HGCS graduation requirements" and "4. Be an active church member of like-minded faith, verified through a positive letter of recommendation by a pastor, preferably the student’s Youth Pastor." The web page omits the church-member and pastor-letter requirement.

6. **Years of Bible.**
   - /469460_2: "13 Years / of Bible as a core class, from kindergarten through 12th grade"
   - /elementary-school-home: "From Transitional Kindergarten through 5th grade, students build a strong foundation in Bible, math, reading, …" (TK would make a fourteenth year).

7. **Bible course required in 11th and 12th grade.**
   - /469460_2: "moving from Old Testament Survey in 9th grade and New Testament Survey in 10th to Apologetics in 11th and Systematic Theology in 12th."
   - HS catalog p. 22 lets 11th graders take "Honors Introduction to Philosophy" and 12th graders "Honors Introduction to Ethics" instead.

8. **Vision sentence wording.** /our-beliefs: "leads to a biblical wisdom that is completed in the fear of the Lord." /academics-home: "leads to a biblical wisdom that is consummated in the fear of the Lord." (Minor.)

9. **The MS missions course name.** /missions-and-service and the MS catalog grid: "Student on Mission"; MS catalog course page: "Students on Mission". (Minor.)

10. **Senior mission trips (second pass).** /missions-and-service: "Our seniors serve together annually on a mission trip to the Dominican Republic." /aquaponics (LEAD: an orphan page in no menu or sitemap, undated): "each year our senior class has the opportunity to participate in mission trips—both domestic and international". The nav-linked page is the one to print; whether every senior goes is a question for the school.

11. **A third mission wording (second pass).** Mallard Creek EEC interest form: "As a school, our mission is "To equip students to serve God in the 21st century by providing an excellent academic program founded upon a biblical worldview."" INFERENCE: an older statement left on the preschool form.

12. **Graduation credits (second pass, minor).** HS catalog: "Personal Finance 1" and "Electives 3" (27 credits). School profile: "Electives 4 units", no Personal Finance line. Bible is 4 in both. The 2026-2027 HS catalog's intro also still refers to "the Course Selection Catalog for the 2025-2026 school year."

13. **Names spelled two ways (second pass, minor).** "Quiet Time Cafe" (/middle-school-home) and "Quiet Time Café" (/469460_2). Vimeo archive titles: "Elementary Chapel" / "Elementary School Chapel"; "Middle/High School Chapel" / "Middle & High School Chapel".

---

## Method: card-by-card assessment

| Card | Distinct checkable facts | Verdict |
|---|---|---|
| 1. Chapel & Worship | About 22: 10 chapels a year (plus Senior Recognition); split elementary 8:00 AM / MS-HS 9:30 AM from the form and calendar; Thursday pattern and the 2026-27 dates by month; MS in the sanctuary; Honor Dress for 6th–12th chapel; all-school Thanksgiving and Christmas chapels; performing arts lead Christmas Chapel; Chapel Band by audition; MS Praise Team course; worship dance; Tech Production runs chapel video; livestream and archive; visitors welcome, 18+, pre-register; monthly theme figures for the year; HGBC pastors teach; ESV | Stands on its own. Gaps: attendance rule; conflicts 1 and 2 need wording care |
| 2. Bible & Faith Classes | About 28: K–12 Bible every year; 13 years; daily ES Bible with Building on the Rock, verse a week, 200+ verses; MS Summit Ministries titles by grade; Bible in Spanish for immersion students; HS courses by grade with CP and honors; 4 credits of 27; 1 per year; Introduction to Bible for newcomers; honors placement rule; dual enrollment through Judson College (SEBTS); Apologetics and Systematic Theology content; faith electives (Arts and Theology, Fiber Crafts II, Bible Sketch, MS Faith & Leadership courses); Gospel Project in preschool | Stands on its own; the strongest card. Gap: late-joiner credit rule only implied |
| 3. Retreats | 0 to 1: no retreat on any page or the calendar | **Does not stand.** Omit, or fold the Senior Mission Trip into Service & Missions |
| 4. Small Groups & Discipleship | About 9: MS Grove Groups (monthly, first Thursday, by grade, small groups); HS discipleship groups (every student, teacher-led, several times a month / most Thursdays in Club Flex); HGBC student discipleship pastor on campus; morning devotions; Quiet Time Cafe; HS Wednesday devotions with 34 witnesses and the journal; Christian Leadership for selected 8th graders; Chapel Band | Stands on its own, and absorbs what a retreats card would hold |
| 5. What the School Believes | About 30: Statement of Faith (17 numbered items, verbatim); Baptist Faith and Message (2000) named; ministry of HGBC; Senior Pastor's final authority; vision; mission (two wordings); school verse; 7 beliefs; 3 ESOs with outcome lists; notitia/assensus/fiducia; ACSI and Cognia; Colson Center affiliate | Stands on its own. Note: the only published "Statement of Faith" is a marriage-and-sexuality statement linked from the job application, not from the belief pages; the card must say where it is linked |
| 6. What It Asks of Families | About 12: pastor's Personal Recommendation at every grade; Family Interview shares the Statement of Faith; Student Questionnaire (grades 4–12); HGBC-member priority window; no automatic like-minded-pastor discount; HS students sign the Honor Code (covenant), Honor Code Ceremony at the first chapel; dress code incl. "Females must present as females and males must present as males."; Honor Dress; SoF "Application" article names students; contrasts for staff (SoF agreement, church reference, testimony) and host families (spiritual journey, pastoral reference) | Stands on its own, thinner on parents. NOT STATED: parent faith, parent signature of the SoF, church attendance, chapel attendance |
| 7. Service & Missions | About 14: Great Commission purpose; senior DR mission trip each year (January); HS Mission Week; quarterly collection and its three named causes; HGBC Food Pantry with immersion interpreters; aquaponics; discipleship-group service; Students on Mission course; outreach in DR, Ecuador, Haiti, Kenya; Global Missions certificate (six requirements incl. pastor letter); host families "missions in reverse" | Stands on its own. Gaps: no hour rule, no dated figures, no trip cost |
| 8. Who Leads Spiritual Life | About 10 names: Senior Pastor Clint Pressley; two Student Discipleship Pastors and two Family Discipleship Pastors (HGBC); Head of School and HS Principal as devotion speakers; Bible contact and an MS Bible teacher with published emails; principals; Director of Counseling | Stands only as a short list, and its honest headline is that the church's pastors lead, not a school chaplain. The pastors have no published emails on the school site |
| 9. Faith Life for Parents | About 10: Lions Connect (when, who, two recap topics, book list); Chapel at Home recaps in two versions; Wednesday devotion recaps for families; Lions in Prayer (monthly, first Monday, 8:00 AM); Hang Ten; PTF "believers united"; giving through HGBC's site | Stands on its own |
| 10. Ask the School | Not fact-based; about 10 questions fall out of the "Not found" lists: must a parent be a Christian or sign the Statement of Faith; what the pastor's recommendation form asks; is chapel attendance required; where elementary chapel meets; is there a school chaplain or only HGBC pastors; how many Bible credits a junior or senior transfer owes; are there any retreats; are service hours required; what the senior mission trip costs and whether all seniors go; whether the MS and ES students sign the Honor Code | Stands on its own as a prompt list, each mapped to a confirmed gap or conflict |

**Overall (INFERENCE):** eight or nine of the ten cards can be filled from the school's own pages. Retreats is the one empty card. The Statement of Faith is unusual: the school's belief pages publish values and outcomes but no doctrinal statement, and the only document it links as "the HGCS Statement of Faith" is the marriage, gender and sexuality statement on the employment application. A second pass should look for a general doctrinal statement (for example in the login-only application or handbook, which cannot be read) and confirm the Senior Mission Trip details.

### Re-verification 2026-11-26 (/faith-life)

Every fact the cards would print was re-checked against a **fresh download** made after both
research passes (18 pages, the Statement of Faith PDF, both admissions checklists, the Honor Code,
the MS/HS dress code, both course catalogs, the chapel pre-registration form and the calendar feed).
Nothing moved.

- **Statement of Faith:** all 17 numbered items above match the PDF char-for-char, once its running
  page header ("Statement of Faith: Marriage, Gender, and Human Sexuality", printed at the top of
  pages 2 and 3, mid-paragraph in items 8 and 15) is left out, as this file says it is.
- **Worship days and times:** the calendar feed lists 8 split chapel days (elementary, then middle
  and high school) on Aug 27, Sep 17, Oct 22, Jan 21, Feb 18, Mar 11, Mar 25 and Apr 22 (all
  Thursdays), the Thanksgiving Chapel (Fri Nov 20) and the school-wide Christmas Chapel (Thu Dec 10):
  10 in all, matching "10 Chapels". The Senior Recognition Chapel (Fri Apr 30) is an eleventh. The
  feed stores times in UTC; the school's own pre-registration form gives "Elementary Chapel (8:00am)",
  "Lions Connect (9:00am)" and "MS/HS Chapel (9:30am)".
- **Religion courses and credits:** the /469460_2 MS and HS Bible sentences; "Bible 4" of "27
  Credits"; "Minimum total credits: 1 per year"; the Introduction to Bible newcomer sentence; the
  Global Missions certificate's church-member requirement (HS catalog).
- **Staff:** "Bible- Fernando Rogante fernandorogante@hgchristian.org" (HS catalog department-heads
  list); "Cynthia Sampson at cynthiasampson@hgchristian.org" (/ptf); "HGBC pastors teach in chapel and
  lead Lions Connect" (/469460_2).
- **Figures:** "10 Chapels"; "13 Years / of Bible as a core class"; "4 / Years of Bible every graduate
  completes."; "200+ / Bible Verses memorized"; "1 Verse a Week"; Lions in Prayer "8:00 AM on the
  first Monday of the month".
- **Families:** both checklists' pastor-recommendation lines and Family Interview sentence; the Honor
  Code signing sentence; "HGCS does NOT provide AUTOMATIC discounts"; the employment "Committed
  Christian…" and "Active in a local bible-believing church." lines; the dress code's Honor Dress and
  "Females must present as females…" sentences; the /myhgcs handbook sentence.

40 quotes checked in all; every one matched.
