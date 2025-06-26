const User = require('../models/User');
const { generateToken, saveToken } = require('../utils/auth');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
};

async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) return res.status(401).json({ error: 'Credenciales invalidas' });
  const token = generateToken();
  saveToken(token, user._id.toString());
  res.json({ token, name: user.name });
}

exports.login = login;
