// const project = require("../models/project");
'use client'; 
const { assignProjectToUser } = require("../notif/assignProjectToUser");
const { createProject } = require("../notif/createProject");
const { unassignProjectFromUser } = require("../notif/unassignProjectFromUser");


function registerSocketHandlers(io, socket , pubClient) {
  
  socket.on("assignUserProject" ,async  ({projectId , pentesterId , adminId , projectName })=>{
    assignProjectToUser(projectId , pentesterId , adminId , projectName , io , pubClient )
    
  })

  socket.on("unAssignUserProject" ,async  ({projectId , pentesterId , adminId , projectName })=>{
    unassignProjectFromUser(projectId , pentesterId  , io , pubClient )
  })

  socket.on("createProject" , async ({projectId , devOpsId , projectName })=>{
    console.log("****************** create project *************** event !!! ")
   await  createProject(projectId ,devOpsId ,projectName,io , pubClient)
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
  