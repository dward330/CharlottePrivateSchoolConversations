// Providence Day School — International Travel.
//
// Transcribed from the Claude Design reference build ("Providence Day
// School.dc.html", #travel) and then VERIFIED fact by fact against live pages
// on 2026-10-11. The design copy was written from an AI-generated research
// dossier, so it is a lead sheet only: where a live page words a fact
// differently, the live page wins, and a fact no page supports is not here.
// The fact → URL record, including every correction, is
// source-material/international-travel/providence-day/
//   Providence Day - International Travel - Source URLs.md
//
// Rules this file follows (see ./README.md): every card's `sources` lists the
// specific pages behind its facts; gaps appear only in `verdict.ask`; conflicts
// between the school's own pages are shown as ranges; no student is named.

import type { InternationalTravelProgram } from '../internationalTravel.ts'

const GE = 'https://www.providenceday.org/the-pd-difference/global-education'
const MAP = 'https://www.providenceday.org/the-pd-difference/global-education/global-map'
const LS = 'https://www.providenceday.org/lower-school/global-education'
const MS = 'https://www.providenceday.org/middle-school/global-education'
const US = 'https://www.providenceday.org/upper-school/global-education'
const ADM = 'https://www.providenceday.org/admissions/why-providence-day'
const ACAD = 'https://www.providenceday.org/the-pd-difference/academics'
const GSD = 'https://www.providenceday.org/global-studies-diploma'
const GSD_INFO = 'https://sites.google.com/providenceday.org/gsd-homepage/general-information'
const GSD_FAQ = 'https://sites.google.com/providenceday.org/gsd-homepage/general-information/faq'
const GSD_ALUMNI = 'https://sites.google.com/providenceday.org/gsd-homepage/alumni'
const GSD_HOME = 'https://sites.google.com/providenceday.org/gsd-homepage/home'
const ENDOW = 'https://www.providenceday.org/philanthropy/endowment'
const STRATEGY = 'https://www.providenceday.org/the-pd-difference/leadership/strategic-framework'
const CALENDAR = 'https://www.providenceday.org/calendars'
const RS_DUBAI = 'https://www.roundsquare.org/articles/rsic2025-dubai/'
const LS_NEWS =
  'https://www.providenceday.org/about/pd-communications/news-media/post/~board/news-media/post/the-lower-school-makes-global-connections-through-round-square'
const NEWS_2014 = 'https://www.providenceday.org/cf_news/view.cfm?newsid=27'
// The school redesigned these two pages in 2026; the facts below survive only
// in the snapshot taken before the redesign.
const LS_WAYBACK =
  'https://web.archive.org/web/20260421200148/https://www.providenceday.org/lower-school/global-education'
const US_WAYBACK =
  'https://web.archive.org/web/20260421204110/https://www.providenceday.org/upper-school/global-education'
// The three June 2027 Upper School trips. The slugs say 2026, but the trips run
// in May–June 2027 (school year 2026–27).
const TRIP_JAPAN_27 = 'https://www.providenceday.org/japan-2026-us'
const TRIP_ICELAND_27 = 'https://www.providenceday.org/iceland-2026-us'
const TRIP_FRANCE_27 = 'https://www.providenceday.org/france-2026-us'

