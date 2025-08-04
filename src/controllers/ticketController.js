const mongoose = require("mongoose");
const project = require("../models/project");
const ProjectUser = require("../models/ProjectUser");
const FoundedBug = require("../models/FoundedBug");
const Counter = require("../models/Counter");
const fs = require("fs");
const path = require("path");
const util = require("util");
const Ticket = require("../models/Ticket");
const TicketComment = require("../models/TicketComment");
const unlinkAsync = util.promisify(fs.unlink);

const newTicketId = async (req, res) => {
  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "ticket" },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );

    res.status(200).json({ ticketId: counter.value });
  } catch (err) {
    console.error("Error generating ticketId:", err);
    res.status(500).json({ message: "Failed to generate ticketId" });
  }
};

const creatTicket = async (req, res) => {
  try {
    const {
      reporter,
      targetUser,
      assignedTo,
      title,
      description,
      type,
      ticketId,
    } = req.body;

    // تبدیل فایل‌ها به ساختار attachments
    const attachments =
      req.files?.map((file) => ({
        filename: file.filename,
        url: file.path.replace(/\\/g, "/"), // برای پلتفرم ویندوز
        type: file.mimetype,
        uploadedBy: reporter,
        uploadedAt: new Date(),
        description: "", // می‌توان در آینده اضافه کرد
      })) || [];

    // تاریخچه وضعیت اولیه
    const statusHistory = [
      {
        status: "pending",
        changedBy: reporter,
        date: new Date(),
        comment: "تیکت ایجاد شد",
      },
    ];

    if (!ticketId) {
      return res.status(400).json({ message: "ticketId is required" });
    }
    if (!reporter || !targetUser || !title || !type) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const ticketIdNumber = parseInt(ticketId, 10);
    if (isNaN(ticketIdNumber)) {
      return res.status(400).json({ message: "Invalid ticketId" });
    }

    const newTicket = new Ticket({
      ticketId: ticketIdNumber,
      reporter,
      targetUser,
      title,
      description: description || "",
      type,
      statusHistory,
      attachments,
      participants: [],
      lastActivityAt: new Date(),
    });

    await newTicket.save();

    res.status(201).json({
      message: "ticket sucessfully saved!!",
      ticket: newTicket,
    });
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).json({
      message: "Error saving ticket",
      error: error.message,
    });
  }
};

const updateTicket = async (req, res) => {
  res.status(200).json("ok");
};


const getTickets =  async (req, res) => {
  try {
    const {userId} = req.query
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const tickets = await Ticket.find({
      $or: [
        { reporter: userId },
        { targetUser: userId },
        { assignedTo: userId },
        { 'participants.user': userId }
      ]
    })
    .populate('reporter', 'firstName lastName profileImageUrl')
    .populate('targetUser', 'firstName lastName profileImageUrl')
    .populate('assignedTo', 'firstName lastName profileImageUrl')
    .populate('participants.user', 'firstName lastName profileImageUrl')
    .populate('participants.invitedBy', 'firstName lastName profileImageUrl')
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit);

    const total = await Ticket.countDocuments({
      $or: [
        { reporter: userId },
        { targetUser: userId },
        { assignedTo: userId },
        { 'participants.user': userId }
      ]
    });

    res.status(200).json({
      success: true,
      count: tickets.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      data: tickets
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTicketById  = async(req  , res)=>{

    const {ticketId } = req.query 
    console.log("ticket Id : " , ticketId )
    const result = await Ticket.findOne({ticketId})

    console.log("result : ", result )
    res.status(200).json(result)
    



}


const createComment  = async(req , res )=>{

try {

    const {
      ticketId,
      text,
      ticket,
      user
    } = req.body;

    if (!ticket || !text || !user || !ticketId) {
      return res.status(400).json({ message: "Missing required fields: ticketId, text, or user." });
    }

    const newComment = new TicketComment({
      ticketId,
      ticket,
      user,
      text
    });

    const result = await newComment.save();

    // Convert Mongoose document to plain JS object
    const resultObj = result.toObject();

    // Localize date fields
    resultObj.createdAt = new Date(result.createdAt).toLocaleString('fa-IR');
    resultObj.updatedAt = new Date(result.updatedAt).toLocaleString('fa-IR');

    console.log("Modified result with localized dates:", resultObj);

    res.status(200).json(resultObj);
  } catch (error) {
    console.error("Error creating comment:", error);
    return res.status(500).json({ message: "Failed to create comment", error: error.message });
  }
}


const getComments = async (req, res) => {
    const { ticketId } = req.query;

    // Validate ticketId
    if (!ticketId) {
        return res.status(400).json({ 
            success: false,
            error: "ticketId is required",
            comments: [] // Always return empty array for consistency
        });
    }

    try {
        const comments = await TicketComment.find({ ticketId })
            .sort({ createdAt: 1 }) // Sort by creation date (oldest first)
            .lean(); // Convert to plain JS objects
        
        // Always return success with comments array (empty if none found)
        return res.status(200).json({
            success: true,
            comments: comments || [], // Ensure it's always an array
            message: comments.length ? "Comments retrieved successfully" : "No comments found"
        });

    } catch (error) {
        console.error("Error fetching comments:", error);
        return res.status(500).json({
            success: false,
            error: "Internal server error",
            comments: [] // Always return empty array even on error
        });
    }
};



module.exports = { creatTicket, updateTicket, newTicketId , getTickets , getTicketById , createComment , 
    getComments
};
