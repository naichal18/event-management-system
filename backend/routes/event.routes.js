const express = require('express');
const router = express.Router();

const {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    getAdminEvents,
    getPendingEvents,
    approveEvent,
    rejectEvent,
    updateEventStatus
} = require('../controllers/event.controller');

const { protect, admin } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = 'uploads/admin';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Config
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
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    fileFilter
});

// Public routes
router.get('/', getEvents);
router.get('/:id', getEventById);

// User routes
router.post('/', protect, upload.single('image'), createEvent);

// Admin routes
router.get('/admin', protect, admin, getAdminEvents);
router.get('/admin/pending', protect, admin, getPendingEvents);

router.put('/:id/approve', protect, admin, approveEvent);
router.put('/:id/reject', protect, admin, rejectEvent);

router.patch('/:id/status', protect, admin, updateEventStatus);

router.put('/:id', protect, admin, updateEvent);
router.delete('/:id', protect, admin, deleteEvent);

module.exports = router;