import mongoose from "mongoose";
//categoryCode like as WSTG-INFO 
//categoryName like as Information Gathering 
// testCode like as WSTG-INFO-01 
//title like as Conduct Search Engine Discovery

const WebOwaspSchema = new mongoose.Schema({
  categoryCode: { type: String, required: true },
  categoryName: { type: String, required: true },
  testCode: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  references: [{ label: String, url: String }],
  status: { type: String, enum: ["pending", "passed", "failed", "needs review"], default: "pending" },
  severity: { type: String, enum: ["low", "medium", "high", "critical"], default: "medium" },
  tags: [String],  
  notes: String,
}, { timestamps: true });

export const WebOwasp = mongoose.model("WebOwasp", WebOwaspSchema);
