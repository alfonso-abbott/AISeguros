const express = require('express');
const Insurance = require('../models/Insurance');

const router = express.Router();

router.get('/search', async (req, res) => {
  const q = req.query.q || '';
  const insurances = await Insurance.find({ name: new RegExp(q, 'i') });
  res.json(insurances);
});

router.get('/compare', async (req, res) => {
  const ids = req.query.ids ? req.query.ids.split(',') : [];
  const insurances = await Insurance.find({ _id: { $in: ids } });
  res.json(insurances);
});

module.exports = router;
