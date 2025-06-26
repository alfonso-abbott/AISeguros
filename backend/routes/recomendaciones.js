const express = require('express');
const router = express.Router();
const mock = require('../utils/mockSeguros');

router.post('/', (req, res) => {
  const { edad, tipo } = req.body;
  // lógica de ejemplo: filtrar por tipo y precio según edad
  let seguros = mock.filter(s => !tipo || s.tipo === tipo);
  if (edad < 30) seguros = seguros.filter(s => s.precio <= 150);
  // mezclar para que las recomendaciones cambien
  seguros = seguros.sort(() => Math.random() - 0.5);
  res.json(seguros.slice(0, 3));
});

module.exports = router;
