// controllers/passwordResetController.js
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../Model/usermodel');
const bcrypt = require('bcryptjs');

exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ msg: "Please enter an email address" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "No user found with this email" });
    }

    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'py8881065817@gmail.com',
        pass: process.env.GMAIL_PWD,
      }
    });

    const mailOptions = {
      to: user.email,
      from: 'py8881065817@gmail.com',
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
             Please click on the following link, or paste this into your browser to complete the process:\n\n
             http://${req.headers.host}/reset/${token}\n\n
             If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.error('There was an error: ', err);
      } else {
        res.status(200).json({ msg: 'Recovery email sent' });
      }
    });
  } catch (err) {
    console.error('Error in requestPasswordReset: ', err);
    res.status(500).send('Server Error');
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ msg: 'Password reset token is invalid or has expired' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ msg: 'Password has been reset' });
  } catch (err) {
    console.error('Error in resetPassword: ', err);
    res.status(500).send('Server Error');
  }
};
