// Cannon School — International Travel (displayed "Global Exposure").
//
// Built from the user's Claude deep-research PDF (transcribed alongside this
// record) and then VERIFIED fact by fact against live cannonschool.org pages on
// 2026-10-15, or a Wayback copy where the live page has moved on. The PDF is a
// lead sheet only; the fact → URL record, including the implement-time checks
// (story publication dates read from each page's `article:published` meta) and
// every spelling conflict, is
// source-material/international-travel/cannon/
//   Cannon School - International Travel - Source URLs.md
//
// Rules this file follows (see ./README.md): every card's `sources` lists the
// specific pages behind its facts; gaps appear only in `verdict.ask`; no
// student, parent, teacher or trip leader is named; no trip price and no exact
// travel date is rendered (season and year only). The first COMPACT section:
// Cannon publishes no exchange partner, no sign-up dates, no community figures
// and no milestones, so `exchanges`, `signup`, `community` and `milestones` are
// omitted (user decisions, 2026-10-15), and the network card has no conference
// ledger. The credential is named "Global Studies Certificate" throughout — the
// program's own page — though the course catalog calls it the "Global Education
// Certificate".

import type { InternationalTravelProgram } from '../internationalTravel.ts'

const CS = 'https://www.cannonschool.org'
const NEWS = `${CS}/news-and-stories/in-the-news-details/~board/cannon-news-cougar-news-internal-sources/post`
const CNEWS = `${CS}/cannon-school-news/details/~board/cannon-news-cougar-news-internal-sources/post`

const IP = `${CS}/academics/international-programs`
// The Global Studies Mastery Credits PDF, through the school's own link.
const GSMC = `${CS}/fs/resource-manager/view/3bd2ca09-c697-4ae8-ac6c-4ff7cbe2836d`
const WT = `${CS}/academics/upper-school/winterm`
const CAT =
  'https://resources.finalsite.net/images/v1738691920/cannonschoolorg/uttbrksgq9kxdyjdrjpr/CannonAcademicCourseCatalog2025-26DIGITAL1.pdf'
const CURR = `${CS}/academics/upper-school/curriculum`
const FAQ = `${CS}/admission/admission-faqs`
const K = `${CS}/academics/lower-school/early-childhood-jrkk/kindergarten`
const G1 = `${CS}/academics/lower-school/first-grade`
const G3 = `${CS}/academics/lower-school/third-grade`
const MSL = `${CS}/cannon-life/student-life/middle-school-student-life`
const ISP = `${CS}/international-student-program`
const FA = `${CS}/admission/financial-aid`
const ENDOW = `${CS}/support-cannon/endowment`
const N_TECHO = `${CNEWS}/winterm-in-action-techo-in-the-dominican-republic`
const N_CHINA = `${NEWS}/across-china-a-journey-of-discovery-and-connection`
const N_CR = `${NEWS}/learning-beyond-the-classroom-in-costa-rica`
const N_FAC = `${NEWS}/cannon-educators-earndonor-funded-awardsto-bring-global-perspectives-back-to-the-classroom`
const N_STUDIOS = `${CNEWS}/behind-the-scenes-at-cannon-studios`
// The Lower School travel page is gone from the live site; the 2019 family-trip
// announcement survives in this Dec 2019 snapshot.
const WB_TA_2019 =
  'https://web.archive.org/web/20191210033437/https://www.cannonschool.org/academics/international-programs/travel-abroad'

