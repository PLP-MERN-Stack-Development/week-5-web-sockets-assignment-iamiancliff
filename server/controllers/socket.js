const User = require('../models/user');
const Message = require('../models/message');
const Room = require('../models/room');

let onlineUsers = new Map();
const globalRoomName = 'global-chat';

const handleSocketEvents = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('user_join', async (username) => {
      let user = await User.findOneAndUpdate(
        { username },
        { socketId: socket.id, online: true },
        { upsert: true, new: true }
      );
      onlineUsers.set(socket.id, username);

      let room = await Room.findOne({ name: globalRoomName });
      if (!room) {
        room = await Room.create({ name: globalRoomName });
      }
      socket.join(globalRoomName); // Join global room by default

      io.to(globalRoomName).emit('user_list', Array.from(onlineUsers.values()));
      socket.to(globalRoomName).emit('user_joined', username);
    });

    socket.on('send_message', async ({ username, message, room }) => {
      console.log('Received send_message:', { username, message, room });
      const user = await User.findOne({ username });
      if (user) {
        const newMessage = await Message.create({
          sender: user._id,
          content: message,
        });
        console.log('Message saved:', { username, message, room, timestamp: newMessage.timestamp });
        const broadcastRoom = room || globalRoomName;
        // Join the specified room if provided, and emit to all including sender
        if (room && room !== globalRoomName) {
          socket.join(room);
        }
        io.to(broadcastRoom).emit('receive_message', {
          username,
          message,
          timestamp: newMessage.timestamp,
          room: broadcastRoom,
        });
      } else {
        console.log('User not found:', username);
        // Fallback: Create a temporary user if not found
        const tempUser = await User.create({ username, socketId: socket.id, online: true });
        const newMessage = await Message.create({
          sender: tempUser._id,
          content: message,
        });
        const broadcastRoom = room || globalRoomName;
        if (room && room !== globalRoomName) {
          socket.join(room);
        }
        io.to(broadcastRoom).emit('receive_message', {
          username,
          message,
          timestamp: newMessage.timestamp,
          room: broadcastRoom,
        });
      }
    });

    socket.on('typing', (username) => {
      socket.to(globalRoomName).emit('typing', username);
    });

    socket.on('stopTyping', () => {
      socket.to(globalRoomName).emit('stopTyping');
    });

    socket.on('disconnect', async () => {
      const username = onlineUsers.get(socket.id);
      if (username) {
        await User.findOneAndUpdate({ username }, { online: false });
        onlineUsers.delete(socket.id);
        io.to(globalRoomName).emit('user_list', Array.from(onlineUsers.values()));
        socket.to(globalRoomName).emit('user_left', username);
      }
      console.log('Client disconnected:', socket.id);
    });
  });
};

module.exports = handleSocketEvents;