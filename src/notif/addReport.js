const Notification = require('../models/Notification');



async function addReport(bugId  , io, pubClient) {
  
  const {_id ,label , project , pentester , projectManager  } = bugId 


const notification = await Notification.create({
    userId: projectManager ,
    fromUserId: pentester,
    type: 'alert',
    category: 'report',
    title: 'New Report',
    message: `${label}`,
    icon: '📁',
    link: `/project/report/${_id}`,
    data: { project , assignedBy: pentester },
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
    }); 
  // io.to(`user:${sid}`).emit('notification:new', message);

  }
}

module.exports = {addReport}

