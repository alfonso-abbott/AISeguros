const express = require('express');
const Favorite = require('../models/Favorite');
const Insurance = require('../models/Insurance');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.get('/', async (req, res) => {
  const favs = await Favorite.find({ user: req.user.id }).populate('insurance');
  res.json(favs);
});

router.post('/:insuranceId', async (req, res) => {
  try {
    const fav = await Favorite.findOneAndUpdate(
      { user: req.user.id, insurance: req.params.insuranceId },
      {},
      { upsert: true, new: true }
    );
    res.json(fav);
  } catch (err) {
    res.status(400).json({ error: 'Error al agregar favorito' });
  }
});

router.delete('/:insuranceId', async (req, res) => {
  await Favorite.deleteOne({ user: req.user.id, insurance: req.params.insuranceId });
  res.json({ message: 'Favorito eliminado' });
});

// Ruta para actualizar precio y notificar
router.put('/notify/:insuranceId', async (req, res) => {
  const { price } = req.body;
  try {
    const ins = await Insurance.findByIdAndUpdate(req.params.insuranceId, { price }, { new: true });
    const favs = await Favorite.find({ insurance: ins._id }).populate('user');
    favs.forEach(f => {
      console.log(`Notificar a ${f.user.email} cambio de precio en ${ins.name}`);
    });
    res.json(ins);
  } catch (err) {
    res.status(400).json({ error: 'Error al actualizar precio' });
  }
});

module.exports = router;
