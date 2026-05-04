const express = require('express');
const router = express.Router();
const { getGalleryItems, createGalleryItem, deleteGalleryItem } = require('../controllers/gallery.controller');
const { protect, admin } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = 'uploads/admin';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Images only (jpg, jpeg, png)'));
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter
});

router.get('/', getGalleryItems);
router.post('/', protect, admin, upload.single('image'), createGalleryItem);
router.delete('/:id', protect, admin, deleteGalleryItem);

module.exports = router;
