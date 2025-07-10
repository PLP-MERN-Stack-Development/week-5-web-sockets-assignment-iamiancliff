const mongoose = require('mongoose');

// Define the Room schema
// This schema represents a chat room with a unique name and timestamps for creation and updates.
const roomSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
}, {timestamps: true}); 


module.exports = mongoose.model("Room", roomSchema);