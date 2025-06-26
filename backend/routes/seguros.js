const express = require('express');
const router = express.Router();
const Seguro = require('../models/Seguro');

// GET /api/seguros?tipo=&min=&max=&cobertura=
router.get('/', async (req, res) => {
  const { tipo, min, max, cobertura } = req.query;
  const query = {};
  if (tipo) query.tipo = tipo;
  if (cobertura) query.cobertura = cobertura;
  if (min || max) query.precio = {};
  if (min) query.precio.$gte = Number(min);
  if (max) query.precio.$lte = Number(max);
  try {
    const seguros = await Seguro.find(query);
    res.json(seguros);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener seguros' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const seguro = await Seguro.findById(req.params.id);
    if (!seguro) return res.status(404).json({ error: 'Seguro no encontrado' });
    res.json(seguro);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener seguro' });
  }
});

module.exports = router;
