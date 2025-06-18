const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  insurance: { type: mongoose.Schema.Types.ObjectId, ref: 'Insurance' },
  quote: Number,
  document: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Policy', policySchema);
