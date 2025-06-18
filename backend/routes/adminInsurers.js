const express = require('express');
const Insurer = require('../models/Insurer');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth, (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'No autorizado' });
  }
  next();
});

router.get('/', async (req, res) => {
  const insurers = await Insurer.find();
  res.json(insurers);
});

router.post('/', async (req, res) => {
  try {
    const insurer = await Insurer.create(req.body);
    res.json(insurer);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const insurer = await Insurer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(insurer);
  } catch (err) {
    res.status(400).json({ error: 'Error al actualizar' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Insurer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Aseguradora eliminada' });
  } catch (err) {
    res.status(400).json({ error: 'Error al eliminar' });
  }
});

module.exports = router;
