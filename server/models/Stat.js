const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const statSchema = new Schema({
  createDate: {
    type: Date,
    default: Date.now
  },
  values: [
    { value: String, date: { type: Date, default: Date.now } }
  ]
});

module.exports = mongoose.model('stat', statSchema);