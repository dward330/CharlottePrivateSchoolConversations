// Hickory Grove Christian School — Faith & Spiritual Life.
//
// Every fact is from the school's own pages and the documents they link, read
// 2026-11-26 in two passes and re-checked against the live pages the same day.
// The full record, the source URLs and the conflicts between the school's own
// pages are in source-material/faith-spiritual-life/hickory-grove-christian/
//   Hickory Grove Christian - Faith and Spiritual Life - Official Site Research.md
//   Hickory Grove Christian - Faith and Spiritual Life - Second Pass Gap Research.md
//
// Kept out on purpose: every student's name, personal staff detail, trip
// prices and exact travel dates, the employment-linked "Statement of Faith"
// document (user decision 2026-11-26: the belief pages publish no statement
// of faith, so none is printed and nothing from that document is used), the
// middle and high school dress code's presentation sentence (user decision
// 2026-11-26), and every LEAD (an orphan /aquaponics page, PDF metadata).
//
// There is no `retreats` card: no retreat appears on any page, on the 2026–27
// calendar or in the site's own search. The question is on Ask the School.
//
// `colors`: the brand navy is the school's from src/data/brands.ts; the gold is
// the school's own, as its Learning Support section uses it (user decision
// 2026-11-26).

import type { Source } from '../../components/SourceRow.tsx'
import type { FaithLifeProgram } from '../faithLife.ts'

const BASE = 'https://hgchristian.org'
const FILES = 'https://files.smartsites.parentsquare.com/14485'
const src = (label: string, path: string): Source => ({
  label: `hgchristian.org — ${label}`,
  url: path.startsWith('http') ? path : `${BASE}${path}`,
})
const doc = (label: string, file: string): Source => src(label, `${FILES}/${file}`)

const SPIRITUAL = src('Spiritual Life', '/469460_2')
const CHAPEL = src('Chapel & Worship', '/chapel')
const HERE = src('Here I Stand', '/here-i-stand-2')
const MISSIONS = src('Missions & Service', '/missions-and-service')
const LIONS = src('Lions Connect', '/lions-connect')
const BELIEFS = src('Our Beliefs', '/our-beliefs')
const ESOS = src('Expected Student Outcomes', '/esos')
const ACCREDITATION = src('Accreditation', '/accreditation')
const ACADEMICS = src('Academics', '/academics-home')
const ES = src('Elementary School', '/elementary-school-home')
const MS = src('Middle School', '/middle-school-home')
const HS = src('High School', '/high-school-home')
const PERFORMING = src('Performing Arts', '/performing')
const ATHLETICS = src('Athletics', '/athletics-home')
const ADMISSIONS = src('Admissions', '/admissions-home')
const EMPLOYMENT = src('Employment Opportunities', '/employment')
const PTF = src('Parent Teacher Fellowship', '/ptf')
const MYHGCS = src('myHGCS', '/myhgcs')
const HOST = src('International Student Host Family Program', '/host-families')
const ALUMNI_STAFF = src('Alumni at HG', '/alumni-at-hg')
const ADVISORY = src('Advisory Board', '/advisory-board')
const OUR_STAFF = src('Our Staff', '/our-staff')
const PREREG = src('Chapel Pre-Registration', '/chapel-pre-registration')
const CALENDAR = doc('2026-2027 Calendar (PDF)', 'calendar2026-2027.pdf')
const HS_CATALOG = src('2026-2027 Course Selection Catalog', '/course-selection-guide')
const MS_CATALOG = src('Middle School 2026-2027 Course Selection Catalog', '/ms-courses')
const CHECKLIST_ES = doc('New Elementary Families Admissions Checklist (PDF)', 'newfamilyadmissionschecklistesnodate.pdf')
const CHECKLIST_MHS = doc(
  'New Middle and High School Families Admissions Checklist (PDF)',
  'newfamilyadmissionschecklistmhsnodate.pdf',
)
const HONOR = doc('Student Honor Code (PDF)', 'hgcs_studenthonorcode.pdf')
const DRESS = doc('Middle & High School Dress Code (PDF)', 'mshsdresscode.pdf')
const PROFILE = doc('High School Profile 2026-2027 (PDF)', '2026-2027schoolprofile.pdf')
const ES_CHAPEL_SEP = doc(
  'Elementary Chapel recap, Sept. 17, 2026 (PDF)',
  '20260917_-_elementary_chapel_-_abraham_-_parent_handout.pdf',
)
const MSHS_CHAPEL_SEP = doc(
  'Middle & High School Chapel recap, Sept. 17, 2026 (PDF)',
  '20260917_-_ms-hs_chapel_-_abraham_-_parent_handout.pdf',
)
const ES_CHAPEL_OCT = doc(
  'Elementary Chapel recap, Oct. 22, 2026 (PDF)',
  '20261022_-_elementary_chapel_-_joseph_-_parent_handout.pdf',
)
const MSHS_CHAPEL_OCT = doc(
  'Middle & High School Chapel recap, Oct. 22, 2026 (PDF)',
  '20261022_-_ms-hs_chapel_-_joseph_-_parent_handout.pdf',
)
const LIONS_SEP = doc('Lions Connect recap, Sept. 17, 2026 (PDF)', '20260917_-_lions_connect_-_parent_handout.pdf')
const LIONS_OCT = doc(
  'Lions Connect recap, Oct. 22, 2026 (PDF)',
  '20261022_-_lions_connect_-_hard_providences_-_parent_handout.pdf',
)
const DEVO_WK1 = doc('Wednesday devotion recap, Aug. 19, 2026 (PDF)', '20260819_-_martin_luther.pdf')
const DEVO_WK2 = doc('Wednesday devotion recap, Aug. 26, 2026 (PDF)', '20260826_-_augustine_of_hippo.pdf')

