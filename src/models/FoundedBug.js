const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PocSchema = new Schema({
    originalname: String,
    encoding:String , 
    type: String , 
    destination:String , 
    filename:String , 
    path: String,
    size:String

}, { _id: false });

const FoundedBugSchema = new Schema({

    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    },
    pentester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    projectManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    id: String,
    label: String,
    labelfa: String,
    wstg: String,
    CVSS: {type :String ,  required: true },
    severity: {type :String ,  required: true },
    CVE: String,
    impact: String,
    other_information: String,
    pocs: [PocSchema],
    verify: Boolean,
    path: String,
    solutions: String,
    exploits: String,
    tools: [String],
    state: { type: String, default: "New" },
    score: { type: Number, default: 0 },
    adminVerify: { type: Boolean, default: false },
    adminVerifyDate: { type: Date, default: () => new Date().toISOString() },
    managerVerifyDate: Date,
    vector: String,
    description : String , 
    refrence: String , 
    securingByOptions: {
        webServerSettings: { type: Boolean, default: false },
        modificationInProgramCode: { type: Boolean, default: false }
    },
    securingByWAF: String,
    created_at: {
        type: Date,
        default: () => new Date().toISOString()
    },
    updated_at: {
        type: Date,
        default: () => new Date().toISOString()
    },
    grade: { type: Number, default: 0 },
    // New field for read permissions
    readAccess: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }] , 
    cvssVector : {type :String  }

})


// Ensure a pentester can have only one scope per project
FoundedBugSchema.index({ project: 1, pentester: 1, id: 1, _id: 1, state: 1 });




const FoundedBug = mongoose.model('FoundedBug', FoundedBugSchema);
module.exports = FoundedBug 