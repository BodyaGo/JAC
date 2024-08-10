const mongoose = require('mongoose');

const DetailSchema = new mongoose.Schema({
  machine: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: false }
});

module.exports = mongoose.model('Detail', DetailSchema);
