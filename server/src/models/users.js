const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accountUUID: { type: String, required: true, unique: true },
}, {
  collection: 'users'
});

const users = mongoose.model('User', userSchema);

module.exports = users;
