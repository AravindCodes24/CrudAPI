const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import User model

// CREATE a new user
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body); // Create a new user with the request body
    const savedUser = await user.save(); // Save user to the database
    res.status(201).json(savedUser); // Return the saved user as JSON
  } catch (err) {
    res.status(400).json({ error: err.message }); // Handle errors
  }
});

// READ all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find(); // Find all users in the database
    res.json(users); // Return all users as JSON
  } catch (err) {
    res.status(400).json({ error: err.message }); // Handle errors
  }
});

// READ one user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Find user by ID
    if (!user) {
      return res.status(404).json({ error: 'User not found' }); // Handle user not found
    }
    res.json(user); // Return the found user
  } catch (err) {
    res.status(404).json({ error: 'User not found' }); // Handle errors
  }
});

// UPDATE a user by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update user
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' }); // Handle user not found
    }
    res.json(updatedUser); // Return the updated user
  } catch (err) {
    res.status(400).json({ error: err.message }); // Handle errors
  }
});

// DELETE a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id); // Delete user by ID
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' }); // Handle user not found
    }
    res.json({ message: 'User deleted successfully' }); // Success message
  } catch (err) {
    res.status(400).json({ error: err.message }); // Handle errors
  }
});

module.exports = router; // Export the router
