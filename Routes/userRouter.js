const express= require('express');
const router= express.Router();
const userController = require('../Controller/usercontroller');
const auth = require('../Middleware/auth');


router.post('/register',userController.registerUser);
router.post('/login',userController.loginUser);
router.post('/logout', auth, userController.logoutUser);


module.exports=router;