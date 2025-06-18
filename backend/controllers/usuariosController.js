const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

function validarPassword(pass) {
  return /[A-Za-z]/.test(pass) && /\d/.test(pass) && pass.length >= 8;
}

exports.registrar = async (req, res) => {
  const { nombre, correo, password, role } = req.body;
  if (!nombre || !correo || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  if (!validarPassword(password)) {
    return res.status(400).json({ error: 'Contrase\u00f1a d\u00e9bil' });
  }
  try {
    const existente = await User.findOne({ email: correo });
    if (existente) {
      return res.status(400).json({ error: 'Correo ya registrado' });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name: nombre, email: correo, password: hashed, role: role || 'user' });
    console.log(`Enviar correo de confirmaci\u00f3n a ${correo}`);
    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

exports.login = async (req, res) => {
  const { correo, password } = req.body;
  if (!correo || !password) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }
  try {
    const user = await User.findOne({ email: correo });
    if (!user) {
      return res.status(400).json({ error: 'Credenciales inv\u00e1lidas' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: 'Credenciales inv\u00e1lidas' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30m' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: 'Error al iniciar sesi\u00f3n' });
  }
};
