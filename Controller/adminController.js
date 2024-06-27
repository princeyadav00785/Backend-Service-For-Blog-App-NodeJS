const User = require('../Model/usermodel');

exports.getAllUsers=async(req,res)=>{
   
    try{
      const users= await User.find().select('-password');
      res.json(users);
    }catch(err){
       console.log("Error ooccured !!",err);
       return res.json(500).send('Server Error!!');
    }
}

// Update User Role
exports.updateUser=async(req,res)=>{
// Steps
// sbse phle to id lo req se then socho
// now id se dhundo exist krta bhi ya nhi
// agar krta to destructure krke naye values update kr do

    try{
        const {role}=req.body;
        const user= await User.findByIdAndUpdate(req.params.id,{role},{new:true}).select('-password');
        res.json(user);
    }catch(err){
        console.log("Error ooccured !!",err);
        return res.json(500).send('Server Error!!');
     }
}

exports.deleteUser=async(req,res)=>{
   try{
    await User.findByIdAndDelete(req.params.id);
    res.json({msg:"User removed !!"})
   }catch(err){
    console.log("Error ooccured !!",err);
    return res.json(500).send('Server Error!!');
 }
}