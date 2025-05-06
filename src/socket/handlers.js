// const project = require("../models/project");

const { assignProjectToUser } = require("../notif/assignProjectToUser");


function registerSocketHandlers(io, socket , pubClient) {
  
  socket.on("assignUserProject" ,async  ({projectId , pentesterId , adminId })=>{
    // io.to(`user:${data}`).emit("assignedUser","ok")
    console.log("data *****f : " , await projectId , pentesterId , adminId , "\n" ,  )
    assignProjectToUser(projectId , pentesterId , adminId , io , pubClient )
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
  