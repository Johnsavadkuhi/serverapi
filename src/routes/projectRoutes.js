const express = require('express');
const { getUserProjects, getManagerProjects, createProject , getBugs , updateBugStatus, updateBulkBugStatus } = require('../controllers/projectControllers');

const router = express.Router();

router.get('/user',getUserProjects);
router.get("/manager" ,getManagerProjects )
router.post("/devops/create" , createProject)
router.get("/bugs" ,getBugs )
router.post("/update/bug/status" , updateBugStatus)
router.post("/bulk/update/bug/status" , updateBulkBugStatus)
module.exports = router; 
 