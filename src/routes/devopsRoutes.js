const express = require('express');
const { getDevopsProjects ,
     getDevopsProject ,
     updateDevopsProject, 
    deleteDevopsProject } = require('../controllers/devopsController');

const router = express.Router();

router.get('/projects',getDevopsProjects);
router.get('/project',getDevopsProject);
router.post('/update/project' , updateDevopsProject)
router.delete('/delete/project' , deleteDevopsProject)

module.exports = router; 