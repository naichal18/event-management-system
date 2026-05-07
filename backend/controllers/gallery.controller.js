const Gallery = require('../models/Gallery');

const getGalleryItems = async (req, res) => {
    try {
        const items = await Gallery.find({}).sort({ timestamp: -1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const createGalleryItem = async (req, res) => {
    try {
        const { title, description, timeline, location, date, highlights, images, organizedBy, eventType, guestCount, organizerNotes, atmosphere } = req.body;
        const imageUrl = req.file ? `/uploads/admin/${req.file.filename}` : req.body.imageUrl;
        
        if (!imageUrl || !title || !description) {
            return res.status(400).json({ message: 'Please provide all fields (including cover image)' });
        }

        const item = await Gallery.create({ 
            imageUrl, 
            title, 
            description, 
            location: location || 'Venue',
            date: date || 'Past Date',
            organizedBy: organizedBy || 'Harmoni Events',
            eventType: eventType || 'Public',
            guestCount: guestCount || '100+',
            organizerNotes: organizerNotes || '',
            atmosphere: atmosphere || 'Energetic',
            highlights: typeof highlights === 'string' ? JSON.parse(highlights) : (highlights || []),
            images: typeof images === 'string' ? JSON.parse(images) : (images || []),
            timeline: typeof timeline === 'string' ? JSON.parse(timeline) : (timeline || []) 
        });
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteGalleryItem = async (req, res) => {
    try {
        const item = await Gallery.findById(req.params.id);
        if (item) {
            await item.deleteOne();
            res.json({ message: 'Gallery item removed' });
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getGalleryItems, createGalleryItem, deleteGalleryItem };
