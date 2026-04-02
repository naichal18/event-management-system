const Booking = require('../models/Booking');
const { v4: uuidv4 } = require('uuid');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
    const { eventId, title, price, location, date, time, image } = req.body;

    if (!eventId) {
        return res.status(400).json({ message: 'Event ID is required' });
    }

    try {
        const booking = await Booking.create({
            userId: req.user._id,
            eventId,
            ticketId: `TKT-${uuidv4().split('-')[0].toUpperCase()}`,
            // We can store title/price/etc in the booking model if we don't want to join every time
            // but for simplicity let's assume we fetch them
        });

        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Server error during booking' });
    }
};

// @desc    Get user bookings
// @route   GET /api/bookings/user
// @access  Private
const getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.user._id }).populate('eventId');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private
const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (booking) {
            if (booking.userId.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'User not authorized to delete this booking' });
            }
            await booking.deleteOne();
            res.json({ message: 'Booking removed' });
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createBooking,
    getUserBookings,
    deleteBooking
};
