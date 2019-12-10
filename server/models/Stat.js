const mongoose = require('mongoose');
const randomstring = require('randomstring');

let generateStatId = () => {
  return randomstring.generate({
    length: 12,
    capitalization: 'lowercase'
  });
};

const statSchema = new mongoose.Schema({
  name: String,
  statId: {
    type: String,
    default: generateStatId,
    index: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  values: [
    {
      valueId: Number,
      value: String,
      created: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('statrec', statSchema);