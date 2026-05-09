const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  hotelName: { type: String, required: true },
  location: { type: String },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Room', roomSchema);
