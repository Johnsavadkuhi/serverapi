const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
  // Asset name
  name: { type: String, required: true },

  // Asset type: hardware or software
  type: { type: String, enum: ["hardware", "software"], required: true },

  // Ownership type: bank-owned or user-owned
  ownerType: { type: String, enum: ["bank", "user"], required: true },

  // Reference to the user (only if ownerType is "user")
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  // Department scope (e.g., security, quality)
  departmentScope: {
    type: [String],
    enum: ["security", "quality"],
    required: true
  },

  // Supported platforms (e.g., web, mobile, desktop, API)
  platforms: {
    type: [String],
    enum: ["web", "mobile", "desktop", "api"],
    required: true
  },

  // Detailed description about the asset
  description: { type: String },

  // Manufacturer brand (e.g., Dell, Microsoft)
  brand: { type: String },

  // Model name or number (for hardware)
  model: { type: String },

  // Version (mainly for software)
  version: { type: String },

  // Unique serial number for hardware
  serialNumber: { type: String, unique: true, sparse: true },

  // Software license key (if applicable)
  licenseKey: { type: String, unique: true, sparse: true },

  // MAC address (for network devices)
  macAddress: { type: String },

  // IP address (for network-related assets)
  ipAddress: { type: String },

  // Current status of the asset
  status: {
    type: String,
    enum: ["available", "in-use", "maintenance", "retired", "lost"],
    default: "available"
  },

  // Physical or logical storage location
  location: { type: String },

  // User the asset is assigned to
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  // Date when the asset was assigned
  assignedDate: { type: Date },

  // Purchase date of the asset
  purchaseDate: { type: Date },

  // Warranty expiry date (if applicable)
  warrantyExpiry: { type: Date },

  // Next scheduled maintenance date
  maintenanceSchedule: { type: Date },

  // Purchase cost or estimated value
  cost: { type: Number },

  // Vendor or supplier name
  vendor: { type: String },

  // Flexible tag system for quick filtering/searching
  tags: [{ type: String }],

  // 🆕 Software-specific fields (only relevant if type === "software")

  // Whether the software is free or paid
  softwareType: {
    type: String,
    enum: ["free", "paid"],
    default: "free"
  },

  // License status: official, cracked, or trial version
  licenseStatus: {
    type: String,
    enum: ["licensed", "cracked", "trial"],
    default: "licensed"
  },

  // License expiration date (if licensed)
  licenseExpiry: { type: Date },

  // Date when the software was installed
  installDate: { type: Date },

  // Number of allowed installations for licensed software
  allowedInstallations: { type: Number },

  // Record timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// بعد از تعریف اسکیمای assetSchema

// 1️⃣ فیلدهای یکتا (قبلاً تعریف شده)
assetSchema.index({ serialNumber: 1 }, { unique: true, sparse: true });
assetSchema.index({ licenseKey: 1 }, { unique: true, sparse: true });

// 2️⃣ فیلدهای جستجو و فیلتر معمول
assetSchema.index({ name: 1 });
assetSchema.index({ type: 1 });
assetSchema.index({ ownerType: 1 });
assetSchema.index({ status: 1 });
assetSchema.index({ departmentScope: 1 });
assetSchema.index({ platforms: 1 });
assetSchema.index({ tags: 1 });

// 3️⃣ روابط بین موجودیت‌ها (برای populate سریع)
assetSchema.index({ owner: 1 });
assetSchema.index({ assignedTo: 1 });

// 4️⃣ ایندکس‌های زمانی برای گزارش‌گیری و تاریخچه
assetSchema.index({ purchaseDate: -1 });
assetSchema.index({ warrantyExpiry: -1 });
assetSchema.index({ maintenanceSchedule: -1 });
assetSchema.index({ licenseExpiry: -1 });
assetSchema.index({ createdAt: -1 });
assetSchema.index({ updatedAt: -1 });

// 5️⃣ ایندکس ترکیبی برای جستجوهای پرتکرار
// مثلاً: پیدا کردن دارایی‌های فعال در یک دپارتمان خاص
assetSchema.index({ departmentScope: 1, status: 1 });

// مثلاً: پیدا کردن دارایی‌های متعلق به یک کاربر خاص
assetSchema.index({ ownerType: 1, owner: 1 });

// مثلاً: جستجو بر اساس تگ و وضعیت (برای فیلتر در UI)
assetSchema.index({ tags: 1, status: 1 });

// مثلاً: برای گزارش هزینه‌ها بر اساس نوع و دپارتمان
assetSchema.index({ type: 1, departmentScope: 1, cost: -1 });

// 6️⃣ جستجوی متنی (برای سرچ کلی در اسم و توضیحات)
assetSchema.index({
  name: "text",
  description: "text",
  brand: "text",
  model: "text",
  vendor: "text",
  tags: "text"
});



// Automatically update `updatedAt` on save
assetSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Assets", assetSchema);
