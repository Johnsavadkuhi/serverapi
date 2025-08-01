const express = require('express');
const router = express.Router();
const {creatTicket , updateTicket , newTicketId , 
    getTickets , getTicketById , createComment , getComments  } = require("../controllers/ticketController")
const multer  = require("multer")
const { v4: uuidv4 } = require('uuid');
const fs = require("fs") 
const path = require("path")
const ticketUpload = require("../config/ticketUpload")


router.get("/" , getTickets)
router.get("/byid" , getTicketById )
router.get("/new_id" , newTicketId)
router.route("/creat").post(ticketUpload.array('attachments', 100) , creatTicket)
.put(ticketUpload.array('attachments' , 100) , updateTicket)

router.route("/comment").post(ticketUpload.array('comments' , 100) , createComment)
.get(getComments)

module.exports = router; 