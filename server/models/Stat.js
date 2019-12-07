const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const statSchema = new Schema({
  createDate: {
    type: Date,
    default: Date.now
  },
  values: {
    type: Array
  }
});

module.exports = mongoose.model('stat', statSchema);