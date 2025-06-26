const mongoose = require('mongoose');

const seguroSchema = new mongoose.Schema({
  name: String,
  tipo: String,
  precio: Number,
  cobertura: String,
  descripcion: String,
  beneficios: [String],
  exclusiones: [String]
});

module.exports = mongoose.model('Seguro', seguroSchema);
