const express= require('express');
const router =express.Router();
const commentController = require('../Controller/commentController');
const auth = require('../Middleware/auth');



// 4 routes banengey
// Same as Post/blog jaise
// middleware se auth hoga,user ka
// controller mai main fxn.

// Add a comment to a post
router.post('/:postId', auth, commentController.addComment);

// Get comments for a post
router.get('/:postId', commentController.getComments);

// Update a comment
router.put('/:commentId', auth, commentController.updateComment);

// Delete a comment
router.delete('/:commentId', auth, commentController.deleteComment);

module.exports = router;