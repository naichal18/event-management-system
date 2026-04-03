const Message = require('../models/Message');

// @desc    Submit a contact message
// @route   POST /api/messages
// @access  Public
const createMessage = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        console.log("Incoming contact message:", req.body); // STEP 5: VERIFY DATABASE WRITE
        
        if (!name || !email || !phone || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newMessage = await Message.create({ name, email, phone, message });
        console.log("Successfully saved message to DB:", newMessage); // STEP 5: VERIFY DATABASE WRITE
        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error saving message:", error.message);
        res.status(500).json({ message: error.message || 'Server error' });
    }
};

// @desc    Get all contact messages
// @route   GET /api/messages
// @access  Private/Admin
const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({}).sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createMessage,
    getMessages
};
