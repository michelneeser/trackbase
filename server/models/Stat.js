const mongoose = require('mongoose');
const generateUniqueID = require('../utils/id-generator');

const statSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ''
  },
  statId: {
    type: String,
    default: generateUniqueID,
    index: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  values: [
    {
      valueId: String,
      value: String,
      created: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('statrec', statSchema);