export const providenceDay: InternationalTravelProgram = {
  lead: {
    strong:
      'One TK–12 Global Education program — "Inward. Outward. Forward." — with student travel abroad in Middle and Upper School, reciprocal exchanges with partner schools, and what the school calls the first Global Studies Diploma in the nation.',
    muted:
      'The school\'s Strategic Framework counts Providence Day as one of just six schools nationwide to offer a Global Studies Diploma and to be a Round Square school.',
  },

  stats: [
    {
      value: '~19',
      label: 'countries & territories',
      note: "reached by student trips and exchanges, 2021–25 — our count from the school's Global Map",
    },
    {
      value: '8',
      label: 'exchange partner schools',
      note: 'in Colombia, Peru, Australia, South Africa, Germany, Bermuda and France',
    },
    {
      value: '1st',
      label: 'Global Studies Diploma',
      note: 'the first in the nation, per the school — an optional second diploma, grades 9–12',
    },
    {
      value: '280+',
      label: 'Round Square schools',
      note: 'in 50 countries — PD has been a Global Member for over a decade',
    },
  ],

  /* ----------------------------------------------------- where they go -- */
  trips: {
    headline:
      'Eighteen trips abroad across the 2022–23 to 2026–27 school years — including three Upper School trips planned for June 2027 — from Round Square conferences and service projects to language-immersion trips with host-family stays and science expeditions. Filter by division.',
    intro: {
      strong:
        'Trips run from one-week conferences to summer immersions, with groups of 2 to 16 students.',
      muted:
        'Faculty lead trips over spring break and in the summer. Middle School students can also travel to a Middle School Round Square conference and on a summer PD trip.',
    },
    years: [
      {
        year: '2026–27',
        note: 'planned for summer 2027',
        trips: [
          {
            dest: 'Japan',
            place: 'Tokyo, Hiroshima + Miyajima — "Continuity and Change"',
            div: 'US',
            group: 'grades 9–11',
            theme: 'Tradition and reinvention · remembrance and the work of peace',
            timing: 'June 4–13, 2027',
          },
          {
            dest: 'Iceland',
            place: 'Reykjavík, the Golden Circle + the south coast — "A Living Lab for the Planet’s Future"',
            div: 'US',
            group: 'grades 9–11',
            theme: 'Glaciers and a warming world · geothermal energy · the UN SDGs',
            timing: 'June 1–8, 2027',
          },
          {
            dest: 'France',
            place: 'Montpellier (Lycée Notre Dame de la Merci) + Paris — "Layers of History & Culture"',
            div: 'US',
            group: 'grades 9–11',
            theme: 'Exchange week with host families, then Paris · no French required',
            timing: 'May 29 – June 9, 2027',
            homestay: 'Montpellier',
          },
        ],
      },
      {
        year: '2025–26',
        note: 'dated by Round Square',
        trips: [
          {
            dest: 'United Arab Emirates',
            place: 'Dubai — the 57th Round Square International Conference',
            div: 'US',
            theme: 'Conference · environmental issues',
          },
        ],
      },
      {
        year: '2024–25',
        trips: [
          {
            dest: 'Colombia',
            place:
              'Round Square International Conference, "Blooming from the Past" · Amazon pre-conference · Boyacá',
            div: 'US',
            group: '6 students',
            theme: 'Conference · cultural',
            timing: 'Includes a four-day Amazon pre-conference',
            homestay: 'Bogotá',
          },
          {
            dest: 'England',
            place:
              'Milton Abbey School Round Square conference, "Leadership and Adventure" · Dorset + London',
            div: 'MS',
            group: '6 students',
            theme: 'Conference · leadership · adventure',
            timing: 'One week',
          },
          {
            dest: 'Ecuador',
            place: 'Galápagos Islands',
            div: 'MS',
            group: '10 students',
            theme: 'Evolution · biodiversity · environmental sustainability',
          },
          {
            dest: 'Denmark & Sweden',
            place: 'The Scandinavia trip',
            div: 'US',
            group: '10 students',
            theme: 'Design · sustainability · urban innovation',
          },
          {
            dest: 'South Korea',
            place: 'Cheongshim International Academy Model UN',
            div: 'US',
            group: '12 students',
            theme: 'Model UN abroad · history · culture',
          },
          {
            dest: 'South Africa',
            place: 'Round Square International Service Project',
            div: 'US',
            group: '2 students',
            theme: 'Service — a permanent kindergarten building, beekeeping',
          },
        ],
      },
      {
        year: '2023–24',
        trips: [
          {
            dest: 'Kenya',
            place: 'Nairobi — Round Square conference, "The New Africa" + Maasai Mara pre-conference',
            div: 'US',
            group: '5 delegates',
            theme: 'Conference',
          },
          {
            dest: 'Thailand',
            place: 'Kui Buri National Park — Round Square Big Build',
            div: 'US',
            group: '4 students + 2 faculty',
            theme: 'Service · human/wildlife coexistence',
          },
          {
            dest: 'Greece',
            div: 'MS',
            theme: 'Mythology · archaeology · philosophy',
            timing: 'Summer 2024',
          },
          {
            dest: 'Japan',
            div: 'US',
            theme: 'Tradition and technology · anime · sustainability',
          },
          {
            dest: 'Iceland',
            div: 'US',
            theme: 'Climate change · environment',
          },
        ],
      },
      {
        year: '2022–23',
        trips: [
          {
            dest: 'United Kingdom',
            place: 'Oxford + the Wales coast — Round Square conference, "Take Less: Be More"',
            div: 'US',
            theme: 'Conference · sustainability (coasteering, Bug Farm)',
          },
          {
            dest: 'Spain',
            place: 'Seville + Granada, Cádiz, Madrid',
            div: 'US',
            theme: 'Language and cultural immersion with daily language classes',
            timing: 'Summer 2023',
            homestay: 'Seville',
          },
          {
            dest: 'France',
            place: 'Montpellier (Lycée Notre Dame de la Merci) + Paris',
            div: 'US',
            theme: 'Language exchange (reciprocal)',
            homestay: 'Montpellier',
          },
        ],
      },
    ],
    photo: {
      src: '/travel/providence-day-seville-2023.jpg',
      alt: 'Providence Day students on the 2023 summer trip to Spain',
      caption: {
        title: 'Spain, summer 2023',
        text: 'The Spain trip paired a Seville host family and daily language classes with visits to Granada, Cádiz and Madrid.',
      },
      credit: 'Photo: Providence Day School',
    },
    alsoOnRecord: [
      {
        lead: 'Jordan, every year.',
        text: 'A named endowment funds annual trips to the International Academy of Amman, a fellow Round Square member school.',
      },
      {
        lead: 'Performing arts in London.',
        text: 'Upper School students with a passion for the arts traveled to London to explore the history of the performing arts.',
      },
      {
        lead: 'Closer to home.',
        text: 'Alaska ("Off the Map") and Puerto Rico ("Community, Culture, and Comida") in Upper School; Arizona, California, Hawaii and a Round Square conference in Atlanta in Middle School.',
      },
      {
        lead: 'Earlier years.',
        text: 'A 2014 school news post describes one teacher\'s three summer art history trips — Italy, France, and Greece and Turkey — and student trips to Southeast Asia, Cambodia, Thailand, South Africa and Morocco.',
      },
    ],
    sources: [
      { label: 'providenceday.org — Global Map', url: MAP },
      { label: 'providenceday.org — Global Education', url: GE },
      { label: 'providenceday.org — Middle School Global Education', url: MS },
      { label: 'providenceday.org — Upper School Global Education', url: US },
      { label: 'providenceday.org — Japan trip, June 2027', url: TRIP_JAPAN_27 },
      { label: 'providenceday.org — Iceland trip, June 2027', url: TRIP_ICELAND_27 },
      { label: 'providenceday.org — France trip, May–June 2027', url: TRIP_FRANCE_27 },
      { label: 'providenceday.org — Why Providence Day (photo, travel options)', url: ADM },
      { label: 'providenceday.org — Endowment', url: ENDOW },
      { label: 'providenceday.org — 2014 news post', url: NEWS_2014 },
      { label: 'roundsquare.org — 57th RSIC, Dubai', url: RS_DUBAI },
    ],
  },

  /* ----------------------------------------- when your child can start -- */
  start: {
    headline:
      'Global learning begins in TK with "TK Goes Global" and Round Square video exchanges; travel abroad opens in Middle School and widens in Upper School.',
    intro: {
      strong:
        'Global education runs through the student experience from Transitional Kindergarten through graduation,',
      muted: 'organized as a TK–12 framework called the PD Passport.',
    },
    framework: [
      { name: 'Inward', text: 'curiosity, self-awareness and an understanding of one\'s own perspectives' },
      { name: 'Outward', text: 'engaging with diverse cultures, viewpoints and communities' },
      { name: 'Forward', text: 'applying learning to contribute to a changing world' },
    ],
    divisions: [
      {
        name: 'Lower School',
        grades: 'TK–5',
        theme: 'Wonder + Awareness',
        items: [
          '"TK Goes Global" — a classroom tour of India, China, Germany, Peru and Kenya',
          'A project on a different area of the world in every grade, TK through 5',
          'Kindergarten connected virtually with Collingwood School, Canada',
          'Round Square\'s Worldwide Show and Tell',
          'A Spanish video exchange with Markham College, Peru',
        ],
      },
      {
        name: 'Middle School',
        grades: '6–8',
        theme: 'Exploration + Connection',
        items: [
          '**First trips abroad:** Greece (summer 2024), the Galápagos (2024–25), a Round Square conference in England (2024–25)',
          'A Middle School Round Square conference in Atlanta (2023–24), and trips to Arizona, California and Hawaii',
          'An 8th-grade Global Perspectives course',
        ],
      },
      {
        name: 'Upper School',
        grades: '9–12',
        theme: 'Leadership + Impact',
        items: [
          'Faculty-led spring break and summer trips',
          'Round Square international conferences and service projects',
          'Reciprocal exchanges of two to four weeks',
          'The optional Global Studies Diploma, starting in 9th grade',
        ],
      },
    ],
    languages: {
      title: 'The language path — an 11-year journey toward language proficiency',
      steps: [
        { when: 'From TK', text: 'Exposure to French, Spanish and Mandarin Chinese' },
        { when: 'By 2nd grade', text: 'Choose one language for the remaining four years of Lower School' },
        { when: 'Middle School', text: 'Latin and German are added' },
      ],
    },
    sources: [
      { label: 'providenceday.org — Global Education', url: GE },
      { label: 'providenceday.org — Academics (PD Passport, languages)', url: ACAD },
      { label: 'providenceday.org — Lower School Global Education', url: LS },
      { label: 'Lower School Global Education (Wayback, Apr 2026)', url: LS_WAYBACK },
      { label: 'providenceday.org — Lower School Round Square news', url: LS_NEWS },
      { label: 'providenceday.org — Middle School Global Education', url: MS },
      { label: 'providenceday.org — Upper School Global Education', url: US },
      { label: 'providenceday.org — Global Map', url: MAP },
      { label: 'providenceday.org — Why Providence Day', url: ADM },
    ],
  },

  /* -------------------------------------------- exchanges & homestays -- */
  exchanges: {
    headline:
      'Eight partner schools in seven countries, with stays of one to four weeks — most reciprocal, with the partner student later visiting Providence Day.',
    intro: {
      strong: 'Individual Round Square exchanges, logged on the Global Map from 2022–23 to 2024–25.',
      muted:
        'At PD, students have taken part in exchanges of two to four weeks, and most are reciprocal: the partner student later spends a similar period at Providence Day.',
    },
    partners: [
      { country: 'Colombia', years: '2022–25', school: 'Colegio Los Nogales', out: 'two weeks in March', in: 'two weeks, then three weeks' },
      { country: 'Peru', years: '2022–24', school: 'Colegio San Silvestre, Lima', out: 'four weeks', in: 'one month' },
      { country: 'Australia', years: '2023–25', school: 'Matthew Flinders School, Sunshine Coast', out: 'four weeks', in: 'a return visit' },
      { country: 'South Africa', years: '2024–25', school: 'Dainfern College', out: 'three weeks over the summer', in: 'in April' },
      { country: 'Germany', years: '2024–25', school: 'Landheim Ammersee', out: 'three weeks in March, boarding or homestay', in: 'expected in the fall' },
      { country: 'Germany', years: '2022–23', school: 'Schule Schloss Salem', out: 'one month', in: 'one month' },
      { country: 'Bermuda', years: '2022–23', school: 'Bermuda High School for Girls', out: 'two separate weeks in March' },
      {
        country: 'France',
        years: '2022–25',
        school: 'Lycée Notre Dame de la Merci, Montpellier',
        out: 'group exchange, then a three-week individual visit',
        in: '15 French students hosted by PD families',
      },
    ],
    photo: {
      src: '/travel/providence-day-colombia-exchange-2023.jpg',
      alt: 'A Providence Day exchange student with their host student in Colombia',
      caption: {
        title: 'Exchange in Colombia',
        text: 'A Providence Day exchange student with their host student in Colombia.',
      },
      credit: 'Photo: Providence Day School',
    },
    homestays: [
      {
        place: 'Bogotá, Colombia',
        text: 'Upper School students at the 2024–25 Round Square International Conference in Colombia stayed with host families in Bogotá.',
      },
      {
        place: 'Seville, Spain',
        text: 'On the summer 2023 trip to Spain, Upper School students had a host-family stay in Seville and took language classes every day.',
      },
      {
        place: 'Montpellier, France',
        text: 'On the reciprocal language exchange with Lycée Notre Dame de la Merci, PD students stayed with French host families.',
      },
    ],
    visitors: [
      'In 2022–23, a student from Finland joined PD\'s 11th grade for the spring semester, and a student from Germany joined the 10th grade for six weeks in the fall.',
    ],
    sources: [
      { label: 'providenceday.org — Global Map', url: MAP },
      { label: 'providenceday.org — Upper School Global Education', url: US },
      { label: 'providenceday.org — Why Providence Day (photos)', url: ADM },
    ],
  },

  /* ------------------------------------------- the global studies diploma -- */
  credential: {
    headline:
      'An optional second diploma for grades 9–12 — global coursework, four years of one language, travel or hosting, and a Global Leadership course.',
    intro: {
      strong:
        'At PD, the Global Studies Diploma is an optional second diploma that recognizes students who pursue advanced global learning throughout their Upper School experience.',
      muted:
        'Students typically begin in 9th grade, and can join later in Upper School under certain circumstances.',
    },
    stats: [
      { value: '~20', label: 'students earn it in a typical graduating class' },
      { value: '~375', label: 'students have received the GSD to date' },
      { value: 'B−', label: 'minimum grade in every required GSD course' },
    ],
    required: [
      'Global Civics',
      'World History (or AP World History)',
      'Comparative Government',
      '4 years of the same World Language',
      '2 Global Studies courses',
      '2.5 GSD elective credits',
      'Global Leadership',
    ],
    beyond: [
      'Traveling abroad and/or hosting exchange students',
      'Attending local global speaker events',
      'Presenting global experiences to peers',
      'Taking civic action',
      'Model UN, Round Square, Future Problem Solvers or World Quest',
      'An individual portfolio, plus an optional Global Ambassador distinction (since 2021)',
    ],
    quote: {
      text: 'Thanks to Global Education, she can think of herself "as more than a North Carolinian, more than an American, but as a human."',
      attribution:
        'A class of 2025 graduate, now at Columbia University, who "had never left the United States" when she started 9th grade — and has since "jumped off cliffs in Wales, met with students from Japan at Oxford University, and explored La Alhambra in Spain."',
    },
    award: {
      name: 'Distinguished Global Scholar Award',
      text: 'Given annually to an Upper School GSD candidate, who must maintain a GPA of 3.75 or higher. Funded by the Bessant/Clay Endowment for Global Education.',
    },
    sources: [
      { label: 'providenceday.org — Global Studies Diploma', url: GSD },
      { label: 'GSD site — General Information', url: GSD_INFO },
      { label: 'GSD site — FAQ', url: GSD_FAQ },
      { label: 'GSD site — Alumni', url: GSD_ALUMNI },
      { label: 'GSD site — Home (portfolio)', url: GSD_HOME },
      { label: 'providenceday.org — Global Education (alumna, 9th-grade start)', url: GE },
      { label: 'providenceday.org — Endowment (award)', url: ENDOW },
    ],
  },

  /* --------------------------------------- round square & the wider network -- */
  network: {
    headline:
      'A Round Square Global Member feeding international conferences, service projects and online student dialogues — taught by faculty who travel for a certificate of their own.',
    intro: {
      strong: 'Round Square is a network of 280+ like-minded schools in 50 countries on six continents.',
      muted:
        'PD is one of only two Round Square schools in North Carolina. A 2019 Southern Association of Independent Schools accreditation committee called Providence Day "a national leader in the field of Global Education."',
    },
    ledgerTitle: 'Round Square conferences PD has attended',
    conferences: [
      { year: '2025', text: 'Dubai, the 57th Round Square International Conference' },
      {
        year: '2024–25',
        text: 'Colombia, "Blooming from the Past" · England (Middle School), "Leadership and Adventure"',
      },
      { year: '2023–24', text: 'Kenya, "The New Africa" · Atlanta (Middle School), "Imagine the Future"' },
      { year: '2022–23', text: 'Oxford + the Wales coast, "Take Less: Be More"' },
    ],
    cells: [
      {
        name: 'Postcards',
        text: 'Online student discussions. "Food is Love" drew 19 schools from 10 countries (2023–24); "What\'s Trending" drew 19 schools from 9 countries (2024–25).',
      },
      {
        name: 'Big Builds',
        text: 'Service projects abroad — in Thailand, 4 students and 2 faculty worked on human/wildlife coexistence at Kui Buri National Park.',
      },
      {
        name: 'Speakers at home',
        text: 'GSD students have met speakers such as H.E. Masood Khan, Ambassador of Pakistan to the U.S., at an Ambassador Series luncheon.',
      },
    ],
    rows: [
      {
        label: 'Faculty who travel',
        text: 'Since 2006, the Global Educator Certificate has involved language study, travel to at least two different countries and cultures, and sharing what was learned with the school. Faculty trips on the Global Map include Uruguay, South Korea, Switzerland, Israel, Italy and Central Europe, Germany, Morocco, Japan and Thailand.',
      },
      {
        label: 'Also a member of',
        text: 'The Institute for Global Learning. Upper School students can also take part in Global Online Academy.',
      },
    ],
    sources: [
      { label: 'providenceday.org — Global Education', url: GE },
      { label: 'providenceday.org — Global Map', url: MAP },
      { label: 'providenceday.org — Why Providence Day (SAIS, certificate)', url: ADM },
      { label: 'providenceday.org — Upper School Global Education', url: US },
      { label: 'Upper School Global Education (Wayback, Apr 2026 — Big Builds)', url: US_WAYBACK },
      { label: 'providenceday.org — Global Studies Diploma (speakers)', url: GSD },
      { label: 'roundsquare.org — 57th RSIC, Dubai', url: RS_DUBAI },
    ],
  },

  /* ----------------------------------------------------------- signing up -- */
  signup: {
    headline:
      'Registration for the June 2027 trips opens October 16 and closes November 2, with a virtual information session in between, aid decisions in mid-November and required orientations for new GSD students.',
    intro: {
      strong:
        'Registration for global trips opens October 16, 2026, and closes November 2, when the nonrefundable deposit and any financial aid application are also due.',
      muted:
        'Both trip events are on the school\'s Global Education calendar. Global trips are for Middle and Upper School students; the GSD events are for Upper School students in the program, who typically begin it in 9th grade. The three published 2027 trips are Upper School only, for students in grades 9–11 when they register. A nonrefundable deposit is due at registration, and the balance can be paid in full or in two installments. Japan and Iceland take 10 to 16 students and France 8 to 14, with a waitlist after that. Limited financial aid is available toward one global trip during a student\'s time at Providence Day.',
    },
    groups: [
      {
        title: 'Global Trips',
        note: '2026–27',
        events: [
          {
            when: 'October 16, 2026 · All day',
            name: 'Global Trip Registration Opens',
            audience: 'Middle & Upper School · grades 6–12',
          },
          {
            when: 'October 22, 2026 · 6:30–7:00 PM',
            name: 'Global Trips Virtual Information Session',
            detail: 'Online, via Google Meet',
            audience: 'Middle & Upper School · grades 6–12',
          },
          {
            when: 'November 2, 2026',
            name: 'Registration, nonrefundable deposit and financial aid application due',
            audience: 'Upper School · grades 9–11',
          },
          {
            when: 'November 19, 2026',
            name: 'Trip status letters sent to families',
            audience: 'Upper School · grades 9–11',
          },
          {
            when: 'December 1, 2026',
            name: 'First payment due',
            audience: 'Upper School · grades 9–11',
          },
          {
            when: 'January 25, 2027',
            name: 'PDS travel forms due',
            audience: 'Upper School · grades 9–11',
          },
          {
            when: 'February 1, 2027',
            name: 'Second payment due',
            audience: 'Upper School · grades 9–11',
          },
        ],
      },
      {
        title: 'Global Studies Diploma',
        note: 'Upper School · GSD students',
        events: [
          {
            when: 'September 29, 2026 · 1:15–2:15 PM',
            name: 'GSD Donuts and Discussions: Promote Diplomacy!',
            audience: 'Upper School · GSD students, grades 9–12',
          },
          {
            when: 'October 2, 2026 · 1:00–2:00 PM',
            name: 'Final Required GSD New Student Orientation #3',
            audience: 'Upper School · new GSD students, typically 9th grade',
          },
        ],
      },
    ],
    footnote: true,
    sources: [
      { label: 'providenceday.org — School calendars', url: CALENDAR },
      { label: 'providenceday.org — Japan trip, June 2027', url: TRIP_JAPAN_27 },
      { label: 'providenceday.org — Iceland trip, June 2027', url: TRIP_ICELAND_27 },
      { label: 'providenceday.org — France trip, May–June 2027', url: TRIP_FRANCE_27 },
    ],
  },

  /* --------------------------------------------- verdict & ask the school -- */
  verdict: {
    headline:
      "Where the program stands out, and nine questions the school's website doesn't answer yet — starting grade, Middle School trips, aid and safety.",
    standsOut: {
      summary:
        'Among Charlotte private schools, Providence Day stands out for its credential (the GSD), its Round Square network and the breadth of its reciprocal exchanges.',
      points: [
        'A named second diploma, running since the mid-2000s, with published requirements',
        'Eight exchange partners, with durations and reciprocity documented year by year',
        'Round Square conferences on four continents in four years',
        'Global learning in every division, TK to 12, with an 11-year language path',
      ],
    },
    ask: [
      {
        topic: 'Starting grade.',
        question:
          'What is the earliest grade allowed on an international trip? Are Middle School trips open to 6th graders, or only 7th–8th?',
      },
      {
        topic: 'Middle School trips.',
        question:
          'Which Middle School trips are offered for 2026–27 and summer 2027? The published 2027 trip pages are all Upper School, grades 9–11.',
      },
      {
        topic: 'Aid.',
        question:
          'Trip aid is limited and covers one global trip per student. How much does a typical award cover, and do the endowed funds listed under "Financial Assistance Beyond Tuition" (Murdock, Latchwood, Bhandari Mehta) contribute?',
      },
      {
        topic: 'Jordan.',
        question:
          'How are students selected for the Daher-funded Jordan trip? Which grades are eligible, when does it happen, and is it fully funded?',
      },
      {
        topic: 'Selection.',
        question:
          'Registrations go to a Global Education Travel Committee for review. When a trip is oversubscribed, how are places decided? How are Round Square delegates chosen?',
      },
      {
        topic: 'Safety.',
        question:
          'Each 2027 trip has two PD study tour leaders, travel partner Envoys and emergency medical and evacuation insurance. What are the emergency protocols, and who manages medical needs on the trip?',
      },
      {
        topic: 'Exchanges.',
        question: 'How do families apply for Round Square exchanges? Are host families required to host in return?',
      },
      {
        topic: 'GSD.',
        question: 'Does one trip satisfy the travel requirement? Is there a GSD-specific travel subsidy?',
      },
      {
        topic: 'Scale.',
        question: 'How many students travel abroad each year, and what share of each grade does that represent?',
      },
    ],
    sources: [
      { label: 'providenceday.org — Global Education', url: GE },
      { label: 'providenceday.org — Global Map', url: MAP },
      { label: 'providenceday.org — Global Studies Diploma', url: GSD },
      { label: 'providenceday.org — Endowment (funds, Jordan)', url: ENDOW },
      { label: 'providenceday.org — Strategic Framework', url: STRATEGY },
      { label: 'providenceday.org — Japan trip, June 2027', url: TRIP_JAPAN_27 },
      { label: 'providenceday.org — Iceland trip, June 2027', url: TRIP_ICELAND_27 },
      { label: 'providenceday.org — France trip, May–June 2027', url: TRIP_FRANCE_27 },
    ],
  },
}
