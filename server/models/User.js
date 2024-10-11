const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    provider: String,
    providerId: String,
    name: String,
    email: { type: String, unique: true },
    avatar: String,
    username: {
      type: String,
      unique: true,
      sparse: true, // This allows multiple documents with null username
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
