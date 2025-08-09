// utils/cleanup.js
module.exports = async function cleanUpStaleSockets(io, pubClient) {
  console.log('🧹 Running background Redis socket cleanup');

  try {
    const keys = await pubClient.keys('user:sockets:*');
console.log("keys in Redis to clear : " , keys )
    for (const key of keys) {
      const userId = key.split(':')[2];
      const socketIds = await pubClient.smembers(key);

      const stale = socketIds.filter(id => !io.sockets.sockets.has(id));

      if (stale.length > 0) {
        await pubClient.srem(key, ...stale);
        console.log(`🗑️ Cleaned ${stale.length} stale socket(s) for user ${userId}`);
      }
    }
  } catch (err) {
    console.error('❌ Redis cleanup error:', err.message);
  }
};
