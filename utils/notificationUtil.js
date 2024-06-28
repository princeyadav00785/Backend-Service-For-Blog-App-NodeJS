const Notification = require('../Model/notificationmodel');


// Just a fxn , jo bss notifications create rha , aur kuch nhi.
exports.createNotification = async (user, type, message) => {
  try {
    const notification = new Notification({ user, type, message });
    await notification.save();
  } catch (err) {
    console.error('Error creating notification:', err);
  }
};
