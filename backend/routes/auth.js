const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getUsers,
  forgotPassword,
  resetPassword
} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/usuarios', getUsers);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
