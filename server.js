const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://bilalhash_db_user:9544905993@cluster0.xulyebe.mongodb.net/HotelDB?retryWrites=true&w=majority"
)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

const enquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const Enquiry = mongoose.model("Enquiry", enquirySchema);

app.post("/enquiry", async (req, res) => {
  try {
    const newEnquiry = new Enquiry(req.body);
    await newEnquiry.save();
    res.json({ message: "Enquiry Saved" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.get("/getenquiry", async (req, res) => {
  try {
    const data = await Enquiry.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});