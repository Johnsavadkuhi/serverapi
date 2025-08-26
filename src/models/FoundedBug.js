const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//included is for adding file to report
const PocSchema = new Schema({
    originalname: String,
    encoding:String , 
    type: String , 
    destination:String , 
    filename:String , 
    path: String,
    size:String,
    included:{type:Boolean , default:false} 

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
    path:  { type: String },
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
    cvssVector : {type :String  } , 
    httpMethod: {
        type: String,
        enum: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"]
    },
  parameter: { type: String }, // مثلا username یا ?id=123
parameters: [{ key: String, value: String }],
  isDuplicateOf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoundedBug",
        default: null
    }

})


// Ensure a pentester can have only one scope per project

FoundedBugSchema.index({ project: 1, pentester: 1, id: 1, _id: 1, state: 1 });
// ایندکس‌های ترکیبی اصلی (کاهش تعداد از 11 به 7)
FoundedBugSchema.index({ project: 1, pentester: 1, state: 1 }); // جایگزین چند ایندکس
FoundedBugSchema.index({ project: 1, state: 1 });
FoundedBugSchema.index({ severity: 1, verify: 1 });
FoundedBugSchema.index({ projectManager: 1, state: 1 });
FoundedBugSchema.index({ adminVerify: 1, project: 1 });
FoundedBugSchema.index({ CVSS: 1, severity: 1 });
FoundedBugSchema.index({ created_at: -1 }); // اضافه شده
FoundedBugSchema.index({ updated_at: -1 }); // اضافه شده
// ایندکس‌های تکی فقط برای فیلدهای واقعاً نیازمند
FoundedBugSchema.index({ id: 1 }); // اگر جستجوی مکرر توسط id دارید
FoundedBugSchema.index({ readAccess: 1 }); // multikey index
FoundedBugSchema.index({ project: 1, readAccess: 1 });
FoundedBugSchema.index({ pentester: 1, readAccess: 1 });
FoundedBugSchema.index({project:1,  pentester: 1, readAccess: 1 });
FoundedBugSchema.index({ project: 1, path: 1, httpMethod: 1, parameter: 1 });

FoundedBugSchema.pre("save", async function(next) {
    if (!this.isNew) return next();

    const existing = await mongoose.model("FoundedBug").findOne({
        project: this.project,
        path: this.path,
        httpMethod: this.httpMethod,
        parameter: this.parameter,
        id:this.id, 
        state: { $ne: "Closed" } // فقط باگ‌های فعال
    });

    if (existing) {
        console.log("existing the bug ###################  : " , this.id , this.label )
        this.isDuplicateOf = existing._id;
        this.state = "Duplicate";
    }

    next();
});

const FoundedBug = mongoose.model('FoundedBug', FoundedBugSchema);
module.exports = FoundedBug 