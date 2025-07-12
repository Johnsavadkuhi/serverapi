const Notification = require('../models/Notification');
const User = require("../models/User")

async function getAdminByRoleId() {
  try {
    const adminUser = await User.findOne({ "roles.Admin": 5150 }).select('_id').lean();
    
    if (!adminUser) {
      throw new Error('No admin user found with role 5150');
    }
    
    return adminUser._id.toString(); // Convert ObjectId to string
  } catch (error) {
    console.error('Error finding admin user:', error);
    throw error;
  }
}


async function createProject(projectId, devOpsId , projectName , io, pubClient) {
  
const  admin_id =  await getAdminByRoleId(); 
console.log("^^^^^^^^^ admin id^^^^^^^^  : " , admin_id )  
const notification = await Notification.create({
    userId: admin_id ,
    fromUserId: devOpsId,
    type: 'custom',
    category: 'project',
    title: 'Created Project',
    message: `${projectName}`,
    icon: '📁',
    link: `/project/add/${projectId}`,
    data: { projectId, assignedBy: devOpsId },
    priority: 'normal'
  });

  // 2. بررسی آنلاین بودن کاربر و ارسال نوتیف
  const sockets = await pubClient.smembers(`user:sockets:${admin_id}`);
 console.log("sockets : ", sockets)
  if (sockets.length > 0) {
    notification.deliveredAt = new Date();
    notification.status = 'sent';
    await notification.save();

    sockets.forEach(sid => {
      console.log("sid############# : " , sid )
      io.to(sid).emit('createProjectN', notification);
    //   io.to(sid).emit("createProjectForAdmin" , projectName)
    });
  }
}

module.exports = {createProject}

