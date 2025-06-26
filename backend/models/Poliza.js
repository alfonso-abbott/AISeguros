const mongoose = require('mongoose');

const polizaSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  filename: String,
  mimetype: String
});

module.exports = mongoose.model('Poliza', polizaSchema);
