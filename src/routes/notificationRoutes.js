const express = require('express');
// const Notification = require('../models/Notification');
const { getUserNotifs, setSeenNotification } = require('../controllers/notificationController');

const router = express.Router();

router.get('/user', getUserNotifs)
router.patch("/seen" , setSeenNotification)

module.exports = router; 
