const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const dotenv = require('dotenv');
const Event = require('./models/Event');
const path = require('path');
const fs = require('fs-extra');

dotenv.config();

const events = [
  {
    title: 'INDIAN PREMIER LEAGUE',
    price: 2499,
    date: '2025-05-15',
    time: '7:30 PM',
    location: 'Wankhede Stadium, Mumbai',
    image: 'https://onecricketnews.akamaized.net/parth-editor/oc-dashboard/news-images-prod/1709033614977_ipl2024.jpeg?type=mq',
    category: 'Cricket'
  },
  {
    title: 'WOMEN PREMIER LEAGUE',
    price: 599,
    date: '2025-04-20',
    time: '5:00 PM',
    location: 'M. Chinnaswamy Stadium, Bengaluru',
    image: 'https://images.indianexpress.com/2023/03/WPL-2-1.jpg?w=1200',
    category: 'Cricket'
  },
  {
    title: 'GOKULDHAM PREMIER LEAGUE',
    price: 200,
    date: '2025-06-01',
    time: '10:00 AM',
    location: 'Gokuldham Society Ground, Goregaon',
    image: 'https://images.unsplash.com/photo-1562077772-3bd90403f7f0?auto=format&fit=crop&w=800&q=80',
    category: 'Cricket'
  },
  {
    title: 'CRICKET GROUND PREMIER',
    price: 5000,
    date: '2025-07-10',
    time: '2:00 PM',
    location: 'Eden Gardens, Kolkata',
    image: 'https://images.unsplash.com/photo-1624880357913-a8539238245b?auto=format&fit=crop&w=800&q=80',
    category: 'Cricket'
  },
  {
    title: 'KITE FESTIVAL',
    price: 299,
    date: '2025-01-14',
    time: '10:00 AM',
    location: 'Ahmedabad Riverfront, Ahmedabad',
    image: 'https://shreetoursudaipur.com/wp-content/uploads/2025/12/a-vibrant-photograph-of-an-international_MlPItNNdSuWpaUgGhM2fzg_iBx46VmQSAmHgS_OA6eI8w-1.jpeg',
    category: 'Festival'
  },
  {
    title: 'HOLI FESTIVAL',
    price: 399,
    date: '2025-03-14',
    time: '11:00 AM',
    location: 'Delhi Grounds, New Delhi',
    image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80',
    category: 'Festival'
  },
  {
    title: 'GARBA NIGHT',
    price: 499,
    date: '2025-10-05',
    time: '8:00 PM',
    location: 'GMDC Ground, Ahmedabad',
    image: 'https://media.istockphoto.com/id/2195664068/photo/india-navratri-festival-in-baroda-gujarat.jpg?s=612x612&w=0&k=20&c=EIDCjLJK9f_UcMuwsv-Ga0HDHQiKiBAvJUraP5mU8N0=',
    category: 'Cultural'
  },
  {
    title: 'DIWALI PARTY',
    price: 799,
    date: '2025-11-01',
    time: '7:00 PM',
    location: 'Mumbai Banquet Hall, Mumbai',
    image: 'https://media.istockphoto.com/id/698710824/photo/indian-family-celebrating-diwali-festival-with-fire-crackers.jpg?s=612x612&w=0&k=20&c=SfPOIRnxUnQ_d6MWyergGsRqIrAWw8fP_C-zUgL6lo0=',
    category: 'Festival'
  },
  {
    title: 'CHRISTMAS PARTY',
    price: 999,
    date: '2025-12-25',
    time: '9:00 PM',
    location: 'Goa Beach Club, Goa',
    image: 'https://www.sloshout.com/blog/wp-content/uploads/Fun-and-Unique-Ideas-to-Plan-the-Perfect-Office-Christmas-Party-Sloshout.jpg',
    category: 'Party'
  }
];

const importData = async () => {
  try {
    let dbUrl = process.env.MONGO_URI;

    // Use memory server if local environment
    if (!dbUrl || dbUrl.includes('localhost')) {
        console.log('Seeding using local zero-config MongoDB...');
        
        const dbPath = path.join(__dirname, '../data/db');
        await fs.ensureDir(dbPath);

        const mongod = await MongoMemoryServer.create({
            instance: {
                dbPath: dbPath,
                storageEngine: 'wiredTiger',
            }
        });

        dbUrl = mongod.getUri();
    }

    await mongoose.connect(dbUrl);

    await Event.deleteMany();
    await Event.insertMany(events);

    console.log('Data Imported Successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
