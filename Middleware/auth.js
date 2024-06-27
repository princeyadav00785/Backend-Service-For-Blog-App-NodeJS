const jwt= require('jsonwebtoken');
const User = require('../Model/usermodel');

module.exports=(req,res,next)=>{
//  token lo header se.
// token hai ya nhi check kro.
// ab compare kro.
const token= req.header('Authorization');
if(!token){
    return res.status(401).json({msg:"No Token , authorization denied"})
}

 try{
    const decoded= jwt.verify(token.replace('Bearer ',''),process.env.SECRET_CODE);
   req.user=decoded.user;
   next();
 }
 catch(err){
    res.status(401).send('Token is not valid')
 }

}