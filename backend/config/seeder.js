const Event = require('../models/Event');
const User = require('../models/User');
const Category = require('../models/Category');
const Gallery = require('../models/Gallery');

const defaultGallery = [
  {
    title: 'Navratri Celebration 2026',
    location: 'GMDC Ground, Ahmedabad',
    date: '12 March 2026',
    imageUrl: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1590059530519-0775d71c1809?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514525253361-bee1a31f440a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A vibrant evening of Garba and Dandiya with over 5000 attendees. The event celebrated the spirit of Navratri with traditional music, modern DJ beats, and authentic Gujarati food stalls.',
    highlights: ['Award-winning DJ performance', 'Traditional Garba Competition', 'Celebrity Guest Appearance', 'Authentic Food Festival'],
    timeline: [
      { time: '5:00 PM', activity: 'Guest Entry & Welcome' },
      { time: '6:30 PM', activity: 'Aarti & Welcome Ceremony' },
      { time: '7:30 PM', activity: 'Traditional Garba Sessions' },
      { time: '9:00 PM', activity: 'Dinner & Refreshments' },
      { time: '10:00 PM', activity: 'Fusion DJ & Modern Dance' }
    ]
  },
  {
    title: 'Sunburn Holi Reloaded',
    location: 'Vagator, Goa',
    date: '25 April 2026',
    imageUrl: 'https://images.unsplash.com/photo-1590059530519-0775d71c1809?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'The ultimate Holi music festival featuring top international DJs and eco-friendly organic colors. A high-energy experience at the heart of Vagator beach.',
    highlights: ['Top 10 International DJs', 'Organic Color Cannons', 'Pool Side Dance Floor', 'Beach Front Bar'],
    timeline: [
      { time: '10:00 AM', activity: 'Entry & Color Distribution' },
      { time: '11:00 AM', activity: 'Opening DJ Set' },
      { time: '1:00 PM', activity: 'Main Stage Headliner' },
      { time: '3:00 PM', activity: 'Pool Party & Color Rain' },
      { time: '5:00 PM', activity: 'Sunset Closing Set' }
    ]
  },
  {
    title: 'Corporate Innovation Summit',
    location: 'Leela Palace, Bangalore',
    date: '05 May 2026',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A high-profile corporate summit bringing together industry leaders to discuss the future of technology and AI. Featured 20+ keynote speakers and interactive workshops.',
    highlights: ['Keynote by Tech Giants', 'Networking Gala Dinner', 'Startup Pitch Arena', 'Future-Tech Expo'],
    timeline: [
      { time: '9:00 AM', activity: 'Registration & Coffee' },
      { time: '10:00 AM', activity: 'Inaugural Keynote' },
      { time: '1:00 PM', activity: 'Networking Lunch' },
      { time: '3:00 PM', activity: 'Panel Discussions' },
      { time: '7:00 PM', activity: 'Cocktail & Awards Dinner' }
    ]
  }
];

