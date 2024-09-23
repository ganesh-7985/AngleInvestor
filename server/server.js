const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const connectDB = require("./database/database");

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] } });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Ensure the URI is defined

  
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

// Socket.IO for real-time chat and video call
io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
connectDB()
const PORT = process.env.PORT || 5001; // Changed from 5000 to 5001
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
