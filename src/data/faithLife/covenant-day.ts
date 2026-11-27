// Covenant Day School — Faith & Spiritual Life.
//
// Every fact is from the school's own public pages and the documents they
// link, read 2026-11-27 in two passes and re-checked against the live pages the
// same day. The full record, the source URLs and the conflicts between the
// school's own pages are in source-material/faith-spiritual-life/covenant-day/
//   Covenant Day School - Faith and Spiritual Life - Official Site Research.md
//   Covenant Day School - Faith and Spiritual Life - Second Pass Gap Research.md
//
// Kept out on purpose: every student's name, personal staff detail, trip
// prices and exact travel dates, every LEAD (the 2025-2026 Classic Magazine,
// the Annual Report 2025-2026, the superseded 2025-26 HS Profile), everything
// from the comms archive, unlinked pages and the 2026-27 Viewbook (user
// decision 2026-11-27: cards cite public menu pages only), and the text after
// the nine-point summary on the What We Believe tab (user decision 2026-11-27).
//
// `colors`: the brand navy is the school's from src/data/brands.ts; the blue is
// the school's own --secondary-color from its site theme. The site uses no gold.

import type { Source } from '../../components/SourceRow.tsx'
import type { FaithLifeProgram } from '../faithLife.ts'

const BASE = 'https://www.covenantday.org'
const src = (label: string, path: string): Source => ({
  label: `covenantday.org — ${label}`,
  url: path.startsWith('http') ? path : `${BASE}${path}`,
})

const ABOUT = src('About Us', '/about-us')
const WHO_WE_ARE = src('Who We Are', '/about-us/who-we-are')
const LEADERSHIP = src('Leadership', '/about-us/leadership')
const CAREERS = src('Careers at CDS', '/about-us/careers')
const DIRECTORY = src('Faculty & Staff', '/about-us/faculty-staff')
const CAMPUS_MAP = src('Campus Map', '/about-us/campusmap')
const CALENDAR = src('School Calendar 2026–27', '/about-us/calendar')
const KEY_DATES = src('2026-2027 Key Dates (PDF)', '/fs/resource-manager/view/417ef148-7631-4d24-a131-14ea2ad5f441')
const ACADEMICS = src('Academics', '/academics')
const LS = src('Lower School (curriculum and milestones)', '/academics/lower-school')
const MS = src('Middle School (curriculum and milestones)', '/academics/middle-school')
const HS = src('High School (courses and milestones)', '/academics/high-school')
const PROFILE = src('2026-2027 High School Profile (PDF)', '/fs/resource-manager/view/553e845a-d32a-4eb6-ad18-d8a291a151c2')
const PROCESS = src('Admissions Process', '/admissions/process')
const FAQS = src('Admissions FAQs', '/admissions/faqs')
const TUITION = src('Tuition & Financial Aid', '/admissions/tuition-financial-aid')
const TUITION_TERMS = src('2026-2027 Tuition Payment Terms and Conditions (PDF)', '/fs/resource-manager/view/32382ef0-4be4-4d11-b090-3a79562ed4ec')
const CAMPUS_LIFE = src('Campus Life', '/campus-life')
const DISCIPLESHIP = src('Discipleship', '/campus-life/discipleship')
const SERVICE = src('Service', '/campus-life/service')
const STUDENT_LIFE = src('Student Life', '/campus-life/student-life')
const MUSIC = src('Music', '/arts/music')
const BOOSTER = src('Booster Club', '/athletics/booster-club')

