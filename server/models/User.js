const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  cart: [{
    detail: { type: mongoose.Schema.Types.ObjectId, ref: 'Detail' },
    quantity: { type: Number, default: 1 }
  }]
});

module.exports = mongoose.model('User', UserSchema);
