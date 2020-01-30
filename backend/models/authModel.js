const mongoose = require('mongoose');

const AuthSchema = mongoose.Schema({
  Username: {
    type: 'String',
    required: true,
    trim: true,
    unique: true,
  },
  Password: {
    type: 'String',
    trim: true,
    required: true,
  },
  ShortLivedToken: {
    trim: true,
    type: 'String',
  },
  LongLivedToken: {
    trim: true,
    type: 'String',
  }
});

module.exports = mongoose.model('auth', AuthSchema)