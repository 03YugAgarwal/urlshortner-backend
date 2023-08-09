let mongoose = require('mongoose');

let URLSchema = mongoose.Schema({
  url: {required: true, type: String},
  short: {required: true, type: String},
});

module.exports = mongoose.model('url', URLSchema);