const Notification = require('../models/Notification');

async function newComment(data, io, pubClient) {
  const { comment, ticketId, recipients } = data;
  
  // اطلاعات پایه برای نوتیفیکیشن
  const notificationBase = {
    type: 'comment',
    category: 'ticket',
    title: 'New Ticket Comment',
    icon: '💬',
    link: `/tickets/view/${ticketId}`,
    priority: 'normal',
    data: {
      ticketId,
      commentId: comment._id,
      createdBy: comment.user
    }
  };

  // برای هر کاربر در لیست recipients نوتیفیکیشن ایجاد کنید
  const notificationPromises = recipients.map(async userId => {
    try {
      // 1. ایجاد نوتیفیکیشن در دیتابیس
      const notification = await Notification.create({
        ...notificationBase,
        userId: userId,
        fromUserId: comment.user,
        message: `New comment in ticket #${ticketId}`,
      });

      // 2. بررسی آنلاین بودن کاربر و ارسال نوتیف
      const sockets = await pubClient.smembers(`user:sockets:${userId}`);
      
      if (sockets.length > 0) {
        notification.deliveredAt = new Date();
        notification.status = 'sent';
        await notification.save();

        sockets.forEach(sid => {
          io.to(sid).emit('notification:new', notification);
            io.to(sid).emit('newComment', comment);
        });
      }

      return notification;
    } catch (error) {
      console.error(`Error creating notification for user ${userId}:`, error);
      return null;
    }
  });

  await Promise.all(notificationPromises);
}

module.exports = { newComment };