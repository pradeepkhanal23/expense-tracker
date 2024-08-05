require("dotenv").config();

const mongoose = require("mongoose");

async function connectDB() {
  try {
    // MongoDB connection
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    // checking if connection is successfull
    if (conn) {
      console.log("Mongo DB connected successfullly");
    }
  } catch (error) {
    console.error("Error connecting to MongoDB", error.message);
  }
}

module.exports = connectDB;
