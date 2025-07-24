const Notification = require('../models/Notification');



async function addReport(projectId, pentester  , projectManager  , io, pubClient) {
  

const notification = await Notification.create({
    userId: projectManager ,
    fromUserId: pentester,
    type: 'alert',
    category: 'report',
    title: 'New Report',
    message: "New Report Is Added by User",
    icon: '📁',
    link: `/project/add/${projectId}`,
    data: { projectId, assignedBy: pentester },
    priority: 'normal'
  });

  // 2. بررسی آنلاین بودن کاربر و ارسال نوتیف
  const sockets = await pubClient.smembers(`user:sockets:${projectManager}`);
 console.log("sockets : ", sockets)
  if (sockets.length > 0) {
    notification.deliveredAt = new Date();
    notification.status = 'sent';
    await notification.save();

    sockets.forEach(sid => {
      console.log("sid############# : " , sid )
      io.to(sid).emit('notification:new', notification);
    //   io.to(sid).emit("createProjectForAdmin" , projectName)
    });
  }
}

module.exports = {addReport}

