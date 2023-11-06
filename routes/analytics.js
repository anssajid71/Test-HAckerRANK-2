const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analytics');

router.post('/', analyticsController.createEvent);
router.get('/', analyticsController.getEvents);

module.exports = router;
