const mongoose = require('mongoose');

const detailSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  machine: { type: mongoose.Schema.Types.ObjectId, ref: 'Machine' },
  imageUrls: [String]
});

module.exports = mongoose.model('Detail', detailSchema);
