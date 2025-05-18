import mongoose from "mongoose";


const MobileOwaspSchema = new mongoose.Schema({
  categoryCode: { type: String, required: true },
  categoryName: { type: String, required: true },
  testCode: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  references: [{ label: String, url: String }],
  severity: { type: String, enum: ["low", "medium", "high", "critical"], default: "medium" },
  tags: [String],
  platformVersion: String,        // مثل Android 13, iOS 17
}, { timestamps: true });

export const MobileOwaspTest = mongoose.model("MobileOwasp", MobileOwaspSchema);
