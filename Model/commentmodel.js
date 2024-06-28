const mongoose= require('mongoose');


const CommentSchema = new mongoose.Schema({
    postid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post',
        required:true,
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    content :{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
}
)


const Comment = mongoose.model('Comment',CommentSchema);

module.exports= Comment;