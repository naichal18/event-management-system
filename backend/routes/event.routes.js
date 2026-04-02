const express = require('express');
const router = express.Router();
const { getEvents, getEventById } = require('../controllers/event.controller');

router.get('/', getEvents);
router.get('/:id', getEventById);

module.exports = router;
