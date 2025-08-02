// const project = require("../models/project");

const { assignProjectToUser } = require("../notif/assignProjectToUser");
const { createProject } = require("../notif/createProject");
const { unassignProjectFromUser } = require("../notif/unassignProjectFromUser");
const {addReport} = require("../notif/addReport");
const { newComment } = require("../notif/newComment");

function registerSocketHandlers(io, socket , pubClient) {
  
  socket.on("assignUserProject" ,async  ({projectId , pentesterId , adminId , projectName })=>{
    assignProjectToUser(projectId , pentesterId , adminId , projectName , io , pubClient )
    
  })

  socket.on("unAssignUserProject" ,async  ({projectId , pentesterId , adminId , projectName })=>{
    unassignProjectFromUser(projectId , pentesterId  , io , pubClient )
  })

  socket.on("addReport" , async ({bugId })=>{
    console.log("****************** add report *************** event !!! ")
   await  addReport(bugId,io , pubClient)
  })


  socket.on("createProject" , async ({projectId , devOpsId , projectName })=>{
    console.log("****************** create project *************** event !!! ")
   await  createProject(projectId ,devOpsId ,projectName,io , pubClient)
  })


  socket.on('newComment' , async(data) =>{
    console.log("data of new comment ####################### : "  , data )

    await newComment(data , io , pubClient )
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
  