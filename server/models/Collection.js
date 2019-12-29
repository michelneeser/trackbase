const mongoose = require('mongoose');
const generateId = require('../utils/id-generator');

const transform = {
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
  }
};

const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  collectionId: {
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
  stats: {
    data: [
      {
        statId: { type: String },
        added: { type: Date, default: Date.now }
      }
    ]
  }
}, {
  toObject: transform,
  toJSON: transform
});

module.exports = mongoose.model('coll', collectionSchema);