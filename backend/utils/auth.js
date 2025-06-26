const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No token' });
  try {
    const payload = jwt.verify(auth.split(' ')[1], 'secreto');
    req.userId = payload.id;
    next();
  } catch (e) {
    res.status(401).json({ error: 'Token invalido' });
  }
};
