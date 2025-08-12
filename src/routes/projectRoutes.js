const express = require('express');
const { getUserProjects, getManagerProjects, createProject , getBugs , updateBugStatus, updateBulkBugStatus,
    creatReport,fetchReport , updateReport , fetchAllReports  , fetchProjectById , fetchReportById, 
    reportVerify , deleteReportById , fetchProjectByUserProjectManager ,
     updateProjectStatus , fetchUserProjectById , fetchAllUserReport , getAllBugsForReport , getPage , setPage ,postIdentifier
     , getPentesterByProjectId , 
     getProjectById , updateReadAccess , getIdentifier , pocsArchive
 } = require('../controllers/projectControllers');



const router = express.Router();

const multer  = require("multer")
const { v4: uuidv4 } = require('uuid');
const fs = require("fs") 
const path = require("path")

  const pocStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      
    //   const bugLabel = req.body.label || "unknown"; // Default label if none is provided
      const { projectId , label:bugLabel  } = req.body ; // Get project ID from route params
  
      // Base project directory
      const projectDir = `upload/${projectId}`;
      // Subdirectory for bug label
      const bugDir = `${projectDir}/${bugLabel}`;
  
      // Ensure project directory exists
      if (!fs.existsSync(projectDir)) {
        fs.mkdirSync(projectDir, { recursive: true });
      }
  
      // Ensure bug label directory exists
      if (!fs.existsSync(bugDir)) {
        fs.mkdirSync(bugDir, { recursive: true });
      }
  
      // Save projectId and bugLabel for future use
      req.projectId = projectId;
      req.bugLabel = bugLabel;
  
      // Set the upload directory to the bug label directory
      cb(null, bugDir);
    },
    filename: (req, file, cb) => {
      const fileExtension = path.extname(file.originalname);

      const uniqueName = `${uuidv4()}${fileExtension}`; // Generate a unique file name
      cb(null, uniqueName);
    },
  });
  
const pocUpload = multer({storage:pocStorage}); 



router.get('/user',getUserProjects);
router.get("/manager" ,getManagerProjects )
router.post("/devops/create" , createProject)

router.post("/update/bug/status" , updateBugStatus)
router.post("/bulk/update/bug/status" , updateBulkBugStatus)
router.get("/bugs" ,getBugs )
// router.post("/bug/creat/report" , creatReport)
router.route("/bug/creat/report").post(pocUpload.array('files', 100) , creatReport)
.put(pocUpload.array('files' , 100) , updateReport)
router.get("/user/report" , fetchReport)
router.get("/reports/all/users" , fetchAllReports)
router.get("/project" , fetchProjectById)
router.get("/user/report/byid" , fetchReportById)
router.post("/user/report/verify" , reportVerify)
router.delete("/user/report/delete" , deleteReportById)
router.get("/user/project/manager/getproject" , fetchProjectByUserProjectManager)

router.put("/user/update/status" , updateProjectStatus)

router.get("/user/project" , fetchUserProjectById)
router.get("/reports/user/all" , fetchAllUserReport)
router.get("/all/user/reports" , getAllBugsForReport)


router.route("/page").post(setPage).get(getPage)

router.post("/identifier" ,postIdentifier )

router.get("/pentesters/byId" , getPentesterByProjectId)

router.get("/project/byid" , getProjectById)

router.post("/update/bug/readaccess" , updateReadAccess)
router.get("/identifier" ,getIdentifier )

router.get("/pocs-archive" , pocsArchive)
module.exports = router; 
 