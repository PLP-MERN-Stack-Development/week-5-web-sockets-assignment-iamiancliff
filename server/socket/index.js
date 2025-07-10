const { Server } = require('socket.io');
const Message = require('../models/message');

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
  });

  console.log('🔵 Initializing Socket.io with CORS:', io.opts.cors);

  io.on('connection', (socket) => {
    console.log('✅ New client connected:', socket.id);
    socket.on('disconnect', () => console.log('❌ Client disconnected:', socket.id));
    socket.on('send_message', async (msg) => {
      console.log('🔵 Received message from client:', msg);
      try {
        const newMessage = await Message.create({
          sender: msg.username,
          content: msg.message,
          timestamp: msg.timestamp,
          room: msg.room || 'general-chat',
        });
        console.log('✅ Message saved:', newMessage._id);
        io.emit('receive_message', {
          username: msg.username,
          message: msg.message,
          timestamp: msg.timestamp,
          room: msg.room || 'general-chat',
        });
      } catch (error) {
        console.error('❌ Error saving message:', error.message, 'Stack:', error.stack);
      }
    });
    socket.on('user_join', (username) => {
      console.log('🔵 Received user_join from client:', socket.id, 'with username:', username);
      io.emit('user_joined', username); // Broadcast to all clients
      console.log('🔵 Broadcasted user_joined:', username);
    });
  });

  return io;
};

module.exports = setupSocket;