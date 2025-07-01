const express = require('express');
const { getUserProjects, getManagerProjects, createProject } = require('../controllers/projectControllers');

const router = express.Router();

router.get('/user',getUserProjects);
router.get("/manager" ,getManagerProjects )
router.post("/devops/create" , createProject)
module.exports = router; 
 