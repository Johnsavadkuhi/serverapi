

function registerSocketHandlers(io, socket) {
  
  socket.on("assignUserProject" ,async  (data)=>{
    console.log("data : " , data)
    
  })

  
    // Every event here is already authenticated
    socket.on('message', (data) => {
      console.log(`📨 Message from ${socket.user.username}:`, data);
  
      // Example: Broadcast to everyone except sender
      socket.emit('message', {
        user: socket.user.username,
        id:socket.user.userId , 
        content: data,
      }); 
    });
  
   
  }
  
  module.exports = registerSocketHandlers;
  