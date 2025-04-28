const express = require('express');
const { getUserProjects, getManagerProjects } = require('../controllers/projectControllers');

const router = express.Router();

router.get('/user',getUserProjects);
router.get("/manager" ,getManagerProjects )
module.exports = router; 
 