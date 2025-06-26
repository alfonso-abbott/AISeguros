const User = require('../models/User');
const { generateToken, saveToken } = require('../utils/auth');

async function register(req, res) {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    res.json({ id: user._id, email: user.email });
  } catch (err) {
    res.status(400).json({ error: 'Error al registrar usuario' });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) return res.status(401).json({ error: 'Credenciales invalidas' });
  const token = generateToken();
  saveToken(token, user._id.toString());
  res.json({ token, name: user.name });
}

module.exports = { register, login };
