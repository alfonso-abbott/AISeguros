const mongoose = require('mongoose');

const insuranceSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  coverage: String,
  details: String,
  edadMin: Number
});

module.exports = mongoose.model('Insurance', insuranceSchema);
