
const mongoose = require("mongoose");
require('dotenv').config({ path: "./config/.env"});  

console.log("DB_URI from .env:", process.env.DB_URI);
const dbUri = process.env.DB_URI; 

mongoose.connect(dbUri)
  .then(() => {
    console.log("MongoDB connected successfully.");
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });

module.exports = mongoose; 


