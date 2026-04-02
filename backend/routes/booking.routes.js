const express = require('express');
const router = express.Router();
const { createBooking, getUserBookings, deleteBooking } = require('../controllers/booking.controller');
const { protect } = require('../middleware/auth');

router.post('/', protect, createBooking);
router.get('/user', protect, getUserBookings);
router.delete('/:id', protect, deleteBooking);

module.exports = router;
