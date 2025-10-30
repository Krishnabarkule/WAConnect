
/**
 * WAConnect - Server (Express)
 * Minimal skeleton with stubbed WhatsApp sending engine.
 */

const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const agendaLib = require('agenda');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const templateRoutes = require('./routes/templates');
const sendRoutes = require('./routes/send');
const reportRoutes = require('./routes/reports');

const app = express();
const server = http.createServer(app);
const io = socketio(server, { cors: { origin: '*' } });

app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/waconnect';
mongoose.connect(MONGODB_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error', err);
});

// Simple socket.io connection
io.on('connection', (socket) => {
  console.log('Socket connected', socket.id);
  socket.on('disconnect', () => console.log('Socket disconnected', socket.id));
});
app.set('io', io);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/send', sendRoutes);
app.use('/api/reports', reportRoutes);

// Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
