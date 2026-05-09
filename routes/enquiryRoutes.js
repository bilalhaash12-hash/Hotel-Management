const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');

// Create a new enquiry
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const newEnquiry = new Enquiry({ name, email, phone, subject, message });
    await newEnquiry.save();
    res.status(201).json({ message: 'Enquiry submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting enquiry', error: error.message });
  }
});

// Get all enquiries
router.get('/', async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.status(200).json(enquiries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching enquiries', error: error.message });
  }
});

// Update enquiry status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedEnquiry = await Enquiry.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updatedEnquiry) return res.status(404).json({ message: 'Enquiry not found' });
    res.status(200).json({ message: 'Enquiry status updated', enquiry: updatedEnquiry });
  } catch (error) {
    res.status(500).json({ message: 'Error updating enquiry status', error: error.message });
  }
});

// Delete an enquiry
router.delete('/:id', async (req, res) => {
  try {
    const deletedEnquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!deletedEnquiry) return res.status(404).json({ message: 'Enquiry not found' });
    res.status(200).json({ message: 'Enquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting enquiry', error: error.message });
  }
});

module.exports = router;
