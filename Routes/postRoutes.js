const express= require('express')
const router= express.Router();
const postController= require('../Controller/postcontroller')
const auth =require('../Middleware/auth')
const role=require('../Middleware/role')

// Private
// Create a blog POST
// POST /api/posts
// auth is middleware.
router.post('/',auth, postController.createPost)

// Get all Posts
// Public
// GET /api/posts
router.get('/',postController.getPosts);

// Get Post BY ID
// Public
// GET /api/posts/:id
router.get('/:id',postController.getPostById);

// Update Post BY ID
// Private
// Put /api/posts/:id
router.put('/:id',auth,role(['admin', 'moderator']),postController.updatePost);

// Delete Post By ID
// Private
// Delete /api/post/:id
router.delete('/:id',auth,role(['admin']),postController.deletePost);

module.exports=router;