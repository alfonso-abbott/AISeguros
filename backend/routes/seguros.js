const express = require('express');
const { buscar, recomendar } = require('../controllers/segurosController');

const router = express.Router();

router.get('/buscar', buscar);
router.post('/recomendar', recomendar);

module.exports = router;
