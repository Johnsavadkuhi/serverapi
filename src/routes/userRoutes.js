const express = require('express');
const { getUsers, assignUser, getAssignedUsers, rmUserAssigned , getBugScopes ,
    userInfo , updateProfileUser ,  
} = require('../controllers/userControllers');
const router = express.Router();

const multer  = require("multer")
const { v4: uuidv4 } = require('uuid');
const fs = require("fs") 
const path = require("path")

  const userStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      
      // Base project directory
      const profileDir = `upload/users/profile/`;

      // Ensure project directory exists
      if (!fs.existsSync(profileDir)) {
        fs.mkdirSync(profileDir, { recursive: true });
      }
  
      // Set the upload directory to the bug label directory
      cb(null, profileDir);
    },
    filename: (req, file, cb) => {
      const fileExtension = path.extname(file.originalname);

      const uniqueName = `${uuidv4()}${fileExtension}`; // Generate a unique file name
      cb(null, uniqueName);
    },
  });


  // File filter (only images)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('فرمت فایل باید تصویر باشد.'), false);
  }
};

  
const userProfileUpload1 = multer({storage:userStorage , fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }  

});



router.get('/',getUsers);
router.delete("/rmuserassigned" , rmUserAssigned)
router.post("/assignUser" , assignUser)
router.get("/assignedUsers" , getAssignedUsers)
router.get("/bugscopes", getBugScopes)
router.get("/userinfo" , userInfo )
router.route("/profile/update" ).post(userProfileUpload1.single('profileImage') ,updateProfileUser)

module.exports = router; 
 