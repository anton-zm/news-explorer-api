const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },

  phone: {
    type: String,
    required: true,
    minlength: 6,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});
module.exports = mongoose.model('contact', contactSchema);
