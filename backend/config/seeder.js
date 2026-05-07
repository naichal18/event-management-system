const Gallery = require('../models/Gallery');
const Event = require('../models/Event');
const User = require('../models/User');
const Category = require('../models/Category');

const defaultUsers = [
  { name: 'Admin User', email: 'admin@gmail.com', password: 'admin123', role: 'Admin' },
  { name: 'Standard User', email: 'user@gmail.com', password: 'user123', role: 'User' }
];

const defaultCategories = [
  { name: 'Cricket', description: 'Sports and tournaments related to cricket.' },
  { name: 'Concert', description: 'Live music performances and festivals.' },
  { name: 'Festival', description: 'Cultural and traditional holiday celebrations.' },
  { name: 'Cultural', description: 'Art, drama, and traditional competitions.' },
  { name: 'Party', description: 'Social gatherings like birthdays and anniversaries.' },
  { name: 'Corporate', description: 'Business networking and professional summits.' },
  { name: 'Sports', description: 'General athletic competitions and fitness events.' }
];

const defaultEvents = [
  // 🏏 Cricket
  { title: 'IPL Fan Fest', category: 'Cricket', location: 'Wankhede Stadium, Mumbai', date: '2026-05-15', price: 499, status: 'approved', image: 'https://images.unsplash.com/photo-1540747913346-19212a4b74a5?auto=format&fit=crop&w=800&q=80&v=1', description: 'Experience the IPL madness with live screenings and fan activities.' },
  { title: 'City Cricket League', category: 'Cricket', location: 'Gymkhana Ground, Pune', date: '2026-05-20', price: 299, status: 'approved', image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80&v=2', description: 'Local clubs battle for the city championship trophy.' },
  { title: 'Night Cricket Tournament', category: 'Cricket', location: 'Sports Hub, Hyderabad', date: '2026-05-25', price: 199, status: 'approved', image: 'https://images.unsplash.com/photo-1508341595083-fcd34d8cc142?auto=format&fit=crop&w=800&q=80&v=3', description: 'A thrilling 10-over format tournament under floodlights.' },
  { title: 'Corporate Cricket Cup', category: 'Cricket', location: 'Reliance Ground, Navi Mumbai', date: '2026-06-05', price: 0, status: 'approved', image: 'https://images.unsplash.com/photo-1542393545-10f5cde2c810?auto=format&fit=crop&w=800&q=80&v=4', description: 'Top corporate teams competing for the annual trophy.' },

  // 🎵 Concert
  { title: 'EDM Night Live', category: 'Concert', location: 'Jio Garden, Mumbai', date: '2026-05-18', price: 1499, status: 'approved', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', description: 'A night of electrifying beats with top international DJs.' },
  { title: 'Bollywood Music Concert', category: 'Concert', location: 'Indira Gandhi Stadium, Delhi', date: '2026-05-22', price: 999, status: 'approved', image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a', description: 'Live performance by the biggest Bollywood playback singers.' },
  { title: 'DJ Sunset Festival', category: 'Concert', location: 'Vagator Beach, Goa', date: '2026-05-30', price: 2499, status: 'approved', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745', description: 'Unforgettable sunset vibes with progressive house music.' },
  { title: 'Indie Band Performance', category: 'Concert', location: 'Hard Rock Cafe, Bangalore', date: '2026-06-12', price: 599, status: 'approved', image: 'https://images.unsplash.com/photo-1514525253361-bee1a31f440a', description: 'Showcasing the best upcoming independent music bands.' },

  // 🎉 Festival
  { title: 'Navratri Celebration', category: 'Festival', location: 'GMDC Ground, Ahmedabad', date: '2026-10-10', price: 399, status: 'approved', image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae', description: '9 nights of non-stop Garba and Dandiya magic.' },
  { title: 'Holi Color Fest', category: 'Festival', location: 'Adventure Park, Delhi', date: '2026-03-25', price: 799, status: 'approved', image: 'https://images.unsplash.com/photo-1561414927-6d86591d0c4f', description: 'Celebrate the festival of colors with organic powders and music.' },
  { title: 'Global Food Carnival', category: 'Festival', location: 'JLNS Ground, Delhi', date: '2026-04-15', price: 150, status: 'approved', image: 'https://images.unsplash.com/photo-1505935428862-770b6f24f629', description: 'A culinary journey featuring 100+ global food stalls.' },
  { title: 'Diwali Cultural Fair', category: 'Festival', location: 'Pragati Maidan, Delhi', date: '2026-11-01', price: 100, status: 'approved', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b', description: 'Traditional crafts, sweets, and light shows for the family.' },

  // 🎭 Cultural
  { title: 'Inter-College Tech Fest', category: 'Cultural', location: 'IIT Bombay, Mumbai', date: '2026-02-12', price: 0, status: 'approved', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0', description: 'Showcasing innovation and tech prowess of Indian students.' },
  { title: 'Traditional Dance Competition', category: 'Cultural', location: 'Kalakshetra, Chennai', date: '2026-04-20', price: 250, status: 'approved', image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf', description: 'Classical and folk dance performances from across India.' },
  { title: 'Art & Craft Exhibition', category: 'Cultural', location: 'NGMA, Bangalore', date: '2026-05-05', price: 100, status: 'approved', image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b', description: 'Exhibition of contemporary and traditional Indian artworks.' },
  { title: 'Drama and Theatre Night', category: 'Cultural', location: 'Prithvi Theatre, Mumbai', date: '2026-06-18', price: 500, status: 'approved', image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94', description: 'Critically acclaimed plays and theatre performances.' },

  // 🎂 Party
  { title: 'Sweet 16 Birthday Bash', category: 'Party', location: 'Royal Orchid Hotel, Pune', date: '2026-07-10', price: 0, status: 'approved', image: 'https://images.unsplash.com/photo-1464349153735-7db51edc391b', description: 'A glamorous birthday celebration with friends and family.' },
  { title: 'Pool Party Night', category: 'Party', location: 'Westin Rooftop, Hyderabad', date: '2026-05-10', price: 1500, status: 'approved', image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7', description: 'Neon themed pool party with live DJ and BBQ.' },
  { title: 'Luxury Anniversary Celebration', category: 'Party', location: 'Taj Palace, Mumbai', date: '2026-08-22', price: 0, status: 'approved', image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf', description: 'Celebrating 25 years of togetherness in royal style.' },
  { title: 'Graduation Party 2026', category: 'Party', location: 'Community Center, Delhi', date: '2026-06-30', price: 500, status: 'approved', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', description: 'Final goodbye party for the graduating class of 2026.' },

  // 🏢 Corporate
  { title: 'Startup Networking Summit', category: 'Corporate', location: 'WeWork Galaxy, Bangalore', date: '2026-05-08', price: 999, status: 'approved', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865', description: 'Connect with founders, investors, and industry experts.' },
  { title: 'AI Innovation Conference', category: 'Corporate', location: 'HITEX, Hyderabad', date: '2026-09-14', price: 2999, status: 'approved', image: 'https://images.unsplash.com/photo-1560174038-da43ac74f01b', description: 'Deep dive into the latest trends in Artificial Intelligence.' },
  { title: 'Leadership Seminar', category: 'Corporate', location: 'Le Meridien, Gurgaon', date: '2026-10-05', price: 4999, status: 'approved', image: 'https://images.unsplash.com/photo-1475721027785-f74dea327912', description: 'Exclusive seminar for senior executives and managers.' },
  { title: 'Business Growth Expo', category: 'Corporate', location: 'BEC, Mumbai', date: '2026-11-20', price: 0, status: 'approved', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0', description: 'Tools and strategies to scale your business to the next level.' },

  // ⚽ Sports
  { title: 'Football Championship', category: 'Sports', location: 'Salt Lake Stadium, Kolkata', date: '2026-05-12', price: 200, status: 'approved', image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377', description: 'Inter-city football tournament for under-19 players.' },
  { title: 'Marathon Run 2026', category: 'Sports', location: 'Marine Drive, Mumbai', date: '2026-01-18', price: 500, status: 'approved', image: 'https://images.unsplash.com/photo-1533560904424-a0c61dc306fc', description: 'Annual city marathon promoting health and fitness.' },
  { title: 'Badminton League', category: 'Sports', location: 'Pullela Gopichand Academy, Hyderabad', date: '2026-04-05', price: 300, status: 'approved', image: 'https://images.unsplash.com/photo-1521537634581-0dced2fee2ef', description: 'Corporate badminton league for professionals.' },
  { title: 'Fitness Challenge Event', category: 'Sports', location: 'Central Park, Delhi', date: '2026-06-21', price: 0, status: 'approved', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438', description: 'Open-air fitness and yoga challenge for all age groups.' }
];

const defaultGallery = [
  {
    title: 'Royal Heritage Wedding',
    eventType: 'Wedding',
    location: 'Leela Palace, Udaipur',
    date: '12 April 2026',
    organizedBy: 'Rohan Sharma',
    atmosphere: 'Elegant & Royal',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    description: 'A magnificent heritage wedding celebrating tradition and luxury.',
    organizerNotes: 'Managing lakeside logistics was challenging but magical.',
    highlights: ['Lakeside Varmala', 'Royal Decor', 'Live Sufi Singer', 'Traditional Rituals'],
    timeline: [
      { time: '4:00 PM', activity: 'Groom\'s Procession (Baraat)', description: 'Traditional entry with horse and folk dancers.', imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80' },
      { time: '6:30 PM', activity: 'Varmala Ceremony', description: 'Exchange of garlands at the lakeside deck.', imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80' },
      { time: '8:00 PM', activity: 'Wedding Rituals', description: 'Mandap rituals with sacred fire.', imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80' },
      { time: '10:00 PM', activity: 'Grand Reception Dinner', description: 'Luxury buffet with international cuisines.', imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80' }
    ]
  },
  {
    title: 'Night Cricket League Finals',
    eventType: 'Cricket',
    location: 'DY Patil Stadium, Navi Mumbai',
    date: '22 April 2026',
    organizedBy: 'Vikram Singh',
    atmosphere: 'Electric & Competitive',
    imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80',
    description: 'Thrilling finale of the corporate league under floodlights.',
    organizerNotes: 'The crowd energy was unmatched during the final over.',
    highlights: ['Floodlight Match', 'Trophy Ceremony', 'Live Commentary', 'Cheerleader Squad'],
    timeline: [
      { time: '5:00 PM', activity: 'Fan Zone Kickoff', description: 'Cricket fans gathering with banners.', imageUrl: 'https://images.unsplash.com/photo-1540747913346-19212a4b74a5?auto=format&fit=crop&w=800&q=80' },
      { time: '7:00 PM', activity: 'Match Start', description: 'First ball of the championship final.', imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80' },
      { time: '9:30 PM', activity: 'Innings Break Show', description: 'Halftime entertainment and snacks zone.', imageUrl: 'https://images.unsplash.com/photo-1508341595083-fcd34d8cc142?auto=format&fit=crop&w=800&q=80' },
      { time: '11:00 PM', activity: 'Trophy Ceremony', description: 'Celebrating champions with the trophy.', imageUrl: 'https://images.unsplash.com/photo-1624880357913-a8539238245b?auto=format&fit=crop&w=800&q=80' }
    ]
  },
  {
    title: 'City Cricket Championship',
    eventType: 'Cricket',
    location: 'Gymkhana Ground, Pune',
    date: '10 May 2026',
    organizedBy: 'Sports Core',
    atmosphere: 'Action-Packed & Enthusiastic',
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19212a4b74a5?auto=format&fit=crop&w=1200&q=80',
    description: 'The ultimate showdown between the top local cricket clubs.',
    organizerNotes: 'We focused on creating a community festival vibe.',
    highlights: ['Stadium Action', 'Local Talent', 'Food Stalls', 'Awards Night'],
    timeline: [
      { time: '4:00 PM', activity: 'Fan Zone Kickoff', description: 'Local fans cheering with banners.', imageUrl: 'https://images.unsplash.com/photo-1542393545-10f5cde2c810?auto=format&fit=crop&w=800&q=80' },
      { time: '5:30 PM', activity: 'Match Start', description: 'Bowler delivering the first ball.', imageUrl: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?auto=format&fit=crop&w=800&q=80' },
      { time: '7:30 PM', activity: 'Innings Break Show', description: 'Halftime dance and snacks zone.', imageUrl: 'https://images.unsplash.com/photo-151271901372c-531498a6e27b?auto=format&fit=crop&w=800&q=80' },
      { time: '9:30 PM', activity: 'Trophy Ceremony', description: 'Lifting the city championship trophy.', imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80' }
    ]
  },
  {
    title: 'Corporate T20 Cup',
    eventType: 'Cricket',
    location: 'Reliance Ground, Mumbai',
    date: '15 June 2026',
    organizedBy: 'Corporate Connect',
    atmosphere: 'Professional & Intense',
    imageUrl: 'https://images.unsplash.com/photo-1624880357913-a8539238245b?auto=format&fit=crop&w=1200&q=80',
    description: 'Top IT giants competing for the prestigious corporate cup.',
    organizerNotes: 'Networking through sports was the core theme.',
    highlights: ['Networking Hub', 'Intense Matches', 'Corporate Lounge', 'CEO Guest List'],
    timeline: [
      { time: '3:00 PM', activity: 'Fan Zone Kickoff', description: 'Employees cheering for their teams.', imageUrl: 'https://images.unsplash.com/photo-1540747913346-19212a4b74a5?auto=format&fit=crop&w=800&q=80' },
      { time: '4:30 PM', activity: 'Match Start', description: 'Batsman hitting a boundary.', imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80' },
      { time: '6:30 PM', activity: 'Innings Break Show', description: 'Corporate branding and refreshments.', imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80' },
      { time: '8:30 PM', activity: 'Trophy Ceremony', description: 'Winning CEO receiving the trophy.', imageUrl: 'https://images.unsplash.com/photo-1624880357913-a8539238245b?auto=format&fit=crop&w=800&q=80' }
    ]
  },
  {
    title: 'Vibrant Navratri Night',
    eventType: 'Festival',
    location: 'GMDC Ground, Ahmedabad',
    date: '18 March 2026',
    organizedBy: 'Aarav Patel',
    atmosphere: 'High Energy & Festive',
    imageUrl: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=1200&q=80',
    description: 'The biggest Garba celebration of the season.',
    organizerNotes: 'Sound system feedback from crowd was excellent.',
    highlights: ['Garba Troupe', 'Dandiya Fusion', 'Folk Music', 'Organic Food Stalls'],
    timeline: [
      { time: '7:00 PM', activity: 'Gate Entry & Aarti', description: 'Traditional aarti welcome.', imageUrl: 'https://images.unsplash.com/photo-1561414927-6d86591d0c4f?auto=format&fit=crop&w=800&q=80' },
      { time: '8:00 PM', activity: 'First Round of Garba', description: 'Traditional Garba circles.', imageUrl: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=800&q=80' },
      { time: '10:00 PM', activity: 'Dandiya Fusion', description: 'Dandiya sticks dance performance.', imageUrl: 'https://images.unsplash.com/photo-1514525253361-bee1a31f440a?auto=format&fit=crop&w=800&q=80' },
      { time: '11:30 PM', activity: 'Award Ceremony', description: 'Trophies for best attire.', imageUrl: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=800&q=80' }
    ]
  },
  {
    title: 'Sunburn Music Fest Recap',
    eventType: 'Concert',
    location: 'Vagator, Goa',
    date: '28 April 2026',
    organizedBy: 'Vikram Sethi',
    atmosphere: 'Explosive & Energetic',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    description: 'Asia\'s largest dance music festival experience.',
    organizerNotes: 'Crowd control was key to success.',
    highlights: ['DJ Lineup', 'Pyrotechnics', 'Laser Shows', 'Fireworks Finale'],
    timeline: [
      { time: '12:00 PM', activity: 'Gates Open', description: 'Crowd entering festival grounds.', imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80' },
      { time: '4:00 PM', activity: 'Stage Performance', description: 'DJ playing at sunset.', imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80' },
      { time: '8:00 PM', activity: 'Main Headliner', description: 'Main set with massive lighting.', imageUrl: 'https://images.unsplash.com/photo-1514525253361-bee1a31f440a?auto=format&fit=crop&w=800&q=80' },
      { time: '11:00 PM', activity: 'Closing Fireworks', description: 'Grand firework display finale.', imageUrl: 'https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?auto=format&fit=crop&w=800&q=80' }
    ]
  },
  {
    title: 'Bollywood Night Concert',
    eventType: 'Concert',
    location: 'DY Patil Stadium, Mumbai',
    date: '15 June 2026',
    organizedBy: 'Mumbai Events Co.',
    atmosphere: 'High Energy & Musical',
    imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
    description: 'A grand celebration of Bollywood music with top playback singers.',
    organizerNotes: 'The energy of the Mumbai crowd was absolutely electric.',
    highlights: ['Live Singer Performance', 'Stage Lighting', 'DJ Set', 'Pyrotechnics'],
    timeline: [
      { time: '6:00 PM', activity: 'Gates Open', description: 'Giant concert crowd entering.', imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80' },
      { time: '8:00 PM', activity: 'DJ Opening Set', description: 'EDM-Bollywood fusion mix.', imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80' },
      { time: '9:30 PM', activity: 'Main Performance', description: 'Bollywood singer on main stage.', imageUrl: 'https://images.unsplash.com/photo-1514525253361-bee1a31f440a?auto=format&fit=crop&w=800&q=80' },
      { time: '11:00 PM', activity: 'Grand Finale', description: 'Massive light and laser show.', imageUrl: 'https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?auto=format&fit=crop&w=800&q=80' }
    ]
  },
  {
    title: 'Luxury Corporate Meetup',
    eventType: 'Corporate',
    location: 'The Ritz-Carlton, Bangalore',
    date: '20 June 2026',
    organizedBy: 'Global Business Hub',
    atmosphere: 'Premium & Professional',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    description: 'An exclusive networking event for startup founders and investors.',
    organizerNotes: 'Facilitating high-level discussions in a premium conference hall.',
    highlights: ['Keynote Sessions', 'Startup Discussions', 'Investors Meet', 'Gala Dinner'],
    timeline: [
      { time: '10:00 AM', activity: 'Registration', description: 'Check-in with premium networking kits.', imageUrl: 'https://images.unsplash.com/photo-1560174038-da43ac74f01b?auto=format&fit=crop&w=800&q=80' },
      { time: '11:30 AM', activity: 'Keynote Session', description: 'Industry leaders on stage.', imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74dea327912?auto=format&fit=crop&w=800&q=80' },
      { time: '2:00 PM', activity: 'Networking Lunch', description: 'B2B discussions in the main hall.', imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80' },
      { time: '4:00 PM', activity: 'Startup Pitch', description: 'Innovation showcase for investors.', imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80' }
    ]
  }
];

const autoSeed = async () => {
  try {
    // 1. SEED CATEGORIES
    await Category.deleteMany();
    await Category.insertMany(defaultCategories);
    console.log('✅ Categories Seeded');

    // 2. SEED EVENTS (Approved Status Forced)
    await Event.deleteMany();
    await Event.insertMany(defaultEvents);
    console.log(`✅ ${defaultEvents.length} Events Seeded (All Approved)`);

    // 3. SEED GALLERY
    await Gallery.deleteMany();
    await Gallery.insertMany(defaultGallery);
    console.log('✅ Gallery Seeded');

    // 4. SEED USERS
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      for (const userData of defaultUsers) {
        await User.create(userData);
      }
      console.log('✅ Default Users Seeded');
    }
  } catch (error) {
    console.error('❌ Seeding Failed:', error.message);
  }
};

module.exports = autoSeed;
