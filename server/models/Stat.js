const mongoose = require('mongoose');
const generateId = require('../utils/id-generator');

const transform = {
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
  }
};

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
  values: {
    data: [
      {
        valueId: { type: String, default: generateId },
        value: String,
        created: { type: Date, default: Date.now }
      }
    ]
  }
}, {
  toObject: transform,
  toJSON: transform
});

module.exports = mongoose.model('record', statSchema);