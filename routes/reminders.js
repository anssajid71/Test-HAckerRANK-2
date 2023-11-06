const express = require('express');
const router = express.Router();
const controller = require('../controllers/reminders');

router.post('/', controller.createReminder);
router.get('/', controller.getAllReminders);
router.get('/:id', controller.getReminderById);

module.exports = router;
