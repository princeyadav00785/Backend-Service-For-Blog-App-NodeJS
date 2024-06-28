const express = require('express');
const router = express.Router();
const auth = require('../Middleware/auth');
const notificationController = require('../Controller/notificationController');

router.get('/', auth, notificationController.getNotifications);
router.put('/:id', auth, notificationController.markAsRead);

module.exports = router;