const Post = require('../Model/blogmodel');
const Comment = require('../Model/commentmodel');

// Like a post
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    if (post.likes.includes(req.user.id)) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.push(req.user.id);
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Unlike a post
exports.unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    if (!post.likes.includes(req.user.id)) {
      return res.status(400).json({ msg: 'Post not yet liked' });
    }

    post.likes = post.likes.filter(userId => userId.toString() !== req.user.id);
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Like a comment
exports.likeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }

    if (comment.likes.includes(req.user.id)) {
      return res.status(400).json({ msg: 'Comment already liked' });
    }

    comment.likes.push(req.user.id);
    await comment.save();
    res.json(comment.likes);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Unlike a comment
exports.unlikeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }

    if (!comment.likes.includes(req.user.id)) {
      return res.status(400).json({ msg: 'Comment not yet liked' });
    }

    comment.likes = comment.likes.filter(userId => userId.toString() !== req.user.id);
    await comment.save();
    res.json(comment.likes);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getAllLikedPosts = async (req, res) => {
  try {
    const posts = await Post.find({ likes: req.user.id }).populate('user', 'username email');
    res.status(200).json(posts);
  } catch (err) {
    console.error('Server Error:', err);
    res.status(500).send('Server Error');
  }
};

exports.getAllLikedComments = async (req, res) => {
  try {
    const comments = await Comment.find({ likes: req.user.id }).populate('user', 'username email');
    res.status(200).json(comments);
  } catch (err) {
    console.error('Server Error:', err);
    res.status(500).send('Server Error');
  }
};
