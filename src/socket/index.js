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

  // 2) Manually connect them in parallel
  await Promise.all([
    pubClient.connect(),
    subClient.connect()
  ]);

  // 3) Set up Socket.IO + Redis adapter
  const io = new Server(server, {
    cors: { origin: 'http://localhost:5173', methods: ['GET', 'POST'],credentials: true }
  });
  io.adapter(createAdapter(pubClient, subClient));

  // 4) Auth middleware (parse cookie → verify JWT)
  io.use((socket, next) => {
    try {
       const raw = socket.handshake.headers.cookie || '';
       const { token } = cookie.parse(raw);
       const payload   = jwt.verify(token, process.env.JWT_SECRET);
      
     socket.user = payload 

      
     next();
    } catch(e) {
        console.log("e : " , e )
      next(new Error('Authentication error 1111'));
    }
  });

  // 5) Track connect / disconnect in a Redis Set
  io.on('connection', async socket => {
    console.log("in connection ")
    const uid = socket.user.userId;
    const key = `user:sockets:${uid}`;

    // add this socket
    await pubClient.sadd(key, socket.id);
    socket.join(`user:${uid}`);
    console.log(`↔️ [WS] ${uid} connected as ${socket.id}`);
   
    registerSocketHandlers(io, socket);

    socket.on('disconnect', async () => {
      await pubClient.srem(key, socket.id);
      const remaining = await pubClient.scard(key);
      if (remaining === 0) {
        console.log(`❌ [WS] ${uid} offline`);
      } else {
        console.log(`↔️ [WS] ${uid} still has ${remaining} socket(s)`);
      }
    });
  });

  console.log('✅ Socket.IO + Redis adapter ready');
};
