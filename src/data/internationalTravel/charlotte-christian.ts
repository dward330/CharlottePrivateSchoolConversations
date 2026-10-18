// Charlotte Christian School — International Travel (displayed "Global
// Exposure").
//
// Built from the user's Claude deep-research PDF (transcribed alongside this
// record) and then VERIFIED fact by fact against live charlottechristian.com
// pages and school-hosted PDFs on 2026-10-16, or a Wayback copy where the live
// file has moved on. The PDF is a lead sheet only; the fact → URL record,
// including the implement-time checks (which found the Winterim 2025 packet on
// Wayback) and every spelling conflict, is
// source-material/international-travel/charlotte-christian/
//   Charlotte Christian - International Travel - Source URLs.md
//
// Rules this file follows (see ./README.md): every card's `sources` lists the
// specific pages behind its facts; gaps appear only in `verdict.ask`; no
// student, parent, teacher or trip leader is named; no trip price and no exact
// travel date is rendered (the Winterim name only — registration deadlines may
// render). Charlotte Christian publishes no exchange program today and no global
// credential, so the `exchanges` and `credential` cards are omitted (user
// decision, 2026-10-16). The trip ledger is built from the school's own yearly
// Winterim packets, which list the trips OFFERED — "Final trip size and
// offerings will be determined according to registrations" — so the ledger is
// worded as offerings, never as trips that ran.

import type { InternationalTravelProgram } from '../internationalTravel.ts'

const CCS = 'https://www.charlottechristian.com'
const RM = `${CCS}/fs/resource-manager/view`
const VOICE = `${CCS}/uploaded/Documents/AboutUs/Voice`
const KHP = `${CCS}/post-details/~board/knights-headlines/post`

const US = `${CCS}/academics/upper-school`
const CURR = `${CCS}/academics/curriculum`
const DIV = `${CCS}/about/diversity`
const APPLY = `${CCS}/admissions/apply`
const TUI = `${CCS}/admissions/tuition`
const KH_KNC = `${KHP}/knights-nations-club-fosters-a-friendly-and-welcoming-environment-for-upper-school-students`
// The Upper School, Middle School and Lower School curriculum guides, through
// the school's own links.
const USG = `${RM}/e07cd151-2d20-44e0-a7db-f0b6d50ba314`
const MSG = `${RM}/e8e85321-72b3-4030-b64e-22dccc17cf1a`
const LSB = `${RM}/94f7a8dc-97a5-4798-aeeb-bb83410b4312`
const G280 = `${CCS}/cf_media/index.cfm?g=280`
const EN2922 = `${CCS}/cf_enotify/view.cfm?n=2922`
const N1417 = `${CCS}/cf_news/view.cfm?newsid=1417`
// The current Winterim packet, through the Upper School page's own link.
const WP27 = `${RM}/ba353ab7-5279-4db7-bbf6-68f09cc3fc31`
// Earlier packets are gone from the live site; each survives on Wayback.
const WP26 =
  'https://web.archive.org/web/20251009234453/https://resources.finalsite.net/images/v1754953602/charlotte/xirlf52kj6gxx2pteclb/2026WinterimPacketdocx.pdf'
const WP25 =
  'https://web.archive.org/web/20240921230636/https://resources.finalsite.net/images/v1692906838/charlotte/it2s4inji6vynrip4ll4/2025WinterimPacket.pdf'
const WP24 =
  'https://web.archive.org/web/20231205160202/https://resources.finalsite.net/images/v1684517255/charlotte/it2s4inji6vynrip4ll4/2024WinterimPacket.pdf'
// The Aug 2022 Upper School page lists the Winterim 2023 out-of-town trips.
const WB_US_2022 =
  'https://web.archive.org/web/20220808081400/https://www.charlottechristian.com/academics/upper-school'
