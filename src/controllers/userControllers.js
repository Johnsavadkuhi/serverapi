const project = require("../models/project");
const ProjectUser = require("../models/ProjectUser");
const User = require("../models/User")
const WebOwasp = require("../config/owasp_wstg_data")
const fs = require("fs");
const path = require("path");


const getUsers = async (req, res) => {

  const users = await User.find({})
  res.status(200).json({ users })

}


// تابع بازگشتی تبدیل به قالب BugSchema
function convertToBugSchemaFormat(node) {
  const { id, label, labelfa, wstg, children = [] } = node;

  return {
    id,
    label,
    labelfa,
    wstg: wstg || null,
    status: 'notAttempted',
    children: children.map(convertToBugSchemaFormat)
  };
}
const assignUser = async (req, res) => {
  try {
    // userId is id of manager and it should be set to manager in datbase 
    const { projectId, pentesterId, userId, version } = req.body


    if (!projectId || !pentesterId || !userId || !version) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const bugScopes = WebOwasp.map(convertToBugSchemaFormat);
    console.log("bugScopes ************************* : ", bugScopes)
    // Create or update the project-user relation
    const projectUser = await ProjectUser.findOneAndUpdate(
      { project: projectId, pentester: pentesterId },
      { manager: userId, bugScopes, version },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    // Add relation to both Project and User (if not already there)
    await Promise.all([
      project.findByIdAndUpdate(projectId, {
        $addToSet: { userProject: projectUser._id },
      }),
      User.findByIdAndUpdate(pentesterId, {
        $addToSet: { userProject: projectUser._id },
      }),
    ]);

    return res.status(200).json({ message: "Pentester assigned successfully." });

  } catch (error) {
    console.error("Error assigning pentester:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};


const getAssignedUsers = async (req, res) => {

  const { projectId, userId } = req.query;
  try {


    const response = await ProjectUser.find({ project: projectId });
    const pentesters = response.map(item => item.pentester);

    console.log("response : ", pentesters)
    res.status(200).json({ pentesters });

  } catch (err) {
    res.status(500).send(err.message || []);
  }

}

const rmUserAssigned = async (req, res) => {


  const { projectId, pentesterId } = req.body

  console.log("project Id : ", projectId, pentesterId)

  try {

    // , version:req.body.version 
    const result = await ProjectUser.findOneAndDelete({
      project: projectId, pentester: pentesterId
    })



    await project.findByIdAndUpdate(projectId, {
      $pull: { userProject: result._id },
    });
    await User.findByIdAndUpdate(pentesterId, {
      $pull: { userProject: result._id },
    });

    res.status(200).json("delted")

  } catch (err) {
    console.log(err)
    res.status(500).json(err)

  }



}

const getBugScopes = async (req, res) => {

  const { projectId, userId, managerId } = req.query
  console.log("proejct id : ", projectId, userId, managerId)
  try {

    //importand _id instead of project 
    const projectUser = await ProjectUser.findOne({
      project: projectId,
      pentester: userId
    });

    console.log("projectUser : ", projectUser)
    if (!projectUser) {
      return res.status(404).json({ message: "ProjectUser not found." });
    }

    return res.json({ bugScopes: projectUser.bugScopes });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

const userInfo = async (req, res) => {

  const { userId } = req.query
  console.log("userID ########## : ", userId)
  const result = await User.findById(userId)

  res.status(200).json(result)


}


const updateProfileUser = async (req, res) => {
  try {
    const { userId, firstName, lastName, username, devOps, security, qualityAssurance } = req.body;

    // Validate required fields
    if (!userId || !firstName || !lastName || !username) {
      return res.status(400).json({ message: 'تمام فیلدهای الزامی باید پر شوند.' });
    }

    // Check if username is taken by another user
    const existingUser = await User.findOne({ username, _id: { $ne: userId } });
    if (existingUser) {
      return res.status(409).json({ message: 'نام کاربری قبلاً ثبت شده است.' });
    }

    // دریافت اطلاعات کاربر فعلی برای حذف عکس قدیمی
    const userBeforeUpdate = await User.findById(userId);
    if (!userBeforeUpdate) {
      return res.status(404).json({ message: 'کاربر پیدا نشد.' });
    }

    let profileImageUrl = userBeforeUpdate.profileImageUrl; // مقدار پیش‌فرض عکس فعلی

    // ✅ اگر فایل جدید آپلود شده باشد
    if (req.file) {
      const uploadPath = path.join('upload/users/profile', req.file.filename);

      // مسیر کامل عکس قبلی برای حذف
      if (userBeforeUpdate.profileImageUrl && fs.existsSync(userBeforeUpdate.profileImageUrl)) {
        try {
          fs.unlinkSync(userBeforeUpdate.profileImageUrl);
          console.log("✅ عکس قبلی حذف شد:", userBeforeUpdate.profileImageUrl);
        } catch (unlinkErr) {
          console.error("⚠️ خطا در حذف عکس قبلی:", unlinkErr);
        }
      }

      // مسیر جدید
      profileImageUrl = uploadPath;
    }

    // ✅ بروزرسانی اطلاعات کاربر
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        username,
        devOps: devOps === 'true' || devOps === true,
        security: security === 'true' || security === true,
        qualityAssurance: qualityAssurance === 'true' || qualityAssurance === true,
        profileImageUrl,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'کاربر پیدا نشد.' });
    }

    res.status(200).json({
      message: 'پروفایل با موفقیت به‌روزرسانی شد.',
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        devOps: updatedUser.devOps,
        security: updatedUser.security,
        qualityAssurance: updatedUser.qualityAssurance,
        profileImageUrl: updatedUser.profileImageUrl,
      },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'خطا در به‌روزرسانی پروفایل کاربر.' });
  }
};

 

module.exports = {
  getUsers, assignUser, getAssignedUsers, rmUserAssigned, getBugScopes, userInfo,
  updateProfileUser  
};
