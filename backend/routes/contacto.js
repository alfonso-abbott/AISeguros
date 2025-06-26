const express = require('express');
const router = express.Router();
const Contacto = require('../models/Contacto');

router.post('/', async (req, res) => {
  const msg = await Contacto.create(req.body);
  res.json(msg);
});

module.exports = router;
