const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BugSchema = new mongoose.Schema({
    id: String , 
    label: String , 
    labelfa: String,
    wstg:String,
    status: { type: String, default: 'notAttempted' },
    children: [this]
  });

const ProjectUserSchema = new Schema({

    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    },
    
    pentester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    version:String , 

    status: { type: String, default: "Open" },

    progress: { type: Number, default: 0 },

    bugScopes: [BugSchema], 
    assignBugScopeForFirst:{ type:Boolean , default:true},
    startDate:Date , 
    finishDate:Date, 
    pendingDate:Date ,
    description: String , 
    reason: String , 
    managerVerifyDate:Date ,
    created_at: {
        type: Date,
        default: () => new Date().toISOString()
    },
    stateChanges: [
        {
          state: {
            type: String,
            enum: ['Open', 'In-Progress', 'Pending', 'Finish'],
          },
          timestamp: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      totalWorkTime: {
        type: Number,
        default: 0, // This will store the total time in milliseconds
      },
    
});


ProjectUserSchema.index({ project: 1, pentester: 1 ,version:1 }, { unique: true });

module.exports = mongoose.model('ProjectUser', ProjectUserSchema);