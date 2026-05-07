require("dotenv").config();

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Booking Schema
const bookingSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    room: String,
    guests: String,
    checkin: String,
    checkout: String
});

// Booking Model
const Booking = mongoose.model("Booking", bookingSchema);

// Home Route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Booking API
app.post("/booking", async (req, res) => {

    try {

        const booking = new Booking(req.body);

        await booking.save();

        res.status(200).json({
            message: "Booking Saved Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error Saving Booking"
        });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
    console.log(`Open http://localhost:${PORT}`);
});