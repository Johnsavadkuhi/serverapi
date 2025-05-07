const Notification = require('../models/Notification');

async function unassignProjectFromUser(projectId , userId  , io , pubClient) {
 
    const notif = await Notification.findOneAndDelete({
    userId,
    type: 'projectAssigned',
    'data.projectId': projectId
  });

  if (!notif) return; // چیزی برای حذف نیست

  const sockets = await pubClient.smembers(`user:sockets:${userId}`);
  sockets.forEach(sid => {
    io.to(sid).emit('notification:removed', { notificationId: notif._id });
  });
}

module.exports = {unassignProjectFromUser}