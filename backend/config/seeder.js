const Event = require('../models/Event');
const User = require('../models/User');
const Category = require('../models/Category');

const defaultEvents = [
  {
    title: 'Grand Royal Wedding',
    price: 50000,
    date: '2025-12-12',
    time: '6:00 PM',
    location: 'Leela Palace, Udaipur',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    category: 'Wedding',
    description: 'A magnificent royal wedding celebration with traditional decor and luxury catering.',
    status: 'approved'
  },
  {
    title: 'Sunburn Music Festival',
    price: 2999,
    date: '2025-12-28',
    time: '4:00 PM',
    location: 'Vagator Beach, Goa',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    category: 'Concert',
    description: 'The biggest electronic dance music festival in Asia featuring top international DJs.',
    status: 'approved'
  },
  {
    title: 'Tech Innovation Summit',
    price: 1500,
    date: '2025-09-15',
    time: '10:00 AM',
    location: 'Cyber Hub, Gurgaon',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    category: 'Corporate',
    description: 'A gathering of tech leaders and innovators to discuss the future of AI and robotics.',
    status: 'approved'
  },
  {
    title: 'Sweet 16 Birthday Bash',
    price: 500,
    date: '2025-07-20',
    time: '7:00 PM',
    location: 'Skyline Rooftop, Mumbai',
    image: 'https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&w=800&q=80',
    category: 'Party',
    description: 'An unforgettable birthday celebration with live music, dancing, and great food.',
    status: 'approved'
  },
  {
    title: 'Inter-College Tech Fest',
    price: 200,
    date: '2025-10-10',
    time: '9:00 AM',
    location: 'IIT Bombay, Mumbai',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80',
    category: 'Cultural',
    description: 'Annual college fest featuring coding competitions, workshops, and guest lectures.',
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
];

const autoSeed = async () => {
  try {
    console.log('Checking database state...');

    // Only seed users if none exist
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.create(defaultUsers);
      console.log('✅ Default users seeded (Admin & Test User)');
    } else {
      console.log(`ℹ️  Users already exist (${userCount} found) — skipping user seed`);
    }

    // Only seed events if none exist
    const eventCount = await Event.countDocuments();
    if (eventCount === 0) {
      await Event.insertMany(defaultEvents);
      console.log('✅ Default events seeded (9 items)');
    } else {
      console.log(`ℹ️  Events already exist (${eventCount} found) — skipping event seed`);
    }

    // Only seed categories if none exist
    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      await Category.insertMany(defaultCategories);
      console.log('✅ Default categories seeded (7 items)');
    } else {
      console.log(`ℹ️  Categories already exist (${categoryCount} found) — skipping category seed`);
    }

    console.log('✅ Database ready!');
  } catch (error) {
    console.error(`Auto-Seed Error: ${error.message}`);
  }
};

module.exports = autoSeed;
