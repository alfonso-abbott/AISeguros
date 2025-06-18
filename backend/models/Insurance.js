const mongoose = require('mongoose');

const insuranceSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  details: String
});

module.exports = mongoose.model('Insurance', insuranceSchema);
