// Davidson Day School — International Travel (displayed "Global Exposure").
//
// Built from the user's Claude deep-research PDF (transcribed alongside this
// record) and then VERIFIED fact by fact against live davidsonday.org pages on
// 2026-10-18, re-checked at implement time the same day. The PDF is a lead sheet
// only; the fact → URL record, including the implement-time checks and every
// spelling conflict, is
// source-material/international-travel/davidson-day/
//   Davidson Day - International Travel - Source URLs.md
//
// Rules this file follows (see ./README.md): every card's `sources` lists the
// specific pages behind its facts; gaps appear only in `verdict.ask`; no
// student, parent, teacher or trip leader is named; no trip price and no exact
// travel date is rendered (season and year only). Three things are new here:
//
//  - The school's International Travel page is GONE (404 since at least
//    2026-10-18; the Student Life tile now links to the Global Studies Diploma
//    Distinction page). Its facts cite the Feb and Mar 2026 Wayback copies, as do
//    the older Global Studies Diploma Program and International Research pages.
//  - AFAR's grade bands and group sizes on the 2026–27 rows come from goafar.org
//    and are credited "per AFAR" (user decision, 2026-10-18) — the one third-party
//    figure in the section. AFAR's prices and session dates never render.
//  - `exchanges`, `signup` and `community` are omitted: no exchange or homestay,
//    no school sign-up deadline and fewer than three community facts are published.

import type { InternationalTravelProgram } from '../internationalTravel.ts'

const DDS = 'https://www.davidsonday.org'
const BLOG = `${DDS}/p/~board/all-blogs/post`

const GSD = `${DDS}/academics/diploma-distinctions/global-studies`
const DIST = `${DDS}/academics/diploma-distinctions`
const B_2026 = `${BLOG}/four-students-three-countries-one-summer-of-fieldwork`
const B_2024 = `${BLOG}/from-excavations-to-presentations-davidson-days-global-studies-diploma-and-afar-program`
const B_SPACH = `${BLOG}/making-history-uncovering-history-davidson-day-afar-and-the-adam-spach-rock-house`
const B_DD = `${BLOG}/developing-college-work-and-world-ready-graduates-diploma-distinctions`
const MS = `${DDS}/academics/middle-school`
const US = `${DDS}/academics/upper-school`
const CC = `${DDS}/student-life/community-and-culture`
const DIR = `${DDS}/directory`
const SL = `${DDS}/student-life`
const TUI = `${DDS}/admission/tuition-and-affordability`
// The International Travel page and the older Global Studies Diploma Program and
// International Research pages are 404 on the live site; these snapshots hold them.
const WB_IT_FEB =
  'https://web.archive.org/web/20260212070934/https://www.davidsonday.org/student-life/international-travel'
const WB_IT_MAR =
  'https://web.archive.org/web/20260307062843/https://www.davidsonday.org/student-life/international-travel'
const WB_GSDP =
  'https://web.archive.org/web/20260213093525/https://www.davidsonday.org/academics/global-studies-diploma-program'
const WB_GSDP_25 =
  'https://web.archive.org/web/20251110231108/https://www.davidsonday.org/student-life/global-studies-diploma-program'
const WB_IR =
  'https://web.archive.org/web/20240813162628/https://www.davidsonday.org/student-life/global-studies-diploma-program/international-research'
// AFAR's own project pages — cited only for the grade bands and group sizes.
const AFAR_ES = 'https://www.goafar.org/project-spain'
const AFAR_PT = 'https://www.goafar.org/project-portugal'
const AFAR_BZ = 'https://www.goafar.org/belize-campus'

