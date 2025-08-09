// const Notification = require('../models/Notification');

// async function newComment(data, io, pubClient) {
//   const { comment, ticketId, recipients } = data;
//   const roomName = `ticket:${ticketId}`;
// const socketsInRoom = await io.in(roomName).allSockets(); // Set of socket IDs
// console.log("all sockets in Room : " , socketsInRoom )

//   // اطلاعات پایه برای نوتیفیکیشن
//   const notificationBase = {
//     type: 'comment',
//     category: 'ticket',
//     title: 'New Ticket Comment',
//     icon: '💬',
//     link: `/tickets/view/${ticketId}`,
//     priority: 'normal',
//     data: {
//       ticketId,
//       commentId: comment._id,
//       createdBy: comment.user
//     }
//   };

//   // برای هر کاربر در لیست recipients نوتیفیکیشن ایجاد کنید
//   const notificationPromises = recipients.map(async userId => {
//     try {
//       // 1. ایجاد نوتیفیکیشن در دیتابیس
//       const notification = await Notification.create({
//         ...notificationBase,
//         userId: userId,
//         fromUserId: comment.user,
//         message: `New comment in ticket #${ticketId}`,
//       });

//       // 2. بررسی آنلاین بودن کاربر و ارسال نوتیف
//       const sockets = await pubClient.smembers(`user:sockets:${userId}`);
//       const shouldNotify = sockets.some(id => !socketsInRoom.has(id));

//       notification.deliveredAt = new Date();
//         notification.status = 'sent';
//         await notification.save();
//       if (sockets.length > 0 && shouldNotify) {
        
// notification.deliveredAt = new Date();
//         notification.status = 'sent';
//         await notification.save();

//         // sockets.forEach(sid => {
//         //   io.to(sid).emit('notification:new', notification);
//         //     io.to(sid).emit('newComment', comment);
//         // });

//         recipients.map( (userId) => {
  
//   io.to(`user:${userId}`).emit('notification:new', notification);


// });

//     io.to(`user:${userId}`).emit('newComment', comment);


//       }

//       return notification;
//     } catch (error) {
//       console.error(`Error creating notification for user ${userId}:`, error);
//       return null;
//     }
//   });

//   await Promise.all(notificationPromises);
// }

// module.exports = { newComment };



// const Notification = require('../models/Notification');

// async function newComment(data, io, pubClient) {
//   const { comment, ticketId, recipients } = data;

//   const roomName = `ticket:${ticketId}`;
//   const socketsInRoom = await io.in(roomName).allSockets(); // Set of socket IDs
//   console.log("🎯 Sockets in ticket room:", socketsInRoom);

//   const notificationBase = {
//     type: 'comment',
//     category: 'ticket',
//     title: 'New Ticket Comment',
//     icon: '💬',
//     link: `/tickets/view/${ticketId}`,
//     priority: 'normal',
//     data: {
//       ticketId,
//       commentId: comment._id,
//       createdBy: comment.user
//     }
//   };

//   const notificationPromises = recipients.map(async userId => {
//     try {
//       const sockets = await pubClient.smembers(`user:sockets:${userId}`);
//       const isOnline = sockets.length > 0;
//       const isInTicketRoom = sockets.some(id => socketsInRoom.has(id));

//       // ✅ اگر آنلاین هست و داخل صفحه تیکت هست → اصلاً نوتیف نساز
//       if (isOnline && isInTicketRoom) {
//         console.log(`🔕 User ${userId} is in ticket view, skipping notification`);
//       } else {
//         // ✅ نوتیف بساز و ارسال کن
//         const notification = await Notification.create({
//           ...notificationBase,
//           userId: userId,
//           fromUserId: comment.user,
//           message: `New comment in ticket #${ticketId}`,
//           deliveredAt: isOnline ? new Date() : undefined,
//           status: isOnline ? 'sent' : 'pending'
//         });

//         if (isOnline) {
//           io.to(`user:${userId}`).emit('notification:new', notification);
//         }
//       }

//       // 💬 در هر حال، کامنت جدید رو ارسال کن
//       io.to(`user:${userId}`).emit('newComment', comment);
//     } catch (error) {
//       console.error(`❌ Error handling new comment for user ${userId}:`, error.message);
//     }
//   });

//   await Promise.all(notificationPromises);
// }

// module.exports = { newComment };


const Notification = require('../models/Notification');

async function newComment(data, io, pubClient) {
  const { comment, ticketId, recipients } = data;

  const roomName = `ticket:${ticketId}`;
  const socketsInRoom = await io.in(roomName).allSockets(); // Set of socket IDs
  console.log("🎯 Sockets in ticket room:", socketsInRoom);

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

  const notificationPromises = recipients.map(async userId => {
    try {
      const sockets = await pubClient.smembers(`user:sockets:${userId}`);
      const isOnline = sockets.length > 0;
      const isInTicketRoom = sockets.some(id => socketsInRoom.has(id));

      if (isOnline && isInTicketRoom) {
        console.log(`🔕 User ${userId} is already in ticket view, skipping notification`);
      } else {
        const notification = await Notification.create({
          ...notificationBase,
          userId: userId,
          fromUserId: comment.user,
          message: `New comment in ticket #${ticketId}`,
          deliveredAt: isOnline ? new Date() : undefined,
          status: isOnline ? 'sent' : 'pending'
        });

        if (isOnline) {
          io.to(`user:${userId}`).emit('notification:new', notification);
        }
      }

      return true;
    } catch (error) {
      console.error(`❌ Error in newComment for user ${userId}:`, error.message);
      return false;
    }
  });

  await Promise.all(notificationPromises);

  // 🔥 در نهایت، پیام جدید رو فقط به روم تیکت ارسال کن
  io.to(`ticket:${ticketId}`).emit('newComment', comment);
}

module.exports = { newComment };
