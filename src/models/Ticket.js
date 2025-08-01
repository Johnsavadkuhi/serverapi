// ✅ TICKET MONGOOSE MODEL (بهینه شده با کامنت‌های جداگانه)

const mongoose = require('mongoose');
const Counter = require("./Counter"); 

const TicketSchema = new mongoose.Schema({

  ticketId: {
  type: Number,
  unique: true,
  index: true
},

  // کاربری که تیکت را ثبت کرده است (پنتستر یا QA)
  reporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  // کاربری که تیکت خطاب به اوست (گیرنده‌ی اصلی)
  targetUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  // کاربری که مسئول فعلی پیگیری تیکت است
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    index: true
  },
  // نوع پلتفرمی که باگ در آن رخ داده (وب، موبایل یا دسکتاپ)
  platform: {
    type: String,
    enum: ['web', 'mobile', 'desktop'],
    required: false , 
    default:"web"

  },
  // دسته‌بندی تیکت از نظر امنیت یا کیفیت
  category: {
    type: String,
    enum: ['security', 'quality'],
    required: false , 
    default:"security"
  },
  // نوع تیکت (باگ، پیشنهاد، بهبود یا سوال)
  type: {
    type: String,
    enum: ['bug', 'suggestion', 'improvement', 'question', 'changeDate', 'request' , 'project' , 'problem'],
    default: 'bug'
  },
  // عنوان تیکت
  title: {
    type: String,
    required: true
  },
  // توضیح کلی درباره مشکل یا پیشنهاد
  description: String,
  // اولویت رسیدگی به این تیکت
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  // وضعیت فعلی تیکت در چرخه بررسی
  status: {
    type: String,
    enum: [
      'pending',
      'accepted',
      'rejected',
      'duplicate',
      'no-impact',
      'in-progress',
      'resolved',
      'closed'
    ],
    default: 'pending'
  },
  // تاریخچه تغییر وضعیت تیکت
  statusHistory: [
    {
      _id:false , 
      status: String,
      changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      date: { type: Date, default: Date.now },
      comment: String
    }
  ],
  // فایل‌ها، تصاویر یا ویدیوهای پیوست‌شده به تیکت (اولیه، غیر از کامنت‌ها)
  attachments: [
    {
      filename: String,
      url: String,
      type: { type: String },
      uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      uploadedAt: { type: Date, default: Date.now },
      description: String
    }
  ],
  // مشارکت‌کننده‌های دعوت‌شده به تیکت
  participants: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      role: { type: String, default: 'participant' },
      invitedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      invitedAt: { type: Date, default: Date.now }
    }
  ],
  // کاربری که این تیکت را حل کرده (در صورت بسته شدن)
  isResolvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  // زمان آخرین فعالیت روی تیکت (کامنت، وضعیت، مشارکت و...) 
  lastActivityAt: Date,
  // تاریخ ایجاد تیکت
  createdAt: {
    type: Date,
    default: Date.now
  },
  // تاریخ آخرین بروزرسانی (برای sort)
  updatedAt: Date
});




TicketSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

TicketSchema.index({ title: 'text', description: 'text' });
TicketSchema.index({ status: 1, priority: 1 });
TicketSchema.index({ reporter: 1, status: 1 });
TicketSchema.index({ ticketId: 1 });


module.exports = mongoose.model('Ticket', TicketSchema);
