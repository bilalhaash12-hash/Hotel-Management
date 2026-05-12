const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import Routes
const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Database Connection
mongoose.connect(
  process.env.MONGO_URI || "mongodb+srv://bilalhash_db_user:9544905993@cluster0.xulyebe.mongodb.net/HotelDB?retryWrites=true&w=majority"
)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

// Use Routes
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/reviews", reviewRoutes);

// Root Route for testing
app.get("/", (req, res) => {
  res.send("Hotel Management API is running...");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong on the server" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});