const Notification = require('../models/Notification');

async function assignProjectToUser(projectId, assignedUserId, adminId, io, pubClient) {
  // 1. ایجاد نوتیف در MongoDB
  const notification = await Notification.create({
    userId: assignedUserId,
    fromUserId: adminId,
    type: 'projectAssigned',
    category: 'project',
    title: 'پروژه جدید',
    message: 'یک پروژه جدید به شما اختصاص یافت.',
    icon: '📁',
    link: `/projects/${projectId}`,
    data: { projectId, assignedBy: adminId },
    priority: 'high'
  });

  // 2. بررسی آنلاین بودن کاربر و ارسال نوتیف
  const sockets = await pubClient.smembers(`user:sockets:${assignedUserId}`);
  if (sockets.length > 0) {
    notification.deliveredAt = new Date();
    notification.status = 'sent';
    await notification.save();

    sockets.forEach(sid => {
      io.to(sid).emit('notification:new', notification);
    });
  }
}

module.exports = {assignProjectToUser}