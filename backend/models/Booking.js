const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    ticketId: {
        type: String,
        required: true
    },
    bookingDate: {
        type: String,
        default: () => new Date().toLocaleDateString()
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
