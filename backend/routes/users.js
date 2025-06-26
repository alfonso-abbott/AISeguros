const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/authController');
const { auth } = require('../utils/auth');

// GET /api/users
router.get('/', auth, getUsers);

module.exports = router;
