const express = require('express');
const { getDevopsProjects , getDevopsProject , updateDevopsProject } = require('../controllers/devopsController');

const router = express.Router();

router.get('/projects',getDevopsProjects);
router.get('/project',getDevopsProject);
router.post('/update/project' , updateDevopsProject)

module.exports = router; 