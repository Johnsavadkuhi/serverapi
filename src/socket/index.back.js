const { Server } = require("socket.io");
const { createAdapter } = require("@socket.io/redis-adapter");
const Redis = require("ioredis");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const { URL } = require("url");
const registerSocketHandlers = require("./handlers");
const cleanUpStaleSockets = require('../utils/cleanUpStaleSockets');

module.exports = async function initializeSocket(server) {
  // Ensure REDIS_URL exists
  if (!process.env.REDIS_URL) {
    throw new Error("❌ REDIS_URL environment variable is missing.");
  }

  // Configuration
  const config = {
    allowedOrigins: process.env.ALLOWED_ORIGINS?.split(",") || [
      "http://localhost:5173",
      "http://localhost:3001",
      "http://localhost:3000",
      "http://localhost:4000",
      "https://admin.socket.io",
      "http://10.10.10.120:5173",
      "http://10.10.10.120:3001",
      "http://10.10.10.120:4000",
      "http://172.20.10.3:5173"
    ],
    redisOptions: {
      lazyConnect: true,
      reconnectOnError: (err) => {
        console.error("Redis connection error:", err.message);
        return true; // Reconnect on error
      },
      maxRetriesPerRequest: 3,
    },
    socketOptions: {
      pingInterval: 10000,
      pingTimeout: 5000,
      cookie: false, // We handle cookies manually
    },
  };

  // 1) Create Redis clients with error handling
  const pubClient = new Redis(process.env.REDIS_URL, config.redisOptions);
  const subClient = new Redis(process.env.REDIS_URL, config.redisOptions);

  pubClient.on("error", (err) => console.error("Redis pub client error:", err));
  subClient.on("error", (err) => console.error("Redis sub client error:", err));

  try {
    await Promise.all([pubClient.connect(), subClient.connect()]);
  } catch (err) {
    console.error("Failed to connect to Redis:", err.message);
    throw err;
  }

  // 2) Set up Socket.IO server with enhanced CORS
  const io = new Server(server, {
    ...config.socketOptions,
    cors: {
      origin: (origin, callback) => {
        // Allow requests with no origin in development only
        if (!origin) {
          return callback(
            process.env.NODE_ENV === "production"
              ? new Error("Origin required")
              : null,
            process.env.NODE_ENV !== "production"
          );
        }

        try {
          const originUrl = new URL(origin);
          const isValid = config.allowedOrigins.some((allowedOrigin) => {
            const allowedUrl = new URL(allowedOrigin);
            return (
              originUrl.protocol === allowedUrl.protocol &&
              originUrl.hostname === allowedUrl.hostname &&
              originUrl.port === allowedUrl.port
            );
          });

          if (isValid) {
            callback(null, true);
          } else {
            console.warn(`🚫 CORS blocked origin: ${origin}`);
            callback(new Error(`Not allowed by CORS: ${origin}`), false);
          }
        } catch (err) {
          console.error('🧨 Invalid origin format:', origin);

          callback(new Error("Invalid origin"));
        }
      },
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // 3) Connect Redis adapter to Socket.IO
  io.adapter(createAdapter(pubClient, subClient));

  // 4) Enhanced auth middleware
  io.use((socket, next) => {
    try {
      let token = null;

      // Check auth token first (higher priority)
      if (socket.handshake.auth?.token) {
        token = socket.handshake.auth.token;
        console.log("token in if  : " , token )
      }
      // Then check cookies
      else if (socket.handshake.headers?.cookie) {
        const cookies = cookie.parse(socket.handshake.headers.cookie);
        token = cookies.token;
        console.log("token in cookies : " , token )
      }

      if (!token) {
        throw new Error("No authentication token provided");
      }

      const payload = jwt.verify(token, process.env.JWT_SECRET);

      // Validate payload structure
      if (!payload.userId || typeof payload.userId !== "string") {
        throw new Error("Invalid token payload");
      }

      socket.user = {
        userId: payload.userId,
        // Add other expected payload properties here
        ...payload,
      };

      next();
    } catch (err) {
      console.error(`Authentication failed: ${err.message}`);
      next(new Error("Authentication failed"));
    }
  });

  // 5) Enhanced connection handler
  io.on("connection", async (socket) => {
    const { userId } = socket.user;
    const redisKey = `user:sockets:${userId}`;

    try {
      // Remove stale sockets
 // Remove old stale socket ids (optional, just in case)
      
 // const oldSockets = await pubClient.smembers(redisKey);
      // const validOldSockets = oldSockets.filter(id => id !== socket.id);     

      // if (validOldSockets.length > 0) {
      //   await pubClient.srem(redisKey, ...validOldSockets);
      // }

      // Add new socket
      await pubClient.sadd(redisKey, socket.id);

      // Join user room
      socket.join(`user:${userId}`);

      console.log(`✅ [WS] User ${userId} connected via socket ${socket.id}`);

      // Register handlers
      registerSocketHandlers(io, socket, pubClient);

      // Handle disconnection
      socket.on("disconnect", async (reason) => {
        try {
          await pubClient.srem(redisKey, socket.id);
          const remaining = await pubClient.scard(redisKey);

         if (remaining === 0) {
            console.log(`❌ [WS] User ${userId} fully disconnected (reason: ${reason})`);
            // 💡 Optional: trigger offline logic here
          } else {
            console.log(`↔️ [WS] User ${userId} still has ${remaining} socket(s) active`);
          }
        } catch (err) {
          console.error(
            `Error handling disconnect for user ${userId}:`,
            err.message
          );
        }
      });

      // Handle errors
      socket.on("error", (err) => {
        console.error(`Socket error for user ${userId}:`, err.message);
      });
    } catch (err) {
      console.error(`Connection setup failed for user ${userId}:`, err.message);
      socket.disconnect(true);
    }
  });

setInterval(() => {
  cleanUpStaleSockets(io, pubClient);
}, 5 * 60 * 1000); // every 5 minutes

// Optional: Run once on startup
cleanUpStaleSockets(io, pubClient);

// Graceful shutdown
  const gracefulShutdown = async () => {
    console.log('🛑 Shutting down socket server...');
    try {
      await Promise.all([
        pubClient.quit(),
        subClient.quit()
      ]);
      io.close();
      console.log('✅ Socket.IO and Redis shutdown complete');
    } catch (err) {
      console.error('🔥 Shutdown error:', err.message);
    }
  };

  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown); // for Ctrl+C


  console.log("✅ Socket.IO initialized with Redis adapter");
};
