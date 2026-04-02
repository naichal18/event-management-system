const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod = null;

const connectDB = async () => {
    try {
        console.log('Starting In-Memory MongoDB (Reliable Local Mode)...');
        
        mongod = await MongoMemoryServer.create();
        const dbUrl = mongod.getUri();

        const conn = await mongoose.connect(dbUrl);
        console.log(`MongoDB Connected: In-Memory DB @ ${conn.connection.host}`);
        
        return conn;
    } catch (error) {
        console.error(`In-Memory MongoDB Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
