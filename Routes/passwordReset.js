const express = require('express');
const router = express.Router();
const passwordResetController= require('../Controller/password.Controller')

// Route to request password reset
router.post('/request-reset', passwordResetController.requestPasswordReset);

// Route to display the reset password form
router.get('/reset/:token', passwordResetController.displayResetForm);

// Route to reset the password
router.post('/reset/:token', passwordResetController.resetPassword);

module.exports = router;