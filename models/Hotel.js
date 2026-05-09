const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  hotel: { type: String, required: true },
  manager: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String, default: 'Pending' }, // Pending, Approved, Rejected
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Hotel', hotelSchema);
