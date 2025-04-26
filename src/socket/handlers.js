

function registerSocketHandlers(io, socket) {
  
    // Every event here is already authenticated
    socket.on('message', (data) => {
      console.log(`📨 Message from ${socket.user.username}:`, data);
  
      // Example: Broadcast to everyone except sender
      socket.broadcast.emit('message', {
        user: socket.user.username,
        content: data,
      }); 
    });
  
    socket.on('disconnect', () => {
      console.log(`❌ Socket disconnected: ${socket.id}`);
    });
  }
  
  module.exports = registerSocketHandlers;
  