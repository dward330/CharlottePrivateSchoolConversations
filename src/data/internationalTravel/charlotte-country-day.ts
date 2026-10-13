// Charlotte Country Day School — International Travel (displayed "Global
// Exposure").
//
// Built from the user's Claude deep-research PDF (transcribed alongside this
// record) and then VERIFIED fact by fact against live charlottecountryday.org
// pages on 2026-10-12, or a Wayback copy where the live page has moved on. The
// PDF is a lead sheet only; the fact → URL record, including the implement-time
// checks and every spelling conflict, is
// source-material/international-travel/charlotte-country-day/
//   Charlotte Country Day - International Travel - Source URLs.md
//
// Rules this file follows (see ./README.md): every card's `sources` lists the
// specific pages behind its facts; gaps appear only in `verdict.ask`; no
// student, parent or trip leader is named; no trip price and no exact travel
// date is rendered (season and year only — application and registration
// deadlines may render). Country Day publishes no global credential, so the
// `credential` card is omitted.

import type { InternationalTravelProgram } from '../internationalTravel.ts'

const CCD = 'https://www.charlottecountryday.org'
const NEWS = `${CCD}/news-events/news-details-page/~board/school-news/post`
const HIST_ITEM = `${CCD}/about/history/news-details-page-history/~board/general-timeline-board/post`

const IS = `${CCD}/cd-education/international-studies`
const US_GE = `${CCD}/bucsnet/upper-school/global-experiences`
const MS_GE = `${CCD}/bucsnet/middle-school/global-experiences`
const MS = `${CCD}/cd-education/middle-school`
const LS = `${CCD}/cd-education/lower-school`
const HIST = `${CCD}/about/history`
const ENDOW = `${CCD}/about/support/endowment-capital`
const OFF = `${CCD}/cd-education/upper-school/us-curriculum/off-campus`
const IPG = `${CCD}/bucsnet/parent-involvement/international`
const N_2023 = `${NEWS}/global-travel-gives-students-amazing-opportunities`
const N_FAM = `${NEWS}/country-day-families-unite-with-friends-from-around-the-globe`
const N_5MS = `${NEWS}/5-things-you-may-not-know-about-our-middle-school`
const N_2020 = `${NEWS}/international-studies-update`
const N_LNY = `${CCD}/bucsnet/post-details/~board/school-news/post/lunar-new-year-festivities-bring-chinese-traditions-to-life`
const N_SHAPE = `${NEWS}/shaping-thoughtful-compassionate-globally-minded-humans`
const N_MUNCH26 = `${NEWS}/students-earn-top-honors-at-unc-chapel-hill-model-united-nations-conference`
const N_MUNCH25 = `${NEWS}/upper-school-model-un-shines-at-munch-conference`
const N_VAMUN25 = `${NEWS}/country-day-delegates-shine-at-virginia-model-un-conference`
const N_VAMUN24 = `${NEWS}/upper-school-delegates-earn-honors-at-uva-model-un-conference`
const N_TOC_LEB = `${NEWS}/taste-of-cultures-lebanon-brings-language-and-culture-to-life`
const N_TOC_LAT = `${NEWS}/taste-of-cultures-latin-brings-ancient-history-and-neapolitan-pizza-together`
// The live Upper School page now shows only the 2027 cycle; the 2023–24 program
// survives in this March 2024 snapshot.
const WB_US_2024 =
  'https://web.archive.org/web/20240311012022/https://www.charlottecountryday.org/bucsnet/upper-school/global-experiences'
// History-timeline item pages.
const H_ESL = `${HIST_ITEM}/first-esl-program`
const H_IS = `${HIST_ITEM}/first-international-studies-program`
const H_SISTER = `${HIST_ITEM}/upper-school-sister-school-partnership`
const H_IB = `${HIST_ITEM}/first-ib-school-in-nc`
const H_MSX = `${HIST_ITEM}/first-middle-school-exchange-program`
const H_CHINA = `${HIST_ITEM}/first-teacher-exchange-with-china`
const H_CUBA = `${HIST_ITEM}/first-nc-school-to-visit-cuba`

