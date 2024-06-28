const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  getPublicProfile
} = require('../Controller/profileController');
const auth = require('../Middleware/auth');

// Get user profile
router.get('/profile', auth, getUserProfile);

// Update user profile
router.put('/profile', auth, updateUserProfile);

// Get public profile
router.get('/profile/:id', getPublicProfile);

module.exports = router;
