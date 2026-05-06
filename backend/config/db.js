const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;

        // If a real MONGO_URI is provided (not the placeholder), use it
        if (mongoUri && !mongoUri.includes('YOUR_REAL_MONGODB_ATLAS_URL') && !mongoUri.includes('localhost') && !mongoUri.includes('127.0.0.1')) {
            console.log('Connecting to MongoDB Atlas...');
            const conn = await mongoose.connect(mongoUri);
            console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
            return conn;
        }

        // Fallback: In-Memory MongoDB for local development (The "Old Process")
        console.log('No valid MONGO_URI found — starting In-Memory MongoDB (data resets on restart)...');
        const { MongoMemoryServer } = require('mongodb-memory-server');
        
        // Create instance with a bit more configuration to help it start
        const mongod = await MongoMemoryServer.create({
            instance: {
                dbName: 'event-management'
            }
        });
        
        const dbUrl = mongod.getUri();
        const conn = await mongoose.connect(dbUrl);
        console.log(`✅ MongoDB Connected: In-Memory DB @ ${conn.connection.host}`);
        return conn;

    } catch (error) {
        console.error(`❌ Database Connection Error: ${error.message}`);
        // If it's a timeout error from MongoMemoryServer, suggest checking internet
        if (error.message.includes('10000ms')) {
            console.error('Tip: In-Memory MongoDB needs to download a binary. Check your internet connection.');
        }
        process.exit(1);
    }
};

module.exports = connectDB;
