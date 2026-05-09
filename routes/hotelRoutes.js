const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');

// Register a new hotel
router.post('/register', async (req, res) => {
  try {
    const { hotel, manager, email, phone, password } = req.body;
    const existingHotel = await Hotel.findOne({ email });
    if (existingHotel) return res.status(400).json({ message: 'Email already registered' });
    
    const newHotel = new Hotel({ hotel, manager, email, phone, password });
    await newHotel.save();
    res.status(201).json({ message: 'Hotel registered successfully. Waiting for Admin Approval.' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering hotel', error: error.message });
  }
});

// Login hotel
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hotel = await Hotel.findOne({ email, password });
    if (!hotel) return res.status(401).json({ message: 'Invalid email or password' });
    
    res.status(200).json({ message: 'Login successful', hotel });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// Get all hotels
router.get('/', async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hotels', error: error.message });
  }
});

// Update hotel status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updatedHotel) return res.status(404).json({ message: 'Hotel not found' });
    res.status(200).json({ message: 'Hotel status updated', hotel: updatedHotel });
  } catch (error) {
    res.status(500).json({ message: 'Error updating hotel status', error: error.message });
  }
});

// Delete a hotel
router.delete('/:id', async (req, res) => {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!deletedHotel) return res.status(404).json({ message: 'Hotel not found' });
    res.status(200).json({ message: 'Hotel deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting hotel', error: error.message });
  }
});

module.exports = router;