// The Voice, the school's magazine.
const V0708 = `${VOICE}/Voice_0708_Issue1.pdf`
const V0910 = `${VOICE}/Voice_0910_Issue3.pdf`
const V1011B = `${VOICE}/Voice_1011_Issue2.pdf`
const V1112 = `${VOICE}/Voice_1112_Issue1.pdf`
const V1213 = `${VOICE}/Voice_1213_Issue2.pdf`

export const charlotteChristian: InternationalTravelProgram = {
  lead: {
    strong:
      'Upper School students at Charlotte Christian take part in Winterim, a week each year at the turn of February and March, with six to eight trips abroad offered each year from 9th grade.',
    muted:
      "Most trips pair travel with a mission or service partner, from SCORE International in the Dominican Republic, on record since 2009–10, to Samaritan's Feet in Portugal.",
  },

  stats: [
    {
      value: '7',
      label: 'trips abroad',
      note: "offered in Winterim 2027, per the school's packet",
    },
    {
      value: '17',
      label: 'countries',
      note: 'our count from five Winterims, 2023–2027',
    },
    {
      value: '1.0',
      label: 'Winterim credit to graduate',
      note: '.25 each Upper School year',
    },
    {
      value: '2009–10',
      label: 'first SCORE International trip on record',
      note: '31 students to the Dominican Republic, per the school',
    },
  ],

  /* ----------------------------------------------------- where they go -- */
  trips: {
    headline:
      'Thirty-five trips abroad offered across five Winterims, 2023 to 2027, each with a published grade band and group size, and most with a mission or service partner.',
    intro: {
      strong:
        'Winterim trips abroad are open to Upper School students, some from 9th grade and most from 10th, and each year\'s packet gives every trip its grade band, group size and theme.',
      muted:
        'The packets list the trips offered, and final offerings depend on registrations. Winterim also offers local and domestic experiences, so going abroad is one choice among many.',
    },
    years: [
      {
        year: '2026–27',
        note: 'Winterim 2027',
        trips: [
          {
            dest: 'Brazil',
            place: 'São Paulo',
            div: 'US',
            group: '9th–12th grade · female athletes · 16–40 students',
            theme: 'A sports ministry tour with Missionary Athletes International · sport clinics and outreach with local churches',
            timing: 'Winterim 2027',
          },
          {
            dest: 'Canada',
            place: 'Québec',
            div: 'US',
            group: '10th–12th grade · 25–35 students',
            theme: 'French conversation and a Québec winter, with service alongside a local church',
            timing: 'Winterim 2027',
          },
          {
            dest: 'Dominican Republic',
            div: 'US',
            group: '10th–12th grade · 16–32 students',
            theme: 'Service learning with SCORE International',
            timing: 'Winterim 2027',
          },
          {
            dest: 'Iceland',
            div: 'US',
            group: '11th–12th grade · 35–40 students',
            theme: 'Landscape and culture, with an environmental-stewardship service project',
            timing: 'Winterim 2027',
          },
          {
            dest: 'Italy',
            place: 'Sorrento, Pompeii + Rome',
            div: 'US',
            group: '9th–12th grade · 24–32 students',
            theme: 'Art, history and faith, with service in Rome',
            timing: 'Winterim 2027',
          },
          {
            dest: 'Mexico',
            place: 'La Paz',
            div: 'US',
            group: '10th–12th grade · 16–20 students',
            theme: 'Service and spiritual formation with Rancho El Camino',
            timing: 'Winterim 2027',
          },
          {
            dest: 'Portugal',
            place: 'Lisbon',
            div: 'US',
            group: '10th–12th grade · 10–12 students',
            theme: "Shoe distribution with Samaritan's Feet",
            timing: 'Winterim 2027',
          },
        ],
      },
      {
        year: '2025–26',
        note: 'Winterim 2026',
        trips: [
          {
            dest: 'Greece',
            place: 'Athens, Corinth + Nafplio',
            div: 'US',
            group: '11th–12th grade · 16–40 students',
            theme: "In Paul's footsteps, with a beach clean-up",
            timing: 'Winterim 2026',
          },
          {
            dest: 'Brazil',
            place: 'Rio de Janeiro',
            div: 'US',
            group: '10th–12th grade · 18–30 students',
            theme: 'Afro-Brazilian culture, with a day of service',
            timing: 'Winterim 2026',
          },
          {
            dest: 'Brazil',
            place: 'Rio de Janeiro',
            div: 'US',
            group: '9th–12th grade · female athletes · 10–25 students',
            theme: 'A sports ministry tour · sport clinics and church outreach',
            timing: 'Winterim 2026',
          },
          {
            dest: 'England',
            place: 'Birmingham',
            div: 'US',
            group: '10th–12th grade · 16–20 students',
            theme: 'A mission trip with a local church: food distribution and youth outreach',
            timing: 'Winterim 2026',
          },
          {
            dest: 'Costa Rica',
            div: 'US',
            group: '10th–12th grade · girls · 16–30 students',
            theme: 'Wildlife biology and conservation, with tree-planting and a wildlife sanctuary',
            timing: 'Winterim 2026',
          },
          {
            dest: 'Dominican Republic',
            div: 'US',
            group: '10th–12th grade · 16–30 students',
            theme: 'Service learning with SCORE International',
            timing: 'Winterim 2026',
          },
          {
            dest: 'Panama',
            div: 'US',
            group: '9th–10th grade · 16–21 students',
            theme: 'Vacation Bible School at an inner-city Christian school, Panamá Viejo and an Emberá village',
            timing: 'Winterim 2026',
          },
          {
            dest: 'Scotland',
            place: 'The Highlands, Edinburgh + Glasgow',
            div: 'US',
            group: '10th–12th grade · girls · 20–30 students',
            theme: 'History and culture, with a day of service in Glasgow',
            timing: 'Winterim 2026',
          },
        ],
      },
      {
        year: '2024–25',
        note: 'Winterim 2025',
        trips: [
          {
            dest: 'Cuba',
            place: 'Havana + Remedios',
            div: 'US',
            group: '10th–12th grade · 15–20 students',
            theme: "Shoe distribution with Samaritan's Feet, in schools and deaf communities",
            timing: 'Winterim 2025',
          },
          {
            dest: 'Dominican Republic',
            div: 'US',
            group: '10th–12th grade · 16–45 students',
            theme: 'Service learning with SCORE International',
            timing: 'Winterim 2025',
          },
          {
            dest: 'Ireland',
            div: 'US',
            group: '9th–12th grade · 20–40 students',
            theme: 'The "Best of Ireland" tour · the Cliffs of Moher, Gaelic games and the Book of Kells',
            timing: 'Winterim 2025',
          },
          {
            dest: 'Italy',
            place: 'Sorrento, Pompeii + Rome',
            div: 'US',
            group: '9th–12th grade · 24–40 students',
            theme: 'Art, history and faith, with service in Rome',
            timing: 'Winterim 2025',
          },
          {
            dest: 'Canada',
            place: 'Montréal + Québec City',
            div: 'US',
            group: '10th–12th grade · 20–40 students',
            theme: 'Francophone Canada, with time serving others',
            timing: 'Winterim 2025',
          },
          {
            dest: 'Panama',
            div: 'US',
            group: '9th–10th grade · 16–21 students',
            theme: 'Vacation Bible School at an inner-city Christian school, Panamá Viejo and an Emberá village',
            timing: 'Winterim 2025',
          },
        ],
      },
      {
        year: '2023–24',
        note: 'Winterim 2024',
        trips: [
          {
            dest: 'Dominican Republic',
            div: 'US',
            group: '10th–12th grade · up to 40 students',
            theme: 'Service with SCORE International',
            timing: 'Winterim 2024',
          },
          {
            dest: 'Dominican Republic',
            div: 'US',
            group: 'Varsity baseball team · up to 25 students',
            theme: 'Service with SCORE International and two exhibition games',
            timing: 'Winterim 2024',
          },
          {
            dest: 'Ecuador',
            place: 'Quito, Baños + Isla de la Plata',
            div: 'US',
            group: '10th–12th grade · up to 27 students',
            theme: 'Spanish practice and adventure, with service at a cocoa plantation',
            timing: 'Winterim 2024',
          },
          {
            dest: 'Iceland',
            div: 'US',
            group: '10th–12th grade · up to 35 students',
            theme: 'Education and adventure · a glacier, an ice cave and Reykjavík',
            timing: 'Winterim 2024',
          },
          {
            dest: 'Germany & Austria',
            place: 'Munich + Salzburg',
            div: 'US',
            group: '9th–12th grade · up to 35 students',
            theme: 'History and culture · Dachau, Neuschwanstein and Hohensalzburg',
            timing: 'Winterim 2024',
          },
          {
            dest: 'Greece & Italy',
            place: 'Athens, Delphi, Sorrento, Pompeii + Rome',
            div: 'US',
            group: '9th–12th grade · up to 36 students',
            theme: 'Art, history and faith, with a service project in Rome',
            timing: 'Winterim 2024',
          },
          {
            dest: 'Panama',
            div: 'US',
            group: '9th–10th grade · up to 20 students',
            theme: 'Mission and service',
            timing: 'Winterim 2024',
          },
          {
            dest: 'Portugal',
            place: 'Lisbon',
            div: 'US',
            group: '10th–12th grade · up to 15 students',
            theme: "Mission and service with Samaritan's Feet",
            timing: 'Winterim 2024',
          },
        ],
      },
      {
        year: '2022–23',
        note: 'Winterim 2023',
        trips: [
          {
            dest: 'Dominican Republic',
            div: 'US',
            group: '10th–12th grade · up to 40 students',
            theme: 'Service and mission with SCORE International, in sugar cane villages',
            timing: 'Winterim 2023',
          },
          {
            dest: 'Dominican Republic',
            div: 'US',
            group: 'Varsity baseball team · up to 22 students',
            theme: 'Service with SCORE International and two exhibition games',
            timing: 'Winterim 2023',
          },
          {
            dest: 'Italy & Greece',
            place: 'Athens, Delphi, Pompeii + Rome',
            div: 'US',
            group: '9th–12th grade · up to 36 students',
            theme: 'Art, history and faith',
            timing: 'Winterim 2023',
          },
          {
            dest: 'England & France',
            place: 'London, Stratford-upon-Avon, Oxford + Paris',
            div: 'US',
            group: '9th–12th grade · up to 30 students',
            theme: "Literary history · the Globe and Shakespeare's birthplace",
            timing: 'Winterim 2023',
          },
          {
            dest: 'Mexico',
            place: 'La Misión, Baja California',
            div: 'US',
            group: '10th–12th grade · up to 15 students',
            theme: "Mission and service with Samaritan's Feet",
            timing: 'Winterim 2023',
          },
          {
            dest: 'Panama',
            div: 'US',
            group: '9th–12th grade · up to 20 students',
            theme: 'Mission and service, with Vacation Bible School',
            timing: 'Winterim 2023',
          },
        ],
      },
    ],
    photo: {
      src: '/travel/charlotte-christian-italy.jpg',
      alt: "Charlotte Christian Upper School students in St Peter's Square, Rome",
      caption: {
        title: 'Italy, on Winterim',
        text: "A Winterim trip in Rome, at St Peter's Square.",
      },
      credit: 'Photo: Charlotte Christian School',
    },
    alsoOnRecord: [
      {
        lead: 'Mission trips from 1998.',
        text: 'School-sponsored mission trips with faculty and students went to Mexico in 1998, Costa Rica in 1999 and Austria in 2000.',
      },
      {
        lead: 'SCORE International, 2009–10.',
        text: '31 students worked with SCORE International in the Dominican Republic.',
      },
      {
        lead: 'Basketball in Limoges.',
        text: 'Four varsity players represented Charlotte in a partner-cities tournament in Limoges, France, in 2009–10.',
      },
      {
        lead: 'Summer 2011.',
        text: '42 students joined school mission trips to the Dominican Republic or to Sea Island, Georgia, with Habitat for Humanity.',
      },
      {
        lead: 'The first J-Term.',
        text: 'The 2013–14 J-Term was announced with mission trips to Uganda, Nicaragua or the Dominican Republic, and trips to France and New York.',
      },
      {
        lead: 'Salamanca, summer 2018.',
        text: 'Upper School students traveled to Spain for language and cultural immersion.',
      },
      {
        lead: 'Italy, winter 2020.',
        text: 'On a J-Term trip, 40 students, staff and parents traced Christian art and history through Rome.',
      },
    ],
    sources: [
      { label: 'charlottechristian.com — Winterim 2027 packet (PDF)', url: WP27 },
      { label: 'Winterim 2026 packet (Wayback, Oct 2025)', url: WP26 },
      { label: 'Winterim 2025 packet (Wayback, Sep 2024)', url: WP25 },
      { label: 'Winterim 2024 packet (Wayback, Dec 2023)', url: WP24 },
      { label: 'Upper School (Wayback, Aug 2022)', url: WB_US_2022 },
      { label: 'charlottechristian.com — Upper School', url: US },
      { label: 'charlottechristian.com — The Voice, 2007–08 (PDF)', url: V0708 },
      { label: 'charlottechristian.com — The Voice, 2009–10 (PDF)', url: V0910 },
      { label: 'charlottechristian.com — The Voice, 2011–12 (PDF)', url: V1112 },
      { label: 'charlottechristian.com — The Voice, 2012–13 (PDF)', url: V1213 },
      { label: 'charlottechristian.com — Spain trip news, 2018', url: N1417 },
      { label: 'charlottechristian.com — Photo galleries', url: G280 },
      { label: 'charlottechristian.com — Fine Arts newsletter, 2020', url: EN2922 },
    ],
  },

  /* ----------------------------------------------------------- signing up -- */
  signup: {
    headline:
      'Registration for Winterim 2027 opened in July 2026 and closed in August, with contracts and passport copies due in September.',
    intro: {
      strong:
        'Places go by priority: the highest grade level available, first-time attendees, curriculum connections, accurate registration information and demonstrated readiness. Time of registration counts least.',
      muted:
        'International trips need a passport valid at least six months past the trip, and the packet points families to outside companies for travel insurance.',
    },
    groups: [
      {
        title: 'Upper School · Winterim 2027',
        note: '2026 cycle',
        events: [
          { when: 'July 24, 2026', name: 'Registration opens', audience: 'Upper School' },
          {
            when: 'August 28, 2026',
            name: 'Registration and deposit close, at midnight',
            audience: 'Upper School',
          },
          { when: 'September 5, 2026', name: 'Registrations confirmed by email', audience: 'Upper School' },
          {
            when: 'September 11, 2026',
            name: 'Financial contracts, liability release forms and passport copies due',
            audience: 'Upper School',
          },
        ],
      },
    ],
    footnote: true,
    sources: [
      { label: 'charlottechristian.com — Winterim 2027 packet (PDF)', url: WP27 },
      { label: 'charlottechristian.com — Upper School', url: US },
    ],
  },

  /* ------------------------------------------- global community on campus -- */
  community: {
    headline:
      'Global Knights, the Knights Nations Club, a Global Awareness Prefect and Romans 12, led by a Director of Diversity, Belonging and Global Awareness.',
    intro: {
      strong:
        'The school aims to strengthen students\' cultural empathy, global awareness and a posture of humility, while seeking unity within their differences,',
      muted: 'through work led by the Director of Diversity, Belonging and Global Awareness.',
    },
    stats: [],
    cells: [
      {
        name: 'Global Knights',
        text: 'A 5th-grade Middle School elective and Middle School student group, and an Upper School club.',
      },
      {
        name: 'Knights Nations Club',
        text: 'Upper School students learning about local and international communities, from international grocery stores to how Easter is celebrated across the globe.',
      },
      {
        name: 'Global Awareness Prefect',
        text: 'One of nine Upper School student-government prefects.',
      },
      {
        name: 'Romans 12',
        text: 'Members of the school community who meet monthly and, per the school, strengthen its multicultural and global awareness.',
      },
      {
        name: 'Multicultural Festival',
        text: 'An annual Lower School celebration, part of Spanish class.',
      },
      {
        name: 'International students',
        text: 'The school enrolls international students on I-20 visas, and does not provide host families.',
      },
    ],
    sources: [
      { label: 'charlottechristian.com — Diversity & Belonging', url: DIV },
      { label: 'charlottechristian.com — Knights Nations Club', url: KH_KNC },
      { label: 'charlottechristian.com — Upper School', url: US },
      { label: 'charlottechristian.com — Middle School Curriculum Guide 2026–27 (PDF)', url: MSG },
      { label: 'charlottechristian.com — Curriculum', url: CURR },
      { label: 'charlottechristian.com — Lower School Curriculum (PDF)', url: LSB },
      { label: 'charlottechristian.com — Apply', url: APPLY },
    ],
  },

  /* ----------------------------------------- global learning at each level -- */
  start: {
    headline:
      'Global learning in every division, JK to 12, with three languages to sample in 5th grade and Winterim trips abroad from 9th grade.',
    intro: {
      strong:
        'In the school\'s words, "The study of modern and classical languages equips students to impact the global culture for Christ."',
      muted: 'Winterim, the Upper School\'s yearly week of experiences, sets out five goals of its own.',
    },
    framework: [
      {
        name: 'Love God',
        text: 'Spiritual growth in student and faculty relationships',
      },
      {
        name: 'Pursue Excellence',
        text: 'Problem solving, independence and life skills in new settings',
      },
      {
        name: 'Walk Humbly',
        text: 'Discover the heritage, beliefs and experiences of another cultural context',
      },
      {
        name: 'Show Kindness',
        text: 'Serve a community',
      },
      {
        name: 'Seek Truth',
        text: 'Explore sites, museums and landmarks',
      },
    ],
    divisions: [
      {
        name: 'Lower School',
        grades: 'JK–4',
        items: [
          'Spanish, with an annual Multicultural Festival',
          'Social studies that widens from families and neighborhoods to global geography',
          'Learning about other cultures through literature, guest speakers and projects',
        ],
      },
      {
        name: 'Middle School',
        grades: '5–8',
        items: [
          '**A 5th-grade Language Survey** of French, Latin and Spanish, then one language through 8th grade',
          'Global Knights and Multicultural Studies electives',
          'Heritage months in world-language classes',
          'Field trips to Sudan Interior Missions (6th grade), the Holocaust butterfly memorial (7th) and on the Civil Rights Movement (8th)',
          'Modern World Civilizations',
        ],
      },
      {
        name: 'Upper School',
        grades: '9–12',
        items: [
          'French, Latin and Spanish through AP',
          'Survey of World Literature, asking "What does it mean to be an engaged global citizen?"',
          'AP World History: Modern',
          '**Winterim each year,** with trips abroad from 9th grade',
        ],
      },
    ],
    sources: [
      { label: 'charlottechristian.com — Curriculum', url: CURR },
      { label: 'charlottechristian.com — Lower School Curriculum (PDF)', url: LSB },
      { label: 'charlottechristian.com — Middle School Curriculum Guide 2026–27 (PDF)', url: MSG },
      { label: 'charlottechristian.com — Upper School Curriculum Guide 2026–27 (PDF)', url: USG },
      { label: 'charlottechristian.com — Diversity & Belonging', url: DIV },
      { label: 'charlottechristian.com — Winterim 2027 packet (PDF)', url: WP27 },
    ],
  },

  /* ------------------------- score international & the winterim mission partners -- */
  network: {
    headline:
      "SCORE International in the Dominican Republic since at least 2009–10, Samaritan's Feet and other mission partners on Winterim trips, and Model UN and Harvard Model Congress at home.",
    intro: {
      strong:
        "Charlotte Christian's travel runs through long-standing mission and service partners, above all SCORE International in the Dominican Republic.",
      muted:
        'At home, the Upper School has a Model UN club, and in 2010–11 it sent the largest delegation of any school in the nation to Harvard Model Congress.',
    },
    ledgerTitle: 'SCORE International trips on record',
    conferences: [
      { year: '2026–27', text: 'Winterim 2027, for 10th–12th grade' },
      { year: '2025–26', text: 'Winterim 2026, for 10th–12th grade' },
      { year: '2024–25', text: 'Winterim 2025, for 10th–12th grade' },
      { year: '2023–24', text: 'Winterim 2024, plus a varsity baseball service trip' },
      { year: '2022–23', text: 'Winterim 2023, plus a varsity baseball service trip' },
      { year: '2009–10', text: '31 students' },
    ],
    cells: [
      {
        name: 'SCORE International',
        text: "A Christ-centered ministry the school's Dominican Republic trips serve with, through sports, orphan care and construction.",
      },
      {
        name: "Samaritan's Feet",
        text: 'Shoe-distribution trips to Baja California, Lisbon and Cuba, offered in four Winterims from 2023 to 2027.',
      },
      {
        name: 'Missionary Athletes International',
        text: "The female athletes' sports ministry tour in Brazil, in Winterim 2027.",
      },
      {
        name: 'Rancho El Camino',
        text: 'Service in La Paz, Mexico, in Winterim 2027.',
      },
    ],
    rows: [
      {
        label: 'Model UN',
        text: 'An Upper School club.',
      },
      {
        label: 'Harvard Model Congress',
        text: 'In 2010–11, 43 juniors and seniors made up the largest delegation of any school in the nation, in the school\'s eighth year there.',
      },
      {
        label: 'Academic WorldQuest',
        text: "Eight students competed in 2011, in the World Affairs Council of Charlotte's contest.",
      },
      {
        label: 'Travel partners',
        text: 'Joshua Expeditions, Grand Classroom and EF Tours run several Winterim trips, per the packets.',
      },
    ],
    sources: [
      { label: 'charlottechristian.com — Winterim 2027 packet (PDF)', url: WP27 },
      { label: 'Winterim 2026 packet (Wayback, Oct 2025)', url: WP26 },
      { label: 'Winterim 2025 packet (Wayback, Sep 2024)', url: WP25 },
      { label: 'Winterim 2024 packet (Wayback, Dec 2023)', url: WP24 },
      { label: 'Upper School (Wayback, Aug 2022)', url: WB_US_2022 },
      { label: 'charlottechristian.com — Upper School', url: US },
      { label: 'charlottechristian.com — The Voice, 2009–10 (PDF)', url: V0910 },
      { label: 'charlottechristian.com — The Voice, 2010–11 (PDF)', url: V1011B },
      { label: 'charlottechristian.com — The Voice, 2011–12 (PDF)', url: V1112 },
    ],
  },

  /* ------------------------------------------------- firsts & milestones -- */
  milestones: {
    headline:
      'Nearly three decades on record, from mission trips abroad in 1998 to a required Winterim week each Upper School year.',
    intro: {
      strong: "The school's own magazine records mission trips abroad from 1998 and SCORE International from 2009–10,",
      muted: 'and a required week of experiences each Upper School year since J-Term began in 2013–14.',
    },
    events: [
      {
        year: '1998',
        title: 'Mission trips abroad',
        text: 'School-sponsored mission trips with faculty and students went to Mexico, then to Costa Rica in 1999 and Austria in 2000.',
      },
      {
        year: '2008',
        title: 'Families host Guatemalan students',
        text: 'The Faces exchange, later Experiencias Interculturales, began: visiting Guatemalan high schoolers lived with school families for eight weeks and attended Upper School classes.',
      },
      {
        year: '2009–10',
        title: 'SCORE International',
        text: '31 students served in the Dominican Republic.',
      },
      {
        year: '2009–10',
        title: 'Lord of All Nations',
        text: "The Lower School's Multicultural Day represented 24 countries.",
      },
      {
        year: '2010–11',
        title: 'Harvard Model Congress',
        text: 'The largest delegation of any school in the nation.',
      },
      {
        year: '2013–14',
        title: 'J-Term begins',
        text: 'A required week of experiences each Upper School year, from the Class of 2017, earning .25 credit a year.',
      },
      {
        year: '2022–23',
        title: 'Winterim',
        text: 'Winterim 2023 offered six trips abroad.',
      },
    ],
    sources: [
      { label: 'charlottechristian.com — The Voice, 2007–08 (PDF)', url: V0708 },
      { label: 'charlottechristian.com — The Voice, 2009–10 (PDF)', url: V0910 },
      { label: 'charlottechristian.com — The Voice, 2010–11 (PDF)', url: V1011B },
      { label: 'charlottechristian.com — The Voice, 2012–13 (PDF)', url: V1213 },
      { label: 'Upper School (Wayback, Aug 2022)', url: WB_US_2022 },
    ],
  },

  /* --------------------------------------------- verdict & ask the school -- */
  verdict: {
    headline:
      "Where the program stands out, and eleven questions the school's website doesn't answer yet — trip costs, aid, which trips ran, and safety.",
    standsOut: {
      summary:
        'Charlotte Christian has no global diploma or exchange program, but every Upper School year includes Winterim, and its packets publish six to eight trips abroad a year, each with a grade band, group size and, for most, a mission or service partner.',
      points: [
        'A required Winterim every Upper School year',
        'Trips abroad from 9th grade, published with grade bands and group sizes',
        'Mission and service partners on record since 2009–10',
        'Three languages to sample in 5th grade',
      ],
    },
    ask: [
      {
        topic: 'Cost.',
        question:
          'What does a Winterim trip abroad cost and include, and how much can the price change once registrations are in?',
      },
      {
        topic: 'Aid.',
        question:
          'Financial aid covers up to half of tuition, and families pay all fees. Does any aid or fund help with Winterim travel?',
      },
      {
        topic: '9th grade.',
        question:
          'Most trips abroad are for 10th–12th or 11th–12th grade, and priority goes to the highest grade. How often does a 9th grader get a place on one?',
      },
      {
        topic: 'Which trips ran.',
        question:
          'The packets list the trips offered, and final offerings depend on registrations. Which trips actually ran each year?',
      },
      {
        topic: 'Safety.',
        question:
          'What are the chaperone ratios, and what insurance does the school carry? The packet points families to outside insurers.',
      },
      {
        topic: 'Exchanges.',
        question:
          'Does Experiencias Interculturales, the Guatemalan exchange begun in 2008, still run, or is any other exchange offered?',
      },
      {
        topic: 'Credential.',
        question: 'Is a global certificate, or the Seal of Biliteracy, offered school-wide?',
      },
      {
        topic: 'Scale.',
        question: 'How many students go abroad each year? No figure is published.',
      },
      {
        topic: 'Middle and Lower School.',
        question: 'Is there any travel before 9th grade?',
      },
      {
        topic: 'Model UN today.',
        question:
          'Which Model UN conferences does the Upper School attend, and does it still go to Harvard Model Congress?',
      },
      {
        topic: 'International students.',
        question:
          'How many international students are enrolled, and is English-language support offered? Financial aid is not available to students on an I-20.',
      },
    ],
    sources: [
      { label: 'charlottechristian.com — Winterim 2027 packet (PDF)', url: WP27 },
      { label: 'charlottechristian.com — Tuition & Financial Assistance', url: TUI },
      { label: 'charlottechristian.com — Apply', url: APPLY },
      { label: 'charlottechristian.com — The Voice, 2009–10 (PDF)', url: V0910 },
      { label: 'charlottechristian.com — The Voice, 2010–11 (PDF)', url: V1011B },
      { label: 'charlottechristian.com — Upper School', url: US },
    ],
  },
}
