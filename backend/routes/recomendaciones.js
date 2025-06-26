const express = require('express');
const router = express.Router();
const Seguro = require('../models/Seguro');

router.post('/', async (req, res) => {
  try {
    const { tipo, edad, precio } = req.body;

    const query = {};
    if (tipo) query.tipo = tipo;

    if (edad !== undefined && edad !== '') {
      const edadNum = Number(edad);
      if (!isNaN(edadNum)) {
        query.edadMin = { $lte: edadNum };
        query.edadMax = { $gte: edadNum };
      }
    }

    if (precio) {
      switch (precio) {
        case 'low':
          query.precio = { $lt: 100000 };
          break;
        case 'mid':
          query.precio = { $gte: 100000, $lte: 200000 };
          break;
        case 'high':
          query.precio = { $gt: 200000 };
          break;
        default:
          if (!isNaN(Number(precio))) query.precio = Number(precio);
      }
    }

    const seguros = await Seguro.find(query);
    if (seguros.length === 0) {
      return res.json({ message: 'No se encontraron coincidencias' });
    }
    res.json(seguros);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener recomendaciones' });
  }
});

module.exports = router;
