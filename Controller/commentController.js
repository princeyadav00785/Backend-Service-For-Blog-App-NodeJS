const Comment= require('../Model/commentmodel');
const Post = require('../Model/blogmodel');

exports.addComment= async(req,res)=>{
  
    // Steps
    // Sbse phle comment add krne ke liye chaiye humhe postid 
    // userid
    // phle check kro post exist krti ya nhi
    // agr krti to comment kr do

    // params mai hum postId bhej rhe 
    const postid=req.params.postId;
    
    try{
        const post = await Post.findById(postid);
        if(!post){
            return res.status(404).send("Post Not Found!!")
        }
        // reques ki body mai content bhej rhe.
        const{content}=req.body;
        const comment = new Comment({
            postid,
            content,
            userid: req.user.id,
        })
        await comment.save();
        return res.status(201).send("Comment added sucessfully !!")

    } catch(err){
        console.log('Server Error !!',err);
        return res.status(500).send("Server Error !!")
    }
}

exports.getComments= async(req,res)=>{
    //  Steps
    // Phle postid nikal lo , kyoki bhaiya comment to saare retrieve ek post ke hi krengey.
    const postid=req.params.postId;
    try {
        const post = await Post.findById(postid);
        if(!post){
            return res.status(404).send("Post Not Found!!")
        }
        const comments= await Comment.find({postid}).populate('userid','username email')
        res.status(200).json(comments);

    }catch(err){
        console.log('Server Error !!',err);
        return res.status(500).send("Server Error !!")
    }
}

exports.updateComment=async(req,res)=>{
    // comments upgrade krne ke liye sbse phle chaiye commentId
    // then check kro exist krta 
    // krta to update kr do , nye content se.
    const {commentId}= req.params;
    const {content}=req.body;
    if (!content) {
      return res.status(400).json({ msg: 'Comment content is required' });
    }
    try{
      const comment = await Comment.findById(commentId);
      if(!comment){
        return res.status(404).send("Comment Not Found!!")
      }
      if(comment.userid.toString()!==req.user.id){
        return res.status(403).json({ msg: 'User not authorized' });
      }
      comment.content=content;
      await comment.save();
      res.status(200).json(comment);
    }catch(err){
        console.log('Server Error !!',err);
        return res.status(500).send("Server Error !!")
    }
}




exports.deleteComment = async (req, res) => {
    const { commentId } = req.params;
  
    try {
      const comment = await Comment.findById(commentId);
  
      if (!comment) {
        return res.status(404).json({ msg: 'Comment not found' });
      }
  
      if (comment.userid.toString() !== req.user.id) {
        return res.status(403).json({ msg: 'User not authorized' });
      }
      await Comment.deleteOne({ _id: commentId });
    //   await comment.remove();
      res.status(200).json({ msg: 'Comment deleted' });
    } catch (err) {
      console.error('Error in deleteComment: ', err);
      res.status(500).send('Server Error');
    }
  };