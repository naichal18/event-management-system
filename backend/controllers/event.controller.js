const Event = require('../models/Event');

// @desc    Get all events (Public - Approved only)
// @route   GET /api/events
// @access  Public
const getEvents = async (req, res) => {
    try {
        const events = await Event.find({ status: 'approved' });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get all pending events for admin
// @route   GET /api/events/admin/pending
// @access  Private/Admin
const getPendingEvents = async (req, res) => {
    try {
        const events = await Event.find({ status: 'pending' });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get all events for admin (Admin only)
// @route   GET /api/events/admin
// @access  Private/Admin
const getAdminEvents = async (req, res) => {
    try {
        const events = await Event.find({});
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (event) {
            res.json(event);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Create an event
// @route   POST /api/events
// @access  Private
const createEvent = async (req, res) => {
    try {
        console.log('Backend: Received Event Creation Request Body:', req.body);

        const { title, category, date, time, location, description, price, ai_suggestions, attendees } = req.body;

        // Validation
        if (!title || !category || !location || !date) {
            console.warn('Backend: Validation Failed - Missing required fields');
            return res.status(400).json({ message: 'Title, Category, Location, and Date are required' });
        }

        const event = new Event({
            title,
            image: req.file ? `/uploads/admin/${req.file.filename}` : (req.body.image || 'https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&w=800&q=80'),
            date,
            time: time || '7:00 PM',
            location,
            description: description || '',
            category,
            price: price || 0,
            attendees: attendees || 0,
            ai_suggestions: typeof ai_suggestions === 'string' ? JSON.parse(ai_suggestions) : ai_suggestions,
            status: 'pending' // Users can only create pending events
        });

        const createdEvent = await event.save();
        console.log('Backend: Event successfully created with ID:', createdEvent._id);
        res.status(201).json(createdEvent);
    } catch (error) {
        console.error('Backend: Error Creating Event:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Approve an event
// @route   PUT /api/events/:id/approve
// @access  Private/Admin
const approveEvent = async (req, res) => {
    try {
        console.log("Approving Event ID:", req.params.id);
        const event = await Event.findById(req.params.id);

        if (event) {
            event.status = 'approved';
            const updatedEvent = await event.save();
            res.json(updatedEvent);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        console.error("Approve Event Error:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Reject an event
// @route   PUT /api/events/:id/reject
// @access  Private/Admin
const rejectEvent = async (req, res) => {
    try {
        console.log("Rejecting Event ID:", req.params.id);
        const event = await Event.findById(req.params.id);

        if (event) {
            event.status = 'rejected';
            const updatedEvent = await event.save();
            res.json(updatedEvent);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        console.error("Reject Event Error:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update an event status (Legacy support)
// @route   PATCH /api/events/:id/status
// @access  Private/Admin
const updateEventStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const event = await Event.findById(req.params.id);

        if (event) {
            event.status = status;
            const updatedEvent = await event.save();
            res.json(updatedEvent);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private/Admin
const updateEvent = async (req, res) => {
    try {
        const { title, image, date, time, location, description, category, price, status } = req.body;
        const event = await Event.findById(req.params.id);

        if (event) {
            event.title = title || event.title;
            event.image = image || event.image;
            event.date = date || event.date;
            event.time = time || event.time;
            event.location = location || event.location;
            event.description = description || event.description;
            event.category = category || event.category;
            event.price = price || event.price;
            event.status = status || event.status;

            const updatedEvent = await event.save();
            res.json(updatedEvent);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private/Admin
const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (event) {
            await event.deleteOne();
            res.json({ message: 'Event removed' });
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getEvents,
    getAdminEvents,
    getPendingEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    updateEventStatus,
    approveEvent,
    rejectEvent
};

