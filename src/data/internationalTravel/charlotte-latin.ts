// Charlotte Latin School — International Travel (displayed "Global Exposure").
//
// Built from the user's Claude deep-research PDF (transcribed alongside this
// record) and then VERIFIED fact by fact against Latin's two official sites on
// 2026-10-13: charlottelatin.org, and the school-run Global Studies Google Site
// (sites.google.com/charlottelatin.org/globalstudies), which carries every trip
// page, the application, the FAQs and the sign-up calendar. A Wayback copy
// stands in where a page has moved on. The PDF is a lead sheet only; the
// fact → URL record, including the implement-time checks and every spelling
// conflict, is
// source-material/international-travel/charlotte-latin/
//   Charlotte Latin - International Travel - Source URLs.md
//
// Rules this file follows (see ./README.md): every card's `sources` lists the
// specific pages behind its facts; gaps appear only in `verdict.ask`; no
// student, parent or trip leader is named; no trip price and no exact travel
// date is rendered (season and year only — application deadlines and parent
// meetings may render). Latin publishes no global credential, so the
// `credential` card is omitted. Its `network` card is retitled "School Year
// Abroad & the Wider Network" through TITLE_OVERRIDES (user, 2026-10-13).

import type { InternationalTravelProgram } from '../internationalTravel.ts'

const CL = 'https://www.charlottelatin.org'
const GS = 'https://sites.google.com/charlottelatin.org/globalstudies'
const NEWS = `${CL}/about/school-news/news-details/~board/news/post`
const KUDOS = `${CL}/about/school-news/news-details/~board/kudos/post`

const GE = `${CL}/about/community-belonging-global-education/global-education`
const MS = `${CL}/academics/middle-school`
const LS = `${CL}/academics/lower-school`
const US = `${CL}/academics/upper-school`
const CO = `${CL}/academics/upper-school/course-offerings`
const AG = `${CL}/support/alumni/alumni-giving`
const G_HOME = GS
const G_PROG = `${GS}/travel-exchange/programs`
const G_ARG = `${G_PROG}/argentina-sister-school-cultural-exchange`
const G_FRA = `${G_PROG}/france-sister-school-cultural-exchange`
const G_ITA = `${G_PROG}/northern-italy-sister-school-cultural-exchange`
const G_SAL = `${G_PROG}/south-africa-cultural-comparative-leadership`
const G_SAX = `${G_PROG}/south-africa-sister-school-exchange`
const G_ESP = `${G_PROG}/spain-language-immersion-and-culture-in-cadiz`
const G_ENG = `${G_PROG}/middle-school-england-isca`
const G_QUE = `${G_PROG}/middle-school-quebec`
const G_EXT = `${G_PROG}/external-study-programs`
const G_APP = `${GS}/travel-exchange/application`
const G_FAQ = `${GS}/travel-exchange/faqs`
const G_DATES = `${GS}/travel-exchange/important-dates`
const G_SIS = `${GS}/sister-schools`
const G_SIS27 = `${GS}/sister-schools/2026-2027`
const G_HOST = `${GS}/sister-schools/host-family-faqs`
const BLOG_ARG23 = 'https://sites.google.com/charlottelatin.org/clsargentina2023/home'
const BLOG_SA26 = 'https://sites.google.com/charlottelatin.org/26clstosouthafrica/home'
const N_GLOBAL = `${NEWS}/charlotte-latin-goes-global`
const N_GEBG = `${NEWS}/global-studies-and-dei-connect-at-conference`
const N_SUNNY = `${NEWS}/sunnys-day-lights-up-the-latin-campus`
const N_MSMUN = `${KUDOS}/middle-school-students-shine-at-model-un-conference`
const N_MSMUN23 = `${NEWS}/2023-ms-mun`
const N_HMUN = `${CL}/cf_news/view.cfm?newsid=887`
const N_DIW25 = `${NEWS}/charlotte-latin-celebrates-diwali`
const N_DIW23 = `${NEWS}/diwali-more-than-just-a-day-off`
const N_LNY26 = `${NEWS}/charlotte-latin-celebrates-lunar-new-year`
const N_LNY25 = `${NEWS}/lunar-new-year-assembly-honors-cultural-traditions`
// The 2025–26 application page, before the 2026–27 cycle replaced it.
const WB_GAPP_2510 =
  'https://web.archive.org/web/20251021124352/https://sites.google.com/charlottelatin.org/globalstudies/travel-exchange/application'

