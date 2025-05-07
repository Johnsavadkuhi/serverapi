const { Server }        = require('socket.io');
const { createAdapter } = require('@socket.io/redis-adapter');
const Redis             = require('ioredis');
const jwt               = require('jsonwebtoken');
const cookie            = require('cookie');
const registerSocketHandlers = require('./handlers');

module.exports = async function initializeSocket(server) {

  // 1) Create two clients in lazy mode
  const pubClient = new Redis(process.env.REDIS_URL,    { lazyConnect: true });
  const subClient = new Redis(process.env.REDIS_URL,    { lazyConnect: true });

  await Promise.all([
    pubClient.connect(),
    subClient.connect()
  ]);

// 2) Set up Socket.IO server
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});


  // 3) Connect Redis adapter to Socket.IO
  io.adapter(createAdapter(pubClient, subClient));

// 4) Auth middleware: parse cookies + verify JWT
io.use((socket, next) => {
  try {
    const rawCookie = socket.handshake.headers.cookie || '';
    const { token } = cookie.parse(rawCookie || '');
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = payload;
    next();
  } catch (err) {
    console.error('❌ JWT Auth failed:', err.message);
    next(new Error('Authentication error see '));
  }
});


  // 5) Connection handler
  io.on('connection', async socket => {
    const uid = socket.user.userId;
    const redisKey = `user:sockets:${uid}`;

    try {
      // ✅ Remove stale sockets (optional)
      const oldSockets = await pubClient.smembers(redisKey);
      const staleSockets = oldSockets.filter(id => id !== socket.id);
      if (staleSockets.length > 0) {
        await pubClient.srem(redisKey, ...staleSockets);
      }

      // ✅ Save new socket
      await pubClient.sadd(redisKey, socket.id);

      // ✅ Join user-specific room
      socket.join(`user:${uid}`);

      console.log(`✅ [WS] ${uid} connected via socket ${socket.id}`);

      // ✅ Register per-socket event handlers
      registerSocketHandlers(io, socket , pubClient);

      // ✅ Handle disconnection
      socket.on('disconnect', async () => {
        await pubClient.srem(redisKey, socket.id);
        const remaining = await pubClient.scard(redisKey);
        if (remaining === 0) {
          console.log(`❌ [WS] ${uid} fully disconnected`);
        } else {
          console.log(`↔️ [WS] ${uid} still has ${remaining} socket(s)`);
        }
      });

    } catch (e) {
      console.error(`❌ Error handling connection for ${uid}:`, e.message);
    }
  });

  
  console.log('✅ Socket.IO + Redis adapter ready');
};
