const express = require('express');
const { getDevopsProjects } = require('../controllers/devopsController');

const router = express.Router();

router.get('/projects',getDevopsProjects);

module.exports = router; 