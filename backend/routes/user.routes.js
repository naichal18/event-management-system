const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, changePassword } = require('../controllers/user.controller');
const { protect } = require('../middleware/auth');

router.get('/me', protect, getUserProfile);
router.put('/update', protect, updateUserProfile);
router.post('/change-password', protect, changePassword);

module.exports = router;
