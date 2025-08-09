// const project = require("../models/project");

const { assignProjectToUser } = require("../notif/assignProjectToUser");
const { createProject } = require("../notif/createProject");
const { unassignProjectFromUser } = require("../notif/unassignProjectFromUser");
const {addReport} = require("../notif/addReport");
const { newComment } = require("../notif/newComment");

function registerSocketHandlers(io, socket , pubClient) {
  

 socket.on("assignUserProject", async ({ projectId, pentesterId, adminId, projectName }) => {
    try {
      console.log("📌 Event: assignUserProject");
      await assignProjectToUser(projectId, pentesterId, adminId, projectName, io, pubClient);
    } catch (err) {
      console.error("❌ Error in assignUserProject:", err.message);
    }
  });

 socket.on("unAssignUserProject", async ({ projectId, pentesterId, adminId, projectName }) => {
    try {
      console.log("📌 Event: unAssignUserProject");
      await unassignProjectFromUser(projectId, pentesterId, io, pubClient);
    } catch (err) {
      console.error("❌ Error in unAssignUserProject:", err.message);
    }
  });

 socket.on("addReport", async ({ bugId }) => {
    try {
      console.log("📌 Event: addReport");
      await addReport(bugId, io, pubClient);
    } catch (err) {
      console.error("❌ Error in addReport:", err.message);
    }
  });


 socket.on("createProject", async ({ projectId, devOpsId, projectName }) => {
    try {
      console.log("📌 Event: createProject");
      await createProject(projectId, devOpsId, projectName, io, pubClient);
    } catch (err) {
      console.error("❌ Error in createProject:", err.message);
    }
  });



 socket.on("newComment", async (data) => {
    try {
      console.log("📌 Event: newComment:", data);
      await newComment(data, io, pubClient);
    } catch (err) {
      console.error("❌ Error in newComment:", err.message);
    }
  });
 

socket.on("ticket:join", ({ ticketId }) => {
  socket.join(`ticket:${ticketId}`);
});

socket.on("ticket:leave", ({ ticketId }) => {
  socket.leave(`ticket:${ticketId}`);
});



   
  }
  
  module.exports = registerSocketHandlers;
  