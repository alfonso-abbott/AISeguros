const User = require('../models/User');
const { generateToken, saveToken } = require('../utils/auth');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

// ✅ REGISTRO - sin hashear aquí
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validar si ya existe
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Correo ya registrado' });
    }

    // Se guardará con hash automáticamente gracias al pre('save') en el modelo
    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
};

// ✅ LOGIN
async function login(req, res) {
  const { email, password } = req.body;

  // Buscar usuario
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Credenciales invalidas' });

  // Comparar contraseña con hash
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: 'Credenciales invalidas' });

  // Generar token
  const token = generateToken();
  saveToken(token, user._id.toString());

  res.json({ token, name: user.name });
}

exports.login = login;

// ✅ OBTENER USUARIOS (sin password)
exports.getUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

// ✅ OLVIDÉ CONTRASEÑA
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

  const token = uuidv4();
  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 10 * 60 * 1000; // 10 min
  await user.save();

  res.json({ message: 'Token de recuperación generado', token });
};

// ✅ RESETEO DE CONTRASEÑA
exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() }
  });

  if (!user) return res.status(400).json({ error: 'Token inválido o expirado' });

  user.password = password; // 🔁 se hasheará por el pre('save')
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();

  res.json({ message: 'Contraseña actualizada con éxito' });
};
