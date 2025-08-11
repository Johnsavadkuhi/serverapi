const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectIdentifier = new Schema({

    developer: String,
    employer: String,
    certificateRequest: String,
    organizationalUnitName: String,
    projectManagerName: String,
    unitPhoneNumber: String, // Phone number for step 2
    beneficiaryOffice: String,
    followerName: String,
    beneficiaryPhoneNumber: String, // Phone number for step 3
    datacenterName: String,
    responsibleName: String,
    datacenterPhoneNumber: String,
    projectAcceptanceDate: { type: Date, required: true },
    reportIssueDate: { type: Date, required: true },
    testDate: { type: Date, required: true },
    docId: { type: String, required: true }

}, { _id: false })


const projectSchema = new Schema({

    projectName: {
        type: String,
        required: true

    },

    letterNumber: {
        type: String,
        required: true

    },

    version: {
        type: String,
        required: true,

    },
    projectManager: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    qualityManager: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    devops: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    projectType: {
        type: [String],
        required: true
    },
    platform: {
        type: [String],
        required: true
    },

    userProject: [{
        type: Schema.Types.ObjectId,
        ref: 'ProjectUser'
    }],

    description: [String],
    expireDay: { type: Date },
    expireDayQuality: { type: Date },
    verifiedByAdmin: {
        type: Date
    },
    verifiedReportByAdmin: Date,
    created_date: {
        type: Date,
        default: () => new Date().toISOString()
    },

    identifier: projectIdentifier,
    status: { type: "String", default: "Open" },
    numberOfTest: Number

});

projectSchema.index({ projectName: 1, version: 1 }, { unique: true });


module.exports = mongoose.model('Project', projectSchema);



