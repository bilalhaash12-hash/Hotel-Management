const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
  hotel: { type: String, required: true },
  issue: { type: String, required: true },
  status: { type: String, default: 'Pending' }, // Pending, Fixed
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Maintenance', maintenanceSchema);
