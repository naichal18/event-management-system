const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const autoSeed = require('./config/seeder');

// Route files
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const eventRoutes = require('./routes/event.routes');
const bookingRoutes = require('./routes/booking.routes');
const contactRoutes = require('./routes/contact.routes');

// Load env vars
dotenv.config();

// Connect to In-Memory Database & auto-seed
const startServer = async () => {
    try {
        await connectDB();
        await autoSeed();

        const app = express();

        // Body parser
        app.use(express.json());

        // Enable CORS
        app.use(cors());

        // Mount routers
        app.use('/api/auth', authRoutes);
        app.use('/api/user', userRoutes);
        app.use('/api/events', eventRoutes);
        app.use('/api/bookings', bookingRoutes);
        app.use('/api/contact', contactRoutes);

        // Health check
        app.get('/api/health', (req, res) => res.json({ status: 'up' }));

        const PORT = process.env.PORT || 5001;

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT} (In-Memory MongoDB Mode)`);
        });
    } catch (error) {
        console.error('Server Startup Failed:', error.message);
        process.exit(1);
    }
};

startServer();
