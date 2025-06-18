const express = require('express');
const multer = require('multer');
const Policy = require('../models/Policy');
const auth = require('../middleware/auth');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/quote', auth, async (req, res) => {
  try {
    const { insurance, quote } = req.body;
    const policy = await Policy.create({
      user: req.user.id,
      insurance,
      quote
    });
    res.json(policy);
  } catch (err) {
    res.status(400).json({ error: 'Could not save quote' });
  }
});

router.post('/upload', auth, upload.single('file'), async (req, res) => {
  try {
    const { insurance, quote } = req.body;
    const policy = await Policy.create({
      user: req.user.id,
      insurance,
      quote,
      document: req.file.path
    });
    res.json(policy);
  } catch (err) {
    res.status(400).json({ error: 'Upload failed' });
  }
});

module.exports = router;
