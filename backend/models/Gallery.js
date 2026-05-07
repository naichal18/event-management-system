const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    imageUrl: { // Cover image
        type: String,
        required: true,
        trim: true
    },
    images: { // Multiple photos for the gallery
        type: [String],
        default: []
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        default: 'Venue'
    },
    date: {
        type: String,
        required: true,
        default: 'Past Date'
    },
    description: { // Short summary
        type: String,
        required: true
    },
    organizedBy: {
        type: String,
        default: 'Harmoni Events'
    },
    eventType: {
        type: String,
        default: 'Public'
    },
    guestCount: {
        type: String,
        default: '100+'
    },
    organizerNotes: {
        type: String,
        default: ''
    },
    atmosphere: {
        type: String,
        default: 'Energetic'
    },
    highlights: {
        type: [String],
        default: []
    },
    timeline: [
        {
            time: String,
            activity: String,
            description: String,
            imageUrl: String
        }
    ],
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Gallery', gallerySchema);
