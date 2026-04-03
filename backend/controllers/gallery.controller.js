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
        const { imageUrl, title, description, timeline } = req.body;
        
        if (!imageUrl || !title || !description) {
            return res.status(400).json({ message: 'Please provide all fields' });
        }

        const item = await Gallery.create({ imageUrl, title, description, timeline: timeline || [] });
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
