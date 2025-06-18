const mongoose = require('mongoose');

const insurerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nit: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Insurer', insurerSchema);
