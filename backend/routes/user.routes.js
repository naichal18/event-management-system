const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, changePassword, getAllUsers } = require('../controllers/user.controller');
const { protect, admin } = require('../middleware/auth');

router.get('/me', protect, getUserProfile);
router.get('/', protect, admin, getAllUsers);
router.put('/update', protect, updateUserProfile);
router.post('/change-password', protect, changePassword);

module.exports = router;