export const covenantDay: FaithLifeProgram = {
  colors: { brand: '#002855', gold: '#1E7EA7' },

  lead: {
    strong:
      'Covenant Day School is “a ministry of Christ Covenant Church (PCA)”, a Presbyterian church in Matthews. Students take Bible in every grade, and chapel meets every week.',
    muted:
      'Its first core value: “Our foundation is built on the absolute truth of God and His word, and every aspect of our education is permeated by our faith in Christ.”',
  },

  stats: [
    { value: 'JK–12', label: 'a Bible class in every grade', note: 'from junior kindergarten through 12th grade' },
    { value: '3.5', label: 'Bible units to graduate', note: 'of 25 units in all, with a Bible course each year' },
    { value: 'JK–11', label: 'grades that need a pastor’s recommendation', note: 'and one parent must be a Christ-follower' },
    { value: '$400', label: 'discount for church members', note: 'per student, for members of Christ Covenant Church' },
  ],

  chapel: {
    headline:
      'Chapel meets every week, with students grouped by age. The whole school gathers for chapel in the church’s Worship Center.',
    entries: [
      {
        chip: { word: 'weekly' },
        title: 'Weekly chapel',
        text: '“Chapels are separated by age and include praise songs, scripture reading, and a message from guest speakers, principals, or teachers.”',
        muted: 'Junior kindergarten and kindergarten students attend chapel every week.',
      },
      {
        chip: { band: '6–8' },
        title: 'Middle school chapel',
        text: 'The school lists “meaningful chapels” among what middle schoolers gain. Students in 8th grade “can participate in chapel leadership.”',
      },
      {
        chip: { word: 'all' },
        title: 'All-school chapels',
        text: 'The whole school meets in the Worship Center of Christ Covenant Church for chapels and celebrations. The 2026–27 calendar has Convocation in September and an All-School Christmas Chapel in December.',
        muted: 'Baccalaureate for seniors is in May.',
      },
      {
        chip: { band: '6–12' },
        title: 'Worship bands',
        text: 'The music program lists a Middle School Worship Band and a High School Worship Band.',
      },
      {
        chip: { band: '9–12' },
        title: 'Worship Leadership',
        text: 'A college-prep fine arts course in leading worship.',
      },
    ],
    note: {
      strong: 'Teachers pray too.',
      text: '“Several times every week, teachers gather before homeroom to pray for one another and their students.”',
      muted: 'The whole faculty and staff also “meet quarterly for worship and devotions.”',
    },
    sources: [DISCIPLESHIP, MS, LS, CAMPUS_MAP, CALENDAR, KEY_DATES, MUSIC, HS],
    verify: [
      'The chapel day and times (Wednesdays: LS 9:15 a.m., MS 10:20 a.m., HS 11:00 a.m.) are published only in the school’s weekly emails at /lions-web-pages-clone/comms-archive, which no menu links. By the user’s decision (2026-11-27) the cards cite public menu pages only, so the day and time are not printed. The question is on Ask the School.',
      'The middle and high school weekly chapel rooms are not stated on any page. The lower school’s (the Worship Center) is in an email only.',
      'Whether chapel attendance is required is not stated on any public page. It is a NOT STATED row on What It Asks of Families.',
      'No page mentions sacraments or a liturgy in chapel.',
      'The worship teacher is "Worship and Choir Teacher" on /arts/music, /about-us/careers and /about-us/our-stories, and "MS/HS Choir Director & Music Teacher" in the directory. The Staff card uses the music page’s form, as the Arts card does.',
      '"Chapel Leadership (8th grade)" is a named elective in the 2026-27 Viewbook, which is reached from an unlinked download page. The card quotes /academics/middle-school instead.',
    ],
  },

  classes: {
    headline:
      'Bible is taught in every grade, from junior kindergarten through 12th grade. Here is what each grade studies, and the Bible units a high schooler needs to graduate.',
    intro: {
      text: 'The school says “All subjects are taught from a biblical worldview”.',
      muted: 'It names theology among its core subjects, beside literature, math, science, history and world languages.',
    },
    groups: [
      {
        name: 'Lower School',
        tally: 'Bible every year',
        rows: [
          { label: 'Junior Kindergarten', band: 'JK', detail: 'God’s love, short Scripture passages to memorize, and key Bible characters and their stories.' },
          { label: 'Kindergarten', band: 'K', detail: 'Friendship with God and others, short Scripture passages, and Bible characters and their stories.' },
          { label: 'Grade 1', band: '1', detail: 'Abraham through the settling of the Promised Land, then Judges and Ruth through the exile and return of Israel, with Psalms and Proverbs.' },
          { label: 'Grade 2', band: '2', detail: 'A review of the Old Testament with the Jesse Tree, then the New Testament: the life, death and resurrection of Jesus, the early church and Paul’s journeys.' },
          { label: 'Grade 3', band: '3', detail: 'Creation through the Promised Land, ending with a study of Ephesians.' },
          { label: 'Grade 4', band: '4', detail: 'Philippians, Judges, Joshua and the kings of Israel, Jewish feasts and the fruit of the Spirit. The Goodness Gorillas unit ends in a service project.' },
          { label: 'Grade 5', band: '5', detail: '1 Peter, the Old Testament covenants, how the Gospels were written, and the life and ministry of Jesus.' },
        ],
      },
      {
        name: 'Middle School',
        tally: 'Bible every year',
        rows: [
          { label: 'Old Testament survey', band: '6', detail: 'Students build a Christian worldview “from the study of scripture.”' },
          { label: 'The Gospels', band: '7', detail: 'The life of Christ, how to study the Bible, and “the habit of personal devotions.”' },
          { label: 'Acts and the letters of Paul', band: '8', detail: 'Applying Scripture to daily life, and learning how to share their faith.' },
        ],
      },
      {
        name: 'High School',
        tally: '3.5 Bible units to graduate',
        rows: [
          { label: 'Old Testament Survey', band: '9', detail: 'College prep.' },
          { label: 'New Testament Survey', band: '10', detail: 'College prep.' },
          { label: 'Christian Doctrine', band: '11', detail: 'College prep.' },
          {
            label: 'Engaging the Culture - An Introduction to Apologetics and Worldviews',
            band: '12',
            detail: 'College prep. Apologetics is the case for the Christian faith.',
          },
        ],
      },
    ],
    note: {
      strong: 'A Bible course every year.',
      text: 'High schoolers “must be enrolled in a Bible course each year”. 3.5 units of Bible count toward the 25 units needed to graduate.',
      muted: 'The school does not say which course carries the half unit.',
    },
    sources: [ACADEMICS, LS, MS, HS, PROFILE],
    verify: [
      'The 2026-2027 HS Profile requires "3.5 units of Bible*" with "* Students must be enrolled in a Bible course each year"; the Bible tile lists four courses, one per grade, with no credits. Which course is the half unit is on Ask the School.',
      'LEAD: the superseded 2025-26 profile read "3 units of Bible". Not printed.',
      'No page names a Bible translation, a curriculum publisher, or a rule for a student who joins in grades 10-12. Both are on Ask the School.',
      'The profile marks dual enrollment (Covenant College) on three non-Bible courses only.',
      'No lower school Bible teacher is listed in the directory.',
    ],
  },

  retreats: {
    headline: 'Middle and high school start each year with a retreat at Windy Gap. Retreats are included in tuition.',
    cells: [
      {
        title: 'High school: Windy Gap',
        text: 'Students and teachers “step away from the busyness of life to reconnect—with one another and, most importantly, with the Lord.” The days hold games, skits, cabin time and “time in God’s Word”.',
      },
      {
        title: 'Middle school: Windy Gap',
        text: 'A trip in August with friends and teachers, “filled with chapels, team-building, and free time”.',
      },
    ],
    note: {
      strong: 'In tuition.',
      text: 'Tuition includes “school retreats and required field trips”.',
      muted: 'Fifth graders also take an overnight trip to Fort Caswell, on the North Carolina coast, in the spring.',
    },
    sources: [HS, MS, STUDENT_LIFE, CALENDAR, TUITION, LS],
    verify: [
      '/campus-life/student-life calls Windy Gap "a three-day retreat"; the two milestone tiles call it a "weekend". The 2026-27 calendar lists each division’s trip on three consecutive weekdays in August 2026. The card says "in August" and quotes neither length.',
      '"filled with chapels, team-building, and free time" is from /campus-life/student-life, which names middle and high school together.',
      'The 5th-grade trip: Fort Caswell on the LS milestone tile and the 2026-27 calendar (May 2027); Kanuga on /campus-life/student-life. The card prints Fort Caswell; the conflict is on Ask the School. Its faith content is in the Classic Magazine only (LEAD), so it is a note, not a cell.',
      'Whether every student must attend Windy Gap is not stated on a public page. Who runs it and its speaker are not stated.',
      'No lower school retreat is published.',
    ],
  },

  groups: {
    headline:
      'Where students pray and talk about faith in smaller groups: daily homeroom devotions, weekly high school advisory groups and student-led Bible studies.',
    entries: [
      {
        chip: { band: '6–8' },
        title: 'Homeroom devotions',
        text: '“Each day during homeroom, teachers lead a devotional for students.” Students share prayer requests and pray for one another.',
      },
      {
        chip: { band: '9–12' },
        title: 'Advisory groups',
        text: 'Teacher-led groups meet weekly and “stay together all year long.” Students learn about the year’s spiritual theme, report on their schoolwork and pray together.',
        muted: 'Groups are often “guided by a book study focused on spiritual growth.”',
      },
      {
        chip: { word: 'all' },
        title: 'Student Bible studies',
        text: 'Small discipleship groups “usually organized and led by students”. They meet before and after school.',
      },
    ],
    sources: [DISCIPLESHIP, MS, HS],
    verify: [
      'Student chaplains (a high school student chaplain team that writes advisory lessons), the HS Chaplain’s Seminars and two adult-led middle school Bible studies are published only in the weekly emails, so they are not printed (user decision 2026-11-27). Student chaplains are on Ask the School.',
      'The 2026-27 spiritual theme is not on a public page.',
      'The discipleship page does not say which divisions have homeroom devotions; /academics/middle-school confirms "small-group devotions in homeroom", so the chip is 6–8 (review 2026-11-27).',
      'Student Bible studies: the discipleship page describes them for the whole school and names no division, so the chip stays ALL.',
      'No house system and no named faith club (FCA, Young Life) is published.',
    ],
  },

  beliefs: {
    headline:
      'The school’s mission, its belief summary and the six marks it hopes to see in every graduate, in the school’s own words.',
    mission:
      '“The mission of Covenant Day School is to assist the Christian family by providing an education marked by a biblical worldview and academic excellence so that students are equipped to be salt and light for God’s glory.”',
    outcomes: [
      { name: 'Follow Christ', text: 'Our graduates recognize that their daily spiritual and intellectual lives are inseparable and complementary, with Christ at the center.' },
      { name: 'Serve Others', text: 'Our graduates demonstrate a love for God, the church as the body of Christ, and all people by affirming others as God’s image bearers.' },
      { name: 'Pursue Wisdom', text: 'Our graduates continue to pursue wisdom and knowledge throughout their lives.' },
      { name: 'Communicate Effectively', text: 'Our graduates communicate confidently and effectively in written, spoken, mathematical, and technological languages.' },
      { name: 'Learn Purposefully', text: 'Our graduates have a passion for learning and the academic tools necessary to thrive as they purposefully take the next steps in their lives.' },
      { name: 'Engage the Culture', text: 'As ambassadors for Christ, our graduates are equipped to represent Him well collegiately in academics, athletics, and/or fine arts.' },
    ],
    note: {
      strong: 'A ministry of Christ Covenant Church (PCA).',
      text: 'The church is “a congregation in the Presbyterian Church in America”. The school says it “is guided by the same doctrinal convictions”, found in the Westminster Confession of Faith and Catechisms.',
      muted: 'The school also says “many—indeed, most—of our families come from other church traditions.”',
    },
    articles: [
      '“We believe the Bible is the written word of God, inspired by the Holy Spirit and without error in the original manuscripts. The Bible is the revelation of God’s truth and is infallible and authoritative in all matters of faith and practice.”',
      '“We believe in the Holy Trinity. There is one God, who exists eternally in three persons: the Father, the Son, and the Holy Spirit.”',
      '“We believe that all are sinners and totally unable to save themselves from God’s displeasure, except by His mercy.”',
      '“We believe that salvation is by God alone as He sovereignly chooses those He will save. We believe His choice is based on His grace, not on any human individual merit, or foreseen faith.”',
      '“We believe that Jesus Christ is the eternal Son of God, who through His perfect life and sacrificial death atoned for the sins of all who will trust in Him, alone, for salvation.”',
      '“We believe that God is gracious and faithful to His people not simply as individuals but as families in successive generations according to His covenant promises.”',
      '“We believe that the Holy Spirit indwells God’s people and gives them the strength and wisdom to trust Christ and follow Him.”',
      '“We believe that Jesus will return, bodily and visibly, to judge all mankind and to receive His people to Himself.”',
      '“We believe that all aspects of our lives are to be lived to the glory of God under the Lordship of Jesus Christ.”',
    ],
    sources: [WHO_WE_ARE, ABOUT, PROFILE],
    verify: [
      'The nine articles are the "brief summary of what we believe" on /about-us/who-we-are, in page order. The same tab carries further text after them; it is not printed, by the user’s decision of 2026-11-27.',
      'The Westminster Confession is not hosted by the school: /about-us/careers links it to a denomination page. The card names it without a link.',
      'Also on /about-us/who-we-are and not on the card: three core values (the first is quoted in the lead), the four-commitment "Christian Community at Covenant Day" statement, and the school verse "We are taking every thought captive to the obedience of Christ." (2 Corinthians 10:5b).',
      'The five vision pillars (Excellence, Mentorship, Partnership, Discipleship, Service, each with a verse) are on /about-us/who-we-are and stay in the research file. The values block renders under the heading "Core values", and the school’s core values are a different three, so the pillars are left off (review 2026-11-27).',
    ],
  },

  families: {
    headline: 'What the school’s public pages say about faith when you apply and once you enroll, and what they leave unsaid.',
    groups: [
      {
        name: 'When you apply',
        rows: [
          { label: 'A Christian parent', status: 'published', detail: 'The school partners with families where “at least one parent is a Christ-follower and is actively involved in a local Christian church.”' },
          { label: 'Your Christian testimony', status: 'published', detail: 'At the parent interview, “parents will be asked to discuss their Christian testimony”.' },
          { label: 'Pastor’s recommendation', status: 'published', detail: 'Required for grades JK–11. If you do not know your senior pastor, the form may come from “another pastor on staff, an elder, a deacon, or a ministry leader who knows your family well”.' },
          { label: 'Church involvement', status: 'published', detail: 'The admission criteria include “The family’s active involvement in a local church”.' },
          { label: 'The student’s own faith', status: 'notStated', detail: 'The public pages do not say whether a student must profess faith or answer faith questions.' },
          { label: 'Signing the school’s beliefs', status: 'notStated', detail: 'The public pages do not say whether parents must sign or affirm the belief summary.' },
        ],
      },
      {
        name: 'Once you enroll',
        rows: [
          { label: 'Bible class', status: 'published', detail: 'High schoolers “must be enrolled in a Bible course each year”.' },
          { label: 'Church-member discount', status: 'published', detail: '“A $400 discount is available for each student in grades JK-12 whose parents are members of Christ Covenant Church.” The family “must affirm the church membership statement that is part of the online enrollment process.”' },
          { label: 'Chapel attendance', status: 'notStated', detail: 'The public pages do not say whether chapel is required.' },
          { label: 'A family agreement', status: 'notStated', detail: 'No family agreement, handbook or conduct code is on the school’s public pages.' },
        ],
      },
      {
        name: 'For staff and trustees',
        rows: [
          { label: 'Staff', status: 'published', detail: 'All staff “must subscribe to the Reformed faith and that doctrine as set forth in the Westminster Confession of Faith”.' },
          { label: 'Trustees', status: 'published', detail: 'The Session (the elders) of Christ Covenant Church appoints the Board of Trustees.' },
        ],
      },
    ],
    note: {
      strong: 'A “three-legged stool”.',
      text: 'The school wants “the church, family, and school to all be on the same page.”',
    },
    sources: [PROCESS, FAQS, TUITION, TUITION_TERMS, PROFILE, CAREERS, LEADERSHIP],
    verify: [
      'Two wordings of the parent rule: /admissions/process ("at least one parent is a Christ-follower and is actively involved in a local Christian church") and /admissions/faqs ("at least one parent must be a professing Christian with a personal relationship with Jesus Christ and active participation in a Christian church"). The card quotes the process page, as the Admissions card does.',
      'Who is interviewed: the FAQ lists "The interview with the parents and student (grades 6-11)"; the process page has every family meet the Admissions Director. On Ask the School.',
      'The online application, the pastor’s form and the enrollment church membership statement are behind a login and were not read.',
      'The membership-statement sentence is from the 2026-2027 Tuition Payment Terms and Conditions PDF: "To receive this discount, the responsible party must affirm the church membership statement that is part of the online enrollment process."',
      '"Session (the elders)" glosses the church’s governing body for parents; the school’s own sentence is "The Session of Christ Covenant Church appoints the Board of Trustees of Covenant Day School to hold the school in trust".',
    ],
  },

  service: {
    headline:
      'Service grows with age, from campus jobs in lower school to a high school team that builds homes from shipping containers. Mission trips have gone to Spain, Haiti, Belize and South Dakota.',
    entries: [
      { chip: { band: 'JK–5' }, title: 'Lower school service', text: 'On campus, students help with flag and safety patrol and collect recyclables. Projects also include boxes for Operation Christmas Child, visits to a nearby assisted living home and support for the Matthews HELP Center.' },
      { chip: { band: '4' }, title: 'Goodness Gorillas', text: 'Fourth graders “serve at nearly twenty different sites”. It ends their Bible unit on the fruit of the Spirit.' },
      { chip: { band: 'JK–5' }, title: 'Missions Week', text: 'Students “hear from missionaries and learn about cultures from around the world.”', muted: 'It falls in February on the 2026–27 calendar.' },
      { chip: { band: '6–8' }, title: 'Doulos Days', text: 'Twice a year, middle school students spend a day serving local ministries, nonprofits and neighbors, with service days for each grade. The schoolwide Penny Wars contest helps pay for the projects.' },
      { chip: { band: '9–12' }, title: 'ContainIt', text: 'Students turn used shipping containers into homes for teens on Pine Ridge Reservation in South Dakota. “Their vision is to provide housing for more than 30 teens.”' },
      { chip: { band: '9–12' }, title: 'High school service', text: 'Beta Club projects, weekly lunchtime tutoring at local schools, and service with partners such as Matthews Habitat for Humanity, Alexander Children’s Home and Love INC.' },
      { chip: { word: 'all' }, title: 'Mission trips', text: 'Students “have been on school-sponsored mission trips to Spain, Haiti, Belize, and Pine Ridge Reservation in South Dakota.”', muted: 'The school does not list trip years or a 2026–27 trip.' },
    ],
    note: {
      strong: 'No hours published.',
      text: 'The school publishes no service-hour requirement. Its plan follows the Bible’s order of being “Christ’s witnesses to the world beginning in Jerusalem, then to Judea and Samaria, and then to the ends of the earth.”',
    },
    sources: [SERVICE, DISCIPLESHIP, LS, MS, CALENDAR],
    verify: [
      'Doulos Day: "Twice a year, our middle school students head into the surrounding community for Doulos Day, a day of service." (/campus-life/service); "dedicated service days for each middle school grade" on the MS milestone tile, which gives no count. The card prints both, as the Student Clubs card says twice a year.',
      'No service-hour number appears on any page, document or 2026-27 email. Second place: the Student Clubs Service card subhead says "no service-hour requirement exists", a stronger claim than the evidence; see the plan.',
      'Fall 2026 Doulos Day partners and the "Coin Clash" rename of Penny Wars are in emails only; not printed.',
    ],
  },

  staff: {
    headline: 'The people who lead spiritual life at Covenant Day, with the email each one lists in the school directory.',
    people: [
      { name: 'Phil Davis', role: 'Spiritual Formation Director', email: 'pdavis@covenantday.org' },
      { name: 'William Hunter', role: 'HS Chaplain & Bible Teacher', email: 'whunter@covenantday.org' },
      { name: 'Jeff Dennison', role: 'HS Bible Teacher', email: 'jdennison@covenantday.org' },
      { name: 'Jason Haas', role: 'HS Bible Teacher', email: 'jhaas@covenantday.org' },
      { name: 'Donal Walsh', role: 'HS Bible & History Teacher', email: 'dwalsh@covenantday.org' },
      { name: 'Barbara Murray', role: 'MS Bible Teacher', email: 'bmurray@covenantday.org' },
      { name: 'Josh Nguyen', role: 'MS Bible Teacher', email: 'jnguyen@covenantday.org' },
      { name: 'Zach Thompson', role: 'Worship and Choir Teacher', email: 'zthompson@covenantday.org' },
      { name: 'Stephanie Hayes', role: 'Student Culture Director', email: 'shayes@covenantday.org' },
      { name: 'Mark Helmer', role: 'Head of School', email: 'mhelmer@covenantday.org' },
    ],
    note: {
      strong: 'The Head of School’s hope:',
      muted: '“Students being transformed and becoming disciples of Christ, being anchored in their faith so that they know what they believe and why they believe it.”',
    },
    sources: [DIRECTORY, MUSIC, LEADERSHIP, PROFILE],
    verify: [
      'Titles and emails from /about-us/faculty-staff (element 34652), FS.util.insertEmail reversed; re-checked 2026-11-27.',
      'Zach Thompson: "MS/HS Choir Director & Music Teacher" in the directory; the card uses "Worship and Choir Teacher" from /arts/music, as the Arts card does.',
      'The HS Profile: "our spiritual formation director and student culture director serve across all grade levels". That is why the Student Culture Director is listed.',
      'The three principals may give chapel messages ("guest speakers, principals, or teachers"); they are not listed, since no page names a faith role for them.',
    ],
  },

  parents: {
    headline: 'Weekly prayer groups for moms and for dads, and ways for grandparents and boosters to pray for the school.',
    entries: [
      { chip: { word: 'weekly' }, title: 'Moms in Prayer', text: '“Covenant Day School’s Moms in Prayer groups meet weekly during the school year.” Moms pray together for the school community.' },
      { chip: { word: 'weekly' }, title: 'Dads Prayer Gathering', text: '“Every Friday, CDS dads gather at the tennis gazebo for a time of fellowship and prayer.”' },
      { chip: { word: 'yearly' }, title: 'Grandparents Prayer Walk', text: 'The 2026–27 calendar lists a Grandparents Prayer Walk in August.' },
      { chip: { word: 'all' }, title: 'Booster Club prayer partners', text: 'Booster Club members can sign up for a “Prayer partnership”: a coach and an athlete to pray for all year.' },
    ],
    sources: [DISCIPLESHIP, CAMPUS_LIFE, FAQS, CALENDAR, BOOSTER],
    verify: [
      'Moms in Prayer’s day, time and room (Tuesdays, 8:15 a.m., the CLC prayer chapel) and the Weekly Prayer Point are published only in the weekly emails; not printed (user decision 2026-11-27). On Ask the School.',
      'The Booster page reads "Prayer partnership (receive a coach and athlete to pray for throughout the year)". Membership amounts on that page are not copied.',
      'The Grandparents Prayer Walk is a calendar title only; any description is in the Classic Magazine (LEAD).',
      'The Viewbook lists "Bible Study & Prayer Groups" for parents; not printed (unlinked download page), and no details are published.',
    ],
  },

  ask: {
    headline: 'Questions the school’s public pages leave open, to bring to a tour or an interview.',
    questions: [
      'What day and time is chapel for each division, and can parents attend?',
      'Is chapel attendance required?',
      'Must a student share the family’s faith, or answer faith questions, to be admitted?',
      'Do parents sign or affirm the school’s belief summary, or any family agreement?',
      'Who is interviewed at each grade: parents only, or the student too?',
      'Which high school Bible course carries the half unit, and what does a student who joins in 10th–12th grade take?',
      'Which Bible translation do classes use?',
      'Must every middle and high school student go to Windy Gap, and who leads it?',
      'Is the 5th-grade spring trip to Fort Caswell or to Kanuga? The school’s pages name both.',
      'Are any mission trips planned for 2026–27, and for which grades?',
      'Do high school students serve as student chaplains?',
      'When and where does Moms in Prayer meet?',
    ],
    asOf: 'November 27, 2026',
  },
}
