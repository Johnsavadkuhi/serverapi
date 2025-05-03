const express = require('express');
const { getUsers, assignUser, getAssignedUsers, rmUserAssigned } = require('../controllers/userControllers');

const router = express.Router();

router.get('/',getUsers);
router.delete("/rmuserassigned" , rmUserAssigned)
router.post("/assignUser" , assignUser)
router.get("/assignedUsers" , getAssignedUsers)
module.exports = router; 
 