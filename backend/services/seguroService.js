const Insurance = require('../models/Insurance');
exports.search = (filter) => Insurance.find(filter);
exports.recommend = (filter) => Insurance.find(filter).limit(5);
