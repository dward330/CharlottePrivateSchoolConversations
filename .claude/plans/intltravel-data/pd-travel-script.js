      ["Pittsburgh","National Rank #67",0,"p4"],
      ["Syracuse","National Rank #73",0,"p4"],
      ["Iowa","National Rank #92",0,"p4"],
      ["Indiana","National Rank #73",0,"p4"],
      ["Kansas","National Rank #124",0,"p4"],
      ["Baylor","National Rank #93",0,"p4"],
      ["TCU","National Rank #105",1,"p4"]
    ];
    return raw.map(r => ({ name: r[0], rankLabel: r[1], enrolling: !!r[2], cats: r[3].split(",") }));
  }
  tvTrips() {
    return [
      { year: '2025–26', note: 'dated by Round Square', trips: [
        { dest: 'United Arab Emirates', place: 'Dubai — 57th Round Square International Conference, "Beyond the Dunes"', div: 'US', group: '', theme: 'Conference · environment', timing: 'Sept 19–25, 2025' }
      ]},
      { year: '2024–25', note: '', trips: [
        { dest: 'Colombia', place: 'Round Square International Conference, "Blooming from the Past" · Amazon pre-conference · Boyacá', div: 'US', group: '6 students', theme: 'Conference · cultural', timing: 'Includes a 4-day Amazon pre-conference', homestay: 'Bogotá' },
        { dest: 'England', place: 'Milton Abbey School Round Square conference, "Leadership and Adventure" · Dorset + London', div: 'MS', group: '6 students', theme: 'Conference · leadership · adventure', timing: 'One week' },
        { dest: 'Ecuador', place: 'Galápagos Islands', div: 'MS', group: '10 students', theme: 'Science · biodiversity · conservation' },
        { dest: 'Denmark & Sweden', place: '"Scandinavia"', div: 'US', group: '10 students', theme: 'Design · sustainability · urban innovation' },
        { dest: 'South Korea', place: 'Cheongshim International Academy Model UN', div: 'US', group: '12 students', theme: 'Model UN abroad · history · culture' },
        { dest: 'South Africa', place: 'Round Square International Service Project', div: 'US', group: '2 students', theme: 'Service — a kindergarten build, beekeeping' }
      ]},
      { year: '2023–24', note: '', trips: [
        { dest: 'Kenya', place: 'Nairobi — Round Square conference, "The New Africa" + Maasai Mara pre-conference', div: 'US', group: '5 delegates', theme: 'Conference' },
        { dest: 'Thailand', place: 'Kui Buri National Park — Round Square Big Build', div: 'US', group: '4 students + 2 faculty', theme: 'Service · human–elephant coexistence' },
        { dest: 'Greece', place: '', div: 'MS', group: '', theme: 'Mythology · archaeology · philosophy', timing: 'Summer (June 2024)' },
        { dest: 'Japan', place: '', div: 'US', group: '', theme: 'Tradition and technology · anime · sustainability' },
        { dest: 'Iceland', place: '', div: 'US', group: '', theme: 'Climate change · environment' }
      ]},
      { year: '2022–23', note: '', trips: [
        { dest: 'United Kingdom', place: 'Oxford + the Wales coast — Round Square conference, "Take Less: Be More"', div: 'US', group: 'delegates', theme: 'Conference · sustainability (coasteering, Bug Farm)' },
        { dest: 'Spain', place: 'Seville + Granada, Cádiz, Madrid', div: 'US', group: '', theme: 'Language and cultural immersion with daily language classes', timing: 'Summer 2023', homestay: 'host family' },
        { dest: 'France', place: 'Montpellier (Lycée Notre Dame de La Merci) + Paris', div: 'US', group: '', theme: 'Language exchange (reciprocal)', homestay: 'French host family' }
      ]},
      { year: 'Current page', note: 'year not stated', trips: [
        { dest: 'London, England', place: 'Performing arts history, for "students with a passion for the arts"', div: 'US', group: '', theme: 'Arts tour' }
      ]}
    ];
  }

  tvVals() {
    const div = this.state.tvDiv || 'all';
    const groups = this.tvTrips().map(g => {
      const trips = g.trips.filter(t => div === 'all' || t.div === div).map(t => ({
        ...t,
        divLabel: (t.div === 'MS' ? 'Middle School' : 'Upper School') + (t.group ? ' · ' + t.group : ''),
        homeLabel: 'Homestay · ' + (t.homestay || ''), hasPlace: !!t.place, hasTiming: !!t.timing, hasHome: !!t.homestay
      }));
      return { ...g, trips, count: trips.length + (trips.length === 1 ? ' trip' : ' trips') };
    }).filter(g => g.trips.length);
    const total = groups.reduce((n, g) => n + g.trips.length, 0);
    return {
      tvTripGroups: groups, tvTripTotal: total + ' trips shown',
      tvTabAll: div === 'all', tvTabMS: div === 'MS', tvTabUS: div === 'US',
      tvShowAll: () => this.setState({ tvDiv: 'all' }), tvShowMS: () => this.setState({ tvDiv: 'MS' }), tvShowUS: () => this.setState({ tvDiv: 'US' })
    };
  }
  renderVals() {
    const theme = this.state.theme ?? (this.props.defaultTheme ?? 'light');
    const mk = (div) => {
      const d = this.courseData[div];
      const names = Object.keys(d);
      const active = this.state.dept[div] ?? 'All';
      const rawQ = this.state.query[div] ?? '';
      const ql = rawQ.trim().toLowerCase();
      const pool = active === 'All'
        ? names.flatMap((n) => d[n].map((c) => ({ ...c, dept: n })))
        : d[active].map((c) => ({ ...c, dept: null }));
      const filtered = ql ? pool.filter((c) => c.title.toLowerCase().includes(ql) || c.desc.toLowerCase().includes(ql)) : pool;
      const seg = (text) => {
