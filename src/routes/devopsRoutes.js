const express = require('express');
const { getDevopsProjects ,
     getDevopsProject ,
     updateDevopsProject, 
    deleteDevopsProject ,getDevopsProjectPentesters,
registerDevOpsInfo } = require('../controllers/devopsController');

const router = express.Router();

router.get('/projects',getDevopsProjects);
router.get('/project',getDevopsProject);
router.get('/project/pentesters',getDevopsProjectPentesters);
router.post('/update/project' , updateDevopsProject)
router.delete('/delete/project' , deleteDevopsProject)
router.post("/project/save/info" , registerDevOpsInfo)
module.exports = router; 