const mongoose = require('mongoose');
const connectDB=  async()=>{
    await mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("MongoDB Sucessfully Conected.")
    }).catch((err)=>{
        console.log("Error",err);
    })

}
module.exports = connectDB;