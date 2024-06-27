const Post = require("../Model/blogmodel");

exports.createPost = async (req, res) => {
  //    Steps.
  // phle req se info nikalo.
  // then post ka object create krke db mai .
  const { title, content } = req.body;
  const userId = req.user.id;
  try {
    // important ek newpost Post type ki..
    const newPost = new Post({
      title,
      content,
      author: req.user.id,
      // createdAt:Date.now
    });
    const post = await newPost.save();
    res.status(201).send(`Post created sucessfully : ${newPost}`);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error!!");
  }
};

exports.getPosts = async (req,res) => {
  // isme humhe saari posts fetch krengey.

  try {
    const posts = await Post.find().populate("author", "username email");
    res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error !!");
  }
};

exports.getPostById = async (req,res) => {
  // steps.
  // phle req se id nikalo
  // check kro vo exist krti ya nhi, findone
  // agr krti to return kr do.

  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "username email"
    );
    if (!post) {
      return res.status(404).json("Post Not found !!");
    }
    res.json(post);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error !!");
  }
};

exports.deletePost = async (req,res) => {
  // So,same as getbyid
  // check kro user author haai ya nhi
  //  req se id nikal check kr , agr ho toh delete maar do
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post doesn't exist!!" });
    }
    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorised !!" });
    }
    await Post.deleteOne({ _id: req.params.id });
    res.json({ msg: "Post Removed" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error !!");
  }
};

exports.updatePost = async (req,res) => {
  // phle content nikal lo req se
  //  phir check kro post ko id se ki exist kri
  // check kro user author hai ya nhi
  // content ko update maaro
  //  nya conent save maaro
  try {
    const { title, content } = req.body;
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    post = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: { title, content } },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error !!");
  }
};
