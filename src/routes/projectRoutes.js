const express = require('express');
const { getUserProjects, getManagerProjects, createProject , getBugs } = require('../controllers/projectControllers');

const router = express.Router();

router.get('/user',getUserProjects);
router.get("/manager" ,getManagerProjects )
router.post("/devops/create" , createProject)
router.get("/bugs" ,getBugs )
module.exports = router; 
 