const defaultEvents = [
  {
    title: 'Grand Royal Wedding',
    price: 50000,
    description: 'A magnificent royal wedding celebration with traditional decor and luxury catering.',
    location: 'Leela Palace, Udaipur',
    date: '2025-12-12',
    time: '6:00 PM',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    category: 'Wedding',
    status: 'approved'
  },
  {
    title: 'Sunburn Music Festival',
    price: 2999,
    description: 'The biggest electronic dance music festival in Asia featuring top international DJs.',
    location: 'Vagator Beach, Goa',
    date: '2025-12-28',
    time: '4:00 PM',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    category: 'Concert',
    status: 'approved'
  },
  {
    title: 'EDM Night Live',
    price: 1500,
    description: 'Experience an electrifying night of high-energy beats and immersive light shows.',
    location: 'Electronic City, Bangalore',
    date: '2025-11-15',
    time: '8:00 PM',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    category: 'Concert',
    status: 'approved'
  },
  {
    title: 'Bollywood Music Concert',
    price: 1999,
    description: 'A star-studded evening featuring top Bollywood playback singers and live orchestra.',
    location: 'Jio World Garden, Mumbai',
    date: '2025-08-10',
    time: '7:00 PM',
    image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&w=800&q=80',
    category: 'Concert',
    status: 'approved'
  },
  {
    title: 'DJ Sunset Festival',
    price: 999,
    description: 'Dance as the sun sets over the Arabian Sea with curated house and techno music.',
    location: 'Anjuna Beach, Goa',
    date: '2025-12-31',
    time: '5:00 PM',
    image: 'https://images.unsplash.com/photo-1514525253361-bee1a31f440a?auto=format&fit=crop&w=800&q=80',
    category: 'Concert',
    status: 'approved'
  },
  {
    title: 'Tech Innovation Summit',
    price: 1500,
    description: 'A gathering of tech leaders and innovators to discuss the future of AI and robotics.',
    location: 'Cyber Hub, Gurgaon',
    date: '2025-09-15',
    time: '10:00 AM',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    category: 'Corporate',
    status: 'approved'
  },
  {
    title: 'Startup Networking Summit',
    price: 800,
    description: 'Connect with founders, investors, and mentors at the premier networking event for startups.',
    location: 'HSR Layout, Bangalore',
    date: '2025-07-12',
    time: '9:00 AM',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80',
    category: 'Corporate',
    status: 'approved'
  },
  {
    title: 'AI Innovation Conference',
    price: 2500,
    description: 'Dive deep into the world of Artificial Intelligence and its real-world applications.',
    location: 'HITEC City, Hyderabad',
    date: '2025-11-05',
    time: '10:00 AM',
    image: 'https://images.unsplash.com/photo-1475721027187-40247339488d?auto=format&fit=crop&w=800&q=80',
    category: 'Corporate',
    status: 'approved'
  },
  {
    title: 'Leadership Seminar',
    price: 1200,
    description: 'Enhance your leadership skills with insights from industry experts and successful CEOs.',
    location: 'Bandra-Kurla Complex, Mumbai',
    date: '2025-10-18',
    time: '11:00 AM',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80',
    category: 'Corporate',
    status: 'approved'
  },
  {
    title: 'Sweet 16 Birthday Bash',
    price: 500,
    description: 'An unforgettable birthday celebration with live music, dancing, and great food.',
    location: 'Skyline Rooftop, Mumbai',
    date: '2025-07-20',
    time: '7:00 PM',
    image: 'https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&w=800&q=80',
    category: 'Party',
    status: 'approved'
  },
  {
    title: 'Pool Party Night',
    price: 700,
    description: 'Cool down and party hard at our exclusive rooftop pool event with DJ beats.',
    location: 'Park Hyatt, Hyderabad',
    date: '2025-05-25',
    time: '4:00 PM',
    image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=800&q=80',
    category: 'Party',
    status: 'approved'
  },
  {
    title: 'Luxury Anniversary Celebration',
    price: 2500,
    description: 'A sophisticated evening of elegance celebrating years of love and togetherness.',
    location: 'The Leela, Chennai',
    date: '2025-08-15',
    time: '7:30 PM',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
    category: 'Party',
    status: 'approved'
  },
  {
    title: 'Graduation Party',
    price: 300,
    description: 'Celebrate the big milestone with friends and family in a night of fun and memories.',
    location: 'Sector 17, Chandigarh',
    date: '2025-04-30',
    time: '6:00 PM',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80',
    category: 'Party',
    status: 'approved'
  },
  {
    title: 'Inter-College Tech Fest',
    price: 200,
    description: 'Annual college fest featuring coding competitions, workshops, and guest lectures.',
    location: 'IIT Bombay, Mumbai',
    date: '2025-10-10',
    time: '9:00 AM',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80',
    category: 'Cultural',
    status: 'approved'
  },
  {
    title: 'Traditional Dance Competition',
    price: 150,
    description: 'Showcasing the rich heritage of Indian classical and folk dance forms.',
    location: 'Marine Drive, Kochi',
    date: '2025-09-05',
    time: '5:00 PM',
    image: 'https://images.unsplash.com/photo-1582213726852-299528b3ba80?auto=format&fit=crop&w=800&q=80',
    category: 'Cultural',
    status: 'approved'
  },
  {
    title: 'Art & Craft Exhibition',
    price: 100,
    description: 'A platform for local artists to display their unique creations and masterpieces.',
    location: 'Victoria Memorial Hall, Kolkata',
    date: '2025-11-20',
    time: '11:00 AM',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80',
    category: 'Cultural',
    status: 'approved'
  },
  {
    title: 'Drama and Theatre Night',
    price: 400,
    description: 'Experience powerful storytelling and stellar performances by talented theatre artists.',
    location: 'Bal Gandharva Rang Mandir, Pune',
    date: '2025-06-15',
    time: '6:30 PM',
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80',
    category: 'Cultural',
    status: 'approved'
  },
  {
    title: 'INDIAN PREMIER LEAGUE',
    price: 2499,
    description: 'The ultimate cricket extravaganza featuring top domestic and international stars.',
    location: 'Wankhede Stadium, Mumbai',
    date: '2025-05-15',
    time: '7:30 PM',
    image: 'https://onecricketnews.akamaized.net/parth-editor/oc-dashboard/news-images-prod/1709033614977_ipl2024.jpeg?type=mq',
    category: 'Cricket',
    status: 'approved'
  },
  {
    title: 'WOMEN PREMIER LEAGUE',
    price: 599,
    description: 'Celebrating the spirit of women\'s cricket with thrilling T20 action.',
    location: 'M. Chinnaswamy Stadium, Bengaluru',
    date: '2025-04-20',
    time: '5:00 PM',
    image: 'https://images.indianexpress.com/2023/03/WPL-2-1.jpg?w=1200',
    category: 'Cricket',
    status: 'approved'
  },
  {
    title: 'GOKULDHAM PREMIER LEAGUE',
    price: 200,
    description: 'A fun-filled community cricket tournament with energy and entertainment.',
    location: 'Gokuldham Society Ground, Goregaon',
    date: '2025-06-01',
    time: '10:00 AM',
    image: 'https://images.unsplash.com/photo-1562077772-3bd90403f7f0?auto=format&fit=crop&w=800&q=80',
    category: 'Cricket',
    status: 'approved'
  },
  {
    title: 'City Cricket League',
    price: 300,
    description: 'Inter-city cricket tournament showcasing the best local talent from around the state.',
    location: 'Sawai Mansingh Stadium, Jaipur',
    date: '2025-03-20',
    time: '9:00 AM',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80',
    category: 'Cricket',
    status: 'approved'
  },
  {
    title: 'Navratri Celebration',
    price: 499,
    description: 'A vibrant evening of Garba and Dandiya with traditional music and festive food.',
    location: 'GMDC Ground, Ahmedabad',
    date: '2025-10-02',
    time: '7:00 PM',
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=800&q=80',
    category: 'Festival',
    status: 'approved'
  },
  {
    title: 'Holi Color Fest',
    price: 350,
    description: 'Celebrate the festival of colors with organic powders, water cannons, and DJ music.',
    location: 'Krishna Janmabhoomi, Mathura',
    date: '2025-03-14',
    time: '10:00 AM',
    image: 'https://images.unsplash.com/photo-1590059530519-0775d71c1809?auto=format&fit=crop&w=800&q=80',
    category: 'Festival',
    status: 'approved'
  },
  {
    title: 'Food Carnival',
    price: 150,
    description: 'Explore a variety of cuisines and street food delights at the biggest food fest in the city.',
    location: 'Jawaharlal Nehru Stadium, Delhi',
    date: '2025-02-15',
    time: '12:00 PM',
    image: 'https://images.unsplash.com/photo-1505935428862-770b6f24f629?auto=format&fit=crop&w=800&q=80',
    category: 'Festival',
    status: 'approved'
  },
  {
    title: 'Diwali Cultural Fair',
    price: 100,
    description: 'Experience the magic of lights with traditional handicrafts, fireworks, and folk music.',
    location: 'Jawahar Kala Kendra, Jaipur',
    date: '2025-10-25',
    time: '4:00 PM',
    image: 'https://images.unsplash.com/photo-1574175344453-da051770e53a?auto=format&fit=crop&w=800&q=80',
    category: 'Festival',
    status: 'approved'
  },
  {
    title: 'Football Championship',
    price: 500,
    description: 'High-octane football matches featuring top clubs competing for the ultimate trophy.',
    location: 'Salt Lake Stadium, Kolkata',
    date: '2025-01-20',
    time: '6:00 PM',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    category: 'Sports',
    status: 'approved'
  },
  {
    title: 'Marathon Run 2026',
    price: 600,
    description: 'Join thousands of runners in this city-wide marathon to promote health and fitness.',
    location: 'Marine Drive, Mumbai',
    date: '2026-01-15',
    time: '5:30 AM',
    image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=800&q=80',
    category: 'Sports',
    status: 'approved'
  },
  {
    title: 'Badminton League',
    price: 250,
    description: 'Fast-paced badminton action featuring top-ranked players in a tournament format.',
    location: 'BBD Badminton Academy, Lucknow',
    date: '2025-12-05',
    time: '10:00 AM',
    image: 'https://images.unsplash.com/photo-1626225967045-97a0b2aa648a?auto=format&fit=crop&w=800&q=80',
    category: 'Sports',
    status: 'approved'
  },
  {
    title: 'Fitness Challenge Event',
    price: 150,
    description: 'Test your strength and endurance in our series of fitness challenges and obstacles.',
    location: 'Nehru Park, Indore',
    date: '2025-04-10',
    time: '7:00 AM',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80',
    category: 'Sports',
    status: 'approved'
  }
];