export const hickoryGroveChristian: FaithLifeProgram = {
  colors: { brand: '#14396e', gold: '#c5b358' },

  lead: {
    strong:
      'Hickory Grove Christian School is “a ministry of Hickory Grove Baptist Church”. The church started it in 1995. Students take Bible as a core class every year, and the church’s pastors teach in chapel.',
    muted: 'The school says: “Christian faith is the basis for everything we do at Hickory Grove Christian School.”',
  },

  stats: [
    {
      value: '10',
      label: 'chapels a year',
      note: 'eight split mornings and two all-school chapels on the 2026–27 calendar',
    },
    {
      value: '13',
      label: 'years of Bible as a core class',
      note: '“from kindergarten through 12th grade”',
    },
    {
      value: '4',
      label: 'Bible credits to graduate',
      note: 'one Bible course each year of high school, of 27 credits in all',
    },
    {
      value: '200+',
      label: 'Bible verses memorized',
      note: 'by the end of elementary school, about one a week',
    },
  ],

  chapel: {
    headline:
      'Chapel meets ten times a year, mostly on Thursday mornings. Elementary students worship first, then middle and high school. Pastors from Hickory Grove Baptist Church teach, and students help lead the music.',
    entries: [
      {
        chip: { band: 'TK–5' },
        title: 'Elementary chapel',
        text: 'At 8:00 AM on chapel mornings. The 2026–27 series “follows men and women of the Bible who took a stand for God.”',
        muted: 'Speakers in fall 2026 included the church’s Family Discipleship Pastors.',
      },
      {
        chip: { band: '6–12' },
        title: 'Middle and high school chapel',
        text: 'At 9:30 AM, in the sanctuary. The 2026–27 theme is “Here I Stand.” Middle schoolers take notes on chapel sheets, and high schoolers write in a Here I Stand journal.',
        muted:
          'Speakers in fall 2026 included the church’s Student Discipleship Pastors. Students in grades 6–12 wear Honor Dress to chapel.',
      },
      {
        chip: { word: 'all' },
        title: 'All-school chapels',
        text: 'A Thanksgiving Chapel and a Christmas Chapel bring the whole school together. Performing arts students lead the Christmas Chapel.',
        muted: 'Seniors also have a Senior Recognition Chapel in April.',
      },
      {
        chip: { word: 'weekly' },
        title: 'High school devotions',
        text: 'Every Wednesday, high schoolers hear a devotion on one of “thirty-four witnesses who stood firm for Christ across twenty centuries.” A teacher or pastor tells each story.',
      },
      {
        chip: { band: '6–8' },
        title: 'Middle school devotions',
        text: 'Teachers lead a devotion every morning. Before school, the Quiet Time Cafe is open for devotions and journaling, from 7:00 to 7:15 a.m.',
      },
      {
        chip: { band: '9–12' },
        title: 'Chapel Band',
        text: 'High school students “audition, rehearse and help our worship pastors lead student-led chapel.”',
      },
      {
        chip: { band: '7–8' },
        title: 'Praise Team',
        text: 'A middle school course “designed for students who desire to use their musical talents to lead others in worship.”',
      },
    ],
    note: {
      strong: 'Families can watch or visit.',
      text: '“Every chapel is streamed live and saved to our archive.” Visitors 18 and older can register ahead.',
      muted: 'Chapel dates and times follow the school’s 2026–27 calendar and its chapel sign-up form.',
    },
    sources: [
      CHAPEL,
      SPIRITUAL,
      MS,
      HS,
      HERE,
      PERFORMING,
      MS_CATALOG,
      DRESS,
      CALENDAR,
      PREREG,
      ES_CHAPEL_SEP,
      MSHS_CHAPEL_SEP,
      ES_CHAPEL_OCT,
      MSHS_CHAPEL_OCT,
    ],
    verify: [
      'The school\'s pages count chapel three ways: "Once a month" (/chapel), "One Thursday a month" (/middle-school-home) and "10 Chapels / each school year" (/469460_2). The 2026-27 calendar has 8 split chapel days plus Thanksgiving (a Friday) and Christmas: 10. March has two (Mar 11, Mar 25), and the Senior Recognition Chapel (Fri Apr 30) is an eleventh. The card prints "ten times a year"; the frequency question is on Ask the School.',
      '"HGBC pastors teach in chapel" (/469460_2) against "student-led chapel" (/performing). The card prints both as published: pastors teach, students help lead the music.',
      'Times are from the chapel pre-registration form: "Elementary Chapel (8:00am)", "Lions Connect (9:00am)", "MS/HS Chapel (9:30am)". The calendar feed stores the same times in UTC.',
      'Only the middle school page names the room ("the sanctuary"). The elementary chapel\'s room is not stated.',
      'Speakers are from the Chapel at Home recaps of Sept. 17 and Oct. 22, 2026. Each recap names its speaker and pastoral title.',
      'The school spells it "Quiet Time Cafe" (/middle-school-home) and "Quiet Time Café" (/469460_2). The card uses the division page\'s form.',
      'Whether chapel attendance is required is not stated on any public page. It is a NOT STATED row on What It Asks of Families.',
    ],
  },

  classes: {
    headline:
      'Bible is a required core class every year. Here is what each grade studies, and the four Bible credits a high school student needs to graduate.',
    intro: {
      text: '“Bible classes are mandatory at the elementary, middle, and high school levels”.',
      muted: 'Elementary students “memorize about one Bible verse each week.”',
    },
    groups: [
      {
        name: 'Elementary School',
        tally: 'Bible every day',
        rows: [
          {
            label: 'Kindergarten–Grade 5',
            band: 'K–5',
            detail:
              'Building on the Rock, “a biblical worldview and Bible survey curriculum.” “Each day begins with Scripture, a teacher devotional and prayer”.',
          },
          {
            label: 'Kingdom Builders',
            band: '4–5',
            detail:
              'A special class with “Biblically based lessons about things like communication, conflict resolution, problem solving, and sportsmanship”.',
          },
        ],
      },
      {
        name: 'Middle School',
        tally: 'a Bible class every year',
        rows: [
          {
            label: 'Building on the Rock',
            band: '6',
            detail: 'The Christian worldview, from Summit Ministries.',
          },
          {
            label: 'Walking in Truth',
            band: '7',
            detail:
              'Compares the key beliefs of Christianity with Islam, naturalism and new spirituality. From Summit Ministries.',
          },
          {
            label: 'Light Bearers',
            band: '8',
            detail:
              'Helps students “understand how they can live out their Christian worldview in a post-Christian culture.” From Summit Ministries.',
          },
          {
            label: 'Faith and leadership electives',
            band: '6–8',
            detail:
              'Courses include Becoming a Young Man of God and Becoming a Young Woman of God (grades 7–8), Student on Mission, and Christian Leadership for selected 8th graders.',
          },
        ],
      },
      {
        name: 'High School',
        tally: '4 Bible credits to graduate',
        rows: [
          {
            label: 'Old Testament Survey',
            band: '9',
            credit: '1',
            detail: 'College prep or honors. Students “survey the entire Bible through broad themes”.',
          },
          {
            label: 'New Testament Survey',
            band: '10',
            credit: '1',
            detail: 'College prep or honors. The books of the New Testament, its world and the life of Christ.',
          },
          {
            label: 'Christian Apologetics',
            band: '11',
            credit: '1',
            detail:
              'College prep or honors. Students learn “the logical, philosophical, historical, and scientific evidences for the Christian faith.” Honors Introduction to Philosophy is the other choice.',
          },
          {
            label: 'Systematic Theology',
            band: '12',
            credit: '1',
            detail:
              'College prep or honors. Students “solidify their understanding of doctrines essential to the orthodox Christian faith.” Honors Introduction to Ethics is the other choice.',
          },
          {
            label: 'Introduction to Bible',
            band: '9–12',
            detail:
              'A course “recommended for students who have never attended a Christian school or are new to HGCS.” Enrollment is by the school’s recommendation.',
          },
        ],
      },
    ],
    note: {
      strong: 'Honors and college credit.',
      text: 'Five honors Bible courses are dual enrollment courses through Judson College, “the undergraduate college program of Southeastern Baptist Theological Seminary (SEBTS).”',
      muted: 'Middle school Spanish Immersion students take Bible in Spanish.',
    },
    sources: [ACADEMICS, SPIRITUAL, ES, MS, HS, MS_CATALOG, HS_CATALOG, PROFILE],
    verify: [
      '"13 Years / of Bible as a core class, from kindergarten through 12th grade" (/469460_2) against "From Transitional Kindergarten through 5th grade, students build a strong foundation in Bible…" (/elementary-school-home): TK would make 14. The tile prints the school\'s 13.',
      '/469460_2 names one 11th and one 12th grade course. The HS catalog (p. 22) also allows Honors Introduction to Philosophy (11th) and Honors Introduction to Ethics (12th) for the core unit. The card prints both.',
      'No Bible rule for a student who joins in 10th–12th grade is published. The catalog says "Minimum total credits: 1 per year" and "Transfer Credits: Students may earn and transfer credits from other accredited institutions." On Ask the School.',
      'The dual enrollment courses (HS catalog p. 4): Honors Old Testament, Honors New Testament, Honors Systematic Theology, Honors Introduction to Philosophy, Honors Introduction to Ethics.',
      'No page names a required Bible translation. Every chapel and devotion recap cites the ESV; the card does not say so.',
      'The 7th-grade catalog line spells "Chrisitanity"; the card paraphrases rather than quote the typo. The MS course is "Student on Mission" on the web page and catalog grid and "Students on Mission" on the catalog course page; the card uses the web page\'s form, as Student Clubs does.',
      'The Early Education Center uses "The Gospel Project for Preschool". Not on the card: the card starts at kindergarten.',
    ],
  },

  groups: {
    headline:
      'Where students talk about faith in smaller groups: monthly middle school groups and teacher-led high school groups.',
    entries: [
      {
        chip: { band: '6–8' },
        title: 'Grove Groups',
        text: '“On the first Thursday of each month,” students meet by grade level to learn from “the lives of martyrs, missionaries, and mentors”, then split into small discipleship groups.',
      },
      {
        chip: { band: '9–12' },
        title: 'Discipleship groups (D-groups)',
        text: '“Every high school student is placed in a small discipleship group led by a teacher.” Groups meet in the midday Club Flex time on most Thursdays.',
      },
      {
        chip: { word: 'all' },
        title: 'A student pastor on campus',
        text: 'The church’s “student discipleship pastor is on campus and available for one-on-one conversations with students.”',
      },
      {
        chip: { band: '8' },
        title: 'Christian Leadership',
        text: 'A course for selected 8th graders, who “will be expected to commit to serving as campus leaders throughout the entire school year.”',
      },
    ],
    note: {
      strong: 'Teams too.',
      text: 'One goal of the athletics program is to “Disciple Athletes”: “We will strive to have great discipleship on our teams.”',
    },
    sources: [SPIRITUAL, MS, HS, MS_CATALOG, ATHLETICS],
    verify: [
      '"Groups meet several times a month" (/469460_2) against "On most Thursdays, this time is used for D-groups." (/high-school-home). The card prints the second, with its time slot; the question is on Ask the School.',
      '"first Thursday of each month" for Grove Groups does not match the chapel Thursdays on the calendar (Sept. 17, Oct. 22). Grove Groups have no calendar entries.',
      '/469460_2 does not say which divisions the student discipleship pastor serves.',
      'No elementary small group is published.',
    ],
  },

  beliefs: {
    headline:
      'The school’s mission and vision, the beliefs it lists, and the outcomes it hopes for in every student, in the school’s own words.',
    mission:
      '“Hickory Grove Christian School disciples students through a biblical worldview, forming them in academics, athletics, and arts to be committed to God, connected to the mission, and wise in Christ, that they may know Him and make Him known.”',
    tenets: [
      "All truth is God's truth, and that every subject should be taught through a biblical worldview.",
      'Christian education is a shared effort among the school, the home, Hickory Grove Baptist Church, and the broader body of Christ.',
      'Christian education must have an eternal perspective, focused on the salvation and discipleship of the next generation.',
      "Success at HGCS is measured not only by students' leadership, excellence, and integrity, but most of all by a lifelong commitment to Jesus Christ.",
      'A rigorous environment across academics, athletics, and the arts fully prepares students for the challenges ahead of them.', // plain-ok: rigor
      'Students learn in different ways, so our teachers use a variety of instructional strategies to support each learner.',
      'Each student is created in the image of God, with unique spiritual, academic, physical, mental, and emotional needs.',
    ],
    outcomes: [
      { name: 'Committed to God', text: 'Devoted to the Lord with rightly ordered loves' },
      { name: 'Connected to the Mission', text: 'Joined to the body of Christ in shared mission' },
      {
        name: 'Wise in Christ',
        text: 'Discerning between the biblical wisdom of God and the wisdom of the world',
      },
    ],
    note: {
      strong: 'A ministry of Hickory Grove Baptist Church.',
      text: 'Its vision: “To know Christ and to make Him known through Christian education.”',
      muted:
        'The school verse is Matthew 6:33. The school holds dual accreditation through Cognia and the Association of Christian Schools International (ACSI).',
    },
    sources: [BELIEFS, ESOS, ACADEMICS, PROFILE, SPIRITUAL, ACCREDITATION],
    verify: [
      'The mission is printed in three wordings: the one on the card (/our-beliefs, /academics-home, /469460_2); "To disciple students in the Gospel story of creation, fall, redemption, and restoration, equipping them to be Committed to God, Connected to the Mission, and Wise in Christ." (/admissions-home, /esos); and "To equip students to serve God in the 21st century by providing an excellent academic program founded upon a biblical worldview." (Mallard Creek EEC interest form). The card prints the belief page\'s.',
      'By the user\'s decision (2026-11-26) the card prints no statement of faith. The belief pages carry none. The only document the site calls "the HGCS Statement of Faith" is a marriage, gender and sexuality statement linked from the employment application. It stays in the research file.',
      '/esos also lists what students "will" do under each outcome. Those lists stay in the research file to keep the card short.',
      '/our-beliefs vision paragraph says "completed in the fear of the Lord"; /academics-home says "consummated". The card does not quote that sentence.',
    ],
  },

  families: {
    headline:
      'What the school’s public pages say about faith when you apply and once you enroll, and what they leave unsaid.',
    groups: [
      {
        name: 'When you apply',
        rows: [
          {
            label: 'Pastor reference',
            status: 'published',
            detail:
              'Every grade’s checklist lists a “Personal Recommendation form” from the family’s pastor. For middle and high school it is “from student/family’s pastor”.',
          },
          {
            label: 'Family interview',
            status: 'published',
            detail:
              '“Family Interview is an opportunity to share the Mission, Vision, and Statement of Faith, and to assess whether HGCS is the right fit for your family”.',
          },
          {
            label: 'Student questionnaire',
            status: 'published',
            detail: 'Applicants in grades 4–12 fill in a Student Questionnaire. Its questions are not on the public site.',
          },
          {
            label: 'Church members apply first',
            status: 'published',
            detail:
              'Applications opened on November 2, 2026, for church members, Early Education Center students and siblings, and on November 16 for all new families.',
          },
          {
            label: 'A parent’s own faith',
            status: 'notStated',
            detail:
              'The public pages do not say whether a parent must be a Christian or belong to a church. The Mallard Creek preschool’s interest form does ask about the family’s church and the parents’ faith.',
          },
          {
            label: 'Agreeing to a statement of faith',
            status: 'notStated',
            detail: 'The public pages do not say whether families sign one.',
          },
        ],
      },
      {
        name: 'Once enrolled',
        rows: [
          { label: 'Bible class', status: 'published', detail: 'Required every year.' },
          {
            label: 'Honor Code',
            status: 'published',
            detail:
              '“Every high school student signs our Student Honor Code, a covenant organized around our three Expected Student Outcomes.”',
          },
          {
            label: 'Dress for chapel',
            status: 'published',
            detail:
              '“Honor Dress is required for all chapel programs in 6th-12th grades and at certain special events.”',
          },
          {
            label: 'Chapel attendance',
            status: 'notStated',
            detail: 'The public pages do not say whether chapel is required.',
          },
        ],
      },
    ],
    note: {
      strong: 'Teachers and staff must share the faith.',
      text: 'The job posting asks for a “Committed Christian in agreement with the school’s Statement of Faith” who is “Active in a local bible-believing church.”',
      muted: 'The school keeps its Parent-Student Handbook and its online application behind a family login.',
    },
    sources: [CHECKLIST_ES, CHECKLIST_MHS, ADMISSIONS, ACADEMICS, HS, HONOR, DRESS, EMPLOYMENT, MYHGCS],
    verify: [
      'The Parent-Student Handbook is "available to current families in ParentSquare and the FACTS Family Portal" (/myhgcs). The online application (FACTS) needs a login. The pastor\'s Personal Recommendation form and the Student Questionnaire are not posted.',
      'Student Questionnaire: elementary checklist "(4th & 5th)"; middle and high school checklist, every applicant.',
      'Mallard Creek EEC interest form (Google Form) asks "Are you and your family an active member of a church?", church involvement, "your walk with the Lord (description of the parent\'s faith)" and whether parents "support all aspects of the school\'s mission". It states no admission rule and covers the preschool only.',
      'The Honor Code is signed at the Aug. 27 "Chapel/Honor Code Ceremony" by INFERENCE only. The MS page links the same code; whether MS and ES students sign it is not stated.',
      'By the user\'s decision (2026-11-26) the MS/HS dress code\'s presentation sentence is not on the card.',
      'The employment line is quoted from /employment; the employment application also asks for a church reference.',
    ],
  },

  service: {
    headline:
      'Seniors go on a mission trip to the Dominican Republic each year, and the whole school gives to a cause each quarter.',
    entries: [
      {
        chip: { band: '12' },
        title: 'Senior Mission Trip',
        text: '“Our seniors serve together annually on a mission trip to the Dominican Republic.” The 2026–27 trip is in January 2027.',
      },
      {
        chip: { band: '9–11' },
        title: 'High School Mission Week',
        text: '“While the seniors are away, the rest of the high school serves the local community through Mission Week.”',
      },
      {
        chip: { word: 'all' },
        title: 'Quarterly missions collection',
        text: '“Each quarter, our school family gives to support a local ministry or cause.” Causes named include XChange, an addiction ministry of the church; Operation Christmas Child; and a Baby Bottle Drive “supporting the sanctity of human life”.',
      },
      {
        chip: { word: 'weekly' },
        title: 'HGBC Food Pantry',
        text: 'Spanish Immersion students “serve as interpreters each week as our pastors share the Gospel with our community.” The high school aquaponics lab “grows food for the HG Food Pantry.”',
      },
      {
        chip: { band: '7–8' },
        title: 'Student on Mission',
        text: 'A middle school course that “studies what God is doing around the world and how students can serve Charlotte.”',
      },
      {
        chip: { band: '9–12' },
        title: 'Global Missions & Language Certificate',
        text: 'Students earn it with three units of a foreign language, honors Bible courses, “at least one international mission trip” and a missions practicum or internship.',
        muted:
          'The course catalog adds one more requirement: “Be an active church member of like-minded faith, verified through a positive letter of recommendation by a pastor, preferably the student’s Youth Pastor.”',
      },
      {
        chip: { word: 'all' },
        title: 'Host families',
        text: 'Church families and school families can host an international student. The school calls it “missions in reverse”.',
      },
    ],
    note: {
      strong: 'Outreach beyond Charlotte.',
      text: 'The school names “international outreach efforts in the Dominican Republic, Ecuador, Haiti, and Kenya.”',
      muted: 'The school’s pages give no service-hour requirement.',
    },
    sources: [MISSIONS, HS, ACADEMICS, MS_CATALOG, HS_CATALOG, HOST, CALENDAR],
    verify: [
      'The trip\'s cost, whether it is in tuition and whether every senior goes are not stated. The tuition page and PDF list no trip charge.',
      'LEAD only, not used: an orphan /aquaponics page (in no menu or sitemap, undated) says "each year our senior class has the opportunity to participate in mission trips—both domestic and international". The card prints the nav-linked page.',
      'Mission Week has no calendar entry; INFERENCE that it is the same January week as the senior trip.',
      'Which quarter each collection runs is not stated. Baby Bottle Drive quote: "Baby Bottle Drive: supporting the sanctity of human life".',
      'Global Missions certificate: /missions-and-service lists four requirements; HS catalog p. 9 lists six, adding the church-member and pastor-letter requirement and "Meet all HGCS graduation requirements". The card prints the web page and adds the catalog\'s church requirement in muted text.',
      'The Student Clubs card\'s code comment used to say the site no longer shows the four countries or aquaponics; /academics-home and /high-school-home show both on 2026-11-26.',
    ],
  },

  staff: {
    headline:
      'Pastors from Hickory Grove Baptist Church teach in chapel and lead the parent sessions. The school lists no chaplain of its own.',
    people: [
      { name: 'Clint Pressley', role: 'Senior Pastor, Hickory Grove Baptist Church; Advisory Board member' },
      { name: 'Nick Gentili', role: 'Student Discipleship Pastor, Hickory Grove Baptist Church' },
      { name: 'Jacob Prince', role: 'Student Discipleship Pastor, Hickory Grove Baptist Church' },
      { name: 'Campbell Benfield', role: 'Family Discipleship Pastor, Hickory Grove Baptist Church' },
      { name: 'Ben Harris', role: 'Family Discipleship Pastor, Hickory Grove Baptist Church' },
      {
        name: 'Fernando Rogante',
        role: 'Bible Department Head, High School',
        email: 'fernandorogante@hgchristian.org',
      },
      { name: 'Austin Turner', role: 'Middle School Bible, PE', email: 'austinturner@hgchristian.org' },
    ],
    note: {
      strong: 'Teachers and leaders share the Wednesday devotions.',
      muted: 'Speakers in fall 2026 included the head of school and the high school principal.',
    },
    sources: [
      SPIRITUAL,
      PROFILE,
      ADVISORY,
      ES_CHAPEL_SEP,
      MSHS_CHAPEL_SEP,
      ES_CHAPEL_OCT,
      MSHS_CHAPEL_OCT,
      HS_CATALOG,
      ALUMNI_STAFF,
      DEVO_WK1,
      DEVO_WK2,
      OUR_STAFF,
    ],
    verify: [
      'No school chaplain or spiritual life director appears on any page or in the directory. The directory (/our-staff, 116 entries) gives department and email only, no titles.',
      'The four discipleship pastors\' titles are from the Chapel at Home and Lions Connect recaps (Sept. 17 and Oct. 22, 2026). None has a published email on the school site.',
      'Clint Pressley\'s title is from the 2026-27 profile masthead; he is listed on /advisory-board.',
      'Fernando Rogante: the HS catalog lists "Bible- Fernando Rogante fernandorogante@hgchristian.org" among "the department heads". Austin Turner\'s role is from /alumni-at-hg; both emails are also the directory\'s.',
      'Devotion speakers: Week 1 the Head of School (Aug. 19), Week 2 the High School Principal (Aug. 26), from the recaps.',
    ],
  },

  parents: {
    headline:
      'A parent session on chapel mornings, take-home recaps of every chapel and devotion, and a monthly prayer group.',
    entries: [
      {
        chip: { word: 'monthly' },
        title: 'Lions Connect',
        text: '“Lions Connect meets on chapel mornings, between Elementary Chapel and Middle and High School Chapel, so you can worship with your child and stay for both.” Church pastors lead it, at 9:00 AM.',
        muted: 'Fall 2026 topics were “Because I Told You So” and “Hard Providences.”',
      },
      {
        chip: { word: 'monthly' },
        title: 'Chapel at Home',
        text: 'After every chapel, families get a recap with the message, its Scripture and “a few questions to talk through with your child.” There is an elementary version and a middle and high school version.',
      },
      {
        chip: { word: 'weekly' },
        title: 'Devotion recaps',
        text: 'A one-page recap of each high school Wednesday devotion, “so you can ask your student about it at dinner or in the car.”',
      },
      {
        chip: { word: 'monthly' },
        title: 'Lions in Prayer',
        text: '“Parents gather once a month to pray for our students, staff and school.” Meetings are at 8:00 AM on the first Monday of the month.',
      },
    ],
    note: {
      strong: 'The Parent Teacher Fellowship.',
      text: '“We call ourselves a fellowship because we are believers united in furthering Kingdom Education.”',
      muted: 'Contact: Cynthia Sampson, cynthiasampson@hgchristian.org.',
    },
    sources: [LIONS, LIONS_SEP, LIONS_OCT, PREREG, CHAPEL, HERE, ES, PTF],
    verify: [
      'Lions Connect\'s time is from the chapel pre-registration form: "Lions Connect (9:00am)".',
      'Lions in Prayer is listed on the elementary page only; its room and whether it is for every division are not stated.',
      '/lions-connect also lists recommended books; not on the card.',
    ],
  },

  ask: {
    headline:
      'Twelve questions to take on the tour. Each covers something the school’s public pages leave unanswered or say two ways.',
    questions: [
      'Does a parent need to be a Christian, or belong to a church, for a child to be admitted?',
      'What does the pastor’s recommendation form ask? What if our family does not have a pastor?',
      'May we read the Statement of Faith shared in the family interview? Do families sign it?',
      'Is chapel required for every student?',
      'How often does chapel meet? One page says once a month, and the 2026–27 calendar has two in March.',
      'How often do high school discipleship groups meet? One page says several times a month, and another says most Thursdays.',
      'Does every senior go on the Dominican Republic mission trip, and is it part of tuition?',
      'How many Bible credits does a student who joins in 10th, 11th or 12th grade need?',
      'Are there any retreats, for any grade?',
      'Are service hours required?',
      'Do elementary and middle school students sign the Honor Code too?',
      'May we read the Parent-Student Handbook before we enroll?',
    ],
    asOf: 'November 26, 2026',
  },
}
