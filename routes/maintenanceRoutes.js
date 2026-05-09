const express = require('express');
const router = express.Router();
const Maintenance = require('../models/Maintenance');

// Create maintenance log
router.post('/', async (req, res) => {
  try {
    const newLog = new Maintenance(req.body);
    await newLog.save();
    res.status(201).json({ message: 'Maintenance log created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating maintenance log', error: error.message });
  }
});

// Get all maintenance logs
router.get('/', async (req, res) => {
  try {
    const logs = await Maintenance.find();
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching maintenance logs', error: error.message });
  }
});

// Update maintenance status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedLog = await Maintenance.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updatedLog) return res.status(404).json({ message: 'Maintenance log not found' });
    res.status(200).json({ message: 'Maintenance status updated', log: updatedLog });
  } catch (error) {
    res.status(500).json({ message: 'Error updating maintenance status', error: error.message });
  }
});

// Delete maintenance log
router.delete('/:id', async (req, res) => {
  try {
    const deletedLog = await Maintenance.findByIdAndDelete(req.params.id);
    if (!deletedLog) return res.status(404).json({ message: 'Maintenance log not found' });
    res.status(200).json({ message: 'Maintenance log deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting maintenance log', error: error.message });
  }
});

module.exports = router;
