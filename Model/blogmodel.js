const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]

})


const Post = mongoose.model('Post',PostSchema);

module.exports= Post;