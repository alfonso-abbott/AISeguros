const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetToken: String,
  resetTokenExp: Date,
  role: { type: String, default: 'user' }
});

module.exports = mongoose.model('User', userSchema);