export const cannon: InternationalTravelProgram = {
  lead: {
    strong:
      "Cannon's global program centres on the Upper School, with a Global Studies Certificate awarded at Senior Night and Winterm trips abroad for grades 9–11, on a base of world-language study that begins in Junior Kindergarten.",
    muted:
      'Recent travel includes TECHO service builds in Costa Rica and the Dominican Republic, a summer in China, and a Middle School trip to Costa Rica in summer 2026.',
  },

  stats: [
    {
      value: '22',
      label: 'Upper School students',
      note: 'on the Winterm 2026 TECHO service build in the Dominican Republic, per the school',
    },
    {
      value: '3',
      label: 'languages to try in 5th grade',
      note: 'French, Mandarin Chinese and Spanish, then students choose one',
    },
    {
      value: '21',
      label: 'teachers with the Global Education Badge',
      note: "our count from the school's list, 2017–2024",
    },
  ],

  /* ----------------------------------------------------- where they go -- */
  trips: {
    headline:
      'Five trips from two school years — 2024–25 and 2025–26 — including TECHO service builds in Costa Rica and the Dominican Republic, a summer in China and a Middle School summer in Costa Rica. Filter by division.',
    intro: {
      strong:
        'Upper School travel runs mainly through Winterm, a week each January after winter break, whose Trips and Certifications track is open to grades 9–11.',
      muted:
        'Middle School students traveled abroad in summer 2026, and the school has run Upper School TECHO service builds two years running.',
    },
    years: [
      {
        year: '2025–26',
        note: 'Upper School in Winterm and winter 2026; Middle School in summer 2026',
        noteByDiv: {
          US: 'Winterm and winter 2026',
          MS: 'summer 2026',
        },
        trips: [
          {
            dest: 'Dominican Republic',
            place: 'Santo Domingo, with TECHO',
            div: 'US',
            group: '22 Upper School students',
            theme: 'Winterm service learning · building homes for two families · selected by interview; Spanish fluency not required',
            timing: 'Winterm 2026',
          },
          {
            dest: 'Costa Rica',
            place: 'San José, Arenal, Monteverde + Manuel Antonio',
            div: 'MS',
            theme: 'Eight days of Spanish, geography and culture, including a Spanish-language scavenger hunt in Santa Elena',
            timing: 'Summer 2026',
          },
          {
            dest: 'Germany',
            place: 'Hamburg — the Hamburg Open',
            div: 'US',
            group: 'Cannon Studios students',
            theme: 'An international event-technology convention',
            timing: 'Winter 2026',
          },
        ],
      },
      {
        year: '2024–25',
        note: 'Winterm 2025 and summer 2025',
        trips: [
          {
            dest: 'Costa Rica',
            place: 'with TECHO',
            div: 'US',
            theme: "Winterm service learning · the school's first trip with TECHO",
            timing: 'Winterm 2025',
          },
          {
            dest: 'China',
            place: "Shanghai, Xi'an, Chongqing, Zhangjiajie, Fenghuang + Changsha",
            div: 'US',
            theme: 'History and culture · a visit to Fudan University and an AI and robotics company',
            timing: 'Summer 2025',
          },
        ],
      },
    ],
    photo: {
      src: '/travel/cannon-costa-rica-2026.jpg',
      alt: 'Cannon Middle School students and their chaperones at a waterfall in Costa Rica',
      caption: {
        title: 'Costa Rica, summer 2026',
        text: 'The Middle School trip traveled from the mountains to the Pacific coast.',
      },
      credit: 'Photo: Cannon School',
    },
    alsoOnRecord: [
      {
        lead: 'Winterm in Costa Rica.',
        text: 'A Winterm Spanish immersion trip to Playa Sámara, Guanacaste, with volunteering at CREAR; the school does not give the year.',
      },
      {
        lead: 'A Lower School family trip.',
        text: 'In 2019 the school planned its second Lower School family trip abroad, to Greece, for summer 2020, open to students 5 and up with a parent.',
      },
    ],
    sources: [
      { label: 'cannonschool.org — Winterm', url: WT },
      { label: 'cannonschool.org — Winterm in action: TECHO in the Dominican Republic, 2026', url: N_TECHO },
      { label: 'cannonschool.org — Learning beyond the classroom in Costa Rica, 2026', url: N_CR },
      { label: 'cannonschool.org — Behind the scenes at Cannon Studios, 2026', url: N_STUDIOS },
      { label: 'cannonschool.org — Across China, 2025', url: N_CHINA },
      { label: 'Travel Abroad (Wayback, Dec 2019)', url: WB_TA_2019 },
    ],
  },

  /* ----------------------------------------- global learning at each level -- */
  start: {
    headline:
      'Global learning in every division, JrK to 12 — Spanish from Junior Kindergarten, a three-language choice in 5th grade, and Winterm trips in the Upper School.',
    intro: {
      strong:
        'The International Program aims to promote global competency by broadening the experiences of students through travel, summer exchange, study and service.',
      muted: 'Language study runs from Junior Kindergarten to AP, and global themes reach into Lower School Spanish.',
    },
    divisions: [
      {
        name: 'Lower School',
        grades: 'JrK–4',
        items: [
          'Spanish from Junior Kindergarten',
          "1st grade's culture journey through five South American countries, in Spanish class",
          'An imaginary trip to Costa Rica in 3rd-grade Spanish',
        ],
      },
      {
        name: 'Middle School',
        grades: '5–8',
        items: [
          '5th graders try French, Mandarin Chinese and Spanish, then choose one',
          'A Model UN team among the academic competition teams',
          '**Travel abroad:** a summer trip to Costa Rica in 2026',
        ],
      },
      {
        name: 'Upper School',
        grades: '9–12',
        items: [
          'Three years of world language, with Chinese, French and Spanish through Honors V and AP',
          'Honors World History',
          'Winterm, a week each January, with trips open to grades 9–11',
          'Honors Glocal Perspectives for seniors',
        ],
      },
    ],
    sources: [
      { label: 'cannonschool.org — International Programs', url: IP },
      { label: 'cannonschool.org — Admission FAQs', url: FAQ },
      { label: 'cannonschool.org — Kindergarten', url: K },
      { label: 'cannonschool.org — First Grade', url: G1 },
      { label: 'cannonschool.org — Third Grade', url: G3 },
      { label: 'cannonschool.org — Middle School Student Life', url: MSL },
      { label: 'cannonschool.org — Learning beyond the classroom in Costa Rica, 2026', url: N_CR },
      { label: 'cannonschool.org — Upper School Curriculum', url: CURR },
      { label: 'cannonschool.org — Winterm', url: WT },
      { label: 'cannonschool.org — Course Catalog 2025–26 (PDF)', url: CAT },
    ],
  },

  /* ------------------------------------------- the global studies certificate -- */
  credential: {
    headline:
      'A certificate awarded at Senior Night — a required senior course with a capstone, four Mastery Credit strands, and global experiences beyond the classroom.',
    intro: {
      strong:
        'The Global Studies Certificate is designed to recognize students who demonstrate a global mindset and embody the qualities of a global citizen, and is awarded at Senior Night.',
      muted: 'Since the Class of 2024, students meet its requirements through the Global Studies Mastery Credits.',
    },
    stats: [{ value: '4', label: 'Mastery Credit strands', note: 'for the Class of 2024 onward' }],
    required: [
      'Honors Glocal Perspectives in senior year, with a capstone essay and a presentation on a global topic',
      'Communication and language proficiency — ACTFL targets of Intermediate Mid–High by level 4 and Advanced Low in AP',
      'Independence, research and critical thinking',
      'Intercultural competence or collaboration',
      'Citizenship and leadership',
    ],
    beyond: [
      'A school-sponsored trip abroad, living abroad for a month or more, or hosting an international student',
      'A second Winterm course',
      'Global education events such as the World Affairs Council of Charlotte and World Quest',
      'A sustained global team or club, such as Model UN, the Southern Diversity Leadership Conference or UNC World View',
    ],
    sources: [
      { label: 'cannonschool.org — International Programs', url: IP },
      { label: 'cannonschool.org — Global Studies Mastery Credits (PDF)', url: GSMC },
      { label: 'cannonschool.org — Course Catalog 2025–26 (PDF)', url: CAT },
    ],
  },

  /* ---------- the world affairs council, model un & the global education badge -- */
  network: {
    headline:
      "Charlotte's World Affairs Council, UNC's World View and student competitions — with teachers who earn a Global Education Badge of their own.",
    intro: {
      strong:
        'The program\'s links run through Charlotte\'s World Affairs Council, UNC\'s World View and student competitions, and its mission includes "thinking globally and acting locally."',
      muted: 'Teachers can earn a Global Education Badge through 100 hours of global professional development, and some travel abroad on awards and grants.',
    },
    conferences: [],
    cells: [
      {
        name: 'World Affairs Council of Charlotte & UNC World View',
        text: "The program's partner links, and qualifying events and groups for the Global Studies Certificate.",
      },
      {
        name: 'Model UN & World Quest',
        text: 'Model UN is a Middle School academic team, and Model UN and World Quest both count toward the certificate.',
      },
      {
        name: 'Global Education Badge',
        text: 'Teachers earn it with at least 100 hours of global professional development and a capstone, such as a new Winterm course or a student travel program. It is sponsored by the North Carolina Global Education Benchmark Group; 21 teachers earned it from 2017 to 2024, our count.',
      },
    ],
    rows: [
      {
        label: 'Faculty who travel',
        text: 'In 2026, the inaugural Helfrich Catalyst Fellowship sent a sixth-grade social studies teacher to Peru, and a Kimbrough award sent an Upper School English teacher to Finland, joined by a colleague with a World Affairs Council grant.',
      },
    ],
    sources: [
      { label: 'cannonschool.org — International Programs', url: IP },
      { label: 'cannonschool.org — Global Studies Mastery Credits (PDF)', url: GSMC },
      { label: 'cannonschool.org — Middle School Student Life', url: MSL },
      { label: 'cannonschool.org — Faculty travel awards, 2026', url: N_FAC },
    ],
  },

  /* --------------------------------------------- verdict & ask the school -- */
  verdict: {
    headline:
      "Where the program stands out, and eleven questions the school's website doesn't answer yet — trip costs, aid, selection and safety.",
    standsOut: {
      summary:
        "Cannon's global program is small and centred on the Upper School, but it offers something most Charlotte schools do not — a Global Studies Certificate with published requirements — and global language learning from Junior Kindergarten.",
      points: [
        'A certificate awarded at Senior Night, with a required senior capstone course',
        'Spanish from Junior Kindergarten and a three-language choice in 5th grade',
        'Two years of TECHO service builds in Latin America',
        'Teachers trained through a 100-hour Global Education Badge',
      ],
    },
    ask: [
      {
        topic: 'Starting grade.',
        question:
          'What is the earliest grade for international travel, and is the Middle School Costa Rica trip offered every year?',
      },
      {
        topic: '2026–27 trips.',
        question: 'Which trips are planned for 2026–27? No trip list is published.',
      },
      {
        topic: 'Cost.',
        question: 'What does a trip cost, and what does it include? No trip price is published.',
      },
      {
        topic: 'Aid.',
        question:
          'Financial aid covers "Required overnight class trips". Do aid or the John Riley Endowment for Science, Service, and Travel cover optional trips abroad?',
      },
      {
        topic: 'Selection.',
        question:
          'The Dominican Republic trip selected students by interview. How are places decided on other trips, and when a trip is oversubscribed?',
      },
      {
        topic: 'Safety.',
        question: 'Which travel vendors are used, what insurance is carried, and what are the chaperone ratios?',
      },
      {
        topic: 'China sister school.',
        question: 'Is an exchange with a sister school in China still active?',
      },
      {
        topic: 'Certificate rules.',
        question:
          'The earlier rules asked for two global experiences beyond the classroom. Does that still apply alongside the Global Studies Mastery Credits, and how many credits are required?',
      },
      {
        topic: 'Certificate earners.',
        question: 'How many seniors earn the Global Studies Certificate each year?',
      },
      {
        topic: 'Scale.',
        question: 'How many students travel abroad each year?',
      },
      {
        topic: 'International students.',
        question:
          "Does Cannon still enroll about ten international students a year in the Upper School, living with host families? The school's page on this dates from 2021.",
      },
    ],
    sources: [
      { label: 'cannonschool.org — Financial Aid', url: FA },
      { label: 'cannonschool.org — Endowment', url: ENDOW },
      { label: 'cannonschool.org — International Programs', url: IP },
      { label: 'cannonschool.org — Global Studies Mastery Credits (PDF)', url: GSMC },
      { label: 'cannonschool.org — Winterm in action: TECHO in the Dominican Republic, 2026', url: N_TECHO },
      { label: 'cannonschool.org — Learning beyond the classroom in Costa Rica, 2026', url: N_CR },
      { label: 'cannonschool.org — International Student Program', url: ISP },
    ],
  },
}
