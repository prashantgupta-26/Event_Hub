const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.post('/create', eventController.createEvent);
router.get('/all', eventController.getAllEvents);
router.get('/nearby', eventController.getNearbyEvents);

module.exports = router;
