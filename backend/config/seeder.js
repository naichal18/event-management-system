const Event = require('../models/Event');
const User = require('../models/User');
const Category = require('../models/Category');

const defaultEvents = [
  {
    title: 'INDIAN PREMIER LEAGUE',
    price: 2499,
    date: '2025-05-15',
    time: '7:30 PM',
    location: 'Wankhede Stadium, Mumbai',
    image: 'https://onecricketnews.akamaized.net/parth-editor/oc-dashboard/news-images-prod/1709033614977_ipl2024.jpeg?type=mq',
    category: 'Cricket',
    description: 'The biggest cricket league in the world, featuring top international players.'
  },
  {
    title: 'WOMEN PREMIER LEAGUE',
    price: 599,
    date: '2025-04-20',
    time: '5:00 PM',
    location: 'M. Chinnaswamy Stadium, Bengaluru',
    image: 'https://images.indianexpress.com/2023/03/WPL-2-1.jpg?w=1200',
    category: 'Cricket',
    description: 'Celebrating women in cricket with the premier league event.'
  },
  {
    title: 'GLOBAL MUSIC CONCERT',
    price: 3499,
    date: '2025-08-15',
    time: '6:30 PM',
    location: 'DY Patil Stadium, Navi Mumbai',
    image: 'https://curlytales.com/wp-content/uploads/2023/01/cover-1-9.jpg',
    category: 'Concert',
    description: 'An electrifying music concert featuring top international artists.'
  },
  {
    title: 'CRICKET GROUND PREMIER',
    price: 5000,
    date: '2025-07-10',
    time: '2:00 PM',
    location: 'Eden Gardens, Kolkata',
    image: 'https://images.unsplash.com/photo-1624880357913-a8539238245b?auto=format&fit=crop&w=800&q=80',
    category: 'Cricket',
    description: 'A premier cricket experience at the iconic Eden Gardens.'
  },
  {
    title: 'KITE FESTIVAL',
    price: 299,
    date: '2025-01-14',
    time: '10:00 AM',
    location: 'Ahmedabad Riverfront, Ahmedabad',
    image: 'https://shreetoursudaipur.com/wp-content/uploads/2025/12/a-vibrant-photograph-of-an-international_MlPItNNdSuWpaUgGhM2fzg_iBx46VmQSAmHgS_OA6eI8w-1.jpeg',
    category: 'Festival',
    description: 'Experience the vibrant colors of the international kite festival.'
  },
  {
    title: 'HOLI FESTIVAL',
    price: 399,
    date: '2025-03-14',
    time: '11:00 AM',
    location: 'Delhi Grounds, New Delhi',
    image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80',
    category: 'Festival',
    description: 'Join the festival of colors and celebrate the spirit of Holi.'
  },
  {
    title: 'GARBA NIGHT',
    price: 499,
    date: '2025-10-05',
    time: '8:00 PM',
    location: 'GMDC Ground, Ahmedabad',
    image: 'https://media.istockphoto.com/id/2195664068/photo/india-navratri-festival-in-baroda-gujarat.jpg?s=612x612&w=0&k=20&c=EIDCjLJK9f_UcMuwsv-Ga0HDHQiKiBAvJUraP5mU8N0=',
    category: 'Cultural',
    description: 'A spectacular Navratri Garba night with traditional music and dancing.'
  },
  {
    title: 'DIWALI PARTY',
    price: 799,
    date: '2025-11-01',
    time: '7:00 PM',
    location: 'Mumbai Banquet Hall, Mumbai',
    image: 'https://media.istockphoto.com/id/698710824/photo/indian-family-celebrating-diwali-festival-with-fire-crackers.jpg?s=612x612&w=0&k=20&c=SfPOIRnxUnQ_d6MWyergGsRqIrAWw8fP_C-zUgL6lo0=',
    category: 'Festival',
    description: 'Celebrate the festival of lights with a grand Diwali party.'
  },
  {
    title: 'CHRISTMAS PARTY',
    price: 999,
    date: '2025-12-25',
    time: '9:00 PM',
    location: 'Goa Beach Club, Goa',
    image: 'https://www.sloshout.com/blog/wp-content/uploads/Fun-and-Unique-Ideas-to-Plan-the-Perfect-Office-Christmas-Party-Sloshout.jpg',
    category: 'Party',
    description: 'A beach-side Christmas celebration in the heart of Goa.'
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
