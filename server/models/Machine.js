const mongoose = require('mongoose');

const machineSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  imageUrl: { type: String, required: true, trim: true },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category' // Reference to Category model
    }
  ]
});

module.exports = mongoose.model('Machine', machineSchema);
