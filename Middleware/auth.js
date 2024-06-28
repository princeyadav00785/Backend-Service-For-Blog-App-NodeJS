const jwt= require('jsonwebtoken');
const User = require('../Model/usermodel');

module.exports=(req,res,next)=>{
//  token lo header se.
// token hai ya nhi check kro.
// ab compare kro.

// jo req bhej rhe hai usme header ke auth mai token bhej rhe, bearerand " " add krke.
const token= req.header('Authorization');
if(!token){
    return res.status(401).json({msg:"No Token , authorization denied"})
}

 try{
    const decoded= jwt.verify(token.replace('Bearer ',''),process.env.SECRET_CODE);
   //  yha hum check kr rhe token ko , apne db se compare krke 
   // agr token verify ho gya kisi user se, kisi user ka user token aaya 
   // to vo token jis user ka hia vo user decoded.user mai save ho jayega.
   //  ab hum req.user mai uss user ko daal rhe.
   req.user=decoded.user;
   next();
 }
 catch(err){
    res.status(401).send('Token is not valid')
 }

}