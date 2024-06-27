const express= require('express');
const router= express.Router();
const userController = require('../Controller/usercontroller');


router.post('/register',userController.registerUser);
router.post('/login',userController.loginUser);


module.exports=router;