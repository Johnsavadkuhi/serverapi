const express = require('express');
const { getUsers, assignUser, getAssignedUsers, rmUserAssigned , getBugScopes} = require('../controllers/userControllers');
const router = express.Router();

router.get('/',getUsers);
router.delete("/rmuserassigned" , rmUserAssigned)
router.post("/assignUser" , assignUser)
router.get("/assignedUsers" , getAssignedUsers)
router.get("/bugscopes", getBugScopes)
module.exports = router; 
 