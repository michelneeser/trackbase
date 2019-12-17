const mongoose = require('mongoose');
const generateId = require('../utils/id-generator');

const statSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ''
  },
  statId: {
    type: String,
    default: generateId,
    index: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  values: [
    {
      valueId: { type: String, default: generateId },
      value: String,
      created: { type: Date, default: Date.now }
    }
  ]
}, {
  toJSON: {
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.__v;
      ret.values.forEach(value => {
        delete value._id;
      });
    }
  }
});

module.exports = mongoose.model('record', statSchema);