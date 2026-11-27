# Hickory Grove Christian School — Faith & Spiritual Life
> Distilled from 2 source document(s) in `source-material/faith-spiritual-life/hickory-grove-christian/`. Auto-extracted full text, lightly cleaned. Rebuilt 2026-11-26.
**Documents:** Official Site Research, Second Pass Gap Research


---

## Official Site Research

*Source file: `Hickory Grove Christian - Faith and Spiritual Life - Official Site Research.md`*

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
employee "Committed Christian in agreement with the school's Statement of Faith." line; "Bible 4";
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
- Graduation requirements (HS catalog p. 7): "Bible 4 Introduction to Bible, Old Testament Survey, Honors Old Testament Survey, New Testament Survey, Honors New Testament Survey, Apologetics, Systematic Theology, Honors Systematic Theology, Honors Introduction to Philosophy, Honors Introduction to Ethics" (of "27 Credits"). Profile: "Bible 4 units".
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

4. Marriage and Sexual Immorality (Genesis 1:26-28; 2:15-25; 3:1-20; Exodus 20:12; Deuteronomy 6:4-9; Joshua 24:15; 1 Samuel 1:26-28; Psalms 51:5; 78:1-8; 127; 128; 139:13-16; Proverbs 1:8; 5:15-20; 6:20-22; 12:4; 13:24; 14:1; 17:6; 18:22; 22:6,15; 23:13-14; 24:3; 29:15,17; 31:10-31; Ecclesiastes 4:9-12; 9:9; Malachi 2:14-16; Matthew 5:31-32; 18:2-5; 19:3-9; Mark 10:6-12; Romans 1:18-32; 1 Corinthians 7:1-16; Ephesians 5:21-33; 6:1-4; Colossians 3:18-21; 1 Timothy 5:8,14; 2 Timothy 1:3-5; Titus 2:3-5; Hebrew

…[truncated]


---

## Second Pass Gap Research

*Source file: `Hickory Grove Christian - Faith and Spiritual Life - Second Pass Gap Research.md`*

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


---

## Sources referenced across these documents

- https://docs.google.com/forms/d/e/1FAIpQLSfjfovuVvxFpqsWZf52lltPuD7-e4RG27VIY0sASQm9HfVHmg/viewform`
- https://docs.google.com/forms/d/e/1FAIpQLSfxe9C5inD83aaRlATsKQNHRMPWnPuBBaYZxmks4QE_a7Pz5Q/viewform`
- https://drive.google.com/file/d/1NcRTFcbKKVaAj1qRD6z24Xbp-xFmy7GI/view`
- https://drive.google.com/file/d/1mDowLVWj8E9ASHkSDCAWp3QHftdd9UMy/view?usp=sharing"
- https://drive.google.com/file/d/1mDowLVWj8E9ASHkSDCAWp3QHftdd9UMy/view`
- https://files.smartsites.parentsquare.com/14485/<file>`
- https://files.smartsites.parentsquare.com/14485/`
- https://hg-nc.client.factsmgt.com/oa/inquiry.cfm?memberId=496&districtCode=hg-nc`
- https://hgchristian.org`
- https://vimeo.com/showcase/10856617`
- https://www.hgchristian.org/academics/form-test-page`
