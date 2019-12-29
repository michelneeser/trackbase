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
  description: {
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
  public: {
    type: Boolean,
    default: false
  },
  chart: {
    type: Boolean,
    default: true
  },
  showroom: {
    type: Boolean,
    default: false
  },
  values: {
    data: [
      {
        valueId: { type: String, default: generateId },
        value: String,
        timestamp: { type: Date, default: Date.now },
        created: { type: Date, default: Date.now }
      }
    ]
  }
}, {
  toObject: transform,
  toJSON: transform
});

module.exports = mongoose.model('record', statSchema);