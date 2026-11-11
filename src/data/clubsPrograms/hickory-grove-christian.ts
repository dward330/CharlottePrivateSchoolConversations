// Hickory Grove Christian School — Student Clubs (service + honors).
//
// Transcribed from source-material/student-clubs/hickory-grove-christian/
// "Hickory Grove Christian - Student Clubs - Deep Research.md".
//
// Every card below is built from hgchristian.org only (user, 2026-11-10: school sources only for every club list; plan plainclubs). The earlier
// 27-organization PrivateSchoolReview roster, its five honor societies and its two
// leadership programs were removed. The school's redesigned site (checked
// 2026-11-10) also no longer shows the four-country mission trips or the
// aquaponics program the earlier cards cited, so the service card now follows
// the live Missions & Service page.
//
// THE 1a AFFINITY CARD IS OMITTED, and that is the research finding rather than a
// hole in it: HGCS's grouping model is faith-based (discipleship, worship,
// missions), and no identity-based affinity group appears in any source — as
// expected at a Christian school. Card 1a is an ecosystem map built from a named
// roster; with no such roster there are no cells to draw, so it is omitted rather
// than shipped thin (the same treatment, for the same reason, as Carmel Christian
// and Covenant Day).

import type { ClubsProgram } from '../clubsProgram.ts'

const MISSIONS = 'https://hgchristian.org/missions-and-service'
const PERFORMING = 'https://hgchristian.org/performing-arts'

export const hickoryGroveChristian: ClubsProgram = {
  service: {
    headline:
      'A missions-and-service program: a yearly senior mission trip, a high school Mission Week and a weekly food-pantry role.',
    subhead:
      'Service here is built into school programs rather than a single logged club. The school’s own Missions & Service page names each program.',
    programs: [
      {
        value: 'Yearly',
        valueLabel: 'senior trip · Dominican Republic',
        name: 'Senior Mission Trip',
        detail:
          'Seniors serve together each year on a mission trip to the Dominican Republic. While they are away, the rest of the high school serves the local community through Mission Week.',
        source: { label: 'hgchristian.org — Missions & Service', url: MISSIONS },
      },
      {
        value: 'Weekly',
        valueLabel: 'HGBC food pantry',
        name: 'Food-pantry interpreters',
        detail:
          'Spanish Immersion students serve as interpreters each week at the Hickory Grove Baptist Church food pantry, as the church’s pastors share the Gospel with the community.',
        source: { label: 'hgchristian.org — Missions & Service', url: MISSIONS },
      },
      {
        value: 'Quarterly',
        valueLabel: 'missions collection',
        name: 'Quarterly Missions Collection',
        detail:
          'Each quarter, the school family gives to support a local ministry or cause. The page names XChange, Operation Christmas Child and a Baby Bottle Drive among them.',
        source: { label: 'hgchristian.org — Missions & Service', url: MISSIONS },
      },
    ],
    footnoteTitle: 'Also on the page',
    footnote:
      'Discipleship groups serve together on campus. For example, high schoolers make encouragement cards for elementary students. Student on Mission is a middle school course on how students can serve Charlotte. The Global Missions & Language Certificate requires a mission trip abroad.',
    flags: [],
    sources: [{ label: 'hgchristian.org — Missions & Service', url: MISSIONS }],
  },

  honors: {
    headline:
      'One honor society is named on the school’s own pages: the International Thespian Society.',
    subhead:
      'The school publishes no honor-society page, and its site names no academic honor society.',
    societies: [
      {
        name: 'International Thespian Society',
        division: 'High School',
        recognizes: 'The honor society for high school theatre students',
        feedsFrom: 'theatre',
      },
    ],
    flags: [],
    sources: [{ label: 'hgchristian.org — Performing Arts', url: PERFORMING }],
  },
}
