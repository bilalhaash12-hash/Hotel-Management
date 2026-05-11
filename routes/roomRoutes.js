const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

// Create a room
router.post('/', async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    await newRoom.save();
    res.status(201).json({ message: 'Room created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating room', error: error.message });
  }
});

// Get all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rooms', error: error.message });
  }
});

// Update a room
router.put('/:id', async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRoom) return res.status(404).json({ message: 'Room not found' });
    res.status(200).json({ message: 'Room updated successfully', room: updatedRoom });
  } catch (error) {
    res.status(500).json({ message: 'Error updating room', error: error.message });
  }
});

// Delete a room
router.delete('/:id', async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deletedRoom) return res.status(404).json({ message: 'Room not found' });
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting room', error: error.message });
  }
});

module.exports = router;
