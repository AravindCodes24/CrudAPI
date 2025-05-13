const mongoose = require('mongoose');

// Define the schema for users
const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  phone: {String,
    address: { String },
  }, 
});

module.exports = mongoose.model('User', userSchema); // Export the model
