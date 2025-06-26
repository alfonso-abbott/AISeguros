const express = require('express');
const router = express.Router();
const multer = require('multer');
const Poliza = require('../models/Poliza');
const auth = require('../utils/auth');

const upload = multer({ dest: 'uploads/' });

router.post('/', auth, upload.single('file'), async (req, res) => {
  const poliza = await Poliza.create({
    user: req.userId,
    filename: req.file.originalname,
    mimetype: req.file.mimetype
  });
  res.json(poliza);
});

router.get('/', auth, async (req, res) => {
  const polizas = await Poliza.find({ user: req.userId });
  res.json(polizas);
});

module.exports = router;
