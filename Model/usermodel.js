const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username :{
        type:String,
        required:true,
        unique:true,
    },
    email :{
        type:String,
        required:true,
        unique:true,
    },
    password :{
        type:String,
        unique:true,
    },
    // Time to allot different roles to users.
    role:{
        type:String,
        enum:['user','admin','moderator'],
        default:'user',
    },
},{timestamps:true})

const User = mongoose.model('User',UserSchema);

module.exports=User;