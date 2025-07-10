require('dotenv').config();
const express = require('express');
const http = require('http');
const { connectDB } = require('./config/db');
const apiRoutes = require('./routes/api');
const setupSocket = require('./socket');
const cors = require('cors'); 

const app = express();
const server = http.createServer(app);
const io = setupSocket(server);

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' })); 
console.log('🔵 Mounting API routes at /api');
app.use('/api', apiRoutes);

connectDB().then(() => {
  console.log('✅ MongoDB connected successfully to:', process.env.MONGO_URI || 'default URI');
  console.log('🔵 Server configuration loaded, starting...');
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
}).catch(err => {
  console.error('❌ Failed to start server due to DB error:', err.stack);
  process.exit(1);
});