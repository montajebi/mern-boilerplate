const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    required: true,
    uniuqe: true,
    type: String,
  },
  photoUrl: String,
});

const User = model('User', userSchema);

module.exports = User;
