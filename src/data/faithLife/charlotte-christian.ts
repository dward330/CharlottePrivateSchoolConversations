// Charlotte Christian School — Faith & Spiritual Life.
//
// Every fact is from the school's own pages and the documents they link, read
// 2026-11-26 in two passes and re-checked against the live pages the same day.
// The full record, the source URLs and the conflicts between the school's own
// pages are in source-material/faith-spiritual-life/charlotte-christian/
//   Charlotte Christian - Faith and Spiritual Life - Official Site Research.md
//   Charlotte Christian - Faith and Spiritual Life - Second Pass Gap Research.md
//
// Kept out on purpose: every student's name, the personal details the staff
// directory prints, trip prices and exact travel dates, the 2014 bylaws'
// staff-and-board lifestyle statement, and every LEAD (a 2023-24 enrollment
// packet, a 2007 magazine, an old preview-host page, the Viewbook images).
//
// `colors.gold` is a PLACEHOLDER from the design mock. The app records only
// royal blue for this school; the second accent is an open question.

import type { Source } from '../../components/SourceRow.tsx'
import type { FaithLifeProgram } from '../faithLife.ts'

const BASE = 'https://www.charlottechristian.com'
const src = (label: string, path: string): Source => ({
  label: `charlottechristian.com — ${label}`,
  url: path.startsWith('http') ? path : `${BASE}${path}`,
})

const SPIRITUAL = src('Spiritual Life', '/campus-life/spiritual-life')
const BELIEVE = src('What We Believe', '/about/what-we-believe')
const CURRICULUM = src('Curriculum', '/academics/curriculum')
const CALENDAR = src('School Calendar', '/about/school-calendar')
const ARCHIVE = src('Communications Archive', '/email-archive')
const FOCUS = src('Weekly Focus', '/campus-life/weekly-focus')
const FAQS = src('Admissions FAQs', '/admissions/faqs')
const APPLY = src('Apply', '/admissions/apply')
const MUSIC = src('Music', '/fine-arts/music')
const MIDDLE = src('Middle School', '/academics/middle-school')
const UPPER = src('Upper School', '/academics/upper-school')
const DIRECTORY = src('Employee Directory', '/about/employee-directory')
const PARENTS_HUB = src("Knights Parents' Hub", '/campus-life/parents')
const PARENT_ED = src('Parent Engagement', '/campus-life/parent-education')
const HAVERIM = src("Haverim Ladies' Bible Study", '/campus-life/parent-education/moms-bible-study')
const PTF = src('Parent Teacher Fellowship', '/campus-life/parent-teacher-fellowship')
const DIVERSITY = src('Diversity & Belonging', '/about/diversity')
const EMPLOYMENT = src('Careers at Christian', '/about/employment')
const SERVE = src('Knights Serve', '/campus-life/knights-serve')
const RECAP_NOV12 = src('Chapel Recap, Nov. 12, 2026', '/fs/comms-manager/view/b7123a19-6830-4215-8ec9-1c3d95eef5c0')
const RECAP_NOV5 = src('Chapel Recap, Nov. 5, 2026', '/fs/comms-manager/view/d254a5cd-825b-4a96-9401-423cbd7da541')
const RECAP_EASTER = src('All School Easter Chapel recap, April 2, 2026', '/fs/comms-manager/view/dc3f7d01-bb0d-47d6-b1fe-59ea731134b9')
const OCC_EMAIL = src('Operation Christmas Child email, Nov. 9, 2026', '/fs/comms-manager/view/54f42c89-52e3-4e59-a232-a8318319f18b')
const KNIGHTLIGHT = src(
  'KnightLight Worship audition packet, fall 2026 (PDF)',
  'https://resources.finalsite.net/images/v1788272478/charlotte/vqmnmtkuht4qnhjeqjta/LSWorshipTeamAuditionPacketFall26-27.pdf',
)
const US_GUIDE = src('Upper School Course Curriculum Guide 2026-27 (PDF)', '/fs/resource-manager/view/e07cd151-2d20-44e0-a7db-f0b6d50ba314')
const MS_GUIDE = src('Middle School Course Curriculum Guide 2026-27 (PDF)', '/fs/resource-manager/view/e8e85321-72b3-4030-b64e-22dccc17cf1a')
const CONSERVATORY = src('Academic Conservatory Guide (PDF)', '/fs/resource-manager/view/9dc4d494-e8ee-4398-b511-d699e694467d')
const WINDY_GAP = src('Upper School Windy Gap Student Packet 2026–27 (PDF)', '/fs/resource-manager/view/9467687c-c2e2-4c51-b1cd-12dec88315e5')
const CAROLINA_POINT = src(
  '2026 Carolina Point Middle School Student Packet (PDF)',
  'https://resources.finalsite.net/images/v1788288931/charlotte/vskksqgvheid6ktz6yuy/2026CarolinaPointMSStudentPacketdocx.pdf',
)
const QUESTIONNAIRE = src(
  'Grades 5-12 Applicant Questionnaire (PDF)',
  'https://resources.finalsite.net/images/v1631022314/charlotte/imvsx3nmttlzaavwl95x/ApplicantQuestionnaire.pdf',
)
const SENIORS = src('Celebrating Seniors 2026 (PDF)', '/fs/resource-manager/view/b2420638-0712-4f09-bfff-2f08cada929e')
const WINTERIM = src('Winterim 2027 packet (PDF)', '/fs/resource-manager/view/ba353ab7-5279-4db7-bbf6-68f09cc3fc31')
const IMPACT_DAY = src(
  'Knights Headlines: Middle School Kingdom Impact Day',
  '/post-details/~board/knights-headlines/post/choosing-kindness-and-walking-humbly-during-the-middle-school-kingdom-impact-day',
)
const CRAYONS = src(
  'Knights Headlines: the Middle School crayon drive',
  '/post-details/~board/knights-headlines/post/how-a-box-of-crayons-shows-kindness-near-and-far',
)

