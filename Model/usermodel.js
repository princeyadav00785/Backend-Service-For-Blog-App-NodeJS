const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      unique: true,
    },
    // Time to allot different roles to users.
    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user",
    },
    // For pwd reset fxnctionality
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    // Adding new features For User Profile .
    bio: {
      type: String,
    },
    avatar: {
      type: String,
    },
    location: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
