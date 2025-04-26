const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/jwtConfig');
const registerSocketHandlers = require('./handlers');

function initializeSocket(server) {
 
  const io = new Server(server, {
    cors: {
      origin: '*', // Restrict in production
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  // Socket.IO middleware for JWT authentication
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token || socket.handshake.headers?.token;;

    if (!token) {
      return next(new Error('Authentication error: No token provided'));
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      socket.user = decoded; // Attach user info to socket
      next();
    } catch (err) {
      console.error('JWT auth error:', err);
      return next(new Error('Authentication error: Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`🔐 Authenticated socket connected: ${socket.id} (user: ${socket.user.username})`);
    
    (io, socket);
  });

  return io;
}

module.exports = initializeSocket;
