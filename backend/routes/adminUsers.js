const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Middleware simple para verificar rol admin
router.use(auth, (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'No autorizado' });
  }
  next();
});

router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: 'Error al actualizar' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Usuario eliminado' });
  } catch (err) {
    res.status(400).json({ error: 'Error al eliminar' });
  }
});

module.exports = router;
