const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
  name: { type: String, required: true }, // نام ابزار
  type: { type: String, enum: ["hardware", "software"], required: true }, // سخت‌افزار یا نرم‌افزار

  // مالکیت
  ownerType: { type: String, enum: ["bank", "user"], required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // اگر مال کاربر باشه

  // حوزه استفاده (امنیت / کیفیت / هر دو)
  departmentScope: { 
    type: [String], 
    enum: ["security", "quality"], 
    required: true 
  }, 
  // مثال: ["security"] یا ["quality"] یا ["security","quality"]

  // پلتفرم‌ها (وب، موبایل، دسکتاپ، API)
  platforms: {
    type: [String],
    enum: ["web", "mobile", "desktop", "api"],
    required: true
  },

  description: { type: String },
  brand: { type: String }, // برند
  model: { type: String }, // مدل
  version: { type: String }, // نسخه (برای نرم افزار)

  serialNumber: { type: String, unique: true, sparse: true }, // شماره سریال سخت افزار
  licenseKey: { type: String, unique: true, sparse: true }, // لایسنس نرم افزار
  macAddress: { type: String }, // مخصوص شبکه
  ipAddress: { type: String }, // مخصوص تجهیزات شبکه

  // وضعیت
  status: { 
    type: String, 
    enum: ["available", "in-use", "maintenance", "retired", "lost"], 
    default: "available" 
  },

  location: { type: String }, // محل نگهداری (انبار، اتاق سرور، آزمایشگاه...)

  // تخصیص
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  assignedDate: { type: Date }, // تاریخ تحویل

  // خرید و نگهداری
  purchaseDate: { type: Date },
  warrantyExpiry: { type: Date },
  maintenanceSchedule: { type: Date },

  // مالی
  cost: { type: Number },
  vendor: { type: String },

  // 🔹 برچسب‌ها برای انعطاف بیشتر
  tags: [{ type: String }], 

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// آپدیت خودکار updatedAt
assetSchema.pre("save", function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Asset", assetSchema);
