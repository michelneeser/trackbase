const randomstring = require('randomstring');

function generateUniqueID() {
  return randomstring.generate({
    length: 12,
    capitalization: 'lowercase'
  });
};

module.exports = generateUniqueID;