export const davidsonDay: InternationalTravelProgram = {
  lead: {
    strong:
      "Davidson Day's travel is AFAR, the American Foreign Academic Research archaeology field school, which sends students each summer to dig alongside professional archaeologists in Spain, Portugal and Belize, and to present their research at university conferences.",
    muted:
      'It pairs with the Global Studies Diploma Distinction, an Upper School pathway offered since 2021, in which most students take part in AFAR.',
  },

  stats: [
    {
      value: '3',
      label: 'countries with AFAR digs',
      note: 'Spain, Portugal and Belize, per the school',
    },
    {
      value: '20',
      label: 'seasons at Cahal Pech',
      note: '2006–2026, in western Belize, per the school',
    },
    {
      value: '10',
      label: 'students presented at Mount Royal University',
      note: 'in Calgary, fall 2024, nine of them in the Global Studies Diploma',
    },
    {
      value: '2021',
      label: 'Global Studies Diploma Distinction began',
      note: 'per the school',
    },
  ],

  /* ----------------------------------------------------- where they go -- */
  trips: {
    headline:
      'Nine AFAR digs over three summers — 2024, 2026 and the announced 2027 — in Spain, Portugal and Belize.',
    intro: {
      strong:
        'Students work alongside professional archaeologists at each site, with lectures and excursions built into the day.',
      muted:
        "The school's International Travel link now leads to its Global Studies Diploma Distinction page, so the newest trip details come from a fall 2026 school story.",
    },
    years: [
      {
        year: '2026–27',
        note: 'Summer 2027, as announced',
        trips: [
          {
            dest: 'Spain',
            place: 'Zorita de los Canes',
            div: 'US',
            group: '8th–12th grade · up to 18 students per session, per AFAR',
            theme: 'Excavating the medieval castle of Zorita',
            timing: 'Summer 2027',
          },
          {
            dest: 'Portugal',
            place: 'Tróia',
            div: 'US',
            group: '10th–12th grade · 18 students per session, per AFAR',
            theme: 'A Roman fish-salting town on the coast, preserved under the sand',
            timing: 'Summer 2027',
          },
          {
            dest: 'Belize',
            place: 'Baking Pot',
            div: 'US',
            group: '9th–12th grade · up to 18 students, per AFAR',
            theme: "AFAR's first season at a new Maya site, about 20 minutes upriver from Cahal Pech",
            timing: 'Summer 2027',
          },
        ],
      },
      {
        year: '2025–26',
        note: 'Summer 2026',
        trips: [
          {
            dest: 'Spain',
            place: 'Zorita de los Canes',
            div: 'US',
            theme: "The project's 11th field season · two of the castle's rooms and an underground chamber",
            timing: 'Summer 2026',
          },
          {
            dest: 'Portugal',
            place: 'Tróia',
            div: 'US',
            theme: 'The ancient Roman city, where AFAR has worked since 2018',
            timing: 'Summer 2026',
          },
          {
            dest: 'Belize',
            place: 'Cahal Pech',
            div: 'US',
            theme: 'The last of 20 seasons at the Maya site',
            timing: 'Summer 2026',
          },
        ],
      },
      {
        year: '2023–24',
        note: 'Summer 2024',
        trips: [
          {
            dest: 'Belize',
            place: 'Cahal Pech',
            div: 'US',
            theme: 'The western ball court beside the royal palace plaza · research later presented in Calgary',
            timing: 'Summer 2024',
          },
          {
            dest: 'Portugal',
            place: 'Tróia',
            div: 'US',
            theme: 'The Roman fish-salting factory · research later presented in Calgary',
            timing: 'Summer 2024',
          },
          {
            dest: 'Spain',
            place: 'Zorita de los Canes',
            div: 'US',
            theme: 'The medieval castle above the Tagus River · research later presented in Calgary',
            timing: 'Summer 2024',
          },
        ],
      },
    ],
    photo: {
      src: '/travel/davidson-day-troia-2026.jpg',
      alt: 'Davidson Day AFAR students and archaeologists at the Tróia excavation in Portugal',
      caption: {
        title: 'Tróia, Portugal',
        text: 'The AFAR team at the Roman site of Tróia, summer 2026.',
      },
      credit: 'Photo: Davidson Day School',
    },
    alsoOnRecord: [
      {
        lead: 'Middle School, Spain & France.',
        text: "In early 2026 the school's travel page described a summer language and cultural immersion trip to Madrid, Toledo and Paris, with a Flamenco evening and a Paris cooking class; it is gone from later copies of the page.",
      },
      {
        lead: 'Greece, 2017–18.',
        text: 'AFAR dug at Mieza, the ancient Macedonian city, in its 2017 and 2018 research trips.',
      },
      {
        lead: 'North Carolina, November 2024.',
        text: '13 students worked on the Adam Spach Rock House excavation in Winston-Salem, the first high school students to work on a site with the North Carolina State Historic Preservation Office, per the school.',
      },
    ],
    sources: [
      { label: 'davidsonday.org — Four Students, Three Countries, One Summer of Fieldwork, 2026', url: B_2026 },
      { label: 'davidsonday.org — From Excavations to Presentations, 2024', url: B_2024 },
      { label: 'davidsonday.org — Making History, Uncovering History, 2025', url: B_SPACH },
      { label: 'International Travel (Wayback, Mar 2026)', url: WB_IT_MAR },
      { label: 'International Travel (Wayback, Feb 2026)', url: WB_IT_FEB },
      { label: 'International Research (Wayback, Aug 2024)', url: WB_IR },
      { label: 'goafar.org — Spain', url: AFAR_ES },
      { label: 'goafar.org — Portugal', url: AFAR_PT },
      { label: 'goafar.org — Belize', url: AFAR_BZ },
    ],
  },

  /* ----------------------------------------- global learning at each level -- */
  start: {
    headline:
      'Spanish from Early Childhood, Upper School language classes for Middle Schoolers who are ready, and AFAR digs and a research distinction in the Upper School.',
    intro: {
      strong:
        'The school says its curriculum equips students with real-world-ready skills so they will be prepared to lead on the global stage.',
      muted: 'Travel begins in the Upper School, through AFAR.',
    },
    divisions: [
      {
        name: 'Early Childhood & Lower School',
        grades: 'EC–4',
        items: ['Spanish from Early Childhood, which starts at age two, taught by an Early Childhood & Lower School Spanish teacher'],
      },
      {
        name: 'Middle School',
        grades: '5–8',
        items: [
          'Spanish, taught by a Middle School Spanish teacher',
          'Students ready for the next level take world language classes in the Upper School',
        ],
      },
      {
        name: 'Upper School',
        grades: '9–12',
        items: [
          "AFAR's summer digs in Spain, Portugal and Belize",
          'The Global Studies Diploma Distinction, applied for at the end of sophomore year',
          'AP Spanish and AP French Language & Culture',
          'Honors Anthropology, then Research Methods Honors in 11th grade and Capstone Research Honors Mentorship in 12th',
        ],
      },
    ],
    sources: [
      { label: 'davidsonday.org — Upper School', url: US },
      { label: 'davidsonday.org — Middle School', url: MS },
      { label: 'davidsonday.org — Directory', url: DIR },
      { label: 'davidsonday.org — Global Studies Diploma Distinction', url: GSD },
      { label: 'davidsonday.org — Developing College, Work and World-Ready Graduates', url: B_DD },
      { label: 'International Travel (Wayback, Mar 2026)', url: WB_IT_MAR },
    ],
  },

  /* ---------------------------------- the global studies diploma distinction -- */
  credential: {
    headline:
      'An Upper School distinction since 2021: Honors Anthropology, four global APs, a language, a 100-hour practicum and two years of original research, presented by every senior.',
    intro: {
      strong:
        'The Global Studies Diploma Distinction "prepares students to understand an increasingly interconnected world through rigorous academic study, language immersion, and transformative international experiences."',
      muted:
        "It is one of three Diploma Distinctions: students apply at the end of sophomore year and spend two years going deep.",
    },
    stats: [
      { value: '2021', label: 'offered since', note: 'per the school' },
      { value: '4', label: 'global AP electives', note: 'chosen from six options' },
      {
        value: '100',
        label: 'practicum hours',
        note: 'at least, in an approved internship, volunteer opportunity or pre-collegiate program',
      },
    ],
    required: [
      'Honors Anthropology',
      'Four of: AP World History or AP European History, AP Environmental Science, AP Psychology, AP Macroeconomics, AP with WE Service Recognition, and AP Spanish or AP French Language & Culture',
      'Level IV, or three levels of the same language in the Upper School',
      'At least 100 practicum hours, plus quarterly Ethics Labs',
      'Research Methods Honors in 11th grade and Capstone Research Honors Mentorship in 12th grade',
      'A capstone presentation at the Davidson Day Scholars Research Conference',
    ],
    beyond: [
      'AFAR field research in Spain, Portugal or Belize, which most students in the distinction take',
      'Practicum experiences that often include international travel, research, language immersion or cross-cultural service',
      "Presenting research at academic conferences, such as Mount Royal University's in Calgary",
    ],
    sources: [
      { label: 'davidsonday.org — Global Studies Diploma Distinction', url: GSD },
      { label: 'davidsonday.org — Diploma Distinctions', url: DIST },
      { label: 'davidsonday.org — Developing College, Work and World-Ready Graduates', url: B_DD },
      { label: 'davidsonday.org — From Excavations to Presentations, 2024', url: B_2024 },
    ],
  },

  /* ------------------------------------- afar & the archaeology conferences -- */
  network: {
    headline:
      'AFAR, its partner projects and its own Maya conferences, with students presenting their research at university conferences from Calgary to Helsinki.',
    intro: {
      strong:
        "AFAR is the school's partnering archaeology field school. Per the school, it has run for more than 20 years, and more than 500 students from across its program have taken part in its projects.",
      muted:
        'Students present at academic conferences to close the scientific cycle, and AFAR hosts conferences of its own.',
    },
    ledgerTitle: 'Academic conferences',
    conferences: [
      {
        year: '2025–26',
        text: "Opportunities offered this school year: Mount Royal University's archaeology conference in Calgary and Banff · a Maya-themed conference at Disney's Coronado Springs Resort in Florida, hosted by AFAR and other archaeologists · excavations in Friedberg, North Carolina",
      },
      {
        year: '2024–25',
        text: 'Mount Royal University, Calgary · 10 students gave three presentations on their summer 2024 research',
      },
      {
        year: '2019–20',
        text: 'A collaborative keynote lecture and presentation at a conference hosted by the National Museum of Finland in Helsinki, early 2020',
      },
    ],
    cells: [
      {
        name: 'AFAR',
        text: "The school's partnering international archaeological field school, listed among its community partnerships.",
      },
      {
        name: "AFAR's conferences",
        text: 'AFAR hosts two international conferences on Maya archaeology each year, with student research presentations and workshops; Maya at the Playa has been held virtually.',
      },
      {
        name: 'NC State Historic Preservation Office',
        text: 'The 2024 Adam Spach Rock House dig in Winston-Salem, worked with the Environmental Research Group.',
      },
      {
        name: 'Belize Valley Archaeological Reconnaissance Project',
        text: "AFAR's Belize project, the longest-running and most physically demanding in its lineup.",
      },
    ],
    rows: [
      {
        label: 'For alumni',
        text: "Pook's Hill in Belize is an AFAR project open only to Davidson Day alumni; in 2026 a recent graduate served as one of its two lab directors.",
      },
    ],
    sources: [
      { label: 'davidsonday.org — Four Students, Three Countries, One Summer of Fieldwork, 2026', url: B_2026 },
      { label: 'davidsonday.org — Community and Culture', url: CC },
      { label: 'davidsonday.org — From Excavations to Presentations, 2024', url: B_2024 },
      { label: 'davidsonday.org — Making History, Uncovering History, 2025', url: B_SPACH },
      { label: 'Global Studies Diploma Program (Wayback, Feb 2026)', url: WB_GSDP },
      { label: 'Global Studies Diploma Program (Wayback, Nov 2025)', url: WB_GSDP_25 },
      { label: 'International Research (Wayback, Aug 2024)', url: WB_IR },
      { label: 'International Travel (Wayback, Mar 2026)', url: WB_IT_MAR },
    ],
  },

  /* ------------------------------------------------- firsts & milestones -- */
  milestones: {
    headline:
      'Twenty years of AFAR, from the first season at Cahal Pech in 2006 to a new Maya site in 2027.',
    intro: {
      strong: 'The school dates AFAR to 2006 and its Global Studies Diploma Distinction to 2021,',
      muted: 'with a North Carolina first along the way — each below as the school states it.',
    },
    events: [
      {
        year: '2006',
        title: 'AFAR begins',
        text: 'Research starts at the Maya site of Cahal Pech in western Belize.',
      },
      {
        year: '2015',
        title: 'The western ball court',
        text: 'Work at Cahal Pech turns to the ball court beside the royal palace plaza.',
      },
      {
        year: '2017',
        title: 'Greece',
        text: 'AFAR begins at Mieza, the ancient Macedonian city.',
      },
      {
        year: '2018',
        title: 'Portugal',
        text: 'Research begins at the Roman city of Tróia.',
      },
      {
        year: '2020',
        title: 'Helsinki',
        text: 'Students give a collaborative keynote lecture and presentation at a conference hosted by the National Museum of Finland.',
      },
      {
        year: '2021',
        title: 'The Global Studies Diploma',
        text: 'The distinction is first offered.',
      },
      {
        year: '2024',
        title: 'A North Carolina first',
        text: 'The first high school students on a dig with the North Carolina State Historic Preservation Office, per the school.',
      },
      {
        year: '2026',
        title: 'Cahal Pech ends',
        text: 'The 20th and final season at the site.',
      },
      {
        year: '2027',
        title: 'Baking Pot',
        text: 'The Belize project moves to a new Maya site.',
      },
    ],
    sources: [
      { label: 'International Research (Wayback, Aug 2024)', url: WB_IR },
      { label: 'International Travel (Wayback, Mar 2026)', url: WB_IT_MAR },
      { label: 'davidsonday.org — Global Studies Diploma Distinction', url: GSD },
      { label: 'davidsonday.org — Making History, Uncovering History, 2025', url: B_SPACH },
      { label: 'davidsonday.org — Four Students, Three Countries, One Summer of Fieldwork, 2026', url: B_2026 },
    ],
  },

  /* --------------------------------------------- verdict & ask the school -- */
  verdict: {
    headline:
      "Where the program stands out, and thirteen questions the school's website doesn't answer yet — trip costs, aid, grades and safety.",
    standsOut: {
      summary:
        "Davidson Day's global program is unlike any other school's here: its travel is archaeological research rather than touring. Students dig alongside professionals in Spain, Portugal and Belize, and present their findings at university conferences, inside a two-year Upper School research distinction.",
      points: [
        'Summer field research at three active sites, one of them on record for 20 seasons',
        'Student research presented at Mount Royal University — 10 students in fall 2024',
        'A credential with two years of original research and a senior capstone',
        'The first high school dig with the North Carolina State Historic Preservation Office, per the school',
      ],
    },
    ask: [
      {
        topic: 'Travel page.',
        question: "The school's International Travel page has been removed. Where does it now publish its trips?",
      },
      {
        topic: 'Middle School.',
        question: 'Does the Middle School summer trip to Spain and France still run, and from what grade?',
      },
      {
        topic: 'Grades.',
        question: 'AFAR sets its own grade bands. What is the earliest grade a Davidson Day student can join a dig?',
      },
      {
        topic: 'Cost.',
        question: 'What does a dig cost a Davidson Day family, and what does the Field Experience fee cover?',
      },
      {
        topic: 'Aid.',
        question: "Does the school's financial aid cover AFAR or any trip, beyond AFAR's own assistance?",
      },
      {
        topic: 'Selection.',
        question: 'How are places decided when a session fills?',
      },
      {
        topic: 'Safety.',
        question: 'What are the chaperone ratios and insurance arrangements, and who leads each trip?',
      },
      {
        topic: 'Exchanges.',
        question: 'Is there any exchange, sister school or homestay?',
      },
      {
        topic: 'Research requirement.',
        question:
          'The older program page required two weeks of international field research. Does the Distinction still require it?',
      },
      {
        topic: 'Graduates.',
        question: 'How many students have earned the Global Studies Diploma Distinction since 2021?',
      },
      {
        topic: 'Scale.',
        question: 'How many Davidson Day students go on AFAR each summer?',
      },
      {
        topic: 'Beyond archaeology.',
        question:
          'The school says international service trips and language immersion programs will come as the pathway matures. When?',
      },
      {
        topic: 'Continuity.',
        question: "The program is led by AFAR's founder. How is it staffed and led beyond one person?",
      },
    ],
    sources: [
      { label: 'davidsonday.org — Global Studies Diploma Distinction', url: GSD },
      { label: 'davidsonday.org — Student Life', url: SL },
      { label: 'davidsonday.org — Tuition and Affordability', url: TUI },
      { label: 'International Travel (Wayback, Feb 2026)', url: WB_IT_FEB },
      { label: 'Global Studies Diploma Program (Wayback, Feb 2026)', url: WB_GSDP },
      { label: 'davidsonday.org — From Excavations to Presentations, 2024', url: B_2024 },
    ],
  },
}
