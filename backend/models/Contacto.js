const mongoose = require('mongoose');

const contactoSchema = new mongoose.Schema({
  name: String,
  email: String,
  tipo: String,
  mensaje: String
});

module.exports = mongoose.model('Contacto', contactoSchema);
