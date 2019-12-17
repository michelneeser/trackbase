const randomstring = require('randomstring');

function generateId() {
  return randomstring.generate({
    length: 12,
    capitalization: 'lowercase'
  });
};

module.exports = generateId;