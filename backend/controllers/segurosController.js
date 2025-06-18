const Insurance = require('../models/Insurance');

exports.buscar = async (req, res) => {
  const { tipo, precioMin, precioMax, cobertura } = req.query;
  const filtro = {};
  if (tipo) filtro.type = tipo;
  if (precioMin || precioMax) filtro.price = {};
  if (precioMin) filtro.price.$gte = Number(precioMin);
  if (precioMax) filtro.price.$lte = Number(precioMax);
  if (cobertura) filtro.coverage = new RegExp(cobertura, 'i');
  try {
    const seguros = await Insurance.find(filtro);
    res.json(seguros);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar seguros' });
  }
};

exports.recomendar = async (req, res) => {
  const { edad, tipo } = req.body;
  const filtro = {};
  if (tipo) filtro.type = tipo;
  try {
    let seguros = await Insurance.find(filtro).limit(5);
    if (edad) {
      seguros = seguros.filter(s => !s.edadMin || s.edadMin <= edad);
    }
    res.json(seguros);
  } catch (err) {
    res.status(500).json({ error: 'Error al recomendar seguros' });
  }
};
