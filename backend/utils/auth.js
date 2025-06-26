const crypto = require('crypto');
const sessions = {};

function generateToken() {
  return crypto.randomBytes(16).toString('hex');
}

function saveToken(token, userId) {
  sessions[token] = userId;
}

function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token' });
  const token = authHeader.split(' ')[1];
  const userId = sessions[token];
  if (!userId) return res.status(401).json({ error: 'Token invalido' });
  req.userId = userId;
  next();
}

module.exports = {
  generateToken,
  saveToken,
  auth
};
