const express = require('express');
const router = express.Router();
const { submitContactForm, getAllMessages } = require('../controllers/contact.controller');
const { protect, admin } = require('../middleware/auth');

router.post('/', submitContactForm);
router.get('/', protect, admin, getAllMessages);

module.exports = router;
