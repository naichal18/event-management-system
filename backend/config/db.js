const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Prefer MongoDB Atlas URI from environment if available
        if (process.env.MONGO_URI) {
            console.log('Connecting to MongoDB Atlas...');
            const conn = await mongoose.connect(process.env.MONGO_URI);
            console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
            return conn;
        }

        // Fallback: In-Memory MongoDB for local development
        console.log('No MONGO_URI found — starting In-Memory MongoDB (data resets on restart)...');
        const { MongoMemoryServer } = require('mongodb-memory-server');
        const mongod = await MongoMemoryServer.create();
        const dbUrl = mongod.getUri();
        const conn = await mongoose.connect(dbUrl);
        console.log(`MongoDB Connected: In-Memory DB @ ${conn.connection.host}`);
        return conn;

    } catch (error) {
        console.error(`Database Connection Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
