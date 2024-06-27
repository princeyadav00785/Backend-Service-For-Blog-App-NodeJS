const express = require('express');
const router = express.Router();
const passwordController= require('../Controller/password.Controller')

router.post('/request-reset',passwordController.requestPasswordReset);
router.post('/reset/:token',passwordController.resetPassword);

module.exports = router;