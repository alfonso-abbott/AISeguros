const express = require('express');
const ContactMessage = require('../models/ContactMessage');

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }
  try {
    const msg = await ContactMessage.create({ name, email, message });
    console.log(`Nuevo mensaje de contacto de ${email}`);
    res.json({ id: msg._id });
  } catch (err) {
    res.status(500).json({ error: 'Error al enviar mensaje' });
  }
});

module.exports = router;
