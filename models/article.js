const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
    minlength: 2,
  },
  title: {
    type: String,
    required: true,
    minlength: 2,
  },
  text: {
    type: String,
    required: true,
    minlength: 2,
  },
  date: {
    type: String,
    required: true,
    minlength: 2,
  },
  source: { type: String, required: true, minlength: 2 },
  link: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Это не похоже на URL',
    },
    required: true,
  },
});
module.exports = mongoose.model('article', articleSchema);
