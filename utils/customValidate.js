const mongoose = require('mongoose');

function customValidate(value) {
  if (mongoose.isValidObjectId(value)) {
    return value;
  }
  return undefined;
}

module.exports = { customValidate };
