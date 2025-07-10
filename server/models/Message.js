const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: String, // Changed from ObjectId to String to match username
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  room: {
    type: String,
    default: 'general-chat',
  },
});

module.exports = mongoose.model('Message', messageSchema);