export const charlotteLatin: InternationalTravelProgram = {
  lead: {
    strong:
      'Global Studies travel is open to as young as 6th grade and is built around seven sister schools on four continents, with homestays both ways in Argentina, France, Italy and South Africa.',
    muted:
      'In 2026–27 there are eight summer programs, from a credit-bearing leadership course in South Africa to two weeks in England with the Independent Schools Cultural Alliance.',
  },

  stats: [
    {
      value: '7',
      label: 'sister schools',
      note: 'in Germany, France, Argentina, Italy, China and South Africa',
    },
    {
      value: '1989',
      label: 'first sister school',
      note: 'Jugenddorf Christophorusschule, Bad Zwesten, Germany',
    },
    {
      value: '8',
      label: 'travel programs',
      note: 'in 2026–27, for students in grades 6–11',
    },
    {
      value: '5',
      label: 'visiting sister-school groups',
      note: 'hosted by Latin families in 2026–27',
    },
  ],

  /* ----------------------------------------------------- where they go -- */
  trips: {
    headline:
      'Twenty-two trips across four school years — 2022–23, 2024–25, 2025–26 and 2026–27 — from sister-school homestays in Buenos Aires, Bordeaux and Guastalla to a leadership course for credit in South Africa. Filter by division.',
    intro: {
      strong:
        'Every 2026–27 program runs in the summer and is open to students in grades 6–11, through one application with a faculty or staff reference — and, for Upper School, an interview.',
      muted:
        "Latin's sister schools host most Upper School trips, and students who travel on a sister-school exchange are strongly encouraged to host a visiting student in return.",
    },
    years: [
      {
        year: '2026–27',
        note: 'all eight programs in summer 2027',
        trips: [
          {
            dest: 'Argentina',
            place: 'Buenos Aires — Colegio Carmen Arriola de Marin',
            div: 'US',
            group: 'rising 10th–12th graders · up to 12 students',
            theme: 'Sister-school exchange · language and culture · classes alongside host siblings',
            timing: 'Summer 2027',
            homestay: 'Buenos Aires',
          },
          {
            dest: 'France',
            place: 'Bordeaux — Sainte Marie Grand LeBrun, then three days in Paris',
            div: 'US',
            group: 'rising 10th–12th graders · up to 12 students',
            theme: 'Sister-school exchange · language and culture · day trips to Arcachon and Saint-Émilion',
            timing: 'Summer 2027',
            homestay: 'Bordeaux',
          },
          {
            dest: 'Italy',
            place: 'Milan, Guastalla — Istituto Bertrand Russell, then Venice',
            div: 'US',
            group: 'rising 10th–12th graders · up to 12 students',
            theme: 'Sister-school exchange · cultural immersion · a week with host families',
            timing: 'Summer 2027',
            homestay: 'Guastalla',
          },
          {
            dest: 'South Africa',
            place: 'Cape Town, Durban + Pietermaritzburg',
            div: 'US',
            group: 'rising 10th–12th graders · up to 12 students',
            theme:
              "Cultural and Comparative Leadership, a credit-bearing Upper School leadership elective graded on the transcript · workshops at Hilton College and St. Anne's",
            timing: 'Summer 2027',
          },
          {
            dest: 'South Africa',
            place: "Pietermaritzburg — St. Anne's Diocesan College and Hilton College",
            div: 'US',
            group: 'two girls and two boys, rising juniors and seniors',
            theme:
              'Long-term sister-school exchange of four to six weeks · girls stay with host families; boys board at Hilton College',
            timing: 'Summer 2027',
            homestay: 'Pietermaritzburg',
          },
          {
            dest: 'Spain',
            place: 'Cádiz',
            div: 'US',
            group: 'rising 10th–12th graders · up to 12 students',
            theme:
              "Two weeks of language immersion run by Centro Mundolengua · Spanish III and/or a Spanish teacher's recommendation required",
            timing: 'Summer 2027',
            homestay: 'Cádiz',
          },
          {
            dest: 'England',
            place: 'Southern England, with the Independent Schools Cultural Alliance',
            div: 'MS',
            group: 'rising 7th–9th graders · up to 12 students',
            theme: 'Two weeks alongside students from schools around the world · Oxford, Stonehenge and Stratford-upon-Avon',
            timing: 'Summer 2027',
          },
          {
            dest: 'Canada',
            place: 'Montreal + Québec City',
            div: 'MS',
            group: 'rising 7th–9th graders · up to 20 students',
            theme: 'Five days of language and cultural immersion · no French classes required · offered every other year',
            timing: 'Summer 2027',
          },
        ],
      },
      {
        year: '2025–26',
        note: 'Upper School programs as offered in fall 2025',
        trips: [
          {
            dest: 'Germany',
            div: 'US',
            theme: 'Sister-school exchange · innovation and design',
          },
          {
            dest: 'Argentina',
            div: 'US',
            theme: 'Sister-school exchange',
          },
          {
            dest: 'New Mexico',
            div: 'US',
            theme: 'Arts immersion',
          },
          {
            dest: 'Belgium & the Netherlands',
            div: 'US',
            theme: 'Peace, justice and memory',
          },
          {
            dest: 'South Africa',
            place: 'Cape Town + around Durban',
            div: 'US',
            theme: 'Cultural and Comparative Leadership · a two-and-a-half-week course',
            timing: 'Summer 2026',
          },
        ],
      },
      {
        year: '2024–25',
        note: 'summer 2025',
        trips: [
          {
            dest: 'Argentina',
            div: 'US',
            theme: 'Sister-school exchange',
            timing: 'Summer 2025',
          },
          {
            dest: 'Canada',
            place: 'Québec',
            div: 'MS',
            group: '22 students',
            theme: 'Five days of French immersion · new that year',
            timing: 'Summer 2025',
          },
          {
            dest: 'England',
            div: 'MS',
            theme: 'With the Independent Schools Cultural Alliance',
            timing: 'Summer 2025',
          },
          {
            dest: 'France',
            place: 'Bordeaux',
            div: 'US',
            theme: 'Sister-school exchange · planned by the school without a tour organizer',
            timing: 'Summer 2025',
            homestay: 'Bordeaux',
          },
          {
            dest: 'Italy',
            div: 'US',
            theme: 'Sister-school exchange · planned by the school without a tour organizer',
            timing: 'Summer 2025',
          },
          {
            dest: 'South Africa',
            div: 'US',
            group: '12 students',
            theme:
              'A leadership course of over two weeks, the first Latin trip for academic credit · reading Gandhi and volunteering at a primary school',
            timing: 'Summer 2025',
          },
          {
            dest: 'Spain',
            div: 'US',
            theme: 'Language immersion',
            timing: 'Summer 2025',
          },
        ],
      },
      {
        year: '2022–23',
        note: 'summer 2023',
        trips: [
          {
            dest: 'Argentina',
            place: 'Buenos Aires — Colegio Carmen Arriola de Marin',
            div: 'US',
            theme: 'Sister-school exchange · classes at the sister school, day trips around Buenos Aires and the Tigre delta',
            timing: 'Summer 2023',
            homestay: 'Buenos Aires',
          },
          {
            dest: 'England',
            place: 'Southern England, with the Independent Schools Cultural Alliance',
            div: 'MS',
            theme: 'Two weeks · Parliament, Oxford, Bath, Stonehenge and Stratford-upon-Avon',
            timing: 'Summer 2023',
          },
        ],
      },
    ],
    photo: {
      src: '/travel/charlotte-latin-south-africa-2025.jpg',
      alt: 'Charlotte Latin Upper School students at the Cape of Good Hope, South Africa',
      caption: {
        title: 'South Africa, 2025',
        text: 'The leadership course at the Cape of Good Hope — the first Latin trip for academic credit.',
      },
      credit: 'Photo: Charlotte Latin School',
    },
    alsoOnRecord: [
      {
        lead: 'Costa Rica and Yellowstone.',
        text: 'The Global Education page also lists Middle School programs in Costa Rica (leadership and sustainability) and Yellowstone and Grand Teton (leadership and the environment), with no year attached.',
      },
      {
        lead: 'Class trips.',
        text: 'Separate from Global Studies travel, Middle School grade-level class trips go to Atlanta, Québec and Washington, D.C., beginning in 6th grade.',
      },
    ],
    sources: [
      { label: 'Global Studies site — Programs', url: G_PROG },
      { label: 'Global Studies site — Argentina', url: G_ARG },
      { label: 'Global Studies site — France', url: G_FRA },
      { label: 'Global Studies site — Northern Italy', url: G_ITA },
      { label: 'Global Studies site — South Africa: Leadership', url: G_SAL },
      { label: 'Global Studies site — South Africa: Exchange', url: G_SAX },
      { label: 'Global Studies site — Spain', url: G_ESP },
      { label: 'Global Studies site — England (ISCA)', url: G_ENG },
      { label: 'Global Studies site — Québec', url: G_QUE },
      { label: 'Global Studies site — FAQs', url: G_FAQ },
      { label: 'Global Studies application (Wayback, Oct 2025)', url: WB_GAPP_2510 },
      { label: 'Global Studies site — South Africa trip blog, 2026', url: BLOG_SA26 },
      { label: 'Global Studies site — Argentina trip blog, 2023', url: BLOG_ARG23 },
      { label: 'charlottelatin.org — Charlotte Latin Goes Global', url: N_GLOBAL },
      { label: 'charlottelatin.org — Global Education', url: GE },
      { label: 'charlottelatin.org — Middle School', url: MS },
    ],
  },

  /* -------------------------------------------- exchanges & homestays -- */
  exchanges: {
    headline:
      'Seven sister schools since 1989 — five of them visiting Charlotte in 2026–27 — with homestays both ways in Argentina, France, Italy and South Africa.',
    intro: {
      strong:
        'Latin welcomes sister-school groups for two- or six-week exchanges: the visitors stay with Latin families and attend classes with their host siblings, and Latin returns the visit with summer programs.',
      muted: "The school's sister-school exchange relationships date back more than 30 years.",
    },
    partners: [
      {
        country: 'Germany',
        years: '1989–2026',
        school: 'Jugenddorf Christophorusschule, Bad Zwesten',
      },
      {
        country: 'France',
        years: '1996–2027',
        school: 'Sainte Marie Grand LeBrun, Bordeaux',
        out: 'Upper School students, in summer 2027',
        in: 'Bordeaux students visit in the spring',
      },
      {
        country: 'Argentina',
        years: '1998–2027',
        school: 'Colegio Carmen Arriola de Marin, Buenos Aires',
        out: 'Upper School students, in summer 2027',
        in: '12 Marín students visit in winter',
      },
      {
        country: 'Italy',
        years: '2002–2027',
        school: 'Istituto Bertrand Russell, Guastalla',
        out: 'Upper School students, for a week of homestay in summer 2027',
        in: '12 Russell students visit in the fall',
      },
      {
        country: 'China',
        years: '2006',
        school: 'Luzhou Laojiao Tianfu Middle School, Luzhou City',
      },
      {
        country: 'South Africa',
        years: '2008–2027',
        school: 'Hilton College, Hilton',
        out: 'two boys, boarding for four to six weeks in summer 2027',
        in: 'two Hilton students visit for six weeks in late fall',
      },
      {
        country: 'South Africa',
        years: '2008–2027',
        school: "St. Anne's Diocesan College, Hilton",
        out: 'two girls, with host families for four to six weeks in summer 2027',
        in: "two St. Anne's students visit for six weeks in the fall",
      },
    ],
    photo: {
      src: '/travel/charlotte-latin-argentina-exchange.jpg',
      alt: 'Charlotte Latin students on a wooden lookout in Argentina',
      caption: {
        title: 'Argentina',
        text: 'Latin students in Argentina, where the sister-school exchange dates to 1998.',
      },
      credit: 'Photo: Charlotte Latin School',
    },
    homestays: [
      {
        place: 'Buenos Aires, Argentina',
        text: 'Upper School students live with host families from Colegio Carmen Arriola de Marin, a bilingual sister school, and attend classes with their host siblings.',
      },
      {
        place: 'Bordeaux, France',
        text: 'Upper School students stay with host families from Sainte Marie Grand LeBrun, with day trips to Arcachon and Saint-Émilion.',
      },
      {
        place: 'Guastalla, Italy',
        text: 'After Milan, Upper School students spend a week with host families from Istituto Bertrand Russell, before a second week in Venice.',
      },
      {
        place: 'Pietermaritzburg, South Africa',
        text: "On the long-term exchange, two girls live with St. Anne's host families for four to six weeks; the two boys board on campus at Hilton College.",
      },
      {
        place: 'Cádiz, Spain',
        text: 'Students live in a Spanish homestay with at least one other Latin student, on a program run by Centro Mundolengua rather than a sister school.',
      },
    ],
    visitors: [
      'A visiting group is usually about 12 students and two teachers, for 10 to 14 days, joining classes and group outings around Charlotte.',
      'Every adult living in a host home completes a background check arranged by the school.',
      'Families need not have an Upper School student to host, and Upper School students traveling on a summer sister-school exchange are strongly encouraged to host.',
    ],
    sources: [
      { label: 'charlottelatin.org — Global Education', url: GE },
      { label: 'Global Studies site — Sister Schools', url: G_SIS },
      { label: 'Global Studies site — 2026–2027 visiting schools', url: G_SIS27 },
      { label: 'Global Studies site — Host Family FAQs', url: G_HOST },
      { label: 'Global Studies site — Argentina', url: G_ARG },
      { label: 'Global Studies site — France', url: G_FRA },
      { label: 'Global Studies site — Northern Italy', url: G_ITA },
      { label: 'Global Studies site — South Africa: Exchange', url: G_SAX },
      { label: 'Global Studies site — Spain', url: G_ESP },
      { label: 'Global Studies application (Wayback, Oct 2025)', url: WB_GAPP_2510 },
    ],
  },

  /* ----------------------------------------------------------- signing up -- */
  signup: {
    headline:
      'One application for all eight 2026–27 programs, open August 31 to October 2, 2026, with rosters announced by October 30.',
    intro: {
      strong:
        'One online application covers every program, reviewed by the Global Studies office and senior administration.',
      muted:
        'Upper School applicants interview and name a faculty or staff reference; Middle School applicants name a reference and interview only if a program is oversubscribed. A full program keeps a waitlist.',
    },
    groups: [
      {
        title: 'Applying · 2026–27 programs',
        note: '2026 cycle',
        events: [
          { when: 'August 31, 2026', name: 'Applications open', audience: 'Middle & Upper School' },
          { when: 'September 10, 2026', name: 'Student assemblies', audience: 'Middle & Upper School' },
          { when: 'September 22, 2026', name: 'Parent interest meeting', audience: 'Middle & Upper School' },
          { when: 'October 2, 2026', name: 'Applications close', audience: 'Middle & Upper School' },
          { when: 'By October 15, 2026', name: 'England roster announced', audience: 'Middle School' },
          {
            when: 'October 30, 2026',
            name: 'South Africa applications close',
            detail: 'The extended deadline for the leadership course and the long-term exchange',
            audience: 'Upper School',
          },
          { when: 'By October 30, 2026', name: 'Rosters announced', audience: 'Middle & Upper School' },
        ],
      },
      {
        title: 'After acceptance',
        note: '2026–27',
        events: [
          {
            when: 'November 13, 2026',
            name: 'Reservation agreements and deposits due',
            audience: 'Middle & Upper School',
          },
          { when: 'December 10, 2026', name: 'First parent meeting', audience: 'Middle & Upper School' },
          { when: 'January 22, 2027', name: 'Paperwork due', audience: 'Middle & Upper School' },
          { when: 'March 31, 2027', name: 'Final payment due', audience: 'Middle & Upper School' },
          { when: 'May 17, 2027', name: 'Second parent meeting', audience: 'Middle & Upper School' },
        ],
      },
    ],
    footnote: false,
    sources: [
      { label: 'Global Studies site — Important Dates', url: G_DATES },
      { label: 'Global Studies site — Application', url: G_APP },
      { label: 'Global Studies site — FAQs', url: G_FAQ },
    ],
  },

  /* ------------------------------------------- global community on campus -- */
  community: {
    headline:
      "Sister-school visitors in Latin homes, student-led Diwali and Lunar New Year celebrations, and a World Fair on Charlotte's sister cities.",
    intro: {
      strong:
        'By welcoming sister-school visitors and creating cross-cultural experiences, Latin aims to bring the world to its campus.',
      muted: 'Much of it is run by students, from the Diwali assembly to Lunar New Year.',
    },
    stats: [],
    cells: [
      {
        name: 'Host families',
        text: 'Latin families host the visiting sister-school groups — five in 2026–27, from Italy, South Africa, Argentina and France.',
      },
      {
        name: 'Diwali',
        text: 'A student-led assembly for the Middle and Upper School by the Indian Student Alliance, held each year since 2022–23, when Diwali also joined the school calendar.',
      },
      {
        name: 'Lunar New Year',
        text: 'Programming in all three divisions, organized by students and advised by Global Studies and the Office of Diversity, Equity and Inclusion.',
      },
      {
        name: "Charlotte's sister cities",
        text: "Sunny's Day in spring 2026 turned the campus into a World Fair on Charlotte's six sister cities, so students could see Charlotte as an international city.",
      },
      {
        name: 'Silk Road Evening',
        text: "An annual Middle School evening, listed among Latin's on-campus global programs.",
      },
      {
        name: 'Model UN',
        text: "Part of Latin's on-campus global programming, with teams in the Middle and Upper School.",
      },
    ],
    sources: [
      { label: 'charlottelatin.org — Global Education', url: GE },
      { label: 'Global Studies site — 2026–2027 visiting schools', url: G_SIS27 },
      { label: 'Global Studies site — Host Family FAQs', url: G_HOST },
      { label: 'charlottelatin.org — Diwali, 2025', url: N_DIW25 },
      { label: 'charlottelatin.org — Diwali, 2023', url: N_DIW23 },
      { label: 'charlottelatin.org — Lunar New Year, 2026', url: N_LNY26 },
      { label: 'charlottelatin.org — Lunar New Year, 2025', url: N_LNY25 },
      { label: "charlottelatin.org — Sunny's Day, 2026", url: N_SUNNY },
      { label: 'charlottelatin.org — Middle School Model UN, 2025', url: N_MSMUN },
      { label: 'charlottelatin.org — Harvard Model UN, 2016', url: N_HMUN },
    ],
  },

  /* ----------------------------------------- global learning at each level -- */
  start: {
    headline:
      'Global learning from TK — Spanish for every Lower School student, travel opening in 6th grade, and a semester away through School Year Abroad in Upper School.',
    intro: {
      strong:
        'Latin organizes global education in four parts — travel, sister schools, faculty development and on-campus programming — under its Community, Belonging and Global Education office.',
      muted:
        'Through coursework, sister-school partnerships and international travel, the school aims to build the global awareness and cultural competency of its Portrait of the Latin Leader.',
    },
    framework: [
      {
        name: 'Travel Opportunities',
        text: 'Exchanges, service learning, international athletic competition and longer study abroad, for Middle and Upper School students',
      },
      {
        name: 'Sister Schools',
        text: 'Seven partners, the cornerstone of travel and exchange',
      },
      {
        name: 'Faculty Development',
        text: 'Travel abroad for teachers, so they bring global insight back to the classroom',
      },
      {
        name: 'On-Campus Programming',
        text: 'Sister-school visitors and cross-cultural experiences that bring the world to campus',
      },
    ],
    divisions: [
      {
        name: 'Lower School',
        grades: 'TK–5',
        items: [
          'Spanish for every student, TK through 5th grade',
          "The Passport Program's studies of countries and cultures",
          'Global Partners, an annual deep dive into one country of study',
          'Holidays Around the World',
        ],
      },
      {
        name: 'Middle School',
        grades: '6–8',
        items: [
          '**Global Studies travel opens in 6th grade**, for summer programs',
          'Grade-level class trips to Atlanta, Québec and Washington, D.C., beginning in 6th grade',
          'French, Spanish and Latin, from French 6 and Spanish 6 to French I and Latin I',
          'History 6 on the ancient civilizations of the Middle East, Africa, China, India and Europe',
          'The annual Silk Road Evening',
        ],
      },
      {
        name: 'Upper School',
        grades: '9–12',
        items: [
          'Three credits in one world language, plus World History I and II',
          'AP Comparative Government and AP European History',
          'Cultural and Comparative Leadership, a credit-bearing elective taught in South Africa',
          'A semester or year away through School Year Abroad or an approved semester school, preferably in the spring of junior year',
        ],
      },
    ],
    sources: [
      { label: 'charlottelatin.org — Global Education', url: GE },
      { label: 'charlottelatin.org — Lower School', url: LS },
      { label: 'charlottelatin.org — Middle School', url: MS },
      { label: 'charlottelatin.org — Upper School', url: US },
      { label: 'charlottelatin.org — Course Offerings', url: CO },
      { label: 'Global Studies site — FAQs', url: G_FAQ },
      { label: 'Global Studies site — South Africa: Leadership', url: G_SAL },
      { label: 'Global Studies site — External Study Programs', url: G_EXT },
    ],
  },

  /* ------------------------------- school year abroad & the wider network -- */
  network: {
    headline:
      'A School Year Abroad member school, with approved semester schools, the Independent Schools Cultural Alliance, educators who travel, and Model UN from Middle School up.',
    intro: {
      strong:
        "Latin's wider network is School Year Abroad, where it is a member school, plus the programs and educators' groups it travels and learns with.",
      muted: 'Its travel also takes in international athletic competition and longer study abroad.',
    },
    ledgerTitle: 'Model UN conferences',
    conferences: [
      {
        year: '2024–25',
        text: 'The Middle School Model UN conference at Appalachian State University · five delegates, two named Best Delegates',
      },
      {
        year: '2022–23',
        text: 'CHARMUN at Providence Day School · eight Middle School delegates, with two Best Delegate awards, an Outstanding Delegate, a Best Position Paper and two Honorable Mentions',
      },
      {
        year: '2015–16',
        text: 'Harvard Model UN · 14 Upper School students representing Lithuania, with one verbal commendation',
      },
    ],
    cells: [
      {
        name: 'School Year Abroad',
        text: "Latin is now a member school. Its students get preferred admission and priority for need-based aid at SYA's campuses in Rennes, Viterbo and Zaragoza.",
      },
      {
        name: 'Semester schools',
        text: 'A school-approved list — the Alzar School, High Mountain Institute, The Island School, The Mountain School, the School for Ethics and Global Leadership and The Outdoor Academy — with SYA and semester-school campus visits each fall.',
      },
      {
        name: 'Independent Schools Cultural Alliance',
        text: "Latin's Middle School England program runs with ISCA, alongside students from schools around the world.",
      },
    ],
    rows: [
      {
        label: 'Faculty who travel',
        text: 'Recent faculty travel includes AP training in Seville, a language-acquisition workshop in Agen, a Lower School visit to the Argentine sister school, the World Leadership School educator program in Peru, the Lapland International Forum for Education in Finland, and a presentation at the Institute for Global Learning Conference in Canada.',
      },
      {
        label: "Educators' conferences",
        text: "In spring 2022, faculty and staff attended the Global Education Benchmark Group's Global Educators Conference in San Diego, where two Lower School teachers presented.",
      },
    ],
    sources: [
      { label: 'Global Studies site — External Study Programs', url: G_EXT },
      { label: 'Global Studies site — Programs', url: G_PROG },
      { label: 'Global Studies site — Home', url: G_HOME },
      { label: 'Global Studies site — England (ISCA)', url: G_ENG },
      { label: 'charlottelatin.org — Global Education', url: GE },
      { label: 'charlottelatin.org — Global educators conference, 2022', url: N_GEBG },
      { label: 'charlottelatin.org — Middle School Model UN, 2025', url: N_MSMUN },
      { label: 'charlottelatin.org — Middle School Model UN, 2023', url: N_MSMUN23 },
      { label: 'charlottelatin.org — Harvard Model UN, 2016', url: N_HMUN },
    ],
  },

  /* ------------------------------------------------- firsts & milestones -- */
  milestones: {
    headline: 'From a first sister school in 1989 to eight summer programs in 2027.',
    intro: {
      strong: 'Latin dates its sister-school network to 1989 and added partners through 2008,',
      muted: 'then built out its own travel program — each first below as the school states it.',
    },
    events: [
      {
        year: '1989',
        title: 'Germany',
        text: 'The first sister school: Jugenddorf Christophorusschule, Bad Zwesten.',
      },
      {
        year: '1996',
        title: 'France',
        text: 'Sainte Marie Grand LeBrun, Bordeaux.',
      },
      {
        year: '1998',
        title: 'Argentina',
        text: 'Colegio Carmen Arriola de Marin, Buenos Aires.',
      },
      {
        year: '2002',
        title: 'Italy',
        text: 'Istituto Bertrand Russell, Guastalla.',
      },
      {
        year: '2006',
        title: 'China',
        text: 'Luzhou Laojiao Tianfu Middle School, Luzhou City.',
      },
      {
        year: '2008',
        title: 'South Africa',
        text: "Hilton College and St. Anne's Diocesan College.",
      },
      {
        year: '2022–23',
        title: 'Diwali',
        text: 'The first annual Diwali assembly, and Diwali on the school calendar.',
      },
      {
        year: '2025',
        title: 'A trip for credit',
        text: 'South Africa: the first Latin trip students could earn academic credit for, per the school.',
      },
      {
        year: '2025',
        title: 'Québec',
        text: 'A new Middle School trip, for 22 students.',
      },
      {
        year: '2025',
        title: 'Without a tour company',
        text: 'France and Italy, planned by the school itself.',
      },
      {
        year: '2027',
        title: 'Eight programs',
        text: 'Six for Upper School and two for Middle School.',
      },
    ],
    sources: [
      { label: 'charlottelatin.org — Global Education', url: GE },
      { label: 'charlottelatin.org — Diwali, 2023', url: N_DIW23 },
      { label: 'charlottelatin.org — Charlotte Latin Goes Global', url: N_GLOBAL },
      { label: 'Global Studies site — Programs', url: G_PROG },
    ],
  },

  /* --------------------------------------------- verdict & ask the school -- */
  verdict: {
    headline:
      "Where the program stands out, and ten questions the school's website doesn't answer yet — on 2025–26 trips, aid, chaperones and scale.",
    standsOut: {
      summary:
        'Latin stands out for the depth of its sister-school network — seven partners since 1989, with homestays both ways and reciprocal hosting — and for publishing how travel works: eligibility, selection, a sign-up calendar and its safety provider.',
      points: [
        'Seven sister schools on four continents, the oldest from 1989',
        'A credit-bearing leadership course taught in South Africa',
        'A School Year Abroad member school',
        'Trip leaders trained in first aid, CPR and risk management, with International SOS emergency, medical and evacuation cover',
      ],
    },
    ask: [
      {
        topic: '2025–26 trips.',
        question:
          'Did the Germany, Argentina, New Mexico and Belgium & the Netherlands programs run in summer 2026? Only the South Africa course is documented.',
      },
      {
        topic: 'Costa Rica and Yellowstone.',
        question:
          'The Global Education page lists Middle School programs in Costa Rica and Yellowstone. Are they still offered, and when?',
      },
      {
        topic: 'Québec class trip.',
        question:
          "Which grade's class trip goes to Québec, and how does it differ from the elective Montreal and Québec City program?",
      },
      {
        topic: 'China.',
        question: 'Is the 2006 sister school in Luzhou still active? No exchange with it is published.',
      },
      {
        topic: 'Germany.',
        question: 'Will the Bad Zwesten exchange return after 2025–26? It is not among the 2026–27 programs.',
      },
      {
        topic: 'Aid.',
        question:
          'The Plus Fund helps families on substantial aid with costs beyond tuition, including travel. How does it apply to a trip, and how is it requested?',
      },
      {
        topic: 'Chaperones.',
        question: 'How many trip leaders travel with each group?',
      },
      {
        topic: 'Scale.',
        question:
          'How many students travel each year? The latest published counts are 22 Middle School students to Québec and 12 Upper School students to South Africa, in summer 2025.',
      },
      {
        topic: 'Credential.',
        question: 'Is a global certificate or distinction planned?',
      },
      {
        topic: 'Lower School.',
        question: 'Is any travel or exchange planned before 6th grade?',
      },
    ],
    sources: [
      { label: 'charlottelatin.org — Global Education', url: GE },
      { label: 'Global Studies site — Programs', url: G_PROG },
      { label: 'Global Studies site — FAQs', url: G_FAQ },
      { label: 'charlottelatin.org — Alumni Giving: the Plus Fund', url: AG },
      { label: 'charlottelatin.org — Middle School', url: MS },
      { label: 'Global Studies application (Wayback, Oct 2025)', url: WB_GAPP_2510 },
      { label: 'charlottelatin.org — Charlotte Latin Goes Global', url: N_GLOBAL },
    ],
  },
}
