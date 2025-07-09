const Notification = require('../models/Notification');

async function assignProjectToUser(projectId, assignedUserId, adminId , projectName , io, pubClient) {
  
  const notification = await Notification.create({
    userId: assignedUserId,
    fromUserId: adminId,
    type: 'projectAssigned',
    category: 'project',
    title: 'New Project',
    message: `${projectName}`,
    icon: '📁',
    link: `/projects/#${projectId}`,
    data: { projectId, assignedBy: adminId },
    priority: 'normal'
  });

  // 2. بررسی آنلاین بودن کاربر و ارسال نوتیف
  const sockets = await pubClient.smembers(`user:sockets:${assignedUserId}`);
 
  if (sockets.length > 0) {
    notification.deliveredAt = new Date();
    notification.status = 'sent';
    await notification.save();

    sockets.forEach(sid => {
      io.to(sid).emit('notification:new', notification);
      io.to(sid).emit("newProjectForUser" , projectName)
    });
  }
}

module.exports = {assignProjectToUser}