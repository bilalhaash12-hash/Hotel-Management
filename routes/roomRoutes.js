const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

// Create a room
router.post('/', async (req, res) => {
  try {
    console.log('[POST /api/rooms] Body:', req.body);
    // Ensure price is stored as a number
    if (req.body.price !== undefined) req.body.price = Number(req.body.price) || 0;
    const newRoom = new Room(req.body);
    await newRoom.save();
    res.status(201).json({ message: 'Room created successfully', room: newRoom });
  } catch (error) {
    console.error('[POST /api/rooms] Error:', error.message);
    res.status(500).json({ message: 'Error creating room', error: error.message });
  }
});

// Get all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    console.error('[GET /api/rooms] Error:', error.message);
    res.status(500).json({ message: 'Error fetching rooms', error: error.message });
  }
});

// Update a room
router.put('/:id', async (req, res) => {
  try {
    console.log('[PUT /api/rooms/:id] ID:', req.params.id);
    console.log('[PUT /api/rooms/:id] Body:', req.body);

    // Cast price to Number (input fields always return strings)
    if (req.body.price !== undefined) req.body.price = Number(req.body.price) || 0;

    // Use runValidators: false so partial updates don't fail 'required' checks
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: false }
    );

    if (!updatedRoom) return res.status(404).json({ message: 'Room not found' });
    res.status(200).json({ message: 'Room updated successfully', room: updatedRoom });
  } catch (error) {
    console.error('[PUT /api/rooms/:id] Error:', error.message);
    res.status(500).json({ message: 'Error updating room', error: error.message });
  }
});

// Delete a room
router.delete('/:id', async (req, res) => {
  try {
    console.log('[DELETE /api/rooms/:id] ID:', req.params.id);
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deletedRoom) return res.status(404).json({ message: 'Room not found' });
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error('[DELETE /api/rooms/:id] Error:', error.message);
    res.status(500).json({ message: 'Error deleting room', error: error.message });
  }
});

module.exports = router;
