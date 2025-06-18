const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  insurance: { type: mongoose.Schema.Types.ObjectId, ref: 'Insurance' }
});

module.exports = mongoose.model('Favorite', favoriteSchema);
