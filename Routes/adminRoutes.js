const express = require('express');
const router = express.Router();
const adminController = require('../Controller/adminController');
const auth = require('../Middleware/auth');
const role = require('../Middleware/role');

// Admin routes
// Steps..
// To hum chahte hai ki admin ye pass ye ye features ho..
// Get ALL users. (with their roles).
// Get a particular user
// Delete any user
// Change Role of other users.

router.get('/users',auth,role(['admin']),adminController.getAllUsers);
router.put('/users/:id',auth,role(['admin']),adminController.updateUser);
router.delete('/users/:id',auth,role(['admin']),adminController.deleteUser);


module.exports = router;