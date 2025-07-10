const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Message = require('../models/message');

router.post('/users', async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      console.log('❌ No username provided in request body');
      return res.status(400).json({ error: 'Username is required' });
    }
    console.log('✅ Attempting to create user:', username);
    const user = await User.create({ username });
    console.log('✅ User created successfully:', user._id, 'with username:', user.username, 'full doc:', user);
    res.status(201).json(user);
  } catch (error) {
    console.error('❌ Error creating user:', error.message, 'Stack:', error.stack);
    res.status(400).json({ error: error.message });
  }
});

router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages.map(msg => ({
      username: msg.sender, 
      message: msg.content,
      timestamp: msg.timestamp,
      room: 'general-chat',
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;