export const charlotteChristian: FaithLifeProgram = {
  colors: { brand: '#1e40af', gold: '#c9a227' },

  lead: {
    strong:
      'Charlotte Christian calls itself “a Christ-centered, college preparatory school.” It is independent and non-denominational. Every student takes a Bible class each year, from junior kindergarten through grade 12. Each division has a weekly chapel.',
    muted: '“The school is not under the direction, influence or support of any particular church,” it says.',
  },

  stats: [
    {
      value: 'Weekly',
      label: 'chapel in every division',
      note: 'Lower School on Thursdays, Middle School on Tuesdays and Upper School on Wednesdays on the 2026–27 calendar',
    },
    {
      value: '4',
      label: 'Biblical Studies credits to graduate',
      note: 'one Bible class for each year a student is enrolled in the Upper School',
    },
    {
      value: '130',
      label: 'Christian churches, and more',
      note: '“our families are members of more than 130 different Christian churches”',
    },
    {
      value: '12,556',
      label: 'service hours, class of 2026',
      note: 'earned by the class during its Upper School years',
    },
  ],

  chapel: {
    headline:
      'Each division has its own weekly chapel in the school auditorium, and the whole school gathers for four more a year. Parents get a recap of each week’s chapels by email.',
    entries: [
      {
        chip: { band: 'JK–4' },
        title: 'Lower School chapel',
        text: 'Thursdays, 8:15–8:45 AM, Alkire Auditorium. “Weekly chapels led by spiritual life director.”',
        muted:
          'Speakers in fall 2026 include the Lower School counselor and the Lower School principal. One week, teachers and students acted out a story from the book of Daniel.',
      },
      {
        chip: { band: '5–8' },
        title: 'Middle School chapel',
        text: 'Tuesdays, 9:30–10:05 AM, Alkire Auditorium. Chapels run in series with names like “Blessing Burglars.”',
        muted:
          'Speakers in 2026 include the Campus Pastor, the Middle School Spiritual Life Director, Middle School teachers and an Upper School student leader. Guest worship leaders visit.',
      },
      {
        chip: { band: '9–12' },
        title: 'Upper School chapel',
        text: 'Wednesdays, 9:25–10:05 AM, Alkire Auditorium.',
        muted:
          'Recent chapels include a talk by the Upper School principal and “a panel of families from Charlotte Christian” on “what it means to honor God as a family.”',
      },
      {
        chip: { word: 'all' },
        title: 'All-school chapels',
        text: 'Four on the 2026–27 calendar: Back-to-School, Thanksgiving, Easter and National Day of Prayer, held outdoors on the school’s field and in its stadium.',
        muted: 'Seniors also have a Baccalaureate Service in May.',
      },
      {
        chip: { band: '3–4' },
        title: 'KnightLight Worship',
        text: 'The Lower School worship team. “Students in grades 3 and 4 are eligible to audition.” The team rehearses on Wednesdays after school and leads “worship for lower school chapel several times this semester.”',
      },
      {
        chip: { band: '9–12' },
        title: 'uKnight Worship',
        text: 'A student worship team of “vocalists, instrumentalists, and student technicians in grades 9-12 who lead worship in chapels throughout the year.” It is an honors course by audition, worth .5 credit, and it can count toward the fine arts requirement.',
      },
    ],
    note: {
      strong: 'Parents hear what was taught.',
      text: 'The three Spiritual Life Directors send a weekly Chapel Recap email, with a playlist of “the songs we sang in chapel this week.”',
      muted:
        'Every chapel ends with the same benediction, from Micah 6:8. Chapel days and times follow the school’s 2026–27 calendar. Some weeks have no chapel.',
    },
    sources: [SPIRITUAL, CALENDAR, BELIEVE, RECAP_NOV12, RECAP_NOV5, FOCUS, ARCHIVE, KNIGHTLIGHT, MUSIC, CURRICULUM],
    verify: [
      'No page states the chapel weekday as a rule. The pattern is counted from the 2026-27 calendar: LS 35 Thursdays (1 Monday), MS 32 Tuesdays (1 Monday, plus two split March entries), US 27 Wednesdays (2 Thursdays).',
      'The Lower School principal (Dec. 3) and the Middle School teachers (Dec. 1) were listed as upcoming speakers on /campus-life/weekly-focus when read on 2026-11-26.',
      'All-school chapel rooms on the calendar: "Estep Field", "Knights Stadium" (twice) and "Athletic Stadium".',
      'Whether chapel attendance is required is not stated on any public page. It is a NOT STATED row on What It Asks of Families.',
    ],
  },

  classes: {
    headline:
      'Bible is a required class every year from junior kindergarten through grade 12. Here is what each grade studies, and the four credits an Upper School student needs to graduate.',
    intro: {
      text: '“The study of the Bible is a required part of the curriculum beginning in junior kindergarten and continuing through grade 12.”',
      muted:
        '“The English Standard Version of the Bible is used in all classes.” Families buy the Bible; it is on the school supply lists for grades 1–12.',
    },
    groups: [
      {
        name: 'Lower School',
        tally: 'daily Bible lessons',
        rows: [
          { label: 'Junior Kindergarten', band: 'JK', detail: '“Heroes of the Faith, God\'s Love for All, the Truth of God\'s Word”' },
          { label: 'Kindergarten', band: 'K', detail: '“Survey of the Bible”' },
          { label: 'Grade 1', band: '1', detail: '“Creation through the Promised Land”' },
          { label: 'Grade 2', band: '2', detail: '“The Gospels”' },
          { label: 'Grade 3', band: '3', detail: '“Israel”' },
          {
            label: 'Grade 4',
            band: '4',
            detail:
              '“Acts and the Early Church.” Fourth graders also “take an introductory course to Christian apologetics” (learning to explain and defend the faith).',
          },
        ],
      },
      {
        name: 'Middle School',
        tally: 'a Bible class each year, plus daily scripture reading',
        rows: [
          { label: 'Bible 5', band: '5', detail: 'The Prophecy of Christ: “a study of the book of Genesis”' },
          {
            label: 'Bible 6',
            band: '6',
            detail:
              'The Preparation for Christ: “a study of the Old Testament, beginning with Exodus and ending with the 400 Years of Silence.”',
          },
          { label: 'Bible 7', band: '7', detail: 'The Plan of Christ: “an overview of the New Testament.”' },
          {
            label: 'Bible 8',
            band: '8',
            detail: 'The Person of Christ: the life and teaching of Jesus “as uniquely presented through the Gospel of John.”',
          },
        ],
      },
      {
        name: 'Upper School',
        tally: '4 Biblical Studies credits to graduate',
        rows: [
          { label: 'Old Testament Survey', band: '9', credit: '1', detail: 'Freshman requirement.' },
          { label: 'New Testament Survey', band: '10', credit: '1', detail: 'Sophomore requirement.' },
          {
            label: 'Christian Theology',
            band: '11',
            credit: '.5',
            detail: 'Junior requirement. “Students will learn about church history from the NT period through the Reformation.”',
          },
          {
            label: 'World Religions',
            band: '11',
            credit: '.5',
            detail:
              'Junior requirement. The course is “a critical examination of ancient religions, Eastern Religions (including Hinduism and Buddhism), Judaism and Islam.”',
          },
          {
            label: 'Apologetics and Cultural Engagement',
            band: '12',
            credit: '1',
            detail:
              'Senior requirement. The first semester covers apologetics. The second covers “biblical and theological foundations for cultural engagement.”',
          },
        ],
      },
    ],
    note: {
      strong: 'A student who joins late still takes Bible.',
      text: '“Students must complete a Bible class each year they are enrolled at Charlotte Christian School. If a student is admitted as a senior, they will be required to complete both junior and senior Bible classes.”',
      muted:
        'Students can also graduate with distinction in Bible, Religion and Philosophy. Its requirements include a 3.89 Bible GPA, active participation in a local church and an interview with the Bible department.',
    },
    sources: [BELIEVE, CURRICULUM, MS_GUIDE, US_GUIDE, CONSERVATORY, PARENTS_HUB],
    verify: [
      'No Bible curriculum publisher and no Scripture memory program is named on any public page. Both are on the Ask the School card.',
      'The 2026-27 profile names the distinction "Bible, Philosophy & Religion"; the curriculum page and the conservatory guide say "Bible, Religion and Philosophy".',
      'Graduation total: "Total Unit Requirements - 26" (curriculum page, US guide) against "27 Total Credits" (2026-27 profile). Both say 4 units of Biblical Studies. The card prints no total.',
      'Supply lists: "1 ESV Bible" on the grades 1–4 and upper school lists, "(1) ESV Bible" on the grades 5-8 list.',
    ],
  },

  retreats: {
    headline:
      'Every division has a fall event set aside for faith and friendship. Grades 5–12 go away to the North Carolina mountains, and the cost is part of tuition.',
    cells: [
      {
        title: 'Lower School: Camp S.L.A.M.',
        text: '“All lower school students will participate in a full day of Camp S.L.A.M. (Spiritual Life and Meaning) activities.” The day holds team games, “praise, worship, and study.” The speaker in fall 2026 was the Lower School Spiritual Life Director. Grade 4 has its own leadership and team-building day.',
      },
      {
        title: 'Middle School: Carolina Point',
        text: '“As a vital part of the middle school experience, all students participate in the annual Carolina Point retreat,” at a Young Life retreat center “outside Brevard, N.C.” The fall 2026 theme was “The Rejoice Choice.” Each session has games, worship music and a speaker, with cabin devotions at night.',
      },
      {
        title: 'Upper School: Windy Gap',
        text: 'The school says “all students are asked to participate in the annual Windy Gap retreat,” at a Young Life retreat center “outside Asheville, N.C.” The fall 2026 theme was “Transformed by Christ.” Four worship sessions are each followed by “Cabin Time, Reflection, and Sharing.” Seniors go a day early.',
      },
    ],
    note: {
      strong: 'Included in tuition:',
      text: '“Carolina Point and Windy Gap Retreats (the middle and upper school spiritual life two-day retreat) and field trips.”',
      muted: '“These retreats are only possible with the support of parent volunteers.”',
    },
    sources: [SPIRITUAL, ARCHIVE, CAROLINA_POINT, WINDY_GAP, FAQS, CALENDAR],
    verify: [
      'The school words the lower school event three ways: "S.L.A.M. … days in the fall", "Spiritual Life and Meaning Week" and "a full day of Camp S.L.A.M."',
      'Length: "two days and nights" and "two-day retreat" against three consecutive calendar days in September 2026; seniors leave a day before grades 9-11.',
      'The spiritual life page does not say which retreat belongs to which division. The calendar and the two packets do.',
    ],
  },

  groups: {
    headline:
      'Where students talk about faith in smaller groups: before-school groups, lunch devotions, advisory, and student leaders.',
    entries: [
      {
        chip: { band: '5–8' },
        title: 'DIG groups (Discipleship In Groups)',
        text: 'Groups “meet before school on Wednesday mornings from 7:10-7:35 a.m.” for part of each semester. “These groups will be led by upper school student volunteers with assistance from middle school faculty members.”',
      },
      {
        chip: { band: '5–8' },
        title: 'Lunch and devotions',
        text: 'The Middle School Spiritual Life Director leads a weekly lunch discussion for grade 8 boys. Other groups include “Dodgeball & Devotions” for grades 5–7 boys and a girls’ devotions group.',
      },
      {
        chip: { band: '5–8' },
        title: 'Kingdoms and advisory',
        text: '“Six kingdoms, one king.” Each Middle School student joins one of six groups “that meet routinely throughout the year.” Advisory groups hold Bible studies, and eighth graders can serve on a Kingdom Council for “spiritual and student life.”',
      },
      {
        chip: { band: '9–12' },
        title: 'Upper School Bible studies',
        text: 'Parents and teachers can lead “a Bible study for upper school students” through the Upper School Spiritual Life Director.',
        muted: 'The school’s pages do not say when these groups meet.',
      },
      {
        chip: { band: '9–12' },
        title: 'Student leaders',
        text: 'A Spiritual Life Prefect is one of nine senior student leaders. Prefects speak and pray in chapel, and Upper School volunteers lead the Middle School DIG groups.',
      },
      {
        chip: { band: '5–12' },
        title: 'Spiritual Life Conference',
        text: 'On conference days, “special speakers are invited to campus for a time of focused teaching and discussion.”',
      },
    ],
    sources: [ARCHIVE, MIDDLE, MS_GUIDE, UPPER, SPIRITUAL, RECAP_NOV12],
    verify: [
      'The 2026-27 calendar has no entry named Spiritual Life Conference Day. A Focus item confirms an upper school "spiritual life conference" with no date, speaker or format.',
      'The Spiritual Life Prefect\'s duties are not published. The card states only what the recaps show prefects doing.',
      'The clubs list names "Athletes in Action" with no description, so it is not on the card.',
    ],
  },

  beliefs: {
    headline:
      'The school’s mission, its five core values and its ten-point statement of faith, in the school’s own words.',
    mission:
      '“Charlotte Christian School is a Christ-centered, college preparatory school, equipping and developing students to effectively integrate Biblical truth and learning into their daily lives and to impact the culture for Christ.”',
    values: [
      { name: 'Love God', verse: 'Matthew 22:37' },
      { name: 'Show Kindness', verse: 'Matthew 22:39-40' },
      { name: 'Walk Humbly', verse: 'James 4:10' },
      { name: 'Pursue Excellence', verse: 'Colossians 3:23' },
      { name: 'Seek Truth', verse: 'John 18:37' },
    ],
    note: {
      strong: 'No one church runs the school.',
      text: '“The members of the board of trustees, the faculty and the student body represent various denominations and practices. The school is not under the direction, influence or support of any particular church.”',
      muted: 'The 2026–27 theme verse is Philippians 4:4-7.',
    },
    articles: [
      '“We believe that God is one being – infinitely just, wise, good, loving and holy, and existing eternally in three persons: Father, Son and Holy Spirit. He is the sovereign Creator of the universe and by His providence sustains and rules all that He has made.”',
      '“We believe that Jesus Christ, Son of God, is fully divine and fully human, and that He saves His people from their sin by His life, death, and resurrection, and is now ruling over His Church and the world through His Word and Spirit.”',
      '“We believe that the Holy Spirit regenerates sinners, resides in believers and enables them to live a Godly life and to use the spiritual gifts He has given them.”',
      '“We believe that the Scriptures of the Old and New Testaments are the inspired, infallible and inerrant Word of God, our final authority in matters of doctrine and practice.”',
      '“We believe that sinners are justified by grace through faith on the basis of the finished work of Christ (His death and resurrection) and live this life by the power of God.”',
      '“We believe that God is calling people from the whole human race to believe in His Son, Jesus Christ, and to become members of His Body, the Church. Those who believe in Jesus as Lord and Savior enjoy the blessings of God and fellowship with each other in communities of faith until Jesus returns.”',
      '“We believe that man, male and female, was created in the image of God, but fell into sin through the disobedience of Adam and Eve. As a result of the fall, all people are born sinful and in need of salvation.”',
      '“We believe that marriage is a covenantal relationship created by God for a man and a woman. Sexual intimacy is a gift from God and has its proper place only within the context of marriage.”',
      '“We believe that Jesus Christ, the Son of God, will return to renew the whole creation and to judge the living and the dead.”',
      '“We believe Christian education is a partnership between students, faculty and parents that provides an opportunity for students to learn and experience academics and co-curricular activities through a biblical worldview, in the presence of Christ-honoring faculty.”',
    ],
    sources: [BELIEVE, CAROLINA_POINT],
    verify: [
      'The 2014 bylaws linked from /about/leadership carry a different seven-point doctrinal statement and a staff-and-board lifestyle statement. By the plan\'s decision they stay in the research file only.',
      'The Appearance Code lists the five core values in a different order. Same five values.',
      'No public page gives a position on the sanctity of life, or says when the statement of faith was adopted.',
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
            label: 'Student faith questions',
            status: 'published',
            detail:
              'Applicants to grades 5–12 fill in a questionnaire by hand. It asks about “Spiritual and/or church related activities” and says: “Describe your relationship with Jesus Christ.”',
          },
          {
            label: 'Family interview',
            status: 'published',
            detail:
              'Each family meets “a member of our leadership team” to “share goals for the next step in your student’s educational journey.”',
          },
          {
            label: 'A parent’s own faith',
            status: 'notStated',
            detail: 'The public pages do not say whether a parent must be a Christian or attend a church.',
          },
          {
            label: 'Pastor reference',
            status: 'notStated',
            detail: 'None is listed in the published application steps or checklists.',
          },
          {
            label: 'Signing the statement of faith',
            status: 'notStated',
            detail: 'Not listed in the published application steps.',
          },
        ],
      },
      {
        name: 'Once enrolled',
        rows: [
          {
            label: 'Family Agreement Form',
            status: 'published',
            detail:
              '“Both parents and students need to read and digitally sign the online Back-to-School Form including the Family Agreement Form.” The form itself is not on the public site.',
          },
          {
            label: 'Bible class',
            status: 'published',
            detail: 'Required every year, junior kindergarten through grade 12.',
          },
          {
            label: 'Retreats',
            status: 'published',
            detail:
              'In the Middle School, “all students participate.” In the Upper School, “all students are asked to participate.”',
          },
          {
            label: 'Student conduct',
            status: 'published',
            detail:
              'The grades 5–12 questionnaire ends: “I understand I need to abide by these policies and honor Christ at all times.” The school’s Honor Code applies around the clock, all year.',
          },
          {
            label: 'Partnership with parents',
            status: 'published',
            detail:
              'The statement of faith calls Christian education “a partnership between students, faculty and parents.”',
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
      text: '“All individuals applying for employment must be willing to serve Christ in the daily performance of their duties and to fully support our statement of faith.”',
      muted:
        'The school keeps its Family Handbook, its Honor Code and its online application behind a family login, not on its public site.',
    },
    sources: [APPLY, QUESTIONNAIRE, FOCUS, BELIEVE, CAROLINA_POINT, WINDY_GAP, EMPLOYMENT, PARENTS_HUB],
    verify: [
      'The Family Handbook, "school statements", the Family Agreement Form and the Honor Code text are inside myCCS and could not be read. The online application (myschoolapp.com) needs a login, so any faith question in the parent application is unseen.',
      'LEAD only, not used: a 2023-24 enrollment packet says the contract "includes … the Charlotte Christian School mission statement and statement of faith" to review "before signing".',
      'The Honor Code line rests on the Windy Gap packet: "the School Honor Code and corresponding 24-hour, 365-day policy".',
    ],
  },

  service: {
    headline:
      'The school treats service as part of faith. Students serve local nonprofits all year, and Upper School students can join mission trips during Winterim.',
    entries: [
      {
        chip: { word: 'all' },
        title: 'All-school serve day',
        text: 'In spring 2026 the school “packed 79,056 meals” with Servants with a Heart.',
      },
      {
        chip: { word: 'all' },
        title: 'Operation Christmas Child',
        text: 'The fall 2026 goal was “to pack 1,850 shoeboxes” in time for the Thanksgiving chapel. Other named partners are The Odd Sock, Bright Blessings, Roof Above and the Harvest Center.',
      },
      {
        chip: { band: '5–8' },
        title: 'Kingdom Impact Day',
        text: '“Six local nonprofit organizations shared about their missions” with Middle School students in spring 2026. A separate Middle School crayon drive collected “98,484 crayons.”',
      },
      {
        chip: { band: '9–12' },
        title: 'Winterim mission trips',
        text: '“The upper school offers various local, regional, and international mission trip opportunities throughout the year, including during Winterim.” The 2027 list includes a Serve Charlotte week and trips with SCORE International, Rancho El Camino and Samaritan’s Feet.',
      },
    ],
    note: {
      strong: 'Service hours start in sixth grade.',
      text: '“Beginning in sixth grade, students are encouraged to earn service hours each year.”',
      muted: 'The school’s pages do not give a number of hours per grade.',
    },
    sources: [SPIRITUAL, SERVE, RECAP_EASTER, OCC_EMAIL, IMPACT_DAY, CRAYONS, WINTERIM, SENIORS],
    verify: [
      'The school\'s pages disagree: "students are encouraged to earn service hours each year" (/campus-life/spiritual-life) against "school required service hours" (Academic Conservatory Guide). The card prints the first; the Ask the School card carries the question.',
      'LEAD only, not used: a fall 2007 magazine lists minimum hours by grade.',
      'No final Operation Christmas Child count for fall 2026 is published; the Thanksgiving recap says only that the school exceeded last year\'s goal. An undated older post says "over 1600 boxes".',
      'The crayon post is undated. Kingdom Impact Day is dated to spring 2026 by the school\'s linked summary.',
    ],
  },

  staff: {
    headline:
      'Each division has its own spiritual life director. The school also lists a campus pastor, a service coordinator and a worship coordinator.',
    people: [
      {
        name: 'Christina Sachtleben',
        role: 'Lower School Spiritual Life Director',
        email: 'christina.sachtleben@charchrist.com',
      },
      {
        name: 'Rian Berger',
        role: 'Middle School Spiritual Life Director, Middle School Bible Teacher',
        email: 'rian.berger@charchrist.com',
      },
      { name: 'Jeff Bennett', role: 'Upper School Spiritual Life Director', email: 'jeff.bennett@charchrist.com' },
      { name: 'Jimmy Kallam', role: 'Campus Pastor', email: 'jimmy.kallam@charchrist.com' },
      {
        name: 'Chad Fair',
        role: 'Upper School Broadcasting and Film Teacher, Service Coordinator',
        email: 'chad.fair@charchrist.com',
      },
      { name: 'Skylar Giller', role: 'Fine Arts & Worship Coordinator', email: 'skylar.giller@charchrist.com' },
      { name: 'Rhett Davis', role: 'Upper School Bible Teacher, Bible Department Head' },
    ],
    note: {
      strong: 'Start with your child’s division director.',
      muted: 'Five more Bible teachers are listed in the school directory.',
    },
    sources: [DIRECTORY, PARENTS_HUB],
    verify: [
      'Emails are from the directory pop-ups (/fs/elements/13020?const_id=<id>&show_profile=true): 6505, 34277, 38117, 20922, 6433, 27823. The Bible Department Head\'s pop-up (6414) prints no email.',
      'On /campus-life/parents the Middle School director\'s name carries a second mailto link to a different employee. The directory pop-up and every Chapel Recap signature print rian.berger@charchrist.com.',
      'Five more Bible teachers, counted from the directory: three Upper School and two Middle School, not counting the two on this card. The design mock said six.',
      'The directory pop-ups also print personal details (a personal email address, staff members\' children). None is carried.',
      'No bios are published for the spiritual life staff.',
    ],
  },

  parents: {
    headline: 'Bible studies, prayer groups and weekly emails the school runs for parents and grandparents.',
    entries: [
      {
        chip: { word: 'weekly' },
        title: 'Emails home',
        text: 'A Chapel Recap from the Spiritual Life Directors, and a Monday note from the head of school “with a short devotional thought and a few school-wide prayer requests.”',
      },
      {
        chip: { word: 'weekly' },
        title: 'Haverim Ladies’ Bible Study',
        text: '“Wednesday from 12:15-2:15 p.m. OR Tuesday via Zoom from 7:30-8:30 p.m.” Open to “moms, grandmothers, alumni moms, and staff.” The 2026–27 study is the book of Romans.',
      },
      {
        chip: { word: 'weekly' },
        title: 'Parents in Prayer',
        text: 'Thursdays, 8:00–9:30 AM on campus, with a virtual session about once a month. “Prayer parents pray for the boys or girls in their child’s grade level on a regular basis.”',
      },
      {
        chip: { word: 'monthly' },
        title: 'Men’s Power Hour',
        text: '“For CCS Men,” a monthly morning meeting off campus.',
      },
      {
        chip: { word: 'monthly' },
        title: 'Books and Fellowship',
        text: '“For CCS Ladies,” monthly from 8-9:15 a.m. in a private home.',
      },
      {
        chip: { word: 'monthly' },
        title: 'Romans 12 Gatherings',
        text: 'Open to the whole school community, to talk about “diversity, belonging, and Jesus’ command to live in unity and reconciliation with one another.”',
      },
      {
        chip: { word: 'yearly' },
        title: 'Knight to Knight',
        text: 'Families of Lower and Middle School students are paired with the senior class to “encourage, pray for and bless” the seniors in their last year.',
      },
    ],
    note: {
      strong: 'Every parent belongs to the Parent Teacher Fellowship.',
      text: 'One of its jobs is “critical prayer support for all aspects of the school community.”',
    },
    sources: [PARENT_ED, HAVERIM, CALENDAR, ARCHIVE, DIVERSITY, PTF],
    verify: [
      'Men\'s Power Hour: "Monthly from 7:30-9 a.m." on the parent page against calendar entries "7:30 AM – 8:30 AM". The card gives no end time.',
      'The Haverim page heading and its 2026-27 materials are Romans, but its body text still says "This year\'s study will explore the book of Acts" (the 2025-26 study).',
      'Parents in Prayer day and time are from calendar entries ("Hendrick Conference Room").',
    ],
  },

  ask: {
    headline:
      'Ten questions to take on the tour. Each covers something the school’s public pages leave unanswered or say two ways.',
    questions: [
      'Does a parent need to be a Christian, or belong to a church, for a child to be admitted?',
      'What does the Family Agreement Form ask parents and students to agree to? May we read it before we apply?',
      'What are you looking for in a student’s answer to “Describe your relationship with Jesus Christ”?',
      'Is chapel required for every student?',
      'How many service hours does each grade need? One page says hours are “encouraged” and another mentions “school required service hours.”',
      'When do Upper School Bible studies meet, who leads them, and how does a student join one?',
      'Which Bible curriculum do the Lower and Middle Schools use? Is there Scripture memory?',
      'What does the Campus Pastor do, and can families meet with him?',
      'How does a student who is new to the Christian faith, or from another faith, fit in here?',
      'May we read the Honor Code and the Family Handbook before we enroll?',
    ],
    asOf: 'November 26, 2026',
  },
}
