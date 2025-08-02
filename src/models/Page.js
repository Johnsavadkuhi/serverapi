

const mongoose = require('mongoose');

// Define the Bug Schema
const bugSchema = new mongoose.Schema({
    id: { type: String, required: true },
    wstg: { type: String, required: true },
    label: { type: String, required: true },
    labelfa: { type: String, required: true },
    page: { type: Number, required: true },
    cvss: String,
    cve: String
});

// Define the main Project Schema
const PageSchema = new mongoose.Schema({
    project: { type: String, required: true },
    projectManager: String,
    pf10: { type: [bugSchema], default: [] },
    pf11: { type: [bugSchema], default: [] },
    pf12: { type: [bugSchema], default: [] },
    pf13: { type: [bugSchema], default: [] },
    pf14: { type: [bugSchema], default: [] },
    pf15: { type: [bugSchema], default: [] },
    pf16: { type: [bugSchema], default: [] },
    pf17: { type: [bugSchema], default: [] },
    pf18: { type: [bugSchema], default: [] },
    pf19: { type: [bugSchema], default: [] },
    pf1a: { type: [bugSchema], default: [] },
    pf1b: { type: [bugSchema], default: [] },
    pf1c: { type: [bugSchema], default: [] }

});

// Add an index for better querying
PageSchema.index({ project: 1, projectManager: 1 });

module.exports = mongoose.model('Page', PageSchema);
