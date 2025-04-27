const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/jwtConfig');
const registerSocketHandlers = require('./handlers');

function initializeSocket(server) {
 
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173/', // Restrict in production
      methods: ['GET', 'POST'],
      credentials: true,
      
    },
  });

  // Socket.IO middleware for JWT authentication
  io.use((socket, next) => {
    const raw = socket.handshake.headers.cookie;      // e.g. "token=eyJ...; other=foo"
  if (!raw) return next(new Error('No cookies sent'));
  const { token } = Object.fromEntries(raw.split(';').map(c => c.trim().split('=')));
  if (!token) return next(new Error('No auth token'));


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
    
   registerSocketHandlers(io, socket);
  });

  return io;
}

module.exports = initializeSocket;