const defaultUsers = [
  {
    name: 'Harmoni Admin',
    email: 'admin@harmoni.com',
    password: 'admin123',
    role: 'Admin',
    phone: '9876543210',
    gender: 'Other'
  },
  {
    name: 'Test User',
    email: 'user@harmoni.com',
    password: 'user123',
    role: 'User',
    phone: '9000000001',
    gender: 'Male'
  }
];

const defaultCategories = [
  { name: 'Cricket', description: 'Cricket matches and tournaments' },
  { name: 'Concert', description: 'Live music and concert events' },
  { name: 'Festival', description: 'Cultural and traditional festivals' },
  { name: 'Cultural', description: 'Art, dance and cultural events' },
  { name: 'Party', description: 'Social parties and celebrations' },
  { name: 'Corporate', description: 'Business and corporate events' },
  { name: 'Sports', description: 'Sporting events and tournaments' },
  { name: 'Wedding', description: 'Royal weddings and grand celebrations' },
];

const autoSeed = async () => {
  try {
    console.log('Checking database state...');

    // Force refresh users to ensure default credentials work
    console.log('Refreshing user data...');
    await User.deleteMany({});
    await User.create(defaultUsers);
    console.log('✅ Default users seeded (Admin & Test User)');

    // Seed categories
    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      await Category.insertMany(defaultCategories);
      console.log(`✅ Default categories seeded (${defaultCategories.length} items)`);
    } else {
      console.log(`ℹ️  Categories already exist (${categoryCount} found) — skipping category seed`);
    }

    // Force seed events by clearing them first to ensure new sample data is loaded
    console.log('Refreshing event data...');
    await Event.deleteMany({});
    await Event.insertMany(defaultEvents);
    console.log(`✅ Default events seeded (${defaultEvents.length} items)`);

    // Force seed gallery history
    console.log('Refreshing gallery history...');
    await Gallery.deleteMany({});
    await Gallery.insertMany(defaultGallery);
    console.log(`✅ Gallery history seeded (${defaultGallery.length} items)`);

    console.log('✅ Database ready!');
  } catch (error) {
    console.error(`Auto-Seed Error: ${error.message}`);
  }
};

module.exports = autoSeed;
