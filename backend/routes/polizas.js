const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Poliza = require('../models/Poliza');
const { auth } = require('../utils/auth');

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '_' + file.originalname)
});

const fileFilter = (req, file, cb) => {
  if (/pdf|png|jpg|jpeg/.test(file.mimetype)) cb(null, true);
  else cb(new Error('Tipo de archivo no permitido'));
};

const upload = multer({ storage, fileFilter });

router.post('/upload', auth, upload.single('archivo'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Archivo no enviado' });
    const poliza = await Poliza.create({
      user: req.userId,
      filename: req.file.filename,
      mimetype: req.file.mimetype
    });
    res.json({ message: 'Archivo subido con éxito', nombre: req.file.filename });
  } catch (err) {
    res.status(500).json({ error: 'Error al procesar archivo' });
  }
});

router.get('/', auth, async (req, res) => {
  const polizas = await Poliza.find({ user: req.userId });
  res.json(polizas);
});

module.exports = router;
