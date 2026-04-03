const express = require('express');
const router = express.Router();
const { createMessage, getMessages } = require('../controllers/message.controller');
const { protect, admin } = require('../middleware/auth');

router.post('/', createMessage);
router.get('/', protect, admin, getMessages);

module.exports = router;
