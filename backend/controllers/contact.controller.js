const Contact = require('../models/Contact');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContactForm = async (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const contact = await Contact.create({
            name,
            email,
            phone,
            message
        });

        res.status(201).json({ message: 'Message sent successfully', data: contact });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    submitContactForm
};
