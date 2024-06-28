const express = require('express');
const router = express.Router();
const { likePost, unlikePost, likeComment, unlikeComment,getAllLikedPosts, getAllLikedComments } = require('../Controller/likesControllers');
const auth = require('../Middleware/auth');

// Like and unlike a post
router.put('/posts/:id/like', auth, likePost);
router.put('/posts/:id/unlike', auth, unlikePost);

// Like and unlike a comment
router.put('/comments/:id/like', auth, likeComment);
router.put('/comments/:id/unlike', auth, unlikeComment);

// Get all liked posts
router.get('/posts/liked', auth, getAllLikedPosts);

// Get all liked comments
router.get('/comments/liked', auth, getAllLikedComments);

module.exports = router;
