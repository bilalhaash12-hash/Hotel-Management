const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  guests: { type: String },
  date: { type: String, required: true },
  time: { type: String },
  days: { type: String },
  adults: { type: String },
  hotel: { type: String, required: true },
  status: { type: String, default: 'Confirmed' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