export const charlotteCountryDay: InternationalTravelProgram = {
  lead: {
    strong:
      'Travel begins in 6th grade, run by an Office of International Studies the school dates to 1988, with sister-school exchanges and homestays in Québec City, Arequipa and Southampton, and faculty-led Upper School trips over spring break and in the summer.',
    muted:
      'The school counts 27 countries visited by students on its global travel experiences since 2015, across six continents.',
  },

  stats: [
    {
      value: '27',
      label: 'countries',
      note: "visited by students on Country Day's global travel experiences since 2015",
    },
    {
      value: '6',
      label: 'Middle School experiences',
      note: 'in 2026–27, from 6th grade',
    },
    {
      value: '11',
      label: 'exchange partnerships',
      note: 'including Rotary, AFS-YES, Kennedy-Lugar YES and sister schools in Canada, Peru and the United Kingdom',
    },
    {
      value: '1988',
      label: 'International Studies founded',
      note: 'the first comprehensive program in Charlotte, per the school',
    },
  ],

  /* ----------------------------------------------------- where they go -- */
  trips: {
    headline:
      'Twenty trips and exchanges from three school years — 2022–23, 2023–24 and 2026–27 — including six Middle School experiences from 6th grade, sister-school homestays and Upper School trips from Rwanda to Argentina. Filter by division.',
    intro: {
      strong:
        'Middle School experiences begin in 6th grade, from sister-school exchanges to language and history trips, with a published grade, group size and selection method for each.',
      muted:
        'Upper School trips are faculty-led over spring break and in the summer, and change from year to year. Each 2027 Upper School trip gives priority to students of the matching language and is open to all.',
    },
    years: [
      {
        year: '2026–27',
        note: 'Middle School in winter and spring 2027; Upper School over spring break and in summer 2027',
        noteByDiv: {
          MS: 'winter and spring 2027',
          US: 'over spring break and in summer 2027',
        },
        trips: [
          {
            dest: 'Canada',
            place: 'Québec City — Externat Saint-Coeur de Marie',
            div: 'MS',
            group: '6th grade · usually up to 12 students',
            theme: 'Sister-school exchange · French language and Québécois culture · preference to French students',
            timing: 'Winter 2027',
            homestay: 'Québec City',
          },
          {
            dest: 'Peru',
            place: 'Arequipa, Charlotte\'s sister city — Prescott School',
            div: 'MS',
            group: '7th-grade Spanish students · usually 10–12',
            theme: 'Sister-school exchange · Spanish language and Peruvian culture',
            timing: 'Spring 2027',
            homestay: 'Arequipa',
          },
          {
            dest: 'France',
            place: 'Limoges, Charlotte\'s sister city · the Loire Valley + Normandy',
            div: 'MS',
            group: '8th grade · up to 15 students',
            theme: 'World War II history and the D-Day sites · preference to French students · a lottery if oversubscribed',
            timing: 'Winter 2027',
          },
          {
            dest: 'England',
            place: 'Southampton — King Edward VI School',
            div: 'MS',
            group: '8th grade · 8–10 students',
            theme: 'Sister-school exchange · a creative-arts project · selection by project proposal and interview',
            timing: 'Winter 2027',
            homestay: 'Southampton',
          },
          {
            dest: 'Costa Rica',
            place: 'Monteverde',
            div: 'MS',
            group: '8th-grade Spanish students · up to 10',
            theme: 'Spanish lessons each morning · culture and nature in the afternoons',
            timing: 'Winter 2027',
            homestay: 'Monteverde',
          },
          {
            dest: 'Italy',
            place: 'Rome + Sorrento — Pompeii and Herculaneum',
            div: 'MS',
            group: '8th grade · up to 15 students',
            theme: 'Ancient Roman sites · preference to Latin students · a lottery if oversubscribed',
            timing: 'Winter 2027',
          },
          {
            dest: 'Rwanda',
            div: 'US',
            theme: 'Recovery and reconciliation after the 1994 Genocide against the Tutsi · environmental leadership · Francophone identity · priority to French students',
            timing: 'Spring break 2027',
          },
          {
            dest: 'Greece',
            place: 'Athens',
            div: 'US',
            theme: 'Greek and Roman sites · migration in Europe since 1995 · Greece–Turkey relations · priority to Latin students',
            timing: 'Spring break 2027',
          },
          {
            dest: 'China',
            place: 'The Silk Road, Dunhuang to Xi\'an + Shanghai',
            div: 'US',
            theme: 'The Gobi Desert and the Terracotta Warriors · time with students at Jinrui School in Shanghai · priority to Chinese students',
            timing: 'Spring break 2027',
          },
          {
            dest: 'Argentina',
            place: 'Buenos Aires, Paraná + Iguazú Falls',
            div: 'US',
            theme: 'Cultural exchange with Argentine students · a service-learning project in Paraná · priority to Spanish students',
            timing: 'Summer 2027',
          },
        ],
      },
      {
        year: '2023–24',
        note: 'as scheduled in March 2024',
        trips: [
          {
            dest: 'Oman & United Arab Emirates',
            place: 'Muscat, Sur, the Sharqiya Sands, Abu Dhabi + Dubai',
            div: 'US',
            group: 'grades 9–12',
            theme: 'Tradition and modernization in the Arab world',
            timing: 'Spring 2024',
          },
          {
            dest: 'England',
            place: 'London — with the a cappella ensemble Voces8, performing in Cadogan Hall',
            div: 'US',
            group: 'choir students, grades 9–11',
            theme: 'Choir · rehearsals and master classes',
            timing: 'Spring 2024',
          },
          {
            dest: 'Japan',
            place: 'Kyoto, Tokyo + the Nakasendo Way',
            div: 'US',
            group: 'grades 9–11',
            theme: 'Cultural experience',
            timing: 'Summer 2024',
          },
          {
            dest: 'New Zealand',
            div: 'US',
            group: 'grades 9–11',
            theme: 'Māori culture and the environment',
            timing: 'Summer 2024',
          },
          {
            dest: 'Spain',
            place: 'Seville, with day trips to Córdoba and Granada',
            div: 'US',
            group: 'Honors Spanish II or higher, grades 9–11',
            theme: 'Language immersion',
            timing: 'Summer 2024',
            homestay: 'Seville',
          },
          {
            dest: 'Sweden & Denmark',
            place: 'Copenhagen and the Øresund Bridge',
            div: 'US',
            group: 'grades 9–11',
            theme: 'Design and sustainability',
            timing: 'Summer 2024',
          },
        ],
      },
      {
        year: '2022–23',
        note: 'summer 2023, the first summer trips since 2019',
        trips: [
          {
            dest: 'Italy',
            place: 'Florence + Cortona',
            div: 'US',
            theme: 'Arts · offered every two years for many years',
          },
          {
            dest: 'Iceland',
            div: 'US',
            theme: 'Sustainability and environmental science',
          },
          {
            dest: 'Spain & Morocco',
            div: 'US',
            theme: 'Spanish immersion',
          },
          {
            dest: 'Poland, Germany & France',
            place: 'Wrocław, Krefeld + Limoges — Charlotte\'s sister cities',
            div: 'US',
            theme: 'Charlotte\'s sister cities',
          },
        ],
      },
    ],
    photo: {
      src: '/travel/charlotte-country-day-southampton-exchange.jpg',
      alt: 'Country Day Middle School students on the Southampton sister-school exchange, in London',
      caption: {
        title: 'Southampton exchange',
        text: 'The 8th-grade exchange with King Edward VI School includes visits to London.',
      },
      credit: 'Photo: Charlotte Country Day School',
    },
    alsoOnRecord: [
      {
        lead: 'Cuba, 2015.',
        text: "The school calls itself the state's first school to send students to Cuba.",
      },
      {
        lead: 'Middle School, since 1993.',
        text: 'More than 800 students in grades 6–8 had taken part in a global travel experience by 2018, when 65 Middle School students were set to travel to five countries in one year.',
      },
      {
        lead: 'Arequipa, 2019.',
        text: '12 Middle School students traveled to Arequipa, Peru, in fall 2019, including a visit to the mayor.',
      },
      {
        lead: 'A pause, 2020–22.',
        text: 'Global experiences paused during the pandemic; summer 2023 brought the first summer trips since 2019.',
      },
    ],
    sources: [
      { label: 'charlottecountryday.org — Middle School Global Experiences', url: MS_GE },
      { label: 'charlottecountryday.org — Upper School Global Experiences', url: US_GE },
      { label: 'Upper School Global Experiences (Wayback, Mar 2024)', url: WB_US_2024 },
      { label: 'charlottecountryday.org — Global travel news, 2023', url: N_2023 },
      { label: 'charlottecountryday.org — International Studies', url: IS },
      { label: 'charlottecountryday.org — Middle School news, 2018', url: N_5MS },
      { label: 'charlottecountryday.org — International Studies update, 2020', url: N_2020 },
      { label: 'charlottecountryday.org — History: first NC school to visit Cuba', url: H_CUBA },
    ],
  },

  /* -------------------------------------------- exchanges & homestays -- */
  exchanges: {
    headline:
      'Three sister schools — in Québec City, Southampton and Arequipa — with homestays both ways, plus visiting students on campus and families who host.',
    intro: {
      strong:
        'Since 1992, Country Day has built sister-school partnerships in numerous countries; its current partners are in Canada, Peru and the United Kingdom.',
      muted:
        'The two-week exchanges include homestays, sightseeing and some classes, and sister-school students visit Charlotte during the school year. The Southampton exchange has run since 1991 and the Québec exchange since 2017.',
    },
    partners: [
      {
        country: 'Canada',
        years: '2017–2027',
        school: 'Externat Saint-Coeur de Marie, Québec City',
        out: '6th graders, for a winter homestay',
        in: 'Québec students visit in the spring',
      },
      {
        country: 'England',
        years: '1991–2027',
        school: 'King Edward VI School, Southampton',
        out: '8th graders, with a creative-arts project',
        in: 'KES students visit in the fall',
      },
      {
        country: 'Peru',
        years: '2019–2027',
        school: 'Prescott School, Arequipa',
        out: '7th-grade Spanish students, in the spring',
        in: 'Prescott students visit in January',
      },
    ],
    photo: {
      src: '/travel/charlotte-country-day-quebec-exchange.jpg',
      alt: 'Two Country Day students on the Québec sister-school exchange, at a winter carnival',
      caption: {
        title: 'Québec exchange',
        text: 'Country Day students in Québec.',
      },
      credit: 'Photo: Charlotte Country Day School',
    },
    homestays: [
      {
        place: 'Québec City, Canada',
        text: '6th graders stay with families from Externat Saint-Coeur de Marie, a JK–6 school whose language of instruction is French.',
      },
      {
        place: 'Southampton, England',
        text: '8th graders stay with families from King Edward VI School and work on a creative-arts project tied to the region.',
      },
      {
        place: 'Arequipa, Peru',
        text: '7th-grade Spanish students stay with families from Prescott School, a K–12 school in a city that is Charlotte\'s sister city.',
      },
      {
        place: 'Monteverde, Costa Rica',
        text: 'On the 8th-grade Spanish trip, students are hosted by local families and take language lessons each morning.',
      },
      {
        place: 'Seville, Spain',
        text: 'The summer 2024 Upper School Spain trip, for students in Honors Spanish II or higher, was planned around homestays in Seville.',
      },
    ],
    visitors: [
      'Students from Jinrui School in Shanghai spent a week at the Middle School in early 2025.',
      'The school counts 11 exchange program partnerships, including the Rotary Club, AFS-YES and the U.S. State Department\'s Kennedy-Lugar YES program.',
      'Families can host a visiting student through the International Parents Group, for a few days, weeks or a semester.',
    ],
    sources: [
      { label: 'charlottecountryday.org — International Studies', url: IS },
      { label: 'charlottecountryday.org — Middle School Global Experiences', url: MS_GE },
      { label: 'Upper School Global Experiences (Wayback, Mar 2024)', url: WB_US_2024 },
      { label: 'charlottecountryday.org — Families and exchange friends, 2025', url: N_FAM },
      { label: 'charlottecountryday.org — International Studies update, 2020', url: N_2020 },
      { label: 'charlottecountryday.org — Lunar New Year, 2025', url: N_LNY },
      { label: 'charlottecountryday.org — International Parents Group', url: IPG },
    ],
  },

  /* ----------------------------------------------------------- signing up -- */
  signup: {
    headline:
      'Upper School applications for the 2027 trips run September 1–25, 2026, with registration in October; Middle School applications for 2026–27 were due in April and August 2026.',
    intro: {
      strong:
        'Trip financial aid requires a Parents\' Financial Statement on file with Admissions, plus the Global Programs Financial Aid Application by the trip\'s deadline.',
      muted:
        'Upper School trips give priority to students of the matching language and are open to all. In the Middle School, the Southampton exchange selects by project proposal and interview, and France and Italy use a lottery if oversubscribed.',
    },
    groups: [
      {
        title: 'Upper School · 2027 trips',
        note: '2026 cycle',
        events: [
          { when: 'August 24, 2026', name: 'Student Assembly', audience: 'Upper School' },
          { when: 'September 1, 2026', name: 'Parent & Student Info Meeting', audience: 'Upper School' },
          {
            when: 'September 1–25, 2026',
            name: 'Trip applications and financial aid applications due',
            audience: 'Upper School',
          },
          { when: 'October 2–16, 2026', name: 'Registration', audience: 'Upper School' },
        ],
      },
      {
        title: 'Middle School · 2026–27 experiences',
        note: '2026–27',
        events: [
          {
            when: 'April 20, 2026',
            name: 'Applications and Global Programs Financial Aid Application due',
            detail: 'Québec, France, Southampton, Costa Rica and Italy',
            audience: 'Middle School',
          },
          {
            when: 'August 30, 2026',
            name: 'Peru application and financial aid application due',
            audience: 'Middle School · 7th grade',
          },
        ],
      },
    ],
    footnote: false,
    sources: [
      { label: 'charlottecountryday.org — Upper School Global Experiences', url: US_GE },
      { label: 'charlottecountryday.org — Middle School Global Experiences', url: MS_GE },
    ],
  },

  /* ----------------------------------------- global learning at each level -- */
  start: {
    headline:
      'Global learning in every division, JK to 12 — with travel beginning in 6th grade and the IB Diploma in Upper School.',
    intro: {
      strong:
        'At Country Day, global mindedness is about far more than travel: students in all three divisions discuss the world beyond our borders.',
      muted: 'The Office of International Studies organizes the program around four pillars.',
    },
    framework: [
      {
        name: 'International Travel Experiences',
        text: 'Academic, cultural, environmental science and language immersion trips, beginning in 6th grade',
      },
      {
        name: 'Sister School Exchanges',
        text: 'Partnerships since 1992, with two-week exchanges that include homestays, sightseeing and some classes',
      },
      {
        name: 'Connecting Curriculum',
        text: 'Global connections built into courses, from Middle School science to Upper School electives',
      },
      {
        name: 'Global-Minded Faculty',
        text: 'Grants, sabbaticals and international research grants send teachers to learn firsthand abroad',
      },
    ],
    divisions: [
      {
        name: 'Lower School',
        grades: 'JK–4',
        items: [
          'French and Spanish begin in junior kindergarten to 1st grade',
          'A 3rd-grade global studies unit',
          '4th-grade leaders open the school\'s Lunar New Year celebration',
        ],
      },
      {
        name: 'Middle School',
        grades: '5–8',
        items: [
          '**Travel begins in 6th grade:** six experiences in 2026–27',
          'French, Spanish and Latin',
          'Foreign soil samples in environmental science',
          'Model United Nations and the Global Action Team',
        ],
      },
      {
        name: 'Upper School',
        grades: '9–12',
        items: [
          'Faculty-led trips over spring break and in the summer, and about two weeks at partner schools, usually in June',
          'AP Comparative Government, and electives such as World Religions and International Relations',
          'The IB Diploma — in 1992, Country Day became the first private school in North Carolina to offer it',
          'A semester or year away through School Year Abroad, the Alzar School or Maine Coast Semester',
        ],
      },
    ],
    sources: [
      { label: 'charlottecountryday.org — International Studies', url: IS },
      { label: 'charlottecountryday.org — Lower School', url: LS },
      { label: 'charlottecountryday.org — Middle School', url: MS },
      { label: 'charlottecountryday.org — Off-Campus Learning', url: OFF },
      { label: 'charlottecountryday.org — History: first IB school in NC', url: H_IB },
      { label: 'charlottecountryday.org — International Studies update, 2020', url: N_2020 },
      { label: 'charlottecountryday.org — Lunar New Year, 2025', url: N_LNY },
    ],
  },

  /* ----------------------- model un, worldquest & charlotte's global partners -- */
  network: {
    headline:
      'No global-schools network membership is published; instead, Model UN, Academic WorldQuest and Charlotte\'s own global institutions — "Global starts Local."',
    intro: {
      strong:
        'The program leans on competitions and on Charlotte\'s international community, under the Office of International Studies\' motto, "Global starts Local."',
      muted:
        'The school counts 23 wins across Academic WorldQuest, Euro Challenge and Model UN conference competitions.',
    },
    ledgerTitle: 'Model UN conferences',
    conferences: [
      {
        year: '2025–26',
        text: 'Hosted CHARMUN in September · VAMUN at the University of Virginia, 10 delegates, a Best Delegate award and a verbal commendation · MUNCH at UNC-Chapel Hill, 20 students',
      },
      {
        year: '2024–25',
        text: 'VAMUN at the University of Virginia, 12 Upper School delegates and verbal commendations for two delegations · MUNCH at UNC-Chapel Hill, 17 students, six awards',
      },
    ],
    cells: [
      {
        name: 'Academic WorldQuest',
        text: 'Country Day students finish in first place at the Academic WorldQuest competition nearly every year, per the school.',
      },
      {
        name: "Charlotte's sister cities",
        text: 'Trips to Arequipa, Limoges, Krefeld and Wrocław, and a forum on the Charlotte–Arequipa sister-city partnership.',
      },
      {
        name: 'Community partners',
        text: 'Festivals and events with the World Affairs Council of Charlotte and International House, and ties to members of the North Carolina diplomatic corps.',
      },
    ],
    rows: [
      {
        label: 'Faculty who travel',
        text: 'Grants, sabbaticals and international research grants send teachers abroad. The J. R. Williams Fellowship funds international travel and education for a faculty member after five years of teaching at Country Day. In 2007, the school set up NC\'s first full teacher exchange with China.',
      },
      {
        label: 'Semester programs',
        text: 'Country Day is one of fourteen member schools of Maine Coast Semester at Chewonki, and awards credit for approved programs without affecting a student\'s GPA.',
      },
    ],
    sources: [
      { label: 'charlottecountryday.org — International Studies', url: IS },
      { label: 'charlottecountryday.org — MUNCH, 2026', url: N_MUNCH26 },
      { label: 'charlottecountryday.org — MUNCH, 2025', url: N_MUNCH25 },
      { label: 'charlottecountryday.org — VAMUN, Nov 2025', url: N_VAMUN25 },
      { label: 'charlottecountryday.org — VAMUN, Nov 2024', url: N_VAMUN24 },
      { label: 'charlottecountryday.org — Global travel news, 2023', url: N_2023 },
      { label: 'charlottecountryday.org — International Studies update, 2020', url: N_2020 },
      { label: 'charlottecountryday.org — Endowment', url: ENDOW },
      { label: 'charlottecountryday.org — History: teacher exchange with China', url: H_CHINA },
      { label: 'charlottecountryday.org — Off-Campus Learning', url: OFF },
    ],
  },

  /* ------------------------------------------- global community on campus -- */
  community: {
    headline:
      'Families from 57 nations, teachers who speak 20 languages, and a full-time ESL program — the first among the area\'s independent schools.',
    intro: {
      strong:
        'Country Day is home to families and students who represent a wide range of cultures and nationalities,',
      muted: 'and its International Parents Group supports global families who are new to the school, and often new to the country.',
    },
    stats: [
      { value: '57', label: 'parent nationalities', note: 'currently represented at Country Day' },
      { value: '20', label: 'languages spoken by faculty', note: '100+ teachers speak a second language' },
      { value: '1982', label: 'English as a Second Language', note: 'the first area independent school to offer it' },
    ],
    cells: [
      {
        name: 'English as a Second Language',
        text: 'The first and only independent school in NC with a full-time ESL program, per the school. It drew 75 international students in its first two years.',
      },
      {
        name: 'International Parents Group',
        text: 'Welcomes new international families; runs the International Food Hall at Big Saturday, with dishes from more than 20 countries, and a fall dinner of around 80 members.',
      },
      {
        name: 'Visiting diplomats',
        text: 'Students have lunched with the ambassadors of Myanmar, Finland, Jamaica, the Czech Republic, Germany and Cape Verde.',
      },
      {
        name: 'Cultural celebrations',
        text: 'Lunar New Year with over 1,000 handmade dumplings, and Taste of Cultures, a series begun in late 2024 that reached its 11th event, Lebanon, in spring 2026.',
      },
      {
        name: 'Global clubs',
        text: 'Model UN and the Global Action Team in Middle School; Model UN, Interact Club, the International Studies Board, World Quest and Euro Challenge in Upper School.',
      },
    ],
    sources: [
      { label: 'charlottecountryday.org — International Studies', url: IS },
      { label: 'charlottecountryday.org — International Parents Group', url: IPG },
      { label: 'charlottecountryday.org — History: first ESL program', url: H_ESL },
      { label: 'charlottecountryday.org — Lunar New Year, 2025', url: N_LNY },
      { label: 'charlottecountryday.org — Taste of Cultures: Lebanon', url: N_TOC_LEB },
      { label: 'charlottecountryday.org — Taste of Cultures: Latin', url: N_TOC_LAT },
    ],
  },

  /* ------------------------------------------------- firsts & milestones -- */
  milestones: {
    headline:
      'Nearly fifty years of global firsts, from a 1977 travel-aid fund to a 2027 program of ten trips and exchanges.',
    intro: {
      strong: 'Country Day dates its global program to a 1977 endowment and its first International Studies program to 1988,',
      muted: 'and claims a run of North Carolina firsts since — each below as the school states it.',
    },
    events: [
      {
        year: '1977',
        title: 'A fund for student travel',
        text: 'The Mildred Dalton Cox Endowment for International Studies helps students who otherwise would be unable to take part.',
      },
      {
        year: '1982',
        title: 'English as a Second Language',
        text: 'The first area independent school to offer ESL.',
      },
      {
        year: '1988',
        title: 'International Studies',
        text: 'The first International Studies program in Charlotte.',
      },
      {
        year: '1991',
        title: 'Southampton',
        text: 'The exchange with King Edward VI School begins.',
      },
      {
        year: '1992',
        title: 'Sister schools',
        text: 'Upper School sister-school partnerships in countries like France and Germany.',
      },
      {
        year: '1992',
        title: 'The IB Diploma',
        text: 'The first private school in North Carolina to offer it.',
      },
      {
        year: '1993',
        title: 'Middle School exchanges',
        text: 'One of the first independent schools in the region to start exchanges at the Middle School level, beginning with a school in Montreal.',
      },
      {
        year: '1997',
        title: 'A fellowship for faculty travel',
        text: 'The J. R. Williams Fellowship funds international travel for a teacher after five years at Country Day.',
      },
      {
        year: '2007',
        title: 'China',
        text: 'NC\'s first full teacher exchange with China.',
      },
      {
        year: '2015',
        title: 'Cuba',
        text: 'The state\'s first school to send students to Cuba.',
      },
      {
        year: '2017',
        title: 'Québec',
        text: 'The exchange with Externat Saint-Coeur de Marie begins.',
      },
      {
        year: '2020–22',
        title: 'A pause',
        text: 'Global experiences paused; summer 2023 brought the first summer trips since 2019.',
      },
      {
        year: '2027',
        title: 'Ten trips and exchanges',
        text: 'Four Upper School trips and six Middle School experiences planned.',
      },
    ],
    sources: [
      { label: 'charlottecountryday.org — Our History', url: HIST },
      { label: 'charlottecountryday.org — Endowment', url: ENDOW },
      { label: 'charlottecountryday.org — History: first ESL program', url: H_ESL },
      { label: 'charlottecountryday.org — History: first International Studies program', url: H_IS },
      { label: 'charlottecountryday.org — History: sister-school partnership', url: H_SISTER },
      { label: 'charlottecountryday.org — History: first IB school in NC', url: H_IB },
      { label: 'charlottecountryday.org — History: first Middle School exchange', url: H_MSX },
      { label: 'charlottecountryday.org — History: teacher exchange with China', url: H_CHINA },
      { label: 'charlottecountryday.org — History: first NC school to visit Cuba', url: H_CUBA },
      { label: 'charlottecountryday.org — Middle School Global Experiences', url: MS_GE },
      { label: 'charlottecountryday.org — Upper School Global Experiences', url: US_GE },
      { label: 'charlottecountryday.org — International Studies update, 2020', url: N_2020 },
      { label: 'charlottecountryday.org — Global travel news, 2023', url: N_2023 },
    ],
  },

  /* --------------------------------------------- verdict & ask the school -- */
  verdict: {
    headline:
      "Where the program stands out, and eleven questions the school's website doesn't answer yet — Upper School prices, aid, selection and safety.",
    standsOut: {
      summary:
        'Among Charlotte private schools, Country Day stands out for how early and how concretely travel begins — six published Middle School experiences from 6th grade — and for sister-school exchanges running since 1991.',
      points: [
        'A 6th-grade start, with grade, group size and selection published for every Middle School trip',
        'Three sister schools, with homestays both ways',
        'A run of state firsts the school claims: 1988, 1992, 2007, 2015',
        'A global community on campus: 57 parent nationalities and full-time ESL',
      ],
    },
    ask: [
      {
        topic: 'Upper School prices.',
        question:
          'The 2027 Upper School trip prices are not published. What does a trip cost, and what does it include? The Middle School pages list their prices.',
      },
      {
        topic: 'Aid.',
        question:
          'How much does the Cox endowment award each year, and does tuition aid extend to trip costs?',
      },
      {
        topic: 'Selection.',
        question:
          'Beyond language priority, how are Upper School places decided when a trip is oversubscribed?',
      },
      {
        topic: 'Safety.',
        question:
          'The director reviews travel partners in person, but no protocol is published. Which vendors are used, what insurance is carried, and what are the chaperone ratios?',
      },
      {
        topic: '2025–26 trips.',
        question:
          'Did Upper School trips run in 2025–26? The live page now lists only the 2027 trips.',
      },
      {
        topic: 'France grade.',
        question:
          'Is the Middle School France trip open to 7th graders? Its heading says 7th and 8th grade, but its eligibility says 8th grade.',
      },
      {
        topic: 'Jinrui.',
        question:
          'Is Jinrui School in Shanghai a formal sister school? It is not in the published list of current partners.',
      },
      {
        topic: 'Hosting.',
        question: 'Are exchange families required to host a sister-school student in return?',
      },
      {
        topic: 'Lower School and languages.',
        question:
          'What global and language curriculum runs before Middle School, and is there a published language sequence from JK to 12?',
      },
      {
        topic: 'Credential.',
        question: 'Is a global certificate or diploma planned?',
      },
      {
        topic: 'Scale.',
        question:
          'How many students travel each year? The last published figure is 65 Middle School students, in 2018–19.',
      },
    ],
    sources: [
      { label: 'charlottecountryday.org — Upper School Global Experiences', url: US_GE },
      { label: 'charlottecountryday.org — Middle School Global Experiences', url: MS_GE },
      { label: 'charlottecountryday.org — International Studies', url: IS },
      { label: 'charlottecountryday.org — Endowment', url: ENDOW },
      { label: 'charlottecountryday.org — Shaping globally minded humans', url: N_SHAPE },
      { label: 'charlottecountryday.org — Lunar New Year, 2025', url: N_LNY },
      { label: 'charlottecountryday.org — Middle School news, 2018', url: N_5MS },
    ],
  },
}
