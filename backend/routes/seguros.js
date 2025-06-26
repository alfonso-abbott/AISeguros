const express = require('express');
const router = express.Router();
const mock = require('../utils/mockSeguros');

// GET /api/seguros?tipo=&min=&max=&cobertura=
router.get('/', (req, res) => {
  const { tipo, min, max, cobertura } = req.query;
  let seguros = [...mock];
  if (tipo) seguros = seguros.filter(s => s.tipo === tipo);
  if (cobertura) seguros = seguros.filter(s => s.cobertura === cobertura);
  if (min) seguros = seguros.filter(s => s.precio >= Number(min));
  if (max) seguros = seguros.filter(s => s.precio <= Number(max));
  res.json(seguros);
});

module.exports = router;
