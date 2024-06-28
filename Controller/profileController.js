const User = require("../Model/usermodel");


exports.getUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.status(200).json(user);
    } catch (err) {
      console.error('Server Error:', err);
      res.status(500).send('Server Error');
    }
  };
  
  exports.updateUserProfile = async (req, res) => {
    const { bio, avatar, location } = req.body;
  
    try {
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { bio, avatar, location },
        { new: true, runValidators: true }
      ).select('-password');
      res.status(200).json(user);
    } catch (err) {
      console.error('Server Error:', err);
      res.status(500).send('Server Error');
    }
  };
  
  exports.getPublicProfile = async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-password -email -resetPasswordToken -resetPasswordExpires');
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      res.status(200).json(user);
    } catch (err) {
      console.error('Server Error:', err);
      res.status(500).send('Server Error');
    }
  };
  
  